import React from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { ShoppingBag, Facebook, Instagram, Twitter } from 'lucide-react';

const Footer: React.FC = () => {
  const [searchParams] = useSearchParams();
  const currentCategory = searchParams.get('category')?.toLowerCase();

  const isActive = (category: string) => {
    return currentCategory === category.toLowerCase();
  };
  return (
    <footer className="bg-gray-900 text-gray-300">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <Link to="/" className="flex items-center gap-2 mb-4">
              <ShoppingBag className="h-7 w-7 text-indigo-400" />
              <span className="text-xl font-bold text-white">ReWear</span>
            </Link>
            <p className="text-gray-400 mb-4">
              Give your clothes a second life and find unique fashion pieces at affordable prices.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <Facebook className="h-5 w-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <Instagram className="h-5 w-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <Twitter className="h-5 w-5" />
              </a>
            </div>
          </div>

          <div>
            <h3 className="text-white font-semibold text-lg mb-4">Shop</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/browse?category=women" className={`transition-colors ${isActive('women') ? 'text-white font-bold' : 'text-gray-400 hover:text-white'}`}>
                  Women
                </Link>
              </li>
              <li>
                <Link to="/browse?category=men" className={`transition-colors ${isActive('men') ? 'text-white font-bold' : 'text-gray-400 hover:text-white'}`}>
                  Men
                </Link>
              </li>
              <li>
                <Link to="/browse?category=kids" className={`transition-colors ${isActive('kids') ? 'text-white font-bold' : 'text-gray-400 hover:text-white'}`}>
                  Kids
                </Link>
              </li>
              <li>
                <Link to="/browse?category=accessories" className={`transition-colors ${isActive('accessories') ? 'text-white font-bold' : 'text-gray-400 hover:text-white'}`}>
                  Accessories
                </Link>
              </li>
              <li>
                <Link to="/browse?category=shoes" className={`transition-colors ${isActive('shoes') ? 'text-white font-bold' : 'text-gray-400 hover:text-white'}`}>
                  Shoes
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-white font-semibold text-lg mb-4">Help</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/faq" className="text-gray-400 hover:text-white transition-colors">
                  FAQ
                </Link>
              </li>
              <li>
                <Link to="/shipping" className="text-gray-400 hover:text-white transition-colors">
                  Shipping
                </Link>
              </li>
              <li>
                <Link to="/returns" className="text-gray-400 hover:text-white transition-colors">
                  Returns
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-gray-400 hover:text-white transition-colors">
                  Contact Us
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-white font-semibold text-lg mb-4">About</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/about" className="text-gray-400 hover:text-white transition-colors">
                  Our Story
                </Link>
              </li>
              <li>
                <Link to="/sustainability" className="text-gray-400 hover:text-white transition-colors">
                  Sustainability
                </Link>
              </li>
              <li>
                <Link to="/careers" className="text-gray-400 hover:text-white transition-colors">
                  Careers
                </Link>
              </li>
              <li>
                <Link to="/terms" className="text-gray-400 hover:text-white transition-colors">
                  Terms & Conditions
                </Link>
              </li>
              <li>
                <Link to="/privacy" className="text-gray-400 hover:text-white transition-colors">
                  Privacy Policy
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-12 pt-8 text-center text-gray-400">
          <p>&copy; {new Date().getFullYear()} ReWear. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;