import React from 'react';
import { useAuth } from '../context/AuthContext';
import { Navigate } from 'react-router-dom';

const UserDashboardPage: React.FC = () => {
  const { user, isAuthenticated } = useAuth();

  if (!isAuthenticated || !user) {
    return <Navigate to="/login" replace />;
  }

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white shadow-md rounded-lg mt-8">
      <div className="flex items-center gap-6">
        <img
          src={user.profileImage || 'https://via.placeholder.com/150'}
          alt="Profile"
          className="w-24 h-24 rounded-full object-cover border"
        />
        <div>
          <h2 className="text-2xl font-bold text-gray-800">{user.name}</h2>
          <p className="text-gray-600">{user.email}</p>
          <p className="text-sm text-gray-500">{user.location || 'Location not set'}</p>
        </div>
      </div>

      <div className="mt-6 space-y-2">
        <p><strong>Account Type:</strong> {user.isSeller ? 'Seller' : 'Buyer'}</p>
        <p><strong>Rating:</strong> {user.rating} ★ ({user.reviewCount} reviews)</p>
        <p><strong>Member since:</strong> {new Date(user.createdAt).toLocaleDateString()}</p>
      </div>
    </div>
  );
};

export default UserDashboardPage;
