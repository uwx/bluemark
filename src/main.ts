import type { AtpSessionData } from "@atcute/client";
import { KittyAgent } from "kitty-agent";
import { base64ToBytes, bytesToBase64, deriveKey, encryptData } from "./crypto";
import { now as tidNow } from "@atcute/tid";
import { GM_config } from "GM_config";

console.log('hello world!');

const config = new GM_config({
    id: 'bluemark',
    title: 'Bluemark Settings',
    fields: {
        publishToDiscord: {
            type: 'checkbox',
            label: ' Publish bookmarks to Discord?',
            default: true,
        },
        webhookUrl: {
            type: 'text',
            label: ' Webhook URL',
            default: GM_getValue('webhookUrl') ?? '',
        },
        publishToAtp: {
            type: 'checkbox',
            label: ' Publish bookmarks to ATP repository? (In encrypted form)',
            default: true,
        },
        bskyUsername: {
            type: 'text',
            label: ' ATP Username',
            default: GM_getValue('bskyUsername') ?? '',
        },
        bskyPassword: {
            type: 'text',
            label: ' ATP Password (or App Password)',
            default: GM_getValue('bskyPassword') ?? '',
        },
        cryptoPassword: {
            type: 'text',
            label: ' Passphrase for your ATP bookmarks (NOT your bluesky password)',
            default: GM_getValue('cryptoPassword') ?? bytesToBase64(crypto.getRandomValues(new Uint8Array(16))),
        },
    }
});

// we share a salt between bookmarks so the bookmarks viewer doesn't have to derive a key for each bookmark, which would
// be slow in the order of several seconds for just 100 bookmarks.
let salt: string = GM_getValue('cryptoSalt');
if (!salt) {
    GM_setValue('cryptoSalt', salt = bytesToBase64(crypto.getRandomValues(new Uint8Array(16))));
}

const processedElements = new WeakSet();

let agentPromise: Promise<KittyAgent> | undefined = undefined;
async function getLoggedInAgent() {
    agentPromise ??= (async () => {
        const { agent, manager } = await KittyAgent.createPdsWithCredentials(config.get('bskyUsername') as string);
    
        let session = GM_getValue('bskySession') as AtpSessionData;
        if (session) {
            try {
                await manager.resume(session);
                console.log('resumed session');
            } catch (err) {
                console.warn('failed to resume session', err);
                session = await manager.login({
                    identifier: config.get('bskyUsername') as string,
                    password: config.get('bskyPassword') as string
                });
                GM_setValue('bskySession', session);
            }
        } else {
            session = await manager.login({
                identifier: config.get('bskyUsername') as string,
                password: config.get('bskyPassword') as string
            });
            GM_setValue('bskySession', session);
        }
    
        return agent;
    })();

    return agentPromise;
}

GM_registerMenuCommand('Config', () => {
    config.open();
})

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
                    if (!config.get('publishToAtp', true)) {
                        console.log('not publishing to atp');
                        return;
                    }

                    if (
                        !config.get('cryptoPassword') ||
                        !config.get('bskyUsername') ||
                        !config.get('bskyPassword')) {
                        alert('Bluesky account not configured!');
                        return;
                    }

                    const postMatch = (postLink ?? document.location.href).match(/\/profile\/(.*?)\/post\/(.*)/i);
                    if (!postMatch) {
                        alert('URL did not match regex!');
                        return;
                    }

                    const [, repo, rkey] = postMatch;

                    const key = await deriveKey(
                        config.get('cryptoPassword') as string,
                        base64ToBytes(salt)
                    );

                    console.log('logging in');
                    const agent = await getLoggedInAgent();
                    console.log('logged in');
                    await agent.put({
                        collection: 'io.github.uwx.bluemark.encryptedBookmark',
                        repo: config.get('bskyUsername') as string,
                        rkey: tidNow(),
                        record: {
                            $type: 'io.github.uwx.bluemark.encryptedBookmark',
                            ...await encryptData(
                                JSON.stringify({
                                    repo,
                                    rkey,
                                }),
                                key
                            ),
                            salt
                        }
                    });
                })(),
                (async () => {
                    if (!config.get('publishToDiscord', true)) {
                        console.log('not publishing to discord');
                        return;
                    }
                    if (!config.get('webhookUrl')) {
                        alert('No webhook URL set!');
                        return;
                    }

                    await fetch(
                        config.get('webhookUrl') as string,
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
            ]).catch(err => {
                console.error('Failed to bookmark', err);
                alert('Failed to bookmark! Check console for details');
                throw err;
            })
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
