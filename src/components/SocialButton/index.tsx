import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Button } from '@dedo_ai/gui-com-lib';

export interface ISocialButtonProps {
  id: string;
  initCb?: () => void;
  isMinimalMode?: boolean;
  loginCb?: () => void;
}
export const SocialButton = ({
  id,
  initCb,
  isMinimalMode = false,
  loginCb,
}: ISocialButtonProps) => {
  const baseT = 'authModal.social';
  const { t } = useTranslation();

  useEffect(() => initCb?.(), []);

  return (
    <Button
      ariaLabel={id}
      customIcon={<img src={`/assets/${id}.svg`} alt={id} />}
      key={id}
      onClick={loginCb}
      size="lg"
      text={isMinimalMode ? '' : t(`${baseT}.${id.split('-')?.[0]}`)}
      variant="secondary"
    />
  );
};

export default SocialButton;
