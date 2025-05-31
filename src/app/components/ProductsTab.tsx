"use client";

import React from 'react';
import Link from 'next/link';
import { useHanglowStore } from '../store/hanglowStore';
import { getTranslation } from '../translations';
import { Product } from '../types';
import styles from '../page.module.css';

export default function ProductsTab() {
  const { user, recommendedProducts, saveProduct } = useHanglowStore();
  
  // 번역 함수 단축어
  const t = (key: string) => getTranslation(key, user.language);
  
  // 제품 저장 핸들러
  const handleSaveProduct = (product: Product) => {
    saveProduct(product);
    alert(`${product.name} 제품이 저장되었습니다!`);
  };

  return (
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
            <Link href={`/products/${product.id}`}>
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
              <p className={styles.description}>{product.description}</p>
              <p className={styles.price}>{product.price.toLocaleString()}원</p>
            </Link>
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
  );
} 