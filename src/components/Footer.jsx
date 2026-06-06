import React from 'react';
import { TRANSLATIONS } from '../utils/translations';
import { EXTRA_TRANSLATIONS } from '../utils/extraTranslations';

export const Footer = ({ currentLang, onNavigate }) => {
  const t = TRANSLATIONS[currentLang];
  const ext = EXTRA_TRANSLATIONS[currentLang] || EXTRA_TRANSLATIONS.en;

  const taglineTexts = {
    en: "Reimagining wellness through culturally-intelligent technology and local communal bonds.",
    am: "የአእምሮ እና የአካላዊ ጤናን በቴክኖሎጂ እና በአገር በቀል ማህበራዊ ትስስር ማጎልበት።",
    om: "Fayyummaa sammuu fi qaamaa tekinoolojii fi hawaasummaa aadaatiin cimsuu.",
    ti: "ጥዕና ኣእምሮን ሰብነትን ብቴክኖሎጂን ብባህላዊ ማሕበረሰባዊ ትስስርን ምምዕባል"
  };

  const crisisLabels = {
    en: "Crisis Support",
    am: "የአደጋ ጊዜ ድጋፍ",
    om: "Deeggarsa Balaa Tasaa",
    ti: "ህጹጽ ደገፍ ጥዕና"
  };

  const tollFreeLabels = {
    en: "952 (Toll Free)",
    am: "952 (ነጻ የስልክ መስመር)",
    om: "952 (Bilbila Bilisaa)",
    ti: "952 (ነጻ መስመር ደውሉ)"
  };

  return (
    <footer className="bg-[#444441] text-[#F1EFE8] border-t border-black/10 py-10 mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          {/* Column 1: Info */}
          <div>
            <div className="flex items-center mb-3">
              <span className="text-2xl mr-2">🌳</span>
              <span className="font-semibold text-lg text-white">{t.brand}</span>
            </div>
            <p className="text-xs text-[#F1EFE8]/70 leading-relaxed max-w-sm">
              {t.tagline}. {taglineTexts[currentLang] || taglineTexts.en}
            </p>
          </div>

          {/* Column 2: Navigation Links */}
          <div>
            <h4 className="text-xs font-semibold text-white uppercase tracking-wider mb-3">
              {ext.sitemap || "Sitemap"}
            </h4>
            <div className="grid grid-cols-2 gap-2 text-xs text-[#F1EFE8]/80">
              <a href="#home" onClick={() => onNavigate('#home')} className="text-gray-300 hover:text-white transition-colors">{t.home}</a>
              <a href="#how-it-works" onClick={() => onNavigate('#how-it-works')} className="text-gray-300 hover:text-white transition-colors">{t.howItWorks}</a>
              <a href="#community" onClick={() => onNavigate('#community')} className="text-gray-300 hover:text-white transition-colors">{t.community}</a>
              <a href="#mindfuel" onClick={() => onNavigate('#mindfuel')} className="text-gray-300 hover:text-white transition-colors">{t.mindFuel}</a>
              <a href="#discover" onClick={() => onNavigate('#discover')} className="text-gray-300 hover:text-white transition-colors">{t.discover}</a>
              <a href="#pricing" onClick={() => onNavigate('#pricing')} className="text-gray-300 hover:text-white transition-colors">{t.pricing}</a>
            </div>
          </div>

          {/* Column 3: Emergency Helpline Info */}
          <div className="bg-[#085041]/30 border border-[#9FE1CB]/10 p-4 rounded-lg">
            <h4 className="text-xs font-semibold text-red-400 uppercase tracking-wider mb-2 flex items-center">
              <span className="mr-1.5">🚨</span>
              {crisisLabels[currentLang] || crisisLabels.en}
            </h4>
            <p className="text-xs text-[#F1EFE8]/80 leading-relaxed">
              {t.footerNote}
            </p>
            <div className="mt-3 flex items-center">
              <span className="text-lg mr-1.5">📞</span>
              <a href="tel:952" className="text-sm font-bold text-white hover:underline">
                {tollFreeLabels[currentLang] || tollFreeLabels.en}
              </a>
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-[#F1EFE8]/10 pt-6 flex flex-col sm:flex-row items-center justify-between text-xs text-[#F1EFE8]/50">
          <p>{t.rightsReserved}</p>
          <div className="mt-2 sm:mt-0 flex space-x-4">
            <span>ALX Ethiopia 2026</span>
            <span>Kuriftu Resorts</span>
            <span>WeVaSphere</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
