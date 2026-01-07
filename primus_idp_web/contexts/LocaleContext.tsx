'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import enMessages from '../messages/en.json';

type Locale = 'en';

interface LocaleContextType {
  locale: Locale;
  messages: typeof enMessages;
  setLocale: (locale: Locale) => void;
}

const LocaleContext = createContext<LocaleContextType | undefined>(undefined);

const LOCALE_STORAGE_KEY = 'Primus IDP-locale';

export function LocaleProvider({ children }: { children: React.ReactNode }) {
  // Always start with 'en' to avoid hydration mismatch
  // Then sync with localStorage after mount
  const [locale, setLocaleState] = useState<Locale>('en');
  const [mounted, setMounted] = useState(false);

  // Only English is supported; reuse the preloaded messages
  const messages = enMessages;

  // Ensure the document language attribute is set consistently
  useEffect(() => {
    setMounted(true);
    if (typeof window !== 'undefined') {
      localStorage.setItem(LOCALE_STORAGE_KEY, 'en');
      document.documentElement.lang = 'en';
    }
  }, []);

  // Update locale state and persist (kept for API compatibility)
  const setLocale = () => {
    setLocaleState('en');
    if (typeof window !== 'undefined') {
      localStorage.setItem(LOCALE_STORAGE_KEY, 'en');
      document.documentElement.lang = 'en';
    }
  };

  // Set HTML lang attribute when locale changes
  useEffect(() => {
    if (typeof window !== 'undefined' && mounted) {
      document.documentElement.lang = locale;
    }
  }, [locale, mounted]);

  return (
    <LocaleContext.Provider value={{ locale, messages, setLocale }}>
      {children}
    </LocaleContext.Provider>
  );
}

export function useLocaleContext() {
  const context = useContext(LocaleContext);
  if (context === undefined) {
    throw new Error('useLocaleContext must be used within a LocaleProvider');
  }
  return context;
}



