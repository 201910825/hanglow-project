"use client";

import React, { useState } from 'react';
import { useHanglowStore } from './store/hanglowStore';
import { getTranslation } from './translations';
import HomeTab from './components/HomeTab';
import ProductsTab from './components/ProductsTab';
import HotspotsTab from './components/HotspotsTab';
import MyPageTab from './components/MyPageTab';
import styles from './page.module.css';

export default function Home() {
  const { user, setLanguage } = useHanglowStore();
  const [activeTab, setActiveTab] = useState("home");
  
  // 언어 변경 핸들러
  const handleLanguageChange = (lang: string) => {
    console.log('언어 변경:', lang);
    setLanguage(lang);
  };
  
  // 번역 함수 단축어
  const t = (key: string) => getTranslation(key, user.language);

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
        <div className={styles.langSelector}>
          <button 
            className={`${styles.navButton} ${user.language === 'ko' ? styles.active : ''}`}
            onClick={() => handleLanguageChange('ko')}
          >
            KO
          </button>
          <button 
            className={`${styles.navButton} ${user.language === 'en' ? styles.active : ''}`}
            onClick={() => handleLanguageChange('en')}
          >
            EN
          </button>
          <button 
            className={`${styles.navButton} ${user.language === 'zh' ? styles.active : ''}`}
            onClick={() => handleLanguageChange('zh')}
          >
            中文
          </button>
          <button 
            className={`${styles.navButton} ${user.language === 'ja' ? styles.active : ''}`}
            onClick={() => handleLanguageChange('ja')}
          >
            日本語
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
    </div>
  );
}