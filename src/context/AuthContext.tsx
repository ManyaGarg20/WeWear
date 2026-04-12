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
import { v4 as uuidv4 } from 'uuid';
import { auth, provider } from "./Firebase";
import { signInWithPopup } from "firebase/auth";

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  googleLogin: () => Promise<void>;
  login: (email: string, password: string) => Promise<void>;
  signup: (name: string, email: string, password: string, isSeller: boolean) => Promise<void>;
  logout: () => void;
  loading: boolean;
  error: string | null;
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  isAuthenticated: false,
  googleLogin:async () => {},
  login: async () => {},
  signup: async () => {},
  logout: () => {},
  loading: false,
  error: null,
});

export const useAuth = () => useContext(AuthContext);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // ✅ Load user from localStorage on init
  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
      setIsAuthenticated(true);
    }
  }, []);

 const googleLogin = async () => {
    try {
      const result = await signInWithPopup(auth, provider);
      const user = result.user;
      setUser({
       id: user.uid,
      name: user.displayName || "",
      email: user.email || "",
      profileImage: user.photoURL || "", 
      rating: 0,
      reviewCount: 0,
      isSeller: false,
      createdAt: new Date().toISOString(),
      location: "",
      bio: "",
      });
      setIsAuthenticated(true);
    } catch (err) {
      setError("Google sign-in failed.");
    }
  };


  // ✅ Login handler
  const login = async (email: string, password: string) => {
    setLoading(true);
    try {
      const storedUsers: User[] = JSON.parse(localStorage.getItem('mockUsers') || '[]');
      const existingUser = storedUsers.find((u) => u.email === email);
      if (!existingUser) {
        setError('User not found');
        return;
      }
      if (existingUser.password && existingUser.password !== password) {
        setError('Invalid password');
        return;
      }
      const safeUser = { ...existingUser } as User;
      delete (safeUser as Partial<User>).password;
      localStorage.setItem('user', JSON.stringify(safeUser));
      setUser(safeUser);
      setIsAuthenticated(true);
      setError(null);
    } catch {
      setError('Login failed');
    } finally {
      setLoading(false);
    }
  };

  // ✅ Signup handler
  const signup = async (
    name: string,
    email: string,
    password: string,
    isSeller: boolean
  ) => {
    setLoading(true);
    try {
      const storedUsers: User[] = JSON.parse(localStorage.getItem('mockUsers') || '[]');
      const existingUser = storedUsers.find((user) => user.email === email);
      if (existingUser) {
        setError('User already exists');
        return;
      }

      const newUser: User = {
        id: uuidv4(),
        name,
        email,
        password,
        rating: 0,
        reviewCount: 0,
        isSeller,
        createdAt: new Date().toISOString(),
        profileImage: '',
        location: '',
        bio: '',
      };

      const updatedUsers = [...storedUsers, newUser];
      localStorage.setItem('mockUsers', JSON.stringify(updatedUsers));
      const safeUser = { ...newUser } as User;
      delete (safeUser as Partial<User>).password;
      localStorage.setItem('user', JSON.stringify(safeUser));
      setUser(safeUser);
      setIsAuthenticated(true);
      setError(null);
    } catch {
      setError('Signup failed');
    } finally {
      setLoading(false);
    }
  };

  // ✅ Logout handler
  const logout = () => {
    setUser(null);
    setIsAuthenticated(false);
    localStorage.removeItem('user');
    localStorage.removeItem('cart');
    localStorage.removeItem('favorites');
    window.dispatchEvent(new CustomEvent('logout'));
  };

  const value: AuthContextType = {
    user,
    isAuthenticated,
    googleLogin,
    login,
    signup,
    logout,
    loading,
    error,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
