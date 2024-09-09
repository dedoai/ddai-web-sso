/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_API_BASE_URL: string;
  readonly VITE_ENV: string;
  readonly VITE_FB_APP_ID: string;
  readonly VITE_RECAPTCHA_KEY: string;
  readonly VITE_TRUSTED_DOMAINS: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}

interface Window {
  FB: {
    AppEvents: {
      logPageView: () => void;
    };
    init: (options: {
      appId: string;
      version: string;
      cookie: boolean;
      xfbml: boolean;
    }) => void;
    login: (cb: (response: any) => void, options: { scope: string }) => void;
  };
  fbAsyncInit: () => void;
  grecaptcha: {
    enterprise: {
      ready: (cb: () => void) => void;
      execute: (key: string, options: { action: string }) => Promise<string>;
    }
  }
}
