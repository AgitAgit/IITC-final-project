import React, { useState, useEffect } from "react";

interface CardProps {
  title: string;
  type: string;
  imageUrl: string;
}

const Card: React.FC<CardProps> = ({ title, type, imageUrl }) => {
  const [isHeartFilled, setIsHeartFilled] = useState(false);

  // Check if the card is already in favorites
  useEffect(() => {
    const favorites = JSON.parse(localStorage.getItem("favorites") || "[]");
    const isFavorite = favorites.some(
      (favorite: CardProps) => favorite.title === title
    );
    setIsHeartFilled(isFavorite);
  }, [title]);

  // Toggle heart state and update local storage
  const toggleHeart = () => {
    const favorites = JSON.parse(localStorage.getItem("favorites") || "[]");

    if (isHeartFilled) {
      // Remove from favorites
      const updatedFavorites = favorites.filter(
        (favorite: CardProps) => favorite.title !== title
      );
      localStorage.setItem("favorites", JSON.stringify(updatedFavorites));
    } else {
      // Add to favorites
      favorites.push({ title, type, imageUrl });
      localStorage.setItem("favorites", JSON.stringify(favorites));
    }

    setIsHeartFilled(!isHeartFilled);
  };

  return (
    <div className="p-4 rounded-md relative">
      <img
        src={imageUrl}
        alt={title}
        className="w-full min-w-96 h-52 object-cover rounded-md mb-4 shadow"
      />
      <div className="relative min-w-96 flex">
        <h3 className="text-xl font-bold mt-5">{title}</h3>
        <button
          onClick={toggleHeart}
          className="absolute right-4 border px-6 py-4 overflow-hidden group"
        >
          <span
            className="absolute inset-0 bg-gray-100 -translate-x-full group-hover:translate-x-0 transition-transform duration-500 ease-in-out"
            style={{ zIndex: 10 }}
          ></span>
          <span
            className={`relative transition-colors duration-300 text-3xl ${
              isHeartFilled ? "text-black" : "text-transparent"
            }`}
            style={{
              WebkitTextStroke: "2px black",
              zIndex: 20,
            }}
          >
            ♥
          </span>
        </button>
      </div>
    </div>
  );
};

export default Card;
