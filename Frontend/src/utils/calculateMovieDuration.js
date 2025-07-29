export const calculateMovieDuration = (time) => {
  const hrs = Math.floor(time / 60);
  const minutes = time - hrs * 60;

  return `${hrs}h ${minutes}m`;
};
