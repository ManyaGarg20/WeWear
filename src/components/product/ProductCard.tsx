import React from 'react';
import { Link } from 'react-router-dom';
import { Heart } from 'lucide-react';
import { Product } from '../../types/Product';

interface ProductCardProps {
  product: Product;
  onAddToFavorites?: (productId: number) => void;
}

const ProductCard: React.FC<ProductCardProps> = ({ product, onAddToFavorites }) => {
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
          <Heart className={`h-5 w-5 ${product.isFavorite ? 'fill-red-500 text-red-500' : 'text-gray-500'}`} />
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
        
        <div className="mt-4">
          <Link 
            to={`/product/${product.id}`} 
            className="block w-full bg-gray-100 hover:bg-gray-200 text-gray-800 font-medium py-2 px-4 rounded text-center transition-colors"
          >
            View Details
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;