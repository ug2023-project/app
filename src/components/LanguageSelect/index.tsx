import { isLanguage, languages } from '@/types/Languages';
import { Select, Text, Divider } from '@mantine/core';
import { useTranslation } from 'react-i18next';
import languageSource from './languageSource';

import styles from './LanguageSelect.module.css';
import { forwardRef } from 'react';

const LanguageOption = forwardRef<
  HTMLDivElement,
  { value: string; label: string; icon?: React.ReactNode }
>(({ label, icon, ...rest }, ref) => (
  <div
    ref={ref}
    {...rest}
    className="flex items-center gap-3 gap-3 bg-main-400 py-2 font-semibold text-[#00175b] hover:bg-main-500"
  >
    <Text size="sm">{label}</Text>
    {icon}
    <Divider size="sm" />
  </div>
));

const LanguageSelect = () => {
  const { t, i18n } = useTranslation();
  const currentLanguage = isLanguage(i18n.language) ? i18n.language : 'en';
  const data = languages.map((language) => ({
    label: t(languageSource[language].label),
    icon: languageSource[language].icon,
    value: language,
  }));

  const currentLanguageIcon = languageSource[currentLanguage].icon;

  return (
    <Select
      data={data}
      onChange={(value) => value && i18n.changeLanguage(value)}
      value={currentLanguage}
      itemComponent={LanguageOption}
      className={styles.languageSelect}
      icon={currentLanguageIcon}
    />
  );
};

export default LanguageSelect;
