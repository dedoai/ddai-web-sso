import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Body2, Button } from '@dedo_ai/gui-com-lib';

import SocialSignIn from '@/components/AuthModal/signIn/social';
import ConfirmationCode from '@/components/ConfirmationCode';
import NeedHelp from '@/components/NeedHelp';

import { type IFormData, PHASE_SIGNIN_SOCIAL } from '..';

import FifthStep from './steps/fifthStep';
import FirstStep from './steps/firstStep';
import ThirdStep from './steps/thirdStep';
import schema from './validationSchemas';

import './style.css';

interface ISignUpProps {
  handlePhase: (_phase: string) => void;
  formData: IFormData['signup'];
  handleChange: (_key: string, _value: any) => void;
  errors: any;
  validate: (schema: any, context?: any) => boolean;
}
export const SignUp = ({
  handlePhase,
  formData,
  errors,
  handleChange,
  validate,
}: ISignUpProps) => {
  const baseT = 'authModal.signup';
  const { t } = useTranslation();

  const [activeStep, setActiveStep] = useState(1);

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
  } = formData;

  const commonProps = {
    formData,
    handleChange,
    errors,
  };

  const handleSubmit = () => {
    console.log('>> formData', formData);
  };

  const goToNextStep = (isInvalid?: boolean) => {
    if (!isInvalid) {
      if (activeStep === 5) handleSubmit();
      else setActiveStep(activeStep + 1);
    }
  };

  const STEP_MAPPER = {
    1: {
      step: <FirstStep {...commonProps} />,
      schema: firstStepSchema,
    },
    2: {
      step: <ConfirmationCode
        descriptionTKey="authModal.signup.confirmEmailDescription"
        handleChange={handleChange}
        hasCodeBeenChecked={formData.hasEmailCodeBeenChecked}
        nextStepCb={() => goToNextStep(false)}
        setCodeChecked={() => handleChange('signup.hasEmailCodeBeenChecked', true)}
        title="authModal.signup.confirmEmailLabel"
        tValues={{ email }}
        value={confirmationEmailCode}
        valuePath="signup.confirmationEmailCode"
      />,
      schema: secondStepSchema,
    },
    3: {
      step: <ThirdStep {...commonProps} />,
      schema: thirdStepSchema,
    },
    4: {
      step: <ConfirmationCode
        descriptionTKey="authModal.signup.confirmPhoneNumberDescription"
        handleChange={handleChange}
        hasCodeBeenChecked={formData.hasPhoneNumberCodeBeenChecked}
        nextStepCb={() => goToNextStep(false)}
        setCodeChecked={() => handleChange('signup.hasPhoneNumberCodeBeenChecked', true)}
        title="authModal.signup.confirmPhoneNumberLabel"
        tValues={{ phoneNumber, phoneNumberPrefix }}
        value={confirmationPhoneNumberCode}
        valuePath="signup.confirmationPhoneNumberCode"
      />,
      schema: fourthStepSchema,
    },
    5: {
      step: <FifthStep {...commonProps} />,
      schema: fifthStepSchema,
    },
  };

  const continueButtonCondition = [1, 3, 5].indexOf(activeStep) !== -1;
  const backCondition = [1, 2, 4].indexOf(activeStep) !== -1;

  return (
    <>
      {
        backCondition
          ? (
            <Button
              ariaLabel="back-to-signin"
              iconName="PiCaretLeftBold"
              iconSide="center"
              variant="secondary"
              onClick={() => (activeStep === 1 ? handlePhase(PHASE_SIGNIN_SOCIAL) : setActiveStep(activeStep - 1))}
              size="xs"
            />
          ) : null
      }
      {STEP_MAPPER[activeStep].step}
      {
        continueButtonCondition
          ? (
            <Button
              ariaLabel="next-step"
              text={t(`${baseT}.${activeStep === 5 ? 'createAccount' : 'nextStep'}`)}
              size="lg"
              className="mt-2"
              onClick={async () => {
                const isInvalid = await validate(STEP_MAPPER[activeStep].schema);
                goToNextStep(isInvalid);
              }}
            />
          ) : null
      }

      <Body2 content={t(`${baseT}.orSignWith`)} className="text-center text-neutral-base dark:text-text-gloomy" />
      <SocialSignIn mode="minimal" />
      <NeedHelp />
    </>
  );
};

export default SignUp;
