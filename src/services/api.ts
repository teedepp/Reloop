//import axios from 'axios';
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
  postResellItem: async (item: Omit<ResellItem, 'id' | 'interestedBuyers'>): Promise<ResellItem> => {
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
    
    // Mock suggestions based on product category or name
    if (product?.category === 'Electronics') {
      return 'Consider donating to local schools or community centers. You can also sell parts for repairs or repurpose as decorative items.';
    } else if (product?.category === 'Food') {
      return 'If expired, consider composting. If still good, donate to local food banks or share with neighbors.';
    } else {
      return product?.suggestedReuse || 'Consider donating, selling, or repurposing this item to extend its useful life.';
    }
  },

  // Calculate carbon impact
  calculateCarbonImpact: async (productId: string): Promise<number> => {
    await delay(700);
    const product = useStore.getState().products.find(p => p.id === productId);
    
    // Mock calculation based on product category
    if (product?.category === 'Electronics') {
      return parseFloat((Math.random() * 10 + 5).toFixed(2)); // 5-15 kg CO2
    } else if (product?.category === 'Food') {
      return parseFloat((Math.random() * 3 + 1).toFixed(2)); // 1-4 kg CO2
    } else {
      return parseFloat((Math.random() * 5).toFixed(2)); // 0-5 kg CO2
    }
  }
};