import type { User } from '../types';

interface EcoPointsDisplayProps {
  user: User;
}

const EcoPointsDisplay = ({ user }: EcoPointsDisplayProps) => {
  return (
    <div className="bg-gradient-to-r from-lime-500 to-lime-300 rounded-xl shadow-md p-6 text-white">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-xl font-semibold text-lime-700" style={{ fontFamily: 'Basique, sans-serif', fontWeight: 700 }}>Your Eco Impact</h3>
        <div className="bg-white bg-opacity-20 rounded-full px-3 py-1">
          <span className="text-sm font-medium text-lime-600" style={{ fontFamily: 'Basique, sans-serif', fontWeight: 400 }}>{user.ecoPoints} Points</span>
        </div>
      </div>
      
      <div className="grid grid-cols-2 gap-4">
        <div>
          <p className="text-sm text-white text-opacity-80">Carbon Saved</p>
          <p className="text-2xl font-bold text-lime-800" style={{ fontFamily: 'Basique, sans-serif', fontWeight: 700 }}>{user.impact.carbonSaved.toFixed(1)} kg</p>
        </div>
        <div>
          <p className="text-sm text-white text-opacity-80">Packaging Reduced</p>
          <p className="text-2xl font-bold text-lime-800" style={{ fontFamily: 'Basique, sans-serif', fontWeight: 700 }}>{user.impact.packagingReduced} items</p>
        </div>
        <div>
          <p className="text-sm text-white text-opacity-80">Items Resold</p>
          <p className="text-2xl font-bold text-lime-800" style={{ fontFamily: 'Basique, sans-serif', fontWeight: 700 }}>{user.impact.itemsResold}</p>
        </div>
        <div>
          <p className="text-sm text-white text-opacity-80">Items Reused</p>
          <p className="text-2xl font-bold text-lime-800" style={{ fontFamily: 'Basique, sans-serif', fontWeight: 700 }}>{user.impact.itemsReused}</p>
        </div>
      </div>
    </div>
  );
};

export default EcoPointsDisplay;