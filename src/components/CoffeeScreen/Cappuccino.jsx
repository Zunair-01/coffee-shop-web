// src/components/Cappuccino.js
import React, { useEffect, useState } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import { FaHeart } from "react-icons/fa";
import axios from "axios";
import { useFavorites } from "../ContextFiles/FavouritesContext";
import { useAuth } from "../ContextFiles/AuthContext";
import { useCart } from "../ContextFiles/CartContext";

const Cappuccino = () => {
  const [cappuccinoData, setCappuccinoData] = useState([]);
  const [message, setMessage] = useState("");
  const { addFavorite, removeFavorite, isFavorite } = useFavorites();
  const { user } = useAuth();
  const { addToCart } = useCart();

  useEffect(() => {
    AOS.init({ duration: 1000 });
    fetchCappuccinoData();
  }, []);

  useEffect(() => {
    console.log("User in Cappuccino component:", user);
  }, [user]);

  const fetchCappuccinoData = async () => {
    try {
      const response = await axios.get('http://localhost:3001/api/items');
      const data = response.data;
      const filteredData = data.filter(item => item.category.toLowerCase() === 'cappuccino');
      setCappuccinoData(filteredData);
    } catch (error) {
      console.error('Error fetching cappuccino data:', error);
    }
  };

  const handleHeartClick = (item) => {
    console.log("User ID:", user.id);
    if (isFavorite(item._id)) {
      removeFavorite(item._id);
      setMessage(`${item.name} removed from favorites.`);
    } else {
      addFavorite(item);
      setMessage(`${item.name} added to favorites.`);
    }
    setTimeout(() => {
      setMessage("");
    }, 3000);
  };

  const handleAddToCart = (item) => {
    addToCart(item);
    setMessage(`${item.name} added to cart!`);
    setTimeout(() => {
      setMessage("");
    }, 3000);
  };

  return (
    <div className="py-12">
      <div className="container mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold font-cursive text-gray-800">Cappuccino Varieties</h1>
        </div>
        
        {message && (
          <div className="text-center mb-4">
            <p className="text-green-500">{message}</p>
          </div>
        )}

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 place-items-center">
          {cappuccinoData.length > 0 ? (
            cappuccinoData.map((cappuccino) => (
              <div
                key={cappuccino._id}
                data-aos="fade-up"
                data-aos-delay={cappuccino.aosDelay}
                className="relative rounded-2xl bg-white hover:bg-primary hover:text-white shadow-xl duration-high group w-full"
                style={{ maxWidth: '300px' }}
              >
                <div className="h-48 overflow-hidden rounded-t-2xl">
                  <img
                    src={`http://localhost:3001/${cappuccino.image}`}
                    alt={cappuccino.name}
                    className="w-full h-full object-contain transform group-hover:scale-105 group-hover:rotate-6 duration-300"
                  />
                </div>
                <div className="p-4 text-center">
                  <h2 className="text-lg font-bold">{cappuccino.name}</h2>
                  <p className="text-sm text-gray-500 group-hover:text-white duration-high mb-2">
                    {cappuccino.description}
                  </p>
                  <div className="flex justify-between items-center">
                    <p className="text-lg font-semibold text-yellow-500">{cappuccino.price}</p>
                    <button
                      onClick={() => handleAddToCart(cappuccino)}
                      className="bg-brandDark text-white rounded-full w-8 h-8 flex items-center justify-center text-lg"
                    >
                      +
                    </button>
                  </div>
                </div>
                <button
                  onClick={() => handleHeartClick(cappuccino)}
                  className={`absolute top-4 right-4 bg-brandDark bg-opacity-50 rounded-full p-2 text-xl ${
                    isFavorite(cappuccino._id) ? 'text-white' : 'text-gray-500'
                  }`}
                >
                  <FaHeart />
                </button>
              </div>
            ))
          ) : (
            <p className="text-center text-gray-500">No Cappuccino items available.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Cappuccino;
