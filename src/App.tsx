
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';
import HomePage from './pages/HomePage';
import BrowsePage from './pages/BrowsePage';
import ProductPage from './pages/ProductPage';
import SellerProfilePage from './pages/SellerProfilePage';
import CartPage from './pages/CartPage';
import LoginPage from './pages/LoginPage';
import SignupPage from './pages/SignupPage';
import UserDashboardPage from './pages/UserDashboardPage';
import { CartProvider } from './context/CartContext';
import { AuthProvider } from './context/AuthContext';
import { FavoritesProvider } from './context/FavoritesContext';
import './App.css';

function App() {
  return (
    <AuthProvider>
      <CartProvider>
        <FavoritesProvider>

        <Router>
          <div className="flex flex-col min-h-screen">
            <Navbar />
            <main className="flex-grow">
              <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/browse" element={<BrowsePage />} />
                <Route path="/product/:id" element={<ProductPage />} />
                <Route path="/seller/:id" element={<SellerProfilePage />} />
                <Route path="/cart" element={<CartPage />} />
                <Route path="/login" element={<LoginPage />} />
                <Route path="/signup" element={<SignupPage />} />
                <Route path="/dashboard" element={<UserDashboardPage />} />
              </Routes>
            </main>
            <Footer />
          </div>
        </Router>
                </FavoritesProvider>
      </CartProvider>
    </AuthProvider>
  );
}

export default App;