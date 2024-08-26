import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Button } from '@dedo_ai/gui-com-lib';
import useForm from '@en1-gma/use-form';
import { Swiper, SwiperSlide } from 'swiper/react';

import { PHASE_SIGNIN_SOCIAL } from '..';

import FifthStep from './steps/fifthStep';
import FirstStep from './steps/firstStep';
import FourthStep from './steps/fourthStep';
import SecondStep from './steps/secondStep';
import ThirdStep from './steps/thirdStep';
import Slide from './Slide';
import SlideControl from './SlideControl';
import schema from './validationSchemas';

import 'swiper/css';
import './style.css';

export const SLIDES_COUNT = 3;
interface ISignUpProps {
  handlePhase: (_phase: string) => void;
}
export const SignUp = ({
  handlePhase,
}: ISignUpProps) => {
  const baseT = 'authModal.signup';
  const { t } = useTranslation();

  const [activeStep, setActiveStep] = useState(1);
  const [activeSlide, setActiveSlide] = useState(1);
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

  return (
    <div className="flex gap-4 h-[70vh]">
      <div className="left-col">
        <Button
          ariaLabel="back-to-signin"
          iconName="PiCaretLeftBold"
          iconSide="center"
          variant="tertiary"
          onClick={() => (activeStep === 1 ? handlePhase(PHASE_SIGNIN_SOCIAL) : setActiveStep(activeStep - 1))}
          size="sm"
          className="mb-8"
        />
        {STEP_MAPPER[activeStep].step}
        <Button
          ariaLabel="next-step"
          text={t(`${baseT}.${activeStep === 5 ? 'createAccount' : 'nextStep'}`)}
          size="lg"
          className="mt-8 w-full"
          onClick={async () => {
            const isInvalid = await validate(STEP_MAPPER[activeStep].schema, { hasSmsBeenSent });
            if (!isInvalid) {
              if (activeStep === 5) handleSubmit();
              else setActiveStep(activeStep + 1);
            }
          }}
        />
        <p className="text-center font-light mt-12 text-sm">
          {t(`${baseT}.needHelp`)}
          &nbsp;
          <span className="text-primary-bright cursor-pointer font-normal">
            {t(`${baseT}.contactUs`)}
          </span>
        </p>
      </div>

      <Swiper
        slidesPerView={1}
        style={{ width: '50vw', borderRadius: '12px' }}
        loop
        onActiveIndexChange={({ realIndex }) => setActiveSlide(realIndex + 1)}
        className="swiper-no-swiping"
      >
        {
          Array.from(Array(SLIDES_COUNT))
            .map((_, index) => (
              <SwiperSlide key={`slide-${index}`}>
                <Slide index={index} />
              </SwiperSlide>
            ))
        }
        <div className="content">
          <h2>{t(`${baseT}.slides.${activeSlide}.title`)}</h2>
          <p>{t(`${baseT}.slides.${activeSlide}.body`)}</p>
          <SlideControl activeSlide={activeSlide} />
        </div>
      </Swiper>
    </div>
  );
};

export default SignUp;
