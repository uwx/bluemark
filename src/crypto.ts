// https://blog.elantha.com/encrypt-in-the-browser/

export async function deriveKey(password: string, salt: Uint8Array): Promise<CryptoKey> {
    const key = await getKey(password, salt);

    return key;
}

export async function encryptData(content: string, key: CryptoKey): Promise<{ iv: string; cipher: string; }> {
    const iv = crypto.getRandomValues(new Uint8Array(12));

    const contentBytes = stringToBytes(content);

    const cipher = new Uint8Array(
        await crypto.subtle.encrypt({ name: "AES-GCM", iv }, key, contentBytes)
    );

    return {
        iv: bytesToBase64(iv),
        cipher: bytesToBase64(cipher),
    };
}

export async function decryptData(encryptedData: { iv: string, cipher: string }, key: CryptoKey) {
    const iv = base64ToBytes(encryptedData.iv);

    const cipher = base64ToBytes(encryptedData.cipher);

    const contentBytes = new Uint8Array(
        await crypto.subtle.decrypt({ name: "AES-GCM", iv }, key, cipher)
    );

    return bytesToString(contentBytes);
}

async function getKey(password: string, salt: Uint8Array) {
    const passwordBytes = stringToBytes(password);

    const initialKey = await crypto.subtle.importKey(
        "raw",
        passwordBytes,
        { name: "PBKDF2" },
        false,
        ["deriveKey"]
    );

    return await crypto.subtle.deriveKey(
        { name: "PBKDF2", salt, iterations: 200000, hash: "SHA-512" },
        initialKey,
        { name: "AES-GCM", length: 256 },
        false,
        ["encrypt", "decrypt"]
    );
}

// conversion helpers

function bytesToString(bytes: Uint8Array) {
    return new TextDecoder().decode(bytes);
}

function stringToBytes(str: string) {
    return new TextEncoder().encode(str);
}

import { toString as ui8ToString, fromString as ui8FromString } from "uint8arrays";

export function bytesToBase64(arr: Uint8Array) {
    return ui8ToString(arr, 'base64');
}

export function base64ToBytes(base64: string) {
    return ui8FromString(base64, 'base64');
}