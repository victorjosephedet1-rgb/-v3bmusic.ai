import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Globe, Check } from 'lucide-react';
// v2.0 - Emoji flags enabled

interface Language {
  code: string;
  name: string;
  nativeName: string;
  flag: string;
  region: string;
  continent: string;
}

const languages: Language[] = [
  { code: 'en', name: 'English', nativeName: 'English', flag: 'https://flagcdn.com/w40/gb.png', region: 'Global', continent: 'Global' },
  { code: 'es', name: 'Spanish', nativeName: 'Español', flag: 'https://flagcdn.com/w40/es.png', region: 'Spain/Latin America', continent: 'Europe/Americas' },
  { code: 'fr', name: 'French', nativeName: 'Français', flag: 'https://flagcdn.com/w40/fr.png', region: 'France/Africa', continent: 'Europe/Africa' },
  { code: 'de', name: 'German', nativeName: 'Deutsch', flag: 'https://flagcdn.com/w40/de.png', region: 'Germany', continent: 'Europe' },
  { code: 'pt', name: 'Portuguese', nativeName: 'Português', flag: 'https://flagcdn.com/w40/br.png', region: 'Brazil/Portugal', continent: 'Americas/Europe' },
  { code: 'it', name: 'Italian', nativeName: 'Italiano', flag: 'https://flagcdn.com/w40/it.png', region: 'Italy', continent: 'Europe' },
  { code: 'nl', name: 'Dutch', nativeName: 'Nederlands', flag: 'https://flagcdn.com/w40/nl.png', region: 'Netherlands', continent: 'Europe' },
  { code: 'pl', name: 'Polish', nativeName: 'Polski', flag: 'https://flagcdn.com/w40/pl.png', region: 'Poland', continent: 'Europe' },
  { code: 'ru', name: 'Russian', nativeName: 'Русский', flag: 'https://flagcdn.com/w40/ru.png', region: 'Russia', continent: 'Europe/Asia' },
  { code: 'uk', name: 'Ukrainian', nativeName: 'Українська', flag: 'https://flagcdn.com/w40/ua.png', region: 'Ukraine', continent: 'Europe' },
  { code: 'tr', name: 'Turkish', nativeName: 'Türkçe', flag: 'https://flagcdn.com/w40/tr.png', region: 'Turkey', continent: 'Asia/Europe' },
  { code: 'ar', name: 'Arabic', nativeName: 'العربية', flag: 'https://flagcdn.com/w40/sa.png', region: 'Middle East/North Africa', continent: 'Asia/Africa' },
  { code: 'hi', name: 'Hindi', nativeName: 'हिन्दी', flag: 'https://flagcdn.com/w40/in.png', region: 'India', continent: 'Asia' },
  { code: 'ja', name: 'Japanese', nativeName: '日本語', flag: 'https://flagcdn.com/w40/jp.png', region: 'Japan', continent: 'Asia' },
  { code: 'zh', name: 'Chinese', nativeName: '中文', flag: 'https://flagcdn.com/w40/cn.png', region: 'China', continent: 'Asia' },
  { code: 'ko', name: 'Korean', nativeName: '한국어', flag: 'https://flagcdn.com/w40/kr.png', region: 'South Korea', continent: 'Asia' },
  { code: 'id', name: 'Indonesian', nativeName: 'Bahasa Indonesia', flag: 'https://flagcdn.com/w40/id.png', region: 'Indonesia', continent: 'Asia' },
  { code: 'vi', name: 'Vietnamese', nativeName: 'Tiếng Việt', flag: 'https://flagcdn.com/w40/vn.png', region: 'Vietnam', continent: 'Asia' },
  { code: 'th', name: 'Thai', nativeName: 'ไทย', flag: 'https://flagcdn.com/w40/th.png', region: 'Thailand', continent: 'Asia' },
  { code: 'sw', name: 'Swahili', nativeName: 'Kiswahili', flag: 'https://flagcdn.com/w40/ke.png', region: 'East Africa', continent: 'Africa' },
  { code: 'am', name: 'Amharic', nativeName: 'አማርኛ', flag: 'https://flagcdn.com/w40/et.png', region: 'Ethiopia', continent: 'Africa' },
  { code: 'yo', name: 'Yoruba', nativeName: 'Yorùbá', flag: 'https://flagcdn.com/w40/ng.png', region: 'Nigeria', continent: 'Africa' },
  { code: 'ig', name: 'Igbo', nativeName: 'Igbo', flag: 'https://flagcdn.com/w40/ng.png', region: 'Nigeria', continent: 'Africa' },
  { code: 'ha', name: 'Hausa', nativeName: 'Hausa', flag: 'https://flagcdn.com/w40/ng.png', region: 'West Africa', continent: 'Africa' },
  { code: 'no', name: 'Norwegian', nativeName: 'Norsk', flag: 'https://flagcdn.com/w40/no.png', region: 'Norway', continent: 'Europe' },
  { code: 'ibb', name: 'Ibibio', nativeName: 'Ibibio', flag: 'https://flagcdn.com/w40/ng.png', region: 'Nigeria', continent: 'Africa' },
];

