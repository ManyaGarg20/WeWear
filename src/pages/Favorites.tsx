import React, { useEffect, useState } from 'react';
import { useFavorites } from '../context/FavoritesContext';
import { Product } from '../types/Product';
import ProductCard from '../components/product/ProductCard';


// Mock function simulating fetching product data by IDs
async function fetchProductsByIds(ids: number[]): Promise<Product[]> {
  // Replace this with real API call or context-based data retrieval
  // Here we simulate by returning mocked products
  // For demo, return empty if no ids
  if (ids.length === 0) return [];

  // Example mocked data:
  return ids.map(id => ({
    id,
    title: `Sample Product ${id}`,
    description: "Description here",
    price: 99.99,
    imageUrl: "https://images.pexels.com/photos/90946/pexels-photo-90946.jpeg",
    category: "Category",
    brand: "Brand",
    size: "M",
    name: 'Sample Product',
    condition: "New",
    colors: ["red", "blue"],
    location: "Sample Location",
    sellerId: "1",
    sellerName: "Seller",
    sellerRating: 4.5,
    isFavorite: true,
    createdAt: new Date().toISOString(),
  }));
}

const FavoritesPage: React.FC = () => {
  const { favoriteIds } = useFavorites();
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
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
};

export default FavoritesPage;
