import { useEffect, useState } from 'react';
import i18next from 'i18next';

import AuthModal from '@/components/AuthModal';

import { PHASE_FORGOT_PASSWORD, PHASE_SIGNUP } from './consts';
import {
  dp,
  emit,
  EMIT_TYPE_MODAL_CLOSE,
  language,
  mode,
  theme,
} from './utils';

const THEME_MAPPER = {
  dark: 'dark',
  light: 'light',
};

const WHITELISTED_EXTERNAL_PHASES = [PHASE_SIGNUP, PHASE_FORGOT_PASSWORD];

const App = () => {
  const [resetPassword, setResetPassword] = useState(false);

  useEffect(() => {
    document.body.classList.add(THEME_MAPPER[theme]);
    i18next.changeLanguage(language);

    if (mode === 'rp') {
      document.body.style.background = 'url(/assets/bg-standalone.svg) no-repeat center/cover';
      document.body.style.height = '100vh';
      setResetPassword(true);
    }
  }, []);

  return (
    <AuthModal
      isOpen
      onCloseCb={() => emit(EMIT_TYPE_MODAL_CLOSE)}
      resetPassword={resetPassword}
      defaultPhase={WHITELISTED_EXTERNAL_PHASES.indexOf(dp) !== -1 ? dp : undefined}
    />
  );
};

export default App;
