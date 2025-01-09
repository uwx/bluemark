// @ts-check

import * as esbuild from 'esbuild'

const ctx = await esbuild.context({
    entryPoints: ['src/main.ts'],
    bundle: true,
    sourcemap: 'inline',
    outfile: 'dist/bluemark.user.js',
    banner: {
        js: `// ==UserScript==
// @name     bluemark
// @version  1.0.0
// @author   uwx
// @description Bookmark skeets from Bluesky to Discord
// @include  https://bsky.app/*
// @include  https://*.bsky.dev/*
// @grant    GM_setValue
// @grant    GM_getValue
// @grant    GM_registerMenuCommand
// @grant    GM_xmlhttpRequest
// ==/UserScript==`
    },
});

await ctx.watch();
console.log('Watching...');
