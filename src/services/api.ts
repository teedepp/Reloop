// 

import type { Product, ResellItem, AnalyticsData } from '../types';
import useStore from '../store';

const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

export const api = {
  getProducts: async (): Promise<Product[]> => {
    await delay(800);
    return useStore.getState().products;
  },

  getProductById: async (id: string): Promise<Product | undefined> => {
    await delay(500);
    return useStore.getState().products.find(product => product.id === id);
  },

  getResellItems: async (): Promise<ResellItem[]> => {
    await delay(800);
    return useStore.getState().resellItems;
  },

  postResellItem: async (item: Omit<ResellItem, 'id' | 'interestedBuyers'>): Promise<ResellItem> => {
    await delay(1000);
    const newItem: ResellItem = {
      ...item,
      id: Math.random().toString(36).substring(2, 9),
      interestedBuyers: []
    };
    useStore.getState().addResellItem(newItem);
    return newItem;
  },

  getAnalytics: async (): Promise<AnalyticsData> => {
    await delay(1200);
    return useStore.getState().analytics;
  },

  getSuggestions: async (productId: string): Promise<string> => {
    await delay(1500);
    const product = useStore.getState().products.find(p => p.id === productId);
    return product?.suggestedReuse || 'No suggestions available for this product.';
  },

  calculateCarbonImpact: async (productId: string): Promise<number> => {
    await delay(700);
    return parseFloat((Math.random() * 5).toFixed(2));
  }
};
