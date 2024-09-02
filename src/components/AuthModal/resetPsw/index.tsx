import { useTranslation } from 'react-i18next';
import {
  Body2, Button, H2, Label,
} from '@dedo_ai/gui-com-lib';
import { useQuery } from '@tanstack/react-query';

import { apiPost } from '@/api';
import { EP_RESET_PASSWORD } from '@/api/const';
import FifthStep from '@/components/AuthModal/signUp/steps/fifthStep';
import NeedHelp from '@/components/NeedHelp';

import { IFormData } from '..';

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
  const baseT = 'authModal.resetPsw';
  const { t } = useTranslation();

  const {
    data,
    isFetching: isResettingPsw,
    refetch: resetPsw,
  } = useQuery({
    queryKey: ['resetPassword'],
    queryFn: async () => {
      const data = await apiPost(EP_RESET_PASSWORD, formData);

      return data;
    },
    enabled: false,
  });

  return (
    <>
      <H2 content="Create a New Password" />
      <Body2
        className="text-text-bright dark:text-text-gloomy"
        content="Enter your new password below to complete  the reset process. Ensure it’s strong and secure."
      />
      <FifthStep
        disabled={isResettingPsw}
        errors={errors}
        formData={formData}
        handleChange={handleChange}
        isResetPassword
      />
      <Button
        ariaLabel="reset-password"
        isLoading={isResettingPsw}
        text="Create New Password"
        onClick={async () => {
          const isInvalid = await validate({});

          if (!isInvalid) resetPsw();
        }}
      />
      <NeedHelp handlePhase={handlePhase} disabled={isResettingPsw} />
      <Label className="text-error-base text-center" content={data?.errMsg} />
    </>
  );
};

export default ResetPsw;
