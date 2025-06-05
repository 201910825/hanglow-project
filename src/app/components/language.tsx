import { useState } from 'react';
import styles from './language.module.css';
import CustomRecommend from './CustomRecommend';
export default function Language() {
  const [language, setLanguage] = useState('ko');

  const handleLanguageChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setLanguage(e.target.value);
  };

  return (
    <div className={styles.language}>
      <h1>Language</h1>
      <select value={language} onChange={handleLanguageChange} className={styles.languageSelect}>
        <option value="ko">한국어</option>
        <option value="en">English</option>
        <option value="ja">日本語</option>
        <option value="zh">中文</option>
        <option value="es">Español</option>
        <option value="fr">Français</option>
        <option value="de">Deutsch</option>
        <option value="it">Italiano</option>
        <option value="ru">Русский</option>
        <option value="ar">العربية</option>
        <option value="hi">हिन्दी</option>
        <option value="pt">Português</option>
        <option value="nl">Nederlands</option>
        <option value="sv">Svenska</option>
        <option value="no">Norsk</option>
        <option value="da">Dansk</option>
      </select>
      <p className={styles.languageText}>Selected Language: {language}</p>
    </div>
  );
}