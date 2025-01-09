import { Encrypter, Decrypter } from 'age-encryption';

export async function encryptData(data: Uint8Array, passphrase: string) {
    const e = new Encrypter();
    e.setPassphrase(passphrase);
    return await e.encrypt(data);
}

export async function decryptData(ciphertext: Uint8Array, passphrase: string) {
    const e = new Decrypter();
    e.addPassphrase(passphrase);
    const plaintext = await e.decrypt(ciphertext);
    
    return plaintext;
}
