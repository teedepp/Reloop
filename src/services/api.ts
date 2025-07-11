import axios from 'axios';
import type { Product } from '../types';
import type { ResellItem, AnalyticsData } from '../types';
import useStore from '../store';

// This is a mock API service that simulates API calls
// In a real application, these would connect to a backend server

const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

export const api = {
  // Get all products
  getProducts: async (): Promise<Product[]> => {
    // Simulate API delay
    await delay(800);
    return useStore.getState().products;
  },

  // Get product by ID
  getProductById: async (id: string): Promise<Product | undefined> => {
    await delay(500);
    return useStore.getState().products.find(product => product.id === id);
  },

  // Get resell items
  getResellItems: async (): Promise<ResellItem[]> => {
    await delay(800);
    return useStore.getState().resellItems;
  },

  // Post a new resell item
  postResellItem: async (item: Omit<ResellItem, 'id'>): Promise<ResellItem> => {
    await delay(1000);
    const newItem = {
      ...item,
      id: Math.random().toString(36).substring(2, 9),
      interestedBuyers: []
    };
    useStore.getState().addResellItem(newItem);
    return newItem;
  },

  // Get analytics data
  getAnalytics: async (): Promise<AnalyticsData> => {
    await delay(1200);
    return useStore.getState().analytics;
  },

  // Get reuse suggestions for a product
  getSuggestions: async (productId: string): Promise<string> => {
    await delay(1500);
    const product = useStore.getState().products.find(p => p.id === productId);
    return product?.suggestedReuse || 'No suggestions available for this product.';
  },

  // Calculate carbon impact
  calculateCarbonImpact: async (productId: string): Promise<number> => {
    await delay(700);
    // Mock calculation - in a real app this would use actual data
    return parseFloat((Math.random() * 5).toFixed(2));
  }
};