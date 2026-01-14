export const fetchDigimons = async (count = 12) => {
  const response = await fetch("https://digimon-api.vercel.app/api/digimon");

  if (!response.ok) {
    throw new Error(`Server error: ${response.status}`);
  }

  const digimonData = await response.json();
  return digimonData.slice(0, count);
};

export const shuffleArray = (array) => {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
};
