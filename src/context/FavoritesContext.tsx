import React, { createContext, useContext, useState, useEffect } from 'react';


interface FavoritesContextType {
  favoriteIds: Set<number>;
  toggleFavorite: (productId: number) => void;
  isFavorite: (productId: number) => boolean;
}

const FavoritesContext = createContext<FavoritesContextType>({
  favoriteIds: new Set(),
  toggleFavorite: () => {},
  isFavorite: () => false,
});

export const useFavorites = () => useContext(FavoritesContext);

export const FavoritesProvider: React.FC<{children: React.ReactNode}> = ({ children }) => {
  const [favoriteIds, setFavoriteIds] = useState<Set<number>>(new Set());

  // Load from localStorage
  useEffect(() => {
    const stored = localStorage.getItem('favorites');
    if (stored) {
      setFavoriteIds(new Set(JSON.parse(stored)));
    }
  }, []);

  // Save to localStorage on changes
  useEffect(() => {
    localStorage.setItem('favorites', JSON.stringify(Array.from(favoriteIds)));
  }, [favoriteIds]);

  const toggleFavorite = (productId: number) => {
  setFavoriteIds(prev => {
    const updated = new Set(prev);
    if (updated.has(productId)) {
      updated.delete(productId);
    } else {
      updated.add(productId);
    }
    return new Set(updated); // ensure new reference
  });
};

  const isFavorite = (productId: number) => favoriteIds.has(productId);

  return (
    <FavoritesContext.Provider value={{ favoriteIds, toggleFavorite, isFavorite }}>
      {children}
    </FavoritesContext.Provider>
  );
};
