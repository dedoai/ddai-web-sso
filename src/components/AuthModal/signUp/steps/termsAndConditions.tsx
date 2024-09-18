import { Trans, useTranslation } from 'react-i18next';
import {
  Body2,
  Body3,
  Checkbox,
  H2,
} from '@dedo_ai/gui-com-lib';

import { IFormData, PR_AGREE_PRIVACY_POLICY, PR_AGREE_TERMS_AND_CONDITIONS } from '@/consts';

export type TTermsAndConditions = {
  copy: string;
  updatedAt: string;
}

interface ITermsAndConditionsProps {
  errors: any;
  formData: IFormData['signup'];
  handleChange: (_key: string, _value: any) => void;
  termsAndConditions?: TTermsAndConditions;
}
const TermsAndConditions = ({
  errors,
  formData,
  handleChange,
  termsAndConditions,
}: ITermsAndConditionsProps) => {
  const baseT = 'authModal.signup';
  const { t } = useTranslation();

  const {
    copy: termsAndConditionsCopy,
    updatedAt,
  } = termsAndConditions ?? {};

  return (
    <>
      <div className="flex gap-3 items-center">
        <img alt="" src="/assets/termsAndConditions.gif" className="size-14" />
        <div>
          <H2 content={t(`${baseT}.termsOfServicesTitle`)} />
          <Body3
            content={t(`${baseT}.termsOfServicesDescription`, { date: updatedAt })}
            className="text-text-bright dark:text-text-gloomy"
          />
        </div>
      </div>
      <div className="relative bg-neutral-brighter w-full h-44 p-4 rounded-md overflow-y-scroll shadow-inner">
        <Body2 content={termsAndConditionsCopy} />
      </div>
      <Checkbox
        label={(
          <Trans
            i18nKey={`${baseT}.agreeTermsAndConditions`}
            components={{ span: <Body2 weight="medium" className="text-primary" /> }}
          />
        )}
        checked={formData[PR_AGREE_TERMS_AND_CONDITIONS]}
        error={errors?.['signup.agreeTermsAndConditions']}
        onChange={(e) => handleChange(`signup.${PR_AGREE_TERMS_AND_CONDITIONS}`, e.target.checked)}
      />
      <Checkbox
        className="shrink-0"
        checked={formData[PR_AGREE_PRIVACY_POLICY]}
        label={(
          <Trans
            i18nKey={`${baseT}.agreePrivacyPolicy`}
            components={{ span: <Body2 weight="medium" className="text-primary" /> }}
          />
        )}
        error={errors?.['signup.agreePrivacyPolicy']}
        onChange={(e) => handleChange(`signup.${PR_AGREE_PRIVACY_POLICY}`, e.target.checked)}
      />
    </>
  );
};

export default TermsAndConditions;
