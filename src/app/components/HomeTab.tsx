"use client";

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { useHanglowStore } from '../store/hanglowStore';
import { getTranslation } from '../translations';
import TravelPhaseSelector from './TravelPhaseSelector';
import FeatureDemoModal from './FeatureDemoModal';
import RecommendationModal, { RecommendationResult } from './RecommendationModal';
import RecommendationResultComponent from './RecommendationResult';
import CountrySelectModal from './CountrySelectModal';
import styles from '../page.module.css';
import { CustomRecommend } from '../types';
import { useRouter } from 'next/navigation';

export default function HomeTab() {
  const { 
    user, 
    countryHotItems,
    trendingContent,
    customRecommend,
  } = useHanglowStore();
  const [recommend, setRecommend] = useState<CustomRecommend>({});
  
  useEffect(() => {
    setRecommend(customRecommend[0]);
  }, [customRecommend]);
  
  const [modalState, setModalState] = useState<{
    isOpen: boolean;
    featureType: 'location' | 'coupon' | 'translation' | 'language' | 'custom' | null;
  }>({
    isOpen: false,
    featureType: null
  });

  const [recommendationModalOpen, setRecommendationModalOpen] = useState(false);
  const [recommendationResult, setRecommendationResult] = useState<RecommendationResult | null>(null);
  const [countrySelectModalOpen, setCountrySelectModalOpen] = useState(false);
  const [selectedCountryResult, setSelectedCountryResult] = useState<RecommendationResult | null>(null);
  
  const router = useRouter();
  
  // 번역 함수 단축어
  const t = (key: string) => getTranslation(key, user.language);

  // 제품 상세 페이지로 이동
  const handleProductClick = (productId: string) => {
    router.push(`/products/${productId}`);
  };

  // 모달 열기
  const openModal = (featureType: 'location' | 'coupon' | 'translation' | 'language' | 'custom') => {
    console.log(`Opening modal for feature: ${featureType}`);
    setModalState({ isOpen: true, featureType });
  };

  // 모달 닫기
  const closeModal = () => {  
    setModalState({ isOpen: false, featureType: null });
  };

  // 추천 모달 결과 처리
  const handleRecommendationResult = (result: RecommendationResult) => {
    setRecommendationResult(result);
  };

  // 국가 선택 처리
  const handleCountrySelect = (countryCode: string) => {
    setSelectedCountryResult({
      type: 'gift',
      nationality: countryCode,
      age: '전체',
      gender: '전체'
    });
  };

  // 추천 결과 닫기
  const closeRecommendationResult = () => {
    setRecommendationResult(null);
    setSelectedCountryResult(null);
  };

  // 추천 결과가 있을 때는 결과 컴포넌트만 표시
  if (recommendationResult || selectedCountryResult) {
    return (
      <RecommendationResultComponent 
        result={recommendationResult || selectedCountryResult!} 
        onClose={closeRecommendationResult}
      />
    );
  }

  return (
    <div className={styles.homeContent}>
      <div className={styles.hero}>
        <h1>{t('hero_title')}</h1>
        <p>{t('hero_subtitle')}</p>
        <button 
          className={styles.ctaButton}
          onClick={() => setRecommendationModalOpen(true)}
        >
          {t('cta_button')}
        </button>
      </div>
      
      <TravelPhaseSelector />
      
      <section className={styles.section}>
        <h2>{t('section_country_hot')}</h2>
        <div className={styles.countryHotGrid}>
          {countryHotItems.map((countryData) => (
            <div key={countryData.id} className={styles.countryCard}>
              <div className={styles.countryHeader}>
                <span className={styles.countryFlag}>{countryData.flag}</span>
                <h3>{countryData.country}</h3>
              </div>
              
              {/* 스킨케어 미리보기 */}
              <div className={styles.categoryPreview}>
                <h4>🧴 스킨케어</h4>
                <div className={styles.hotItemsGrid}>
                  {countryData.skincare && countryData.skincare.slice(0, 2).map((item) => (
                    <div 
                      key={item.id} 
                      className={styles.hotItemCard}
                      onClick={() => handleProductClick(item.id)}
                      style={{ cursor: 'pointer' }}
                    >
                      <div className={styles.rankBadge}>#{item.popularityRank}</div>
                      <div className={styles.productImage}>
                        <img 
                          src={item.imageUrl} 
                          alt={item.name}
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
                      <div className={styles.itemInfo}>
                        <h4>{item.name}</h4>
                        <p className={styles.brand}>{item.brand}</p>
                        <p className={styles.price}>{item.price.toLocaleString()}원</p>
                      </div>
                    </div>
                  ))}
                  {(!countryData.skincare || countryData.skincare.length === 0) && (
                    <div className={styles.noItems}>
                      <p>데이터 준비 중입니다</p>
                    </div>
                  )}
                </div>
              </div>

              {/* 메이크업 미리보기 */}
              <div className={styles.categoryPreview}>
                <h4>💄 메이크업</h4>
                <div className={styles.hotItemsGrid}>
                  {countryData.makeup && countryData.makeup.slice(0, 2).map((item) => (
                    <div 
                      key={item.id} 
                      className={styles.hotItemCard}
                      onClick={() => handleProductClick(item.id)}
                      style={{ cursor: 'pointer' }}
                    >
                      <div className={styles.rankBadge}>#{item.popularityRank}</div>
                      <div className={styles.productImage}>
                        <img 
                          src={item.imageUrl} 
                          alt={item.name}
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
                      <div className={styles.itemInfo}>
                        <h4>{item.name}</h4>
                        <p className={styles.brand}>{item.brand}</p>
                        <p className={styles.price}>{item.price.toLocaleString()}원</p>
                      </div>
                    </div>
                  ))}
                  {(!countryData.makeup || countryData.makeup.length === 0) && (
                    <div className={styles.noItems}>
                      <p>데이터 준비 중입니다</p>
                    </div>
                  )}
                </div>
              </div>
              <div className={styles.categoryPreview}>
                <h4>🎁 향수</h4>
                <div className={styles.hotItemsGrid}>
                  {countryData.fragrance && countryData.fragrance.slice(0, 2).map((item) => (
                    <div 
                      key={item.id} 
                      className={styles.hotItemCard}
                      onClick={() => handleProductClick(item.id)}
                      style={{ cursor: 'pointer' }}
                    >
                      <div className={styles.rankBadge}>#{item.popularityRank}</div>
                      <div className={styles.productImage}>
                        <img 
                          src={item.imageUrl} 
                          alt={item.name}
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
                      <div className={styles.itemInfo}>
                        <h4>{item.name}</h4>
                        <p className={styles.brand}>{item.brand}</p>
                        <p className={styles.price}>{item.price.toLocaleString()}원</p>
                      </div>
                    </div>
                  ))}
                  {(!countryData.fragrance || countryData.fragrance.length === 0) && (
                    <div className={styles.noItems}>
                      <p>데이터 준비 중입니다</p>
                    </div>
                  )}
                </div>
              </div>
              <button className={styles.viewAllButton}>
                {countryData.country} 전체 보기
              </button>
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
            <div className={styles.demoCard} onClick={() => setCountrySelectModalOpen(true)}>
              <div className={styles.demoIcon}>🌐</div>
              <h4>국가별 추천템</h4>
              <p>각 국가에서 인기 있는 K-뷰티 아이템을 확인하세요</p>
              <button className={styles.tryButton}>체험하기</button>
            </div>
            
            <div className={styles.demoCard} onClick={() => setRecommendationModalOpen(true)}>
              <div className={styles.demoIcon}>💄</div>
              <h4>개인 맞춤 추천</h4>
              <p>본인용 또는 선물용 K-뷰티 제품을 추천받으세요</p>
              <button className={styles.tryButton}>체험하기</button>
            </div>
            
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

      <RecommendationModal
        isOpen={recommendationModalOpen}
        onClose={() => setRecommendationModalOpen(false)}
        onResult={handleRecommendationResult}
      />

      <CountrySelectModal
        isOpen={countrySelectModalOpen}
        onClose={() => setCountrySelectModalOpen(false)}
        onCountrySelect={handleCountrySelect}
      />
    </div>
  );
} 