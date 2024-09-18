import { useTranslation } from 'react-i18next';
import {
  Body2,
  Button,
  Checkbox,
  Icon,
  Input,
  Label,
} from '@dedo_ai/gui-com-lib';
import { useQuery } from '@tanstack/react-query';

import { apiPost, EP_LOGIN } from '@/api';
import SocialSignIn from '@/components/AuthModal/signIn/social';
import NeedHelp from '@/components/NeedHelp';
import { type IFormData, PHASE_FORGOT_PASSWORD } from '@/consts';

import schema from './validationSchemas';

interface IEmailSignInProps {
  errors: any;
  formData: IFormData['signin'];
  handleChange: (_key: string, _value: string) => void;
  handlePhase: (_phase: string) => void;
  validate: (schema: any, context?: any) => boolean;
}
export const EmailSignIn = ({
  errors,
  formData,
  handleChange,
  validate,
  handlePhase,
}: IEmailSignInProps) => {
  const baseT = 'authModal.signin';
  const { t } = useTranslation();

  const {
    email,
    password,
  } = formData ?? {};

  const {
    data,
    isFetching: isLoggingIn,
    refetch: doLogin,
  } = useQuery({
    queryKey: ['login'],
    queryFn: async () => {
      const { data } = await apiPost({ url: EP_LOGIN, data: { email, password } });

      return data;
    },
    enabled: false,
  });

  return (
    <>
      <Input
        ariaLabel="email"
        disabled={isLoggingIn}
        error={errors?.['signin.email']?.message}
        label={t(`${baseT}.email`)}
        mandatory
        onChange={(e) => handleChange('signin.email', e.target.value)}
        placeholder={t(`${baseT}.email`)}
        prefix={<Icon iconName="PiUserCircle" />}
        type="email"
        value={email}
      />
      <Input
        ariaLabel="password"
        disabled={isLoggingIn}
        error={errors?.['signin.password']?.message}
        label={t(`${baseT}.password`)}
        mandatory
        onChange={(e) => handleChange('signin.password', e.target.value)}
        placeholder={t(`${baseT}.password`)}
        prefix={<Icon iconName="PiLock" />}
        type="password"
        value={password}
        auxiliary={(
          <Body2
            className="text-primary cursor-pointer"
            content={t(`${baseT}.forgotPassword`)}
            onClick={() => handlePhase(PHASE_FORGOT_PASSWORD)}
          />
        )}
      />
      <Checkbox
        size="sm"
        label={t(`${baseT}.rememberMe`)}
        labelClassName="text-neutral-bright dark:text-text-gloomy"
        disabled={isLoggingIn}
      />
      <Button
        size="lg"
        ariaLabel="log-in"
        text={t(`${baseT}.login`)}
        isLoading={isLoggingIn}
        onClick={async () => {
          const isInvalid = await validate(schema());
          if (!isInvalid) doLogin();
        }}
      />
      <Body2
        className="text-center text-text-bright dark:text-text-gloomy"
        content={t(`${baseT}.orSignInWith`)}
      />
      <SocialSignIn mode="minimal" />
      <NeedHelp handlePhase={handlePhase} />
      <Label content={data?.errMsg} className="text-error-base text-center" />
    </>
  );
};

export default EmailSignIn;
