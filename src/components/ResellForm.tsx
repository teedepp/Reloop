import { useState } from 'react';
import type { Product } from '../types';
import { formatDate } from '../utils/dateUtils';

interface ResellFormProps {
  product?: Product;
  onSubmit: (data: {
    productId: string;
    condition: string;
    listedPrice: number;
    expiry: string;
    imageUrl: string;
    interestedBuyers: string[];
  }) => void;
  onClose: () => void;
}

const ResellForm = ({ product, onSubmit, onClose }: ResellFormProps) => {
  const [condition, setCondition] = useState('Like New');
  const [price, setPrice] = useState(product ? '10' : '');
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!product) return;
    
    onSubmit({
      productId: product.id,
      condition,
      listedPrice: parseFloat(price),
      expiry: product.bestBefore,
      imageUrl: product.imageUrl,
      interestedBuyers: []
    });
    
    onClose();
  };

  if (!product) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-xl p-6 max-w-md w-full">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold text-gray-800">List Item for Resale</h2>
          <button 
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700"
          >
            ✕
          </button>
        </div>
        
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">Product</label>
            <div className="flex items-center">
              <img 
                src={product.imageUrl} 
                alt={product.name} 
                className="h-12 w-12 object-cover rounded mr-3" 
              />
              <div>
                <p className="font-medium">{product.name}</p>
                <p className="text-sm text-gray-500">Expires: {formatDate(product.bestBefore)}</p>
              </div>
            </div>
          </div>
          
          <div className="mb-4">
            <label htmlFor="condition" className="block text-sm font-medium text-gray-700 mb-1">
              Condition
            </label>
            <select
              id="condition"
              value={condition}
              onChange={(e) => setCondition(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
            >
              <option value="Like New">Like New</option>
              <option value="Very Good">Very Good</option>
              <option value="Good">Good</option>
              <option value="Acceptable">Acceptable</option>
            </select>
          </div>
          
          <div className="mb-6">
            <label htmlFor="price" className="block text-sm font-medium text-gray-700 mb-1">
              Suggested Price ($)
            </label>
            <input
              id="price"
              type="number"
              min="0"
              step="0.01"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              required
            />
          </div>
          
          <div className="flex justify-end space-x-3">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700"
            >
              List for Resale
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ResellForm;