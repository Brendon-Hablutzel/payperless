export interface Receipt {
  id: string;
  store: string;
  date: string;
  total: number;
  items: ReceiptItem[];
  imageUrl?: string;
  sustainabilityScore: number;
  sustainableChoices: number;
  sustainabilityPoints: number;
  sustainabilityTips: string[];
}

export interface ReceiptItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
  category?: string;
  sustainabilityScore?: number;
  sustainabilityTip?: string;
  isEcoFriendly?: boolean;
}

export interface SustainabilityMetrics {
  totalPoints: number;
  weeklyPoints: number;
  monthlyPoints: number;
  sustainableChoices: number;
  level: string;
  nextLevelPoints: number;
} 