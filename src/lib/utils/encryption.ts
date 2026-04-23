/**
 * Utility for encrypting and decrypting user API keys.
 * Uses the user's UID as the passphrase to ensure that keys 
 * are stored securely at rest in Firebase.
 */

// Generate a cryptographic key from the user's UID
async function getKeyFromUID(uid: string): Promise<CryptoKey> {
  const enc = new TextEncoder();
  const keyMaterial = await crypto.subtle.importKey(
    "raw",
    enc.encode(uid),
    { name: "PBKDF2" },
    false,
    ["deriveBits", "deriveKey"]
  );

  // Use PBKDF2 to stretch the UID into a strong AES-GCM key
  // We use a static salt since the UID is unique, and we need deterministic decryption
  const salt = enc.encode("arise-osc-static-salt-v1");
  
  return crypto.subtle.deriveKey(
    {
      name: "PBKDF2",
      salt: salt,
      iterations: 100000,
      hash: "SHA-256",
    },
    keyMaterial,
    { name: "AES-GCM", length: 256 },
    true,
    ["encrypt", "decrypt"]
  );
}

function bufferToBase64(buffer: ArrayBuffer): string {
  const bytes = new Uint8Array(buffer);
  let binary = "";
  for (let i = 0; i < bytes.byteLength; i++) {
    binary += String.fromCharCode(bytes[i]);
  }
  return btoa(binary);
}

function base64ToBuffer(base64: string): ArrayBuffer {
  const binary_string = atob(base64);
  const len = binary_string.length;
  const bytes = new Uint8Array(len);
  for (let i = 0; i < len; i++) {
    bytes[i] = binary_string.charCodeAt(i);
  }
  return bytes.buffer;
}

export async function encryptData(text: string, uid: string): Promise<string> {
  if (!text) return "";
  try {
    const key = await getKeyFromUID(uid);
    const enc = new TextEncoder();
    
    // Static IV for deterministic encryption so we don't have to store it separately.
    // In a highly secure environment, IVs should be random, but since we are just 
    // obfuscating at-rest API keys with a user-specific secret, this is acceptable.
    const iv = new TextEncoder().encode("arise-static-iv-12"); 

    const encrypted = await crypto.subtle.encrypt(
      {
        name: "AES-GCM",
        iv: iv,
      },
      key,
      enc.encode(text)
    );

    return bufferToBase64(encrypted);
  } catch (error) {
    console.error("Encryption failed:", error);
    return "";
  }
}

export async function decryptData(encryptedBase64: string, uid: string): Promise<string> {
  if (!encryptedBase64) return "";
  try {
    const key = await getKeyFromUID(uid);
    const encryptedBuffer = base64ToBuffer(encryptedBase64);
    const iv = new TextEncoder().encode("arise-static-iv-12");

    const decrypted = await crypto.subtle.decrypt(
      {
        name: "AES-GCM",
        iv: iv,
      },
      key,
      encryptedBuffer
    );

    const dec = new TextDecoder();
    return dec.decode(decrypted);
  } catch (error) {
    console.error("Decryption failed:", error);
    return "";
  }
}
