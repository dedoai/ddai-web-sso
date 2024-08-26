/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly TRUSTED_DOMAINS: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
