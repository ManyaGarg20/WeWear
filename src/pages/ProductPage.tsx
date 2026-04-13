import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Product } from '../types/Product';
import { ShoppingCart, Heart, Minus, Plus } from 'lucide-react';
import { useCart } from '../context/CartContext';
import {  fetchProductById } from '../data/mockApi';
import { useFavorites } from '../context/FavoritesContext';

const ProductPage: React.FC = () => {
  const { addToCart, updateQuantity, getItemQuantity, isInCart } = useCart();
  const { id } = useParams();
  const { toggleFavorite, isFavorite } = useFavorites();
  const [product, setProduct] = React.useState<Product | null>(null);
  const [loading, setLoading] = React.useState(true);
  const cartQuantity = product ? getItemQuantity(product.id) : 0;
  const inCart = product ? isInCart(product.id) : false;

  useEffect(() => {
  const fetchProduct = async () => {
    setLoading(true);
    if (id) {
      const fetched = await fetchProductById(Number(id));
      setProduct(fetched ?? null);
    }
    setLoading(false);
  };
  fetchProduct();
}, [id]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900">Product not found</h2>
          <p className="mt-2 text-gray-600">The product you're looking for doesn't exist.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="bg-white rounded-lg shadow-lg overflow-hidden">
          <div className="md:flex">
            <div className="md:flex-shrink-0">
              <img
                className="h-96 w-full object-cover md:w-96"
                src={product.imageUrl}
                alt={product.name}
              />
            </div>
            <div className="p-8">
              <div className="flex justify-between items-start">
                <div>
                  <h2 className="text-3xl font-bold text-gray-900">{product.name}</h2>
                  <p className="mt-2 text-2xl text-gray-900">${product.price.toFixed(2)}</p>
                </div>
              </div>

              <div className="flex flex-wrap gap-4 mt-4">
  {!inCart ? (
    <button
      onClick={() => addToCart(product)}
      className="flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
    >
      <ShoppingCart className="mr-2 h-5 w-5" />
      Add to Cart
    </button>
  ) : (
    <div className="flex items-center gap-2 px-4 py-3 bg-blue-600 text-white font-medium rounded-md">
      <button
        onClick={() => updateQuantity(product.id, cartQuantity - 1)}
        className="p-1 hover:bg-blue-500 rounded transition-colors"
      >
        <Minus className="h-4 w-4" />
      </button>
      <span className="w-8 text-center">{cartQuantity}</span>
      {cartQuantity > 1 && (
        <button
          onClick={() => updateQuantity(product.id, cartQuantity + 1)}
          className="p-1 hover:bg-blue-500 rounded transition-colors"
        >
          <Plus className="h-4 w-4" />
        </button>
      )}
    </div>
  )}

  <button
    onClick={() => toggleFavorite(product.id)}
    className={`flex items-center px-6 py-3 border text-base font-medium rounded-md ${
      isFavorite(product.id)
        ? 'text-white bg-red-500 hover:bg-red-600'
        : 'text-red-500 border-red-500 hover:bg-red-50'
    }`}
  >
    <Heart className="mr-2 h-5 w-5" fill={isFavorite(product.id) ? 'white' : 'none'} />
    {isFavorite(product.id) ? 'Remove from Favorites' : 'Add to Favorites'}
  </button>
              </div>
              
              <div className="mt-6">
                <h3 className="text-lg font-medium text-gray-900">Description</h3>
                <p className="mt-2 text-gray-600">{product.description}</p>
              </div>

              <div className="mt-6">
                <div className="flex items-center">
                  <h3 className="text-lg font-medium text-gray-900">Seller: </h3>
                  <a 
                    href={`/seller/${product.sellerId}`}
                    className="ml-2 text-blue-600 hover:text-blue-800"
                  >
                    {product.sellerName}
                  </a>
                </div>
                <div className="mt-1 flex items-center">
                  <span className="text-yellow-400">★</span>
                  <span className="ml-1 text-gray-600">{product.sellerRating} / 5</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductPage;