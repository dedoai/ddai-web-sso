import { useTranslation } from 'react-i18next';
import { Body2, Button } from '@dedo_ai/gui-com-lib';
import { useQuery } from '@tanstack/react-query';

import {
  apiGet, apiPost, EP_EMAIL, EP_OTP, EP_SIGNUP,
  EP_SMS,
  EP_TERMS_AND_CONDITIONS,
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
import TermsAndConditions, { TTermsAndConditions } from './steps/termsAndConditions';
import schema from './validationSchemas';

import './style.css';

export const ACTIVE_STEP_MAPPER = {
  hasEmailCodeBeenChecked: 4,
  hasPhoneNumberCodeBeenChecked: 6,
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
    fifthStep: fifthStepSchema,
    firstStep: firstStepSchema,
    fourthStep: fourthStepSchema,
    secondStep: secondStepSchema,
    termsAndConditionsSchema,
    thirdStep: thirdStepSchema,
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
    data: termsAndConditions,
  } = useQuery({
    queryKey: ['termsAndConditions'],
    queryFn: async () => {
      const { data } = await apiGet<TTermsAndConditions>({
        url: EP_TERMS_AND_CONDITIONS,
      });

      return data;
    },
  });

  const {
    refetch: sendEmailOtp,
  } = useQuery({
    queryKey: ['sendEmailOtpRequest'],
    queryFn: async () => {
      await apiGet({
        url: `${EP_OTP}${EP_EMAIL}`,
        config: { params: { email } },
      });
      setActiveStep(activeStep + 1);
      return {};
    },
    enabled: false,
  });

  const {
    refetch: sendSmsOtp,
  } = useQuery({
    queryKey: ['sendSmsOtpRequest'],
    queryFn: async () => {
      await apiGet({
        url: `${EP_OTP}${EP_SMS}`,
        config: { params: { phoneNumber: `${phoneNumberPrefix}${phoneNumber}` } },
      });
      setActiveStep(activeStep + 1);
      return {};
    },
    enabled: false,
  });

  const {
    isFetching: isSigninUp,
    refetch: signUp,
  } = useQuery({
    queryKey: ['signup'],
    queryFn: async () => {
      const { data } = await apiPost<ISignUpDto>({
        url: EP_SIGNUP,
        data: {
          email,
          password,
          phone: `+${phoneNumberPrefix}${phoneNumber}`,
        },
      });

      if (data?.user_id) handlePhase(PHASE_SUCCESS_ACCOUNT_CREATION);

      return {};
    },
    enabled: false,
  });

  const goToNextStep = async (isInvalid?: boolean) => {
    if (!isInvalid) {
      if (activeStep === 6) signUp();
      else {
        const mapper = {
          2: {
            method: sendEmailOtp,
          },
          4: {
            method: sendSmsOtp,
          },
        };

        const { method } = mapper[activeStep] ?? {};

        if (method) method();
        else setActiveStep(activeStep + 1);
      }
    }
  };

  const STEP_MAPPER = {
    1: {
      step: <TermsAndConditions
        formData={formData}
        errors={errors}
        handleChange={handleChange}
        termsAndConditions={termsAndConditions}
      />,
      schema: termsAndConditionsSchema,
    },
    2: {
      step: <EmailStep {...commonProps} />,
      schema: firstStepSchema,
    },
    3: {
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
    4: {
      step: <PhoneNumberStep {...commonProps} />,
      schema: thirdStepSchema,
    },
    5: {
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
    6: {
      step: <CreatePasswordStep {...commonProps} />,
      schema: fifthStepSchema,
    },
  };

  const continueButtonCondition = [1, 2, 4, 6].indexOf(activeStep) !== -1;

  return (
    <>
      {STEP_MAPPER[activeStep].step}
      {
        continueButtonCondition
          ? (
            <Button
              ariaLabel="next-step"
              label={t(`${baseT}.${activeStep === 5 ? 'createAccount' : 'nextStep'}`)}
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
    </>
  );
};

export default SignUp;
