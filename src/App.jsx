import { useState, useEffect } from "react";
import Header from "./game/Header";
import Scoreboard from "./game/Scoreboard";
import CardGrid from "./game/CardGrid";
import WinMessage from "./game/WinMessage";
import LoadingSpinner from "./game/LoadingSpinner";
import { fetchDigimons, shuffleArray } from "./utils/helpers";


function App() {
  const [digimons, setDigimons] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [score, setScore] = useState(0);
  const [bestScore, setBestScore] = useState(0);
  const [clickedCards, setClickedCards] = useState([]);

  useEffect(() => {
    const loadDigimons = async () => {
      try {
        const data = await fetchDigimons(12);
        setDigimons(data);
      } catch (err) {
        console.error("Failed to load digimons:", err.message);
      } finally {
        setIsLoading(false);
      }
    };
    loadDigimons();
  }, []);

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
    return <LoadingSpinner />;
  }

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <Header />
      <Scoreboard score={score} bestScore={bestScore} />
      
      {score === digimons.length && <WinMessage onPlayAgain={resetGame} />}
      
      <CardGrid digimons={digimons} onCardClick={handleCardClick} />
    </div>
  );
}

export default App;