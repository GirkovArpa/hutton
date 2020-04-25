# Hutton Cipher

```javascript
import Hutton from './hutton.js';

let ciphertext = Hutton.encrypt('Hello World!', 'Open', 'Sesame');
console.log(ciphertext); // QIJRXCVLTX

let plaintext = Hutton.decrypt('QIJRXCVLTX', 'Open', 'Sesame');
console.log(plaintext); // HELLOWORLD
```

The WebAssembly implementation can be accessed this way:

```javascript
import Hutton from './hutton.js';

let ciphertext = Hutton.Wasm.encrypt('Hello World!', 'Open', 'Sesame');
console.log(ciphertext); // QIJRXCVLTX

let plaintext = Hutton.Wasm.decrypt('QIJRXCVLTX', 'Open', 'Sesame');
console.log(plaintext); // HELLOWORLD
```

**Online Hutton Calculator:** [Click here](https://hutton-cipher.netlify.com/)