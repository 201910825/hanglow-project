"use client";

import React, { useState, useEffect } from 'react';
import { useHanglowStore } from '../store/hanglowStore';
import styles from './CustomRecommend.module.css';

export default function CustomRecommendComponent() {
  const { user } = useHanglowStore();
  const [language, setLanguage] = useState<string>('ko');

  useEffect(() => {
    setLanguage(user.language); 
  }, [user.language]);

  return (
    <div className={styles.recommendContainer}>
      <h1>Custom Recommend</h1> 
      <div className={styles.recommendContainer}>
        <div className={styles.recommendItem}>
            <button onClick={() => setLanguage(language === 'ko' ? 'en' : 'ko')}>{language === 'ko' ? 'English' : '한국어'}본인용</button>
            <button onClick={() => setLanguage(language === 'ko' ? 'en' : 'ko')}>{language === 'ko' ? 'English' : '한국어'}선물용</button>
        </div>
      </div>        
    </div>
  );
}