import React, { useState } from 'react';
import { useCart } from '../context/CartContext';
import { X, Heart, ShoppingBag, ShieldCheck, Truck, RotateCcw } from 'lucide-react';

export default function QuickViewModal() {
  const { quickViewProduct, setQuickViewProduct, addToCart, wishlist, toggleWishlist } = useCart();
  const [selectedSize, setSelectedSize] = useState('UK 8.5');

  if (!quickViewProduct) return null;

  const isFavorited = wishlist.includes(quickViewProduct.id);

  const handleAdd = () => {
    addToCart(quickViewProduct, selectedSize);
    setQuickViewProduct(null);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto p-4 sm:p-6 md:p-12 flex justify-center items-center" role="dialog" aria-modal="true">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/70 backdrop-blur-sm transition-opacity"
        onClick={() => setQuickViewProduct(null)}
      />

      <div className="relative bg-white text-brand-dark w-full max-w-3xl shadow-2xl rounded-sm border border-brand-border overflow-hidden z-10 animate-in fade-in zoom-in-95 duration-200">
        <button
          onClick={() => setQuickViewProduct(null)}
          className="absolute top-4 right-4 z-20 p-2 rounded-full bg-white/80 hover:bg-neutral-100 border border-neutral-200 transition-colors"
          aria-label="Close dialog"
        >
          <X className="w-5 h-5 text-brand-dark" />
        </button>

        <div className="grid grid-cols-1 md:grid-cols-2">
          {/* Image Column */}
          <div className="bg-brand-light p-8 flex items-center justify-center relative border-b md:border-b-0 md:border-r border-brand-border">
            <span
              className={`absolute top-4 left-4 text-[10px] font-extrabold tracking-widest px-2.5 py-1 uppercase rounded-xs ${
                quickViewProduct.badge === 'SALE'
                  ? 'bg-brand-orange text-white'
                  : 'bg-brand-dark text-white'
              }`}
            >
              {quickViewProduct.badge}
            </span>
            <img
              src={quickViewProduct.image}
              alt={quickViewProduct.name}
              className="max-h-72 w-auto object-contain hover:scale-105 transition-transform duration-500"
            />
          </div>

          {/* Details Column */}
          <div className="p-6 sm:p-8 flex flex-col justify-between">
            <div>
              <div className="flex justify-between items-start">
                <div>
                  <span className="text-xs font-bold uppercase tracking-widest text-brand-muted">
                    {quickViewProduct.brand}
                  </span>
                  <h3 className="text-xl font-extrabold text-brand-dark tracking-tight mt-0.5">
                    {quickViewProduct.name}
                  </h3>
                </div>
                <button
                  onClick={() => toggleWishlist(quickViewProduct.id, quickViewProduct.name)}
                  className="p-2 text-neutral-400 hover:text-red-500 transition-colors"
                  aria-label="Wishlist"
                >
                  <Heart
                    className={`w-5 h-5 ${isFavorited ? 'fill-red-500 text-red-500' : ''}`}
                  />
                </button>
              </div>

              <div className="mt-3 flex items-baseline gap-3">
                <span className="text-2xl font-black text-brand-dark">
                  £{quickViewProduct.price}
                </span>
                <span className="text-xs text-brand-muted font-medium">Includes VAT</span>
              </div>

              <p className="mt-3 text-xs leading-relaxed text-brand-muted">
                {quickViewProduct.description}
              </p>

              {/* Technical Specifications */}
              {quickViewProduct.specs && (
                <div className="mt-4 p-3 bg-brand-light/70 rounded-xs border border-brand-border text-xs space-y-1">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-neutral-500 block">
                    Runner Specifications
                  </span>
                  <div className="grid grid-cols-2 gap-x-4 gap-y-1 text-[11px] pt-1">
                    <div>
                      <span className="text-brand-muted">Weight:</span>{' '}
                      <strong className="text-brand-dark">{quickViewProduct.specs.weight}</strong>
                    </div>
                    <div>
                      <span className="text-brand-muted">Drop:</span>{' '}
                      <strong className="text-brand-dark">{quickViewProduct.specs.drop}</strong>
                    </div>
                    <div>
                      <span className="text-brand-muted">Surface:</span>{' '}
                      <strong className="text-brand-dark">{quickViewProduct.specs.surface}</strong>
                    </div>
                    <div>
                      <span className="text-brand-muted">Cushion:</span>{' '}
                      <strong className="text-brand-dark">{quickViewProduct.specs.cushion}</strong>
                    </div>
                  </div>
                </div>
              )}

              {/* Size Selector */}
              <div className="mt-4">
                <div className="flex justify-between items-center text-xs mb-2">
                  <span className="font-bold uppercase tracking-wider text-brand-dark">
                    Select Size
                  </span>
                  <span className="text-[11px] text-brand-muted underline cursor-pointer">
                    Size Guide
                  </span>
                </div>
                <div className="grid grid-cols-4 gap-1.5">
                  {quickViewProduct.sizes.map((size) => (
                    <button
                      key={size}
                      onClick={() => setSelectedSize(size)}
                      className={`py-2 text-xs font-bold border rounded-xs transition-colors ${
                        selectedSize === size
                          ? 'bg-brand-dark text-white border-brand-dark'
                          : 'bg-white text-brand-dark border-neutral-300 hover:border-brand-dark'
                      }`}
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Actions */}
            <div className="mt-6 pt-4 border-t border-neutral-200 space-y-3">
              <button
                onClick={handleAdd}
                className="w-full py-3.5 bg-brand-lime text-brand-dark font-bold text-xs uppercase tracking-widest flex items-center justify-center gap-2 hover:bg-brand-limeHover transition-all shadow-md active:scale-[0.99]"
              >
                <ShoppingBag className="w-4 h-4" />
                <span>Add to Bag ({selectedSize})</span>
              </button>

              <div className="grid grid-cols-3 gap-2 text-[10px] text-brand-muted pt-1 text-center">
                <div className="flex flex-col items-center gap-1">
                  <Truck className="w-3.5 h-3.5 text-neutral-600" />
                  <span>Free UK delivery</span>
                </div>
                <div className="flex flex-col items-center gap-1">
                  <RotateCcw className="w-3.5 h-3.5 text-neutral-600" />
                  <span>30-day returns</span>
                </div>
                <div className="flex flex-col items-center gap-1">
                  <ShieldCheck className="w-3.5 h-3.5 text-neutral-600" />
                  <span>Glasgow Store</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
