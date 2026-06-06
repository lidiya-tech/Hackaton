import React from 'react';

export const LanguageSelector = ({ currentLang, onChangeLang }) => {
  const languages = [
    { code: 'am', label: 'አማ' },
    { code: 'om', label: 'Oro' },
    { code: 'ti', label: 'ትግ' },
    { code: 'en', label: 'EN' }
  ];

  return (
    <div className="flex items-center space-x-1 bg-[#085041] p-1 rounded-md border border-[#9FE1CB]/30">
      {languages.map((lang) => (
        <button
          key={lang.code}
          id={`lang-btn-${lang.code}`}
          onClick={() => onChangeLang(lang.code)}
          className={`px-3 py-1 rounded text-xs font-medium transition-all duration-200 ${
            currentLang === lang.code
              ? 'bg-[#1D9E75] text-white shadow-sm'
              : 'text-white/80 hover:text-white hover:bg-white/10'
          }`}
        >
          {lang.label}
        </button>
      ))}
    </div>
  );
};
