import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Body2, Button } from '@dedo_ai/gui-com-lib';
import useForm from '@en1-gma/use-form';

import SocialSignIn from '@/components/AuthModal/signIn/social';
import NeedHelp from '@/components/NeedHelp';

import { PHASE_SIGNIN_SOCIAL } from '..';

import FifthStep from './steps/fifthStep';
import FirstStep from './steps/firstStep';
import FourthStep from './steps/fourthStep';
import SecondStep from './steps/secondStep';
import ThirdStep from './steps/thirdStep';
import schema from './validationSchemas';

import './style.css';

interface ISignUpProps {
  handlePhase: (_phase: string) => void;
}
export const SignUp = ({
  handlePhase,
}: ISignUpProps) => {
  const baseT = 'authModal.signup';
  const { t } = useTranslation();

  const [activeStep, setActiveStep] = useState(1);
  const [hasSmsBeenSent, setHasSmsBeenSent] = useState(false);
  const toggleSmsSent = () => setHasSmsBeenSent(!hasSmsBeenSent);

  const {
    firstStep: firstStepSchema,
    secondStep: secondStepSchema,
    thirdStep: thirdStepSchema,
    fourthStep: fourthStepSchema,
    fifthStep: fifthStepSchema,
  } = schema();

  const {
    data: formData,
    handleChange,
    errors,
    validate,
  } = useForm({});

  const commonProps = {
    formData,
    handleChange,
    errors,
  };

  const STEP_MAPPER = {
    1: {
      step: <FirstStep {...commonProps} />,
      schema: firstStepSchema,
    },
    2: {
      step: <SecondStep {...commonProps} />,
      schema: secondStepSchema,
    },
    3: {
      step: <ThirdStep {...commonProps} hasSmsBeenSent={hasSmsBeenSent} toggleSmsSent={toggleSmsSent} />,
      schema: thirdStepSchema,
    },
    4: {
      step: <FourthStep {...commonProps} />,
      schema: fourthStepSchema,
    },
    5: {
      step: <FifthStep {...commonProps} />,
      schema: fifthStepSchema,
    },
  };

  const handleSubmit = () => {
    console.log('>> formData', formData);
  };

  const continueButtonCondition = [1, 3, 5].indexOf(activeStep) !== -1;

  return (
    <>
      <Button
        ariaLabel="back-to-signin"
        iconName="PiCaretLeftBold"
        iconSide="center"
        variant="secondary"
        onClick={() => (activeStep === 1 ? handlePhase(PHASE_SIGNIN_SOCIAL) : setActiveStep(activeStep - 1))}
        size="xs"
      />
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
                const isInvalid = await validate(STEP_MAPPER[activeStep].schema, { hasSmsBeenSent });
                if (!isInvalid) {
                  if (activeStep === 5) handleSubmit();
                  else setActiveStep(activeStep + 1);
                }
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
