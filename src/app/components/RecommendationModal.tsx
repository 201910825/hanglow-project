"use client";

import React, { useState } from 'react';
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
  const [step, setStep] = useState<'type' | 'details'>('type');
  const [nationality, setNationality] = useState('');
  const [age, setAge] = useState('');
  const [gender, setGender] = useState('');

  if (!isOpen) return null;

  const handleTypeSelect = (type: 'personal' | 'gift') => {
    if (type === 'personal') {
      onResult({ type: 'personal' });
      onClose();
    } else {
      setStep('details');
    }
  };

  const handleGiftInfoComplete = () => {
    if (nationality && age && gender) {
      onResult({
        type: 'gift',
        nationality: nationality,
        age: age,
        gender: gender
      });
      onClose();
    }
  };

  const resetModal = () => {
    setStep('type');
    setNationality('');
    setAge('');
    setGender('');
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
        
        {step === 'type' && (
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

        {step === 'details' && (
          <div className={styles.step}>
            <h2>선물받을 분에 대해 알려주세요</h2>
            
            <div className={styles.inputSection}>
              <h3>국적</h3>
              <div className={styles.countryGrid}>
                {countries.map((country) => (
                  <button
                    key={country.code}
                    className={`${styles.optionButton} ${nationality === country.code ? styles.selected : ''}`}
                    onClick={() => setNationality(country.code)}
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
                {ageGroups.map((ageGroup) => (
                  <button
                    key={ageGroup}
                    className={`${styles.optionButton} ${age === ageGroup ? styles.selected : ''}`}
                    onClick={() => setAge(ageGroup)}
                  >
                    {ageGroup}
                  </button>
                ))}
              </div>
            </div>

            <div className={styles.inputSection}>
              <h3>성별</h3>
              <div className={styles.genderGrid}>
                {genders.map((genderOption) => (
                  <button
                    key={genderOption}
                    className={`${styles.optionButton} ${gender === genderOption ? styles.selected : ''}`}
                    onClick={() => setGender(genderOption)}
                  >
                    {genderOption}
                  </button>
                ))}
              </div>
            </div>

            <div className={styles.actionButtons}>
              <button 
                className={styles.backButton} 
                onClick={() => setStep('type')}
              >
                이전
              </button>
              <button 
                className={`${styles.nextButton} ${nationality && age && gender ? styles.enabled : ''}`}
                onClick={handleGiftInfoComplete}
                disabled={!nationality || !age || !gender}
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