import { useEffect, useState } from 'react';
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

  const [resetPassword, setResetPassword] = useState(false);

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
    const theme = urlParams.get('t'); // Can be 'dark' or 'light'
    const language = urlParams.get('l'); // Can be 'en' or 'tr' ecc..
    const mode = urlParams.get('m'); // Can be undefined or 'rp' (reset password)

    document.body.classList.add(THEME_MAPPER[theme] || 'dark');
    i18next.changeLanguage(language || 'en');
    SOCIAL_BUTTONS.push(`apple-${theme}`);

    if (mode === 'rp') {
      document.body.style.background = 'url(/assets/bg-standalone.svg) no-repeat center/cover';
      document.body.style.height = '100vh';
      setResetPassword(true);
    }
  }, []);

  return <AuthModal isOpen onCloseCb={onCloseCb} resetPassword={resetPassword} />;
};

export default App;
