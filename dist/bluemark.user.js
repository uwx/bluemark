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
  // src/GM_fetch/index.ts
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
  var Headers = class _Headers {
    map = {};
    constructor(headers2) {
      this.map = {};
      if (headers2 instanceof _Headers) {
        headers2.forEach((value, name) => {
          this.append(name, value);
        });
      } else if (headers2) {
        Object.getOwnPropertyNames(headers2).forEach((name) => {
          this.append(name, headers2[name]);
        });
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
      Object.getOwnPropertyNames(this.map).forEach((name) => {
        this.map[name].forEach((value) => {
          callback.call(thisArg, value, name, this);
        });
      });
    }
    *[Symbol.iterator]() {
      for (const [name, values] of Object.entries(this.map)) {
        for (const value of values) {
          yield [name, value];
        }
      }
    }
  };
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
    _bodyUsed = false;
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
      } else if (body instanceof Blob) {
        return Promise.resolve(body);
      } else if (body instanceof FormData) {
        return Promise.reject(new TypeError("A multipart FormData body cannot be read as a blob"));
      } else if (body === void 0) {
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
        return Promise.resolve(textEncoder.encode(body));
      } else if (body instanceof ArrayBuffer) {
        return Promise.resolve(body);
      } else if (body instanceof Blob) {
        return Promise.resolve(readBlobAsArrayBuffer(body));
      } else if (body instanceof FormData) {
        return Promise.reject(new TypeError("A multipart FormData body cannot be read as an arrayBuffer"));
      } else if (body === void 0) {
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
      } else if (body instanceof ArrayBuffer) {
        return Promise.resolve(textDecoder.decode(body));
      } else if (body instanceof Blob) {
        return Promise.resolve(readBlobAsText(body));
      } else if (body instanceof FormData) {
        return Promise.reject(new TypeError("A multipart FormData body cannot be read as text"));
      } else if (body === void 0) {
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
      } else if (body instanceof ArrayBuffer) {
        return Promise.reject(new TypeError("Unsupported: Cannot parse FormData from an ArrayBuffer body"));
      } else if (body instanceof Blob) {
        return Promise.reject(new TypeError("Unsupported: Cannot parse FormData from a Blob body"));
      } else if (body instanceof FormData) {
        return Promise.resolve(body);
      } else if (body === void 0) {
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
      throw new Error("Unsupported HTTP method for GM_xmlhttpRequest: " + method);
    }
    return method;
  }
  var Request = class extends Body {
    url;
    credentials;
    headers;
    method;
    mode;
    referrer;
    bodyStore;
    constructor(url, options) {
      super();
      options = options || {};
      this.url = url;
      this.credentials = options.credentials || "omit";
      this.headers = new Headers(options.headers);
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
  function headers(responseHeaders) {
    const head = new Headers();
    const pairs = responseHeaders.trim().split("\n");
    pairs.forEach((header) => {
      const split = header.trim().split(":");
      const key = split.shift().trim();
      const value = split.join(":").trim();
      head.append(key, value);
    });
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
    type;
    url;
    status;
    ok;
    statusText;
    headers;
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
  function responseURL(finalUrl, rawRespHeaders, respHeaders) {
    if (finalUrl) {
      return finalUrl;
    }
    if (/^X-Request-URL:/m.test(rawRespHeaders)) {
      return respHeaders.get("X-Request-URL");
    }
    return null;
  }
  function GM_fetch(input, init) {
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
    return new Promise(function(resolve, reject) {
      const xhrDetails = {};
      xhrDetails.method = request.method;
      xhrDetails.responseType = "arraybuffer";
      xhrDetails.url = request.url;
      xhrDetails.onload = (resp) => {
        const status = resp.status;
        if (status < 100 || status > 599) {
          reject(new TypeError("Network request failed: Status code " + status));
          return;
        }
        resolve(new Response(resp));
      };
      xhrDetails.onerror = () => {
        reject(new TypeError("Network request failed"));
      };
      xhrDetails.headers = {};
      for (const [name, value] of request.headers) {
        xhrDetails.headers[name] = value;
      }
      if (typeof request.bodyRaw !== "undefined") {
        xhrDetails.data = request.bodyRaw;
      }
      GM_xmlhttpRequest(xhrDetails);
    });
  }

  // src/main.ts
  console.log("hello world!");
  var processedElements = /* @__PURE__ */ new WeakSet();
  GM_registerMenuCommand("Set webhook", () => {
    const result = prompt("Paste webhook URL here");
    if (result != null) {
      GM_setValue("webhookUrl", result);
      alert("URL set!");
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
      button.onclick = (e) => {
        e.stopPropagation();
        e.preventDefault();
        console.log(`bookmarking ${postLink ?? document.location.href}`);
        if (!GM_getValue("webhookUrl")) {
          alert("No webhook URL set!");
          return;
        }
        GM_fetch(
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
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsiLi4vc3JjL0dNX2ZldGNoL2luZGV4LnRzIiwgIi4uL3NyYy9tYWluLnRzIl0sCiAgInNvdXJjZXNDb250ZW50IjogWyIvLyBodHRwczovL2dpdGh1Yi5jb20vbWl0Y2hlbGxtZWJhbmUvR01fZmV0Y2hcclxuLy9cclxuLy8gQ29weXJpZ2h0IChjKSAyMDE1IE1pdGNoZWxsIE1lYmFuZVxyXG4vLyBDb3B5cmlnaHQgKGMpIDIwMTQtMjAxNSBHaXRIdWIsIEluYy5cclxuLy9cclxuLy8gUGVybWlzc2lvbiBpcyBoZXJlYnkgZ3JhbnRlZCwgZnJlZSBvZiBjaGFyZ2UsIHRvIGFueSBwZXJzb24gb2J0YWluaW5nXHJcbi8vIGEgY29weSBvZiB0aGlzIHNvZnR3YXJlIGFuZCBhc3NvY2lhdGVkIGRvY3VtZW50YXRpb24gZmlsZXMgKHRoZVxyXG4vLyBcIlNvZnR3YXJlXCIpLCB0byBkZWFsIGluIHRoZSBTb2Z0d2FyZSB3aXRob3V0IHJlc3RyaWN0aW9uLCBpbmNsdWRpbmdcclxuLy8gd2l0aG91dCBsaW1pdGF0aW9uIHRoZSByaWdodHMgdG8gdXNlLCBjb3B5LCBtb2RpZnksIG1lcmdlLCBwdWJsaXNoLFxyXG4vLyBkaXN0cmlidXRlLCBzdWJsaWNlbnNlLCBhbmQvb3Igc2VsbCBjb3BpZXMgb2YgdGhlIFNvZnR3YXJlLCBhbmQgdG9cclxuLy8gcGVybWl0IHBlcnNvbnMgdG8gd2hvbSB0aGUgU29mdHdhcmUgaXMgZnVybmlzaGVkIHRvIGRvIHNvLCBzdWJqZWN0IHRvXHJcbi8vIHRoZSBmb2xsb3dpbmcgY29uZGl0aW9uczpcclxuLy9cclxuLy8gVGhlIGFib3ZlIGNvcHlyaWdodCBub3RpY2UgYW5kIHRoaXMgcGVybWlzc2lvbiBub3RpY2Ugc2hhbGwgYmVcclxuLy8gaW5jbHVkZWQgaW4gYWxsIGNvcGllcyBvciBzdWJzdGFudGlhbCBwb3J0aW9ucyBvZiB0aGUgU29mdHdhcmUuXHJcbi8vXHJcbi8vIFRIRSBTT0ZUV0FSRSBJUyBQUk9WSURFRCBcIkFTIElTXCIsIFdJVEhPVVQgV0FSUkFOVFkgT0YgQU5ZIEtJTkQsXHJcbi8vIEVYUFJFU1MgT1IgSU1QTElFRCwgSU5DTFVESU5HIEJVVCBOT1QgTElNSVRFRCBUTyBUSEUgV0FSUkFOVElFUyBPRlxyXG4vLyBNRVJDSEFOVEFCSUxJVFksIEZJVE5FU1MgRk9SIEEgUEFSVElDVUxBUiBQVVJQT1NFIEFORFxyXG4vLyBOT05JTkZSSU5HRU1FTlQuIElOIE5PIEVWRU5UIFNIQUxMIFRIRSBBVVRIT1JTIE9SIENPUFlSSUdIVCBIT0xERVJTIEJFXHJcbi8vIExJQUJMRSBGT1IgQU5ZIENMQUlNLCBEQU1BR0VTIE9SIE9USEVSIExJQUJJTElUWSwgV0hFVEhFUiBJTiBBTiBBQ1RJT05cclxuLy8gT0YgQ09OVFJBQ1QsIFRPUlQgT1IgT1RIRVJXSVNFLCBBUklTSU5HIEZST00sIE9VVCBPRiBPUiBJTiBDT05ORUNUSU9OXHJcbi8vIFdJVEggVEhFIFNPRlRXQVJFIE9SIFRIRSBVU0UgT1IgT1RIRVIgREVBTElOR1MgSU4gVEhFIFNPRlRXQVJFLlxyXG5cclxuaW1wb3J0IHR5cGUgeyBHTV9UeXBlcyB9IGZyb20gJy4vdGFtcGVybW9ua2V5LW1vZHVsZSc7XHJcblxyXG4vLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgQHR5cGVzY3JpcHQtZXNsaW50L2Jhbi10eXBlc1xyXG50eXBlIGtub3duID0gc3RyaW5nIHwgbnVtYmVyIHwgYm9vbGVhbiB8IHN5bWJvbCB8IGJpZ2ludCB8IG9iamVjdCB8IG51bGwgfCB1bmRlZmluZWQ7XHJcblxyXG5mdW5jdGlvbiBub3JtYWxpemVOYW1lKG5hbWU6IGtub3duKTogc3RyaW5nIHtcclxuICAgIGlmICh0eXBlb2YgbmFtZSAhPT0gJ3N0cmluZycpIHtcclxuICAgICAgICBuYW1lID0gU3RyaW5nKG5hbWUpO1xyXG4gICAgfVxyXG4gICAgaWYgKC9bXlxcdyMkJSYnKisuXmB8fi1dL2kudGVzdChuYW1lKSkge1xyXG4gICAgICAgIHRocm93IG5ldyBUeXBlRXJyb3IoJ0ludmFsaWQgY2hhcmFjdGVyIGluIGhlYWRlciBmaWVsZCBuYW1lJyk7XHJcbiAgICB9XHJcbiAgICByZXR1cm4gbmFtZTsgLy8gVE9ETyBjYXNlIGluc2Vuc2l0aXZpdHlcclxufVxyXG5cclxuZnVuY3Rpb24gbm9ybWFsaXplVmFsdWUodmFsdWU6IGtub3duKTogc3RyaW5nIHtcclxuICAgIGlmICh0eXBlb2YgdmFsdWUgIT09ICdzdHJpbmcnKSB7XHJcbiAgICAgICAgdmFsdWUgPSBTdHJpbmcodmFsdWUpO1xyXG4gICAgfVxyXG4gICAgcmV0dXJuIHZhbHVlO1xyXG59XHJcblxyXG5leHBvcnQgY2xhc3MgSGVhZGVycyB7XHJcbiAgICBwcml2YXRlIG1hcDogUmVjb3JkPHN0cmluZywgc3RyaW5nW10+ID0ge307XHJcblxyXG4gICAgY29uc3RydWN0b3IoaGVhZGVycz86IEhlYWRlcnMgfCBSZWNvcmQ8c3RyaW5nLCBrbm93bj4pIHtcclxuICAgICAgICB0aGlzLm1hcCA9IHt9O1xyXG5cclxuICAgICAgICBpZiAoaGVhZGVycyBpbnN0YW5jZW9mIEhlYWRlcnMpIHtcclxuICAgICAgICAgICAgaGVhZGVycy5mb3JFYWNoKCh2YWx1ZSwgbmFtZSkgPT4ge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5hcHBlbmQobmFtZSwgdmFsdWUpO1xyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9IGVsc2UgaWYgKGhlYWRlcnMpIHtcclxuICAgICAgICAgICAgT2JqZWN0LmdldE93blByb3BlcnR5TmFtZXMoaGVhZGVycykuZm9yRWFjaCgobmFtZSkgPT4ge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5hcHBlbmQobmFtZSwgaGVhZGVyc1tuYW1lXSk7XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBhcHBlbmQobmFtZToga25vd24sIHZhbHVlOiBrbm93bik6IHZvaWQge1xyXG4gICAgICAgIG5hbWUgPSBub3JtYWxpemVOYW1lKG5hbWUpO1xyXG4gICAgICAgIHZhbHVlID0gbm9ybWFsaXplVmFsdWUodmFsdWUpO1xyXG5cclxuICAgICAgICBjb25zdCBsaXN0ID0gdGhpcy5tYXBbbmFtZV07XHJcbiAgICAgICAgaWYgKGxpc3QgPT09IHVuZGVmaW5lZCkge1xyXG4gICAgICAgICAgICB0aGlzLm1hcFtuYW1lXSA9IFt2YWx1ZV07XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgbGlzdC5wdXNoKHZhbHVlKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgZGVsZXRlKG5hbWU6IGtub3duKTogdm9pZCB7XHJcbiAgICAgICAgZGVsZXRlIHRoaXMubWFwW25vcm1hbGl6ZU5hbWUobmFtZSldO1xyXG4gICAgfVxyXG5cclxuICAgIGdldChuYW1lOiBrbm93bik6IHN0cmluZyB8IG51bGwge1xyXG4gICAgICAgIGNvbnN0IHZhbHVlcyA9IHRoaXMubWFwW25vcm1hbGl6ZU5hbWUobmFtZSldO1xyXG4gICAgICAgIHJldHVybiB2YWx1ZXMgPyB2YWx1ZXNbMF0gOiBudWxsO1xyXG4gICAgfVxyXG5cclxuICAgIGdldEFsbChuYW1lOiBrbm93bik6IHN0cmluZ1tdIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5tYXBbbm9ybWFsaXplTmFtZShuYW1lKV0gfHwgW107XHJcbiAgICB9XHJcblxyXG4gICAgaGFzKG5hbWU6IGtub3duKTogYm9vbGVhbiB7XHJcbiAgICAgICAgcmV0dXJuIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbCh0aGlzLm1hcCwgbm9ybWFsaXplTmFtZShuYW1lKSk7XHJcbiAgICB9XHJcblxyXG4gICAgc2V0KG5hbWU6IGtub3duLCB2YWx1ZToga25vd24pOiB2b2lkIHtcclxuICAgICAgICB0aGlzLm1hcFtub3JtYWxpemVOYW1lKG5hbWUpXSA9IFtub3JtYWxpemVWYWx1ZSh2YWx1ZSldO1xyXG4gICAgfVxyXG5cclxuICAgIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSB1bmljb3JuL3ByZXZlbnQtYWJicmV2aWF0aW9uc1xyXG4gICAgZm9yRWFjaChjYWxsYmFjazogKHZhbHVlOiBzdHJpbmcsIG5hbWU6IHN0cmluZywgdGhpc0FyZzogdGhpcykgPT4gdm9pZCwgdGhpc0FyZz86IHVua25vd24pOiB2b2lkIHtcclxuICAgICAgICBPYmplY3QuZ2V0T3duUHJvcGVydHlOYW1lcyh0aGlzLm1hcCkuZm9yRWFjaCgobmFtZSkgPT4ge1xyXG4gICAgICAgICAgICB0aGlzLm1hcFtuYW1lXS5mb3JFYWNoKCh2YWx1ZSkgPT4ge1xyXG4gICAgICAgICAgICAgICAgY2FsbGJhY2suY2FsbCh0aGlzQXJnLCB2YWx1ZSwgbmFtZSwgdGhpcyk7XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG5cclxuICAgICpbU3ltYm9sLml0ZXJhdG9yXSgpOiBJdGVyYXRvcjxbbmFtZTogc3RyaW5nLCB2YWx1ZTogc3RyaW5nXT4ge1xyXG4gICAgICAgIGZvciAoY29uc3QgW25hbWUsIHZhbHVlc10gb2YgT2JqZWN0LmVudHJpZXModGhpcy5tYXApKSB7XHJcbiAgICAgICAgICAgIGZvciAoY29uc3QgdmFsdWUgb2YgdmFsdWVzKSB7XHJcbiAgICAgICAgICAgICAgICB5aWVsZCBbbmFtZSwgdmFsdWVdO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG59XHJcblxyXG5mdW5jdGlvbiBmaWxlUmVhZGVyUmVhZHkocmVhZGVyOiBGaWxlUmVhZGVyKTogUHJvbWlzZTxzdHJpbmcgfCBBcnJheUJ1ZmZlciB8IG51bGw+IHtcclxuICAgIHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XHJcbiAgICAgICAgcmVhZGVyLmFkZEV2ZW50TGlzdGVuZXIoJ2xvYWQnLCAoKSA9PiB7XHJcbiAgICAgICAgICAgIHJlc29sdmUocmVhZGVyLnJlc3VsdCk7XHJcbiAgICAgICAgfSk7XHJcbiAgICAgICAgcmVhZGVyLmFkZEV2ZW50TGlzdGVuZXIoJ2Vycm9yJywgKCkgPT4ge1xyXG4gICAgICAgICAgICByZWplY3QocmVhZGVyLmVycm9yKTtcclxuICAgICAgICB9KTtcclxuICAgIH0pO1xyXG59XHJcblxyXG5mdW5jdGlvbiByZWFkQmxvYkFzQXJyYXlCdWZmZXIoYmxvYjogQmxvYik6IFByb21pc2U8QXJyYXlCdWZmZXI+IHtcclxuICAgIGNvbnN0IHJlYWRlciA9IG5ldyBGaWxlUmVhZGVyKCk7XHJcbiAgICByZWFkZXIucmVhZEFzQXJyYXlCdWZmZXIoYmxvYik7XHJcbiAgICByZXR1cm4gZmlsZVJlYWRlclJlYWR5KHJlYWRlcikgYXMgUHJvbWlzZTxBcnJheUJ1ZmZlcj47XHJcbn1cclxuXHJcbmZ1bmN0aW9uIHJlYWRCbG9iQXNUZXh0KGJsb2I6IEJsb2IpOiBQcm9taXNlPHN0cmluZz4ge1xyXG4gICAgY29uc3QgcmVhZGVyID0gbmV3IEZpbGVSZWFkZXIoKTtcclxuICAgIHJlYWRlci5yZWFkQXNUZXh0KGJsb2IpO1xyXG4gICAgcmV0dXJuIGZpbGVSZWFkZXJSZWFkeShyZWFkZXIpIGFzIFByb21pc2U8c3RyaW5nPjtcclxufVxyXG5cclxuY29uc3QgdGV4dEVuY29kZXIgPSBuZXcgVGV4dEVuY29kZXIoKTtcclxuY29uc3QgdGV4dERlY29kZXIgPSBuZXcgVGV4dERlY29kZXIoKTtcclxuYWJzdHJhY3QgY2xhc3MgQm9keSB7XHJcbiAgICBwcm90ZWN0ZWQgX2JvZHlVc2VkID0gZmFsc2U7XHJcblxyXG4gICAgcHJvdGVjdGVkIGFic3RyYWN0IGdldCBib2R5KCk6IHN0cmluZyB8IEFycmF5QnVmZmVyIHwgQmxvYiB8IEZvcm1EYXRhIHwgdW5kZWZpbmVkO1xyXG5cclxuICAgIGdldCBib2R5VXNlZCgpIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5fYm9keVVzZWQ7XHJcbiAgICB9XHJcblxyXG4gICAgYmxvYigpOiBQcm9taXNlPEJsb2I+IHtcclxuICAgICAgICBpZiAodGhpcy5fYm9keVVzZWQpIHtcclxuICAgICAgICAgICAgcmV0dXJuIFByb21pc2UucmVqZWN0KG5ldyBUeXBlRXJyb3IoJ0JvZHkgY29udGVudHMgYWxyZWFkeSByZWFkJykpO1xyXG4gICAgICAgIH1cclxuICAgICAgICB0aGlzLl9ib2R5VXNlZCA9IHRydWU7XHJcblxyXG4gICAgICAgIGNvbnN0IGJvZHkgPSB0aGlzLmJvZHk7XHJcbiAgICAgICAgaWYgKHR5cGVvZiBib2R5ID09PSAnc3RyaW5nJyB8fCBib2R5IGluc3RhbmNlb2YgQXJyYXlCdWZmZXIpIHtcclxuICAgICAgICAgICAgcmV0dXJuIFByb21pc2UucmVzb2x2ZShuZXcgQmxvYihbYm9keV0pKTtcclxuICAgICAgICB9IGVsc2UgaWYgKGJvZHkgaW5zdGFuY2VvZiBCbG9iKSB7XHJcbiAgICAgICAgICAgIHJldHVybiBQcm9taXNlLnJlc29sdmUoYm9keSk7XHJcbiAgICAgICAgfSBlbHNlIGlmIChib2R5IGluc3RhbmNlb2YgRm9ybURhdGEpIHtcclxuICAgICAgICAgICAgcmV0dXJuIFByb21pc2UucmVqZWN0KG5ldyBUeXBlRXJyb3IoJ0EgbXVsdGlwYXJ0IEZvcm1EYXRhIGJvZHkgY2Fubm90IGJlIHJlYWQgYXMgYSBibG9iJykpO1xyXG4gICAgICAgIH0gZWxzZSBpZiAoYm9keSA9PT0gdW5kZWZpbmVkKSB7XHJcbiAgICAgICAgICAgIHJldHVybiBQcm9taXNlLnJlamVjdChuZXcgRXJyb3IoJ05vIGJvZHkgaXMgcHJlc2VudCcpKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHRocm93IG5ldyBUeXBlRXJyb3IoJ0ludmFsaWQgYm9keSB0eXBlJyk7XHJcbiAgICB9XHJcblxyXG4gICAgYXJyYXlCdWZmZXIoKTogUHJvbWlzZTxBcnJheUJ1ZmZlcj4ge1xyXG4gICAgICAgIGlmICh0aGlzLl9ib2R5VXNlZCkge1xyXG4gICAgICAgICAgICByZXR1cm4gUHJvbWlzZS5yZWplY3QobmV3IFR5cGVFcnJvcignQm9keSBjb250ZW50cyBhbHJlYWR5IHJlYWQnKSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHRoaXMuX2JvZHlVc2VkID0gdHJ1ZTtcclxuXHJcbiAgICAgICAgY29uc3QgYm9keSA9IHRoaXMuYm9keTtcclxuICAgICAgICBpZiAodHlwZW9mIGJvZHkgPT09ICdzdHJpbmcnKSB7XHJcbiAgICAgICAgICAgIHJldHVybiBQcm9taXNlLnJlc29sdmUodGV4dEVuY29kZXIuZW5jb2RlKGJvZHkpKTtcclxuICAgICAgICB9IGVsc2UgaWYgKGJvZHkgaW5zdGFuY2VvZiBBcnJheUJ1ZmZlcikge1xyXG4gICAgICAgICAgICByZXR1cm4gUHJvbWlzZS5yZXNvbHZlKGJvZHkpO1xyXG4gICAgICAgIH0gZWxzZSBpZiAoYm9keSBpbnN0YW5jZW9mIEJsb2IpIHtcclxuICAgICAgICAgICAgcmV0dXJuIFByb21pc2UucmVzb2x2ZShyZWFkQmxvYkFzQXJyYXlCdWZmZXIoYm9keSkpO1xyXG4gICAgICAgIH0gZWxzZSBpZiAoYm9keSBpbnN0YW5jZW9mIEZvcm1EYXRhKSB7XHJcbiAgICAgICAgICAgIHJldHVybiBQcm9taXNlLnJlamVjdChuZXcgVHlwZUVycm9yKCdBIG11bHRpcGFydCBGb3JtRGF0YSBib2R5IGNhbm5vdCBiZSByZWFkIGFzIGFuIGFycmF5QnVmZmVyJykpO1xyXG4gICAgICAgIH0gZWxzZSBpZiAoYm9keSA9PT0gdW5kZWZpbmVkKSB7XHJcbiAgICAgICAgICAgIHJldHVybiBQcm9taXNlLnJlamVjdChuZXcgRXJyb3IoJ05vIGJvZHkgaXMgcHJlc2VudCcpKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHRocm93IG5ldyBUeXBlRXJyb3IoJ0ludmFsaWQgYm9keSB0eXBlJyk7XHJcbiAgICB9XHJcblxyXG4gICAgdGV4dCgpOiBQcm9taXNlPHN0cmluZz4ge1xyXG4gICAgICAgIGlmICh0aGlzLl9ib2R5VXNlZCkge1xyXG4gICAgICAgICAgICByZXR1cm4gUHJvbWlzZS5yZWplY3QobmV3IFR5cGVFcnJvcignQm9keSBjb250ZW50cyBhbHJlYWR5IHJlYWQnKSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHRoaXMuX2JvZHlVc2VkID0gdHJ1ZTtcclxuXHJcbiAgICAgICAgY29uc3QgYm9keSA9IHRoaXMuYm9keTtcclxuICAgICAgICBpZiAodHlwZW9mIGJvZHkgPT09ICdzdHJpbmcnKSB7XHJcbiAgICAgICAgICAgIHJldHVybiBQcm9taXNlLnJlc29sdmUoYm9keSk7XHJcbiAgICAgICAgfSBlbHNlIGlmIChib2R5IGluc3RhbmNlb2YgQXJyYXlCdWZmZXIpIHtcclxuICAgICAgICAgICAgcmV0dXJuIFByb21pc2UucmVzb2x2ZSh0ZXh0RGVjb2Rlci5kZWNvZGUoYm9keSkpO1xyXG4gICAgICAgIH0gZWxzZSBpZiAoYm9keSBpbnN0YW5jZW9mIEJsb2IpIHtcclxuICAgICAgICAgICAgcmV0dXJuIFByb21pc2UucmVzb2x2ZShyZWFkQmxvYkFzVGV4dChib2R5KSk7XHJcbiAgICAgICAgfSBlbHNlIGlmIChib2R5IGluc3RhbmNlb2YgRm9ybURhdGEpIHtcclxuICAgICAgICAgICAgcmV0dXJuIFByb21pc2UucmVqZWN0KG5ldyBUeXBlRXJyb3IoJ0EgbXVsdGlwYXJ0IEZvcm1EYXRhIGJvZHkgY2Fubm90IGJlIHJlYWQgYXMgdGV4dCcpKTtcclxuICAgICAgICB9IGVsc2UgaWYgKGJvZHkgPT09IHVuZGVmaW5lZCkge1xyXG4gICAgICAgICAgICByZXR1cm4gUHJvbWlzZS5yZWplY3QobmV3IEVycm9yKCdObyBib2R5IGlzIHByZXNlbnQnKSk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICB0aHJvdyBuZXcgVHlwZUVycm9yKCdJbnZhbGlkIGJvZHkgdHlwZScpO1xyXG4gICAgfVxyXG5cclxuICAgIGZvcm1EYXRhKCk6IFByb21pc2U8Rm9ybURhdGE+IHtcclxuICAgICAgICBpZiAodGhpcy5fYm9keVVzZWQpIHtcclxuICAgICAgICAgICAgcmV0dXJuIFByb21pc2UucmVqZWN0KG5ldyBUeXBlRXJyb3IoJ0JvZHkgY29udGVudHMgYWxyZWFkeSByZWFkJykpO1xyXG4gICAgICAgIH1cclxuICAgICAgICB0aGlzLl9ib2R5VXNlZCA9IHRydWU7XHJcblxyXG4gICAgICAgIGNvbnN0IGJvZHkgPSB0aGlzLmJvZHk7XHJcbiAgICAgICAgaWYgKHR5cGVvZiBib2R5ID09PSAnc3RyaW5nJykge1xyXG4gICAgICAgICAgICByZXR1cm4gUHJvbWlzZS5yZWplY3QobmV3IFR5cGVFcnJvcignVW5zdXBwb3J0ZWQ6IENhbm5vdCBwYXJzZSBGb3JtRGF0YSBmcm9tIGEgc3RyaW5nIGJvZHknKSk7XHJcbiAgICAgICAgfSBlbHNlIGlmIChib2R5IGluc3RhbmNlb2YgQXJyYXlCdWZmZXIpIHtcclxuICAgICAgICAgICAgcmV0dXJuIFByb21pc2UucmVqZWN0KG5ldyBUeXBlRXJyb3IoJ1Vuc3VwcG9ydGVkOiBDYW5ub3QgcGFyc2UgRm9ybURhdGEgZnJvbSBhbiBBcnJheUJ1ZmZlciBib2R5JykpO1xyXG4gICAgICAgIH0gZWxzZSBpZiAoYm9keSBpbnN0YW5jZW9mIEJsb2IpIHtcclxuICAgICAgICAgICAgcmV0dXJuIFByb21pc2UucmVqZWN0KG5ldyBUeXBlRXJyb3IoJ1Vuc3VwcG9ydGVkOiBDYW5ub3QgcGFyc2UgRm9ybURhdGEgZnJvbSBhIEJsb2IgYm9keScpKTtcclxuICAgICAgICB9IGVsc2UgaWYgKGJvZHkgaW5zdGFuY2VvZiBGb3JtRGF0YSkge1xyXG4gICAgICAgICAgICByZXR1cm4gUHJvbWlzZS5yZXNvbHZlKGJvZHkpO1xyXG4gICAgICAgIH0gZWxzZSBpZiAoYm9keSA9PT0gdW5kZWZpbmVkKSB7XHJcbiAgICAgICAgICAgIHJldHVybiBQcm9taXNlLnJlamVjdChuZXcgRXJyb3IoJ05vIGJvZHkgaXMgcHJlc2VudCcpKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHRocm93IG5ldyBUeXBlRXJyb3IoJ0ludmFsaWQgYm9keSB0eXBlJyk7XHJcbiAgICB9XHJcblxyXG4gICAganNvbigpIHtcclxuICAgICAgICByZXR1cm4gdGhpcy50ZXh0KCkudGhlbihKU09OLnBhcnNlKTtcclxuICAgIH1cclxufVxyXG5cclxuLy8gSFRUUCBtZXRob2RzIHdob3NlIGNhcGl0YWxpemF0aW9uIHNob3VsZCBiZSBub3JtYWxpemVkXHJcbmNvbnN0IG1ldGhvZHMgPSBuZXcgU2V0KFsnR0VUJywgJ0hFQUQnLCAnUE9TVCddKTtcclxuXHJcbmZ1bmN0aW9uIG5vcm1hbGl6ZU1ldGhvZChtZXRob2Q6IHN0cmluZyk6IHN0cmluZyB7XHJcbiAgICBtZXRob2QgPSBtZXRob2QudG9VcHBlckNhc2UoKTtcclxuICAgIGlmICghbWV0aG9kcy5oYXMobWV0aG9kKSkge1xyXG4gICAgICAgIHRocm93IG5ldyBFcnJvcignVW5zdXBwb3J0ZWQgSFRUUCBtZXRob2QgZm9yIEdNX3htbGh0dHBSZXF1ZXN0OiAnICsgbWV0aG9kKTtcclxuICAgIH1cclxuICAgIHJldHVybiBtZXRob2Q7XHJcbn1cclxuXHJcbmludGVyZmFjZSBSZXF1ZXN0T3B0aW9ucyB7XHJcbiAgICByZWFkb25seSBjcmVkZW50aWFscz86IHN0cmluZztcclxuICAgIHJlYWRvbmx5IGhlYWRlcnM/OiBIZWFkZXJzIHwgUmVjb3JkPHN0cmluZywga25vd24+O1xyXG4gICAgcmVhZG9ubHkgbWV0aG9kPzogc3RyaW5nO1xyXG4gICAgcmVhZG9ubHkgbW9kZT86IHN0cmluZztcclxuICAgIHJlYWRvbmx5IGJvZHk/OiBzdHJpbmcgfCBCbG9iIHwgRm9ybURhdGE7XHJcbn1cclxuXHJcbmV4cG9ydCBjbGFzcyBSZXF1ZXN0IGV4dGVuZHMgQm9keSB7XHJcbiAgICByZWFkb25seSB1cmw6IHN0cmluZztcclxuICAgIHJlYWRvbmx5IGNyZWRlbnRpYWxzOiBzdHJpbmc7XHJcbiAgICByZWFkb25seSBoZWFkZXJzOiBIZWFkZXJzO1xyXG4gICAgcmVhZG9ubHkgbWV0aG9kOiBzdHJpbmc7XHJcbiAgICByZWFkb25seSBtb2RlOiBzdHJpbmcgfCBudWxsO1xyXG4gICAgcmVhZG9ubHkgcmVmZXJyZXI6IG51bGw7XHJcbiAgICBwcml2YXRlIHJlYWRvbmx5IGJvZHlTdG9yZT86IHN0cmluZyB8IEJsb2IgfCBGb3JtRGF0YTtcclxuXHJcbiAgICBjb25zdHJ1Y3Rvcih1cmw6IHN0cmluZywgb3B0aW9ucz86IFJlcXVlc3RPcHRpb25zKSB7XHJcbiAgICAgICAgc3VwZXIoKTtcclxuXHJcbiAgICAgICAgb3B0aW9ucyA9IG9wdGlvbnMgfHwge307XHJcbiAgICAgICAgdGhpcy51cmwgPSB1cmw7XHJcblxyXG4gICAgICAgIHRoaXMuY3JlZGVudGlhbHMgPSBvcHRpb25zLmNyZWRlbnRpYWxzIHx8ICdvbWl0JztcclxuICAgICAgICB0aGlzLmhlYWRlcnMgPSBuZXcgSGVhZGVycyhvcHRpb25zLmhlYWRlcnMpO1xyXG4gICAgICAgIHRoaXMubWV0aG9kID0gbm9ybWFsaXplTWV0aG9kKG9wdGlvbnMubWV0aG9kIHx8ICdHRVQnKTtcclxuICAgICAgICB0aGlzLm1vZGUgPSBvcHRpb25zLm1vZGUgfHwgbnVsbDtcclxuICAgICAgICB0aGlzLnJlZmVycmVyID0gbnVsbDtcclxuXHJcbiAgICAgICAgaWYgKCh0aGlzLm1ldGhvZCA9PT0gJ0dFVCcgfHwgdGhpcy5tZXRob2QgPT09ICdIRUFEJykgJiYgb3B0aW9ucy5ib2R5KSB7XHJcbiAgICAgICAgICAgIHRocm93IG5ldyBUeXBlRXJyb3IoJ0JvZHkgbm90IGFsbG93ZWQgZm9yIEdFVCBvciBIRUFEIHJlcXVlc3RzJyk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICB0aGlzLmJvZHlTdG9yZSA9IG9wdGlvbnMuYm9keTtcclxuICAgIH1cclxuXHJcbiAgICBwcm90ZWN0ZWQgZ2V0IGJvZHkoKTogc3RyaW5nIHwgQXJyYXlCdWZmZXIgfCBCbG9iIHwgRm9ybURhdGEgfCB1bmRlZmluZWQge1xyXG4gICAgICAgIHJldHVybiB0aGlzLmJvZHlTdG9yZTtcclxuICAgIH1cclxuXHJcbiAgICBnZXQgYm9keVJhdygpOiBzdHJpbmcgfCBCbG9iIHwgRm9ybURhdGEgfCB1bmRlZmluZWQge1xyXG4gICAgICAgIHJldHVybiB0aGlzLmJvZHlTdG9yZTtcclxuICAgIH1cclxufVxyXG5cclxuZnVuY3Rpb24gaGVhZGVycyhyZXNwb25zZUhlYWRlcnM6IHN0cmluZyk6IEhlYWRlcnMge1xyXG4gICAgY29uc3QgaGVhZCA9IG5ldyBIZWFkZXJzKCk7XHJcbiAgICBjb25zdCBwYWlycyA9IHJlc3BvbnNlSGVhZGVycy50cmltKCkuc3BsaXQoJ1xcbicpO1xyXG4gICAgcGFpcnMuZm9yRWFjaChoZWFkZXIgPT4ge1xyXG4gICAgICAgIGNvbnN0IHNwbGl0ID0gaGVhZGVyLnRyaW0oKS5zcGxpdCgnOicpO1xyXG4gICAgICAgIGNvbnN0IGtleSA9IHNwbGl0LnNoaWZ0KCkhLnRyaW0oKTtcclxuICAgICAgICBjb25zdCB2YWx1ZSA9IHNwbGl0LmpvaW4oJzonKS50cmltKCk7XHJcbiAgICAgICAgaGVhZC5hcHBlbmQoa2V5LCB2YWx1ZSk7XHJcbiAgICB9KTtcclxuICAgIHJldHVybiBoZWFkO1xyXG59XHJcblxyXG5leHBvcnQgY2xhc3MgUmVzcG9uc2UgZXh0ZW5kcyBCb2R5IHtcclxuICAgIHJlYWRvbmx5IHR5cGU6IHN0cmluZztcclxuICAgIHJlYWRvbmx5IHVybDogc3RyaW5nO1xyXG4gICAgcmVhZG9ubHkgc3RhdHVzOiBudW1iZXI7XHJcbiAgICByZWFkb25seSBvazogYm9vbGVhbjtcclxuICAgIHJlYWRvbmx5IHN0YXR1c1RleHQ6IHN0cmluZztcclxuICAgIHJlYWRvbmx5IGhlYWRlcnM6IEhlYWRlcnM7XHJcblxyXG4gICAgY29uc3RydWN0b3IocHJpdmF0ZSByZWFkb25seSByZXNwb25zZTogR01fVHlwZXMuWEhSUmVzcG9uc2U8dW5rbm93bj4pIHtcclxuICAgICAgICBzdXBlcigpO1xyXG5cclxuICAgICAgICB0aGlzLnR5cGUgPSAnZGVmYXVsdCc7XHJcbiAgICAgICAgdGhpcy5zdGF0dXMgPSByZXNwb25zZS5zdGF0dXM7XHJcbiAgICAgICAgdGhpcy5vayA9IHRoaXMuc3RhdHVzID49IDIwMCAmJiB0aGlzLnN0YXR1cyA8IDMwMDtcclxuICAgICAgICB0aGlzLnN0YXR1c1RleHQgPSByZXNwb25zZS5zdGF0dXNUZXh0O1xyXG4gICAgICAgIHRoaXMuaGVhZGVycyA9IGhlYWRlcnMocmVzcG9uc2UucmVzcG9uc2VIZWFkZXJzKTtcclxuICAgICAgICB0aGlzLnVybCA9IHJlc3BvbnNlVVJMKHJlc3BvbnNlLmZpbmFsVXJsLCByZXNwb25zZS5yZXNwb25zZUhlYWRlcnMsIHRoaXMuaGVhZGVycykgfHwgJyc7XHJcbiAgICB9XHJcblxyXG4gICAgcHJvdGVjdGVkIGdldCBib2R5KCk6IHN0cmluZyB8IEFycmF5QnVmZmVyIHwgQmxvYiB8IEZvcm1EYXRhIHwgdW5kZWZpbmVkIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5yZXNwb25zZS5yZXNwb25zZSBhcyBBcnJheUJ1ZmZlcjtcclxuICAgIH1cclxuXHJcbiAgICB0ZXh0KCk6IFByb21pc2U8c3RyaW5nPiB7XHJcbiAgICAgICAgaWYgKHRoaXMuX2JvZHlVc2VkKSB7XHJcbiAgICAgICAgICAgIHJldHVybiBQcm9taXNlLnJlamVjdChuZXcgVHlwZUVycm9yKCdCb2R5IGNvbnRlbnRzIGFscmVhZHkgcmVhZCcpKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgdGhpcy5fYm9keVVzZWQgPSB0cnVlO1xyXG5cclxuICAgICAgICByZXR1cm4gUHJvbWlzZS5yZXNvbHZlKHRoaXMucmVzcG9uc2UucmVzcG9uc2VUZXh0KTtcclxuICAgIH1cclxufVxyXG5cclxuZnVuY3Rpb24gcmVzcG9uc2VVUkwoZmluYWxVcmw6IHN0cmluZywgcmF3UmVzcEhlYWRlcnM6IHN0cmluZywgcmVzcEhlYWRlcnM6IEhlYWRlcnMpOiBzdHJpbmcgfCBudWxsIHtcclxuICAgIGlmIChmaW5hbFVybCkge1xyXG4gICAgICAgIHJldHVybiBmaW5hbFVybDtcclxuICAgIH1cclxuXHJcbiAgICAvLyBBdm9pZCBzZWN1cml0eSB3YXJuaW5ncyBvbiBnZXRSZXNwb25zZUhlYWRlciB3aGVuIG5vdCBhbGxvd2VkIGJ5IENPUlNcclxuICAgIGlmICgvXlgtUmVxdWVzdC1VUkw6L20udGVzdChyYXdSZXNwSGVhZGVycykpIHtcclxuICAgICAgICByZXR1cm4gcmVzcEhlYWRlcnMuZ2V0KCdYLVJlcXVlc3QtVVJMJyk7XHJcbiAgICB9XHJcblxyXG4gICAgcmV0dXJuIG51bGw7XHJcbn1cclxuXHJcbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIEdNX2ZldGNoKGlucHV0OiBzdHJpbmcgfCBSZXF1ZXN0LCBpbml0PzogUmVxdWVzdE9wdGlvbnMpOiBQcm9taXNlPFJlc3BvbnNlPiB7XHJcbiAgICBsZXQgcmVxdWVzdDogUmVxdWVzdDtcclxuICAgIGlmIChpbnB1dCBpbnN0YW5jZW9mIFJlcXVlc3QpIHtcclxuICAgICAgICBpZiAoaW5pdCkge1xyXG4gICAgICAgICAgICByZXF1ZXN0ID0gbmV3IFJlcXVlc3QoaW5wdXQudXJsLCBpbml0KTtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICByZXF1ZXN0ID0gaW5wdXQ7XHJcbiAgICAgICAgfVxyXG4gICAgfSBlbHNlIHtcclxuICAgICAgICByZXF1ZXN0ID0gbmV3IFJlcXVlc3QoaW5wdXQsIGluaXQpO1xyXG4gICAgfVxyXG5cclxuICAgIGlmICghWydHRVQnLCAnSEVBRCcsICdQT1NUJ10uaW5jbHVkZXMocmVxdWVzdC5tZXRob2QpKSB7XHJcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdVbnN1cHBvcnRlZCBtZXRob2QgZm9yIEdNX3htbGh0dHBSZXF1ZXN0Jyk7XHJcbiAgICB9XHJcblxyXG4gICAgcmV0dXJuIG5ldyBQcm9taXNlKGZ1bmN0aW9uIChyZXNvbHZlLCByZWplY3QpIHtcclxuICAgICAgICBjb25zdCB4aHJEZXRhaWxzOiBHTV9UeXBlcy5YSFJEZXRhaWxzPHVua25vd24+ID0ge307XHJcblxyXG4gICAgICAgIHhockRldGFpbHMubWV0aG9kID0gcmVxdWVzdC5tZXRob2QgYXMgJ0dFVCcgfCAnSEVBRCcgfCAnUE9TVCc7XHJcbiAgICAgICAgeGhyRGV0YWlscy5yZXNwb25zZVR5cGUgPSAnYXJyYXlidWZmZXInOyAvLyBUT0RPIGRvZXMgdGhpcyBhZmZlY3QgcHJlc2VuY2Ugb2YgcmVzcG9uc2VUZXh0P1xyXG4gICAgICAgIHhockRldGFpbHMudXJsID0gcmVxdWVzdC51cmw7XHJcblxyXG4gICAgICAgIC8vIE5vdCBzdXBwb3J0ZWQgYW55bW9yZVxyXG4gICAgICAgIC8veGhyX2RldGFpbHMuc3luY2hyb25vdXMgPSBmYWxzZTtcclxuXHJcbiAgICAgICAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIHVuaWNvcm4vcHJlZmVyLWFkZC1ldmVudC1saXN0ZW5lclxyXG4gICAgICAgIHhockRldGFpbHMub25sb2FkID0gcmVzcCA9PiB7XHJcbiAgICAgICAgICAgIGNvbnN0IHN0YXR1cyA9IHJlc3Auc3RhdHVzO1xyXG4gICAgICAgICAgICBpZiAoc3RhdHVzIDwgMTAwIHx8IHN0YXR1cyA+IDU5OSkge1xyXG4gICAgICAgICAgICAgICAgcmVqZWN0KG5ldyBUeXBlRXJyb3IoJ05ldHdvcmsgcmVxdWVzdCBmYWlsZWQ6IFN0YXR1cyBjb2RlICcgKyBzdGF0dXMpKTtcclxuICAgICAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgcmVzb2x2ZShuZXcgUmVzcG9uc2UocmVzcCkpO1xyXG4gICAgICAgIH07XHJcblxyXG4gICAgICAgIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSB1bmljb3JuL3ByZWZlci1hZGQtZXZlbnQtbGlzdGVuZXJcclxuICAgICAgICB4aHJEZXRhaWxzLm9uZXJyb3IgPSAoKSA9PiB7XHJcbiAgICAgICAgICAgIHJlamVjdChuZXcgVHlwZUVycm9yKCdOZXR3b3JrIHJlcXVlc3QgZmFpbGVkJykpO1xyXG4gICAgICAgIH07XHJcblxyXG4gICAgICAgIHhockRldGFpbHMuaGVhZGVycyA9IHt9O1xyXG4gICAgICAgIGZvciAoY29uc3QgW25hbWUsIHZhbHVlXSBvZiByZXF1ZXN0LmhlYWRlcnMpIHtcclxuICAgICAgICAgICAgeGhyRGV0YWlscy5oZWFkZXJzW25hbWVdID0gdmFsdWU7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBpZiAodHlwZW9mIHJlcXVlc3QuYm9keVJhdyAhPT0gJ3VuZGVmaW5lZCcpIHtcclxuICAgICAgICAgICAgeGhyRGV0YWlscy5kYXRhID0gcmVxdWVzdC5ib2R5UmF3OyAvLyBodHRwczovL2dpdGh1Yi5jb20vZ3JlYXNlbW9ua2V5L2dyZWFzZW1vbmtleS9pc3N1ZXMvMTU4NSBpdCBqdXN0IFdPUktTPz9cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIEdNX3htbGh0dHBSZXF1ZXN0KHhockRldGFpbHMpO1xyXG5cclxuICAgICAgICAvKlxyXG4gICAgICAgIC8vIG5lZWQgdG8gc2VlIGlmIHRoZXJlJ3MgYW55IHdheSBvZiBkb2luZyB0aGlzXHJcbiAgICAgICAgaWYgKHJlcXVlc3QuY3JlZGVudGlhbHMgPT09ICdpbmNsdWRlJykge1xyXG4gICAgICAgICAgeGhyLndpdGhDcmVkZW50aWFscyA9IHRydWVcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIEdNX3htbGh0dHBSZXF1ZXN0IGhhcyBhIHJlc3BvbnNlVHlwZSBwYXJhbSwgYnV0IHRoaXMgZGlkbid0IHNlZW0gdG8gd29yaywgYXQgbGVhc3QgaW4gVGFtcGVyTW9ua2V5XHJcbiAgICAgICAgaWYgKCdyZXNwb25zZVR5cGUnIGluIHhociAmJiBzdXBwb3J0LmJsb2IpIHtcclxuICAgICAgICAgIHhoci5yZXNwb25zZVR5cGUgPSAnYmxvYidcclxuICAgICAgICB9XHJcbiAgICAgICAgKi9cclxuICAgIH0pO1xyXG59IiwgImltcG9ydCBHTV9mZXRjaCBmcm9tIFwiLi9HTV9mZXRjaFwiO1xuXG5jb25zb2xlLmxvZygnaGVsbG8gd29ybGQhJyk7XG5cbmNvbnN0IHByb2Nlc3NlZEVsZW1lbnRzID0gbmV3IFdlYWtTZXQoKTtcblxuR01fcmVnaXN0ZXJNZW51Q29tbWFuZCgnU2V0IHdlYmhvb2snLCAoKSA9PiB7XG4gICAgY29uc3QgcmVzdWx0ID0gcHJvbXB0KCdQYXN0ZSB3ZWJob29rIFVSTCBoZXJlJyk7XG4gICAgaWYgKHJlc3VsdCAhPSBudWxsKSB7XG4gICAgICAgIEdNX3NldFZhbHVlKCd3ZWJob29rVXJsJywgcmVzdWx0KTtcbiAgICAgICAgYWxlcnQoJ1VSTCBzZXQhJyk7XG4gICAgfVxufSk7XG5cbnNldEludGVydmFsKCgpID0+IHtcbiAgICBjb25zdCBuZXdFbGVtZW50cyA9IFsuLi5kb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCdbZGF0YS10ZXN0aWRePVwiZmVlZEl0ZW0tXCJdLCBbZGF0YS10ZXN0aWRePVwicG9zdFRocmVhZEl0ZW0tXCJdJyldLm1hcChlID0+IHtcbiAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgIGVsZW1lbnQ6IGUsXG4gICAgICAgICAgICBidXR0b25zOiBlLnF1ZXJ5U2VsZWN0b3IoJ1thcmlhLWxhYmVsPVwiT3BlbiBwb3N0IG9wdGlvbnMgbWVudVwiXScpPy5wYXJlbnRFbGVtZW50IS5wYXJlbnRFbGVtZW50IS5wYXJlbnRFbGVtZW50LFxuICAgICAgICAgICAgcG9zdExpbms6IChlLnF1ZXJ5U2VsZWN0b3IoJ1tocmVmXj1cIi9wcm9maWxlL1wiXVtocmVmKj1cIi9wb3N0L1wiXScpIGFzIEhUTUxBbmNob3JFbGVtZW50KT8uaHJlZixcbiAgICAgICAgfTtcbiAgICB9KTtcbiAgICBcbiAgICBmb3IgKGNvbnN0IHsgZWxlbWVudCwgYnV0dG9ucywgcG9zdExpbmsgfSBvZiBuZXdFbGVtZW50cykge1xuICAgICAgICBpZiAocHJvY2Vzc2VkRWxlbWVudHMuaGFzKGVsZW1lbnQpKSB7XG4gICAgICAgICAgICBjb250aW51ZTtcbiAgICAgICAgfVxuICAgIFxuICAgICAgICBwcm9jZXNzZWRFbGVtZW50cy5hZGQoZWxlbWVudCk7XG4gICAgXG4gICAgICAgIGNvbnN0IGJ1dHRvbiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2J1dHRvbicpO1xuICAgICAgICBidXR0b24udGV4dENvbnRlbnQgPSAnXHVEODNEXHVEQ0NDJztcbiAgICAgICAgYnV0dG9uLm9uY2xpY2sgPSBlID0+IHtcbiAgICAgICAgICAgIGUuc3RvcFByb3BhZ2F0aW9uKCk7XG4gICAgICAgICAgICBlLnByZXZlbnREZWZhdWx0KCk7XG5cbiAgICAgICAgICAgIGNvbnNvbGUubG9nKGBib29rbWFya2luZyAke3Bvc3RMaW5rID8/IGRvY3VtZW50LmxvY2F0aW9uLmhyZWZ9YCk7XG4gICAgICAgICAgICBpZiAoIUdNX2dldFZhbHVlKCd3ZWJob29rVXJsJykpIHtcbiAgICAgICAgICAgICAgICBhbGVydCgnTm8gd2ViaG9vayBVUkwgc2V0IScpO1xuICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgLy8gYm9va21hcmsgcG9zdFxuICAgICAgICAgICAgLy8gYWdlbnQucHV0KHtcbiAgICAgICAgICAgIC8vICAgICBjb2xsZWN0aW9uOiAnaW52YWxpZC51d3guZW5jcnlwdGVkLmJvb2ttYXJrJyxcbiAgICAgICAgICAgIC8vIH0pXG4gICAgICAgICAgICBHTV9mZXRjaChcbiAgICAgICAgICAgICAgICBHTV9nZXRWYWx1ZSgnd2ViaG9va1VybCcpLFxuICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgbWV0aG9kOiAnUE9TVCcsXG4gICAgICAgICAgICAgICAgICAgIGJvZHk6IEpTT04uc3RyaW5naWZ5KHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnRlbnQ6IGZpeExpbmsocG9zdExpbmsgPz8gZG9jdW1lbnQubG9jYXRpb24uaHJlZilcbiAgICAgICAgICAgICAgICAgICAgfSksXG4gICAgICAgICAgICAgICAgICAgIGhlYWRlcnM6IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICdDb250ZW50LVR5cGUnOiAnYXBwbGljYXRpb24vanNvbicsXG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICApO1xuICAgICAgICB9O1xuICAgIFxuICAgICAgICBpZiAoIWJ1dHRvbnMpIGNvbnRpbnVlO1xuICAgIFxuICAgICAgICBidXR0b25zLmFwcGVuZChidXR0b24pO1xuICAgIH1cbn0sIDI1MCk7XG5cbmZ1bmN0aW9uIGZpeExpbmsobGluazogc3RyaW5nKSB7XG4gICAgY29uc3QgdXJsID0gbmV3IFVSTChsaW5rKTtcbiAgICB1cmwuaG9zdG5hbWUgPSAnYnNreXguYXBwJztcbiAgICByZXR1cm4gdXJsLnRvU3RyaW5nKCk7XG59XG4iXSwKICAibWFwcGluZ3MiOiAiOzs7Ozs7Ozs7Ozs7Ozs7QUE2QkEsV0FBUyxjQUFjLE1BQXFCO0FBQ3hDLFFBQUksT0FBTyxTQUFTLFVBQVU7QUFDMUIsYUFBTyxPQUFPLElBQUk7QUFBQSxJQUN0QjtBQUNBLFFBQUksc0JBQXNCLEtBQUssSUFBSSxHQUFHO0FBQ2xDLFlBQU0sSUFBSSxVQUFVLHdDQUF3QztBQUFBLElBQ2hFO0FBQ0EsV0FBTztBQUFBLEVBQ1g7QUFFQSxXQUFTLGVBQWUsT0FBc0I7QUFDMUMsUUFBSSxPQUFPLFVBQVUsVUFBVTtBQUMzQixjQUFRLE9BQU8sS0FBSztBQUFBLElBQ3hCO0FBQ0EsV0FBTztBQUFBLEVBQ1g7QUFFTyxNQUFNLFVBQU4sTUFBTSxTQUFRO0FBQUEsSUFDVCxNQUFnQyxDQUFDO0FBQUEsSUFFekMsWUFBWUEsVUFBMkM7QUFDbkQsV0FBSyxNQUFNLENBQUM7QUFFWixVQUFJQSxvQkFBbUIsVUFBUztBQUM1QixRQUFBQSxTQUFRLFFBQVEsQ0FBQyxPQUFPLFNBQVM7QUFDN0IsZUFBSyxPQUFPLE1BQU0sS0FBSztBQUFBLFFBQzNCLENBQUM7QUFBQSxNQUNMLFdBQVdBLFVBQVM7QUFDaEIsZUFBTyxvQkFBb0JBLFFBQU8sRUFB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QztBQUFBLEVBQ0w7OztBQ2hhQSxVQUFRLElBQUksY0FBYztBQUUxQixNQUFNLG9CQUFvQixvQkFBSSxRQUFRO0FBRXRDLHlCQUF1QixlQUFlLE1BQU07QUFDeEMsVUFBTSxTQUFTLE9BQU8sd0JBQXdCO0FBQzlDLFFBQUksVUFBVSxNQUFNO0FBQ2hCLGtCQUFZLGNBQWMsTUFBTTtBQUNoQyxZQUFNLFVBQVU7QUFBQSxJQUNwQjtBQUFBLEVBQ0osQ0FBQztBQUVELGNBQVksTUFBTTtBQUNkLFVBQU0sY0FBYyxDQUFDLEdBQUcsU0FBUyxpQkFBaUIsOERBQThELENBQUMsRUFBRSxJQUFJLE9BQUs7QUFDeEgsYUFBTztBQUFBLFFBQ0gsU0FBUztBQUFBLFFBQ1QsU0FBUyxFQUFFLGNBQWMsdUNBQXVDLEdBQUcsY0FBZSxjQUFlO0FBQUEsUUFDakcsVUFBVyxFQUFFLGNBQWMscUNBQXFDLEdBQXlCO0FBQUEsTUFDN0Y7QUFBQSxJQUNKLENBQUM7QUFFRCxlQUFXLEVBQUUsU0FBUyxTQUFTLFNBQVMsS0FBSyxhQUFhO0FBQ3RELFVBQUksa0JBQWtCLElBQUksT0FBTyxHQUFHO0FBQ2hDO0FBQUEsTUFDSjtBQUVBLHdCQUFrQixJQUFJLE9BQU87QUFFN0IsWUFBTSxTQUFTLFNBQVMsY0FBYyxRQUFRO0FBQzlDLGFBQU8sY0FBYztBQUNyQixhQUFPLFVBQVUsT0FBSztBQUNsQixVQUFFLGdCQUFnQjtBQUNsQixVQUFFLGVBQWU7QUFFakIsZ0JBQVEsSUFBSSxlQUFlLFlBQVksU0FBUyxTQUFTLElBQUksRUFBRTtBQUMvRCxZQUFJLENBQUMsWUFBWSxZQUFZLEdBQUc7QUFDNUIsZ0JBQU0scUJBQXFCO0FBQzNCO0FBQUEsUUFDSjtBQU1BO0FBQUEsVUFDSSxZQUFZLFlBQVk7QUFBQSxVQUN4QjtBQUFBLFlBQ0ksUUFBUTtBQUFBLFlBQ1IsTUFBTSxLQUFLLFVBQVU7QUFBQSxjQUNqQixTQUFTLFFBQVEsWUFBWSxTQUFTLFNBQVMsSUFBSTtBQUFBLFlBQ3ZELENBQUM7QUFBQSxZQUNELFNBQVM7QUFBQSxjQUNMLGdCQUFnQjtBQUFBLFlBQ3BCO0FBQUEsVUFDSjtBQUFBLFFBQ0o7QUFBQSxNQUNKO0FBRUEsVUFBSSxDQUFDLFFBQVM7QUFFZCxjQUFRLE9BQU8sTUFBTTtBQUFBLElBQ3pCO0FBQUEsRUFDSixHQUFHLEdBQUc7QUFFTixXQUFTLFFBQVEsTUFBYztBQUMzQixVQUFNLE1BQU0sSUFBSSxJQUFJLElBQUk7QUFDeEIsUUFBSSxXQUFXO0FBQ2YsV0FBTyxJQUFJLFNBQVM7QUFBQSxFQUN4QjsiLAogICJuYW1lcyI6IFsiaGVhZGVycyJdCn0K
