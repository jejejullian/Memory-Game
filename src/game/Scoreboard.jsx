function Scoreboard({ score, bestScore }) {
  return (
    <div className="text-center mb-8">
      <p className="text-xl font-semibold">Score: {score}</p>
      <p className="text-lg text-gray-600">Best Score: {bestScore}</p>
    </div>
  );
}

export default Scoreboard;