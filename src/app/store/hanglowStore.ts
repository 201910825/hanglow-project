import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import { Product, TravelInfo, TrendingContent, Review, BeautyHotspot } from '../types';

// 스토어 상태 타입 정의
interface HanglowState {
  // 유저 정보
  user: {
    isLoggedIn: boolean;
    language: string;
    travelInfo: TravelInfo;
  };
  
  // 추천 제품 리스트
  recommendedProducts: Product[];
  
  // 뷰티 핫플레이스 리스트
  beautyHotspots: BeautyHotspot[];

  // 트렌딩 콘텐츠
  trendingContent: TrendingContent[];
  
  // 커뮤니티 후기
  reviews: Review[];
  
  // 액션들
  setLanguage: (language: string) => void;
  setIsInKorea: (isInKorea: boolean) => void;
  setTravelPhase: (phase: 'before' | 'during' | 'after') => void;
  addVisitedPlace: (place: string) => void;
  saveProduct: (product: Product) => void;
  removeProduct: (productId: string) => void;
  addScannedProduct: (productCode: string) => void;
}

// Zustand 스토어 생성
export const useHanglowStore = create(
  persist<HanglowState>(
    (set) => ({
      user: {
        isLoggedIn: false,
        language: 'ko',
        travelInfo: {
          isInKorea: false,
          travelPhase: 'before',
          visitedPlaces: [],
          savedProducts: [],
          scannedProducts: [],
        },
      },
      
      recommendedProducts: [
        {
          id: 'p1',
          name: '아이오페 레티놀 엑스퍼트',
          brand: '아이오페',
          category: '스킨케어',
          description: '피부 탄력을 개선하는 레티놀 세럼',
          imageUrl: '/images/products/iope-retinol.jpg',
          price: 45000,
        },
        {
          id: 'p2',
          name: '롬앤 쥬시 래스팅 틴트',
          brand: '롬앤',
          category: '립 메이크업',
          description: '오래 지속되는 촉촉한 립 틴트',
          imageUrl: '/images/products/romand-tint.jpg',
          price: 12000,
        },
        {
          id: 'p3',
          name: '라네즈 워터 슬리핑 마스크',
          brand: '라네즈',
          category: '스킨케어',
          description: '수분을 공급하는 슬리핑 마스크',
          imageUrl: '/images/products/laneige-mask.jpg',
          price: 28000,
        },
        {
          id: 'p4',
          name: '이니스프리 그린티 씨드 세럼',
          brand: '이니스프리',
          category: '스킨케어',
          description: '그린티 추출물이 함유된 수분 세럼',
          imageUrl: '/images/products/innisfree-greentea.jpg',
          price: 25000,
        },
        {
          id: 'p5',
          name: '코스알엑스 어드밴스드 스네일 96 뮤신 파워 에센스',
          brand: '코스알엑스',
          category: '스킨케어',
          description: '달팽이 점액 여과물 함유 에센스',
          imageUrl: '/images/products/cosrx-snail.jpg',
          price: 22000,
        },
        {
          id: 'p6',
          name: '미샤 타임 레볼루션 퍼스트 트리트먼트 에센스',
          brand: '미샤',
          category: '스킨케어',
          description: '피부 리뉴얼을 돕는 발효 에센스',
          imageUrl: '/images/products/missha-time.jpg',
          price: 48000,
        },
      ],
      
      beautyHotspots: [
        {
          id: 'h1',
          name: '명동 화장품 거리',
          location: '서울시 중구 명동',
          description: '다양한 K-뷰티 브랜드 매장이 밀집된 쇼핑 명소',
          imageUrl: '/images/hotspots/myeongdong.jpg',
        },
        {
          id: 'h2',
          name: '가로수길 뷰티 샵',
          location: '서울시 강남구 신사동',
          description: '트렌디한 뷰티 브랜드와 편집숍이 있는 거리',
          imageUrl: '/images/hotspots/garosu.jpg',
        },
        {
          id: 'h3',
          name: '올리브영 강남점',
          location: '서울시 강남구 강남대로',
          description: '한국 최대 H&B 스토어 올리브영의 대형 매장',
          imageUrl: '/images/hotspots/oliveyoung.jpg',
        },
        {
          id: 'h4',
          name: '롯데백화점 에비뉴엘 명품관',
          location: '서울시 중구 소공동',
          description: '다양한 럭셔리 브랜드와 고급 K-뷰티 브랜드가 입점한 백화점',
          imageUrl: '/images/hotspots/lotte.jpg',
        },
      ],

      trendingContent: [
        {
          id: 't1',
          title: '올리브영 인기 아이템 TOP 10',
          thumbnail: '/images/content/olive-young-top10.jpg',
          url: '/trends/olive-young-top10',
        },
        {
          id: 't2',
          title: '2023 한국 화장품 트렌드',
          thumbnail: '/images/content/2023-trends.jpg',
          url: '/trends/2023-trends',
        },
        {
          id: 't3',
          title: '한국 여행시 꼭 사야할 스킨케어 제품',
          thumbnail: '/images/content/must-buy.jpg',
          url: '/trends/must-buy-skincare',
        },
      ],
      
      reviews: [
        {
          id: 'r1',
          userName: 'Sarah',
          country: 'USA',
          rating: 5,
          productId: 'p1',
          content: '이 제품 정말 좋아요! 한국에 와서 구매했는데 피부가 훨씬 좋아졌어요.',
          date: '2023-05-15',
        },
        {
          id: 'r2',
          userName: 'Emma',
          country: 'UK',
          rating: 4,
          productId: 'p2',
          content: '발색이 정말 예쁘고 지속력도 좋아요. 다음에 또 구매하고 싶어요.',
          date: '2023-06-22',
        },
        {
          id: 'r3',
          userName: 'Liu',
          country: 'China',
          rating: 5,
          productId: 'p3',
          content: '잠들기 전에 바르면 다음 날 아침에 피부가 촉촉해져요. 좋은 제품입니다!',
          date: '2023-04-10',
        },
      ],
      
      // 액션 정의
      setLanguage: (language) => set((state) => {
        console.log('스토어에서 언어 변경:', language, '이전 언어:', state.user.language);
        return {
          user: {
            ...state.user,
            language,
          },
        };
      }),
      
      setIsInKorea: (isInKorea) => set((state) => ({
        user: {
          ...state.user,
          travelInfo: {
            ...state.user.travelInfo,
            isInKorea,
          },
        },
      })),
      
      setTravelPhase: (phase) => set((state) => ({
        user: {
          ...state.user,
          travelInfo: {
            ...state.user.travelInfo,
            travelPhase: phase,
          },
        },
      })),
      
      addVisitedPlace: (place) => set((state) => ({
        user: {
          ...state.user,
          travelInfo: {
            ...state.user.travelInfo,
            visitedPlaces: [...state.user.travelInfo.visitedPlaces, place],
          },
        },
      })),
      
      saveProduct: (product) => set((state) => ({
        user: {
          ...state.user,
          travelInfo: {
            ...state.user.travelInfo,
            savedProducts: [...state.user.travelInfo.savedProducts, product],
          },
        },
      })),
      
      removeProduct: (productId) => set((state) => ({
        user: {
          ...state.user,
          travelInfo: {
            ...state.user.travelInfo,
            savedProducts: state.user.travelInfo.savedProducts.filter(
              (product) => product.id !== productId
            ),
          },
        },
      })),
      
      addScannedProduct: (productCode) => set((state) => ({
        user: {
          ...state.user,
          travelInfo: {
            ...state.user.travelInfo,
            scannedProducts: [...state.user.travelInfo.scannedProducts, productCode],
          },
        },
      })),
    }),
    {
      name: 'hanglow-storage',
      storage: createJSONStorage(() => {
        if (typeof window !== 'undefined') {
          return localStorage;
        }
        return {
          getItem: () => null,
          setItem: () => {},
          removeItem: () => {}
        };
      }),
    }
  )
); 