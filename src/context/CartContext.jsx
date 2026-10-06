import React, { createContext, useContext, useState, useEffect } from 'react';

const CartContext = createContext();

export function CartProvider({ children }) {
  const [cart, setCart] = useState(() => {
    try {
      const saved = localStorage.getItem('paceline_cart');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const [wishlist, setWishlist] = useState(() => {
    try {
      const saved = localStorage.getItem('paceline_wishlist');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isGaitModalOpen, setIsGaitModalOpen] = useState(false);
  const [quickViewProduct, setQuickViewProduct] = useState(null);
  const [currentPage, setCurrentPage] = useState('home'); // 'home' | 'about' | 'shop'
  const [activeCategoryFilter, setActiveCategoryFilter] = useState('All');
  const [toastMessage, setToastMessage] = useState(null);

  useEffect(() => {
    try {
      localStorage.setItem('paceline_cart', JSON.stringify(cart));
    } catch (e) {
      console.error(e);
    }
  }, [cart]);

  useEffect(() => {
    try {
      localStorage.setItem('paceline_wishlist', JSON.stringify(wishlist));
    } catch (e) {
      console.error(e);
    }
  }, [wishlist]);

  const showToast = (message) => {
    setToastMessage(message);
    setTimeout(() => {
      setToastMessage((prev) => (prev === message ? null : prev));
    }, 3200);
  };

  const addToCart = (product, size = 'UK 8.5', quantity = 1) => {
    setCart((prev) => {
      const existingIndex = prev.findIndex(
        (item) => item.id === product.id && item.selectedSize === size
      );
      if (existingIndex > -1) {
        const next = [...prev];
        next[existingIndex].quantity += quantity;
        return next;
      }
      return [...prev, { ...product, selectedSize: size, quantity }];
    });
    showToast(`Added ${product.name} (${size}) to your bag`);
    setIsCartOpen(true);
  };

  const updateQuantity = (id, size, delta) => {
    setCart((prev) =>
      prev
        .map((item) => {
          if (item.id === id && item.selectedSize === size) {
            const newQty = item.quantity + delta;
            return newQty > 0 ? { ...item, quantity: newQty } : null;
          }
          return item;
        })
        .filter(Boolean)
    );
  };

  const removeFromCart = (id, size) => {
    setCart((prev) => prev.filter((item) => !(item.id === id && item.selectedSize === size)));
    showToast('Item removed from your bag');
  };

  const toggleWishlist = (productId, productName) => {
    setWishlist((prev) => {
      if (prev.includes(productId)) {
        showToast(`Removed from saved items`);
        return prev.filter((id) => id !== productId);
      } else {
        showToast(`Saved to wishlist: ${productName || 'Product'}`);
        return [...prev, productId];
      }
    });
  };

  const totalCartCount = cart.reduce((sum, item) => sum + item.quantity, 0);
  const cartSubtotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const freeShippingThreshold = 75;
  const freeShippingDelta = Math.max(0, freeShippingThreshold - cartSubtotal);

  const navigateTo = (page, filter = 'All') => {
    setCurrentPage(page);
    setActiveCategoryFilter(filter);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
        updateQuantity,
        removeFromCart,
        totalCartCount,
        cartSubtotal,
        freeShippingThreshold,
        freeShippingDelta,
        wishlist,
        toggleWishlist,
        isCartOpen,
        setIsCartOpen,
        isSearchOpen,
        setIsSearchOpen,
        isGaitModalOpen,
        setIsGaitModalOpen,
        quickViewProduct,
        setQuickViewProduct,
        currentPage,
        navigateTo,
        activeCategoryFilter,
        setActiveCategoryFilter,
        toastMessage,
        showToast,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
}
