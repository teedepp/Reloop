interface AnalyticsCardProps {
  title: string;
  value: number;
  unit: string;
  icon: string;
  comparison?: number;
  isPositive?: boolean;
}

const AnalyticsCard = ({ title, value, unit, icon, comparison, isPositive = true }: AnalyticsCardProps) => {
  return (
    <div className="bg-white rounded-xl shadow-md p-6 hover:shadow-lg transition-shadow duration-300">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-medium text-gray-800">{title}</h3>
        <span className="text-3xl">{icon}</span>
      </div>
      
      <div className="mb-2">
        <span className="text-4xl font-bold text-gray-900">{value}</span>
        <span className="ml-1 text-gray-500">{unit}</span>
      </div>

      
      {comparison !== undefined && (
        <div className={`flex items-center text-sm ${isPositive ? 'text-green-600' : 'text-red-600'}`}>
          <span className="mr-1">
            {isPositive ? '↑' : '↓'}
          </span>
          <span>
            {isPositive ? '+' : ''}{((value / comparison - 1) * 100).toFixed(1)}% vs. local average
          </span>
        </div>
      )}
    </div>
  );
};

export default AnalyticsCard;