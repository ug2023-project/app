export const languages = ['en', 'pl'] as const;

const languagesSet = new Set<string>(languages);

export type Language = (typeof languages)[number];

export const isLanguage = (language: string): language is Language =>
  languagesSet.has(language);
