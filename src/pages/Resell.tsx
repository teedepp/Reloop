import { useState, useEffect } from 'react';
import useStore from '../store';
import { formatDate } from '../utils/dateUtils';
import ResellForm from '../components/ResellForm';
import { api } from '../services/api';

const Resell = () => {
  const { products, resellItems, updateUserPoints } = useStore(); // Removed 'user' since it's not used
  const [showForm, setShowForm] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<string | null>(null);
  
  // Check if we have a product ID in the URL
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const productId = params.get('product');
    if (productId) {
      setSelectedProduct(productId);
      setShowForm(true);
    }
  }, []);
  
  const handlePostItem = async (data: {
    productId: string;
    condition: string;
    listedPrice: number;
    expiry: string;
    imageUrl: string;
  }) => {
    try {
      await api.postResellItem(data);
      // Award eco points for listing an item
      updateUserPoints(10);
      alert('Item listed successfully! You earned 10 eco points.');
    } catch (error) {
      console.error('Error posting resell item:', error);
      alert('Failed to list item. Please try again.');
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Resell Marketplace</h1>
        <button 
          onClick={() => setShowForm(true)}
          className="px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors"
        >
          Post New Item
        </button>
      </div>
      
      {/* Your Listings Section */}
      <div className="mb-12">
        <h2 className="text-xl font-semibold text-gray-800 mb-4">Your Listings</h2>
        
        {resellItems.length === 0 ? (
          <div className="bg-gray-50 rounded-xl p-8 text-center">
            <p className="text-gray-600 mb-4">You don't have any items listed for resale yet.</p>
            <button 
              onClick={() => setShowForm(true)}
              className="px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors"
            >
              List Your First Item
            </button>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {resellItems.map(item => {
              const product = products.find(p => p.id === item.productId);
              return (
                <div key={item.id} className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300">
                  <img 
                    src={item.imageUrl} 
                    alt={product?.name || 'Product'} 
                    className="w-full h-48 object-cover" 
                  />
                  <div className="p-4">
                    <div className="flex justify-between items-start mb-2">
                      <h3 className="text-lg font-semibold text-gray-800">{product?.name || 'Product'}</h3>
                      <span className="bg-primary-100 text-primary-800 text-xs font-medium px-2 py-1 rounded-full">
                        ${item.listedPrice.toFixed(2)}
                      </span>
                    </div>
                    <div className="flex justify-between text-sm text-gray-600 mb-3">
                      <span>Condition: {item.condition}</span>
                      <span>Expires: {formatDate(item.expiry)}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-500">
                        {item.interestedBuyers.length} interested buyer(s)
                      </span>
                      <button className="text-primary-600 text-sm hover:underline">
                        Edit Listing
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
      
      {/* Nearby Items Section */}
      <div>
        <h2 className="text-xl font-semibold text-gray-800 mb-4">Nearby Items</h2>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Mock nearby items */}
          {[1, 2, 3].map(i => (
            <div key={i} className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300">
              <img 
                src={`https://placehold.co/300x200?text=Local+Item+${i}`} 
                alt={`Local Item ${i}`} 
                className="w-full h-48 object-cover" 
              />
              <div className="p-4">
                <div className="flex justify-between items-start mb-2">
                  <h3 className="text-lg font-semibold text-gray-800">Local Item {i}</h3>
                  <span className="bg-primary-100 text-primary-800 text-xs font-medium px-2 py-1 rounded-full">
                    ${(Math.random() * 20 + 5).toFixed(2)}
                  </span>
                </div>
                <div className="flex justify-between text-sm text-gray-600 mb-3">
                  <span>Condition: Good</span>
                  <span>Distance: {(Math.random() * 5 + 0.5).toFixed(1)} miles</span>
                </div>
                <button className="w-full py-2 bg-secondary-600 text-white rounded-lg hover:bg-secondary-700 transition-colors">
                  Contact Seller
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
      
      {/* Resell Form Modal */}
      {showForm && (
        <ResellForm 
          product={selectedProduct ? products.find(p => p.id === selectedProduct) : undefined}
          onSubmit={handlePostItem}
          onClose={() => {
            setShowForm(false);
            setSelectedProduct(null);
            // Clear the URL parameter
            window.history.replaceState({}, document.title, window.location.pathname);
          }}
        />
      )}
    </div>
  );
};

export default Resell;