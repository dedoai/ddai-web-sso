import { useTranslation } from 'react-i18next';
import {
  Body2,
  Button, Checkbox, Icon, Input,
} from '@dedo_ai/gui-com-lib';
import { useQuery } from '@tanstack/react-query';

import { type IFormData } from '@/components/AuthModal';
import SocialSignIn from '@/components/AuthModal/signIn/social';
import NeedHelp from '@/components/NeedHelp';

import schema from './validationSchemas';

interface IEmailSignInProps {
  errors: any;
  formData: IFormData['signin'];
  handleChange: (_key: string, _value: string) => void;
  validate: (schema: any, context?: any) => boolean;
}
export const EmailSignIn = ({
  errors,
  formData,
  handleChange,
  validate,
}: IEmailSignInProps) => {
  const baseT = 'authModal.signin';
  const { t } = useTranslation();

  const {
    email,
    password,
  } = formData ?? {};

  const { isFetching, refetch: doLogin } = useQuery({
    queryKey: ['login'],
    queryFn: async () => {
      const wait = (t) => new Promise((res) => { setTimeout(res, t); });
      return wait(5000);
    },
    enabled: false,
  });

  return (
    <>
      <Input
        ariaLabel="email"
        disabled={isFetching}
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
        disabled={isFetching}
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
          />
        )}
      />
      <Checkbox
        size="sm"
        label={t(`${baseT}.rememberMe`)}
        labelClassName="text-neutral-bright dark:text-text-gloomy"
      />
      <Button
        size="lg"
        ariaLabel="log-in"
        text={t(`${baseT}.login`)}
        isLoading={isFetching}
        onClick={async () => {
          const isInvalid = await validate(schema());
          if (!isInvalid) doLogin();
        }}
      />
      <Body2
        className="text-center text-neutral-base"
        content={t(`${baseT}.orSignInWith`)}
      />
      <SocialSignIn mode="minimal" />
      <NeedHelp />
    </>
  );
};

export default EmailSignIn;
