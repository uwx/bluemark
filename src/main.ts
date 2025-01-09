import GM_fetch from "./GM_fetch";

console.log('hello world!');

const processedElements = new WeakSet();

GM_registerMenuCommand('Set webhook', () => {
    const result = prompt('Paste webhook URL here');
    if (result != null) {
        GM_setValue('webhookUrl', result);
        alert('URL set!');
    }
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
        button.onclick = e => {
            e.stopPropagation();
            e.preventDefault();

            console.log(`bookmarking ${postLink ?? document.location.href}`);
            if (!GM_getValue('webhookUrl')) {
                alert('No webhook URL set!');
                return;
            }

            // bookmark post
            // agent.put({
            //     collection: 'invalid.uwx.encrypted.bookmark',
            // })
            GM_fetch(
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
