import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import { Product, TravelInfo, TrendingContent, Review, BeautyHotspot, CustomRecommend, CountryHotItem, CategoryHotItem } from '../types';

// 스토어 상태 타입 정의
interface HanglowState {
  // 유저 정보
  user: {
    isLoggedIn: boolean;
    language: string;
    travelInfo: TravelInfo;
  };
  customRecommend: CustomRecommend[];
  // 추천 제품 리스트
  recommendedProducts: Product[];
  
  // 뷰티 핫플레이스 리스트
  beautyHotspots: BeautyHotspot[];

  // 국가별 핫 아이템 리스트
  countryHotItems: CountryHotItem[];

  // 카테고리별 핫 아이템 리스트
  categoryHotItems: CategoryHotItem[];

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
          imageUrl: 'https://sokoglam.com/cdn/shop/files/Soko-Glam-PDP-IOPE-Retinol-Expert-0.3-01_860x.png?v=1740782606',
          price: 45000,
        },
        {
          id: 'p2',
          name: '롬앤 쥬시 래스팅 틴트',
          brand: '롬앤',
          category: '립 메이크업',
          description: '오래 지속되는 촉촉한 립 틴트',
          imageUrl: 'https://romand.us/cdn/shop/products/juicy.jpg?v=1634253225',
          price: 12000,
        },
        {
          id: 'p3',
          name: '라네즈 워터 슬리핑 마스크',
          brand: '라네즈',
          category: '스킨케어',
          description: '수분을 공급하는 슬리핑 마스크',
          imageUrl: 'https://sg.laneige.com/cdn/shop/products/20201207_final_Water-Sleeping-Mask-EX_thumbnail05.png?v=1735187019',
          price: 28000,
        },
        {
          id: 'p4',
          name: '이니스프리 그린티 씨드 세럼',
          brand: '이니스프리',
          category: '스킨케어',
          description: '그린티 추출물이 함유된 수분 세럼',
          imageUrl: 'https://us.innisfree.com/cdn/shop/files/IF_GT-HS_PDP_01_Packshot_2024_1080x1080_00f05620-abcb-48b1-8f18-1d0248dd1bfe_1080x.jpg?v=1718286252',
          price: 25000,
        },
        {
          id: 'p5',
          name: '코스알엑스 어드밴스드 스네일 96 뮤신 파워 에센스',
          brand: '코스알엑스',
          category: '스킨케어',
          description: '달팽이 점액 여과물 함유 에센스',
          imageUrl: 'https://m.media-amazon.com/images/I/61p-wtpDraL._SL1500_.jpg',
          price: 22000,
        },
        {
          id: 'p6',
          name: '미샤 타임 레볼루션 퍼스트 트리트먼트 에센스',
          brand: '미샤',
          category: '스킨케어',
          description: '피부 리뉴얼을 돕는 발효 에센스',
          imageUrl: 'https://misshaus.com/cdn/shop/products/TimeRevolutionTheFirstEssenceEnriched........jpg?v=1747410540',
          price: 48000,
        },
      ],
      customRecommend: [{
        'ko': {own: '본인용', gift: '선물용'},
        'en': {own: 'For myself', gift: 'For a gift'},
        'ja': {own: '自分用', gift: 'プレゼント用'},
        'zh': {own: '自用', gift: '送礼'},
        'es': {own: 'Para mí', gift: 'Para regalo'},
        'fr': {own: 'Pour moi', gift: 'Pour un cadeau'},
        'de': {own: 'Für mich', gift: 'Für ein Geschenk'},
        'it': {own: 'Per me', gift: 'Per un regalo'},
        'pt': {own: 'Para mim', gift: 'Para um presente'},
        'nl': {own: 'Voor mezelf', gift: 'Voor een cadeau'},
        'sv': {own: 'För mig', gift: 'För en gåva'},
        'no': {own: 'For meg', gift: 'For en gave'},
        'da': {own: 'For mig', gift: 'For en gave'},
      }],
      beautyHotspots: [
        {
          id: 'h1',
          name: '명동 화장품 거리',
          location: '서울시 중구 명동',
          description: '다양한 K-뷰티 브랜드 매장이 밀집된 쇼핑 명소',
          imageUrl: 'https://pds.joongang.co.kr/news/component/htmlphoto_mmdata/202301/19/2ccb6c44-83fb-49ed-968c-7f82594ced98.jpg',
        },
        {
          id: 'h2',
          name: '성수동 뷰티 로드',
          location: '서울특별시 성동구 성수동',
          description: '트렌디한 뷰티 브랜드와 편집숍이 있는 거리',
          imageUrl: 'http://tnnews.co.kr/wp-content/uploads/2024/12/%EC%98%AC%EB%A6%AC%EB%B8%8C%EC%98%81N%EC%84%B1%EC%88%980.jpg',
        },
        {
          id: 'h3',
          name: '올리브영N 성수',
          location: '서울시 성동구 성수동',
          description: '한국 최대 H&B 스토어 올리브영의 대형 매장',
          imageUrl: 'https://img.newspim.com/news/2022/11/28/2211281456130530.jpg',
        },
        {
          id: 'h4',
          name: '롯데백화점 에비뉴엘 명품관',
          location: '서울시 중구 소공동',
          description: '다양한 럭셔리 브랜드와 고급 K-뷰티 브랜드가 입점한 백화점',
          imageUrl: 'https://www.busan.com/nas/data/content/image/2017/06/29/20170629000077_0.jpg',
        }
      ],

      countryHotItems: [
        {
          id: 'c1',
          country: '미국',
          countryCode: 'US',
          flag: '🇺🇸',
          skincare: [
            {
              id: 'us_sk1',
              name: '코스알엑스 스네일 뮤신 에센스',
              brand: '코스알엑스',
              imageUrl: 'https://m.media-amazon.com/images/I/61p-wtpDraL._SL1500_.jpg',
              price: 22000,
              popularityRank: 1,
              description: '미국 아마존 베스트셀러 K-뷰티'
            },
            {
              id: 'us_sk2',
              name: '라네즈 워터 슬리핑 마스크',
              brand: '라네즈',
              imageUrl: 'https://sg.laneige.com/cdn/shop/products/20201207_final_Water-Sleeping-Mask-EX_thumbnail05.png?v=1735187019',
              price: 28000,
              popularityRank: 2,
              description: '세포라 인기 아이템'
            },
            {
              id: 'us_sk3',
              name: '이니스프리 그린티 씨드 세럼',
              brand: '이니스프리',
              imageUrl: 'https://us.innisfree.com/cdn/shop/files/IF_GT-HS_PDP_01_Packshot_2024_1080x1080_00f05620-abcb-48b1-8f18-1d0248dd1bfe_1080x.jpg?v=1718286252',
              price: 25000,
              popularityRank: 3,
              description: '자연 성분 선호하는 미국인들에게 인기'
            }
          ],
          makeup: [
            {
              id: 'us_mk1',
              name: '롬앤 쥬시 래스팅 틴트',
              brand: '롬앤',
              imageUrl: 'https://romand.us/cdn/shop/products/juicy.jpg?v=1634253225',
              price: 12000,
              popularityRank: 1,
              description: '미국에서 가장 인기 있는 K-뷰티 립'
            },
            {
              id: 'us_mk2',
              name: '헤라 블랙 쿠션',
              brand: '헤라',
              imageUrl: 'https://www.hera.com/kr/ko/static/product/black_cushion_intense_cover/pdp_hero_web_02.png',
              price: 52000,
              popularityRank: 2,
              description: '완벽한 커버력으로 미국 뷰티 유튜버들 사랑'
            },
            {
              id: 'us_mk3',
              name: '에뛰드 플레이컬러 아이즈',
              brand: '에뛰드',
              imageUrl: 'https://etudehouse.com/kr/ko/static/product/play_color_eyes_in_the_cafe/pdp_hero_web_02.png',
              price: 8000,
              popularityRank: 3,
              description: '가성비 좋은 아이섀도우 팔레트'
            }
          ],
          fragrance: [
            {
              id: 'us_pf1',
              name: '조말론 피어 & 프리지아',
              brand: '조말론',
              imageUrl: 'https://www.jomalone.co.kr/media/export/cms/products/670x552/JM_Fragrance_670x552_pear_freesia.jpg',
              price: 78000,
              popularityRank: 1,
              description: '미국에서 가장 사랑받는 향수'
            },
            {
              id: 'us_pf2',
              name: '탬버린즈 퍼퓸',
              brand: '탬버린즈',
              imageUrl: 'https://tamburins.com/web/product/big/202110/fd8d4e8cd3e0b0c1b5a5d0a8e7b7b3c9.jpg',
              price: 65000,
              popularityRank: 2,
              description: '모던하고 세련된 K-향수'
            }
          ],
          stores: [
            {
              id: 'us_shop1',
              name: '올리브영 명동점',
              brand: '올리브영',
              imageUrl: 'https://pds.joongang.co.kr/news/component/htmlphoto_mmdata/202301/19/2ccb6c44-83fb-49ed-968c-7f82594ced98.jpg',
              price: 0,
              popularityRank: 1,
              description: '미국 관광객들이 가장 많이 방문하는 K-뷰티 매장'
            }
          ]
        },
        {
          id: 'c2',
          country: '중국',
          countryCode: 'CN',
          flag: '🇨🇳',
          skincare: [
            {
              id: 'cn_sk1',
              name: '설화수 자음생크림',
              brand: '설화수',
              imageUrl: 'https://www.sulwhasoo.com/kr/ko/static/product/concentrated_ginseng_cream/pdp_hero_web_02.png',
              price: 180000,
              popularityRank: 1,
              description: '중국 부유층 선호 프리미엄 브랜드'
            },
            {
              id: 'cn_sk2',
              name: '아이오페 레티놀 엑스퍼트',
              brand: '아이오페',
              imageUrl: 'https://sokoglam.com/cdn/shop/files/Soko-Glam-PDP-IOPE-Retinol-Expert-0.3-01_860x.png?v=1740782606',
              price: 45000,
              popularityRank: 2,
              description: '화이트닝 효과로 인기'
            },
            {
              id: 'cn_sk3',
              name: '라네즈 워터 슬리핑 마스크',
              brand: '라네즈',
              imageUrl: 'https://sg.laneige.com/cdn/shop/products/20201207_final_Water-Sleeping-Mask-EX_thumbnail05.png?v=1735187019',
              price: 28000,
              popularityRank: 3,
              description: '중국에서 인기 있는 수분 마스크'
            }
          ],
          makeup: [
            {
              id: 'cn_mk1',
              name: '헤라 블랙 쿠션',
              brand: '헤라',
              imageUrl: 'https://www.hera.com/kr/ko/static/product/black_cushion_intense_cover/pdp_hero_web_02.png',
              price: 52000,
              popularityRank: 1,
              description: '완벽한 커버력으로 중국여성들 사랑'
            },
            {
              id: 'cn_mk2',
              name: '롬앤 쥬시 래스팅 틴트',
              brand: '롬앤',
              imageUrl: 'https://romand.us/cdn/shop/products/juicy.jpg?v=1634253225',
              price: 12000,
              popularityRank: 2,
              description: '중국에서 인기 있는 K-뷰티 립'
            }
          ],
          fragrance: [
            {
              id: 'cn_pf1',
              name: '딥디크 philosykos',
              brand: '딥디크',
              imageUrl: 'https://www.diptyqueparis.com/dw/image/v2/BBRT_PRD/on/demandware.static/-/Sites-diptyque-master/default/dw3c7f8a9e/images/philosykos/diptyque-philosykos-edp-75ml-front.png',
              price: 125000,
              popularityRank: 1,
              description: '중국 럭셔리 시장에서 인기'
            },
            {
              id: 'cn_pf2',
              name: '조말론 피어 & 프리지아',
              brand: '조말론',
              imageUrl: 'https://www.jomalone.co.kr/media/export/cms/products/670x552/JM_Fragrance_670x552_pear_freesia.jpg',
              price: 78000,
              popularityRank: 2,
              description: '중국에서 사랑받는 향수'
            }
          ],
          stores: [
            {
              id: 'cn_shop1',
              name: '롯데면세점 명동점',
              brand: '롯데면세점',
              imageUrl: 'https://www.lottedfs.com/kr/handler/Product-LoadImage?productId=8806185310413&cacheKey=20220801',
              price: 0,
              popularityRank: 1,
              description: '중국 관광객들이 가장 선호하는 면세점'
            },
            {
              id: 'cn_shop2',
              name: '신세계면세점 명동점',
              brand: '신세계면세점',
              imageUrl: 'https://pds.joongang.co.kr/news/component/htmlphoto_mmdata/202301/19/2ccb6c44-83fb-49ed-968c-7f82594ced98.jpg',
              price: 0,
              popularityRank: 2,
              description: '고급 브랜드가 많은 중국인 선호 매장'
            }
          ]
        },
        {
          id: 'c3',
          country: '일본',
          countryCode: 'JP',
          flag: '🇯🇵',
          skincare: [
            {
              id: 'jp_sk1',
              name: '미샤 타임 레볼루션',
              brand: '미샤',
              imageUrl: 'https://misshaus.com/cdn/shop/products/TimeRevolutionTheFirstEssenceEnriched........jpg?v=1747410540',
              price: 48000,
              popularityRank: 1,
              description: '일본에서 인기 있는 발효 에센스'
            },
            {
              id: 'jp_sk2',
              name: '이니스프리 그린티 씨드 세럼',
              brand: '이니스프리',
              imageUrl: 'https://us.innisfree.com/cdn/shop/files/IF_GT-HS_PDP_01_Packshot_2024_1080x1080_00f05620-abcb-48b1-8f18-1d0248dd1bfe_1080x.jpg?v=1718286252',
              price: 25000,
              popularityRank: 2,
              description: '자연 성분으로 일본에서 인기'
            }
          ],
          makeup: [
            {
              id: 'jp_mk1',
              name: '미샤 BB크림',
              brand: '미샤',
              imageUrl: 'https://misshaus.com/cdn/shop/products/M_Perfect_Cover_BB_Cream_SPF42_PA___50ml_1.jpg?v=1649228440',
              price: 15000,
              popularityRank: 1,
              description: '가성비 최고 베이스 메이크업'
            },
            {
              id: 'jp_mk2',
              name: '에뛰드 플레이컬러 아이즈',
              brand: '에뛰드',
              imageUrl: 'https://etudehouse.com/kr/ko/static/product/play_color_eyes_in_the_cafe/pdp_hero_web_02.png',
              price: 8000,
              popularityRank: 2,
              description: '일본 여대생들이 가장 많이 찾는 아이섀도우'
            },
            {
              id: 'jp_mk3',
              name: '롬앤 쥬시 래스팅 틴트',
              brand: '롬앤',
              imageUrl: 'https://romand.us/cdn/shop/products/juicy.jpg?v=1634253225',
              price: 12000,
              popularityRank: 3,
              description: '일본에서 인기 있는 K-뷰티 립'
            }
          ],
          fragrance: [
            {
              id: 'jp_pf1',
              name: '탬버린즈 퍼퓸',
              brand: '탬버린즈',
              imageUrl: 'https://tamburins.com/web/product/big/202110/fd8d4e8cd3e0b0c1b5a5d0a8e7b7b3c9.jpg',
              price: 65000,
              popularityRank: 1,
              description: '미니멀한 디자인으로 일본에서 인기'
            },
            {
              id: 'jp_pf2',
              name: '조말론 피어 & 프리지아',
              brand: '조말론',
              imageUrl: 'https://www.jomalone.co.kr/media/export/cms/products/670x552/JM_Fragrance_670x552_pear_freesia.jpg',
              price: 78000,
              popularityRank: 2,
              description: '일본에서 사랑받는 향수'
            }
          ],
          stores: [
            {
              id: 'jp_shop1',
              name: '아리따움 홍대점',
              brand: '아리따움',
              imageUrl: 'https://cf.shopee.co.kr/file/sg-11134201-22110-2wkzrxvdppjve5',
              price: 0,
              popularityRank: 1,
              description: '일본 관광객들이 선호하는 K-뷰티 매장'
            },
            {
              id: 'jp_shop2',
              name: '올리브영 홍대점',
              brand: '올리브영',
              imageUrl: 'https://pds.joongang.co.kr/news/component/htmlphoto_mmdata/202301/19/2ccb6c44-83fb-49ed-968c-7f82594ced98.jpg',
              price: 0,
              popularityRank: 2,
              description: '일본 관광객들이 많이 방문하는 매장'
            }
          ]
        },
        {
          id: 'c4',
          country: '동남아시아',
          countryCode: 'TH',
          flag: '🇹🇭',
          skincare: [
            {
              id: 'th_sk1',
              name: '클리오 킬커버 파운데이션',
              brand: '클리오',
              imageUrl: 'https://clio-shop.com/kr/ko/static/product/kill_cover_foundation/pdp_hero_web_02.png',
              price: 28000,
              popularityRank: 1,
              description: '덥고 습한 기후에 완벽한 커버력'
            },
            {
              id: 'th_sk2',
              name: '이니스프리 올레컨트롤 파우더',
              brand: '이니스프리',
              imageUrl: 'https://us.innisfree.com/cdn/shop/files/IF_GT-HS_PDP_01_Packshot_2024_1080x1080_00f05620-abcb-48b1-8f18-1d0248dd1bfe_1080x.jpg?v=1718286252',
              price: 6000,
              popularityRank: 2,
              description: '기름기 제거와 매트한 마무리'
            },
            {
              id: 'th_sk3',
              name: '라네즈 워터뱅크 젤크림',
              brand: '라네즈',
              imageUrl: 'https://sg.laneige.com/cdn/shop/products/20201207_final_Water-Sleeping-Mask-EX_thumbnail05.png?v=1735187019',
              price: 22000,
              popularityRank: 3,
              description: '수분 공급으로 태국에서 인기'
            }
          ],
          makeup: [
            {
              id: 'th_mk1',
              name: '미미박스 워터풀 선크림',
              brand: '미미박스',
              imageUrl: 'https://memebox.com/kr/ko/static/product/waterful_sun_cream/pdp_hero_web_02.png',
              price: 18000,
              popularityRank: 1,
              description: '높은 자외선 차단지수로 인기'
            },
            {
              id: 'th_mk2',
              name: '페리페라 잉크 벨벳',
              brand: '페리페라',
              imageUrl: 'https://peripera.com/kr/ko/static/product/ink_velvet/pdp_hero_web_02.png',
              price: 9000,
              popularityRank: 2,
              description: '지속력 좋은 매트 립틴트'
            }
          ],
          fragrance: [
            {
              id: 'th_pf1',
              name: '탬버린즈 퍼퓸',
              brand: '탬버린즈',
              imageUrl: 'https://tamburins.com/web/product/big/202110/fd8d4e8cd3e0b0c1b5a5d0a8e7b7b3c9.jpg',
              price: 65000,
              popularityRank: 1,
              description: '트로피컬한 향으로 인기'
            },
            {
              id: 'th_pf2',
              name: '조말론 라임 바질 & 만다린',
              brand: '조말론',
              imageUrl: 'https://www.jomalone.co.kr/media/export/cms/products/670x552/JM_Fragrance_670x552_pear_freesia.jpg',
              price: 78000,
              popularityRank: 2,
              description: '상큼한 향으로 태국에서 인기'
            }
          ],
          stores: [
            {
              id: 'th_shop1',
              name: '올리브영 명동점',
              brand: '올리브영',
              imageUrl: 'https://pds.joongang.co.kr/news/component/htmlphoto_mmdata/202301/19/2ccb6c44-83fb-49ed-968c-7f82594ced98.jpg',
              price: 0,
              popularityRank: 1,
              description: '동남아 관광객들이 선호하는 K-뷰티 매장'
            },
            {
              id: 'th_shop2',
              name: '아리따움 명동점',
              brand: '아리따움',
              imageUrl: 'https://cf.shopee.co.kr/file/sg-11134201-22110-2wkzrxvdppjve5',
              price: 0,
              popularityRank: 2,
              description: '다양한 K-뷰티 브랜드를 만날 수 있는 매장'
            }
          ]
        },
        {
          id: 'c5',
          country: '영국',
          countryCode: 'UK',
          flag: '🇬🇧',
          skincare: [
            {
              id: 'uk_sk1',
              name: '설화수 자음생크림',
              brand: '설화수',
              imageUrl: 'https://www.sulwhasoo.com/kr/ko/static/product/concentrated_ginseng_cream/pdp_hero_web_02.png',
              price: 180000,
              popularityRank: 1,
              description: '전통 한방 성분으로 영국에서 인기'
            },
            {
              id: 'uk_sk2',
              name: '라네즈 워터 슬리핑 마스크',
              brand: '라네즈',
              imageUrl: 'https://sg.laneige.com/cdn/shop/products/20201207_final_Water-Sleeping-Mask-EX_thumbnail05.png?v=1735187019',
              price: 28000,
              popularityRank: 2,
              description: '건조한 영국 기후에 완벽한 수분 공급'
            },
            {
              id: 'uk_sk3',
              name: '코스알엑스 스네일 뮤신 에센스',
              brand: '코스알엑스',
              imageUrl: 'https://m.media-amazon.com/images/I/61p-wtpDraL._SL1500_.jpg',
              price: 22000,
              popularityRank: 3,
              description: '영국 온라인 쇼핑몰에서 인기'
            }
          ],
          makeup: [
            {
              id: 'uk_mk1',
              name: '헤라 블랙 쿠션',
              brand: '헤라',
              imageUrl: 'https://www.hera.com/kr/ko/static/product/black_cushion_intense_cover/pdp_hero_web_02.png',
              price: 52000,
              popularityRank: 1,
              description: '영국 기후에 적합한 커버력'
            },
            {
              id: 'uk_mk2',
              name: '클리오 킬블랙 아이라이너',
              brand: '클리오',
              imageUrl: 'https://clio-shop.com/kr/ko/static/product/kill_cover_foundation/pdp_hero_web_02.png',
              price: 12000,
              popularityRank: 2,
              description: '영국에서 사랑받는 워터프루프 아이라이너'
            }
          ],
          fragrance: [
            {
              id: 'uk_pf1',
              name: '조말론 피어 & 프리지아',
              brand: '조말론',
              imageUrl: 'https://www.jomalone.co.kr/media/export/cms/products/670x552/JM_Fragrance_670x552_pear_freesia.jpg',
              price: 78000,
              popularityRank: 1,
              description: '영국 본토에서도 사랑받는 향수'
            },
            {
              id: 'uk_pf2',
              name: '탬버린즈 퍼퓸',
              brand: '탬버린즈',
              imageUrl: 'https://tamburins.com/web/product/big/202110/fd8d4e8cd3e0b0c1b5a5d0a8e7b7b3c9.jpg',
              price: 65000,
              popularityRank: 2,
              description: '미니멀한 K-향수로 영국에서 인기'
            }
          ],
          stores: [
            {
              id: 'uk_shop1',
              name: '올리브영 명동점',
              brand: '올리브영',
              imageUrl: 'https://pds.joongang.co.kr/news/component/htmlphoto_mmdata/202301/19/2ccb6c44-83fb-49ed-968c-7f82594ced98.jpg',
              price: 0,
              popularityRank: 1,
              description: '영국 관광객들이 선호하는 K-뷰티 매장'
            },
            {
              id: 'uk_shop2',
              name: '롯데면세점 명동점',
              brand: '롯데면세점',
              imageUrl: 'https://www.lottedfs.com/kr/handler/Product-LoadImage?productId=8806185310413&cacheKey=20220801',
              price: 0,
              popularityRank: 2,
              description: '고급 브랜드가 많은 영국인 선호 매장'
            }
          ]
        },
        {
          id: 'c6',
          country: '프랑스',
          countryCode: 'FR',
          flag: '🇫🇷',
          skincare: [
            {
              id: 'fr_sk1',
              name: '설화수 윤조에센스',
              brand: '설화수',
              imageUrl: 'https://www.sulwhasoo.com/kr/ko/static/product/concentrated_ginseng_cream/pdp_hero_web_02.png',
              price: 120000,
              popularityRank: 1,
              description: '프랑스 뷰티 전문가들이 인정한 K-뷰티'
            },
            {
              id: 'fr_sk2',
              name: '아이오페 바이오 인텐시브 컨디셔닝 앰플',
              brand: '아이오페',
              imageUrl: 'https://sokoglam.com/cdn/shop/files/Soko-Glam-PDP-IOPE-Retinol-Expert-0.3-01_860x.png?v=1740782606',
              price: 58000,
              popularityRank: 2,
              description: '프랑스 파리지앵들이 선호하는 앰플'
            }
          ],
          makeup: [
            {
              id: 'fr_mk1',
              name: '헤라 루즈 홀릭',
              brand: '헤라',
              imageUrl: 'https://www.hera.com/kr/ko/static/product/black_cushion_intense_cover/pdp_hero_web_02.png',
              price: 35000,
              popularityRank: 1,
              description: '프랑스 여성들이 사랑하는 립스틱'
            },
            {
              id: 'fr_mk2',
              name: '클리오 프로 아이 팔레트',
              brand: '클리오',
              imageUrl: 'https://clio-shop.com/kr/ko/static/product/kill_cover_foundation/pdp_hero_web_02.png',
              price: 28000,
              popularityRank: 2,
              description: '프랑스에서 인기 있는 아이섀도우'
            }
          ],
          fragrance: [
            {
              id: 'fr_pf1',
              name: '딥디크 philosykos',
              brand: '딥디크',
              imageUrl: 'https://www.diptyqueparis.com/dw/image/v2/BBRT_PRD/on/demandware.static/-/Sites-diptyque-master/default/dw3c7f8a9e/images/philosykos/diptyque-philosykos-edp-75ml-front.png',
              price: 125000,
              popularityRank: 1,
              description: '프랑스 본토 브랜드로 현지에서 인기'
            },
            {
              id: 'fr_pf2',
              name: '탬버린즈 퍼퓸',
              brand: '탬버린즈',
              imageUrl: 'https://tamburins.com/web/product/big/202110/fd8d4e8cd3e0b0c1b5a5d0a8e7b7b3c9.jpg',
              price: 65000,
              popularityRank: 2,
              description: '아시안 감성이 매력적인 K-향수'
            }
          ],
          stores: [
            {
              id: 'fr_shop1',
              name: '신세계면세점 명동점',
              brand: '신세계면세점',
              imageUrl: 'https://pds.joongang.co.kr/news/component/htmlphoto_mmdata/202301/19/2ccb6c44-83fb-49ed-968c-7f82594ced98.jpg',
              price: 0,
              popularityRank: 1,
              description: '프랑스 관광객들이 선호하는 고급 매장'
            },
            {
              id: 'fr_shop2',
              name: '올리브영 홍대점',
              brand: '올리브영',
              imageUrl: 'https://pds.joongang.co.kr/news/component/htmlphoto_mmdata/202301/19/2ccb6c44-83fb-49ed-968c-7f82594ced98.jpg',
              price: 0,
              popularityRank: 2,
              description: '젊은 프랑스 여행객들이 많이 방문하는 매장'
            }
          ]
        },
        {
          id: 'c7',
          country: '독일',
          countryCode: 'DE',
          flag: '🇩🇪',
          skincare: [
            {
              id: 'de_sk1',
              name: '코스알엑스 나이아신아마이드',
              brand: '코스알엑스',
              imageUrl: 'https://m.media-amazon.com/images/I/61p-wtpDraL._SL1500_.jpg',
              price: 18000,
              popularityRank: 1,
              description: '독일에서 성분 중심 스킨케어로 인기'
            },
            {
              id: 'de_sk2',
              name: '이니스프리 그린티 씨드 세럼',
              brand: '이니스프리',
              imageUrl: 'https://us.innisfree.com/cdn/shop/files/IF_GT-HS_PDP_01_Packshot_2024_1080x1080_00f05620-abcb-48b1-8f18-1d0248dd1bfe_1080x.jpg?v=1718286252',
              price: 25000,
              popularityRank: 2,
              description: '친환경 성분으로 독일에서 인기'
            }
          ],
          makeup: [
            {
              id: 'de_mk1',
              name: '미샤 BB크림',
              brand: '미샤',
              imageUrl: 'https://misshaus.com/cdn/shop/products/M_Perfect_Cover_BB_Cream_SPF42_PA___50ml_1.jpg?v=1649228440',
              price: 15000,
              popularityRank: 1,
              description: '독일에서 가성비 베이스 메이크업으로 인기'
            },
            {
              id: 'de_mk2',
              name: '롬앤 쥬시 래스팅 틴트',
              brand: '롬앤',
              imageUrl: 'https://romand.us/cdn/shop/products/juicy.jpg?v=1634253225',
              price: 12000,
              popularityRank: 2,
              description: '독일에서 인기 있는 K-뷰티 립'
            }
          ],
          fragrance: [
            {
              id: 'de_pf1',
              name: '조말론 우드 세이지 & 씨 솔트',
              brand: '조말론',
              imageUrl: 'https://www.jomalone.co.kr/media/export/cms/products/670x552/JM_Fragrance_670x552_pear_freesia.jpg',
              price: 78000,
              popularityRank: 1,
              description: '독일에서 사랑받는 유니섹스 향수'
            },
            {
              id: 'de_pf2',
              name: '탬버린즈 퍼퓸',
              brand: '탬버린즈',
              imageUrl: 'https://tamburins.com/web/product/big/202110/fd8d4e8cd3e0b0c1b5a5d0a8e7b7b3c9.jpg',
              price: 65000,
              popularityRank: 2,
              description: '미니멀한 디자인으로 독일에서 인기'
            }
          ],
          stores: [
            {
              id: 'de_shop1',
              name: '올리브영 강남점',
              brand: '올리브영',
              imageUrl: 'https://pds.joongang.co.kr/news/component/htmlphoto_mmdata/202301/19/2ccb6c44-83fb-49ed-968c-7f82594ced98.jpg',
              price: 0,
              popularityRank: 1,
              description: '독일 관광객들이 선호하는 K-뷰티 매장'
            },
            {
              id: 'de_shop2',
              name: '아리따움 명동점',
              brand: '아리따움',
              imageUrl: 'https://cf.shopee.co.kr/file/sg-11134201-22110-2wkzrxvdppjve5',
              price: 0,
              popularityRank: 2,
              description: '독일인들이 많이 방문하는 화장품 매장'
            }
          ]
        },
        {
          id: 'c8',
          country: '베트남',
          countryCode: 'VN',
          flag: '🇻🇳',
          skincare: [
            {
              id: 'vn_sk1',
              name: '라네즈 워터뱅크 젤크림',
              brand: '라네즈',
              imageUrl: 'https://sg.laneige.com/cdn/shop/products/20201207_final_Water-Sleeping-Mask-EX_thumbnail05.png?v=1735187019',
              price: 22000,
              popularityRank: 1,
              description: '베트남 더위에 시원한 젤 크림'
            },
            {
              id: 'vn_sk2',
              name: '이니스프리 알로에 젤',
              brand: '이니스프리',
              imageUrl: 'https://us.innisfree.com/cdn/shop/files/IF_GT-HS_PDP_01_Packshot_2024_1080x1080_00f05620-abcb-48b1-8f18-1d0248dd1bfe_1080x.jpg?v=1718286252',
              price: 8000,
              popularityRank: 2,
              description: '자연 성분으로 베트남에서 인기'
            }
          ],
          makeup: [
            {
              id: 'vn_mk1',
              name: '에뛰드 플레이컬러 아이즈',
              brand: '에뛰드',
              imageUrl: 'https://etudehouse.com/kr/ko/static/product/play_color_eyes_in_the_cafe/pdp_hero_web_02.png',
              price: 8000,
              popularityRank: 1,
              description: '베트남 젊은 여성들이 선호하는 아이섀도우'
            },
            {
              id: 'vn_mk2',
              name: '페리페라 잉크 벨벳',
              brand: '페리페라',
              imageUrl: 'https://peripera.com/kr/ko/static/product/ink_velvet/pdp_hero_web_02.png',
              price: 9000,
              popularityRank: 2,
              description: '베트남에서 인기 있는 립틴트'
            }
          ],
          fragrance: [
            {
              id: 'vn_pf1',
              name: '탬버린즈 퍼퓸',
              brand: '탬버린즈',
              imageUrl: 'https://tamburins.com/web/product/big/202110/fd8d4e8cd3e0b0c1b5a5d0a8e7b7b3c9.jpg',
              price: 65000,
              popularityRank: 1,
              description: '베트남에서 사랑받는 K-향수'
            },
            {
              id: 'vn_pf2',
              name: '조말론 라임 바질 & 만다린',
              brand: '조말론',
              imageUrl: 'https://www.jomalone.co.kr/media/export/cms/products/670x552/JM_Fragrance_670x552_pear_freesia.jpg',
              price: 78000,
              popularityRank: 2,
              description: '상큼한 향으로 베트남에서 인기'
            }
          ],
          stores: [
            {
              id: 'vn_shop1',
              name: '올리브영 홍대점',
              brand: '올리브영',
              imageUrl: 'https://pds.joongang.co.kr/news/component/htmlphoto_mmdata/202301/19/2ccb6c44-83fb-49ed-968c-7f82594ced98.jpg',
              price: 0,
              popularityRank: 1,
              description: '베트남 관광객들이 선호하는 K-뷰티 매장'
            },
            {
              id: 'vn_shop2',
              name: '아리따움 홍대점',
              brand: '아리따움',
              imageUrl: 'https://cf.shopee.co.kr/file/sg-11134201-22110-2wkzrxvdppjve5',
              price: 0,
              popularityRank: 2,
              description: '베트남 젊은 여행객들이 많이 방문하는 매장'
            }
          ]
        }
      ],

      categoryHotItems: [
        {
          id: 'cat1',
          category: '스킨케어',
          icon: '🧴',
          items: [
            {
              id: 'sk1',
              name: '코스알엑스 스네일 뮤신 에센스',
              brand: '코스알엑스',
              imageUrl: 'https://m.media-amazon.com/images/I/61p-wtpDraL._SL1500_.jpg',
              price: 22000,
              popularityRank: 1,
              description: '달팽이 점액 여과물 96% 함유'
            },
            {
              id: 'sk2',
              name: '라네즈 워터 슬리핑 마스크',
              brand: '라네즈',
              imageUrl: 'https://sg.laneige.com/cdn/shop/products/20201207_final_Water-Sleeping-Mask-EX_thumbnail05.png?v=1735187019',
              price: 28000,
              popularityRank: 2,
              description: '수분 충전 슬리핑 마스크'
            },
            {
              id: 'sk3',
              name: '이니스프리 그린티 씨드 세럼',
              brand: '이니스프리',
              imageUrl: 'https://us.innisfree.com/cdn/shop/files/IF_GT-HS_PDP_01_Packshot_2024_1080x1080_00f05620-abcb-48b1-8f18-1d0248dd1bfe_1080x.jpg?v=1718286252',
              price: 25000,
              popularityRank: 3,
              description: '그린티 추출물로 수분 공급'
            },
            {
              id: 'sk4',
              name: '아이오페 레티놀 엑스퍼트',
              brand: '아이오페',
              imageUrl: 'https://sokoglam.com/cdn/shop/files/Soko-Glam-PDP-IOPE-Retinol-Expert-0.3-01_860x.png?v=1740782606',
              price: 45000,
              popularityRank: 4,
              description: '레티놀 0.3% 고농축 세럼'
            }
          ]
        },
        {
          id: 'cat2',
          category: '메이크업',
          icon: '💄',
          items: [
            {
              id: 'mk1',
              name: '롬앤 쥬시 래스팅 틴트',
              brand: '롬앤',
              imageUrl: 'https://romand.us/cdn/shop/products/juicy.jpg?v=1634253225',
              price: 12000,
              popularityRank: 1,
              description: '오래 지속되는 촉촉한 립틴트'
            },
            {
              id: 'mk2',
              name: '헤라 블랙 쿠션',
              brand: '헤라',
              imageUrl: 'https://www.hera.com/kr/ko/static/product/black_cushion_intense_cover/pdp_hero_web_02.png',
              price: 52000,
              popularityRank: 2,
              description: '완벽한 커버력의 쿠션 파운데이션'
            },
            {
              id: 'mk3',
              name: '에뛰드 플레이컬러 아이즈',
              brand: '에뛰드',
              imageUrl: 'https://etudehouse.com/kr/ko/static/product/play_color_eyes_in_the_cafe/pdp_hero_web_02.png',
              price: 8000,
              popularityRank: 3,
              description: '발색 좋은 10색 아이섀도우 팔레트'
            },
            {
              id: 'mk4',
              name: '클리오 킬커버 파운데이션',
              brand: '클리오',
              imageUrl: 'https://clio-shop.com/kr/ko/static/product/kill_cover_foundation/pdp_hero_web_02.png',
              price: 28000,
              popularityRank: 4,
              description: '고커버 리퀴드 파운데이션'
            }
          ]
        },
        {
          id: 'cat3',
          category: '향수',
          icon: '🌸',
          items: [
            {
              id: 'pf1',
              name: '조말론 피어 & 프리지아',
              brand: '조말론',
              imageUrl: 'https://www.jomalone.co.kr/media/export/cms/products/670x552/JM_Fragrance_670x552_pear_freesia.jpg',
              price: 78000,
              popularityRank: 1,
              description: '상큼한 배와 프리지아 향'
            },
            {
              id: 'pf2',
              name: '탬버린즈 퍼퓸',
              brand: '탬버린즈',
              imageUrl: 'https://tamburins.com/web/product/big/202110/fd8d4e8cd3e0b0c1b5a5d0a8e7b7b3c9.jpg',
              price: 65000,
              popularityRank: 2,
              description: '모던하고 세련된 K-향수'
            },
            {
              id: 'pf3',
              name: '르라보 베르가못 22',
              brand: '르라보',
              imageUrl: 'https://lelabofragrances.com/dw/image/v2/BBRT_PRD/on/demandware.static/-/Sites-lelabo-master-catalog/default/dwf8c7e5e4/images/bergamote-22/lelabo-bergamote22-edp-50ml-front.png',
              price: 145000,
              popularityRank: 3,
              description: '시트러스 베르가못 베이스'
            },
            {
              id: 'pf4',
              name: '딥디크 philosykos',
              brand: '딥디크',
              imageUrl: 'https://www.diptyqueparis.com/dw/image/v2/BBRT_PRD/on/demandware.static/-/Sites-diptyque-master/default/dw3c7f8a9e/images/philosykos/diptyque-philosykos-edp-75ml-front.png',
              price: 125000,
              popularityRank: 4,
              description: '무화과 잎과 나무의 그린 향'
            }
          ]
        },
        {
          id: 'cat4',
          category: '뷰티 매장',
          icon: '🏪',
          items: [
            {
              id: 'shop1',
              name: '올리브영 명동점',
              brand: '올리브영',
              imageUrl: 'https://pds.joongang.co.kr/news/component/htmlphoto_mmdata/202301/19/2ccb6c44-83fb-49ed-968c-7f82594ced98.jpg',
              price: 0,
              popularityRank: 1,
              description: '한국 최대 H&B 스토어',
              type: 'H&B 스토어'
            },
            {
              id: 'shop2',
              name: '롯데면세점 명동점',
              brand: '롯데면세점',
              imageUrl: 'https://www.lottedfs.com/kr/handler/Product-LoadImage?productId=8806185310413&cacheKey=20220801',
              price: 0,
              popularityRank: 2,
              description: '면세점 쇼핑의 메카',
              type: '면세점'
            },
            {
              id: 'shop3',
              name: '아리따움 홍대점',
              brand: '아리따움',
              imageUrl: 'https://cf.shopee.co.kr/file/sg-11134201-22110-2wkzrxvdppjve5',
              price: 0,
              popularityRank: 3,
              description: '아모레퍼시픽 브랜드 전문점',
              type: '브랜드 매장'
            },
            {
              id: 'shop4',
              name: '스페이스NK 청담점',
              brand: '스페이스NK',
              imageUrl: 'https://news.mt.co.kr/mtview.php?no=2021111917334953254',
              price: 0,
              popularityRank: 4,
              description: '럭셔리 뷰티 편집샵',
              type: '편집샵'
            }
          ]
        }
      ],

      trendingContent: [
        {
          id: 't1',
          title: '올리브영 인기 아이템 TOP 10',
          thumbnail: 'https://www.elle.co.kr/resources/online/online_image/2024/12/11/e63fa19a-c8b4-4147-b42e-ca7d9c872bfc.jpg',
          url: '/',
        },
        {
          id: 't2',
          title: '2025 한국 화장품 트렌드',
          thumbnail: 'https://openads-real.s3.amazonaws.com/openadsAdmin/images/contsImg/20250304135900102_aj2gJDib4ECmcN9EmINM.png',
          url: '/',
        },
        {
          id: 't3',
          title: '한국 여행시 꼭 사야할 스킨케어 제품',
          thumbnail: 'https://measurechina.oss-cn-hongkong.aliyuncs.com/files/trendier%20blog%20(in%20measurecommerce.ai)/Japan_k-skincare_Thumbnail.jpg',
          url: '/',
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
      name: 'hanglow-storage-v2',
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