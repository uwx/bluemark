// @ts-check

const rspack = require('@rspack/core');
const { name, version, description, author } = require('./package.json');

const banner = `// ==UserScript==
// @name     ${name}
// @version  ${version}
// @author   ${author.name}
// @description ${description}
// @include  https://bsky.app/*
// @include  https://*.bsky.dev/*
// @grant    GM_setValue
// @grant    GM_getValue
// @grant    GM_registerMenuCommand
// @grant    GM_xmlhttpRequest
// ==/UserScript==
`;

/** @type {import('@rspack/cli').Configuration} */
module.exports = {
    entry: {
        main: './src/main.ts',
    },
    resolve: {
        extensions: ['.js', '.ts']
    },
    output: {
        filename: 'bluemark.user.js',
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
            banner,
            raw: true,
        })
    ],
    optimization: {
        minimize: false,
    },
    devtool: 'inline-source-map',
};