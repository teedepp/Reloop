import { useState } from 'react';
import type { Product } from '../types';
import { formatDate, getDaysRemaining, getExpiryProgress } from '../utils/dateUtils';

interface ProductCardProps {
  product: Product;
  onRemind: (productId: string) => void;
  onResell: (productId: string) => void;
  onRecycleInfo: (productId: string) => void;
}

const ProductCard = ({ product, onRemind, onResell, onRecycleInfo }: ProductCardProps) => {
  const [isExpanded, setIsExpanded] = useState(false);
  
  const daysRemaining = getDaysRemaining(product.bestBefore);
  const progress = getExpiryProgress(product.purchaseDate, product.bestBefore);
  
  const getProgressColor = () => {
    if (progress < 70) return 'bg-green-500';
    if (progress < 90) return 'bg-yellow-500';
    return 'bg-red-500';
  };

  return (
    // Only highlight: change border, shadows, and hover transition
    <div className="rounded-xl bg-white shadow-md border border-gray-200 hover:ring-2 hover:ring-lime-200 transition">
      <div className="flex flex-col md:flex">
        <div className="md:flex-shrink-0">
          <img 
            className="h-48 w-full md:w-48 object-cover rounded-t-xl md:rounded-l-xl md:rounded-tr-none" 
            src={product.imageUrl} 
            alt={product.name} 
          />
        </div>
        <div className="p-4 md:p-6 w-full flex flex-col justify-between">
          <div className="flex justify-between items-start min-w-0">
            <div className="truncate">
              <p className="text-sm text-gray-500">{product.category}</p>
              <h3 className="text-xl font-semibold text-gray-800 mb-2">{product.name}</h3>
            </div>
            <span className={`px-2 py-1 rounded-full text-xs font-medium ${daysRemaining <= 3 ? 'bg-red-100 text-red-800' : 'bg-gray-100 text-gray-800'}`}>
              {daysRemaining === 0 ? 'Expired' : `${daysRemaining} days left`}
            </span>
          </div>
          
          <div className="mt-2 mb-4">
            <div className="flex justify-between text-sm text-gray-600 mb-1">
              <span>Purchased: {formatDate(product.purchaseDate)}</span>
              <span>Best Before: {formatDate(product.bestBefore)}</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2.5">
              <div 
                className={`h-2.5 rounded-full ${getProgressColor()}`} 
                style={{ width: `${progress}%` }}
              ></div>
            </div>
          </div>
          
          <div className="flex space-x-2 mt-4">
            <button 
              onClick={() => onRemind(product.id)}
              className="px-3 py-1.5 bg-lime-50 text-lime-700 rounded-lg text-sm font-medium hover:bg-lime-100 transition-colors"
            >
              Remind Me
            </button>
            <button 
              onClick={() => onResell(product.id)}
              className="px-3 py-1.5 bg-lime-100 text-lime-800 rounded-lg text-sm font-medium hover:bg-lime-200 transition-colors"
            >
              Resell
            </button>
            <button 
              onClick={() => onRecycleInfo(product.id)}
              className="px-3 py-1.5 bg-gray-50 text-gray-600 rounded-lg text-sm font-medium hover:bg-gray-100 transition-colors"
            >
              Recycle Info
            </button>
          </div>
          
          {isExpanded && (
            <div className="mt-4 pt-4 border-t border-gray-100">
              <h4 className="text-sm font-medium text-gray-700 mb-2">Suggested Reuse:</h4>
              <p className="text-sm text-gray-600">{product.suggestedReuse}</p>
            </div>
          )}
          
          <button 
            onClick={() => setIsExpanded(!isExpanded)}
            className="mt-4 text-sm px-4 py-2 bg-lime-700 text-white rounded-lg hover:bg-white hover:text-lime-700 border border-lime-700 focus:outline-none transition-colors"
          >
            {isExpanded ? 'Show Less' : 'Show More'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;