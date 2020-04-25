'use strict';

import Hutton from './hutton.js';
import { longCiphertext } from './longCiphertext.js';

console.debug('Tests started.');

let longCt = longCiphertext;
let plaintext = 'MEETMEATTHEGREENMANATTHREE';
let ciphertext = 'RSBIENXONGQYTMWQVWXWIOKXKU';
let password = 'FEDORA';
let key = 'JUPITER';

console.assert(
  Hutton.encrypt(plaintext, password, key) === ciphertext,
  `Hutton.encrypt(${plaintext}, ${password}, ${key}) === ${ciphertext}`
);

console.assert(
  Hutton.decrypt(ciphertext, password, key) === plaintext,
  `Hutton.encrypt(${ciphertext}, ${password}, ${key}) === ${plaintext}`
);

ciphertext = 'WDKQEXHYPXLAASPANOPLMVPGQC';

console.assert(
  Hutton.encrypt(plaintext, password, key, 1) === ciphertext,
  `Hutton.encrypt(${plaintext}, ${password}, ${key}, 1) === ${ciphertext}`
);

console.assert(
  Hutton.decrypt(ciphertext, password, key, 1) === plaintext,
  `Hutton.encrypt(${ciphertext}, ${password}, ${key}, 1) === ${plaintext}`
);

plaintext = 'FORHUMANBEINGSBEINGCHILDRENHAVETHECHILDISHWILFULNESSANDTHECHILDISHSECRECYANDTHEYNEVERHAVEFROMTHEBEGINNINGOFTHEWORLDDONEWHATTHEWISEMENHAVESEENTOBEINEVITABLETHEYSTONEDTHEFALSEPROPHETSITISSAIDBUTTHEYCOULDHAVESTONEDTRUEPROPHETSWITHAGREATERANDJUSTERENJOYMENTINDIVIDUALLYMENMAYPRESENTAMOREORLESSRATIONALAPPEARANCEEATINGSLEEPINGANDSCHEMINGBUTHUMANITYASAWHOLEISCHANGEFULMYSTICALFICKLEDELIGHTFULMENAREMENBUTMANISAWOMAN';
ciphertext = 'WQQOZAYKTCUJACPCSZZJGRMFJRAALRVMYJACGYOZUDXYUPNIKVIVBMZKFHBCVOKDCGBCXJJAVVQYUQTWMRYJECPFWTFLQDNTSKJKCKEQMYGLKWLCCUCGLFWDLKOATUNQGDGGYLUPZRWBSUTMTOUIISWYXHYWEJJIWCXZGWAKXOFFRQSGUFDVBBJHLRNEIEJDEBFXNJWRNSRZRPBDXVWNPMMIHEFAXGCZVJYPRXRKZHJIXJOWKCWHUWQDTQMZVTSCUUABXBIFUEDEBNXGBHHHUXCDBJUZNVRCAASWFFESDZYORKHUWUNVBKXVUJMDMXMYCCMAZTOMPMINSORYYODDGOOYYYXNBJWJVFGYKXKYEMRCLXLZZRZUNIBKJTOCSNEAGBVTXJHQGXDLWQBTEJTGKBKOD';
password = 'MINOX';
key = 'QUARK';

console.assert(
  Hutton.decrypt(ciphertext, password, key, 1) === plaintext,
  `Hutton.encrypt(${ciphertext}, ${password}, ${key}, 1) === ${plaintext}`
);

// WebAssembly

plaintext = 'MEETMEATTHEGREENMANATTHREE';
ciphertext = 'RSBIENXONGQYTMWQVWXWIOKXKU';
password = 'FEDORA';
key = 'JUPITER';

console.assert(
  Hutton.Wasm.encrypt(plaintext, password, key) === ciphertext,
  `Hutton.Wasm.encrypt(${plaintext}, ${password}, ${key}) === ${ciphertext}`
);

console.assert(
  Hutton.Wasm.decrypt(ciphertext, password, key) === plaintext,
  `Hutton.Wasm.encrypt(${ciphertext}, ${password}, ${key}) === ${plaintext}`
);

ciphertext = 'WDKQEXHYPXLAASPANOPLMVPGQC';

console.assert(
  Hutton.Wasm.encrypt(plaintext, password, key, 1) === ciphertext,
  `Hutton.Wasm.encrypt(${plaintext}, ${password}, ${key}, 1) === ${ciphertext}`
);

console.assert(
  Hutton.Wasm.decrypt(ciphertext, password, key, 1) === plaintext,
  `Hutton.Wasm.encrypt(${ciphertext}, ${password}, ${key}, 1) === ${plaintext}`
);

plaintext = 'FORHUMANBEINGSBEINGCHILDRENHAVETHECHILDISHWILFULNESSANDTHECHILDISHSECRECYANDTHEYNEVERHAVEFROMTHEBEGINNINGOFTHEWORLDDONEWHATTHEWISEMENHAVESEENTOBEINEVITABLETHEYSTONEDTHEFALSEPROPHETSITISSAIDBUTTHEYCOULDHAVESTONEDTRUEPROPHETSWITHAGREATERANDJUSTERENJOYMENTINDIVIDUALLYMENMAYPRESENTAMOREORLESSRATIONALAPPEARANCEEATINGSLEEPINGANDSCHEMINGBUTHUMANITYASAWHOLEISCHANGEFULMYSTICALFICKLEDELIGHTFULMENAREMENBUTMANISAWOMAN';
ciphertext = 'WQQOZAYKTCUJACPCSZZJGRMFJRAALRVMYJACGYOZUDXYUPNIKVIVBMZKFHBCVOKDCGBCXJJAVVQYUQTWMRYJECPFWTFLQDNTSKJKCKEQMYGLKWLCCUCGLFWDLKOATUNQGDGGYLUPZRWBSUTMTOUIISWYXHYWEJJIWCXZGWAKXOFFRQSGUFDVBBJHLRNEIEJDEBFXNJWRNSRZRPBDXVWNPMMIHEFAXGCZVJYPRXRKZHJIXJOWKCWHUWQDTQMZVTSCUUABXBIFUEDEBNXGBHHHUXCDBJUZNVRCAASWFFESDZYORKHUWUNVBKXVUJMDMXMYCCMAZTOMPMINSORYYODDGOOYYYXNBJWJVFGYKXKYEMRCLXLZZRZUNIBKJTOCSNEAGBVTXJHQGXDLWQBTEJTGKBKOD';
password = 'MINOX';
key = 'QUARK';

console.assert(
  Hutton.Wasm.decrypt(ciphertext, password, key, 1) === plaintext,
  `Hutton.Wasm.encrypt(${ciphertext}, ${password}, ${key}, 1) === ${plaintext}`
);

// Benchmarks

console.time('Hutton');
longCt = longCiphertext;
const outputJS = [];
outputJS.push(Hutton.decrypt(longCt, 'fedora', 'jupiter', 2));
console.timeEnd('Hutton');

console.time('Hutton.Wasm');
longCt = longCiphertext;
const outputWasm = [];
outputWasm.push(Hutton.Wasm.decrypt(longCt, 'fedora', 'jupiter', 2));
console.timeEnd('Hutton.Wasm');

console.log('Tests complete.');