import React, { createContext, useContext, useState, useEffect } from 'react';
import { defaultTranslations, Translations, normalizeLanguageKey } from './translations.ts';

export interface LanguageOption {
  key: string;
  label: string;
  nativeLabel: string;
}

interface LanguageContextType {
  language: string;
  setLanguage: (lang: string) => void;
  addLanguage: (customLangName: string) => void;
  availableLanguages: LanguageOption[];
  t: Translations;
}

const DEFAULT_OPTIONS: LanguageOption[] = [
  { key: 'english', label: 'English', nativeLabel: 'English' },
  { key: 'hindi', label: 'Hindi', nativeLabel: 'हिन्दी' },
  { key: 'odia', label: 'Odia', nativeLabel: 'ଓଡ଼ିଆ' }
];

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [availableLanguages, setAvailableLanguages] = useState<LanguageOption[]>(() => {
    const savedList = localStorage.getItem('campusconnect_languages_list');
    if (savedList) {
      try {
        const parsed = JSON.parse(savedList);
        const allowed = ['english', 'hindi', 'odia'];
        return parsed.filter((opt: LanguageOption) => allowed.includes(opt.key));
      } catch {
        return DEFAULT_OPTIONS;
      }
    }
    return DEFAULT_OPTIONS;
  });

  const [language, setLanguageState] = useState<string>(() => {
    const saved = localStorage.getItem('campusconnect_lang');
    return saved ? normalizeLanguageKey(saved) : 'english';
  });

  const setLanguage = (lang: string) => {
    const normalized = normalizeLanguageKey(lang);
    setLanguageState(normalized);
    localStorage.setItem('campusconnect_lang', normalized);
  };

  const addLanguage = (customLangName: string) => {
    if (!customLangName.trim()) return;
    const normalized = normalizeLanguageKey(customLangName);
    
    // Check if already in list
    const exists = availableLanguages.some((opt) => opt.key === normalized);
    if (!exists) {
      let native = customLangName.trim();
      if (normalized === 'chinese') native = '中文 (Chinese)';
      const newOption: LanguageOption = {
        key: normalized,
        label: customLangName.trim(),
        nativeLabel: native
      };
      const updatedList = [...availableLanguages, newOption];
      setAvailableLanguages(updatedList);
      localStorage.setItem('campusconnect_languages_list', JSON.stringify(updatedList));
    }
    setLanguage(normalized);
  };

  useEffect(() => {
    document.documentElement.lang = language;
    document.documentElement.className = `lang-${language}`;
  }, [language]);

  // Compute translation object: look up dictionary, fallback to English with customized appName if unknown
  const activeTranslation: Translations = defaultTranslations[language] || {
    ...defaultTranslations.english,
    appName: `CampusConnect (${language.toUpperCase()})`,
    language: language.toUpperCase()
  };

  return (
    <LanguageContext.Provider
      value={{
        language,
        setLanguage,
        addLanguage,
        availableLanguages,
        t: activeTranslation
      }}
    >
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = (): LanguageContextType => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};
