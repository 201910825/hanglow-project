import { useEffect, useState } from 'react';
import styles from './language.module.css';
import { useHanglowStore } from '../store/hanglowStore';
import { CustomRecommend as CustomRecommendType } from '../types';



export default function CustomRecommend() {
    const { customRecommend, user } = useHanglowStore();
    const [language, setLanguage] = useState<string>('ko');
    const [recommend, setRecommend] = useState<CustomRecommendType>({});
    useEffect(() => {
        setRecommend(customRecommend[0]);
    }, [customRecommend]);
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