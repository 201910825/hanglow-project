"use client";

import React from 'react';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import { useHanglowStore } from '../../store/hanglowStore';
import styles from './product.module.css';

export default function ProductDetail() {
  const params = useParams();
  const router = useRouter();
  const { recommendedProducts, saveProduct } = useHanglowStore();
  
  const productId = typeof params.id === 'string' ? params.id : Array.isArray(params.id) ? params.id[0] : '';
  const product = recommendedProducts.find(p => p.id === productId);
  
  if (!product) {
    return (
      <div className="not-found-container">
        <h1>제품을 찾을 수 없습니다</h1>
        <button onClick={() => router.back()}>뒤로 가기</button>
      </div>
    );
  }
  
  // 같은 카테고리의 관련 제품 찾기
  const relatedProducts = recommendedProducts
    .filter(p => p.category === product.category && p.id !== product.id)
    .slice(0, 3);
  
  const handleSaveProduct = () => {
    saveProduct(product);
    alert('제품이 위시리스트에 추가되었습니다.');
  };
  
  return (
    <div>
      <div className={styles.productDetail}>
        <div className={styles.productImage}>
          <div className={styles.imagePlaceholder}></div>
        </div>
        <div className={styles.productInfo}>
          <h1>{product.name}</h1>
          <p className={styles.brand}>{product.brand}</p>
          <p className={styles.description}>{product.description}</p>
          <p className={styles.price}>{product.price.toLocaleString()}원</p>
          <button onClick={handleSaveProduct}>위시리스트에 추가</button>
        </div>
      </div>
      
      {relatedProducts.length > 0 && (
        <div className={styles.relatedProducts}>
          <h2>관련 제품</h2>
          <div className={styles.productGrid}>
            {relatedProducts.map((relatedProduct) => (
              <div key={relatedProduct.id} className={styles.productCard}>
                <Link href={`/products/${relatedProduct.id}`}>
                  <div className={styles.productImage}>
                    <div className={styles.imagePlaceholder}></div>
                  </div>
                  <h3>{relatedProduct.name}</h3>
                  <p className={styles.brand}>{relatedProduct.brand}</p>
                  <p className={styles.price}>{relatedProduct.price.toLocaleString()}원</p>
                </Link>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
} 