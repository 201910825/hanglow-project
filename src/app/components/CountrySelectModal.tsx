"use client";

import React from 'react';
import styles from './CountrySelectModal.module.css';

interface CountrySelectModalProps {
  isOpen: boolean;
  onClose: () => void;
  onCountrySelect: (countryCode: string) => void;
}

const countries = [
  { code: 'US', name: '미국', flag: '🇺🇸', description: '깔끔하고 실용적인 K-뷰티' },
  { code: 'CN', name: '중국', flag: '🇨🇳', description: '럭셔리 프리미엄 K-뷰티' },
  { code: 'JP', name: '일본', flag: '🇯🇵', description: '자연스럽고 미니멀한 K-뷰티' },
  { code: 'UK', name: '영국', flag: '🇬🇧', description: '클래식하고 우아한 K-뷰티' },
  { code: 'FR', name: '프랑스', flag: '🇫🇷', description: '세련되고 시크한 K-뷰티' },
  { code: 'DE', name: '독일', flag: '🇩🇪', description: '기능성 중심의 K-뷰티' },
  { code: 'TH', name: '태국', flag: '🇹🇭', description: '트로피컬 케어 K-뷰티' },
  { code: 'VN', name: '베트남', flag: '🇻🇳', description: '젊고 활기찬 K-뷰티' }
];

export default function CountrySelectModal({ isOpen, onClose, onCountrySelect }: CountrySelectModalProps) {
  if (!isOpen) return null;

  const handleCountrySelect = (countryCode: string) => {
    onCountrySelect(countryCode);
    onClose();
  };

  return (
    <div className={styles.modalOverlay} onClick={onClose}>
      <div className={styles.modalContent} onClick={(e) => e.stopPropagation()}>
        <button className={styles.closeButton} onClick={onClose}>
          ✕
        </button>
        
        <div className={styles.header}>
          <h2>국가별 K-뷰티 추천</h2>
          <p>어느 국가의 K-뷰티 트렌드를 보고 싶으신가요?</p>
        </div>

        <div className={styles.countriesGrid}>
          {countries.map((country) => (
            <button
              key={country.code}
              className={styles.countryCard}
              onClick={() => handleCountrySelect(country.code)}
            >
              <div className={styles.flagContainer}>
                <span className={styles.flag}>{country.flag}</span>
              </div>
              <h3>{country.name}</h3>
              <p>{country.description}</p>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
} 