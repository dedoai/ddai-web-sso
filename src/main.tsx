import { createRoot } from 'react-dom/client';
import { initReactI18next } from 'react-i18next';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import i18next from 'i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import ChainedBackend from 'i18next-chained-backend';
import I18NextHttpBackend from 'i18next-http-backend';

import App from './App';

import '@dedo_ai/gui-com-lib/dist/style.css';
import './index.css';

i18next
  .use(ChainedBackend)
  .use(initReactI18next)
  .use(LanguageDetector)
  .init({
    fallbackLng: 'en',
    preload: ['en'],
    nonExplicitSupportedLngs: true,
    interpolation: {
      escapeValue: false,
    },
    returnObjects: true,
    backend: {
      backends: [
        I18NextHttpBackend,
      ],
      backendOptions: [{
        loadPath: '/locales/{{lng}}/{{ns}}.json',
      }],
    },
  });

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
    },
  },
});

createRoot(document.getElementById('root')!).render(
  <QueryClientProvider client={queryClient}>
    <App />
  </QueryClientProvider>,
);
