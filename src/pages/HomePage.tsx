import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Search } from 'lucide-react';
import ProductGrid from '../components/product/ProductGrid';
import { mockProducts } from '../data/mockData';

const HomePage: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  
  // Featured products - show first 8 from mock data
  const featuredProducts = mockProducts.slice(0, 8);

  return (
    <div className="animate-fade-in">
      {/* Hero Section */}
      <section className="relative bg-indigo-900 text-white overflow-hidden">
        <div 
          className="absolute inset-0 opacity-30 bg-center bg-cover" 
          style={{ 
            backgroundImage: "url('https://images.pexels.com/photos/5709661/pexels-photo-5709661.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260')" 
          }}
        ></div>
        <div className="container mx-auto px-4 py-24 md:py-32 relative z-10">
          <div className="max-w-2xl animate-slide-up">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              Give Your Clothes a Second Life
            </h1>
            <p className="text-xl md:text-2xl mb-8 text-indigo-100">
              Buy and sell pre-loved fashion from your community. Sustainable, affordable, and stylish.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4">
              <Link
                to="/browse"
                className="bg-white text-indigo-900 hover:bg-gray-100 transition-colors font-medium rounded-md px-6 py-3 text-center"
              >
                Start Shopping
              </Link>
              <Link
                to="/signup?role=seller"
                className="bg-transparent hover:bg-indigo-800 transition-colors border-2 border-white font-medium rounded-md px-6 py-3 text-center"
              >
                Become a Seller
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Search Section */}
      <section className="bg-white py-8 border-b">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            <div className="relative">
              <input
                type="text"
                placeholder="Search for items, brands, categories..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-12 pr-4 py-4 rounded-lg border-2 border-gray-200 focus:border-indigo-500 focus:outline-none focus:ring-0 text-gray-700"
              />
              <Search className="absolute left-4 top-4 h-6 w-6 text-gray-400" />
              <Link
                to={`/browse?search=${searchQuery}`}
                className="absolute right-3 top-3 bg-indigo-600 text-white p-2 rounded-md hover:bg-indigo-700 transition-colors"
              >
                <ArrowRight className="h-5 w-5" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Shop by Category</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Find exactly what you're looking for by browsing our curated categories
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <CategoryCard 
              title="Women" 
              imageUrl="https://images.pexels.com/photos/7691168/pexels-photo-7691168.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260" 
              link="/browse?category=women" 
            />
            <CategoryCard 
              title="Men" 
              imageUrl="https://images.pexels.com/photos/1183266/pexels-photo-1183266.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260" 
              link="/browse?category=men" 
            />
            <CategoryCard 
              title="Kids" 
              imageUrl="https://images.pexels.com/photos/5622858/pexels-photo-5622858.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260" 
              link="/browse?category=kids" 
            />
            <CategoryCard 
              title="Accessories" 
              imageUrl="https://images.pexels.com/photos/1927259/pexels-photo-1927259.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260" 
              link="/browse?category=accessories" 
            />
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center mb-10">
            <h2 className="text-3xl font-bold text-gray-900">Featured Items</h2>
            <Link 
              to="/browse" 
              className="text-indigo-600 hover:text-indigo-800 font-medium flex items-center"
            >
              View all
              <ArrowRight className="ml-1 h-5 w-5" />
            </Link>
          </div>
          
          <ProductGrid products={featuredProducts} />
        </div>
      </section>

      {/* How It Works */}
      <section className="py-16 bg-indigo-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">How It Works</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              ReWear makes it easy to buy and sell pre-loved clothing in just a few simple steps
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white p-6 rounded-lg shadow-md text-center">
              <div className="bg-indigo-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-indigo-600 text-xl font-bold">1</span>
              </div>
              <h3 className="text-xl font-bold mb-3">List Your Items</h3>
              <p className="text-gray-600">
                Take photos, set your price, and create a listing in minutes. It's quick and easy!
              </p>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-md text-center">
              <div className="bg-indigo-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-indigo-600 text-xl font-bold">2</span>
              </div>
              <h3 className="text-xl font-bold mb-3">Connect with Buyers</h3>
              <p className="text-gray-600">
                Communicate with potential buyers through our secure messaging system.
              </p>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-md text-center">
              <div className="bg-indigo-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-indigo-600 text-xl font-bold">3</span>
              </div>
              <h3 className="text-xl font-bold mb-3">Sell & Ship</h3>
              <p className="text-gray-600">
                Complete the sale, ship your items, and get paid. We make the process seamless.
              </p>
            </div>
          </div>

          <div className="text-center mt-12">
            <Link
              to="/signup?role=seller"
              className="bg-indigo-600 hover:bg-indigo-700 text-white font-medium rounded-md px-8 py-3 inline-block transition-colors"
            >
              Start Selling Today
            </Link>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">What Our Community Says</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Hear from our satisfied customers and sellers
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <TestimonialCard 
              name="Sarah L."
              role="Buyer"
              quote="I've found so many unique pieces on ReWear that I couldn't find anywhere else. The prices are great and I love that I'm helping reduce fashion waste."
              avatarUrl="https://images.pexels.com/photos/733872/pexels-photo-733872.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260"
            />
            <TestimonialCard 
              name="Michael T."
              role="Seller"
              quote="ReWear has made it so easy to sell clothes that were just sitting in my closet. The platform is intuitive and I've made over $500 in just two months!"
              avatarUrl="https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260"
            />
            <TestimonialCard 
              name="Jessica K."
              role="Buyer & Seller"
              quote="As both a buyer and seller, I can say ReWear offers the best experience. The communication tools make transactions smooth and stress-free."
              avatarUrl="https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260"
            />
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-indigo-600 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-6">Ready to Join the ReWear Community?</h2>
          <p className="text-xl text-indigo-100 mb-8 max-w-2xl mx-auto">
            Join thousands of fashion lovers buying and selling pre-loved clothing. It's better for your wallet and the planet.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/signup"
              className="bg-white text-indigo-600 hover:bg-gray-100 transition-colors font-medium rounded-md px-8 py-3"
            >
              Sign Up
            </Link>
            <Link
              to="/browse"
              className="bg-transparent hover:bg-indigo-700 transition-colors border-2 border-white font-medium rounded-md px-8 py-3"
            >
              Browse Items
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

