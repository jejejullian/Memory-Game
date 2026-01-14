function Card({ digimon, onClick }) {
  return (
    <div 
      onClick={onClick}
      className="bg-white p-4 rounded-xl cursor-pointer shadow-md transition-all duration-300 hover:shadow-lg hover:-translate-y-1"
    >
      <img 
        src={digimon.img} 
        alt={digimon.name} 
        className="w-full h-auto"
      />
      <p className="text-center font-bold mt-2">{digimon.name}</p>
    </div>
  );
}

export default Card;