import { useTranslation } from 'react-i18next';
import {
  Body2, Button, H2, Icon, Input,
  Label,
} from '@dedo_ai/gui-com-lib';
import { useQuery } from '@tanstack/react-query';

import { apiPost } from '@/api';
import { EP_RESET_PASSWORD } from '@/api/const';
import NeedHelp from '@/components/NeedHelp';

import { IFormData, PHASE_SIGNIN_EMAIL } from '..';

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
      const data = await apiPost(EP_RESET_PASSWORD, { email });
      return data;
    },
    enabled: false,
  });

  return (
    <>
      <Button
        ariaLabel="back-button"
        iconSide="center"
        iconName="PiCaretLeft"
        variant="secondary"
        size="sm"
        onClick={() => {
          handlePhase(PHASE_SIGNIN_EMAIL);
          handleChange('forgotPassword.email', '');
        }}
      />
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
