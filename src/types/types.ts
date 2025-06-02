export interface UserData {
  birthDate: Date;
  birthLocation: string | null;
}

export interface HistoricalEvent {
  id: string;
  title: string;
  description: string;
  date: Date;
  category: string;
  location?: string;
  impact?: string;
  imageUrl?: string;
  isAIGenerated?: boolean;
}
