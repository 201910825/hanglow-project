"use client";

import React, { useState } from 'react';
import { useHanglowStore } from './store/hanglowStore';
import { getTranslation } from './translations';
import HomeTab from './components/HomeTab';
import ProductsTab from './components/ProductsTab';
import HotspotsTab from './components/HotspotsTab';
import MyPageTab from './components/MyPageTab';
import LanguageModal from './components/LanguageModal';
import styles from './page.module.css';

export default function Home() {
  const { user } = useHanglowStore();
  const [activeTab, setActiveTab] = useState("home");
  const [languageModalOpen, setLanguageModalOpen] = useState(false);
  
  // 번역 함수 단축어
  const t = (key: string) => getTranslation(key, user.language);

  // 현재 언어의 플래그 가져오기
  const getCurrentLanguageFlag = () => {
    const languageFlags: { [key: string]: string } = {
      'ko': '🇰🇷',
      'en': '🇺🇸',
      'zh': '🇨🇳',
      'ja': '🇯🇵',
      'es': '🇪🇸',
      'fr': '🇫🇷',
      'de': '🇩🇪',
      'it': '🇮🇹',
      'pt': '🇵🇹',
      'nl': '🇳🇱',
      'sv': '🇸🇪',
      'no': '🇳🇴',
      'da': '🇩🇰',
    };
    return languageFlags[user.language] || '🌐';
  };

  return (
    <div className={styles.page}>
      <header className={styles.header}>
        <div className={styles.logo}>HANGLOW</div>
        <nav className={styles.nav}>
          <button 
            className={`${styles.navButton} ${activeTab === 'home' ? styles.active : ''}`}
            onClick={() => setActiveTab('home')}
          >
            {t('nav_home')}
          </button>
          <button 
            className={`${styles.navButton} ${activeTab === 'products' ? styles.active : ''}`}
            onClick={() => setActiveTab('products')}
          >
            {t('nav_products')}
          </button>
          <button 
            className={`${styles.navButton} ${activeTab === 'hotspots' ? styles.active : ''}`}
            onClick={() => setActiveTab('hotspots')}
          >
            {t('nav_hotspots')}
          </button>
          <button 
            className={`${styles.navButton} ${activeTab === 'scan' ? styles.active : ''}`}
            onClick={() => setActiveTab('scan')}
          >
            {t('nav_scan')}
          </button>
          <button 
            className={`${styles.navButton} ${activeTab === 'mypage' ? styles.active : ''}`}
            onClick={() => setActiveTab('mypage')}
          >
            {t('nav_mypage')}
          </button>
        </nav>
        <div className={styles.languageButton}>
          <button 
            className={styles.langButton}
            onClick={() => setLanguageModalOpen(true)}
            title="언어 설정 / Language Settings"
          >
            {getCurrentLanguageFlag()} {user.language.toUpperCase()}
          </button>
        </div>
      </header>
      
      <main className={styles.main}>
        {activeTab === 'home' && <HomeTab />}
        {activeTab === 'products' && <ProductsTab />}
        {activeTab === 'hotspots' && <HotspotsTab />}
        {activeTab === 'scan' && (
          <div className={styles.scanContent}>
            <iframe 
              src="/scan" 
              style={{ 
                width: '100%', 
                height: '700px', 
                border: 'none',
                borderRadius: 'var(--border-radius)',
              }}
            />
          </div>
        )}
        {activeTab === 'mypage' && <MyPageTab />}
      </main>

      <LanguageModal
        isOpen={languageModalOpen}
        onClose={() => setLanguageModalOpen(false)}
      />
    </div>
  );
}