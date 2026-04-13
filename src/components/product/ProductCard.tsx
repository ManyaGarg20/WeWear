import React from 'react';
import { Link } from 'react-router-dom';
import { Heart, ShoppingCart, Minus, Plus } from 'lucide-react';
import { Product } from '../../types/Product';
import { useFavorites } from '../../context/FavoritesContext';
import { useCart } from '../../context/CartContext';

interface ProductCardProps {
  product: Product;
  onAddToFavorites?: (productId: number) => void;
}

const ProductCard: React.FC<ProductCardProps> = ({ product, onAddToFavorites }) => {
  const { isFavorite } = useFavorites();
  const { addToCart, updateQuantity, getItemQuantity, isInCart } = useCart();
  const isFav = isFavorite(product.id);
  const cartQuantity = getItemQuantity(product.id);
  const inCart = isInCart(product.id);
  return (
    <div className="bg-white rounded-lg overflow-hidden shadow-md card-hover">
      <div className="relative">
        <Link to={`/product/${product.id}`}>
          <img 
            src={product.imageUrl} 
            alt={product.title} 
            className="product-card-image"
          />
        </Link>
        <button 
          onClick={() => onAddToFavorites && onAddToFavorites(product.id)}
          className="absolute top-3 right-3 bg-white p-1.5 rounded-full shadow-md hover:bg-gray-100 transition-colors"
          aria-label="Add to favorites"
        >
          <Heart className={`h-5 w-5 transition-colors ${isFav ? 'fill-red-500 text-red-500' : 'text-gray-500 hover:text-red-500'}`} />
        </button>
        {product.condition && (
          <span className="absolute top-3 left-3 bg-indigo-600 text-white text-xs font-medium px-2 py-1 rounded">
            {product.condition}
          </span>
        )}
      </div>
      
      <div className="p-4">
        <div className="flex justify-between items-start mb-2">
          <Link to={`/product/${product.id}`} className="block">
            <h3 className="font-medium text-gray-900 hover:text-indigo-600 transition-colors">
              {product.title}
            </h3>
          </Link>
          <span className="font-semibold text-indigo-600">${product.price.toFixed(2)}</span>
        </div>
        
        <div className="flex justify-between items-center text-sm text-gray-500">
          <span>{product.size}</span>
          <span>{product.brand}</span>
        </div>
        
        <div className="mt-3 flex items-center text-sm text-gray-500">
          <span>{product.location}</span>
        </div>
        
        <div className="mt-4 flex gap-2">
          <Link 
            to={`/product/${product.id}`} 
            className="flex-1 bg-gray-100 hover:bg-gray-200 text-gray-800 font-medium py-2 px-4 rounded text-center transition-colors"
          >
            View Details
          </Link>
          {!inCart ? (
            <button
              onClick={() => addToCart(product, 1)}
              className="flex-1 bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded transition-colors flex items-center justify-center gap-1"
            >
              <ShoppingCart className="h-4 w-4" />
              Add
            </button>
          ) : (
            <div className="flex-1 flex gap-1 bg-blue-600 text-white font-medium rounded overflow-hidden">
              <button
                onClick={() => updateQuantity(product.id, cartQuantity - 1)}
                className="flex-1 hover:bg-blue-500 transition-colors flex items-center justify-center"
              >
                <Minus className="h-4 w-4" />
              </button>
              <div className="flex items-center justify-center px-2 bg-blue-700">
                {cartQuantity}
              </div>
              {cartQuantity > 1 && (
                <button
                  onClick={() => updateQuantity(product.id, cartQuantity + 1)}
                  className="flex-1 hover:bg-blue-500 transition-colors flex items-center justify-center"
                >
                  <Plus className="h-4 w-4" />
                </button>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductCard;