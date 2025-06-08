export type Scene = 1 | 2 | 3 | 4 | 5;

export interface GameState {
  scene: Scene;
  selectedOrange: number | null;
  result: GameResult | null;
}

export interface GameResult {
  type: 'win' | 'lose';
  prize: string;
  message: string;
}

export const PRIZES = [
  { id: 1, name: '음료수한잔', message: '시원한 음료수 한 잔 당첨!', type: 'win' as const },
  { id: 2, name: '꽝', message: '아쉽지만 꽝! 내일 또 도전해보세요~', type: 'lose' as const },
  { id: 3, name: '커피한잔', message: '따뜻한 커피 한 잔 당첨!', type: 'win' as const },
  { id: 4, name: '귤2개 선물', message: '신선한 귤 2개 선물 당첨!', type: 'win' as const },
  { id: 5, name: '1000원 쿠폰', message: '1,000원 쿠폰 당첨!', type: 'win' as const },
  { id: 6, name: '컵라면하나', message: '맛있는 컵라면 하나 당첨!', type: 'win' as const },
];

export const ORANGE_COLORS = [
  '#FF6B6B', // 빨강
  '#FF8E53', // 주황  
  '#FFD93D', // 노랑
  '#6BCF7F', // 초록
  '#4ECDC4', // 파랑
  '#A8E6CF', // 보라
]; 