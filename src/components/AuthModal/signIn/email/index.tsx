import { useTranslation } from 'react-i18next';
import {
  Body2,
  Button, Checkbox, Icon, Input,
} from '@dedo_ai/gui-com-lib';
import useForm from '@en1-gma/use-form';
import { useQuery } from '@tanstack/react-query';

import SocialSignIn from '@/components/AuthModal/signIn/social';

import schema from './validationSchemas';

export const EmailSignIn = () => {
  const baseT = 'authModal.signin';
  const { t } = useTranslation();

  const {
    data: formData,
    handleChange,
    errors,
    validate,
  } = useForm({});

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
        error={errors?.email?.message}
        label={t(`${baseT}.email`)}
        onChange={(e) => handleChange('email', e.target.value)}
        placeholder={t(`${baseT}.email`)}
        prefix={<Icon iconName="PiUserCircle" />}
        type="email"
        value={email}
      />
      <Input
        ariaLabel="password"
        disabled={isFetching}
        error={errors?.password?.message}
        label={t(`${baseT}.password`)}
        onChange={(e) => handleChange('password', e.target.value)}
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
      <div className="inline-flex gap-2 items-center">
        <Checkbox size="sm" />
        <Body2
          className="text-neutral-bright dark:text-text-gloomy"
          content={t(`${baseT}.rememberMe`)}
          weight="medium"
        />
      </div>
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
      <Body2
        className="inline-flex gap-1 justify-center text-neutral-base"
      >
        {t('authModal.signup.needHelp')}
        <Body2 as="span" className="text-primary cursor-pointer" content={t('authModal.signup.contactUs')} weight="medium" />
      </Body2>
    </>
  );
};

export default EmailSignIn;
