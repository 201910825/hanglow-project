"use client";

import React, { useEffect, useState } from 'react';
import styles from './MapComponent.module.css';

interface MapProps {
  hotspots: {
    id: string;
    name: string;
    location: string;
  }[];
  onSelectHotspot?: (id: string) => void;
}

export default function MapComponent({ hotspots, onSelectHotspot }: MapProps) {
  const [activeSpot, setActiveSpot] = useState<string | null>(null);
  
  // 지도 로딩 상태
  const [isMapLoaded, setIsMapLoaded] = useState(false);
  
  useEffect(() => {
    // 실제 구현에서는 여기서 지도 API를 로드합니다
    // 현재는 시뮬레이션만 수행합니다
    const timer = setTimeout(() => {
      setIsMapLoaded(true);
    }, 1000);
    
    return () => clearTimeout(timer);
  }, []);
  
  const handleMarkerClick = (id: string) => {
    setActiveSpot(id);
    if (onSelectHotspot) {
      onSelectHotspot(id);
    }
  };
  
  return (
    <div className={styles.mapWrapper}>
      {!isMapLoaded ? (
        <div className={styles.mapLoading}>
          <div className={styles.spinner}></div>
          <p>지도를 로딩 중입니다...</p>
        </div>
      ) : (
        <div className={styles.map}>
          {/* 이것은 실제 지도가 아닌 시각적 시뮬레이션입니다 */}
          <div className={styles.mapBackground}>
            {/* 가상의 지도 표시 */}
            <div className={styles.mapGrid}>
              {Array.from({ length: 5 }).map((_, rowIndex) => (
                <div key={`row-${rowIndex}`} className={styles.mapRow}>
                  {Array.from({ length: 5 }).map((_, colIndex) => (
                    <div key={`cell-${rowIndex}-${colIndex}`} className={styles.mapCell} />
                  ))}
                </div>
              ))}
            </div>
            
            {/* 핫스팟 마커 표시 */}
            {hotspots.map((hotspot, index) => (
              <div 
                key={hotspot.id}
                className={`${styles.marker} ${activeSpot === hotspot.id ? styles.active : ''}`}
                style={{ 
                  left: `${20 + (index * 15)}%`, 
                  top: `${30 + ((index % 3) * 20)}%` 
                }}
                onClick={() => handleMarkerClick(hotspot.id)}
              >
                <div className={styles.pin}></div>
                <div className={styles.markerTooltip}>
                  <p className={styles.markerName}>{hotspot.name}</p>
                  <p className={styles.markerLocation}>{hotspot.location}</p>
                </div>
              </div>
            ))}
          </div>
          
          <div className={styles.mapControls}>
            <button className={styles.mapControlButton}>+</button>
            <button className={styles.mapControlButton}>-</button>
          </div>
        </div>
      )}
    </div>
  );
} 