import { buffer } from "stream/consumers";

export const retrieveUserAgentDevice = (userAgent: string) => {
  const regexResult = userAgent.match(/^[^\(]+\((\w+)/);
  if (!regexResult) {
    return '';
  }
  
  return regexResult[1];
}

export const createFingerprint = async (): Promise<string> => {
  const navigatorInfo = JSON.stringify({
    userAgent: navigator.userAgent,
    language: navigator.language,
    screenWidth: window.screen.width,
    screenHeight: window.screen.height,
  });

  const encoder = new TextEncoder();
  const data = encoder.encode(navigatorInfo);

  const buffer = await crypto.subtle.digest('SHA-256', data);
  const hashArray = Array.from(new Uint8Array(buffer));
  const hashHex = hashArray.map((byte) => byte.toString(16).padStart(2, '0')).join('');
  return hashHex;
}