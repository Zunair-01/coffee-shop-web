import React, { useEffect, useState } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import { FaHeart, FaShoppingCart } from "react-icons/fa";
import axios from "axios";
import { useFavorites } from "../ContextFiles/FavouritesContext";
import { useCart } from "../ContextFiles/CartContext";

const Espresso = () => {
  const [espressoData, setEspressoData] = useState([]);
  const [message, setMessage] = useState("");
  const { addFavorite, removeFavorite, isFavorite } = useFavorites();
  const { addToCart } = useCart();

  useEffect(() => {
    AOS.init({ duration: 1000 });
    fetchEspressoData();
  }, []);

  const fetchEspressoData = async () => {
    try {
      const response = await axios.get('http://localhost:3001/api/items');
      const data = response.data;
      const filteredData = data.filter(item => item.category.toLowerCase() === 'espresso');
      setEspressoData(filteredData);
    } catch (error) {
      console.error('Error fetching espresso data:', error);
    }
  };

  const handleHeartClick = (item) => {
    if (isFavorite(item._id)) {
      removeFavorite(item._id);
      setMessage(`${item.name} removed from favorites`);
    } else {
      addFavorite(item);
      setMessage(`${item.name} added to favorites`);
    }

    setTimeout(() => setMessage(""), 3000);
  };

  const handleAddToCart = (item) => {
    addToCart(item);
    setMessage(`${item.name} added to cart`);

    setTimeout(() => setMessage(""), 3000);
  };

  return (
    <div className="py-12">
      <div className="container mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold font-cursive text-gray-800">Espresso Varieties</h1>
        </div>
        {message && (
          <div className="text-center mb-4">
            <p className="text-green-500">{message}</p>
          </div>
        )}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 place-items-center">
          {espressoData.length > 0 ? (
            espressoData.map((espresso) => (
              <div
                key={espresso._id}
                data-aos="fade-up"
                data-aos-delay={espresso.aosDelay}
                className="relative rounded-2xl bg-white hover:bg-primary hover:text-white shadow-xl duration-high group w-full"
                style={{ maxWidth: '300px' }}
              >
                <div className="h-48 overflow-hidden rounded-t-2xl">
                  <img
                    src={`http://localhost:3001/${espresso.image}`}
                    alt={espresso.name}
                    className="w-full h-full object-contain transform group-hover:scale-105 group-hover:rotate-6 duration-300"
                  />
                </div>
                <div className="p-4 text-center">
                  <h2 className="text-lg font-bold">{espresso.name}</h2>
                  <p className="text-sm text-gray-500 group-hover:text-white duration-high mb-2">
                    {espresso.description}
                  </p>
                  <div className="flex justify-between items-center">
                    <p className="text-lg font-semibold text-yellow-500">{espresso.price}</p>
                    <button
                      onClick={() => handleAddToCart(espresso)}
                      className="bg-brandDark text-white rounded-full w-8 h-8 flex items-center justify-center text-lg"
                    >
                      +
                    </button>
                  </div>
                </div>
                <button
                  onClick={() => handleHeartClick(espresso)}
                  className={`absolute top-4 right-4 bg-brandDark bg-opacity-50 rounded-full p-2 text-xl ${isFavorite(espresso._id) ? 'text-white' : 'text-gray-500'}`}
                >
                  <FaHeart />
                </button>
              </div>
            ))
          ) : (
            <p className="text-center text-gray-500">No Espresso items available.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Espresso;
