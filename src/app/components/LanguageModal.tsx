"use client";

import React from 'react';
import { useHanglowStore } from '../store/hanglowStore';
import { getTranslation } from '../translations';
import styles from './LanguageModal.module.css';

interface LanguageModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const SUPPORTED_LANGUAGES = [
  { code: 'ko', name: '한국어', flag: '🇰🇷', nativeName: '한국어' },
  { code: 'en', name: 'English', flag: '🇺🇸', nativeName: 'English' },
  { code: 'zh', name: '中文', flag: '🇨🇳', nativeName: '中文 (简体)' },
  { code: 'ja', name: '日本語', flag: '🇯🇵', nativeName: '日本語' },
  { code: 'es', name: 'Español', flag: '🇪🇸', nativeName: 'Español' },
  { code: 'fr', name: 'Français', flag: '🇫🇷', nativeName: 'Français' },
  { code: 'de', name: 'Deutsch', flag: '🇩🇪', nativeName: 'Deutsch' },
  { code: 'it', name: 'Italiano', flag: '🇮🇹', nativeName: 'Italiano' },
  { code: 'pt', name: 'Português', flag: '🇵🇹', nativeName: 'Português' },
  { code: 'nl', name: 'Nederlands', flag: '🇳🇱', nativeName: 'Nederlands' },
  { code: 'sv', name: 'Svenska', flag: '🇸🇪', nativeName: 'Svenska' },
  { code: 'no', name: 'Norsk', flag: '🇳🇴', nativeName: 'Norsk' },
  { code: 'da', name: 'Dansk', flag: '🇩🇰', nativeName: 'Dansk' },
];

export default function LanguageModal({ isOpen, onClose }: LanguageModalProps) {
  const { user, setLanguage } = useHanglowStore();
  const t = (key: string) => getTranslation(key, user.language);

  if (!isOpen) return null;

  const handleLanguageSelect = (languageCode: string) => {
    setLanguage(languageCode);
    onClose();
  };

  return (
    <div className={styles.overlay} onClick={onClose}>
      <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
        <div className={styles.header}>
          <h2>🌐 언어 설정 / Language Settings</h2>
          <button className={styles.closeButton} onClick={onClose}>
            ✕
          </button>
        </div>
        
        <div className={styles.content}>
          <p className={styles.subtitle}>
            언어를 선택해주세요 / Please select your language
          </p>
          
          <div className={styles.languageGrid}>
            {SUPPORTED_LANGUAGES.map((language) => (
              <button
                key={language.code}
                className={`${styles.languageCard} ${
                  user.language === language.code ? styles.active : ''
                }`}
                onClick={() => handleLanguageSelect(language.code)}
              >
                <div className={styles.languageFlag}>{language.flag}</div>
                <div className={styles.languageInfo}>
                  <div className={styles.languageName}>{language.nativeName}</div>
                  <div className={styles.languageEnglish}>{language.name}</div>
                </div>
                {user.language === language.code && (
                  <div className={styles.selectedIcon}>✓</div>
                )}
              </button>
            ))}
          </div>
          
          <div className={styles.note}>
            <p>
              💡 {user.language === 'ko' 
                ? '언어 변경 시 앱 전체의 언어가 즉시 변경됩니다.' 
                : 'Language changes will be applied immediately throughout the app.'}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
} 