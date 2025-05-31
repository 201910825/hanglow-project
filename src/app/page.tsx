"use client";

import React, { useState } from "react";
import styles from "./page.module.css";
import { useHanglowStore } from "./store/hanglowStore";
import TravelPhaseSelector from "./components/TravelPhaseSelector";
import MapComponent from "./components/MapComponent";
import { getTranslation } from "./translations";
import { Product } from "./types";

export default function Home() {
  const { 
    recommendedProducts, 
    beautyHotspots,
    trendingContent,
    user, 
    setLanguage,
    saveProduct,
    removeProduct 
  } = useHanglowStore();
  
  const [activeTab, setActiveTab] = useState("home");
  
  // 언어 변경 핸들러
  const handleLanguageChange = (lang: string) => {
    console.log('언어 변경:', lang);
    setLanguage(lang);
  };
  
  // 번역 함수 단축어
  const t = (key: string) => getTranslation(key, user.language);
  
  // 제품 저장 핸들러
  const handleSaveProduct = (product: Product) => {
    saveProduct(product);
    alert(`${product.name} 제품이 저장되었습니다!`);
  };
  
  // 제품 삭제 핸들러
  const handleRemoveProduct = (productId: string) => {
    removeProduct(productId);
    alert('제품이 삭제되었습니다!');
  };
  
  return (
    <div className={styles.page}>
      <header className={styles.header}>
        <div className={styles.logo}>HANGLOW</div>
        <nav className={styles.nav}>
          <button 
            className={`${styles.navButton} ${activeTab === 'home' ? styles.active : ''}`}
            onClick={() => setActiveTab('home')}
          >
            {t('nav_home')}
          </button>
          <button 
            className={`${styles.navButton} ${activeTab === 'products' ? styles.active : ''}`}
            onClick={() => setActiveTab('products')}
          >
            {t('nav_products')}
          </button>
          <button 
            className={`${styles.navButton} ${activeTab === 'hotspots' ? styles.active : ''}`}
            onClick={() => setActiveTab('hotspots')}
          >
            {t('nav_hotspots')}
          </button>
          <button 
            className={`${styles.navButton} ${activeTab === 'scan' ? styles.active : ''}`}
            onClick={() => setActiveTab('scan')}
          >
            {t('nav_scan')}
          </button>
          <button 
            className={`${styles.navButton} ${activeTab === 'mypage' ? styles.active : ''}`}
            onClick={() => setActiveTab('mypage')}
          >
            {t('nav_mypage')}
          </button>
        </nav>
        <div className={styles.langSelector}>
          <button 
            className={`${styles.navButton} ${user.language === 'ko' ? styles.active : ''}`}
            onClick={() => handleLanguageChange('ko')}
          >
            KO
          </button>
          <button 
            className={`${styles.navButton} ${user.language === 'en' ? styles.active : ''}`}
            onClick={() => handleLanguageChange('en')}
          >
            EN
          </button>
          <button 
            className={`${styles.navButton} ${user.language === 'zh' ? styles.active : ''}`}
            onClick={() => handleLanguageChange('zh')}
          >
            中文
          </button>
          <button 
            className={`${styles.navButton} ${user.language === 'ja' ? styles.active : ''}`}
            onClick={() => handleLanguageChange('ja')}
          >
            日本語
          </button>
        </div>
      </header>
      
      <main className={styles.main}>
        {activeTab === 'home' && (
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
                  <div key={product.id} className={styles.productCard}>
                    <div className={styles.productImage}>
                      <div className={styles.imagePlaceholder}></div>
                    </div>
                    <h3>{product.name}</h3>
                    <p className={styles.brand}>{product.brand}</p>
                    <p className={styles.price}>{product.price.toLocaleString()}원</p>
                  </div>
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
                      <div className={styles.imagePlaceholder}></div>
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
                      <div className={styles.imagePlaceholder}></div>
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
                  <p>{t('feature_before_desc')}</p>
                </div>
                <div className={styles.featureCard}>
                  <h3>{t('feature_during')}</h3>
                  <p>{t('feature_during_desc')}</p>
                </div>
                <div className={styles.featureCard}>
                  <h3>{t('feature_after')}</h3>
                  <p>{t('feature_after_desc')}</p>
                </div>
              </div>
            </section>
          </div>
        )}
        
        {activeTab === 'products' && (
          <div className={styles.productsContent}>
            <h1>K-뷰티 제품</h1>
            <div className={styles.filterOptions}>
              <select className={styles.filterSelect}>
                <option value="">카테고리</option>
                <option value="skincare">스킨케어</option>
                <option value="makeup">메이크업</option>
                <option value="haircare">헤어케어</option>
              </select>
              <select className={styles.filterSelect}>
                <option value="">브랜드</option>
                <option value="amore">아모레퍼시픽</option>
                <option value="laneige">라네즈</option>
                <option value="romand">롬앤</option>
              </select>
              <select className={styles.filterSelect}>
                <option value="">정렬</option>
                <option value="popular">인기순</option>
                <option value="price_low">가격 낮은순</option>
                <option value="price_high">가격 높은순</option>
              </select>
            </div>
            
            <div className={styles.productGrid}>
              {recommendedProducts.map((product) => (
                <div key={product.id} className={styles.productCard}>
                  <div className={styles.productImage}>
                    <div className={styles.imagePlaceholder}></div>
                  </div>
                  <h3>{product.name}</h3>
                  <p className={styles.brand}>{product.brand}</p>
                  <p className={styles.description}>{product.description}</p>
                  <p className={styles.price}>{product.price.toLocaleString()}원</p>
                  <button 
                    className={styles.saveButton}
                    onClick={() => handleSaveProduct(product)}
                  >
                    {t('save_button')}
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}
        
        {activeTab === 'hotspots' && (
          <div className={styles.hotspotsContent}>
            <h1>뷰티 핫플레이스</h1>
            <div className={styles.mapContainer}>
              <MapComponent hotspots={beautyHotspots} />
            </div>
            
            <div className={styles.hotspotList}>
              {beautyHotspots.map((hotspot) => (
                <div key={hotspot.id} className={styles.hotspotListItem}>
                  <div className={styles.hotspotImage}>
                    <div className={styles.imagePlaceholder}></div>
                  </div>
                  <div className={styles.hotspotInfo}>
                    <h3>{hotspot.name}</h3>
                    <p className={styles.location}>{hotspot.location}</p>
                    <p className={styles.description}>{hotspot.description}</p>
                    <button className={styles.directionButton}>길 찾기</button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
        
        {activeTab === 'scan' && (
          <div className={styles.scanContent}>
            <iframe 
              src="/scan" 
              style={{ 
                width: '100%', 
                height: '700px', 
                border: 'none',
                borderRadius: 'var(--border-radius)',
              }}
            />
          </div>
        )}
        
        {activeTab === 'mypage' && (
          <div className={styles.mypageContent}>
            <h1>마이페이지</h1>
            
            <div className={styles.userSection}>
              <div className={styles.userProfile}>
                <div className={styles.profilePlaceholder}></div>
                <div>
                  <h2>게스트</h2>
                  <p>로그인하여 더 많은 기능을 이용해보세요</p>
                  <button className={styles.loginButton}>로그인</button>
                </div>
              </div>
            </div>
            
            <div className={styles.savedSection}>
              <h2>저장한 제품</h2>
              {user.travelInfo.savedProducts.length > 0 ? (
                <div className={styles.savedProductGrid}>
                  {user.travelInfo.savedProducts.map((product) => (
                    <div key={product.id} className={styles.productCard}>
                      <div className={styles.productImage}>
                        <div className={styles.imagePlaceholder}></div>
                      </div>
                      <h3>{product.name}</h3>
                      <p className={styles.brand}>{product.brand}</p>
                      <p className={styles.price}>{product.price.toLocaleString()}원</p>
                      <button 
                        className={styles.removeButton}
                        onClick={() => handleRemoveProduct(product.id)}
                      >
                        {t('delete_button')}
                      </button>
                    </div>
                  ))}
                </div>
              ) : (
                <p className={styles.emptyState}>아직 저장한 제품이 없습니다.</p>
              )}
            </div>
            
            <div className={styles.visitedSection}>
              <h2>방문한 장소</h2>
              {user.travelInfo.visitedPlaces.length > 0 ? (
                <div className={styles.visitedPlacesList}>
                  {user.travelInfo.visitedPlaces.map((place, index) => (
                    <div key={index} className={styles.visitedPlace}>
                      <p>{place}</p>
                    </div>
                  ))}
                </div>
              ) : (
                <p className={styles.emptyState}>아직 방문한 장소가 없습니다.</p>
              )}
            </div>
          </div>
        )}
      </main>
      
      <footer className={styles.footer}>
        <div className={styles.footerContent}>
          <div className={styles.footerLogo}>HANGLOW</div>
          <div className={styles.footerLinks}>
            <a href="#">서비스 소개</a>
            <a href="#">이용약관</a>
            <a href="#">개인정보처리방침</a>
            <a href="#">문의하기</a>
          </div>
        </div>
        <div className={styles.copyright}>
          © 2023 HANGLOW. All rights reserved.
        </div>
      </footer>
    </div>
  );
} 