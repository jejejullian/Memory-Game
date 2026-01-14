import Card from "./Card";

function CardGrid({ digimons, onCardClick }) {
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
      {digimons.map((digimon) => (
        <Card 
          key={digimon.name}
          digimon={digimon}
          onClick={() => onCardClick(digimon.name)}
        />
      ))}
    </div>
  );
}

export default CardGrid;