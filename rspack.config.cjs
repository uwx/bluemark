// @ts-check

const rspack = require('@rspack/core');
const { name, version, description, author } = require('./package.json');
const fs = require('node:fs');
const path = require('node:path');

/**
 * @param {Record<string, string | string[]>} keyValues 
 */
function generateUserscriptHeader(keyValues) {
    /** @type {string[]} */
    const lines = ['// ==UserScript=='];

    for (const [key, values] of Object.entries(keyValues)) {
        if (typeof values === 'string') {
            lines.push(`// @${key.padEnd(11, ' ')} ${values}`);
        } else {
            for (const value of values) {
                lines.push(`// @${key.padEnd(11, ' ')} ${value}`);
            }
        }
    }

    lines.push('// ==/UserScript==');
    lines.push('');

    return lines.join('\n');
}

/** @type {Record<string, string | string[]>} */
const userscriptHeader = {
    name: name,
    version: version,
    author: author.name,
    description: description,
    include: [
        'https://bsky.app/*',
        'https://*.bsky.dev/*',
    ],
    grant: [
        'GM_setValue',
        'GM_getValue',
        'GM_registerMenuCommand',
        'GM_xmlhttpRequest',
    ],
};

fs.writeFileSync(
    `./dist/${name}.proxy.user.js`,
    generateUserscriptHeader({
        ...userscriptHeader,
        require: `file://${path.resolve(`dist/${name}.user.js`)}`
    })
);

/** @type {import('@rspack/cli').Configuration} */
module.exports = {
    entry: {
        main: './src/main.ts',
    },
    resolve: {
        extensions: ['.js', '.ts']
    },
    output: {
        filename: `${name}.user.js`,
        iife: true,
        asyncChunks: false,
    },
    module: {
        rules: [
            {
                test: /\.ts$/,
                exclude: [/node_modules/],
                loader: 'builtin:swc-loader',
                options: {
                    jsc: {
                        parser: {
                            syntax: 'typescript',
                        },
                    },
                },
                type: 'javascript/auto',
            },
        ],
    },
    plugins: [
        new rspack.BannerPlugin({
            banner: generateUserscriptHeader(userscriptHeader),
            raw: true,
        })
    ],
    optimization: {
        minimize: false,
    },
    devtool: 'inline-source-map',
};