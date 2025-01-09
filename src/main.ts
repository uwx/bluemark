import type { AtpSessionData } from "@atcute/client";
import { KittyAgent } from "kitty-agent";
import { encryptData } from "./crypto";
import { now as tidNow } from "@atcute/tid";
import { GM_config } from "GM_config";
import { toString as ui8ToString } from "uint8arrays";

console.log('hello world!');

function arrayBufferToBase64(arrayBuffer: ArrayBufferLike) {
    return ui8ToString(new Uint8Array(arrayBuffer), 'base64');
}

const config = new GM_config({
    id: 'bluemark',
    title: 'Bluemark Settings',
    fields: {
        publishToDiscord: {
            type: 'checkbox',
            label: 'Publish bookmarks to Discord?',
            default: true,
        },
        webhookUrl: {
            type: 'text',
            label: 'Webhook URL',
            default: GM_getValue('webhookUrl') ?? '',
        },
        publishToAtp: {
            type: 'checkbox',
            label: 'Publish bookmarks to ATP repository? (In encrypted form)',
            default: true,
        },
        bskyUsername: {
            type: 'text',
            label: 'ATP Username',
            default: GM_getValue('bskyUsername') ?? '',
        },
        bskyPassword: {
            type: 'text',
            label: 'ATP Password (or App Password)',
            default: GM_getValue('bskyPassword') ?? '',
        },
        cryptoPassword: {
            type: 'text',
            label: 'Password used to encrypt your bookmarks',
            default: GM_getValue('cryptoPassword') ?? '',
        }
    }
});

const processedElements = new WeakSet();

async function getLoggedInAgent() {
    const { agent, manager } = await KittyAgent.createPdsWithCredentials(await config.getValue('bskyUsername', '') as string);

    let session = GM_getValue('bskySession') as AtpSessionData;
    if (session) {
        try {
            await manager.resume(session);
            console.log('resumed session');
        } catch (err) {
            console.warn('failed to resume session', err);
            session = await manager.login({
                identifier: await config.getValue('bskyUsername', '') as string,
                password: await config.getValue('bskyPassword', '') as string
            });
        }
    } else {
        session = await manager.login({
            identifier: await config.getValue('bskyUsername', '') as string,
            password: await config.getValue('bskyPassword', '') as string
        });
        GM_setValue('bskySession', session);
    }

    return agent;
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
                    if (!await config.getValue('publishToAtp', true)) {
                        console.log('not publishing to atp');
                        return;
                    }

                    if (
                        !await config.getValue('cryptoPassword', '') ||
                        !await config.getValue('bskyUsername', '') ||
                        !await config.getValue('bskyPassword', '')) {
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
                        collection: 'io.github.uwx.bluemark.encryptedBookmark',
                        repo: await config.getValue('bskyUsername', '') as string,
                        rkey: tidNow(),
                        record: {
                            $type: 'io.github.uwx.bluemark.encryptedBookmark',
                            ...await encryptData(
                                JSON.stringify({
                                    repo,
                                    rkey,
                                }),
                                config.getValue('cryptoPassword', '') as string
                            )
                        }
                    });
                })(),
                (async () => {
                    if (!await config.getValue('publishToDiscord', true)) {
                        console.log('not publishing to discord');
                        return;
                    }
                    if (!await config.getValue('webhookUrl', '')) {
                        alert('No webhook URL set!');
                        return;
                    }

                    await fetch(
                        await config.getValue('webhookUrl', '') as string,
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
