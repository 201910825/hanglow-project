"use client";

import React from 'react';
import Link from 'next/link';
import { useHanglowStore } from '../store/hanglowStore';
import styles from './wishlist.module.css';

export default function Wishlist() {
  const { user, removeProduct } = useHanglowStore();
  const { savedProducts } = user.travelInfo;
  
  const handleRemove = (productId: string) => {
    if (confirm('정말로 이 제품을 위시리스트에서 삭제하시겠습니까?')) {
      removeProduct(productId);
    }
  };
  
  return (
    <div className={styles.wishlistPage}>
      <h1>나의 위시리스트</h1>
      
      {savedProducts.length > 0 ? (
        <div className={styles.wishlistGrid}>
          {savedProducts.map((product) => (
            <div key={product.id} className={styles.wishlistItem}>
              <div className={styles.productImage}>
                <div className={styles.imagePlaceholder}></div>
              </div>
              <div className={styles.productInfo}>
                <h3>{product.name}</h3>
                <p className={styles.brand}>{product.brand}</p>
                <p className={styles.price}>{product.price.toLocaleString()}원</p>
                <div className={styles.actions}>
                  <Link href={`/products/${product.id}`}>상세보기</Link>
                  <button onClick={() => handleRemove(product.id)}>삭제</button>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p className={styles.emptyState}>
          아직 저장한 제품이 없습니다. 마음에 드는 K-뷰티 제품을 위시리스트에 추가해보세요.
        </p>
      )}
    </div>
  );
} 