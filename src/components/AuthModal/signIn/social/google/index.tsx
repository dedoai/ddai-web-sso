import { useTranslation } from 'react-i18next';
import { Button } from '@dedo_ai/gui-com-lib';

interface IGoogleButton {
  isMinimalMode: boolean
}

const GoogleButton = ({ isMinimalMode }:IGoogleButton) => {
  const baseT = 'authModal.social';
  const { t } = useTranslation();

  const buttonId = 'google';
  const handleLogin = () => {};
  return (
    <Button
      variant="secondary"
      key={buttonId}
      customIcon={<img src={`/assets/${buttonId}.svg`} alt={buttonId} />}
      ariaLabel={buttonId}
      size="lg"
      text={isMinimalMode ? '' : t(`${baseT}.${buttonId}`)}
      onClick={handleLogin}
    />
  );
};

export default GoogleButton;
