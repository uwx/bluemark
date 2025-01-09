// ==UserScript==
// @name     bluemark
// @version  0.0.0
// @author   uwx
// @description Bookmark skeets from Bluesky to Discord
// @include  https://bsky.app/*
// @include  https://*.bsky.dev/*
// @grant    GM_setValue
// @grant    GM_getValue
// @grant    GM_registerMenuCommand
// @grant    GM_xmlhttpRequest
// ==/UserScript==

(() => { // webpackBootstrap
var __webpack_modules__ = ({
"785": (function (__unused_webpack_module, exports, __webpack_require__) {
"use strict";

var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __exportStar = (this && this.__exportStar) || function(m, exports) {
    for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports, p)) __createBinding(exports, m, p);
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.AtUri = exports.ATP_URI_REGEX = void 0;
__exportStar(__webpack_require__(650), exports);
exports.ATP_URI_REGEX = 
// proto-    --did--------------   --name----------------   --path----   --query--   --hash--
/^(at:\/\/)?((?:did:[a-z0-9:%-]+)|(?:[a-z0-9][a-z0-9.:-]*))(\/[^?#\s]*)?(\?[^#\s]+)?(#[^\s]+)?$/i;
//                       --path-----   --query--  --hash--
const RELATIVE_REGEX = /^(\/[^?#\s]*)?(\?[^#\s]+)?(#[^\s]+)?$/i;
class AtUri {
    constructor(uri, base) {
        Object.defineProperty(this, "hash", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "host", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "pathname", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "searchParams", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        let parsed;
        if (base) {
            parsed = parse(base);
            if (!parsed) {
                throw new Error(`Invalid at uri: ${base}`);
            }
            const relativep = parseRelative(uri);
            if (!relativep) {
                throw new Error(`Invalid path: ${uri}`);
            }
            Object.assign(parsed, relativep);
        }
        else {
            parsed = parse(uri);
            if (!parsed) {
                throw new Error(`Invalid at uri: ${uri}`);
            }
        }
        this.hash = parsed.hash;
        this.host = parsed.host;
        this.pathname = parsed.pathname;
        this.searchParams = parsed.searchParams;
    }
    static make(handleOrDid, collection, rkey) {
        let str = handleOrDid;
        if (collection)
            str += '/' + collection;
        if (rkey)
            str += '/' + rkey;
        return new AtUri(str);
    }
    get protocol() {
        return 'at:';
    }
    get origin() {
        return `at://${this.host}`;
    }
    get hostname() {
        return this.host;
    }
    set hostname(v) {
        this.host = v;
    }
    get search() {
        return this.searchParams.toString();
    }
    set search(v) {
        this.searchParams = new URLSearchParams(v);
    }
    get collection() {
        return this.pathname.split('/').filter(Boolean)[0] || '';
    }
    set collection(v) {
        const parts = this.pathname.split('/').filter(Boolean);
        parts[0] = v;
        this.pathname = parts.join('/');
    }
    get rkey() {
        return this.pathname.split('/').filter(Boolean)[1] || '';
    }
    set rkey(v) {
        const parts = this.pathname.split('/').filter(Boolean);
        if (!parts[0])
            parts[0] = 'undefined';
        parts[1] = v;
        this.pathname = parts.join('/');
    }
    get href() {
        return this.toString();
    }
    toString() {
        let path = this.pathname || '/';
        if (!path.startsWith('/')) {
            path = `/${path}`;
        }
        let qs = this.searchParams.toString();
        if (qs && !qs.startsWith('?')) {
            qs = `?${qs}`;
        }
        let hash = this.hash;
        if (hash && !hash.startsWith('#')) {
            hash = `#${hash}`;
        }
        return `at://${this.host}${path}${qs}${hash}`;
    }
}
exports.AtUri = AtUri;
function parse(str) {
    const match = exports.ATP_URI_REGEX.exec(str);
    if (match) {
        return {
            hash: match[5] || '',
            host: match[2] || '',
            pathname: match[3] || '',
            searchParams: new URLSearchParams(match[4] || ''),
        };
    }
    return undefined;
}
function parseRelative(str) {
    const match = RELATIVE_REGEX.exec(str);
    if (match) {
        return {
            hash: match[3] || '',
            pathname: match[1] || '',
            searchParams: new URLSearchParams(match[2] || ''),
        };
    }
    return undefined;
}
//# sourceMappingURL=aturi.js.map

}),
"650": (function (__unused_webpack_module, exports, __webpack_require__) {
"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.ensureValidAtUriRegex = exports.ensureValidAtUri = void 0;
const handle_1 = __webpack_require__(282);
const did_1 = __webpack_require__(187);
const nsid_1 = __webpack_require__(953);
// Human-readable constraints on ATURI:
//   - following regular URLs, a 8KByte hard total length limit
//   - follows ATURI docs on website
//      - all ASCII characters, no whitespace. non-ASCII could be URL-encoded
//      - starts "at://"
//      - "authority" is a valid DID or a valid handle
//      - optionally, follow "authority" with "/" and valid NSID as start of path
//      - optionally, if NSID given, follow that with "/" and rkey
//      - rkey path component can include URL-encoded ("percent encoded"), or:
//          ALPHA / DIGIT / "-" / "." / "_" / "~" / ":" / "@" / "!" / "$" / "&" / "'" / "(" / ")" / "*" / "+" / "," / ";" / "="
//          [a-zA-Z0-9._~:@!$&'\(\)*+,;=-]
//      - rkey must have at least one char
//      - regardless of path component, a fragment can follow  as "#" and then a JSON pointer (RFC-6901)
const ensureValidAtUri = (uri) => {
    // JSON pointer is pretty different from rest of URI, so split that out first
    const uriParts = uri.split('#');
    if (uriParts.length > 2) {
        throw new Error('ATURI can have at most one "#", separating fragment out');
    }
    const fragmentPart = uriParts[1] || null;
    uri = uriParts[0];
    // check that all chars are boring ASCII
    if (!/^[a-zA-Z0-9._~:@!$&')(*+,;=%/-]*$/.test(uri)) {
        throw new Error('Disallowed characters in ATURI (ASCII)');
    }
    const parts = uri.split('/');
    if (parts.length >= 3 && (parts[0] !== 'at:' || parts[1].length !== 0)) {
        throw new Error('ATURI must start with "at://"');
    }
    if (parts.length < 3) {
        throw new Error('ATURI requires at least method and authority sections');
    }
    try {
        if (parts[2].startsWith('did:')) {
            (0, did_1.ensureValidDid)(parts[2]);
        }
        else {
            (0, handle_1.ensureValidHandle)(parts[2]);
        }
    }
    catch {
        throw new Error('ATURI authority must be a valid handle or DID');
    }
    if (parts.length >= 4) {
        if (parts[3].length === 0) {
            throw new Error('ATURI can not have a slash after authority without a path segment');
        }
        try {
            (0, nsid_1.ensureValidNsid)(parts[3]);
        }
        catch {
            throw new Error('ATURI requires first path segment (if supplied) to be valid NSID');
        }
    }
    if (parts.length >= 5) {
        if (parts[4].length === 0) {
            throw new Error('ATURI can not have a slash after collection, unless record key is provided');
        }
        // would validate rkey here, but there are basically no constraints!
    }
    if (parts.length >= 6) {
        throw new Error('ATURI path can have at most two parts, and no trailing slash');
    }
    if (uriParts.length >= 2 && fragmentPart == null) {
        throw new Error('ATURI fragment must be non-empty and start with slash');
    }
    if (fragmentPart != null) {
        if (fragmentPart.length === 0 || fragmentPart[0] !== '/') {
            throw new Error('ATURI fragment must be non-empty and start with slash');
        }
        // NOTE: enforcing *some* checks here for sanity. Eg, at least no whitespace
        if (!/^\/[a-zA-Z0-9._~:@!$&')(*+,;=%[\]/-]*$/.test(fragmentPart)) {
            throw new Error('Disallowed characters in ATURI fragment (ASCII)');
        }
    }
    if (uri.length > 8 * 1024) {
        throw new Error('ATURI is far too long');
    }
};
exports.ensureValidAtUri = ensureValidAtUri;
const ensureValidAtUriRegex = (uri) => {
    // simple regex to enforce most constraints via just regex and length.
    // hand wrote this regex based on above constraints. whew!
    const aturiRegex = /^at:\/\/(?<authority>[a-zA-Z0-9._:%-]+)(\/(?<collection>[a-zA-Z0-9-.]+)(\/(?<rkey>[a-zA-Z0-9._~:@!$&%')(*+,;=-]+))?)?(#(?<fragment>\/[a-zA-Z0-9._~:@!$&%')(*+,;=\-[\]/\\]*))?$/;
    const rm = uri.match(aturiRegex);
    if (!rm || !rm.groups) {
        throw new Error("ATURI didn't validate via regex");
    }
    const groups = rm.groups;
    try {
        (0, handle_1.ensureValidHandleRegex)(groups.authority);
    }
    catch {
        try {
            (0, did_1.ensureValidDidRegex)(groups.authority);
        }
        catch {
            throw new Error('ATURI authority must be a valid handle or DID');
        }
    }
    if (groups.collection) {
        try {
            (0, nsid_1.ensureValidNsidRegex)(groups.collection);
        }
        catch {
            throw new Error('ATURI collection path segment must be a valid NSID');
        }
    }
    if (uri.length > 8 * 1024) {
        throw new Error('ATURI is far too long');
    }
};
exports.ensureValidAtUriRegex = ensureValidAtUriRegex;
//# sourceMappingURL=aturi_validation.js.map

}),
"949": (function (__unused_webpack_module, exports) {
"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.InvalidDatetimeError = exports.normalizeDatetimeAlways = exports.normalizeDatetime = exports.isValidDatetime = exports.ensureValidDatetime = void 0;
/* Validates datetime string against atproto Lexicon 'datetime' format.
 * Syntax is described at: https://atproto.com/specs/lexicon#datetime
 */
const ensureValidDatetime = (dtStr) => {
    const date = new Date(dtStr);
    // must parse as ISO 8601; this also verifies semantics like month is not 13 or 00
    if (isNaN(date.getTime())) {
        throw new InvalidDatetimeError('datetime did not parse as ISO 8601');
    }
    if (date.toISOString().startsWith('-')) {
        throw new InvalidDatetimeError('datetime normalized to a negative time');
    }
    // regex and other checks for RFC-3339
    if (!/^[0-9]{4}-[01][0-9]-[0-3][0-9]T[0-2][0-9]:[0-6][0-9]:[0-6][0-9](.[0-9]{1,20})?(Z|([+-][0-2][0-9]:[0-5][0-9]))$/.test(dtStr)) {
        throw new InvalidDatetimeError("datetime didn't validate via regex");
    }
    if (dtStr.length > 64) {
        throw new InvalidDatetimeError('datetime is too long (64 chars max)');
    }
    if (dtStr.endsWith('-00:00')) {
        throw new InvalidDatetimeError('datetime can not use "-00:00" for UTC timezone');
    }
    if (dtStr.startsWith('000')) {
        throw new InvalidDatetimeError('datetime so close to year zero not allowed');
    }
};
exports.ensureValidDatetime = ensureValidDatetime;
/* Same logic as ensureValidDatetime(), but returns a boolean instead of throwing an exception.
 */
const isValidDatetime = (dtStr) => {
    try {
        (0, exports.ensureValidDatetime)(dtStr);
    }
    catch (err) {
        if (err instanceof InvalidDatetimeError) {
            return false;
        }
        throw err;
    }
    return true;
};
exports.isValidDatetime = isValidDatetime;
/* Takes a flexible datetime string and normalizes representation.
 *
 * This function will work with any valid atproto datetime (eg, anything which isValidDatetime() is true for). It *additionally* is more flexible about accepting datetimes that don't comply to RFC 3339, or are missing timezone information, and normalizing them to a valid datetime.
 *
 * One use-case is a consistent, sortable string. Another is to work with older invalid createdAt datetimes.
 *
 * Successful output will be a valid atproto datetime with millisecond precision (3 sub-second digits) and UTC timezone with trailing 'Z' syntax. Throws `InvalidDatetimeError` if the input string could not be parsed as a datetime, even with permissive parsing.
 *
 * Expected output format: YYYY-MM-DDTHH:mm:ss.sssZ
 */
const normalizeDatetime = (dtStr) => {
    if ((0, exports.isValidDatetime)(dtStr)) {
        const outStr = new Date(dtStr).toISOString();
        if ((0, exports.isValidDatetime)(outStr)) {
            return outStr;
        }
    }
    // check if this permissive datetime is missing a timezone
    if (!/.*(([+-]\d\d:?\d\d)|[a-zA-Z])$/.test(dtStr)) {
        const date = new Date(dtStr + 'Z');
        if (!isNaN(date.getTime())) {
            const tzStr = date.toISOString();
            if ((0, exports.isValidDatetime)(tzStr)) {
                return tzStr;
            }
        }
    }
    // finally try parsing as simple datetime
    const date = new Date(dtStr);
    if (isNaN(date.getTime())) {
        throw new InvalidDatetimeError('datetime did not parse as any timestamp format');
    }
    const isoStr = date.toISOString();
    if ((0, exports.isValidDatetime)(isoStr)) {
        return isoStr;
    }
    else {
        throw new InvalidDatetimeError('datetime normalized to invalid timestamp string');
    }
};
exports.normalizeDatetime = normalizeDatetime;
/* Variant of normalizeDatetime() which always returns a valid datetime strings.
 *
 * If a InvalidDatetimeError is encountered, returns the UNIX epoch time as a UTC datetime (1970-01-01T00:00:00.000Z).
 */
const normalizeDatetimeAlways = (dtStr) => {
    try {
        return (0, exports.normalizeDatetime)(dtStr);
    }
    catch (err) {
        if (err instanceof InvalidDatetimeError) {
            return new Date(0).toISOString();
        }
        throw err;
    }
};
exports.normalizeDatetimeAlways = normalizeDatetimeAlways;
/* Indicates a datetime string did not pass full atproto Lexicon datetime string format checks.
 */
class InvalidDatetimeError extends Error {
}
exports.InvalidDatetimeError = InvalidDatetimeError;
//# sourceMappingURL=datetime.js.map

}),
"187": (function (__unused_webpack_module, exports) {
"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.InvalidDidError = exports.ensureValidDidRegex = exports.ensureValidDid = void 0;
// Human-readable constraints:
//   - valid W3C DID (https://www.w3.org/TR/did-core/#did-syntax)
//      - entire URI is ASCII: [a-zA-Z0-9._:%-]
//      - always starts "did:" (lower-case)
//      - method name is one or more lower-case letters, followed by ":"
//      - remaining identifier can have any of the above chars, but can not end in ":"
//      - it seems that a bunch of ":" can be included, and don't need spaces between
//      - "%" is used only for "percent encoding" and must be followed by two hex characters (and thus can't end in "%")
//      - query ("?") and fragment ("#") stuff is defined for "DID URIs", but not as part of identifier itself
//      - "The current specification does not take a position on the maximum length of a DID"
//   - in current atproto, only allowing did:plc and did:web. But not *forcing* this at lexicon layer
//   - hard length limit of 8KBytes
//   - not going to validate "percent encoding" here
const ensureValidDid = (did) => {
    if (!did.startsWith('did:')) {
        throw new InvalidDidError('DID requires "did:" prefix');
    }
    // check that all chars are boring ASCII
    if (!/^[a-zA-Z0-9._:%-]*$/.test(did)) {
        throw new InvalidDidError('Disallowed characters in DID (ASCII letters, digits, and a couple other characters only)');
    }
    const { length, 1: method } = did.split(':');
    if (length < 3) {
        throw new InvalidDidError('DID requires prefix, method, and method-specific content');
    }
    if (!/^[a-z]+$/.test(method)) {
        throw new InvalidDidError('DID method must be lower-case letters');
    }
    if (did.endsWith(':') || did.endsWith('%')) {
        throw new InvalidDidError('DID can not end with ":" or "%"');
    }
    if (did.length > 2 * 1024) {
        throw new InvalidDidError('DID is too long (2048 chars max)');
    }
};
exports.ensureValidDid = ensureValidDid;
const ensureValidDidRegex = (did) => {
    // simple regex to enforce most constraints via just regex and length.
    // hand wrote this regex based on above constraints
    if (!/^did:[a-z]+:[a-zA-Z0-9._:%-]*[a-zA-Z0-9._-]$/.test(did)) {
        throw new InvalidDidError("DID didn't validate via regex");
    }
    if (did.length > 2 * 1024) {
        throw new InvalidDidError('DID is too long (2048 chars max)');
    }
};
exports.ensureValidDidRegex = ensureValidDidRegex;
class InvalidDidError extends Error {
}
exports.InvalidDidError = InvalidDidError;
//# sourceMappingURL=did.js.map

}),
"282": (function (__unused_webpack_module, exports) {
"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.DisallowedDomainError = exports.UnsupportedDomainError = exports.ReservedHandleError = exports.InvalidHandleError = exports.isValidTld = exports.isValidHandle = exports.normalizeAndEnsureValidHandle = exports.normalizeHandle = exports.ensureValidHandleRegex = exports.ensureValidHandle = exports.DISALLOWED_TLDS = exports.INVALID_HANDLE = void 0;
exports.INVALID_HANDLE = 'handle.invalid';
// Currently these are registration-time restrictions, not protocol-level
// restrictions. We have a couple accounts in the wild that we need to clean up
// before hard-disallow.
// See also: https://en.wikipedia.org/wiki/Top-level_domain#Reserved_domains
exports.DISALLOWED_TLDS = [
    '.local',
    '.arpa',
    '.invalid',
    '.localhost',
    '.internal',
    '.example',
    '.alt',
    // policy could concievably change on ".onion" some day
    '.onion',
    // NOTE: .test is allowed in testing and devopment. In practical terms
    // "should" "never" actually resolve and get registered in production
];
// Handle constraints, in English:
//  - must be a possible domain name
//    - RFC-1035 is commonly referenced, but has been updated. eg, RFC-3696,
//      section 2. and RFC-3986, section 3. can now have leading numbers (eg,
//      4chan.org)
//    - "labels" (sub-names) are made of ASCII letters, digits, hyphens
//    - can not start or end with a hyphen
//    - TLD (last component) should not start with a digit
//    - can't end with a hyphen (can end with digit)
//    - each segment must be between 1 and 63 characters (not including any periods)
//    - overall length can't be more than 253 characters
//    - separated by (ASCII) periods; does not start or end with period
//    - case insensitive
//    - domains (handles) are equal if they are the same lower-case
//    - punycode allowed for internationalization
//  - no whitespace, null bytes, joining chars, etc
//  - does not validate whether domain or TLD exists, or is a reserved or
//    special TLD (eg, .onion or .local)
//  - does not validate punycode
const ensureValidHandle = (handle) => {
    // check that all chars are boring ASCII
    if (!/^[a-zA-Z0-9.-]*$/.test(handle)) {
        throw new InvalidHandleError('Disallowed characters in handle (ASCII letters, digits, dashes, periods only)');
    }
    if (handle.length > 253) {
        throw new InvalidHandleError('Handle is too long (253 chars max)');
    }
    const labels = handle.split('.');
    if (labels.length < 2) {
        throw new InvalidHandleError('Handle domain needs at least two parts');
    }
    for (let i = 0; i < labels.length; i++) {
        const l = labels[i];
        if (l.length < 1) {
            throw new InvalidHandleError('Handle parts can not be empty');
        }
        if (l.length > 63) {
            throw new InvalidHandleError('Handle part too long (max 63 chars)');
        }
        if (l.endsWith('-') || l.startsWith('-')) {
            throw new InvalidHandleError('Handle parts can not start or end with hyphens');
        }
        if (i + 1 === labels.length && !/^[a-zA-Z]/.test(l)) {
            throw new InvalidHandleError('Handle final component (TLD) must start with ASCII letter');
        }
    }
};
exports.ensureValidHandle = ensureValidHandle;
// simple regex translation of above constraints
const ensureValidHandleRegex = (handle) => {
    if (!/^([a-zA-Z0-9]([a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?\.)+[a-zA-Z]([a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?$/.test(handle)) {
        throw new InvalidHandleError("Handle didn't validate via regex");
    }
    if (handle.length > 253) {
        throw new InvalidHandleError('Handle is too long (253 chars max)');
    }
};
exports.ensureValidHandleRegex = ensureValidHandleRegex;
const normalizeHandle = (handle) => {
    return handle.toLowerCase();
};
exports.normalizeHandle = normalizeHandle;
const normalizeAndEnsureValidHandle = (handle) => {
    const normalized = (0, exports.normalizeHandle)(handle);
    (0, exports.ensureValidHandle)(normalized);
    return normalized;
};
exports.normalizeAndEnsureValidHandle = normalizeAndEnsureValidHandle;
const isValidHandle = (handle) => {
    try {
        (0, exports.ensureValidHandle)(handle);
    }
    catch (err) {
        if (err instanceof InvalidHandleError) {
            return false;
        }
        throw err;
    }
    return true;
};
exports.isValidHandle = isValidHandle;
const isValidTld = (handle) => {
    return !exports.DISALLOWED_TLDS.some((domain) => handle.endsWith(domain));
};
exports.isValidTld = isValidTld;
class InvalidHandleError extends Error {
}
exports.InvalidHandleError = InvalidHandleError;
class ReservedHandleError extends Error {
}
exports.ReservedHandleError = ReservedHandleError;
class UnsupportedDomainError extends Error {
}
exports.UnsupportedDomainError = UnsupportedDomainError;
class DisallowedDomainError extends Error {
}
exports.DisallowedDomainError = DisallowedDomainError;
//# sourceMappingURL=handle.js.map

}),
"834": (function (__unused_webpack_module, exports, __webpack_require__) {
"use strict";

var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __exportStar = (this && this.__exportStar) || function(m, exports) {
    for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports, p)) __createBinding(exports, m, p);
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
__exportStar(__webpack_require__(282), exports);
__exportStar(__webpack_require__(187), exports);
__exportStar(__webpack_require__(953), exports);
__exportStar(__webpack_require__(785), exports);
__exportStar(__webpack_require__(778), exports);
__exportStar(__webpack_require__(721), exports);
__exportStar(__webpack_require__(949), exports);
//# sourceMappingURL=index.js.map

}),
"953": (function (__unused_webpack_module, exports) {
"use strict";

/*
Grammar:

alpha     = "a" / "b" / "c" / "d" / "e" / "f" / "g" / "h" / "i" / "j" / "k" / "l" / "m" / "n" / "o" / "p" / "q" / "r" / "s" / "t" / "u" / "v" / "w" / "x" / "y" / "z" / "A" / "B" / "C" / "D" / "E" / "F" / "G" / "H" / "I" / "J" / "K" / "L" / "M" / "N" / "O" / "P" / "Q" / "R" / "S" / "T" / "U" / "V" / "W" / "X" / "Y" / "Z"
number    = "1" / "2" / "3" / "4" / "5" / "6" / "7" / "8" / "9" / "0"
delim     = "."
segment   = alpha *( alpha / number / "-" )
authority = segment *( delim segment )
name      = alpha *( alpha )
nsid      = authority delim name

*/
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.InvalidNsidError = exports.ensureValidNsidRegex = exports.ensureValidNsid = exports.NSID = void 0;
class NSID {
    static parse(nsid) {
        return new NSID(nsid);
    }
    static create(authority, name) {
        const segments = [...authority.split('.').reverse(), name].join('.');
        return new NSID(segments);
    }
    static isValid(nsid) {
        try {
            NSID.parse(nsid);
            return true;
        }
        catch (e) {
            return false;
        }
    }
    constructor(nsid) {
        Object.defineProperty(this, "segments", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: []
        });
        (0, exports.ensureValidNsid)(nsid);
        this.segments = nsid.split('.');
    }
    get authority() {
        return this.segments
            .slice(0, this.segments.length - 1)
            .reverse()
            .join('.');
    }
    get name() {
        return this.segments.at(this.segments.length - 1);
    }
    toString() {
        return this.segments.join('.');
    }
}
exports.NSID = NSID;
// Human readable constraints on NSID:
// - a valid domain in reversed notation
// - followed by an additional period-separated name, which is camel-case letters
const ensureValidNsid = (nsid) => {
    const toCheck = nsid;
    // check that all chars are boring ASCII
    if (!/^[a-zA-Z0-9.-]*$/.test(toCheck)) {
        throw new InvalidNsidError('Disallowed characters in NSID (ASCII letters, digits, dashes, periods only)');
    }
    if (toCheck.length > 253 + 1 + 63) {
        throw new InvalidNsidError('NSID is too long (317 chars max)');
    }
    const labels = toCheck.split('.');
    if (labels.length < 3) {
        throw new InvalidNsidError('NSID needs at least three parts');
    }
    for (let i = 0; i < labels.length; i++) {
        const l = labels[i];
        if (l.length < 1) {
            throw new InvalidNsidError('NSID parts can not be empty');
        }
        if (l.length > 63) {
            throw new InvalidNsidError('NSID part too long (max 63 chars)');
        }
        if (l.endsWith('-') || l.startsWith('-')) {
            throw new InvalidNsidError('NSID parts can not start or end with hyphen');
        }
        if (/^[0-9]/.test(l) && i === 0) {
            throw new InvalidNsidError('NSID first part may not start with a digit');
        }
        if (!/^[a-zA-Z]+$/.test(l) && i + 1 === labels.length) {
            throw new InvalidNsidError('NSID name part must be only letters');
        }
    }
};
exports.ensureValidNsid = ensureValidNsid;
const ensureValidNsidRegex = (nsid) => {
    // simple regex to enforce most constraints via just regex and length.
    // hand wrote this regex based on above constraints
    if (!/^[a-zA-Z]([a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(\.[a-zA-Z0-9]([a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)+(\.[a-zA-Z]([a-zA-Z]{0,61}[a-zA-Z])?)$/.test(nsid)) {
        throw new InvalidNsidError("NSID didn't validate via regex");
    }
    if (nsid.length > 253 + 1 + 63) {
        throw new InvalidNsidError('NSID is too long (317 chars max)');
    }
};
exports.ensureValidNsidRegex = ensureValidNsidRegex;
class InvalidNsidError extends Error {
}
exports.InvalidNsidError = InvalidNsidError;
//# sourceMappingURL=nsid.js.map

}),
"721": (function (__unused_webpack_module, exports) {
"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.InvalidRecordKeyError = exports.isValidRecordKey = exports.ensureValidRecordKey = void 0;
const ensureValidRecordKey = (rkey) => {
    if (rkey.length > 512 || rkey.length < 1) {
        throw new InvalidRecordKeyError('record key must be 1 to 512 characters');
    }
    // simple regex to enforce most constraints via just regex and length.
    if (!/^[a-zA-Z0-9_~.:-]{1,512}$/.test(rkey)) {
        throw new InvalidRecordKeyError('record key syntax not valid (regex)');
    }
    if (rkey === '.' || rkey === '..')
        throw new InvalidRecordKeyError('record key can not be "." or ".."');
};
exports.ensureValidRecordKey = ensureValidRecordKey;
const isValidRecordKey = (rkey) => {
    try {
        (0, exports.ensureValidRecordKey)(rkey);
    }
    catch (err) {
        if (err instanceof InvalidRecordKeyError) {
            return false;
        }
        throw err;
    }
    return true;
};
exports.isValidRecordKey = isValidRecordKey;
class InvalidRecordKeyError extends Error {
}
exports.InvalidRecordKeyError = InvalidRecordKeyError;
//# sourceMappingURL=recordkey.js.map

}),
"778": (function (__unused_webpack_module, exports) {
"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.InvalidTidError = exports.isValidTid = exports.ensureValidTid = void 0;
const ensureValidTid = (tid) => {
    if (tid.length !== 13) {
        throw new InvalidTidError('TID must be 13 characters');
    }
    // simple regex to enforce most constraints via just regex and length.
    if (!/^[234567abcdefghij][234567abcdefghijklmnopqrstuvwxyz]{12}$/.test(tid)) {
        throw new InvalidTidError('TID syntax not valid (regex)');
    }
};
exports.ensureValidTid = ensureValidTid;
const isValidTid = (tid) => {
    try {
        (0, exports.ensureValidTid)(tid);
    }
    catch (err) {
        if (err instanceof InvalidTidError) {
            return false;
        }
        throw err;
    }
    return true;
};
exports.isValidTid = isValidTid;
class InvalidTidError extends Error {
}
exports.InvalidTidError = InvalidTidError;
//# sourceMappingURL=tid.js.map

}),
"78": (function (__unused_webpack_module, exports) {
var __webpack_unused_export__;
/*
Copyright 2009+, GM_config Contributors (https://github.com/sizzlemctwizzle/GM_config)

GM_config Collaborators/Contributors:
    Mike Medley <medleymind@gmail.com>
    Joe Simmons
    Izzy Soft
    Marti Martz
    Adam Thompson-Sharpe

GM_config is distributed under the terms of the GNU Lesser General Public License.

    GM_config is free software: you can redistribute it and/or modify
    it under the terms of the GNU Lesser General Public License as published by
    the Free Software Foundation, either version 3 of the License, or
    (at your option) any later version.

    This program is distributed in the hope that it will be useful,
    but WITHOUT ANY WARRANTY; without even the implied warranty of
    MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
    GNU Lesser General Public License for more details.

    You should have received a copy of the GNU Lesser General Public License
    along with this program.  If not, see <https://www.gnu.org/licenses/>.
*/

// ==UserScript==
// @exclude       *
// @author        Mike Medley <medleymind@gmail.com> (https://github.com/sizzlemctwizzle/GM_config)
// @icon          https://raw.githubusercontent.com/sizzlemctwizzle/GM_config/master/gm_config_icon_large.png

// ==UserLibrary==
// @name          GM_config
// @description   A lightweight, reusable, cross-browser graphical settings framework for inclusion in user scripts.
// @copyright     2009+, Mike Medley (https://github.com/sizzlemctwizzle)
// @license       LGPL-3.0-or-later; https://raw.githubusercontent.com/sizzlemctwizzle/GM_config/master/LICENSE

// @homepageURL   https://openuserjs.org/libs/sizzle/GM_config
// @homepageURL   https://github.com/sizzlemctwizzle/GM_config
// @supportURL    https://github.com/sizzlemctwizzle/GM_config/issues

// ==/UserScript==

// ==/UserLibrary==

/* jshint esversion: 8 */

let GM_config = (function (GM) {
  // This is the initializer function
  function GM_configInit(config, args) {
    // Initialize instance variables
    if (typeof config.fields == "undefined") {
      config.fields = {};
      config.onInit = config.onInit || function() {};
      config.onOpen = config.onOpen || function() {};
      config.onSave = config.onSave || function() {};
      config.onClose = config.onClose || function() {};
      config.onReset = config.onReset || function() {};
      config.isOpen = false;
      config.title = 'User Script Settings';
      config.css = {
        basic: [
          "#GM_config * { font-family: arial,tahoma,myriad pro,sans-serif; }",
          "#GM_config { background: #FFF; }",
          "#GM_config input[type='radio'] { margin-right: 8px; }",
          "#GM_config .indent40 { margin-left: 40%; }",
          "#GM_config .field_label { font-size: 12px; font-weight: bold; margin-right: 6px; }",
          "#GM_config .radio_label { font-size: 12px; }",
          "#GM_config .block { display: block; }",
          "#GM_config .saveclose_buttons { margin: 16px 10px 10px; padding: 2px 12px; }",
          "#GM_config .reset, #GM_config .reset a," +
            " #GM_config_buttons_holder { color: #000; text-align: right; }",
          "#GM_config .config_header { font-size: 20pt; margin: 0; }",
          "#GM_config .config_desc, #GM_config .section_desc, #GM_config .reset { font-size: 9pt; }",
          "#GM_config .center { text-align: center; }",
          "#GM_config .section_header_holder { margin-top: 8px; }",
          "#GM_config .config_var { margin: 0 0 4px; }",
          "#GM_config .section_header { background: #414141; border: 1px solid #000; color: #FFF;",
          " font-size: 13pt; margin: 0; }",
          "#GM_config .section_desc { background: #EFEFEF; border: 1px solid #CCC; color: #575757;" +
            " font-size: 9pt; margin: 0 0 6px; }"
          ].join('\n') + '\n',
        basicPrefix: "GM_config",
        stylish: ""
      };
    }
    config.frameStyle = [
      'bottom: auto; border: 1px solid #000; display: none; height: 75%;',
      'left: 0; margin: 0; max-height: 95%; max-width: 95%; opacity: 0;',
      'overflow: auto; padding: 0; position: fixed; right: auto; top: 0;',
      'width: 75%; z-index: 9999;'
	].join(' ');

    var settings = null;
    if (args.length == 1 &&
      typeof args[0].id == "string" &&
      typeof args[0].appendChild != "function") settings = args[0];
    else {
      // Provide backwards-compatibility with argument style intialization
      settings = {};

      // loop through GM_config.init() arguments
      for (let i = 0, l = args.length, arg; i < l; ++i) {
        arg = args[i];

        // An element to use as the config window
        if (typeof arg.appendChild == "function") {
          settings.frame = arg;
          continue;
        }

        switch (typeof arg) {
          case 'object':
            for (let j in arg) { // could be a callback functions or settings object
              if (typeof arg[j] != "function") { // we are in the settings object
                settings.fields = arg; // store settings object
                break; // leave the loop
              } // otherwise it must be a callback function
              if (!settings.events) settings.events = {};
              settings.events[j] = arg[j];
            }
            break;
          case 'function': // passing a bare function is set to open callback
            settings.events = {onOpen: arg};
            break;
          case 'string': // could be custom CSS or the title string
            if (/\w+\s*\{\s*\w+\s*:\s*\w+[\s|\S]*\}/.test(arg))
              settings.css = arg;
            else
              settings.title = arg;
            break;
        }
      }
    }

    /* Initialize everything using the new settings object */
    // Set the id
    if (settings.id) config.id = settings.id;
    else if (typeof config.id == "undefined") config.id = 'GM_config';

    // Set the title
    if (settings.title) config.title = settings.title;

    // Set the custom css
    if (settings.css) config.css.stylish = settings.css;

    // Set the frame
    if (settings.frame) config.frame = settings.frame;
	
    // Set the style attribute of the frame
    if (typeof settings.frameStyle === 'string') config.frameStyle = settings.frameStyle;

    // Set the event callbacks
    if (settings.events) {
      let events = settings.events;
      for (let e in events) {
        config["on" + e.charAt(0).toUpperCase() + e.slice(1)] = events[e];
      }
    }

    // If the id has changed we must modify the default style
    if (config.id != config.css.basicPrefix) {
      config.css.basic = config.css.basic.replace(
        new RegExp('#' + config.css.basicPrefix, 'gm'), '#' + config.id);
      config.css.basicPrefix = config.id;
    }

    // Create the fields
    config.isInit = false;
    if (settings.fields) {
      config.read(null, (stored) => { // read the stored settings
        let fields = settings.fields,
            customTypes = settings.types || {},
            configId = config.id;

        for (let id in fields) {
          let field = fields[id],
              fieldExists = false;

          if (config.fields[id]) {
            fieldExists = true;
          }

          // for each field definition create a field object
          if (field) {
            if (config.isOpen && fieldExists) {
                config.fields[id].remove();
            }

            config.fields[id] = new GM_configField(field, stored[id], id,
              customTypes[field.type], configId);

            // Add field to open frame
            if (config.isOpen) {
              config.fields[id].wrapper = config.fields[id].toNode();
              config.frameSection.appendChild(config.fields[id].wrapper);
            }
          } else if (!field && fieldExists) {
            // Remove field from open frame
            if (config.isOpen) {
              config.fields[id].remove();
            }

            delete config.fields[id];
          }
        }

        config.isInit = true;
        config.onInit.call(config);
      });
    } else {
      config.isInit = true;
      config.onInit.call(config);
    }
  }

  let construct = function () {
    // Parsing of input provided via frontends
    GM_configInit(this, arguments);
  };
  construct.prototype = {
    // Support re-initalization
    init: function() {
      GM_configInit(this, arguments);
    },

    // call GM_config.open() from your script to open the menu
    open: function () {
      // don't open before init is finished
      if (!this.isInit) {
        setTimeout(() => this.open(), 0);
        return;
      }
      // Die if the menu is already open on this page
      // You can have multiple instances but you can't open the same instance twice
      let match = document.getElementById(this.id);
      if (match && (match.tagName == "IFRAME" || match.childNodes.length > 0)) return;

      // Sometimes "this" gets overwritten so create an alias
      let config = this;

      // Function to build the mighty config window :)
      function buildConfigWin (body, head) {
        let create = config.create,
            fields = config.fields,
            configId = config.id,
            bodyWrapper = create('div', {id: configId + '_wrapper'});

        // Append the style which is our default style plus the user style
        head.appendChild(
          create('style', {
          type: 'text/css',
          textContent: config.css.basic + config.css.stylish
        }));

        // Add header and title
        bodyWrapper.appendChild(create('div', {
          id: configId + '_header',
          className: 'config_header block center'
        }, config.title));

        // Append elements
        let section = bodyWrapper,
            secNum = 0; // Section count

        // loop through fields
        for (let id in fields) {
          let field = fields[id],
              settings = field.settings;

          if (settings.section) { // the start of a new section
            section = bodyWrapper.appendChild(create('div', {
                className: 'section_header_holder',
                id: configId + '_section_' + secNum
              }));

            if (!Array.isArray(settings.section))
              settings.section = [settings.section];

            if (settings.section[0])
              section.appendChild(create('div', {
                className: 'section_header center',
                id: configId + '_section_header_' + secNum
              }, settings.section[0]));

            if (settings.section[1])
              section.appendChild(create('p', {
                className: 'section_desc center',
                id: configId + '_section_desc_' + secNum
              }, settings.section[1]));
            ++secNum;
          }
          
          if (secNum === 0) {
            section = bodyWrapper.appendChild(create('div', {
                className: 'section_header_holder',
                id: configId + '_section_' + (secNum++)
            }));
          }

          // Create field elements and append to current section
          section.appendChild((field.wrapper = field.toNode()));
        }
        
        config.frameSection = section;

        // Add save and close buttons
        bodyWrapper.appendChild(create('div',
          {id: configId + '_buttons_holder'},

          create('button', {
            id: configId + '_saveBtn',
            textContent: 'Save',
            title: 'Save settings',
            className: 'saveclose_buttons',
            onclick: function () { config.save(); }
          }),

          create('button', {
            id: configId + '_closeBtn',
            textContent: 'Close',
            title: 'Close window',
            className: 'saveclose_buttons',
            onclick: function () { config.close(); }
          }),

          create('div',
            {className: 'reset_holder block'},

            // Reset link
            create('a', {
              id: configId + '_resetLink',
              textContent: 'Reset to defaults',
              href: '#',
              title: 'Reset fields to default values',
              className: 'reset',
              onclick: function(e) { e.preventDefault(); config.reset(); }
            })
        )));

        body.appendChild(bodyWrapper); // Paint everything to window at once
        config.center(); // Show and center iframe
        window.addEventListener('resize', config.center, false); // Center frame on resize

        // Call the open() callback function
        config.onOpen(config.frame.contentDocument || config.frame.ownerDocument,
                      config.frame.contentWindow || window,
                      config.frame);

        // Close frame on window close
        window.addEventListener('beforeunload', function () {
            config.close();
        }, false);

        // Now that everything is loaded, make it visible
        config.frame.style.display = "block";
        config.isOpen = true;
      }

      // Either use the element passed to init() or create an iframe
      if (this.frame) {
        this.frame.id = this.id; // Allows for prefixing styles with the config id
        if (this.frameStyle) this.frame.setAttribute('style', this.frameStyle);
        buildConfigWin(this.frame, this.frame.ownerDocument.getElementsByTagName('head')[0]);
      } else {
        // Create frame
        this.frame = this.create('iframe', { id: this.id });
        if (this.frameStyle) this.frame.setAttribute('style', this.frameStyle);
        document.body.appendChild(this.frame);

        // In WebKit src can't be set until it is added to the page
        this.frame.src = '';
        // we wait for the iframe to load before we can modify it
        let that = this;
        this.frame.addEventListener('load', function(e) {
            let frame = config.frame;
            if (!frame.contentDocument) {
              that.log("GM_config failed to initialize default settings dialog node!");
            } else {
              let body = frame.contentDocument.getElementsByTagName('body')[0];
              body.id = config.id; // Allows for prefixing styles with the config id
              buildConfigWin(body, frame.contentDocument.getElementsByTagName('head')[0]);
            }
        }, false);
      }
    },

    save: function () {
      this.write(null, null, (vals) => this.onSave(vals));
    },

    close: function() {
      // If frame is an iframe then remove it
      if (this.frame && this.frame.contentDocument) {
        this.remove(this.frame);
        this.frame = null;
      } else if (this.frame) { // else wipe its content
        this.frame.innerHTML = "";
        this.frame.style.display = "none";
      }

      // Null out all the fields so we don't leak memory
      let fields = this.fields;
      for (let id in fields) {
        let field = fields[id];
        field.wrapper = null;
        field.node = null;
      }

      this.onClose(); //  Call the close() callback function
      this.isOpen = false;
    },

    set: function (name, val) {
      this.fields[name].value = val;

      if (this.fields[name].node) {
        this.fields[name].reload();
      }
    },

    get: function (name, getLive) {
      /* Migration warning */
      if (!this.isInit) {
        this.log('GM_config: get called before init, see https://github.com/sizzlemctwizzle/GM_config/issues/113');
      }

      let field = this.fields[name],
          fieldVal = null;

      if (getLive && field.node) {
        fieldVal = field.toValue();
      }

      return fieldVal != null ? fieldVal : field.value;
    },

    write: function (store, obj, cb) {
      let forgotten = null,
          values = null;
      if (!obj) {
        let fields = this.fields;

        values = {};
        forgotten = {};

        for (let id in fields) {
          let field = fields[id];
          let value = field.toValue();

          if (field.save) {
            if (value != null) {
              values[id] = value;
              field.value = value;
            } else
              values[id] = field.value;
          } else
            forgotten[id] = value != null ? value : field.value;
        }
      }

      (async () => {
        try {
          let val = this.stringify(obj || values);
          await this.setValue(store || this.id, val);
        } catch(e) {
          this.log("GM_config failed to save settings!");
        }
        cb(forgotten);
      })();
    },

    read: function (store, cb) {
      (async () => {
        let val = await this.getValue(store || this.id, '{}');
        try {
          let rval = this.parser(val);
          cb(rval);
        } catch(e) {
          this.log("GM_config failed to read saved settings!");
          cb({});
        }
      })();
    },

    reset: function () {
      let fields = this.fields;

      // Reset all the fields
      for (let id in fields) { fields[id].reset(); }

      this.onReset(); // Call the reset() callback function
    },

    create: function () {
      let A = null,
          B = null;
      switch(arguments.length) {
        case 1:
          A = document.createTextNode(arguments[0]);
          break;
        default:
          A = document.createElement(arguments[0]);
          B = arguments[1];
          for (let b in B) {
            if (b.indexOf("on") == 0)
              A.addEventListener(b.substring(2), B[b], false);
            else if (",style,accesskey,id,name,src,href,which,for".indexOf("," +
                     b.toLowerCase()) != -1)
              A.setAttribute(b, B[b]);
            else
              A[b] = B[b];
          }
          if (typeof arguments[2] == "string")
            A.innerHTML = arguments[2];
          else
            for (let i = 2, len = arguments.length; i < len; ++i)
              A.appendChild(arguments[i]);
      }
      return A;
    },

    center: function () {
      let node = this.frame;
      if (!node) return;
      let style = node.style,
          beforeOpacity = style.opacity;
      if (style.display == 'none') style.opacity = '0';
      style.display = '';
      style.top = Math.floor((window.innerHeight / 2) - (node.offsetHeight / 2)) + 'px';
      style.left = Math.floor((window.innerWidth / 2) - (node.offsetWidth / 2)) + 'px';
      style.opacity = '1';
    },

    remove: function (el) {
      if (el && el.parentNode) el.parentNode.removeChild(el);
    }
  };

  construct.prototype.name = 'GM_config';
  construct.prototype.constructor = construct;
  let isGM4 = typeof GM.getValue !== 'undefined' &&
    typeof GM.setValue !== 'undefined';
  let isGM = isGM4 || (typeof GM_getValue !== 'undefined' &&
    typeof GM_getValue('a', 'b') !== 'undefined');
  construct.prototype.isGM = isGM;

  if (!isGM4) {
    let promisify = (old) => (...args) => {
      return new Promise((resolve, reject) => {
        try {
          resolve(old.apply(this, args));
        } catch (e) {
          reject(e);
        }
      });
    };

    let getValue = isGM ? GM_getValue
      : (name, def) => {
        let s = localStorage.getItem(name);
        return s !== null ? s : def;
      };
    let setValue = isGM ? GM_setValue
      : (name, value) => localStorage.setItem(name, value);
    let log = typeof GM_log !== 'undefined' ? GM_log : console.log;

    GM.getValue = promisify(getValue);
    GM.setValue = promisify(setValue);
    GM.log = promisify(log);
  }

  construct.prototype.stringify = JSON.stringify;
  construct.prototype.parser = JSON.parse;
  construct.prototype.getValue = GM.getValue;
  construct.prototype.setValue = GM.setValue;
  construct.prototype.log = GM.log || console.log;

  // Passthrough frontends for new and old usage
  let config = function () {
    return new (config.bind.apply(construct,
      [null].concat(Array.from(arguments))));
  };
  config.prototype.constructor = config;

  // Support old method of initalizing
  config.init = function () {
    GM_config = config.apply(this, arguments);
    GM_config.init = function() {
      GM_configInit(this, arguments);
    };
  };

  // Reusable functions and properties
  // Usable via GM_config.*
  config.create = construct.prototype.create;
  config.isGM = construct.prototype.isGM;
  config.setValue = construct.prototype.setValue;
  config.getValue = construct.prototype.getValue;
  config.stringify = construct.prototype.stringify;
  config.parser = construct.prototype.parser;
  config.log = construct.prototype.log;
  config.remove = construct.prototype.remove;
  config.read = construct.prototype.read.bind(config);
  config.write = construct.prototype.write.bind(config);

  return config;
}(typeof GM === 'object' ? GM : Object.create(null)));
let GM_configStruct = GM_config;

function GM_configField(settings, stored, id, customType, configId) {
  // Store the field's settings
  this.settings = settings;
  this.id = id;
  this.configId = configId;
  this.node = null;
  this.wrapper = null;
  this.save = typeof settings.save == "undefined" ? true : settings.save;

  // Buttons are static and don't have a stored value
  if (settings.type == "button") this.save = false;

  // if a default value wasn't passed through init() then
  //   if the type is custom use its default value
  //   else use default value for type
  // else use the default value passed through init()
  this['default'] = typeof settings['default'] == "undefined" ?
    customType ?
      customType['default']
      : this.defaultValue(settings.type, settings.options)
    : settings['default'];

  // Store the field's value
  this.value = typeof stored == "undefined" ? this['default'] : stored;

  // Setup methods for a custom type
  if (customType) {
    this.toNode = customType.toNode;
    this.toValue = customType.toValue;
    this.reset = customType.reset;
  }
}

GM_configField.prototype = {
  create: GM_config.create,

  defaultValue: function(type, options) {
    let value;

    if (type.indexOf('unsigned ') == 0)
      type = type.substring(9);

    switch (type) {
      case 'radio': case 'select':
        value = options[0];
        break;
      case 'checkbox':
        value = false;
        break;
      case 'int': case 'integer':
      case 'float': case 'number':
        value = 0;
        break;
      default:
        value = '';
    }

    return value;
  },

  toNode: function() {
    let field = this.settings,
        value = this.value,
        options = field.options,
        type = field.type,
        id = this.id,
        configId = this.configId,
        labelPos = field.labelPos,
        create = this.create;

    function addLabel(pos, labelEl, parentNode, beforeEl) {
      if (!beforeEl) beforeEl = parentNode.firstChild;
      switch (pos) {
        case 'right': case 'below':
          if (pos == 'below')
            parentNode.appendChild(create('br', {}));
          parentNode.appendChild(labelEl);
          break;
        default:
          if (pos == 'above')
            parentNode.insertBefore(create('br', {}), beforeEl);
          parentNode.insertBefore(labelEl, beforeEl);
      }
    }

    let retNode = create('div', { className: 'config_var',
          id: configId + '_' + id + '_var',
          title: field.title || '' }),
        firstProp;

    // Retrieve the first prop
    for (let i in field) { firstProp = i; break; }

    let label = field.label && type != "button" ?
      create('label', {
        id: configId + '_' + id + '_field_label',
        for: configId + '_field_' + id,
        className: 'field_label'
      }, field.label) : null;

    let wrap = null;
    switch (type) {
      case 'textarea':
        retNode.appendChild((this.node = create('textarea', {
          innerHTML: value,
          id: configId + '_field_' + id,
          className: 'block',
          cols: (field.cols ? field.cols : 20),
          rows: (field.rows ? field.rows : 2)
        })));
        break;
      case 'radio':
        wrap = create('div', {
          id: configId + '_field_' + id
        });
        this.node = wrap;

        for (let i = 0, len = options.length; i < len; ++i) {
          let radLabel = create('label', {
            className: 'radio_label'
          }, options[i]);

          let rad = wrap.appendChild(create('input', {
            value: options[i],
            type: 'radio',
            name: id,
            checked: options[i] == value
          }));

          let radLabelPos = labelPos &&
            (labelPos == 'left' || labelPos == 'right') ?
            labelPos : firstProp == 'options' ? 'left' : 'right';

          addLabel(radLabelPos, radLabel, wrap, rad);
        }

        retNode.appendChild(wrap);
        break;
      case 'select':
        wrap = create('select', {
          id: configId + '_field_' + id
        });
        this.node = wrap;

        for (let i = 0, len = options.length; i < len; ++i) {
          let option = options[i];
          wrap.appendChild(create('option', {
            value: option,
            selected: option == value
          }, option));
        }

        retNode.appendChild(wrap);
        break;
      default: // fields using input elements
        let props = {
          id: configId + '_field_' + id,
          type: type,
          value: type == 'button' ? field.label : value
        };

        switch (type) {
          case 'checkbox':
            props.checked = value;
            break;
          case 'button':
            props.size = field.size ? field.size : 25;
            if (field.script) field.click = field.script;
            if (field.click) props.onclick = field.click;
            break;
          case 'hidden':
            break;
          default:
            // type = text, int, or float
            props.type = 'text';
            props.size = field.size ? field.size : 25;
        }

        retNode.appendChild((this.node = create('input', props)));
    }

    if (label) {
      // If the label is passed first, insert it before the field
      // else insert it after
      if (!labelPos)
        labelPos = firstProp == "label" || type == "radio" ?
          "left" : "right";

      addLabel(labelPos, label, retNode);
    }

    return retNode;
  },

  toValue: function() {
    let node = this.node,
        field = this.settings,
        type = field.type,
        unsigned = false,
        rval = null;

    if (!node) return rval;

    if (type.indexOf('unsigned ') == 0) {
      type = type.substring(9);
      unsigned = true;
    }

    switch (type) {
      case 'checkbox':
        rval = node.checked;
        break;
      case 'select':
        rval = node[node.selectedIndex].value;
        break;
      case 'radio':
        let radios = node.getElementsByTagName('input');
        for (let i = 0, len = radios.length; i < len; ++i) {
          if (radios[i].checked)
            rval = radios[i].value;
        }
        break;
      case 'button':
        break;
      case 'int': case 'integer':
      case 'float': case 'number':
        let num = Number(node.value);
        let warn = 'Field labeled "' + field.label + '" expects a' +
          (unsigned ? ' positive ' : 'n ') + 'integer value';

        if (isNaN(num) || (type.substr(0, 3) == 'int' &&
            Math.ceil(num) != Math.floor(num)) ||
            (unsigned && num < 0)) {
          alert(warn + '.');
          return null;
        }

        if (!this._checkNumberRange(num, warn))
          return null;
        rval = num;
        break;
      default:
        rval = node.value;
        break;
    }

    return rval; // value read successfully
  },

  reset: function() {
    let node = this.node,
        field = this.settings,
        type = field.type;

    if (!node) return;

    switch (type) {
      case 'checkbox':
        node.checked = this['default'];
        break;
      case 'select':
        for (let i = 0, len = node.options.length; i < len; ++i) {
          if (node.options[i].textContent == this['default'])
            node.selectedIndex = i;
        }
        break;
      case 'radio':
        let radios = node.getElementsByTagName('input');
        for (let i = 0, len = radios.length; i < len; ++i) {
          if (radios[i].value == this['default'])
            radios[i].checked = true;
        }
        break;
      case 'button' :
        break;
      default:
        node.value = this['default'];
        break;
      }
  },

  remove: function() {
    GM_config.remove(this.wrapper);
    this.wrapper = null;
    this.node = null;
  },

  reload: function() {
    let wrapper = this.wrapper;
    if (wrapper) {
      let fieldParent = wrapper.parentNode;
      let newWrapper = this.toNode();
      fieldParent.insertBefore(newWrapper, wrapper);
      GM_config.remove(this.wrapper);
      this.wrapper = newWrapper;
    }
  },

  _checkNumberRange: function(num, warn) {
    let field = this.settings;
    if (typeof field.min == "number" && num < field.min) {
      alert(warn + ' greater than or equal to ' + field.min + '.');
      return null;
    }

    if (typeof field.max == "number" && num > field.max) {
      alert(warn + ' less than or equal to ' + field.max + '.');
      return null;
    }
    return true;
  }
};

exports.GM_config = GM_config;
__webpack_unused_export__ = GM_configStruct;
__webpack_unused_export__ = GM_configField;

}),

});
/************************************************************************/
// The module cache
var __webpack_module_cache__ = {};

// The require function
function __webpack_require__(moduleId) {

// Check if module is in cache
var cachedModule = __webpack_module_cache__[moduleId];
if (cachedModule !== undefined) {
return cachedModule.exports;
}
// Create a new module (and put it into the cache)
var module = (__webpack_module_cache__[moduleId] = {
exports: {}
});
// Execute the module function
__webpack_modules__[moduleId].call(module.exports, module, module.exports, __webpack_require__);

// Return the exports of the module
return module.exports;

}

/************************************************************************/
// webpack/runtime/define_property_getters
(() => {
__webpack_require__.d = function(exports, definition) {
	for(var key in definition) {
        if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
            Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
        }
    }
};
})();
// webpack/runtime/has_own_property
(() => {
__webpack_require__.o = function (obj, prop) {
	return Object.prototype.hasOwnProperty.call(obj, prop);
};

})();
// webpack/runtime/make_namespace_object
(() => {
// define __esModule on exports
__webpack_require__.r = function(exports) {
	if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
		Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
	}
	Object.defineProperty(exports, '__esModule', { value: true });
};

})();
// webpack/runtime/rspack_version
(() => {
__webpack_require__.rv = function () {
	return "1.1.8";
};

})();
// webpack/runtime/rspack_unique_id
(() => {
__webpack_require__.ruid = "bundler=rspack@1.1.8";

})();
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be in strict mode.
(() => {
"use strict";
// NAMESPACE OBJECT: ./node_modules/.pnpm/multiformats@13.3.1/node_modules/multiformats/dist/src/bases/base10.js
var base10_namespaceObject = {};
__webpack_require__.r(base10_namespaceObject);
__webpack_require__.d(base10_namespaceObject, { 
  base10: () => (base10) });

// NAMESPACE OBJECT: ./node_modules/.pnpm/multiformats@13.3.1/node_modules/multiformats/dist/src/bases/base16.js
var base16_namespaceObject = {};
__webpack_require__.r(base16_namespaceObject);
__webpack_require__.d(base16_namespaceObject, { 
  base16: () => (base16),
  base16upper: () => (base16upper) });

// NAMESPACE OBJECT: ./node_modules/.pnpm/multiformats@13.3.1/node_modules/multiformats/dist/src/bases/base2.js
var base2_namespaceObject = {};
__webpack_require__.r(base2_namespaceObject);
__webpack_require__.d(base2_namespaceObject, { 
  base2: () => (base2) });

// NAMESPACE OBJECT: ./node_modules/.pnpm/multiformats@13.3.1/node_modules/multiformats/dist/src/bases/base256emoji.js
var base256emoji_namespaceObject = {};
__webpack_require__.r(base256emoji_namespaceObject);
__webpack_require__.d(base256emoji_namespaceObject, { 
  base256emoji: () => (base256emoji) });

// NAMESPACE OBJECT: ./node_modules/.pnpm/multiformats@13.3.1/node_modules/multiformats/dist/src/bases/base32.js
var base32_namespaceObject = {};
__webpack_require__.r(base32_namespaceObject);
__webpack_require__.d(base32_namespaceObject, { 
  base32: () => (base32),
  base32hex: () => (base32hex),
  base32hexpad: () => (base32hexpad),
  base32hexpadupper: () => (base32hexpadupper),
  base32hexupper: () => (base32hexupper),
  base32pad: () => (base32pad),
  base32padupper: () => (base32padupper),
  base32upper: () => (base32upper),
  base32z: () => (base32z) });

// NAMESPACE OBJECT: ./node_modules/.pnpm/multiformats@13.3.1/node_modules/multiformats/dist/src/bases/base36.js
var base36_namespaceObject = {};
__webpack_require__.r(base36_namespaceObject);
__webpack_require__.d(base36_namespaceObject, { 
  base36: () => (base36),
  base36upper: () => (base36upper) });

// NAMESPACE OBJECT: ./node_modules/.pnpm/multiformats@13.3.1/node_modules/multiformats/dist/src/bases/base58.js
var base58_namespaceObject = {};
__webpack_require__.r(base58_namespaceObject);
__webpack_require__.d(base58_namespaceObject, { 
  base58btc: () => (base58btc),
  base58flickr: () => (base58flickr) });

// NAMESPACE OBJECT: ./node_modules/.pnpm/multiformats@13.3.1/node_modules/multiformats/dist/src/bases/base64.js
var base64_namespaceObject = {};
__webpack_require__.r(base64_namespaceObject);
__webpack_require__.d(base64_namespaceObject, { 
  base64: () => (base64_base64),
  base64pad: () => (base64pad),
  base64url: () => (base64url),
  base64urlpad: () => (base64urlpad) });

// NAMESPACE OBJECT: ./node_modules/.pnpm/multiformats@13.3.1/node_modules/multiformats/dist/src/bases/base8.js
var base8_namespaceObject = {};
__webpack_require__.r(base8_namespaceObject);
__webpack_require__.d(base8_namespaceObject, { 
  base8: () => (base8) });

// NAMESPACE OBJECT: ./node_modules/.pnpm/multiformats@13.3.1/node_modules/multiformats/dist/src/bases/identity.js
var identity_namespaceObject = {};
__webpack_require__.r(identity_namespaceObject);
__webpack_require__.d(identity_namespaceObject, { 
  identity: () => (identity) });

// NAMESPACE OBJECT: ./node_modules/.pnpm/multiformats@13.3.1/node_modules/multiformats/dist/src/hashes/identity.js
var hashes_identity_namespaceObject = {};
__webpack_require__.r(hashes_identity_namespaceObject);
__webpack_require__.d(hashes_identity_namespaceObject, { 
  identity: () => (identity_identity) });

// NAMESPACE OBJECT: ./node_modules/.pnpm/multiformats@13.3.1/node_modules/multiformats/dist/src/hashes/sha2-browser.js
var sha2_browser_namespaceObject = {};
__webpack_require__.r(sha2_browser_namespaceObject);
__webpack_require__.d(sha2_browser_namespaceObject, { 
  sha256: () => (sha256),
  sha512: () => (sha512) });


;// CONCATENATED MODULE: ./node_modules/.pnpm/@atcute+client@2.0.6/node_modules/@atcute/client/dist/fetch-handler.js
const buildFetchHandler = (handler) => {
    if (typeof handler === 'object') {
        return handler.handle.bind(handler);
    }
    return handler;
};
const simpleFetchHandler = ({ service, fetch: _fetch = fetch, }) => {
    return async (pathname, init) => {
        const url = new URL(pathname, service);
        return _fetch(url, init);
    };
};
//# sourceMappingURL=fetch-handler.js.map
;// CONCATENATED MODULE: ./node_modules/.pnpm/@atcute+client@2.0.6/node_modules/@atcute/client/dist/utils/http.js
/**
 * @module
 * Assortment of HTTP utilities
 * This module is exported for convenience and is no way part of public API,
 * it can be removed at any time.
 */
const mergeHeaders = (init, defaults) => {
    let headers;
    for (const name in defaults) {
        const value = defaults[name];
        if (value !== null) {
            headers ??= new Headers(init);
            if (!headers.has(name)) {
                headers.set(name, value);
            }
        }
    }
    return headers ?? init;
};
//# sourceMappingURL=http.js.map
;// CONCATENATED MODULE: ./node_modules/.pnpm/@atcute+client@2.0.6/node_modules/@atcute/client/dist/rpc.js


/** Error coming from the XRPC service */
class XRPCError extends Error {
    constructor(status, { kind = `HTTP error ${status}`, description = `Unspecified error description`, headers, cause, } = {}) {
        super(`${kind} > ${description}`, { cause });
        this.name = 'XRPCError';
        this.status = status;
        this.kind = kind;
        this.description = description;
        this.headers = headers || {};
    }
}
class XRPC {
    constructor({ handler, proxy }) {
        this.handle = buildFetchHandler(handler);
        this.proxy = proxy;
    }
    /**
     * Makes a query (GET) request
     * @param nsid Namespace ID of a query endpoint
     * @param options Options to include like parameters
     * @returns The response of the request
     */
    get(nsid, options) {
        return this.request({ type: 'get', nsid: nsid, ...options });
    }
    /**
     * Makes a procedure (POST) request
     * @param nsid Namespace ID of a procedure endpoint
     * @param options Options to include like input body or parameters
     * @returns The response of the request
     */
    call(nsid, options) {
        return this.request({ type: 'post', nsid: nsid, ...options });
    }
    /** Makes a request to the XRPC service */
    async request(options) {
        const data = options.data;
        const url = `/xrpc/${options.nsid}` + constructSearchParams(options.params);
        const isInputJson = isJsonValue(data);
        const response = await this.handle(url, {
            method: options.type,
            signal: options.signal,
            body: isInputJson ? JSON.stringify(data) : data,
            headers: mergeHeaders(options.headers, {
                'content-type': isInputJson ? 'application/json' : null,
                'atproto-proxy': constructProxyHeader(this.proxy),
            }),
        });
        const responseStatus = response.status;
        const responseHeaders = Object.fromEntries(response.headers);
        const responseType = responseHeaders['content-type'];
        let promise;
        let ret;
        if (responseType) {
            if (responseType.startsWith('application/json')) {
                promise = response.json();
            }
            else if (responseType.startsWith('text/')) {
                promise = response.text();
            }
        }
        try {
            ret = await (promise || response.arrayBuffer().then((buffer) => new Uint8Array(buffer)));
        }
        catch (err) {
            throw new XRPCError(2, {
                cause: err,
                kind: 'InvalidResponse',
                description: `Failed to parse response body`,
                headers: responseHeaders,
            });
        }
        if (responseStatus === 200) {
            return {
                data: ret,
                headers: responseHeaders,
            };
        }
        if (isErrorResponse(ret)) {
            throw new XRPCError(responseStatus, {
                kind: ret.error,
                description: ret.message,
                headers: responseHeaders,
            });
        }
        throw new XRPCError(responseStatus, { headers: responseHeaders });
    }
}
const constructProxyHeader = (proxy) => {
    if (proxy) {
        return `${proxy.service}#${proxy.type}`;
    }
    return null;
};
const constructSearchParams = (params) => {
    let searchParams;
    for (const key in params) {
        const value = params[key];
        if (value !== undefined) {
            searchParams ??= new URLSearchParams();
            if (Array.isArray(value)) {
                for (let idx = 0, len = value.length; idx < len; idx++) {
                    const val = value[idx];
                    searchParams.append(key, '' + val);
                }
            }
            else {
                searchParams.set(key, '' + value);
            }
        }
    }
    return searchParams ? `?` + searchParams.toString() : '';
};
const isJsonValue = (o) => {
    if (typeof o !== 'object' || o === null) {
        return false;
    }
    if ('toJSON' in o) {
        return true;
    }
    const proto = Object.getPrototypeOf(o);
    return proto === null || proto === Object.prototype;
};
const isErrorResponse = (value) => {
    if (typeof value !== 'object' || value === null) {
        return false;
    }
    const kindType = typeof value.error;
    const messageType = typeof value.message;
    return ((kindType === 'undefined' || kindType === 'string') &&
        (messageType === 'undefined' || messageType === 'string'));
};
const clone = (rpc) => {
    return new XRPC({ handler: rpc.handle, proxy: rpc.proxy });
};
const withProxy = (rpc, options) => {
    return new XRPC({ handler: rpc.handle, proxy: options });
};
//# sourceMappingURL=rpc.js.map
;// CONCATENATED MODULE: ./node_modules/.pnpm/@atcute+client@2.0.6/node_modules/@atcute/client/dist/utils/did.js
/**
 * @module
 * DID document-related functionalities.
 * This module is exported for convenience and is no way part of public API,
 * it can be removed at any time.
 */
/**
 * Retrieves AT Protocol PDS endpoint from the DID document, if available
 * @param doc DID document
 * @returns The PDS endpoint, if available
 */
const getPdsEndpoint = (doc) => {
    return getServiceEndpoint(doc, '#atproto_pds', 'AtprotoPersonalDataServer');
};
/**
 * Retrieve a service endpoint from the DID document, if available
 * @param doc DID document
 * @param serviceId Service ID
 * @param serviceType Service type
 * @returns The requested service endpoint, if available
 */
const getServiceEndpoint = (doc, serviceId, serviceType) => {
    const did = doc.id;
    const didServiceId = did + serviceId;
    const found = doc.service?.find((service) => service.id === serviceId || service.id === didServiceId);
    if (!found || found.type !== serviceType || typeof found.serviceEndpoint !== 'string') {
        return undefined;
    }
    return validateUrl(found.serviceEndpoint);
};
const validateUrl = (urlStr) => {
    let url;
    try {
        url = new URL(urlStr);
    }
    catch {
        return undefined;
    }
    const proto = url.protocol;
    if (url.hostname && (proto === 'http:' || proto === 'https:')) {
        return urlStr;
    }
};
//# sourceMappingURL=did.js.map
;// CONCATENATED MODULE: ./node_modules/.pnpm/@atcute+client@2.0.6/node_modules/@atcute/client/dist/utils/jwt.js
/**
 * @module
 * JWT decoding utilities for session resumption checks.
 * This module is exported for convenience and is no way part of public API,
 * it can be removed at any time.
 */
/**
 * Decodes a JWT token
 * @param token The token string
 * @returns JSON object from the token
 */
const decodeJwt = (token) => {
    const pos = 1;
    const part = token.split('.')[1];
    let decoded;
    if (typeof part !== 'string') {
        throw new Error('invalid token: missing part ' + (pos + 1));
    }
    try {
        decoded = base64UrlDecode(part);
    }
    catch (e) {
        throw new Error('invalid token: invalid b64 for part ' + (pos + 1) + ' (' + e.message + ')');
    }
    try {
        return JSON.parse(decoded);
    }
    catch (e) {
        throw new Error('invalid token: invalid json for part ' + (pos + 1) + ' (' + e.message + ')');
    }
};
/**
 * Decodes a URL-safe Base64 string
 * @param str URL-safe Base64 that needed to be decoded
 * @returns The actual string
 */
const base64UrlDecode = (str) => {
    let output = str.replace(/-/g, '+').replace(/_/g, '/');
    switch (output.length % 4) {
        case 0:
            break;
        case 2:
            output += '==';
            break;
        case 3:
            output += '=';
            break;
        default:
            throw new Error('base64 string is not of the correct length');
    }
    try {
        return b64DecodeUnicode(output);
    }
    catch {
        return atob(output);
    }
};
const b64DecodeUnicode = (str) => {
    return decodeURIComponent(atob(str).replace(/(.)/g, (_m, p) => {
        let code = p.charCodeAt(0).toString(16).toUpperCase();
        if (code.length < 2) {
            code = '0' + code;
        }
        return '%' + code;
    }));
};
//# sourceMappingURL=jwt.js.map
;// CONCATENATED MODULE: ./node_modules/.pnpm/@atcute+client@2.0.6/node_modules/@atcute/client/dist/credential-manager.js




class CredentialManager {
    #server;
    #refreshSessionPromise;
    #onExpired;
    #onRefresh;
    #onSessionUpdate;
    constructor({ service, onExpired, onRefresh, onSessionUpdate, fetch: _fetch = fetch, }) {
        this.serviceUrl = service;
        this.fetch = _fetch;
        this.#server = new XRPC({ handler: simpleFetchHandler({ service: service, fetch: _fetch }) });
        this.#onRefresh = onRefresh;
        this.#onExpired = onExpired;
        this.#onSessionUpdate = onSessionUpdate;
    }
    get dispatchUrl() {
        return this.session?.pdsUri ?? this.serviceUrl;
    }
    async handle(pathname, init) {
        await this.#refreshSessionPromise;
        const url = new URL(pathname, this.dispatchUrl);
        const headers = new Headers(init.headers);
        if (!this.session || headers.has('authorization')) {
            return (0, this.fetch)(url, init);
        }
        headers.set('authorization', `Bearer ${this.session.accessJwt}`);
        const initialResponse = await (0, this.fetch)(url, { ...init, headers });
        const isExpired = await isExpiredTokenResponse(initialResponse);
        if (!isExpired) {
            return initialResponse;
        }
        try {
            await this.#refreshSession();
        }
        catch {
            return initialResponse;
        }
        // Return initial response if:
        // - refreshSession returns expired
        // - Body stream has been consumed
        if (!this.session || init.body instanceof ReadableStream) {
            return initialResponse;
        }
        headers.set('authorization', `Bearer ${this.session.accessJwt}`);
        return await (0, this.fetch)(url, { ...init, headers });
    }
    #refreshSession() {
        return (this.#refreshSessionPromise ||= this.#refreshSessionInner().finally(() => (this.#refreshSessionPromise = undefined)));
    }
    async #refreshSessionInner() {
        const currentSession = this.session;
        if (!currentSession) {
            return;
        }
        try {
            const { data } = await this.#server.call('com.atproto.server.refreshSession', {
                headers: {
                    authorization: `Bearer ${currentSession.refreshJwt}`,
                },
            });
            this.#updateSession({ ...currentSession, ...data });
            this.#onRefresh?.(this.session);
        }
        catch (err) {
            if (err instanceof XRPCError) {
                const kind = err.kind;
                if (kind === 'ExpiredToken' || kind === 'InvalidToken') {
                    this.session = undefined;
                    this.#onExpired?.(currentSession);
                }
            }
        }
    }
    #updateSession(raw) {
        const didDoc = raw.didDoc;
        let pdsUri;
        if (didDoc) {
            pdsUri = getPdsEndpoint(didDoc);
        }
        const newSession = {
            accessJwt: raw.accessJwt,
            refreshJwt: raw.refreshJwt,
            handle: raw.handle,
            did: raw.did,
            pdsUri: pdsUri,
            email: raw.email,
            emailConfirmed: raw.emailConfirmed,
            emailAuthFactor: raw.emailConfirmed,
            active: raw.active ?? true,
            inactiveStatus: raw.status,
        };
        this.session = newSession;
        this.#onSessionUpdate?.(newSession);
        return newSession;
    }
    /**
     * Resume a saved session
     * @param session Session information, taken from `AtpAuth#session` after login
     */
    async resume(session) {
        const now = Date.now() / 1000 + 60 * 5;
        const refreshToken = decodeJwt(session.refreshJwt);
        if (now >= refreshToken.exp) {
            throw new XRPCError(401, { kind: 'InvalidToken' });
        }
        const accessToken = decodeJwt(session.accessJwt);
        this.session = session;
        if (now >= accessToken.exp) {
            await this.#refreshSession();
        }
        else {
            const promise = this.#server.get('com.atproto.server.getSession', {
                headers: {
                    authorization: `Bearer ${session.accessJwt}`,
                },
            });
            promise.then((response) => {
                const existing = this.session;
                const next = response.data;
                if (!existing) {
                    return;
                }
                this.#updateSession({ ...existing, ...next });
            });
        }
        if (!this.session) {
            throw new XRPCError(401, { kind: 'InvalidToken' });
        }
        return this.session;
    }
    /**
     * Perform a login operation
     * @param options Login options
     * @returns Session data that can be saved for later
     */
    async login(options) {
        // Reset the session
        this.session = undefined;
        const res = await this.#server.call('com.atproto.server.createSession', {
            data: {
                identifier: options.identifier,
                password: options.password,
                authFactorToken: options.code,
            },
        });
        return this.#updateSession(res.data);
    }
}
const isExpiredTokenResponse = async (response) => {
    if (response.status !== 400) {
        return false;
    }
    if (extractContentType(response.headers) !== 'application/json') {
        return false;
    }
    // {"error":"ExpiredToken","message":"Token has expired"}
    // {"error":"ExpiredToken","message":"Token is expired"}
    if (extractContentLength(response.headers) > 54 * 1.5) {
        return false;
    }
    try {
        const { error, message } = await response.clone().json();
        return error === 'ExpiredToken' && (typeof message === 'string' || message === undefined);
    }
    catch { }
    return false;
};
const extractContentType = (headers) => {
    return headers.get('content-type')?.split(';')[0]?.trim();
};
const extractContentLength = (headers) => {
    return Number(headers.get('content-length') ?? ';');
};
//# sourceMappingURL=credential-manager.js.map
;// CONCATENATED MODULE: ./node_modules/.pnpm/@atcute+client@2.0.6/node_modules/@atcute/client/dist/index.js



//# sourceMappingURL=index.js.map
// EXTERNAL MODULE: ./node_modules/.pnpm/@atproto+syntax@0.3.1/node_modules/@atproto/syntax/dist/index.js
var dist = __webpack_require__("834");
;// CONCATENATED MODULE: ./node_modules/.pnpm/kitty-agent@8.3.0_@atcute+cid@2.1.0_@atcute+client@2.0.6_@atcute+oauth-browser-client@1.0.9_@atproto+syntax@0.3.1/node_modules/kitty-agent/out/handles/did-document.js
/*!
https://github.com/mary-ext/atcute

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
*/
/**
 * Retrieves AT Protocol PDS endpoint from the DID document, if available
 * @param doc DID document
 * @returns The PDS endpoint, if available
 */
function did_document_getPdsEndpoint(doc) {
    return did_document_getServiceEndpoint(doc, '#atproto_pds', 'AtprotoPersonalDataServer');
}
/**
 * Retrieve a service endpoint from the DID document, if available
 * @param doc DID document
 * @param serviceId Service ID
 * @param serviceType Service type
 * @returns The requested service endpoint, if available
 */
function did_document_getServiceEndpoint(doc, serviceId, serviceType) {
    const did = doc.id;
    const didServiceId = did + serviceId;
    const found = doc.service?.find((service) => service.id === serviceId || service.id === didServiceId);
    if (!found || found.type !== serviceType || typeof found.serviceEndpoint !== 'string') {
        return undefined;
    }
    return did_document_validateUrl(found.serviceEndpoint);
}
function did_document_validateUrl(urlStr) {
    let url;
    try {
        url = new URL(urlStr);
    }
    catch {
        return undefined;
    }
    const proto = url.protocol;
    if (url.hostname && (proto === 'http:' || proto === 'https:')) {
        return urlStr;
    }
}
async function getDidDocument(did) {
    const colon_index = did.indexOf(':', 4);
    const type = did.slice(4, colon_index);
    const ident = did.slice(colon_index + 1);
    // 2. retrieve their DID documents
    let doc;
    if (type === 'plc') {
        const response = await fetch(`https://plc.directory/${did}`);
        if (response.status === 404) {
            throw new Error('did not found in directory');
        }
        if (!response.ok) {
            throw new Error('directory is unreachable');
        }
        const json = await response.json();
        doc = json;
    }
    else if (type === 'web') {
        const DID_WEB_RE = /^([a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*(?:\.[a-zA-Z]{2,}))$/;
        if (!DID_WEB_RE.test(ident)) {
            throw new Error('invalid identifier');
        }
        const response = await fetch(`https://${ident}/.well-known/did.json`);
        if (!response.ok) {
            throw new Error('did document is unreachable');
        }
        const json = await response.json();
        doc = json;
    }
    else {
        throw new Error('unsupported did method');
    }
    return doc;
}
function getDid(didDoc) {
    return didDoc.id;
}
function getHandle(didDoc) {
    return didDoc.alsoKnownAs
        ?.find(handle => handle.startsWith('at://'))
        ?.slice('at://'.length);
}
//# sourceMappingURL=did-document.js.map
;// CONCATENATED MODULE: ./node_modules/.pnpm/kitty-agent@8.3.0_@atcute+cid@2.1.0_@atcute+client@2.0.6_@atcute+oauth-browser-client@1.0.9_@atproto+syntax@0.3.1/node_modules/kitty-agent/out/handles/index.js
const isDid = (did) => {
    return /^did:([a-z]+):([a-zA-Z0-9._:%-]*[a-zA-Z0-9._-])$/.test(did);
};
//# sourceMappingURL=index.js.map
;// CONCATENATED MODULE: ./node_modules/.pnpm/kitty-agent@8.3.0_@atcute+cid@2.1.0_@atcute+client@2.0.6_@atcute+oauth-browser-client@1.0.9_@atproto+syntax@0.3.1/node_modules/kitty-agent/out/handles/doh.js

const SUBDOMAIN = '_atproto';
const PREFIX = 'did=';
const resolveHandleViaDoH = async (handle) => {
    const url = new URL('https://mozilla.cloudflare-dns.com/dns-query');
    url.searchParams.set('type', 'TXT');
    url.searchParams.set('name', `${SUBDOMAIN}.${handle}`);
    const response = await fetch(url, {
        method: 'GET',
        headers: { accept: 'application/dns-json' },
        redirect: 'follow',
    });
    const type = response.headers.get('content-type')?.trim();
    if (!response.ok) {
        const message = type?.startsWith('text/plain')
            ? await response.text()
            : `failed to resolve ${handle}`;
        throw new Error(message);
    }
    if (type !== 'application/dns-json') {
        throw new Error('unexpected response from DoH server');
    }
    const result = asResult(await response.json());
    const answers = result.Answer?.filter(isAnswerTxt).map(extractTxtData) ?? [];
    for (let i = 0; i < answers.length; i++) {
        // skip if the line does not start with "did="
        if (!answers[i].startsWith(PREFIX)) {
            continue;
        }
        // ensure there is no other entry starting with "did="
        for (let j = i + 1; j < answers.length; j++) {
            if (answers[j].startsWith(PREFIX)) {
                break;
            }
        }
        const did = answers[i].slice(PREFIX.length);
        if (isDid(did)) {
            return did;
        }
        break;
    }
    throw new Error(`failed to resolve ${handle}`);
};
const isResult = (result) => {
    if (result === null || typeof result !== 'object') {
        return false;
    }
    return ('Status' in result &&
        typeof result.Status === 'number' &&
        (!('Answer' in result) || (Array.isArray(result.Answer) && result.Answer.every(isAnswer))));
};
const asResult = (result) => {
    if (!isResult(result)) {
        throw new TypeError('unexpected DoH response');
    }
    return result;
};
const isAnswer = (answer) => {
    if (answer === null || typeof answer !== 'object') {
        return false;
    }
    return ('name' in answer &&
        typeof answer.name === 'string' &&
        'type' in answer &&
        typeof answer.type === 'number' &&
        'data' in answer &&
        typeof answer.data === 'string' &&
        'TTL' in answer &&
        typeof answer.TTL === 'number');
};
const isAnswerTxt = (answer) => {
    return answer.type === 16;
};
const extractTxtData = (answer) => {
    return answer.data.replace(/^"|"$/g, '').replace(/\\"/g, '"');
};
//# sourceMappingURL=doh.js.map
;// CONCATENATED MODULE: ./node_modules/.pnpm/kitty-agent@8.3.0_@atcute+cid@2.1.0_@atcute+client@2.0.6_@atcute+oauth-browser-client@1.0.9_@atproto+syntax@0.3.1/node_modules/kitty-agent/out/handles/http.js

const resolveHandleViaHttp = async (handle) => {
    const url = new URL('/.well-known/atproto-did', `https://${handle}`);
    const response = await fetch(url, { redirect: 'error' });
    if (!response.ok) {
        throw new Error('domain is unreachable');
    }
    const text = await response.text();
    const did = text.split('\n')[0].trim();
    if (isDid(did)) {
        return did;
    }
    throw new Error(`failed to resolve ${handle}`);
};
//# sourceMappingURL=http.js.map
;// CONCATENATED MODULE: ./node_modules/.pnpm/kitty-agent@8.3.0_@atcute+cid@2.1.0_@atcute+client@2.0.6_@atcute+oauth-browser-client@1.0.9_@atproto+syntax@0.3.1/node_modules/kitty-agent/out/handles/resolve.js



const didCache = new Map();
async function resolveHandleAnonymously(handle) {
    if (isDid(handle))
        return handle;
    if (didCache.has(handle)) {
        return didCache.get(handle);
    }
    const results = await Promise.allSettled([
        resolveHandleViaHttp(handle),
        resolveHandleViaDoH(handle),
    ]);
    const did = results
        .find(p => p.status === 'fulfilled')
        ?.value;
    if (did === undefined) {
        throw results;
    }
    didCache.set(handle, did);
    return did;
}
//# sourceMappingURL=resolve.js.map
;// CONCATENATED MODULE: ./node_modules/.pnpm/kitty-agent@8.3.0_@atcute+cid@2.1.0_@atcute+client@2.0.6_@atcute+oauth-browser-client@1.0.9_@atproto+syntax@0.3.1/node_modules/kitty-agent/out/pds-helpers.js


const didPdsCache = new Map();
async function getDidAndPds(handleOrDid) {
    if (didPdsCache.has(handleOrDid)) {
        return didPdsCache.get(handleOrDid);
    }
    const did = await resolveHandleAnonymously(handleOrDid);
    const didDocument = await getDidDocument(did);
    const pds = did_document_getPdsEndpoint(didDocument);
    if (!pds)
        throw new Error(`No PDS for ${handleOrDid} (${did})!`);
    didPdsCache.set(handleOrDid, { did, pds, didDocument });
    return { did, pds, didDocument };
}
//# sourceMappingURL=pds-helpers.js.map
;// CONCATENATED MODULE: ./node_modules/.pnpm/kitty-agent@8.3.0_@atcute+cid@2.1.0_@atcute+client@2.0.6_@atcute+oauth-browser-client@1.0.9_@atproto+syntax@0.3.1/node_modules/kitty-agent/out/agent.js
/* eslint-disable @typescript-eslint/no-empty-object-type */




function isInvalidSwapError(err) {
    return err instanceof XRPCError && err.kind === 'InvalidSwap';
}
function isRecordNotFoundError(err) {
    return err instanceof XRPCError && err.kind === 'RecordNotFound';
}
function makeRecordTyped(record) {
    let memoizedAtUri;
    const uri = record.uri; // closure variable
    return {
        ...record,
        value: record.value,
        get uri() {
            return memoizedAtUri ??= new dist.AtUri(uri);
        }
    };
}
function makeRecordsTyped(value) {
    return {
        ...value,
        records: value.records.map(makeRecordTyped)
    };
}
class KittyAgent {
    xrpc;
    constructor(opts) {
        this.xrpc = opts instanceof XRPC ? opts : new XRPC(opts);
    }
    /**
     * Gets a read-only client for bsky.social PDSes.
     */
    static createUnauthed(service = 'https://bsky.social') {
        return new KittyAgent({ handler: simpleFetchHandler({ service }) });
    }
    /**
     * Gets a read-only client for the Bluesky AppView.
     */
    static createAppview(service = 'https://api.bsky.app') {
        return new KittyAgent({ handler: simpleFetchHandler({ service }) });
    }
    static pdsAgentCache = new Map();
    /**
     * Gets a read-only client for the PDS hosting a specific account via handle or DID.
     */
    static async getOrCreatePds(handleOrDid) {
        const did = await resolveHandleAnonymously(handleOrDid);
        const existingAgent = KittyAgent.pdsAgentCache.get(did);
        if (existingAgent)
            return existingAgent;
        const didAndPds = await getDidAndPds(did);
        const agent = KittyAgent.createUnauthed(didAndPds.pds);
        KittyAgent.pdsAgentCache.set(did, agent);
        return agent;
    }
    /**
     * Gets an authenticated client for the PDS hosting a specific account via handle or DID.
     */
    static async createPdsWithCredentials(handleOrDid) {
        const { did, pds } = await getDidAndPds(handleOrDid);
        const manager = new CredentialManager({ service: pds });
        const agent = new KittyAgent({ handler: manager });
        return { did, manager, agent };
    }
    /** Makes a request to the XRPC service */
    async request(options) {
        return await this.xrpc.request(options);
    }
    async query(nsid, ...args) {
        const [params, data] = args;
        const { data: outData } = await this.xrpc.get(nsid, { params, data, });
        return outData;
    }
    async call(nsid, ...args) {
        const [data, params] = args;
        const { data: outData } = await this.xrpc.call(nsid, { params, data });
        return outData;
    }
    async get(params) {
        const data = makeRecordTyped(await this.query('com.atproto.repo.getRecord', params));
        return data;
    }
    async getBlob(params) {
        if (typeof params.cid !== 'string') {
            params = {
                cid: params.cid.ref.$link,
                did: params.did,
            };
        }
        const data = await this.query('com.atproto.sync.getBlob', params);
        return data;
    }
    /**
     * Atcute likes to return blobs as text sometimes. I don't know why yet. This returns them as binary if that
     * happens.
     */
    async getBlobAsBinary(params) {
        let blob = await this.getBlob(params);
        if (typeof blob === 'string')
            blob = new TextEncoder().encode(blob);
        return blob;
    }
    /**
     * Atcute likes to return blobs as text sometimes. I don't know why yet. This returns them as text no matter what,
     * and also allows you to specify an encoding.
     */
    async getBlobAsText(params, encoding) {
        let blob = await this.getBlob(params);
        if (typeof blob !== 'string')
            blob = new TextDecoder(encoding).decode(blob);
        return blob;
    }
    async tryGet(params) {
        try {
            return await this.get(params);
        }
        catch (err) {
            if (!isRecordNotFoundError(err))
                throw err;
            return {
                uri: undefined,
                value: undefined,
                cid: undefined,
            };
        }
    }
    async list(params) {
        const data = makeRecordsTyped(await this.query('com.atproto.repo.listRecords', params));
        return data;
    }
    async put(params) {
        const data = await this.call('com.atproto.repo.putRecord', params);
        return data;
    }
    async uploadBlob(buf) {
        const data = await this.call('com.atproto.repo.uploadBlob', buf);
        return data.blob;
    }
    async trySwap(params) {
        try {
            await this.put(params);
            return true;
        }
        catch (err) {
            if (!isInvalidSwapError(err)) {
                throw err;
            }
            return false;
        }
    }
    async create(params) {
        const data = await this.call('com.atproto.repo.createRecord', params);
        return data;
    }
    async delete(params) {
        const data = await this.call('com.atproto.repo.deleteRecord', params);
        return data;
    }
    async paginationHelper(limit, key, query, getResults, resultsEqual) {
        const PER_PAGE = 100;
        const results = [];
        let cursor = undefined;
        do {
            const data = await query(cursor, limit === undefined
                ? PER_PAGE
                : limit / PER_PAGE > 1
                    ? PER_PAGE
                    : limit);
            const theseResults = getResults(data);
            if (!theseResults.length ||
                theseResults.every(e => results.find(e1 => resultsEqual(e1, e)))) {
                break;
            }
            if (limit !== undefined) {
                limit -= theseResults.length;
            }
            results.push(...theseResults);
            cursor = data.cursor;
            if (!cursor)
                break;
        } while (cursor);
        return { [key]: results, cursor };
    }
    async paginatedList(params) {
        const data = makeRecordsTyped(await this.paginationHelper(params.limit, 'records', async (cursor, limit) => await this.query('com.atproto.repo.listRecords', {
            repo: params.repo,
            collection: params.collection,
            limit,
            reverse: params.reverse ?? true,
            cursor
        }), output => output.records, (a, b) => a.uri === b.uri));
        return data;
    }
    async paginatedListBlobs(params) {
        return await this.paginationHelper(params.limit, 'cids', async (cursor, limit) => await this.query('com.atproto.sync.listBlobs', {
            did: params.did,
            limit,
            cursor
        }), output => output.cids, (a, b) => a === b);
    }
    async paginatedListRepos(params) {
        return await this.paginationHelper(params.limit, 'repos', async (cursor, limit) => await this.query('com.atproto.sync.listRepos', {
            limit,
            cursor
        }), output => output.repos, (a, b) => a.did === b.did);
    }
    async batchWrite(params) {
        return await this.call('com.atproto.repo.applyWrites', params);
    }
    async resolveHandle(handle) {
        if (handle.startsWith('did:'))
            return handle;
        const { did } = await this.query('com.atproto.identity.resolveHandle', {
            handle
        });
        return did;
    }
}
//# sourceMappingURL=agent.js.map
;// CONCATENATED MODULE: ./node_modules/.pnpm/kitty-agent@8.3.0_@atcute+cid@2.1.0_@atcute+client@2.0.6_@atcute+oauth-browser-client@1.0.9_@atproto+syntax@0.3.1/node_modules/kitty-agent/out/index.js






//# sourceMappingURL=index.js.map
;// CONCATENATED MODULE: ./node_modules/.pnpm/multiformats@13.3.1/node_modules/multiformats/dist/src/bytes.js
const empty = new Uint8Array(0);
function toHex(d) {
    return d.reduce((hex, byte) => hex + byte.toString(16).padStart(2, '0'), '');
}
function fromHex(hex) {
    const hexes = hex.match(/../g);
    return hexes != null ? new Uint8Array(hexes.map(b => parseInt(b, 16))) : empty;
}
function equals(aa, bb) {
    if (aa === bb)
        return true;
    if (aa.byteLength !== bb.byteLength) {
        return false;
    }
    for (let ii = 0; ii < aa.byteLength; ii++) {
        if (aa[ii] !== bb[ii]) {
            return false;
        }
    }
    return true;
}
function bytes_coerce(o) {
    if (o instanceof Uint8Array && o.constructor.name === 'Uint8Array')
        return o;
    if (o instanceof ArrayBuffer)
        return new Uint8Array(o);
    if (ArrayBuffer.isView(o)) {
        return new Uint8Array(o.buffer, o.byteOffset, o.byteLength);
    }
    throw new Error('Unknown type, must be binary type');
}
function isBinary(o) {
    return o instanceof ArrayBuffer || ArrayBuffer.isView(o);
}
function fromString(str) {
    return new TextEncoder().encode(str);
}
function bytes_toString(b) {
    return new TextDecoder().decode(b);
}
//# sourceMappingURL=bytes.js.map
;// CONCATENATED MODULE: ./node_modules/.pnpm/multiformats@13.3.1/node_modules/multiformats/dist/src/vendor/base-x.js
/* eslint-disable */
// base-x encoding / decoding
// Copyright (c) 2018 base-x contributors
// Copyright (c) 2014-2018 The Bitcoin Core developers (base58.cpp)
// Distributed under the MIT software license, see the accompanying
// file LICENSE or http://www.opensource.org/licenses/mit-license.php.
/**
 * @param {string} ALPHABET
 * @param {any} name
 */
function base_x_base(ALPHABET, name) {
    if (ALPHABET.length >= 255) {
        throw new TypeError('Alphabet too long');
    }
    var BASE_MAP = new Uint8Array(256);
    for (var j = 0; j < BASE_MAP.length; j++) {
        BASE_MAP[j] = 255;
    }
    for (var i = 0; i < ALPHABET.length; i++) {
        var x = ALPHABET.charAt(i);
        var xc = x.charCodeAt(0);
        if (BASE_MAP[xc] !== 255) {
            throw new TypeError(x + ' is ambiguous');
        }
        BASE_MAP[xc] = i;
    }
    var BASE = ALPHABET.length;
    var LEADER = ALPHABET.charAt(0);
    var FACTOR = Math.log(BASE) / Math.log(256); // log(BASE) / log(256), rounded up
    var iFACTOR = Math.log(256) / Math.log(BASE); // log(256) / log(BASE), rounded up
    /**
     * @param {any[] | Iterable<number>} source
     */
    function encode(source) {
        // @ts-ignore
        if (source instanceof Uint8Array)
            ;
        else if (ArrayBuffer.isView(source)) {
            source = new Uint8Array(source.buffer, source.byteOffset, source.byteLength);
        }
        else if (Array.isArray(source)) {
            source = Uint8Array.from(source);
        }
        if (!(source instanceof Uint8Array)) {
            throw new TypeError('Expected Uint8Array');
        }
        if (source.length === 0) {
            return '';
        }
        // Skip & count leading zeroes.
        var zeroes = 0;
        var length = 0;
        var pbegin = 0;
        var pend = source.length;
        while (pbegin !== pend && source[pbegin] === 0) {
            pbegin++;
            zeroes++;
        }
        // Allocate enough space in big-endian base58 representation.
        var size = ((pend - pbegin) * iFACTOR + 1) >>> 0;
        var b58 = new Uint8Array(size);
        // Process the bytes.
        while (pbegin !== pend) {
            var carry = source[pbegin];
            // Apply "b58 = b58 * 256 + ch".
            var i = 0;
            for (var it1 = size - 1; (carry !== 0 || i < length) && (it1 !== -1); it1--, i++) {
                carry += (256 * b58[it1]) >>> 0;
                b58[it1] = (carry % BASE) >>> 0;
                carry = (carry / BASE) >>> 0;
            }
            if (carry !== 0) {
                throw new Error('Non-zero carry');
            }
            length = i;
            pbegin++;
        }
        // Skip leading zeroes in base58 result.
        var it2 = size - length;
        while (it2 !== size && b58[it2] === 0) {
            it2++;
        }
        // Translate the result into a string.
        var str = LEADER.repeat(zeroes);
        for (; it2 < size; ++it2) {
            str += ALPHABET.charAt(b58[it2]);
        }
        return str;
    }
    /**
     * @param {string | string[]} source
     */
    function decodeUnsafe(source) {
        if (typeof source !== 'string') {
            throw new TypeError('Expected String');
        }
        if (source.length === 0) {
            return new Uint8Array();
        }
        var psz = 0;
        // Skip leading spaces.
        if (source[psz] === ' ') {
            return;
        }
        // Skip and count leading '1's.
        var zeroes = 0;
        var length = 0;
        while (source[psz] === LEADER) {
            zeroes++;
            psz++;
        }
        // Allocate enough space in big-endian base256 representation.
        var size = (((source.length - psz) * FACTOR) + 1) >>> 0; // log(58) / log(256), rounded up.
        var b256 = new Uint8Array(size);
        // Process the characters.
        while (source[psz]) {
            // Decode character
            var carry = BASE_MAP[source.charCodeAt(psz)];
            // Invalid character
            if (carry === 255) {
                return;
            }
            var i = 0;
            for (var it3 = size - 1; (carry !== 0 || i < length) && (it3 !== -1); it3--, i++) {
                carry += (BASE * b256[it3]) >>> 0;
                b256[it3] = (carry % 256) >>> 0;
                carry = (carry / 256) >>> 0;
            }
            if (carry !== 0) {
                throw new Error('Non-zero carry');
            }
            length = i;
            psz++;
        }
        // Skip trailing spaces.
        if (source[psz] === ' ') {
            return;
        }
        // Skip leading zeroes in b256.
        var it4 = size - length;
        while (it4 !== size && b256[it4] === 0) {
            it4++;
        }
        var vch = new Uint8Array(zeroes + (size - it4));
        var j = zeroes;
        while (it4 !== size) {
            vch[j++] = b256[it4++];
        }
        return vch;
    }
    /**
     * @param {string | string[]} string
     */
    function decode(string) {
        var buffer = decodeUnsafe(string);
        if (buffer) {
            return buffer;
        }
        throw new Error(`Non-${name} character`);
    }
    return {
        encode: encode,
        decodeUnsafe: decodeUnsafe,
        decode: decode
    };
}
var src = base_x_base;
var _brrp__multiformats_scope_baseX = src;
/* ESM default export */ const base_x = (_brrp__multiformats_scope_baseX);
//# sourceMappingURL=base-x.js.map
;// CONCATENATED MODULE: ./node_modules/.pnpm/multiformats@13.3.1/node_modules/multiformats/dist/src/bases/base.js


/**
 * Class represents both BaseEncoder and MultibaseEncoder meaning it
 * can be used to encode to multibase or base encode without multibase
 * prefix.
 */
class Encoder {
    name;
    prefix;
    baseEncode;
    constructor(name, prefix, baseEncode) {
        this.name = name;
        this.prefix = prefix;
        this.baseEncode = baseEncode;
    }
    encode(bytes) {
        if (bytes instanceof Uint8Array) {
            return `${this.prefix}${this.baseEncode(bytes)}`;
        }
        else {
            throw Error('Unknown type, must be binary type');
        }
    }
}
/**
 * Class represents both BaseDecoder and MultibaseDecoder so it could be used
 * to decode multibases (with matching prefix) or just base decode strings
 * with corresponding base encoding.
 */
class Decoder {
    name;
    prefix;
    baseDecode;
    prefixCodePoint;
    constructor(name, prefix, baseDecode) {
        this.name = name;
        this.prefix = prefix;
        const prefixCodePoint = prefix.codePointAt(0);
        /* c8 ignore next 3 */
        if (prefixCodePoint === undefined) {
            throw new Error('Invalid prefix character');
        }
        this.prefixCodePoint = prefixCodePoint;
        this.baseDecode = baseDecode;
    }
    decode(text) {
        if (typeof text === 'string') {
            if (text.codePointAt(0) !== this.prefixCodePoint) {
                throw Error(`Unable to decode multibase string ${JSON.stringify(text)}, ${this.name} decoder only supports inputs prefixed with ${this.prefix}`);
            }
            return this.baseDecode(text.slice(this.prefix.length));
        }
        else {
            throw Error('Can only multibase decode strings');
        }
    }
    or(decoder) {
        return or(this, decoder);
    }
}
class ComposedDecoder {
    decoders;
    constructor(decoders) {
        this.decoders = decoders;
    }
    or(decoder) {
        return or(this, decoder);
    }
    decode(input) {
        const prefix = input[0];
        const decoder = this.decoders[prefix];
        if (decoder != null) {
            return decoder.decode(input);
        }
        else {
            throw RangeError(`Unable to decode multibase string ${JSON.stringify(input)}, only inputs prefixed with ${Object.keys(this.decoders)} are supported`);
        }
    }
}
function or(left, right) {
    // eslint-disable-next-line @typescript-eslint/consistent-type-assertions
    return new ComposedDecoder({
        ...(left.decoders ?? { [left.prefix]: left }),
        ...(right.decoders ?? { [right.prefix]: right })
    });
}
class Codec {
    name;
    prefix;
    baseEncode;
    baseDecode;
    encoder;
    decoder;
    constructor(name, prefix, baseEncode, baseDecode) {
        this.name = name;
        this.prefix = prefix;
        this.baseEncode = baseEncode;
        this.baseDecode = baseDecode;
        this.encoder = new Encoder(name, prefix, baseEncode);
        this.decoder = new Decoder(name, prefix, baseDecode);
    }
    encode(input) {
        return this.encoder.encode(input);
    }
    decode(input) {
        return this.decoder.decode(input);
    }
}
function from({ name, prefix, encode, decode }) {
    return new Codec(name, prefix, encode, decode);
}
function baseX({ name, prefix, alphabet }) {
    const { encode, decode } = base_x(alphabet, name);
    return from({
        prefix,
        name,
        encode,
        decode: (text) => bytes_coerce(decode(text))
    });
}
function base_decode(string, alphabet, bitsPerChar, name) {
    // Build the character lookup table:
    const codes = {};
    for (let i = 0; i < alphabet.length; ++i) {
        codes[alphabet[i]] = i;
    }
    // Count the padding bytes:
    let end = string.length;
    while (string[end - 1] === '=') {
        --end;
    }
    // Allocate the output:
    const out = new Uint8Array((end * bitsPerChar / 8) | 0);
    // Parse the data:
    let bits = 0; // Number of bits currently in the buffer
    let buffer = 0; // Bits waiting to be written out, MSB first
    let written = 0; // Next byte to write
    for (let i = 0; i < end; ++i) {
        // Read one character from the string:
        const value = codes[string[i]];
        if (value === undefined) {
            throw new SyntaxError(`Non-${name} character`);
        }
        // Append the bits to the buffer:
        buffer = (buffer << bitsPerChar) | value;
        bits += bitsPerChar;
        // Write out some bits if the buffer has a byte's worth:
        if (bits >= 8) {
            bits -= 8;
            out[written++] = 0xff & (buffer >> bits);
        }
    }
    // Verify that we have received just enough bits:
    if (bits >= bitsPerChar || (0xff & (buffer << (8 - bits))) !== 0) {
        throw new SyntaxError('Unexpected end of data');
    }
    return out;
}
function base_encode(data, alphabet, bitsPerChar) {
    const pad = alphabet[alphabet.length - 1] === '=';
    const mask = (1 << bitsPerChar) - 1;
    let out = '';
    let bits = 0; // Number of bits currently in the buffer
    let buffer = 0; // Bits waiting to be written out, MSB first
    for (let i = 0; i < data.length; ++i) {
        // Slurp data into the buffer:
        buffer = (buffer << 8) | data[i];
        bits += 8;
        // Write out as much as we can:
        while (bits > bitsPerChar) {
            bits -= bitsPerChar;
            out += alphabet[mask & (buffer >> bits)];
        }
    }
    // Partial character:
    if (bits !== 0) {
        out += alphabet[mask & (buffer << (bitsPerChar - bits))];
    }
    // Add padding characters until we hit a byte boundary:
    if (pad) {
        while (((out.length * bitsPerChar) & 7) !== 0) {
            out += '=';
        }
    }
    return out;
}
/**
 * RFC4648 Factory
 */
function rfc4648({ name, prefix, bitsPerChar, alphabet }) {
    return from({
        prefix,
        name,
        encode(input) {
            return base_encode(input, alphabet, bitsPerChar);
        },
        decode(input) {
            return base_decode(input, alphabet, bitsPerChar, name);
        }
    });
}
//# sourceMappingURL=base.js.map
;// CONCATENATED MODULE: ./node_modules/.pnpm/multiformats@13.3.1/node_modules/multiformats/dist/src/bases/base10.js

const base10 = baseX({
    prefix: '9',
    name: 'base10',
    alphabet: '0123456789'
});
//# sourceMappingURL=base10.js.map
;// CONCATENATED MODULE: ./node_modules/.pnpm/multiformats@13.3.1/node_modules/multiformats/dist/src/bases/base16.js

const base16 = rfc4648({
    prefix: 'f',
    name: 'base16',
    alphabet: '0123456789abcdef',
    bitsPerChar: 4
});
const base16upper = rfc4648({
    prefix: 'F',
    name: 'base16upper',
    alphabet: '0123456789ABCDEF',
    bitsPerChar: 4
});
//# sourceMappingURL=base16.js.map
;// CONCATENATED MODULE: ./node_modules/.pnpm/multiformats@13.3.1/node_modules/multiformats/dist/src/bases/base2.js

const base2 = rfc4648({
    prefix: '0',
    name: 'base2',
    alphabet: '01',
    bitsPerChar: 1
});
//# sourceMappingURL=base2.js.map
;// CONCATENATED MODULE: ./node_modules/.pnpm/multiformats@13.3.1/node_modules/multiformats/dist/src/bases/base256emoji.js

const base256emoji_alphabet = Array.from('🚀🪐☄🛰🌌🌑🌒🌓🌔🌕🌖🌗🌘🌍🌏🌎🐉☀💻🖥💾💿😂❤😍🤣😊🙏💕😭😘👍😅👏😁🔥🥰💔💖💙😢🤔😆🙄💪😉☺👌🤗💜😔😎😇🌹🤦🎉💞✌✨🤷😱😌🌸🙌😋💗💚😏💛🙂💓🤩😄😀🖤😃💯🙈👇🎶😒🤭❣😜💋👀😪😑💥🙋😞😩😡🤪👊🥳😥🤤👉💃😳✋😚😝😴🌟😬🙃🍀🌷😻😓⭐✅🥺🌈😈🤘💦✔😣🏃💐☹🎊💘😠☝😕🌺🎂🌻😐🖕💝🙊😹🗣💫💀👑🎵🤞😛🔴😤🌼😫⚽🤙☕🏆🤫👈😮🙆🍻🍃🐶💁😲🌿🧡🎁⚡🌞🎈❌✊👋😰🤨😶🤝🚶💰🍓💢🤟🙁🚨💨🤬✈🎀🍺🤓😙💟🌱😖👶🥴▶➡❓💎💸⬇😨🌚🦋😷🕺⚠🙅😟😵👎🤲🤠🤧📌🔵💅🧐🐾🍒😗🤑🌊🤯🐷☎💧😯💆👆🎤🙇🍑❄🌴💣🐸💌📍🥀🤢👅💡💩👐📸👻🤐🤮🎼🥵🚩🍎🍊👼💍📣🥂');
const alphabetBytesToChars = (base256emoji_alphabet.reduce((p, c, i) => { p[i] = c; return p; }, ([])));
const alphabetCharsToBytes = (base256emoji_alphabet.reduce((p, c, i) => {
    const codePoint = c.codePointAt(0);
    if (codePoint == null) {
        throw new Error(`Invalid character: ${c}`);
    }
    p[codePoint] = i;
    return p;
}, ([])));
function base256emoji_encode(data) {
    return data.reduce((p, c) => {
        p += alphabetBytesToChars[c];
        return p;
    }, '');
}
function base256emoji_decode(str) {
    const byts = [];
    for (const char of str) {
        const codePoint = char.codePointAt(0);
        if (codePoint == null) {
            throw new Error(`Invalid character: ${char}`);
        }
        const byt = alphabetCharsToBytes[codePoint];
        if (byt == null) {
            throw new Error(`Non-base256emoji character: ${char}`);
        }
        byts.push(byt);
    }
    return new Uint8Array(byts);
}
const base256emoji = from({
    prefix: '🚀',
    name: 'base256emoji',
    encode: base256emoji_encode,
    decode: base256emoji_decode
});
//# sourceMappingURL=base256emoji.js.map
;// CONCATENATED MODULE: ./node_modules/.pnpm/multiformats@13.3.1/node_modules/multiformats/dist/src/bases/base32.js

const base32 = rfc4648({
    prefix: 'b',
    name: 'base32',
    alphabet: 'abcdefghijklmnopqrstuvwxyz234567',
    bitsPerChar: 5
});
const base32upper = rfc4648({
    prefix: 'B',
    name: 'base32upper',
    alphabet: 'ABCDEFGHIJKLMNOPQRSTUVWXYZ234567',
    bitsPerChar: 5
});
const base32pad = rfc4648({
    prefix: 'c',
    name: 'base32pad',
    alphabet: 'abcdefghijklmnopqrstuvwxyz234567=',
    bitsPerChar: 5
});
const base32padupper = rfc4648({
    prefix: 'C',
    name: 'base32padupper',
    alphabet: 'ABCDEFGHIJKLMNOPQRSTUVWXYZ234567=',
    bitsPerChar: 5
});
const base32hex = rfc4648({
    prefix: 'v',
    name: 'base32hex',
    alphabet: '0123456789abcdefghijklmnopqrstuv',
    bitsPerChar: 5
});
const base32hexupper = rfc4648({
    prefix: 'V',
    name: 'base32hexupper',
    alphabet: '0123456789ABCDEFGHIJKLMNOPQRSTUV',
    bitsPerChar: 5
});
const base32hexpad = rfc4648({
    prefix: 't',
    name: 'base32hexpad',
    alphabet: '0123456789abcdefghijklmnopqrstuv=',
    bitsPerChar: 5
});
const base32hexpadupper = rfc4648({
    prefix: 'T',
    name: 'base32hexpadupper',
    alphabet: '0123456789ABCDEFGHIJKLMNOPQRSTUV=',
    bitsPerChar: 5
});
const base32z = rfc4648({
    prefix: 'h',
    name: 'base32z',
    alphabet: 'ybndrfg8ejkmcpqxot1uwisza345h769',
    bitsPerChar: 5
});
//# sourceMappingURL=base32.js.map
;// CONCATENATED MODULE: ./node_modules/.pnpm/multiformats@13.3.1/node_modules/multiformats/dist/src/bases/base36.js

const base36 = baseX({
    prefix: 'k',
    name: 'base36',
    alphabet: '0123456789abcdefghijklmnopqrstuvwxyz'
});
const base36upper = baseX({
    prefix: 'K',
    name: 'base36upper',
    alphabet: '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ'
});
//# sourceMappingURL=base36.js.map
;// CONCATENATED MODULE: ./node_modules/.pnpm/multiformats@13.3.1/node_modules/multiformats/dist/src/bases/base58.js

const base58btc = baseX({
    name: 'base58btc',
    prefix: 'z',
    alphabet: '123456789ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz'
});
const base58flickr = baseX({
    name: 'base58flickr',
    prefix: 'Z',
    alphabet: '123456789abcdefghijkmnopqrstuvwxyzABCDEFGHJKLMNPQRSTUVWXYZ'
});
//# sourceMappingURL=base58.js.map
;// CONCATENATED MODULE: ./node_modules/.pnpm/multiformats@13.3.1/node_modules/multiformats/dist/src/bases/base64.js

const base64_base64 = rfc4648({
    prefix: 'm',
    name: 'base64',
    alphabet: 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/',
    bitsPerChar: 6
});
const base64pad = rfc4648({
    prefix: 'M',
    name: 'base64pad',
    alphabet: 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=',
    bitsPerChar: 6
});
const base64url = rfc4648({
    prefix: 'u',
    name: 'base64url',
    alphabet: 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-_',
    bitsPerChar: 6
});
const base64urlpad = rfc4648({
    prefix: 'U',
    name: 'base64urlpad',
    alphabet: 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-_=',
    bitsPerChar: 6
});
//# sourceMappingURL=base64.js.map
;// CONCATENATED MODULE: ./node_modules/.pnpm/multiformats@13.3.1/node_modules/multiformats/dist/src/bases/base8.js

const base8 = rfc4648({
    prefix: '7',
    name: 'base8',
    alphabet: '01234567',
    bitsPerChar: 3
});
//# sourceMappingURL=base8.js.map
;// CONCATENATED MODULE: ./node_modules/.pnpm/multiformats@13.3.1/node_modules/multiformats/dist/src/bases/identity.js


const identity = from({
    prefix: '\x00',
    name: 'identity',
    encode: (buf) => bytes_toString(buf),
    decode: (str) => fromString(str)
});
//# sourceMappingURL=identity.js.map
;// CONCATENATED MODULE: ./node_modules/.pnpm/multiformats@13.3.1/node_modules/multiformats/dist/src/codecs/json.js
const textEncoder = new TextEncoder();
const textDecoder = new TextDecoder();
const json_name = 'json';
const json_code = 0x0200;
function json_encode(node) {
    return textEncoder.encode(JSON.stringify(node));
}
function json_decode(data) {
    return JSON.parse(textDecoder.decode(data));
}
//# sourceMappingURL=json.js.map
;// CONCATENATED MODULE: ./node_modules/.pnpm/multiformats@13.3.1/node_modules/multiformats/dist/src/codecs/raw.js

const raw_name = 'raw';
const raw_code = 0x55;
function raw_encode(node) {
    return coerce(node);
}
function raw_decode(data) {
    return coerce(data);
}
//# sourceMappingURL=raw.js.map
;// CONCATENATED MODULE: ./node_modules/.pnpm/multiformats@13.3.1/node_modules/multiformats/dist/src/vendor/varint.js
/* eslint-disable */
var encode_1 = varint_encode;
var MSB = 0x80, REST = 0x7F, MSBALL = ~REST, INT = Math.pow(2, 31);
/**
 * @param {number} num
 * @param {number[]} out
 * @param {number} offset
 */
function varint_encode(num, out, offset) {
    out = out || [];
    offset = offset || 0;
    var oldOffset = offset;
    while (num >= INT) {
        out[offset++] = (num & 0xFF) | MSB;
        num /= 128;
    }
    while (num & MSBALL) {
        out[offset++] = (num & 0xFF) | MSB;
        num >>>= 7;
    }
    out[offset] = num | 0;
    // @ts-ignore
    varint_encode.bytes = offset - oldOffset + 1;
    return out;
}
var varint_decode = read;
var MSB$1 = 0x80, REST$1 = 0x7F;
/**
 * @param {string | any[]} buf
 * @param {number} offset
 */
function read(buf, offset) {
    var res = 0, offset = offset || 0, shift = 0, counter = offset, b, l = buf.length;
    do {
        if (counter >= l) {
            // @ts-ignore
            read.bytes = 0;
            throw new RangeError('Could not decode varint');
        }
        b = buf[counter++];
        res += shift < 28
            ? (b & REST$1) << shift
            : (b & REST$1) * Math.pow(2, shift);
        shift += 7;
    } while (b >= MSB$1);
    // @ts-ignore
    read.bytes = counter - offset;
    return res;
}
var N1 = Math.pow(2, 7);
var N2 = Math.pow(2, 14);
var N3 = Math.pow(2, 21);
var N4 = Math.pow(2, 28);
var N5 = Math.pow(2, 35);
var N6 = Math.pow(2, 42);
var N7 = Math.pow(2, 49);
var N8 = Math.pow(2, 56);
var N9 = Math.pow(2, 63);
var varint_length = function (/** @type {number} */ value) {
    return (value < N1 ? 1
        : value < N2 ? 2
            : value < N3 ? 3
                : value < N4 ? 4
                    : value < N5 ? 5
                        : value < N6 ? 6
                            : value < N7 ? 7
                                : value < N8 ? 8
                                    : value < N9 ? 9
                                        : 10);
};
var varint_varint = {
    encode: encode_1,
    decode: varint_decode,
    encodingLength: varint_length
};
var _brrp_varint = varint_varint;
/* ESM default export */ const varint = (_brrp_varint);
//# sourceMappingURL=varint.js.map
;// CONCATENATED MODULE: ./node_modules/.pnpm/multiformats@13.3.1/node_modules/multiformats/dist/src/varint.js

function src_varint_decode(data, offset = 0) {
    const code = varint.decode(data, offset);
    return [code, varint.decode.bytes];
}
function encodeTo(int, target, offset = 0) {
    varint.encode(int, target, offset);
    return target;
}
function encodingLength(int) {
    return varint.encodingLength(int);
}
//# sourceMappingURL=varint.js.map
;// CONCATENATED MODULE: ./node_modules/.pnpm/multiformats@13.3.1/node_modules/multiformats/dist/src/hashes/digest.js


/**
 * Creates a multihash digest.
 */
function create(code, digest) {
    const size = digest.byteLength;
    const sizeOffset = encodingLength(code);
    const digestOffset = sizeOffset + encodingLength(size);
    const bytes = new Uint8Array(digestOffset + size);
    encodeTo(code, bytes, 0);
    encodeTo(size, bytes, sizeOffset);
    bytes.set(digest, digestOffset);
    return new Digest(code, size, digest, bytes);
}
/**
 * Turns bytes representation of multihash digest into an instance.
 */
function digest_decode(multihash) {
    const bytes = bytes_coerce(multihash);
    const [code, sizeOffset] = src_varint_decode(bytes);
    const [size, digestOffset] = src_varint_decode(bytes.subarray(sizeOffset));
    const digest = bytes.subarray(sizeOffset + digestOffset);
    if (digest.byteLength !== size) {
        throw new Error('Incorrect length');
    }
    return new Digest(code, size, digest, bytes);
}
function digest_equals(a, b) {
    if (a === b) {
        return true;
    }
    else {
        const data = b;
        return (a.code === data.code &&
            a.size === data.size &&
            data.bytes instanceof Uint8Array &&
            equals(a.bytes, data.bytes));
    }
}
/**
 * Represents a multihash digest which carries information about the
 * hashing algorithm and an actual hash digest.
 */
class Digest {
    code;
    size;
    digest;
    bytes;
    /**
     * Creates a multihash digest.
     */
    constructor(code, size, digest, bytes) {
        this.code = code;
        this.size = size;
        this.digest = digest;
        this.bytes = bytes;
    }
}
/**
 * Used to check that the passed multihash has the passed code
 */
function hasCode(digest, code) {
    return digest.code === code;
}
//# sourceMappingURL=digest.js.map
;// CONCATENATED MODULE: ./node_modules/.pnpm/multiformats@13.3.1/node_modules/multiformats/dist/src/hashes/identity.js


const identity_code = 0x0;
const identity_name = 'identity';
const identity_encode = bytes_coerce;
function identity_digest(input) {
    return create(identity_code, identity_encode(input));
}
const identity_identity = { code: identity_code, name: identity_name, encode: identity_encode, digest: identity_digest };
//# sourceMappingURL=identity.js.map
;// CONCATENATED MODULE: ./node_modules/.pnpm/multiformats@13.3.1/node_modules/multiformats/dist/src/hashes/hasher.js

function hasher_from({ name, code, encode }) {
    return new Hasher(name, code, encode);
}
/**
 * Hasher represents a hashing algorithm implementation that produces as
 * `MultihashDigest`.
 */
class Hasher {
    name;
    code;
    encode;
    constructor(name, code, encode) {
        this.name = name;
        this.code = code;
        this.encode = encode;
    }
    digest(input) {
        if (input instanceof Uint8Array) {
            const result = this.encode(input);
            return result instanceof Uint8Array
                ? create(this.code, result)
                /* c8 ignore next 1 */
                : result.then(digest => create(this.code, digest));
        }
        else {
            throw Error('Unknown type, must be binary type');
            /* c8 ignore next 1 */
        }
    }
}
//# sourceMappingURL=hasher.js.map
;// CONCATENATED MODULE: ./node_modules/.pnpm/multiformats@13.3.1/node_modules/multiformats/dist/src/hashes/sha2-browser.js
/* global crypto */

function sha(name) {
    return async (data) => new Uint8Array(await crypto.subtle.digest(name, data));
}
const sha256 = hasher_from({
    name: 'sha2-256',
    code: 0x12,
    encode: sha('SHA-256')
});
const sha512 = hasher_from({
    name: 'sha2-512',
    code: 0x13,
    encode: sha('SHA-512')
});
//# sourceMappingURL=sha2-browser.js.map
;// CONCATENATED MODULE: ./node_modules/.pnpm/multiformats@13.3.1/node_modules/multiformats/dist/src/cid.js






// This way TS will also expose all the types from module

function format(link, base) {
    const { bytes, version } = link;
    switch (version) {
        case 0:
            return toStringV0(bytes, cid_baseCache(link), base ?? base58btc.encoder);
        default:
            return toStringV1(bytes, cid_baseCache(link), (base ?? base32.encoder));
    }
}
function toJSON(link) {
    return {
        '/': format(link)
    };
}
function fromJSON(json) {
    return CID.parse(json['/']);
}
const cid_cache = new WeakMap();
function cid_baseCache(cid) {
    const baseCache = cid_cache.get(cid);
    if (baseCache == null) {
        const baseCache = new Map();
        cid_cache.set(cid, baseCache);
        return baseCache;
    }
    return baseCache;
}
class CID {
    code;
    version;
    multihash;
    bytes;
    '/';
    /**
     * @param version - Version of the CID
     * @param code - Code of the codec content is encoded in, see https://github.com/multiformats/multicodec/blob/master/table.csv
     * @param multihash - (Multi)hash of the of the content.
     */
    constructor(version, code, multihash, bytes) {
        this.code = code;
        this.version = version;
        this.multihash = multihash;
        this.bytes = bytes;
        // flag to serializers that this is a CID and
        // should be treated specially
        this['/'] = bytes;
    }
    /**
     * Signalling `cid.asCID === cid` has been replaced with `cid['/'] === cid.bytes`
     * please either use `CID.asCID(cid)` or switch to new signalling mechanism
     *
     * @deprecated
     */
    get asCID() {
        return this;
    }
    // ArrayBufferView
    get byteOffset() {
        return this.bytes.byteOffset;
    }
    // ArrayBufferView
    get byteLength() {
        return this.bytes.byteLength;
    }
    toV0() {
        switch (this.version) {
            case 0: {
                return this;
            }
            case 1: {
                const { code, multihash } = this;
                if (code !== DAG_PB_CODE) {
                    throw new Error('Cannot convert a non dag-pb CID to CIDv0');
                }
                // sha2-256
                if (multihash.code !== SHA_256_CODE) {
                    throw new Error('Cannot convert non sha2-256 multihash CID to CIDv0');
                }
                return (CID.createV0(multihash));
            }
            default: {
                throw Error(`Can not convert CID version ${this.version} to version 0. This is a bug please report`);
            }
        }
    }
    toV1() {
        switch (this.version) {
            case 0: {
                const { code, digest } = this.multihash;
                const multihash = create(code, digest);
                return (CID.createV1(this.code, multihash));
            }
            case 1: {
                return this;
            }
            default: {
                throw Error(`Can not convert CID version ${this.version} to version 1. This is a bug please report`);
            }
        }
    }
    equals(other) {
        return CID.equals(this, other);
    }
    static equals(self, other) {
        const unknown = other;
        return (unknown != null &&
            self.code === unknown.code &&
            self.version === unknown.version &&
            digest_equals(self.multihash, unknown.multihash));
    }
    toString(base) {
        return format(this, base);
    }
    toJSON() {
        return { '/': format(this) };
    }
    link() {
        return this;
    }
    [Symbol.toStringTag] = 'CID';
    // Legacy
    [Symbol.for('nodejs.util.inspect.custom')]() {
        return `CID(${this.toString()})`;
    }
    /**
     * Takes any input `value` and returns a `CID` instance if it was
     * a `CID` otherwise returns `null`. If `value` is instanceof `CID`
     * it will return value back. If `value` is not instance of this CID
     * class, but is compatible CID it will return new instance of this
     * `CID` class. Otherwise returns null.
     *
     * This allows two different incompatible versions of CID library to
     * co-exist and interop as long as binary interface is compatible.
     */
    static asCID(input) {
        if (input == null) {
            return null;
        }
        const value = input;
        if (value instanceof CID) {
            // If value is instance of CID then we're all set.
            return value;
        }
        else if ((value['/'] != null && value['/'] === value.bytes) || value.asCID === value) {
            // If value isn't instance of this CID class but `this.asCID === this` or
            // `value['/'] === value.bytes` is true it is CID instance coming from a
            // different implementation (diff version or duplicate). In that case we
            // rebase it to this `CID` implementation so caller is guaranteed to get
            // instance with expected API.
            const { version, code, multihash, bytes } = value;
            return new CID(version, code, multihash, bytes ?? encodeCID(version, code, multihash.bytes));
        }
        else if (value[cidSymbol] === true) {
            // If value is a CID from older implementation that used to be tagged via
            // symbol we still rebase it to the this `CID` implementation by
            // delegating that to a constructor.
            const { version, multihash, code } = value;
            const digest = digest_decode(multihash);
            return CID.create(version, code, digest);
        }
        else {
            // Otherwise value is not a CID (or an incompatible version of it) in
            // which case we return `null`.
            return null;
        }
    }
    /**
     * @param version - Version of the CID
     * @param code - Code of the codec content is encoded in, see https://github.com/multiformats/multicodec/blob/master/table.csv
     * @param digest - (Multi)hash of the of the content.
     */
    static create(version, code, digest) {
        if (typeof code !== 'number') {
            throw new Error('String codecs are no longer supported');
        }
        if (!(digest.bytes instanceof Uint8Array)) {
            throw new Error('Invalid digest');
        }
        switch (version) {
            case 0: {
                if (code !== DAG_PB_CODE) {
                    throw new Error(`Version 0 CID must use dag-pb (code: ${DAG_PB_CODE}) block encoding`);
                }
                else {
                    return new CID(version, code, digest, digest.bytes);
                }
            }
            case 1: {
                const bytes = encodeCID(version, code, digest.bytes);
                return new CID(version, code, digest, bytes);
            }
            default: {
                throw new Error('Invalid version');
            }
        }
    }
    /**
     * Simplified version of `create` for CIDv0.
     */
    static createV0(digest) {
        return CID.create(0, DAG_PB_CODE, digest);
    }
    /**
     * Simplified version of `create` for CIDv1.
     *
     * @param code - Content encoding format code.
     * @param digest - Multihash of the content.
     */
    static createV1(code, digest) {
        return CID.create(1, code, digest);
    }
    /**
     * Decoded a CID from its binary representation. The byte array must contain
     * only the CID with no additional bytes.
     *
     * An error will be thrown if the bytes provided do not contain a valid
     * binary representation of a CID.
     */
    static decode(bytes) {
        const [cid, remainder] = CID.decodeFirst(bytes);
        if (remainder.length !== 0) {
            throw new Error('Incorrect length');
        }
        return cid;
    }
    /**
     * Decoded a CID from its binary representation at the beginning of a byte
     * array.
     *
     * Returns an array with the first element containing the CID and the second
     * element containing the remainder of the original byte array. The remainder
     * will be a zero-length byte array if the provided bytes only contained a
     * binary CID representation.
     */
    static decodeFirst(bytes) {
        const specs = CID.inspectBytes(bytes);
        const prefixSize = specs.size - specs.multihashSize;
        const multihashBytes = bytes_coerce(bytes.subarray(prefixSize, prefixSize + specs.multihashSize));
        if (multihashBytes.byteLength !== specs.multihashSize) {
            throw new Error('Incorrect length');
        }
        const digestBytes = multihashBytes.subarray(specs.multihashSize - specs.digestSize);
        const digest = new Digest(specs.multihashCode, specs.digestSize, digestBytes, multihashBytes);
        const cid = specs.version === 0
            ? CID.createV0(digest)
            : CID.createV1(specs.codec, digest);
        return [cid, bytes.subarray(specs.size)];
    }
    /**
     * Inspect the initial bytes of a CID to determine its properties.
     *
     * Involves decoding up to 4 varints. Typically this will require only 4 to 6
     * bytes but for larger multicodec code values and larger multihash digest
     * lengths these varints can be quite large. It is recommended that at least
     * 10 bytes be made available in the `initialBytes` argument for a complete
     * inspection.
     */
    static inspectBytes(initialBytes) {
        let offset = 0;
        const next = () => {
            const [i, length] = src_varint_decode(initialBytes.subarray(offset));
            offset += length;
            return i;
        };
        let version = next();
        let codec = DAG_PB_CODE;
        if (version === 18) {
            // CIDv0
            version = 0;
            offset = 0;
        }
        else {
            codec = next();
        }
        if (version !== 0 && version !== 1) {
            throw new RangeError(`Invalid CID version ${version}`);
        }
        const prefixSize = offset;
        const multihashCode = next(); // multihash code
        const digestSize = next(); // multihash length
        const size = offset + digestSize;
        const multihashSize = size - prefixSize;
        return { version, codec, multihashCode, digestSize, multihashSize, size };
    }
    /**
     * Takes cid in a string representation and creates an instance. If `base`
     * decoder is not provided will use a default from the configuration. It will
     * throw an error if encoding of the CID is not compatible with supplied (or
     * a default decoder).
     */
    static parse(source, base) {
        const [prefix, bytes] = parseCIDtoBytes(source, base);
        const cid = CID.decode(bytes);
        if (cid.version === 0 && source[0] !== 'Q') {
            throw Error('Version 0 CID string must not include multibase prefix');
        }
        // Cache string representation to avoid computing it on `this.toString()`
        cid_baseCache(cid).set(prefix, source);
        return cid;
    }
}
function parseCIDtoBytes(source, base) {
    switch (source[0]) {
        // CIDv0 is parsed differently
        case 'Q': {
            const decoder = base ?? base58btc;
            return [
                base58btc.prefix,
                decoder.decode(`${base58btc.prefix}${source}`)
            ];
        }
        case base58btc.prefix: {
            const decoder = base ?? base58btc;
            return [base58btc.prefix, decoder.decode(source)];
        }
        case base32.prefix: {
            const decoder = base ?? base32;
            return [base32.prefix, decoder.decode(source)];
        }
        case base36.prefix: {
            const decoder = base ?? base36;
            return [base36.prefix, decoder.decode(source)];
        }
        default: {
            if (base == null) {
                throw Error('To parse non base32, base36 or base58btc encoded CID multibase decoder must be provided');
            }
            return [source[0], base.decode(source)];
        }
    }
}
function toStringV0(bytes, cache, base) {
    const { prefix } = base;
    if (prefix !== base58btc.prefix) {
        throw Error(`Cannot string encode V0 in ${base.name} encoding`);
    }
    const cid = cache.get(prefix);
    if (cid == null) {
        const cid = base.encode(bytes).slice(1);
        cache.set(prefix, cid);
        return cid;
    }
    else {
        return cid;
    }
}
function toStringV1(bytes, cache, base) {
    const { prefix } = base;
    const cid = cache.get(prefix);
    if (cid == null) {
        const cid = base.encode(bytes);
        cache.set(prefix, cid);
        return cid;
    }
    else {
        return cid;
    }
}
const DAG_PB_CODE = 0x70;
const SHA_256_CODE = 0x12;
function encodeCID(version, code, multihash) {
    const codeOffset = encodingLength(version);
    const hashOffset = codeOffset + encodingLength(code);
    const bytes = new Uint8Array(hashOffset + multihash.byteLength);
    encodeTo(version, bytes, 0);
    encodeTo(code, bytes, codeOffset);
    bytes.set(multihash, hashOffset);
    return bytes;
}
const cidSymbol = Symbol.for('@ipld/js-cid/CID');
//# sourceMappingURL=cid.js.map
;// CONCATENATED MODULE: ./node_modules/.pnpm/multiformats@13.3.1/node_modules/multiformats/dist/src/index.js
/**
 * @packageDocumentation
 *
 * This library defines common interfaces and low level building blocks for various interrelated multiformat technologies (multicodec, multihash, multibase, and CID). They can be used to implement custom base encoders / decoders / codecs, codec encoders /decoders and multihash hashers that comply to the interface that layers above assume.
 *
 * This library provides implementations for most basics and many others can be found in linked repositories.
 *
 * ```TypeScript
 * import { CID } from 'multiformats/cid'
 * import * as json from 'multiformats/codecs/json'
 * import { sha256 } from 'multiformats/hashes/sha2'
 *
 * const bytes = json.encode({ hello: 'world' })
 *
 * const hash = await sha256.digest(bytes)
 * const cid = CID.create(1, json.code, hash)
 * //> CID(bagaaierasords4njcts6vs7qvdjfcvgnume4hqohf65zsfguprqphs3icwea)
 * ```
 *
 * ## Creating Blocks
 *
 * ```TypeScript
 * import * as Block from 'multiformats/block'
 * import * as codec from '@ipld/dag-cbor'
 * import { sha256 as hasher } from 'multiformats/hashes/sha2'
 *
 * const value = { hello: 'world' }
 *
 * // encode a block
 * let block = await Block.encode({ value, codec, hasher })
 *
 * block.value // { hello: 'world' }
 * block.bytes // Uint8Array
 * block.cid   // CID() w/ sha2-256 hash address and dag-cbor codec
 *
 * // you can also decode blocks from their binary state
 * block = await Block.decode({ bytes: block.bytes, codec, hasher })
 *
 * // if you have the cid you can also verify the hash on decode
 * block = await Block.create({ bytes: block.bytes, cid: block.cid, codec, hasher })
 * ```
 *
 * ## Multibase Encoders / Decoders / Codecs
 *
 * CIDs can be serialized to string representation using multibase encoders that implement [`MultibaseEncoder`](https://github.com/multiformats/js-multiformats/blob/master/src/bases/interface.ts) interface. This library provides quite a few implementations that can be imported:
 *
 * ```TypeScript
 * import { base64 } from "multiformats/bases/base64"
 * cid.toString(base64.encoder)
 * //> 'mAYAEEiCTojlxqRTl6svwqNJRVM2jCcPBxy+7mRTUfGDzy2gViA'
 * ```
 *
 * Parsing CID string serialized CIDs requires multibase decoder that implements [`MultibaseDecoder`](https://github.com/multiformats/js-multiformats/blob/master/src/bases/interface.ts) interface. This library provides a decoder for every encoder it provides:
 *
 * ```TypeScript
 * CID.parse('mAYAEEiCTojlxqRTl6svwqNJRVM2jCcPBxy+7mRTUfGDzy2gViA', base64.decoder)
 * //> CID(bagaaierasords4njcts6vs7qvdjfcvgnume4hqohf65zsfguprqphs3icwea)
 * ```
 *
 * Dual of multibase encoder & decoder is defined as multibase codec and it exposes
 * them as `encoder` and `decoder` properties. For added convenience codecs also
 * implement `MultibaseEncoder` and `MultibaseDecoder` interfaces so they could be
 * used as either or both:
 *
 * ```TypeScript
 * cid.toString(base64)
 * CID.parse(cid.toString(base64), base64)
 * ```
 *
 * **Note:** CID implementation comes bundled with `base32` and `base58btc`
 * multibase codecs so that CIDs can be base serialized to (version specific)
 * default base encoding and parsed without having to supply base encoders/decoders:
 *
 * ```TypeScript
 * const v1 = CID.parse('bagaaierasords4njcts6vs7qvdjfcvgnume4hqohf65zsfguprqphs3icwea')
 * v1.toString()
 * //> 'bagaaierasords4njcts6vs7qvdjfcvgnume4hqohf65zsfguprqphs3icwea'
 *
 * const v0 = CID.parse('QmdfTbBqBPQ7VNxZEYEj14VmRuZBkqFbiwReogJgS1zR1n')
 * v0.toString()
 * //> 'QmdfTbBqBPQ7VNxZEYEj14VmRuZBkqFbiwReogJgS1zR1n'
 * v0.toV1().toString()
 * //> 'bafybeihdwdcefgh4dqkjv67uzcmw7ojee6xedzdetojuzjevtenxquvyku'
 * ```
 *
 * ## Multicodec Encoders / Decoders / Codecs
 *
 * This library defines [`BlockEncoder`, `BlockDecoder` and `BlockCodec` interfaces](https://github.com/multiformats/js-multiformats/blob/master/src/codecs/interface.ts).
 * Codec implementations should conform to the `BlockCodec` interface which implements both `BlockEncoder` and `BlockDecoder`.
 * Here is an example implementation of JSON `BlockCodec`.
 *
 * ```TypeScript
 * export const { name, code, encode, decode } = {
 *   name: 'json',
 *   code: 0x0200,
 *   encode: json => new TextEncoder().encode(JSON.stringify(json)),
 *   decode: bytes => JSON.parse(new TextDecoder().decode(bytes))
 * }
 * ```
 *
 * ## Multihash Hashers
 *
 * This library defines [`MultihashHasher` and `MultihashDigest` interfaces](https://github.com/multiformats/js-multiformats/blob/master/src/hashes/interface.ts) and convinient function for implementing them:
 *
 * ```TypeScript
 * import * as hasher from 'multiformats/hashes/hasher'
 *
 * const sha256 = hasher.from({
 *   // As per multiformats table
 *   // https://github.com/multiformats/multicodec/blob/master/table.csv#L9
 *   name: 'sha2-256',
 *   code: 0x12,
 *
 *   encode: (input) => new Uint8Array(crypto.createHash('sha256').update(input).digest())
 * })
 *
 * const hash = await sha256.digest(json.encode({ hello: 'world' }))
 * CID.create(1, json.code, hash)
 *
 * //> CID(bagaaierasords4njcts6vs7qvdjfcvgnume4hqohf65zsfguprqphs3icwea)
 * ```
 *
 * ## Traversal
 *
 * This library contains higher-order functions for traversing graphs of data easily.
 *
 * `walk()` walks through the links in each block of a DAG calling a user-supplied loader function for each one, in depth-first order with no duplicate block visits. The loader should return a `Block` object and can be used to inspect and collect block ordering for a full DAG walk. The loader should `throw` on error, and return `null` if a block should be skipped by `walk()`.
 *
 * ```TypeScript
 * import { walk } from 'multiformats/traversal'
 * import * as Block from 'multiformats/block'
 * import * as codec from 'multiformats/codecs/json'
 * import { sha256 as hasher } from 'multiformats/hashes/sha2'
 *
 * // build a DAG (a single block for this simple example)
 * const value = { hello: 'world' }
 * const block = await Block.encode({ value, codec, hasher })
 * const { cid } = block
 * console.log(cid)
 * //> CID(bagaaierasords4njcts6vs7qvdjfcvgnume4hqohf65zsfguprqphs3icwea)
 *
 * // create a loader function that also collects CIDs of blocks in
 * // their traversal order
 * const load = (cid, blocks) => async (cid) => {
 *   // fetch a block using its cid
 *   // e.g.: const block = await fetchBlockByCID(cid)
 *   blocks.push(cid)
 *   return block
 * }
 *
 * // collect blocks in this DAG starting from the root `cid`
 * const blocks = []
 * await walk({ cid, load: load(cid, blocks) })
 *
 * console.log(blocks)
 * //> [CID(bagaaierasords4njcts6vs7qvdjfcvgnume4hqohf65zsfguprqphs3icwea)]
 * ```
 *
 * ## Legacy interface
 *
 * [`blockcodec-to-ipld-format`](https://github.com/ipld/js-blockcodec-to-ipld-format) converts a multiformats [`BlockCodec`](https://github.com/multiformats/js-multiformats/blob/master/src/codecs/interface.ts#L21) into an
 * [`interface-ipld-format`](https://github.com/ipld/interface-ipld-format) for use with the [`ipld`](https://github.com/ipld/ipld) package. This can help bridge IPLD codecs implemented using the structure and interfaces defined here to existing code that assumes, or requires `interface-ipld-format`. This bridge also includes the relevant TypeScript definitions.
 *
 * ## Implementations
 *
 * By default, no base encodings (other than base32 & base58btc), hash functions,
 * or codec implementations are exposed by `multiformats`, you need to
 * import the ones you need yourself.
 *
 * ### Multibase codecs
 *
 * | bases                                                         | import                      | repo                                                                                              |
 * | ------------------------------------------------------------- | --------------------------- | ------------------------------------------------------------------------------------------------- |
 * | `base16`                                                      | `multiformats/bases/base16` | [multiformats/js-multiformats](https://github.com/multiformats/js-multiformats/tree/master/bases) |
 * | `base32`, `base32pad`, `base32hex`, `base32hexpad`, `base32z` | `multiformats/bases/base32` | [multiformats/js-multiformats](https://github.com/multiformats/js-multiformats/tree/master/bases) |
 * | `base64`, `base64pad`, `base64url`, `base64urlpad`            | `multiformats/bases/base64` | [multiformats/js-multiformats](https://github.com/multiformats/js-multiformats/tree/master/bases) |
 * | `base58btc`, `base58flick4`                                   | `multiformats/bases/base58` | [multiformats/js-multiformats](https://github.com/multiformats/js-multiformats/tree/master/bases) |
 *
 * Other (less useful) bases implemented in [multiformats/js-multiformats](https://github.com/multiformats/js-multiformats/tree/master/bases) include: `base2`, `base8`, `base10`, `base36` and `base256emoji`.
 *
 * ### Multihash hashers
 *
 * | hashes                                                                                                                          | import                         | repo                                                                                                               |
 * | ------------------------------------------------------------------------------------------------------------------------------- | ------------------------------ | ------------------------------------------------------------------------------------------------------------------ |
 * | `sha2-256`, `sha2-512`                                                                                                          | `multiformats/hashes/sha2`     | [multiformats/js-multiformats](https://github.com/multiformats/js-multiformats/tree/master/src/hashes)             |
 * | `sha3-224`, `sha3-256`, `sha3-384`,`sha3-512`, `shake-128`, `shake-256`, `keccak-224`, `keccak-256`, `keccak-384`, `keccak-512` | `@multiformats/sha3`           | [multiformats/js-sha3](https://github.com/multiformats/js-sha3)                                                    |
 * | `identity`                                                                                                                      | `multiformats/hashes/identity` | [multiformats/js-multiformats](https://github.com/multiformats/js-multiformats/tree/master/src/hashes/identity.js) |
 * | `murmur3-128`, `murmur3-32`                                                                                                     | `@multiformats/murmur3`        | [multiformats/js-murmur3](https://github.com/multiformats/js-murmur3)                                              |
 * | `blake2b-*`, `blake2s-*`                                                                                                        | `@multiformats/blake2`         | [multiformats/js-blake2](https://github.com/multiformats/js-blake2)                                                |
 *
 * ### IPLD codecs (multicodec)
 *
 * | codec      | import                     | repo                                                                                                   |
 * | ---------- | -------------------------- | ------------------------------------------------------------------------------------------------------ |
 * | `raw`      | `multiformats/codecs/raw`  | [multiformats/js-multiformats](https://github.com/multiformats/js-multiformats/tree/master/src/codecs) |
 * | `json`     | `multiformats/codecs/json` | [multiformats/js-multiformats](https://github.com/multiformats/js-multiformats/tree/master/src/codecs) |
 * | `dag-cbor` | `@ipld/dag-cbor`           | [ipld/js-dag-cbor](https://github.com/ipld/js-dag-cbor)                                                |
 * | `dag-json` | `@ipld/dag-json`           | [ipld/js-dag-json](https://github.com/ipld/js-dag-json)                                                |
 * | `dag-pb`   | `@ipld/dag-pb`             | [ipld/js-dag-pb](https://github.com/ipld/js-dag-pb)                                                    |
 * | `dag-jose` | `dag-jose`                 | [ceramicnetwork/js-dag-jose](https://github.com/ceramicnetwork/js-dag-jose)                            |
 */





// This way TS will also expose all the types from module


//# sourceMappingURL=index.js.map
;// CONCATENATED MODULE: ./node_modules/.pnpm/multiformats@13.3.1/node_modules/multiformats/dist/src/basics.js















const basics_bases = { ...identity_namespaceObject, ...base2_namespaceObject, ...base8_namespaceObject, ...base10_namespaceObject, ...base16_namespaceObject, ...base32_namespaceObject, ...base36_namespaceObject, ...base58_namespaceObject, ...base64_namespaceObject, ...base256emoji_namespaceObject };
const hashes = { ...sha2_browser_namespaceObject, ...hashes_identity_namespaceObject };
const codecs = (/* unused pure expression or super */ null && ({ raw, json }));

//# sourceMappingURL=basics.js.map
;// CONCATENATED MODULE: ./node_modules/.pnpm/uint8arrays@5.1.0/node_modules/uint8arrays/dist/src/alloc.js
/**
 * Returns a `Uint8Array` of the requested size. Referenced memory will
 * be initialized to 0.
 */
function alloc(size = 0) {
    return new Uint8Array(size);
}
/**
 * Where possible returns a Uint8Array of the requested size that references
 * uninitialized memory. Only use if you are certain you will immediately
 * overwrite every value in the returned `Uint8Array`.
 */
function allocUnsafe(size = 0) {
    return new Uint8Array(size);
}
//# sourceMappingURL=alloc.js.map
;// CONCATENATED MODULE: ./node_modules/.pnpm/uint8arrays@5.1.0/node_modules/uint8arrays/dist/src/util/bases.js


function createCodec(name, prefix, encode, decode) {
    return {
        name,
        prefix,
        encoder: {
            name,
            prefix,
            encode
        },
        decoder: {
            decode
        }
    };
}
const bases_string = createCodec('utf8', 'u', (buf) => {
    const decoder = new TextDecoder('utf8');
    return 'u' + decoder.decode(buf);
}, (str) => {
    const encoder = new TextEncoder();
    return encoder.encode(str.substring(1));
});
const ascii = createCodec('ascii', 'a', (buf) => {
    let string = 'a';
    for (let i = 0; i < buf.length; i++) {
        string += String.fromCharCode(buf[i]);
    }
    return string;
}, (str) => {
    str = str.substring(1);
    const buf = allocUnsafe(str.length);
    for (let i = 0; i < str.length; i++) {
        buf[i] = str.charCodeAt(i);
    }
    return buf;
});
const BASES = {
    utf8: bases_string,
    'utf-8': bases_string,
    hex: basics_bases.base16,
    latin1: ascii,
    ascii,
    binary: ascii,
    ...basics_bases
};
/* ESM default export */ const util_bases = (BASES);
//# sourceMappingURL=bases.js.map
;// CONCATENATED MODULE: ./node_modules/.pnpm/uint8arrays@5.1.0/node_modules/uint8arrays/dist/src/from-string.js

/**
 * Create a `Uint8Array` from the passed string
 *
 * Supports `utf8`, `utf-8`, `hex`, and any encoding supported by the multiformats module.
 *
 * Also `ascii` which is similar to node's 'binary' encoding.
 */
function from_string_fromString(string, encoding = 'utf8') {
    const base = bases[encoding];
    if (base == null) {
        throw new Error(`Unsupported encoding "${encoding}"`);
    }
    // add multibase prefix
    return base.decoder.decode(`${base.prefix}${string}`); // eslint-disable-line @typescript-eslint/restrict-template-expressions
}
//# sourceMappingURL=from-string.js.map
;// CONCATENATED MODULE: ./node_modules/.pnpm/uint8arrays@5.1.0/node_modules/uint8arrays/dist/src/to-string.js

/**
 * Turns a `Uint8Array` into a string.
 *
 * Supports `utf8`, `utf-8` and any encoding supported by the multibase module.
 *
 * Also `ascii` which is similar to node's 'binary' encoding.
 */
function to_string_toString(array, encoding = 'utf8') {
    const base = util_bases[encoding];
    if (base == null) {
        throw new Error(`Unsupported encoding "${encoding}"`);
    }
    // strip multibase prefix
    return base.encoder.encode(array).substring(1);
}
//# sourceMappingURL=to-string.js.map
;// CONCATENATED MODULE: ./node_modules/.pnpm/uint8arrays@5.1.0/node_modules/uint8arrays/dist/src/index.js
/**
 * @packageDocumentation
 *
 * `Uint8Array`s bring memory-efficient(ish) byte handling to browsers - they are similar to Node.js `Buffer`s but lack a lot of the utility methods present on that class.
 *
 * This module exports a number of function that let you do common operations - joining Uint8Arrays together, seeing if they have the same contents etc.
 *
 * Since Node.js `Buffer`s are also `Uint8Array`s, it falls back to `Buffer` internally where it makes sense for performance reasons.
 *
 * ## alloc(size)
 *
 * Create a new `Uint8Array`. When running under Node.js, `Buffer` will be used in preference to `Uint8Array`.
 *
 * ### Example
 *
 * ```js
 * import { alloc } from 'uint8arrays/alloc'
 *
 * const buf = alloc(100)
 * ```
 *
 * ## allocUnsafe(size)
 *
 * Create a new `Uint8Array`. When running under Node.js, `Buffer` will be used in preference to `Uint8Array`.
 *
 * On platforms that support it, memory referenced by the returned `Uint8Array` will not be initialized.
 *
 * ### Example
 *
 * ```js
 * import { allocUnsafe } from 'uint8arrays/alloc'
 *
 * const buf = allocUnsafe(100)
 * ```
 *
 * ## compare(a, b)
 *
 * Compare two `Uint8Arrays`
 *
 * ### Example
 *
 * ```js
 * import { compare } from 'uint8arrays/compare'
 *
 * const arrays = [
 *   Uint8Array.from([3, 4, 5]),
 *   Uint8Array.from([0, 1, 2])
 * ]
 *
 * const sorted = arrays.sort(compare)
 *
 * console.info(sorted)
 * // [
 * //    Uint8Array[0, 1, 2]
 * //    Uint8Array[3, 4, 5]
 * // ]
 * ```
 *
 * ## concat(arrays, \[length])
 *
 * Concatenate one or more `Uint8Array`s and return a `Uint8Array` with their contents.
 *
 * If you know the length of the arrays, pass it as a second parameter, otherwise it will be calculated by traversing the list of arrays.
 *
 * ### Example
 *
 * ```js
 * import { concat } from 'uint8arrays/concat'
 *
 * const arrays = [
 *   Uint8Array.from([0, 1, 2]),
 *   Uint8Array.from([3, 4, 5])
 * ]
 *
 * const all = concat(arrays, 6)
 *
 * console.info(all)
 * // Uint8Array[0, 1, 2, 3, 4, 5]
 * ```
 *
 * ## equals(a, b)
 *
 * Returns true if the two arrays are the same array or if they have the same length and contents.
 *
 * ### Example
 *
 * ```js
 * import { equals } from 'uint8arrays/equals'
 *
 * const a = Uint8Array.from([0, 1, 2])
 * const b = Uint8Array.from([3, 4, 5])
 * const c = Uint8Array.from([0, 1, 2])
 *
 * console.info(equals(a, b)) // false
 * console.info(equals(a, c)) // true
 * console.info(equals(a, a)) // true
 * ```
 *
 * ## fromString(string, encoding = 'utf8')
 *
 * Returns a new `Uint8Array` created from the passed string and interpreted as the passed encoding.
 *
 * Supports `utf8` and any of the [multibase encodings](https://github.com/multiformats/multibase/blob/master/multibase.csv) as implemented by the [multiformats module](https://www.npmjs.com/package/multiformats).
 *
 * ### Example
 *
 * ```js
 * import { fromString } from 'uint8arrays/from-string'
 *
 * console.info(fromString('hello world')) // Uint8Array[104, 101 ...
 * console.info(fromString('00010203aabbcc', 'base16')) // Uint8Array[0, 1 ...
 * console.info(fromString('AAECA6q7zA', 'base64')) // Uint8Array[0, 1 ...
 * console.info(fromString('01234', 'ascii')) // Uint8Array[48, 49 ...
 * ```
 *
 * ## toString(array, encoding = 'utf8')
 *
 * Returns a string created from the passed `Uint8Array` in the passed encoding.
 *
 * Supports `utf8` and any of the [multibase encodings](https://github.com/multiformats/multibase/blob/master/multibase.csv) as implemented by the [multiformats module](https://www.npmjs.com/package/multiformats).
 *
 * ### Example
 *
 * ```js
 * import { toString } from 'uint8arrays/to-string'
 *
 * console.info(toString(Uint8Array.from([104, 101...]))) // 'hello world'
 * console.info(toString(Uint8Array.from([0, 1, 2...]), 'base16')) // '00010203aabbcc'
 * console.info(toString(Uint8Array.from([0, 1, 2...]), 'base64')) // 'AAECA6q7zA'
 * console.info(toString(Uint8Array.from([48, 49, 50...]), 'ascii')) // '01234'
 * ```
 *
 * ## xor(a, b)
 *
 * Returns a `Uint8Array` containing `a` and `b` xored together.
 *
 * ### Example
 *
 * ```js
 * import { xor } from 'uint8arrays/xor'
 *
 * console.info(xor(Uint8Array.from([1, 0]), Uint8Array.from([0, 1]))) // Uint8Array[1, 1]
 * ```
 *
 * ## xorCompare(a, b)
 *
 * Compares the distances between two xor `Uint8Array`s.
 *
 * ### Example
 *
 * ```ts
 * import { xor } from 'uint8arrays/xor'
 * import { xorCompare } from 'uint8arrays/xor-compare'
 *
 * const target = Uint8Array.from([1, 1])
 * const val1 = Uint8Array.from([1, 0])
 * const xor1 = xor(target, val1)
 *
 * const val2 = Uint8Array.from([0, 1])
 * const xor2 = xor(target, val2)
 *
 * console.info(xorCompare(xor1, xor2)) // -1 or 0 or 1
 * ```
 */







//# sourceMappingURL=index.js.map
;// CONCATENATED MODULE: ./src/crypto.ts
// https://blog.elantha.com/encrypt-in-the-browser/
function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) {
    try {
        var info = gen[key](arg);
        var value = info.value;
    } catch (error) {
        reject(error);
        return;
    }
    if (info.done) {
        resolve(value);
    } else {
        Promise.resolve(value).then(_next, _throw);
    }
}
function _async_to_generator(fn) {
    return function() {
        var self = this, args = arguments;
        return new Promise(function(resolve, reject) {
            var gen = fn.apply(self, args);
            function _next(value) {
                asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value);
            }
            function _throw(err) {
                asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err);
            }
            _next(undefined);
        });
    };
}
function _ts_generator(thisArg, body) {
    var f, y, t, g, _ = {
        label: 0,
        sent: function() {
            if (t[0] & 1) throw t[1];
            return t[1];
        },
        trys: [],
        ops: []
    };
    return g = {
        next: verb(0),
        "throw": verb(1),
        "return": verb(2)
    }, typeof Symbol === "function" && (g[Symbol.iterator] = function() {
        return this;
    }), g;
    function verb(n) {
        return function(v) {
            return step([
                n,
                v
            ]);
        };
    }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while(_)try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [
                op[0] & 2,
                t.value
            ];
            switch(op[0]){
                case 0:
                case 1:
                    t = op;
                    break;
                case 4:
                    _.label++;
                    return {
                        value: op[1],
                        done: false
                    };
                case 5:
                    _.label++;
                    y = op[1];
                    op = [
                        0
                    ];
                    continue;
                case 7:
                    op = _.ops.pop();
                    _.trys.pop();
                    continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) {
                        _ = 0;
                        continue;
                    }
                    if (op[0] === 3 && (!t || op[1] > t[0] && op[1] < t[3])) {
                        _.label = op[1];
                        break;
                    }
                    if (op[0] === 6 && _.label < t[1]) {
                        _.label = t[1];
                        t = op;
                        break;
                    }
                    if (t && _.label < t[2]) {
                        _.label = t[2];
                        _.ops.push(op);
                        break;
                    }
                    if (t[2]) _.ops.pop();
                    _.trys.pop();
                    continue;
            }
            op = body.call(thisArg, _);
        } catch (e) {
            op = [
                6,
                e
            ];
            y = 0;
        } finally{
            f = t = 0;
        }
        if (op[0] & 5) throw op[1];
        return {
            value: op[0] ? op[1] : void 0,
            done: true
        };
    }
}
function encryptData(content, password) {
    return _encryptData.apply(this, arguments);
}
function _encryptData() {
    _encryptData = _async_to_generator(function(content, password) {
        var salt, key, iv, contentBytes, cipher, _;
        return _ts_generator(this, function(_state) {
            switch(_state.label){
                case 0:
                    salt = crypto.getRandomValues(new Uint8Array(16));
                    return [
                        4,
                        getKey(password, salt)
                    ];
                case 1:
                    key = _state.sent();
                    iv = crypto.getRandomValues(new Uint8Array(12));
                    contentBytes = stringToBytes(content);
                    _ = Uint8Array.bind;
                    return [
                        4,
                        crypto.subtle.encrypt({
                            name: "AES-GCM",
                            iv: iv
                        }, key, contentBytes)
                    ];
                case 2:
                    cipher = new (_.apply(Uint8Array, [
                        void 0,
                        _state.sent()
                    ]));
                    return [
                        2,
                        {
                            salt: bytesToBase64(salt),
                            iv: bytesToBase64(iv),
                            cipher: bytesToBase64(cipher)
                        }
                    ];
            }
        });
    });
    return _encryptData.apply(this, arguments);
}
function decryptData(encryptedData, password) {
    return _decryptData.apply(this, arguments);
}
function _decryptData() {
    _decryptData = _async_to_generator(function(encryptedData, password) {
        var salt, key, iv, cipher, contentBytes, _;
        return _ts_generator(this, function(_state) {
            switch(_state.label){
                case 0:
                    salt = base64ToBytes(encryptedData.salt);
                    return [
                        4,
                        getKey(password, salt)
                    ];
                case 1:
                    key = _state.sent();
                    iv = base64ToBytes(encryptedData.iv);
                    cipher = base64ToBytes(encryptedData.cipher);
                    _ = Uint8Array.bind;
                    return [
                        4,
                        crypto.subtle.decrypt({
                            name: "AES-GCM",
                            iv: iv
                        }, key, cipher)
                    ];
                case 2:
                    contentBytes = new (_.apply(Uint8Array, [
                        void 0,
                        _state.sent()
                    ]));
                    return [
                        2,
                        bytesToString(contentBytes)
                    ];
            }
        });
    });
    return _decryptData.apply(this, arguments);
}
function getKey(password, salt) {
    return _getKey.apply(this, arguments);
}
function _getKey() {
    _getKey = _async_to_generator(function(password, salt) {
        var passwordBytes, initialKey;
        return _ts_generator(this, function(_state) {
            switch(_state.label){
                case 0:
                    passwordBytes = stringToBytes(password);
                    return [
                        4,
                        crypto.subtle.importKey("raw", passwordBytes, {
                            name: "PBKDF2"
                        }, false, [
                            "deriveKey"
                        ])
                    ];
                case 1:
                    initialKey = _state.sent();
                    return [
                        2,
                        crypto.subtle.deriveKey({
                            name: "PBKDF2",
                            salt: salt,
                            iterations: 200000,
                            hash: "SHA-256"
                        }, initialKey, {
                            name: "AES-GCM",
                            length: 256
                        }, false, [
                            "encrypt",
                            "decrypt"
                        ])
                    ];
            }
        });
    });
    return _getKey.apply(this, arguments);
}
// conversion helpers
function bytesToString(bytes) {
    return new TextDecoder().decode(bytes);
}
function stringToBytes(str) {
    return new TextEncoder().encode(str);
}

function bytesToBase64(arr) {
    return to_string_toString(arr, 'base64');
}
function base64ToBytes(base64) {
    return ui8FromString(base64, 'base64');
}

;// CONCATENATED MODULE: ./node_modules/.pnpm/@atcute+tid@1.0.2/node_modules/@atcute/tid/dist/s32.js
const S32_CHAR = '234567abcdefghijklmnopqrstuvwxyz';
const s32encode = (i) => {
    let s = '';
    while (i) {
        const c = i % 32;
        i = Math.floor(i / 32);
        s = S32_CHAR.charAt(c) + s;
    }
    return s;
};
const s32_s32decode = (s) => {
    let i = 0;
    for (const c of s) {
        i = i * 32 + S32_CHAR.indexOf(c);
    }
    return i;
};
//# sourceMappingURL=s32.js.map
;// CONCATENATED MODULE: ./node_modules/.pnpm/@atcute+tid@1.0.2/node_modules/@atcute/tid/dist/index.js

let lastTimestamp = 0;
const TID_RE = /^[234567abcdefghij][234567abcdefghijklmnopqrstuvwxyz]{12}$/;
/**
 * Creates a TID based off provided timestamp and clockid, with no validation.
 */
const createRaw = (timestamp, clockid) => {
    return s32encode(timestamp).padStart(11, '2') + s32encode(clockid).padStart(2, '2');
};
/**
 * Creates a TID based off provided timestamp and clockid
 */
const dist_create = (timestamp, clockid) => {
    if (timestamp < 0 || !Number.isSafeInteger(timestamp)) {
        throw new Error(`invalid timestamp`);
    }
    if (clockid < 0 || clockid > 1023) {
        throw new Error(`invalid clockid`);
    }
    return createRaw(timestamp, clockid);
};
/**
 * Return a TID based on current time
 */
const dist_now = () => {
    // we need these two aspects, which Date.now() doesn't provide:
    // - monotonically increasing time
    // - microsecond precision
    // while `performance.timeOrigin + performance.now()` could be used here, they
    // seem to have cross-browser differences, not sure on that yet.
    let timestamp = Math.max(Date.now() * 1_000, lastTimestamp);
    lastTimestamp = timestamp + 1;
    return createRaw(timestamp, Math.floor(Math.random() * 1023));
};
/**
 * Parses a TID, throws on invalid strings.
 */
const parse = (tid) => {
    if (!validate(tid)) {
        throw new Error(`invalid TID`);
    }
    const timestamp = s32decode(tid.slice(0, 11));
    const clockid = s32decode(tid.slice(11, 13));
    return { timestamp: timestamp, clockid: clockid };
};
/**
 * Validate if string is a valid TID
 */
const validate = (tid) => {
    return tid.length === 13 && TID_RE.test(tid);
};
//# sourceMappingURL=index.js.map
// EXTERNAL MODULE: ./node_modules/.pnpm/GM_config@https+++codeload.github.com+uwx+GM_config_module+tar.gz+5cc9db241a42e2016bddcacb76f_xw2d6ve5dbk2thiyzndvb2en4e/node_modules/GM_config/gm_config.js
var gm_config = __webpack_require__("78");
;// CONCATENATED MODULE: ./src/main.ts
function _array_like_to_array(arr, len) {
    if (len == null || len > arr.length) len = arr.length;
    for(var i = 0, arr2 = new Array(len); i < len; i++)arr2[i] = arr[i];
    return arr2;
}
function _array_with_holes(arr) {
    if (Array.isArray(arr)) return arr;
}
function _array_without_holes(arr) {
    if (Array.isArray(arr)) return _array_like_to_array(arr);
}
function main_asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) {
    try {
        var info = gen[key](arg);
        var value = info.value;
    } catch (error) {
        reject(error);
        return;
    }
    if (info.done) {
        resolve(value);
    } else {
        Promise.resolve(value).then(_next, _throw);
    }
}
function main_async_to_generator(fn) {
    return function() {
        var self = this, args = arguments;
        return new Promise(function(resolve, reject) {
            var gen = fn.apply(self, args);
            function _next(value) {
                main_asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value);
            }
            function _throw(err) {
                main_asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err);
            }
            _next(undefined);
        });
    };
}
function _define_property(obj, key, value) {
    if (key in obj) {
        Object.defineProperty(obj, key, {
            value: value,
            enumerable: true,
            configurable: true,
            writable: true
        });
    } else {
        obj[key] = value;
    }
    return obj;
}
function _iterable_to_array(iter) {
    if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter);
}
function _iterable_to_array_limit(arr, i) {
    var _i = arr == null ? null : typeof Symbol !== "undefined" && arr[Symbol.iterator] || arr["@@iterator"];
    if (_i == null) return;
    var _arr = [];
    var _n = true;
    var _d = false;
    var _s, _e;
    try {
        for(_i = _i.call(arr); !(_n = (_s = _i.next()).done); _n = true){
            _arr.push(_s.value);
            if (i && _arr.length === i) break;
        }
    } catch (err) {
        _d = true;
        _e = err;
    } finally{
        try {
            if (!_n && _i["return"] != null) _i["return"]();
        } finally{
            if (_d) throw _e;
        }
    }
    return _arr;
}
function _non_iterable_rest() {
    throw new TypeError("Invalid attempt to destructure non-iterable instance.\\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}
function _non_iterable_spread() {
    throw new TypeError("Invalid attempt to spread non-iterable instance.\\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}
function _object_spread(target) {
    for(var i = 1; i < arguments.length; i++){
        var source = arguments[i] != null ? arguments[i] : {};
        var ownKeys = Object.keys(source);
        if (typeof Object.getOwnPropertySymbols === "function") {
            ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function(sym) {
                return Object.getOwnPropertyDescriptor(source, sym).enumerable;
            }));
        }
        ownKeys.forEach(function(key) {
            _define_property(target, key, source[key]);
        });
    }
    return target;
}
function _sliced_to_array(arr, i) {
    return _array_with_holes(arr) || _iterable_to_array_limit(arr, i) || _unsupported_iterable_to_array(arr, i) || _non_iterable_rest();
}
function _to_consumable_array(arr) {
    return _array_without_holes(arr) || _iterable_to_array(arr) || _unsupported_iterable_to_array(arr) || _non_iterable_spread();
}
function _unsupported_iterable_to_array(o, minLen) {
    if (!o) return;
    if (typeof o === "string") return _array_like_to_array(o, minLen);
    var n = Object.prototype.toString.call(o).slice(8, -1);
    if (n === "Object" && o.constructor) n = o.constructor.name;
    if (n === "Map" || n === "Set") return Array.from(n);
    if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _array_like_to_array(o, minLen);
}
function main_ts_generator(thisArg, body) {
    var f, y, t, g, _ = {
        label: 0,
        sent: function() {
            if (t[0] & 1) throw t[1];
            return t[1];
        },
        trys: [],
        ops: []
    };
    return g = {
        next: verb(0),
        "throw": verb(1),
        "return": verb(2)
    }, typeof Symbol === "function" && (g[Symbol.iterator] = function() {
        return this;
    }), g;
    function verb(n) {
        return function(v) {
            return step([
                n,
                v
            ]);
        };
    }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while(_)try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [
                op[0] & 2,
                t.value
            ];
            switch(op[0]){
                case 0:
                case 1:
                    t = op;
                    break;
                case 4:
                    _.label++;
                    return {
                        value: op[1],
                        done: false
                    };
                case 5:
                    _.label++;
                    y = op[1];
                    op = [
                        0
                    ];
                    continue;
                case 7:
                    op = _.ops.pop();
                    _.trys.pop();
                    continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) {
                        _ = 0;
                        continue;
                    }
                    if (op[0] === 3 && (!t || op[1] > t[0] && op[1] < t[3])) {
                        _.label = op[1];
                        break;
                    }
                    if (op[0] === 6 && _.label < t[1]) {
                        _.label = t[1];
                        t = op;
                        break;
                    }
                    if (t && _.label < t[2]) {
                        _.label = t[2];
                        _.ops.push(op);
                        break;
                    }
                    if (t[2]) _.ops.pop();
                    _.trys.pop();
                    continue;
            }
            op = body.call(thisArg, _);
        } catch (e) {
            op = [
                6,
                e
            ];
            y = 0;
        } finally{
            f = t = 0;
        }
        if (op[0] & 5) throw op[1];
        return {
            value: op[0] ? op[1] : void 0,
            done: true
        };
    }
}





console.log('hello world!');
function arrayBufferToBase64(arrayBuffer) {
    return ui8ToString(new Uint8Array(arrayBuffer), 'base64');
}
var _GM_getValue, _GM_getValue1, _GM_getValue2, _GM_getValue3;
var config = new gm_config.GM_config({
    id: 'bluemark',
    title: 'Bluemark Settings',
    fields: {
        publishToDiscord: {
            type: 'checkbox',
            label: 'Publish bookmarks to Discord?',
            default: true
        },
        webhookUrl: {
            type: 'text',
            label: 'Webhook URL',
            default: (_GM_getValue = GM_getValue('webhookUrl')) !== null && _GM_getValue !== void 0 ? _GM_getValue : ''
        },
        publishToAtp: {
            type: 'checkbox',
            label: 'Publish bookmarks to ATP repository? (In encrypted form)',
            default: true
        },
        bskyUsername: {
            type: 'text',
            label: 'ATP Username',
            default: (_GM_getValue1 = GM_getValue('bskyUsername')) !== null && _GM_getValue1 !== void 0 ? _GM_getValue1 : ''
        },
        bskyPassword: {
            type: 'text',
            label: 'ATP Password (or App Password)',
            default: (_GM_getValue2 = GM_getValue('bskyPassword')) !== null && _GM_getValue2 !== void 0 ? _GM_getValue2 : ''
        },
        cryptoPassword: {
            type: 'text',
            label: 'Password used to encrypt your bookmarks',
            default: (_GM_getValue3 = GM_getValue('cryptoPassword')) !== null && _GM_getValue3 !== void 0 ? _GM_getValue3 : ''
        }
    }
});
var processedElements = new WeakSet();
function getLoggedInAgent() {
    return _getLoggedInAgent.apply(this, arguments);
}
function _getLoggedInAgent() {
    _getLoggedInAgent = main_async_to_generator(function() {
        var _ref, agent, manager, _, session, err, _1, _tmp, _2, _tmp1;
        return main_ts_generator(this, function(_state) {
            switch(_state.label){
                case 0:
                    _ = KittyAgent.createPdsWithCredentials;
                    return [
                        4,
                        config.getValue('bskyUsername', '')
                    ];
                case 1:
                    return [
                        4,
                        _.apply(KittyAgent, [
                            _state.sent()
                        ])
                    ];
                case 2:
                    _ref = _state.sent(), agent = _ref.agent, manager = _ref.manager;
                    session = GM_getValue('bskySession');
                    if (!session) return [
                        3,
                        10
                    ];
                    _state.label = 3;
                case 3:
                    _state.trys.push([
                        3,
                        5,
                        ,
                        9
                    ]);
                    return [
                        4,
                        manager.resume(session)
                    ];
                case 4:
                    _state.sent();
                    console.log('resumed session');
                    return [
                        3,
                        9
                    ];
                case 5:
                    err = _state.sent();
                    console.warn('failed to resume session', err);
                    _1 = manager.login;
                    _tmp = {};
                    return [
                        4,
                        config.getValue('bskyUsername', '')
                    ];
                case 6:
                    _tmp.identifier = _state.sent();
                    return [
                        4,
                        config.getValue('bskyPassword', '')
                    ];
                case 7:
                    return [
                        4,
                        _1.apply(manager, [
                            (_tmp.password = _state.sent(), _tmp)
                        ])
                    ];
                case 8:
                    session = _state.sent();
                    return [
                        3,
                        9
                    ];
                case 9:
                    return [
                        3,
                        14
                    ];
                case 10:
                    _2 = manager.login;
                    _tmp1 = {};
                    return [
                        4,
                        config.getValue('bskyUsername', '')
                    ];
                case 11:
                    _tmp1.identifier = _state.sent();
                    return [
                        4,
                        config.getValue('bskyPassword', '')
                    ];
                case 12:
                    return [
                        4,
                        _2.apply(manager, [
                            (_tmp1.password = _state.sent(), _tmp1)
                        ])
                    ];
                case 13:
                    session = _state.sent();
                    GM_setValue('bskySession', session);
                    _state.label = 14;
                case 14:
                    return [
                        2,
                        agent
                    ];
            }
        });
    });
    return _getLoggedInAgent.apply(this, arguments);
}
GM_registerMenuCommand('Config', function() {
    config.open();
});
setInterval(function() {
    var newElements = _to_consumable_array(document.querySelectorAll('[data-testid^="feedItem-"], [data-testid^="postThreadItem-"]')).map(function(e) {
        var _e_querySelector, _e_querySelector1;
        return {
            element: e,
            buttons: (_e_querySelector = e.querySelector('[aria-label="Open post options menu"]')) === null || _e_querySelector === void 0 ? void 0 : _e_querySelector.parentElement.parentElement.parentElement,
            postLink: (_e_querySelector1 = e.querySelector('[href^="/profile/"][href*="/post/"]')) === null || _e_querySelector1 === void 0 ? void 0 : _e_querySelector1.href
        };
    });
    var _iteratorNormalCompletion = true, _didIteratorError = false, _iteratorError = undefined;
    try {
        var _loop = function() {
            var _step_value = _step.value, element = _step_value.element, buttons = _step_value.buttons, postLink = _step_value.postLink;
            if (processedElements.has(element)) {
                return "continue";
            }
            processedElements.add(element);
            var button = document.createElement('button');
            button.textContent = '📌';
            button.onclick = /*#__PURE__*/ function() {
                var _ref = main_async_to_generator(function(e) {
                    return main_ts_generator(this, function(_state) {
                        switch(_state.label){
                            case 0:
                                e.stopPropagation();
                                e.preventDefault();
                                console.log("bookmarking ".concat(postLink !== null && postLink !== void 0 ? postLink : document.location.href));
                                // bookmark post
                                return [
                                    4,
                                    Promise.all([
                                        main_async_to_generator(function() {
                                            var _tmp, _tmp1, postMatch, _postMatch, repo, rkey, agent, _, _tmp2, _tmp3;
                                            return main_ts_generator(this, function(_state) {
                                                switch(_state.label){
                                                    case 0:
                                                        return [
                                                            4,
                                                            config.getValue('publishToAtp', true)
                                                        ];
                                                    case 1:
                                                        if (!_state.sent()) {
                                                            console.log('not publishing to atp');
                                                            return [
                                                                2
                                                            ];
                                                        }
                                                        return [
                                                            4,
                                                            config.getValue('cryptoPassword', '')
                                                        ];
                                                    case 2:
                                                        _tmp1 = !_state.sent();
                                                        if (_tmp1) return [
                                                            3,
                                                            4
                                                        ];
                                                        return [
                                                            4,
                                                            config.getValue('bskyUsername', '')
                                                        ];
                                                    case 3:
                                                        _tmp1 = !_state.sent();
                                                        _state.label = 4;
                                                    case 4:
                                                        _tmp = _tmp1;
                                                        if (_tmp) return [
                                                            3,
                                                            6
                                                        ];
                                                        return [
                                                            4,
                                                            config.getValue('bskyPassword', '')
                                                        ];
                                                    case 5:
                                                        _tmp = !_state.sent();
                                                        _state.label = 6;
                                                    case 6:
                                                        if (_tmp) {
                                                            alert('Bluesky account not configured!');
                                                            return [
                                                                2
                                                            ];
                                                        }
                                                        postMatch = (postLink !== null && postLink !== void 0 ? postLink : document.location.href).match(/\/profile\/(.*?)\/post\/(.*)/i);
                                                        if (!postMatch) {
                                                            alert('URL did not match regex!');
                                                            return [
                                                                2
                                                            ];
                                                        }
                                                        _postMatch = _sliced_to_array(postMatch, 3), repo = _postMatch[1], rkey = _postMatch[2];
                                                        console.log('logging in');
                                                        return [
                                                            4,
                                                            getLoggedInAgent()
                                                        ];
                                                    case 7:
                                                        agent = _state.sent();
                                                        console.log('logged in');
                                                        _ = agent.put;
                                                        _tmp2 = {
                                                            collection: 'io.github.uwx.bluemark.encryptedBookmark'
                                                        };
                                                        return [
                                                            4,
                                                            config.getValue('bskyUsername', '')
                                                        ];
                                                    case 8:
                                                        _tmp2.repo = _state.sent(), _tmp2.rkey = dist_now();
                                                        _tmp3 = [
                                                            {
                                                                $type: 'io.github.uwx.bluemark.encryptedBookmark'
                                                            }
                                                        ];
                                                        return [
                                                            4,
                                                            encryptData(JSON.stringify({
                                                                repo: repo,
                                                                rkey: rkey
                                                            }), config.getValue('cryptoPassword', ''))
                                                        ];
                                                    case 9:
                                                        return [
                                                            4,
                                                            _.apply(agent, [
                                                                (_tmp2.record = _object_spread.apply(void 0, _tmp3.concat([
                                                                    _state.sent()
                                                                ])), _tmp2)
                                                            ])
                                                        ];
                                                    case 10:
                                                        _state.sent();
                                                        return [
                                                            2
                                                        ];
                                                }
                                            });
                                        })(),
                                        main_async_to_generator(function() {
                                            return main_ts_generator(this, function(_state) {
                                                switch(_state.label){
                                                    case 0:
                                                        return [
                                                            4,
                                                            config.getValue('publishToDiscord', true)
                                                        ];
                                                    case 1:
                                                        if (!_state.sent()) {
                                                            console.log('not publishing to discord');
                                                            return [
                                                                2
                                                            ];
                                                        }
                                                        return [
                                                            4,
                                                            config.getValue('webhookUrl', '')
                                                        ];
                                                    case 2:
                                                        if (!_state.sent()) {
                                                            alert('No webhook URL set!');
                                                            return [
                                                                2
                                                            ];
                                                        }
                                                        return [
                                                            4,
                                                            config.getValue('webhookUrl', '')
                                                        ];
                                                    case 3:
                                                        return [
                                                            4,
                                                            fetch.apply(void 0, [
                                                                _state.sent(),
                                                                {
                                                                    method: 'POST',
                                                                    body: JSON.stringify({
                                                                        content: fixLink(postLink !== null && postLink !== void 0 ? postLink : document.location.href)
                                                                    }),
                                                                    headers: {
                                                                        'Content-Type': 'application/json'
                                                                    }
                                                                }
                                                            ])
                                                        ];
                                                    case 4:
                                                        _state.sent();
                                                        return [
                                                            2
                                                        ];
                                                }
                                            });
                                        })()
                                    ])
                                ];
                            case 1:
                                _state.sent();
                                return [
                                    2
                                ];
                        }
                    });
                });
                return function(e) {
                    return _ref.apply(this, arguments);
                };
            }();
            if (!buttons) return "continue";
            buttons.append(button);
        };
        for(var _iterator = newElements[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true)_loop();
    } catch (err) {
        _didIteratorError = true;
        _iteratorError = err;
    } finally{
        try {
            if (!_iteratorNormalCompletion && _iterator.return != null) {
                _iterator.return();
            }
        } finally{
            if (_didIteratorError) {
                throw _iteratorError;
            }
        }
    }
}, 250);
function fixLink(link) {
    var url = new URL(link);
    url.hostname = 'bskyx.app';
    return url.toString();
}

})();

})()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYmx1ZW1hcmsudXNlci5qcyIsInNvdXJjZXMiOlsid2VicGFjazovL2JsdWVtYXJrLy4vbm9kZV9tb2R1bGVzLy5wbnBtL0BhdHByb3RvK3N5bnRheEAwLjMuMS9ub2RlX21vZHVsZXMvQGF0cHJvdG8vc3ludGF4L2Rpc3QvYXR1cmkuanMiLCJ3ZWJwYWNrOi8vYmx1ZW1hcmsvLi9ub2RlX21vZHVsZXMvLnBucG0vQGF0cHJvdG8rc3ludGF4QDAuMy4xL25vZGVfbW9kdWxlcy9AYXRwcm90by9zeW50YXgvZGlzdC9hdHVyaV92YWxpZGF0aW9uLmpzIiwid2VicGFjazovL2JsdWVtYXJrLy4vbm9kZV9tb2R1bGVzLy5wbnBtL0BhdHByb3RvK3N5bnRheEAwLjMuMS9ub2RlX21vZHVsZXMvQGF0cHJvdG8vc3ludGF4L2Rpc3QvZGF0ZXRpbWUuanMiLCJ3ZWJwYWNrOi8vYmx1ZW1hcmsvLi9ub2RlX21vZHVsZXMvLnBucG0vQGF0cHJvdG8rc3ludGF4QDAuMy4xL25vZGVfbW9kdWxlcy9AYXRwcm90by9zeW50YXgvZGlzdC9kaWQuanMiLCJ3ZWJwYWNrOi8vYmx1ZW1hcmsvLi9ub2RlX21vZHVsZXMvLnBucG0vQGF0cHJvdG8rc3ludGF4QDAuMy4xL25vZGVfbW9kdWxlcy9AYXRwcm90by9zeW50YXgvZGlzdC9oYW5kbGUuanMiLCJ3ZWJwYWNrOi8vYmx1ZW1hcmsvLi9ub2RlX21vZHVsZXMvLnBucG0vQGF0cHJvdG8rc3ludGF4QDAuMy4xL25vZGVfbW9kdWxlcy9AYXRwcm90by9zeW50YXgvZGlzdC9pbmRleC5qcyIsIndlYnBhY2s6Ly9ibHVlbWFyay8uL25vZGVfbW9kdWxlcy8ucG5wbS9AYXRwcm90bytzeW50YXhAMC4zLjEvbm9kZV9tb2R1bGVzL0BhdHByb3RvL3N5bnRheC9kaXN0L25zaWQuanMiLCJ3ZWJwYWNrOi8vYmx1ZW1hcmsvLi9ub2RlX21vZHVsZXMvLnBucG0vQGF0cHJvdG8rc3ludGF4QDAuMy4xL25vZGVfbW9kdWxlcy9AYXRwcm90by9zeW50YXgvZGlzdC9yZWNvcmRrZXkuanMiLCJ3ZWJwYWNrOi8vYmx1ZW1hcmsvLi9ub2RlX21vZHVsZXMvLnBucG0vQGF0cHJvdG8rc3ludGF4QDAuMy4xL25vZGVfbW9kdWxlcy9AYXRwcm90by9zeW50YXgvZGlzdC90aWQuanMiLCJ3ZWJwYWNrOi8vYmx1ZW1hcmsvLi9ub2RlX21vZHVsZXMvLnBucG0vR01fY29uZmlnQGh0dHBzKysrY29kZWxvYWQuZ2l0aHViLmNvbSt1d3grR01fY29uZmlnX21vZHVsZSt0YXIuZ3orNWNjOWRiMjQxYTQyZTIwMTZiZGRjYWNiNzZmX3h3MmQ2dmU1ZGJrMnRoaXl6bmR2YjJlbjRlL25vZGVfbW9kdWxlcy9HTV9jb25maWcvZ21fY29uZmlnLmpzIiwid2VicGFjazovL2JsdWVtYXJrLy4vbm9kZV9tb2R1bGVzLy5wbnBtL0BhdGN1dGUrY2xpZW50QDIuMC42L25vZGVfbW9kdWxlcy9AYXRjdXRlL2NsaWVudC9kaXN0L2ZldGNoLWhhbmRsZXIuanMiLCJ3ZWJwYWNrOi8vYmx1ZW1hcmsvLi9ub2RlX21vZHVsZXMvLnBucG0vQGF0Y3V0ZStjbGllbnRAMi4wLjYvbm9kZV9tb2R1bGVzL0BhdGN1dGUvY2xpZW50L2Rpc3QvdXRpbHMvaHR0cC5qcyIsIndlYnBhY2s6Ly9ibHVlbWFyay8uL25vZGVfbW9kdWxlcy8ucG5wbS9AYXRjdXRlK2NsaWVudEAyLjAuNi9ub2RlX21vZHVsZXMvQGF0Y3V0ZS9jbGllbnQvZGlzdC9ycGMuanMiLCJ3ZWJwYWNrOi8vYmx1ZW1hcmsvLi9ub2RlX21vZHVsZXMvLnBucG0vQGF0Y3V0ZStjbGllbnRAMi4wLjYvbm9kZV9tb2R1bGVzL0BhdGN1dGUvY2xpZW50L2Rpc3QvdXRpbHMvZGlkLmpzIiwid2VicGFjazovL2JsdWVtYXJrLy4vbm9kZV9tb2R1bGVzLy5wbnBtL0BhdGN1dGUrY2xpZW50QDIuMC42L25vZGVfbW9kdWxlcy9AYXRjdXRlL2NsaWVudC9kaXN0L3V0aWxzL2p3dC5qcyIsIndlYnBhY2s6Ly9ibHVlbWFyay8uL25vZGVfbW9kdWxlcy8ucG5wbS9AYXRjdXRlK2NsaWVudEAyLjAuNi9ub2RlX21vZHVsZXMvQGF0Y3V0ZS9jbGllbnQvZGlzdC9jcmVkZW50aWFsLW1hbmFnZXIuanMiLCJ3ZWJwYWNrOi8vYmx1ZW1hcmsvLi9ub2RlX21vZHVsZXMvLnBucG0vQGF0Y3V0ZStjbGllbnRAMi4wLjYvbm9kZV9tb2R1bGVzL0BhdGN1dGUvY2xpZW50L2Rpc3QvaW5kZXguanMiLCJ3ZWJwYWNrOi8vYmx1ZW1hcmsvLi9ub2RlX21vZHVsZXMvLnBucG0va2l0dHktYWdlbnRAOC4zLjBfQGF0Y3V0ZStjaWRAMi4xLjBfQGF0Y3V0ZStjbGllbnRAMi4wLjZfQGF0Y3V0ZStvYXV0aC1icm93c2VyLWNsaWVudEAxLjAuOV9AYXRwcm90bytzeW50YXhAMC4zLjEvbm9kZV9tb2R1bGVzL2tpdHR5LWFnZW50L291dC9oYW5kbGVzL2RpZC1kb2N1bWVudC5qcyIsIndlYnBhY2s6Ly9ibHVlbWFyay8uL25vZGVfbW9kdWxlcy8ucG5wbS9raXR0eS1hZ2VudEA4LjMuMF9AYXRjdXRlK2NpZEAyLjEuMF9AYXRjdXRlK2NsaWVudEAyLjAuNl9AYXRjdXRlK29hdXRoLWJyb3dzZXItY2xpZW50QDEuMC45X0BhdHByb3RvK3N5bnRheEAwLjMuMS9ub2RlX21vZHVsZXMva2l0dHktYWdlbnQvb3V0L2hhbmRsZXMvaW5kZXguanMiLCJ3ZWJwYWNrOi8vYmx1ZW1hcmsvLi9ub2RlX21vZHVsZXMvLnBucG0va2l0dHktYWdlbnRAOC4zLjBfQGF0Y3V0ZStjaWRAMi4xLjBfQGF0Y3V0ZStjbGllbnRAMi4wLjZfQGF0Y3V0ZStvYXV0aC1icm93c2VyLWNsaWVudEAxLjAuOV9AYXRwcm90bytzeW50YXhAMC4zLjEvbm9kZV9tb2R1bGVzL2tpdHR5LWFnZW50L291dC9oYW5kbGVzL2RvaC5qcyIsIndlYnBhY2s6Ly9ibHVlbWFyay8uL25vZGVfbW9kdWxlcy8ucG5wbS9raXR0eS1hZ2VudEA4LjMuMF9AYXRjdXRlK2NpZEAyLjEuMF9AYXRjdXRlK2NsaWVudEAyLjAuNl9AYXRjdXRlK29hdXRoLWJyb3dzZXItY2xpZW50QDEuMC45X0BhdHByb3RvK3N5bnRheEAwLjMuMS9ub2RlX21vZHVsZXMva2l0dHktYWdlbnQvb3V0L2hhbmRsZXMvaHR0cC5qcyIsIndlYnBhY2s6Ly9ibHVlbWFyay8uL25vZGVfbW9kdWxlcy8ucG5wbS9raXR0eS1hZ2VudEA4LjMuMF9AYXRjdXRlK2NpZEAyLjEuMF9AYXRjdXRlK2NsaWVudEAyLjAuNl9AYXRjdXRlK29hdXRoLWJyb3dzZXItY2xpZW50QDEuMC45X0BhdHByb3RvK3N5bnRheEAwLjMuMS9ub2RlX21vZHVsZXMva2l0dHktYWdlbnQvb3V0L2hhbmRsZXMvcmVzb2x2ZS5qcyIsIndlYnBhY2s6Ly9ibHVlbWFyay8uL25vZGVfbW9kdWxlcy8ucG5wbS9raXR0eS1hZ2VudEA4LjMuMF9AYXRjdXRlK2NpZEAyLjEuMF9AYXRjdXRlK2NsaWVudEAyLjAuNl9AYXRjdXRlK29hdXRoLWJyb3dzZXItY2xpZW50QDEuMC45X0BhdHByb3RvK3N5bnRheEAwLjMuMS9ub2RlX21vZHVsZXMva2l0dHktYWdlbnQvb3V0L3Bkcy1oZWxwZXJzLmpzIiwid2VicGFjazovL2JsdWVtYXJrLy4vbm9kZV9tb2R1bGVzLy5wbnBtL2tpdHR5LWFnZW50QDguMy4wX0BhdGN1dGUrY2lkQDIuMS4wX0BhdGN1dGUrY2xpZW50QDIuMC42X0BhdGN1dGUrb2F1dGgtYnJvd3Nlci1jbGllbnRAMS4wLjlfQGF0cHJvdG8rc3ludGF4QDAuMy4xL25vZGVfbW9kdWxlcy9raXR0eS1hZ2VudC9vdXQvYWdlbnQuanMiLCJ3ZWJwYWNrOi8vYmx1ZW1hcmsvLi9ub2RlX21vZHVsZXMvLnBucG0va2l0dHktYWdlbnRAOC4zLjBfQGF0Y3V0ZStjaWRAMi4xLjBfQGF0Y3V0ZStjbGllbnRAMi4wLjZfQGF0Y3V0ZStvYXV0aC1icm93c2VyLWNsaWVudEAxLjAuOV9AYXRwcm90bytzeW50YXhAMC4zLjEvbm9kZV9tb2R1bGVzL2tpdHR5LWFnZW50L291dC9pbmRleC5qcyIsIndlYnBhY2s6Ly9ibHVlbWFyay8uL25vZGVfbW9kdWxlcy8ucG5wbS9tdWx0aWZvcm1hdHNAMTMuMy4xL25vZGVfbW9kdWxlcy9tdWx0aWZvcm1hdHMvZGlzdC9zcmMvYnl0ZXMuanMiLCJ3ZWJwYWNrOi8vYmx1ZW1hcmsvLi9ub2RlX21vZHVsZXMvLnBucG0vbXVsdGlmb3JtYXRzQDEzLjMuMS9ub2RlX21vZHVsZXMvbXVsdGlmb3JtYXRzL2Rpc3Qvc3JjL3ZlbmRvci9iYXNlLXguanMiLCJ3ZWJwYWNrOi8vYmx1ZW1hcmsvLi9ub2RlX21vZHVsZXMvLnBucG0vbXVsdGlmb3JtYXRzQDEzLjMuMS9ub2RlX21vZHVsZXMvbXVsdGlmb3JtYXRzL2Rpc3Qvc3JjL2Jhc2VzL2Jhc2UuanMiLCJ3ZWJwYWNrOi8vYmx1ZW1hcmsvLi9ub2RlX21vZHVsZXMvLnBucG0vbXVsdGlmb3JtYXRzQDEzLjMuMS9ub2RlX21vZHVsZXMvbXVsdGlmb3JtYXRzL2Rpc3Qvc3JjL2Jhc2VzL2Jhc2UxMC5qcyIsIndlYnBhY2s6Ly9ibHVlbWFyay8uL25vZGVfbW9kdWxlcy8ucG5wbS9tdWx0aWZvcm1hdHNAMTMuMy4xL25vZGVfbW9kdWxlcy9tdWx0aWZvcm1hdHMvZGlzdC9zcmMvYmFzZXMvYmFzZTE2LmpzIiwid2VicGFjazovL2JsdWVtYXJrLy4vbm9kZV9tb2R1bGVzLy5wbnBtL211bHRpZm9ybWF0c0AxMy4zLjEvbm9kZV9tb2R1bGVzL211bHRpZm9ybWF0cy9kaXN0L3NyYy9iYXNlcy9iYXNlMi5qcyIsIndlYnBhY2s6Ly9ibHVlbWFyay8uL25vZGVfbW9kdWxlcy8ucG5wbS9tdWx0aWZvcm1hdHNAMTMuMy4xL25vZGVfbW9kdWxlcy9tdWx0aWZvcm1hdHMvZGlzdC9zcmMvYmFzZXMvYmFzZTI1NmVtb2ppLmpzIiwid2VicGFjazovL2JsdWVtYXJrLy4vbm9kZV9tb2R1bGVzLy5wbnBtL211bHRpZm9ybWF0c0AxMy4zLjEvbm9kZV9tb2R1bGVzL211bHRpZm9ybWF0cy9kaXN0L3NyYy9iYXNlcy9iYXNlMzIuanMiLCJ3ZWJwYWNrOi8vYmx1ZW1hcmsvLi9ub2RlX21vZHVsZXMvLnBucG0vbXVsdGlmb3JtYXRzQDEzLjMuMS9ub2RlX21vZHVsZXMvbXVsdGlmb3JtYXRzL2Rpc3Qvc3JjL2Jhc2VzL2Jhc2UzNi5qcyIsIndlYnBhY2s6Ly9ibHVlbWFyay8uL25vZGVfbW9kdWxlcy8ucG5wbS9tdWx0aWZvcm1hdHNAMTMuMy4xL25vZGVfbW9kdWxlcy9tdWx0aWZvcm1hdHMvZGlzdC9zcmMvYmFzZXMvYmFzZTU4LmpzIiwid2VicGFjazovL2JsdWVtYXJrLy4vbm9kZV9tb2R1bGVzLy5wbnBtL211bHRpZm9ybWF0c0AxMy4zLjEvbm9kZV9tb2R1bGVzL211bHRpZm9ybWF0cy9kaXN0L3NyYy9iYXNlcy9iYXNlNjQuanMiLCJ3ZWJwYWNrOi8vYmx1ZW1hcmsvLi9ub2RlX21vZHVsZXMvLnBucG0vbXVsdGlmb3JtYXRzQDEzLjMuMS9ub2RlX21vZHVsZXMvbXVsdGlmb3JtYXRzL2Rpc3Qvc3JjL2Jhc2VzL2Jhc2U4LmpzIiwid2VicGFjazovL2JsdWVtYXJrLy4vbm9kZV9tb2R1bGVzLy5wbnBtL211bHRpZm9ybWF0c0AxMy4zLjEvbm9kZV9tb2R1bGVzL211bHRpZm9ybWF0cy9kaXN0L3NyYy9iYXNlcy9pZGVudGl0eS5qcyIsIndlYnBhY2s6Ly9ibHVlbWFyay8uL25vZGVfbW9kdWxlcy8ucG5wbS9tdWx0aWZvcm1hdHNAMTMuMy4xL25vZGVfbW9kdWxlcy9tdWx0aWZvcm1hdHMvZGlzdC9zcmMvY29kZWNzL2pzb24uanMiLCJ3ZWJwYWNrOi8vYmx1ZW1hcmsvLi9ub2RlX21vZHVsZXMvLnBucG0vbXVsdGlmb3JtYXRzQDEzLjMuMS9ub2RlX21vZHVsZXMvbXVsdGlmb3JtYXRzL2Rpc3Qvc3JjL2NvZGVjcy9yYXcuanMiLCJ3ZWJwYWNrOi8vYmx1ZW1hcmsvLi9ub2RlX21vZHVsZXMvLnBucG0vbXVsdGlmb3JtYXRzQDEzLjMuMS9ub2RlX21vZHVsZXMvbXVsdGlmb3JtYXRzL2Rpc3Qvc3JjL3ZlbmRvci92YXJpbnQuanMiLCJ3ZWJwYWNrOi8vYmx1ZW1hcmsvLi9ub2RlX21vZHVsZXMvLnBucG0vbXVsdGlmb3JtYXRzQDEzLjMuMS9ub2RlX21vZHVsZXMvbXVsdGlmb3JtYXRzL2Rpc3Qvc3JjL3ZhcmludC5qcyIsIndlYnBhY2s6Ly9ibHVlbWFyay8uL25vZGVfbW9kdWxlcy8ucG5wbS9tdWx0aWZvcm1hdHNAMTMuMy4xL25vZGVfbW9kdWxlcy9tdWx0aWZvcm1hdHMvZGlzdC9zcmMvaGFzaGVzL2RpZ2VzdC5qcyIsIndlYnBhY2s6Ly9ibHVlbWFyay8uL25vZGVfbW9kdWxlcy8ucG5wbS9tdWx0aWZvcm1hdHNAMTMuMy4xL25vZGVfbW9kdWxlcy9tdWx0aWZvcm1hdHMvZGlzdC9zcmMvaGFzaGVzL2lkZW50aXR5LmpzIiwid2VicGFjazovL2JsdWVtYXJrLy4vbm9kZV9tb2R1bGVzLy5wbnBtL211bHRpZm9ybWF0c0AxMy4zLjEvbm9kZV9tb2R1bGVzL211bHRpZm9ybWF0cy9kaXN0L3NyYy9oYXNoZXMvaGFzaGVyLmpzIiwid2VicGFjazovL2JsdWVtYXJrLy4vbm9kZV9tb2R1bGVzLy5wbnBtL211bHRpZm9ybWF0c0AxMy4zLjEvbm9kZV9tb2R1bGVzL211bHRpZm9ybWF0cy9kaXN0L3NyYy9oYXNoZXMvc2hhMi1icm93c2VyLmpzIiwid2VicGFjazovL2JsdWVtYXJrLy4vbm9kZV9tb2R1bGVzLy5wbnBtL211bHRpZm9ybWF0c0AxMy4zLjEvbm9kZV9tb2R1bGVzL211bHRpZm9ybWF0cy9kaXN0L3NyYy9jaWQuanMiLCJ3ZWJwYWNrOi8vYmx1ZW1hcmsvLi9ub2RlX21vZHVsZXMvLnBucG0vbXVsdGlmb3JtYXRzQDEzLjMuMS9ub2RlX21vZHVsZXMvbXVsdGlmb3JtYXRzL2Rpc3Qvc3JjL2luZGV4LmpzIiwid2VicGFjazovL2JsdWVtYXJrLy4vbm9kZV9tb2R1bGVzLy5wbnBtL211bHRpZm9ybWF0c0AxMy4zLjEvbm9kZV9tb2R1bGVzL211bHRpZm9ybWF0cy9kaXN0L3NyYy9iYXNpY3MuanMiLCJ3ZWJwYWNrOi8vYmx1ZW1hcmsvLi9ub2RlX21vZHVsZXMvLnBucG0vdWludDhhcnJheXNANS4xLjAvbm9kZV9tb2R1bGVzL3VpbnQ4YXJyYXlzL2Rpc3Qvc3JjL2FsbG9jLmpzIiwid2VicGFjazovL2JsdWVtYXJrLy4vbm9kZV9tb2R1bGVzLy5wbnBtL3VpbnQ4YXJyYXlzQDUuMS4wL25vZGVfbW9kdWxlcy91aW50OGFycmF5cy9kaXN0L3NyYy91dGlsL2Jhc2VzLmpzIiwid2VicGFjazovL2JsdWVtYXJrLy4vbm9kZV9tb2R1bGVzLy5wbnBtL3VpbnQ4YXJyYXlzQDUuMS4wL25vZGVfbW9kdWxlcy91aW50OGFycmF5cy9kaXN0L3NyYy9mcm9tLXN0cmluZy5qcyIsIndlYnBhY2s6Ly9ibHVlbWFyay8uL25vZGVfbW9kdWxlcy8ucG5wbS91aW50OGFycmF5c0A1LjEuMC9ub2RlX21vZHVsZXMvdWludDhhcnJheXMvZGlzdC9zcmMvdG8tc3RyaW5nLmpzIiwid2VicGFjazovL2JsdWVtYXJrLy4vbm9kZV9tb2R1bGVzLy5wbnBtL3VpbnQ4YXJyYXlzQDUuMS4wL25vZGVfbW9kdWxlcy91aW50OGFycmF5cy9kaXN0L3NyYy9pbmRleC5qcyIsIndlYnBhY2s6Ly9ibHVlbWFyay8uL3NyYy9jcnlwdG8udHMiLCJ3ZWJwYWNrOi8vYmx1ZW1hcmsvLi9ub2RlX21vZHVsZXMvLnBucG0vQGF0Y3V0ZSt0aWRAMS4wLjIvbm9kZV9tb2R1bGVzL0BhdGN1dGUvdGlkL2Rpc3QvczMyLmpzIiwid2VicGFjazovL2JsdWVtYXJrLy4vbm9kZV9tb2R1bGVzLy5wbnBtL0BhdGN1dGUrdGlkQDEuMC4yL25vZGVfbW9kdWxlcy9AYXRjdXRlL3RpZC9kaXN0L2luZGV4LmpzIiwid2VicGFjazovL2JsdWVtYXJrLy4vc3JjL21haW4udHMiXSwic291cmNlc0NvbnRlbnQiOlsiXCJ1c2Ugc3RyaWN0XCI7XG52YXIgX19jcmVhdGVCaW5kaW5nID0gKHRoaXMgJiYgdGhpcy5fX2NyZWF0ZUJpbmRpbmcpIHx8IChPYmplY3QuY3JlYXRlID8gKGZ1bmN0aW9uKG8sIG0sIGssIGsyKSB7XG4gICAgaWYgKGsyID09PSB1bmRlZmluZWQpIGsyID0gaztcbiAgICB2YXIgZGVzYyA9IE9iamVjdC5nZXRPd25Qcm9wZXJ0eURlc2NyaXB0b3IobSwgayk7XG4gICAgaWYgKCFkZXNjIHx8IChcImdldFwiIGluIGRlc2MgPyAhbS5fX2VzTW9kdWxlIDogZGVzYy53cml0YWJsZSB8fCBkZXNjLmNvbmZpZ3VyYWJsZSkpIHtcbiAgICAgIGRlc2MgPSB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZnVuY3Rpb24oKSB7IHJldHVybiBtW2tdOyB9IH07XG4gICAgfVxuICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShvLCBrMiwgZGVzYyk7XG59KSA6IChmdW5jdGlvbihvLCBtLCBrLCBrMikge1xuICAgIGlmIChrMiA9PT0gdW5kZWZpbmVkKSBrMiA9IGs7XG4gICAgb1trMl0gPSBtW2tdO1xufSkpO1xudmFyIF9fZXhwb3J0U3RhciA9ICh0aGlzICYmIHRoaXMuX19leHBvcnRTdGFyKSB8fCBmdW5jdGlvbihtLCBleHBvcnRzKSB7XG4gICAgZm9yICh2YXIgcCBpbiBtKSBpZiAocCAhPT0gXCJkZWZhdWx0XCIgJiYgIU9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChleHBvcnRzLCBwKSkgX19jcmVhdGVCaW5kaW5nKGV4cG9ydHMsIG0sIHApO1xufTtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcbmV4cG9ydHMuQXRVcmkgPSBleHBvcnRzLkFUUF9VUklfUkVHRVggPSB2b2lkIDA7XG5fX2V4cG9ydFN0YXIocmVxdWlyZShcIi4vYXR1cmlfdmFsaWRhdGlvblwiKSwgZXhwb3J0cyk7XG5leHBvcnRzLkFUUF9VUklfUkVHRVggPSBcbi8vIHByb3RvLSAgICAtLWRpZC0tLS0tLS0tLS0tLS0tICAgLS1uYW1lLS0tLS0tLS0tLS0tLS0tLSAgIC0tcGF0aC0tLS0gICAtLXF1ZXJ5LS0gICAtLWhhc2gtLVxuL14oYXQ6XFwvXFwvKT8oKD86ZGlkOlthLXowLTk6JS1dKyl8KD86W2EtejAtOV1bYS16MC05LjotXSopKShcXC9bXj8jXFxzXSopPyhcXD9bXiNcXHNdKyk/KCNbXlxcc10rKT8kL2k7XG4vLyAgICAgICAgICAgICAgICAgICAgICAgLS1wYXRoLS0tLS0gICAtLXF1ZXJ5LS0gIC0taGFzaC0tXG5jb25zdCBSRUxBVElWRV9SRUdFWCA9IC9eKFxcL1tePyNcXHNdKik/KFxcP1teI1xcc10rKT8oI1teXFxzXSspPyQvaTtcbmNsYXNzIEF0VXJpIHtcbiAgICBjb25zdHJ1Y3Rvcih1cmksIGJhc2UpIHtcbiAgICAgICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KHRoaXMsIFwiaGFzaFwiLCB7XG4gICAgICAgICAgICBlbnVtZXJhYmxlOiB0cnVlLFxuICAgICAgICAgICAgY29uZmlndXJhYmxlOiB0cnVlLFxuICAgICAgICAgICAgd3JpdGFibGU6IHRydWUsXG4gICAgICAgICAgICB2YWx1ZTogdm9pZCAwXG4gICAgICAgIH0pO1xuICAgICAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkodGhpcywgXCJob3N0XCIsIHtcbiAgICAgICAgICAgIGVudW1lcmFibGU6IHRydWUsXG4gICAgICAgICAgICBjb25maWd1cmFibGU6IHRydWUsXG4gICAgICAgICAgICB3cml0YWJsZTogdHJ1ZSxcbiAgICAgICAgICAgIHZhbHVlOiB2b2lkIDBcbiAgICAgICAgfSk7XG4gICAgICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eSh0aGlzLCBcInBhdGhuYW1lXCIsIHtcbiAgICAgICAgICAgIGVudW1lcmFibGU6IHRydWUsXG4gICAgICAgICAgICBjb25maWd1cmFibGU6IHRydWUsXG4gICAgICAgICAgICB3cml0YWJsZTogdHJ1ZSxcbiAgICAgICAgICAgIHZhbHVlOiB2b2lkIDBcbiAgICAgICAgfSk7XG4gICAgICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eSh0aGlzLCBcInNlYXJjaFBhcmFtc1wiLCB7XG4gICAgICAgICAgICBlbnVtZXJhYmxlOiB0cnVlLFxuICAgICAgICAgICAgY29uZmlndXJhYmxlOiB0cnVlLFxuICAgICAgICAgICAgd3JpdGFibGU6IHRydWUsXG4gICAgICAgICAgICB2YWx1ZTogdm9pZCAwXG4gICAgICAgIH0pO1xuICAgICAgICBsZXQgcGFyc2VkO1xuICAgICAgICBpZiAoYmFzZSkge1xuICAgICAgICAgICAgcGFyc2VkID0gcGFyc2UoYmFzZSk7XG4gICAgICAgICAgICBpZiAoIXBhcnNlZCkge1xuICAgICAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcihgSW52YWxpZCBhdCB1cmk6ICR7YmFzZX1gKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGNvbnN0IHJlbGF0aXZlcCA9IHBhcnNlUmVsYXRpdmUodXJpKTtcbiAgICAgICAgICAgIGlmICghcmVsYXRpdmVwKSB7XG4gICAgICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKGBJbnZhbGlkIHBhdGg6ICR7dXJpfWApO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgT2JqZWN0LmFzc2lnbihwYXJzZWQsIHJlbGF0aXZlcCk7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICBwYXJzZWQgPSBwYXJzZSh1cmkpO1xuICAgICAgICAgICAgaWYgKCFwYXJzZWQpIHtcbiAgICAgICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoYEludmFsaWQgYXQgdXJpOiAke3VyaX1gKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICB0aGlzLmhhc2ggPSBwYXJzZWQuaGFzaDtcbiAgICAgICAgdGhpcy5ob3N0ID0gcGFyc2VkLmhvc3Q7XG4gICAgICAgIHRoaXMucGF0aG5hbWUgPSBwYXJzZWQucGF0aG5hbWU7XG4gICAgICAgIHRoaXMuc2VhcmNoUGFyYW1zID0gcGFyc2VkLnNlYXJjaFBhcmFtcztcbiAgICB9XG4gICAgc3RhdGljIG1ha2UoaGFuZGxlT3JEaWQsIGNvbGxlY3Rpb24sIHJrZXkpIHtcbiAgICAgICAgbGV0IHN0ciA9IGhhbmRsZU9yRGlkO1xuICAgICAgICBpZiAoY29sbGVjdGlvbilcbiAgICAgICAgICAgIHN0ciArPSAnLycgKyBjb2xsZWN0aW9uO1xuICAgICAgICBpZiAocmtleSlcbiAgICAgICAgICAgIHN0ciArPSAnLycgKyBya2V5O1xuICAgICAgICByZXR1cm4gbmV3IEF0VXJpKHN0cik7XG4gICAgfVxuICAgIGdldCBwcm90b2NvbCgpIHtcbiAgICAgICAgcmV0dXJuICdhdDonO1xuICAgIH1cbiAgICBnZXQgb3JpZ2luKCkge1xuICAgICAgICByZXR1cm4gYGF0Oi8vJHt0aGlzLmhvc3R9YDtcbiAgICB9XG4gICAgZ2V0IGhvc3RuYW1lKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5ob3N0O1xuICAgIH1cbiAgICBzZXQgaG9zdG5hbWUodikge1xuICAgICAgICB0aGlzLmhvc3QgPSB2O1xuICAgIH1cbiAgICBnZXQgc2VhcmNoKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5zZWFyY2hQYXJhbXMudG9TdHJpbmcoKTtcbiAgICB9XG4gICAgc2V0IHNlYXJjaCh2KSB7XG4gICAgICAgIHRoaXMuc2VhcmNoUGFyYW1zID0gbmV3IFVSTFNlYXJjaFBhcmFtcyh2KTtcbiAgICB9XG4gICAgZ2V0IGNvbGxlY3Rpb24oKSB7XG4gICAgICAgIHJldHVybiB0aGlzLnBhdGhuYW1lLnNwbGl0KCcvJykuZmlsdGVyKEJvb2xlYW4pWzBdIHx8ICcnO1xuICAgIH1cbiAgICBzZXQgY29sbGVjdGlvbih2KSB7XG4gICAgICAgIGNvbnN0IHBhcnRzID0gdGhpcy5wYXRobmFtZS5zcGxpdCgnLycpLmZpbHRlcihCb29sZWFuKTtcbiAgICAgICAgcGFydHNbMF0gPSB2O1xuICAgICAgICB0aGlzLnBhdGhuYW1lID0gcGFydHMuam9pbignLycpO1xuICAgIH1cbiAgICBnZXQgcmtleSgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMucGF0aG5hbWUuc3BsaXQoJy8nKS5maWx0ZXIoQm9vbGVhbilbMV0gfHwgJyc7XG4gICAgfVxuICAgIHNldCBya2V5KHYpIHtcbiAgICAgICAgY29uc3QgcGFydHMgPSB0aGlzLnBhdGhuYW1lLnNwbGl0KCcvJykuZmlsdGVyKEJvb2xlYW4pO1xuICAgICAgICBpZiAoIXBhcnRzWzBdKVxuICAgICAgICAgICAgcGFydHNbMF0gPSAndW5kZWZpbmVkJztcbiAgICAgICAgcGFydHNbMV0gPSB2O1xuICAgICAgICB0aGlzLnBhdGhuYW1lID0gcGFydHMuam9pbignLycpO1xuICAgIH1cbiAgICBnZXQgaHJlZigpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMudG9TdHJpbmcoKTtcbiAgICB9XG4gICAgdG9TdHJpbmcoKSB7XG4gICAgICAgIGxldCBwYXRoID0gdGhpcy5wYXRobmFtZSB8fCAnLyc7XG4gICAgICAgIGlmICghcGF0aC5zdGFydHNXaXRoKCcvJykpIHtcbiAgICAgICAgICAgIHBhdGggPSBgLyR7cGF0aH1gO1xuICAgICAgICB9XG4gICAgICAgIGxldCBxcyA9IHRoaXMuc2VhcmNoUGFyYW1zLnRvU3RyaW5nKCk7XG4gICAgICAgIGlmIChxcyAmJiAhcXMuc3RhcnRzV2l0aCgnPycpKSB7XG4gICAgICAgICAgICBxcyA9IGA/JHtxc31gO1xuICAgICAgICB9XG4gICAgICAgIGxldCBoYXNoID0gdGhpcy5oYXNoO1xuICAgICAgICBpZiAoaGFzaCAmJiAhaGFzaC5zdGFydHNXaXRoKCcjJykpIHtcbiAgICAgICAgICAgIGhhc2ggPSBgIyR7aGFzaH1gO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBgYXQ6Ly8ke3RoaXMuaG9zdH0ke3BhdGh9JHtxc30ke2hhc2h9YDtcbiAgICB9XG59XG5leHBvcnRzLkF0VXJpID0gQXRVcmk7XG5mdW5jdGlvbiBwYXJzZShzdHIpIHtcbiAgICBjb25zdCBtYXRjaCA9IGV4cG9ydHMuQVRQX1VSSV9SRUdFWC5leGVjKHN0cik7XG4gICAgaWYgKG1hdGNoKSB7XG4gICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICBoYXNoOiBtYXRjaFs1XSB8fCAnJyxcbiAgICAgICAgICAgIGhvc3Q6IG1hdGNoWzJdIHx8ICcnLFxuICAgICAgICAgICAgcGF0aG5hbWU6IG1hdGNoWzNdIHx8ICcnLFxuICAgICAgICAgICAgc2VhcmNoUGFyYW1zOiBuZXcgVVJMU2VhcmNoUGFyYW1zKG1hdGNoWzRdIHx8ICcnKSxcbiAgICAgICAgfTtcbiAgICB9XG4gICAgcmV0dXJuIHVuZGVmaW5lZDtcbn1cbmZ1bmN0aW9uIHBhcnNlUmVsYXRpdmUoc3RyKSB7XG4gICAgY29uc3QgbWF0Y2ggPSBSRUxBVElWRV9SRUdFWC5leGVjKHN0cik7XG4gICAgaWYgKG1hdGNoKSB7XG4gICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICBoYXNoOiBtYXRjaFszXSB8fCAnJyxcbiAgICAgICAgICAgIHBhdGhuYW1lOiBtYXRjaFsxXSB8fCAnJyxcbiAgICAgICAgICAgIHNlYXJjaFBhcmFtczogbmV3IFVSTFNlYXJjaFBhcmFtcyhtYXRjaFsyXSB8fCAnJyksXG4gICAgICAgIH07XG4gICAgfVxuICAgIHJldHVybiB1bmRlZmluZWQ7XG59XG4vLyMgc291cmNlTWFwcGluZ1VSTD1hdHVyaS5qcy5tYXAiLCJcInVzZSBzdHJpY3RcIjtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcbmV4cG9ydHMuZW5zdXJlVmFsaWRBdFVyaVJlZ2V4ID0gZXhwb3J0cy5lbnN1cmVWYWxpZEF0VXJpID0gdm9pZCAwO1xuY29uc3QgaGFuZGxlXzEgPSByZXF1aXJlKFwiLi9oYW5kbGVcIik7XG5jb25zdCBkaWRfMSA9IHJlcXVpcmUoXCIuL2RpZFwiKTtcbmNvbnN0IG5zaWRfMSA9IHJlcXVpcmUoXCIuL25zaWRcIik7XG4vLyBIdW1hbi1yZWFkYWJsZSBjb25zdHJhaW50cyBvbiBBVFVSSTpcbi8vICAgLSBmb2xsb3dpbmcgcmVndWxhciBVUkxzLCBhIDhLQnl0ZSBoYXJkIHRvdGFsIGxlbmd0aCBsaW1pdFxuLy8gICAtIGZvbGxvd3MgQVRVUkkgZG9jcyBvbiB3ZWJzaXRlXG4vLyAgICAgIC0gYWxsIEFTQ0lJIGNoYXJhY3RlcnMsIG5vIHdoaXRlc3BhY2UuIG5vbi1BU0NJSSBjb3VsZCBiZSBVUkwtZW5jb2RlZFxuLy8gICAgICAtIHN0YXJ0cyBcImF0Oi8vXCJcbi8vICAgICAgLSBcImF1dGhvcml0eVwiIGlzIGEgdmFsaWQgRElEIG9yIGEgdmFsaWQgaGFuZGxlXG4vLyAgICAgIC0gb3B0aW9uYWxseSwgZm9sbG93IFwiYXV0aG9yaXR5XCIgd2l0aCBcIi9cIiBhbmQgdmFsaWQgTlNJRCBhcyBzdGFydCBvZiBwYXRoXG4vLyAgICAgIC0gb3B0aW9uYWxseSwgaWYgTlNJRCBnaXZlbiwgZm9sbG93IHRoYXQgd2l0aCBcIi9cIiBhbmQgcmtleVxuLy8gICAgICAtIHJrZXkgcGF0aCBjb21wb25lbnQgY2FuIGluY2x1ZGUgVVJMLWVuY29kZWQgKFwicGVyY2VudCBlbmNvZGVkXCIpLCBvcjpcbi8vICAgICAgICAgIEFMUEhBIC8gRElHSVQgLyBcIi1cIiAvIFwiLlwiIC8gXCJfXCIgLyBcIn5cIiAvIFwiOlwiIC8gXCJAXCIgLyBcIiFcIiAvIFwiJFwiIC8gXCImXCIgLyBcIidcIiAvIFwiKFwiIC8gXCIpXCIgLyBcIipcIiAvIFwiK1wiIC8gXCIsXCIgLyBcIjtcIiAvIFwiPVwiXG4vLyAgICAgICAgICBbYS16QS1aMC05Ll9+OkAhJCYnXFwoXFwpKissOz0tXVxuLy8gICAgICAtIHJrZXkgbXVzdCBoYXZlIGF0IGxlYXN0IG9uZSBjaGFyXG4vLyAgICAgIC0gcmVnYXJkbGVzcyBvZiBwYXRoIGNvbXBvbmVudCwgYSBmcmFnbWVudCBjYW4gZm9sbG93ICBhcyBcIiNcIiBhbmQgdGhlbiBhIEpTT04gcG9pbnRlciAoUkZDLTY5MDEpXG5jb25zdCBlbnN1cmVWYWxpZEF0VXJpID0gKHVyaSkgPT4ge1xuICAgIC8vIEpTT04gcG9pbnRlciBpcyBwcmV0dHkgZGlmZmVyZW50IGZyb20gcmVzdCBvZiBVUkksIHNvIHNwbGl0IHRoYXQgb3V0IGZpcnN0XG4gICAgY29uc3QgdXJpUGFydHMgPSB1cmkuc3BsaXQoJyMnKTtcbiAgICBpZiAodXJpUGFydHMubGVuZ3RoID4gMikge1xuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ0FUVVJJIGNhbiBoYXZlIGF0IG1vc3Qgb25lIFwiI1wiLCBzZXBhcmF0aW5nIGZyYWdtZW50IG91dCcpO1xuICAgIH1cbiAgICBjb25zdCBmcmFnbWVudFBhcnQgPSB1cmlQYXJ0c1sxXSB8fCBudWxsO1xuICAgIHVyaSA9IHVyaVBhcnRzWzBdO1xuICAgIC8vIGNoZWNrIHRoYXQgYWxsIGNoYXJzIGFyZSBib3JpbmcgQVNDSUlcbiAgICBpZiAoIS9eW2EtekEtWjAtOS5ffjpAISQmJykoKissOz0lLy1dKiQvLnRlc3QodXJpKSkge1xuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ0Rpc2FsbG93ZWQgY2hhcmFjdGVycyBpbiBBVFVSSSAoQVNDSUkpJyk7XG4gICAgfVxuICAgIGNvbnN0IHBhcnRzID0gdXJpLnNwbGl0KCcvJyk7XG4gICAgaWYgKHBhcnRzLmxlbmd0aCA+PSAzICYmIChwYXJ0c1swXSAhPT0gJ2F0OicgfHwgcGFydHNbMV0ubGVuZ3RoICE9PSAwKSkge1xuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ0FUVVJJIG11c3Qgc3RhcnQgd2l0aCBcImF0Oi8vXCInKTtcbiAgICB9XG4gICAgaWYgKHBhcnRzLmxlbmd0aCA8IDMpIHtcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdBVFVSSSByZXF1aXJlcyBhdCBsZWFzdCBtZXRob2QgYW5kIGF1dGhvcml0eSBzZWN0aW9ucycpO1xuICAgIH1cbiAgICB0cnkge1xuICAgICAgICBpZiAocGFydHNbMl0uc3RhcnRzV2l0aCgnZGlkOicpKSB7XG4gICAgICAgICAgICAoMCwgZGlkXzEuZW5zdXJlVmFsaWREaWQpKHBhcnRzWzJdKTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICgwLCBoYW5kbGVfMS5lbnN1cmVWYWxpZEhhbmRsZSkocGFydHNbMl0pO1xuICAgICAgICB9XG4gICAgfVxuICAgIGNhdGNoIHtcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdBVFVSSSBhdXRob3JpdHkgbXVzdCBiZSBhIHZhbGlkIGhhbmRsZSBvciBESUQnKTtcbiAgICB9XG4gICAgaWYgKHBhcnRzLmxlbmd0aCA+PSA0KSB7XG4gICAgICAgIGlmIChwYXJ0c1szXS5sZW5ndGggPT09IDApIHtcbiAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcignQVRVUkkgY2FuIG5vdCBoYXZlIGEgc2xhc2ggYWZ0ZXIgYXV0aG9yaXR5IHdpdGhvdXQgYSBwYXRoIHNlZ21lbnQnKTtcbiAgICAgICAgfVxuICAgICAgICB0cnkge1xuICAgICAgICAgICAgKDAsIG5zaWRfMS5lbnN1cmVWYWxpZE5zaWQpKHBhcnRzWzNdKTtcbiAgICAgICAgfVxuICAgICAgICBjYXRjaCB7XG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ0FUVVJJIHJlcXVpcmVzIGZpcnN0IHBhdGggc2VnbWVudCAoaWYgc3VwcGxpZWQpIHRvIGJlIHZhbGlkIE5TSUQnKTtcbiAgICAgICAgfVxuICAgIH1cbiAgICBpZiAocGFydHMubGVuZ3RoID49IDUpIHtcbiAgICAgICAgaWYgKHBhcnRzWzRdLmxlbmd0aCA9PT0gMCkge1xuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdBVFVSSSBjYW4gbm90IGhhdmUgYSBzbGFzaCBhZnRlciBjb2xsZWN0aW9uLCB1bmxlc3MgcmVjb3JkIGtleSBpcyBwcm92aWRlZCcpO1xuICAgICAgICB9XG4gICAgICAgIC8vIHdvdWxkIHZhbGlkYXRlIHJrZXkgaGVyZSwgYnV0IHRoZXJlIGFyZSBiYXNpY2FsbHkgbm8gY29uc3RyYWludHMhXG4gICAgfVxuICAgIGlmIChwYXJ0cy5sZW5ndGggPj0gNikge1xuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ0FUVVJJIHBhdGggY2FuIGhhdmUgYXQgbW9zdCB0d28gcGFydHMsIGFuZCBubyB0cmFpbGluZyBzbGFzaCcpO1xuICAgIH1cbiAgICBpZiAodXJpUGFydHMubGVuZ3RoID49IDIgJiYgZnJhZ21lbnRQYXJ0ID09IG51bGwpIHtcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdBVFVSSSBmcmFnbWVudCBtdXN0IGJlIG5vbi1lbXB0eSBhbmQgc3RhcnQgd2l0aCBzbGFzaCcpO1xuICAgIH1cbiAgICBpZiAoZnJhZ21lbnRQYXJ0ICE9IG51bGwpIHtcbiAgICAgICAgaWYgKGZyYWdtZW50UGFydC5sZW5ndGggPT09IDAgfHwgZnJhZ21lbnRQYXJ0WzBdICE9PSAnLycpIHtcbiAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcignQVRVUkkgZnJhZ21lbnQgbXVzdCBiZSBub24tZW1wdHkgYW5kIHN0YXJ0IHdpdGggc2xhc2gnKTtcbiAgICAgICAgfVxuICAgICAgICAvLyBOT1RFOiBlbmZvcmNpbmcgKnNvbWUqIGNoZWNrcyBoZXJlIGZvciBzYW5pdHkuIEVnLCBhdCBsZWFzdCBubyB3aGl0ZXNwYWNlXG4gICAgICAgIGlmICghL15cXC9bYS16QS1aMC05Ll9+OkAhJCYnKSgqKyw7PSVbXFxdLy1dKiQvLnRlc3QoZnJhZ21lbnRQYXJ0KSkge1xuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdEaXNhbGxvd2VkIGNoYXJhY3RlcnMgaW4gQVRVUkkgZnJhZ21lbnQgKEFTQ0lJKScpO1xuICAgICAgICB9XG4gICAgfVxuICAgIGlmICh1cmkubGVuZ3RoID4gOCAqIDEwMjQpIHtcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdBVFVSSSBpcyBmYXIgdG9vIGxvbmcnKTtcbiAgICB9XG59O1xuZXhwb3J0cy5lbnN1cmVWYWxpZEF0VXJpID0gZW5zdXJlVmFsaWRBdFVyaTtcbmNvbnN0IGVuc3VyZVZhbGlkQXRVcmlSZWdleCA9ICh1cmkpID0+IHtcbiAgICAvLyBzaW1wbGUgcmVnZXggdG8gZW5mb3JjZSBtb3N0IGNvbnN0cmFpbnRzIHZpYSBqdXN0IHJlZ2V4IGFuZCBsZW5ndGguXG4gICAgLy8gaGFuZCB3cm90ZSB0aGlzIHJlZ2V4IGJhc2VkIG9uIGFib3ZlIGNvbnN0cmFpbnRzLiB3aGV3IVxuICAgIGNvbnN0IGF0dXJpUmVnZXggPSAvXmF0OlxcL1xcLyg/PGF1dGhvcml0eT5bYS16QS1aMC05Ll86JS1dKykoXFwvKD88Y29sbGVjdGlvbj5bYS16QS1aMC05LS5dKykoXFwvKD88cmtleT5bYS16QS1aMC05Ll9+OkAhJCYlJykoKissOz0tXSspKT8pPygjKD88ZnJhZ21lbnQ+XFwvW2EtekEtWjAtOS5ffjpAISQmJScpKCorLDs9XFwtW1xcXS9cXFxcXSopKT8kLztcbiAgICBjb25zdCBybSA9IHVyaS5tYXRjaChhdHVyaVJlZ2V4KTtcbiAgICBpZiAoIXJtIHx8ICFybS5ncm91cHMpIHtcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKFwiQVRVUkkgZGlkbid0IHZhbGlkYXRlIHZpYSByZWdleFwiKTtcbiAgICB9XG4gICAgY29uc3QgZ3JvdXBzID0gcm0uZ3JvdXBzO1xuICAgIHRyeSB7XG4gICAgICAgICgwLCBoYW5kbGVfMS5lbnN1cmVWYWxpZEhhbmRsZVJlZ2V4KShncm91cHMuYXV0aG9yaXR5KTtcbiAgICB9XG4gICAgY2F0Y2gge1xuICAgICAgICB0cnkge1xuICAgICAgICAgICAgKDAsIGRpZF8xLmVuc3VyZVZhbGlkRGlkUmVnZXgpKGdyb3Vwcy5hdXRob3JpdHkpO1xuICAgICAgICB9XG4gICAgICAgIGNhdGNoIHtcbiAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcignQVRVUkkgYXV0aG9yaXR5IG11c3QgYmUgYSB2YWxpZCBoYW5kbGUgb3IgRElEJyk7XG4gICAgICAgIH1cbiAgICB9XG4gICAgaWYgKGdyb3Vwcy5jb2xsZWN0aW9uKSB7XG4gICAgICAgIHRyeSB7XG4gICAgICAgICAgICAoMCwgbnNpZF8xLmVuc3VyZVZhbGlkTnNpZFJlZ2V4KShncm91cHMuY29sbGVjdGlvbik7XG4gICAgICAgIH1cbiAgICAgICAgY2F0Y2gge1xuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdBVFVSSSBjb2xsZWN0aW9uIHBhdGggc2VnbWVudCBtdXN0IGJlIGEgdmFsaWQgTlNJRCcpO1xuICAgICAgICB9XG4gICAgfVxuICAgIGlmICh1cmkubGVuZ3RoID4gOCAqIDEwMjQpIHtcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdBVFVSSSBpcyBmYXIgdG9vIGxvbmcnKTtcbiAgICB9XG59O1xuZXhwb3J0cy5lbnN1cmVWYWxpZEF0VXJpUmVnZXggPSBlbnN1cmVWYWxpZEF0VXJpUmVnZXg7XG4vLyMgc291cmNlTWFwcGluZ1VSTD1hdHVyaV92YWxpZGF0aW9uLmpzLm1hcCIsIlwidXNlIHN0cmljdFwiO1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xuZXhwb3J0cy5JbnZhbGlkRGF0ZXRpbWVFcnJvciA9IGV4cG9ydHMubm9ybWFsaXplRGF0ZXRpbWVBbHdheXMgPSBleHBvcnRzLm5vcm1hbGl6ZURhdGV0aW1lID0gZXhwb3J0cy5pc1ZhbGlkRGF0ZXRpbWUgPSBleHBvcnRzLmVuc3VyZVZhbGlkRGF0ZXRpbWUgPSB2b2lkIDA7XG4vKiBWYWxpZGF0ZXMgZGF0ZXRpbWUgc3RyaW5nIGFnYWluc3QgYXRwcm90byBMZXhpY29uICdkYXRldGltZScgZm9ybWF0LlxuICogU3ludGF4IGlzIGRlc2NyaWJlZCBhdDogaHR0cHM6Ly9hdHByb3RvLmNvbS9zcGVjcy9sZXhpY29uI2RhdGV0aW1lXG4gKi9cbmNvbnN0IGVuc3VyZVZhbGlkRGF0ZXRpbWUgPSAoZHRTdHIpID0+IHtcbiAgICBjb25zdCBkYXRlID0gbmV3IERhdGUoZHRTdHIpO1xuICAgIC8vIG11c3QgcGFyc2UgYXMgSVNPIDg2MDE7IHRoaXMgYWxzbyB2ZXJpZmllcyBzZW1hbnRpY3MgbGlrZSBtb250aCBpcyBub3QgMTMgb3IgMDBcbiAgICBpZiAoaXNOYU4oZGF0ZS5nZXRUaW1lKCkpKSB7XG4gICAgICAgIHRocm93IG5ldyBJbnZhbGlkRGF0ZXRpbWVFcnJvcignZGF0ZXRpbWUgZGlkIG5vdCBwYXJzZSBhcyBJU08gODYwMScpO1xuICAgIH1cbiAgICBpZiAoZGF0ZS50b0lTT1N0cmluZygpLnN0YXJ0c1dpdGgoJy0nKSkge1xuICAgICAgICB0aHJvdyBuZXcgSW52YWxpZERhdGV0aW1lRXJyb3IoJ2RhdGV0aW1lIG5vcm1hbGl6ZWQgdG8gYSBuZWdhdGl2ZSB0aW1lJyk7XG4gICAgfVxuICAgIC8vIHJlZ2V4IGFuZCBvdGhlciBjaGVja3MgZm9yIFJGQy0zMzM5XG4gICAgaWYgKCEvXlswLTldezR9LVswMV1bMC05XS1bMC0zXVswLTldVFswLTJdWzAtOV06WzAtNl1bMC05XTpbMC02XVswLTldKC5bMC05XXsxLDIwfSk/KFp8KFsrLV1bMC0yXVswLTldOlswLTVdWzAtOV0pKSQvLnRlc3QoZHRTdHIpKSB7XG4gICAgICAgIHRocm93IG5ldyBJbnZhbGlkRGF0ZXRpbWVFcnJvcihcImRhdGV0aW1lIGRpZG4ndCB2YWxpZGF0ZSB2aWEgcmVnZXhcIik7XG4gICAgfVxuICAgIGlmIChkdFN0ci5sZW5ndGggPiA2NCkge1xuICAgICAgICB0aHJvdyBuZXcgSW52YWxpZERhdGV0aW1lRXJyb3IoJ2RhdGV0aW1lIGlzIHRvbyBsb25nICg2NCBjaGFycyBtYXgpJyk7XG4gICAgfVxuICAgIGlmIChkdFN0ci5lbmRzV2l0aCgnLTAwOjAwJykpIHtcbiAgICAgICAgdGhyb3cgbmV3IEludmFsaWREYXRldGltZUVycm9yKCdkYXRldGltZSBjYW4gbm90IHVzZSBcIi0wMDowMFwiIGZvciBVVEMgdGltZXpvbmUnKTtcbiAgICB9XG4gICAgaWYgKGR0U3RyLnN0YXJ0c1dpdGgoJzAwMCcpKSB7XG4gICAgICAgIHRocm93IG5ldyBJbnZhbGlkRGF0ZXRpbWVFcnJvcignZGF0ZXRpbWUgc28gY2xvc2UgdG8geWVhciB6ZXJvIG5vdCBhbGxvd2VkJyk7XG4gICAgfVxufTtcbmV4cG9ydHMuZW5zdXJlVmFsaWREYXRldGltZSA9IGVuc3VyZVZhbGlkRGF0ZXRpbWU7XG4vKiBTYW1lIGxvZ2ljIGFzIGVuc3VyZVZhbGlkRGF0ZXRpbWUoKSwgYnV0IHJldHVybnMgYSBib29sZWFuIGluc3RlYWQgb2YgdGhyb3dpbmcgYW4gZXhjZXB0aW9uLlxuICovXG5jb25zdCBpc1ZhbGlkRGF0ZXRpbWUgPSAoZHRTdHIpID0+IHtcbiAgICB0cnkge1xuICAgICAgICAoMCwgZXhwb3J0cy5lbnN1cmVWYWxpZERhdGV0aW1lKShkdFN0cik7XG4gICAgfVxuICAgIGNhdGNoIChlcnIpIHtcbiAgICAgICAgaWYgKGVyciBpbnN0YW5jZW9mIEludmFsaWREYXRldGltZUVycm9yKSB7XG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgIH1cbiAgICAgICAgdGhyb3cgZXJyO1xuICAgIH1cbiAgICByZXR1cm4gdHJ1ZTtcbn07XG5leHBvcnRzLmlzVmFsaWREYXRldGltZSA9IGlzVmFsaWREYXRldGltZTtcbi8qIFRha2VzIGEgZmxleGlibGUgZGF0ZXRpbWUgc3RyaW5nIGFuZCBub3JtYWxpemVzIHJlcHJlc2VudGF0aW9uLlxuICpcbiAqIFRoaXMgZnVuY3Rpb24gd2lsbCB3b3JrIHdpdGggYW55IHZhbGlkIGF0cHJvdG8gZGF0ZXRpbWUgKGVnLCBhbnl0aGluZyB3aGljaCBpc1ZhbGlkRGF0ZXRpbWUoKSBpcyB0cnVlIGZvcikuIEl0ICphZGRpdGlvbmFsbHkqIGlzIG1vcmUgZmxleGlibGUgYWJvdXQgYWNjZXB0aW5nIGRhdGV0aW1lcyB0aGF0IGRvbid0IGNvbXBseSB0byBSRkMgMzMzOSwgb3IgYXJlIG1pc3NpbmcgdGltZXpvbmUgaW5mb3JtYXRpb24sIGFuZCBub3JtYWxpemluZyB0aGVtIHRvIGEgdmFsaWQgZGF0ZXRpbWUuXG4gKlxuICogT25lIHVzZS1jYXNlIGlzIGEgY29uc2lzdGVudCwgc29ydGFibGUgc3RyaW5nLiBBbm90aGVyIGlzIHRvIHdvcmsgd2l0aCBvbGRlciBpbnZhbGlkIGNyZWF0ZWRBdCBkYXRldGltZXMuXG4gKlxuICogU3VjY2Vzc2Z1bCBvdXRwdXQgd2lsbCBiZSBhIHZhbGlkIGF0cHJvdG8gZGF0ZXRpbWUgd2l0aCBtaWxsaXNlY29uZCBwcmVjaXNpb24gKDMgc3ViLXNlY29uZCBkaWdpdHMpIGFuZCBVVEMgdGltZXpvbmUgd2l0aCB0cmFpbGluZyAnWicgc3ludGF4LiBUaHJvd3MgYEludmFsaWREYXRldGltZUVycm9yYCBpZiB0aGUgaW5wdXQgc3RyaW5nIGNvdWxkIG5vdCBiZSBwYXJzZWQgYXMgYSBkYXRldGltZSwgZXZlbiB3aXRoIHBlcm1pc3NpdmUgcGFyc2luZy5cbiAqXG4gKiBFeHBlY3RlZCBvdXRwdXQgZm9ybWF0OiBZWVlZLU1NLUREVEhIOm1tOnNzLnNzc1pcbiAqL1xuY29uc3Qgbm9ybWFsaXplRGF0ZXRpbWUgPSAoZHRTdHIpID0+IHtcbiAgICBpZiAoKDAsIGV4cG9ydHMuaXNWYWxpZERhdGV0aW1lKShkdFN0cikpIHtcbiAgICAgICAgY29uc3Qgb3V0U3RyID0gbmV3IERhdGUoZHRTdHIpLnRvSVNPU3RyaW5nKCk7XG4gICAgICAgIGlmICgoMCwgZXhwb3J0cy5pc1ZhbGlkRGF0ZXRpbWUpKG91dFN0cikpIHtcbiAgICAgICAgICAgIHJldHVybiBvdXRTdHI7XG4gICAgICAgIH1cbiAgICB9XG4gICAgLy8gY2hlY2sgaWYgdGhpcyBwZXJtaXNzaXZlIGRhdGV0aW1lIGlzIG1pc3NpbmcgYSB0aW1lem9uZVxuICAgIGlmICghLy4qKChbKy1dXFxkXFxkOj9cXGRcXGQpfFthLXpBLVpdKSQvLnRlc3QoZHRTdHIpKSB7XG4gICAgICAgIGNvbnN0IGRhdGUgPSBuZXcgRGF0ZShkdFN0ciArICdaJyk7XG4gICAgICAgIGlmICghaXNOYU4oZGF0ZS5nZXRUaW1lKCkpKSB7XG4gICAgICAgICAgICBjb25zdCB0elN0ciA9IGRhdGUudG9JU09TdHJpbmcoKTtcbiAgICAgICAgICAgIGlmICgoMCwgZXhwb3J0cy5pc1ZhbGlkRGF0ZXRpbWUpKHR6U3RyKSkge1xuICAgICAgICAgICAgICAgIHJldHVybiB0elN0cjtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cbiAgICAvLyBmaW5hbGx5IHRyeSBwYXJzaW5nIGFzIHNpbXBsZSBkYXRldGltZVxuICAgIGNvbnN0IGRhdGUgPSBuZXcgRGF0ZShkdFN0cik7XG4gICAgaWYgKGlzTmFOKGRhdGUuZ2V0VGltZSgpKSkge1xuICAgICAgICB0aHJvdyBuZXcgSW52YWxpZERhdGV0aW1lRXJyb3IoJ2RhdGV0aW1lIGRpZCBub3QgcGFyc2UgYXMgYW55IHRpbWVzdGFtcCBmb3JtYXQnKTtcbiAgICB9XG4gICAgY29uc3QgaXNvU3RyID0gZGF0ZS50b0lTT1N0cmluZygpO1xuICAgIGlmICgoMCwgZXhwb3J0cy5pc1ZhbGlkRGF0ZXRpbWUpKGlzb1N0cikpIHtcbiAgICAgICAgcmV0dXJuIGlzb1N0cjtcbiAgICB9XG4gICAgZWxzZSB7XG4gICAgICAgIHRocm93IG5ldyBJbnZhbGlkRGF0ZXRpbWVFcnJvcignZGF0ZXRpbWUgbm9ybWFsaXplZCB0byBpbnZhbGlkIHRpbWVzdGFtcCBzdHJpbmcnKTtcbiAgICB9XG59O1xuZXhwb3J0cy5ub3JtYWxpemVEYXRldGltZSA9IG5vcm1hbGl6ZURhdGV0aW1lO1xuLyogVmFyaWFudCBvZiBub3JtYWxpemVEYXRldGltZSgpIHdoaWNoIGFsd2F5cyByZXR1cm5zIGEgdmFsaWQgZGF0ZXRpbWUgc3RyaW5ncy5cbiAqXG4gKiBJZiBhIEludmFsaWREYXRldGltZUVycm9yIGlzIGVuY291bnRlcmVkLCByZXR1cm5zIHRoZSBVTklYIGVwb2NoIHRpbWUgYXMgYSBVVEMgZGF0ZXRpbWUgKDE5NzAtMDEtMDFUMDA6MDA6MDAuMDAwWikuXG4gKi9cbmNvbnN0IG5vcm1hbGl6ZURhdGV0aW1lQWx3YXlzID0gKGR0U3RyKSA9PiB7XG4gICAgdHJ5IHtcbiAgICAgICAgcmV0dXJuICgwLCBleHBvcnRzLm5vcm1hbGl6ZURhdGV0aW1lKShkdFN0cik7XG4gICAgfVxuICAgIGNhdGNoIChlcnIpIHtcbiAgICAgICAgaWYgKGVyciBpbnN0YW5jZW9mIEludmFsaWREYXRldGltZUVycm9yKSB7XG4gICAgICAgICAgICByZXR1cm4gbmV3IERhdGUoMCkudG9JU09TdHJpbmcoKTtcbiAgICAgICAgfVxuICAgICAgICB0aHJvdyBlcnI7XG4gICAgfVxufTtcbmV4cG9ydHMubm9ybWFsaXplRGF0ZXRpbWVBbHdheXMgPSBub3JtYWxpemVEYXRldGltZUFsd2F5cztcbi8qIEluZGljYXRlcyBhIGRhdGV0aW1lIHN0cmluZyBkaWQgbm90IHBhc3MgZnVsbCBhdHByb3RvIExleGljb24gZGF0ZXRpbWUgc3RyaW5nIGZvcm1hdCBjaGVja3MuXG4gKi9cbmNsYXNzIEludmFsaWREYXRldGltZUVycm9yIGV4dGVuZHMgRXJyb3Ige1xufVxuZXhwb3J0cy5JbnZhbGlkRGF0ZXRpbWVFcnJvciA9IEludmFsaWREYXRldGltZUVycm9yO1xuLy8jIHNvdXJjZU1hcHBpbmdVUkw9ZGF0ZXRpbWUuanMubWFwIiwiXCJ1c2Ugc3RyaWN0XCI7XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XG5leHBvcnRzLkludmFsaWREaWRFcnJvciA9IGV4cG9ydHMuZW5zdXJlVmFsaWREaWRSZWdleCA9IGV4cG9ydHMuZW5zdXJlVmFsaWREaWQgPSB2b2lkIDA7XG4vLyBIdW1hbi1yZWFkYWJsZSBjb25zdHJhaW50czpcbi8vICAgLSB2YWxpZCBXM0MgRElEIChodHRwczovL3d3dy53My5vcmcvVFIvZGlkLWNvcmUvI2RpZC1zeW50YXgpXG4vLyAgICAgIC0gZW50aXJlIFVSSSBpcyBBU0NJSTogW2EtekEtWjAtOS5fOiUtXVxuLy8gICAgICAtIGFsd2F5cyBzdGFydHMgXCJkaWQ6XCIgKGxvd2VyLWNhc2UpXG4vLyAgICAgIC0gbWV0aG9kIG5hbWUgaXMgb25lIG9yIG1vcmUgbG93ZXItY2FzZSBsZXR0ZXJzLCBmb2xsb3dlZCBieSBcIjpcIlxuLy8gICAgICAtIHJlbWFpbmluZyBpZGVudGlmaWVyIGNhbiBoYXZlIGFueSBvZiB0aGUgYWJvdmUgY2hhcnMsIGJ1dCBjYW4gbm90IGVuZCBpbiBcIjpcIlxuLy8gICAgICAtIGl0IHNlZW1zIHRoYXQgYSBidW5jaCBvZiBcIjpcIiBjYW4gYmUgaW5jbHVkZWQsIGFuZCBkb24ndCBuZWVkIHNwYWNlcyBiZXR3ZWVuXG4vLyAgICAgIC0gXCIlXCIgaXMgdXNlZCBvbmx5IGZvciBcInBlcmNlbnQgZW5jb2RpbmdcIiBhbmQgbXVzdCBiZSBmb2xsb3dlZCBieSB0d28gaGV4IGNoYXJhY3RlcnMgKGFuZCB0aHVzIGNhbid0IGVuZCBpbiBcIiVcIilcbi8vICAgICAgLSBxdWVyeSAoXCI/XCIpIGFuZCBmcmFnbWVudCAoXCIjXCIpIHN0dWZmIGlzIGRlZmluZWQgZm9yIFwiRElEIFVSSXNcIiwgYnV0IG5vdCBhcyBwYXJ0IG9mIGlkZW50aWZpZXIgaXRzZWxmXG4vLyAgICAgIC0gXCJUaGUgY3VycmVudCBzcGVjaWZpY2F0aW9uIGRvZXMgbm90IHRha2UgYSBwb3NpdGlvbiBvbiB0aGUgbWF4aW11bSBsZW5ndGggb2YgYSBESURcIlxuLy8gICAtIGluIGN1cnJlbnQgYXRwcm90bywgb25seSBhbGxvd2luZyBkaWQ6cGxjIGFuZCBkaWQ6d2ViLiBCdXQgbm90ICpmb3JjaW5nKiB0aGlzIGF0IGxleGljb24gbGF5ZXJcbi8vICAgLSBoYXJkIGxlbmd0aCBsaW1pdCBvZiA4S0J5dGVzXG4vLyAgIC0gbm90IGdvaW5nIHRvIHZhbGlkYXRlIFwicGVyY2VudCBlbmNvZGluZ1wiIGhlcmVcbmNvbnN0IGVuc3VyZVZhbGlkRGlkID0gKGRpZCkgPT4ge1xuICAgIGlmICghZGlkLnN0YXJ0c1dpdGgoJ2RpZDonKSkge1xuICAgICAgICB0aHJvdyBuZXcgSW52YWxpZERpZEVycm9yKCdESUQgcmVxdWlyZXMgXCJkaWQ6XCIgcHJlZml4Jyk7XG4gICAgfVxuICAgIC8vIGNoZWNrIHRoYXQgYWxsIGNoYXJzIGFyZSBib3JpbmcgQVNDSUlcbiAgICBpZiAoIS9eW2EtekEtWjAtOS5fOiUtXSokLy50ZXN0KGRpZCkpIHtcbiAgICAgICAgdGhyb3cgbmV3IEludmFsaWREaWRFcnJvcignRGlzYWxsb3dlZCBjaGFyYWN0ZXJzIGluIERJRCAoQVNDSUkgbGV0dGVycywgZGlnaXRzLCBhbmQgYSBjb3VwbGUgb3RoZXIgY2hhcmFjdGVycyBvbmx5KScpO1xuICAgIH1cbiAgICBjb25zdCB7IGxlbmd0aCwgMTogbWV0aG9kIH0gPSBkaWQuc3BsaXQoJzonKTtcbiAgICBpZiAobGVuZ3RoIDwgMykge1xuICAgICAgICB0aHJvdyBuZXcgSW52YWxpZERpZEVycm9yKCdESUQgcmVxdWlyZXMgcHJlZml4LCBtZXRob2QsIGFuZCBtZXRob2Qtc3BlY2lmaWMgY29udGVudCcpO1xuICAgIH1cbiAgICBpZiAoIS9eW2Etel0rJC8udGVzdChtZXRob2QpKSB7XG4gICAgICAgIHRocm93IG5ldyBJbnZhbGlkRGlkRXJyb3IoJ0RJRCBtZXRob2QgbXVzdCBiZSBsb3dlci1jYXNlIGxldHRlcnMnKTtcbiAgICB9XG4gICAgaWYgKGRpZC5lbmRzV2l0aCgnOicpIHx8IGRpZC5lbmRzV2l0aCgnJScpKSB7XG4gICAgICAgIHRocm93IG5ldyBJbnZhbGlkRGlkRXJyb3IoJ0RJRCBjYW4gbm90IGVuZCB3aXRoIFwiOlwiIG9yIFwiJVwiJyk7XG4gICAgfVxuICAgIGlmIChkaWQubGVuZ3RoID4gMiAqIDEwMjQpIHtcbiAgICAgICAgdGhyb3cgbmV3IEludmFsaWREaWRFcnJvcignRElEIGlzIHRvbyBsb25nICgyMDQ4IGNoYXJzIG1heCknKTtcbiAgICB9XG59O1xuZXhwb3J0cy5lbnN1cmVWYWxpZERpZCA9IGVuc3VyZVZhbGlkRGlkO1xuY29uc3QgZW5zdXJlVmFsaWREaWRSZWdleCA9IChkaWQpID0+IHtcbiAgICAvLyBzaW1wbGUgcmVnZXggdG8gZW5mb3JjZSBtb3N0IGNvbnN0cmFpbnRzIHZpYSBqdXN0IHJlZ2V4IGFuZCBsZW5ndGguXG4gICAgLy8gaGFuZCB3cm90ZSB0aGlzIHJlZ2V4IGJhc2VkIG9uIGFib3ZlIGNvbnN0cmFpbnRzXG4gICAgaWYgKCEvXmRpZDpbYS16XSs6W2EtekEtWjAtOS5fOiUtXSpbYS16QS1aMC05Ll8tXSQvLnRlc3QoZGlkKSkge1xuICAgICAgICB0aHJvdyBuZXcgSW52YWxpZERpZEVycm9yKFwiRElEIGRpZG4ndCB2YWxpZGF0ZSB2aWEgcmVnZXhcIik7XG4gICAgfVxuICAgIGlmIChkaWQubGVuZ3RoID4gMiAqIDEwMjQpIHtcbiAgICAgICAgdGhyb3cgbmV3IEludmFsaWREaWRFcnJvcignRElEIGlzIHRvbyBsb25nICgyMDQ4IGNoYXJzIG1heCknKTtcbiAgICB9XG59O1xuZXhwb3J0cy5lbnN1cmVWYWxpZERpZFJlZ2V4ID0gZW5zdXJlVmFsaWREaWRSZWdleDtcbmNsYXNzIEludmFsaWREaWRFcnJvciBleHRlbmRzIEVycm9yIHtcbn1cbmV4cG9ydHMuSW52YWxpZERpZEVycm9yID0gSW52YWxpZERpZEVycm9yO1xuLy8jIHNvdXJjZU1hcHBpbmdVUkw9ZGlkLmpzLm1hcCIsIlwidXNlIHN0cmljdFwiO1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xuZXhwb3J0cy5EaXNhbGxvd2VkRG9tYWluRXJyb3IgPSBleHBvcnRzLlVuc3VwcG9ydGVkRG9tYWluRXJyb3IgPSBleHBvcnRzLlJlc2VydmVkSGFuZGxlRXJyb3IgPSBleHBvcnRzLkludmFsaWRIYW5kbGVFcnJvciA9IGV4cG9ydHMuaXNWYWxpZFRsZCA9IGV4cG9ydHMuaXNWYWxpZEhhbmRsZSA9IGV4cG9ydHMubm9ybWFsaXplQW5kRW5zdXJlVmFsaWRIYW5kbGUgPSBleHBvcnRzLm5vcm1hbGl6ZUhhbmRsZSA9IGV4cG9ydHMuZW5zdXJlVmFsaWRIYW5kbGVSZWdleCA9IGV4cG9ydHMuZW5zdXJlVmFsaWRIYW5kbGUgPSBleHBvcnRzLkRJU0FMTE9XRURfVExEUyA9IGV4cG9ydHMuSU5WQUxJRF9IQU5ETEUgPSB2b2lkIDA7XG5leHBvcnRzLklOVkFMSURfSEFORExFID0gJ2hhbmRsZS5pbnZhbGlkJztcbi8vIEN1cnJlbnRseSB0aGVzZSBhcmUgcmVnaXN0cmF0aW9uLXRpbWUgcmVzdHJpY3Rpb25zLCBub3QgcHJvdG9jb2wtbGV2ZWxcbi8vIHJlc3RyaWN0aW9ucy4gV2UgaGF2ZSBhIGNvdXBsZSBhY2NvdW50cyBpbiB0aGUgd2lsZCB0aGF0IHdlIG5lZWQgdG8gY2xlYW4gdXBcbi8vIGJlZm9yZSBoYXJkLWRpc2FsbG93LlxuLy8gU2VlIGFsc286IGh0dHBzOi8vZW4ud2lraXBlZGlhLm9yZy93aWtpL1RvcC1sZXZlbF9kb21haW4jUmVzZXJ2ZWRfZG9tYWluc1xuZXhwb3J0cy5ESVNBTExPV0VEX1RMRFMgPSBbXG4gICAgJy5sb2NhbCcsXG4gICAgJy5hcnBhJyxcbiAgICAnLmludmFsaWQnLFxuICAgICcubG9jYWxob3N0JyxcbiAgICAnLmludGVybmFsJyxcbiAgICAnLmV4YW1wbGUnLFxuICAgICcuYWx0JyxcbiAgICAvLyBwb2xpY3kgY291bGQgY29uY2lldmFibHkgY2hhbmdlIG9uIFwiLm9uaW9uXCIgc29tZSBkYXlcbiAgICAnLm9uaW9uJyxcbiAgICAvLyBOT1RFOiAudGVzdCBpcyBhbGxvd2VkIGluIHRlc3RpbmcgYW5kIGRldm9wbWVudC4gSW4gcHJhY3RpY2FsIHRlcm1zXG4gICAgLy8gXCJzaG91bGRcIiBcIm5ldmVyXCIgYWN0dWFsbHkgcmVzb2x2ZSBhbmQgZ2V0IHJlZ2lzdGVyZWQgaW4gcHJvZHVjdGlvblxuXTtcbi8vIEhhbmRsZSBjb25zdHJhaW50cywgaW4gRW5nbGlzaDpcbi8vICAtIG11c3QgYmUgYSBwb3NzaWJsZSBkb21haW4gbmFtZVxuLy8gICAgLSBSRkMtMTAzNSBpcyBjb21tb25seSByZWZlcmVuY2VkLCBidXQgaGFzIGJlZW4gdXBkYXRlZC4gZWcsIFJGQy0zNjk2LFxuLy8gICAgICBzZWN0aW9uIDIuIGFuZCBSRkMtMzk4Niwgc2VjdGlvbiAzLiBjYW4gbm93IGhhdmUgbGVhZGluZyBudW1iZXJzIChlZyxcbi8vICAgICAgNGNoYW4ub3JnKVxuLy8gICAgLSBcImxhYmVsc1wiIChzdWItbmFtZXMpIGFyZSBtYWRlIG9mIEFTQ0lJIGxldHRlcnMsIGRpZ2l0cywgaHlwaGVuc1xuLy8gICAgLSBjYW4gbm90IHN0YXJ0IG9yIGVuZCB3aXRoIGEgaHlwaGVuXG4vLyAgICAtIFRMRCAobGFzdCBjb21wb25lbnQpIHNob3VsZCBub3Qgc3RhcnQgd2l0aCBhIGRpZ2l0XG4vLyAgICAtIGNhbid0IGVuZCB3aXRoIGEgaHlwaGVuIChjYW4gZW5kIHdpdGggZGlnaXQpXG4vLyAgICAtIGVhY2ggc2VnbWVudCBtdXN0IGJlIGJldHdlZW4gMSBhbmQgNjMgY2hhcmFjdGVycyAobm90IGluY2x1ZGluZyBhbnkgcGVyaW9kcylcbi8vICAgIC0gb3ZlcmFsbCBsZW5ndGggY2FuJ3QgYmUgbW9yZSB0aGFuIDI1MyBjaGFyYWN0ZXJzXG4vLyAgICAtIHNlcGFyYXRlZCBieSAoQVNDSUkpIHBlcmlvZHM7IGRvZXMgbm90IHN0YXJ0IG9yIGVuZCB3aXRoIHBlcmlvZFxuLy8gICAgLSBjYXNlIGluc2Vuc2l0aXZlXG4vLyAgICAtIGRvbWFpbnMgKGhhbmRsZXMpIGFyZSBlcXVhbCBpZiB0aGV5IGFyZSB0aGUgc2FtZSBsb3dlci1jYXNlXG4vLyAgICAtIHB1bnljb2RlIGFsbG93ZWQgZm9yIGludGVybmF0aW9uYWxpemF0aW9uXG4vLyAgLSBubyB3aGl0ZXNwYWNlLCBudWxsIGJ5dGVzLCBqb2luaW5nIGNoYXJzLCBldGNcbi8vICAtIGRvZXMgbm90IHZhbGlkYXRlIHdoZXRoZXIgZG9tYWluIG9yIFRMRCBleGlzdHMsIG9yIGlzIGEgcmVzZXJ2ZWQgb3Jcbi8vICAgIHNwZWNpYWwgVExEIChlZywgLm9uaW9uIG9yIC5sb2NhbClcbi8vICAtIGRvZXMgbm90IHZhbGlkYXRlIHB1bnljb2RlXG5jb25zdCBlbnN1cmVWYWxpZEhhbmRsZSA9IChoYW5kbGUpID0+IHtcbiAgICAvLyBjaGVjayB0aGF0IGFsbCBjaGFycyBhcmUgYm9yaW5nIEFTQ0lJXG4gICAgaWYgKCEvXlthLXpBLVowLTkuLV0qJC8udGVzdChoYW5kbGUpKSB7XG4gICAgICAgIHRocm93IG5ldyBJbnZhbGlkSGFuZGxlRXJyb3IoJ0Rpc2FsbG93ZWQgY2hhcmFjdGVycyBpbiBoYW5kbGUgKEFTQ0lJIGxldHRlcnMsIGRpZ2l0cywgZGFzaGVzLCBwZXJpb2RzIG9ubHkpJyk7XG4gICAgfVxuICAgIGlmIChoYW5kbGUubGVuZ3RoID4gMjUzKSB7XG4gICAgICAgIHRocm93IG5ldyBJbnZhbGlkSGFuZGxlRXJyb3IoJ0hhbmRsZSBpcyB0b28gbG9uZyAoMjUzIGNoYXJzIG1heCknKTtcbiAgICB9XG4gICAgY29uc3QgbGFiZWxzID0gaGFuZGxlLnNwbGl0KCcuJyk7XG4gICAgaWYgKGxhYmVscy5sZW5ndGggPCAyKSB7XG4gICAgICAgIHRocm93IG5ldyBJbnZhbGlkSGFuZGxlRXJyb3IoJ0hhbmRsZSBkb21haW4gbmVlZHMgYXQgbGVhc3QgdHdvIHBhcnRzJyk7XG4gICAgfVxuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgbGFiZWxzLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgIGNvbnN0IGwgPSBsYWJlbHNbaV07XG4gICAgICAgIGlmIChsLmxlbmd0aCA8IDEpIHtcbiAgICAgICAgICAgIHRocm93IG5ldyBJbnZhbGlkSGFuZGxlRXJyb3IoJ0hhbmRsZSBwYXJ0cyBjYW4gbm90IGJlIGVtcHR5Jyk7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKGwubGVuZ3RoID4gNjMpIHtcbiAgICAgICAgICAgIHRocm93IG5ldyBJbnZhbGlkSGFuZGxlRXJyb3IoJ0hhbmRsZSBwYXJ0IHRvbyBsb25nIChtYXggNjMgY2hhcnMpJyk7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKGwuZW5kc1dpdGgoJy0nKSB8fCBsLnN0YXJ0c1dpdGgoJy0nKSkge1xuICAgICAgICAgICAgdGhyb3cgbmV3IEludmFsaWRIYW5kbGVFcnJvcignSGFuZGxlIHBhcnRzIGNhbiBub3Qgc3RhcnQgb3IgZW5kIHdpdGggaHlwaGVucycpO1xuICAgICAgICB9XG4gICAgICAgIGlmIChpICsgMSA9PT0gbGFiZWxzLmxlbmd0aCAmJiAhL15bYS16QS1aXS8udGVzdChsKSkge1xuICAgICAgICAgICAgdGhyb3cgbmV3IEludmFsaWRIYW5kbGVFcnJvcignSGFuZGxlIGZpbmFsIGNvbXBvbmVudCAoVExEKSBtdXN0IHN0YXJ0IHdpdGggQVNDSUkgbGV0dGVyJyk7XG4gICAgICAgIH1cbiAgICB9XG59O1xuZXhwb3J0cy5lbnN1cmVWYWxpZEhhbmRsZSA9IGVuc3VyZVZhbGlkSGFuZGxlO1xuLy8gc2ltcGxlIHJlZ2V4IHRyYW5zbGF0aW9uIG9mIGFib3ZlIGNvbnN0cmFpbnRzXG5jb25zdCBlbnN1cmVWYWxpZEhhbmRsZVJlZ2V4ID0gKGhhbmRsZSkgPT4ge1xuICAgIGlmICghL14oW2EtekEtWjAtOV0oW2EtekEtWjAtOS1dezAsNjF9W2EtekEtWjAtOV0pP1xcLikrW2EtekEtWl0oW2EtekEtWjAtOS1dezAsNjF9W2EtekEtWjAtOV0pPyQvLnRlc3QoaGFuZGxlKSkge1xuICAgICAgICB0aHJvdyBuZXcgSW52YWxpZEhhbmRsZUVycm9yKFwiSGFuZGxlIGRpZG4ndCB2YWxpZGF0ZSB2aWEgcmVnZXhcIik7XG4gICAgfVxuICAgIGlmIChoYW5kbGUubGVuZ3RoID4gMjUzKSB7XG4gICAgICAgIHRocm93IG5ldyBJbnZhbGlkSGFuZGxlRXJyb3IoJ0hhbmRsZSBpcyB0b28gbG9uZyAoMjUzIGNoYXJzIG1heCknKTtcbiAgICB9XG59O1xuZXhwb3J0cy5lbnN1cmVWYWxpZEhhbmRsZVJlZ2V4ID0gZW5zdXJlVmFsaWRIYW5kbGVSZWdleDtcbmNvbnN0IG5vcm1hbGl6ZUhhbmRsZSA9IChoYW5kbGUpID0+IHtcbiAgICByZXR1cm4gaGFuZGxlLnRvTG93ZXJDYXNlKCk7XG59O1xuZXhwb3J0cy5ub3JtYWxpemVIYW5kbGUgPSBub3JtYWxpemVIYW5kbGU7XG5jb25zdCBub3JtYWxpemVBbmRFbnN1cmVWYWxpZEhhbmRsZSA9IChoYW5kbGUpID0+IHtcbiAgICBjb25zdCBub3JtYWxpemVkID0gKDAsIGV4cG9ydHMubm9ybWFsaXplSGFuZGxlKShoYW5kbGUpO1xuICAgICgwLCBleHBvcnRzLmVuc3VyZVZhbGlkSGFuZGxlKShub3JtYWxpemVkKTtcbiAgICByZXR1cm4gbm9ybWFsaXplZDtcbn07XG5leHBvcnRzLm5vcm1hbGl6ZUFuZEVuc3VyZVZhbGlkSGFuZGxlID0gbm9ybWFsaXplQW5kRW5zdXJlVmFsaWRIYW5kbGU7XG5jb25zdCBpc1ZhbGlkSGFuZGxlID0gKGhhbmRsZSkgPT4ge1xuICAgIHRyeSB7XG4gICAgICAgICgwLCBleHBvcnRzLmVuc3VyZVZhbGlkSGFuZGxlKShoYW5kbGUpO1xuICAgIH1cbiAgICBjYXRjaCAoZXJyKSB7XG4gICAgICAgIGlmIChlcnIgaW5zdGFuY2VvZiBJbnZhbGlkSGFuZGxlRXJyb3IpIHtcbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgfVxuICAgICAgICB0aHJvdyBlcnI7XG4gICAgfVxuICAgIHJldHVybiB0cnVlO1xufTtcbmV4cG9ydHMuaXNWYWxpZEhhbmRsZSA9IGlzVmFsaWRIYW5kbGU7XG5jb25zdCBpc1ZhbGlkVGxkID0gKGhhbmRsZSkgPT4ge1xuICAgIHJldHVybiAhZXhwb3J0cy5ESVNBTExPV0VEX1RMRFMuc29tZSgoZG9tYWluKSA9PiBoYW5kbGUuZW5kc1dpdGgoZG9tYWluKSk7XG59O1xuZXhwb3J0cy5pc1ZhbGlkVGxkID0gaXNWYWxpZFRsZDtcbmNsYXNzIEludmFsaWRIYW5kbGVFcnJvciBleHRlbmRzIEVycm9yIHtcbn1cbmV4cG9ydHMuSW52YWxpZEhhbmRsZUVycm9yID0gSW52YWxpZEhhbmRsZUVycm9yO1xuY2xhc3MgUmVzZXJ2ZWRIYW5kbGVFcnJvciBleHRlbmRzIEVycm9yIHtcbn1cbmV4cG9ydHMuUmVzZXJ2ZWRIYW5kbGVFcnJvciA9IFJlc2VydmVkSGFuZGxlRXJyb3I7XG5jbGFzcyBVbnN1cHBvcnRlZERvbWFpbkVycm9yIGV4dGVuZHMgRXJyb3Ige1xufVxuZXhwb3J0cy5VbnN1cHBvcnRlZERvbWFpbkVycm9yID0gVW5zdXBwb3J0ZWREb21haW5FcnJvcjtcbmNsYXNzIERpc2FsbG93ZWREb21haW5FcnJvciBleHRlbmRzIEVycm9yIHtcbn1cbmV4cG9ydHMuRGlzYWxsb3dlZERvbWFpbkVycm9yID0gRGlzYWxsb3dlZERvbWFpbkVycm9yO1xuLy8jIHNvdXJjZU1hcHBpbmdVUkw9aGFuZGxlLmpzLm1hcCIsIlwidXNlIHN0cmljdFwiO1xudmFyIF9fY3JlYXRlQmluZGluZyA9ICh0aGlzICYmIHRoaXMuX19jcmVhdGVCaW5kaW5nKSB8fCAoT2JqZWN0LmNyZWF0ZSA/IChmdW5jdGlvbihvLCBtLCBrLCBrMikge1xuICAgIGlmIChrMiA9PT0gdW5kZWZpbmVkKSBrMiA9IGs7XG4gICAgdmFyIGRlc2MgPSBPYmplY3QuZ2V0T3duUHJvcGVydHlEZXNjcmlwdG9yKG0sIGspO1xuICAgIGlmICghZGVzYyB8fCAoXCJnZXRcIiBpbiBkZXNjID8gIW0uX19lc01vZHVsZSA6IGRlc2Mud3JpdGFibGUgfHwgZGVzYy5jb25maWd1cmFibGUpKSB7XG4gICAgICBkZXNjID0geyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGZ1bmN0aW9uKCkgeyByZXR1cm4gbVtrXTsgfSB9O1xuICAgIH1cbiAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkobywgazIsIGRlc2MpO1xufSkgOiAoZnVuY3Rpb24obywgbSwgaywgazIpIHtcbiAgICBpZiAoazIgPT09IHVuZGVmaW5lZCkgazIgPSBrO1xuICAgIG9bazJdID0gbVtrXTtcbn0pKTtcbnZhciBfX2V4cG9ydFN0YXIgPSAodGhpcyAmJiB0aGlzLl9fZXhwb3J0U3RhcikgfHwgZnVuY3Rpb24obSwgZXhwb3J0cykge1xuICAgIGZvciAodmFyIHAgaW4gbSkgaWYgKHAgIT09IFwiZGVmYXVsdFwiICYmICFPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwoZXhwb3J0cywgcCkpIF9fY3JlYXRlQmluZGluZyhleHBvcnRzLCBtLCBwKTtcbn07XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XG5fX2V4cG9ydFN0YXIocmVxdWlyZShcIi4vaGFuZGxlXCIpLCBleHBvcnRzKTtcbl9fZXhwb3J0U3RhcihyZXF1aXJlKFwiLi9kaWRcIiksIGV4cG9ydHMpO1xuX19leHBvcnRTdGFyKHJlcXVpcmUoXCIuL25zaWRcIiksIGV4cG9ydHMpO1xuX19leHBvcnRTdGFyKHJlcXVpcmUoXCIuL2F0dXJpXCIpLCBleHBvcnRzKTtcbl9fZXhwb3J0U3RhcihyZXF1aXJlKFwiLi90aWRcIiksIGV4cG9ydHMpO1xuX19leHBvcnRTdGFyKHJlcXVpcmUoXCIuL3JlY29yZGtleVwiKSwgZXhwb3J0cyk7XG5fX2V4cG9ydFN0YXIocmVxdWlyZShcIi4vZGF0ZXRpbWVcIiksIGV4cG9ydHMpO1xuLy8jIHNvdXJjZU1hcHBpbmdVUkw9aW5kZXguanMubWFwIiwiXCJ1c2Ugc3RyaWN0XCI7XG4vKlxuR3JhbW1hcjpcblxuYWxwaGEgICAgID0gXCJhXCIgLyBcImJcIiAvIFwiY1wiIC8gXCJkXCIgLyBcImVcIiAvIFwiZlwiIC8gXCJnXCIgLyBcImhcIiAvIFwiaVwiIC8gXCJqXCIgLyBcImtcIiAvIFwibFwiIC8gXCJtXCIgLyBcIm5cIiAvIFwib1wiIC8gXCJwXCIgLyBcInFcIiAvIFwiclwiIC8gXCJzXCIgLyBcInRcIiAvIFwidVwiIC8gXCJ2XCIgLyBcIndcIiAvIFwieFwiIC8gXCJ5XCIgLyBcInpcIiAvIFwiQVwiIC8gXCJCXCIgLyBcIkNcIiAvIFwiRFwiIC8gXCJFXCIgLyBcIkZcIiAvIFwiR1wiIC8gXCJIXCIgLyBcIklcIiAvIFwiSlwiIC8gXCJLXCIgLyBcIkxcIiAvIFwiTVwiIC8gXCJOXCIgLyBcIk9cIiAvIFwiUFwiIC8gXCJRXCIgLyBcIlJcIiAvIFwiU1wiIC8gXCJUXCIgLyBcIlVcIiAvIFwiVlwiIC8gXCJXXCIgLyBcIlhcIiAvIFwiWVwiIC8gXCJaXCJcbm51bWJlciAgICA9IFwiMVwiIC8gXCIyXCIgLyBcIjNcIiAvIFwiNFwiIC8gXCI1XCIgLyBcIjZcIiAvIFwiN1wiIC8gXCI4XCIgLyBcIjlcIiAvIFwiMFwiXG5kZWxpbSAgICAgPSBcIi5cIlxuc2VnbWVudCAgID0gYWxwaGEgKiggYWxwaGEgLyBudW1iZXIgLyBcIi1cIiApXG5hdXRob3JpdHkgPSBzZWdtZW50ICooIGRlbGltIHNlZ21lbnQgKVxubmFtZSAgICAgID0gYWxwaGEgKiggYWxwaGEgKVxubnNpZCAgICAgID0gYXV0aG9yaXR5IGRlbGltIG5hbWVcblxuKi9cbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcbmV4cG9ydHMuSW52YWxpZE5zaWRFcnJvciA9IGV4cG9ydHMuZW5zdXJlVmFsaWROc2lkUmVnZXggPSBleHBvcnRzLmVuc3VyZVZhbGlkTnNpZCA9IGV4cG9ydHMuTlNJRCA9IHZvaWQgMDtcbmNsYXNzIE5TSUQge1xuICAgIHN0YXRpYyBwYXJzZShuc2lkKSB7XG4gICAgICAgIHJldHVybiBuZXcgTlNJRChuc2lkKTtcbiAgICB9XG4gICAgc3RhdGljIGNyZWF0ZShhdXRob3JpdHksIG5hbWUpIHtcbiAgICAgICAgY29uc3Qgc2VnbWVudHMgPSBbLi4uYXV0aG9yaXR5LnNwbGl0KCcuJykucmV2ZXJzZSgpLCBuYW1lXS5qb2luKCcuJyk7XG4gICAgICAgIHJldHVybiBuZXcgTlNJRChzZWdtZW50cyk7XG4gICAgfVxuICAgIHN0YXRpYyBpc1ZhbGlkKG5zaWQpIHtcbiAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgIE5TSUQucGFyc2UobnNpZCk7XG4gICAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgfVxuICAgICAgICBjYXRjaCAoZSkge1xuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICB9XG4gICAgfVxuICAgIGNvbnN0cnVjdG9yKG5zaWQpIHtcbiAgICAgICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KHRoaXMsIFwic2VnbWVudHNcIiwge1xuICAgICAgICAgICAgZW51bWVyYWJsZTogdHJ1ZSxcbiAgICAgICAgICAgIGNvbmZpZ3VyYWJsZTogdHJ1ZSxcbiAgICAgICAgICAgIHdyaXRhYmxlOiB0cnVlLFxuICAgICAgICAgICAgdmFsdWU6IFtdXG4gICAgICAgIH0pO1xuICAgICAgICAoMCwgZXhwb3J0cy5lbnN1cmVWYWxpZE5zaWQpKG5zaWQpO1xuICAgICAgICB0aGlzLnNlZ21lbnRzID0gbnNpZC5zcGxpdCgnLicpO1xuICAgIH1cbiAgICBnZXQgYXV0aG9yaXR5KCkge1xuICAgICAgICByZXR1cm4gdGhpcy5zZWdtZW50c1xuICAgICAgICAgICAgLnNsaWNlKDAsIHRoaXMuc2VnbWVudHMubGVuZ3RoIC0gMSlcbiAgICAgICAgICAgIC5yZXZlcnNlKClcbiAgICAgICAgICAgIC5qb2luKCcuJyk7XG4gICAgfVxuICAgIGdldCBuYW1lKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5zZWdtZW50cy5hdCh0aGlzLnNlZ21lbnRzLmxlbmd0aCAtIDEpO1xuICAgIH1cbiAgICB0b1N0cmluZygpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuc2VnbWVudHMuam9pbignLicpO1xuICAgIH1cbn1cbmV4cG9ydHMuTlNJRCA9IE5TSUQ7XG4vLyBIdW1hbiByZWFkYWJsZSBjb25zdHJhaW50cyBvbiBOU0lEOlxuLy8gLSBhIHZhbGlkIGRvbWFpbiBpbiByZXZlcnNlZCBub3RhdGlvblxuLy8gLSBmb2xsb3dlZCBieSBhbiBhZGRpdGlvbmFsIHBlcmlvZC1zZXBhcmF0ZWQgbmFtZSwgd2hpY2ggaXMgY2FtZWwtY2FzZSBsZXR0ZXJzXG5jb25zdCBlbnN1cmVWYWxpZE5zaWQgPSAobnNpZCkgPT4ge1xuICAgIGNvbnN0IHRvQ2hlY2sgPSBuc2lkO1xuICAgIC8vIGNoZWNrIHRoYXQgYWxsIGNoYXJzIGFyZSBib3JpbmcgQVNDSUlcbiAgICBpZiAoIS9eW2EtekEtWjAtOS4tXSokLy50ZXN0KHRvQ2hlY2spKSB7XG4gICAgICAgIHRocm93IG5ldyBJbnZhbGlkTnNpZEVycm9yKCdEaXNhbGxvd2VkIGNoYXJhY3RlcnMgaW4gTlNJRCAoQVNDSUkgbGV0dGVycywgZGlnaXRzLCBkYXNoZXMsIHBlcmlvZHMgb25seSknKTtcbiAgICB9XG4gICAgaWYgKHRvQ2hlY2subGVuZ3RoID4gMjUzICsgMSArIDYzKSB7XG4gICAgICAgIHRocm93IG5ldyBJbnZhbGlkTnNpZEVycm9yKCdOU0lEIGlzIHRvbyBsb25nICgzMTcgY2hhcnMgbWF4KScpO1xuICAgIH1cbiAgICBjb25zdCBsYWJlbHMgPSB0b0NoZWNrLnNwbGl0KCcuJyk7XG4gICAgaWYgKGxhYmVscy5sZW5ndGggPCAzKSB7XG4gICAgICAgIHRocm93IG5ldyBJbnZhbGlkTnNpZEVycm9yKCdOU0lEIG5lZWRzIGF0IGxlYXN0IHRocmVlIHBhcnRzJyk7XG4gICAgfVxuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgbGFiZWxzLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgIGNvbnN0IGwgPSBsYWJlbHNbaV07XG4gICAgICAgIGlmIChsLmxlbmd0aCA8IDEpIHtcbiAgICAgICAgICAgIHRocm93IG5ldyBJbnZhbGlkTnNpZEVycm9yKCdOU0lEIHBhcnRzIGNhbiBub3QgYmUgZW1wdHknKTtcbiAgICAgICAgfVxuICAgICAgICBpZiAobC5sZW5ndGggPiA2Mykge1xuICAgICAgICAgICAgdGhyb3cgbmV3IEludmFsaWROc2lkRXJyb3IoJ05TSUQgcGFydCB0b28gbG9uZyAobWF4IDYzIGNoYXJzKScpO1xuICAgICAgICB9XG4gICAgICAgIGlmIChsLmVuZHNXaXRoKCctJykgfHwgbC5zdGFydHNXaXRoKCctJykpIHtcbiAgICAgICAgICAgIHRocm93IG5ldyBJbnZhbGlkTnNpZEVycm9yKCdOU0lEIHBhcnRzIGNhbiBub3Qgc3RhcnQgb3IgZW5kIHdpdGggaHlwaGVuJyk7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKC9eWzAtOV0vLnRlc3QobCkgJiYgaSA9PT0gMCkge1xuICAgICAgICAgICAgdGhyb3cgbmV3IEludmFsaWROc2lkRXJyb3IoJ05TSUQgZmlyc3QgcGFydCBtYXkgbm90IHN0YXJ0IHdpdGggYSBkaWdpdCcpO1xuICAgICAgICB9XG4gICAgICAgIGlmICghL15bYS16QS1aXSskLy50ZXN0KGwpICYmIGkgKyAxID09PSBsYWJlbHMubGVuZ3RoKSB7XG4gICAgICAgICAgICB0aHJvdyBuZXcgSW52YWxpZE5zaWRFcnJvcignTlNJRCBuYW1lIHBhcnQgbXVzdCBiZSBvbmx5IGxldHRlcnMnKTtcbiAgICAgICAgfVxuICAgIH1cbn07XG5leHBvcnRzLmVuc3VyZVZhbGlkTnNpZCA9IGVuc3VyZVZhbGlkTnNpZDtcbmNvbnN0IGVuc3VyZVZhbGlkTnNpZFJlZ2V4ID0gKG5zaWQpID0+IHtcbiAgICAvLyBzaW1wbGUgcmVnZXggdG8gZW5mb3JjZSBtb3N0IGNvbnN0cmFpbnRzIHZpYSBqdXN0IHJlZ2V4IGFuZCBsZW5ndGguXG4gICAgLy8gaGFuZCB3cm90ZSB0aGlzIHJlZ2V4IGJhc2VkIG9uIGFib3ZlIGNvbnN0cmFpbnRzXG4gICAgaWYgKCEvXlthLXpBLVpdKFthLXpBLVowLTktXXswLDYxfVthLXpBLVowLTldKT8oXFwuW2EtekEtWjAtOV0oW2EtekEtWjAtOS1dezAsNjF9W2EtekEtWjAtOV0pPykrKFxcLlthLXpBLVpdKFthLXpBLVpdezAsNjF9W2EtekEtWl0pPykkLy50ZXN0KG5zaWQpKSB7XG4gICAgICAgIHRocm93IG5ldyBJbnZhbGlkTnNpZEVycm9yKFwiTlNJRCBkaWRuJ3QgdmFsaWRhdGUgdmlhIHJlZ2V4XCIpO1xuICAgIH1cbiAgICBpZiAobnNpZC5sZW5ndGggPiAyNTMgKyAxICsgNjMpIHtcbiAgICAgICAgdGhyb3cgbmV3IEludmFsaWROc2lkRXJyb3IoJ05TSUQgaXMgdG9vIGxvbmcgKDMxNyBjaGFycyBtYXgpJyk7XG4gICAgfVxufTtcbmV4cG9ydHMuZW5zdXJlVmFsaWROc2lkUmVnZXggPSBlbnN1cmVWYWxpZE5zaWRSZWdleDtcbmNsYXNzIEludmFsaWROc2lkRXJyb3IgZXh0ZW5kcyBFcnJvciB7XG59XG5leHBvcnRzLkludmFsaWROc2lkRXJyb3IgPSBJbnZhbGlkTnNpZEVycm9yO1xuLy8jIHNvdXJjZU1hcHBpbmdVUkw9bnNpZC5qcy5tYXAiLCJcInVzZSBzdHJpY3RcIjtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcbmV4cG9ydHMuSW52YWxpZFJlY29yZEtleUVycm9yID0gZXhwb3J0cy5pc1ZhbGlkUmVjb3JkS2V5ID0gZXhwb3J0cy5lbnN1cmVWYWxpZFJlY29yZEtleSA9IHZvaWQgMDtcbmNvbnN0IGVuc3VyZVZhbGlkUmVjb3JkS2V5ID0gKHJrZXkpID0+IHtcbiAgICBpZiAocmtleS5sZW5ndGggPiA1MTIgfHwgcmtleS5sZW5ndGggPCAxKSB7XG4gICAgICAgIHRocm93IG5ldyBJbnZhbGlkUmVjb3JkS2V5RXJyb3IoJ3JlY29yZCBrZXkgbXVzdCBiZSAxIHRvIDUxMiBjaGFyYWN0ZXJzJyk7XG4gICAgfVxuICAgIC8vIHNpbXBsZSByZWdleCB0byBlbmZvcmNlIG1vc3QgY29uc3RyYWludHMgdmlhIGp1c3QgcmVnZXggYW5kIGxlbmd0aC5cbiAgICBpZiAoIS9eW2EtekEtWjAtOV9+LjotXXsxLDUxMn0kLy50ZXN0KHJrZXkpKSB7XG4gICAgICAgIHRocm93IG5ldyBJbnZhbGlkUmVjb3JkS2V5RXJyb3IoJ3JlY29yZCBrZXkgc3ludGF4IG5vdCB2YWxpZCAocmVnZXgpJyk7XG4gICAgfVxuICAgIGlmIChya2V5ID09PSAnLicgfHwgcmtleSA9PT0gJy4uJylcbiAgICAgICAgdGhyb3cgbmV3IEludmFsaWRSZWNvcmRLZXlFcnJvcigncmVjb3JkIGtleSBjYW4gbm90IGJlIFwiLlwiIG9yIFwiLi5cIicpO1xufTtcbmV4cG9ydHMuZW5zdXJlVmFsaWRSZWNvcmRLZXkgPSBlbnN1cmVWYWxpZFJlY29yZEtleTtcbmNvbnN0IGlzVmFsaWRSZWNvcmRLZXkgPSAocmtleSkgPT4ge1xuICAgIHRyeSB7XG4gICAgICAgICgwLCBleHBvcnRzLmVuc3VyZVZhbGlkUmVjb3JkS2V5KShya2V5KTtcbiAgICB9XG4gICAgY2F0Y2ggKGVycikge1xuICAgICAgICBpZiAoZXJyIGluc3RhbmNlb2YgSW52YWxpZFJlY29yZEtleUVycm9yKSB7XG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgIH1cbiAgICAgICAgdGhyb3cgZXJyO1xuICAgIH1cbiAgICByZXR1cm4gdHJ1ZTtcbn07XG5leHBvcnRzLmlzVmFsaWRSZWNvcmRLZXkgPSBpc1ZhbGlkUmVjb3JkS2V5O1xuY2xhc3MgSW52YWxpZFJlY29yZEtleUVycm9yIGV4dGVuZHMgRXJyb3Ige1xufVxuZXhwb3J0cy5JbnZhbGlkUmVjb3JkS2V5RXJyb3IgPSBJbnZhbGlkUmVjb3JkS2V5RXJyb3I7XG4vLyMgc291cmNlTWFwcGluZ1VSTD1yZWNvcmRrZXkuanMubWFwIiwiXCJ1c2Ugc3RyaWN0XCI7XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XG5leHBvcnRzLkludmFsaWRUaWRFcnJvciA9IGV4cG9ydHMuaXNWYWxpZFRpZCA9IGV4cG9ydHMuZW5zdXJlVmFsaWRUaWQgPSB2b2lkIDA7XG5jb25zdCBlbnN1cmVWYWxpZFRpZCA9ICh0aWQpID0+IHtcbiAgICBpZiAodGlkLmxlbmd0aCAhPT0gMTMpIHtcbiAgICAgICAgdGhyb3cgbmV3IEludmFsaWRUaWRFcnJvcignVElEIG11c3QgYmUgMTMgY2hhcmFjdGVycycpO1xuICAgIH1cbiAgICAvLyBzaW1wbGUgcmVnZXggdG8gZW5mb3JjZSBtb3N0IGNvbnN0cmFpbnRzIHZpYSBqdXN0IHJlZ2V4IGFuZCBsZW5ndGguXG4gICAgaWYgKCEvXlsyMzQ1NjdhYmNkZWZnaGlqXVsyMzQ1NjdhYmNkZWZnaGlqa2xtbm9wcXJzdHV2d3h5el17MTJ9JC8udGVzdCh0aWQpKSB7XG4gICAgICAgIHRocm93IG5ldyBJbnZhbGlkVGlkRXJyb3IoJ1RJRCBzeW50YXggbm90IHZhbGlkIChyZWdleCknKTtcbiAgICB9XG59O1xuZXhwb3J0cy5lbnN1cmVWYWxpZFRpZCA9IGVuc3VyZVZhbGlkVGlkO1xuY29uc3QgaXNWYWxpZFRpZCA9ICh0aWQpID0+IHtcbiAgICB0cnkge1xuICAgICAgICAoMCwgZXhwb3J0cy5lbnN1cmVWYWxpZFRpZCkodGlkKTtcbiAgICB9XG4gICAgY2F0Y2ggKGVycikge1xuICAgICAgICBpZiAoZXJyIGluc3RhbmNlb2YgSW52YWxpZFRpZEVycm9yKSB7XG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgIH1cbiAgICAgICAgdGhyb3cgZXJyO1xuICAgIH1cbiAgICByZXR1cm4gdHJ1ZTtcbn07XG5leHBvcnRzLmlzVmFsaWRUaWQgPSBpc1ZhbGlkVGlkO1xuY2xhc3MgSW52YWxpZFRpZEVycm9yIGV4dGVuZHMgRXJyb3Ige1xufVxuZXhwb3J0cy5JbnZhbGlkVGlkRXJyb3IgPSBJbnZhbGlkVGlkRXJyb3I7XG4vLyMgc291cmNlTWFwcGluZ1VSTD10aWQuanMubWFwIiwiLypcbkNvcHlyaWdodCAyMDA5KywgR01fY29uZmlnIENvbnRyaWJ1dG9ycyAoaHR0cHM6Ly9naXRodWIuY29tL3NpenpsZW1jdHdpenpsZS9HTV9jb25maWcpXG5cbkdNX2NvbmZpZyBDb2xsYWJvcmF0b3JzL0NvbnRyaWJ1dG9yczpcbiAgICBNaWtlIE1lZGxleSA8bWVkbGV5bWluZEBnbWFpbC5jb20+XG4gICAgSm9lIFNpbW1vbnNcbiAgICBJenp5IFNvZnRcbiAgICBNYXJ0aSBNYXJ0elxuICAgIEFkYW0gVGhvbXBzb24tU2hhcnBlXG5cbkdNX2NvbmZpZyBpcyBkaXN0cmlidXRlZCB1bmRlciB0aGUgdGVybXMgb2YgdGhlIEdOVSBMZXNzZXIgR2VuZXJhbCBQdWJsaWMgTGljZW5zZS5cblxuICAgIEdNX2NvbmZpZyBpcyBmcmVlIHNvZnR3YXJlOiB5b3UgY2FuIHJlZGlzdHJpYnV0ZSBpdCBhbmQvb3IgbW9kaWZ5XG4gICAgaXQgdW5kZXIgdGhlIHRlcm1zIG9mIHRoZSBHTlUgTGVzc2VyIEdlbmVyYWwgUHVibGljIExpY2Vuc2UgYXMgcHVibGlzaGVkIGJ5XG4gICAgdGhlIEZyZWUgU29mdHdhcmUgRm91bmRhdGlvbiwgZWl0aGVyIHZlcnNpb24gMyBvZiB0aGUgTGljZW5zZSwgb3JcbiAgICAoYXQgeW91ciBvcHRpb24pIGFueSBsYXRlciB2ZXJzaW9uLlxuXG4gICAgVGhpcyBwcm9ncmFtIGlzIGRpc3RyaWJ1dGVkIGluIHRoZSBob3BlIHRoYXQgaXQgd2lsbCBiZSB1c2VmdWwsXG4gICAgYnV0IFdJVEhPVVQgQU5ZIFdBUlJBTlRZOyB3aXRob3V0IGV2ZW4gdGhlIGltcGxpZWQgd2FycmFudHkgb2ZcbiAgICBNRVJDSEFOVEFCSUxJVFkgb3IgRklUTkVTUyBGT1IgQSBQQVJUSUNVTEFSIFBVUlBPU0UuICBTZWUgdGhlXG4gICAgR05VIExlc3NlciBHZW5lcmFsIFB1YmxpYyBMaWNlbnNlIGZvciBtb3JlIGRldGFpbHMuXG5cbiAgICBZb3Ugc2hvdWxkIGhhdmUgcmVjZWl2ZWQgYSBjb3B5IG9mIHRoZSBHTlUgTGVzc2VyIEdlbmVyYWwgUHVibGljIExpY2Vuc2VcbiAgICBhbG9uZyB3aXRoIHRoaXMgcHJvZ3JhbS4gIElmIG5vdCwgc2VlIDxodHRwczovL3d3dy5nbnUub3JnL2xpY2Vuc2VzLz4uXG4qL1xuXG4vLyA9PVVzZXJTY3JpcHQ9PVxuLy8gQGV4Y2x1ZGUgICAgICAgKlxuLy8gQGF1dGhvciAgICAgICAgTWlrZSBNZWRsZXkgPG1lZGxleW1pbmRAZ21haWwuY29tPiAoaHR0cHM6Ly9naXRodWIuY29tL3NpenpsZW1jdHdpenpsZS9HTV9jb25maWcpXG4vLyBAaWNvbiAgICAgICAgICBodHRwczovL3Jhdy5naXRodWJ1c2VyY29udGVudC5jb20vc2l6emxlbWN0d2l6emxlL0dNX2NvbmZpZy9tYXN0ZXIvZ21fY29uZmlnX2ljb25fbGFyZ2UucG5nXG5cbi8vID09VXNlckxpYnJhcnk9PVxuLy8gQG5hbWUgICAgICAgICAgR01fY29uZmlnXG4vLyBAZGVzY3JpcHRpb24gICBBIGxpZ2h0d2VpZ2h0LCByZXVzYWJsZSwgY3Jvc3MtYnJvd3NlciBncmFwaGljYWwgc2V0dGluZ3MgZnJhbWV3b3JrIGZvciBpbmNsdXNpb24gaW4gdXNlciBzY3JpcHRzLlxuLy8gQGNvcHlyaWdodCAgICAgMjAwOSssIE1pa2UgTWVkbGV5IChodHRwczovL2dpdGh1Yi5jb20vc2l6emxlbWN0d2l6emxlKVxuLy8gQGxpY2Vuc2UgICAgICAgTEdQTC0zLjAtb3ItbGF0ZXI7IGh0dHBzOi8vcmF3LmdpdGh1YnVzZXJjb250ZW50LmNvbS9zaXp6bGVtY3R3aXp6bGUvR01fY29uZmlnL21hc3Rlci9MSUNFTlNFXG5cbi8vIEBob21lcGFnZVVSTCAgIGh0dHBzOi8vb3BlbnVzZXJqcy5vcmcvbGlicy9zaXp6bGUvR01fY29uZmlnXG4vLyBAaG9tZXBhZ2VVUkwgICBodHRwczovL2dpdGh1Yi5jb20vc2l6emxlbWN0d2l6emxlL0dNX2NvbmZpZ1xuLy8gQHN1cHBvcnRVUkwgICAgaHR0cHM6Ly9naXRodWIuY29tL3NpenpsZW1jdHdpenpsZS9HTV9jb25maWcvaXNzdWVzXG5cbi8vID09L1VzZXJTY3JpcHQ9PVxuXG4vLyA9PS9Vc2VyTGlicmFyeT09XG5cbi8qIGpzaGludCBlc3ZlcnNpb246IDggKi9cblxubGV0IEdNX2NvbmZpZyA9IChmdW5jdGlvbiAoR00pIHtcbiAgLy8gVGhpcyBpcyB0aGUgaW5pdGlhbGl6ZXIgZnVuY3Rpb25cbiAgZnVuY3Rpb24gR01fY29uZmlnSW5pdChjb25maWcsIGFyZ3MpIHtcbiAgICAvLyBJbml0aWFsaXplIGluc3RhbmNlIHZhcmlhYmxlc1xuICAgIGlmICh0eXBlb2YgY29uZmlnLmZpZWxkcyA9PSBcInVuZGVmaW5lZFwiKSB7XG4gICAgICBjb25maWcuZmllbGRzID0ge307XG4gICAgICBjb25maWcub25Jbml0ID0gY29uZmlnLm9uSW5pdCB8fCBmdW5jdGlvbigpIHt9O1xuICAgICAgY29uZmlnLm9uT3BlbiA9IGNvbmZpZy5vbk9wZW4gfHwgZnVuY3Rpb24oKSB7fTtcbiAgICAgIGNvbmZpZy5vblNhdmUgPSBjb25maWcub25TYXZlIHx8IGZ1bmN0aW9uKCkge307XG4gICAgICBjb25maWcub25DbG9zZSA9IGNvbmZpZy5vbkNsb3NlIHx8IGZ1bmN0aW9uKCkge307XG4gICAgICBjb25maWcub25SZXNldCA9IGNvbmZpZy5vblJlc2V0IHx8IGZ1bmN0aW9uKCkge307XG4gICAgICBjb25maWcuaXNPcGVuID0gZmFsc2U7XG4gICAgICBjb25maWcudGl0bGUgPSAnVXNlciBTY3JpcHQgU2V0dGluZ3MnO1xuICAgICAgY29uZmlnLmNzcyA9IHtcbiAgICAgICAgYmFzaWM6IFtcbiAgICAgICAgICBcIiNHTV9jb25maWcgKiB7IGZvbnQtZmFtaWx5OiBhcmlhbCx0YWhvbWEsbXlyaWFkIHBybyxzYW5zLXNlcmlmOyB9XCIsXG4gICAgICAgICAgXCIjR01fY29uZmlnIHsgYmFja2dyb3VuZDogI0ZGRjsgfVwiLFxuICAgICAgICAgIFwiI0dNX2NvbmZpZyBpbnB1dFt0eXBlPSdyYWRpbyddIHsgbWFyZ2luLXJpZ2h0OiA4cHg7IH1cIixcbiAgICAgICAgICBcIiNHTV9jb25maWcgLmluZGVudDQwIHsgbWFyZ2luLWxlZnQ6IDQwJTsgfVwiLFxuICAgICAgICAgIFwiI0dNX2NvbmZpZyAuZmllbGRfbGFiZWwgeyBmb250LXNpemU6IDEycHg7IGZvbnQtd2VpZ2h0OiBib2xkOyBtYXJnaW4tcmlnaHQ6IDZweDsgfVwiLFxuICAgICAgICAgIFwiI0dNX2NvbmZpZyAucmFkaW9fbGFiZWwgeyBmb250LXNpemU6IDEycHg7IH1cIixcbiAgICAgICAgICBcIiNHTV9jb25maWcgLmJsb2NrIHsgZGlzcGxheTogYmxvY2s7IH1cIixcbiAgICAgICAgICBcIiNHTV9jb25maWcgLnNhdmVjbG9zZV9idXR0b25zIHsgbWFyZ2luOiAxNnB4IDEwcHggMTBweDsgcGFkZGluZzogMnB4IDEycHg7IH1cIixcbiAgICAgICAgICBcIiNHTV9jb25maWcgLnJlc2V0LCAjR01fY29uZmlnIC5yZXNldCBhLFwiICtcbiAgICAgICAgICAgIFwiICNHTV9jb25maWdfYnV0dG9uc19ob2xkZXIgeyBjb2xvcjogIzAwMDsgdGV4dC1hbGlnbjogcmlnaHQ7IH1cIixcbiAgICAgICAgICBcIiNHTV9jb25maWcgLmNvbmZpZ19oZWFkZXIgeyBmb250LXNpemU6IDIwcHQ7IG1hcmdpbjogMDsgfVwiLFxuICAgICAgICAgIFwiI0dNX2NvbmZpZyAuY29uZmlnX2Rlc2MsICNHTV9jb25maWcgLnNlY3Rpb25fZGVzYywgI0dNX2NvbmZpZyAucmVzZXQgeyBmb250LXNpemU6IDlwdDsgfVwiLFxuICAgICAgICAgIFwiI0dNX2NvbmZpZyAuY2VudGVyIHsgdGV4dC1hbGlnbjogY2VudGVyOyB9XCIsXG4gICAgICAgICAgXCIjR01fY29uZmlnIC5zZWN0aW9uX2hlYWRlcl9ob2xkZXIgeyBtYXJnaW4tdG9wOiA4cHg7IH1cIixcbiAgICAgICAgICBcIiNHTV9jb25maWcgLmNvbmZpZ192YXIgeyBtYXJnaW46IDAgMCA0cHg7IH1cIixcbiAgICAgICAgICBcIiNHTV9jb25maWcgLnNlY3Rpb25faGVhZGVyIHsgYmFja2dyb3VuZDogIzQxNDE0MTsgYm9yZGVyOiAxcHggc29saWQgIzAwMDsgY29sb3I6ICNGRkY7XCIsXG4gICAgICAgICAgXCIgZm9udC1zaXplOiAxM3B0OyBtYXJnaW46IDA7IH1cIixcbiAgICAgICAgICBcIiNHTV9jb25maWcgLnNlY3Rpb25fZGVzYyB7IGJhY2tncm91bmQ6ICNFRkVGRUY7IGJvcmRlcjogMXB4IHNvbGlkICNDQ0M7IGNvbG9yOiAjNTc1NzU3O1wiICtcbiAgICAgICAgICAgIFwiIGZvbnQtc2l6ZTogOXB0OyBtYXJnaW46IDAgMCA2cHg7IH1cIlxuICAgICAgICAgIF0uam9pbignXFxuJykgKyAnXFxuJyxcbiAgICAgICAgYmFzaWNQcmVmaXg6IFwiR01fY29uZmlnXCIsXG4gICAgICAgIHN0eWxpc2g6IFwiXCJcbiAgICAgIH07XG4gICAgfVxuICAgIGNvbmZpZy5mcmFtZVN0eWxlID0gW1xuICAgICAgJ2JvdHRvbTogYXV0bzsgYm9yZGVyOiAxcHggc29saWQgIzAwMDsgZGlzcGxheTogbm9uZTsgaGVpZ2h0OiA3NSU7JyxcbiAgICAgICdsZWZ0OiAwOyBtYXJnaW46IDA7IG1heC1oZWlnaHQ6IDk1JTsgbWF4LXdpZHRoOiA5NSU7IG9wYWNpdHk6IDA7JyxcbiAgICAgICdvdmVyZmxvdzogYXV0bzsgcGFkZGluZzogMDsgcG9zaXRpb246IGZpeGVkOyByaWdodDogYXV0bzsgdG9wOiAwOycsXG4gICAgICAnd2lkdGg6IDc1JTsgei1pbmRleDogOTk5OTsnXG5cdF0uam9pbignICcpO1xuXG4gICAgdmFyIHNldHRpbmdzID0gbnVsbDtcbiAgICBpZiAoYXJncy5sZW5ndGggPT0gMSAmJlxuICAgICAgdHlwZW9mIGFyZ3NbMF0uaWQgPT0gXCJzdHJpbmdcIiAmJlxuICAgICAgdHlwZW9mIGFyZ3NbMF0uYXBwZW5kQ2hpbGQgIT0gXCJmdW5jdGlvblwiKSBzZXR0aW5ncyA9IGFyZ3NbMF07XG4gICAgZWxzZSB7XG4gICAgICAvLyBQcm92aWRlIGJhY2t3YXJkcy1jb21wYXRpYmlsaXR5IHdpdGggYXJndW1lbnQgc3R5bGUgaW50aWFsaXphdGlvblxuICAgICAgc2V0dGluZ3MgPSB7fTtcblxuICAgICAgLy8gbG9vcCB0aHJvdWdoIEdNX2NvbmZpZy5pbml0KCkgYXJndW1lbnRzXG4gICAgICBmb3IgKGxldCBpID0gMCwgbCA9IGFyZ3MubGVuZ3RoLCBhcmc7IGkgPCBsOyArK2kpIHtcbiAgICAgICAgYXJnID0gYXJnc1tpXTtcblxuICAgICAgICAvLyBBbiBlbGVtZW50IHRvIHVzZSBhcyB0aGUgY29uZmlnIHdpbmRvd1xuICAgICAgICBpZiAodHlwZW9mIGFyZy5hcHBlbmRDaGlsZCA9PSBcImZ1bmN0aW9uXCIpIHtcbiAgICAgICAgICBzZXR0aW5ncy5mcmFtZSA9IGFyZztcbiAgICAgICAgICBjb250aW51ZTtcbiAgICAgICAgfVxuXG4gICAgICAgIHN3aXRjaCAodHlwZW9mIGFyZykge1xuICAgICAgICAgIGNhc2UgJ29iamVjdCc6XG4gICAgICAgICAgICBmb3IgKGxldCBqIGluIGFyZykgeyAvLyBjb3VsZCBiZSBhIGNhbGxiYWNrIGZ1bmN0aW9ucyBvciBzZXR0aW5ncyBvYmplY3RcbiAgICAgICAgICAgICAgaWYgKHR5cGVvZiBhcmdbal0gIT0gXCJmdW5jdGlvblwiKSB7IC8vIHdlIGFyZSBpbiB0aGUgc2V0dGluZ3Mgb2JqZWN0XG4gICAgICAgICAgICAgICAgc2V0dGluZ3MuZmllbGRzID0gYXJnOyAvLyBzdG9yZSBzZXR0aW5ncyBvYmplY3RcbiAgICAgICAgICAgICAgICBicmVhazsgLy8gbGVhdmUgdGhlIGxvb3BcbiAgICAgICAgICAgICAgfSAvLyBvdGhlcndpc2UgaXQgbXVzdCBiZSBhIGNhbGxiYWNrIGZ1bmN0aW9uXG4gICAgICAgICAgICAgIGlmICghc2V0dGluZ3MuZXZlbnRzKSBzZXR0aW5ncy5ldmVudHMgPSB7fTtcbiAgICAgICAgICAgICAgc2V0dGluZ3MuZXZlbnRzW2pdID0gYXJnW2pdO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgY2FzZSAnZnVuY3Rpb24nOiAvLyBwYXNzaW5nIGEgYmFyZSBmdW5jdGlvbiBpcyBzZXQgdG8gb3BlbiBjYWxsYmFja1xuICAgICAgICAgICAgc2V0dGluZ3MuZXZlbnRzID0ge29uT3BlbjogYXJnfTtcbiAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgIGNhc2UgJ3N0cmluZyc6IC8vIGNvdWxkIGJlIGN1c3RvbSBDU1Mgb3IgdGhlIHRpdGxlIHN0cmluZ1xuICAgICAgICAgICAgaWYgKC9cXHcrXFxzKlxce1xccypcXHcrXFxzKjpcXHMqXFx3K1tcXHN8XFxTXSpcXH0vLnRlc3QoYXJnKSlcbiAgICAgICAgICAgICAgc2V0dGluZ3MuY3NzID0gYXJnO1xuICAgICAgICAgICAgZWxzZVxuICAgICAgICAgICAgICBzZXR0aW5ncy50aXRsZSA9IGFyZztcbiAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuXG4gICAgLyogSW5pdGlhbGl6ZSBldmVyeXRoaW5nIHVzaW5nIHRoZSBuZXcgc2V0dGluZ3Mgb2JqZWN0ICovXG4gICAgLy8gU2V0IHRoZSBpZFxuICAgIGlmIChzZXR0aW5ncy5pZCkgY29uZmlnLmlkID0gc2V0dGluZ3MuaWQ7XG4gICAgZWxzZSBpZiAodHlwZW9mIGNvbmZpZy5pZCA9PSBcInVuZGVmaW5lZFwiKSBjb25maWcuaWQgPSAnR01fY29uZmlnJztcblxuICAgIC8vIFNldCB0aGUgdGl0bGVcbiAgICBpZiAoc2V0dGluZ3MudGl0bGUpIGNvbmZpZy50aXRsZSA9IHNldHRpbmdzLnRpdGxlO1xuXG4gICAgLy8gU2V0IHRoZSBjdXN0b20gY3NzXG4gICAgaWYgKHNldHRpbmdzLmNzcykgY29uZmlnLmNzcy5zdHlsaXNoID0gc2V0dGluZ3MuY3NzO1xuXG4gICAgLy8gU2V0IHRoZSBmcmFtZVxuICAgIGlmIChzZXR0aW5ncy5mcmFtZSkgY29uZmlnLmZyYW1lID0gc2V0dGluZ3MuZnJhbWU7XG5cdFxuICAgIC8vIFNldCB0aGUgc3R5bGUgYXR0cmlidXRlIG9mIHRoZSBmcmFtZVxuICAgIGlmICh0eXBlb2Ygc2V0dGluZ3MuZnJhbWVTdHlsZSA9PT0gJ3N0cmluZycpIGNvbmZpZy5mcmFtZVN0eWxlID0gc2V0dGluZ3MuZnJhbWVTdHlsZTtcblxuICAgIC8vIFNldCB0aGUgZXZlbnQgY2FsbGJhY2tzXG4gICAgaWYgKHNldHRpbmdzLmV2ZW50cykge1xuICAgICAgbGV0IGV2ZW50cyA9IHNldHRpbmdzLmV2ZW50cztcbiAgICAgIGZvciAobGV0IGUgaW4gZXZlbnRzKSB7XG4gICAgICAgIGNvbmZpZ1tcIm9uXCIgKyBlLmNoYXJBdCgwKS50b1VwcGVyQ2FzZSgpICsgZS5zbGljZSgxKV0gPSBldmVudHNbZV07XG4gICAgICB9XG4gICAgfVxuXG4gICAgLy8gSWYgdGhlIGlkIGhhcyBjaGFuZ2VkIHdlIG11c3QgbW9kaWZ5IHRoZSBkZWZhdWx0IHN0eWxlXG4gICAgaWYgKGNvbmZpZy5pZCAhPSBjb25maWcuY3NzLmJhc2ljUHJlZml4KSB7XG4gICAgICBjb25maWcuY3NzLmJhc2ljID0gY29uZmlnLmNzcy5iYXNpYy5yZXBsYWNlKFxuICAgICAgICBuZXcgUmVnRXhwKCcjJyArIGNvbmZpZy5jc3MuYmFzaWNQcmVmaXgsICdnbScpLCAnIycgKyBjb25maWcuaWQpO1xuICAgICAgY29uZmlnLmNzcy5iYXNpY1ByZWZpeCA9IGNvbmZpZy5pZDtcbiAgICB9XG5cbiAgICAvLyBDcmVhdGUgdGhlIGZpZWxkc1xuICAgIGNvbmZpZy5pc0luaXQgPSBmYWxzZTtcbiAgICBpZiAoc2V0dGluZ3MuZmllbGRzKSB7XG4gICAgICBjb25maWcucmVhZChudWxsLCAoc3RvcmVkKSA9PiB7IC8vIHJlYWQgdGhlIHN0b3JlZCBzZXR0aW5nc1xuICAgICAgICBsZXQgZmllbGRzID0gc2V0dGluZ3MuZmllbGRzLFxuICAgICAgICAgICAgY3VzdG9tVHlwZXMgPSBzZXR0aW5ncy50eXBlcyB8fCB7fSxcbiAgICAgICAgICAgIGNvbmZpZ0lkID0gY29uZmlnLmlkO1xuXG4gICAgICAgIGZvciAobGV0IGlkIGluIGZpZWxkcykge1xuICAgICAgICAgIGxldCBmaWVsZCA9IGZpZWxkc1tpZF0sXG4gICAgICAgICAgICAgIGZpZWxkRXhpc3RzID0gZmFsc2U7XG5cbiAgICAgICAgICBpZiAoY29uZmlnLmZpZWxkc1tpZF0pIHtcbiAgICAgICAgICAgIGZpZWxkRXhpc3RzID0gdHJ1ZTtcbiAgICAgICAgICB9XG5cbiAgICAgICAgICAvLyBmb3IgZWFjaCBmaWVsZCBkZWZpbml0aW9uIGNyZWF0ZSBhIGZpZWxkIG9iamVjdFxuICAgICAgICAgIGlmIChmaWVsZCkge1xuICAgICAgICAgICAgaWYgKGNvbmZpZy5pc09wZW4gJiYgZmllbGRFeGlzdHMpIHtcbiAgICAgICAgICAgICAgICBjb25maWcuZmllbGRzW2lkXS5yZW1vdmUoKTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgY29uZmlnLmZpZWxkc1tpZF0gPSBuZXcgR01fY29uZmlnRmllbGQoZmllbGQsIHN0b3JlZFtpZF0sIGlkLFxuICAgICAgICAgICAgICBjdXN0b21UeXBlc1tmaWVsZC50eXBlXSwgY29uZmlnSWQpO1xuXG4gICAgICAgICAgICAvLyBBZGQgZmllbGQgdG8gb3BlbiBmcmFtZVxuICAgICAgICAgICAgaWYgKGNvbmZpZy5pc09wZW4pIHtcbiAgICAgICAgICAgICAgY29uZmlnLmZpZWxkc1tpZF0ud3JhcHBlciA9IGNvbmZpZy5maWVsZHNbaWRdLnRvTm9kZSgpO1xuICAgICAgICAgICAgICBjb25maWcuZnJhbWVTZWN0aW9uLmFwcGVuZENoaWxkKGNvbmZpZy5maWVsZHNbaWRdLndyYXBwZXIpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH0gZWxzZSBpZiAoIWZpZWxkICYmIGZpZWxkRXhpc3RzKSB7XG4gICAgICAgICAgICAvLyBSZW1vdmUgZmllbGQgZnJvbSBvcGVuIGZyYW1lXG4gICAgICAgICAgICBpZiAoY29uZmlnLmlzT3Blbikge1xuICAgICAgICAgICAgICBjb25maWcuZmllbGRzW2lkXS5yZW1vdmUoKTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgZGVsZXRlIGNvbmZpZy5maWVsZHNbaWRdO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIGNvbmZpZy5pc0luaXQgPSB0cnVlO1xuICAgICAgICBjb25maWcub25Jbml0LmNhbGwoY29uZmlnKTtcbiAgICAgIH0pO1xuICAgIH0gZWxzZSB7XG4gICAgICBjb25maWcuaXNJbml0ID0gdHJ1ZTtcbiAgICAgIGNvbmZpZy5vbkluaXQuY2FsbChjb25maWcpO1xuICAgIH1cbiAgfVxuXG4gIGxldCBjb25zdHJ1Y3QgPSBmdW5jdGlvbiAoKSB7XG4gICAgLy8gUGFyc2luZyBvZiBpbnB1dCBwcm92aWRlZCB2aWEgZnJvbnRlbmRzXG4gICAgR01fY29uZmlnSW5pdCh0aGlzLCBhcmd1bWVudHMpO1xuICB9O1xuICBjb25zdHJ1Y3QucHJvdG90eXBlID0ge1xuICAgIC8vIFN1cHBvcnQgcmUtaW5pdGFsaXphdGlvblxuICAgIGluaXQ6IGZ1bmN0aW9uKCkge1xuICAgICAgR01fY29uZmlnSW5pdCh0aGlzLCBhcmd1bWVudHMpO1xuICAgIH0sXG5cbiAgICAvLyBjYWxsIEdNX2NvbmZpZy5vcGVuKCkgZnJvbSB5b3VyIHNjcmlwdCB0byBvcGVuIHRoZSBtZW51XG4gICAgb3BlbjogZnVuY3Rpb24gKCkge1xuICAgICAgLy8gZG9uJ3Qgb3BlbiBiZWZvcmUgaW5pdCBpcyBmaW5pc2hlZFxuICAgICAgaWYgKCF0aGlzLmlzSW5pdCkge1xuICAgICAgICBzZXRUaW1lb3V0KCgpID0+IHRoaXMub3BlbigpLCAwKTtcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuICAgICAgLy8gRGllIGlmIHRoZSBtZW51IGlzIGFscmVhZHkgb3BlbiBvbiB0aGlzIHBhZ2VcbiAgICAgIC8vIFlvdSBjYW4gaGF2ZSBtdWx0aXBsZSBpbnN0YW5jZXMgYnV0IHlvdSBjYW4ndCBvcGVuIHRoZSBzYW1lIGluc3RhbmNlIHR3aWNlXG4gICAgICBsZXQgbWF0Y2ggPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCh0aGlzLmlkKTtcbiAgICAgIGlmIChtYXRjaCAmJiAobWF0Y2gudGFnTmFtZSA9PSBcIklGUkFNRVwiIHx8IG1hdGNoLmNoaWxkTm9kZXMubGVuZ3RoID4gMCkpIHJldHVybjtcblxuICAgICAgLy8gU29tZXRpbWVzIFwidGhpc1wiIGdldHMgb3ZlcndyaXR0ZW4gc28gY3JlYXRlIGFuIGFsaWFzXG4gICAgICBsZXQgY29uZmlnID0gdGhpcztcblxuICAgICAgLy8gRnVuY3Rpb24gdG8gYnVpbGQgdGhlIG1pZ2h0eSBjb25maWcgd2luZG93IDopXG4gICAgICBmdW5jdGlvbiBidWlsZENvbmZpZ1dpbiAoYm9keSwgaGVhZCkge1xuICAgICAgICBsZXQgY3JlYXRlID0gY29uZmlnLmNyZWF0ZSxcbiAgICAgICAgICAgIGZpZWxkcyA9IGNvbmZpZy5maWVsZHMsXG4gICAgICAgICAgICBjb25maWdJZCA9IGNvbmZpZy5pZCxcbiAgICAgICAgICAgIGJvZHlXcmFwcGVyID0gY3JlYXRlKCdkaXYnLCB7aWQ6IGNvbmZpZ0lkICsgJ193cmFwcGVyJ30pO1xuXG4gICAgICAgIC8vIEFwcGVuZCB0aGUgc3R5bGUgd2hpY2ggaXMgb3VyIGRlZmF1bHQgc3R5bGUgcGx1cyB0aGUgdXNlciBzdHlsZVxuICAgICAgICBoZWFkLmFwcGVuZENoaWxkKFxuICAgICAgICAgIGNyZWF0ZSgnc3R5bGUnLCB7XG4gICAgICAgICAgdHlwZTogJ3RleHQvY3NzJyxcbiAgICAgICAgICB0ZXh0Q29udGVudDogY29uZmlnLmNzcy5iYXNpYyArIGNvbmZpZy5jc3Muc3R5bGlzaFxuICAgICAgICB9KSk7XG5cbiAgICAgICAgLy8gQWRkIGhlYWRlciBhbmQgdGl0bGVcbiAgICAgICAgYm9keVdyYXBwZXIuYXBwZW5kQ2hpbGQoY3JlYXRlKCdkaXYnLCB7XG4gICAgICAgICAgaWQ6IGNvbmZpZ0lkICsgJ19oZWFkZXInLFxuICAgICAgICAgIGNsYXNzTmFtZTogJ2NvbmZpZ19oZWFkZXIgYmxvY2sgY2VudGVyJ1xuICAgICAgICB9LCBjb25maWcudGl0bGUpKTtcblxuICAgICAgICAvLyBBcHBlbmQgZWxlbWVudHNcbiAgICAgICAgbGV0IHNlY3Rpb24gPSBib2R5V3JhcHBlcixcbiAgICAgICAgICAgIHNlY051bSA9IDA7IC8vIFNlY3Rpb24gY291bnRcblxuICAgICAgICAvLyBsb29wIHRocm91Z2ggZmllbGRzXG4gICAgICAgIGZvciAobGV0IGlkIGluIGZpZWxkcykge1xuICAgICAgICAgIGxldCBmaWVsZCA9IGZpZWxkc1tpZF0sXG4gICAgICAgICAgICAgIHNldHRpbmdzID0gZmllbGQuc2V0dGluZ3M7XG5cbiAgICAgICAgICBpZiAoc2V0dGluZ3Muc2VjdGlvbikgeyAvLyB0aGUgc3RhcnQgb2YgYSBuZXcgc2VjdGlvblxuICAgICAgICAgICAgc2VjdGlvbiA9IGJvZHlXcmFwcGVyLmFwcGVuZENoaWxkKGNyZWF0ZSgnZGl2Jywge1xuICAgICAgICAgICAgICAgIGNsYXNzTmFtZTogJ3NlY3Rpb25faGVhZGVyX2hvbGRlcicsXG4gICAgICAgICAgICAgICAgaWQ6IGNvbmZpZ0lkICsgJ19zZWN0aW9uXycgKyBzZWNOdW1cbiAgICAgICAgICAgICAgfSkpO1xuXG4gICAgICAgICAgICBpZiAoIUFycmF5LmlzQXJyYXkoc2V0dGluZ3Muc2VjdGlvbikpXG4gICAgICAgICAgICAgIHNldHRpbmdzLnNlY3Rpb24gPSBbc2V0dGluZ3Muc2VjdGlvbl07XG5cbiAgICAgICAgICAgIGlmIChzZXR0aW5ncy5zZWN0aW9uWzBdKVxuICAgICAgICAgICAgICBzZWN0aW9uLmFwcGVuZENoaWxkKGNyZWF0ZSgnZGl2Jywge1xuICAgICAgICAgICAgICAgIGNsYXNzTmFtZTogJ3NlY3Rpb25faGVhZGVyIGNlbnRlcicsXG4gICAgICAgICAgICAgICAgaWQ6IGNvbmZpZ0lkICsgJ19zZWN0aW9uX2hlYWRlcl8nICsgc2VjTnVtXG4gICAgICAgICAgICAgIH0sIHNldHRpbmdzLnNlY3Rpb25bMF0pKTtcblxuICAgICAgICAgICAgaWYgKHNldHRpbmdzLnNlY3Rpb25bMV0pXG4gICAgICAgICAgICAgIHNlY3Rpb24uYXBwZW5kQ2hpbGQoY3JlYXRlKCdwJywge1xuICAgICAgICAgICAgICAgIGNsYXNzTmFtZTogJ3NlY3Rpb25fZGVzYyBjZW50ZXInLFxuICAgICAgICAgICAgICAgIGlkOiBjb25maWdJZCArICdfc2VjdGlvbl9kZXNjXycgKyBzZWNOdW1cbiAgICAgICAgICAgICAgfSwgc2V0dGluZ3Muc2VjdGlvblsxXSkpO1xuICAgICAgICAgICAgKytzZWNOdW07XG4gICAgICAgICAgfVxuICAgICAgICAgIFxuICAgICAgICAgIGlmIChzZWNOdW0gPT09IDApIHtcbiAgICAgICAgICAgIHNlY3Rpb24gPSBib2R5V3JhcHBlci5hcHBlbmRDaGlsZChjcmVhdGUoJ2RpdicsIHtcbiAgICAgICAgICAgICAgICBjbGFzc05hbWU6ICdzZWN0aW9uX2hlYWRlcl9ob2xkZXInLFxuICAgICAgICAgICAgICAgIGlkOiBjb25maWdJZCArICdfc2VjdGlvbl8nICsgKHNlY051bSsrKVxuICAgICAgICAgICAgfSkpO1xuICAgICAgICAgIH1cblxuICAgICAgICAgIC8vIENyZWF0ZSBmaWVsZCBlbGVtZW50cyBhbmQgYXBwZW5kIHRvIGN1cnJlbnQgc2VjdGlvblxuICAgICAgICAgIHNlY3Rpb24uYXBwZW5kQ2hpbGQoKGZpZWxkLndyYXBwZXIgPSBmaWVsZC50b05vZGUoKSkpO1xuICAgICAgICB9XG4gICAgICAgIFxuICAgICAgICBjb25maWcuZnJhbWVTZWN0aW9uID0gc2VjdGlvbjtcblxuICAgICAgICAvLyBBZGQgc2F2ZSBhbmQgY2xvc2UgYnV0dG9uc1xuICAgICAgICBib2R5V3JhcHBlci5hcHBlbmRDaGlsZChjcmVhdGUoJ2RpdicsXG4gICAgICAgICAge2lkOiBjb25maWdJZCArICdfYnV0dG9uc19ob2xkZXInfSxcblxuICAgICAgICAgIGNyZWF0ZSgnYnV0dG9uJywge1xuICAgICAgICAgICAgaWQ6IGNvbmZpZ0lkICsgJ19zYXZlQnRuJyxcbiAgICAgICAgICAgIHRleHRDb250ZW50OiAnU2F2ZScsXG4gICAgICAgICAgICB0aXRsZTogJ1NhdmUgc2V0dGluZ3MnLFxuICAgICAgICAgICAgY2xhc3NOYW1lOiAnc2F2ZWNsb3NlX2J1dHRvbnMnLFxuICAgICAgICAgICAgb25jbGljazogZnVuY3Rpb24gKCkgeyBjb25maWcuc2F2ZSgpOyB9XG4gICAgICAgICAgfSksXG5cbiAgICAgICAgICBjcmVhdGUoJ2J1dHRvbicsIHtcbiAgICAgICAgICAgIGlkOiBjb25maWdJZCArICdfY2xvc2VCdG4nLFxuICAgICAgICAgICAgdGV4dENvbnRlbnQ6ICdDbG9zZScsXG4gICAgICAgICAgICB0aXRsZTogJ0Nsb3NlIHdpbmRvdycsXG4gICAgICAgICAgICBjbGFzc05hbWU6ICdzYXZlY2xvc2VfYnV0dG9ucycsXG4gICAgICAgICAgICBvbmNsaWNrOiBmdW5jdGlvbiAoKSB7IGNvbmZpZy5jbG9zZSgpOyB9XG4gICAgICAgICAgfSksXG5cbiAgICAgICAgICBjcmVhdGUoJ2RpdicsXG4gICAgICAgICAgICB7Y2xhc3NOYW1lOiAncmVzZXRfaG9sZGVyIGJsb2NrJ30sXG5cbiAgICAgICAgICAgIC8vIFJlc2V0IGxpbmtcbiAgICAgICAgICAgIGNyZWF0ZSgnYScsIHtcbiAgICAgICAgICAgICAgaWQ6IGNvbmZpZ0lkICsgJ19yZXNldExpbmsnLFxuICAgICAgICAgICAgICB0ZXh0Q29udGVudDogJ1Jlc2V0IHRvIGRlZmF1bHRzJyxcbiAgICAgICAgICAgICAgaHJlZjogJyMnLFxuICAgICAgICAgICAgICB0aXRsZTogJ1Jlc2V0IGZpZWxkcyB0byBkZWZhdWx0IHZhbHVlcycsXG4gICAgICAgICAgICAgIGNsYXNzTmFtZTogJ3Jlc2V0JyxcbiAgICAgICAgICAgICAgb25jbGljazogZnVuY3Rpb24oZSkgeyBlLnByZXZlbnREZWZhdWx0KCk7IGNvbmZpZy5yZXNldCgpOyB9XG4gICAgICAgICAgICB9KVxuICAgICAgICApKSk7XG5cbiAgICAgICAgYm9keS5hcHBlbmRDaGlsZChib2R5V3JhcHBlcik7IC8vIFBhaW50IGV2ZXJ5dGhpbmcgdG8gd2luZG93IGF0IG9uY2VcbiAgICAgICAgY29uZmlnLmNlbnRlcigpOyAvLyBTaG93IGFuZCBjZW50ZXIgaWZyYW1lXG4gICAgICAgIHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKCdyZXNpemUnLCBjb25maWcuY2VudGVyLCBmYWxzZSk7IC8vIENlbnRlciBmcmFtZSBvbiByZXNpemVcblxuICAgICAgICAvLyBDYWxsIHRoZSBvcGVuKCkgY2FsbGJhY2sgZnVuY3Rpb25cbiAgICAgICAgY29uZmlnLm9uT3Blbihjb25maWcuZnJhbWUuY29udGVudERvY3VtZW50IHx8IGNvbmZpZy5mcmFtZS5vd25lckRvY3VtZW50LFxuICAgICAgICAgICAgICAgICAgICAgIGNvbmZpZy5mcmFtZS5jb250ZW50V2luZG93IHx8IHdpbmRvdyxcbiAgICAgICAgICAgICAgICAgICAgICBjb25maWcuZnJhbWUpO1xuXG4gICAgICAgIC8vIENsb3NlIGZyYW1lIG9uIHdpbmRvdyBjbG9zZVxuICAgICAgICB3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcignYmVmb3JldW5sb2FkJywgZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgY29uZmlnLmNsb3NlKCk7XG4gICAgICAgIH0sIGZhbHNlKTtcblxuICAgICAgICAvLyBOb3cgdGhhdCBldmVyeXRoaW5nIGlzIGxvYWRlZCwgbWFrZSBpdCB2aXNpYmxlXG4gICAgICAgIGNvbmZpZy5mcmFtZS5zdHlsZS5kaXNwbGF5ID0gXCJibG9ja1wiO1xuICAgICAgICBjb25maWcuaXNPcGVuID0gdHJ1ZTtcbiAgICAgIH1cblxuICAgICAgLy8gRWl0aGVyIHVzZSB0aGUgZWxlbWVudCBwYXNzZWQgdG8gaW5pdCgpIG9yIGNyZWF0ZSBhbiBpZnJhbWVcbiAgICAgIGlmICh0aGlzLmZyYW1lKSB7XG4gICAgICAgIHRoaXMuZnJhbWUuaWQgPSB0aGlzLmlkOyAvLyBBbGxvd3MgZm9yIHByZWZpeGluZyBzdHlsZXMgd2l0aCB0aGUgY29uZmlnIGlkXG4gICAgICAgIGlmICh0aGlzLmZyYW1lU3R5bGUpIHRoaXMuZnJhbWUuc2V0QXR0cmlidXRlKCdzdHlsZScsIHRoaXMuZnJhbWVTdHlsZSk7XG4gICAgICAgIGJ1aWxkQ29uZmlnV2luKHRoaXMuZnJhbWUsIHRoaXMuZnJhbWUub3duZXJEb2N1bWVudC5nZXRFbGVtZW50c0J5VGFnTmFtZSgnaGVhZCcpWzBdKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIC8vIENyZWF0ZSBmcmFtZVxuICAgICAgICB0aGlzLmZyYW1lID0gdGhpcy5jcmVhdGUoJ2lmcmFtZScsIHsgaWQ6IHRoaXMuaWQgfSk7XG4gICAgICAgIGlmICh0aGlzLmZyYW1lU3R5bGUpIHRoaXMuZnJhbWUuc2V0QXR0cmlidXRlKCdzdHlsZScsIHRoaXMuZnJhbWVTdHlsZSk7XG4gICAgICAgIGRvY3VtZW50LmJvZHkuYXBwZW5kQ2hpbGQodGhpcy5mcmFtZSk7XG5cbiAgICAgICAgLy8gSW4gV2ViS2l0IHNyYyBjYW4ndCBiZSBzZXQgdW50aWwgaXQgaXMgYWRkZWQgdG8gdGhlIHBhZ2VcbiAgICAgICAgdGhpcy5mcmFtZS5zcmMgPSAnJztcbiAgICAgICAgLy8gd2Ugd2FpdCBmb3IgdGhlIGlmcmFtZSB0byBsb2FkIGJlZm9yZSB3ZSBjYW4gbW9kaWZ5IGl0XG4gICAgICAgIGxldCB0aGF0ID0gdGhpcztcbiAgICAgICAgdGhpcy5mcmFtZS5hZGRFdmVudExpc3RlbmVyKCdsb2FkJywgZnVuY3Rpb24oZSkge1xuICAgICAgICAgICAgbGV0IGZyYW1lID0gY29uZmlnLmZyYW1lO1xuICAgICAgICAgICAgaWYgKCFmcmFtZS5jb250ZW50RG9jdW1lbnQpIHtcbiAgICAgICAgICAgICAgdGhhdC5sb2coXCJHTV9jb25maWcgZmFpbGVkIHRvIGluaXRpYWxpemUgZGVmYXVsdCBzZXR0aW5ncyBkaWFsb2cgbm9kZSFcIik7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICBsZXQgYm9keSA9IGZyYW1lLmNvbnRlbnREb2N1bWVudC5nZXRFbGVtZW50c0J5VGFnTmFtZSgnYm9keScpWzBdO1xuICAgICAgICAgICAgICBib2R5LmlkID0gY29uZmlnLmlkOyAvLyBBbGxvd3MgZm9yIHByZWZpeGluZyBzdHlsZXMgd2l0aCB0aGUgY29uZmlnIGlkXG4gICAgICAgICAgICAgIGJ1aWxkQ29uZmlnV2luKGJvZHksIGZyYW1lLmNvbnRlbnREb2N1bWVudC5nZXRFbGVtZW50c0J5VGFnTmFtZSgnaGVhZCcpWzBdKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSwgZmFsc2UpO1xuICAgICAgfVxuICAgIH0sXG5cbiAgICBzYXZlOiBmdW5jdGlvbiAoKSB7XG4gICAgICB0aGlzLndyaXRlKG51bGwsIG51bGwsICh2YWxzKSA9PiB0aGlzLm9uU2F2ZSh2YWxzKSk7XG4gICAgfSxcblxuICAgIGNsb3NlOiBmdW5jdGlvbigpIHtcbiAgICAgIC8vIElmIGZyYW1lIGlzIGFuIGlmcmFtZSB0aGVuIHJlbW92ZSBpdFxuICAgICAgaWYgKHRoaXMuZnJhbWUgJiYgdGhpcy5mcmFtZS5jb250ZW50RG9jdW1lbnQpIHtcbiAgICAgICAgdGhpcy5yZW1vdmUodGhpcy5mcmFtZSk7XG4gICAgICAgIHRoaXMuZnJhbWUgPSBudWxsO1xuICAgICAgfSBlbHNlIGlmICh0aGlzLmZyYW1lKSB7IC8vIGVsc2Ugd2lwZSBpdHMgY29udGVudFxuICAgICAgICB0aGlzLmZyYW1lLmlubmVySFRNTCA9IFwiXCI7XG4gICAgICAgIHRoaXMuZnJhbWUuc3R5bGUuZGlzcGxheSA9IFwibm9uZVwiO1xuICAgICAgfVxuXG4gICAgICAvLyBOdWxsIG91dCBhbGwgdGhlIGZpZWxkcyBzbyB3ZSBkb24ndCBsZWFrIG1lbW9yeVxuICAgICAgbGV0IGZpZWxkcyA9IHRoaXMuZmllbGRzO1xuICAgICAgZm9yIChsZXQgaWQgaW4gZmllbGRzKSB7XG4gICAgICAgIGxldCBmaWVsZCA9IGZpZWxkc1tpZF07XG4gICAgICAgIGZpZWxkLndyYXBwZXIgPSBudWxsO1xuICAgICAgICBmaWVsZC5ub2RlID0gbnVsbDtcbiAgICAgIH1cblxuICAgICAgdGhpcy5vbkNsb3NlKCk7IC8vICBDYWxsIHRoZSBjbG9zZSgpIGNhbGxiYWNrIGZ1bmN0aW9uXG4gICAgICB0aGlzLmlzT3BlbiA9IGZhbHNlO1xuICAgIH0sXG5cbiAgICBzZXQ6IGZ1bmN0aW9uIChuYW1lLCB2YWwpIHtcbiAgICAgIHRoaXMuZmllbGRzW25hbWVdLnZhbHVlID0gdmFsO1xuXG4gICAgICBpZiAodGhpcy5maWVsZHNbbmFtZV0ubm9kZSkge1xuICAgICAgICB0aGlzLmZpZWxkc1tuYW1lXS5yZWxvYWQoKTtcbiAgICAgIH1cbiAgICB9LFxuXG4gICAgZ2V0OiBmdW5jdGlvbiAobmFtZSwgZ2V0TGl2ZSkge1xuICAgICAgLyogTWlncmF0aW9uIHdhcm5pbmcgKi9cbiAgICAgIGlmICghdGhpcy5pc0luaXQpIHtcbiAgICAgICAgdGhpcy5sb2coJ0dNX2NvbmZpZzogZ2V0IGNhbGxlZCBiZWZvcmUgaW5pdCwgc2VlIGh0dHBzOi8vZ2l0aHViLmNvbS9zaXp6bGVtY3R3aXp6bGUvR01fY29uZmlnL2lzc3Vlcy8xMTMnKTtcbiAgICAgIH1cblxuICAgICAgbGV0IGZpZWxkID0gdGhpcy5maWVsZHNbbmFtZV0sXG4gICAgICAgICAgZmllbGRWYWwgPSBudWxsO1xuXG4gICAgICBpZiAoZ2V0TGl2ZSAmJiBmaWVsZC5ub2RlKSB7XG4gICAgICAgIGZpZWxkVmFsID0gZmllbGQudG9WYWx1ZSgpO1xuICAgICAgfVxuXG4gICAgICByZXR1cm4gZmllbGRWYWwgIT0gbnVsbCA/IGZpZWxkVmFsIDogZmllbGQudmFsdWU7XG4gICAgfSxcblxuICAgIHdyaXRlOiBmdW5jdGlvbiAoc3RvcmUsIG9iaiwgY2IpIHtcbiAgICAgIGxldCBmb3Jnb3R0ZW4gPSBudWxsLFxuICAgICAgICAgIHZhbHVlcyA9IG51bGw7XG4gICAgICBpZiAoIW9iaikge1xuICAgICAgICBsZXQgZmllbGRzID0gdGhpcy5maWVsZHM7XG5cbiAgICAgICAgdmFsdWVzID0ge307XG4gICAgICAgIGZvcmdvdHRlbiA9IHt9O1xuXG4gICAgICAgIGZvciAobGV0IGlkIGluIGZpZWxkcykge1xuICAgICAgICAgIGxldCBmaWVsZCA9IGZpZWxkc1tpZF07XG4gICAgICAgICAgbGV0IHZhbHVlID0gZmllbGQudG9WYWx1ZSgpO1xuXG4gICAgICAgICAgaWYgKGZpZWxkLnNhdmUpIHtcbiAgICAgICAgICAgIGlmICh2YWx1ZSAhPSBudWxsKSB7XG4gICAgICAgICAgICAgIHZhbHVlc1tpZF0gPSB2YWx1ZTtcbiAgICAgICAgICAgICAgZmllbGQudmFsdWUgPSB2YWx1ZTtcbiAgICAgICAgICAgIH0gZWxzZVxuICAgICAgICAgICAgICB2YWx1ZXNbaWRdID0gZmllbGQudmFsdWU7XG4gICAgICAgICAgfSBlbHNlXG4gICAgICAgICAgICBmb3Jnb3R0ZW5baWRdID0gdmFsdWUgIT0gbnVsbCA/IHZhbHVlIDogZmllbGQudmFsdWU7XG4gICAgICAgIH1cbiAgICAgIH1cblxuICAgICAgKGFzeW5jICgpID0+IHtcbiAgICAgICAgdHJ5IHtcbiAgICAgICAgICBsZXQgdmFsID0gdGhpcy5zdHJpbmdpZnkob2JqIHx8IHZhbHVlcyk7XG4gICAgICAgICAgYXdhaXQgdGhpcy5zZXRWYWx1ZShzdG9yZSB8fCB0aGlzLmlkLCB2YWwpO1xuICAgICAgICB9IGNhdGNoKGUpIHtcbiAgICAgICAgICB0aGlzLmxvZyhcIkdNX2NvbmZpZyBmYWlsZWQgdG8gc2F2ZSBzZXR0aW5ncyFcIik7XG4gICAgICAgIH1cbiAgICAgICAgY2IoZm9yZ290dGVuKTtcbiAgICAgIH0pKCk7XG4gICAgfSxcblxuICAgIHJlYWQ6IGZ1bmN0aW9uIChzdG9yZSwgY2IpIHtcbiAgICAgIChhc3luYyAoKSA9PiB7XG4gICAgICAgIGxldCB2YWwgPSBhd2FpdCB0aGlzLmdldFZhbHVlKHN0b3JlIHx8IHRoaXMuaWQsICd7fScpO1xuICAgICAgICB0cnkge1xuICAgICAgICAgIGxldCBydmFsID0gdGhpcy5wYXJzZXIodmFsKTtcbiAgICAgICAgICBjYihydmFsKTtcbiAgICAgICAgfSBjYXRjaChlKSB7XG4gICAgICAgICAgdGhpcy5sb2coXCJHTV9jb25maWcgZmFpbGVkIHRvIHJlYWQgc2F2ZWQgc2V0dGluZ3MhXCIpO1xuICAgICAgICAgIGNiKHt9KTtcbiAgICAgICAgfVxuICAgICAgfSkoKTtcbiAgICB9LFxuXG4gICAgcmVzZXQ6IGZ1bmN0aW9uICgpIHtcbiAgICAgIGxldCBmaWVsZHMgPSB0aGlzLmZpZWxkcztcblxuICAgICAgLy8gUmVzZXQgYWxsIHRoZSBmaWVsZHNcbiAgICAgIGZvciAobGV0IGlkIGluIGZpZWxkcykgeyBmaWVsZHNbaWRdLnJlc2V0KCk7IH1cblxuICAgICAgdGhpcy5vblJlc2V0KCk7IC8vIENhbGwgdGhlIHJlc2V0KCkgY2FsbGJhY2sgZnVuY3Rpb25cbiAgICB9LFxuXG4gICAgY3JlYXRlOiBmdW5jdGlvbiAoKSB7XG4gICAgICBsZXQgQSA9IG51bGwsXG4gICAgICAgICAgQiA9IG51bGw7XG4gICAgICBzd2l0Y2goYXJndW1lbnRzLmxlbmd0aCkge1xuICAgICAgICBjYXNlIDE6XG4gICAgICAgICAgQSA9IGRvY3VtZW50LmNyZWF0ZVRleHROb2RlKGFyZ3VtZW50c1swXSk7XG4gICAgICAgICAgYnJlYWs7XG4gICAgICAgIGRlZmF1bHQ6XG4gICAgICAgICAgQSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoYXJndW1lbnRzWzBdKTtcbiAgICAgICAgICBCID0gYXJndW1lbnRzWzFdO1xuICAgICAgICAgIGZvciAobGV0IGIgaW4gQikge1xuICAgICAgICAgICAgaWYgKGIuaW5kZXhPZihcIm9uXCIpID09IDApXG4gICAgICAgICAgICAgIEEuYWRkRXZlbnRMaXN0ZW5lcihiLnN1YnN0cmluZygyKSwgQltiXSwgZmFsc2UpO1xuICAgICAgICAgICAgZWxzZSBpZiAoXCIsc3R5bGUsYWNjZXNza2V5LGlkLG5hbWUsc3JjLGhyZWYsd2hpY2gsZm9yXCIuaW5kZXhPZihcIixcIiArXG4gICAgICAgICAgICAgICAgICAgICBiLnRvTG93ZXJDYXNlKCkpICE9IC0xKVxuICAgICAgICAgICAgICBBLnNldEF0dHJpYnV0ZShiLCBCW2JdKTtcbiAgICAgICAgICAgIGVsc2VcbiAgICAgICAgICAgICAgQVtiXSA9IEJbYl07XG4gICAgICAgICAgfVxuICAgICAgICAgIGlmICh0eXBlb2YgYXJndW1lbnRzWzJdID09IFwic3RyaW5nXCIpXG4gICAgICAgICAgICBBLmlubmVySFRNTCA9IGFyZ3VtZW50c1syXTtcbiAgICAgICAgICBlbHNlXG4gICAgICAgICAgICBmb3IgKGxldCBpID0gMiwgbGVuID0gYXJndW1lbnRzLmxlbmd0aDsgaSA8IGxlbjsgKytpKVxuICAgICAgICAgICAgICBBLmFwcGVuZENoaWxkKGFyZ3VtZW50c1tpXSk7XG4gICAgICB9XG4gICAgICByZXR1cm4gQTtcbiAgICB9LFxuXG4gICAgY2VudGVyOiBmdW5jdGlvbiAoKSB7XG4gICAgICBsZXQgbm9kZSA9IHRoaXMuZnJhbWU7XG4gICAgICBpZiAoIW5vZGUpIHJldHVybjtcbiAgICAgIGxldCBzdHlsZSA9IG5vZGUuc3R5bGUsXG4gICAgICAgICAgYmVmb3JlT3BhY2l0eSA9IHN0eWxlLm9wYWNpdHk7XG4gICAgICBpZiAoc3R5bGUuZGlzcGxheSA9PSAnbm9uZScpIHN0eWxlLm9wYWNpdHkgPSAnMCc7XG4gICAgICBzdHlsZS5kaXNwbGF5ID0gJyc7XG4gICAgICBzdHlsZS50b3AgPSBNYXRoLmZsb29yKCh3aW5kb3cuaW5uZXJIZWlnaHQgLyAyKSAtIChub2RlLm9mZnNldEhlaWdodCAvIDIpKSArICdweCc7XG4gICAgICBzdHlsZS5sZWZ0ID0gTWF0aC5mbG9vcigod2luZG93LmlubmVyV2lkdGggLyAyKSAtIChub2RlLm9mZnNldFdpZHRoIC8gMikpICsgJ3B4JztcbiAgICAgIHN0eWxlLm9wYWNpdHkgPSAnMSc7XG4gICAgfSxcblxuICAgIHJlbW92ZTogZnVuY3Rpb24gKGVsKSB7XG4gICAgICBpZiAoZWwgJiYgZWwucGFyZW50Tm9kZSkgZWwucGFyZW50Tm9kZS5yZW1vdmVDaGlsZChlbCk7XG4gICAgfVxuICB9O1xuXG4gIGNvbnN0cnVjdC5wcm90b3R5cGUubmFtZSA9ICdHTV9jb25maWcnO1xuICBjb25zdHJ1Y3QucHJvdG90eXBlLmNvbnN0cnVjdG9yID0gY29uc3RydWN0O1xuICBsZXQgaXNHTTQgPSB0eXBlb2YgR00uZ2V0VmFsdWUgIT09ICd1bmRlZmluZWQnICYmXG4gICAgdHlwZW9mIEdNLnNldFZhbHVlICE9PSAndW5kZWZpbmVkJztcbiAgbGV0IGlzR00gPSBpc0dNNCB8fCAodHlwZW9mIEdNX2dldFZhbHVlICE9PSAndW5kZWZpbmVkJyAmJlxuICAgIHR5cGVvZiBHTV9nZXRWYWx1ZSgnYScsICdiJykgIT09ICd1bmRlZmluZWQnKTtcbiAgY29uc3RydWN0LnByb3RvdHlwZS5pc0dNID0gaXNHTTtcblxuICBpZiAoIWlzR000KSB7XG4gICAgbGV0IHByb21pc2lmeSA9IChvbGQpID0+ICguLi5hcmdzKSA9PiB7XG4gICAgICByZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCkgPT4ge1xuICAgICAgICB0cnkge1xuICAgICAgICAgIHJlc29sdmUob2xkLmFwcGx5KHRoaXMsIGFyZ3MpKTtcbiAgICAgICAgfSBjYXRjaCAoZSkge1xuICAgICAgICAgIHJlamVjdChlKTtcbiAgICAgICAgfVxuICAgICAgfSk7XG4gICAgfTtcblxuICAgIGxldCBnZXRWYWx1ZSA9IGlzR00gPyBHTV9nZXRWYWx1ZVxuICAgICAgOiAobmFtZSwgZGVmKSA9PiB7XG4gICAgICAgIGxldCBzID0gbG9jYWxTdG9yYWdlLmdldEl0ZW0obmFtZSk7XG4gICAgICAgIHJldHVybiBzICE9PSBudWxsID8gcyA6IGRlZjtcbiAgICAgIH07XG4gICAgbGV0IHNldFZhbHVlID0gaXNHTSA/IEdNX3NldFZhbHVlXG4gICAgICA6IChuYW1lLCB2YWx1ZSkgPT4gbG9jYWxTdG9yYWdlLnNldEl0ZW0obmFtZSwgdmFsdWUpO1xuICAgIGxldCBsb2cgPSB0eXBlb2YgR01fbG9nICE9PSAndW5kZWZpbmVkJyA/IEdNX2xvZyA6IGNvbnNvbGUubG9nO1xuXG4gICAgR00uZ2V0VmFsdWUgPSBwcm9taXNpZnkoZ2V0VmFsdWUpO1xuICAgIEdNLnNldFZhbHVlID0gcHJvbWlzaWZ5KHNldFZhbHVlKTtcbiAgICBHTS5sb2cgPSBwcm9taXNpZnkobG9nKTtcbiAgfVxuXG4gIGNvbnN0cnVjdC5wcm90b3R5cGUuc3RyaW5naWZ5ID0gSlNPTi5zdHJpbmdpZnk7XG4gIGNvbnN0cnVjdC5wcm90b3R5cGUucGFyc2VyID0gSlNPTi5wYXJzZTtcbiAgY29uc3RydWN0LnByb3RvdHlwZS5nZXRWYWx1ZSA9IEdNLmdldFZhbHVlO1xuICBjb25zdHJ1Y3QucHJvdG90eXBlLnNldFZhbHVlID0gR00uc2V0VmFsdWU7XG4gIGNvbnN0cnVjdC5wcm90b3R5cGUubG9nID0gR00ubG9nIHx8IGNvbnNvbGUubG9nO1xuXG4gIC8vIFBhc3N0aHJvdWdoIGZyb250ZW5kcyBmb3IgbmV3IGFuZCBvbGQgdXNhZ2VcbiAgbGV0IGNvbmZpZyA9IGZ1bmN0aW9uICgpIHtcbiAgICByZXR1cm4gbmV3IChjb25maWcuYmluZC5hcHBseShjb25zdHJ1Y3QsXG4gICAgICBbbnVsbF0uY29uY2F0KEFycmF5LmZyb20oYXJndW1lbnRzKSkpKTtcbiAgfTtcbiAgY29uZmlnLnByb3RvdHlwZS5jb25zdHJ1Y3RvciA9IGNvbmZpZztcblxuICAvLyBTdXBwb3J0IG9sZCBtZXRob2Qgb2YgaW5pdGFsaXppbmdcbiAgY29uZmlnLmluaXQgPSBmdW5jdGlvbiAoKSB7XG4gICAgR01fY29uZmlnID0gY29uZmlnLmFwcGx5KHRoaXMsIGFyZ3VtZW50cyk7XG4gICAgR01fY29uZmlnLmluaXQgPSBmdW5jdGlvbigpIHtcbiAgICAgIEdNX2NvbmZpZ0luaXQodGhpcywgYXJndW1lbnRzKTtcbiAgICB9O1xuICB9O1xuXG4gIC8vIFJldXNhYmxlIGZ1bmN0aW9ucyBhbmQgcHJvcGVydGllc1xuICAvLyBVc2FibGUgdmlhIEdNX2NvbmZpZy4qXG4gIGNvbmZpZy5jcmVhdGUgPSBjb25zdHJ1Y3QucHJvdG90eXBlLmNyZWF0ZTtcbiAgY29uZmlnLmlzR00gPSBjb25zdHJ1Y3QucHJvdG90eXBlLmlzR007XG4gIGNvbmZpZy5zZXRWYWx1ZSA9IGNvbnN0cnVjdC5wcm90b3R5cGUuc2V0VmFsdWU7XG4gIGNvbmZpZy5nZXRWYWx1ZSA9IGNvbnN0cnVjdC5wcm90b3R5cGUuZ2V0VmFsdWU7XG4gIGNvbmZpZy5zdHJpbmdpZnkgPSBjb25zdHJ1Y3QucHJvdG90eXBlLnN0cmluZ2lmeTtcbiAgY29uZmlnLnBhcnNlciA9IGNvbnN0cnVjdC5wcm90b3R5cGUucGFyc2VyO1xuICBjb25maWcubG9nID0gY29uc3RydWN0LnByb3RvdHlwZS5sb2c7XG4gIGNvbmZpZy5yZW1vdmUgPSBjb25zdHJ1Y3QucHJvdG90eXBlLnJlbW92ZTtcbiAgY29uZmlnLnJlYWQgPSBjb25zdHJ1Y3QucHJvdG90eXBlLnJlYWQuYmluZChjb25maWcpO1xuICBjb25maWcud3JpdGUgPSBjb25zdHJ1Y3QucHJvdG90eXBlLndyaXRlLmJpbmQoY29uZmlnKTtcblxuICByZXR1cm4gY29uZmlnO1xufSh0eXBlb2YgR00gPT09ICdvYmplY3QnID8gR00gOiBPYmplY3QuY3JlYXRlKG51bGwpKSk7XG5sZXQgR01fY29uZmlnU3RydWN0ID0gR01fY29uZmlnO1xuXG5mdW5jdGlvbiBHTV9jb25maWdGaWVsZChzZXR0aW5ncywgc3RvcmVkLCBpZCwgY3VzdG9tVHlwZSwgY29uZmlnSWQpIHtcbiAgLy8gU3RvcmUgdGhlIGZpZWxkJ3Mgc2V0dGluZ3NcbiAgdGhpcy5zZXR0aW5ncyA9IHNldHRpbmdzO1xuICB0aGlzLmlkID0gaWQ7XG4gIHRoaXMuY29uZmlnSWQgPSBjb25maWdJZDtcbiAgdGhpcy5ub2RlID0gbnVsbDtcbiAgdGhpcy53cmFwcGVyID0gbnVsbDtcbiAgdGhpcy5zYXZlID0gdHlwZW9mIHNldHRpbmdzLnNhdmUgPT0gXCJ1bmRlZmluZWRcIiA/IHRydWUgOiBzZXR0aW5ncy5zYXZlO1xuXG4gIC8vIEJ1dHRvbnMgYXJlIHN0YXRpYyBhbmQgZG9uJ3QgaGF2ZSBhIHN0b3JlZCB2YWx1ZVxuICBpZiAoc2V0dGluZ3MudHlwZSA9PSBcImJ1dHRvblwiKSB0aGlzLnNhdmUgPSBmYWxzZTtcblxuICAvLyBpZiBhIGRlZmF1bHQgdmFsdWUgd2Fzbid0IHBhc3NlZCB0aHJvdWdoIGluaXQoKSB0aGVuXG4gIC8vICAgaWYgdGhlIHR5cGUgaXMgY3VzdG9tIHVzZSBpdHMgZGVmYXVsdCB2YWx1ZVxuICAvLyAgIGVsc2UgdXNlIGRlZmF1bHQgdmFsdWUgZm9yIHR5cGVcbiAgLy8gZWxzZSB1c2UgdGhlIGRlZmF1bHQgdmFsdWUgcGFzc2VkIHRocm91Z2ggaW5pdCgpXG4gIHRoaXNbJ2RlZmF1bHQnXSA9IHR5cGVvZiBzZXR0aW5nc1snZGVmYXVsdCddID09IFwidW5kZWZpbmVkXCIgP1xuICAgIGN1c3RvbVR5cGUgP1xuICAgICAgY3VzdG9tVHlwZVsnZGVmYXVsdCddXG4gICAgICA6IHRoaXMuZGVmYXVsdFZhbHVlKHNldHRpbmdzLnR5cGUsIHNldHRpbmdzLm9wdGlvbnMpXG4gICAgOiBzZXR0aW5nc1snZGVmYXVsdCddO1xuXG4gIC8vIFN0b3JlIHRoZSBmaWVsZCdzIHZhbHVlXG4gIHRoaXMudmFsdWUgPSB0eXBlb2Ygc3RvcmVkID09IFwidW5kZWZpbmVkXCIgPyB0aGlzWydkZWZhdWx0J10gOiBzdG9yZWQ7XG5cbiAgLy8gU2V0dXAgbWV0aG9kcyBmb3IgYSBjdXN0b20gdHlwZVxuICBpZiAoY3VzdG9tVHlwZSkge1xuICAgIHRoaXMudG9Ob2RlID0gY3VzdG9tVHlwZS50b05vZGU7XG4gICAgdGhpcy50b1ZhbHVlID0gY3VzdG9tVHlwZS50b1ZhbHVlO1xuICAgIHRoaXMucmVzZXQgPSBjdXN0b21UeXBlLnJlc2V0O1xuICB9XG59XG5cbkdNX2NvbmZpZ0ZpZWxkLnByb3RvdHlwZSA9IHtcbiAgY3JlYXRlOiBHTV9jb25maWcuY3JlYXRlLFxuXG4gIGRlZmF1bHRWYWx1ZTogZnVuY3Rpb24odHlwZSwgb3B0aW9ucykge1xuICAgIGxldCB2YWx1ZTtcblxuICAgIGlmICh0eXBlLmluZGV4T2YoJ3Vuc2lnbmVkICcpID09IDApXG4gICAgICB0eXBlID0gdHlwZS5zdWJzdHJpbmcoOSk7XG5cbiAgICBzd2l0Y2ggKHR5cGUpIHtcbiAgICAgIGNhc2UgJ3JhZGlvJzogY2FzZSAnc2VsZWN0JzpcbiAgICAgICAgdmFsdWUgPSBvcHRpb25zWzBdO1xuICAgICAgICBicmVhaztcbiAgICAgIGNhc2UgJ2NoZWNrYm94JzpcbiAgICAgICAgdmFsdWUgPSBmYWxzZTtcbiAgICAgICAgYnJlYWs7XG4gICAgICBjYXNlICdpbnQnOiBjYXNlICdpbnRlZ2VyJzpcbiAgICAgIGNhc2UgJ2Zsb2F0JzogY2FzZSAnbnVtYmVyJzpcbiAgICAgICAgdmFsdWUgPSAwO1xuICAgICAgICBicmVhaztcbiAgICAgIGRlZmF1bHQ6XG4gICAgICAgIHZhbHVlID0gJyc7XG4gICAgfVxuXG4gICAgcmV0dXJuIHZhbHVlO1xuICB9LFxuXG4gIHRvTm9kZTogZnVuY3Rpb24oKSB7XG4gICAgbGV0IGZpZWxkID0gdGhpcy5zZXR0aW5ncyxcbiAgICAgICAgdmFsdWUgPSB0aGlzLnZhbHVlLFxuICAgICAgICBvcHRpb25zID0gZmllbGQub3B0aW9ucyxcbiAgICAgICAgdHlwZSA9IGZpZWxkLnR5cGUsXG4gICAgICAgIGlkID0gdGhpcy5pZCxcbiAgICAgICAgY29uZmlnSWQgPSB0aGlzLmNvbmZpZ0lkLFxuICAgICAgICBsYWJlbFBvcyA9IGZpZWxkLmxhYmVsUG9zLFxuICAgICAgICBjcmVhdGUgPSB0aGlzLmNyZWF0ZTtcblxuICAgIGZ1bmN0aW9uIGFkZExhYmVsKHBvcywgbGFiZWxFbCwgcGFyZW50Tm9kZSwgYmVmb3JlRWwpIHtcbiAgICAgIGlmICghYmVmb3JlRWwpIGJlZm9yZUVsID0gcGFyZW50Tm9kZS5maXJzdENoaWxkO1xuICAgICAgc3dpdGNoIChwb3MpIHtcbiAgICAgICAgY2FzZSAncmlnaHQnOiBjYXNlICdiZWxvdyc6XG4gICAgICAgICAgaWYgKHBvcyA9PSAnYmVsb3cnKVxuICAgICAgICAgICAgcGFyZW50Tm9kZS5hcHBlbmRDaGlsZChjcmVhdGUoJ2JyJywge30pKTtcbiAgICAgICAgICBwYXJlbnROb2RlLmFwcGVuZENoaWxkKGxhYmVsRWwpO1xuICAgICAgICAgIGJyZWFrO1xuICAgICAgICBkZWZhdWx0OlxuICAgICAgICAgIGlmIChwb3MgPT0gJ2Fib3ZlJylcbiAgICAgICAgICAgIHBhcmVudE5vZGUuaW5zZXJ0QmVmb3JlKGNyZWF0ZSgnYnInLCB7fSksIGJlZm9yZUVsKTtcbiAgICAgICAgICBwYXJlbnROb2RlLmluc2VydEJlZm9yZShsYWJlbEVsLCBiZWZvcmVFbCk7XG4gICAgICB9XG4gICAgfVxuXG4gICAgbGV0IHJldE5vZGUgPSBjcmVhdGUoJ2RpdicsIHsgY2xhc3NOYW1lOiAnY29uZmlnX3ZhcicsXG4gICAgICAgICAgaWQ6IGNvbmZpZ0lkICsgJ18nICsgaWQgKyAnX3ZhcicsXG4gICAgICAgICAgdGl0bGU6IGZpZWxkLnRpdGxlIHx8ICcnIH0pLFxuICAgICAgICBmaXJzdFByb3A7XG5cbiAgICAvLyBSZXRyaWV2ZSB0aGUgZmlyc3QgcHJvcFxuICAgIGZvciAobGV0IGkgaW4gZmllbGQpIHsgZmlyc3RQcm9wID0gaTsgYnJlYWs7IH1cblxuICAgIGxldCBsYWJlbCA9IGZpZWxkLmxhYmVsICYmIHR5cGUgIT0gXCJidXR0b25cIiA/XG4gICAgICBjcmVhdGUoJ2xhYmVsJywge1xuICAgICAgICBpZDogY29uZmlnSWQgKyAnXycgKyBpZCArICdfZmllbGRfbGFiZWwnLFxuICAgICAgICBmb3I6IGNvbmZpZ0lkICsgJ19maWVsZF8nICsgaWQsXG4gICAgICAgIGNsYXNzTmFtZTogJ2ZpZWxkX2xhYmVsJ1xuICAgICAgfSwgZmllbGQubGFiZWwpIDogbnVsbDtcblxuICAgIGxldCB3cmFwID0gbnVsbDtcbiAgICBzd2l0Y2ggKHR5cGUpIHtcbiAgICAgIGNhc2UgJ3RleHRhcmVhJzpcbiAgICAgICAgcmV0Tm9kZS5hcHBlbmRDaGlsZCgodGhpcy5ub2RlID0gY3JlYXRlKCd0ZXh0YXJlYScsIHtcbiAgICAgICAgICBpbm5lckhUTUw6IHZhbHVlLFxuICAgICAgICAgIGlkOiBjb25maWdJZCArICdfZmllbGRfJyArIGlkLFxuICAgICAgICAgIGNsYXNzTmFtZTogJ2Jsb2NrJyxcbiAgICAgICAgICBjb2xzOiAoZmllbGQuY29scyA/IGZpZWxkLmNvbHMgOiAyMCksXG4gICAgICAgICAgcm93czogKGZpZWxkLnJvd3MgPyBmaWVsZC5yb3dzIDogMilcbiAgICAgICAgfSkpKTtcbiAgICAgICAgYnJlYWs7XG4gICAgICBjYXNlICdyYWRpbyc6XG4gICAgICAgIHdyYXAgPSBjcmVhdGUoJ2RpdicsIHtcbiAgICAgICAgICBpZDogY29uZmlnSWQgKyAnX2ZpZWxkXycgKyBpZFxuICAgICAgICB9KTtcbiAgICAgICAgdGhpcy5ub2RlID0gd3JhcDtcblxuICAgICAgICBmb3IgKGxldCBpID0gMCwgbGVuID0gb3B0aW9ucy5sZW5ndGg7IGkgPCBsZW47ICsraSkge1xuICAgICAgICAgIGxldCByYWRMYWJlbCA9IGNyZWF0ZSgnbGFiZWwnLCB7XG4gICAgICAgICAgICBjbGFzc05hbWU6ICdyYWRpb19sYWJlbCdcbiAgICAgICAgICB9LCBvcHRpb25zW2ldKTtcblxuICAgICAgICAgIGxldCByYWQgPSB3cmFwLmFwcGVuZENoaWxkKGNyZWF0ZSgnaW5wdXQnLCB7XG4gICAgICAgICAgICB2YWx1ZTogb3B0aW9uc1tpXSxcbiAgICAgICAgICAgIHR5cGU6ICdyYWRpbycsXG4gICAgICAgICAgICBuYW1lOiBpZCxcbiAgICAgICAgICAgIGNoZWNrZWQ6IG9wdGlvbnNbaV0gPT0gdmFsdWVcbiAgICAgICAgICB9KSk7XG5cbiAgICAgICAgICBsZXQgcmFkTGFiZWxQb3MgPSBsYWJlbFBvcyAmJlxuICAgICAgICAgICAgKGxhYmVsUG9zID09ICdsZWZ0JyB8fCBsYWJlbFBvcyA9PSAncmlnaHQnKSA/XG4gICAgICAgICAgICBsYWJlbFBvcyA6IGZpcnN0UHJvcCA9PSAnb3B0aW9ucycgPyAnbGVmdCcgOiAncmlnaHQnO1xuXG4gICAgICAgICAgYWRkTGFiZWwocmFkTGFiZWxQb3MsIHJhZExhYmVsLCB3cmFwLCByYWQpO1xuICAgICAgICB9XG5cbiAgICAgICAgcmV0Tm9kZS5hcHBlbmRDaGlsZCh3cmFwKTtcbiAgICAgICAgYnJlYWs7XG4gICAgICBjYXNlICdzZWxlY3QnOlxuICAgICAgICB3cmFwID0gY3JlYXRlKCdzZWxlY3QnLCB7XG4gICAgICAgICAgaWQ6IGNvbmZpZ0lkICsgJ19maWVsZF8nICsgaWRcbiAgICAgICAgfSk7XG4gICAgICAgIHRoaXMubm9kZSA9IHdyYXA7XG5cbiAgICAgICAgZm9yIChsZXQgaSA9IDAsIGxlbiA9IG9wdGlvbnMubGVuZ3RoOyBpIDwgbGVuOyArK2kpIHtcbiAgICAgICAgICBsZXQgb3B0aW9uID0gb3B0aW9uc1tpXTtcbiAgICAgICAgICB3cmFwLmFwcGVuZENoaWxkKGNyZWF0ZSgnb3B0aW9uJywge1xuICAgICAgICAgICAgdmFsdWU6IG9wdGlvbixcbiAgICAgICAgICAgIHNlbGVjdGVkOiBvcHRpb24gPT0gdmFsdWVcbiAgICAgICAgICB9LCBvcHRpb24pKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHJldE5vZGUuYXBwZW5kQ2hpbGQod3JhcCk7XG4gICAgICAgIGJyZWFrO1xuICAgICAgZGVmYXVsdDogLy8gZmllbGRzIHVzaW5nIGlucHV0IGVsZW1lbnRzXG4gICAgICAgIGxldCBwcm9wcyA9IHtcbiAgICAgICAgICBpZDogY29uZmlnSWQgKyAnX2ZpZWxkXycgKyBpZCxcbiAgICAgICAgICB0eXBlOiB0eXBlLFxuICAgICAgICAgIHZhbHVlOiB0eXBlID09ICdidXR0b24nID8gZmllbGQubGFiZWwgOiB2YWx1ZVxuICAgICAgICB9O1xuXG4gICAgICAgIHN3aXRjaCAodHlwZSkge1xuICAgICAgICAgIGNhc2UgJ2NoZWNrYm94JzpcbiAgICAgICAgICAgIHByb3BzLmNoZWNrZWQgPSB2YWx1ZTtcbiAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgIGNhc2UgJ2J1dHRvbic6XG4gICAgICAgICAgICBwcm9wcy5zaXplID0gZmllbGQuc2l6ZSA/IGZpZWxkLnNpemUgOiAyNTtcbiAgICAgICAgICAgIGlmIChmaWVsZC5zY3JpcHQpIGZpZWxkLmNsaWNrID0gZmllbGQuc2NyaXB0O1xuICAgICAgICAgICAgaWYgKGZpZWxkLmNsaWNrKSBwcm9wcy5vbmNsaWNrID0gZmllbGQuY2xpY2s7XG4gICAgICAgICAgICBicmVhaztcbiAgICAgICAgICBjYXNlICdoaWRkZW4nOlxuICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgZGVmYXVsdDpcbiAgICAgICAgICAgIC8vIHR5cGUgPSB0ZXh0LCBpbnQsIG9yIGZsb2F0XG4gICAgICAgICAgICBwcm9wcy50eXBlID0gJ3RleHQnO1xuICAgICAgICAgICAgcHJvcHMuc2l6ZSA9IGZpZWxkLnNpemUgPyBmaWVsZC5zaXplIDogMjU7XG4gICAgICAgIH1cblxuICAgICAgICByZXROb2RlLmFwcGVuZENoaWxkKCh0aGlzLm5vZGUgPSBjcmVhdGUoJ2lucHV0JywgcHJvcHMpKSk7XG4gICAgfVxuXG4gICAgaWYgKGxhYmVsKSB7XG4gICAgICAvLyBJZiB0aGUgbGFiZWwgaXMgcGFzc2VkIGZpcnN0LCBpbnNlcnQgaXQgYmVmb3JlIHRoZSBmaWVsZFxuICAgICAgLy8gZWxzZSBpbnNlcnQgaXQgYWZ0ZXJcbiAgICAgIGlmICghbGFiZWxQb3MpXG4gICAgICAgIGxhYmVsUG9zID0gZmlyc3RQcm9wID09IFwibGFiZWxcIiB8fCB0eXBlID09IFwicmFkaW9cIiA/XG4gICAgICAgICAgXCJsZWZ0XCIgOiBcInJpZ2h0XCI7XG5cbiAgICAgIGFkZExhYmVsKGxhYmVsUG9zLCBsYWJlbCwgcmV0Tm9kZSk7XG4gICAgfVxuXG4gICAgcmV0dXJuIHJldE5vZGU7XG4gIH0sXG5cbiAgdG9WYWx1ZTogZnVuY3Rpb24oKSB7XG4gICAgbGV0IG5vZGUgPSB0aGlzLm5vZGUsXG4gICAgICAgIGZpZWxkID0gdGhpcy5zZXR0aW5ncyxcbiAgICAgICAgdHlwZSA9IGZpZWxkLnR5cGUsXG4gICAgICAgIHVuc2lnbmVkID0gZmFsc2UsXG4gICAgICAgIHJ2YWwgPSBudWxsO1xuXG4gICAgaWYgKCFub2RlKSByZXR1cm4gcnZhbDtcblxuICAgIGlmICh0eXBlLmluZGV4T2YoJ3Vuc2lnbmVkICcpID09IDApIHtcbiAgICAgIHR5cGUgPSB0eXBlLnN1YnN0cmluZyg5KTtcbiAgICAgIHVuc2lnbmVkID0gdHJ1ZTtcbiAgICB9XG5cbiAgICBzd2l0Y2ggKHR5cGUpIHtcbiAgICAgIGNhc2UgJ2NoZWNrYm94JzpcbiAgICAgICAgcnZhbCA9IG5vZGUuY2hlY2tlZDtcbiAgICAgICAgYnJlYWs7XG4gICAgICBjYXNlICdzZWxlY3QnOlxuICAgICAgICBydmFsID0gbm9kZVtub2RlLnNlbGVjdGVkSW5kZXhdLnZhbHVlO1xuICAgICAgICBicmVhaztcbiAgICAgIGNhc2UgJ3JhZGlvJzpcbiAgICAgICAgbGV0IHJhZGlvcyA9IG5vZGUuZ2V0RWxlbWVudHNCeVRhZ05hbWUoJ2lucHV0Jyk7XG4gICAgICAgIGZvciAobGV0IGkgPSAwLCBsZW4gPSByYWRpb3MubGVuZ3RoOyBpIDwgbGVuOyArK2kpIHtcbiAgICAgICAgICBpZiAocmFkaW9zW2ldLmNoZWNrZWQpXG4gICAgICAgICAgICBydmFsID0gcmFkaW9zW2ldLnZhbHVlO1xuICAgICAgICB9XG4gICAgICAgIGJyZWFrO1xuICAgICAgY2FzZSAnYnV0dG9uJzpcbiAgICAgICAgYnJlYWs7XG4gICAgICBjYXNlICdpbnQnOiBjYXNlICdpbnRlZ2VyJzpcbiAgICAgIGNhc2UgJ2Zsb2F0JzogY2FzZSAnbnVtYmVyJzpcbiAgICAgICAgbGV0IG51bSA9IE51bWJlcihub2RlLnZhbHVlKTtcbiAgICAgICAgbGV0IHdhcm4gPSAnRmllbGQgbGFiZWxlZCBcIicgKyBmaWVsZC5sYWJlbCArICdcIiBleHBlY3RzIGEnICtcbiAgICAgICAgICAodW5zaWduZWQgPyAnIHBvc2l0aXZlICcgOiAnbiAnKSArICdpbnRlZ2VyIHZhbHVlJztcblxuICAgICAgICBpZiAoaXNOYU4obnVtKSB8fCAodHlwZS5zdWJzdHIoMCwgMykgPT0gJ2ludCcgJiZcbiAgICAgICAgICAgIE1hdGguY2VpbChudW0pICE9IE1hdGguZmxvb3IobnVtKSkgfHxcbiAgICAgICAgICAgICh1bnNpZ25lZCAmJiBudW0gPCAwKSkge1xuICAgICAgICAgIGFsZXJ0KHdhcm4gKyAnLicpO1xuICAgICAgICAgIHJldHVybiBudWxsO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKCF0aGlzLl9jaGVja051bWJlclJhbmdlKG51bSwgd2FybikpXG4gICAgICAgICAgcmV0dXJuIG51bGw7XG4gICAgICAgIHJ2YWwgPSBudW07XG4gICAgICAgIGJyZWFrO1xuICAgICAgZGVmYXVsdDpcbiAgICAgICAgcnZhbCA9IG5vZGUudmFsdWU7XG4gICAgICAgIGJyZWFrO1xuICAgIH1cblxuICAgIHJldHVybiBydmFsOyAvLyB2YWx1ZSByZWFkIHN1Y2Nlc3NmdWxseVxuICB9LFxuXG4gIHJlc2V0OiBmdW5jdGlvbigpIHtcbiAgICBsZXQgbm9kZSA9IHRoaXMubm9kZSxcbiAgICAgICAgZmllbGQgPSB0aGlzLnNldHRpbmdzLFxuICAgICAgICB0eXBlID0gZmllbGQudHlwZTtcblxuICAgIGlmICghbm9kZSkgcmV0dXJuO1xuXG4gICAgc3dpdGNoICh0eXBlKSB7XG4gICAgICBjYXNlICdjaGVja2JveCc6XG4gICAgICAgIG5vZGUuY2hlY2tlZCA9IHRoaXNbJ2RlZmF1bHQnXTtcbiAgICAgICAgYnJlYWs7XG4gICAgICBjYXNlICdzZWxlY3QnOlxuICAgICAgICBmb3IgKGxldCBpID0gMCwgbGVuID0gbm9kZS5vcHRpb25zLmxlbmd0aDsgaSA8IGxlbjsgKytpKSB7XG4gICAgICAgICAgaWYgKG5vZGUub3B0aW9uc1tpXS50ZXh0Q29udGVudCA9PSB0aGlzWydkZWZhdWx0J10pXG4gICAgICAgICAgICBub2RlLnNlbGVjdGVkSW5kZXggPSBpO1xuICAgICAgICB9XG4gICAgICAgIGJyZWFrO1xuICAgICAgY2FzZSAncmFkaW8nOlxuICAgICAgICBsZXQgcmFkaW9zID0gbm9kZS5nZXRFbGVtZW50c0J5VGFnTmFtZSgnaW5wdXQnKTtcbiAgICAgICAgZm9yIChsZXQgaSA9IDAsIGxlbiA9IHJhZGlvcy5sZW5ndGg7IGkgPCBsZW47ICsraSkge1xuICAgICAgICAgIGlmIChyYWRpb3NbaV0udmFsdWUgPT0gdGhpc1snZGVmYXVsdCddKVxuICAgICAgICAgICAgcmFkaW9zW2ldLmNoZWNrZWQgPSB0cnVlO1xuICAgICAgICB9XG4gICAgICAgIGJyZWFrO1xuICAgICAgY2FzZSAnYnV0dG9uJyA6XG4gICAgICAgIGJyZWFrO1xuICAgICAgZGVmYXVsdDpcbiAgICAgICAgbm9kZS52YWx1ZSA9IHRoaXNbJ2RlZmF1bHQnXTtcbiAgICAgICAgYnJlYWs7XG4gICAgICB9XG4gIH0sXG5cbiAgcmVtb3ZlOiBmdW5jdGlvbigpIHtcbiAgICBHTV9jb25maWcucmVtb3ZlKHRoaXMud3JhcHBlcik7XG4gICAgdGhpcy53cmFwcGVyID0gbnVsbDtcbiAgICB0aGlzLm5vZGUgPSBudWxsO1xuICB9LFxuXG4gIHJlbG9hZDogZnVuY3Rpb24oKSB7XG4gICAgbGV0IHdyYXBwZXIgPSB0aGlzLndyYXBwZXI7XG4gICAgaWYgKHdyYXBwZXIpIHtcbiAgICAgIGxldCBmaWVsZFBhcmVudCA9IHdyYXBwZXIucGFyZW50Tm9kZTtcbiAgICAgIGxldCBuZXdXcmFwcGVyID0gdGhpcy50b05vZGUoKTtcbiAgICAgIGZpZWxkUGFyZW50Lmluc2VydEJlZm9yZShuZXdXcmFwcGVyLCB3cmFwcGVyKTtcbiAgICAgIEdNX2NvbmZpZy5yZW1vdmUodGhpcy53cmFwcGVyKTtcbiAgICAgIHRoaXMud3JhcHBlciA9IG5ld1dyYXBwZXI7XG4gICAgfVxuICB9LFxuXG4gIF9jaGVja051bWJlclJhbmdlOiBmdW5jdGlvbihudW0sIHdhcm4pIHtcbiAgICBsZXQgZmllbGQgPSB0aGlzLnNldHRpbmdzO1xuICAgIGlmICh0eXBlb2YgZmllbGQubWluID09IFwibnVtYmVyXCIgJiYgbnVtIDwgZmllbGQubWluKSB7XG4gICAgICBhbGVydCh3YXJuICsgJyBncmVhdGVyIHRoYW4gb3IgZXF1YWwgdG8gJyArIGZpZWxkLm1pbiArICcuJyk7XG4gICAgICByZXR1cm4gbnVsbDtcbiAgICB9XG5cbiAgICBpZiAodHlwZW9mIGZpZWxkLm1heCA9PSBcIm51bWJlclwiICYmIG51bSA+IGZpZWxkLm1heCkge1xuICAgICAgYWxlcnQod2FybiArICcgbGVzcyB0aGFuIG9yIGVxdWFsIHRvICcgKyBmaWVsZC5tYXggKyAnLicpO1xuICAgICAgcmV0dXJuIG51bGw7XG4gICAgfVxuICAgIHJldHVybiB0cnVlO1xuICB9XG59O1xuXG5leHBvcnRzLkdNX2NvbmZpZyA9IEdNX2NvbmZpZztcbmV4cG9ydHMuR01fY29uZmlnU3RydWN0ID0gR01fY29uZmlnU3RydWN0O1xuZXhwb3J0cy5HTV9jb25maWdGaWVsZCA9IEdNX2NvbmZpZ0ZpZWxkOyIsImV4cG9ydCBjb25zdCBidWlsZEZldGNoSGFuZGxlciA9IChoYW5kbGVyKSA9PiB7XG4gICAgaWYgKHR5cGVvZiBoYW5kbGVyID09PSAnb2JqZWN0Jykge1xuICAgICAgICByZXR1cm4gaGFuZGxlci5oYW5kbGUuYmluZChoYW5kbGVyKTtcbiAgICB9XG4gICAgcmV0dXJuIGhhbmRsZXI7XG59O1xuZXhwb3J0IGNvbnN0IHNpbXBsZUZldGNoSGFuZGxlciA9ICh7IHNlcnZpY2UsIGZldGNoOiBfZmV0Y2ggPSBmZXRjaCwgfSkgPT4ge1xuICAgIHJldHVybiBhc3luYyAocGF0aG5hbWUsIGluaXQpID0+IHtcbiAgICAgICAgY29uc3QgdXJsID0gbmV3IFVSTChwYXRobmFtZSwgc2VydmljZSk7XG4gICAgICAgIHJldHVybiBfZmV0Y2godXJsLCBpbml0KTtcbiAgICB9O1xufTtcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPWZldGNoLWhhbmRsZXIuanMubWFwIiwiLyoqXG4gKiBAbW9kdWxlXG4gKiBBc3NvcnRtZW50IG9mIEhUVFAgdXRpbGl0aWVzXG4gKiBUaGlzIG1vZHVsZSBpcyBleHBvcnRlZCBmb3IgY29udmVuaWVuY2UgYW5kIGlzIG5vIHdheSBwYXJ0IG9mIHB1YmxpYyBBUEksXG4gKiBpdCBjYW4gYmUgcmVtb3ZlZCBhdCBhbnkgdGltZS5cbiAqL1xuZXhwb3J0IGNvbnN0IG1lcmdlSGVhZGVycyA9IChpbml0LCBkZWZhdWx0cykgPT4ge1xuICAgIGxldCBoZWFkZXJzO1xuICAgIGZvciAoY29uc3QgbmFtZSBpbiBkZWZhdWx0cykge1xuICAgICAgICBjb25zdCB2YWx1ZSA9IGRlZmF1bHRzW25hbWVdO1xuICAgICAgICBpZiAodmFsdWUgIT09IG51bGwpIHtcbiAgICAgICAgICAgIGhlYWRlcnMgPz89IG5ldyBIZWFkZXJzKGluaXQpO1xuICAgICAgICAgICAgaWYgKCFoZWFkZXJzLmhhcyhuYW1lKSkge1xuICAgICAgICAgICAgICAgIGhlYWRlcnMuc2V0KG5hbWUsIHZhbHVlKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gaGVhZGVycyA/PyBpbml0O1xufTtcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPWh0dHAuanMubWFwIiwiaW1wb3J0IHsgYnVpbGRGZXRjaEhhbmRsZXIgfSBmcm9tICcuL2ZldGNoLWhhbmRsZXIuanMnO1xuaW1wb3J0IHsgbWVyZ2VIZWFkZXJzIH0gZnJvbSAnLi91dGlscy9odHRwLmpzJztcbi8qKiBFcnJvciBjb21pbmcgZnJvbSB0aGUgWFJQQyBzZXJ2aWNlICovXG5leHBvcnQgY2xhc3MgWFJQQ0Vycm9yIGV4dGVuZHMgRXJyb3Ige1xuICAgIGNvbnN0cnVjdG9yKHN0YXR1cywgeyBraW5kID0gYEhUVFAgZXJyb3IgJHtzdGF0dXN9YCwgZGVzY3JpcHRpb24gPSBgVW5zcGVjaWZpZWQgZXJyb3IgZGVzY3JpcHRpb25gLCBoZWFkZXJzLCBjYXVzZSwgfSA9IHt9KSB7XG4gICAgICAgIHN1cGVyKGAke2tpbmR9ID4gJHtkZXNjcmlwdGlvbn1gLCB7IGNhdXNlIH0pO1xuICAgICAgICB0aGlzLm5hbWUgPSAnWFJQQ0Vycm9yJztcbiAgICAgICAgdGhpcy5zdGF0dXMgPSBzdGF0dXM7XG4gICAgICAgIHRoaXMua2luZCA9IGtpbmQ7XG4gICAgICAgIHRoaXMuZGVzY3JpcHRpb24gPSBkZXNjcmlwdGlvbjtcbiAgICAgICAgdGhpcy5oZWFkZXJzID0gaGVhZGVycyB8fCB7fTtcbiAgICB9XG59XG5leHBvcnQgY2xhc3MgWFJQQyB7XG4gICAgY29uc3RydWN0b3IoeyBoYW5kbGVyLCBwcm94eSB9KSB7XG4gICAgICAgIHRoaXMuaGFuZGxlID0gYnVpbGRGZXRjaEhhbmRsZXIoaGFuZGxlcik7XG4gICAgICAgIHRoaXMucHJveHkgPSBwcm94eTtcbiAgICB9XG4gICAgLyoqXG4gICAgICogTWFrZXMgYSBxdWVyeSAoR0VUKSByZXF1ZXN0XG4gICAgICogQHBhcmFtIG5zaWQgTmFtZXNwYWNlIElEIG9mIGEgcXVlcnkgZW5kcG9pbnRcbiAgICAgKiBAcGFyYW0gb3B0aW9ucyBPcHRpb25zIHRvIGluY2x1ZGUgbGlrZSBwYXJhbWV0ZXJzXG4gICAgICogQHJldHVybnMgVGhlIHJlc3BvbnNlIG9mIHRoZSByZXF1ZXN0XG4gICAgICovXG4gICAgZ2V0KG5zaWQsIG9wdGlvbnMpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMucmVxdWVzdCh7IHR5cGU6ICdnZXQnLCBuc2lkOiBuc2lkLCAuLi5vcHRpb25zIH0pO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBNYWtlcyBhIHByb2NlZHVyZSAoUE9TVCkgcmVxdWVzdFxuICAgICAqIEBwYXJhbSBuc2lkIE5hbWVzcGFjZSBJRCBvZiBhIHByb2NlZHVyZSBlbmRwb2ludFxuICAgICAqIEBwYXJhbSBvcHRpb25zIE9wdGlvbnMgdG8gaW5jbHVkZSBsaWtlIGlucHV0IGJvZHkgb3IgcGFyYW1ldGVyc1xuICAgICAqIEByZXR1cm5zIFRoZSByZXNwb25zZSBvZiB0aGUgcmVxdWVzdFxuICAgICAqL1xuICAgIGNhbGwobnNpZCwgb3B0aW9ucykge1xuICAgICAgICByZXR1cm4gdGhpcy5yZXF1ZXN0KHsgdHlwZTogJ3Bvc3QnLCBuc2lkOiBuc2lkLCAuLi5vcHRpb25zIH0pO1xuICAgIH1cbiAgICAvKiogTWFrZXMgYSByZXF1ZXN0IHRvIHRoZSBYUlBDIHNlcnZpY2UgKi9cbiAgICBhc3luYyByZXF1ZXN0KG9wdGlvbnMpIHtcbiAgICAgICAgY29uc3QgZGF0YSA9IG9wdGlvbnMuZGF0YTtcbiAgICAgICAgY29uc3QgdXJsID0gYC94cnBjLyR7b3B0aW9ucy5uc2lkfWAgKyBjb25zdHJ1Y3RTZWFyY2hQYXJhbXMob3B0aW9ucy5wYXJhbXMpO1xuICAgICAgICBjb25zdCBpc0lucHV0SnNvbiA9IGlzSnNvblZhbHVlKGRhdGEpO1xuICAgICAgICBjb25zdCByZXNwb25zZSA9IGF3YWl0IHRoaXMuaGFuZGxlKHVybCwge1xuICAgICAgICAgICAgbWV0aG9kOiBvcHRpb25zLnR5cGUsXG4gICAgICAgICAgICBzaWduYWw6IG9wdGlvbnMuc2lnbmFsLFxuICAgICAgICAgICAgYm9keTogaXNJbnB1dEpzb24gPyBKU09OLnN0cmluZ2lmeShkYXRhKSA6IGRhdGEsXG4gICAgICAgICAgICBoZWFkZXJzOiBtZXJnZUhlYWRlcnMob3B0aW9ucy5oZWFkZXJzLCB7XG4gICAgICAgICAgICAgICAgJ2NvbnRlbnQtdHlwZSc6IGlzSW5wdXRKc29uID8gJ2FwcGxpY2F0aW9uL2pzb24nIDogbnVsbCxcbiAgICAgICAgICAgICAgICAnYXRwcm90by1wcm94eSc6IGNvbnN0cnVjdFByb3h5SGVhZGVyKHRoaXMucHJveHkpLFxuICAgICAgICAgICAgfSksXG4gICAgICAgIH0pO1xuICAgICAgICBjb25zdCByZXNwb25zZVN0YXR1cyA9IHJlc3BvbnNlLnN0YXR1cztcbiAgICAgICAgY29uc3QgcmVzcG9uc2VIZWFkZXJzID0gT2JqZWN0LmZyb21FbnRyaWVzKHJlc3BvbnNlLmhlYWRlcnMpO1xuICAgICAgICBjb25zdCByZXNwb25zZVR5cGUgPSByZXNwb25zZUhlYWRlcnNbJ2NvbnRlbnQtdHlwZSddO1xuICAgICAgICBsZXQgcHJvbWlzZTtcbiAgICAgICAgbGV0IHJldDtcbiAgICAgICAgaWYgKHJlc3BvbnNlVHlwZSkge1xuICAgICAgICAgICAgaWYgKHJlc3BvbnNlVHlwZS5zdGFydHNXaXRoKCdhcHBsaWNhdGlvbi9qc29uJykpIHtcbiAgICAgICAgICAgICAgICBwcm9taXNlID0gcmVzcG9uc2UuanNvbigpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSBpZiAocmVzcG9uc2VUeXBlLnN0YXJ0c1dpdGgoJ3RleHQvJykpIHtcbiAgICAgICAgICAgICAgICBwcm9taXNlID0gcmVzcG9uc2UudGV4dCgpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIHRyeSB7XG4gICAgICAgICAgICByZXQgPSBhd2FpdCAocHJvbWlzZSB8fCByZXNwb25zZS5hcnJheUJ1ZmZlcigpLnRoZW4oKGJ1ZmZlcikgPT4gbmV3IFVpbnQ4QXJyYXkoYnVmZmVyKSkpO1xuICAgICAgICB9XG4gICAgICAgIGNhdGNoIChlcnIpIHtcbiAgICAgICAgICAgIHRocm93IG5ldyBYUlBDRXJyb3IoMiwge1xuICAgICAgICAgICAgICAgIGNhdXNlOiBlcnIsXG4gICAgICAgICAgICAgICAga2luZDogJ0ludmFsaWRSZXNwb25zZScsXG4gICAgICAgICAgICAgICAgZGVzY3JpcHRpb246IGBGYWlsZWQgdG8gcGFyc2UgcmVzcG9uc2UgYm9keWAsXG4gICAgICAgICAgICAgICAgaGVhZGVyczogcmVzcG9uc2VIZWFkZXJzLFxuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHJlc3BvbnNlU3RhdHVzID09PSAyMDApIHtcbiAgICAgICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICAgICAgZGF0YTogcmV0LFxuICAgICAgICAgICAgICAgIGhlYWRlcnM6IHJlc3BvbnNlSGVhZGVycyxcbiAgICAgICAgICAgIH07XG4gICAgICAgIH1cbiAgICAgICAgaWYgKGlzRXJyb3JSZXNwb25zZShyZXQpKSB7XG4gICAgICAgICAgICB0aHJvdyBuZXcgWFJQQ0Vycm9yKHJlc3BvbnNlU3RhdHVzLCB7XG4gICAgICAgICAgICAgICAga2luZDogcmV0LmVycm9yLFxuICAgICAgICAgICAgICAgIGRlc2NyaXB0aW9uOiByZXQubWVzc2FnZSxcbiAgICAgICAgICAgICAgICBoZWFkZXJzOiByZXNwb25zZUhlYWRlcnMsXG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgICAgICB0aHJvdyBuZXcgWFJQQ0Vycm9yKHJlc3BvbnNlU3RhdHVzLCB7IGhlYWRlcnM6IHJlc3BvbnNlSGVhZGVycyB9KTtcbiAgICB9XG59XG5jb25zdCBjb25zdHJ1Y3RQcm94eUhlYWRlciA9IChwcm94eSkgPT4ge1xuICAgIGlmIChwcm94eSkge1xuICAgICAgICByZXR1cm4gYCR7cHJveHkuc2VydmljZX0jJHtwcm94eS50eXBlfWA7XG4gICAgfVxuICAgIHJldHVybiBudWxsO1xufTtcbmNvbnN0IGNvbnN0cnVjdFNlYXJjaFBhcmFtcyA9IChwYXJhbXMpID0+IHtcbiAgICBsZXQgc2VhcmNoUGFyYW1zO1xuICAgIGZvciAoY29uc3Qga2V5IGluIHBhcmFtcykge1xuICAgICAgICBjb25zdCB2YWx1ZSA9IHBhcmFtc1trZXldO1xuICAgICAgICBpZiAodmFsdWUgIT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgc2VhcmNoUGFyYW1zID8/PSBuZXcgVVJMU2VhcmNoUGFyYW1zKCk7XG4gICAgICAgICAgICBpZiAoQXJyYXkuaXNBcnJheSh2YWx1ZSkpIHtcbiAgICAgICAgICAgICAgICBmb3IgKGxldCBpZHggPSAwLCBsZW4gPSB2YWx1ZS5sZW5ndGg7IGlkeCA8IGxlbjsgaWR4KyspIHtcbiAgICAgICAgICAgICAgICAgICAgY29uc3QgdmFsID0gdmFsdWVbaWR4XTtcbiAgICAgICAgICAgICAgICAgICAgc2VhcmNoUGFyYW1zLmFwcGVuZChrZXksICcnICsgdmFsKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICBzZWFyY2hQYXJhbXMuc2V0KGtleSwgJycgKyB2YWx1ZSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIHNlYXJjaFBhcmFtcyA/IGA/YCArIHNlYXJjaFBhcmFtcy50b1N0cmluZygpIDogJyc7XG59O1xuY29uc3QgaXNKc29uVmFsdWUgPSAobykgPT4ge1xuICAgIGlmICh0eXBlb2YgbyAhPT0gJ29iamVjdCcgfHwgbyA9PT0gbnVsbCkge1xuICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuICAgIGlmICgndG9KU09OJyBpbiBvKSB7XG4gICAgICAgIHJldHVybiB0cnVlO1xuICAgIH1cbiAgICBjb25zdCBwcm90byA9IE9iamVjdC5nZXRQcm90b3R5cGVPZihvKTtcbiAgICByZXR1cm4gcHJvdG8gPT09IG51bGwgfHwgcHJvdG8gPT09IE9iamVjdC5wcm90b3R5cGU7XG59O1xuY29uc3QgaXNFcnJvclJlc3BvbnNlID0gKHZhbHVlKSA9PiB7XG4gICAgaWYgKHR5cGVvZiB2YWx1ZSAhPT0gJ29iamVjdCcgfHwgdmFsdWUgPT09IG51bGwpIHtcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cbiAgICBjb25zdCBraW5kVHlwZSA9IHR5cGVvZiB2YWx1ZS5lcnJvcjtcbiAgICBjb25zdCBtZXNzYWdlVHlwZSA9IHR5cGVvZiB2YWx1ZS5tZXNzYWdlO1xuICAgIHJldHVybiAoKGtpbmRUeXBlID09PSAndW5kZWZpbmVkJyB8fCBraW5kVHlwZSA9PT0gJ3N0cmluZycpICYmXG4gICAgICAgIChtZXNzYWdlVHlwZSA9PT0gJ3VuZGVmaW5lZCcgfHwgbWVzc2FnZVR5cGUgPT09ICdzdHJpbmcnKSk7XG59O1xuZXhwb3J0IGNvbnN0IGNsb25lID0gKHJwYykgPT4ge1xuICAgIHJldHVybiBuZXcgWFJQQyh7IGhhbmRsZXI6IHJwYy5oYW5kbGUsIHByb3h5OiBycGMucHJveHkgfSk7XG59O1xuZXhwb3J0IGNvbnN0IHdpdGhQcm94eSA9IChycGMsIG9wdGlvbnMpID0+IHtcbiAgICByZXR1cm4gbmV3IFhSUEMoeyBoYW5kbGVyOiBycGMuaGFuZGxlLCBwcm94eTogb3B0aW9ucyB9KTtcbn07XG4vLyMgc291cmNlTWFwcGluZ1VSTD1ycGMuanMubWFwIiwiLyoqXG4gKiBAbW9kdWxlXG4gKiBESUQgZG9jdW1lbnQtcmVsYXRlZCBmdW5jdGlvbmFsaXRpZXMuXG4gKiBUaGlzIG1vZHVsZSBpcyBleHBvcnRlZCBmb3IgY29udmVuaWVuY2UgYW5kIGlzIG5vIHdheSBwYXJ0IG9mIHB1YmxpYyBBUEksXG4gKiBpdCBjYW4gYmUgcmVtb3ZlZCBhdCBhbnkgdGltZS5cbiAqL1xuLyoqXG4gKiBSZXRyaWV2ZXMgQVQgUHJvdG9jb2wgUERTIGVuZHBvaW50IGZyb20gdGhlIERJRCBkb2N1bWVudCwgaWYgYXZhaWxhYmxlXG4gKiBAcGFyYW0gZG9jIERJRCBkb2N1bWVudFxuICogQHJldHVybnMgVGhlIFBEUyBlbmRwb2ludCwgaWYgYXZhaWxhYmxlXG4gKi9cbmV4cG9ydCBjb25zdCBnZXRQZHNFbmRwb2ludCA9IChkb2MpID0+IHtcbiAgICByZXR1cm4gZ2V0U2VydmljZUVuZHBvaW50KGRvYywgJyNhdHByb3RvX3BkcycsICdBdHByb3RvUGVyc29uYWxEYXRhU2VydmVyJyk7XG59O1xuLyoqXG4gKiBSZXRyaWV2ZSBhIHNlcnZpY2UgZW5kcG9pbnQgZnJvbSB0aGUgRElEIGRvY3VtZW50LCBpZiBhdmFpbGFibGVcbiAqIEBwYXJhbSBkb2MgRElEIGRvY3VtZW50XG4gKiBAcGFyYW0gc2VydmljZUlkIFNlcnZpY2UgSURcbiAqIEBwYXJhbSBzZXJ2aWNlVHlwZSBTZXJ2aWNlIHR5cGVcbiAqIEByZXR1cm5zIFRoZSByZXF1ZXN0ZWQgc2VydmljZSBlbmRwb2ludCwgaWYgYXZhaWxhYmxlXG4gKi9cbmV4cG9ydCBjb25zdCBnZXRTZXJ2aWNlRW5kcG9pbnQgPSAoZG9jLCBzZXJ2aWNlSWQsIHNlcnZpY2VUeXBlKSA9PiB7XG4gICAgY29uc3QgZGlkID0gZG9jLmlkO1xuICAgIGNvbnN0IGRpZFNlcnZpY2VJZCA9IGRpZCArIHNlcnZpY2VJZDtcbiAgICBjb25zdCBmb3VuZCA9IGRvYy5zZXJ2aWNlPy5maW5kKChzZXJ2aWNlKSA9PiBzZXJ2aWNlLmlkID09PSBzZXJ2aWNlSWQgfHwgc2VydmljZS5pZCA9PT0gZGlkU2VydmljZUlkKTtcbiAgICBpZiAoIWZvdW5kIHx8IGZvdW5kLnR5cGUgIT09IHNlcnZpY2VUeXBlIHx8IHR5cGVvZiBmb3VuZC5zZXJ2aWNlRW5kcG9pbnQgIT09ICdzdHJpbmcnKSB7XG4gICAgICAgIHJldHVybiB1bmRlZmluZWQ7XG4gICAgfVxuICAgIHJldHVybiB2YWxpZGF0ZVVybChmb3VuZC5zZXJ2aWNlRW5kcG9pbnQpO1xufTtcbmNvbnN0IHZhbGlkYXRlVXJsID0gKHVybFN0cikgPT4ge1xuICAgIGxldCB1cmw7XG4gICAgdHJ5IHtcbiAgICAgICAgdXJsID0gbmV3IFVSTCh1cmxTdHIpO1xuICAgIH1cbiAgICBjYXRjaCB7XG4gICAgICAgIHJldHVybiB1bmRlZmluZWQ7XG4gICAgfVxuICAgIGNvbnN0IHByb3RvID0gdXJsLnByb3RvY29sO1xuICAgIGlmICh1cmwuaG9zdG5hbWUgJiYgKHByb3RvID09PSAnaHR0cDonIHx8IHByb3RvID09PSAnaHR0cHM6JykpIHtcbiAgICAgICAgcmV0dXJuIHVybFN0cjtcbiAgICB9XG59O1xuLy8jIHNvdXJjZU1hcHBpbmdVUkw9ZGlkLmpzLm1hcCIsIi8qKlxuICogQG1vZHVsZVxuICogSldUIGRlY29kaW5nIHV0aWxpdGllcyBmb3Igc2Vzc2lvbiByZXN1bXB0aW9uIGNoZWNrcy5cbiAqIFRoaXMgbW9kdWxlIGlzIGV4cG9ydGVkIGZvciBjb252ZW5pZW5jZSBhbmQgaXMgbm8gd2F5IHBhcnQgb2YgcHVibGljIEFQSSxcbiAqIGl0IGNhbiBiZSByZW1vdmVkIGF0IGFueSB0aW1lLlxuICovXG4vKipcbiAqIERlY29kZXMgYSBKV1QgdG9rZW5cbiAqIEBwYXJhbSB0b2tlbiBUaGUgdG9rZW4gc3RyaW5nXG4gKiBAcmV0dXJucyBKU09OIG9iamVjdCBmcm9tIHRoZSB0b2tlblxuICovXG5leHBvcnQgY29uc3QgZGVjb2RlSnd0ID0gKHRva2VuKSA9PiB7XG4gICAgY29uc3QgcG9zID0gMTtcbiAgICBjb25zdCBwYXJ0ID0gdG9rZW4uc3BsaXQoJy4nKVsxXTtcbiAgICBsZXQgZGVjb2RlZDtcbiAgICBpZiAodHlwZW9mIHBhcnQgIT09ICdzdHJpbmcnKSB7XG4gICAgICAgIHRocm93IG5ldyBFcnJvcignaW52YWxpZCB0b2tlbjogbWlzc2luZyBwYXJ0ICcgKyAocG9zICsgMSkpO1xuICAgIH1cbiAgICB0cnkge1xuICAgICAgICBkZWNvZGVkID0gYmFzZTY0VXJsRGVjb2RlKHBhcnQpO1xuICAgIH1cbiAgICBjYXRjaCAoZSkge1xuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ2ludmFsaWQgdG9rZW46IGludmFsaWQgYjY0IGZvciBwYXJ0ICcgKyAocG9zICsgMSkgKyAnICgnICsgZS5tZXNzYWdlICsgJyknKTtcbiAgICB9XG4gICAgdHJ5IHtcbiAgICAgICAgcmV0dXJuIEpTT04ucGFyc2UoZGVjb2RlZCk7XG4gICAgfVxuICAgIGNhdGNoIChlKSB7XG4gICAgICAgIHRocm93IG5ldyBFcnJvcignaW52YWxpZCB0b2tlbjogaW52YWxpZCBqc29uIGZvciBwYXJ0ICcgKyAocG9zICsgMSkgKyAnICgnICsgZS5tZXNzYWdlICsgJyknKTtcbiAgICB9XG59O1xuLyoqXG4gKiBEZWNvZGVzIGEgVVJMLXNhZmUgQmFzZTY0IHN0cmluZ1xuICogQHBhcmFtIHN0ciBVUkwtc2FmZSBCYXNlNjQgdGhhdCBuZWVkZWQgdG8gYmUgZGVjb2RlZFxuICogQHJldHVybnMgVGhlIGFjdHVhbCBzdHJpbmdcbiAqL1xuZXhwb3J0IGNvbnN0IGJhc2U2NFVybERlY29kZSA9IChzdHIpID0+IHtcbiAgICBsZXQgb3V0cHV0ID0gc3RyLnJlcGxhY2UoLy0vZywgJysnKS5yZXBsYWNlKC9fL2csICcvJyk7XG4gICAgc3dpdGNoIChvdXRwdXQubGVuZ3RoICUgNCkge1xuICAgICAgICBjYXNlIDA6XG4gICAgICAgICAgICBicmVhaztcbiAgICAgICAgY2FzZSAyOlxuICAgICAgICAgICAgb3V0cHV0ICs9ICc9PSc7XG4gICAgICAgICAgICBicmVhaztcbiAgICAgICAgY2FzZSAzOlxuICAgICAgICAgICAgb3V0cHV0ICs9ICc9JztcbiAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICBkZWZhdWx0OlxuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdiYXNlNjQgc3RyaW5nIGlzIG5vdCBvZiB0aGUgY29ycmVjdCBsZW5ndGgnKTtcbiAgICB9XG4gICAgdHJ5IHtcbiAgICAgICAgcmV0dXJuIGI2NERlY29kZVVuaWNvZGUob3V0cHV0KTtcbiAgICB9XG4gICAgY2F0Y2gge1xuICAgICAgICByZXR1cm4gYXRvYihvdXRwdXQpO1xuICAgIH1cbn07XG5jb25zdCBiNjREZWNvZGVVbmljb2RlID0gKHN0cikgPT4ge1xuICAgIHJldHVybiBkZWNvZGVVUklDb21wb25lbnQoYXRvYihzdHIpLnJlcGxhY2UoLyguKS9nLCAoX20sIHApID0+IHtcbiAgICAgICAgbGV0IGNvZGUgPSBwLmNoYXJDb2RlQXQoMCkudG9TdHJpbmcoMTYpLnRvVXBwZXJDYXNlKCk7XG4gICAgICAgIGlmIChjb2RlLmxlbmd0aCA8IDIpIHtcbiAgICAgICAgICAgIGNvZGUgPSAnMCcgKyBjb2RlO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiAnJScgKyBjb2RlO1xuICAgIH0pKTtcbn07XG4vLyMgc291cmNlTWFwcGluZ1VSTD1qd3QuanMubWFwIiwiaW1wb3J0IHsgc2ltcGxlRmV0Y2hIYW5kbGVyIH0gZnJvbSAnLi9mZXRjaC1oYW5kbGVyLmpzJztcbmltcG9ydCB7IFhSUEMsIFhSUENFcnJvciB9IGZyb20gJy4vcnBjLmpzJztcbmltcG9ydCB7IGdldFBkc0VuZHBvaW50IH0gZnJvbSAnLi91dGlscy9kaWQuanMnO1xuaW1wb3J0IHsgZGVjb2RlSnd0IH0gZnJvbSAnLi91dGlscy9qd3QuanMnO1xuZXhwb3J0IGNsYXNzIENyZWRlbnRpYWxNYW5hZ2VyIHtcbiAgICAjc2VydmVyO1xuICAgICNyZWZyZXNoU2Vzc2lvblByb21pc2U7XG4gICAgI29uRXhwaXJlZDtcbiAgICAjb25SZWZyZXNoO1xuICAgICNvblNlc3Npb25VcGRhdGU7XG4gICAgY29uc3RydWN0b3IoeyBzZXJ2aWNlLCBvbkV4cGlyZWQsIG9uUmVmcmVzaCwgb25TZXNzaW9uVXBkYXRlLCBmZXRjaDogX2ZldGNoID0gZmV0Y2gsIH0pIHtcbiAgICAgICAgdGhpcy5zZXJ2aWNlVXJsID0gc2VydmljZTtcbiAgICAgICAgdGhpcy5mZXRjaCA9IF9mZXRjaDtcbiAgICAgICAgdGhpcy4jc2VydmVyID0gbmV3IFhSUEMoeyBoYW5kbGVyOiBzaW1wbGVGZXRjaEhhbmRsZXIoeyBzZXJ2aWNlOiBzZXJ2aWNlLCBmZXRjaDogX2ZldGNoIH0pIH0pO1xuICAgICAgICB0aGlzLiNvblJlZnJlc2ggPSBvblJlZnJlc2g7XG4gICAgICAgIHRoaXMuI29uRXhwaXJlZCA9IG9uRXhwaXJlZDtcbiAgICAgICAgdGhpcy4jb25TZXNzaW9uVXBkYXRlID0gb25TZXNzaW9uVXBkYXRlO1xuICAgIH1cbiAgICBnZXQgZGlzcGF0Y2hVcmwoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLnNlc3Npb24/LnBkc1VyaSA/PyB0aGlzLnNlcnZpY2VVcmw7XG4gICAgfVxuICAgIGFzeW5jIGhhbmRsZShwYXRobmFtZSwgaW5pdCkge1xuICAgICAgICBhd2FpdCB0aGlzLiNyZWZyZXNoU2Vzc2lvblByb21pc2U7XG4gICAgICAgIGNvbnN0IHVybCA9IG5ldyBVUkwocGF0aG5hbWUsIHRoaXMuZGlzcGF0Y2hVcmwpO1xuICAgICAgICBjb25zdCBoZWFkZXJzID0gbmV3IEhlYWRlcnMoaW5pdC5oZWFkZXJzKTtcbiAgICAgICAgaWYgKCF0aGlzLnNlc3Npb24gfHwgaGVhZGVycy5oYXMoJ2F1dGhvcml6YXRpb24nKSkge1xuICAgICAgICAgICAgcmV0dXJuICgwLCB0aGlzLmZldGNoKSh1cmwsIGluaXQpO1xuICAgICAgICB9XG4gICAgICAgIGhlYWRlcnMuc2V0KCdhdXRob3JpemF0aW9uJywgYEJlYXJlciAke3RoaXMuc2Vzc2lvbi5hY2Nlc3NKd3R9YCk7XG4gICAgICAgIGNvbnN0IGluaXRpYWxSZXNwb25zZSA9IGF3YWl0ICgwLCB0aGlzLmZldGNoKSh1cmwsIHsgLi4uaW5pdCwgaGVhZGVycyB9KTtcbiAgICAgICAgY29uc3QgaXNFeHBpcmVkID0gYXdhaXQgaXNFeHBpcmVkVG9rZW5SZXNwb25zZShpbml0aWFsUmVzcG9uc2UpO1xuICAgICAgICBpZiAoIWlzRXhwaXJlZCkge1xuICAgICAgICAgICAgcmV0dXJuIGluaXRpYWxSZXNwb25zZTtcbiAgICAgICAgfVxuICAgICAgICB0cnkge1xuICAgICAgICAgICAgYXdhaXQgdGhpcy4jcmVmcmVzaFNlc3Npb24oKTtcbiAgICAgICAgfVxuICAgICAgICBjYXRjaCB7XG4gICAgICAgICAgICByZXR1cm4gaW5pdGlhbFJlc3BvbnNlO1xuICAgICAgICB9XG4gICAgICAgIC8vIFJldHVybiBpbml0aWFsIHJlc3BvbnNlIGlmOlxuICAgICAgICAvLyAtIHJlZnJlc2hTZXNzaW9uIHJldHVybnMgZXhwaXJlZFxuICAgICAgICAvLyAtIEJvZHkgc3RyZWFtIGhhcyBiZWVuIGNvbnN1bWVkXG4gICAgICAgIGlmICghdGhpcy5zZXNzaW9uIHx8IGluaXQuYm9keSBpbnN0YW5jZW9mIFJlYWRhYmxlU3RyZWFtKSB7XG4gICAgICAgICAgICByZXR1cm4gaW5pdGlhbFJlc3BvbnNlO1xuICAgICAgICB9XG4gICAgICAgIGhlYWRlcnMuc2V0KCdhdXRob3JpemF0aW9uJywgYEJlYXJlciAke3RoaXMuc2Vzc2lvbi5hY2Nlc3NKd3R9YCk7XG4gICAgICAgIHJldHVybiBhd2FpdCAoMCwgdGhpcy5mZXRjaCkodXJsLCB7IC4uLmluaXQsIGhlYWRlcnMgfSk7XG4gICAgfVxuICAgICNyZWZyZXNoU2Vzc2lvbigpIHtcbiAgICAgICAgcmV0dXJuICh0aGlzLiNyZWZyZXNoU2Vzc2lvblByb21pc2UgfHw9IHRoaXMuI3JlZnJlc2hTZXNzaW9uSW5uZXIoKS5maW5hbGx5KCgpID0+ICh0aGlzLiNyZWZyZXNoU2Vzc2lvblByb21pc2UgPSB1bmRlZmluZWQpKSk7XG4gICAgfVxuICAgIGFzeW5jICNyZWZyZXNoU2Vzc2lvbklubmVyKCkge1xuICAgICAgICBjb25zdCBjdXJyZW50U2Vzc2lvbiA9IHRoaXMuc2Vzc2lvbjtcbiAgICAgICAgaWYgKCFjdXJyZW50U2Vzc2lvbikge1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICAgIHRyeSB7XG4gICAgICAgICAgICBjb25zdCB7IGRhdGEgfSA9IGF3YWl0IHRoaXMuI3NlcnZlci5jYWxsKCdjb20uYXRwcm90by5zZXJ2ZXIucmVmcmVzaFNlc3Npb24nLCB7XG4gICAgICAgICAgICAgICAgaGVhZGVyczoge1xuICAgICAgICAgICAgICAgICAgICBhdXRob3JpemF0aW9uOiBgQmVhcmVyICR7Y3VycmVudFNlc3Npb24ucmVmcmVzaEp3dH1gLFxuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIHRoaXMuI3VwZGF0ZVNlc3Npb24oeyAuLi5jdXJyZW50U2Vzc2lvbiwgLi4uZGF0YSB9KTtcbiAgICAgICAgICAgIHRoaXMuI29uUmVmcmVzaD8uKHRoaXMuc2Vzc2lvbik7XG4gICAgICAgIH1cbiAgICAgICAgY2F0Y2ggKGVycikge1xuICAgICAgICAgICAgaWYgKGVyciBpbnN0YW5jZW9mIFhSUENFcnJvcikge1xuICAgICAgICAgICAgICAgIGNvbnN0IGtpbmQgPSBlcnIua2luZDtcbiAgICAgICAgICAgICAgICBpZiAoa2luZCA9PT0gJ0V4cGlyZWRUb2tlbicgfHwga2luZCA9PT0gJ0ludmFsaWRUb2tlbicpIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5zZXNzaW9uID0gdW5kZWZpbmVkO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLiNvbkV4cGlyZWQ/LihjdXJyZW50U2Vzc2lvbik7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxuICAgICN1cGRhdGVTZXNzaW9uKHJhdykge1xuICAgICAgICBjb25zdCBkaWREb2MgPSByYXcuZGlkRG9jO1xuICAgICAgICBsZXQgcGRzVXJpO1xuICAgICAgICBpZiAoZGlkRG9jKSB7XG4gICAgICAgICAgICBwZHNVcmkgPSBnZXRQZHNFbmRwb2ludChkaWREb2MpO1xuICAgICAgICB9XG4gICAgICAgIGNvbnN0IG5ld1Nlc3Npb24gPSB7XG4gICAgICAgICAgICBhY2Nlc3NKd3Q6IHJhdy5hY2Nlc3NKd3QsXG4gICAgICAgICAgICByZWZyZXNoSnd0OiByYXcucmVmcmVzaEp3dCxcbiAgICAgICAgICAgIGhhbmRsZTogcmF3LmhhbmRsZSxcbiAgICAgICAgICAgIGRpZDogcmF3LmRpZCxcbiAgICAgICAgICAgIHBkc1VyaTogcGRzVXJpLFxuICAgICAgICAgICAgZW1haWw6IHJhdy5lbWFpbCxcbiAgICAgICAgICAgIGVtYWlsQ29uZmlybWVkOiByYXcuZW1haWxDb25maXJtZWQsXG4gICAgICAgICAgICBlbWFpbEF1dGhGYWN0b3I6IHJhdy5lbWFpbENvbmZpcm1lZCxcbiAgICAgICAgICAgIGFjdGl2ZTogcmF3LmFjdGl2ZSA/PyB0cnVlLFxuICAgICAgICAgICAgaW5hY3RpdmVTdGF0dXM6IHJhdy5zdGF0dXMsXG4gICAgICAgIH07XG4gICAgICAgIHRoaXMuc2Vzc2lvbiA9IG5ld1Nlc3Npb247XG4gICAgICAgIHRoaXMuI29uU2Vzc2lvblVwZGF0ZT8uKG5ld1Nlc3Npb24pO1xuICAgICAgICByZXR1cm4gbmV3U2Vzc2lvbjtcbiAgICB9XG4gICAgLyoqXG4gICAgICogUmVzdW1lIGEgc2F2ZWQgc2Vzc2lvblxuICAgICAqIEBwYXJhbSBzZXNzaW9uIFNlc3Npb24gaW5mb3JtYXRpb24sIHRha2VuIGZyb20gYEF0cEF1dGgjc2Vzc2lvbmAgYWZ0ZXIgbG9naW5cbiAgICAgKi9cbiAgICBhc3luYyByZXN1bWUoc2Vzc2lvbikge1xuICAgICAgICBjb25zdCBub3cgPSBEYXRlLm5vdygpIC8gMTAwMCArIDYwICogNTtcbiAgICAgICAgY29uc3QgcmVmcmVzaFRva2VuID0gZGVjb2RlSnd0KHNlc3Npb24ucmVmcmVzaEp3dCk7XG4gICAgICAgIGlmIChub3cgPj0gcmVmcmVzaFRva2VuLmV4cCkge1xuICAgICAgICAgICAgdGhyb3cgbmV3IFhSUENFcnJvcig0MDEsIHsga2luZDogJ0ludmFsaWRUb2tlbicgfSk7XG4gICAgICAgIH1cbiAgICAgICAgY29uc3QgYWNjZXNzVG9rZW4gPSBkZWNvZGVKd3Qoc2Vzc2lvbi5hY2Nlc3NKd3QpO1xuICAgICAgICB0aGlzLnNlc3Npb24gPSBzZXNzaW9uO1xuICAgICAgICBpZiAobm93ID49IGFjY2Vzc1Rva2VuLmV4cCkge1xuICAgICAgICAgICAgYXdhaXQgdGhpcy4jcmVmcmVzaFNlc3Npb24oKTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIGNvbnN0IHByb21pc2UgPSB0aGlzLiNzZXJ2ZXIuZ2V0KCdjb20uYXRwcm90by5zZXJ2ZXIuZ2V0U2Vzc2lvbicsIHtcbiAgICAgICAgICAgICAgICBoZWFkZXJzOiB7XG4gICAgICAgICAgICAgICAgICAgIGF1dGhvcml6YXRpb246IGBCZWFyZXIgJHtzZXNzaW9uLmFjY2Vzc0p3dH1gLFxuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIHByb21pc2UudGhlbigocmVzcG9uc2UpID0+IHtcbiAgICAgICAgICAgICAgICBjb25zdCBleGlzdGluZyA9IHRoaXMuc2Vzc2lvbjtcbiAgICAgICAgICAgICAgICBjb25zdCBuZXh0ID0gcmVzcG9uc2UuZGF0YTtcbiAgICAgICAgICAgICAgICBpZiAoIWV4aXN0aW5nKSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgdGhpcy4jdXBkYXRlU2Vzc2lvbih7IC4uLmV4aXN0aW5nLCAuLi5uZXh0IH0pO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKCF0aGlzLnNlc3Npb24pIHtcbiAgICAgICAgICAgIHRocm93IG5ldyBYUlBDRXJyb3IoNDAxLCB7IGtpbmQ6ICdJbnZhbGlkVG9rZW4nIH0pO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiB0aGlzLnNlc3Npb247XG4gICAgfVxuICAgIC8qKlxuICAgICAqIFBlcmZvcm0gYSBsb2dpbiBvcGVyYXRpb25cbiAgICAgKiBAcGFyYW0gb3B0aW9ucyBMb2dpbiBvcHRpb25zXG4gICAgICogQHJldHVybnMgU2Vzc2lvbiBkYXRhIHRoYXQgY2FuIGJlIHNhdmVkIGZvciBsYXRlclxuICAgICAqL1xuICAgIGFzeW5jIGxvZ2luKG9wdGlvbnMpIHtcbiAgICAgICAgLy8gUmVzZXQgdGhlIHNlc3Npb25cbiAgICAgICAgdGhpcy5zZXNzaW9uID0gdW5kZWZpbmVkO1xuICAgICAgICBjb25zdCByZXMgPSBhd2FpdCB0aGlzLiNzZXJ2ZXIuY2FsbCgnY29tLmF0cHJvdG8uc2VydmVyLmNyZWF0ZVNlc3Npb24nLCB7XG4gICAgICAgICAgICBkYXRhOiB7XG4gICAgICAgICAgICAgICAgaWRlbnRpZmllcjogb3B0aW9ucy5pZGVudGlmaWVyLFxuICAgICAgICAgICAgICAgIHBhc3N3b3JkOiBvcHRpb25zLnBhc3N3b3JkLFxuICAgICAgICAgICAgICAgIGF1dGhGYWN0b3JUb2tlbjogb3B0aW9ucy5jb2RlLFxuICAgICAgICAgICAgfSxcbiAgICAgICAgfSk7XG4gICAgICAgIHJldHVybiB0aGlzLiN1cGRhdGVTZXNzaW9uKHJlcy5kYXRhKTtcbiAgICB9XG59XG5jb25zdCBpc0V4cGlyZWRUb2tlblJlc3BvbnNlID0gYXN5bmMgKHJlc3BvbnNlKSA9PiB7XG4gICAgaWYgKHJlc3BvbnNlLnN0YXR1cyAhPT0gNDAwKSB7XG4gICAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG4gICAgaWYgKGV4dHJhY3RDb250ZW50VHlwZShyZXNwb25zZS5oZWFkZXJzKSAhPT0gJ2FwcGxpY2F0aW9uL2pzb24nKSB7XG4gICAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG4gICAgLy8ge1wiZXJyb3JcIjpcIkV4cGlyZWRUb2tlblwiLFwibWVzc2FnZVwiOlwiVG9rZW4gaGFzIGV4cGlyZWRcIn1cbiAgICAvLyB7XCJlcnJvclwiOlwiRXhwaXJlZFRva2VuXCIsXCJtZXNzYWdlXCI6XCJUb2tlbiBpcyBleHBpcmVkXCJ9XG4gICAgaWYgKGV4dHJhY3RDb250ZW50TGVuZ3RoKHJlc3BvbnNlLmhlYWRlcnMpID4gNTQgKiAxLjUpIHtcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cbiAgICB0cnkge1xuICAgICAgICBjb25zdCB7IGVycm9yLCBtZXNzYWdlIH0gPSBhd2FpdCByZXNwb25zZS5jbG9uZSgpLmpzb24oKTtcbiAgICAgICAgcmV0dXJuIGVycm9yID09PSAnRXhwaXJlZFRva2VuJyAmJiAodHlwZW9mIG1lc3NhZ2UgPT09ICdzdHJpbmcnIHx8IG1lc3NhZ2UgPT09IHVuZGVmaW5lZCk7XG4gICAgfVxuICAgIGNhdGNoIHsgfVxuICAgIHJldHVybiBmYWxzZTtcbn07XG5jb25zdCBleHRyYWN0Q29udGVudFR5cGUgPSAoaGVhZGVycykgPT4ge1xuICAgIHJldHVybiBoZWFkZXJzLmdldCgnY29udGVudC10eXBlJyk/LnNwbGl0KCc7JylbMF0/LnRyaW0oKTtcbn07XG5jb25zdCBleHRyYWN0Q29udGVudExlbmd0aCA9IChoZWFkZXJzKSA9PiB7XG4gICAgcmV0dXJuIE51bWJlcihoZWFkZXJzLmdldCgnY29udGVudC1sZW5ndGgnKSA/PyAnOycpO1xufTtcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPWNyZWRlbnRpYWwtbWFuYWdlci5qcy5tYXAiLCJleHBvcnQgKiBmcm9tICcuL3JwYy5qcyc7XG5leHBvcnQgKiBmcm9tICcuL2ZldGNoLWhhbmRsZXIuanMnO1xuZXhwb3J0ICogZnJvbSAnLi9jcmVkZW50aWFsLW1hbmFnZXIuanMnO1xuLy8jIHNvdXJjZU1hcHBpbmdVUkw9aW5kZXguanMubWFwIiwiLyohXG5odHRwczovL2dpdGh1Yi5jb20vbWFyeS1leHQvYXRjdXRlXG5cblBlcm1pc3Npb24gaXMgaGVyZWJ5IGdyYW50ZWQsIGZyZWUgb2YgY2hhcmdlLCB0byBhbnkgcGVyc29uIG9idGFpbmluZyBhIGNvcHlcbm9mIHRoaXMgc29mdHdhcmUgYW5kIGFzc29jaWF0ZWQgZG9jdW1lbnRhdGlvbiBmaWxlcyAodGhlIFwiU29mdHdhcmVcIiksIHRvIGRlYWxcbmluIHRoZSBTb2Z0d2FyZSB3aXRob3V0IHJlc3RyaWN0aW9uLCBpbmNsdWRpbmcgd2l0aG91dCBsaW1pdGF0aW9uIHRoZSByaWdodHNcbnRvIHVzZSwgY29weSwgbW9kaWZ5LCBtZXJnZSwgcHVibGlzaCwgZGlzdHJpYnV0ZSwgc3VibGljZW5zZSwgYW5kL29yIHNlbGxcbmNvcGllcyBvZiB0aGUgU29mdHdhcmUsIGFuZCB0byBwZXJtaXQgcGVyc29ucyB0byB3aG9tIHRoZSBTb2Z0d2FyZSBpc1xuZnVybmlzaGVkIHRvIGRvIHNvLCBzdWJqZWN0IHRvIHRoZSBmb2xsb3dpbmcgY29uZGl0aW9uczpcblxuVGhlIGFib3ZlIGNvcHlyaWdodCBub3RpY2UgYW5kIHRoaXMgcGVybWlzc2lvbiBub3RpY2Ugc2hhbGwgYmUgaW5jbHVkZWQgaW4gYWxsXG5jb3BpZXMgb3Igc3Vic3RhbnRpYWwgcG9ydGlvbnMgb2YgdGhlIFNvZnR3YXJlLlxuXG5USEUgU09GVFdBUkUgSVMgUFJPVklERUQgXCJBUyBJU1wiLCBXSVRIT1VUIFdBUlJBTlRZIE9GIEFOWSBLSU5ELCBFWFBSRVNTIE9SXG5JTVBMSUVELCBJTkNMVURJTkcgQlVUIE5PVCBMSU1JVEVEIFRPIFRIRSBXQVJSQU5USUVTIE9GIE1FUkNIQU5UQUJJTElUWSxcbkZJVE5FU1MgRk9SIEEgUEFSVElDVUxBUiBQVVJQT1NFIEFORCBOT05JTkZSSU5HRU1FTlQuIElOIE5PIEVWRU5UIFNIQUxMIFRIRVxuQVVUSE9SUyBPUiBDT1BZUklHSFQgSE9MREVSUyBCRSBMSUFCTEUgRk9SIEFOWSBDTEFJTSwgREFNQUdFUyBPUiBPVEhFUlxuTElBQklMSVRZLCBXSEVUSEVSIElOIEFOIEFDVElPTiBPRiBDT05UUkFDVCwgVE9SVCBPUiBPVEhFUldJU0UsIEFSSVNJTkcgRlJPTSxcbk9VVCBPRiBPUiBJTiBDT05ORUNUSU9OIFdJVEggVEhFIFNPRlRXQVJFIE9SIFRIRSBVU0UgT1IgT1RIRVIgREVBTElOR1MgSU4gVEhFXG5TT0ZUV0FSRS5cbiovXG4vKipcbiAqIFJldHJpZXZlcyBBVCBQcm90b2NvbCBQRFMgZW5kcG9pbnQgZnJvbSB0aGUgRElEIGRvY3VtZW50LCBpZiBhdmFpbGFibGVcbiAqIEBwYXJhbSBkb2MgRElEIGRvY3VtZW50XG4gKiBAcmV0dXJucyBUaGUgUERTIGVuZHBvaW50LCBpZiBhdmFpbGFibGVcbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGdldFBkc0VuZHBvaW50KGRvYykge1xuICAgIHJldHVybiBnZXRTZXJ2aWNlRW5kcG9pbnQoZG9jLCAnI2F0cHJvdG9fcGRzJywgJ0F0cHJvdG9QZXJzb25hbERhdGFTZXJ2ZXInKTtcbn1cbi8qKlxuICogUmV0cmlldmUgYSBzZXJ2aWNlIGVuZHBvaW50IGZyb20gdGhlIERJRCBkb2N1bWVudCwgaWYgYXZhaWxhYmxlXG4gKiBAcGFyYW0gZG9jIERJRCBkb2N1bWVudFxuICogQHBhcmFtIHNlcnZpY2VJZCBTZXJ2aWNlIElEXG4gKiBAcGFyYW0gc2VydmljZVR5cGUgU2VydmljZSB0eXBlXG4gKiBAcmV0dXJucyBUaGUgcmVxdWVzdGVkIHNlcnZpY2UgZW5kcG9pbnQsIGlmIGF2YWlsYWJsZVxuICovXG5leHBvcnQgZnVuY3Rpb24gZ2V0U2VydmljZUVuZHBvaW50KGRvYywgc2VydmljZUlkLCBzZXJ2aWNlVHlwZSkge1xuICAgIGNvbnN0IGRpZCA9IGRvYy5pZDtcbiAgICBjb25zdCBkaWRTZXJ2aWNlSWQgPSBkaWQgKyBzZXJ2aWNlSWQ7XG4gICAgY29uc3QgZm91bmQgPSBkb2Muc2VydmljZT8uZmluZCgoc2VydmljZSkgPT4gc2VydmljZS5pZCA9PT0gc2VydmljZUlkIHx8IHNlcnZpY2UuaWQgPT09IGRpZFNlcnZpY2VJZCk7XG4gICAgaWYgKCFmb3VuZCB8fCBmb3VuZC50eXBlICE9PSBzZXJ2aWNlVHlwZSB8fCB0eXBlb2YgZm91bmQuc2VydmljZUVuZHBvaW50ICE9PSAnc3RyaW5nJykge1xuICAgICAgICByZXR1cm4gdW5kZWZpbmVkO1xuICAgIH1cbiAgICByZXR1cm4gdmFsaWRhdGVVcmwoZm91bmQuc2VydmljZUVuZHBvaW50KTtcbn1cbmZ1bmN0aW9uIHZhbGlkYXRlVXJsKHVybFN0cikge1xuICAgIGxldCB1cmw7XG4gICAgdHJ5IHtcbiAgICAgICAgdXJsID0gbmV3IFVSTCh1cmxTdHIpO1xuICAgIH1cbiAgICBjYXRjaCB7XG4gICAgICAgIHJldHVybiB1bmRlZmluZWQ7XG4gICAgfVxuICAgIGNvbnN0IHByb3RvID0gdXJsLnByb3RvY29sO1xuICAgIGlmICh1cmwuaG9zdG5hbWUgJiYgKHByb3RvID09PSAnaHR0cDonIHx8IHByb3RvID09PSAnaHR0cHM6JykpIHtcbiAgICAgICAgcmV0dXJuIHVybFN0cjtcbiAgICB9XG59XG5leHBvcnQgYXN5bmMgZnVuY3Rpb24gZ2V0RGlkRG9jdW1lbnQoZGlkKSB7XG4gICAgY29uc3QgY29sb25faW5kZXggPSBkaWQuaW5kZXhPZignOicsIDQpO1xuICAgIGNvbnN0IHR5cGUgPSBkaWQuc2xpY2UoNCwgY29sb25faW5kZXgpO1xuICAgIGNvbnN0IGlkZW50ID0gZGlkLnNsaWNlKGNvbG9uX2luZGV4ICsgMSk7XG4gICAgLy8gMi4gcmV0cmlldmUgdGhlaXIgRElEIGRvY3VtZW50c1xuICAgIGxldCBkb2M7XG4gICAgaWYgKHR5cGUgPT09ICdwbGMnKSB7XG4gICAgICAgIGNvbnN0IHJlc3BvbnNlID0gYXdhaXQgZmV0Y2goYGh0dHBzOi8vcGxjLmRpcmVjdG9yeS8ke2RpZH1gKTtcbiAgICAgICAgaWYgKHJlc3BvbnNlLnN0YXR1cyA9PT0gNDA0KSB7XG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ2RpZCBub3QgZm91bmQgaW4gZGlyZWN0b3J5Jyk7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKCFyZXNwb25zZS5vaykge1xuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdkaXJlY3RvcnkgaXMgdW5yZWFjaGFibGUnKTtcbiAgICAgICAgfVxuICAgICAgICBjb25zdCBqc29uID0gYXdhaXQgcmVzcG9uc2UuanNvbigpO1xuICAgICAgICBkb2MgPSBqc29uO1xuICAgIH1cbiAgICBlbHNlIGlmICh0eXBlID09PSAnd2ViJykge1xuICAgICAgICBjb25zdCBESURfV0VCX1JFID0gL14oW2EtekEtWjAtOS1dKyg/OlxcLlthLXpBLVowLTktXSspKig/OlxcLlthLXpBLVpdezIsfSkpJC87XG4gICAgICAgIGlmICghRElEX1dFQl9SRS50ZXN0KGlkZW50KSkge1xuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdpbnZhbGlkIGlkZW50aWZpZXInKTtcbiAgICAgICAgfVxuICAgICAgICBjb25zdCByZXNwb25zZSA9IGF3YWl0IGZldGNoKGBodHRwczovLyR7aWRlbnR9Ly53ZWxsLWtub3duL2RpZC5qc29uYCk7XG4gICAgICAgIGlmICghcmVzcG9uc2Uub2spIHtcbiAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcignZGlkIGRvY3VtZW50IGlzIHVucmVhY2hhYmxlJyk7XG4gICAgICAgIH1cbiAgICAgICAgY29uc3QganNvbiA9IGF3YWl0IHJlc3BvbnNlLmpzb24oKTtcbiAgICAgICAgZG9jID0ganNvbjtcbiAgICB9XG4gICAgZWxzZSB7XG4gICAgICAgIHRocm93IG5ldyBFcnJvcigndW5zdXBwb3J0ZWQgZGlkIG1ldGhvZCcpO1xuICAgIH1cbiAgICByZXR1cm4gZG9jO1xufVxuZXhwb3J0IGZ1bmN0aW9uIGdldERpZChkaWREb2MpIHtcbiAgICByZXR1cm4gZGlkRG9jLmlkO1xufVxuZXhwb3J0IGZ1bmN0aW9uIGdldEhhbmRsZShkaWREb2MpIHtcbiAgICByZXR1cm4gZGlkRG9jLmFsc29Lbm93bkFzXG4gICAgICAgID8uZmluZChoYW5kbGUgPT4gaGFuZGxlLnN0YXJ0c1dpdGgoJ2F0Oi8vJykpXG4gICAgICAgID8uc2xpY2UoJ2F0Oi8vJy5sZW5ndGgpO1xufVxuLy8jIHNvdXJjZU1hcHBpbmdVUkw9ZGlkLWRvY3VtZW50LmpzLm1hcCIsImV4cG9ydCBjb25zdCBpc0RpZCA9IChkaWQpID0+IHtcbiAgICByZXR1cm4gL15kaWQ6KFthLXpdKyk6KFthLXpBLVowLTkuXzolLV0qW2EtekEtWjAtOS5fLV0pJC8udGVzdChkaWQpO1xufTtcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPWluZGV4LmpzLm1hcCIsImltcG9ydCB7IGlzRGlkIH0gZnJvbSBcIi4vaW5kZXguanNcIjtcbmNvbnN0IFNVQkRPTUFJTiA9ICdfYXRwcm90byc7XG5jb25zdCBQUkVGSVggPSAnZGlkPSc7XG5leHBvcnQgY29uc3QgcmVzb2x2ZUhhbmRsZVZpYURvSCA9IGFzeW5jIChoYW5kbGUpID0+IHtcbiAgICBjb25zdCB1cmwgPSBuZXcgVVJMKCdodHRwczovL21vemlsbGEuY2xvdWRmbGFyZS1kbnMuY29tL2Rucy1xdWVyeScpO1xuICAgIHVybC5zZWFyY2hQYXJhbXMuc2V0KCd0eXBlJywgJ1RYVCcpO1xuICAgIHVybC5zZWFyY2hQYXJhbXMuc2V0KCduYW1lJywgYCR7U1VCRE9NQUlOfS4ke2hhbmRsZX1gKTtcbiAgICBjb25zdCByZXNwb25zZSA9IGF3YWl0IGZldGNoKHVybCwge1xuICAgICAgICBtZXRob2Q6ICdHRVQnLFxuICAgICAgICBoZWFkZXJzOiB7IGFjY2VwdDogJ2FwcGxpY2F0aW9uL2Rucy1qc29uJyB9LFxuICAgICAgICByZWRpcmVjdDogJ2ZvbGxvdycsXG4gICAgfSk7XG4gICAgY29uc3QgdHlwZSA9IHJlc3BvbnNlLmhlYWRlcnMuZ2V0KCdjb250ZW50LXR5cGUnKT8udHJpbSgpO1xuICAgIGlmICghcmVzcG9uc2Uub2spIHtcbiAgICAgICAgY29uc3QgbWVzc2FnZSA9IHR5cGU/LnN0YXJ0c1dpdGgoJ3RleHQvcGxhaW4nKVxuICAgICAgICAgICAgPyBhd2FpdCByZXNwb25zZS50ZXh0KClcbiAgICAgICAgICAgIDogYGZhaWxlZCB0byByZXNvbHZlICR7aGFuZGxlfWA7XG4gICAgICAgIHRocm93IG5ldyBFcnJvcihtZXNzYWdlKTtcbiAgICB9XG4gICAgaWYgKHR5cGUgIT09ICdhcHBsaWNhdGlvbi9kbnMtanNvbicpIHtcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKCd1bmV4cGVjdGVkIHJlc3BvbnNlIGZyb20gRG9IIHNlcnZlcicpO1xuICAgIH1cbiAgICBjb25zdCByZXN1bHQgPSBhc1Jlc3VsdChhd2FpdCByZXNwb25zZS5qc29uKCkpO1xuICAgIGNvbnN0IGFuc3dlcnMgPSByZXN1bHQuQW5zd2VyPy5maWx0ZXIoaXNBbnN3ZXJUeHQpLm1hcChleHRyYWN0VHh0RGF0YSkgPz8gW107XG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCBhbnN3ZXJzLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgIC8vIHNraXAgaWYgdGhlIGxpbmUgZG9lcyBub3Qgc3RhcnQgd2l0aCBcImRpZD1cIlxuICAgICAgICBpZiAoIWFuc3dlcnNbaV0uc3RhcnRzV2l0aChQUkVGSVgpKSB7XG4gICAgICAgICAgICBjb250aW51ZTtcbiAgICAgICAgfVxuICAgICAgICAvLyBlbnN1cmUgdGhlcmUgaXMgbm8gb3RoZXIgZW50cnkgc3RhcnRpbmcgd2l0aCBcImRpZD1cIlxuICAgICAgICBmb3IgKGxldCBqID0gaSArIDE7IGogPCBhbnN3ZXJzLmxlbmd0aDsgaisrKSB7XG4gICAgICAgICAgICBpZiAoYW5zd2Vyc1tqXS5zdGFydHNXaXRoKFBSRUZJWCkpIHtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBjb25zdCBkaWQgPSBhbnN3ZXJzW2ldLnNsaWNlKFBSRUZJWC5sZW5ndGgpO1xuICAgICAgICBpZiAoaXNEaWQoZGlkKSkge1xuICAgICAgICAgICAgcmV0dXJuIGRpZDtcbiAgICAgICAgfVxuICAgICAgICBicmVhaztcbiAgICB9XG4gICAgdGhyb3cgbmV3IEVycm9yKGBmYWlsZWQgdG8gcmVzb2x2ZSAke2hhbmRsZX1gKTtcbn07XG5jb25zdCBpc1Jlc3VsdCA9IChyZXN1bHQpID0+IHtcbiAgICBpZiAocmVzdWx0ID09PSBudWxsIHx8IHR5cGVvZiByZXN1bHQgIT09ICdvYmplY3QnKSB7XG4gICAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG4gICAgcmV0dXJuICgnU3RhdHVzJyBpbiByZXN1bHQgJiZcbiAgICAgICAgdHlwZW9mIHJlc3VsdC5TdGF0dXMgPT09ICdudW1iZXInICYmXG4gICAgICAgICghKCdBbnN3ZXInIGluIHJlc3VsdCkgfHwgKEFycmF5LmlzQXJyYXkocmVzdWx0LkFuc3dlcikgJiYgcmVzdWx0LkFuc3dlci5ldmVyeShpc0Fuc3dlcikpKSk7XG59O1xuY29uc3QgYXNSZXN1bHQgPSAocmVzdWx0KSA9PiB7XG4gICAgaWYgKCFpc1Jlc3VsdChyZXN1bHQpKSB7XG4gICAgICAgIHRocm93IG5ldyBUeXBlRXJyb3IoJ3VuZXhwZWN0ZWQgRG9IIHJlc3BvbnNlJyk7XG4gICAgfVxuICAgIHJldHVybiByZXN1bHQ7XG59O1xuY29uc3QgaXNBbnN3ZXIgPSAoYW5zd2VyKSA9PiB7XG4gICAgaWYgKGFuc3dlciA9PT0gbnVsbCB8fCB0eXBlb2YgYW5zd2VyICE9PSAnb2JqZWN0Jykge1xuICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuICAgIHJldHVybiAoJ25hbWUnIGluIGFuc3dlciAmJlxuICAgICAgICB0eXBlb2YgYW5zd2VyLm5hbWUgPT09ICdzdHJpbmcnICYmXG4gICAgICAgICd0eXBlJyBpbiBhbnN3ZXIgJiZcbiAgICAgICAgdHlwZW9mIGFuc3dlci50eXBlID09PSAnbnVtYmVyJyAmJlxuICAgICAgICAnZGF0YScgaW4gYW5zd2VyICYmXG4gICAgICAgIHR5cGVvZiBhbnN3ZXIuZGF0YSA9PT0gJ3N0cmluZycgJiZcbiAgICAgICAgJ1RUTCcgaW4gYW5zd2VyICYmXG4gICAgICAgIHR5cGVvZiBhbnN3ZXIuVFRMID09PSAnbnVtYmVyJyk7XG59O1xuY29uc3QgaXNBbnN3ZXJUeHQgPSAoYW5zd2VyKSA9PiB7XG4gICAgcmV0dXJuIGFuc3dlci50eXBlID09PSAxNjtcbn07XG5jb25zdCBleHRyYWN0VHh0RGF0YSA9IChhbnN3ZXIpID0+IHtcbiAgICByZXR1cm4gYW5zd2VyLmRhdGEucmVwbGFjZSgvXlwifFwiJC9nLCAnJykucmVwbGFjZSgvXFxcXFwiL2csICdcIicpO1xufTtcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPWRvaC5qcy5tYXAiLCJpbXBvcnQgeyBpc0RpZCB9IGZyb20gXCIuL2luZGV4LmpzXCI7XG5leHBvcnQgY29uc3QgcmVzb2x2ZUhhbmRsZVZpYUh0dHAgPSBhc3luYyAoaGFuZGxlKSA9PiB7XG4gICAgY29uc3QgdXJsID0gbmV3IFVSTCgnLy53ZWxsLWtub3duL2F0cHJvdG8tZGlkJywgYGh0dHBzOi8vJHtoYW5kbGV9YCk7XG4gICAgY29uc3QgcmVzcG9uc2UgPSBhd2FpdCBmZXRjaCh1cmwsIHsgcmVkaXJlY3Q6ICdlcnJvcicgfSk7XG4gICAgaWYgKCFyZXNwb25zZS5vaykge1xuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ2RvbWFpbiBpcyB1bnJlYWNoYWJsZScpO1xuICAgIH1cbiAgICBjb25zdCB0ZXh0ID0gYXdhaXQgcmVzcG9uc2UudGV4dCgpO1xuICAgIGNvbnN0IGRpZCA9IHRleHQuc3BsaXQoJ1xcbicpWzBdLnRyaW0oKTtcbiAgICBpZiAoaXNEaWQoZGlkKSkge1xuICAgICAgICByZXR1cm4gZGlkO1xuICAgIH1cbiAgICB0aHJvdyBuZXcgRXJyb3IoYGZhaWxlZCB0byByZXNvbHZlICR7aGFuZGxlfWApO1xufTtcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPWh0dHAuanMubWFwIiwiaW1wb3J0IHsgaXNEaWQgfSBmcm9tIFwiLi9pbmRleC5qc1wiO1xuaW1wb3J0IHsgcmVzb2x2ZUhhbmRsZVZpYURvSCB9IGZyb20gXCIuL2RvaC5qc1wiO1xuaW1wb3J0IHsgcmVzb2x2ZUhhbmRsZVZpYUh0dHAgfSBmcm9tIFwiLi9odHRwLmpzXCI7XG5jb25zdCBkaWRDYWNoZSA9IG5ldyBNYXAoKTtcbmV4cG9ydCBhc3luYyBmdW5jdGlvbiByZXNvbHZlSGFuZGxlQW5vbnltb3VzbHkoaGFuZGxlKSB7XG4gICAgaWYgKGlzRGlkKGhhbmRsZSkpXG4gICAgICAgIHJldHVybiBoYW5kbGU7XG4gICAgaWYgKGRpZENhY2hlLmhhcyhoYW5kbGUpKSB7XG4gICAgICAgIHJldHVybiBkaWRDYWNoZS5nZXQoaGFuZGxlKTtcbiAgICB9XG4gICAgY29uc3QgcmVzdWx0cyA9IGF3YWl0IFByb21pc2UuYWxsU2V0dGxlZChbXG4gICAgICAgIHJlc29sdmVIYW5kbGVWaWFIdHRwKGhhbmRsZSksXG4gICAgICAgIHJlc29sdmVIYW5kbGVWaWFEb0goaGFuZGxlKSxcbiAgICBdKTtcbiAgICBjb25zdCBkaWQgPSByZXN1bHRzXG4gICAgICAgIC5maW5kKHAgPT4gcC5zdGF0dXMgPT09ICdmdWxmaWxsZWQnKVxuICAgICAgICA/LnZhbHVlO1xuICAgIGlmIChkaWQgPT09IHVuZGVmaW5lZCkge1xuICAgICAgICB0aHJvdyByZXN1bHRzO1xuICAgIH1cbiAgICBkaWRDYWNoZS5zZXQoaGFuZGxlLCBkaWQpO1xuICAgIHJldHVybiBkaWQ7XG59XG4vLyMgc291cmNlTWFwcGluZ1VSTD1yZXNvbHZlLmpzLm1hcCIsImltcG9ydCB7IGdldERpZERvY3VtZW50LCBnZXRQZHNFbmRwb2ludCB9IGZyb20gJy4vaGFuZGxlcy9kaWQtZG9jdW1lbnQuanMnO1xuaW1wb3J0IHsgcmVzb2x2ZUhhbmRsZUFub255bW91c2x5IH0gZnJvbSBcIi4vaGFuZGxlcy9yZXNvbHZlLmpzXCI7XG5jb25zdCBkaWRQZHNDYWNoZSA9IG5ldyBNYXAoKTtcbmV4cG9ydCBhc3luYyBmdW5jdGlvbiBnZXREaWRBbmRQZHMoaGFuZGxlT3JEaWQpIHtcbiAgICBpZiAoZGlkUGRzQ2FjaGUuaGFzKGhhbmRsZU9yRGlkKSkge1xuICAgICAgICByZXR1cm4gZGlkUGRzQ2FjaGUuZ2V0KGhhbmRsZU9yRGlkKTtcbiAgICB9XG4gICAgY29uc3QgZGlkID0gYXdhaXQgcmVzb2x2ZUhhbmRsZUFub255bW91c2x5KGhhbmRsZU9yRGlkKTtcbiAgICBjb25zdCBkaWREb2N1bWVudCA9IGF3YWl0IGdldERpZERvY3VtZW50KGRpZCk7XG4gICAgY29uc3QgcGRzID0gZ2V0UGRzRW5kcG9pbnQoZGlkRG9jdW1lbnQpO1xuICAgIGlmICghcGRzKVxuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoYE5vIFBEUyBmb3IgJHtoYW5kbGVPckRpZH0gKCR7ZGlkfSkhYCk7XG4gICAgZGlkUGRzQ2FjaGUuc2V0KGhhbmRsZU9yRGlkLCB7IGRpZCwgcGRzLCBkaWREb2N1bWVudCB9KTtcbiAgICByZXR1cm4geyBkaWQsIHBkcywgZGlkRG9jdW1lbnQgfTtcbn1cbi8vIyBzb3VyY2VNYXBwaW5nVVJMPXBkcy1oZWxwZXJzLmpzLm1hcCIsIi8qIGVzbGludC1kaXNhYmxlIEB0eXBlc2NyaXB0LWVzbGludC9uby1lbXB0eS1vYmplY3QtdHlwZSAqL1xuaW1wb3J0IHsgQ3JlZGVudGlhbE1hbmFnZXIsIHNpbXBsZUZldGNoSGFuZGxlciwgWFJQQywgWFJQQ0Vycm9yIH0gZnJvbSBcIkBhdGN1dGUvY2xpZW50XCI7XG5pbXBvcnQgeyBBdFVyaSB9IGZyb20gXCJAYXRwcm90by9zeW50YXhcIjtcbmltcG9ydCB7IGdldERpZEFuZFBkcyB9IGZyb20gXCIuL3Bkcy1oZWxwZXJzLmpzXCI7XG5pbXBvcnQgeyByZXNvbHZlSGFuZGxlQW5vbnltb3VzbHkgfSBmcm9tIFwiLi9oYW5kbGVzL3Jlc29sdmUuanNcIjtcbmV4cG9ydCBmdW5jdGlvbiBpc0ludmFsaWRTd2FwRXJyb3IoZXJyKSB7XG4gICAgcmV0dXJuIGVyciBpbnN0YW5jZW9mIFhSUENFcnJvciAmJiBlcnIua2luZCA9PT0gJ0ludmFsaWRTd2FwJztcbn1cbmV4cG9ydCBmdW5jdGlvbiBpc1JlY29yZE5vdEZvdW5kRXJyb3IoZXJyKSB7XG4gICAgcmV0dXJuIGVyciBpbnN0YW5jZW9mIFhSUENFcnJvciAmJiBlcnIua2luZCA9PT0gJ1JlY29yZE5vdEZvdW5kJztcbn1cbmZ1bmN0aW9uIG1ha2VSZWNvcmRUeXBlZChyZWNvcmQpIHtcbiAgICBsZXQgbWVtb2l6ZWRBdFVyaTtcbiAgICBjb25zdCB1cmkgPSByZWNvcmQudXJpOyAvLyBjbG9zdXJlIHZhcmlhYmxlXG4gICAgcmV0dXJuIHtcbiAgICAgICAgLi4ucmVjb3JkLFxuICAgICAgICB2YWx1ZTogcmVjb3JkLnZhbHVlLFxuICAgICAgICBnZXQgdXJpKCkge1xuICAgICAgICAgICAgcmV0dXJuIG1lbW9pemVkQXRVcmkgPz89IG5ldyBBdFVyaSh1cmkpO1xuICAgICAgICB9XG4gICAgfTtcbn1cbmZ1bmN0aW9uIG1ha2VSZWNvcmRzVHlwZWQodmFsdWUpIHtcbiAgICByZXR1cm4ge1xuICAgICAgICAuLi52YWx1ZSxcbiAgICAgICAgcmVjb3JkczogdmFsdWUucmVjb3Jkcy5tYXAobWFrZVJlY29yZFR5cGVkKVxuICAgIH07XG59XG5leHBvcnQgY2xhc3MgS2l0dHlBZ2VudCB7XG4gICAgeHJwYztcbiAgICBjb25zdHJ1Y3RvcihvcHRzKSB7XG4gICAgICAgIHRoaXMueHJwYyA9IG9wdHMgaW5zdGFuY2VvZiBYUlBDID8gb3B0cyA6IG5ldyBYUlBDKG9wdHMpO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBHZXRzIGEgcmVhZC1vbmx5IGNsaWVudCBmb3IgYnNreS5zb2NpYWwgUERTZXMuXG4gICAgICovXG4gICAgc3RhdGljIGNyZWF0ZVVuYXV0aGVkKHNlcnZpY2UgPSAnaHR0cHM6Ly9ic2t5LnNvY2lhbCcpIHtcbiAgICAgICAgcmV0dXJuIG5ldyBLaXR0eUFnZW50KHsgaGFuZGxlcjogc2ltcGxlRmV0Y2hIYW5kbGVyKHsgc2VydmljZSB9KSB9KTtcbiAgICB9XG4gICAgLyoqXG4gICAgICogR2V0cyBhIHJlYWQtb25seSBjbGllbnQgZm9yIHRoZSBCbHVlc2t5IEFwcFZpZXcuXG4gICAgICovXG4gICAgc3RhdGljIGNyZWF0ZUFwcHZpZXcoc2VydmljZSA9ICdodHRwczovL2FwaS5ic2t5LmFwcCcpIHtcbiAgICAgICAgcmV0dXJuIG5ldyBLaXR0eUFnZW50KHsgaGFuZGxlcjogc2ltcGxlRmV0Y2hIYW5kbGVyKHsgc2VydmljZSB9KSB9KTtcbiAgICB9XG4gICAgc3RhdGljIHBkc0FnZW50Q2FjaGUgPSBuZXcgTWFwKCk7XG4gICAgLyoqXG4gICAgICogR2V0cyBhIHJlYWQtb25seSBjbGllbnQgZm9yIHRoZSBQRFMgaG9zdGluZyBhIHNwZWNpZmljIGFjY291bnQgdmlhIGhhbmRsZSBvciBESUQuXG4gICAgICovXG4gICAgc3RhdGljIGFzeW5jIGdldE9yQ3JlYXRlUGRzKGhhbmRsZU9yRGlkKSB7XG4gICAgICAgIGNvbnN0IGRpZCA9IGF3YWl0IHJlc29sdmVIYW5kbGVBbm9ueW1vdXNseShoYW5kbGVPckRpZCk7XG4gICAgICAgIGNvbnN0IGV4aXN0aW5nQWdlbnQgPSBLaXR0eUFnZW50LnBkc0FnZW50Q2FjaGUuZ2V0KGRpZCk7XG4gICAgICAgIGlmIChleGlzdGluZ0FnZW50KVxuICAgICAgICAgICAgcmV0dXJuIGV4aXN0aW5nQWdlbnQ7XG4gICAgICAgIGNvbnN0IGRpZEFuZFBkcyA9IGF3YWl0IGdldERpZEFuZFBkcyhkaWQpO1xuICAgICAgICBjb25zdCBhZ2VudCA9IEtpdHR5QWdlbnQuY3JlYXRlVW5hdXRoZWQoZGlkQW5kUGRzLnBkcyk7XG4gICAgICAgIEtpdHR5QWdlbnQucGRzQWdlbnRDYWNoZS5zZXQoZGlkLCBhZ2VudCk7XG4gICAgICAgIHJldHVybiBhZ2VudDtcbiAgICB9XG4gICAgLyoqXG4gICAgICogR2V0cyBhbiBhdXRoZW50aWNhdGVkIGNsaWVudCBmb3IgdGhlIFBEUyBob3N0aW5nIGEgc3BlY2lmaWMgYWNjb3VudCB2aWEgaGFuZGxlIG9yIERJRC5cbiAgICAgKi9cbiAgICBzdGF0aWMgYXN5bmMgY3JlYXRlUGRzV2l0aENyZWRlbnRpYWxzKGhhbmRsZU9yRGlkKSB7XG4gICAgICAgIGNvbnN0IHsgZGlkLCBwZHMgfSA9IGF3YWl0IGdldERpZEFuZFBkcyhoYW5kbGVPckRpZCk7XG4gICAgICAgIGNvbnN0IG1hbmFnZXIgPSBuZXcgQ3JlZGVudGlhbE1hbmFnZXIoeyBzZXJ2aWNlOiBwZHMgfSk7XG4gICAgICAgIGNvbnN0IGFnZW50ID0gbmV3IEtpdHR5QWdlbnQoeyBoYW5kbGVyOiBtYW5hZ2VyIH0pO1xuICAgICAgICByZXR1cm4geyBkaWQsIG1hbmFnZXIsIGFnZW50IH07XG4gICAgfVxuICAgIC8qKiBNYWtlcyBhIHJlcXVlc3QgdG8gdGhlIFhSUEMgc2VydmljZSAqL1xuICAgIGFzeW5jIHJlcXVlc3Qob3B0aW9ucykge1xuICAgICAgICByZXR1cm4gYXdhaXQgdGhpcy54cnBjLnJlcXVlc3Qob3B0aW9ucyk7XG4gICAgfVxuICAgIGFzeW5jIHF1ZXJ5KG5zaWQsIC4uLmFyZ3MpIHtcbiAgICAgICAgY29uc3QgW3BhcmFtcywgZGF0YV0gPSBhcmdzO1xuICAgICAgICBjb25zdCB7IGRhdGE6IG91dERhdGEgfSA9IGF3YWl0IHRoaXMueHJwYy5nZXQobnNpZCwgeyBwYXJhbXMsIGRhdGEsIH0pO1xuICAgICAgICByZXR1cm4gb3V0RGF0YTtcbiAgICB9XG4gICAgYXN5bmMgY2FsbChuc2lkLCAuLi5hcmdzKSB7XG4gICAgICAgIGNvbnN0IFtkYXRhLCBwYXJhbXNdID0gYXJncztcbiAgICAgICAgY29uc3QgeyBkYXRhOiBvdXREYXRhIH0gPSBhd2FpdCB0aGlzLnhycGMuY2FsbChuc2lkLCB7IHBhcmFtcywgZGF0YSB9KTtcbiAgICAgICAgcmV0dXJuIG91dERhdGE7XG4gICAgfVxuICAgIGFzeW5jIGdldChwYXJhbXMpIHtcbiAgICAgICAgY29uc3QgZGF0YSA9IG1ha2VSZWNvcmRUeXBlZChhd2FpdCB0aGlzLnF1ZXJ5KCdjb20uYXRwcm90by5yZXBvLmdldFJlY29yZCcsIHBhcmFtcykpO1xuICAgICAgICByZXR1cm4gZGF0YTtcbiAgICB9XG4gICAgYXN5bmMgZ2V0QmxvYihwYXJhbXMpIHtcbiAgICAgICAgaWYgKHR5cGVvZiBwYXJhbXMuY2lkICE9PSAnc3RyaW5nJykge1xuICAgICAgICAgICAgcGFyYW1zID0ge1xuICAgICAgICAgICAgICAgIGNpZDogcGFyYW1zLmNpZC5yZWYuJGxpbmssXG4gICAgICAgICAgICAgICAgZGlkOiBwYXJhbXMuZGlkLFxuICAgICAgICAgICAgfTtcbiAgICAgICAgfVxuICAgICAgICBjb25zdCBkYXRhID0gYXdhaXQgdGhpcy5xdWVyeSgnY29tLmF0cHJvdG8uc3luYy5nZXRCbG9iJywgcGFyYW1zKTtcbiAgICAgICAgcmV0dXJuIGRhdGE7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIEF0Y3V0ZSBsaWtlcyB0byByZXR1cm4gYmxvYnMgYXMgdGV4dCBzb21ldGltZXMuIEkgZG9uJ3Qga25vdyB3aHkgeWV0LiBUaGlzIHJldHVybnMgdGhlbSBhcyBiaW5hcnkgaWYgdGhhdFxuICAgICAqIGhhcHBlbnMuXG4gICAgICovXG4gICAgYXN5bmMgZ2V0QmxvYkFzQmluYXJ5KHBhcmFtcykge1xuICAgICAgICBsZXQgYmxvYiA9IGF3YWl0IHRoaXMuZ2V0QmxvYihwYXJhbXMpO1xuICAgICAgICBpZiAodHlwZW9mIGJsb2IgPT09ICdzdHJpbmcnKVxuICAgICAgICAgICAgYmxvYiA9IG5ldyBUZXh0RW5jb2RlcigpLmVuY29kZShibG9iKTtcbiAgICAgICAgcmV0dXJuIGJsb2I7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIEF0Y3V0ZSBsaWtlcyB0byByZXR1cm4gYmxvYnMgYXMgdGV4dCBzb21ldGltZXMuIEkgZG9uJ3Qga25vdyB3aHkgeWV0LiBUaGlzIHJldHVybnMgdGhlbSBhcyB0ZXh0IG5vIG1hdHRlciB3aGF0LFxuICAgICAqIGFuZCBhbHNvIGFsbG93cyB5b3UgdG8gc3BlY2lmeSBhbiBlbmNvZGluZy5cbiAgICAgKi9cbiAgICBhc3luYyBnZXRCbG9iQXNUZXh0KHBhcmFtcywgZW5jb2RpbmcpIHtcbiAgICAgICAgbGV0IGJsb2IgPSBhd2FpdCB0aGlzLmdldEJsb2IocGFyYW1zKTtcbiAgICAgICAgaWYgKHR5cGVvZiBibG9iICE9PSAnc3RyaW5nJylcbiAgICAgICAgICAgIGJsb2IgPSBuZXcgVGV4dERlY29kZXIoZW5jb2RpbmcpLmRlY29kZShibG9iKTtcbiAgICAgICAgcmV0dXJuIGJsb2I7XG4gICAgfVxuICAgIGFzeW5jIHRyeUdldChwYXJhbXMpIHtcbiAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgIHJldHVybiBhd2FpdCB0aGlzLmdldChwYXJhbXMpO1xuICAgICAgICB9XG4gICAgICAgIGNhdGNoIChlcnIpIHtcbiAgICAgICAgICAgIGlmICghaXNSZWNvcmROb3RGb3VuZEVycm9yKGVycikpXG4gICAgICAgICAgICAgICAgdGhyb3cgZXJyO1xuICAgICAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgICAgICB1cmk6IHVuZGVmaW5lZCxcbiAgICAgICAgICAgICAgICB2YWx1ZTogdW5kZWZpbmVkLFxuICAgICAgICAgICAgICAgIGNpZDogdW5kZWZpbmVkLFxuICAgICAgICAgICAgfTtcbiAgICAgICAgfVxuICAgIH1cbiAgICBhc3luYyBsaXN0KHBhcmFtcykge1xuICAgICAgICBjb25zdCBkYXRhID0gbWFrZVJlY29yZHNUeXBlZChhd2FpdCB0aGlzLnF1ZXJ5KCdjb20uYXRwcm90by5yZXBvLmxpc3RSZWNvcmRzJywgcGFyYW1zKSk7XG4gICAgICAgIHJldHVybiBkYXRhO1xuICAgIH1cbiAgICBhc3luYyBwdXQocGFyYW1zKSB7XG4gICAgICAgIGNvbnN0IGRhdGEgPSBhd2FpdCB0aGlzLmNhbGwoJ2NvbS5hdHByb3RvLnJlcG8ucHV0UmVjb3JkJywgcGFyYW1zKTtcbiAgICAgICAgcmV0dXJuIGRhdGE7XG4gICAgfVxuICAgIGFzeW5jIHVwbG9hZEJsb2IoYnVmKSB7XG4gICAgICAgIGNvbnN0IGRhdGEgPSBhd2FpdCB0aGlzLmNhbGwoJ2NvbS5hdHByb3RvLnJlcG8udXBsb2FkQmxvYicsIGJ1Zik7XG4gICAgICAgIHJldHVybiBkYXRhLmJsb2I7XG4gICAgfVxuICAgIGFzeW5jIHRyeVN3YXAocGFyYW1zKSB7XG4gICAgICAgIHRyeSB7XG4gICAgICAgICAgICBhd2FpdCB0aGlzLnB1dChwYXJhbXMpO1xuICAgICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgIH1cbiAgICAgICAgY2F0Y2ggKGVycikge1xuICAgICAgICAgICAgaWYgKCFpc0ludmFsaWRTd2FwRXJyb3IoZXJyKSkge1xuICAgICAgICAgICAgICAgIHRocm93IGVycjtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgfVxuICAgIH1cbiAgICBhc3luYyBjcmVhdGUocGFyYW1zKSB7XG4gICAgICAgIGNvbnN0IGRhdGEgPSBhd2FpdCB0aGlzLmNhbGwoJ2NvbS5hdHByb3RvLnJlcG8uY3JlYXRlUmVjb3JkJywgcGFyYW1zKTtcbiAgICAgICAgcmV0dXJuIGRhdGE7XG4gICAgfVxuICAgIGFzeW5jIGRlbGV0ZShwYXJhbXMpIHtcbiAgICAgICAgY29uc3QgZGF0YSA9IGF3YWl0IHRoaXMuY2FsbCgnY29tLmF0cHJvdG8ucmVwby5kZWxldGVSZWNvcmQnLCBwYXJhbXMpO1xuICAgICAgICByZXR1cm4gZGF0YTtcbiAgICB9XG4gICAgYXN5bmMgcGFnaW5hdGlvbkhlbHBlcihsaW1pdCwga2V5LCBxdWVyeSwgZ2V0UmVzdWx0cywgcmVzdWx0c0VxdWFsKSB7XG4gICAgICAgIGNvbnN0IFBFUl9QQUdFID0gMTAwO1xuICAgICAgICBjb25zdCByZXN1bHRzID0gW107XG4gICAgICAgIGxldCBjdXJzb3IgPSB1bmRlZmluZWQ7XG4gICAgICAgIGRvIHtcbiAgICAgICAgICAgIGNvbnN0IGRhdGEgPSBhd2FpdCBxdWVyeShjdXJzb3IsIGxpbWl0ID09PSB1bmRlZmluZWRcbiAgICAgICAgICAgICAgICA/IFBFUl9QQUdFXG4gICAgICAgICAgICAgICAgOiBsaW1pdCAvIFBFUl9QQUdFID4gMVxuICAgICAgICAgICAgICAgICAgICA/IFBFUl9QQUdFXG4gICAgICAgICAgICAgICAgICAgIDogbGltaXQpO1xuICAgICAgICAgICAgY29uc3QgdGhlc2VSZXN1bHRzID0gZ2V0UmVzdWx0cyhkYXRhKTtcbiAgICAgICAgICAgIGlmICghdGhlc2VSZXN1bHRzLmxlbmd0aCB8fFxuICAgICAgICAgICAgICAgIHRoZXNlUmVzdWx0cy5ldmVyeShlID0+IHJlc3VsdHMuZmluZChlMSA9PiByZXN1bHRzRXF1YWwoZTEsIGUpKSkpIHtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmIChsaW1pdCAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICAgICAgbGltaXQgLT0gdGhlc2VSZXN1bHRzLmxlbmd0aDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHJlc3VsdHMucHVzaCguLi50aGVzZVJlc3VsdHMpO1xuICAgICAgICAgICAgY3Vyc29yID0gZGF0YS5jdXJzb3I7XG4gICAgICAgICAgICBpZiAoIWN1cnNvcilcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgfSB3aGlsZSAoY3Vyc29yKTtcbiAgICAgICAgcmV0dXJuIHsgW2tleV06IHJlc3VsdHMsIGN1cnNvciB9O1xuICAgIH1cbiAgICBhc3luYyBwYWdpbmF0ZWRMaXN0KHBhcmFtcykge1xuICAgICAgICBjb25zdCBkYXRhID0gbWFrZVJlY29yZHNUeXBlZChhd2FpdCB0aGlzLnBhZ2luYXRpb25IZWxwZXIocGFyYW1zLmxpbWl0LCAncmVjb3JkcycsIGFzeW5jIChjdXJzb3IsIGxpbWl0KSA9PiBhd2FpdCB0aGlzLnF1ZXJ5KCdjb20uYXRwcm90by5yZXBvLmxpc3RSZWNvcmRzJywge1xuICAgICAgICAgICAgcmVwbzogcGFyYW1zLnJlcG8sXG4gICAgICAgICAgICBjb2xsZWN0aW9uOiBwYXJhbXMuY29sbGVjdGlvbixcbiAgICAgICAgICAgIGxpbWl0LFxuICAgICAgICAgICAgcmV2ZXJzZTogcGFyYW1zLnJldmVyc2UgPz8gdHJ1ZSxcbiAgICAgICAgICAgIGN1cnNvclxuICAgICAgICB9KSwgb3V0cHV0ID0+IG91dHB1dC5yZWNvcmRzLCAoYSwgYikgPT4gYS51cmkgPT09IGIudXJpKSk7XG4gICAgICAgIHJldHVybiBkYXRhO1xuICAgIH1cbiAgICBhc3luYyBwYWdpbmF0ZWRMaXN0QmxvYnMocGFyYW1zKSB7XG4gICAgICAgIHJldHVybiBhd2FpdCB0aGlzLnBhZ2luYXRpb25IZWxwZXIocGFyYW1zLmxpbWl0LCAnY2lkcycsIGFzeW5jIChjdXJzb3IsIGxpbWl0KSA9PiBhd2FpdCB0aGlzLnF1ZXJ5KCdjb20uYXRwcm90by5zeW5jLmxpc3RCbG9icycsIHtcbiAgICAgICAgICAgIGRpZDogcGFyYW1zLmRpZCxcbiAgICAgICAgICAgIGxpbWl0LFxuICAgICAgICAgICAgY3Vyc29yXG4gICAgICAgIH0pLCBvdXRwdXQgPT4gb3V0cHV0LmNpZHMsIChhLCBiKSA9PiBhID09PSBiKTtcbiAgICB9XG4gICAgYXN5bmMgcGFnaW5hdGVkTGlzdFJlcG9zKHBhcmFtcykge1xuICAgICAgICByZXR1cm4gYXdhaXQgdGhpcy5wYWdpbmF0aW9uSGVscGVyKHBhcmFtcy5saW1pdCwgJ3JlcG9zJywgYXN5bmMgKGN1cnNvciwgbGltaXQpID0+IGF3YWl0IHRoaXMucXVlcnkoJ2NvbS5hdHByb3RvLnN5bmMubGlzdFJlcG9zJywge1xuICAgICAgICAgICAgbGltaXQsXG4gICAgICAgICAgICBjdXJzb3JcbiAgICAgICAgfSksIG91dHB1dCA9PiBvdXRwdXQucmVwb3MsIChhLCBiKSA9PiBhLmRpZCA9PT0gYi5kaWQpO1xuICAgIH1cbiAgICBhc3luYyBiYXRjaFdyaXRlKHBhcmFtcykge1xuICAgICAgICByZXR1cm4gYXdhaXQgdGhpcy5jYWxsKCdjb20uYXRwcm90by5yZXBvLmFwcGx5V3JpdGVzJywgcGFyYW1zKTtcbiAgICB9XG4gICAgYXN5bmMgcmVzb2x2ZUhhbmRsZShoYW5kbGUpIHtcbiAgICAgICAgaWYgKGhhbmRsZS5zdGFydHNXaXRoKCdkaWQ6JykpXG4gICAgICAgICAgICByZXR1cm4gaGFuZGxlO1xuICAgICAgICBjb25zdCB7IGRpZCB9ID0gYXdhaXQgdGhpcy5xdWVyeSgnY29tLmF0cHJvdG8uaWRlbnRpdHkucmVzb2x2ZUhhbmRsZScsIHtcbiAgICAgICAgICAgIGhhbmRsZVxuICAgICAgICB9KTtcbiAgICAgICAgcmV0dXJuIGRpZDtcbiAgICB9XG59XG4vLyMgc291cmNlTWFwcGluZ1VSTD1hZ2VudC5qcy5tYXAiLCJleHBvcnQgKiBmcm9tICcuL2FnZW50LmpzJztcbmV4cG9ydCAqIGZyb20gJy4vY2lkLmpzJztcbmV4cG9ydCAqIGZyb20gJy4vcmtleS5qcyc7XG5leHBvcnQgKiBmcm9tICcuL3Bkcy1oZWxwZXJzLmpzJztcbmV4cG9ydCAqIGZyb20gJy4vc2hvcnRpZC5qcyc7XG5leHBvcnQgeyByZXNvbHZlSGFuZGxlQW5vbnltb3VzbHkgfSBmcm9tICcuL2hhbmRsZXMvcmVzb2x2ZS5qcyc7XG4vLyMgc291cmNlTWFwcGluZ1VSTD1pbmRleC5qcy5tYXAiLCJleHBvcnQgY29uc3QgZW1wdHkgPSBuZXcgVWludDhBcnJheSgwKTtcbmV4cG9ydCBmdW5jdGlvbiB0b0hleChkKSB7XG4gICAgcmV0dXJuIGQucmVkdWNlKChoZXgsIGJ5dGUpID0+IGhleCArIGJ5dGUudG9TdHJpbmcoMTYpLnBhZFN0YXJ0KDIsICcwJyksICcnKTtcbn1cbmV4cG9ydCBmdW5jdGlvbiBmcm9tSGV4KGhleCkge1xuICAgIGNvbnN0IGhleGVzID0gaGV4Lm1hdGNoKC8uLi9nKTtcbiAgICByZXR1cm4gaGV4ZXMgIT0gbnVsbCA/IG5ldyBVaW50OEFycmF5KGhleGVzLm1hcChiID0+IHBhcnNlSW50KGIsIDE2KSkpIDogZW1wdHk7XG59XG5leHBvcnQgZnVuY3Rpb24gZXF1YWxzKGFhLCBiYikge1xuICAgIGlmIChhYSA9PT0gYmIpXG4gICAgICAgIHJldHVybiB0cnVlO1xuICAgIGlmIChhYS5ieXRlTGVuZ3RoICE9PSBiYi5ieXRlTGVuZ3RoKSB7XG4gICAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG4gICAgZm9yIChsZXQgaWkgPSAwOyBpaSA8IGFhLmJ5dGVMZW5ndGg7IGlpKyspIHtcbiAgICAgICAgaWYgKGFhW2lpXSAhPT0gYmJbaWldKSB7XG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIHRydWU7XG59XG5leHBvcnQgZnVuY3Rpb24gY29lcmNlKG8pIHtcbiAgICBpZiAobyBpbnN0YW5jZW9mIFVpbnQ4QXJyYXkgJiYgby5jb25zdHJ1Y3Rvci5uYW1lID09PSAnVWludDhBcnJheScpXG4gICAgICAgIHJldHVybiBvO1xuICAgIGlmIChvIGluc3RhbmNlb2YgQXJyYXlCdWZmZXIpXG4gICAgICAgIHJldHVybiBuZXcgVWludDhBcnJheShvKTtcbiAgICBpZiAoQXJyYXlCdWZmZXIuaXNWaWV3KG8pKSB7XG4gICAgICAgIHJldHVybiBuZXcgVWludDhBcnJheShvLmJ1ZmZlciwgby5ieXRlT2Zmc2V0LCBvLmJ5dGVMZW5ndGgpO1xuICAgIH1cbiAgICB0aHJvdyBuZXcgRXJyb3IoJ1Vua25vd24gdHlwZSwgbXVzdCBiZSBiaW5hcnkgdHlwZScpO1xufVxuZXhwb3J0IGZ1bmN0aW9uIGlzQmluYXJ5KG8pIHtcbiAgICByZXR1cm4gbyBpbnN0YW5jZW9mIEFycmF5QnVmZmVyIHx8IEFycmF5QnVmZmVyLmlzVmlldyhvKTtcbn1cbmV4cG9ydCBmdW5jdGlvbiBmcm9tU3RyaW5nKHN0cikge1xuICAgIHJldHVybiBuZXcgVGV4dEVuY29kZXIoKS5lbmNvZGUoc3RyKTtcbn1cbmV4cG9ydCBmdW5jdGlvbiB0b1N0cmluZyhiKSB7XG4gICAgcmV0dXJuIG5ldyBUZXh0RGVjb2RlcigpLmRlY29kZShiKTtcbn1cbi8vIyBzb3VyY2VNYXBwaW5nVVJMPWJ5dGVzLmpzLm1hcCIsIi8qIGVzbGludC1kaXNhYmxlICovXG4vLyBiYXNlLXggZW5jb2RpbmcgLyBkZWNvZGluZ1xuLy8gQ29weXJpZ2h0IChjKSAyMDE4IGJhc2UteCBjb250cmlidXRvcnNcbi8vIENvcHlyaWdodCAoYykgMjAxNC0yMDE4IFRoZSBCaXRjb2luIENvcmUgZGV2ZWxvcGVycyAoYmFzZTU4LmNwcClcbi8vIERpc3RyaWJ1dGVkIHVuZGVyIHRoZSBNSVQgc29mdHdhcmUgbGljZW5zZSwgc2VlIHRoZSBhY2NvbXBhbnlpbmdcbi8vIGZpbGUgTElDRU5TRSBvciBodHRwOi8vd3d3Lm9wZW5zb3VyY2Uub3JnL2xpY2Vuc2VzL21pdC1saWNlbnNlLnBocC5cbi8qKlxuICogQHBhcmFtIHtzdHJpbmd9IEFMUEhBQkVUXG4gKiBAcGFyYW0ge2FueX0gbmFtZVxuICovXG5mdW5jdGlvbiBiYXNlKEFMUEhBQkVULCBuYW1lKSB7XG4gICAgaWYgKEFMUEhBQkVULmxlbmd0aCA+PSAyNTUpIHtcbiAgICAgICAgdGhyb3cgbmV3IFR5cGVFcnJvcignQWxwaGFiZXQgdG9vIGxvbmcnKTtcbiAgICB9XG4gICAgdmFyIEJBU0VfTUFQID0gbmV3IFVpbnQ4QXJyYXkoMjU2KTtcbiAgICBmb3IgKHZhciBqID0gMDsgaiA8IEJBU0VfTUFQLmxlbmd0aDsgaisrKSB7XG4gICAgICAgIEJBU0VfTUFQW2pdID0gMjU1O1xuICAgIH1cbiAgICBmb3IgKHZhciBpID0gMDsgaSA8IEFMUEhBQkVULmxlbmd0aDsgaSsrKSB7XG4gICAgICAgIHZhciB4ID0gQUxQSEFCRVQuY2hhckF0KGkpO1xuICAgICAgICB2YXIgeGMgPSB4LmNoYXJDb2RlQXQoMCk7XG4gICAgICAgIGlmIChCQVNFX01BUFt4Y10gIT09IDI1NSkge1xuICAgICAgICAgICAgdGhyb3cgbmV3IFR5cGVFcnJvcih4ICsgJyBpcyBhbWJpZ3VvdXMnKTtcbiAgICAgICAgfVxuICAgICAgICBCQVNFX01BUFt4Y10gPSBpO1xuICAgIH1cbiAgICB2YXIgQkFTRSA9IEFMUEhBQkVULmxlbmd0aDtcbiAgICB2YXIgTEVBREVSID0gQUxQSEFCRVQuY2hhckF0KDApO1xuICAgIHZhciBGQUNUT1IgPSBNYXRoLmxvZyhCQVNFKSAvIE1hdGgubG9nKDI1Nik7IC8vIGxvZyhCQVNFKSAvIGxvZygyNTYpLCByb3VuZGVkIHVwXG4gICAgdmFyIGlGQUNUT1IgPSBNYXRoLmxvZygyNTYpIC8gTWF0aC5sb2coQkFTRSk7IC8vIGxvZygyNTYpIC8gbG9nKEJBU0UpLCByb3VuZGVkIHVwXG4gICAgLyoqXG4gICAgICogQHBhcmFtIHthbnlbXSB8IEl0ZXJhYmxlPG51bWJlcj59IHNvdXJjZVxuICAgICAqL1xuICAgIGZ1bmN0aW9uIGVuY29kZShzb3VyY2UpIHtcbiAgICAgICAgLy8gQHRzLWlnbm9yZVxuICAgICAgICBpZiAoc291cmNlIGluc3RhbmNlb2YgVWludDhBcnJheSlcbiAgICAgICAgICAgIDtcbiAgICAgICAgZWxzZSBpZiAoQXJyYXlCdWZmZXIuaXNWaWV3KHNvdXJjZSkpIHtcbiAgICAgICAgICAgIHNvdXJjZSA9IG5ldyBVaW50OEFycmF5KHNvdXJjZS5idWZmZXIsIHNvdXJjZS5ieXRlT2Zmc2V0LCBzb3VyY2UuYnl0ZUxlbmd0aCk7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSBpZiAoQXJyYXkuaXNBcnJheShzb3VyY2UpKSB7XG4gICAgICAgICAgICBzb3VyY2UgPSBVaW50OEFycmF5LmZyb20oc291cmNlKTtcbiAgICAgICAgfVxuICAgICAgICBpZiAoIShzb3VyY2UgaW5zdGFuY2VvZiBVaW50OEFycmF5KSkge1xuICAgICAgICAgICAgdGhyb3cgbmV3IFR5cGVFcnJvcignRXhwZWN0ZWQgVWludDhBcnJheScpO1xuICAgICAgICB9XG4gICAgICAgIGlmIChzb3VyY2UubGVuZ3RoID09PSAwKSB7XG4gICAgICAgICAgICByZXR1cm4gJyc7XG4gICAgICAgIH1cbiAgICAgICAgLy8gU2tpcCAmIGNvdW50IGxlYWRpbmcgemVyb2VzLlxuICAgICAgICB2YXIgemVyb2VzID0gMDtcbiAgICAgICAgdmFyIGxlbmd0aCA9IDA7XG4gICAgICAgIHZhciBwYmVnaW4gPSAwO1xuICAgICAgICB2YXIgcGVuZCA9IHNvdXJjZS5sZW5ndGg7XG4gICAgICAgIHdoaWxlIChwYmVnaW4gIT09IHBlbmQgJiYgc291cmNlW3BiZWdpbl0gPT09IDApIHtcbiAgICAgICAgICAgIHBiZWdpbisrO1xuICAgICAgICAgICAgemVyb2VzKys7XG4gICAgICAgIH1cbiAgICAgICAgLy8gQWxsb2NhdGUgZW5vdWdoIHNwYWNlIGluIGJpZy1lbmRpYW4gYmFzZTU4IHJlcHJlc2VudGF0aW9uLlxuICAgICAgICB2YXIgc2l6ZSA9ICgocGVuZCAtIHBiZWdpbikgKiBpRkFDVE9SICsgMSkgPj4+IDA7XG4gICAgICAgIHZhciBiNTggPSBuZXcgVWludDhBcnJheShzaXplKTtcbiAgICAgICAgLy8gUHJvY2VzcyB0aGUgYnl0ZXMuXG4gICAgICAgIHdoaWxlIChwYmVnaW4gIT09IHBlbmQpIHtcbiAgICAgICAgICAgIHZhciBjYXJyeSA9IHNvdXJjZVtwYmVnaW5dO1xuICAgICAgICAgICAgLy8gQXBwbHkgXCJiNTggPSBiNTggKiAyNTYgKyBjaFwiLlxuICAgICAgICAgICAgdmFyIGkgPSAwO1xuICAgICAgICAgICAgZm9yICh2YXIgaXQxID0gc2l6ZSAtIDE7IChjYXJyeSAhPT0gMCB8fCBpIDwgbGVuZ3RoKSAmJiAoaXQxICE9PSAtMSk7IGl0MS0tLCBpKyspIHtcbiAgICAgICAgICAgICAgICBjYXJyeSArPSAoMjU2ICogYjU4W2l0MV0pID4+PiAwO1xuICAgICAgICAgICAgICAgIGI1OFtpdDFdID0gKGNhcnJ5ICUgQkFTRSkgPj4+IDA7XG4gICAgICAgICAgICAgICAgY2FycnkgPSAoY2FycnkgLyBCQVNFKSA+Pj4gMDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmIChjYXJyeSAhPT0gMCkge1xuICAgICAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcignTm9uLXplcm8gY2FycnknKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGxlbmd0aCA9IGk7XG4gICAgICAgICAgICBwYmVnaW4rKztcbiAgICAgICAgfVxuICAgICAgICAvLyBTa2lwIGxlYWRpbmcgemVyb2VzIGluIGJhc2U1OCByZXN1bHQuXG4gICAgICAgIHZhciBpdDIgPSBzaXplIC0gbGVuZ3RoO1xuICAgICAgICB3aGlsZSAoaXQyICE9PSBzaXplICYmIGI1OFtpdDJdID09PSAwKSB7XG4gICAgICAgICAgICBpdDIrKztcbiAgICAgICAgfVxuICAgICAgICAvLyBUcmFuc2xhdGUgdGhlIHJlc3VsdCBpbnRvIGEgc3RyaW5nLlxuICAgICAgICB2YXIgc3RyID0gTEVBREVSLnJlcGVhdCh6ZXJvZXMpO1xuICAgICAgICBmb3IgKDsgaXQyIDwgc2l6ZTsgKytpdDIpIHtcbiAgICAgICAgICAgIHN0ciArPSBBTFBIQUJFVC5jaGFyQXQoYjU4W2l0Ml0pO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBzdHI7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIEBwYXJhbSB7c3RyaW5nIHwgc3RyaW5nW119IHNvdXJjZVxuICAgICAqL1xuICAgIGZ1bmN0aW9uIGRlY29kZVVuc2FmZShzb3VyY2UpIHtcbiAgICAgICAgaWYgKHR5cGVvZiBzb3VyY2UgIT09ICdzdHJpbmcnKSB7XG4gICAgICAgICAgICB0aHJvdyBuZXcgVHlwZUVycm9yKCdFeHBlY3RlZCBTdHJpbmcnKTtcbiAgICAgICAgfVxuICAgICAgICBpZiAoc291cmNlLmxlbmd0aCA9PT0gMCkge1xuICAgICAgICAgICAgcmV0dXJuIG5ldyBVaW50OEFycmF5KCk7XG4gICAgICAgIH1cbiAgICAgICAgdmFyIHBzeiA9IDA7XG4gICAgICAgIC8vIFNraXAgbGVhZGluZyBzcGFjZXMuXG4gICAgICAgIGlmIChzb3VyY2VbcHN6XSA9PT0gJyAnKSB7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgICAgLy8gU2tpcCBhbmQgY291bnQgbGVhZGluZyAnMSdzLlxuICAgICAgICB2YXIgemVyb2VzID0gMDtcbiAgICAgICAgdmFyIGxlbmd0aCA9IDA7XG4gICAgICAgIHdoaWxlIChzb3VyY2VbcHN6XSA9PT0gTEVBREVSKSB7XG4gICAgICAgICAgICB6ZXJvZXMrKztcbiAgICAgICAgICAgIHBzeisrO1xuICAgICAgICB9XG4gICAgICAgIC8vIEFsbG9jYXRlIGVub3VnaCBzcGFjZSBpbiBiaWctZW5kaWFuIGJhc2UyNTYgcmVwcmVzZW50YXRpb24uXG4gICAgICAgIHZhciBzaXplID0gKCgoc291cmNlLmxlbmd0aCAtIHBzeikgKiBGQUNUT1IpICsgMSkgPj4+IDA7IC8vIGxvZyg1OCkgLyBsb2coMjU2KSwgcm91bmRlZCB1cC5cbiAgICAgICAgdmFyIGIyNTYgPSBuZXcgVWludDhBcnJheShzaXplKTtcbiAgICAgICAgLy8gUHJvY2VzcyB0aGUgY2hhcmFjdGVycy5cbiAgICAgICAgd2hpbGUgKHNvdXJjZVtwc3pdKSB7XG4gICAgICAgICAgICAvLyBEZWNvZGUgY2hhcmFjdGVyXG4gICAgICAgICAgICB2YXIgY2FycnkgPSBCQVNFX01BUFtzb3VyY2UuY2hhckNvZGVBdChwc3opXTtcbiAgICAgICAgICAgIC8vIEludmFsaWQgY2hhcmFjdGVyXG4gICAgICAgICAgICBpZiAoY2FycnkgPT09IDI1NSkge1xuICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHZhciBpID0gMDtcbiAgICAgICAgICAgIGZvciAodmFyIGl0MyA9IHNpemUgLSAxOyAoY2FycnkgIT09IDAgfHwgaSA8IGxlbmd0aCkgJiYgKGl0MyAhPT0gLTEpOyBpdDMtLSwgaSsrKSB7XG4gICAgICAgICAgICAgICAgY2FycnkgKz0gKEJBU0UgKiBiMjU2W2l0M10pID4+PiAwO1xuICAgICAgICAgICAgICAgIGIyNTZbaXQzXSA9IChjYXJyeSAlIDI1NikgPj4+IDA7XG4gICAgICAgICAgICAgICAgY2FycnkgPSAoY2FycnkgLyAyNTYpID4+PiAwO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKGNhcnJ5ICE9PSAwKSB7XG4gICAgICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdOb24temVybyBjYXJyeScpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgbGVuZ3RoID0gaTtcbiAgICAgICAgICAgIHBzeisrO1xuICAgICAgICB9XG4gICAgICAgIC8vIFNraXAgdHJhaWxpbmcgc3BhY2VzLlxuICAgICAgICBpZiAoc291cmNlW3Bzel0gPT09ICcgJykge1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICAgIC8vIFNraXAgbGVhZGluZyB6ZXJvZXMgaW4gYjI1Ni5cbiAgICAgICAgdmFyIGl0NCA9IHNpemUgLSBsZW5ndGg7XG4gICAgICAgIHdoaWxlIChpdDQgIT09IHNpemUgJiYgYjI1NltpdDRdID09PSAwKSB7XG4gICAgICAgICAgICBpdDQrKztcbiAgICAgICAgfVxuICAgICAgICB2YXIgdmNoID0gbmV3IFVpbnQ4QXJyYXkoemVyb2VzICsgKHNpemUgLSBpdDQpKTtcbiAgICAgICAgdmFyIGogPSB6ZXJvZXM7XG4gICAgICAgIHdoaWxlIChpdDQgIT09IHNpemUpIHtcbiAgICAgICAgICAgIHZjaFtqKytdID0gYjI1NltpdDQrK107XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHZjaDtcbiAgICB9XG4gICAgLyoqXG4gICAgICogQHBhcmFtIHtzdHJpbmcgfCBzdHJpbmdbXX0gc3RyaW5nXG4gICAgICovXG4gICAgZnVuY3Rpb24gZGVjb2RlKHN0cmluZykge1xuICAgICAgICB2YXIgYnVmZmVyID0gZGVjb2RlVW5zYWZlKHN0cmluZyk7XG4gICAgICAgIGlmIChidWZmZXIpIHtcbiAgICAgICAgICAgIHJldHVybiBidWZmZXI7XG4gICAgICAgIH1cbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKGBOb24tJHtuYW1lfSBjaGFyYWN0ZXJgKTtcbiAgICB9XG4gICAgcmV0dXJuIHtcbiAgICAgICAgZW5jb2RlOiBlbmNvZGUsXG4gICAgICAgIGRlY29kZVVuc2FmZTogZGVjb2RlVW5zYWZlLFxuICAgICAgICBkZWNvZGU6IGRlY29kZVxuICAgIH07XG59XG52YXIgc3JjID0gYmFzZTtcbnZhciBfYnJycF9fbXVsdGlmb3JtYXRzX3Njb3BlX2Jhc2VYID0gc3JjO1xuZXhwb3J0IGRlZmF1bHQgX2JycnBfX211bHRpZm9ybWF0c19zY29wZV9iYXNlWDtcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPWJhc2UteC5qcy5tYXAiLCJpbXBvcnQgeyBjb2VyY2UgfSBmcm9tICcuLi9ieXRlcy5qcyc7XG5pbXBvcnQgYmFzZXggZnJvbSAnLi4vdmVuZG9yL2Jhc2UteC5qcyc7XG4vKipcbiAqIENsYXNzIHJlcHJlc2VudHMgYm90aCBCYXNlRW5jb2RlciBhbmQgTXVsdGliYXNlRW5jb2RlciBtZWFuaW5nIGl0XG4gKiBjYW4gYmUgdXNlZCB0byBlbmNvZGUgdG8gbXVsdGliYXNlIG9yIGJhc2UgZW5jb2RlIHdpdGhvdXQgbXVsdGliYXNlXG4gKiBwcmVmaXguXG4gKi9cbmNsYXNzIEVuY29kZXIge1xuICAgIG5hbWU7XG4gICAgcHJlZml4O1xuICAgIGJhc2VFbmNvZGU7XG4gICAgY29uc3RydWN0b3IobmFtZSwgcHJlZml4LCBiYXNlRW5jb2RlKSB7XG4gICAgICAgIHRoaXMubmFtZSA9IG5hbWU7XG4gICAgICAgIHRoaXMucHJlZml4ID0gcHJlZml4O1xuICAgICAgICB0aGlzLmJhc2VFbmNvZGUgPSBiYXNlRW5jb2RlO1xuICAgIH1cbiAgICBlbmNvZGUoYnl0ZXMpIHtcbiAgICAgICAgaWYgKGJ5dGVzIGluc3RhbmNlb2YgVWludDhBcnJheSkge1xuICAgICAgICAgICAgcmV0dXJuIGAke3RoaXMucHJlZml4fSR7dGhpcy5iYXNlRW5jb2RlKGJ5dGVzKX1gO1xuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgdGhyb3cgRXJyb3IoJ1Vua25vd24gdHlwZSwgbXVzdCBiZSBiaW5hcnkgdHlwZScpO1xuICAgICAgICB9XG4gICAgfVxufVxuLyoqXG4gKiBDbGFzcyByZXByZXNlbnRzIGJvdGggQmFzZURlY29kZXIgYW5kIE11bHRpYmFzZURlY29kZXIgc28gaXQgY291bGQgYmUgdXNlZFxuICogdG8gZGVjb2RlIG11bHRpYmFzZXMgKHdpdGggbWF0Y2hpbmcgcHJlZml4KSBvciBqdXN0IGJhc2UgZGVjb2RlIHN0cmluZ3NcbiAqIHdpdGggY29ycmVzcG9uZGluZyBiYXNlIGVuY29kaW5nLlxuICovXG5jbGFzcyBEZWNvZGVyIHtcbiAgICBuYW1lO1xuICAgIHByZWZpeDtcbiAgICBiYXNlRGVjb2RlO1xuICAgIHByZWZpeENvZGVQb2ludDtcbiAgICBjb25zdHJ1Y3RvcihuYW1lLCBwcmVmaXgsIGJhc2VEZWNvZGUpIHtcbiAgICAgICAgdGhpcy5uYW1lID0gbmFtZTtcbiAgICAgICAgdGhpcy5wcmVmaXggPSBwcmVmaXg7XG4gICAgICAgIGNvbnN0IHByZWZpeENvZGVQb2ludCA9IHByZWZpeC5jb2RlUG9pbnRBdCgwKTtcbiAgICAgICAgLyogYzggaWdub3JlIG5leHQgMyAqL1xuICAgICAgICBpZiAocHJlZml4Q29kZVBvaW50ID09PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcignSW52YWxpZCBwcmVmaXggY2hhcmFjdGVyJyk7XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5wcmVmaXhDb2RlUG9pbnQgPSBwcmVmaXhDb2RlUG9pbnQ7XG4gICAgICAgIHRoaXMuYmFzZURlY29kZSA9IGJhc2VEZWNvZGU7XG4gICAgfVxuICAgIGRlY29kZSh0ZXh0KSB7XG4gICAgICAgIGlmICh0eXBlb2YgdGV4dCA9PT0gJ3N0cmluZycpIHtcbiAgICAgICAgICAgIGlmICh0ZXh0LmNvZGVQb2ludEF0KDApICE9PSB0aGlzLnByZWZpeENvZGVQb2ludCkge1xuICAgICAgICAgICAgICAgIHRocm93IEVycm9yKGBVbmFibGUgdG8gZGVjb2RlIG11bHRpYmFzZSBzdHJpbmcgJHtKU09OLnN0cmluZ2lmeSh0ZXh0KX0sICR7dGhpcy5uYW1lfSBkZWNvZGVyIG9ubHkgc3VwcG9ydHMgaW5wdXRzIHByZWZpeGVkIHdpdGggJHt0aGlzLnByZWZpeH1gKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHJldHVybiB0aGlzLmJhc2VEZWNvZGUodGV4dC5zbGljZSh0aGlzLnByZWZpeC5sZW5ndGgpKTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIHRocm93IEVycm9yKCdDYW4gb25seSBtdWx0aWJhc2UgZGVjb2RlIHN0cmluZ3MnKTtcbiAgICAgICAgfVxuICAgIH1cbiAgICBvcihkZWNvZGVyKSB7XG4gICAgICAgIHJldHVybiBvcih0aGlzLCBkZWNvZGVyKTtcbiAgICB9XG59XG5jbGFzcyBDb21wb3NlZERlY29kZXIge1xuICAgIGRlY29kZXJzO1xuICAgIGNvbnN0cnVjdG9yKGRlY29kZXJzKSB7XG4gICAgICAgIHRoaXMuZGVjb2RlcnMgPSBkZWNvZGVycztcbiAgICB9XG4gICAgb3IoZGVjb2Rlcikge1xuICAgICAgICByZXR1cm4gb3IodGhpcywgZGVjb2Rlcik7XG4gICAgfVxuICAgIGRlY29kZShpbnB1dCkge1xuICAgICAgICBjb25zdCBwcmVmaXggPSBpbnB1dFswXTtcbiAgICAgICAgY29uc3QgZGVjb2RlciA9IHRoaXMuZGVjb2RlcnNbcHJlZml4XTtcbiAgICAgICAgaWYgKGRlY29kZXIgIT0gbnVsbCkge1xuICAgICAgICAgICAgcmV0dXJuIGRlY29kZXIuZGVjb2RlKGlucHV0KTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIHRocm93IFJhbmdlRXJyb3IoYFVuYWJsZSB0byBkZWNvZGUgbXVsdGliYXNlIHN0cmluZyAke0pTT04uc3RyaW5naWZ5KGlucHV0KX0sIG9ubHkgaW5wdXRzIHByZWZpeGVkIHdpdGggJHtPYmplY3Qua2V5cyh0aGlzLmRlY29kZXJzKX0gYXJlIHN1cHBvcnRlZGApO1xuICAgICAgICB9XG4gICAgfVxufVxuZXhwb3J0IGZ1bmN0aW9uIG9yKGxlZnQsIHJpZ2h0KSB7XG4gICAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIEB0eXBlc2NyaXB0LWVzbGludC9jb25zaXN0ZW50LXR5cGUtYXNzZXJ0aW9uc1xuICAgIHJldHVybiBuZXcgQ29tcG9zZWREZWNvZGVyKHtcbiAgICAgICAgLi4uKGxlZnQuZGVjb2RlcnMgPz8geyBbbGVmdC5wcmVmaXhdOiBsZWZ0IH0pLFxuICAgICAgICAuLi4ocmlnaHQuZGVjb2RlcnMgPz8geyBbcmlnaHQucHJlZml4XTogcmlnaHQgfSlcbiAgICB9KTtcbn1cbmV4cG9ydCBjbGFzcyBDb2RlYyB7XG4gICAgbmFtZTtcbiAgICBwcmVmaXg7XG4gICAgYmFzZUVuY29kZTtcbiAgICBiYXNlRGVjb2RlO1xuICAgIGVuY29kZXI7XG4gICAgZGVjb2RlcjtcbiAgICBjb25zdHJ1Y3RvcihuYW1lLCBwcmVmaXgsIGJhc2VFbmNvZGUsIGJhc2VEZWNvZGUpIHtcbiAgICAgICAgdGhpcy5uYW1lID0gbmFtZTtcbiAgICAgICAgdGhpcy5wcmVmaXggPSBwcmVmaXg7XG4gICAgICAgIHRoaXMuYmFzZUVuY29kZSA9IGJhc2VFbmNvZGU7XG4gICAgICAgIHRoaXMuYmFzZURlY29kZSA9IGJhc2VEZWNvZGU7XG4gICAgICAgIHRoaXMuZW5jb2RlciA9IG5ldyBFbmNvZGVyKG5hbWUsIHByZWZpeCwgYmFzZUVuY29kZSk7XG4gICAgICAgIHRoaXMuZGVjb2RlciA9IG5ldyBEZWNvZGVyKG5hbWUsIHByZWZpeCwgYmFzZURlY29kZSk7XG4gICAgfVxuICAgIGVuY29kZShpbnB1dCkge1xuICAgICAgICByZXR1cm4gdGhpcy5lbmNvZGVyLmVuY29kZShpbnB1dCk7XG4gICAgfVxuICAgIGRlY29kZShpbnB1dCkge1xuICAgICAgICByZXR1cm4gdGhpcy5kZWNvZGVyLmRlY29kZShpbnB1dCk7XG4gICAgfVxufVxuZXhwb3J0IGZ1bmN0aW9uIGZyb20oeyBuYW1lLCBwcmVmaXgsIGVuY29kZSwgZGVjb2RlIH0pIHtcbiAgICByZXR1cm4gbmV3IENvZGVjKG5hbWUsIHByZWZpeCwgZW5jb2RlLCBkZWNvZGUpO1xufVxuZXhwb3J0IGZ1bmN0aW9uIGJhc2VYKHsgbmFtZSwgcHJlZml4LCBhbHBoYWJldCB9KSB7XG4gICAgY29uc3QgeyBlbmNvZGUsIGRlY29kZSB9ID0gYmFzZXgoYWxwaGFiZXQsIG5hbWUpO1xuICAgIHJldHVybiBmcm9tKHtcbiAgICAgICAgcHJlZml4LFxuICAgICAgICBuYW1lLFxuICAgICAgICBlbmNvZGUsXG4gICAgICAgIGRlY29kZTogKHRleHQpID0+IGNvZXJjZShkZWNvZGUodGV4dCkpXG4gICAgfSk7XG59XG5mdW5jdGlvbiBkZWNvZGUoc3RyaW5nLCBhbHBoYWJldCwgYml0c1BlckNoYXIsIG5hbWUpIHtcbiAgICAvLyBCdWlsZCB0aGUgY2hhcmFjdGVyIGxvb2t1cCB0YWJsZTpcbiAgICBjb25zdCBjb2RlcyA9IHt9O1xuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgYWxwaGFiZXQubGVuZ3RoOyArK2kpIHtcbiAgICAgICAgY29kZXNbYWxwaGFiZXRbaV1dID0gaTtcbiAgICB9XG4gICAgLy8gQ291bnQgdGhlIHBhZGRpbmcgYnl0ZXM6XG4gICAgbGV0IGVuZCA9IHN0cmluZy5sZW5ndGg7XG4gICAgd2hpbGUgKHN0cmluZ1tlbmQgLSAxXSA9PT0gJz0nKSB7XG4gICAgICAgIC0tZW5kO1xuICAgIH1cbiAgICAvLyBBbGxvY2F0ZSB0aGUgb3V0cHV0OlxuICAgIGNvbnN0IG91dCA9IG5ldyBVaW50OEFycmF5KChlbmQgKiBiaXRzUGVyQ2hhciAvIDgpIHwgMCk7XG4gICAgLy8gUGFyc2UgdGhlIGRhdGE6XG4gICAgbGV0IGJpdHMgPSAwOyAvLyBOdW1iZXIgb2YgYml0cyBjdXJyZW50bHkgaW4gdGhlIGJ1ZmZlclxuICAgIGxldCBidWZmZXIgPSAwOyAvLyBCaXRzIHdhaXRpbmcgdG8gYmUgd3JpdHRlbiBvdXQsIE1TQiBmaXJzdFxuICAgIGxldCB3cml0dGVuID0gMDsgLy8gTmV4dCBieXRlIHRvIHdyaXRlXG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCBlbmQ7ICsraSkge1xuICAgICAgICAvLyBSZWFkIG9uZSBjaGFyYWN0ZXIgZnJvbSB0aGUgc3RyaW5nOlxuICAgICAgICBjb25zdCB2YWx1ZSA9IGNvZGVzW3N0cmluZ1tpXV07XG4gICAgICAgIGlmICh2YWx1ZSA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICB0aHJvdyBuZXcgU3ludGF4RXJyb3IoYE5vbi0ke25hbWV9IGNoYXJhY3RlcmApO1xuICAgICAgICB9XG4gICAgICAgIC8vIEFwcGVuZCB0aGUgYml0cyB0byB0aGUgYnVmZmVyOlxuICAgICAgICBidWZmZXIgPSAoYnVmZmVyIDw8IGJpdHNQZXJDaGFyKSB8IHZhbHVlO1xuICAgICAgICBiaXRzICs9IGJpdHNQZXJDaGFyO1xuICAgICAgICAvLyBXcml0ZSBvdXQgc29tZSBiaXRzIGlmIHRoZSBidWZmZXIgaGFzIGEgYnl0ZSdzIHdvcnRoOlxuICAgICAgICBpZiAoYml0cyA+PSA4KSB7XG4gICAgICAgICAgICBiaXRzIC09IDg7XG4gICAgICAgICAgICBvdXRbd3JpdHRlbisrXSA9IDB4ZmYgJiAoYnVmZmVyID4+IGJpdHMpO1xuICAgICAgICB9XG4gICAgfVxuICAgIC8vIFZlcmlmeSB0aGF0IHdlIGhhdmUgcmVjZWl2ZWQganVzdCBlbm91Z2ggYml0czpcbiAgICBpZiAoYml0cyA+PSBiaXRzUGVyQ2hhciB8fCAoMHhmZiAmIChidWZmZXIgPDwgKDggLSBiaXRzKSkpICE9PSAwKSB7XG4gICAgICAgIHRocm93IG5ldyBTeW50YXhFcnJvcignVW5leHBlY3RlZCBlbmQgb2YgZGF0YScpO1xuICAgIH1cbiAgICByZXR1cm4gb3V0O1xufVxuZnVuY3Rpb24gZW5jb2RlKGRhdGEsIGFscGhhYmV0LCBiaXRzUGVyQ2hhcikge1xuICAgIGNvbnN0IHBhZCA9IGFscGhhYmV0W2FscGhhYmV0Lmxlbmd0aCAtIDFdID09PSAnPSc7XG4gICAgY29uc3QgbWFzayA9ICgxIDw8IGJpdHNQZXJDaGFyKSAtIDE7XG4gICAgbGV0IG91dCA9ICcnO1xuICAgIGxldCBiaXRzID0gMDsgLy8gTnVtYmVyIG9mIGJpdHMgY3VycmVudGx5IGluIHRoZSBidWZmZXJcbiAgICBsZXQgYnVmZmVyID0gMDsgLy8gQml0cyB3YWl0aW5nIHRvIGJlIHdyaXR0ZW4gb3V0LCBNU0IgZmlyc3RcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IGRhdGEubGVuZ3RoOyArK2kpIHtcbiAgICAgICAgLy8gU2x1cnAgZGF0YSBpbnRvIHRoZSBidWZmZXI6XG4gICAgICAgIGJ1ZmZlciA9IChidWZmZXIgPDwgOCkgfCBkYXRhW2ldO1xuICAgICAgICBiaXRzICs9IDg7XG4gICAgICAgIC8vIFdyaXRlIG91dCBhcyBtdWNoIGFzIHdlIGNhbjpcbiAgICAgICAgd2hpbGUgKGJpdHMgPiBiaXRzUGVyQ2hhcikge1xuICAgICAgICAgICAgYml0cyAtPSBiaXRzUGVyQ2hhcjtcbiAgICAgICAgICAgIG91dCArPSBhbHBoYWJldFttYXNrICYgKGJ1ZmZlciA+PiBiaXRzKV07XG4gICAgICAgIH1cbiAgICB9XG4gICAgLy8gUGFydGlhbCBjaGFyYWN0ZXI6XG4gICAgaWYgKGJpdHMgIT09IDApIHtcbiAgICAgICAgb3V0ICs9IGFscGhhYmV0W21hc2sgJiAoYnVmZmVyIDw8IChiaXRzUGVyQ2hhciAtIGJpdHMpKV07XG4gICAgfVxuICAgIC8vIEFkZCBwYWRkaW5nIGNoYXJhY3RlcnMgdW50aWwgd2UgaGl0IGEgYnl0ZSBib3VuZGFyeTpcbiAgICBpZiAocGFkKSB7XG4gICAgICAgIHdoaWxlICgoKG91dC5sZW5ndGggKiBiaXRzUGVyQ2hhcikgJiA3KSAhPT0gMCkge1xuICAgICAgICAgICAgb3V0ICs9ICc9JztcbiAgICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gb3V0O1xufVxuLyoqXG4gKiBSRkM0NjQ4IEZhY3RvcnlcbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIHJmYzQ2NDgoeyBuYW1lLCBwcmVmaXgsIGJpdHNQZXJDaGFyLCBhbHBoYWJldCB9KSB7XG4gICAgcmV0dXJuIGZyb20oe1xuICAgICAgICBwcmVmaXgsXG4gICAgICAgIG5hbWUsXG4gICAgICAgIGVuY29kZShpbnB1dCkge1xuICAgICAgICAgICAgcmV0dXJuIGVuY29kZShpbnB1dCwgYWxwaGFiZXQsIGJpdHNQZXJDaGFyKTtcbiAgICAgICAgfSxcbiAgICAgICAgZGVjb2RlKGlucHV0KSB7XG4gICAgICAgICAgICByZXR1cm4gZGVjb2RlKGlucHV0LCBhbHBoYWJldCwgYml0c1BlckNoYXIsIG5hbWUpO1xuICAgICAgICB9XG4gICAgfSk7XG59XG4vLyMgc291cmNlTWFwcGluZ1VSTD1iYXNlLmpzLm1hcCIsImltcG9ydCB7IGJhc2VYIH0gZnJvbSAnLi9iYXNlLmpzJztcbmV4cG9ydCBjb25zdCBiYXNlMTAgPSBiYXNlWCh7XG4gICAgcHJlZml4OiAnOScsXG4gICAgbmFtZTogJ2Jhc2UxMCcsXG4gICAgYWxwaGFiZXQ6ICcwMTIzNDU2Nzg5J1xufSk7XG4vLyMgc291cmNlTWFwcGluZ1VSTD1iYXNlMTAuanMubWFwIiwiaW1wb3J0IHsgcmZjNDY0OCB9IGZyb20gJy4vYmFzZS5qcyc7XG5leHBvcnQgY29uc3QgYmFzZTE2ID0gcmZjNDY0OCh7XG4gICAgcHJlZml4OiAnZicsXG4gICAgbmFtZTogJ2Jhc2UxNicsXG4gICAgYWxwaGFiZXQ6ICcwMTIzNDU2Nzg5YWJjZGVmJyxcbiAgICBiaXRzUGVyQ2hhcjogNFxufSk7XG5leHBvcnQgY29uc3QgYmFzZTE2dXBwZXIgPSByZmM0NjQ4KHtcbiAgICBwcmVmaXg6ICdGJyxcbiAgICBuYW1lOiAnYmFzZTE2dXBwZXInLFxuICAgIGFscGhhYmV0OiAnMDEyMzQ1Njc4OUFCQ0RFRicsXG4gICAgYml0c1BlckNoYXI6IDRcbn0pO1xuLy8jIHNvdXJjZU1hcHBpbmdVUkw9YmFzZTE2LmpzLm1hcCIsImltcG9ydCB7IHJmYzQ2NDggfSBmcm9tICcuL2Jhc2UuanMnO1xuZXhwb3J0IGNvbnN0IGJhc2UyID0gcmZjNDY0OCh7XG4gICAgcHJlZml4OiAnMCcsXG4gICAgbmFtZTogJ2Jhc2UyJyxcbiAgICBhbHBoYWJldDogJzAxJyxcbiAgICBiaXRzUGVyQ2hhcjogMVxufSk7XG4vLyMgc291cmNlTWFwcGluZ1VSTD1iYXNlMi5qcy5tYXAiLCJpbXBvcnQgeyBmcm9tIH0gZnJvbSAnLi9iYXNlLmpzJztcbmNvbnN0IGFscGhhYmV0ID0gQXJyYXkuZnJvbSgn8J+agPCfqpDimITwn5uw8J+MjPCfjJHwn4yS8J+Mk/CfjJTwn4yV8J+MlvCfjJfwn4yY8J+MjfCfjI/wn4yO8J+QieKYgPCfkrvwn5al8J+SvvCfkr/wn5iC4p2k8J+YjfCfpKPwn5iK8J+Zj/CfkpXwn5it8J+YmPCfkY3wn5iF8J+Rj/CfmIHwn5Sl8J+lsPCfkpTwn5KW8J+SmfCfmKLwn6SU8J+YhvCfmYTwn5Kq8J+YieKYuvCfkYzwn6SX8J+SnPCfmJTwn5iO8J+Yh/CfjLnwn6Sm8J+OifCfkp7inIzinKjwn6S38J+YsfCfmIzwn4y48J+ZjPCfmIvwn5KX8J+SmvCfmI/wn5Kb8J+ZgvCfkpPwn6Sp8J+YhPCfmIDwn5ak8J+Yg/Cfkq/wn5mI8J+Rh/Cfjrbwn5iS8J+kreKdo/CfmJzwn5KL8J+RgPCfmKrwn5iR8J+SpfCfmYvwn5ie8J+YqfCfmKHwn6Sq8J+RivCfpbPwn5il8J+kpPCfkYnwn5KD8J+Ys+Kci/CfmJrwn5id8J+YtPCfjJ/wn5is8J+Zg/CfjYDwn4y38J+Yu/CfmJPirZDinIXwn6W68J+MiPCfmIjwn6SY8J+SpuKclPCfmKPwn4+D8J+SkOKYufCfjorwn5KY8J+YoOKYnfCfmJXwn4y68J+OgvCfjLvwn5iQ8J+WlfCfkp3wn5mK8J+YufCfl6Pwn5Kr8J+SgPCfkZHwn4618J+knvCfmJvwn5S08J+YpPCfjLzwn5ir4pq98J+kmeKYlfCfj4bwn6Sr8J+RiPCfmK7wn5mG8J+Nu/CfjYPwn5C28J+SgfCfmLLwn4y/8J+nofCfjoHimqHwn4ye8J+OiOKdjOKcivCfkYvwn5iw8J+kqPCfmLbwn6Sd8J+atvCfkrDwn42T8J+SovCfpJ/wn5mB8J+aqPCfkqjwn6Ss4pyI8J+OgPCfjbrwn6ST8J+YmfCfkp/wn4yx8J+YlvCfkbbwn6W04pa24p6h4p2T8J+SjvCfkrjirIfwn5io8J+MmvCfpovwn5i38J+VuuKaoPCfmYXwn5if8J+YtfCfkY7wn6Sy8J+koPCfpKfwn5OM8J+UtfCfkoXwn6eQ8J+QvvCfjZLwn5iX8J+kkfCfjIrwn6Sv8J+Qt+KYjvCfkqfwn5iv8J+ShvCfkYbwn46k8J+Zh/CfjZHinYTwn4y08J+So/CfkLjwn5KM8J+TjfCfpYDwn6Si8J+RhfCfkqHwn5Kp8J+RkPCfk7jwn5G78J+kkPCfpK7wn4688J+ltfCfmqnwn42O8J+NivCfkbzwn5KN8J+To/CfpYInKTtcbmNvbnN0IGFscGhhYmV0Qnl0ZXNUb0NoYXJzID0gKGFscGhhYmV0LnJlZHVjZSgocCwgYywgaSkgPT4geyBwW2ldID0gYzsgcmV0dXJuIHA7IH0sIChbXSkpKTtcbmNvbnN0IGFscGhhYmV0Q2hhcnNUb0J5dGVzID0gKGFscGhhYmV0LnJlZHVjZSgocCwgYywgaSkgPT4ge1xuICAgIGNvbnN0IGNvZGVQb2ludCA9IGMuY29kZVBvaW50QXQoMCk7XG4gICAgaWYgKGNvZGVQb2ludCA9PSBudWxsKSB7XG4gICAgICAgIHRocm93IG5ldyBFcnJvcihgSW52YWxpZCBjaGFyYWN0ZXI6ICR7Y31gKTtcbiAgICB9XG4gICAgcFtjb2RlUG9pbnRdID0gaTtcbiAgICByZXR1cm4gcDtcbn0sIChbXSkpKTtcbmZ1bmN0aW9uIGVuY29kZShkYXRhKSB7XG4gICAgcmV0dXJuIGRhdGEucmVkdWNlKChwLCBjKSA9PiB7XG4gICAgICAgIHAgKz0gYWxwaGFiZXRCeXRlc1RvQ2hhcnNbY107XG4gICAgICAgIHJldHVybiBwO1xuICAgIH0sICcnKTtcbn1cbmZ1bmN0aW9uIGRlY29kZShzdHIpIHtcbiAgICBjb25zdCBieXRzID0gW107XG4gICAgZm9yIChjb25zdCBjaGFyIG9mIHN0cikge1xuICAgICAgICBjb25zdCBjb2RlUG9pbnQgPSBjaGFyLmNvZGVQb2ludEF0KDApO1xuICAgICAgICBpZiAoY29kZVBvaW50ID09IG51bGwpIHtcbiAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcihgSW52YWxpZCBjaGFyYWN0ZXI6ICR7Y2hhcn1gKTtcbiAgICAgICAgfVxuICAgICAgICBjb25zdCBieXQgPSBhbHBoYWJldENoYXJzVG9CeXRlc1tjb2RlUG9pbnRdO1xuICAgICAgICBpZiAoYnl0ID09IG51bGwpIHtcbiAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcihgTm9uLWJhc2UyNTZlbW9qaSBjaGFyYWN0ZXI6ICR7Y2hhcn1gKTtcbiAgICAgICAgfVxuICAgICAgICBieXRzLnB1c2goYnl0KTtcbiAgICB9XG4gICAgcmV0dXJuIG5ldyBVaW50OEFycmF5KGJ5dHMpO1xufVxuZXhwb3J0IGNvbnN0IGJhc2UyNTZlbW9qaSA9IGZyb20oe1xuICAgIHByZWZpeDogJ/CfmoAnLFxuICAgIG5hbWU6ICdiYXNlMjU2ZW1vamknLFxuICAgIGVuY29kZSxcbiAgICBkZWNvZGVcbn0pO1xuLy8jIHNvdXJjZU1hcHBpbmdVUkw9YmFzZTI1NmVtb2ppLmpzLm1hcCIsImltcG9ydCB7IHJmYzQ2NDggfSBmcm9tICcuL2Jhc2UuanMnO1xuZXhwb3J0IGNvbnN0IGJhc2UzMiA9IHJmYzQ2NDgoe1xuICAgIHByZWZpeDogJ2InLFxuICAgIG5hbWU6ICdiYXNlMzInLFxuICAgIGFscGhhYmV0OiAnYWJjZGVmZ2hpamtsbW5vcHFyc3R1dnd4eXoyMzQ1NjcnLFxuICAgIGJpdHNQZXJDaGFyOiA1XG59KTtcbmV4cG9ydCBjb25zdCBiYXNlMzJ1cHBlciA9IHJmYzQ2NDgoe1xuICAgIHByZWZpeDogJ0InLFxuICAgIG5hbWU6ICdiYXNlMzJ1cHBlcicsXG4gICAgYWxwaGFiZXQ6ICdBQkNERUZHSElKS0xNTk9QUVJTVFVWV1hZWjIzNDU2NycsXG4gICAgYml0c1BlckNoYXI6IDVcbn0pO1xuZXhwb3J0IGNvbnN0IGJhc2UzMnBhZCA9IHJmYzQ2NDgoe1xuICAgIHByZWZpeDogJ2MnLFxuICAgIG5hbWU6ICdiYXNlMzJwYWQnLFxuICAgIGFscGhhYmV0OiAnYWJjZGVmZ2hpamtsbW5vcHFyc3R1dnd4eXoyMzQ1Njc9JyxcbiAgICBiaXRzUGVyQ2hhcjogNVxufSk7XG5leHBvcnQgY29uc3QgYmFzZTMycGFkdXBwZXIgPSByZmM0NjQ4KHtcbiAgICBwcmVmaXg6ICdDJyxcbiAgICBuYW1lOiAnYmFzZTMycGFkdXBwZXInLFxuICAgIGFscGhhYmV0OiAnQUJDREVGR0hJSktMTU5PUFFSU1RVVldYWVoyMzQ1Njc9JyxcbiAgICBiaXRzUGVyQ2hhcjogNVxufSk7XG5leHBvcnQgY29uc3QgYmFzZTMyaGV4ID0gcmZjNDY0OCh7XG4gICAgcHJlZml4OiAndicsXG4gICAgbmFtZTogJ2Jhc2UzMmhleCcsXG4gICAgYWxwaGFiZXQ6ICcwMTIzNDU2Nzg5YWJjZGVmZ2hpamtsbW5vcHFyc3R1dicsXG4gICAgYml0c1BlckNoYXI6IDVcbn0pO1xuZXhwb3J0IGNvbnN0IGJhc2UzMmhleHVwcGVyID0gcmZjNDY0OCh7XG4gICAgcHJlZml4OiAnVicsXG4gICAgbmFtZTogJ2Jhc2UzMmhleHVwcGVyJyxcbiAgICBhbHBoYWJldDogJzAxMjM0NTY3ODlBQkNERUZHSElKS0xNTk9QUVJTVFVWJyxcbiAgICBiaXRzUGVyQ2hhcjogNVxufSk7XG5leHBvcnQgY29uc3QgYmFzZTMyaGV4cGFkID0gcmZjNDY0OCh7XG4gICAgcHJlZml4OiAndCcsXG4gICAgbmFtZTogJ2Jhc2UzMmhleHBhZCcsXG4gICAgYWxwaGFiZXQ6ICcwMTIzNDU2Nzg5YWJjZGVmZ2hpamtsbW5vcHFyc3R1dj0nLFxuICAgIGJpdHNQZXJDaGFyOiA1XG59KTtcbmV4cG9ydCBjb25zdCBiYXNlMzJoZXhwYWR1cHBlciA9IHJmYzQ2NDgoe1xuICAgIHByZWZpeDogJ1QnLFxuICAgIG5hbWU6ICdiYXNlMzJoZXhwYWR1cHBlcicsXG4gICAgYWxwaGFiZXQ6ICcwMTIzNDU2Nzg5QUJDREVGR0hJSktMTU5PUFFSU1RVVj0nLFxuICAgIGJpdHNQZXJDaGFyOiA1XG59KTtcbmV4cG9ydCBjb25zdCBiYXNlMzJ6ID0gcmZjNDY0OCh7XG4gICAgcHJlZml4OiAnaCcsXG4gICAgbmFtZTogJ2Jhc2UzMnonLFxuICAgIGFscGhhYmV0OiAneWJuZHJmZzhlamttY3BxeG90MXV3aXN6YTM0NWg3NjknLFxuICAgIGJpdHNQZXJDaGFyOiA1XG59KTtcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPWJhc2UzMi5qcy5tYXAiLCJpbXBvcnQgeyBiYXNlWCB9IGZyb20gJy4vYmFzZS5qcyc7XG5leHBvcnQgY29uc3QgYmFzZTM2ID0gYmFzZVgoe1xuICAgIHByZWZpeDogJ2snLFxuICAgIG5hbWU6ICdiYXNlMzYnLFxuICAgIGFscGhhYmV0OiAnMDEyMzQ1Njc4OWFiY2RlZmdoaWprbG1ub3BxcnN0dXZ3eHl6J1xufSk7XG5leHBvcnQgY29uc3QgYmFzZTM2dXBwZXIgPSBiYXNlWCh7XG4gICAgcHJlZml4OiAnSycsXG4gICAgbmFtZTogJ2Jhc2UzNnVwcGVyJyxcbiAgICBhbHBoYWJldDogJzAxMjM0NTY3ODlBQkNERUZHSElKS0xNTk9QUVJTVFVWV1hZWidcbn0pO1xuLy8jIHNvdXJjZU1hcHBpbmdVUkw9YmFzZTM2LmpzLm1hcCIsImltcG9ydCB7IGJhc2VYIH0gZnJvbSAnLi9iYXNlLmpzJztcbmV4cG9ydCBjb25zdCBiYXNlNThidGMgPSBiYXNlWCh7XG4gICAgbmFtZTogJ2Jhc2U1OGJ0YycsXG4gICAgcHJlZml4OiAneicsXG4gICAgYWxwaGFiZXQ6ICcxMjM0NTY3ODlBQkNERUZHSEpLTE1OUFFSU1RVVldYWVphYmNkZWZnaGlqa21ub3BxcnN0dXZ3eHl6J1xufSk7XG5leHBvcnQgY29uc3QgYmFzZTU4ZmxpY2tyID0gYmFzZVgoe1xuICAgIG5hbWU6ICdiYXNlNThmbGlja3InLFxuICAgIHByZWZpeDogJ1onLFxuICAgIGFscGhhYmV0OiAnMTIzNDU2Nzg5YWJjZGVmZ2hpamttbm9wcXJzdHV2d3h5ekFCQ0RFRkdISktMTU5QUVJTVFVWV1hZWidcbn0pO1xuLy8jIHNvdXJjZU1hcHBpbmdVUkw9YmFzZTU4LmpzLm1hcCIsImltcG9ydCB7IHJmYzQ2NDggfSBmcm9tICcuL2Jhc2UuanMnO1xuZXhwb3J0IGNvbnN0IGJhc2U2NCA9IHJmYzQ2NDgoe1xuICAgIHByZWZpeDogJ20nLFxuICAgIG5hbWU6ICdiYXNlNjQnLFxuICAgIGFscGhhYmV0OiAnQUJDREVGR0hJSktMTU5PUFFSU1RVVldYWVphYmNkZWZnaGlqa2xtbm9wcXJzdHV2d3h5ejAxMjM0NTY3ODkrLycsXG4gICAgYml0c1BlckNoYXI6IDZcbn0pO1xuZXhwb3J0IGNvbnN0IGJhc2U2NHBhZCA9IHJmYzQ2NDgoe1xuICAgIHByZWZpeDogJ00nLFxuICAgIG5hbWU6ICdiYXNlNjRwYWQnLFxuICAgIGFscGhhYmV0OiAnQUJDREVGR0hJSktMTU5PUFFSU1RVVldYWVphYmNkZWZnaGlqa2xtbm9wcXJzdHV2d3h5ejAxMjM0NTY3ODkrLz0nLFxuICAgIGJpdHNQZXJDaGFyOiA2XG59KTtcbmV4cG9ydCBjb25zdCBiYXNlNjR1cmwgPSByZmM0NjQ4KHtcbiAgICBwcmVmaXg6ICd1JyxcbiAgICBuYW1lOiAnYmFzZTY0dXJsJyxcbiAgICBhbHBoYWJldDogJ0FCQ0RFRkdISUpLTE1OT1BRUlNUVVZXWFlaYWJjZGVmZ2hpamtsbW5vcHFyc3R1dnd4eXowMTIzNDU2Nzg5LV8nLFxuICAgIGJpdHNQZXJDaGFyOiA2XG59KTtcbmV4cG9ydCBjb25zdCBiYXNlNjR1cmxwYWQgPSByZmM0NjQ4KHtcbiAgICBwcmVmaXg6ICdVJyxcbiAgICBuYW1lOiAnYmFzZTY0dXJscGFkJyxcbiAgICBhbHBoYWJldDogJ0FCQ0RFRkdISUpLTE1OT1BRUlNUVVZXWFlaYWJjZGVmZ2hpamtsbW5vcHFyc3R1dnd4eXowMTIzNDU2Nzg5LV89JyxcbiAgICBiaXRzUGVyQ2hhcjogNlxufSk7XG4vLyMgc291cmNlTWFwcGluZ1VSTD1iYXNlNjQuanMubWFwIiwiaW1wb3J0IHsgcmZjNDY0OCB9IGZyb20gJy4vYmFzZS5qcyc7XG5leHBvcnQgY29uc3QgYmFzZTggPSByZmM0NjQ4KHtcbiAgICBwcmVmaXg6ICc3JyxcbiAgICBuYW1lOiAnYmFzZTgnLFxuICAgIGFscGhhYmV0OiAnMDEyMzQ1NjcnLFxuICAgIGJpdHNQZXJDaGFyOiAzXG59KTtcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPWJhc2U4LmpzLm1hcCIsImltcG9ydCB7IGZyb21TdHJpbmcsIHRvU3RyaW5nIH0gZnJvbSAnLi4vYnl0ZXMuanMnO1xuaW1wb3J0IHsgZnJvbSB9IGZyb20gJy4vYmFzZS5qcyc7XG5leHBvcnQgY29uc3QgaWRlbnRpdHkgPSBmcm9tKHtcbiAgICBwcmVmaXg6ICdcXHgwMCcsXG4gICAgbmFtZTogJ2lkZW50aXR5JyxcbiAgICBlbmNvZGU6IChidWYpID0+IHRvU3RyaW5nKGJ1ZiksXG4gICAgZGVjb2RlOiAoc3RyKSA9PiBmcm9tU3RyaW5nKHN0cilcbn0pO1xuLy8jIHNvdXJjZU1hcHBpbmdVUkw9aWRlbnRpdHkuanMubWFwIiwiY29uc3QgdGV4dEVuY29kZXIgPSBuZXcgVGV4dEVuY29kZXIoKTtcbmNvbnN0IHRleHREZWNvZGVyID0gbmV3IFRleHREZWNvZGVyKCk7XG5leHBvcnQgY29uc3QgbmFtZSA9ICdqc29uJztcbmV4cG9ydCBjb25zdCBjb2RlID0gMHgwMjAwO1xuZXhwb3J0IGZ1bmN0aW9uIGVuY29kZShub2RlKSB7XG4gICAgcmV0dXJuIHRleHRFbmNvZGVyLmVuY29kZShKU09OLnN0cmluZ2lmeShub2RlKSk7XG59XG5leHBvcnQgZnVuY3Rpb24gZGVjb2RlKGRhdGEpIHtcbiAgICByZXR1cm4gSlNPTi5wYXJzZSh0ZXh0RGVjb2Rlci5kZWNvZGUoZGF0YSkpO1xufVxuLy8jIHNvdXJjZU1hcHBpbmdVUkw9anNvbi5qcy5tYXAiLCJpbXBvcnQgeyBjb2VyY2UgfSBmcm9tICcuLi9ieXRlcy5qcyc7XG5leHBvcnQgY29uc3QgbmFtZSA9ICdyYXcnO1xuZXhwb3J0IGNvbnN0IGNvZGUgPSAweDU1O1xuZXhwb3J0IGZ1bmN0aW9uIGVuY29kZShub2RlKSB7XG4gICAgcmV0dXJuIGNvZXJjZShub2RlKTtcbn1cbmV4cG9ydCBmdW5jdGlvbiBkZWNvZGUoZGF0YSkge1xuICAgIHJldHVybiBjb2VyY2UoZGF0YSk7XG59XG4vLyMgc291cmNlTWFwcGluZ1VSTD1yYXcuanMubWFwIiwiLyogZXNsaW50LWRpc2FibGUgKi9cbnZhciBlbmNvZGVfMSA9IGVuY29kZTtcbnZhciBNU0IgPSAweDgwLCBSRVNUID0gMHg3RiwgTVNCQUxMID0gflJFU1QsIElOVCA9IE1hdGgucG93KDIsIDMxKTtcbi8qKlxuICogQHBhcmFtIHtudW1iZXJ9IG51bVxuICogQHBhcmFtIHtudW1iZXJbXX0gb3V0XG4gKiBAcGFyYW0ge251bWJlcn0gb2Zmc2V0XG4gKi9cbmZ1bmN0aW9uIGVuY29kZShudW0sIG91dCwgb2Zmc2V0KSB7XG4gICAgb3V0ID0gb3V0IHx8IFtdO1xuICAgIG9mZnNldCA9IG9mZnNldCB8fCAwO1xuICAgIHZhciBvbGRPZmZzZXQgPSBvZmZzZXQ7XG4gICAgd2hpbGUgKG51bSA+PSBJTlQpIHtcbiAgICAgICAgb3V0W29mZnNldCsrXSA9IChudW0gJiAweEZGKSB8IE1TQjtcbiAgICAgICAgbnVtIC89IDEyODtcbiAgICB9XG4gICAgd2hpbGUgKG51bSAmIE1TQkFMTCkge1xuICAgICAgICBvdXRbb2Zmc2V0KytdID0gKG51bSAmIDB4RkYpIHwgTVNCO1xuICAgICAgICBudW0gPj4+PSA3O1xuICAgIH1cbiAgICBvdXRbb2Zmc2V0XSA9IG51bSB8IDA7XG4gICAgLy8gQHRzLWlnbm9yZVxuICAgIGVuY29kZS5ieXRlcyA9IG9mZnNldCAtIG9sZE9mZnNldCArIDE7XG4gICAgcmV0dXJuIG91dDtcbn1cbnZhciBkZWNvZGUgPSByZWFkO1xudmFyIE1TQiQxID0gMHg4MCwgUkVTVCQxID0gMHg3Rjtcbi8qKlxuICogQHBhcmFtIHtzdHJpbmcgfCBhbnlbXX0gYnVmXG4gKiBAcGFyYW0ge251bWJlcn0gb2Zmc2V0XG4gKi9cbmZ1bmN0aW9uIHJlYWQoYnVmLCBvZmZzZXQpIHtcbiAgICB2YXIgcmVzID0gMCwgb2Zmc2V0ID0gb2Zmc2V0IHx8IDAsIHNoaWZ0ID0gMCwgY291bnRlciA9IG9mZnNldCwgYiwgbCA9IGJ1Zi5sZW5ndGg7XG4gICAgZG8ge1xuICAgICAgICBpZiAoY291bnRlciA+PSBsKSB7XG4gICAgICAgICAgICAvLyBAdHMtaWdub3JlXG4gICAgICAgICAgICByZWFkLmJ5dGVzID0gMDtcbiAgICAgICAgICAgIHRocm93IG5ldyBSYW5nZUVycm9yKCdDb3VsZCBub3QgZGVjb2RlIHZhcmludCcpO1xuICAgICAgICB9XG4gICAgICAgIGIgPSBidWZbY291bnRlcisrXTtcbiAgICAgICAgcmVzICs9IHNoaWZ0IDwgMjhcbiAgICAgICAgICAgID8gKGIgJiBSRVNUJDEpIDw8IHNoaWZ0XG4gICAgICAgICAgICA6IChiICYgUkVTVCQxKSAqIE1hdGgucG93KDIsIHNoaWZ0KTtcbiAgICAgICAgc2hpZnQgKz0gNztcbiAgICB9IHdoaWxlIChiID49IE1TQiQxKTtcbiAgICAvLyBAdHMtaWdub3JlXG4gICAgcmVhZC5ieXRlcyA9IGNvdW50ZXIgLSBvZmZzZXQ7XG4gICAgcmV0dXJuIHJlcztcbn1cbnZhciBOMSA9IE1hdGgucG93KDIsIDcpO1xudmFyIE4yID0gTWF0aC5wb3coMiwgMTQpO1xudmFyIE4zID0gTWF0aC5wb3coMiwgMjEpO1xudmFyIE40ID0gTWF0aC5wb3coMiwgMjgpO1xudmFyIE41ID0gTWF0aC5wb3coMiwgMzUpO1xudmFyIE42ID0gTWF0aC5wb3coMiwgNDIpO1xudmFyIE43ID0gTWF0aC5wb3coMiwgNDkpO1xudmFyIE44ID0gTWF0aC5wb3coMiwgNTYpO1xudmFyIE45ID0gTWF0aC5wb3coMiwgNjMpO1xudmFyIGxlbmd0aCA9IGZ1bmN0aW9uICgvKiogQHR5cGUge251bWJlcn0gKi8gdmFsdWUpIHtcbiAgICByZXR1cm4gKHZhbHVlIDwgTjEgPyAxXG4gICAgICAgIDogdmFsdWUgPCBOMiA/IDJcbiAgICAgICAgICAgIDogdmFsdWUgPCBOMyA/IDNcbiAgICAgICAgICAgICAgICA6IHZhbHVlIDwgTjQgPyA0XG4gICAgICAgICAgICAgICAgICAgIDogdmFsdWUgPCBONSA/IDVcbiAgICAgICAgICAgICAgICAgICAgICAgIDogdmFsdWUgPCBONiA/IDZcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA6IHZhbHVlIDwgTjcgPyA3XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDogdmFsdWUgPCBOOCA/IDhcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDogdmFsdWUgPCBOOSA/IDlcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA6IDEwKTtcbn07XG52YXIgdmFyaW50ID0ge1xuICAgIGVuY29kZTogZW5jb2RlXzEsXG4gICAgZGVjb2RlOiBkZWNvZGUsXG4gICAgZW5jb2RpbmdMZW5ndGg6IGxlbmd0aFxufTtcbnZhciBfYnJycF92YXJpbnQgPSB2YXJpbnQ7XG5leHBvcnQgZGVmYXVsdCBfYnJycF92YXJpbnQ7XG4vLyMgc291cmNlTWFwcGluZ1VSTD12YXJpbnQuanMubWFwIiwiaW1wb3J0IHZhcmludCBmcm9tICcuL3ZlbmRvci92YXJpbnQuanMnO1xuZXhwb3J0IGZ1bmN0aW9uIGRlY29kZShkYXRhLCBvZmZzZXQgPSAwKSB7XG4gICAgY29uc3QgY29kZSA9IHZhcmludC5kZWNvZGUoZGF0YSwgb2Zmc2V0KTtcbiAgICByZXR1cm4gW2NvZGUsIHZhcmludC5kZWNvZGUuYnl0ZXNdO1xufVxuZXhwb3J0IGZ1bmN0aW9uIGVuY29kZVRvKGludCwgdGFyZ2V0LCBvZmZzZXQgPSAwKSB7XG4gICAgdmFyaW50LmVuY29kZShpbnQsIHRhcmdldCwgb2Zmc2V0KTtcbiAgICByZXR1cm4gdGFyZ2V0O1xufVxuZXhwb3J0IGZ1bmN0aW9uIGVuY29kaW5nTGVuZ3RoKGludCkge1xuICAgIHJldHVybiB2YXJpbnQuZW5jb2RpbmdMZW5ndGgoaW50KTtcbn1cbi8vIyBzb3VyY2VNYXBwaW5nVVJMPXZhcmludC5qcy5tYXAiLCJpbXBvcnQgeyBjb2VyY2UsIGVxdWFscyBhcyBlcXVhbEJ5dGVzIH0gZnJvbSAnLi4vYnl0ZXMuanMnO1xuaW1wb3J0ICogYXMgdmFyaW50IGZyb20gJy4uL3ZhcmludC5qcyc7XG4vKipcbiAqIENyZWF0ZXMgYSBtdWx0aWhhc2ggZGlnZXN0LlxuICovXG5leHBvcnQgZnVuY3Rpb24gY3JlYXRlKGNvZGUsIGRpZ2VzdCkge1xuICAgIGNvbnN0IHNpemUgPSBkaWdlc3QuYnl0ZUxlbmd0aDtcbiAgICBjb25zdCBzaXplT2Zmc2V0ID0gdmFyaW50LmVuY29kaW5nTGVuZ3RoKGNvZGUpO1xuICAgIGNvbnN0IGRpZ2VzdE9mZnNldCA9IHNpemVPZmZzZXQgKyB2YXJpbnQuZW5jb2RpbmdMZW5ndGgoc2l6ZSk7XG4gICAgY29uc3QgYnl0ZXMgPSBuZXcgVWludDhBcnJheShkaWdlc3RPZmZzZXQgKyBzaXplKTtcbiAgICB2YXJpbnQuZW5jb2RlVG8oY29kZSwgYnl0ZXMsIDApO1xuICAgIHZhcmludC5lbmNvZGVUbyhzaXplLCBieXRlcywgc2l6ZU9mZnNldCk7XG4gICAgYnl0ZXMuc2V0KGRpZ2VzdCwgZGlnZXN0T2Zmc2V0KTtcbiAgICByZXR1cm4gbmV3IERpZ2VzdChjb2RlLCBzaXplLCBkaWdlc3QsIGJ5dGVzKTtcbn1cbi8qKlxuICogVHVybnMgYnl0ZXMgcmVwcmVzZW50YXRpb24gb2YgbXVsdGloYXNoIGRpZ2VzdCBpbnRvIGFuIGluc3RhbmNlLlxuICovXG5leHBvcnQgZnVuY3Rpb24gZGVjb2RlKG11bHRpaGFzaCkge1xuICAgIGNvbnN0IGJ5dGVzID0gY29lcmNlKG11bHRpaGFzaCk7XG4gICAgY29uc3QgW2NvZGUsIHNpemVPZmZzZXRdID0gdmFyaW50LmRlY29kZShieXRlcyk7XG4gICAgY29uc3QgW3NpemUsIGRpZ2VzdE9mZnNldF0gPSB2YXJpbnQuZGVjb2RlKGJ5dGVzLnN1YmFycmF5KHNpemVPZmZzZXQpKTtcbiAgICBjb25zdCBkaWdlc3QgPSBieXRlcy5zdWJhcnJheShzaXplT2Zmc2V0ICsgZGlnZXN0T2Zmc2V0KTtcbiAgICBpZiAoZGlnZXN0LmJ5dGVMZW5ndGggIT09IHNpemUpIHtcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdJbmNvcnJlY3QgbGVuZ3RoJyk7XG4gICAgfVxuICAgIHJldHVybiBuZXcgRGlnZXN0KGNvZGUsIHNpemUsIGRpZ2VzdCwgYnl0ZXMpO1xufVxuZXhwb3J0IGZ1bmN0aW9uIGVxdWFscyhhLCBiKSB7XG4gICAgaWYgKGEgPT09IGIpIHtcbiAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgfVxuICAgIGVsc2Uge1xuICAgICAgICBjb25zdCBkYXRhID0gYjtcbiAgICAgICAgcmV0dXJuIChhLmNvZGUgPT09IGRhdGEuY29kZSAmJlxuICAgICAgICAgICAgYS5zaXplID09PSBkYXRhLnNpemUgJiZcbiAgICAgICAgICAgIGRhdGEuYnl0ZXMgaW5zdGFuY2VvZiBVaW50OEFycmF5ICYmXG4gICAgICAgICAgICBlcXVhbEJ5dGVzKGEuYnl0ZXMsIGRhdGEuYnl0ZXMpKTtcbiAgICB9XG59XG4vKipcbiAqIFJlcHJlc2VudHMgYSBtdWx0aWhhc2ggZGlnZXN0IHdoaWNoIGNhcnJpZXMgaW5mb3JtYXRpb24gYWJvdXQgdGhlXG4gKiBoYXNoaW5nIGFsZ29yaXRobSBhbmQgYW4gYWN0dWFsIGhhc2ggZGlnZXN0LlxuICovXG5leHBvcnQgY2xhc3MgRGlnZXN0IHtcbiAgICBjb2RlO1xuICAgIHNpemU7XG4gICAgZGlnZXN0O1xuICAgIGJ5dGVzO1xuICAgIC8qKlxuICAgICAqIENyZWF0ZXMgYSBtdWx0aWhhc2ggZGlnZXN0LlxuICAgICAqL1xuICAgIGNvbnN0cnVjdG9yKGNvZGUsIHNpemUsIGRpZ2VzdCwgYnl0ZXMpIHtcbiAgICAgICAgdGhpcy5jb2RlID0gY29kZTtcbiAgICAgICAgdGhpcy5zaXplID0gc2l6ZTtcbiAgICAgICAgdGhpcy5kaWdlc3QgPSBkaWdlc3Q7XG4gICAgICAgIHRoaXMuYnl0ZXMgPSBieXRlcztcbiAgICB9XG59XG4vKipcbiAqIFVzZWQgdG8gY2hlY2sgdGhhdCB0aGUgcGFzc2VkIG11bHRpaGFzaCBoYXMgdGhlIHBhc3NlZCBjb2RlXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBoYXNDb2RlKGRpZ2VzdCwgY29kZSkge1xuICAgIHJldHVybiBkaWdlc3QuY29kZSA9PT0gY29kZTtcbn1cbi8vIyBzb3VyY2VNYXBwaW5nVVJMPWRpZ2VzdC5qcy5tYXAiLCJpbXBvcnQgeyBjb2VyY2UgfSBmcm9tICcuLi9ieXRlcy5qcyc7XG5pbXBvcnQgKiBhcyBEaWdlc3QgZnJvbSAnLi9kaWdlc3QuanMnO1xuY29uc3QgY29kZSA9IDB4MDtcbmNvbnN0IG5hbWUgPSAnaWRlbnRpdHknO1xuY29uc3QgZW5jb2RlID0gY29lcmNlO1xuZnVuY3Rpb24gZGlnZXN0KGlucHV0KSB7XG4gICAgcmV0dXJuIERpZ2VzdC5jcmVhdGUoY29kZSwgZW5jb2RlKGlucHV0KSk7XG59XG5leHBvcnQgY29uc3QgaWRlbnRpdHkgPSB7IGNvZGUsIG5hbWUsIGVuY29kZSwgZGlnZXN0IH07XG4vLyMgc291cmNlTWFwcGluZ1VSTD1pZGVudGl0eS5qcy5tYXAiLCJpbXBvcnQgKiBhcyBEaWdlc3QgZnJvbSAnLi9kaWdlc3QuanMnO1xuZXhwb3J0IGZ1bmN0aW9uIGZyb20oeyBuYW1lLCBjb2RlLCBlbmNvZGUgfSkge1xuICAgIHJldHVybiBuZXcgSGFzaGVyKG5hbWUsIGNvZGUsIGVuY29kZSk7XG59XG4vKipcbiAqIEhhc2hlciByZXByZXNlbnRzIGEgaGFzaGluZyBhbGdvcml0aG0gaW1wbGVtZW50YXRpb24gdGhhdCBwcm9kdWNlcyBhc1xuICogYE11bHRpaGFzaERpZ2VzdGAuXG4gKi9cbmV4cG9ydCBjbGFzcyBIYXNoZXIge1xuICAgIG5hbWU7XG4gICAgY29kZTtcbiAgICBlbmNvZGU7XG4gICAgY29uc3RydWN0b3IobmFtZSwgY29kZSwgZW5jb2RlKSB7XG4gICAgICAgIHRoaXMubmFtZSA9IG5hbWU7XG4gICAgICAgIHRoaXMuY29kZSA9IGNvZGU7XG4gICAgICAgIHRoaXMuZW5jb2RlID0gZW5jb2RlO1xuICAgIH1cbiAgICBkaWdlc3QoaW5wdXQpIHtcbiAgICAgICAgaWYgKGlucHV0IGluc3RhbmNlb2YgVWludDhBcnJheSkge1xuICAgICAgICAgICAgY29uc3QgcmVzdWx0ID0gdGhpcy5lbmNvZGUoaW5wdXQpO1xuICAgICAgICAgICAgcmV0dXJuIHJlc3VsdCBpbnN0YW5jZW9mIFVpbnQ4QXJyYXlcbiAgICAgICAgICAgICAgICA/IERpZ2VzdC5jcmVhdGUodGhpcy5jb2RlLCByZXN1bHQpXG4gICAgICAgICAgICAgICAgLyogYzggaWdub3JlIG5leHQgMSAqL1xuICAgICAgICAgICAgICAgIDogcmVzdWx0LnRoZW4oZGlnZXN0ID0+IERpZ2VzdC5jcmVhdGUodGhpcy5jb2RlLCBkaWdlc3QpKTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIHRocm93IEVycm9yKCdVbmtub3duIHR5cGUsIG11c3QgYmUgYmluYXJ5IHR5cGUnKTtcbiAgICAgICAgICAgIC8qIGM4IGlnbm9yZSBuZXh0IDEgKi9cbiAgICAgICAgfVxuICAgIH1cbn1cbi8vIyBzb3VyY2VNYXBwaW5nVVJMPWhhc2hlci5qcy5tYXAiLCIvKiBnbG9iYWwgY3J5cHRvICovXG5pbXBvcnQgeyBmcm9tIH0gZnJvbSAnLi9oYXNoZXIuanMnO1xuZnVuY3Rpb24gc2hhKG5hbWUpIHtcbiAgICByZXR1cm4gYXN5bmMgKGRhdGEpID0+IG5ldyBVaW50OEFycmF5KGF3YWl0IGNyeXB0by5zdWJ0bGUuZGlnZXN0KG5hbWUsIGRhdGEpKTtcbn1cbmV4cG9ydCBjb25zdCBzaGEyNTYgPSBmcm9tKHtcbiAgICBuYW1lOiAnc2hhMi0yNTYnLFxuICAgIGNvZGU6IDB4MTIsXG4gICAgZW5jb2RlOiBzaGEoJ1NIQS0yNTYnKVxufSk7XG5leHBvcnQgY29uc3Qgc2hhNTEyID0gZnJvbSh7XG4gICAgbmFtZTogJ3NoYTItNTEyJyxcbiAgICBjb2RlOiAweDEzLFxuICAgIGVuY29kZTogc2hhKCdTSEEtNTEyJylcbn0pO1xuLy8jIHNvdXJjZU1hcHBpbmdVUkw9c2hhMi1icm93c2VyLmpzLm1hcCIsImltcG9ydCB7IGJhc2UzMiB9IGZyb20gJy4vYmFzZXMvYmFzZTMyLmpzJztcbmltcG9ydCB7IGJhc2UzNiB9IGZyb20gJy4vYmFzZXMvYmFzZTM2LmpzJztcbmltcG9ydCB7IGJhc2U1OGJ0YyB9IGZyb20gJy4vYmFzZXMvYmFzZTU4LmpzJztcbmltcG9ydCB7IGNvZXJjZSB9IGZyb20gJy4vYnl0ZXMuanMnO1xuaW1wb3J0ICogYXMgRGlnZXN0IGZyb20gJy4vaGFzaGVzL2RpZ2VzdC5qcyc7XG5pbXBvcnQgKiBhcyB2YXJpbnQgZnJvbSAnLi92YXJpbnQuanMnO1xuLy8gVGhpcyB3YXkgVFMgd2lsbCBhbHNvIGV4cG9zZSBhbGwgdGhlIHR5cGVzIGZyb20gbW9kdWxlXG5leHBvcnQgKiBmcm9tICcuL2xpbmsvaW50ZXJmYWNlLmpzJztcbmV4cG9ydCBmdW5jdGlvbiBmb3JtYXQobGluaywgYmFzZSkge1xuICAgIGNvbnN0IHsgYnl0ZXMsIHZlcnNpb24gfSA9IGxpbms7XG4gICAgc3dpdGNoICh2ZXJzaW9uKSB7XG4gICAgICAgIGNhc2UgMDpcbiAgICAgICAgICAgIHJldHVybiB0b1N0cmluZ1YwKGJ5dGVzLCBiYXNlQ2FjaGUobGluayksIGJhc2UgPz8gYmFzZTU4YnRjLmVuY29kZXIpO1xuICAgICAgICBkZWZhdWx0OlxuICAgICAgICAgICAgcmV0dXJuIHRvU3RyaW5nVjEoYnl0ZXMsIGJhc2VDYWNoZShsaW5rKSwgKGJhc2UgPz8gYmFzZTMyLmVuY29kZXIpKTtcbiAgICB9XG59XG5leHBvcnQgZnVuY3Rpb24gdG9KU09OKGxpbmspIHtcbiAgICByZXR1cm4ge1xuICAgICAgICAnLyc6IGZvcm1hdChsaW5rKVxuICAgIH07XG59XG5leHBvcnQgZnVuY3Rpb24gZnJvbUpTT04oanNvbikge1xuICAgIHJldHVybiBDSUQucGFyc2UoanNvblsnLyddKTtcbn1cbmNvbnN0IGNhY2hlID0gbmV3IFdlYWtNYXAoKTtcbmZ1bmN0aW9uIGJhc2VDYWNoZShjaWQpIHtcbiAgICBjb25zdCBiYXNlQ2FjaGUgPSBjYWNoZS5nZXQoY2lkKTtcbiAgICBpZiAoYmFzZUNhY2hlID09IG51bGwpIHtcbiAgICAgICAgY29uc3QgYmFzZUNhY2hlID0gbmV3IE1hcCgpO1xuICAgICAgICBjYWNoZS5zZXQoY2lkLCBiYXNlQ2FjaGUpO1xuICAgICAgICByZXR1cm4gYmFzZUNhY2hlO1xuICAgIH1cbiAgICByZXR1cm4gYmFzZUNhY2hlO1xufVxuZXhwb3J0IGNsYXNzIENJRCB7XG4gICAgY29kZTtcbiAgICB2ZXJzaW9uO1xuICAgIG11bHRpaGFzaDtcbiAgICBieXRlcztcbiAgICAnLyc7XG4gICAgLyoqXG4gICAgICogQHBhcmFtIHZlcnNpb24gLSBWZXJzaW9uIG9mIHRoZSBDSURcbiAgICAgKiBAcGFyYW0gY29kZSAtIENvZGUgb2YgdGhlIGNvZGVjIGNvbnRlbnQgaXMgZW5jb2RlZCBpbiwgc2VlIGh0dHBzOi8vZ2l0aHViLmNvbS9tdWx0aWZvcm1hdHMvbXVsdGljb2RlYy9ibG9iL21hc3Rlci90YWJsZS5jc3ZcbiAgICAgKiBAcGFyYW0gbXVsdGloYXNoIC0gKE11bHRpKWhhc2ggb2YgdGhlIG9mIHRoZSBjb250ZW50LlxuICAgICAqL1xuICAgIGNvbnN0cnVjdG9yKHZlcnNpb24sIGNvZGUsIG11bHRpaGFzaCwgYnl0ZXMpIHtcbiAgICAgICAgdGhpcy5jb2RlID0gY29kZTtcbiAgICAgICAgdGhpcy52ZXJzaW9uID0gdmVyc2lvbjtcbiAgICAgICAgdGhpcy5tdWx0aWhhc2ggPSBtdWx0aWhhc2g7XG4gICAgICAgIHRoaXMuYnl0ZXMgPSBieXRlcztcbiAgICAgICAgLy8gZmxhZyB0byBzZXJpYWxpemVycyB0aGF0IHRoaXMgaXMgYSBDSUQgYW5kXG4gICAgICAgIC8vIHNob3VsZCBiZSB0cmVhdGVkIHNwZWNpYWxseVxuICAgICAgICB0aGlzWycvJ10gPSBieXRlcztcbiAgICB9XG4gICAgLyoqXG4gICAgICogU2lnbmFsbGluZyBgY2lkLmFzQ0lEID09PSBjaWRgIGhhcyBiZWVuIHJlcGxhY2VkIHdpdGggYGNpZFsnLyddID09PSBjaWQuYnl0ZXNgXG4gICAgICogcGxlYXNlIGVpdGhlciB1c2UgYENJRC5hc0NJRChjaWQpYCBvciBzd2l0Y2ggdG8gbmV3IHNpZ25hbGxpbmcgbWVjaGFuaXNtXG4gICAgICpcbiAgICAgKiBAZGVwcmVjYXRlZFxuICAgICAqL1xuICAgIGdldCBhc0NJRCgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfVxuICAgIC8vIEFycmF5QnVmZmVyVmlld1xuICAgIGdldCBieXRlT2Zmc2V0KCkge1xuICAgICAgICByZXR1cm4gdGhpcy5ieXRlcy5ieXRlT2Zmc2V0O1xuICAgIH1cbiAgICAvLyBBcnJheUJ1ZmZlclZpZXdcbiAgICBnZXQgYnl0ZUxlbmd0aCgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuYnl0ZXMuYnl0ZUxlbmd0aDtcbiAgICB9XG4gICAgdG9WMCgpIHtcbiAgICAgICAgc3dpdGNoICh0aGlzLnZlcnNpb24pIHtcbiAgICAgICAgICAgIGNhc2UgMDoge1xuICAgICAgICAgICAgICAgIHJldHVybiB0aGlzO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgY2FzZSAxOiB7XG4gICAgICAgICAgICAgICAgY29uc3QgeyBjb2RlLCBtdWx0aWhhc2ggfSA9IHRoaXM7XG4gICAgICAgICAgICAgICAgaWYgKGNvZGUgIT09IERBR19QQl9DT0RFKSB7XG4gICAgICAgICAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcignQ2Fubm90IGNvbnZlcnQgYSBub24gZGFnLXBiIENJRCB0byBDSUR2MCcpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAvLyBzaGEyLTI1NlxuICAgICAgICAgICAgICAgIGlmIChtdWx0aWhhc2guY29kZSAhPT0gU0hBXzI1Nl9DT0RFKSB7XG4gICAgICAgICAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcignQ2Fubm90IGNvbnZlcnQgbm9uIHNoYTItMjU2IG11bHRpaGFzaCBDSUQgdG8gQ0lEdjAnKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgcmV0dXJuIChDSUQuY3JlYXRlVjAobXVsdGloYXNoKSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBkZWZhdWx0OiB7XG4gICAgICAgICAgICAgICAgdGhyb3cgRXJyb3IoYENhbiBub3QgY29udmVydCBDSUQgdmVyc2lvbiAke3RoaXMudmVyc2lvbn0gdG8gdmVyc2lvbiAwLiBUaGlzIGlzIGEgYnVnIHBsZWFzZSByZXBvcnRgKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cbiAgICB0b1YxKCkge1xuICAgICAgICBzd2l0Y2ggKHRoaXMudmVyc2lvbikge1xuICAgICAgICAgICAgY2FzZSAwOiB7XG4gICAgICAgICAgICAgICAgY29uc3QgeyBjb2RlLCBkaWdlc3QgfSA9IHRoaXMubXVsdGloYXNoO1xuICAgICAgICAgICAgICAgIGNvbnN0IG11bHRpaGFzaCA9IERpZ2VzdC5jcmVhdGUoY29kZSwgZGlnZXN0KTtcbiAgICAgICAgICAgICAgICByZXR1cm4gKENJRC5jcmVhdGVWMSh0aGlzLmNvZGUsIG11bHRpaGFzaCkpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgY2FzZSAxOiB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBkZWZhdWx0OiB7XG4gICAgICAgICAgICAgICAgdGhyb3cgRXJyb3IoYENhbiBub3QgY29udmVydCBDSUQgdmVyc2lvbiAke3RoaXMudmVyc2lvbn0gdG8gdmVyc2lvbiAxLiBUaGlzIGlzIGEgYnVnIHBsZWFzZSByZXBvcnRgKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cbiAgICBlcXVhbHMob3RoZXIpIHtcbiAgICAgICAgcmV0dXJuIENJRC5lcXVhbHModGhpcywgb3RoZXIpO1xuICAgIH1cbiAgICBzdGF0aWMgZXF1YWxzKHNlbGYsIG90aGVyKSB7XG4gICAgICAgIGNvbnN0IHVua25vd24gPSBvdGhlcjtcbiAgICAgICAgcmV0dXJuICh1bmtub3duICE9IG51bGwgJiZcbiAgICAgICAgICAgIHNlbGYuY29kZSA9PT0gdW5rbm93bi5jb2RlICYmXG4gICAgICAgICAgICBzZWxmLnZlcnNpb24gPT09IHVua25vd24udmVyc2lvbiAmJlxuICAgICAgICAgICAgRGlnZXN0LmVxdWFscyhzZWxmLm11bHRpaGFzaCwgdW5rbm93bi5tdWx0aWhhc2gpKTtcbiAgICB9XG4gICAgdG9TdHJpbmcoYmFzZSkge1xuICAgICAgICByZXR1cm4gZm9ybWF0KHRoaXMsIGJhc2UpO1xuICAgIH1cbiAgICB0b0pTT04oKSB7XG4gICAgICAgIHJldHVybiB7ICcvJzogZm9ybWF0KHRoaXMpIH07XG4gICAgfVxuICAgIGxpbmsoKSB7XG4gICAgICAgIHJldHVybiB0aGlzO1xuICAgIH1cbiAgICBbU3ltYm9sLnRvU3RyaW5nVGFnXSA9ICdDSUQnO1xuICAgIC8vIExlZ2FjeVxuICAgIFtTeW1ib2wuZm9yKCdub2RlanMudXRpbC5pbnNwZWN0LmN1c3RvbScpXSgpIHtcbiAgICAgICAgcmV0dXJuIGBDSUQoJHt0aGlzLnRvU3RyaW5nKCl9KWA7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIFRha2VzIGFueSBpbnB1dCBgdmFsdWVgIGFuZCByZXR1cm5zIGEgYENJRGAgaW5zdGFuY2UgaWYgaXQgd2FzXG4gICAgICogYSBgQ0lEYCBvdGhlcndpc2UgcmV0dXJucyBgbnVsbGAuIElmIGB2YWx1ZWAgaXMgaW5zdGFuY2VvZiBgQ0lEYFxuICAgICAqIGl0IHdpbGwgcmV0dXJuIHZhbHVlIGJhY2suIElmIGB2YWx1ZWAgaXMgbm90IGluc3RhbmNlIG9mIHRoaXMgQ0lEXG4gICAgICogY2xhc3MsIGJ1dCBpcyBjb21wYXRpYmxlIENJRCBpdCB3aWxsIHJldHVybiBuZXcgaW5zdGFuY2Ugb2YgdGhpc1xuICAgICAqIGBDSURgIGNsYXNzLiBPdGhlcndpc2UgcmV0dXJucyBudWxsLlxuICAgICAqXG4gICAgICogVGhpcyBhbGxvd3MgdHdvIGRpZmZlcmVudCBpbmNvbXBhdGlibGUgdmVyc2lvbnMgb2YgQ0lEIGxpYnJhcnkgdG9cbiAgICAgKiBjby1leGlzdCBhbmQgaW50ZXJvcCBhcyBsb25nIGFzIGJpbmFyeSBpbnRlcmZhY2UgaXMgY29tcGF0aWJsZS5cbiAgICAgKi9cbiAgICBzdGF0aWMgYXNDSUQoaW5wdXQpIHtcbiAgICAgICAgaWYgKGlucHV0ID09IG51bGwpIHtcbiAgICAgICAgICAgIHJldHVybiBudWxsO1xuICAgICAgICB9XG4gICAgICAgIGNvbnN0IHZhbHVlID0gaW5wdXQ7XG4gICAgICAgIGlmICh2YWx1ZSBpbnN0YW5jZW9mIENJRCkge1xuICAgICAgICAgICAgLy8gSWYgdmFsdWUgaXMgaW5zdGFuY2Ugb2YgQ0lEIHRoZW4gd2UncmUgYWxsIHNldC5cbiAgICAgICAgICAgIHJldHVybiB2YWx1ZTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIGlmICgodmFsdWVbJy8nXSAhPSBudWxsICYmIHZhbHVlWycvJ10gPT09IHZhbHVlLmJ5dGVzKSB8fCB2YWx1ZS5hc0NJRCA9PT0gdmFsdWUpIHtcbiAgICAgICAgICAgIC8vIElmIHZhbHVlIGlzbid0IGluc3RhbmNlIG9mIHRoaXMgQ0lEIGNsYXNzIGJ1dCBgdGhpcy5hc0NJRCA9PT0gdGhpc2Agb3JcbiAgICAgICAgICAgIC8vIGB2YWx1ZVsnLyddID09PSB2YWx1ZS5ieXRlc2AgaXMgdHJ1ZSBpdCBpcyBDSUQgaW5zdGFuY2UgY29taW5nIGZyb20gYVxuICAgICAgICAgICAgLy8gZGlmZmVyZW50IGltcGxlbWVudGF0aW9uIChkaWZmIHZlcnNpb24gb3IgZHVwbGljYXRlKS4gSW4gdGhhdCBjYXNlIHdlXG4gICAgICAgICAgICAvLyByZWJhc2UgaXQgdG8gdGhpcyBgQ0lEYCBpbXBsZW1lbnRhdGlvbiBzbyBjYWxsZXIgaXMgZ3VhcmFudGVlZCB0byBnZXRcbiAgICAgICAgICAgIC8vIGluc3RhbmNlIHdpdGggZXhwZWN0ZWQgQVBJLlxuICAgICAgICAgICAgY29uc3QgeyB2ZXJzaW9uLCBjb2RlLCBtdWx0aWhhc2gsIGJ5dGVzIH0gPSB2YWx1ZTtcbiAgICAgICAgICAgIHJldHVybiBuZXcgQ0lEKHZlcnNpb24sIGNvZGUsIG11bHRpaGFzaCwgYnl0ZXMgPz8gZW5jb2RlQ0lEKHZlcnNpb24sIGNvZGUsIG11bHRpaGFzaC5ieXRlcykpO1xuICAgICAgICB9XG4gICAgICAgIGVsc2UgaWYgKHZhbHVlW2NpZFN5bWJvbF0gPT09IHRydWUpIHtcbiAgICAgICAgICAgIC8vIElmIHZhbHVlIGlzIGEgQ0lEIGZyb20gb2xkZXIgaW1wbGVtZW50YXRpb24gdGhhdCB1c2VkIHRvIGJlIHRhZ2dlZCB2aWFcbiAgICAgICAgICAgIC8vIHN5bWJvbCB3ZSBzdGlsbCByZWJhc2UgaXQgdG8gdGhlIHRoaXMgYENJRGAgaW1wbGVtZW50YXRpb24gYnlcbiAgICAgICAgICAgIC8vIGRlbGVnYXRpbmcgdGhhdCB0byBhIGNvbnN0cnVjdG9yLlxuICAgICAgICAgICAgY29uc3QgeyB2ZXJzaW9uLCBtdWx0aWhhc2gsIGNvZGUgfSA9IHZhbHVlO1xuICAgICAgICAgICAgY29uc3QgZGlnZXN0ID0gRGlnZXN0LmRlY29kZShtdWx0aWhhc2gpO1xuICAgICAgICAgICAgcmV0dXJuIENJRC5jcmVhdGUodmVyc2lvbiwgY29kZSwgZGlnZXN0KTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIC8vIE90aGVyd2lzZSB2YWx1ZSBpcyBub3QgYSBDSUQgKG9yIGFuIGluY29tcGF0aWJsZSB2ZXJzaW9uIG9mIGl0KSBpblxuICAgICAgICAgICAgLy8gd2hpY2ggY2FzZSB3ZSByZXR1cm4gYG51bGxgLlxuICAgICAgICAgICAgcmV0dXJuIG51bGw7XG4gICAgICAgIH1cbiAgICB9XG4gICAgLyoqXG4gICAgICogQHBhcmFtIHZlcnNpb24gLSBWZXJzaW9uIG9mIHRoZSBDSURcbiAgICAgKiBAcGFyYW0gY29kZSAtIENvZGUgb2YgdGhlIGNvZGVjIGNvbnRlbnQgaXMgZW5jb2RlZCBpbiwgc2VlIGh0dHBzOi8vZ2l0aHViLmNvbS9tdWx0aWZvcm1hdHMvbXVsdGljb2RlYy9ibG9iL21hc3Rlci90YWJsZS5jc3ZcbiAgICAgKiBAcGFyYW0gZGlnZXN0IC0gKE11bHRpKWhhc2ggb2YgdGhlIG9mIHRoZSBjb250ZW50LlxuICAgICAqL1xuICAgIHN0YXRpYyBjcmVhdGUodmVyc2lvbiwgY29kZSwgZGlnZXN0KSB7XG4gICAgICAgIGlmICh0eXBlb2YgY29kZSAhPT0gJ251bWJlcicpIHtcbiAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcignU3RyaW5nIGNvZGVjcyBhcmUgbm8gbG9uZ2VyIHN1cHBvcnRlZCcpO1xuICAgICAgICB9XG4gICAgICAgIGlmICghKGRpZ2VzdC5ieXRlcyBpbnN0YW5jZW9mIFVpbnQ4QXJyYXkpKSB7XG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ0ludmFsaWQgZGlnZXN0Jyk7XG4gICAgICAgIH1cbiAgICAgICAgc3dpdGNoICh2ZXJzaW9uKSB7XG4gICAgICAgICAgICBjYXNlIDA6IHtcbiAgICAgICAgICAgICAgICBpZiAoY29kZSAhPT0gREFHX1BCX0NPREUpIHtcbiAgICAgICAgICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKGBWZXJzaW9uIDAgQ0lEIG11c3QgdXNlIGRhZy1wYiAoY29kZTogJHtEQUdfUEJfQ09ERX0pIGJsb2NrIGVuY29kaW5nYCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gbmV3IENJRCh2ZXJzaW9uLCBjb2RlLCBkaWdlc3QsIGRpZ2VzdC5ieXRlcyk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgY2FzZSAxOiB7XG4gICAgICAgICAgICAgICAgY29uc3QgYnl0ZXMgPSBlbmNvZGVDSUQodmVyc2lvbiwgY29kZSwgZGlnZXN0LmJ5dGVzKTtcbiAgICAgICAgICAgICAgICByZXR1cm4gbmV3IENJRCh2ZXJzaW9uLCBjb2RlLCBkaWdlc3QsIGJ5dGVzKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGRlZmF1bHQ6IHtcbiAgICAgICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ0ludmFsaWQgdmVyc2lvbicpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxuICAgIC8qKlxuICAgICAqIFNpbXBsaWZpZWQgdmVyc2lvbiBvZiBgY3JlYXRlYCBmb3IgQ0lEdjAuXG4gICAgICovXG4gICAgc3RhdGljIGNyZWF0ZVYwKGRpZ2VzdCkge1xuICAgICAgICByZXR1cm4gQ0lELmNyZWF0ZSgwLCBEQUdfUEJfQ09ERSwgZGlnZXN0KTtcbiAgICB9XG4gICAgLyoqXG4gICAgICogU2ltcGxpZmllZCB2ZXJzaW9uIG9mIGBjcmVhdGVgIGZvciBDSUR2MS5cbiAgICAgKlxuICAgICAqIEBwYXJhbSBjb2RlIC0gQ29udGVudCBlbmNvZGluZyBmb3JtYXQgY29kZS5cbiAgICAgKiBAcGFyYW0gZGlnZXN0IC0gTXVsdGloYXNoIG9mIHRoZSBjb250ZW50LlxuICAgICAqL1xuICAgIHN0YXRpYyBjcmVhdGVWMShjb2RlLCBkaWdlc3QpIHtcbiAgICAgICAgcmV0dXJuIENJRC5jcmVhdGUoMSwgY29kZSwgZGlnZXN0KTtcbiAgICB9XG4gICAgLyoqXG4gICAgICogRGVjb2RlZCBhIENJRCBmcm9tIGl0cyBiaW5hcnkgcmVwcmVzZW50YXRpb24uIFRoZSBieXRlIGFycmF5IG11c3QgY29udGFpblxuICAgICAqIG9ubHkgdGhlIENJRCB3aXRoIG5vIGFkZGl0aW9uYWwgYnl0ZXMuXG4gICAgICpcbiAgICAgKiBBbiBlcnJvciB3aWxsIGJlIHRocm93biBpZiB0aGUgYnl0ZXMgcHJvdmlkZWQgZG8gbm90IGNvbnRhaW4gYSB2YWxpZFxuICAgICAqIGJpbmFyeSByZXByZXNlbnRhdGlvbiBvZiBhIENJRC5cbiAgICAgKi9cbiAgICBzdGF0aWMgZGVjb2RlKGJ5dGVzKSB7XG4gICAgICAgIGNvbnN0IFtjaWQsIHJlbWFpbmRlcl0gPSBDSUQuZGVjb2RlRmlyc3QoYnl0ZXMpO1xuICAgICAgICBpZiAocmVtYWluZGVyLmxlbmd0aCAhPT0gMCkge1xuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdJbmNvcnJlY3QgbGVuZ3RoJyk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIGNpZDtcbiAgICB9XG4gICAgLyoqXG4gICAgICogRGVjb2RlZCBhIENJRCBmcm9tIGl0cyBiaW5hcnkgcmVwcmVzZW50YXRpb24gYXQgdGhlIGJlZ2lubmluZyBvZiBhIGJ5dGVcbiAgICAgKiBhcnJheS5cbiAgICAgKlxuICAgICAqIFJldHVybnMgYW4gYXJyYXkgd2l0aCB0aGUgZmlyc3QgZWxlbWVudCBjb250YWluaW5nIHRoZSBDSUQgYW5kIHRoZSBzZWNvbmRcbiAgICAgKiBlbGVtZW50IGNvbnRhaW5pbmcgdGhlIHJlbWFpbmRlciBvZiB0aGUgb3JpZ2luYWwgYnl0ZSBhcnJheS4gVGhlIHJlbWFpbmRlclxuICAgICAqIHdpbGwgYmUgYSB6ZXJvLWxlbmd0aCBieXRlIGFycmF5IGlmIHRoZSBwcm92aWRlZCBieXRlcyBvbmx5IGNvbnRhaW5lZCBhXG4gICAgICogYmluYXJ5IENJRCByZXByZXNlbnRhdGlvbi5cbiAgICAgKi9cbiAgICBzdGF0aWMgZGVjb2RlRmlyc3QoYnl0ZXMpIHtcbiAgICAgICAgY29uc3Qgc3BlY3MgPSBDSUQuaW5zcGVjdEJ5dGVzKGJ5dGVzKTtcbiAgICAgICAgY29uc3QgcHJlZml4U2l6ZSA9IHNwZWNzLnNpemUgLSBzcGVjcy5tdWx0aWhhc2hTaXplO1xuICAgICAgICBjb25zdCBtdWx0aWhhc2hCeXRlcyA9IGNvZXJjZShieXRlcy5zdWJhcnJheShwcmVmaXhTaXplLCBwcmVmaXhTaXplICsgc3BlY3MubXVsdGloYXNoU2l6ZSkpO1xuICAgICAgICBpZiAobXVsdGloYXNoQnl0ZXMuYnl0ZUxlbmd0aCAhPT0gc3BlY3MubXVsdGloYXNoU2l6ZSkge1xuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdJbmNvcnJlY3QgbGVuZ3RoJyk7XG4gICAgICAgIH1cbiAgICAgICAgY29uc3QgZGlnZXN0Qnl0ZXMgPSBtdWx0aWhhc2hCeXRlcy5zdWJhcnJheShzcGVjcy5tdWx0aWhhc2hTaXplIC0gc3BlY3MuZGlnZXN0U2l6ZSk7XG4gICAgICAgIGNvbnN0IGRpZ2VzdCA9IG5ldyBEaWdlc3QuRGlnZXN0KHNwZWNzLm11bHRpaGFzaENvZGUsIHNwZWNzLmRpZ2VzdFNpemUsIGRpZ2VzdEJ5dGVzLCBtdWx0aWhhc2hCeXRlcyk7XG4gICAgICAgIGNvbnN0IGNpZCA9IHNwZWNzLnZlcnNpb24gPT09IDBcbiAgICAgICAgICAgID8gQ0lELmNyZWF0ZVYwKGRpZ2VzdClcbiAgICAgICAgICAgIDogQ0lELmNyZWF0ZVYxKHNwZWNzLmNvZGVjLCBkaWdlc3QpO1xuICAgICAgICByZXR1cm4gW2NpZCwgYnl0ZXMuc3ViYXJyYXkoc3BlY3Muc2l6ZSldO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBJbnNwZWN0IHRoZSBpbml0aWFsIGJ5dGVzIG9mIGEgQ0lEIHRvIGRldGVybWluZSBpdHMgcHJvcGVydGllcy5cbiAgICAgKlxuICAgICAqIEludm9sdmVzIGRlY29kaW5nIHVwIHRvIDQgdmFyaW50cy4gVHlwaWNhbGx5IHRoaXMgd2lsbCByZXF1aXJlIG9ubHkgNCB0byA2XG4gICAgICogYnl0ZXMgYnV0IGZvciBsYXJnZXIgbXVsdGljb2RlYyBjb2RlIHZhbHVlcyBhbmQgbGFyZ2VyIG11bHRpaGFzaCBkaWdlc3RcbiAgICAgKiBsZW5ndGhzIHRoZXNlIHZhcmludHMgY2FuIGJlIHF1aXRlIGxhcmdlLiBJdCBpcyByZWNvbW1lbmRlZCB0aGF0IGF0IGxlYXN0XG4gICAgICogMTAgYnl0ZXMgYmUgbWFkZSBhdmFpbGFibGUgaW4gdGhlIGBpbml0aWFsQnl0ZXNgIGFyZ3VtZW50IGZvciBhIGNvbXBsZXRlXG4gICAgICogaW5zcGVjdGlvbi5cbiAgICAgKi9cbiAgICBzdGF0aWMgaW5zcGVjdEJ5dGVzKGluaXRpYWxCeXRlcykge1xuICAgICAgICBsZXQgb2Zmc2V0ID0gMDtcbiAgICAgICAgY29uc3QgbmV4dCA9ICgpID0+IHtcbiAgICAgICAgICAgIGNvbnN0IFtpLCBsZW5ndGhdID0gdmFyaW50LmRlY29kZShpbml0aWFsQnl0ZXMuc3ViYXJyYXkob2Zmc2V0KSk7XG4gICAgICAgICAgICBvZmZzZXQgKz0gbGVuZ3RoO1xuICAgICAgICAgICAgcmV0dXJuIGk7XG4gICAgICAgIH07XG4gICAgICAgIGxldCB2ZXJzaW9uID0gbmV4dCgpO1xuICAgICAgICBsZXQgY29kZWMgPSBEQUdfUEJfQ09ERTtcbiAgICAgICAgaWYgKHZlcnNpb24gPT09IDE4KSB7XG4gICAgICAgICAgICAvLyBDSUR2MFxuICAgICAgICAgICAgdmVyc2lvbiA9IDA7XG4gICAgICAgICAgICBvZmZzZXQgPSAwO1xuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgY29kZWMgPSBuZXh0KCk7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHZlcnNpb24gIT09IDAgJiYgdmVyc2lvbiAhPT0gMSkge1xuICAgICAgICAgICAgdGhyb3cgbmV3IFJhbmdlRXJyb3IoYEludmFsaWQgQ0lEIHZlcnNpb24gJHt2ZXJzaW9ufWApO1xuICAgICAgICB9XG4gICAgICAgIGNvbnN0IHByZWZpeFNpemUgPSBvZmZzZXQ7XG4gICAgICAgIGNvbnN0IG11bHRpaGFzaENvZGUgPSBuZXh0KCk7IC8vIG11bHRpaGFzaCBjb2RlXG4gICAgICAgIGNvbnN0IGRpZ2VzdFNpemUgPSBuZXh0KCk7IC8vIG11bHRpaGFzaCBsZW5ndGhcbiAgICAgICAgY29uc3Qgc2l6ZSA9IG9mZnNldCArIGRpZ2VzdFNpemU7XG4gICAgICAgIGNvbnN0IG11bHRpaGFzaFNpemUgPSBzaXplIC0gcHJlZml4U2l6ZTtcbiAgICAgICAgcmV0dXJuIHsgdmVyc2lvbiwgY29kZWMsIG11bHRpaGFzaENvZGUsIGRpZ2VzdFNpemUsIG11bHRpaGFzaFNpemUsIHNpemUgfTtcbiAgICB9XG4gICAgLyoqXG4gICAgICogVGFrZXMgY2lkIGluIGEgc3RyaW5nIHJlcHJlc2VudGF0aW9uIGFuZCBjcmVhdGVzIGFuIGluc3RhbmNlLiBJZiBgYmFzZWBcbiAgICAgKiBkZWNvZGVyIGlzIG5vdCBwcm92aWRlZCB3aWxsIHVzZSBhIGRlZmF1bHQgZnJvbSB0aGUgY29uZmlndXJhdGlvbi4gSXQgd2lsbFxuICAgICAqIHRocm93IGFuIGVycm9yIGlmIGVuY29kaW5nIG9mIHRoZSBDSUQgaXMgbm90IGNvbXBhdGlibGUgd2l0aCBzdXBwbGllZCAob3JcbiAgICAgKiBhIGRlZmF1bHQgZGVjb2RlcikuXG4gICAgICovXG4gICAgc3RhdGljIHBhcnNlKHNvdXJjZSwgYmFzZSkge1xuICAgICAgICBjb25zdCBbcHJlZml4LCBieXRlc10gPSBwYXJzZUNJRHRvQnl0ZXMoc291cmNlLCBiYXNlKTtcbiAgICAgICAgY29uc3QgY2lkID0gQ0lELmRlY29kZShieXRlcyk7XG4gICAgICAgIGlmIChjaWQudmVyc2lvbiA9PT0gMCAmJiBzb3VyY2VbMF0gIT09ICdRJykge1xuICAgICAgICAgICAgdGhyb3cgRXJyb3IoJ1ZlcnNpb24gMCBDSUQgc3RyaW5nIG11c3Qgbm90IGluY2x1ZGUgbXVsdGliYXNlIHByZWZpeCcpO1xuICAgICAgICB9XG4gICAgICAgIC8vIENhY2hlIHN0cmluZyByZXByZXNlbnRhdGlvbiB0byBhdm9pZCBjb21wdXRpbmcgaXQgb24gYHRoaXMudG9TdHJpbmcoKWBcbiAgICAgICAgYmFzZUNhY2hlKGNpZCkuc2V0KHByZWZpeCwgc291cmNlKTtcbiAgICAgICAgcmV0dXJuIGNpZDtcbiAgICB9XG59XG5mdW5jdGlvbiBwYXJzZUNJRHRvQnl0ZXMoc291cmNlLCBiYXNlKSB7XG4gICAgc3dpdGNoIChzb3VyY2VbMF0pIHtcbiAgICAgICAgLy8gQ0lEdjAgaXMgcGFyc2VkIGRpZmZlcmVudGx5XG4gICAgICAgIGNhc2UgJ1EnOiB7XG4gICAgICAgICAgICBjb25zdCBkZWNvZGVyID0gYmFzZSA/PyBiYXNlNThidGM7XG4gICAgICAgICAgICByZXR1cm4gW1xuICAgICAgICAgICAgICAgIGJhc2U1OGJ0Yy5wcmVmaXgsXG4gICAgICAgICAgICAgICAgZGVjb2Rlci5kZWNvZGUoYCR7YmFzZTU4YnRjLnByZWZpeH0ke3NvdXJjZX1gKVxuICAgICAgICAgICAgXTtcbiAgICAgICAgfVxuICAgICAgICBjYXNlIGJhc2U1OGJ0Yy5wcmVmaXg6IHtcbiAgICAgICAgICAgIGNvbnN0IGRlY29kZXIgPSBiYXNlID8/IGJhc2U1OGJ0YztcbiAgICAgICAgICAgIHJldHVybiBbYmFzZTU4YnRjLnByZWZpeCwgZGVjb2Rlci5kZWNvZGUoc291cmNlKV07XG4gICAgICAgIH1cbiAgICAgICAgY2FzZSBiYXNlMzIucHJlZml4OiB7XG4gICAgICAgICAgICBjb25zdCBkZWNvZGVyID0gYmFzZSA/PyBiYXNlMzI7XG4gICAgICAgICAgICByZXR1cm4gW2Jhc2UzMi5wcmVmaXgsIGRlY29kZXIuZGVjb2RlKHNvdXJjZSldO1xuICAgICAgICB9XG4gICAgICAgIGNhc2UgYmFzZTM2LnByZWZpeDoge1xuICAgICAgICAgICAgY29uc3QgZGVjb2RlciA9IGJhc2UgPz8gYmFzZTM2O1xuICAgICAgICAgICAgcmV0dXJuIFtiYXNlMzYucHJlZml4LCBkZWNvZGVyLmRlY29kZShzb3VyY2UpXTtcbiAgICAgICAgfVxuICAgICAgICBkZWZhdWx0OiB7XG4gICAgICAgICAgICBpZiAoYmFzZSA9PSBudWxsKSB7XG4gICAgICAgICAgICAgICAgdGhyb3cgRXJyb3IoJ1RvIHBhcnNlIG5vbiBiYXNlMzIsIGJhc2UzNiBvciBiYXNlNThidGMgZW5jb2RlZCBDSUQgbXVsdGliYXNlIGRlY29kZXIgbXVzdCBiZSBwcm92aWRlZCcpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcmV0dXJuIFtzb3VyY2VbMF0sIGJhc2UuZGVjb2RlKHNvdXJjZSldO1xuICAgICAgICB9XG4gICAgfVxufVxuZnVuY3Rpb24gdG9TdHJpbmdWMChieXRlcywgY2FjaGUsIGJhc2UpIHtcbiAgICBjb25zdCB7IHByZWZpeCB9ID0gYmFzZTtcbiAgICBpZiAocHJlZml4ICE9PSBiYXNlNThidGMucHJlZml4KSB7XG4gICAgICAgIHRocm93IEVycm9yKGBDYW5ub3Qgc3RyaW5nIGVuY29kZSBWMCBpbiAke2Jhc2UubmFtZX0gZW5jb2RpbmdgKTtcbiAgICB9XG4gICAgY29uc3QgY2lkID0gY2FjaGUuZ2V0KHByZWZpeCk7XG4gICAgaWYgKGNpZCA9PSBudWxsKSB7XG4gICAgICAgIGNvbnN0IGNpZCA9IGJhc2UuZW5jb2RlKGJ5dGVzKS5zbGljZSgxKTtcbiAgICAgICAgY2FjaGUuc2V0KHByZWZpeCwgY2lkKTtcbiAgICAgICAgcmV0dXJuIGNpZDtcbiAgICB9XG4gICAgZWxzZSB7XG4gICAgICAgIHJldHVybiBjaWQ7XG4gICAgfVxufVxuZnVuY3Rpb24gdG9TdHJpbmdWMShieXRlcywgY2FjaGUsIGJhc2UpIHtcbiAgICBjb25zdCB7IHByZWZpeCB9ID0gYmFzZTtcbiAgICBjb25zdCBjaWQgPSBjYWNoZS5nZXQocHJlZml4KTtcbiAgICBpZiAoY2lkID09IG51bGwpIHtcbiAgICAgICAgY29uc3QgY2lkID0gYmFzZS5lbmNvZGUoYnl0ZXMpO1xuICAgICAgICBjYWNoZS5zZXQocHJlZml4LCBjaWQpO1xuICAgICAgICByZXR1cm4gY2lkO1xuICAgIH1cbiAgICBlbHNlIHtcbiAgICAgICAgcmV0dXJuIGNpZDtcbiAgICB9XG59XG5jb25zdCBEQUdfUEJfQ09ERSA9IDB4NzA7XG5jb25zdCBTSEFfMjU2X0NPREUgPSAweDEyO1xuZnVuY3Rpb24gZW5jb2RlQ0lEKHZlcnNpb24sIGNvZGUsIG11bHRpaGFzaCkge1xuICAgIGNvbnN0IGNvZGVPZmZzZXQgPSB2YXJpbnQuZW5jb2RpbmdMZW5ndGgodmVyc2lvbik7XG4gICAgY29uc3QgaGFzaE9mZnNldCA9IGNvZGVPZmZzZXQgKyB2YXJpbnQuZW5jb2RpbmdMZW5ndGgoY29kZSk7XG4gICAgY29uc3QgYnl0ZXMgPSBuZXcgVWludDhBcnJheShoYXNoT2Zmc2V0ICsgbXVsdGloYXNoLmJ5dGVMZW5ndGgpO1xuICAgIHZhcmludC5lbmNvZGVUbyh2ZXJzaW9uLCBieXRlcywgMCk7XG4gICAgdmFyaW50LmVuY29kZVRvKGNvZGUsIGJ5dGVzLCBjb2RlT2Zmc2V0KTtcbiAgICBieXRlcy5zZXQobXVsdGloYXNoLCBoYXNoT2Zmc2V0KTtcbiAgICByZXR1cm4gYnl0ZXM7XG59XG5jb25zdCBjaWRTeW1ib2wgPSBTeW1ib2wuZm9yKCdAaXBsZC9qcy1jaWQvQ0lEJyk7XG4vLyMgc291cmNlTWFwcGluZ1VSTD1jaWQuanMubWFwIiwiLyoqXG4gKiBAcGFja2FnZURvY3VtZW50YXRpb25cbiAqXG4gKiBUaGlzIGxpYnJhcnkgZGVmaW5lcyBjb21tb24gaW50ZXJmYWNlcyBhbmQgbG93IGxldmVsIGJ1aWxkaW5nIGJsb2NrcyBmb3IgdmFyaW91cyBpbnRlcnJlbGF0ZWQgbXVsdGlmb3JtYXQgdGVjaG5vbG9naWVzIChtdWx0aWNvZGVjLCBtdWx0aWhhc2gsIG11bHRpYmFzZSwgYW5kIENJRCkuIFRoZXkgY2FuIGJlIHVzZWQgdG8gaW1wbGVtZW50IGN1c3RvbSBiYXNlIGVuY29kZXJzIC8gZGVjb2RlcnMgLyBjb2RlY3MsIGNvZGVjIGVuY29kZXJzIC9kZWNvZGVycyBhbmQgbXVsdGloYXNoIGhhc2hlcnMgdGhhdCBjb21wbHkgdG8gdGhlIGludGVyZmFjZSB0aGF0IGxheWVycyBhYm92ZSBhc3N1bWUuXG4gKlxuICogVGhpcyBsaWJyYXJ5IHByb3ZpZGVzIGltcGxlbWVudGF0aW9ucyBmb3IgbW9zdCBiYXNpY3MgYW5kIG1hbnkgb3RoZXJzIGNhbiBiZSBmb3VuZCBpbiBsaW5rZWQgcmVwb3NpdG9yaWVzLlxuICpcbiAqIGBgYFR5cGVTY3JpcHRcbiAqIGltcG9ydCB7IENJRCB9IGZyb20gJ211bHRpZm9ybWF0cy9jaWQnXG4gKiBpbXBvcnQgKiBhcyBqc29uIGZyb20gJ211bHRpZm9ybWF0cy9jb2RlY3MvanNvbidcbiAqIGltcG9ydCB7IHNoYTI1NiB9IGZyb20gJ211bHRpZm9ybWF0cy9oYXNoZXMvc2hhMidcbiAqXG4gKiBjb25zdCBieXRlcyA9IGpzb24uZW5jb2RlKHsgaGVsbG86ICd3b3JsZCcgfSlcbiAqXG4gKiBjb25zdCBoYXNoID0gYXdhaXQgc2hhMjU2LmRpZ2VzdChieXRlcylcbiAqIGNvbnN0IGNpZCA9IENJRC5jcmVhdGUoMSwganNvbi5jb2RlLCBoYXNoKVxuICogLy8+IENJRChiYWdhYWllcmFzb3JkczRuamN0czZ2czdxdmRqZmN2Z251bWU0aHFvaGY2NXpzZmd1cHJxcGhzM2ljd2VhKVxuICogYGBgXG4gKlxuICogIyMgQ3JlYXRpbmcgQmxvY2tzXG4gKlxuICogYGBgVHlwZVNjcmlwdFxuICogaW1wb3J0ICogYXMgQmxvY2sgZnJvbSAnbXVsdGlmb3JtYXRzL2Jsb2NrJ1xuICogaW1wb3J0ICogYXMgY29kZWMgZnJvbSAnQGlwbGQvZGFnLWNib3InXG4gKiBpbXBvcnQgeyBzaGEyNTYgYXMgaGFzaGVyIH0gZnJvbSAnbXVsdGlmb3JtYXRzL2hhc2hlcy9zaGEyJ1xuICpcbiAqIGNvbnN0IHZhbHVlID0geyBoZWxsbzogJ3dvcmxkJyB9XG4gKlxuICogLy8gZW5jb2RlIGEgYmxvY2tcbiAqIGxldCBibG9jayA9IGF3YWl0IEJsb2NrLmVuY29kZSh7IHZhbHVlLCBjb2RlYywgaGFzaGVyIH0pXG4gKlxuICogYmxvY2sudmFsdWUgLy8geyBoZWxsbzogJ3dvcmxkJyB9XG4gKiBibG9jay5ieXRlcyAvLyBVaW50OEFycmF5XG4gKiBibG9jay5jaWQgICAvLyBDSUQoKSB3LyBzaGEyLTI1NiBoYXNoIGFkZHJlc3MgYW5kIGRhZy1jYm9yIGNvZGVjXG4gKlxuICogLy8geW91IGNhbiBhbHNvIGRlY29kZSBibG9ja3MgZnJvbSB0aGVpciBiaW5hcnkgc3RhdGVcbiAqIGJsb2NrID0gYXdhaXQgQmxvY2suZGVjb2RlKHsgYnl0ZXM6IGJsb2NrLmJ5dGVzLCBjb2RlYywgaGFzaGVyIH0pXG4gKlxuICogLy8gaWYgeW91IGhhdmUgdGhlIGNpZCB5b3UgY2FuIGFsc28gdmVyaWZ5IHRoZSBoYXNoIG9uIGRlY29kZVxuICogYmxvY2sgPSBhd2FpdCBCbG9jay5jcmVhdGUoeyBieXRlczogYmxvY2suYnl0ZXMsIGNpZDogYmxvY2suY2lkLCBjb2RlYywgaGFzaGVyIH0pXG4gKiBgYGBcbiAqXG4gKiAjIyBNdWx0aWJhc2UgRW5jb2RlcnMgLyBEZWNvZGVycyAvIENvZGVjc1xuICpcbiAqIENJRHMgY2FuIGJlIHNlcmlhbGl6ZWQgdG8gc3RyaW5nIHJlcHJlc2VudGF0aW9uIHVzaW5nIG11bHRpYmFzZSBlbmNvZGVycyB0aGF0IGltcGxlbWVudCBbYE11bHRpYmFzZUVuY29kZXJgXShodHRwczovL2dpdGh1Yi5jb20vbXVsdGlmb3JtYXRzL2pzLW11bHRpZm9ybWF0cy9ibG9iL21hc3Rlci9zcmMvYmFzZXMvaW50ZXJmYWNlLnRzKSBpbnRlcmZhY2UuIFRoaXMgbGlicmFyeSBwcm92aWRlcyBxdWl0ZSBhIGZldyBpbXBsZW1lbnRhdGlvbnMgdGhhdCBjYW4gYmUgaW1wb3J0ZWQ6XG4gKlxuICogYGBgVHlwZVNjcmlwdFxuICogaW1wb3J0IHsgYmFzZTY0IH0gZnJvbSBcIm11bHRpZm9ybWF0cy9iYXNlcy9iYXNlNjRcIlxuICogY2lkLnRvU3RyaW5nKGJhc2U2NC5lbmNvZGVyKVxuICogLy8+ICdtQVlBRUVpQ1Rvamx4cVJUbDZzdndxTkpSVk0yakNjUEJ4eSs3bVJUVWZHRHp5MmdWaUEnXG4gKiBgYGBcbiAqXG4gKiBQYXJzaW5nIENJRCBzdHJpbmcgc2VyaWFsaXplZCBDSURzIHJlcXVpcmVzIG11bHRpYmFzZSBkZWNvZGVyIHRoYXQgaW1wbGVtZW50cyBbYE11bHRpYmFzZURlY29kZXJgXShodHRwczovL2dpdGh1Yi5jb20vbXVsdGlmb3JtYXRzL2pzLW11bHRpZm9ybWF0cy9ibG9iL21hc3Rlci9zcmMvYmFzZXMvaW50ZXJmYWNlLnRzKSBpbnRlcmZhY2UuIFRoaXMgbGlicmFyeSBwcm92aWRlcyBhIGRlY29kZXIgZm9yIGV2ZXJ5IGVuY29kZXIgaXQgcHJvdmlkZXM6XG4gKlxuICogYGBgVHlwZVNjcmlwdFxuICogQ0lELnBhcnNlKCdtQVlBRUVpQ1Rvamx4cVJUbDZzdndxTkpSVk0yakNjUEJ4eSs3bVJUVWZHRHp5MmdWaUEnLCBiYXNlNjQuZGVjb2RlcilcbiAqIC8vPiBDSUQoYmFnYWFpZXJhc29yZHM0bmpjdHM2dnM3cXZkamZjdmdudW1lNGhxb2hmNjV6c2ZndXBycXBoczNpY3dlYSlcbiAqIGBgYFxuICpcbiAqIER1YWwgb2YgbXVsdGliYXNlIGVuY29kZXIgJiBkZWNvZGVyIGlzIGRlZmluZWQgYXMgbXVsdGliYXNlIGNvZGVjIGFuZCBpdCBleHBvc2VzXG4gKiB0aGVtIGFzIGBlbmNvZGVyYCBhbmQgYGRlY29kZXJgIHByb3BlcnRpZXMuIEZvciBhZGRlZCBjb252ZW5pZW5jZSBjb2RlY3MgYWxzb1xuICogaW1wbGVtZW50IGBNdWx0aWJhc2VFbmNvZGVyYCBhbmQgYE11bHRpYmFzZURlY29kZXJgIGludGVyZmFjZXMgc28gdGhleSBjb3VsZCBiZVxuICogdXNlZCBhcyBlaXRoZXIgb3IgYm90aDpcbiAqXG4gKiBgYGBUeXBlU2NyaXB0XG4gKiBjaWQudG9TdHJpbmcoYmFzZTY0KVxuICogQ0lELnBhcnNlKGNpZC50b1N0cmluZyhiYXNlNjQpLCBiYXNlNjQpXG4gKiBgYGBcbiAqXG4gKiAqKk5vdGU6KiogQ0lEIGltcGxlbWVudGF0aW9uIGNvbWVzIGJ1bmRsZWQgd2l0aCBgYmFzZTMyYCBhbmQgYGJhc2U1OGJ0Y2BcbiAqIG11bHRpYmFzZSBjb2RlY3Mgc28gdGhhdCBDSURzIGNhbiBiZSBiYXNlIHNlcmlhbGl6ZWQgdG8gKHZlcnNpb24gc3BlY2lmaWMpXG4gKiBkZWZhdWx0IGJhc2UgZW5jb2RpbmcgYW5kIHBhcnNlZCB3aXRob3V0IGhhdmluZyB0byBzdXBwbHkgYmFzZSBlbmNvZGVycy9kZWNvZGVyczpcbiAqXG4gKiBgYGBUeXBlU2NyaXB0XG4gKiBjb25zdCB2MSA9IENJRC5wYXJzZSgnYmFnYWFpZXJhc29yZHM0bmpjdHM2dnM3cXZkamZjdmdudW1lNGhxb2hmNjV6c2ZndXBycXBoczNpY3dlYScpXG4gKiB2MS50b1N0cmluZygpXG4gKiAvLz4gJ2JhZ2FhaWVyYXNvcmRzNG5qY3RzNnZzN3F2ZGpmY3ZnbnVtZTRocW9oZjY1enNmZ3VwcnFwaHMzaWN3ZWEnXG4gKlxuICogY29uc3QgdjAgPSBDSUQucGFyc2UoJ1FtZGZUYkJxQlBRN1ZOeFpFWUVqMTRWbVJ1WkJrcUZiaXdSZW9nSmdTMXpSMW4nKVxuICogdjAudG9TdHJpbmcoKVxuICogLy8+ICdRbWRmVGJCcUJQUTdWTnhaRVlFajE0Vm1SdVpCa3FGYml3UmVvZ0pnUzF6UjFuJ1xuICogdjAudG9WMSgpLnRvU3RyaW5nKClcbiAqIC8vPiAnYmFmeWJlaWhkd2RjZWZnaDRkcWtqdjY3dXpjbXc3b2plZTZ4ZWR6ZGV0b2p1empldnRlbnhxdXZ5a3UnXG4gKiBgYGBcbiAqXG4gKiAjIyBNdWx0aWNvZGVjIEVuY29kZXJzIC8gRGVjb2RlcnMgLyBDb2RlY3NcbiAqXG4gKiBUaGlzIGxpYnJhcnkgZGVmaW5lcyBbYEJsb2NrRW5jb2RlcmAsIGBCbG9ja0RlY29kZXJgIGFuZCBgQmxvY2tDb2RlY2AgaW50ZXJmYWNlc10oaHR0cHM6Ly9naXRodWIuY29tL211bHRpZm9ybWF0cy9qcy1tdWx0aWZvcm1hdHMvYmxvYi9tYXN0ZXIvc3JjL2NvZGVjcy9pbnRlcmZhY2UudHMpLlxuICogQ29kZWMgaW1wbGVtZW50YXRpb25zIHNob3VsZCBjb25mb3JtIHRvIHRoZSBgQmxvY2tDb2RlY2AgaW50ZXJmYWNlIHdoaWNoIGltcGxlbWVudHMgYm90aCBgQmxvY2tFbmNvZGVyYCBhbmQgYEJsb2NrRGVjb2RlcmAuXG4gKiBIZXJlIGlzIGFuIGV4YW1wbGUgaW1wbGVtZW50YXRpb24gb2YgSlNPTiBgQmxvY2tDb2RlY2AuXG4gKlxuICogYGBgVHlwZVNjcmlwdFxuICogZXhwb3J0IGNvbnN0IHsgbmFtZSwgY29kZSwgZW5jb2RlLCBkZWNvZGUgfSA9IHtcbiAqICAgbmFtZTogJ2pzb24nLFxuICogICBjb2RlOiAweDAyMDAsXG4gKiAgIGVuY29kZToganNvbiA9PiBuZXcgVGV4dEVuY29kZXIoKS5lbmNvZGUoSlNPTi5zdHJpbmdpZnkoanNvbikpLFxuICogICBkZWNvZGU6IGJ5dGVzID0+IEpTT04ucGFyc2UobmV3IFRleHREZWNvZGVyKCkuZGVjb2RlKGJ5dGVzKSlcbiAqIH1cbiAqIGBgYFxuICpcbiAqICMjIE11bHRpaGFzaCBIYXNoZXJzXG4gKlxuICogVGhpcyBsaWJyYXJ5IGRlZmluZXMgW2BNdWx0aWhhc2hIYXNoZXJgIGFuZCBgTXVsdGloYXNoRGlnZXN0YCBpbnRlcmZhY2VzXShodHRwczovL2dpdGh1Yi5jb20vbXVsdGlmb3JtYXRzL2pzLW11bHRpZm9ybWF0cy9ibG9iL21hc3Rlci9zcmMvaGFzaGVzL2ludGVyZmFjZS50cykgYW5kIGNvbnZpbmllbnQgZnVuY3Rpb24gZm9yIGltcGxlbWVudGluZyB0aGVtOlxuICpcbiAqIGBgYFR5cGVTY3JpcHRcbiAqIGltcG9ydCAqIGFzIGhhc2hlciBmcm9tICdtdWx0aWZvcm1hdHMvaGFzaGVzL2hhc2hlcidcbiAqXG4gKiBjb25zdCBzaGEyNTYgPSBoYXNoZXIuZnJvbSh7XG4gKiAgIC8vIEFzIHBlciBtdWx0aWZvcm1hdHMgdGFibGVcbiAqICAgLy8gaHR0cHM6Ly9naXRodWIuY29tL211bHRpZm9ybWF0cy9tdWx0aWNvZGVjL2Jsb2IvbWFzdGVyL3RhYmxlLmNzdiNMOVxuICogICBuYW1lOiAnc2hhMi0yNTYnLFxuICogICBjb2RlOiAweDEyLFxuICpcbiAqICAgZW5jb2RlOiAoaW5wdXQpID0+IG5ldyBVaW50OEFycmF5KGNyeXB0by5jcmVhdGVIYXNoKCdzaGEyNTYnKS51cGRhdGUoaW5wdXQpLmRpZ2VzdCgpKVxuICogfSlcbiAqXG4gKiBjb25zdCBoYXNoID0gYXdhaXQgc2hhMjU2LmRpZ2VzdChqc29uLmVuY29kZSh7IGhlbGxvOiAnd29ybGQnIH0pKVxuICogQ0lELmNyZWF0ZSgxLCBqc29uLmNvZGUsIGhhc2gpXG4gKlxuICogLy8+IENJRChiYWdhYWllcmFzb3JkczRuamN0czZ2czdxdmRqZmN2Z251bWU0aHFvaGY2NXpzZmd1cHJxcGhzM2ljd2VhKVxuICogYGBgXG4gKlxuICogIyMgVHJhdmVyc2FsXG4gKlxuICogVGhpcyBsaWJyYXJ5IGNvbnRhaW5zIGhpZ2hlci1vcmRlciBmdW5jdGlvbnMgZm9yIHRyYXZlcnNpbmcgZ3JhcGhzIG9mIGRhdGEgZWFzaWx5LlxuICpcbiAqIGB3YWxrKClgIHdhbGtzIHRocm91Z2ggdGhlIGxpbmtzIGluIGVhY2ggYmxvY2sgb2YgYSBEQUcgY2FsbGluZyBhIHVzZXItc3VwcGxpZWQgbG9hZGVyIGZ1bmN0aW9uIGZvciBlYWNoIG9uZSwgaW4gZGVwdGgtZmlyc3Qgb3JkZXIgd2l0aCBubyBkdXBsaWNhdGUgYmxvY2sgdmlzaXRzLiBUaGUgbG9hZGVyIHNob3VsZCByZXR1cm4gYSBgQmxvY2tgIG9iamVjdCBhbmQgY2FuIGJlIHVzZWQgdG8gaW5zcGVjdCBhbmQgY29sbGVjdCBibG9jayBvcmRlcmluZyBmb3IgYSBmdWxsIERBRyB3YWxrLiBUaGUgbG9hZGVyIHNob3VsZCBgdGhyb3dgIG9uIGVycm9yLCBhbmQgcmV0dXJuIGBudWxsYCBpZiBhIGJsb2NrIHNob3VsZCBiZSBza2lwcGVkIGJ5IGB3YWxrKClgLlxuICpcbiAqIGBgYFR5cGVTY3JpcHRcbiAqIGltcG9ydCB7IHdhbGsgfSBmcm9tICdtdWx0aWZvcm1hdHMvdHJhdmVyc2FsJ1xuICogaW1wb3J0ICogYXMgQmxvY2sgZnJvbSAnbXVsdGlmb3JtYXRzL2Jsb2NrJ1xuICogaW1wb3J0ICogYXMgY29kZWMgZnJvbSAnbXVsdGlmb3JtYXRzL2NvZGVjcy9qc29uJ1xuICogaW1wb3J0IHsgc2hhMjU2IGFzIGhhc2hlciB9IGZyb20gJ211bHRpZm9ybWF0cy9oYXNoZXMvc2hhMidcbiAqXG4gKiAvLyBidWlsZCBhIERBRyAoYSBzaW5nbGUgYmxvY2sgZm9yIHRoaXMgc2ltcGxlIGV4YW1wbGUpXG4gKiBjb25zdCB2YWx1ZSA9IHsgaGVsbG86ICd3b3JsZCcgfVxuICogY29uc3QgYmxvY2sgPSBhd2FpdCBCbG9jay5lbmNvZGUoeyB2YWx1ZSwgY29kZWMsIGhhc2hlciB9KVxuICogY29uc3QgeyBjaWQgfSA9IGJsb2NrXG4gKiBjb25zb2xlLmxvZyhjaWQpXG4gKiAvLz4gQ0lEKGJhZ2FhaWVyYXNvcmRzNG5qY3RzNnZzN3F2ZGpmY3ZnbnVtZTRocW9oZjY1enNmZ3VwcnFwaHMzaWN3ZWEpXG4gKlxuICogLy8gY3JlYXRlIGEgbG9hZGVyIGZ1bmN0aW9uIHRoYXQgYWxzbyBjb2xsZWN0cyBDSURzIG9mIGJsb2NrcyBpblxuICogLy8gdGhlaXIgdHJhdmVyc2FsIG9yZGVyXG4gKiBjb25zdCBsb2FkID0gKGNpZCwgYmxvY2tzKSA9PiBhc3luYyAoY2lkKSA9PiB7XG4gKiAgIC8vIGZldGNoIGEgYmxvY2sgdXNpbmcgaXRzIGNpZFxuICogICAvLyBlLmcuOiBjb25zdCBibG9jayA9IGF3YWl0IGZldGNoQmxvY2tCeUNJRChjaWQpXG4gKiAgIGJsb2Nrcy5wdXNoKGNpZClcbiAqICAgcmV0dXJuIGJsb2NrXG4gKiB9XG4gKlxuICogLy8gY29sbGVjdCBibG9ja3MgaW4gdGhpcyBEQUcgc3RhcnRpbmcgZnJvbSB0aGUgcm9vdCBgY2lkYFxuICogY29uc3QgYmxvY2tzID0gW11cbiAqIGF3YWl0IHdhbGsoeyBjaWQsIGxvYWQ6IGxvYWQoY2lkLCBibG9ja3MpIH0pXG4gKlxuICogY29uc29sZS5sb2coYmxvY2tzKVxuICogLy8+IFtDSUQoYmFnYWFpZXJhc29yZHM0bmpjdHM2dnM3cXZkamZjdmdudW1lNGhxb2hmNjV6c2ZndXBycXBoczNpY3dlYSldXG4gKiBgYGBcbiAqXG4gKiAjIyBMZWdhY3kgaW50ZXJmYWNlXG4gKlxuICogW2BibG9ja2NvZGVjLXRvLWlwbGQtZm9ybWF0YF0oaHR0cHM6Ly9naXRodWIuY29tL2lwbGQvanMtYmxvY2tjb2RlYy10by1pcGxkLWZvcm1hdCkgY29udmVydHMgYSBtdWx0aWZvcm1hdHMgW2BCbG9ja0NvZGVjYF0oaHR0cHM6Ly9naXRodWIuY29tL211bHRpZm9ybWF0cy9qcy1tdWx0aWZvcm1hdHMvYmxvYi9tYXN0ZXIvc3JjL2NvZGVjcy9pbnRlcmZhY2UudHMjTDIxKSBpbnRvIGFuXG4gKiBbYGludGVyZmFjZS1pcGxkLWZvcm1hdGBdKGh0dHBzOi8vZ2l0aHViLmNvbS9pcGxkL2ludGVyZmFjZS1pcGxkLWZvcm1hdCkgZm9yIHVzZSB3aXRoIHRoZSBbYGlwbGRgXShodHRwczovL2dpdGh1Yi5jb20vaXBsZC9pcGxkKSBwYWNrYWdlLiBUaGlzIGNhbiBoZWxwIGJyaWRnZSBJUExEIGNvZGVjcyBpbXBsZW1lbnRlZCB1c2luZyB0aGUgc3RydWN0dXJlIGFuZCBpbnRlcmZhY2VzIGRlZmluZWQgaGVyZSB0byBleGlzdGluZyBjb2RlIHRoYXQgYXNzdW1lcywgb3IgcmVxdWlyZXMgYGludGVyZmFjZS1pcGxkLWZvcm1hdGAuIFRoaXMgYnJpZGdlIGFsc28gaW5jbHVkZXMgdGhlIHJlbGV2YW50IFR5cGVTY3JpcHQgZGVmaW5pdGlvbnMuXG4gKlxuICogIyMgSW1wbGVtZW50YXRpb25zXG4gKlxuICogQnkgZGVmYXVsdCwgbm8gYmFzZSBlbmNvZGluZ3MgKG90aGVyIHRoYW4gYmFzZTMyICYgYmFzZTU4YnRjKSwgaGFzaCBmdW5jdGlvbnMsXG4gKiBvciBjb2RlYyBpbXBsZW1lbnRhdGlvbnMgYXJlIGV4cG9zZWQgYnkgYG11bHRpZm9ybWF0c2AsIHlvdSBuZWVkIHRvXG4gKiBpbXBvcnQgdGhlIG9uZXMgeW91IG5lZWQgeW91cnNlbGYuXG4gKlxuICogIyMjIE11bHRpYmFzZSBjb2RlY3NcbiAqXG4gKiB8IGJhc2VzICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfCBpbXBvcnQgICAgICAgICAgICAgICAgICAgICAgfCByZXBvICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHxcbiAqIHwgLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSB8IC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSB8IC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0gfFxuICogfCBgYmFzZTE2YCAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHwgYG11bHRpZm9ybWF0cy9iYXNlcy9iYXNlMTZgIHwgW211bHRpZm9ybWF0cy9qcy1tdWx0aWZvcm1hdHNdKGh0dHBzOi8vZ2l0aHViLmNvbS9tdWx0aWZvcm1hdHMvanMtbXVsdGlmb3JtYXRzL3RyZWUvbWFzdGVyL2Jhc2VzKSB8XG4gKiB8IGBiYXNlMzJgLCBgYmFzZTMycGFkYCwgYGJhc2UzMmhleGAsIGBiYXNlMzJoZXhwYWRgLCBgYmFzZTMyemAgfCBgbXVsdGlmb3JtYXRzL2Jhc2VzL2Jhc2UzMmAgfCBbbXVsdGlmb3JtYXRzL2pzLW11bHRpZm9ybWF0c10oaHR0cHM6Ly9naXRodWIuY29tL211bHRpZm9ybWF0cy9qcy1tdWx0aWZvcm1hdHMvdHJlZS9tYXN0ZXIvYmFzZXMpIHxcbiAqIHwgYGJhc2U2NGAsIGBiYXNlNjRwYWRgLCBgYmFzZTY0dXJsYCwgYGJhc2U2NHVybHBhZGAgICAgICAgICAgICB8IGBtdWx0aWZvcm1hdHMvYmFzZXMvYmFzZTY0YCB8IFttdWx0aWZvcm1hdHMvanMtbXVsdGlmb3JtYXRzXShodHRwczovL2dpdGh1Yi5jb20vbXVsdGlmb3JtYXRzL2pzLW11bHRpZm9ybWF0cy90cmVlL21hc3Rlci9iYXNlcykgfFxuICogfCBgYmFzZTU4YnRjYCwgYGJhc2U1OGZsaWNrNGAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHwgYG11bHRpZm9ybWF0cy9iYXNlcy9iYXNlNThgIHwgW211bHRpZm9ybWF0cy9qcy1tdWx0aWZvcm1hdHNdKGh0dHBzOi8vZ2l0aHViLmNvbS9tdWx0aWZvcm1hdHMvanMtbXVsdGlmb3JtYXRzL3RyZWUvbWFzdGVyL2Jhc2VzKSB8XG4gKlxuICogT3RoZXIgKGxlc3MgdXNlZnVsKSBiYXNlcyBpbXBsZW1lbnRlZCBpbiBbbXVsdGlmb3JtYXRzL2pzLW11bHRpZm9ybWF0c10oaHR0cHM6Ly9naXRodWIuY29tL211bHRpZm9ybWF0cy9qcy1tdWx0aWZvcm1hdHMvdHJlZS9tYXN0ZXIvYmFzZXMpIGluY2x1ZGU6IGBiYXNlMmAsIGBiYXNlOGAsIGBiYXNlMTBgLCBgYmFzZTM2YCBhbmQgYGJhc2UyNTZlbW9qaWAuXG4gKlxuICogIyMjIE11bHRpaGFzaCBoYXNoZXJzXG4gKlxuICogfCBoYXNoZXMgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHwgaW1wb3J0ICAgICAgICAgICAgICAgICAgICAgICAgIHwgcmVwbyAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHxcbiAqIHwgLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSB8IC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSB8IC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSB8XG4gKiB8IGBzaGEyLTI1NmAsIGBzaGEyLTUxMmAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfCBgbXVsdGlmb3JtYXRzL2hhc2hlcy9zaGEyYCAgICAgfCBbbXVsdGlmb3JtYXRzL2pzLW11bHRpZm9ybWF0c10oaHR0cHM6Ly9naXRodWIuY29tL211bHRpZm9ybWF0cy9qcy1tdWx0aWZvcm1hdHMvdHJlZS9tYXN0ZXIvc3JjL2hhc2hlcykgICAgICAgICAgICAgfFxuICogfCBgc2hhMy0yMjRgLCBgc2hhMy0yNTZgLCBgc2hhMy0zODRgLGBzaGEzLTUxMmAsIGBzaGFrZS0xMjhgLCBgc2hha2UtMjU2YCwgYGtlY2Nhay0yMjRgLCBga2VjY2FrLTI1NmAsIGBrZWNjYWstMzg0YCwgYGtlY2Nhay01MTJgIHwgYEBtdWx0aWZvcm1hdHMvc2hhM2AgICAgICAgICAgIHwgW211bHRpZm9ybWF0cy9qcy1zaGEzXShodHRwczovL2dpdGh1Yi5jb20vbXVsdGlmb3JtYXRzL2pzLXNoYTMpICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHxcbiAqIHwgYGlkZW50aXR5YCAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB8IGBtdWx0aWZvcm1hdHMvaGFzaGVzL2lkZW50aXR5YCB8IFttdWx0aWZvcm1hdHMvanMtbXVsdGlmb3JtYXRzXShodHRwczovL2dpdGh1Yi5jb20vbXVsdGlmb3JtYXRzL2pzLW11bHRpZm9ybWF0cy90cmVlL21hc3Rlci9zcmMvaGFzaGVzL2lkZW50aXR5LmpzKSB8XG4gKiB8IGBtdXJtdXIzLTEyOGAsIGBtdXJtdXIzLTMyYCAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfCBgQG11bHRpZm9ybWF0cy9tdXJtdXIzYCAgICAgICAgfCBbbXVsdGlmb3JtYXRzL2pzLW11cm11cjNdKGh0dHBzOi8vZ2l0aHViLmNvbS9tdWx0aWZvcm1hdHMvanMtbXVybXVyMykgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfFxuICogfCBgYmxha2UyYi0qYCwgYGJsYWtlMnMtKmAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHwgYEBtdWx0aWZvcm1hdHMvYmxha2UyYCAgICAgICAgIHwgW211bHRpZm9ybWF0cy9qcy1ibGFrZTJdKGh0dHBzOi8vZ2l0aHViLmNvbS9tdWx0aWZvcm1hdHMvanMtYmxha2UyKSAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHxcbiAqXG4gKiAjIyMgSVBMRCBjb2RlY3MgKG11bHRpY29kZWMpXG4gKlxuICogfCBjb2RlYyAgICAgIHwgaW1wb3J0ICAgICAgICAgICAgICAgICAgICAgfCByZXBvICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfFxuICogfCAtLS0tLS0tLS0tIHwgLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0gfCAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0gfFxuICogfCBgcmF3YCAgICAgIHwgYG11bHRpZm9ybWF0cy9jb2RlY3MvcmF3YCAgfCBbbXVsdGlmb3JtYXRzL2pzLW11bHRpZm9ybWF0c10oaHR0cHM6Ly9naXRodWIuY29tL211bHRpZm9ybWF0cy9qcy1tdWx0aWZvcm1hdHMvdHJlZS9tYXN0ZXIvc3JjL2NvZGVjcykgfFxuICogfCBganNvbmAgICAgIHwgYG11bHRpZm9ybWF0cy9jb2RlY3MvanNvbmAgfCBbbXVsdGlmb3JtYXRzL2pzLW11bHRpZm9ybWF0c10oaHR0cHM6Ly9naXRodWIuY29tL211bHRpZm9ybWF0cy9qcy1tdWx0aWZvcm1hdHMvdHJlZS9tYXN0ZXIvc3JjL2NvZGVjcykgfFxuICogfCBgZGFnLWNib3JgIHwgYEBpcGxkL2RhZy1jYm9yYCAgICAgICAgICAgfCBbaXBsZC9qcy1kYWctY2Jvcl0oaHR0cHM6Ly9naXRodWIuY29tL2lwbGQvanMtZGFnLWNib3IpICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfFxuICogfCBgZGFnLWpzb25gIHwgYEBpcGxkL2RhZy1qc29uYCAgICAgICAgICAgfCBbaXBsZC9qcy1kYWctanNvbl0oaHR0cHM6Ly9naXRodWIuY29tL2lwbGQvanMtZGFnLWpzb24pICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfFxuICogfCBgZGFnLXBiYCAgIHwgYEBpcGxkL2RhZy1wYmAgICAgICAgICAgICAgfCBbaXBsZC9qcy1kYWctcGJdKGh0dHBzOi8vZ2l0aHViLmNvbS9pcGxkL2pzLWRhZy1wYikgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfFxuICogfCBgZGFnLWpvc2VgIHwgYGRhZy1qb3NlYCAgICAgICAgICAgICAgICAgfCBbY2VyYW1pY25ldHdvcmsvanMtZGFnLWpvc2VdKGh0dHBzOi8vZ2l0aHViLmNvbS9jZXJhbWljbmV0d29yay9qcy1kYWctam9zZSkgICAgICAgICAgICAgICAgICAgICAgICAgICAgfFxuICovXG5pbXBvcnQgKiBhcyBieXRlcyBmcm9tICcuL2J5dGVzLmpzJztcbmltcG9ydCB7IENJRCB9IGZyb20gJy4vY2lkLmpzJztcbmltcG9ydCAqIGFzIGRpZ2VzdCBmcm9tICcuL2hhc2hlcy9kaWdlc3QuanMnO1xuaW1wb3J0ICogYXMgaGFzaGVyIGZyb20gJy4vaGFzaGVzL2hhc2hlci5qcyc7XG5pbXBvcnQgKiBhcyB2YXJpbnQgZnJvbSAnLi92YXJpbnQuanMnO1xuLy8gVGhpcyB3YXkgVFMgd2lsbCBhbHNvIGV4cG9zZSBhbGwgdGhlIHR5cGVzIGZyb20gbW9kdWxlXG5leHBvcnQgKiBmcm9tICcuL2ludGVyZmFjZS5qcyc7XG5leHBvcnQgeyBDSUQsIGhhc2hlciwgZGlnZXN0LCB2YXJpbnQsIGJ5dGVzIH07XG4vLyMgc291cmNlTWFwcGluZ1VSTD1pbmRleC5qcy5tYXAiLCJpbXBvcnQgKiBhcyBiYXNlMTAgZnJvbSAnLi9iYXNlcy9iYXNlMTAuanMnO1xuaW1wb3J0ICogYXMgYmFzZTE2IGZyb20gJy4vYmFzZXMvYmFzZTE2LmpzJztcbmltcG9ydCAqIGFzIGJhc2UyIGZyb20gJy4vYmFzZXMvYmFzZTIuanMnO1xuaW1wb3J0ICogYXMgYmFzZTI1NmVtb2ppIGZyb20gJy4vYmFzZXMvYmFzZTI1NmVtb2ppLmpzJztcbmltcG9ydCAqIGFzIGJhc2UzMiBmcm9tICcuL2Jhc2VzL2Jhc2UzMi5qcyc7XG5pbXBvcnQgKiBhcyBiYXNlMzYgZnJvbSAnLi9iYXNlcy9iYXNlMzYuanMnO1xuaW1wb3J0ICogYXMgYmFzZTU4IGZyb20gJy4vYmFzZXMvYmFzZTU4LmpzJztcbmltcG9ydCAqIGFzIGJhc2U2NCBmcm9tICcuL2Jhc2VzL2Jhc2U2NC5qcyc7XG5pbXBvcnQgKiBhcyBiYXNlOCBmcm9tICcuL2Jhc2VzL2Jhc2U4LmpzJztcbmltcG9ydCAqIGFzIGlkZW50aXR5QmFzZSBmcm9tICcuL2Jhc2VzL2lkZW50aXR5LmpzJztcbmltcG9ydCAqIGFzIGpzb24gZnJvbSAnLi9jb2RlY3MvanNvbi5qcyc7XG5pbXBvcnQgKiBhcyByYXcgZnJvbSAnLi9jb2RlY3MvcmF3LmpzJztcbmltcG9ydCAqIGFzIGlkZW50aXR5IGZyb20gJy4vaGFzaGVzL2lkZW50aXR5LmpzJztcbmltcG9ydCAqIGFzIHNoYTIgZnJvbSAnLi9oYXNoZXMvc2hhMi5qcyc7XG5pbXBvcnQgeyBDSUQsIGhhc2hlciwgZGlnZXN0LCB2YXJpbnQsIGJ5dGVzIH0gZnJvbSAnLi9pbmRleC5qcyc7XG5leHBvcnQgY29uc3QgYmFzZXMgPSB7IC4uLmlkZW50aXR5QmFzZSwgLi4uYmFzZTIsIC4uLmJhc2U4LCAuLi5iYXNlMTAsIC4uLmJhc2UxNiwgLi4uYmFzZTMyLCAuLi5iYXNlMzYsIC4uLmJhc2U1OCwgLi4uYmFzZTY0LCAuLi5iYXNlMjU2ZW1vamkgfTtcbmV4cG9ydCBjb25zdCBoYXNoZXMgPSB7IC4uLnNoYTIsIC4uLmlkZW50aXR5IH07XG5leHBvcnQgY29uc3QgY29kZWNzID0geyByYXcsIGpzb24gfTtcbmV4cG9ydCB7IENJRCwgaGFzaGVyLCBkaWdlc3QsIHZhcmludCwgYnl0ZXMgfTtcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPWJhc2ljcy5qcy5tYXAiLCIvKipcbiAqIFJldHVybnMgYSBgVWludDhBcnJheWAgb2YgdGhlIHJlcXVlc3RlZCBzaXplLiBSZWZlcmVuY2VkIG1lbW9yeSB3aWxsXG4gKiBiZSBpbml0aWFsaXplZCB0byAwLlxuICovXG5leHBvcnQgZnVuY3Rpb24gYWxsb2Moc2l6ZSA9IDApIHtcbiAgICByZXR1cm4gbmV3IFVpbnQ4QXJyYXkoc2l6ZSk7XG59XG4vKipcbiAqIFdoZXJlIHBvc3NpYmxlIHJldHVybnMgYSBVaW50OEFycmF5IG9mIHRoZSByZXF1ZXN0ZWQgc2l6ZSB0aGF0IHJlZmVyZW5jZXNcbiAqIHVuaW5pdGlhbGl6ZWQgbWVtb3J5LiBPbmx5IHVzZSBpZiB5b3UgYXJlIGNlcnRhaW4geW91IHdpbGwgaW1tZWRpYXRlbHlcbiAqIG92ZXJ3cml0ZSBldmVyeSB2YWx1ZSBpbiB0aGUgcmV0dXJuZWQgYFVpbnQ4QXJyYXlgLlxuICovXG5leHBvcnQgZnVuY3Rpb24gYWxsb2NVbnNhZmUoc2l6ZSA9IDApIHtcbiAgICByZXR1cm4gbmV3IFVpbnQ4QXJyYXkoc2l6ZSk7XG59XG4vLyMgc291cmNlTWFwcGluZ1VSTD1hbGxvYy5qcy5tYXAiLCJpbXBvcnQgeyBiYXNlcyB9IGZyb20gJ211bHRpZm9ybWF0cy9iYXNpY3MnO1xuaW1wb3J0IHsgYWxsb2NVbnNhZmUgfSBmcm9tICcjYWxsb2MnO1xuZnVuY3Rpb24gY3JlYXRlQ29kZWMobmFtZSwgcHJlZml4LCBlbmNvZGUsIGRlY29kZSkge1xuICAgIHJldHVybiB7XG4gICAgICAgIG5hbWUsXG4gICAgICAgIHByZWZpeCxcbiAgICAgICAgZW5jb2Rlcjoge1xuICAgICAgICAgICAgbmFtZSxcbiAgICAgICAgICAgIHByZWZpeCxcbiAgICAgICAgICAgIGVuY29kZVxuICAgICAgICB9LFxuICAgICAgICBkZWNvZGVyOiB7XG4gICAgICAgICAgICBkZWNvZGVcbiAgICAgICAgfVxuICAgIH07XG59XG5jb25zdCBzdHJpbmcgPSBjcmVhdGVDb2RlYygndXRmOCcsICd1JywgKGJ1ZikgPT4ge1xuICAgIGNvbnN0IGRlY29kZXIgPSBuZXcgVGV4dERlY29kZXIoJ3V0ZjgnKTtcbiAgICByZXR1cm4gJ3UnICsgZGVjb2Rlci5kZWNvZGUoYnVmKTtcbn0sIChzdHIpID0+IHtcbiAgICBjb25zdCBlbmNvZGVyID0gbmV3IFRleHRFbmNvZGVyKCk7XG4gICAgcmV0dXJuIGVuY29kZXIuZW5jb2RlKHN0ci5zdWJzdHJpbmcoMSkpO1xufSk7XG5jb25zdCBhc2NpaSA9IGNyZWF0ZUNvZGVjKCdhc2NpaScsICdhJywgKGJ1ZikgPT4ge1xuICAgIGxldCBzdHJpbmcgPSAnYSc7XG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCBidWYubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgc3RyaW5nICs9IFN0cmluZy5mcm9tQ2hhckNvZGUoYnVmW2ldKTtcbiAgICB9XG4gICAgcmV0dXJuIHN0cmluZztcbn0sIChzdHIpID0+IHtcbiAgICBzdHIgPSBzdHIuc3Vic3RyaW5nKDEpO1xuICAgIGNvbnN0IGJ1ZiA9IGFsbG9jVW5zYWZlKHN0ci5sZW5ndGgpO1xuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgc3RyLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgIGJ1ZltpXSA9IHN0ci5jaGFyQ29kZUF0KGkpO1xuICAgIH1cbiAgICByZXR1cm4gYnVmO1xufSk7XG5jb25zdCBCQVNFUyA9IHtcbiAgICB1dGY4OiBzdHJpbmcsXG4gICAgJ3V0Zi04Jzogc3RyaW5nLFxuICAgIGhleDogYmFzZXMuYmFzZTE2LFxuICAgIGxhdGluMTogYXNjaWksXG4gICAgYXNjaWksXG4gICAgYmluYXJ5OiBhc2NpaSxcbiAgICAuLi5iYXNlc1xufTtcbmV4cG9ydCBkZWZhdWx0IEJBU0VTO1xuLy8jIHNvdXJjZU1hcHBpbmdVUkw9YmFzZXMuanMubWFwIiwiaW1wb3J0IGJhc2VzLCB7fSBmcm9tICcuL3V0aWwvYmFzZXMuanMnO1xuLyoqXG4gKiBDcmVhdGUgYSBgVWludDhBcnJheWAgZnJvbSB0aGUgcGFzc2VkIHN0cmluZ1xuICpcbiAqIFN1cHBvcnRzIGB1dGY4YCwgYHV0Zi04YCwgYGhleGAsIGFuZCBhbnkgZW5jb2Rpbmcgc3VwcG9ydGVkIGJ5IHRoZSBtdWx0aWZvcm1hdHMgbW9kdWxlLlxuICpcbiAqIEFsc28gYGFzY2lpYCB3aGljaCBpcyBzaW1pbGFyIHRvIG5vZGUncyAnYmluYXJ5JyBlbmNvZGluZy5cbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGZyb21TdHJpbmcoc3RyaW5nLCBlbmNvZGluZyA9ICd1dGY4Jykge1xuICAgIGNvbnN0IGJhc2UgPSBiYXNlc1tlbmNvZGluZ107XG4gICAgaWYgKGJhc2UgPT0gbnVsbCkge1xuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoYFVuc3VwcG9ydGVkIGVuY29kaW5nIFwiJHtlbmNvZGluZ31cImApO1xuICAgIH1cbiAgICAvLyBhZGQgbXVsdGliYXNlIHByZWZpeFxuICAgIHJldHVybiBiYXNlLmRlY29kZXIuZGVjb2RlKGAke2Jhc2UucHJlZml4fSR7c3RyaW5nfWApOyAvLyBlc2xpbnQtZGlzYWJsZS1saW5lIEB0eXBlc2NyaXB0LWVzbGludC9yZXN0cmljdC10ZW1wbGF0ZS1leHByZXNzaW9uc1xufVxuLy8jIHNvdXJjZU1hcHBpbmdVUkw9ZnJvbS1zdHJpbmcuanMubWFwIiwiaW1wb3J0IGJhc2VzLCB7fSBmcm9tICcuL3V0aWwvYmFzZXMuanMnO1xuLyoqXG4gKiBUdXJucyBhIGBVaW50OEFycmF5YCBpbnRvIGEgc3RyaW5nLlxuICpcbiAqIFN1cHBvcnRzIGB1dGY4YCwgYHV0Zi04YCBhbmQgYW55IGVuY29kaW5nIHN1cHBvcnRlZCBieSB0aGUgbXVsdGliYXNlIG1vZHVsZS5cbiAqXG4gKiBBbHNvIGBhc2NpaWAgd2hpY2ggaXMgc2ltaWxhciB0byBub2RlJ3MgJ2JpbmFyeScgZW5jb2RpbmcuXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiB0b1N0cmluZyhhcnJheSwgZW5jb2RpbmcgPSAndXRmOCcpIHtcbiAgICBjb25zdCBiYXNlID0gYmFzZXNbZW5jb2RpbmddO1xuICAgIGlmIChiYXNlID09IG51bGwpIHtcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKGBVbnN1cHBvcnRlZCBlbmNvZGluZyBcIiR7ZW5jb2Rpbmd9XCJgKTtcbiAgICB9XG4gICAgLy8gc3RyaXAgbXVsdGliYXNlIHByZWZpeFxuICAgIHJldHVybiBiYXNlLmVuY29kZXIuZW5jb2RlKGFycmF5KS5zdWJzdHJpbmcoMSk7XG59XG4vLyMgc291cmNlTWFwcGluZ1VSTD10by1zdHJpbmcuanMubWFwIiwiLyoqXG4gKiBAcGFja2FnZURvY3VtZW50YXRpb25cbiAqXG4gKiBgVWludDhBcnJheWBzIGJyaW5nIG1lbW9yeS1lZmZpY2llbnQoaXNoKSBieXRlIGhhbmRsaW5nIHRvIGJyb3dzZXJzIC0gdGhleSBhcmUgc2ltaWxhciB0byBOb2RlLmpzIGBCdWZmZXJgcyBidXQgbGFjayBhIGxvdCBvZiB0aGUgdXRpbGl0eSBtZXRob2RzIHByZXNlbnQgb24gdGhhdCBjbGFzcy5cbiAqXG4gKiBUaGlzIG1vZHVsZSBleHBvcnRzIGEgbnVtYmVyIG9mIGZ1bmN0aW9uIHRoYXQgbGV0IHlvdSBkbyBjb21tb24gb3BlcmF0aW9ucyAtIGpvaW5pbmcgVWludDhBcnJheXMgdG9nZXRoZXIsIHNlZWluZyBpZiB0aGV5IGhhdmUgdGhlIHNhbWUgY29udGVudHMgZXRjLlxuICpcbiAqIFNpbmNlIE5vZGUuanMgYEJ1ZmZlcmBzIGFyZSBhbHNvIGBVaW50OEFycmF5YHMsIGl0IGZhbGxzIGJhY2sgdG8gYEJ1ZmZlcmAgaW50ZXJuYWxseSB3aGVyZSBpdCBtYWtlcyBzZW5zZSBmb3IgcGVyZm9ybWFuY2UgcmVhc29ucy5cbiAqXG4gKiAjIyBhbGxvYyhzaXplKVxuICpcbiAqIENyZWF0ZSBhIG5ldyBgVWludDhBcnJheWAuIFdoZW4gcnVubmluZyB1bmRlciBOb2RlLmpzLCBgQnVmZmVyYCB3aWxsIGJlIHVzZWQgaW4gcHJlZmVyZW5jZSB0byBgVWludDhBcnJheWAuXG4gKlxuICogIyMjIEV4YW1wbGVcbiAqXG4gKiBgYGBqc1xuICogaW1wb3J0IHsgYWxsb2MgfSBmcm9tICd1aW50OGFycmF5cy9hbGxvYydcbiAqXG4gKiBjb25zdCBidWYgPSBhbGxvYygxMDApXG4gKiBgYGBcbiAqXG4gKiAjIyBhbGxvY1Vuc2FmZShzaXplKVxuICpcbiAqIENyZWF0ZSBhIG5ldyBgVWludDhBcnJheWAuIFdoZW4gcnVubmluZyB1bmRlciBOb2RlLmpzLCBgQnVmZmVyYCB3aWxsIGJlIHVzZWQgaW4gcHJlZmVyZW5jZSB0byBgVWludDhBcnJheWAuXG4gKlxuICogT24gcGxhdGZvcm1zIHRoYXQgc3VwcG9ydCBpdCwgbWVtb3J5IHJlZmVyZW5jZWQgYnkgdGhlIHJldHVybmVkIGBVaW50OEFycmF5YCB3aWxsIG5vdCBiZSBpbml0aWFsaXplZC5cbiAqXG4gKiAjIyMgRXhhbXBsZVxuICpcbiAqIGBgYGpzXG4gKiBpbXBvcnQgeyBhbGxvY1Vuc2FmZSB9IGZyb20gJ3VpbnQ4YXJyYXlzL2FsbG9jJ1xuICpcbiAqIGNvbnN0IGJ1ZiA9IGFsbG9jVW5zYWZlKDEwMClcbiAqIGBgYFxuICpcbiAqICMjIGNvbXBhcmUoYSwgYilcbiAqXG4gKiBDb21wYXJlIHR3byBgVWludDhBcnJheXNgXG4gKlxuICogIyMjIEV4YW1wbGVcbiAqXG4gKiBgYGBqc1xuICogaW1wb3J0IHsgY29tcGFyZSB9IGZyb20gJ3VpbnQ4YXJyYXlzL2NvbXBhcmUnXG4gKlxuICogY29uc3QgYXJyYXlzID0gW1xuICogICBVaW50OEFycmF5LmZyb20oWzMsIDQsIDVdKSxcbiAqICAgVWludDhBcnJheS5mcm9tKFswLCAxLCAyXSlcbiAqIF1cbiAqXG4gKiBjb25zdCBzb3J0ZWQgPSBhcnJheXMuc29ydChjb21wYXJlKVxuICpcbiAqIGNvbnNvbGUuaW5mbyhzb3J0ZWQpXG4gKiAvLyBbXG4gKiAvLyAgICBVaW50OEFycmF5WzAsIDEsIDJdXG4gKiAvLyAgICBVaW50OEFycmF5WzMsIDQsIDVdXG4gKiAvLyBdXG4gKiBgYGBcbiAqXG4gKiAjIyBjb25jYXQoYXJyYXlzLCBcXFtsZW5ndGhdKVxuICpcbiAqIENvbmNhdGVuYXRlIG9uZSBvciBtb3JlIGBVaW50OEFycmF5YHMgYW5kIHJldHVybiBhIGBVaW50OEFycmF5YCB3aXRoIHRoZWlyIGNvbnRlbnRzLlxuICpcbiAqIElmIHlvdSBrbm93IHRoZSBsZW5ndGggb2YgdGhlIGFycmF5cywgcGFzcyBpdCBhcyBhIHNlY29uZCBwYXJhbWV0ZXIsIG90aGVyd2lzZSBpdCB3aWxsIGJlIGNhbGN1bGF0ZWQgYnkgdHJhdmVyc2luZyB0aGUgbGlzdCBvZiBhcnJheXMuXG4gKlxuICogIyMjIEV4YW1wbGVcbiAqXG4gKiBgYGBqc1xuICogaW1wb3J0IHsgY29uY2F0IH0gZnJvbSAndWludDhhcnJheXMvY29uY2F0J1xuICpcbiAqIGNvbnN0IGFycmF5cyA9IFtcbiAqICAgVWludDhBcnJheS5mcm9tKFswLCAxLCAyXSksXG4gKiAgIFVpbnQ4QXJyYXkuZnJvbShbMywgNCwgNV0pXG4gKiBdXG4gKlxuICogY29uc3QgYWxsID0gY29uY2F0KGFycmF5cywgNilcbiAqXG4gKiBjb25zb2xlLmluZm8oYWxsKVxuICogLy8gVWludDhBcnJheVswLCAxLCAyLCAzLCA0LCA1XVxuICogYGBgXG4gKlxuICogIyMgZXF1YWxzKGEsIGIpXG4gKlxuICogUmV0dXJucyB0cnVlIGlmIHRoZSB0d28gYXJyYXlzIGFyZSB0aGUgc2FtZSBhcnJheSBvciBpZiB0aGV5IGhhdmUgdGhlIHNhbWUgbGVuZ3RoIGFuZCBjb250ZW50cy5cbiAqXG4gKiAjIyMgRXhhbXBsZVxuICpcbiAqIGBgYGpzXG4gKiBpbXBvcnQgeyBlcXVhbHMgfSBmcm9tICd1aW50OGFycmF5cy9lcXVhbHMnXG4gKlxuICogY29uc3QgYSA9IFVpbnQ4QXJyYXkuZnJvbShbMCwgMSwgMl0pXG4gKiBjb25zdCBiID0gVWludDhBcnJheS5mcm9tKFszLCA0LCA1XSlcbiAqIGNvbnN0IGMgPSBVaW50OEFycmF5LmZyb20oWzAsIDEsIDJdKVxuICpcbiAqIGNvbnNvbGUuaW5mbyhlcXVhbHMoYSwgYikpIC8vIGZhbHNlXG4gKiBjb25zb2xlLmluZm8oZXF1YWxzKGEsIGMpKSAvLyB0cnVlXG4gKiBjb25zb2xlLmluZm8oZXF1YWxzKGEsIGEpKSAvLyB0cnVlXG4gKiBgYGBcbiAqXG4gKiAjIyBmcm9tU3RyaW5nKHN0cmluZywgZW5jb2RpbmcgPSAndXRmOCcpXG4gKlxuICogUmV0dXJucyBhIG5ldyBgVWludDhBcnJheWAgY3JlYXRlZCBmcm9tIHRoZSBwYXNzZWQgc3RyaW5nIGFuZCBpbnRlcnByZXRlZCBhcyB0aGUgcGFzc2VkIGVuY29kaW5nLlxuICpcbiAqIFN1cHBvcnRzIGB1dGY4YCBhbmQgYW55IG9mIHRoZSBbbXVsdGliYXNlIGVuY29kaW5nc10oaHR0cHM6Ly9naXRodWIuY29tL211bHRpZm9ybWF0cy9tdWx0aWJhc2UvYmxvYi9tYXN0ZXIvbXVsdGliYXNlLmNzdikgYXMgaW1wbGVtZW50ZWQgYnkgdGhlIFttdWx0aWZvcm1hdHMgbW9kdWxlXShodHRwczovL3d3dy5ucG1qcy5jb20vcGFja2FnZS9tdWx0aWZvcm1hdHMpLlxuICpcbiAqICMjIyBFeGFtcGxlXG4gKlxuICogYGBganNcbiAqIGltcG9ydCB7IGZyb21TdHJpbmcgfSBmcm9tICd1aW50OGFycmF5cy9mcm9tLXN0cmluZydcbiAqXG4gKiBjb25zb2xlLmluZm8oZnJvbVN0cmluZygnaGVsbG8gd29ybGQnKSkgLy8gVWludDhBcnJheVsxMDQsIDEwMSAuLi5cbiAqIGNvbnNvbGUuaW5mbyhmcm9tU3RyaW5nKCcwMDAxMDIwM2FhYmJjYycsICdiYXNlMTYnKSkgLy8gVWludDhBcnJheVswLCAxIC4uLlxuICogY29uc29sZS5pbmZvKGZyb21TdHJpbmcoJ0FBRUNBNnE3ekEnLCAnYmFzZTY0JykpIC8vIFVpbnQ4QXJyYXlbMCwgMSAuLi5cbiAqIGNvbnNvbGUuaW5mbyhmcm9tU3RyaW5nKCcwMTIzNCcsICdhc2NpaScpKSAvLyBVaW50OEFycmF5WzQ4LCA0OSAuLi5cbiAqIGBgYFxuICpcbiAqICMjIHRvU3RyaW5nKGFycmF5LCBlbmNvZGluZyA9ICd1dGY4JylcbiAqXG4gKiBSZXR1cm5zIGEgc3RyaW5nIGNyZWF0ZWQgZnJvbSB0aGUgcGFzc2VkIGBVaW50OEFycmF5YCBpbiB0aGUgcGFzc2VkIGVuY29kaW5nLlxuICpcbiAqIFN1cHBvcnRzIGB1dGY4YCBhbmQgYW55IG9mIHRoZSBbbXVsdGliYXNlIGVuY29kaW5nc10oaHR0cHM6Ly9naXRodWIuY29tL211bHRpZm9ybWF0cy9tdWx0aWJhc2UvYmxvYi9tYXN0ZXIvbXVsdGliYXNlLmNzdikgYXMgaW1wbGVtZW50ZWQgYnkgdGhlIFttdWx0aWZvcm1hdHMgbW9kdWxlXShodHRwczovL3d3dy5ucG1qcy5jb20vcGFja2FnZS9tdWx0aWZvcm1hdHMpLlxuICpcbiAqICMjIyBFeGFtcGxlXG4gKlxuICogYGBganNcbiAqIGltcG9ydCB7IHRvU3RyaW5nIH0gZnJvbSAndWludDhhcnJheXMvdG8tc3RyaW5nJ1xuICpcbiAqIGNvbnNvbGUuaW5mbyh0b1N0cmluZyhVaW50OEFycmF5LmZyb20oWzEwNCwgMTAxLi4uXSkpKSAvLyAnaGVsbG8gd29ybGQnXG4gKiBjb25zb2xlLmluZm8odG9TdHJpbmcoVWludDhBcnJheS5mcm9tKFswLCAxLCAyLi4uXSksICdiYXNlMTYnKSkgLy8gJzAwMDEwMjAzYWFiYmNjJ1xuICogY29uc29sZS5pbmZvKHRvU3RyaW5nKFVpbnQ4QXJyYXkuZnJvbShbMCwgMSwgMi4uLl0pLCAnYmFzZTY0JykpIC8vICdBQUVDQTZxN3pBJ1xuICogY29uc29sZS5pbmZvKHRvU3RyaW5nKFVpbnQ4QXJyYXkuZnJvbShbNDgsIDQ5LCA1MC4uLl0pLCAnYXNjaWknKSkgLy8gJzAxMjM0J1xuICogYGBgXG4gKlxuICogIyMgeG9yKGEsIGIpXG4gKlxuICogUmV0dXJucyBhIGBVaW50OEFycmF5YCBjb250YWluaW5nIGBhYCBhbmQgYGJgIHhvcmVkIHRvZ2V0aGVyLlxuICpcbiAqICMjIyBFeGFtcGxlXG4gKlxuICogYGBganNcbiAqIGltcG9ydCB7IHhvciB9IGZyb20gJ3VpbnQ4YXJyYXlzL3hvcidcbiAqXG4gKiBjb25zb2xlLmluZm8oeG9yKFVpbnQ4QXJyYXkuZnJvbShbMSwgMF0pLCBVaW50OEFycmF5LmZyb20oWzAsIDFdKSkpIC8vIFVpbnQ4QXJyYXlbMSwgMV1cbiAqIGBgYFxuICpcbiAqICMjIHhvckNvbXBhcmUoYSwgYilcbiAqXG4gKiBDb21wYXJlcyB0aGUgZGlzdGFuY2VzIGJldHdlZW4gdHdvIHhvciBgVWludDhBcnJheWBzLlxuICpcbiAqICMjIyBFeGFtcGxlXG4gKlxuICogYGBgdHNcbiAqIGltcG9ydCB7IHhvciB9IGZyb20gJ3VpbnQ4YXJyYXlzL3hvcidcbiAqIGltcG9ydCB7IHhvckNvbXBhcmUgfSBmcm9tICd1aW50OGFycmF5cy94b3ItY29tcGFyZSdcbiAqXG4gKiBjb25zdCB0YXJnZXQgPSBVaW50OEFycmF5LmZyb20oWzEsIDFdKVxuICogY29uc3QgdmFsMSA9IFVpbnQ4QXJyYXkuZnJvbShbMSwgMF0pXG4gKiBjb25zdCB4b3IxID0geG9yKHRhcmdldCwgdmFsMSlcbiAqXG4gKiBjb25zdCB2YWwyID0gVWludDhBcnJheS5mcm9tKFswLCAxXSlcbiAqIGNvbnN0IHhvcjIgPSB4b3IodGFyZ2V0LCB2YWwyKVxuICpcbiAqIGNvbnNvbGUuaW5mbyh4b3JDb21wYXJlKHhvcjEsIHhvcjIpKSAvLyAtMSBvciAwIG9yIDFcbiAqIGBgYFxuICovXG5pbXBvcnQgeyBlcXVhbHMgfSBmcm9tICcuL2VxdWFscy5qcyc7XG5pbXBvcnQgeyB4b3IgfSBmcm9tICcuL3hvci5qcyc7XG5pbXBvcnQgeyBjb21wYXJlIH0gZnJvbSAnI2NvbXBhcmUnO1xuaW1wb3J0IHsgY29uY2F0IH0gZnJvbSAnI2NvbmNhdCc7XG5pbXBvcnQgeyBmcm9tU3RyaW5nIH0gZnJvbSAnI2Zyb20tc3RyaW5nJztcbmltcG9ydCB7IHRvU3RyaW5nIH0gZnJvbSAnI3RvLXN0cmluZyc7XG5leHBvcnQgeyBjb21wYXJlLCBjb25jYXQsIGVxdWFscywgZnJvbVN0cmluZywgdG9TdHJpbmcsIHhvciB9O1xuLy8jIHNvdXJjZU1hcHBpbmdVUkw9aW5kZXguanMubWFwIiwiLy8gaHR0cHM6Ly9ibG9nLmVsYW50aGEuY29tL2VuY3J5cHQtaW4tdGhlLWJyb3dzZXIvXHJcblxyXG5leHBvcnQgYXN5bmMgZnVuY3Rpb24gZW5jcnlwdERhdGEoY29udGVudDogc3RyaW5nLCBwYXNzd29yZDogc3RyaW5nKSB7XHJcbiAgICBjb25zdCBzYWx0ID0gY3J5cHRvLmdldFJhbmRvbVZhbHVlcyhuZXcgVWludDhBcnJheSgxNikpO1xyXG5cclxuICAgIGNvbnN0IGtleSA9IGF3YWl0IGdldEtleShwYXNzd29yZCwgc2FsdCk7XHJcblxyXG4gICAgY29uc3QgaXYgPSBjcnlwdG8uZ2V0UmFuZG9tVmFsdWVzKG5ldyBVaW50OEFycmF5KDEyKSk7XHJcblxyXG4gICAgY29uc3QgY29udGVudEJ5dGVzID0gc3RyaW5nVG9CeXRlcyhjb250ZW50KTtcclxuXHJcbiAgICBjb25zdCBjaXBoZXIgPSBuZXcgVWludDhBcnJheShcclxuICAgICAgICBhd2FpdCBjcnlwdG8uc3VidGxlLmVuY3J5cHQoeyBuYW1lOiBcIkFFUy1HQ01cIiwgaXYgfSwga2V5LCBjb250ZW50Qnl0ZXMpXHJcbiAgICApO1xyXG5cclxuICAgIHJldHVybiB7XHJcbiAgICAgICAgc2FsdDogYnl0ZXNUb0Jhc2U2NChzYWx0KSxcclxuICAgICAgICBpdjogYnl0ZXNUb0Jhc2U2NChpdiksXHJcbiAgICAgICAgY2lwaGVyOiBieXRlc1RvQmFzZTY0KGNpcGhlciksXHJcbiAgICB9O1xyXG59XHJcblxyXG5leHBvcnQgYXN5bmMgZnVuY3Rpb24gZGVjcnlwdERhdGEoZW5jcnlwdGVkRGF0YTogeyBzYWx0OiBzdHJpbmcsIGl2OiBzdHJpbmcsIGNpcGhlcjogc3RyaW5nIH0sIHBhc3N3b3JkOiBzdHJpbmcpIHtcclxuICAgIGNvbnN0IHNhbHQgPSBiYXNlNjRUb0J5dGVzKGVuY3J5cHRlZERhdGEuc2FsdCk7XHJcblxyXG4gICAgY29uc3Qga2V5ID0gYXdhaXQgZ2V0S2V5KHBhc3N3b3JkLCBzYWx0KTtcclxuXHJcbiAgICBjb25zdCBpdiA9IGJhc2U2NFRvQnl0ZXMoZW5jcnlwdGVkRGF0YS5pdik7XHJcblxyXG4gICAgY29uc3QgY2lwaGVyID0gYmFzZTY0VG9CeXRlcyhlbmNyeXB0ZWREYXRhLmNpcGhlcik7XHJcblxyXG4gICAgY29uc3QgY29udGVudEJ5dGVzID0gbmV3IFVpbnQ4QXJyYXkoXHJcbiAgICAgICAgYXdhaXQgY3J5cHRvLnN1YnRsZS5kZWNyeXB0KHsgbmFtZTogXCJBRVMtR0NNXCIsIGl2IH0sIGtleSwgY2lwaGVyKVxyXG4gICAgKTtcclxuXHJcbiAgICByZXR1cm4gYnl0ZXNUb1N0cmluZyhjb250ZW50Qnl0ZXMpO1xyXG59XHJcblxyXG5hc3luYyBmdW5jdGlvbiBnZXRLZXkocGFzc3dvcmQ6IHN0cmluZywgc2FsdDogVWludDhBcnJheSkge1xyXG4gICAgY29uc3QgcGFzc3dvcmRCeXRlcyA9IHN0cmluZ1RvQnl0ZXMocGFzc3dvcmQpO1xyXG5cclxuICAgIGNvbnN0IGluaXRpYWxLZXkgPSBhd2FpdCBjcnlwdG8uc3VidGxlLmltcG9ydEtleShcclxuICAgICAgICBcInJhd1wiLFxyXG4gICAgICAgIHBhc3N3b3JkQnl0ZXMsXHJcbiAgICAgICAgeyBuYW1lOiBcIlBCS0RGMlwiIH0sXHJcbiAgICAgICAgZmFsc2UsXHJcbiAgICAgICAgW1wiZGVyaXZlS2V5XCJdXHJcbiAgICApO1xyXG5cclxuICAgIHJldHVybiBjcnlwdG8uc3VidGxlLmRlcml2ZUtleShcclxuICAgICAgICB7IG5hbWU6IFwiUEJLREYyXCIsIHNhbHQsIGl0ZXJhdGlvbnM6IDIwMDAwMCwgaGFzaDogXCJTSEEtMjU2XCIgfSxcclxuICAgICAgICBpbml0aWFsS2V5LFxyXG4gICAgICAgIHsgbmFtZTogXCJBRVMtR0NNXCIsIGxlbmd0aDogMjU2IH0sXHJcbiAgICAgICAgZmFsc2UsXHJcbiAgICAgICAgW1wiZW5jcnlwdFwiLCBcImRlY3J5cHRcIl1cclxuICAgICk7XHJcbn1cclxuXHJcbi8vIGNvbnZlcnNpb24gaGVscGVyc1xyXG5cclxuZnVuY3Rpb24gYnl0ZXNUb1N0cmluZyhieXRlczogVWludDhBcnJheSkge1xyXG4gICAgcmV0dXJuIG5ldyBUZXh0RGVjb2RlcigpLmRlY29kZShieXRlcyk7XHJcbn1cclxuXHJcbmZ1bmN0aW9uIHN0cmluZ1RvQnl0ZXMoc3RyOiBzdHJpbmcpIHtcclxuICAgIHJldHVybiBuZXcgVGV4dEVuY29kZXIoKS5lbmNvZGUoc3RyKTtcclxufVxyXG5cclxuaW1wb3J0IHsgdG9TdHJpbmcgYXMgdWk4VG9TdHJpbmcsIGZyb21TdHJpbmcgYXMgdWk4RnJvbVN0cmluZyB9IGZyb20gXCJ1aW50OGFycmF5c1wiO1xyXG5cclxuZnVuY3Rpb24gYnl0ZXNUb0Jhc2U2NChhcnI6IFVpbnQ4QXJyYXkpIHtcclxuICAgIHJldHVybiB1aThUb1N0cmluZyhhcnIsICdiYXNlNjQnKTtcclxufVxyXG5cclxuZnVuY3Rpb24gYmFzZTY0VG9CeXRlcyhiYXNlNjQ6IHN0cmluZykge1xyXG4gICAgcmV0dXJuIHVpOEZyb21TdHJpbmcoYmFzZTY0LCAnYmFzZTY0Jyk7XHJcbn0iLCJjb25zdCBTMzJfQ0hBUiA9ICcyMzQ1NjdhYmNkZWZnaGlqa2xtbm9wcXJzdHV2d3h5eic7XG5leHBvcnQgY29uc3QgczMyZW5jb2RlID0gKGkpID0+IHtcbiAgICBsZXQgcyA9ICcnO1xuICAgIHdoaWxlIChpKSB7XG4gICAgICAgIGNvbnN0IGMgPSBpICUgMzI7XG4gICAgICAgIGkgPSBNYXRoLmZsb29yKGkgLyAzMik7XG4gICAgICAgIHMgPSBTMzJfQ0hBUi5jaGFyQXQoYykgKyBzO1xuICAgIH1cbiAgICByZXR1cm4gcztcbn07XG5leHBvcnQgY29uc3QgczMyZGVjb2RlID0gKHMpID0+IHtcbiAgICBsZXQgaSA9IDA7XG4gICAgZm9yIChjb25zdCBjIG9mIHMpIHtcbiAgICAgICAgaSA9IGkgKiAzMiArIFMzMl9DSEFSLmluZGV4T2YoYyk7XG4gICAgfVxuICAgIHJldHVybiBpO1xufTtcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPXMzMi5qcy5tYXAiLCJpbXBvcnQgeyBzMzJkZWNvZGUsIHMzMmVuY29kZSB9IGZyb20gJy4vczMyLmpzJztcbmxldCBsYXN0VGltZXN0YW1wID0gMDtcbmNvbnN0IFRJRF9SRSA9IC9eWzIzNDU2N2FiY2RlZmdoaWpdWzIzNDU2N2FiY2RlZmdoaWprbG1ub3BxcnN0dXZ3eHl6XXsxMn0kLztcbi8qKlxuICogQ3JlYXRlcyBhIFRJRCBiYXNlZCBvZmYgcHJvdmlkZWQgdGltZXN0YW1wIGFuZCBjbG9ja2lkLCB3aXRoIG5vIHZhbGlkYXRpb24uXG4gKi9cbmV4cG9ydCBjb25zdCBjcmVhdGVSYXcgPSAodGltZXN0YW1wLCBjbG9ja2lkKSA9PiB7XG4gICAgcmV0dXJuIHMzMmVuY29kZSh0aW1lc3RhbXApLnBhZFN0YXJ0KDExLCAnMicpICsgczMyZW5jb2RlKGNsb2NraWQpLnBhZFN0YXJ0KDIsICcyJyk7XG59O1xuLyoqXG4gKiBDcmVhdGVzIGEgVElEIGJhc2VkIG9mZiBwcm92aWRlZCB0aW1lc3RhbXAgYW5kIGNsb2NraWRcbiAqL1xuZXhwb3J0IGNvbnN0IGNyZWF0ZSA9ICh0aW1lc3RhbXAsIGNsb2NraWQpID0+IHtcbiAgICBpZiAodGltZXN0YW1wIDwgMCB8fCAhTnVtYmVyLmlzU2FmZUludGVnZXIodGltZXN0YW1wKSkge1xuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoYGludmFsaWQgdGltZXN0YW1wYCk7XG4gICAgfVxuICAgIGlmIChjbG9ja2lkIDwgMCB8fCBjbG9ja2lkID4gMTAyMykge1xuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoYGludmFsaWQgY2xvY2tpZGApO1xuICAgIH1cbiAgICByZXR1cm4gY3JlYXRlUmF3KHRpbWVzdGFtcCwgY2xvY2tpZCk7XG59O1xuLyoqXG4gKiBSZXR1cm4gYSBUSUQgYmFzZWQgb24gY3VycmVudCB0aW1lXG4gKi9cbmV4cG9ydCBjb25zdCBub3cgPSAoKSA9PiB7XG4gICAgLy8gd2UgbmVlZCB0aGVzZSB0d28gYXNwZWN0cywgd2hpY2ggRGF0ZS5ub3coKSBkb2Vzbid0IHByb3ZpZGU6XG4gICAgLy8gLSBtb25vdG9uaWNhbGx5IGluY3JlYXNpbmcgdGltZVxuICAgIC8vIC0gbWljcm9zZWNvbmQgcHJlY2lzaW9uXG4gICAgLy8gd2hpbGUgYHBlcmZvcm1hbmNlLnRpbWVPcmlnaW4gKyBwZXJmb3JtYW5jZS5ub3coKWAgY291bGQgYmUgdXNlZCBoZXJlLCB0aGV5XG4gICAgLy8gc2VlbSB0byBoYXZlIGNyb3NzLWJyb3dzZXIgZGlmZmVyZW5jZXMsIG5vdCBzdXJlIG9uIHRoYXQgeWV0LlxuICAgIGxldCB0aW1lc3RhbXAgPSBNYXRoLm1heChEYXRlLm5vdygpICogMV8wMDAsIGxhc3RUaW1lc3RhbXApO1xuICAgIGxhc3RUaW1lc3RhbXAgPSB0aW1lc3RhbXAgKyAxO1xuICAgIHJldHVybiBjcmVhdGVSYXcodGltZXN0YW1wLCBNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiAxMDIzKSk7XG59O1xuLyoqXG4gKiBQYXJzZXMgYSBUSUQsIHRocm93cyBvbiBpbnZhbGlkIHN0cmluZ3MuXG4gKi9cbmV4cG9ydCBjb25zdCBwYXJzZSA9ICh0aWQpID0+IHtcbiAgICBpZiAoIXZhbGlkYXRlKHRpZCkpIHtcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKGBpbnZhbGlkIFRJRGApO1xuICAgIH1cbiAgICBjb25zdCB0aW1lc3RhbXAgPSBzMzJkZWNvZGUodGlkLnNsaWNlKDAsIDExKSk7XG4gICAgY29uc3QgY2xvY2tpZCA9IHMzMmRlY29kZSh0aWQuc2xpY2UoMTEsIDEzKSk7XG4gICAgcmV0dXJuIHsgdGltZXN0YW1wOiB0aW1lc3RhbXAsIGNsb2NraWQ6IGNsb2NraWQgfTtcbn07XG4vKipcbiAqIFZhbGlkYXRlIGlmIHN0cmluZyBpcyBhIHZhbGlkIFRJRFxuICovXG5leHBvcnQgY29uc3QgdmFsaWRhdGUgPSAodGlkKSA9PiB7XG4gICAgcmV0dXJuIHRpZC5sZW5ndGggPT09IDEzICYmIFRJRF9SRS50ZXN0KHRpZCk7XG59O1xuLy8jIHNvdXJjZU1hcHBpbmdVUkw9aW5kZXguanMubWFwIiwiaW1wb3J0IHR5cGUgeyBBdHBTZXNzaW9uRGF0YSB9IGZyb20gXCJAYXRjdXRlL2NsaWVudFwiO1xuaW1wb3J0IHsgS2l0dHlBZ2VudCB9IGZyb20gXCJraXR0eS1hZ2VudFwiO1xuaW1wb3J0IHsgZW5jcnlwdERhdGEgfSBmcm9tIFwiLi9jcnlwdG9cIjtcbmltcG9ydCB7IG5vdyBhcyB0aWROb3cgfSBmcm9tIFwiQGF0Y3V0ZS90aWRcIjtcbmltcG9ydCB7IEdNX2NvbmZpZyB9IGZyb20gXCJHTV9jb25maWdcIjtcbmltcG9ydCB7IHRvU3RyaW5nIGFzIHVpOFRvU3RyaW5nIH0gZnJvbSBcInVpbnQ4YXJyYXlzXCI7XG5cbmNvbnNvbGUubG9nKCdoZWxsbyB3b3JsZCEnKTtcblxuZnVuY3Rpb24gYXJyYXlCdWZmZXJUb0Jhc2U2NChhcnJheUJ1ZmZlcjogQXJyYXlCdWZmZXJMaWtlKSB7XG4gICAgcmV0dXJuIHVpOFRvU3RyaW5nKG5ldyBVaW50OEFycmF5KGFycmF5QnVmZmVyKSwgJ2Jhc2U2NCcpO1xufVxuXG5jb25zdCBjb25maWcgPSBuZXcgR01fY29uZmlnKHtcbiAgICBpZDogJ2JsdWVtYXJrJyxcbiAgICB0aXRsZTogJ0JsdWVtYXJrIFNldHRpbmdzJyxcbiAgICBmaWVsZHM6IHtcbiAgICAgICAgcHVibGlzaFRvRGlzY29yZDoge1xuICAgICAgICAgICAgdHlwZTogJ2NoZWNrYm94JyxcbiAgICAgICAgICAgIGxhYmVsOiAnUHVibGlzaCBib29rbWFya3MgdG8gRGlzY29yZD8nLFxuICAgICAgICAgICAgZGVmYXVsdDogdHJ1ZSxcbiAgICAgICAgfSxcbiAgICAgICAgd2ViaG9va1VybDoge1xuICAgICAgICAgICAgdHlwZTogJ3RleHQnLFxuICAgICAgICAgICAgbGFiZWw6ICdXZWJob29rIFVSTCcsXG4gICAgICAgICAgICBkZWZhdWx0OiBHTV9nZXRWYWx1ZSgnd2ViaG9va1VybCcpID8/ICcnLFxuICAgICAgICB9LFxuICAgICAgICBwdWJsaXNoVG9BdHA6IHtcbiAgICAgICAgICAgIHR5cGU6ICdjaGVja2JveCcsXG4gICAgICAgICAgICBsYWJlbDogJ1B1Ymxpc2ggYm9va21hcmtzIHRvIEFUUCByZXBvc2l0b3J5PyAoSW4gZW5jcnlwdGVkIGZvcm0pJyxcbiAgICAgICAgICAgIGRlZmF1bHQ6IHRydWUsXG4gICAgICAgIH0sXG4gICAgICAgIGJza3lVc2VybmFtZToge1xuICAgICAgICAgICAgdHlwZTogJ3RleHQnLFxuICAgICAgICAgICAgbGFiZWw6ICdBVFAgVXNlcm5hbWUnLFxuICAgICAgICAgICAgZGVmYXVsdDogR01fZ2V0VmFsdWUoJ2Jza3lVc2VybmFtZScpID8/ICcnLFxuICAgICAgICB9LFxuICAgICAgICBic2t5UGFzc3dvcmQ6IHtcbiAgICAgICAgICAgIHR5cGU6ICd0ZXh0JyxcbiAgICAgICAgICAgIGxhYmVsOiAnQVRQIFBhc3N3b3JkIChvciBBcHAgUGFzc3dvcmQpJyxcbiAgICAgICAgICAgIGRlZmF1bHQ6IEdNX2dldFZhbHVlKCdic2t5UGFzc3dvcmQnKSA/PyAnJyxcbiAgICAgICAgfSxcbiAgICAgICAgY3J5cHRvUGFzc3dvcmQ6IHtcbiAgICAgICAgICAgIHR5cGU6ICd0ZXh0JyxcbiAgICAgICAgICAgIGxhYmVsOiAnUGFzc3dvcmQgdXNlZCB0byBlbmNyeXB0IHlvdXIgYm9va21hcmtzJyxcbiAgICAgICAgICAgIGRlZmF1bHQ6IEdNX2dldFZhbHVlKCdjcnlwdG9QYXNzd29yZCcpID8/ICcnLFxuICAgICAgICB9XG4gICAgfVxufSk7XG5cbmNvbnN0IHByb2Nlc3NlZEVsZW1lbnRzID0gbmV3IFdlYWtTZXQoKTtcblxuYXN5bmMgZnVuY3Rpb24gZ2V0TG9nZ2VkSW5BZ2VudCgpIHtcbiAgICBjb25zdCB7IGFnZW50LCBtYW5hZ2VyIH0gPSBhd2FpdCBLaXR0eUFnZW50LmNyZWF0ZVBkc1dpdGhDcmVkZW50aWFscyhhd2FpdCBjb25maWcuZ2V0VmFsdWUoJ2Jza3lVc2VybmFtZScsICcnKSBhcyBzdHJpbmcpO1xuXG4gICAgbGV0IHNlc3Npb24gPSBHTV9nZXRWYWx1ZSgnYnNreVNlc3Npb24nKSBhcyBBdHBTZXNzaW9uRGF0YTtcbiAgICBpZiAoc2Vzc2lvbikge1xuICAgICAgICB0cnkge1xuICAgICAgICAgICAgYXdhaXQgbWFuYWdlci5yZXN1bWUoc2Vzc2lvbik7XG4gICAgICAgICAgICBjb25zb2xlLmxvZygncmVzdW1lZCBzZXNzaW9uJyk7XG4gICAgICAgIH0gY2F0Y2ggKGVycikge1xuICAgICAgICAgICAgY29uc29sZS53YXJuKCdmYWlsZWQgdG8gcmVzdW1lIHNlc3Npb24nLCBlcnIpO1xuICAgICAgICAgICAgc2Vzc2lvbiA9IGF3YWl0IG1hbmFnZXIubG9naW4oe1xuICAgICAgICAgICAgICAgIGlkZW50aWZpZXI6IGF3YWl0IGNvbmZpZy5nZXRWYWx1ZSgnYnNreVVzZXJuYW1lJywgJycpIGFzIHN0cmluZyxcbiAgICAgICAgICAgICAgICBwYXNzd29yZDogYXdhaXQgY29uZmlnLmdldFZhbHVlKCdic2t5UGFzc3dvcmQnLCAnJykgYXMgc3RyaW5nXG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgIH0gZWxzZSB7XG4gICAgICAgIHNlc3Npb24gPSBhd2FpdCBtYW5hZ2VyLmxvZ2luKHtcbiAgICAgICAgICAgIGlkZW50aWZpZXI6IGF3YWl0IGNvbmZpZy5nZXRWYWx1ZSgnYnNreVVzZXJuYW1lJywgJycpIGFzIHN0cmluZyxcbiAgICAgICAgICAgIHBhc3N3b3JkOiBhd2FpdCBjb25maWcuZ2V0VmFsdWUoJ2Jza3lQYXNzd29yZCcsICcnKSBhcyBzdHJpbmdcbiAgICAgICAgfSk7XG4gICAgICAgIEdNX3NldFZhbHVlKCdic2t5U2Vzc2lvbicsIHNlc3Npb24pO1xuICAgIH1cblxuICAgIHJldHVybiBhZ2VudDtcbn1cblxuR01fcmVnaXN0ZXJNZW51Q29tbWFuZCgnQ29uZmlnJywgKCkgPT4ge1xuICAgIGNvbmZpZy5vcGVuKCk7XG59KVxuXG5zZXRJbnRlcnZhbCgoKSA9PiB7XG4gICAgY29uc3QgbmV3RWxlbWVudHMgPSBbLi4uZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnW2RhdGEtdGVzdGlkXj1cImZlZWRJdGVtLVwiXSwgW2RhdGEtdGVzdGlkXj1cInBvc3RUaHJlYWRJdGVtLVwiXScpXS5tYXAoZSA9PiB7XG4gICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICBlbGVtZW50OiBlLFxuICAgICAgICAgICAgYnV0dG9uczogZS5xdWVyeVNlbGVjdG9yKCdbYXJpYS1sYWJlbD1cIk9wZW4gcG9zdCBvcHRpb25zIG1lbnVcIl0nKT8ucGFyZW50RWxlbWVudCEucGFyZW50RWxlbWVudCEucGFyZW50RWxlbWVudCxcbiAgICAgICAgICAgIHBvc3RMaW5rOiAoZS5xdWVyeVNlbGVjdG9yKCdbaHJlZl49XCIvcHJvZmlsZS9cIl1baHJlZio9XCIvcG9zdC9cIl0nKSBhcyBIVE1MQW5jaG9yRWxlbWVudCk/LmhyZWYsXG4gICAgICAgIH07XG4gICAgfSk7XG4gICAgXG4gICAgZm9yIChjb25zdCB7IGVsZW1lbnQsIGJ1dHRvbnMsIHBvc3RMaW5rIH0gb2YgbmV3RWxlbWVudHMpIHtcbiAgICAgICAgaWYgKHByb2Nlc3NlZEVsZW1lbnRzLmhhcyhlbGVtZW50KSkge1xuICAgICAgICAgICAgY29udGludWU7XG4gICAgICAgIH1cbiAgICBcbiAgICAgICAgcHJvY2Vzc2VkRWxlbWVudHMuYWRkKGVsZW1lbnQpO1xuICAgIFxuICAgICAgICBjb25zdCBidXR0b24gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdidXR0b24nKTtcbiAgICAgICAgYnV0dG9uLnRleHRDb250ZW50ID0gJ/Cfk4wnO1xuICAgICAgICBidXR0b24ub25jbGljayA9IGFzeW5jIGUgPT4ge1xuICAgICAgICAgICAgZS5zdG9wUHJvcGFnYXRpb24oKTtcbiAgICAgICAgICAgIGUucHJldmVudERlZmF1bHQoKTtcblxuICAgICAgICAgICAgY29uc29sZS5sb2coYGJvb2ttYXJraW5nICR7cG9zdExpbmsgPz8gZG9jdW1lbnQubG9jYXRpb24uaHJlZn1gKTtcbiAgICAgICAgICAgIC8vIGJvb2ttYXJrIHBvc3RcbiAgICAgICAgICAgIGF3YWl0IFByb21pc2UuYWxsKFtcbiAgICAgICAgICAgICAgICAoYXN5bmMgKCkgPT4ge1xuICAgICAgICAgICAgICAgICAgICBpZiAoIWF3YWl0IGNvbmZpZy5nZXRWYWx1ZSgncHVibGlzaFRvQXRwJywgdHJ1ZSkpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKCdub3QgcHVibGlzaGluZyB0byBhdHAnKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgICAgIGlmIChcbiAgICAgICAgICAgICAgICAgICAgICAgICFhd2FpdCBjb25maWcuZ2V0VmFsdWUoJ2NyeXB0b1Bhc3N3b3JkJywgJycpIHx8XG4gICAgICAgICAgICAgICAgICAgICAgICAhYXdhaXQgY29uZmlnLmdldFZhbHVlKCdic2t5VXNlcm5hbWUnLCAnJykgfHxcbiAgICAgICAgICAgICAgICAgICAgICAgICFhd2FpdCBjb25maWcuZ2V0VmFsdWUoJ2Jza3lQYXNzd29yZCcsICcnKSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgYWxlcnQoJ0JsdWVza3kgYWNjb3VudCBub3QgY29uZmlndXJlZCEnKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IHBvc3RNYXRjaCA9IChwb3N0TGluayA/PyBkb2N1bWVudC5sb2NhdGlvbi5ocmVmKS5tYXRjaCgvXFwvcHJvZmlsZVxcLyguKj8pXFwvcG9zdFxcLyguKikvaSk7XG4gICAgICAgICAgICAgICAgICAgIGlmICghcG9zdE1hdGNoKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBhbGVydCgnVVJMIGRpZCBub3QgbWF0Y2ggcmVnZXghJyk7XG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgICAgICBjb25zdCBbLCByZXBvLCBya2V5XSA9IHBvc3RNYXRjaDtcblxuICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZygnbG9nZ2luZyBpbicpO1xuICAgICAgICAgICAgICAgICAgICBjb25zdCBhZ2VudCA9IGF3YWl0IGdldExvZ2dlZEluQWdlbnQoKTtcbiAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coJ2xvZ2dlZCBpbicpO1xuICAgICAgICAgICAgICAgICAgICBhd2FpdCBhZ2VudC5wdXQoe1xuICAgICAgICAgICAgICAgICAgICAgICAgY29sbGVjdGlvbjogJ2lvLmdpdGh1Yi51d3guYmx1ZW1hcmsuZW5jcnlwdGVkQm9va21hcmsnLFxuICAgICAgICAgICAgICAgICAgICAgICAgcmVwbzogYXdhaXQgY29uZmlnLmdldFZhbHVlKCdic2t5VXNlcm5hbWUnLCAnJykgYXMgc3RyaW5nLFxuICAgICAgICAgICAgICAgICAgICAgICAgcmtleTogdGlkTm93KCksXG4gICAgICAgICAgICAgICAgICAgICAgICByZWNvcmQ6IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAkdHlwZTogJ2lvLmdpdGh1Yi51d3guYmx1ZW1hcmsuZW5jcnlwdGVkQm9va21hcmsnLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC4uLmF3YWl0IGVuY3J5cHREYXRhKFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBKU09OLnN0cmluZ2lmeSh7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXBvLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmtleSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSksXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbmZpZy5nZXRWYWx1ZSgnY3J5cHRvUGFzc3dvcmQnLCAnJykgYXMgc3RyaW5nXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgKVxuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICB9KSgpLFxuICAgICAgICAgICAgICAgIChhc3luYyAoKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIGlmICghYXdhaXQgY29uZmlnLmdldFZhbHVlKCdwdWJsaXNoVG9EaXNjb3JkJywgdHJ1ZSkpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKCdub3QgcHVibGlzaGluZyB0byBkaXNjb3JkJyk7XG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgaWYgKCFhd2FpdCBjb25maWcuZ2V0VmFsdWUoJ3dlYmhvb2tVcmwnLCAnJykpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGFsZXJ0KCdObyB3ZWJob29rIFVSTCBzZXQhJyk7XG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgICAgICBhd2FpdCBmZXRjaChcbiAgICAgICAgICAgICAgICAgICAgICAgIGF3YWl0IGNvbmZpZy5nZXRWYWx1ZSgnd2ViaG9va1VybCcsICcnKSBhcyBzdHJpbmcsXG4gICAgICAgICAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbWV0aG9kOiAnUE9TVCcsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYm9keTogSlNPTi5zdHJpbmdpZnkoe1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb250ZW50OiBmaXhMaW5rKHBvc3RMaW5rID8/IGRvY3VtZW50LmxvY2F0aW9uLmhyZWYpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfSksXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaGVhZGVyczoge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAnQ29udGVudC1UeXBlJzogJ2FwcGxpY2F0aW9uL2pzb24nLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgKTtcbiAgICAgICAgICAgICAgICB9KSgpLFxuICAgICAgICAgICAgXSlcbiAgICAgICAgfTtcbiAgICBcbiAgICAgICAgaWYgKCFidXR0b25zKSBjb250aW51ZTtcbiAgICBcbiAgICAgICAgYnV0dG9ucy5hcHBlbmQoYnV0dG9uKTtcbiAgICB9XG59LCAyNTApO1xuXG5mdW5jdGlvbiBmaXhMaW5rKGxpbms6IHN0cmluZykge1xuICAgIGNvbnN0IHVybCA9IG5ldyBVUkwobGluayk7XG4gICAgdXJsLmhvc3RuYW1lID0gJ2Jza3l4LmFwcCc7XG4gICAgcmV0dXJuIHVybC50b1N0cmluZygpO1xufVxuIl0sIm5hbWVzIjpbIl9lbmNyeXB0RGF0YSIsImNvbnRlbnQiLCJwYXNzd29yZCIsInNhbHQiLCJrZXkiLCJpdiIsImNvbnRlbnRCeXRlcyIsImNpcGhlciIsImNyeXB0byIsIlVpbnQ4QXJyYXkiLCJnZXRLZXkiLCJzdHJpbmdUb0J5dGVzIiwiYnl0ZXNUb0Jhc2U2NCIsIl9kZWNyeXB0RGF0YSIsImVuY3J5cHRlZERhdGEiLCJiYXNlNjRUb0J5dGVzIiwiYnl0ZXNUb1N0cmluZyIsIl9nZXRLZXkiLCJwYXNzd29yZEJ5dGVzIiwiaW5pdGlhbEtleSIsImJ5dGVzIiwiVGV4dERlY29kZXIiLCJzdHIiLCJUZXh0RW5jb2RlciIsInRvU3RyaW5nIiwidWk4VG9TdHJpbmciLCJmcm9tU3RyaW5nIiwidWk4RnJvbVN0cmluZyIsImFyciIsImJhc2U2NCIsIktpdHR5QWdlbnQiLCJlbmNyeXB0RGF0YSIsIm5vdyIsInRpZE5vdyIsIkdNX2NvbmZpZyIsImNvbnNvbGUiLCJhcnJheUJ1ZmZlclRvQmFzZTY0IiwiYXJyYXlCdWZmZXIiLCJfR01fZ2V0VmFsdWUiLCJfR01fZ2V0VmFsdWUxIiwiX0dNX2dldFZhbHVlMiIsIl9HTV9nZXRWYWx1ZTMiLCJjb25maWciLCJwcm9jZXNzZWRFbGVtZW50cyIsIldlYWtTZXQiLCJfZ2V0TG9nZ2VkSW5BZ2VudCIsIl9yZWYiLCJhZ2VudCIsIm1hbmFnZXIiLCJzZXNzaW9uIiwiZXJyIiwiR01fZ2V0VmFsdWUiLCJHTV9zZXRWYWx1ZSIsIkdNX3JlZ2lzdGVyTWVudUNvbW1hbmQiLCJzZXRJbnRlcnZhbCIsIm5ld0VsZW1lbnRzIiwiZG9jdW1lbnQiLCJlIiwiX2VfcXVlcnlTZWxlY3RvciIsIl9lX3F1ZXJ5U2VsZWN0b3IxIiwiX2l0ZXJhdG9yRXJyb3IiLCJlbGVtZW50IiwiYnV0dG9ucyIsInBvc3RMaW5rIiwiYnV0dG9uIiwiUHJvbWlzZSIsInBvc3RNYXRjaCIsIl9wb3N0TWF0Y2giLCJyZXBvIiwicmtleSIsImFsZXJ0IiwiZ2V0TG9nZ2VkSW5BZ2VudCIsIkpTT04iLCJmZXRjaCIsImZpeExpbmsiLCJsaW5rIiwidXJsIiwiVVJMIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7OztBQUFhO0FBQ2IsdUJBQXVCLElBQUksSUFBSSxvQkFBb0I7QUFDbkQ7QUFDQTtBQUNBO0FBQ0EsZUFBZSxvQ0FBb0M7QUFDbkQ7QUFDQTtBQUNBLENBQUM7QUFDRDtBQUNBO0FBQ0EsQ0FBQztBQUNELG9CQUFvQixJQUFJLElBQUksaUJBQWlCO0FBQzdDO0FBQ0E7QUFDQSw4Q0FBNkMsRUFBRSxhQUFhLEVBQUM7QUFDN0QsYUFBYSxHQUFHLHFCQUFxQjtBQUNyQyxhQUFhLG1CQUFPLENBQUMsR0FBb0IsR0FBRyxPQUFPO0FBQ25ELHFCQUFxQjtB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Q0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0EsR0FBRzs7QUFFSDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsNkNBQTZDLFNBQVM7QUFDdEQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQSxpQkFBaUI7QUFDakIsR0FBRzs7QUFFSDtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsbURBQW1ELFNBQVM7QUFDNUQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsNkNBQTZDLFNBQVM7QUFDdEQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFHOztBQUVIO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRzs7QUFFSDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFHOztBQUVIO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQSxpQkFBaUI7QUFDakIseUJBQXVCO0FBQ3ZCLHlCQUFzQjs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUM3NUJmO0FBQ1A7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNPLDhCQUE4QixpQ0FBaUM7QUFDdEU7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ1pBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNPO0FBQ1A7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDbkJ1RDtBQUNSO0FBQy9DO0FBQ087QUFDUCwwQkFBMEIscUJBQXFCLE9BQU8sb0VBQW9FLElBQUk7QUFDOUgsaUJBQWlCLE1BQU0sSUFBSSxZQUFZLEtBQUssT0FBTztBQUNuRDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNPO0FBQ1Asa0JBQWtCLGdCQUFnQjtBQUNsQyxzQkFBc0IsaUJBQWlCO0FBQ3ZDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLDhCQUE4QixxQ0FBcUM7QUFDbkU7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLDhCQUE4QixzQ0FBc0M7QUFDcEU7QUFDQTtBQUNBO0FBQ0E7QUFDQSw2QkFBNkIsYUFBYTtBQUMxQztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EscUJBQXFCLFlBQVk7QUFDakM7QUFDQTtBQUNBLGFBQWE7QUFDYixTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxhQUFhO0FBQ2I7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsYUFBYTtBQUNiO0FBQ0EsOENBQThDLDBCQUEwQjtBQUN4RTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGtCQUFrQixjQUFjLEdBQUcsV0FBVztBQUM5QztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHNEQUFzRCxXQUFXO0FBQ2pFO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNPO0FBQ1Asc0JBQXNCLHVDQUF1QztBQUM3RDtBQUNPO0FBQ1Asc0JBQXNCLHFDQUFxQztBQUMzRDtBQUNBOztBQzVJQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ087QUFDUDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDTztBQUNQO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQzNDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ087QUFDUDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDTztBQUNQO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBOztBQ2xFd0Q7QUFDYjtBQUNLO0FBQ0w7QUFDcEM7QUFDUDtBQUNBO0FBQ0E7QUFD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O0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsWUFBWSxRQUFRO0FBQ3BCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsWUFBWSxjQUFjO0FBQzFCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxZQUFZLFVBQVU7QUFDdEI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsWUFBWSxTQUFTO0FBQ3JCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsWUFBWSxTQUFTO0FBQ3JCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsWUFBWSxhQUFhO0FBQ3pCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsWUFBWSxXQUFXO0FBQ3ZCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxZQUFZLE1BQU07QUFDbEI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFlBQVksTUFBTTtBQUNsQixZQUFZLGFBQWE7QUFDekI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNB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