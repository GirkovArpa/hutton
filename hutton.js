'use strict';

import { wasmEncrypt, wasmDecrypt } from './huttonWasm.js';

/** 
 * @class The Hutton cipher
 * @method encrypt - Encrypt a plaintext.
 * @method decrypt - Decrypt a ciphertext.
 * @property Wasm - Exposes WebAssembly implementations of the above functions.
 */
export default class Hutton {
  /**
   * @param {string} plaintext - Will be stripped of non-alphabetical characters.
   * @param {string} password - Will be stripped of non-alphabetical characters.
   * @param {string} key - Used to permutate the alphabet. Will be stripped of non-alphabetical characters. Duplicate letters are ignored.
   * @param {number} [version] - Which iteration of the Hutton cipher to use, 1 or 2. The latter is more secure, and is the default.
   * @returns {string} An uppercase string.
   */
  static encrypt(plaintext, password, key, version = 2) {
    return this.#hutton('encrypt', plaintext, password, key, version);
  }

  /**
 * @param {string} ciphertext - Will be stripped of non-alphabetical characters.
 * @param {string} password - Will be stripped of non-alphabetical characters.
 * @param {string} key - Used to permutate the alphabet. Will be stripped of non-alphabetical characters. Duplicate letters are ignored.
 * @param {number} [version] - Which iteration of the Hutton cipher to use, 1 or 2. The latter is more secure, and is the default.
 * @returns {string} An uppercase string.
 */
  static decrypt(ciphertext, password, key, version = 2) {
    return this.#hutton('decrypt', ciphertext, password, key, version);
  }

  static #alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';

  static #sanitize = function RemoveNonLettersFromStrings(...strings) {
    return strings.map(string => string.toUpperCase().replace(/[^A-Z]/g, ''));
  }

  static #keyAbc = function createKeyedAlphabetFromKey(key) {
    return [...new Set(key + this.#alphabet)];
  }

  static #swap = function swapPlaintextLetterAndCiphertextLetterInKeyedAlphabet(inputLetterIndex, outputLetterIndex, keyAbc) {
    [keyAbc[outputLetterIndex], keyAbc[inputLetterIndex]] = [keyAbc[inputLetterIndex], keyAbc[outputLetterIndex]];
  }

  static #hutton = function (mode, input, password, key, version) {
    [input, password, key] = this.#sanitize(input, password, key);
    const keyAbc = this.#keyAbc(key);
    let output = '';
    for (let i = 0; i < input.length; i++) {
      let shift = this.#alphabet.indexOf(password[i % password.length]) + 1;
      if (version == 2) shift += this.#alphabet.indexOf(keyAbc[0]) + 1;
      if (mode == 'decrypt') shift = -shift;
      const outputLetterIndex = (shift + keyAbc.indexOf(input[i]) + 52) % this.#alphabet.length;
      const outputLetter = keyAbc[outputLetterIndex];
      output += outputLetter;
      const inputLetterIndex = keyAbc.indexOf(input[i]);
      this.#swap(inputLetterIndex, outputLetterIndex, keyAbc);
    }
    return output;
  }

  static #encryptWasm = (plaintext, password, key, version = 2) => {
    [plaintext, password, key] = this.#sanitize(plaintext, password, key);
    return wasmEncrypt(plaintext, password, key, version);
  }

  static #decryptWasm = (plaintext, password, key, version = 2) => {
    [plaintext, password, key] = this.#sanitize(plaintext, password, key);
    return wasmDecrypt(plaintext, password, key, version);
  }

  static Wasm = {
    encrypt: this.#encryptWasm,
    decrypt: this.#decryptWasm
  };

}