import { useTranslation } from 'react-i18next';
import { Body2, Button, H2 } from '@dedo_ai/gui-com-lib';

import NeedHelp from '@/components/NeedHelp';
import { theme } from '@/utils';

import successGifDark from './success-account-creation-dark.gif';
import successGifLight from './success-account-creation-light.gif';

const GIF_MAPPER = {
  light: successGifLight,
  dark: successGifDark,
};

interface ISuccessAccountCreationProps {
  handlePhase: (phase: string) => void;
}
const SuccessAccountCreation = ({
  handlePhase,
}: ISuccessAccountCreationProps) => {
  const baseT = 'authModal.signup.successAccountCreation';
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
        ariaLabel="verify-identity"
        text={t(`${baseT}.verifyIdentity`)}
        variant="secondary"
        size="xl"
      />
      <Button
        ariaLabel="verify-identity"
        text={t(`${baseT}.exploreDedoai`)}
        size="xl"
      />
      <NeedHelp handlePhase={handlePhase} />
    </>
  );
};

export default SuccessAccountCreation;
