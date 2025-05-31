"use client";

import React, { useState } from 'react';
import styles from './MapComponent.module.css';

interface MapProps {
  hotspots: {
    id: string;
    name: string;
    location: string;
    coordinates: {
      lat: number;
      lng: number;
    };
  }[];
  onSelectHotspot?: (id: string) => void;
}

export default function MapComponent({ hotspots, onSelectHotspot }: MapProps) {
  const [selectedHotspot, setSelectedHotspot] = useState<string | null>(null);
  
  // 구글 지도를 위한 정확한 마커 위치 계산
  const calculateMarkerPosition = (lat: number, lng: number) => {
    // 구글 지도 iframe의 현재 뷰포트 (서울 중심, 줌 레벨 13)
    // 중심: 37.5665, 126.9447222 기준
    const mapCenter = { lat: 37.5665, lng: 126.9447222 };
    
    // Web Mercator 투영법 기반 계산
    const latRange = 0.11; // 약 ±0.055도 범위
    const lngRange = 0.15; // 약 ±0.075도 범위
    
    // 중심점에서의 상대적 위치 계산
    const latOffset = lat - mapCenter.lat;
    const lngOffset = lng - mapCenter.lng;
    
    // 퍼센트로 변환 (50%가 중심점)
    const leftPercent = 50 + (lngOffset / lngRange) * 100;
    const topPercent = 50 - (latOffset / latRange) * 100; // 위도는 Y축 반전
    
    return {
      left: `${Math.max(5, Math.min(95, leftPercent))}%`,
      top: `${Math.max(5, Math.min(95, topPercent))}%`
    };
  };
  
  return (
    <div className={styles.mapWrapper}>
      <div className={styles.map}>
        <div className={styles.staticMapContainer}>
          {/* 구글 지도 (정적 - 드래그 불가) */}
          <div className={styles.googleMapContainer}>
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d50672.26185313082!2d126.9447222!3d37.5665!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x357ca28b61c565cd%3A0x858aedb4e4ea83eb!2z7ISc7Jq47Yq567OE7IucIOyEnOyauOyLnA!5e0!3m2!1sko!2skr!4v1"
              width="100%"
              height="100%"
              style={{ border: 0, pointerEvents: 'none' }}
              allowFullScreen={false}
              loading="lazy"
              draggable={false}
              referrerPolicy="no-referrer-when-downgrade"
              className={styles.staticGoogleMap}
            />
            {/* 드래그 방지 오버레이 */}
           
          </div>
           
          {/* 커스텀 마커 오버레이 */}
          <div className={styles.markerOverlay}>
            {hotspots.map((hotspot) => {
              const position = calculateMarkerPosition(
                hotspot.coordinates.lat,
                hotspot.coordinates.lng
              );
              
              return (
                <div 
                  key={hotspot.id}
                  className={`${styles.customMarker} ${selectedHotspot === hotspot.id ? styles.active : ''}`}
                  style={{ 
                    position: 'absolute',
                    left: position.left, 
                    top: position.top,
                    transform: 'translate(-50%, -100%)'
                  }}
                  onClick={() => {
                    setSelectedHotspot(hotspot.id);
                    if (onSelectHotspot) {
                      onSelectHotspot(hotspot.id);
                    }
                  }}
                >
                  <div className={styles.pin}>🏪</div>
                  <div className={styles.markerTooltip}>
                    <p className={styles.markerName}>{hotspot.name}</p>
                    <p className={styles.markerLocation}>{hotspot.location}</p>
                  </div>
                </div>
              );
            })}
          </div>
          <div className={styles.mapOverlayBlock}></div>
          {/* 지도 정보 */}
          <div className={styles.mapTypeInfo}>
            <span>🗺️ K-뷰티 핫스팟 지도</span>
          </div>
        </div>
        
        {/* 핫스팟 리스트 */}
        <div className={styles.hotspotInfoOverlay}>
          {hotspots.map((hotspot) => (
            <div 
              key={hotspot.id}
              className={`${styles.hotspotInfoCard} ${selectedHotspot === hotspot.id ? styles.active : ''}`}
              onClick={() => {
                setSelectedHotspot(hotspot.id);
                if (onSelectHotspot) {
                  onSelectHotspot(hotspot.id);
                }
              }}
            >
              <div className={styles.hotspotIcon}>🏪</div>
              <div className={styles.hotspotInfo}>
                <h4>{hotspot.name}</h4>
                <p>{hotspot.location}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}