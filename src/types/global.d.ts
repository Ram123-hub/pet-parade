export {};

declare global {
  interface Window {
    cloudinary: any; // You can refine the type here if you have specific type information
  }
}