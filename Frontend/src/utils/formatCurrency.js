export const formatCurrency = (amount) => {
  if (!amount || amount === 0) return "N/A";
  return `$${(amount / 1_000_000).toFixed(1)}M`;
};
