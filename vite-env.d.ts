/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_TRUSTED_DOMAINS: string;
  readonly VITE_API_BASE_URL: string;
  readonly VITE_RECAPTCHA_KEY: string;
  readonly VITE_ENV: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}

interface Window {
  fbAsyncInit: () => void;
  FB: any;
}
