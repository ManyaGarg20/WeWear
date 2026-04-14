import React from 'react';
import { Store, CheckCircle, BarChart3, Globe } from 'lucide-react';

const BecomeSellerPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-gray-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        {/* Coming Soon Banner */}
        <div className="bg-gradient-to-r from-blue-600 to-blue-700 rounded-lg shadow-lg p-8 mb-12 text-center text-white">
          <Store className="h-16 w-16 mx-auto mb-4 animate-bounce" />
          <h1 className="text-4xl font-bold mb-3">Become a Seller</h1>
          <p className="text-xl text-blue-100 mb-4">
            Join our community of sellers and start your business journey with us
          </p>
          <div className="inline-block bg-white bg-opacity-20 backdrop-blur-md px-6 py-3 rounded-lg border border-white border-opacity-30">
            <span className="text-2xl font-semibold">🚀 Coming Soon</span>
          </div>
        </div>
        {/* Features Preview */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          <div className="bg-white rounded-lg shadow-md p-6 text-center hover:shadow-lg transition-shadow">
            <BarChart3 className="h-12 w-12 text-blue-600 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Analytics Dashboard</h3>
            <p className="text-gray-600">
              Track your sales, inventory,and customer insights in real-time
            </p>
          </div>

          <div className="bg-white rounded-lg shadow-md p-6 text-center hover:shadow-lg transition-shadow">
            <Globe className="h-12 w-12 text-green-600 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Reach Customers</h3>
            <p className="text-gray-600">
              List your products and connect with thousands of shoppers
            </p>
          </div>

          <div className="bg-white rounded-lg shadow-md p-6 text-center hover:shadow-lg transition-shadow">
            <CheckCircle className="h-12 w-12 text-purple-600 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Easy Management</h3>
            <p className="text-gray-600">
              Simple tools to manage orders, payments, and customer support
            </p>
          </div>
        </div>

        {/* Notification Box */}
        <div className="bg-white rounded-lg shadow-md p-8 text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Get Notified When We Launch</h2>
          <p className="text-gray-600 mb-6">
            The seller dashboard is coming soon. Enter your email to be notified when you can start selling.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <input
              type="email"
              placeholder="Enter your email"
              className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              disabled
            />
            <button
              disabled
              className="px-8 py-3 bg-gray-300 text-gray-500 rounded-lg font-medium cursor-not-allowed"
            >
              Notify Me
            </button>
          </div>
          <p className="text-sm text-gray-500 mt-4">Coming soon feature - Stay tuned! 📬</p>
        </div>

        {/* Info Section */}
        <div className="mt-12 bg-blue-50 rounded-lg p-8 border-2 border-blue-200">
          <h3 className="text-xl font-bold text-gray-900 mb-4">Why Sell With Us?</h3>
          <ul className="space-y-3 text-gray-700">
            <li className="flex items-start">
              <CheckCircle className="h-5 w-5 text-green-600 mr-3 mt-0.5 flex-shrink-0" />
              <span>Low commission rates to maximize your earnings</span>
            </li>
            <li className="flex items-start">
              <CheckCircle className="h-5 w-5 text-green-600 mr-3 mt-0.5 flex-shrink-0" />
              <span>Fast and secure payment processing</span>
            </li>
            <li className="flex items-start">
              <CheckCircle className="h-5 w-5 text-green-600 mr-3 mt-0.5 flex-shrink-0" />
              <span>24/7 seller support and resources</span>
            </li>
            <li className="flex items-start">
              <CheckCircle className="h-5 w-5 text-green-600 mr-3 mt-0.5 flex-shrink-0" />
              <span>Reach thousands of active buyers</span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default BecomeSellerPage;
