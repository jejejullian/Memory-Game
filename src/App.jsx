import { useState, useEffect } from "react";

function App() {
  const [digimons, setDigimons] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [score, setScore] = useState(0);
  const [bestScore, setBestScore] = useState(0);
  const [clickedCards, setClickedCards] = useState([]);

  useEffect(() => {
    const fetchDigimon = async () => {
      try {
        const response = await fetch("https://digimon-api.vercel.app/api/digimon");
        if (!response.ok) {
          throw new Error(`server error: ${response.status}`);
        }

        const digimonData = await response.json();
        const initialCards = digimonData.slice(0, 12);

        setDigimons(initialCards);
      } catch (err) {
        console.error("failed to fetch digimon:", err.message);
      } finally {
        setIsLoading(false);
      }
    };
    fetchDigimon();
  }, []);

  const shuffleArray = (array) => {
    const shuffled = [...array];
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled;
  };

  const handleCardClick = (name) => {
    if (clickedCards.includes(name)) {
      setBestScore((prev) => Math.max(prev, score));
      setScore(0);
      setClickedCards([]);
    } else {
      const newScore = score + 1;
      setClickedCards((prev) => [...prev, name]);
      setScore(newScore);
      setBestScore((prev) => Math.max(prev, newScore));
    }

    setDigimons((prev) => shuffleArray(prev));
  };

  const resetGame = () => {
    setScore(0);
    setClickedCards([]);
    setDigimons((prev) => shuffleArray(prev));
  };

  if (isLoading) {
    return <div className="text-center mt-20 text-2xl">Memuat Digimon... ⏳</div>;
  }

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <h1 className="text-3xl font-bold text-center mb-4">Digimon Memory Game</h1>

      <div className="text-center mb-8">
        <p className="text-xl">Score: {score}</p>
        <p className="text-lg text-gray-600">Best Score: {bestScore}</p>
      </div>

      {score === digimons.length && (
        <div className="text-center mb-4">
          <p className="text-2xl font-bold text-green-600 mb-2">Congratulations!</p>
          <button onClick={resetGame} className="px-4 py-2 rounded-lg bg-blue-500 text-white font-semibold hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors">
            Play Again
          </button>
        </div>
      )}

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {digimons.map((digimon) => (
          <div key={digimon.name} onClick={() => handleCardClick(digimon.name)} className="bg-white p-4 rounded-xl cursor-pointer shadow-md transition-all duration-300 hover:shadow-lg hover:-translate-y-1">
            <img src={digimon.img} alt={digimon.name} className="w-full h-auto" />
            <p className="text-center font-bold mt-2">{digimon.name}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
