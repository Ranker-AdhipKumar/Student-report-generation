import React, { useState, useMemo } from 'react';
import { useCart } from '../context/CartContext';
import { PRODUCTS, CATEGORIES } from '../data/products';
import { Filter, Heart, Eye, ShoppingBag, SlidersHorizontal, ArrowUpDown } from 'lucide-react';
import Newsletter from '../components/Newsletter';

export default function Shop() {
  const {
    activeCategoryFilter,
    setActiveCategoryFilter,
    setQuickViewProduct,
    addToCart,
    wishlist,
    toggleWishlist,
    navigateTo,
  } = useCart();

  const [selectedBrand, setSelectedBrand] = useState('All');
  const [sortBy, setSortBy] = useState('featured');
  const [priceMax, setPriceMax] = useState(300);

  const filterCategories = ['All', 'Road Running', 'Trail Running', 'Apparel', 'Accessories', 'Sale'];
  const brands = ['All', 'ON', 'Nike', 'Hoka', 'Asics'];

  const filteredProducts = useMemo(() => {
    return PRODUCTS.filter((item) => {
      // Category filter
      if (activeCategoryFilter !== 'All') {
        if (activeCategoryFilter === 'Sale' && item.badge !== 'SALE') return false;
        if (
          activeCategoryFilter !== 'Sale' &&
          activeCategoryFilter !== 'Men' &&
          activeCategoryFilter !== 'Women' &&
          activeCategoryFilter !== 'Footwear' &&
          item.category !== activeCategoryFilter
        ) {
          return false;
        }
      }

      // Brand filter
      if (selectedBrand !== 'All' && item.brand !== selectedBrand) {
        return false;
      }

      // Price filter
      if (item.price > priceMax) {
        return false;
      }

      return true;
    }).sort((a, b) => {
      if (sortBy === 'price-low') return a.price - b.price;
      if (sortBy === 'price-high') return b.price - a.price;
      if (sortBy === 'brand') return a.brand.localeCompare(b.brand);
      return 0; // featured
    });
  }, [activeCategoryFilter, selectedBrand, priceMax, sortBy]);

  return (
    <div className="min-h-screen bg-brand-light text-brand-dark">
      {/* Top Banner */}
      <div className="bg-brand-dark text-white py-12 px-4 sm:px-8 border-b border-neutral-800">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-brand-lime mb-2">
              <button onClick={() => navigateTo('home')} className="hover:underline">
                HOME
              </button>
              <span>/</span>
              <span>CATALOG</span>
            </div>
            <h1 className="text-4xl sm:text-5xl font-black uppercase tracking-tight">
              {activeCategoryFilter === 'All' ? 'All Running Gear' : activeCategoryFilter}
            </h1>
          </div>
          <p className="text-xs sm:text-sm text-neutral-400 max-w-md">
            Hand-tested in Scotland. Road racing shoes, ultra-distance trail kit, and everyday performance layers.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-8 py-10">
        {/* Controls Bar */}
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 pb-6 border-b border-brand-border">
          {/* Categories Pill Bar */}
          <div className="flex flex-wrap items-center gap-1.5">
            {filterCategories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategoryFilter(cat)}
                className={`px-3.5 py-1.5 text-xs font-bold uppercase tracking-wider rounded-full transition-all ${
                  activeCategoryFilter === cat
                    ? 'bg-brand-dark text-white shadow-xs'
                    : 'bg-white hover:bg-neutral-100 text-brand-dark border border-brand-border'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Filters / Sort Dropdowns */}
          <div className="flex flex-wrap items-center gap-3 text-xs">
            {/* Brand Filter */}
            <div className="flex items-center gap-1.5 bg-white px-3 py-1.5 border border-brand-border rounded-xs">
              <span className="font-bold text-neutral-400 uppercase text-[10px]">Brand:</span>
              <select
                value={selectedBrand}
                onChange={(e) => setSelectedBrand(e.target.value)}
                className="bg-transparent font-bold focus:outline-none cursor-pointer"
              >
                {brands.map((b) => (
                  <option key={b} value={b}>
                    {b}
                  </option>
                ))}
              </select>
            </div>

            {/* Sort Order */}
            <div className="flex items-center gap-1.5 bg-white px-3 py-1.5 border border-brand-border rounded-xs">
              <ArrowUpDown className="w-3.5 h-3.5 text-neutral-400" />
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="bg-transparent font-bold focus:outline-none cursor-pointer"
              >
                <option value="featured">Featured First</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
                <option value="brand">Brand (A–Z)</option>
              </select>
            </div>

            {/* Reset */}
            {(activeCategoryFilter !== 'All' || selectedBrand !== 'All') && (
              <button
                onClick={() => {
                  setActiveCategoryFilter('All');
                  setSelectedBrand('All');
                }}
                className="text-[11px] font-bold text-brand-orange hover:underline uppercase"
              >
                Reset Filters
              </button>
            )}
          </div>
        </div>

        {/* Product Grid */}
        <div className="pt-8">
          <div className="flex justify-between items-center mb-6 text-xs text-brand-muted">
            <span>
              Showing <strong>{filteredProducts.length}</strong> styles
            </span>
            <span>Free UK delivery on all orders over £75</span>
          </div>

          {filteredProducts.length === 0 ? (
            <div className="py-20 text-center space-y-4">
              <p className="text-base font-bold text-brand-dark">No products found in this category.</p>
              <button
                onClick={() => {
                  setActiveCategoryFilter('All');
                  setSelectedBrand('All');
                }}
                className="px-6 py-3 bg-brand-dark text-brand-lime text-xs font-bold uppercase tracking-widest"
              >
                Show All Gear
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {filteredProducts.map((product) => {
                const isFavorited = wishlist.includes(product.id);

                return (
                  <div
                    key={product.id}
                    className="group bg-brand-lightCard border border-brand-border rounded-xs overflow-hidden flex flex-col justify-between hover:shadow-xl transition-all duration-300"
                  >
                    <div className="relative aspect-square bg-[#ece5d8] p-6 flex items-center justify-center overflow-hidden">
                      <span
                        className={`absolute top-4 left-4 text-[10px] font-black tracking-widest px-2.5 py-1 uppercase rounded-xs z-10 ${
                          product.badge === 'SALE'
                            ? 'bg-brand-orange text-white'
                            : 'bg-brand-dark text-white'
                        }`}
                      >
                        {product.badge}
                      </span>

                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          toggleWishlist(product.id, product.name);
                        }}
                        className="absolute top-4 right-4 z-10 p-2 text-neutral-500 hover:text-red-500 transition-colors"
                        aria-label="Wishlist"
                      >
                        <Heart
                          className={`w-5 h-5 ${
                            isFavorited ? 'fill-red-500 text-red-500' : 'stroke-[1.75]'
                          }`}
                        />
                      </button>

                      <img
                        src={product.image}
                        alt={product.name}
                        loading="lazy"
                        className="w-full h-full object-contain card-zoom-img"
                      />

                      <div className="absolute inset-x-4 bottom-4 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                        <button
                          onClick={() => setQuickViewProduct(product)}
                          className="flex-1 py-2.5 bg-white/90 hover:bg-white text-brand-dark text-[11px] font-bold uppercase tracking-wider shadow-md backdrop-blur-sm flex items-center justify-center gap-1.5 transition-colors"
                        >
                          <Eye className="w-3.5 h-3.5" />
                          <span>Quick View</span>
                        </button>
                        <button
                          onClick={() => addToCart(product, 'UK 8.5')}
                          className="p-2.5 bg-brand-dark hover:bg-neutral-800 text-brand-lime shadow-md transition-colors"
                          title="Add UK 8.5 to Bag"
                        >
                          <ShoppingBag className="w-4 h-4" />
                        </button>
                      </div>
                    </div>

                    <div className="p-4 bg-white flex-1 flex flex-col justify-between">
                      <div>
                        <span className="text-[11px] font-extrabold uppercase tracking-widest text-neutral-400 block mb-1">
                          {product.brand}
                        </span>
                        <h3
                          onClick={() => setQuickViewProduct(product)}
                          className="text-sm font-bold text-brand-dark hover:text-brand-orange cursor-pointer transition-colors leading-tight line-clamp-1"
                        >
                          {product.name}
                        </h3>
                      </div>

                      <div className="mt-3 flex items-center justify-between">
                        <span className="text-base font-extrabold text-brand-dark">
                          £{product.price}
                        </span>
                        <button
                          onClick={() => setQuickViewProduct(product)}
                          className="text-[11px] font-semibold text-neutral-500 hover:text-brand-dark underline"
                        >
                          Details & Sizes
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>

      <Newsletter />
    </div>
  );
}
