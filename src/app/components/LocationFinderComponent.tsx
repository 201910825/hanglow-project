"use client";

import React, { useState } from 'react';
import styles from './FeatureComponents.module.css';

export default function LocationFinderComponent() {
  const [isSearching, setIsSearching] = useState(false);
  const [nearbySpots] = useState([
    { name: '올리브영 명동점', distance: '200m', rating: 4.8, discount: '15% 할인' },
    { name: '이니스프리 명동점', distance: '350m', rating: 4.6, discount: '10% 할인' },
    { name: '네이처리퍼블릭 명동점', distance: '450m', rating: 4.5, discount: '20% 할인' },
  ]);

  const handleSearch = () => {
    setIsSearching(true);
    setTimeout(() => {
      setIsSearching(false);
    }, 2000);
  };

  return (
    <div className={styles.locationFinder}>
      <div className={styles.header}>
        <div className={styles.iconWrapper}>
          <img 
            src="https://cdn-icons-png.flaticon.com/512/684/684908.png" 
            alt="위치 탐색" 
            className={styles.featureIcon}
          />
        </div>
        <h3>위치 기반 뷰티 핫플 탐색</h3>
        <p>현재 위치 주변의 K-뷰티 매장을 찾아보세요</p>
      </div>

      <div className={styles.searchSection}>
        <button 
          className={styles.searchButton} 
          onClick={handleSearch}
          disabled={isSearching}
        >
          {isSearching ? (
            <div className={styles.loadingSpinner}></div>
          ) : (
            <>
              <span>📍</span>
              주변 뷰티 매장 찾기
            </>
          )}
        </button>
      </div>

      <div className={styles.resultsSection}>
        <h4>내 주변 뷰티 매장</h4>
        {nearbySpots.map((spot, index) => (
          <div key={index} className={styles.spotCard}>
            <div className={styles.spotInfo}>
              <h5>{spot.name}</h5>
              <div className={styles.spotDetails}>
                <span className={styles.distance}>📍 {spot.distance}</span>
                <span className={styles.rating}>⭐ {spot.rating}</span>
                <span className={styles.discount}>🎫 {spot.discount}</span>
              </div>
            </div>
            <button className={styles.directionButton}>길찾기</button>
          </div>
        ))}
      </div>

      <div className={styles.mapPlaceholder}>
        <div className={styles.mapIcon}>🗺️</div>
        <p>지도에서 보기</p>
      </div>
    </div>
  );
} 