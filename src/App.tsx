import { useEffect, useState } from 'react';
import i18next from 'i18next';

import AuthModal from '@/components/AuthModal';

import { PHASE_FORGOT_PASSWORD, PHASE_SIGNUP } from './consts';
import {
  language, mode, theme,
} from './utils';

const THEME_MAPPER = {
  dark: 'dark',
  light: 'light',
};

const WHITELISTED_EXTERNAL_PHASES = [PHASE_SIGNUP, PHASE_FORGOT_PASSWORD];

const App = () => {
  const trustedDomains: string = import.meta.env.VITE_TRUSTED_DOMAINS;

  const [resetPassword, setResetPassword] = useState(false);
  const [defaultPhase, setDefaultPhase] = useState();

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
    document.body.classList.add(THEME_MAPPER[theme]);
    i18next.changeLanguage(language);

    if (mode === 'rp') {
      document.body.style.background = 'url(/assets/bg-standalone.svg) no-repeat center/cover';
      document.body.style.height = '100vh';
      setResetPassword(true);
    }

    if (WHITELISTED_EXTERNAL_PHASES.indexOf(defaultPhase) !== -1) setDefaultPhase(defaultPhase);
  }, []);

  return (
    <AuthModal
      isOpen
      onCloseCb={onCloseCb}
      resetPassword={resetPassword}
      defaultPhase={defaultPhase}
    />
  );
};

export default App;
