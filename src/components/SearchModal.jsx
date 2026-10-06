import React, { useState, useEffect, useRef } from 'react';
import { useCart } from '../context/CartContext';
import { PRODUCTS, CATEGORIES } from '../data/products';
import { Search, X, ArrowRight, ArrowUpRight } from 'lucide-react';

export default function SearchModal() {
  const { isSearchOpen, setIsSearchOpen, setQuickViewProduct, navigateTo } = useCart();
  const [query, setQuery] = useState('');
  const inputRef = useRef(null);

  useEffect(() => {
    if (isSearchOpen) {
      setTimeout(() => inputRef.current?.focus(), 50);
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isSearchOpen]);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        setIsSearchOpen(true);
      }
      if (e.key === 'Escape' && isSearchOpen) {
        setIsSearchOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isSearchOpen, setIsSearchOpen]);

  if (!isSearchOpen) return null;

  const filteredProducts = query.trim()
    ? PRODUCTS.filter(
        (p) =>
          p.name.toLowerCase().includes(query.toLowerCase()) ||
          p.brand.toLowerCase().includes(query.toLowerCase()) ||
          p.category.toLowerCase().includes(query.toLowerCase()) ||
          p.description.toLowerCase().includes(query.toLowerCase())
      )
    : PRODUCTS;

  const filteredCategories = query.trim()
    ? CATEGORIES.filter((c) => c.title.toLowerCase().includes(query.toLowerCase()))
    : CATEGORIES;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto p-4 sm:p-6 md:p-20 flex justify-center items-start" role="dialog" aria-modal="true">
      <div
        className="fixed inset-0 bg-black/70 backdrop-blur-sm transition-opacity"
        onClick={() => setIsSearchOpen(false)}
      />

      <div className="relative bg-white w-full max-w-2xl shadow-2xl rounded-sm border border-neutral-300 overflow-hidden z-10 animate-in fade-in zoom-in-95 duration-200">
        {/* Search Input Bar */}
        <div className="flex items-center px-4 py-3.5 border-b border-neutral-200">
          <Search className="w-5 h-5 text-neutral-400 mr-3" />
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search footwear, gear, brands (e.g. Vaporfly, Trail, On)..."
            className="w-full text-sm sm:text-base bg-transparent text-brand-dark placeholder-neutral-400 focus:outline-none"
          />
          {query && (
            <button
              onClick={() => setQuery('')}
              className="p-1 text-neutral-400 hover:text-brand-dark mr-1"
            >
              <X className="w-4 h-4" />
            </button>
          )}
          <button
            onClick={() => setIsSearchOpen(false)}
            className="px-2 py-1 text-xs font-semibold uppercase text-neutral-500 hover:text-brand-dark bg-neutral-100 rounded"
          >
            ESC
          </button>
        </div>

        {/* Results Area */}
        <div className="max-h-[60vh] overflow-y-auto p-4 space-y-5">
          {/* Quick Categories */}
          <div>
            <span className="text-[10px] font-bold tracking-widest text-neutral-400 uppercase">
              Collections & Categories
            </span>
            <div className="flex flex-wrap gap-2 mt-2">
              {filteredCategories.map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => {
                    setIsSearchOpen(false);
                    navigateTo('shop', cat.title);
                  }}
                  className="px-3 py-1.5 bg-brand-light hover:bg-neutral-200 text-xs font-semibold text-brand-dark rounded-sm transition-colors flex items-center gap-1.5"
                >
                  <span>{cat.title}</span>
                  <ArrowUpRight className="w-3 h-3 text-neutral-500" />
                </button>
              ))}
            </div>
          </div>

          {/* Products Results */}
          <div>
            <div className="flex justify-between items-center mb-2">
              <span className="text-[10px] font-bold tracking-widest text-neutral-400 uppercase">
                Products ({filteredProducts.length})
              </span>
              {query && (
                <span className="text-xs text-neutral-500">
                  Showing matches for "{query}"
                </span>
              )}
            </div>

            {filteredProducts.length === 0 ? (
              <div className="text-center py-8 text-neutral-400 text-sm">
                No matching running gear found. Try searching for "Nike", "Hoka", or "Trail".
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {filteredProducts.map((product) => (
                  <div
                    key={product.id}
                    onClick={() => {
                      setIsSearchOpen(false);
                      setQuickViewProduct(product);
                    }}
                    className="flex gap-3 p-2.5 rounded-sm hover:bg-neutral-50 border border-transparent hover:border-neutral-200 cursor-pointer transition-all items-center group"
                  >
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-14 h-14 object-cover bg-brand-light rounded-sm p-1"
                    />
                    <div className="flex-1 min-w-0">
                      <span className="text-[10px] font-bold uppercase tracking-wider text-neutral-500">
                        {product.brand}
                      </span>
                      <h4 className="text-xs font-bold text-brand-dark truncate group-hover:text-brand-orange transition-colors">
                        {product.name}
                      </h4>
                      <div className="flex items-center gap-2 mt-0.5">
                        <span className="text-xs font-extrabold text-brand-dark">£{product.price}</span>
                        <span className="text-[10px] px-1.5 py-0.2 bg-neutral-200 text-neutral-700 rounded font-semibold">
                          {product.category}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Footer info */}
        <div className="px-4 py-2.5 bg-neutral-50 border-t border-neutral-200 flex justify-between items-center text-[11px] text-neutral-500">
          <span>Tip: Press <strong>ESC</strong> to close anytime</span>
          <button
            onClick={() => {
              setIsSearchOpen(false);
              navigateTo('shop', 'All');
            }}
            className="text-brand-dark font-semibold hover:underline flex items-center gap-1"
          >
            <span>View Full Catalog</span>
            <ArrowRight className="w-3 h-3" />
          </button>
        </div>
      </div>
    </div>
  );
}
