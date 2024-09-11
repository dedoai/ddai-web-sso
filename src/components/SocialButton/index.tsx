import { useEffect } from 'react';
import { useScript } from 'react-apple-signin-auth';
import { useTranslation } from 'react-i18next';
import { Button } from '@dedo_ai/gui-com-lib';
import { type UseGoogleLoginOptionsImplicitFlow, useGoogleLogin } from '@react-oauth/google';
import { isEmpty } from 'lodash';

const HOOKS_MAPPER = {
  'apple-hook': useScript,
  'google-hook': useGoogleLogin,
};

type HookCall = {
  args: UseGoogleLoginOptionsImplicitFlow | string;
  name: string;
  overloadLoginCb?: boolean;
}
export interface ISocialButtonProps {
  id: string;
  initCb?: () => void;
  initHookCb?: () => HookCall;
  isMinimalMode?: boolean;
  loginCb?: () => void;
}
export const SocialButton = ({
  id,
  initCb,
  isMinimalMode = false,
  loginCb,
  initHookCb,
}: ISocialButtonProps) => {
  const baseT = 'authModal.social';
  const { t } = useTranslation();

  const hookConfig = initHookCb?.();

  if (!isEmpty(hookConfig)) {
    const {
      args,
      name,
      overloadLoginCb = false,
    } = hookConfig;

    const res = HOOKS_MAPPER[name](args);

    if (overloadLoginCb) loginCb = res;
  }

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
