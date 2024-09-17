import { useTranslation } from 'react-i18next';
import { Body2, Button, Label } from '@dedo_ai/gui-com-lib';
import { useQuery } from '@tanstack/react-query';

import {
  apiGet, apiPost, EP_EMAIL, EP_OTP, EP_SIGNUP,
  EP_SMS,
} from '@/api';
import SocialSignIn from '@/components/AuthModal/signIn/social';
import ConfirmationCode from '@/components/ConfirmationCode';
import NeedHelp from '@/components/NeedHelp';
import {
  IFormData, PHASE_SUCCESS_ACCOUNT_CREATION, PR_EMAIL, PR_SMS,
} from '@/consts';

import { CreatePasswordStep } from './steps/createPasswordStep';
import { EmailStep } from './steps/emailStep';
import { PhoneNumberStep } from './steps/phoneNumberStep';
import schema from './validationSchemas';

import './style.css';

export const ACTIVE_STEP_MAPPER = {
  hasEmailCodeBeenChecked: 3,
  hasPhoneNumberCodeBeenChecked: 5,
};
interface ISignUpDto {
  errMsg?: string;
  otp_secret?: string;
  otp_url?: string;
  user_id?: string;
}

interface ISignUpProps {
  activeStep: number;
  errors: any;
  formData: IFormData['signup'];
  handleChange: (_key: string, _value: any) => void;
  handlePhase: (_phase: string) => void;
  setActiveStep: (_step: number) => void;
  validate: (schema: any, context?: any) => boolean;
}
export const SignUp = ({
  activeStep,
  errors,
  formData,
  handleChange,
  handlePhase,
  setActiveStep,
  validate,
}: ISignUpProps) => {
  const baseT = 'authModal.signup';
  const { t } = useTranslation();

  const {
    firstStep: firstStepSchema,
    secondStep: secondStepSchema,
    thirdStep: thirdStepSchema,
    fourthStep: fourthStepSchema,
    fifthStep: fifthStepSchema,
  } = schema();

  const {
    email,
    confirmationEmailCode,
    phoneNumber,
    phoneNumberPrefix,
    confirmationPhoneNumberCode,
    password,
  } = formData;

  const commonProps = {
    formData,
    handleChange,
    errors,
  };

  const {
    refetch: sendEmailOtp,
  } = useQuery({
    queryKey: ['sendEmailOtpRequest'],
    queryFn: async () => {
      const { data } = await apiGet(`${EP_OTP}${EP_EMAIL}`, { params: { email } });

      return data;
    },
    enabled: false,
  });

  const {
    refetch: sendSmsOtp,
  } = useQuery({
    queryKey: ['sendSmsOtpRequest'],
    queryFn: async () => {
      const { data } = await apiGet(`${EP_OTP}${EP_SMS}`, { params: { phoneNumber: `${phoneNumberPrefix}${phoneNumber}` } });

      return data;
    },
    enabled: false,
  });

  const {
    data,
    isFetching: isSigninUp,
    refetch: signUp,
  } = useQuery({
    queryKey: ['signup'],
    queryFn: async () => {
      const { data } = await apiPost<ISignUpDto>(EP_SIGNUP, {
        email,
        password,
        phone: `+${phoneNumberPrefix}${phoneNumber}`,
      });

      if (data?.user_id) handlePhase(PHASE_SUCCESS_ACCOUNT_CREATION);

      return data;
    },
    enabled: false,
  });

  const goToNextStep = (isInvalid?: boolean) => {
    if (!isInvalid) {
      if (activeStep === 5) signUp();
      else {
        Object({
          1: sendEmailOtp,
          3: sendSmsOtp,
        })[activeStep]?.();
        setActiveStep(activeStep + 1);
      }
    }
  };

  const STEP_MAPPER = {
    1: {
      step: <EmailStep {...commonProps} />,
      schema: firstStepSchema,
    },
    2: {
      step: <ConfirmationCode
        codeType={PR_EMAIL}
        descriptionTKey="authModal.signup.confirmEmailDescription"
        handleChange={handleChange}
        hasCodeBeenChecked={formData.hasEmailCodeBeenChecked}
        nextStepCb={() => goToNextStep(false)}
        sendCodeCb={sendEmailOtp}
        setCodeChecked={() => handleChange('signup.hasEmailCodeBeenChecked', true)}
        title="authModal.signup.confirmEmailLabel"
        tValues={{ email }}
        value={confirmationEmailCode}
        valuePath="signup.confirmationEmailCode"
      />,
      schema: secondStepSchema,
    },
    3: {
      step: <PhoneNumberStep {...commonProps} />,
      schema: thirdStepSchema,
    },
    4: {
      step: <ConfirmationCode
        codeType={PR_SMS}
        descriptionTKey="authModal.signup.confirmPhoneNumberDescription"
        handleChange={handleChange}
        hasCodeBeenChecked={formData.hasPhoneNumberCodeBeenChecked}
        nextStepCb={() => goToNextStep(false)}
        sendCodeCb={sendSmsOtp}
        setCodeChecked={() => handleChange('signup.hasPhoneNumberCodeBeenChecked', true)}
        title="authModal.signup.confirmPhoneNumberLabel"
        tValues={{ phoneNumber, phoneNumberPrefix }}
        value={confirmationPhoneNumberCode}
        valuePath="signup.confirmationPhoneNumberCode"
      />,
      schema: fourthStepSchema,
    },
    5: {
      step: <CreatePasswordStep {...commonProps} />,
      schema: fifthStepSchema,
    },
  };

  const continueButtonCondition = [1, 3, 5].indexOf(activeStep) !== -1;

  return (
    <>
      {STEP_MAPPER[activeStep].step}
      {
        continueButtonCondition
          ? (
            <Button
              ariaLabel="next-step"
              text={t(`${baseT}.${activeStep === 5 ? 'createAccount' : 'nextStep'}`)}
              size="lg"
              className="mt-2"
              isLoading={isSigninUp}
              onClick={async () => {
                const isInvalid = await validate(STEP_MAPPER[activeStep].schema);
                goToNextStep(isInvalid);
              }}
            />
          ) : null
      }
      <Body2 content={t(`${baseT}.orSignWith`)} className="text-center text-text-bright dark:text-text-gloomy" />
      <SocialSignIn mode="minimal" />
      <NeedHelp handlePhase={handlePhase} />
      <Label content={data?.errMsg} className="text-error-base text-center" />
    </>
  );
};

export default SignUp;
