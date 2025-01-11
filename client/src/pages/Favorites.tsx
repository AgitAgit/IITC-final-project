import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

interface Favorite {
  title: string;
  type: string;
  imageUrl: string;
}

function Favorites() {
  const [favorites, setFavorites] = useState<Favorite[]>([]);

  // Fetch favorites from local storage
  useEffect(() => {
    const storedFavorites = JSON.parse(
      localStorage.getItem("favorites") || "[]"
    );
    setFavorites(storedFavorites);
  }, []);

  // Remove a favorite and update local storage
  const removeFavorite = (title: string) => {
    const updatedFavorites = favorites.filter(
      (favorite) => favorite.title !== title
    );
    setFavorites(updatedFavorites);
    localStorage.setItem("favorites", JSON.stringify(updatedFavorites));
  };

  return (
    <div className="flex flex-col items-center h-screen w-screen p-4">
      {/* Back button */}
      <div className="w-full flex items-center mb-6">
        <Link
          to="/templates"
          className="text-black text-lg flex items-center gap-2 group"
        >
          <span className="material-icons">arrow_back</span>
          <p className="relative overflow-hidden">
            <span className="text-sm font-bold">Back to Templates</span>
            <span className="absolute bottom-0 left-0 w-full h-[2px] bg-black scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left"></span>
          </p>
        </Link>
      </div>

      {/* Heading with favorites counter */}
      <h2 className="text-black text-2xl mb-4 mt-32 self-start ml-40">
        My Favorites ({favorites.length})
      </h2>

      {/* Favorites Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {favorites.length > 0 ? (
          favorites.map((favorite) => (
            <div key={favorite.title} className="p-4 rounded-md relative">
              <img
                src={favorite.imageUrl}
                alt={favorite.title}
                className="w-full min-w-[420px] h-72 object-cover rounded-md mb-4 shadow"
              />
              <div className="relative min-w-96 flex">
                <h3 className="text-xl font-bold mt-5">{favorite.title}</h3>
                <button
                  onClick={() => removeFavorite(favorite.title)}
                  className="absolute right-0 border px-6 py-4 overflow-hidden group"
                >
                  <span
                    className="absolute inset-0 bg-gray-100 -translate-x-full group-hover:translate-x-0 transition-transform duration-500 ease-in-out"
                    style={{ zIndex: 10 }}
                  ></span>
                  <span
                    className="relative transition-colors duration-300 text-3xl text-black"
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
          ))
        ) : (
          <p className="text-black text-lg">No favorites yet!</p>
        )}
      </div>
    </div>
  );
}

export default Favorites;
