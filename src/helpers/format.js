export function formatSpots(spot) {
  if (spot === -1) return "no spots remaining";
  else if (spot === 0) return "1 spot remaining";
  else return `${spot} spots remaining`;
}
