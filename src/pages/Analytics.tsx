import { useEffect, useState } from 'react';
import useStore from '../store';
import AnalyticsCard from '../components/AnalyticsCard';
import EcoPointsDisplay from '../components/EcoPointsDisplay';
import { api } from '../services/api';

const Analytics = () => {
  const { user, analytics } = useStore();
  const [isLoading, setIsLoading] = useState(true);
  
  useEffect(() => {
    const fetchData = async () => {
      try {
        await api.getAnalytics();
        setIsLoading(false);
      } catch (error) {
        console.error('Error fetching analytics:', error);
        setIsLoading(false);
      }
    };
    
    fetchData();
  }, []);

  return (
    <div className="w-full px-6 py-8">
      <h1 className="text-3xl font-bold text-gray-900 mb-8">Your Impact Analytics</h1>
      
      {isLoading ? (
        <div className="flex justify-center items-center h-64">
          <p className="text-gray-600">Loading analytics data...</p>
        </div>
      ) : (
        <>
          {/* Eco Points Card */}
          <div className="mb-8">
            <EcoPointsDisplay user={user} />
          </div>
          
          {/* Analytics Cards */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
            <AnalyticsCard 
              title="Carbon Saved" 
              value={analytics.carbonSaved} 
              unit="kg CO₂" 
              icon="🌿"
              comparison={analytics.comparisonToLocalUsers.carbonSaved}
              isPositive={analytics.carbonSaved > analytics.comparisonToLocalUsers.carbonSaved}
            />
            
            <AnalyticsCard 
              title="Packaging Reduced" 
              value={analytics.packagingReduced} 
              unit="items" 
              icon="📦"
              comparison={analytics.comparisonToLocalUsers.packagingReduced}
              isPositive={analytics.packagingReduced > analytics.comparisonToLocalUsers.packagingReduced}
            />
            
            <AnalyticsCard 
              title="Items Resold" 
              value={analytics.itemsResold} 
              unit="items" 
              icon="💰"
              comparison={analytics.comparisonToLocalUsers.itemsResold}
              isPositive={analytics.itemsResold > analytics.comparisonToLocalUsers.itemsResold}
            />
          </div>
          
          {/* Impact Breakdown */}
          <div className="bg-white rounded-xl shadow-md p-6">
            <h2 className="text-xl font-semibold text-gray-800 mb-6">Impact Breakdown</h2>
            
            <div className="mb-6">
              <h3 className="text-lg font-medium text-gray-700 mb-3">Carbon Savings by Category</h3>
              <div className="bg-gray-100 rounded-lg p-4">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium text-gray-600">Household</span>
                  <span className="text-sm text-gray-800">12.3 kg CO₂</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2.5 mb-4">
                  <div className="bg-green-500 h-2.5 rounded-full" style={{ width: '65%' }}></div>
                </div>
                
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium text-gray-600">Food & Beverages</span>
                  <span className="text-sm text-gray-800">8.7 kg CO₂</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2.5 mb-4">
                  <div className="bg-green-500 h-2.5 rounded-full" style={{ width: '45%' }}></div>
                </div>
                
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium text-gray-600">Electronics</span>
                  <span className="text-sm text-gray-800">4.5 kg CO₂</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2.5 mb-4">
                  <div className="bg-green-500 h-2.5 rounded-full" style={{ width: '25%' }}></div>
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default Analytics;