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
      <div className={styles.container}>
        <header className={styles.header}>
          <button 
            className={styles.backButton}
            onClick={() => router.back()}
            aria-label="뒤로 가기"
          >
            ← 뒤로 가기
          </button>
          <div className={styles.logo}>HANGLOW</div>
        </header>
        
        <div className={styles.notFoundContainer}>
          <h1>제품을 찾을 수 없습니다</h1>
          <button 
            className={styles.homeButton}
            onClick={() => router.push('/')}
          >
            홈으로 돌아가기
          </button>
        </div>
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
    <div className={styles.container}>
      <header className={styles.header}>
        <button 
          className={styles.backButton}
          onClick={() => router.back()}
          aria-label="뒤로 가기"
        >
          ← 뒤로 가기
        </button>
        <div className={styles.logo}>HANGLOW</div>
        <Link href="/" className={styles.homeLink}>
          홈으로
        </Link>
      </header>
      
      <main className={styles.main}>
        <div className={styles.productDetail}>
          <div className={styles.productImage}>
            <img 
              src={product.imageUrl} 
              alt={product.name}
              onError={(e) => {
                const target = e.target as HTMLImageElement;
                target.style.display = 'none';
                target.nextElementSibling?.classList.add(styles.show);
              }}
            />
           
          </div>
          <div className={styles.productInfo}>
            <div className={styles.breadcrumb}>
              <Link href="/">홈</Link> → <span>제품 상세</span>
            </div>
            <h1>{product.name}</h1>
            <p className={styles.brand}>{product.brand}</p>
            <p className={styles.category}>{product.category}</p>
            <p className={styles.description}>{product.description}</p>
            <p className={styles.price}>{product.price.toLocaleString()}원</p>
            <div className={styles.buttonGroup}>
              <button 
                className={styles.saveButton}
                onClick={handleSaveProduct}
              >
                위시리스트에 추가
              </button>
              <button 
                className={styles.shareButton}
                onClick={() => {
                  if (navigator.share) {
                    navigator.share({
                      title: product.name,
                      text: product.description,
                      url: window.location.href
                    });
                  } else {
                    navigator.clipboard.writeText(window.location.href);
                    alert('링크가 복사되었습니다!');
                  }
                }}
              >
                공유하기
              </button>
            </div>
          </div>
        </div>
        
        {relatedProducts.length > 0 && (
          <div className={styles.relatedProducts}>
            <h2>관련 제품</h2>
            <div className={styles.productGrid}>
              {relatedProducts.map((relatedProduct) => (
                <div key={relatedProduct.id} className={styles.productCard}>
                  <Link href={`/products/${relatedProduct.id}`}>
                    <div className={styles.relatedProductImage}>
                      <img 
                        src={relatedProduct.imageUrl} 
                        alt={relatedProduct.name}
                        onError={(e) => {
                          const target = e.target as HTMLImageElement;
                          target.style.display = 'none';
                          target.nextElementSibling?.classList.add(styles.show);
                        }}
                      />
                      <div className={styles.imagePlaceholder}>
                        이미지 준비중
                      </div>
                    </div>
                    <div className={styles.cardInfo}>
                      <h3>{relatedProduct.name}</h3>
                      <p className={styles.brand}>{relatedProduct.brand}</p>
                      <p className={styles.price}>{relatedProduct.price.toLocaleString()}원</p>
                    </div>
                  </Link>
                </div>
              ))}
            </div>
          </div>
        )}
      </main>
    </div>
  );
} 