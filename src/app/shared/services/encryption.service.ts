import { Injectable } from '@angular/core';
import * as CryptoJS from 'crypto-js';
import { environment } from '../../../environments/environment';

@Injectable({
    providedIn: 'root'
})
export class EncryptionService {

    private key: string = 'Ei43I2S8TtmptPo5W7k7pYAQwtgpkgGK0Y86b3+gEnQ=';

    constructor() { }

    private getKey(): CryptoJS.lib.WordArray {
        return CryptoJS.enc.Base64.parse(this.key);
    }

    encrypt(text: any, force: boolean = false): any {
        if (!text) return text

        if (!environment.useEncryption && !force)
            return text.toString();

        const key = this.getKey();

        // Generate random IV (16 bytes)
        const iv = CryptoJS.lib.WordArray.random(16);

        // Encrypt using AES with CBC mode and PKCS7 padding
        const encrypted = CryptoJS.AES.encrypt(CryptoJS.enc.Utf8.parse(text.toString()), key, {
            iv: iv,
            mode: CryptoJS.mode.CBC,
            padding: CryptoJS.pad.Pkcs7,
        });

        // Combine IV and ciphertext (IV + ciphertext)
        const combined = iv.concat(encrypted.ciphertext);

        // Encode as Base64
        return CryptoJS.enc.Base64.stringify(combined);
    }

    decrypt(encryptedText: any, force: boolean = false): any {
        if (!encryptedText) return encryptedText

        if (!environment.useEncryption && !force)
            return encryptedText;

        const key = this.getKey();

        // Decode Base64
        const combined = CryptoJS.enc.Base64.parse(encryptedText);

        // Extract IV (first 16 bytes)
        const iv = CryptoJS.lib.WordArray.create(combined.words.slice(0, 4), 16);

        // Extract ciphertext (remaining bytes)
        const ciphertext = CryptoJS.lib.WordArray.create(combined.words.slice(4), combined.sigBytes - 16);

        // Fix: Wrap ciphertext in a CipherParams object
        const cipherParams = CryptoJS.lib.CipherParams.create({ ciphertext });

        // Decrypt using AES
        const decrypted = CryptoJS.AES.decrypt(cipherParams, key, {
            iv: iv,
            mode: CryptoJS.mode.CBC,
            padding: CryptoJS.pad.Pkcs7,
        });

        return CryptoJS.enc.Utf8.stringify(decrypted);
    }

    //set(value: any, force: boolean = false) {
    //    if (!value) return value

    //    if (environment.useEncryption || force)
    //        return this.setEncrypted(value)
    //    else
    //        return value
    //}

    //get(value: any, force: boolean = false) {
    //    if (!value) return value

    //    if (environment.useEncryption || force)
    //        return this.getEncrypted(value)
    //    else
    //        return value
    //}

    //setEncrypted(value: any) {
    //    var keys = "123456$#@$^@1ERF";
    //    var key = CryptoJS.enc.Utf8.parse(keys);
    //    var iv = CryptoJS.enc.Utf8.parse(keys);
    //    var encrypted = CryptoJS.AES.encrypt(CryptoJS.enc.Utf8.parse(value.toString()), key,
    //        {
    //            keySize: 128 / 8,
    //            iv: iv,
    //            mode: CryptoJS.mode.CBC,
    //            padding: CryptoJS.pad.Pkcs7
    //        });

    //    return encrypted.toString();
    //}

    //getEncrypted(value: any) {
    //    var keys = "123456$#@$^@1ERF";
    //    var key = CryptoJS.enc.Utf8.parse(keys);
    //    var iv = CryptoJS.enc.Utf8.parse(keys);
    //    var decrypted = CryptoJS.AES.decrypt(value, key, {
    //        keySize: 128 / 8,
    //        iv: iv,
    //        mode: CryptoJS.mode.CBC,
    //        padding: CryptoJS.pad.Pkcs7
    //    });

    //    return decrypted.toString(CryptoJS.enc.Utf8);
    //}

    //encrypt(s: string): string {
    //  return CryptoJS.AES.encrypt(s, "xyz").toString()
    //}
}
