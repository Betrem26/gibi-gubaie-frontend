'use client';

import { LANGUAGES, Language } from '@/lib/i18n';
import { Globe } from 'lucide-react';
import { useState, useEffect } from 'react';

export default function LanguageSwitcher() {
  const [language, setLanguageState] = useState<Language>('en');
  const [open, setOpen] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    // Load language from localStorage on mount
    const saved = localStorage.getItem('language') as Language | null;
    if (saved && Object.keys(LANGUAGES).includes(saved)) {
      setLanguageState(saved);
    }
    setMounted(true);
  }, []);

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
    localStorage.setItem('language', lang);
  };

  if (!mounted) {
    return null;
  }

  return (
    <div className="relative">
      <button
        onClick={() => setOpen(!open)}
        className="flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-slate-100 transition-colors text-sm font-medium text-slate-700"
        title="Change language"
      >
        <Globe size={16} />
        <span>{LANGUAGES[language].flag}</span>
        <span className="hidden sm:inline">{LANGUAGES[language].label}</span>
      </button>

      {open && (
        <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-slate-200 z-50">
          <div className="p-2">
            {(Object.entries(LANGUAGES) as [Language, typeof LANGUAGES.am][]).map(
              ([code, lang]) => (
                <button
                  key={code}
                  onClick={() => {
                    setLanguage(code);
                    setOpen(false);
                  }}
                  className={`w-full text-left px-3 py-2 rounded-lg transition-colors flex items-center gap-2 ${
                    language === code
                      ? 'bg-blue-100 text-blue-700 font-semibold'
                      : 'hover:bg-slate-100 text-slate-700'
                  }`}
                >
                  <span>{lang.flag}</span>
                  <div>
                    <div className="font-medium">{lang.name}</div>
                    <div className="text-xs text-slate-500">{lang.label}</div>
                  </div>
                </button>
              )
            )}
          </div>
        </div>
      )}
    </div>
  );
}
