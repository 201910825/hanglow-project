"use client";

import React, { useState } from 'react';
import styles from './FeatureComponents.module.css';

export default function CouponComponent() {
  const [activeCoupons, setActiveCoupons] = useState([
    { 
      id: 1, 
      store: '올리브영', 
      discount: '15%', 
      code: 'HANGLOW15', 
      expiry: '2024-12-31',
      description: '전 상품 15% 할인',
      isUsed: false
    },
    { 
      id: 2, 
      store: '이니스프리', 
      discount: '20%', 
      code: 'INNISFREE20', 
      expiry: '2024-12-25',
      description: '그린티 라인 20% 할인',
      isUsed: false
    },
    { 
      id: 3, 
      store: '라네즈', 
      discount: '₩10,000', 
      code: 'LANEIGE10K', 
      expiry: '2024-12-28',
      description: '5만원 이상 구매시 1만원 할인',
      isUsed: true
    },
  ]);

  const handleUseCoupon = (couponId: number) => {
    setActiveCoupons(prev => 
      prev.map(coupon => 
        coupon.id === couponId 
          ? { ...coupon, isUsed: true }
          : coupon
      )
    );
    alert('쿠폰이 적용되었습니다!');
  };

  return (
    <div className={styles.couponComponent}>
      <div className={styles.header}>
        <div className={styles.iconWrapper}>
          <img 
            src="https://cdn-icons-png.flaticon.com/512/2830/2830284.png" 
            alt="할인 쿠폰" 
            className={styles.featureIcon}
          />
        </div>
        <h3>할인 쿠폰 제공</h3>
        <p>HANGLOW 전용 할인 쿠폰으로 더 저렴하게 쇼핑하세요</p>
      </div>

      <div className={styles.statsSection}>
        <div className={styles.statCard}>
          <span className={styles.statNumber}>{activeCoupons.filter(c => !c.isUsed).length}</span>
          <span className={styles.statLabel}>사용 가능한 쿠폰</span>
        </div>
        <div className={styles.statCard}>
          <span className={styles.statNumber}>₩50,000</span>
          <span className={styles.statLabel}>총 절약 금액</span>
        </div>
      </div>

      <div className={styles.couponsSection}>
        <h4>내 쿠폰함</h4>
        {activeCoupons.map((coupon) => (
          <div key={coupon.id} className={`${styles.couponCard} ${coupon.isUsed ? styles.usedCoupon : ''}`}>
            <div className={styles.couponLeft}>
              <div className={styles.discountBadge}>
                {coupon.discount}
              </div>
            </div>
            <div className={styles.couponRight}>
              <div className={styles.couponHeader}>
                <h5>{coupon.store}</h5>
                <span className={styles.couponCode}>{coupon.code}</span>
              </div>
              <p className={styles.couponDescription}>{coupon.description}</p>
              <div className={styles.couponFooter}>
                <span className={styles.expiry}>만료일: {coupon.expiry}</span>
                {!coupon.isUsed ? (
                  <button 
                    className={styles.useButton} 
                    onClick={() => handleUseCoupon(coupon.id)}
                  >
                    사용하기
                  </button>
                ) : (
                  <span className={styles.usedLabel}>사용완료</span>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className={styles.newCouponSection}>
        <div className={styles.newCouponBanner}>
          <span>🎁</span>
          <div>
            <h4>새로운 쿠폰이 도착했어요!</h4>
            <p>앱을 열 때마다 새로운 할인 혜택을 확인하세요</p>
          </div>
          <button className={styles.checkButton}>확인</button>
        </div>
      </div>
    </div>
  );
} 