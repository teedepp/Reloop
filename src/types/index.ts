export interface Product {
  id: string;
  name: string;
  purchaseDate: string;
  bestBefore: string;
  imageUrl: string;
  category: string;
  suggestedReuse: string;
}

export interface ResellItem {
  id: string;
  productId: string;
  condition: string;
  listedPrice: number;
  expiry: string;
  imageUrl: string;
  interestedBuyers: string[];
}

export interface User {
  id: string;
  name: string;
  email: string;
  ecoPoints: number;
  impact: {
    carbonSaved: number;
    packagingReduced: number;
    itemsResold: number;
    itemsReused: number;
  };
}

export interface Reminder {
  id: string;
  productId: string;
  date: string;
  message: string;
  isRead: boolean;
}

export interface AnalyticsData {
  carbonSaved: number;
  packagingReduced: number;
  itemsResold: number;
  itemsReused: number;
  comparisonToLocalUsers: {
    carbonSaved: number;
    packagingReduced: number;
    itemsResold: number;
  };
}