export interface StatsType {
  totalAds: number;
  activeAds: number;
  totalSales: number;
  totalPurchases: number;
  rating: number;
}

export interface UserType {
  displayName: string;
  email: string | null;
  phoneNumber: string | null;
  createdAt: string;
  updatedAt: string;
  lastLoginAt: string;
  isActive: boolean;
  stats: StatsType | null;
}
