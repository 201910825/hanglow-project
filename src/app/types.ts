// 공통 타입 정의

// K-뷰티 제품 타입 정의
export interface Product {
  id: string;
  name: string;
  brand: string;
  category: string;
  description: string;
  imageUrl: string;
  price: number;
}
export interface CustomRecommend {
  [key: string]: {
    own: string;
    gift: string;
  };
}

// 국가별 핫 아이템 타입 정의
export interface CountryHotItem {
  id: string;
  country: string;
  countryCode: string;
  flag: string;
  skincare: {
    id: string;
    name: string;
    brand: string;
    imageUrl: string;
    price: number;
    popularityRank: number;
    description: string;
  }[];
  makeup: {
    id: string;
    name: string;
    brand: string;
    imageUrl: string;
    price: number;
    popularityRank: number;
    description: string;
  }[];
  fragrance: {
    id: string;
    name: string;
    brand: string;
    imageUrl: string;
    price: number;
    popularityRank: number;
    description: string;
  }[];
  stores: {
    id: string;
    name: string;
    brand: string;
    imageUrl: string;
    price: number;
    popularityRank: number;
    description: string;
  }[];
}

// 카테고리별 핫 아이템 타입 정의
export interface CategoryHotItem {
  id: string;
  category: string;
  icon: string;
  items: {
    id: string;
    name: string;
    brand: string;
    imageUrl: string;
    price: number;
    popularityRank: number;
    description: string;
    type?: string; // 매장의 경우 매장 타입
  }[];
}

// 사용자 여행 정보 타입 정의
export interface TravelInfo {
  isInKorea: boolean;
  travelPhase: 'before' | 'during' | 'after';
  visitedPlaces: string[];
  savedProducts: Product[];
  scannedProducts: string[];
}

// 트렌딩 콘텐츠 타입 정의
export interface TrendingContent {
  id: string;
  title: string;
  thumbnail: string;
  url: string;
}

// 리뷰 타입 정의
export interface Review {
  id: string;
  userName: string;
  country: string;
  rating: number;
  productId: string;
  content: string;
  date: string;
}

// 뷰티 핫스팟 타입 정의
export interface BeautyHotspot {
  id: string;
  name: string;
  location: string;
  description: string;
  imageUrl: string;
}