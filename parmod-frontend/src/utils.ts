import { Image } from './types';

const toBase64 = (ar: number[]) => {
  const arr = new Uint8Array(ar);
  return btoa(
    arr.reduce((data, byte) => data + String.fromCharCode(byte), '')
  );
};

export const toImageSrc = (image: Image): string => {
  return `data:${image.contentType};base64,${toBase64(image.data.data)}`;
};

export const toDate = (date: string): string => {
  return new Date(date).toLocaleDateString('en-GB');
};

export const toTime = (date: string): string => {
  return new Date(date).toLocaleTimeString('en-GB', { hour: '2-digit', minute: '2-digit' });
};
