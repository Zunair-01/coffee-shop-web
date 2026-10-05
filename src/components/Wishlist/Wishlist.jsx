import React, { useEffect, useState } from "react";
import { FaHeart } from "react-icons/fa";
import { useFavorites } from "../ContextFiles/FavouritesContext";

const Wishlist = () => {
  const [message, setMessage] = useState("");
  const { favorites, removeFavorite } = useFavorites();

  const handleFavoriteClick = (item) => {
    removeFavorite(item._id);
    setMessage(`${item.name} removed from favorites`);
    setTimeout(() => setMessage(""), 3000);
  };

  return (
    <div className="py-12">
      <div className="container mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold font-cursive text-gray-800">Your Wishlist</h1>
        </div>
        {message && (
          <div className="text-center mb-4">
            <p className="text-red-500">{message}</p>
          </div>
        )}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 place-items-center">
          {favorites.length > 0 ? (
            favorites.map((item) => (
              <div
                key={item._id}
                className="relative rounded-2xl bg-white shadow-xl duration-high group w-full"
                style={{ maxWidth: '300px' }}
              >
                <div className="h-48 overflow-hidden rounded-t-2xl">
                  <img
                    src={`http://localhost:3001/${item.image}`}
                    alt={item.name}
                    className="w-full h-full object-contain transform group-hover:scale-105 group-hover:rotate-6 duration-300"
                  />
                </div>
                <div className="p-4 text-center bg-brandDark bg-opacity-70 rounded-b-2xl">
                  <h2 className="text-lg font-bold text-white">{item.name}</h2>
                  <p className="text-sm text-gray-300 group-hover:text-white duration-high mb-2">
                    {item.description}
                  </p>
                  <div className="flex justify-between items-center">
                    <p className="text-lg font-semibold text-yellow-500">{item.price}</p>
                    <button className="bg-brandDark text-white rounded-full w-8 h-8 flex items-center justify-center text-lg">
                      +
                    </button>
                  </div>
                </div>
                <button
                  onClick={() => handleFavoriteClick(item)}
                  className="absolute top-4 right-4 bg-brandDark bg-opacity-50 rounded-full p-2"
                >
                  <FaHeart className="text-white text-2xl" />
                </button>
              </div>
            ))
          ) : (
            <p className="text-center text-gray-500">No favorite items found.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Wishlist;
