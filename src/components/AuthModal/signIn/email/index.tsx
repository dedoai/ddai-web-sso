import { useTranslation } from 'react-i18next';
import { Button, Input } from '@dedo_ai/gui-com-lib';
import useForm from '@en1-gma/use-form';
import { useQuery } from '@tanstack/react-query';

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

  const primaryBrightColor = 'rgba(var(--color-primary-bright), 1)';

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
        variant="default"
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
        variant="default"
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
      <p
        className="text-center cursor-pointer"
        style={{
          color: primaryBrightColor,
        }}
      >
        {t(`${baseT}.forgotPassword`)}
      </p>
      <p
        className="text-center cursor-pointer"
        style={{
          color: primaryBrightColor,
        }}
      >
        {t(`${baseT}.havingTrouble`)}
      </p>
    </>
  );
};

export default EmailSignIn;
