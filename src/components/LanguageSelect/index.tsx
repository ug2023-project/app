import { isLanguage, languages } from '@/types/Languages';
import { Select } from '@mantine/core';
import { useTranslation } from 'react-i18next';
import languageSource from './languageSource';

const LanguageSelect = () => {
  const { t, i18n } = useTranslation();
  const currentLanguage = isLanguage(i18n.language) ? i18n.language : 'en';
  const data = languages.map((language) => ({
    label: t(languageSource[language].label),
    value: language,
  }));
  return (
    <Select
      label={t('LanguageSelect_Label')}
      data={data}
      onChange={(value) => value && i18n.changeLanguage(value)}
      value={currentLanguage}
    />
  );
};

export default LanguageSelect;