const continents = ['Global', 'Europe', 'Americas', 'Asia', 'Africa', 'Oceania'];

export default function GlobalLanguageSwitcher() {
  const { i18n } = useTranslation();
  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedContinent, setSelectedContinent] = useState<string>('Global');
  const [detectedRegion, setDetectedRegion] = useState<string>('');

  useEffect(() => {
    detectUserRegion();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const detectUserRegion = async () => {
    try {
      const response = await fetch('https://ipapi.co/json/');
      const data = await response.json();
      setDetectedRegion(`${data.city}, ${data.country_name}`);

      const countryLanguageMap: Record<string, string> = {
        ES: 'es', FR: 'fr', DE: 'de', IT: 'it', PT: 'pt', BR: 'pt',
        NL: 'nl', PL: 'pl', RU: 'ru', UA: 'uk', TR: 'tr',
        SA: 'ar', AE: 'ar', EG: 'ar', MA: 'ar', DZ: 'ar',
        IN: 'hi', JP: 'ja', CN: 'zh', KR: 'ko', ID: 'id',
        VN: 'vi', TH: 'th', KE: 'sw', TZ: 'sw', ET: 'am',
        NG: 'yo',
      };

      const detectedLang = countryLanguageMap[data.country_code];
      if (detectedLang && !localStorage.getItem('i18nextLng')) {
        i18n.changeLanguage(detectedLang);
      }
    } catch (error) {
      console.error('Region detection failed:', error);
    }
  };

  const currentLanguage = languages.find(lang => lang.code === i18n.language) || languages[0];

  const filteredLanguages = languages.filter(lang => {
    const matchesSearch = lang.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         lang.nativeName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         lang.region.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesContinent = selectedContinent === 'Global' ||
                            lang.continent.includes(selectedContinent);

    return matchesSearch && matchesContinent;
  });

  const handleLanguageChange = (langCode: string) => {
    i18n.changeLanguage(langCode);
    setIsOpen(false);
  };

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center space-x-2 px-4 py-2 bg-white/10 hover:bg-white/20 rounded-lg transition-colors border border-white/20"
      >
        <Globe className="h-5 w-5 text-white" />
        <img src={currentLanguage.flag} alt={currentLanguage.name} className="w-6 h-4 object-cover rounded" />
        <span className="text-white font-medium hidden sm:inline">
          {currentLanguage.nativeName}
        </span>
      </button>

      {isOpen && (
        <>
          <div
            className="fixed inset-0 z-40"
            onClick={() => setIsOpen(false)}
          />
          <div className="absolute right-0 mt-2 w-96 bg-gray-900 border border-white/20 rounded-xl shadow-2xl z-50 max-h-[600px] overflow-hidden">
            <div className="p-4 border-b border-white/10">
              <div className="flex items-center space-x-3 mb-3">
                <Globe className="h-6 w-6 text-purple-400" />
                <div>
                  <h3 className="text-lg font-bold text-white">{t('language.selectLanguage')}</h3>
                  {detectedRegion && (
                    <p className="text-xs text-gray-400">{t('language.detectedRegion')} {detectedRegion}</p>
                  )}
                </div>
              </div>

              <input
                type="text"
                placeholder={t('language.searchLanguages')}
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full px-3 py-2 bg-white/5 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500"
              />

              <div className="flex flex-wrap gap-2 mt-3">
                {continents.map(continent => (
                  <button
                    key={continent}
                    onClick={() => setSelectedContinent(continent)}
                    className={`px-3 py-1 rounded-full text-xs font-medium transition-colors ${
                      selectedContinent === continent
                        ? 'bg-purple-500 text-white'
                        : 'bg-white/10 text-gray-300 hover:bg-white/20'
                    }`}
                  >
                    {continent}
                  </button>
                ))}
              </div>
            </div>

            <div className="overflow-y-auto max-h-[400px]">
              {filteredLanguages.map(lang => (
                <button
                  key={lang.code}
                  onClick={() => handleLanguageChange(lang.code)}
                  className={`w-full px-4 py-3 flex items-center justify-between hover:bg-white/10 transition-colors ${
                    i18n.language === lang.code ? 'bg-purple-500/20' : ''
                  }`}
                >
                  <div className="flex items-center space-x-3">
                    <img src={lang.flag} alt={lang.name} className="w-10 h-7 object-cover rounded shadow-md" />
                    <div className="text-left">
                      <div className="text-white font-medium">{lang.nativeName}</div>
                      <div className="text-xs text-gray-400">{lang.name} • {lang.region}</div>
                    </div>
                  </div>
                  {i18n.language === lang.code && (
                    <Check className="h-5 w-5 text-green-400" />
                  )}
                </button>
              ))}

              {filteredLanguages.length === 0 && (
                <div className="p-8 text-center text-gray-400">
                  {t('language.noLanguagesFound')}
                </div>
              )}
            </div>

            <div className="p-3 border-t border-white/10 bg-white/5">
              <p className="text-xs text-gray-400 text-center">
                {t('language.languageCount', { count: 24 })}
              </p>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
