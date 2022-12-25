import { Language } from '@/types/Languages';

const languageSource: Record<Language, LanguageSource> = {
  en: {
    value: 'en',
    label: 'LanguageLabel_English',
  },
  pl: {
    value: 'pl',
    label: 'LanguageLabel_Polish',
  },
};

type LanguageSource = {
  value: string;
  label: string;
  icon?: string;
};

export default languageSource;
