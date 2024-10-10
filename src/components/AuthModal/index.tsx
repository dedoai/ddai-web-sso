import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import {
  type IModalProps,
  Button,
  H2,
  Modal,
} from '@dedo_ai/gui-com-lib';
import useForm from '@en1-gma/use-form';

import {
  INITIAL_DATA,
  PAYLOAD_CONTACT_US,
  PAYLOAD_FORGOT_PASSWORD,
  PAYLOAD_RESET_PASSWORD,
  PAYLOAD_SIGNUP,
  PHASE_CONTACT_US,
  PHASE_FORGOT_PASSWORD,
  PHASE_RESET_PASSWORD,
  PHASE_SIGNIN_EMAIL,
  PHASE_SIGNIN_SOCIAL,
  PHASE_SIGNUP,
  PHASE_SUCCESS_ACCOUNT_CREATION,
  PHASE_SUCCESS_RESET_PASSWORD,
  PHASE_SUCCESS_RESET_PASSWORD_SENT,
} from '@/consts';
import { language, theme } from '@/utils';

import EmailSignIn from './signIn/email';
import SocialSignIn from './signIn/social';
import Success from './statuses/Success';
import ContactUs from './contactUs';
import ForgotPassword from './forgotPsw';
import ResetPsw from './resetPsw';
import SignUp, { ACTIVE_STEP_MAPPER } from './signUp';

import './style.css';

interface IAuthModalProps extends Pick<IModalProps, 'isOpen' | 'onCloseCb'> {
  resetPassword?: boolean;
  defaultPhase?: string;
}
export const AuthModal = ({
  isOpen,
  onCloseCb,
  resetPassword,
  defaultPhase,
}: IAuthModalProps) => {
  const baseT = 'authModal';
  const { t } = useTranslation();

  const DEFAULT_PHASE = defaultPhase || (resetPassword ? PHASE_RESET_PASSWORD : PHASE_SIGNIN_SOCIAL);

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

  const signUpbackButtonCondition = [1, 2, 3, 5].indexOf(activeStep) !== -1;

  const flexReverse = 'flex-row-reverse';

  const PHASE_APPEARANCE_MAPPER = {
    [PHASE_SIGNIN_SOCIAL]: {
      hasHeader: true,
      headerClassName: flexReverse,
    },
    [PHASE_SIGNIN_EMAIL]: {
      hasBackButton: true,
      hasHeader: true,
      headerClassName: '',
    },
    [PHASE_SIGNUP]: {
      hasBackButton: !defaultPhase && signUpbackButtonCondition,
      headerClassName: !defaultPhase && signUpbackButtonCondition ? '' : flexReverse,
    },
    [PHASE_FORGOT_PASSWORD]: {
      hasBackButton: !defaultPhase,
      headerClassName: defaultPhase ? flexReverse : '',
      backTo: PHASE_SIGNIN_EMAIL,
    },
    [PHASE_SUCCESS_RESET_PASSWORD_SENT]: {
      headerClassName: flexReverse,
      onClosePhaseCb: () => handleChange(PAYLOAD_FORGOT_PASSWORD, INITIAL_DATA[PAYLOAD_FORGOT_PASSWORD]),
    },
    [PHASE_SUCCESS_RESET_PASSWORD]: {
      headerClassName: flexReverse,
      onClosePhaseCb: () => handleChange(PAYLOAD_RESET_PASSWORD, INITIAL_DATA[PAYLOAD_RESET_PASSWORD]),
    },
    [PHASE_SUCCESS_ACCOUNT_CREATION]: {
      headerClassName: flexReverse,
      onClosePhaseCb: () => {
        handleChange(PAYLOAD_SIGNUP, INITIAL_DATA[PAYLOAD_SIGNUP]);
        setActiveStep(1);
      },
    },
    [PHASE_RESET_PASSWORD]: {
      headerClassName: flexReverse,
      hasCloseModal: false,
    },
    [PHASE_CONTACT_US]: {
      headerClassName: flexReverse,
      onClosePhaseCb: () => handleChange(PAYLOAD_CONTACT_US, INITIAL_DATA[PAYLOAD_CONTACT_US]),
    },
  };

  const {
    backTo = PHASE_SIGNIN_SOCIAL,
    hasBackButton = false,
    hasCloseModal = true,
    hasHeader = false,
    headerClassName = '',
    onClosePhaseCb,
  } = PHASE_APPEARANCE_MAPPER[phase];

  const handleClose = () => {
    onClosePhaseCb?.();
    setPhase(DEFAULT_PHASE);
    onCloseCb();
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
    [PHASE_SUCCESS_ACCOUNT_CREATION]: (
      <Success
        actions={[
          <Button
            ariaLabel="verify-identity"
            label={t(`${baseT}.signup.successAccountCreation.cta1`)}
            size="xl"
            variant="secondary"
            key="action-verify-identity"
            onClick={() => console.log('>> START KYC PROCESS')}
          />,
          <Button
            ariaLabel="explore-dedoai"
            label={t(`${baseT}.signup.successAccountCreation.cta2`)}
            size="xl"
            key="action-explore-dedoai"
            onClick={handleClose}
          />,
        ]}
        handlePhase={handlePhase}
        phase={PHASE_SUCCESS_ACCOUNT_CREATION}
        translationNamespace={`${baseT}.signup.successAccountCreation`}
      />
    ),
    [PHASE_SUCCESS_RESET_PASSWORD_SENT]: (
      <Success
        actions={[
          <Button
            key="go-back-home"
            ariaLabel="go-back-home"
            label={t(`${baseT}.forgotPassword.successResetPasswordSent.cta1`)}
            onClick={handleClose}
          />,
        ]}
        phase={PHASE_SUCCESS_RESET_PASSWORD_SENT}
        translationNamespace={`${baseT}.forgotPassword.successResetPasswordSent`}
        handlePhase={handlePhase}
      />
    ),
    [PHASE_SUCCESS_RESET_PASSWORD]: (
      <Success
        actions={[
          <Button
            key="go-to-login"
            ariaLabel="go-to-login"
            label={t(`${baseT}.resetPassword.successReset.cta1`)}
            onClick={() => { window.location.href = `/?t=${theme}&l=${language}`; }}
          />,
        ]}
        phase={PHASE_SUCCESS_RESET_PASSWORD}
        translationNamespace={`${baseT}.resetPassword.successReset`}
        handlePhase={handlePhase}
      />
    ),
  };
  useEffect(resetErrors, [phase]);

  useEffect(() => setPhase(DEFAULT_PHASE), [resetPassword]);

  return (
    <Modal
      isOpen={isOpen}
      onCloseCb={hasCloseModal ? handleClose : undefined}
      disableBodyScroll
      className="min-w-[423px] overflow-y-scroll"
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
