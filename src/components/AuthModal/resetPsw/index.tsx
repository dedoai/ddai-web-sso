import { useTranslation } from 'react-i18next';
import {
  Body2,
  Button,
  H2,
  Label,
} from '@dedo_ai/gui-com-lib';
import { useQuery } from '@tanstack/react-query';

import { apiPost } from '@/api';
import { EP_RESET_PASSWORD } from '@/api/const';
import CreatePasswordStep from '@/components/AuthModal/signUp/steps/createPasswordStep';
import NeedHelp from '@/components/NeedHelp';
import { type IFormData, PHASE_SUCCESS_RESET_PASSWORD } from '@/consts';

import schema from './validationSchema';

interface ResetPswProps {
  formData: IFormData['resetPassword'];
  handleChange: (key: string, value: string) => void;
  errors: any;
  validate: (schema: any, context?: any) => any;
  handlePhase: (_phase: string) => void;
}
const ResetPsw = ({
  formData,
  handleChange,
  errors,
  validate,
  handlePhase,
}: ResetPswProps) => {
  const { t } = useTranslation();
  const baseT = 'authModal.resetPassword';

  const {
    data,
    isFetching: isResettingPsw,
    refetch: resetPsw,
  } = useQuery({
    queryKey: ['resetPassword'],
    queryFn: async () => {
      const { data } = await apiPost(EP_RESET_PASSWORD, formData);

      if (data?.status === 'success') handlePhase(PHASE_SUCCESS_RESET_PASSWORD);

      return data;
    },
    enabled: false,
  });

  return (
    <>
      <H2 content={t(`${baseT}.createANewPassword`)} />
      <Body2
        className="text-text-bright dark:text-text-gloomy"
        content={t(`${baseT}.enterNewPasswordBelow`)}
      />
      <CreatePasswordStep
        disabled={isResettingPsw}
        errors={errors}
        formData={formData}
        handleChange={handleChange}
        isResetPassword
      />
      <Button
        ariaLabel="reset-password"
        isLoading={isResettingPsw}
        text={t(`${baseT}.createNewPassword`)}
        onClick={async () => {
          const isInvalid = await validate(schema());

          if (!isInvalid) resetPsw();
        }}
      />
      <NeedHelp handlePhase={handlePhase} disabled={isResettingPsw} />
      <Label className="text-error-base text-center" content={data?.errMsg} />
    </>
  );
};

export default ResetPsw;
