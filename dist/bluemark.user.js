// ==UserScript==
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
// ==/UserScript==
"use strict";
(() => {
  var __create = Object.create;
  var __defProp = Object.defineProperty;
  var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
  var __getOwnPropNames = Object.getOwnPropertyNames;
  var __getProtoOf = Object.getPrototypeOf;
  var __hasOwnProp = Object.prototype.hasOwnProperty;
  var __commonJS = (cb, mod2) => function __require() {
    return mod2 || (0, cb[__getOwnPropNames(cb)[0]])((mod2 = { exports: {} }).exports, mod2), mod2.exports;
  };
  var __copyProps = (to, from, except, desc) => {
    if (from && typeof from === "object" || typeof from === "function") {
      for (let key of __getOwnPropNames(from))
        if (!__hasOwnProp.call(to, key) && key !== except)
          __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
    }
    return to;
  };
  var __toESM = (mod2, isNodeMode, target) => (target = mod2 != null ? __create(__getProtoOf(mod2)) : {}, __copyProps(
    // If the importer is in node compatibility mode or this is not an ESM
    // file that has been converted to a CommonJS file using a Babel-
    // compatible transform (i.e. "__esModule" has not been set), then set
    // "default" to the CommonJS "module.exports" for node compatibility.
    isNodeMode || !mod2 || !mod2.__esModule ? __defProp(target, "default", { value: mod2, enumerable: true }) : target,
    mod2
  ));

  // node_modules/.pnpm/@uwx+gm-fetch@2.0.3/node_modules/@uwx/gm-fetch/dist/GM_fetch.js
  var require_GM_fetch = __commonJS({
    "node_modules/.pnpm/@uwx+gm-fetch@2.0.3/node_modules/@uwx/gm-fetch/dist/GM_fetch.js"(exports) {
      "use strict";
      Object.defineProperty(exports, "__esModule", { value: true });
      exports.Response = exports.Request = exports.Headers = void 0;
      exports.GM_fetch = GM_fetch2;
      function normalizeName(name) {
        if (typeof name !== "string") {
          name = String(name);
        }
        if (/[^\w#$%&'*+.^`|~-]/i.test(name)) {
          throw new TypeError("Invalid character in header field name");
        }
        return name;
      }
      function normalizeValue(value) {
        if (typeof value !== "string") {
          value = String(value);
        }
        return value;
      }
      var Headers2 = class _Headers {
        constructor(headers2) {
          this.map = {};
          this.map = {};
          if (headers2 instanceof _Headers) {
            headers2.forEach((value, name) => {
              this.append(name, value);
            });
          } else if (headers2) {
            for (const name of Object.getOwnPropertyNames(headers2)) {
              this.append(name, headers2[name]);
            }
          }
        }
        append(name, value) {
          name = normalizeName(name);
          value = normalizeValue(value);
          const list = this.map[name];
          if (list === void 0) {
            this.map[name] = [value];
          } else {
            list.push(value);
          }
        }
        delete(name) {
          delete this.map[normalizeName(name)];
        }
        get(name) {
          const values = this.map[normalizeName(name)];
          return values ? values[0] : null;
        }
        getAll(name) {
          return this.map[normalizeName(name)] || [];
        }
        has(name) {
          return Object.prototype.hasOwnProperty.call(this.map, normalizeName(name));
        }
        set(name, value) {
          this.map[normalizeName(name)] = [normalizeValue(value)];
        }
        // eslint-disable-next-line unicorn/prevent-abbreviations
        forEach(callback, thisArg) {
          for (const name of Object.getOwnPropertyNames(this.map)) {
            for (const value of this.map[name]) {
              callback.call(thisArg, value, name, this);
            }
          }
        }
        *[Symbol.iterator]() {
          for (const [name, values] of Object.entries(this.map)) {
            for (const value of values) {
              yield [name, value];
            }
          }
        }
      };
      exports.Headers = Headers2;
      function fileReaderReady(reader) {
        return new Promise((resolve, reject) => {
          reader.addEventListener("load", () => {
            resolve(reader.result);
          });
          reader.addEventListener("error", () => {
            reject(reader.error);
          });
        });
      }
      function readBlobAsArrayBuffer(blob) {
        const reader = new FileReader();
        reader.readAsArrayBuffer(blob);
        return fileReaderReady(reader);
      }
      function readBlobAsText(blob) {
        const reader = new FileReader();
        reader.readAsText(blob);
        return fileReaderReady(reader);
      }
      var textEncoder = new TextEncoder();
      var textDecoder = new TextDecoder();
      var Body = class {
        constructor() {
          this._bodyUsed = false;
        }
        get bodyUsed() {
          return this._bodyUsed;
        }
        blob() {
          if (this._bodyUsed) {
            return Promise.reject(new TypeError("Body contents already read"));
          }
          this._bodyUsed = true;
          const body = this.body;
          if (typeof body === "string" || body instanceof ArrayBuffer) {
            return Promise.resolve(new Blob([body]));
          }
          if (body instanceof Blob) {
            return Promise.resolve(body);
          }
          if (body instanceof FormData) {
            return Promise.reject(new TypeError("A multipart FormData body cannot be read as a blob"));
          }
          if (body === void 0) {
            return Promise.reject(new Error("No body is present"));
          }
          throw new TypeError("Invalid body type");
        }
        arrayBuffer() {
          if (this._bodyUsed) {
            return Promise.reject(new TypeError("Body contents already read"));
          }
          this._bodyUsed = true;
          const body = this.body;
          if (typeof body === "string") {
            return Promise.resolve(textEncoder.encode(body).buffer);
          }
          if (body instanceof ArrayBuffer) {
            return Promise.resolve(body);
          }
          if (body instanceof Blob) {
            return Promise.resolve(readBlobAsArrayBuffer(body));
          }
          if (body instanceof FormData) {
            return Promise.reject(new TypeError("A multipart FormData body cannot be read as an arrayBuffer"));
          }
          if (body === void 0) {
            return Promise.reject(new Error("No body is present"));
          }
          throw new TypeError("Invalid body type");
        }
        text() {
          if (this._bodyUsed) {
            return Promise.reject(new TypeError("Body contents already read"));
          }
          this._bodyUsed = true;
          const body = this.body;
          if (typeof body === "string") {
            return Promise.resolve(body);
          }
          if (body instanceof ArrayBuffer) {
            return Promise.resolve(textDecoder.decode(body));
          }
          if (body instanceof Blob) {
            return Promise.resolve(readBlobAsText(body));
          }
          if (body instanceof FormData) {
            return Promise.reject(new TypeError("A multipart FormData body cannot be read as text"));
          }
          if (body === void 0) {
            return Promise.reject(new Error("No body is present"));
          }
          throw new TypeError("Invalid body type");
        }
        formData() {
          if (this._bodyUsed) {
            return Promise.reject(new TypeError("Body contents already read"));
          }
          this._bodyUsed = true;
          const body = this.body;
          if (typeof body === "string") {
            return Promise.reject(new TypeError("Unsupported: Cannot parse FormData from a string body"));
          }
          if (body instanceof ArrayBuffer) {
            return Promise.reject(new TypeError("Unsupported: Cannot parse FormData from an ArrayBuffer body"));
          }
          if (body instanceof Blob) {
            return Promise.reject(new TypeError("Unsupported: Cannot parse FormData from a Blob body"));
          }
          if (body instanceof FormData) {
            return Promise.resolve(body);
          }
          if (body === void 0) {
            return Promise.reject(new Error("No body is present"));
          }
          throw new TypeError("Invalid body type");
        }
        json() {
          return this.text().then(JSON.parse);
        }
      };
      var methods = /* @__PURE__ */ new Set(["GET", "HEAD", "POST"]);
      function normalizeMethod(method) {
        method = method.toUpperCase();
        if (!methods.has(method)) {
          throw new Error(`Unsupported HTTP method for GM_xmlhttpRequest: ${method}`);
        }
        return method;
      }
      var Request = class extends Body {
        constructor(url, options) {
          super();
          options = options || {};
          this.url = url;
          this.credentials = options.credentials || "omit";
          this.headers = new Headers2(options.headers);
          this.method = normalizeMethod(options.method || "GET");
          this.mode = options.mode || null;
          this.referrer = null;
          if ((this.method === "GET" || this.method === "HEAD") && options.body) {
            throw new TypeError("Body not allowed for GET or HEAD requests");
          }
          this.bodyStore = options.body;
        }
        get body() {
          return this.bodyStore;
        }
        get bodyRaw() {
          return this.bodyStore;
        }
      };
      exports.Request = Request;
      function headers(responseHeaders) {
        const head = new Headers2();
        const pairs = responseHeaders.trim().split("\n");
        for (const header of pairs) {
          const split = header.trim().split(":");
          const key = split.shift().trim();
          const value = split.join(":").trim();
          head.append(key, value);
        }
        return head;
      }
      var Response = class extends Body {
        constructor(response) {
          super();
          this.response = response;
          this.type = "default";
          this.status = response.status;
          this.ok = this.status >= 200 && this.status < 300;
          this.statusText = response.statusText;
          this.headers = headers(response.responseHeaders);
          this.url = responseURL(response.finalUrl, response.responseHeaders, this.headers) || "";
        }
        get body() {
          return this.response.response;
        }
        text() {
          if (this._bodyUsed) {
            return Promise.reject(new TypeError("Body contents already read"));
          }
          this._bodyUsed = true;
          return Promise.resolve(this.response.responseText);
        }
      };
      exports.Response = Response;
      function responseURL(finalUrl, rawRespHeaders, respHeaders) {
        if (finalUrl) {
          return finalUrl;
        }
        if (/^X-Request-URL:/m.test(rawRespHeaders)) {
          return respHeaders.get("X-Request-URL");
        }
        return null;
      }
      function GM_fetch2(input, init) {
        let request;
        if (input instanceof Request) {
          if (init) {
            request = new Request(input.url, init);
          } else {
            request = input;
          }
        } else {
          request = new Request(input, init);
        }
        if (!["GET", "HEAD", "POST"].includes(request.method)) {
          throw new Error("Unsupported method for GM_xmlhttpRequest");
        }
        return new Promise((resolve, reject) => {
          const xhrDetails = {};
          xhrDetails.method = request.method;
          xhrDetails.responseType = "arraybuffer";
          xhrDetails.url = request.url;
          xhrDetails.onload = (resp) => {
            const status = resp.status;
            if (status < 100 || status > 599) {
              reject(new TypeError(`Network request failed: Status code ${status}`));
              return;
            }
            resolve(new Response(resp));
          };
          xhrDetails.onerror = (error) => {
            reject(new TypeError(`Network request failed: ${error.error}`, {
              cause: error
            }));
          };
          const headers2 = {};
          for (const [name, value] of request.headers) {
            headers2[name] = value;
          }
          xhrDetails.headers = headers2;
          if (typeof request.bodyRaw !== "undefined") {
            xhrDetails.data = request.bodyRaw;
          }
          GM_xmlhttpRequest(xhrDetails);
        });
      }
    }
  });

  // node_modules/.pnpm/@atproto+syntax@0.3.1/node_modules/@atproto/syntax/dist/handle.js
  var require_handle = __commonJS({
    "node_modules/.pnpm/@atproto+syntax@0.3.1/node_modules/@atproto/syntax/dist/handle.js"(exports) {
      "use strict";
      Object.defineProperty(exports, "__esModule", { value: true });
      exports.DisallowedDomainError = exports.UnsupportedDomainError = exports.ReservedHandleError = exports.InvalidHandleError = exports.isValidTld = exports.isValidHandle = exports.normalizeAndEnsureValidHandle = exports.normalizeHandle = exports.ensureValidHandleRegex = exports.ensureValidHandle = exports.DISALLOWED_TLDS = exports.INVALID_HANDLE = void 0;
      exports.INVALID_HANDLE = "handle.invalid";
      exports.DISALLOWED_TLDS = [
        ".local",
        ".arpa",
        ".invalid",
        ".localhost",
        ".internal",
        ".example",
        ".alt",
        // policy could concievably change on ".onion" some day
        ".onion"
        // NOTE: .test is allowed in testing and devopment. In practical terms
        // "should" "never" actually resolve and get registered in production
      ];
      var ensureValidHandle = (handle) => {
        if (!/^[a-zA-Z0-9.-]*$/.test(handle)) {
          throw new InvalidHandleError("Disallowed characters in handle (ASCII letters, digits, dashes, periods only)");
        }
        if (handle.length > 253) {
          throw new InvalidHandleError("Handle is too long (253 chars max)");
        }
        const labels = handle.split(".");
        if (labels.length < 2) {
          throw new InvalidHandleError("Handle domain needs at least two parts");
        }
        for (let i = 0; i < labels.length; i++) {
          const l = labels[i];
          if (l.length < 1) {
            throw new InvalidHandleError("Handle parts can not be empty");
          }
          if (l.length > 63) {
            throw new InvalidHandleError("Handle part too long (max 63 chars)");
          }
          if (l.endsWith("-") || l.startsWith("-")) {
            throw new InvalidHandleError("Handle parts can not start or end with hyphens");
          }
          if (i + 1 === labels.length && !/^[a-zA-Z]/.test(l)) {
            throw new InvalidHandleError("Handle final component (TLD) must start with ASCII letter");
          }
        }
      };
      exports.ensureValidHandle = ensureValidHandle;
      var ensureValidHandleRegex = (handle) => {
        if (!/^([a-zA-Z0-9]([a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?\.)+[a-zA-Z]([a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?$/.test(handle)) {
          throw new InvalidHandleError("Handle didn't validate via regex");
        }
        if (handle.length > 253) {
          throw new InvalidHandleError("Handle is too long (253 chars max)");
        }
      };
      exports.ensureValidHandleRegex = ensureValidHandleRegex;
      var normalizeHandle = (handle) => {
        return handle.toLowerCase();
      };
      exports.normalizeHandle = normalizeHandle;
      var normalizeAndEnsureValidHandle = (handle) => {
        const normalized = (0, exports.normalizeHandle)(handle);
        (0, exports.ensureValidHandle)(normalized);
        return normalized;
      };
      exports.normalizeAndEnsureValidHandle = normalizeAndEnsureValidHandle;
      var isValidHandle = (handle) => {
        try {
          (0, exports.ensureValidHandle)(handle);
        } catch (err) {
          if (err instanceof InvalidHandleError) {
            return false;
          }
          throw err;
        }
        return true;
      };
      exports.isValidHandle = isValidHandle;
      var isValidTld = (handle) => {
        return !exports.DISALLOWED_TLDS.some((domain) => handle.endsWith(domain));
      };
      exports.isValidTld = isValidTld;
      var InvalidHandleError = class extends Error {
      };
      exports.InvalidHandleError = InvalidHandleError;
      var ReservedHandleError = class extends Error {
      };
      exports.ReservedHandleError = ReservedHandleError;
      var UnsupportedDomainError = class extends Error {
      };
      exports.UnsupportedDomainError = UnsupportedDomainError;
      var DisallowedDomainError = class extends Error {
      };
      exports.DisallowedDomainError = DisallowedDomainError;
    }
  });

  // node_modules/.pnpm/@atproto+syntax@0.3.1/node_modules/@atproto/syntax/dist/did.js
  var require_did = __commonJS({
    "node_modules/.pnpm/@atproto+syntax@0.3.1/node_modules/@atproto/syntax/dist/did.js"(exports) {
      "use strict";
      Object.defineProperty(exports, "__esModule", { value: true });
      exports.InvalidDidError = exports.ensureValidDidRegex = exports.ensureValidDid = void 0;
      var ensureValidDid = (did) => {
        if (!did.startsWith("did:")) {
          throw new InvalidDidError('DID requires "did:" prefix');
        }
        if (!/^[a-zA-Z0-9._:%-]*$/.test(did)) {
          throw new InvalidDidError("Disallowed characters in DID (ASCII letters, digits, and a couple other characters only)");
        }
        const { length, 1: method } = did.split(":");
        if (length < 3) {
          throw new InvalidDidError("DID requires prefix, method, and method-specific content");
        }
        if (!/^[a-z]+$/.test(method)) {
          throw new InvalidDidError("DID method must be lower-case letters");
        }
        if (did.endsWith(":") || did.endsWith("%")) {
          throw new InvalidDidError('DID can not end with ":" or "%"');
        }
        if (did.length > 2 * 1024) {
          throw new InvalidDidError("DID is too long (2048 chars max)");
        }
      };
      exports.ensureValidDid = ensureValidDid;
      var ensureValidDidRegex = (did) => {
        if (!/^did:[a-z]+:[a-zA-Z0-9._:%-]*[a-zA-Z0-9._-]$/.test(did)) {
          throw new InvalidDidError("DID didn't validate via regex");
        }
        if (did.length > 2 * 1024) {
          throw new InvalidDidError("DID is too long (2048 chars max)");
        }
      };
      exports.ensureValidDidRegex = ensureValidDidRegex;
      var InvalidDidError = class extends Error {
      };
      exports.InvalidDidError = InvalidDidError;
    }
  });

  // node_modules/.pnpm/@atproto+syntax@0.3.1/node_modules/@atproto/syntax/dist/nsid.js
  var require_nsid = __commonJS({
    "node_modules/.pnpm/@atproto+syntax@0.3.1/node_modules/@atproto/syntax/dist/nsid.js"(exports) {
      "use strict";
      Object.defineProperty(exports, "__esModule", { value: true });
      exports.InvalidNsidError = exports.ensureValidNsidRegex = exports.ensureValidNsid = exports.NSID = void 0;
      var NSID = class _NSID {
        static parse(nsid) {
          return new _NSID(nsid);
        }
        static create(authority, name) {
          const segments = [...authority.split(".").reverse(), name].join(".");
          return new _NSID(segments);
        }
        static isValid(nsid) {
          try {
            _NSID.parse(nsid);
            return true;
          } catch (e) {
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
          this.segments = nsid.split(".");
        }
        get authority() {
          return this.segments.slice(0, this.segments.length - 1).reverse().join(".");
        }
        get name() {
          return this.segments.at(this.segments.length - 1);
        }
        toString() {
          return this.segments.join(".");
        }
      };
      exports.NSID = NSID;
      var ensureValidNsid = (nsid) => {
        const toCheck = nsid;
        if (!/^[a-zA-Z0-9.-]*$/.test(toCheck)) {
          throw new InvalidNsidError("Disallowed characters in NSID (ASCII letters, digits, dashes, periods only)");
        }
        if (toCheck.length > 253 + 1 + 63) {
          throw new InvalidNsidError("NSID is too long (317 chars max)");
        }
        const labels = toCheck.split(".");
        if (labels.length < 3) {
          throw new InvalidNsidError("NSID needs at least three parts");
        }
        for (let i = 0; i < labels.length; i++) {
          const l = labels[i];
          if (l.length < 1) {
            throw new InvalidNsidError("NSID parts can not be empty");
          }
          if (l.length > 63) {
            throw new InvalidNsidError("NSID part too long (max 63 chars)");
          }
          if (l.endsWith("-") || l.startsWith("-")) {
            throw new InvalidNsidError("NSID parts can not start or end with hyphen");
          }
          if (/^[0-9]/.test(l) && i === 0) {
            throw new InvalidNsidError("NSID first part may not start with a digit");
          }
          if (!/^[a-zA-Z]+$/.test(l) && i + 1 === labels.length) {
            throw new InvalidNsidError("NSID name part must be only letters");
          }
        }
      };
      exports.ensureValidNsid = ensureValidNsid;
      var ensureValidNsidRegex = (nsid) => {
        if (!/^[a-zA-Z]([a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(\.[a-zA-Z0-9]([a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)+(\.[a-zA-Z]([a-zA-Z]{0,61}[a-zA-Z])?)$/.test(nsid)) {
          throw new InvalidNsidError("NSID didn't validate via regex");
        }
        if (nsid.length > 253 + 1 + 63) {
          throw new InvalidNsidError("NSID is too long (317 chars max)");
        }
      };
      exports.ensureValidNsidRegex = ensureValidNsidRegex;
      var InvalidNsidError = class extends Error {
      };
      exports.InvalidNsidError = InvalidNsidError;
    }
  });

  // node_modules/.pnpm/@atproto+syntax@0.3.1/node_modules/@atproto/syntax/dist/aturi_validation.js
  var require_aturi_validation = __commonJS({
    "node_modules/.pnpm/@atproto+syntax@0.3.1/node_modules/@atproto/syntax/dist/aturi_validation.js"(exports) {
      "use strict";
      Object.defineProperty(exports, "__esModule", { value: true });
      exports.ensureValidAtUriRegex = exports.ensureValidAtUri = void 0;
      var handle_1 = require_handle();
      var did_1 = require_did();
      var nsid_1 = require_nsid();
      var ensureValidAtUri = (uri) => {
        const uriParts = uri.split("#");
        if (uriParts.length > 2) {
          throw new Error('ATURI can have at most one "#", separating fragment out');
        }
        const fragmentPart = uriParts[1] || null;
        uri = uriParts[0];
        if (!/^[a-zA-Z0-9._~:@!$&')(*+,;=%/-]*$/.test(uri)) {
          throw new Error("Disallowed characters in ATURI (ASCII)");
        }
        const parts = uri.split("/");
        if (parts.length >= 3 && (parts[0] !== "at:" || parts[1].length !== 0)) {
          throw new Error('ATURI must start with "at://"');
        }
        if (parts.length < 3) {
          throw new Error("ATURI requires at least method and authority sections");
        }
        try {
          if (parts[2].startsWith("did:")) {
            (0, did_1.ensureValidDid)(parts[2]);
          } else {
            (0, handle_1.ensureValidHandle)(parts[2]);
          }
        } catch {
          throw new Error("ATURI authority must be a valid handle or DID");
        }
        if (parts.length >= 4) {
          if (parts[3].length === 0) {
            throw new Error("ATURI can not have a slash after authority without a path segment");
          }
          try {
            (0, nsid_1.ensureValidNsid)(parts[3]);
          } catch {
            throw new Error("ATURI requires first path segment (if supplied) to be valid NSID");
          }
        }
        if (parts.length >= 5) {
          if (parts[4].length === 0) {
            throw new Error("ATURI can not have a slash after collection, unless record key is provided");
          }
        }
        if (parts.length >= 6) {
          throw new Error("ATURI path can have at most two parts, and no trailing slash");
        }
        if (uriParts.length >= 2 && fragmentPart == null) {
          throw new Error("ATURI fragment must be non-empty and start with slash");
        }
        if (fragmentPart != null) {
          if (fragmentPart.length === 0 || fragmentPart[0] !== "/") {
            throw new Error("ATURI fragment must be non-empty and start with slash");
          }
          if (!/^\/[a-zA-Z0-9._~:@!$&')(*+,;=%[\]/-]*$/.test(fragmentPart)) {
            throw new Error("Disallowed characters in ATURI fragment (ASCII)");
          }
        }
        if (uri.length > 8 * 1024) {
          throw new Error("ATURI is far too long");
        }
      };
      exports.ensureValidAtUri = ensureValidAtUri;
      var ensureValidAtUriRegex = (uri) => {
        const aturiRegex = /^at:\/\/(?<authority>[a-zA-Z0-9._:%-]+)(\/(?<collection>[a-zA-Z0-9-.]+)(\/(?<rkey>[a-zA-Z0-9._~:@!$&%')(*+,;=-]+))?)?(#(?<fragment>\/[a-zA-Z0-9._~:@!$&%')(*+,;=\-[\]/\\]*))?$/;
        const rm = uri.match(aturiRegex);
        if (!rm || !rm.groups) {
          throw new Error("ATURI didn't validate via regex");
        }
        const groups = rm.groups;
        try {
          (0, handle_1.ensureValidHandleRegex)(groups.authority);
        } catch {
          try {
            (0, did_1.ensureValidDidRegex)(groups.authority);
          } catch {
            throw new Error("ATURI authority must be a valid handle or DID");
          }
        }
        if (groups.collection) {
          try {
            (0, nsid_1.ensureValidNsidRegex)(groups.collection);
          } catch {
            throw new Error("ATURI collection path segment must be a valid NSID");
          }
        }
        if (uri.length > 8 * 1024) {
          throw new Error("ATURI is far too long");
        }
      };
      exports.ensureValidAtUriRegex = ensureValidAtUriRegex;
    }
  });

  // node_modules/.pnpm/@atproto+syntax@0.3.1/node_modules/@atproto/syntax/dist/aturi.js
  var require_aturi = __commonJS({
    "node_modules/.pnpm/@atproto+syntax@0.3.1/node_modules/@atproto/syntax/dist/aturi.js"(exports) {
      "use strict";
      var __createBinding = exports && exports.__createBinding || (Object.create ? function(o, m, k, k2) {
        if (k2 === void 0) k2 = k;
        var desc = Object.getOwnPropertyDescriptor(m, k);
        if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
          desc = { enumerable: true, get: function() {
            return m[k];
          } };
        }
        Object.defineProperty(o, k2, desc);
      } : function(o, m, k, k2) {
        if (k2 === void 0) k2 = k;
        o[k2] = m[k];
      });
      var __exportStar = exports && exports.__exportStar || function(m, exports2) {
        for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports2, p)) __createBinding(exports2, m, p);
      };
      Object.defineProperty(exports, "__esModule", { value: true });
      exports.AtUri = exports.ATP_URI_REGEX = void 0;
      __exportStar(require_aturi_validation(), exports);
      exports.ATP_URI_REGEX = // proto-    --did--------------   --name----------------   --path----   --query--   --hash--
      /^(at:\/\/)?((?:did:[a-z0-9:%-]+)|(?:[a-z0-9][a-z0-9.:-]*))(\/[^?#\s]*)?(\?[^#\s]+)?(#[^\s]+)?$/i;
      var RELATIVE_REGEX = /^(\/[^?#\s]*)?(\?[^#\s]+)?(#[^\s]+)?$/i;
      var AtUri2 = class _AtUri {
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
          } else {
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
            str += "/" + collection;
          if (rkey)
            str += "/" + rkey;
          return new _AtUri(str);
        }
        get protocol() {
          return "at:";
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
          return this.pathname.split("/").filter(Boolean)[0] || "";
        }
        set collection(v) {
          const parts = this.pathname.split("/").filter(Boolean);
          parts[0] = v;
          this.pathname = parts.join("/");
        }
        get rkey() {
          return this.pathname.split("/").filter(Boolean)[1] || "";
        }
        set rkey(v) {
          const parts = this.pathname.split("/").filter(Boolean);
          if (!parts[0])
            parts[0] = "undefined";
          parts[1] = v;
          this.pathname = parts.join("/");
        }
        get href() {
          return this.toString();
        }
        toString() {
          let path = this.pathname || "/";
          if (!path.startsWith("/")) {
            path = `/${path}`;
          }
          let qs = this.searchParams.toString();
          if (qs && !qs.startsWith("?")) {
            qs = `?${qs}`;
          }
          let hash = this.hash;
          if (hash && !hash.startsWith("#")) {
            hash = `#${hash}`;
          }
          return `at://${this.host}${path}${qs}${hash}`;
        }
      };
      exports.AtUri = AtUri2;
      function parse(str) {
        const match = exports.ATP_URI_REGEX.exec(str);
        if (match) {
          return {
            hash: match[5] || "",
            host: match[2] || "",
            pathname: match[3] || "",
            searchParams: new URLSearchParams(match[4] || "")
          };
        }
        return void 0;
      }
      function parseRelative(str) {
        const match = RELATIVE_REGEX.exec(str);
        if (match) {
          return {
            hash: match[3] || "",
            pathname: match[1] || "",
            searchParams: new URLSearchParams(match[2] || "")
          };
        }
        return void 0;
      }
    }
  });

  // node_modules/.pnpm/@atproto+syntax@0.3.1/node_modules/@atproto/syntax/dist/tid.js
  var require_tid = __commonJS({
    "node_modules/.pnpm/@atproto+syntax@0.3.1/node_modules/@atproto/syntax/dist/tid.js"(exports) {
      "use strict";
      Object.defineProperty(exports, "__esModule", { value: true });
      exports.InvalidTidError = exports.isValidTid = exports.ensureValidTid = void 0;
      var ensureValidTid = (tid) => {
        if (tid.length !== 13) {
          throw new InvalidTidError("TID must be 13 characters");
        }
        if (!/^[234567abcdefghij][234567abcdefghijklmnopqrstuvwxyz]{12}$/.test(tid)) {
          throw new InvalidTidError("TID syntax not valid (regex)");
        }
      };
      exports.ensureValidTid = ensureValidTid;
      var isValidTid = (tid) => {
        try {
          (0, exports.ensureValidTid)(tid);
        } catch (err) {
          if (err instanceof InvalidTidError) {
            return false;
          }
          throw err;
        }
        return true;
      };
      exports.isValidTid = isValidTid;
      var InvalidTidError = class extends Error {
      };
      exports.InvalidTidError = InvalidTidError;
    }
  });

  // node_modules/.pnpm/@atproto+syntax@0.3.1/node_modules/@atproto/syntax/dist/recordkey.js
  var require_recordkey = __commonJS({
    "node_modules/.pnpm/@atproto+syntax@0.3.1/node_modules/@atproto/syntax/dist/recordkey.js"(exports) {
      "use strict";
      Object.defineProperty(exports, "__esModule", { value: true });
      exports.InvalidRecordKeyError = exports.isValidRecordKey = exports.ensureValidRecordKey = void 0;
      var ensureValidRecordKey = (rkey) => {
        if (rkey.length > 512 || rkey.length < 1) {
          throw new InvalidRecordKeyError("record key must be 1 to 512 characters");
        }
        if (!/^[a-zA-Z0-9_~.:-]{1,512}$/.test(rkey)) {
          throw new InvalidRecordKeyError("record key syntax not valid (regex)");
        }
        if (rkey === "." || rkey === "..")
          throw new InvalidRecordKeyError('record key can not be "." or ".."');
      };
      exports.ensureValidRecordKey = ensureValidRecordKey;
      var isValidRecordKey = (rkey) => {
        try {
          (0, exports.ensureValidRecordKey)(rkey);
        } catch (err) {
          if (err instanceof InvalidRecordKeyError) {
            return false;
          }
          throw err;
        }
        return true;
      };
      exports.isValidRecordKey = isValidRecordKey;
      var InvalidRecordKeyError = class extends Error {
      };
      exports.InvalidRecordKeyError = InvalidRecordKeyError;
    }
  });

  // node_modules/.pnpm/@atproto+syntax@0.3.1/node_modules/@atproto/syntax/dist/datetime.js
  var require_datetime = __commonJS({
    "node_modules/.pnpm/@atproto+syntax@0.3.1/node_modules/@atproto/syntax/dist/datetime.js"(exports) {
      "use strict";
      Object.defineProperty(exports, "__esModule", { value: true });
      exports.InvalidDatetimeError = exports.normalizeDatetimeAlways = exports.normalizeDatetime = exports.isValidDatetime = exports.ensureValidDatetime = void 0;
      var ensureValidDatetime = (dtStr) => {
        const date = new Date(dtStr);
        if (isNaN(date.getTime())) {
          throw new InvalidDatetimeError("datetime did not parse as ISO 8601");
        }
        if (date.toISOString().startsWith("-")) {
          throw new InvalidDatetimeError("datetime normalized to a negative time");
        }
        if (!/^[0-9]{4}-[01][0-9]-[0-3][0-9]T[0-2][0-9]:[0-6][0-9]:[0-6][0-9](.[0-9]{1,20})?(Z|([+-][0-2][0-9]:[0-5][0-9]))$/.test(dtStr)) {
          throw new InvalidDatetimeError("datetime didn't validate via regex");
        }
        if (dtStr.length > 64) {
          throw new InvalidDatetimeError("datetime is too long (64 chars max)");
        }
        if (dtStr.endsWith("-00:00")) {
          throw new InvalidDatetimeError('datetime can not use "-00:00" for UTC timezone');
        }
        if (dtStr.startsWith("000")) {
          throw new InvalidDatetimeError("datetime so close to year zero not allowed");
        }
      };
      exports.ensureValidDatetime = ensureValidDatetime;
      var isValidDatetime = (dtStr) => {
        try {
          (0, exports.ensureValidDatetime)(dtStr);
        } catch (err) {
          if (err instanceof InvalidDatetimeError) {
            return false;
          }
          throw err;
        }
        return true;
      };
      exports.isValidDatetime = isValidDatetime;
      var normalizeDatetime = (dtStr) => {
        if ((0, exports.isValidDatetime)(dtStr)) {
          const outStr = new Date(dtStr).toISOString();
          if ((0, exports.isValidDatetime)(outStr)) {
            return outStr;
          }
        }
        if (!/.*(([+-]\d\d:?\d\d)|[a-zA-Z])$/.test(dtStr)) {
          const date2 = /* @__PURE__ */ new Date(dtStr + "Z");
          if (!isNaN(date2.getTime())) {
            const tzStr = date2.toISOString();
            if ((0, exports.isValidDatetime)(tzStr)) {
              return tzStr;
            }
          }
        }
        const date = new Date(dtStr);
        if (isNaN(date.getTime())) {
          throw new InvalidDatetimeError("datetime did not parse as any timestamp format");
        }
        const isoStr = date.toISOString();
        if ((0, exports.isValidDatetime)(isoStr)) {
          return isoStr;
        } else {
          throw new InvalidDatetimeError("datetime normalized to invalid timestamp string");
        }
      };
      exports.normalizeDatetime = normalizeDatetime;
      var normalizeDatetimeAlways = (dtStr) => {
        try {
          return (0, exports.normalizeDatetime)(dtStr);
        } catch (err) {
          if (err instanceof InvalidDatetimeError) {
            return (/* @__PURE__ */ new Date(0)).toISOString();
          }
          throw err;
        }
      };
      exports.normalizeDatetimeAlways = normalizeDatetimeAlways;
      var InvalidDatetimeError = class extends Error {
      };
      exports.InvalidDatetimeError = InvalidDatetimeError;
    }
  });

  // node_modules/.pnpm/@atproto+syntax@0.3.1/node_modules/@atproto/syntax/dist/index.js
  var require_dist = __commonJS({
    "node_modules/.pnpm/@atproto+syntax@0.3.1/node_modules/@atproto/syntax/dist/index.js"(exports) {
      "use strict";
      var __createBinding = exports && exports.__createBinding || (Object.create ? function(o, m, k, k2) {
        if (k2 === void 0) k2 = k;
        var desc = Object.getOwnPropertyDescriptor(m, k);
        if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
          desc = { enumerable: true, get: function() {
            return m[k];
          } };
        }
        Object.defineProperty(o, k2, desc);
      } : function(o, m, k, k2) {
        if (k2 === void 0) k2 = k;
        o[k2] = m[k];
      });
      var __exportStar = exports && exports.__exportStar || function(m, exports2) {
        for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports2, p)) __createBinding(exports2, m, p);
      };
      Object.defineProperty(exports, "__esModule", { value: true });
      __exportStar(require_handle(), exports);
      __exportStar(require_did(), exports);
      __exportStar(require_nsid(), exports);
      __exportStar(require_aturi(), exports);
      __exportStar(require_tid(), exports);
      __exportStar(require_recordkey(), exports);
      __exportStar(require_datetime(), exports);
    }
  });

  // src/main.ts
  var import_gm_fetch = __toESM(require_GM_fetch(), 1);

  // node_modules/.pnpm/@atcute+client@2.0.6/node_modules/@atcute/client/dist/fetch-handler.js
  var buildFetchHandler = (handler) => {
    if (typeof handler === "object") {
      return handler.handle.bind(handler);
    }
    return handler;
  };
  var simpleFetchHandler = ({ service, fetch: _fetch = fetch }) => {
    return async (pathname, init) => {
      const url = new URL(pathname, service);
      return _fetch(url, init);
    };
  };

  // node_modules/.pnpm/@atcute+client@2.0.6/node_modules/@atcute/client/dist/utils/http.js
  var mergeHeaders = (init, defaults) => {
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

  // node_modules/.pnpm/@atcute+client@2.0.6/node_modules/@atcute/client/dist/rpc.js
  var XRPCError = class extends Error {
    constructor(status, { kind = `HTTP error ${status}`, description = `Unspecified error description`, headers, cause } = {}) {
      super(`${kind} > ${description}`, { cause });
      this.name = "XRPCError";
      this.status = status;
      this.kind = kind;
      this.description = description;
      this.headers = headers || {};
    }
  };
  var XRPC = class {
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
      return this.request({ type: "get", nsid, ...options });
    }
    /**
     * Makes a procedure (POST) request
     * @param nsid Namespace ID of a procedure endpoint
     * @param options Options to include like input body or parameters
     * @returns The response of the request
     */
    call(nsid, options) {
      return this.request({ type: "post", nsid, ...options });
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
          "content-type": isInputJson ? "application/json" : null,
          "atproto-proxy": constructProxyHeader(this.proxy)
        })
      });
      const responseStatus = response.status;
      const responseHeaders = Object.fromEntries(response.headers);
      const responseType = responseHeaders["content-type"];
      let promise;
      let ret;
      if (responseType) {
        if (responseType.startsWith("application/json")) {
          promise = response.json();
        } else if (responseType.startsWith("text/")) {
          promise = response.text();
        }
      }
      try {
        ret = await (promise || response.arrayBuffer().then((buffer) => new Uint8Array(buffer)));
      } catch (err) {
        throw new XRPCError(2, {
          cause: err,
          kind: "InvalidResponse",
          description: `Failed to parse response body`,
          headers: responseHeaders
        });
      }
      if (responseStatus === 200) {
        return {
          data: ret,
          headers: responseHeaders
        };
      }
      if (isErrorResponse(ret)) {
        throw new XRPCError(responseStatus, {
          kind: ret.error,
          description: ret.message,
          headers: responseHeaders
        });
      }
      throw new XRPCError(responseStatus, { headers: responseHeaders });
    }
  };
  var constructProxyHeader = (proxy) => {
    if (proxy) {
      return `${proxy.service}#${proxy.type}`;
    }
    return null;
  };
  var constructSearchParams = (params) => {
    let searchParams;
    for (const key in params) {
      const value = params[key];
      if (value !== void 0) {
        searchParams ??= new URLSearchParams();
        if (Array.isArray(value)) {
          for (let idx = 0, len = value.length; idx < len; idx++) {
            const val = value[idx];
            searchParams.append(key, "" + val);
          }
        } else {
          searchParams.set(key, "" + value);
        }
      }
    }
    return searchParams ? `?` + searchParams.toString() : "";
  };
  var isJsonValue = (o) => {
    if (typeof o !== "object" || o === null) {
      return false;
    }
    if ("toJSON" in o) {
      return true;
    }
    const proto = Object.getPrototypeOf(o);
    return proto === null || proto === Object.prototype;
  };
  var isErrorResponse = (value) => {
    if (typeof value !== "object" || value === null) {
      return false;
    }
    const kindType = typeof value.error;
    const messageType = typeof value.message;
    return (kindType === "undefined" || kindType === "string") && (messageType === "undefined" || messageType === "string");
  };

  // node_modules/.pnpm/@atcute+client@2.0.6/node_modules/@atcute/client/dist/utils/did.js
  var getPdsEndpoint = (doc) => {
    return getServiceEndpoint(doc, "#atproto_pds", "AtprotoPersonalDataServer");
  };
  var getServiceEndpoint = (doc, serviceId, serviceType) => {
    const did = doc.id;
    const didServiceId = did + serviceId;
    const found = doc.service?.find((service) => service.id === serviceId || service.id === didServiceId);
    if (!found || found.type !== serviceType || typeof found.serviceEndpoint !== "string") {
      return void 0;
    }
    return validateUrl(found.serviceEndpoint);
  };
  var validateUrl = (urlStr) => {
    let url;
    try {
      url = new URL(urlStr);
    } catch {
      return void 0;
    }
    const proto = url.protocol;
    if (url.hostname && (proto === "http:" || proto === "https:")) {
      return urlStr;
    }
  };

  // node_modules/.pnpm/@atcute+client@2.0.6/node_modules/@atcute/client/dist/utils/jwt.js
  var decodeJwt = (token) => {
    const pos = 1;
    const part = token.split(".")[1];
    let decoded;
    if (typeof part !== "string") {
      throw new Error("invalid token: missing part " + (pos + 1));
    }
    try {
      decoded = base64UrlDecode(part);
    } catch (e) {
      throw new Error("invalid token: invalid b64 for part " + (pos + 1) + " (" + e.message + ")");
    }
    try {
      return JSON.parse(decoded);
    } catch (e) {
      throw new Error("invalid token: invalid json for part " + (pos + 1) + " (" + e.message + ")");
    }
  };
  var base64UrlDecode = (str) => {
    let output = str.replace(/-/g, "+").replace(/_/g, "/");
    switch (output.length % 4) {
      case 0:
        break;
      case 2:
        output += "==";
        break;
      case 3:
        output += "=";
        break;
      default:
        throw new Error("base64 string is not of the correct length");
    }
    try {
      return b64DecodeUnicode(output);
    } catch {
      return atob(output);
    }
  };
  var b64DecodeUnicode = (str) => {
    return decodeURIComponent(atob(str).replace(/(.)/g, (_m, p) => {
      let code = p.charCodeAt(0).toString(16).toUpperCase();
      if (code.length < 2) {
        code = "0" + code;
      }
      return "%" + code;
    }));
  };

  // node_modules/.pnpm/@atcute+client@2.0.6/node_modules/@atcute/client/dist/credential-manager.js
  var CredentialManager = class {
    #server;
    #refreshSessionPromise;
    #onExpired;
    #onRefresh;
    #onSessionUpdate;
    constructor({ service, onExpired, onRefresh, onSessionUpdate, fetch: _fetch = fetch }) {
      this.serviceUrl = service;
      this.fetch = _fetch;
      this.#server = new XRPC({ handler: simpleFetchHandler({ service, fetch: _fetch }) });
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
      if (!this.session || headers.has("authorization")) {
        return (0, this.fetch)(url, init);
      }
      headers.set("authorization", `Bearer ${this.session.accessJwt}`);
      const initialResponse = await (0, this.fetch)(url, { ...init, headers });
      const isExpired = await isExpiredTokenResponse(initialResponse);
      if (!isExpired) {
        return initialResponse;
      }
      try {
        await this.#refreshSession();
      } catch {
        return initialResponse;
      }
      if (!this.session || init.body instanceof ReadableStream) {
        return initialResponse;
      }
      headers.set("authorization", `Bearer ${this.session.accessJwt}`);
      return await (0, this.fetch)(url, { ...init, headers });
    }
    #refreshSession() {
      return this.#refreshSessionPromise ||= this.#refreshSessionInner().finally(() => this.#refreshSessionPromise = void 0);
    }
    async #refreshSessionInner() {
      const currentSession = this.session;
      if (!currentSession) {
        return;
      }
      try {
        const { data } = await this.#server.call("com.atproto.server.refreshSession", {
          headers: {
            authorization: `Bearer ${currentSession.refreshJwt}`
          }
        });
        this.#updateSession({ ...currentSession, ...data });
        this.#onRefresh?.(this.session);
      } catch (err) {
        if (err instanceof XRPCError) {
          const kind = err.kind;
          if (kind === "ExpiredToken" || kind === "InvalidToken") {
            this.session = void 0;
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
        pdsUri,
        email: raw.email,
        emailConfirmed: raw.emailConfirmed,
        emailAuthFactor: raw.emailConfirmed,
        active: raw.active ?? true,
        inactiveStatus: raw.status
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
      const now2 = Date.now() / 1e3 + 60 * 5;
      const refreshToken = decodeJwt(session.refreshJwt);
      if (now2 >= refreshToken.exp) {
        throw new XRPCError(401, { kind: "InvalidToken" });
      }
      const accessToken = decodeJwt(session.accessJwt);
      this.session = session;
      if (now2 >= accessToken.exp) {
        await this.#refreshSession();
      } else {
        const promise = this.#server.get("com.atproto.server.getSession", {
          headers: {
            authorization: `Bearer ${session.accessJwt}`
          }
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
        throw new XRPCError(401, { kind: "InvalidToken" });
      }
      return this.session;
    }
    /**
     * Perform a login operation
     * @param options Login options
     * @returns Session data that can be saved for later
     */
    async login(options) {
      this.session = void 0;
      const res = await this.#server.call("com.atproto.server.createSession", {
        data: {
          identifier: options.identifier,
          password: options.password,
          authFactorToken: options.code
        }
      });
      return this.#updateSession(res.data);
    }
  };
  var isExpiredTokenResponse = async (response) => {
    if (response.status !== 400) {
      return false;
    }
    if (extractContentType(response.headers) !== "application/json") {
      return false;
    }
    if (extractContentLength(response.headers) > 54 * 1.5) {
      return false;
    }
    try {
      const { error, message } = await response.clone().json();
      return error === "ExpiredToken" && (typeof message === "string" || message === void 0);
    } catch {
    }
    return false;
  };
  var extractContentType = (headers) => {
    return headers.get("content-type")?.split(";")[0]?.trim();
  };
  var extractContentLength = (headers) => {
    return Number(headers.get("content-length") ?? ";");
  };

  // node_modules/.pnpm/kitty-agent@8.3.0_@atcute+cid@2.1.0_@atcute+client@2.0.6_@atcute+oauth-browser-client@1.0.9_@atproto+syntax@0.3.1/node_modules/kitty-agent/out/agent.js
  var import_syntax = __toESM(require_dist(), 1);

  // node_modules/.pnpm/kitty-agent@8.3.0_@atcute+cid@2.1.0_@atcute+client@2.0.6_@atcute+oauth-browser-client@1.0.9_@atproto+syntax@0.3.1/node_modules/kitty-agent/out/handles/did-document.js
  function getPdsEndpoint2(doc) {
    return getServiceEndpoint2(doc, "#atproto_pds", "AtprotoPersonalDataServer");
  }
  function getServiceEndpoint2(doc, serviceId, serviceType) {
    const did = doc.id;
    const didServiceId = did + serviceId;
    const found = doc.service?.find((service) => service.id === serviceId || service.id === didServiceId);
    if (!found || found.type !== serviceType || typeof found.serviceEndpoint !== "string") {
      return void 0;
    }
    return validateUrl2(found.serviceEndpoint);
  }
  function validateUrl2(urlStr) {
    let url;
    try {
      url = new URL(urlStr);
    } catch {
      return void 0;
    }
    const proto = url.protocol;
    if (url.hostname && (proto === "http:" || proto === "https:")) {
      return urlStr;
    }
  }
  async function getDidDocument(did) {
    const colon_index = did.indexOf(":", 4);
    const type = did.slice(4, colon_index);
    const ident = did.slice(colon_index + 1);
    let doc;
    if (type === "plc") {
      const response = await fetch(`https://plc.directory/${did}`);
      if (response.status === 404) {
        throw new Error("did not found in directory");
      }
      if (!response.ok) {
        throw new Error("directory is unreachable");
      }
      const json = await response.json();
      doc = json;
    } else if (type === "web") {
      const DID_WEB_RE = /^([a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*(?:\.[a-zA-Z]{2,}))$/;
      if (!DID_WEB_RE.test(ident)) {
        throw new Error("invalid identifier");
      }
      const response = await fetch(`https://${ident}/.well-known/did.json`);
      if (!response.ok) {
        throw new Error("did document is unreachable");
      }
      const json = await response.json();
      doc = json;
    } else {
      throw new Error("unsupported did method");
    }
    return doc;
  }

  // node_modules/.pnpm/kitty-agent@8.3.0_@atcute+cid@2.1.0_@atcute+client@2.0.6_@atcute+oauth-browser-client@1.0.9_@atproto+syntax@0.3.1/node_modules/kitty-agent/out/handles/index.js
  var isDid = (did) => {
    return /^did:([a-z]+):([a-zA-Z0-9._:%-]*[a-zA-Z0-9._-])$/.test(did);
  };

  // node_modules/.pnpm/kitty-agent@8.3.0_@atcute+cid@2.1.0_@atcute+client@2.0.6_@atcute+oauth-browser-client@1.0.9_@atproto+syntax@0.3.1/node_modules/kitty-agent/out/handles/doh.js
  var SUBDOMAIN = "_atproto";
  var PREFIX = "did=";
  var resolveHandleViaDoH = async (handle) => {
    const url = new URL("https://mozilla.cloudflare-dns.com/dns-query");
    url.searchParams.set("type", "TXT");
    url.searchParams.set("name", `${SUBDOMAIN}.${handle}`);
    const response = await fetch(url, {
      method: "GET",
      headers: { accept: "application/dns-json" },
      redirect: "follow"
    });
    const type = response.headers.get("content-type")?.trim();
    if (!response.ok) {
      const message = type?.startsWith("text/plain") ? await response.text() : `failed to resolve ${handle}`;
      throw new Error(message);
    }
    if (type !== "application/dns-json") {
      throw new Error("unexpected response from DoH server");
    }
    const result = asResult(await response.json());
    const answers = result.Answer?.filter(isAnswerTxt).map(extractTxtData) ?? [];
    for (let i = 0; i < answers.length; i++) {
      if (!answers[i].startsWith(PREFIX)) {
        continue;
      }
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
  var isResult = (result) => {
    if (result === null || typeof result !== "object") {
      return false;
    }
    return "Status" in result && typeof result.Status === "number" && (!("Answer" in result) || Array.isArray(result.Answer) && result.Answer.every(isAnswer));
  };
  var asResult = (result) => {
    if (!isResult(result)) {
      throw new TypeError("unexpected DoH response");
    }
    return result;
  };
  var isAnswer = (answer) => {
    if (answer === null || typeof answer !== "object") {
      return false;
    }
    return "name" in answer && typeof answer.name === "string" && "type" in answer && typeof answer.type === "number" && "data" in answer && typeof answer.data === "string" && "TTL" in answer && typeof answer.TTL === "number";
  };
  var isAnswerTxt = (answer) => {
    return answer.type === 16;
  };
  var extractTxtData = (answer) => {
    return answer.data.replace(/^"|"$/g, "").replace(/\\"/g, '"');
  };

  // node_modules/.pnpm/kitty-agent@8.3.0_@atcute+cid@2.1.0_@atcute+client@2.0.6_@atcute+oauth-browser-client@1.0.9_@atproto+syntax@0.3.1/node_modules/kitty-agent/out/handles/http.js
  var resolveHandleViaHttp = async (handle) => {
    const url = new URL("/.well-known/atproto-did", `https://${handle}`);
    const response = await fetch(url, { redirect: "error" });
    if (!response.ok) {
      throw new Error("domain is unreachable");
    }
    const text = await response.text();
    const did = text.split("\n")[0].trim();
    if (isDid(did)) {
      return did;
    }
    throw new Error(`failed to resolve ${handle}`);
  };

  // node_modules/.pnpm/kitty-agent@8.3.0_@atcute+cid@2.1.0_@atcute+client@2.0.6_@atcute+oauth-browser-client@1.0.9_@atproto+syntax@0.3.1/node_modules/kitty-agent/out/handles/resolve.js
  var didCache = /* @__PURE__ */ new Map();
  async function resolveHandleAnonymously(handle) {
    if (isDid(handle))
      return handle;
    if (didCache.has(handle)) {
      return didCache.get(handle);
    }
    const results = await Promise.allSettled([
      resolveHandleViaHttp(handle),
      resolveHandleViaDoH(handle)
    ]);
    const did = results.find((p) => p.status === "fulfilled")?.value;
    if (did === void 0) {
      throw results;
    }
    didCache.set(handle, did);
    return did;
  }

  // node_modules/.pnpm/kitty-agent@8.3.0_@atcute+cid@2.1.0_@atcute+client@2.0.6_@atcute+oauth-browser-client@1.0.9_@atproto+syntax@0.3.1/node_modules/kitty-agent/out/pds-helpers.js
  var didPdsCache = /* @__PURE__ */ new Map();
  async function getDidAndPds(handleOrDid) {
    if (didPdsCache.has(handleOrDid)) {
      return didPdsCache.get(handleOrDid);
    }
    const did = await resolveHandleAnonymously(handleOrDid);
    const didDocument = await getDidDocument(did);
    const pds = getPdsEndpoint2(didDocument);
    if (!pds)
      throw new Error(`No PDS for ${handleOrDid} (${did})!`);
    didPdsCache.set(handleOrDid, { did, pds, didDocument });
    return { did, pds, didDocument };
  }

  // node_modules/.pnpm/kitty-agent@8.3.0_@atcute+cid@2.1.0_@atcute+client@2.0.6_@atcute+oauth-browser-client@1.0.9_@atproto+syntax@0.3.1/node_modules/kitty-agent/out/agent.js
  function isInvalidSwapError(err) {
    return err instanceof XRPCError && err.kind === "InvalidSwap";
  }
  function isRecordNotFoundError(err) {
    return err instanceof XRPCError && err.kind === "RecordNotFound";
  }
  function makeRecordTyped(record) {
    let memoizedAtUri;
    const uri = record.uri;
    return {
      ...record,
      value: record.value,
      get uri() {
        return memoizedAtUri ??= new import_syntax.AtUri(uri);
      }
    };
  }
  function makeRecordsTyped(value) {
    return {
      ...value,
      records: value.records.map(makeRecordTyped)
    };
  }
  var KittyAgent = class _KittyAgent {
    xrpc;
    constructor(opts) {
      this.xrpc = opts instanceof XRPC ? opts : new XRPC(opts);
    }
    /**
     * Gets a read-only client for bsky.social PDSes.
     */
    static createUnauthed(service = "https://bsky.social") {
      return new _KittyAgent({ handler: simpleFetchHandler({ service }) });
    }
    /**
     * Gets a read-only client for the Bluesky AppView.
     */
    static createAppview(service = "https://api.bsky.app") {
      return new _KittyAgent({ handler: simpleFetchHandler({ service }) });
    }
    static pdsAgentCache = /* @__PURE__ */ new Map();
    /**
     * Gets a read-only client for the PDS hosting a specific account via handle or DID.
     */
    static async getOrCreatePds(handleOrDid) {
      const did = await resolveHandleAnonymously(handleOrDid);
      const existingAgent = _KittyAgent.pdsAgentCache.get(did);
      if (existingAgent)
        return existingAgent;
      const didAndPds = await getDidAndPds(did);
      const agent = _KittyAgent.createUnauthed(didAndPds.pds);
      _KittyAgent.pdsAgentCache.set(did, agent);
      return agent;
    }
    /**
     * Gets an authenticated client for the PDS hosting a specific account via handle or DID.
     */
    static async createPdsWithCredentials(handleOrDid) {
      const { did, pds } = await getDidAndPds(handleOrDid);
      const manager = new CredentialManager({ service: pds });
      const agent = new _KittyAgent({ handler: manager });
      return { did, manager, agent };
    }
    /** Makes a request to the XRPC service */
    async request(options) {
      return await this.xrpc.request(options);
    }
    async query(nsid, ...args) {
      const [params, data] = args;
      const { data: outData } = await this.xrpc.get(nsid, { params, data });
      return outData;
    }
    async call(nsid, ...args) {
      const [data, params] = args;
      const { data: outData } = await this.xrpc.call(nsid, { params, data });
      return outData;
    }
    async get(params) {
      const data = makeRecordTyped(await this.query("com.atproto.repo.getRecord", params));
      return data;
    }
    async getBlob(params) {
      if (typeof params.cid !== "string") {
        params = {
          cid: params.cid.ref.$link,
          did: params.did
        };
      }
      const data = await this.query("com.atproto.sync.getBlob", params);
      return data;
    }
    /**
     * Atcute likes to return blobs as text sometimes. I don't know why yet. This returns them as binary if that
     * happens.
     */
    async getBlobAsBinary(params) {
      let blob = await this.getBlob(params);
      if (typeof blob === "string")
        blob = new TextEncoder().encode(blob);
      return blob;
    }
    /**
     * Atcute likes to return blobs as text sometimes. I don't know why yet. This returns them as text no matter what,
     * and also allows you to specify an encoding.
     */
    async getBlobAsText(params, encoding) {
      let blob = await this.getBlob(params);
      if (typeof blob !== "string")
        blob = new TextDecoder(encoding).decode(blob);
      return blob;
    }
    async tryGet(params) {
      try {
        return await this.get(params);
      } catch (err) {
        if (!isRecordNotFoundError(err))
          throw err;
        return {
          uri: void 0,
          value: void 0,
          cid: void 0
        };
      }
    }
    async list(params) {
      const data = makeRecordsTyped(await this.query("com.atproto.repo.listRecords", params));
      return data;
    }
    async put(params) {
      const data = await this.call("com.atproto.repo.putRecord", params);
      return data;
    }
    async uploadBlob(buf) {
      const data = await this.call("com.atproto.repo.uploadBlob", buf);
      return data.blob;
    }
    async trySwap(params) {
      try {
        await this.put(params);
        return true;
      } catch (err) {
        if (!isInvalidSwapError(err)) {
          throw err;
        }
        return false;
      }
    }
    async create(params) {
      const data = await this.call("com.atproto.repo.createRecord", params);
      return data;
    }
    async delete(params) {
      const data = await this.call("com.atproto.repo.deleteRecord", params);
      return data;
    }
    async paginationHelper(limit, key, query, getResults, resultsEqual) {
      const PER_PAGE = 100;
      const results = [];
      let cursor = void 0;
      do {
        const data = await query(cursor, limit === void 0 ? PER_PAGE : limit / PER_PAGE > 1 ? PER_PAGE : limit);
        const theseResults = getResults(data);
        if (!theseResults.length || theseResults.every((e) => results.find((e1) => resultsEqual(e1, e)))) {
          break;
        }
        if (limit !== void 0) {
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
      const data = makeRecordsTyped(await this.paginationHelper(params.limit, "records", async (cursor, limit) => await this.query("com.atproto.repo.listRecords", {
        repo: params.repo,
        collection: params.collection,
        limit,
        reverse: params.reverse ?? true,
        cursor
      }), (output) => output.records, (a, b) => a.uri === b.uri));
      return data;
    }
    async paginatedListBlobs(params) {
      return await this.paginationHelper(params.limit, "cids", async (cursor, limit) => await this.query("com.atproto.sync.listBlobs", {
        did: params.did,
        limit,
        cursor
      }), (output) => output.cids, (a, b) => a === b);
    }
    async paginatedListRepos(params) {
      return await this.paginationHelper(params.limit, "repos", async (cursor, limit) => await this.query("com.atproto.sync.listRepos", {
        limit,
        cursor
      }), (output) => output.repos, (a, b) => a.did === b.did);
    }
    async batchWrite(params) {
      return await this.call("com.atproto.repo.applyWrites", params);
    }
    async resolveHandle(handle) {
      if (handle.startsWith("did:"))
        return handle;
      const { did } = await this.query("com.atproto.identity.resolveHandle", {
        handle
      });
      return did;
    }
  };

  // node_modules/.pnpm/@atcute+multibase@1.1.1/node_modules/@atcute/multibase/dist/utils.js
  var createRfc4648Encode = (alphabet2, bitsPerChar, pad) => {
    return (bytes) => {
      const mask = (1 << bitsPerChar) - 1;
      let str = "";
      let bits = 0;
      let buffer = 0;
      for (let i = 0; i < bytes.length; ++i) {
        buffer = buffer << 8 | bytes[i];
        bits += 8;
        while (bits > bitsPerChar) {
          bits -= bitsPerChar;
          str += alphabet2[mask & buffer >> bits];
        }
      }
      if (bits !== 0) {
        str += alphabet2[mask & buffer << bitsPerChar - bits];
      }
      if (pad) {
        while ((str.length * bitsPerChar & 7) !== 0) {
          str += "=";
        }
      }
      return str;
    };
  };

  // node_modules/.pnpm/@atcute+multibase@1.1.1/node_modules/@atcute/multibase/dist/bases/base64.js
  var HAS_UINT8_BASE64_SUPPORT = "fromBase64" in Uint8Array;
  var BASE64_CHARSET = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/";
  var toBase64 = !HAS_UINT8_BASE64_SUPPORT ? /* @__PURE__ */ createRfc4648Encode(BASE64_CHARSET, 6, false) : (bytes) => {
    return bytes.toBase64({ alphabet: "base64", omitPadding: true });
  };

  // node_modules/.pnpm/@scure+base@1.2.1/node_modules/@scure/base/lib/esm/index.js
  function isBytes(a) {
    return a instanceof Uint8Array || ArrayBuffer.isView(a) && a.constructor.name === "Uint8Array";
  }
  function isArrayOf(isString, arr) {
    if (!Array.isArray(arr))
      return false;
    if (arr.length === 0)
      return true;
    if (isString) {
      return arr.every((item) => typeof item === "string");
    } else {
      return arr.every((item) => Number.isSafeInteger(item));
    }
  }
  function afn(input) {
    if (typeof input !== "function")
      throw new Error("function expected");
    return true;
  }
  function astr(label, input) {
    if (typeof input !== "string")
      throw new Error(`${label}: string expected`);
    return true;
  }
  function anumber(n) {
    if (!Number.isSafeInteger(n))
      throw new Error(`invalid integer: ${n}`);
  }
  function aArr(input) {
    if (!Array.isArray(input))
      throw new Error("array expected");
  }
  function astrArr(label, input) {
    if (!isArrayOf(true, input))
      throw new Error(`${label}: array of strings expected`);
  }
  function anumArr(label, input) {
    if (!isArrayOf(false, input))
      throw new Error(`${label}: array of numbers expected`);
  }
  // @__NO_SIDE_EFFECTS__
  function chain(...args) {
    const id = (a) => a;
    const wrap = (a, b) => (c) => a(b(c));
    const encode = args.map((x) => x.encode).reduceRight(wrap, id);
    const decode = args.map((x) => x.decode).reduce(wrap, id);
    return { encode, decode };
  }
  // @__NO_SIDE_EFFECTS__
  function alphabet(letters) {
    const lettersA = typeof letters === "string" ? letters.split("") : letters;
    const len = lettersA.length;
    astrArr("alphabet", lettersA);
    const indexes = new Map(lettersA.map((l, i) => [l, i]));
    return {
      encode: (digits) => {
        aArr(digits);
        return digits.map((i) => {
          if (!Number.isSafeInteger(i) || i < 0 || i >= len)
            throw new Error(`alphabet.encode: digit index outside alphabet "${i}". Allowed: ${letters}`);
          return lettersA[i];
        });
      },
      decode: (input) => {
        aArr(input);
        return input.map((letter) => {
          astr("alphabet.decode", letter);
          const i = indexes.get(letter);
          if (i === void 0)
            throw new Error(`Unknown letter: "${letter}". Allowed: ${letters}`);
          return i;
        });
      }
    };
  }
  // @__NO_SIDE_EFFECTS__
  function join(separator = "") {
    astr("join", separator);
    return {
      encode: (from) => {
        astrArr("join.decode", from);
        return from.join(separator);
      },
      decode: (to) => {
        astr("join.decode", to);
        return to.split(separator);
      }
    };
  }
  var gcd = (a, b) => b === 0 ? a : gcd(b, a % b);
  var radix2carry = /* @__NO_SIDE_EFFECTS__ */ (from, to) => from + (to - gcd(from, to));
  var powers = /* @__PURE__ */ (() => {
    let res = [];
    for (let i = 0; i < 40; i++)
      res.push(2 ** i);
    return res;
  })();
  function convertRadix2(data, from, to, padding) {
    aArr(data);
    if (from <= 0 || from > 32)
      throw new Error(`convertRadix2: wrong from=${from}`);
    if (to <= 0 || to > 32)
      throw new Error(`convertRadix2: wrong to=${to}`);
    if (/* @__PURE__ */ radix2carry(from, to) > 32) {
      throw new Error(`convertRadix2: carry overflow from=${from} to=${to} carryBits=${/* @__PURE__ */ radix2carry(from, to)}`);
    }
    let carry = 0;
    let pos = 0;
    const max = powers[from];
    const mask = powers[to] - 1;
    const res = [];
    for (const n of data) {
      anumber(n);
      if (n >= max)
        throw new Error(`convertRadix2: invalid data word=${n} from=${from}`);
      carry = carry << from | n;
      if (pos + from > 32)
        throw new Error(`convertRadix2: carry overflow pos=${pos} from=${from}`);
      pos += from;
      for (; pos >= to; pos -= to)
        res.push((carry >> pos - to & mask) >>> 0);
      const pow3 = powers[pos];
      if (pow3 === void 0)
        throw new Error("invalid carry");
      carry &= pow3 - 1;
    }
    carry = carry << to - pos & mask;
    if (!padding && pos >= from)
      throw new Error("Excess padding");
    if (!padding && carry > 0)
      throw new Error(`Non-zero padding: ${carry}`);
    if (padding && pos > 0)
      res.push(carry >>> 0);
    return res;
  }
  // @__NO_SIDE_EFFECTS__
  function radix2(bits, revPadding = false) {
    anumber(bits);
    if (bits <= 0 || bits > 32)
      throw new Error("radix2: bits should be in (0..32]");
    if (/* @__PURE__ */ radix2carry(8, bits) > 32 || /* @__PURE__ */ radix2carry(bits, 8) > 32)
      throw new Error("radix2: carry overflow");
    return {
      encode: (bytes) => {
        if (!isBytes(bytes))
          throw new Error("radix2.encode input should be Uint8Array");
        return convertRadix2(Array.from(bytes), 8, bits, !revPadding);
      },
      decode: (digits) => {
        anumArr("radix2.decode", digits);
        return Uint8Array.from(convertRadix2(digits, bits, 8, revPadding));
      }
    };
  }
  function unsafeWrapper(fn) {
    afn(fn);
    return function(...args) {
      try {
        return fn.apply(null, args);
      } catch (e) {
      }
    };
  }
  var base64nopad = /* @__PURE__ */ chain(/* @__PURE__ */ radix2(6), /* @__PURE__ */ alphabet("ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/"), /* @__PURE__ */ join(""));
  var BECH_ALPHABET = /* @__PURE__ */ chain(/* @__PURE__ */ alphabet("qpzry9x8gf2tvdw0s3jn54khce6mua7l"), /* @__PURE__ */ join(""));
  var POLYMOD_GENERATORS = [996825010, 642813549, 513874426, 1027748829, 705979059];
  function bech32Polymod(pre) {
    const b = pre >> 25;
    let chk = (pre & 33554431) << 5;
    for (let i = 0; i < POLYMOD_GENERATORS.length; i++) {
      if ((b >> i & 1) === 1)
        chk ^= POLYMOD_GENERATORS[i];
    }
    return chk;
  }
  function bechChecksum(prefix, words, encodingConst = 1) {
    const len = prefix.length;
    let chk = 1;
    for (let i = 0; i < len; i++) {
      const c = prefix.charCodeAt(i);
      if (c < 33 || c > 126)
        throw new Error(`Invalid prefix (${prefix})`);
      chk = bech32Polymod(chk) ^ c >> 5;
    }
    chk = bech32Polymod(chk);
    for (let i = 0; i < len; i++)
      chk = bech32Polymod(chk) ^ prefix.charCodeAt(i) & 31;
    for (let v of words)
      chk = bech32Polymod(chk) ^ v;
    for (let i = 0; i < 6; i++)
      chk = bech32Polymod(chk);
    chk ^= encodingConst;
    return BECH_ALPHABET.encode(convertRadix2([chk % powers[30]], 30, 5, false));
  }
  // @__NO_SIDE_EFFECTS__
  function genBech32(encoding) {
    const ENCODING_CONST = encoding === "bech32" ? 1 : 734539939;
    const _words = /* @__PURE__ */ radix2(5);
    const fromWords = _words.decode;
    const toWords = _words.encode;
    const fromWordsUnsafe = unsafeWrapper(fromWords);
    function encode(prefix, words, limit = 90) {
      astr("bech32.encode prefix", prefix);
      if (isBytes(words))
        words = Array.from(words);
      anumArr("bech32.encode", words);
      const plen = prefix.length;
      if (plen === 0)
        throw new TypeError(`Invalid prefix length ${plen}`);
      const actualLength = plen + 7 + words.length;
      if (limit !== false && actualLength > limit)
        throw new TypeError(`Length ${actualLength} exceeds limit ${limit}`);
      const lowered = prefix.toLowerCase();
      const sum = bechChecksum(lowered, words, ENCODING_CONST);
      return `${lowered}1${BECH_ALPHABET.encode(words)}${sum}`;
    }
    function decode(str, limit = 90) {
      astr("bech32.decode input", str);
      const slen = str.length;
      if (slen < 8 || limit !== false && slen > limit)
        throw new TypeError(`invalid string length: ${slen} (${str}). Expected (8..${limit})`);
      const lowered = str.toLowerCase();
      if (str !== lowered && str !== str.toUpperCase())
        throw new Error(`String must be lowercase or uppercase`);
      const sepIndex = lowered.lastIndexOf("1");
      if (sepIndex === 0 || sepIndex === -1)
        throw new Error(`Letter "1" must be present between prefix and data only`);
      const prefix = lowered.slice(0, sepIndex);
      const data = lowered.slice(sepIndex + 1);
      if (data.length < 6)
        throw new Error("Data must be at least 6 characters long");
      const words = BECH_ALPHABET.decode(data).slice(0, -6);
      const sum = bechChecksum(prefix, words, ENCODING_CONST);
      if (!data.endsWith(sum))
        throw new Error(`Invalid checksum in ${str}: expected "${sum}"`);
      return { prefix, words };
    }
    const decodeUnsafe = unsafeWrapper(decode);
    function decodeToBytes(str) {
      const { prefix, words } = decode(str, false);
      return { prefix, words, bytes: fromWords(words) };
    }
    function encodeFromBytes(prefix, bytes) {
      return encode(prefix, toWords(bytes));
    }
    return {
      encode,
      decode,
      encodeFromBytes,
      decodeToBytes,
      decodeUnsafe,
      fromWords,
      fromWordsUnsafe,
      toWords
    };
  }
  var bech32 = /* @__PURE__ */ genBech32("bech32");

  // node_modules/.pnpm/@noble+hashes@1.7.0/node_modules/@noble/hashes/esm/_assert.js
  function anumber2(n) {
    if (!Number.isSafeInteger(n) || n < 0)
      throw new Error("positive integer expected, got " + n);
  }
  function isBytes2(a) {
    return a instanceof Uint8Array || ArrayBuffer.isView(a) && a.constructor.name === "Uint8Array";
  }
  function abytes(b, ...lengths) {
    if (!isBytes2(b))
      throw new Error("Uint8Array expected");
    if (lengths.length > 0 && !lengths.includes(b.length))
      throw new Error("Uint8Array expected of length " + lengths + ", got length=" + b.length);
  }
  function ahash(h) {
    if (typeof h !== "function" || typeof h.create !== "function")
      throw new Error("Hash should be wrapped by utils.wrapConstructor");
    anumber2(h.outputLen);
    anumber2(h.blockLen);
  }
  function aexists(instance, checkFinished = true) {
    if (instance.destroyed)
      throw new Error("Hash instance has been destroyed");
    if (checkFinished && instance.finished)
      throw new Error("Hash#digest() has already been called");
  }
  function aoutput(out, instance) {
    abytes(out);
    const min = instance.outputLen;
    if (out.length < min) {
      throw new Error("digestInto() expects output buffer of length at least " + min);
    }
  }

  // node_modules/.pnpm/@noble+hashes@1.7.0/node_modules/@noble/hashes/esm/crypto.js
  var crypto2 = typeof globalThis === "object" && "crypto" in globalThis ? globalThis.crypto : void 0;

  // node_modules/.pnpm/@noble+hashes@1.7.0/node_modules/@noble/hashes/esm/utils.js
  var u32 = (arr) => new Uint32Array(arr.buffer, arr.byteOffset, Math.floor(arr.byteLength / 4));
  var createView = (arr) => new DataView(arr.buffer, arr.byteOffset, arr.byteLength);
  var rotr = (word, shift) => word << 32 - shift | word >>> shift;
  var rotl = (word, shift) => word << shift | word >>> 32 - shift >>> 0;
  var isLE = /* @__PURE__ */ (() => new Uint8Array(new Uint32Array([287454020]).buffer)[0] === 68)();
  var byteSwap = (word) => word << 24 & 4278190080 | word << 8 & 16711680 | word >>> 8 & 65280 | word >>> 24 & 255;
  function byteSwap32(arr) {
    for (let i = 0; i < arr.length; i++) {
      arr[i] = byteSwap(arr[i]);
    }
  }
  function utf8ToBytes(str) {
    if (typeof str !== "string")
      throw new Error("utf8ToBytes expected string, got " + typeof str);
    return new Uint8Array(new TextEncoder().encode(str));
  }
  function toBytes(data) {
    if (typeof data === "string")
      data = utf8ToBytes(data);
    abytes(data);
    return data;
  }
  var Hash = class {
    // Safe version that clones internal state
    clone() {
      return this._cloneInto();
    }
  };
  function checkOpts(defaults, opts) {
    if (opts !== void 0 && {}.toString.call(opts) !== "[object Object]")
      throw new Error("Options should be object or undefined");
    const merged = Object.assign(defaults, opts);
    return merged;
  }
  function wrapConstructor(hashCons) {
    const hashC = (msg) => hashCons().update(toBytes(msg)).digest();
    const tmp = hashCons();
    hashC.outputLen = tmp.outputLen;
    hashC.blockLen = tmp.blockLen;
    hashC.create = () => hashCons();
    return hashC;
  }
  function randomBytes(bytesLength = 32) {
    if (crypto2 && typeof crypto2.getRandomValues === "function") {
      return crypto2.getRandomValues(new Uint8Array(bytesLength));
    }
    if (crypto2 && typeof crypto2.randomBytes === "function") {
      return crypto2.randomBytes(bytesLength);
    }
    throw new Error("crypto.getRandomValues must be defined");
  }

  // node_modules/.pnpm/@noble+hashes@1.7.0/node_modules/@noble/hashes/esm/hmac.js
  var HMAC = class extends Hash {
    constructor(hash, _key) {
      super();
      this.finished = false;
      this.destroyed = false;
      ahash(hash);
      const key = toBytes(_key);
      this.iHash = hash.create();
      if (typeof this.iHash.update !== "function")
        throw new Error("Expected instance of class which extends utils.Hash");
      this.blockLen = this.iHash.blockLen;
      this.outputLen = this.iHash.outputLen;
      const blockLen = this.blockLen;
      const pad = new Uint8Array(blockLen);
      pad.set(key.length > blockLen ? hash.create().update(key).digest() : key);
      for (let i = 0; i < pad.length; i++)
        pad[i] ^= 54;
      this.iHash.update(pad);
      this.oHash = hash.create();
      for (let i = 0; i < pad.length; i++)
        pad[i] ^= 54 ^ 92;
      this.oHash.update(pad);
      pad.fill(0);
    }
    update(buf) {
      aexists(this);
      this.iHash.update(buf);
      return this;
    }
    digestInto(out) {
      aexists(this);
      abytes(out, this.outputLen);
      this.finished = true;
      this.iHash.digestInto(out);
      this.oHash.update(out);
      this.oHash.digestInto(out);
      this.destroy();
    }
    digest() {
      const out = new Uint8Array(this.oHash.outputLen);
      this.digestInto(out);
      return out;
    }
    _cloneInto(to) {
      to || (to = Object.create(Object.getPrototypeOf(this), {}));
      const { oHash, iHash, finished, destroyed, blockLen, outputLen } = this;
      to = to;
      to.finished = finished;
      to.destroyed = destroyed;
      to.blockLen = blockLen;
      to.outputLen = outputLen;
      to.oHash = oHash._cloneInto(to.oHash);
      to.iHash = iHash._cloneInto(to.iHash);
      return to;
    }
    destroy() {
      this.destroyed = true;
      this.oHash.destroy();
      this.iHash.destroy();
    }
  };
  var hmac = (hash, key, message) => new HMAC(hash, key).update(message).digest();
  hmac.create = (hash, key) => new HMAC(hash, key);

  // node_modules/.pnpm/@noble+hashes@1.7.0/node_modules/@noble/hashes/esm/hkdf.js
  function extract(hash, ikm, salt) {
    ahash(hash);
    if (salt === void 0)
      salt = new Uint8Array(hash.outputLen);
    return hmac(hash, toBytes(salt), toBytes(ikm));
  }
  var HKDF_COUNTER = /* @__PURE__ */ new Uint8Array([0]);
  var EMPTY_BUFFER = /* @__PURE__ */ new Uint8Array();
  function expand(hash, prk, info, length = 32) {
    ahash(hash);
    anumber2(length);
    if (length > 255 * hash.outputLen)
      throw new Error("Length should be <= 255*HashLen");
    const blocks = Math.ceil(length / hash.outputLen);
    if (info === void 0)
      info = EMPTY_BUFFER;
    const okm = new Uint8Array(blocks * hash.outputLen);
    const HMAC2 = hmac.create(hash, prk);
    const HMACTmp = HMAC2._cloneInto();
    const T = new Uint8Array(HMAC2.outputLen);
    for (let counter = 0; counter < blocks; counter++) {
      HKDF_COUNTER[0] = counter + 1;
      HMACTmp.update(counter === 0 ? EMPTY_BUFFER : T).update(info).update(HKDF_COUNTER).digestInto(T);
      okm.set(T, hash.outputLen * counter);
      HMAC2._cloneInto(HMACTmp);
    }
    HMAC2.destroy();
    HMACTmp.destroy();
    T.fill(0);
    HKDF_COUNTER.fill(0);
    return okm.slice(0, length);
  }
  var hkdf = (hash, ikm, salt, info, length) => expand(hash, extract(hash, ikm, salt), info, length);

  // node_modules/.pnpm/@noble+hashes@1.7.0/node_modules/@noble/hashes/esm/_md.js
  function setBigUint64(view, byteOffset, value, isLE3) {
    if (typeof view.setBigUint64 === "function")
      return view.setBigUint64(byteOffset, value, isLE3);
    const _32n = BigInt(32);
    const _u32_max = BigInt(4294967295);
    const wh = Number(value >> _32n & _u32_max);
    const wl = Number(value & _u32_max);
    const h = isLE3 ? 4 : 0;
    const l = isLE3 ? 0 : 4;
    view.setUint32(byteOffset + h, wh, isLE3);
    view.setUint32(byteOffset + l, wl, isLE3);
  }
  var Chi = (a, b, c) => a & b ^ ~a & c;
  var Maj = (a, b, c) => a & b ^ a & c ^ b & c;
  var HashMD = class extends Hash {
    constructor(blockLen, outputLen, padOffset, isLE3) {
      super();
      this.blockLen = blockLen;
      this.outputLen = outputLen;
      this.padOffset = padOffset;
      this.isLE = isLE3;
      this.finished = false;
      this.length = 0;
      this.pos = 0;
      this.destroyed = false;
      this.buffer = new Uint8Array(blockLen);
      this.view = createView(this.buffer);
    }
    update(data) {
      aexists(this);
      const { view, buffer, blockLen } = this;
      data = toBytes(data);
      const len = data.length;
      for (let pos = 0; pos < len; ) {
        const take = Math.min(blockLen - this.pos, len - pos);
        if (take === blockLen) {
          const dataView = createView(data);
          for (; blockLen <= len - pos; pos += blockLen)
            this.process(dataView, pos);
          continue;
        }
        buffer.set(data.subarray(pos, pos + take), this.pos);
        this.pos += take;
        pos += take;
        if (this.pos === blockLen) {
          this.process(view, 0);
          this.pos = 0;
        }
      }
      this.length += data.length;
      this.roundClean();
      return this;
    }
    digestInto(out) {
      aexists(this);
      aoutput(out, this);
      this.finished = true;
      const { buffer, view, blockLen, isLE: isLE3 } = this;
      let { pos } = this;
      buffer[pos++] = 128;
      this.buffer.subarray(pos).fill(0);
      if (this.padOffset > blockLen - pos) {
        this.process(view, 0);
        pos = 0;
      }
      for (let i = pos; i < blockLen; i++)
        buffer[i] = 0;
      setBigUint64(view, blockLen - 8, BigInt(this.length * 8), isLE3);
      this.process(view, 0);
      const oview = createView(out);
      const len = this.outputLen;
      if (len % 4)
        throw new Error("_sha2: outputLen should be aligned to 32bit");
      const outLen = len / 4;
      const state = this.get();
      if (outLen > state.length)
        throw new Error("_sha2: outputLen bigger than state");
      for (let i = 0; i < outLen; i++)
        oview.setUint32(4 * i, state[i], isLE3);
    }
    digest() {
      const { buffer, outputLen } = this;
      this.digestInto(buffer);
      const res = buffer.slice(0, outputLen);
      this.destroy();
      return res;
    }
    _cloneInto(to) {
      to || (to = new this.constructor());
      to.set(...this.get());
      const { blockLen, buffer, length, finished, destroyed, pos } = this;
      to.length = length;
      to.pos = pos;
      to.finished = finished;
      to.destroyed = destroyed;
      if (length % blockLen)
        to.buffer.set(buffer);
      return to;
    }
  };

  // node_modules/.pnpm/@noble+hashes@1.7.0/node_modules/@noble/hashes/esm/sha256.js
  var SHA256_K = /* @__PURE__ */ new Uint32Array([
    1116352408,
    1899447441,
    3049323471,
    3921009573,
    961987163,
    1508970993,
    2453635748,
    2870763221,
    3624381080,
    310598401,
    607225278,
    1426881987,
    1925078388,
    2162078206,
    2614888103,
    3248222580,
    3835390401,
    4022224774,
    264347078,
    604807628,
    770255983,
    1249150122,
    1555081692,
    1996064986,
    2554220882,
    2821834349,
    2952996808,
    3210313671,
    3336571891,
    3584528711,
    113926993,
    338241895,
    666307205,
    773529912,
    1294757372,
    1396182291,
    1695183700,
    1986661051,
    2177026350,
    2456956037,
    2730485921,
    2820302411,
    3259730800,
    3345764771,
    3516065817,
    3600352804,
    4094571909,
    275423344,
    430227734,
    506948616,
    659060556,
    883997877,
    958139571,
    1322822218,
    1537002063,
    1747873779,
    1955562222,
    2024104815,
    2227730452,
    2361852424,
    2428436474,
    2756734187,
    3204031479,
    3329325298
  ]);
  var SHA256_IV = /* @__PURE__ */ new Uint32Array([
    1779033703,
    3144134277,
    1013904242,
    2773480762,
    1359893119,
    2600822924,
    528734635,
    1541459225
  ]);
  var SHA256_W = /* @__PURE__ */ new Uint32Array(64);
  var SHA256 = class extends HashMD {
    constructor() {
      super(64, 32, 8, false);
      this.A = SHA256_IV[0] | 0;
      this.B = SHA256_IV[1] | 0;
      this.C = SHA256_IV[2] | 0;
      this.D = SHA256_IV[3] | 0;
      this.E = SHA256_IV[4] | 0;
      this.F = SHA256_IV[5] | 0;
      this.G = SHA256_IV[6] | 0;
      this.H = SHA256_IV[7] | 0;
    }
    get() {
      const { A, B, C, D, E, F, G, H } = this;
      return [A, B, C, D, E, F, G, H];
    }
    // prettier-ignore
    set(A, B, C, D, E, F, G, H) {
      this.A = A | 0;
      this.B = B | 0;
      this.C = C | 0;
      this.D = D | 0;
      this.E = E | 0;
      this.F = F | 0;
      this.G = G | 0;
      this.H = H | 0;
    }
    process(view, offset) {
      for (let i = 0; i < 16; i++, offset += 4)
        SHA256_W[i] = view.getUint32(offset, false);
      for (let i = 16; i < 64; i++) {
        const W15 = SHA256_W[i - 15];
        const W2 = SHA256_W[i - 2];
        const s0 = rotr(W15, 7) ^ rotr(W15, 18) ^ W15 >>> 3;
        const s1 = rotr(W2, 17) ^ rotr(W2, 19) ^ W2 >>> 10;
        SHA256_W[i] = s1 + SHA256_W[i - 7] + s0 + SHA256_W[i - 16] | 0;
      }
      let { A, B, C, D, E, F, G, H } = this;
      for (let i = 0; i < 64; i++) {
        const sigma1 = rotr(E, 6) ^ rotr(E, 11) ^ rotr(E, 25);
        const T1 = H + sigma1 + Chi(E, F, G) + SHA256_K[i] + SHA256_W[i] | 0;
        const sigma0 = rotr(A, 2) ^ rotr(A, 13) ^ rotr(A, 22);
        const T2 = sigma0 + Maj(A, B, C) | 0;
        H = G;
        G = F;
        F = E;
        E = D + T1 | 0;
        D = C;
        C = B;
        B = A;
        A = T1 + T2 | 0;
      }
      A = A + this.A | 0;
      B = B + this.B | 0;
      C = C + this.C | 0;
      D = D + this.D | 0;
      E = E + this.E | 0;
      F = F + this.F | 0;
      G = G + this.G | 0;
      H = H + this.H | 0;
      this.set(A, B, C, D, E, F, G, H);
    }
    roundClean() {
      SHA256_W.fill(0);
    }
    destroy() {
      this.set(0, 0, 0, 0, 0, 0, 0, 0);
      this.buffer.fill(0);
    }
  };
  var sha256 = /* @__PURE__ */ wrapConstructor(() => new SHA256());

  // node_modules/.pnpm/@noble+curves@1.8.0/node_modules/@noble/curves/esm/abstract/utils.js
  var _0n = /* @__PURE__ */ BigInt(0);
  function isBytes3(a) {
    return a instanceof Uint8Array || ArrayBuffer.isView(a) && a.constructor.name === "Uint8Array";
  }
  function abytes2(item) {
    if (!isBytes3(item))
      throw new Error("Uint8Array expected");
  }
  var hexes = /* @__PURE__ */ Array.from({ length: 256 }, (_, i) => i.toString(16).padStart(2, "0"));
  function bytesToHex(bytes) {
    abytes2(bytes);
    let hex = "";
    for (let i = 0; i < bytes.length; i++) {
      hex += hexes[bytes[i]];
    }
    return hex;
  }
  function hexToNumber(hex) {
    if (typeof hex !== "string")
      throw new Error("hex string expected, got " + typeof hex);
    return hex === "" ? _0n : BigInt("0x" + hex);
  }
  var asciis = { _0: 48, _9: 57, A: 65, F: 70, a: 97, f: 102 };
  function asciiToBase16(ch) {
    if (ch >= asciis._0 && ch <= asciis._9)
      return ch - asciis._0;
    if (ch >= asciis.A && ch <= asciis.F)
      return ch - (asciis.A - 10);
    if (ch >= asciis.a && ch <= asciis.f)
      return ch - (asciis.a - 10);
    return;
  }
  function hexToBytes(hex) {
    if (typeof hex !== "string")
      throw new Error("hex string expected, got " + typeof hex);
    const hl = hex.length;
    const al = hl / 2;
    if (hl % 2)
      throw new Error("hex string expected, got unpadded hex of length " + hl);
    const array = new Uint8Array(al);
    for (let ai = 0, hi = 0; ai < al; ai++, hi += 2) {
      const n1 = asciiToBase16(hex.charCodeAt(hi));
      const n2 = asciiToBase16(hex.charCodeAt(hi + 1));
      if (n1 === void 0 || n2 === void 0) {
        const char = hex[hi] + hex[hi + 1];
        throw new Error('hex string expected, got non-hex character "' + char + '" at index ' + hi);
      }
      array[ai] = n1 * 16 + n2;
    }
    return array;
  }
  function bytesToNumberLE(bytes) {
    abytes2(bytes);
    return hexToNumber(bytesToHex(Uint8Array.from(bytes).reverse()));
  }
  function numberToBytesBE(n, len) {
    return hexToBytes(n.toString(16).padStart(len * 2, "0"));
  }
  function numberToBytesLE(n, len) {
    return numberToBytesBE(n, len).reverse();
  }
  function ensureBytes(title, hex, expectedLength) {
    let res;
    if (typeof hex === "string") {
      try {
        res = hexToBytes(hex);
      } catch (e) {
        throw new Error(title + " must be hex string or Uint8Array, cause: " + e);
      }
    } else if (isBytes3(hex)) {
      res = Uint8Array.from(hex);
    } else {
      throw new Error(title + " must be hex string or Uint8Array");
    }
    const len = res.length;
    if (typeof expectedLength === "number" && len !== expectedLength)
      throw new Error(title + " of length " + expectedLength + " expected, got " + len);
    return res;
  }
  var isPosBig = (n) => typeof n === "bigint" && _0n <= n;
  function inRange(n, min, max) {
    return isPosBig(n) && isPosBig(min) && isPosBig(max) && min <= n && n < max;
  }
  function aInRange(title, n, min, max) {
    if (!inRange(n, min, max))
      throw new Error("expected valid " + title + ": " + min + " <= n < " + max + ", got " + n);
  }
  var validatorFns = {
    bigint: (val) => typeof val === "bigint",
    function: (val) => typeof val === "function",
    boolean: (val) => typeof val === "boolean",
    string: (val) => typeof val === "string",
    stringOrUint8Array: (val) => typeof val === "string" || isBytes3(val),
    isSafeInteger: (val) => Number.isSafeInteger(val),
    array: (val) => Array.isArray(val),
    field: (val, object) => object.Fp.isValid(val),
    hash: (val) => typeof val === "function" && Number.isSafeInteger(val.outputLen)
  };
  function validateObject(object, validators, optValidators = {}) {
    const checkField = (fieldName, type, isOptional) => {
      const checkVal = validatorFns[type];
      if (typeof checkVal !== "function")
        throw new Error("invalid validator function");
      const val = object[fieldName];
      if (isOptional && val === void 0)
        return;
      if (!checkVal(val, object)) {
        throw new Error("param " + String(fieldName) + " is invalid. Expected " + type + ", got " + val);
      }
    };
    for (const [fieldName, type] of Object.entries(validators))
      checkField(fieldName, type, false);
    for (const [fieldName, type] of Object.entries(optValidators))
      checkField(fieldName, type, true);
    return object;
  }

  // node_modules/.pnpm/@noble+curves@1.8.0/node_modules/@noble/curves/esm/abstract/modular.js
  var _0n2 = BigInt(0);
  var _1n = BigInt(1);
  function mod(a, b) {
    const result = a % b;
    return result >= _0n2 ? result : b + result;
  }
  function pow(num, power, modulo) {
    if (power < _0n2)
      throw new Error("invalid exponent, negatives unsupported");
    if (modulo <= _0n2)
      throw new Error("invalid modulus");
    if (modulo === _1n)
      return _0n2;
    let res = _1n;
    while (power > _0n2) {
      if (power & _1n)
        res = res * num % modulo;
      num = num * num % modulo;
      power >>= _1n;
    }
    return res;
  }
  function pow2(x, power, modulo) {
    let res = x;
    while (power-- > _0n2) {
      res *= res;
      res %= modulo;
    }
    return res;
  }

  // node_modules/.pnpm/@noble+curves@1.8.0/node_modules/@noble/curves/esm/abstract/montgomery.js
  var _0n3 = BigInt(0);
  var _1n2 = BigInt(1);
  function validateOpts(curve) {
    validateObject(curve, {
      a: "bigint"
    }, {
      montgomeryBits: "isSafeInteger",
      nByteLength: "isSafeInteger",
      adjustScalarBytes: "function",
      domain: "function",
      powPminus2: "function",
      Gu: "bigint"
    });
    return Object.freeze({ ...curve });
  }
  function montgomery(curveDef) {
    const CURVE = validateOpts(curveDef);
    const { P } = CURVE;
    const modP = (n) => mod(n, P);
    const montgomeryBits = CURVE.montgomeryBits;
    const montgomeryBytes = Math.ceil(montgomeryBits / 8);
    const fieldLen = CURVE.nByteLength;
    const adjustScalarBytes2 = CURVE.adjustScalarBytes || ((bytes) => bytes);
    const powPminus2 = CURVE.powPminus2 || ((x) => pow(x, P - BigInt(2), P));
    function cswap(swap, x_2, x_3) {
      const dummy = modP(swap * (x_2 - x_3));
      x_2 = modP(x_2 - dummy);
      x_3 = modP(x_3 + dummy);
      return [x_2, x_3];
    }
    const a24 = (CURVE.a - BigInt(2)) / BigInt(4);
    function montgomeryLadder(u, scalar) {
      aInRange("u", u, _0n3, P);
      aInRange("scalar", scalar, _0n3, P);
      const k = scalar;
      const x_1 = u;
      let x_2 = _1n2;
      let z_2 = _0n3;
      let x_3 = u;
      let z_3 = _1n2;
      let swap = _0n3;
      let sw;
      for (let t = BigInt(montgomeryBits - 1); t >= _0n3; t--) {
        const k_t = k >> t & _1n2;
        swap ^= k_t;
        sw = cswap(swap, x_2, x_3);
        x_2 = sw[0];
        x_3 = sw[1];
        sw = cswap(swap, z_2, z_3);
        z_2 = sw[0];
        z_3 = sw[1];
        swap = k_t;
        const A = x_2 + z_2;
        const AA = modP(A * A);
        const B = x_2 - z_2;
        const BB = modP(B * B);
        const E = AA - BB;
        const C = x_3 + z_3;
        const D = x_3 - z_3;
        const DA = modP(D * A);
        const CB = modP(C * B);
        const dacb = DA + CB;
        const da_cb = DA - CB;
        x_3 = modP(dacb * dacb);
        z_3 = modP(x_1 * modP(da_cb * da_cb));
        x_2 = modP(AA * BB);
        z_2 = modP(E * (AA + modP(a24 * E)));
      }
      sw = cswap(swap, x_2, x_3);
      x_2 = sw[0];
      x_3 = sw[1];
      sw = cswap(swap, z_2, z_3);
      z_2 = sw[0];
      z_3 = sw[1];
      const z2 = powPminus2(z_2);
      return modP(x_2 * z2);
    }
    function encodeUCoordinate(u) {
      return numberToBytesLE(modP(u), montgomeryBytes);
    }
    function decodeUCoordinate(uEnc) {
      const u = ensureBytes("u coordinate", uEnc, montgomeryBytes);
      if (fieldLen === 32)
        u[31] &= 127;
      return bytesToNumberLE(u);
    }
    function decodeScalar(n) {
      const bytes = ensureBytes("scalar", n);
      const len = bytes.length;
      if (len !== montgomeryBytes && len !== fieldLen) {
        let valid = "" + montgomeryBytes + " or " + fieldLen;
        throw new Error("invalid scalar, expected " + valid + " bytes, got " + len);
      }
      return bytesToNumberLE(adjustScalarBytes2(bytes));
    }
    function scalarMult2(scalar, u) {
      const pointU = decodeUCoordinate(u);
      const _scalar = decodeScalar(scalar);
      const pu = montgomeryLadder(pointU, _scalar);
      if (pu === _0n3)
        throw new Error("invalid private or public key received");
      return encodeUCoordinate(pu);
    }
    const GuBytes = encodeUCoordinate(CURVE.Gu);
    function scalarMultBase2(scalar) {
      return scalarMult2(scalar, GuBytes);
    }
    return {
      scalarMult: scalarMult2,
      scalarMultBase: scalarMultBase2,
      getSharedSecret: (privateKey, publicKey) => scalarMult2(privateKey, publicKey),
      getPublicKey: (privateKey) => scalarMultBase2(privateKey),
      utils: { randomPrivateKey: () => CURVE.randomBytes(CURVE.nByteLength) },
      GuBytes
    };
  }

  // node_modules/.pnpm/@noble+curves@1.8.0/node_modules/@noble/curves/esm/ed25519.js
  var ED25519_P = BigInt("57896044618658097711785492504343953926634992332820282019728792003956564819949");
  var _0n4 = BigInt(0);
  var _1n3 = BigInt(1);
  var _2n = BigInt(2);
  var _3n = BigInt(3);
  var _5n = BigInt(5);
  var _8n = BigInt(8);
  function ed25519_pow_2_252_3(x) {
    const _10n = BigInt(10), _20n = BigInt(20), _40n = BigInt(40), _80n = BigInt(80);
    const P = ED25519_P;
    const x2 = x * x % P;
    const b2 = x2 * x % P;
    const b4 = pow2(b2, _2n, P) * b2 % P;
    const b5 = pow2(b4, _1n3, P) * x % P;
    const b10 = pow2(b5, _5n, P) * b5 % P;
    const b20 = pow2(b10, _10n, P) * b10 % P;
    const b40 = pow2(b20, _20n, P) * b20 % P;
    const b80 = pow2(b40, _40n, P) * b40 % P;
    const b160 = pow2(b80, _80n, P) * b80 % P;
    const b240 = pow2(b160, _80n, P) * b80 % P;
    const b250 = pow2(b240, _10n, P) * b10 % P;
    const pow_p_5_8 = pow2(b250, _2n, P) * x % P;
    return { pow_p_5_8, b2 };
  }
  function adjustScalarBytes(bytes) {
    bytes[0] &= 248;
    bytes[31] &= 127;
    bytes[31] |= 64;
    return bytes;
  }
  var x25519 = /* @__PURE__ */ (() => montgomery({
    P: ED25519_P,
    a: BigInt(486662),
    montgomeryBits: 255,
    // n is 253 bits
    nByteLength: 32,
    Gu: BigInt(9),
    powPminus2: (x) => {
      const P = ED25519_P;
      const { pow_p_5_8, b2 } = ed25519_pow_2_252_3(x);
      return mod(pow2(pow_p_5_8, _3n, P) * b2, P);
    },
    adjustScalarBytes,
    randomBytes
  }))();

  // node_modules/.pnpm/age-encryption@0.2.0/node_modules/age-encryption/dist/x25519.js
  var __awaiter = function(thisArg, _arguments, P, generator) {
    function adopt(value) {
      return value instanceof P ? value : new P(function(resolve) {
        resolve(value);
      });
    }
    return new (P || (P = Promise))(function(resolve, reject) {
      function fulfilled(value) {
        try {
          step(generator.next(value));
        } catch (e) {
          reject(e);
        }
      }
      function rejected(value) {
        try {
          step(generator["throw"](value));
        } catch (e) {
          reject(e);
        }
      }
      function step(result) {
        result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected);
      }
      step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
  };
  var exportable = false;
  var webCryptoOff = false;
  var isX25519Supported = /* @__PURE__ */ (() => {
    let supported;
    return () => __awaiter(void 0, void 0, void 0, function* () {
      if (supported === void 0) {
        try {
          yield crypto.subtle.importKey("raw", x25519.GuBytes, { name: "X25519" }, exportable, []);
          supported = true;
        } catch (_a) {
          supported = false;
        }
      }
      return supported;
    });
  })();
  function scalarMult(scalar, u) {
    return __awaiter(this, void 0, void 0, function* () {
      if (!(yield isX25519Supported()) || webCryptoOff) {
        if (isCryptoKey(scalar)) {
          throw new Error("CryptoKey provided but X25519 WebCrypto is not supported");
        }
        return x25519.scalarMult(scalar, u);
      }
      let key;
      if (isCryptoKey(scalar)) {
        key = scalar;
      } else {
        key = yield importX25519Key(scalar);
      }
      const peer = yield crypto.subtle.importKey("raw", u, { name: "X25519" }, exportable, []);
      return new Uint8Array(yield crypto.subtle.deriveBits({ name: "X25519", public: peer }, key, 256));
    });
  }
  function scalarMultBase(scalar) {
    return __awaiter(this, void 0, void 0, function* () {
      if (!(yield isX25519Supported()) || webCryptoOff) {
        if (isCryptoKey(scalar)) {
          throw new Error("CryptoKey provided but X25519 WebCrypto is not supported");
        }
        return x25519.scalarMultBase(scalar);
      }
      return scalarMult(scalar, x25519.GuBytes);
    });
  }
  var pkcs8Prefix = new Uint8Array([
    48,
    46,
    2,
    1,
    0,
    48,
    5,
    6,
    3,
    43,
    101,
    110,
    4,
    34,
    4,
    32
  ]);
  function importX25519Key(key) {
    return __awaiter(this, void 0, void 0, function* () {
      if (key.length !== 32) {
        throw new Error("X25519 private key must be 32 bytes");
      }
      const pkcs8 = new Uint8Array([...pkcs8Prefix, ...key]);
      return crypto.subtle.importKey("pkcs8", pkcs8, { name: "X25519" }, exportable, ["deriveBits"]);
    });
  }
  function isCryptoKey(key) {
    return typeof CryptoKey !== "undefined" && key instanceof CryptoKey;
  }

  // node_modules/.pnpm/@noble+hashes@1.7.0/node_modules/@noble/hashes/esm/pbkdf2.js
  function pbkdf2Init(hash, _password, _salt, _opts) {
    ahash(hash);
    const opts = checkOpts({ dkLen: 32, asyncTick: 10 }, _opts);
    const { c, dkLen, asyncTick } = opts;
    anumber2(c);
    anumber2(dkLen);
    anumber2(asyncTick);
    if (c < 1)
      throw new Error("PBKDF2: iterations (c) should be >= 1");
    const password = toBytes(_password);
    const salt = toBytes(_salt);
    const DK = new Uint8Array(dkLen);
    const PRF = hmac.create(hash, password);
    const PRFSalt = PRF._cloneInto().update(salt);
    return { c, dkLen, asyncTick, DK, PRF, PRFSalt };
  }
  function pbkdf2Output(PRF, PRFSalt, DK, prfW, u) {
    PRF.destroy();
    PRFSalt.destroy();
    if (prfW)
      prfW.destroy();
    u.fill(0);
    return DK;
  }
  function pbkdf2(hash, password, salt, opts) {
    const { c, dkLen, DK, PRF, PRFSalt } = pbkdf2Init(hash, password, salt, opts);
    let prfW;
    const arr = new Uint8Array(4);
    const view = createView(arr);
    const u = new Uint8Array(PRF.outputLen);
    for (let ti = 1, pos = 0; pos < dkLen; ti++, pos += PRF.outputLen) {
      const Ti = DK.subarray(pos, pos + PRF.outputLen);
      view.setInt32(0, ti, false);
      (prfW = PRFSalt._cloneInto(prfW)).update(arr).digestInto(u);
      Ti.set(u.subarray(0, Ti.length));
      for (let ui = 1; ui < c; ui++) {
        PRF._cloneInto(prfW).update(u).digestInto(u);
        for (let i = 0; i < Ti.length; i++)
          Ti[i] ^= u[i];
      }
    }
    return pbkdf2Output(PRF, PRFSalt, DK, prfW, u);
  }

  // node_modules/.pnpm/@noble+hashes@1.7.0/node_modules/@noble/hashes/esm/scrypt.js
  function XorAndSalsa(prev, pi, input, ii, out, oi) {
    let y00 = prev[pi++] ^ input[ii++], y01 = prev[pi++] ^ input[ii++];
    let y02 = prev[pi++] ^ input[ii++], y03 = prev[pi++] ^ input[ii++];
    let y04 = prev[pi++] ^ input[ii++], y05 = prev[pi++] ^ input[ii++];
    let y06 = prev[pi++] ^ input[ii++], y07 = prev[pi++] ^ input[ii++];
    let y08 = prev[pi++] ^ input[ii++], y09 = prev[pi++] ^ input[ii++];
    let y10 = prev[pi++] ^ input[ii++], y11 = prev[pi++] ^ input[ii++];
    let y12 = prev[pi++] ^ input[ii++], y13 = prev[pi++] ^ input[ii++];
    let y14 = prev[pi++] ^ input[ii++], y15 = prev[pi++] ^ input[ii++];
    let x00 = y00, x01 = y01, x02 = y02, x03 = y03, x04 = y04, x05 = y05, x06 = y06, x07 = y07, x08 = y08, x09 = y09, x10 = y10, x11 = y11, x12 = y12, x13 = y13, x14 = y14, x15 = y15;
    for (let i = 0; i < 8; i += 2) {
      x04 ^= rotl(x00 + x12 | 0, 7);
      x08 ^= rotl(x04 + x00 | 0, 9);
      x12 ^= rotl(x08 + x04 | 0, 13);
      x00 ^= rotl(x12 + x08 | 0, 18);
      x09 ^= rotl(x05 + x01 | 0, 7);
      x13 ^= rotl(x09 + x05 | 0, 9);
      x01 ^= rotl(x13 + x09 | 0, 13);
      x05 ^= rotl(x01 + x13 | 0, 18);
      x14 ^= rotl(x10 + x06 | 0, 7);
      x02 ^= rotl(x14 + x10 | 0, 9);
      x06 ^= rotl(x02 + x14 | 0, 13);
      x10 ^= rotl(x06 + x02 | 0, 18);
      x03 ^= rotl(x15 + x11 | 0, 7);
      x07 ^= rotl(x03 + x15 | 0, 9);
      x11 ^= rotl(x07 + x03 | 0, 13);
      x15 ^= rotl(x11 + x07 | 0, 18);
      x01 ^= rotl(x00 + x03 | 0, 7);
      x02 ^= rotl(x01 + x00 | 0, 9);
      x03 ^= rotl(x02 + x01 | 0, 13);
      x00 ^= rotl(x03 + x02 | 0, 18);
      x06 ^= rotl(x05 + x04 | 0, 7);
      x07 ^= rotl(x06 + x05 | 0, 9);
      x04 ^= rotl(x07 + x06 | 0, 13);
      x05 ^= rotl(x04 + x07 | 0, 18);
      x11 ^= rotl(x10 + x09 | 0, 7);
      x08 ^= rotl(x11 + x10 | 0, 9);
      x09 ^= rotl(x08 + x11 | 0, 13);
      x10 ^= rotl(x09 + x08 | 0, 18);
      x12 ^= rotl(x15 + x14 | 0, 7);
      x13 ^= rotl(x12 + x15 | 0, 9);
      x14 ^= rotl(x13 + x12 | 0, 13);
      x15 ^= rotl(x14 + x13 | 0, 18);
    }
    out[oi++] = y00 + x00 | 0;
    out[oi++] = y01 + x01 | 0;
    out[oi++] = y02 + x02 | 0;
    out[oi++] = y03 + x03 | 0;
    out[oi++] = y04 + x04 | 0;
    out[oi++] = y05 + x05 | 0;
    out[oi++] = y06 + x06 | 0;
    out[oi++] = y07 + x07 | 0;
    out[oi++] = y08 + x08 | 0;
    out[oi++] = y09 + x09 | 0;
    out[oi++] = y10 + x10 | 0;
    out[oi++] = y11 + x11 | 0;
    out[oi++] = y12 + x12 | 0;
    out[oi++] = y13 + x13 | 0;
    out[oi++] = y14 + x14 | 0;
    out[oi++] = y15 + x15 | 0;
  }
  function BlockMix(input, ii, out, oi, r) {
    let head = oi + 0;
    let tail = oi + 16 * r;
    for (let i = 0; i < 16; i++)
      out[tail + i] = input[ii + (2 * r - 1) * 16 + i];
    for (let i = 0; i < r; i++, head += 16, ii += 16) {
      XorAndSalsa(out, tail, input, ii, out, head);
      if (i > 0)
        tail += 16;
      XorAndSalsa(out, head, input, ii += 16, out, tail);
    }
  }
  function scryptInit(password, salt, _opts) {
    const opts = checkOpts({
      dkLen: 32,
      asyncTick: 10,
      maxmem: 1024 ** 3 + 1024
    }, _opts);
    const { N, r, p, dkLen, asyncTick, maxmem, onProgress } = opts;
    anumber2(N);
    anumber2(r);
    anumber2(p);
    anumber2(dkLen);
    anumber2(asyncTick);
    anumber2(maxmem);
    if (onProgress !== void 0 && typeof onProgress !== "function")
      throw new Error("progressCb should be function");
    const blockSize = 128 * r;
    const blockSize32 = blockSize / 4;
    if (N <= 1 || (N & N - 1) !== 0 || N > 2 ** 32) {
      throw new Error("Scrypt: N must be larger than 1, a power of 2, and less than 2^32");
    }
    if (p < 0 || p > (2 ** 32 - 1) * 32 / blockSize) {
      throw new Error("Scrypt: p must be a positive integer less than or equal to ((2^32 - 1) * 32) / (128 * r)");
    }
    if (dkLen < 0 || dkLen > (2 ** 32 - 1) * 32) {
      throw new Error("Scrypt: dkLen should be positive integer less than or equal to (2^32 - 1) * 32");
    }
    const memUsed = blockSize * (N + p);
    if (memUsed > maxmem) {
      throw new Error("Scrypt: memused is bigger than maxMem. Expected 128 * r * (N + p) > maxmem of " + maxmem);
    }
    const B = pbkdf2(sha256, password, salt, { c: 1, dkLen: blockSize * p });
    const B32 = u32(B);
    const V = u32(new Uint8Array(blockSize * N));
    const tmp = u32(new Uint8Array(blockSize));
    let blockMixCb = () => {
    };
    if (onProgress) {
      const totalBlockMix = 2 * N * p;
      const callbackPer = Math.max(Math.floor(totalBlockMix / 1e4), 1);
      let blockMixCnt = 0;
      blockMixCb = () => {
        blockMixCnt++;
        if (onProgress && (!(blockMixCnt % callbackPer) || blockMixCnt === totalBlockMix))
          onProgress(blockMixCnt / totalBlockMix);
      };
    }
    return { N, r, p, dkLen, blockSize32, V, B32, B, tmp, blockMixCb, asyncTick };
  }
  function scryptOutput(password, dkLen, B, V, tmp) {
    const res = pbkdf2(sha256, password, B, { c: 1, dkLen });
    B.fill(0);
    V.fill(0);
    tmp.fill(0);
    return res;
  }
  function scrypt(password, salt, opts) {
    const { N, r, p, dkLen, blockSize32, V, B32, B, tmp, blockMixCb } = scryptInit(password, salt, opts);
    if (!isLE)
      byteSwap32(B32);
    for (let pi = 0; pi < p; pi++) {
      const Pi = blockSize32 * pi;
      for (let i = 0; i < blockSize32; i++)
        V[i] = B32[Pi + i];
      for (let i = 0, pos = 0; i < N - 1; i++) {
        BlockMix(V, pos, V, pos += blockSize32, r);
        blockMixCb();
      }
      BlockMix(V, (N - 1) * blockSize32, B32, Pi, r);
      blockMixCb();
      for (let i = 0; i < N; i++) {
        const j = B32[Pi + blockSize32 - 16] % N;
        for (let k = 0; k < blockSize32; k++)
          tmp[k] = B32[Pi + k] ^ V[j * blockSize32 + k];
        BlockMix(tmp, 0, B32, Pi, r);
        blockMixCb();
      }
    }
    if (!isLE)
      byteSwap32(B32);
    return scryptOutput(password, dkLen, B, V, tmp);
  }

  // node_modules/.pnpm/@noble+ciphers@1.2.0/node_modules/@noble/ciphers/esm/_assert.js
  function anumber3(n) {
    if (!Number.isSafeInteger(n) || n < 0)
      throw new Error("positive integer expected, got " + n);
  }
  function isBytes4(a) {
    return a instanceof Uint8Array || ArrayBuffer.isView(a) && a.constructor.name === "Uint8Array";
  }
  function abytes3(b, ...lengths) {
    if (!isBytes4(b))
      throw new Error("Uint8Array expected");
    if (lengths.length > 0 && !lengths.includes(b.length))
      throw new Error("Uint8Array expected of length " + lengths + ", got length=" + b.length);
  }
  function aexists2(instance, checkFinished = true) {
    if (instance.destroyed)
      throw new Error("Hash instance has been destroyed");
    if (checkFinished && instance.finished)
      throw new Error("Hash#digest() has already been called");
  }
  function aoutput2(out, instance) {
    abytes3(out);
    const min = instance.outputLen;
    if (out.length < min) {
      throw new Error("digestInto() expects output buffer of length at least " + min);
    }
  }
  function abool(b) {
    if (typeof b !== "boolean")
      throw new Error(`boolean expected, not ${b}`);
  }

  // node_modules/.pnpm/@noble+ciphers@1.2.0/node_modules/@noble/ciphers/esm/utils.js
  var u322 = (arr) => new Uint32Array(arr.buffer, arr.byteOffset, Math.floor(arr.byteLength / 4));
  var createView2 = (arr) => new DataView(arr.buffer, arr.byteOffset, arr.byteLength);
  var isLE2 = new Uint8Array(new Uint32Array([287454020]).buffer)[0] === 68;
  if (!isLE2)
    throw new Error("Non little-endian hardware is not supported");
  function utf8ToBytes2(str) {
    if (typeof str !== "string")
      throw new Error("string expected");
    return new Uint8Array(new TextEncoder().encode(str));
  }
  function toBytes2(data) {
    if (typeof data === "string")
      data = utf8ToBytes2(data);
    else if (isBytes4(data))
      data = copyBytes(data);
    else
      throw new Error("Uint8Array expected, got " + typeof data);
    return data;
  }
  function checkOpts2(defaults, opts) {
    if (opts == null || typeof opts !== "object")
      throw new Error("options must be defined");
    const merged = Object.assign(defaults, opts);
    return merged;
  }
  function equalBytes(a, b) {
    if (a.length !== b.length)
      return false;
    let diff = 0;
    for (let i = 0; i < a.length; i++)
      diff |= a[i] ^ b[i];
    return diff === 0;
  }
  var wrapCipher = /* @__NO_SIDE_EFFECTS__ */ (params, constructor) => {
    function wrappedCipher(key, ...args) {
      abytes3(key);
      if (params.nonceLength !== void 0) {
        const nonce = args[0];
        if (!nonce)
          throw new Error("nonce / iv required");
        if (params.varSizeNonce)
          abytes3(nonce);
        else
          abytes3(nonce, params.nonceLength);
      }
      const tagl = params.tagLength;
      if (tagl && args[1] !== void 0) {
        abytes3(args[1]);
      }
      const cipher = constructor(key, ...args);
      const checkOutput = (fnLength, output) => {
        if (output !== void 0) {
          if (fnLength !== 2)
            throw new Error("cipher output not supported");
          abytes3(output);
        }
      };
      let called = false;
      const wrCipher = {
        encrypt(data, output) {
          if (called)
            throw new Error("cannot encrypt() twice with same key + nonce");
          called = true;
          abytes3(data);
          checkOutput(cipher.encrypt.length, output);
          return cipher.encrypt(data, output);
        },
        decrypt(data, output) {
          abytes3(data);
          if (tagl && data.length < tagl)
            throw new Error("invalid ciphertext length: smaller than tagLength=" + tagl);
          checkOutput(cipher.decrypt.length, output);
          return cipher.decrypt(data, output);
        }
      };
      return wrCipher;
    }
    Object.assign(wrappedCipher, params);
    return wrappedCipher;
  };
  function getOutput(expectedLength, out, onlyAligned = true) {
    if (out === void 0)
      return new Uint8Array(expectedLength);
    if (out.length !== expectedLength)
      throw new Error("invalid output length, expected " + expectedLength + ", got: " + out.length);
    if (onlyAligned && !isAligned32(out))
      throw new Error("invalid output, must be aligned");
    return out;
  }
  function setBigUint642(view, byteOffset, value, isLE3) {
    if (typeof view.setBigUint64 === "function")
      return view.setBigUint64(byteOffset, value, isLE3);
    const _32n = BigInt(32);
    const _u32_max = BigInt(4294967295);
    const wh = Number(value >> _32n & _u32_max);
    const wl = Number(value & _u32_max);
    const h = isLE3 ? 4 : 0;
    const l = isLE3 ? 0 : 4;
    view.setUint32(byteOffset + h, wh, isLE3);
    view.setUint32(byteOffset + l, wl, isLE3);
  }
  function isAligned32(bytes) {
    return bytes.byteOffset % 4 === 0;
  }
  function copyBytes(bytes) {
    return Uint8Array.from(bytes);
  }
  function clean(...arrays) {
    for (let i = 0; i < arrays.length; i++) {
      arrays[i].fill(0);
    }
  }

  // node_modules/.pnpm/@noble+ciphers@1.2.0/node_modules/@noble/ciphers/esm/_arx.js
  var _utf8ToBytes = (str) => Uint8Array.from(str.split("").map((c) => c.charCodeAt(0)));
  var sigma16 = _utf8ToBytes("expand 16-byte k");
  var sigma32 = _utf8ToBytes("expand 32-byte k");
  var sigma16_32 = u322(sigma16);
  var sigma32_32 = u322(sigma32);
  function rotl2(a, b) {
    return a << b | a >>> 32 - b;
  }
  function isAligned322(b) {
    return b.byteOffset % 4 === 0;
  }
  var BLOCK_LEN = 64;
  var BLOCK_LEN32 = 16;
  var MAX_COUNTER = 2 ** 32 - 1;
  var U32_EMPTY = new Uint32Array();
  function runCipher(core, sigma, key, nonce, data, output, counter, rounds) {
    const len = data.length;
    const block = new Uint8Array(BLOCK_LEN);
    const b32 = u322(block);
    const isAligned = isAligned322(data) && isAligned322(output);
    const d32 = isAligned ? u322(data) : U32_EMPTY;
    const o32 = isAligned ? u322(output) : U32_EMPTY;
    for (let pos = 0; pos < len; counter++) {
      core(sigma, key, nonce, b32, counter, rounds);
      if (counter >= MAX_COUNTER)
        throw new Error("arx: counter overflow");
      const take = Math.min(BLOCK_LEN, len - pos);
      if (isAligned && take === BLOCK_LEN) {
        const pos32 = pos / 4;
        if (pos % 4 !== 0)
          throw new Error("arx: invalid block position");
        for (let j = 0, posj; j < BLOCK_LEN32; j++) {
          posj = pos32 + j;
          o32[posj] = d32[posj] ^ b32[j];
        }
        pos += BLOCK_LEN;
        continue;
      }
      for (let j = 0, posj; j < take; j++) {
        posj = pos + j;
        output[posj] = data[posj] ^ block[j];
      }
      pos += take;
    }
  }
  function createCipher(core, opts) {
    const { allowShortKeys, extendNonceFn, counterLength, counterRight, rounds } = checkOpts2({ allowShortKeys: false, counterLength: 8, counterRight: false, rounds: 20 }, opts);
    if (typeof core !== "function")
      throw new Error("core must be a function");
    anumber3(counterLength);
    anumber3(rounds);
    abool(counterRight);
    abool(allowShortKeys);
    return (key, nonce, data, output, counter = 0) => {
      abytes3(key);
      abytes3(nonce);
      abytes3(data);
      const len = data.length;
      if (output === void 0)
        output = new Uint8Array(len);
      abytes3(output);
      anumber3(counter);
      if (counter < 0 || counter >= MAX_COUNTER)
        throw new Error("arx: counter overflow");
      if (output.length < len)
        throw new Error(`arx: output (${output.length}) is shorter than data (${len})`);
      const toClean = [];
      let l = key.length;
      let k;
      let sigma;
      if (l === 32) {
        toClean.push(k = copyBytes(key));
        sigma = sigma32_32;
      } else if (l === 16 && allowShortKeys) {
        k = new Uint8Array(32);
        k.set(key);
        k.set(key, 16);
        sigma = sigma16_32;
        toClean.push(k);
      } else {
        throw new Error(`arx: invalid 32-byte key, got length=${l}`);
      }
      if (!isAligned322(nonce))
        toClean.push(nonce = copyBytes(nonce));
      const k32 = u322(k);
      if (extendNonceFn) {
        if (nonce.length !== 24)
          throw new Error(`arx: extended nonce must be 24 bytes`);
        extendNonceFn(sigma, k32, u322(nonce.subarray(0, 16)), k32);
        nonce = nonce.subarray(16);
      }
      const nonceNcLen = 16 - counterLength;
      if (nonceNcLen !== nonce.length)
        throw new Error(`arx: nonce must be ${nonceNcLen} or 16 bytes`);
      if (nonceNcLen !== 12) {
        const nc = new Uint8Array(12);
        nc.set(nonce, counterRight ? 0 : 12 - nonce.length);
        nonce = nc;
        toClean.push(nonce);
      }
      const n32 = u322(nonce);
      runCipher(core, sigma, k32, n32, data, output, counter, rounds);
      clean(...toClean);
      return output;
    };
  }

  // node_modules/.pnpm/@noble+ciphers@1.2.0/node_modules/@noble/ciphers/esm/_poly1305.js
  var u8to16 = (a, i) => a[i++] & 255 | (a[i++] & 255) << 8;
  var Poly1305 = class {
    constructor(key) {
      this.blockLen = 16;
      this.outputLen = 16;
      this.buffer = new Uint8Array(16);
      this.r = new Uint16Array(10);
      this.h = new Uint16Array(10);
      this.pad = new Uint16Array(8);
      this.pos = 0;
      this.finished = false;
      key = toBytes2(key);
      abytes3(key, 32);
      const t0 = u8to16(key, 0);
      const t1 = u8to16(key, 2);
      const t2 = u8to16(key, 4);
      const t3 = u8to16(key, 6);
      const t4 = u8to16(key, 8);
      const t5 = u8to16(key, 10);
      const t6 = u8to16(key, 12);
      const t7 = u8to16(key, 14);
      this.r[0] = t0 & 8191;
      this.r[1] = (t0 >>> 13 | t1 << 3) & 8191;
      this.r[2] = (t1 >>> 10 | t2 << 6) & 7939;
      this.r[3] = (t2 >>> 7 | t3 << 9) & 8191;
      this.r[4] = (t3 >>> 4 | t4 << 12) & 255;
      this.r[5] = t4 >>> 1 & 8190;
      this.r[6] = (t4 >>> 14 | t5 << 2) & 8191;
      this.r[7] = (t5 >>> 11 | t6 << 5) & 8065;
      this.r[8] = (t6 >>> 8 | t7 << 8) & 8191;
      this.r[9] = t7 >>> 5 & 127;
      for (let i = 0; i < 8; i++)
        this.pad[i] = u8to16(key, 16 + 2 * i);
    }
    process(data, offset, isLast = false) {
      const hibit = isLast ? 0 : 1 << 11;
      const { h, r } = this;
      const r0 = r[0];
      const r1 = r[1];
      const r2 = r[2];
      const r3 = r[3];
      const r4 = r[4];
      const r5 = r[5];
      const r6 = r[6];
      const r7 = r[7];
      const r8 = r[8];
      const r9 = r[9];
      const t0 = u8to16(data, offset + 0);
      const t1 = u8to16(data, offset + 2);
      const t2 = u8to16(data, offset + 4);
      const t3 = u8to16(data, offset + 6);
      const t4 = u8to16(data, offset + 8);
      const t5 = u8to16(data, offset + 10);
      const t6 = u8to16(data, offset + 12);
      const t7 = u8to16(data, offset + 14);
      let h0 = h[0] + (t0 & 8191);
      let h1 = h[1] + ((t0 >>> 13 | t1 << 3) & 8191);
      let h2 = h[2] + ((t1 >>> 10 | t2 << 6) & 8191);
      let h3 = h[3] + ((t2 >>> 7 | t3 << 9) & 8191);
      let h4 = h[4] + ((t3 >>> 4 | t4 << 12) & 8191);
      let h5 = h[5] + (t4 >>> 1 & 8191);
      let h6 = h[6] + ((t4 >>> 14 | t5 << 2) & 8191);
      let h7 = h[7] + ((t5 >>> 11 | t6 << 5) & 8191);
      let h8 = h[8] + ((t6 >>> 8 | t7 << 8) & 8191);
      let h9 = h[9] + (t7 >>> 5 | hibit);
      let c = 0;
      let d0 = c + h0 * r0 + h1 * (5 * r9) + h2 * (5 * r8) + h3 * (5 * r7) + h4 * (5 * r6);
      c = d0 >>> 13;
      d0 &= 8191;
      d0 += h5 * (5 * r5) + h6 * (5 * r4) + h7 * (5 * r3) + h8 * (5 * r2) + h9 * (5 * r1);
      c += d0 >>> 13;
      d0 &= 8191;
      let d1 = c + h0 * r1 + h1 * r0 + h2 * (5 * r9) + h3 * (5 * r8) + h4 * (5 * r7);
      c = d1 >>> 13;
      d1 &= 8191;
      d1 += h5 * (5 * r6) + h6 * (5 * r5) + h7 * (5 * r4) + h8 * (5 * r3) + h9 * (5 * r2);
      c += d1 >>> 13;
      d1 &= 8191;
      let d2 = c + h0 * r2 + h1 * r1 + h2 * r0 + h3 * (5 * r9) + h4 * (5 * r8);
      c = d2 >>> 13;
      d2 &= 8191;
      d2 += h5 * (5 * r7) + h6 * (5 * r6) + h7 * (5 * r5) + h8 * (5 * r4) + h9 * (5 * r3);
      c += d2 >>> 13;
      d2 &= 8191;
      let d3 = c + h0 * r3 + h1 * r2 + h2 * r1 + h3 * r0 + h4 * (5 * r9);
      c = d3 >>> 13;
      d3 &= 8191;
      d3 += h5 * (5 * r8) + h6 * (5 * r7) + h7 * (5 * r6) + h8 * (5 * r5) + h9 * (5 * r4);
      c += d3 >>> 13;
      d3 &= 8191;
      let d4 = c + h0 * r4 + h1 * r3 + h2 * r2 + h3 * r1 + h4 * r0;
      c = d4 >>> 13;
      d4 &= 8191;
      d4 += h5 * (5 * r9) + h6 * (5 * r8) + h7 * (5 * r7) + h8 * (5 * r6) + h9 * (5 * r5);
      c += d4 >>> 13;
      d4 &= 8191;
      let d5 = c + h0 * r5 + h1 * r4 + h2 * r3 + h3 * r2 + h4 * r1;
      c = d5 >>> 13;
      d5 &= 8191;
      d5 += h5 * r0 + h6 * (5 * r9) + h7 * (5 * r8) + h8 * (5 * r7) + h9 * (5 * r6);
      c += d5 >>> 13;
      d5 &= 8191;
      let d6 = c + h0 * r6 + h1 * r5 + h2 * r4 + h3 * r3 + h4 * r2;
      c = d6 >>> 13;
      d6 &= 8191;
      d6 += h5 * r1 + h6 * r0 + h7 * (5 * r9) + h8 * (5 * r8) + h9 * (5 * r7);
      c += d6 >>> 13;
      d6 &= 8191;
      let d7 = c + h0 * r7 + h1 * r6 + h2 * r5 + h3 * r4 + h4 * r3;
      c = d7 >>> 13;
      d7 &= 8191;
      d7 += h5 * r2 + h6 * r1 + h7 * r0 + h8 * (5 * r9) + h9 * (5 * r8);
      c += d7 >>> 13;
      d7 &= 8191;
      let d8 = c + h0 * r8 + h1 * r7 + h2 * r6 + h3 * r5 + h4 * r4;
      c = d8 >>> 13;
      d8 &= 8191;
      d8 += h5 * r3 + h6 * r2 + h7 * r1 + h8 * r0 + h9 * (5 * r9);
      c += d8 >>> 13;
      d8 &= 8191;
      let d9 = c + h0 * r9 + h1 * r8 + h2 * r7 + h3 * r6 + h4 * r5;
      c = d9 >>> 13;
      d9 &= 8191;
      d9 += h5 * r4 + h6 * r3 + h7 * r2 + h8 * r1 + h9 * r0;
      c += d9 >>> 13;
      d9 &= 8191;
      c = (c << 2) + c | 0;
      c = c + d0 | 0;
      d0 = c & 8191;
      c = c >>> 13;
      d1 += c;
      h[0] = d0;
      h[1] = d1;
      h[2] = d2;
      h[3] = d3;
      h[4] = d4;
      h[5] = d5;
      h[6] = d6;
      h[7] = d7;
      h[8] = d8;
      h[9] = d9;
    }
    finalize() {
      const { h, pad } = this;
      const g = new Uint16Array(10);
      let c = h[1] >>> 13;
      h[1] &= 8191;
      for (let i = 2; i < 10; i++) {
        h[i] += c;
        c = h[i] >>> 13;
        h[i] &= 8191;
      }
      h[0] += c * 5;
      c = h[0] >>> 13;
      h[0] &= 8191;
      h[1] += c;
      c = h[1] >>> 13;
      h[1] &= 8191;
      h[2] += c;
      g[0] = h[0] + 5;
      c = g[0] >>> 13;
      g[0] &= 8191;
      for (let i = 1; i < 10; i++) {
        g[i] = h[i] + c;
        c = g[i] >>> 13;
        g[i] &= 8191;
      }
      g[9] -= 1 << 13;
      let mask = (c ^ 1) - 1;
      for (let i = 0; i < 10; i++)
        g[i] &= mask;
      mask = ~mask;
      for (let i = 0; i < 10; i++)
        h[i] = h[i] & mask | g[i];
      h[0] = (h[0] | h[1] << 13) & 65535;
      h[1] = (h[1] >>> 3 | h[2] << 10) & 65535;
      h[2] = (h[2] >>> 6 | h[3] << 7) & 65535;
      h[3] = (h[3] >>> 9 | h[4] << 4) & 65535;
      h[4] = (h[4] >>> 12 | h[5] << 1 | h[6] << 14) & 65535;
      h[5] = (h[6] >>> 2 | h[7] << 11) & 65535;
      h[6] = (h[7] >>> 5 | h[8] << 8) & 65535;
      h[7] = (h[8] >>> 8 | h[9] << 5) & 65535;
      let f = h[0] + pad[0];
      h[0] = f & 65535;
      for (let i = 1; i < 8; i++) {
        f = (h[i] + pad[i] | 0) + (f >>> 16) | 0;
        h[i] = f & 65535;
      }
      clean(g);
    }
    update(data) {
      aexists2(this);
      const { buffer, blockLen } = this;
      data = toBytes2(data);
      const len = data.length;
      for (let pos = 0; pos < len; ) {
        const take = Math.min(blockLen - this.pos, len - pos);
        if (take === blockLen) {
          for (; blockLen <= len - pos; pos += blockLen)
            this.process(data, pos);
          continue;
        }
        buffer.set(data.subarray(pos, pos + take), this.pos);
        this.pos += take;
        pos += take;
        if (this.pos === blockLen) {
          this.process(buffer, 0, false);
          this.pos = 0;
        }
      }
      return this;
    }
    destroy() {
      clean(this.h, this.r, this.buffer, this.pad);
    }
    digestInto(out) {
      aexists2(this);
      aoutput2(out, this);
      this.finished = true;
      const { buffer, h } = this;
      let { pos } = this;
      if (pos) {
        buffer[pos++] = 1;
        for (; pos < 16; pos++)
          buffer[pos] = 0;
        this.process(buffer, 0, true);
      }
      this.finalize();
      let opos = 0;
      for (let i = 0; i < 8; i++) {
        out[opos++] = h[i] >>> 0;
        out[opos++] = h[i] >>> 8;
      }
      return out;
    }
    digest() {
      const { buffer, outputLen } = this;
      this.digestInto(buffer);
      const res = buffer.slice(0, outputLen);
      this.destroy();
      return res;
    }
  };
  function wrapConstructorWithKey(hashCons) {
    const hashC = (msg, key) => hashCons(key).update(toBytes2(msg)).digest();
    const tmp = hashCons(new Uint8Array(32));
    hashC.outputLen = tmp.outputLen;
    hashC.blockLen = tmp.blockLen;
    hashC.create = (key) => hashCons(key);
    return hashC;
  }
  var poly1305 = wrapConstructorWithKey((key) => new Poly1305(key));

  // node_modules/.pnpm/@noble+ciphers@1.2.0/node_modules/@noble/ciphers/esm/chacha.js
  function chachaCore(s, k, n, out, cnt, rounds = 20) {
    let y00 = s[0], y01 = s[1], y02 = s[2], y03 = s[3], y04 = k[0], y05 = k[1], y06 = k[2], y07 = k[3], y08 = k[4], y09 = k[5], y10 = k[6], y11 = k[7], y12 = cnt, y13 = n[0], y14 = n[1], y15 = n[2];
    let x00 = y00, x01 = y01, x02 = y02, x03 = y03, x04 = y04, x05 = y05, x06 = y06, x07 = y07, x08 = y08, x09 = y09, x10 = y10, x11 = y11, x12 = y12, x13 = y13, x14 = y14, x15 = y15;
    for (let r = 0; r < rounds; r += 2) {
      x00 = x00 + x04 | 0;
      x12 = rotl2(x12 ^ x00, 16);
      x08 = x08 + x12 | 0;
      x04 = rotl2(x04 ^ x08, 12);
      x00 = x00 + x04 | 0;
      x12 = rotl2(x12 ^ x00, 8);
      x08 = x08 + x12 | 0;
      x04 = rotl2(x04 ^ x08, 7);
      x01 = x01 + x05 | 0;
      x13 = rotl2(x13 ^ x01, 16);
      x09 = x09 + x13 | 0;
      x05 = rotl2(x05 ^ x09, 12);
      x01 = x01 + x05 | 0;
      x13 = rotl2(x13 ^ x01, 8);
      x09 = x09 + x13 | 0;
      x05 = rotl2(x05 ^ x09, 7);
      x02 = x02 + x06 | 0;
      x14 = rotl2(x14 ^ x02, 16);
      x10 = x10 + x14 | 0;
      x06 = rotl2(x06 ^ x10, 12);
      x02 = x02 + x06 | 0;
      x14 = rotl2(x14 ^ x02, 8);
      x10 = x10 + x14 | 0;
      x06 = rotl2(x06 ^ x10, 7);
      x03 = x03 + x07 | 0;
      x15 = rotl2(x15 ^ x03, 16);
      x11 = x11 + x15 | 0;
      x07 = rotl2(x07 ^ x11, 12);
      x03 = x03 + x07 | 0;
      x15 = rotl2(x15 ^ x03, 8);
      x11 = x11 + x15 | 0;
      x07 = rotl2(x07 ^ x11, 7);
      x00 = x00 + x05 | 0;
      x15 = rotl2(x15 ^ x00, 16);
      x10 = x10 + x15 | 0;
      x05 = rotl2(x05 ^ x10, 12);
      x00 = x00 + x05 | 0;
      x15 = rotl2(x15 ^ x00, 8);
      x10 = x10 + x15 | 0;
      x05 = rotl2(x05 ^ x10, 7);
      x01 = x01 + x06 | 0;
      x12 = rotl2(x12 ^ x01, 16);
      x11 = x11 + x12 | 0;
      x06 = rotl2(x06 ^ x11, 12);
      x01 = x01 + x06 | 0;
      x12 = rotl2(x12 ^ x01, 8);
      x11 = x11 + x12 | 0;
      x06 = rotl2(x06 ^ x11, 7);
      x02 = x02 + x07 | 0;
      x13 = rotl2(x13 ^ x02, 16);
      x08 = x08 + x13 | 0;
      x07 = rotl2(x07 ^ x08, 12);
      x02 = x02 + x07 | 0;
      x13 = rotl2(x13 ^ x02, 8);
      x08 = x08 + x13 | 0;
      x07 = rotl2(x07 ^ x08, 7);
      x03 = x03 + x04 | 0;
      x14 = rotl2(x14 ^ x03, 16);
      x09 = x09 + x14 | 0;
      x04 = rotl2(x04 ^ x09, 12);
      x03 = x03 + x04 | 0;
      x14 = rotl2(x14 ^ x03, 8);
      x09 = x09 + x14 | 0;
      x04 = rotl2(x04 ^ x09, 7);
    }
    let oi = 0;
    out[oi++] = y00 + x00 | 0;
    out[oi++] = y01 + x01 | 0;
    out[oi++] = y02 + x02 | 0;
    out[oi++] = y03 + x03 | 0;
    out[oi++] = y04 + x04 | 0;
    out[oi++] = y05 + x05 | 0;
    out[oi++] = y06 + x06 | 0;
    out[oi++] = y07 + x07 | 0;
    out[oi++] = y08 + x08 | 0;
    out[oi++] = y09 + x09 | 0;
    out[oi++] = y10 + x10 | 0;
    out[oi++] = y11 + x11 | 0;
    out[oi++] = y12 + x12 | 0;
    out[oi++] = y13 + x13 | 0;
    out[oi++] = y14 + x14 | 0;
    out[oi++] = y15 + x15 | 0;
  }
  function hchacha(s, k, i, o32) {
    let x00 = s[0], x01 = s[1], x02 = s[2], x03 = s[3], x04 = k[0], x05 = k[1], x06 = k[2], x07 = k[3], x08 = k[4], x09 = k[5], x10 = k[6], x11 = k[7], x12 = i[0], x13 = i[1], x14 = i[2], x15 = i[3];
    for (let r = 0; r < 20; r += 2) {
      x00 = x00 + x04 | 0;
      x12 = rotl2(x12 ^ x00, 16);
      x08 = x08 + x12 | 0;
      x04 = rotl2(x04 ^ x08, 12);
      x00 = x00 + x04 | 0;
      x12 = rotl2(x12 ^ x00, 8);
      x08 = x08 + x12 | 0;
      x04 = rotl2(x04 ^ x08, 7);
      x01 = x01 + x05 | 0;
      x13 = rotl2(x13 ^ x01, 16);
      x09 = x09 + x13 | 0;
      x05 = rotl2(x05 ^ x09, 12);
      x01 = x01 + x05 | 0;
      x13 = rotl2(x13 ^ x01, 8);
      x09 = x09 + x13 | 0;
      x05 = rotl2(x05 ^ x09, 7);
      x02 = x02 + x06 | 0;
      x14 = rotl2(x14 ^ x02, 16);
      x10 = x10 + x14 | 0;
      x06 = rotl2(x06 ^ x10, 12);
      x02 = x02 + x06 | 0;
      x14 = rotl2(x14 ^ x02, 8);
      x10 = x10 + x14 | 0;
      x06 = rotl2(x06 ^ x10, 7);
      x03 = x03 + x07 | 0;
      x15 = rotl2(x15 ^ x03, 16);
      x11 = x11 + x15 | 0;
      x07 = rotl2(x07 ^ x11, 12);
      x03 = x03 + x07 | 0;
      x15 = rotl2(x15 ^ x03, 8);
      x11 = x11 + x15 | 0;
      x07 = rotl2(x07 ^ x11, 7);
      x00 = x00 + x05 | 0;
      x15 = rotl2(x15 ^ x00, 16);
      x10 = x10 + x15 | 0;
      x05 = rotl2(x05 ^ x10, 12);
      x00 = x00 + x05 | 0;
      x15 = rotl2(x15 ^ x00, 8);
      x10 = x10 + x15 | 0;
      x05 = rotl2(x05 ^ x10, 7);
      x01 = x01 + x06 | 0;
      x12 = rotl2(x12 ^ x01, 16);
      x11 = x11 + x12 | 0;
      x06 = rotl2(x06 ^ x11, 12);
      x01 = x01 + x06 | 0;
      x12 = rotl2(x12 ^ x01, 8);
      x11 = x11 + x12 | 0;
      x06 = rotl2(x06 ^ x11, 7);
      x02 = x02 + x07 | 0;
      x13 = rotl2(x13 ^ x02, 16);
      x08 = x08 + x13 | 0;
      x07 = rotl2(x07 ^ x08, 12);
      x02 = x02 + x07 | 0;
      x13 = rotl2(x13 ^ x02, 8);
      x08 = x08 + x13 | 0;
      x07 = rotl2(x07 ^ x08, 7);
      x03 = x03 + x04 | 0;
      x14 = rotl2(x14 ^ x03, 16);
      x09 = x09 + x14 | 0;
      x04 = rotl2(x04 ^ x09, 12);
      x03 = x03 + x04 | 0;
      x14 = rotl2(x14 ^ x03, 8);
      x09 = x09 + x14 | 0;
      x04 = rotl2(x04 ^ x09, 7);
    }
    let oi = 0;
    o32[oi++] = x00;
    o32[oi++] = x01;
    o32[oi++] = x02;
    o32[oi++] = x03;
    o32[oi++] = x12;
    o32[oi++] = x13;
    o32[oi++] = x14;
    o32[oi++] = x15;
  }
  var chacha20 = /* @__PURE__ */ createCipher(chachaCore, {
    counterRight: false,
    counterLength: 4,
    allowShortKeys: false
  });
  var xchacha20 = /* @__PURE__ */ createCipher(chachaCore, {
    counterRight: false,
    counterLength: 8,
    extendNonceFn: hchacha,
    allowShortKeys: false
  });
  var ZEROS16 = /* @__PURE__ */ new Uint8Array(16);
  var updatePadded = (h, msg) => {
    h.update(msg);
    const left = msg.length % 16;
    if (left)
      h.update(ZEROS16.subarray(left));
  };
  var ZEROS32 = /* @__PURE__ */ new Uint8Array(32);
  function computeTag(fn, key, nonce, data, AAD) {
    const authKey = fn(key, nonce, ZEROS32);
    const h = poly1305.create(authKey);
    if (AAD)
      updatePadded(h, AAD);
    updatePadded(h, data);
    const num = new Uint8Array(16);
    const view = createView2(num);
    setBigUint642(view, 0, BigInt(AAD ? AAD.length : 0), true);
    setBigUint642(view, 8, BigInt(data.length), true);
    h.update(num);
    const res = h.digest();
    clean(authKey, num);
    return res;
  }
  var _poly1305_aead = (xorStream) => (key, nonce, AAD) => {
    const tagLength = 16;
    return {
      encrypt(plaintext, output) {
        const plength = plaintext.length;
        output = getOutput(plength + tagLength, output, false);
        output.set(plaintext);
        const oPlain = output.subarray(0, -tagLength);
        xorStream(key, nonce, oPlain, oPlain, 1);
        const tag = computeTag(xorStream, key, nonce, oPlain, AAD);
        output.set(tag, plength);
        clean(tag);
        return output;
      },
      decrypt(ciphertext, output) {
        output = getOutput(ciphertext.length - tagLength, output, false);
        const data = ciphertext.subarray(0, -tagLength);
        const passedTag = ciphertext.subarray(-tagLength);
        const tag = computeTag(xorStream, key, nonce, data, AAD);
        if (!equalBytes(passedTag, tag))
          throw new Error("invalid tag");
        output.set(ciphertext.subarray(0, -tagLength));
        xorStream(key, nonce, output, output, 1);
        clean(tag);
        return output;
      }
    };
  };
  var chacha20poly1305 = /* @__PURE__ */ wrapCipher({ blockSize: 64, nonceLength: 12, tagLength: 16 }, _poly1305_aead(chacha20));
  var xchacha20poly1305 = /* @__PURE__ */ wrapCipher({ blockSize: 64, nonceLength: 24, tagLength: 16 }, _poly1305_aead(xchacha20));

  // node_modules/.pnpm/age-encryption@0.2.0/node_modules/age-encryption/dist/format.js
  var Stanza = class {
    constructor(args, body) {
      this.args = args;
      this.body = body;
    }
  };
  function flattenArray(arr) {
    const len = arr.reduce((sum, line) => sum + line.length, 0);
    const out = new Uint8Array(len);
    let n = 0;
    for (const a of arr) {
      out.set(a, n);
      n += a.length;
    }
    return out;
  }
  function encodeHeaderNoMAC(recipients) {
    const lines = [];
    lines.push("age-encryption.org/v1\n");
    for (const s of recipients) {
      lines.push("-> " + s.args.join(" ") + "\n");
      for (let i = 0; i < s.body.length; i += 48) {
        let end = i + 48;
        if (end > s.body.length)
          end = s.body.length;
        lines.push(base64nopad.encode(s.body.subarray(i, end)) + "\n");
      }
      if (s.body.length % 48 === 0)
        lines.push("\n");
    }
    lines.push("---");
    return new TextEncoder().encode(lines.join(""));
  }
  function encodeHeader(recipients, MAC) {
    return flattenArray([
      encodeHeaderNoMAC(recipients),
      new TextEncoder().encode(" " + base64nopad.encode(MAC) + "\n")
    ]);
  }

  // node_modules/.pnpm/age-encryption@0.2.0/node_modules/age-encryption/dist/recipients.js
  var __awaiter2 = function(thisArg, _arguments, P, generator) {
    function adopt(value) {
      return value instanceof P ? value : new P(function(resolve) {
        resolve(value);
      });
    }
    return new (P || (P = Promise))(function(resolve, reject) {
      function fulfilled(value) {
        try {
          step(generator.next(value));
        } catch (e) {
          reject(e);
        }
      }
      function rejected(value) {
        try {
          step(generator["throw"](value));
        } catch (e) {
          reject(e);
        }
      }
      function step(result) {
        result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected);
      }
      step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
  };
  function x25519Wrap(fileKey, recipient) {
    return __awaiter2(this, void 0, void 0, function* () {
      const ephemeral = randomBytes(32);
      const share = yield scalarMultBase(ephemeral);
      const secret = yield scalarMult(ephemeral, recipient);
      const salt = new Uint8Array(share.length + recipient.length);
      salt.set(share);
      salt.set(recipient, share.length);
      const key = hkdf(sha256, secret, salt, "age-encryption.org/v1/X25519", 32);
      return new Stanza(["X25519", base64nopad.encode(share)], encryptFileKey(fileKey, key));
    });
  }
  function scryptWrap(fileKey, passphrase, logN) {
    const salt = randomBytes(16);
    const label = "age-encryption.org/v1/scrypt";
    const labelAndSalt = new Uint8Array(label.length + 16);
    labelAndSalt.set(new TextEncoder().encode(label));
    labelAndSalt.set(salt, label.length);
    const key = scrypt(passphrase, labelAndSalt, { N: Math.pow(2, logN), r: 8, p: 1, dkLen: 32 });
    return new Stanza(["scrypt", base64nopad.encode(salt), logN.toString()], encryptFileKey(fileKey, key));
  }
  function encryptFileKey(fileKey, key) {
    const nonce = new Uint8Array(12);
    return chacha20poly1305(key, nonce).encrypt(fileKey);
  }

  // node_modules/.pnpm/age-encryption@0.2.0/node_modules/age-encryption/dist/stream.js
  var chacha20poly1305Overhead = 16;
  var chunkSize = 64 * 1024;
  var chunkSizeWithOverhead = chunkSize + chacha20poly1305Overhead;
  function encryptSTREAM(key, plaintext) {
    const streamNonce = new Uint8Array(12);
    const incNonce = () => {
      for (let i = streamNonce.length - 2; i >= 0; i--) {
        streamNonce[i]++;
        if (streamNonce[i] !== 0)
          break;
      }
    };
    const chunkCount = plaintext.length === 0 ? 1 : Math.ceil(plaintext.length / chunkSize);
    const overhead = chunkCount * chacha20poly1305Overhead;
    const ciphertext = new Uint8Array(plaintext.length + overhead);
    let ciphertextSlice = ciphertext;
    while (plaintext.length > chunkSize) {
      const chunk2 = chacha20poly1305(key, streamNonce).encrypt(plaintext.subarray(0, chunkSize));
      ciphertextSlice.set(chunk2);
      ciphertextSlice = ciphertextSlice.subarray(chunk2.length);
      plaintext = plaintext.subarray(chunkSize);
      incNonce();
    }
    streamNonce[11] = 1;
    const chunk = chacha20poly1305(key, streamNonce).encrypt(plaintext);
    ciphertextSlice.set(chunk);
    if (ciphertextSlice.length !== chunk.length)
      throw Error("stream: internal error: didn't fill expected ciphertext buffer");
    return ciphertext;
  }

  // node_modules/.pnpm/age-encryption@0.2.0/node_modules/age-encryption/dist/index.js
  var __awaiter3 = function(thisArg, _arguments, P, generator) {
    function adopt(value) {
      return value instanceof P ? value : new P(function(resolve) {
        resolve(value);
      });
    }
    return new (P || (P = Promise))(function(resolve, reject) {
      function fulfilled(value) {
        try {
          step(generator.next(value));
        } catch (e) {
          reject(e);
        }
      }
      function rejected(value) {
        try {
          step(generator["throw"](value));
        } catch (e) {
          reject(e);
        }
      }
      function step(result) {
        result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected);
      }
      step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
  };
  var Encrypter = class {
    constructor() {
      this.passphrase = null;
      this.scryptWorkFactor = 18;
      this.recipients = [];
    }
    setPassphrase(s) {
      if (this.passphrase !== null)
        throw new Error("can encrypt to at most one passphrase");
      if (this.recipients.length !== 0)
        throw new Error("can't encrypt to both recipients and passphrases");
      this.passphrase = s;
    }
    setScryptWorkFactor(logN) {
      this.scryptWorkFactor = logN;
    }
    addRecipient(s) {
      if (this.passphrase !== null)
        throw new Error("can't encrypt to both recipients and passphrases");
      const res = bech32.decodeToBytes(s);
      if (!s.startsWith("age1") || res.prefix.toLowerCase() !== "age" || res.bytes.length !== 32)
        throw Error("invalid recipient");
      this.recipients.push(res.bytes);
    }
    encrypt(file) {
      return __awaiter3(this, void 0, void 0, function* () {
        if (typeof file === "string") {
          file = new TextEncoder().encode(file);
        }
        const fileKey = randomBytes(16);
        const stanzas = [];
        for (const recipient of this.recipients) {
          stanzas.push(yield x25519Wrap(fileKey, recipient));
        }
        if (this.passphrase !== null) {
          stanzas.push(scryptWrap(fileKey, this.passphrase, this.scryptWorkFactor));
        }
        const hmacKey = hkdf(sha256, fileKey, void 0, "header", 32);
        const mac = hmac(sha256, hmacKey, encodeHeaderNoMAC(stanzas));
        const header = encodeHeader(stanzas, mac);
        const nonce = randomBytes(16);
        const streamKey = hkdf(sha256, fileKey, nonce, "payload", 32);
        const payload = encryptSTREAM(streamKey, file);
        const out = new Uint8Array(header.length + nonce.length + payload.length);
        out.set(header);
        out.set(nonce, header.length);
        out.set(payload, header.length + nonce.length);
        return out;
      });
    }
  };

  // src/crypto.ts
  async function encryptData(data, passphrase) {
    const e = new Encrypter();
    e.setPassphrase(passphrase);
    return await e.encrypt(data);
  }

  // node_modules/.pnpm/@atcute+cbor@2.1.1/node_modules/@atcute/cbor/dist/bytes.js
  var BytesWrapper = class {
    buf;
    constructor(buf) {
      this.buf = buf;
    }
    get $bytes() {
      return toBase64(this.buf);
    }
    toJSON() {
      return { $bytes: this.$bytes };
    }
  };
  var toBytes3 = (buf) => {
    return new BytesWrapper(buf);
  };

  // node_modules/.pnpm/@atcute+tid@1.0.2/node_modules/@atcute/tid/dist/s32.js
  var S32_CHAR = "234567abcdefghijklmnopqrstuvwxyz";
  var s32encode = (i) => {
    let s = "";
    while (i) {
      const c = i % 32;
      i = Math.floor(i / 32);
      s = S32_CHAR.charAt(c) + s;
    }
    return s;
  };

  // node_modules/.pnpm/@atcute+tid@1.0.2/node_modules/@atcute/tid/dist/index.js
  var lastTimestamp = 0;
  var createRaw = (timestamp, clockid) => {
    return s32encode(timestamp).padStart(11, "2") + s32encode(clockid).padStart(2, "2");
  };
  var now = () => {
    let timestamp = Math.max(Date.now() * 1e3, lastTimestamp);
    lastTimestamp = timestamp + 1;
    return createRaw(timestamp, Math.floor(Math.random() * 1023));
  };

  // src/main.ts
  console.log("hello world!");
  var processedElements = /* @__PURE__ */ new WeakSet();
  async function getLoggedInAgent() {
    const { agent, manager } = await KittyAgent.createPdsWithCredentials(GM_getValue("bskyUsername"));
    let session = GM_getValue("bskySession");
    if (session) {
      try {
        await manager.resume(session);
      } catch (err) {
        console.warn("failed to resume session", err);
        session = await manager.login({ identifier: GM_getValue("bskyUsername"), password: GM_getValue("bskyPassword") });
      }
    } else {
      session = await manager.login({ identifier: GM_getValue("bskyUsername"), password: GM_getValue("bskyPassword") });
      GM_setValue("bskySession", session);
    }
    return agent;
  }
  GM_registerMenuCommand("Set webhook", () => {
    const result = prompt("Paste webhook URL here");
    if (result != null) {
      GM_setValue("webhookUrl", result);
      alert("URL set!");
    }
  });
  GM_registerMenuCommand("Set Bluesky details", () => {
    let result = prompt("Bluesky username");
    if (result != null) {
      GM_setValue("bskyUsername", result);
    }
    result = prompt("Bluesky password");
    if (result != null) {
      GM_setValue("bskyPassword", result);
    }
  });
  GM_registerMenuCommand("Set encryption password", () => {
    const result = prompt("Paste password here");
    if (result != null) {
      GM_setValue("cryptoPassword", result);
    }
  });
  setInterval(() => {
    const newElements = [...document.querySelectorAll('[data-testid^="feedItem-"], [data-testid^="postThreadItem-"]')].map((e) => {
      return {
        element: e,
        buttons: e.querySelector('[aria-label="Open post options menu"]')?.parentElement.parentElement.parentElement,
        postLink: e.querySelector('[href^="/profile/"][href*="/post/"]')?.href
      };
    });
    for (const { element, buttons, postLink } of newElements) {
      if (processedElements.has(element)) {
        continue;
      }
      processedElements.add(element);
      const button = document.createElement("button");
      button.textContent = "\u{1F4CC}";
      button.onclick = async (e) => {
        e.stopPropagation();
        e.preventDefault();
        console.log(`bookmarking ${postLink ?? document.location.href}`);
        await Promise.all([
          (async () => {
            if (!GM_getValue("cryptoPassword") || !GM_getValue("bskyUsername") || !GM_getValue("bskyPassword")) {
              alert("Bluesky account not configured!");
              return;
            }
            const postMatch = (postLink ?? document.location.href).match(/\/profile\/(.*?)\/post\/(.*)/i);
            if (!postMatch) {
              alert("URL did not match regex!");
              return;
            }
            const [, repo, rkey] = postMatch;
            console.log("logging in");
            const agent = await getLoggedInAgent();
            console.log("logged in");
            await agent.put({
              collection: "invalid.uwx.encrypted.bookmark",
              repo: GM_getValue("bskyUsername"),
              rkey: now(),
              record: {
                $type: "invalid.uwx.encrypted.bookmark",
                encryptedUrl: toBytes3(
                  await encryptData(
                    new TextEncoder().encode(
                      JSON.stringify(
                        {
                          repo,
                          rkey
                        }
                      )
                    ),
                    GM_getValue("cryptoPassword")
                  )
                )
              }
            });
          })(),
          (async () => {
            if (!GM_getValue("webhookUrl")) {
              alert("No webhook URL set!");
              return;
            }
            await (0, import_gm_fetch.GM_fetch)(
              GM_getValue("webhookUrl"),
              {
                method: "POST",
                body: JSON.stringify({
                  content: fixLink(postLink ?? document.location.href)
                }),
                headers: {
                  "Content-Type": "application/json"
                }
              }
            );
          })()
        ]);
      };
      if (!buttons) continue;
      buttons.append(button);
    }
  }, 250);
  function fixLink(link) {
    const url = new URL(link);
    url.hostname = "bskyx.app";
    return url.toString();
  }
})();
/*! Bundled license information:

kitty-agent/out/handles/did-document.js:
  (*!
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
  *)

@scure/base/lib/esm/index.js:
  (*! scure-base - MIT License (c) 2022 Paul Miller (paulmillr.com) *)

@noble/hashes/esm/utils.js:
  (*! noble-hashes - MIT License (c) 2022 Paul Miller (paulmillr.com) *)

@noble/curves/esm/abstract/utils.js:
  (*! noble-curves - MIT License (c) 2022 Paul Miller (paulmillr.com) *)

@noble/curves/esm/abstract/modular.js:
  (*! noble-curves - MIT License (c) 2022 Paul Miller (paulmillr.com) *)

@noble/curves/esm/abstract/montgomery.js:
  (*! noble-curves - MIT License (c) 2022 Paul Miller (paulmillr.com) *)

@noble/curves/esm/ed25519.js:
  (*! noble-curves - MIT License (c) 2022 Paul Miller (paulmillr.com) *)

@noble/ciphers/esm/utils.js:
  (*! noble-ciphers - MIT License (c) 2023 Paul Miller (paulmillr.com) *)
*/
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsiLi4vbm9kZV9tb2R1bGVzLy5wbnBtL0B1d3grZ20tZmV0Y2hAMi4wLjMvbm9kZV9tb2R1bGVzL0B1d3gvZ20tZmV0Y2gvc3JjL0dNX2ZldGNoLnRzIiwgIi4uL25vZGVfbW9kdWxlcy8ucG5wbS9AYXRwcm90bytzeW50YXhAMC4zLjEvbm9kZV9tb2R1bGVzL0BhdHByb3RvL3N5bnRheC9zcmMvaGFuZGxlLnRzIiwgIi4uL25vZGVfbW9kdWxlcy8ucG5wbS9AYXRwcm90bytzeW50YXhAMC4zLjEvbm9kZV9tb2R1bGVzL0BhdHByb3RvL3N5bnRheC9zcmMvZGlkLnRzIiwgIi4uL25vZGVfbW9kdWxlcy8ucG5wbS9AYXRwcm90bytzeW50YXhAMC4zLjEvbm9kZV9tb2R1bGVzL0BhdHByb3RvL3N5bnRheC9zcmMvbnNpZC50cyIsICIuLi9ub2RlX21vZHVsZXMvLnBucG0vQGF0cHJvdG8rc3ludGF4QDAuMy4xL25vZGVfbW9kdWxlcy9AYXRwcm90by9zeW50YXgvc3JjL2F0dXJpX3ZhbGlkYXRpb24udHMiLCAiLi4vbm9kZV9tb2R1bGVzLy5wbnBtL0BhdHByb3RvK3N5bnRheEAwLjMuMS9ub2RlX21vZHVsZXMvQGF0cHJvdG8vc3ludGF4L3NyYy9hdHVyaS50cyIsICIuLi9ub2RlX21vZHVsZXMvLnBucG0vQGF0cHJvdG8rc3ludGF4QDAuMy4xL25vZGVfbW9kdWxlcy9AYXRwcm90by9zeW50YXgvc3JjL3RpZC50cyIsICIuLi9ub2RlX21vZHVsZXMvLnBucG0vQGF0cHJvdG8rc3ludGF4QDAuMy4xL25vZGVfbW9kdWxlcy9AYXRwcm90by9zeW50YXgvc3JjL3JlY29yZGtleS50cyIsICIuLi9ub2RlX21vZHVsZXMvLnBucG0vQGF0cHJvdG8rc3ludGF4QDAuMy4xL25vZGVfbW9kdWxlcy9AYXRwcm90by9zeW50YXgvc3JjL2RhdGV0aW1lLnRzIiwgIi4uL25vZGVfbW9kdWxlcy8ucG5wbS9AYXRwcm90bytzeW50YXhAMC4zLjEvbm9kZV9tb2R1bGVzL0BhdHByb3RvL3N5bnRheC9zcmMvaW5kZXgudHMiLCAiLi4vc3JjL21haW4udHMiLCAiLi4vbm9kZV9tb2R1bGVzLy5wbnBtL0BhdGN1dGUrY2xpZW50QDIuMC42L25vZGVfbW9kdWxlcy9AYXRjdXRlL2NsaWVudC9saWIvZmV0Y2gtaGFuZGxlci50cyIsICIuLi9ub2RlX21vZHVsZXMvLnBucG0vQGF0Y3V0ZStjbGllbnRAMi4wLjYvbm9kZV9tb2R1bGVzL0BhdGN1dGUvY2xpZW50L2xpYi91dGlscy9odHRwLnRzIiwgIi4uL25vZGVfbW9kdWxlcy8ucG5wbS9AYXRjdXRlK2NsaWVudEAyLjAuNi9ub2RlX21vZHVsZXMvQGF0Y3V0ZS9jbGllbnQvbGliL3JwYy50cyIsICIuLi9ub2RlX21vZHVsZXMvLnBucG0vQGF0Y3V0ZStjbGllbnRAMi4wLjYvbm9kZV9tb2R1bGVzL0BhdGN1dGUvY2xpZW50L2xpYi91dGlscy9kaWQudHMiLCAiLi4vbm9kZV9tb2R1bGVzLy5wbnBtL0BhdGN1dGUrY2xpZW50QDIuMC42L25vZGVfbW9kdWxlcy9AYXRjdXRlL2NsaWVudC9saWIvdXRpbHMvand0LnRzIiwgIi4uL25vZGVfbW9kdWxlcy8ucG5wbS9AYXRjdXRlK2NsaWVudEAyLjAuNi9ub2RlX21vZHVsZXMvQGF0Y3V0ZS9jbGllbnQvbGliL2NyZWRlbnRpYWwtbWFuYWdlci50cyIsICIuLi9ub2RlX21vZHVsZXMvLnBucG0va2l0dHktYWdlbnRAOC4zLjBfQGF0Y3V0ZStjaWRAMi4xLjBfQGF0Y3V0ZStjbGllbnRAMi4wLjZfQGF0Y3V0ZStvYXV0aC1icm93c2VyLWNsaWVudEAxLjAuOV9AYXRwcm90bytzeW50YXhAMC4zLjEvbm9kZV9tb2R1bGVzL2tpdHR5LWFnZW50L3NyYy9hZ2VudC50cyIsICIuLi9ub2RlX21vZHVsZXMvLnBucG0va2l0dHktYWdlbnRAOC4zLjBfQGF0Y3V0ZStjaWRAMi4xLjBfQGF0Y3V0ZStjbGllbnRAMi4wLjZfQGF0Y3V0ZStvYXV0aC1icm93c2VyLWNsaWVudEAxLjAuOV9AYXRwcm90bytzeW50YXhAMC4zLjEvbm9kZV9tb2R1bGVzL2tpdHR5LWFnZW50L3NyYy9oYW5kbGVzL2RpZC1kb2N1bWVudC50cyIsICIuLi9ub2RlX21vZHVsZXMvLnBucG0va2l0dHktYWdlbnRAOC4zLjBfQGF0Y3V0ZStjaWRAMi4xLjBfQGF0Y3V0ZStjbGllbnRAMi4wLjZfQGF0Y3V0ZStvYXV0aC1icm93c2VyLWNsaWVudEAxLjAuOV9AYXRwcm90bytzeW50YXhAMC4zLjEvbm9kZV9tb2R1bGVzL2tpdHR5LWFnZW50L3NyYy9oYW5kbGVzL2luZGV4LnRzIiwgIi4uL25vZGVfbW9kdWxlcy8ucG5wbS9raXR0eS1hZ2VudEA4LjMuMF9AYXRjdXRlK2NpZEAyLjEuMF9AYXRjdXRlK2NsaWVudEAyLjAuNl9AYXRjdXRlK29hdXRoLWJyb3dzZXItY2xpZW50QDEuMC45X0BhdHByb3RvK3N5bnRheEAwLjMuMS9ub2RlX21vZHVsZXMva2l0dHktYWdlbnQvc3JjL2hhbmRsZXMvZG9oLnRzIiwgIi4uL25vZGVfbW9kdWxlcy8ucG5wbS9raXR0eS1hZ2VudEA4LjMuMF9AYXRjdXRlK2NpZEAyLjEuMF9AYXRjdXRlK2NsaWVudEAyLjAuNl9AYXRjdXRlK29hdXRoLWJyb3dzZXItY2xpZW50QDEuMC45X0BhdHByb3RvK3N5bnRheEAwLjMuMS9ub2RlX21vZHVsZXMva2l0dHktYWdlbnQvc3JjL2hhbmRsZXMvaHR0cC50cyIsICIuLi9ub2RlX21vZHVsZXMvLnBucG0va2l0dHktYWdlbnRAOC4zLjBfQGF0Y3V0ZStjaWRAMi4xLjBfQGF0Y3V0ZStjbGllbnRAMi4wLjZfQGF0Y3V0ZStvYXV0aC1icm93c2VyLWNsaWVudEAxLjAuOV9AYXRwcm90bytzeW50YXhAMC4zLjEvbm9kZV9tb2R1bGVzL2tpdHR5LWFnZW50L3NyYy9oYW5kbGVzL3Jlc29sdmUudHMiLCAiLi4vbm9kZV9tb2R1bGVzLy5wbnBtL2tpdHR5LWFnZW50QDguMy4wX0BhdGN1dGUrY2lkQDIuMS4wX0BhdGN1dGUrY2xpZW50QDIuMC42X0BhdGN1dGUrb2F1dGgtYnJvd3Nlci1jbGllbnRAMS4wLjlfQGF0cHJvdG8rc3ludGF4QDAuMy4xL25vZGVfbW9kdWxlcy9raXR0eS1hZ2VudC9zcmMvcGRzLWhlbHBlcnMudHMiLCAiLi4vbm9kZV9tb2R1bGVzLy5wbnBtL0BhdGN1dGUrbXVsdGliYXNlQDEuMS4xL25vZGVfbW9kdWxlcy9AYXRjdXRlL211bHRpYmFzZS9saWIvdXRpbHMudHMiLCAiLi4vbm9kZV9tb2R1bGVzLy5wbnBtL0BhdGN1dGUrbXVsdGliYXNlQDEuMS4xL25vZGVfbW9kdWxlcy9AYXRjdXRlL211bHRpYmFzZS9saWIvYmFzZXMvYmFzZTY0LnRzIiwgIi4uL25vZGVfbW9kdWxlcy8ucG5wbS9Ac2N1cmUrYmFzZUAxLjIuMS9ub2RlX21vZHVsZXMvQHNjdXJlL2Jhc2UvaW5kZXgudHMiLCAiLi4vbm9kZV9tb2R1bGVzLy5wbnBtL0Bub2JsZStoYXNoZXNAMS43LjAvbm9kZV9tb2R1bGVzL0Bub2JsZS9oYXNoZXMvc3JjL19hc3NlcnQudHMiLCAiLi4vbm9kZV9tb2R1bGVzLy5wbnBtL0Bub2JsZStoYXNoZXNAMS43LjAvbm9kZV9tb2R1bGVzL0Bub2JsZS9oYXNoZXMvc3JjL2NyeXB0by50cyIsICIuLi9ub2RlX21vZHVsZXMvLnBucG0vQG5vYmxlK2hhc2hlc0AxLjcuMC9ub2RlX21vZHVsZXMvQG5vYmxlL2hhc2hlcy9zcmMvdXRpbHMudHMiLCAiLi4vbm9kZV9tb2R1bGVzLy5wbnBtL0Bub2JsZStoYXNoZXNAMS43LjAvbm9kZV9tb2R1bGVzL0Bub2JsZS9oYXNoZXMvc3JjL2htYWMudHMiLCAiLi4vbm9kZV9tb2R1bGVzLy5wbnBtL0Bub2JsZStoYXNoZXNAMS43LjAvbm9kZV9tb2R1bGVzL0Bub2JsZS9oYXNoZXMvc3JjL2hrZGYudHMiLCAiLi4vbm9kZV9tb2R1bGVzLy5wbnBtL0Bub2JsZStoYXNoZXNAMS43LjAvbm9kZV9tb2R1bGVzL0Bub2JsZS9oYXNoZXMvc3JjL19tZC50cyIsICIuLi9ub2RlX21vZHVsZXMvLnBucG0vQG5vYmxlK2hhc2hlc0AxLjcuMC9ub2RlX21vZHVsZXMvQG5vYmxlL2hhc2hlcy9zcmMvc2hhMjU2LnRzIiwgIi4uL25vZGVfbW9kdWxlcy8ucG5wbS9Abm9ibGUrY3VydmVzQDEuOC4wL25vZGVfbW9kdWxlcy9Abm9ibGUvY3VydmVzL3NyYy9hYnN0cmFjdC91dGlscy50cyIsICIuLi9ub2RlX21vZHVsZXMvLnBucG0vQG5vYmxlK2N1cnZlc0AxLjguMC9ub2RlX21vZHVsZXMvQG5vYmxlL2N1cnZlcy9zcmMvYWJzdHJhY3QvbW9kdWxhci50cyIsICIuLi9ub2RlX21vZHVsZXMvLnBucG0vQG5vYmxlK2N1cnZlc0AxLjguMC9ub2RlX21vZHVsZXMvQG5vYmxlL2N1cnZlcy9zcmMvYWJzdHJhY3QvbW9udGdvbWVyeS50cyIsICIuLi9ub2RlX21vZHVsZXMvLnBucG0vQG5vYmxlK2N1cnZlc0AxLjguMC9ub2RlX21vZHVsZXMvQG5vYmxlL2N1cnZlcy9zcmMvZWQyNTUxOS50cyIsICIuLi9ub2RlX21vZHVsZXMvLnBucG0vYWdlLWVuY3J5cHRpb25AMC4yLjAvbm9kZV9tb2R1bGVzL2FnZS1lbmNyeXB0aW9uL2Rpc3QveDI1NTE5LmpzIiwgIi4uL25vZGVfbW9kdWxlcy8ucG5wbS9Abm9ibGUraGFzaGVzQDEuNy4wL25vZGVfbW9kdWxlcy9Abm9ibGUvaGFzaGVzL3NyYy9wYmtkZjIudHMiLCAiLi4vbm9kZV9tb2R1bGVzLy5wbnBtL0Bub2JsZStoYXNoZXNAMS43LjAvbm9kZV9tb2R1bGVzL0Bub2JsZS9oYXNoZXMvc3JjL3NjcnlwdC50cyIsICIuLi9ub2RlX21vZHVsZXMvLnBucG0vQG5vYmxlK2NpcGhlcnNAMS4yLjAvbm9kZV9tb2R1bGVzL0Bub2JsZS9jaXBoZXJzL3NyYy9fYXNzZXJ0LnRzIiwgIi4uL25vZGVfbW9kdWxlcy8ucG5wbS9Abm9ibGUrY2lwaGVyc0AxLjIuMC9ub2RlX21vZHVsZXMvQG5vYmxlL2NpcGhlcnMvc3JjL3V0aWxzLnRzIiwgIi4uL25vZGVfbW9kdWxlcy8ucG5wbS9Abm9ibGUrY2lwaGVyc0AxLjIuMC9ub2RlX21vZHVsZXMvQG5vYmxlL2NpcGhlcnMvc3JjL19hcngudHMiLCAiLi4vbm9kZV9tb2R1bGVzLy5wbnBtL0Bub2JsZStjaXBoZXJzQDEuMi4wL25vZGVfbW9kdWxlcy9Abm9ibGUvY2lwaGVycy9zcmMvX3BvbHkxMzA1LnRzIiwgIi4uL25vZGVfbW9kdWxlcy8ucG5wbS9Abm9ibGUrY2lwaGVyc0AxLjIuMC9ub2RlX21vZHVsZXMvQG5vYmxlL2NpcGhlcnMvc3JjL2NoYWNoYS50cyIsICIuLi9ub2RlX21vZHVsZXMvLnBucG0vYWdlLWVuY3J5cHRpb25AMC4yLjAvbm9kZV9tb2R1bGVzL2FnZS1lbmNyeXB0aW9uL2Rpc3QvZm9ybWF0LmpzIiwgIi4uL25vZGVfbW9kdWxlcy8ucG5wbS9hZ2UtZW5jcnlwdGlvbkAwLjIuMC9ub2RlX21vZHVsZXMvYWdlLWVuY3J5cHRpb24vZGlzdC9yZWNpcGllbnRzLmpzIiwgIi4uL25vZGVfbW9kdWxlcy8ucG5wbS9hZ2UtZW5jcnlwdGlvbkAwLjIuMC9ub2RlX21vZHVsZXMvYWdlLWVuY3J5cHRpb24vZGlzdC9zdHJlYW0uanMiLCAiLi4vbm9kZV9tb2R1bGVzLy5wbnBtL2FnZS1lbmNyeXB0aW9uQDAuMi4wL25vZGVfbW9kdWxlcy9hZ2UtZW5jcnlwdGlvbi9kaXN0L2luZGV4LmpzIiwgIi4uL3NyYy9jcnlwdG8udHMiLCAiLi4vbm9kZV9tb2R1bGVzLy5wbnBtL0BhdGN1dGUrY2JvckAyLjEuMS9ub2RlX21vZHVsZXMvQGF0Y3V0ZS9jYm9yL2xpYi9ieXRlcy50cyIsICIuLi9ub2RlX21vZHVsZXMvLnBucG0vQGF0Y3V0ZSt0aWRAMS4wLjIvbm9kZV9tb2R1bGVzL0BhdGN1dGUvdGlkL2xpYi9zMzIudHMiLCAiLi4vbm9kZV9tb2R1bGVzLy5wbnBtL0BhdGN1dGUrdGlkQDEuMC4yL25vZGVfbW9kdWxlcy9AYXRjdXRlL3RpZC9saWIvaW5kZXgudHMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbIi8vIGh0dHBzOi8vZ2l0aHViLmNvbS9taXRjaGVsbG1lYmFuZS9HTV9mZXRjaFxuLy9cbi8vIENvcHlyaWdodCAoYykgMjAxNSBNaXRjaGVsbCBNZWJhbmVcbi8vIENvcHlyaWdodCAoYykgMjAxNC0yMDE1IEdpdEh1YiwgSW5jLlxuLy9cbi8vIFBlcm1pc3Npb24gaXMgaGVyZWJ5IGdyYW50ZWQsIGZyZWUgb2YgY2hhcmdlLCB0byBhbnkgcGVyc29uIG9idGFpbmluZ1xuLy8gYSBjb3B5IG9mIHRoaXMgc29mdHdhcmUgYW5kIGFzc29jaWF0ZWQgZG9jdW1lbnRhdGlvbiBmaWxlcyAodGhlXG4vLyBcIlNvZnR3YXJlXCIpLCB0byBkZWFsIGluIHRoZSBTb2Z0d2FyZSB3aXRob3V0IHJlc3RyaWN0aW9uLCBpbmNsdWRpbmdcbi8vIHdpdGhvdXQgbGltaXRhdGlvbiB0aGUgcmlnaHRzIHRvIHVzZSwgY29weSwgbW9kaWZ5LCBtZXJnZSwgcHVibGlzaCxcbi8vIGRpc3RyaWJ1dGUsIHN1YmxpY2Vuc2UsIGFuZC9vciBzZWxsIGNvcGllcyBvZiB0aGUgU29mdHdhcmUsIGFuZCB0b1xuLy8gcGVybWl0IHBlcnNvbnMgdG8gd2hvbSB0aGUgU29mdHdhcmUgaXMgZnVybmlzaGVkIHRvIGRvIHNvLCBzdWJqZWN0IHRvXG4vLyB0aGUgZm9sbG93aW5nIGNvbmRpdGlvbnM6XG4vL1xuLy8gVGhlIGFib3ZlIGNvcHlyaWdodCBub3RpY2UgYW5kIHRoaXMgcGVybWlzc2lvbiBub3RpY2Ugc2hhbGwgYmVcbi8vIGluY2x1ZGVkIGluIGFsbCBjb3BpZXMgb3Igc3Vic3RhbnRpYWwgcG9ydGlvbnMgb2YgdGhlIFNvZnR3YXJlLlxuLy9cbi8vIFRIRSBTT0ZUV0FSRSBJUyBQUk9WSURFRCBcIkFTIElTXCIsIFdJVEhPVVQgV0FSUkFOVFkgT0YgQU5ZIEtJTkQsXG4vLyBFWFBSRVNTIE9SIElNUExJRUQsIElOQ0xVRElORyBCVVQgTk9UIExJTUlURUQgVE8gVEhFIFdBUlJBTlRJRVMgT0Zcbi8vIE1FUkNIQU5UQUJJTElUWSwgRklUTkVTUyBGT1IgQSBQQVJUSUNVTEFSIFBVUlBPU0UgQU5EXG4vLyBOT05JTkZSSU5HRU1FTlQuIElOIE5PIEVWRU5UIFNIQUxMIFRIRSBBVVRIT1JTIE9SIENPUFlSSUdIVCBIT0xERVJTIEJFXG4vLyBMSUFCTEUgRk9SIEFOWSBDTEFJTSwgREFNQUdFUyBPUiBPVEhFUiBMSUFCSUxJVFksIFdIRVRIRVIgSU4gQU4gQUNUSU9OXG4vLyBPRiBDT05UUkFDVCwgVE9SVCBPUiBPVEhFUldJU0UsIEFSSVNJTkcgRlJPTSwgT1VUIE9GIE9SIElOIENPTk5FQ1RJT05cbi8vIFdJVEggVEhFIFNPRlRXQVJFIE9SIFRIRSBVU0UgT1IgT1RIRVIgREVBTElOR1MgSU4gVEhFIFNPRlRXQVJFLlxuXG4vLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgQHR5cGVzY3JpcHQtZXNsaW50L2Jhbi10eXBlc1xudHlwZSBrbm93biA9IHN0cmluZyB8IG51bWJlciB8IGJvb2xlYW4gfCBzeW1ib2wgfCBiaWdpbnQgfCBvYmplY3QgfCBudWxsIHwgdW5kZWZpbmVkO1xuXG5mdW5jdGlvbiBub3JtYWxpemVOYW1lKG5hbWU6IGtub3duKTogc3RyaW5nIHtcbiAgICBpZiAodHlwZW9mIG5hbWUgIT09ICdzdHJpbmcnKSB7XG4gICAgICAgIG5hbWUgPSBTdHJpbmcobmFtZSk7XG4gICAgfVxuICAgIGlmICgvW15cXHcjJCUmJyorLl5gfH4tXS9pLnRlc3QobmFtZSkpIHtcbiAgICAgICAgdGhyb3cgbmV3IFR5cGVFcnJvcignSW52YWxpZCBjaGFyYWN0ZXIgaW4gaGVhZGVyIGZpZWxkIG5hbWUnKTtcbiAgICB9XG4gICAgcmV0dXJuIG5hbWU7IC8vIFRPRE8gY2FzZSBpbnNlbnNpdGl2aXR5XG59XG5cbmZ1bmN0aW9uIG5vcm1hbGl6ZVZhbHVlKHZhbHVlOiBrbm93bik6IHN0cmluZyB7XG4gICAgaWYgKHR5cGVvZiB2YWx1ZSAhPT0gJ3N0cmluZycpIHtcbiAgICAgICAgdmFsdWUgPSBTdHJpbmcodmFsdWUpO1xuICAgIH1cbiAgICByZXR1cm4gdmFsdWU7XG59XG5cbmV4cG9ydCBjbGFzcyBIZWFkZXJzIHtcbiAgICBwcml2YXRlIG1hcDogUmVjb3JkPHN0cmluZywgc3RyaW5nW10+ID0ge307XG5cbiAgICBjb25zdHJ1Y3RvcihoZWFkZXJzPzogSGVhZGVycyB8IFJlY29yZDxzdHJpbmcsIGtub3duPikge1xuICAgICAgICB0aGlzLm1hcCA9IHt9O1xuXG4gICAgICAgIGlmIChoZWFkZXJzIGluc3RhbmNlb2YgSGVhZGVycykge1xuICAgICAgICAgICAgaGVhZGVycy5mb3JFYWNoKCh2YWx1ZSwgbmFtZSkgPT4ge1xuICAgICAgICAgICAgICAgIHRoaXMuYXBwZW5kKG5hbWUsIHZhbHVlKTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9IGVsc2UgaWYgKGhlYWRlcnMpIHtcbiAgICAgICAgICAgIGZvciAoY29uc3QgbmFtZSBvZiBPYmplY3QuZ2V0T3duUHJvcGVydHlOYW1lcyhoZWFkZXJzKSkge1xuICAgICAgICAgICAgICAgIHRoaXMuYXBwZW5kKG5hbWUsIGhlYWRlcnNbbmFtZV0pO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxuXG4gICAgYXBwZW5kKG5hbWU6IGtub3duLCB2YWx1ZToga25vd24pOiB2b2lkIHtcbiAgICAgICAgbmFtZSA9IG5vcm1hbGl6ZU5hbWUobmFtZSk7XG4gICAgICAgIHZhbHVlID0gbm9ybWFsaXplVmFsdWUodmFsdWUpO1xuXG4gICAgICAgIGNvbnN0IGxpc3QgPSB0aGlzLm1hcFtuYW1lXTtcbiAgICAgICAgaWYgKGxpc3QgPT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgdGhpcy5tYXBbbmFtZV0gPSBbdmFsdWVdO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgbGlzdC5wdXNoKHZhbHVlKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGRlbGV0ZShuYW1lOiBrbm93bik6IHZvaWQge1xuICAgICAgICBkZWxldGUgdGhpcy5tYXBbbm9ybWFsaXplTmFtZShuYW1lKV07XG4gICAgfVxuXG4gICAgZ2V0KG5hbWU6IGtub3duKTogc3RyaW5nIHwgbnVsbCB7XG4gICAgICAgIGNvbnN0IHZhbHVlcyA9IHRoaXMubWFwW25vcm1hbGl6ZU5hbWUobmFtZSldO1xuICAgICAgICByZXR1cm4gdmFsdWVzID8gdmFsdWVzWzBdIDogbnVsbDtcbiAgICB9XG5cbiAgICBnZXRBbGwobmFtZToga25vd24pOiBzdHJpbmdbXSB7XG4gICAgICAgIHJldHVybiB0aGlzLm1hcFtub3JtYWxpemVOYW1lKG5hbWUpXSB8fCBbXTtcbiAgICB9XG5cbiAgICBoYXMobmFtZToga25vd24pOiBib29sZWFuIHtcbiAgICAgICAgcmV0dXJuIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbCh0aGlzLm1hcCwgbm9ybWFsaXplTmFtZShuYW1lKSk7XG4gICAgfVxuXG4gICAgc2V0KG5hbWU6IGtub3duLCB2YWx1ZToga25vd24pOiB2b2lkIHtcbiAgICAgICAgdGhpcy5tYXBbbm9ybWFsaXplTmFtZShuYW1lKV0gPSBbbm9ybWFsaXplVmFsdWUodmFsdWUpXTtcbiAgICB9XG5cbiAgICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgdW5pY29ybi9wcmV2ZW50LWFiYnJldmlhdGlvbnNcbiAgICBmb3JFYWNoKGNhbGxiYWNrOiAodmFsdWU6IHN0cmluZywgbmFtZTogc3RyaW5nLCB0aGlzQXJnOiB0aGlzKSA9PiB2b2lkLCB0aGlzQXJnPzogdW5rbm93bik6IHZvaWQge1xuICAgICAgICBmb3IgKGNvbnN0IG5hbWUgb2YgT2JqZWN0LmdldE93blByb3BlcnR5TmFtZXModGhpcy5tYXApKSB7XG4gICAgICAgICAgICBmb3IgKGNvbnN0IHZhbHVlIG9mIHRoaXMubWFwW25hbWVdKSB7XG4gICAgICAgICAgICAgICAgY2FsbGJhY2suY2FsbCh0aGlzQXJnLCB2YWx1ZSwgbmFtZSwgdGhpcyk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICAqW1N5bWJvbC5pdGVyYXRvcl0oKTogSXRlcmF0b3I8W25hbWU6IHN0cmluZywgdmFsdWU6IHN0cmluZ10+IHtcbiAgICAgICAgZm9yIChjb25zdCBbbmFtZSwgdmFsdWVzXSBvZiBPYmplY3QuZW50cmllcyh0aGlzLm1hcCkpIHtcbiAgICAgICAgICAgIGZvciAoY29uc3QgdmFsdWUgb2YgdmFsdWVzKSB7XG4gICAgICAgICAgICAgICAgeWllbGQgW25hbWUsIHZhbHVlXTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cbn1cblxuZnVuY3Rpb24gZmlsZVJlYWRlclJlYWR5KHJlYWRlcjogRmlsZVJlYWRlcik6IFByb21pc2U8c3RyaW5nIHwgQXJyYXlCdWZmZXIgfCBudWxsPiB7XG4gICAgcmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IHtcbiAgICAgICAgcmVhZGVyLmFkZEV2ZW50TGlzdGVuZXIoJ2xvYWQnLCAoKSA9PiB7XG4gICAgICAgICAgICByZXNvbHZlKHJlYWRlci5yZXN1bHQpO1xuICAgICAgICB9KTtcbiAgICAgICAgcmVhZGVyLmFkZEV2ZW50TGlzdGVuZXIoJ2Vycm9yJywgKCkgPT4ge1xuICAgICAgICAgICAgcmVqZWN0KHJlYWRlci5lcnJvcik7XG4gICAgICAgIH0pO1xuICAgIH0pO1xufVxuXG5mdW5jdGlvbiByZWFkQmxvYkFzQXJyYXlCdWZmZXIoYmxvYjogQmxvYik6IFByb21pc2U8QXJyYXlCdWZmZXI+IHtcbiAgICBjb25zdCByZWFkZXIgPSBuZXcgRmlsZVJlYWRlcigpO1xuICAgIHJlYWRlci5yZWFkQXNBcnJheUJ1ZmZlcihibG9iKTtcbiAgICByZXR1cm4gZmlsZVJlYWRlclJlYWR5KHJlYWRlcikgYXMgUHJvbWlzZTxBcnJheUJ1ZmZlcj47XG59XG5cbmZ1bmN0aW9uIHJlYWRCbG9iQXNUZXh0KGJsb2I6IEJsb2IpOiBQcm9taXNlPHN0cmluZz4ge1xuICAgIGNvbnN0IHJlYWRlciA9IG5ldyBGaWxlUmVhZGVyKCk7XG4gICAgcmVhZGVyLnJlYWRBc1RleHQoYmxvYik7XG4gICAgcmV0dXJuIGZpbGVSZWFkZXJSZWFkeShyZWFkZXIpIGFzIFByb21pc2U8c3RyaW5nPjtcbn1cblxuY29uc3QgdGV4dEVuY29kZXIgPSBuZXcgVGV4dEVuY29kZXIoKTtcbmNvbnN0IHRleHREZWNvZGVyID0gbmV3IFRleHREZWNvZGVyKCk7XG5hYnN0cmFjdCBjbGFzcyBCb2R5IHtcbiAgICBwcm90ZWN0ZWQgX2JvZHlVc2VkID0gZmFsc2U7XG5cbiAgICBwcm90ZWN0ZWQgYWJzdHJhY3QgZ2V0IGJvZHkoKTogc3RyaW5nIHwgQXJyYXlCdWZmZXIgfCBCbG9iIHwgRm9ybURhdGEgfCB1bmRlZmluZWQ7XG5cbiAgICBnZXQgYm9keVVzZWQoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLl9ib2R5VXNlZDtcbiAgICB9XG5cbiAgICBibG9iKCk6IFByb21pc2U8QmxvYj4ge1xuICAgICAgICBpZiAodGhpcy5fYm9keVVzZWQpIHtcbiAgICAgICAgICAgIHJldHVybiBQcm9taXNlLnJlamVjdChuZXcgVHlwZUVycm9yKCdCb2R5IGNvbnRlbnRzIGFscmVhZHkgcmVhZCcpKTtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLl9ib2R5VXNlZCA9IHRydWU7XG5cbiAgICAgICAgY29uc3QgYm9keSA9IHRoaXMuYm9keTtcbiAgICAgICAgaWYgKHR5cGVvZiBib2R5ID09PSAnc3RyaW5nJyB8fCBib2R5IGluc3RhbmNlb2YgQXJyYXlCdWZmZXIpIHtcbiAgICAgICAgICAgIHJldHVybiBQcm9taXNlLnJlc29sdmUobmV3IEJsb2IoW2JvZHldKSk7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKGJvZHkgaW5zdGFuY2VvZiBCbG9iKSB7XG4gICAgICAgICAgICByZXR1cm4gUHJvbWlzZS5yZXNvbHZlKGJvZHkpO1xuICAgICAgICB9XG4gICAgICAgIGlmIChib2R5IGluc3RhbmNlb2YgRm9ybURhdGEpIHtcbiAgICAgICAgICAgIHJldHVybiBQcm9taXNlLnJlamVjdChuZXcgVHlwZUVycm9yKCdBIG11bHRpcGFydCBGb3JtRGF0YSBib2R5IGNhbm5vdCBiZSByZWFkIGFzIGEgYmxvYicpKTtcbiAgICAgICAgfVxuICAgICAgICBpZiAoYm9keSA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICByZXR1cm4gUHJvbWlzZS5yZWplY3QobmV3IEVycm9yKCdObyBib2R5IGlzIHByZXNlbnQnKSk7XG4gICAgICAgIH1cblxuICAgICAgICB0aHJvdyBuZXcgVHlwZUVycm9yKCdJbnZhbGlkIGJvZHkgdHlwZScpO1xuICAgIH1cblxuICAgIGFycmF5QnVmZmVyKCk6IFByb21pc2U8QXJyYXlCdWZmZXI+IHtcbiAgICAgICAgaWYgKHRoaXMuX2JvZHlVc2VkKSB7XG4gICAgICAgICAgICByZXR1cm4gUHJvbWlzZS5yZWplY3QobmV3IFR5cGVFcnJvcignQm9keSBjb250ZW50cyBhbHJlYWR5IHJlYWQnKSk7XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5fYm9keVVzZWQgPSB0cnVlO1xuXG4gICAgICAgIGNvbnN0IGJvZHkgPSB0aGlzLmJvZHk7XG4gICAgICAgIGlmICh0eXBlb2YgYm9keSA9PT0gJ3N0cmluZycpIHtcbiAgICAgICAgICAgIHJldHVybiBQcm9taXNlLnJlc29sdmUoKHRleHRFbmNvZGVyLmVuY29kZShib2R5KSBhcyBVaW50OEFycmF5PEFycmF5QnVmZmVyPikuYnVmZmVyKTtcbiAgICAgICAgfVxuICAgICAgICBpZiAoYm9keSBpbnN0YW5jZW9mIEFycmF5QnVmZmVyKSB7XG4gICAgICAgICAgICByZXR1cm4gUHJvbWlzZS5yZXNvbHZlKGJvZHkpO1xuICAgICAgICB9XG4gICAgICAgIGlmIChib2R5IGluc3RhbmNlb2YgQmxvYikge1xuICAgICAgICAgICAgcmV0dXJuIFByb21pc2UucmVzb2x2ZShyZWFkQmxvYkFzQXJyYXlCdWZmZXIoYm9keSkpO1xuICAgICAgICB9XG4gICAgICAgIGlmIChib2R5IGluc3RhbmNlb2YgRm9ybURhdGEpIHtcbiAgICAgICAgICAgIHJldHVybiBQcm9taXNlLnJlamVjdChuZXcgVHlwZUVycm9yKCdBIG11bHRpcGFydCBGb3JtRGF0YSBib2R5IGNhbm5vdCBiZSByZWFkIGFzIGFuIGFycmF5QnVmZmVyJykpO1xuICAgICAgICB9XG4gICAgICAgIGlmIChib2R5ID09PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgIHJldHVybiBQcm9taXNlLnJlamVjdChuZXcgRXJyb3IoJ05vIGJvZHkgaXMgcHJlc2VudCcpKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHRocm93IG5ldyBUeXBlRXJyb3IoJ0ludmFsaWQgYm9keSB0eXBlJyk7XG4gICAgfVxuXG4gICAgdGV4dCgpOiBQcm9taXNlPHN0cmluZz4ge1xuICAgICAgICBpZiAodGhpcy5fYm9keVVzZWQpIHtcbiAgICAgICAgICAgIHJldHVybiBQcm9taXNlLnJlamVjdChuZXcgVHlwZUVycm9yKCdCb2R5IGNvbnRlbnRzIGFscmVhZHkgcmVhZCcpKTtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLl9ib2R5VXNlZCA9IHRydWU7XG5cbiAgICAgICAgY29uc3QgYm9keSA9IHRoaXMuYm9keTtcbiAgICAgICAgaWYgKHR5cGVvZiBib2R5ID09PSAnc3RyaW5nJykge1xuICAgICAgICAgICAgcmV0dXJuIFByb21pc2UucmVzb2x2ZShib2R5KTtcbiAgICAgICAgfVxuICAgICAgICBpZiAoYm9keSBpbnN0YW5jZW9mIEFycmF5QnVmZmVyKSB7XG4gICAgICAgICAgICByZXR1cm4gUHJvbWlzZS5yZXNvbHZlKHRleHREZWNvZGVyLmRlY29kZShib2R5KSk7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKGJvZHkgaW5zdGFuY2VvZiBCbG9iKSB7XG4gICAgICAgICAgICByZXR1cm4gUHJvbWlzZS5yZXNvbHZlKHJlYWRCbG9iQXNUZXh0KGJvZHkpKTtcbiAgICAgICAgfVxuICAgICAgICBpZiAoYm9keSBpbnN0YW5jZW9mIEZvcm1EYXRhKSB7XG4gICAgICAgICAgICByZXR1cm4gUHJvbWlzZS5yZWplY3QobmV3IFR5cGVFcnJvcignQSBtdWx0aXBhcnQgRm9ybURhdGEgYm9keSBjYW5ub3QgYmUgcmVhZCBhcyB0ZXh0JykpO1xuICAgICAgICB9XG4gICAgICAgIGlmIChib2R5ID09PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgIHJldHVybiBQcm9taXNlLnJlamVjdChuZXcgRXJyb3IoJ05vIGJvZHkgaXMgcHJlc2VudCcpKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHRocm93IG5ldyBUeXBlRXJyb3IoJ0ludmFsaWQgYm9keSB0eXBlJyk7XG4gICAgfVxuXG4gICAgZm9ybURhdGEoKTogUHJvbWlzZTxGb3JtRGF0YT4ge1xuICAgICAgICBpZiAodGhpcy5fYm9keVVzZWQpIHtcbiAgICAgICAgICAgIHJldHVybiBQcm9taXNlLnJlamVjdChuZXcgVHlwZUVycm9yKCdCb2R5IGNvbnRlbnRzIGFscmVhZHkgcmVhZCcpKTtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLl9ib2R5VXNlZCA9IHRydWU7XG5cbiAgICAgICAgY29uc3QgYm9keSA9IHRoaXMuYm9keTtcbiAgICAgICAgaWYgKHR5cGVvZiBib2R5ID09PSAnc3RyaW5nJykge1xuICAgICAgICAgICAgcmV0dXJuIFByb21pc2UucmVqZWN0KG5ldyBUeXBlRXJyb3IoJ1Vuc3VwcG9ydGVkOiBDYW5ub3QgcGFyc2UgRm9ybURhdGEgZnJvbSBhIHN0cmluZyBib2R5JykpO1xuICAgICAgICB9XG4gICAgICAgIGlmIChib2R5IGluc3RhbmNlb2YgQXJyYXlCdWZmZXIpIHtcbiAgICAgICAgICAgIHJldHVybiBQcm9taXNlLnJlamVjdChuZXcgVHlwZUVycm9yKCdVbnN1cHBvcnRlZDogQ2Fubm90IHBhcnNlIEZvcm1EYXRhIGZyb20gYW4gQXJyYXlCdWZmZXIgYm9keScpKTtcbiAgICAgICAgfVxuICAgICAgICBpZiAoYm9keSBpbnN0YW5jZW9mIEJsb2IpIHtcbiAgICAgICAgICAgIHJldHVybiBQcm9taXNlLnJlamVjdChuZXcgVHlwZUVycm9yKCdVbnN1cHBvcnRlZDogQ2Fubm90IHBhcnNlIEZvcm1EYXRhIGZyb20gYSBCbG9iIGJvZHknKSk7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKGJvZHkgaW5zdGFuY2VvZiBGb3JtRGF0YSkge1xuICAgICAgICAgICAgcmV0dXJuIFByb21pc2UucmVzb2x2ZShib2R5KTtcbiAgICAgICAgfVxuICAgICAgICBpZiAoYm9keSA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICByZXR1cm4gUHJvbWlzZS5yZWplY3QobmV3IEVycm9yKCdObyBib2R5IGlzIHByZXNlbnQnKSk7XG4gICAgICAgIH1cblxuICAgICAgICB0aHJvdyBuZXcgVHlwZUVycm9yKCdJbnZhbGlkIGJvZHkgdHlwZScpO1xuICAgIH1cblxuICAgIGpzb24oKSB7XG4gICAgICAgIHJldHVybiB0aGlzLnRleHQoKS50aGVuKEpTT04ucGFyc2UpO1xuICAgIH1cbn1cblxuLy8gSFRUUCBtZXRob2RzIHdob3NlIGNhcGl0YWxpemF0aW9uIHNob3VsZCBiZSBub3JtYWxpemVkXG5jb25zdCBtZXRob2RzID0gbmV3IFNldChbJ0dFVCcsICdIRUFEJywgJ1BPU1QnXSk7XG5cbmZ1bmN0aW9uIG5vcm1hbGl6ZU1ldGhvZChtZXRob2Q6IHN0cmluZyk6IHN0cmluZyB7XG4gICAgbWV0aG9kID0gbWV0aG9kLnRvVXBwZXJDYXNlKCk7XG4gICAgaWYgKCFtZXRob2RzLmhhcyhtZXRob2QpKSB7XG4gICAgICAgIHRocm93IG5ldyBFcnJvcihgVW5zdXBwb3J0ZWQgSFRUUCBtZXRob2QgZm9yIEdNX3htbGh0dHBSZXF1ZXN0OiAke21ldGhvZH1gKTtcbiAgICB9XG4gICAgcmV0dXJuIG1ldGhvZDtcbn1cblxuaW50ZXJmYWNlIFJlcXVlc3RPcHRpb25zIHtcbiAgICByZWFkb25seSBjcmVkZW50aWFscz86IHN0cmluZztcbiAgICByZWFkb25seSBoZWFkZXJzPzogSGVhZGVycyB8IFJlY29yZDxzdHJpbmcsIGtub3duPjtcbiAgICByZWFkb25seSBtZXRob2Q/OiBzdHJpbmc7XG4gICAgcmVhZG9ubHkgbW9kZT86IHN0cmluZztcbiAgICByZWFkb25seSBib2R5Pzogc3RyaW5nIHwgQmxvYiB8IEZvcm1EYXRhO1xufVxuXG5leHBvcnQgY2xhc3MgUmVxdWVzdCBleHRlbmRzIEJvZHkge1xuICAgIHJlYWRvbmx5IHVybDogc3RyaW5nO1xuICAgIHJlYWRvbmx5IGNyZWRlbnRpYWxzOiBzdHJpbmc7XG4gICAgcmVhZG9ubHkgaGVhZGVyczogSGVhZGVycztcbiAgICByZWFkb25seSBtZXRob2Q6IHN0cmluZztcbiAgICByZWFkb25seSBtb2RlOiBzdHJpbmcgfCBudWxsO1xuICAgIHJlYWRvbmx5IHJlZmVycmVyOiBudWxsO1xuICAgIHByaXZhdGUgcmVhZG9ubHkgYm9keVN0b3JlPzogc3RyaW5nIHwgQmxvYiB8IEZvcm1EYXRhO1xuXG4gICAgY29uc3RydWN0b3IodXJsOiBzdHJpbmcsIG9wdGlvbnM/OiBSZXF1ZXN0T3B0aW9ucykge1xuICAgICAgICBzdXBlcigpO1xuXG4gICAgICAgIG9wdGlvbnMgPSBvcHRpb25zIHx8IHt9O1xuICAgICAgICB0aGlzLnVybCA9IHVybDtcblxuICAgICAgICB0aGlzLmNyZWRlbnRpYWxzID0gb3B0aW9ucy5jcmVkZW50aWFscyB8fCAnb21pdCc7XG4gICAgICAgIHRoaXMuaGVhZGVycyA9IG5ldyBIZWFkZXJzKG9wdGlvbnMuaGVhZGVycyk7XG4gICAgICAgIHRoaXMubWV0aG9kID0gbm9ybWFsaXplTWV0aG9kKG9wdGlvbnMubWV0aG9kIHx8ICdHRVQnKTtcbiAgICAgICAgdGhpcy5tb2RlID0gb3B0aW9ucy5tb2RlIHx8IG51bGw7XG4gICAgICAgIHRoaXMucmVmZXJyZXIgPSBudWxsO1xuXG4gICAgICAgIGlmICgodGhpcy5tZXRob2QgPT09ICdHRVQnIHx8IHRoaXMubWV0aG9kID09PSAnSEVBRCcpICYmIG9wdGlvbnMuYm9keSkge1xuICAgICAgICAgICAgdGhyb3cgbmV3IFR5cGVFcnJvcignQm9keSBub3QgYWxsb3dlZCBmb3IgR0VUIG9yIEhFQUQgcmVxdWVzdHMnKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHRoaXMuYm9keVN0b3JlID0gb3B0aW9ucy5ib2R5O1xuICAgIH1cblxuICAgIHByb3RlY3RlZCBnZXQgYm9keSgpOiBzdHJpbmcgfCBBcnJheUJ1ZmZlciB8IEJsb2IgfCBGb3JtRGF0YSB8IHVuZGVmaW5lZCB7XG4gICAgICAgIHJldHVybiB0aGlzLmJvZHlTdG9yZTtcbiAgICB9XG5cbiAgICBnZXQgYm9keVJhdygpOiBzdHJpbmcgfCBCbG9iIHwgRm9ybURhdGEgfCB1bmRlZmluZWQge1xuICAgICAgICByZXR1cm4gdGhpcy5ib2R5U3RvcmU7XG4gICAgfVxufVxuXG5mdW5jdGlvbiBoZWFkZXJzKHJlc3BvbnNlSGVhZGVyczogc3RyaW5nKTogSGVhZGVycyB7XG4gICAgY29uc3QgaGVhZCA9IG5ldyBIZWFkZXJzKCk7XG4gICAgY29uc3QgcGFpcnMgPSByZXNwb25zZUhlYWRlcnMudHJpbSgpLnNwbGl0KCdcXG4nKTtcbiAgICBmb3IgKGNvbnN0IGhlYWRlciBvZiBwYWlycykge1xuICAgICAgICBjb25zdCBzcGxpdCA9IGhlYWRlci50cmltKCkuc3BsaXQoJzonKTtcbiAgICAgICAgY29uc3Qga2V5ID0gc3BsaXQuc2hpZnQoKSEudHJpbSgpO1xuICAgICAgICBjb25zdCB2YWx1ZSA9IHNwbGl0LmpvaW4oJzonKS50cmltKCk7XG4gICAgICAgIGhlYWQuYXBwZW5kKGtleSwgdmFsdWUpO1xuICAgIH1cbiAgICByZXR1cm4gaGVhZDtcbn1cblxuZXhwb3J0IGNsYXNzIFJlc3BvbnNlIGV4dGVuZHMgQm9keSB7XG4gICAgcmVhZG9ubHkgdHlwZTogc3RyaW5nO1xuICAgIHJlYWRvbmx5IHVybDogc3RyaW5nO1xuICAgIHJlYWRvbmx5IHN0YXR1czogbnVtYmVyO1xuICAgIHJlYWRvbmx5IG9rOiBib29sZWFuO1xuICAgIHJlYWRvbmx5IHN0YXR1c1RleHQ6IHN0cmluZztcbiAgICByZWFkb25seSBoZWFkZXJzOiBIZWFkZXJzO1xuXG4gICAgY29uc3RydWN0b3IocHJpdmF0ZSByZWFkb25seSByZXNwb25zZTogVGFtcGVybW9ua2V5LlJlc3BvbnNlPHVua25vd24+KSB7XG4gICAgICAgIHN1cGVyKCk7XG5cbiAgICAgICAgdGhpcy50eXBlID0gJ2RlZmF1bHQnO1xuICAgICAgICB0aGlzLnN0YXR1cyA9IHJlc3BvbnNlLnN0YXR1cztcbiAgICAgICAgdGhpcy5vayA9IHRoaXMuc3RhdHVzID49IDIwMCAmJiB0aGlzLnN0YXR1cyA8IDMwMDtcbiAgICAgICAgdGhpcy5zdGF0dXNUZXh0ID0gcmVzcG9uc2Uuc3RhdHVzVGV4dDtcbiAgICAgICAgdGhpcy5oZWFkZXJzID0gaGVhZGVycyhyZXNwb25zZS5yZXNwb25zZUhlYWRlcnMpO1xuICAgICAgICB0aGlzLnVybCA9IHJlc3BvbnNlVVJMKHJlc3BvbnNlLmZpbmFsVXJsLCByZXNwb25zZS5yZXNwb25zZUhlYWRlcnMsIHRoaXMuaGVhZGVycykgfHwgJyc7XG4gICAgfVxuXG4gICAgcHJvdGVjdGVkIGdldCBib2R5KCk6IHN0cmluZyB8IEFycmF5QnVmZmVyIHwgQmxvYiB8IEZvcm1EYXRhIHwgdW5kZWZpbmVkIHtcbiAgICAgICAgcmV0dXJuIHRoaXMucmVzcG9uc2UucmVzcG9uc2UgYXMgQXJyYXlCdWZmZXI7XG4gICAgfVxuXG4gICAgdGV4dCgpOiBQcm9taXNlPHN0cmluZz4ge1xuICAgICAgICBpZiAodGhpcy5fYm9keVVzZWQpIHtcbiAgICAgICAgICAgIHJldHVybiBQcm9taXNlLnJlamVjdChuZXcgVHlwZUVycm9yKCdCb2R5IGNvbnRlbnRzIGFscmVhZHkgcmVhZCcpKTtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLl9ib2R5VXNlZCA9IHRydWU7XG5cbiAgICAgICAgcmV0dXJuIFByb21pc2UucmVzb2x2ZSh0aGlzLnJlc3BvbnNlLnJlc3BvbnNlVGV4dCk7XG4gICAgfVxufVxuXG5mdW5jdGlvbiByZXNwb25zZVVSTChmaW5hbFVybDogc3RyaW5nLCByYXdSZXNwSGVhZGVyczogc3RyaW5nLCByZXNwSGVhZGVyczogSGVhZGVycyk6IHN0cmluZyB8IG51bGwge1xuICAgIGlmIChmaW5hbFVybCkge1xuICAgICAgICByZXR1cm4gZmluYWxVcmw7XG4gICAgfVxuXG4gICAgLy8gQXZvaWQgc2VjdXJpdHkgd2FybmluZ3Mgb24gZ2V0UmVzcG9uc2VIZWFkZXIgd2hlbiBub3QgYWxsb3dlZCBieSBDT1JTXG4gICAgaWYgKC9eWC1SZXF1ZXN0LVVSTDovbS50ZXN0KHJhd1Jlc3BIZWFkZXJzKSkge1xuICAgICAgICByZXR1cm4gcmVzcEhlYWRlcnMuZ2V0KCdYLVJlcXVlc3QtVVJMJyk7XG4gICAgfVxuXG4gICAgcmV0dXJuIG51bGw7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBHTV9mZXRjaChpbnB1dDogc3RyaW5nIHwgUmVxdWVzdCwgaW5pdD86IFJlcXVlc3RPcHRpb25zKTogUHJvbWlzZTxSZXNwb25zZT4ge1xuICAgIGxldCByZXF1ZXN0OiBSZXF1ZXN0O1xuICAgIGlmIChpbnB1dCBpbnN0YW5jZW9mIFJlcXVlc3QpIHtcbiAgICAgICAgaWYgKGluaXQpIHtcbiAgICAgICAgICAgIHJlcXVlc3QgPSBuZXcgUmVxdWVzdChpbnB1dC51cmwsIGluaXQpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgcmVxdWVzdCA9IGlucHV0O1xuICAgICAgICB9XG4gICAgfSBlbHNlIHtcbiAgICAgICAgcmVxdWVzdCA9IG5ldyBSZXF1ZXN0KGlucHV0LCBpbml0KTtcbiAgICB9XG5cbiAgICBpZiAoIVsnR0VUJywgJ0hFQUQnLCAnUE9TVCddLmluY2x1ZGVzKHJlcXVlc3QubWV0aG9kKSkge1xuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ1Vuc3VwcG9ydGVkIG1ldGhvZCBmb3IgR01feG1saHR0cFJlcXVlc3QnKTtcbiAgICB9XG5cbiAgICByZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCkgPT4ge1xuICAgICAgICBjb25zdCB4aHJEZXRhaWxzOiBQYXJ0aWFsPFRhbXBlcm1vbmtleS5SZXF1ZXN0PHVua25vd24+PiA9IHt9O1xuXG4gICAgICAgIHhockRldGFpbHMubWV0aG9kID0gcmVxdWVzdC5tZXRob2QgYXMgJ0dFVCcgfCAnSEVBRCcgfCAnUE9TVCc7XG4gICAgICAgIHhockRldGFpbHMucmVzcG9uc2VUeXBlID0gJ2FycmF5YnVmZmVyJzsgLy8gVE9ETyBkb2VzIHRoaXMgYWZmZWN0IHByZXNlbmNlIG9mIHJlc3BvbnNlVGV4dD9cbiAgICAgICAgeGhyRGV0YWlscy51cmwgPSByZXF1ZXN0LnVybDtcblxuICAgICAgICAvLyBOb3Qgc3VwcG9ydGVkIGFueW1vcmVcbiAgICAgICAgLy94aHJfZGV0YWlscy5zeW5jaHJvbm91cyA9IGZhbHNlO1xuXG4gICAgICAgIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSB1bmljb3JuL3ByZWZlci1hZGQtZXZlbnQtbGlzdGVuZXJcbiAgICAgICAgeGhyRGV0YWlscy5vbmxvYWQgPSByZXNwID0+IHtcbiAgICAgICAgICAgIGNvbnN0IHN0YXR1cyA9IHJlc3Auc3RhdHVzO1xuICAgICAgICAgICAgaWYgKHN0YXR1cyA8IDEwMCB8fCBzdGF0dXMgPiA1OTkpIHtcbiAgICAgICAgICAgICAgICByZWplY3QobmV3IFR5cGVFcnJvcihgTmV0d29yayByZXF1ZXN0IGZhaWxlZDogU3RhdHVzIGNvZGUgJHtzdGF0dXN9YCkpO1xuICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgcmVzb2x2ZShuZXcgUmVzcG9uc2UocmVzcCkpO1xuICAgICAgICB9O1xuXG4gICAgICAgIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSB1bmljb3JuL3ByZWZlci1hZGQtZXZlbnQtbGlzdGVuZXJcbiAgICAgICAgeGhyRGV0YWlscy5vbmVycm9yID0gZXJyb3IgPT4ge1xuICAgICAgICAgICAgcmVqZWN0KG5ldyBUeXBlRXJyb3IoYE5ldHdvcmsgcmVxdWVzdCBmYWlsZWQ6ICR7ZXJyb3IuZXJyb3J9YCwge1xuICAgICAgICAgICAgICAgIGNhdXNlOiBlcnJvclxuICAgICAgICAgICAgfSkpO1xuICAgICAgICB9O1xuXG4gICAgICAgIGNvbnN0IGhlYWRlcnM6IFJlY29yZDxzdHJpbmcsIHN0cmluZz4gPSB7fTtcbiAgICAgICAgZm9yIChjb25zdCBbbmFtZSwgdmFsdWVdIG9mIHJlcXVlc3QuaGVhZGVycykge1xuICAgICAgICAgICAgaGVhZGVyc1tuYW1lXSA9IHZhbHVlO1xuICAgICAgICB9XG4gICAgICAgIHhockRldGFpbHMuaGVhZGVycyA9IGhlYWRlcnM7XG5cbiAgICAgICAgaWYgKHR5cGVvZiByZXF1ZXN0LmJvZHlSYXcgIT09ICd1bmRlZmluZWQnKSB7XG4gICAgICAgICAgICB4aHJEZXRhaWxzLmRhdGEgPSByZXF1ZXN0LmJvZHlSYXc7IC8vIGh0dHBzOi8vZ2l0aHViLmNvbS9ncmVhc2Vtb25rZXkvZ3JlYXNlbW9ua2V5L2lzc3Vlcy8xNTg1IGl0IGp1c3QgV09SS1M/P1xuICAgICAgICB9XG5cbiAgICAgICAgR01feG1saHR0cFJlcXVlc3QoeGhyRGV0YWlscyBhcyBUYW1wZXJtb25rZXkuUmVxdWVzdDx1bmtub3duPik7XG5cbiAgICAgICAgLypcbiAgICAgICAgLy8gbmVlZCB0byBzZWUgaWYgdGhlcmUncyBhbnkgd2F5IG9mIGRvaW5nIHRoaXNcbiAgICAgICAgaWYgKHJlcXVlc3QuY3JlZGVudGlhbHMgPT09ICdpbmNsdWRlJykge1xuICAgICAgICAgIHhoci53aXRoQ3JlZGVudGlhbHMgPSB0cnVlXG4gICAgICAgIH1cblxuICAgICAgICBHTV94bWxodHRwUmVxdWVzdCBoYXMgYSByZXNwb25zZVR5cGUgcGFyYW0sIGJ1dCB0aGlzIGRpZG4ndCBzZWVtIHRvIHdvcmssIGF0IGxlYXN0IGluIFRhbXBlck1vbmtleVxuICAgICAgICBpZiAoJ3Jlc3BvbnNlVHlwZScgaW4geGhyICYmIHN1cHBvcnQuYmxvYikge1xuICAgICAgICAgIHhoci5yZXNwb25zZVR5cGUgPSAnYmxvYidcbiAgICAgICAgfVxuICAgICAgICAqL1xuICAgIH0pO1xufVxuIiwgImV4cG9ydCBjb25zdCBJTlZBTElEX0hBTkRMRSA9ICdoYW5kbGUuaW52YWxpZCdcblxuLy8gQ3VycmVudGx5IHRoZXNlIGFyZSByZWdpc3RyYXRpb24tdGltZSByZXN0cmljdGlvbnMsIG5vdCBwcm90b2NvbC1sZXZlbFxuLy8gcmVzdHJpY3Rpb25zLiBXZSBoYXZlIGEgY291cGxlIGFjY291bnRzIGluIHRoZSB3aWxkIHRoYXQgd2UgbmVlZCB0byBjbGVhbiB1cFxuLy8gYmVmb3JlIGhhcmQtZGlzYWxsb3cuXG4vLyBTZWUgYWxzbzogaHR0cHM6Ly9lbi53aWtpcGVkaWEub3JnL3dpa2kvVG9wLWxldmVsX2RvbWFpbiNSZXNlcnZlZF9kb21haW5zXG5leHBvcnQgY29uc3QgRElTQUxMT1dFRF9UTERTID0gW1xuICAnLmxvY2FsJyxcbiAgJy5hcnBhJyxcbiAgJy5pbnZhbGlkJyxcbiAgJy5sb2NhbGhvc3QnLFxuICAnLmludGVybmFsJyxcbiAgJy5leGFtcGxlJyxcbiAgJy5hbHQnLFxuICAvLyBwb2xpY3kgY291bGQgY29uY2lldmFibHkgY2hhbmdlIG9uIFwiLm9uaW9uXCIgc29tZSBkYXlcbiAgJy5vbmlvbicsXG4gIC8vIE5PVEU6IC50ZXN0IGlzIGFsbG93ZWQgaW4gdGVzdGluZyBhbmQgZGV2b3BtZW50LiBJbiBwcmFjdGljYWwgdGVybXNcbiAgLy8gXCJzaG91bGRcIiBcIm5ldmVyXCIgYWN0dWFsbHkgcmVzb2x2ZSBhbmQgZ2V0IHJlZ2lzdGVyZWQgaW4gcHJvZHVjdGlvblxuXVxuXG4vLyBIYW5kbGUgY29uc3RyYWludHMsIGluIEVuZ2xpc2g6XG4vLyAgLSBtdXN0IGJlIGEgcG9zc2libGUgZG9tYWluIG5hbWVcbi8vICAgIC0gUkZDLTEwMzUgaXMgY29tbW9ubHkgcmVmZXJlbmNlZCwgYnV0IGhhcyBiZWVuIHVwZGF0ZWQuIGVnLCBSRkMtMzY5Nixcbi8vICAgICAgc2VjdGlvbiAyLiBhbmQgUkZDLTM5ODYsIHNlY3Rpb24gMy4gY2FuIG5vdyBoYXZlIGxlYWRpbmcgbnVtYmVycyAoZWcsXG4vLyAgICAgIDRjaGFuLm9yZylcbi8vICAgIC0gXCJsYWJlbHNcIiAoc3ViLW5hbWVzKSBhcmUgbWFkZSBvZiBBU0NJSSBsZXR0ZXJzLCBkaWdpdHMsIGh5cGhlbnNcbi8vICAgIC0gY2FuIG5vdCBzdGFydCBvciBlbmQgd2l0aCBhIGh5cGhlblxuLy8gICAgLSBUTEQgKGxhc3QgY29tcG9uZW50KSBzaG91bGQgbm90IHN0YXJ0IHdpdGggYSBkaWdpdFxuLy8gICAgLSBjYW4ndCBlbmQgd2l0aCBhIGh5cGhlbiAoY2FuIGVuZCB3aXRoIGRpZ2l0KVxuLy8gICAgLSBlYWNoIHNlZ21lbnQgbXVzdCBiZSBiZXR3ZWVuIDEgYW5kIDYzIGNoYXJhY3RlcnMgKG5vdCBpbmNsdWRpbmcgYW55IHBlcmlvZHMpXG4vLyAgICAtIG92ZXJhbGwgbGVuZ3RoIGNhbid0IGJlIG1vcmUgdGhhbiAyNTMgY2hhcmFjdGVyc1xuLy8gICAgLSBzZXBhcmF0ZWQgYnkgKEFTQ0lJKSBwZXJpb2RzOyBkb2VzIG5vdCBzdGFydCBvciBlbmQgd2l0aCBwZXJpb2Rcbi8vICAgIC0gY2FzZSBpbnNlbnNpdGl2ZVxuLy8gICAgLSBkb21haW5zIChoYW5kbGVzKSBhcmUgZXF1YWwgaWYgdGhleSBhcmUgdGhlIHNhbWUgbG93ZXItY2FzZVxuLy8gICAgLSBwdW55Y29kZSBhbGxvd2VkIGZvciBpbnRlcm5hdGlvbmFsaXphdGlvblxuLy8gIC0gbm8gd2hpdGVzcGFjZSwgbnVsbCBieXRlcywgam9pbmluZyBjaGFycywgZXRjXG4vLyAgLSBkb2VzIG5vdCB2YWxpZGF0ZSB3aGV0aGVyIGRvbWFpbiBvciBUTEQgZXhpc3RzLCBvciBpcyBhIHJlc2VydmVkIG9yXG4vLyAgICBzcGVjaWFsIFRMRCAoZWcsIC5vbmlvbiBvciAubG9jYWwpXG4vLyAgLSBkb2VzIG5vdCB2YWxpZGF0ZSBwdW55Y29kZVxuZXhwb3J0IGNvbnN0IGVuc3VyZVZhbGlkSGFuZGxlID0gKGhhbmRsZTogc3RyaW5nKTogdm9pZCA9PiB7XG4gIC8vIGNoZWNrIHRoYXQgYWxsIGNoYXJzIGFyZSBib3JpbmcgQVNDSUlcbiAgaWYgKCEvXlthLXpBLVowLTkuLV0qJC8udGVzdChoYW5kbGUpKSB7XG4gICAgdGhyb3cgbmV3IEludmFsaWRIYW5kbGVFcnJvcihcbiAgICAgICdEaXNhbGxvd2VkIGNoYXJhY3RlcnMgaW4gaGFuZGxlIChBU0NJSSBsZXR0ZXJzLCBkaWdpdHMsIGRhc2hlcywgcGVyaW9kcyBvbmx5KScsXG4gICAgKVxuICB9XG5cbiAgaWYgKGhhbmRsZS5sZW5ndGggPiAyNTMpIHtcbiAgICB0aHJvdyBuZXcgSW52YWxpZEhhbmRsZUVycm9yKCdIYW5kbGUgaXMgdG9vIGxvbmcgKDI1MyBjaGFycyBtYXgpJylcbiAgfVxuICBjb25zdCBsYWJlbHMgPSBoYW5kbGUuc3BsaXQoJy4nKVxuICBpZiAobGFiZWxzLmxlbmd0aCA8IDIpIHtcbiAgICB0aHJvdyBuZXcgSW52YWxpZEhhbmRsZUVycm9yKCdIYW5kbGUgZG9tYWluIG5lZWRzIGF0IGxlYXN0IHR3byBwYXJ0cycpXG4gIH1cbiAgZm9yIChsZXQgaSA9IDA7IGkgPCBsYWJlbHMubGVuZ3RoOyBpKyspIHtcbiAgICBjb25zdCBsID0gbGFiZWxzW2ldXG4gICAgaWYgKGwubGVuZ3RoIDwgMSkge1xuICAgICAgdGhyb3cgbmV3IEludmFsaWRIYW5kbGVFcnJvcignSGFuZGxlIHBhcnRzIGNhbiBub3QgYmUgZW1wdHknKVxuICAgIH1cbiAgICBpZiAobC5sZW5ndGggPiA2Mykge1xuICAgICAgdGhyb3cgbmV3IEludmFsaWRIYW5kbGVFcnJvcignSGFuZGxlIHBhcnQgdG9vIGxvbmcgKG1heCA2MyBjaGFycyknKVxuICAgIH1cbiAgICBpZiAobC5lbmRzV2l0aCgnLScpIHx8IGwuc3RhcnRzV2l0aCgnLScpKSB7XG4gICAgICB0aHJvdyBuZXcgSW52YWxpZEhhbmRsZUVycm9yKFxuICAgICAgICAnSGFuZGxlIHBhcnRzIGNhbiBub3Qgc3RhcnQgb3IgZW5kIHdpdGggaHlwaGVucycsXG4gICAgICApXG4gICAgfVxuICAgIGlmIChpICsgMSA9PT0gbGFiZWxzLmxlbmd0aCAmJiAhL15bYS16QS1aXS8udGVzdChsKSkge1xuICAgICAgdGhyb3cgbmV3IEludmFsaWRIYW5kbGVFcnJvcihcbiAgICAgICAgJ0hhbmRsZSBmaW5hbCBjb21wb25lbnQgKFRMRCkgbXVzdCBzdGFydCB3aXRoIEFTQ0lJIGxldHRlcicsXG4gICAgICApXG4gICAgfVxuICB9XG59XG5cbi8vIHNpbXBsZSByZWdleCB0cmFuc2xhdGlvbiBvZiBhYm92ZSBjb25zdHJhaW50c1xuZXhwb3J0IGNvbnN0IGVuc3VyZVZhbGlkSGFuZGxlUmVnZXggPSAoaGFuZGxlOiBzdHJpbmcpOiB2b2lkID0+IHtcbiAgaWYgKFxuICAgICEvXihbYS16QS1aMC05XShbYS16QS1aMC05LV17MCw2MX1bYS16QS1aMC05XSk/XFwuKStbYS16QS1aXShbYS16QS1aMC05LV17MCw2MX1bYS16QS1aMC05XSk/JC8udGVzdChcbiAgICAgIGhhbmRsZSxcbiAgICApXG4gICkge1xuICAgIHRocm93IG5ldyBJbnZhbGlkSGFuZGxlRXJyb3IoXCJIYW5kbGUgZGlkbid0IHZhbGlkYXRlIHZpYSByZWdleFwiKVxuICB9XG4gIGlmIChoYW5kbGUubGVuZ3RoID4gMjUzKSB7XG4gICAgdGhyb3cgbmV3IEludmFsaWRIYW5kbGVFcnJvcignSGFuZGxlIGlzIHRvbyBsb25nICgyNTMgY2hhcnMgbWF4KScpXG4gIH1cbn1cblxuZXhwb3J0IGNvbnN0IG5vcm1hbGl6ZUhhbmRsZSA9IChoYW5kbGU6IHN0cmluZyk6IHN0cmluZyA9PiB7XG4gIHJldHVybiBoYW5kbGUudG9Mb3dlckNhc2UoKVxufVxuXG5leHBvcnQgY29uc3Qgbm9ybWFsaXplQW5kRW5zdXJlVmFsaWRIYW5kbGUgPSAoaGFuZGxlOiBzdHJpbmcpOiBzdHJpbmcgPT4ge1xuICBjb25zdCBub3JtYWxpemVkID0gbm9ybWFsaXplSGFuZGxlKGhhbmRsZSlcbiAgZW5zdXJlVmFsaWRIYW5kbGUobm9ybWFsaXplZClcbiAgcmV0dXJuIG5vcm1hbGl6ZWRcbn1cblxuZXhwb3J0IGNvbnN0IGlzVmFsaWRIYW5kbGUgPSAoaGFuZGxlOiBzdHJpbmcpOiBib29sZWFuID0+IHtcbiAgdHJ5IHtcbiAgICBlbnN1cmVWYWxpZEhhbmRsZShoYW5kbGUpXG4gIH0gY2F0Y2ggKGVycikge1xuICAgIGlmIChlcnIgaW5zdGFuY2VvZiBJbnZhbGlkSGFuZGxlRXJyb3IpIHtcbiAgICAgIHJldHVybiBmYWxzZVxuICAgIH1cbiAgICB0aHJvdyBlcnJcbiAgfVxuXG4gIHJldHVybiB0cnVlXG59XG5cbmV4cG9ydCBjb25zdCBpc1ZhbGlkVGxkID0gKGhhbmRsZTogc3RyaW5nKTogYm9vbGVhbiA9PiB7XG4gIHJldHVybiAhRElTQUxMT1dFRF9UTERTLnNvbWUoKGRvbWFpbikgPT4gaGFuZGxlLmVuZHNXaXRoKGRvbWFpbikpXG59XG5cbmV4cG9ydCBjbGFzcyBJbnZhbGlkSGFuZGxlRXJyb3IgZXh0ZW5kcyBFcnJvciB7fVxuZXhwb3J0IGNsYXNzIFJlc2VydmVkSGFuZGxlRXJyb3IgZXh0ZW5kcyBFcnJvciB7fVxuZXhwb3J0IGNsYXNzIFVuc3VwcG9ydGVkRG9tYWluRXJyb3IgZXh0ZW5kcyBFcnJvciB7fVxuZXhwb3J0IGNsYXNzIERpc2FsbG93ZWREb21haW5FcnJvciBleHRlbmRzIEVycm9yIHt9XG4iLCAiLy8gSHVtYW4tcmVhZGFibGUgY29uc3RyYWludHM6XG4vLyAgIC0gdmFsaWQgVzNDIERJRCAoaHR0cHM6Ly93d3cudzMub3JnL1RSL2RpZC1jb3JlLyNkaWQtc3ludGF4KVxuLy8gICAgICAtIGVudGlyZSBVUkkgaXMgQVNDSUk6IFthLXpBLVowLTkuXzolLV1cbi8vICAgICAgLSBhbHdheXMgc3RhcnRzIFwiZGlkOlwiIChsb3dlci1jYXNlKVxuLy8gICAgICAtIG1ldGhvZCBuYW1lIGlzIG9uZSBvciBtb3JlIGxvd2VyLWNhc2UgbGV0dGVycywgZm9sbG93ZWQgYnkgXCI6XCJcbi8vICAgICAgLSByZW1haW5pbmcgaWRlbnRpZmllciBjYW4gaGF2ZSBhbnkgb2YgdGhlIGFib3ZlIGNoYXJzLCBidXQgY2FuIG5vdCBlbmQgaW4gXCI6XCJcbi8vICAgICAgLSBpdCBzZWVtcyB0aGF0IGEgYnVuY2ggb2YgXCI6XCIgY2FuIGJlIGluY2x1ZGVkLCBhbmQgZG9uJ3QgbmVlZCBzcGFjZXMgYmV0d2VlblxuLy8gICAgICAtIFwiJVwiIGlzIHVzZWQgb25seSBmb3IgXCJwZXJjZW50IGVuY29kaW5nXCIgYW5kIG11c3QgYmUgZm9sbG93ZWQgYnkgdHdvIGhleCBjaGFyYWN0ZXJzIChhbmQgdGh1cyBjYW4ndCBlbmQgaW4gXCIlXCIpXG4vLyAgICAgIC0gcXVlcnkgKFwiP1wiKSBhbmQgZnJhZ21lbnQgKFwiI1wiKSBzdHVmZiBpcyBkZWZpbmVkIGZvciBcIkRJRCBVUklzXCIsIGJ1dCBub3QgYXMgcGFydCBvZiBpZGVudGlmaWVyIGl0c2VsZlxuLy8gICAgICAtIFwiVGhlIGN1cnJlbnQgc3BlY2lmaWNhdGlvbiBkb2VzIG5vdCB0YWtlIGEgcG9zaXRpb24gb24gdGhlIG1heGltdW0gbGVuZ3RoIG9mIGEgRElEXCJcbi8vICAgLSBpbiBjdXJyZW50IGF0cHJvdG8sIG9ubHkgYWxsb3dpbmcgZGlkOnBsYyBhbmQgZGlkOndlYi4gQnV0IG5vdCAqZm9yY2luZyogdGhpcyBhdCBsZXhpY29uIGxheWVyXG4vLyAgIC0gaGFyZCBsZW5ndGggbGltaXQgb2YgOEtCeXRlc1xuLy8gICAtIG5vdCBnb2luZyB0byB2YWxpZGF0ZSBcInBlcmNlbnQgZW5jb2RpbmdcIiBoZXJlXG5leHBvcnQgY29uc3QgZW5zdXJlVmFsaWREaWQgPSAoZGlkOiBzdHJpbmcpOiB2b2lkID0+IHtcbiAgaWYgKCFkaWQuc3RhcnRzV2l0aCgnZGlkOicpKSB7XG4gICAgdGhyb3cgbmV3IEludmFsaWREaWRFcnJvcignRElEIHJlcXVpcmVzIFwiZGlkOlwiIHByZWZpeCcpXG4gIH1cblxuICAvLyBjaGVjayB0aGF0IGFsbCBjaGFycyBhcmUgYm9yaW5nIEFTQ0lJXG4gIGlmICghL15bYS16QS1aMC05Ll86JS1dKiQvLnRlc3QoZGlkKSkge1xuICAgIHRocm93IG5ldyBJbnZhbGlkRGlkRXJyb3IoXG4gICAgICAnRGlzYWxsb3dlZCBjaGFyYWN0ZXJzIGluIERJRCAoQVNDSUkgbGV0dGVycywgZGlnaXRzLCBhbmQgYSBjb3VwbGUgb3RoZXIgY2hhcmFjdGVycyBvbmx5KScsXG4gICAgKVxuICB9XG5cbiAgY29uc3QgeyBsZW5ndGgsIDE6IG1ldGhvZCB9ID0gZGlkLnNwbGl0KCc6JylcbiAgaWYgKGxlbmd0aCA8IDMpIHtcbiAgICB0aHJvdyBuZXcgSW52YWxpZERpZEVycm9yKFxuICAgICAgJ0RJRCByZXF1aXJlcyBwcmVmaXgsIG1ldGhvZCwgYW5kIG1ldGhvZC1zcGVjaWZpYyBjb250ZW50JyxcbiAgICApXG4gIH1cblxuICBpZiAoIS9eW2Etel0rJC8udGVzdChtZXRob2QpKSB7XG4gICAgdGhyb3cgbmV3IEludmFsaWREaWRFcnJvcignRElEIG1ldGhvZCBtdXN0IGJlIGxvd2VyLWNhc2UgbGV0dGVycycpXG4gIH1cblxuICBpZiAoZGlkLmVuZHNXaXRoKCc6JykgfHwgZGlkLmVuZHNXaXRoKCclJykpIHtcbiAgICB0aHJvdyBuZXcgSW52YWxpZERpZEVycm9yKCdESUQgY2FuIG5vdCBlbmQgd2l0aCBcIjpcIiBvciBcIiVcIicpXG4gIH1cblxuICBpZiAoZGlkLmxlbmd0aCA+IDIgKiAxMDI0KSB7XG4gICAgdGhyb3cgbmV3IEludmFsaWREaWRFcnJvcignRElEIGlzIHRvbyBsb25nICgyMDQ4IGNoYXJzIG1heCknKVxuICB9XG59XG5cbmV4cG9ydCBjb25zdCBlbnN1cmVWYWxpZERpZFJlZ2V4ID0gKGRpZDogc3RyaW5nKTogdm9pZCA9PiB7XG4gIC8vIHNpbXBsZSByZWdleCB0byBlbmZvcmNlIG1vc3QgY29uc3RyYWludHMgdmlhIGp1c3QgcmVnZXggYW5kIGxlbmd0aC5cbiAgLy8gaGFuZCB3cm90ZSB0aGlzIHJlZ2V4IGJhc2VkIG9uIGFib3ZlIGNvbnN0cmFpbnRzXG4gIGlmICghL15kaWQ6W2Etel0rOlthLXpBLVowLTkuXzolLV0qW2EtekEtWjAtOS5fLV0kLy50ZXN0KGRpZCkpIHtcbiAgICB0aHJvdyBuZXcgSW52YWxpZERpZEVycm9yKFwiRElEIGRpZG4ndCB2YWxpZGF0ZSB2aWEgcmVnZXhcIilcbiAgfVxuXG4gIGlmIChkaWQubGVuZ3RoID4gMiAqIDEwMjQpIHtcbiAgICB0aHJvdyBuZXcgSW52YWxpZERpZEVycm9yKCdESUQgaXMgdG9vIGxvbmcgKDIwNDggY2hhcnMgbWF4KScpXG4gIH1cbn1cblxuZXhwb3J0IGNsYXNzIEludmFsaWREaWRFcnJvciBleHRlbmRzIEVycm9yIHt9XG4iLCAiLypcbkdyYW1tYXI6XG5cbmFscGhhICAgICA9IFwiYVwiIC8gXCJiXCIgLyBcImNcIiAvIFwiZFwiIC8gXCJlXCIgLyBcImZcIiAvIFwiZ1wiIC8gXCJoXCIgLyBcImlcIiAvIFwialwiIC8gXCJrXCIgLyBcImxcIiAvIFwibVwiIC8gXCJuXCIgLyBcIm9cIiAvIFwicFwiIC8gXCJxXCIgLyBcInJcIiAvIFwic1wiIC8gXCJ0XCIgLyBcInVcIiAvIFwidlwiIC8gXCJ3XCIgLyBcInhcIiAvIFwieVwiIC8gXCJ6XCIgLyBcIkFcIiAvIFwiQlwiIC8gXCJDXCIgLyBcIkRcIiAvIFwiRVwiIC8gXCJGXCIgLyBcIkdcIiAvIFwiSFwiIC8gXCJJXCIgLyBcIkpcIiAvIFwiS1wiIC8gXCJMXCIgLyBcIk1cIiAvIFwiTlwiIC8gXCJPXCIgLyBcIlBcIiAvIFwiUVwiIC8gXCJSXCIgLyBcIlNcIiAvIFwiVFwiIC8gXCJVXCIgLyBcIlZcIiAvIFwiV1wiIC8gXCJYXCIgLyBcIllcIiAvIFwiWlwiXG5udW1iZXIgICAgPSBcIjFcIiAvIFwiMlwiIC8gXCIzXCIgLyBcIjRcIiAvIFwiNVwiIC8gXCI2XCIgLyBcIjdcIiAvIFwiOFwiIC8gXCI5XCIgLyBcIjBcIlxuZGVsaW0gICAgID0gXCIuXCJcbnNlZ21lbnQgICA9IGFscGhhICooIGFscGhhIC8gbnVtYmVyIC8gXCItXCIgKVxuYXV0aG9yaXR5ID0gc2VnbWVudCAqKCBkZWxpbSBzZWdtZW50IClcbm5hbWUgICAgICA9IGFscGhhICooIGFscGhhIClcbm5zaWQgICAgICA9IGF1dGhvcml0eSBkZWxpbSBuYW1lXG5cbiovXG5cbmV4cG9ydCBjbGFzcyBOU0lEIHtcbiAgc2VnbWVudHM6IHN0cmluZ1tdID0gW11cblxuICBzdGF0aWMgcGFyc2UobnNpZDogc3RyaW5nKTogTlNJRCB7XG4gICAgcmV0dXJuIG5ldyBOU0lEKG5zaWQpXG4gIH1cblxuICBzdGF0aWMgY3JlYXRlKGF1dGhvcml0eTogc3RyaW5nLCBuYW1lOiBzdHJpbmcpOiBOU0lEIHtcbiAgICBjb25zdCBzZWdtZW50cyA9IFsuLi5hdXRob3JpdHkuc3BsaXQoJy4nKS5yZXZlcnNlKCksIG5hbWVdLmpvaW4oJy4nKVxuICAgIHJldHVybiBuZXcgTlNJRChzZWdtZW50cylcbiAgfVxuXG4gIHN0YXRpYyBpc1ZhbGlkKG5zaWQ6IHN0cmluZyk6IGJvb2xlYW4ge1xuICAgIHRyeSB7XG4gICAgICBOU0lELnBhcnNlKG5zaWQpXG4gICAgICByZXR1cm4gdHJ1ZVxuICAgIH0gY2F0Y2ggKGUpIHtcbiAgICAgIHJldHVybiBmYWxzZVxuICAgIH1cbiAgfVxuXG4gIGNvbnN0cnVjdG9yKG5zaWQ6IHN0cmluZykge1xuICAgIGVuc3VyZVZhbGlkTnNpZChuc2lkKVxuICAgIHRoaXMuc2VnbWVudHMgPSBuc2lkLnNwbGl0KCcuJylcbiAgfVxuXG4gIGdldCBhdXRob3JpdHkoKSB7XG4gICAgcmV0dXJuIHRoaXMuc2VnbWVudHNcbiAgICAgIC5zbGljZSgwLCB0aGlzLnNlZ21lbnRzLmxlbmd0aCAtIDEpXG4gICAgICAucmV2ZXJzZSgpXG4gICAgICAuam9pbignLicpXG4gIH1cblxuICBnZXQgbmFtZSgpIHtcbiAgICByZXR1cm4gdGhpcy5zZWdtZW50cy5hdCh0aGlzLnNlZ21lbnRzLmxlbmd0aCAtIDEpXG4gIH1cblxuICB0b1N0cmluZygpIHtcbiAgICByZXR1cm4gdGhpcy5zZWdtZW50cy5qb2luKCcuJylcbiAgfVxufVxuXG4vLyBIdW1hbiByZWFkYWJsZSBjb25zdHJhaW50cyBvbiBOU0lEOlxuLy8gLSBhIHZhbGlkIGRvbWFpbiBpbiByZXZlcnNlZCBub3RhdGlvblxuLy8gLSBmb2xsb3dlZCBieSBhbiBhZGRpdGlvbmFsIHBlcmlvZC1zZXBhcmF0ZWQgbmFtZSwgd2hpY2ggaXMgY2FtZWwtY2FzZSBsZXR0ZXJzXG5leHBvcnQgY29uc3QgZW5zdXJlVmFsaWROc2lkID0gKG5zaWQ6IHN0cmluZyk6IHZvaWQgPT4ge1xuICBjb25zdCB0b0NoZWNrID0gbnNpZFxuXG4gIC8vIGNoZWNrIHRoYXQgYWxsIGNoYXJzIGFyZSBib3JpbmcgQVNDSUlcbiAgaWYgKCEvXlthLXpBLVowLTkuLV0qJC8udGVzdCh0b0NoZWNrKSkge1xuICAgIHRocm93IG5ldyBJbnZhbGlkTnNpZEVycm9yKFxuICAgICAgJ0Rpc2FsbG93ZWQgY2hhcmFjdGVycyBpbiBOU0lEIChBU0NJSSBsZXR0ZXJzLCBkaWdpdHMsIGRhc2hlcywgcGVyaW9kcyBvbmx5KScsXG4gICAgKVxuICB9XG5cbiAgaWYgKHRvQ2hlY2subGVuZ3RoID4gMjUzICsgMSArIDYzKSB7XG4gICAgdGhyb3cgbmV3IEludmFsaWROc2lkRXJyb3IoJ05TSUQgaXMgdG9vIGxvbmcgKDMxNyBjaGFycyBtYXgpJylcbiAgfVxuICBjb25zdCBsYWJlbHMgPSB0b0NoZWNrLnNwbGl0KCcuJylcbiAgaWYgKGxhYmVscy5sZW5ndGggPCAzKSB7XG4gICAgdGhyb3cgbmV3IEludmFsaWROc2lkRXJyb3IoJ05TSUQgbmVlZHMgYXQgbGVhc3QgdGhyZWUgcGFydHMnKVxuICB9XG4gIGZvciAobGV0IGkgPSAwOyBpIDwgbGFiZWxzLmxlbmd0aDsgaSsrKSB7XG4gICAgY29uc3QgbCA9IGxhYmVsc1tpXVxuICAgIGlmIChsLmxlbmd0aCA8IDEpIHtcbiAgICAgIHRocm93IG5ldyBJbnZhbGlkTnNpZEVycm9yKCdOU0lEIHBhcnRzIGNhbiBub3QgYmUgZW1wdHknKVxuICAgIH1cbiAgICBpZiAobC5sZW5ndGggPiA2Mykge1xuICAgICAgdGhyb3cgbmV3IEludmFsaWROc2lkRXJyb3IoJ05TSUQgcGFydCB0b28gbG9uZyAobWF4IDYzIGNoYXJzKScpXG4gICAgfVxuICAgIGlmIChsLmVuZHNXaXRoKCctJykgfHwgbC5zdGFydHNXaXRoKCctJykpIHtcbiAgICAgIHRocm93IG5ldyBJbnZhbGlkTnNpZEVycm9yKCdOU0lEIHBhcnRzIGNhbiBub3Qgc3RhcnQgb3IgZW5kIHdpdGggaHlwaGVuJylcbiAgICB9XG4gICAgaWYgKC9eWzAtOV0vLnRlc3QobCkgJiYgaSA9PT0gMCkge1xuICAgICAgdGhyb3cgbmV3IEludmFsaWROc2lkRXJyb3IoJ05TSUQgZmlyc3QgcGFydCBtYXkgbm90IHN0YXJ0IHdpdGggYSBkaWdpdCcpXG4gICAgfVxuICAgIGlmICghL15bYS16QS1aXSskLy50ZXN0KGwpICYmIGkgKyAxID09PSBsYWJlbHMubGVuZ3RoKSB7XG4gICAgICB0aHJvdyBuZXcgSW52YWxpZE5zaWRFcnJvcignTlNJRCBuYW1lIHBhcnQgbXVzdCBiZSBvbmx5IGxldHRlcnMnKVxuICAgIH1cbiAgfVxufVxuXG5leHBvcnQgY29uc3QgZW5zdXJlVmFsaWROc2lkUmVnZXggPSAobnNpZDogc3RyaW5nKTogdm9pZCA9PiB7XG4gIC8vIHNpbXBsZSByZWdleCB0byBlbmZvcmNlIG1vc3QgY29uc3RyYWludHMgdmlhIGp1c3QgcmVnZXggYW5kIGxlbmd0aC5cbiAgLy8gaGFuZCB3cm90ZSB0aGlzIHJlZ2V4IGJhc2VkIG9uIGFib3ZlIGNvbnN0cmFpbnRzXG4gIGlmIChcbiAgICAhL15bYS16QS1aXShbYS16QS1aMC05LV17MCw2MX1bYS16QS1aMC05XSk/KFxcLlthLXpBLVowLTldKFthLXpBLVowLTktXXswLDYxfVthLXpBLVowLTldKT8pKyhcXC5bYS16QS1aXShbYS16QS1aXXswLDYxfVthLXpBLVpdKT8pJC8udGVzdChcbiAgICAgIG5zaWQsXG4gICAgKVxuICApIHtcbiAgICB0aHJvdyBuZXcgSW52YWxpZE5zaWRFcnJvcihcIk5TSUQgZGlkbid0IHZhbGlkYXRlIHZpYSByZWdleFwiKVxuICB9XG4gIGlmIChuc2lkLmxlbmd0aCA+IDI1MyArIDEgKyA2Mykge1xuICAgIHRocm93IG5ldyBJbnZhbGlkTnNpZEVycm9yKCdOU0lEIGlzIHRvbyBsb25nICgzMTcgY2hhcnMgbWF4KScpXG4gIH1cbn1cblxuZXhwb3J0IGNsYXNzIEludmFsaWROc2lkRXJyb3IgZXh0ZW5kcyBFcnJvciB7fVxuIiwgImltcG9ydCB7IGVuc3VyZVZhbGlkSGFuZGxlLCBlbnN1cmVWYWxpZEhhbmRsZVJlZ2V4IH0gZnJvbSAnLi9oYW5kbGUnXG5pbXBvcnQgeyBlbnN1cmVWYWxpZERpZCwgZW5zdXJlVmFsaWREaWRSZWdleCB9IGZyb20gJy4vZGlkJ1xuaW1wb3J0IHsgZW5zdXJlVmFsaWROc2lkLCBlbnN1cmVWYWxpZE5zaWRSZWdleCB9IGZyb20gJy4vbnNpZCdcblxuLy8gSHVtYW4tcmVhZGFibGUgY29uc3RyYWludHMgb24gQVRVUkk6XG4vLyAgIC0gZm9sbG93aW5nIHJlZ3VsYXIgVVJMcywgYSA4S0J5dGUgaGFyZCB0b3RhbCBsZW5ndGggbGltaXRcbi8vICAgLSBmb2xsb3dzIEFUVVJJIGRvY3Mgb24gd2Vic2l0ZVxuLy8gICAgICAtIGFsbCBBU0NJSSBjaGFyYWN0ZXJzLCBubyB3aGl0ZXNwYWNlLiBub24tQVNDSUkgY291bGQgYmUgVVJMLWVuY29kZWRcbi8vICAgICAgLSBzdGFydHMgXCJhdDovL1wiXG4vLyAgICAgIC0gXCJhdXRob3JpdHlcIiBpcyBhIHZhbGlkIERJRCBvciBhIHZhbGlkIGhhbmRsZVxuLy8gICAgICAtIG9wdGlvbmFsbHksIGZvbGxvdyBcImF1dGhvcml0eVwiIHdpdGggXCIvXCIgYW5kIHZhbGlkIE5TSUQgYXMgc3RhcnQgb2YgcGF0aFxuLy8gICAgICAtIG9wdGlvbmFsbHksIGlmIE5TSUQgZ2l2ZW4sIGZvbGxvdyB0aGF0IHdpdGggXCIvXCIgYW5kIHJrZXlcbi8vICAgICAgLSBya2V5IHBhdGggY29tcG9uZW50IGNhbiBpbmNsdWRlIFVSTC1lbmNvZGVkIChcInBlcmNlbnQgZW5jb2RlZFwiKSwgb3I6XG4vLyAgICAgICAgICBBTFBIQSAvIERJR0lUIC8gXCItXCIgLyBcIi5cIiAvIFwiX1wiIC8gXCJ+XCIgLyBcIjpcIiAvIFwiQFwiIC8gXCIhXCIgLyBcIiRcIiAvIFwiJlwiIC8gXCInXCIgLyBcIihcIiAvIFwiKVwiIC8gXCIqXCIgLyBcIitcIiAvIFwiLFwiIC8gXCI7XCIgLyBcIj1cIlxuLy8gICAgICAgICAgW2EtekEtWjAtOS5ffjpAISQmJ1xcKFxcKSorLDs9LV1cbi8vICAgICAgLSBya2V5IG11c3QgaGF2ZSBhdCBsZWFzdCBvbmUgY2hhclxuLy8gICAgICAtIHJlZ2FyZGxlc3Mgb2YgcGF0aCBjb21wb25lbnQsIGEgZnJhZ21lbnQgY2FuIGZvbGxvdyAgYXMgXCIjXCIgYW5kIHRoZW4gYSBKU09OIHBvaW50ZXIgKFJGQy02OTAxKVxuZXhwb3J0IGNvbnN0IGVuc3VyZVZhbGlkQXRVcmkgPSAodXJpOiBzdHJpbmcpID0+IHtcbiAgLy8gSlNPTiBwb2ludGVyIGlzIHByZXR0eSBkaWZmZXJlbnQgZnJvbSByZXN0IG9mIFVSSSwgc28gc3BsaXQgdGhhdCBvdXQgZmlyc3RcbiAgY29uc3QgdXJpUGFydHMgPSB1cmkuc3BsaXQoJyMnKVxuICBpZiAodXJpUGFydHMubGVuZ3RoID4gMikge1xuICAgIHRocm93IG5ldyBFcnJvcignQVRVUkkgY2FuIGhhdmUgYXQgbW9zdCBvbmUgXCIjXCIsIHNlcGFyYXRpbmcgZnJhZ21lbnQgb3V0JylcbiAgfVxuICBjb25zdCBmcmFnbWVudFBhcnQgPSB1cmlQYXJ0c1sxXSB8fCBudWxsXG4gIHVyaSA9IHVyaVBhcnRzWzBdXG5cbiAgLy8gY2hlY2sgdGhhdCBhbGwgY2hhcnMgYXJlIGJvcmluZyBBU0NJSVxuICBpZiAoIS9eW2EtekEtWjAtOS5ffjpAISQmJykoKissOz0lLy1dKiQvLnRlc3QodXJpKSkge1xuICAgIHRocm93IG5ldyBFcnJvcignRGlzYWxsb3dlZCBjaGFyYWN0ZXJzIGluIEFUVVJJIChBU0NJSSknKVxuICB9XG5cbiAgY29uc3QgcGFydHMgPSB1cmkuc3BsaXQoJy8nKVxuICBpZiAocGFydHMubGVuZ3RoID49IDMgJiYgKHBhcnRzWzBdICE9PSAnYXQ6JyB8fCBwYXJ0c1sxXS5sZW5ndGggIT09IDApKSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKCdBVFVSSSBtdXN0IHN0YXJ0IHdpdGggXCJhdDovL1wiJylcbiAgfVxuICBpZiAocGFydHMubGVuZ3RoIDwgMykge1xuICAgIHRocm93IG5ldyBFcnJvcignQVRVUkkgcmVxdWlyZXMgYXQgbGVhc3QgbWV0aG9kIGFuZCBhdXRob3JpdHkgc2VjdGlvbnMnKVxuICB9XG5cbiAgdHJ5IHtcbiAgICBpZiAocGFydHNbMl0uc3RhcnRzV2l0aCgnZGlkOicpKSB7XG4gICAgICBlbnN1cmVWYWxpZERpZChwYXJ0c1syXSlcbiAgICB9IGVsc2Uge1xuICAgICAgZW5zdXJlVmFsaWRIYW5kbGUocGFydHNbMl0pXG4gICAgfVxuICB9IGNhdGNoIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoJ0FUVVJJIGF1dGhvcml0eSBtdXN0IGJlIGEgdmFsaWQgaGFuZGxlIG9yIERJRCcpXG4gIH1cblxuICBpZiAocGFydHMubGVuZ3RoID49IDQpIHtcbiAgICBpZiAocGFydHNbM10ubGVuZ3RoID09PSAwKSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoXG4gICAgICAgICdBVFVSSSBjYW4gbm90IGhhdmUgYSBzbGFzaCBhZnRlciBhdXRob3JpdHkgd2l0aG91dCBhIHBhdGggc2VnbWVudCcsXG4gICAgICApXG4gICAgfVxuICAgIHRyeSB7XG4gICAgICBlbnN1cmVWYWxpZE5zaWQocGFydHNbM10pXG4gICAgfSBjYXRjaCB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoXG4gICAgICAgICdBVFVSSSByZXF1aXJlcyBmaXJzdCBwYXRoIHNlZ21lbnQgKGlmIHN1cHBsaWVkKSB0byBiZSB2YWxpZCBOU0lEJyxcbiAgICAgIClcbiAgICB9XG4gIH1cblxuICBpZiAocGFydHMubGVuZ3RoID49IDUpIHtcbiAgICBpZiAocGFydHNbNF0ubGVuZ3RoID09PSAwKSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoXG4gICAgICAgICdBVFVSSSBjYW4gbm90IGhhdmUgYSBzbGFzaCBhZnRlciBjb2xsZWN0aW9uLCB1bmxlc3MgcmVjb3JkIGtleSBpcyBwcm92aWRlZCcsXG4gICAgICApXG4gICAgfVxuICAgIC8vIHdvdWxkIHZhbGlkYXRlIHJrZXkgaGVyZSwgYnV0IHRoZXJlIGFyZSBiYXNpY2FsbHkgbm8gY29uc3RyYWludHMhXG4gIH1cblxuICBpZiAocGFydHMubGVuZ3RoID49IDYpIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoXG4gICAgICAnQVRVUkkgcGF0aCBjYW4gaGF2ZSBhdCBtb3N0IHR3byBwYXJ0cywgYW5kIG5vIHRyYWlsaW5nIHNsYXNoJyxcbiAgICApXG4gIH1cblxuICBpZiAodXJpUGFydHMubGVuZ3RoID49IDIgJiYgZnJhZ21lbnRQYXJ0ID09IG51bGwpIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoJ0FUVVJJIGZyYWdtZW50IG11c3QgYmUgbm9uLWVtcHR5IGFuZCBzdGFydCB3aXRoIHNsYXNoJylcbiAgfVxuXG4gIGlmIChmcmFnbWVudFBhcnQgIT0gbnVsbCkge1xuICAgIGlmIChmcmFnbWVudFBhcnQubGVuZ3RoID09PSAwIHx8IGZyYWdtZW50UGFydFswXSAhPT0gJy8nKSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoJ0FUVVJJIGZyYWdtZW50IG11c3QgYmUgbm9uLWVtcHR5IGFuZCBzdGFydCB3aXRoIHNsYXNoJylcbiAgICB9XG4gICAgLy8gTk9URTogZW5mb3JjaW5nICpzb21lKiBjaGVja3MgaGVyZSBmb3Igc2FuaXR5LiBFZywgYXQgbGVhc3Qgbm8gd2hpdGVzcGFjZVxuICAgIGlmICghL15cXC9bYS16QS1aMC05Ll9+OkAhJCYnKSgqKyw7PSVbXFxdLy1dKiQvLnRlc3QoZnJhZ21lbnRQYXJ0KSkge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKCdEaXNhbGxvd2VkIGNoYXJhY3RlcnMgaW4gQVRVUkkgZnJhZ21lbnQgKEFTQ0lJKScpXG4gICAgfVxuICB9XG5cbiAgaWYgKHVyaS5sZW5ndGggPiA4ICogMTAyNCkge1xuICAgIHRocm93IG5ldyBFcnJvcignQVRVUkkgaXMgZmFyIHRvbyBsb25nJylcbiAgfVxufVxuXG5leHBvcnQgY29uc3QgZW5zdXJlVmFsaWRBdFVyaVJlZ2V4ID0gKHVyaTogc3RyaW5nKTogdm9pZCA9PiB7XG4gIC8vIHNpbXBsZSByZWdleCB0byBlbmZvcmNlIG1vc3QgY29uc3RyYWludHMgdmlhIGp1c3QgcmVnZXggYW5kIGxlbmd0aC5cbiAgLy8gaGFuZCB3cm90ZSB0aGlzIHJlZ2V4IGJhc2VkIG9uIGFib3ZlIGNvbnN0cmFpbnRzLiB3aGV3IVxuICBjb25zdCBhdHVyaVJlZ2V4ID1cbiAgICAvXmF0OlxcL1xcLyg/PGF1dGhvcml0eT5bYS16QS1aMC05Ll86JS1dKykoXFwvKD88Y29sbGVjdGlvbj5bYS16QS1aMC05LS5dKykoXFwvKD88cmtleT5bYS16QS1aMC05Ll9+OkAhJCYlJykoKissOz0tXSspKT8pPygjKD88ZnJhZ21lbnQ+XFwvW2EtekEtWjAtOS5ffjpAISQmJScpKCorLDs9XFwtW1xcXS9cXFxcXSopKT8kL1xuICBjb25zdCBybSA9IHVyaS5tYXRjaChhdHVyaVJlZ2V4KVxuICBpZiAoIXJtIHx8ICFybS5ncm91cHMpIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoXCJBVFVSSSBkaWRuJ3QgdmFsaWRhdGUgdmlhIHJlZ2V4XCIpXG4gIH1cbiAgY29uc3QgZ3JvdXBzID0gcm0uZ3JvdXBzXG5cbiAgdHJ5IHtcbiAgICBlbnN1cmVWYWxpZEhhbmRsZVJlZ2V4KGdyb3Vwcy5hdXRob3JpdHkpXG4gIH0gY2F0Y2gge1xuICAgIHRyeSB7XG4gICAgICBlbnN1cmVWYWxpZERpZFJlZ2V4KGdyb3Vwcy5hdXRob3JpdHkpXG4gICAgfSBjYXRjaCB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoJ0FUVVJJIGF1dGhvcml0eSBtdXN0IGJlIGEgdmFsaWQgaGFuZGxlIG9yIERJRCcpXG4gICAgfVxuICB9XG5cbiAgaWYgKGdyb3Vwcy5jb2xsZWN0aW9uKSB7XG4gICAgdHJ5IHtcbiAgICAgIGVuc3VyZVZhbGlkTnNpZFJlZ2V4KGdyb3Vwcy5jb2xsZWN0aW9uKVxuICAgIH0gY2F0Y2gge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKCdBVFVSSSBjb2xsZWN0aW9uIHBhdGggc2VnbWVudCBtdXN0IGJlIGEgdmFsaWQgTlNJRCcpXG4gICAgfVxuICB9XG5cbiAgaWYgKHVyaS5sZW5ndGggPiA4ICogMTAyNCkge1xuICAgIHRocm93IG5ldyBFcnJvcignQVRVUkkgaXMgZmFyIHRvbyBsb25nJylcbiAgfVxufVxuIiwgImV4cG9ydCAqIGZyb20gJy4vYXR1cmlfdmFsaWRhdGlvbidcblxuZXhwb3J0IGNvbnN0IEFUUF9VUklfUkVHRVggPVxuICAvLyBwcm90by0gICAgLS1kaWQtLS0tLS0tLS0tLS0tLSAgIC0tbmFtZS0tLS0tLS0tLS0tLS0tLS0gICAtLXBhdGgtLS0tICAgLS1xdWVyeS0tICAgLS1oYXNoLS1cbiAgL14oYXQ6XFwvXFwvKT8oKD86ZGlkOlthLXowLTk6JS1dKyl8KD86W2EtejAtOV1bYS16MC05LjotXSopKShcXC9bXj8jXFxzXSopPyhcXD9bXiNcXHNdKyk/KCNbXlxcc10rKT8kL2lcbi8vICAgICAgICAgICAgICAgICAgICAgICAtLXBhdGgtLS0tLSAgIC0tcXVlcnktLSAgLS1oYXNoLS1cbmNvbnN0IFJFTEFUSVZFX1JFR0VYID0gL14oXFwvW14/I1xcc10qKT8oXFw/W14jXFxzXSspPygjW15cXHNdKyk/JC9pXG5cbmV4cG9ydCBjbGFzcyBBdFVyaSB7XG4gIGhhc2g6IHN0cmluZ1xuICBob3N0OiBzdHJpbmdcbiAgcGF0aG5hbWU6IHN0cmluZ1xuICBzZWFyY2hQYXJhbXM6IFVSTFNlYXJjaFBhcmFtc1xuXG4gIGNvbnN0cnVjdG9yKHVyaTogc3RyaW5nLCBiYXNlPzogc3RyaW5nKSB7XG4gICAgbGV0IHBhcnNlZFxuICAgIGlmIChiYXNlKSB7XG4gICAgICBwYXJzZWQgPSBwYXJzZShiYXNlKVxuICAgICAgaWYgKCFwYXJzZWQpIHtcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKGBJbnZhbGlkIGF0IHVyaTogJHtiYXNlfWApXG4gICAgICB9XG4gICAgICBjb25zdCByZWxhdGl2ZXAgPSBwYXJzZVJlbGF0aXZlKHVyaSlcbiAgICAgIGlmICghcmVsYXRpdmVwKSB7XG4gICAgICAgIHRocm93IG5ldyBFcnJvcihgSW52YWxpZCBwYXRoOiAke3VyaX1gKVxuICAgICAgfVxuICAgICAgT2JqZWN0LmFzc2lnbihwYXJzZWQsIHJlbGF0aXZlcClcbiAgICB9IGVsc2Uge1xuICAgICAgcGFyc2VkID0gcGFyc2UodXJpKVxuICAgICAgaWYgKCFwYXJzZWQpIHtcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKGBJbnZhbGlkIGF0IHVyaTogJHt1cml9YClcbiAgICAgIH1cbiAgICB9XG5cbiAgICB0aGlzLmhhc2ggPSBwYXJzZWQuaGFzaFxuICAgIHRoaXMuaG9zdCA9IHBhcnNlZC5ob3N0XG4gICAgdGhpcy5wYXRobmFtZSA9IHBhcnNlZC5wYXRobmFtZVxuICAgIHRoaXMuc2VhcmNoUGFyYW1zID0gcGFyc2VkLnNlYXJjaFBhcmFtc1xuICB9XG5cbiAgc3RhdGljIG1ha2UoaGFuZGxlT3JEaWQ6IHN0cmluZywgY29sbGVjdGlvbj86IHN0cmluZywgcmtleT86IHN0cmluZykge1xuICAgIGxldCBzdHIgPSBoYW5kbGVPckRpZFxuICAgIGlmIChjb2xsZWN0aW9uKSBzdHIgKz0gJy8nICsgY29sbGVjdGlvblxuICAgIGlmIChya2V5KSBzdHIgKz0gJy8nICsgcmtleVxuICAgIHJldHVybiBuZXcgQXRVcmkoc3RyKVxuICB9XG5cbiAgZ2V0IHByb3RvY29sKCkge1xuICAgIHJldHVybiAnYXQ6J1xuICB9XG5cbiAgZ2V0IG9yaWdpbigpIHtcbiAgICByZXR1cm4gYGF0Oi8vJHt0aGlzLmhvc3R9YFxuICB9XG5cbiAgZ2V0IGhvc3RuYW1lKCkge1xuICAgIHJldHVybiB0aGlzLmhvc3RcbiAgfVxuXG4gIHNldCBob3N0bmFtZSh2OiBzdHJpbmcpIHtcbiAgICB0aGlzLmhvc3QgPSB2XG4gIH1cblxuICBnZXQgc2VhcmNoKCkge1xuICAgIHJldHVybiB0aGlzLnNlYXJjaFBhcmFtcy50b1N0cmluZygpXG4gIH1cblxuICBzZXQgc2VhcmNoKHY6IHN0cmluZykge1xuICAgIHRoaXMuc2VhcmNoUGFyYW1zID0gbmV3IFVSTFNlYXJjaFBhcmFtcyh2KVxuICB9XG5cbiAgZ2V0IGNvbGxlY3Rpb24oKSB7XG4gICAgcmV0dXJuIHRoaXMucGF0aG5hbWUuc3BsaXQoJy8nKS5maWx0ZXIoQm9vbGVhbilbMF0gfHwgJydcbiAgfVxuXG4gIHNldCBjb2xsZWN0aW9uKHY6IHN0cmluZykge1xuICAgIGNvbnN0IHBhcnRzID0gdGhpcy5wYXRobmFtZS5zcGxpdCgnLycpLmZpbHRlcihCb29sZWFuKVxuICAgIHBhcnRzWzBdID0gdlxuICAgIHRoaXMucGF0aG5hbWUgPSBwYXJ0cy5qb2luKCcvJylcbiAgfVxuXG4gIGdldCBya2V5KCkge1xuICAgIHJldHVybiB0aGlzLnBhdGhuYW1lLnNwbGl0KCcvJykuZmlsdGVyKEJvb2xlYW4pWzFdIHx8ICcnXG4gIH1cblxuICBzZXQgcmtleSh2OiBzdHJpbmcpIHtcbiAgICBjb25zdCBwYXJ0cyA9IHRoaXMucGF0aG5hbWUuc3BsaXQoJy8nKS5maWx0ZXIoQm9vbGVhbilcbiAgICBpZiAoIXBhcnRzWzBdKSBwYXJ0c1swXSA9ICd1bmRlZmluZWQnXG4gICAgcGFydHNbMV0gPSB2XG4gICAgdGhpcy5wYXRobmFtZSA9IHBhcnRzLmpvaW4oJy8nKVxuICB9XG5cbiAgZ2V0IGhyZWYoKSB7XG4gICAgcmV0dXJuIHRoaXMudG9TdHJpbmcoKVxuICB9XG5cbiAgdG9TdHJpbmcoKSB7XG4gICAgbGV0IHBhdGggPSB0aGlzLnBhdGhuYW1lIHx8ICcvJ1xuICAgIGlmICghcGF0aC5zdGFydHNXaXRoKCcvJykpIHtcbiAgICAgIHBhdGggPSBgLyR7cGF0aH1gXG4gICAgfVxuICAgIGxldCBxcyA9IHRoaXMuc2VhcmNoUGFyYW1zLnRvU3RyaW5nKClcbiAgICBpZiAocXMgJiYgIXFzLnN0YXJ0c1dpdGgoJz8nKSkge1xuICAgICAgcXMgPSBgPyR7cXN9YFxuICAgIH1cbiAgICBsZXQgaGFzaCA9IHRoaXMuaGFzaFxuICAgIGlmIChoYXNoICYmICFoYXNoLnN0YXJ0c1dpdGgoJyMnKSkge1xuICAgICAgaGFzaCA9IGAjJHtoYXNofWBcbiAgICB9XG4gICAgcmV0dXJuIGBhdDovLyR7dGhpcy5ob3N0fSR7cGF0aH0ke3FzfSR7aGFzaH1gXG4gIH1cbn1cblxuZnVuY3Rpb24gcGFyc2Uoc3RyOiBzdHJpbmcpIHtcbiAgY29uc3QgbWF0Y2ggPSBBVFBfVVJJX1JFR0VYLmV4ZWMoc3RyKVxuICBpZiAobWF0Y2gpIHtcbiAgICByZXR1cm4ge1xuICAgICAgaGFzaDogbWF0Y2hbNV0gfHwgJycsXG4gICAgICBob3N0OiBtYXRjaFsyXSB8fCAnJyxcbiAgICAgIHBhdGhuYW1lOiBtYXRjaFszXSB8fCAnJyxcbiAgICAgIHNlYXJjaFBhcmFtczogbmV3IFVSTFNlYXJjaFBhcmFtcyhtYXRjaFs0XSB8fCAnJyksXG4gICAgfVxuICB9XG4gIHJldHVybiB1bmRlZmluZWRcbn1cblxuZnVuY3Rpb24gcGFyc2VSZWxhdGl2ZShzdHI6IHN0cmluZykge1xuICBjb25zdCBtYXRjaCA9IFJFTEFUSVZFX1JFR0VYLmV4ZWMoc3RyKVxuICBpZiAobWF0Y2gpIHtcbiAgICByZXR1cm4ge1xuICAgICAgaGFzaDogbWF0Y2hbM10gfHwgJycsXG4gICAgICBwYXRobmFtZTogbWF0Y2hbMV0gfHwgJycsXG4gICAgICBzZWFyY2hQYXJhbXM6IG5ldyBVUkxTZWFyY2hQYXJhbXMobWF0Y2hbMl0gfHwgJycpLFxuICAgIH1cbiAgfVxuICByZXR1cm4gdW5kZWZpbmVkXG59XG4iLCAiZXhwb3J0IGNvbnN0IGVuc3VyZVZhbGlkVGlkID0gKHRpZDogc3RyaW5nKTogdm9pZCA9PiB7XG4gIGlmICh0aWQubGVuZ3RoICE9PSAxMykge1xuICAgIHRocm93IG5ldyBJbnZhbGlkVGlkRXJyb3IoJ1RJRCBtdXN0IGJlIDEzIGNoYXJhY3RlcnMnKVxuICB9XG4gIC8vIHNpbXBsZSByZWdleCB0byBlbmZvcmNlIG1vc3QgY29uc3RyYWludHMgdmlhIGp1c3QgcmVnZXggYW5kIGxlbmd0aC5cbiAgaWYgKCEvXlsyMzQ1NjdhYmNkZWZnaGlqXVsyMzQ1NjdhYmNkZWZnaGlqa2xtbm9wcXJzdHV2d3h5el17MTJ9JC8udGVzdCh0aWQpKSB7XG4gICAgdGhyb3cgbmV3IEludmFsaWRUaWRFcnJvcignVElEIHN5bnRheCBub3QgdmFsaWQgKHJlZ2V4KScpXG4gIH1cbn1cblxuZXhwb3J0IGNvbnN0IGlzVmFsaWRUaWQgPSAodGlkOiBzdHJpbmcpOiBib29sZWFuID0+IHtcbiAgdHJ5IHtcbiAgICBlbnN1cmVWYWxpZFRpZCh0aWQpXG4gIH0gY2F0Y2ggKGVycikge1xuICAgIGlmIChlcnIgaW5zdGFuY2VvZiBJbnZhbGlkVGlkRXJyb3IpIHtcbiAgICAgIHJldHVybiBmYWxzZVxuICAgIH1cbiAgICB0aHJvdyBlcnJcbiAgfVxuXG4gIHJldHVybiB0cnVlXG59XG5cbmV4cG9ydCBjbGFzcyBJbnZhbGlkVGlkRXJyb3IgZXh0ZW5kcyBFcnJvciB7fVxuIiwgImV4cG9ydCBjb25zdCBlbnN1cmVWYWxpZFJlY29yZEtleSA9IChya2V5OiBzdHJpbmcpOiB2b2lkID0+IHtcbiAgaWYgKHJrZXkubGVuZ3RoID4gNTEyIHx8IHJrZXkubGVuZ3RoIDwgMSkge1xuICAgIHRocm93IG5ldyBJbnZhbGlkUmVjb3JkS2V5RXJyb3IoJ3JlY29yZCBrZXkgbXVzdCBiZSAxIHRvIDUxMiBjaGFyYWN0ZXJzJylcbiAgfVxuICAvLyBzaW1wbGUgcmVnZXggdG8gZW5mb3JjZSBtb3N0IGNvbnN0cmFpbnRzIHZpYSBqdXN0IHJlZ2V4IGFuZCBsZW5ndGguXG4gIGlmICghL15bYS16QS1aMC05X34uOi1dezEsNTEyfSQvLnRlc3QocmtleSkpIHtcbiAgICB0aHJvdyBuZXcgSW52YWxpZFJlY29yZEtleUVycm9yKCdyZWNvcmQga2V5IHN5bnRheCBub3QgdmFsaWQgKHJlZ2V4KScpXG4gIH1cbiAgaWYgKHJrZXkgPT09ICcuJyB8fCBya2V5ID09PSAnLi4nKVxuICAgIHRocm93IG5ldyBJbnZhbGlkUmVjb3JkS2V5RXJyb3IoJ3JlY29yZCBrZXkgY2FuIG5vdCBiZSBcIi5cIiBvciBcIi4uXCInKVxufVxuXG5leHBvcnQgY29uc3QgaXNWYWxpZFJlY29yZEtleSA9IChya2V5OiBzdHJpbmcpOiBib29sZWFuID0+IHtcbiAgdHJ5IHtcbiAgICBlbnN1cmVWYWxpZFJlY29yZEtleShya2V5KVxuICB9IGNhdGNoIChlcnIpIHtcbiAgICBpZiAoZXJyIGluc3RhbmNlb2YgSW52YWxpZFJlY29yZEtleUVycm9yKSB7XG4gICAgICByZXR1cm4gZmFsc2VcbiAgICB9XG4gICAgdGhyb3cgZXJyXG4gIH1cblxuICByZXR1cm4gdHJ1ZVxufVxuXG5leHBvcnQgY2xhc3MgSW52YWxpZFJlY29yZEtleUVycm9yIGV4dGVuZHMgRXJyb3Ige31cbiIsICIvKiBWYWxpZGF0ZXMgZGF0ZXRpbWUgc3RyaW5nIGFnYWluc3QgYXRwcm90byBMZXhpY29uICdkYXRldGltZScgZm9ybWF0LlxuICogU3ludGF4IGlzIGRlc2NyaWJlZCBhdDogaHR0cHM6Ly9hdHByb3RvLmNvbS9zcGVjcy9sZXhpY29uI2RhdGV0aW1lXG4gKi9cbmV4cG9ydCBjb25zdCBlbnN1cmVWYWxpZERhdGV0aW1lID0gKGR0U3RyOiBzdHJpbmcpOiB2b2lkID0+IHtcbiAgY29uc3QgZGF0ZSA9IG5ldyBEYXRlKGR0U3RyKVxuICAvLyBtdXN0IHBhcnNlIGFzIElTTyA4NjAxOyB0aGlzIGFsc28gdmVyaWZpZXMgc2VtYW50aWNzIGxpa2UgbW9udGggaXMgbm90IDEzIG9yIDAwXG4gIGlmIChpc05hTihkYXRlLmdldFRpbWUoKSkpIHtcbiAgICB0aHJvdyBuZXcgSW52YWxpZERhdGV0aW1lRXJyb3IoJ2RhdGV0aW1lIGRpZCBub3QgcGFyc2UgYXMgSVNPIDg2MDEnKVxuICB9XG4gIGlmIChkYXRlLnRvSVNPU3RyaW5nKCkuc3RhcnRzV2l0aCgnLScpKSB7XG4gICAgdGhyb3cgbmV3IEludmFsaWREYXRldGltZUVycm9yKCdkYXRldGltZSBub3JtYWxpemVkIHRvIGEgbmVnYXRpdmUgdGltZScpXG4gIH1cbiAgLy8gcmVnZXggYW5kIG90aGVyIGNoZWNrcyBmb3IgUkZDLTMzMzlcbiAgaWYgKFxuICAgICEvXlswLTldezR9LVswMV1bMC05XS1bMC0zXVswLTldVFswLTJdWzAtOV06WzAtNl1bMC05XTpbMC02XVswLTldKC5bMC05XXsxLDIwfSk/KFp8KFsrLV1bMC0yXVswLTldOlswLTVdWzAtOV0pKSQvLnRlc3QoXG4gICAgICBkdFN0cixcbiAgICApXG4gICkge1xuICAgIHRocm93IG5ldyBJbnZhbGlkRGF0ZXRpbWVFcnJvcihcImRhdGV0aW1lIGRpZG4ndCB2YWxpZGF0ZSB2aWEgcmVnZXhcIilcbiAgfVxuICBpZiAoZHRTdHIubGVuZ3RoID4gNjQpIHtcbiAgICB0aHJvdyBuZXcgSW52YWxpZERhdGV0aW1lRXJyb3IoJ2RhdGV0aW1lIGlzIHRvbyBsb25nICg2NCBjaGFycyBtYXgpJylcbiAgfVxuICBpZiAoZHRTdHIuZW5kc1dpdGgoJy0wMDowMCcpKSB7XG4gICAgdGhyb3cgbmV3IEludmFsaWREYXRldGltZUVycm9yKFxuICAgICAgJ2RhdGV0aW1lIGNhbiBub3QgdXNlIFwiLTAwOjAwXCIgZm9yIFVUQyB0aW1lem9uZScsXG4gICAgKVxuICB9XG4gIGlmIChkdFN0ci5zdGFydHNXaXRoKCcwMDAnKSkge1xuICAgIHRocm93IG5ldyBJbnZhbGlkRGF0ZXRpbWVFcnJvcignZGF0ZXRpbWUgc28gY2xvc2UgdG8geWVhciB6ZXJvIG5vdCBhbGxvd2VkJylcbiAgfVxufVxuXG4vKiBTYW1lIGxvZ2ljIGFzIGVuc3VyZVZhbGlkRGF0ZXRpbWUoKSwgYnV0IHJldHVybnMgYSBib29sZWFuIGluc3RlYWQgb2YgdGhyb3dpbmcgYW4gZXhjZXB0aW9uLlxuICovXG5leHBvcnQgY29uc3QgaXNWYWxpZERhdGV0aW1lID0gKGR0U3RyOiBzdHJpbmcpOiBib29sZWFuID0+IHtcbiAgdHJ5IHtcbiAgICBlbnN1cmVWYWxpZERhdGV0aW1lKGR0U3RyKVxuICB9IGNhdGNoIChlcnIpIHtcbiAgICBpZiAoZXJyIGluc3RhbmNlb2YgSW52YWxpZERhdGV0aW1lRXJyb3IpIHtcbiAgICAgIHJldHVybiBmYWxzZVxuICAgIH1cbiAgICB0aHJvdyBlcnJcbiAgfVxuXG4gIHJldHVybiB0cnVlXG59XG5cbi8qIFRha2VzIGEgZmxleGlibGUgZGF0ZXRpbWUgc3RyaW5nIGFuZCBub3JtYWxpemVzIHJlcHJlc2VudGF0aW9uLlxuICpcbiAqIFRoaXMgZnVuY3Rpb24gd2lsbCB3b3JrIHdpdGggYW55IHZhbGlkIGF0cHJvdG8gZGF0ZXRpbWUgKGVnLCBhbnl0aGluZyB3aGljaCBpc1ZhbGlkRGF0ZXRpbWUoKSBpcyB0cnVlIGZvcikuIEl0ICphZGRpdGlvbmFsbHkqIGlzIG1vcmUgZmxleGlibGUgYWJvdXQgYWNjZXB0aW5nIGRhdGV0aW1lcyB0aGF0IGRvbid0IGNvbXBseSB0byBSRkMgMzMzOSwgb3IgYXJlIG1pc3NpbmcgdGltZXpvbmUgaW5mb3JtYXRpb24sIGFuZCBub3JtYWxpemluZyB0aGVtIHRvIGEgdmFsaWQgZGF0ZXRpbWUuXG4gKlxuICogT25lIHVzZS1jYXNlIGlzIGEgY29uc2lzdGVudCwgc29ydGFibGUgc3RyaW5nLiBBbm90aGVyIGlzIHRvIHdvcmsgd2l0aCBvbGRlciBpbnZhbGlkIGNyZWF0ZWRBdCBkYXRldGltZXMuXG4gKlxuICogU3VjY2Vzc2Z1bCBvdXRwdXQgd2lsbCBiZSBhIHZhbGlkIGF0cHJvdG8gZGF0ZXRpbWUgd2l0aCBtaWxsaXNlY29uZCBwcmVjaXNpb24gKDMgc3ViLXNlY29uZCBkaWdpdHMpIGFuZCBVVEMgdGltZXpvbmUgd2l0aCB0cmFpbGluZyAnWicgc3ludGF4LiBUaHJvd3MgYEludmFsaWREYXRldGltZUVycm9yYCBpZiB0aGUgaW5wdXQgc3RyaW5nIGNvdWxkIG5vdCBiZSBwYXJzZWQgYXMgYSBkYXRldGltZSwgZXZlbiB3aXRoIHBlcm1pc3NpdmUgcGFyc2luZy5cbiAqXG4gKiBFeHBlY3RlZCBvdXRwdXQgZm9ybWF0OiBZWVlZLU1NLUREVEhIOm1tOnNzLnNzc1pcbiAqL1xuZXhwb3J0IGNvbnN0IG5vcm1hbGl6ZURhdGV0aW1lID0gKGR0U3RyOiBzdHJpbmcpOiBzdHJpbmcgPT4ge1xuICBpZiAoaXNWYWxpZERhdGV0aW1lKGR0U3RyKSkge1xuICAgIGNvbnN0IG91dFN0ciA9IG5ldyBEYXRlKGR0U3RyKS50b0lTT1N0cmluZygpXG4gICAgaWYgKGlzVmFsaWREYXRldGltZShvdXRTdHIpKSB7XG4gICAgICByZXR1cm4gb3V0U3RyXG4gICAgfVxuICB9XG5cbiAgLy8gY2hlY2sgaWYgdGhpcyBwZXJtaXNzaXZlIGRhdGV0aW1lIGlzIG1pc3NpbmcgYSB0aW1lem9uZVxuICBpZiAoIS8uKigoWystXVxcZFxcZDo/XFxkXFxkKXxbYS16QS1aXSkkLy50ZXN0KGR0U3RyKSkge1xuICAgIGNvbnN0IGRhdGUgPSBuZXcgRGF0ZShkdFN0ciArICdaJylcbiAgICBpZiAoIWlzTmFOKGRhdGUuZ2V0VGltZSgpKSkge1xuICAgICAgY29uc3QgdHpTdHIgPSBkYXRlLnRvSVNPU3RyaW5nKClcbiAgICAgIGlmIChpc1ZhbGlkRGF0ZXRpbWUodHpTdHIpKSB7XG4gICAgICAgIHJldHVybiB0elN0clxuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIC8vIGZpbmFsbHkgdHJ5IHBhcnNpbmcgYXMgc2ltcGxlIGRhdGV0aW1lXG4gIGNvbnN0IGRhdGUgPSBuZXcgRGF0ZShkdFN0cilcbiAgaWYgKGlzTmFOKGRhdGUuZ2V0VGltZSgpKSkge1xuICAgIHRocm93IG5ldyBJbnZhbGlkRGF0ZXRpbWVFcnJvcihcbiAgICAgICdkYXRldGltZSBkaWQgbm90IHBhcnNlIGFzIGFueSB0aW1lc3RhbXAgZm9ybWF0JyxcbiAgICApXG4gIH1cbiAgY29uc3QgaXNvU3RyID0gZGF0ZS50b0lTT1N0cmluZygpXG4gIGlmIChpc1ZhbGlkRGF0ZXRpbWUoaXNvU3RyKSkge1xuICAgIHJldHVybiBpc29TdHJcbiAgfSBlbHNlIHtcbiAgICB0aHJvdyBuZXcgSW52YWxpZERhdGV0aW1lRXJyb3IoXG4gICAgICAnZGF0ZXRpbWUgbm9ybWFsaXplZCB0byBpbnZhbGlkIHRpbWVzdGFtcCBzdHJpbmcnLFxuICAgIClcbiAgfVxufVxuXG4vKiBWYXJpYW50IG9mIG5vcm1hbGl6ZURhdGV0aW1lKCkgd2hpY2ggYWx3YXlzIHJldHVybnMgYSB2YWxpZCBkYXRldGltZSBzdHJpbmdzLlxuICpcbiAqIElmIGEgSW52YWxpZERhdGV0aW1lRXJyb3IgaXMgZW5jb3VudGVyZWQsIHJldHVybnMgdGhlIFVOSVggZXBvY2ggdGltZSBhcyBhIFVUQyBkYXRldGltZSAoMTk3MC0wMS0wMVQwMDowMDowMC4wMDBaKS5cbiAqL1xuZXhwb3J0IGNvbnN0IG5vcm1hbGl6ZURhdGV0aW1lQWx3YXlzID0gKGR0U3RyOiBzdHJpbmcpOiBzdHJpbmcgPT4ge1xuICB0cnkge1xuICAgIHJldHVybiBub3JtYWxpemVEYXRldGltZShkdFN0cilcbiAgfSBjYXRjaCAoZXJyKSB7XG4gICAgaWYgKGVyciBpbnN0YW5jZW9mIEludmFsaWREYXRldGltZUVycm9yKSB7XG4gICAgICByZXR1cm4gbmV3IERhdGUoMCkudG9JU09TdHJpbmcoKVxuICAgIH1cbiAgICB0aHJvdyBlcnJcbiAgfVxufVxuXG4vKiBJbmRpY2F0ZXMgYSBkYXRldGltZSBzdHJpbmcgZGlkIG5vdCBwYXNzIGZ1bGwgYXRwcm90byBMZXhpY29uIGRhdGV0aW1lIHN0cmluZyBmb3JtYXQgY2hlY2tzLlxuICovXG5leHBvcnQgY2xhc3MgSW52YWxpZERhdGV0aW1lRXJyb3IgZXh0ZW5kcyBFcnJvciB7fVxuIiwgImV4cG9ydCAqIGZyb20gJy4vaGFuZGxlJ1xuZXhwb3J0ICogZnJvbSAnLi9kaWQnXG5leHBvcnQgKiBmcm9tICcuL25zaWQnXG5leHBvcnQgKiBmcm9tICcuL2F0dXJpJ1xuZXhwb3J0ICogZnJvbSAnLi90aWQnXG5leHBvcnQgKiBmcm9tICcuL3JlY29yZGtleSdcbmV4cG9ydCAqIGZyb20gJy4vZGF0ZXRpbWUnXG4iLCAiaW1wb3J0IHR5cGUgeyBBdHBTZXNzaW9uRGF0YSB9IGZyb20gXCJAYXRjdXRlL2NsaWVudFwiO1xuaW1wb3J0IHsgR01fZmV0Y2ggfSBmcm9tIFwiQHV3eC9nbS1mZXRjaFwiO1xuaW1wb3J0IHsgS2l0dHlBZ2VudCB9IGZyb20gXCJraXR0eS1hZ2VudFwiO1xuaW1wb3J0IHsgZW5jcnlwdERhdGEgfSBmcm9tIFwiLi9jcnlwdG9cIjtcbmltcG9ydCB7IHRvQnl0ZXMgfSBmcm9tIFwiQGF0Y3V0ZS9jYm9yXCI7XG5pbXBvcnQgeyBub3cgYXMgdGlkTm93IH0gZnJvbSBcIkBhdGN1dGUvdGlkXCI7XG5cbmNvbnNvbGUubG9nKCdoZWxsbyB3b3JsZCEnKTtcblxuY29uc3QgcHJvY2Vzc2VkRWxlbWVudHMgPSBuZXcgV2Vha1NldCgpO1xuXG5hc3luYyBmdW5jdGlvbiBnZXRMb2dnZWRJbkFnZW50KCkge1xuICAgIGNvbnN0IHsgYWdlbnQsIG1hbmFnZXIgfSA9IGF3YWl0IEtpdHR5QWdlbnQuY3JlYXRlUGRzV2l0aENyZWRlbnRpYWxzKEdNX2dldFZhbHVlKCdic2t5VXNlcm5hbWUnKSk7XG5cbiAgICBsZXQgc2Vzc2lvbiA9IEdNX2dldFZhbHVlKCdic2t5U2Vzc2lvbicpIGFzIEF0cFNlc3Npb25EYXRhO1xuICAgIGlmIChzZXNzaW9uKSB7XG4gICAgICAgIHRyeSB7XG4gICAgICAgICAgICBhd2FpdCBtYW5hZ2VyLnJlc3VtZShzZXNzaW9uKTtcbiAgICAgICAgfSBjYXRjaCAoZXJyKSB7XG4gICAgICAgICAgICBjb25zb2xlLndhcm4oJ2ZhaWxlZCB0byByZXN1bWUgc2Vzc2lvbicsIGVycik7XG4gICAgICAgICAgICBzZXNzaW9uID0gYXdhaXQgbWFuYWdlci5sb2dpbih7IGlkZW50aWZpZXI6IEdNX2dldFZhbHVlKCdic2t5VXNlcm5hbWUnKSwgcGFzc3dvcmQ6IEdNX2dldFZhbHVlKCdic2t5UGFzc3dvcmQnKSB9KTtcbiAgICAgICAgfVxuICAgIH0gZWxzZSB7XG4gICAgICAgIHNlc3Npb24gPSBhd2FpdCBtYW5hZ2VyLmxvZ2luKHsgaWRlbnRpZmllcjogR01fZ2V0VmFsdWUoJ2Jza3lVc2VybmFtZScpLCBwYXNzd29yZDogR01fZ2V0VmFsdWUoJ2Jza3lQYXNzd29yZCcpIH0pO1xuICAgICAgICBHTV9zZXRWYWx1ZSgnYnNreVNlc3Npb24nLCBzZXNzaW9uKTtcbiAgICB9XG5cbiAgICByZXR1cm4gYWdlbnQ7XG59XG5cbkdNX3JlZ2lzdGVyTWVudUNvbW1hbmQoJ1NldCB3ZWJob29rJywgKCkgPT4ge1xuICAgIGNvbnN0IHJlc3VsdCA9IHByb21wdCgnUGFzdGUgd2ViaG9vayBVUkwgaGVyZScpO1xuICAgIGlmIChyZXN1bHQgIT0gbnVsbCkge1xuICAgICAgICBHTV9zZXRWYWx1ZSgnd2ViaG9va1VybCcsIHJlc3VsdCk7XG4gICAgICAgIGFsZXJ0KCdVUkwgc2V0IScpO1xuICAgIH1cbn0pO1xuXG5HTV9yZWdpc3Rlck1lbnVDb21tYW5kKCdTZXQgQmx1ZXNreSBkZXRhaWxzJywgKCkgPT4ge1xuICAgIGxldCByZXN1bHQgPSBwcm9tcHQoJ0JsdWVza3kgdXNlcm5hbWUnKTtcbiAgICBpZiAocmVzdWx0ICE9IG51bGwpIHtcbiAgICAgICAgR01fc2V0VmFsdWUoJ2Jza3lVc2VybmFtZScsIHJlc3VsdCk7XG4gICAgfVxuICAgIHJlc3VsdCA9IHByb21wdCgnQmx1ZXNreSBwYXNzd29yZCcpO1xuICAgIGlmIChyZXN1bHQgIT0gbnVsbCkge1xuICAgICAgICBHTV9zZXRWYWx1ZSgnYnNreVBhc3N3b3JkJywgcmVzdWx0KTtcbiAgICB9XG59KTtcblxuR01fcmVnaXN0ZXJNZW51Q29tbWFuZCgnU2V0IGVuY3J5cHRpb24gcGFzc3dvcmQnLCAoKSA9PiB7XG4gICAgY29uc3QgcmVzdWx0ID0gcHJvbXB0KCdQYXN0ZSBwYXNzd29yZCBoZXJlJyk7XG4gICAgaWYgKHJlc3VsdCAhPSBudWxsKSB7XG4gICAgICAgIEdNX3NldFZhbHVlKCdjcnlwdG9QYXNzd29yZCcsIHJlc3VsdCk7XG4gICAgfVxufSk7XG5cbnNldEludGVydmFsKCgpID0+IHtcbiAgICBjb25zdCBuZXdFbGVtZW50cyA9IFsuLi5kb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCdbZGF0YS10ZXN0aWRePVwiZmVlZEl0ZW0tXCJdLCBbZGF0YS10ZXN0aWRePVwicG9zdFRocmVhZEl0ZW0tXCJdJyldLm1hcChlID0+IHtcbiAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgIGVsZW1lbnQ6IGUsXG4gICAgICAgICAgICBidXR0b25zOiBlLnF1ZXJ5U2VsZWN0b3IoJ1thcmlhLWxhYmVsPVwiT3BlbiBwb3N0IG9wdGlvbnMgbWVudVwiXScpPy5wYXJlbnRFbGVtZW50IS5wYXJlbnRFbGVtZW50IS5wYXJlbnRFbGVtZW50LFxuICAgICAgICAgICAgcG9zdExpbms6IChlLnF1ZXJ5U2VsZWN0b3IoJ1tocmVmXj1cIi9wcm9maWxlL1wiXVtocmVmKj1cIi9wb3N0L1wiXScpIGFzIEhUTUxBbmNob3JFbGVtZW50KT8uaHJlZixcbiAgICAgICAgfTtcbiAgICB9KTtcbiAgICBcbiAgICBmb3IgKGNvbnN0IHsgZWxlbWVudCwgYnV0dG9ucywgcG9zdExpbmsgfSBvZiBuZXdFbGVtZW50cykge1xuICAgICAgICBpZiAocHJvY2Vzc2VkRWxlbWVudHMuaGFzKGVsZW1lbnQpKSB7XG4gICAgICAgICAgICBjb250aW51ZTtcbiAgICAgICAgfVxuICAgIFxuICAgICAgICBwcm9jZXNzZWRFbGVtZW50cy5hZGQoZWxlbWVudCk7XG4gICAgXG4gICAgICAgIGNvbnN0IGJ1dHRvbiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2J1dHRvbicpO1xuICAgICAgICBidXR0b24udGV4dENvbnRlbnQgPSAnXHVEODNEXHVEQ0NDJztcbiAgICAgICAgYnV0dG9uLm9uY2xpY2sgPSBhc3luYyBlID0+IHtcbiAgICAgICAgICAgIGUuc3RvcFByb3BhZ2F0aW9uKCk7XG4gICAgICAgICAgICBlLnByZXZlbnREZWZhdWx0KCk7XG5cbiAgICAgICAgICAgIGNvbnNvbGUubG9nKGBib29rbWFya2luZyAke3Bvc3RMaW5rID8/IGRvY3VtZW50LmxvY2F0aW9uLmhyZWZ9YCk7XG4gICAgICAgICAgICAvLyBib29rbWFyayBwb3N0XG4gICAgICAgICAgICBhd2FpdCBQcm9taXNlLmFsbChbXG4gICAgICAgICAgICAgICAgKGFzeW5jICgpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKCFHTV9nZXRWYWx1ZSgnY3J5cHRvUGFzc3dvcmQnKSB8fCAhR01fZ2V0VmFsdWUoJ2Jza3lVc2VybmFtZScpIHx8ICFHTV9nZXRWYWx1ZSgnYnNreVBhc3N3b3JkJykpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGFsZXJ0KCdCbHVlc2t5IGFjY291bnQgbm90IGNvbmZpZ3VyZWQhJyk7XG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgICAgICBjb25zdCBwb3N0TWF0Y2ggPSAocG9zdExpbmsgPz8gZG9jdW1lbnQubG9jYXRpb24uaHJlZikubWF0Y2goL1xcL3Byb2ZpbGVcXC8oLio/KVxcL3Bvc3RcXC8oLiopL2kpO1xuICAgICAgICAgICAgICAgICAgICBpZiAoIXBvc3RNYXRjaCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgYWxlcnQoJ1VSTCBkaWQgbm90IG1hdGNoIHJlZ2V4IScpO1xuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICAgICAgY29uc3QgWywgcmVwbywgcmtleV0gPSBwb3N0TWF0Y2g7XG5cbiAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coJ2xvZ2dpbmcgaW4nKTtcbiAgICAgICAgICAgICAgICAgICAgY29uc3QgYWdlbnQgPSBhd2FpdCBnZXRMb2dnZWRJbkFnZW50KCk7XG4gICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKCdsb2dnZWQgaW4nKTtcbiAgICAgICAgICAgICAgICAgICAgYXdhaXQgYWdlbnQucHV0KHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbGxlY3Rpb246ICdpbnZhbGlkLnV3eC5lbmNyeXB0ZWQuYm9va21hcmsnLFxuICAgICAgICAgICAgICAgICAgICAgICAgcmVwbzogR01fZ2V0VmFsdWUoJ2Jza3lVc2VybmFtZScpLFxuICAgICAgICAgICAgICAgICAgICAgICAgcmtleTogdGlkTm93KCksXG4gICAgICAgICAgICAgICAgICAgICAgICByZWNvcmQ6IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAkdHlwZTogJ2ludmFsaWQudXd4LmVuY3J5cHRlZC5ib29rbWFyaycsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZW5jcnlwdGVkVXJsOiB0b0J5dGVzKFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYXdhaXQgZW5jcnlwdERhdGEoXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbmV3IFRleHRFbmNvZGVyKCkuZW5jb2RlKFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBKU09OLnN0cmluZ2lmeSh7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXBvLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmtleSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIClcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICksXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBHTV9nZXRWYWx1ZSgnY3J5cHRvUGFzc3dvcmQnKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICApXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgKVxuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICB9KSgpLFxuICAgICAgICAgICAgICAgIChhc3luYyAoKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIGlmICghR01fZ2V0VmFsdWUoJ3dlYmhvb2tVcmwnKSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgYWxlcnQoJ05vIHdlYmhvb2sgVVJMIHNldCEnKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICBcbiAgICAgICAgICAgICAgICAgICAgYXdhaXQgR01fZmV0Y2goXG4gICAgICAgICAgICAgICAgICAgICAgICBHTV9nZXRWYWx1ZSgnd2ViaG9va1VybCcpLFxuICAgICAgICAgICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG1ldGhvZDogJ1BPU1QnLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJvZHk6IEpTT04uc3RyaW5naWZ5KHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY29udGVudDogZml4TGluayhwb3N0TGluayA/PyBkb2N1bWVudC5sb2NhdGlvbi5ocmVmKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGhlYWRlcnM6IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgJ0NvbnRlbnQtVHlwZSc6ICdhcHBsaWNhdGlvbi9qc29uJyxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICk7XG4gICAgICAgICAgICAgICAgfSkoKSxcbiAgICAgICAgICAgIF0pXG4gICAgICAgIH07XG4gICAgXG4gICAgICAgIGlmICghYnV0dG9ucykgY29udGludWU7XG4gICAgXG4gICAgICAgIGJ1dHRvbnMuYXBwZW5kKGJ1dHRvbik7XG4gICAgfVxufSwgMjUwKTtcblxuZnVuY3Rpb24gZml4TGluayhsaW5rOiBzdHJpbmcpIHtcbiAgICBjb25zdCB1cmwgPSBuZXcgVVJMKGxpbmspO1xuICAgIHVybC5ob3N0bmFtZSA9ICdic2t5eC5hcHAnO1xuICAgIHJldHVybiB1cmwudG9TdHJpbmcoKTtcbn1cbiIsICIvKiogRmV0Y2ggaGFuZGxlciBmdW5jdGlvbiAqL1xuZXhwb3J0IHR5cGUgRmV0Y2hIYW5kbGVyID0gKHBhdGhuYW1lOiBzdHJpbmcsIGluaXQ6IFJlcXVlc3RJbml0KSA9PiBQcm9taXNlPFJlc3BvbnNlPjtcblxuLyoqIEZldGNoIGhhbmRsZXIgaW4gYW4gb2JqZWN0ICovXG5leHBvcnQgaW50ZXJmYWNlIEZldGNoSGFuZGxlck9iamVjdCB7XG5cdGhhbmRsZSh0aGlzOiBGZXRjaEhhbmRsZXJPYmplY3QsIHBhdGhuYW1lOiBzdHJpbmcsIGluaXQ6IFJlcXVlc3RJbml0KTogUHJvbWlzZTxSZXNwb25zZT47XG59XG5cbmV4cG9ydCBjb25zdCBidWlsZEZldGNoSGFuZGxlciA9IChoYW5kbGVyOiBGZXRjaEhhbmRsZXIgfCBGZXRjaEhhbmRsZXJPYmplY3QpOiBGZXRjaEhhbmRsZXIgPT4ge1xuXHRpZiAodHlwZW9mIGhhbmRsZXIgPT09ICdvYmplY3QnKSB7XG5cdFx0cmV0dXJuIGhhbmRsZXIuaGFuZGxlLmJpbmQoaGFuZGxlcik7XG5cdH1cblxuXHRyZXR1cm4gaGFuZGxlcjtcbn07XG5cbmV4cG9ydCBpbnRlcmZhY2UgU2ltcGxlRmV0Y2hIYW5kbGVyT3B0aW9ucyB7XG5cdHNlcnZpY2U6IHN0cmluZyB8IFVSTDtcblx0ZmV0Y2g/OiB0eXBlb2YgZ2xvYmFsVGhpcy5mZXRjaDtcbn1cblxuZXhwb3J0IGNvbnN0IHNpbXBsZUZldGNoSGFuZGxlciA9ICh7XG5cdHNlcnZpY2UsXG5cdGZldGNoOiBfZmV0Y2ggPSBmZXRjaCxcbn06IFNpbXBsZUZldGNoSGFuZGxlck9wdGlvbnMpOiBGZXRjaEhhbmRsZXIgPT4ge1xuXHRyZXR1cm4gYXN5bmMgKHBhdGhuYW1lLCBpbml0KSA9PiB7XG5cdFx0Y29uc3QgdXJsID0gbmV3IFVSTChwYXRobmFtZSwgc2VydmljZSk7XG5cdFx0cmV0dXJuIF9mZXRjaCh1cmwsIGluaXQpO1xuXHR9O1xufTtcbiIsICIvKipcbiAqIEBtb2R1bGVcbiAqIEFzc29ydG1lbnQgb2YgSFRUUCB1dGlsaXRpZXNcbiAqIFRoaXMgbW9kdWxlIGlzIGV4cG9ydGVkIGZvciBjb252ZW5pZW5jZSBhbmQgaXMgbm8gd2F5IHBhcnQgb2YgcHVibGljIEFQSSxcbiAqIGl0IGNhbiBiZSByZW1vdmVkIGF0IGFueSB0aW1lLlxuICovXG5cbmV4cG9ydCBjb25zdCBtZXJnZUhlYWRlcnMgPSAoXG5cdGluaXQ6IEhlYWRlcnNJbml0IHwgdW5kZWZpbmVkLFxuXHRkZWZhdWx0czogUmVjb3JkPHN0cmluZywgc3RyaW5nIHwgbnVsbD4sXG4pOiBIZWFkZXJzSW5pdCB8IHVuZGVmaW5lZCA9PiB7XG5cdGxldCBoZWFkZXJzOiBIZWFkZXJzIHwgdW5kZWZpbmVkO1xuXG5cdGZvciAoY29uc3QgbmFtZSBpbiBkZWZhdWx0cykge1xuXHRcdGNvbnN0IHZhbHVlID0gZGVmYXVsdHNbbmFtZV07XG5cblx0XHRpZiAodmFsdWUgIT09IG51bGwpIHtcblx0XHRcdGhlYWRlcnMgPz89IG5ldyBIZWFkZXJzKGluaXQpO1xuXG5cdFx0XHRpZiAoIWhlYWRlcnMuaGFzKG5hbWUpKSB7XG5cdFx0XHRcdGhlYWRlcnMuc2V0KG5hbWUsIHZhbHVlKTtcblx0XHRcdH1cblx0XHR9XG5cdH1cblxuXHRyZXR1cm4gaGVhZGVycyA/PyBpbml0O1xufTtcbiIsICJpbXBvcnQgdHlwZSB7IEF0LCBQcm9jZWR1cmVzLCBRdWVyaWVzIH0gZnJvbSAnLi9sZXhpY29ucy5qcyc7XG5cbmltcG9ydCB7IGJ1aWxkRmV0Y2hIYW5kbGVyLCB0eXBlIEZldGNoSGFuZGxlciwgdHlwZSBGZXRjaEhhbmRsZXJPYmplY3QgfSBmcm9tICcuL2ZldGNoLWhhbmRsZXIuanMnO1xuaW1wb3J0IHsgbWVyZ2VIZWFkZXJzIH0gZnJvbSAnLi91dGlscy9odHRwLmpzJztcblxuZXhwb3J0IHR5cGUgSGVhZGVyc09iamVjdCA9IFJlY29yZDxzdHJpbmcsIHN0cmluZz47XG5cbi8qKiBSZXNwb25zZSBmcm9tIFhSUEMgc2VydmljZSAqL1xuZXhwb3J0IGludGVyZmFjZSBYUlBDUmVzcG9uc2U8VCA9IGFueT4ge1xuXHRkYXRhOiBUO1xuXHRoZWFkZXJzOiBIZWFkZXJzT2JqZWN0O1xufVxuXG4vKiogT3B0aW9ucyBmb3IgY29uc3RydWN0aW5nIGFuIFhSUEMgZXJyb3IgKi9cbmV4cG9ydCBpbnRlcmZhY2UgWFJQQ0Vycm9yT3B0aW9ucyB7XG5cdGtpbmQ/OiBzdHJpbmc7XG5cdGRlc2NyaXB0aW9uPzogc3RyaW5nO1xuXHRoZWFkZXJzPzogSGVhZGVyc09iamVjdDtcblx0Y2F1c2U/OiB1bmtub3duO1xufVxuXG4vKiogRXJyb3IgY29taW5nIGZyb20gdGhlIFhSUEMgc2VydmljZSAqL1xuZXhwb3J0IGNsYXNzIFhSUENFcnJvciBleHRlbmRzIEVycm9yIHtcblx0b3ZlcnJpZGUgbmFtZSA9ICdYUlBDRXJyb3InO1xuXG5cdC8qKiBSZXNwb25zZSBzdGF0dXMgKi9cblx0c3RhdHVzOiBudW1iZXI7XG5cdC8qKiBSZXNwb25zZSBoZWFkZXJzICovXG5cdGhlYWRlcnM6IEhlYWRlcnNPYmplY3Q7XG5cdC8qKiBFcnJvciBraW5kICovXG5cdGtpbmQ/OiBzdHJpbmc7XG5cdC8qKiBFcnJvciBkZXNjcmlwdGlvbiAqL1xuXHRkZXNjcmlwdGlvbj86IHN0cmluZztcblxuXHRjb25zdHJ1Y3Rvcihcblx0XHRzdGF0dXM6IG51bWJlcixcblx0XHR7XG5cdFx0XHRraW5kID0gYEhUVFAgZXJyb3IgJHtzdGF0dXN9YCxcblx0XHRcdGRlc2NyaXB0aW9uID0gYFVuc3BlY2lmaWVkIGVycm9yIGRlc2NyaXB0aW9uYCxcblx0XHRcdGhlYWRlcnMsXG5cdFx0XHRjYXVzZSxcblx0XHR9OiBYUlBDRXJyb3JPcHRpb25zID0ge30sXG5cdCkge1xuXHRcdHN1cGVyKGAke2tpbmR9ID4gJHtkZXNjcmlwdGlvbn1gLCB7IGNhdXNlIH0pO1xuXG5cdFx0dGhpcy5zdGF0dXMgPSBzdGF0dXM7XG5cdFx0dGhpcy5raW5kID0ga2luZDtcblx0XHR0aGlzLmRlc2NyaXB0aW9uID0gZGVzY3JpcHRpb247XG5cdFx0dGhpcy5oZWFkZXJzID0gaGVhZGVycyB8fCB7fTtcblx0fVxufVxuXG4vKiogU2VydmljZSBwcm94eSBvcHRpb25zICovXG5leHBvcnQgaW50ZXJmYWNlIFhSUENQcm94eU9wdGlvbnMge1xuXHR0eXBlOiAnYXRwcm90b19wZHMnIHwgJ2F0cHJvdG9fbGFiZWxlcicgfCAnYnNreV9mZycgfCAnYnNreV9ub3RpZicgfCAoe30gJiBzdHJpbmcpO1xuXHRzZXJ2aWNlOiBBdC5ESUQ7XG59XG5cbi8qKiBPcHRpb25zIGZvciBjb25zdHJ1Y3RpbmcgYW4gWFJQQyAqL1xuZXhwb3J0IGludGVyZmFjZSBYUlBDT3B0aW9ucyB7XG5cdGhhbmRsZXI6IEZldGNoSGFuZGxlciB8IEZldGNoSGFuZGxlck9iamVjdDtcblx0cHJveHk/OiBYUlBDUHJveHlPcHRpb25zO1xufVxuXG4vKiogWFJQQyByZXF1ZXN0IG9wdGlvbnMgKi9cbmV4cG9ydCBpbnRlcmZhY2UgWFJQQ1JlcXVlc3RPcHRpb25zIHtcblx0dHlwZTogJ2dldCcgfCAncG9zdCc7XG5cdG5zaWQ6IHN0cmluZztcblx0aGVhZGVycz86IEhlYWRlcnNJbml0O1xuXHRwYXJhbXM/OiBSZWNvcmQ8c3RyaW5nLCB1bmtub3duPjtcblx0ZGF0YT86IEZvcm1EYXRhIHwgQmxvYiB8IEFycmF5QnVmZmVyVmlldyB8IFJlY29yZDxzdHJpbmcsIHVua25vd24+O1xuXHRzaWduYWw/OiBBYm9ydFNpZ25hbDtcbn1cblxuLyoqIFhSUEMgcmVzcG9uc2UgKi9cbmV4cG9ydCBpbnRlcmZhY2UgWFJQQ1Jlc3BvbnNlPFQgPSBhbnk+IHtcblx0ZGF0YTogVDtcblx0aGVhZGVyczogSGVhZGVyc09iamVjdDtcbn1cblxuLyoqIEJhc2Ugb3B0aW9ucyBmb3IgdGhlIHF1ZXJ5L3Byb2NlZHVyZSByZXF1ZXN0ICovXG5pbnRlcmZhY2UgQmFzZVJQQ09wdGlvbnMge1xuXHQvKiogUmVxdWVzdCBoZWFkZXJzIHRvIG1ha2UgKi9cblx0aGVhZGVycz86IEhlYWRlcnNJbml0O1xuXHQvKiogU2lnbmFsIGZvciBhYm9ydGluZyB0aGUgcmVxdWVzdCAqL1xuXHRzaWduYWw/OiBBYm9ydFNpZ25hbDtcbn1cblxuLyoqIE9wdGlvbnMgZm9yIHRoZSBxdWVyeS9wcm9jZWR1cmUgcmVxdWVzdCAqL1xuZXhwb3J0IHR5cGUgUlBDT3B0aW9uczxUPiA9IEJhc2VSUENPcHRpb25zICZcblx0KFQgZXh0ZW5kcyB7IHBhcmFtczogYW55IH0gPyB7IHBhcmFtczogVFsncGFyYW1zJ10gfSA6IHt9KSAmXG5cdChUIGV4dGVuZHMgeyBpbnB1dDogYW55IH0gPyB7IGRhdGE6IFRbJ2lucHV0J10gfSA6IHt9KTtcblxudHlwZSBPdXRwdXRPZjxUPiA9IFQgZXh0ZW5kcyB7IG91dHB1dDogYW55IH0gPyBUWydvdXRwdXQnXSA6IG5ldmVyO1xuXG5leHBvcnQgY2xhc3MgWFJQQyB7XG5cdGhhbmRsZTogRmV0Y2hIYW5kbGVyO1xuXHRwcm94eTogWFJQQ1Byb3h5T3B0aW9ucyB8IHVuZGVmaW5lZDtcblxuXHRjb25zdHJ1Y3Rvcih7IGhhbmRsZXIsIHByb3h5IH06IFhSUENPcHRpb25zKSB7XG5cdFx0dGhpcy5oYW5kbGUgPSBidWlsZEZldGNoSGFuZGxlcihoYW5kbGVyKTtcblx0XHR0aGlzLnByb3h5ID0gcHJveHk7XG5cdH1cblxuXHQvKipcblx0ICogTWFrZXMgYSBxdWVyeSAoR0VUKSByZXF1ZXN0XG5cdCAqIEBwYXJhbSBuc2lkIE5hbWVzcGFjZSBJRCBvZiBhIHF1ZXJ5IGVuZHBvaW50XG5cdCAqIEBwYXJhbSBvcHRpb25zIE9wdGlvbnMgdG8gaW5jbHVkZSBsaWtlIHBhcmFtZXRlcnNcblx0ICogQHJldHVybnMgVGhlIHJlc3BvbnNlIG9mIHRoZSByZXF1ZXN0XG5cdCAqL1xuXHRnZXQ8SyBleHRlbmRzIGtleW9mIFF1ZXJpZXM+KFxuXHRcdG5zaWQ6IEssXG5cdFx0b3B0aW9uczogUlBDT3B0aW9uczxRdWVyaWVzW0tdPixcblx0KTogUHJvbWlzZTxYUlBDUmVzcG9uc2U8T3V0cHV0T2Y8UXVlcmllc1tLXT4+PiB7XG5cdFx0cmV0dXJuIHRoaXMucmVxdWVzdCh7IHR5cGU6ICdnZXQnLCBuc2lkOiBuc2lkLCAuLi4ob3B0aW9ucyBhcyBhbnkpIH0pO1xuXHR9XG5cblx0LyoqXG5cdCAqIE1ha2VzIGEgcHJvY2VkdXJlIChQT1NUKSByZXF1ZXN0XG5cdCAqIEBwYXJhbSBuc2lkIE5hbWVzcGFjZSBJRCBvZiBhIHByb2NlZHVyZSBlbmRwb2ludFxuXHQgKiBAcGFyYW0gb3B0aW9ucyBPcHRpb25zIHRvIGluY2x1ZGUgbGlrZSBpbnB1dCBib2R5IG9yIHBhcmFtZXRlcnNcblx0ICogQHJldHVybnMgVGhlIHJlc3BvbnNlIG9mIHRoZSByZXF1ZXN0XG5cdCAqL1xuXHRjYWxsPEsgZXh0ZW5kcyBrZXlvZiBQcm9jZWR1cmVzPihcblx0XHRuc2lkOiBLLFxuXHRcdG9wdGlvbnM6IFJQQ09wdGlvbnM8UHJvY2VkdXJlc1tLXT4sXG5cdCk6IFByb21pc2U8WFJQQ1Jlc3BvbnNlPE91dHB1dE9mPFByb2NlZHVyZXNbS10+Pj4ge1xuXHRcdHJldHVybiB0aGlzLnJlcXVlc3QoeyB0eXBlOiAncG9zdCcsIG5zaWQ6IG5zaWQsIC4uLihvcHRpb25zIGFzIGFueSkgfSk7XG5cdH1cblxuXHQvKiogTWFrZXMgYSByZXF1ZXN0IHRvIHRoZSBYUlBDIHNlcnZpY2UgKi9cblx0YXN5bmMgcmVxdWVzdChvcHRpb25zOiBYUlBDUmVxdWVzdE9wdGlvbnMpOiBQcm9taXNlPFhSUENSZXNwb25zZT4ge1xuXHRcdGNvbnN0IGRhdGEgPSBvcHRpb25zLmRhdGE7XG5cblx0XHRjb25zdCB1cmwgPSBgL3hycGMvJHtvcHRpb25zLm5zaWR9YCArIGNvbnN0cnVjdFNlYXJjaFBhcmFtcyhvcHRpb25zLnBhcmFtcyk7XG5cdFx0Y29uc3QgaXNJbnB1dEpzb24gPSBpc0pzb25WYWx1ZShkYXRhKTtcblxuXHRcdGNvbnN0IHJlc3BvbnNlID0gYXdhaXQgdGhpcy5oYW5kbGUodXJsLCB7XG5cdFx0XHRtZXRob2Q6IG9wdGlvbnMudHlwZSxcblx0XHRcdHNpZ25hbDogb3B0aW9ucy5zaWduYWwsXG5cdFx0XHRib2R5OiBpc0lucHV0SnNvbiA/IEpTT04uc3RyaW5naWZ5KGRhdGEpIDogZGF0YSxcblx0XHRcdGhlYWRlcnM6IG1lcmdlSGVhZGVycyhvcHRpb25zLmhlYWRlcnMsIHtcblx0XHRcdFx0J2NvbnRlbnQtdHlwZSc6IGlzSW5wdXRKc29uID8gJ2FwcGxpY2F0aW9uL2pzb24nIDogbnVsbCxcblx0XHRcdFx0J2F0cHJvdG8tcHJveHknOiBjb25zdHJ1Y3RQcm94eUhlYWRlcih0aGlzLnByb3h5KSxcblx0XHRcdH0pLFxuXHRcdH0pO1xuXG5cdFx0Y29uc3QgcmVzcG9uc2VTdGF0dXMgPSByZXNwb25zZS5zdGF0dXM7XG5cdFx0Y29uc3QgcmVzcG9uc2VIZWFkZXJzID0gT2JqZWN0LmZyb21FbnRyaWVzKHJlc3BvbnNlLmhlYWRlcnMpO1xuXHRcdGNvbnN0IHJlc3BvbnNlVHlwZSA9IHJlc3BvbnNlSGVhZGVyc1snY29udGVudC10eXBlJ107XG5cblx0XHRsZXQgcHJvbWlzZTogUHJvbWlzZTx1bmtub3duPiB8IHVuZGVmaW5lZDtcblx0XHRsZXQgcmV0OiB1bmtub3duO1xuXG5cdFx0aWYgKHJlc3BvbnNlVHlwZSkge1xuXHRcdFx0aWYgKHJlc3BvbnNlVHlwZS5zdGFydHNXaXRoKCdhcHBsaWNhdGlvbi9qc29uJykpIHtcblx0XHRcdFx0cHJvbWlzZSA9IHJlc3BvbnNlLmpzb24oKTtcblx0XHRcdH0gZWxzZSBpZiAocmVzcG9uc2VUeXBlLnN0YXJ0c1dpdGgoJ3RleHQvJykpIHtcblx0XHRcdFx0cHJvbWlzZSA9IHJlc3BvbnNlLnRleHQoKTtcblx0XHRcdH1cblx0XHR9XG5cblx0XHR0cnkge1xuXHRcdFx0cmV0ID0gYXdhaXQgKHByb21pc2UgfHwgcmVzcG9uc2UuYXJyYXlCdWZmZXIoKS50aGVuKChidWZmZXIpID0+IG5ldyBVaW50OEFycmF5KGJ1ZmZlcikpKTtcblx0XHR9IGNhdGNoIChlcnIpIHtcblx0XHRcdHRocm93IG5ldyBYUlBDRXJyb3IoMiwge1xuXHRcdFx0XHRjYXVzZTogZXJyLFxuXHRcdFx0XHRraW5kOiAnSW52YWxpZFJlc3BvbnNlJyxcblx0XHRcdFx0ZGVzY3JpcHRpb246IGBGYWlsZWQgdG8gcGFyc2UgcmVzcG9uc2UgYm9keWAsXG5cdFx0XHRcdGhlYWRlcnM6IHJlc3BvbnNlSGVhZGVycyxcblx0XHRcdH0pO1xuXHRcdH1cblxuXHRcdGlmIChyZXNwb25zZVN0YXR1cyA9PT0gMjAwKSB7XG5cdFx0XHRyZXR1cm4ge1xuXHRcdFx0XHRkYXRhOiByZXQsXG5cdFx0XHRcdGhlYWRlcnM6IHJlc3BvbnNlSGVhZGVycyxcblx0XHRcdH07XG5cdFx0fVxuXG5cdFx0aWYgKGlzRXJyb3JSZXNwb25zZShyZXQpKSB7XG5cdFx0XHR0aHJvdyBuZXcgWFJQQ0Vycm9yKHJlc3BvbnNlU3RhdHVzLCB7XG5cdFx0XHRcdGtpbmQ6IHJldC5lcnJvcixcblx0XHRcdFx0ZGVzY3JpcHRpb246IHJldC5tZXNzYWdlLFxuXHRcdFx0XHRoZWFkZXJzOiByZXNwb25zZUhlYWRlcnMsXG5cdFx0XHR9KTtcblx0XHR9XG5cblx0XHR0aHJvdyBuZXcgWFJQQ0Vycm9yKHJlc3BvbnNlU3RhdHVzLCB7IGhlYWRlcnM6IHJlc3BvbnNlSGVhZGVycyB9KTtcblx0fVxufVxuXG5jb25zdCBjb25zdHJ1Y3RQcm94eUhlYWRlciA9IChwcm94eTogWFJQQ1Byb3h5T3B0aW9ucyB8IHVuZGVmaW5lZCk6IHN0cmluZyB8IG51bGwgPT4ge1xuXHRpZiAocHJveHkpIHtcblx0XHRyZXR1cm4gYCR7cHJveHkuc2VydmljZX0jJHtwcm94eS50eXBlfWA7XG5cdH1cblxuXHRyZXR1cm4gbnVsbDtcbn07XG5cbmNvbnN0IGNvbnN0cnVjdFNlYXJjaFBhcmFtcyA9IChwYXJhbXM6IFJlY29yZDxzdHJpbmcsIHVua25vd24+IHwgdW5kZWZpbmVkKTogc3RyaW5nID0+IHtcblx0bGV0IHNlYXJjaFBhcmFtczogVVJMU2VhcmNoUGFyYW1zIHwgdW5kZWZpbmVkO1xuXG5cdGZvciAoY29uc3Qga2V5IGluIHBhcmFtcykge1xuXHRcdGNvbnN0IHZhbHVlID0gcGFyYW1zW2tleV07XG5cblx0XHRpZiAodmFsdWUgIT09IHVuZGVmaW5lZCkge1xuXHRcdFx0c2VhcmNoUGFyYW1zID8/PSBuZXcgVVJMU2VhcmNoUGFyYW1zKCk7XG5cblx0XHRcdGlmIChBcnJheS5pc0FycmF5KHZhbHVlKSkge1xuXHRcdFx0XHRmb3IgKGxldCBpZHggPSAwLCBsZW4gPSB2YWx1ZS5sZW5ndGg7IGlkeCA8IGxlbjsgaWR4KyspIHtcblx0XHRcdFx0XHRjb25zdCB2YWwgPSB2YWx1ZVtpZHhdO1xuXHRcdFx0XHRcdHNlYXJjaFBhcmFtcy5hcHBlbmQoa2V5LCAnJyArIHZhbCk7XG5cdFx0XHRcdH1cblx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdHNlYXJjaFBhcmFtcy5zZXQoa2V5LCAnJyArIHZhbHVlKTtcblx0XHRcdH1cblx0XHR9XG5cdH1cblxuXHRyZXR1cm4gc2VhcmNoUGFyYW1zID8gYD9gICsgc2VhcmNoUGFyYW1zLnRvU3RyaW5nKCkgOiAnJztcbn07XG5cbmNvbnN0IGlzSnNvblZhbHVlID0gKG86IHVua25vd24pOiBvIGlzIFJlY29yZDxzdHJpbmcsIHVua25vd24+ID0+IHtcblx0aWYgKHR5cGVvZiBvICE9PSAnb2JqZWN0JyB8fCBvID09PSBudWxsKSB7XG5cdFx0cmV0dXJuIGZhbHNlO1xuXHR9XG5cblx0aWYgKCd0b0pTT04nIGluIG8pIHtcblx0XHRyZXR1cm4gdHJ1ZTtcblx0fVxuXG5cdGNvbnN0IHByb3RvID0gT2JqZWN0LmdldFByb3RvdHlwZU9mKG8pO1xuXHRyZXR1cm4gcHJvdG8gPT09IG51bGwgfHwgcHJvdG8gPT09IE9iamVjdC5wcm90b3R5cGU7XG59O1xuXG5jb25zdCBpc0Vycm9yUmVzcG9uc2UgPSAodmFsdWU6IGFueSk6IHZhbHVlIGlzIEVycm9yUmVzcG9uc2VCb2R5ID0+IHtcblx0aWYgKHR5cGVvZiB2YWx1ZSAhPT0gJ29iamVjdCcgfHwgdmFsdWUgPT09IG51bGwpIHtcblx0XHRyZXR1cm4gZmFsc2U7XG5cdH1cblxuXHRjb25zdCBraW5kVHlwZSA9IHR5cGVvZiB2YWx1ZS5lcnJvcjtcblx0Y29uc3QgbWVzc2FnZVR5cGUgPSB0eXBlb2YgdmFsdWUubWVzc2FnZTtcblxuXHRyZXR1cm4gKFxuXHRcdChraW5kVHlwZSA9PT0gJ3VuZGVmaW5lZCcgfHwga2luZFR5cGUgPT09ICdzdHJpbmcnKSAmJlxuXHRcdChtZXNzYWdlVHlwZSA9PT0gJ3VuZGVmaW5lZCcgfHwgbWVzc2FnZVR5cGUgPT09ICdzdHJpbmcnKVxuXHQpO1xufTtcblxuaW50ZXJmYWNlIEVycm9yUmVzcG9uc2VCb2R5IHtcblx0ZXJyb3I/OiBzdHJpbmc7XG5cdG1lc3NhZ2U/OiBzdHJpbmc7XG59XG5cbmV4cG9ydCBjb25zdCBjbG9uZSA9IChycGM6IFhSUEMpOiBYUlBDID0+IHtcblx0cmV0dXJuIG5ldyBYUlBDKHsgaGFuZGxlcjogcnBjLmhhbmRsZSwgcHJveHk6IHJwYy5wcm94eSB9KTtcbn07XG5cbmV4cG9ydCBjb25zdCB3aXRoUHJveHkgPSAocnBjOiBYUlBDLCBvcHRpb25zOiBYUlBDUHJveHlPcHRpb25zKSA9PiB7XG5cdHJldHVybiBuZXcgWFJQQyh7IGhhbmRsZXI6IHJwYy5oYW5kbGUsIHByb3h5OiBvcHRpb25zIH0pO1xufTtcbiIsICIvKipcbiAqIEBtb2R1bGVcbiAqIERJRCBkb2N1bWVudC1yZWxhdGVkIGZ1bmN0aW9uYWxpdGllcy5cbiAqIFRoaXMgbW9kdWxlIGlzIGV4cG9ydGVkIGZvciBjb252ZW5pZW5jZSBhbmQgaXMgbm8gd2F5IHBhcnQgb2YgcHVibGljIEFQSSxcbiAqIGl0IGNhbiBiZSByZW1vdmVkIGF0IGFueSB0aW1lLlxuICovXG5cbi8qKlxuICogUmV0cmlldmVzIEFUIFByb3RvY29sIFBEUyBlbmRwb2ludCBmcm9tIHRoZSBESUQgZG9jdW1lbnQsIGlmIGF2YWlsYWJsZVxuICogQHBhcmFtIGRvYyBESUQgZG9jdW1lbnRcbiAqIEByZXR1cm5zIFRoZSBQRFMgZW5kcG9pbnQsIGlmIGF2YWlsYWJsZVxuICovXG5leHBvcnQgY29uc3QgZ2V0UGRzRW5kcG9pbnQgPSAoZG9jOiBEaWREb2N1bWVudCk6IHN0cmluZyB8IHVuZGVmaW5lZCA9PiB7XG5cdHJldHVybiBnZXRTZXJ2aWNlRW5kcG9pbnQoZG9jLCAnI2F0cHJvdG9fcGRzJywgJ0F0cHJvdG9QZXJzb25hbERhdGFTZXJ2ZXInKTtcbn07XG5cbi8qKlxuICogUmV0cmlldmUgYSBzZXJ2aWNlIGVuZHBvaW50IGZyb20gdGhlIERJRCBkb2N1bWVudCwgaWYgYXZhaWxhYmxlXG4gKiBAcGFyYW0gZG9jIERJRCBkb2N1bWVudFxuICogQHBhcmFtIHNlcnZpY2VJZCBTZXJ2aWNlIElEXG4gKiBAcGFyYW0gc2VydmljZVR5cGUgU2VydmljZSB0eXBlXG4gKiBAcmV0dXJucyBUaGUgcmVxdWVzdGVkIHNlcnZpY2UgZW5kcG9pbnQsIGlmIGF2YWlsYWJsZVxuICovXG5leHBvcnQgY29uc3QgZ2V0U2VydmljZUVuZHBvaW50ID0gKFxuXHRkb2M6IERpZERvY3VtZW50LFxuXHRzZXJ2aWNlSWQ6IHN0cmluZyxcblx0c2VydmljZVR5cGU6IHN0cmluZyxcbik6IHN0cmluZyB8IHVuZGVmaW5lZCA9PiB7XG5cdGNvbnN0IGRpZCA9IGRvYy5pZDtcblxuXHRjb25zdCBkaWRTZXJ2aWNlSWQgPSBkaWQgKyBzZXJ2aWNlSWQ7XG5cdGNvbnN0IGZvdW5kID0gZG9jLnNlcnZpY2U/LmZpbmQoKHNlcnZpY2UpID0+IHNlcnZpY2UuaWQgPT09IHNlcnZpY2VJZCB8fCBzZXJ2aWNlLmlkID09PSBkaWRTZXJ2aWNlSWQpO1xuXG5cdGlmICghZm91bmQgfHwgZm91bmQudHlwZSAhPT0gc2VydmljZVR5cGUgfHwgdHlwZW9mIGZvdW5kLnNlcnZpY2VFbmRwb2ludCAhPT0gJ3N0cmluZycpIHtcblx0XHRyZXR1cm4gdW5kZWZpbmVkO1xuXHR9XG5cblx0cmV0dXJuIHZhbGlkYXRlVXJsKGZvdW5kLnNlcnZpY2VFbmRwb2ludCk7XG59O1xuXG5jb25zdCB2YWxpZGF0ZVVybCA9ICh1cmxTdHI6IHN0cmluZyk6IHN0cmluZyB8IHVuZGVmaW5lZCA9PiB7XG5cdGxldCB1cmw7XG5cdHRyeSB7XG5cdFx0dXJsID0gbmV3IFVSTCh1cmxTdHIpO1xuXHR9IGNhdGNoIHtcblx0XHRyZXR1cm4gdW5kZWZpbmVkO1xuXHR9XG5cblx0Y29uc3QgcHJvdG8gPSB1cmwucHJvdG9jb2w7XG5cblx0aWYgKHVybC5ob3N0bmFtZSAmJiAocHJvdG8gPT09ICdodHRwOicgfHwgcHJvdG8gPT09ICdodHRwczonKSkge1xuXHRcdHJldHVybiB1cmxTdHI7XG5cdH1cbn07XG5cbi8qKlxuICogRElEIGRvY3VtZW50XG4gKi9cbmV4cG9ydCBpbnRlcmZhY2UgRGlkRG9jdW1lbnQge1xuXHRpZDogc3RyaW5nO1xuXHRhbHNvS25vd25Bcz86IHN0cmluZ1tdO1xuXHR2ZXJpZmljYXRpb25NZXRob2Q/OiBBcnJheTx7XG5cdFx0aWQ6IHN0cmluZztcblx0XHR0eXBlOiBzdHJpbmc7XG5cdFx0Y29udHJvbGxlcjogc3RyaW5nO1xuXHRcdHB1YmxpY0tleU11bHRpYmFzZT86IHN0cmluZztcblx0fT47XG5cdHNlcnZpY2U/OiBBcnJheTx7XG5cdFx0aWQ6IHN0cmluZztcblx0XHR0eXBlOiBzdHJpbmc7XG5cdFx0c2VydmljZUVuZHBvaW50OiBzdHJpbmcgfCBSZWNvcmQ8c3RyaW5nLCB1bmtub3duPjtcblx0fT47XG59XG4iLCAiLyoqXG4gKiBAbW9kdWxlXG4gKiBKV1QgZGVjb2RpbmcgdXRpbGl0aWVzIGZvciBzZXNzaW9uIHJlc3VtcHRpb24gY2hlY2tzLlxuICogVGhpcyBtb2R1bGUgaXMgZXhwb3J0ZWQgZm9yIGNvbnZlbmllbmNlIGFuZCBpcyBubyB3YXkgcGFydCBvZiBwdWJsaWMgQVBJLFxuICogaXQgY2FuIGJlIHJlbW92ZWQgYXQgYW55IHRpbWUuXG4gKi9cblxuLyoqXG4gKiBEZWNvZGVzIGEgSldUIHRva2VuXG4gKiBAcGFyYW0gdG9rZW4gVGhlIHRva2VuIHN0cmluZ1xuICogQHJldHVybnMgSlNPTiBvYmplY3QgZnJvbSB0aGUgdG9rZW5cbiAqL1xuZXhwb3J0IGNvbnN0IGRlY29kZUp3dCA9ICh0b2tlbjogc3RyaW5nKTogdW5rbm93biA9PiB7XG5cdGNvbnN0IHBvcyA9IDE7XG5cdGNvbnN0IHBhcnQgPSB0b2tlbi5zcGxpdCgnLicpWzFdO1xuXG5cdGxldCBkZWNvZGVkOiBzdHJpbmc7XG5cblx0aWYgKHR5cGVvZiBwYXJ0ICE9PSAnc3RyaW5nJykge1xuXHRcdHRocm93IG5ldyBFcnJvcignaW52YWxpZCB0b2tlbjogbWlzc2luZyBwYXJ0ICcgKyAocG9zICsgMSkpO1xuXHR9XG5cblx0dHJ5IHtcblx0XHRkZWNvZGVkID0gYmFzZTY0VXJsRGVjb2RlKHBhcnQpO1xuXHR9IGNhdGNoIChlKSB7XG5cdFx0dGhyb3cgbmV3IEVycm9yKCdpbnZhbGlkIHRva2VuOiBpbnZhbGlkIGI2NCBmb3IgcGFydCAnICsgKHBvcyArIDEpICsgJyAoJyArIChlIGFzIEVycm9yKS5tZXNzYWdlICsgJyknKTtcblx0fVxuXG5cdHRyeSB7XG5cdFx0cmV0dXJuIEpTT04ucGFyc2UoZGVjb2RlZCk7XG5cdH0gY2F0Y2ggKGUpIHtcblx0XHR0aHJvdyBuZXcgRXJyb3IoJ2ludmFsaWQgdG9rZW46IGludmFsaWQganNvbiBmb3IgcGFydCAnICsgKHBvcyArIDEpICsgJyAoJyArIChlIGFzIEVycm9yKS5tZXNzYWdlICsgJyknKTtcblx0fVxufTtcblxuLyoqXG4gKiBEZWNvZGVzIGEgVVJMLXNhZmUgQmFzZTY0IHN0cmluZ1xuICogQHBhcmFtIHN0ciBVUkwtc2FmZSBCYXNlNjQgdGhhdCBuZWVkZWQgdG8gYmUgZGVjb2RlZFxuICogQHJldHVybnMgVGhlIGFjdHVhbCBzdHJpbmdcbiAqL1xuZXhwb3J0IGNvbnN0IGJhc2U2NFVybERlY29kZSA9IChzdHI6IHN0cmluZyk6IHN0cmluZyA9PiB7XG5cdGxldCBvdXRwdXQgPSBzdHIucmVwbGFjZSgvLS9nLCAnKycpLnJlcGxhY2UoL18vZywgJy8nKTtcblxuXHRzd2l0Y2ggKG91dHB1dC5sZW5ndGggJSA0KSB7XG5cdFx0Y2FzZSAwOlxuXHRcdFx0YnJlYWs7XG5cdFx0Y2FzZSAyOlxuXHRcdFx0b3V0cHV0ICs9ICc9PSc7XG5cdFx0XHRicmVhaztcblx0XHRjYXNlIDM6XG5cdFx0XHRvdXRwdXQgKz0gJz0nO1xuXHRcdFx0YnJlYWs7XG5cdFx0ZGVmYXVsdDpcblx0XHRcdHRocm93IG5ldyBFcnJvcignYmFzZTY0IHN0cmluZyBpcyBub3Qgb2YgdGhlIGNvcnJlY3QgbGVuZ3RoJyk7XG5cdH1cblxuXHR0cnkge1xuXHRcdHJldHVybiBiNjREZWNvZGVVbmljb2RlKG91dHB1dCk7XG5cdH0gY2F0Y2gge1xuXHRcdHJldHVybiBhdG9iKG91dHB1dCk7XG5cdH1cbn07XG5cbmNvbnN0IGI2NERlY29kZVVuaWNvZGUgPSAoc3RyOiBzdHJpbmcpOiBzdHJpbmcgPT4ge1xuXHRyZXR1cm4gZGVjb2RlVVJJQ29tcG9uZW50KFxuXHRcdGF0b2Ioc3RyKS5yZXBsYWNlKC8oLikvZywgKF9tLCBwKSA9PiB7XG5cdFx0XHRsZXQgY29kZSA9IHAuY2hhckNvZGVBdCgwKS50b1N0cmluZygxNikudG9VcHBlckNhc2UoKTtcblxuXHRcdFx0aWYgKGNvZGUubGVuZ3RoIDwgMikge1xuXHRcdFx0XHRjb2RlID0gJzAnICsgY29kZTtcblx0XHRcdH1cblxuXHRcdFx0cmV0dXJuICclJyArIGNvZGU7XG5cdFx0fSksXG5cdCk7XG59O1xuIiwgImltcG9ydCB0eXBlIHsgQXQsIENvbUF0cHJvdG9TZXJ2ZXJDcmVhdGVTZXNzaW9uIH0gZnJvbSAnLi9sZXhpY29ucy5qcyc7XG5cbmltcG9ydCB7IHNpbXBsZUZldGNoSGFuZGxlciwgdHlwZSBGZXRjaEhhbmRsZXJPYmplY3QgfSBmcm9tICcuL2ZldGNoLWhhbmRsZXIuanMnO1xuaW1wb3J0IHsgWFJQQywgWFJQQ0Vycm9yIH0gZnJvbSAnLi9ycGMuanMnO1xuXG5pbXBvcnQgeyBnZXRQZHNFbmRwb2ludCwgdHlwZSBEaWREb2N1bWVudCB9IGZyb20gJy4vdXRpbHMvZGlkLmpzJztcbmltcG9ydCB7IGRlY29kZUp3dCB9IGZyb20gJy4vdXRpbHMvand0LmpzJztcblxuLyoqIEludGVyZmFjZSBmb3IgdGhlIGRlY29kZWQgYWNjZXNzIHRva2VuLCBmb3IgY29udmVuaWVuY2UgKi9cbmV4cG9ydCBpbnRlcmZhY2UgQXRwQWNjZXNzSnd0IHtcblx0LyoqIEFjY2VzcyB0b2tlbiBzY29wZSwgYXBwIHBhc3N3b3JkIHJldHVybnMgYSBkaWZmZXJlbnQgc2NvcGUuICovXG5cdHNjb3BlOiAnY29tLmF0cHJvdG8uYWNjZXNzJyB8ICdjb20uYXRwcm90by5hcHBQYXNzJyB8ICdjb20uYXRwcm90by5hcHBQYXNzUHJpdmlsZWdlZCc7XG5cdC8qKiBBY2NvdW50IERJRCAqL1xuXHRzdWI6IEF0LkRJRDtcblx0LyoqIEV4cGlyYXRpb24gdGltZSAqL1xuXHRleHA6IG51bWJlcjtcblx0LyoqIENyZWF0aW9uL2lzc3VlZCB0aW1lICovXG5cdGlhdDogbnVtYmVyO1xufVxuXG4vKiogSW50ZXJmYWNlIGZvciB0aGUgZGVjb2RlZCByZWZyZXNoIHRva2VuLCBmb3IgY29udmVuaWVuY2UgKi9cbmV4cG9ydCBpbnRlcmZhY2UgQXRwUmVmcmVzaEp3dCB7XG5cdC8qKiBSZWZyZXNoIHRva2VuIHNjb3BlICovXG5cdHNjb3BlOiAnY29tLmF0cHJvdG8ucmVmcmVzaCc7XG5cdC8qKiBJRCBvZiB0aGlzIHJlZnJlc2ggdG9rZW4gKi9cblx0anRpOiBzdHJpbmc7XG5cdC8qKiBBY2NvdW50IERJRCAqL1xuXHRzdWI6IEF0LkRJRDtcblx0LyoqIEludGVuZGVkIGF1ZGllbmNlIG9mIHRoaXMgcmVmcmVzaCB0b2tlbiwgaW4gRElEICovXG5cdGF1ZDogQXQuRElEO1xuXHQvKiogRXhwaXJhdGlvbiB0aW1lICovXG5cdGV4cDogbnVtYmVyO1xuXHQvKiogQ3JlYXRpb24vaXNzdWVkIHRpbWUgKi9cblx0aWF0OiBudW1iZXI7XG59XG5cbi8qKiBTYXZlZCBzZXNzaW9uIGRhdGEsIHRoaXMgY2FuIGJlIHJldXNlZCBhZ2FpbiBmb3IgbmV4dCB0aW1lLiAqL1xuZXhwb3J0IGludGVyZmFjZSBBdHBTZXNzaW9uRGF0YSB7XG5cdC8qKiBSZWZyZXNoIHRva2VuICovXG5cdHJlZnJlc2hKd3Q6IHN0cmluZztcblx0LyoqIEFjY2VzcyB0b2tlbiAqL1xuXHRhY2Nlc3NKd3Q6IHN0cmluZztcblx0LyoqIEFjY291bnQgaGFuZGxlICovXG5cdGhhbmRsZTogc3RyaW5nO1xuXHQvKiogQWNjb3VudCBESUQgKi9cblx0ZGlkOiBBdC5ESUQ7XG5cdC8qKiBQRFMgZW5kcG9pbnQgZm91bmQgaW4gdGhlIERJRCBkb2N1bWVudCwgdGhpcyB3aWxsIGJlIHVzZWQgYXMgdGhlIHNlcnZpY2UgVVJJIGlmIHByb3ZpZGVkICovXG5cdHBkc1VyaT86IHN0cmluZztcblx0LyoqIEVtYWlsIGFkZHJlc3Mgb2YgdGhlIGFjY291bnQsIG1pZ2h0IG5vdCBiZSBhdmFpbGFibGUgaWYgb24gYXBwIHBhc3N3b3JkICovXG5cdGVtYWlsPzogc3RyaW5nO1xuXHQvKiogSWYgdGhlIGVtYWlsIGFkZHJlc3MgaGFzIGJlZW4gY29uZmlybWVkIG9yIG5vdCAqL1xuXHRlbWFpbENvbmZpcm1lZD86IGJvb2xlYW47XG5cdC8qKiBJZiB0aGUgYWNjb3VudCBoYXMgZW1haWwtYmFzZWQgdHdvLWZhY3RvciBhdXRoZW50aWNhdGlvbiBlbmFibGVkICovXG5cdGVtYWlsQXV0aEZhY3Rvcj86IGJvb2xlYW47XG5cdC8qKiBXaGV0aGVyIHRoZSBhY2NvdW50IGlzIGFjdGl2ZSAobm90IGRlYWN0aXZhdGVkLCB0YWtlbiBkb3duLCBvciBzdXNwZW5kZWQpICovXG5cdGFjdGl2ZTogYm9vbGVhbjtcblx0LyoqIFBvc3NpYmxlIHJlYXNvbiBmb3Igd2h5IHRoZSBhY2NvdW50IGlzIGluYWN0aXZlICovXG5cdGluYWN0aXZlU3RhdHVzPzogc3RyaW5nO1xufVxuXG5leHBvcnQgaW50ZXJmYWNlIENyZWRlbnRpYWxNYW5hZ2VyT3B0aW9ucyB7XG5cdC8qKiBQRFMgc2VydmVyIFVSTCAqL1xuXHRzZXJ2aWNlOiBzdHJpbmc7XG5cblx0LyoqIEN1c3RvbSBmZXRjaCBmdW5jdGlvbiAqL1xuXHRmZXRjaD86IHR5cGVvZiBnbG9iYWxUaGlzLmZldGNoO1xuXG5cdC8qKiBGdW5jdGlvbiB0aGF0IGdldHMgY2FsbGVkIGlmIHRoZSBzZXNzaW9uIHR1cm5lZCBvdXQgdG8gaGF2ZSBleHBpcmVkIGR1cmluZyBhbiBYUlBDIHJlcXVlc3QgKi9cblx0b25FeHBpcmVkPzogKHNlc3Npb246IEF0cFNlc3Npb25EYXRhKSA9PiB2b2lkO1xuXHQvKiogRnVuY3Rpb24gdGhhdCBnZXRzIGNhbGxlZCBpZiB0aGUgc2Vzc2lvbiBoYXMgYmVlbiByZWZyZXNoZWQgZHVyaW5nIGFuIFhSUEMgcmVxdWVzdCAqL1xuXHRvblJlZnJlc2g/OiAoc2Vzc2lvbjogQXRwU2Vzc2lvbkRhdGEpID0+IHZvaWQ7XG5cdC8qKiBGdW5jdGlvbiB0aGF0IGdldHMgY2FsbGVkIGlmIHRoZSBzZXNzaW9uIG9iamVjdCBoYXMgYmVlbiByZWZyZXNoZWQgKi9cblx0b25TZXNzaW9uVXBkYXRlPzogKHNlc3Npb246IEF0cFNlc3Npb25EYXRhKSA9PiB2b2lkO1xufVxuXG5leHBvcnQgY2xhc3MgQ3JlZGVudGlhbE1hbmFnZXIgaW1wbGVtZW50cyBGZXRjaEhhbmRsZXJPYmplY3Qge1xuXHRyZWFkb25seSBzZXJ2aWNlVXJsOiBzdHJpbmc7XG5cdGZldGNoOiB0eXBlb2YgZmV0Y2g7XG5cblx0I3NlcnZlcjogWFJQQztcblx0I3JlZnJlc2hTZXNzaW9uUHJvbWlzZTogUHJvbWlzZTx2b2lkPiB8IHVuZGVmaW5lZDtcblxuXHQjb25FeHBpcmVkOiBDcmVkZW50aWFsTWFuYWdlck9wdGlvbnNbJ29uRXhwaXJlZCddO1xuXHQjb25SZWZyZXNoOiBDcmVkZW50aWFsTWFuYWdlck9wdGlvbnNbJ29uUmVmcmVzaCddO1xuXHQjb25TZXNzaW9uVXBkYXRlOiBDcmVkZW50aWFsTWFuYWdlck9wdGlvbnNbJ29uU2Vzc2lvblVwZGF0ZSddO1xuXG5cdC8qKiBDdXJyZW50IHNlc3Npb24gc3RhdGUgKi9cblx0c2Vzc2lvbj86IEF0cFNlc3Npb25EYXRhO1xuXG5cdGNvbnN0cnVjdG9yKHtcblx0XHRzZXJ2aWNlLFxuXHRcdG9uRXhwaXJlZCxcblx0XHRvblJlZnJlc2gsXG5cdFx0b25TZXNzaW9uVXBkYXRlLFxuXHRcdGZldGNoOiBfZmV0Y2ggPSBmZXRjaCxcblx0fTogQ3JlZGVudGlhbE1hbmFnZXJPcHRpb25zKSB7XG5cdFx0dGhpcy5zZXJ2aWNlVXJsID0gc2VydmljZTtcblx0XHR0aGlzLmZldGNoID0gX2ZldGNoO1xuXG5cdFx0dGhpcy4jc2VydmVyID0gbmV3IFhSUEMoeyBoYW5kbGVyOiBzaW1wbGVGZXRjaEhhbmRsZXIoeyBzZXJ2aWNlOiBzZXJ2aWNlLCBmZXRjaDogX2ZldGNoIH0pIH0pO1xuXG5cdFx0dGhpcy4jb25SZWZyZXNoID0gb25SZWZyZXNoO1xuXHRcdHRoaXMuI29uRXhwaXJlZCA9IG9uRXhwaXJlZDtcblx0XHR0aGlzLiNvblNlc3Npb25VcGRhdGUgPSBvblNlc3Npb25VcGRhdGU7XG5cdH1cblxuXHRnZXQgZGlzcGF0Y2hVcmwoKSB7XG5cdFx0cmV0dXJuIHRoaXMuc2Vzc2lvbj8ucGRzVXJpID8/IHRoaXMuc2VydmljZVVybDtcblx0fVxuXG5cdGFzeW5jIGhhbmRsZShwYXRobmFtZTogc3RyaW5nLCBpbml0OiBSZXF1ZXN0SW5pdCk6IFByb21pc2U8UmVzcG9uc2U+IHtcblx0XHRhd2FpdCB0aGlzLiNyZWZyZXNoU2Vzc2lvblByb21pc2U7XG5cblx0XHRjb25zdCB1cmwgPSBuZXcgVVJMKHBhdGhuYW1lLCB0aGlzLmRpc3BhdGNoVXJsKTtcblx0XHRjb25zdCBoZWFkZXJzID0gbmV3IEhlYWRlcnMoaW5pdC5oZWFkZXJzKTtcblxuXHRcdGlmICghdGhpcy5zZXNzaW9uIHx8IGhlYWRlcnMuaGFzKCdhdXRob3JpemF0aW9uJykpIHtcblx0XHRcdHJldHVybiAoMCwgdGhpcy5mZXRjaCkodXJsLCBpbml0KTtcblx0XHR9XG5cblx0XHRoZWFkZXJzLnNldCgnYXV0aG9yaXphdGlvbicsIGBCZWFyZXIgJHt0aGlzLnNlc3Npb24uYWNjZXNzSnd0fWApO1xuXG5cdFx0Y29uc3QgaW5pdGlhbFJlc3BvbnNlID0gYXdhaXQgKDAsIHRoaXMuZmV0Y2gpKHVybCwgeyAuLi5pbml0LCBoZWFkZXJzIH0pO1xuXHRcdGNvbnN0IGlzRXhwaXJlZCA9IGF3YWl0IGlzRXhwaXJlZFRva2VuUmVzcG9uc2UoaW5pdGlhbFJlc3BvbnNlKTtcblxuXHRcdGlmICghaXNFeHBpcmVkKSB7XG5cdFx0XHRyZXR1cm4gaW5pdGlhbFJlc3BvbnNlO1xuXHRcdH1cblxuXHRcdHRyeSB7XG5cdFx0XHRhd2FpdCB0aGlzLiNyZWZyZXNoU2Vzc2lvbigpO1xuXHRcdH0gY2F0Y2gge1xuXHRcdFx0cmV0dXJuIGluaXRpYWxSZXNwb25zZTtcblx0XHR9XG5cblx0XHQvLyBSZXR1cm4gaW5pdGlhbCByZXNwb25zZSBpZjpcblx0XHQvLyAtIHJlZnJlc2hTZXNzaW9uIHJldHVybnMgZXhwaXJlZFxuXHRcdC8vIC0gQm9keSBzdHJlYW0gaGFzIGJlZW4gY29uc3VtZWRcblx0XHRpZiAoIXRoaXMuc2Vzc2lvbiB8fCBpbml0LmJvZHkgaW5zdGFuY2VvZiBSZWFkYWJsZVN0cmVhbSkge1xuXHRcdFx0cmV0dXJuIGluaXRpYWxSZXNwb25zZTtcblx0XHR9XG5cblx0XHRoZWFkZXJzLnNldCgnYXV0aG9yaXphdGlvbicsIGBCZWFyZXIgJHt0aGlzLnNlc3Npb24uYWNjZXNzSnd0fWApO1xuXG5cdFx0cmV0dXJuIGF3YWl0ICgwLCB0aGlzLmZldGNoKSh1cmwsIHsgLi4uaW5pdCwgaGVhZGVycyB9KTtcblx0fVxuXG5cdCNyZWZyZXNoU2Vzc2lvbigpIHtcblx0XHRyZXR1cm4gKHRoaXMuI3JlZnJlc2hTZXNzaW9uUHJvbWlzZSB8fD0gdGhpcy4jcmVmcmVzaFNlc3Npb25Jbm5lcigpLmZpbmFsbHkoXG5cdFx0XHQoKSA9PiAodGhpcy4jcmVmcmVzaFNlc3Npb25Qcm9taXNlID0gdW5kZWZpbmVkKSxcblx0XHQpKTtcblx0fVxuXG5cdGFzeW5jICNyZWZyZXNoU2Vzc2lvbklubmVyKCk6IFByb21pc2U8dm9pZD4ge1xuXHRcdGNvbnN0IGN1cnJlbnRTZXNzaW9uID0gdGhpcy5zZXNzaW9uO1xuXG5cdFx0aWYgKCFjdXJyZW50U2Vzc2lvbikge1xuXHRcdFx0cmV0dXJuO1xuXHRcdH1cblxuXHRcdHRyeSB7XG5cdFx0XHRjb25zdCB7IGRhdGEgfSA9IGF3YWl0IHRoaXMuI3NlcnZlci5jYWxsKCdjb20uYXRwcm90by5zZXJ2ZXIucmVmcmVzaFNlc3Npb24nLCB7XG5cdFx0XHRcdGhlYWRlcnM6IHtcblx0XHRcdFx0XHRhdXRob3JpemF0aW9uOiBgQmVhcmVyICR7Y3VycmVudFNlc3Npb24ucmVmcmVzaEp3dH1gLFxuXHRcdFx0XHR9LFxuXHRcdFx0fSk7XG5cblx0XHRcdHRoaXMuI3VwZGF0ZVNlc3Npb24oeyAuLi5jdXJyZW50U2Vzc2lvbiwgLi4uZGF0YSB9KTtcblx0XHRcdHRoaXMuI29uUmVmcmVzaD8uKHRoaXMuc2Vzc2lvbiEpO1xuXHRcdH0gY2F0Y2ggKGVycikge1xuXHRcdFx0aWYgKGVyciBpbnN0YW5jZW9mIFhSUENFcnJvcikge1xuXHRcdFx0XHRjb25zdCBraW5kID0gZXJyLmtpbmQ7XG5cblx0XHRcdFx0aWYgKGtpbmQgPT09ICdFeHBpcmVkVG9rZW4nIHx8IGtpbmQgPT09ICdJbnZhbGlkVG9rZW4nKSB7XG5cdFx0XHRcdFx0dGhpcy5zZXNzaW9uID0gdW5kZWZpbmVkO1xuXHRcdFx0XHRcdHRoaXMuI29uRXhwaXJlZD8uKGN1cnJlbnRTZXNzaW9uKTtcblx0XHRcdFx0fVxuXHRcdFx0fVxuXHRcdH1cblx0fVxuXG5cdCN1cGRhdGVTZXNzaW9uKHJhdzogQ29tQXRwcm90b1NlcnZlckNyZWF0ZVNlc3Npb24uT3V0cHV0KTogQXRwU2Vzc2lvbkRhdGEge1xuXHRcdGNvbnN0IGRpZERvYyA9IHJhdy5kaWREb2MgYXMgRGlkRG9jdW1lbnQgfCB1bmRlZmluZWQ7XG5cblx0XHRsZXQgcGRzVXJpOiBzdHJpbmcgfCB1bmRlZmluZWQ7XG5cdFx0aWYgKGRpZERvYykge1xuXHRcdFx0cGRzVXJpID0gZ2V0UGRzRW5kcG9pbnQoZGlkRG9jKTtcblx0XHR9XG5cblx0XHRjb25zdCBuZXdTZXNzaW9uID0ge1xuXHRcdFx0YWNjZXNzSnd0OiByYXcuYWNjZXNzSnd0LFxuXHRcdFx0cmVmcmVzaEp3dDogcmF3LnJlZnJlc2hKd3QsXG5cdFx0XHRoYW5kbGU6IHJhdy5oYW5kbGUsXG5cdFx0XHRkaWQ6IHJhdy5kaWQsXG5cdFx0XHRwZHNVcmk6IHBkc1VyaSxcblx0XHRcdGVtYWlsOiByYXcuZW1haWwsXG5cdFx0XHRlbWFpbENvbmZpcm1lZDogcmF3LmVtYWlsQ29uZmlybWVkLFxuXHRcdFx0ZW1haWxBdXRoRmFjdG9yOiByYXcuZW1haWxDb25maXJtZWQsXG5cdFx0XHRhY3RpdmU6IHJhdy5hY3RpdmUgPz8gdHJ1ZSxcblx0XHRcdGluYWN0aXZlU3RhdHVzOiByYXcuc3RhdHVzLFxuXHRcdH07XG5cblx0XHR0aGlzLnNlc3Npb24gPSBuZXdTZXNzaW9uO1xuXHRcdHRoaXMuI29uU2Vzc2lvblVwZGF0ZT8uKG5ld1Nlc3Npb24pO1xuXG5cdFx0cmV0dXJuIG5ld1Nlc3Npb247XG5cdH1cblxuXHQvKipcblx0ICogUmVzdW1lIGEgc2F2ZWQgc2Vzc2lvblxuXHQgKiBAcGFyYW0gc2Vzc2lvbiBTZXNzaW9uIGluZm9ybWF0aW9uLCB0YWtlbiBmcm9tIGBBdHBBdXRoI3Nlc3Npb25gIGFmdGVyIGxvZ2luXG5cdCAqL1xuXHRhc3luYyByZXN1bWUoc2Vzc2lvbjogQXRwU2Vzc2lvbkRhdGEpOiBQcm9taXNlPEF0cFNlc3Npb25EYXRhPiB7XG5cdFx0Y29uc3Qgbm93ID0gRGF0ZS5ub3coKSAvIDEwMDAgKyA2MCAqIDU7XG5cblx0XHRjb25zdCByZWZyZXNoVG9rZW4gPSBkZWNvZGVKd3Qoc2Vzc2lvbi5yZWZyZXNoSnd0KSBhcyBBdHBSZWZyZXNoSnd0O1xuXG5cdFx0aWYgKG5vdyA+PSByZWZyZXNoVG9rZW4uZXhwKSB7XG5cdFx0XHR0aHJvdyBuZXcgWFJQQ0Vycm9yKDQwMSwgeyBraW5kOiAnSW52YWxpZFRva2VuJyB9KTtcblx0XHR9XG5cblx0XHRjb25zdCBhY2Nlc3NUb2tlbiA9IGRlY29kZUp3dChzZXNzaW9uLmFjY2Vzc0p3dCkgYXMgQXRwQWNjZXNzSnd0O1xuXHRcdHRoaXMuc2Vzc2lvbiA9IHNlc3Npb247XG5cblx0XHRpZiAobm93ID49IGFjY2Vzc1Rva2VuLmV4cCkge1xuXHRcdFx0YXdhaXQgdGhpcy4jcmVmcmVzaFNlc3Npb24oKTtcblx0XHR9IGVsc2Uge1xuXHRcdFx0Y29uc3QgcHJvbWlzZSA9IHRoaXMuI3NlcnZlci5nZXQoJ2NvbS5hdHByb3RvLnNlcnZlci5nZXRTZXNzaW9uJywge1xuXHRcdFx0XHRoZWFkZXJzOiB7XG5cdFx0XHRcdFx0YXV0aG9yaXphdGlvbjogYEJlYXJlciAke3Nlc3Npb24uYWNjZXNzSnd0fWAsXG5cdFx0XHRcdH0sXG5cdFx0XHR9KTtcblxuXHRcdFx0cHJvbWlzZS50aGVuKChyZXNwb25zZSkgPT4ge1xuXHRcdFx0XHRjb25zdCBleGlzdGluZyA9IHRoaXMuc2Vzc2lvbjtcblx0XHRcdFx0Y29uc3QgbmV4dCA9IHJlc3BvbnNlLmRhdGE7XG5cblx0XHRcdFx0aWYgKCFleGlzdGluZykge1xuXHRcdFx0XHRcdHJldHVybjtcblx0XHRcdFx0fVxuXG5cdFx0XHRcdHRoaXMuI3VwZGF0ZVNlc3Npb24oeyAuLi5leGlzdGluZywgLi4ubmV4dCB9KTtcblx0XHRcdH0pO1xuXHRcdH1cblxuXHRcdGlmICghdGhpcy5zZXNzaW9uKSB7XG5cdFx0XHR0aHJvdyBuZXcgWFJQQ0Vycm9yKDQwMSwgeyBraW5kOiAnSW52YWxpZFRva2VuJyB9KTtcblx0XHR9XG5cblx0XHRyZXR1cm4gdGhpcy5zZXNzaW9uO1xuXHR9XG5cblx0LyoqXG5cdCAqIFBlcmZvcm0gYSBsb2dpbiBvcGVyYXRpb25cblx0ICogQHBhcmFtIG9wdGlvbnMgTG9naW4gb3B0aW9uc1xuXHQgKiBAcmV0dXJucyBTZXNzaW9uIGRhdGEgdGhhdCBjYW4gYmUgc2F2ZWQgZm9yIGxhdGVyXG5cdCAqL1xuXHRhc3luYyBsb2dpbihvcHRpb25zOiBBdXRoTG9naW5PcHRpb25zKTogUHJvbWlzZTxBdHBTZXNzaW9uRGF0YT4ge1xuXHRcdC8vIFJlc2V0IHRoZSBzZXNzaW9uXG5cdFx0dGhpcy5zZXNzaW9uID0gdW5kZWZpbmVkO1xuXG5cdFx0Y29uc3QgcmVzID0gYXdhaXQgdGhpcy4jc2VydmVyLmNhbGwoJ2NvbS5hdHByb3RvLnNlcnZlci5jcmVhdGVTZXNzaW9uJywge1xuXHRcdFx0ZGF0YToge1xuXHRcdFx0XHRpZGVudGlmaWVyOiBvcHRpb25zLmlkZW50aWZpZXIsXG5cdFx0XHRcdHBhc3N3b3JkOiBvcHRpb25zLnBhc3N3b3JkLFxuXHRcdFx0XHRhdXRoRmFjdG9yVG9rZW46IG9wdGlvbnMuY29kZSxcblx0XHRcdH0sXG5cdFx0fSk7XG5cblx0XHRyZXR1cm4gdGhpcy4jdXBkYXRlU2Vzc2lvbihyZXMuZGF0YSk7XG5cdH1cbn1cblxuLyoqIExvZ2luIG9wdGlvbnMgKi9cbmV4cG9ydCBpbnRlcmZhY2UgQXV0aExvZ2luT3B0aW9ucyB7XG5cdC8qKiBXaGF0IGFjY291bnQgdG8gbG9naW4gYXMsIHRoaXMgY291bGQgYmUgZG9tYWluIGhhbmRsZSwgRElELCBvciBlbWFpbCBhZGRyZXNzICovXG5cdGlkZW50aWZpZXI6IHN0cmluZztcblx0LyoqIEFjY291bnQgcGFzc3dvcmQgKi9cblx0cGFzc3dvcmQ6IHN0cmluZztcblx0LyoqIFR3by1mYWN0b3IgYXV0aGVudGljYXRpb24gY29kZSAqL1xuXHRjb2RlPzogc3RyaW5nO1xufVxuXG5jb25zdCBpc0V4cGlyZWRUb2tlblJlc3BvbnNlID0gYXN5bmMgKHJlc3BvbnNlOiBSZXNwb25zZSk6IFByb21pc2U8Ym9vbGVhbj4gPT4ge1xuXHRpZiAocmVzcG9uc2Uuc3RhdHVzICE9PSA0MDApIHtcblx0XHRyZXR1cm4gZmFsc2U7XG5cdH1cblxuXHRpZiAoZXh0cmFjdENvbnRlbnRUeXBlKHJlc3BvbnNlLmhlYWRlcnMpICE9PSAnYXBwbGljYXRpb24vanNvbicpIHtcblx0XHRyZXR1cm4gZmFsc2U7XG5cdH1cblxuXHQvLyB7XCJlcnJvclwiOlwiRXhwaXJlZFRva2VuXCIsXCJtZXNzYWdlXCI6XCJUb2tlbiBoYXMgZXhwaXJlZFwifVxuXHQvLyB7XCJlcnJvclwiOlwiRXhwaXJlZFRva2VuXCIsXCJtZXNzYWdlXCI6XCJUb2tlbiBpcyBleHBpcmVkXCJ9XG5cdGlmIChleHRyYWN0Q29udGVudExlbmd0aChyZXNwb25zZS5oZWFkZXJzKSA+IDU0ICogMS41KSB7XG5cdFx0cmV0dXJuIGZhbHNlO1xuXHR9XG5cblx0dHJ5IHtcblx0XHRjb25zdCB7IGVycm9yLCBtZXNzYWdlIH0gPSBhd2FpdCByZXNwb25zZS5jbG9uZSgpLmpzb24oKTtcblx0XHRyZXR1cm4gZXJyb3IgPT09ICdFeHBpcmVkVG9rZW4nICYmICh0eXBlb2YgbWVzc2FnZSA9PT0gJ3N0cmluZycgfHwgbWVzc2FnZSA9PT0gdW5kZWZpbmVkKTtcblx0fSBjYXRjaCB7fVxuXG5cdHJldHVybiBmYWxzZTtcbn07XG5cbmNvbnN0IGV4dHJhY3RDb250ZW50VHlwZSA9IChoZWFkZXJzOiBIZWFkZXJzKSA9PiB7XG5cdHJldHVybiBoZWFkZXJzLmdldCgnY29udGVudC10eXBlJyk/LnNwbGl0KCc7JylbMF0/LnRyaW0oKTtcbn07XG5jb25zdCBleHRyYWN0Q29udGVudExlbmd0aCA9IChoZWFkZXJzOiBIZWFkZXJzKSA9PiB7XG5cdHJldHVybiBOdW1iZXIoaGVhZGVycy5nZXQoJ2NvbnRlbnQtbGVuZ3RoJykgPz8gJzsnKTtcbn07XG4iLCBudWxsLCBudWxsLCBudWxsLCBudWxsLCBudWxsLCBudWxsLCBudWxsLCAiaW1wb3J0IHsgYWxsb2MsIGFsbG9jVW5zYWZlIH0gZnJvbSAnQGF0Y3V0ZS91aW50OGFycmF5JztcblxuZXhwb3J0IGNvbnN0IGNyZWF0ZVJmYzQ2NDhFbmNvZGUgPSAoYWxwaGFiZXQ6IHN0cmluZywgYml0c1BlckNoYXI6IG51bWJlciwgcGFkOiBib29sZWFuKSA9PiB7XG5cdHJldHVybiAoYnl0ZXM6IFVpbnQ4QXJyYXkpOiBzdHJpbmcgPT4ge1xuXHRcdGNvbnN0IG1hc2sgPSAoMSA8PCBiaXRzUGVyQ2hhcikgLSAxO1xuXHRcdGxldCBzdHIgPSAnJztcblxuXHRcdGxldCBiaXRzID0gMDsgLy8gTnVtYmVyIG9mIGJpdHMgY3VycmVudGx5IGluIHRoZSBidWZmZXJcblx0XHRsZXQgYnVmZmVyID0gMDsgLy8gQml0cyB3YWl0aW5nIHRvIGJlIHdyaXR0ZW4gb3V0LCBNU0IgZmlyc3Rcblx0XHRmb3IgKGxldCBpID0gMDsgaSA8IGJ5dGVzLmxlbmd0aDsgKytpKSB7XG5cdFx0XHQvLyBTbHVycCBkYXRhIGludG8gdGhlIGJ1ZmZlcjpcblx0XHRcdGJ1ZmZlciA9IChidWZmZXIgPDwgOCkgfCBieXRlc1tpXTtcblx0XHRcdGJpdHMgKz0gODtcblxuXHRcdFx0Ly8gV3JpdGUgb3V0IGFzIG11Y2ggYXMgd2UgY2FuOlxuXHRcdFx0d2hpbGUgKGJpdHMgPiBiaXRzUGVyQ2hhcikge1xuXHRcdFx0XHRiaXRzIC09IGJpdHNQZXJDaGFyO1xuXHRcdFx0XHRzdHIgKz0gYWxwaGFiZXRbbWFzayAmIChidWZmZXIgPj4gYml0cyldO1xuXHRcdFx0fVxuXHRcdH1cblxuXHRcdC8vIFBhcnRpYWwgY2hhcmFjdGVyOlxuXHRcdGlmIChiaXRzICE9PSAwKSB7XG5cdFx0XHRzdHIgKz0gYWxwaGFiZXRbbWFzayAmIChidWZmZXIgPDwgKGJpdHNQZXJDaGFyIC0gYml0cykpXTtcblx0XHR9XG5cblx0XHQvLyBBZGQgcGFkZGluZyBjaGFyYWN0ZXJzIHVudGlsIHdlIGhpdCBhIGJ5dGUgYm91bmRhcnk6XG5cdFx0aWYgKHBhZCkge1xuXHRcdFx0d2hpbGUgKCgoc3RyLmxlbmd0aCAqIGJpdHNQZXJDaGFyKSAmIDcpICE9PSAwKSB7XG5cdFx0XHRcdHN0ciArPSAnPSc7XG5cdFx0XHR9XG5cdFx0fVxuXG5cdFx0cmV0dXJuIHN0cjtcblx0fTtcbn07XG5cbmV4cG9ydCBjb25zdCBjcmVhdGVSZmM0NjQ4RGVjb2RlID0gKGFscGhhYmV0OiBzdHJpbmcsIGJpdHNQZXJDaGFyOiBudW1iZXIsIHBhZDogYm9vbGVhbikgPT4ge1xuXHQvLyBCdWlsZCB0aGUgY2hhcmFjdGVyIGxvb2t1cCB0YWJsZTpcblx0Y29uc3QgY29kZXM6IFJlY29yZDxzdHJpbmcsIG51bWJlcj4gPSB7fTtcblx0Zm9yIChsZXQgaSA9IDA7IGkgPCBhbHBoYWJldC5sZW5ndGg7ICsraSkge1xuXHRcdGNvZGVzW2FscGhhYmV0W2ldXSA9IGk7XG5cdH1cblxuXHRyZXR1cm4gKHN0cjogc3RyaW5nKSA9PiB7XG5cdFx0Ly8gQ291bnQgdGhlIHBhZGRpbmcgYnl0ZXM6XG5cdFx0bGV0IGVuZCA9IHN0ci5sZW5ndGg7XG5cdFx0d2hpbGUgKHBhZCAmJiBzdHJbZW5kIC0gMV0gPT09ICc9Jykge1xuXHRcdFx0LS1lbmQ7XG5cdFx0fVxuXG5cdFx0Ly8gQWxsb2NhdGUgdGhlIG91dHB1dDpcblx0XHRjb25zdCBieXRlcyA9IGFsbG9jVW5zYWZlKCgoZW5kICogYml0c1BlckNoYXIpIC8gOCkgfCAwKTtcblxuXHRcdC8vIFBhcnNlIHRoZSBkYXRhOlxuXHRcdGxldCBiaXRzID0gMDsgLy8gTnVtYmVyIG9mIGJpdHMgY3VycmVudGx5IGluIHRoZSBidWZmZXJcblx0XHRsZXQgYnVmZmVyID0gMDsgLy8gQml0cyB3YWl0aW5nIHRvIGJlIHdyaXR0ZW4gb3V0LCBNU0IgZmlyc3Rcblx0XHRsZXQgd3JpdHRlbiA9IDA7IC8vIE5leHQgYnl0ZSB0byB3cml0ZVxuXHRcdGZvciAobGV0IGkgPSAwOyBpIDwgZW5kOyArK2kpIHtcblx0XHRcdC8vIFJlYWQgb25lIGNoYXJhY3RlciBmcm9tIHRoZSBzdHJpbmc6XG5cdFx0XHRjb25zdCB2YWx1ZSA9IGNvZGVzW3N0cltpXV07XG5cdFx0XHRpZiAodmFsdWUgPT09IHVuZGVmaW5lZCkge1xuXHRcdFx0XHR0aHJvdyBuZXcgU3ludGF4RXJyb3IoYGludmFsaWQgYmFzZSBzdHJpbmdgKTtcblx0XHRcdH1cblxuXHRcdFx0Ly8gQXBwZW5kIHRoZSBiaXRzIHRvIHRoZSBidWZmZXI6XG5cdFx0XHRidWZmZXIgPSAoYnVmZmVyIDw8IGJpdHNQZXJDaGFyKSB8IHZhbHVlO1xuXHRcdFx0Yml0cyArPSBiaXRzUGVyQ2hhcjtcblxuXHRcdFx0Ly8gV3JpdGUgb3V0IHNvbWUgYml0cyBpZiB0aGUgYnVmZmVyIGhhcyBhIGJ5dGUncyB3b3J0aDpcblx0XHRcdGlmIChiaXRzID49IDgpIHtcblx0XHRcdFx0Yml0cyAtPSA4O1xuXHRcdFx0XHRieXRlc1t3cml0dGVuKytdID0gMHhmZiAmIChidWZmZXIgPj4gYml0cyk7XG5cdFx0XHR9XG5cdFx0fVxuXG5cdFx0Ly8gVmVyaWZ5IHRoYXQgd2UgaGF2ZSByZWNlaXZlZCBqdXN0IGVub3VnaCBiaXRzOlxuXHRcdGlmIChiaXRzID49IGJpdHNQZXJDaGFyIHx8ICgweGZmICYgKGJ1ZmZlciA8PCAoOCAtIGJpdHMpKSkgIT09IDApIHtcblx0XHRcdHRocm93IG5ldyBTeW50YXhFcnJvcigndW5leHBlY3RlZCBlbmQgb2YgZGF0YScpO1xuXHRcdH1cblxuXHRcdHJldHVybiBieXRlcztcblx0fTtcbn07XG5cbmV4cG9ydCBjb25zdCBjcmVhdGVCdGNCYXNlRW5jb2RlID0gKGFscGhhYmV0OiBzdHJpbmcpID0+IHtcblx0aWYgKGFscGhhYmV0Lmxlbmd0aCA+PSAyNTUpIHtcblx0XHR0aHJvdyBuZXcgUmFuZ2VFcnJvcihgYWxwaGFiZXQgdG9vIGxvbmdgKTtcblx0fVxuXG5cdGNvbnN0IEJBU0UgPSBhbHBoYWJldC5sZW5ndGg7XG5cdGNvbnN0IExFQURFUiA9IGFscGhhYmV0LmNoYXJBdCgwKTtcblx0Y29uc3QgaUZBQ1RPUiA9IE1hdGgubG9nKDI1NikgLyBNYXRoLmxvZyhCQVNFKTsgLy8gbG9nKDI1NikgLyBsb2coQkFTRSksIHJvdW5kZWQgdXBcblxuXHRyZXR1cm4gKHNvdXJjZTogVWludDhBcnJheSk6IHN0cmluZyA9PiB7XG5cdFx0aWYgKHNvdXJjZS5sZW5ndGggPT09IDApIHtcblx0XHRcdHJldHVybiAnJztcblx0XHR9XG5cblx0XHQvLyBTa2lwICYgY291bnQgbGVhZGluZyB6ZXJvZXMuXG5cdFx0bGV0IHplcm9lcyA9IDA7XG5cdFx0bGV0IGxlbmd0aCA9IDA7XG5cdFx0bGV0IHBiZWdpbiA9IDA7XG5cdFx0Y29uc3QgcGVuZCA9IHNvdXJjZS5sZW5ndGg7XG5cdFx0d2hpbGUgKHBiZWdpbiAhPT0gcGVuZCAmJiBzb3VyY2VbcGJlZ2luXSA9PT0gMCkge1xuXHRcdFx0cGJlZ2luKys7XG5cdFx0XHR6ZXJvZXMrKztcblx0XHR9XG5cblx0XHQvLyBBbGxvY2F0ZSBlbm91Z2ggc3BhY2UgaW4gYmlnLWVuZGlhbiBiYXNlNTggcmVwcmVzZW50YXRpb24uXG5cdFx0Y29uc3Qgc2l6ZSA9ICgocGVuZCAtIHBiZWdpbikgKiBpRkFDVE9SICsgMSkgPj4+IDA7XG5cdFx0Y29uc3QgYjU4ID0gYWxsb2Moc2l6ZSk7XG5cblx0XHQvLyBQcm9jZXNzIHRoZSBieXRlcy5cblx0XHR3aGlsZSAocGJlZ2luICE9PSBwZW5kKSB7XG5cdFx0XHRsZXQgY2FycnkgPSBzb3VyY2VbcGJlZ2luXTtcblxuXHRcdFx0Ly8gQXBwbHkgXCJiNTggPSBiNTggKiAyNTYgKyBjaFwiLlxuXHRcdFx0bGV0IGkgPSAwO1xuXHRcdFx0Zm9yIChsZXQgaXQxID0gc2l6ZSAtIDE7IChjYXJyeSAhPT0gMCB8fCBpIDwgbGVuZ3RoKSAmJiBpdDEgIT09IC0xOyBpdDEtLSwgaSsrKSB7XG5cdFx0XHRcdGNhcnJ5ICs9ICgyNTYgKiBiNThbaXQxXSkgPj4+IDA7XG5cdFx0XHRcdGI1OFtpdDFdID0gY2FycnkgJSBCQVNFID4+PiAwO1xuXHRcdFx0XHRjYXJyeSA9IChjYXJyeSAvIEJBU0UpID4+PiAwO1xuXHRcdFx0fVxuXG5cdFx0XHRpZiAoY2FycnkgIT09IDApIHtcblx0XHRcdFx0dGhyb3cgbmV3IEVycm9yKCdub24temVybyBjYXJyeScpO1xuXHRcdFx0fVxuXG5cdFx0XHRsZW5ndGggPSBpO1xuXHRcdFx0cGJlZ2luKys7XG5cdFx0fVxuXG5cdFx0Ly8gU2tpcCBsZWFkaW5nIHplcm9lcyBpbiBiYXNlNTggcmVzdWx0LlxuXHRcdGxldCBpdDIgPSBzaXplIC0gbGVuZ3RoO1xuXHRcdHdoaWxlIChpdDIgIT09IHNpemUgJiYgYjU4W2l0Ml0gPT09IDApIHtcblx0XHRcdGl0MisrO1xuXHRcdH1cblxuXHRcdC8vIFRyYW5zbGF0ZSB0aGUgcmVzdWx0IGludG8gYSBzdHJpbmcuXG5cdFx0bGV0IHN0ciA9IExFQURFUi5yZXBlYXQoemVyb2VzKTtcblx0XHRmb3IgKDsgaXQyIDwgc2l6ZTsgKytpdDIpIHtcblx0XHRcdHN0ciArPSBhbHBoYWJldC5jaGFyQXQoYjU4W2l0Ml0pO1xuXHRcdH1cblxuXHRcdHJldHVybiBzdHI7XG5cdH07XG59O1xuXG5leHBvcnQgY29uc3QgY3JlYXRlQnRjQmFzZURlY29kZSA9IChhbHBoYWJldDogc3RyaW5nKSA9PiB7XG5cdGlmIChhbHBoYWJldC5sZW5ndGggPj0gMjU1KSB7XG5cdFx0dGhyb3cgbmV3IFJhbmdlRXJyb3IoYGFscGhhYmV0IHRvbyBsb25nYCk7XG5cdH1cblxuXHRjb25zdCBCQVNFX01BUCA9IGFsbG9jVW5zYWZlKDI1NikuZmlsbCgyNTUpO1xuXHRmb3IgKGxldCBpID0gMDsgaSA8IGFscGhhYmV0Lmxlbmd0aDsgaSsrKSB7XG5cdFx0Y29uc3QgeGMgPSBhbHBoYWJldC5jaGFyQ29kZUF0KGkpO1xuXG5cdFx0aWYgKEJBU0VfTUFQW3hjXSAhPT0gMjU1KSB7XG5cdFx0XHR0aHJvdyBuZXcgUmFuZ2VFcnJvcihgJHthbHBoYWJldFtpXX0gaXMgYW1iaWd1b3VzYCk7XG5cdFx0fVxuXG5cdFx0QkFTRV9NQVBbeGNdID0gaTtcblx0fVxuXG5cdGNvbnN0IEJBU0UgPSBhbHBoYWJldC5sZW5ndGg7XG5cdGNvbnN0IExFQURFUiA9IGFscGhhYmV0LmNoYXJBdCgwKTtcblx0Y29uc3QgRkFDVE9SID0gTWF0aC5sb2coQkFTRSkgLyBNYXRoLmxvZygyNTYpOyAvLyBsb2coQkFTRSkgLyBsb2coMjU2KSwgcm91bmRlZCB1cFxuXG5cdHJldHVybiAoc291cmNlOiBzdHJpbmcpOiBVaW50OEFycmF5ID0+IHtcblx0XHRpZiAoc291cmNlLmxlbmd0aCA9PT0gMCkge1xuXHRcdFx0cmV0dXJuIGFsbG9jVW5zYWZlKDApO1xuXHRcdH1cblxuXHRcdC8vIFNraXAgYW5kIGNvdW50IGxlYWRpbmcgJzEncy5cblx0XHRsZXQgcHN6ID0gMDtcblx0XHRsZXQgemVyb2VzID0gMDtcblx0XHRsZXQgbGVuZ3RoID0gMDtcblxuXHRcdHdoaWxlIChzb3VyY2VbcHN6XSA9PT0gTEVBREVSKSB7XG5cdFx0XHR6ZXJvZXMrKztcblx0XHRcdHBzeisrO1xuXHRcdH1cblxuXHRcdC8vIEFsbG9jYXRlIGVub3VnaCBzcGFjZSBpbiBiaWctZW5kaWFuIGJhc2UyNTYgcmVwcmVzZW50YXRpb24uXG5cdFx0Y29uc3Qgc2l6ZSA9ICgoc291cmNlLmxlbmd0aCAtIHBzeikgKiBGQUNUT1IgKyAxKSA+Pj4gMDsgLy8gbG9nKDU4KSAvIGxvZygyNTYpLCByb3VuZGVkIHVwLlxuXHRcdGNvbnN0IGIyNTYgPSBhbGxvYyhzaXplKTtcblxuXHRcdC8vIFByb2Nlc3MgdGhlIGNoYXJhY3RlcnMuXG5cdFx0d2hpbGUgKHBzeiA8IHNvdXJjZS5sZW5ndGgpIHtcblx0XHRcdC8vIERlY29kZSBjaGFyYWN0ZXJcblx0XHRcdGxldCBjYXJyeSA9IEJBU0VfTUFQW3NvdXJjZS5jaGFyQ29kZUF0KHBzeildO1xuXG5cdFx0XHQvLyBJbnZhbGlkIGNoYXJhY3RlclxuXHRcdFx0aWYgKGNhcnJ5ID09PSAyNTUpIHtcblx0XHRcdFx0dGhyb3cgbmV3IEVycm9yKGBpbnZhbGlkIHN0cmluZ2ApO1xuXHRcdFx0fVxuXG5cdFx0XHRsZXQgaSA9IDA7XG5cdFx0XHRmb3IgKGxldCBpdDMgPSBzaXplIC0gMTsgKGNhcnJ5ICE9PSAwIHx8IGkgPCBsZW5ndGgpICYmIGl0MyAhPT0gLTE7IGl0My0tLCBpKyspIHtcblx0XHRcdFx0Y2FycnkgKz0gKEJBU0UgKiBiMjU2W2l0M10pID4+PiAwO1xuXHRcdFx0XHRiMjU2W2l0M10gPSBjYXJyeSAlIDI1NiA+Pj4gMDtcblx0XHRcdFx0Y2FycnkgPSAoY2FycnkgLyAyNTYpID4+PiAwO1xuXHRcdFx0fVxuXHRcdFx0aWYgKGNhcnJ5ICE9PSAwKSB7XG5cdFx0XHRcdHRocm93IG5ldyBFcnJvcignbm9uLXplcm8gY2FycnknKTtcblx0XHRcdH1cblx0XHRcdGxlbmd0aCA9IGk7XG5cdFx0XHRwc3orKztcblx0XHR9XG5cblx0XHQvLyBTa2lwIGxlYWRpbmcgemVyb2VzIGluIGIyNTYuXG5cdFx0bGV0IGl0NCA9IHNpemUgLSBsZW5ndGg7XG5cdFx0d2hpbGUgKGl0NCAhPT0gc2l6ZSAmJiBiMjU2W2l0NF0gPT09IDApIHtcblx0XHRcdGl0NCsrO1xuXHRcdH1cblxuXHRcdGNvbnN0IHZjaCA9IGFsbG9jVW5zYWZlKHplcm9lcyArIChzaXplIC0gaXQ0KSk7XG5cblx0XHRsZXQgaiA9IHplcm9lcztcblx0XHR3aGlsZSAoaXQ0ICE9PSBzaXplKSB7XG5cdFx0XHR2Y2hbaisrXSA9IGIyNTZbaXQ0KytdO1xuXHRcdH1cblxuXHRcdHJldHVybiB2Y2g7XG5cdH07XG59O1xuIiwgImltcG9ydCB7IGNyZWF0ZVJmYzQ2NDhEZWNvZGUsIGNyZWF0ZVJmYzQ2NDhFbmNvZGUgfSBmcm9tICcuLi91dGlscy5qcyc7XG5cbmNvbnN0IEhBU19VSU5UOF9CQVNFNjRfU1VQUE9SVCA9ICdmcm9tQmFzZTY0JyBpbiBVaW50OEFycmF5O1xuXG5jb25zdCBCQVNFNjRfQ0hBUlNFVCA9ICdBQkNERUZHSElKS0xNTk9QUVJTVFVWV1hZWmFiY2RlZmdoaWprbG1ub3BxcnN0dXZ3eHl6MDEyMzQ1Njc4OSsvJztcbmNvbnN0IEJBU0U2NFVSTF9DSEFSU0VUID0gJ0FCQ0RFRkdISUpLTE1OT1BRUlNUVVZXWFlaYWJjZGVmZ2hpamtsbW5vcHFyc3R1dnd4eXowMTIzNDU2Nzg5LV8nO1xuXG5leHBvcnQgY29uc3QgZnJvbUJhc2U2NCA9ICFIQVNfVUlOVDhfQkFTRTY0X1NVUFBPUlRcblx0PyAvKiNfX1BVUkVfXyovIGNyZWF0ZVJmYzQ2NDhEZWNvZGUoQkFTRTY0X0NIQVJTRVQsIDYsIGZhbHNlKVxuXHQ6IChzdHI6IHN0cmluZyk6IFVpbnQ4QXJyYXkgPT4ge1xuXHRcdFx0aWYgKHN0cltzdHIubGVuZ3RoIC0gMV0gPT09ICc9Jykge1xuXHRcdFx0XHR0aHJvdyBuZXcgU3ludGF4RXJyb3IoYHVuZXhwZWN0ZWQgcGFkZGluZyBpbiBiYXNlNjQgc3RyaW5nYCk7XG5cdFx0XHR9XG5cblx0XHRcdHJldHVybiBVaW50OEFycmF5LmZyb21CYXNlNjQoc3RyLCB7IGFscGhhYmV0OiAnYmFzZTY0JywgbGFzdENodW5rSGFuZGxpbmc6ICdsb29zZScgfSk7XG5cdFx0fTtcblxuZXhwb3J0IGNvbnN0IHRvQmFzZTY0ID0gIUhBU19VSU5UOF9CQVNFNjRfU1VQUE9SVFxuXHQ/IC8qI19fUFVSRV9fKi8gY3JlYXRlUmZjNDY0OEVuY29kZShCQVNFNjRfQ0hBUlNFVCwgNiwgZmFsc2UpXG5cdDogKGJ5dGVzOiBVaW50OEFycmF5KTogc3RyaW5nID0+IHtcblx0XHRcdHJldHVybiBieXRlcy50b0Jhc2U2NCh7IGFscGhhYmV0OiAnYmFzZTY0Jywgb21pdFBhZGRpbmc6IHRydWUgfSk7XG5cdFx0fTtcblxuZXhwb3J0IGNvbnN0IGZyb21CYXNlNjRQYWQgPSAhSEFTX1VJTlQ4X0JBU0U2NF9TVVBQT1JUXG5cdD8gLyojX19QVVJFX18qLyBjcmVhdGVSZmM0NjQ4RGVjb2RlKEJBU0U2NF9DSEFSU0VULCA2LCB0cnVlKVxuXHQ6IChzdHI6IHN0cmluZyk6IFVpbnQ4QXJyYXkgPT4ge1xuXHRcdFx0cmV0dXJuIFVpbnQ4QXJyYXkuZnJvbUJhc2U2NChzdHIsIHsgYWxwaGFiZXQ6ICdiYXNlNjQnLCBsYXN0Q2h1bmtIYW5kbGluZzogJ3N0cmljdCcgfSk7XG5cdFx0fTtcblxuZXhwb3J0IGNvbnN0IHRvQmFzZTY0UGFkID0gIUhBU19VSU5UOF9CQVNFNjRfU1VQUE9SVFxuXHQ/IC8qI19fUFVSRV9fKi8gY3JlYXRlUmZjNDY0OEVuY29kZShCQVNFNjRfQ0hBUlNFVCwgNiwgdHJ1ZSlcblx0OiAoYnl0ZXM6IFVpbnQ4QXJyYXkpOiBzdHJpbmcgPT4ge1xuXHRcdFx0cmV0dXJuIGJ5dGVzLnRvQmFzZTY0KHsgYWxwaGFiZXQ6ICdiYXNlNjQnLCBvbWl0UGFkZGluZzogZmFsc2UgfSk7XG5cdFx0fTtcblxuZXhwb3J0IGNvbnN0IGZyb21CYXNlNjRVcmwgPSAhSEFTX1VJTlQ4X0JBU0U2NF9TVVBQT1JUXG5cdD8gLyojX19QVVJFX18qLyBjcmVhdGVSZmM0NjQ4RGVjb2RlKEJBU0U2NFVSTF9DSEFSU0VULCA2LCBmYWxzZSlcblx0OiAoc3RyOiBzdHJpbmcpOiBVaW50OEFycmF5ID0+IHtcblx0XHRcdGlmIChzdHJbc3RyLmxlbmd0aCAtIDFdID09PSAnPScpIHtcblx0XHRcdFx0dGhyb3cgbmV3IFN5bnRheEVycm9yKGB1bmV4cGVjdGVkIHBhZGRpbmcgaW4gYmFzZTY0IHN0cmluZ2ApO1xuXHRcdFx0fVxuXG5cdFx0XHRyZXR1cm4gVWludDhBcnJheS5mcm9tQmFzZTY0KHN0ciwgeyBhbHBoYWJldDogJ2Jhc2U2NHVybCcsIGxhc3RDaHVua0hhbmRsaW5nOiAnbG9vc2UnIH0pO1xuXHRcdH07XG5cbmV4cG9ydCBjb25zdCB0b0Jhc2U2NFVybCA9ICFIQVNfVUlOVDhfQkFTRTY0X1NVUFBPUlRcblx0PyAvKiNfX1BVUkVfXyovIGNyZWF0ZVJmYzQ2NDhFbmNvZGUoQkFTRTY0VVJMX0NIQVJTRVQsIDYsIGZhbHNlKVxuXHQ6IChieXRlczogVWludDhBcnJheSk6IHN0cmluZyA9PiB7XG5cdFx0XHRyZXR1cm4gYnl0ZXMudG9CYXNlNjQoeyBhbHBoYWJldDogJ2Jhc2U2NHVybCcsIG9taXRQYWRkaW5nOiB0cnVlIH0pO1xuXHRcdH07XG5cbmV4cG9ydCBjb25zdCBmcm9tQmFzZTY0VXJsUGFkID0gIUhBU19VSU5UOF9CQVNFNjRfU1VQUE9SVFxuXHQ/IC8qI19fUFVSRV9fKi8gY3JlYXRlUmZjNDY0OERlY29kZShCQVNFNjRVUkxfQ0hBUlNFVCwgNiwgdHJ1ZSlcblx0OiAoc3RyOiBzdHJpbmcpOiBVaW50OEFycmF5ID0+IHtcblx0XHRcdHJldHVybiBVaW50OEFycmF5LmZyb21CYXNlNjQoc3RyLCB7IGFscGhhYmV0OiAnYmFzZTY0dXJsJywgbGFzdENodW5rSGFuZGxpbmc6ICdzdHJpY3QnIH0pO1xuXHRcdH07XG5cbmV4cG9ydCBjb25zdCB0b0Jhc2U2NFVybFBhZCA9ICFIQVNfVUlOVDhfQkFTRTY0X1NVUFBPUlRcblx0PyAvKiNfX1BVUkVfXyovIGNyZWF0ZVJmYzQ2NDhFbmNvZGUoQkFTRTY0VVJMX0NIQVJTRVQsIDYsIHRydWUpXG5cdDogKGJ5dGVzOiBVaW50OEFycmF5KTogc3RyaW5nID0+IHtcblx0XHRcdHJldHVybiBieXRlcy50b0Jhc2U2NCh7IGFscGhhYmV0OiAnYmFzZTY0dXJsJywgb21pdFBhZGRpbmc6IGZhbHNlIH0pO1xuXHRcdH07XG4iLCAiLyohIHNjdXJlLWJhc2UgLSBNSVQgTGljZW5zZSAoYykgMjAyMiBQYXVsIE1pbGxlciAocGF1bG1pbGxyLmNvbSkgKi9cblxuZXhwb3J0IGludGVyZmFjZSBDb2RlcjxGLCBUPiB7XG4gIGVuY29kZShmcm9tOiBGKTogVDtcbiAgZGVjb2RlKHRvOiBUKTogRjtcbn1cblxuZXhwb3J0IGludGVyZmFjZSBCeXRlc0NvZGVyIGV4dGVuZHMgQ29kZXI8VWludDhBcnJheSwgc3RyaW5nPiB7XG4gIGVuY29kZTogKGRhdGE6IFVpbnQ4QXJyYXkpID0+IHN0cmluZztcbiAgZGVjb2RlOiAoc3RyOiBzdHJpbmcpID0+IFVpbnQ4QXJyYXk7XG59XG5cbmZ1bmN0aW9uIGlzQnl0ZXMoYTogdW5rbm93bik6IGEgaXMgVWludDhBcnJheSB7XG4gIHJldHVybiBhIGluc3RhbmNlb2YgVWludDhBcnJheSB8fCAoQXJyYXlCdWZmZXIuaXNWaWV3KGEpICYmIGEuY29uc3RydWN0b3IubmFtZSA9PT0gJ1VpbnQ4QXJyYXknKTtcbn1cblxuZnVuY3Rpb24gaXNBcnJheU9mKGlzU3RyaW5nOiBib29sZWFuLCBhcnI6IGFueVtdKSB7XG4gIGlmICghQXJyYXkuaXNBcnJheShhcnIpKSByZXR1cm4gZmFsc2U7XG4gIGlmIChhcnIubGVuZ3RoID09PSAwKSByZXR1cm4gdHJ1ZTtcbiAgaWYgKGlzU3RyaW5nKSB7XG4gICAgcmV0dXJuIGFyci5ldmVyeSgoaXRlbSkgPT4gdHlwZW9mIGl0ZW0gPT09ICdzdHJpbmcnKTtcbiAgfSBlbHNlIHtcbiAgICByZXR1cm4gYXJyLmV2ZXJ5KChpdGVtKSA9PiBOdW1iZXIuaXNTYWZlSW50ZWdlcihpdGVtKSk7XG4gIH1cbn1cblxuLy8gbm8gYWJ5dGVzOiBzZWVtcyB0byBoYXZlIDEwJSBzbG93ZG93bi4gV2h5PyFcblxuZnVuY3Rpb24gYWZuKGlucHV0OiBGdW5jdGlvbik6IGlucHV0IGlzIEZ1bmN0aW9uIHtcbiAgaWYgKHR5cGVvZiBpbnB1dCAhPT0gJ2Z1bmN0aW9uJykgdGhyb3cgbmV3IEVycm9yKCdmdW5jdGlvbiBleHBlY3RlZCcpO1xuICByZXR1cm4gdHJ1ZTtcbn1cblxuZnVuY3Rpb24gYXN0cihsYWJlbDogc3RyaW5nLCBpbnB1dDogdW5rbm93bik6IGlucHV0IGlzIHN0cmluZyB7XG4gIGlmICh0eXBlb2YgaW5wdXQgIT09ICdzdHJpbmcnKSB0aHJvdyBuZXcgRXJyb3IoYCR7bGFiZWx9OiBzdHJpbmcgZXhwZWN0ZWRgKTtcbiAgcmV0dXJuIHRydWU7XG59XG5cbmZ1bmN0aW9uIGFudW1iZXIobjogbnVtYmVyKSB7XG4gIGlmICghTnVtYmVyLmlzU2FmZUludGVnZXIobikpIHRocm93IG5ldyBFcnJvcihgaW52YWxpZCBpbnRlZ2VyOiAke259YCk7XG59XG5leHBvcnQgY29uc3QgYXNzZXJ0TnVtYmVyID0gYW51bWJlcjtcblxuZnVuY3Rpb24gYUFycihpbnB1dDogYW55W10pIHtcbiAgaWYgKCFBcnJheS5pc0FycmF5KGlucHV0KSkgdGhyb3cgbmV3IEVycm9yKCdhcnJheSBleHBlY3RlZCcpO1xufVxuZnVuY3Rpb24gYXN0ckFycihsYWJlbDogc3RyaW5nLCBpbnB1dDogc3RyaW5nW10pIHtcbiAgaWYgKCFpc0FycmF5T2YodHJ1ZSwgaW5wdXQpKSB0aHJvdyBuZXcgRXJyb3IoYCR7bGFiZWx9OiBhcnJheSBvZiBzdHJpbmdzIGV4cGVjdGVkYCk7XG59XG5mdW5jdGlvbiBhbnVtQXJyKGxhYmVsOiBzdHJpbmcsIGlucHV0OiBudW1iZXJbXSkge1xuICBpZiAoIWlzQXJyYXlPZihmYWxzZSwgaW5wdXQpKSB0aHJvdyBuZXcgRXJyb3IoYCR7bGFiZWx9OiBhcnJheSBvZiBudW1iZXJzIGV4cGVjdGVkYCk7XG59XG5cbi8vIFRPRE86IHNvbWUgcmVjdXNpdmUgdHlwZSBpbmZlcmVuY2Ugc28gaXQgd291bGQgY2hlY2sgY29ycmVjdCBvcmRlciBvZiBpbnB1dC9vdXRwdXQgaW5zaWRlIHJlc3Q/XG4vLyBsaWtlIDxzdHJpbmcsIG51bWJlcj4sIDxudW1iZXIsIGJ5dGVzPiwgPGJ5dGVzLCBmbG9hdD5cbnR5cGUgQ2hhaW4gPSBbQ29kZXI8YW55LCBhbnk+LCAuLi5Db2RlcjxhbnksIGFueT5bXV07XG4vLyBFeHRyYWN0IGluZm8gZnJvbSBDb2RlciB0eXBlXG50eXBlIElucHV0PEY+ID0gRiBleHRlbmRzIENvZGVyPGluZmVyIFQsIGFueT4gPyBUIDogbmV2ZXI7XG50eXBlIE91dHB1dDxGPiA9IEYgZXh0ZW5kcyBDb2RlcjxhbnksIGluZmVyIFQ+ID8gVCA6IG5ldmVyO1xuLy8gR2VuZXJpYyBmdW5jdGlvbiBmb3IgYXJyYXlzXG50eXBlIEZpcnN0PFQ+ID0gVCBleHRlbmRzIFtpbmZlciBVLCAuLi5hbnlbXV0gPyBVIDogbmV2ZXI7XG50eXBlIExhc3Q8VD4gPSBUIGV4dGVuZHMgWy4uLmFueVtdLCBpbmZlciBVXSA/IFUgOiBuZXZlcjtcbnR5cGUgVGFpbDxUPiA9IFQgZXh0ZW5kcyBbYW55LCAuLi5pbmZlciBVXSA/IFUgOiBuZXZlcjtcblxudHlwZSBBc0NoYWluPEMgZXh0ZW5kcyBDaGFpbiwgUmVzdCA9IFRhaWw8Qz4+ID0ge1xuICAvLyBDW0tdID0gQ29kZXI8SW5wdXQ8Q1tLXT4sIElucHV0PFJlc3Rba10+PlxuICBbSyBpbiBrZXlvZiBDXTogQ29kZXI8SW5wdXQ8Q1tLXT4sIElucHV0PEsgZXh0ZW5kcyBrZXlvZiBSZXN0ID8gUmVzdFtLXSA6IGFueT4+O1xufTtcblxuLyoqXG4gKiBAX19OT19TSURFX0VGRkVDVFNfX1xuICovXG5mdW5jdGlvbiBjaGFpbjxUIGV4dGVuZHMgQ2hhaW4gJiBBc0NoYWluPFQ+PiguLi5hcmdzOiBUKTogQ29kZXI8SW5wdXQ8Rmlyc3Q8VD4+LCBPdXRwdXQ8TGFzdDxUPj4+IHtcbiAgY29uc3QgaWQgPSAoYTogYW55KSA9PiBhO1xuICAvLyBXcmFwIGNhbGwgaW4gY2xvc3VyZSBzbyBKSVQgY2FuIGlubGluZSBjYWxsc1xuICBjb25zdCB3cmFwID0gKGE6IGFueSwgYjogYW55KSA9PiAoYzogYW55KSA9PiBhKGIoYykpO1xuICAvLyBDb25zdHJ1Y3QgY2hhaW4gb2YgYXJnc1stMV0uZW5jb2RlKGFyZ3NbLTJdLmVuY29kZShbLi4uXSkpXG4gIGNvbnN0IGVuY29kZSA9IGFyZ3MubWFwKCh4KSA9PiB4LmVuY29kZSkucmVkdWNlUmlnaHQod3JhcCwgaWQpO1xuICAvLyBDb25zdHJ1Y3QgY2hhaW4gb2YgYXJnc1swXS5kZWNvZGUoYXJnc1sxXS5kZWNvZGUoLi4uKSlcbiAgY29uc3QgZGVjb2RlID0gYXJncy5tYXAoKHgpID0+IHguZGVjb2RlKS5yZWR1Y2Uod3JhcCwgaWQpO1xuICByZXR1cm4geyBlbmNvZGUsIGRlY29kZSB9O1xufVxuXG4vKipcbiAqIEVuY29kZXMgaW50ZWdlciByYWRpeCByZXByZXNlbnRhdGlvbiB0byBhcnJheSBvZiBzdHJpbmdzIHVzaW5nIGFscGhhYmV0IGFuZCBiYWNrLlxuICogQ291bGQgYWxzbyBiZSBhcnJheSBvZiBzdHJpbmdzLlxuICogQF9fTk9fU0lERV9FRkZFQ1RTX19cbiAqL1xuZnVuY3Rpb24gYWxwaGFiZXQobGV0dGVyczogc3RyaW5nIHwgc3RyaW5nW10pOiBDb2RlcjxudW1iZXJbXSwgc3RyaW5nW10+IHtcbiAgLy8gbWFwcGluZyAxIHRvIFwiYlwiXG4gIGNvbnN0IGxldHRlcnNBID0gdHlwZW9mIGxldHRlcnMgPT09ICdzdHJpbmcnID8gbGV0dGVycy5zcGxpdCgnJykgOiBsZXR0ZXJzO1xuICBjb25zdCBsZW4gPSBsZXR0ZXJzQS5sZW5ndGg7XG4gIGFzdHJBcnIoJ2FscGhhYmV0JywgbGV0dGVyc0EpO1xuXG4gIC8vIG1hcHBpbmcgXCJiXCIgdG8gMVxuICBjb25zdCBpbmRleGVzID0gbmV3IE1hcChsZXR0ZXJzQS5tYXAoKGwsIGkpID0+IFtsLCBpXSkpO1xuICByZXR1cm4ge1xuICAgIGVuY29kZTogKGRpZ2l0czogbnVtYmVyW10pID0+IHtcbiAgICAgIGFBcnIoZGlnaXRzKTtcbiAgICAgIHJldHVybiBkaWdpdHMubWFwKChpKSA9PiB7XG4gICAgICAgIGlmICghTnVtYmVyLmlzU2FmZUludGVnZXIoaSkgfHwgaSA8IDAgfHwgaSA+PSBsZW4pXG4gICAgICAgICAgdGhyb3cgbmV3IEVycm9yKFxuICAgICAgICAgICAgYGFscGhhYmV0LmVuY29kZTogZGlnaXQgaW5kZXggb3V0c2lkZSBhbHBoYWJldCBcIiR7aX1cIi4gQWxsb3dlZDogJHtsZXR0ZXJzfWBcbiAgICAgICAgICApO1xuICAgICAgICByZXR1cm4gbGV0dGVyc0FbaV0hO1xuICAgICAgfSk7XG4gICAgfSxcbiAgICBkZWNvZGU6IChpbnB1dDogc3RyaW5nW10pOiBudW1iZXJbXSA9PiB7XG4gICAgICBhQXJyKGlucHV0KTtcbiAgICAgIHJldHVybiBpbnB1dC5tYXAoKGxldHRlcikgPT4ge1xuICAgICAgICBhc3RyKCdhbHBoYWJldC5kZWNvZGUnLCBsZXR0ZXIpO1xuICAgICAgICBjb25zdCBpID0gaW5kZXhlcy5nZXQobGV0dGVyKTtcbiAgICAgICAgaWYgKGkgPT09IHVuZGVmaW5lZCkgdGhyb3cgbmV3IEVycm9yKGBVbmtub3duIGxldHRlcjogXCIke2xldHRlcn1cIi4gQWxsb3dlZDogJHtsZXR0ZXJzfWApO1xuICAgICAgICByZXR1cm4gaTtcbiAgICAgIH0pO1xuICAgIH0sXG4gIH07XG59XG5cbi8qKlxuICogQF9fTk9fU0lERV9FRkZFQ1RTX19cbiAqL1xuZnVuY3Rpb24gam9pbihzZXBhcmF0b3IgPSAnJyk6IENvZGVyPHN0cmluZ1tdLCBzdHJpbmc+IHtcbiAgYXN0cignam9pbicsIHNlcGFyYXRvcik7XG4gIHJldHVybiB7XG4gICAgZW5jb2RlOiAoZnJvbSkgPT4ge1xuICAgICAgYXN0ckFycignam9pbi5kZWNvZGUnLCBmcm9tKTtcbiAgICAgIHJldHVybiBmcm9tLmpvaW4oc2VwYXJhdG9yKTtcbiAgICB9LFxuICAgIGRlY29kZTogKHRvKSA9PiB7XG4gICAgICBhc3RyKCdqb2luLmRlY29kZScsIHRvKTtcbiAgICAgIHJldHVybiB0by5zcGxpdChzZXBhcmF0b3IpO1xuICAgIH0sXG4gIH07XG59XG5cbi8qKlxuICogUGFkIHN0cmluZ3MgYXJyYXkgc28gaXQgaGFzIGludGVnZXIgbnVtYmVyIG9mIGJpdHNcbiAqIEBfX05PX1NJREVfRUZGRUNUU19fXG4gKi9cbmZ1bmN0aW9uIHBhZGRpbmcoYml0czogbnVtYmVyLCBjaHIgPSAnPScpOiBDb2RlcjxzdHJpbmdbXSwgc3RyaW5nW10+IHtcbiAgYW51bWJlcihiaXRzKTtcbiAgYXN0cigncGFkZGluZycsIGNocik7XG4gIHJldHVybiB7XG4gICAgZW5jb2RlKGRhdGE6IHN0cmluZ1tdKTogc3RyaW5nW10ge1xuICAgICAgYXN0ckFycigncGFkZGluZy5lbmNvZGUnLCBkYXRhKTtcbiAgICAgIHdoaWxlICgoZGF0YS5sZW5ndGggKiBiaXRzKSAlIDgpIGRhdGEucHVzaChjaHIpO1xuICAgICAgcmV0dXJuIGRhdGE7XG4gICAgfSxcbiAgICBkZWNvZGUoaW5wdXQ6IHN0cmluZ1tdKTogc3RyaW5nW10ge1xuICAgICAgYXN0ckFycigncGFkZGluZy5kZWNvZGUnLCBpbnB1dCk7XG4gICAgICBsZXQgZW5kID0gaW5wdXQubGVuZ3RoO1xuICAgICAgaWYgKChlbmQgKiBiaXRzKSAlIDgpXG4gICAgICAgIHRocm93IG5ldyBFcnJvcigncGFkZGluZzogaW52YWxpZCwgc3RyaW5nIHNob3VsZCBoYXZlIHdob2xlIG51bWJlciBvZiBieXRlcycpO1xuICAgICAgZm9yICg7IGVuZCA+IDAgJiYgaW5wdXRbZW5kIC0gMV0gPT09IGNocjsgZW5kLS0pIHtcbiAgICAgICAgY29uc3QgbGFzdCA9IGVuZCAtIDE7XG4gICAgICAgIGNvbnN0IGJ5dGUgPSBsYXN0ICogYml0cztcbiAgICAgICAgaWYgKGJ5dGUgJSA4ID09PSAwKSB0aHJvdyBuZXcgRXJyb3IoJ3BhZGRpbmc6IGludmFsaWQsIHN0cmluZyBoYXMgdG9vIG11Y2ggcGFkZGluZycpO1xuICAgICAgfVxuICAgICAgcmV0dXJuIGlucHV0LnNsaWNlKDAsIGVuZCk7XG4gICAgfSxcbiAgfTtcbn1cblxuLyoqXG4gKiBAX19OT19TSURFX0VGRkVDVFNfX1xuICovXG5mdW5jdGlvbiBub3JtYWxpemU8VD4oZm46ICh2YWw6IFQpID0+IFQpOiBDb2RlcjxULCBUPiB7XG4gIGFmbihmbik7XG4gIHJldHVybiB7IGVuY29kZTogKGZyb206IFQpID0+IGZyb20sIGRlY29kZTogKHRvOiBUKSA9PiBmbih0bykgfTtcbn1cblxuLyoqXG4gKiBTbG93OiBPKG5eMikgdGltZSBjb21wbGV4aXR5XG4gKi9cbmZ1bmN0aW9uIGNvbnZlcnRSYWRpeChkYXRhOiBudW1iZXJbXSwgZnJvbTogbnVtYmVyLCB0bzogbnVtYmVyKTogbnVtYmVyW10ge1xuICAvLyBiYXNlIDEgaXMgaW1wb3NzaWJsZVxuICBpZiAoZnJvbSA8IDIpIHRocm93IG5ldyBFcnJvcihgY29udmVydFJhZGl4OiBpbnZhbGlkIGZyb209JHtmcm9tfSwgYmFzZSBjYW5ub3QgYmUgbGVzcyB0aGFuIDJgKTtcbiAgaWYgKHRvIDwgMikgdGhyb3cgbmV3IEVycm9yKGBjb252ZXJ0UmFkaXg6IGludmFsaWQgdG89JHt0b30sIGJhc2UgY2Fubm90IGJlIGxlc3MgdGhhbiAyYCk7XG4gIGFBcnIoZGF0YSk7XG4gIGlmICghZGF0YS5sZW5ndGgpIHJldHVybiBbXTtcbiAgbGV0IHBvcyA9IDA7XG4gIGNvbnN0IHJlcyA9IFtdO1xuICBjb25zdCBkaWdpdHMgPSBBcnJheS5mcm9tKGRhdGEsIChkKSA9PiB7XG4gICAgYW51bWJlcihkKTtcbiAgICBpZiAoZCA8IDAgfHwgZCA+PSBmcm9tKSB0aHJvdyBuZXcgRXJyb3IoYGludmFsaWQgaW50ZWdlcjogJHtkfWApO1xuICAgIHJldHVybiBkO1xuICB9KTtcbiAgY29uc3QgZGxlbiA9IGRpZ2l0cy5sZW5ndGg7XG4gIHdoaWxlICh0cnVlKSB7XG4gICAgbGV0IGNhcnJ5ID0gMDtcbiAgICBsZXQgZG9uZSA9IHRydWU7XG4gICAgZm9yIChsZXQgaSA9IHBvczsgaSA8IGRsZW47IGkrKykge1xuICAgICAgY29uc3QgZGlnaXQgPSBkaWdpdHNbaV0hO1xuICAgICAgY29uc3QgZnJvbUNhcnJ5ID0gZnJvbSAqIGNhcnJ5O1xuICAgICAgY29uc3QgZGlnaXRCYXNlID0gZnJvbUNhcnJ5ICsgZGlnaXQ7XG4gICAgICBpZiAoXG4gICAgICAgICFOdW1iZXIuaXNTYWZlSW50ZWdlcihkaWdpdEJhc2UpIHx8XG4gICAgICAgIGZyb21DYXJyeSAvIGZyb20gIT09IGNhcnJ5IHx8XG4gICAgICAgIGRpZ2l0QmFzZSAtIGRpZ2l0ICE9PSBmcm9tQ2FycnlcbiAgICAgICkge1xuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ2NvbnZlcnRSYWRpeDogY2Fycnkgb3ZlcmZsb3cnKTtcbiAgICAgIH1cbiAgICAgIGNvbnN0IGRpdiA9IGRpZ2l0QmFzZSAvIHRvO1xuICAgICAgY2FycnkgPSBkaWdpdEJhc2UgJSB0bztcbiAgICAgIGNvbnN0IHJvdW5kZWQgPSBNYXRoLmZsb29yKGRpdik7XG4gICAgICBkaWdpdHNbaV0gPSByb3VuZGVkO1xuICAgICAgaWYgKCFOdW1iZXIuaXNTYWZlSW50ZWdlcihyb3VuZGVkKSB8fCByb3VuZGVkICogdG8gKyBjYXJyeSAhPT0gZGlnaXRCYXNlKVxuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ2NvbnZlcnRSYWRpeDogY2Fycnkgb3ZlcmZsb3cnKTtcbiAgICAgIGlmICghZG9uZSkgY29udGludWU7XG4gICAgICBlbHNlIGlmICghcm91bmRlZCkgcG9zID0gaTtcbiAgICAgIGVsc2UgZG9uZSA9IGZhbHNlO1xuICAgIH1cbiAgICByZXMucHVzaChjYXJyeSk7XG4gICAgaWYgKGRvbmUpIGJyZWFrO1xuICB9XG4gIGZvciAobGV0IGkgPSAwOyBpIDwgZGF0YS5sZW5ndGggLSAxICYmIGRhdGFbaV0gPT09IDA7IGkrKykgcmVzLnB1c2goMCk7XG4gIHJldHVybiByZXMucmV2ZXJzZSgpO1xufVxuXG5jb25zdCBnY2QgPSAoYTogbnVtYmVyLCBiOiBudW1iZXIpOiBudW1iZXIgPT4gKGIgPT09IDAgPyBhIDogZ2NkKGIsIGEgJSBiKSk7XG5jb25zdCByYWRpeDJjYXJyeSA9IC8qIEBfX05PX1NJREVfRUZGRUNUU19fICovIChmcm9tOiBudW1iZXIsIHRvOiBudW1iZXIpID0+XG4gIGZyb20gKyAodG8gLSBnY2QoZnJvbSwgdG8pKTtcbmNvbnN0IHBvd2VyczogbnVtYmVyW10gPSAvKiBAX19QVVJFX18gKi8gKCgpID0+IHtcbiAgbGV0IHJlcyA9IFtdO1xuICBmb3IgKGxldCBpID0gMDsgaSA8IDQwOyBpKyspIHJlcy5wdXNoKDIgKiogaSk7XG4gIHJldHVybiByZXM7XG59KSgpO1xuLyoqXG4gKiBJbXBsZW1lbnRlZCB3aXRoIG51bWJlcnMsIGJlY2F1c2UgQmlnSW50IGlzIDV4IHNsb3dlclxuICovXG5mdW5jdGlvbiBjb252ZXJ0UmFkaXgyKGRhdGE6IG51bWJlcltdLCBmcm9tOiBudW1iZXIsIHRvOiBudW1iZXIsIHBhZGRpbmc6IGJvb2xlYW4pOiBudW1iZXJbXSB7XG4gIGFBcnIoZGF0YSk7XG4gIGlmIChmcm9tIDw9IDAgfHwgZnJvbSA+IDMyKSB0aHJvdyBuZXcgRXJyb3IoYGNvbnZlcnRSYWRpeDI6IHdyb25nIGZyb209JHtmcm9tfWApO1xuICBpZiAodG8gPD0gMCB8fCB0byA+IDMyKSB0aHJvdyBuZXcgRXJyb3IoYGNvbnZlcnRSYWRpeDI6IHdyb25nIHRvPSR7dG99YCk7XG4gIGlmIChyYWRpeDJjYXJyeShmcm9tLCB0bykgPiAzMikge1xuICAgIHRocm93IG5ldyBFcnJvcihcbiAgICAgIGBjb252ZXJ0UmFkaXgyOiBjYXJyeSBvdmVyZmxvdyBmcm9tPSR7ZnJvbX0gdG89JHt0b30gY2FycnlCaXRzPSR7cmFkaXgyY2FycnkoZnJvbSwgdG8pfWBcbiAgICApO1xuICB9XG4gIGxldCBjYXJyeSA9IDA7XG4gIGxldCBwb3MgPSAwOyAvLyBiaXR3aXNlIHBvc2l0aW9uIGluIGN1cnJlbnQgZWxlbWVudFxuICBjb25zdCBtYXggPSBwb3dlcnNbZnJvbV0hO1xuICBjb25zdCBtYXNrID0gcG93ZXJzW3RvXSEgLSAxO1xuICBjb25zdCByZXM6IG51bWJlcltdID0gW107XG4gIGZvciAoY29uc3QgbiBvZiBkYXRhKSB7XG4gICAgYW51bWJlcihuKTtcbiAgICBpZiAobiA+PSBtYXgpIHRocm93IG5ldyBFcnJvcihgY29udmVydFJhZGl4MjogaW52YWxpZCBkYXRhIHdvcmQ9JHtufSBmcm9tPSR7ZnJvbX1gKTtcbiAgICBjYXJyeSA9IChjYXJyeSA8PCBmcm9tKSB8IG47XG4gICAgaWYgKHBvcyArIGZyb20gPiAzMikgdGhyb3cgbmV3IEVycm9yKGBjb252ZXJ0UmFkaXgyOiBjYXJyeSBvdmVyZmxvdyBwb3M9JHtwb3N9IGZyb209JHtmcm9tfWApO1xuICAgIHBvcyArPSBmcm9tO1xuICAgIGZvciAoOyBwb3MgPj0gdG87IHBvcyAtPSB0bykgcmVzLnB1c2goKChjYXJyeSA+PiAocG9zIC0gdG8pKSAmIG1hc2spID4+PiAwKTtcbiAgICBjb25zdCBwb3cgPSBwb3dlcnNbcG9zXTtcbiAgICBpZiAocG93ID09PSB1bmRlZmluZWQpIHRocm93IG5ldyBFcnJvcignaW52YWxpZCBjYXJyeScpO1xuICAgIGNhcnJ5ICY9IHBvdyAtIDE7IC8vIGNsZWFuIGNhcnJ5LCBvdGhlcndpc2UgaXQgd2lsbCBjYXVzZSBvdmVyZmxvd1xuICB9XG4gIGNhcnJ5ID0gKGNhcnJ5IDw8ICh0byAtIHBvcykpICYgbWFzaztcbiAgaWYgKCFwYWRkaW5nICYmIHBvcyA+PSBmcm9tKSB0aHJvdyBuZXcgRXJyb3IoJ0V4Y2VzcyBwYWRkaW5nJyk7XG4gIGlmICghcGFkZGluZyAmJiBjYXJyeSA+IDApIHRocm93IG5ldyBFcnJvcihgTm9uLXplcm8gcGFkZGluZzogJHtjYXJyeX1gKTtcbiAgaWYgKHBhZGRpbmcgJiYgcG9zID4gMCkgcmVzLnB1c2goY2FycnkgPj4+IDApO1xuICByZXR1cm4gcmVzO1xufVxuXG4vKipcbiAqIEBfX05PX1NJREVfRUZGRUNUU19fXG4gKi9cbmZ1bmN0aW9uIHJhZGl4KG51bTogbnVtYmVyKTogQ29kZXI8VWludDhBcnJheSwgbnVtYmVyW10+IHtcbiAgYW51bWJlcihudW0pO1xuICBjb25zdCBfMjU2ID0gMiAqKiA4O1xuICByZXR1cm4ge1xuICAgIGVuY29kZTogKGJ5dGVzOiBVaW50OEFycmF5KSA9PiB7XG4gICAgICBpZiAoIWlzQnl0ZXMoYnl0ZXMpKSB0aHJvdyBuZXcgRXJyb3IoJ3JhZGl4LmVuY29kZSBpbnB1dCBzaG91bGQgYmUgVWludDhBcnJheScpO1xuICAgICAgcmV0dXJuIGNvbnZlcnRSYWRpeChBcnJheS5mcm9tKGJ5dGVzKSwgXzI1NiwgbnVtKTtcbiAgICB9LFxuICAgIGRlY29kZTogKGRpZ2l0czogbnVtYmVyW10pID0+IHtcbiAgICAgIGFudW1BcnIoJ3JhZGl4LmRlY29kZScsIGRpZ2l0cyk7XG4gICAgICByZXR1cm4gVWludDhBcnJheS5mcm9tKGNvbnZlcnRSYWRpeChkaWdpdHMsIG51bSwgXzI1NikpO1xuICAgIH0sXG4gIH07XG59XG5cbi8qKlxuICogSWYgYm90aCBiYXNlcyBhcmUgcG93ZXIgb2Ygc2FtZSBudW1iZXIgKGxpa2UgYDIqKjggPC0+IDIqKjY0YCksXG4gKiB0aGVyZSBpcyBhIGxpbmVhciBhbGdvcml0aG0uIEZvciBub3cgd2UgaGF2ZSBpbXBsZW1lbnRhdGlvbiBmb3IgcG93ZXItb2YtdHdvIGJhc2VzIG9ubHkuXG4gKiBAX19OT19TSURFX0VGRkVDVFNfX1xuICovXG5mdW5jdGlvbiByYWRpeDIoYml0czogbnVtYmVyLCByZXZQYWRkaW5nID0gZmFsc2UpOiBDb2RlcjxVaW50OEFycmF5LCBudW1iZXJbXT4ge1xuICBhbnVtYmVyKGJpdHMpO1xuICBpZiAoYml0cyA8PSAwIHx8IGJpdHMgPiAzMikgdGhyb3cgbmV3IEVycm9yKCdyYWRpeDI6IGJpdHMgc2hvdWxkIGJlIGluICgwLi4zMl0nKTtcbiAgaWYgKHJhZGl4MmNhcnJ5KDgsIGJpdHMpID4gMzIgfHwgcmFkaXgyY2FycnkoYml0cywgOCkgPiAzMilcbiAgICB0aHJvdyBuZXcgRXJyb3IoJ3JhZGl4MjogY2Fycnkgb3ZlcmZsb3cnKTtcbiAgcmV0dXJuIHtcbiAgICBlbmNvZGU6IChieXRlczogVWludDhBcnJheSkgPT4ge1xuICAgICAgaWYgKCFpc0J5dGVzKGJ5dGVzKSkgdGhyb3cgbmV3IEVycm9yKCdyYWRpeDIuZW5jb2RlIGlucHV0IHNob3VsZCBiZSBVaW50OEFycmF5Jyk7XG4gICAgICByZXR1cm4gY29udmVydFJhZGl4MihBcnJheS5mcm9tKGJ5dGVzKSwgOCwgYml0cywgIXJldlBhZGRpbmcpO1xuICAgIH0sXG4gICAgZGVjb2RlOiAoZGlnaXRzOiBudW1iZXJbXSkgPT4ge1xuICAgICAgYW51bUFycigncmFkaXgyLmRlY29kZScsIGRpZ2l0cyk7XG4gICAgICByZXR1cm4gVWludDhBcnJheS5mcm9tKGNvbnZlcnRSYWRpeDIoZGlnaXRzLCBiaXRzLCA4LCByZXZQYWRkaW5nKSk7XG4gICAgfSxcbiAgfTtcbn1cblxudHlwZSBBcmd1bWVudFR5cGVzPEYgZXh0ZW5kcyBGdW5jdGlvbj4gPSBGIGV4dGVuZHMgKC4uLmFyZ3M6IGluZmVyIEEpID0+IGFueSA/IEEgOiBuZXZlcjtcbmZ1bmN0aW9uIHVuc2FmZVdyYXBwZXI8VCBleHRlbmRzICguLi5hcmdzOiBhbnkpID0+IGFueT4oZm46IFQpIHtcbiAgYWZuKGZuKTtcbiAgcmV0dXJuIGZ1bmN0aW9uICguLi5hcmdzOiBBcmd1bWVudFR5cGVzPFQ+KTogUmV0dXJuVHlwZTxUPiB8IHZvaWQge1xuICAgIHRyeSB7XG4gICAgICByZXR1cm4gZm4uYXBwbHkobnVsbCwgYXJncyk7XG4gICAgfSBjYXRjaCAoZSkge31cbiAgfTtcbn1cblxuZnVuY3Rpb24gY2hlY2tzdW0oXG4gIGxlbjogbnVtYmVyLFxuICBmbjogKGRhdGE6IFVpbnQ4QXJyYXkpID0+IFVpbnQ4QXJyYXlcbik6IENvZGVyPFVpbnQ4QXJyYXksIFVpbnQ4QXJyYXk+IHtcbiAgYW51bWJlcihsZW4pO1xuICBhZm4oZm4pO1xuICByZXR1cm4ge1xuICAgIGVuY29kZShkYXRhOiBVaW50OEFycmF5KSB7XG4gICAgICBpZiAoIWlzQnl0ZXMoZGF0YSkpIHRocm93IG5ldyBFcnJvcignY2hlY2tzdW0uZW5jb2RlOiBpbnB1dCBzaG91bGQgYmUgVWludDhBcnJheScpO1xuICAgICAgY29uc3Qgc3VtID0gZm4oZGF0YSkuc2xpY2UoMCwgbGVuKTtcbiAgICAgIGNvbnN0IHJlcyA9IG5ldyBVaW50OEFycmF5KGRhdGEubGVuZ3RoICsgbGVuKTtcbiAgICAgIHJlcy5zZXQoZGF0YSk7XG4gICAgICByZXMuc2V0KHN1bSwgZGF0YS5sZW5ndGgpO1xuICAgICAgcmV0dXJuIHJlcztcbiAgICB9LFxuICAgIGRlY29kZShkYXRhOiBVaW50OEFycmF5KSB7XG4gICAgICBpZiAoIWlzQnl0ZXMoZGF0YSkpIHRocm93IG5ldyBFcnJvcignY2hlY2tzdW0uZGVjb2RlOiBpbnB1dCBzaG91bGQgYmUgVWludDhBcnJheScpO1xuICAgICAgY29uc3QgcGF5bG9hZCA9IGRhdGEuc2xpY2UoMCwgLWxlbik7XG4gICAgICBjb25zdCBvbGRDaGVja3N1bSA9IGRhdGEuc2xpY2UoLWxlbik7XG4gICAgICBjb25zdCBuZXdDaGVja3N1bSA9IGZuKHBheWxvYWQpLnNsaWNlKDAsIGxlbik7XG4gICAgICBmb3IgKGxldCBpID0gMDsgaSA8IGxlbjsgaSsrKVxuICAgICAgICBpZiAobmV3Q2hlY2tzdW1baV0gIT09IG9sZENoZWNrc3VtW2ldKSB0aHJvdyBuZXcgRXJyb3IoJ0ludmFsaWQgY2hlY2tzdW0nKTtcbiAgICAgIHJldHVybiBwYXlsb2FkO1xuICAgIH0sXG4gIH07XG59XG5cbi8vIHByZXR0aWVyLWlnbm9yZVxuZXhwb3J0IGNvbnN0IHV0aWxzID0ge1xuICBhbHBoYWJldCwgY2hhaW4sIGNoZWNrc3VtLCBjb252ZXJ0UmFkaXgsIGNvbnZlcnRSYWRpeDIsIHJhZGl4LCByYWRpeDIsIGpvaW4sIHBhZGRpbmcsXG59O1xuXG4vLyBSRkMgNDY0OCBha2EgUkZDIDM1NDhcbi8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuXG4vKipcbiAqIGJhc2UxNiBlbmNvZGluZy5cbiAqL1xuZXhwb3J0IGNvbnN0IGJhc2UxNjogQnl0ZXNDb2RlciA9IGNoYWluKHJhZGl4Mig0KSwgYWxwaGFiZXQoJzAxMjM0NTY3ODlBQkNERUYnKSwgam9pbignJykpO1xuZXhwb3J0IGNvbnN0IGJhc2UzMjogQnl0ZXNDb2RlciA9IGNoYWluKFxuICByYWRpeDIoNSksXG4gIGFscGhhYmV0KCdBQkNERUZHSElKS0xNTk9QUVJTVFVWV1hZWjIzNDU2NycpLFxuICBwYWRkaW5nKDUpLFxuICBqb2luKCcnKVxuKTtcbmV4cG9ydCBjb25zdCBiYXNlMzJub3BhZDogQnl0ZXNDb2RlciA9IGNoYWluKFxuICByYWRpeDIoNSksXG4gIGFscGhhYmV0KCdBQkNERUZHSElKS0xNTk9QUVJTVFVWV1hZWjIzNDU2NycpLFxuICBqb2luKCcnKVxuKTtcbmV4cG9ydCBjb25zdCBiYXNlMzJoZXg6IEJ5dGVzQ29kZXIgPSBjaGFpbihcbiAgcmFkaXgyKDUpLFxuICBhbHBoYWJldCgnMDEyMzQ1Njc4OUFCQ0RFRkdISUpLTE1OT1BRUlNUVVYnKSxcbiAgcGFkZGluZyg1KSxcbiAgam9pbignJylcbik7XG5leHBvcnQgY29uc3QgYmFzZTMyaGV4bm9wYWQ6IEJ5dGVzQ29kZXIgPSBjaGFpbihcbiAgcmFkaXgyKDUpLFxuICBhbHBoYWJldCgnMDEyMzQ1Njc4OUFCQ0RFRkdISUpLTE1OT1BRUlNUVVYnKSxcbiAgam9pbignJylcbik7XG5leHBvcnQgY29uc3QgYmFzZTMyY3JvY2tmb3JkOiBCeXRlc0NvZGVyID0gY2hhaW4oXG4gIHJhZGl4Mig1KSxcbiAgYWxwaGFiZXQoJzAxMjM0NTY3ODlBQkNERUZHSEpLTU5QUVJTVFZXWFlaJyksXG4gIGpvaW4oJycpLFxuICBub3JtYWxpemUoKHM6IHN0cmluZykgPT4gcy50b1VwcGVyQ2FzZSgpLnJlcGxhY2UoL08vZywgJzAnKS5yZXBsYWNlKC9bSUxdL2csICcxJykpXG4pO1xuLyoqXG4gKiBiYXNlNjQgd2l0aCBwYWRkaW5nLiBGb3Igbm8gcGFkZGluZywgdXNlIGBiYXNlNjRub3BhZGAuXG4gKiBAZXhhbXBsZVxuICogY29uc3QgYiA9IGJhc2U2NC5kZWNvZGUoJ0E5NTEnKTsgLy8gVWludDhBcnJheS5mcm9tKFsgMywgMjIyLCAxMTcgXSlcbiAqIGJhc2U2NC5lbmNvZGUoYik7IC8vICdBOTUxJ1xuICovXG5leHBvcnQgY29uc3QgYmFzZTY0OiBCeXRlc0NvZGVyID0gY2hhaW4oXG4gIHJhZGl4Mig2KSxcbiAgYWxwaGFiZXQoJ0FCQ0RFRkdISUpLTE1OT1BRUlNUVVZXWFlaYWJjZGVmZ2hpamtsbW5vcHFyc3R1dnd4eXowMTIzNDU2Nzg5Ky8nKSxcbiAgcGFkZGluZyg2KSxcbiAgam9pbignJylcbik7XG4vKipcbiAqIGJhc2U2NCB3aXRob3V0IHBhZGRpbmcuXG4gKi9cbmV4cG9ydCBjb25zdCBiYXNlNjRub3BhZDogQnl0ZXNDb2RlciA9IGNoYWluKFxuICByYWRpeDIoNiksXG4gIGFscGhhYmV0KCdBQkNERUZHSElKS0xNTk9QUVJTVFVWV1hZWmFiY2RlZmdoaWprbG1ub3BxcnN0dXZ3eHl6MDEyMzQ1Njc4OSsvJyksXG4gIGpvaW4oJycpXG4pO1xuZXhwb3J0IGNvbnN0IGJhc2U2NHVybDogQnl0ZXNDb2RlciA9IGNoYWluKFxuICByYWRpeDIoNiksXG4gIGFscGhhYmV0KCdBQkNERUZHSElKS0xNTk9QUVJTVFVWV1hZWmFiY2RlZmdoaWprbG1ub3BxcnN0dXZ3eHl6MDEyMzQ1Njc4OS1fJyksXG4gIHBhZGRpbmcoNiksXG4gIGpvaW4oJycpXG4pO1xuZXhwb3J0IGNvbnN0IGJhc2U2NHVybG5vcGFkOiBCeXRlc0NvZGVyID0gY2hhaW4oXG4gIHJhZGl4Mig2KSxcbiAgYWxwaGFiZXQoJ0FCQ0RFRkdISUpLTE1OT1BRUlNUVVZXWFlaYWJjZGVmZ2hpamtsbW5vcHFyc3R1dnd4eXowMTIzNDU2Nzg5LV8nKSxcbiAgam9pbignJylcbik7XG5cbi8vIGJhc2U1OCBjb2RlXG4vLyAtLS0tLS0tLS0tLVxuY29uc3QgZ2VuQmFzZTU4ID0gLyogQF9fTk9fU0lERV9FRkZFQ1RTX18gKi8gKGFiYzogc3RyaW5nKSA9PlxuICBjaGFpbihyYWRpeCg1OCksIGFscGhhYmV0KGFiYyksIGpvaW4oJycpKTtcblxuLyoqXG4gKiBCYXNlNTg6IGJhc2U2NCB3aXRob3V0IGNoYXJhY3RlcnMgKywgLywgMCwgTywgSSwgbC5cbiAqIFF1YWRyYXRpYyAoTyhuXjIpKSAtIHNvLCBjYW4ndCBiZSB1c2VkIG9uIGxhcmdlIGlucHV0cy5cbiAqL1xuZXhwb3J0IGNvbnN0IGJhc2U1ODogQnl0ZXNDb2RlciA9IGdlbkJhc2U1OChcbiAgJzEyMzQ1Njc4OUFCQ0RFRkdISktMTU5QUVJTVFVWV1hZWmFiY2RlZmdoaWprbW5vcHFyc3R1dnd4eXonXG4pO1xuZXhwb3J0IGNvbnN0IGJhc2U1OGZsaWNrcjogQnl0ZXNDb2RlciA9IGdlbkJhc2U1OChcbiAgJzEyMzQ1Njc4OWFiY2RlZmdoaWprbW5vcHFyc3R1dnd4eXpBQkNERUZHSEpLTE1OUFFSU1RVVldYWVonXG4pO1xuZXhwb3J0IGNvbnN0IGJhc2U1OHhycDogQnl0ZXNDb2RlciA9IGdlbkJhc2U1OChcbiAgJ3Jwc2huYWYzOXdCVURORUdISktMTTRQUVJTVDdWV1hZWjJiY2RlQ2c2NWprbThvRnFpMXR1dkF4eXonXG4pO1xuXG4vLyBEYXRhIGxlbiAoaW5kZXgpIC0+IGVuY29kZWQgYmxvY2sgbGVuXG5jb25zdCBYTVJfQkxPQ0tfTEVOID0gWzAsIDIsIDMsIDUsIDYsIDcsIDksIDEwLCAxMV07XG5cbi8qKlxuICogWE1SIHZlcnNpb24gb2YgYmFzZTU4LlxuICogRG9uZSBpbiA4LWJ5dGUgYmxvY2tzICh3aGljaCBlcXVhbHMgMTEgY2hhcnMgaW4gZGVjb2RpbmcpLiBMYXN0IChub24tZnVsbCkgYmxvY2sgcGFkZGVkIHdpdGggJzEnIHRvIHNpemUgaW4gWE1SX0JMT0NLX0xFTi5cbiAqIEJsb2NrIGVuY29kaW5nIHNpZ25pZmljYW50bHkgcmVkdWNlcyBxdWFkcmF0aWMgY29tcGxleGl0eSBvZiBiYXNlNTguXG4gKi9cbmV4cG9ydCBjb25zdCBiYXNlNTh4bXI6IEJ5dGVzQ29kZXIgPSB7XG4gIGVuY29kZShkYXRhOiBVaW50OEFycmF5KSB7XG4gICAgbGV0IHJlcyA9ICcnO1xuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgZGF0YS5sZW5ndGg7IGkgKz0gOCkge1xuICAgICAgY29uc3QgYmxvY2sgPSBkYXRhLnN1YmFycmF5KGksIGkgKyA4KTtcbiAgICAgIHJlcyArPSBiYXNlNTguZW5jb2RlKGJsb2NrKS5wYWRTdGFydChYTVJfQkxPQ0tfTEVOW2Jsb2NrLmxlbmd0aF0hLCAnMScpO1xuICAgIH1cbiAgICByZXR1cm4gcmVzO1xuICB9LFxuICBkZWNvZGUoc3RyOiBzdHJpbmcpIHtcbiAgICBsZXQgcmVzOiBudW1iZXJbXSA9IFtdO1xuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgc3RyLmxlbmd0aDsgaSArPSAxMSkge1xuICAgICAgY29uc3Qgc2xpY2UgPSBzdHIuc2xpY2UoaSwgaSArIDExKTtcbiAgICAgIGNvbnN0IGJsb2NrTGVuID0gWE1SX0JMT0NLX0xFTi5pbmRleE9mKHNsaWNlLmxlbmd0aCk7XG4gICAgICBjb25zdCBibG9jayA9IGJhc2U1OC5kZWNvZGUoc2xpY2UpO1xuICAgICAgZm9yIChsZXQgaiA9IDA7IGogPCBibG9jay5sZW5ndGggLSBibG9ja0xlbjsgaisrKSB7XG4gICAgICAgIGlmIChibG9ja1tqXSAhPT0gMCkgdGhyb3cgbmV3IEVycm9yKCdiYXNlNTh4bXI6IHdyb25nIHBhZGRpbmcnKTtcbiAgICAgIH1cbiAgICAgIHJlcyA9IHJlcy5jb25jYXQoQXJyYXkuZnJvbShibG9jay5zbGljZShibG9jay5sZW5ndGggLSBibG9ja0xlbikpKTtcbiAgICB9XG4gICAgcmV0dXJuIFVpbnQ4QXJyYXkuZnJvbShyZXMpO1xuICB9LFxufTtcblxuZXhwb3J0IGNvbnN0IGNyZWF0ZUJhc2U1OGNoZWNrID0gKHNoYTI1NjogKGRhdGE6IFVpbnQ4QXJyYXkpID0+IFVpbnQ4QXJyYXkpOiBCeXRlc0NvZGVyID0+XG4gIGNoYWluKFxuICAgIGNoZWNrc3VtKDQsIChkYXRhKSA9PiBzaGEyNTYoc2hhMjU2KGRhdGEpKSksXG4gICAgYmFzZTU4XG4gICk7XG5cbi8qKlxuICogVXNlIGBjcmVhdGVCYXNlNThjaGVja2AgaW5zdGVhZC5cbiAqIEBkZXByZWNhdGVkXG4gKi9cbmV4cG9ydCBjb25zdCBiYXNlNThjaGVjayA9IGNyZWF0ZUJhc2U1OGNoZWNrO1xuXG4vLyBCZWNoMzIgY29kZVxuLy8gLS0tLS0tLS0tLS1cbmV4cG9ydCBpbnRlcmZhY2UgQmVjaDMyRGVjb2RlZDxQcmVmaXggZXh0ZW5kcyBzdHJpbmcgPSBzdHJpbmc+IHtcbiAgcHJlZml4OiBQcmVmaXg7XG4gIHdvcmRzOiBudW1iZXJbXTtcbn1cbmV4cG9ydCBpbnRlcmZhY2UgQmVjaDMyRGVjb2RlZFdpdGhBcnJheTxQcmVmaXggZXh0ZW5kcyBzdHJpbmcgPSBzdHJpbmc+IHtcbiAgcHJlZml4OiBQcmVmaXg7XG4gIHdvcmRzOiBudW1iZXJbXTtcbiAgYnl0ZXM6IFVpbnQ4QXJyYXk7XG59XG5cbmNvbnN0IEJFQ0hfQUxQSEFCRVQ6IENvZGVyPG51bWJlcltdLCBzdHJpbmc+ID0gY2hhaW4oXG4gIGFscGhhYmV0KCdxcHpyeTl4OGdmMnR2ZHcwczNqbjU0a2hjZTZtdWE3bCcpLFxuICBqb2luKCcnKVxuKTtcblxuY29uc3QgUE9MWU1PRF9HRU5FUkFUT1JTID0gWzB4M2I2YTU3YjIsIDB4MjY1MDhlNmQsIDB4MWVhMTE5ZmEsIDB4M2Q0MjMzZGQsIDB4MmExNDYyYjNdO1xuZnVuY3Rpb24gYmVjaDMyUG9seW1vZChwcmU6IG51bWJlcik6IG51bWJlciB7XG4gIGNvbnN0IGIgPSBwcmUgPj4gMjU7XG4gIGxldCBjaGsgPSAocHJlICYgMHgxZmZmZmZmKSA8PCA1O1xuICBmb3IgKGxldCBpID0gMDsgaSA8IFBPTFlNT0RfR0VORVJBVE9SUy5sZW5ndGg7IGkrKykge1xuICAgIGlmICgoKGIgPj4gaSkgJiAxKSA9PT0gMSkgY2hrIF49IFBPTFlNT0RfR0VORVJBVE9SU1tpXSE7XG4gIH1cbiAgcmV0dXJuIGNoaztcbn1cblxuZnVuY3Rpb24gYmVjaENoZWNrc3VtKHByZWZpeDogc3RyaW5nLCB3b3JkczogbnVtYmVyW10sIGVuY29kaW5nQ29uc3QgPSAxKTogc3RyaW5nIHtcbiAgY29uc3QgbGVuID0gcHJlZml4Lmxlbmd0aDtcbiAgbGV0IGNoayA9IDE7XG4gIGZvciAobGV0IGkgPSAwOyBpIDwgbGVuOyBpKyspIHtcbiAgICBjb25zdCBjID0gcHJlZml4LmNoYXJDb2RlQXQoaSk7XG4gICAgaWYgKGMgPCAzMyB8fCBjID4gMTI2KSB0aHJvdyBuZXcgRXJyb3IoYEludmFsaWQgcHJlZml4ICgke3ByZWZpeH0pYCk7XG4gICAgY2hrID0gYmVjaDMyUG9seW1vZChjaGspIF4gKGMgPj4gNSk7XG4gIH1cbiAgY2hrID0gYmVjaDMyUG9seW1vZChjaGspO1xuICBmb3IgKGxldCBpID0gMDsgaSA8IGxlbjsgaSsrKSBjaGsgPSBiZWNoMzJQb2x5bW9kKGNoaykgXiAocHJlZml4LmNoYXJDb2RlQXQoaSkgJiAweDFmKTtcbiAgZm9yIChsZXQgdiBvZiB3b3JkcykgY2hrID0gYmVjaDMyUG9seW1vZChjaGspIF4gdjtcbiAgZm9yIChsZXQgaSA9IDA7IGkgPCA2OyBpKyspIGNoayA9IGJlY2gzMlBvbHltb2QoY2hrKTtcbiAgY2hrIF49IGVuY29kaW5nQ29uc3Q7XG4gIHJldHVybiBCRUNIX0FMUEhBQkVULmVuY29kZShjb252ZXJ0UmFkaXgyKFtjaGsgJSBwb3dlcnNbMzBdIV0sIDMwLCA1LCBmYWxzZSkpO1xufVxuXG5leHBvcnQgaW50ZXJmYWNlIEJlY2gzMiB7XG4gIGVuY29kZTxQcmVmaXggZXh0ZW5kcyBzdHJpbmc+KFxuICAgIHByZWZpeDogUHJlZml4LFxuICAgIHdvcmRzOiBudW1iZXJbXSB8IFVpbnQ4QXJyYXksXG4gICAgbGltaXQ/OiBudW1iZXIgfCBmYWxzZVxuICApOiBgJHtMb3dlcmNhc2U8UHJlZml4Pn0xJHtzdHJpbmd9YDtcbiAgZGVjb2RlPFByZWZpeCBleHRlbmRzIHN0cmluZz4oXG4gICAgc3RyOiBgJHtQcmVmaXh9MSR7c3RyaW5nfWAsXG4gICAgbGltaXQ/OiBudW1iZXIgfCBmYWxzZVxuICApOiBCZWNoMzJEZWNvZGVkPFByZWZpeD47XG4gIGVuY29kZUZyb21CeXRlcyhwcmVmaXg6IHN0cmluZywgYnl0ZXM6IFVpbnQ4QXJyYXkpOiBzdHJpbmc7XG4gIGRlY29kZVRvQnl0ZXMoc3RyOiBzdHJpbmcpOiBCZWNoMzJEZWNvZGVkV2l0aEFycmF5O1xuICBkZWNvZGVVbnNhZmUoc3RyOiBzdHJpbmcsIGxpbWl0PzogbnVtYmVyIHwgZmFsc2UpOiB2b2lkIHwgQmVjaDMyRGVjb2RlZDxzdHJpbmc+O1xuICBmcm9tV29yZHModG86IG51bWJlcltdKTogVWludDhBcnJheTtcbiAgZnJvbVdvcmRzVW5zYWZlKHRvOiBudW1iZXJbXSk6IHZvaWQgfCBVaW50OEFycmF5O1xuICB0b1dvcmRzKGZyb206IFVpbnQ4QXJyYXkpOiBudW1iZXJbXTtcbn1cbi8qKlxuICogQF9fTk9fU0lERV9FRkZFQ1RTX19cbiAqL1xuZnVuY3Rpb24gZ2VuQmVjaDMyKGVuY29kaW5nOiAnYmVjaDMyJyB8ICdiZWNoMzJtJyk6IEJlY2gzMiB7XG4gIGNvbnN0IEVOQ09ESU5HX0NPTlNUID0gZW5jb2RpbmcgPT09ICdiZWNoMzInID8gMSA6IDB4MmJjODMwYTM7XG4gIGNvbnN0IF93b3JkcyA9IHJhZGl4Mig1KTtcbiAgY29uc3QgZnJvbVdvcmRzID0gX3dvcmRzLmRlY29kZTtcbiAgY29uc3QgdG9Xb3JkcyA9IF93b3Jkcy5lbmNvZGU7XG4gIGNvbnN0IGZyb21Xb3Jkc1Vuc2FmZSA9IHVuc2FmZVdyYXBwZXIoZnJvbVdvcmRzKTtcblxuICBmdW5jdGlvbiBlbmNvZGU8UHJlZml4IGV4dGVuZHMgc3RyaW5nPihcbiAgICBwcmVmaXg6IFByZWZpeCxcbiAgICB3b3JkczogbnVtYmVyW10gfCBVaW50OEFycmF5LFxuICAgIGxpbWl0OiBudW1iZXIgfCBmYWxzZSA9IDkwXG4gICk6IGAke0xvd2VyY2FzZTxQcmVmaXg+fTEke3N0cmluZ31gIHtcbiAgICBhc3RyKCdiZWNoMzIuZW5jb2RlIHByZWZpeCcsIHByZWZpeCk7XG4gICAgaWYgKGlzQnl0ZXMod29yZHMpKSB3b3JkcyA9IEFycmF5LmZyb20od29yZHMpO1xuICAgIGFudW1BcnIoJ2JlY2gzMi5lbmNvZGUnLCB3b3Jkcyk7XG4gICAgY29uc3QgcGxlbiA9IHByZWZpeC5sZW5ndGg7XG4gICAgaWYgKHBsZW4gPT09IDApIHRocm93IG5ldyBUeXBlRXJyb3IoYEludmFsaWQgcHJlZml4IGxlbmd0aCAke3BsZW59YCk7XG4gICAgY29uc3QgYWN0dWFsTGVuZ3RoID0gcGxlbiArIDcgKyB3b3Jkcy5sZW5ndGg7XG4gICAgaWYgKGxpbWl0ICE9PSBmYWxzZSAmJiBhY3R1YWxMZW5ndGggPiBsaW1pdClcbiAgICAgIHRocm93IG5ldyBUeXBlRXJyb3IoYExlbmd0aCAke2FjdHVhbExlbmd0aH0gZXhjZWVkcyBsaW1pdCAke2xpbWl0fWApO1xuICAgIGNvbnN0IGxvd2VyZWQgPSBwcmVmaXgudG9Mb3dlckNhc2UoKTtcbiAgICBjb25zdCBzdW0gPSBiZWNoQ2hlY2tzdW0obG93ZXJlZCwgd29yZHMsIEVOQ09ESU5HX0NPTlNUKTtcbiAgICByZXR1cm4gYCR7bG93ZXJlZH0xJHtCRUNIX0FMUEhBQkVULmVuY29kZSh3b3Jkcyl9JHtzdW19YCBhcyBgJHtMb3dlcmNhc2U8UHJlZml4Pn0xJHtzdHJpbmd9YDtcbiAgfVxuXG4gIGZ1bmN0aW9uIGRlY29kZTxQcmVmaXggZXh0ZW5kcyBzdHJpbmc+KFxuICAgIHN0cjogYCR7UHJlZml4fTEke3N0cmluZ31gLFxuICAgIGxpbWl0PzogbnVtYmVyIHwgZmFsc2VcbiAgKTogQmVjaDMyRGVjb2RlZDxQcmVmaXg+O1xuICBmdW5jdGlvbiBkZWNvZGUoc3RyOiBzdHJpbmcsIGxpbWl0PzogbnVtYmVyIHwgZmFsc2UpOiBCZWNoMzJEZWNvZGVkO1xuICBmdW5jdGlvbiBkZWNvZGUoc3RyOiBzdHJpbmcsIGxpbWl0OiBudW1iZXIgfCBmYWxzZSA9IDkwKTogQmVjaDMyRGVjb2RlZCB7XG4gICAgYXN0cignYmVjaDMyLmRlY29kZSBpbnB1dCcsIHN0cik7XG4gICAgY29uc3Qgc2xlbiA9IHN0ci5sZW5ndGg7XG4gICAgaWYgKHNsZW4gPCA4IHx8IChsaW1pdCAhPT0gZmFsc2UgJiYgc2xlbiA+IGxpbWl0KSlcbiAgICAgIHRocm93IG5ldyBUeXBlRXJyb3IoYGludmFsaWQgc3RyaW5nIGxlbmd0aDogJHtzbGVufSAoJHtzdHJ9KS4gRXhwZWN0ZWQgKDguLiR7bGltaXR9KWApO1xuICAgIC8vIGRvbid0IGFsbG93IG1peGVkIGNhc2VcbiAgICBjb25zdCBsb3dlcmVkID0gc3RyLnRvTG93ZXJDYXNlKCk7XG4gICAgaWYgKHN0ciAhPT0gbG93ZXJlZCAmJiBzdHIgIT09IHN0ci50b1VwcGVyQ2FzZSgpKVxuICAgICAgdGhyb3cgbmV3IEVycm9yKGBTdHJpbmcgbXVzdCBiZSBsb3dlcmNhc2Ugb3IgdXBwZXJjYXNlYCk7XG4gICAgY29uc3Qgc2VwSW5kZXggPSBsb3dlcmVkLmxhc3RJbmRleE9mKCcxJyk7XG4gICAgaWYgKHNlcEluZGV4ID09PSAwIHx8IHNlcEluZGV4ID09PSAtMSlcbiAgICAgIHRocm93IG5ldyBFcnJvcihgTGV0dGVyIFwiMVwiIG11c3QgYmUgcHJlc2VudCBiZXR3ZWVuIHByZWZpeCBhbmQgZGF0YSBvbmx5YCk7XG4gICAgY29uc3QgcHJlZml4ID0gbG93ZXJlZC5zbGljZSgwLCBzZXBJbmRleCk7XG4gICAgY29uc3QgZGF0YSA9IGxvd2VyZWQuc2xpY2Uoc2VwSW5kZXggKyAxKTtcbiAgICBpZiAoZGF0YS5sZW5ndGggPCA2KSB0aHJvdyBuZXcgRXJyb3IoJ0RhdGEgbXVzdCBiZSBhdCBsZWFzdCA2IGNoYXJhY3RlcnMgbG9uZycpO1xuICAgIGNvbnN0IHdvcmRzID0gQkVDSF9BTFBIQUJFVC5kZWNvZGUoZGF0YSkuc2xpY2UoMCwgLTYpO1xuICAgIGNvbnN0IHN1bSA9IGJlY2hDaGVja3N1bShwcmVmaXgsIHdvcmRzLCBFTkNPRElOR19DT05TVCk7XG4gICAgaWYgKCFkYXRhLmVuZHNXaXRoKHN1bSkpIHRocm93IG5ldyBFcnJvcihgSW52YWxpZCBjaGVja3N1bSBpbiAke3N0cn06IGV4cGVjdGVkIFwiJHtzdW19XCJgKTtcbiAgICByZXR1cm4geyBwcmVmaXgsIHdvcmRzIH07XG4gIH1cblxuICBjb25zdCBkZWNvZGVVbnNhZmUgPSB1bnNhZmVXcmFwcGVyKGRlY29kZSk7XG5cbiAgZnVuY3Rpb24gZGVjb2RlVG9CeXRlcyhzdHI6IHN0cmluZyk6IEJlY2gzMkRlY29kZWRXaXRoQXJyYXkge1xuICAgIGNvbnN0IHsgcHJlZml4LCB3b3JkcyB9ID0gZGVjb2RlKHN0ciwgZmFsc2UpO1xuICAgIHJldHVybiB7IHByZWZpeCwgd29yZHMsIGJ5dGVzOiBmcm9tV29yZHMod29yZHMpIH07XG4gIH1cblxuICBmdW5jdGlvbiBlbmNvZGVGcm9tQnl0ZXMocHJlZml4OiBzdHJpbmcsIGJ5dGVzOiBVaW50OEFycmF5KSB7XG4gICAgcmV0dXJuIGVuY29kZShwcmVmaXgsIHRvV29yZHMoYnl0ZXMpKTtcbiAgfVxuXG4gIHJldHVybiB7XG4gICAgZW5jb2RlLFxuICAgIGRlY29kZSxcbiAgICBlbmNvZGVGcm9tQnl0ZXMsXG4gICAgZGVjb2RlVG9CeXRlcyxcbiAgICBkZWNvZGVVbnNhZmUsXG4gICAgZnJvbVdvcmRzLFxuICAgIGZyb21Xb3Jkc1Vuc2FmZSxcbiAgICB0b1dvcmRzLFxuICB9O1xufVxuXG4vKipcbiAqIExvdy1sZXZlbCBiZWNoMzIgb3BlcmF0aW9ucy4gT3BlcmF0ZXMgb24gd29yZHMuXG4gKi9cbmV4cG9ydCBjb25zdCBiZWNoMzI6IEJlY2gzMiA9IGdlbkJlY2gzMignYmVjaDMyJyk7XG5leHBvcnQgY29uc3QgYmVjaDMybTogQmVjaDMyID0gZ2VuQmVjaDMyKCdiZWNoMzJtJyk7XG5cbmRlY2xhcmUgY29uc3QgVGV4dEVuY29kZXI6IGFueTtcbmRlY2xhcmUgY29uc3QgVGV4dERlY29kZXI6IGFueTtcblxuLyoqXG4gKiBVVEYtOC10by1ieXRlIGRlY29kZXIuIFVzZXMgYnVpbHQtaW4gVGV4dERlY29kZXIgLyBUZXh0RW5jb2Rlci5cbiAqIEBleGFtcGxlXG4gKiBjb25zdCBiID0gdXRmOC5kZWNvZGUoXCJoZXlcIik7IC8vID0+IG5ldyBVaW50OEFycmF5KFsgMTA0LCAxMDEsIDEyMSBdKVxuICogY29uc3Qgc3RyID0gdXRmOC5lbmNvZGUoYik7IC8vIFwiaGV5XCJcbiAqL1xuZXhwb3J0IGNvbnN0IHV0Zjg6IEJ5dGVzQ29kZXIgPSB7XG4gIGVuY29kZTogKGRhdGEpID0+IG5ldyBUZXh0RGVjb2RlcigpLmRlY29kZShkYXRhKSxcbiAgZGVjb2RlOiAoc3RyKSA9PiBuZXcgVGV4dEVuY29kZXIoKS5lbmNvZGUoc3RyKSxcbn07XG5cbi8qKlxuICogaGV4IHN0cmluZyBkZWNvZGVyLlxuICogQGV4YW1wbGVcbiAqIGNvbnN0IGIgPSBoZXguZGVjb2RlKFwiMDEwMmZmXCIpOyAvLyA9PiBuZXcgVWludDhBcnJheShbIDEsIDIsIDI1NSBdKVxuICogY29uc3Qgc3RyID0gaGV4LmVuY29kZShiKTsgLy8gXCIwMTAyZmZcIlxuICovXG5leHBvcnQgY29uc3QgaGV4OiBCeXRlc0NvZGVyID0gY2hhaW4oXG4gIHJhZGl4Mig0KSxcbiAgYWxwaGFiZXQoJzAxMjM0NTY3ODlhYmNkZWYnKSxcbiAgam9pbignJyksXG4gIG5vcm1hbGl6ZSgoczogc3RyaW5nKSA9PiB7XG4gICAgaWYgKHR5cGVvZiBzICE9PSAnc3RyaW5nJyB8fCBzLmxlbmd0aCAlIDIgIT09IDApXG4gICAgICB0aHJvdyBuZXcgVHlwZUVycm9yKGBoZXguZGVjb2RlOiBleHBlY3RlZCBzdHJpbmcsIGdvdCAke3R5cGVvZiBzfSB3aXRoIGxlbmd0aCAke3MubGVuZ3RofWApO1xuICAgIHJldHVybiBzLnRvTG93ZXJDYXNlKCk7XG4gIH0pXG4pO1xuXG4vLyBwcmV0dGllci1pZ25vcmVcbmNvbnN0IENPREVSUyA9IHtcbiAgdXRmOCwgaGV4LCBiYXNlMTYsIGJhc2UzMiwgYmFzZTY0LCBiYXNlNjR1cmwsIGJhc2U1OCwgYmFzZTU4eG1yXG59O1xudHlwZSBDb2RlclR5cGUgPSBrZXlvZiB0eXBlb2YgQ09ERVJTO1xuY29uc3QgY29kZXJUeXBlRXJyb3IgPVxuICAnSW52YWxpZCBlbmNvZGluZyB0eXBlLiBBdmFpbGFibGUgdHlwZXM6IHV0ZjgsIGhleCwgYmFzZTE2LCBiYXNlMzIsIGJhc2U2NCwgYmFzZTY0dXJsLCBiYXNlNTgsIGJhc2U1OHhtcic7XG5cbmV4cG9ydCBjb25zdCBieXRlc1RvU3RyaW5nID0gKHR5cGU6IENvZGVyVHlwZSwgYnl0ZXM6IFVpbnQ4QXJyYXkpOiBzdHJpbmcgPT4ge1xuICBpZiAodHlwZW9mIHR5cGUgIT09ICdzdHJpbmcnIHx8ICFDT0RFUlMuaGFzT3duUHJvcGVydHkodHlwZSkpIHRocm93IG5ldyBUeXBlRXJyb3IoY29kZXJUeXBlRXJyb3IpO1xuICBpZiAoIWlzQnl0ZXMoYnl0ZXMpKSB0aHJvdyBuZXcgVHlwZUVycm9yKCdieXRlc1RvU3RyaW5nKCkgZXhwZWN0cyBVaW50OEFycmF5Jyk7XG4gIHJldHVybiBDT0RFUlNbdHlwZV0uZW5jb2RlKGJ5dGVzKTtcbn07XG5leHBvcnQgY29uc3Qgc3RyID0gYnl0ZXNUb1N0cmluZzsgLy8gYXMgaW4gcHl0aG9uLCBidXQgZm9yIGJ5dGVzIG9ubHlcblxuZXhwb3J0IGNvbnN0IHN0cmluZ1RvQnl0ZXMgPSAodHlwZTogQ29kZXJUeXBlLCBzdHI6IHN0cmluZyk6IFVpbnQ4QXJyYXkgPT4ge1xuICBpZiAoIUNPREVSUy5oYXNPd25Qcm9wZXJ0eSh0eXBlKSkgdGhyb3cgbmV3IFR5cGVFcnJvcihjb2RlclR5cGVFcnJvcik7XG4gIGlmICh0eXBlb2Ygc3RyICE9PSAnc3RyaW5nJykgdGhyb3cgbmV3IFR5cGVFcnJvcignc3RyaW5nVG9CeXRlcygpIGV4cGVjdHMgc3RyaW5nJyk7XG4gIHJldHVybiBDT0RFUlNbdHlwZV0uZGVjb2RlKHN0cik7XG59O1xuZXhwb3J0IGNvbnN0IGJ5dGVzID0gc3RyaW5nVG9CeXRlcztcbiIsICIvKipcbiAqIEFzc2VydGlvbiBoZWxwZXJzXG4gKiBAbW9kdWxlXG4gKi9cblxuZnVuY3Rpb24gYW51bWJlcihuOiBudW1iZXIpOiB2b2lkIHtcbiAgaWYgKCFOdW1iZXIuaXNTYWZlSW50ZWdlcihuKSB8fCBuIDwgMCkgdGhyb3cgbmV3IEVycm9yKCdwb3NpdGl2ZSBpbnRlZ2VyIGV4cGVjdGVkLCBnb3QgJyArIG4pO1xufVxuXG4vLyBjb3BpZWQgZnJvbSB1dGlsc1xuZnVuY3Rpb24gaXNCeXRlcyhhOiB1bmtub3duKTogYSBpcyBVaW50OEFycmF5IHtcbiAgcmV0dXJuIGEgaW5zdGFuY2VvZiBVaW50OEFycmF5IHx8IChBcnJheUJ1ZmZlci5pc1ZpZXcoYSkgJiYgYS5jb25zdHJ1Y3Rvci5uYW1lID09PSAnVWludDhBcnJheScpO1xufVxuXG5mdW5jdGlvbiBhYnl0ZXMoYjogVWludDhBcnJheSB8IHVuZGVmaW5lZCwgLi4ubGVuZ3RoczogbnVtYmVyW10pOiB2b2lkIHtcbiAgaWYgKCFpc0J5dGVzKGIpKSB0aHJvdyBuZXcgRXJyb3IoJ1VpbnQ4QXJyYXkgZXhwZWN0ZWQnKTtcbiAgaWYgKGxlbmd0aHMubGVuZ3RoID4gMCAmJiAhbGVuZ3Rocy5pbmNsdWRlcyhiLmxlbmd0aCkpXG4gICAgdGhyb3cgbmV3IEVycm9yKCdVaW50OEFycmF5IGV4cGVjdGVkIG9mIGxlbmd0aCAnICsgbGVuZ3RocyArICcsIGdvdCBsZW5ndGg9JyArIGIubGVuZ3RoKTtcbn1cblxuZXhwb3J0IHR5cGUgSGFzaCA9IHtcbiAgKGRhdGE6IFVpbnQ4QXJyYXkpOiBVaW50OEFycmF5O1xuICBibG9ja0xlbjogbnVtYmVyO1xuICBvdXRwdXRMZW46IG51bWJlcjtcbiAgY3JlYXRlOiBhbnk7XG59O1xuZnVuY3Rpb24gYWhhc2goaDogSGFzaCk6IHZvaWQge1xuICBpZiAodHlwZW9mIGggIT09ICdmdW5jdGlvbicgfHwgdHlwZW9mIGguY3JlYXRlICE9PSAnZnVuY3Rpb24nKVxuICAgIHRocm93IG5ldyBFcnJvcignSGFzaCBzaG91bGQgYmUgd3JhcHBlZCBieSB1dGlscy53cmFwQ29uc3RydWN0b3InKTtcbiAgYW51bWJlcihoLm91dHB1dExlbik7XG4gIGFudW1iZXIoaC5ibG9ja0xlbik7XG59XG5cbmZ1bmN0aW9uIGFleGlzdHMoaW5zdGFuY2U6IGFueSwgY2hlY2tGaW5pc2hlZCA9IHRydWUpOiB2b2lkIHtcbiAgaWYgKGluc3RhbmNlLmRlc3Ryb3llZCkgdGhyb3cgbmV3IEVycm9yKCdIYXNoIGluc3RhbmNlIGhhcyBiZWVuIGRlc3Ryb3llZCcpO1xuICBpZiAoY2hlY2tGaW5pc2hlZCAmJiBpbnN0YW5jZS5maW5pc2hlZCkgdGhyb3cgbmV3IEVycm9yKCdIYXNoI2RpZ2VzdCgpIGhhcyBhbHJlYWR5IGJlZW4gY2FsbGVkJyk7XG59XG5mdW5jdGlvbiBhb3V0cHV0KG91dDogYW55LCBpbnN0YW5jZTogYW55KTogdm9pZCB7XG4gIGFieXRlcyhvdXQpO1xuICBjb25zdCBtaW4gPSBpbnN0YW5jZS5vdXRwdXRMZW47XG4gIGlmIChvdXQubGVuZ3RoIDwgbWluKSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKCdkaWdlc3RJbnRvKCkgZXhwZWN0cyBvdXRwdXQgYnVmZmVyIG9mIGxlbmd0aCBhdCBsZWFzdCAnICsgbWluKTtcbiAgfVxufVxuXG5leHBvcnQgeyBhbnVtYmVyLCBhYnl0ZXMsIGFoYXNoLCBhZXhpc3RzLCBhb3V0cHV0IH07XG4iLCAiLy8gV2UgdXNlIFdlYkNyeXB0byBha2EgZ2xvYmFsVGhpcy5jcnlwdG8sIHdoaWNoIGV4aXN0cyBpbiBicm93c2VycyBhbmQgbm9kZS5qcyAxNisuXG4vLyBTZWUgdXRpbHMudHMgZm9yIGRldGFpbHMuXG5kZWNsYXJlIGNvbnN0IGdsb2JhbFRoaXM6IFJlY29yZDxzdHJpbmcsIGFueT4gfCB1bmRlZmluZWQ7XG5leHBvcnQgY29uc3QgY3J5cHRvOiBhbnkgPVxuICB0eXBlb2YgZ2xvYmFsVGhpcyA9PT0gJ29iamVjdCcgJiYgJ2NyeXB0bycgaW4gZ2xvYmFsVGhpcyA/IGdsb2JhbFRoaXMuY3J5cHRvIDogdW5kZWZpbmVkO1xuIiwgIi8qISBub2JsZS1oYXNoZXMgLSBNSVQgTGljZW5zZSAoYykgMjAyMiBQYXVsIE1pbGxlciAocGF1bG1pbGxyLmNvbSkgKi9cblxuLyoqXG4gKiBVdGlsaXRpZXMgZm9yIGhleCwgYnl0ZXMsIENTUFJORy5cbiAqIEBtb2R1bGVcbiAqL1xuLy8gV2UgdXNlIFdlYkNyeXB0byBha2EgZ2xvYmFsVGhpcy5jcnlwdG8sIHdoaWNoIGV4aXN0cyBpbiBicm93c2VycyBhbmQgbm9kZS5qcyAxNisuXG4vLyBub2RlLmpzIHZlcnNpb25zIGVhcmxpZXIgdGhhbiB2MTkgZG9uJ3QgZGVjbGFyZSBpdCBpbiBnbG9iYWwgc2NvcGUuXG4vLyBGb3Igbm9kZS5qcywgcGFja2FnZS5qc29uI2V4cG9ydHMgZmllbGQgbWFwcGluZyByZXdyaXRlcyBpbXBvcnRcbi8vIGZyb20gYGNyeXB0b2AgdG8gYGNyeXB0b05vZGVgLCB3aGljaCBpbXBvcnRzIG5hdGl2ZSBtb2R1bGUuXG4vLyBNYWtlcyB0aGUgdXRpbHMgdW4taW1wb3J0YWJsZSBpbiBicm93c2VycyB3aXRob3V0IGEgYnVuZGxlci5cbi8vIE9uY2Ugbm9kZS5qcyAxOCBpcyBkZXByZWNhdGVkICgyMDI1LTA0LTMwKSwgd2UgY2FuIGp1c3QgZHJvcCB0aGUgaW1wb3J0LlxuaW1wb3J0IHsgY3J5cHRvIH0gZnJvbSAnQG5vYmxlL2hhc2hlcy9jcnlwdG8nO1xuaW1wb3J0IHsgYWJ5dGVzIH0gZnJvbSAnLi9fYXNzZXJ0LmpzJztcbi8vIGV4cG9ydCB7IGlzQnl0ZXMgfSBmcm9tICcuL19hc3NlcnQuanMnO1xuLy8gV2UgY2FuJ3QgcmV1c2UgaXNCeXRlcyBmcm9tIF9hc3NlcnQsIGJlY2F1c2Ugc29tZWhvdyB0aGlzIGNhdXNlcyBodWdlIHBlcmYgaXNzdWVzXG5leHBvcnQgZnVuY3Rpb24gaXNCeXRlcyhhOiB1bmtub3duKTogYSBpcyBVaW50OEFycmF5IHtcbiAgcmV0dXJuIGEgaW5zdGFuY2VvZiBVaW50OEFycmF5IHx8IChBcnJheUJ1ZmZlci5pc1ZpZXcoYSkgJiYgYS5jb25zdHJ1Y3Rvci5uYW1lID09PSAnVWludDhBcnJheScpO1xufVxuXG4vLyBwcmV0dGllci1pZ25vcmVcbmV4cG9ydCB0eXBlIFR5cGVkQXJyYXkgPSBJbnQ4QXJyYXkgfCBVaW50OENsYW1wZWRBcnJheSB8IFVpbnQ4QXJyYXkgfFxuICBVaW50MTZBcnJheSB8IEludDE2QXJyYXkgfCBVaW50MzJBcnJheSB8IEludDMyQXJyYXk7XG5cbi8vIENhc3QgYXJyYXkgdG8gZGlmZmVyZW50IHR5cGVcbmV4cG9ydCBjb25zdCB1OCA9IChhcnI6IFR5cGVkQXJyYXkpOiBVaW50OEFycmF5ID0+XG4gIG5ldyBVaW50OEFycmF5KGFyci5idWZmZXIsIGFyci5ieXRlT2Zmc2V0LCBhcnIuYnl0ZUxlbmd0aCk7XG5leHBvcnQgY29uc3QgdTMyID0gKGFycjogVHlwZWRBcnJheSk6IFVpbnQzMkFycmF5ID0+XG4gIG5ldyBVaW50MzJBcnJheShhcnIuYnVmZmVyLCBhcnIuYnl0ZU9mZnNldCwgTWF0aC5mbG9vcihhcnIuYnl0ZUxlbmd0aCAvIDQpKTtcblxuLy8gQ2FzdCBhcnJheSB0byB2aWV3XG5leHBvcnQgY29uc3QgY3JlYXRlVmlldyA9IChhcnI6IFR5cGVkQXJyYXkpOiBEYXRhVmlldyA9PlxuICBuZXcgRGF0YVZpZXcoYXJyLmJ1ZmZlciwgYXJyLmJ5dGVPZmZzZXQsIGFyci5ieXRlTGVuZ3RoKTtcblxuLyoqIFRoZSByb3RhdGUgcmlnaHQgKGNpcmN1bGFyIHJpZ2h0IHNoaWZ0KSBvcGVyYXRpb24gZm9yIHVpbnQzMiAqL1xuZXhwb3J0IGNvbnN0IHJvdHIgPSAod29yZDogbnVtYmVyLCBzaGlmdDogbnVtYmVyKTogbnVtYmVyID0+XG4gICh3b3JkIDw8ICgzMiAtIHNoaWZ0KSkgfCAod29yZCA+Pj4gc2hpZnQpO1xuLyoqIFRoZSByb3RhdGUgbGVmdCAoY2lyY3VsYXIgbGVmdCBzaGlmdCkgb3BlcmF0aW9uIGZvciB1aW50MzIgKi9cbmV4cG9ydCBjb25zdCByb3RsID0gKHdvcmQ6IG51bWJlciwgc2hpZnQ6IG51bWJlcik6IG51bWJlciA9PlxuICAod29yZCA8PCBzaGlmdCkgfCAoKHdvcmQgPj4+ICgzMiAtIHNoaWZ0KSkgPj4+IDApO1xuXG4vKiogSXMgY3VycmVudCBwbGF0Zm9ybSBsaXR0bGUtZW5kaWFuPyBNb3N0IGFyZS4gQmlnLUVuZGlhbiBwbGF0Zm9ybTogSUJNICovXG5leHBvcnQgY29uc3QgaXNMRTogYm9vbGVhbiA9IC8qIEBfX1BVUkVfXyAqLyAoKCkgPT5cbiAgbmV3IFVpbnQ4QXJyYXkobmV3IFVpbnQzMkFycmF5KFsweDExMjIzMzQ0XSkuYnVmZmVyKVswXSA9PT0gMHg0NCkoKTtcbi8vIFRoZSBieXRlIHN3YXAgb3BlcmF0aW9uIGZvciB1aW50MzJcbmV4cG9ydCBjb25zdCBieXRlU3dhcCA9ICh3b3JkOiBudW1iZXIpOiBudW1iZXIgPT5cbiAgKCh3b3JkIDw8IDI0KSAmIDB4ZmYwMDAwMDApIHxcbiAgKCh3b3JkIDw8IDgpICYgMHhmZjAwMDApIHxcbiAgKCh3b3JkID4+PiA4KSAmIDB4ZmYwMCkgfFxuICAoKHdvcmQgPj4+IDI0KSAmIDB4ZmYpO1xuLyoqIENvbmRpdGlvbmFsbHkgYnl0ZSBzd2FwIGlmIG9uIGEgYmlnLWVuZGlhbiBwbGF0Zm9ybSAqL1xuZXhwb3J0IGNvbnN0IGJ5dGVTd2FwSWZCRTogKG46IG51bWJlcikgPT4gbnVtYmVyID0gaXNMRVxuICA/IChuOiBudW1iZXIpID0+IG5cbiAgOiAobjogbnVtYmVyKSA9PiBieXRlU3dhcChuKTtcblxuLyoqIEluIHBsYWNlIGJ5dGUgc3dhcCBmb3IgVWludDMyQXJyYXkgKi9cbmV4cG9ydCBmdW5jdGlvbiBieXRlU3dhcDMyKGFycjogVWludDMyQXJyYXkpOiB2b2lkIHtcbiAgZm9yIChsZXQgaSA9IDA7IGkgPCBhcnIubGVuZ3RoOyBpKyspIHtcbiAgICBhcnJbaV0gPSBieXRlU3dhcChhcnJbaV0pO1xuICB9XG59XG5cbi8vIEFycmF5IHdoZXJlIGluZGV4IDB4ZjAgKDI0MCkgaXMgbWFwcGVkIHRvIHN0cmluZyAnZjAnXG5jb25zdCBoZXhlcyA9IC8qIEBfX1BVUkVfXyAqLyBBcnJheS5mcm9tKHsgbGVuZ3RoOiAyNTYgfSwgKF8sIGkpID0+XG4gIGkudG9TdHJpbmcoMTYpLnBhZFN0YXJ0KDIsICcwJylcbik7XG4vKipcbiAqIENvbnZlcnQgYnl0ZSBhcnJheSB0byBoZXggc3RyaW5nLlxuICogQGV4YW1wbGUgYnl0ZXNUb0hleChVaW50OEFycmF5LmZyb20oWzB4Y2EsIDB4ZmUsIDB4MDEsIDB4MjNdKSkgLy8gJ2NhZmUwMTIzJ1xuICovXG5leHBvcnQgZnVuY3Rpb24gYnl0ZXNUb0hleChieXRlczogVWludDhBcnJheSk6IHN0cmluZyB7XG4gIGFieXRlcyhieXRlcyk7XG4gIC8vIHByZS1jYWNoaW5nIGltcHJvdmVzIHRoZSBzcGVlZCA2eFxuICBsZXQgaGV4ID0gJyc7XG4gIGZvciAobGV0IGkgPSAwOyBpIDwgYnl0ZXMubGVuZ3RoOyBpKyspIHtcbiAgICBoZXggKz0gaGV4ZXNbYnl0ZXNbaV1dO1xuICB9XG4gIHJldHVybiBoZXg7XG59XG5cbi8vIFdlIHVzZSBvcHRpbWl6ZWQgdGVjaG5pcXVlIHRvIGNvbnZlcnQgaGV4IHN0cmluZyB0byBieXRlIGFycmF5XG5jb25zdCBhc2NpaXMgPSB7IF8wOiA0OCwgXzk6IDU3LCBBOiA2NSwgRjogNzAsIGE6IDk3LCBmOiAxMDIgfSBhcyBjb25zdDtcbmZ1bmN0aW9uIGFzY2lpVG9CYXNlMTYoY2g6IG51bWJlcik6IG51bWJlciB8IHVuZGVmaW5lZCB7XG4gIGlmIChjaCA+PSBhc2NpaXMuXzAgJiYgY2ggPD0gYXNjaWlzLl85KSByZXR1cm4gY2ggLSBhc2NpaXMuXzA7IC8vICcyJyA9PiA1MC00OFxuICBpZiAoY2ggPj0gYXNjaWlzLkEgJiYgY2ggPD0gYXNjaWlzLkYpIHJldHVybiBjaCAtIChhc2NpaXMuQSAtIDEwKTsgLy8gJ0InID0+IDY2LSg2NS0xMClcbiAgaWYgKGNoID49IGFzY2lpcy5hICYmIGNoIDw9IGFzY2lpcy5mKSByZXR1cm4gY2ggLSAoYXNjaWlzLmEgLSAxMCk7IC8vICdiJyA9PiA5OC0oOTctMTApXG4gIHJldHVybjtcbn1cblxuLyoqXG4gKiBDb252ZXJ0IGhleCBzdHJpbmcgdG8gYnl0ZSBhcnJheS5cbiAqIEBleGFtcGxlIGhleFRvQnl0ZXMoJ2NhZmUwMTIzJykgLy8gVWludDhBcnJheS5mcm9tKFsweGNhLCAweGZlLCAweDAxLCAweDIzXSlcbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGhleFRvQnl0ZXMoaGV4OiBzdHJpbmcpOiBVaW50OEFycmF5IHtcbiAgaWYgKHR5cGVvZiBoZXggIT09ICdzdHJpbmcnKSB0aHJvdyBuZXcgRXJyb3IoJ2hleCBzdHJpbmcgZXhwZWN0ZWQsIGdvdCAnICsgdHlwZW9mIGhleCk7XG4gIGNvbnN0IGhsID0gaGV4Lmxlbmd0aDtcbiAgY29uc3QgYWwgPSBobCAvIDI7XG4gIGlmIChobCAlIDIpIHRocm93IG5ldyBFcnJvcignaGV4IHN0cmluZyBleHBlY3RlZCwgZ290IHVucGFkZGVkIGhleCBvZiBsZW5ndGggJyArIGhsKTtcbiAgY29uc3QgYXJyYXkgPSBuZXcgVWludDhBcnJheShhbCk7XG4gIGZvciAobGV0IGFpID0gMCwgaGkgPSAwOyBhaSA8IGFsOyBhaSsrLCBoaSArPSAyKSB7XG4gICAgY29uc3QgbjEgPSBhc2NpaVRvQmFzZTE2KGhleC5jaGFyQ29kZUF0KGhpKSk7XG4gICAgY29uc3QgbjIgPSBhc2NpaVRvQmFzZTE2KGhleC5jaGFyQ29kZUF0KGhpICsgMSkpO1xuICAgIGlmIChuMSA9PT0gdW5kZWZpbmVkIHx8IG4yID09PSB1bmRlZmluZWQpIHtcbiAgICAgIGNvbnN0IGNoYXIgPSBoZXhbaGldICsgaGV4W2hpICsgMV07XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoJ2hleCBzdHJpbmcgZXhwZWN0ZWQsIGdvdCBub24taGV4IGNoYXJhY3RlciBcIicgKyBjaGFyICsgJ1wiIGF0IGluZGV4ICcgKyBoaSk7XG4gICAgfVxuICAgIGFycmF5W2FpXSA9IG4xICogMTYgKyBuMjsgLy8gbXVsdGlwbHkgZmlyc3Qgb2N0ZXQsIGUuZy4gJ2EzJyA9PiAxMCoxNiszID0+IDE2MCArIDMgPT4gMTYzXG4gIH1cbiAgcmV0dXJuIGFycmF5O1xufVxuXG4vLyBUaGVyZSBpcyBubyBzZXRJbW1lZGlhdGUgaW4gYnJvd3NlciBhbmQgc2V0VGltZW91dCBpcyBzbG93LlxuLy8gY2FsbCBvZiBhc3luYyBmbiB3aWxsIHJldHVybiBQcm9taXNlLCB3aGljaCB3aWxsIGJlIGZ1bGxmaWxlZCBvbmx5IG9uXG4vLyBuZXh0IHNjaGVkdWxlciBxdWV1ZSBwcm9jZXNzaW5nIHN0ZXAgYW5kIHRoaXMgaXMgZXhhY3RseSB3aGF0IHdlIG5lZWQuXG5leHBvcnQgY29uc3QgbmV4dFRpY2sgPSBhc3luYyAoKTogUHJvbWlzZTx2b2lkPiA9PiB7fTtcblxuLy8gUmV0dXJucyBjb250cm9sIHRvIHRocmVhZCBlYWNoICd0aWNrJyBtcyB0byBhdm9pZCBibG9ja2luZ1xuZXhwb3J0IGFzeW5jIGZ1bmN0aW9uIGFzeW5jTG9vcChcbiAgaXRlcnM6IG51bWJlcixcbiAgdGljazogbnVtYmVyLFxuICBjYjogKGk6IG51bWJlcikgPT4gdm9pZFxuKTogUHJvbWlzZTx2b2lkPiB7XG4gIGxldCB0cyA9IERhdGUubm93KCk7XG4gIGZvciAobGV0IGkgPSAwOyBpIDwgaXRlcnM7IGkrKykge1xuICAgIGNiKGkpO1xuICAgIC8vIERhdGUubm93KCkgaXMgbm90IG1vbm90b25pYywgc28gaW4gY2FzZSBpZiBjbG9jayBnb2VzIGJhY2t3YXJkcyB3ZSByZXR1cm4gcmV0dXJuIGNvbnRyb2wgdG9vXG4gICAgY29uc3QgZGlmZiA9IERhdGUubm93KCkgLSB0cztcbiAgICBpZiAoZGlmZiA+PSAwICYmIGRpZmYgPCB0aWNrKSBjb250aW51ZTtcbiAgICBhd2FpdCBuZXh0VGljaygpO1xuICAgIHRzICs9IGRpZmY7XG4gIH1cbn1cblxuLy8gR2xvYmFsIHN5bWJvbHMgaW4gYm90aCBicm93c2VycyBhbmQgTm9kZS5qcyBzaW5jZSB2MTFcbi8vIFNlZSBodHRwczovL2dpdGh1Yi5jb20vbWljcm9zb2Z0L1R5cGVTY3JpcHQvaXNzdWVzLzMxNTM1XG5kZWNsYXJlIGNvbnN0IFRleHRFbmNvZGVyOiBhbnk7XG5cbi8qKlxuICogQ29udmVydCBKUyBzdHJpbmcgdG8gYnl0ZSBhcnJheS5cbiAqIEBleGFtcGxlIHV0ZjhUb0J5dGVzKCdhYmMnKSAvLyBuZXcgVWludDhBcnJheShbOTcsIDk4LCA5OV0pXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiB1dGY4VG9CeXRlcyhzdHI6IHN0cmluZyk6IFVpbnQ4QXJyYXkge1xuICBpZiAodHlwZW9mIHN0ciAhPT0gJ3N0cmluZycpIHRocm93IG5ldyBFcnJvcigndXRmOFRvQnl0ZXMgZXhwZWN0ZWQgc3RyaW5nLCBnb3QgJyArIHR5cGVvZiBzdHIpO1xuICByZXR1cm4gbmV3IFVpbnQ4QXJyYXkobmV3IFRleHRFbmNvZGVyKCkuZW5jb2RlKHN0cikpOyAvLyBodHRwczovL2J1Z3ppbC5sYS8xNjgxODA5XG59XG5cbi8qKiBBY2NlcHRlZCBpbnB1dCBvZiBoYXNoIGZ1bmN0aW9ucy4gU3RyaW5ncyBhcmUgY29udmVydGVkIHRvIGJ5dGUgYXJyYXlzLiAqL1xuZXhwb3J0IHR5cGUgSW5wdXQgPSBVaW50OEFycmF5IHwgc3RyaW5nO1xuLyoqXG4gKiBOb3JtYWxpemVzIChub24taGV4KSBzdHJpbmcgb3IgVWludDhBcnJheSB0byBVaW50OEFycmF5LlxuICogV2FybmluZzogd2hlbiBVaW50OEFycmF5IGlzIHBhc3NlZCwgaXQgd291bGQgTk9UIGdldCBjb3BpZWQuXG4gKiBLZWVwIGluIG1pbmQgZm9yIGZ1dHVyZSBtdXRhYmxlIG9wZXJhdGlvbnMuXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiB0b0J5dGVzKGRhdGE6IElucHV0KTogVWludDhBcnJheSB7XG4gIGlmICh0eXBlb2YgZGF0YSA9PT0gJ3N0cmluZycpIGRhdGEgPSB1dGY4VG9CeXRlcyhkYXRhKTtcbiAgYWJ5dGVzKGRhdGEpO1xuICByZXR1cm4gZGF0YTtcbn1cblxuLyoqXG4gKiBDb3BpZXMgc2V2ZXJhbCBVaW50OEFycmF5cyBpbnRvIG9uZS5cbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGNvbmNhdEJ5dGVzKC4uLmFycmF5czogVWludDhBcnJheVtdKTogVWludDhBcnJheSB7XG4gIGxldCBzdW0gPSAwO1xuICBmb3IgKGxldCBpID0gMDsgaSA8IGFycmF5cy5sZW5ndGg7IGkrKykge1xuICAgIGNvbnN0IGEgPSBhcnJheXNbaV07XG4gICAgYWJ5dGVzKGEpO1xuICAgIHN1bSArPSBhLmxlbmd0aDtcbiAgfVxuICBjb25zdCByZXMgPSBuZXcgVWludDhBcnJheShzdW0pO1xuICBmb3IgKGxldCBpID0gMCwgcGFkID0gMDsgaSA8IGFycmF5cy5sZW5ndGg7IGkrKykge1xuICAgIGNvbnN0IGEgPSBhcnJheXNbaV07XG4gICAgcmVzLnNldChhLCBwYWQpO1xuICAgIHBhZCArPSBhLmxlbmd0aDtcbiAgfVxuICByZXR1cm4gcmVzO1xufVxuXG4vLyBGb3IgcnVudGltZSBjaGVjayBpZiBjbGFzcyBpbXBsZW1lbnRzIGludGVyZmFjZVxuZXhwb3J0IGFic3RyYWN0IGNsYXNzIEhhc2g8VCBleHRlbmRzIEhhc2g8VD4+IHtcbiAgYWJzdHJhY3QgYmxvY2tMZW46IG51bWJlcjsgLy8gQnl0ZXMgcGVyIGJsb2NrXG4gIGFic3RyYWN0IG91dHB1dExlbjogbnVtYmVyOyAvLyBCeXRlcyBpbiBvdXRwdXRcbiAgYWJzdHJhY3QgdXBkYXRlKGJ1ZjogSW5wdXQpOiB0aGlzO1xuICAvLyBXcml0ZXMgZGlnZXN0IGludG8gYnVmXG4gIGFic3RyYWN0IGRpZ2VzdEludG8oYnVmOiBVaW50OEFycmF5KTogdm9pZDtcbiAgYWJzdHJhY3QgZGlnZXN0KCk6IFVpbnQ4QXJyYXk7XG4gIC8qKlxuICAgKiBSZXNldHMgaW50ZXJuYWwgc3RhdGUuIE1ha2VzIEhhc2ggaW5zdGFuY2UgdW51c2FibGUuXG4gICAqIFJlc2V0IGlzIGltcG9zc2libGUgZm9yIGtleWVkIGhhc2hlcyBpZiBrZXkgaXMgY29uc3VtZWQgaW50byBzdGF0ZS4gSWYgZGlnZXN0IGlzIG5vdCBjb25zdW1lZFxuICAgKiBieSB1c2VyLCB0aGV5IHdpbGwgbmVlZCB0byBtYW51YWxseSBjYWxsIGBkZXN0cm95KClgIHdoZW4gemVyb2luZyBpcyBuZWNlc3NhcnkuXG4gICAqL1xuICBhYnN0cmFjdCBkZXN0cm95KCk6IHZvaWQ7XG4gIC8qKlxuICAgKiBDbG9uZXMgaGFzaCBpbnN0YW5jZS4gVW5zYWZlOiBkb2Vzbid0IGNoZWNrIHdoZXRoZXIgYHRvYCBpcyB2YWxpZC4gQ2FuIGJlIHVzZWQgYXMgYGNsb25lKClgXG4gICAqIHdoZW4gbm8gb3B0aW9ucyBhcmUgcGFzc2VkLlxuICAgKiBSZWFzb25zIHRvIHVzZSBgX2Nsb25lSW50b2AgaW5zdGVhZCBvZiBjbG9uZTogMSkgcGVyZm9ybWFuY2UgMikgcmV1c2UgaW5zdGFuY2UgPT4gYWxsIGludGVybmFsXG4gICAqIGJ1ZmZlcnMgYXJlIG92ZXJ3cml0dGVuID0+IGNhdXNlcyBidWZmZXIgb3ZlcndyaXRlIHdoaWNoIGlzIHVzZWQgZm9yIGRpZ2VzdCBpbiBzb21lIGNhc2VzLlxuICAgKiBUaGVyZSBhcmUgbm8gZ3VhcmFudGVlcyBmb3IgY2xlYW4tdXAgYmVjYXVzZSBpdCdzIGltcG9zc2libGUgaW4gSlMuXG4gICAqL1xuICBhYnN0cmFjdCBfY2xvbmVJbnRvKHRvPzogVCk6IFQ7XG4gIC8vIFNhZmUgdmVyc2lvbiB0aGF0IGNsb25lcyBpbnRlcm5hbCBzdGF0ZVxuICBjbG9uZSgpOiBUIHtcbiAgICByZXR1cm4gdGhpcy5fY2xvbmVJbnRvKCk7XG4gIH1cbn1cblxuLyoqXG4gKiBYT0Y6IHN0cmVhbWluZyBBUEkgdG8gcmVhZCBkaWdlc3QgaW4gY2h1bmtzLlxuICogU2FtZSBhcyAnc3F1ZWV6ZScgaW4ga2VjY2FrL2sxMiBhbmQgJ3NlZWsnIGluIGJsYWtlMywgYnV0IG1vcmUgZ2VuZXJpYyBuYW1lLlxuICogV2hlbiBoYXNoIHVzZWQgaW4gWE9GIG1vZGUgaXQgaXMgdXAgdG8gdXNlciB0byBjYWxsICcuZGVzdHJveScgYWZ0ZXJ3YXJkcywgc2luY2Ugd2UgY2Fubm90XG4gKiBkZXN0cm95IHN0YXRlLCBuZXh0IGNhbGwgY2FuIHJlcXVpcmUgbW9yZSBieXRlcy5cbiAqL1xuZXhwb3J0IHR5cGUgSGFzaFhPRjxUIGV4dGVuZHMgSGFzaDxUPj4gPSBIYXNoPFQ+ICYge1xuICB4b2YoYnl0ZXM6IG51bWJlcik6IFVpbnQ4QXJyYXk7IC8vIFJlYWQgJ2J5dGVzJyBieXRlcyBmcm9tIGRpZ2VzdCBzdHJlYW1cbiAgeG9mSW50byhidWY6IFVpbnQ4QXJyYXkpOiBVaW50OEFycmF5OyAvLyByZWFkIGJ1Zi5sZW5ndGggYnl0ZXMgZnJvbSBkaWdlc3Qgc3RyZWFtIGludG8gYnVmXG59O1xuXG50eXBlIEVtcHR5T2JqID0ge307XG5leHBvcnQgZnVuY3Rpb24gY2hlY2tPcHRzPFQxIGV4dGVuZHMgRW1wdHlPYmosIFQyIGV4dGVuZHMgRW1wdHlPYmo+KFxuICBkZWZhdWx0czogVDEsXG4gIG9wdHM/OiBUMlxuKTogVDEgJiBUMiB7XG4gIGlmIChvcHRzICE9PSB1bmRlZmluZWQgJiYge30udG9TdHJpbmcuY2FsbChvcHRzKSAhPT0gJ1tvYmplY3QgT2JqZWN0XScpXG4gICAgdGhyb3cgbmV3IEVycm9yKCdPcHRpb25zIHNob3VsZCBiZSBvYmplY3Qgb3IgdW5kZWZpbmVkJyk7XG4gIGNvbnN0IG1lcmdlZCA9IE9iamVjdC5hc3NpZ24oZGVmYXVsdHMsIG9wdHMpO1xuICByZXR1cm4gbWVyZ2VkIGFzIFQxICYgVDI7XG59XG5cbmV4cG9ydCB0eXBlIENIYXNoID0gUmV0dXJuVHlwZTx0eXBlb2Ygd3JhcENvbnN0cnVjdG9yPjtcbmV4cG9ydCB0eXBlIENIYXNoTyA9IFJldHVyblR5cGU8dHlwZW9mIHdyYXBDb25zdHJ1Y3RvcldpdGhPcHRzPjtcbmV4cG9ydCB0eXBlIENIYXNoWE8gPSBSZXR1cm5UeXBlPHR5cGVvZiB3cmFwWE9GQ29uc3RydWN0b3JXaXRoT3B0cz47XG5cbmV4cG9ydCBmdW5jdGlvbiB3cmFwQ29uc3RydWN0b3I8VCBleHRlbmRzIEhhc2g8VD4+KFxuICBoYXNoQ29uczogKCkgPT4gSGFzaDxUPlxuKToge1xuICAobXNnOiBJbnB1dCk6IFVpbnQ4QXJyYXk7XG4gIG91dHB1dExlbjogbnVtYmVyO1xuICBibG9ja0xlbjogbnVtYmVyO1xuICBjcmVhdGUoKTogSGFzaDxUPjtcbn0ge1xuICBjb25zdCBoYXNoQyA9IChtc2c6IElucHV0KTogVWludDhBcnJheSA9PiBoYXNoQ29ucygpLnVwZGF0ZSh0b0J5dGVzKG1zZykpLmRpZ2VzdCgpO1xuICBjb25zdCB0bXAgPSBoYXNoQ29ucygpO1xuICBoYXNoQy5vdXRwdXRMZW4gPSB0bXAub3V0cHV0TGVuO1xuICBoYXNoQy5ibG9ja0xlbiA9IHRtcC5ibG9ja0xlbjtcbiAgaGFzaEMuY3JlYXRlID0gKCkgPT4gaGFzaENvbnMoKTtcbiAgcmV0dXJuIGhhc2hDO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gd3JhcENvbnN0cnVjdG9yV2l0aE9wdHM8SCBleHRlbmRzIEhhc2g8SD4sIFQgZXh0ZW5kcyBPYmplY3Q+KFxuICBoYXNoQ29uczogKG9wdHM/OiBUKSA9PiBIYXNoPEg+XG4pOiB7XG4gIChtc2c6IElucHV0LCBvcHRzPzogVCk6IFVpbnQ4QXJyYXk7XG4gIG91dHB1dExlbjogbnVtYmVyO1xuICBibG9ja0xlbjogbnVtYmVyO1xuICBjcmVhdGUob3B0czogVCk6IEhhc2g8SD47XG59IHtcbiAgY29uc3QgaGFzaEMgPSAobXNnOiBJbnB1dCwgb3B0cz86IFQpOiBVaW50OEFycmF5ID0+IGhhc2hDb25zKG9wdHMpLnVwZGF0ZSh0b0J5dGVzKG1zZykpLmRpZ2VzdCgpO1xuICBjb25zdCB0bXAgPSBoYXNoQ29ucyh7fSBhcyBUKTtcbiAgaGFzaEMub3V0cHV0TGVuID0gdG1wLm91dHB1dExlbjtcbiAgaGFzaEMuYmxvY2tMZW4gPSB0bXAuYmxvY2tMZW47XG4gIGhhc2hDLmNyZWF0ZSA9IChvcHRzOiBUKSA9PiBoYXNoQ29ucyhvcHRzKTtcbiAgcmV0dXJuIGhhc2hDO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gd3JhcFhPRkNvbnN0cnVjdG9yV2l0aE9wdHM8SCBleHRlbmRzIEhhc2hYT0Y8SD4sIFQgZXh0ZW5kcyBPYmplY3Q+KFxuICBoYXNoQ29uczogKG9wdHM/OiBUKSA9PiBIYXNoWE9GPEg+XG4pOiB7XG4gIChtc2c6IElucHV0LCBvcHRzPzogVCk6IFVpbnQ4QXJyYXk7XG4gIG91dHB1dExlbjogbnVtYmVyO1xuICBibG9ja0xlbjogbnVtYmVyO1xuICBjcmVhdGUob3B0czogVCk6IEhhc2hYT0Y8SD47XG59IHtcbiAgY29uc3QgaGFzaEMgPSAobXNnOiBJbnB1dCwgb3B0cz86IFQpOiBVaW50OEFycmF5ID0+IGhhc2hDb25zKG9wdHMpLnVwZGF0ZSh0b0J5dGVzKG1zZykpLmRpZ2VzdCgpO1xuICBjb25zdCB0bXAgPSBoYXNoQ29ucyh7fSBhcyBUKTtcbiAgaGFzaEMub3V0cHV0TGVuID0gdG1wLm91dHB1dExlbjtcbiAgaGFzaEMuYmxvY2tMZW4gPSB0bXAuYmxvY2tMZW47XG4gIGhhc2hDLmNyZWF0ZSA9IChvcHRzOiBUKSA9PiBoYXNoQ29ucyhvcHRzKTtcbiAgcmV0dXJuIGhhc2hDO1xufVxuXG4vKipcbiAqIFNlY3VyZSBQUk5HLiBVc2VzIGBjcnlwdG8uZ2V0UmFuZG9tVmFsdWVzYCwgd2hpY2ggZGVmZXJzIHRvIE9TLlxuICovXG5leHBvcnQgZnVuY3Rpb24gcmFuZG9tQnl0ZXMoYnl0ZXNMZW5ndGggPSAzMik6IFVpbnQ4QXJyYXkge1xuICBpZiAoY3J5cHRvICYmIHR5cGVvZiBjcnlwdG8uZ2V0UmFuZG9tVmFsdWVzID09PSAnZnVuY3Rpb24nKSB7XG4gICAgcmV0dXJuIGNyeXB0by5nZXRSYW5kb21WYWx1ZXMobmV3IFVpbnQ4QXJyYXkoYnl0ZXNMZW5ndGgpKTtcbiAgfVxuICAvLyBMZWdhY3kgTm9kZS5qcyBjb21wYXRpYmlsaXR5XG4gIGlmIChjcnlwdG8gJiYgdHlwZW9mIGNyeXB0by5yYW5kb21CeXRlcyA9PT0gJ2Z1bmN0aW9uJykge1xuICAgIHJldHVybiBjcnlwdG8ucmFuZG9tQnl0ZXMoYnl0ZXNMZW5ndGgpO1xuICB9XG4gIHRocm93IG5ldyBFcnJvcignY3J5cHRvLmdldFJhbmRvbVZhbHVlcyBtdXN0IGJlIGRlZmluZWQnKTtcbn1cbiIsICJpbXBvcnQgeyBhaGFzaCwgYWJ5dGVzLCBhZXhpc3RzIH0gZnJvbSAnLi9fYXNzZXJ0LmpzJztcbmltcG9ydCB7IEhhc2gsIENIYXNoLCBJbnB1dCwgdG9CeXRlcyB9IGZyb20gJy4vdXRpbHMuanMnO1xuXG4vKipcbiAqIEhNQUM6IFJGQzIxMDQgbWVzc2FnZSBhdXRoZW50aWNhdGlvbiBjb2RlLlxuICogQG1vZHVsZVxuICovXG5cbmV4cG9ydCBjbGFzcyBITUFDPFQgZXh0ZW5kcyBIYXNoPFQ+PiBleHRlbmRzIEhhc2g8SE1BQzxUPj4ge1xuICBvSGFzaDogVDtcbiAgaUhhc2g6IFQ7XG4gIGJsb2NrTGVuOiBudW1iZXI7XG4gIG91dHB1dExlbjogbnVtYmVyO1xuICBwcml2YXRlIGZpbmlzaGVkID0gZmFsc2U7XG4gIHByaXZhdGUgZGVzdHJveWVkID0gZmFsc2U7XG5cbiAgY29uc3RydWN0b3IoaGFzaDogQ0hhc2gsIF9rZXk6IElucHV0KSB7XG4gICAgc3VwZXIoKTtcbiAgICBhaGFzaChoYXNoKTtcbiAgICBjb25zdCBrZXkgPSB0b0J5dGVzKF9rZXkpO1xuICAgIHRoaXMuaUhhc2ggPSBoYXNoLmNyZWF0ZSgpIGFzIFQ7XG4gICAgaWYgKHR5cGVvZiB0aGlzLmlIYXNoLnVwZGF0ZSAhPT0gJ2Z1bmN0aW9uJylcbiAgICAgIHRocm93IG5ldyBFcnJvcignRXhwZWN0ZWQgaW5zdGFuY2Ugb2YgY2xhc3Mgd2hpY2ggZXh0ZW5kcyB1dGlscy5IYXNoJyk7XG4gICAgdGhpcy5ibG9ja0xlbiA9IHRoaXMuaUhhc2guYmxvY2tMZW47XG4gICAgdGhpcy5vdXRwdXRMZW4gPSB0aGlzLmlIYXNoLm91dHB1dExlbjtcbiAgICBjb25zdCBibG9ja0xlbiA9IHRoaXMuYmxvY2tMZW47XG4gICAgY29uc3QgcGFkID0gbmV3IFVpbnQ4QXJyYXkoYmxvY2tMZW4pO1xuICAgIC8vIGJsb2NrTGVuIGNhbiBiZSBiaWdnZXIgdGhhbiBvdXRwdXRMZW5cbiAgICBwYWQuc2V0KGtleS5sZW5ndGggPiBibG9ja0xlbiA/IGhhc2guY3JlYXRlKCkudXBkYXRlKGtleSkuZGlnZXN0KCkgOiBrZXkpO1xuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgcGFkLmxlbmd0aDsgaSsrKSBwYWRbaV0gXj0gMHgzNjtcbiAgICB0aGlzLmlIYXNoLnVwZGF0ZShwYWQpO1xuICAgIC8vIEJ5IGRvaW5nIHVwZGF0ZSAocHJvY2Vzc2luZyBvZiBmaXJzdCBibG9jaykgb2Ygb3V0ZXIgaGFzaCBoZXJlIHdlIGNhbiByZS11c2UgaXQgYmV0d2VlbiBtdWx0aXBsZSBjYWxscyB2aWEgY2xvbmVcbiAgICB0aGlzLm9IYXNoID0gaGFzaC5jcmVhdGUoKSBhcyBUO1xuICAgIC8vIFVuZG8gaW50ZXJuYWwgWE9SICYmIGFwcGx5IG91dGVyIFhPUlxuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgcGFkLmxlbmd0aDsgaSsrKSBwYWRbaV0gXj0gMHgzNiBeIDB4NWM7XG4gICAgdGhpcy5vSGFzaC51cGRhdGUocGFkKTtcbiAgICBwYWQuZmlsbCgwKTtcbiAgfVxuICB1cGRhdGUoYnVmOiBJbnB1dCk6IHRoaXMge1xuICAgIGFleGlzdHModGhpcyk7XG4gICAgdGhpcy5pSGFzaC51cGRhdGUoYnVmKTtcbiAgICByZXR1cm4gdGhpcztcbiAgfVxuICBkaWdlc3RJbnRvKG91dDogVWludDhBcnJheSk6IHZvaWQge1xuICAgIGFleGlzdHModGhpcyk7XG4gICAgYWJ5dGVzKG91dCwgdGhpcy5vdXRwdXRMZW4pO1xuICAgIHRoaXMuZmluaXNoZWQgPSB0cnVlO1xuICAgIHRoaXMuaUhhc2guZGlnZXN0SW50byhvdXQpO1xuICAgIHRoaXMub0hhc2gudXBkYXRlKG91dCk7XG4gICAgdGhpcy5vSGFzaC5kaWdlc3RJbnRvKG91dCk7XG4gICAgdGhpcy5kZXN0cm95KCk7XG4gIH1cbiAgZGlnZXN0KCk6IFVpbnQ4QXJyYXkge1xuICAgIGNvbnN0IG91dCA9IG5ldyBVaW50OEFycmF5KHRoaXMub0hhc2gub3V0cHV0TGVuKTtcbiAgICB0aGlzLmRpZ2VzdEludG8ob3V0KTtcbiAgICByZXR1cm4gb3V0O1xuICB9XG4gIF9jbG9uZUludG8odG8/OiBITUFDPFQ+KTogSE1BQzxUPiB7XG4gICAgLy8gQ3JlYXRlIG5ldyBpbnN0YW5jZSB3aXRob3V0IGNhbGxpbmcgY29uc3RydWN0b3Igc2luY2Uga2V5IGFscmVhZHkgaW4gc3RhdGUgYW5kIHdlIGRvbid0IGtub3cgaXQuXG4gICAgdG8gfHw9IE9iamVjdC5jcmVhdGUoT2JqZWN0LmdldFByb3RvdHlwZU9mKHRoaXMpLCB7fSk7XG4gICAgY29uc3QgeyBvSGFzaCwgaUhhc2gsIGZpbmlzaGVkLCBkZXN0cm95ZWQsIGJsb2NrTGVuLCBvdXRwdXRMZW4gfSA9IHRoaXM7XG4gICAgdG8gPSB0byBhcyB0aGlzO1xuICAgIHRvLmZpbmlzaGVkID0gZmluaXNoZWQ7XG4gICAgdG8uZGVzdHJveWVkID0gZGVzdHJveWVkO1xuICAgIHRvLmJsb2NrTGVuID0gYmxvY2tMZW47XG4gICAgdG8ub3V0cHV0TGVuID0gb3V0cHV0TGVuO1xuICAgIHRvLm9IYXNoID0gb0hhc2guX2Nsb25lSW50byh0by5vSGFzaCk7XG4gICAgdG8uaUhhc2ggPSBpSGFzaC5fY2xvbmVJbnRvKHRvLmlIYXNoKTtcbiAgICByZXR1cm4gdG87XG4gIH1cbiAgZGVzdHJveSgpOiB2b2lkIHtcbiAgICB0aGlzLmRlc3Ryb3llZCA9IHRydWU7XG4gICAgdGhpcy5vSGFzaC5kZXN0cm95KCk7XG4gICAgdGhpcy5pSGFzaC5kZXN0cm95KCk7XG4gIH1cbn1cblxuLyoqXG4gKiBITUFDOiBSRkMyMTA0IG1lc3NhZ2UgYXV0aGVudGljYXRpb24gY29kZS5cbiAqIEBwYXJhbSBoYXNoIC0gZnVuY3Rpb24gdGhhdCB3b3VsZCBiZSB1c2VkIGUuZy4gc2hhMjU2XG4gKiBAcGFyYW0ga2V5IC0gbWVzc2FnZSBrZXlcbiAqIEBwYXJhbSBtZXNzYWdlIC0gbWVzc2FnZSBkYXRhXG4gKiBAZXhhbXBsZVxuICogaW1wb3J0IHsgaG1hYyB9IGZyb20gJ0Bub2JsZS9oYXNoZXMvaG1hYyc7XG4gKiBpbXBvcnQgeyBzaGEyNTYgfSBmcm9tICdAbm9ibGUvaGFzaGVzL3NoYTInO1xuICogY29uc3QgbWFjMSA9IGhtYWMoc2hhMjU2LCAna2V5JywgJ21lc3NhZ2UnKTtcbiAqL1xuZXhwb3J0IGNvbnN0IGhtYWM6IHtcbiAgKGhhc2g6IENIYXNoLCBrZXk6IElucHV0LCBtZXNzYWdlOiBJbnB1dCk6IFVpbnQ4QXJyYXk7XG4gIGNyZWF0ZShoYXNoOiBDSGFzaCwga2V5OiBJbnB1dCk6IEhNQUM8YW55Pjtcbn0gPSAoaGFzaDogQ0hhc2gsIGtleTogSW5wdXQsIG1lc3NhZ2U6IElucHV0KTogVWludDhBcnJheSA9PlxuICBuZXcgSE1BQzxhbnk+KGhhc2gsIGtleSkudXBkYXRlKG1lc3NhZ2UpLmRpZ2VzdCgpO1xuaG1hYy5jcmVhdGUgPSAoaGFzaDogQ0hhc2gsIGtleTogSW5wdXQpID0+IG5ldyBITUFDPGFueT4oaGFzaCwga2V5KTtcbiIsICJpbXBvcnQgeyBhaGFzaCwgYW51bWJlciB9IGZyb20gJy4vX2Fzc2VydC5qcyc7XG5pbXBvcnQgeyBDSGFzaCwgSW5wdXQsIHRvQnl0ZXMgfSBmcm9tICcuL3V0aWxzLmpzJztcbmltcG9ydCB7IGhtYWMgfSBmcm9tICcuL2htYWMuanMnO1xuXG4vKipcbiAqIEhLREYgKFJGQyA1ODY5KTogZXh0cmFjdCArIGV4cGFuZCBpbiBvbmUgc3RlcC5cbiAqIFNlZSBodHRwczovL3NvYXRvay5ibG9nLzIwMjEvMTEvMTcvdW5kZXJzdGFuZGluZy1oa2RmLy5cbiAqIEBtb2R1bGVcbiAqL1xuXG4vKipcbiAqIEhLREYtZXh0cmFjdCBmcm9tIHNwZWMuIExlc3MgaW1wb3J0YW50IHBhcnQuIGBIS0RGLUV4dHJhY3QoSUtNLCBzYWx0KSAtPiBQUktgXG4gKiBBcmd1bWVudHMgcG9zaXRpb24gZGlmZmVycyBmcm9tIHNwZWMgKElLTSBpcyBmaXJzdCBvbmUsIHNpbmNlIGl0IGlzIG5vdCBvcHRpb25hbClcbiAqIEBwYXJhbSBoYXNoIC0gaGFzaCBmdW5jdGlvbiB0aGF0IHdvdWxkIGJlIHVzZWQgKGUuZy4gc2hhMjU2KVxuICogQHBhcmFtIGlrbSAtIGlucHV0IGtleWluZyBtYXRlcmlhbCwgdGhlIGluaXRpYWwga2V5XG4gKiBAcGFyYW0gc2FsdCAtIG9wdGlvbmFsIHNhbHQgdmFsdWUgKGEgbm9uLXNlY3JldCByYW5kb20gdmFsdWUpXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBleHRyYWN0KGhhc2g6IENIYXNoLCBpa206IElucHV0LCBzYWx0PzogSW5wdXQpOiBVaW50OEFycmF5IHtcbiAgYWhhc2goaGFzaCk7XG4gIC8vIE5PVEU6IHNvbWUgbGlicmFyaWVzIHRyZWF0IHplcm8tbGVuZ3RoIGFycmF5IGFzICdub3QgcHJvdmlkZWQnO1xuICAvLyB3ZSBkb24ndCwgc2luY2Ugd2UgaGF2ZSB1bmRlZmluZWQgYXMgJ25vdCBwcm92aWRlZCdcbiAgLy8gaHR0cHM6Ly9naXRodWIuY29tL1J1c3RDcnlwdG8vS0RGcy9pc3N1ZXMvMTVcbiAgaWYgKHNhbHQgPT09IHVuZGVmaW5lZCkgc2FsdCA9IG5ldyBVaW50OEFycmF5KGhhc2gub3V0cHV0TGVuKTtcbiAgcmV0dXJuIGhtYWMoaGFzaCwgdG9CeXRlcyhzYWx0KSwgdG9CeXRlcyhpa20pKTtcbn1cblxuY29uc3QgSEtERl9DT1VOVEVSID0gLyogQF9fUFVSRV9fICovIG5ldyBVaW50OEFycmF5KFswXSk7XG5jb25zdCBFTVBUWV9CVUZGRVIgPSAvKiBAX19QVVJFX18gKi8gbmV3IFVpbnQ4QXJyYXkoKTtcblxuLyoqXG4gKiBIS0RGLWV4cGFuZCBmcm9tIHRoZSBzcGVjLiBUaGUgbW9zdCBpbXBvcnRhbnQgcGFydC4gYEhLREYtRXhwYW5kKFBSSywgaW5mbywgTCkgLT4gT0tNYFxuICogQHBhcmFtIGhhc2ggLSBoYXNoIGZ1bmN0aW9uIHRoYXQgd291bGQgYmUgdXNlZCAoZS5nLiBzaGEyNTYpXG4gKiBAcGFyYW0gcHJrIC0gYSBwc2V1ZG9yYW5kb20ga2V5IG9mIGF0IGxlYXN0IEhhc2hMZW4gb2N0ZXRzICh1c3VhbGx5LCB0aGUgb3V0cHV0IGZyb20gdGhlIGV4dHJhY3Qgc3RlcClcbiAqIEBwYXJhbSBpbmZvIC0gb3B0aW9uYWwgY29udGV4dCBhbmQgYXBwbGljYXRpb24gc3BlY2lmaWMgaW5mb3JtYXRpb24gKGNhbiBiZSBhIHplcm8tbGVuZ3RoIHN0cmluZylcbiAqIEBwYXJhbSBsZW5ndGggLSBsZW5ndGggb2Ygb3V0cHV0IGtleWluZyBtYXRlcmlhbCBpbiBieXRlc1xuICovXG5leHBvcnQgZnVuY3Rpb24gZXhwYW5kKGhhc2g6IENIYXNoLCBwcms6IElucHV0LCBpbmZvPzogSW5wdXQsIGxlbmd0aDogbnVtYmVyID0gMzIpOiBVaW50OEFycmF5IHtcbiAgYWhhc2goaGFzaCk7XG4gIGFudW1iZXIobGVuZ3RoKTtcbiAgaWYgKGxlbmd0aCA+IDI1NSAqIGhhc2gub3V0cHV0TGVuKSB0aHJvdyBuZXcgRXJyb3IoJ0xlbmd0aCBzaG91bGQgYmUgPD0gMjU1Kkhhc2hMZW4nKTtcbiAgY29uc3QgYmxvY2tzID0gTWF0aC5jZWlsKGxlbmd0aCAvIGhhc2gub3V0cHV0TGVuKTtcbiAgaWYgKGluZm8gPT09IHVuZGVmaW5lZCkgaW5mbyA9IEVNUFRZX0JVRkZFUjtcbiAgLy8gZmlyc3QgTChlbmd0aCkgb2N0ZXRzIG9mIFRcbiAgY29uc3Qgb2ttID0gbmV3IFVpbnQ4QXJyYXkoYmxvY2tzICogaGFzaC5vdXRwdXRMZW4pO1xuICAvLyBSZS11c2UgSE1BQyBpbnN0YW5jZSBiZXR3ZWVuIGJsb2Nrc1xuICBjb25zdCBITUFDID0gaG1hYy5jcmVhdGUoaGFzaCwgcHJrKTtcbiAgY29uc3QgSE1BQ1RtcCA9IEhNQUMuX2Nsb25lSW50bygpO1xuICBjb25zdCBUID0gbmV3IFVpbnQ4QXJyYXkoSE1BQy5vdXRwdXRMZW4pO1xuICBmb3IgKGxldCBjb3VudGVyID0gMDsgY291bnRlciA8IGJsb2NrczsgY291bnRlcisrKSB7XG4gICAgSEtERl9DT1VOVEVSWzBdID0gY291bnRlciArIDE7XG4gICAgLy8gVCgwKSA9IGVtcHR5IHN0cmluZyAoemVybyBsZW5ndGgpXG4gICAgLy8gVChOKSA9IEhNQUMtSGFzaChQUkssIFQoTi0xKSB8IGluZm8gfCBOKVxuICAgIEhNQUNUbXAudXBkYXRlKGNvdW50ZXIgPT09IDAgPyBFTVBUWV9CVUZGRVIgOiBUKVxuICAgICAgLnVwZGF0ZShpbmZvKVxuICAgICAgLnVwZGF0ZShIS0RGX0NPVU5URVIpXG4gICAgICAuZGlnZXN0SW50byhUKTtcbiAgICBva20uc2V0KFQsIGhhc2gub3V0cHV0TGVuICogY291bnRlcik7XG4gICAgSE1BQy5fY2xvbmVJbnRvKEhNQUNUbXApO1xuICB9XG4gIEhNQUMuZGVzdHJveSgpO1xuICBITUFDVG1wLmRlc3Ryb3koKTtcbiAgVC5maWxsKDApO1xuICBIS0RGX0NPVU5URVIuZmlsbCgwKTtcbiAgcmV0dXJuIG9rbS5zbGljZSgwLCBsZW5ndGgpO1xufVxuXG4vKipcbiAqIEhLREYgKFJGQyA1ODY5KTogZGVyaXZlIGtleXMgZnJvbSBhbiBpbml0aWFsIGlucHV0LlxuICogQ29tYmluZXMgaGtkZl9leHRyYWN0ICsgaGtkZl9leHBhbmQgaW4gb25lIHN0ZXBcbiAqIEBwYXJhbSBoYXNoIC0gaGFzaCBmdW5jdGlvbiB0aGF0IHdvdWxkIGJlIHVzZWQgKGUuZy4gc2hhMjU2KVxuICogQHBhcmFtIGlrbSAtIGlucHV0IGtleWluZyBtYXRlcmlhbCwgdGhlIGluaXRpYWwga2V5XG4gKiBAcGFyYW0gc2FsdCAtIG9wdGlvbmFsIHNhbHQgdmFsdWUgKGEgbm9uLXNlY3JldCByYW5kb20gdmFsdWUpXG4gKiBAcGFyYW0gaW5mbyAtIG9wdGlvbmFsIGNvbnRleHQgYW5kIGFwcGxpY2F0aW9uIHNwZWNpZmljIGluZm9ybWF0aW9uIChjYW4gYmUgYSB6ZXJvLWxlbmd0aCBzdHJpbmcpXG4gKiBAcGFyYW0gbGVuZ3RoIC0gbGVuZ3RoIG9mIG91dHB1dCBrZXlpbmcgbWF0ZXJpYWwgaW4gYnl0ZXNcbiAqIEBleGFtcGxlXG4gKiBpbXBvcnQgeyBoa2RmIH0gZnJvbSAnQG5vYmxlL2hhc2hlcy9oa2RmJztcbiAqIGltcG9ydCB7IHNoYTI1NiB9IGZyb20gJ0Bub2JsZS9oYXNoZXMvc2hhMic7XG4gKiBpbXBvcnQgeyByYW5kb21CeXRlcyB9IGZyb20gJ0Bub2JsZS9oYXNoZXMvdXRpbHMnO1xuICogY29uc3QgaW5wdXRLZXkgPSByYW5kb21CeXRlcygzMik7XG4gKiBjb25zdCBzYWx0ID0gcmFuZG9tQnl0ZXMoMzIpO1xuICogY29uc3QgaW5mbyA9ICdhcHBsaWNhdGlvbi1rZXknO1xuICogY29uc3QgaGsxID0gaGtkZihzaGEyNTYsIGlucHV0S2V5LCBzYWx0LCBpbmZvLCAzMik7XG4gKi9cbmV4cG9ydCBjb25zdCBoa2RmID0gKFxuICBoYXNoOiBDSGFzaCxcbiAgaWttOiBJbnB1dCxcbiAgc2FsdDogSW5wdXQgfCB1bmRlZmluZWQsXG4gIGluZm86IElucHV0IHwgdW5kZWZpbmVkLFxuICBsZW5ndGg6IG51bWJlclxuKTogVWludDhBcnJheSA9PiBleHBhbmQoaGFzaCwgZXh0cmFjdChoYXNoLCBpa20sIHNhbHQpLCBpbmZvLCBsZW5ndGgpO1xuIiwgImltcG9ydCB7IGFleGlzdHMsIGFvdXRwdXQgfSBmcm9tICcuL19hc3NlcnQuanMnO1xuaW1wb3J0IHsgSGFzaCwgY3JlYXRlVmlldywgSW5wdXQsIHRvQnl0ZXMgfSBmcm9tICcuL3V0aWxzLmpzJztcblxuLyoqXG4gKiBNZXJrbGUtRGFtZ2FyZCBoYXNoIHV0aWxzLlxuICogQG1vZHVsZVxuICovXG5cbi8qKlxuICogUG9seWZpbGwgZm9yIFNhZmFyaSAxNFxuICovXG5leHBvcnQgZnVuY3Rpb24gc2V0QmlnVWludDY0KFxuICB2aWV3OiBEYXRhVmlldyxcbiAgYnl0ZU9mZnNldDogbnVtYmVyLFxuICB2YWx1ZTogYmlnaW50LFxuICBpc0xFOiBib29sZWFuXG4pOiB2b2lkIHtcbiAgaWYgKHR5cGVvZiB2aWV3LnNldEJpZ1VpbnQ2NCA9PT0gJ2Z1bmN0aW9uJykgcmV0dXJuIHZpZXcuc2V0QmlnVWludDY0KGJ5dGVPZmZzZXQsIHZhbHVlLCBpc0xFKTtcbiAgY29uc3QgXzMybiA9IEJpZ0ludCgzMik7XG4gIGNvbnN0IF91MzJfbWF4ID0gQmlnSW50KDB4ZmZmZmZmZmYpO1xuICBjb25zdCB3aCA9IE51bWJlcigodmFsdWUgPj4gXzMybikgJiBfdTMyX21heCk7XG4gIGNvbnN0IHdsID0gTnVtYmVyKHZhbHVlICYgX3UzMl9tYXgpO1xuICBjb25zdCBoID0gaXNMRSA/IDQgOiAwO1xuICBjb25zdCBsID0gaXNMRSA/IDAgOiA0O1xuICB2aWV3LnNldFVpbnQzMihieXRlT2Zmc2V0ICsgaCwgd2gsIGlzTEUpO1xuICB2aWV3LnNldFVpbnQzMihieXRlT2Zmc2V0ICsgbCwgd2wsIGlzTEUpO1xufVxuXG4vKipcbiAqIENob2ljZTogYSA/IGIgOiBjXG4gKi9cbmV4cG9ydCBjb25zdCBDaGkgPSAoYTogbnVtYmVyLCBiOiBudW1iZXIsIGM6IG51bWJlcik6IG51bWJlciA9PiAoYSAmIGIpIF4gKH5hICYgYyk7XG5cbi8qKlxuICogTWFqb3JpdHkgZnVuY3Rpb24sIHRydWUgaWYgYW55IHR3byBpbnB1dHMgaXMgdHJ1ZVxuICovXG5leHBvcnQgY29uc3QgTWFqID0gKGE6IG51bWJlciwgYjogbnVtYmVyLCBjOiBudW1iZXIpOiBudW1iZXIgPT4gKGEgJiBiKSBeIChhICYgYykgXiAoYiAmIGMpO1xuXG4vKipcbiAqIE1lcmtsZS1EYW1nYXJkIGhhc2ggY29uc3RydWN0aW9uIGJhc2UgY2xhc3MuXG4gKiBDb3VsZCBiZSB1c2VkIHRvIGNyZWF0ZSBNRDUsIFJJUEVNRCwgU0hBMSwgU0hBMi5cbiAqL1xuZXhwb3J0IGFic3RyYWN0IGNsYXNzIEhhc2hNRDxUIGV4dGVuZHMgSGFzaE1EPFQ+PiBleHRlbmRzIEhhc2g8VD4ge1xuICBwcm90ZWN0ZWQgYWJzdHJhY3QgcHJvY2VzcyhidWY6IERhdGFWaWV3LCBvZmZzZXQ6IG51bWJlcik6IHZvaWQ7XG4gIHByb3RlY3RlZCBhYnN0cmFjdCBnZXQoKTogbnVtYmVyW107XG4gIHByb3RlY3RlZCBhYnN0cmFjdCBzZXQoLi4uYXJnczogbnVtYmVyW10pOiB2b2lkO1xuICBhYnN0cmFjdCBkZXN0cm95KCk6IHZvaWQ7XG4gIHByb3RlY3RlZCBhYnN0cmFjdCByb3VuZENsZWFuKCk6IHZvaWQ7XG4gIC8vIEZvciBwYXJ0aWFsIHVwZGF0ZXMgbGVzcyB0aGFuIGJsb2NrIHNpemVcbiAgcHJvdGVjdGVkIGJ1ZmZlcjogVWludDhBcnJheTtcbiAgcHJvdGVjdGVkIHZpZXc6IERhdGFWaWV3O1xuICBwcm90ZWN0ZWQgZmluaXNoZWQgPSBmYWxzZTtcbiAgcHJvdGVjdGVkIGxlbmd0aCA9IDA7XG4gIHByb3RlY3RlZCBwb3MgPSAwO1xuICBwcm90ZWN0ZWQgZGVzdHJveWVkID0gZmFsc2U7XG5cbiAgY29uc3RydWN0b3IoXG4gICAgcmVhZG9ubHkgYmxvY2tMZW46IG51bWJlcixcbiAgICBwdWJsaWMgb3V0cHV0TGVuOiBudW1iZXIsXG4gICAgcmVhZG9ubHkgcGFkT2Zmc2V0OiBudW1iZXIsXG4gICAgcmVhZG9ubHkgaXNMRTogYm9vbGVhblxuICApIHtcbiAgICBzdXBlcigpO1xuICAgIHRoaXMuYnVmZmVyID0gbmV3IFVpbnQ4QXJyYXkoYmxvY2tMZW4pO1xuICAgIHRoaXMudmlldyA9IGNyZWF0ZVZpZXcodGhpcy5idWZmZXIpO1xuICB9XG4gIHVwZGF0ZShkYXRhOiBJbnB1dCk6IHRoaXMge1xuICAgIGFleGlzdHModGhpcyk7XG4gICAgY29uc3QgeyB2aWV3LCBidWZmZXIsIGJsb2NrTGVuIH0gPSB0aGlzO1xuICAgIGRhdGEgPSB0b0J5dGVzKGRhdGEpO1xuICAgIGNvbnN0IGxlbiA9IGRhdGEubGVuZ3RoO1xuICAgIGZvciAobGV0IHBvcyA9IDA7IHBvcyA8IGxlbjsgKSB7XG4gICAgICBjb25zdCB0YWtlID0gTWF0aC5taW4oYmxvY2tMZW4gLSB0aGlzLnBvcywgbGVuIC0gcG9zKTtcbiAgICAgIC8vIEZhc3QgcGF0aDogd2UgaGF2ZSBhdCBsZWFzdCBvbmUgYmxvY2sgaW4gaW5wdXQsIGNhc3QgaXQgdG8gdmlldyBhbmQgcHJvY2Vzc1xuICAgICAgaWYgKHRha2UgPT09IGJsb2NrTGVuKSB7XG4gICAgICAgIGNvbnN0IGRhdGFWaWV3ID0gY3JlYXRlVmlldyhkYXRhKTtcbiAgICAgICAgZm9yICg7IGJsb2NrTGVuIDw9IGxlbiAtIHBvczsgcG9zICs9IGJsb2NrTGVuKSB0aGlzLnByb2Nlc3MoZGF0YVZpZXcsIHBvcyk7XG4gICAgICAgIGNvbnRpbnVlO1xuICAgICAgfVxuICAgICAgYnVmZmVyLnNldChkYXRhLnN1YmFycmF5KHBvcywgcG9zICsgdGFrZSksIHRoaXMucG9zKTtcbiAgICAgIHRoaXMucG9zICs9IHRha2U7XG4gICAgICBwb3MgKz0gdGFrZTtcbiAgICAgIGlmICh0aGlzLnBvcyA9PT0gYmxvY2tMZW4pIHtcbiAgICAgICAgdGhpcy5wcm9jZXNzKHZpZXcsIDApO1xuICAgICAgICB0aGlzLnBvcyA9IDA7XG4gICAgICB9XG4gICAgfVxuICAgIHRoaXMubGVuZ3RoICs9IGRhdGEubGVuZ3RoO1xuICAgIHRoaXMucm91bmRDbGVhbigpO1xuICAgIHJldHVybiB0aGlzO1xuICB9XG4gIGRpZ2VzdEludG8ob3V0OiBVaW50OEFycmF5KTogdm9pZCB7XG4gICAgYWV4aXN0cyh0aGlzKTtcbiAgICBhb3V0cHV0KG91dCwgdGhpcyk7XG4gICAgdGhpcy5maW5pc2hlZCA9IHRydWU7XG4gICAgLy8gUGFkZGluZ1xuICAgIC8vIFdlIGNhbiBhdm9pZCBhbGxvY2F0aW9uIG9mIGJ1ZmZlciBmb3IgcGFkZGluZyBjb21wbGV0ZWx5IGlmIGl0XG4gICAgLy8gd2FzIHByZXZpb3VzbHkgbm90IGFsbG9jYXRlZCBoZXJlLiBCdXQgaXQgd29uJ3QgY2hhbmdlIHBlcmZvcm1hbmNlLlxuICAgIGNvbnN0IHsgYnVmZmVyLCB2aWV3LCBibG9ja0xlbiwgaXNMRSB9ID0gdGhpcztcbiAgICBsZXQgeyBwb3MgfSA9IHRoaXM7XG4gICAgLy8gYXBwZW5kIHRoZSBiaXQgJzEnIHRvIHRoZSBtZXNzYWdlXG4gICAgYnVmZmVyW3BvcysrXSA9IDBiMTAwMDAwMDA7XG4gICAgdGhpcy5idWZmZXIuc3ViYXJyYXkocG9zKS5maWxsKDApO1xuICAgIC8vIHdlIGhhdmUgbGVzcyB0aGFuIHBhZE9mZnNldCBsZWZ0IGluIGJ1ZmZlciwgc28gd2UgY2Fubm90IHB1dCBsZW5ndGggaW5cbiAgICAvLyBjdXJyZW50IGJsb2NrLCBuZWVkIHByb2Nlc3MgaXQgYW5kIHBhZCBhZ2FpblxuICAgIGlmICh0aGlzLnBhZE9mZnNldCA+IGJsb2NrTGVuIC0gcG9zKSB7XG4gICAgICB0aGlzLnByb2Nlc3ModmlldywgMCk7XG4gICAgICBwb3MgPSAwO1xuICAgIH1cbiAgICAvLyBQYWQgdW50aWwgZnVsbCBibG9jayBieXRlIHdpdGggemVyb3NcbiAgICBmb3IgKGxldCBpID0gcG9zOyBpIDwgYmxvY2tMZW47IGkrKykgYnVmZmVyW2ldID0gMDtcbiAgICAvLyBOb3RlOiBzaGE1MTIgcmVxdWlyZXMgbGVuZ3RoIHRvIGJlIDEyOGJpdCBpbnRlZ2VyLCBidXQgbGVuZ3RoIGluIEpTIHdpbGwgb3ZlcmZsb3cgYmVmb3JlIHRoYXRcbiAgICAvLyBZb3UgbmVlZCB0byB3cml0ZSBhcm91bmQgMiBleGFieXRlcyAodTY0X21heCAvIDggLyAoMTAyNCoqNikpIGZvciB0aGlzIHRvIGhhcHBlbi5cbiAgICAvLyBTbyB3ZSBqdXN0IHdyaXRlIGxvd2VzdCA2NCBiaXRzIG9mIHRoYXQgdmFsdWUuXG4gICAgc2V0QmlnVWludDY0KHZpZXcsIGJsb2NrTGVuIC0gOCwgQmlnSW50KHRoaXMubGVuZ3RoICogOCksIGlzTEUpO1xuICAgIHRoaXMucHJvY2Vzcyh2aWV3LCAwKTtcbiAgICBjb25zdCBvdmlldyA9IGNyZWF0ZVZpZXcob3V0KTtcbiAgICBjb25zdCBsZW4gPSB0aGlzLm91dHB1dExlbjtcbiAgICAvLyBOT1RFOiB3ZSBkbyBkaXZpc2lvbiBieSA0IGxhdGVyLCB3aGljaCBzaG91bGQgYmUgZnVzZWQgaW4gc2luZ2xlIG9wIHdpdGggbW9kdWxvIGJ5IEpJVFxuICAgIGlmIChsZW4gJSA0KSB0aHJvdyBuZXcgRXJyb3IoJ19zaGEyOiBvdXRwdXRMZW4gc2hvdWxkIGJlIGFsaWduZWQgdG8gMzJiaXQnKTtcbiAgICBjb25zdCBvdXRMZW4gPSBsZW4gLyA0O1xuICAgIGNvbnN0IHN0YXRlID0gdGhpcy5nZXQoKTtcbiAgICBpZiAob3V0TGVuID4gc3RhdGUubGVuZ3RoKSB0aHJvdyBuZXcgRXJyb3IoJ19zaGEyOiBvdXRwdXRMZW4gYmlnZ2VyIHRoYW4gc3RhdGUnKTtcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IG91dExlbjsgaSsrKSBvdmlldy5zZXRVaW50MzIoNCAqIGksIHN0YXRlW2ldLCBpc0xFKTtcbiAgfVxuICBkaWdlc3QoKTogVWludDhBcnJheSB7XG4gICAgY29uc3QgeyBidWZmZXIsIG91dHB1dExlbiB9ID0gdGhpcztcbiAgICB0aGlzLmRpZ2VzdEludG8oYnVmZmVyKTtcbiAgICBjb25zdCByZXMgPSBidWZmZXIuc2xpY2UoMCwgb3V0cHV0TGVuKTtcbiAgICB0aGlzLmRlc3Ryb3koKTtcbiAgICByZXR1cm4gcmVzO1xuICB9XG4gIF9jbG9uZUludG8odG8/OiBUKTogVCB7XG4gICAgdG8gfHw9IG5ldyAodGhpcy5jb25zdHJ1Y3RvciBhcyBhbnkpKCkgYXMgVDtcbiAgICB0by5zZXQoLi4udGhpcy5nZXQoKSk7XG4gICAgY29uc3QgeyBibG9ja0xlbiwgYnVmZmVyLCBsZW5ndGgsIGZpbmlzaGVkLCBkZXN0cm95ZWQsIHBvcyB9ID0gdGhpcztcbiAgICB0by5sZW5ndGggPSBsZW5ndGg7XG4gICAgdG8ucG9zID0gcG9zO1xuICAgIHRvLmZpbmlzaGVkID0gZmluaXNoZWQ7XG4gICAgdG8uZGVzdHJveWVkID0gZGVzdHJveWVkO1xuICAgIGlmIChsZW5ndGggJSBibG9ja0xlbikgdG8uYnVmZmVyLnNldChidWZmZXIpO1xuICAgIHJldHVybiB0bztcbiAgfVxufVxuIiwgImltcG9ydCB7IEhhc2hNRCwgQ2hpLCBNYWogfSBmcm9tICcuL19tZC5qcyc7XG5pbXBvcnQgeyByb3RyLCB3cmFwQ29uc3RydWN0b3IsIENIYXNoIH0gZnJvbSAnLi91dGlscy5qcyc7XG5cbi8qKlxuICogU0hBMi0yNTYgYS5rLmEuIHNoYTI1Ni4gSW4gSlMsIGl0IGlzIHRoZSBmYXN0ZXN0IGhhc2gsIGV2ZW4gZmFzdGVyIHRoYW4gQmxha2UzLlxuICpcbiAqIFRvIGJyZWFrIHNoYTI1NiB1c2luZyBiaXJ0aGRheSBhdHRhY2ssIGF0dGFja2VycyBuZWVkIHRvIHRyeSAyXjEyOCBoYXNoZXMuXG4gKiBCVEMgbmV0d29yayBpcyBkb2luZyAyXjcwIGhhc2hlcy9zZWMgKDJeOTUgaGFzaGVzL3llYXIpIGFzIHBlciAyMDI1LlxuICpcbiAqIENoZWNrIG91dCBbRklQUyAxODAtNF0oaHR0cHM6Ly9udmxwdWJzLm5pc3QuZ292L25pc3RwdWJzL0ZJUFMvTklTVC5GSVBTLjE4MC00LnBkZikuXG4gKiBAbW9kdWxlXG4gKi9cblxuLyoqIFJvdW5kIGNvbnN0YW50czogZmlyc3QgMzIgYml0cyBvZiBmcmFjdGlvbmFsIHBhcnRzIG9mIHRoZSBjdWJlIHJvb3RzIG9mIHRoZSBmaXJzdCA2NCBwcmltZXMgMi4uMzExKS4gKi9cbi8vIHByZXR0aWVyLWlnbm9yZVxuY29uc3QgU0hBMjU2X0sgPSAvKiBAX19QVVJFX18gKi8gbmV3IFVpbnQzMkFycmF5KFtcbiAgMHg0MjhhMmY5OCwgMHg3MTM3NDQ5MSwgMHhiNWMwZmJjZiwgMHhlOWI1ZGJhNSwgMHgzOTU2YzI1YiwgMHg1OWYxMTFmMSwgMHg5MjNmODJhNCwgMHhhYjFjNWVkNSxcbiAgMHhkODA3YWE5OCwgMHgxMjgzNWIwMSwgMHgyNDMxODViZSwgMHg1NTBjN2RjMywgMHg3MmJlNWQ3NCwgMHg4MGRlYjFmZSwgMHg5YmRjMDZhNywgMHhjMTliZjE3NCxcbiAgMHhlNDliNjljMSwgMHhlZmJlNDc4NiwgMHgwZmMxOWRjNiwgMHgyNDBjYTFjYywgMHgyZGU5MmM2ZiwgMHg0YTc0ODRhYSwgMHg1Y2IwYTlkYywgMHg3NmY5ODhkYSxcbiAgMHg5ODNlNTE1MiwgMHhhODMxYzY2ZCwgMHhiMDAzMjdjOCwgMHhiZjU5N2ZjNywgMHhjNmUwMGJmMywgMHhkNWE3OTE0NywgMHgwNmNhNjM1MSwgMHgxNDI5Mjk2NyxcbiAgMHgyN2I3MGE4NSwgMHgyZTFiMjEzOCwgMHg0ZDJjNmRmYywgMHg1MzM4MGQxMywgMHg2NTBhNzM1NCwgMHg3NjZhMGFiYiwgMHg4MWMyYzkyZSwgMHg5MjcyMmM4NSxcbiAgMHhhMmJmZThhMSwgMHhhODFhNjY0YiwgMHhjMjRiOGI3MCwgMHhjNzZjNTFhMywgMHhkMTkyZTgxOSwgMHhkNjk5MDYyNCwgMHhmNDBlMzU4NSwgMHgxMDZhYTA3MCxcbiAgMHgxOWE0YzExNiwgMHgxZTM3NmMwOCwgMHgyNzQ4Nzc0YywgMHgzNGIwYmNiNSwgMHgzOTFjMGNiMywgMHg0ZWQ4YWE0YSwgMHg1YjljY2E0ZiwgMHg2ODJlNmZmMyxcbiAgMHg3NDhmODJlZSwgMHg3OGE1NjM2ZiwgMHg4NGM4NzgxNCwgMHg4Y2M3MDIwOCwgMHg5MGJlZmZmYSwgMHhhNDUwNmNlYiwgMHhiZWY5YTNmNywgMHhjNjcxNzhmMlxuXSk7XG5cbi8qKiBJbml0aWFsIHN0YXRlOiBmaXJzdCAzMiBiaXRzIG9mIGZyYWN0aW9uYWwgcGFydHMgb2YgdGhlIHNxdWFyZSByb290cyBvZiB0aGUgZmlyc3QgOCBwcmltZXMgMi4uMTkuICovXG4vLyBwcmV0dGllci1pZ25vcmVcbmNvbnN0IFNIQTI1Nl9JViA9IC8qIEBfX1BVUkVfXyAqLyBuZXcgVWludDMyQXJyYXkoW1xuICAweDZhMDllNjY3LCAweGJiNjdhZTg1LCAweDNjNmVmMzcyLCAweGE1NGZmNTNhLCAweDUxMGU1MjdmLCAweDliMDU2ODhjLCAweDFmODNkOWFiLCAweDViZTBjZDE5XG5dKTtcblxuLyoqXG4gKiBUZW1wb3JhcnkgYnVmZmVyLCBub3QgdXNlZCB0byBzdG9yZSBhbnl0aGluZyBiZXR3ZWVuIHJ1bnMuXG4gKiBOYW1lZCB0aGlzIHdheSBiZWNhdXNlIGl0IG1hdGNoZXMgc3BlY2lmaWNhdGlvbi5cbiAqL1xuY29uc3QgU0hBMjU2X1cgPSAvKiBAX19QVVJFX18gKi8gbmV3IFVpbnQzMkFycmF5KDY0KTtcbmV4cG9ydCBjbGFzcyBTSEEyNTYgZXh0ZW5kcyBIYXNoTUQ8U0hBMjU2PiB7XG4gIC8vIFdlIGNhbm5vdCB1c2UgYXJyYXkgaGVyZSBzaW5jZSBhcnJheSBhbGxvd3MgaW5kZXhpbmcgYnkgdmFyaWFibGVcbiAgLy8gd2hpY2ggbWVhbnMgb3B0aW1pemVyL2NvbXBpbGVyIGNhbm5vdCB1c2UgcmVnaXN0ZXJzLlxuICBwcm90ZWN0ZWQgQTogbnVtYmVyID0gU0hBMjU2X0lWWzBdIHwgMDtcbiAgcHJvdGVjdGVkIEI6IG51bWJlciA9IFNIQTI1Nl9JVlsxXSB8IDA7XG4gIHByb3RlY3RlZCBDOiBudW1iZXIgPSBTSEEyNTZfSVZbMl0gfCAwO1xuICBwcm90ZWN0ZWQgRDogbnVtYmVyID0gU0hBMjU2X0lWWzNdIHwgMDtcbiAgcHJvdGVjdGVkIEU6IG51bWJlciA9IFNIQTI1Nl9JVls0XSB8IDA7XG4gIHByb3RlY3RlZCBGOiBudW1iZXIgPSBTSEEyNTZfSVZbNV0gfCAwO1xuICBwcm90ZWN0ZWQgRzogbnVtYmVyID0gU0hBMjU2X0lWWzZdIHwgMDtcbiAgcHJvdGVjdGVkIEg6IG51bWJlciA9IFNIQTI1Nl9JVls3XSB8IDA7XG5cbiAgY29uc3RydWN0b3IoKSB7XG4gICAgc3VwZXIoNjQsIDMyLCA4LCBmYWxzZSk7XG4gIH1cbiAgcHJvdGVjdGVkIGdldCgpOiBbbnVtYmVyLCBudW1iZXIsIG51bWJlciwgbnVtYmVyLCBudW1iZXIsIG51bWJlciwgbnVtYmVyLCBudW1iZXJdIHtcbiAgICBjb25zdCB7IEEsIEIsIEMsIEQsIEUsIEYsIEcsIEggfSA9IHRoaXM7XG4gICAgcmV0dXJuIFtBLCBCLCBDLCBELCBFLCBGLCBHLCBIXTtcbiAgfVxuICAvLyBwcmV0dGllci1pZ25vcmVcbiAgcHJvdGVjdGVkIHNldChcbiAgICBBOiBudW1iZXIsIEI6IG51bWJlciwgQzogbnVtYmVyLCBEOiBudW1iZXIsIEU6IG51bWJlciwgRjogbnVtYmVyLCBHOiBudW1iZXIsIEg6IG51bWJlclxuICApOiB2b2lkIHtcbiAgICB0aGlzLkEgPSBBIHwgMDtcbiAgICB0aGlzLkIgPSBCIHwgMDtcbiAgICB0aGlzLkMgPSBDIHwgMDtcbiAgICB0aGlzLkQgPSBEIHwgMDtcbiAgICB0aGlzLkUgPSBFIHwgMDtcbiAgICB0aGlzLkYgPSBGIHwgMDtcbiAgICB0aGlzLkcgPSBHIHwgMDtcbiAgICB0aGlzLkggPSBIIHwgMDtcbiAgfVxuICBwcm90ZWN0ZWQgcHJvY2Vzcyh2aWV3OiBEYXRhVmlldywgb2Zmc2V0OiBudW1iZXIpOiB2b2lkIHtcbiAgICAvLyBFeHRlbmQgdGhlIGZpcnN0IDE2IHdvcmRzIGludG8gdGhlIHJlbWFpbmluZyA0OCB3b3JkcyB3WzE2Li42M10gb2YgdGhlIG1lc3NhZ2Ugc2NoZWR1bGUgYXJyYXlcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IDE2OyBpKyssIG9mZnNldCArPSA0KSBTSEEyNTZfV1tpXSA9IHZpZXcuZ2V0VWludDMyKG9mZnNldCwgZmFsc2UpO1xuICAgIGZvciAobGV0IGkgPSAxNjsgaSA8IDY0OyBpKyspIHtcbiAgICAgIGNvbnN0IFcxNSA9IFNIQTI1Nl9XW2kgLSAxNV07XG4gICAgICBjb25zdCBXMiA9IFNIQTI1Nl9XW2kgLSAyXTtcbiAgICAgIGNvbnN0IHMwID0gcm90cihXMTUsIDcpIF4gcm90cihXMTUsIDE4KSBeIChXMTUgPj4+IDMpO1xuICAgICAgY29uc3QgczEgPSByb3RyKFcyLCAxNykgXiByb3RyKFcyLCAxOSkgXiAoVzIgPj4+IDEwKTtcbiAgICAgIFNIQTI1Nl9XW2ldID0gKHMxICsgU0hBMjU2X1dbaSAtIDddICsgczAgKyBTSEEyNTZfV1tpIC0gMTZdKSB8IDA7XG4gICAgfVxuICAgIC8vIENvbXByZXNzaW9uIGZ1bmN0aW9uIG1haW4gbG9vcCwgNjQgcm91bmRzXG4gICAgbGV0IHsgQSwgQiwgQywgRCwgRSwgRiwgRywgSCB9ID0gdGhpcztcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IDY0OyBpKyspIHtcbiAgICAgIGNvbnN0IHNpZ21hMSA9IHJvdHIoRSwgNikgXiByb3RyKEUsIDExKSBeIHJvdHIoRSwgMjUpO1xuICAgICAgY29uc3QgVDEgPSAoSCArIHNpZ21hMSArIENoaShFLCBGLCBHKSArIFNIQTI1Nl9LW2ldICsgU0hBMjU2X1dbaV0pIHwgMDtcbiAgICAgIGNvbnN0IHNpZ21hMCA9IHJvdHIoQSwgMikgXiByb3RyKEEsIDEzKSBeIHJvdHIoQSwgMjIpO1xuICAgICAgY29uc3QgVDIgPSAoc2lnbWEwICsgTWFqKEEsIEIsIEMpKSB8IDA7XG4gICAgICBIID0gRztcbiAgICAgIEcgPSBGO1xuICAgICAgRiA9IEU7XG4gICAgICBFID0gKEQgKyBUMSkgfCAwO1xuICAgICAgRCA9IEM7XG4gICAgICBDID0gQjtcbiAgICAgIEIgPSBBO1xuICAgICAgQSA9IChUMSArIFQyKSB8IDA7XG4gICAgfVxuICAgIC8vIEFkZCB0aGUgY29tcHJlc3NlZCBjaHVuayB0byB0aGUgY3VycmVudCBoYXNoIHZhbHVlXG4gICAgQSA9IChBICsgdGhpcy5BKSB8IDA7XG4gICAgQiA9IChCICsgdGhpcy5CKSB8IDA7XG4gICAgQyA9IChDICsgdGhpcy5DKSB8IDA7XG4gICAgRCA9IChEICsgdGhpcy5EKSB8IDA7XG4gICAgRSA9IChFICsgdGhpcy5FKSB8IDA7XG4gICAgRiA9IChGICsgdGhpcy5GKSB8IDA7XG4gICAgRyA9IChHICsgdGhpcy5HKSB8IDA7XG4gICAgSCA9IChIICsgdGhpcy5IKSB8IDA7XG4gICAgdGhpcy5zZXQoQSwgQiwgQywgRCwgRSwgRiwgRywgSCk7XG4gIH1cbiAgcHJvdGVjdGVkIHJvdW5kQ2xlYW4oKTogdm9pZCB7XG4gICAgU0hBMjU2X1cuZmlsbCgwKTtcbiAgfVxuICBkZXN0cm95KCk6IHZvaWQge1xuICAgIHRoaXMuc2V0KDAsIDAsIDAsIDAsIDAsIDAsIDAsIDApO1xuICAgIHRoaXMuYnVmZmVyLmZpbGwoMCk7XG4gIH1cbn1cblxuLyoqXG4gKiBDb25zdGFudHMgdGFrZW4gZnJvbSBodHRwczovL252bHB1YnMubmlzdC5nb3YvbmlzdHB1YnMvRklQUy9OSVNULkZJUFMuMTgwLTQucGRmLlxuICovXG5jbGFzcyBTSEEyMjQgZXh0ZW5kcyBTSEEyNTYge1xuICBwcm90ZWN0ZWQgQSA9IDB4YzEwNTllZDggfCAwO1xuICBwcm90ZWN0ZWQgQiA9IDB4MzY3Y2Q1MDcgfCAwO1xuICBwcm90ZWN0ZWQgQyA9IDB4MzA3MGRkMTcgfCAwO1xuICBwcm90ZWN0ZWQgRCA9IDB4ZjcwZTU5MzkgfCAwO1xuICBwcm90ZWN0ZWQgRSA9IDB4ZmZjMDBiMzEgfCAwO1xuICBwcm90ZWN0ZWQgRiA9IDB4Njg1ODE1MTEgfCAwO1xuICBwcm90ZWN0ZWQgRyA9IDB4NjRmOThmYTcgfCAwO1xuICBwcm90ZWN0ZWQgSCA9IDB4YmVmYTRmYTQgfCAwO1xuICBjb25zdHJ1Y3RvcigpIHtcbiAgICBzdXBlcigpO1xuICAgIHRoaXMub3V0cHV0TGVuID0gMjg7XG4gIH1cbn1cblxuLyoqIFNIQTItMjU2IGhhc2ggZnVuY3Rpb24gKi9cbmV4cG9ydCBjb25zdCBzaGEyNTY6IENIYXNoID0gLyogQF9fUFVSRV9fICovIHdyYXBDb25zdHJ1Y3RvcigoKSA9PiBuZXcgU0hBMjU2KCkpO1xuLyoqIFNIQTItMjI0IGhhc2ggZnVuY3Rpb24gKi9cbmV4cG9ydCBjb25zdCBzaGEyMjQ6IENIYXNoID0gLyogQF9fUFVSRV9fICovIHdyYXBDb25zdHJ1Y3RvcigoKSA9PiBuZXcgU0hBMjI0KCkpO1xuIiwgIi8qKlxuICogSGV4LCBieXRlcyBhbmQgbnVtYmVyIHV0aWxpdGllcy5cbiAqIEBtb2R1bGVcbiAqL1xuLyohIG5vYmxlLWN1cnZlcyAtIE1JVCBMaWNlbnNlIChjKSAyMDIyIFBhdWwgTWlsbGVyIChwYXVsbWlsbHIuY29tKSAqL1xuXG4vLyAxMDAgbGluZXMgb2YgY29kZSBpbiB0aGUgZmlsZSBhcmUgZHVwbGljYXRlZCBmcm9tIG5vYmxlLWhhc2hlcyAodXRpbHMpLlxuLy8gVGhpcyBpcyBPSzogYGFic3RyYWN0YCBkaXJlY3RvcnkgZG9lcyBub3QgdXNlIG5vYmxlLWhhc2hlcy5cbi8vIFVzZXIgbWF5IG9wdC1pbiBpbnRvIHVzaW5nIGRpZmZlcmVudCBoYXNoaW5nIGxpYnJhcnkuIFRoaXMgd2F5LCBub2JsZS1oYXNoZXNcbi8vIHdvbid0IGJlIGluY2x1ZGVkIGludG8gdGhlaXIgYnVuZGxlLlxuY29uc3QgXzBuID0gLyogQF9fUFVSRV9fICovIEJpZ0ludCgwKTtcbmNvbnN0IF8xbiA9IC8qIEBfX1BVUkVfXyAqLyBCaWdJbnQoMSk7XG5jb25zdCBfMm4gPSAvKiBAX19QVVJFX18gKi8gQmlnSW50KDIpO1xuZXhwb3J0IHR5cGUgSGV4ID0gVWludDhBcnJheSB8IHN0cmluZzsgLy8gaGV4IHN0cmluZ3MgYXJlIGFjY2VwdGVkIGZvciBzaW1wbGljaXR5XG5leHBvcnQgdHlwZSBQcml2S2V5ID0gSGV4IHwgYmlnaW50OyAvLyBiaWdpbnRzIGFyZSBhY2NlcHRlZCB0byBlYXNlIGxlYXJuaW5nIGN1cnZlXG5leHBvcnQgdHlwZSBDSGFzaCA9IHtcbiAgKG1lc3NhZ2U6IFVpbnQ4QXJyYXkgfCBzdHJpbmcpOiBVaW50OEFycmF5O1xuICBibG9ja0xlbjogbnVtYmVyO1xuICBvdXRwdXRMZW46IG51bWJlcjtcbiAgY3JlYXRlKG9wdHM/OiB7IGRrTGVuPzogbnVtYmVyIH0pOiBhbnk7IC8vIEZvciBzaGFrZVxufTtcbmV4cG9ydCB0eXBlIEZIYXNoID0gKG1lc3NhZ2U6IFVpbnQ4QXJyYXkgfCBzdHJpbmcpID0+IFVpbnQ4QXJyYXk7XG5cbmV4cG9ydCBmdW5jdGlvbiBpc0J5dGVzKGE6IHVua25vd24pOiBhIGlzIFVpbnQ4QXJyYXkge1xuICByZXR1cm4gYSBpbnN0YW5jZW9mIFVpbnQ4QXJyYXkgfHwgKEFycmF5QnVmZmVyLmlzVmlldyhhKSAmJiBhLmNvbnN0cnVjdG9yLm5hbWUgPT09ICdVaW50OEFycmF5Jyk7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBhYnl0ZXMoaXRlbTogdW5rbm93bik6IHZvaWQge1xuICBpZiAoIWlzQnl0ZXMoaXRlbSkpIHRocm93IG5ldyBFcnJvcignVWludDhBcnJheSBleHBlY3RlZCcpO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gYWJvb2wodGl0bGU6IHN0cmluZywgdmFsdWU6IGJvb2xlYW4pOiB2b2lkIHtcbiAgaWYgKHR5cGVvZiB2YWx1ZSAhPT0gJ2Jvb2xlYW4nKSB0aHJvdyBuZXcgRXJyb3IodGl0bGUgKyAnIGJvb2xlYW4gZXhwZWN0ZWQsIGdvdCAnICsgdmFsdWUpO1xufVxuXG4vLyBBcnJheSB3aGVyZSBpbmRleCAweGYwICgyNDApIGlzIG1hcHBlZCB0byBzdHJpbmcgJ2YwJ1xuY29uc3QgaGV4ZXMgPSAvKiBAX19QVVJFX18gKi8gQXJyYXkuZnJvbSh7IGxlbmd0aDogMjU2IH0sIChfLCBpKSA9PlxuICBpLnRvU3RyaW5nKDE2KS5wYWRTdGFydCgyLCAnMCcpXG4pO1xuLyoqXG4gKiBAZXhhbXBsZSBieXRlc1RvSGV4KFVpbnQ4QXJyYXkuZnJvbShbMHhjYSwgMHhmZSwgMHgwMSwgMHgyM10pKSAvLyAnY2FmZTAxMjMnXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBieXRlc1RvSGV4KGJ5dGVzOiBVaW50OEFycmF5KTogc3RyaW5nIHtcbiAgYWJ5dGVzKGJ5dGVzKTtcbiAgLy8gcHJlLWNhY2hpbmcgaW1wcm92ZXMgdGhlIHNwZWVkIDZ4XG4gIGxldCBoZXggPSAnJztcbiAgZm9yIChsZXQgaSA9IDA7IGkgPCBieXRlcy5sZW5ndGg7IGkrKykge1xuICAgIGhleCArPSBoZXhlc1tieXRlc1tpXV07XG4gIH1cbiAgcmV0dXJuIGhleDtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIG51bWJlclRvSGV4VW5wYWRkZWQobnVtOiBudW1iZXIgfCBiaWdpbnQpOiBzdHJpbmcge1xuICBjb25zdCBoZXggPSBudW0udG9TdHJpbmcoMTYpO1xuICByZXR1cm4gaGV4Lmxlbmd0aCAmIDEgPyAnMCcgKyBoZXggOiBoZXg7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBoZXhUb051bWJlcihoZXg6IHN0cmluZyk6IGJpZ2ludCB7XG4gIGlmICh0eXBlb2YgaGV4ICE9PSAnc3RyaW5nJykgdGhyb3cgbmV3IEVycm9yKCdoZXggc3RyaW5nIGV4cGVjdGVkLCBnb3QgJyArIHR5cGVvZiBoZXgpO1xuICByZXR1cm4gaGV4ID09PSAnJyA/IF8wbiA6IEJpZ0ludCgnMHgnICsgaGV4KTsgLy8gQmlnIEVuZGlhblxufVxuXG4vLyBXZSB1c2Ugb3B0aW1pemVkIHRlY2huaXF1ZSB0byBjb252ZXJ0IGhleCBzdHJpbmcgdG8gYnl0ZSBhcnJheVxuY29uc3QgYXNjaWlzID0geyBfMDogNDgsIF85OiA1NywgQTogNjUsIEY6IDcwLCBhOiA5NywgZjogMTAyIH0gYXMgY29uc3Q7XG5mdW5jdGlvbiBhc2NpaVRvQmFzZTE2KGNoOiBudW1iZXIpOiBudW1iZXIgfCB1bmRlZmluZWQge1xuICBpZiAoY2ggPj0gYXNjaWlzLl8wICYmIGNoIDw9IGFzY2lpcy5fOSkgcmV0dXJuIGNoIC0gYXNjaWlzLl8wOyAvLyAnMicgPT4gNTAtNDhcbiAgaWYgKGNoID49IGFzY2lpcy5BICYmIGNoIDw9IGFzY2lpcy5GKSByZXR1cm4gY2ggLSAoYXNjaWlzLkEgLSAxMCk7IC8vICdCJyA9PiA2Ni0oNjUtMTApXG4gIGlmIChjaCA+PSBhc2NpaXMuYSAmJiBjaCA8PSBhc2NpaXMuZikgcmV0dXJuIGNoIC0gKGFzY2lpcy5hIC0gMTApOyAvLyAnYicgPT4gOTgtKDk3LTEwKVxuICByZXR1cm47XG59XG5cbi8qKlxuICogQGV4YW1wbGUgaGV4VG9CeXRlcygnY2FmZTAxMjMnKSAvLyBVaW50OEFycmF5LmZyb20oWzB4Y2EsIDB4ZmUsIDB4MDEsIDB4MjNdKVxuICovXG5leHBvcnQgZnVuY3Rpb24gaGV4VG9CeXRlcyhoZXg6IHN0cmluZyk6IFVpbnQ4QXJyYXkge1xuICBpZiAodHlwZW9mIGhleCAhPT0gJ3N0cmluZycpIHRocm93IG5ldyBFcnJvcignaGV4IHN0cmluZyBleHBlY3RlZCwgZ290ICcgKyB0eXBlb2YgaGV4KTtcbiAgY29uc3QgaGwgPSBoZXgubGVuZ3RoO1xuICBjb25zdCBhbCA9IGhsIC8gMjtcbiAgaWYgKGhsICUgMikgdGhyb3cgbmV3IEVycm9yKCdoZXggc3RyaW5nIGV4cGVjdGVkLCBnb3QgdW5wYWRkZWQgaGV4IG9mIGxlbmd0aCAnICsgaGwpO1xuICBjb25zdCBhcnJheSA9IG5ldyBVaW50OEFycmF5KGFsKTtcbiAgZm9yIChsZXQgYWkgPSAwLCBoaSA9IDA7IGFpIDwgYWw7IGFpKyssIGhpICs9IDIpIHtcbiAgICBjb25zdCBuMSA9IGFzY2lpVG9CYXNlMTYoaGV4LmNoYXJDb2RlQXQoaGkpKTtcbiAgICBjb25zdCBuMiA9IGFzY2lpVG9CYXNlMTYoaGV4LmNoYXJDb2RlQXQoaGkgKyAxKSk7XG4gICAgaWYgKG4xID09PSB1bmRlZmluZWQgfHwgbjIgPT09IHVuZGVmaW5lZCkge1xuICAgICAgY29uc3QgY2hhciA9IGhleFtoaV0gKyBoZXhbaGkgKyAxXTtcbiAgICAgIHRocm93IG5ldyBFcnJvcignaGV4IHN0cmluZyBleHBlY3RlZCwgZ290IG5vbi1oZXggY2hhcmFjdGVyIFwiJyArIGNoYXIgKyAnXCIgYXQgaW5kZXggJyArIGhpKTtcbiAgICB9XG4gICAgYXJyYXlbYWldID0gbjEgKiAxNiArIG4yOyAvLyBtdWx0aXBseSBmaXJzdCBvY3RldCwgZS5nLiAnYTMnID0+IDEwKjE2KzMgPT4gMTYwICsgMyA9PiAxNjNcbiAgfVxuICByZXR1cm4gYXJyYXk7XG59XG5cbi8vIEJFOiBCaWcgRW5kaWFuLCBMRTogTGl0dGxlIEVuZGlhblxuZXhwb3J0IGZ1bmN0aW9uIGJ5dGVzVG9OdW1iZXJCRShieXRlczogVWludDhBcnJheSk6IGJpZ2ludCB7XG4gIHJldHVybiBoZXhUb051bWJlcihieXRlc1RvSGV4KGJ5dGVzKSk7XG59XG5leHBvcnQgZnVuY3Rpb24gYnl0ZXNUb051bWJlckxFKGJ5dGVzOiBVaW50OEFycmF5KTogYmlnaW50IHtcbiAgYWJ5dGVzKGJ5dGVzKTtcbiAgcmV0dXJuIGhleFRvTnVtYmVyKGJ5dGVzVG9IZXgoVWludDhBcnJheS5mcm9tKGJ5dGVzKS5yZXZlcnNlKCkpKTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIG51bWJlclRvQnl0ZXNCRShuOiBudW1iZXIgfCBiaWdpbnQsIGxlbjogbnVtYmVyKTogVWludDhBcnJheSB7XG4gIHJldHVybiBoZXhUb0J5dGVzKG4udG9TdHJpbmcoMTYpLnBhZFN0YXJ0KGxlbiAqIDIsICcwJykpO1xufVxuZXhwb3J0IGZ1bmN0aW9uIG51bWJlclRvQnl0ZXNMRShuOiBudW1iZXIgfCBiaWdpbnQsIGxlbjogbnVtYmVyKTogVWludDhBcnJheSB7XG4gIHJldHVybiBudW1iZXJUb0J5dGVzQkUobiwgbGVuKS5yZXZlcnNlKCk7XG59XG4vLyBVbnBhZGRlZCwgcmFyZWx5IHVzZWRcbmV4cG9ydCBmdW5jdGlvbiBudW1iZXJUb1ZhckJ5dGVzQkUobjogbnVtYmVyIHwgYmlnaW50KTogVWludDhBcnJheSB7XG4gIHJldHVybiBoZXhUb0J5dGVzKG51bWJlclRvSGV4VW5wYWRkZWQobikpO1xufVxuXG4vKipcbiAqIFRha2VzIGhleCBzdHJpbmcgb3IgVWludDhBcnJheSwgY29udmVydHMgdG8gVWludDhBcnJheS5cbiAqIFZhbGlkYXRlcyBvdXRwdXQgbGVuZ3RoLlxuICogV2lsbCB0aHJvdyBlcnJvciBmb3Igb3RoZXIgdHlwZXMuXG4gKiBAcGFyYW0gdGl0bGUgZGVzY3JpcHRpdmUgdGl0bGUgZm9yIGFuIGVycm9yIGUuZy4gJ3ByaXZhdGUga2V5J1xuICogQHBhcmFtIGhleCBoZXggc3RyaW5nIG9yIFVpbnQ4QXJyYXlcbiAqIEBwYXJhbSBleHBlY3RlZExlbmd0aCBvcHRpb25hbCwgd2lsbCBjb21wYXJlIHRvIHJlc3VsdCBhcnJheSdzIGxlbmd0aFxuICogQHJldHVybnNcbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGVuc3VyZUJ5dGVzKHRpdGxlOiBzdHJpbmcsIGhleDogSGV4LCBleHBlY3RlZExlbmd0aD86IG51bWJlcik6IFVpbnQ4QXJyYXkge1xuICBsZXQgcmVzOiBVaW50OEFycmF5O1xuICBpZiAodHlwZW9mIGhleCA9PT0gJ3N0cmluZycpIHtcbiAgICB0cnkge1xuICAgICAgcmVzID0gaGV4VG9CeXRlcyhoZXgpO1xuICAgIH0gY2F0Y2ggKGUpIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcih0aXRsZSArICcgbXVzdCBiZSBoZXggc3RyaW5nIG9yIFVpbnQ4QXJyYXksIGNhdXNlOiAnICsgZSk7XG4gICAgfVxuICB9IGVsc2UgaWYgKGlzQnl0ZXMoaGV4KSkge1xuICAgIC8vIFVpbnQ4QXJyYXkuZnJvbSgpIGluc3RlYWQgb2YgaGFzaC5zbGljZSgpIGJlY2F1c2Ugbm9kZS5qcyBCdWZmZXJcbiAgICAvLyBpcyBpbnN0YW5jZSBvZiBVaW50OEFycmF5LCBhbmQgaXRzIHNsaWNlKCkgY3JlYXRlcyAqKm11dGFibGUqKiBjb3B5XG4gICAgcmVzID0gVWludDhBcnJheS5mcm9tKGhleCk7XG4gIH0gZWxzZSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKHRpdGxlICsgJyBtdXN0IGJlIGhleCBzdHJpbmcgb3IgVWludDhBcnJheScpO1xuICB9XG4gIGNvbnN0IGxlbiA9IHJlcy5sZW5ndGg7XG4gIGlmICh0eXBlb2YgZXhwZWN0ZWRMZW5ndGggPT09ICdudW1iZXInICYmIGxlbiAhPT0gZXhwZWN0ZWRMZW5ndGgpXG4gICAgdGhyb3cgbmV3IEVycm9yKHRpdGxlICsgJyBvZiBsZW5ndGggJyArIGV4cGVjdGVkTGVuZ3RoICsgJyBleHBlY3RlZCwgZ290ICcgKyBsZW4pO1xuICByZXR1cm4gcmVzO1xufVxuXG4vKipcbiAqIENvcGllcyBzZXZlcmFsIFVpbnQ4QXJyYXlzIGludG8gb25lLlxuICovXG5leHBvcnQgZnVuY3Rpb24gY29uY2F0Qnl0ZXMoLi4uYXJyYXlzOiBVaW50OEFycmF5W10pOiBVaW50OEFycmF5IHtcbiAgbGV0IHN1bSA9IDA7XG4gIGZvciAobGV0IGkgPSAwOyBpIDwgYXJyYXlzLmxlbmd0aDsgaSsrKSB7XG4gICAgY29uc3QgYSA9IGFycmF5c1tpXTtcbiAgICBhYnl0ZXMoYSk7XG4gICAgc3VtICs9IGEubGVuZ3RoO1xuICB9XG4gIGNvbnN0IHJlcyA9IG5ldyBVaW50OEFycmF5KHN1bSk7XG4gIGZvciAobGV0IGkgPSAwLCBwYWQgPSAwOyBpIDwgYXJyYXlzLmxlbmd0aDsgaSsrKSB7XG4gICAgY29uc3QgYSA9IGFycmF5c1tpXTtcbiAgICByZXMuc2V0KGEsIHBhZCk7XG4gICAgcGFkICs9IGEubGVuZ3RoO1xuICB9XG4gIHJldHVybiByZXM7XG59XG5cbi8vIENvbXBhcmVzIDIgdThhLXMgaW4ga2luZGEgY29uc3RhbnQgdGltZVxuZXhwb3J0IGZ1bmN0aW9uIGVxdWFsQnl0ZXMoYTogVWludDhBcnJheSwgYjogVWludDhBcnJheSk6IGJvb2xlYW4ge1xuICBpZiAoYS5sZW5ndGggIT09IGIubGVuZ3RoKSByZXR1cm4gZmFsc2U7XG4gIGxldCBkaWZmID0gMDtcbiAgZm9yIChsZXQgaSA9IDA7IGkgPCBhLmxlbmd0aDsgaSsrKSBkaWZmIHw9IGFbaV0gXiBiW2ldO1xuICByZXR1cm4gZGlmZiA9PT0gMDtcbn1cblxuLy8gR2xvYmFsIHN5bWJvbHMgaW4gYm90aCBicm93c2VycyBhbmQgTm9kZS5qcyBzaW5jZSB2MTFcbi8vIFNlZSBodHRwczovL2dpdGh1Yi5jb20vbWljcm9zb2Z0L1R5cGVTY3JpcHQvaXNzdWVzLzMxNTM1XG5kZWNsYXJlIGNvbnN0IFRleHRFbmNvZGVyOiBhbnk7XG5cbi8qKlxuICogQGV4YW1wbGUgdXRmOFRvQnl0ZXMoJ2FiYycpIC8vIG5ldyBVaW50OEFycmF5KFs5NywgOTgsIDk5XSlcbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIHV0ZjhUb0J5dGVzKHN0cjogc3RyaW5nKTogVWludDhBcnJheSB7XG4gIGlmICh0eXBlb2Ygc3RyICE9PSAnc3RyaW5nJykgdGhyb3cgbmV3IEVycm9yKCdzdHJpbmcgZXhwZWN0ZWQnKTtcbiAgcmV0dXJuIG5ldyBVaW50OEFycmF5KG5ldyBUZXh0RW5jb2RlcigpLmVuY29kZShzdHIpKTsgLy8gaHR0cHM6Ly9idWd6aWwubGEvMTY4MTgwOVxufVxuXG4vLyBJcyBwb3NpdGl2ZSBiaWdpbnRcbmNvbnN0IGlzUG9zQmlnID0gKG46IGJpZ2ludCkgPT4gdHlwZW9mIG4gPT09ICdiaWdpbnQnICYmIF8wbiA8PSBuO1xuXG5leHBvcnQgZnVuY3Rpb24gaW5SYW5nZShuOiBiaWdpbnQsIG1pbjogYmlnaW50LCBtYXg6IGJpZ2ludCk6IGJvb2xlYW4ge1xuICByZXR1cm4gaXNQb3NCaWcobikgJiYgaXNQb3NCaWcobWluKSAmJiBpc1Bvc0JpZyhtYXgpICYmIG1pbiA8PSBuICYmIG4gPCBtYXg7XG59XG5cbi8qKlxuICogQXNzZXJ0cyBtaW4gPD0gbiA8IG1heC4gTk9URTogSXQncyA8IG1heCBhbmQgbm90IDw9IG1heC5cbiAqIEBleGFtcGxlXG4gKiBhSW5SYW5nZSgneCcsIHgsIDFuLCAyNTZuKTsgLy8gd291bGQgYXNzdW1lIHggaXMgaW4gKDFuLi4yNTVuKVxuICovXG5leHBvcnQgZnVuY3Rpb24gYUluUmFuZ2UodGl0bGU6IHN0cmluZywgbjogYmlnaW50LCBtaW46IGJpZ2ludCwgbWF4OiBiaWdpbnQpOiB2b2lkIHtcbiAgLy8gV2h5IG1pbiA8PSBuIDwgbWF4IGFuZCBub3QgYSAobWluIDwgbiA8IG1heCkgT1IgYiAobWluIDw9IG4gPD0gbWF4KT9cbiAgLy8gY29uc2lkZXIgUD0yNTZuLCBtaW49MG4sIG1heD1QXG4gIC8vIC0gYSBmb3IgbWluPTAgd291bGQgcmVxdWlyZSAtMTogICAgICAgICAgYGluUmFuZ2UoJ3gnLCB4LCAtMW4sIFApYFxuICAvLyAtIGIgd291bGQgY29tbW9ubHkgcmVxdWlyZSBzdWJ0cmFjdGlvbjogIGBpblJhbmdlKCd4JywgeCwgMG4sIFAgLSAxbilgXG4gIC8vIC0gb3VyIHdheSBpcyB0aGUgY2xlYW5lc3Q6ICAgICAgICAgICAgICAgYGluUmFuZ2UoJ3gnLCB4LCAwbiwgUClcbiAgaWYgKCFpblJhbmdlKG4sIG1pbiwgbWF4KSlcbiAgICB0aHJvdyBuZXcgRXJyb3IoJ2V4cGVjdGVkIHZhbGlkICcgKyB0aXRsZSArICc6ICcgKyBtaW4gKyAnIDw9IG4gPCAnICsgbWF4ICsgJywgZ290ICcgKyBuKTtcbn1cblxuLy8gQml0IG9wZXJhdGlvbnNcblxuLyoqXG4gKiBDYWxjdWxhdGVzIGFtb3VudCBvZiBiaXRzIGluIGEgYmlnaW50LlxuICogU2FtZSBhcyBgbi50b1N0cmluZygyKS5sZW5ndGhgXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBiaXRMZW4objogYmlnaW50KTogbnVtYmVyIHtcbiAgbGV0IGxlbjtcbiAgZm9yIChsZW4gPSAwOyBuID4gXzBuOyBuID4+PSBfMW4sIGxlbiArPSAxKTtcbiAgcmV0dXJuIGxlbjtcbn1cblxuLyoqXG4gKiBHZXRzIHNpbmdsZSBiaXQgYXQgcG9zaXRpb24uXG4gKiBOT1RFOiBmaXJzdCBiaXQgcG9zaXRpb24gaXMgMCAoc2FtZSBhcyBhcnJheXMpXG4gKiBTYW1lIGFzIGAhIStBcnJheS5mcm9tKG4udG9TdHJpbmcoMikpLnJldmVyc2UoKVtwb3NdYFxuICovXG5leHBvcnQgZnVuY3Rpb24gYml0R2V0KG46IGJpZ2ludCwgcG9zOiBudW1iZXIpOiBiaWdpbnQge1xuICByZXR1cm4gKG4gPj4gQmlnSW50KHBvcykpICYgXzFuO1xufVxuXG4vKipcbiAqIFNldHMgc2luZ2xlIGJpdCBhdCBwb3NpdGlvbi5cbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGJpdFNldChuOiBiaWdpbnQsIHBvczogbnVtYmVyLCB2YWx1ZTogYm9vbGVhbik6IGJpZ2ludCB7XG4gIHJldHVybiBuIHwgKCh2YWx1ZSA/IF8xbiA6IF8wbikgPDwgQmlnSW50KHBvcykpO1xufVxuXG4vKipcbiAqIENhbGN1bGF0ZSBtYXNrIGZvciBOIGJpdHMuIE5vdCB1c2luZyAqKiBvcGVyYXRvciB3aXRoIGJpZ2ludHMgYmVjYXVzZSBvZiBvbGQgZW5naW5lcy5cbiAqIFNhbWUgYXMgQmlnSW50KGAwYiR7QXJyYXkoaSkuZmlsbCgnMScpLmpvaW4oJycpfWApXG4gKi9cbmV4cG9ydCBjb25zdCBiaXRNYXNrID0gKG46IG51bWJlcik6IGJpZ2ludCA9PiAoXzJuIDw8IEJpZ0ludChuIC0gMSkpIC0gXzFuO1xuXG4vLyBEUkJHXG5cbmNvbnN0IHU4biA9IChkYXRhPzogYW55KSA9PiBuZXcgVWludDhBcnJheShkYXRhKTsgLy8gY3JlYXRlcyBVaW50OEFycmF5XG5jb25zdCB1OGZyID0gKGFycjogYW55KSA9PiBVaW50OEFycmF5LmZyb20oYXJyKTsgLy8gYW5vdGhlciBzaG9ydGN1dFxudHlwZSBQcmVkPFQ+ID0gKHY6IFVpbnQ4QXJyYXkpID0+IFQgfCB1bmRlZmluZWQ7XG4vKipcbiAqIE1pbmltYWwgSE1BQy1EUkJHIGZyb20gTklTVCA4MDAtOTAgZm9yIFJGQzY5Nzkgc2lncy5cbiAqIEByZXR1cm5zIGZ1bmN0aW9uIHRoYXQgd2lsbCBjYWxsIERSQkcgdW50aWwgMm5kIGFyZyByZXR1cm5zIHNvbWV0aGluZyBtZWFuaW5nZnVsXG4gKiBAZXhhbXBsZVxuICogICBjb25zdCBkcmJnID0gY3JlYXRlSG1hY0RSQkc8S2V5PigzMiwgMzIsIGhtYWMpO1xuICogICBkcmJnKHNlZWQsIGJ5dGVzVG9LZXkpOyAvLyBieXRlc1RvS2V5IG11c3QgcmV0dXJuIEtleSBvciB1bmRlZmluZWRcbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGNyZWF0ZUhtYWNEcmJnPFQ+KFxuICBoYXNoTGVuOiBudW1iZXIsXG4gIHFCeXRlTGVuOiBudW1iZXIsXG4gIGhtYWNGbjogKGtleTogVWludDhBcnJheSwgLi4ubWVzc2FnZXM6IFVpbnQ4QXJyYXlbXSkgPT4gVWludDhBcnJheVxuKTogKHNlZWQ6IFVpbnQ4QXJyYXksIHByZWRpY2F0ZTogUHJlZDxUPikgPT4gVCB7XG4gIGlmICh0eXBlb2YgaGFzaExlbiAhPT0gJ251bWJlcicgfHwgaGFzaExlbiA8IDIpIHRocm93IG5ldyBFcnJvcignaGFzaExlbiBtdXN0IGJlIGEgbnVtYmVyJyk7XG4gIGlmICh0eXBlb2YgcUJ5dGVMZW4gIT09ICdudW1iZXInIHx8IHFCeXRlTGVuIDwgMikgdGhyb3cgbmV3IEVycm9yKCdxQnl0ZUxlbiBtdXN0IGJlIGEgbnVtYmVyJyk7XG4gIGlmICh0eXBlb2YgaG1hY0ZuICE9PSAnZnVuY3Rpb24nKSB0aHJvdyBuZXcgRXJyb3IoJ2htYWNGbiBtdXN0IGJlIGEgZnVuY3Rpb24nKTtcbiAgLy8gU3RlcCBCLCBTdGVwIEM6IHNldCBoYXNoTGVuIHRvIDgqY2VpbChobGVuLzgpXG4gIGxldCB2ID0gdThuKGhhc2hMZW4pOyAvLyBNaW5pbWFsIG5vbi1mdWxsLXNwZWMgSE1BQy1EUkJHIGZyb20gTklTVCA4MDAtOTAgZm9yIFJGQzY5Nzkgc2lncy5cbiAgbGV0IGsgPSB1OG4oaGFzaExlbik7IC8vIFN0ZXBzIEIgYW5kIEMgb2YgUkZDNjk3OSAzLjI6IHNldCBoYXNoTGVuLCBpbiBvdXIgY2FzZSBhbHdheXMgc2FtZVxuICBsZXQgaSA9IDA7IC8vIEl0ZXJhdGlvbnMgY291bnRlciwgd2lsbCB0aHJvdyB3aGVuIG92ZXIgMTAwMFxuICBjb25zdCByZXNldCA9ICgpID0+IHtcbiAgICB2LmZpbGwoMSk7XG4gICAgay5maWxsKDApO1xuICAgIGkgPSAwO1xuICB9O1xuICBjb25zdCBoID0gKC4uLmI6IFVpbnQ4QXJyYXlbXSkgPT4gaG1hY0ZuKGssIHYsIC4uLmIpOyAvLyBobWFjKGspKHYsIC4uLnZhbHVlcylcbiAgY29uc3QgcmVzZWVkID0gKHNlZWQgPSB1OG4oKSkgPT4ge1xuICAgIC8vIEhNQUMtRFJCRyByZXNlZWQoKSBmdW5jdGlvbi4gU3RlcHMgRC1HXG4gICAgayA9IGgodThmcihbMHgwMF0pLCBzZWVkKTsgLy8gayA9IGhtYWMoayB8fCB2IHx8IDB4MDAgfHwgc2VlZClcbiAgICB2ID0gaCgpOyAvLyB2ID0gaG1hYyhrIHx8IHYpXG4gICAgaWYgKHNlZWQubGVuZ3RoID09PSAwKSByZXR1cm47XG4gICAgayA9IGgodThmcihbMHgwMV0pLCBzZWVkKTsgLy8gayA9IGhtYWMoayB8fCB2IHx8IDB4MDEgfHwgc2VlZClcbiAgICB2ID0gaCgpOyAvLyB2ID0gaG1hYyhrIHx8IHYpXG4gIH07XG4gIGNvbnN0IGdlbiA9ICgpID0+IHtcbiAgICAvLyBITUFDLURSQkcgZ2VuZXJhdGUoKSBmdW5jdGlvblxuICAgIGlmIChpKysgPj0gMTAwMCkgdGhyb3cgbmV3IEVycm9yKCdkcmJnOiB0cmllZCAxMDAwIHZhbHVlcycpO1xuICAgIGxldCBsZW4gPSAwO1xuICAgIGNvbnN0IG91dDogVWludDhBcnJheVtdID0gW107XG4gICAgd2hpbGUgKGxlbiA8IHFCeXRlTGVuKSB7XG4gICAgICB2ID0gaCgpO1xuICAgICAgY29uc3Qgc2wgPSB2LnNsaWNlKCk7XG4gICAgICBvdXQucHVzaChzbCk7XG4gICAgICBsZW4gKz0gdi5sZW5ndGg7XG4gICAgfVxuICAgIHJldHVybiBjb25jYXRCeXRlcyguLi5vdXQpO1xuICB9O1xuICBjb25zdCBnZW5VbnRpbCA9IChzZWVkOiBVaW50OEFycmF5LCBwcmVkOiBQcmVkPFQ+KTogVCA9PiB7XG4gICAgcmVzZXQoKTtcbiAgICByZXNlZWQoc2VlZCk7IC8vIFN0ZXBzIEQtR1xuICAgIGxldCByZXM6IFQgfCB1bmRlZmluZWQgPSB1bmRlZmluZWQ7IC8vIFN0ZXAgSDogZ3JpbmQgdW50aWwgayBpcyBpbiBbMS4ubi0xXVxuICAgIHdoaWxlICghKHJlcyA9IHByZWQoZ2VuKCkpKSkgcmVzZWVkKCk7XG4gICAgcmVzZXQoKTtcbiAgICByZXR1cm4gcmVzO1xuICB9O1xuICByZXR1cm4gZ2VuVW50aWw7XG59XG5cbi8vIFZhbGlkYXRpbmcgY3VydmVzIGFuZCBmaWVsZHNcblxuY29uc3QgdmFsaWRhdG9yRm5zID0ge1xuICBiaWdpbnQ6ICh2YWw6IGFueSk6IGJvb2xlYW4gPT4gdHlwZW9mIHZhbCA9PT0gJ2JpZ2ludCcsXG4gIGZ1bmN0aW9uOiAodmFsOiBhbnkpOiBib29sZWFuID0+IHR5cGVvZiB2YWwgPT09ICdmdW5jdGlvbicsXG4gIGJvb2xlYW46ICh2YWw6IGFueSk6IGJvb2xlYW4gPT4gdHlwZW9mIHZhbCA9PT0gJ2Jvb2xlYW4nLFxuICBzdHJpbmc6ICh2YWw6IGFueSk6IGJvb2xlYW4gPT4gdHlwZW9mIHZhbCA9PT0gJ3N0cmluZycsXG4gIHN0cmluZ09yVWludDhBcnJheTogKHZhbDogYW55KTogYm9vbGVhbiA9PiB0eXBlb2YgdmFsID09PSAnc3RyaW5nJyB8fCBpc0J5dGVzKHZhbCksXG4gIGlzU2FmZUludGVnZXI6ICh2YWw6IGFueSk6IGJvb2xlYW4gPT4gTnVtYmVyLmlzU2FmZUludGVnZXIodmFsKSxcbiAgYXJyYXk6ICh2YWw6IGFueSk6IGJvb2xlYW4gPT4gQXJyYXkuaXNBcnJheSh2YWwpLFxuICBmaWVsZDogKHZhbDogYW55LCBvYmplY3Q6IGFueSk6IGFueSA9PiAob2JqZWN0IGFzIGFueSkuRnAuaXNWYWxpZCh2YWwpLFxuICBoYXNoOiAodmFsOiBhbnkpOiBib29sZWFuID0+IHR5cGVvZiB2YWwgPT09ICdmdW5jdGlvbicgJiYgTnVtYmVyLmlzU2FmZUludGVnZXIodmFsLm91dHB1dExlbiksXG59IGFzIGNvbnN0O1xudHlwZSBWYWxpZGF0b3IgPSBrZXlvZiB0eXBlb2YgdmFsaWRhdG9yRm5zO1xudHlwZSBWYWxNYXA8VCBleHRlbmRzIFJlY29yZDxzdHJpbmcsIGFueT4+ID0geyBbSyBpbiBrZXlvZiBUXT86IFZhbGlkYXRvciB9O1xuLy8gdHlwZSBSZWNvcmQ8SyBleHRlbmRzIHN0cmluZyB8IG51bWJlciB8IHN5bWJvbCwgVD4gPSB7IFtQIGluIEtdOiBUOyB9XG5cbmV4cG9ydCBmdW5jdGlvbiB2YWxpZGF0ZU9iamVjdDxUIGV4dGVuZHMgUmVjb3JkPHN0cmluZywgYW55Pj4oXG4gIG9iamVjdDogVCxcbiAgdmFsaWRhdG9yczogVmFsTWFwPFQ+LFxuICBvcHRWYWxpZGF0b3JzOiBWYWxNYXA8VD4gPSB7fVxuKTogVCB7XG4gIGNvbnN0IGNoZWNrRmllbGQgPSAoZmllbGROYW1lOiBrZXlvZiBULCB0eXBlOiBWYWxpZGF0b3IsIGlzT3B0aW9uYWw6IGJvb2xlYW4pID0+IHtcbiAgICBjb25zdCBjaGVja1ZhbCA9IHZhbGlkYXRvckZuc1t0eXBlXTtcbiAgICBpZiAodHlwZW9mIGNoZWNrVmFsICE9PSAnZnVuY3Rpb24nKSB0aHJvdyBuZXcgRXJyb3IoJ2ludmFsaWQgdmFsaWRhdG9yIGZ1bmN0aW9uJyk7XG5cbiAgICBjb25zdCB2YWwgPSBvYmplY3RbZmllbGROYW1lIGFzIGtleW9mIHR5cGVvZiBvYmplY3RdO1xuICAgIGlmIChpc09wdGlvbmFsICYmIHZhbCA9PT0gdW5kZWZpbmVkKSByZXR1cm47XG4gICAgaWYgKCFjaGVja1ZhbCh2YWwsIG9iamVjdCkpIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcihcbiAgICAgICAgJ3BhcmFtICcgKyBTdHJpbmcoZmllbGROYW1lKSArICcgaXMgaW52YWxpZC4gRXhwZWN0ZWQgJyArIHR5cGUgKyAnLCBnb3QgJyArIHZhbFxuICAgICAgKTtcbiAgICB9XG4gIH07XG4gIGZvciAoY29uc3QgW2ZpZWxkTmFtZSwgdHlwZV0gb2YgT2JqZWN0LmVudHJpZXModmFsaWRhdG9ycykpIGNoZWNrRmllbGQoZmllbGROYW1lLCB0eXBlISwgZmFsc2UpO1xuICBmb3IgKGNvbnN0IFtmaWVsZE5hbWUsIHR5cGVdIG9mIE9iamVjdC5lbnRyaWVzKG9wdFZhbGlkYXRvcnMpKSBjaGVja0ZpZWxkKGZpZWxkTmFtZSwgdHlwZSEsIHRydWUpO1xuICByZXR1cm4gb2JqZWN0O1xufVxuLy8gdmFsaWRhdGUgdHlwZSB0ZXN0c1xuLy8gY29uc3QgbzogeyBhOiBudW1iZXI7IGI6IG51bWJlcjsgYzogbnVtYmVyIH0gPSB7IGE6IDEsIGI6IDUsIGM6IDYgfTtcbi8vIGNvbnN0IHowID0gdmFsaWRhdGVPYmplY3QobywgeyBhOiAnaXNTYWZlSW50ZWdlcicgfSwgeyBjOiAnYmlnaW50JyB9KTsgLy8gT2shXG4vLyAvLyBTaG91bGQgZmFpbCB0eXBlLWNoZWNrXG4vLyBjb25zdCB6MSA9IHZhbGlkYXRlT2JqZWN0KG8sIHsgYTogJ3RtcCcgfSwgeyBjOiAnenonIH0pO1xuLy8gY29uc3QgejIgPSB2YWxpZGF0ZU9iamVjdChvLCB7IGE6ICdpc1NhZmVJbnRlZ2VyJyB9LCB7IGM6ICd6eicgfSk7XG4vLyBjb25zdCB6MyA9IHZhbGlkYXRlT2JqZWN0KG8sIHsgdGVzdDogJ2Jvb2xlYW4nLCB6OiAnYnVnJyB9KTtcbi8vIGNvbnN0IHo0ID0gdmFsaWRhdGVPYmplY3QobywgeyBhOiAnYm9vbGVhbicsIHo6ICdidWcnIH0pO1xuXG4vKipcbiAqIHRocm93cyBub3QgaW1wbGVtZW50ZWQgZXJyb3JcbiAqL1xuZXhwb3J0IGNvbnN0IG5vdEltcGxlbWVudGVkID0gKCk6IG5ldmVyID0+IHtcbiAgdGhyb3cgbmV3IEVycm9yKCdub3QgaW1wbGVtZW50ZWQnKTtcbn07XG5cbi8qKlxuICogTWVtb2l6ZXMgKGNhY2hlcykgY29tcHV0YXRpb24gcmVzdWx0LlxuICogVXNlcyBXZWFrTWFwOiB0aGUgdmFsdWUgaXMgZ29pbmcgYXV0by1jbGVhbmVkIGJ5IEdDIGFmdGVyIGxhc3QgcmVmZXJlbmNlIGlzIHJlbW92ZWQuXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBtZW1vaXplZDxUIGV4dGVuZHMgb2JqZWN0LCBSLCBPIGV4dGVuZHMgYW55W10+KFxuICBmbjogKGFyZzogVCwgLi4uYXJnczogTykgPT4gUlxuKTogKGFyZzogVCwgLi4uYXJnczogTykgPT4gUiB7XG4gIGNvbnN0IG1hcCA9IG5ldyBXZWFrTWFwPFQsIFI+KCk7XG4gIHJldHVybiAoYXJnOiBULCAuLi5hcmdzOiBPKTogUiA9PiB7XG4gICAgY29uc3QgdmFsID0gbWFwLmdldChhcmcpO1xuICAgIGlmICh2YWwgIT09IHVuZGVmaW5lZCkgcmV0dXJuIHZhbDtcbiAgICBjb25zdCBjb21wdXRlZCA9IGZuKGFyZywgLi4uYXJncyk7XG4gICAgbWFwLnNldChhcmcsIGNvbXB1dGVkKTtcbiAgICByZXR1cm4gY29tcHV0ZWQ7XG4gIH07XG59XG4iLCAiLyoqXG4gKiBVdGlscyBmb3IgbW9kdWxhciBkaXZpc2lvbiBhbmQgZmluaXRlIGZpZWxkcy5cbiAqIEEgZmluaXRlIGZpZWxkIG92ZXIgMTEgaXMgaW50ZWdlciBudW1iZXIgb3BlcmF0aW9ucyBgbW9kIDExYC5cbiAqIFRoZXJlIGlzIG5vIGRpdmlzaW9uOiBpdCBpcyByZXBsYWNlZCBieSBtb2R1bGFyIG11bHRpcGxpY2F0aXZlIGludmVyc2UuXG4gKiBAbW9kdWxlXG4gKi9cbi8qISBub2JsZS1jdXJ2ZXMgLSBNSVQgTGljZW5zZSAoYykgMjAyMiBQYXVsIE1pbGxlciAocGF1bG1pbGxyLmNvbSkgKi9cbmltcG9ydCB7XG4gIGJpdE1hc2ssXG4gIGJ5dGVzVG9OdW1iZXJCRSxcbiAgYnl0ZXNUb051bWJlckxFLFxuICBlbnN1cmVCeXRlcyxcbiAgbnVtYmVyVG9CeXRlc0JFLFxuICBudW1iZXJUb0J5dGVzTEUsXG4gIHZhbGlkYXRlT2JqZWN0LFxufSBmcm9tICcuL3V0aWxzLmpzJztcblxuLy8gcHJldHRpZXItaWdub3JlXG5jb25zdCBfMG4gPSBCaWdJbnQoMCksIF8xbiA9IEJpZ0ludCgxKSwgXzJuID0gLyogQF9fUFVSRV9fICovIEJpZ0ludCgyKSwgXzNuID0gLyogQF9fUFVSRV9fICovIEJpZ0ludCgzKTtcbi8vIHByZXR0aWVyLWlnbm9yZVxuY29uc3QgXzRuID0gLyogQF9fUFVSRV9fICovIEJpZ0ludCg0KSwgXzVuID0gLyogQF9fUFVSRV9fICovIEJpZ0ludCg1KSwgXzhuID0gLyogQF9fUFVSRV9fICovIEJpZ0ludCg4KTtcbi8vIHByZXR0aWVyLWlnbm9yZVxuY29uc3QgXzluID0vKiBAX19QVVJFX18gKi8gQmlnSW50KDkpLCBfMTZuID0gLyogQF9fUFVSRV9fICovIEJpZ0ludCgxNik7XG5cbi8vIENhbGN1bGF0ZXMgYSBtb2R1bG8gYlxuZXhwb3J0IGZ1bmN0aW9uIG1vZChhOiBiaWdpbnQsIGI6IGJpZ2ludCk6IGJpZ2ludCB7XG4gIGNvbnN0IHJlc3VsdCA9IGEgJSBiO1xuICByZXR1cm4gcmVzdWx0ID49IF8wbiA/IHJlc3VsdCA6IGIgKyByZXN1bHQ7XG59XG4vKipcbiAqIEVmZmljaWVudGx5IHJhaXNlIG51bSB0byBwb3dlciBhbmQgZG8gbW9kdWxhciBkaXZpc2lvbi5cbiAqIFVuc2FmZSBpbiBzb21lIGNvbnRleHRzOiB1c2VzIGxhZGRlciwgc28gY2FuIGV4cG9zZSBiaWdpbnQgYml0cy5cbiAqIEB0b2RvIHVzZSBmaWVsZCB2ZXJzaW9uICYmIHJlbW92ZVxuICogQGV4YW1wbGVcbiAqIHBvdygybiwgNm4sIDExbikgLy8gNjRuICUgMTFuID09IDluXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBwb3cobnVtOiBiaWdpbnQsIHBvd2VyOiBiaWdpbnQsIG1vZHVsbzogYmlnaW50KTogYmlnaW50IHtcbiAgaWYgKHBvd2VyIDwgXzBuKSB0aHJvdyBuZXcgRXJyb3IoJ2ludmFsaWQgZXhwb25lbnQsIG5lZ2F0aXZlcyB1bnN1cHBvcnRlZCcpO1xuICBpZiAobW9kdWxvIDw9IF8wbikgdGhyb3cgbmV3IEVycm9yKCdpbnZhbGlkIG1vZHVsdXMnKTtcbiAgaWYgKG1vZHVsbyA9PT0gXzFuKSByZXR1cm4gXzBuO1xuICBsZXQgcmVzID0gXzFuO1xuICB3aGlsZSAocG93ZXIgPiBfMG4pIHtcbiAgICBpZiAocG93ZXIgJiBfMW4pIHJlcyA9IChyZXMgKiBudW0pICUgbW9kdWxvO1xuICAgIG51bSA9IChudW0gKiBudW0pICUgbW9kdWxvO1xuICAgIHBvd2VyID4+PSBfMW47XG4gIH1cbiAgcmV0dXJuIHJlcztcbn1cblxuLyoqIERvZXMgYHheKDJecG93ZXIpYCBtb2QgcC4gYHBvdzIoMzAsIDQpYCA9PSBgMzBeKDJeNClgICovXG5leHBvcnQgZnVuY3Rpb24gcG93Mih4OiBiaWdpbnQsIHBvd2VyOiBiaWdpbnQsIG1vZHVsbzogYmlnaW50KTogYmlnaW50IHtcbiAgbGV0IHJlcyA9IHg7XG4gIHdoaWxlIChwb3dlci0tID4gXzBuKSB7XG4gICAgcmVzICo9IHJlcztcbiAgICByZXMgJT0gbW9kdWxvO1xuICB9XG4gIHJldHVybiByZXM7XG59XG5cbi8qKlxuICogSW52ZXJzZXMgbnVtYmVyIG92ZXIgbW9kdWxvLlxuICogSW1wbGVtZW50ZWQgdXNpbmcgW0V1Y2xpZGVhbiBHQ0RdKGh0dHBzOi8vYnJpbGxpYW50Lm9yZy93aWtpL2V4dGVuZGVkLWV1Y2xpZGVhbi1hbGdvcml0aG0vKS5cbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGludmVydChudW1iZXI6IGJpZ2ludCwgbW9kdWxvOiBiaWdpbnQpOiBiaWdpbnQge1xuICBpZiAobnVtYmVyID09PSBfMG4pIHRocm93IG5ldyBFcnJvcignaW52ZXJ0OiBleHBlY3RlZCBub24temVybyBudW1iZXInKTtcbiAgaWYgKG1vZHVsbyA8PSBfMG4pIHRocm93IG5ldyBFcnJvcignaW52ZXJ0OiBleHBlY3RlZCBwb3NpdGl2ZSBtb2R1bHVzLCBnb3QgJyArIG1vZHVsbyk7XG4gIC8vIEZlcm1hdCdzIGxpdHRsZSB0aGVvcmVtIFwiQ1QtbGlrZVwiIHZlcnNpb24gaW52KG4pID0gbl4obS0yKSBtb2QgbSBpcyAzMHggc2xvd2VyLlxuICBsZXQgYSA9IG1vZChudW1iZXIsIG1vZHVsbyk7XG4gIGxldCBiID0gbW9kdWxvO1xuICAvLyBwcmV0dGllci1pZ25vcmVcbiAgbGV0IHggPSBfMG4sIHkgPSBfMW4sIHUgPSBfMW4sIHYgPSBfMG47XG4gIHdoaWxlIChhICE9PSBfMG4pIHtcbiAgICAvLyBKSVQgYXBwbGllcyBvcHRpbWl6YXRpb24gaWYgdGhvc2UgdHdvIGxpbmVzIGZvbGxvdyBlYWNoIG90aGVyXG4gICAgY29uc3QgcSA9IGIgLyBhO1xuICAgIGNvbnN0IHIgPSBiICUgYTtcbiAgICBjb25zdCBtID0geCAtIHUgKiBxO1xuICAgIGNvbnN0IG4gPSB5IC0gdiAqIHE7XG4gICAgLy8gcHJldHRpZXItaWdub3JlXG4gICAgYiA9IGEsIGEgPSByLCB4ID0gdSwgeSA9IHYsIHUgPSBtLCB2ID0gbjtcbiAgfVxuICBjb25zdCBnY2QgPSBiO1xuICBpZiAoZ2NkICE9PSBfMW4pIHRocm93IG5ldyBFcnJvcignaW52ZXJ0OiBkb2VzIG5vdCBleGlzdCcpO1xuICByZXR1cm4gbW9kKHgsIG1vZHVsbyk7XG59XG5cbi8qKlxuICogVG9uZWxsaS1TaGFua3Mgc3F1YXJlIHJvb3Qgc2VhcmNoIGFsZ29yaXRobS5cbiAqIDEuIGh0dHBzOi8vZXByaW50LmlhY3Iub3JnLzIwMTIvNjg1LnBkZiAocGFnZSAxMilcbiAqIDIuIFNxdWFyZSBSb290cyBmcm9tIDE7IDI0LCA1MSwgMTAgdG8gRGFuIFNoYW5rc1xuICogV2lsbCBzdGFydCBhbiBpbmZpbml0ZSBsb29wIGlmIGZpZWxkIG9yZGVyIFAgaXMgbm90IHByaW1lLlxuICogQHBhcmFtIFAgZmllbGQgb3JkZXJcbiAqIEByZXR1cm5zIGZ1bmN0aW9uIHRoYXQgdGFrZXMgZmllbGQgRnAgKGNyZWF0ZWQgZnJvbSBQKSBhbmQgbnVtYmVyIG5cbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIHRvbmVsbGlTaGFua3MoUDogYmlnaW50KTogPFQ+KEZwOiBJRmllbGQ8VD4sIG46IFQpID0+IFQge1xuICAvLyBMZWdlbmRyZSBjb25zdGFudDogdXNlZCB0byBjYWxjdWxhdGUgTGVnZW5kcmUgc3ltYm9sIChhIHwgcCksXG4gIC8vIHdoaWNoIGRlbm90ZXMgdGhlIHZhbHVlIG9mIGFeKChwLTEpLzIpIChtb2QgcCkuXG4gIC8vIChhIHwgcCkgXHUyMjYxIDEgICAgaWYgYSBpcyBhIHNxdWFyZSAobW9kIHApXG4gIC8vIChhIHwgcCkgXHUyMjYxIC0xICAgaWYgYSBpcyBub3QgYSBzcXVhcmUgKG1vZCBwKVxuICAvLyAoYSB8IHApIFx1MjI2MSAwICAgIGlmIGEgXHUyMjYxIDAgKG1vZCBwKVxuICBjb25zdCBsZWdlbmRyZUMgPSAoUCAtIF8xbikgLyBfMm47XG5cbiAgbGV0IFE6IGJpZ2ludCwgUzogbnVtYmVyLCBaOiBiaWdpbnQ7XG4gIC8vIFN0ZXAgMTogQnkgZmFjdG9yaW5nIG91dCBwb3dlcnMgb2YgMiBmcm9tIHAgLSAxLFxuICAvLyBmaW5kIHEgYW5kIHMgc3VjaCB0aGF0IHAgLSAxID0gcSooMl5zKSB3aXRoIHEgb2RkXG4gIGZvciAoUSA9IFAgLSBfMW4sIFMgPSAwOyBRICUgXzJuID09PSBfMG47IFEgLz0gXzJuLCBTKyspO1xuXG4gIC8vIFN0ZXAgMjogU2VsZWN0IGEgbm9uLXNxdWFyZSB6IHN1Y2ggdGhhdCAoeiB8IHApIFx1MjI2MSAtMSBhbmQgc2V0IGMgXHUyMjYxIHpxXG4gIGZvciAoWiA9IF8ybjsgWiA8IFAgJiYgcG93KFosIGxlZ2VuZHJlQywgUCkgIT09IFAgLSBfMW47IForKykge1xuICAgIC8vIENyYXNoIGluc3RlYWQgb2YgaW5maW5pdHkgbG9vcCwgd2UgY2Fubm90IHJlYXNvbmFibGUgY291bnQgdW50aWwgUC5cbiAgICBpZiAoWiA+IDEwMDApIHRocm93IG5ldyBFcnJvcignQ2Fubm90IGZpbmQgc3F1YXJlIHJvb3Q6IGxpa2VseSBub24tcHJpbWUgUCcpO1xuICB9XG5cbiAgLy8gRmFzdC1wYXRoXG4gIGlmIChTID09PSAxKSB7XG4gICAgY29uc3QgcDFkaXY0ID0gKFAgKyBfMW4pIC8gXzRuO1xuICAgIHJldHVybiBmdW5jdGlvbiB0b25lbGxpRmFzdDxUPihGcDogSUZpZWxkPFQ+LCBuOiBUKSB7XG4gICAgICBjb25zdCByb290ID0gRnAucG93KG4sIHAxZGl2NCk7XG4gICAgICBpZiAoIUZwLmVxbChGcC5zcXIocm9vdCksIG4pKSB0aHJvdyBuZXcgRXJyb3IoJ0Nhbm5vdCBmaW5kIHNxdWFyZSByb290Jyk7XG4gICAgICByZXR1cm4gcm9vdDtcbiAgICB9O1xuICB9XG5cbiAgLy8gU2xvdy1wYXRoXG4gIGNvbnN0IFExZGl2MiA9IChRICsgXzFuKSAvIF8ybjtcbiAgcmV0dXJuIGZ1bmN0aW9uIHRvbmVsbGlTbG93PFQ+KEZwOiBJRmllbGQ8VD4sIG46IFQpOiBUIHtcbiAgICAvLyBTdGVwIDA6IENoZWNrIHRoYXQgbiBpcyBpbmRlZWQgYSBzcXVhcmU6IChuIHwgcCkgc2hvdWxkIG5vdCBiZSBcdTIyNjEgLTFcbiAgICBpZiAoRnAucG93KG4sIGxlZ2VuZHJlQykgPT09IEZwLm5lZyhGcC5PTkUpKSB0aHJvdyBuZXcgRXJyb3IoJ0Nhbm5vdCBmaW5kIHNxdWFyZSByb290Jyk7XG4gICAgbGV0IHIgPSBTO1xuICAgIC8vIFRPRE86IHdpbGwgZmFpbCBhdCBGcDIvZXRjXG4gICAgbGV0IGcgPSBGcC5wb3coRnAubXVsKEZwLk9ORSwgWiksIFEpOyAvLyB3aWxsIHVwZGF0ZSBib3RoIHggYW5kIGJcbiAgICBsZXQgeCA9IEZwLnBvdyhuLCBRMWRpdjIpOyAvLyBmaXJzdCBndWVzcyBhdCB0aGUgc3F1YXJlIHJvb3RcbiAgICBsZXQgYiA9IEZwLnBvdyhuLCBRKTsgLy8gZmlyc3QgZ3Vlc3MgYXQgdGhlIGZ1ZGdlIGZhY3RvclxuXG4gICAgd2hpbGUgKCFGcC5lcWwoYiwgRnAuT05FKSkge1xuICAgICAgaWYgKEZwLmVxbChiLCBGcC5aRVJPKSkgcmV0dXJuIEZwLlpFUk87IC8vIGh0dHBzOi8vZW4ud2lraXBlZGlhLm9yZy93aWtpL1RvbmVsbGklRTIlODAlOTNTaGFua3NfYWxnb3JpdGhtICg0LiBJZiB0ID0gMCwgcmV0dXJuIHIgPSAwKVxuICAgICAgLy8gRmluZCBtIHN1Y2ggYl4oMl5tKT09MVxuICAgICAgbGV0IG0gPSAxO1xuICAgICAgZm9yIChsZXQgdDIgPSBGcC5zcXIoYik7IG0gPCByOyBtKyspIHtcbiAgICAgICAgaWYgKEZwLmVxbCh0MiwgRnAuT05FKSkgYnJlYWs7XG4gICAgICAgIHQyID0gRnAuc3FyKHQyKTsgLy8gdDIgKj0gdDJcbiAgICAgIH1cbiAgICAgIC8vIE5PVEU6IHItbS0xIGNhbiBiZSBiaWdnZXIgdGhhbiAzMiwgbmVlZCB0byBjb252ZXJ0IHRvIGJpZ2ludCBiZWZvcmUgc2hpZnQsIG90aGVyd2lzZSB0aGVyZSB3aWxsIGJlIG92ZXJmbG93XG4gICAgICBjb25zdCBnZSA9IEZwLnBvdyhnLCBfMW4gPDwgQmlnSW50KHIgLSBtIC0gMSkpOyAvLyBnZSA9IDJeKHItbS0xKVxuICAgICAgZyA9IEZwLnNxcihnZSk7IC8vIGcgPSBnZSAqIGdlXG4gICAgICB4ID0gRnAubXVsKHgsIGdlKTsgLy8geCAqPSBnZVxuICAgICAgYiA9IEZwLm11bChiLCBnKTsgLy8gYiAqPSBnXG4gICAgICByID0gbTtcbiAgICB9XG4gICAgcmV0dXJuIHg7XG4gIH07XG59XG5cbi8qKlxuICogU3F1YXJlIHJvb3QgZm9yIGEgZmluaXRlIGZpZWxkLiBJdCB3aWxsIHRyeSB0byBjaGVjayBpZiBvcHRpbWl6YXRpb25zIGFyZSBhcHBsaWNhYmxlIGFuZCBmYWxsIGJhY2sgdG8gNDpcbiAqXG4gKiAxLiBQIFx1MjI2MSAzIChtb2QgNClcbiAqIDIuIFAgXHUyMjYxIDUgKG1vZCA4KVxuICogMy4gUCBcdTIyNjEgOSAobW9kIDE2KVxuICogNC4gVG9uZWxsaS1TaGFua3MgYWxnb3JpdGhtXG4gKlxuICogRGlmZmVyZW50IGFsZ29yaXRobXMgY2FuIGdpdmUgZGlmZmVyZW50IHJvb3RzLCBpdCBpcyB1cCB0byB1c2VyIHRvIGRlY2lkZSB3aGljaCBvbmUgdGhleSB3YW50LlxuICogRm9yIGV4YW1wbGUgdGhlcmUgaXMgRnBTcXJ0T2RkL0ZwU3FydEV2ZW4gdG8gY2hvaWNlIHJvb3QgYmFzZWQgb24gb2RkbmVzcyAodXNlZCBmb3IgaGFzaC10by1jdXJ2ZSkuXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBGcFNxcnQoUDogYmlnaW50KTogPFQ+KEZwOiBJRmllbGQ8VD4sIG46IFQpID0+IFQge1xuICAvLyBQIFx1MjI2MSAzIChtb2QgNClcbiAgLy8gXHUyMjFBbiA9IG5eKChQKzEpLzQpXG4gIGlmIChQICUgXzRuID09PSBfM24pIHtcbiAgICAvLyBOb3QgYWxsIHJvb3RzIHBvc3NpYmxlIVxuICAgIC8vIGNvbnN0IE9SREVSID1cbiAgICAvLyAgIDB4MWEwMTExZWEzOTdmZTY5YTRiMWJhN2I2NDM0YmFjZDc2NDc3NGI4NGYzODUxMmJmNjczMGQyYTBmNmIwZjYyNDFlYWJmZmZlYjE1M2ZmZmZiOWZlZmZmZmZmZmZhYWFibjtcbiAgICAvLyBjb25zdCBOVU0gPSA3MjA1NzU5NDAzNzkyNzgxNm47XG4gICAgY29uc3QgcDFkaXY0ID0gKFAgKyBfMW4pIC8gXzRuO1xuICAgIHJldHVybiBmdW5jdGlvbiBzcXJ0M21vZDQ8VD4oRnA6IElGaWVsZDxUPiwgbjogVCkge1xuICAgICAgY29uc3Qgcm9vdCA9IEZwLnBvdyhuLCBwMWRpdjQpO1xuICAgICAgLy8gVGhyb3cgaWYgcm9vdCoqMiAhPSBuXG4gICAgICBpZiAoIUZwLmVxbChGcC5zcXIocm9vdCksIG4pKSB0aHJvdyBuZXcgRXJyb3IoJ0Nhbm5vdCBmaW5kIHNxdWFyZSByb290Jyk7XG4gICAgICByZXR1cm4gcm9vdDtcbiAgICB9O1xuICB9XG5cbiAgLy8gQXRraW4gYWxnb3JpdGhtIGZvciBxIFx1MjI2MSA1IChtb2QgOCksIGh0dHBzOi8vZXByaW50LmlhY3Iub3JnLzIwMTIvNjg1LnBkZiAocGFnZSAxMClcbiAgaWYgKFAgJSBfOG4gPT09IF81bikge1xuICAgIGNvbnN0IGMxID0gKFAgLSBfNW4pIC8gXzhuO1xuICAgIHJldHVybiBmdW5jdGlvbiBzcXJ0NW1vZDg8VD4oRnA6IElGaWVsZDxUPiwgbjogVCkge1xuICAgICAgY29uc3QgbjIgPSBGcC5tdWwobiwgXzJuKTtcbiAgICAgIGNvbnN0IHYgPSBGcC5wb3cobjIsIGMxKTtcbiAgICAgIGNvbnN0IG52ID0gRnAubXVsKG4sIHYpO1xuICAgICAgY29uc3QgaSA9IEZwLm11bChGcC5tdWwobnYsIF8ybiksIHYpO1xuICAgICAgY29uc3Qgcm9vdCA9IEZwLm11bChudiwgRnAuc3ViKGksIEZwLk9ORSkpO1xuICAgICAgaWYgKCFGcC5lcWwoRnAuc3FyKHJvb3QpLCBuKSkgdGhyb3cgbmV3IEVycm9yKCdDYW5ub3QgZmluZCBzcXVhcmUgcm9vdCcpO1xuICAgICAgcmV0dXJuIHJvb3Q7XG4gICAgfTtcbiAgfVxuXG4gIC8vIFAgXHUyMjYxIDkgKG1vZCAxNilcbiAgaWYgKFAgJSBfMTZuID09PSBfOW4pIHtcbiAgICAvLyBOT1RFOiB0b25lbGxpIGlzIHRvbyBzbG93IGZvciBibHMtRnAyIGNhbGN1bGF0aW9ucyBldmVuIG9uIHN0YXJ0XG4gICAgLy8gTWVhbnMgd2UgY2Fubm90IHVzZSBzcXJ0IGZvciBjb25zdGFudHMgYXQgYWxsIVxuICAgIC8vXG4gICAgLy8gY29uc3QgYzEgPSBGcC5zcXJ0KEZwLm5lZ2F0ZShGcC5PTkUpKTsgLy8gIDEuIGMxID0gc3FydCgtMSkgaW4gRiwgaS5lLiwgKGMxXjIpID09IC0xIGluIEZcbiAgICAvLyBjb25zdCBjMiA9IEZwLnNxcnQoYzEpOyAgICAgICAgICAgICAgICAvLyAgMi4gYzIgPSBzcXJ0KGMxKSBpbiBGLCBpLmUuLCAoYzJeMikgPT0gYzEgaW4gRlxuICAgIC8vIGNvbnN0IGMzID0gRnAuc3FydChGcC5uZWdhdGUoYzEpKTsgICAgIC8vICAzLiBjMyA9IHNxcnQoLWMxKSBpbiBGLCBpLmUuLCAoYzNeMikgPT0gLWMxIGluIEZcbiAgICAvLyBjb25zdCBjNCA9IChQICsgXzduKSAvIF8xNm47ICAgICAgICAgICAvLyAgNC4gYzQgPSAocSArIDcpIC8gMTYgICAgICAgICMgSW50ZWdlciBhcml0aG1ldGljXG4gICAgLy8gc3FydCA9ICh4KSA9PiB7XG4gICAgLy8gICBsZXQgdHYxID0gRnAucG93KHgsIGM0KTsgICAgICAgICAgICAgLy8gIDEuIHR2MSA9IHheYzRcbiAgICAvLyAgIGxldCB0djIgPSBGcC5tdWwoYzEsIHR2MSk7ICAgICAgICAgICAvLyAgMi4gdHYyID0gYzEgKiB0djFcbiAgICAvLyAgIGNvbnN0IHR2MyA9IEZwLm11bChjMiwgdHYxKTsgICAgICAgICAvLyAgMy4gdHYzID0gYzIgKiB0djFcbiAgICAvLyAgIGxldCB0djQgPSBGcC5tdWwoYzMsIHR2MSk7ICAgICAgICAgICAvLyAgNC4gdHY0ID0gYzMgKiB0djFcbiAgICAvLyAgIGNvbnN0IGUxID0gRnAuZXF1YWxzKEZwLnNxdWFyZSh0djIpLCB4KTsgLy8gIDUuICBlMSA9ICh0djJeMikgPT0geFxuICAgIC8vICAgY29uc3QgZTIgPSBGcC5lcXVhbHMoRnAuc3F1YXJlKHR2MyksIHgpOyAvLyAgNi4gIGUyID0gKHR2M14yKSA9PSB4XG4gICAgLy8gICB0djEgPSBGcC5jbW92KHR2MSwgdHYyLCBlMSk7IC8vICA3LiB0djEgPSBDTU9WKHR2MSwgdHYyLCBlMSkgICMgU2VsZWN0IHR2MiBpZiAodHYyXjIpID09IHhcbiAgICAvLyAgIHR2MiA9IEZwLmNtb3YodHY0LCB0djMsIGUyKTsgLy8gIDguIHR2MiA9IENNT1YodHY0LCB0djMsIGUyKSAgIyBTZWxlY3QgdHYzIGlmICh0djNeMikgPT0geFxuICAgIC8vICAgY29uc3QgZTMgPSBGcC5lcXVhbHMoRnAuc3F1YXJlKHR2MiksIHgpOyAvLyAgOS4gIGUzID0gKHR2Ml4yKSA9PSB4XG4gICAgLy8gICByZXR1cm4gRnAuY21vdih0djEsIHR2MiwgZTMpOyAvLyAgMTAuICB6ID0gQ01PVih0djEsIHR2MiwgZTMpICAjIFNlbGVjdCB0aGUgc3FydCBmcm9tIHR2MSBhbmQgdHYyXG4gICAgLy8gfVxuICB9XG4gIC8vIE90aGVyIGNhc2VzOiBUb25lbGxpLVNoYW5rcyBhbGdvcml0aG1cbiAgcmV0dXJuIHRvbmVsbGlTaGFua3MoUCk7XG59XG5cbi8vIExpdHRsZS1lbmRpYW4gY2hlY2sgZm9yIGZpcnN0IExFIGJpdCAobGFzdCBCRSBiaXQpO1xuZXhwb3J0IGNvbnN0IGlzTmVnYXRpdmVMRSA9IChudW06IGJpZ2ludCwgbW9kdWxvOiBiaWdpbnQpOiBib29sZWFuID0+XG4gIChtb2QobnVtLCBtb2R1bG8pICYgXzFuKSA9PT0gXzFuO1xuXG4vKiogRmllbGQgaXMgbm90IGFsd2F5cyBvdmVyIHByaW1lOiBmb3IgZXhhbXBsZSwgRnAyIGhhcyBPUkRFUihxKT1wXm0uICovXG5leHBvcnQgaW50ZXJmYWNlIElGaWVsZDxUPiB7XG4gIE9SREVSOiBiaWdpbnQ7XG4gIGlzTEU6IGJvb2xlYW47XG4gIEJZVEVTOiBudW1iZXI7XG4gIEJJVFM6IG51bWJlcjtcbiAgTUFTSzogYmlnaW50O1xuICBaRVJPOiBUO1xuICBPTkU6IFQ7XG4gIC8vIDEtYXJnXG4gIGNyZWF0ZTogKG51bTogVCkgPT4gVDtcbiAgaXNWYWxpZDogKG51bTogVCkgPT4gYm9vbGVhbjtcbiAgaXMwOiAobnVtOiBUKSA9PiBib29sZWFuO1xuICBuZWcobnVtOiBUKTogVDtcbiAgaW52KG51bTogVCk6IFQ7XG4gIHNxcnQobnVtOiBUKTogVDtcbiAgc3FyKG51bTogVCk6IFQ7XG4gIC8vIDItYXJnc1xuICBlcWwobGhzOiBULCByaHM6IFQpOiBib29sZWFuO1xuICBhZGQobGhzOiBULCByaHM6IFQpOiBUO1xuICBzdWIobGhzOiBULCByaHM6IFQpOiBUO1xuICBtdWwobGhzOiBULCByaHM6IFQgfCBiaWdpbnQpOiBUO1xuICBwb3cobGhzOiBULCBwb3dlcjogYmlnaW50KTogVDtcbiAgZGl2KGxoczogVCwgcmhzOiBUIHwgYmlnaW50KTogVDtcbiAgLy8gTiBmb3IgTm9uTm9ybWFsaXplZCAoZm9yIG5vdylcbiAgYWRkTihsaHM6IFQsIHJoczogVCk6IFQ7XG4gIHN1Yk4obGhzOiBULCByaHM6IFQpOiBUO1xuICBtdWxOKGxoczogVCwgcmhzOiBUIHwgYmlnaW50KTogVDtcbiAgc3FyTihudW06IFQpOiBUO1xuXG4gIC8vIE9wdGlvbmFsXG4gIC8vIFNob3VsZCBiZSBzYW1lIGFzIHNnbjAgZnVuY3Rpb24gaW5cbiAgLy8gW1JGQzkzODBdKGh0dHBzOi8vd3d3LnJmYy1lZGl0b3Iub3JnL3JmYy9yZmM5MzgwI3NlY3Rpb24tNC4xKS5cbiAgLy8gTk9URTogc2duMCBpcyAnbmVnYXRpdmUgaW4gTEUnLCB3aGljaCBpcyBzYW1lIGFzIG9kZC4gQW5kIG5lZ2F0aXZlIGluIExFIGlzIGtpbmRhIHN0cmFuZ2UgZGVmaW5pdGlvbiBhbnl3YXkuXG4gIGlzT2RkPyhudW06IFQpOiBib29sZWFuOyAvLyBPZGQgaW5zdGVhZCBvZiBldmVuIHNpbmNlIHdlIGhhdmUgaXQgZm9yIEZwMlxuICAvLyBsZWdlbmRyZT8obnVtOiBUKTogVDtcbiAgcG93KGxoczogVCwgcG93ZXI6IGJpZ2ludCk6IFQ7XG4gIGludmVydEJhdGNoOiAobHN0OiBUW10pID0+IFRbXTtcbiAgdG9CeXRlcyhudW06IFQpOiBVaW50OEFycmF5O1xuICBmcm9tQnl0ZXMoYnl0ZXM6IFVpbnQ4QXJyYXkpOiBUO1xuICAvLyBJZiBjIGlzIEZhbHNlLCBDTU9WIHJldHVybnMgYSwgb3RoZXJ3aXNlIGl0IHJldHVybnMgYi5cbiAgY21vdihhOiBULCBiOiBULCBjOiBib29sZWFuKTogVDtcbn1cbi8vIHByZXR0aWVyLWlnbm9yZVxuY29uc3QgRklFTERfRklFTERTID0gW1xuICAnY3JlYXRlJywgJ2lzVmFsaWQnLCAnaXMwJywgJ25lZycsICdpbnYnLCAnc3FydCcsICdzcXInLFxuICAnZXFsJywgJ2FkZCcsICdzdWInLCAnbXVsJywgJ3BvdycsICdkaXYnLFxuICAnYWRkTicsICdzdWJOJywgJ211bE4nLCAnc3FyTidcbl0gYXMgY29uc3Q7XG5leHBvcnQgZnVuY3Rpb24gdmFsaWRhdGVGaWVsZDxUPihmaWVsZDogSUZpZWxkPFQ+KTogSUZpZWxkPFQ+IHtcbiAgY29uc3QgaW5pdGlhbCA9IHtcbiAgICBPUkRFUjogJ2JpZ2ludCcsXG4gICAgTUFTSzogJ2JpZ2ludCcsXG4gICAgQllURVM6ICdpc1NhZmVJbnRlZ2VyJyxcbiAgICBCSVRTOiAnaXNTYWZlSW50ZWdlcicsXG4gIH0gYXMgUmVjb3JkPHN0cmluZywgc3RyaW5nPjtcbiAgY29uc3Qgb3B0cyA9IEZJRUxEX0ZJRUxEUy5yZWR1Y2UoKG1hcCwgdmFsOiBzdHJpbmcpID0+IHtcbiAgICBtYXBbdmFsXSA9ICdmdW5jdGlvbic7XG4gICAgcmV0dXJuIG1hcDtcbiAgfSwgaW5pdGlhbCk7XG4gIHJldHVybiB2YWxpZGF0ZU9iamVjdChmaWVsZCwgb3B0cyk7XG59XG5cbi8vIEdlbmVyaWMgZmllbGQgZnVuY3Rpb25zXG5cbi8qKlxuICogU2FtZSBhcyBgcG93YCBidXQgZm9yIEZwOiBub24tY29uc3RhbnQtdGltZS5cbiAqIFVuc2FmZSBpbiBzb21lIGNvbnRleHRzOiB1c2VzIGxhZGRlciwgc28gY2FuIGV4cG9zZSBiaWdpbnQgYml0cy5cbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIEZwUG93PFQ+KGY6IElGaWVsZDxUPiwgbnVtOiBULCBwb3dlcjogYmlnaW50KTogVCB7XG4gIC8vIFNob3VsZCBoYXZlIHNhbWUgc3BlZWQgYXMgcG93IGZvciBiaWdpbnRzXG4gIC8vIFRPRE86IGJlbmNobWFyayFcbiAgaWYgKHBvd2VyIDwgXzBuKSB0aHJvdyBuZXcgRXJyb3IoJ2ludmFsaWQgZXhwb25lbnQsIG5lZ2F0aXZlcyB1bnN1cHBvcnRlZCcpO1xuICBpZiAocG93ZXIgPT09IF8wbikgcmV0dXJuIGYuT05FO1xuICBpZiAocG93ZXIgPT09IF8xbikgcmV0dXJuIG51bTtcbiAgbGV0IHAgPSBmLk9ORTtcbiAgbGV0IGQgPSBudW07XG4gIHdoaWxlIChwb3dlciA+IF8wbikge1xuICAgIGlmIChwb3dlciAmIF8xbikgcCA9IGYubXVsKHAsIGQpO1xuICAgIGQgPSBmLnNxcihkKTtcbiAgICBwb3dlciA+Pj0gXzFuO1xuICB9XG4gIHJldHVybiBwO1xufVxuXG4vKipcbiAqIEVmZmljaWVudGx5IGludmVydCBhbiBhcnJheSBvZiBGaWVsZCBlbGVtZW50cy5cbiAqIGBpbnYoMClgIHdpbGwgcmV0dXJuIGB1bmRlZmluZWRgIGhlcmU6IG1ha2Ugc3VyZSB0byB0aHJvdyBhbiBlcnJvci5cbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIEZwSW52ZXJ0QmF0Y2g8VD4oZjogSUZpZWxkPFQ+LCBudW1zOiBUW10pOiBUW10ge1xuICBjb25zdCB0bXAgPSBuZXcgQXJyYXkobnVtcy5sZW5ndGgpO1xuICAvLyBXYWxrIGZyb20gZmlyc3QgdG8gbGFzdCwgbXVsdGlwbHkgdGhlbSBieSBlYWNoIG90aGVyIE1PRCBwXG4gIGNvbnN0IGxhc3RNdWx0aXBsaWVkID0gbnVtcy5yZWR1Y2UoKGFjYywgbnVtLCBpKSA9PiB7XG4gICAgaWYgKGYuaXMwKG51bSkpIHJldHVybiBhY2M7XG4gICAgdG1wW2ldID0gYWNjO1xuICAgIHJldHVybiBmLm11bChhY2MsIG51bSk7XG4gIH0sIGYuT05FKTtcbiAgLy8gSW52ZXJ0IGxhc3QgZWxlbWVudFxuICBjb25zdCBpbnZlcnRlZCA9IGYuaW52KGxhc3RNdWx0aXBsaWVkKTtcbiAgLy8gV2FsayBmcm9tIGxhc3QgdG8gZmlyc3QsIG11bHRpcGx5IHRoZW0gYnkgaW52ZXJ0ZWQgZWFjaCBvdGhlciBNT0QgcFxuICBudW1zLnJlZHVjZVJpZ2h0KChhY2MsIG51bSwgaSkgPT4ge1xuICAgIGlmIChmLmlzMChudW0pKSByZXR1cm4gYWNjO1xuICAgIHRtcFtpXSA9IGYubXVsKGFjYywgdG1wW2ldKTtcbiAgICByZXR1cm4gZi5tdWwoYWNjLCBudW0pO1xuICB9LCBpbnZlcnRlZCk7XG4gIHJldHVybiB0bXA7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBGcERpdjxUPihmOiBJRmllbGQ8VD4sIGxoczogVCwgcmhzOiBUIHwgYmlnaW50KTogVCB7XG4gIHJldHVybiBmLm11bChsaHMsIHR5cGVvZiByaHMgPT09ICdiaWdpbnQnID8gaW52ZXJ0KHJocywgZi5PUkRFUikgOiBmLmludihyaHMpKTtcbn1cblxuLyoqXG4gKiBMZWdlbmRyZSBzeW1ib2wuXG4gKiAqIChhIHwgcCkgXHUyMjYxIDEgICAgaWYgYSBpcyBhIHNxdWFyZSAobW9kIHApLCBxdWFkcmF0aWMgcmVzaWR1ZVxuICogKiAoYSB8IHApIFx1MjI2MSAtMSAgIGlmIGEgaXMgbm90IGEgc3F1YXJlIChtb2QgcCksIHF1YWRyYXRpYyBub24gcmVzaWR1ZVxuICogKiAoYSB8IHApIFx1MjI2MSAwICAgIGlmIGEgXHUyMjYxIDAgKG1vZCBwKVxuICovXG5leHBvcnQgZnVuY3Rpb24gRnBMZWdlbmRyZShvcmRlcjogYmlnaW50KTogPFQ+KGY6IElGaWVsZDxUPiwgeDogVCkgPT4gVCB7XG4gIGNvbnN0IGxlZ2VuZHJlQ29uc3QgPSAob3JkZXIgLSBfMW4pIC8gXzJuOyAvLyBJbnRlZ2VyIGFyaXRobWV0aWNcbiAgcmV0dXJuIDxUPihmOiBJRmllbGQ8VD4sIHg6IFQpOiBUID0+IGYucG93KHgsIGxlZ2VuZHJlQ29uc3QpO1xufVxuXG4vLyBUaGlzIGZ1bmN0aW9uIHJldHVybnMgVHJ1ZSB3aGVuZXZlciB0aGUgdmFsdWUgeCBpcyBhIHNxdWFyZSBpbiB0aGUgZmllbGQgRi5cbmV4cG9ydCBmdW5jdGlvbiBGcElzU3F1YXJlPFQ+KGY6IElGaWVsZDxUPik6ICh4OiBUKSA9PiBib29sZWFuIHtcbiAgY29uc3QgbGVnZW5kcmUgPSBGcExlZ2VuZHJlKGYuT1JERVIpO1xuICByZXR1cm4gKHg6IFQpOiBib29sZWFuID0+IHtcbiAgICBjb25zdCBwID0gbGVnZW5kcmUoZiwgeCk7XG4gICAgcmV0dXJuIGYuZXFsKHAsIGYuWkVSTykgfHwgZi5lcWwocCwgZi5PTkUpO1xuICB9O1xufVxuXG4vLyBDVVJWRS5uIGxlbmd0aHNcbmV4cG9ydCBmdW5jdGlvbiBuTGVuZ3RoKFxuICBuOiBiaWdpbnQsXG4gIG5CaXRMZW5ndGg/OiBudW1iZXJcbik6IHtcbiAgbkJpdExlbmd0aDogbnVtYmVyO1xuICBuQnl0ZUxlbmd0aDogbnVtYmVyO1xufSB7XG4gIC8vIEJpdCBzaXplLCBieXRlIHNpemUgb2YgQ1VSVkUublxuICBjb25zdCBfbkJpdExlbmd0aCA9IG5CaXRMZW5ndGggIT09IHVuZGVmaW5lZCA/IG5CaXRMZW5ndGggOiBuLnRvU3RyaW5nKDIpLmxlbmd0aDtcbiAgY29uc3QgbkJ5dGVMZW5ndGggPSBNYXRoLmNlaWwoX25CaXRMZW5ndGggLyA4KTtcbiAgcmV0dXJuIHsgbkJpdExlbmd0aDogX25CaXRMZW5ndGgsIG5CeXRlTGVuZ3RoIH07XG59XG5cbnR5cGUgRnBGaWVsZCA9IElGaWVsZDxiaWdpbnQ+ICYgUmVxdWlyZWQ8UGljazxJRmllbGQ8YmlnaW50PiwgJ2lzT2RkJz4+O1xuLyoqXG4gKiBJbml0aWFsaXplcyBhIGZpbml0ZSBmaWVsZCBvdmVyIHByaW1lLlxuICogTWFqb3IgcGVyZm9ybWFuY2Ugb3B0aW1pemF0aW9uczpcbiAqICogYSkgZGVub3JtYWxpemVkIG9wZXJhdGlvbnMgbGlrZSBtdWxOIGluc3RlYWQgb2YgbXVsXG4gKiAqIGIpIHNhbWUgb2JqZWN0IHNoYXBlOiBuZXZlciBhZGQgb3IgcmVtb3ZlIGtleXNcbiAqICogYykgT2JqZWN0LmZyZWV6ZVxuICogRnJhZ2lsZTogYWx3YXlzIHJ1biBhIGJlbmNobWFyayBvbiBhIGNoYW5nZS5cbiAqIFNlY3VyaXR5IG5vdGU6IG9wZXJhdGlvbnMgZG9uJ3QgY2hlY2sgJ2lzVmFsaWQnIGZvciBhbGwgZWxlbWVudHMgZm9yIHBlcmZvcm1hbmNlIHJlYXNvbnMsXG4gKiBpdCBpcyBjYWxsZXIgcmVzcG9uc2liaWxpdHkgdG8gY2hlY2sgdGhpcy5cbiAqIFRoaXMgaXMgbG93LWxldmVsIGNvZGUsIHBsZWFzZSBtYWtlIHN1cmUgeW91IGtub3cgd2hhdCB5b3UncmUgZG9pbmcuXG4gKiBAcGFyYW0gT1JERVIgcHJpbWUgcG9zaXRpdmUgYmlnaW50XG4gKiBAcGFyYW0gYml0TGVuIGhvdyBtYW55IGJpdHMgdGhlIGZpZWxkIGNvbnN1bWVzXG4gKiBAcGFyYW0gaXNMRSAoZGVmOiBmYWxzZSkgaWYgZW5jb2RpbmcgLyBkZWNvZGluZyBzaG91bGQgYmUgaW4gbGl0dGxlLWVuZGlhblxuICogQHBhcmFtIHJlZGVmIG9wdGlvbmFsIGZhc3RlciByZWRlZmluaXRpb25zIG9mIHNxcnQgYW5kIG90aGVyIG1ldGhvZHNcbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIEZpZWxkKFxuICBPUkRFUjogYmlnaW50LFxuICBiaXRMZW4/OiBudW1iZXIsXG4gIGlzTEUgPSBmYWxzZSxcbiAgcmVkZWY6IFBhcnRpYWw8SUZpZWxkPGJpZ2ludD4+ID0ge31cbik6IFJlYWRvbmx5PEZwRmllbGQ+IHtcbiAgaWYgKE9SREVSIDw9IF8wbikgdGhyb3cgbmV3IEVycm9yKCdpbnZhbGlkIGZpZWxkOiBleHBlY3RlZCBPUkRFUiA+IDAsIGdvdCAnICsgT1JERVIpO1xuICBjb25zdCB7IG5CaXRMZW5ndGg6IEJJVFMsIG5CeXRlTGVuZ3RoOiBCWVRFUyB9ID0gbkxlbmd0aChPUkRFUiwgYml0TGVuKTtcbiAgaWYgKEJZVEVTID4gMjA0OCkgdGhyb3cgbmV3IEVycm9yKCdpbnZhbGlkIGZpZWxkOiBleHBlY3RlZCBPUkRFUiBvZiA8PSAyMDQ4IGJ5dGVzJyk7XG4gIGxldCBzcXJ0UDogUmV0dXJuVHlwZTx0eXBlb2YgRnBTcXJ0PjsgLy8gY2FjaGVkIHNxcnRQXG4gIGNvbnN0IGY6IFJlYWRvbmx5PEZwRmllbGQ+ID0gT2JqZWN0LmZyZWV6ZSh7XG4gICAgT1JERVIsXG4gICAgaXNMRSxcbiAgICBCSVRTLFxuICAgIEJZVEVTLFxuICAgIE1BU0s6IGJpdE1hc2soQklUUyksXG4gICAgWkVSTzogXzBuLFxuICAgIE9ORTogXzFuLFxuICAgIGNyZWF0ZTogKG51bSkgPT4gbW9kKG51bSwgT1JERVIpLFxuICAgIGlzVmFsaWQ6IChudW0pID0+IHtcbiAgICAgIGlmICh0eXBlb2YgbnVtICE9PSAnYmlnaW50JylcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdpbnZhbGlkIGZpZWxkIGVsZW1lbnQ6IGV4cGVjdGVkIGJpZ2ludCwgZ290ICcgKyB0eXBlb2YgbnVtKTtcbiAgICAgIHJldHVybiBfMG4gPD0gbnVtICYmIG51bSA8IE9SREVSOyAvLyAwIGlzIHZhbGlkIGVsZW1lbnQsIGJ1dCBpdCdzIG5vdCBpbnZlcnRpYmxlXG4gICAgfSxcbiAgICBpczA6IChudW0pID0+IG51bSA9PT0gXzBuLFxuICAgIGlzT2RkOiAobnVtKSA9PiAobnVtICYgXzFuKSA9PT0gXzFuLFxuICAgIG5lZzogKG51bSkgPT4gbW9kKC1udW0sIE9SREVSKSxcbiAgICBlcWw6IChsaHMsIHJocykgPT4gbGhzID09PSByaHMsXG5cbiAgICBzcXI6IChudW0pID0+IG1vZChudW0gKiBudW0sIE9SREVSKSxcbiAgICBhZGQ6IChsaHMsIHJocykgPT4gbW9kKGxocyArIHJocywgT1JERVIpLFxuICAgIHN1YjogKGxocywgcmhzKSA9PiBtb2QobGhzIC0gcmhzLCBPUkRFUiksXG4gICAgbXVsOiAobGhzLCByaHMpID0+IG1vZChsaHMgKiByaHMsIE9SREVSKSxcbiAgICBwb3c6IChudW0sIHBvd2VyKSA9PiBGcFBvdyhmLCBudW0sIHBvd2VyKSxcbiAgICBkaXY6IChsaHMsIHJocykgPT4gbW9kKGxocyAqIGludmVydChyaHMsIE9SREVSKSwgT1JERVIpLFxuXG4gICAgLy8gU2FtZSBhcyBhYm92ZSwgYnV0IGRvZXNuJ3Qgbm9ybWFsaXplXG4gICAgc3FyTjogKG51bSkgPT4gbnVtICogbnVtLFxuICAgIGFkZE46IChsaHMsIHJocykgPT4gbGhzICsgcmhzLFxuICAgIHN1Yk46IChsaHMsIHJocykgPT4gbGhzIC0gcmhzLFxuICAgIG11bE46IChsaHMsIHJocykgPT4gbGhzICogcmhzLFxuXG4gICAgaW52OiAobnVtKSA9PiBpbnZlcnQobnVtLCBPUkRFUiksXG4gICAgc3FydDpcbiAgICAgIHJlZGVmLnNxcnQgfHxcbiAgICAgICgobikgPT4ge1xuICAgICAgICBpZiAoIXNxcnRQKSBzcXJ0UCA9IEZwU3FydChPUkRFUik7XG4gICAgICAgIHJldHVybiBzcXJ0UChmLCBuKTtcbiAgICAgIH0pLFxuICAgIGludmVydEJhdGNoOiAobHN0KSA9PiBGcEludmVydEJhdGNoKGYsIGxzdCksXG4gICAgLy8gVE9ETzogZG8gd2UgcmVhbGx5IG5lZWQgY29uc3RhbnQgY21vdj9cbiAgICAvLyBXZSBkb24ndCBoYXZlIGNvbnN0LXRpbWUgYmlnaW50cyBhbnl3YXksIHNvIHByb2JhYmx5IHdpbGwgYmUgbm90IHZlcnkgdXNlZnVsXG4gICAgY21vdjogKGEsIGIsIGMpID0+IChjID8gYiA6IGEpLFxuICAgIHRvQnl0ZXM6IChudW0pID0+IChpc0xFID8gbnVtYmVyVG9CeXRlc0xFKG51bSwgQllURVMpIDogbnVtYmVyVG9CeXRlc0JFKG51bSwgQllURVMpKSxcbiAgICBmcm9tQnl0ZXM6IChieXRlcykgPT4ge1xuICAgICAgaWYgKGJ5dGVzLmxlbmd0aCAhPT0gQllURVMpXG4gICAgICAgIHRocm93IG5ldyBFcnJvcignRmllbGQuZnJvbUJ5dGVzOiBleHBlY3RlZCAnICsgQllURVMgKyAnIGJ5dGVzLCBnb3QgJyArIGJ5dGVzLmxlbmd0aCk7XG4gICAgICByZXR1cm4gaXNMRSA/IGJ5dGVzVG9OdW1iZXJMRShieXRlcykgOiBieXRlc1RvTnVtYmVyQkUoYnl0ZXMpO1xuICAgIH0sXG4gIH0gYXMgRnBGaWVsZCk7XG4gIHJldHVybiBPYmplY3QuZnJlZXplKGYpO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gRnBTcXJ0T2RkPFQ+KEZwOiBJRmllbGQ8VD4sIGVsbTogVCk6IFQge1xuICBpZiAoIUZwLmlzT2RkKSB0aHJvdyBuZXcgRXJyb3IoXCJGaWVsZCBkb2Vzbid0IGhhdmUgaXNPZGRcIik7XG4gIGNvbnN0IHJvb3QgPSBGcC5zcXJ0KGVsbSk7XG4gIHJldHVybiBGcC5pc09kZChyb290KSA/IHJvb3QgOiBGcC5uZWcocm9vdCk7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBGcFNxcnRFdmVuPFQ+KEZwOiBJRmllbGQ8VD4sIGVsbTogVCk6IFQge1xuICBpZiAoIUZwLmlzT2RkKSB0aHJvdyBuZXcgRXJyb3IoXCJGaWVsZCBkb2Vzbid0IGhhdmUgaXNPZGRcIik7XG4gIGNvbnN0IHJvb3QgPSBGcC5zcXJ0KGVsbSk7XG4gIHJldHVybiBGcC5pc09kZChyb290KSA/IEZwLm5lZyhyb290KSA6IHJvb3Q7XG59XG5cbi8qKlxuICogXCJDb25zdGFudC10aW1lXCIgcHJpdmF0ZSBrZXkgZ2VuZXJhdGlvbiB1dGlsaXR5LlxuICogU2FtZSBhcyBtYXBLZXlUb0ZpZWxkLCBidXQgYWNjZXB0cyBsZXNzIGJ5dGVzICg0MCBpbnN0ZWFkIG9mIDQ4IGZvciAzMi1ieXRlIGZpZWxkKS5cbiAqIFdoaWNoIG1ha2VzIGl0IHNsaWdodGx5IG1vcmUgYmlhc2VkLCBsZXNzIHNlY3VyZS5cbiAqIEBkZXByZWNhdGVkIHVzZSBgbWFwS2V5VG9GaWVsZGAgaW5zdGVhZFxuICovXG5leHBvcnQgZnVuY3Rpb24gaGFzaFRvUHJpdmF0ZVNjYWxhcihcbiAgaGFzaDogc3RyaW5nIHwgVWludDhBcnJheSxcbiAgZ3JvdXBPcmRlcjogYmlnaW50LFxuICBpc0xFID0gZmFsc2Vcbik6IGJpZ2ludCB7XG4gIGhhc2ggPSBlbnN1cmVCeXRlcygncHJpdmF0ZUhhc2gnLCBoYXNoKTtcbiAgY29uc3QgaGFzaExlbiA9IGhhc2gubGVuZ3RoO1xuICBjb25zdCBtaW5MZW4gPSBuTGVuZ3RoKGdyb3VwT3JkZXIpLm5CeXRlTGVuZ3RoICsgODtcbiAgaWYgKG1pbkxlbiA8IDI0IHx8IGhhc2hMZW4gPCBtaW5MZW4gfHwgaGFzaExlbiA+IDEwMjQpXG4gICAgdGhyb3cgbmV3IEVycm9yKFxuICAgICAgJ2hhc2hUb1ByaXZhdGVTY2FsYXI6IGV4cGVjdGVkICcgKyBtaW5MZW4gKyAnLTEwMjQgYnl0ZXMgb2YgaW5wdXQsIGdvdCAnICsgaGFzaExlblxuICAgICk7XG4gIGNvbnN0IG51bSA9IGlzTEUgPyBieXRlc1RvTnVtYmVyTEUoaGFzaCkgOiBieXRlc1RvTnVtYmVyQkUoaGFzaCk7XG4gIHJldHVybiBtb2QobnVtLCBncm91cE9yZGVyIC0gXzFuKSArIF8xbjtcbn1cblxuLyoqXG4gKiBSZXR1cm5zIHRvdGFsIG51bWJlciBvZiBieXRlcyBjb25zdW1lZCBieSB0aGUgZmllbGQgZWxlbWVudC5cbiAqIEZvciBleGFtcGxlLCAzMiBieXRlcyBmb3IgdXN1YWwgMjU2LWJpdCB3ZWllcnN0cmFzcyBjdXJ2ZS5cbiAqIEBwYXJhbSBmaWVsZE9yZGVyIG51bWJlciBvZiBmaWVsZCBlbGVtZW50cywgdXN1YWxseSBDVVJWRS5uXG4gKiBAcmV0dXJucyBieXRlIGxlbmd0aCBvZiBmaWVsZFxuICovXG5leHBvcnQgZnVuY3Rpb24gZ2V0RmllbGRCeXRlc0xlbmd0aChmaWVsZE9yZGVyOiBiaWdpbnQpOiBudW1iZXIge1xuICBpZiAodHlwZW9mIGZpZWxkT3JkZXIgIT09ICdiaWdpbnQnKSB0aHJvdyBuZXcgRXJyb3IoJ2ZpZWxkIG9yZGVyIG11c3QgYmUgYmlnaW50Jyk7XG4gIGNvbnN0IGJpdExlbmd0aCA9IGZpZWxkT3JkZXIudG9TdHJpbmcoMikubGVuZ3RoO1xuICByZXR1cm4gTWF0aC5jZWlsKGJpdExlbmd0aCAvIDgpO1xufVxuXG4vKipcbiAqIFJldHVybnMgbWluaW1hbCBhbW91bnQgb2YgYnl0ZXMgdGhhdCBjYW4gYmUgc2FmZWx5IHJlZHVjZWRcbiAqIGJ5IGZpZWxkIG9yZGVyLlxuICogU2hvdWxkIGJlIDJeLTEyOCBmb3IgMTI4LWJpdCBjdXJ2ZSBzdWNoIGFzIFAyNTYuXG4gKiBAcGFyYW0gZmllbGRPcmRlciBudW1iZXIgb2YgZmllbGQgZWxlbWVudHMsIHVzdWFsbHkgQ1VSVkUublxuICogQHJldHVybnMgYnl0ZSBsZW5ndGggb2YgdGFyZ2V0IGhhc2hcbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGdldE1pbkhhc2hMZW5ndGgoZmllbGRPcmRlcjogYmlnaW50KTogbnVtYmVyIHtcbiAgY29uc3QgbGVuZ3RoID0gZ2V0RmllbGRCeXRlc0xlbmd0aChmaWVsZE9yZGVyKTtcbiAgcmV0dXJuIGxlbmd0aCArIE1hdGguY2VpbChsZW5ndGggLyAyKTtcbn1cblxuLyoqXG4gKiBcIkNvbnN0YW50LXRpbWVcIiBwcml2YXRlIGtleSBnZW5lcmF0aW9uIHV0aWxpdHkuXG4gKiBDYW4gdGFrZSAobiArIG4vMikgb3IgbW9yZSBieXRlcyBvZiB1bmlmb3JtIGlucHV0IGUuZy4gZnJvbSBDU1BSTkcgb3IgS0RGXG4gKiBhbmQgY29udmVydCB0aGVtIGludG8gcHJpdmF0ZSBzY2FsYXIsIHdpdGggdGhlIG1vZHVsbyBiaWFzIGJlaW5nIG5lZ2xpZ2libGUuXG4gKiBOZWVkcyBhdCBsZWFzdCA0OCBieXRlcyBvZiBpbnB1dCBmb3IgMzItYnl0ZSBwcml2YXRlIGtleS5cbiAqIGh0dHBzOi8vcmVzZWFyY2gua3VkZWxza2lzZWN1cml0eS5jb20vMjAyMC8wNy8yOC90aGUtZGVmaW5pdGl2ZS1ndWlkZS10by1tb2R1bG8tYmlhcy1hbmQtaG93LXRvLWF2b2lkLWl0L1xuICogRklQUyAxODYtNSwgQS4yIGh0dHBzOi8vY3NyYy5uaXN0Lmdvdi9wdWJsaWNhdGlvbnMvZGV0YWlsL2ZpcHMvMTg2LzUvZmluYWxcbiAqIFJGQyA5MzgwLCBodHRwczovL3d3dy5yZmMtZWRpdG9yLm9yZy9yZmMvcmZjOTM4MCNzZWN0aW9uLTVcbiAqIEBwYXJhbSBoYXNoIGhhc2ggb3V0cHV0IGZyb20gU0hBMyBvciBhIHNpbWlsYXIgZnVuY3Rpb25cbiAqIEBwYXJhbSBncm91cE9yZGVyIHNpemUgb2Ygc3ViZ3JvdXAgLSAoZS5nLiBzZWNwMjU2azEuQ1VSVkUubilcbiAqIEBwYXJhbSBpc0xFIGludGVycHJldCBoYXNoIGJ5dGVzIGFzIExFIG51bVxuICogQHJldHVybnMgdmFsaWQgcHJpdmF0ZSBzY2FsYXJcbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIG1hcEhhc2hUb0ZpZWxkKGtleTogVWludDhBcnJheSwgZmllbGRPcmRlcjogYmlnaW50LCBpc0xFID0gZmFsc2UpOiBVaW50OEFycmF5IHtcbiAgY29uc3QgbGVuID0ga2V5Lmxlbmd0aDtcbiAgY29uc3QgZmllbGRMZW4gPSBnZXRGaWVsZEJ5dGVzTGVuZ3RoKGZpZWxkT3JkZXIpO1xuICBjb25zdCBtaW5MZW4gPSBnZXRNaW5IYXNoTGVuZ3RoKGZpZWxkT3JkZXIpO1xuICAvLyBObyBzbWFsbCBudW1iZXJzOiBuZWVkIHRvIHVuZGVyc3RhbmQgYmlhcyBzdG9yeS4gTm8gaHVnZSBudW1iZXJzOiBlYXNpZXIgdG8gZGV0ZWN0IEpTIHRpbWluZ3MuXG4gIGlmIChsZW4gPCAxNiB8fCBsZW4gPCBtaW5MZW4gfHwgbGVuID4gMTAyNClcbiAgICB0aHJvdyBuZXcgRXJyb3IoJ2V4cGVjdGVkICcgKyBtaW5MZW4gKyAnLTEwMjQgYnl0ZXMgb2YgaW5wdXQsIGdvdCAnICsgbGVuKTtcbiAgY29uc3QgbnVtID0gaXNMRSA/IGJ5dGVzVG9OdW1iZXJMRShrZXkpIDogYnl0ZXNUb051bWJlckJFKGtleSk7XG4gIC8vIGBtb2QoeCwgMTEpYCBjYW4gc29tZXRpbWVzIHByb2R1Y2UgMC4gYG1vZCh4LCAxMCkgKyAxYCBpcyB0aGUgc2FtZSwgYnV0IG5vIDBcbiAgY29uc3QgcmVkdWNlZCA9IG1vZChudW0sIGZpZWxkT3JkZXIgLSBfMW4pICsgXzFuO1xuICByZXR1cm4gaXNMRSA/IG51bWJlclRvQnl0ZXNMRShyZWR1Y2VkLCBmaWVsZExlbikgOiBudW1iZXJUb0J5dGVzQkUocmVkdWNlZCwgZmllbGRMZW4pO1xufVxuIiwgIi8qKlxuICogTW9udGdvbWVyeSBjdXJ2ZSBtZXRob2RzLiBJdCdzIG5vdCByZWFsbHkgd2hvbGUgbW9udGdvbWVyeSBjdXJ2ZSxcbiAqIGp1c3QgYnVuY2ggb2YgdmVyeSBzcGVjaWZpYyBtZXRob2RzIGZvciBYMjU1MTkgLyBYNDQ4IGZyb21cbiAqIFtSRkMgNzc0OF0oaHR0cHM6Ly93d3cucmZjLWVkaXRvci5vcmcvcmZjL3JmYzc3NDgpXG4gKiBAbW9kdWxlXG4gKi9cbi8qISBub2JsZS1jdXJ2ZXMgLSBNSVQgTGljZW5zZSAoYykgMjAyMiBQYXVsIE1pbGxlciAocGF1bG1pbGxyLmNvbSkgKi9cbmltcG9ydCB7IG1vZCwgcG93IH0gZnJvbSAnLi9tb2R1bGFyLmpzJztcbmltcG9ydCB7XG4gIGFJblJhbmdlLFxuICBieXRlc1RvTnVtYmVyTEUsXG4gIGVuc3VyZUJ5dGVzLFxuICBudW1iZXJUb0J5dGVzTEUsXG4gIHZhbGlkYXRlT2JqZWN0LFxufSBmcm9tICcuL3V0aWxzLmpzJztcblxuY29uc3QgXzBuID0gQmlnSW50KDApO1xuY29uc3QgXzFuID0gQmlnSW50KDEpO1xudHlwZSBIZXggPSBzdHJpbmcgfCBVaW50OEFycmF5O1xuXG5leHBvcnQgdHlwZSBDdXJ2ZVR5cGUgPSB7XG4gIFA6IGJpZ2ludDsgLy8gZmluaXRlIGZpZWxkIHByaW1lXG4gIG5CeXRlTGVuZ3RoOiBudW1iZXI7XG4gIGFkanVzdFNjYWxhckJ5dGVzPzogKGJ5dGVzOiBVaW50OEFycmF5KSA9PiBVaW50OEFycmF5O1xuICBkb21haW4/OiAoZGF0YTogVWludDhBcnJheSwgY3R4OiBVaW50OEFycmF5LCBwaGZsYWc6IGJvb2xlYW4pID0+IFVpbnQ4QXJyYXk7XG4gIGE6IGJpZ2ludDtcbiAgbW9udGdvbWVyeUJpdHM6IG51bWJlcjtcbiAgcG93UG1pbnVzMj86ICh4OiBiaWdpbnQpID0+IGJpZ2ludDtcbiAgeHlUb1U/OiAoeDogYmlnaW50LCB5OiBiaWdpbnQpID0+IGJpZ2ludDtcbiAgR3U6IGJpZ2ludDtcbiAgcmFuZG9tQnl0ZXM/OiAoYnl0ZXNMZW5ndGg/OiBudW1iZXIpID0+IFVpbnQ4QXJyYXk7XG59O1xuXG5leHBvcnQgdHlwZSBDdXJ2ZUZuID0ge1xuICBzY2FsYXJNdWx0OiAoc2NhbGFyOiBIZXgsIHU6IEhleCkgPT4gVWludDhBcnJheTtcbiAgc2NhbGFyTXVsdEJhc2U6IChzY2FsYXI6IEhleCkgPT4gVWludDhBcnJheTtcbiAgZ2V0U2hhcmVkU2VjcmV0OiAocHJpdmF0ZUtleUE6IEhleCwgcHVibGljS2V5QjogSGV4KSA9PiBVaW50OEFycmF5O1xuICBnZXRQdWJsaWNLZXk6IChwcml2YXRlS2V5OiBIZXgpID0+IFVpbnQ4QXJyYXk7XG4gIHV0aWxzOiB7IHJhbmRvbVByaXZhdGVLZXk6ICgpID0+IFVpbnQ4QXJyYXkgfTtcbiAgR3VCeXRlczogVWludDhBcnJheTtcbn07XG5cbmZ1bmN0aW9uIHZhbGlkYXRlT3B0cyhjdXJ2ZTogQ3VydmVUeXBlKSB7XG4gIHZhbGlkYXRlT2JqZWN0KFxuICAgIGN1cnZlLFxuICAgIHtcbiAgICAgIGE6ICdiaWdpbnQnLFxuICAgIH0sXG4gICAge1xuICAgICAgbW9udGdvbWVyeUJpdHM6ICdpc1NhZmVJbnRlZ2VyJyxcbiAgICAgIG5CeXRlTGVuZ3RoOiAnaXNTYWZlSW50ZWdlcicsXG4gICAgICBhZGp1c3RTY2FsYXJCeXRlczogJ2Z1bmN0aW9uJyxcbiAgICAgIGRvbWFpbjogJ2Z1bmN0aW9uJyxcbiAgICAgIHBvd1BtaW51czI6ICdmdW5jdGlvbicsXG4gICAgICBHdTogJ2JpZ2ludCcsXG4gICAgfVxuICApO1xuICAvLyBTZXQgZGVmYXVsdHNcbiAgcmV0dXJuIE9iamVjdC5mcmVlemUoeyAuLi5jdXJ2ZSB9IGFzIGNvbnN0KTtcbn1cblxuLy8gVXNlcyBvbmx5IG9uZSBjb29yZGluYXRlIGluc3RlYWQgb2YgdHdvXG5leHBvcnQgZnVuY3Rpb24gbW9udGdvbWVyeShjdXJ2ZURlZjogQ3VydmVUeXBlKTogQ3VydmVGbiB7XG4gIGNvbnN0IENVUlZFID0gdmFsaWRhdGVPcHRzKGN1cnZlRGVmKTtcbiAgY29uc3QgeyBQIH0gPSBDVVJWRTtcbiAgY29uc3QgbW9kUCA9IChuOiBiaWdpbnQpID0+IG1vZChuLCBQKTtcbiAgY29uc3QgbW9udGdvbWVyeUJpdHMgPSBDVVJWRS5tb250Z29tZXJ5Qml0cztcbiAgY29uc3QgbW9udGdvbWVyeUJ5dGVzID0gTWF0aC5jZWlsKG1vbnRnb21lcnlCaXRzIC8gOCk7XG4gIGNvbnN0IGZpZWxkTGVuID0gQ1VSVkUubkJ5dGVMZW5ndGg7XG4gIGNvbnN0IGFkanVzdFNjYWxhckJ5dGVzID0gQ1VSVkUuYWRqdXN0U2NhbGFyQnl0ZXMgfHwgKChieXRlczogVWludDhBcnJheSkgPT4gYnl0ZXMpO1xuICBjb25zdCBwb3dQbWludXMyID0gQ1VSVkUucG93UG1pbnVzMiB8fCAoKHg6IGJpZ2ludCkgPT4gcG93KHgsIFAgLSBCaWdJbnQoMiksIFApKTtcblxuICAvLyBjc3dhcCBmcm9tIFJGQzc3NDguIEJ1dCBpdCBpcyBub3QgZnJvbSBSRkM3NzQ4IVxuICAvKlxuICAgIGNzd2FwKHN3YXAsIHhfMiwgeF8zKTpcbiAgICAgICAgIGR1bW15ID0gbWFzayhzd2FwKSBBTkQgKHhfMiBYT1IgeF8zKVxuICAgICAgICAgeF8yID0geF8yIFhPUiBkdW1teVxuICAgICAgICAgeF8zID0geF8zIFhPUiBkdW1teVxuICAgICAgICAgUmV0dXJuICh4XzIsIHhfMylcbiAgV2hlcmUgbWFzayhzd2FwKSBpcyB0aGUgYWxsLTEgb3IgYWxsLTAgd29yZCBvZiB0aGUgc2FtZSBsZW5ndGggYXMgeF8yXG4gICBhbmQgeF8zLCBjb21wdXRlZCwgZS5nLiwgYXMgbWFzayhzd2FwKSA9IDAgLSBzd2FwLlxuICAqL1xuICBmdW5jdGlvbiBjc3dhcChzd2FwOiBiaWdpbnQsIHhfMjogYmlnaW50LCB4XzM6IGJpZ2ludCk6IFtiaWdpbnQsIGJpZ2ludF0ge1xuICAgIGNvbnN0IGR1bW15ID0gbW9kUChzd2FwICogKHhfMiAtIHhfMykpO1xuICAgIHhfMiA9IG1vZFAoeF8yIC0gZHVtbXkpO1xuICAgIHhfMyA9IG1vZFAoeF8zICsgZHVtbXkpO1xuICAgIHJldHVybiBbeF8yLCB4XzNdO1xuICB9XG5cbiAgLy8geDI1NTE5IGZyb20gNFxuICAvLyBUaGUgY29uc3RhbnQgYTI0IGlzICg0ODY2NjIgLSAyKSAvIDQgPSAxMjE2NjUgZm9yIGN1cnZlMjU1MTkvWDI1NTE5XG4gIGNvbnN0IGEyNCA9IChDVVJWRS5hIC0gQmlnSW50KDIpKSAvIEJpZ0ludCg0KTtcbiAgLyoqXG4gICAqXG4gICAqIEBwYXJhbSBwb2ludFUgdSBjb29yZGluYXRlICh4KSBvbiBNb250Z29tZXJ5IEN1cnZlIDI1NTE5XG4gICAqIEBwYXJhbSBzY2FsYXIgYnkgd2hpY2ggdGhlIHBvaW50IHdvdWxkIGJlIG11bHRpcGxpZWRcbiAgICogQHJldHVybnMgbmV3IFBvaW50IG9uIE1vbnRnb21lcnkgY3VydmVcbiAgICovXG4gIGZ1bmN0aW9uIG1vbnRnb21lcnlMYWRkZXIodTogYmlnaW50LCBzY2FsYXI6IGJpZ2ludCk6IGJpZ2ludCB7XG4gICAgYUluUmFuZ2UoJ3UnLCB1LCBfMG4sIFApO1xuICAgIGFJblJhbmdlKCdzY2FsYXInLCBzY2FsYXIsIF8wbiwgUCk7XG4gICAgLy8gU2VjdGlvbiA1OiBJbXBsZW1lbnRhdGlvbnMgTVVTVCBhY2NlcHQgbm9uLWNhbm9uaWNhbCB2YWx1ZXMgYW5kIHByb2Nlc3MgdGhlbSBhc1xuICAgIC8vIGlmIHRoZXkgaGFkIGJlZW4gcmVkdWNlZCBtb2R1bG8gdGhlIGZpZWxkIHByaW1lLlxuICAgIGNvbnN0IGsgPSBzY2FsYXI7XG4gICAgY29uc3QgeF8xID0gdTtcbiAgICBsZXQgeF8yID0gXzFuO1xuICAgIGxldCB6XzIgPSBfMG47XG4gICAgbGV0IHhfMyA9IHU7XG4gICAgbGV0IHpfMyA9IF8xbjtcbiAgICBsZXQgc3dhcCA9IF8wbjtcbiAgICBsZXQgc3c6IFtiaWdpbnQsIGJpZ2ludF07XG4gICAgZm9yIChsZXQgdCA9IEJpZ0ludChtb250Z29tZXJ5Qml0cyAtIDEpOyB0ID49IF8wbjsgdC0tKSB7XG4gICAgICBjb25zdCBrX3QgPSAoayA+PiB0KSAmIF8xbjtcbiAgICAgIHN3YXAgXj0ga190O1xuICAgICAgc3cgPSBjc3dhcChzd2FwLCB4XzIsIHhfMyk7XG4gICAgICB4XzIgPSBzd1swXTtcbiAgICAgIHhfMyA9IHN3WzFdO1xuICAgICAgc3cgPSBjc3dhcChzd2FwLCB6XzIsIHpfMyk7XG4gICAgICB6XzIgPSBzd1swXTtcbiAgICAgIHpfMyA9IHN3WzFdO1xuICAgICAgc3dhcCA9IGtfdDtcblxuICAgICAgY29uc3QgQSA9IHhfMiArIHpfMjtcbiAgICAgIGNvbnN0IEFBID0gbW9kUChBICogQSk7XG4gICAgICBjb25zdCBCID0geF8yIC0gel8yO1xuICAgICAgY29uc3QgQkIgPSBtb2RQKEIgKiBCKTtcbiAgICAgIGNvbnN0IEUgPSBBQSAtIEJCO1xuICAgICAgY29uc3QgQyA9IHhfMyArIHpfMztcbiAgICAgIGNvbnN0IEQgPSB4XzMgLSB6XzM7XG4gICAgICBjb25zdCBEQSA9IG1vZFAoRCAqIEEpO1xuICAgICAgY29uc3QgQ0IgPSBtb2RQKEMgKiBCKTtcbiAgICAgIGNvbnN0IGRhY2IgPSBEQSArIENCO1xuICAgICAgY29uc3QgZGFfY2IgPSBEQSAtIENCO1xuICAgICAgeF8zID0gbW9kUChkYWNiICogZGFjYik7XG4gICAgICB6XzMgPSBtb2RQKHhfMSAqIG1vZFAoZGFfY2IgKiBkYV9jYikpO1xuICAgICAgeF8yID0gbW9kUChBQSAqIEJCKTtcbiAgICAgIHpfMiA9IG1vZFAoRSAqIChBQSArIG1vZFAoYTI0ICogRSkpKTtcbiAgICB9XG4gICAgLy8gKHhfMiwgeF8zKSA9IGNzd2FwKHN3YXAsIHhfMiwgeF8zKVxuICAgIHN3ID0gY3N3YXAoc3dhcCwgeF8yLCB4XzMpO1xuICAgIHhfMiA9IHN3WzBdO1xuICAgIHhfMyA9IHN3WzFdO1xuICAgIC8vICh6XzIsIHpfMykgPSBjc3dhcChzd2FwLCB6XzIsIHpfMylcbiAgICBzdyA9IGNzd2FwKHN3YXAsIHpfMiwgel8zKTtcbiAgICB6XzIgPSBzd1swXTtcbiAgICB6XzMgPSBzd1sxXTtcbiAgICAvLyB6XzJeKHAgLSAyKVxuICAgIGNvbnN0IHoyID0gcG93UG1pbnVzMih6XzIpO1xuICAgIC8vIFJldHVybiB4XzIgKiAoel8yXihwIC0gMikpXG4gICAgcmV0dXJuIG1vZFAoeF8yICogejIpO1xuICB9XG5cbiAgZnVuY3Rpb24gZW5jb2RlVUNvb3JkaW5hdGUodTogYmlnaW50KTogVWludDhBcnJheSB7XG4gICAgcmV0dXJuIG51bWJlclRvQnl0ZXNMRShtb2RQKHUpLCBtb250Z29tZXJ5Qnl0ZXMpO1xuICB9XG5cbiAgZnVuY3Rpb24gZGVjb2RlVUNvb3JkaW5hdGUodUVuYzogSGV4KTogYmlnaW50IHtcbiAgICAvLyBTZWN0aW9uIDU6IFdoZW4gcmVjZWl2aW5nIHN1Y2ggYW4gYXJyYXksIGltcGxlbWVudGF0aW9ucyBvZiBYMjU1MTlcbiAgICAvLyBNVVNUIG1hc2sgdGhlIG1vc3Qgc2lnbmlmaWNhbnQgYml0IGluIHRoZSBmaW5hbCBieXRlLlxuICAgIGNvbnN0IHUgPSBlbnN1cmVCeXRlcygndSBjb29yZGluYXRlJywgdUVuYywgbW9udGdvbWVyeUJ5dGVzKTtcbiAgICBpZiAoZmllbGRMZW4gPT09IDMyKSB1WzMxXSAmPSAxMjc7IC8vIDBiMDExMV8xMTExXG4gICAgcmV0dXJuIGJ5dGVzVG9OdW1iZXJMRSh1KTtcbiAgfVxuICBmdW5jdGlvbiBkZWNvZGVTY2FsYXIobjogSGV4KTogYmlnaW50IHtcbiAgICBjb25zdCBieXRlcyA9IGVuc3VyZUJ5dGVzKCdzY2FsYXInLCBuKTtcbiAgICBjb25zdCBsZW4gPSBieXRlcy5sZW5ndGg7XG4gICAgaWYgKGxlbiAhPT0gbW9udGdvbWVyeUJ5dGVzICYmIGxlbiAhPT0gZmllbGRMZW4pIHtcbiAgICAgIGxldCB2YWxpZCA9ICcnICsgbW9udGdvbWVyeUJ5dGVzICsgJyBvciAnICsgZmllbGRMZW47XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoJ2ludmFsaWQgc2NhbGFyLCBleHBlY3RlZCAnICsgdmFsaWQgKyAnIGJ5dGVzLCBnb3QgJyArIGxlbik7XG4gICAgfVxuICAgIHJldHVybiBieXRlc1RvTnVtYmVyTEUoYWRqdXN0U2NhbGFyQnl0ZXMoYnl0ZXMpKTtcbiAgfVxuICBmdW5jdGlvbiBzY2FsYXJNdWx0KHNjYWxhcjogSGV4LCB1OiBIZXgpOiBVaW50OEFycmF5IHtcbiAgICBjb25zdCBwb2ludFUgPSBkZWNvZGVVQ29vcmRpbmF0ZSh1KTtcbiAgICBjb25zdCBfc2NhbGFyID0gZGVjb2RlU2NhbGFyKHNjYWxhcik7XG4gICAgY29uc3QgcHUgPSBtb250Z29tZXJ5TGFkZGVyKHBvaW50VSwgX3NjYWxhcik7XG4gICAgLy8gVGhlIHJlc3VsdCB3YXMgbm90IGNvbnRyaWJ1dG9yeVxuICAgIC8vIGh0dHBzOi8vY3IueXAudG8vZWNkaC5odG1sI3ZhbGlkYXRlXG4gICAgaWYgKHB1ID09PSBfMG4pIHRocm93IG5ldyBFcnJvcignaW52YWxpZCBwcml2YXRlIG9yIHB1YmxpYyBrZXkgcmVjZWl2ZWQnKTtcbiAgICByZXR1cm4gZW5jb2RlVUNvb3JkaW5hdGUocHUpO1xuICB9XG4gIC8vIENvbXB1dGVzIHB1YmxpYyBrZXkgZnJvbSBwcml2YXRlLiBCeSBkb2luZyBzY2FsYXIgbXVsdGlwbGljYXRpb24gb2YgYmFzZSBwb2ludC5cbiAgY29uc3QgR3VCeXRlcyA9IGVuY29kZVVDb29yZGluYXRlKENVUlZFLkd1KTtcbiAgZnVuY3Rpb24gc2NhbGFyTXVsdEJhc2Uoc2NhbGFyOiBIZXgpOiBVaW50OEFycmF5IHtcbiAgICByZXR1cm4gc2NhbGFyTXVsdChzY2FsYXIsIEd1Qnl0ZXMpO1xuICB9XG5cbiAgcmV0dXJuIHtcbiAgICBzY2FsYXJNdWx0LFxuICAgIHNjYWxhck11bHRCYXNlLFxuICAgIGdldFNoYXJlZFNlY3JldDogKHByaXZhdGVLZXk6IEhleCwgcHVibGljS2V5OiBIZXgpID0+IHNjYWxhck11bHQocHJpdmF0ZUtleSwgcHVibGljS2V5KSxcbiAgICBnZXRQdWJsaWNLZXk6IChwcml2YXRlS2V5OiBIZXgpOiBVaW50OEFycmF5ID0+IHNjYWxhck11bHRCYXNlKHByaXZhdGVLZXkpLFxuICAgIHV0aWxzOiB7IHJhbmRvbVByaXZhdGVLZXk6ICgpID0+IENVUlZFLnJhbmRvbUJ5dGVzIShDVVJWRS5uQnl0ZUxlbmd0aCkgfSxcbiAgICBHdUJ5dGVzOiBHdUJ5dGVzLFxuICB9O1xufVxuIiwgIi8qKlxuICogZWQyNTUxOSBUd2lzdGVkIEVkd2FyZHMgY3VydmUgd2l0aCBmb2xsb3dpbmcgYWRkb25zOlxuICogLSBYMjU1MTkgRUNESFxuICogLSBSaXN0cmV0dG8gY29mYWN0b3IgZWxpbWluYXRpb25cbiAqIC0gRWxsaWdhdG9yIGhhc2gtdG8tZ3JvdXAgLyBwb2ludCBpbmRpc3Rpbmd1aXNoYWJpbGl0eVxuICogQG1vZHVsZVxuICovXG4vKiEgbm9ibGUtY3VydmVzIC0gTUlUIExpY2Vuc2UgKGMpIDIwMjIgUGF1bCBNaWxsZXIgKHBhdWxtaWxsci5jb20pICovXG5pbXBvcnQgeyBzaGE1MTIgfSBmcm9tICdAbm9ibGUvaGFzaGVzL3NoYTUxMic7XG5pbXBvcnQgeyBjb25jYXRCeXRlcywgcmFuZG9tQnl0ZXMsIHV0ZjhUb0J5dGVzIH0gZnJvbSAnQG5vYmxlL2hhc2hlcy91dGlscyc7XG5pbXBvcnQgeyBBZmZpbmVQb2ludCwgR3JvdXAgfSBmcm9tICcuL2Fic3RyYWN0L2N1cnZlLmpzJztcbmltcG9ydCB7IEN1cnZlRm4sIEV4dFBvaW50VHlwZSwgdHdpc3RlZEVkd2FyZHMgfSBmcm9tICcuL2Fic3RyYWN0L2Vkd2FyZHMuanMnO1xuaW1wb3J0IHtcbiAgY3JlYXRlSGFzaGVyLFxuICBleHBhbmRfbWVzc2FnZV94bWQsXG4gIGh0ZkJhc2ljT3B0cyxcbiAgSFRGTWV0aG9kLFxufSBmcm9tICcuL2Fic3RyYWN0L2hhc2gtdG8tY3VydmUuanMnO1xuaW1wb3J0IHsgRmllbGQsIEZwU3FydEV2ZW4sIGlzTmVnYXRpdmVMRSwgbW9kLCBwb3cyIH0gZnJvbSAnLi9hYnN0cmFjdC9tb2R1bGFyLmpzJztcbmltcG9ydCB7IEN1cnZlRm4gYXMgWEN1cnZlRm4sIG1vbnRnb21lcnkgfSBmcm9tICcuL2Fic3RyYWN0L21vbnRnb21lcnkuanMnO1xuaW1wb3J0IHsgcGlwcGVuZ2VyIH0gZnJvbSAnLi9hYnN0cmFjdC9jdXJ2ZS5qcyc7XG5pbXBvcnQge1xuICBieXRlc1RvSGV4LFxuICBieXRlc1RvTnVtYmVyTEUsXG4gIGVuc3VyZUJ5dGVzLFxuICBlcXVhbEJ5dGVzLFxuICBIZXgsXG4gIG51bWJlclRvQnl0ZXNMRSxcbn0gZnJvbSAnLi9hYnN0cmFjdC91dGlscy5qcyc7XG5cbmNvbnN0IEVEMjU1MTlfUCA9IEJpZ0ludChcbiAgJzU3ODk2MDQ0NjE4NjU4MDk3NzExNzg1NDkyNTA0MzQzOTUzOTI2NjM0OTkyMzMyODIwMjgyMDE5NzI4NzkyMDAzOTU2NTY0ODE5OTQ5J1xuKTtcbi8vIFx1MjIxQSgtMSkgYWthIFx1MjIxQShhKSBha2EgMl4oKHAtMSkvNClcbmNvbnN0IEVEMjU1MTlfU1FSVF9NMSA9IC8qIEBfX1BVUkVfXyAqLyBCaWdJbnQoXG4gICcxOTY4MTE2MTM3NjcwNzUwNTk1NjgwNzA3OTMwNDk4ODU0MjAxNTQ0NjA2NjUxNTkyMzg5MDE2Mjc0NDAyMTA3MzEyMzgyOTc4NDc1Midcbik7XG5cbi8vIHByZXR0aWVyLWlnbm9yZVxuY29uc3QgXzBuID0gQmlnSW50KDApLCBfMW4gPSBCaWdJbnQoMSksIF8ybiA9IEJpZ0ludCgyKSwgXzNuID0gQmlnSW50KDMpO1xuLy8gcHJldHRpZXItaWdub3JlXG5jb25zdCBfNW4gPSBCaWdJbnQoNSksIF84biA9IEJpZ0ludCg4KTtcblxuZnVuY3Rpb24gZWQyNTUxOV9wb3dfMl8yNTJfMyh4OiBiaWdpbnQpIHtcbiAgLy8gcHJldHRpZXItaWdub3JlXG4gIGNvbnN0IF8xMG4gPSBCaWdJbnQoMTApLCBfMjBuID0gQmlnSW50KDIwKSwgXzQwbiA9IEJpZ0ludCg0MCksIF84MG4gPSBCaWdJbnQoODApO1xuICBjb25zdCBQID0gRUQyNTUxOV9QO1xuICBjb25zdCB4MiA9ICh4ICogeCkgJSBQO1xuICBjb25zdCBiMiA9ICh4MiAqIHgpICUgUDsgLy8geF4zLCAxMVxuICBjb25zdCBiNCA9IChwb3cyKGIyLCBfMm4sIFApICogYjIpICUgUDsgLy8geF4xNSwgMTExMVxuICBjb25zdCBiNSA9IChwb3cyKGI0LCBfMW4sIFApICogeCkgJSBQOyAvLyB4XjMxXG4gIGNvbnN0IGIxMCA9IChwb3cyKGI1LCBfNW4sIFApICogYjUpICUgUDtcbiAgY29uc3QgYjIwID0gKHBvdzIoYjEwLCBfMTBuLCBQKSAqIGIxMCkgJSBQO1xuICBjb25zdCBiNDAgPSAocG93MihiMjAsIF8yMG4sIFApICogYjIwKSAlIFA7XG4gIGNvbnN0IGI4MCA9IChwb3cyKGI0MCwgXzQwbiwgUCkgKiBiNDApICUgUDtcbiAgY29uc3QgYjE2MCA9IChwb3cyKGI4MCwgXzgwbiwgUCkgKiBiODApICUgUDtcbiAgY29uc3QgYjI0MCA9IChwb3cyKGIxNjAsIF84MG4sIFApICogYjgwKSAlIFA7XG4gIGNvbnN0IGIyNTAgPSAocG93MihiMjQwLCBfMTBuLCBQKSAqIGIxMCkgJSBQO1xuICBjb25zdCBwb3dfcF81XzggPSAocG93MihiMjUwLCBfMm4sIFApICogeCkgJSBQO1xuICAvLyBeIFRvIHBvdyB0byAocCszKS84LCBtdWx0aXBseSBpdCBieSB4LlxuICByZXR1cm4geyBwb3dfcF81XzgsIGIyIH07XG59XG5cbmZ1bmN0aW9uIGFkanVzdFNjYWxhckJ5dGVzKGJ5dGVzOiBVaW50OEFycmF5KTogVWludDhBcnJheSB7XG4gIC8vIFNlY3Rpb24gNTogRm9yIFgyNTUxOSwgaW4gb3JkZXIgdG8gZGVjb2RlIDMyIHJhbmRvbSBieXRlcyBhcyBhbiBpbnRlZ2VyIHNjYWxhcixcbiAgLy8gc2V0IHRoZSB0aHJlZSBsZWFzdCBzaWduaWZpY2FudCBiaXRzIG9mIHRoZSBmaXJzdCBieXRlXG4gIGJ5dGVzWzBdICY9IDI0ODsgLy8gMGIxMTExXzEwMDBcbiAgLy8gYW5kIHRoZSBtb3N0IHNpZ25pZmljYW50IGJpdCBvZiB0aGUgbGFzdCB0byB6ZXJvLFxuICBieXRlc1szMV0gJj0gMTI3OyAvLyAwYjAxMTFfMTExMVxuICAvLyBzZXQgdGhlIHNlY29uZCBtb3N0IHNpZ25pZmljYW50IGJpdCBvZiB0aGUgbGFzdCBieXRlIHRvIDFcbiAgYnl0ZXNbMzFdIHw9IDY0OyAvLyAwYjAxMDBfMDAwMFxuICByZXR1cm4gYnl0ZXM7XG59XG5cbi8vIHNxcnQodS92KVxuZnVuY3Rpb24gdXZSYXRpbyh1OiBiaWdpbnQsIHY6IGJpZ2ludCk6IHsgaXNWYWxpZDogYm9vbGVhbjsgdmFsdWU6IGJpZ2ludCB9IHtcbiAgY29uc3QgUCA9IEVEMjU1MTlfUDtcbiAgY29uc3QgdjMgPSBtb2QodiAqIHYgKiB2LCBQKTsgLy8gdlx1MDBCM1xuICBjb25zdCB2NyA9IG1vZCh2MyAqIHYzICogdiwgUCk7IC8vIHZcdTIwNzdcbiAgLy8gKHArMykvOCBhbmQgKHAtNSkvOFxuICBjb25zdCBwb3cgPSBlZDI1NTE5X3Bvd18yXzI1Ml8zKHUgKiB2NykucG93X3BfNV84O1xuICBsZXQgeCA9IG1vZCh1ICogdjMgKiBwb3csIFApOyAvLyAodXZcdTAwQjMpKHV2XHUyMDc3KV4ocC01KS84XG4gIGNvbnN0IHZ4MiA9IG1vZCh2ICogeCAqIHgsIFApOyAvLyB2eFx1MDBCMlxuICBjb25zdCByb290MSA9IHg7IC8vIEZpcnN0IHJvb3QgY2FuZGlkYXRlXG4gIGNvbnN0IHJvb3QyID0gbW9kKHggKiBFRDI1NTE5X1NRUlRfTTEsIFApOyAvLyBTZWNvbmQgcm9vdCBjYW5kaWRhdGVcbiAgY29uc3QgdXNlUm9vdDEgPSB2eDIgPT09IHU7IC8vIElmIHZ4XHUwMEIyID0gdSAobW9kIHApLCB4IGlzIGEgc3F1YXJlIHJvb3RcbiAgY29uc3QgdXNlUm9vdDIgPSB2eDIgPT09IG1vZCgtdSwgUCk7IC8vIElmIHZ4XHUwMEIyID0gLXUsIHNldCB4IDwtLSB4ICogMl4oKHAtMSkvNClcbiAgY29uc3Qgbm9Sb290ID0gdngyID09PSBtb2QoLXUgKiBFRDI1NTE5X1NRUlRfTTEsIFApOyAvLyBUaGVyZSBpcyBubyB2YWxpZCByb290LCB2eFx1MDBCMiA9IC11XHUyMjFBKC0xKVxuICBpZiAodXNlUm9vdDEpIHggPSByb290MTtcbiAgaWYgKHVzZVJvb3QyIHx8IG5vUm9vdCkgeCA9IHJvb3QyOyAvLyBXZSByZXR1cm4gcm9vdDIgYW55d2F5LCBmb3IgY29uc3QtdGltZVxuICBpZiAoaXNOZWdhdGl2ZUxFKHgsIFApKSB4ID0gbW9kKC14LCBQKTtcbiAgcmV0dXJuIHsgaXNWYWxpZDogdXNlUm9vdDEgfHwgdXNlUm9vdDIsIHZhbHVlOiB4IH07XG59XG5cbi8vIEp1c3QgaW4gY2FzZVxuZXhwb3J0IGNvbnN0IEVEMjU1MTlfVE9SU0lPTl9TVUJHUk9VUDogc3RyaW5nW10gPSBbXG4gICcwMTAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwJyxcbiAgJ2M3MTc2YTcwM2Q0ZGQ4NGZiYTNjMGI3NjBkMTA2NzBmMmEyMDUzZmEyYzM5Y2NjNjRlYzdmZDc3OTJhYzAzN2EnLFxuICAnMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDA4MCcsXG4gICcyNmU4OTU4ZmMyYjIyN2IwNDVjM2Y0ODlmMmVmOThmMGQ1ZGZhYzA1ZDNjNjMzMzliMTM4MDI4ODZkNTNmYzA1JyxcbiAgJ2VjZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmN2YnLFxuICAnMjZlODk1OGZjMmIyMjdiMDQ1YzNmNDg5ZjJlZjk4ZjBkNWRmYWMwNWQzYzYzMzM5YjEzODAyODg2ZDUzZmM4NScsXG4gICcwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwJyxcbiAgJ2M3MTc2YTcwM2Q0ZGQ4NGZiYTNjMGI3NjBkMTA2NzBmMmEyMDUzZmEyYzM5Y2NjNjRlYzdmZDc3OTJhYzAzZmEnLFxuXTtcblxuY29uc3QgRnAgPSAvKiBAX19QVVJFX18gKi8gKCgpID0+IEZpZWxkKEVEMjU1MTlfUCwgdW5kZWZpbmVkLCB0cnVlKSkoKTtcblxuY29uc3QgZWQyNTUxOURlZmF1bHRzID0gLyogQF9fUFVSRV9fICovICgoKSA9PlxuICAoe1xuICAgIC8vIFBhcmFtOiBhXG4gICAgYTogQmlnSW50KC0xKSwgLy8gRnAuY3JlYXRlKC0xKSBpcyBwcm9wZXI7IG91ciB3YXkgc3RpbGwgd29ya3MgYW5kIGlzIGZhc3RlclxuICAgIC8vIGQgaXMgZXF1YWwgdG8gLTEyMTY2NS8xMjE2NjYgb3ZlciBmaW5pdGUgZmllbGQuXG4gICAgLy8gTmVnYXRpdmUgbnVtYmVyIGlzIFAgLSBudW1iZXIsIGFuZCBkaXZpc2lvbiBpcyBpbnZlcnQobnVtYmVyLCBQKVxuICAgIGQ6IEJpZ0ludCgnMzcwOTU3MDU5MzQ2Njk0MzkzNDMxMzgwODM1MDg3NTQ1NjUxODk1NDIxMTM4Nzk4NDMyMTkwMTYzODg3ODU1MzMwODU5NDAyODM1NTUnKSxcbiAgICAvLyBGaW5pdGUgZmllbGQgXHVEODM1XHVERDNEcCBvdmVyIHdoaWNoIHdlJ2xsIGRvIGNhbGN1bGF0aW9uczsgMm4qKjI1NW4gLSAxOW5cbiAgICBGcCxcbiAgICAvLyBTdWJncm91cCBvcmRlcjogaG93IG1hbnkgcG9pbnRzIGN1cnZlIGhhc1xuICAgIC8vIDJuKioyNTJuICsgMjc3NDIzMTc3NzczNzIzNTM1MzU4NTE5Mzc3OTA4ODM2NDg0OTNuO1xuICAgIG46IEJpZ0ludCgnNzIzNzAwNTU3NzMzMjI2MjIxMzk3MzE4NjU2MzA0Mjk5NDI0MDg1NzExNjM1OTM3OTkwNzYwNjAwMTk1MDkzODI4NTQ1NDI1MDk4OScpLFxuICAgIC8vIENvZmFjdG9yXG4gICAgaDogXzhuLFxuICAgIC8vIEJhc2UgcG9pbnQgKHgsIHkpIGFrYSBnZW5lcmF0b3IgcG9pbnRcbiAgICBHeDogQmlnSW50KCcxNTExMjIyMTM0OTUzNTQwMDc3MjUwMTE1MTQwOTU4ODUzMTUxMTQ1NDAxMjY5MzA0MTg1NzIwNjA0NjExMzI4Mzk0OTg0Nzc2MjIwMicpLFxuICAgIEd5OiBCaWdJbnQoJzQ2MzE2ODM1Njk0OTI2NDc4MTY5NDI4Mzk0MDAzNDc1MTYzMTQxMzA3OTkzODY2MjU2MjI1NjE1NzgzMDMzNjAzMTY1MjUxODU1OTYwJyksXG4gICAgaGFzaDogc2hhNTEyLFxuICAgIHJhbmRvbUJ5dGVzLFxuICAgIGFkanVzdFNjYWxhckJ5dGVzLFxuICAgIC8vIGRvbTJcbiAgICAvLyBSYXRpbyBvZiB1IHRvIHYuIEFsbG93cyB1cyB0byBjb21iaW5lIGludmVyc2lvbiBhbmQgc3F1YXJlIHJvb3QuIFVzZXMgYWxnbyBmcm9tIFJGQzgwMzIgNS4xLjMuXG4gICAgLy8gQ29uc3RhbnQtdGltZSwgdS9cdTIyMUF2XG4gICAgdXZSYXRpbyxcbiAgfSkgYXMgY29uc3QpKCk7XG5cbi8qKlxuICogZWQyNTUxOSBjdXJ2ZSB3aXRoIEVkRFNBIHNpZ25hdHVyZXMuXG4gKiBAZXhhbXBsZVxuICogaW1wb3J0IHsgZWQyNTUxOSB9IGZyb20gJ0Bub2JsZS9jdXJ2ZXMvZWQyNTUxOSc7XG4gKiBjb25zdCBwcml2ID0gZWQyNTUxOS51dGlscy5yYW5kb21Qcml2YXRlS2V5KCk7XG4gKiBjb25zdCBwdWIgPSBlZDI1NTE5LmdldFB1YmxpY0tleShwcml2KTtcbiAqIGNvbnN0IG1zZyA9IG5ldyBUZXh0RW5jb2RlcigpLmVuY29kZSgnaGVsbG8nKTtcbiAqIGNvbnN0IHNpZyA9IGVkMjU1MTkuc2lnbihtc2csIHByaXYpO1xuICogZWQyNTUxOS52ZXJpZnkoc2lnLCBtc2csIHB1Yik7IC8vIERlZmF1bHQgbW9kZTogZm9sbG93cyBaSVAyMTVcbiAqIGVkMjU1MTkudmVyaWZ5KHNpZywgbXNnLCBwdWIsIHsgemlwMjE1OiBmYWxzZSB9KTsgLy8gUkZDODAzMiAvIEZJUFMgMTg2LTVcbiAqL1xuZXhwb3J0IGNvbnN0IGVkMjU1MTk6IEN1cnZlRm4gPSAvKiBAX19QVVJFX18gKi8gKCgpID0+IHR3aXN0ZWRFZHdhcmRzKGVkMjU1MTlEZWZhdWx0cykpKCk7XG5cbmZ1bmN0aW9uIGVkMjU1MTlfZG9tYWluKGRhdGE6IFVpbnQ4QXJyYXksIGN0eDogVWludDhBcnJheSwgcGhmbGFnOiBib29sZWFuKSB7XG4gIGlmIChjdHgubGVuZ3RoID4gMjU1KSB0aHJvdyBuZXcgRXJyb3IoJ0NvbnRleHQgaXMgdG9vIGJpZycpO1xuICByZXR1cm4gY29uY2F0Qnl0ZXMoXG4gICAgdXRmOFRvQnl0ZXMoJ1NpZ0VkMjU1MTkgbm8gRWQyNTUxOSBjb2xsaXNpb25zJyksXG4gICAgbmV3IFVpbnQ4QXJyYXkoW3BoZmxhZyA/IDEgOiAwLCBjdHgubGVuZ3RoXSksXG4gICAgY3R4LFxuICAgIGRhdGFcbiAgKTtcbn1cblxuZXhwb3J0IGNvbnN0IGVkMjU1MTljdHg6IEN1cnZlRm4gPSAvKiBAX19QVVJFX18gKi8gKCgpID0+XG4gIHR3aXN0ZWRFZHdhcmRzKHtcbiAgICAuLi5lZDI1NTE5RGVmYXVsdHMsXG4gICAgZG9tYWluOiBlZDI1NTE5X2RvbWFpbixcbiAgfSkpKCk7XG5leHBvcnQgY29uc3QgZWQyNTUxOXBoOiBDdXJ2ZUZuID0gLyogQF9fUFVSRV9fICovICgoKSA9PlxuICB0d2lzdGVkRWR3YXJkcyhcbiAgICBPYmplY3QuYXNzaWduKHt9LCBlZDI1NTE5RGVmYXVsdHMsIHtcbiAgICAgIGRvbWFpbjogZWQyNTUxOV9kb21haW4sXG4gICAgICBwcmVoYXNoOiBzaGE1MTIsXG4gICAgfSlcbiAgKSkoKTtcblxuLyoqXG4gKiBFQ0RIIHVzaW5nIGN1cnZlMjU1MTkgYWthIHgyNTUxOS5cbiAqIEBleGFtcGxlXG4gKiBpbXBvcnQgeyB4MjU1MTkgfSBmcm9tICdAbm9ibGUvY3VydmVzL2VkMjU1MTknO1xuICogY29uc3QgcHJpdiA9ICdhNTQ2ZTM2YmYwNTI3YzlkM2IxNjE1NGI4MjQ2NWVkZDYyMTQ0YzBhYzFmYzVhMTg1MDZhMjI0NGJhNDQ5YWM0JztcbiAqIGNvbnN0IHB1YiA9ICdlNmRiNjg2NzU4MzAzMGRiMzU5NGMxYTQyNGIxNWY3YzcyNjYyNGVjMjZiMzM1M2IxMGE5MDNhNmQwYWIxYzRjJztcbiAqIHgyNTUxOS5nZXRTaGFyZWRTZWNyZXQocHJpdiwgcHViKSA9PT0geDI1NTE5LnNjYWxhck11bHQocHJpdiwgcHViKTsgLy8gYWxpYXNlc1xuICogeDI1NTE5LmdldFB1YmxpY0tleShwcml2KSA9PT0geDI1NTE5LnNjYWxhck11bHRCYXNlKHByaXYpO1xuICogeDI1NTE5LmdldFB1YmxpY0tleSh4MjU1MTkudXRpbHMucmFuZG9tUHJpdmF0ZUtleSgpKTtcbiAqL1xuZXhwb3J0IGNvbnN0IHgyNTUxOTogWEN1cnZlRm4gPSAvKiBAX19QVVJFX18gKi8gKCgpID0+XG4gIG1vbnRnb21lcnkoe1xuICAgIFA6IEVEMjU1MTlfUCxcbiAgICBhOiBCaWdJbnQoNDg2NjYyKSxcbiAgICBtb250Z29tZXJ5Qml0czogMjU1LCAvLyBuIGlzIDI1MyBiaXRzXG4gICAgbkJ5dGVMZW5ndGg6IDMyLFxuICAgIEd1OiBCaWdJbnQoOSksXG4gICAgcG93UG1pbnVzMjogKHg6IGJpZ2ludCk6IGJpZ2ludCA9PiB7XG4gICAgICBjb25zdCBQID0gRUQyNTUxOV9QO1xuICAgICAgLy8geF4ocC0yKSBha2EgeF4oMl4yNTUtMjEpXG4gICAgICBjb25zdCB7IHBvd19wXzVfOCwgYjIgfSA9IGVkMjU1MTlfcG93XzJfMjUyXzMoeCk7XG4gICAgICByZXR1cm4gbW9kKHBvdzIocG93X3BfNV84LCBfM24sIFApICogYjIsIFApO1xuICAgIH0sXG4gICAgYWRqdXN0U2NhbGFyQnl0ZXMsXG4gICAgcmFuZG9tQnl0ZXMsXG4gIH0pKSgpO1xuXG4vKipcbiAqIENvbnZlcnRzIGVkMjU1MTkgcHVibGljIGtleSB0byB4MjU1MTkgcHVibGljIGtleS4gVXNlcyBmb3JtdWxhOlxuICogKiBgKHUsIHYpID0gKCgxK3kpLygxLXkpLCBzcXJ0KC00ODY2NjQpKnUveClgXG4gKiAqIGAoeCwgeSkgPSAoc3FydCgtNDg2NjY0KSp1L3YsICh1LTEpLyh1KzEpKWBcbiAqIEBleGFtcGxlXG4gKiAgIGNvbnN0IHNvbWVvbmVzUHViID0gZWQyNTUxOS5nZXRQdWJsaWNLZXkoZWQyNTUxOS51dGlscy5yYW5kb21Qcml2YXRlS2V5KCkpO1xuICogICBjb25zdCBhUHJpdiA9IHgyNTUxOS51dGlscy5yYW5kb21Qcml2YXRlS2V5KCk7XG4gKiAgIHgyNTUxOS5nZXRTaGFyZWRTZWNyZXQoYVByaXYsIGVkd2FyZHNUb01vbnRnb21lcnlQdWIoc29tZW9uZXNQdWIpKVxuICovXG5leHBvcnQgZnVuY3Rpb24gZWR3YXJkc1RvTW9udGdvbWVyeVB1YihlZHdhcmRzUHViOiBIZXgpOiBVaW50OEFycmF5IHtcbiAgY29uc3QgeyB5IH0gPSBlZDI1NTE5LkV4dGVuZGVkUG9pbnQuZnJvbUhleChlZHdhcmRzUHViKTtcbiAgY29uc3QgXzFuID0gQmlnSW50KDEpO1xuICByZXR1cm4gRnAudG9CeXRlcyhGcC5jcmVhdGUoKF8xbiArIHkpICogRnAuaW52KF8xbiAtIHkpKSk7XG59XG5leHBvcnQgY29uc3QgZWR3YXJkc1RvTW9udGdvbWVyeTogdHlwZW9mIGVkd2FyZHNUb01vbnRnb21lcnlQdWIgPSBlZHdhcmRzVG9Nb250Z29tZXJ5UHViOyAvLyBkZXByZWNhdGVkXG5cbi8qKlxuICogQ29udmVydHMgZWQyNTUxOSBzZWNyZXQga2V5IHRvIHgyNTUxOSBzZWNyZXQga2V5LlxuICogQGV4YW1wbGVcbiAqICAgY29uc3Qgc29tZW9uZXNQdWIgPSB4MjU1MTkuZ2V0UHVibGljS2V5KHgyNTUxOS51dGlscy5yYW5kb21Qcml2YXRlS2V5KCkpO1xuICogICBjb25zdCBhUHJpdiA9IGVkMjU1MTkudXRpbHMucmFuZG9tUHJpdmF0ZUtleSgpO1xuICogICB4MjU1MTkuZ2V0U2hhcmVkU2VjcmV0KGVkd2FyZHNUb01vbnRnb21lcnlQcml2KGFQcml2KSwgc29tZW9uZXNQdWIpXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBlZHdhcmRzVG9Nb250Z29tZXJ5UHJpdihlZHdhcmRzUHJpdjogVWludDhBcnJheSk6IFVpbnQ4QXJyYXkge1xuICBjb25zdCBoYXNoZWQgPSBlZDI1NTE5RGVmYXVsdHMuaGFzaChlZHdhcmRzUHJpdi5zdWJhcnJheSgwLCAzMikpO1xuICByZXR1cm4gZWQyNTUxOURlZmF1bHRzLmFkanVzdFNjYWxhckJ5dGVzKGhhc2hlZCkuc3ViYXJyYXkoMCwgMzIpO1xufVxuXG4vLyBIYXNoIFRvIEN1cnZlIEVsbGlnYXRvcjIgTWFwIChOT1RFOiBkaWZmZXJlbnQgZnJvbSByaXN0cmV0dG8yNTUgZWxsaWdhdG9yKVxuLy8gTk9URTogdmVyeSBpbXBvcnRhbnQgcGFydCBpcyB1c2FnZSBvZiBGcFNxcnRFdmVuIGZvciBFTEwyX0MxX0VEV0FSRFMsIHNpbmNlXG4vLyBTYWdlTWF0aCByZXR1cm5zIGRpZmZlcmVudCByb290IGZpcnN0IGFuZCBldmVyeXRoaW5nIGZhbGxzIGFwYXJ0XG5cbmNvbnN0IEVMTDJfQzEgPSAvKiBAX19QVVJFX18gKi8gKCgpID0+IChGcC5PUkRFUiArIF8zbikgLyBfOG4pKCk7IC8vIDEuIGMxID0gKHEgKyAzKSAvIDggICAgICAgIyBJbnRlZ2VyIGFyaXRobWV0aWNcbmNvbnN0IEVMTDJfQzIgPSAvKiBAX19QVVJFX18gKi8gKCgpID0+IEZwLnBvdyhfMm4sIEVMTDJfQzEpKSgpOyAvLyAyLiBjMiA9IDJeYzFcbmNvbnN0IEVMTDJfQzMgPSAvKiBAX19QVVJFX18gKi8gKCgpID0+IEZwLnNxcnQoRnAubmVnKEZwLk9ORSkpKSgpOyAvLyAzLiBjMyA9IHNxcnQoLTEpXG5cbi8vIHByZXR0aWVyLWlnbm9yZVxuZnVuY3Rpb24gbWFwX3RvX2N1cnZlX2VsbGlnYXRvcjJfY3VydmUyNTUxOSh1OiBiaWdpbnQpIHtcbiAgY29uc3QgRUxMMl9DNCA9IChGcC5PUkRFUiAtIF81bikgLyBfOG47IC8vIDQuIGM0ID0gKHEgLSA1KSAvIDggICAgICAgIyBJbnRlZ2VyIGFyaXRobWV0aWNcbiAgY29uc3QgRUxMMl9KID0gQmlnSW50KDQ4NjY2Mik7XG5cbiAgbGV0IHR2MSA9IEZwLnNxcih1KTsgICAgICAgICAgLy8gIDEuICB0djEgPSB1XjJcbiAgdHYxID0gRnAubXVsKHR2MSwgXzJuKTsgICAgICAgLy8gIDIuICB0djEgPSAyICogdHYxXG4gIGxldCB4ZCA9IEZwLmFkZCh0djEsIEZwLk9ORSk7IC8vICAzLiAgIHhkID0gdHYxICsgMSAgICAgICAgICMgTm9uemVybzogLTEgaXMgc3F1YXJlIChtb2QgcCksIHR2MSBpcyBub3RcbiAgbGV0IHgxbiA9IEZwLm5lZyhFTEwyX0opOyAgICAgLy8gIDQuICB4MW4gPSAtSiAgICAgICAgICAgICAgIyB4MSA9IHgxbiAvIHhkID0gLUogLyAoMSArIDIgKiB1XjIpXG4gIGxldCB0djIgPSBGcC5zcXIoeGQpOyAgICAgICAgIC8vICA1LiAgdHYyID0geGReMlxuICBsZXQgZ3hkID0gRnAubXVsKHR2MiwgeGQpOyAgICAvLyAgNi4gIGd4ZCA9IHR2MiAqIHhkICAgICAgICAjIGd4ZCA9IHhkXjNcbiAgbGV0IGd4MSA9IEZwLm11bCh0djEsIEVMTDJfSik7Ly8gIDcuICBneDEgPSBKICogdHYxICAgICAgICAgIyB4MW4gKyBKICogeGRcbiAgZ3gxID0gRnAubXVsKGd4MSwgeDFuKTsgICAgICAgLy8gIDguICBneDEgPSBneDEgKiB4MW4gICAgICAgIyB4MW5eMiArIEogKiB4MW4gKiB4ZFxuICBneDEgPSBGcC5hZGQoZ3gxLCB0djIpOyAgICAgICAvLyAgOS4gIGd4MSA9IGd4MSArIHR2MiAgICAgICAjIHgxbl4yICsgSiAqIHgxbiAqIHhkICsgeGReMlxuICBneDEgPSBGcC5tdWwoZ3gxLCB4MW4pOyAgICAgICAvLyAgMTAuIGd4MSA9IGd4MSAqIHgxbiAgICAgICAjIHgxbl4zICsgSiAqIHgxbl4yICogeGQgKyB4MW4gKiB4ZF4yXG4gIGxldCB0djMgPSBGcC5zcXIoZ3hkKTsgICAgICAgIC8vICAxMS4gdHYzID0gZ3hkXjJcbiAgdHYyID0gRnAuc3FyKHR2Myk7ICAgICAgICAgICAgLy8gIDEyLiB0djIgPSB0djNeMiAgICAgICAgICAgIyBneGReNFxuICB0djMgPSBGcC5tdWwodHYzLCBneGQpOyAgICAgICAvLyAgMTMuIHR2MyA9IHR2MyAqIGd4ZCAgICAgICAjIGd4ZF4zXG4gIHR2MyA9IEZwLm11bCh0djMsIGd4MSk7ICAgICAgIC8vICAxNC4gdHYzID0gdHYzICogZ3gxICAgICAgICMgZ3gxICogZ3hkXjNcbiAgdHYyID0gRnAubXVsKHR2MiwgdHYzKTsgICAgICAgLy8gIDE1LiB0djIgPSB0djIgKiB0djMgICAgICAgIyBneDEgKiBneGReN1xuICBsZXQgeTExID0gRnAucG93KHR2MiwgRUxMMl9DNCk7IC8vICAxNi4geTExID0gdHYyXmM0ICAgICAgICAjIChneDEgKiBneGReNyleKChwIC0gNSkgLyA4KVxuICB5MTEgPSBGcC5tdWwoeTExLCB0djMpOyAgICAgICAvLyAgMTcuIHkxMSA9IHkxMSAqIHR2MyAgICAgICAjIGd4MSpneGReMyooZ3gxKmd4ZF43KV4oKHAtNSkvOClcbiAgbGV0IHkxMiA9IEZwLm11bCh5MTEsIEVMTDJfQzMpOyAvLyAgMTguIHkxMiA9IHkxMSAqIGMzXG4gIHR2MiA9IEZwLnNxcih5MTEpOyAgICAgICAgICAgIC8vICAxOS4gdHYyID0geTExXjJcbiAgdHYyID0gRnAubXVsKHR2MiwgZ3hkKTsgICAgICAgLy8gIDIwLiB0djIgPSB0djIgKiBneGRcbiAgbGV0IGUxID0gRnAuZXFsKHR2MiwgZ3gxKTsgICAgLy8gIDIxLiAgZTEgPSB0djIgPT0gZ3gxXG4gIGxldCB5MSA9IEZwLmNtb3YoeTEyLCB5MTEsIGUxKTsgLy8gIDIyLiAgeTEgPSBDTU9WKHkxMiwgeTExLCBlMSkgICMgSWYgZyh4MSkgaXMgc3F1YXJlLCB0aGlzIGlzIGl0cyBzcXJ0XG4gIGxldCB4Mm4gPSBGcC5tdWwoeDFuLCB0djEpOyAgIC8vICAyMy4geDJuID0geDFuICogdHYxICAgICAgICMgeDIgPSB4Mm4gLyB4ZCA9IDIgKiB1XjIgKiB4MW4gLyB4ZFxuICBsZXQgeTIxID0gRnAubXVsKHkxMSwgdSk7ICAgICAvLyAgMjQuIHkyMSA9IHkxMSAqIHVcbiAgeTIxID0gRnAubXVsKHkyMSwgRUxMMl9DMik7ICAgLy8gIDI1LiB5MjEgPSB5MjEgKiBjMlxuICBsZXQgeTIyID0gRnAubXVsKHkyMSwgRUxMMl9DMyk7IC8vICAyNi4geTIyID0geTIxICogYzNcbiAgbGV0IGd4MiA9IEZwLm11bChneDEsIHR2MSk7ICAgLy8gIDI3LiBneDIgPSBneDEgKiB0djEgICAgICAgIyBnKHgyKSA9IGd4MiAvIGd4ZCA9IDIgKiB1XjIgKiBnKHgxKVxuICB0djIgPSBGcC5zcXIoeTIxKTsgICAgICAgICAgICAvLyAgMjguIHR2MiA9IHkyMV4yXG4gIHR2MiA9IEZwLm11bCh0djIsIGd4ZCk7ICAgICAgIC8vICAyOS4gdHYyID0gdHYyICogZ3hkXG4gIGxldCBlMiA9IEZwLmVxbCh0djIsIGd4Mik7ICAgIC8vICAzMC4gIGUyID0gdHYyID09IGd4MlxuICBsZXQgeTIgPSBGcC5jbW92KHkyMiwgeTIxLCBlMik7IC8vICAzMS4gIHkyID0gQ01PVih5MjIsIHkyMSwgZTIpICAjIElmIGcoeDIpIGlzIHNxdWFyZSwgdGhpcyBpcyBpdHMgc3FydFxuICB0djIgPSBGcC5zcXIoeTEpOyAgICAgICAgICAgICAvLyAgMzIuIHR2MiA9IHkxXjJcbiAgdHYyID0gRnAubXVsKHR2MiwgZ3hkKTsgICAgICAgLy8gIDMzLiB0djIgPSB0djIgKiBneGRcbiAgbGV0IGUzID0gRnAuZXFsKHR2MiwgZ3gxKTsgICAgLy8gIDM0LiAgZTMgPSB0djIgPT0gZ3gxXG4gIGxldCB4biA9IEZwLmNtb3YoeDJuLCB4MW4sIGUzKTsgLy8gIDM1LiAgeG4gPSBDTU9WKHgybiwgeDFuLCBlMykgICMgSWYgZTMsIHggPSB4MSwgZWxzZSB4ID0geDJcbiAgbGV0IHkgPSBGcC5jbW92KHkyLCB5MSwgZTMpOyAgLy8gIDM2LiAgIHkgPSBDTU9WKHkyLCB5MSwgZTMpICAgICMgSWYgZTMsIHkgPSB5MSwgZWxzZSB5ID0geTJcbiAgbGV0IGU0ID0gRnAuaXNPZGQoeSk7ICAgICAgICAgLy8gIDM3LiAgZTQgPSBzZ24wKHkpID09IDEgICAgICAgICMgRml4IHNpZ24gb2YgeVxuICB5ID0gRnAuY21vdih5LCBGcC5uZWcoeSksIGUzICE9PSBlNCk7IC8vICAzOC4gICB5ID0gQ01PVih5LCAteSwgZTMgWE9SIGU0KVxuICByZXR1cm4geyB4TW46IHhuLCB4TWQ6IHhkLCB5TW46IHksIHlNZDogXzFuIH07IC8vICAzOS4gcmV0dXJuICh4biwgeGQsIHksIDEpXG59XG5cbmNvbnN0IEVMTDJfQzFfRURXQVJEUyA9IC8qIEBfX1BVUkVfXyAqLyAoKCkgPT4gRnBTcXJ0RXZlbihGcCwgRnAubmVnKEJpZ0ludCg0ODY2NjQpKSkpKCk7IC8vIHNnbjAoYzEpIE1VU1QgZXF1YWwgMFxuZnVuY3Rpb24gbWFwX3RvX2N1cnZlX2VsbGlnYXRvcjJfZWR3YXJkczI1NTE5KHU6IGJpZ2ludCkge1xuICBjb25zdCB7IHhNbiwgeE1kLCB5TW4sIHlNZCB9ID0gbWFwX3RvX2N1cnZlX2VsbGlnYXRvcjJfY3VydmUyNTUxOSh1KTsgLy8gIDEuICAoeE1uLCB4TWQsIHlNbiwgeU1kKSA9XG4gIC8vIG1hcF90b19jdXJ2ZV9lbGxpZ2F0b3IyX2N1cnZlMjU1MTkodSlcbiAgbGV0IHhuID0gRnAubXVsKHhNbiwgeU1kKTsgLy8gIDIuICB4biA9IHhNbiAqIHlNZFxuICB4biA9IEZwLm11bCh4biwgRUxMMl9DMV9FRFdBUkRTKTsgLy8gIDMuICB4biA9IHhuICogYzFcbiAgbGV0IHhkID0gRnAubXVsKHhNZCwgeU1uKTsgLy8gIDQuICB4ZCA9IHhNZCAqIHlNbiAgICAjIHhuIC8geGQgPSBjMSAqIHhNIC8geU1cbiAgbGV0IHluID0gRnAuc3ViKHhNbiwgeE1kKTsgLy8gIDUuICB5biA9IHhNbiAtIHhNZFxuICBsZXQgeWQgPSBGcC5hZGQoeE1uLCB4TWQpOyAvLyAgNi4gIHlkID0geE1uICsgeE1kICAgICMgKG4gLyBkIC0gMSkgLyAobiAvIGQgKyAxKSA9IChuIC0gZCkgLyAobiArIGQpXG4gIGxldCB0djEgPSBGcC5tdWwoeGQsIHlkKTsgLy8gIDcuIHR2MSA9IHhkICogeWRcbiAgbGV0IGUgPSBGcC5lcWwodHYxLCBGcC5aRVJPKTsgLy8gIDguICAgZSA9IHR2MSA9PSAwXG4gIHhuID0gRnAuY21vdih4biwgRnAuWkVSTywgZSk7IC8vICA5LiAgeG4gPSBDTU9WKHhuLCAwLCBlKVxuICB4ZCA9IEZwLmNtb3YoeGQsIEZwLk9ORSwgZSk7IC8vICAxMC4geGQgPSBDTU9WKHhkLCAxLCBlKVxuICB5biA9IEZwLmNtb3YoeW4sIEZwLk9ORSwgZSk7IC8vICAxMS4geW4gPSBDTU9WKHluLCAxLCBlKVxuICB5ZCA9IEZwLmNtb3YoeWQsIEZwLk9ORSwgZSk7IC8vICAxMi4geWQgPSBDTU9WKHlkLCAxLCBlKVxuXG4gIGNvbnN0IGludiA9IEZwLmludmVydEJhdGNoKFt4ZCwgeWRdKTsgLy8gYmF0Y2ggZGl2aXNpb25cbiAgcmV0dXJuIHsgeDogRnAubXVsKHhuLCBpbnZbMF0pLCB5OiBGcC5tdWwoeW4sIGludlsxXSkgfTsgLy8gIDEzLiByZXR1cm4gKHhuLCB4ZCwgeW4sIHlkKVxufVxuXG5jb25zdCBodGYgPSAvKiBAX19QVVJFX18gKi8gKCgpID0+XG4gIGNyZWF0ZUhhc2hlcihcbiAgICBlZDI1NTE5LkV4dGVuZGVkUG9pbnQsXG4gICAgKHNjYWxhcnM6IGJpZ2ludFtdKSA9PiBtYXBfdG9fY3VydmVfZWxsaWdhdG9yMl9lZHdhcmRzMjU1MTkoc2NhbGFyc1swXSksXG4gICAge1xuICAgICAgRFNUOiAnZWR3YXJkczI1NTE5X1hNRDpTSEEtNTEyX0VMTDJfUk9fJyxcbiAgICAgIGVuY29kZURTVDogJ2Vkd2FyZHMyNTUxOV9YTUQ6U0hBLTUxMl9FTEwyX05VXycsXG4gICAgICBwOiBGcC5PUkRFUixcbiAgICAgIG06IDEsXG4gICAgICBrOiAxMjgsXG4gICAgICBleHBhbmQ6ICd4bWQnLFxuICAgICAgaGFzaDogc2hhNTEyLFxuICAgIH1cbiAgKSkoKTtcbmV4cG9ydCBjb25zdCBoYXNoVG9DdXJ2ZTogSFRGTWV0aG9kPGJpZ2ludD4gPSAvKiBAX19QVVJFX18gKi8gKCgpID0+IGh0Zi5oYXNoVG9DdXJ2ZSkoKTtcbmV4cG9ydCBjb25zdCBlbmNvZGVUb0N1cnZlOiBIVEZNZXRob2Q8YmlnaW50PiA9IC8qIEBfX1BVUkVfXyAqLyAoKCkgPT4gaHRmLmVuY29kZVRvQ3VydmUpKCk7XG5cbmZ1bmN0aW9uIGFzc2VydFJzdFBvaW50KG90aGVyOiB1bmtub3duKSB7XG4gIGlmICghKG90aGVyIGluc3RhbmNlb2YgUmlzdFBvaW50KSkgdGhyb3cgbmV3IEVycm9yKCdSaXN0cmV0dG9Qb2ludCBleHBlY3RlZCcpO1xufVxuXG4vLyBcdTIyMUEoLTEpIGFrYSBcdTIyMUEoYSkgYWthIDJeKChwLTEpLzQpXG5jb25zdCBTUVJUX00xID0gRUQyNTUxOV9TUVJUX00xO1xuLy8gXHUyMjFBKGFkIC0gMSlcbmNvbnN0IFNRUlRfQURfTUlOVVNfT05FID0gLyogQF9fUFVSRV9fICovIEJpZ0ludChcbiAgJzI1MDYzMDY4OTUzMzg0NjIzNDc0MTExNDE0MTU4NzAyMTUyNzAxMjQ0NTMxNTAyNDkyNjU2NDYwMDc5MjEwNDgyNjEwNDMwNzUwMjM1J1xuKTtcbi8vIDEgLyBcdTIyMUEoYS1kKVxuY29uc3QgSU5WU1FSVF9BX01JTlVTX0QgPSAvKiBAX19QVVJFX18gKi8gQmlnSW50KFxuICAnNTQ0NjkzMDcwMDg5MDkzMTY5MjA5OTU4MTM4Njg3NDUxNDE2MDUzOTM1OTcyOTI5Mjc0NTY5MjEyMDUzMTI4OTYzMTE3MjEwMTc1NzgnXG4pO1xuLy8gMS1kXHUwMEIyXG5jb25zdCBPTkVfTUlOVVNfRF9TUSA9IC8qIEBfX1BVUkVfXyAqLyBCaWdJbnQoXG4gICcxMTU5ODQzMDIxNjY4Nzc5ODc5MTkzNzc1NTIxODU1NTg2NjQ3OTM3MzU3NzU5NzE1NDE3NjU0NDM5ODc5NzIwODc2MTExODA2ODM4J1xuKTtcbi8vIChkLTEpXHUwMEIyXG5jb25zdCBEX01JTlVTX09ORV9TUSA9IC8qIEBfX1BVUkVfXyAqLyBCaWdJbnQoXG4gICc0MDQ0MDgzNDM0NjMwODUzNjg1ODEwMTA0MjQ2OTMyMzE5MDgyNjI0ODM5OTE0NjIzODcwODM1MjI0MDEzMzIyMDg2NTEzNzI2NTk1Midcbik7XG4vLyBDYWxjdWxhdGVzIDEvXHUyMjFBKG51bWJlcilcbmNvbnN0IGludmVydFNxcnQgPSAobnVtYmVyOiBiaWdpbnQpID0+IHV2UmF0aW8oXzFuLCBudW1iZXIpO1xuXG5jb25zdCBNQVhfMjU1QiA9IC8qIEBfX1BVUkVfXyAqLyBCaWdJbnQoXG4gICcweDdmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmYnXG4pO1xuY29uc3QgYnl0ZXMyNTVUb051bWJlckxFID0gKGJ5dGVzOiBVaW50OEFycmF5KSA9PlxuICBlZDI1NTE5LkNVUlZFLkZwLmNyZWF0ZShieXRlc1RvTnVtYmVyTEUoYnl0ZXMpICYgTUFYXzI1NUIpO1xuXG50eXBlIEV4dGVuZGVkUG9pbnQgPSBFeHRQb2ludFR5cGU7XG5cbi8vIENvbXB1dGVzIEVsbGlnYXRvciBtYXAgZm9yIFJpc3RyZXR0b1xuLy8gaHR0cHM6Ly9yaXN0cmV0dG8uZ3JvdXAvZm9ybXVsYXMvZWxsaWdhdG9yLmh0bWxcbmZ1bmN0aW9uIGNhbGNFbGxpZ2F0b3JSaXN0cmV0dG9NYXAocjA6IGJpZ2ludCk6IEV4dGVuZGVkUG9pbnQge1xuICBjb25zdCB7IGQgfSA9IGVkMjU1MTkuQ1VSVkU7XG4gIGNvbnN0IFAgPSBlZDI1NTE5LkNVUlZFLkZwLk9SREVSO1xuICBjb25zdCBtb2QgPSBlZDI1NTE5LkNVUlZFLkZwLmNyZWF0ZTtcbiAgY29uc3QgciA9IG1vZChTUVJUX00xICogcjAgKiByMCk7IC8vIDFcbiAgY29uc3QgTnMgPSBtb2QoKHIgKyBfMW4pICogT05FX01JTlVTX0RfU1EpOyAvLyAyXG4gIGxldCBjID0gQmlnSW50KC0xKTsgLy8gM1xuICBjb25zdCBEID0gbW9kKChjIC0gZCAqIHIpICogbW9kKHIgKyBkKSk7IC8vIDRcbiAgbGV0IHsgaXNWYWxpZDogTnNfRF9pc19zcSwgdmFsdWU6IHMgfSA9IHV2UmF0aW8oTnMsIEQpOyAvLyA1XG4gIGxldCBzXyA9IG1vZChzICogcjApOyAvLyA2XG4gIGlmICghaXNOZWdhdGl2ZUxFKHNfLCBQKSkgc18gPSBtb2QoLXNfKTtcbiAgaWYgKCFOc19EX2lzX3NxKSBzID0gc187IC8vIDdcbiAgaWYgKCFOc19EX2lzX3NxKSBjID0gcjsgLy8gOFxuICBjb25zdCBOdCA9IG1vZChjICogKHIgLSBfMW4pICogRF9NSU5VU19PTkVfU1EgLSBEKTsgLy8gOVxuICBjb25zdCBzMiA9IHMgKiBzO1xuICBjb25zdCBXMCA9IG1vZCgocyArIHMpICogRCk7IC8vIDEwXG4gIGNvbnN0IFcxID0gbW9kKE50ICogU1FSVF9BRF9NSU5VU19PTkUpOyAvLyAxMVxuICBjb25zdCBXMiA9IG1vZChfMW4gLSBzMik7IC8vIDEyXG4gIGNvbnN0IFczID0gbW9kKF8xbiArIHMyKTsgLy8gMTNcbiAgcmV0dXJuIG5ldyBlZDI1NTE5LkV4dGVuZGVkUG9pbnQobW9kKFcwICogVzMpLCBtb2QoVzIgKiBXMSksIG1vZChXMSAqIFczKSwgbW9kKFcwICogVzIpKTtcbn1cblxuLyoqXG4gKiBFYWNoIGVkMjU1MTkvRXh0ZW5kZWRQb2ludCBoYXMgOCBkaWZmZXJlbnQgZXF1aXZhbGVudCBwb2ludHMuIFRoaXMgY2FuIGJlXG4gKiBhIHNvdXJjZSBvZiBidWdzIGZvciBwcm90b2NvbHMgbGlrZSByaW5nIHNpZ25hdHVyZXMuIFJpc3RyZXR0byB3YXMgY3JlYXRlZCB0byBzb2x2ZSB0aGlzLlxuICogUmlzdHJldHRvIHBvaW50IG9wZXJhdGVzIGluIFg6WTpaOlQgZXh0ZW5kZWQgY29vcmRpbmF0ZXMgbGlrZSBFeHRlbmRlZFBvaW50LFxuICogYnV0IGl0IHNob3VsZCB3b3JrIGluIGl0cyBvd24gbmFtZXNwYWNlOiBkbyBub3QgY29tYmluZSB0aG9zZSB0d28uXG4gKiBodHRwczovL2RhdGF0cmFja2VyLmlldGYub3JnL2RvYy9odG1sL2RyYWZ0LWlydGYtY2ZyZy1yaXN0cmV0dG8yNTUtZGVjYWY0NDhcbiAqL1xuY2xhc3MgUmlzdFBvaW50IGltcGxlbWVudHMgR3JvdXA8UmlzdFBvaW50PiB7XG4gIHN0YXRpYyBCQVNFOiBSaXN0UG9pbnQ7XG4gIHN0YXRpYyBaRVJPOiBSaXN0UG9pbnQ7XG4gIC8vIFByaXZhdGUgcHJvcGVydHkgdG8gZGlzY291cmFnZSBjb21iaW5pbmcgRXh0ZW5kZWRQb2ludCArIFJpc3RyZXR0b1BvaW50XG4gIC8vIEFsd2F5cyB1c2UgUmlzdHJldHRvIGVuY29kaW5nL2RlY29kaW5nIGluc3RlYWQuXG4gIGNvbnN0cnVjdG9yKHByaXZhdGUgcmVhZG9ubHkgZXA6IEV4dGVuZGVkUG9pbnQpIHt9XG5cbiAgc3RhdGljIGZyb21BZmZpbmUoYXA6IEFmZmluZVBvaW50PGJpZ2ludD4pOiBSaXN0UG9pbnQge1xuICAgIHJldHVybiBuZXcgUmlzdFBvaW50KGVkMjU1MTkuRXh0ZW5kZWRQb2ludC5mcm9tQWZmaW5lKGFwKSk7XG4gIH1cblxuICAvKipcbiAgICogVGFrZXMgdW5pZm9ybSBvdXRwdXQgb2YgNjQtYnl0ZSBoYXNoIGZ1bmN0aW9uIGxpa2Ugc2hhNTEyIGFuZCBjb252ZXJ0cyBpdCB0byBgUmlzdHJldHRvUG9pbnRgLlxuICAgKiBUaGUgaGFzaC10by1ncm91cCBvcGVyYXRpb24gYXBwbGllcyBFbGxpZ2F0b3IgdHdpY2UgYW5kIGFkZHMgdGhlIHJlc3VsdHMuXG4gICAqICoqTm90ZToqKiB0aGlzIGlzIG9uZS13YXkgbWFwLCB0aGVyZSBpcyBubyBjb252ZXJzaW9uIGZyb20gcG9pbnQgdG8gaGFzaC5cbiAgICogaHR0cHM6Ly9yaXN0cmV0dG8uZ3JvdXAvZm9ybXVsYXMvZWxsaWdhdG9yLmh0bWxcbiAgICogQHBhcmFtIGhleCA2NC1ieXRlIG91dHB1dCBvZiBhIGhhc2ggZnVuY3Rpb25cbiAgICovXG4gIHN0YXRpYyBoYXNoVG9DdXJ2ZShoZXg6IEhleCk6IFJpc3RQb2ludCB7XG4gICAgaGV4ID0gZW5zdXJlQnl0ZXMoJ3Jpc3RyZXR0b0hhc2gnLCBoZXgsIDY0KTtcbiAgICBjb25zdCByMSA9IGJ5dGVzMjU1VG9OdW1iZXJMRShoZXguc2xpY2UoMCwgMzIpKTtcbiAgICBjb25zdCBSMSA9IGNhbGNFbGxpZ2F0b3JSaXN0cmV0dG9NYXAocjEpO1xuICAgIGNvbnN0IHIyID0gYnl0ZXMyNTVUb051bWJlckxFKGhleC5zbGljZSgzMiwgNjQpKTtcbiAgICBjb25zdCBSMiA9IGNhbGNFbGxpZ2F0b3JSaXN0cmV0dG9NYXAocjIpO1xuICAgIHJldHVybiBuZXcgUmlzdFBvaW50KFIxLmFkZChSMikpO1xuICB9XG5cbiAgLyoqXG4gICAqIENvbnZlcnRzIHJpc3RyZXR0by1lbmNvZGVkIHN0cmluZyB0byByaXN0cmV0dG8gcG9pbnQuXG4gICAqIGh0dHBzOi8vcmlzdHJldHRvLmdyb3VwL2Zvcm11bGFzL2RlY29kaW5nLmh0bWxcbiAgICogQHBhcmFtIGhleCBSaXN0cmV0dG8tZW5jb2RlZCAzMiBieXRlcy4gTm90IGV2ZXJ5IDMyLWJ5dGUgc3RyaW5nIGlzIHZhbGlkIHJpc3RyZXR0byBlbmNvZGluZ1xuICAgKi9cbiAgc3RhdGljIGZyb21IZXgoaGV4OiBIZXgpOiBSaXN0UG9pbnQge1xuICAgIGhleCA9IGVuc3VyZUJ5dGVzKCdyaXN0cmV0dG9IZXgnLCBoZXgsIDMyKTtcbiAgICBjb25zdCB7IGEsIGQgfSA9IGVkMjU1MTkuQ1VSVkU7XG4gICAgY29uc3QgUCA9IGVkMjU1MTkuQ1VSVkUuRnAuT1JERVI7XG4gICAgY29uc3QgbW9kID0gZWQyNTUxOS5DVVJWRS5GcC5jcmVhdGU7XG4gICAgY29uc3QgZW1zZyA9ICdSaXN0cmV0dG9Qb2ludC5mcm9tSGV4OiB0aGUgaGV4IGlzIG5vdCB2YWxpZCBlbmNvZGluZyBvZiBSaXN0cmV0dG9Qb2ludCc7XG4gICAgY29uc3QgcyA9IGJ5dGVzMjU1VG9OdW1iZXJMRShoZXgpO1xuICAgIC8vIDEuIENoZWNrIHRoYXQgc19ieXRlcyBpcyB0aGUgY2Fub25pY2FsIGVuY29kaW5nIG9mIGEgZmllbGQgZWxlbWVudCwgb3IgZWxzZSBhYm9ydC5cbiAgICAvLyAzLiBDaGVjayB0aGF0IHMgaXMgbm9uLW5lZ2F0aXZlLCBvciBlbHNlIGFib3J0XG4gICAgaWYgKCFlcXVhbEJ5dGVzKG51bWJlclRvQnl0ZXNMRShzLCAzMiksIGhleCkgfHwgaXNOZWdhdGl2ZUxFKHMsIFApKSB0aHJvdyBuZXcgRXJyb3IoZW1zZyk7XG4gICAgY29uc3QgczIgPSBtb2QocyAqIHMpO1xuICAgIGNvbnN0IHUxID0gbW9kKF8xbiArIGEgKiBzMik7IC8vIDQgKGEgaXMgLTEpXG4gICAgY29uc3QgdTIgPSBtb2QoXzFuIC0gYSAqIHMyKTsgLy8gNVxuICAgIGNvbnN0IHUxXzIgPSBtb2QodTEgKiB1MSk7XG4gICAgY29uc3QgdTJfMiA9IG1vZCh1MiAqIHUyKTtcbiAgICBjb25zdCB2ID0gbW9kKGEgKiBkICogdTFfMiAtIHUyXzIpOyAvLyA2XG4gICAgY29uc3QgeyBpc1ZhbGlkLCB2YWx1ZTogSSB9ID0gaW52ZXJ0U3FydChtb2QodiAqIHUyXzIpKTsgLy8gN1xuICAgIGNvbnN0IER4ID0gbW9kKEkgKiB1Mik7IC8vIDhcbiAgICBjb25zdCBEeSA9IG1vZChJICogRHggKiB2KTsgLy8gOVxuICAgIGxldCB4ID0gbW9kKChzICsgcykgKiBEeCk7IC8vIDEwXG4gICAgaWYgKGlzTmVnYXRpdmVMRSh4LCBQKSkgeCA9IG1vZCgteCk7IC8vIDEwXG4gICAgY29uc3QgeSA9IG1vZCh1MSAqIER5KTsgLy8gMTFcbiAgICBjb25zdCB0ID0gbW9kKHggKiB5KTsgLy8gMTJcbiAgICBpZiAoIWlzVmFsaWQgfHwgaXNOZWdhdGl2ZUxFKHQsIFApIHx8IHkgPT09IF8wbikgdGhyb3cgbmV3IEVycm9yKGVtc2cpO1xuICAgIHJldHVybiBuZXcgUmlzdFBvaW50KG5ldyBlZDI1NTE5LkV4dGVuZGVkUG9pbnQoeCwgeSwgXzFuLCB0KSk7XG4gIH1cblxuICBzdGF0aWMgbXNtKHBvaW50czogUmlzdFBvaW50W10sIHNjYWxhcnM6IGJpZ2ludFtdKTogUmlzdFBvaW50IHtcbiAgICBjb25zdCBGbiA9IEZpZWxkKGVkMjU1MTkuQ1VSVkUubiwgZWQyNTUxOS5DVVJWRS5uQml0TGVuZ3RoKTtcbiAgICByZXR1cm4gcGlwcGVuZ2VyKFJpc3RQb2ludCwgRm4sIHBvaW50cywgc2NhbGFycyk7XG4gIH1cblxuICAvKipcbiAgICogRW5jb2RlcyByaXN0cmV0dG8gcG9pbnQgdG8gVWludDhBcnJheS5cbiAgICogaHR0cHM6Ly9yaXN0cmV0dG8uZ3JvdXAvZm9ybXVsYXMvZW5jb2RpbmcuaHRtbFxuICAgKi9cbiAgdG9SYXdCeXRlcygpOiBVaW50OEFycmF5IHtcbiAgICBsZXQgeyBleDogeCwgZXk6IHksIGV6OiB6LCBldDogdCB9ID0gdGhpcy5lcDtcbiAgICBjb25zdCBQID0gZWQyNTUxOS5DVVJWRS5GcC5PUkRFUjtcbiAgICBjb25zdCBtb2QgPSBlZDI1NTE5LkNVUlZFLkZwLmNyZWF0ZTtcbiAgICBjb25zdCB1MSA9IG1vZChtb2QoeiArIHkpICogbW9kKHogLSB5KSk7IC8vIDFcbiAgICBjb25zdCB1MiA9IG1vZCh4ICogeSk7IC8vIDJcbiAgICAvLyBTcXVhcmUgcm9vdCBhbHdheXMgZXhpc3RzXG4gICAgY29uc3QgdTJzcSA9IG1vZCh1MiAqIHUyKTtcbiAgICBjb25zdCB7IHZhbHVlOiBpbnZzcXJ0IH0gPSBpbnZlcnRTcXJ0KG1vZCh1MSAqIHUyc3EpKTsgLy8gM1xuICAgIGNvbnN0IEQxID0gbW9kKGludnNxcnQgKiB1MSk7IC8vIDRcbiAgICBjb25zdCBEMiA9IG1vZChpbnZzcXJ0ICogdTIpOyAvLyA1XG4gICAgY29uc3QgekludiA9IG1vZChEMSAqIEQyICogdCk7IC8vIDZcbiAgICBsZXQgRDogYmlnaW50OyAvLyA3XG4gICAgaWYgKGlzTmVnYXRpdmVMRSh0ICogekludiwgUCkpIHtcbiAgICAgIGxldCBfeCA9IG1vZCh5ICogU1FSVF9NMSk7XG4gICAgICBsZXQgX3kgPSBtb2QoeCAqIFNRUlRfTTEpO1xuICAgICAgeCA9IF94O1xuICAgICAgeSA9IF95O1xuICAgICAgRCA9IG1vZChEMSAqIElOVlNRUlRfQV9NSU5VU19EKTtcbiAgICB9IGVsc2Uge1xuICAgICAgRCA9IEQyOyAvLyA4XG4gICAgfVxuICAgIGlmIChpc05lZ2F0aXZlTEUoeCAqIHpJbnYsIFApKSB5ID0gbW9kKC15KTsgLy8gOVxuICAgIGxldCBzID0gbW9kKCh6IC0geSkgKiBEKTsgLy8gMTAgKGNoZWNrIGZvb3RlcidzIG5vdGUsIG5vIHNxcnQoLWEpKVxuICAgIGlmIChpc05lZ2F0aXZlTEUocywgUCkpIHMgPSBtb2QoLXMpO1xuICAgIHJldHVybiBudW1iZXJUb0J5dGVzTEUocywgMzIpOyAvLyAxMVxuICB9XG5cbiAgdG9IZXgoKTogc3RyaW5nIHtcbiAgICByZXR1cm4gYnl0ZXNUb0hleCh0aGlzLnRvUmF3Qnl0ZXMoKSk7XG4gIH1cblxuICB0b1N0cmluZygpOiBzdHJpbmcge1xuICAgIHJldHVybiB0aGlzLnRvSGV4KCk7XG4gIH1cblxuICAvLyBDb21wYXJlIG9uZSBwb2ludCB0byBhbm90aGVyLlxuICBlcXVhbHMob3RoZXI6IFJpc3RQb2ludCk6IGJvb2xlYW4ge1xuICAgIGFzc2VydFJzdFBvaW50KG90aGVyKTtcbiAgICBjb25zdCB7IGV4OiBYMSwgZXk6IFkxIH0gPSB0aGlzLmVwO1xuICAgIGNvbnN0IHsgZXg6IFgyLCBleTogWTIgfSA9IG90aGVyLmVwO1xuICAgIGNvbnN0IG1vZCA9IGVkMjU1MTkuQ1VSVkUuRnAuY3JlYXRlO1xuICAgIC8vICh4MSAqIHkyID09IHkxICogeDIpIHwgKHkxICogeTIgPT0geDEgKiB4MilcbiAgICBjb25zdCBvbmUgPSBtb2QoWDEgKiBZMikgPT09IG1vZChZMSAqIFgyKTtcbiAgICBjb25zdCB0d28gPSBtb2QoWTEgKiBZMikgPT09IG1vZChYMSAqIFgyKTtcbiAgICByZXR1cm4gb25lIHx8IHR3bztcbiAgfVxuXG4gIGFkZChvdGhlcjogUmlzdFBvaW50KTogUmlzdFBvaW50IHtcbiAgICBhc3NlcnRSc3RQb2ludChvdGhlcik7XG4gICAgcmV0dXJuIG5ldyBSaXN0UG9pbnQodGhpcy5lcC5hZGQob3RoZXIuZXApKTtcbiAgfVxuXG4gIHN1YnRyYWN0KG90aGVyOiBSaXN0UG9pbnQpOiBSaXN0UG9pbnQge1xuICAgIGFzc2VydFJzdFBvaW50KG90aGVyKTtcbiAgICByZXR1cm4gbmV3IFJpc3RQb2ludCh0aGlzLmVwLnN1YnRyYWN0KG90aGVyLmVwKSk7XG4gIH1cblxuICBtdWx0aXBseShzY2FsYXI6IGJpZ2ludCk6IFJpc3RQb2ludCB7XG4gICAgcmV0dXJuIG5ldyBSaXN0UG9pbnQodGhpcy5lcC5tdWx0aXBseShzY2FsYXIpKTtcbiAgfVxuXG4gIG11bHRpcGx5VW5zYWZlKHNjYWxhcjogYmlnaW50KTogUmlzdFBvaW50IHtcbiAgICByZXR1cm4gbmV3IFJpc3RQb2ludCh0aGlzLmVwLm11bHRpcGx5VW5zYWZlKHNjYWxhcikpO1xuICB9XG5cbiAgZG91YmxlKCk6IFJpc3RQb2ludCB7XG4gICAgcmV0dXJuIG5ldyBSaXN0UG9pbnQodGhpcy5lcC5kb3VibGUoKSk7XG4gIH1cblxuICBuZWdhdGUoKTogUmlzdFBvaW50IHtcbiAgICByZXR1cm4gbmV3IFJpc3RQb2ludCh0aGlzLmVwLm5lZ2F0ZSgpKTtcbiAgfVxufVxuZXhwb3J0IGNvbnN0IFJpc3RyZXR0b1BvaW50OiB0eXBlb2YgUmlzdFBvaW50ID0gLyogQF9fUFVSRV9fICovICgoKSA9PiB7XG4gIGlmICghUmlzdFBvaW50LkJBU0UpIFJpc3RQb2ludC5CQVNFID0gbmV3IFJpc3RQb2ludChlZDI1NTE5LkV4dGVuZGVkUG9pbnQuQkFTRSk7XG4gIGlmICghUmlzdFBvaW50LlpFUk8pIFJpc3RQb2ludC5aRVJPID0gbmV3IFJpc3RQb2ludChlZDI1NTE5LkV4dGVuZGVkUG9pbnQuWkVSTyk7XG4gIHJldHVybiBSaXN0UG9pbnQ7XG59KSgpO1xuXG4vLyBIYXNoaW5nIHRvIHJpc3RyZXR0bzI1NS4gaHR0cHM6Ly93d3cucmZjLWVkaXRvci5vcmcvcmZjL3JmYzkzODAjYXBwZW5kaXgtQlxuZXhwb3J0IGNvbnN0IGhhc2hUb1Jpc3RyZXR0bzI1NSA9IChtc2c6IFVpbnQ4QXJyYXksIG9wdGlvbnM6IGh0ZkJhc2ljT3B0cyk6IFJpc3RQb2ludCA9PiB7XG4gIGNvbnN0IGQgPSBvcHRpb25zLkRTVDtcbiAgY29uc3QgRFNUID0gdHlwZW9mIGQgPT09ICdzdHJpbmcnID8gdXRmOFRvQnl0ZXMoZCkgOiBkO1xuICBjb25zdCB1bmlmb3JtX2J5dGVzID0gZXhwYW5kX21lc3NhZ2VfeG1kKG1zZywgRFNULCA2NCwgc2hhNTEyKTtcbiAgY29uc3QgUCA9IFJpc3RQb2ludC5oYXNoVG9DdXJ2ZSh1bmlmb3JtX2J5dGVzKTtcbiAgcmV0dXJuIFA7XG59O1xuZXhwb3J0IGNvbnN0IGhhc2hfdG9fcmlzdHJldHRvMjU1OiAobXNnOiBVaW50OEFycmF5LCBvcHRpb25zOiBodGZCYXNpY09wdHMpID0+IFJpc3RQb2ludCA9XG4gIGhhc2hUb1Jpc3RyZXR0bzI1NTsgLy8gbGVnYWN5XG4iLCAidmFyIF9fYXdhaXRlciA9ICh0aGlzICYmIHRoaXMuX19hd2FpdGVyKSB8fCBmdW5jdGlvbiAodGhpc0FyZywgX2FyZ3VtZW50cywgUCwgZ2VuZXJhdG9yKSB7XG4gICAgZnVuY3Rpb24gYWRvcHQodmFsdWUpIHsgcmV0dXJuIHZhbHVlIGluc3RhbmNlb2YgUCA/IHZhbHVlIDogbmV3IFAoZnVuY3Rpb24gKHJlc29sdmUpIHsgcmVzb2x2ZSh2YWx1ZSk7IH0pOyB9XG4gICAgcmV0dXJuIG5ldyAoUCB8fCAoUCA9IFByb21pc2UpKShmdW5jdGlvbiAocmVzb2x2ZSwgcmVqZWN0KSB7XG4gICAgICAgIGZ1bmN0aW9uIGZ1bGZpbGxlZCh2YWx1ZSkgeyB0cnkgeyBzdGVwKGdlbmVyYXRvci5uZXh0KHZhbHVlKSk7IH0gY2F0Y2ggKGUpIHsgcmVqZWN0KGUpOyB9IH1cbiAgICAgICAgZnVuY3Rpb24gcmVqZWN0ZWQodmFsdWUpIHsgdHJ5IHsgc3RlcChnZW5lcmF0b3JbXCJ0aHJvd1wiXSh2YWx1ZSkpOyB9IGNhdGNoIChlKSB7IHJlamVjdChlKTsgfSB9XG4gICAgICAgIGZ1bmN0aW9uIHN0ZXAocmVzdWx0KSB7IHJlc3VsdC5kb25lID8gcmVzb2x2ZShyZXN1bHQudmFsdWUpIDogYWRvcHQocmVzdWx0LnZhbHVlKS50aGVuKGZ1bGZpbGxlZCwgcmVqZWN0ZWQpOyB9XG4gICAgICAgIHN0ZXAoKGdlbmVyYXRvciA9IGdlbmVyYXRvci5hcHBseSh0aGlzQXJnLCBfYXJndW1lbnRzIHx8IFtdKSkubmV4dCgpKTtcbiAgICB9KTtcbn07XG5pbXBvcnQgeyB4MjU1MTkgfSBmcm9tIFwiQG5vYmxlL2N1cnZlcy9lZDI1NTE5XCI7XG5jb25zdCBleHBvcnRhYmxlID0gZmFsc2U7XG5sZXQgd2ViQ3J5cHRvT2ZmID0gZmFsc2U7XG5leHBvcnQgZnVuY3Rpb24gZm9yY2VXZWJDcnlwdG9PZmYob2ZmKSB7XG4gICAgd2ViQ3J5cHRvT2ZmID0gb2ZmO1xufVxuZXhwb3J0IGNvbnN0IGlzWDI1NTE5U3VwcG9ydGVkID0gKCgpID0+IHtcbiAgICBsZXQgc3VwcG9ydGVkO1xuICAgIHJldHVybiAoKSA9PiBfX2F3YWl0ZXIodm9pZCAwLCB2b2lkIDAsIHZvaWQgMCwgZnVuY3Rpb24qICgpIHtcbiAgICAgICAgaWYgKHN1cHBvcnRlZCA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICB0cnkge1xuICAgICAgICAgICAgICAgIHlpZWxkIGNyeXB0by5zdWJ0bGUuaW1wb3J0S2V5KFwicmF3XCIsIHgyNTUxOS5HdUJ5dGVzLCB7IG5hbWU6IFwiWDI1NTE5XCIgfSwgZXhwb3J0YWJsZSwgW10pO1xuICAgICAgICAgICAgICAgIHN1cHBvcnRlZCA9IHRydWU7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBjYXRjaCAoX2EpIHtcbiAgICAgICAgICAgICAgICBzdXBwb3J0ZWQgPSBmYWxzZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gc3VwcG9ydGVkO1xuICAgIH0pO1xufSkoKTtcbmV4cG9ydCBmdW5jdGlvbiBzY2FsYXJNdWx0KHNjYWxhciwgdSkge1xuICAgIHJldHVybiBfX2F3YWl0ZXIodGhpcywgdm9pZCAwLCB2b2lkIDAsIGZ1bmN0aW9uKiAoKSB7XG4gICAgICAgIGlmICghKHlpZWxkIGlzWDI1NTE5U3VwcG9ydGVkKCkpIHx8IHdlYkNyeXB0b09mZikge1xuICAgICAgICAgICAgaWYgKGlzQ3J5cHRvS2V5KHNjYWxhcikpIHtcbiAgICAgICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoXCJDcnlwdG9LZXkgcHJvdmlkZWQgYnV0IFgyNTUxOSBXZWJDcnlwdG8gaXMgbm90IHN1cHBvcnRlZFwiKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHJldHVybiB4MjU1MTkuc2NhbGFyTXVsdChzY2FsYXIsIHUpO1xuICAgICAgICB9XG4gICAgICAgIGxldCBrZXk7XG4gICAgICAgIGlmIChpc0NyeXB0b0tleShzY2FsYXIpKSB7XG4gICAgICAgICAgICBrZXkgPSBzY2FsYXI7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICBrZXkgPSB5aWVsZCBpbXBvcnRYMjU1MTlLZXkoc2NhbGFyKTtcbiAgICAgICAgfVxuICAgICAgICBjb25zdCBwZWVyID0geWllbGQgY3J5cHRvLnN1YnRsZS5pbXBvcnRLZXkoXCJyYXdcIiwgdSwgeyBuYW1lOiBcIlgyNTUxOVwiIH0sIGV4cG9ydGFibGUsIFtdKTtcbiAgICAgICAgLy8gMjU2IGJpdHMgaXMgdGhlIGZpeGVkIHNpemUgb2YgYSBYMjU1MTkgc2hhcmVkIHNlY3JldC4gSXQncyBraW5kIG9mXG4gICAgICAgIC8vIHdvcnJ5aW5nIHRoYXQgdGhlIFdlYkNyeXB0byBBUEkgZW5jb3VyYWdlcyB0cnVuY2F0aW5nIGl0LlxuICAgICAgICByZXR1cm4gbmV3IFVpbnQ4QXJyYXkoeWllbGQgY3J5cHRvLnN1YnRsZS5kZXJpdmVCaXRzKHsgbmFtZTogXCJYMjU1MTlcIiwgcHVibGljOiBwZWVyIH0sIGtleSwgMjU2KSk7XG4gICAgfSk7XG59XG5leHBvcnQgZnVuY3Rpb24gc2NhbGFyTXVsdEJhc2Uoc2NhbGFyKSB7XG4gICAgcmV0dXJuIF9fYXdhaXRlcih0aGlzLCB2b2lkIDAsIHZvaWQgMCwgZnVuY3Rpb24qICgpIHtcbiAgICAgICAgaWYgKCEoeWllbGQgaXNYMjU1MTlTdXBwb3J0ZWQoKSkgfHwgd2ViQ3J5cHRvT2ZmKSB7XG4gICAgICAgICAgICBpZiAoaXNDcnlwdG9LZXkoc2NhbGFyKSkge1xuICAgICAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcihcIkNyeXB0b0tleSBwcm92aWRlZCBidXQgWDI1NTE5IFdlYkNyeXB0byBpcyBub3Qgc3VwcG9ydGVkXCIpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcmV0dXJuIHgyNTUxOS5zY2FsYXJNdWx0QmFzZShzY2FsYXIpO1xuICAgICAgICB9XG4gICAgICAgIC8vIFRoZSBXZWJDcnlwdG8gQVBJIHNpbXBseSBkb2Vzbid0IHN1cHBvcnQgZGVyaXZpbmcgcHVibGljIGtleXMgZnJvbVxuICAgICAgICAvLyBwcml2YXRlIGtleXMuIGltcG9ydEtleSByZXR1cm5zIG9ubHkgYSBDcnlwdG9LZXkgKHVubGlrZSBnZW5lcmF0ZUtleVxuICAgICAgICAvLyB3aGljaCByZXR1cm5zIGEgQ3J5cHRvS2V5UGFpcikgZGVzcGl0ZSBkZXJpdmluZyB0aGUgcHVibGljIGtleSBpbnRlcm5hbGx5XG4gICAgICAgIC8vIChqdWRnaW5nIGZyb20gdGhlIGJhbmNobWFya3MsIGF0IGxlYXN0IG9uIE5vZGUuanMpLiBPdXIgb3B0aW9ucyBhcmVcbiAgICAgICAgLy8gZXhwb3J0aW5nIGFzIEpXSywgZGVsZXRpbmcgandrLmQsIGFuZCByZS1pbXBvcnRpbmcgKHdoaWNoIG9ubHkgd29ya3MgZm9yXG4gICAgICAgIC8vIGV4cG9ydGFibGUga2V5cyksIG9yIChyZS0pZG9pbmcgYSBzY2FsYXIgbXVsdGlwbGljYXRpb24gYnkgdGhlIGJhc2Vwb2ludFxuICAgICAgICAvLyBtYW51YWxseS4gSGVyZSB3ZSBkbyB0aGUgbGF0dGVyLlxuICAgICAgICByZXR1cm4gc2NhbGFyTXVsdChzY2FsYXIsIHgyNTUxOS5HdUJ5dGVzKTtcbiAgICB9KTtcbn1cbmNvbnN0IHBrY3M4UHJlZml4ID0gbmV3IFVpbnQ4QXJyYXkoWzB4MzAsIDB4MmUsIDB4MDIsIDB4MDEsIDB4MDAsIDB4MzAsIDB4MDUsIDB4MDYsXG4gICAgMHgwMywgMHgyYiwgMHg2NSwgMHg2ZSwgMHgwNCwgMHgyMiwgMHgwNCwgMHgyMF0pO1xuZnVuY3Rpb24gaW1wb3J0WDI1NTE5S2V5KGtleSkge1xuICAgIHJldHVybiBfX2F3YWl0ZXIodGhpcywgdm9pZCAwLCB2b2lkIDAsIGZ1bmN0aW9uKiAoKSB7XG4gICAgICAgIC8vIEZvciBzb21lIHJlYXNvbiwgdGhlIFdlYkNyeXB0byBBUEkgb25seSBzdXBwb3J0cyBpbXBvcnRpbmcgWDI1NTE5IHByaXZhdGVcbiAgICAgICAgLy8ga2V5cyBhcyBQS0NTICM4IG9yIEpXSyAoZXZlbiBpZiBpdCBzdXBwb3J0cyBpbXBvcnRpbmcgcHVibGljIGtleXMgYXMgcmF3KS5cbiAgICAgICAgLy8gVGhhbmtmdWxseSBzaW5jZSB0aGV5IGFyZSBhbHdheXMgdGhlIHNhbWUgbGVuZ3RoLCB3ZSBjYW4ganVzdCBwcmVwZW5kIGFcbiAgICAgICAgLy8gZml4ZWQgQVNOLjEgcHJlZml4IGZvciBQS0NTICM4LlxuICAgICAgICBpZiAoa2V5Lmxlbmd0aCAhPT0gMzIpIHtcbiAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcihcIlgyNTUxOSBwcml2YXRlIGtleSBtdXN0IGJlIDMyIGJ5dGVzXCIpO1xuICAgICAgICB9XG4gICAgICAgIGNvbnN0IHBrY3M4ID0gbmV3IFVpbnQ4QXJyYXkoWy4uLnBrY3M4UHJlZml4LCAuLi5rZXldKTtcbiAgICAgICAgLy8gQW5ub2luZ2x5LCBpbXBvcnRLZXkgKGF0IGxlYXN0IG9uIE5vZGUuanMpIGNvbXB1dGVzIHRoZSBwdWJsaWMga2V5LCB3aGljaFxuICAgICAgICAvLyBpcyBhIHdhc3RlIGlmIHdlJ3JlIG9ubHkgZ29pbmcgdG8gcnVuIGRlcml2ZUJpdHMuXG4gICAgICAgIHJldHVybiBjcnlwdG8uc3VidGxlLmltcG9ydEtleShcInBrY3M4XCIsIHBrY3M4LCB7IG5hbWU6IFwiWDI1NTE5XCIgfSwgZXhwb3J0YWJsZSwgW1wiZGVyaXZlQml0c1wiXSk7XG4gICAgfSk7XG59XG5mdW5jdGlvbiBpc0NyeXB0b0tleShrZXkpIHtcbiAgICByZXR1cm4gdHlwZW9mIENyeXB0b0tleSAhPT0gXCJ1bmRlZmluZWRcIiAmJiBrZXkgaW5zdGFuY2VvZiBDcnlwdG9LZXk7XG59XG4iLCAiaW1wb3J0IHsgYWhhc2gsIGFudW1iZXIgfSBmcm9tICcuL19hc3NlcnQuanMnO1xuaW1wb3J0IHsgaG1hYyB9IGZyb20gJy4vaG1hYy5qcyc7XG5pbXBvcnQgeyBIYXNoLCBDSGFzaCwgSW5wdXQsIGNyZWF0ZVZpZXcsIHRvQnl0ZXMsIGNoZWNrT3B0cywgYXN5bmNMb29wIH0gZnJvbSAnLi91dGlscy5qcyc7XG5cbi8qKlxuICogUEJLREYgKFJGQyAyODk4KS5cbiAqIEBtb2R1bGVcbiAqL1xuXG5leHBvcnQgdHlwZSBQYmtkZjJPcHQgPSB7XG4gIGM6IG51bWJlcjsgLy8gSXRlcmF0aW9uc1xuICBka0xlbj86IG51bWJlcjsgLy8gRGVzaXJlZCBrZXkgbGVuZ3RoIGluIGJ5dGVzIChJbnRlbmRlZCBvdXRwdXQgbGVuZ3RoIGluIG9jdGV0cyBvZiB0aGUgZGVyaXZlZCBrZXlcbiAgYXN5bmNUaWNrPzogbnVtYmVyOyAvLyBNYXhpbXVtIHRpbWUgaW4gbXMgZm9yIHdoaWNoIGFzeW5jIGZ1bmN0aW9uIGNhbiBibG9jayBleGVjdXRpb25cbn07XG4vLyBDb21tb24gcHJvbG9ndWUgYW5kIGVwaWxvZ3VlIGZvciBzeW5jL2FzeW5jIGZ1bmN0aW9uc1xuZnVuY3Rpb24gcGJrZGYySW5pdChoYXNoOiBDSGFzaCwgX3Bhc3N3b3JkOiBJbnB1dCwgX3NhbHQ6IElucHV0LCBfb3B0czogUGJrZGYyT3B0KSB7XG4gIGFoYXNoKGhhc2gpO1xuICBjb25zdCBvcHRzID0gY2hlY2tPcHRzKHsgZGtMZW46IDMyLCBhc3luY1RpY2s6IDEwIH0sIF9vcHRzKTtcbiAgY29uc3QgeyBjLCBka0xlbiwgYXN5bmNUaWNrIH0gPSBvcHRzO1xuICBhbnVtYmVyKGMpO1xuICBhbnVtYmVyKGRrTGVuKTtcbiAgYW51bWJlcihhc3luY1RpY2spO1xuICBpZiAoYyA8IDEpIHRocm93IG5ldyBFcnJvcignUEJLREYyOiBpdGVyYXRpb25zIChjKSBzaG91bGQgYmUgPj0gMScpO1xuICBjb25zdCBwYXNzd29yZCA9IHRvQnl0ZXMoX3Bhc3N3b3JkKTtcbiAgY29uc3Qgc2FsdCA9IHRvQnl0ZXMoX3NhbHQpO1xuICAvLyBESyA9IFBCS0RGMihQUkYsIFBhc3N3b3JkLCBTYWx0LCBjLCBka0xlbik7XG4gIGNvbnN0IERLID0gbmV3IFVpbnQ4QXJyYXkoZGtMZW4pO1xuICAvLyBVMSA9IFBSRihQYXNzd29yZCwgU2FsdCArIElOVF8zMl9CRShpKSlcbiAgY29uc3QgUFJGID0gaG1hYy5jcmVhdGUoaGFzaCwgcGFzc3dvcmQpO1xuICBjb25zdCBQUkZTYWx0ID0gUFJGLl9jbG9uZUludG8oKS51cGRhdGUoc2FsdCk7XG4gIHJldHVybiB7IGMsIGRrTGVuLCBhc3luY1RpY2ssIERLLCBQUkYsIFBSRlNhbHQgfTtcbn1cblxuZnVuY3Rpb24gcGJrZGYyT3V0cHV0PFQgZXh0ZW5kcyBIYXNoPFQ+PihcbiAgUFJGOiBIYXNoPFQ+LFxuICBQUkZTYWx0OiBIYXNoPFQ+LFxuICBESzogVWludDhBcnJheSxcbiAgcHJmVzogSGFzaDxUPixcbiAgdTogVWludDhBcnJheVxuKSB7XG4gIFBSRi5kZXN0cm95KCk7XG4gIFBSRlNhbHQuZGVzdHJveSgpO1xuICBpZiAocHJmVykgcHJmVy5kZXN0cm95KCk7XG4gIHUuZmlsbCgwKTtcbiAgcmV0dXJuIERLO1xufVxuXG4vKipcbiAqIFBCS0RGMi1ITUFDOiBSRkMgMjg5OCBrZXkgZGVyaXZhdGlvbiBmdW5jdGlvblxuICogQHBhcmFtIGhhc2ggLSBoYXNoIGZ1bmN0aW9uIHRoYXQgd291bGQgYmUgdXNlZCBlLmcuIHNoYTI1NlxuICogQHBhcmFtIHBhc3N3b3JkIC0gcGFzc3dvcmQgZnJvbSB3aGljaCBhIGRlcml2ZWQga2V5IGlzIGdlbmVyYXRlZFxuICogQHBhcmFtIHNhbHQgLSBjcnlwdG9ncmFwaGljIHNhbHRcbiAqIEBwYXJhbSBvcHRzIC0ge2MsIGRrTGVufSB3aGVyZSBjIGlzIHdvcmsgZmFjdG9yIGFuZCBka0xlbiBpcyBvdXRwdXQgbWVzc2FnZSBzaXplXG4gKiBAZXhhbXBsZVxuICogY29uc3Qga2V5ID0gcGJrZGYyKHNoYTI1NiwgJ3Bhc3N3b3JkJywgJ3NhbHQnLCB7IGRrTGVuOiAzMiwgYzogMiAqKiAxOCB9KTtcbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIHBia2RmMihoYXNoOiBDSGFzaCwgcGFzc3dvcmQ6IElucHV0LCBzYWx0OiBJbnB1dCwgb3B0czogUGJrZGYyT3B0KTogVWludDhBcnJheSB7XG4gIGNvbnN0IHsgYywgZGtMZW4sIERLLCBQUkYsIFBSRlNhbHQgfSA9IHBia2RmMkluaXQoaGFzaCwgcGFzc3dvcmQsIHNhbHQsIG9wdHMpO1xuICBsZXQgcHJmVzogYW55OyAvLyBXb3JraW5nIGNvcHlcbiAgY29uc3QgYXJyID0gbmV3IFVpbnQ4QXJyYXkoNCk7XG4gIGNvbnN0IHZpZXcgPSBjcmVhdGVWaWV3KGFycik7XG4gIGNvbnN0IHUgPSBuZXcgVWludDhBcnJheShQUkYub3V0cHV0TGVuKTtcbiAgLy8gREsgPSBUMSArIFQyICsgXHUyMkVGICsgVGRrbGVuL2hsZW5cbiAgZm9yIChsZXQgdGkgPSAxLCBwb3MgPSAwOyBwb3MgPCBka0xlbjsgdGkrKywgcG9zICs9IFBSRi5vdXRwdXRMZW4pIHtcbiAgICAvLyBUaSA9IEYoUGFzc3dvcmQsIFNhbHQsIGMsIGkpXG4gICAgY29uc3QgVGkgPSBESy5zdWJhcnJheShwb3MsIHBvcyArIFBSRi5vdXRwdXRMZW4pO1xuICAgIHZpZXcuc2V0SW50MzIoMCwgdGksIGZhbHNlKTtcbiAgICAvLyBGKFBhc3N3b3JkLCBTYWx0LCBjLCBpKSA9IFUxIF4gVTIgXiBcdTIyRUYgXiBVY1xuICAgIC8vIFUxID0gUFJGKFBhc3N3b3JkLCBTYWx0ICsgSU5UXzMyX0JFKGkpKVxuICAgIChwcmZXID0gUFJGU2FsdC5fY2xvbmVJbnRvKHByZlcpKS51cGRhdGUoYXJyKS5kaWdlc3RJbnRvKHUpO1xuICAgIFRpLnNldCh1LnN1YmFycmF5KDAsIFRpLmxlbmd0aCkpO1xuICAgIGZvciAobGV0IHVpID0gMTsgdWkgPCBjOyB1aSsrKSB7XG4gICAgICAvLyBVYyA9IFBSRihQYXNzd29yZCwgVWNcdTIyMTIxKVxuICAgICAgUFJGLl9jbG9uZUludG8ocHJmVykudXBkYXRlKHUpLmRpZ2VzdEludG8odSk7XG4gICAgICBmb3IgKGxldCBpID0gMDsgaSA8IFRpLmxlbmd0aDsgaSsrKSBUaVtpXSBePSB1W2ldO1xuICAgIH1cbiAgfVxuICByZXR1cm4gcGJrZGYyT3V0cHV0KFBSRiwgUFJGU2FsdCwgREssIHByZlcsIHUpO1xufVxuXG4vKipcbiAqIFBCS0RGMi1ITUFDOiBSRkMgMjg5OCBrZXkgZGVyaXZhdGlvbiBmdW5jdGlvbi4gQXN5bmMgdmVyc2lvbi5cbiAqIEBleGFtcGxlXG4gKiBhd2FpdCBwYmtkZjJBc3luYyhzaGEyNTYsICdwYXNzd29yZCcsICdzYWx0JywgeyBka0xlbjogMzIsIGM6IDUwMF8wMDAgfSk7XG4gKi9cbmV4cG9ydCBhc3luYyBmdW5jdGlvbiBwYmtkZjJBc3luYyhcbiAgaGFzaDogQ0hhc2gsXG4gIHBhc3N3b3JkOiBJbnB1dCxcbiAgc2FsdDogSW5wdXQsXG4gIG9wdHM6IFBia2RmMk9wdFxuKTogUHJvbWlzZTxVaW50OEFycmF5PiB7XG4gIGNvbnN0IHsgYywgZGtMZW4sIGFzeW5jVGljaywgREssIFBSRiwgUFJGU2FsdCB9ID0gcGJrZGYySW5pdChoYXNoLCBwYXNzd29yZCwgc2FsdCwgb3B0cyk7XG4gIGxldCBwcmZXOiBhbnk7IC8vIFdvcmtpbmcgY29weVxuICBjb25zdCBhcnIgPSBuZXcgVWludDhBcnJheSg0KTtcbiAgY29uc3QgdmlldyA9IGNyZWF0ZVZpZXcoYXJyKTtcbiAgY29uc3QgdSA9IG5ldyBVaW50OEFycmF5KFBSRi5vdXRwdXRMZW4pO1xuICAvLyBESyA9IFQxICsgVDIgKyBcdTIyRUYgKyBUZGtsZW4vaGxlblxuICBmb3IgKGxldCB0aSA9IDEsIHBvcyA9IDA7IHBvcyA8IGRrTGVuOyB0aSsrLCBwb3MgKz0gUFJGLm91dHB1dExlbikge1xuICAgIC8vIFRpID0gRihQYXNzd29yZCwgU2FsdCwgYywgaSlcbiAgICBjb25zdCBUaSA9IERLLnN1YmFycmF5KHBvcywgcG9zICsgUFJGLm91dHB1dExlbik7XG4gICAgdmlldy5zZXRJbnQzMigwLCB0aSwgZmFsc2UpO1xuICAgIC8vIEYoUGFzc3dvcmQsIFNhbHQsIGMsIGkpID0gVTEgXiBVMiBeIFx1MjJFRiBeIFVjXG4gICAgLy8gVTEgPSBQUkYoUGFzc3dvcmQsIFNhbHQgKyBJTlRfMzJfQkUoaSkpXG4gICAgKHByZlcgPSBQUkZTYWx0Ll9jbG9uZUludG8ocHJmVykpLnVwZGF0ZShhcnIpLmRpZ2VzdEludG8odSk7XG4gICAgVGkuc2V0KHUuc3ViYXJyYXkoMCwgVGkubGVuZ3RoKSk7XG4gICAgYXdhaXQgYXN5bmNMb29wKGMgLSAxLCBhc3luY1RpY2ssICgpID0+IHtcbiAgICAgIC8vIFVjID0gUFJGKFBhc3N3b3JkLCBVY1x1MjIxMjEpXG4gICAgICBQUkYuX2Nsb25lSW50byhwcmZXKS51cGRhdGUodSkuZGlnZXN0SW50byh1KTtcbiAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgVGkubGVuZ3RoOyBpKyspIFRpW2ldIF49IHVbaV07XG4gICAgfSk7XG4gIH1cbiAgcmV0dXJuIHBia2RmMk91dHB1dChQUkYsIFBSRlNhbHQsIERLLCBwcmZXLCB1KTtcbn1cbiIsICJpbXBvcnQgeyBhbnVtYmVyIH0gZnJvbSAnLi9fYXNzZXJ0LmpzJztcbmltcG9ydCB7IHNoYTI1NiB9IGZyb20gJy4vc2hhMjU2LmpzJztcbmltcG9ydCB7IHBia2RmMiB9IGZyb20gJy4vcGJrZGYyLmpzJztcbmltcG9ydCB7IHJvdGwsIGFzeW5jTG9vcCwgY2hlY2tPcHRzLCBJbnB1dCwgdTMyLCBpc0xFLCBieXRlU3dhcDMyIH0gZnJvbSAnLi91dGlscy5qcyc7XG5cbi8qKlxuICogUkZDIDc5MTQgU2NyeXB0IEtERi5cbiAqIEBtb2R1bGVcbiAqL1xuXG4vLyBUaGUgbWFpbiBTY3J5cHQgbG9vcDogdXNlcyBTYWxzYSBleHRlbnNpdmVseS5cbi8vIFNpeCB2ZXJzaW9ucyBvZiB0aGUgZnVuY3Rpb24gd2VyZSB0cmllZCwgdGhpcyBpcyB0aGUgZmFzdGVzdCBvbmUuXG4vLyBwcmV0dGllci1pZ25vcmVcbmZ1bmN0aW9uIFhvckFuZFNhbHNhKFxuICBwcmV2OiBVaW50MzJBcnJheSxcbiAgcGk6IG51bWJlcixcbiAgaW5wdXQ6IFVpbnQzMkFycmF5LFxuICBpaTogbnVtYmVyLFxuICBvdXQ6IFVpbnQzMkFycmF5LFxuICBvaTogbnVtYmVyXG4pIHtcbiAgLy8gQmFzZWQgb24gaHR0cHM6Ly9jci55cC50by9zYWxzYTIwLmh0bWxcbiAgLy8gWG9yIGJsb2Nrc1xuICBsZXQgeTAwID0gcHJldltwaSsrXSBeIGlucHV0W2lpKytdLCB5MDEgPSBwcmV2W3BpKytdIF4gaW5wdXRbaWkrK107XG4gIGxldCB5MDIgPSBwcmV2W3BpKytdIF4gaW5wdXRbaWkrK10sIHkwMyA9IHByZXZbcGkrK10gXiBpbnB1dFtpaSsrXTtcbiAgbGV0IHkwNCA9IHByZXZbcGkrK10gXiBpbnB1dFtpaSsrXSwgeTA1ID0gcHJldltwaSsrXSBeIGlucHV0W2lpKytdO1xuICBsZXQgeTA2ID0gcHJldltwaSsrXSBeIGlucHV0W2lpKytdLCB5MDcgPSBwcmV2W3BpKytdIF4gaW5wdXRbaWkrK107XG4gIGxldCB5MDggPSBwcmV2W3BpKytdIF4gaW5wdXRbaWkrK10sIHkwOSA9IHByZXZbcGkrK10gXiBpbnB1dFtpaSsrXTtcbiAgbGV0IHkxMCA9IHByZXZbcGkrK10gXiBpbnB1dFtpaSsrXSwgeTExID0gcHJldltwaSsrXSBeIGlucHV0W2lpKytdO1xuICBsZXQgeTEyID0gcHJldltwaSsrXSBeIGlucHV0W2lpKytdLCB5MTMgPSBwcmV2W3BpKytdIF4gaW5wdXRbaWkrK107XG4gIGxldCB5MTQgPSBwcmV2W3BpKytdIF4gaW5wdXRbaWkrK10sIHkxNSA9IHByZXZbcGkrK10gXiBpbnB1dFtpaSsrXTtcbiAgLy8gU2F2ZSBzdGF0ZSB0byB0ZW1wb3JhcnkgdmFyaWFibGVzIChzYWxzYSlcbiAgbGV0IHgwMCA9IHkwMCwgeDAxID0geTAxLCB4MDIgPSB5MDIsIHgwMyA9IHkwMyxcbiAgICAgIHgwNCA9IHkwNCwgeDA1ID0geTA1LCB4MDYgPSB5MDYsIHgwNyA9IHkwNyxcbiAgICAgIHgwOCA9IHkwOCwgeDA5ID0geTA5LCB4MTAgPSB5MTAsIHgxMSA9IHkxMSxcbiAgICAgIHgxMiA9IHkxMiwgeDEzID0geTEzLCB4MTQgPSB5MTQsIHgxNSA9IHkxNTtcbiAgLy8gTWFpbiBsb29wIChzYWxzYSlcbiAgZm9yIChsZXQgaSA9IDA7IGkgPCA4OyBpICs9IDIpIHtcbiAgICB4MDQgXj0gcm90bCh4MDAgKyB4MTIgfCAwLCAgNyk7IHgwOCBePSByb3RsKHgwNCArIHgwMCB8IDAsICA5KTtcbiAgICB4MTIgXj0gcm90bCh4MDggKyB4MDQgfCAwLCAxMyk7IHgwMCBePSByb3RsKHgxMiArIHgwOCB8IDAsIDE4KTtcbiAgICB4MDkgXj0gcm90bCh4MDUgKyB4MDEgfCAwLCAgNyk7IHgxMyBePSByb3RsKHgwOSArIHgwNSB8IDAsICA5KTtcbiAgICB4MDEgXj0gcm90bCh4MTMgKyB4MDkgfCAwLCAxMyk7IHgwNSBePSByb3RsKHgwMSArIHgxMyB8IDAsIDE4KTtcbiAgICB4MTQgXj0gcm90bCh4MTAgKyB4MDYgfCAwLCAgNyk7IHgwMiBePSByb3RsKHgxNCArIHgxMCB8IDAsICA5KTtcbiAgICB4MDYgXj0gcm90bCh4MDIgKyB4MTQgfCAwLCAxMyk7IHgxMCBePSByb3RsKHgwNiArIHgwMiB8IDAsIDE4KTtcbiAgICB4MDMgXj0gcm90bCh4MTUgKyB4MTEgfCAwLCAgNyk7IHgwNyBePSByb3RsKHgwMyArIHgxNSB8IDAsICA5KTtcbiAgICB4MTEgXj0gcm90bCh4MDcgKyB4MDMgfCAwLCAxMyk7IHgxNSBePSByb3RsKHgxMSArIHgwNyB8IDAsIDE4KTtcbiAgICB4MDEgXj0gcm90bCh4MDAgKyB4MDMgfCAwLCAgNyk7IHgwMiBePSByb3RsKHgwMSArIHgwMCB8IDAsICA5KTtcbiAgICB4MDMgXj0gcm90bCh4MDIgKyB4MDEgfCAwLCAxMyk7IHgwMCBePSByb3RsKHgwMyArIHgwMiB8IDAsIDE4KTtcbiAgICB4MDYgXj0gcm90bCh4MDUgKyB4MDQgfCAwLCAgNyk7IHgwNyBePSByb3RsKHgwNiArIHgwNSB8IDAsICA5KTtcbiAgICB4MDQgXj0gcm90bCh4MDcgKyB4MDYgfCAwLCAxMyk7IHgwNSBePSByb3RsKHgwNCArIHgwNyB8IDAsIDE4KTtcbiAgICB4MTEgXj0gcm90bCh4MTAgKyB4MDkgfCAwLCAgNyk7IHgwOCBePSByb3RsKHgxMSArIHgxMCB8IDAsICA5KTtcbiAgICB4MDkgXj0gcm90bCh4MDggKyB4MTEgfCAwLCAxMyk7IHgxMCBePSByb3RsKHgwOSArIHgwOCB8IDAsIDE4KTtcbiAgICB4MTIgXj0gcm90bCh4MTUgKyB4MTQgfCAwLCAgNyk7IHgxMyBePSByb3RsKHgxMiArIHgxNSB8IDAsICA5KTtcbiAgICB4MTQgXj0gcm90bCh4MTMgKyB4MTIgfCAwLCAxMyk7IHgxNSBePSByb3RsKHgxNCArIHgxMyB8IDAsIDE4KTtcbiAgfVxuICAvLyBXcml0ZSBvdXRwdXQgKHNhbHNhKVxuICBvdXRbb2krK10gPSAoeTAwICsgeDAwKSB8IDA7IG91dFtvaSsrXSA9ICh5MDEgKyB4MDEpIHwgMDtcbiAgb3V0W29pKytdID0gKHkwMiArIHgwMikgfCAwOyBvdXRbb2krK10gPSAoeTAzICsgeDAzKSB8IDA7XG4gIG91dFtvaSsrXSA9ICh5MDQgKyB4MDQpIHwgMDsgb3V0W29pKytdID0gKHkwNSArIHgwNSkgfCAwO1xuICBvdXRbb2krK10gPSAoeTA2ICsgeDA2KSB8IDA7IG91dFtvaSsrXSA9ICh5MDcgKyB4MDcpIHwgMDtcbiAgb3V0W29pKytdID0gKHkwOCArIHgwOCkgfCAwOyBvdXRbb2krK10gPSAoeTA5ICsgeDA5KSB8IDA7XG4gIG91dFtvaSsrXSA9ICh5MTAgKyB4MTApIHwgMDsgb3V0W29pKytdID0gKHkxMSArIHgxMSkgfCAwO1xuICBvdXRbb2krK10gPSAoeTEyICsgeDEyKSB8IDA7IG91dFtvaSsrXSA9ICh5MTMgKyB4MTMpIHwgMDtcbiAgb3V0W29pKytdID0gKHkxNCArIHgxNCkgfCAwOyBvdXRbb2krK10gPSAoeTE1ICsgeDE1KSB8IDA7XG59XG5cbmZ1bmN0aW9uIEJsb2NrTWl4KGlucHV0OiBVaW50MzJBcnJheSwgaWk6IG51bWJlciwgb3V0OiBVaW50MzJBcnJheSwgb2k6IG51bWJlciwgcjogbnVtYmVyKSB7XG4gIC8vIFRoZSBibG9jayBCIGlzIHIgMTI4LWJ5dGUgY2h1bmtzICh3aGljaCBpcyBlcXVpdmFsZW50IG9mIDJyIDY0LWJ5dGUgY2h1bmtzKVxuICBsZXQgaGVhZCA9IG9pICsgMDtcbiAgbGV0IHRhaWwgPSBvaSArIDE2ICogcjtcbiAgZm9yIChsZXQgaSA9IDA7IGkgPCAxNjsgaSsrKSBvdXRbdGFpbCArIGldID0gaW5wdXRbaWkgKyAoMiAqIHIgLSAxKSAqIDE2ICsgaV07IC8vIFggXHUyMTkwIEJbMnJcdTIyMTIxXVxuICBmb3IgKGxldCBpID0gMDsgaSA8IHI7IGkrKywgaGVhZCArPSAxNiwgaWkgKz0gMTYpIHtcbiAgICAvLyBXZSB3cml0ZSBvZGQgJiBldmVuIFlpIGF0IHNhbWUgdGltZS4gRXZlbjogMGJYWFhYWDAgT2RkOiAgMGJYWFhYWDFcbiAgICBYb3JBbmRTYWxzYShvdXQsIHRhaWwsIGlucHV0LCBpaSwgb3V0LCBoZWFkKTsgLy8gaGVhZFtpXSA9IFNhbHNhKGJsb2NrSW5bMippXSBeIHRhaWxbaS0xXSlcbiAgICBpZiAoaSA+IDApIHRhaWwgKz0gMTY7IC8vIEZpcnN0IGl0ZXJhdGlvbiBvdmVyd3JpdGVzIHRtcCB2YWx1ZSBpbiB0YWlsXG4gICAgWG9yQW5kU2Fsc2Eob3V0LCBoZWFkLCBpbnB1dCwgKGlpICs9IDE2KSwgb3V0LCB0YWlsKTsgLy8gdGFpbFtpXSA9IFNhbHNhKGJsb2NrSW5bMippKzFdIF4gaGVhZFtpXSlcbiAgfVxufVxuXG5leHBvcnQgdHlwZSBTY3J5cHRPcHRzID0ge1xuICBOOiBudW1iZXI7IC8vIGNvc3QgZmFjdG9yXG4gIHI6IG51bWJlcjsgLy8gYmxvY2sgc2l6ZVxuICBwOiBudW1iZXI7IC8vIHBhcmFsbGVsaXphdGlvblxuICBka0xlbj86IG51bWJlcjsgLy8ga2V5IGxlbmd0aFxuICBhc3luY1RpY2s/OiBudW1iZXI7IC8vIGJsb2NrIGV4ZWN1dGlvbiBtYXggdGltZVxuICBtYXhtZW0/OiBudW1iZXI7XG4gIG9uUHJvZ3Jlc3M/OiAocHJvZ3Jlc3M6IG51bWJlcikgPT4gdm9pZDtcbn07XG5cbi8vIENvbW1vbiBwcm9sb2d1ZSBhbmQgZXBpbG9ndWUgZm9yIHN5bmMvYXN5bmMgZnVuY3Rpb25zXG5mdW5jdGlvbiBzY3J5cHRJbml0KHBhc3N3b3JkOiBJbnB1dCwgc2FsdDogSW5wdXQsIF9vcHRzPzogU2NyeXB0T3B0cykge1xuICAvLyBNYXhtZW0gLSAxR0IrMUtCIGJ5IGRlZmF1bHRcbiAgY29uc3Qgb3B0cyA9IGNoZWNrT3B0cyhcbiAgICB7XG4gICAgICBka0xlbjogMzIsXG4gICAgICBhc3luY1RpY2s6IDEwLFxuICAgICAgbWF4bWVtOiAxMDI0ICoqIDMgKyAxMDI0LFxuICAgIH0sXG4gICAgX29wdHNcbiAgKTtcbiAgY29uc3QgeyBOLCByLCBwLCBka0xlbiwgYXN5bmNUaWNrLCBtYXhtZW0sIG9uUHJvZ3Jlc3MgfSA9IG9wdHM7XG4gIGFudW1iZXIoTik7XG4gIGFudW1iZXIocik7XG4gIGFudW1iZXIocCk7XG4gIGFudW1iZXIoZGtMZW4pO1xuICBhbnVtYmVyKGFzeW5jVGljayk7XG4gIGFudW1iZXIobWF4bWVtKTtcbiAgaWYgKG9uUHJvZ3Jlc3MgIT09IHVuZGVmaW5lZCAmJiB0eXBlb2Ygb25Qcm9ncmVzcyAhPT0gJ2Z1bmN0aW9uJylcbiAgICB0aHJvdyBuZXcgRXJyb3IoJ3Byb2dyZXNzQ2Igc2hvdWxkIGJlIGZ1bmN0aW9uJyk7XG4gIGNvbnN0IGJsb2NrU2l6ZSA9IDEyOCAqIHI7XG4gIGNvbnN0IGJsb2NrU2l6ZTMyID0gYmxvY2tTaXplIC8gNDtcblxuICAvLyBNYXggTiBpcyAyXjMyIChJbnRlZ3JpZnkgaXMgMzItYml0KS4gUmVhbCBsaW1pdCBpcyAyXjIyOiBKUyBlbmdpbmVzIFVpbnQ4QXJyYXkgbGltaXQgaXMgNEdCIGluIDIwMjQuXG4gIC8vIFNwZWMgY2hlY2sgYE4gPj0gMiAqKiAoYmxvY2tTaXplIC8gOClgIGlzIG5vdCBkb25lIGZvciBjb21wYXQgd2l0aCBwb3B1bGFyIGxpYnMsXG4gIC8vIHdoaWNoIHVzZWQgaW5jb3JyZWN0IHI6IDEsIHA6IDguIEFsc28sIHRoZSBjaGVjayBzZWVtcyB0byBiZSBhIHNwZWMgZXJyb3I6XG4gIC8vIGh0dHBzOi8vd3d3LnJmYy1lZGl0b3Iub3JnL2VycmF0YV9zZWFyY2gucGhwP3JmYz03OTE0XG4gIGlmIChOIDw9IDEgfHwgKE4gJiAoTiAtIDEpKSAhPT0gMCB8fCBOID4gMiAqKiAzMikge1xuICAgIHRocm93IG5ldyBFcnJvcignU2NyeXB0OiBOIG11c3QgYmUgbGFyZ2VyIHRoYW4gMSwgYSBwb3dlciBvZiAyLCBhbmQgbGVzcyB0aGFuIDJeMzInKTtcbiAgfVxuICBpZiAocCA8IDAgfHwgcCA+ICgoMiAqKiAzMiAtIDEpICogMzIpIC8gYmxvY2tTaXplKSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKFxuICAgICAgJ1NjcnlwdDogcCBtdXN0IGJlIGEgcG9zaXRpdmUgaW50ZWdlciBsZXNzIHRoYW4gb3IgZXF1YWwgdG8gKCgyXjMyIC0gMSkgKiAzMikgLyAoMTI4ICogciknXG4gICAgKTtcbiAgfVxuICBpZiAoZGtMZW4gPCAwIHx8IGRrTGVuID4gKDIgKiogMzIgLSAxKSAqIDMyKSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKFxuICAgICAgJ1NjcnlwdDogZGtMZW4gc2hvdWxkIGJlIHBvc2l0aXZlIGludGVnZXIgbGVzcyB0aGFuIG9yIGVxdWFsIHRvICgyXjMyIC0gMSkgKiAzMidcbiAgICApO1xuICB9XG4gIGNvbnN0IG1lbVVzZWQgPSBibG9ja1NpemUgKiAoTiArIHApO1xuICBpZiAobWVtVXNlZCA+IG1heG1lbSkge1xuICAgIHRocm93IG5ldyBFcnJvcihcbiAgICAgICdTY3J5cHQ6IG1lbXVzZWQgaXMgYmlnZ2VyIHRoYW4gbWF4TWVtLiBFeHBlY3RlZCAxMjggKiByICogKE4gKyBwKSA+IG1heG1lbSBvZiAnICsgbWF4bWVtXG4gICAgKTtcbiAgfVxuICAvLyBbQjAuLi5CcFx1MjIxMjFdIFx1MjE5MCBQQktERjJITUFDLVNIQTI1NihQYXNzcGhyYXNlLCBTYWx0LCAxLCBibG9ja1NpemUqUGFyYWxsZWxpemF0aW9uRmFjdG9yKVxuICAvLyBTaW5jZSBpdCBoYXMgb25seSBvbmUgaXRlcmF0aW9uIHRoZXJlIGlzIG5vIHJlYXNvbiB0byB1c2UgYXN5bmMgdmFyaWFudFxuICBjb25zdCBCID0gcGJrZGYyKHNoYTI1NiwgcGFzc3dvcmQsIHNhbHQsIHsgYzogMSwgZGtMZW46IGJsb2NrU2l6ZSAqIHAgfSk7XG4gIGNvbnN0IEIzMiA9IHUzMihCKTtcbiAgLy8gUmUtdXNlZCBiZXR3ZWVuIHBhcmFsbGVsIGl0ZXJhdGlvbnMuIEFycmF5KGl0ZXJhdGlvbnMpIG9mIEJcbiAgY29uc3QgViA9IHUzMihuZXcgVWludDhBcnJheShibG9ja1NpemUgKiBOKSk7XG4gIGNvbnN0IHRtcCA9IHUzMihuZXcgVWludDhBcnJheShibG9ja1NpemUpKTtcbiAgbGV0IGJsb2NrTWl4Q2IgPSAoKSA9PiB7fTtcbiAgaWYgKG9uUHJvZ3Jlc3MpIHtcbiAgICBjb25zdCB0b3RhbEJsb2NrTWl4ID0gMiAqIE4gKiBwO1xuICAgIC8vIEludm9rZSBjYWxsYmFjayBpZiBwcm9ncmVzcyBjaGFuZ2VzIGZyb20gMTAuMDEgdG8gMTAuMDJcbiAgICAvLyBBbGxvd3MgdG8gZHJhdyBzbW9vdGggcHJvZ3Jlc3MgYmFyIG9uIHVwIHRvIDhLIHNjcmVlblxuICAgIGNvbnN0IGNhbGxiYWNrUGVyID0gTWF0aC5tYXgoTWF0aC5mbG9vcih0b3RhbEJsb2NrTWl4IC8gMTAwMDApLCAxKTtcbiAgICBsZXQgYmxvY2tNaXhDbnQgPSAwO1xuICAgIGJsb2NrTWl4Q2IgPSAoKSA9PiB7XG4gICAgICBibG9ja01peENudCsrO1xuICAgICAgaWYgKG9uUHJvZ3Jlc3MgJiYgKCEoYmxvY2tNaXhDbnQgJSBjYWxsYmFja1BlcikgfHwgYmxvY2tNaXhDbnQgPT09IHRvdGFsQmxvY2tNaXgpKVxuICAgICAgICBvblByb2dyZXNzKGJsb2NrTWl4Q250IC8gdG90YWxCbG9ja01peCk7XG4gICAgfTtcbiAgfVxuICByZXR1cm4geyBOLCByLCBwLCBka0xlbiwgYmxvY2tTaXplMzIsIFYsIEIzMiwgQiwgdG1wLCBibG9ja01peENiLCBhc3luY1RpY2sgfTtcbn1cblxuZnVuY3Rpb24gc2NyeXB0T3V0cHV0KFxuICBwYXNzd29yZDogSW5wdXQsXG4gIGRrTGVuOiBudW1iZXIsXG4gIEI6IFVpbnQ4QXJyYXksXG4gIFY6IFVpbnQzMkFycmF5LFxuICB0bXA6IFVpbnQzMkFycmF5XG4pIHtcbiAgY29uc3QgcmVzID0gcGJrZGYyKHNoYTI1NiwgcGFzc3dvcmQsIEIsIHsgYzogMSwgZGtMZW4gfSk7XG4gIEIuZmlsbCgwKTtcbiAgVi5maWxsKDApO1xuICB0bXAuZmlsbCgwKTtcbiAgcmV0dXJuIHJlcztcbn1cblxuLyoqXG4gKiBTY3J5cHQgS0RGIGZyb20gUkZDIDc5MTQuXG4gKiBAcGFyYW0gcGFzc3dvcmQgLSBwYXNzXG4gKiBAcGFyYW0gc2FsdCAtIHNhbHRcbiAqIEBwYXJhbSBvcHRzIC0gcGFyYW1ldGVyc1xuICogLSBgTmAgaXMgY3B1L21lbSB3b3JrIGZhY3RvciAocG93ZXIgb2YgMiBlLmcuIDIqKjE4KVxuICogLSBgcmAgaXMgYmxvY2sgc2l6ZSAoOCBpcyBjb21tb24pLCBmaW5lLXR1bmVzIHNlcXVlbnRpYWwgbWVtb3J5IHJlYWQgc2l6ZSBhbmQgcGVyZm9ybWFuY2VcbiAqIC0gYHBgIGlzIHBhcmFsbGVsaXphdGlvbiBmYWN0b3IgKDEgaXMgY29tbW9uKVxuICogLSBgZGtMZW5gIGlzIG91dHB1dCBrZXkgbGVuZ3RoIGluIGJ5dGVzIGUuZy4gMzIuXG4gKiAtIGBhc3luY1RpY2tgIC0gKGRlZmF1bHQ6IDEwKSBtYXggdGltZSBpbiBtcyBmb3Igd2hpY2ggYXN5bmMgZnVuY3Rpb24gY2FuIGJsb2NrIGV4ZWN1dGlvblxuICogLSBgbWF4bWVtYCAtIChkZWZhdWx0OiBgMTAyNCAqKiAzICsgMTAyNGAgYWthIDFHQisxS0IpLiBBIGxpbWl0IHRoYXQgdGhlIGFwcCBjb3VsZCB1c2UgZm9yIHNjcnlwdFxuICogLSBgb25Qcm9ncmVzc2AgLSBjYWxsYmFjayBmdW5jdGlvbiB0aGF0IHdvdWxkIGJlIGV4ZWN1dGVkIGZvciBwcm9ncmVzcyByZXBvcnRcbiAqIEByZXR1cm5zIERlcml2ZWQga2V5XG4gKiBAZXhhbXBsZVxuICogc2NyeXB0KCdwYXNzd29yZCcsICdzYWx0JywgeyBOOiAyKioxOCwgcjogOCwgcDogMSwgZGtMZW46IDMyIH0pO1xuICovXG5leHBvcnQgZnVuY3Rpb24gc2NyeXB0KHBhc3N3b3JkOiBJbnB1dCwgc2FsdDogSW5wdXQsIG9wdHM6IFNjcnlwdE9wdHMpOiBVaW50OEFycmF5IHtcbiAgY29uc3QgeyBOLCByLCBwLCBka0xlbiwgYmxvY2tTaXplMzIsIFYsIEIzMiwgQiwgdG1wLCBibG9ja01peENiIH0gPSBzY3J5cHRJbml0KFxuICAgIHBhc3N3b3JkLFxuICAgIHNhbHQsXG4gICAgb3B0c1xuICApO1xuICBpZiAoIWlzTEUpIGJ5dGVTd2FwMzIoQjMyKTtcbiAgZm9yIChsZXQgcGkgPSAwOyBwaSA8IHA7IHBpKyspIHtcbiAgICBjb25zdCBQaSA9IGJsb2NrU2l6ZTMyICogcGk7XG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCBibG9ja1NpemUzMjsgaSsrKSBWW2ldID0gQjMyW1BpICsgaV07IC8vIFZbMF0gPSBCW2ldXG4gICAgZm9yIChsZXQgaSA9IDAsIHBvcyA9IDA7IGkgPCBOIC0gMTsgaSsrKSB7XG4gICAgICBCbG9ja01peChWLCBwb3MsIFYsIChwb3MgKz0gYmxvY2tTaXplMzIpLCByKTsgLy8gVltpXSA9IEJsb2NrTWl4KFZbaS0xXSk7XG4gICAgICBibG9ja01peENiKCk7XG4gICAgfVxuICAgIEJsb2NrTWl4KFYsIChOIC0gMSkgKiBibG9ja1NpemUzMiwgQjMyLCBQaSwgcik7IC8vIFByb2Nlc3MgbGFzdCBlbGVtZW50XG4gICAgYmxvY2tNaXhDYigpO1xuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgTjsgaSsrKSB7XG4gICAgICAvLyBGaXJzdCB1MzIgb2YgdGhlIGxhc3QgNjQtYnl0ZSBibG9jayAodTMyIGlzIExFKVxuICAgICAgY29uc3QgaiA9IEIzMltQaSArIGJsb2NrU2l6ZTMyIC0gMTZdICUgTjsgLy8gaiA9IEludGVncmlmeShYKSAlIGl0ZXJhdGlvbnNcbiAgICAgIGZvciAobGV0IGsgPSAwOyBrIDwgYmxvY2tTaXplMzI7IGsrKykgdG1wW2tdID0gQjMyW1BpICsga10gXiBWW2ogKiBibG9ja1NpemUzMiArIGtdOyAvLyB0bXAgPSBCIF4gVltqXVxuICAgICAgQmxvY2tNaXgodG1wLCAwLCBCMzIsIFBpLCByKTsgLy8gQiA9IEJsb2NrTWl4KEIgXiBWW2pdKVxuICAgICAgYmxvY2tNaXhDYigpO1xuICAgIH1cbiAgfVxuICBpZiAoIWlzTEUpIGJ5dGVTd2FwMzIoQjMyKTtcbiAgcmV0dXJuIHNjcnlwdE91dHB1dChwYXNzd29yZCwgZGtMZW4sIEIsIFYsIHRtcCk7XG59XG5cbi8qKlxuICogU2NyeXB0IEtERiBmcm9tIFJGQyA3OTE0LiBBc3luYyB2ZXJzaW9uLlxuICogQGV4YW1wbGVcbiAqIGF3YWl0IHNjcnlwdEFzeW5jKCdwYXNzd29yZCcsICdzYWx0JywgeyBOOiAyKioxOCwgcjogOCwgcDogMSwgZGtMZW46IDMyIH0pO1xuICovXG5leHBvcnQgYXN5bmMgZnVuY3Rpb24gc2NyeXB0QXN5bmMoXG4gIHBhc3N3b3JkOiBJbnB1dCxcbiAgc2FsdDogSW5wdXQsXG4gIG9wdHM6IFNjcnlwdE9wdHNcbik6IFByb21pc2U8VWludDhBcnJheT4ge1xuICBjb25zdCB7IE4sIHIsIHAsIGRrTGVuLCBibG9ja1NpemUzMiwgViwgQjMyLCBCLCB0bXAsIGJsb2NrTWl4Q2IsIGFzeW5jVGljayB9ID0gc2NyeXB0SW5pdChcbiAgICBwYXNzd29yZCxcbiAgICBzYWx0LFxuICAgIG9wdHNcbiAgKTtcbiAgaWYgKCFpc0xFKSBieXRlU3dhcDMyKEIzMik7XG4gIGZvciAobGV0IHBpID0gMDsgcGkgPCBwOyBwaSsrKSB7XG4gICAgY29uc3QgUGkgPSBibG9ja1NpemUzMiAqIHBpO1xuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgYmxvY2tTaXplMzI7IGkrKykgVltpXSA9IEIzMltQaSArIGldOyAvLyBWWzBdID0gQltpXVxuICAgIGxldCBwb3MgPSAwO1xuICAgIGF3YWl0IGFzeW5jTG9vcChOIC0gMSwgYXN5bmNUaWNrLCAoKSA9PiB7XG4gICAgICBCbG9ja01peChWLCBwb3MsIFYsIChwb3MgKz0gYmxvY2tTaXplMzIpLCByKTsgLy8gVltpXSA9IEJsb2NrTWl4KFZbaS0xXSk7XG4gICAgICBibG9ja01peENiKCk7XG4gICAgfSk7XG4gICAgQmxvY2tNaXgoViwgKE4gLSAxKSAqIGJsb2NrU2l6ZTMyLCBCMzIsIFBpLCByKTsgLy8gUHJvY2VzcyBsYXN0IGVsZW1lbnRcbiAgICBibG9ja01peENiKCk7XG4gICAgYXdhaXQgYXN5bmNMb29wKE4sIGFzeW5jVGljaywgKCkgPT4ge1xuICAgICAgLy8gRmlyc3QgdTMyIG9mIHRoZSBsYXN0IDY0LWJ5dGUgYmxvY2sgKHUzMiBpcyBMRSlcbiAgICAgIGNvbnN0IGogPSBCMzJbUGkgKyBibG9ja1NpemUzMiAtIDE2XSAlIE47IC8vIGogPSBJbnRlZ3JpZnkoWCkgJSBpdGVyYXRpb25zXG4gICAgICBmb3IgKGxldCBrID0gMDsgayA8IGJsb2NrU2l6ZTMyOyBrKyspIHRtcFtrXSA9IEIzMltQaSArIGtdIF4gVltqICogYmxvY2tTaXplMzIgKyBrXTsgLy8gdG1wID0gQiBeIFZbal1cbiAgICAgIEJsb2NrTWl4KHRtcCwgMCwgQjMyLCBQaSwgcik7IC8vIEIgPSBCbG9ja01peChCIF4gVltqXSlcbiAgICAgIGJsb2NrTWl4Q2IoKTtcbiAgICB9KTtcbiAgfVxuICBpZiAoIWlzTEUpIGJ5dGVTd2FwMzIoQjMyKTtcbiAgcmV0dXJuIHNjcnlwdE91dHB1dChwYXNzd29yZCwgZGtMZW4sIEIsIFYsIHRtcCk7XG59XG4iLCAiLyoqXG4gKiBJbnRlcm5hbCBhc3NlcnRpb24gaGVscGVycy5cbiAqIEBtb2R1bGVcbiAqL1xuXG5mdW5jdGlvbiBhbnVtYmVyKG46IG51bWJlcik6IHZvaWQge1xuICBpZiAoIU51bWJlci5pc1NhZmVJbnRlZ2VyKG4pIHx8IG4gPCAwKSB0aHJvdyBuZXcgRXJyb3IoJ3Bvc2l0aXZlIGludGVnZXIgZXhwZWN0ZWQsIGdvdCAnICsgbik7XG59XG5cbi8vIGNvcGllZCBmcm9tIHV0aWxzXG5mdW5jdGlvbiBpc0J5dGVzKGE6IHVua25vd24pOiBhIGlzIFVpbnQ4QXJyYXkge1xuICByZXR1cm4gYSBpbnN0YW5jZW9mIFVpbnQ4QXJyYXkgfHwgKEFycmF5QnVmZmVyLmlzVmlldyhhKSAmJiBhLmNvbnN0cnVjdG9yLm5hbWUgPT09ICdVaW50OEFycmF5Jyk7XG59XG5cbmZ1bmN0aW9uIGFieXRlcyhiOiBVaW50OEFycmF5IHwgdW5kZWZpbmVkLCAuLi5sZW5ndGhzOiBudW1iZXJbXSk6IHZvaWQge1xuICBpZiAoIWlzQnl0ZXMoYikpIHRocm93IG5ldyBFcnJvcignVWludDhBcnJheSBleHBlY3RlZCcpO1xuICBpZiAobGVuZ3Rocy5sZW5ndGggPiAwICYmICFsZW5ndGhzLmluY2x1ZGVzKGIubGVuZ3RoKSlcbiAgICB0aHJvdyBuZXcgRXJyb3IoJ1VpbnQ4QXJyYXkgZXhwZWN0ZWQgb2YgbGVuZ3RoICcgKyBsZW5ndGhzICsgJywgZ290IGxlbmd0aD0nICsgYi5sZW5ndGgpO1xufVxuXG5leHBvcnQgdHlwZSBIYXNoID0ge1xuICAoZGF0YTogVWludDhBcnJheSk6IFVpbnQ4QXJyYXk7XG4gIGJsb2NrTGVuOiBudW1iZXI7XG4gIG91dHB1dExlbjogbnVtYmVyO1xuICBjcmVhdGU6IGFueTtcbn07XG5mdW5jdGlvbiBhaGFzaChoOiBIYXNoKTogdm9pZCB7XG4gIGlmICh0eXBlb2YgaCAhPT0gJ2Z1bmN0aW9uJyB8fCB0eXBlb2YgaC5jcmVhdGUgIT09ICdmdW5jdGlvbicpXG4gICAgdGhyb3cgbmV3IEVycm9yKCdIYXNoIHNob3VsZCBiZSB3cmFwcGVkIGJ5IHV0aWxzLndyYXBDb25zdHJ1Y3RvcicpO1xuICBhbnVtYmVyKGgub3V0cHV0TGVuKTtcbiAgYW51bWJlcihoLmJsb2NrTGVuKTtcbn1cblxuZnVuY3Rpb24gYWV4aXN0cyhpbnN0YW5jZTogYW55LCBjaGVja0ZpbmlzaGVkID0gdHJ1ZSk6IHZvaWQge1xuICBpZiAoaW5zdGFuY2UuZGVzdHJveWVkKSB0aHJvdyBuZXcgRXJyb3IoJ0hhc2ggaW5zdGFuY2UgaGFzIGJlZW4gZGVzdHJveWVkJyk7XG4gIGlmIChjaGVja0ZpbmlzaGVkICYmIGluc3RhbmNlLmZpbmlzaGVkKSB0aHJvdyBuZXcgRXJyb3IoJ0hhc2gjZGlnZXN0KCkgaGFzIGFscmVhZHkgYmVlbiBjYWxsZWQnKTtcbn1cbmZ1bmN0aW9uIGFvdXRwdXQob3V0OiBhbnksIGluc3RhbmNlOiBhbnkpOiB2b2lkIHtcbiAgYWJ5dGVzKG91dCk7XG4gIGNvbnN0IG1pbiA9IGluc3RhbmNlLm91dHB1dExlbjtcbiAgaWYgKG91dC5sZW5ndGggPCBtaW4pIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoJ2RpZ2VzdEludG8oKSBleHBlY3RzIG91dHB1dCBidWZmZXIgb2YgbGVuZ3RoIGF0IGxlYXN0ICcgKyBtaW4pO1xuICB9XG59XG5cbmZ1bmN0aW9uIGFib29sKGI6IGJvb2xlYW4pOiB2b2lkIHtcbiAgaWYgKHR5cGVvZiBiICE9PSAnYm9vbGVhbicpIHRocm93IG5ldyBFcnJvcihgYm9vbGVhbiBleHBlY3RlZCwgbm90ICR7Yn1gKTtcbn1cblxuZXhwb3J0IHsgYW51bWJlciwgYWJvb2wsIGFieXRlcywgYWhhc2gsIGFleGlzdHMsIGFvdXRwdXQsIGlzQnl0ZXMgfTtcbiIsICIvKipcbiAqIFV0aWxpdGllcyBmb3IgaGV4LCBieXRlcywgQ1NQUk5HLlxuICogQG1vZHVsZVxuICovXG4vKiEgbm9ibGUtY2lwaGVycyAtIE1JVCBMaWNlbnNlIChjKSAyMDIzIFBhdWwgTWlsbGVyIChwYXVsbWlsbHIuY29tKSAqL1xuaW1wb3J0IHsgYWJ5dGVzLCBpc0J5dGVzIH0gZnJvbSAnLi9fYXNzZXJ0LmpzJztcbi8vIHByZXR0aWVyLWlnbm9yZVxuZXhwb3J0IHR5cGUgVHlwZWRBcnJheSA9IEludDhBcnJheSB8IFVpbnQ4Q2xhbXBlZEFycmF5IHwgVWludDhBcnJheSB8XG4gIFVpbnQxNkFycmF5IHwgSW50MTZBcnJheSB8IFVpbnQzMkFycmF5IHwgSW50MzJBcnJheTtcblxuLy8gQ2FzdCBhcnJheSB0byBkaWZmZXJlbnQgdHlwZVxuZXhwb3J0IGNvbnN0IHU4ID0gKGFycjogVHlwZWRBcnJheSk6IFVpbnQ4QXJyYXkgPT5cbiAgbmV3IFVpbnQ4QXJyYXkoYXJyLmJ1ZmZlciwgYXJyLmJ5dGVPZmZzZXQsIGFyci5ieXRlTGVuZ3RoKTtcbmV4cG9ydCBjb25zdCB1MzIgPSAoYXJyOiBUeXBlZEFycmF5KTogVWludDMyQXJyYXkgPT5cbiAgbmV3IFVpbnQzMkFycmF5KGFyci5idWZmZXIsIGFyci5ieXRlT2Zmc2V0LCBNYXRoLmZsb29yKGFyci5ieXRlTGVuZ3RoIC8gNCkpO1xuXG4vLyBDYXN0IGFycmF5IHRvIHZpZXdcbmV4cG9ydCBjb25zdCBjcmVhdGVWaWV3ID0gKGFycjogVHlwZWRBcnJheSk6IERhdGFWaWV3ID0+XG4gIG5ldyBEYXRhVmlldyhhcnIuYnVmZmVyLCBhcnIuYnl0ZU9mZnNldCwgYXJyLmJ5dGVMZW5ndGgpO1xuXG4vLyBiaWctZW5kaWFuIGhhcmR3YXJlIGlzIHJhcmUuIEp1c3QgaW4gY2FzZSBzb21lb25lIHN0aWxsIGRlY2lkZXMgdG8gcnVuIGNpcGhlcnM6XG4vLyBlYXJseS10aHJvdyBhbiBlcnJvciBiZWNhdXNlIHdlIGRvbid0IHN1cHBvcnQgQkUgeWV0LlxuZXhwb3J0IGNvbnN0IGlzTEU6IGJvb2xlYW4gPSBuZXcgVWludDhBcnJheShuZXcgVWludDMyQXJyYXkoWzB4MTEyMjMzNDRdKS5idWZmZXIpWzBdID09PSAweDQ0O1xuaWYgKCFpc0xFKSB0aHJvdyBuZXcgRXJyb3IoJ05vbiBsaXR0bGUtZW5kaWFuIGhhcmR3YXJlIGlzIG5vdCBzdXBwb3J0ZWQnKTtcblxuLy8gQXJyYXkgd2hlcmUgaW5kZXggMHhmMCAoMjQwKSBpcyBtYXBwZWQgdG8gc3RyaW5nICdmMCdcbmNvbnN0IGhleGVzID0gLyogQF9fUFVSRV9fICovIEFycmF5LmZyb20oeyBsZW5ndGg6IDI1NiB9LCAoXywgaSkgPT5cbiAgaS50b1N0cmluZygxNikucGFkU3RhcnQoMiwgJzAnKVxuKTtcbi8qKlxuICogQGV4YW1wbGUgYnl0ZXNUb0hleChVaW50OEFycmF5LmZyb20oWzB4Y2EsIDB4ZmUsIDB4MDEsIDB4MjNdKSkgLy8gJ2NhZmUwMTIzJ1xuICovXG5leHBvcnQgZnVuY3Rpb24gYnl0ZXNUb0hleChieXRlczogVWludDhBcnJheSk6IHN0cmluZyB7XG4gIGFieXRlcyhieXRlcyk7XG4gIC8vIHByZS1jYWNoaW5nIGltcHJvdmVzIHRoZSBzcGVlZCA2eFxuICBsZXQgaGV4ID0gJyc7XG4gIGZvciAobGV0IGkgPSAwOyBpIDwgYnl0ZXMubGVuZ3RoOyBpKyspIHtcbiAgICBoZXggKz0gaGV4ZXNbYnl0ZXNbaV1dO1xuICB9XG4gIHJldHVybiBoZXg7XG59XG5cbi8vIFdlIHVzZSBvcHRpbWl6ZWQgdGVjaG5pcXVlIHRvIGNvbnZlcnQgaGV4IHN0cmluZyB0byBieXRlIGFycmF5XG5jb25zdCBhc2NpaXMgPSB7IF8wOiA0OCwgXzk6IDU3LCBBOiA2NSwgRjogNzAsIGE6IDk3LCBmOiAxMDIgfSBhcyBjb25zdDtcbmZ1bmN0aW9uIGFzY2lpVG9CYXNlMTYoY2g6IG51bWJlcik6IG51bWJlciB8IHVuZGVmaW5lZCB7XG4gIGlmIChjaCA+PSBhc2NpaXMuXzAgJiYgY2ggPD0gYXNjaWlzLl85KSByZXR1cm4gY2ggLSBhc2NpaXMuXzA7IC8vICcyJyA9PiA1MC00OFxuICBpZiAoY2ggPj0gYXNjaWlzLkEgJiYgY2ggPD0gYXNjaWlzLkYpIHJldHVybiBjaCAtIChhc2NpaXMuQSAtIDEwKTsgLy8gJ0InID0+IDY2LSg2NS0xMClcbiAgaWYgKGNoID49IGFzY2lpcy5hICYmIGNoIDw9IGFzY2lpcy5mKSByZXR1cm4gY2ggLSAoYXNjaWlzLmEgLSAxMCk7IC8vICdiJyA9PiA5OC0oOTctMTApXG4gIHJldHVybjtcbn1cblxuLyoqXG4gKiBAZXhhbXBsZSBoZXhUb0J5dGVzKCdjYWZlMDEyMycpIC8vIFVpbnQ4QXJyYXkuZnJvbShbMHhjYSwgMHhmZSwgMHgwMSwgMHgyM10pXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBoZXhUb0J5dGVzKGhleDogc3RyaW5nKTogVWludDhBcnJheSB7XG4gIGlmICh0eXBlb2YgaGV4ICE9PSAnc3RyaW5nJykgdGhyb3cgbmV3IEVycm9yKCdoZXggc3RyaW5nIGV4cGVjdGVkLCBnb3QgJyArIHR5cGVvZiBoZXgpO1xuICBjb25zdCBobCA9IGhleC5sZW5ndGg7XG4gIGNvbnN0IGFsID0gaGwgLyAyO1xuICBpZiAoaGwgJSAyKSB0aHJvdyBuZXcgRXJyb3IoJ2hleCBzdHJpbmcgZXhwZWN0ZWQsIGdvdCB1bnBhZGRlZCBoZXggb2YgbGVuZ3RoICcgKyBobCk7XG4gIGNvbnN0IGFycmF5ID0gbmV3IFVpbnQ4QXJyYXkoYWwpO1xuICBmb3IgKGxldCBhaSA9IDAsIGhpID0gMDsgYWkgPCBhbDsgYWkrKywgaGkgKz0gMikge1xuICAgIGNvbnN0IG4xID0gYXNjaWlUb0Jhc2UxNihoZXguY2hhckNvZGVBdChoaSkpO1xuICAgIGNvbnN0IG4yID0gYXNjaWlUb0Jhc2UxNihoZXguY2hhckNvZGVBdChoaSArIDEpKTtcbiAgICBpZiAobjEgPT09IHVuZGVmaW5lZCB8fCBuMiA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICBjb25zdCBjaGFyID0gaGV4W2hpXSArIGhleFtoaSArIDFdO1xuICAgICAgdGhyb3cgbmV3IEVycm9yKCdoZXggc3RyaW5nIGV4cGVjdGVkLCBnb3Qgbm9uLWhleCBjaGFyYWN0ZXIgXCInICsgY2hhciArICdcIiBhdCBpbmRleCAnICsgaGkpO1xuICAgIH1cbiAgICBhcnJheVthaV0gPSBuMSAqIDE2ICsgbjI7IC8vIG11bHRpcGx5IGZpcnN0IG9jdGV0LCBlLmcuICdhMycgPT4gMTAqMTYrMyA9PiAxNjAgKyAzID0+IDE2M1xuICB9XG4gIHJldHVybiBhcnJheTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGhleFRvTnVtYmVyKGhleDogc3RyaW5nKTogYmlnaW50IHtcbiAgaWYgKHR5cGVvZiBoZXggIT09ICdzdHJpbmcnKSB0aHJvdyBuZXcgRXJyb3IoJ2hleCBzdHJpbmcgZXhwZWN0ZWQsIGdvdCAnICsgdHlwZW9mIGhleCk7XG4gIHJldHVybiBCaWdJbnQoaGV4ID09PSAnJyA/ICcwJyA6ICcweCcgKyBoZXgpOyAvLyBCaWcgRW5kaWFuXG59XG5cbi8vIEJFOiBCaWcgRW5kaWFuLCBMRTogTGl0dGxlIEVuZGlhblxuZXhwb3J0IGZ1bmN0aW9uIGJ5dGVzVG9OdW1iZXJCRShieXRlczogVWludDhBcnJheSk6IGJpZ2ludCB7XG4gIHJldHVybiBoZXhUb051bWJlcihieXRlc1RvSGV4KGJ5dGVzKSk7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBudW1iZXJUb0J5dGVzQkUobjogbnVtYmVyIHwgYmlnaW50LCBsZW46IG51bWJlcik6IFVpbnQ4QXJyYXkge1xuICByZXR1cm4gaGV4VG9CeXRlcyhuLnRvU3RyaW5nKDE2KS5wYWRTdGFydChsZW4gKiAyLCAnMCcpKTtcbn1cblxuLy8gVGhlcmUgaXMgbm8gc2V0SW1tZWRpYXRlIGluIGJyb3dzZXIgYW5kIHNldFRpbWVvdXQgaXMgc2xvdy5cbi8vIGNhbGwgb2YgYXN5bmMgZm4gd2lsbCByZXR1cm4gUHJvbWlzZSwgd2hpY2ggd2lsbCBiZSBmdWxsZmlsZWQgb25seSBvblxuLy8gbmV4dCBzY2hlZHVsZXIgcXVldWUgcHJvY2Vzc2luZyBzdGVwIGFuZCB0aGlzIGlzIGV4YWN0bHkgd2hhdCB3ZSBuZWVkLlxuZXhwb3J0IGNvbnN0IG5leHRUaWNrID0gYXN5bmMgKCk6IFByb21pc2U8dm9pZD4gPT4ge307XG5cbi8vIEdsb2JhbCBzeW1ib2xzIGluIGJvdGggYnJvd3NlcnMgYW5kIE5vZGUuanMgc2luY2UgdjExXG4vLyBTZWUgaHR0cHM6Ly9naXRodWIuY29tL21pY3Jvc29mdC9UeXBlU2NyaXB0L2lzc3Vlcy8zMTUzNVxuZGVjbGFyZSBjb25zdCBUZXh0RW5jb2RlcjogYW55O1xuZGVjbGFyZSBjb25zdCBUZXh0RGVjb2RlcjogYW55O1xuXG4vKipcbiAqIEBleGFtcGxlIHV0ZjhUb0J5dGVzKCdhYmMnKSAvLyBuZXcgVWludDhBcnJheShbOTcsIDk4LCA5OV0pXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiB1dGY4VG9CeXRlcyhzdHI6IHN0cmluZyk6IFVpbnQ4QXJyYXkge1xuICBpZiAodHlwZW9mIHN0ciAhPT0gJ3N0cmluZycpIHRocm93IG5ldyBFcnJvcignc3RyaW5nIGV4cGVjdGVkJyk7XG4gIHJldHVybiBuZXcgVWludDhBcnJheShuZXcgVGV4dEVuY29kZXIoKS5lbmNvZGUoc3RyKSk7IC8vIGh0dHBzOi8vYnVnemlsLmxhLzE2ODE4MDlcbn1cblxuLyoqXG4gKiBAZXhhbXBsZSBieXRlc1RvVXRmOChuZXcgVWludDhBcnJheShbOTcsIDk4LCA5OV0pKSAvLyAnYWJjJ1xuICovXG5leHBvcnQgZnVuY3Rpb24gYnl0ZXNUb1V0ZjgoYnl0ZXM6IFVpbnQ4QXJyYXkpOiBzdHJpbmcge1xuICByZXR1cm4gbmV3IFRleHREZWNvZGVyKCkuZGVjb2RlKGJ5dGVzKTtcbn1cblxuZXhwb3J0IHR5cGUgSW5wdXQgPSBVaW50OEFycmF5IHwgc3RyaW5nO1xuLyoqXG4gKiBOb3JtYWxpemVzIChub24taGV4KSBzdHJpbmcgb3IgVWludDhBcnJheSB0byBVaW50OEFycmF5LlxuICogV2FybmluZzogd2hlbiBVaW50OEFycmF5IGlzIHBhc3NlZCwgaXQgd291bGQgTk9UIGdldCBjb3BpZWQuXG4gKiBLZWVwIGluIG1pbmQgZm9yIGZ1dHVyZSBtdXRhYmxlIG9wZXJhdGlvbnMuXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiB0b0J5dGVzKGRhdGE6IElucHV0KTogVWludDhBcnJheSB7XG4gIGlmICh0eXBlb2YgZGF0YSA9PT0gJ3N0cmluZycpIGRhdGEgPSB1dGY4VG9CeXRlcyhkYXRhKTtcbiAgZWxzZSBpZiAoaXNCeXRlcyhkYXRhKSkgZGF0YSA9IGNvcHlCeXRlcyhkYXRhKTtcbiAgZWxzZSB0aHJvdyBuZXcgRXJyb3IoJ1VpbnQ4QXJyYXkgZXhwZWN0ZWQsIGdvdCAnICsgdHlwZW9mIGRhdGEpO1xuICByZXR1cm4gZGF0YTtcbn1cblxuLyoqXG4gKiBDaGVja3MgaWYgdHdvIFU4QSB1c2Ugc2FtZSB1bmRlcmx5aW5nIGJ1ZmZlciBhbmQgb3ZlcmxhcHMgKHdpbGwgY29ycnVwdCBhbmQgYnJlYWsgaWYgaW5wdXQgYW5kIG91dHB1dCBzYW1lKVxuICovXG5leHBvcnQgZnVuY3Rpb24gb3ZlcmxhcEJ5dGVzKGE6IFVpbnQ4QXJyYXksIGI6IFVpbnQ4QXJyYXkpOiBib29sZWFuIHtcbiAgcmV0dXJuIChcbiAgICBhLmJ1ZmZlciA9PT0gYi5idWZmZXIgJiYgLy8gcHJvYmFibHkgd2lsbCBmYWlsIHdpdGggc29tZSBvYnNjdXJlIHByb3hpZXMsIGJ1dCB0aGlzIGlzIGJlc3Qgd2UgY2FuIGRvXG4gICAgYS5ieXRlT2Zmc2V0IDwgYi5ieXRlT2Zmc2V0ICsgYi5ieXRlTGVuZ3RoICYmIC8vIGEgc3RhcnRzIGJlZm9yZSBiIGVuZFxuICAgIGIuYnl0ZU9mZnNldCA8IGEuYnl0ZU9mZnNldCArIGEuYnl0ZUxlbmd0aCAvLyBiIHN0YXJ0cyBiZWZvcmUgYSBlbmRcbiAgKTtcbn1cblxuLyoqXG4gKiBJZiBpbnB1dCBhbmQgb3V0cHV0IG92ZXJsYXAgYW5kIGlucHV0IHN0YXJ0cyBiZWZvcmUgb3V0cHV0LCB3ZSB3aWxsIG92ZXJ3cml0ZSBlbmQgb2YgaW5wdXQgYmVmb3JlXG4gKiB3ZSBzdGFydCBwcm9jZXNzaW5nIGl0LCBzbyB0aGlzIGlzIG5vdCBzdXBwb3J0ZWQgZm9yIG1vc3QgY2lwaGVycyAoZXhjZXB0IGNoYWNoYS9zYWxzZSwgd2hpY2ggZGVzaWduZWQgd2l0aCB0aGlzKVxuICovXG5leHBvcnQgZnVuY3Rpb24gY29tcGxleE92ZXJsYXBCeXRlcyhpbnB1dDogVWludDhBcnJheSwgb3V0cHV0OiBVaW50OEFycmF5KTogdm9pZCB7XG4gIC8vIFRoaXMgaXMgdmVyeSBjdXJzZWQuIEl0IHdvcmtzIHNvbWVob3csIGJ1dCBJJ20gY29tcGxldGVseSB1bnN1cmUsXG4gIC8vIHJlYXNvbmluZyBhYm91dCBvdmVybGFwcGluZyBhbGlnbmVkIHdpbmRvd3MgaXMgdmVyeSBoYXJkLlxuICBpZiAob3ZlcmxhcEJ5dGVzKGlucHV0LCBvdXRwdXQpICYmIGlucHV0LmJ5dGVPZmZzZXQgPCBvdXRwdXQuYnl0ZU9mZnNldClcbiAgICB0aHJvdyBuZXcgRXJyb3IoJ2NvbXBsZXggb3ZlcmxhcCBvZiBpbnB1dCBhbmQgb3V0cHV0IGlzIG5vdCBzdXBwb3J0ZWQnKTtcbn1cblxuLyoqXG4gKiBDb3BpZXMgc2V2ZXJhbCBVaW50OEFycmF5cyBpbnRvIG9uZS5cbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGNvbmNhdEJ5dGVzKC4uLmFycmF5czogVWludDhBcnJheVtdKTogVWludDhBcnJheSB7XG4gIGxldCBzdW0gPSAwO1xuICBmb3IgKGxldCBpID0gMDsgaSA8IGFycmF5cy5sZW5ndGg7IGkrKykge1xuICAgIGNvbnN0IGEgPSBhcnJheXNbaV07XG4gICAgYWJ5dGVzKGEpO1xuICAgIHN1bSArPSBhLmxlbmd0aDtcbiAgfVxuICBjb25zdCByZXMgPSBuZXcgVWludDhBcnJheShzdW0pO1xuICBmb3IgKGxldCBpID0gMCwgcGFkID0gMDsgaSA8IGFycmF5cy5sZW5ndGg7IGkrKykge1xuICAgIGNvbnN0IGEgPSBhcnJheXNbaV07XG4gICAgcmVzLnNldChhLCBwYWQpO1xuICAgIHBhZCArPSBhLmxlbmd0aDtcbiAgfVxuICByZXR1cm4gcmVzO1xufVxuXG50eXBlIEVtcHR5T2JqID0ge307XG5leHBvcnQgZnVuY3Rpb24gY2hlY2tPcHRzPFQxIGV4dGVuZHMgRW1wdHlPYmosIFQyIGV4dGVuZHMgRW1wdHlPYmo+KFxuICBkZWZhdWx0czogVDEsXG4gIG9wdHM6IFQyXG4pOiBUMSAmIFQyIHtcbiAgaWYgKG9wdHMgPT0gbnVsbCB8fCB0eXBlb2Ygb3B0cyAhPT0gJ29iamVjdCcpIHRocm93IG5ldyBFcnJvcignb3B0aW9ucyBtdXN0IGJlIGRlZmluZWQnKTtcbiAgY29uc3QgbWVyZ2VkID0gT2JqZWN0LmFzc2lnbihkZWZhdWx0cywgb3B0cyk7XG4gIHJldHVybiBtZXJnZWQgYXMgVDEgJiBUMjtcbn1cblxuLy8gQ29tcGFyZXMgMiB1OGEtcyBpbiBraW5kYSBjb25zdGFudCB0aW1lXG5leHBvcnQgZnVuY3Rpb24gZXF1YWxCeXRlcyhhOiBVaW50OEFycmF5LCBiOiBVaW50OEFycmF5KTogYm9vbGVhbiB7XG4gIGlmIChhLmxlbmd0aCAhPT0gYi5sZW5ndGgpIHJldHVybiBmYWxzZTtcbiAgbGV0IGRpZmYgPSAwO1xuICBmb3IgKGxldCBpID0gMDsgaSA8IGEubGVuZ3RoOyBpKyspIGRpZmYgfD0gYVtpXSBeIGJbaV07XG4gIHJldHVybiBkaWZmID09PSAwO1xufVxuXG4vLyBGb3IgcnVudGltZSBjaGVjayBpZiBjbGFzcyBpbXBsZW1lbnRzIGludGVyZmFjZVxuZXhwb3J0IGFic3RyYWN0IGNsYXNzIEhhc2g8VCBleHRlbmRzIEhhc2g8VD4+IHtcbiAgYWJzdHJhY3QgYmxvY2tMZW46IG51bWJlcjsgLy8gQnl0ZXMgcGVyIGJsb2NrXG4gIGFic3RyYWN0IG91dHB1dExlbjogbnVtYmVyOyAvLyBCeXRlcyBpbiBvdXRwdXRcbiAgYWJzdHJhY3QgdXBkYXRlKGJ1ZjogSW5wdXQpOiB0aGlzO1xuICAvLyBXcml0ZXMgZGlnZXN0IGludG8gYnVmXG4gIGFic3RyYWN0IGRpZ2VzdEludG8oYnVmOiBVaW50OEFycmF5KTogdm9pZDtcbiAgYWJzdHJhY3QgZGlnZXN0KCk6IFVpbnQ4QXJyYXk7XG4gIC8qKlxuICAgKiBSZXNldHMgaW50ZXJuYWwgc3RhdGUuIE1ha2VzIEhhc2ggaW5zdGFuY2UgdW51c2FibGUuXG4gICAqIFJlc2V0IGlzIGltcG9zc2libGUgZm9yIGtleWVkIGhhc2hlcyBpZiBrZXkgaXMgY29uc3VtZWQgaW50byBzdGF0ZS4gSWYgZGlnZXN0IGlzIG5vdCBjb25zdW1lZFxuICAgKiBieSB1c2VyLCB0aGV5IHdpbGwgbmVlZCB0byBtYW51YWxseSBjYWxsIGBkZXN0cm95KClgIHdoZW4gemVyb2luZyBpcyBuZWNlc3NhcnkuXG4gICAqL1xuICBhYnN0cmFjdCBkZXN0cm95KCk6IHZvaWQ7XG59XG5cbi8vIFRoaXMgd2lsbCBhbGxvdyB0byByZS11c2Ugd2l0aCBjb21wb3NhYmxlIHRoaW5ncyBsaWtlIHBhY2tlZCAmIGJhc2UgZW5jb2RlcnNcbi8vIEFsc28sIHdlIHByb2JhYmx5IGNhbiBtYWtlIHRhZ3MgY29tcG9zYWJsZVxuZXhwb3J0IHR5cGUgQ2lwaGVyID0ge1xuICBlbmNyeXB0KHBsYWludGV4dDogVWludDhBcnJheSk6IFVpbnQ4QXJyYXk7XG4gIGRlY3J5cHQoY2lwaGVydGV4dDogVWludDhBcnJheSk6IFVpbnQ4QXJyYXk7XG59O1xuXG5leHBvcnQgdHlwZSBBc3luY0NpcGhlciA9IHtcbiAgZW5jcnlwdChwbGFpbnRleHQ6IFVpbnQ4QXJyYXkpOiBQcm9taXNlPFVpbnQ4QXJyYXk+O1xuICBkZWNyeXB0KGNpcGhlcnRleHQ6IFVpbnQ4QXJyYXkpOiBQcm9taXNlPFVpbnQ4QXJyYXk+O1xufTtcblxuZXhwb3J0IHR5cGUgQ2lwaGVyV2l0aE91dHB1dCA9IENpcGhlciAmIHtcbiAgZW5jcnlwdChwbGFpbnRleHQ6IFVpbnQ4QXJyYXksIG91dHB1dD86IFVpbnQ4QXJyYXkpOiBVaW50OEFycmF5O1xuICBkZWNyeXB0KGNpcGhlcnRleHQ6IFVpbnQ4QXJyYXksIG91dHB1dD86IFVpbnQ4QXJyYXkpOiBVaW50OEFycmF5O1xufTtcblxuLy8gUGFyYW1zIGlzIG91dHNpZGUgcmV0dXJuIHR5cGUsIHNvIGl0IGlzIGFjY2Vzc2libGUgYmVmb3JlIGNhbGxpbmcgY29uc3RydWN0b3Jcbi8vIElmIGZ1bmN0aW9uIHN1cHBvcnQgbXVsdGlwbGUgbm9uY2VMZW5ndGgncywgd2UgcmV0dXJuIGJlc3Qgb25lXG5leHBvcnQgdHlwZSBDaXBoZXJQYXJhbXMgPSB7XG4gIGJsb2NrU2l6ZTogbnVtYmVyO1xuICBub25jZUxlbmd0aD86IG51bWJlcjtcbiAgdGFnTGVuZ3RoPzogbnVtYmVyO1xuICB2YXJTaXplTm9uY2U/OiBib29sZWFuO1xufTtcbmV4cG9ydCB0eXBlIEFSWENpcGhlciA9ICgoXG4gIGtleTogVWludDhBcnJheSxcbiAgbm9uY2U6IFVpbnQ4QXJyYXksXG4gIEFBRD86IFVpbnQ4QXJyYXlcbikgPT4gQ2lwaGVyV2l0aE91dHB1dCkgJiB7XG4gIGJsb2NrU2l6ZTogbnVtYmVyO1xuICBub25jZUxlbmd0aDogbnVtYmVyO1xuICB0YWdMZW5ndGg6IG51bWJlcjtcbn07XG5leHBvcnQgdHlwZSBDaXBoZXJDb25zPFQgZXh0ZW5kcyBhbnlbXT4gPSAoa2V5OiBVaW50OEFycmF5LCAuLi5hcmdzOiBUKSA9PiBDaXBoZXI7XG4vKipcbiAqIEBfX05PX1NJREVfRUZGRUNUU19fXG4gKi9cbmV4cG9ydCBjb25zdCB3cmFwQ2lwaGVyID0gPEMgZXh0ZW5kcyBDaXBoZXJDb25zPGFueT4sIFAgZXh0ZW5kcyBDaXBoZXJQYXJhbXM+KFxuICBwYXJhbXM6IFAsXG4gIGNvbnN0cnVjdG9yOiBDXG4pOiBDICYgUCA9PiB7XG4gIGZ1bmN0aW9uIHdyYXBwZWRDaXBoZXIoa2V5OiBVaW50OEFycmF5LCAuLi5hcmdzOiBhbnlbXSk6IENpcGhlcldpdGhPdXRwdXQge1xuICAgIC8vIFZhbGlkYXRlIGtleVxuICAgIGFieXRlcyhrZXkpO1xuXG4gICAgLy8gVmFsaWRhdGUgbm9uY2UgaWYgbm9uY2VMZW5ndGggaXMgcHJlc2VudFxuICAgIGlmIChwYXJhbXMubm9uY2VMZW5ndGggIT09IHVuZGVmaW5lZCkge1xuICAgICAgY29uc3Qgbm9uY2UgPSBhcmdzWzBdO1xuICAgICAgaWYgKCFub25jZSkgdGhyb3cgbmV3IEVycm9yKCdub25jZSAvIGl2IHJlcXVpcmVkJyk7XG4gICAgICBpZiAocGFyYW1zLnZhclNpemVOb25jZSkgYWJ5dGVzKG5vbmNlKTtcbiAgICAgIGVsc2UgYWJ5dGVzKG5vbmNlLCBwYXJhbXMubm9uY2VMZW5ndGgpO1xuICAgIH1cblxuICAgIC8vIFZhbGlkYXRlIEFBRCBpZiB0YWdMZW5ndGggcHJlc2VudFxuICAgIGNvbnN0IHRhZ2wgPSBwYXJhbXMudGFnTGVuZ3RoO1xuICAgIGlmICh0YWdsICYmIGFyZ3NbMV0gIT09IHVuZGVmaW5lZCkge1xuICAgICAgYWJ5dGVzKGFyZ3NbMV0pO1xuICAgIH1cblxuICAgIGNvbnN0IGNpcGhlciA9IGNvbnN0cnVjdG9yKGtleSwgLi4uYXJncyk7XG4gICAgY29uc3QgY2hlY2tPdXRwdXQgPSAoZm5MZW5ndGg6IG51bWJlciwgb3V0cHV0PzogVWludDhBcnJheSkgPT4ge1xuICAgICAgaWYgKG91dHB1dCAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgIGlmIChmbkxlbmd0aCAhPT0gMikgdGhyb3cgbmV3IEVycm9yKCdjaXBoZXIgb3V0cHV0IG5vdCBzdXBwb3J0ZWQnKTtcbiAgICAgICAgYWJ5dGVzKG91dHB1dCk7XG4gICAgICB9XG4gICAgfTtcbiAgICAvLyBDcmVhdGUgd3JhcHBlZCBjaXBoZXIgd2l0aCB2YWxpZGF0aW9uIGFuZCBzaW5nbGUtdXNlIGVuY3J5cHRpb25cbiAgICBsZXQgY2FsbGVkID0gZmFsc2U7XG4gICAgY29uc3Qgd3JDaXBoZXIgPSB7XG4gICAgICBlbmNyeXB0KGRhdGE6IFVpbnQ4QXJyYXksIG91dHB1dD86IFVpbnQ4QXJyYXkpIHtcbiAgICAgICAgaWYgKGNhbGxlZCkgdGhyb3cgbmV3IEVycm9yKCdjYW5ub3QgZW5jcnlwdCgpIHR3aWNlIHdpdGggc2FtZSBrZXkgKyBub25jZScpO1xuICAgICAgICBjYWxsZWQgPSB0cnVlO1xuICAgICAgICBhYnl0ZXMoZGF0YSk7XG4gICAgICAgIGNoZWNrT3V0cHV0KGNpcGhlci5lbmNyeXB0Lmxlbmd0aCwgb3V0cHV0KTtcbiAgICAgICAgcmV0dXJuIChjaXBoZXIgYXMgQ2lwaGVyV2l0aE91dHB1dCkuZW5jcnlwdChkYXRhLCBvdXRwdXQpO1xuICAgICAgfSxcbiAgICAgIGRlY3J5cHQoZGF0YTogVWludDhBcnJheSwgb3V0cHV0PzogVWludDhBcnJheSkge1xuICAgICAgICBhYnl0ZXMoZGF0YSk7XG4gICAgICAgIGlmICh0YWdsICYmIGRhdGEubGVuZ3RoIDwgdGFnbClcbiAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ2ludmFsaWQgY2lwaGVydGV4dCBsZW5ndGg6IHNtYWxsZXIgdGhhbiB0YWdMZW5ndGg9JyArIHRhZ2wpO1xuICAgICAgICBjaGVja091dHB1dChjaXBoZXIuZGVjcnlwdC5sZW5ndGgsIG91dHB1dCk7XG4gICAgICAgIHJldHVybiAoY2lwaGVyIGFzIENpcGhlcldpdGhPdXRwdXQpLmRlY3J5cHQoZGF0YSwgb3V0cHV0KTtcbiAgICAgIH0sXG4gICAgfTtcblxuICAgIHJldHVybiB3ckNpcGhlcjtcbiAgfVxuXG4gIE9iamVjdC5hc3NpZ24od3JhcHBlZENpcGhlciwgcGFyYW1zKTtcbiAgcmV0dXJuIHdyYXBwZWRDaXBoZXIgYXMgQyAmIFA7XG59O1xuXG5leHBvcnQgdHlwZSBYb3JTdHJlYW0gPSAoXG4gIGtleTogVWludDhBcnJheSxcbiAgbm9uY2U6IFVpbnQ4QXJyYXksXG4gIGRhdGE6IFVpbnQ4QXJyYXksXG4gIG91dHB1dD86IFVpbnQ4QXJyYXksXG4gIGNvdW50ZXI/OiBudW1iZXJcbikgPT4gVWludDhBcnJheTtcblxuZXhwb3J0IGZ1bmN0aW9uIGdldE91dHB1dChcbiAgZXhwZWN0ZWRMZW5ndGg6IG51bWJlcixcbiAgb3V0PzogVWludDhBcnJheSxcbiAgb25seUFsaWduZWQgPSB0cnVlXG4pOiBVaW50OEFycmF5IHtcbiAgaWYgKG91dCA9PT0gdW5kZWZpbmVkKSByZXR1cm4gbmV3IFVpbnQ4QXJyYXkoZXhwZWN0ZWRMZW5ndGgpO1xuICBpZiAob3V0Lmxlbmd0aCAhPT0gZXhwZWN0ZWRMZW5ndGgpXG4gICAgdGhyb3cgbmV3IEVycm9yKCdpbnZhbGlkIG91dHB1dCBsZW5ndGgsIGV4cGVjdGVkICcgKyBleHBlY3RlZExlbmd0aCArICcsIGdvdDogJyArIG91dC5sZW5ndGgpO1xuICBpZiAob25seUFsaWduZWQgJiYgIWlzQWxpZ25lZDMyKG91dCkpIHRocm93IG5ldyBFcnJvcignaW52YWxpZCBvdXRwdXQsIG11c3QgYmUgYWxpZ25lZCcpO1xuICByZXR1cm4gb3V0O1xufVxuXG4vLyBQb2x5ZmlsbCBmb3IgU2FmYXJpIDE0XG5leHBvcnQgZnVuY3Rpb24gc2V0QmlnVWludDY0KFxuICB2aWV3OiBEYXRhVmlldyxcbiAgYnl0ZU9mZnNldDogbnVtYmVyLFxuICB2YWx1ZTogYmlnaW50LFxuICBpc0xFOiBib29sZWFuXG4pOiB2b2lkIHtcbiAgaWYgKHR5cGVvZiB2aWV3LnNldEJpZ1VpbnQ2NCA9PT0gJ2Z1bmN0aW9uJykgcmV0dXJuIHZpZXcuc2V0QmlnVWludDY0KGJ5dGVPZmZzZXQsIHZhbHVlLCBpc0xFKTtcbiAgY29uc3QgXzMybiA9IEJpZ0ludCgzMik7XG4gIGNvbnN0IF91MzJfbWF4ID0gQmlnSW50KDB4ZmZmZmZmZmYpO1xuICBjb25zdCB3aCA9IE51bWJlcigodmFsdWUgPj4gXzMybikgJiBfdTMyX21heCk7XG4gIGNvbnN0IHdsID0gTnVtYmVyKHZhbHVlICYgX3UzMl9tYXgpO1xuICBjb25zdCBoID0gaXNMRSA/IDQgOiAwO1xuICBjb25zdCBsID0gaXNMRSA/IDAgOiA0O1xuICB2aWV3LnNldFVpbnQzMihieXRlT2Zmc2V0ICsgaCwgd2gsIGlzTEUpO1xuICB2aWV3LnNldFVpbnQzMihieXRlT2Zmc2V0ICsgbCwgd2wsIGlzTEUpO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gdTY0TGVuZ3RocyhjaXBoZXJ0ZXh0OiBVaW50OEFycmF5LCBBQUQ/OiBVaW50OEFycmF5KTogVWludDhBcnJheSB7XG4gIGNvbnN0IG51bSA9IG5ldyBVaW50OEFycmF5KDE2KTtcbiAgY29uc3QgdmlldyA9IGNyZWF0ZVZpZXcobnVtKTtcbiAgc2V0QmlnVWludDY0KHZpZXcsIDAsIEJpZ0ludChBQUQgPyBBQUQubGVuZ3RoIDogMCksIHRydWUpO1xuICBzZXRCaWdVaW50NjQodmlldywgOCwgQmlnSW50KGNpcGhlcnRleHQubGVuZ3RoKSwgdHJ1ZSk7XG4gIHJldHVybiBudW07XG59XG5cbi8vIElzIGJ5dGUgYXJyYXkgYWxpZ25lZCB0byA0IGJ5dGUgb2Zmc2V0ICh1MzIpP1xuZXhwb3J0IGZ1bmN0aW9uIGlzQWxpZ25lZDMyKGJ5dGVzOiBVaW50OEFycmF5KTogYm9vbGVhbiB7XG4gIHJldHVybiBieXRlcy5ieXRlT2Zmc2V0ICUgNCA9PT0gMDtcbn1cblxuLy8gY29weSBieXRlcyB0byBuZXcgdThhIChhbGlnbmVkKS4gQmVjYXVzZSBCdWZmZXIuc2xpY2UgaXMgYnJva2VuLlxuZXhwb3J0IGZ1bmN0aW9uIGNvcHlCeXRlcyhieXRlczogVWludDhBcnJheSk6IFVpbnQ4QXJyYXkge1xuICByZXR1cm4gVWludDhBcnJheS5mcm9tKGJ5dGVzKTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGNsZWFuKC4uLmFycmF5czogVHlwZWRBcnJheVtdKTogdm9pZCB7XG4gIGZvciAobGV0IGkgPSAwOyBpIDwgYXJyYXlzLmxlbmd0aDsgaSsrKSB7XG4gICAgYXJyYXlzW2ldLmZpbGwoMCk7XG4gIH1cbn1cbiIsICIvKipcbiAqIEJhc2ljIHV0aWxzIGZvciBBUlggKGFkZC1yb3RhdGUteG9yKSBzYWxzYSBhbmQgY2hhY2hhIGNpcGhlcnMuXG5cblJGQzg0MzkgcmVxdWlyZXMgbXVsdGktc3RlcCBjaXBoZXIgc3RyZWFtLCB3aGVyZVxuYXV0aEtleSBzdGFydHMgd2l0aCBjb3VudGVyOiAwLCBhY3R1YWwgbXNnIHdpdGggY291bnRlcjogMS5cblxuRm9yIHRoaXMsIHdlIG5lZWQgYSB3YXkgdG8gcmUtdXNlIG5vbmNlIC8gY291bnRlcjpcblxuICAgIGNvbnN0IGNvdW50ZXIgPSBuZXcgVWludDhBcnJheSg0KTtcbiAgICBjaGFjaGEoLi4uLCBjb3VudGVyLCAuLi4pOyAvLyBjb3VudGVyIGlzIG5vdyAxXG4gICAgY2hhY2hhKC4uLiwgY291bnRlciwgLi4uKTsgLy8gY291bnRlciBpcyBub3cgMlxuXG5UaGlzIGlzIGNvbXBsaWNhdGVkOlxuXG4tIDMyLWJpdCBjb3VudGVycyBhcmUgZW5vdWdoLCBubyBuZWVkIGZvciA2NC1iaXQ6IG1heCBBcnJheUJ1ZmZlciBzaXplIGluIEpTIGlzIDRHQlxuLSBPcmlnaW5hbCBwYXBlcnMgZG9uJ3QgYWxsb3cgbXV0YXRpbmcgY291bnRlcnNcbi0gQ291bnRlciBvdmVyZmxvdyBpcyB1bmRlZmluZWQgW14xXVxuLSBJZGVhIEE6IGFsbG93IHByb3ZpZGluZyAobm9uY2UgfCBjb3VudGVyKSBpbnN0ZWFkIG9mIGp1c3Qgbm9uY2UsIHJlLXVzZSBpdFxuLSBDYXZlYXQ6IENhbm5vdCBiZSByZS11c2VkIHRocm91Z2ggYWxsIGNhc2VzOlxuLSAqIGNoYWNoYSBoYXMgKGNvdW50ZXIgfCBub25jZSlcbi0gKiB4Y2hhY2hhIGhhcyAobm9uY2UxNiB8IGNvdW50ZXIgfCBub25jZTE2KVxuLSBJZGVhIEI6IHNlcGFyYXRlIG5vbmNlIC8gY291bnRlciBhbmQgcHJvdmlkZSBzZXBhcmF0ZSBBUEkgZm9yIGNvdW50ZXIgcmUtdXNlXG4tIENhdmVhdDogdGhlcmUgYXJlIGRpZmZlcmVudCBjb3VudGVyIHNpemVzIGRlcGVuZGluZyBvbiBhbiBhbGdvcml0aG0uXG4tIHNhbHNhICYgY2hhY2hhIGFsc28gZGlmZmVyIGluIHN0cnVjdHVyZXMgb2Yga2V5ICYgc2lnbWE6XG4gIHNhbHNhMjA6ICAgICAgc1swXSB8IGsoNCkgfCBzWzFdIHwgbm9uY2UoMikgfCBjdHIoMikgfCBzWzJdIHwgayg0KSB8IHNbM11cbiAgY2hhY2hhOiAgICAgICBzKDQpIHwgayg4KSB8IGN0cigxKSB8IG5vbmNlKDMpXG4gIGNoYWNoYTIwb3JpZzogcyg0KSB8IGsoOCkgfCBjdHIoMikgfCBub25jZSgyKVxuLSBJZGVhIEM6IGhlbHBlciBtZXRob2Qgc3VjaCBhcyBgc2V0U2Fsc2FTdGF0ZShrZXksIG5vbmNlLCBzaWdtYSwgZGF0YSlgXG4tIENhdmVhdDogd2UgY2FuJ3QgcmUtdXNlIGNvdW50ZXIgYXJyYXlcblxueGNoYWNoYSBbXjJdIHVzZXMgdGhlIHN1YmtleSBhbmQgcmVtYWluaW5nIDggYnl0ZSBub25jZSB3aXRoIENoYUNoYTIwIGFzIG5vcm1hbFxuKHByZWZpeGVkIGJ5IDQgTlVMIGJ5dGVzLCBzaW5jZSBbUkZDODQzOV0gc3BlY2lmaWVzIGEgMTItYnl0ZSBub25jZSkuXG5cblteMV06IGh0dHBzOi8vbWFpbGFyY2hpdmUuaWV0Zi5vcmcvYXJjaC9tc2cvY2ZyZy9nc09uVEp6Y2JnRzZPcUQ4U2MwR081YVJfdFUvXG5bXjJdOiBodHRwczovL2RhdGF0cmFja2VyLmlldGYub3JnL2RvYy9odG1sL2RyYWZ0LWlydGYtY2ZyZy14Y2hhY2hhI2FwcGVuZGl4LUEuMlxuXG4gKiBAbW9kdWxlXG4gKi9cbmltcG9ydCB7IGFib29sLCBhYnl0ZXMsIGFudW1iZXIgfSBmcm9tICcuL19hc3NlcnQuanMnO1xuaW1wb3J0IHsgWG9yU3RyZWFtLCBjaGVja09wdHMsIGNsZWFuLCBjb3B5Qnl0ZXMsIHUzMiB9IGZyb20gJy4vdXRpbHMuanMnO1xuXG4vLyBXZSBjYW4ndCBtYWtlIHRvcC1sZXZlbCB2YXIgZGVwZW5kIG9uIHV0aWxzLnV0ZjhUb0J5dGVzXG4vLyBiZWNhdXNlIGl0J3Mgbm90IHByZXNlbnQgaW4gYWxsIGVudnMuIENyZWF0aW5nIGEgc2ltaWxhciBmbiBoZXJlXG5jb25zdCBfdXRmOFRvQnl0ZXMgPSAoc3RyOiBzdHJpbmcpID0+IFVpbnQ4QXJyYXkuZnJvbShzdHIuc3BsaXQoJycpLm1hcCgoYykgPT4gYy5jaGFyQ29kZUF0KDApKSk7XG5jb25zdCBzaWdtYTE2ID0gX3V0ZjhUb0J5dGVzKCdleHBhbmQgMTYtYnl0ZSBrJyk7XG5jb25zdCBzaWdtYTMyID0gX3V0ZjhUb0J5dGVzKCdleHBhbmQgMzItYnl0ZSBrJyk7XG5jb25zdCBzaWdtYTE2XzMyID0gdTMyKHNpZ21hMTYpO1xuY29uc3Qgc2lnbWEzMl8zMiA9IHUzMihzaWdtYTMyKTtcblxuZXhwb3J0IGZ1bmN0aW9uIHJvdGwoYTogbnVtYmVyLCBiOiBudW1iZXIpOiBudW1iZXIge1xuICByZXR1cm4gKGEgPDwgYikgfCAoYSA+Pj4gKDMyIC0gYikpO1xufVxuXG4vKiogQ2lwaGVycyBtdXN0IHVzZSB1MzIgZm9yIGVmZmljaWVuY3kuICovXG5leHBvcnQgdHlwZSBDaXBoZXJDb3JlRm4gPSAoXG4gIHNpZ21hOiBVaW50MzJBcnJheSxcbiAga2V5OiBVaW50MzJBcnJheSxcbiAgbm9uY2U6IFVpbnQzMkFycmF5LFxuICBvdXRwdXQ6IFVpbnQzMkFycmF5LFxuICBjb3VudGVyOiBudW1iZXIsXG4gIHJvdW5kcz86IG51bWJlclxuKSA9PiB2b2lkO1xuXG4vKiogTWV0aG9kIHdoaWNoIGV4dGVuZHMga2V5ICsgc2hvcnQgbm9uY2UgaW50byBsYXJnZXIgbm9uY2UgLyBkaWZmIGtleS4gKi9cbmV4cG9ydCB0eXBlIEV4dGVuZE5vbmNlRm4gPSAoXG4gIHNpZ21hOiBVaW50MzJBcnJheSxcbiAga2V5OiBVaW50MzJBcnJheSxcbiAgaW5wdXQ6IFVpbnQzMkFycmF5LFxuICBvdXRwdXQ6IFVpbnQzMkFycmF5XG4pID0+IHZvaWQ7XG5cbi8qKiBBUlggY2lwaGVyIG9wdGlvbnMuXG4gKiAqIGBhbGxvd1Nob3J0S2V5c2AgZm9yIDE2LWJ5dGUga2V5c1xuICogKiBgY291bnRlckxlbmd0aGAgaW4gYnl0ZXNcbiAqICogYGNvdW50ZXJSaWdodGA6IHJpZ2h0OiBgbm9uY2V8Y291bnRlcmA7IGxlZnQ6IGBjb3VudGVyfG5vbmNlYFxuICogKi9cbmV4cG9ydCB0eXBlIENpcGhlck9wdHMgPSB7XG4gIGFsbG93U2hvcnRLZXlzPzogYm9vbGVhbjsgLy8gT3JpZ2luYWwgc2Fsc2EgLyBjaGFjaGEgYWxsb3cgMTYtYnl0ZSBrZXlzXG4gIGV4dGVuZE5vbmNlRm4/OiBFeHRlbmROb25jZUZuO1xuICBjb3VudGVyTGVuZ3RoPzogbnVtYmVyO1xuICBjb3VudGVyUmlnaHQ/OiBib29sZWFuO1xuICByb3VuZHM/OiBudW1iZXI7XG59O1xuXG4vLyBJcyBieXRlIGFycmF5IGFsaWduZWQgdG8gNCBieXRlIG9mZnNldCAodTMyKT9cbmZ1bmN0aW9uIGlzQWxpZ25lZDMyKGI6IFVpbnQ4QXJyYXkpIHtcbiAgcmV0dXJuIGIuYnl0ZU9mZnNldCAlIDQgPT09IDA7XG59XG5cbi8vIFNhbHNhIGFuZCBDaGFjaGEgYmxvY2sgbGVuZ3RoIGlzIGFsd2F5cyA1MTItYml0XG5jb25zdCBCTE9DS19MRU4gPSA2NDtcbmNvbnN0IEJMT0NLX0xFTjMyID0gMTY7XG5cbi8vIG5ldyBVaW50MzJBcnJheShbMioqMzJdKSAgIC8vID0+IFVpbnQzMkFycmF5KDEpIFsgMCBdXG4vLyBuZXcgVWludDMyQXJyYXkoWzIqKjMyLTFdKSAvLyA9PiBVaW50MzJBcnJheSgxKSBbIDQyOTQ5NjcyOTUgXVxuY29uc3QgTUFYX0NPVU5URVIgPSAyICoqIDMyIC0gMTtcblxuY29uc3QgVTMyX0VNUFRZID0gbmV3IFVpbnQzMkFycmF5KCk7XG5mdW5jdGlvbiBydW5DaXBoZXIoXG4gIGNvcmU6IENpcGhlckNvcmVGbixcbiAgc2lnbWE6IFVpbnQzMkFycmF5LFxuICBrZXk6IFVpbnQzMkFycmF5LFxuICBub25jZTogVWludDMyQXJyYXksXG4gIGRhdGE6IFVpbnQ4QXJyYXksXG4gIG91dHB1dDogVWludDhBcnJheSxcbiAgY291bnRlcjogbnVtYmVyLFxuICByb3VuZHM6IG51bWJlclxuKTogdm9pZCB7XG4gIGNvbnN0IGxlbiA9IGRhdGEubGVuZ3RoO1xuICBjb25zdCBibG9jayA9IG5ldyBVaW50OEFycmF5KEJMT0NLX0xFTik7XG4gIGNvbnN0IGIzMiA9IHUzMihibG9jayk7XG4gIC8vIE1ha2Ugc3VyZSB0aGF0IGJ1ZmZlcnMgYWxpZ25lZCB0byA0IGJ5dGVzXG4gIGNvbnN0IGlzQWxpZ25lZCA9IGlzQWxpZ25lZDMyKGRhdGEpICYmIGlzQWxpZ25lZDMyKG91dHB1dCk7XG4gIGNvbnN0IGQzMiA9IGlzQWxpZ25lZCA/IHUzMihkYXRhKSA6IFUzMl9FTVBUWTtcbiAgY29uc3QgbzMyID0gaXNBbGlnbmVkID8gdTMyKG91dHB1dCkgOiBVMzJfRU1QVFk7XG4gIGZvciAobGV0IHBvcyA9IDA7IHBvcyA8IGxlbjsgY291bnRlcisrKSB7XG4gICAgY29yZShzaWdtYSwga2V5LCBub25jZSwgYjMyLCBjb3VudGVyLCByb3VuZHMpO1xuICAgIGlmIChjb3VudGVyID49IE1BWF9DT1VOVEVSKSB0aHJvdyBuZXcgRXJyb3IoJ2FyeDogY291bnRlciBvdmVyZmxvdycpO1xuICAgIGNvbnN0IHRha2UgPSBNYXRoLm1pbihCTE9DS19MRU4sIGxlbiAtIHBvcyk7XG4gICAgLy8gYWxpZ25lZCB0byA0IGJ5dGVzXG4gICAgaWYgKGlzQWxpZ25lZCAmJiB0YWtlID09PSBCTE9DS19MRU4pIHtcbiAgICAgIGNvbnN0IHBvczMyID0gcG9zIC8gNDtcbiAgICAgIGlmIChwb3MgJSA0ICE9PSAwKSB0aHJvdyBuZXcgRXJyb3IoJ2FyeDogaW52YWxpZCBibG9jayBwb3NpdGlvbicpO1xuICAgICAgZm9yIChsZXQgaiA9IDAsIHBvc2o6IG51bWJlcjsgaiA8IEJMT0NLX0xFTjMyOyBqKyspIHtcbiAgICAgICAgcG9zaiA9IHBvczMyICsgajtcbiAgICAgICAgbzMyW3Bvc2pdID0gZDMyW3Bvc2pdIF4gYjMyW2pdO1xuICAgICAgfVxuICAgICAgcG9zICs9IEJMT0NLX0xFTjtcbiAgICAgIGNvbnRpbnVlO1xuICAgIH1cbiAgICBmb3IgKGxldCBqID0gMCwgcG9zajsgaiA8IHRha2U7IGorKykge1xuICAgICAgcG9zaiA9IHBvcyArIGo7XG4gICAgICBvdXRwdXRbcG9zal0gPSBkYXRhW3Bvc2pdIF4gYmxvY2tbal07XG4gICAgfVxuICAgIHBvcyArPSB0YWtlO1xuICB9XG59XG5cbi8qKiBDcmVhdGVzIEFSWC1saWtlIChDaGFDaGEsIFNhbHNhKSBjaXBoZXIgc3RyZWFtIGZyb20gY29yZSBmdW5jdGlvbi4gKi9cbmV4cG9ydCBmdW5jdGlvbiBjcmVhdGVDaXBoZXIoY29yZTogQ2lwaGVyQ29yZUZuLCBvcHRzOiBDaXBoZXJPcHRzKTogWG9yU3RyZWFtIHtcbiAgY29uc3QgeyBhbGxvd1Nob3J0S2V5cywgZXh0ZW5kTm9uY2VGbiwgY291bnRlckxlbmd0aCwgY291bnRlclJpZ2h0LCByb3VuZHMgfSA9IGNoZWNrT3B0cyhcbiAgICB7IGFsbG93U2hvcnRLZXlzOiBmYWxzZSwgY291bnRlckxlbmd0aDogOCwgY291bnRlclJpZ2h0OiBmYWxzZSwgcm91bmRzOiAyMCB9LFxuICAgIG9wdHNcbiAgKTtcbiAgaWYgKHR5cGVvZiBjb3JlICE9PSAnZnVuY3Rpb24nKSB0aHJvdyBuZXcgRXJyb3IoJ2NvcmUgbXVzdCBiZSBhIGZ1bmN0aW9uJyk7XG4gIGFudW1iZXIoY291bnRlckxlbmd0aCk7XG4gIGFudW1iZXIocm91bmRzKTtcbiAgYWJvb2woY291bnRlclJpZ2h0KTtcbiAgYWJvb2woYWxsb3dTaG9ydEtleXMpO1xuICByZXR1cm4gKFxuICAgIGtleTogVWludDhBcnJheSxcbiAgICBub25jZTogVWludDhBcnJheSxcbiAgICBkYXRhOiBVaW50OEFycmF5LFxuICAgIG91dHB1dD86IFVpbnQ4QXJyYXksXG4gICAgY291bnRlciA9IDBcbiAgKTogVWludDhBcnJheSA9PiB7XG4gICAgYWJ5dGVzKGtleSk7XG4gICAgYWJ5dGVzKG5vbmNlKTtcbiAgICBhYnl0ZXMoZGF0YSk7XG4gICAgY29uc3QgbGVuID0gZGF0YS5sZW5ndGg7XG4gICAgaWYgKG91dHB1dCA9PT0gdW5kZWZpbmVkKSBvdXRwdXQgPSBuZXcgVWludDhBcnJheShsZW4pO1xuICAgIGFieXRlcyhvdXRwdXQpO1xuICAgIGFudW1iZXIoY291bnRlcik7XG4gICAgaWYgKGNvdW50ZXIgPCAwIHx8IGNvdW50ZXIgPj0gTUFYX0NPVU5URVIpIHRocm93IG5ldyBFcnJvcignYXJ4OiBjb3VudGVyIG92ZXJmbG93Jyk7XG4gICAgaWYgKG91dHB1dC5sZW5ndGggPCBsZW4pXG4gICAgICB0aHJvdyBuZXcgRXJyb3IoYGFyeDogb3V0cHV0ICgke291dHB1dC5sZW5ndGh9KSBpcyBzaG9ydGVyIHRoYW4gZGF0YSAoJHtsZW59KWApO1xuICAgIGNvbnN0IHRvQ2xlYW4gPSBbXTtcblxuICAgIC8vIEtleSAmIHNpZ21hXG4gICAgLy8ga2V5PTE2IC0+IHNpZ21hMTYsIGs9a2V5fGtleVxuICAgIC8vIGtleT0zMiAtPiBzaWdtYTMyLCBrPWtleVxuICAgIGxldCBsID0ga2V5Lmxlbmd0aDtcbiAgICBsZXQgazogVWludDhBcnJheTtcbiAgICBsZXQgc2lnbWE6IFVpbnQzMkFycmF5O1xuICAgIGlmIChsID09PSAzMikge1xuICAgICAgdG9DbGVhbi5wdXNoKChrID0gY29weUJ5dGVzKGtleSkpKTtcbiAgICAgIHNpZ21hID0gc2lnbWEzMl8zMjtcbiAgICB9IGVsc2UgaWYgKGwgPT09IDE2ICYmIGFsbG93U2hvcnRLZXlzKSB7XG4gICAgICBrID0gbmV3IFVpbnQ4QXJyYXkoMzIpO1xuICAgICAgay5zZXQoa2V5KTtcbiAgICAgIGsuc2V0KGtleSwgMTYpO1xuICAgICAgc2lnbWEgPSBzaWdtYTE2XzMyO1xuICAgICAgdG9DbGVhbi5wdXNoKGspO1xuICAgIH0gZWxzZSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoYGFyeDogaW52YWxpZCAzMi1ieXRlIGtleSwgZ290IGxlbmd0aD0ke2x9YCk7XG4gICAgfVxuXG4gICAgLy8gTm9uY2VcbiAgICAvLyBzYWxzYTIwOiAgICAgIDggICAoOC1ieXRlIGNvdW50ZXIpXG4gICAgLy8gY2hhY2hhMjBvcmlnOiA4ICAgKDgtYnl0ZSBjb3VudGVyKVxuICAgIC8vIGNoYWNoYTIwOiAgICAgMTIgICg0LWJ5dGUgY291bnRlcilcbiAgICAvLyB4c2Fsc2EyMDogICAgIDI0ICAoMTYgLT4gaHNhbHNhLCAgOCAtPiBvbGQgbm9uY2UpXG4gICAgLy8geGNoYWNoYTIwOiAgICAyNCAgKDE2IC0+IGhjaGFjaGEsIDggLT4gb2xkIG5vbmNlKVxuICAgIC8vIEFsaWduIG5vbmNlIHRvIDQgYnl0ZXNcbiAgICBpZiAoIWlzQWxpZ25lZDMyKG5vbmNlKSkgdG9DbGVhbi5wdXNoKChub25jZSA9IGNvcHlCeXRlcyhub25jZSkpKTtcblxuICAgIGNvbnN0IGszMiA9IHUzMihrKTtcbiAgICAvLyBoc2Fsc2EgJiBoY2hhY2hhOiBoYW5kbGUgZXh0ZW5kZWQgbm9uY2VcbiAgICBpZiAoZXh0ZW5kTm9uY2VGbikge1xuICAgICAgaWYgKG5vbmNlLmxlbmd0aCAhPT0gMjQpIHRocm93IG5ldyBFcnJvcihgYXJ4OiBleHRlbmRlZCBub25jZSBtdXN0IGJlIDI0IGJ5dGVzYCk7XG4gICAgICBleHRlbmROb25jZUZuKHNpZ21hLCBrMzIsIHUzMihub25jZS5zdWJhcnJheSgwLCAxNikpLCBrMzIpO1xuICAgICAgbm9uY2UgPSBub25jZS5zdWJhcnJheSgxNik7XG4gICAgfVxuXG4gICAgLy8gSGFuZGxlIG5vbmNlIGNvdW50ZXJcbiAgICBjb25zdCBub25jZU5jTGVuID0gMTYgLSBjb3VudGVyTGVuZ3RoO1xuICAgIGlmIChub25jZU5jTGVuICE9PSBub25jZS5sZW5ndGgpXG4gICAgICB0aHJvdyBuZXcgRXJyb3IoYGFyeDogbm9uY2UgbXVzdCBiZSAke25vbmNlTmNMZW59IG9yIDE2IGJ5dGVzYCk7XG5cbiAgICAvLyBQYWQgY291bnRlciB3aGVuIG5vbmNlIGlzIDY0IGJpdFxuICAgIGlmIChub25jZU5jTGVuICE9PSAxMikge1xuICAgICAgY29uc3QgbmMgPSBuZXcgVWludDhBcnJheSgxMik7XG4gICAgICBuYy5zZXQobm9uY2UsIGNvdW50ZXJSaWdodCA/IDAgOiAxMiAtIG5vbmNlLmxlbmd0aCk7XG4gICAgICBub25jZSA9IG5jO1xuICAgICAgdG9DbGVhbi5wdXNoKG5vbmNlKTtcbiAgICB9XG4gICAgY29uc3QgbjMyID0gdTMyKG5vbmNlKTtcbiAgICBydW5DaXBoZXIoY29yZSwgc2lnbWEsIGszMiwgbjMyLCBkYXRhLCBvdXRwdXQsIGNvdW50ZXIsIHJvdW5kcyk7XG4gICAgY2xlYW4oLi4udG9DbGVhbik7XG4gICAgcmV0dXJuIG91dHB1dDtcbiAgfTtcbn1cbiIsICIvKipcbiAqIFBvbHkxMzA1IChbUERGXShodHRwczovL2NyLnlwLnRvL21hYy9wb2x5MTMwNS0yMDA1MDMyOS5wZGYpLFxuICogW3dpa2ldKGh0dHBzOi8vZW4ud2lraXBlZGlhLm9yZy93aWtpL1BvbHkxMzA1KSlcbiAqIGlzIGEgZmFzdCBhbmQgcGFyYWxsZWwgc2VjcmV0LWtleSBtZXNzYWdlLWF1dGhlbnRpY2F0aW9uIGNvZGUgc3VpdGFibGUgZm9yXG4gKiBhIHdpZGUgdmFyaWV0eSBvZiBhcHBsaWNhdGlvbnMuIEl0IHdhcyBzdGFuZGFyZGl6ZWQgaW5cbiAqIFtSRkMgODQzOV0oaHR0cHM6Ly9kYXRhdHJhY2tlci5pZXRmLm9yZy9kb2MvaHRtbC9yZmM4NDM5KSBhbmQgaXMgbm93IHVzZWQgaW4gVExTIDEuMy5cbiAqXG4gKiBQb2x5bm9taWFsIE1BQ3MgYXJlIG5vdCBwZXJmZWN0IGZvciBldmVyeSBzaXR1YXRpb246XG4gKiB0aGV5IGxhY2sgUmFuZG9tIEtleSBSb2J1c3RuZXNzOiB0aGUgTUFDIGNhbiBiZSBmb3JnZWQsIGFuZCBjYW4ndCBiZSB1c2VkIGluIFBBS0Ugc2NoZW1lcy5cbiAqIFNlZSBbaW52aXNpYmxlIHNhbGFtYW5kZXJzIGF0dGFja10oaHR0cHM6Ly9rZXltYXRlcmlhbC5uZXQvMjAyMC8wOS8wNy9pbnZpc2libGUtc2FsYW1hbmRlcnMtaW4tYWVzLWdjbS1zaXYvKS5cbiAqIFRvIGNvbWJhdCBpbnZpc2libGUgc2FsYW1hbmRlcnMsIGBoYXNoKGtleSlgIGNhbiBiZSBpbmNsdWRlZCBpbiBjaXBoZXJ0ZXh0LFxuICogaG93ZXZlciwgdGhpcyB3b3VsZCB2aW9sYXRlIGNpcGhlcnRleHQgaW5kaXN0aW5ndWlzaGFiaWxpdHk6XG4gKiBhbiBhdHRhY2tlciB3b3VsZCBrbm93IHdoaWNoIGtleSB3YXMgdXNlZCAtIHNvIGBIS0RGKGtleSwgaSlgXG4gKiBjb3VsZCBiZSB1c2VkIGluc3RlYWQuXG4gKlxuICogQ2hlY2sgb3V0IFtvcmlnaW5hbCB3ZWJzaXRlXShodHRwczovL2NyLnlwLnRvL21hYy5odG1sKS5cbiAqIEBtb2R1bGVcbiAqL1xuaW1wb3J0IHsgYWJ5dGVzLCBhZXhpc3RzLCBhb3V0cHV0IH0gZnJvbSAnLi9fYXNzZXJ0LmpzJztcbmltcG9ydCB7IEhhc2gsIElucHV0LCBjbGVhbiwgdG9CeXRlcyB9IGZyb20gJy4vdXRpbHMuanMnO1xuXG4vLyBCYXNlZCBvbiBQdWJsaWMgRG9tYWluIHBvbHkxMzA1LWRvbm5hIGh0dHBzOi8vZ2l0aHViLmNvbS9mbG9vZHliZXJyeS9wb2x5MTMwNS1kb25uYVxuY29uc3QgdTh0bzE2ID0gKGE6IFVpbnQ4QXJyYXksIGk6IG51bWJlcikgPT4gKGFbaSsrXSAmIDB4ZmYpIHwgKChhW2krK10gJiAweGZmKSA8PCA4KTtcbmNsYXNzIFBvbHkxMzA1IGltcGxlbWVudHMgSGFzaDxQb2x5MTMwNT4ge1xuICByZWFkb25seSBibG9ja0xlbiA9IDE2O1xuICByZWFkb25seSBvdXRwdXRMZW4gPSAxNjtcbiAgcHJpdmF0ZSBidWZmZXIgPSBuZXcgVWludDhBcnJheSgxNik7XG4gIHByaXZhdGUgciA9IG5ldyBVaW50MTZBcnJheSgxMCk7XG4gIHByaXZhdGUgaCA9IG5ldyBVaW50MTZBcnJheSgxMCk7XG4gIHByaXZhdGUgcGFkID0gbmV3IFVpbnQxNkFycmF5KDgpO1xuICBwcml2YXRlIHBvcyA9IDA7XG4gIHByb3RlY3RlZCBmaW5pc2hlZCA9IGZhbHNlO1xuXG4gIGNvbnN0cnVjdG9yKGtleTogSW5wdXQpIHtcbiAgICBrZXkgPSB0b0J5dGVzKGtleSk7XG4gICAgYWJ5dGVzKGtleSwgMzIpO1xuICAgIGNvbnN0IHQwID0gdTh0bzE2KGtleSwgMCk7XG4gICAgY29uc3QgdDEgPSB1OHRvMTYoa2V5LCAyKTtcbiAgICBjb25zdCB0MiA9IHU4dG8xNihrZXksIDQpO1xuICAgIGNvbnN0IHQzID0gdTh0bzE2KGtleSwgNik7XG4gICAgY29uc3QgdDQgPSB1OHRvMTYoa2V5LCA4KTtcbiAgICBjb25zdCB0NSA9IHU4dG8xNihrZXksIDEwKTtcbiAgICBjb25zdCB0NiA9IHU4dG8xNihrZXksIDEyKTtcbiAgICBjb25zdCB0NyA9IHU4dG8xNihrZXksIDE0KTtcblxuICAgIC8vIGh0dHBzOi8vZ2l0aHViLmNvbS9mbG9vZHliZXJyeS9wb2x5MTMwNS1kb25uYS9ibG9iL2U2YWQ2ZTA5MWQzMGQ3ZjRlYzJkNGY5NzhiZTFmY2ZjYmNlNzI3ODEvcG9seTEzMDUtZG9ubmEtMTYuaCNMNDdcbiAgICB0aGlzLnJbMF0gPSB0MCAmIDB4MWZmZjtcbiAgICB0aGlzLnJbMV0gPSAoKHQwID4+PiAxMykgfCAodDEgPDwgMykpICYgMHgxZmZmO1xuICAgIHRoaXMuclsyXSA9ICgodDEgPj4+IDEwKSB8ICh0MiA8PCA2KSkgJiAweDFmMDM7XG4gICAgdGhpcy5yWzNdID0gKCh0MiA+Pj4gNykgfCAodDMgPDwgOSkpICYgMHgxZmZmO1xuICAgIHRoaXMucls0XSA9ICgodDMgPj4+IDQpIHwgKHQ0IDw8IDEyKSkgJiAweDAwZmY7XG4gICAgdGhpcy5yWzVdID0gKHQ0ID4+PiAxKSAmIDB4MWZmZTtcbiAgICB0aGlzLnJbNl0gPSAoKHQ0ID4+PiAxNCkgfCAodDUgPDwgMikpICYgMHgxZmZmO1xuICAgIHRoaXMucls3XSA9ICgodDUgPj4+IDExKSB8ICh0NiA8PCA1KSkgJiAweDFmODE7XG4gICAgdGhpcy5yWzhdID0gKCh0NiA+Pj4gOCkgfCAodDcgPDwgOCkpICYgMHgxZmZmO1xuICAgIHRoaXMucls5XSA9ICh0NyA+Pj4gNSkgJiAweDAwN2Y7XG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCA4OyBpKyspIHRoaXMucGFkW2ldID0gdTh0bzE2KGtleSwgMTYgKyAyICogaSk7XG4gIH1cblxuICBwcml2YXRlIHByb2Nlc3MoZGF0YTogVWludDhBcnJheSwgb2Zmc2V0OiBudW1iZXIsIGlzTGFzdCA9IGZhbHNlKSB7XG4gICAgY29uc3QgaGliaXQgPSBpc0xhc3QgPyAwIDogMSA8PCAxMTtcbiAgICBjb25zdCB7IGgsIHIgfSA9IHRoaXM7XG4gICAgY29uc3QgcjAgPSByWzBdO1xuICAgIGNvbnN0IHIxID0gclsxXTtcbiAgICBjb25zdCByMiA9IHJbMl07XG4gICAgY29uc3QgcjMgPSByWzNdO1xuICAgIGNvbnN0IHI0ID0gcls0XTtcbiAgICBjb25zdCByNSA9IHJbNV07XG4gICAgY29uc3QgcjYgPSByWzZdO1xuICAgIGNvbnN0IHI3ID0gcls3XTtcbiAgICBjb25zdCByOCA9IHJbOF07XG4gICAgY29uc3QgcjkgPSByWzldO1xuXG4gICAgY29uc3QgdDAgPSB1OHRvMTYoZGF0YSwgb2Zmc2V0ICsgMCk7XG4gICAgY29uc3QgdDEgPSB1OHRvMTYoZGF0YSwgb2Zmc2V0ICsgMik7XG4gICAgY29uc3QgdDIgPSB1OHRvMTYoZGF0YSwgb2Zmc2V0ICsgNCk7XG4gICAgY29uc3QgdDMgPSB1OHRvMTYoZGF0YSwgb2Zmc2V0ICsgNik7XG4gICAgY29uc3QgdDQgPSB1OHRvMTYoZGF0YSwgb2Zmc2V0ICsgOCk7XG4gICAgY29uc3QgdDUgPSB1OHRvMTYoZGF0YSwgb2Zmc2V0ICsgMTApO1xuICAgIGNvbnN0IHQ2ID0gdTh0bzE2KGRhdGEsIG9mZnNldCArIDEyKTtcbiAgICBjb25zdCB0NyA9IHU4dG8xNihkYXRhLCBvZmZzZXQgKyAxNCk7XG5cbiAgICBsZXQgaDAgPSBoWzBdICsgKHQwICYgMHgxZmZmKTtcbiAgICBsZXQgaDEgPSBoWzFdICsgKCgodDAgPj4+IDEzKSB8ICh0MSA8PCAzKSkgJiAweDFmZmYpO1xuICAgIGxldCBoMiA9IGhbMl0gKyAoKCh0MSA+Pj4gMTApIHwgKHQyIDw8IDYpKSAmIDB4MWZmZik7XG4gICAgbGV0IGgzID0gaFszXSArICgoKHQyID4+PiA3KSB8ICh0MyA8PCA5KSkgJiAweDFmZmYpO1xuICAgIGxldCBoNCA9IGhbNF0gKyAoKCh0MyA+Pj4gNCkgfCAodDQgPDwgMTIpKSAmIDB4MWZmZik7XG4gICAgbGV0IGg1ID0gaFs1XSArICgodDQgPj4+IDEpICYgMHgxZmZmKTtcbiAgICBsZXQgaDYgPSBoWzZdICsgKCgodDQgPj4+IDE0KSB8ICh0NSA8PCAyKSkgJiAweDFmZmYpO1xuICAgIGxldCBoNyA9IGhbN10gKyAoKCh0NSA+Pj4gMTEpIHwgKHQ2IDw8IDUpKSAmIDB4MWZmZik7XG4gICAgbGV0IGg4ID0gaFs4XSArICgoKHQ2ID4+PiA4KSB8ICh0NyA8PCA4KSkgJiAweDFmZmYpO1xuICAgIGxldCBoOSA9IGhbOV0gKyAoKHQ3ID4+PiA1KSB8IGhpYml0KTtcblxuICAgIGxldCBjID0gMDtcblxuICAgIGxldCBkMCA9IGMgKyBoMCAqIHIwICsgaDEgKiAoNSAqIHI5KSArIGgyICogKDUgKiByOCkgKyBoMyAqICg1ICogcjcpICsgaDQgKiAoNSAqIHI2KTtcbiAgICBjID0gZDAgPj4+IDEzO1xuICAgIGQwICY9IDB4MWZmZjtcbiAgICBkMCArPSBoNSAqICg1ICogcjUpICsgaDYgKiAoNSAqIHI0KSArIGg3ICogKDUgKiByMykgKyBoOCAqICg1ICogcjIpICsgaDkgKiAoNSAqIHIxKTtcbiAgICBjICs9IGQwID4+PiAxMztcbiAgICBkMCAmPSAweDFmZmY7XG5cbiAgICBsZXQgZDEgPSBjICsgaDAgKiByMSArIGgxICogcjAgKyBoMiAqICg1ICogcjkpICsgaDMgKiAoNSAqIHI4KSArIGg0ICogKDUgKiByNyk7XG4gICAgYyA9IGQxID4+PiAxMztcbiAgICBkMSAmPSAweDFmZmY7XG4gICAgZDEgKz0gaDUgKiAoNSAqIHI2KSArIGg2ICogKDUgKiByNSkgKyBoNyAqICg1ICogcjQpICsgaDggKiAoNSAqIHIzKSArIGg5ICogKDUgKiByMik7XG4gICAgYyArPSBkMSA+Pj4gMTM7XG4gICAgZDEgJj0gMHgxZmZmO1xuXG4gICAgbGV0IGQyID0gYyArIGgwICogcjIgKyBoMSAqIHIxICsgaDIgKiByMCArIGgzICogKDUgKiByOSkgKyBoNCAqICg1ICogcjgpO1xuICAgIGMgPSBkMiA+Pj4gMTM7XG4gICAgZDIgJj0gMHgxZmZmO1xuICAgIGQyICs9IGg1ICogKDUgKiByNykgKyBoNiAqICg1ICogcjYpICsgaDcgKiAoNSAqIHI1KSArIGg4ICogKDUgKiByNCkgKyBoOSAqICg1ICogcjMpO1xuICAgIGMgKz0gZDIgPj4+IDEzO1xuICAgIGQyICY9IDB4MWZmZjtcblxuICAgIGxldCBkMyA9IGMgKyBoMCAqIHIzICsgaDEgKiByMiArIGgyICogcjEgKyBoMyAqIHIwICsgaDQgKiAoNSAqIHI5KTtcbiAgICBjID0gZDMgPj4+IDEzO1xuICAgIGQzICY9IDB4MWZmZjtcbiAgICBkMyArPSBoNSAqICg1ICogcjgpICsgaDYgKiAoNSAqIHI3KSArIGg3ICogKDUgKiByNikgKyBoOCAqICg1ICogcjUpICsgaDkgKiAoNSAqIHI0KTtcbiAgICBjICs9IGQzID4+PiAxMztcbiAgICBkMyAmPSAweDFmZmY7XG5cbiAgICBsZXQgZDQgPSBjICsgaDAgKiByNCArIGgxICogcjMgKyBoMiAqIHIyICsgaDMgKiByMSArIGg0ICogcjA7XG4gICAgYyA9IGQ0ID4+PiAxMztcbiAgICBkNCAmPSAweDFmZmY7XG4gICAgZDQgKz0gaDUgKiAoNSAqIHI5KSArIGg2ICogKDUgKiByOCkgKyBoNyAqICg1ICogcjcpICsgaDggKiAoNSAqIHI2KSArIGg5ICogKDUgKiByNSk7XG4gICAgYyArPSBkNCA+Pj4gMTM7XG4gICAgZDQgJj0gMHgxZmZmO1xuXG4gICAgbGV0IGQ1ID0gYyArIGgwICogcjUgKyBoMSAqIHI0ICsgaDIgKiByMyArIGgzICogcjIgKyBoNCAqIHIxO1xuICAgIGMgPSBkNSA+Pj4gMTM7XG4gICAgZDUgJj0gMHgxZmZmO1xuICAgIGQ1ICs9IGg1ICogcjAgKyBoNiAqICg1ICogcjkpICsgaDcgKiAoNSAqIHI4KSArIGg4ICogKDUgKiByNykgKyBoOSAqICg1ICogcjYpO1xuICAgIGMgKz0gZDUgPj4+IDEzO1xuICAgIGQ1ICY9IDB4MWZmZjtcblxuICAgIGxldCBkNiA9IGMgKyBoMCAqIHI2ICsgaDEgKiByNSArIGgyICogcjQgKyBoMyAqIHIzICsgaDQgKiByMjtcbiAgICBjID0gZDYgPj4+IDEzO1xuICAgIGQ2ICY9IDB4MWZmZjtcbiAgICBkNiArPSBoNSAqIHIxICsgaDYgKiByMCArIGg3ICogKDUgKiByOSkgKyBoOCAqICg1ICogcjgpICsgaDkgKiAoNSAqIHI3KTtcbiAgICBjICs9IGQ2ID4+PiAxMztcbiAgICBkNiAmPSAweDFmZmY7XG5cbiAgICBsZXQgZDcgPSBjICsgaDAgKiByNyArIGgxICogcjYgKyBoMiAqIHI1ICsgaDMgKiByNCArIGg0ICogcjM7XG4gICAgYyA9IGQ3ID4+PiAxMztcbiAgICBkNyAmPSAweDFmZmY7XG4gICAgZDcgKz0gaDUgKiByMiArIGg2ICogcjEgKyBoNyAqIHIwICsgaDggKiAoNSAqIHI5KSArIGg5ICogKDUgKiByOCk7XG4gICAgYyArPSBkNyA+Pj4gMTM7XG4gICAgZDcgJj0gMHgxZmZmO1xuXG4gICAgbGV0IGQ4ID0gYyArIGgwICogcjggKyBoMSAqIHI3ICsgaDIgKiByNiArIGgzICogcjUgKyBoNCAqIHI0O1xuICAgIGMgPSBkOCA+Pj4gMTM7XG4gICAgZDggJj0gMHgxZmZmO1xuICAgIGQ4ICs9IGg1ICogcjMgKyBoNiAqIHIyICsgaDcgKiByMSArIGg4ICogcjAgKyBoOSAqICg1ICogcjkpO1xuICAgIGMgKz0gZDggPj4+IDEzO1xuICAgIGQ4ICY9IDB4MWZmZjtcblxuICAgIGxldCBkOSA9IGMgKyBoMCAqIHI5ICsgaDEgKiByOCArIGgyICogcjcgKyBoMyAqIHI2ICsgaDQgKiByNTtcbiAgICBjID0gZDkgPj4+IDEzO1xuICAgIGQ5ICY9IDB4MWZmZjtcbiAgICBkOSArPSBoNSAqIHI0ICsgaDYgKiByMyArIGg3ICogcjIgKyBoOCAqIHIxICsgaDkgKiByMDtcbiAgICBjICs9IGQ5ID4+PiAxMztcbiAgICBkOSAmPSAweDFmZmY7XG5cbiAgICBjID0gKChjIDw8IDIpICsgYykgfCAwO1xuICAgIGMgPSAoYyArIGQwKSB8IDA7XG4gICAgZDAgPSBjICYgMHgxZmZmO1xuICAgIGMgPSBjID4+PiAxMztcbiAgICBkMSArPSBjO1xuXG4gICAgaFswXSA9IGQwO1xuICAgIGhbMV0gPSBkMTtcbiAgICBoWzJdID0gZDI7XG4gICAgaFszXSA9IGQzO1xuICAgIGhbNF0gPSBkNDtcbiAgICBoWzVdID0gZDU7XG4gICAgaFs2XSA9IGQ2O1xuICAgIGhbN10gPSBkNztcbiAgICBoWzhdID0gZDg7XG4gICAgaFs5XSA9IGQ5O1xuICB9XG5cbiAgcHJpdmF0ZSBmaW5hbGl6ZSgpIHtcbiAgICBjb25zdCB7IGgsIHBhZCB9ID0gdGhpcztcbiAgICBjb25zdCBnID0gbmV3IFVpbnQxNkFycmF5KDEwKTtcbiAgICBsZXQgYyA9IGhbMV0gPj4+IDEzO1xuICAgIGhbMV0gJj0gMHgxZmZmO1xuICAgIGZvciAobGV0IGkgPSAyOyBpIDwgMTA7IGkrKykge1xuICAgICAgaFtpXSArPSBjO1xuICAgICAgYyA9IGhbaV0gPj4+IDEzO1xuICAgICAgaFtpXSAmPSAweDFmZmY7XG4gICAgfVxuICAgIGhbMF0gKz0gYyAqIDU7XG4gICAgYyA9IGhbMF0gPj4+IDEzO1xuICAgIGhbMF0gJj0gMHgxZmZmO1xuICAgIGhbMV0gKz0gYztcbiAgICBjID0gaFsxXSA+Pj4gMTM7XG4gICAgaFsxXSAmPSAweDFmZmY7XG4gICAgaFsyXSArPSBjO1xuXG4gICAgZ1swXSA9IGhbMF0gKyA1O1xuICAgIGMgPSBnWzBdID4+PiAxMztcbiAgICBnWzBdICY9IDB4MWZmZjtcbiAgICBmb3IgKGxldCBpID0gMTsgaSA8IDEwOyBpKyspIHtcbiAgICAgIGdbaV0gPSBoW2ldICsgYztcbiAgICAgIGMgPSBnW2ldID4+PiAxMztcbiAgICAgIGdbaV0gJj0gMHgxZmZmO1xuICAgIH1cbiAgICBnWzldIC09IDEgPDwgMTM7XG5cbiAgICBsZXQgbWFzayA9IChjIF4gMSkgLSAxO1xuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgMTA7IGkrKykgZ1tpXSAmPSBtYXNrO1xuICAgIG1hc2sgPSB+bWFzaztcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IDEwOyBpKyspIGhbaV0gPSAoaFtpXSAmIG1hc2spIHwgZ1tpXTtcbiAgICBoWzBdID0gKGhbMF0gfCAoaFsxXSA8PCAxMykpICYgMHhmZmZmO1xuICAgIGhbMV0gPSAoKGhbMV0gPj4+IDMpIHwgKGhbMl0gPDwgMTApKSAmIDB4ZmZmZjtcbiAgICBoWzJdID0gKChoWzJdID4+PiA2KSB8IChoWzNdIDw8IDcpKSAmIDB4ZmZmZjtcbiAgICBoWzNdID0gKChoWzNdID4+PiA5KSB8IChoWzRdIDw8IDQpKSAmIDB4ZmZmZjtcbiAgICBoWzRdID0gKChoWzRdID4+PiAxMikgfCAoaFs1XSA8PCAxKSB8IChoWzZdIDw8IDE0KSkgJiAweGZmZmY7XG4gICAgaFs1XSA9ICgoaFs2XSA+Pj4gMikgfCAoaFs3XSA8PCAxMSkpICYgMHhmZmZmO1xuICAgIGhbNl0gPSAoKGhbN10gPj4+IDUpIHwgKGhbOF0gPDwgOCkpICYgMHhmZmZmO1xuICAgIGhbN10gPSAoKGhbOF0gPj4+IDgpIHwgKGhbOV0gPDwgNSkpICYgMHhmZmZmO1xuXG4gICAgbGV0IGYgPSBoWzBdICsgcGFkWzBdO1xuICAgIGhbMF0gPSBmICYgMHhmZmZmO1xuICAgIGZvciAobGV0IGkgPSAxOyBpIDwgODsgaSsrKSB7XG4gICAgICBmID0gKCgoaFtpXSArIHBhZFtpXSkgfCAwKSArIChmID4+PiAxNikpIHwgMDtcbiAgICAgIGhbaV0gPSBmICYgMHhmZmZmO1xuICAgIH1cbiAgICBjbGVhbihnKTtcbiAgfVxuICB1cGRhdGUoZGF0YTogSW5wdXQpOiB0aGlzIHtcbiAgICBhZXhpc3RzKHRoaXMpO1xuICAgIGNvbnN0IHsgYnVmZmVyLCBibG9ja0xlbiB9ID0gdGhpcztcbiAgICBkYXRhID0gdG9CeXRlcyhkYXRhKTtcbiAgICBjb25zdCBsZW4gPSBkYXRhLmxlbmd0aDtcblxuICAgIGZvciAobGV0IHBvcyA9IDA7IHBvcyA8IGxlbjsgKSB7XG4gICAgICBjb25zdCB0YWtlID0gTWF0aC5taW4oYmxvY2tMZW4gLSB0aGlzLnBvcywgbGVuIC0gcG9zKTtcbiAgICAgIC8vIEZhc3QgcGF0aDogd2UgaGF2ZSBhdCBsZWFzdCBvbmUgYmxvY2sgaW4gaW5wdXRcbiAgICAgIGlmICh0YWtlID09PSBibG9ja0xlbikge1xuICAgICAgICBmb3IgKDsgYmxvY2tMZW4gPD0gbGVuIC0gcG9zOyBwb3MgKz0gYmxvY2tMZW4pIHRoaXMucHJvY2VzcyhkYXRhLCBwb3MpO1xuICAgICAgICBjb250aW51ZTtcbiAgICAgIH1cbiAgICAgIGJ1ZmZlci5zZXQoZGF0YS5zdWJhcnJheShwb3MsIHBvcyArIHRha2UpLCB0aGlzLnBvcyk7XG4gICAgICB0aGlzLnBvcyArPSB0YWtlO1xuICAgICAgcG9zICs9IHRha2U7XG4gICAgICBpZiAodGhpcy5wb3MgPT09IGJsb2NrTGVuKSB7XG4gICAgICAgIHRoaXMucHJvY2VzcyhidWZmZXIsIDAsIGZhbHNlKTtcbiAgICAgICAgdGhpcy5wb3MgPSAwO1xuICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gdGhpcztcbiAgfVxuICBkZXN0cm95KCkge1xuICAgIGNsZWFuKHRoaXMuaCwgdGhpcy5yLCB0aGlzLmJ1ZmZlciwgdGhpcy5wYWQpO1xuICB9XG4gIGRpZ2VzdEludG8ob3V0OiBVaW50OEFycmF5KSB7XG4gICAgYWV4aXN0cyh0aGlzKTtcbiAgICBhb3V0cHV0KG91dCwgdGhpcyk7XG4gICAgdGhpcy5maW5pc2hlZCA9IHRydWU7XG4gICAgY29uc3QgeyBidWZmZXIsIGggfSA9IHRoaXM7XG4gICAgbGV0IHsgcG9zIH0gPSB0aGlzO1xuICAgIGlmIChwb3MpIHtcbiAgICAgIGJ1ZmZlcltwb3MrK10gPSAxO1xuICAgICAgZm9yICg7IHBvcyA8IDE2OyBwb3MrKykgYnVmZmVyW3Bvc10gPSAwO1xuICAgICAgdGhpcy5wcm9jZXNzKGJ1ZmZlciwgMCwgdHJ1ZSk7XG4gICAgfVxuICAgIHRoaXMuZmluYWxpemUoKTtcbiAgICBsZXQgb3BvcyA9IDA7XG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCA4OyBpKyspIHtcbiAgICAgIG91dFtvcG9zKytdID0gaFtpXSA+Pj4gMDtcbiAgICAgIG91dFtvcG9zKytdID0gaFtpXSA+Pj4gODtcbiAgICB9XG4gICAgcmV0dXJuIG91dDtcbiAgfVxuICBkaWdlc3QoKTogVWludDhBcnJheSB7XG4gICAgY29uc3QgeyBidWZmZXIsIG91dHB1dExlbiB9ID0gdGhpcztcbiAgICB0aGlzLmRpZ2VzdEludG8oYnVmZmVyKTtcbiAgICBjb25zdCByZXMgPSBidWZmZXIuc2xpY2UoMCwgb3V0cHV0TGVuKTtcbiAgICB0aGlzLmRlc3Ryb3koKTtcbiAgICByZXR1cm4gcmVzO1xuICB9XG59XG5cbmV4cG9ydCB0eXBlIENIYXNoID0gUmV0dXJuVHlwZTx0eXBlb2Ygd3JhcENvbnN0cnVjdG9yV2l0aEtleT47XG5leHBvcnQgZnVuY3Rpb24gd3JhcENvbnN0cnVjdG9yV2l0aEtleTxIIGV4dGVuZHMgSGFzaDxIPj4oXG4gIGhhc2hDb25zOiAoa2V5OiBJbnB1dCkgPT4gSGFzaDxIPlxuKToge1xuICAobXNnOiBJbnB1dCwga2V5OiBJbnB1dCk6IFVpbnQ4QXJyYXk7XG4gIG91dHB1dExlbjogbnVtYmVyO1xuICBibG9ja0xlbjogbnVtYmVyO1xuICBjcmVhdGUoa2V5OiBJbnB1dCk6IEhhc2g8SD47XG59IHtcbiAgY29uc3QgaGFzaEMgPSAobXNnOiBJbnB1dCwga2V5OiBJbnB1dCk6IFVpbnQ4QXJyYXkgPT4gaGFzaENvbnMoa2V5KS51cGRhdGUodG9CeXRlcyhtc2cpKS5kaWdlc3QoKTtcbiAgY29uc3QgdG1wID0gaGFzaENvbnMobmV3IFVpbnQ4QXJyYXkoMzIpKTtcbiAgaGFzaEMub3V0cHV0TGVuID0gdG1wLm91dHB1dExlbjtcbiAgaGFzaEMuYmxvY2tMZW4gPSB0bXAuYmxvY2tMZW47XG4gIGhhc2hDLmNyZWF0ZSA9IChrZXk6IElucHV0KSA9PiBoYXNoQ29ucyhrZXkpO1xuICByZXR1cm4gaGFzaEM7XG59XG5cbi8qKiBQb2x5MTMwNSBNQUMgZnJvbSBSRkMgODQzOS4gKi9cbmV4cG9ydCBjb25zdCBwb2x5MTMwNTogQ0hhc2ggPSB3cmFwQ29uc3RydWN0b3JXaXRoS2V5KChrZXkpID0+IG5ldyBQb2x5MTMwNShrZXkpKTtcbiIsICIvKipcbiAqIFtDaGFDaGEyMF0oaHR0cHM6Ly9jci55cC50by9jaGFjaGEuaHRtbCkgc3RyZWFtIGNpcGhlciwgcmVsZWFzZWRcbiAqIGluIDIwMDguIERldmVsb3BlZCBhZnRlciBTYWxzYTIwLCBDaGFDaGEgYWltcyB0byBpbmNyZWFzZSBkaWZmdXNpb24gcGVyIHJvdW5kLlxuICogSXQgd2FzIHN0YW5kYXJkaXplZCBpbiBbUkZDIDg0MzldKGh0dHBzOi8vZGF0YXRyYWNrZXIuaWV0Zi5vcmcvZG9jL2h0bWwvcmZjODQzOSkgYW5kXG4gKiBpcyBub3cgdXNlZCBpbiBUTFMgMS4zLlxuICpcbiAqIFtYQ2hhQ2hhMjBdKGh0dHBzOi8vZGF0YXRyYWNrZXIuaWV0Zi5vcmcvZG9jL2h0bWwvZHJhZnQtaXJ0Zi1jZnJnLXhjaGFjaGEpXG4gKiBleHRlbmRlZC1ub25jZSB2YXJpYW50IGlzIGFsc28gcHJvdmlkZWQuIFNpbWlsYXIgdG8gWFNhbHNhLCBpdCdzIHNhZmUgdG8gdXNlIHdpdGhcbiAqIHJhbmRvbWx5LWdlbmVyYXRlZCBub25jZXMuXG4gKlxuICogQ2hlY2sgb3V0IFtQREZdKGh0dHA6Ly9jci55cC50by9jaGFjaGEvY2hhY2hhLTIwMDgwMTI4LnBkZikgYW5kXG4gKiBbd2lraV0oaHR0cHM6Ly9lbi53aWtpcGVkaWEub3JnL3dpa2kvU2Fsc2EyMCkuXG4gKiBAbW9kdWxlXG4gKi9cbmltcG9ydCB7IGNyZWF0ZUNpcGhlciwgcm90bCB9IGZyb20gJy4vX2FyeC5qcyc7XG5pbXBvcnQgeyBwb2x5MTMwNSB9IGZyb20gJy4vX3BvbHkxMzA1LmpzJztcbmltcG9ydCB7XG4gIEFSWENpcGhlcixcbiAgQ2lwaGVyV2l0aE91dHB1dCxcbiAgWG9yU3RyZWFtLFxuICBjbGVhbixcbiAgY3JlYXRlVmlldyxcbiAgZXF1YWxCeXRlcyxcbiAgZ2V0T3V0cHV0LFxuICBzZXRCaWdVaW50NjQsXG4gIHdyYXBDaXBoZXIsXG59IGZyb20gJy4vdXRpbHMuanMnO1xuXG4vKipcbiAqIENoYUNoYSBjb3JlIGZ1bmN0aW9uLlxuICovXG4vLyBwcmV0dGllci1pZ25vcmVcbmZ1bmN0aW9uIGNoYWNoYUNvcmUoXG4gIHM6IFVpbnQzMkFycmF5LCBrOiBVaW50MzJBcnJheSwgbjogVWludDMyQXJyYXksIG91dDogVWludDMyQXJyYXksIGNudDogbnVtYmVyLCByb3VuZHMgPSAyMFxuKTogdm9pZCB7XG4gIGxldCB5MDAgPSBzWzBdLCB5MDEgPSBzWzFdLCB5MDIgPSBzWzJdLCB5MDMgPSBzWzNdLCAvLyBcImV4cGFcIiAgIFwibmQgM1wiICBcIjItYnlcIiAgXCJ0ZSBrXCJcbiAgICB5MDQgPSBrWzBdLCB5MDUgPSBrWzFdLCB5MDYgPSBrWzJdLCB5MDcgPSBrWzNdLCAgIC8vIEtleSAgICAgIEtleSAgICAgS2V5ICAgICBLZXlcbiAgICB5MDggPSBrWzRdLCB5MDkgPSBrWzVdLCB5MTAgPSBrWzZdLCB5MTEgPSBrWzddLCAgIC8vIEtleSAgICAgIEtleSAgICAgS2V5ICAgICBLZXlcbiAgICB5MTIgPSBjbnQsIHkxMyA9IG5bMF0sIHkxNCA9IG5bMV0sIHkxNSA9IG5bMl07ICAgIC8vIENvdW50ZXIgIENvdW50ZXJcdE5vbmNlICAgTm9uY2VcbiAgLy8gU2F2ZSBzdGF0ZSB0byB0ZW1wb3JhcnkgdmFyaWFibGVzXG4gIGxldCB4MDAgPSB5MDAsIHgwMSA9IHkwMSwgeDAyID0geTAyLCB4MDMgPSB5MDMsXG4gICAgeDA0ID0geTA0LCB4MDUgPSB5MDUsIHgwNiA9IHkwNiwgeDA3ID0geTA3LFxuICAgIHgwOCA9IHkwOCwgeDA5ID0geTA5LCB4MTAgPSB5MTAsIHgxMSA9IHkxMSxcbiAgICB4MTIgPSB5MTIsIHgxMyA9IHkxMywgeDE0ID0geTE0LCB4MTUgPSB5MTU7XG4gIGZvciAobGV0IHIgPSAwOyByIDwgcm91bmRzOyByICs9IDIpIHtcbiAgICB4MDAgPSAoeDAwICsgeDA0KSB8IDA7IHgxMiA9IHJvdGwoeDEyIF4geDAwLCAxNik7XG4gICAgeDA4ID0gKHgwOCArIHgxMikgfCAwOyB4MDQgPSByb3RsKHgwNCBeIHgwOCwgMTIpO1xuICAgIHgwMCA9ICh4MDAgKyB4MDQpIHwgMDsgeDEyID0gcm90bCh4MTIgXiB4MDAsIDgpO1xuICAgIHgwOCA9ICh4MDggKyB4MTIpIHwgMDsgeDA0ID0gcm90bCh4MDQgXiB4MDgsIDcpO1xuXG4gICAgeDAxID0gKHgwMSArIHgwNSkgfCAwOyB4MTMgPSByb3RsKHgxMyBeIHgwMSwgMTYpO1xuICAgIHgwOSA9ICh4MDkgKyB4MTMpIHwgMDsgeDA1ID0gcm90bCh4MDUgXiB4MDksIDEyKTtcbiAgICB4MDEgPSAoeDAxICsgeDA1KSB8IDA7IHgxMyA9IHJvdGwoeDEzIF4geDAxLCA4KTtcbiAgICB4MDkgPSAoeDA5ICsgeDEzKSB8IDA7IHgwNSA9IHJvdGwoeDA1IF4geDA5LCA3KTtcblxuICAgIHgwMiA9ICh4MDIgKyB4MDYpIHwgMDsgeDE0ID0gcm90bCh4MTQgXiB4MDIsIDE2KTtcbiAgICB4MTAgPSAoeDEwICsgeDE0KSB8IDA7IHgwNiA9IHJvdGwoeDA2IF4geDEwLCAxMik7XG4gICAgeDAyID0gKHgwMiArIHgwNikgfCAwOyB4MTQgPSByb3RsKHgxNCBeIHgwMiwgOCk7XG4gICAgeDEwID0gKHgxMCArIHgxNCkgfCAwOyB4MDYgPSByb3RsKHgwNiBeIHgxMCwgNyk7XG5cbiAgICB4MDMgPSAoeDAzICsgeDA3KSB8IDA7IHgxNSA9IHJvdGwoeDE1IF4geDAzLCAxNik7XG4gICAgeDExID0gKHgxMSArIHgxNSkgfCAwOyB4MDcgPSByb3RsKHgwNyBeIHgxMSwgMTIpO1xuICAgIHgwMyA9ICh4MDMgKyB4MDcpIHwgMDsgeDE1ID0gcm90bCh4MTUgXiB4MDMsIDgpXG4gICAgeDExID0gKHgxMSArIHgxNSkgfCAwOyB4MDcgPSByb3RsKHgwNyBeIHgxMSwgNyk7XG5cbiAgICB4MDAgPSAoeDAwICsgeDA1KSB8IDA7IHgxNSA9IHJvdGwoeDE1IF4geDAwLCAxNik7XG4gICAgeDEwID0gKHgxMCArIHgxNSkgfCAwOyB4MDUgPSByb3RsKHgwNSBeIHgxMCwgMTIpO1xuICAgIHgwMCA9ICh4MDAgKyB4MDUpIHwgMDsgeDE1ID0gcm90bCh4MTUgXiB4MDAsIDgpO1xuICAgIHgxMCA9ICh4MTAgKyB4MTUpIHwgMDsgeDA1ID0gcm90bCh4MDUgXiB4MTAsIDcpO1xuXG4gICAgeDAxID0gKHgwMSArIHgwNikgfCAwOyB4MTIgPSByb3RsKHgxMiBeIHgwMSwgMTYpO1xuICAgIHgxMSA9ICh4MTEgKyB4MTIpIHwgMDsgeDA2ID0gcm90bCh4MDYgXiB4MTEsIDEyKTtcbiAgICB4MDEgPSAoeDAxICsgeDA2KSB8IDA7IHgxMiA9IHJvdGwoeDEyIF4geDAxLCA4KTtcbiAgICB4MTEgPSAoeDExICsgeDEyKSB8IDA7IHgwNiA9IHJvdGwoeDA2IF4geDExLCA3KTtcblxuICAgIHgwMiA9ICh4MDIgKyB4MDcpIHwgMDsgeDEzID0gcm90bCh4MTMgXiB4MDIsIDE2KTtcbiAgICB4MDggPSAoeDA4ICsgeDEzKSB8IDA7IHgwNyA9IHJvdGwoeDA3IF4geDA4LCAxMik7XG4gICAgeDAyID0gKHgwMiArIHgwNykgfCAwOyB4MTMgPSByb3RsKHgxMyBeIHgwMiwgOCk7XG4gICAgeDA4ID0gKHgwOCArIHgxMykgfCAwOyB4MDcgPSByb3RsKHgwNyBeIHgwOCwgNyk7XG5cbiAgICB4MDMgPSAoeDAzICsgeDA0KSB8IDA7IHgxNCA9IHJvdGwoeDE0IF4geDAzLCAxNilcbiAgICB4MDkgPSAoeDA5ICsgeDE0KSB8IDA7IHgwNCA9IHJvdGwoeDA0IF4geDA5LCAxMik7XG4gICAgeDAzID0gKHgwMyArIHgwNCkgfCAwOyB4MTQgPSByb3RsKHgxNCBeIHgwMywgOCk7XG4gICAgeDA5ID0gKHgwOSArIHgxNCkgfCAwOyB4MDQgPSByb3RsKHgwNCBeIHgwOSwgNyk7XG4gIH1cbiAgLy8gV3JpdGUgb3V0cHV0XG4gIGxldCBvaSA9IDA7XG4gIG91dFtvaSsrXSA9ICh5MDAgKyB4MDApIHwgMDsgb3V0W29pKytdID0gKHkwMSArIHgwMSkgfCAwO1xuICBvdXRbb2krK10gPSAoeTAyICsgeDAyKSB8IDA7IG91dFtvaSsrXSA9ICh5MDMgKyB4MDMpIHwgMDtcbiAgb3V0W29pKytdID0gKHkwNCArIHgwNCkgfCAwOyBvdXRbb2krK10gPSAoeTA1ICsgeDA1KSB8IDA7XG4gIG91dFtvaSsrXSA9ICh5MDYgKyB4MDYpIHwgMDsgb3V0W29pKytdID0gKHkwNyArIHgwNykgfCAwO1xuICBvdXRbb2krK10gPSAoeTA4ICsgeDA4KSB8IDA7IG91dFtvaSsrXSA9ICh5MDkgKyB4MDkpIHwgMDtcbiAgb3V0W29pKytdID0gKHkxMCArIHgxMCkgfCAwOyBvdXRbb2krK10gPSAoeTExICsgeDExKSB8IDA7XG4gIG91dFtvaSsrXSA9ICh5MTIgKyB4MTIpIHwgMDsgb3V0W29pKytdID0gKHkxMyArIHgxMykgfCAwO1xuICBvdXRbb2krK10gPSAoeTE0ICsgeDE0KSB8IDA7IG91dFtvaSsrXSA9ICh5MTUgKyB4MTUpIHwgMDtcbn1cbi8qKlxuICogaGNoYWNoYSBoZWxwZXIgbWV0aG9kLCB1c2VkIHByaW1hcmlseSBpbiB4Y2hhY2hhLCB0byBoYXNoXG4gKiBrZXkgYW5kIG5vbmNlIGludG8ga2V5JyBhbmQgbm9uY2UnLlxuICogU2FtZSBhcyBjaGFjaGFDb3JlLCBidXQgdGhlcmUgZG9lc24ndCBzZWVtIHRvIGJlIGEgd2F5IHRvIG1vdmUgdGhlIGJsb2NrXG4gKiBvdXQgd2l0aG91dCAyNSUgcGVyZm9ybWFuY2UgaGl0LlxuICovXG4vLyBwcmV0dGllci1pZ25vcmVcbmV4cG9ydCBmdW5jdGlvbiBoY2hhY2hhKFxuICBzOiBVaW50MzJBcnJheSwgazogVWludDMyQXJyYXksIGk6IFVpbnQzMkFycmF5LCBvMzI6IFVpbnQzMkFycmF5XG4pOiB2b2lkIHtcbiAgbGV0IHgwMCA9IHNbMF0sIHgwMSA9IHNbMV0sIHgwMiA9IHNbMl0sIHgwMyA9IHNbM10sXG4gICAgeDA0ID0ga1swXSwgeDA1ID0ga1sxXSwgeDA2ID0ga1syXSwgeDA3ID0ga1szXSxcbiAgICB4MDggPSBrWzRdLCB4MDkgPSBrWzVdLCB4MTAgPSBrWzZdLCB4MTEgPSBrWzddLFxuICAgIHgxMiA9IGlbMF0sIHgxMyA9IGlbMV0sIHgxNCA9IGlbMl0sIHgxNSA9IGlbM107XG4gIGZvciAobGV0IHIgPSAwOyByIDwgMjA7IHIgKz0gMikge1xuICAgIHgwMCA9ICh4MDAgKyB4MDQpIHwgMDsgeDEyID0gcm90bCh4MTIgXiB4MDAsIDE2KTtcbiAgICB4MDggPSAoeDA4ICsgeDEyKSB8IDA7IHgwNCA9IHJvdGwoeDA0IF4geDA4LCAxMik7XG4gICAgeDAwID0gKHgwMCArIHgwNCkgfCAwOyB4MTIgPSByb3RsKHgxMiBeIHgwMCwgOCk7XG4gICAgeDA4ID0gKHgwOCArIHgxMikgfCAwOyB4MDQgPSByb3RsKHgwNCBeIHgwOCwgNyk7XG5cbiAgICB4MDEgPSAoeDAxICsgeDA1KSB8IDA7IHgxMyA9IHJvdGwoeDEzIF4geDAxLCAxNik7XG4gICAgeDA5ID0gKHgwOSArIHgxMykgfCAwOyB4MDUgPSByb3RsKHgwNSBeIHgwOSwgMTIpO1xuICAgIHgwMSA9ICh4MDEgKyB4MDUpIHwgMDsgeDEzID0gcm90bCh4MTMgXiB4MDEsIDgpO1xuICAgIHgwOSA9ICh4MDkgKyB4MTMpIHwgMDsgeDA1ID0gcm90bCh4MDUgXiB4MDksIDcpO1xuXG4gICAgeDAyID0gKHgwMiArIHgwNikgfCAwOyB4MTQgPSByb3RsKHgxNCBeIHgwMiwgMTYpO1xuICAgIHgxMCA9ICh4MTAgKyB4MTQpIHwgMDsgeDA2ID0gcm90bCh4MDYgXiB4MTAsIDEyKTtcbiAgICB4MDIgPSAoeDAyICsgeDA2KSB8IDA7IHgxNCA9IHJvdGwoeDE0IF4geDAyLCA4KTtcbiAgICB4MTAgPSAoeDEwICsgeDE0KSB8IDA7IHgwNiA9IHJvdGwoeDA2IF4geDEwLCA3KTtcblxuICAgIHgwMyA9ICh4MDMgKyB4MDcpIHwgMDsgeDE1ID0gcm90bCh4MTUgXiB4MDMsIDE2KTtcbiAgICB4MTEgPSAoeDExICsgeDE1KSB8IDA7IHgwNyA9IHJvdGwoeDA3IF4geDExLCAxMik7XG4gICAgeDAzID0gKHgwMyArIHgwNykgfCAwOyB4MTUgPSByb3RsKHgxNSBeIHgwMywgOClcbiAgICB4MTEgPSAoeDExICsgeDE1KSB8IDA7IHgwNyA9IHJvdGwoeDA3IF4geDExLCA3KTtcblxuICAgIHgwMCA9ICh4MDAgKyB4MDUpIHwgMDsgeDE1ID0gcm90bCh4MTUgXiB4MDAsIDE2KTtcbiAgICB4MTAgPSAoeDEwICsgeDE1KSB8IDA7IHgwNSA9IHJvdGwoeDA1IF4geDEwLCAxMik7XG4gICAgeDAwID0gKHgwMCArIHgwNSkgfCAwOyB4MTUgPSByb3RsKHgxNSBeIHgwMCwgOCk7XG4gICAgeDEwID0gKHgxMCArIHgxNSkgfCAwOyB4MDUgPSByb3RsKHgwNSBeIHgxMCwgNyk7XG5cbiAgICB4MDEgPSAoeDAxICsgeDA2KSB8IDA7IHgxMiA9IHJvdGwoeDEyIF4geDAxLCAxNik7XG4gICAgeDExID0gKHgxMSArIHgxMikgfCAwOyB4MDYgPSByb3RsKHgwNiBeIHgxMSwgMTIpO1xuICAgIHgwMSA9ICh4MDEgKyB4MDYpIHwgMDsgeDEyID0gcm90bCh4MTIgXiB4MDEsIDgpO1xuICAgIHgxMSA9ICh4MTEgKyB4MTIpIHwgMDsgeDA2ID0gcm90bCh4MDYgXiB4MTEsIDcpO1xuXG4gICAgeDAyID0gKHgwMiArIHgwNykgfCAwOyB4MTMgPSByb3RsKHgxMyBeIHgwMiwgMTYpO1xuICAgIHgwOCA9ICh4MDggKyB4MTMpIHwgMDsgeDA3ID0gcm90bCh4MDcgXiB4MDgsIDEyKTtcbiAgICB4MDIgPSAoeDAyICsgeDA3KSB8IDA7IHgxMyA9IHJvdGwoeDEzIF4geDAyLCA4KTtcbiAgICB4MDggPSAoeDA4ICsgeDEzKSB8IDA7IHgwNyA9IHJvdGwoeDA3IF4geDA4LCA3KTtcblxuICAgIHgwMyA9ICh4MDMgKyB4MDQpIHwgMDsgeDE0ID0gcm90bCh4MTQgXiB4MDMsIDE2KVxuICAgIHgwOSA9ICh4MDkgKyB4MTQpIHwgMDsgeDA0ID0gcm90bCh4MDQgXiB4MDksIDEyKTtcbiAgICB4MDMgPSAoeDAzICsgeDA0KSB8IDA7IHgxNCA9IHJvdGwoeDE0IF4geDAzLCA4KTtcbiAgICB4MDkgPSAoeDA5ICsgeDE0KSB8IDA7IHgwNCA9IHJvdGwoeDA0IF4geDA5LCA3KTtcbiAgfVxuICBsZXQgb2kgPSAwO1xuICBvMzJbb2krK10gPSB4MDA7IG8zMltvaSsrXSA9IHgwMTtcbiAgbzMyW29pKytdID0geDAyOyBvMzJbb2krK10gPSB4MDM7XG4gIG8zMltvaSsrXSA9IHgxMjsgbzMyW29pKytdID0geDEzO1xuICBvMzJbb2krK10gPSB4MTQ7IG8zMltvaSsrXSA9IHgxNTtcbn1cbi8qKlxuICogT3JpZ2luYWwsIG5vbi1SRkMgY2hhY2hhMjAgZnJvbSBESkIuIDgtYnl0ZSBub25jZSwgOC1ieXRlIGNvdW50ZXIuXG4gKi9cbmV4cG9ydCBjb25zdCBjaGFjaGEyMG9yaWc6IFhvclN0cmVhbSA9IC8qIEBfX1BVUkVfXyAqLyBjcmVhdGVDaXBoZXIoY2hhY2hhQ29yZSwge1xuICBjb3VudGVyUmlnaHQ6IGZhbHNlLFxuICBjb3VudGVyTGVuZ3RoOiA4LFxuICBhbGxvd1Nob3J0S2V5czogdHJ1ZSxcbn0pO1xuLyoqXG4gKiBDaGFDaGEgc3RyZWFtIGNpcGhlci4gQ29uZm9ybXMgdG8gUkZDIDg0MzkgKElFVEYsIFRMUykuIDEyLWJ5dGUgbm9uY2UsIDQtYnl0ZSBjb3VudGVyLlxuICogV2l0aCAxMi1ieXRlIG5vbmNlLCBpdCdzIG5vdCBzYWZlIHRvIHVzZSBmaWxsIGl0IHdpdGggcmFuZG9tIChDU1BSTkcpLCBkdWUgdG8gY29sbGlzaW9uIGNoYW5jZS5cbiAqL1xuZXhwb3J0IGNvbnN0IGNoYWNoYTIwOiBYb3JTdHJlYW0gPSAvKiBAX19QVVJFX18gKi8gY3JlYXRlQ2lwaGVyKGNoYWNoYUNvcmUsIHtcbiAgY291bnRlclJpZ2h0OiBmYWxzZSxcbiAgY291bnRlckxlbmd0aDogNCxcbiAgYWxsb3dTaG9ydEtleXM6IGZhbHNlLFxufSk7XG5cbi8qKlxuICogWENoYUNoYSBlWHRlbmRlZC1ub25jZSBDaGFDaGEuIDI0LWJ5dGUgbm9uY2UuXG4gKiBXaXRoIDI0LWJ5dGUgbm9uY2UsIGl0J3Mgc2FmZSB0byB1c2UgZmlsbCBpdCB3aXRoIHJhbmRvbSAoQ1NQUk5HKS5cbiAqIGh0dHBzOi8vZGF0YXRyYWNrZXIuaWV0Zi5vcmcvZG9jL2h0bWwvZHJhZnQtaXJ0Zi1jZnJnLXhjaGFjaGFcbiAqL1xuZXhwb3J0IGNvbnN0IHhjaGFjaGEyMDogWG9yU3RyZWFtID0gLyogQF9fUFVSRV9fICovIGNyZWF0ZUNpcGhlcihjaGFjaGFDb3JlLCB7XG4gIGNvdW50ZXJSaWdodDogZmFsc2UsXG4gIGNvdW50ZXJMZW5ndGg6IDgsXG4gIGV4dGVuZE5vbmNlRm46IGhjaGFjaGEsXG4gIGFsbG93U2hvcnRLZXlzOiBmYWxzZSxcbn0pO1xuXG4vKipcbiAqIFJlZHVjZWQgOC1yb3VuZCBjaGFjaGEsIGRlc2NyaWJlZCBpbiBvcmlnaW5hbCBwYXBlci5cbiAqL1xuZXhwb3J0IGNvbnN0IGNoYWNoYTg6IFhvclN0cmVhbSA9IC8qIEBfX1BVUkVfXyAqLyBjcmVhdGVDaXBoZXIoY2hhY2hhQ29yZSwge1xuICBjb3VudGVyUmlnaHQ6IGZhbHNlLFxuICBjb3VudGVyTGVuZ3RoOiA0LFxuICByb3VuZHM6IDgsXG59KTtcblxuLyoqXG4gKiBSZWR1Y2VkIDEyLXJvdW5kIGNoYWNoYSwgZGVzY3JpYmVkIGluIG9yaWdpbmFsIHBhcGVyLlxuICovXG5leHBvcnQgY29uc3QgY2hhY2hhMTI6IFhvclN0cmVhbSA9IC8qIEBfX1BVUkVfXyAqLyBjcmVhdGVDaXBoZXIoY2hhY2hhQ29yZSwge1xuICBjb3VudGVyUmlnaHQ6IGZhbHNlLFxuICBjb3VudGVyTGVuZ3RoOiA0LFxuICByb3VuZHM6IDEyLFxufSk7XG5cbmNvbnN0IFpFUk9TMTYgPSAvKiBAX19QVVJFX18gKi8gbmV3IFVpbnQ4QXJyYXkoMTYpO1xuLy8gUGFkIHRvIGRpZ2VzdCBzaXplIHdpdGggemVyb3NcbmNvbnN0IHVwZGF0ZVBhZGRlZCA9IChoOiBSZXR1cm5UeXBlPHR5cGVvZiBwb2x5MTMwNS5jcmVhdGU+LCBtc2c6IFVpbnQ4QXJyYXkpID0+IHtcbiAgaC51cGRhdGUobXNnKTtcbiAgY29uc3QgbGVmdCA9IG1zZy5sZW5ndGggJSAxNjtcbiAgaWYgKGxlZnQpIGgudXBkYXRlKFpFUk9TMTYuc3ViYXJyYXkobGVmdCkpO1xufTtcblxuY29uc3QgWkVST1MzMiA9IC8qIEBfX1BVUkVfXyAqLyBuZXcgVWludDhBcnJheSgzMik7XG5mdW5jdGlvbiBjb21wdXRlVGFnKFxuICBmbjogWG9yU3RyZWFtLFxuICBrZXk6IFVpbnQ4QXJyYXksXG4gIG5vbmNlOiBVaW50OEFycmF5LFxuICBkYXRhOiBVaW50OEFycmF5LFxuICBBQUQ/OiBVaW50OEFycmF5XG4pOiBVaW50OEFycmF5IHtcbiAgY29uc3QgYXV0aEtleSA9IGZuKGtleSwgbm9uY2UsIFpFUk9TMzIpO1xuICBjb25zdCBoID0gcG9seTEzMDUuY3JlYXRlKGF1dGhLZXkpO1xuICBpZiAoQUFEKSB1cGRhdGVQYWRkZWQoaCwgQUFEKTtcbiAgdXBkYXRlUGFkZGVkKGgsIGRhdGEpO1xuICBjb25zdCBudW0gPSBuZXcgVWludDhBcnJheSgxNik7XG4gIGNvbnN0IHZpZXcgPSBjcmVhdGVWaWV3KG51bSk7XG4gIHNldEJpZ1VpbnQ2NCh2aWV3LCAwLCBCaWdJbnQoQUFEID8gQUFELmxlbmd0aCA6IDApLCB0cnVlKTtcbiAgc2V0QmlnVWludDY0KHZpZXcsIDgsIEJpZ0ludChkYXRhLmxlbmd0aCksIHRydWUpO1xuICBoLnVwZGF0ZShudW0pO1xuICBjb25zdCByZXMgPSBoLmRpZ2VzdCgpO1xuICBjbGVhbihhdXRoS2V5LCBudW0pO1xuICByZXR1cm4gcmVzO1xufVxuXG4vKipcbiAqIEFFQUQgYWxnb3JpdGhtIGZyb20gUkZDIDg0MzkuXG4gKiBTYWxzYTIwIGFuZCBjaGFjaGEgKFJGQyA4NDM5KSB1c2UgcG9seTEzMDUgZGlmZmVyZW50bHkuXG4gKiBXZSBjb3VsZCBoYXZlIGNvbXBvc2VkIHRoZW0gc2ltaWxhciB0bzpcbiAqIGh0dHBzOi8vZ2l0aHViLmNvbS9wYXVsbWlsbHIvc2N1cmUtYmFzZS9ibG9iL2IyNjZjNzNkZGU5NzdiMWRkN2VmNDBlZjdhMjNjYzE1YWFiNTI2YjMvaW5kZXgudHMjTDI1MFxuICogQnV0IGl0J3MgaGFyZCBiZWNhdXNlIG9mIGF1dGhLZXk6XG4gKiBJbiBzYWxzYTIwLCBhdXRoS2V5IGNoYW5nZXMgcG9zaXRpb24gaW4gc2Fsc2Egc3RyZWFtLlxuICogSW4gY2hhY2hhLCBhdXRoS2V5IGNhbid0IGJlIGNvbXB1dGVkIGluc2lkZSBjb21wdXRlVGFnLCBpdCBtb2RpZmllcyB0aGUgY291bnRlci5cbiAqL1xuZXhwb3J0IGNvbnN0IF9wb2x5MTMwNV9hZWFkID1cbiAgKHhvclN0cmVhbTogWG9yU3RyZWFtKSA9PlxuICAoa2V5OiBVaW50OEFycmF5LCBub25jZTogVWludDhBcnJheSwgQUFEPzogVWludDhBcnJheSk6IENpcGhlcldpdGhPdXRwdXQgPT4ge1xuICAgIGNvbnN0IHRhZ0xlbmd0aCA9IDE2O1xuICAgIHJldHVybiB7XG4gICAgICBlbmNyeXB0KHBsYWludGV4dDogVWludDhBcnJheSwgb3V0cHV0PzogVWludDhBcnJheSkge1xuICAgICAgICBjb25zdCBwbGVuZ3RoID0gcGxhaW50ZXh0Lmxlbmd0aDtcbiAgICAgICAgb3V0cHV0ID0gZ2V0T3V0cHV0KHBsZW5ndGggKyB0YWdMZW5ndGgsIG91dHB1dCwgZmFsc2UpO1xuICAgICAgICBvdXRwdXQuc2V0KHBsYWludGV4dCk7XG4gICAgICAgIGNvbnN0IG9QbGFpbiA9IG91dHB1dC5zdWJhcnJheSgwLCAtdGFnTGVuZ3RoKTtcbiAgICAgICAgeG9yU3RyZWFtKGtleSwgbm9uY2UsIG9QbGFpbiwgb1BsYWluLCAxKTtcbiAgICAgICAgY29uc3QgdGFnID0gY29tcHV0ZVRhZyh4b3JTdHJlYW0sIGtleSwgbm9uY2UsIG9QbGFpbiwgQUFEKTtcbiAgICAgICAgb3V0cHV0LnNldCh0YWcsIHBsZW5ndGgpOyAvLyBhcHBlbmQgdGFnXG4gICAgICAgIGNsZWFuKHRhZyk7XG4gICAgICAgIHJldHVybiBvdXRwdXQ7XG4gICAgICB9LFxuICAgICAgZGVjcnlwdChjaXBoZXJ0ZXh0OiBVaW50OEFycmF5LCBvdXRwdXQ/OiBVaW50OEFycmF5KSB7XG4gICAgICAgIG91dHB1dCA9IGdldE91dHB1dChjaXBoZXJ0ZXh0Lmxlbmd0aCAtIHRhZ0xlbmd0aCwgb3V0cHV0LCBmYWxzZSk7XG4gICAgICAgIGNvbnN0IGRhdGEgPSBjaXBoZXJ0ZXh0LnN1YmFycmF5KDAsIC10YWdMZW5ndGgpO1xuICAgICAgICBjb25zdCBwYXNzZWRUYWcgPSBjaXBoZXJ0ZXh0LnN1YmFycmF5KC10YWdMZW5ndGgpO1xuICAgICAgICBjb25zdCB0YWcgPSBjb21wdXRlVGFnKHhvclN0cmVhbSwga2V5LCBub25jZSwgZGF0YSwgQUFEKTtcbiAgICAgICAgaWYgKCFlcXVhbEJ5dGVzKHBhc3NlZFRhZywgdGFnKSkgdGhyb3cgbmV3IEVycm9yKCdpbnZhbGlkIHRhZycpO1xuICAgICAgICBvdXRwdXQuc2V0KGNpcGhlcnRleHQuc3ViYXJyYXkoMCwgLXRhZ0xlbmd0aCkpO1xuICAgICAgICB4b3JTdHJlYW0oa2V5LCBub25jZSwgb3V0cHV0LCBvdXRwdXQsIDEpOyAvLyBzdGFydCBzdHJlYW0gd2l0aCBpPTFcbiAgICAgICAgY2xlYW4odGFnKTtcbiAgICAgICAgcmV0dXJuIG91dHB1dDtcbiAgICAgIH0sXG4gICAgfTtcbiAgfTtcblxuLyoqXG4gKiBDaGFDaGEyMC1Qb2x5MTMwNSBmcm9tIFJGQyA4NDM5LlxuICpcbiAqIFVuc2FmZSB0byB1c2UgcmFuZG9tIG5vbmNlcyB1bmRlciB0aGUgc2FtZSBrZXksIGR1ZSB0byBjb2xsaXNpb24gY2hhbmNlLlxuICogUHJlZmVyIFhDaGFDaGEgaW5zdGVhZC5cbiAqL1xuZXhwb3J0IGNvbnN0IGNoYWNoYTIwcG9seTEzMDU6IEFSWENpcGhlciA9IC8qIEBfX1BVUkVfXyAqLyB3cmFwQ2lwaGVyKFxuICB7IGJsb2NrU2l6ZTogNjQsIG5vbmNlTGVuZ3RoOiAxMiwgdGFnTGVuZ3RoOiAxNiB9LFxuICBfcG9seTEzMDVfYWVhZChjaGFjaGEyMClcbik7XG4vKipcbiAqIFhDaGFDaGEyMC1Qb2x5MTMwNSBleHRlbmRlZC1ub25jZSBjaGFjaGEuXG4gKlxuICogQ2FuIGJlIHNhZmVseSB1c2VkIHdpdGggcmFuZG9tIG5vbmNlcyAoQ1NQUk5HKS5cbiAqIFNlZSBbSVJURiBkcmFmdF0oaHR0cHM6Ly9kYXRhdHJhY2tlci5pZXRmLm9yZy9kb2MvaHRtbC9kcmFmdC1pcnRmLWNmcmcteGNoYWNoYSkuXG4gKi9cbmV4cG9ydCBjb25zdCB4Y2hhY2hhMjBwb2x5MTMwNTogQVJYQ2lwaGVyID0gLyogQF9fUFVSRV9fICovIHdyYXBDaXBoZXIoXG4gIHsgYmxvY2tTaXplOiA2NCwgbm9uY2VMZW5ndGg6IDI0LCB0YWdMZW5ndGg6IDE2IH0sXG4gIF9wb2x5MTMwNV9hZWFkKHhjaGFjaGEyMClcbik7XG4iLCAiaW1wb3J0IHsgYmFzZTY0bm9wYWQgfSBmcm9tIFwiQHNjdXJlL2Jhc2VcIjtcbmV4cG9ydCBjbGFzcyBTdGFuemEge1xuICAgIGNvbnN0cnVjdG9yKGFyZ3MsIGJvZHkpIHtcbiAgICAgICAgdGhpcy5hcmdzID0gYXJncztcbiAgICAgICAgdGhpcy5ib2R5ID0gYm9keTtcbiAgICB9XG59XG5jbGFzcyBCeXRlUmVhZGVyIHtcbiAgICBjb25zdHJ1Y3RvcihhcnIpIHtcbiAgICAgICAgdGhpcy5hcnIgPSBhcnI7XG4gICAgfVxuICAgIHRvU3RyaW5nKGJ5dGVzKSB7XG4gICAgICAgIGJ5dGVzLmZvckVhY2goKGIpID0+IHtcbiAgICAgICAgICAgIGlmIChiIDwgMzIgfHwgYiA+IDEzNikge1xuICAgICAgICAgICAgICAgIHRocm93IEVycm9yKFwiaW52YWxpZCBub24tQVNDSUkgYnl0ZSBpbiBoZWFkZXJcIik7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgICAgICByZXR1cm4gbmV3IFRleHREZWNvZGVyKCkuZGVjb2RlKGJ5dGVzKTtcbiAgICB9XG4gICAgcmVhZFN0cmluZyhuKSB7XG4gICAgICAgIGNvbnN0IG91dCA9IHRoaXMuYXJyLnN1YmFycmF5KDAsIG4pO1xuICAgICAgICB0aGlzLmFyciA9IHRoaXMuYXJyLnN1YmFycmF5KG4pO1xuICAgICAgICByZXR1cm4gdGhpcy50b1N0cmluZyhvdXQpO1xuICAgIH1cbiAgICByZWFkTGluZSgpIHtcbiAgICAgICAgY29uc3QgaSA9IHRoaXMuYXJyLmluZGV4T2YoXCJcXG5cIi5jaGFyQ29kZUF0KDApKTtcbiAgICAgICAgaWYgKGkgPj0gMCkge1xuICAgICAgICAgICAgY29uc3Qgb3V0ID0gdGhpcy5hcnIuc3ViYXJyYXkoMCwgaSk7XG4gICAgICAgICAgICB0aGlzLmFyciA9IHRoaXMuYXJyLnN1YmFycmF5KGkgKyAxKTtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLnRvU3RyaW5nKG91dCk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIG51bGw7XG4gICAgfVxuICAgIHJlc3QoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLmFycjtcbiAgICB9XG59XG5mdW5jdGlvbiBwYXJzZU5leHRTdGFuemEoaGVhZGVyKSB7XG4gICAgY29uc3QgaGRyID0gbmV3IEJ5dGVSZWFkZXIoaGVhZGVyKTtcbiAgICBpZiAoaGRyLnJlYWRTdHJpbmcoMykgIT09IFwiLT4gXCIpIHtcbiAgICAgICAgdGhyb3cgRXJyb3IoXCJpbnZhbGlkIHN0YW56YVwiKTtcbiAgICB9XG4gICAgY29uc3QgYXJnc0xpbmUgPSBoZHIucmVhZExpbmUoKTtcbiAgICBpZiAoYXJnc0xpbmUgPT09IG51bGwpIHtcbiAgICAgICAgdGhyb3cgRXJyb3IoXCJpbnZhbGlkIHN0YW56YVwiKTtcbiAgICB9XG4gICAgY29uc3QgYXJncyA9IGFyZ3NMaW5lLnNwbGl0KFwiIFwiKTtcbiAgICBpZiAoYXJncy5sZW5ndGggPCAxKSB7XG4gICAgICAgIHRocm93IEVycm9yKFwiaW52YWxpZCBzdGFuemFcIik7XG4gICAgfVxuICAgIGZvciAoY29uc3QgYXJnIG9mIGFyZ3MpIHtcbiAgICAgICAgaWYgKGFyZy5sZW5ndGggPT09IDApIHtcbiAgICAgICAgICAgIHRocm93IEVycm9yKFwiaW52YWxpZCBzdGFuemFcIik7XG4gICAgICAgIH1cbiAgICB9XG4gICAgY29uc3QgYm9keUxpbmVzID0gW107XG4gICAgZm9yICg7Oykge1xuICAgICAgICBjb25zdCBuZXh0TGluZSA9IGhkci5yZWFkTGluZSgpO1xuICAgICAgICBpZiAobmV4dExpbmUgPT09IG51bGwpIHtcbiAgICAgICAgICAgIHRocm93IEVycm9yKFwiaW52YWxpZCBzdGFuemFcIik7XG4gICAgICAgIH1cbiAgICAgICAgY29uc3QgbGluZSA9IGJhc2U2NG5vcGFkLmRlY29kZShuZXh0TGluZSk7XG4gICAgICAgIGlmIChsaW5lLmxlbmd0aCA+IDQ4KSB7XG4gICAgICAgICAgICB0aHJvdyBFcnJvcihcImludmFsaWQgc3RhbnphXCIpO1xuICAgICAgICB9XG4gICAgICAgIGJvZHlMaW5lcy5wdXNoKGxpbmUpO1xuICAgICAgICBpZiAobGluZS5sZW5ndGggPCA0OCkge1xuICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgIH1cbiAgICB9XG4gICAgY29uc3QgYm9keSA9IGZsYXR0ZW5BcnJheShib2R5TGluZXMpO1xuICAgIHJldHVybiBbbmV3IFN0YW56YShhcmdzLCBib2R5KSwgaGRyLnJlc3QoKV07XG59XG5mdW5jdGlvbiBmbGF0dGVuQXJyYXkoYXJyKSB7XG4gICAgY29uc3QgbGVuID0gYXJyLnJlZHVjZSgoKHN1bSwgbGluZSkgPT4gc3VtICsgbGluZS5sZW5ndGgpLCAwKTtcbiAgICBjb25zdCBvdXQgPSBuZXcgVWludDhBcnJheShsZW4pO1xuICAgIGxldCBuID0gMDtcbiAgICBmb3IgKGNvbnN0IGEgb2YgYXJyKSB7XG4gICAgICAgIG91dC5zZXQoYSwgbik7XG4gICAgICAgIG4gKz0gYS5sZW5ndGg7XG4gICAgfVxuICAgIHJldHVybiBvdXQ7XG59XG5leHBvcnQgZnVuY3Rpb24gcGFyc2VIZWFkZXIoaGVhZGVyKSB7XG4gICAgY29uc3QgaGRyID0gbmV3IEJ5dGVSZWFkZXIoaGVhZGVyKTtcbiAgICBjb25zdCB2ZXJzaW9uTGluZSA9IGhkci5yZWFkTGluZSgpO1xuICAgIGlmICh2ZXJzaW9uTGluZSAhPT0gXCJhZ2UtZW5jcnlwdGlvbi5vcmcvdjFcIikge1xuICAgICAgICB0aHJvdyBFcnJvcihcImludmFsaWQgdmVyc2lvbiBcIiArICh2ZXJzaW9uTGluZSAhPT0gbnVsbCAmJiB2ZXJzaW9uTGluZSAhPT0gdm9pZCAwID8gdmVyc2lvbkxpbmUgOiBcImxpbmVcIikpO1xuICAgIH1cbiAgICBsZXQgcmVzdCA9IGhkci5yZXN0KCk7XG4gICAgY29uc3QgcmVjaXBpZW50cyA9IFtdO1xuICAgIGZvciAoOzspIHtcbiAgICAgICAgbGV0IHM7XG4gICAgICAgIFtzLCByZXN0XSA9IHBhcnNlTmV4dFN0YW56YShyZXN0KTtcbiAgICAgICAgcmVjaXBpZW50cy5wdXNoKHMpO1xuICAgICAgICBjb25zdCBoZHIgPSBuZXcgQnl0ZVJlYWRlcihyZXN0KTtcbiAgICAgICAgaWYgKGhkci5yZWFkU3RyaW5nKDQpID09PSBcIi0tLSBcIikge1xuICAgICAgICAgICAgY29uc3QgaGVhZGVyTm9NQUMgPSBoZWFkZXIuc3ViYXJyYXkoMCwgaGVhZGVyLmxlbmd0aCAtIGhkci5yZXN0KCkubGVuZ3RoIC0gMSk7XG4gICAgICAgICAgICBjb25zdCBtYWNMaW5lID0gaGRyLnJlYWRMaW5lKCk7XG4gICAgICAgICAgICBpZiAobWFjTGluZSA9PT0gbnVsbCkge1xuICAgICAgICAgICAgICAgIHRocm93IEVycm9yKFwiaW52YWxpZCBoZWFkZXJcIik7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBjb25zdCBtYWMgPSBiYXNlNjRub3BhZC5kZWNvZGUobWFjTGluZSk7XG4gICAgICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgICAgIHJlY2lwaWVudHM6IHJlY2lwaWVudHMsXG4gICAgICAgICAgICAgICAgaGVhZGVyTm9NQUM6IGhlYWRlck5vTUFDLFxuICAgICAgICAgICAgICAgIE1BQzogbWFjLFxuICAgICAgICAgICAgICAgIHJlc3Q6IGhkci5yZXN0KCksXG4gICAgICAgICAgICB9O1xuICAgICAgICB9XG4gICAgfVxufVxuZXhwb3J0IGZ1bmN0aW9uIGVuY29kZUhlYWRlck5vTUFDKHJlY2lwaWVudHMpIHtcbiAgICBjb25zdCBsaW5lcyA9IFtdO1xuICAgIGxpbmVzLnB1c2goXCJhZ2UtZW5jcnlwdGlvbi5vcmcvdjFcXG5cIik7XG4gICAgZm9yIChjb25zdCBzIG9mIHJlY2lwaWVudHMpIHtcbiAgICAgICAgbGluZXMucHVzaChcIi0+IFwiICsgcy5hcmdzLmpvaW4oXCIgXCIpICsgXCJcXG5cIik7XG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgcy5ib2R5Lmxlbmd0aDsgaSArPSA0OCkge1xuICAgICAgICAgICAgbGV0IGVuZCA9IGkgKyA0ODtcbiAgICAgICAgICAgIGlmIChlbmQgPiBzLmJvZHkubGVuZ3RoKVxuICAgICAgICAgICAgICAgIGVuZCA9IHMuYm9keS5sZW5ndGg7XG4gICAgICAgICAgICBsaW5lcy5wdXNoKGJhc2U2NG5vcGFkLmVuY29kZShzLmJvZHkuc3ViYXJyYXkoaSwgZW5kKSkgKyBcIlxcblwiKTtcbiAgICAgICAgfVxuICAgICAgICBpZiAocy5ib2R5Lmxlbmd0aCAlIDQ4ID09PSAwKVxuICAgICAgICAgICAgbGluZXMucHVzaChcIlxcblwiKTtcbiAgICB9XG4gICAgbGluZXMucHVzaChcIi0tLVwiKTtcbiAgICByZXR1cm4gbmV3IFRleHRFbmNvZGVyKCkuZW5jb2RlKGxpbmVzLmpvaW4oXCJcIikpO1xufVxuZXhwb3J0IGZ1bmN0aW9uIGVuY29kZUhlYWRlcihyZWNpcGllbnRzLCBNQUMpIHtcbiAgICByZXR1cm4gZmxhdHRlbkFycmF5KFtcbiAgICAgICAgZW5jb2RlSGVhZGVyTm9NQUMocmVjaXBpZW50cyksXG4gICAgICAgIG5ldyBUZXh0RW5jb2RlcigpLmVuY29kZShcIiBcIiArIGJhc2U2NG5vcGFkLmVuY29kZShNQUMpICsgXCJcXG5cIilcbiAgICBdKTtcbn1cbiIsICJ2YXIgX19hd2FpdGVyID0gKHRoaXMgJiYgdGhpcy5fX2F3YWl0ZXIpIHx8IGZ1bmN0aW9uICh0aGlzQXJnLCBfYXJndW1lbnRzLCBQLCBnZW5lcmF0b3IpIHtcbiAgICBmdW5jdGlvbiBhZG9wdCh2YWx1ZSkgeyByZXR1cm4gdmFsdWUgaW5zdGFuY2VvZiBQID8gdmFsdWUgOiBuZXcgUChmdW5jdGlvbiAocmVzb2x2ZSkgeyByZXNvbHZlKHZhbHVlKTsgfSk7IH1cbiAgICByZXR1cm4gbmV3IChQIHx8IChQID0gUHJvbWlzZSkpKGZ1bmN0aW9uIChyZXNvbHZlLCByZWplY3QpIHtcbiAgICAgICAgZnVuY3Rpb24gZnVsZmlsbGVkKHZhbHVlKSB7IHRyeSB7IHN0ZXAoZ2VuZXJhdG9yLm5leHQodmFsdWUpKTsgfSBjYXRjaCAoZSkgeyByZWplY3QoZSk7IH0gfVxuICAgICAgICBmdW5jdGlvbiByZWplY3RlZCh2YWx1ZSkgeyB0cnkgeyBzdGVwKGdlbmVyYXRvcltcInRocm93XCJdKHZhbHVlKSk7IH0gY2F0Y2ggKGUpIHsgcmVqZWN0KGUpOyB9IH1cbiAgICAgICAgZnVuY3Rpb24gc3RlcChyZXN1bHQpIHsgcmVzdWx0LmRvbmUgPyByZXNvbHZlKHJlc3VsdC52YWx1ZSkgOiBhZG9wdChyZXN1bHQudmFsdWUpLnRoZW4oZnVsZmlsbGVkLCByZWplY3RlZCk7IH1cbiAgICAgICAgc3RlcCgoZ2VuZXJhdG9yID0gZ2VuZXJhdG9yLmFwcGx5KHRoaXNBcmcsIF9hcmd1bWVudHMgfHwgW10pKS5uZXh0KCkpO1xuICAgIH0pO1xufTtcbmltcG9ydCB7IGhrZGYgfSBmcm9tIFwiQG5vYmxlL2hhc2hlcy9oa2RmXCI7XG5pbXBvcnQgeyBzaGEyNTYgfSBmcm9tIFwiQG5vYmxlL2hhc2hlcy9zaGEyNTZcIjtcbmltcG9ydCB7IHNjcnlwdCB9IGZyb20gXCJAbm9ibGUvaGFzaGVzL3NjcnlwdFwiO1xuaW1wb3J0IHsgY2hhY2hhMjBwb2x5MTMwNSB9IGZyb20gXCJAbm9ibGUvY2lwaGVycy9jaGFjaGFcIjtcbmltcG9ydCB7IHJhbmRvbUJ5dGVzIH0gZnJvbSBcIkBub2JsZS9oYXNoZXMvdXRpbHNcIjtcbmltcG9ydCB7IGJhc2U2NG5vcGFkIH0gZnJvbSBcIkBzY3VyZS9iYXNlXCI7XG5pbXBvcnQgKiBhcyB4MjU1MTkgZnJvbSBcIi4veDI1NTE5LmpzXCI7XG5pbXBvcnQgeyBTdGFuemEgfSBmcm9tIFwiLi9mb3JtYXQuanNcIjtcbmV4cG9ydCBmdW5jdGlvbiB4MjU1MTlXcmFwKGZpbGVLZXksIHJlY2lwaWVudCkge1xuICAgIHJldHVybiBfX2F3YWl0ZXIodGhpcywgdm9pZCAwLCB2b2lkIDAsIGZ1bmN0aW9uKiAoKSB7XG4gICAgICAgIGNvbnN0IGVwaGVtZXJhbCA9IHJhbmRvbUJ5dGVzKDMyKTtcbiAgICAgICAgY29uc3Qgc2hhcmUgPSB5aWVsZCB4MjU1MTkuc2NhbGFyTXVsdEJhc2UoZXBoZW1lcmFsKTtcbiAgICAgICAgY29uc3Qgc2VjcmV0ID0geWllbGQgeDI1NTE5LnNjYWxhck11bHQoZXBoZW1lcmFsLCByZWNpcGllbnQpO1xuICAgICAgICBjb25zdCBzYWx0ID0gbmV3IFVpbnQ4QXJyYXkoc2hhcmUubGVuZ3RoICsgcmVjaXBpZW50Lmxlbmd0aCk7XG4gICAgICAgIHNhbHQuc2V0KHNoYXJlKTtcbiAgICAgICAgc2FsdC5zZXQocmVjaXBpZW50LCBzaGFyZS5sZW5ndGgpO1xuICAgICAgICBjb25zdCBrZXkgPSBoa2RmKHNoYTI1Niwgc2VjcmV0LCBzYWx0LCBcImFnZS1lbmNyeXB0aW9uLm9yZy92MS9YMjU1MTlcIiwgMzIpO1xuICAgICAgICByZXR1cm4gbmV3IFN0YW56YShbXCJYMjU1MTlcIiwgYmFzZTY0bm9wYWQuZW5jb2RlKHNoYXJlKV0sIGVuY3J5cHRGaWxlS2V5KGZpbGVLZXksIGtleSkpO1xuICAgIH0pO1xufVxuZXhwb3J0IGZ1bmN0aW9uIHgyNTUxOVVud3JhcChzLCBpKSB7XG4gICAgcmV0dXJuIF9fYXdhaXRlcih0aGlzLCB2b2lkIDAsIHZvaWQgMCwgZnVuY3Rpb24qICgpIHtcbiAgICAgICAgaWYgKHMuYXJncy5sZW5ndGggPCAxIHx8IHMuYXJnc1swXSAhPT0gXCJYMjU1MTlcIikge1xuICAgICAgICAgICAgcmV0dXJuIG51bGw7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHMuYXJncy5sZW5ndGggIT09IDIpIHtcbiAgICAgICAgICAgIHRocm93IEVycm9yKFwiaW52YWxpZCBYMjU1MTkgc3RhbnphXCIpO1xuICAgICAgICB9XG4gICAgICAgIGNvbnN0IHNoYXJlID0gYmFzZTY0bm9wYWQuZGVjb2RlKHMuYXJnc1sxXSk7XG4gICAgICAgIGlmIChzaGFyZS5sZW5ndGggIT09IDMyKSB7XG4gICAgICAgICAgICB0aHJvdyBFcnJvcihcImludmFsaWQgWDI1NTE5IHN0YW56YVwiKTtcbiAgICAgICAgfVxuICAgICAgICBjb25zdCBzZWNyZXQgPSB5aWVsZCB4MjU1MTkuc2NhbGFyTXVsdChpLmlkZW50aXR5LCBzaGFyZSk7XG4gICAgICAgIGNvbnN0IHJlY2lwaWVudCA9IHlpZWxkIGkucmVjaXBpZW50O1xuICAgICAgICBjb25zdCBzYWx0ID0gbmV3IFVpbnQ4QXJyYXkoc2hhcmUubGVuZ3RoICsgcmVjaXBpZW50Lmxlbmd0aCk7XG4gICAgICAgIHNhbHQuc2V0KHNoYXJlKTtcbiAgICAgICAgc2FsdC5zZXQocmVjaXBpZW50LCBzaGFyZS5sZW5ndGgpO1xuICAgICAgICBjb25zdCBrZXkgPSBoa2RmKHNoYTI1Niwgc2VjcmV0LCBzYWx0LCBcImFnZS1lbmNyeXB0aW9uLm9yZy92MS9YMjU1MTlcIiwgMzIpO1xuICAgICAgICByZXR1cm4gZGVjcnlwdEZpbGVLZXkocy5ib2R5LCBrZXkpO1xuICAgIH0pO1xufVxuZXhwb3J0IGZ1bmN0aW9uIHNjcnlwdFdyYXAoZmlsZUtleSwgcGFzc3BocmFzZSwgbG9nTikge1xuICAgIGNvbnN0IHNhbHQgPSByYW5kb21CeXRlcygxNik7XG4gICAgY29uc3QgbGFiZWwgPSBcImFnZS1lbmNyeXB0aW9uLm9yZy92MS9zY3J5cHRcIjtcbiAgICBjb25zdCBsYWJlbEFuZFNhbHQgPSBuZXcgVWludDhBcnJheShsYWJlbC5sZW5ndGggKyAxNik7XG4gICAgbGFiZWxBbmRTYWx0LnNldChuZXcgVGV4dEVuY29kZXIoKS5lbmNvZGUobGFiZWwpKTtcbiAgICBsYWJlbEFuZFNhbHQuc2V0KHNhbHQsIGxhYmVsLmxlbmd0aCk7XG4gICAgY29uc3Qga2V5ID0gc2NyeXB0KHBhc3NwaHJhc2UsIGxhYmVsQW5kU2FsdCwgeyBOOiBNYXRoLnBvdygyLCBsb2dOKSwgcjogOCwgcDogMSwgZGtMZW46IDMyIH0pO1xuICAgIHJldHVybiBuZXcgU3RhbnphKFtcInNjcnlwdFwiLCBiYXNlNjRub3BhZC5lbmNvZGUoc2FsdCksIGxvZ04udG9TdHJpbmcoKV0sIGVuY3J5cHRGaWxlS2V5KGZpbGVLZXksIGtleSkpO1xufVxuZXhwb3J0IGZ1bmN0aW9uIHNjcnlwdFVud3JhcChzLCBwYXNzcGhyYXNlKSB7XG4gICAgaWYgKHMuYXJncy5sZW5ndGggPCAxIHx8IHMuYXJnc1swXSAhPT0gXCJzY3J5cHRcIikge1xuICAgICAgICByZXR1cm4gbnVsbDtcbiAgICB9XG4gICAgaWYgKHMuYXJncy5sZW5ndGggIT09IDMpIHtcbiAgICAgICAgdGhyb3cgRXJyb3IoXCJpbnZhbGlkIHNjcnlwdCBzdGFuemFcIik7XG4gICAgfVxuICAgIGlmICghL15bMS05XVswLTldKiQvLnRlc3Qocy5hcmdzWzJdKSkge1xuICAgICAgICB0aHJvdyBFcnJvcihcImludmFsaWQgc2NyeXB0IHN0YW56YVwiKTtcbiAgICB9XG4gICAgY29uc3Qgc2FsdCA9IGJhc2U2NG5vcGFkLmRlY29kZShzLmFyZ3NbMV0pO1xuICAgIGlmIChzYWx0Lmxlbmd0aCAhPT0gMTYpIHtcbiAgICAgICAgdGhyb3cgRXJyb3IoXCJpbnZhbGlkIHNjcnlwdCBzdGFuemFcIik7XG4gICAgfVxuICAgIGNvbnN0IGxvZ04gPSBOdW1iZXIocy5hcmdzWzJdKTtcbiAgICBpZiAobG9nTiA+IDIwKSB7XG4gICAgICAgIHRocm93IEVycm9yKFwic2NyeXB0IHdvcmsgZmFjdG9yIGlzIHRvbyBoaWdoXCIpO1xuICAgIH1cbiAgICBjb25zdCBsYWJlbCA9IFwiYWdlLWVuY3J5cHRpb24ub3JnL3YxL3NjcnlwdFwiO1xuICAgIGNvbnN0IGxhYmVsQW5kU2FsdCA9IG5ldyBVaW50OEFycmF5KGxhYmVsLmxlbmd0aCArIDE2KTtcbiAgICBsYWJlbEFuZFNhbHQuc2V0KG5ldyBUZXh0RW5jb2RlcigpLmVuY29kZShsYWJlbCkpO1xuICAgIGxhYmVsQW5kU2FsdC5zZXQoc2FsdCwgbGFiZWwubGVuZ3RoKTtcbiAgICBjb25zdCBrZXkgPSBzY3J5cHQocGFzc3BocmFzZSwgbGFiZWxBbmRTYWx0LCB7IE46IE1hdGgucG93KDIsIGxvZ04pLCByOiA4LCBwOiAxLCBka0xlbjogMzIgfSk7XG4gICAgcmV0dXJuIGRlY3J5cHRGaWxlS2V5KHMuYm9keSwga2V5KTtcbn1cbmZ1bmN0aW9uIGVuY3J5cHRGaWxlS2V5KGZpbGVLZXksIGtleSkge1xuICAgIGNvbnN0IG5vbmNlID0gbmV3IFVpbnQ4QXJyYXkoMTIpO1xuICAgIHJldHVybiBjaGFjaGEyMHBvbHkxMzA1KGtleSwgbm9uY2UpLmVuY3J5cHQoZmlsZUtleSk7XG59XG5mdW5jdGlvbiBkZWNyeXB0RmlsZUtleShib2R5LCBrZXkpIHtcbiAgICBpZiAoYm9keS5sZW5ndGggIT09IDMyKSB7XG4gICAgICAgIHRocm93IEVycm9yKFwiaW52YWxpZCBzdGFuemFcIik7XG4gICAgfVxuICAgIGNvbnN0IG5vbmNlID0gbmV3IFVpbnQ4QXJyYXkoMTIpO1xuICAgIHRyeSB7XG4gICAgICAgIHJldHVybiBjaGFjaGEyMHBvbHkxMzA1KGtleSwgbm9uY2UpLmRlY3J5cHQoYm9keSk7XG4gICAgfVxuICAgIGNhdGNoIChfYSkge1xuICAgICAgICByZXR1cm4gbnVsbDtcbiAgICB9XG59XG4iLCAiaW1wb3J0IHsgY2hhY2hhMjBwb2x5MTMwNSB9IGZyb20gXCJAbm9ibGUvY2lwaGVycy9jaGFjaGFcIjtcbmNvbnN0IGNoYWNoYTIwcG9seTEzMDVPdmVyaGVhZCA9IDE2O1xuY29uc3QgY2h1bmtTaXplID0gNjQgKiAxMDI0O1xuY29uc3QgY2h1bmtTaXplV2l0aE92ZXJoZWFkID0gY2h1bmtTaXplICsgY2hhY2hhMjBwb2x5MTMwNU92ZXJoZWFkO1xuZXhwb3J0IGZ1bmN0aW9uIGRlY3J5cHRTVFJFQU0oa2V5LCBjaXBoZXJ0ZXh0KSB7XG4gICAgY29uc3Qgc3RyZWFtTm9uY2UgPSBuZXcgVWludDhBcnJheSgxMik7XG4gICAgY29uc3QgaW5jTm9uY2UgPSAoKSA9PiB7XG4gICAgICAgIGZvciAobGV0IGkgPSBzdHJlYW1Ob25jZS5sZW5ndGggLSAyOyBpID49IDA7IGktLSkge1xuICAgICAgICAgICAgc3RyZWFtTm9uY2VbaV0rKztcbiAgICAgICAgICAgIGlmIChzdHJlYW1Ob25jZVtpXSAhPT0gMClcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgfVxuICAgIH07XG4gICAgY29uc3QgY2h1bmtDb3VudCA9IE1hdGguY2VpbChjaXBoZXJ0ZXh0Lmxlbmd0aCAvIGNodW5rU2l6ZVdpdGhPdmVyaGVhZCk7XG4gICAgY29uc3Qgb3ZlcmhlYWQgPSBjaHVua0NvdW50ICogY2hhY2hhMjBwb2x5MTMwNU92ZXJoZWFkO1xuICAgIGNvbnN0IHBsYWludGV4dCA9IG5ldyBVaW50OEFycmF5KGNpcGhlcnRleHQubGVuZ3RoIC0gb3ZlcmhlYWQpO1xuICAgIGxldCBwbGFpbnRleHRTbGljZSA9IHBsYWludGV4dDtcbiAgICB3aGlsZSAoY2lwaGVydGV4dC5sZW5ndGggPiBjaHVua1NpemVXaXRoT3ZlcmhlYWQpIHtcbiAgICAgICAgY29uc3QgY2h1bmsgPSBjaGFjaGEyMHBvbHkxMzA1KGtleSwgc3RyZWFtTm9uY2UpLmRlY3J5cHQoY2lwaGVydGV4dC5zdWJhcnJheSgwLCBjaHVua1NpemVXaXRoT3ZlcmhlYWQpKTtcbiAgICAgICAgcGxhaW50ZXh0U2xpY2Uuc2V0KGNodW5rKTtcbiAgICAgICAgcGxhaW50ZXh0U2xpY2UgPSBwbGFpbnRleHRTbGljZS5zdWJhcnJheShjaHVuay5sZW5ndGgpO1xuICAgICAgICBjaXBoZXJ0ZXh0ID0gY2lwaGVydGV4dC5zdWJhcnJheShjaHVua1NpemVXaXRoT3ZlcmhlYWQpO1xuICAgICAgICBpbmNOb25jZSgpO1xuICAgIH1cbiAgICBzdHJlYW1Ob25jZVsxMV0gPSAxOyAvLyBMYXN0IGNodW5rIGZsYWcuXG4gICAgY29uc3QgY2h1bmsgPSBjaGFjaGEyMHBvbHkxMzA1KGtleSwgc3RyZWFtTm9uY2UpLmRlY3J5cHQoY2lwaGVydGV4dCk7XG4gICAgcGxhaW50ZXh0U2xpY2Uuc2V0KGNodW5rKTtcbiAgICBpZiAoY2h1bmsubGVuZ3RoID09PSAwICYmIHBsYWludGV4dC5sZW5ndGggIT09IDApXG4gICAgICAgIHRocm93IEVycm9yKFwiZW1wdHkgZmluYWwgY2h1bmtcIik7XG4gICAgaWYgKHBsYWludGV4dFNsaWNlLmxlbmd0aCAhPT0gY2h1bmsubGVuZ3RoKVxuICAgICAgICB0aHJvdyBFcnJvcihcInN0cmVhbTogaW50ZXJuYWwgZXJyb3I6IGRpZG4ndCBmaWxsIGV4cGVjdGVkIHBsYWludGV4dCBidWZmZXJcIik7XG4gICAgcmV0dXJuIHBsYWludGV4dDtcbn1cbmV4cG9ydCBmdW5jdGlvbiBlbmNyeXB0U1RSRUFNKGtleSwgcGxhaW50ZXh0KSB7XG4gICAgY29uc3Qgc3RyZWFtTm9uY2UgPSBuZXcgVWludDhBcnJheSgxMik7XG4gICAgY29uc3QgaW5jTm9uY2UgPSAoKSA9PiB7XG4gICAgICAgIGZvciAobGV0IGkgPSBzdHJlYW1Ob25jZS5sZW5ndGggLSAyOyBpID49IDA7IGktLSkge1xuICAgICAgICAgICAgc3RyZWFtTm9uY2VbaV0rKztcbiAgICAgICAgICAgIGlmIChzdHJlYW1Ob25jZVtpXSAhPT0gMClcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgfVxuICAgIH07XG4gICAgY29uc3QgY2h1bmtDb3VudCA9IHBsYWludGV4dC5sZW5ndGggPT09IDAgPyAxIDogTWF0aC5jZWlsKHBsYWludGV4dC5sZW5ndGggLyBjaHVua1NpemUpO1xuICAgIGNvbnN0IG92ZXJoZWFkID0gY2h1bmtDb3VudCAqIGNoYWNoYTIwcG9seTEzMDVPdmVyaGVhZDtcbiAgICBjb25zdCBjaXBoZXJ0ZXh0ID0gbmV3IFVpbnQ4QXJyYXkocGxhaW50ZXh0Lmxlbmd0aCArIG92ZXJoZWFkKTtcbiAgICBsZXQgY2lwaGVydGV4dFNsaWNlID0gY2lwaGVydGV4dDtcbiAgICB3aGlsZSAocGxhaW50ZXh0Lmxlbmd0aCA+IGNodW5rU2l6ZSkge1xuICAgICAgICBjb25zdCBjaHVuayA9IGNoYWNoYTIwcG9seTEzMDUoa2V5LCBzdHJlYW1Ob25jZSkuZW5jcnlwdChwbGFpbnRleHQuc3ViYXJyYXkoMCwgY2h1bmtTaXplKSk7XG4gICAgICAgIGNpcGhlcnRleHRTbGljZS5zZXQoY2h1bmspO1xuICAgICAgICBjaXBoZXJ0ZXh0U2xpY2UgPSBjaXBoZXJ0ZXh0U2xpY2Uuc3ViYXJyYXkoY2h1bmsubGVuZ3RoKTtcbiAgICAgICAgcGxhaW50ZXh0ID0gcGxhaW50ZXh0LnN1YmFycmF5KGNodW5rU2l6ZSk7XG4gICAgICAgIGluY05vbmNlKCk7XG4gICAgfVxuICAgIHN0cmVhbU5vbmNlWzExXSA9IDE7IC8vIExhc3QgY2h1bmsgZmxhZy5cbiAgICBjb25zdCBjaHVuayA9IGNoYWNoYTIwcG9seTEzMDUoa2V5LCBzdHJlYW1Ob25jZSkuZW5jcnlwdChwbGFpbnRleHQpO1xuICAgIGNpcGhlcnRleHRTbGljZS5zZXQoY2h1bmspO1xuICAgIGlmIChjaXBoZXJ0ZXh0U2xpY2UubGVuZ3RoICE9PSBjaHVuay5sZW5ndGgpXG4gICAgICAgIHRocm93IEVycm9yKFwic3RyZWFtOiBpbnRlcm5hbCBlcnJvcjogZGlkbid0IGZpbGwgZXhwZWN0ZWQgY2lwaGVydGV4dCBidWZmZXJcIik7XG4gICAgcmV0dXJuIGNpcGhlcnRleHQ7XG59XG4iLCAidmFyIF9fYXdhaXRlciA9ICh0aGlzICYmIHRoaXMuX19hd2FpdGVyKSB8fCBmdW5jdGlvbiAodGhpc0FyZywgX2FyZ3VtZW50cywgUCwgZ2VuZXJhdG9yKSB7XG4gICAgZnVuY3Rpb24gYWRvcHQodmFsdWUpIHsgcmV0dXJuIHZhbHVlIGluc3RhbmNlb2YgUCA/IHZhbHVlIDogbmV3IFAoZnVuY3Rpb24gKHJlc29sdmUpIHsgcmVzb2x2ZSh2YWx1ZSk7IH0pOyB9XG4gICAgcmV0dXJuIG5ldyAoUCB8fCAoUCA9IFByb21pc2UpKShmdW5jdGlvbiAocmVzb2x2ZSwgcmVqZWN0KSB7XG4gICAgICAgIGZ1bmN0aW9uIGZ1bGZpbGxlZCh2YWx1ZSkgeyB0cnkgeyBzdGVwKGdlbmVyYXRvci5uZXh0KHZhbHVlKSk7IH0gY2F0Y2ggKGUpIHsgcmVqZWN0KGUpOyB9IH1cbiAgICAgICAgZnVuY3Rpb24gcmVqZWN0ZWQodmFsdWUpIHsgdHJ5IHsgc3RlcChnZW5lcmF0b3JbXCJ0aHJvd1wiXSh2YWx1ZSkpOyB9IGNhdGNoIChlKSB7IHJlamVjdChlKTsgfSB9XG4gICAgICAgIGZ1bmN0aW9uIHN0ZXAocmVzdWx0KSB7IHJlc3VsdC5kb25lID8gcmVzb2x2ZShyZXN1bHQudmFsdWUpIDogYWRvcHQocmVzdWx0LnZhbHVlKS50aGVuKGZ1bGZpbGxlZCwgcmVqZWN0ZWQpOyB9XG4gICAgICAgIHN0ZXAoKGdlbmVyYXRvciA9IGdlbmVyYXRvci5hcHBseSh0aGlzQXJnLCBfYXJndW1lbnRzIHx8IFtdKSkubmV4dCgpKTtcbiAgICB9KTtcbn07XG5pbXBvcnQgeyBiZWNoMzIgfSBmcm9tIFwiQHNjdXJlL2Jhc2VcIjtcbmltcG9ydCB7IGhtYWMgfSBmcm9tIFwiQG5vYmxlL2hhc2hlcy9obWFjXCI7XG5pbXBvcnQgeyBoa2RmIH0gZnJvbSBcIkBub2JsZS9oYXNoZXMvaGtkZlwiO1xuaW1wb3J0IHsgc2hhMjU2IH0gZnJvbSBcIkBub2JsZS9oYXNoZXMvc2hhMjU2XCI7XG5pbXBvcnQgeyByYW5kb21CeXRlcyB9IGZyb20gXCJAbm9ibGUvaGFzaGVzL3V0aWxzXCI7XG5pbXBvcnQgKiBhcyB4MjU1MTkgZnJvbSBcIi4veDI1NTE5LmpzXCI7XG5pbXBvcnQgeyBzY3J5cHRVbndyYXAsIHNjcnlwdFdyYXAsIHgyNTUxOVVud3JhcCwgeDI1NTE5V3JhcCB9IGZyb20gXCIuL3JlY2lwaWVudHMuanNcIjtcbmltcG9ydCB7IGVuY29kZUhlYWRlciwgZW5jb2RlSGVhZGVyTm9NQUMsIHBhcnNlSGVhZGVyIH0gZnJvbSBcIi4vZm9ybWF0LmpzXCI7XG5pbXBvcnQgeyBkZWNyeXB0U1RSRUFNLCBlbmNyeXB0U1RSRUFNIH0gZnJvbSBcIi4vc3RyZWFtLmpzXCI7XG5leHBvcnQgZnVuY3Rpb24gZ2VuZXJhdGVJZGVudGl0eSgpIHtcbiAgICBjb25zdCBzY2FsYXIgPSByYW5kb21CeXRlcygzMik7XG4gICAgY29uc3QgaWRlbnRpdHkgPSBiZWNoMzIuZW5jb2RlKFwiQUdFLVNFQ1JFVC1LRVktXCIsIGJlY2gzMi50b1dvcmRzKHNjYWxhcikpLnRvVXBwZXJDYXNlKCk7XG4gICAgcmV0dXJuIFByb21pc2UucmVzb2x2ZShpZGVudGl0eSk7XG59XG5leHBvcnQgZnVuY3Rpb24gaWRlbnRpdHlUb1JlY2lwaWVudChpZGVudGl0eSkge1xuICAgIHJldHVybiBfX2F3YWl0ZXIodGhpcywgdm9pZCAwLCB2b2lkIDAsIGZ1bmN0aW9uKiAoKSB7XG4gICAgICAgIGxldCBzY2FsYXI7XG4gICAgICAgIGlmIChpc0NyeXB0b0tleShpZGVudGl0eSkpIHtcbiAgICAgICAgICAgIHNjYWxhciA9IGlkZW50aXR5O1xuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgY29uc3QgcmVzID0gYmVjaDMyLmRlY29kZVRvQnl0ZXMoaWRlbnRpdHkpO1xuICAgICAgICAgICAgaWYgKCFpZGVudGl0eS5zdGFydHNXaXRoKFwiQUdFLVNFQ1JFVC1LRVktMVwiKSB8fFxuICAgICAgICAgICAgICAgIHJlcy5wcmVmaXgudG9VcHBlckNhc2UoKSAhPT0gXCJBR0UtU0VDUkVULUtFWS1cIiB8fFxuICAgICAgICAgICAgICAgIHJlcy5ieXRlcy5sZW5ndGggIT09IDMyKVxuICAgICAgICAgICAgICAgIHRocm93IEVycm9yKFwiaW52YWxpZCBpZGVudGl0eVwiKTtcbiAgICAgICAgICAgIHNjYWxhciA9IHJlcy5ieXRlcztcbiAgICAgICAgfVxuICAgICAgICBjb25zdCByZWNpcGllbnQgPSB5aWVsZCB4MjU1MTkuc2NhbGFyTXVsdEJhc2Uoc2NhbGFyKTtcbiAgICAgICAgcmV0dXJuIGJlY2gzMi5lbmNvZGUoXCJhZ2VcIiwgYmVjaDMyLnRvV29yZHMocmVjaXBpZW50KSk7XG4gICAgfSk7XG59XG5leHBvcnQgY2xhc3MgRW5jcnlwdGVyIHtcbiAgICBjb25zdHJ1Y3RvcigpIHtcbiAgICAgICAgdGhpcy5wYXNzcGhyYXNlID0gbnVsbDtcbiAgICAgICAgdGhpcy5zY3J5cHRXb3JrRmFjdG9yID0gMTg7XG4gICAgICAgIHRoaXMucmVjaXBpZW50cyA9IFtdO1xuICAgIH1cbiAgICBzZXRQYXNzcGhyYXNlKHMpIHtcbiAgICAgICAgaWYgKHRoaXMucGFzc3BocmFzZSAhPT0gbnVsbClcbiAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcihcImNhbiBlbmNyeXB0IHRvIGF0IG1vc3Qgb25lIHBhc3NwaHJhc2VcIik7XG4gICAgICAgIGlmICh0aGlzLnJlY2lwaWVudHMubGVuZ3RoICE9PSAwKVxuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKFwiY2FuJ3QgZW5jcnlwdCB0byBib3RoIHJlY2lwaWVudHMgYW5kIHBhc3NwaHJhc2VzXCIpO1xuICAgICAgICB0aGlzLnBhc3NwaHJhc2UgPSBzO1xuICAgIH1cbiAgICBzZXRTY3J5cHRXb3JrRmFjdG9yKGxvZ04pIHtcbiAgICAgICAgdGhpcy5zY3J5cHRXb3JrRmFjdG9yID0gbG9nTjtcbiAgICB9XG4gICAgYWRkUmVjaXBpZW50KHMpIHtcbiAgICAgICAgaWYgKHRoaXMucGFzc3BocmFzZSAhPT0gbnVsbClcbiAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcihcImNhbid0IGVuY3J5cHQgdG8gYm90aCByZWNpcGllbnRzIGFuZCBwYXNzcGhyYXNlc1wiKTtcbiAgICAgICAgY29uc3QgcmVzID0gYmVjaDMyLmRlY29kZVRvQnl0ZXMocyk7XG4gICAgICAgIGlmICghcy5zdGFydHNXaXRoKFwiYWdlMVwiKSB8fFxuICAgICAgICAgICAgcmVzLnByZWZpeC50b0xvd2VyQ2FzZSgpICE9PSBcImFnZVwiIHx8XG4gICAgICAgICAgICByZXMuYnl0ZXMubGVuZ3RoICE9PSAzMilcbiAgICAgICAgICAgIHRocm93IEVycm9yKFwiaW52YWxpZCByZWNpcGllbnRcIik7XG4gICAgICAgIHRoaXMucmVjaXBpZW50cy5wdXNoKHJlcy5ieXRlcyk7XG4gICAgfVxuICAgIGVuY3J5cHQoZmlsZSkge1xuICAgICAgICByZXR1cm4gX19hd2FpdGVyKHRoaXMsIHZvaWQgMCwgdm9pZCAwLCBmdW5jdGlvbiogKCkge1xuICAgICAgICAgICAgaWYgKHR5cGVvZiBmaWxlID09PSBcInN0cmluZ1wiKSB7XG4gICAgICAgICAgICAgICAgZmlsZSA9IG5ldyBUZXh0RW5jb2RlcigpLmVuY29kZShmaWxlKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGNvbnN0IGZpbGVLZXkgPSByYW5kb21CeXRlcygxNik7XG4gICAgICAgICAgICBjb25zdCBzdGFuemFzID0gW107XG4gICAgICAgICAgICBmb3IgKGNvbnN0IHJlY2lwaWVudCBvZiB0aGlzLnJlY2lwaWVudHMpIHtcbiAgICAgICAgICAgICAgICBzdGFuemFzLnB1c2goeWllbGQgeDI1NTE5V3JhcChmaWxlS2V5LCByZWNpcGllbnQpKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmICh0aGlzLnBhc3NwaHJhc2UgIT09IG51bGwpIHtcbiAgICAgICAgICAgICAgICBzdGFuemFzLnB1c2goc2NyeXB0V3JhcChmaWxlS2V5LCB0aGlzLnBhc3NwaHJhc2UsIHRoaXMuc2NyeXB0V29ya0ZhY3RvcikpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgY29uc3QgaG1hY0tleSA9IGhrZGYoc2hhMjU2LCBmaWxlS2V5LCB1bmRlZmluZWQsIFwiaGVhZGVyXCIsIDMyKTtcbiAgICAgICAgICAgIGNvbnN0IG1hYyA9IGhtYWMoc2hhMjU2LCBobWFjS2V5LCBlbmNvZGVIZWFkZXJOb01BQyhzdGFuemFzKSk7XG4gICAgICAgICAgICBjb25zdCBoZWFkZXIgPSBlbmNvZGVIZWFkZXIoc3RhbnphcywgbWFjKTtcbiAgICAgICAgICAgIGNvbnN0IG5vbmNlID0gcmFuZG9tQnl0ZXMoMTYpO1xuICAgICAgICAgICAgY29uc3Qgc3RyZWFtS2V5ID0gaGtkZihzaGEyNTYsIGZpbGVLZXksIG5vbmNlLCBcInBheWxvYWRcIiwgMzIpO1xuICAgICAgICAgICAgY29uc3QgcGF5bG9hZCA9IGVuY3J5cHRTVFJFQU0oc3RyZWFtS2V5LCBmaWxlKTtcbiAgICAgICAgICAgIGNvbnN0IG91dCA9IG5ldyBVaW50OEFycmF5KGhlYWRlci5sZW5ndGggKyBub25jZS5sZW5ndGggKyBwYXlsb2FkLmxlbmd0aCk7XG4gICAgICAgICAgICBvdXQuc2V0KGhlYWRlcik7XG4gICAgICAgICAgICBvdXQuc2V0KG5vbmNlLCBoZWFkZXIubGVuZ3RoKTtcbiAgICAgICAgICAgIG91dC5zZXQocGF5bG9hZCwgaGVhZGVyLmxlbmd0aCArIG5vbmNlLmxlbmd0aCk7XG4gICAgICAgICAgICByZXR1cm4gb3V0O1xuICAgICAgICB9KTtcbiAgICB9XG59XG5leHBvcnQgY2xhc3MgRGVjcnlwdGVyIHtcbiAgICBjb25zdHJ1Y3RvcigpIHtcbiAgICAgICAgdGhpcy5wYXNzcGhyYXNlcyA9IFtdO1xuICAgICAgICB0aGlzLmlkZW50aXRpZXMgPSBbXTtcbiAgICB9XG4gICAgYWRkUGFzc3BocmFzZShzKSB7XG4gICAgICAgIHRoaXMucGFzc3BocmFzZXMucHVzaChzKTtcbiAgICB9XG4gICAgYWRkSWRlbnRpdHkocykge1xuICAgICAgICBpZiAoaXNDcnlwdG9LZXkocykpIHtcbiAgICAgICAgICAgIHRoaXMuaWRlbnRpdGllcy5wdXNoKHtcbiAgICAgICAgICAgICAgICBpZGVudGl0eTogcyxcbiAgICAgICAgICAgICAgICByZWNpcGllbnQ6IHgyNTUxOS5zY2FsYXJNdWx0QmFzZShzKSxcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICAgIGNvbnN0IHJlcyA9IGJlY2gzMi5kZWNvZGVUb0J5dGVzKHMpO1xuICAgICAgICBpZiAoIXMuc3RhcnRzV2l0aChcIkFHRS1TRUNSRVQtS0VZLTFcIikgfHxcbiAgICAgICAgICAgIHJlcy5wcmVmaXgudG9VcHBlckNhc2UoKSAhPT0gXCJBR0UtU0VDUkVULUtFWS1cIiB8fFxuICAgICAgICAgICAgcmVzLmJ5dGVzLmxlbmd0aCAhPT0gMzIpXG4gICAgICAgICAgICB0aHJvdyBFcnJvcihcImludmFsaWQgaWRlbnRpdHlcIik7XG4gICAgICAgIHRoaXMuaWRlbnRpdGllcy5wdXNoKHtcbiAgICAgICAgICAgIGlkZW50aXR5OiByZXMuYnl0ZXMsXG4gICAgICAgICAgICByZWNpcGllbnQ6IHgyNTUxOS5zY2FsYXJNdWx0QmFzZShyZXMuYnl0ZXMpLFxuICAgICAgICB9KTtcbiAgICB9XG4gICAgZGVjcnlwdChmaWxlLCBvdXRwdXRGb3JtYXQpIHtcbiAgICAgICAgcmV0dXJuIF9fYXdhaXRlcih0aGlzLCB2b2lkIDAsIHZvaWQgMCwgZnVuY3Rpb24qICgpIHtcbiAgICAgICAgICAgIGNvbnN0IGggPSBwYXJzZUhlYWRlcihmaWxlKTtcbiAgICAgICAgICAgIGNvbnN0IGZpbGVLZXkgPSB5aWVsZCB0aGlzLnVud3JhcEZpbGVLZXkoaC5yZWNpcGllbnRzKTtcbiAgICAgICAgICAgIGlmIChmaWxlS2V5ID09PSBudWxsKSB7XG4gICAgICAgICAgICAgICAgdGhyb3cgRXJyb3IoXCJubyBpZGVudGl0eSBtYXRjaGVkIGFueSBvZiB0aGUgZmlsZSdzIHJlY2lwaWVudHNcIik7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBjb25zdCBobWFjS2V5ID0gaGtkZihzaGEyNTYsIGZpbGVLZXksIHVuZGVmaW5lZCwgXCJoZWFkZXJcIiwgMzIpO1xuICAgICAgICAgICAgY29uc3QgbWFjID0gaG1hYyhzaGEyNTYsIGhtYWNLZXksIGguaGVhZGVyTm9NQUMpO1xuICAgICAgICAgICAgaWYgKCFjb21wYXJlQnl0ZXMoaC5NQUMsIG1hYykpIHtcbiAgICAgICAgICAgICAgICB0aHJvdyBFcnJvcihcImludmFsaWQgaGVhZGVyIEhNQUNcIik7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBjb25zdCBub25jZSA9IGgucmVzdC5zdWJhcnJheSgwLCAxNik7XG4gICAgICAgICAgICBjb25zdCBzdHJlYW1LZXkgPSBoa2RmKHNoYTI1NiwgZmlsZUtleSwgbm9uY2UsIFwicGF5bG9hZFwiLCAzMik7XG4gICAgICAgICAgICBjb25zdCBwYXlsb2FkID0gaC5yZXN0LnN1YmFycmF5KDE2KTtcbiAgICAgICAgICAgIGNvbnN0IG91dCA9IGRlY3J5cHRTVFJFQU0oc3RyZWFtS2V5LCBwYXlsb2FkKTtcbiAgICAgICAgICAgIGlmIChvdXRwdXRGb3JtYXQgPT09IFwidGV4dFwiKVxuICAgICAgICAgICAgICAgIHJldHVybiBuZXcgVGV4dERlY29kZXIoKS5kZWNvZGUob3V0KTtcbiAgICAgICAgICAgIHJldHVybiBvdXQ7XG4gICAgICAgIH0pO1xuICAgIH1cbiAgICB1bndyYXBGaWxlS2V5KHJlY2lwaWVudHMpIHtcbiAgICAgICAgcmV0dXJuIF9fYXdhaXRlcih0aGlzLCB2b2lkIDAsIHZvaWQgMCwgZnVuY3Rpb24qICgpIHtcbiAgICAgICAgICAgIGZvciAoY29uc3QgcyBvZiByZWNpcGllbnRzKSB7XG4gICAgICAgICAgICAgICAgLy8gSWRlYWxseSB0aGlzIHNob3VsZCBiZSBpbXBsZW1lbnRlZCBieSBwYXNzaW5nIGFsbCBzdGFuemFzIHRvIHRoZSBzY3J5cHRcbiAgICAgICAgICAgICAgICAvLyBpZGVudGl0eSBpbXBsZW1lbnRhdGlvbiwgYW5kIGxldHRpbmcgaXQgdGhyb3cgdGhlIGVycm9yLiBJbiBwcmFjdGljZSxcbiAgICAgICAgICAgICAgICAvLyB0aGlzIGlzIGEgdmVyeSBzaW1wbGUgaW1wbGVtZW50YXRpb24gd2l0aCBubyBwdWJsaWMgaWRlbnRpdHkgaW50ZXJmYWNlLlxuICAgICAgICAgICAgICAgIGlmIChzLmFyZ3MubGVuZ3RoID4gMCAmJiBzLmFyZ3NbMF0gPT09IFwic2NyeXB0XCIgJiYgcmVjaXBpZW50cy5sZW5ndGggIT09IDEpIHtcbiAgICAgICAgICAgICAgICAgICAgdGhyb3cgRXJyb3IoXCJzY3J5cHQgcmVjaXBpZW50IGlzIG5vdCB0aGUgb25seSBvbmUgaW4gdGhlIGhlYWRlclwiKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgZm9yIChjb25zdCBwIG9mIHRoaXMucGFzc3BocmFzZXMpIHtcbiAgICAgICAgICAgICAgICAgICAgY29uc3QgayA9IHNjcnlwdFVud3JhcChzLCBwKTtcbiAgICAgICAgICAgICAgICAgICAgaWYgKGsgIT09IG51bGwpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBrO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGZvciAoY29uc3QgaSBvZiB0aGlzLmlkZW50aXRpZXMpIHtcbiAgICAgICAgICAgICAgICAgICAgY29uc3QgayA9IHlpZWxkIHgyNTUxOVVud3JhcChzLCBpKTtcbiAgICAgICAgICAgICAgICAgICAgaWYgKGsgIT09IG51bGwpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBrO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcmV0dXJuIG51bGw7XG4gICAgICAgIH0pO1xuICAgIH1cbn1cbmZ1bmN0aW9uIGNvbXBhcmVCeXRlcyhhLCBiKSB7XG4gICAgaWYgKGEubGVuZ3RoICE9PSBiLmxlbmd0aCkge1xuICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuICAgIGxldCBhY2MgPSAwO1xuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgYS5sZW5ndGg7IGkrKykge1xuICAgICAgICBhY2MgfD0gYVtpXSBeIGJbaV07XG4gICAgfVxuICAgIHJldHVybiBhY2MgPT09IDA7XG59XG5mdW5jdGlvbiBpc0NyeXB0b0tleShrZXkpIHtcbiAgICByZXR1cm4gdHlwZW9mIENyeXB0b0tleSAhPT0gXCJ1bmRlZmluZWRcIiAmJiBrZXkgaW5zdGFuY2VvZiBDcnlwdG9LZXk7XG59XG4iLCAiaW1wb3J0IHsgRW5jcnlwdGVyLCBEZWNyeXB0ZXIgfSBmcm9tICdhZ2UtZW5jcnlwdGlvbic7XHJcblxyXG5leHBvcnQgYXN5bmMgZnVuY3Rpb24gZW5jcnlwdERhdGEoZGF0YTogVWludDhBcnJheSwgcGFzc3BocmFzZTogc3RyaW5nKSB7XHJcbiAgICBjb25zdCBlID0gbmV3IEVuY3J5cHRlcigpO1xyXG4gICAgZS5zZXRQYXNzcGhyYXNlKHBhc3NwaHJhc2UpO1xyXG4gICAgcmV0dXJuIGF3YWl0IGUuZW5jcnlwdChkYXRhKTtcclxufVxyXG5cclxuZXhwb3J0IGFzeW5jIGZ1bmN0aW9uIGRlY3J5cHREYXRhKGNpcGhlcnRleHQ6IFVpbnQ4QXJyYXksIHBhc3NwaHJhc2U6IHN0cmluZykge1xyXG4gICAgY29uc3QgZSA9IG5ldyBEZWNyeXB0ZXIoKTtcclxuICAgIGUuYWRkUGFzc3BocmFzZShwYXNzcGhyYXNlKTtcclxuICAgIGNvbnN0IHBsYWludGV4dCA9IGF3YWl0IGUuZGVjcnlwdChjaXBoZXJ0ZXh0KTtcclxuICAgIFxyXG4gICAgcmV0dXJuIHBsYWludGV4dDtcclxufVxyXG4iLCAiaW1wb3J0IHsgZnJvbUJhc2U2NCwgdG9CYXNlNjQgfSBmcm9tICdAYXRjdXRlL211bHRpYmFzZSc7XG5cbmV4cG9ydCBpbnRlcmZhY2UgQnl0ZXMge1xuXHQkYnl0ZXM6IHN0cmluZztcbn1cblxuZXhwb3J0IGNsYXNzIEJ5dGVzV3JhcHBlciBpbXBsZW1lbnRzIEJ5dGVzIHtcblx0Y29uc3RydWN0b3IocHVibGljIGJ1ZjogVWludDhBcnJheSkge31cblxuXHRnZXQgJGJ5dGVzKCk6IHN0cmluZyB7XG5cdFx0cmV0dXJuIHRvQmFzZTY0KHRoaXMuYnVmKTtcblx0fVxuXG5cdHRvSlNPTigpOiBCeXRlcyB7XG5cdFx0cmV0dXJuIHsgJGJ5dGVzOiB0aGlzLiRieXRlcyB9O1xuXHR9XG59XG5cbmV4cG9ydCBjb25zdCB0b0J5dGVzID0gKGJ1ZjogVWludDhBcnJheSk6IEJ5dGVzID0+IHtcblx0cmV0dXJuIG5ldyBCeXRlc1dyYXBwZXIoYnVmKTtcbn07XG5cbmV4cG9ydCBjb25zdCBmcm9tQnl0ZXMgPSAoYnl0ZXM6IEJ5dGVzKTogVWludDhBcnJheSA9PiB7XG5cdGlmIChieXRlcyBpbnN0YW5jZW9mIEJ5dGVzV3JhcHBlcikge1xuXHRcdHJldHVybiBieXRlcy5idWY7XG5cdH1cblxuXHRyZXR1cm4gZnJvbUJhc2U2NChieXRlcy4kYnl0ZXMpO1xufTtcbiIsICJjb25zdCBTMzJfQ0hBUiA9ICcyMzQ1NjdhYmNkZWZnaGlqa2xtbm9wcXJzdHV2d3h5eic7XG5cbmV4cG9ydCBjb25zdCBzMzJlbmNvZGUgPSAoaTogbnVtYmVyKTogc3RyaW5nID0+IHtcblx0bGV0IHMgPSAnJztcblxuXHR3aGlsZSAoaSkge1xuXHRcdGNvbnN0IGMgPSBpICUgMzI7XG5cdFx0aSA9IE1hdGguZmxvb3IoaSAvIDMyKTtcblx0XHRzID0gUzMyX0NIQVIuY2hhckF0KGMpICsgcztcblx0fVxuXG5cdHJldHVybiBzO1xufTtcblxuZXhwb3J0IGNvbnN0IHMzMmRlY29kZSA9IChzOiBzdHJpbmcpOiBudW1iZXIgPT4ge1xuXHRsZXQgaSA9IDA7XG5cblx0Zm9yIChjb25zdCBjIG9mIHMpIHtcblx0XHRpID0gaSAqIDMyICsgUzMyX0NIQVIuaW5kZXhPZihjKTtcblx0fVxuXG5cdHJldHVybiBpO1xufTtcbiIsICJpbXBvcnQgeyBzMzJkZWNvZGUsIHMzMmVuY29kZSB9IGZyb20gJy4vczMyLmpzJztcblxubGV0IGxhc3RUaW1lc3RhbXA6IG51bWJlciA9IDA7XG5cbmNvbnN0IFRJRF9SRSA9IC9eWzIzNDU2N2FiY2RlZmdoaWpdWzIzNDU2N2FiY2RlZmdoaWprbG1ub3BxcnN0dXZ3eHl6XXsxMn0kLztcblxuLyoqXG4gKiBDcmVhdGVzIGEgVElEIGJhc2VkIG9mZiBwcm92aWRlZCB0aW1lc3RhbXAgYW5kIGNsb2NraWQsIHdpdGggbm8gdmFsaWRhdGlvbi5cbiAqL1xuZXhwb3J0IGNvbnN0IGNyZWF0ZVJhdyA9ICh0aW1lc3RhbXA6IG51bWJlciwgY2xvY2tpZDogbnVtYmVyKTogc3RyaW5nID0+IHtcblx0cmV0dXJuIHMzMmVuY29kZSh0aW1lc3RhbXApLnBhZFN0YXJ0KDExLCAnMicpICsgczMyZW5jb2RlKGNsb2NraWQpLnBhZFN0YXJ0KDIsICcyJyk7XG59O1xuXG4vKipcbiAqIENyZWF0ZXMgYSBUSUQgYmFzZWQgb2ZmIHByb3ZpZGVkIHRpbWVzdGFtcCBhbmQgY2xvY2tpZFxuICovXG5leHBvcnQgY29uc3QgY3JlYXRlID0gKHRpbWVzdGFtcDogbnVtYmVyLCBjbG9ja2lkOiBudW1iZXIpOiBzdHJpbmcgPT4ge1xuXHRpZiAodGltZXN0YW1wIDwgMCB8fCAhTnVtYmVyLmlzU2FmZUludGVnZXIodGltZXN0YW1wKSkge1xuXHRcdHRocm93IG5ldyBFcnJvcihgaW52YWxpZCB0aW1lc3RhbXBgKTtcblx0fVxuXG5cdGlmIChjbG9ja2lkIDwgMCB8fCBjbG9ja2lkID4gMTAyMykge1xuXHRcdHRocm93IG5ldyBFcnJvcihgaW52YWxpZCBjbG9ja2lkYCk7XG5cdH1cblxuXHRyZXR1cm4gY3JlYXRlUmF3KHRpbWVzdGFtcCwgY2xvY2tpZCk7XG59O1xuXG4vKipcbiAqIFJldHVybiBhIFRJRCBiYXNlZCBvbiBjdXJyZW50IHRpbWVcbiAqL1xuZXhwb3J0IGNvbnN0IG5vdyA9ICgpOiBzdHJpbmcgPT4ge1xuXHQvLyB3ZSBuZWVkIHRoZXNlIHR3byBhc3BlY3RzLCB3aGljaCBEYXRlLm5vdygpIGRvZXNuJ3QgcHJvdmlkZTpcblx0Ly8gLSBtb25vdG9uaWNhbGx5IGluY3JlYXNpbmcgdGltZVxuXHQvLyAtIG1pY3Jvc2Vjb25kIHByZWNpc2lvblxuXG5cdC8vIHdoaWxlIGBwZXJmb3JtYW5jZS50aW1lT3JpZ2luICsgcGVyZm9ybWFuY2Uubm93KClgIGNvdWxkIGJlIHVzZWQgaGVyZSwgdGhleVxuXHQvLyBzZWVtIHRvIGhhdmUgY3Jvc3MtYnJvd3NlciBkaWZmZXJlbmNlcywgbm90IHN1cmUgb24gdGhhdCB5ZXQuXG5cblx0bGV0IHRpbWVzdGFtcCA9IE1hdGgubWF4KERhdGUubm93KCkgKiAxXzAwMCwgbGFzdFRpbWVzdGFtcCk7XG5cdGxhc3RUaW1lc3RhbXAgPSB0aW1lc3RhbXAgKyAxO1xuXG5cdHJldHVybiBjcmVhdGVSYXcodGltZXN0YW1wLCBNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiAxMDIzKSk7XG59O1xuXG4vKipcbiAqIFBhcnNlcyBhIFRJRCwgdGhyb3dzIG9uIGludmFsaWQgc3RyaW5ncy5cbiAqL1xuZXhwb3J0IGNvbnN0IHBhcnNlID0gKHRpZDogc3RyaW5nKTogeyB0aW1lc3RhbXA6IG51bWJlcjsgY2xvY2tpZDogbnVtYmVyIH0gPT4ge1xuXHRpZiAoIXZhbGlkYXRlKHRpZCkpIHtcblx0XHR0aHJvdyBuZXcgRXJyb3IoYGludmFsaWQgVElEYCk7XG5cdH1cblxuXHRjb25zdCB0aW1lc3RhbXAgPSBzMzJkZWNvZGUodGlkLnNsaWNlKDAsIDExKSk7XG5cdGNvbnN0IGNsb2NraWQgPSBzMzJkZWNvZGUodGlkLnNsaWNlKDExLCAxMykpO1xuXG5cdHJldHVybiB7IHRpbWVzdGFtcDogdGltZXN0YW1wLCBjbG9ja2lkOiBjbG9ja2lkIH07XG59O1xuXG4vKipcbiAqIFZhbGlkYXRlIGlmIHN0cmluZyBpcyBhIHZhbGlkIFRJRFxuICovXG5leHBvcnQgY29uc3QgdmFsaWRhdGUgPSAodGlkOiBzdHJpbmcpOiBib29sZWFuID0+IHtcblx0cmV0dXJuIHRpZC5sZW5ndGggPT09IDEzICYmIFRJRF9SRS50ZXN0KHRpZCk7XG59O1xuIl0sCiAgIm1hcHBpbmdzIjogIjs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQThXQSxjQUFBLFdBQUFBO0FBblZBLGVBQVMsY0FBYyxNQUFXO0FBQzlCLFlBQUksT0FBTyxTQUFTLFVBQVU7QUFDMUIsaUJBQU8sT0FBTyxJQUFJO1FBQ3RCO0FBQ0EsWUFBSSxzQkFBc0IsS0FBSyxJQUFJLEdBQUc7QUFDbEMsZ0JBQU0sSUFBSSxVQUFVLHdDQUF3QztRQUNoRTtBQUNBLGVBQU87TUFDWDtBQUVBLGVBQVMsZUFBZSxPQUFZO0FBQ2hDLFlBQUksT0FBTyxVQUFVLFVBQVU7QUFDM0Isa0JBQVEsT0FBTyxLQUFLO1FBQ3hCO0FBQ0EsZUFBTztNQUNYO0FBRUEsVUFBYUMsV0FBYixNQUFhLFNBQU87UUFHaEIsWUFBWUMsVUFBeUM7QUFGN0MsZUFBQSxNQUFnQyxDQUFBO0FBR3BDLGVBQUssTUFBTSxDQUFBO0FBRVgsY0FBSUEsb0JBQW1CLFVBQVM7QUFDNUIsWUFBQUEsU0FBUSxRQUFRLENBQUMsT0FBTyxTQUFRO0FBQzVCLG1CQUFLLE9BQU8sTUFBTSxLQUFLO1lBQzNCLENBQUM7VUFDTCxXQUFXQSxVQUFTO0FBQ2hCLHVCQUFXLFFBQVEsT0FBTyxvQkFBb0JBLFFBQU8sR0FBRztBQUNwRCxtQkFBSyxPQUFPLE1BQU1BLFNBQVEsSUFBSSxDQUFDO1lBQ25DO1VBQ0o7UUFDSjtRQUVBLE9BQU8sTUFBYSxPQUFZO0FBQzVCLGlCQUFPLGNBQWMsSUFBSTtBQUN6QixrQkFBUSxlQUFlLEtBQUs7QUFFNUIsZ0JBQU0sT0FBTyxLQUFLLElBQUksSUFBSTtBQUMxQixjQUFJLFNBQVMsUUFBVztBQUNwQixpQkFBSyxJQUFJLElBQUksSUFBSSxDQUFDLEtBQUs7VUFDM0IsT0FBTztBQUNILGlCQUFLLEtBQUssS0FBSztVQUNuQjtRQUNKO1FBRUEsT0FBTyxNQUFXO0FBQ2QsaUJBQU8sS0FBSyxJQUFJLGNBQWMsSUFBSSxDQUFDO1FBQ3ZDO1FBRUEsSUFBSSxNQUFXO0FBQ1gsZ0JBQU0sU0FBUyxLQUFLLElBQUksY0FBYyxJQUFJLENBQUM7QUFDM0MsaUJBQU8sU0FBUyxPQUFPLENBQUMsSUFBSTtRQUNoQztRQUVBLE9BQU8sTUFBVztBQUNkLGlCQUFPLEtBQUssSUFBSSxjQUFjLElBQUksQ0FBQyxLQUFLLENBQUE7UUFDNUM7UUFFQSxJQUFJLE1BQVc7QUFDWCxpQkFBTyxPQUFPLFVBQVUsZUFBZSxLQUFLLEtBQUssS0FBSyxjQUFjLElBQUksQ0FBQztRQUM3RTtRQUVBLElBQUksTUFBYSxPQUFZO0FBQ3pCLGVBQUssSUFBSSxjQUFjLElBQUksQ0FBQyxJQUFJLENBQUMsZUFBZSxLQUFLLENBQUM7UUFDMUQ7O1FBR0EsUUFBUSxVQUFnRSxTQUFpQjtBQUNyRixxQkFBVyxRQUFRLE9BQU8sb0JBQW9CLEtBQUssR0FBRyxHQUFHO0FBQ3JELHVCQUFXLFNBQVMsS0FBSyxJQUFJLElBQUksR0FBRztBQUNoQyx1QkFBUyxLQUFLLFNBQVMsT0FBTyxNQUFNLElBQUk7WUFDNUM7VUFDSjtRQUNKO1FBRUEsRUFBRSxPQUFPLFFBQVEsSUFBQztBQUNkLHFCQUFXLENBQUMsTUFBTSxNQUFNLEtBQUssT0FBTyxRQUFRLEtBQUssR0FBRyxHQUFHO0FBQ25ELHVCQUFXLFNBQVMsUUFBUTtBQUN4QixvQkFBTSxDQUFDLE1BQU0sS0FBSztZQUN0QjtVQUNKO1FBQ0o7O0FBakVKLGNBQUEsVUFBQUQ7QUFvRUEsZUFBUyxnQkFBZ0IsUUFBa0I7QUFDdkMsZUFBTyxJQUFJLFFBQVEsQ0FBQyxTQUFTLFdBQVU7QUFDbkMsaUJBQU8saUJBQWlCLFFBQVEsTUFBSztBQUNqQyxvQkFBUSxPQUFPLE1BQU07VUFDekIsQ0FBQztBQUNELGlCQUFPLGlCQUFpQixTQUFTLE1BQUs7QUFDbEMsbUJBQU8sT0FBTyxLQUFLO1VBQ3ZCLENBQUM7UUFDTCxDQUFDO01BQ0w7QUFFQSxlQUFTLHNCQUFzQixNQUFVO0FBQ3JDLGNBQU0sU0FBUyxJQUFJLFdBQVU7QUFDN0IsZUFBTyxrQkFBa0IsSUFBSTtBQUM3QixlQUFPLGdCQUFnQixNQUFNO01BQ2pDO0FBRUEsZUFBUyxlQUFlLE1BQVU7QUFDOUIsY0FBTSxTQUFTLElBQUksV0FBVTtBQUM3QixlQUFPLFdBQVcsSUFBSTtBQUN0QixlQUFPLGdCQUFnQixNQUFNO01BQ2pDO0FBRUEsVUFBTSxjQUFjLElBQUksWUFBVztBQUNuQyxVQUFNLGNBQWMsSUFBSSxZQUFXO0FBQ25DLFVBQWUsT0FBZixNQUFtQjtRQUFuQixjQUFBO0FBQ2MsZUFBQSxZQUFZO1FBZ0gxQjtRQTVHSSxJQUFJLFdBQVE7QUFDUixpQkFBTyxLQUFLO1FBQ2hCO1FBRUEsT0FBSTtBQUNBLGNBQUksS0FBSyxXQUFXO0FBQ2hCLG1CQUFPLFFBQVEsT0FBTyxJQUFJLFVBQVUsNEJBQTRCLENBQUM7VUFDckU7QUFDQSxlQUFLLFlBQVk7QUFFakIsZ0JBQU0sT0FBTyxLQUFLO0FBQ2xCLGNBQUksT0FBTyxTQUFTLFlBQVksZ0JBQWdCLGFBQWE7QUFDekQsbUJBQU8sUUFBUSxRQUFRLElBQUksS0FBSyxDQUFDLElBQUksQ0FBQyxDQUFDO1VBQzNDO0FBQ0EsY0FBSSxnQkFBZ0IsTUFBTTtBQUN0QixtQkFBTyxRQUFRLFFBQVEsSUFBSTtVQUMvQjtBQUNBLGNBQUksZ0JBQWdCLFVBQVU7QUFDMUIsbUJBQU8sUUFBUSxPQUFPLElBQUksVUFBVSxvREFBb0QsQ0FBQztVQUM3RjtBQUNBLGNBQUksU0FBUyxRQUFXO0FBQ3BCLG1CQUFPLFFBQVEsT0FBTyxJQUFJLE1BQU0sb0JBQW9CLENBQUM7VUFDekQ7QUFFQSxnQkFBTSxJQUFJLFVBQVUsbUJBQW1CO1FBQzNDO1FBRUEsY0FBVztBQUNQLGNBQUksS0FBSyxXQUFXO0FBQ2hCLG1CQUFPLFFBQVEsT0FBTyxJQUFJLFVBQVUsNEJBQTRCLENBQUM7VUFDckU7QUFDQSxlQUFLLFlBQVk7QUFFakIsZ0JBQU0sT0FBTyxLQUFLO0FBQ2xCLGNBQUksT0FBTyxTQUFTLFVBQVU7QUFDMUIsbUJBQU8sUUFBUSxRQUFTLFlBQVksT0FBTyxJQUFJLEVBQThCLE1BQU07VUFDdkY7QUFDQSxjQUFJLGdCQUFnQixhQUFhO0FBQzdCLG1CQUFPLFFBQVEsUUFBUSxJQUFJO1VBQy9CO0FBQ0EsY0FBSSxnQkFBZ0IsTUFBTTtBQUN0QixtQkFBTyxRQUFRLFFBQVEsc0JBQXNCLElBQUksQ0FBQztVQUN0RDtBQUNBLGNBQUksZ0JBQWdCLFVBQVU7QUFDMUIsbUJBQU8sUUFBUSxPQUFPLElBQUksVUFBVSw0REFBNEQsQ0FBQztVQUNyRztBQUNBLGNBQUksU0FBUyxRQUFXO0FBQ3BCLG1CQUFPLFFBQVEsT0FBTyxJQUFJLE1BQU0sb0JBQW9CLENBQUM7VUFDekQ7QUFFQSxnQkFBTSxJQUFJLFVBQVUsbUJBQW1CO1FBQzNDO1FBRUEsT0FBSTtBQUNBLGNBQUksS0FBSyxXQUFXO0FBQ2hCLG1CQUFPLFFBQVEsT0FBTyxJQUFJLFVBQVUsNEJBQTRCLENBQUM7VUFDckU7QUFDQSxlQUFLLFlBQVk7QUFFakIsZ0JBQU0sT0FBTyxLQUFLO0FBQ2xCLGNBQUksT0FBTyxTQUFTLFVBQVU7QUFDMUIsbUJBQU8sUUFBUSxRQUFRLElBQUk7VUFDL0I7QUFDQSxjQUFJLGdCQUFnQixhQUFhO0FBQzdCLG1CQUFPLFFBQVEsUUFBUSxZQUFZLE9BQU8sSUFBSSxDQUFDO1VBQ25EO0FBQ0EsY0FBSSxnQkFBZ0IsTUFBTTtBQUN0QixtQkFBTyxRQUFRLFFBQVEsZUFBZSxJQUFJLENBQUM7VUFDL0M7QUFDQSxjQUFJLGdCQUFnQixVQUFVO0FBQzFCLG1CQUFPLFFBQVEsT0FBTyxJQUFJLFVBQVUsa0RBQWtELENBQUM7VUFDM0Y7QUFDQSxjQUFJLFNBQVMsUUFBVztBQUNwQixtQkFBTyxRQUFRLE9BQU8sSUFBSSxNQUFNLG9CQUFvQixDQUFDO1VBQ3pEO0FBRUEsZ0JBQU0sSUFBSSxVQUFVLG1CQUFtQjtRQUMzQztRQUVBLFdBQVE7QUFDSixjQUFJLEtBQUssV0FBVztBQUNoQixtQkFBTyxRQUFRLE9BQU8sSUFBSSxVQUFVLDRCQUE0QixDQUFDO1VBQ3JFO0FBQ0EsZUFBSyxZQUFZO0FBRWpCLGdCQUFNLE9BQU8sS0FBSztBQUNsQixjQUFJLE9BQU8sU0FBUyxVQUFVO0FBQzFCLG1CQUFPLFFBQVEsT0FBTyxJQUFJLFVBQVUsdURBQXVELENBQUM7VUFDaEc7QUFDQSxjQUFJLGdCQUFnQixhQUFhO0FBQzdCLG1CQUFPLFFBQVEsT0FBTyxJQUFJLFVBQVUsNkRBQTZELENBQUM7VUFDdEc7QUFDQSxjQUFJLGdCQUFnQixNQUFNO0FBQ3RCLG1CQUFPLFFBQVEsT0FBTyxJQUFJLFVBQVUscURBQXFELENBQUM7VUFDOUY7QUFDQSxjQUFJLGdCQUFnQixVQUFVO0FBQzFCLG1CQUFPLFFBQVEsUUFBUSxJQUFJO1VBQy9CO0FBQ0EsY0FBSSxTQUFTLFFBQVc7QUFDcEIsbUJBQU8sUUFBUSxPQUFPLElBQUksTUFBTSxvQkFBb0IsQ0FBQztVQUN6RDtBQUVBLGdCQUFNLElBQUksVUFBVSxtQkFBbUI7UUFDM0M7UUFFQSxPQUFJO0FBQ0EsaUJBQU8sS0FBSyxLQUFJLEVBQUcsS0FBSyxLQUFLLEtBQUs7UUFDdEM7O0FBSUosVUFBTSxVQUFVLG9CQUFJLElBQUksQ0FBQyxPQUFPLFFBQVEsTUFBTSxDQUFDO0FBRS9DLGVBQVMsZ0JBQWdCLFFBQWM7QUFDbkMsaUJBQVMsT0FBTyxZQUFXO0FBQzNCLFlBQUksQ0FBQyxRQUFRLElBQUksTUFBTSxHQUFHO0FBQ3RCLGdCQUFNLElBQUksTUFBTSxrREFBa0QsTUFBTSxFQUFFO1FBQzlFO0FBQ0EsZUFBTztNQUNYO0FBVUEsVUFBYSxVQUFiLGNBQTZCLEtBQUk7UUFTN0IsWUFBWSxLQUFhLFNBQXdCO0FBQzdDLGdCQUFLO0FBRUwsb0JBQVUsV0FBVyxDQUFBO0FBQ3JCLGVBQUssTUFBTTtBQUVYLGVBQUssY0FBYyxRQUFRLGVBQWU7QUFDMUMsZUFBSyxVQUFVLElBQUlBLFNBQVEsUUFBUSxPQUFPO0FBQzFDLGVBQUssU0FBUyxnQkFBZ0IsUUFBUSxVQUFVLEtBQUs7QUFDckQsZUFBSyxPQUFPLFFBQVEsUUFBUTtBQUM1QixlQUFLLFdBQVc7QUFFaEIsZUFBSyxLQUFLLFdBQVcsU0FBUyxLQUFLLFdBQVcsV0FBVyxRQUFRLE1BQU07QUFDbkUsa0JBQU0sSUFBSSxVQUFVLDJDQUEyQztVQUNuRTtBQUVBLGVBQUssWUFBWSxRQUFRO1FBQzdCO1FBRUEsSUFBYyxPQUFJO0FBQ2QsaUJBQU8sS0FBSztRQUNoQjtRQUVBLElBQUksVUFBTztBQUNQLGlCQUFPLEtBQUs7UUFDaEI7O0FBbENKLGNBQUEsVUFBQTtBQXFDQSxlQUFTLFFBQVEsaUJBQXVCO0FBQ3BDLGNBQU0sT0FBTyxJQUFJQSxTQUFPO0FBQ3hCLGNBQU0sUUFBUSxnQkFBZ0IsS0FBSSxFQUFHLE1BQU0sSUFBSTtBQUMvQyxtQkFBVyxVQUFVLE9BQU87QUFDeEIsZ0JBQU0sUUFBUSxPQUFPLEtBQUksRUFBRyxNQUFNLEdBQUc7QUFDckMsZ0JBQU0sTUFBTSxNQUFNLE1BQUssRUFBSSxLQUFJO0FBQy9CLGdCQUFNLFFBQVEsTUFBTSxLQUFLLEdBQUcsRUFBRSxLQUFJO0FBQ2xDLGVBQUssT0FBTyxLQUFLLEtBQUs7UUFDMUI7QUFDQSxlQUFPO01BQ1g7QUFFQSxVQUFhLFdBQWIsY0FBOEIsS0FBSTtRQVE5QixZQUE2QixVQUF3QztBQUNqRSxnQkFBSztBQURvQixlQUFBLFdBQUE7QUFHekIsZUFBSyxPQUFPO0FBQ1osZUFBSyxTQUFTLFNBQVM7QUFDdkIsZUFBSyxLQUFLLEtBQUssVUFBVSxPQUFPLEtBQUssU0FBUztBQUM5QyxlQUFLLGFBQWEsU0FBUztBQUMzQixlQUFLLFVBQVUsUUFBUSxTQUFTLGVBQWU7QUFDL0MsZUFBSyxNQUFNLFlBQVksU0FBUyxVQUFVLFNBQVMsaUJBQWlCLEtBQUssT0FBTyxLQUFLO1FBQ3pGO1FBRUEsSUFBYyxPQUFJO0FBQ2QsaUJBQU8sS0FBSyxTQUFTO1FBQ3pCO1FBRUEsT0FBSTtBQUNBLGNBQUksS0FBSyxXQUFXO0FBQ2hCLG1CQUFPLFFBQVEsT0FBTyxJQUFJLFVBQVUsNEJBQTRCLENBQUM7VUFDckU7QUFDQSxlQUFLLFlBQVk7QUFFakIsaUJBQU8sUUFBUSxRQUFRLEtBQUssU0FBUyxZQUFZO1FBQ3JEOztBQTlCSixjQUFBLFdBQUE7QUFpQ0EsZUFBUyxZQUFZLFVBQWtCLGdCQUF3QixhQUFvQjtBQUMvRSxZQUFJLFVBQVU7QUFDVixpQkFBTztRQUNYO0FBR0EsWUFBSSxtQkFBbUIsS0FBSyxjQUFjLEdBQUc7QUFDekMsaUJBQU8sWUFBWSxJQUFJLGVBQWU7UUFDMUM7QUFFQSxlQUFPO01BQ1g7QUFFQSxlQUFnQkQsVUFBUyxPQUF5QixNQUFxQjtBQUNuRSxZQUFJO0FBQ0osWUFBSSxpQkFBaUIsU0FBUztBQUMxQixjQUFJLE1BQU07QUFDTixzQkFBVSxJQUFJLFFBQVEsTUFBTSxLQUFLLElBQUk7VUFDekMsT0FBTztBQUNILHNCQUFVO1VBQ2Q7UUFDSixPQUFPO0FBQ0gsb0JBQVUsSUFBSSxRQUFRLE9BQU8sSUFBSTtRQUNyQztBQUVBLFlBQUksQ0FBQyxDQUFDLE9BQU8sUUFBUSxNQUFNLEVBQUUsU0FBUyxRQUFRLE1BQU0sR0FBRztBQUNuRCxnQkFBTSxJQUFJLE1BQU0sMENBQTBDO1FBQzlEO0FBRUEsZUFBTyxJQUFJLFFBQVEsQ0FBQyxTQUFTLFdBQVU7QUFDbkMsZ0JBQU0sYUFBcUQsQ0FBQTtBQUUzRCxxQkFBVyxTQUFTLFFBQVE7QUFDNUIscUJBQVcsZUFBZTtBQUMxQixxQkFBVyxNQUFNLFFBQVE7QUFNekIscUJBQVcsU0FBUyxVQUFPO0FBQ3ZCLGtCQUFNLFNBQVMsS0FBSztBQUNwQixnQkFBSSxTQUFTLE9BQU8sU0FBUyxLQUFLO0FBQzlCLHFCQUFPLElBQUksVUFBVSx1Q0FBdUMsTUFBTSxFQUFFLENBQUM7QUFDckU7WUFDSjtBQUVBLG9CQUFRLElBQUksU0FBUyxJQUFJLENBQUM7VUFDOUI7QUFHQSxxQkFBVyxVQUFVLFdBQVE7QUFDekIsbUJBQU8sSUFBSSxVQUFVLDJCQUEyQixNQUFNLEtBQUssSUFBSTtjQUMzRCxPQUFPO2FBQ1YsQ0FBQztVQUNOO0FBRUEsZ0JBQU1FLFdBQWtDLENBQUE7QUFDeEMscUJBQVcsQ0FBQyxNQUFNLEtBQUssS0FBSyxRQUFRLFNBQVM7QUFDekMsWUFBQUEsU0FBUSxJQUFJLElBQUk7VUFDcEI7QUFDQSxxQkFBVyxVQUFVQTtBQUVyQixjQUFJLE9BQU8sUUFBUSxZQUFZLGFBQWE7QUFDeEMsdUJBQVcsT0FBTyxRQUFRO1VBQzlCO0FBRUEsNEJBQWtCLFVBQTJDO1FBYWpFLENBQUM7TUFDTDs7Ozs7Ozs7OztBQ2xiYSxjQUFBLGlCQUFpQjtBQU1qQixjQUFBLGtCQUFrQjtRQUM3QjtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTs7UUFFQTs7OztBQXdCSyxVQUFNLG9CQUFvQixDQUFDLFdBQXdCO0FBRXhELFlBQUksQ0FBQyxtQkFBbUIsS0FBSyxNQUFNLEdBQUc7QUFDcEMsZ0JBQU0sSUFBSSxtQkFDUiwrRUFBK0U7UUFFbkY7QUFFQSxZQUFJLE9BQU8sU0FBUyxLQUFLO0FBQ3ZCLGdCQUFNLElBQUksbUJBQW1CLG9DQUFvQztRQUNuRTtBQUNBLGNBQU0sU0FBUyxPQUFPLE1BQU0sR0FBRztBQUMvQixZQUFJLE9BQU8sU0FBUyxHQUFHO0FBQ3JCLGdCQUFNLElBQUksbUJBQW1CLHdDQUF3QztRQUN2RTtBQUNBLGlCQUFTLElBQUksR0FBRyxJQUFJLE9BQU8sUUFBUSxLQUFLO0FBQ3RDLGdCQUFNLElBQUksT0FBTyxDQUFDO0FBQ2xCLGNBQUksRUFBRSxTQUFTLEdBQUc7QUFDaEIsa0JBQU0sSUFBSSxtQkFBbUIsK0JBQStCO1VBQzlEO0FBQ0EsY0FBSSxFQUFFLFNBQVMsSUFBSTtBQUNqQixrQkFBTSxJQUFJLG1CQUFtQixxQ0FBcUM7VUFDcEU7QUFDQSxjQUFJLEVBQUUsU0FBUyxHQUFHLEtBQUssRUFBRSxXQUFXLEdBQUcsR0FBRztBQUN4QyxrQkFBTSxJQUFJLG1CQUNSLGdEQUFnRDtVQUVwRDtBQUNBLGNBQUksSUFBSSxNQUFNLE9BQU8sVUFBVSxDQUFDLFlBQVksS0FBSyxDQUFDLEdBQUc7QUFDbkQsa0JBQU0sSUFBSSxtQkFDUiwyREFBMkQ7VUFFL0Q7UUFDRjtNQUNGO0FBbENhLGNBQUEsb0JBQWlCO0FBcUN2QixVQUFNLHlCQUF5QixDQUFDLFdBQXdCO0FBQzdELFlBQ0UsQ0FBQyw2RkFBNkYsS0FDNUYsTUFBTSxHQUVSO0FBQ0EsZ0JBQU0sSUFBSSxtQkFBbUIsa0NBQWtDO1FBQ2pFO0FBQ0EsWUFBSSxPQUFPLFNBQVMsS0FBSztBQUN2QixnQkFBTSxJQUFJLG1CQUFtQixvQ0FBb0M7UUFDbkU7TUFDRjtBQVhhLGNBQUEseUJBQXNCO0FBYTVCLFVBQU0sa0JBQWtCLENBQUMsV0FBMEI7QUFDeEQsZUFBTyxPQUFPLFlBQVc7TUFDM0I7QUFGYSxjQUFBLGtCQUFlO0FBSXJCLFVBQU0sZ0NBQWdDLENBQUMsV0FBMEI7QUFDdEUsY0FBTSxjQUFhLEdBQUEsUUFBQSxpQkFBZ0IsTUFBTTtBQUN6QyxTQUFBLEdBQUEsUUFBQSxtQkFBa0IsVUFBVTtBQUM1QixlQUFPO01BQ1Q7QUFKYSxjQUFBLGdDQUE2QjtBQU1uQyxVQUFNLGdCQUFnQixDQUFDLFdBQTJCO0FBQ3ZELFlBQUk7QUFDRixXQUFBLEdBQUEsUUFBQSxtQkFBa0IsTUFBTTtRQUMxQixTQUFTLEtBQUs7QUFDWixjQUFJLGVBQWUsb0JBQW9CO0FBQ3JDLG1CQUFPO1VBQ1Q7QUFDQSxnQkFBTTtRQUNSO0FBRUEsZUFBTztNQUNUO0FBWGEsY0FBQSxnQkFBYTtBQWFuQixVQUFNLGFBQWEsQ0FBQyxXQUEyQjtBQUNwRCxlQUFPLENBQUMsUUFBQSxnQkFBZ0IsS0FBSyxDQUFDLFdBQVcsT0FBTyxTQUFTLE1BQU0sQ0FBQztNQUNsRTtBQUZhLGNBQUEsYUFBVTtBQUl2QixVQUFhLHFCQUFiLGNBQXdDLE1BQUs7O0FBQTdDLGNBQUEscUJBQUE7QUFDQSxVQUFhLHNCQUFiLGNBQXlDLE1BQUs7O0FBQTlDLGNBQUEsc0JBQUE7QUFDQSxVQUFhLHlCQUFiLGNBQTRDLE1BQUs7O0FBQWpELGNBQUEseUJBQUE7QUFDQSxVQUFhLHdCQUFiLGNBQTJDLE1BQUs7O0FBQWhELGNBQUEsd0JBQUE7Ozs7Ozs7Ozs7QUMxR08sVUFBTSxpQkFBaUIsQ0FBQyxRQUFxQjtBQUNsRCxZQUFJLENBQUMsSUFBSSxXQUFXLE1BQU0sR0FBRztBQUMzQixnQkFBTSxJQUFJLGdCQUFnQiw0QkFBNEI7UUFDeEQ7QUFHQSxZQUFJLENBQUMsc0JBQXNCLEtBQUssR0FBRyxHQUFHO0FBQ3BDLGdCQUFNLElBQUksZ0JBQ1IsMEZBQTBGO1FBRTlGO0FBRUEsY0FBTSxFQUFFLFFBQVEsR0FBRyxPQUFNLElBQUssSUFBSSxNQUFNLEdBQUc7QUFDM0MsWUFBSSxTQUFTLEdBQUc7QUFDZCxnQkFBTSxJQUFJLGdCQUNSLDBEQUEwRDtRQUU5RDtBQUVBLFlBQUksQ0FBQyxXQUFXLEtBQUssTUFBTSxHQUFHO0FBQzVCLGdCQUFNLElBQUksZ0JBQWdCLHVDQUF1QztRQUNuRTtBQUVBLFlBQUksSUFBSSxTQUFTLEdBQUcsS0FBSyxJQUFJLFNBQVMsR0FBRyxHQUFHO0FBQzFDLGdCQUFNLElBQUksZ0JBQWdCLGlDQUFpQztRQUM3RDtBQUVBLFlBQUksSUFBSSxTQUFTLElBQUksTUFBTTtBQUN6QixnQkFBTSxJQUFJLGdCQUFnQixrQ0FBa0M7UUFDOUQ7TUFDRjtBQTlCYSxjQUFBLGlCQUFjO0FBZ0NwQixVQUFNLHNCQUFzQixDQUFDLFFBQXFCO0FBR3ZELFlBQUksQ0FBQywrQ0FBK0MsS0FBSyxHQUFHLEdBQUc7QUFDN0QsZ0JBQU0sSUFBSSxnQkFBZ0IsK0JBQStCO1FBQzNEO0FBRUEsWUFBSSxJQUFJLFNBQVMsSUFBSSxNQUFNO0FBQ3pCLGdCQUFNLElBQUksZ0JBQWdCLGtDQUFrQztRQUM5RDtNQUNGO0FBVmEsY0FBQSxzQkFBbUI7QUFZaEMsVUFBYSxrQkFBYixjQUFxQyxNQUFLOztBQUExQyxjQUFBLGtCQUFBOzs7Ozs7Ozs7O0FDNUNBLFVBQWEsT0FBYixNQUFhLE1BQUk7UUFHZixPQUFPLE1BQU0sTUFBWTtBQUN2QixpQkFBTyxJQUFJLE1BQUssSUFBSTtRQUN0QjtRQUVBLE9BQU8sT0FBTyxXQUFtQixNQUFZO0FBQzNDLGdCQUFNLFdBQVcsQ0FBQyxHQUFHLFVBQVUsTUFBTSxHQUFHLEVBQUUsUUFBTyxHQUFJLElBQUksRUFBRSxLQUFLLEdBQUc7QUFDbkUsaUJBQU8sSUFBSSxNQUFLLFFBQVE7UUFDMUI7UUFFQSxPQUFPLFFBQVEsTUFBWTtBQUN6QixjQUFJO0FBQ0Ysa0JBQUssTUFBTSxJQUFJO0FBQ2YsbUJBQU87VUFDVCxTQUFTLEdBQUc7QUFDVixtQkFBTztVQUNUO1FBQ0Y7UUFFQSxZQUFZLE1BQVk7QUFwQnhCLGlCQUFBLGVBQUEsTUFBQSxZQUFBOzs7O21CQUFxQixDQUFBOztBQXFCbkIsV0FBQSxHQUFBLFFBQUEsaUJBQWdCLElBQUk7QUFDcEIsZUFBSyxXQUFXLEtBQUssTUFBTSxHQUFHO1FBQ2hDO1FBRUEsSUFBSSxZQUFTO0FBQ1gsaUJBQU8sS0FBSyxTQUNULE1BQU0sR0FBRyxLQUFLLFNBQVMsU0FBUyxDQUFDLEVBQ2pDLFFBQU8sRUFDUCxLQUFLLEdBQUc7UUFDYjtRQUVBLElBQUksT0FBSTtBQUNOLGlCQUFPLEtBQUssU0FBUyxHQUFHLEtBQUssU0FBUyxTQUFTLENBQUM7UUFDbEQ7UUFFQSxXQUFRO0FBQ04saUJBQU8sS0FBSyxTQUFTLEtBQUssR0FBRztRQUMvQjs7QUF2Q0YsY0FBQSxPQUFBO0FBNkNPLFVBQU0sa0JBQWtCLENBQUMsU0FBc0I7QUFDcEQsY0FBTSxVQUFVO0FBR2hCLFlBQUksQ0FBQyxtQkFBbUIsS0FBSyxPQUFPLEdBQUc7QUFDckMsZ0JBQU0sSUFBSSxpQkFDUiw2RUFBNkU7UUFFakY7QUFFQSxZQUFJLFFBQVEsU0FBUyxNQUFNLElBQUksSUFBSTtBQUNqQyxnQkFBTSxJQUFJLGlCQUFpQixrQ0FBa0M7UUFDL0Q7QUFDQSxjQUFNLFNBQVMsUUFBUSxNQUFNLEdBQUc7QUFDaEMsWUFBSSxPQUFPLFNBQVMsR0FBRztBQUNyQixnQkFBTSxJQUFJLGlCQUFpQixpQ0FBaUM7UUFDOUQ7QUFDQSxpQkFBUyxJQUFJLEdBQUcsSUFBSSxPQUFPLFFBQVEsS0FBSztBQUN0QyxnQkFBTSxJQUFJLE9BQU8sQ0FBQztBQUNsQixjQUFJLEVBQUUsU0FBUyxHQUFHO0FBQ2hCLGtCQUFNLElBQUksaUJBQWlCLDZCQUE2QjtVQUMxRDtBQUNBLGNBQUksRUFBRSxTQUFTLElBQUk7QUFDakIsa0JBQU0sSUFBSSxpQkFBaUIsbUNBQW1DO1VBQ2hFO0FBQ0EsY0FBSSxFQUFFLFNBQVMsR0FBRyxLQUFLLEVBQUUsV0FBVyxHQUFHLEdBQUc7QUFDeEMsa0JBQU0sSUFBSSxpQkFBaUIsNkNBQTZDO1VBQzFFO0FBQ0EsY0FBSSxTQUFTLEtBQUssQ0FBQyxLQUFLLE1BQU0sR0FBRztBQUMvQixrQkFBTSxJQUFJLGlCQUFpQiw0Q0FBNEM7VUFDekU7QUFDQSxjQUFJLENBQUMsY0FBYyxLQUFLLENBQUMsS0FBSyxJQUFJLE1BQU0sT0FBTyxRQUFRO0FBQ3JELGtCQUFNLElBQUksaUJBQWlCLHFDQUFxQztVQUNsRTtRQUNGO01BQ0Y7QUFuQ2EsY0FBQSxrQkFBZTtBQXFDckIsVUFBTSx1QkFBdUIsQ0FBQyxTQUFzQjtBQUd6RCxZQUNFLENBQUMsa0lBQWtJLEtBQ2pJLElBQUksR0FFTjtBQUNBLGdCQUFNLElBQUksaUJBQWlCLGdDQUFnQztRQUM3RDtBQUNBLFlBQUksS0FBSyxTQUFTLE1BQU0sSUFBSSxJQUFJO0FBQzlCLGdCQUFNLElBQUksaUJBQWlCLGtDQUFrQztRQUMvRDtNQUNGO0FBYmEsY0FBQSx1QkFBb0I7QUFlakMsVUFBYSxtQkFBYixjQUFzQyxNQUFLOztBQUEzQyxjQUFBLG1CQUFBOzs7Ozs7Ozs7O0FDOUdBLFVBQUEsV0FBQTtBQUNBLFVBQUEsUUFBQTtBQUNBLFVBQUEsU0FBQTtBQWVPLFVBQU0sbUJBQW1CLENBQUMsUUFBZTtBQUU5QyxjQUFNLFdBQVcsSUFBSSxNQUFNLEdBQUc7QUFDOUIsWUFBSSxTQUFTLFNBQVMsR0FBRztBQUN2QixnQkFBTSxJQUFJLE1BQU0seURBQXlEO1FBQzNFO0FBQ0EsY0FBTSxlQUFlLFNBQVMsQ0FBQyxLQUFLO0FBQ3BDLGNBQU0sU0FBUyxDQUFDO0FBR2hCLFlBQUksQ0FBQyxvQ0FBb0MsS0FBSyxHQUFHLEdBQUc7QUFDbEQsZ0JBQU0sSUFBSSxNQUFNLHdDQUF3QztRQUMxRDtBQUVBLGNBQU0sUUFBUSxJQUFJLE1BQU0sR0FBRztBQUMzQixZQUFJLE1BQU0sVUFBVSxNQUFNLE1BQU0sQ0FBQyxNQUFNLFNBQVMsTUFBTSxDQUFDLEVBQUUsV0FBVyxJQUFJO0FBQ3RFLGdCQUFNLElBQUksTUFBTSwrQkFBK0I7UUFDakQ7QUFDQSxZQUFJLE1BQU0sU0FBUyxHQUFHO0FBQ3BCLGdCQUFNLElBQUksTUFBTSx1REFBdUQ7UUFDekU7QUFFQSxZQUFJO0FBQ0YsY0FBSSxNQUFNLENBQUMsRUFBRSxXQUFXLE1BQU0sR0FBRztBQUMvQixhQUFBLEdBQUEsTUFBQSxnQkFBZSxNQUFNLENBQUMsQ0FBQztVQUN6QixPQUFPO0FBQ0wsYUFBQSxHQUFBLFNBQUEsbUJBQWtCLE1BQU0sQ0FBQyxDQUFDO1VBQzVCO1FBQ0YsUUFBUTtBQUNOLGdCQUFNLElBQUksTUFBTSwrQ0FBK0M7UUFDakU7QUFFQSxZQUFJLE1BQU0sVUFBVSxHQUFHO0FBQ3JCLGNBQUksTUFBTSxDQUFDLEVBQUUsV0FBVyxHQUFHO0FBQ3pCLGtCQUFNLElBQUksTUFDUixtRUFBbUU7VUFFdkU7QUFDQSxjQUFJO0FBQ0YsYUFBQSxHQUFBLE9BQUEsaUJBQWdCLE1BQU0sQ0FBQyxDQUFDO1VBQzFCLFFBQVE7QUFDTixrQkFBTSxJQUFJLE1BQ1Isa0VBQWtFO1VBRXRFO1FBQ0Y7QUFFQSxZQUFJLE1BQU0sVUFBVSxHQUFHO0FBQ3JCLGNBQUksTUFBTSxDQUFDLEVBQUUsV0FBVyxHQUFHO0FBQ3pCLGtCQUFNLElBQUksTUFDUiw0RUFBNEU7VUFFaEY7UUFFRjtBQUVBLFlBQUksTUFBTSxVQUFVLEdBQUc7QUFDckIsZ0JBQU0sSUFBSSxNQUNSLDhEQUE4RDtRQUVsRTtBQUVBLFlBQUksU0FBUyxVQUFVLEtBQUssZ0JBQWdCLE1BQU07QUFDaEQsZ0JBQU0sSUFBSSxNQUFNLHVEQUF1RDtRQUN6RTtBQUVBLFlBQUksZ0JBQWdCLE1BQU07QUFDeEIsY0FBSSxhQUFhLFdBQVcsS0FBSyxhQUFhLENBQUMsTUFBTSxLQUFLO0FBQ3hELGtCQUFNLElBQUksTUFBTSx1REFBdUQ7VUFDekU7QUFFQSxjQUFJLENBQUMseUNBQXlDLEtBQUssWUFBWSxHQUFHO0FBQ2hFLGtCQUFNLElBQUksTUFBTSxpREFBaUQ7VUFDbkU7UUFDRjtBQUVBLFlBQUksSUFBSSxTQUFTLElBQUksTUFBTTtBQUN6QixnQkFBTSxJQUFJLE1BQU0sdUJBQXVCO1FBQ3pDO01BQ0Y7QUEvRWEsY0FBQSxtQkFBZ0I7QUFpRnRCLFVBQU0sd0JBQXdCLENBQUMsUUFBcUI7QUFHekQsY0FBTSxhQUNKO0FBQ0YsY0FBTSxLQUFLLElBQUksTUFBTSxVQUFVO0FBQy9CLFlBQUksQ0FBQyxNQUFNLENBQUMsR0FBRyxRQUFRO0FBQ3JCLGdCQUFNLElBQUksTUFBTSxpQ0FBaUM7UUFDbkQ7QUFDQSxjQUFNLFNBQVMsR0FBRztBQUVsQixZQUFJO0FBQ0YsV0FBQSxHQUFBLFNBQUEsd0JBQXVCLE9BQU8sU0FBUztRQUN6QyxRQUFRO0FBQ04sY0FBSTtBQUNGLGFBQUEsR0FBQSxNQUFBLHFCQUFvQixPQUFPLFNBQVM7VUFDdEMsUUFBUTtBQUNOLGtCQUFNLElBQUksTUFBTSwrQ0FBK0M7VUFDakU7UUFDRjtBQUVBLFlBQUksT0FBTyxZQUFZO0FBQ3JCLGNBQUk7QUFDRixhQUFBLEdBQUEsT0FBQSxzQkFBcUIsT0FBTyxVQUFVO1VBQ3hDLFFBQVE7QUFDTixrQkFBTSxJQUFJLE1BQU0sb0RBQW9EO1VBQ3RFO1FBQ0Y7QUFFQSxZQUFJLElBQUksU0FBUyxJQUFJLE1BQU07QUFDekIsZ0JBQU0sSUFBSSxNQUFNLHVCQUF1QjtRQUN6QztNQUNGO0FBaENhLGNBQUEsd0JBQXFCOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQ2xHbEMsbUJBQUEsNEJBQUEsT0FBQTtBQUVhLGNBQUE7TUFFWDtBQUVGLFVBQU0saUJBQWlCO0FBRXZCLFVBQWFDLFNBQWIsTUFBYSxPQUFLO1FBTWhCLFlBQVksS0FBYSxNQUFhO0FBTHRDLGlCQUFBLGVBQUEsTUFBQSxRQUFBOzs7Ozs7QUFDQSxpQkFBQSxlQUFBLE1BQUEsUUFBQTs7Ozs7O0FBQ0EsaUJBQUEsZUFBQSxNQUFBLFlBQUE7Ozs7OztBQUNBLGlCQUFBLGVBQUEsTUFBQSxnQkFBQTs7Ozs7O0FBR0UsY0FBSTtBQUNKLGNBQUksTUFBTTtBQUNSLHFCQUFTLE1BQU0sSUFBSTtBQUNuQixnQkFBSSxDQUFDLFFBQVE7QUFDWCxvQkFBTSxJQUFJLE1BQU0sbUJBQW1CLElBQUksRUFBRTtZQUMzQztBQUNBLGtCQUFNLFlBQVksY0FBYyxHQUFHO0FBQ25DLGdCQUFJLENBQUMsV0FBVztBQUNkLG9CQUFNLElBQUksTUFBTSxpQkFBaUIsR0FBRyxFQUFFO1lBQ3hDO0FBQ0EsbUJBQU8sT0FBTyxRQUFRLFNBQVM7VUFDakMsT0FBTztBQUNMLHFCQUFTLE1BQU0sR0FBRztBQUNsQixnQkFBSSxDQUFDLFFBQVE7QUFDWCxvQkFBTSxJQUFJLE1BQU0sbUJBQW1CLEdBQUcsRUFBRTtZQUMxQztVQUNGO0FBRUEsZUFBSyxPQUFPLE9BQU87QUFDbkIsZUFBSyxPQUFPLE9BQU87QUFDbkIsZUFBSyxXQUFXLE9BQU87QUFDdkIsZUFBSyxlQUFlLE9BQU87UUFDN0I7UUFFQSxPQUFPLEtBQUssYUFBcUIsWUFBcUIsTUFBYTtBQUNqRSxjQUFJLE1BQU07QUFDVixjQUFJO0FBQVksbUJBQU8sTUFBTTtBQUM3QixjQUFJO0FBQU0sbUJBQU8sTUFBTTtBQUN2QixpQkFBTyxJQUFJLE9BQU0sR0FBRztRQUN0QjtRQUVBLElBQUksV0FBUTtBQUNWLGlCQUFPO1FBQ1Q7UUFFQSxJQUFJLFNBQU07QUFDUixpQkFBTyxRQUFRLEtBQUssSUFBSTtRQUMxQjtRQUVBLElBQUksV0FBUTtBQUNWLGlCQUFPLEtBQUs7UUFDZDtRQUVBLElBQUksU0FBUyxHQUFTO0FBQ3BCLGVBQUssT0FBTztRQUNkO1FBRUEsSUFBSSxTQUFNO0FBQ1IsaUJBQU8sS0FBSyxhQUFhLFNBQVE7UUFDbkM7UUFFQSxJQUFJLE9BQU8sR0FBUztBQUNsQixlQUFLLGVBQWUsSUFBSSxnQkFBZ0IsQ0FBQztRQUMzQztRQUVBLElBQUksYUFBVTtBQUNaLGlCQUFPLEtBQUssU0FBUyxNQUFNLEdBQUcsRUFBRSxPQUFPLE9BQU8sRUFBRSxDQUFDLEtBQUs7UUFDeEQ7UUFFQSxJQUFJLFdBQVcsR0FBUztBQUN0QixnQkFBTSxRQUFRLEtBQUssU0FBUyxNQUFNLEdBQUcsRUFBRSxPQUFPLE9BQU87QUFDckQsZ0JBQU0sQ0FBQyxJQUFJO0FBQ1gsZUFBSyxXQUFXLE1BQU0sS0FBSyxHQUFHO1FBQ2hDO1FBRUEsSUFBSSxPQUFJO0FBQ04saUJBQU8sS0FBSyxTQUFTLE1BQU0sR0FBRyxFQUFFLE9BQU8sT0FBTyxFQUFFLENBQUMsS0FBSztRQUN4RDtRQUVBLElBQUksS0FBSyxHQUFTO0FBQ2hCLGdCQUFNLFFBQVEsS0FBSyxTQUFTLE1BQU0sR0FBRyxFQUFFLE9BQU8sT0FBTztBQUNyRCxjQUFJLENBQUMsTUFBTSxDQUFDO0FBQUcsa0JBQU0sQ0FBQyxJQUFJO0FBQzFCLGdCQUFNLENBQUMsSUFBSTtBQUNYLGVBQUssV0FBVyxNQUFNLEtBQUssR0FBRztRQUNoQztRQUVBLElBQUksT0FBSTtBQUNOLGlCQUFPLEtBQUssU0FBUTtRQUN0QjtRQUVBLFdBQVE7QUFDTixjQUFJLE9BQU8sS0FBSyxZQUFZO0FBQzVCLGNBQUksQ0FBQyxLQUFLLFdBQVcsR0FBRyxHQUFHO0FBQ3pCLG1CQUFPLElBQUksSUFBSTtVQUNqQjtBQUNBLGNBQUksS0FBSyxLQUFLLGFBQWEsU0FBUTtBQUNuQyxjQUFJLE1BQU0sQ0FBQyxHQUFHLFdBQVcsR0FBRyxHQUFHO0FBQzdCLGlCQUFLLElBQUksRUFBRTtVQUNiO0FBQ0EsY0FBSSxPQUFPLEtBQUs7QUFDaEIsY0FBSSxRQUFRLENBQUMsS0FBSyxXQUFXLEdBQUcsR0FBRztBQUNqQyxtQkFBTyxJQUFJLElBQUk7VUFDakI7QUFDQSxpQkFBTyxRQUFRLEtBQUssSUFBSSxHQUFHLElBQUksR0FBRyxFQUFFLEdBQUcsSUFBSTtRQUM3Qzs7QUFyR0YsY0FBQSxRQUFBQTtBQXdHQSxlQUFTLE1BQU0sS0FBVztBQUN4QixjQUFNLFFBQVEsUUFBQSxjQUFjLEtBQUssR0FBRztBQUNwQyxZQUFJLE9BQU87QUFDVCxpQkFBTztZQUNMLE1BQU0sTUFBTSxDQUFDLEtBQUs7WUFDbEIsTUFBTSxNQUFNLENBQUMsS0FBSztZQUNsQixVQUFVLE1BQU0sQ0FBQyxLQUFLO1lBQ3RCLGNBQWMsSUFBSSxnQkFBZ0IsTUFBTSxDQUFDLEtBQUssRUFBRTs7UUFFcEQ7QUFDQSxlQUFPO01BQ1Q7QUFFQSxlQUFTLGNBQWMsS0FBVztBQUNoQyxjQUFNLFFBQVEsZUFBZSxLQUFLLEdBQUc7QUFDckMsWUFBSSxPQUFPO0FBQ1QsaUJBQU87WUFDTCxNQUFNLE1BQU0sQ0FBQyxLQUFLO1lBQ2xCLFVBQVUsTUFBTSxDQUFDLEtBQUs7WUFDdEIsY0FBYyxJQUFJLGdCQUFnQixNQUFNLENBQUMsS0FBSyxFQUFFOztRQUVwRDtBQUNBLGVBQU87TUFDVDs7Ozs7Ozs7OztBQ3ZJTyxVQUFNLGlCQUFpQixDQUFDLFFBQXFCO0FBQ2xELFlBQUksSUFBSSxXQUFXLElBQUk7QUFDckIsZ0JBQU0sSUFBSSxnQkFBZ0IsMkJBQTJCO1FBQ3ZEO0FBRUEsWUFBSSxDQUFDLDZEQUE2RCxLQUFLLEdBQUcsR0FBRztBQUMzRSxnQkFBTSxJQUFJLGdCQUFnQiw4QkFBOEI7UUFDMUQ7TUFDRjtBQVJhLGNBQUEsaUJBQWM7QUFVcEIsVUFBTSxhQUFhLENBQUMsUUFBd0I7QUFDakQsWUFBSTtBQUNGLFdBQUEsR0FBQSxRQUFBLGdCQUFlLEdBQUc7UUFDcEIsU0FBUyxLQUFLO0FBQ1osY0FBSSxlQUFlLGlCQUFpQjtBQUNsQyxtQkFBTztVQUNUO0FBQ0EsZ0JBQU07UUFDUjtBQUVBLGVBQU87TUFDVDtBQVhhLGNBQUEsYUFBVTtBQWF2QixVQUFhLGtCQUFiLGNBQXFDLE1BQUs7O0FBQTFDLGNBQUEsa0JBQUE7Ozs7Ozs7Ozs7QUN2Qk8sVUFBTSx1QkFBdUIsQ0FBQyxTQUFzQjtBQUN6RCxZQUFJLEtBQUssU0FBUyxPQUFPLEtBQUssU0FBUyxHQUFHO0FBQ3hDLGdCQUFNLElBQUksc0JBQXNCLHdDQUF3QztRQUMxRTtBQUVBLFlBQUksQ0FBQyw0QkFBNEIsS0FBSyxJQUFJLEdBQUc7QUFDM0MsZ0JBQU0sSUFBSSxzQkFBc0IscUNBQXFDO1FBQ3ZFO0FBQ0EsWUFBSSxTQUFTLE9BQU8sU0FBUztBQUMzQixnQkFBTSxJQUFJLHNCQUFzQixtQ0FBbUM7TUFDdkU7QUFWYSxjQUFBLHVCQUFvQjtBQVkxQixVQUFNLG1CQUFtQixDQUFDLFNBQXlCO0FBQ3hELFlBQUk7QUFDRixXQUFBLEdBQUEsUUFBQSxzQkFBcUIsSUFBSTtRQUMzQixTQUFTLEtBQUs7QUFDWixjQUFJLGVBQWUsdUJBQXVCO0FBQ3hDLG1CQUFPO1VBQ1Q7QUFDQSxnQkFBTTtRQUNSO0FBRUEsZUFBTztNQUNUO0FBWGEsY0FBQSxtQkFBZ0I7QUFhN0IsVUFBYSx3QkFBYixjQUEyQyxNQUFLOztBQUFoRCxjQUFBLHdCQUFBOzs7Ozs7Ozs7O0FDdEJPLFVBQU0sc0JBQXNCLENBQUMsVUFBdUI7QUFDekQsY0FBTSxPQUFPLElBQUksS0FBSyxLQUFLO0FBRTNCLFlBQUksTUFBTSxLQUFLLFFBQU8sQ0FBRSxHQUFHO0FBQ3pCLGdCQUFNLElBQUkscUJBQXFCLG9DQUFvQztRQUNyRTtBQUNBLFlBQUksS0FBSyxZQUFXLEVBQUcsV0FBVyxHQUFHLEdBQUc7QUFDdEMsZ0JBQU0sSUFBSSxxQkFBcUIsd0NBQXdDO1FBQ3pFO0FBRUEsWUFDRSxDQUFDLGlIQUFpSCxLQUNoSCxLQUFLLEdBRVA7QUFDQSxnQkFBTSxJQUFJLHFCQUFxQixvQ0FBb0M7UUFDckU7QUFDQSxZQUFJLE1BQU0sU0FBUyxJQUFJO0FBQ3JCLGdCQUFNLElBQUkscUJBQXFCLHFDQUFxQztRQUN0RTtBQUNBLFlBQUksTUFBTSxTQUFTLFFBQVEsR0FBRztBQUM1QixnQkFBTSxJQUFJLHFCQUNSLGdEQUFnRDtRQUVwRDtBQUNBLFlBQUksTUFBTSxXQUFXLEtBQUssR0FBRztBQUMzQixnQkFBTSxJQUFJLHFCQUFxQiw0Q0FBNEM7UUFDN0U7TUFDRjtBQTVCYSxjQUFBLHNCQUFtQjtBQWdDekIsVUFBTSxrQkFBa0IsQ0FBQyxVQUEwQjtBQUN4RCxZQUFJO0FBQ0YsV0FBQSxHQUFBLFFBQUEscUJBQW9CLEtBQUs7UUFDM0IsU0FBUyxLQUFLO0FBQ1osY0FBSSxlQUFlLHNCQUFzQjtBQUN2QyxtQkFBTztVQUNUO0FBQ0EsZ0JBQU07UUFDUjtBQUVBLGVBQU87TUFDVDtBQVhhLGNBQUEsa0JBQWU7QUF1QnJCLFVBQU0sb0JBQW9CLENBQUMsVUFBeUI7QUFDekQsYUFBSSxHQUFBLFFBQUEsaUJBQWdCLEtBQUssR0FBRztBQUMxQixnQkFBTSxTQUFTLElBQUksS0FBSyxLQUFLLEVBQUUsWUFBVztBQUMxQyxlQUFJLEdBQUEsUUFBQSxpQkFBZ0IsTUFBTSxHQUFHO0FBQzNCLG1CQUFPO1VBQ1Q7UUFDRjtBQUdBLFlBQUksQ0FBQyxpQ0FBaUMsS0FBSyxLQUFLLEdBQUc7QUFDakQsZ0JBQU1DLFFBQU8sb0JBQUksS0FBSyxRQUFRLEdBQUc7QUFDakMsY0FBSSxDQUFDLE1BQU1BLE1BQUssUUFBTyxDQUFFLEdBQUc7QUFDMUIsa0JBQU0sUUFBUUEsTUFBSyxZQUFXO0FBQzlCLGlCQUFJLEdBQUEsUUFBQSxpQkFBZ0IsS0FBSyxHQUFHO0FBQzFCLHFCQUFPO1lBQ1Q7VUFDRjtRQUNGO0FBR0EsY0FBTSxPQUFPLElBQUksS0FBSyxLQUFLO0FBQzNCLFlBQUksTUFBTSxLQUFLLFFBQU8sQ0FBRSxHQUFHO0FBQ3pCLGdCQUFNLElBQUkscUJBQ1IsZ0RBQWdEO1FBRXBEO0FBQ0EsY0FBTSxTQUFTLEtBQUssWUFBVztBQUMvQixhQUFJLEdBQUEsUUFBQSxpQkFBZ0IsTUFBTSxHQUFHO0FBQzNCLGlCQUFPO1FBQ1QsT0FBTztBQUNMLGdCQUFNLElBQUkscUJBQ1IsaURBQWlEO1FBRXJEO01BQ0Y7QUFsQ2EsY0FBQSxvQkFBaUI7QUF3Q3ZCLFVBQU0sMEJBQTBCLENBQUMsVUFBeUI7QUFDL0QsWUFBSTtBQUNGLGtCQUFPLEdBQUEsUUFBQSxtQkFBa0IsS0FBSztRQUNoQyxTQUFTLEtBQUs7QUFDWixjQUFJLGVBQWUsc0JBQXNCO0FBQ3ZDLG9CQUFPLG9CQUFJLEtBQUssQ0FBQyxHQUFFLFlBQVc7VUFDaEM7QUFDQSxnQkFBTTtRQUNSO01BQ0Y7QUFUYSxjQUFBLDBCQUF1QjtBQWFwQyxVQUFhLHVCQUFiLGNBQTBDLE1BQUs7O0FBQS9DLGNBQUEsdUJBQUE7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUMvR0EsbUJBQUEsa0JBQUEsT0FBQTtBQUNBLG1CQUFBLGVBQUEsT0FBQTtBQUNBLG1CQUFBLGdCQUFBLE9BQUE7QUFDQSxtQkFBQSxpQkFBQSxPQUFBO0FBQ0EsbUJBQUEsZUFBQSxPQUFBO0FBQ0EsbUJBQUEscUJBQUEsT0FBQTtBQUNBLG1CQUFBLG9CQUFBLE9BQUE7Ozs7O0FDTEEsd0JBQXlCOzs7QUNPbEIsTUFBTSxvQkFBb0IsQ0FBQyxZQUE0RDtBQUM3RixRQUFJLE9BQU8sWUFBWSxVQUFVO0FBQ2hDLGFBQU8sUUFBUSxPQUFPLEtBQUssT0FBTztJQUNuQztBQUVBLFdBQU87RUFDUjtBQU9PLE1BQU0scUJBQXFCLENBQUMsRUFDbEMsU0FDQSxPQUFPLFNBQVMsTUFBSyxNQUN3QjtBQUM3QyxXQUFPLE9BQU8sVUFBVSxTQUFRO0FBQy9CLFlBQU0sTUFBTSxJQUFJLElBQUksVUFBVSxPQUFPO0FBQ3JDLGFBQU8sT0FBTyxLQUFLLElBQUk7SUFDeEI7RUFDRDs7O0FDdEJPLE1BQU0sZUFBZSxDQUMzQixNQUNBLGFBQzRCO0FBQzVCLFFBQUk7QUFFSixlQUFXLFFBQVEsVUFBVTtBQUM1QixZQUFNLFFBQVEsU0FBUyxJQUFJO0FBRTNCLFVBQUksVUFBVSxNQUFNO0FBQ25CLG9CQUFZLElBQUksUUFBUSxJQUFJO0FBRTVCLFlBQUksQ0FBQyxRQUFRLElBQUksSUFBSSxHQUFHO0FBQ3ZCLGtCQUFRLElBQUksTUFBTSxLQUFLO1FBQ3hCO01BQ0Q7SUFDRDtBQUVBLFdBQU8sV0FBVztFQUNuQjs7O0FDSk0sTUFBTyxZQUFQLGNBQXlCLE1BQUs7SUFZbkMsWUFDQyxRQUNBLEVBQ0MsT0FBTyxjQUFjLE1BQU0sSUFDM0IsY0FBYyxpQ0FDZCxTQUNBLE1BQUssSUFDZ0IsQ0FBQSxHQUFFO0FBRXhCLFlBQU0sR0FBRyxJQUFJLE1BQU0sV0FBVyxJQUFJLEVBQUUsTUFBSyxDQUFFO0FBcEJuQyxXQUFBLE9BQU87QUFzQmYsV0FBSyxTQUFTO0FBQ2QsV0FBSyxPQUFPO0FBQ1osV0FBSyxjQUFjO0FBQ25CLFdBQUssVUFBVSxXQUFXLENBQUE7SUFDM0I7O0FBOENLLE1BQU8sT0FBUCxNQUFXO0lBSWhCLFlBQVksRUFBRSxTQUFTLE1BQUssR0FBZTtBQUMxQyxXQUFLLFNBQVMsa0JBQWtCLE9BQU87QUFDdkMsV0FBSyxRQUFRO0lBQ2Q7Ozs7Ozs7SUFRQSxJQUNDLE1BQ0EsU0FBK0I7QUFFL0IsYUFBTyxLQUFLLFFBQVEsRUFBRSxNQUFNLE9BQU8sTUFBWSxHQUFJLFFBQWUsQ0FBRTtJQUNyRTs7Ozs7OztJQVFBLEtBQ0MsTUFDQSxTQUFrQztBQUVsQyxhQUFPLEtBQUssUUFBUSxFQUFFLE1BQU0sUUFBUSxNQUFZLEdBQUksUUFBZSxDQUFFO0lBQ3RFOztJQUdBLE1BQU0sUUFBUSxTQUEyQjtBQUN4QyxZQUFNLE9BQU8sUUFBUTtBQUVyQixZQUFNLE1BQU0sU0FBUyxRQUFRLElBQUksS0FBSyxzQkFBc0IsUUFBUSxNQUFNO0FBQzFFLFlBQU0sY0FBYyxZQUFZLElBQUk7QUFFcEMsWUFBTSxXQUFXLE1BQU0sS0FBSyxPQUFPLEtBQUs7UUFDdkMsUUFBUSxRQUFRO1FBQ2hCLFFBQVEsUUFBUTtRQUNoQixNQUFNLGNBQWMsS0FBSyxVQUFVLElBQUksSUFBSTtRQUMzQyxTQUFTLGFBQWEsUUFBUSxTQUFTO1VBQ3RDLGdCQUFnQixjQUFjLHFCQUFxQjtVQUNuRCxpQkFBaUIscUJBQXFCLEtBQUssS0FBSztTQUNoRDtPQUNEO0FBRUQsWUFBTSxpQkFBaUIsU0FBUztBQUNoQyxZQUFNLGtCQUFrQixPQUFPLFlBQVksU0FBUyxPQUFPO0FBQzNELFlBQU0sZUFBZSxnQkFBZ0IsY0FBYztBQUVuRCxVQUFJO0FBQ0osVUFBSTtBQUVKLFVBQUksY0FBYztBQUNqQixZQUFJLGFBQWEsV0FBVyxrQkFBa0IsR0FBRztBQUNoRCxvQkFBVSxTQUFTLEtBQUk7UUFDeEIsV0FBVyxhQUFhLFdBQVcsT0FBTyxHQUFHO0FBQzVDLG9CQUFVLFNBQVMsS0FBSTtRQUN4QjtNQUNEO0FBRUEsVUFBSTtBQUNILGNBQU0sT0FBTyxXQUFXLFNBQVMsWUFBVyxFQUFHLEtBQUssQ0FBQyxXQUFXLElBQUksV0FBVyxNQUFNLENBQUM7TUFDdkYsU0FBUyxLQUFLO0FBQ2IsY0FBTSxJQUFJLFVBQVUsR0FBRztVQUN0QixPQUFPO1VBQ1AsTUFBTTtVQUNOLGFBQWE7VUFDYixTQUFTO1NBQ1Q7TUFDRjtBQUVBLFVBQUksbUJBQW1CLEtBQUs7QUFDM0IsZUFBTztVQUNOLE1BQU07VUFDTixTQUFTOztNQUVYO0FBRUEsVUFBSSxnQkFBZ0IsR0FBRyxHQUFHO0FBQ3pCLGNBQU0sSUFBSSxVQUFVLGdCQUFnQjtVQUNuQyxNQUFNLElBQUk7VUFDVixhQUFhLElBQUk7VUFDakIsU0FBUztTQUNUO01BQ0Y7QUFFQSxZQUFNLElBQUksVUFBVSxnQkFBZ0IsRUFBRSxTQUFTLGdCQUFlLENBQUU7SUFDakU7O0FBR0QsTUFBTSx1QkFBdUIsQ0FBQyxVQUFzRDtBQUNuRixRQUFJLE9BQU87QUFDVixhQUFPLEdBQUcsTUFBTSxPQUFPLElBQUksTUFBTSxJQUFJO0lBQ3RDO0FBRUEsV0FBTztFQUNSO0FBRUEsTUFBTSx3QkFBd0IsQ0FBQyxXQUF1RDtBQUNyRixRQUFJO0FBRUosZUFBVyxPQUFPLFFBQVE7QUFDekIsWUFBTSxRQUFRLE9BQU8sR0FBRztBQUV4QixVQUFJLFVBQVUsUUFBVztBQUN4Qix5QkFBaUIsSUFBSSxnQkFBZTtBQUVwQyxZQUFJLE1BQU0sUUFBUSxLQUFLLEdBQUc7QUFDekIsbUJBQVMsTUFBTSxHQUFHLE1BQU0sTUFBTSxRQUFRLE1BQU0sS0FBSyxPQUFPO0FBQ3ZELGtCQUFNLE1BQU0sTUFBTSxHQUFHO0FBQ3JCLHlCQUFhLE9BQU8sS0FBSyxLQUFLLEdBQUc7VUFDbEM7UUFDRCxPQUFPO0FBQ04sdUJBQWEsSUFBSSxLQUFLLEtBQUssS0FBSztRQUNqQztNQUNEO0lBQ0Q7QUFFQSxXQUFPLGVBQWUsTUFBTSxhQUFhLFNBQVEsSUFBSztFQUN2RDtBQUVBLE1BQU0sY0FBYyxDQUFDLE1BQTRDO0FBQ2hFLFFBQUksT0FBTyxNQUFNLFlBQVksTUFBTSxNQUFNO0FBQ3hDLGFBQU87SUFDUjtBQUVBLFFBQUksWUFBWSxHQUFHO0FBQ2xCLGFBQU87SUFDUjtBQUVBLFVBQU0sUUFBUSxPQUFPLGVBQWUsQ0FBQztBQUNyQyxXQUFPLFVBQVUsUUFBUSxVQUFVLE9BQU87RUFDM0M7QUFFQSxNQUFNLGtCQUFrQixDQUFDLFVBQTBDO0FBQ2xFLFFBQUksT0FBTyxVQUFVLFlBQVksVUFBVSxNQUFNO0FBQ2hELGFBQU87SUFDUjtBQUVBLFVBQU0sV0FBVyxPQUFPLE1BQU07QUFDOUIsVUFBTSxjQUFjLE9BQU8sTUFBTTtBQUVqQyxZQUNFLGFBQWEsZUFBZSxhQUFhLGNBQ3pDLGdCQUFnQixlQUFlLGdCQUFnQjtFQUVsRDs7O0FDNU9PLE1BQU0saUJBQWlCLENBQUMsUUFBd0M7QUFDdEUsV0FBTyxtQkFBbUIsS0FBSyxnQkFBZ0IsMkJBQTJCO0VBQzNFO0FBU08sTUFBTSxxQkFBcUIsQ0FDakMsS0FDQSxXQUNBLGdCQUN1QjtBQUN2QixVQUFNLE1BQU0sSUFBSTtBQUVoQixVQUFNLGVBQWUsTUFBTTtBQUMzQixVQUFNLFFBQVEsSUFBSSxTQUFTLEtBQUssQ0FBQyxZQUFZLFFBQVEsT0FBTyxhQUFhLFFBQVEsT0FBTyxZQUFZO0FBRXBHLFFBQUksQ0FBQyxTQUFTLE1BQU0sU0FBUyxlQUFlLE9BQU8sTUFBTSxvQkFBb0IsVUFBVTtBQUN0RixhQUFPO0lBQ1I7QUFFQSxXQUFPLFlBQVksTUFBTSxlQUFlO0VBQ3pDO0FBRUEsTUFBTSxjQUFjLENBQUMsV0FBc0M7QUFDMUQsUUFBSTtBQUNKLFFBQUk7QUFDSCxZQUFNLElBQUksSUFBSSxNQUFNO0lBQ3JCLFFBQVE7QUFDUCxhQUFPO0lBQ1I7QUFFQSxVQUFNLFFBQVEsSUFBSTtBQUVsQixRQUFJLElBQUksYUFBYSxVQUFVLFdBQVcsVUFBVSxXQUFXO0FBQzlELGFBQU87SUFDUjtFQUNEOzs7QUN6Q08sTUFBTSxZQUFZLENBQUMsVUFBMEI7QUFDbkQsVUFBTSxNQUFNO0FBQ1osVUFBTSxPQUFPLE1BQU0sTUFBTSxHQUFHLEVBQUUsQ0FBQztBQUUvQixRQUFJO0FBRUosUUFBSSxPQUFPLFNBQVMsVUFBVTtBQUM3QixZQUFNLElBQUksTUFBTSxrQ0FBa0MsTUFBTSxFQUFFO0lBQzNEO0FBRUEsUUFBSTtBQUNILGdCQUFVLGdCQUFnQixJQUFJO0lBQy9CLFNBQVMsR0FBRztBQUNYLFlBQU0sSUFBSSxNQUFNLDBDQUEwQyxNQUFNLEtBQUssT0FBUSxFQUFZLFVBQVUsR0FBRztJQUN2RztBQUVBLFFBQUk7QUFDSCxhQUFPLEtBQUssTUFBTSxPQUFPO0lBQzFCLFNBQVMsR0FBRztBQUNYLFlBQU0sSUFBSSxNQUFNLDJDQUEyQyxNQUFNLEtBQUssT0FBUSxFQUFZLFVBQVUsR0FBRztJQUN4RztFQUNEO0FBT08sTUFBTSxrQkFBa0IsQ0FBQyxRQUF1QjtBQUN0RCxRQUFJLFNBQVMsSUFBSSxRQUFRLE1BQU0sR0FBRyxFQUFFLFFBQVEsTUFBTSxHQUFHO0FBRXJELFlBQVEsT0FBTyxTQUFTLEdBQUc7TUFDMUIsS0FBSztBQUNKO01BQ0QsS0FBSztBQUNKLGtCQUFVO0FBQ1Y7TUFDRCxLQUFLO0FBQ0osa0JBQVU7QUFDVjtNQUNEO0FBQ0MsY0FBTSxJQUFJLE1BQU0sNENBQTRDO0lBQzlEO0FBRUEsUUFBSTtBQUNILGFBQU8saUJBQWlCLE1BQU07SUFDL0IsUUFBUTtBQUNQLGFBQU8sS0FBSyxNQUFNO0lBQ25CO0VBQ0Q7QUFFQSxNQUFNLG1CQUFtQixDQUFDLFFBQXVCO0FBQ2hELFdBQU8sbUJBQ04sS0FBSyxHQUFHLEVBQUUsUUFBUSxRQUFRLENBQUMsSUFBSSxNQUFLO0FBQ25DLFVBQUksT0FBTyxFQUFFLFdBQVcsQ0FBQyxFQUFFLFNBQVMsRUFBRSxFQUFFLFlBQVc7QUFFbkQsVUFBSSxLQUFLLFNBQVMsR0FBRztBQUNwQixlQUFPLE1BQU07TUFDZDtBQUVBLGFBQU8sTUFBTTtJQUNkLENBQUMsQ0FBQztFQUVKOzs7QUNBTSxNQUFPLG9CQUFQLE1BQXdCO0lBSTdCO0lBQ0E7SUFFQTtJQUNBO0lBQ0E7SUFLQSxZQUFZLEVBQ1gsU0FDQSxXQUNBLFdBQ0EsaUJBQ0EsT0FBTyxTQUFTLE1BQUssR0FDSztBQUMxQixXQUFLLGFBQWE7QUFDbEIsV0FBSyxRQUFRO0FBRWIsV0FBSyxVQUFVLElBQUksS0FBSyxFQUFFLFNBQVMsbUJBQW1CLEVBQUUsU0FBa0IsT0FBTyxPQUFNLENBQUUsRUFBQyxDQUFFO0FBRTVGLFdBQUssYUFBYTtBQUNsQixXQUFLLGFBQWE7QUFDbEIsV0FBSyxtQkFBbUI7SUFDekI7SUFFQSxJQUFJLGNBQVc7QUFDZCxhQUFPLEtBQUssU0FBUyxVQUFVLEtBQUs7SUFDckM7SUFFQSxNQUFNLE9BQU8sVUFBa0IsTUFBaUI7QUFDL0MsWUFBTSxLQUFLO0FBRVgsWUFBTSxNQUFNLElBQUksSUFBSSxVQUFVLEtBQUssV0FBVztBQUM5QyxZQUFNLFVBQVUsSUFBSSxRQUFRLEtBQUssT0FBTztBQUV4QyxVQUFJLENBQUMsS0FBSyxXQUFXLFFBQVEsSUFBSSxlQUFlLEdBQUc7QUFDbEQsZ0JBQVEsR0FBRyxLQUFLLE9BQU8sS0FBSyxJQUFJO01BQ2pDO0FBRUEsY0FBUSxJQUFJLGlCQUFpQixVQUFVLEtBQUssUUFBUSxTQUFTLEVBQUU7QUFFL0QsWUFBTSxrQkFBa0IsT0FBTyxHQUFHLEtBQUssT0FBTyxLQUFLLEVBQUUsR0FBRyxNQUFNLFFBQU8sQ0FBRTtBQUN2RSxZQUFNLFlBQVksTUFBTSx1QkFBdUIsZUFBZTtBQUU5RCxVQUFJLENBQUMsV0FBVztBQUNmLGVBQU87TUFDUjtBQUVBLFVBQUk7QUFDSCxjQUFNLEtBQUssZ0JBQWU7TUFDM0IsUUFBUTtBQUNQLGVBQU87TUFDUjtBQUtBLFVBQUksQ0FBQyxLQUFLLFdBQVcsS0FBSyxnQkFBZ0IsZ0JBQWdCO0FBQ3pELGVBQU87TUFDUjtBQUVBLGNBQVEsSUFBSSxpQkFBaUIsVUFBVSxLQUFLLFFBQVEsU0FBUyxFQUFFO0FBRS9ELGFBQU8sT0FBTyxHQUFHLEtBQUssT0FBTyxLQUFLLEVBQUUsR0FBRyxNQUFNLFFBQU8sQ0FBRTtJQUN2RDtJQUVBLGtCQUFlO0FBQ2QsYUFBUSxLQUFLLDJCQUEyQixLQUFLLHFCQUFvQixFQUFHLFFBQ25FLE1BQU8sS0FBSyx5QkFBeUIsTUFBVTtJQUVqRDtJQUVBLE1BQU0sdUJBQW9CO0FBQ3pCLFlBQU0saUJBQWlCLEtBQUs7QUFFNUIsVUFBSSxDQUFDLGdCQUFnQjtBQUNwQjtNQUNEO0FBRUEsVUFBSTtBQUNILGNBQU0sRUFBRSxLQUFJLElBQUssTUFBTSxLQUFLLFFBQVEsS0FBSyxxQ0FBcUM7VUFDN0UsU0FBUztZQUNSLGVBQWUsVUFBVSxlQUFlLFVBQVU7O1NBRW5EO0FBRUQsYUFBSyxlQUFlLEVBQUUsR0FBRyxnQkFBZ0IsR0FBRyxLQUFJLENBQUU7QUFDbEQsYUFBSyxhQUFhLEtBQUssT0FBUTtNQUNoQyxTQUFTLEtBQUs7QUFDYixZQUFJLGVBQWUsV0FBVztBQUM3QixnQkFBTSxPQUFPLElBQUk7QUFFakIsY0FBSSxTQUFTLGtCQUFrQixTQUFTLGdCQUFnQjtBQUN2RCxpQkFBSyxVQUFVO0FBQ2YsaUJBQUssYUFBYSxjQUFjO1VBQ2pDO1FBQ0Q7TUFDRDtJQUNEO0lBRUEsZUFBZSxLQUF5QztBQUN2RCxZQUFNLFNBQVMsSUFBSTtBQUVuQixVQUFJO0FBQ0osVUFBSSxRQUFRO0FBQ1gsaUJBQVMsZUFBZSxNQUFNO01BQy9CO0FBRUEsWUFBTSxhQUFhO1FBQ2xCLFdBQVcsSUFBSTtRQUNmLFlBQVksSUFBSTtRQUNoQixRQUFRLElBQUk7UUFDWixLQUFLLElBQUk7UUFDVDtRQUNBLE9BQU8sSUFBSTtRQUNYLGdCQUFnQixJQUFJO1FBQ3BCLGlCQUFpQixJQUFJO1FBQ3JCLFFBQVEsSUFBSSxVQUFVO1FBQ3RCLGdCQUFnQixJQUFJOztBQUdyQixXQUFLLFVBQVU7QUFDZixXQUFLLG1CQUFtQixVQUFVO0FBRWxDLGFBQU87SUFDUjs7Ozs7SUFNQSxNQUFNLE9BQU8sU0FBdUI7QUFDbkMsWUFBTUMsT0FBTSxLQUFLLElBQUcsSUFBSyxNQUFPLEtBQUs7QUFFckMsWUFBTSxlQUFlLFVBQVUsUUFBUSxVQUFVO0FBRWpELFVBQUlBLFFBQU8sYUFBYSxLQUFLO0FBQzVCLGNBQU0sSUFBSSxVQUFVLEtBQUssRUFBRSxNQUFNLGVBQWMsQ0FBRTtNQUNsRDtBQUVBLFlBQU0sY0FBYyxVQUFVLFFBQVEsU0FBUztBQUMvQyxXQUFLLFVBQVU7QUFFZixVQUFJQSxRQUFPLFlBQVksS0FBSztBQUMzQixjQUFNLEtBQUssZ0JBQWU7TUFDM0IsT0FBTztBQUNOLGNBQU0sVUFBVSxLQUFLLFFBQVEsSUFBSSxpQ0FBaUM7VUFDakUsU0FBUztZQUNSLGVBQWUsVUFBVSxRQUFRLFNBQVM7O1NBRTNDO0FBRUQsZ0JBQVEsS0FBSyxDQUFDLGFBQVk7QUFDekIsZ0JBQU0sV0FBVyxLQUFLO0FBQ3RCLGdCQUFNLE9BQU8sU0FBUztBQUV0QixjQUFJLENBQUMsVUFBVTtBQUNkO1VBQ0Q7QUFFQSxlQUFLLGVBQWUsRUFBRSxHQUFHLFVBQVUsR0FBRyxLQUFJLENBQUU7UUFDN0MsQ0FBQztNQUNGO0FBRUEsVUFBSSxDQUFDLEtBQUssU0FBUztBQUNsQixjQUFNLElBQUksVUFBVSxLQUFLLEVBQUUsTUFBTSxlQUFjLENBQUU7TUFDbEQ7QUFFQSxhQUFPLEtBQUs7SUFDYjs7Ozs7O0lBT0EsTUFBTSxNQUFNLFNBQXlCO0FBRXBDLFdBQUssVUFBVTtBQUVmLFlBQU0sTUFBTSxNQUFNLEtBQUssUUFBUSxLQUFLLG9DQUFvQztRQUN2RSxNQUFNO1VBQ0wsWUFBWSxRQUFRO1VBQ3BCLFVBQVUsUUFBUTtVQUNsQixpQkFBaUIsUUFBUTs7T0FFMUI7QUFFRCxhQUFPLEtBQUssZUFBZSxJQUFJLElBQUk7SUFDcEM7O0FBYUQsTUFBTSx5QkFBeUIsT0FBTyxhQUF3QztBQUM3RSxRQUFJLFNBQVMsV0FBVyxLQUFLO0FBQzVCLGFBQU87SUFDUjtBQUVBLFFBQUksbUJBQW1CLFNBQVMsT0FBTyxNQUFNLG9CQUFvQjtBQUNoRSxhQUFPO0lBQ1I7QUFJQSxRQUFJLHFCQUFxQixTQUFTLE9BQU8sSUFBSSxLQUFLLEtBQUs7QUFDdEQsYUFBTztJQUNSO0FBRUEsUUFBSTtBQUNILFlBQU0sRUFBRSxPQUFPLFFBQU8sSUFBSyxNQUFNLFNBQVMsTUFBSyxFQUFHLEtBQUk7QUFDdEQsYUFBTyxVQUFVLG1CQUFtQixPQUFPLFlBQVksWUFBWSxZQUFZO0lBQ2hGLFFBQVE7SUFBQztBQUVULFdBQU87RUFDUjtBQUVBLE1BQU0scUJBQXFCLENBQUMsWUFBb0I7QUFDL0MsV0FBTyxRQUFRLElBQUksY0FBYyxHQUFHLE1BQU0sR0FBRyxFQUFFLENBQUMsR0FBRyxLQUFJO0VBQ3hEO0FBQ0EsTUFBTSx1QkFBdUIsQ0FBQyxZQUFvQjtBQUNqRCxXQUFPLE9BQU8sUUFBUSxJQUFJLGdCQUFnQixLQUFLLEdBQUc7RUFDbkQ7OztBQ25UQSxzQkFBc0I7OztBQzZDaEIsV0FBVUMsZ0JBQWUsS0FBZ0I7QUFDM0MsV0FBT0Msb0JBQW1CLEtBQUssZ0JBQWdCLDJCQUEyQjtFQUM5RTtBQVNNLFdBQVVBLG9CQUNaLEtBQ0EsV0FDQSxhQUFtQjtBQUVuQixVQUFNLE1BQU0sSUFBSTtBQUVoQixVQUFNLGVBQWUsTUFBTTtBQUMzQixVQUFNLFFBQVEsSUFBSSxTQUFTLEtBQUssQ0FBQyxZQUFZLFFBQVEsT0FBTyxhQUFhLFFBQVEsT0FBTyxZQUFZO0FBRXBHLFFBQUksQ0FBQyxTQUFTLE1BQU0sU0FBUyxlQUFlLE9BQU8sTUFBTSxvQkFBb0IsVUFBVTtBQUNuRixhQUFPO0lBQ1g7QUFFQSxXQUFPQyxhQUFZLE1BQU0sZUFBZTtFQUM1QztBQUVBLFdBQVNBLGFBQVksUUFBYztBQUMvQixRQUFJO0FBQ0osUUFBSTtBQUNBLFlBQU0sSUFBSSxJQUFJLE1BQU07SUFDeEIsUUFBUTtBQUNKLGFBQU87SUFDWDtBQUVBLFVBQU0sUUFBUSxJQUFJO0FBRWxCLFFBQUksSUFBSSxhQUFhLFVBQVUsV0FBVyxVQUFVLFdBQVc7QUFDM0QsYUFBTztJQUNYO0VBQ0o7QUFFQSxpQkFBc0IsZUFBZSxLQUFXO0FBQzVDLFVBQU0sY0FBYyxJQUFJLFFBQVEsS0FBSyxDQUFDO0FBRXRDLFVBQU0sT0FBTyxJQUFJLE1BQU0sR0FBRyxXQUFXO0FBQ3JDLFVBQU0sUUFBUSxJQUFJLE1BQU0sY0FBYyxDQUFDO0FBR3ZDLFFBQUk7QUFFSixRQUFJLFNBQVMsT0FBTztBQUNoQixZQUFNLFdBQVcsTUFBTSxNQUFNLHlCQUF5QixHQUFHLEVBQUU7QUFFM0QsVUFBSSxTQUFTLFdBQVcsS0FBSztBQUN6QixjQUFNLElBQUksTUFBTSw0QkFBNEI7TUFDaEQ7QUFDQSxVQUFJLENBQUMsU0FBUyxJQUFJO0FBQ2QsY0FBTSxJQUFJLE1BQU0sMEJBQTBCO01BQzlDO0FBRUEsWUFBTSxPQUFPLE1BQU0sU0FBUyxLQUFJO0FBRWhDLFlBQU07SUFDVixXQUFXLFNBQVMsT0FBTztBQUN2QixZQUFNLGFBQWE7QUFFbkIsVUFBSSxDQUFDLFdBQVcsS0FBSyxLQUFLLEdBQUc7QUFDekIsY0FBTSxJQUFJLE1BQU0sb0JBQW9CO01BQ3hDO0FBRUEsWUFBTSxXQUFXLE1BQU0sTUFBTSxXQUFXLEtBQUssdUJBQXVCO0FBRXBFLFVBQUksQ0FBQyxTQUFTLElBQUk7QUFDZCxjQUFNLElBQUksTUFBTSw2QkFBNkI7TUFDakQ7QUFFQSxZQUFNLE9BQU8sTUFBTSxTQUFTLEtBQUk7QUFFaEMsWUFBTTtJQUNWLE9BQU87QUFDSCxZQUFNLElBQUksTUFBTSx3QkFBd0I7SUFDNUM7QUFFQSxXQUFPO0VBQ1g7OztBQ3JJTyxNQUFNLFFBQVEsQ0FBQyxRQUE4QjtBQUNuRCxXQUFPLG1EQUFtRCxLQUFLLEdBQUc7RUFDbkU7OztBQ0RBLE1BQU0sWUFBWTtBQUNsQixNQUFNLFNBQVM7QUFFUixNQUFNLHNCQUFzQixPQUFPLFdBQW1DO0FBQzVFLFVBQU0sTUFBTSxJQUFJLElBQUksOENBQThDO0FBQ2xFLFFBQUksYUFBYSxJQUFJLFFBQVEsS0FBSztBQUNsQyxRQUFJLGFBQWEsSUFBSSxRQUFRLEdBQUcsU0FBUyxJQUFJLE1BQU0sRUFBRTtBQUVyRCxVQUFNLFdBQVcsTUFBTSxNQUFNLEtBQUs7TUFDakMsUUFBUTtNQUNSLFNBQVMsRUFBRSxRQUFRLHVCQUFzQjtNQUN6QyxVQUFVO0tBQ1Y7QUFFRCxVQUFNLE9BQU8sU0FBUyxRQUFRLElBQUksY0FBYyxHQUFHLEtBQUk7QUFDdkQsUUFBSSxDQUFDLFNBQVMsSUFBSTtBQUNqQixZQUFNLFVBQVUsTUFBTSxXQUFXLFlBQVksSUFDMUMsTUFBTSxTQUFTLEtBQUksSUFDbkIscUJBQXFCLE1BQU07QUFFOUIsWUFBTSxJQUFJLE1BQU0sT0FBTztJQUN4QjtBQUVBLFFBQUksU0FBUyx3QkFBd0I7QUFDcEMsWUFBTSxJQUFJLE1BQU0scUNBQXFDO0lBQ3REO0FBRUEsVUFBTSxTQUFTLFNBQVMsTUFBTSxTQUFTLEtBQUksQ0FBRTtBQUM3QyxVQUFNLFVBQVUsT0FBTyxRQUFRLE9BQU8sV0FBVyxFQUFFLElBQUksY0FBYyxLQUFLLENBQUE7QUFFMUUsYUFBUyxJQUFJLEdBQUcsSUFBSSxRQUFRLFFBQVEsS0FBSztBQUV4QyxVQUFJLENBQUMsUUFBUSxDQUFDLEVBQUUsV0FBVyxNQUFNLEdBQUc7QUFDbkM7TUFDRDtBQUdBLGVBQVMsSUFBSSxJQUFJLEdBQUcsSUFBSSxRQUFRLFFBQVEsS0FBSztBQUM1QyxZQUFJLFFBQVEsQ0FBQyxFQUFFLFdBQVcsTUFBTSxHQUFHO0FBQ2xDO1FBQ0Q7TUFDRDtBQUVBLFlBQU0sTUFBTSxRQUFRLENBQUMsRUFBRSxNQUFNLE9BQU8sTUFBTTtBQUMxQyxVQUFJLE1BQU0sR0FBRyxHQUFHO0FBQ2YsZUFBTztNQUNSO0FBRUE7SUFDRDtBQUVBLFVBQU0sSUFBSSxNQUFNLHFCQUFxQixNQUFNLEVBQUU7RUFDOUM7QUFHQSxNQUFNLFdBQVcsQ0FBQyxXQUFxQztBQUN0RCxRQUFJLFdBQVcsUUFBUSxPQUFPLFdBQVcsVUFBVTtBQUNsRCxhQUFPO0lBQ1I7QUFFQSxXQUNDLFlBQVksVUFDWixPQUFPLE9BQU8sV0FBVyxhQUN4QixFQUFFLFlBQVksV0FBWSxNQUFNLFFBQVEsT0FBTyxNQUFNLEtBQUssT0FBTyxPQUFPLE1BQU0sUUFBUTtFQUV6RjtBQUNBLE1BQU0sV0FBVyxDQUFDLFdBQTJCO0FBQzVDLFFBQUksQ0FBQyxTQUFTLE1BQU0sR0FBRztBQUN0QixZQUFNLElBQUksVUFBVSx5QkFBeUI7SUFDOUM7QUFFQSxXQUFPO0VBQ1I7QUFHQSxNQUFNLFdBQVcsQ0FBQyxXQUFxQztBQUN0RCxRQUFJLFdBQVcsUUFBUSxPQUFPLFdBQVcsVUFBVTtBQUNsRCxhQUFPO0lBQ1I7QUFFQSxXQUNDLFVBQVUsVUFDVixPQUFPLE9BQU8sU0FBUyxZQUN2QixVQUFVLFVBQ1YsT0FBTyxPQUFPLFNBQVMsWUFDdkIsVUFBVSxVQUNWLE9BQU8sT0FBTyxTQUFTLFlBQ3ZCLFNBQVMsVUFDVCxPQUFPLE9BQU8sUUFBUTtFQUV4QjtBQUdBLE1BQU0sY0FBYyxDQUFDLFdBQXVDO0FBQzNELFdBQU8sT0FBTyxTQUFTO0VBQ3hCO0FBRUEsTUFBTSxpQkFBaUIsQ0FBQyxXQUE2QjtBQUNwRCxXQUFPLE9BQU8sS0FBSyxRQUFRLFVBQVUsRUFBRSxFQUFFLFFBQVEsUUFBUSxHQUFHO0VBQzdEOzs7QUNuR08sTUFBTSx1QkFBdUIsT0FBTyxXQUFtQztBQUM3RSxVQUFNLE1BQU0sSUFBSSxJQUFJLDRCQUE0QixXQUFXLE1BQU0sRUFBRTtBQUVuRSxVQUFNLFdBQVcsTUFBTSxNQUFNLEtBQUssRUFBRSxVQUFVLFFBQU8sQ0FBRTtBQUN2RCxRQUFJLENBQUMsU0FBUyxJQUFJO0FBQ2pCLFlBQU0sSUFBSSxNQUFNLHVCQUF1QjtJQUN4QztBQUVBLFVBQU0sT0FBTyxNQUFNLFNBQVMsS0FBSTtBQUVoQyxVQUFNLE1BQU0sS0FBSyxNQUFNLElBQUksRUFBRSxDQUFDLEVBQUcsS0FBSTtBQUNyQyxRQUFJLE1BQU0sR0FBRyxHQUFHO0FBQ2YsYUFBTztJQUNSO0FBRUEsVUFBTSxJQUFJLE1BQU0scUJBQXFCLE1BQU0sRUFBRTtFQUM5Qzs7O0FDZEEsTUFBTSxXQUFXLG9CQUFJLElBQUc7QUFDeEIsaUJBQXNCLHlCQUF5QixRQUFjO0FBQ3pELFFBQUksTUFBTSxNQUFNO0FBQUcsYUFBTztBQUMxQixRQUFJLFNBQVMsSUFBSSxNQUFNLEdBQUc7QUFDdEIsYUFBTyxTQUFTLElBQUksTUFBTTtJQUM5QjtBQUVBLFVBQU0sVUFBVSxNQUFNLFFBQVEsV0FBVztNQUNyQyxxQkFBcUIsTUFBTTtNQUMzQixvQkFBb0IsTUFBTTtLQUM3QjtBQUVELFVBQU0sTUFBTSxRQUNQLEtBQUssT0FBSyxFQUFFLFdBQVcsV0FBVyxHQUNqQztBQUVOLFFBQUksUUFBUSxRQUFXO0FBQ25CLFlBQU07SUFDVjtBQUVBLGFBQVMsSUFBSSxRQUFRLEdBQUc7QUFFeEIsV0FBTztFQUNYOzs7QUN2QkEsTUFBTSxjQUFjLG9CQUFJLElBQUc7QUFFM0IsaUJBQXNCLGFBQWEsYUFBbUI7QUFDbEQsUUFBSSxZQUFZLElBQUksV0FBVyxHQUFHO0FBQzlCLGFBQU8sWUFBWSxJQUFJLFdBQVc7SUFDdEM7QUFFQSxVQUFNLE1BQU0sTUFBTSx5QkFBeUIsV0FBVztBQUN0RCxVQUFNLGNBQWMsTUFBTSxlQUFlLEdBQUc7QUFDNUMsVUFBTSxNQUFNQyxnQkFBZSxXQUFXO0FBQ3RDLFFBQUksQ0FBQztBQUFLLFlBQU0sSUFBSSxNQUFNLGNBQWMsV0FBVyxLQUFLLEdBQUcsSUFBSTtBQUUvRCxnQkFBWSxJQUFJLGFBQWEsRUFBRSxLQUFLLEtBQUssWUFBVyxDQUFFO0FBRXRELFdBQU8sRUFBRSxLQUFLLEtBQUssWUFBVztFQUNsQzs7O0FOUU0sV0FBVSxtQkFBbUIsS0FBWTtBQUMzQyxXQUFPLGVBQWUsYUFBYSxJQUFJLFNBQVM7RUFDcEQ7QUFFTSxXQUFVLHNCQUFzQixLQUFZO0FBQzlDLFdBQU8sZUFBZSxhQUFhLElBQUksU0FBUztFQUNwRDtBQVdBLFdBQVMsZ0JBQTJELFFBQVM7QUFDekUsUUFBSTtBQUNKLFVBQU0sTUFBTSxPQUFPO0FBQ25CLFdBQU87TUFDSCxHQUFHO01BQ0gsT0FBTyxPQUFPO01BQ2QsSUFBSSxNQUFHO0FBQ0gsZUFBTyxrQkFBa0IsSUFBSSxvQkFBTSxHQUFHO01BQzFDOztFQUVSO0FBRUEsV0FBUyxpQkFJUCxPQUFRO0FBQ04sV0FBTztNQUNILEdBQUc7TUFDSCxTQUFTLE1BQU0sUUFBUSxJQUFJLGVBQWU7O0VBRWxEO0FBMkJNLE1BQU8sYUFBUCxNQUFPLFlBQVU7SUFDSDtJQUVoQixZQUFZLE1BQXFCO0FBQzdCLFdBQUssT0FBTyxnQkFBZ0IsT0FBTyxPQUFZLElBQUksS0FBSyxJQUFJO0lBQ2hFOzs7O0lBS0EsT0FBTyxlQUFlLFVBQVUsdUJBQXFCO0FBQ2pELGFBQU8sSUFBSSxZQUFXLEVBQUUsU0FBUyxtQkFBbUIsRUFBRSxRQUFPLENBQUUsRUFBQyxDQUFFO0lBQ3RFOzs7O0lBS0EsT0FBTyxjQUFjLFVBQVUsd0JBQXNCO0FBQ2pELGFBQU8sSUFBSSxZQUFXLEVBQUUsU0FBUyxtQkFBbUIsRUFBRSxRQUFPLENBQUUsRUFBQyxDQUFFO0lBQ3RFO0lBRVEsT0FBZ0IsZ0JBQWdCLG9CQUFJLElBQUc7Ozs7SUFLL0MsYUFBYSxlQUFlLGFBQW1CO0FBQzNDLFlBQU0sTUFBTSxNQUFNLHlCQUF5QixXQUFXO0FBRXRELFlBQU0sZ0JBQWdCLFlBQVcsY0FBYyxJQUFJLEdBQUc7QUFDdEQsVUFBSTtBQUFlLGVBQU87QUFFMUIsWUFBTSxZQUFZLE1BQU0sYUFBYSxHQUFHO0FBQ3hDLFlBQU0sUUFBUSxZQUFXLGVBQWUsVUFBVSxHQUFHO0FBRXJELGtCQUFXLGNBQWMsSUFBSSxLQUFLLEtBQUs7QUFDdkMsYUFBTztJQUNYOzs7O0lBS0EsYUFBYSx5QkFBeUIsYUFBbUI7QUFDckQsWUFBTSxFQUFFLEtBQUssSUFBRyxJQUFLLE1BQU0sYUFBYSxXQUFXO0FBRW5ELFlBQU0sVUFBVSxJQUFJLGtCQUFrQixFQUFFLFNBQVMsSUFBRyxDQUFFO0FBQ3RELFlBQU0sUUFBUSxJQUFJLFlBQVcsRUFBRSxTQUFTLFFBQU8sQ0FBRTtBQUVqRCxhQUFPLEVBQUUsS0FBSyxTQUFTLE1BQUs7SUFDaEM7O0lBR0EsTUFBTSxRQUFRLFNBQTJCO0FBQ3JDLGFBQU8sTUFBTSxLQUFLLEtBQUssUUFBUSxPQUFPO0lBQzFDO0lBRUEsTUFBTSxNQUNGLFNBQ0csTUFBZ0M7QUFFbkMsWUFBTSxDQUFDLFFBQVEsSUFBSSxJQUFJO0FBRXZCLFlBQU0sRUFBRSxNQUFNLFFBQU8sSUFBSyxNQUFNLEtBQUssS0FBSyxJQUFJLE1BQU0sRUFBRSxRQUFRLEtBQUksQ0FBVTtBQUU1RSxhQUFPO0lBQ1g7SUFFQSxNQUFNLEtBQ0YsU0FDRyxNQUFtQztBQUV0QyxZQUFNLENBQUMsTUFBTSxNQUFNLElBQUk7QUFFdkIsWUFBTSxFQUFFLE1BQU0sUUFBTyxJQUFLLE1BQU0sS0FBSyxLQUFLLEtBQUssTUFBTSxFQUFFLFFBQVEsS0FBSSxDQUFTO0FBRTVFLGFBQU87SUFDWDtJQUVBLE1BQU0sSUFBNkIsUUFBMEI7QUFDekQsWUFBTSxPQUFPLGdCQUFtRCxNQUFNLEtBQUssTUFBTSw4QkFBOEIsTUFBTSxDQUFDO0FBRXRILGFBQU87SUFDWDtJQUVBLE1BQU0sUUFBUSxRQUFvRTtBQUM5RSxVQUFJLE9BQU8sT0FBTyxRQUFRLFVBQVU7QUFDaEMsaUJBQVM7VUFDTCxLQUFLLE9BQU8sSUFBSSxJQUFJO1VBQ3BCLEtBQUssT0FBTzs7TUFFcEI7QUFFQSxZQUFNLE9BQU8sTUFBTSxLQUFLLE1BQU0sNEJBQTRCLE1BQXNDO0FBRWhHLGFBQU87SUFDWDs7Ozs7SUFNQSxNQUFNLGdCQUFnQixRQUFvRTtBQUN0RixVQUFJLE9BQTRCLE1BQU0sS0FBSyxRQUFRLE1BQU07QUFFekQsVUFBSSxPQUFPLFNBQVM7QUFBVSxlQUFPLElBQUksWUFBVyxFQUFHLE9BQU8sSUFBSTtBQUVsRSxhQUFPO0lBQ1g7Ozs7O0lBTUEsTUFBTSxjQUFjLFFBQXNFLFVBQWlCO0FBQ3ZHLFVBQUksT0FBNEIsTUFBTSxLQUFLLFFBQVEsTUFBTTtBQUV6RCxVQUFJLE9BQU8sU0FBUztBQUFVLGVBQU8sSUFBSSxZQUFZLFFBQVEsRUFBRSxPQUFPLElBQUk7QUFFMUUsYUFBTztJQUNYO0lBRUEsTUFBTSxPQUFnQyxRQUEwQjtBQUM1RCxVQUFJO0FBQ0EsZUFBTyxNQUFNLEtBQUssSUFBSSxNQUFNO01BQ2hDLFNBQVMsS0FBSztBQUNWLFlBQUksQ0FBQyxzQkFBc0IsR0FBRztBQUFHLGdCQUFNO0FBQ3ZDLGVBQU87VUFDSCxLQUFLO1VBQ0wsT0FBTztVQUNQLEtBQUs7O01BRWI7SUFDSjtJQUVBLE1BQU0sS0FBOEIsUUFBNEI7QUFDNUQsWUFBTSxPQUFPLGlCQUFzRCxNQUFNLEtBQUssTUFBTSxnQ0FBZ0MsTUFBTSxDQUFDO0FBRTNILGFBQU87SUFDWDtJQUVBLE1BQU0sSUFBNkIsUUFBeUI7QUFDeEQsWUFBTSxPQUFPLE1BQU0sS0FBSyxLQUFLLDhCQUE4QixNQUFNO0FBRWpFLGFBQU87SUFDWDtJQUVBLE1BQU0sV0FBVyxLQUFzQjtBQUNuQyxZQUFNLE9BQU8sTUFBTSxLQUFLLEtBQUssK0JBQStCLEdBQUc7QUFFL0QsYUFBTyxLQUFLO0lBQ2hCO0lBRUEsTUFBTSxRQUFpQyxRQUF5QjtBQUM1RCxVQUFJO0FBQ0EsY0FBTSxLQUFLLElBQUksTUFBTTtBQUNyQixlQUFPO01BQ1gsU0FBUyxLQUFLO0FBQ1YsWUFBSSxDQUFDLG1CQUFtQixHQUFHLEdBQUc7QUFDMUIsZ0JBQU07UUFDVjtBQUNBLGVBQU87TUFDWDtJQUNKO0lBRUEsTUFBTSxPQUFnQyxRQUE0QjtBQUM5RCxZQUFNLE9BQU8sTUFBTSxLQUFLLEtBQUssaUNBQWlDLE1BQU07QUFFcEUsYUFBTztJQUNYO0lBRUEsTUFBTSxPQUFnQyxRQUE0QjtBQUM5RCxZQUFNLE9BQU8sTUFBTSxLQUFLLEtBQUssaUNBQWlDLE1BQU07QUFFcEUsYUFBTztJQUNYO0lBRVEsTUFBTSxpQkFDVixPQUNBLEtBQ0EsT0FDQSxZQUNBLGNBQXFDO0FBRXJDLFlBQU0sV0FBVztBQUVqQixZQUFNLFVBQWUsQ0FBQTtBQUVyQixVQUFJLFNBQTZCO0FBQ2pDLFNBQUc7QUFDQyxjQUFNLE9BQU8sTUFBTSxNQUNmLFFBQ0EsVUFBVSxTQUNKLFdBQ0EsUUFBUSxXQUFXLElBQ2YsV0FDQSxLQUFLO0FBRW5CLGNBQU0sZUFBZSxXQUFXLElBQUk7QUFFcEMsWUFBSSxDQUFDLGFBQWEsVUFDZCxhQUFhLE1BQ1QsT0FBSyxRQUFRLEtBQUssUUFBTSxhQUFhLElBQUksQ0FBQyxDQUFDLENBQUMsR0FFbEQ7QUFDRTtRQUNKO0FBRUEsWUFBSSxVQUFVLFFBQVc7QUFDckIsbUJBQVMsYUFBYTtRQUMxQjtBQUVBLGdCQUFRLEtBQUssR0FBRyxZQUFZO0FBRTVCLGlCQUFTLEtBQUs7QUFFZCxZQUFJLENBQUM7QUFBUTtNQUNqQixTQUFTO0FBRVQsYUFBTyxFQUFFLENBQUMsR0FBRyxHQUFHLFNBQVMsT0FBTTtJQUNuQztJQUVBLE1BQU0sY0FBdUMsUUFLNUM7QUFDRyxZQUFNLE9BQU8saUJBQXNELE1BQU0sS0FBSyxpQkFDMUUsT0FBTyxPQUNQLFdBQ0EsT0FBTyxRQUFRLFVBQVUsTUFBTSxLQUFLLE1BQU0sZ0NBQWdDO1FBQ3RFLE1BQU0sT0FBTztRQUNiLFlBQVksT0FBTztRQUNuQjtRQUNBLFNBQVMsT0FBTyxXQUFXO1FBQzNCO09BQ0gsR0FDRCxZQUFVLE9BQU8sU0FDakIsQ0FBQyxHQUFHLE1BQU0sRUFBRSxRQUFRLEVBQUUsR0FBRyxDQUM1QjtBQUVELGFBQU87SUFDWDtJQUVBLE1BQU0sbUJBQW1CLFFBR3hCO0FBQ0csYUFBTyxNQUFNLEtBQUssaUJBQ2QsT0FBTyxPQUNQLFFBQ0EsT0FBTyxRQUFRLFVBQVUsTUFBTSxLQUFLLE1BQU0sOEJBQThCO1FBQ3BFLEtBQUssT0FBTztRQUNaO1FBQ0E7T0FDSCxHQUNELFlBQVUsT0FBTyxNQUNqQixDQUFDLEdBQUcsTUFBTSxNQUFNLENBQUM7SUFFekI7SUFFQSxNQUFNLG1CQUFtQixRQUd4QjtBQUNHLGFBQU8sTUFBTSxLQUFLLGlCQUNkLE9BQU8sT0FDUCxTQUNBLE9BQU8sUUFBUSxVQUFVLE1BQU0sS0FBSyxNQUFNLDhCQUE4QjtRQUNwRTtRQUNBO09BQ0gsR0FDRCxZQUFVLE9BQU8sT0FDakIsQ0FBQyxHQUFHLE1BQU0sRUFBRSxRQUFRLEVBQUUsR0FBRztJQUVqQztJQUVBLE1BQU0sV0FBVyxRQUF1QztBQUNwRCxhQUFPLE1BQU0sS0FBSyxLQUFLLGdDQUFnQyxNQUFNO0lBQ2pFO0lBRUEsTUFBTSxjQUFjLFFBQWM7QUFDOUIsVUFBSSxPQUFPLFdBQVcsTUFBTTtBQUFHLGVBQU87QUFFdEMsWUFBTSxFQUFFLElBQUcsSUFBSyxNQUFNLEtBQUssTUFBTSxzQ0FBc0M7UUFDbkU7T0FDSDtBQUVELGFBQU87SUFDWDs7OztBTzVYRyxNQUFNLHNCQUFzQixDQUFDQyxXQUFrQixhQUFxQixRQUFnQjtBQUMxRixXQUFPLENBQUMsVUFBNkI7QUFDcEMsWUFBTSxRQUFRLEtBQUssZUFBZTtBQUNsQyxVQUFJLE1BQU07QUFFVixVQUFJLE9BQU87QUFDWCxVQUFJLFNBQVM7QUFDYixlQUFTLElBQUksR0FBRyxJQUFJLE1BQU0sUUFBUSxFQUFFLEdBQUc7QUFFdEMsaUJBQVUsVUFBVSxJQUFLLE1BQU0sQ0FBQztBQUNoQyxnQkFBUTtBQUdSLGVBQU8sT0FBTyxhQUFhO0FBQzFCLGtCQUFRO0FBQ1IsaUJBQU9BLFVBQVMsT0FBUSxVQUFVLElBQUs7UUFDeEM7TUFDRDtBQUdBLFVBQUksU0FBUyxHQUFHO0FBQ2YsZUFBT0EsVUFBUyxPQUFRLFVBQVcsY0FBYyxJQUFNO01BQ3hEO0FBR0EsVUFBSSxLQUFLO0FBQ1IsZ0JBQVMsSUFBSSxTQUFTLGNBQWUsT0FBTyxHQUFHO0FBQzlDLGlCQUFPO1FBQ1I7TUFDRDtBQUVBLGFBQU87SUFDUjtFQUNEOzs7QUNqQ0EsTUFBTSwyQkFBMkIsZ0JBQWdCO0FBRWpELE1BQU0saUJBQWlCO0FBYWhCLE1BQU0sV0FBVyxDQUFDLDJCQUNSLG9DQUFvQixnQkFBZ0IsR0FBRyxLQUFLLElBQzFELENBQUMsVUFBNkI7QUFDOUIsV0FBTyxNQUFNLFNBQVMsRUFBRSxVQUFVLFVBQVUsYUFBYSxLQUFJLENBQUU7RUFDaEU7OztBQ1RGLFdBQVMsUUFBUSxHQUFVO0FBQ3pCLFdBQU8sYUFBYSxjQUFlLFlBQVksT0FBTyxDQUFDLEtBQUssRUFBRSxZQUFZLFNBQVM7RUFDckY7QUFFQSxXQUFTLFVBQVUsVUFBbUIsS0FBVTtBQUM5QyxRQUFJLENBQUMsTUFBTSxRQUFRLEdBQUc7QUFBRyxhQUFPO0FBQ2hDLFFBQUksSUFBSSxXQUFXO0FBQUcsYUFBTztBQUM3QixRQUFJLFVBQVU7QUFDWixhQUFPLElBQUksTUFBTSxDQUFDLFNBQVMsT0FBTyxTQUFTLFFBQVE7SUFDckQsT0FBTztBQUNMLGFBQU8sSUFBSSxNQUFNLENBQUMsU0FBUyxPQUFPLGNBQWMsSUFBSSxDQUFDO0lBQ3ZEO0VBQ0Y7QUFJQSxXQUFTLElBQUksT0FBZTtBQUMxQixRQUFJLE9BQU8sVUFBVTtBQUFZLFlBQU0sSUFBSSxNQUFNLG1CQUFtQjtBQUNwRSxXQUFPO0VBQ1Q7QUFFQSxXQUFTLEtBQUssT0FBZSxPQUFjO0FBQ3pDLFFBQUksT0FBTyxVQUFVO0FBQVUsWUFBTSxJQUFJLE1BQU0sR0FBRyxLQUFLLG1CQUFtQjtBQUMxRSxXQUFPO0VBQ1Q7QUFFQSxXQUFTLFFBQVEsR0FBUztBQUN4QixRQUFJLENBQUMsT0FBTyxjQUFjLENBQUM7QUFBRyxZQUFNLElBQUksTUFBTSxvQkFBb0IsQ0FBQyxFQUFFO0VBQ3ZFO0FBR0EsV0FBUyxLQUFLLE9BQVk7QUFDeEIsUUFBSSxDQUFDLE1BQU0sUUFBUSxLQUFLO0FBQUcsWUFBTSxJQUFJLE1BQU0sZ0JBQWdCO0VBQzdEO0FBQ0EsV0FBUyxRQUFRLE9BQWUsT0FBZTtBQUM3QyxRQUFJLENBQUMsVUFBVSxNQUFNLEtBQUs7QUFBRyxZQUFNLElBQUksTUFBTSxHQUFHLEtBQUssNkJBQTZCO0VBQ3BGO0FBQ0EsV0FBUyxRQUFRLE9BQWUsT0FBZTtBQUM3QyxRQUFJLENBQUMsVUFBVSxPQUFPLEtBQUs7QUFBRyxZQUFNLElBQUksTUFBTSxHQUFHLEtBQUssNkJBQTZCO0VBQ3JGOztBQXFCQSxXQUFTLFNBQXVDLE1BQU87QUFDckQsVUFBTSxLQUFLLENBQUMsTUFBVztBQUV2QixVQUFNLE9BQU8sQ0FBQyxHQUFRLE1BQVcsQ0FBQyxNQUFXLEVBQUUsRUFBRSxDQUFDLENBQUM7QUFFbkQsVUFBTSxTQUFTLEtBQUssSUFBSSxDQUFDLE1BQU0sRUFBRSxNQUFNLEVBQUUsWUFBWSxNQUFNLEVBQUU7QUFFN0QsVUFBTSxTQUFTLEtBQUssSUFBSSxDQUFDLE1BQU0sRUFBRSxNQUFNLEVBQUUsT0FBTyxNQUFNLEVBQUU7QUFDeEQsV0FBTyxFQUFFLFFBQVEsT0FBTTtFQUN6Qjs7QUFPQSxXQUFTLFNBQVMsU0FBMEI7QUFFMUMsVUFBTSxXQUFXLE9BQU8sWUFBWSxXQUFXLFFBQVEsTUFBTSxFQUFFLElBQUk7QUFDbkUsVUFBTSxNQUFNLFNBQVM7QUFDckIsWUFBUSxZQUFZLFFBQVE7QUFHNUIsVUFBTSxVQUFVLElBQUksSUFBSSxTQUFTLElBQUksQ0FBQyxHQUFHLE1BQU0sQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDO0FBQ3RELFdBQU87TUFDTCxRQUFRLENBQUMsV0FBb0I7QUFDM0IsYUFBSyxNQUFNO0FBQ1gsZUFBTyxPQUFPLElBQUksQ0FBQyxNQUFLO0FBQ3RCLGNBQUksQ0FBQyxPQUFPLGNBQWMsQ0FBQyxLQUFLLElBQUksS0FBSyxLQUFLO0FBQzVDLGtCQUFNLElBQUksTUFDUixrREFBa0QsQ0FBQyxlQUFlLE9BQU8sRUFBRTtBQUUvRSxpQkFBTyxTQUFTLENBQUM7UUFDbkIsQ0FBQztNQUNIO01BQ0EsUUFBUSxDQUFDLFVBQTZCO0FBQ3BDLGFBQUssS0FBSztBQUNWLGVBQU8sTUFBTSxJQUFJLENBQUMsV0FBVTtBQUMxQixlQUFLLG1CQUFtQixNQUFNO0FBQzlCLGdCQUFNLElBQUksUUFBUSxJQUFJLE1BQU07QUFDNUIsY0FBSSxNQUFNO0FBQVcsa0JBQU0sSUFBSSxNQUFNLG9CQUFvQixNQUFNLGVBQWUsT0FBTyxFQUFFO0FBQ3ZGLGlCQUFPO1FBQ1QsQ0FBQztNQUNIOztFQUVKOztBQUtBLFdBQVMsS0FBSyxZQUFZLElBQUU7QUFDMUIsU0FBSyxRQUFRLFNBQVM7QUFDdEIsV0FBTztNQUNMLFFBQVEsQ0FBQyxTQUFRO0FBQ2YsZ0JBQVEsZUFBZSxJQUFJO0FBQzNCLGVBQU8sS0FBSyxLQUFLLFNBQVM7TUFDNUI7TUFDQSxRQUFRLENBQUMsT0FBTTtBQUNiLGFBQUssZUFBZSxFQUFFO0FBQ3RCLGVBQU8sR0FBRyxNQUFNLFNBQVM7TUFDM0I7O0VBRUo7QUFzRkEsTUFBTSxNQUFNLENBQUMsR0FBVyxNQUF1QixNQUFNLElBQUksSUFBSSxJQUFJLEdBQUcsSUFBSSxDQUFDO0FBQ3pFLE1BQU0seUNBQXlDLENBQUMsTUFBYyxPQUM1RCxRQUFRLEtBQUssSUFBSSxNQUFNLEVBQUU7QUFDM0IsTUFBTSxTQUFvQyx1QkFBSztBQUM3QyxRQUFJLE1BQU0sQ0FBQTtBQUNWLGFBQVMsSUFBSSxHQUFHLElBQUksSUFBSTtBQUFLLFVBQUksS0FBSyxLQUFLLENBQUM7QUFDNUMsV0FBTztFQUNULEdBQUU7QUFJRixXQUFTLGNBQWMsTUFBZ0IsTUFBYyxJQUFZLFNBQWdCO0FBQy9FLFNBQUssSUFBSTtBQUNULFFBQUksUUFBUSxLQUFLLE9BQU87QUFBSSxZQUFNLElBQUksTUFBTSw2QkFBNkIsSUFBSSxFQUFFO0FBQy9FLFFBQUksTUFBTSxLQUFLLEtBQUs7QUFBSSxZQUFNLElBQUksTUFBTSwyQkFBMkIsRUFBRSxFQUFFO0FBQ3ZFLFFBQUksNEJBQVksTUFBTSxFQUFFLElBQUksSUFBSTtBQUM5QixZQUFNLElBQUksTUFDUixzQ0FBc0MsSUFBSSxPQUFPLEVBQUUsY0FBYyw0QkFBWSxNQUFNLEVBQUUsQ0FBQyxFQUFFO0lBRTVGO0FBQ0EsUUFBSSxRQUFRO0FBQ1osUUFBSSxNQUFNO0FBQ1YsVUFBTSxNQUFNLE9BQU8sSUFBSTtBQUN2QixVQUFNLE9BQU8sT0FBTyxFQUFFLElBQUs7QUFDM0IsVUFBTSxNQUFnQixDQUFBO0FBQ3RCLGVBQVcsS0FBSyxNQUFNO0FBQ3BCLGNBQVEsQ0FBQztBQUNULFVBQUksS0FBSztBQUFLLGNBQU0sSUFBSSxNQUFNLG9DQUFvQyxDQUFDLFNBQVMsSUFBSSxFQUFFO0FBQ2xGLGNBQVMsU0FBUyxPQUFRO0FBQzFCLFVBQUksTUFBTSxPQUFPO0FBQUksY0FBTSxJQUFJLE1BQU0scUNBQXFDLEdBQUcsU0FBUyxJQUFJLEVBQUU7QUFDNUYsYUFBTztBQUNQLGFBQU8sT0FBTyxJQUFJLE9BQU87QUFBSSxZQUFJLE1BQU8sU0FBVSxNQUFNLEtBQU8sVUFBVSxDQUFDO0FBQzFFLFlBQU1DLE9BQU0sT0FBTyxHQUFHO0FBQ3RCLFVBQUlBLFNBQVE7QUFBVyxjQUFNLElBQUksTUFBTSxlQUFlO0FBQ3RELGVBQVNBLE9BQU07SUFDakI7QUFDQSxZQUFTLFNBQVUsS0FBSyxNQUFRO0FBQ2hDLFFBQUksQ0FBQyxXQUFXLE9BQU87QUFBTSxZQUFNLElBQUksTUFBTSxnQkFBZ0I7QUFDN0QsUUFBSSxDQUFDLFdBQVcsUUFBUTtBQUFHLFlBQU0sSUFBSSxNQUFNLHFCQUFxQixLQUFLLEVBQUU7QUFDdkUsUUFBSSxXQUFXLE1BQU07QUFBRyxVQUFJLEtBQUssVUFBVSxDQUFDO0FBQzVDLFdBQU87RUFDVDs7QUF5QkEsV0FBUyxPQUFPLE1BQWMsYUFBYSxPQUFLO0FBQzlDLFlBQVEsSUFBSTtBQUNaLFFBQUksUUFBUSxLQUFLLE9BQU87QUFBSSxZQUFNLElBQUksTUFBTSxtQ0FBbUM7QUFDL0UsUUFBSSw0QkFBWSxHQUFHLElBQUksSUFBSSxNQUFNLDRCQUFZLE1BQU0sQ0FBQyxJQUFJO0FBQ3RELFlBQU0sSUFBSSxNQUFNLHdCQUF3QjtBQUMxQyxXQUFPO01BQ0wsUUFBUSxDQUFDLFVBQXFCO0FBQzVCLFlBQUksQ0FBQyxRQUFRLEtBQUs7QUFBRyxnQkFBTSxJQUFJLE1BQU0sMENBQTBDO0FBQy9FLGVBQU8sY0FBYyxNQUFNLEtBQUssS0FBSyxHQUFHLEdBQUcsTUFBTSxDQUFDLFVBQVU7TUFDOUQ7TUFDQSxRQUFRLENBQUMsV0FBb0I7QUFDM0IsZ0JBQVEsaUJBQWlCLE1BQU07QUFDL0IsZUFBTyxXQUFXLEtBQUssY0FBYyxRQUFRLE1BQU0sR0FBRyxVQUFVLENBQUM7TUFDbkU7O0VBRUo7QUFHQSxXQUFTLGNBQStDLElBQUs7QUFDM0QsUUFBSSxFQUFFO0FBQ04sV0FBTyxZQUFhLE1BQXNCO0FBQ3hDLFVBQUk7QUFDRixlQUFPLEdBQUcsTUFBTSxNQUFNLElBQUk7TUFDNUIsU0FBUyxHQUFHO01BQUM7SUFDZjtFQUNGO0FBb0ZPLE1BQU0sY0FBMEIsc0JBQ3JDLHVCQUFPLENBQUMsR0FDUix5QkFBUyxrRUFBa0UsR0FDM0UscUJBQUssRUFBRSxDQUFDO0FBeUZWLE1BQU0sZ0JBQXlDLHNCQUM3Qyx5QkFBUyxrQ0FBa0MsR0FDM0MscUJBQUssRUFBRSxDQUFDO0FBR1YsTUFBTSxxQkFBcUIsQ0FBQyxXQUFZLFdBQVksV0FBWSxZQUFZLFNBQVU7QUFDdEYsV0FBUyxjQUFjLEtBQVc7QUFDaEMsVUFBTSxJQUFJLE9BQU87QUFDakIsUUFBSSxPQUFPLE1BQU0sYUFBYztBQUMvQixhQUFTLElBQUksR0FBRyxJQUFJLG1CQUFtQixRQUFRLEtBQUs7QUFDbEQsV0FBTSxLQUFLLElBQUssT0FBTztBQUFHLGVBQU8sbUJBQW1CLENBQUM7SUFDdkQ7QUFDQSxXQUFPO0VBQ1Q7QUFFQSxXQUFTLGFBQWEsUUFBZ0IsT0FBaUIsZ0JBQWdCLEdBQUM7QUFDdEUsVUFBTSxNQUFNLE9BQU87QUFDbkIsUUFBSSxNQUFNO0FBQ1YsYUFBUyxJQUFJLEdBQUcsSUFBSSxLQUFLLEtBQUs7QUFDNUIsWUFBTSxJQUFJLE9BQU8sV0FBVyxDQUFDO0FBQzdCLFVBQUksSUFBSSxNQUFNLElBQUk7QUFBSyxjQUFNLElBQUksTUFBTSxtQkFBbUIsTUFBTSxHQUFHO0FBQ25FLFlBQU0sY0FBYyxHQUFHLElBQUssS0FBSztJQUNuQztBQUNBLFVBQU0sY0FBYyxHQUFHO0FBQ3ZCLGFBQVMsSUFBSSxHQUFHLElBQUksS0FBSztBQUFLLFlBQU0sY0FBYyxHQUFHLElBQUssT0FBTyxXQUFXLENBQUMsSUFBSTtBQUNqRixhQUFTLEtBQUs7QUFBTyxZQUFNLGNBQWMsR0FBRyxJQUFJO0FBQ2hELGFBQVMsSUFBSSxHQUFHLElBQUksR0FBRztBQUFLLFlBQU0sY0FBYyxHQUFHO0FBQ25ELFdBQU87QUFDUCxXQUFPLGNBQWMsT0FBTyxjQUFjLENBQUMsTUFBTSxPQUFPLEVBQUUsQ0FBRSxHQUFHLElBQUksR0FBRyxLQUFLLENBQUM7RUFDOUU7O0FBc0JBLFdBQVMsVUFBVSxVQUE4QjtBQUMvQyxVQUFNLGlCQUFpQixhQUFhLFdBQVcsSUFBSTtBQUNuRCxVQUFNLFNBQVMsdUJBQU8sQ0FBQztBQUN2QixVQUFNLFlBQVksT0FBTztBQUN6QixVQUFNLFVBQVUsT0FBTztBQUN2QixVQUFNLGtCQUFrQixjQUFjLFNBQVM7QUFFL0MsYUFBUyxPQUNQLFFBQ0EsT0FDQSxRQUF3QixJQUFFO0FBRTFCLFdBQUssd0JBQXdCLE1BQU07QUFDbkMsVUFBSSxRQUFRLEtBQUs7QUFBRyxnQkFBUSxNQUFNLEtBQUssS0FBSztBQUM1QyxjQUFRLGlCQUFpQixLQUFLO0FBQzlCLFlBQU0sT0FBTyxPQUFPO0FBQ3BCLFVBQUksU0FBUztBQUFHLGNBQU0sSUFBSSxVQUFVLHlCQUF5QixJQUFJLEVBQUU7QUFDbkUsWUFBTSxlQUFlLE9BQU8sSUFBSSxNQUFNO0FBQ3RDLFVBQUksVUFBVSxTQUFTLGVBQWU7QUFDcEMsY0FBTSxJQUFJLFVBQVUsVUFBVSxZQUFZLGtCQUFrQixLQUFLLEVBQUU7QUFDckUsWUFBTSxVQUFVLE9BQU8sWUFBVztBQUNsQyxZQUFNLE1BQU0sYUFBYSxTQUFTLE9BQU8sY0FBYztBQUN2RCxhQUFPLEdBQUcsT0FBTyxJQUFJLGNBQWMsT0FBTyxLQUFLLENBQUMsR0FBRyxHQUFHO0lBQ3hEO0FBT0EsYUFBUyxPQUFPLEtBQWEsUUFBd0IsSUFBRTtBQUNyRCxXQUFLLHVCQUF1QixHQUFHO0FBQy9CLFlBQU0sT0FBTyxJQUFJO0FBQ2pCLFVBQUksT0FBTyxLQUFNLFVBQVUsU0FBUyxPQUFPO0FBQ3pDLGNBQU0sSUFBSSxVQUFVLDBCQUEwQixJQUFJLEtBQUssR0FBRyxtQkFBbUIsS0FBSyxHQUFHO0FBRXZGLFlBQU0sVUFBVSxJQUFJLFlBQVc7QUFDL0IsVUFBSSxRQUFRLFdBQVcsUUFBUSxJQUFJLFlBQVc7QUFDNUMsY0FBTSxJQUFJLE1BQU0sdUNBQXVDO0FBQ3pELFlBQU0sV0FBVyxRQUFRLFlBQVksR0FBRztBQUN4QyxVQUFJLGFBQWEsS0FBSyxhQUFhO0FBQ2pDLGNBQU0sSUFBSSxNQUFNLHlEQUF5RDtBQUMzRSxZQUFNLFNBQVMsUUFBUSxNQUFNLEdBQUcsUUFBUTtBQUN4QyxZQUFNLE9BQU8sUUFBUSxNQUFNLFdBQVcsQ0FBQztBQUN2QyxVQUFJLEtBQUssU0FBUztBQUFHLGNBQU0sSUFBSSxNQUFNLHlDQUF5QztBQUM5RSxZQUFNLFFBQVEsY0FBYyxPQUFPLElBQUksRUFBRSxNQUFNLEdBQUcsRUFBRTtBQUNwRCxZQUFNLE1BQU0sYUFBYSxRQUFRLE9BQU8sY0FBYztBQUN0RCxVQUFJLENBQUMsS0FBSyxTQUFTLEdBQUc7QUFBRyxjQUFNLElBQUksTUFBTSx1QkFBdUIsR0FBRyxlQUFlLEdBQUcsR0FBRztBQUN4RixhQUFPLEVBQUUsUUFBUSxNQUFLO0lBQ3hCO0FBRUEsVUFBTSxlQUFlLGNBQWMsTUFBTTtBQUV6QyxhQUFTLGNBQWMsS0FBVztBQUNoQyxZQUFNLEVBQUUsUUFBUSxNQUFLLElBQUssT0FBTyxLQUFLLEtBQUs7QUFDM0MsYUFBTyxFQUFFLFFBQVEsT0FBTyxPQUFPLFVBQVUsS0FBSyxFQUFDO0lBQ2pEO0FBRUEsYUFBUyxnQkFBZ0IsUUFBZ0IsT0FBaUI7QUFDeEQsYUFBTyxPQUFPLFFBQVEsUUFBUSxLQUFLLENBQUM7SUFDdEM7QUFFQSxXQUFPO01BQ0w7TUFDQTtNQUNBO01BQ0E7TUFDQTtNQUNBO01BQ0E7TUFDQTs7RUFFSjtBQUtPLE1BQU0sU0FBaUIsMEJBQVUsUUFBUTs7O0FDbG1CaEQsV0FBU0MsU0FBUSxHQUFTO0FBQ3hCLFFBQUksQ0FBQyxPQUFPLGNBQWMsQ0FBQyxLQUFLLElBQUk7QUFBRyxZQUFNLElBQUksTUFBTSxvQ0FBb0MsQ0FBQztFQUM5RjtBQUdBLFdBQVNDLFNBQVEsR0FBVTtBQUN6QixXQUFPLGFBQWEsY0FBZSxZQUFZLE9BQU8sQ0FBQyxLQUFLLEVBQUUsWUFBWSxTQUFTO0VBQ3JGO0FBRUEsV0FBUyxPQUFPLE1BQThCLFNBQWlCO0FBQzdELFFBQUksQ0FBQ0EsU0FBUSxDQUFDO0FBQUcsWUFBTSxJQUFJLE1BQU0scUJBQXFCO0FBQ3RELFFBQUksUUFBUSxTQUFTLEtBQUssQ0FBQyxRQUFRLFNBQVMsRUFBRSxNQUFNO0FBQ2xELFlBQU0sSUFBSSxNQUFNLG1DQUFtQyxVQUFVLGtCQUFrQixFQUFFLE1BQU07RUFDM0Y7QUFRQSxXQUFTLE1BQU0sR0FBTztBQUNwQixRQUFJLE9BQU8sTUFBTSxjQUFjLE9BQU8sRUFBRSxXQUFXO0FBQ2pELFlBQU0sSUFBSSxNQUFNLGlEQUFpRDtBQUNuRSxJQUFBRCxTQUFRLEVBQUUsU0FBUztBQUNuQixJQUFBQSxTQUFRLEVBQUUsUUFBUTtFQUNwQjtBQUVBLFdBQVMsUUFBUSxVQUFlLGdCQUFnQixNQUFJO0FBQ2xELFFBQUksU0FBUztBQUFXLFlBQU0sSUFBSSxNQUFNLGtDQUFrQztBQUMxRSxRQUFJLGlCQUFpQixTQUFTO0FBQVUsWUFBTSxJQUFJLE1BQU0sdUNBQXVDO0VBQ2pHO0FBQ0EsV0FBUyxRQUFRLEtBQVUsVUFBYTtBQUN0QyxXQUFPLEdBQUc7QUFDVixVQUFNLE1BQU0sU0FBUztBQUNyQixRQUFJLElBQUksU0FBUyxLQUFLO0FBQ3BCLFlBQU0sSUFBSSxNQUFNLDJEQUEyRCxHQUFHO0lBQ2hGO0VBQ0Y7OztBQ3hDTyxNQUFNRSxVQUNYLE9BQU8sZUFBZSxZQUFZLFlBQVksYUFBYSxXQUFXLFNBQVM7OztBQ3VCMUUsTUFBTSxNQUFNLENBQUMsUUFDbEIsSUFBSSxZQUFZLElBQUksUUFBUSxJQUFJLFlBQVksS0FBSyxNQUFNLElBQUksYUFBYSxDQUFDLENBQUM7QUFHckUsTUFBTSxhQUFhLENBQUMsUUFDekIsSUFBSSxTQUFTLElBQUksUUFBUSxJQUFJLFlBQVksSUFBSSxVQUFVO0FBR2xELE1BQU0sT0FBTyxDQUFDLE1BQWMsVUFDaEMsUUFBUyxLQUFLLFFBQVcsU0FBUztBQUU5QixNQUFNLE9BQU8sQ0FBQyxNQUFjLFVBQ2hDLFFBQVEsUUFBVyxTQUFVLEtBQUssVUFBWTtBQUcxQyxNQUFNLE9BQWlDLHVCQUM1QyxJQUFJLFdBQVcsSUFBSSxZQUFZLENBQUMsU0FBVSxDQUFDLEVBQUUsTUFBTSxFQUFFLENBQUMsTUFBTSxJQUFLO0FBRTVELE1BQU0sV0FBVyxDQUFDLFNBQ3JCLFFBQVEsS0FBTSxhQUNkLFFBQVEsSUFBSyxXQUNiLFNBQVMsSUFBSyxRQUNkLFNBQVMsS0FBTTtBQU9iLFdBQVUsV0FBVyxLQUFnQjtBQUN6QyxhQUFTLElBQUksR0FBRyxJQUFJLElBQUksUUFBUSxLQUFLO0FBQ25DLFVBQUksQ0FBQyxJQUFJLFNBQVMsSUFBSSxDQUFDLENBQUM7SUFDMUI7RUFDRjtBQWlGTSxXQUFVLFlBQVksS0FBVztBQUNyQyxRQUFJLE9BQU8sUUFBUTtBQUFVLFlBQU0sSUFBSSxNQUFNLHNDQUFzQyxPQUFPLEdBQUc7QUFDN0YsV0FBTyxJQUFJLFdBQVcsSUFBSSxZQUFXLEVBQUcsT0FBTyxHQUFHLENBQUM7RUFDckQ7QUFTTSxXQUFVLFFBQVEsTUFBVztBQUNqQyxRQUFJLE9BQU8sU0FBUztBQUFVLGFBQU8sWUFBWSxJQUFJO0FBQ3JELFdBQU8sSUFBSTtBQUNYLFdBQU87RUFDVDtBQXNCTSxNQUFnQixPQUFoQixNQUFvQjs7SUFzQnhCLFFBQUs7QUFDSCxhQUFPLEtBQUssV0FBVTtJQUN4Qjs7QUFlSSxXQUFVLFVBQ2QsVUFDQSxNQUFTO0FBRVQsUUFBSSxTQUFTLFVBQWEsQ0FBQSxFQUFHLFNBQVMsS0FBSyxJQUFJLE1BQU07QUFDbkQsWUFBTSxJQUFJLE1BQU0sdUNBQXVDO0FBQ3pELFVBQU0sU0FBUyxPQUFPLE9BQU8sVUFBVSxJQUFJO0FBQzNDLFdBQU87RUFDVDtBQU1NLFdBQVUsZ0JBQ2QsVUFBdUI7QUFPdkIsVUFBTSxRQUFRLENBQUMsUUFBMkIsU0FBUSxFQUFHLE9BQU8sUUFBUSxHQUFHLENBQUMsRUFBRSxPQUFNO0FBQ2hGLFVBQU0sTUFBTSxTQUFRO0FBQ3BCLFVBQU0sWUFBWSxJQUFJO0FBQ3RCLFVBQU0sV0FBVyxJQUFJO0FBQ3JCLFVBQU0sU0FBUyxNQUFNLFNBQVE7QUFDN0IsV0FBTztFQUNUO0FBcUNNLFdBQVUsWUFBWSxjQUFjLElBQUU7QUFDMUMsUUFBSUMsV0FBVSxPQUFPQSxRQUFPLG9CQUFvQixZQUFZO0FBQzFELGFBQU9BLFFBQU8sZ0JBQWdCLElBQUksV0FBVyxXQUFXLENBQUM7SUFDM0Q7QUFFQSxRQUFJQSxXQUFVLE9BQU9BLFFBQU8sZ0JBQWdCLFlBQVk7QUFDdEQsYUFBT0EsUUFBTyxZQUFZLFdBQVc7SUFDdkM7QUFDQSxVQUFNLElBQUksTUFBTSx3Q0FBd0M7RUFDMUQ7OztBQzVSTSxNQUFPLE9BQVAsY0FBdUMsS0FBYTtJQVF4RCxZQUFZLE1BQWEsTUFBVztBQUNsQyxZQUFLO0FBSkMsV0FBQSxXQUFXO0FBQ1gsV0FBQSxZQUFZO0FBSWxCLFlBQU0sSUFBSTtBQUNWLFlBQU0sTUFBTSxRQUFRLElBQUk7QUFDeEIsV0FBSyxRQUFRLEtBQUssT0FBTTtBQUN4QixVQUFJLE9BQU8sS0FBSyxNQUFNLFdBQVc7QUFDL0IsY0FBTSxJQUFJLE1BQU0scURBQXFEO0FBQ3ZFLFdBQUssV0FBVyxLQUFLLE1BQU07QUFDM0IsV0FBSyxZQUFZLEtBQUssTUFBTTtBQUM1QixZQUFNLFdBQVcsS0FBSztBQUN0QixZQUFNLE1BQU0sSUFBSSxXQUFXLFFBQVE7QUFFbkMsVUFBSSxJQUFJLElBQUksU0FBUyxXQUFXLEtBQUssT0FBTSxFQUFHLE9BQU8sR0FBRyxFQUFFLE9BQU0sSUFBSyxHQUFHO0FBQ3hFLGVBQVMsSUFBSSxHQUFHLElBQUksSUFBSSxRQUFRO0FBQUssWUFBSSxDQUFDLEtBQUs7QUFDL0MsV0FBSyxNQUFNLE9BQU8sR0FBRztBQUVyQixXQUFLLFFBQVEsS0FBSyxPQUFNO0FBRXhCLGVBQVMsSUFBSSxHQUFHLElBQUksSUFBSSxRQUFRO0FBQUssWUFBSSxDQUFDLEtBQUssS0FBTztBQUN0RCxXQUFLLE1BQU0sT0FBTyxHQUFHO0FBQ3JCLFVBQUksS0FBSyxDQUFDO0lBQ1o7SUFDQSxPQUFPLEtBQVU7QUFDZixjQUFRLElBQUk7QUFDWixXQUFLLE1BQU0sT0FBTyxHQUFHO0FBQ3JCLGFBQU87SUFDVDtJQUNBLFdBQVcsS0FBZTtBQUN4QixjQUFRLElBQUk7QUFDWixhQUFPLEtBQUssS0FBSyxTQUFTO0FBQzFCLFdBQUssV0FBVztBQUNoQixXQUFLLE1BQU0sV0FBVyxHQUFHO0FBQ3pCLFdBQUssTUFBTSxPQUFPLEdBQUc7QUFDckIsV0FBSyxNQUFNLFdBQVcsR0FBRztBQUN6QixXQUFLLFFBQU87SUFDZDtJQUNBLFNBQU07QUFDSixZQUFNLE1BQU0sSUFBSSxXQUFXLEtBQUssTUFBTSxTQUFTO0FBQy9DLFdBQUssV0FBVyxHQUFHO0FBQ25CLGFBQU87SUFDVDtJQUNBLFdBQVcsSUFBWTtBQUVyQixhQUFBLEtBQU8sT0FBTyxPQUFPLE9BQU8sZUFBZSxJQUFJLEdBQUcsQ0FBQSxDQUFFO0FBQ3BELFlBQU0sRUFBRSxPQUFPLE9BQU8sVUFBVSxXQUFXLFVBQVUsVUFBUyxJQUFLO0FBQ25FLFdBQUs7QUFDTCxTQUFHLFdBQVc7QUFDZCxTQUFHLFlBQVk7QUFDZixTQUFHLFdBQVc7QUFDZCxTQUFHLFlBQVk7QUFDZixTQUFHLFFBQVEsTUFBTSxXQUFXLEdBQUcsS0FBSztBQUNwQyxTQUFHLFFBQVEsTUFBTSxXQUFXLEdBQUcsS0FBSztBQUNwQyxhQUFPO0lBQ1Q7SUFDQSxVQUFPO0FBQ0wsV0FBSyxZQUFZO0FBQ2pCLFdBQUssTUFBTSxRQUFPO0FBQ2xCLFdBQUssTUFBTSxRQUFPO0lBQ3BCOztBQWFLLE1BQU0sT0FHVCxDQUFDLE1BQWEsS0FBWSxZQUM1QixJQUFJLEtBQVUsTUFBTSxHQUFHLEVBQUUsT0FBTyxPQUFPLEVBQUUsT0FBTTtBQUNqRCxPQUFLLFNBQVMsQ0FBQyxNQUFhLFFBQWUsSUFBSSxLQUFVLE1BQU0sR0FBRzs7O0FDM0U1RCxXQUFVLFFBQVEsTUFBYSxLQUFZLE1BQVk7QUFDM0QsVUFBTSxJQUFJO0FBSVYsUUFBSSxTQUFTO0FBQVcsYUFBTyxJQUFJLFdBQVcsS0FBSyxTQUFTO0FBQzVELFdBQU8sS0FBSyxNQUFNLFFBQVEsSUFBSSxHQUFHLFFBQVEsR0FBRyxDQUFDO0VBQy9DO0FBRUEsTUFBTSxlQUErQixvQkFBSSxXQUFXLENBQUMsQ0FBQyxDQUFDO0FBQ3ZELE1BQU0sZUFBK0Isb0JBQUksV0FBVTtBQVM3QyxXQUFVLE9BQU8sTUFBYSxLQUFZLE1BQWMsU0FBaUIsSUFBRTtBQUMvRSxVQUFNLElBQUk7QUFDVixJQUFBQyxTQUFRLE1BQU07QUFDZCxRQUFJLFNBQVMsTUFBTSxLQUFLO0FBQVcsWUFBTSxJQUFJLE1BQU0saUNBQWlDO0FBQ3BGLFVBQU0sU0FBUyxLQUFLLEtBQUssU0FBUyxLQUFLLFNBQVM7QUFDaEQsUUFBSSxTQUFTO0FBQVcsYUFBTztBQUUvQixVQUFNLE1BQU0sSUFBSSxXQUFXLFNBQVMsS0FBSyxTQUFTO0FBRWxELFVBQU1DLFFBQU8sS0FBSyxPQUFPLE1BQU0sR0FBRztBQUNsQyxVQUFNLFVBQVVBLE1BQUssV0FBVTtBQUMvQixVQUFNLElBQUksSUFBSSxXQUFXQSxNQUFLLFNBQVM7QUFDdkMsYUFBUyxVQUFVLEdBQUcsVUFBVSxRQUFRLFdBQVc7QUFDakQsbUJBQWEsQ0FBQyxJQUFJLFVBQVU7QUFHNUIsY0FBUSxPQUFPLFlBQVksSUFBSSxlQUFlLENBQUMsRUFDNUMsT0FBTyxJQUFJLEVBQ1gsT0FBTyxZQUFZLEVBQ25CLFdBQVcsQ0FBQztBQUNmLFVBQUksSUFBSSxHQUFHLEtBQUssWUFBWSxPQUFPO0FBQ25DLE1BQUFBLE1BQUssV0FBVyxPQUFPO0lBQ3pCO0FBQ0EsSUFBQUEsTUFBSyxRQUFPO0FBQ1osWUFBUSxRQUFPO0FBQ2YsTUFBRSxLQUFLLENBQUM7QUFDUixpQkFBYSxLQUFLLENBQUM7QUFDbkIsV0FBTyxJQUFJLE1BQU0sR0FBRyxNQUFNO0VBQzVCO0FBbUJPLE1BQU0sT0FBTyxDQUNsQixNQUNBLEtBQ0EsTUFDQSxNQUNBLFdBQ2UsT0FBTyxNQUFNLFFBQVEsTUFBTSxLQUFLLElBQUksR0FBRyxNQUFNLE1BQU07OztBQzlFOUQsV0FBVSxhQUNkLE1BQ0EsWUFDQSxPQUNBQyxPQUFhO0FBRWIsUUFBSSxPQUFPLEtBQUssaUJBQWlCO0FBQVksYUFBTyxLQUFLLGFBQWEsWUFBWSxPQUFPQSxLQUFJO0FBQzdGLFVBQU0sT0FBTyxPQUFPLEVBQUU7QUFDdEIsVUFBTSxXQUFXLE9BQU8sVUFBVTtBQUNsQyxVQUFNLEtBQUssT0FBUSxTQUFTLE9BQVEsUUFBUTtBQUM1QyxVQUFNLEtBQUssT0FBTyxRQUFRLFFBQVE7QUFDbEMsVUFBTSxJQUFJQSxRQUFPLElBQUk7QUFDckIsVUFBTSxJQUFJQSxRQUFPLElBQUk7QUFDckIsU0FBSyxVQUFVLGFBQWEsR0FBRyxJQUFJQSxLQUFJO0FBQ3ZDLFNBQUssVUFBVSxhQUFhLEdBQUcsSUFBSUEsS0FBSTtFQUN6QztBQUtPLE1BQU0sTUFBTSxDQUFDLEdBQVcsR0FBVyxNQUF1QixJQUFJLElBQU0sQ0FBQyxJQUFJO0FBS3pFLE1BQU0sTUFBTSxDQUFDLEdBQVcsR0FBVyxNQUF1QixJQUFJLElBQU0sSUFBSSxJQUFNLElBQUk7QUFNbkYsTUFBZ0IsU0FBaEIsY0FBb0QsS0FBTztJQWMvRCxZQUNXLFVBQ0YsV0FDRSxXQUNBQSxPQUFhO0FBRXRCLFlBQUs7QUFMSSxXQUFBLFdBQUE7QUFDRixXQUFBLFlBQUE7QUFDRSxXQUFBLFlBQUE7QUFDQSxXQUFBLE9BQUFBO0FBVEQsV0FBQSxXQUFXO0FBQ1gsV0FBQSxTQUFTO0FBQ1QsV0FBQSxNQUFNO0FBQ04sV0FBQSxZQUFZO0FBU3BCLFdBQUssU0FBUyxJQUFJLFdBQVcsUUFBUTtBQUNyQyxXQUFLLE9BQU8sV0FBVyxLQUFLLE1BQU07SUFDcEM7SUFDQSxPQUFPLE1BQVc7QUFDaEIsY0FBUSxJQUFJO0FBQ1osWUFBTSxFQUFFLE1BQU0sUUFBUSxTQUFRLElBQUs7QUFDbkMsYUFBTyxRQUFRLElBQUk7QUFDbkIsWUFBTSxNQUFNLEtBQUs7QUFDakIsZUFBUyxNQUFNLEdBQUcsTUFBTSxPQUFPO0FBQzdCLGNBQU0sT0FBTyxLQUFLLElBQUksV0FBVyxLQUFLLEtBQUssTUFBTSxHQUFHO0FBRXBELFlBQUksU0FBUyxVQUFVO0FBQ3JCLGdCQUFNLFdBQVcsV0FBVyxJQUFJO0FBQ2hDLGlCQUFPLFlBQVksTUFBTSxLQUFLLE9BQU87QUFBVSxpQkFBSyxRQUFRLFVBQVUsR0FBRztBQUN6RTtRQUNGO0FBQ0EsZUFBTyxJQUFJLEtBQUssU0FBUyxLQUFLLE1BQU0sSUFBSSxHQUFHLEtBQUssR0FBRztBQUNuRCxhQUFLLE9BQU87QUFDWixlQUFPO0FBQ1AsWUFBSSxLQUFLLFFBQVEsVUFBVTtBQUN6QixlQUFLLFFBQVEsTUFBTSxDQUFDO0FBQ3BCLGVBQUssTUFBTTtRQUNiO01BQ0Y7QUFDQSxXQUFLLFVBQVUsS0FBSztBQUNwQixXQUFLLFdBQVU7QUFDZixhQUFPO0lBQ1Q7SUFDQSxXQUFXLEtBQWU7QUFDeEIsY0FBUSxJQUFJO0FBQ1osY0FBUSxLQUFLLElBQUk7QUFDakIsV0FBSyxXQUFXO0FBSWhCLFlBQU0sRUFBRSxRQUFRLE1BQU0sVUFBVSxNQUFBQSxNQUFJLElBQUs7QUFDekMsVUFBSSxFQUFFLElBQUcsSUFBSztBQUVkLGFBQU8sS0FBSyxJQUFJO0FBQ2hCLFdBQUssT0FBTyxTQUFTLEdBQUcsRUFBRSxLQUFLLENBQUM7QUFHaEMsVUFBSSxLQUFLLFlBQVksV0FBVyxLQUFLO0FBQ25DLGFBQUssUUFBUSxNQUFNLENBQUM7QUFDcEIsY0FBTTtNQUNSO0FBRUEsZUFBUyxJQUFJLEtBQUssSUFBSSxVQUFVO0FBQUssZUFBTyxDQUFDLElBQUk7QUFJakQsbUJBQWEsTUFBTSxXQUFXLEdBQUcsT0FBTyxLQUFLLFNBQVMsQ0FBQyxHQUFHQSxLQUFJO0FBQzlELFdBQUssUUFBUSxNQUFNLENBQUM7QUFDcEIsWUFBTSxRQUFRLFdBQVcsR0FBRztBQUM1QixZQUFNLE1BQU0sS0FBSztBQUVqQixVQUFJLE1BQU07QUFBRyxjQUFNLElBQUksTUFBTSw2Q0FBNkM7QUFDMUUsWUFBTSxTQUFTLE1BQU07QUFDckIsWUFBTSxRQUFRLEtBQUssSUFBRztBQUN0QixVQUFJLFNBQVMsTUFBTTtBQUFRLGNBQU0sSUFBSSxNQUFNLG9DQUFvQztBQUMvRSxlQUFTLElBQUksR0FBRyxJQUFJLFFBQVE7QUFBSyxjQUFNLFVBQVUsSUFBSSxHQUFHLE1BQU0sQ0FBQyxHQUFHQSxLQUFJO0lBQ3hFO0lBQ0EsU0FBTTtBQUNKLFlBQU0sRUFBRSxRQUFRLFVBQVMsSUFBSztBQUM5QixXQUFLLFdBQVcsTUFBTTtBQUN0QixZQUFNLE1BQU0sT0FBTyxNQUFNLEdBQUcsU0FBUztBQUNyQyxXQUFLLFFBQU87QUFDWixhQUFPO0lBQ1Q7SUFDQSxXQUFXLElBQU07QUFDZixhQUFBLEtBQU8sSUFBSyxLQUFLLFlBQW1CO0FBQ3BDLFNBQUcsSUFBSSxHQUFHLEtBQUssSUFBRyxDQUFFO0FBQ3BCLFlBQU0sRUFBRSxVQUFVLFFBQVEsUUFBUSxVQUFVLFdBQVcsSUFBRyxJQUFLO0FBQy9ELFNBQUcsU0FBUztBQUNaLFNBQUcsTUFBTTtBQUNULFNBQUcsV0FBVztBQUNkLFNBQUcsWUFBWTtBQUNmLFVBQUksU0FBUztBQUFVLFdBQUcsT0FBTyxJQUFJLE1BQU07QUFDM0MsYUFBTztJQUNUOzs7O0FDL0hGLE1BQU0sV0FBMkIsb0JBQUksWUFBWTtJQUMvQztJQUFZO0lBQVk7SUFBWTtJQUFZO0lBQVk7SUFBWTtJQUFZO0lBQ3BGO0lBQVk7SUFBWTtJQUFZO0lBQVk7SUFBWTtJQUFZO0lBQVk7SUFDcEY7SUFBWTtJQUFZO0lBQVk7SUFBWTtJQUFZO0lBQVk7SUFBWTtJQUNwRjtJQUFZO0lBQVk7SUFBWTtJQUFZO0lBQVk7SUFBWTtJQUFZO0lBQ3BGO0lBQVk7SUFBWTtJQUFZO0lBQVk7SUFBWTtJQUFZO0lBQVk7SUFDcEY7SUFBWTtJQUFZO0lBQVk7SUFBWTtJQUFZO0lBQVk7SUFBWTtJQUNwRjtJQUFZO0lBQVk7SUFBWTtJQUFZO0lBQVk7SUFBWTtJQUFZO0lBQ3BGO0lBQVk7SUFBWTtJQUFZO0lBQVk7SUFBWTtJQUFZO0lBQVk7R0FDckY7QUFJRCxNQUFNLFlBQTRCLG9CQUFJLFlBQVk7SUFDaEQ7SUFBWTtJQUFZO0lBQVk7SUFBWTtJQUFZO0lBQVk7SUFBWTtHQUNyRjtBQU1ELE1BQU0sV0FBMkIsb0JBQUksWUFBWSxFQUFFO0FBQzdDLE1BQU8sU0FBUCxjQUFzQixPQUFjO0lBWXhDLGNBQUE7QUFDRSxZQUFNLElBQUksSUFBSSxHQUFHLEtBQUs7QUFWZCxXQUFBLElBQVksVUFBVSxDQUFDLElBQUk7QUFDM0IsV0FBQSxJQUFZLFVBQVUsQ0FBQyxJQUFJO0FBQzNCLFdBQUEsSUFBWSxVQUFVLENBQUMsSUFBSTtBQUMzQixXQUFBLElBQVksVUFBVSxDQUFDLElBQUk7QUFDM0IsV0FBQSxJQUFZLFVBQVUsQ0FBQyxJQUFJO0FBQzNCLFdBQUEsSUFBWSxVQUFVLENBQUMsSUFBSTtBQUMzQixXQUFBLElBQVksVUFBVSxDQUFDLElBQUk7QUFDM0IsV0FBQSxJQUFZLFVBQVUsQ0FBQyxJQUFJO0lBSXJDO0lBQ1UsTUFBRztBQUNYLFlBQU0sRUFBRSxHQUFHLEdBQUcsR0FBRyxHQUFHLEdBQUcsR0FBRyxHQUFHLEVBQUMsSUFBSztBQUNuQyxhQUFPLENBQUMsR0FBRyxHQUFHLEdBQUcsR0FBRyxHQUFHLEdBQUcsR0FBRyxDQUFDO0lBQ2hDOztJQUVVLElBQ1IsR0FBVyxHQUFXLEdBQVcsR0FBVyxHQUFXLEdBQVcsR0FBVyxHQUFTO0FBRXRGLFdBQUssSUFBSSxJQUFJO0FBQ2IsV0FBSyxJQUFJLElBQUk7QUFDYixXQUFLLElBQUksSUFBSTtBQUNiLFdBQUssSUFBSSxJQUFJO0FBQ2IsV0FBSyxJQUFJLElBQUk7QUFDYixXQUFLLElBQUksSUFBSTtBQUNiLFdBQUssSUFBSSxJQUFJO0FBQ2IsV0FBSyxJQUFJLElBQUk7SUFDZjtJQUNVLFFBQVEsTUFBZ0IsUUFBYztBQUU5QyxlQUFTLElBQUksR0FBRyxJQUFJLElBQUksS0FBSyxVQUFVO0FBQUcsaUJBQVMsQ0FBQyxJQUFJLEtBQUssVUFBVSxRQUFRLEtBQUs7QUFDcEYsZUFBUyxJQUFJLElBQUksSUFBSSxJQUFJLEtBQUs7QUFDNUIsY0FBTSxNQUFNLFNBQVMsSUFBSSxFQUFFO0FBQzNCLGNBQU0sS0FBSyxTQUFTLElBQUksQ0FBQztBQUN6QixjQUFNLEtBQUssS0FBSyxLQUFLLENBQUMsSUFBSSxLQUFLLEtBQUssRUFBRSxJQUFLLFFBQVE7QUFDbkQsY0FBTSxLQUFLLEtBQUssSUFBSSxFQUFFLElBQUksS0FBSyxJQUFJLEVBQUUsSUFBSyxPQUFPO0FBQ2pELGlCQUFTLENBQUMsSUFBSyxLQUFLLFNBQVMsSUFBSSxDQUFDLElBQUksS0FBSyxTQUFTLElBQUksRUFBRSxJQUFLO01BQ2pFO0FBRUEsVUFBSSxFQUFFLEdBQUcsR0FBRyxHQUFHLEdBQUcsR0FBRyxHQUFHLEdBQUcsRUFBQyxJQUFLO0FBQ2pDLGVBQVMsSUFBSSxHQUFHLElBQUksSUFBSSxLQUFLO0FBQzNCLGNBQU0sU0FBUyxLQUFLLEdBQUcsQ0FBQyxJQUFJLEtBQUssR0FBRyxFQUFFLElBQUksS0FBSyxHQUFHLEVBQUU7QUFDcEQsY0FBTSxLQUFNLElBQUksU0FBUyxJQUFJLEdBQUcsR0FBRyxDQUFDLElBQUksU0FBUyxDQUFDLElBQUksU0FBUyxDQUFDLElBQUs7QUFDckUsY0FBTSxTQUFTLEtBQUssR0FBRyxDQUFDLElBQUksS0FBSyxHQUFHLEVBQUUsSUFBSSxLQUFLLEdBQUcsRUFBRTtBQUNwRCxjQUFNLEtBQU0sU0FBUyxJQUFJLEdBQUcsR0FBRyxDQUFDLElBQUs7QUFDckMsWUFBSTtBQUNKLFlBQUk7QUFDSixZQUFJO0FBQ0osWUFBSyxJQUFJLEtBQU07QUFDZixZQUFJO0FBQ0osWUFBSTtBQUNKLFlBQUk7QUFDSixZQUFLLEtBQUssS0FBTTtNQUNsQjtBQUVBLFVBQUssSUFBSSxLQUFLLElBQUs7QUFDbkIsVUFBSyxJQUFJLEtBQUssSUFBSztBQUNuQixVQUFLLElBQUksS0FBSyxJQUFLO0FBQ25CLFVBQUssSUFBSSxLQUFLLElBQUs7QUFDbkIsVUFBSyxJQUFJLEtBQUssSUFBSztBQUNuQixVQUFLLElBQUksS0FBSyxJQUFLO0FBQ25CLFVBQUssSUFBSSxLQUFLLElBQUs7QUFDbkIsVUFBSyxJQUFJLEtBQUssSUFBSztBQUNuQixXQUFLLElBQUksR0FBRyxHQUFHLEdBQUcsR0FBRyxHQUFHLEdBQUcsR0FBRyxDQUFDO0lBQ2pDO0lBQ1UsYUFBVTtBQUNsQixlQUFTLEtBQUssQ0FBQztJQUNqQjtJQUNBLFVBQU87QUFDTCxXQUFLLElBQUksR0FBRyxHQUFHLEdBQUcsR0FBRyxHQUFHLEdBQUcsR0FBRyxDQUFDO0FBQy9CLFdBQUssT0FBTyxLQUFLLENBQUM7SUFDcEI7O0FBc0JLLE1BQU0sU0FBZ0MsZ0NBQWdCLE1BQU0sSUFBSSxPQUFNLENBQUU7OztBQzVIL0UsTUFBTSxNQUFzQix1QkFBTyxDQUFDO0FBYTlCLFdBQVVDLFNBQVEsR0FBVTtBQUNoQyxXQUFPLGFBQWEsY0FBZSxZQUFZLE9BQU8sQ0FBQyxLQUFLLEVBQUUsWUFBWSxTQUFTO0VBQ3JGO0FBRU0sV0FBVUMsUUFBTyxNQUFhO0FBQ2xDLFFBQUksQ0FBQ0QsU0FBUSxJQUFJO0FBQUcsWUFBTSxJQUFJLE1BQU0scUJBQXFCO0VBQzNEO0FBT0EsTUFBTSxRQUF3QixzQkFBTSxLQUFLLEVBQUUsUUFBUSxJQUFHLEdBQUksQ0FBQyxHQUFHLE1BQzVELEVBQUUsU0FBUyxFQUFFLEVBQUUsU0FBUyxHQUFHLEdBQUcsQ0FBQztBQUszQixXQUFVLFdBQVcsT0FBaUI7QUFDMUMsSUFBQUUsUUFBTyxLQUFLO0FBRVosUUFBSSxNQUFNO0FBQ1YsYUFBUyxJQUFJLEdBQUcsSUFBSSxNQUFNLFFBQVEsS0FBSztBQUNyQyxhQUFPLE1BQU0sTUFBTSxDQUFDLENBQUM7SUFDdkI7QUFDQSxXQUFPO0VBQ1Q7QUFPTSxXQUFVLFlBQVksS0FBVztBQUNyQyxRQUFJLE9BQU8sUUFBUTtBQUFVLFlBQU0sSUFBSSxNQUFNLDhCQUE4QixPQUFPLEdBQUc7QUFDckYsV0FBTyxRQUFRLEtBQUssTUFBTSxPQUFPLE9BQU8sR0FBRztFQUM3QztBQUdBLE1BQU0sU0FBUyxFQUFFLElBQUksSUFBSSxJQUFJLElBQUksR0FBRyxJQUFJLEdBQUcsSUFBSSxHQUFHLElBQUksR0FBRyxJQUFHO0FBQzVELFdBQVMsY0FBYyxJQUFVO0FBQy9CLFFBQUksTUFBTSxPQUFPLE1BQU0sTUFBTSxPQUFPO0FBQUksYUFBTyxLQUFLLE9BQU87QUFDM0QsUUFBSSxNQUFNLE9BQU8sS0FBSyxNQUFNLE9BQU87QUFBRyxhQUFPLE1BQU0sT0FBTyxJQUFJO0FBQzlELFFBQUksTUFBTSxPQUFPLEtBQUssTUFBTSxPQUFPO0FBQUcsYUFBTyxNQUFNLE9BQU8sSUFBSTtBQUM5RDtFQUNGO0FBS00sV0FBVSxXQUFXLEtBQVc7QUFDcEMsUUFBSSxPQUFPLFFBQVE7QUFBVSxZQUFNLElBQUksTUFBTSw4QkFBOEIsT0FBTyxHQUFHO0FBQ3JGLFVBQU0sS0FBSyxJQUFJO0FBQ2YsVUFBTSxLQUFLLEtBQUs7QUFDaEIsUUFBSSxLQUFLO0FBQUcsWUFBTSxJQUFJLE1BQU0scURBQXFELEVBQUU7QUFDbkYsVUFBTSxRQUFRLElBQUksV0FBVyxFQUFFO0FBQy9CLGFBQVMsS0FBSyxHQUFHLEtBQUssR0FBRyxLQUFLLElBQUksTUFBTSxNQUFNLEdBQUc7QUFDL0MsWUFBTSxLQUFLLGNBQWMsSUFBSSxXQUFXLEVBQUUsQ0FBQztBQUMzQyxZQUFNLEtBQUssY0FBYyxJQUFJLFdBQVcsS0FBSyxDQUFDLENBQUM7QUFDL0MsVUFBSSxPQUFPLFVBQWEsT0FBTyxRQUFXO0FBQ3hDLGNBQU0sT0FBTyxJQUFJLEVBQUUsSUFBSSxJQUFJLEtBQUssQ0FBQztBQUNqQyxjQUFNLElBQUksTUFBTSxpREFBaUQsT0FBTyxnQkFBZ0IsRUFBRTtNQUM1RjtBQUNBLFlBQU0sRUFBRSxJQUFJLEtBQUssS0FBSztJQUN4QjtBQUNBLFdBQU87RUFDVDtBQU1NLFdBQVUsZ0JBQWdCLE9BQWlCO0FBQy9DLElBQUFDLFFBQU8sS0FBSztBQUNaLFdBQU8sWUFBWSxXQUFXLFdBQVcsS0FBSyxLQUFLLEVBQUUsUUFBTyxDQUFFLENBQUM7RUFDakU7QUFFTSxXQUFVLGdCQUFnQixHQUFvQixLQUFXO0FBQzdELFdBQU8sV0FBVyxFQUFFLFNBQVMsRUFBRSxFQUFFLFNBQVMsTUFBTSxHQUFHLEdBQUcsQ0FBQztFQUN6RDtBQUNNLFdBQVUsZ0JBQWdCLEdBQW9CLEtBQVc7QUFDN0QsV0FBTyxnQkFBZ0IsR0FBRyxHQUFHLEVBQUUsUUFBTztFQUN4QztBQWVNLFdBQVUsWUFBWSxPQUFlLEtBQVUsZ0JBQXVCO0FBQzFFLFFBQUk7QUFDSixRQUFJLE9BQU8sUUFBUSxVQUFVO0FBQzNCLFVBQUk7QUFDRixjQUFNLFdBQVcsR0FBRztNQUN0QixTQUFTLEdBQUc7QUFDVixjQUFNLElBQUksTUFBTSxRQUFRLCtDQUErQyxDQUFDO01BQzFFO0lBQ0YsV0FBV0MsU0FBUSxHQUFHLEdBQUc7QUFHdkIsWUFBTSxXQUFXLEtBQUssR0FBRztJQUMzQixPQUFPO0FBQ0wsWUFBTSxJQUFJLE1BQU0sUUFBUSxtQ0FBbUM7SUFDN0Q7QUFDQSxVQUFNLE1BQU0sSUFBSTtBQUNoQixRQUFJLE9BQU8sbUJBQW1CLFlBQVksUUFBUTtBQUNoRCxZQUFNLElBQUksTUFBTSxRQUFRLGdCQUFnQixpQkFBaUIsb0JBQW9CLEdBQUc7QUFDbEYsV0FBTztFQUNUO0FBMENBLE1BQU0sV0FBVyxDQUFDLE1BQWMsT0FBTyxNQUFNLFlBQVksT0FBTztBQUUxRCxXQUFVLFFBQVEsR0FBVyxLQUFhLEtBQVc7QUFDekQsV0FBTyxTQUFTLENBQUMsS0FBSyxTQUFTLEdBQUcsS0FBSyxTQUFTLEdBQUcsS0FBSyxPQUFPLEtBQUssSUFBSTtFQUMxRTtBQU9NLFdBQVUsU0FBUyxPQUFlLEdBQVcsS0FBYSxLQUFXO0FBTXpFLFFBQUksQ0FBQyxRQUFRLEdBQUcsS0FBSyxHQUFHO0FBQ3RCLFlBQU0sSUFBSSxNQUFNLG9CQUFvQixRQUFRLE9BQU8sTUFBTSxhQUFhLE1BQU0sV0FBVyxDQUFDO0VBQzVGO0FBb0dBLE1BQU0sZUFBZTtJQUNuQixRQUFRLENBQUMsUUFBc0IsT0FBTyxRQUFRO0lBQzlDLFVBQVUsQ0FBQyxRQUFzQixPQUFPLFFBQVE7SUFDaEQsU0FBUyxDQUFDLFFBQXNCLE9BQU8sUUFBUTtJQUMvQyxRQUFRLENBQUMsUUFBc0IsT0FBTyxRQUFRO0lBQzlDLG9CQUFvQixDQUFDLFFBQXNCLE9BQU8sUUFBUSxZQUFZQyxTQUFRLEdBQUc7SUFDakYsZUFBZSxDQUFDLFFBQXNCLE9BQU8sY0FBYyxHQUFHO0lBQzlELE9BQU8sQ0FBQyxRQUFzQixNQUFNLFFBQVEsR0FBRztJQUMvQyxPQUFPLENBQUMsS0FBVSxXQUFzQixPQUFlLEdBQUcsUUFBUSxHQUFHO0lBQ3JFLE1BQU0sQ0FBQyxRQUFzQixPQUFPLFFBQVEsY0FBYyxPQUFPLGNBQWMsSUFBSSxTQUFTOztBQU14RixXQUFVLGVBQ2QsUUFDQSxZQUNBLGdCQUEyQixDQUFBLEdBQUU7QUFFN0IsVUFBTSxhQUFhLENBQUMsV0FBb0IsTUFBaUIsZUFBdUI7QUFDOUUsWUFBTSxXQUFXLGFBQWEsSUFBSTtBQUNsQyxVQUFJLE9BQU8sYUFBYTtBQUFZLGNBQU0sSUFBSSxNQUFNLDRCQUE0QjtBQUVoRixZQUFNLE1BQU0sT0FBTyxTQUFnQztBQUNuRCxVQUFJLGNBQWMsUUFBUTtBQUFXO0FBQ3JDLFVBQUksQ0FBQyxTQUFTLEtBQUssTUFBTSxHQUFHO0FBQzFCLGNBQU0sSUFBSSxNQUNSLFdBQVcsT0FBTyxTQUFTLElBQUksMkJBQTJCLE9BQU8sV0FBVyxHQUFHO01BRW5GO0lBQ0Y7QUFDQSxlQUFXLENBQUMsV0FBVyxJQUFJLEtBQUssT0FBTyxRQUFRLFVBQVU7QUFBRyxpQkFBVyxXQUFXLE1BQU8sS0FBSztBQUM5RixlQUFXLENBQUMsV0FBVyxJQUFJLEtBQUssT0FBTyxRQUFRLGFBQWE7QUFBRyxpQkFBVyxXQUFXLE1BQU8sSUFBSTtBQUNoRyxXQUFPO0VBQ1Q7OztBQzlUQSxNQUFNQyxPQUFNLE9BQU8sQ0FBQztBQUFwQixNQUF1QixNQUFNLE9BQU8sQ0FBQztBQU8vQixXQUFVLElBQUksR0FBVyxHQUFTO0FBQ3RDLFVBQU0sU0FBUyxJQUFJO0FBQ25CLFdBQU8sVUFBVUMsT0FBTSxTQUFTLElBQUk7RUFDdEM7QUFRTSxXQUFVLElBQUksS0FBYSxPQUFlLFFBQWM7QUFDNUQsUUFBSSxRQUFRQTtBQUFLLFlBQU0sSUFBSSxNQUFNLHlDQUF5QztBQUMxRSxRQUFJLFVBQVVBO0FBQUssWUFBTSxJQUFJLE1BQU0saUJBQWlCO0FBQ3BELFFBQUksV0FBVztBQUFLLGFBQU9BO0FBQzNCLFFBQUksTUFBTTtBQUNWLFdBQU8sUUFBUUEsTUFBSztBQUNsQixVQUFJLFFBQVE7QUFBSyxjQUFPLE1BQU0sTUFBTztBQUNyQyxZQUFPLE1BQU0sTUFBTztBQUNwQixnQkFBVTtJQUNaO0FBQ0EsV0FBTztFQUNUO0FBR00sV0FBVSxLQUFLLEdBQVcsT0FBZSxRQUFjO0FBQzNELFFBQUksTUFBTTtBQUNWLFdBQU8sVUFBVUEsTUFBSztBQUNwQixhQUFPO0FBQ1AsYUFBTztJQUNUO0FBQ0EsV0FBTztFQUNUOzs7QUN6Q0EsTUFBTUMsT0FBTSxPQUFPLENBQUM7QUFDcEIsTUFBTUMsT0FBTSxPQUFPLENBQUM7QUF5QnBCLFdBQVMsYUFBYSxPQUFnQjtBQUNwQyxtQkFDRSxPQUNBO01BQ0UsR0FBRztPQUVMO01BQ0UsZ0JBQWdCO01BQ2hCLGFBQWE7TUFDYixtQkFBbUI7TUFDbkIsUUFBUTtNQUNSLFlBQVk7TUFDWixJQUFJO0tBQ0w7QUFHSCxXQUFPLE9BQU8sT0FBTyxFQUFFLEdBQUcsTUFBSyxDQUFXO0VBQzVDO0FBR00sV0FBVSxXQUFXLFVBQW1CO0FBQzVDLFVBQU0sUUFBUSxhQUFhLFFBQVE7QUFDbkMsVUFBTSxFQUFFLEVBQUMsSUFBSztBQUNkLFVBQU0sT0FBTyxDQUFDLE1BQWMsSUFBSSxHQUFHLENBQUM7QUFDcEMsVUFBTSxpQkFBaUIsTUFBTTtBQUM3QixVQUFNLGtCQUFrQixLQUFLLEtBQUssaUJBQWlCLENBQUM7QUFDcEQsVUFBTSxXQUFXLE1BQU07QUFDdkIsVUFBTUMscUJBQW9CLE1BQU0sc0JBQXNCLENBQUMsVUFBc0I7QUFDN0UsVUFBTSxhQUFhLE1BQU0sZUFBZSxDQUFDLE1BQWMsSUFBSSxHQUFHLElBQUksT0FBTyxDQUFDLEdBQUcsQ0FBQztBQVk5RSxhQUFTLE1BQU0sTUFBYyxLQUFhLEtBQVc7QUFDbkQsWUFBTSxRQUFRLEtBQUssUUFBUSxNQUFNLElBQUk7QUFDckMsWUFBTSxLQUFLLE1BQU0sS0FBSztBQUN0QixZQUFNLEtBQUssTUFBTSxLQUFLO0FBQ3RCLGFBQU8sQ0FBQyxLQUFLLEdBQUc7SUFDbEI7QUFJQSxVQUFNLE9BQU8sTUFBTSxJQUFJLE9BQU8sQ0FBQyxLQUFLLE9BQU8sQ0FBQztBQU81QyxhQUFTLGlCQUFpQixHQUFXLFFBQWM7QUFDakQsZUFBUyxLQUFLLEdBQUdGLE1BQUssQ0FBQztBQUN2QixlQUFTLFVBQVUsUUFBUUEsTUFBSyxDQUFDO0FBR2pDLFlBQU0sSUFBSTtBQUNWLFlBQU0sTUFBTTtBQUNaLFVBQUksTUFBTUM7QUFDVixVQUFJLE1BQU1EO0FBQ1YsVUFBSSxNQUFNO0FBQ1YsVUFBSSxNQUFNQztBQUNWLFVBQUksT0FBT0Q7QUFDWCxVQUFJO0FBQ0osZUFBUyxJQUFJLE9BQU8saUJBQWlCLENBQUMsR0FBRyxLQUFLQSxNQUFLLEtBQUs7QUFDdEQsY0FBTSxNQUFPLEtBQUssSUFBS0M7QUFDdkIsZ0JBQVE7QUFDUixhQUFLLE1BQU0sTUFBTSxLQUFLLEdBQUc7QUFDekIsY0FBTSxHQUFHLENBQUM7QUFDVixjQUFNLEdBQUcsQ0FBQztBQUNWLGFBQUssTUFBTSxNQUFNLEtBQUssR0FBRztBQUN6QixjQUFNLEdBQUcsQ0FBQztBQUNWLGNBQU0sR0FBRyxDQUFDO0FBQ1YsZUFBTztBQUVQLGNBQU0sSUFBSSxNQUFNO0FBQ2hCLGNBQU0sS0FBSyxLQUFLLElBQUksQ0FBQztBQUNyQixjQUFNLElBQUksTUFBTTtBQUNoQixjQUFNLEtBQUssS0FBSyxJQUFJLENBQUM7QUFDckIsY0FBTSxJQUFJLEtBQUs7QUFDZixjQUFNLElBQUksTUFBTTtBQUNoQixjQUFNLElBQUksTUFBTTtBQUNoQixjQUFNLEtBQUssS0FBSyxJQUFJLENBQUM7QUFDckIsY0FBTSxLQUFLLEtBQUssSUFBSSxDQUFDO0FBQ3JCLGNBQU0sT0FBTyxLQUFLO0FBQ2xCLGNBQU0sUUFBUSxLQUFLO0FBQ25CLGNBQU0sS0FBSyxPQUFPLElBQUk7QUFDdEIsY0FBTSxLQUFLLE1BQU0sS0FBSyxRQUFRLEtBQUssQ0FBQztBQUNwQyxjQUFNLEtBQUssS0FBSyxFQUFFO0FBQ2xCLGNBQU0sS0FBSyxLQUFLLEtBQUssS0FBSyxNQUFNLENBQUMsRUFBRTtNQUNyQztBQUVBLFdBQUssTUFBTSxNQUFNLEtBQUssR0FBRztBQUN6QixZQUFNLEdBQUcsQ0FBQztBQUNWLFlBQU0sR0FBRyxDQUFDO0FBRVYsV0FBSyxNQUFNLE1BQU0sS0FBSyxHQUFHO0FBQ3pCLFlBQU0sR0FBRyxDQUFDO0FBQ1YsWUFBTSxHQUFHLENBQUM7QUFFVixZQUFNLEtBQUssV0FBVyxHQUFHO0FBRXpCLGFBQU8sS0FBSyxNQUFNLEVBQUU7SUFDdEI7QUFFQSxhQUFTLGtCQUFrQixHQUFTO0FBQ2xDLGFBQU8sZ0JBQWdCLEtBQUssQ0FBQyxHQUFHLGVBQWU7SUFDakQ7QUFFQSxhQUFTLGtCQUFrQixNQUFTO0FBR2xDLFlBQU0sSUFBSSxZQUFZLGdCQUFnQixNQUFNLGVBQWU7QUFDM0QsVUFBSSxhQUFhO0FBQUksVUFBRSxFQUFFLEtBQUs7QUFDOUIsYUFBTyxnQkFBZ0IsQ0FBQztJQUMxQjtBQUNBLGFBQVMsYUFBYSxHQUFNO0FBQzFCLFlBQU0sUUFBUSxZQUFZLFVBQVUsQ0FBQztBQUNyQyxZQUFNLE1BQU0sTUFBTTtBQUNsQixVQUFJLFFBQVEsbUJBQW1CLFFBQVEsVUFBVTtBQUMvQyxZQUFJLFFBQVEsS0FBSyxrQkFBa0IsU0FBUztBQUM1QyxjQUFNLElBQUksTUFBTSw4QkFBOEIsUUFBUSxpQkFBaUIsR0FBRztNQUM1RTtBQUNBLGFBQU8sZ0JBQWdCQyxtQkFBa0IsS0FBSyxDQUFDO0lBQ2pEO0FBQ0EsYUFBU0MsWUFBVyxRQUFhLEdBQU07QUFDckMsWUFBTSxTQUFTLGtCQUFrQixDQUFDO0FBQ2xDLFlBQU0sVUFBVSxhQUFhLE1BQU07QUFDbkMsWUFBTSxLQUFLLGlCQUFpQixRQUFRLE9BQU87QUFHM0MsVUFBSSxPQUFPSDtBQUFLLGNBQU0sSUFBSSxNQUFNLHdDQUF3QztBQUN4RSxhQUFPLGtCQUFrQixFQUFFO0lBQzdCO0FBRUEsVUFBTSxVQUFVLGtCQUFrQixNQUFNLEVBQUU7QUFDMUMsYUFBU0ksZ0JBQWUsUUFBVztBQUNqQyxhQUFPRCxZQUFXLFFBQVEsT0FBTztJQUNuQztBQUVBLFdBQU87TUFDTCxZQUFBQTtNQUNBLGdCQUFBQztNQUNBLGlCQUFpQixDQUFDLFlBQWlCLGNBQW1CRCxZQUFXLFlBQVksU0FBUztNQUN0RixjQUFjLENBQUMsZUFBZ0NDLGdCQUFlLFVBQVU7TUFDeEUsT0FBTyxFQUFFLGtCQUFrQixNQUFNLE1BQU0sWUFBYSxNQUFNLFdBQVcsRUFBQztNQUN0RTs7RUFFSjs7O0FDcktBLE1BQU0sWUFBWSxPQUNoQiwrRUFBK0U7QUFRakYsTUFBTUMsT0FBTSxPQUFPLENBQUM7QUFBcEIsTUFBdUJDLE9BQU0sT0FBTyxDQUFDO0FBQXJDLE1BQXdDLE1BQU0sT0FBTyxDQUFDO0FBQXRELE1BQXlELE1BQU0sT0FBTyxDQUFDO0FBRXZFLE1BQU0sTUFBTSxPQUFPLENBQUM7QUFBcEIsTUFBdUIsTUFBTSxPQUFPLENBQUM7QUFFckMsV0FBUyxvQkFBb0IsR0FBUztBQUVwQyxVQUFNLE9BQU8sT0FBTyxFQUFFLEdBQUcsT0FBTyxPQUFPLEVBQUUsR0FBRyxPQUFPLE9BQU8sRUFBRSxHQUFHLE9BQU8sT0FBTyxFQUFFO0FBQy9FLFVBQU0sSUFBSTtBQUNWLFVBQU0sS0FBTSxJQUFJLElBQUs7QUFDckIsVUFBTSxLQUFNLEtBQUssSUFBSztBQUN0QixVQUFNLEtBQU0sS0FBSyxJQUFJLEtBQUssQ0FBQyxJQUFJLEtBQU07QUFDckMsVUFBTSxLQUFNLEtBQUssSUFBSUEsTUFBSyxDQUFDLElBQUksSUFBSztBQUNwQyxVQUFNLE1BQU8sS0FBSyxJQUFJLEtBQUssQ0FBQyxJQUFJLEtBQU07QUFDdEMsVUFBTSxNQUFPLEtBQUssS0FBSyxNQUFNLENBQUMsSUFBSSxNQUFPO0FBQ3pDLFVBQU0sTUFBTyxLQUFLLEtBQUssTUFBTSxDQUFDLElBQUksTUFBTztBQUN6QyxVQUFNLE1BQU8sS0FBSyxLQUFLLE1BQU0sQ0FBQyxJQUFJLE1BQU87QUFDekMsVUFBTSxPQUFRLEtBQUssS0FBSyxNQUFNLENBQUMsSUFBSSxNQUFPO0FBQzFDLFVBQU0sT0FBUSxLQUFLLE1BQU0sTUFBTSxDQUFDLElBQUksTUFBTztBQUMzQyxVQUFNLE9BQVEsS0FBSyxNQUFNLE1BQU0sQ0FBQyxJQUFJLE1BQU87QUFDM0MsVUFBTSxZQUFhLEtBQUssTUFBTSxLQUFLLENBQUMsSUFBSSxJQUFLO0FBRTdDLFdBQU8sRUFBRSxXQUFXLEdBQUU7RUFDeEI7QUFFQSxXQUFTLGtCQUFrQixPQUFpQjtBQUcxQyxVQUFNLENBQUMsS0FBSztBQUVaLFVBQU0sRUFBRSxLQUFLO0FBRWIsVUFBTSxFQUFFLEtBQUs7QUFDYixXQUFPO0VBQ1Q7QUE0R08sTUFBTSxTQUFvQyx1QkFDL0MsV0FBVztJQUNULEdBQUc7SUFDSCxHQUFHLE9BQU8sTUFBTTtJQUNoQixnQkFBZ0I7O0lBQ2hCLGFBQWE7SUFDYixJQUFJLE9BQU8sQ0FBQztJQUNaLFlBQVksQ0FBQyxNQUFxQjtBQUNoQyxZQUFNLElBQUk7QUFFVixZQUFNLEVBQUUsV0FBVyxHQUFFLElBQUssb0JBQW9CLENBQUM7QUFDL0MsYUFBTyxJQUFJLEtBQUssV0FBVyxLQUFLLENBQUMsSUFBSSxJQUFJLENBQUM7SUFDNUM7SUFDQTtJQUNBO0dBQ0QsR0FBRTs7O0FDbk1MLE1BQUksWUFBd0MsU0FBVSxTQUFTLFlBQVksR0FBRyxXQUFXO0FBQ3JGLGFBQVMsTUFBTSxPQUFPO0FBQUUsYUFBTyxpQkFBaUIsSUFBSSxRQUFRLElBQUksRUFBRSxTQUFVLFNBQVM7QUFBRSxnQkFBUSxLQUFLO0FBQUEsTUFBRyxDQUFDO0FBQUEsSUFBRztBQUMzRyxXQUFPLEtBQUssTUFBTSxJQUFJLFVBQVUsU0FBVSxTQUFTLFFBQVE7QUFDdkQsZUFBUyxVQUFVLE9BQU87QUFBRSxZQUFJO0FBQUUsZUFBSyxVQUFVLEtBQUssS0FBSyxDQUFDO0FBQUEsUUFBRyxTQUFTLEdBQUc7QUFBRSxpQkFBTyxDQUFDO0FBQUEsUUFBRztBQUFBLE1BQUU7QUFDMUYsZUFBUyxTQUFTLE9BQU87QUFBRSxZQUFJO0FBQUUsZUFBSyxVQUFVLE9BQU8sRUFBRSxLQUFLLENBQUM7QUFBQSxRQUFHLFNBQVMsR0FBRztBQUFFLGlCQUFPLENBQUM7QUFBQSxRQUFHO0FBQUEsTUFBRTtBQUM3RixlQUFTLEtBQUssUUFBUTtBQUFFLGVBQU8sT0FBTyxRQUFRLE9BQU8sS0FBSyxJQUFJLE1BQU0sT0FBTyxLQUFLLEVBQUUsS0FBSyxXQUFXLFFBQVE7QUFBQSxNQUFHO0FBQzdHLFlBQU0sWUFBWSxVQUFVLE1BQU0sU0FBUyxjQUFjLENBQUMsQ0FBQyxHQUFHLEtBQUssQ0FBQztBQUFBLElBQ3hFLENBQUM7QUFBQSxFQUNMO0FBRUEsTUFBTSxhQUFhO0FBQ25CLE1BQUksZUFBZTtBQUlaLE1BQU0sb0JBQXFCLHVCQUFNO0FBQ3BDLFFBQUk7QUFDSixXQUFPLE1BQU0sVUFBVSxRQUFRLFFBQVEsUUFBUSxhQUFhO0FBQ3hELFVBQUksY0FBYyxRQUFXO0FBQ3pCLFlBQUk7QUFDQSxnQkFBTSxPQUFPLE9BQU8sVUFBVSxPQUFPLE9BQU8sU0FBUyxFQUFFLE1BQU0sU0FBUyxHQUFHLFlBQVksQ0FBQyxDQUFDO0FBQ3ZGLHNCQUFZO0FBQUEsUUFDaEIsU0FDTyxJQUFJO0FBQ1Asc0JBQVk7QUFBQSxRQUNoQjtBQUFBLE1BQ0o7QUFDQSxhQUFPO0FBQUEsSUFDWCxDQUFDO0FBQUEsRUFDTCxHQUFHO0FBQ0ksV0FBUyxXQUFXLFFBQVEsR0FBRztBQUNsQyxXQUFPLFVBQVUsTUFBTSxRQUFRLFFBQVEsYUFBYTtBQUNoRCxVQUFJLEVBQUUsTUFBTSxrQkFBa0IsTUFBTSxjQUFjO0FBQzlDLFlBQUksWUFBWSxNQUFNLEdBQUc7QUFDckIsZ0JBQU0sSUFBSSxNQUFNLDBEQUEwRDtBQUFBLFFBQzlFO0FBQ0EsZUFBTyxPQUFPLFdBQVcsUUFBUSxDQUFDO0FBQUEsTUFDdEM7QUFDQSxVQUFJO0FBQ0osVUFBSSxZQUFZLE1BQU0sR0FBRztBQUNyQixjQUFNO0FBQUEsTUFDVixPQUNLO0FBQ0QsY0FBTSxNQUFNLGdCQUFnQixNQUFNO0FBQUEsTUFDdEM7QUFDQSxZQUFNLE9BQU8sTUFBTSxPQUFPLE9BQU8sVUFBVSxPQUFPLEdBQUcsRUFBRSxNQUFNLFNBQVMsR0FBRyxZQUFZLENBQUMsQ0FBQztBQUd2RixhQUFPLElBQUksV0FBVyxNQUFNLE9BQU8sT0FBTyxXQUFXLEVBQUUsTUFBTSxVQUFVLFFBQVEsS0FBSyxHQUFHLEtBQUssR0FBRyxDQUFDO0FBQUEsSUFDcEcsQ0FBQztBQUFBLEVBQ0w7QUFDTyxXQUFTLGVBQWUsUUFBUTtBQUNuQyxXQUFPLFVBQVUsTUFBTSxRQUFRLFFBQVEsYUFBYTtBQUNoRCxVQUFJLEVBQUUsTUFBTSxrQkFBa0IsTUFBTSxjQUFjO0FBQzlDLFlBQUksWUFBWSxNQUFNLEdBQUc7QUFDckIsZ0JBQU0sSUFBSSxNQUFNLDBEQUEwRDtBQUFBLFFBQzlFO0FBQ0EsZUFBTyxPQUFPLGVBQWUsTUFBTTtBQUFBLE1BQ3ZDO0FBUUEsYUFBTyxXQUFXLFFBQVEsT0FBTyxPQUFPO0FBQUEsSUFDNUMsQ0FBQztBQUFBLEVBQ0w7QUFDQSxNQUFNLGNBQWMsSUFBSSxXQUFXO0FBQUEsSUFBQztBQUFBLElBQU07QUFBQSxJQUFNO0FBQUEsSUFBTTtBQUFBLElBQU07QUFBQSxJQUFNO0FBQUEsSUFBTTtBQUFBLElBQU07QUFBQSxJQUMxRTtBQUFBLElBQU07QUFBQSxJQUFNO0FBQUEsSUFBTTtBQUFBLElBQU07QUFBQSxJQUFNO0FBQUEsSUFBTTtBQUFBLElBQU07QUFBQSxFQUFJLENBQUM7QUFDbkQsV0FBUyxnQkFBZ0IsS0FBSztBQUMxQixXQUFPLFVBQVUsTUFBTSxRQUFRLFFBQVEsYUFBYTtBQUtoRCxVQUFJLElBQUksV0FBVyxJQUFJO0FBQ25CLGNBQU0sSUFBSSxNQUFNLHFDQUFxQztBQUFBLE1BQ3pEO0FBQ0EsWUFBTSxRQUFRLElBQUksV0FBVyxDQUFDLEdBQUcsYUFBYSxHQUFHLEdBQUcsQ0FBQztBQUdyRCxhQUFPLE9BQU8sT0FBTyxVQUFVLFNBQVMsT0FBTyxFQUFFLE1BQU0sU0FBUyxHQUFHLFlBQVksQ0FBQyxZQUFZLENBQUM7QUFBQSxJQUNqRyxDQUFDO0FBQUEsRUFDTDtBQUNBLFdBQVMsWUFBWSxLQUFLO0FBQ3RCLFdBQU8sT0FBTyxjQUFjLGVBQWUsZUFBZTtBQUFBLEVBQzlEOzs7QUN6RUEsV0FBUyxXQUFXLE1BQWEsV0FBa0IsT0FBYyxPQUFnQjtBQUMvRSxVQUFNLElBQUk7QUFDVixVQUFNLE9BQU8sVUFBVSxFQUFFLE9BQU8sSUFBSSxXQUFXLEdBQUUsR0FBSSxLQUFLO0FBQzFELFVBQU0sRUFBRSxHQUFHLE9BQU8sVUFBUyxJQUFLO0FBQ2hDLElBQUFDLFNBQVEsQ0FBQztBQUNULElBQUFBLFNBQVEsS0FBSztBQUNiLElBQUFBLFNBQVEsU0FBUztBQUNqQixRQUFJLElBQUk7QUFBRyxZQUFNLElBQUksTUFBTSx1Q0FBdUM7QUFDbEUsVUFBTSxXQUFXLFFBQVEsU0FBUztBQUNsQyxVQUFNLE9BQU8sUUFBUSxLQUFLO0FBRTFCLFVBQU0sS0FBSyxJQUFJLFdBQVcsS0FBSztBQUUvQixVQUFNLE1BQU0sS0FBSyxPQUFPLE1BQU0sUUFBUTtBQUN0QyxVQUFNLFVBQVUsSUFBSSxXQUFVLEVBQUcsT0FBTyxJQUFJO0FBQzVDLFdBQU8sRUFBRSxHQUFHLE9BQU8sV0FBVyxJQUFJLEtBQUssUUFBTztFQUNoRDtBQUVBLFdBQVMsYUFDUCxLQUNBLFNBQ0EsSUFDQSxNQUNBLEdBQWE7QUFFYixRQUFJLFFBQU87QUFDWCxZQUFRLFFBQU87QUFDZixRQUFJO0FBQU0sV0FBSyxRQUFPO0FBQ3RCLE1BQUUsS0FBSyxDQUFDO0FBQ1IsV0FBTztFQUNUO0FBV00sV0FBVSxPQUFPLE1BQWEsVUFBaUIsTUFBYSxNQUFlO0FBQy9FLFVBQU0sRUFBRSxHQUFHLE9BQU8sSUFBSSxLQUFLLFFBQU8sSUFBSyxXQUFXLE1BQU0sVUFBVSxNQUFNLElBQUk7QUFDNUUsUUFBSTtBQUNKLFVBQU0sTUFBTSxJQUFJLFdBQVcsQ0FBQztBQUM1QixVQUFNLE9BQU8sV0FBVyxHQUFHO0FBQzNCLFVBQU0sSUFBSSxJQUFJLFdBQVcsSUFBSSxTQUFTO0FBRXRDLGFBQVMsS0FBSyxHQUFHLE1BQU0sR0FBRyxNQUFNLE9BQU8sTUFBTSxPQUFPLElBQUksV0FBVztBQUVqRSxZQUFNLEtBQUssR0FBRyxTQUFTLEtBQUssTUFBTSxJQUFJLFNBQVM7QUFDL0MsV0FBSyxTQUFTLEdBQUcsSUFBSSxLQUFLO0FBRzFCLE9BQUMsT0FBTyxRQUFRLFdBQVcsSUFBSSxHQUFHLE9BQU8sR0FBRyxFQUFFLFdBQVcsQ0FBQztBQUMxRCxTQUFHLElBQUksRUFBRSxTQUFTLEdBQUcsR0FBRyxNQUFNLENBQUM7QUFDL0IsZUFBUyxLQUFLLEdBQUcsS0FBSyxHQUFHLE1BQU07QUFFN0IsWUFBSSxXQUFXLElBQUksRUFBRSxPQUFPLENBQUMsRUFBRSxXQUFXLENBQUM7QUFDM0MsaUJBQVMsSUFBSSxHQUFHLElBQUksR0FBRyxRQUFRO0FBQUssYUFBRyxDQUFDLEtBQUssRUFBRSxDQUFDO01BQ2xEO0lBQ0Y7QUFDQSxXQUFPLGFBQWEsS0FBSyxTQUFTLElBQUksTUFBTSxDQUFDO0VBQy9DOzs7QUNqRUEsV0FBUyxZQUNQLE1BQ0EsSUFDQSxPQUNBLElBQ0EsS0FDQSxJQUFVO0FBSVYsUUFBSSxNQUFNLEtBQUssSUFBSSxJQUFJLE1BQU0sSUFBSSxHQUFHLE1BQU0sS0FBSyxJQUFJLElBQUksTUFBTSxJQUFJO0FBQ2pFLFFBQUksTUFBTSxLQUFLLElBQUksSUFBSSxNQUFNLElBQUksR0FBRyxNQUFNLEtBQUssSUFBSSxJQUFJLE1BQU0sSUFBSTtBQUNqRSxRQUFJLE1BQU0sS0FBSyxJQUFJLElBQUksTUFBTSxJQUFJLEdBQUcsTUFBTSxLQUFLLElBQUksSUFBSSxNQUFNLElBQUk7QUFDakUsUUFBSSxNQUFNLEtBQUssSUFBSSxJQUFJLE1BQU0sSUFBSSxHQUFHLE1BQU0sS0FBSyxJQUFJLElBQUksTUFBTSxJQUFJO0FBQ2pFLFFBQUksTUFBTSxLQUFLLElBQUksSUFBSSxNQUFNLElBQUksR0FBRyxNQUFNLEtBQUssSUFBSSxJQUFJLE1BQU0sSUFBSTtBQUNqRSxRQUFJLE1BQU0sS0FBSyxJQUFJLElBQUksTUFBTSxJQUFJLEdBQUcsTUFBTSxLQUFLLElBQUksSUFBSSxNQUFNLElBQUk7QUFDakUsUUFBSSxNQUFNLEtBQUssSUFBSSxJQUFJLE1BQU0sSUFBSSxHQUFHLE1BQU0sS0FBSyxJQUFJLElBQUksTUFBTSxJQUFJO0FBQ2pFLFFBQUksTUFBTSxLQUFLLElBQUksSUFBSSxNQUFNLElBQUksR0FBRyxNQUFNLEtBQUssSUFBSSxJQUFJLE1BQU0sSUFBSTtBQUVqRSxRQUFJLE1BQU0sS0FBSyxNQUFNLEtBQUssTUFBTSxLQUFLLE1BQU0sS0FDdkMsTUFBTSxLQUFLLE1BQU0sS0FBSyxNQUFNLEtBQUssTUFBTSxLQUN2QyxNQUFNLEtBQUssTUFBTSxLQUFLLE1BQU0sS0FBSyxNQUFNLEtBQ3ZDLE1BQU0sS0FBSyxNQUFNLEtBQUssTUFBTSxLQUFLLE1BQU07QUFFM0MsYUFBUyxJQUFJLEdBQUcsSUFBSSxHQUFHLEtBQUssR0FBRztBQUM3QixhQUFPLEtBQUssTUFBTSxNQUFNLEdBQUksQ0FBQztBQUFHLGFBQU8sS0FBSyxNQUFNLE1BQU0sR0FBSSxDQUFDO0FBQzdELGFBQU8sS0FBSyxNQUFNLE1BQU0sR0FBRyxFQUFFO0FBQUcsYUFBTyxLQUFLLE1BQU0sTUFBTSxHQUFHLEVBQUU7QUFDN0QsYUFBTyxLQUFLLE1BQU0sTUFBTSxHQUFJLENBQUM7QUFBRyxhQUFPLEtBQUssTUFBTSxNQUFNLEdBQUksQ0FBQztBQUM3RCxhQUFPLEtBQUssTUFBTSxNQUFNLEdBQUcsRUFBRTtBQUFHLGFBQU8sS0FBSyxNQUFNLE1BQU0sR0FBRyxFQUFFO0FBQzdELGFBQU8sS0FBSyxNQUFNLE1BQU0sR0FBSSxDQUFDO0FBQUcsYUFBTyxLQUFLLE1BQU0sTUFBTSxHQUFJLENBQUM7QUFDN0QsYUFBTyxLQUFLLE1BQU0sTUFBTSxHQUFHLEVBQUU7QUFBRyxhQUFPLEtBQUssTUFBTSxNQUFNLEdBQUcsRUFBRTtBQUM3RCxhQUFPLEtBQUssTUFBTSxNQUFNLEdBQUksQ0FBQztBQUFHLGFBQU8sS0FBSyxNQUFNLE1BQU0sR0FBSSxDQUFDO0FBQzdELGFBQU8sS0FBSyxNQUFNLE1BQU0sR0FBRyxFQUFFO0FBQUcsYUFBTyxLQUFLLE1BQU0sTUFBTSxHQUFHLEVBQUU7QUFDN0QsYUFBTyxLQUFLLE1BQU0sTUFBTSxHQUFJLENBQUM7QUFBRyxhQUFPLEtBQUssTUFBTSxNQUFNLEdBQUksQ0FBQztBQUM3RCxhQUFPLEtBQUssTUFBTSxNQUFNLEdBQUcsRUFBRTtBQUFHLGFBQU8sS0FBSyxNQUFNLE1BQU0sR0FBRyxFQUFFO0FBQzdELGFBQU8sS0FBSyxNQUFNLE1BQU0sR0FBSSxDQUFDO0FBQUcsYUFBTyxLQUFLLE1BQU0sTUFBTSxHQUFJLENBQUM7QUFDN0QsYUFBTyxLQUFLLE1BQU0sTUFBTSxHQUFHLEVBQUU7QUFBRyxhQUFPLEtBQUssTUFBTSxNQUFNLEdBQUcsRUFBRTtBQUM3RCxhQUFPLEtBQUssTUFBTSxNQUFNLEdBQUksQ0FBQztBQUFHLGFBQU8sS0FBSyxNQUFNLE1BQU0sR0FBSSxDQUFDO0FBQzdELGFBQU8sS0FBSyxNQUFNLE1BQU0sR0FBRyxFQUFFO0FBQUcsYUFBTyxLQUFLLE1BQU0sTUFBTSxHQUFHLEVBQUU7QUFDN0QsYUFBTyxLQUFLLE1BQU0sTUFBTSxHQUFJLENBQUM7QUFBRyxhQUFPLEtBQUssTUFBTSxNQUFNLEdBQUksQ0FBQztBQUM3RCxhQUFPLEtBQUssTUFBTSxNQUFNLEdBQUcsRUFBRTtBQUFHLGFBQU8sS0FBSyxNQUFNLE1BQU0sR0FBRyxFQUFFO0lBQy9EO0FBRUEsUUFBSSxJQUFJLElBQUssTUFBTSxNQUFPO0FBQUcsUUFBSSxJQUFJLElBQUssTUFBTSxNQUFPO0FBQ3ZELFFBQUksSUFBSSxJQUFLLE1BQU0sTUFBTztBQUFHLFFBQUksSUFBSSxJQUFLLE1BQU0sTUFBTztBQUN2RCxRQUFJLElBQUksSUFBSyxNQUFNLE1BQU87QUFBRyxRQUFJLElBQUksSUFBSyxNQUFNLE1BQU87QUFDdkQsUUFBSSxJQUFJLElBQUssTUFBTSxNQUFPO0FBQUcsUUFBSSxJQUFJLElBQUssTUFBTSxN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SztBQUM5RCxZQUFNLFFBQVEsU0FBUyxJQUFJLEtBQUs7QUFDaEMsWUFBTSxFQUFFLEdBQUcsRUFBQyxJQUFLO0FBQ2pCLFlBQU0sS0FBSyxFQUFFLENBQUM7QUFDZCxZQUFNLEtBQUssRUFBRSxDQUFDO0FBQ2QsWUFBTSxLQUFLLEVBQUUsQ0FBQztBQUNkLFlBQU0sS0FBSyxFQUFFLENBQUM7QUFDZCxZQUFNLEtBQUssRUFBRSxDQUFDO0FBQ2QsWUFBTSxLQUFLLEVBQUUsQ0FBQztBQUNkLFlBQU0sS0FBSyxFQUFFLENBQUM7QUFDZCxZQUFNLEtBQUssRUFBRSxDQUFDO0FBQ2QsWUFBTSxLQUFLLEVBQUUsQ0FBQztBQUNkLFlBQU0sS0FBSyxFQUFFLENBQUM7QUFFZCxZQUFNLEtBQUssT0FBTyxNQUFNLFNBQVMsQ0FBQztBQUNsQyxZQUFNLEtBQUssT0FBTyxNQUFNLFNBQVMsQ0FBQztBQUNsQyxZQUFNLEtBQUssT0FBTyxNQUFNLFNBQVMsQ0FBQztBQUNsQyxZQUFNLEtBQUssT0FBTyxNQUFNLFNBQVMsQ0FBQztBQUNsQyxZQUFNLEtBQUssT0FBTyxNQUFNLFNBQVMsQ0FBQztBQUNsQyxZQUFNLEtBQUssT0FBTyxNQUFNLFNBQVMsRUFBRTtBQUNuQyxZQUFNLEtBQUssT0FBTyxNQUFNLFNBQVMsRUFBRTtBQUNuQyxZQUFNLEtBQUssT0FBTyxNQUFNLFNBQVMsRUFBRTtBQUVuQyxVQUFJLEtBQUssRUFBRSxDQUFDLEtBQUssS0FBSztBQUN0QixVQUFJLEtBQUssRUFBRSxDQUFDLE1BQU8sT0FBTyxLQUFPLE1BQU0sS0FBTTtBQUM3QyxVQUFJLEtBQUssRUFBRSxDQUFDLE1BQU8sT0FBTyxLQUFPLE1BQU0sS0FBTTtBQUM3QyxVQUFJLEtBQUssRUFBRSxDQUFDLE1BQU8sT0FBTyxJQUFNLE1BQU0sS0FBTTtBQUM1QyxVQUFJLEtBQUssRUFBRSxDQUFDLE1BQU8sT0FBTyxJQUFNLE1BQU0sTUFBTztBQUM3QyxVQUFJLEtBQUssRUFBRSxDQUFDLEtBQU0sT0FBTyxJQUFLO0FBQzlCLFVBQUksS0FBSyxF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QUcsTUFBTSxFQUFFLENBQUMsR0FDL0MsTUFBTSxFQUFFLENBQUMsR0FBRyxNQUFNLEVBQUUsQ0FBQyxHQUFHLE1BQU0sRUFBRSxDQUFDLEdBQUcsTUFBTSxFQUFFLENBQUMsR0FDN0MsTUFBTSxFQUFFLENBQUMsR0FBRyxNQUFNLEVBQUUsQ0FBQyxHQUFHLE1BQU0sRUFBRSxDQUFDLEdBQUcsTUFBTSxFQUFFLENBQUMsR0FDN0MsTUFBTSxLQUFLLE1BQU0sRUFBRSxDQUFDLEdBQUcsTUFBTSxFQUFFLENBQUMsR0FBRyxNQUFNLEVBQUUsQ0FBQztBQUU5QyxRQUFJLE1BQU0sS0FBSyxNQUFNLEtBQUssTUFBTSxLQUFLLE1BQU0sS0FDekMsTUFBTSxLQUFLLE1BQU0sS0FBSyxNQUFNLEtBQUssTUFBTSxLQUN2QyxNQUFNLEtBQUssTUFBTSxLQUFLLE1BQU0sS0FBSyxNQUFNLEtBQ3ZDLE1BQU0sS0FBSyxNQUFNLEtBQUssTUFBTSxLQUFLLE1BQU07QUFDekMsYUFBUyxJQUFJLEdBQUcsSUFBSSxRQUFRLEtBQUssR0FBRztBQUNsQyxZQUFPLE1BQU0sTUFBTztBQUFHLFlBQU1JLE1BQUssTUFBTSxLQUFLLEVBQUU7QUFDL0MsWUFBTyxNQUFNLE1BQU87QUFBRyxZQUFNQSxNQUFLLE1BQU0sS0FBSyxFQUFFO0FBQy9DLFlBQU8sTUFBTSxNQUFPO0FBQUcsWUFBTUEsTUFBSyxNQUFNLEtBQUssQ0FBQztBQUM5QyxZQUFPLE1BQU0sTUFBTztBQUFHLFlBQU1BLE1BQUssTUFBTSxLQUFLLENBQUM7QUFFOUMsWUFBTyxNQUFNLE1BQU87QUFBRyxZQUFNQSxNQUFLLE1BQU0sS0FBSyxFQUFFO0FBQy9DLFlBQU8sTUFBTSxNQUFPO0FBQUcsWUFBTUEsTUFBSyxNQUFNLEtBQUssRUFBRTtBQUMvQyxZQUFPLE1BQU0sTUFBTztBQUFHLFlBQU1BLE1BQUssTUFBTSxLQUFLLENBQUM7QUFDOUMsWUFBTyxNQUFNLE1BQU87QUFBRyxZQUFNQSxNQUFLLE1BQU0sS0FBSyxDQUFDO0FBRTlDLFlBQU8sTUFBTSxNQUFPO0FBQUcsWUFBTUEsTUFBSyxNQUFNLEtBQUssRUFBRTtBQUMvQyxZQUFPLE1BQU0sTUFBTztBQUFHLFlBQU1BLE1BQUssTUFBTSxLQUFLLEVBQUU7QUFDL0MsWUFBTyxNQUFNLE1BQU87QUFBRyxZQUFNQSxNQUFLLE1BQU0sS0FBSyxDQUFDO0FBQzlDLFlBQU8sTUFBTSxNQUFPO0FBQUcsWUFBTUEsTUFBSyxNQUFNLEtBQUssQ0FBQztBQUU5QyxZQUFPLE1BQU0sTUFBTztBQUFHLFlBQU1BLE1BQUssTUFBTSxLQUFLLEVBQUU7QUFDL0MsWUFBTyxNQUFNLE1BQU87QUFBRyxZQUFNQSxNQUFLLE1BQU0sS0FBSyxFQUFFO0FBQy9DLFlBQU8sTUFBTSxNQUFPO0FBQUcsWUFBTUEsTUFBSyxNQUFNLEtBQUssQ0FBQztBQUM5QyxZQUFPLE1BQU0sTUFBTztBQUFHLFlBQU1BLE1BQUssTUFBTSxLQUFLLENBQUM7QUFFOUMsWUFBTyxNQUFNLE1BQU87QUFBRyxZQUFNQSxNQUFLLE1BQU0sS0FBSyxFQUFFO0FBQy9DLFlBQU8sTUFBTSxNQUFPO0FBQUcsWUFBTUEsTUFBSyxNQUFNLEtBQUssRUFBRTtBQUMvQyxZQUFPLE1BQU0sTUFBTztBQUFHLFlBQU1BLE1BQUssTUFBTSxLQUFLLENBQUM7QUFDOUMsWUFBTyxNQUFNLE1BQU87QUFBRyxZQUFNQSxNQUFLLE1BQU0sS0FBSyxDQUFDO0FBRTlDLFlBQU8sTUFBTSxNQUFPO0FBQUcsWUFBTUEsTUFBSyxNQUFNLEtBQUssRUFBRTtBQUMvQyxZQUFPLE1BQU0sTUFBTztBQUFHLFlBQU1BLE1BQUssTUFBTSxLQUFLLEVBQUU7QUFDL0MsWUFBTyxNQUFNLE1BQU87QUFBRyxZQUFNQSxNQUFLLE1BQU0sS0FBSyxDQUFDO0FBQzlDLFlBQU8sTUFBTSxNQUFPO0FBQUcsWUFBTUEsTUFBSyxNQUFNLEtBQUssQ0FBQztBQUU5QyxZQUFPLE1BQU0sTUFBTztBQUFHLFlBQU1BLE1BQUssTUFBTSxLQUFLLEVBQUU7QUFDL0MsWUFBTyxNQUFNLE1BQU87QUFBRyxZQUFNQSxNQUFLLE1BQU0sS0FBSyxFQUFFO0FBQy9DLFlBQU8sTUFBTSxNQUFPO0FBQUcsWUFBTUEsTUFBSyxNQUFNLEtBQUssQ0FBQztBQUM5QyxZQUFPLE1BQU0sTUFBTztBQUFHLFlBQU1BLE1BQUssTUFBTSxLQUFLLENBQUM7QUFFOUMsWUFBTyxNQUFNLE1BQU87QUFBRyxZQUFNQSxNQUFLLE1BQU0sS0FBSyxFQUFFO0FBQy9DLFlBQU8sTUFBTSxNQUFPO0FBQUcsWUFBTUEsTUFBSyxNQUFNLEtBQUssRUFBRTtBQUMvQyxZQUFPLE1BQU0sTUFBTztBQUFHLFlBQU1BLE1BQUssTUFBTSxLQUFLLENBQUM7QUFDOUMsWUFBTyxNQUFNLE1BQU87QUFBRyxZQUFNQSxNQUFLLE1BQU0sS0FBSyxDQUFDO0lBQ2hEO0FBRUEsUUFBSSxLQUFLO0FBQ1QsUUFBSSxJQUFJLElBQUssTUFBTSxNQUFPO0FBQUcsUUFBSSxJQUFJLElBQUssTUFBTSxNQUFPO0FBQ3ZELFFBQUksSUFBSSxJQUFLLE1BQU0sTUFBTztBQUFHLFFBQUksSUFBSSxJQUFLLE1BQU0sTUFBTztBQUN2RCxRQUFJLElBQUksSUFBSyxNQUFNLE1BQU87QUFBRyxRQUFJLElBQUksSUFBSyxNQUFNLE1BQU87QUFDdkQsUUFBSSxJQUFJLElBQUssTUFBTSxNQUFPO0FBQUcsUUFBSSxJQUFJLElBQUssTUFBTSxNQUFPO0FBQ3ZELFFBQUksSUFBSSxJQUFLLE1BQU0sTUFBTztBQUFHLFFBQUksSUFBSSxJQUFLLE1BQU0sTUFBTztBQUN2RCxRQUFJLElBQUksSUFBSyxNQUFNLE1BQU87QUFBRyxRQUFJLElBQUksSUFBSyxNQUFNLE1BQU87QUFDdkQsUUFBSSxJQUFJLElBQUssTUFBTSxNQUFPO0FBQUcsUUFBSSxJQUFJLElBQUssTUFBTSxNQUFPO0FBQ3ZELFFBQUksSUFBSSxJQUFLLE1BQU0sTUFBTztBQUFHLFFBQUksSUFBSSxJQUFLLE1BQU0sTUFBTztFQUN6RDtBQVFNLFdBQVUsUUFDZCxHQUFnQixHQUFnQixHQUFnQixLQUFnQjtBQUVoRSxRQUFJLE1BQU0sRUFBRSxDQUFDLEdBQUcsTUFBTSxFQUFFLENBQUMsR0FBRyxNQUFNLEVBQUUsQ0FBQyxHQUFHLE1BQU0sRUFBRSxDQUFDLEdBQy9DLE1BQU0sRUFBRSxDQUFDLEdBQUcsTUFBTSxFQUFFLENBQUMsR0FBRyxNQUFNLEVBQUUsQ0FBQyxHQUFHLE1BQU0sRUFBRSxDQUFDLEdBQzdDLE1BQU0sRUFBRSxDQUFDLEdBQUcsTUFBTSxFQUFFLENBQUMsR0FBRyxNQUFNLEVBQUUsQ0FBQyxHQUFHLE1BQU0sRUFBRSxDQUFDLEdBQzdDLE1BQU0sRUFBRSxDQUFDLEdBQUcsTUFBTSxFQUFFLENBQUMsR0FBRyxNQUFNLEVBQUUsQ0FBQyxHQUFHLE1BQU0sRUFBRSxDQUFDO0FBQy9DLGFBQVMsSUFBSSxHQUFHLElBQUksSUFBSSxLQUFLLEdBQUc7QUFDOUIsWUFBTyxNQUFNLE1BQU87QUFBRyxZQUFNQSxNQUFLLE1BQU0sS0FBSyxFQUFFO0FBQy9DLFlBQU8sTUFBTSxNQUFPO0FBQUcsWUFBTUEsTUFBSyxNQUFNLEtBQUssRUFBRTtBQUMvQyxZQUFPLE1BQU0sTUFBTztBQUFHLFlBQU1BLE1BQUssTUFBTSxLQUFLLENBQUM7QUFDOUMsWUFBTyxNQUFNLE1BQU87QUFBRyxZQUFNQSxNQUFLLE1BQU0sS0FBSyxDQUFDO0FBRTlDLFlBQU8sTUFBTSxNQUFPO0FBQUcsWUFBTUEsTUFBSyxNQUFNLEtBQUssRUFBRTtBQUMvQyxZQUFPLE1BQU0sTUFBTztBQUFHLFlBQU1BLE1BQUssTUFBTSxLQUFLLEVBQUU7QUFDL0MsWUFBTyxNQUFNLE1BQU87QUFBRyxZQUFNQSxNQUFLLE1BQU0sS0FBSyxDQUFDO0FBQzlDLFlBQU8sTUFBTSxNQUFPO0FBQUcsWUFBTUEsTUFBSyxNQUFNLEtBQUssQ0FBQztBQUU5QyxZQUFPLE1BQU0sTUFBTztBQUFHLFlBQU1BLE1BQUssTUFBTSxLQUFLLEVBQUU7QUFDL0MsWUFBTyxNQUFNLE1BQU87QUFBRyxZQUFNQSxNQUFLLE1BQU0sS0FBSyxFQUFFO0FBQy9DLFlBQU8sTUFBTSxNQUFPO0FBQUcsWUFBTUEsTUFBSyxNQUFNLEtBQUssQ0FBQztBQUM5QyxZQUFPLE1BQU0sTUFBTztBQUFHLFlBQU1BLE1BQUssTUFBTSxLQUFLLENBQUM7QUFFOUMsWUFBTyxNQUFNLE1BQU87QUFBRyxZQUFNQSxNQUFLLE1BQU0sS0FBSyxFQUFFO0FBQy9DLFlBQU8sTUFBTSxNQUFPO0FBQUcsWUFBTUEsTUFBSyxNQUFNLEtBQUssRUFBRTtBQUMvQyxZQUFPLE1BQU0sTUFBTztBQUFHLFlBQU1BLE1BQUssTUFBTSxLQUFLLENBQUM7QUFDOUMsWUFBTyxNQUFNLE1BQU87QUFBRyxZQUFNQSxNQUFLLE1BQU0sS0FBSyxDQUFDO0FBRTlDLFlBQU8sTUFBTSxNQUFPO0FBQUcsWUFBTUEsTUFBSyxNQUFNLEtBQUssRUFBRTtBQUMvQyxZQUFPLE1BQU0sTUFBTztBQUFHLFlBQU1BLE1BQUssTUFBTSxLQUFLLEVBQUU7QUFDL0MsWUFBTyxNQUFNLE1BQU87QUFBRyxZQUFNQSxNQUFLLE1BQU0sS0FBSyxDQUFDO0FBQzlDLFlBQU8sTUFBTSxNQUFPO0FBQUcsWUFBTUEsTUFBSyxNQUFNLEtBQUssQ0FBQztBQUU5QyxZQUFPLE1BQU0sTUFBTztBQUFHLFlBQU1BLE1BQUssTUFBTSxLQUFLLEVBQUU7QUFDL0MsWUFBTyxNQUFNLE1BQU87QUFBRyxZQUFNQSxNQUFLLE1BQU0sS0FBSyxFQUFFO0FBQy9DLFlBQU8sTUFBTSxNQUFPO0FBQUcsWUFBTUEsTUFBSyxNQUFNLEtBQUssQ0FBQztBQUM5QyxZQUFPLE1BQU0sTUFBTztBQUFHLFlBQU1BLE1BQUssTUFBTSxLQUFLLENBQUM7QUFFOUMsWUFBTyxNQUFNLE1BQU87QUFBRyxZQUFNQSxNQUFLLE1BQU0sS0FBSyxFQUFFO0FBQy9DLFlBQU8sTUFBTSxNQUFPO0FBQUcsWUFBTUEsTUFBSyxNQUFNLEtBQUssRUFBRTtBQUMvQyxZQUFPLE1BQU0sTUFBTztBQUFHLFlBQU1BLE1BQUssTUFBTSxLQUFLLENBQUM7QUFDOUMsWUFBTyxNQUFNLE1BQU87QUFBRyxZQUFNQSxNQUFLLE1BQU0sS0FBSyxD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LElBQU87QUFBQSxjQUNiLFFBQVE7QUFBQSxnQkFDSixPQUFPO0FBQUEsZ0JBQ1AsY0FBY0M7QUFBQSxrQkFDTixNQUFNO0FBQUEsb0JBQ0YsSUFBSSxZQUFZLEVBQUU7QUFBQSxzQkFDZCxLQUFLO0FBQUEsd0JBQVU7QUFBQSwwQkFDWDtBQUFBLDBCQUNBO0FBQUEsd0JBQ0o7QUFBQSxzQkFDSjtBQUFBLG9CQUNKO0FBQUEsb0JBQ0EsWUFBWSxnQkFBZ0I7QUFBQSxrQkFDaEM7QUFBQSxnQkFDSjtBQUFBLGNBQ0o7QUFBQSxZQUNKLENBQUM7QUFBQSxVQUNMLEdBQUc7QUFBQSxXQUNGLFlBQVk7QUFDVCxnQkFBSSxDQUFDLFlBQVksWUFBWSxHQUFHO0FBQzVCLG9CQUFNLHFCQUFxQjtBQUMzQjtBQUFBLFlBQ0o7QUFFQSxzQkFBTTtBQUFBLGNBQ0YsWUFBWSxZQUFZO0FBQUEsY0FDeEI7QUFBQSxnQkFDSSxRQUFRO0FBQUEsZ0JBQ1IsTUFBTSxLQUFLLFVBQVU7QUFBQSxrQkFDakIsU0FBUyxRQUFRLFlBQVksU0FBUyxTQUFTLElBQUk7QUFBQSxnQkFDdkQsQ0FBQztBQUFBLGdCQUNELFNBQVM7QUFBQSxrQkFDTCxnQkFBZ0I7QUFBQSxnQkFDcEI7QUFBQSxjQUNKO0FBQUEsWUFDSjtBQUFBLFVBQ0osR0FBRztBQUFBLFFBQ1AsQ0FBQztBQUFBLE1BQ0w7QUFFQSxVQUFJLENBQUMsUUFBUztBQUVkLGNBQVEsT0FBTyxNQUFNO0FBQUEsSUFDekI7QUFBQSxFQUNKLEdBQUcsR0FBRztBQUVOLFdBQVMsUUFBUSxNQUFjO0FBQzNCLFVBQU0sTUFBTSxJQUFJLElBQUksSUFBSTtBQUN4QixRQUFJLFdBQVc7QUFDZixXQUFPLElBQUksU0FBUztBQUFBLEVBQ3hCOyIsCiAgIm5hbWVzIjogWyJHTV9mZXRjaCIsICJIZWFkZXJzIiwgImhlYWRlcnMiLCAiQXRVcmkiLCAiZGF0ZSIsICJub3ciLCAiZ2V0UGRzRW5kcG9pbnQiLCAiZ2V0U2VydmljZUVuZHBvaW50IiwgInZhbGlkYXRlVXJsIiwgImdldFBkc0VuZHBvaW50IiwgImFscGhhYmV0IiwgInBvdyIsICJhbnVtYmVyIiwgImlzQnl0ZXMiLCAiY3J5cHRvIiwgImNyeXB0byIsICJhbnVtYmVyIiwgIkhNQUMiLCAiaXNMRSIsICJpc0J5dGVzIiwgImFieXRlcyIsICJhYnl0ZXMiLCAiYWJ5dGVzIiwgImlzQnl0ZXMiLCAiaXNCeXRlcyIsICJfMG4iLCAiXzBuIiwgIl8wbiIsICJfMW4iLCAiYWRqdXN0U2NhbGFyQnl0ZXMiLCAic2NhbGFyTXVsdCIsICJzY2FsYXJNdWx0QmFzZSIsICJfMG4iLCAiXzFuIiwgImFudW1iZXIiLCAiYW51bWJlciIsICJhbnVtYmVyIiwgImlzQnl0ZXMiLCAiYWJ5dGVzIiwgImFleGlzdHMiLCAiYW91dHB1dCIsICJhYnl0ZXMiLCAidTMyIiwgImNyZWF0ZVZpZXciLCAiaXNMRSIsICJ1dGY4VG9CeXRlcyIsICJ0b0J5dGVzIiwgInV0ZjhUb0J5dGVzIiwgImlzQnl0ZXMiLCAiY2hlY2tPcHRzIiwgImFieXRlcyIsICJzZXRCaWdVaW50NjQiLCAiaXNMRSIsICJ1MzIiLCAicm90bCIsICJpc0FsaWduZWQzMiIsICJjaGVja09wdHMiLCAiYW51bWJlciIsICJhYnl0ZXMiLCAidG9CeXRlcyIsICJhYnl0ZXMiLCAiYWV4aXN0cyIsICJhb3V0cHV0IiwgInJvdGwiLCAiY3JlYXRlVmlldyIsICJzZXRCaWdVaW50NjQiLCAiX19hd2FpdGVyIiwgImNodW5rIiwgIl9fYXdhaXRlciIsICJfX2F3YWl0ZXIiLCAidG9CeXRlcyIsICJ0b0J5dGVzIl0KfQo=
