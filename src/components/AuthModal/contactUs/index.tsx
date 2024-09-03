import { useTranslation } from 'react-i18next';
import {
  Body2,
  Button, H2, Input, Label,
} from '@dedo_ai/gui-com-lib';
import { useQuery } from '@tanstack/react-query';

import { apiPost, recaptchaMiddleware } from '@/api';
import { EP_CONTACT_US } from '@/api/const';
import { IFormData, PHASE_RESET_PASSWORD, PHASE_SIGNIN_SOCIAL } from '@/components/AuthModal';

import schema from './validationSchema';

interface IContactUsProps {
  formData: IFormData['contactUs'],
  handleChange: (_key: string, _value: string) => void;
  errors: any;
  validate: (schema: any, context?: any) => boolean;
  handlePhase: (_phase: string) => void;
  isResetPassword?: boolean;
}
const ContactUs = ({
  formData,
  handleChange,
  errors,
  validate,
  handlePhase,
  isResetPassword,
}: IContactUsProps) => {
  const baseT = 'authModal.contactUs';
  const { t } = useTranslation();
  const {
    name,
    surname,
    email,
    message,
  } = formData;

  const {
    data,
    isFetching: isSubmitting,
    refetch: submit,
  } = useQuery({
    queryKey: ['contactUs'],
    queryFn: async () => {
      const action = 'CONTACT';
      const token = await recaptchaMiddleware(action);

      const data = await apiPost(EP_CONTACT_US, {
        client: `CLIENT_WEB_SSO_${import.meta.env.VITE_ENV}`,
        email,
        first_name: name,
        last_name: surname,
        message,
        recaptchaAction: action,
        recaptchaToken: token,
        subject: 'SSO_CONTACT',
      }, {}, true);

      return data;
    },
    enabled: false,
  });

  return (
    <>

      <Button
        ariaLabel="auth-modal-back"
        disabled={isSubmitting}
        iconName="PiCaretLeftBold"
        iconSide="center"
        onClick={() => handlePhase(isResetPassword ? PHASE_RESET_PASSWORD : PHASE_SIGNIN_SOCIAL)}
        size="xs"
        variant="secondary"
      />
      <H2 content={t(`${baseT}.title`)} />
      <Body2
        className="text-text-bright dark:text-text-gloomy"
        content={t(`${baseT}.description`)}
      />
      <Input
        disabled={isSubmitting}
        error={errors?.['contactUs.name']?.message}
        label={t(`${baseT}.name`)}
        mandatory
        onChange={(e) => handleChange('contactUs.name', e.target.value)}
        placeholder={t(`${baseT}.namePlaceholder`)}
        type="text"
        value={name}
      />
      <Input
        disabled={isSubmitting}
        error={errors?.['contactUs.surname']?.message}
        label={t(`${baseT}.surname`)}
        mandatory
        onChange={(e) => handleChange('contactUs.surname', e.target.value)}
        placeholder={t(`${baseT}.surnamePlaceholder`)}
        type="text"
        value={surname}
      />
      <Input
        disabled={isSubmitting}
        error={errors?.['contactUs.email']?.message}
        label={t(`${baseT}.email`)}
        mandatory
        onChange={(e) => handleChange('contactUs.email', e.target.value)}
        placeholder={t(`${baseT}.emailPlaceholder`)}
        type="email"
        value={email}
      />
      <Input
        disabled={isSubmitting}
        error={errors?.['contactUs.message']?.message}
        label={t(`${baseT}.message`)}
        mandatory
        onChange={(e) => handleChange('contactUs.message', e.target.value)}
        placeholder={t(`${baseT}.messagePlaceholder`)}
        type="textarea"
        value={message}
      />
      <Button
        ariaLabel="submit-contact"
        isLoading={isSubmitting}
        size="lg"
        text={t(`${baseT}.cta`)}
        onClick={async () => {
          const isInvalid = await validate(schema());

          if (!isInvalid) submit();
        }}
      />
      <Label content={data?.errMsg} className="text-error-base text-center" />
    </>
  );
};

export default ContactUs;
