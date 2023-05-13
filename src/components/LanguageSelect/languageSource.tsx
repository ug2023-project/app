import { Language } from '@/types/Languages';
import Poland from './Poland';
import England from './England';

const languageSource: Record<Language, LanguageSource> = {
  en: {
    value: 'en',
    label: 'LanguageLabel_English',
    icon: <England />,
  },
  pl: {
    value: 'pl',
    label: 'LanguageLabel_Polish',
    icon: <Poland />,
  },
};

type LanguageSource = {
  value: string;
  label: string;
  icon?: React.ReactNode;
};

export default languageSource;
