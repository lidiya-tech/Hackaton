import React, { useState } from 'react';
import { LanguageSelector } from './LanguageSelector';
import { TRANSLATIONS } from '../utils/translations';
import { Menu, X, LogOut } from 'lucide-react';

export const Navbar = ({ currentLang, onChangeLang, activeRoute, onNavigate, currentUser, onLogout }) => {
  const [isOpen, setIsOpen] = useState(false);
  const t = TRANSLATIONS[currentLang];

  const menuItems = [
    { label: t.home, route: '#home' },
    { label: t.howItWorks, route: '#how-it-works' },
    { label: t.community, route: '#community' },
    { label: t.mindFuel, route: '#mindfuel', hasBadge: true },
    { label: t.discover, route: '#discover', hasBadge: true },
    { label: currentLang === 'en' ? 'Entertainment' : currentLang === 'am' ? 'መዝናኛ' : currentLang === 'om' ? 'Bashannana' : 'መዘናግዒ', route: '#entertainment' },
    { label: currentLang === 'en' ? 'Music' : currentLang === 'am' ? 'ሙዚቃ' : currentLang === 'om' ? 'Muziqaa' : 'ሙዚቃ', route: '#music', hasBadge: true },
    { label: t.pricing, route: '#pricing' }
  ];

  const handleLinkClick = (route) => {
    onNavigate(route);
    setIsOpen(false);
  };

  return (
    <nav className="sticky top-0 z-50 bg-[#085041] border-b border-[#9FE1CB]/20 text-white shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex-shrink-0 flex items-center cursor-pointer space-x-1.5" onClick={() => handleLinkClick('#home')}>
            <span className="text-xl sm:text-2xl">🌳</span>
            <div className="flex flex-col text-left leading-none">
              <span className="font-heading text-[#7EDC8B] font-bold text-base sm:text-lg">ዋርካ</span>
              <span className="font-sans text-[10px] text-white tracking-widest uppercase">Warka</span>
            </div>
          </div>

          {/* Desktop Menu */}
          <div className="hidden lg:flex items-center space-x-1 xl:space-x-2">
            {menuItems.map((item) => (
              <a
                key={item.route}
                href={item.route}
                onClick={(e) => {
                  e.preventDefault();
                  handleLinkClick(item.route);
                }}
                className={`relative px-2 py-2 rounded-md text-xs xl:text-sm font-medium transition-colors duration-150 ${
                  activeRoute === item.route
                    ? 'text-white bg-[#1D9E75]/30 border-b-2 border-[#1D9E75]'
                    : 'text-white/80 hover:text-white hover:bg-white/5'
                }`}
              >
                {item.label}
                {item.hasBadge && (
                  <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-[#1D9E75] rounded-full ring-1 ring-white" />
                )}
              </a>
            ))}
          </div>

          {/* Right Action & Lang Selector */}
          <div className="hidden lg:flex items-center space-x-3">
            <LanguageSelector currentLang={currentLang} onChangeLang={onChangeLang} />
            <button
              id="navbar-cta-btn"
              onClick={() => handleLinkClick('#check-in')}
              className="bg-[#1D9E75] hover:bg-[#1D9E75]/90 text-white px-4 py-2 rounded-md text-xs font-semibold uppercase tracking-wider transition-colors duration-150 shadow-sm border border-[#9FE1CB]/40 animate-pulse-soft"
            >
              {t.checkInCTA}
            </button>
            {currentUser && (
              <button
                onClick={onLogout}
                className="bg-red-600 hover:bg-red-750 text-white px-3 py-2 rounded-md text-xs font-semibold flex items-center shadow-xs border border-red-500/20 transition-all cursor-pointer"
              >
                <LogOut className="w-3.5 h-3.5 mr-1" />
                {currentLang === 'en' ? 'Log Out' : 'ውጣ'}
              </button>
            )}
          </div>

          {/* Mobile Menu Button */}
          <div className="flex lg:hidden items-center space-x-2">
            <LanguageSelector currentLang={currentLang} onChangeLang={onChangeLang} />
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-white/80 hover:text-white hover:bg-white/10 focus:outline-none"
            >
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer */}
      {isOpen && (
        <div className="lg:hidden bg-[#085041] border-t border-[#9FE1CB]/10 px-2 pt-2 pb-4 space-y-1 shadow-inner">
          {menuItems.map((item) => (
            <a
              key={item.route}
              href={item.route}
              onClick={(e) => {
                e.preventDefault();
                handleLinkClick(item.route);
              }}
              className={`block px-3 py-2.5 rounded-md text-base font-medium transition-colors ${
                activeRoute === item.route
                  ? 'bg-[#1D9E75] text-white'
                  : 'text-white/85 hover:bg-white/5 hover:text-white'
              }`}
            >
              <div className="flex items-center justify-between">
                <span>{item.label}</span>
                {item.hasBadge && (
                  <span className="w-2.5 h-2.5 bg-[#1D9E75] rounded-full ring-2 ring-[#085041]" />
                )}
              </div>
            </a>
          ))}
          <div className="pt-4 pb-2 border-t border-[#9FE1CB]/10 space-y-2">
            <button
              onClick={() => handleLinkClick('#check-in')}
              className="w-full bg-[#1D9E75] text-white text-center py-3 rounded-md font-semibold text-sm uppercase tracking-wider shadow-md hover:bg-[#1D9E75]/90 block"
            >
              {t.checkInCTA}
            </button>
            {currentUser && (
              <button
                onClick={onLogout}
                className="w-full bg-red-650 hover:bg-red-700 text-white text-center py-3 rounded-md font-semibold text-sm uppercase tracking-wider shadow-md flex items-center justify-center gap-1.5"
              >
                <LogOut className="w-4 h-4" />
                {currentLang === 'en' ? 'Log Out' : 'ውጣ'}
              </button>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};
