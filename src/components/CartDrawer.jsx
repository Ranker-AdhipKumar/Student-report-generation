import React, { useState, useEffect } from 'react';
import { useCart } from '../context/CartContext';
import { X, Trash2, Plus, Minus, ArrowRight, ShoppingBag, ShieldCheck } from 'lucide-react';

export default function CartDrawer() {
  const {
    cart,
    isCartOpen,
    setIsCartOpen,
    updateQuantity,
    removeFromCart,
    cartSubtotal,
    freeShippingThreshold,
    freeShippingDelta,
  } = useCart();

  const [promoCode, setPromoCode] = useState('');
  const [discountPercent, setDiscountPercent] = useState(0);
  const [promoError, setPromoError] = useState('');
  const [promoSuccess, setPromoSuccess] = useState('');
  const [isCheckingOut, setIsCheckingOut] = useState(false);
  const [checkoutComplete, setCheckoutComplete] = useState(false);

  // Close on Escape key
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && isCartOpen) {
        setIsCartOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isCartOpen, setIsCartOpen]);

  // Lock body scroll when open
  useEffect(() => {
    if (isCartOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isCartOpen]);

  const handleApplyPromo = (e) => {
    e.preventDefault();
    if (promoCode.trim().toUpperCase() === 'WELCOME10' || promoCode.trim().toUpperCase() === 'PACELINE10') {
      setDiscountPercent(0.1);
      setPromoSuccess('10% discount applied!');
      setPromoError('');
    } else {
      setPromoError('Invalid code. Try PACELINE10');
      setPromoSuccess('');
    }
  };

  const discountAmount = cartSubtotal * discountPercent;
  const shippingAmount = cartSubtotal >= freeShippingThreshold || cartSubtotal === 0 ? 0 : 4.95;
  const finalTotal = Math.max(0, cartSubtotal - discountAmount + shippingAmount);
  const freeShippingProgress = Math.min(100, (cartSubtotal / freeShippingThreshold) * 100);

  const handleCheckout = () => {
    setIsCheckingOut(true);
    setTimeout(() => {
      setIsCheckingOut(false);
      setCheckoutComplete(true);
    }, 1200);
  };

  if (!isCartOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-hidden" role="dialog" aria-modal="true" aria-label="Shopping Bag">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/60 backdrop-blur-sm transition-opacity duration-300"
        onClick={() => setIsCartOpen(false)}
      />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <aside className="w-screen max-w-md bg-brand-light text-brand-dark flex flex-col shadow-2xl border-l border-brand-border">
          {/* Header */}
          <div className="flex items-center justify-between px-6 py-5 border-b border-brand-border bg-white">
            <div className="flex items-center gap-2">
              <ShoppingBag className="w-5 h-5 text-brand-dark" />
              <h2 className="text-lg font-bold tracking-tight uppercase">Your Bag ({cart.length})</h2>
            </div>
            <button
              onClick={() => setIsCartOpen(false)}
              className="p-1.5 rounded-full hover:bg-neutral-100 transition-colors"
              aria-label="Close bag"
            >
              <X className="w-5 h-5 text-brand-dark" />
            </button>
          </div>

          {/* Free delivery tracker */}
          <div className="bg-[#e8e2d4] px-6 py-3 border-b border-brand-border">
            <div className="flex justify-between items-center text-xs font-semibold tracking-wider uppercase mb-1.5">
              <span>
                {freeShippingDelta === 0
                  ? '🎉 Qualified for FREE UK Delivery!'
                  : `Add £${freeShippingDelta.toFixed(2)} more for FREE Delivery`}
              </span>
              <span>{Math.round(freeShippingProgress)}%</span>
            </div>
            <div className="w-full h-1.5 bg-neutral-300 rounded-full overflow-hidden">
              <div
                className="h-full bg-brand-lime transition-all duration-500 ease-out"
                style={{ width: `${freeShippingProgress}%` }}
              />
            </div>
          </div>

          {/* Cart Content */}
          <div className="flex-1 overflow-y-auto px-6 py-4">
            {checkoutComplete ? (
              <div className="h-full flex flex-col items-center justify-center text-center p-6 space-y-4">
                <div className="w-16 h-16 rounded-full bg-brand-lime flex items-center justify-center text-brand-dark">
                  <ShieldCheck className="w-9 h-9" />
                </div>
                <h3 className="text-2xl font-extrabold uppercase tracking-tight">Order Confirmed!</h3>
                <p className="text-sm text-brand-muted max-w-xs">
                  Thank you for running with Paceline. A confirmation email with tracking has been sent.
                </p>
                <button
                  onClick={() => {
                    setCheckoutComplete(false);
                    setIsCartOpen(false);
                  }}
                  className="mt-4 px-6 py-3 bg-brand-dark text-white text-xs font-bold uppercase tracking-widest hover:bg-neutral-800 transition-colors"
                >
                  Continue Shopping
                </button>
              </div>
            ) : cart.length === 0 ? (
              <div className="h-full flex flex-col items-center justify-center text-center p-6 space-y-4 text-brand-muted">
                <ShoppingBag className="w-12 h-12 stroke-1 text-neutral-400" />
                <p className="font-medium text-base text-brand-dark">Your bag is empty.</p>
                <p className="text-xs max-w-xs">
                  Gear up with curated race-day essentials and road running staples.
                </p>
                <button
                  onClick={() => setIsCartOpen(false)}
                  className="mt-2 px-6 py-3 bg-brand-dark text-brand-lime text-xs font-bold uppercase tracking-widest hover:bg-neutral-800 transition-colors"
                >
                  Explore Collection
                </button>
              </div>
            ) : (
              <div className="divide-y divide-brand-border">
                {cart.map((item) => (
                  <div key={`${item.id}-${item.selectedSize}`} className="py-4 flex gap-4">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-20 h-20 object-cover bg-white rounded-sm border border-brand-border p-1"
                    />
                    <div className="flex-1 flex flex-col justify-between">
                      <div>
                        <div className="flex justify-between items-start">
                          <div>
                            <span className="text-[10px] font-bold uppercase tracking-widest text-brand-muted">
                              {item.brand}
                            </span>
                            <h4 className="text-sm font-semibold text-brand-dark leading-tight line-clamp-1">
                              {item.name}
                            </h4>
                          </div>
                          <span className="text-sm font-bold text-brand-dark">
                            £{item.price * item.quantity}
                          </span>
                        </div>
                        <span className="text-xs text-brand-muted mt-0.5 inline-block">
                          Size: <strong className="text-brand-dark">{item.selectedSize}</strong>
                        </span>
                      </div>

                      <div className="flex justify-between items-center mt-3">
                        <div className="flex items-center border border-brand-border bg-white rounded-xs">
                          <button
                            onClick={() => updateQuantity(item.id, item.selectedSize, -1)}
                            className="p-1 hover:bg-neutral-100 transition-colors"
                            aria-label="Decrease quantity"
                          >
                            <Minus className="w-3.5 h-3.5 text-brand-dark" />
                          </button>
                          <span className="px-3 text-xs font-bold text-brand-dark">{item.quantity}</span>
                          <button
                            onClick={() => updateQuantity(item.id, item.selectedSize, 1)}
                            className="p-1 hover:bg-neutral-100 transition-colors"
                            aria-label="Increase quantity"
                          >
                            <Plus className="w-3.5 h-3.5 text-brand-dark" />
                          </button>
                        </div>
                        <button
                          onClick={() => removeFromCart(item.id, item.selectedSize)}
                          className="text-neutral-400 hover:text-brand-orange transition-colors p-1"
                          aria-label="Remove item"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Footer & Checkout */}
          {cart.length > 0 && !checkoutComplete && (
            <div className="p-6 border-t border-brand-border bg-white space-y-4">
              {/* Promo code */}
              <form onSubmit={handleApplyPromo} className="flex gap-2">
                <input
                  type="text"
                  placeholder="Promo Code (PACELINE10)"
                  value={promoCode}
                  onChange={(e) => setPromoCode(e.target.value)}
                  className="flex-1 px-3 py-2 text-xs bg-brand-light border border-brand-border rounded-xs focus:outline-none focus:border-brand-dark uppercase"
                />
                <button
                  type="submit"
                  className="px-4 py-2 bg-brand-dark text-white text-xs font-bold uppercase tracking-wider hover:bg-neutral-800 transition-colors"
                >
                  Apply
                </button>
              </form>
              {promoSuccess && <p className="text-[11px] text-green-700 font-medium">{promoSuccess}</p>}
              {promoError && <p className="text-[11px] text-brand-orange font-medium">{promoError}</p>}

              {/* Price breakdown */}
              <div className="space-y-1.5 text-xs text-brand-muted pt-2 border-t border-neutral-100">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span className="font-semibold text-brand-dark">£{cartSubtotal.toFixed(2)}</span>
                </div>
                {discountAmount > 0 && (
                  <div className="flex justify-between text-green-700">
                    <span>Discount (10%)</span>
                    <span>-£{discountAmount.toFixed(2)}</span>
                  </div>
                )}
                <div className="flex justify-between">
                  <span>Shipping</span>
                  <span className="font-semibold text-brand-dark">
                    {shippingAmount === 0 ? 'FREE' : `£${shippingAmount.toFixed(2)}`}
                  </span>
                </div>
                <div className="flex justify-between text-sm font-bold text-brand-dark pt-2 border-t border-brand-border">
                  <span>Total</span>
                  <span>£{finalTotal.toFixed(2)}</span>
                </div>
              </div>

              {/* Checkout Button */}
              <button
                onClick={handleCheckout}
                disabled={isCheckingOut}
                className="w-full py-3.5 bg-brand-lime text-brand-dark font-bold text-xs uppercase tracking-widest flex items-center justify-center gap-2 hover:bg-brand-limeHover transition-all shadow-md active:scale-[0.99] disabled:opacity-50"
              >
                {isCheckingOut ? (
                  <span>Processing Checkout...</span>
                ) : (
                  <>
                    <span>Proceed to Checkout</span>
                    <ArrowRight className="w-4 h-4" />
                  </>
                )}
              </button>

              <div className="flex items-center justify-center gap-2 text-[11px] text-brand-muted">
                <ShieldCheck className="w-3.5 h-3.5 text-brand-muted" />
                <span>30-Day Guaranteed Returns & Free UK Exchanges</span>
              </div>
            </div>
          )}
        </aside>
      </div>
    </div>
  );
}
