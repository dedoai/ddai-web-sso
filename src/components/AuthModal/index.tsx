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
import SuccessAccountCreation from './statuses/SuccessAccountCreation';
import SuccessResetPasswordSent from './statuses/SuccessResetPasswordSent';
import ContactUs from './contactUs';
import ForgotPassword from './forgotPsw';
import ResetPsw from './resetPsw';
import SignUp, { ACTIVE_STEP_MAPPER } from './signUp';

import './style.css';

export interface IFormData {
  signin: {
    email: string;
    password: string;
  },
  signup: {
    confirmationEmailCode: string;
    confirmationPhoneNumberCode: string;
    confirmPassword: string;
    email: string;
    hasEmailCodeBeenChecked: boolean;
    hasPhoneNumberCodeBeenChecked: boolean;
    password: string;
    phoneNumber: string;
    phoneNumberPrefix: string;
  },
  forgotPassword: {
    email: string;
  },
  contactUs: {
    email: string;
    message: string;
    name: string;
    surname: string;
  },
  resetPassword: {
    password: string;
    confirmPassword: string;
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
  contactUs: {
    email: '',
    message: '',
    name: '',
    surname: '',
  },
  resetPassword: {
    password: '',
    confirmPassword: '',
  },
};

export const PHASE_CONTACT_US = 'contact-us';
export const PHASE_FORGOT_PASSWORD = 'forgot';
export const PHASE_RESET_PASSWORD = 'reset-password';
export const PHASE_SIGNIN_EMAIL = 'signin-email';
export const PHASE_SIGNIN_SOCIAL = 'signin-social';
export const PHASE_SIGNUP = 'signup';
export const PHASE_SUCCESS_ACCOUNT_CREATION = 'success-account-creation';
export const PHASE_SUCCESS_RESET_PASSWORD_SENT = 'success-reset-password-sent';
interface IAuthModalProps extends Pick<IModalProps, 'isOpen' | 'onCloseCb'> {
  resetPassword?: boolean;
}
export const AuthModal = ({
  isOpen,
  onCloseCb,
  resetPassword,
}: IAuthModalProps) => {
  const baseT = 'authModal';
  const { t } = useTranslation();

  const DEFAULT_PHASE = resetPassword ? PHASE_RESET_PASSWORD : PHASE_SIGNIN_SOCIAL;

  const [phase, setPhase] = useState(DEFAULT_PHASE);
  const handlePhase = (_phase: string) => setPhase(_phase);

  const {
    data: formData,
    errors,
    handleChange,
    setErrors,
    validate,
  } = useForm(INITIAL_DATA);

  const {
    signup: {
      hasEmailCodeBeenChecked,
      hasPhoneNumberCodeBeenChecked,
    },
  } = formData;

  const emailCodeEval = hasEmailCodeBeenChecked ? 'hasEmailCodeBeenChecked' : '';
  const phoneNumberNameEval = hasPhoneNumberCodeBeenChecked ? 'hasPhoneNumberCodeBeenChecked' : '';
  const [activeStep, setActiveStep] = useState(ACTIVE_STEP_MAPPER[phoneNumberNameEval || emailCodeEval] || 1);

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
        activeStep={activeStep}
        errors={errors}
        formData={formData.signup}
        handleChange={handleChange}
        handlePhase={handlePhase}
        setActiveStep={setActiveStep}
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
    [PHASE_CONTACT_US]: (
      <ContactUs
        formData={formData.contactUs}
        handleChange={handleChange}
        errors={errors}
        validate={validate}
      />
    ),
    [PHASE_RESET_PASSWORD]: (
      <ResetPsw
        formData={formData.resetPassword}
        handleChange={handleChange}
        errors={errors}
        validate={validate}
        handlePhase={handlePhase}
      />
    ),
    [PHASE_SUCCESS_RESET_PASSWORD_SENT]: (
      <SuccessResetPasswordSent handlePhase={handlePhase} />
    ),
    [PHASE_SUCCESS_ACCOUNT_CREATION]: (
      <SuccessAccountCreation handlePhase={handlePhase} />
    ),
  };

  const signUpbackButtonCondition = [1, 2, 4].indexOf(activeStep) !== -1;

  const PHASE_APPEARANCE_MAPPER = {
    [PHASE_SIGNIN_SOCIAL]: {
      hasHeader: true,
      headerClassName: 'flex-row-reverse',
    },
    [PHASE_SIGNIN_EMAIL]: {
      hasBackButton: true,
      hasHeader: true,
      headerClassName: '',
    },
    [PHASE_SIGNUP]: {
      hasBackButton: signUpbackButtonCondition,
      headerClassName: signUpbackButtonCondition ? '' : 'flex-row-reverse',
    },
    [PHASE_FORGOT_PASSWORD]: {
      hasBackButton: true,
      backTo: PHASE_SIGNIN_EMAIL,
    },
    [PHASE_SUCCESS_RESET_PASSWORD_SENT]: {
      headerClassName: 'flex-row-reverse',
      onClosePhaseCb: () => handleChange('forgotPassword', INITIAL_DATA.forgotPassword),
    },
    [PHASE_SUCCESS_ACCOUNT_CREATION]: {
      headerClassName: 'flex-row-reverse',
      onClosePhaseCb: () => {
        handleChange('signup', INITIAL_DATA.signup);
        setActiveStep(1);
      },
    },
  };

  const {
    backTo = PHASE_SIGNIN_SOCIAL,
    hasBackButton = false,
    hasHeader = false,
    headerClassName = '',
    onClosePhaseCb,
  } = PHASE_APPEARANCE_MAPPER[phase];

  const handleClose = () => {
    onClosePhaseCb?.();
    setPhase(DEFAULT_PHASE);
    onCloseCb();
  };

  useEffect(resetErrors, [phase]);

  useEffect(() => setPhase(DEFAULT_PHASE), [resetPassword]);

  return (
    <Modal
      isOpen={isOpen}
      onCloseCb={handleClose}
      disableBodyScroll
      className="min-w-[423px]"
      headerClassName={`pr-2 ${headerClassName}`}
      title={hasBackButton
        ? (
          <Button
            ariaLabel="back-to-signin"
            iconName="PiCaretLeftBold"
            iconSide="center"
            variant="secondary"
            onClick={() => (activeStep === 1 ? handlePhase(backTo) : setActiveStep(activeStep - 1))}
            size="xs"
          />
        ) : null}
      body={(
        <div className="flex flex-col gap-4">
          {
            hasHeader
              ? <H2 className="text-center -mt-4" content={t(`${baseT}.title`)} />
              : null
          }
          {PHASE_MAPPER[phase]}
        </div>
      )}
    />
  );
};

export default AuthModal;
