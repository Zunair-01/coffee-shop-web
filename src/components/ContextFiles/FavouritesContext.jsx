import React, { createContext, useState, useContext, useEffect } from 'react';
import { useAuth } from './AuthContext';

const FavoritesContext = createContext();

export const FavoritesProvider = ({ children }) => {
  const { user } = useAuth();
  const [favorites, setFavorites] = useState({});

  useEffect(() => {
    if (user) {
      const storedFavorites = JSON.parse(localStorage.getItem(`favorites-${user.id}`)) || {};
      setFavorites(storedFavorites);
    }
  }, [user]);

  useEffect(() => {
    if (user) {
      localStorage.setItem(`favorites-${user.id}`, JSON.stringify(favorites));
    }
  }, [favorites, user]);

  const addFavorite = (item) => {
    setFavorites((prevFavorites) => ({ ...prevFavorites, [item._id]: item }));
  };

  const removeFavorite = (itemId) => {
    setFavorites((prevFavorites) => {
      const newFavorites = { ...prevFavorites };
      delete newFavorites[itemId];
      return newFavorites;
    });
  };

  const isFavorite = (itemId) => !!favorites[itemId];

  return (
    <FavoritesContext.Provider
      value={{ favorites: Object.values(favorites), addFavorite, removeFavorite, isFavorite }}
    >
      {children}
    </FavoritesContext.Provider>
  );
};

export const useFavorites = () => useContext(FavoritesContext);
