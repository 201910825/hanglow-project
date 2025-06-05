"use client";

import React from 'react';
import { useRouter } from 'next/navigation';
import { getTranslation } from '../translations';
import { useHanglowStore } from '../store/hanglowStore';
import { RecommendationResult } from './RecommendationModal';
import styles from './RecommendationResult.module.css';

interface RecommendationResultProps {
  result: RecommendationResult;
  onClose: () => void;
}

export default function RecommendationResultComponent({ result, onClose }: RecommendationResultProps) {
  const router = useRouter();
  const { user, countryHotItems } = useHanglowStore();
  const t = (key: string) => getTranslation(key, user.language);

  // 제품 상세 페이지로 이동
  const handleProductClick = (productId: string) => {
    router.push(`/products/${productId}`);
  };

  // 선택된 국가의 데이터 찾기
  const getCountryData = () => {
    if (result.type === 'personal') {
      // 본인용인 경우 미국 데이터를 기본으로 (미국 거주 가정)
      return countryHotItems.find(item => item.countryCode === 'US');
    } else {
      // 선물용인 경우 선택된 국적의 데이터
      return countryHotItems.find(item => item.countryCode === result.nationality);
    }
  };

  const countryData = getCountryData();

  if (!countryData) {
    return (
      <div className={styles.container}>
        <div className={styles.header}>
          <button className={styles.closeButton} onClick={onClose}>
            ✕
          </button>
          <h2>추천 결과</h2>
        </div>
        <div className={styles.noData}>
          <p>해당 국가의 추천 데이터를 준비 중입니다.</p>
        </div>
      </div>
    );
  }

  const getTitle = () => {
    if (result.type === 'personal') {
      return '당신을 위한 K-뷰티 추천';
    } else {
      return `${countryData.country} ${result.gender} ${result.age}를 위한 K-뷰티 추천`;
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <button className={styles.closeButton} onClick={onClose}>
          ✕
        </button>
        <div className={styles.titleSection}>
          <h2>{getTitle()}</h2>
          <div className={styles.countryInfo}>
            <span className={styles.flag}>{countryData.flag}</span>
            <span className={styles.countryName}>{countryData.country}</span>
          </div>
        </div>
      </div>

      <div className={styles.categoriesGrid}>
        {/* 스킨케어 */}
        <div className={styles.categorySection}>
          <div className={styles.categoryHeader}>
            <span className={styles.categoryIcon}>🧴</span>
            <h3>스킨케어</h3>
          </div>
          <div className={styles.productList}>
            {countryData.skincare && countryData.skincare.map((product) => (
              <div 
                key={product.id} 
                className={styles.productCard}
                onClick={() => handleProductClick(product.id)}
                style={{ cursor: 'pointer' }}
              >
                <div className={styles.rankBadge}>#{product.popularityRank}</div>
                <div className={styles.productImage}>
                  <img 
                    src={product.imageUrl} 
                    alt={product.name}
                    onError={(e) => {
                      const target = e.target as HTMLImageElement;
                      target.style.display = 'none';
                    }}
                  />
                </div>
                <div className={styles.productInfo}>
                  <h4>{product.name}</h4>
                  <p className={styles.brand}>{product.brand}</p>
                  <p className={styles.price}>{product.price.toLocaleString()}원</p>
                  <p className={styles.description}>{product.description}</p>
                </div>
              </div>
            ))}
            {(!countryData.skincare || countryData.skincare.length === 0) && (
              <div className={styles.noData}>
                <p>스킨케어 데이터를 준비 중입니다.</p>
              </div>
            )}
          </div>
        </div>

        {/* 메이크업 */}
        <div className={styles.categorySection}>
          <div className={styles.categoryHeader}>
            <span className={styles.categoryIcon}>💄</span>
            <h3>메이크업</h3>
          </div>
          <div className={styles.productList}>
            {countryData.makeup && countryData.makeup.map((product) => (
              <div 
                key={product.id} 
                className={styles.productCard}
                onClick={() => handleProductClick(product.id)}
                style={{ cursor: 'pointer' }}
              >
                <div className={styles.rankBadge}>#{product.popularityRank}</div>
                <div className={styles.productImage}>
                  <img 
                    src={product.imageUrl} 
                    alt={product.name}
                    onError={(e) => {
                      const target = e.target as HTMLImageElement;
                      target.style.display = 'none';
                    }}
                  />
                </div>
                <div className={styles.productInfo}>
                  <h4>{product.name}</h4>
                  <p className={styles.brand}>{product.brand}</p>
                  <p className={styles.price}>{product.price.toLocaleString()}원</p>
                  <p className={styles.description}>{product.description}</p>
                </div>
              </div>
            ))}
            {(!countryData.makeup || countryData.makeup.length === 0) && (
              <div className={styles.noData}>
                <p>메이크업 데이터를 준비 중입니다.</p>
              </div>
            )}
          </div>
        </div>

        {/* 향수 */}
        <div className={styles.categorySection}>
          <div className={styles.categoryHeader}>
            <span className={styles.categoryIcon}>🌸</span>
            <h3>향수</h3>
          </div>
          <div className={styles.productList}>
            {countryData.fragrance && countryData.fragrance.map((product) => (
              <div 
                key={product.id} 
                className={styles.productCard}
                onClick={() => handleProductClick(product.id)}
                style={{ cursor: 'pointer' }}
              >
                <div className={styles.rankBadge}>#{product.popularityRank}</div>
                <div className={styles.productImage}>
                  <img 
                    src={product.imageUrl} 
                    alt={product.name}
                    onError={(e) => {
                      const target = e.target as HTMLImageElement;
                      target.style.display = 'none';
                    }}
                  />
                </div>
                <div className={styles.productInfo}>
                  <h4>{product.name}</h4>
                  <p className={styles.brand}>{product.brand}</p>
                  <p className={styles.price}>{product.price.toLocaleString()}원</p>
                  <p className={styles.description}>{product.description}</p>
                </div>
              </div>
            ))}
            {(!countryData.fragrance || countryData.fragrance.length === 0) && (
              <div className={styles.noData}>
                <p>향수 데이터를 준비 중입니다.</p>
              </div>
            )}
          </div>
        </div>

        {/* 매장 */}
        <div className={styles.categorySection}>
          <div className={styles.categoryHeader}>
            <span className={styles.categoryIcon}>🏪</span>
            <h3>추천 매장</h3>
          </div>
          <div className={styles.productList}>
            {countryData.stores && countryData.stores.map((store) => (
              <div 
                key={store.id} 
                className={styles.productCard}
                onClick={() => handleProductClick(store.id)}
                style={{ cursor: 'pointer' }}
              >
                <div className={styles.rankBadge}>#{store.popularityRank}</div>
                <div className={styles.productImage}>
                  <img 
                    src={store.imageUrl} 
                    alt={store.name}
                    onError={(e) => {
                      const target = e.target as HTMLImageElement;
                      target.style.display = 'none';
                    }}
                  />
                </div>
                <div className={styles.productInfo}>
                  <h4>{store.name}</h4>
                  <p className={styles.brand}>{store.brand}</p>
                  <p className={styles.description}>{store.description}</p>
                </div>
              </div>
            ))}
            {(!countryData.stores || countryData.stores.length === 0) && (
              <div className={styles.noData}>
                <p>매장 데이터를 준비 중입니다.</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
} 