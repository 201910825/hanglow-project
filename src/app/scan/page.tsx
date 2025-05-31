"use client";

import React, { useState } from 'react';
import styles from './scan.module.css';
import { useHanglowStore } from '../store/hanglowStore';
import { getTranslation } from '../translations';
import { Product } from '../types';

type ScannedProduct = Product & {
  ingredients: string[];
  howToUse: string;
};

export default function ScanPage() {
  const [scanning, setScanning] = useState(false);
  const [scanned, setScanned] = useState(false);
  const [productInfo, setProductInfo] = useState<ScannedProduct | null>(null);
  const { user, addScannedProduct, saveProduct, recommendedProducts } = useHanglowStore();
  
  // 번역 함수 단축어
  const t = (key: string) => getTranslation(key, user.language);
  
  // QR 스캔 시뮬레이션
  const handleScan = () => {
    setScanning(true);
    
    // 2초 후 스캔 완료 시뮬레이션
    setTimeout(() => {
      setScanning(false);
      setScanned(true);
      
      // 스토어에서 실제 제품 정보 가져오기
      const baseProduct = recommendedProducts.find(p => p.id === 'p3');
      if (baseProduct) {
        const scannedProduct = {
          ...baseProduct,
          ingredients: [
            '정제수', '부틸렌글라이콜', '시클로펜타실록산', '글리세린',
            '트레할로스', '나이아신아마이드', '소듐하이알루로네이트'
          ],
          howToUse: '세안 후 스킨케어 마지막 단계에서 사용하세요. 적당량을 얼굴 전체에 바르고 잠들기 전에 사용하세요. 다음 아침에 미온수로 씻어내세요.'
        };
        
        setProductInfo(scannedProduct);
        addScannedProduct(scannedProduct.id);
      }
    }, 2000);
  };
  
  const handleReset = () => {
    setScanned(false);
    setProductInfo(null);
  };
  
  const handleSaveProduct = () => {
    if (productInfo) {
      const productToSave: Product = {
        id: productInfo.id,
        name: productInfo.name,
        brand: productInfo.brand,
        category: productInfo.category,
        description: productInfo.description,
        imageUrl: productInfo.imageUrl,
        price: productInfo.price
      };
      
      saveProduct(productToSave);
      alert(`${productInfo.name} 제품이 저장되었습니다!`);
    }
  };
  
  const handleBuyOnline = () => {
    alert('온라인 구매 페이지로 이동합니다.');
  };
  
  return (
    <div className={styles.scanPage}>
      <h1>{t('scan_title')}</h1>
      
      {!scanning && !scanned && (
        <div className={styles.scanContainer}>
          <div className={styles.cameraPlaceholder}>
            <div className={styles.scanCorners}>
              <div className={styles.corner}></div>
              <div className={styles.corner}></div>
              <div className={styles.corner}></div>
              <div className={styles.corner}></div>
            </div>
          </div>
          <p>{t('scan_guide')}</p>
          <button className={styles.scanButton} onClick={handleScan}>{t('scan_button')}</button>
        </div>
      )}
      
      {scanning && (
        <div className={styles.scanningContainer}>
          <div className={styles.cameraPlaceholder}>
            <div className={styles.scanLine}></div>
            <div className={styles.scanCorners}>
              <div className={styles.corner}></div>
              <div className={styles.corner}></div>
              <div className={styles.corner}></div>
              <div className={styles.corner}></div>
            </div>
          </div>
          <p>{t('scanning')}</p>
        </div>
      )}
      
      {scanned && productInfo && (
        <div className={styles.productInfoContainer}>
          <div className={styles.productImage}>
            <div className={styles.imagePlaceholder}></div>
          </div>
          
          <h2>{productInfo.name}</h2>
          <p className={styles.brand}>{productInfo.brand}</p>
          <p className={styles.price}>{productInfo.price.toLocaleString()}원</p>
          
          <div className={styles.infoSection}>
            <h3>{t('product_description')}</h3>
            <p>{productInfo.description}</p>
          </div>
          
          <div className={styles.infoSection}>
            <h3>{t('ingredients')}</h3>
            <ul className={styles.ingredientsList}>
              {productInfo.ingredients.map((ingredient: string, index: number) => (
                <li key={index}>{ingredient}</li>
              ))}
            </ul>
          </div>
          
          <div className={styles.infoSection}>
            <h3>{t('how_to_use')}</h3>
            <p>{productInfo.howToUse}</p>
          </div>
          
          <div className={styles.actionButtons}>
            <button className={styles.actionButton} onClick={handleSaveProduct}>{t('save_product')}</button>
            <button className={styles.actionButton} onClick={handleBuyOnline}>{t('buy_online')}</button>
            <button className={styles.resetButton} onClick={handleReset}>{t('scan_again')}</button>
          </div>
        </div>
      )}
    </div>
  );
} 