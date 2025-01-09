// https://github.com/mitchellmebane/GM_fetch
//
// Copyright (c) 2015 Mitchell Mebane
// Copyright (c) 2014-2015 GitHub, Inc.
//
// Permission is hereby granted, free of charge, to any person obtaining
// a copy of this software and associated documentation files (the
// "Software"), to deal in the Software without restriction, including
// without limitation the rights to use, copy, modify, merge, publish,
// distribute, sublicense, and/or sell copies of the Software, and to
// permit persons to whom the Software is furnished to do so, subject to
// the following conditions:
//
// The above copyright notice and this permission notice shall be
// included in all copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
// EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
// MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
// NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE
// LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION
// OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION
// WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.

import type { GM_Types } from './tampermonkey-module';

// eslint-disable-next-line @typescript-eslint/ban-types
type known = string | number | boolean | symbol | bigint | object | null | undefined;

function normalizeName(name: known): string {
    if (typeof name !== 'string') {
        name = String(name);
    }
    if (/[^\w#$%&'*+.^`|~-]/i.test(name)) {
        throw new TypeError('Invalid character in header field name');
    }
    return name; // TODO case insensitivity
}

function normalizeValue(value: known): string {
    if (typeof value !== 'string') {
        value = String(value);
    }
    return value;
}

export class Headers {
    private map: Record<string, string[]> = {};

    constructor(headers?: Headers | Record<string, known>) {
        this.map = {};

        if (headers instanceof Headers) {
            headers.forEach((value, name) => {
                this.append(name, value);
            });
        } else if (headers) {
            Object.getOwnPropertyNames(headers).forEach((name) => {
                this.append(name, headers[name]);
            });
        }
    }

    append(name: known, value: known): void {
        name = normalizeName(name);
        value = normalizeValue(value);

        const list = this.map[name];
        if (list === undefined) {
            this.map[name] = [value];
        } else {
            list.push(value);
        }
    }

    delete(name: known): void {
        delete this.map[normalizeName(name)];
    }

    get(name: known): string | null {
        const values = this.map[normalizeName(name)];
        return values ? values[0] : null;
    }

    getAll(name: known): string[] {
        return this.map[normalizeName(name)] || [];
    }

    has(name: known): boolean {
        return Object.prototype.hasOwnProperty.call(this.map, normalizeName(name));
    }

    set(name: known, value: known): void {
        this.map[normalizeName(name)] = [normalizeValue(value)];
    }

    // eslint-disable-next-line unicorn/prevent-abbreviations
    forEach(callback: (value: string, name: string, thisArg: this) => void, thisArg?: unknown): void {
        Object.getOwnPropertyNames(this.map).forEach((name) => {
            this.map[name].forEach((value) => {
                callback.call(thisArg, value, name, this);
            });
        });
    }

    *[Symbol.iterator](): Iterator<[name: string, value: string]> {
        for (const [name, values] of Object.entries(this.map)) {
            for (const value of values) {
                yield [name, value];
            }
        }
    }
}

function fileReaderReady(reader: FileReader): Promise<string | ArrayBuffer | null> {
    return new Promise((resolve, reject) => {
        reader.addEventListener('load', () => {
            resolve(reader.result);
        });
        reader.addEventListener('error', () => {
            reject(reader.error);
        });
    });
}

function readBlobAsArrayBuffer(blob: Blob): Promise<ArrayBuffer> {
    const reader = new FileReader();
    reader.readAsArrayBuffer(blob);
    return fileReaderReady(reader) as Promise<ArrayBuffer>;
}

function readBlobAsText(blob: Blob): Promise<string> {
    const reader = new FileReader();
    reader.readAsText(blob);
    return fileReaderReady(reader) as Promise<string>;
}

const textEncoder = new TextEncoder();
const textDecoder = new TextDecoder();
abstract class Body {
    protected _bodyUsed = false;

    protected abstract get body(): string | ArrayBuffer | Blob | FormData | undefined;

    get bodyUsed() {
        return this._bodyUsed;
    }

    blob(): Promise<Blob> {
        if (this._bodyUsed) {
            return Promise.reject(new TypeError('Body contents already read'));
        }
        this._bodyUsed = true;

        const body = this.body;
        if (typeof body === 'string' || body instanceof ArrayBuffer) {
            return Promise.resolve(new Blob([body]));
        } else if (body instanceof Blob) {
            return Promise.resolve(body);
        } else if (body instanceof FormData) {
            return Promise.reject(new TypeError('A multipart FormData body cannot be read as a blob'));
        } else if (body === undefined) {
            return Promise.reject(new Error('No body is present'));
        }

        throw new TypeError('Invalid body type');
    }

    arrayBuffer(): Promise<ArrayBuffer> {
        if (this._bodyUsed) {
            return Promise.reject(new TypeError('Body contents already read'));
        }
        this._bodyUsed = true;

        const body = this.body;
        if (typeof body === 'string') {
            return Promise.resolve(textEncoder.encode(body));
        } else if (body instanceof ArrayBuffer) {
            return Promise.resolve(body);
        } else if (body instanceof Blob) {
            return Promise.resolve(readBlobAsArrayBuffer(body));
        } else if (body instanceof FormData) {
            return Promise.reject(new TypeError('A multipart FormData body cannot be read as an arrayBuffer'));
        } else if (body === undefined) {
            return Promise.reject(new Error('No body is present'));
        }

        throw new TypeError('Invalid body type');
    }

    text(): Promise<string> {
        if (this._bodyUsed) {
            return Promise.reject(new TypeError('Body contents already read'));
        }
        this._bodyUsed = true;

        const body = this.body;
        if (typeof body === 'string') {
            return Promise.resolve(body);
        } else if (body instanceof ArrayBuffer) {
            return Promise.resolve(textDecoder.decode(body));
        } else if (body instanceof Blob) {
            return Promise.resolve(readBlobAsText(body));
        } else if (body instanceof FormData) {
            return Promise.reject(new TypeError('A multipart FormData body cannot be read as text'));
        } else if (body === undefined) {
            return Promise.reject(new Error('No body is present'));
        }

        throw new TypeError('Invalid body type');
    }

    formData(): Promise<FormData> {
        if (this._bodyUsed) {
            return Promise.reject(new TypeError('Body contents already read'));
        }
        this._bodyUsed = true;

        const body = this.body;
        if (typeof body === 'string') {
            return Promise.reject(new TypeError('Unsupported: Cannot parse FormData from a string body'));
        } else if (body instanceof ArrayBuffer) {
            return Promise.reject(new TypeError('Unsupported: Cannot parse FormData from an ArrayBuffer body'));
        } else if (body instanceof Blob) {
            return Promise.reject(new TypeError('Unsupported: Cannot parse FormData from a Blob body'));
        } else if (body instanceof FormData) {
            return Promise.resolve(body);
        } else if (body === undefined) {
            return Promise.reject(new Error('No body is present'));
        }

        throw new TypeError('Invalid body type');
    }

    json() {
        return this.text().then(JSON.parse);
    }
}

// HTTP methods whose capitalization should be normalized
const methods = new Set(['GET', 'HEAD', 'POST']);

function normalizeMethod(method: string): string {
    method = method.toUpperCase();
    if (!methods.has(method)) {
        throw new Error('Unsupported HTTP method for GM_xmlhttpRequest: ' + method);
    }
    return method;
}

interface RequestOptions {
    readonly credentials?: string;
    readonly headers?: Headers | Record<string, known>;
    readonly method?: string;
    readonly mode?: string;
    readonly body?: string | Blob | FormData;
}

export class Request extends Body {
    readonly url: string;
    readonly credentials: string;
    readonly headers: Headers;
    readonly method: string;
    readonly mode: string | null;
    readonly referrer: null;
    private readonly bodyStore?: string | Blob | FormData;

    constructor(url: string, options?: RequestOptions) {
        super();

        options = options || {};
        this.url = url;

        this.credentials = options.credentials || 'omit';
        this.headers = new Headers(options.headers);
        this.method = normalizeMethod(options.method || 'GET');
        this.mode = options.mode || null;
        this.referrer = null;

        if ((this.method === 'GET' || this.method === 'HEAD') && options.body) {
            throw new TypeError('Body not allowed for GET or HEAD requests');
        }

        this.bodyStore = options.body;
    }

    protected get body(): string | ArrayBuffer | Blob | FormData | undefined {
        return this.bodyStore;
    }

    get bodyRaw(): string | Blob | FormData | undefined {
        return this.bodyStore;
    }
}

function headers(responseHeaders: string): Headers {
    const head = new Headers();
    const pairs = responseHeaders.trim().split('\n');
    pairs.forEach(header => {
        const split = header.trim().split(':');
        const key = split.shift()!.trim();
        const value = split.join(':').trim();
        head.append(key, value);
    });
    return head;
}

export class Response extends Body {
    readonly type: string;
    readonly url: string;
    readonly status: number;
    readonly ok: boolean;
    readonly statusText: string;
    readonly headers: Headers;

    constructor(private readonly response: GM_Types.XHRResponse<unknown>) {
        super();

        this.type = 'default';
        this.status = response.status;
        this.ok = this.status >= 200 && this.status < 300;
        this.statusText = response.statusText;
        this.headers = headers(response.responseHeaders);
        this.url = responseURL(response.finalUrl, response.responseHeaders, this.headers) || '';
    }

    protected get body(): string | ArrayBuffer | Blob | FormData | undefined {
        return this.response.response as ArrayBuffer;
    }

    text(): Promise<string> {
        if (this._bodyUsed) {
            return Promise.reject(new TypeError('Body contents already read'));
        }
        this._bodyUsed = true;

        return Promise.resolve(this.response.responseText);
    }
}

function responseURL(finalUrl: string, rawRespHeaders: string, respHeaders: Headers): string | null {
    if (finalUrl) {
        return finalUrl;
    }

    // Avoid security warnings on getResponseHeader when not allowed by CORS
    if (/^X-Request-URL:/m.test(rawRespHeaders)) {
        return respHeaders.get('X-Request-URL');
    }

    return null;
}

export default function GM_fetch(input: string | Request, init?: RequestOptions): Promise<Response> {
    let request: Request;
    if (input instanceof Request) {
        if (init) {
            request = new Request(input.url, init);
        } else {
            request = input;
        }
    } else {
        request = new Request(input, init);
    }

    if (!['GET', 'HEAD', 'POST'].includes(request.method)) {
        throw new Error('Unsupported method for GM_xmlhttpRequest');
    }

    return new Promise(function (resolve, reject) {
        const xhrDetails: GM_Types.XHRDetails<unknown> = {};

        xhrDetails.method = request.method as 'GET' | 'HEAD' | 'POST';
        xhrDetails.responseType = 'arraybuffer'; // TODO does this affect presence of responseText?
        xhrDetails.url = request.url;

        // Not supported anymore
        //xhr_details.synchronous = false;

        // eslint-disable-next-line unicorn/prefer-add-event-listener
        xhrDetails.onload = resp => {
            const status = resp.status;
            if (status < 100 || status > 599) {
                reject(new TypeError('Network request failed: Status code ' + status));
                return;
            }

            resolve(new Response(resp));
        };

        // eslint-disable-next-line unicorn/prefer-add-event-listener
        xhrDetails.onerror = () => {
            reject(new TypeError('Network request failed'));
        };

        xhrDetails.headers = {};
        for (const [name, value] of request.headers) {
            xhrDetails.headers[name] = value;
        }

        if (typeof request.bodyRaw !== 'undefined') {
            xhrDetails.data = request.bodyRaw; // https://github.com/greasemonkey/greasemonkey/issues/1585 it just WORKS??
        }

        GM_xmlhttpRequest(xhrDetails);

        /*
        // need to see if there's any way of doing this
        if (request.credentials === 'include') {
          xhr.withCredentials = true
        }

        GM_xmlhttpRequest has a responseType param, but this didn't seem to work, at least in TamperMonkey
        if ('responseType' in xhr && support.blob) {
          xhr.responseType = 'blob'
        }
        */
    });
}