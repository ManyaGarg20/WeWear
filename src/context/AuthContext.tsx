//React Context is a feature in React that allows you to share state or data globally across your component tree — without 
// having to pass props down manually at every level (called “prop drilling”).

// this page is used for global authentication for webstie......
// Feature	What it does
// AuthContext	Provides global state for user authentication
// AuthProvider	Manages the logic for login/signup/logout, and wraps the app
// useAuth hook	Makes it easy to use auth state/functions in components
// localStorage	Stores user info to persist login across refreshes
// Mocked login/signup	Simulates authentication without a real backend for now
import React, { createContext, useContext, useState, useEffect } from 'react';
import { User } from '../types/User';

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<void>;
  signup: (name: string, email: string, password: string, isSeller: boolean) => Promise<void>;
  logout: () => void;
  loading: boolean;
  error: string | null;
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  isAuthenticated: false,
  login: async () => {},
  signup: async () => {},
  logout: () => {},
  loading: false,
  error: null,
});

export const useAuth = () => useContext(AuthContext);


export const AuthProvider: React.FC<{children: React.ReactNode}> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  
  // Load user from localStorage on init
  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
      setIsAuthenticated(true);
    }
  }, []);
  
  
  const login = async (email: string, password: string) => {
    setLoading(true);
    setError(null);
    
    try {
      // Mock API call - would be replaced with actual API
      if (email === 'user@example.com' && password === 'packman@3') {
        const mockUser: User = {
          id: '1',
          name: 'John Doe',
          email: 'user@example.com',
          location: 'New York, NY',
          profileImage: 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
          rating: 4.8,
          reviewCount: 24,
          isSeller: true,
          createdAt: new Date().toISOString(),
        };
        
        setUser(mockUser);
        setIsAuthenticated(true);
        localStorage.setItem('user', JSON.stringify(mockUser));
      } else {
        throw new Error('Invalid credentials');
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setLoading(false);
    }
  };
  
  const signup = async (name: string, email: string, password: string, isSeller: boolean) => {
    setLoading(true);
    setError(null);
    
    try {
      // Mock API call - would be replaced with actual API
      const mockUser: User = {
        id: '2',
        name:'sammy',
        email:'sammy@1.com',
        location: '',
        rating: 0,
        reviewCount: 0,
        isSeller: true,
        createdAt: new Date().toISOString(),
      };
      
      setUser(mockUser);
      setIsAuthenticated(true);
      localStorage.setItem('user', JSON.stringify(mockUser));
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setLoading(false);
    }
  };
  
  const logout = () => {
    setUser(null);
    setIsAuthenticated(false);
    localStorage.removeItem('user');
  };
  
  const value = {
    user,
    isAuthenticated,
    login,
    signup,
    logout,
    loading,
    error,
  };
  
  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};
