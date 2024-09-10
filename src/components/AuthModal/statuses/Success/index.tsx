import { ReactNode } from 'react';
import { useTranslation } from 'react-i18next';
import { Body2, H2 } from '@dedo_ai/gui-com-lib';

import NeedHelp from '@/components/NeedHelp';
import { PHASE_SUCCESS_ACCOUNT_CREATION, PHASE_SUCCESS_RESET_PASSWORD, PHASE_SUCCESS_RESET_PASSWORD_SENT } from '@/consts';
import { theme } from '@/utils';

import accountCreationGifDark from './assets/success-account-creation-dark.gif';
import accountCreationGifLight from './assets/success-account-creation-light.gif';
import resetPasswordGifDark from './assets/success-reset-password-dark.gif';
import resetPasswordGifLight from './assets/success-reset-password-light.gif';
import resetPasswordSentGifDark from './assets/success-reset-password-sent-dark.gif';
import resetPasswordSentGifLight from './assets/success-reset-password-sent-light.gif';

const GIF_MAPPER = {
  [PHASE_SUCCESS_ACCOUNT_CREATION]: {
    light: accountCreationGifLight,
    dark: accountCreationGifDark,
  },
  [PHASE_SUCCESS_RESET_PASSWORD_SENT]: {
    light: resetPasswordSentGifLight,
    dark: resetPasswordSentGifDark,
  },
  [PHASE_SUCCESS_RESET_PASSWORD]: {
    light: resetPasswordGifLight,
    dark: resetPasswordGifDark,
  },
};

interface ISuccessProps {
  handlePhase: (phase: string) => void;
  phase: string;
  translationNamespace: string;
  actions: ReactNode[];
}
const Success = ({
  handlePhase,
  phase,
  translationNamespace,
  actions,
}: ISuccessProps) => {
  const { t } = useTranslation();

  return (
    <>
      <img src={GIF_MAPPER[phase][theme]} alt="Success" className="size-[150px] mx-auto mb-4" />
      <H2 content={t(`${translationNamespace}.title`)} className="text-center" />
      <Body2
        content={t(`${translationNamespace}.description`)}
        className="text-text-bright dark:text-text-gloomy text-justify px-7 mb-4"
      />
      { actions }
      <NeedHelp handlePhase={handlePhase} />
    </>

  );
};

export default Success;
