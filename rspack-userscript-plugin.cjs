// @ts-check

const rspack = require('@rspack/core');
const fs = require('node:fs/promises');
const path = require('node:path');

const { name, version, description, author } = require('./package.json');

/**
 * @typedef Options
 * @property {Record<string, string[] | string>} header
 * @property {string} [name]
 */

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

/**
 * @param {Options} options
 * @returns {rspack.RspackPluginInstance}
 */
module.exports = (options) => ({
    /**
     * @param {rspack.Compiler} compiler 
     */
    apply(compiler) {                
        new rspack.BannerPlugin({
            banner: () => generateUserscriptHeader({
                name: name,
                version: version,
                author: author.name,
                description: description,
                ...options.header
            }),
            raw: true,
        }).apply(compiler);

        compiler.hooks.afterCompile.tapPromise({
            name: 'userscript-proxy'
        }, async compilation => {
            await fs.writeFile(
                `./dist/${options.name}.proxy.user.js`,
                generateUserscriptHeader({
                    name: name,
                    version: version,
                    author: author.name,
                    description: description,
                    ...options.header,
                    require: [
                        ...(options.header.require ?? []),
                        `file://${path.resolve(`dist/${options.name}.user.js`)}`
                    ]
                })
            );
        })
    }
});