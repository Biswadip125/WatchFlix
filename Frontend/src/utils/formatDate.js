export const formatDate = (dateString) => {
  const date = new Date(dateString);
  const month = String(date.getMonth() + 1).padStart(2, 0);
  const day = String(date.getDay() + 1).padStart(2, 0);
  const year = date.getFullYear();

  return `${month}/${day}/${year}`;
};
