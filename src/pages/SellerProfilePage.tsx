import React from 'react';
import { useParams } from 'react-router-dom';

const SellerProfilePage = () => {
  const { id } = useParams();

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="bg-white rounded-lg shadow-lg p-6">
        <h1 className="text-3xl font-bold mb-6">Seller Profile</h1>
        <div className="space-y-4">
          <div className="flex items-center space-x-4">
            <div className="w-24 h-24 bg-gray-200 rounded-full"></div>
            <div>
              <h2 className="text-xl font-semibold">Seller #{id}</h2>
              <p className="text-gray-600">Member since 2024</p>
            </div>
          </div>
          
          <div className="border-t pt-4 mt-4">
            <h3 className="text-xl font-semibold mb-4">About the Seller</h3>
            <p className="text-gray-700">
              This seller's profile information will be populated with real data once connected to the backend.
            </p>
          </div>

          <div className="border-t pt-4 mt-4">
            <h3 className="text-xl font-semibold mb-4">Products</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              <p className="text-gray-600">No products available yet</p>
            </div>
          </div>

          <div className="border-t pt-4 mt-4">
            <h3 className="text-xl font-semibold mb-4">Reviews</h3>
            <p className="text-gray-600">No reviews yet</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SellerProfilePage;