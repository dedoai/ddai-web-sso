import { useEffect, useState } from 'react';
import i18next from 'i18next';

import AuthModal from '@/components/AuthModal';

import { language, mode, theme } from './utils';

const THEME_MAPPER = {
  dark: 'dark',
  light: 'light',
};

const App = () => {
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
    document.body.classList.add(THEME_MAPPER[theme] || 'dark');
    i18next.changeLanguage(language || 'en');

    if (mode === 'rp') {
      document.body.style.background = 'url(/assets/bg-standalone.svg) no-repeat center/cover';
      document.body.style.height = '100vh';
      setResetPassword(true);
    }
  }, []);

  return <AuthModal isOpen onCloseCb={onCloseCb} resetPassword={resetPassword} />;
};

export default App;
