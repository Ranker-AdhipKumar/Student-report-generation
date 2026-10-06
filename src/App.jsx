import React from 'react';
import { CartProvider, useCart } from './context/CartContext';
import Header from './components/Header';
import Footer from './components/Footer';
import Home from './pages/Home';
import About from './pages/About';
import Shop from './pages/Shop';
import CartDrawer from './components/CartDrawer';
import SearchModal from './components/SearchModal';
import QuickViewModal from './components/QuickViewModal';
import GaitModal from './components/GaitModal';
import Toast from './components/Toast';

function MainApp() {
  const { currentPage } = useCart();

  return (
    <div className="flex flex-col min-h-screen bg-brand-light text-brand-dark selection:bg-brand-lime selection:text-brand-dark">
      <Header />
      
      <main className="flex-1">
        {currentPage === 'home' && <Home />}
        {currentPage === 'about' && <About />}
        {currentPage === 'shop' && <Shop />}
      </main>

      <Footer />

      {/* Global Interactive Overlays */}
      <CartDrawer />
      <SearchModal />
      <QuickViewModal />
      <GaitModal />
      <Toast />
    </div>
  );
}

export default function App() {
  return (
    <CartProvider>
      <MainApp />
    </CartProvider>
  );
}