interface CategoryCardProps {
  title: string;
  imageUrl: string;
  link: string;
}

const CategoryCard: React.FC<CategoryCardProps> = ({ title, imageUrl, link }) => {
  return (
    <Link to={link} className="relative overflow-hidden rounded-lg group block h-48 md:h-64">
      <div 
        className="absolute inset-0 bg-center bg-cover transform group-hover:scale-110 transition-transform duration-500" 
        style={{ backgroundImage: `url(${imageUrl})` }}
      ></div>
      <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-black/20"></div>
      <div className="absolute bottom-0 left-0 p-4 w-full">
        <h3 className="text-white text-xl font-bold">{title}</h3>
      </div>
    </Link>
  );
};

interface TestimonialCardProps {
  name: string;
  role: string;
  quote: string;
  avatarUrl: string;
}

const TestimonialCard: React.FC<TestimonialCardProps> = ({ name, role, quote, avatarUrl }) => {
  return (
    <div className="bg-gray-50 p-6 rounded-lg">
      <div className="flex items-center mb-4">
        <img 
          src={avatarUrl} 
          alt={name} 
          className="w-12 h-12 rounded-full object-cover mr-4"
        />
        <div>
          <h4 className="font-bold text-gray-900">{name}</h4>
          <p className="text-gray-500 text-sm">{role}</p>
        </div>
      </div>
      <p className="text-gray-700 italic">"{quote}"</p>
    </div>
  );
};

export default HomePage;