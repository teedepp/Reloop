// Simple carbon calculator utility

// Average CO2 saved by reusing different types of products (in kg)
const CO2_SAVINGS = {
  'Beverages': 0.5,
  'Household': 1.2,
  'Produce': 0.3,
  'Dairy': 0.8,
  'Electronics': 15.0,
  'Clothing': 8.0,
  'default': 1.0
};

// Calculate CO2 saved by reusing a product
export const calculateCO2Saved = (category: string): number => {
  return CO2_SAVINGS[category as keyof typeof CO2_SAVINGS] || CO2_SAVINGS.default;
};

// Calculate total CO2 saved from multiple products
export const calculateTotalCO2Saved = (categories: string[]): number => {
  return categories.reduce((total, category) => {
    return total + calculateCO2Saved(category);
  }, 0);
};

// Format CO2 amount with units
export const formatCO2 = (amount: number): string => {
  return `${amount.toFixed(1)} kg CO₂`;
};