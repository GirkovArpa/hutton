'use strict';

import { app } from './wasm.js';

const { memory, hutton } = app.exports;
memory.grow(256);

const abc = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';

const decode = function (arr) {
  return [...arr].map(i => abc[i]).join('');
}

const wasmEncrypt = function (plaintext, password, key, version = 2) {

  const keyAbc = [...new Set(key + abc)];

  let pointer = 0;
  const pt = new Int32Array(memory.buffer, pointer, plaintext.length);
  pointer += (pt.length * 8);
  const pw = new Int32Array(memory.buffer, pointer, password.length);
  pointer += (pw.length * 8);
  const k = new Int32Array(memory.buffer, pointer, 26);
  pointer += (26 * 8);
  const ct = new Int32Array(memory.buffer, pointer, plaintext.length);

  for (let i = 0; i < plaintext.length; i++) {
    pt[i] = abc.indexOf(plaintext[i]);
  }
  for (let i = 0; i < password.length; i++) {
    pw[i] = abc.indexOf(password[i]);
  }
  for (let i = 0; i < 26; i++) {
    k[i] = abc.indexOf(keyAbc[i]);
  }

  hutton(pt.byteOffset, pt.length, pw.byteOffset, pw.length, k.byteOffset, ct.byteOffset, ct.length, version, 0);

  return decode(ct);
}

const wasmDecrypt = function (ciphertext, password, key, version = 2) {
  const keyAbc = [...new Set(key + abc)];

  let pointer = 0;
  const ct = new Int32Array(memory.buffer, pointer, ciphertext.length);
  pointer += (ct.length * 8);
  const pw = new Int32Array(memory.buffer, pointer, password.length);
  pointer += (pw.length * 8);
  const k = new Int32Array(memory.buffer, pointer, 26);
  pointer += (26 * 8);
  const pt = new Int32Array(memory.buffer, pointer, ciphertext.length);

  for (let i = 0; i < ciphertext.length; i++) {
    ct[i] = abc.indexOf(ciphertext[i]);
  }
  for (let i = 0; i < password.length; i++) {
    pw[i] = abc.indexOf(password[i]);
  }
  for (let i = 0; i < 26; i++) {
    k[i] = abc.indexOf(keyAbc[i]);
  }

  hutton(ct.byteOffset, ct.length, pw.byteOffset, pw.length, k.byteOffset, pt.byteOffset, pt.length, version, 1);

  return decode(pt);
}

export { wasmEncrypt, wasmDecrypt };
