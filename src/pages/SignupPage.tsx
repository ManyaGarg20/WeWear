import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { createUserWithEmailAndPassword, signInWithPopup, GoogleAuthProvider } from 'firebase/auth';
import { auth, db } from '../context/Firebase';
import { doc, setDoc } from 'firebase/firestore';

const SignupPage: React.FC = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleEmailSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const result = await createUserWithEmailAndPassword(auth, formData.email, formData.password);
      const user = result.user;
      await setDoc(doc(db, 'users', user.uid), {
        id: user.uid,
        name: formData.name,
        email: user.email,
        isSeller: false,
        bio: '',
        location: '',
        rating: 0,
        reviewCount: 0,
        profileImage: '',
        createdAt: new Date().toISOString(),
      });
      navigate('/complete-profile');
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleSignup = async () => {
    setLoading(true);
    const provider = new GoogleAuthProvider();
    try {
      const result = await signInWithPopup(auth, provider);
      const user = result.user;
      await setDoc(doc(db, 'users', user.uid), {
        id: user.uid,
        name: user.displayName || '',
        email: user.email,
        isSeller: false,
        bio: '',
        location: '',
        rating: 0,
        reviewCount: 0,
        profileImage: user.photoURL || '',
        createdAt: new Date().toISOString(),
      });
      navigate('/complete-profile');
    } catch (err: any) {
      setError('Google sign-up failed.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 px-4">
      <div className="w-full max-w-md bg-white p-8 rounded-xl shadow-md">
        <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">Create an Account</h2>

        <form onSubmit={handleEmailSignup} className="space-y-5">
          <div>
            <label className="block mb-1 text-gray-600">Name</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>
          <div>
            <label className="block mb-1 text-gray-600">Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>
          <div>
            <label className="block mb-1 text-gray-600">Password</label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>

          {error && <p className="text-red-500 text-sm">{error}</p>}

          <button
            type="submit"
            disabled={loading}
            className="w-full py-2 px-4 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition disabled:opacity-50"
          >
            {loading ? 'Signing up...' : 'Sign Up with Email'}
          </button>
        </form>

        <div className="mt-4 text-center">
          <button
            onClick={handleGoogleSignup}
            disabled={loading}
            className="w-full py-2 px-4 mt-4 bg-red-500 text-white rounded-md hover:bg-red-600 transition disabled:opacity-50"
          >
            {loading ? 'Please wait...' : 'Sign Up with Google'}
          </button>
        </div>

        <p className="mt-4 text-center text-sm text-gray-600">
          Already have an account?{' '}
          <a href="/login" className="text-blue-600 hover:underline">Log in</a>
        </p>
      </div>
    </div>
  );
};

export default SignupPage;
