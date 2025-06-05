"use client";

import React from 'react';
import { useParams } from 'next/navigation';
import { useHanglowStore } from '../../store/hanglowStore';
import styles from './ProductDetail.module.css';

export default function ProductDetailPage() {
  const params = useParams();
  const productId = params.id as string;
  const { countryHotItems, recommendedProducts } = useHanglowStore();

  // 모든 제품 데이터에서 해당 ID 찾기
  const findProduct = () => {
    // 추천 제품에서 찾기
    const foundInRecommended = recommendedProducts.find(p => p.id === productId);
    if (foundInRecommended) return foundInRecommended;

    // 국가별 데이터에서 찾기
    for (const country of countryHotItems) {
      const allProducts = [
        ...(country.skincare || []),
        ...(country.makeup || []),
        ...(country.fragrance || []),
        ...(country.stores || [])
      ];
      const found = allProducts.find(p => p.id === productId);
      if (found) return { ...found, country: country.country, flag: country.flag };
    }
    return null;
  };

  const product = findProduct();

  if (!product) {
    return (
      <div className={styles.container}>
        <div className={styles.notFound}>
          <h2>제품을 찾을 수 없습니다</h2>
          <p>요청하신 제품 정보를 찾을 수 없습니다.</p>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.container}>
      {/* 제품 이미지 및 기본 정보 - 선명하게 */}
      <div className={styles.productHeader}>
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
          <div className={styles.brandBadge}>
            <span>{product.brand}</span>
            {(product as any).country && (
              <span className={styles.countryBadge}>
                {(product as any).flag} {(product as any).country}
              </span>
            )}
          </div>
          <h1 className={styles.productName}>{product.name}</h1>
          <p className={styles.productDescription}>{product.description}</p>
          {product.price && product.price > 0 && (
            <div className={styles.priceSection}>
              <span className={styles.price}>{product.price.toLocaleString()}원</span>
              {(product as any).popularityRank && (
                <span className={styles.rankBadge}>인기 #{(product as any).popularityRank}</span>
              )}
            </div>
          )}
        </div>
      </div>

      {/* 블러 처리된 섹션들 */}
      <div className={styles.premiumSection}>
        <div className={styles.sectionTitle}>
          <h2>🔒 프리미엄 정보</h2>
          <p>로그인하시면 더 자세한 정보를 확인할 수 있습니다</p>
        </div>

        {/* 브랜드 페이지 링크 - 블러 처리 */}
        <div className={`${styles.section} ${styles.blurred}`}>
          <h3>🏢 브랜드 정보</h3>
          <div className={styles.brandInfo}>
            <div className={styles.brandLogo}></div>
            <div className={styles.brandDetails}>
              <h4>{product.brand} 공식 페이지</h4>
              <p>브랜드 스토리, 제품 라인업, 공식 온라인몰 정보를 확인하세요</p>
              <button className={styles.linkButton}>브랜드 페이지 방문하기</button>
            </div>
          </div>
        </div>

        {/* 구매 매장 추천 - 블러 처리 */}
        <div className={`${styles.section} ${styles.blurred}`}>
          <h3>📍 구매 가능한 매장</h3>
          <div className={styles.storeMap}>
            <div className={styles.mapPlaceholder}>
              <div className={styles.mapIcon}>🗺️</div>
              <p>서울 시내 5개 매장에서 판매 중</p>
            </div>
            <div className={styles.storeList}>
              <div className={styles.storeItem}>
                <span className={styles.storeName}>올리브영 명동점</span>
                <span className={styles.distance}>도보 5분</span>
              </div>
              <div className={styles.storeItem}>
                <span className={styles.storeName}>롯데면세점 명동점</span>
                <span className={styles.distance}>도보 8분</span>
              </div>
              <div className={styles.storeItem}>
                <span className={styles.storeName}>아리따움 홍대점</span>
                <span className={styles.distance}>지하철 15분</span>
              </div>
            </div>
          </div>
        </div>

        {/* 후기 요약 - 블러 처리 */}
        <div className={`${styles.section} ${styles.blurred}`}>
          <h3>⭐ 사용자 후기 요약</h3>
          <div className={styles.reviewSummary}>
            <div className={styles.ratingOverview}>
              <div className={styles.avgRating}>4.7</div>
              <div className={styles.ratingStars}>⭐⭐⭐⭐⭐</div>
              <div className={styles.reviewCount}>총 1,234개 후기</div>
            </div>
            <div className={styles.reviewHighlights}>
              <div className={styles.highlight}>👍 "발색이 정말 좋아요"</div>
              <div className={styles.highlight}>👍 "지속력이 뛰어남"</div>
              <div className={styles.highlight}>👍 "가성비 최고"</div>
            </div>
          </div>
        </div>

        {/* 추천 인기 링크 - 블러 처리 */}
        <div className={`${styles.section} ${styles.blurred}`}>
          <h3>🔗 관련 인기 콘텐츠</h3>
          <div className={styles.popularLinks}>
            <div className={styles.linkItem}>
              <div className={styles.linkImage}></div>
              <div className={styles.linkContent}>
                <h4>유튜버 리뷰 모음</h4>
                <p>인기 뷰티 유튜버들의 상세 리뷰</p>
              </div>
            </div>
            <div className={styles.linkItem}>
              <div className={styles.linkImage}></div>
              <div className={styles.linkContent}>
                <h4>사용법 가이드</h4>
                <p>제품을 200% 활용하는 방법</p>
              </div>
            </div>
            <div className={styles.linkItem}>
              <div className={styles.linkImage}></div>
              <div className={styles.linkContent}>
                <h4>비슷한 제품 비교</h4>
                <p>동일 카테고리 인기 제품 비교</p>
              </div>
            </div>
          </div>
        </div>

        {/* 로그인 유도 */}
        <div className={styles.loginPrompt}>
          <h3>🔓 더 많은 정보를 원하시나요?</h3>
          <p>로그인하시면 모든 프리미엄 정보를 확인할 수 있습니다</p>
          <div className={styles.loginButtons}>
            <button className={styles.loginButton}>로그인</button>
            <button className={styles.signupButton}>회원가입</button>
          </div>
        </div>
      </div>
    </div>
  );
} 