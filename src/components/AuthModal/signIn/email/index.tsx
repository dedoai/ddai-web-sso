import { useTranslation } from 'react-i18next';
import { Body2, Button, Input } from '@dedo_ai/gui-com-lib';
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
        error={errors?.email?.message}
        onChange={(e) => handleChange('email', e.target.value)}
        placeholder={t(`${baseT}.email`)}
        type="email"
        value={email}
        disabled={isFetching}
      />
      <Input
        ariaLabel="password"
        error={errors?.password?.message}
        onChange={(e) => handleChange('password', e.target.value)}
        placeholder={t(`${baseT}.password`)}
        type="password"
        value={password}
        disabled={isFetching}
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
        className="text-center"
        text={t(`${baseT}.orSignInWith`)}
      />
      <SocialSignIn mode="minimal" />
    </>
  );
};

export default EmailSignIn;
