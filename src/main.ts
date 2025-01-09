import type { AtpSessionData } from "@atcute/client";
import { GM_fetch } from "@uwx/gm-fetch";
import { KittyAgent } from "kitty-agent";
import { encryptData } from "./crypto";
import { toBytes } from "@atcute/cbor";
import { now as tidNow } from "@atcute/tid";

console.log('hello world!');

const processedElements = new WeakSet();

async function getLoggedInAgent() {
    const { agent, manager } = await KittyAgent.createPdsWithCredentials(GM_getValue('bskyUsername'));

    let session = GM_getValue('bskySession') as AtpSessionData;
    if (session) {
        try {
            await manager.resume(session);
        } catch (err) {
            console.warn('failed to resume session', err);
            session = await manager.login({ identifier: GM_getValue('bskyUsername'), password: GM_getValue('bskyPassword') });
        }
    } else {
        session = await manager.login({ identifier: GM_getValue('bskyUsername'), password: GM_getValue('bskyPassword') });
        GM_setValue('bskySession', session);
    }

    return agent;
}

GM_registerMenuCommand('Set webhook', () => {
    const result = prompt('Paste webhook URL here');
    if (result != null) {
        GM_setValue('webhookUrl', result);
        alert('URL set!');
    }
});

GM_registerMenuCommand('Set Bluesky details', () => {
    let result = prompt('Bluesky username');
    if (result != null) {
        GM_setValue('bskyUsername', result);
    }
    result = prompt('Bluesky password');
    if (result != null) {
        GM_setValue('bskyPassword', result);
    }
});

GM_registerMenuCommand('Set encryption password', () => {
    const result = prompt('Paste password here');
    if (result != null) {
        GM_setValue('cryptoPassword', result);
    }
});

setInterval(() => {
    const newElements = [...document.querySelectorAll('[data-testid^="feedItem-"], [data-testid^="postThreadItem-"]')].map(e => {
        return {
            element: e,
            buttons: e.querySelector('[aria-label="Open post options menu"]')?.parentElement!.parentElement!.parentElement,
            postLink: (e.querySelector('[href^="/profile/"][href*="/post/"]') as HTMLAnchorElement)?.href,
        };
    });
    
    for (const { element, buttons, postLink } of newElements) {
        if (processedElements.has(element)) {
            continue;
        }
    
        processedElements.add(element);
    
        const button = document.createElement('button');
        button.textContent = '📌';
        button.onclick = async e => {
            e.stopPropagation();
            e.preventDefault();

            console.log(`bookmarking ${postLink ?? document.location.href}`);
            // bookmark post
            await Promise.all([
                (async () => {
                    if (!GM_getValue('cryptoPassword') || !GM_getValue('bskyUsername') || !GM_getValue('bskyPassword')) {
                        alert('Bluesky account not configured!');
                        return;
                    }

                    const postMatch = (postLink ?? document.location.href).match(/\/profile\/(.*?)\/post\/(.*)/i);
                    if (!postMatch) {
                        alert('URL did not match regex!');
                        return;
                    }

                    const [, repo, rkey] = postMatch;

                    console.log('logging in');
                    const agent = await getLoggedInAgent();
                    console.log('logged in');
                    await agent.put({
                        collection: 'invalid.uwx.encrypted.bookmark',
                        repo: GM_getValue('bskyUsername'),
                        rkey: tidNow(),
                        record: {
                            $type: 'invalid.uwx.encrypted.bookmark',
                            encryptedUrl: toBytes(
                                    await encryptData(
                                        new TextEncoder().encode(
                                            JSON.stringify({
                                                repo,
                                                rkey,
                                            }
                                        )
                                    ),
                                    GM_getValue('cryptoPassword')
                                )
                            )
                        }
                    });
                })(),
                (async () => {
                    if (!GM_getValue('webhookUrl')) {
                        alert('No webhook URL set!');
                        return;
                    }
        
                    await GM_fetch(
                        GM_getValue('webhookUrl'),
                        {
                            method: 'POST',
                            body: JSON.stringify({
                                content: fixLink(postLink ?? document.location.href)
                            }),
                            headers: {
                                'Content-Type': 'application/json',
                            }
                        }
                    );
                })(),
            ])
        };
    
        if (!buttons) continue;
    
        buttons.append(button);
    }
}, 250);

function fixLink(link: string) {
    const url = new URL(link);
    url.hostname = 'bskyx.app';
    return url.toString();
}
