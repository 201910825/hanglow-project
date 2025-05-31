"use client";

import React, { useState } from 'react';
import LocationFinderComponent from './LocationFinderComponent';
import CouponComponent from './CouponComponent';
import TranslationComponent from './TranslationComponent';
import styles from './FeatureDemoModal.module.css';

interface FeatureDemoModalProps {
  isOpen: boolean;
  onClose: () => void;
  featureType: 'location' | 'coupon' | 'translation' | null;
}

export default function FeatureDemoModal({ isOpen, onClose, featureType }: FeatureDemoModalProps) {
  if (!isOpen || !featureType) return null;

  const renderFeatureComponent = () => {
    switch (featureType) {
      case 'location':
        return <LocationFinderComponent />;
      case 'coupon':
        return <CouponComponent />;
      case 'translation':
        return <TranslationComponent />;
      default:
        return null;
    }
  };

  const getTitle = () => {
    switch (featureType) {
      case 'location':
        return '위치 기반 뷰티 핫플 탐색';
      case 'coupon':
        return '할인 쿠폰 제공';
      case 'translation':
        return '실시간 통역';
      default:
        return '';
    }
  };

  return (
    <div className={styles.overlay} onClick={onClose}>
      <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
        <div className={styles.header}>
          <h2>{getTitle()}</h2>
          <button className={styles.closeButton} onClick={onClose}>
            ✕
          </button>
        </div>
        
        <div className={styles.content}>
          {renderFeatureComponent()}
        </div>
        
        <div className={styles.footer}>
          <button className={styles.closeFooterButton} onClick={onClose}>
            닫기
          </button>
        </div>
      </div>
    </div>
  );
} 