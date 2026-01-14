import { useState, useEffect } from "react";

function App() {
  const [digimons, setDigimons] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

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
        console.log(initialCards);
      } catch (err) {
        console.error("failed to fetch digimon:", err.message);
      } finally {
        setIsLoading(false);
      }
    };
    fetchDigimon();
  }, []);

  return (
    <>
      <div className="min-h-screen bg-gray-100 p-8">
        <h1 className="text-3xl font-bold text-center mb-8">Digimon Memory Game</h1>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {digimons.map((digimon) => (
            <div key={digimon.name} className="bg-white p-4 rounded-4xl cursor-pointer shadow-md transition-all duration-300 ease-in-out hover:shadow-lg/40 hover:-translate-y-1">
              <img src={digimon.img} alt={digimon.name} />
              <p className="text-center font-bold mt-2">{digimon.name}</p>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

export default App;
