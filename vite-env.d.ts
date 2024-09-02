/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_TRUSTED_DOMAINS: string;
  readonly VITE_API_BASE_URL: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
