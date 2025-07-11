import { create } from 'zustand';
import type { Product, ResellItem, User, Reminder, AnalyticsData } from '../types';

// Mock data
const mockProducts: Product[] = [
  {
    id: '1',
    name: 'Organic Almond Milk',
    purchaseDate: '2023-05-15',
    bestBefore: '2023-06-15',
    imageUrl: 'https://placehold.co/200x200?text=Almond+Milk',
    category: 'Beverages',
    suggestedReuse: 'Use the empty container for storing homemade sauces or as a small planter.'
  },
  {
    id: '2',
    name: 'Eco-Friendly Dish Soap',
    purchaseDate: '2023-05-10',
    bestBefore: '2024-05-10',
    imageUrl: 'https://placehold.co/200x200?text=Dish+Soap',
    category: 'Household',
    suggestedReuse: 'Refill at your local zero-waste store or repurpose the bottle for homemade cleaners.'
  },
  {
    id: '3',
    name: 'Organic Spinach',
    purchaseDate: '2023-05-20',
    bestBefore: '2023-05-27',
    imageUrl: 'https://placehold.co/200x200?text=Spinach',
    category: 'Produce',
    suggestedReuse: 'Compost if wilted or use in smoothies if slightly past prime.'
  },
  {
    id: '4',
    name: 'Reusable Water Bottle',
    purchaseDate: '2023-04-15',
    bestBefore: '2028-04-15',
    imageUrl: 'https://placehold.co/200x200?text=Water+Bottle',
    category: 'Household',
    suggestedReuse: 'Can be recycled or donated if no longer needed.'
  },
  {
    id: '5',
    name: 'Organic Yogurt',
    purchaseDate: '2023-05-18',
    bestBefore: '2023-06-01',
    imageUrl: 'https://placehold.co/200x200?text=Yogurt',
    category: 'Dairy',
    suggestedReuse: 'Use the container for organizing small items or as a seed starter.'
  },
];

const mockResellItems: ResellItem[] = [
  {
    id: '1',
    productId: '4',
    condition: 'Like New',
    listedPrice: 15,
    expiry: '2028-04-15',
    imageUrl: 'https://placehold.co/200x200?text=Water+Bottle',
    interestedBuyers: ['user123', 'user456']
  }
];

const mockUser: User = {
  id: '1',
  name: 'Eco Enthusiast',
  email: 'eco@example.com',
  ecoPoints: 120,
  impact: {
    carbonSaved: 25.5,
    packagingReduced: 12,
    itemsResold: 3,
    itemsReused: 8
  }
};

const mockReminders: Reminder[] = [
  {
    id: '1',
    productId: '3',
    date: '2023-05-26',
    message: 'Your Organic Spinach expires tomorrow!',
    isRead: false
  },
  {
    id: '2',
    productId: '1',
    date: '2023-06-13',
    message: 'Your Organic Almond Milk expires in 2 days!',
    isRead: true
  }
];

const mockAnalytics: AnalyticsData = {
  carbonSaved: 25.5,
  packagingReduced: 12,
  itemsResold: 3,
  itemsReused: 8,
  comparisonToLocalUsers: {
    carbonSaved: 18.2,
    packagingReduced: 8,
    itemsResold: 2
  }
};

interface StoreState {
  products: Product[];
  resellItems: ResellItem[];
  user: User;
  reminders: Reminder[];
  analytics: AnalyticsData;
  addProduct: (product: Product) => void;
  addResellItem: (item: ResellItem) => void;
  markReminderAsRead: (id: string) => void;
  addReminder: (reminder: Reminder) => void;
  updateUserPoints: (points: number) => void;
}

const useStore = create<StoreState>((set) => ({
  products: mockProducts,
  resellItems: mockResellItems,
  user: mockUser,
  reminders: mockReminders,
  analytics: mockAnalytics,
  addProduct: (product) => set((state) => ({ 
    products: [...state.products, product] 
  })),
  addResellItem: (item) => set((state) => ({ 
    resellItems: [...state.resellItems, item] 
  })),
  markReminderAsRead: (id) => set((state) => ({
    reminders: state.reminders.map(reminder => 
      reminder.id === id ? { ...reminder, isRead: true } : reminder
    )
  })),
  addReminder: (reminder) => set((state) => ({
    reminders: [...state.reminders, reminder]
  })),
  updateUserPoints: (points) => set((state) => ({
    user: { ...state.user, ecoPoints: state.user.ecoPoints + points }
  })),
}));

export default useStore;