function WinMessage({ onPlayAgain }) {
  return (
    <div className="text-center mb-4">
      <p className="text-2xl font-bold text-green-600 mb-2">
        Congratulations! 🎉
      </p>
      <button
        onClick={onPlayAgain}
        className="px-4 py-2 rounded-lg bg-blue-500 text-white font-semibold hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors"
      >
        Play Again
      </button>
    </div>
  );
}

export default WinMessage;