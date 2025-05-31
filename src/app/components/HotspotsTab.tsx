"use client";

import React from 'react';
import { useHanglowStore } from '../store/hanglowStore';
import MapComponent from './MapComponent';
import styles from '../page.module.css';

export default function HotspotsTab() {
  const { beautyHotspots } = useHanglowStore();
  
  const hotspots = [
    {
      id: "myeongdong",
      name: "명동 화장품 거리",
      location: "서울 중구 명동",
      coordinates: { lat: 37.5635, lng: 126.9856 }
    },
    {
      id: "gangnam",
      name: "가로수길 뷰티샵",
      location: "서울 강남구 신사동",
      coordinates: { lat: 37.5190, lng: 127.0232 }
    }
  ];

  return (
    <div className={styles.hotspotsContent}>
      <h1>뷰티 핫플레이스</h1>
      <div className={styles.mapContainer}>
        <MapComponent 
          hotspots={hotspots}
          onSelectHotspot={(id) => console.log('선택된 핫스팟:', id)}
        />
      </div>
      
      <div className={styles.hotspotList}>
        {beautyHotspots.map((hotspot) => (
          <div key={hotspot.id} className={styles.hotspotListItem}>
            <div className={styles.hotspotImage}>
              <img src={hotspot.imageUrl} alt={hotspot.name} />
            </div>
            <div className={styles.hotspotInfo}>
              <img src={hotspot.imageUrl} alt={hotspot.name} />
              <h3>{hotspot.name}</h3>
              <p className={styles.location}>{hotspot.location}</p>
              <p className={styles.description}>{hotspot.description}</p>
              <button className={styles.directionButton}>길 찾기</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
} 