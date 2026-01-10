
export interface GameMeta {
  id: string;
  name: string;
  genre: string;
  image: string;
}

export interface ChatMessage {
  role: 'user' | 'model';
  text: string;
  timestamp: number;
  image?: string;
}

export interface MetaData {
  gameName: string;
  tierList: { rank: string; character: string; reason: string }[];
  winRates: { name: string; value: number }[];
}

export enum View {
  DASHBOARD = 'DASHBOARD',
  CHATS = 'CHATS',
  STRATEGY = 'STRATEGY',
  VISION = 'VISION'
}
