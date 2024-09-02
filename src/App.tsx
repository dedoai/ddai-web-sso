import { useEffect } from 'react';
import i18next from 'i18next';

import AuthModal from '@/components/AuthModal';

const THEME_MAPPER = {
  dark: 'dark',
  light: 'light',
};

export const SOCIAL_BUTTONS: string[] = ['facebook', 'google'];

const App = () => {
  const urlParams = new URLSearchParams(window.location.search);

  const trustedDomains: string = import.meta.env.VITE_TRUSTED_DOMAINS;

  const onCloseCb = () => {
    trustedDomains
      ?.split(',')
      ?.forEach((domain) => {
        window.parent.postMessage({
          type: 'sso-modal-close',
        }, domain);
      });
  };

  useEffect(() => {
    const theme = urlParams.get('t');
    document.body.classList.add(THEME_MAPPER[theme] || 'dark');
    i18next.changeLanguage(urlParams.get('l') || 'en');
    SOCIAL_BUTTONS.push(`apple-${theme}`);
  }, []);

  return <AuthModal isOpen onCloseCb={onCloseCb} />;
};

export default App;
