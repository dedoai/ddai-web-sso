import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import {
  type IModalProps,
  Button,
  H2,
  Modal,
} from '@dedo_ai/gui-com-lib';
import useForm from '@en1-gma/use-form';

import EmailSignIn from './signIn/email';
import SocialSignIn from './signIn/social';
import ForgotPassword from './forgotPsw';
import SignUp from './signUp';

import './style.css';

export interface IFormData {
  signin: {
    email: string;
    password: string;
  };
  signup: {
    email: string;
    confirmationEmailCode: string;
    hasEmailCodeBeenChecked: boolean;
    phoneNumberPrefix: string;
    phoneNumber: string;
    confirmationPhoneNumberCode: string;
    hasPhoneNumberCodeBeenChecked: boolean;
  };
  forgotPassword: {
    email: string;
  }
}
const INITIAL_DATA = {
  signin: {
    email: '',
    password: '',
  },
  signup: {
    email: '',
    confirmationEmailCode: '',
    hasEmailCodeBeenChecked: false,
    phoneNumberPrefix: '',
    phoneNumber: '',
    confirmationPhoneNumberCode: '',
    hasPhoneNumberCodeBeenChecked: false,
  },
  forgotPassword: {
    email: '',
  },
};

export const PHASE_SIGNIN_SOCIAL = 'signin-social';
export const PHASE_SIGNIN_EMAIL = 'signin-email';
export const PHASE_SIGNUP = 'signup';
export const PHASE_FORGOT_PASSWORD = 'forgot';

interface IAuthModalProps extends Pick<IModalProps, 'isOpen' | 'onCloseCb'> { }
export const AuthModal = ({
  isOpen,
  onCloseCb,
}: IAuthModalProps) => {
  const baseT = 'authModal';
  const { t } = useTranslation();

  const [phase, setPhase] = useState(PHASE_SIGNIN_SOCIAL);
  const handlePhase = (_phase: string) => setPhase(_phase);

  const {
    data: formData,
    errors,
    handleChange,
    setErrors,
    validate,
  } = useForm(INITIAL_DATA);

  const resetErrors = () => {
    setErrors({});
  };

  const PHASE_MAPPER = {
    [PHASE_SIGNIN_SOCIAL]: (
      <SocialSignIn handlePhase={handlePhase} />
    ),
    [PHASE_SIGNIN_EMAIL]: (
      <EmailSignIn
        errors={errors}
        formData={formData.signin}
        handleChange={handleChange}
        validate={validate}
        handlePhase={handlePhase}
      />
    ),
    [PHASE_SIGNUP]: (
      <SignUp
        errors={errors}
        formData={formData.signup}
        handleChange={handleChange}
        handlePhase={handlePhase}
        validate={validate}
      />
    ),
    [PHASE_FORGOT_PASSWORD]: (
      <ForgotPassword
        formData={formData.forgotPassword}
        handleChange={handleChange}
        errors={errors}
        validate={validate}
        handlePhase={handlePhase}
      />
    ),
  };

  const handleClose = () => {
    setPhase(PHASE_SIGNIN_SOCIAL);
    onCloseCb();
  };

  const noHeaderCondition = [PHASE_SIGNUP, PHASE_FORGOT_PASSWORD].indexOf(phase) !== -1;

  useEffect(resetErrors, [phase]);

  return (
    <Modal
      isOpen={isOpen}
      isModalParentOpen={false}
      noFooter
      onCloseCb={handleClose}
      bodyFullHeight
      noHeader={noHeaderCondition}
      disableBodyScroll
      title={
        phase === PHASE_SIGNIN_EMAIL
          ? (
            <Button
              ariaLabel="auth-modal-back"
              iconName="PiCaretLeftBold"
              iconSide="center"
              size="xs"
              onClick={() => handlePhase(PHASE_SIGNIN_SOCIAL)}
              variant="secondary"
            />
          )
          : null
      }
    >
      <div slot={Modal.SLOTS.BODY} className="flex flex-col gap-4">
        {
          noHeaderCondition
            ? null
            : <H2 className="text-center -mt-4" content={t(`${baseT}.title`)} />
        }
        {PHASE_MAPPER[phase]}
      </div>
    </Modal>
  );
};

export default AuthModal;
