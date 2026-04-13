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

  if (loading) return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-gray-50 to-gray-100">
      <div className="text-center">
        <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mb-4"></div>
        <p className="text-lg font-medium text-gray-700">Loading your favorites...</p>
      </div>
    </div>
  );

  if (products.length === 0) return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-gray-50 to-gray-100">
      <div className="text-center">
        <svg className="w-20 h-20 mx-auto mb-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
        </svg>
        <h2 className="text-2xl font-bold text-gray-800 mb-2">No Favorites Yet</h2>
        <p className="text-gray-600 mb-6">Start adding your favorite items to see them here</p>
        <a href="/browse" className="inline-block px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition">
          Browse Products
        </a>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 py-12">
      <div className="max-w-7xl mx-auto px-4">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">My Favorites</h1>
          <p className="text-gray-600">{products.length} item{products.length !== 1 ? 's' : ''} saved</p>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {products.map(product => (
            <ProductCard key={product.id} product={product} onAddToFavorites={toggleFavorite} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default FavoritesPage;
