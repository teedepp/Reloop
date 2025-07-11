// Format date to display format
export const formatDate = (dateString: string): string => {
  const date = new Date(dateString);
  return new Intl.DateTimeFormat('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  }).format(date);
};

// Calculate days remaining until expiry
export const getDaysRemaining = (expiryDate: string): number => {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const expiry = new Date(expiryDate);
  expiry.setHours(0, 0, 0, 0);
  
  const diffTime = expiry.getTime() - today.getTime();
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  
  return diffDays > 0 ? diffDays : 0;
};

// Calculate expiry progress percentage
export const getExpiryProgress = (purchaseDate: string, expiryDate: string): number => {
  const purchase = new Date(purchaseDate).getTime();
  const expiry = new Date(expiryDate).getTime();
  const today = new Date().getTime();
  
  const totalDuration = expiry - purchase;
  const elapsed = today - purchase;
  
  const progress = (elapsed / totalDuration) * 100;
  
  return Math.min(Math.max(progress, 0), 100);
};