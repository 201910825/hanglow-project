"use client";

import { useHanglowStore } from '../store/hanglowStore';
import { getTranslation } from '../translations';
import styles from './TravelPhaseSelector.module.css';

export default function TravelPhaseSelector() {
  const { user, setTravelPhase } = useHanglowStore();
  
  // 번역 함수 단축어
  const t = (key: string) => getTranslation(key, user.language);
  
  // 여행 단계 변경 처리
  const handlePhaseChange = (phase: 'before' | 'during' | 'after') => {
    setTravelPhase(phase);
    // 실제 기능 시연을 위한 알림 추가
    alert(`${t(`travel_${phase}`)} 모드로 전환되었습니다!`);
  };
  
  return (
    <div className={styles.travelPhaseSelector}>
      <button 
        className={`${styles.phaseButton} ${user.travelInfo.travelPhase === 'before' ? styles.active : ''}`}
        onClick={() => handlePhaseChange('before')}
      >
        {t('travel_before')}
      </button>
      <button 
        className={`${styles.phaseButton} ${user.travelInfo.travelPhase === 'during' ? styles.active : ''}`}
        onClick={() => handlePhaseChange('during')}
      >
        {t('travel_during')}
      </button>
      <button 
        className={`${styles.phaseButton} ${user.travelInfo.travelPhase === 'after' ? styles.active : ''}`}
        onClick={() => handlePhaseChange('after')}
      >
        {t('travel_after')}
      </button>
    </div>
  );
} 