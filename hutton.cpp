typedef long int i32;

i32 indexOf(i32 val, i32 *arr, i32 arrLen) {
  for (i32 i = 0; i < arrLen; i++) {
    if (arr[i] == val) return i;
  } 
}

i32 includes(i32 val, i32 *arr, i32 arrLen) {
 i32 idx = indexOf(val, arr, arrLen); 
 if (idx == -1) { return 0; }
 else { return 1; }
}

extern "C" {
  void hutton(i32 *plaintext, i32 plaintextLength, i32 *password, i32 passwordLength, i32 *key, i32 *ciphertext, i32 ciphertextLength, i32 version, i32 decrypting) {
    for (i32 i = 0; i < ciphertextLength; i++) {
      
    i32 shift = password[i % passwordLength] + 1;
    if (version == 2) shift += key[0] + 1; 
    if (decrypting) shift = -shift;

      i32 outLetterIdx = (shift + indexOf(plaintext[i], key, 26) + 52) % 26;

      i32 outLetter = key[outLetterIdx];
      ciphertext[i] = outLetter;
      
      i32 keyIdx = indexOf(plaintext[i], key, 26);
      
      i32 swap1 = key[outLetterIdx];
      i32 swap2 = key[keyIdx];
      
      key[keyIdx] = swap1;
      key[outLetterIdx] = swap2;
    }
  }
}