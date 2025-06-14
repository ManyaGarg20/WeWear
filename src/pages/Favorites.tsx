import React, { useEffect, useState } from 'react';
import { useFavorites } from '../context/FavoritesContext';
import { Product } from '../types/Product';
import ProductCard from '../components/product/ProductCard';
import { fetchProductsByIds } from '../data/mockApi';

const FavoritesPage: React.FC = () => {
  const { favoriteIds , toggleFavorite } = useFavorites();
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    fetchProductsByIds(Array.from(favoriteIds)).then(fetched => {
      setProducts(fetched);
      setLoading(false);
    });
  }, [favoriteIds]);

  if (loading) return <div>Loading favorites...</div>;

  if (products.length === 0) return <div>No favorites yet.</div>;

  return (
    <div className="max-w-7xl mx-auto p-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
      {products.map(product => (
        <ProductCard key={product.id} product={product}  onAddToFavorites={toggleFavorite} />
      ))}
    </div>
  );
};

export default FavoritesPage;
