'use client';

import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import {
  type IModalProps,
  Button,
  Modal,
} from '@dedo_ai/gui-com-lib';

import EmailSignIn from './signIn/email';
import SocialSignIn from './signIn/social';
import ForgotPassword from './forgotPsw';
import SignUp from './signUp';

export const PHASE_SIGNIN_SOCIAL = 'signin-social';
export const PHASE_SIGNIN_EMAIL = 'signin-email';
export const PHASE_SIGNUP = 'signup';
export const PHASE_FORGOT_PASSWORD = 'forgot';

interface IAuthModalProps extends Pick<IModalProps, 'isOpen' | 'onCloseCb'> {}
export const AuthModal = ({
  isOpen,
  onCloseCb,
}: IAuthModalProps) => {
  const baseT = 'authModal';
  const { t } = useTranslation();

  const [phase, setPhase] = useState(PHASE_SIGNIN_SOCIAL);
  const handlePhase = (_phase: string) => setPhase(_phase);

  const PHASE_MAPPER = {
    [PHASE_SIGNIN_SOCIAL]: (
      <SocialSignIn handlePhase={handlePhase} />
    ),
    [PHASE_SIGNIN_EMAIL]: (
      <EmailSignIn />
    ),
    [PHASE_SIGNUP]: (
      <SignUp handlePhase={handlePhase} />
    ),
    [PHASE_FORGOT_PASSWORD]: (
      <ForgotPassword />
    ),
  };

  const handleClose = () => {
    setPhase(PHASE_SIGNIN_SOCIAL);
    onCloseCb();
  };

  const noHeaderCondition = [PHASE_SIGNUP, PHASE_FORGOT_PASSWORD].indexOf(phase) !== -1;

  return (
    <Modal
      isOpen={isOpen}
      isModalParentOpen={false}
      noHeader={noHeaderCondition}
      variant="glass"
      noFooter
      onCloseCb={handleClose}
      bodyFullHeight
      disableBodyScroll
      bodyFullWidth={phase === PHASE_SIGNUP}
      noBackdrop={phase !== PHASE_SIGNUP}
      style={{
        borderRadius: '24px',
        maxWidth: '1600px',
      }}
      title={
        phase === PHASE_SIGNIN_EMAIL
          ? (
            <Button
              ariaLabel="auth-modal-back"
              iconName="PiCaretLeftBold"
              iconSide="center"
              onClick={() => handlePhase(PHASE_SIGNIN_SOCIAL)}
              variant="tertiary"
            />
          )
          : null
      }
    >
      <div slot={Modal.SLOTS.BODY} className="flex flex-col gap-4">
        {
          noHeaderCondition
            ? null
            : (
              <div className="text-3xl font-bold mb-2 text-center -mt-4">
                {t(`${baseT}.title`)}
              </div>
            )
        }
        {PHASE_MAPPER[phase]}
      </div>
    </Modal>
  );
};

export default AuthModal;
