# bluemark

A userscript that lets you bookmark posts on the official Bluesky app, saving them to a Discord channel, and/or
to your Bluesky repo in encrypted form (Alpha)

## Usage

1. A userscript manager is required. Only Tampermonkey Chrome is tested.
2. Install [bluemark.user.js](https://github.com/uwx/bluemark/raw/refs/heads/master/dist/bluemark.user.js).
3. Configure the userscript by clicking 'Config' under 'bluemark' in Tampermonkey's popup, while on a Bluesky tab.

## Viewing bookmarks

If you enable 'Publish bookmarks to ATP repository' and configure it properly, your bookmarks will be viewable at
[uwx.github.io/bluemark-viewer](https://uwx.github.io/bluemark-viewer/) using the same passphrase you set.

## Security

If you enable 'Publish bookmarks to ATP repository', your bookmarks will be stored encrypted with AES-256-GCM.
The key is derived through 200,000 PBKDF2 rounds of SHA-512 on your passphrase. There is also a unique salt per
machine the userscript is installed on. On my desktop the key takes 100ms to derive. It is recommended to use a
secure random passphrase and store it in your password manager, to prevent brute forcing attacks.

**Under no conditions should you use your Bluesky password as your bookmark password.**

No support or warranty is provided. Use at your own risk.

## Credits

Idea (nearly) completely stolen from [nta/bsky-bookmarker](https://github.com/nta/bsky-bookmarker)
