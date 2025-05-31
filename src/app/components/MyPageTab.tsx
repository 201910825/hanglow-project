"use client";

import React from 'react';
import Link from 'next/link';
import { useHanglowStore } from '../store/hanglowStore';
import { getTranslation } from '../translations';
import styles from '../page.module.css';

export default function MyPageTab() {
  const { user, removeProduct } = useHanglowStore();
  
  // 번역 함수 단축어
  const t = (key: string) => getTranslation(key, user.language);
  
  // 제품 삭제 핸들러
  const handleRemoveProduct = (productId: string) => {
    removeProduct(productId);
    alert('제품이 삭제되었습니다!');
  };

  return (
    <div className={styles.mypageContent}>
      <h1>마이페이지</h1>
      
      <div className={styles.userSection}>
        <div className={styles.userProfile}>
          <div className={styles.profilePlaceholder}></div>
          <div>
            <h3>게스트 사용자</h3>
            <p>한국 여행을 계획 중입니다</p>
          </div>
        </div>
        <button className={styles.loginButton}>로그인</button>
      </div>
      
      <div className={styles.savedSection}>
        <h2>{t('section_saved')}</h2>
        {user.travelInfo.savedProducts.length > 0 ? (
          <div className={styles.savedProductGrid}>
            {user.travelInfo.savedProducts.map((product) => (
              <div key={product.id} className={styles.productCard}>
                <div className={styles.productImage}>
                  <img src={product.imageUrl} alt={product.name} />
                </div>
                <h3>{product.name}</h3>
                <p className={styles.brand}>{product.brand}</p>
                <p className={styles.price}>{product.price.toLocaleString()}원</p>
                <div className={styles.actionButtons}>
                  <Link href={`/products/${product.id}`}>상세보기</Link>
                  <button 
                    className={styles.removeButton}
                    onClick={() => handleRemoveProduct(product.id)}
                  >
                    삭제
                  </button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className={styles.emptyState}>
            <p>저장된 제품이 없습니다.</p>
            <p>관심 있는 제품을 저장해보세요!</p>
          </div>
        )}
      </div>
      
      <div className={styles.visitedSection}>
        <h2>{t('section_visited')}</h2>
        {user.travelInfo.visitedPlaces.length > 0 ? (
          <div className={styles.visitedPlacesList}>
            {user.travelInfo.visitedPlaces.map((place, index) => (
              <div key={index} className={styles.visitedPlace}>
                <div className={styles.placeImage}>
                  <div className={styles.imagePlaceholder}></div>
                </div>
                <div>
                  <h4>{place}</h4>
                  <p>방문 완료</p>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className={styles.emptyState}>
            <p>방문한 장소가 없습니다.</p>
            <p>한국의 뷰티 핫스팟을 탐험해보세요!</p>
          </div>
        )}
      </div>
    </div>
  );
} 