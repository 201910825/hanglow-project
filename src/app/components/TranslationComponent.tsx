"use client";

import React, { useState } from 'react';
import styles from './FeatureComponents.module.css';

export default function TranslationComponent() {
  const [sourceLanguage, setSourceLanguage] = useState('한국어');
  const [targetLanguage, setTargetLanguage] = useState('English');
  const [inputText, setInputText] = useState('');
  const [translatedText, setTranslatedText] = useState('');
  const [isTranslating, setIsTranslating] = useState(false);
  const [isListening, setIsListening] = useState(false);

  const languages = ['한국어', 'English', '中文', '日本語', 'Español', 'Français'];

  const commonPhrases = [
    { korean: '이 제품은 얼마인가요?', english: 'How much is this product?' },
    { korean: '할인이 있나요?', english: 'Is there a discount?' },
    { korean: '더 큰 사이즈가 있나요?', english: 'Do you have a bigger size?' },
    { korean: '이것을 추천해주세요', english: 'Please recommend this' },
    { korean: '언제까지 사용할 수 있나요?', english: 'Until when can I use this?' },
  ];

  const handleTranslate = () => {
    if (!inputText.trim()) return;
    
    setIsTranslating(true);
    
    // 실제 번역 API 대신 시뮬레이션
    setTimeout(() => {
      if (sourceLanguage === '한국어' && targetLanguage === 'English') {
        const found = commonPhrases.find(phrase => phrase.korean === inputText);
        setTranslatedText(found ? found.english : 'Translation result will appear here');
      } else {
        setTranslatedText('Translation result will appear here');
      }
      setIsTranslating(false);
    }, 1500);
  };

  const handleVoiceInput = () => {
    setIsListening(true);
    setTimeout(() => {
      setInputText('이 제품은 얼마인가요?');
      setIsListening(false);
    }, 2000);
  };

  const handleSwapLanguages = () => {
    setSourceLanguage(targetLanguage);
    setTargetLanguage(sourceLanguage);
    setInputText(translatedText);
    setTranslatedText(inputText);
  };

  const handleQuickPhrase = (phrase: { korean: string; english: string }) => {
    setInputText(phrase.korean);
    setTranslatedText(phrase.english);
  };

  return (
    <div className={styles.translationComponent}>
      <div className={styles.header}>
        <div className={styles.iconWrapper}>
          <img 
            src="https://cdn-icons-png.flaticon.com/512/3503/3503786.png" 
            alt="실시간 통역" 
            className={styles.featureIcon}
          />
        </div>
        <h3>실시간 통역</h3>
        <p>음성과 텍스트로 실시간 번역 서비스를 이용하세요</p>
      </div>

      <div className={styles.languageSelector}>
        <div className={styles.languageBox}>
          <select 
            value={sourceLanguage} 
            onChange={(e) => setSourceLanguage(e.target.value)}
            className={styles.languageSelect}
          >
            {languages.map(lang => (
              <option key={lang} value={lang}>{lang}</option>
            ))}
          </select>
        </div>
        
        <button 
          className={styles.swapButton} 
          onClick={handleSwapLanguages}
        >
          ⇄
        </button>
        
        <div className={styles.languageBox}>
          <select 
            value={targetLanguage} 
            onChange={(e) => setTargetLanguage(e.target.value)}
            className={styles.languageSelect}
          >
            {languages.map(lang => (
              <option key={lang} value={lang}>{lang}</option>
            ))}
          </select>
        </div>
      </div>

      <div className={styles.translationBox}>
        <div className={styles.inputSection}>
          <div className={styles.textAreaWrapper}>
            <textarea
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              placeholder="번역할 텍스트를 입력하세요..."
              className={styles.textArea}
            />
            <button 
              className={`${styles.voiceButton} ${isListening ? styles.listening : ''}`}
              onClick={handleVoiceInput}
            >
              {isListening ? '🎤' : '🎙️'}
            </button>
          </div>
          <button 
            className={styles.translateButton}
            onClick={handleTranslate}
            disabled={isTranslating || !inputText.trim()}
          >
            {isTranslating ? '번역 중...' : '번역하기'}
          </button>
        </div>

        <div className={styles.outputSection}>
          <div className={styles.resultBox}>
            {isTranslating ? (
              <div className={styles.loadingDots}>
                <span></span><span></span><span></span>
              </div>
            ) : (
              <p>{translatedText || '번역 결과가 여기에 표시됩니다'}</p>
            )}
          </div>
          {translatedText && (
            <button className={styles.speakButton}>🔊 음성 재생</button>
          )}
        </div>
      </div>

      <div className={styles.quickPhrasesSection}>
        <h4>자주 사용하는 표현</h4>
        <div className={styles.phraseGrid}>
          {commonPhrases.map((phrase, index) => (
            <button 
              key={index}
              className={styles.phraseButton}
              onClick={() => handleQuickPhrase(phrase)}
            >
              {phrase.korean}
            </button>
          ))}
        </div>
      </div>

      <div className={styles.featuresInfo}>
        <div className={styles.featureInfo}>
          <span>🎤</span>
          <div>
            <h5>음성 인식</h5>
            <p>말하기만 해도 자동 번역</p>
          </div>
        </div>
        <div className={styles.featureInfo}>
          <span>📷</span>
          <div>
            <h5>카메라 번역</h5>
            <p>제품 라벨을 찍어서 번역</p>
          </div>
        </div>
        <div className={styles.featureInfo}>
          <span>💬</span>
          <div>
            <h5>대화 모드</h5>
            <p>양방향 실시간 대화</p>
          </div>
        </div>
      </div>
    </div>
  );
} 