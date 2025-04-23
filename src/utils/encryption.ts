
// Caesar Cipher
export const caesarCipher = (
  text: string,
  shift: number,
  encrypt: boolean = true
): string => {
  // Ensure shift is within 0-25
  shift = ((shift % 26) + 26) % 26;
  
  // If decrypting, reverse the shift
  if (!encrypt) {
    shift = (26 - shift) % 26;
  }
  
  return text
    .split("")
    .map((char) => {
      const code = char.charCodeAt(0);
      
      // Uppercase letters
      if (code >= 65 && code <= 90) {
        return String.fromCharCode(((code - 65 + shift) % 26) + 65);
      }
      // Lowercase letters
      else if (code >= 97 && code <= 122) {
        return String.fromCharCode(((code - 97 + shift) % 26) + 97);
      }
      // Non-alphabetic characters
      else {
        return char;
      }
    })
    .join("");
};

// Vigenere Cipher
export const vigenereCipher = (
  text: string,
  keyword: string,
  encrypt: boolean = true
): string => {
  if (!keyword) return text;
  
  const key = keyword.toLowerCase().replace(/[^a-z]/g, "");
  if (key.length === 0) return text;
  
  return text
    .split("")
    .map((char, index) => {
      const code = char.charCodeAt(0);
      const isUpperCase = code >= 65 && code <= 90;
      const isLowerCase = code >= 97 && code <= 122;
      
      if (!isUpperCase && !isLowerCase) return char;
      
      const baseCharCode = isUpperCase ? 65 : 97;
      const keyChar = key[index % key.length];
      const keyShift = keyChar.charCodeAt(0) - 97;
      
      let shift = encrypt ? keyShift : (26 - keyShift) % 26;
      
      const charPosition = code - baseCharCode;
      const newPosition = (charPosition + shift) % 26;
      
      return String.fromCharCode(baseCharCode + newPosition);
    })
    .join("");
};

// Get letter frequency analysis for a text
export const getLetterFrequency = (text: string): Record<string, number> => {
  const frequency: Record<string, number> = {};
  const letters = text.toLowerCase().replace(/[^a-z]/g, "");
  
  for (let i = 0; i < letters.length; i++) {
    const char = letters[i];
    frequency[char] = (frequency[char] || 0) + 1;
  }
  
  // Fill in zeros for missing letters
  for (let i = 0; i < 26; i++) {
    const char = String.fromCharCode(97 + i);
    if (!frequency[char]) frequency[char] = 0;
  }
  
  return frequency;
};

// English letter frequency for comparison
export const englishLetterFrequency: Record<string, number> = {
  e: 12.02,
  t: 9.10,
  a: 8.12,
  o: 7.68,
  i: 7.31,
  n: 6.95,
  s: 6.28,
  r: 6.02,
  h: 5.92,
  d: 4.32,
  l: 3.98,
  u: 2.88,
  c: 2.71,
  m: 2.61,
  f: 2.30,
  y: 2.11,
  w: 2.09,
  g: 2.03,
  p: 1.82,
  b: 1.49,
  v: 1.11,
  k: 0.69,
  x: 0.17,
  q: 0.11,
  j: 0.10,
  z: 0.07
};

// Auto decrypt Caesar cipher by comparing frequency
export const autoCaesarDecrypt = (text: string): { shift: number, text: string } => {
  let bestMatch = { shift: 0, score: Number.MAX_VALUE };
  const cipheredFrequency = getLetterFrequency(text);
  
  // Try all 26 shifts
  for (let shift = 0; shift < 26; shift++) {
    const decrypted = caesarCipher(text, shift, false);
    const decryptedFrequency = getLetterFrequency(decrypted);
    
    // Calculate frequency score (lower is better match to English)
    let score = 0;
    for (const char in englishLetterFrequency) {
      const expectedFreq = englishLetterFrequency[char];
      const actualFreq = (decryptedFrequency[char] / (text.replace(/[^a-zA-Z]/g, "").length)) * 100;
      score += Math.pow(expectedFreq - actualFreq, 2);
    }
    
    if (score < bestMatch.score) {
      bestMatch = { shift, score };
    }
  }
  
  return {
    shift: bestMatch.shift,
    text: caesarCipher(text, bestMatch.shift, false)
  };
};

// Estimate password security strength
export const estimatePasswordStrength = (password: string): {
  score: number;
  timeToBreak: string;
  suggestions: string[];
} => {
  const length = password.length;
  const hasUpperCase = /[A-Z]/.test(password);
  const hasLowerCase = /[a-z]/.test(password);
  const hasNumbers = /[0-9]/.test(password);
  const hasSpecialChars = /[^A-Za-z0-9]/.test(password);
  
  let score = 0;
  let suggestions: string[] = [];
  
  // Base score from length
  score += length * 4;
  
  // Bonus for character diversity
  if (hasUpperCase) score += 5;
  if (hasLowerCase) score += 5;
  if (hasNumbers) score += 5;
  if (hasSpecialChars) score += 5;
  
  // Character type variety bonus
  const varietyCount = [hasUpperCase, hasLowerCase, hasNumbers, hasSpecialChars].filter(Boolean).length;
  score += varietyCount * 10;
  
  // Suggestions
  if (length < 8) {
    suggestions.push("Make your password longer (at least 8 characters).");
  }
  if (!hasUpperCase) {
    suggestions.push("Add uppercase letters.");
  }
  if (!hasLowerCase) {
    suggestions.push("Add lowercase letters.");
  }
  if (!hasNumbers) {
    suggestions.push("Add numbers.");
  }
  if (!hasSpecialChars) {
    suggestions.push("Add special characters.");
  }
  
  // Estimate time to brute force (very simplistic)
  let possibleChars = 0;
  if (hasLowerCase) possibleChars += 26;
  if (hasUpperCase) possibleChars += 26;
  if (hasNumbers) possibleChars += 10;
  if (hasSpecialChars) possibleChars += 32;
  
  // Assume 1 billion guesses per second for a powerful computer
  const combinations = Math.pow(possibleChars || 1, length);
  const seconds = combinations / 1000000000;
  
  let timeToBreak;
  if (seconds < 60) {
    timeToBreak = `${seconds.toFixed(2)} seconds`;
  } else if (seconds < 3600) {
    timeToBreak = `${(seconds / 60).toFixed(2)} minutes`;
  } else if (seconds < 86400) {
    timeToBreak = `${(seconds / 3600).toFixed(2)} hours`;
  } else if (seconds < 31536000) {
    timeToBreak = `${(seconds / 86400).toFixed(2)} days`;
  } else if (seconds < 31536000 * 100) {
    timeToBreak = `${(seconds / 31536000).toFixed(2)} years`;
  } else {
    timeToBreak = "centuries";
  }
  
  return {
    score: Math.min(100, Math.max(0, score)),
    timeToBreak,
    suggestions,
  };
};
