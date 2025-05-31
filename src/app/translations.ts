// 다국어 지원을 위한 번역 데이터
interface TranslationItems {
  [key: string]: string;
}

interface TranslationLanguages {
  [key: string]: TranslationItems;
}

const translations: TranslationLanguages = {
  ko: {
    // 네비게이션
    nav_home: '홈',
    nav_products: 'K-뷰티 제품',
    nav_hotspots: '뷰티 핫플레이스',
    nav_scan: 'QR 스캔',
    nav_mypage: '마이페이지',
    
    // 홈 페이지
    hero_title: '한국 뷰티의 모든 것, HANGLOW',
    hero_subtitle: '여행 중에도, 여행 후에도 계속되는 K-뷰티 여정',
    cta_button: '지금 시작하기',
    
    // 여행 단계
    travel_before: '여행 전',
    travel_during: '여행 중',
    travel_after: '여행 후',
    
    // 섹션 제목
    section_popular: '인기 K-뷰티 제품',
    section_hotspots: '뷰티 핫플레이스',
    section_trending: '트렌딩 콘텐츠',
    section_features: 'HANGLOW 특별 기능',
    more_button: '더 보기',
    
    // 특별 기능
    feature_before: '여행 전',
    feature_before_desc: 'SNS 기반 인기 코스 추천, K뷰티 쇼핑 리스트 자동 생성',
    feature_during: '여행 중',
    feature_during_desc: '위치 기반 뷰티 핫플 탐색, 할인 쿠폰 제공, 실시간 통역',
    feature_after: '여행 후',
    feature_after_desc: '구매 제품 추적, 후기 기록, 해당 브랜드 뉴스 알림, 커머스 연동',
    
    // 제품 페이지
    category: '카테고리',
    brand: '브랜드',
    sort: '정렬',
    skincare: '스킨케어',
    makeup: '메이크업',
    haircare: '헤어케어',
    popular: '인기순',
    price_low: '가격 낮은순',
    price_high: '가격 높은순',
    save_button: '저장하기',
    
    // 핫스팟 페이지
    direction_button: '길 찾기',
    
    // 마이페이지
    guest: '게스트',
    login_message: '로그인하여 더 많은 기능을 이용해보세요',
    login_button: '로그인',
    saved_products: '저장한 제품',
    visited_places: '방문한 장소',
    empty_saved: '아직 저장한 제품이 없습니다.',
    empty_visited: '아직 방문한 장소가 없습니다.',
    delete_button: '삭제',
    
    // QR 스캔
    scan_title: 'QR 코드 스캔',
    scan_guide: '제품 QR 코드를 스캔하여 제품 정보를 확인하세요.',
    scan_button: '스캔 시작',
    scanning: '스캔 중입니다...',
    product_description: '제품 설명',
    ingredients: '성분',
    how_to_use: '사용법',
    save_product: '제품 저장하기',
    buy_online: '온라인 구매',
    scan_again: '다시 스캔하기',
    
    // 푸터
    about: '서비스 소개',
    terms: '이용약관',
    privacy: '개인정보처리방침',
    contact: '문의하기',
    copyright: '© 2023 HANGLOW. All rights reserved.',
  },
  
  en: {
    // Navigation
    nav_home: 'Home',
    nav_products: 'K-Beauty Products',
    nav_hotspots: 'Beauty Hotspots',
    nav_scan: 'QR Scan',
    nav_mypage: 'My Page',
    
    // Home Page
    hero_title: 'HANGLOW, All About Korean Beauty',
    hero_subtitle: 'Continue your K-Beauty journey during and after your trip',
    cta_button: 'Get Started',
    
    // Travel Phase
    travel_before: 'Before Trip',
    travel_during: 'During Trip',
    travel_after: 'After Trip',
    
    // Section Titles
    section_popular: 'Popular K-Beauty Products',
    section_hotspots: 'Beauty Hotspots',
    section_trending: 'Trending Content',
    section_features: 'HANGLOW Special Features',
    more_button: 'View More',
    
    // Special Features
    feature_before: 'Before Trip',
    feature_before_desc: 'SNS-based popular courses, automatic K-beauty shopping list',
    feature_during: 'During Trip',
    feature_during_desc: 'Location-based beauty spots, discount coupons, real-time translation',
    feature_after: 'After Trip',
    feature_after_desc: 'Product tracking, reviews, brand news alerts, commerce integration',
    
    // Products Page
    category: 'Category',
    brand: 'Brand',
    sort: 'Sort',
    skincare: 'Skincare',
    makeup: 'Makeup',
    haircare: 'Haircare',
    popular: 'Popularity',
    price_low: 'Price: Low to High',
    price_high: 'Price: High to Low',
    save_button: 'Save',
    
    // Hotspots Page
    direction_button: 'Get Directions',
    
    // My Page
    guest: 'Guest',
    login_message: 'Login to access more features',
    login_button: 'Login',
    saved_products: 'Saved Products',
    visited_places: 'Visited Places',
    empty_saved: 'No saved products yet.',
    empty_visited: 'No visited places yet.',
    delete_button: 'Delete',
    
    // QR Scan
    scan_title: 'QR Code Scan',
    scan_guide: 'Scan the product QR code to view product information.',
    scan_button: 'Start Scanning',
    scanning: 'Scanning...',
    product_description: 'Product Description',
    ingredients: 'Ingredients',
    how_to_use: 'How to Use',
    save_product: 'Save Product',
    buy_online: 'Buy Online',
    scan_again: 'Scan Again',
    
    // Footer
    about: 'About Service',
    terms: 'Terms of Service',
    privacy: 'Privacy Policy',
    contact: 'Contact Us',
    copyright: '© 2023 HANGLOW. All rights reserved.',
  },
  
  zh: {
    // 导航
    nav_home: '首页',
    nav_products: '韩国美妆产品',
    nav_hotspots: '美妆热门地点',
    nav_scan: '二维码扫描',
    nav_mypage: '我的页面',
    
    // 首页
    hero_title: 'HANGLOW，韩国美妆一站式体验',
    hero_subtitle: '旅行期间和旅行后继续您的韩国美妆之旅',
    cta_button: '立即开始',
    
    // 旅行阶段
    travel_before: '旅行前',
    travel_during: '旅行中',
    travel_after: '旅行后',
    
    // 板块标题
    section_popular: '热门韩国美妆产品',
    section_hotspots: '美妆热门地点',
    section_trending: '流行内容',
    section_features: 'HANGLOW特色功能',
    more_button: '查看更多',
    
    // 特色功能
    feature_before: '旅行前',
    feature_before_desc: '基于社交媒体的热门路线推荐，韩国美妆购物清单自动生成',
    feature_during: '旅行中',
    feature_during_desc: '基于位置的美妆热点探索，优惠券提供，实时翻译',
    feature_after: '旅行后',
    feature_after_desc: '产品跟踪，评论记录，品牌新闻提醒，电商集成',
    
    // 产品页面
    category: '类别',
    brand: '品牌',
    sort: '排序',
    skincare: '护肤',
    makeup: '彩妆',
    haircare: '护发',
    popular: '按热度',
    price_low: '价格从低到高',
    price_high: '价格从高到低',
    save_button: '保存',
    
    // 热点页面
    direction_button: '获取路线',
    
    // 我的页面
    guest: '访客',
    login_message: '登录以访问更多功能',
    login_button: '登录',
    saved_products: '已保存产品',
    visited_places: '已访问地点',
    empty_saved: '暂无已保存产品。',
    empty_visited: '暂无已访问地点。',
    delete_button: '删除',
    
    // 二维码扫描
    scan_title: '二维码扫描',
    scan_guide: '扫描产品二维码查看产品信息。',
    scan_button: '开始扫描',
    scanning: '扫描中...',
    product_description: '产品描述',
    ingredients: '成分',
    how_to_use: '使用方法',
    save_product: '保存产品',
    buy_online: '在线购买',
    scan_again: '再次扫描',
    
    // 页脚
    about: '关于服务',
    terms: '服务条款',
    privacy: '隐私政策',
    contact: '联系我们',
    copyright: '© 2023 HANGLOW. 保留所有权利。',
  },
  
  ja: {
    // ナビゲーション
    nav_home: 'ホーム',
    nav_products: 'K-ビューティー製品',
    nav_hotspots: 'ビューティースポット',
    nav_scan: 'QRスキャン',
    nav_mypage: 'マイページ',
    
    // ホームページ
    hero_title: 'HANGLOW、韓国美容のすべて',
    hero_subtitle: '旅行中も旅行後も続くK-ビューティーの旅',
    cta_button: '今すぐ始める',
    
    // 旅行フェーズ
    travel_before: '旅行前',
    travel_during: '旅行中',
    travel_after: '旅行後',
    
    // セクションタイトル
    section_popular: '人気のK-ビューティー製品',
    section_hotspots: 'ビューティースポット',
    section_trending: 'トレンドコンテンツ',
    section_features: 'HANGLOWの特別機能',
    more_button: 'もっと見る',
    
    // 特別機能
    feature_before: '旅行前',
    feature_before_desc: 'SNSベースの人気コース推薦、K-ビューティーショッピングリスト自動生成',
    feature_during: '旅行中',
    feature_during_desc: '位置ベースのビューティースポット探索、割引クーポン提供、リアルタイム翻訳',
    feature_after: '旅行後',
    feature_after_desc: '購入製品追跡、レビュー記録、ブランドニュース通知、コマース連携',
    
    // 製品ページ
    category: 'カテゴリー',
    brand: 'ブランド',
    sort: '並び替え',
    skincare: 'スキンケア',
    makeup: 'メイクアップ',
    haircare: 'ヘアケア',
    popular: '人気順',
    price_low: '価格の低い順',
    price_high: '価格の高い順',
    save_button: '保存',
    
    // ホットスポットページ
    direction_button: '道順を確認',
    
    // マイページ
    guest: 'ゲスト',
    login_message: 'ログインして更に多くの機能を利用する',
    login_button: 'ログイン',
    saved_products: '保存した製品',
    visited_places: '訪問した場所',
    empty_saved: 'まだ保存した製品はありません。',
    empty_visited: 'まだ訪問した場所はありません。',
    delete_button: '削除',
    
    // QRスキャン
    scan_title: 'QRコードスキャン',
    scan_guide: '製品のQRコードをスキャンして製品情報を確認してください。',
    scan_button: 'スキャン開始',
    scanning: 'スキャン中...',
    product_description: '製品説明',
    ingredients: '成分',
    how_to_use: '使用方法',
    save_product: '製品を保存',
    buy_online: 'オンライン購入',
    scan_again: '再スキャン',
    
    // フッター
    about: 'サービス紹介',
    terms: '利用規約',
    privacy: 'プライバシーポリシー',
    contact: 'お問い合わせ',
    copyright: '© 2023 HANGLOW. All rights reserved.',
  }
};

// 번역 함수
export function getTranslation(key: string, language: string): string {
  // 언어가 존재하지 않으면 한국어로 기본 설정
  if (!translations[language]) {
    language = 'ko';
  }
  
  // 번역 키가 존재하지 않으면 키 자체를 반환
  if (!translations[language][key]) {
    return key;
  }
  
  return translations[language][key];
}

export default translations; 