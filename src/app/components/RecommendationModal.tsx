"use client";

import React, { useState } from 'react';
import { getTranslation } from '../translations';
import { useHanglowStore } from '../store/hanglowStore';
import styles from './RecommendationModal.module.css';

interface RecommendationModalProps {
  isOpen: boolean;
  onClose: () => void;
  onResult: (result: RecommendationResult) => void;
}

export interface RecommendationResult {
  type: 'personal' | 'gift';
  nationality?: string;
  age?: string;
  gender?: string;
}

const countries = [
  { code: 'US', name: '미국', flag: '🇺🇸' },
  { code: 'CN', name: '중국', flag: '🇨🇳' },
  { code: 'JP', name: '일본', flag: '🇯🇵' },
  { code: 'UK', name: '영국', flag: '🇬🇧' },
  { code: 'FR', name: '프랑스', flag: '🇫🇷' },
  { code: 'DE', name: '독일', flag: '🇩🇪' },
  { code: 'TH', name: '태국', flag: '🇹🇭' },
  { code: 'VN', name: '베트남', flag: '🇻🇳' }
];

const ageGroups = [
  '10대', '20대 초반', '20대 후반', '30대 초반', '30대 후반', '40대', '50대 이상'
];

const genders = ['남성', '여성'];

export default function RecommendationModal({ isOpen, onClose, onResult }: RecommendationModalProps) {
  const { user } = useHanglowStore();
  const [step, setStep] = useState(1);
  const [selectedType, setSelectedType] = useState<'personal' | 'gift' | null>(null);
  const [selectedNationality, setSelectedNationality] = useState<string>('');
  const [selectedAge, setSelectedAge] = useState<string>('');
  const [selectedGender, setSelectedGender] = useState<string>('');

  const t = (key: string) => getTranslation(key, user.language);

  if (!isOpen) return null;

  const handleTypeSelect = (type: 'personal' | 'gift') => {
    setSelectedType(type);
    if (type === 'personal') {
      onResult({ type: 'personal' });
      onClose();
    } else {
      setStep(2);
    }
  };

  const handleGiftInfoComplete = () => {
    if (selectedNationality && selectedAge && selectedGender) {
      onResult({
        type: 'gift',
        nationality: selectedNationality,
        age: selectedAge,
        gender: selectedGender
      });
      onClose();
    }
  };

  const resetModal = () => {
    setStep(1);
    setSelectedType(null);
    setSelectedNationality('');
    setSelectedAge('');
    setSelectedGender('');
  };

  const handleClose = () => {
    resetModal();
    onClose();
  };

  return (
    <div className={styles.modalOverlay} onClick={handleClose}>
      <div className={styles.modalContent} onClick={(e) => e.stopPropagation()}>
        <button className={styles.closeButton} onClick={handleClose}>
          ✕
        </button>
        
        {step === 1 && (
          <div className={styles.step}>
            <h2>누구를 위한 추천인가요?</h2>
            <div className={styles.typeButtonGrid}>
              <button 
                className={styles.typeButton}
                onClick={() => handleTypeSelect('personal')}
              >
                <div className={styles.typeIcon}>👤</div>
                <h3>본인용</h3>
                <p>나에게 맞는 K-뷰티 제품을 찾고 싶어요</p>
              </button>
              
              <button 
                className={styles.typeButton}
                onClick={() => handleTypeSelect('gift')}
              >
                <div className={styles.typeIcon}>🎁</div>
                <h3>선물용</h3>
                <p>소중한 사람에게 줄 선물을 찾고 있어요</p>
              </button>
            </div>
          </div>
        )}

        {step === 2 && (
          <div className={styles.step}>
            <h2>선물받을 분에 대해 알려주세요</h2>
            
            <div className={styles.inputSection}>
              <h3>국적</h3>
              <div className={styles.countryGrid}>
                {countries.map((country) => (
                  <button
                    key={country.code}
                    className={`${styles.optionButton} ${selectedNationality === country.code ? styles.selected : ''}`}
                    onClick={() => setSelectedNationality(country.code)}
                  >
                    <span className={styles.flag}>{country.flag}</span>
                    <span>{country.name}</span>
                  </button>
                ))}
              </div>
            </div>

            <div className={styles.inputSection}>
              <h3>연령대</h3>
              <div className={styles.ageGrid}>
                {ageGroups.map((age) => (
                  <button
                    key={age}
                    className={`${styles.optionButton} ${selectedAge === age ? styles.selected : ''}`}
                    onClick={() => setSelectedAge(age)}
                  >
                    {age}
                  </button>
                ))}
              </div>
            </div>

            <div className={styles.inputSection}>
              <h3>성별</h3>
              <div className={styles.genderGrid}>
                {genders.map((gender) => (
                  <button
                    key={gender}
                    className={`${styles.optionButton} ${selectedGender === gender ? styles.selected : ''}`}
                    onClick={() => setSelectedGender(gender)}
                  >
                    {gender}
                  </button>
                ))}
              </div>
            </div>

            <div className={styles.actionButtons}>
              <button 
                className={styles.backButton} 
                onClick={() => setStep(1)}
              >
                이전
              </button>
              <button 
                className={`${styles.nextButton} ${selectedNationality && selectedAge && selectedGender ? styles.enabled : ''}`}
                onClick={handleGiftInfoComplete}
                disabled={!selectedNationality || !selectedAge || !selectedGender}
              >
                추천 받기
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
} 