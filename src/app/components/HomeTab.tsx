"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import { useHanglowStore } from '../store/hanglowStore';
import { getTranslation } from '../translations';
import TravelPhaseSelector from './TravelPhaseSelector';
import FeatureDemoModal from './FeatureDemoModal';
import styles from '../page.module.css';

export default function HomeTab() {
  const { 
    user, 
    recommendedProducts, 
    beautyHotspots, 
    trendingContent,
    saveProduct 
  } = useHanglowStore();
  
  const [modalState, setModalState] = useState<{
    isOpen: boolean;
    featureType: 'location' | 'coupon' | 'translation' | null;
  }>({
    isOpen: false,
    featureType: null
  });
  
  // 번역 함수 단축어
  const t = (key: string) => getTranslation(key, user.language);
  
  // 제품 저장 핸들러
  const handleSaveProduct = (product: any) => {
    saveProduct(product);
    alert(`${product.name} 제품이 저장되었습니다!`);
  };

  // 모달 열기
  const openModal = (featureType: 'location' | 'coupon' | 'translation') => {
    setModalState({ isOpen: true, featureType });
  };

  // 모달 닫기
  const closeModal = () => {
    setModalState({ isOpen: false, featureType: null });
  };

  return (
    <div className={styles.homeContent}>
      <div className={styles.hero}>
        <h1>{t('hero_title')}</h1>
        <p>{t('hero_subtitle')}</p>
        <button className={styles.ctaButton}>{t('cta_button')}</button>
      </div>
      
      <TravelPhaseSelector />
      
      <section className={styles.section}>
        <h2>{t('section_popular')}</h2>
        <div className={styles.productGrid}>
          {recommendedProducts.slice(0, 3).map((product) => (
            <Link key={product.id} href={`/products/${product.id}`} className={styles.productCard}>
              <div className={styles.productImage}>
                <img 
                  src={product.imageUrl} 
                  alt={product.name}
                  onError={(e) => {
                    const target = e.target as HTMLImageElement;
                    target.style.display = 'none';
                    target.nextElementSibling?.classList.add(styles.showPlaceholder);
                  }}
                />
                <div className={styles.imagePlaceholder}>
                  이미지 준비중
                </div>
              </div>
              <h3>{product.name}</h3>
              <p className={styles.brand}>{product.brand}</p>
              <p className={styles.price}>{product.price.toLocaleString()}원</p>
            </Link>
          ))}
        </div>
        <button className={styles.moreButton}>{t('more_button')}</button>
      </section>
      
      <section className={styles.section}>
        <h2>{t('section_hotspots')}</h2>
        <div className={styles.hotspotGrid}>
          {beautyHotspots.map((hotspot) => (
            <div key={hotspot.id} className={styles.hotspotCard}>
              <div className={styles.hotspotImage}>
                <img src={hotspot.imageUrl} alt={hotspot.name} style={{width: '100%', height: '100%', objectFit: 'cover'}} />
              </div>
              <h3>{hotspot.name}</h3>
              <p className={styles.location}>{hotspot.location}</p>
              <p className={styles.description}>{hotspot.description}</p>
            </div>
          ))}
        </div>
      </section>
      
      <section className={styles.section}>
        <h2>{t('section_trending')}</h2>
        <div className={styles.trendingGrid}>
          {trendingContent.map((content) => (
            <div key={content.id} className={styles.trendingCard}>
              <div className={styles.trendingImage}>
                <img src={content.thumbnail} alt={content.title} style={{width: '100%', height: '100%', objectFit: 'cover'}} />
              </div>
              <h3>{content.title}</h3>
            </div>
          ))}
        </div>
      </section>
      
      <section className={styles.section}>
        <h2>{t('section_features')}</h2>
        <div className={styles.featureGrid}>
          <div className={styles.featureCard}>
            <h3>{t('feature_before')}</h3>
            <div className={styles.featureImage}>
              <img src="https://cdn-icons-png.flaticon.com/512/8074/8074773.png" alt="여행 전 기능" style={{width: '100%', height: '100%', objectFit: 'cover'}} />
            </div>
            <p>{t('feature_before_desc')}</p>
            </div>
          <div className={styles.featureCard} onClick={() => openModal('location')} style={{cursor: 'pointer'}}>
            <h3>{t('feature_during')}</h3>
            <div className={styles.featureImage}>
          <img src="https://cdn-icons-png.flaticon.com/512/684/684908.png" alt="위치 기반 뷰티 핫플 탐색" style={{width: '100%', height: '100%', objectFit: 'cover'}} />
          </div>
            <p>{t('feature_during_desc')}</p>
            <button className={styles.demoButton}>기능 체험하기</button>
          </div>
          <div className={styles.featureCard}>
            <h3>{t('feature_after')}</h3>
            <div className={styles.featureImage}>
            <img src="https://cdn-icons-png.flaticon.com/512/3503/3503786.png" alt="여행 후 기능" style={{width: '100%', height: '100%', objectFit: 'cover'}} />
            </div>
            <p>{t('feature_after_desc')}</p>
          </div>
        </div>
        
        {/* 추가 기능 데모 카드들 */}
        <div className={styles.additionalFeatures}>
          <h3>주요 기능 체험</h3>
          <div className={styles.demoCardGrid}>
            <div className={styles.demoCard} onClick={() => openModal('location')}>
              <div className={styles.demoIcon}>📍</div>
              <h4>위치 기반 뷰티 핫플 탐색</h4>
              <p>내 주변 K-뷰티 매장을 찾고 할인 정보를 확인하세요</p>
              <button className={styles.tryButton}>체험하기</button>
            </div>
            
            <div className={styles.demoCard} onClick={() => openModal('coupon')}>
              <div className={styles.demoIcon}>🎫</div>
              <h4>할인 쿠폰 제공</h4>
              <p>HANGLOW 전용 할인 쿠폰으로 더 저렴하게 쇼핑하세요</p>
              <button className={styles.tryButton}>체험하기</button>
            </div>
            
            <div className={styles.demoCard} onClick={() => openModal('translation')}>
              <div className={styles.demoIcon}>🌐</div>
              <h4>실시간 통역</h4>
              <p>음성과 텍스트로 실시간 번역 서비스를 이용하세요</p>
              <button className={styles.tryButton}>체험하기</button>
            </div>
          </div>
        </div>
      </section>
      
      <FeatureDemoModal
        isOpen={modalState.isOpen}
        onClose={closeModal}
        featureType={modalState.featureType}
      />
    </div>
  );
} 