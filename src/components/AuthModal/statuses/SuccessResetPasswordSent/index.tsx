import { useTranslation } from 'react-i18next';
import { Body2, Button, H2 } from '@dedo_ai/gui-com-lib';

import NeedHelp from '@/components/NeedHelp';
import { theme } from '@/utils';

import successGifDark from './success-reset-password-sent-dark.gif';
import successGifLight from './success-reset-password-sent-light.gif';

const GIF_MAPPER = {
  light: successGifLight,
  dark: successGifDark,
};

interface ISuccessResetPasswordSentProps {
  handlePhase: (phase: string) => void;
}
const SuccessResetPasswordSent = ({
  handlePhase,
}: ISuccessResetPasswordSentProps) => {
  const baseT = 'authModal.forgotPassword.successResetPasswordSent';
  const { t } = useTranslation();

  return (
    <>
      <img src={GIF_MAPPER[theme]} alt="Success" className="size-[150px] mx-auto mb-4" />
      <H2 content={t(`${baseT}.title`)} className="text-center" />
      <Body2
        content={t(`${baseT}.description`)}
        className="text-text-bright dark:text-text-gloomy text-justify px-7 mb-4"
      />
      <Button
        ariaLabel="go-back-home"
        text={t(`${baseT}.goBackHome`)}
        size="xl"
      />
      <NeedHelp handlePhase={handlePhase} />
    </>
  );
};

export default SuccessResetPasswordSent;
