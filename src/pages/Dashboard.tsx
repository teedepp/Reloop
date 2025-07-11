// ./pages/Dashboard.tsx

import { useState } from 'react';
import useStore from '../store';
import ProductCard from '../components/ProductCard';
import ReminderAlert from '../components/ReminderAlert';
import { api } from '../services/api';

const Dashboard = () => {
  const { products, reminders, markReminderAsRead, addReminder } = useStore();
  const [selectedProduct, setSelectedProduct] = useState<string | null>(null);
  const [suggestion, setSuggestion] = useState<string>('');
  const [isLoading, setIsLoading] = useState(false);

  const unreadReminders = reminders.filter(r => !r.isRead);

  const handleRemind = (productId: string) => {
    const product = products.find(p => p.id === productId);
    if (!product) return;
    addReminder({
      id: Math.random().toString(36).substring(2, 9),
      productId,
      date: new Date().toISOString(),
      message: `Reminder set for ${product.name}. We'll notify you before it expires.`,
      isRead: false,
    });
    alert('Reminder set successfully!');
  };

  const handleResell = (productId: string) => {
    window.location.href = `/resell?product=${productId}`;
  };

  const handleRecycleInfo = async (productId: string) => {
    setSelectedProduct(productId);
    setIsLoading(true);
    try {
      const suggestionText = await api.getSuggestions(productId);
      setSuggestion(suggestionText);
    } catch {
      setSuggestion('Unable to load suggestions at this time.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleDismissReminder = (id: string) => {
    markReminderAsRead(id);
  };

  return (
    <div className="w-full h-full px-6 py-4">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-3xl font-bold text-gray-900">📦 Your Dashboard</h1>
        <button className="bg-lime-700 text-white px-4 py-2 rounded-lg hover:bg-lime-800 transition">
          + Add Product
        </button>
      </div>

      {/* Reminders */}
      {unreadReminders.length > 0 && (
        <div className="mb-6">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">🔔 Reminders</h2>
          <div className="space-y-4">
            {unreadReminders.map(r => (
              <ReminderAlert key={r.id} reminder={r} onDismiss={handleDismissReminder} />
            ))}
          </div>
        </div>
      )}

      {/* Product Cards */}
      <h2 className="text-xl font-semibold text-gray-800 mb-4">🛍️ Your Products</h2>
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 w-full">
        {products.map(product => (
          <ProductCard
            key={product.id}
            product={product}
            onRemind={handleRemind}
            onResell={handleResell}
            onRecycleInfo={handleRecycleInfo}
          />
        ))}
      </div>

      {/* Suggestion Box */}
      {selectedProduct && (
        <div className="bg-white rounded-xl shadow-lg p-6 mt-10">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">♻️ Reuse & Recycle Suggestions</h2>
          {isLoading ? (
            <p className="text-gray-600">Loading suggestions...</p>
          ) : (
            <div className="bg-gray-50 rounded-lg p-4 text-gray-700">{suggestion}</div>
          )}
        </div>
      )}
    </div>
  );
};

export default Dashboard;