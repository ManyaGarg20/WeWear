import React, { useState } from 'react';
import { Link, useNavigate, useSearchParams, useLocation } from 'react-router-dom';
import { Search, User, ShoppingBag, Menu, X, Heart, LogOut } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { useCart } from '../../context/CartContext';
import { useFavorites } from '../../context/FavoritesContext';

const Navbar: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [searchParams] = useSearchParams();
  const { pathname } = useLocation();
  const { favoriteIds } = useFavorites();
  const { isAuthenticated, user, logout } = useAuth();
  const { cartItems } = useCart();
  const navigate = useNavigate();

  const currentCategory = searchParams.get('category')?.toLowerCase();

  const isActive = (category: string | null) => {
    if (category === null) {
      return pathname === '/browse' && (currentCategory === null || currentCategory === undefined);
    }
    return pathname === '/browse' && currentCategory === category.toLowerCase();
  };

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <header className="bg-white shadow-sm sticky top-0 z-50">
      <div className="container mx-auto px-4 py-3">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2">
            <ShoppingBag className="h-8 w-8 text-indigo-600" />
            <span className="text-xl font-bold logo-text">ReWear</span>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center space-x-8">
            <Link to="/browse" className={`transition-colors ${isActive(null) ? 'text-indigo-600 font-bold' : 'text-gray-700 hover:text-indigo-600'}`}>Browse</Link>
            <Link to="/browse?category=women" className={`transition-colors ${isActive('women') ? 'text-indigo-600 font-bold' : 'text-gray-700 hover:text-indigo-600'}`}>Women</Link>
            <Link to="/browse?category=men" className={`transition-colors ${isActive('men') ? 'text-indigo-600 font-bold' : 'text-gray-700 hover:text-indigo-600'}`}>Men</Link>
            <Link to="/browse?category=kids" className={`transition-colors ${isActive('kids') ? 'text-indigo-600 font-bold' : 'text-gray-700 hover:text-indigo-600'}`}>Kids</Link>
          </nav>

          {/* search icon navbar */}
          <div className="hidden md:flex items-center space-x-6">
            <div className="relative">
              <input
                type="text"
                placeholder="Search..."
                className="pl-10 pr-4 py-2 rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
              />
              <Search className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
            </div>

{/* favourites icon on navbar */}
            <Link to="/favorites" className="relative text-gray-700 hover:text-indigo-600">
  <Heart className="h-6 w-6" />
  {favoriteIds.size > 0 && (
    <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
      {favoriteIds.size}
    </span>
  )}
</Link>

{/* add to cart icon on navbar */}
            <Link to="/cart" className="relative text-gray-700 hover:text-indigo-600">
              <ShoppingBag className="h-6 w-6" />
              {cartItems.length > 0 && (
                <span className="absolute -top-2 -right-2 bg-indigo-600 text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
                  {cartItems.length}
                </span>
              )}
            </Link>

            {isAuthenticated ? (
              <div className="flex items-center gap-4">
                <Link to="/dashboard" className="flex items-center gap-2 text-gray-700 hover:text-indigo-600">
                  <User className="h-6 w-6" />
                  <span className="font-medium">{user?.name?.split(' ')[0]}</span>
                </Link>
                <button
                  onClick={handleLogout}
                  className="text-red-500 hover:text-red-700 flex items-center gap-1"
                >
                  <LogOut className="h-5 w-5" />
                  Logout
                </button>
              </div>
            ) : (
              <Link
                to="/login"
                className="bg-indigo-600 text-white px-4 py-2 rounded-md font-medium hover:bg-indigo-700 transition-colors"
              >
                Sign In
              </Link>
            )}
          </div>

          {/* Mobile menu button */}
          <button className="md:hidden text-gray-700" onClick={() => setIsMenuOpen(!isMenuOpen)}>
            {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden mt-4 pb-4 animate-fade-in">
            {/* ...same as before... */}
            {isAuthenticated ? (
              <>
                <Link
                  to="/dashboard"
                  className="flex items-center gap-2 text-gray-700 hover:text-indigo-600 py-2"
                  onClick={() => setIsMenuOpen(false)}
                >
                  <User className="h-5 w-5" />
                  <span>My Account</span>
                </Link>
                <button
                  onClick={() => {
                    handleLogout();
                    setIsMenuOpen(false);
                  }}
                  className="flex items-center gap-2 text-red-500 hover:text-red-700 py-2"
                >
                  <LogOut className="h-5 w-5" />
                  <span>Logout</span>
                </button>
              </>
            ) : (
              <Link
                to="/login"
                className="bg-indigo-600 text-white px-4 py-2 rounded-md font-medium hover:bg-indigo-700 transition-colors text-center mt-2"
                onClick={() => setIsMenuOpen(false)}
              >
                Sign In
              </Link>
            )}
          </div>
        )}
      </div>
    </header>
  );
};

export default Navbar;
