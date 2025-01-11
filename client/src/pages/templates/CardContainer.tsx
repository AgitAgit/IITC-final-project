import React from "react";
import DummyCard from "./DummyCard";

interface CardData {
  title: string;
  type: string;
  imageUrl: string;
}

interface CardContainerProps {
  cards: CardData[]; // Array of cards
}

const CardContainer: React.FC<CardContainerProps> = ({ cards }) => {
  return (
    <div>
      {/* Display message if no cards match the filter */}
      {cards.length === 0 ? (
        <p className="text-center text-gray-500 mt-10">
          No templates match the selected filters.
        </p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {cards.map((card) => (
            <DummyCard
              key={card.title}
              title={card.title}
              type={card.type}
              imageUrl={card.imageUrl}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default CardContainer;
