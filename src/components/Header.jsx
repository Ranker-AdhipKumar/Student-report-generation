import React, { useState } from 'react';
import { useCart } from '../context/CartContext';
import { Search, User, ShoppingBag, Menu, X, MapPin } from 'lucide-react';

export default function Header() {
  const {
    totalCartCount,
    setIsCartOpen,
    setIsSearchOpen,
    currentPage,
    navigateTo,
    setIsGaitModalOpen,
    showToast,
  } = useCart();

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [userDropdownOpen, setUserDropdownOpen] = useState(false);

  const navLinks = [
    { label: 'Men', action: () => navigateTo('shop', 'Men') },
    { label: 'Women', action: () => navigateTo('shop', 'Women') },
    { label: 'Footwear', action: () => navigateTo('shop', 'Footwear') },
    { label: 'Apparel', action: () => navigateTo('shop', 'Apparel') },
    { label: 'Brands', action: () => navigateTo('shop', 'Brands') },
    { label: 'Sale', action: () => navigateTo('shop', 'Sale'), isSale: true },
    { label: 'About', action: () => navigateTo('about'), isAbout: true },
  ];

  return (
    <header className="sticky top-0 z-40 w-full shadow-xs">
      {/* Top Announcement Bar */}
      <div className="bg-brand-dark text-white text-[11px] font-medium tracking-wider uppercase py-2 px-4 sm:px-8 border-b border-neutral-800">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="hidden md:block text-neutral-400">
            FREE UK DELIVERY OVER £75 · 30-DAY RETURNS
          </div>
          <div className="mx-auto md:mx-0 text-center font-bold text-brand-lime flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-brand-lime animate-ping inline-block" />
            AUTUMN &apos;26 — NEW ARRIVALS DROPPING WEEKLY
          </div>
          <div className="hidden lg:flex items-center gap-3 text-neutral-400">
            <button
              onClick={() => setIsGaitModalOpen(true)}
              className="hover:text-white transition-colors flex items-center gap-1 cursor-pointer"
            >
              <MapPin className="w-3 h-3 text-brand-lime" />
              <span>STORE: GLASGOW</span>
            </button>
            <span className="text-neutral-600">·</span>
            <span>EN / £ GBP</span>
          </div>
        </div>
      </div>

      {/* Main Navigation Bar */}
      <nav className="bg-brand-light/95 backdrop-blur-md border-b border-brand-border px-4 sm:px-8 py-3.5 transition-colors">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center gap-8">
            <button
              onClick={() => navigateTo('home')}
              className="text-2xl sm:text-3xl font-black tracking-tighter text-brand-dark uppercase hover:opacity-85 transition-opacity"
              aria-label="Paceline Home"
            >
              PACELINE
            </button>
          </div>

          {/* Desktop Nav Links */}
          <div className="hidden md:flex items-center gap-7 text-[13px] font-bold tracking-tight text-brand-dark">
            {navLinks.map((link) => {
              const isActive =
                (link.isAbout && currentPage === 'about') ||
                (!link.isAbout && currentPage === 'home' && link.label === 'Home');

              return (
                <button
                  key={link.label}
                  onClick={link.action}
                  className={`relative py-1 transition-colors hover:text-brand-orange ${
                    isActive
                      ? 'text-brand-orange after:absolute after:bottom-0 after:left-0 after:right-0 after:h-0.5 after:bg-brand-orange'
                      : link.isSale
                      ? 'text-brand-orange font-extrabold'
                      : 'text-brand-dark'
                  }`}
                >
                  {link.label}
                </button>
              );
            })}
          </div>

          {/* Right Action Icons */}
          <div className="flex items-center gap-3 sm:gap-4">
            {/* Search Button */}
            <button
              onClick={() => setIsSearchOpen(true)}
              className="p-2 text-brand-dark hover:text-brand-orange transition-colors"
              aria-label="Search items"
              title="Quick Search (Ctrl+K)"
            >
              <Search className="w-5 h-5" />
            </button>

            {/* User Profile Button */}
            <div className="relative">
              <button
                onClick={() => setUserDropdownOpen(!userDropdownOpen)}
                className="p-2 text-brand-dark hover:text-brand-orange transition-colors"
                aria-label="My Account"
                title="Account & Perks"
              >
                <User className="w-5 h-5" />
              </button>

              {userDropdownOpen && (
                <div className="absolute right-0 mt-2 w-56 bg-white border border-brand-border shadow-xl rounded-xs p-3 text-xs z-50 animate-in fade-in duration-150">
                  <div className="pb-2 border-b border-neutral-100">
                    <p className="font-bold text-brand-dark uppercase text-[11px]">Paceline Club</p>
                    <p className="text-[11px] text-brand-muted">Member ID: #GLA-2026</p>
                  </div>
                  <div className="py-2 space-y-1 text-neutral-700">
                    <button
                      onClick={() => {
                        setIsGaitModalOpen(true);
                        setUserDropdownOpen(false);
                      }}
                      className="w-full text-left py-1 px-1.5 hover:bg-brand-light rounded-xs font-medium"
                    >
                      Book Free Gait Clinic
                    </button>
                    <button
                      onClick={() => {
                        showToast('Wednesday Run Club meets at 6:30pm at 142 Great Western Road');
                        setUserDropdownOpen(false);
                      }}
                      className="w-full text-left py-1 px-1.5 hover:bg-brand-light rounded-xs font-medium"
                    >
                      Wednesday Run Club Info
                    </button>
                    <button
                      onClick={() => {
                        showToast('Free UK shipping automatically unlocked');
                        setUserDropdownOpen(false);
                      }}
                      className="w-full text-left py-1 px-1.5 hover:bg-brand-light rounded-xs font-medium"
                    >
                      My Benefits & Discounts
                    </button>
                  </div>
                </div>
              )}
            </div>

            {/* Shopping Bag Button with Badge */}
            <button
              onClick={() => setIsCartOpen(true)}
              className="relative p-2 text-brand-dark hover:text-brand-orange transition-colors flex items-center"
              aria-label={`Shopping bag with ${totalCartCount} items`}
            >
              <ShoppingBag className="w-5 h-5" />
              {totalCartCount > 0 ? (
                <span className="absolute -top-1 -right-1 bg-brand-orange text-white text-[10px] font-extrabold w-4 h-4 rounded-full flex items-center justify-center animate-pulse-subtle shadow-sm">
                  {totalCartCount}
                </span>
              ) : (
                <span className="absolute top-1 right-1 bg-brand-dark text-brand-lime text-[9px] font-black w-3.5 h-3.5 rounded-full flex items-center justify-center">
                  0
                </span>
              )}
            </button>

            {/* Mobile Hamburger Menu Toggle */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 text-brand-dark"
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation Drawer */}
        {mobileMenuOpen && (
          <div className="md:hidden pt-4 pb-3 border-t border-brand-border mt-3 animate-in slide-in-from-top duration-200">
            <div className="flex flex-col space-y-2">
              {navLinks.map((link) => (
                <button
                  key={link.label}
                  onClick={() => {
                    link.action();
                    setMobileMenuOpen(false);
                  }}
                  className="text-left py-2 px-3 text-sm font-bold uppercase tracking-wide hover:bg-neutral-200/50 rounded-xs flex justify-between items-center"
                >
                  <span className={link.isSale ? 'text-brand-orange' : 'text-brand-dark'}>
                    {link.label}
                  </span>
                  {link.isSale && (
                    <span className="text-[10px] bg-brand-orange text-white px-1.5 py-0.5 rounded-xs font-bold">
                      UP TO 40% OFF
                    </span>
                  )}
                </button>
              ))}
              <div className="pt-3 border-t border-brand-border flex flex-col gap-2">
                <button
                  onClick={() => {
                    setIsGaitModalOpen(true);
                    setMobileMenuOpen(false);
                  }}
                  className="w-full py-2.5 bg-brand-dark text-brand-lime font-bold text-xs uppercase tracking-wider text-center"
                >
                  Book Free Gait Analysis
                </button>
              </div>
            </div>
          </div>
        )}
      </nav>
    </header>
  );
}
