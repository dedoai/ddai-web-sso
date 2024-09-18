import { useTranslation } from 'react-i18next';
import {
  Body2,
  Button,
  H2,
  Icon,
  Input,
  Label,
} from '@dedo_ai/gui-com-lib';
import { useQuery } from '@tanstack/react-query';

import { apiPost, EP_RESET_PASSWORD, recaptchaMiddleware } from '@/api';
import NeedHelp from '@/components/NeedHelp';
import { type IFormData, PHASE_SUCCESS_RESET_PASSWORD_SENT } from '@/consts';

import schema from './validationSchema';

interface IForgotPasswordProps {
  errors: any;
  formData: IFormData['forgotPassword'];
  handleChange: (_key: string, _value: string) => void;
  handlePhase: (phase: string) => void;
  validate: (schema: any, context?: any) => boolean;
}
export const ForgotPassword = ({
  errors,
  formData,
  handleChange,
  handlePhase,
  validate,
}: IForgotPasswordProps) => {
  const baseT = 'authModal.forgotPassword';
  const { t } = useTranslation();

  const { email } = formData;

  const {
    data,
    isFetching: isSendingRequest,
    refetch: sendRequest,
  } = useQuery({
    queryKey: ['forgotPassword'],
    queryFn: async () => {
      const action = 'FORGOT_PASSWORD';

      const token = await recaptchaMiddleware(action);

      const { data } = await apiPost({
        url: EP_RESET_PASSWORD,
        data: {
          client: `CLIENT_WEB_SSO_${import.meta.env.VITE_ENV}`,
          email,
          recaptchaAction: action,
          recaptchaToken: token,
        },
      });

      handlePhase(PHASE_SUCCESS_RESET_PASSWORD_SENT);

      return data;
    },
    enabled: false,
  });

  return (
    <>
      <H2 content={t(`${baseT}.title`)} />
      <Body2 content={t(`${baseT}.description`)} className="text-text-bright dark:text-text-gloomy" />
      <Input
        ariaLabel="email"
        disabled={isSendingRequest}
        error={errors?.['forgotPassword.email']?.message}
        label={t(`${baseT}.email`)}
        mandatory
        onChange={(e) => handleChange('forgotPassword.email', e.target.value)}
        placeholder={t(`${baseT}.emailPlaceholder`)}
        prefix={<Icon iconName="PiUserCircle" />}
        type="email"
        value={email}
      />
      <Button
        ariaLabel="reset-password"
        text={t(`${baseT}.cta`)}
        size="lg"
        isLoading={isSendingRequest}
        onClick={async () => {
          const isInvalid = await validate(schema());

          if (!isInvalid) sendRequest();
        }}
      />
      <NeedHelp handlePhase={handlePhase} />
      <Label content={data?.errMsg} className="text-error-base text-center" />
    </>
  );
};

export default ForgotPassword;
