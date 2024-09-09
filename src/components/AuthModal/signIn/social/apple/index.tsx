import { useTranslation } from 'react-i18next';
import { Button } from '@dedo_ai/gui-com-lib';

interface IAppleButton {
  isMinimalMode: boolean
  buttonId: string
}

const AppleButton = ({ isMinimalMode, buttonId }:IAppleButton) => {
  const baseT = 'authModal.social';
  const { t } = useTranslation();

  const handleLogin = () => {};
  return (
    <Button
      variant="secondary"
      key={buttonId}
      customIcon={<img src={`/assets/${buttonId}.svg`} alt={buttonId} />}
      ariaLabel={buttonId}
      size="lg"
      text={isMinimalMode ? '' : t(`${baseT}.apple`)}
      onClick={handleLogin}
    />
  );
};

export default AppleButton;
