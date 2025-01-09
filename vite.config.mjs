import { defineConfig } from 'vite';
import Userscript from 'vite-userscript-plugin';
import { name, version } from './package.json';

export default defineConfig((config) => {
    return {
        plugins: [
            Userscript({
                entry: 'src/main.ts',
                header: {
                    name,
                    version,
                    match: [],
                    include: [
                        'https://bsky.app/*',
                        'https://*.bsky.dev/*',
                    ],
                    grant: ['GM_setValue', 'GM_getValue', 'GM_registerMenuCommand', 'GM_xmlhttpRequest'],
                }
            }),
        ],
        build: {
            outDir: config.mode === 'development' ? 'dist' : 'shipping'
        }
    };
});
