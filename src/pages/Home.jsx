import React, { useState } from 'react';
import { useCart } from '../context/CartContext';
import { PRODUCTS, CATEGORIES } from '../data/products';
import { ArrowRight, Heart, Eye, ShoppingBag } from 'lucide-react';
import Newsletter from '../components/Newsletter';

export default function Home() {
  const {
    navigateTo,
    setQuickViewProduct,
    addToCart,
    wishlist,
    toggleWishlist,
  } = useCart();

  const [activeTab, setActiveTab] = useState('New In');
  const [activeHeroSlide, setActiveHeroSlide] = useState(0);

  const tabs = ['New In', 'Best Sellers', 'Race Day', 'Trail'];

  // Filter products based on selected tab
  const displayedProducts = PRODUCTS.filter((p) => {
    if (activeTab === 'New In') return true;
    return p.tag === activeTab || p.category.includes(activeTab);
  });

  const heroSlides = [
    {
      overline: "AUTUMN / WINTER '26 COLLECTION",
      title: "Chase Every Second.",
      desc: "Race-day gear, trail-tested essentials, and everyday kit — curated by runners, worn on every terrain.",
      image: "/assets/Home/hero_section/image1.png"
    },
    {
      overline: "RACE READY // GLASGOW MARATHON",
      title: "Engineered For Speed.",
      desc: "Carbon-plated road racers and elite hydration vests tested across Scottish highlands and city streets.",
      image: "/assets/Home/hero_section/image1.png"
    },
    {
      overline: "COMMUNITY HUB // EST. 2015",
      title: "Miles Together.",
      desc: "Free weekly run club every Wednesday at 6:30pm. Gait clinic appointments every Saturday.",
      image: "/assets/Home/hero_section/image1.png"
    }
  ];

  return (
    <div className="min-h-screen bg-brand-light text-brand-dark">
      {/* ======================================================== */}
      {/* HERO SECTION                                             */}
      {/* ======================================================== */}
      <section className="relative w-full h-[640px] sm:h-[720px] lg:h-[800px] overflow-hidden bg-brand-dark flex items-center">
        {/* Background image */}
        <div
          className="absolute inset-0 bg-cover bg-center transition-all duration-700"
          style={{
            backgroundImage: `url(${heroSlides[activeHeroSlide].image})`,
          }}
        >
          {/* Subtle overlay to enhance text readability while preserving atmosphere */}
          <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-black/35 to-black/10" />
        </div>

        {/* Content Container */}
        <div className="relative max-w-7xl mx-auto px-4 sm:px-8 w-full z-10 py-16">
          <div className="max-w-2xl text-white space-y-6 animate-in fade-in slide-in-from-bottom-6 duration-700">
            {/* Tag / Overline */}
            <span className="inline-block text-xs sm:text-[13px] font-extrabold tracking-widest text-brand-lime uppercase">
              {heroSlides[activeHeroSlide].overline}
            </span>

            {/* Headline */}
            <h1 className="text-5xl sm:text-7xl lg:text-8xl font-black tracking-tighter leading-[0.95] uppercase">
              {heroSlides[activeHeroSlide].title.split(' ')[0]} <br />
              {heroSlides[activeHeroSlide].title.split(' ').slice(1).join(' ')}
            </h1>

            {/* Subtitle */}
            <p className="text-sm sm:text-base lg:text-lg text-neutral-200 max-w-xl font-normal leading-relaxed">
              {heroSlides[activeHeroSlide].desc}
            </p>

            {/* CTA Buttons */}
            <div className="pt-2 flex flex-wrap items-center gap-4">
              <button
                onClick={() => {
                  const section = document.getElementById('new-arrivals');
                  section?.scrollIntoView({ behavior: 'smooth' });
                }}
                className="px-7 py-4 bg-brand-lime hover:bg-brand-limeHover text-brand-dark font-extrabold text-xs uppercase tracking-widest transition-all transform active:scale-95 flex items-center gap-2 shadow-lg"
              >
                <span>SHOP NEW ARRIVALS</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <button
                onClick={() => navigateTo('about')}
                className="px-7 py-4 bg-white/10 hover:bg-white/20 backdrop-blur-sm text-white border border-white/40 hover:border-white font-extrabold text-xs uppercase tracking-widest transition-all"
              >
                READ OUR STORY
              </button>
            </div>
          </div>
        </div>

        {/* Hero Slider Pagination Controls */}
        <div className="absolute bottom-8 right-6 sm:right-12 z-20 flex items-center gap-2">
          {heroSlides.map((_, idx) => (
            <button
              key={idx}
              onClick={() => setActiveHeroSlide(idx)}
              className={`h-1.5 transition-all duration-300 rounded-full ${
                activeHeroSlide === idx
                  ? 'w-10 bg-brand-lime'
                  : 'w-4 bg-white/40 hover:bg-white/70'
              }`}
              aria-label={`Go to slide ${idx + 1}`}
            />
          ))}
        </div>
      </section>

      {/* ======================================================== */}
      {/* 01 · SHOP BY CATEGORY                                     */}
      {/* ======================================================== */}
      <section className="py-20 sm:py-24 px-4 sm:px-8 max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-4">
          <div>
            <span className="text-xs font-extrabold tracking-widest text-brand-orange uppercase block mb-1">
              01 · SHOP BY CATEGORY
            </span>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight text-brand-dark">
              Every discipline. Every distance.
            </h2>
          </div>

          <button
            onClick={() => navigateTo('shop', 'All')}
            className="text-xs font-bold uppercase tracking-widest text-brand-dark hover:text-brand-orange flex items-center gap-1.5 transition-colors self-start md:self-auto group"
          >
            <span>VIEW ALL COLLECTIONS</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </button>
        </div>

        {/* 4 Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {CATEGORIES.map((cat) => (
            <div
              key={cat.id}
              onClick={() => navigateTo('shop', cat.title)}
              className="group relative h-[420px] sm:h-[450px] overflow-hidden rounded-xs cursor-pointer shadow-md bg-neutral-900"
            >
              {/* Image */}
              <img
                src={cat.image}
                alt={cat.title}
                loading="lazy"
                className="w-full h-full object-cover card-zoom-img opacity-90 group-hover:opacity-100"
              />

              {/* Gradient Scrim */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-transparent" />

              {/* Overlay Content */}
              <div className="absolute bottom-0 inset-x-0 p-6 text-white space-y-1">
                <h3 className="text-2xl font-black tracking-tight text-white group-hover:text-brand-lime transition-colors">
                  {cat.title}
                </h3>
                <p className="text-xs text-neutral-300">
                  {cat.subtitle}
                </p>
                <div className="pt-2 flex items-center gap-1.5 text-xs font-extrabold uppercase tracking-widest text-brand-lime group-hover:translate-x-1 transition-transform">
                  <span>SHOP</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ======================================================== */}
      {/* 02 · JUST LANDED (New Arrivals)                           */}
      {/* ======================================================== */}
      <section id="new-arrivals" className="py-16 sm:py-20 px-4 sm:px-8 max-w-7xl mx-auto border-t border-brand-border">
        {/* Section Header & Filter Tabs */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-6">
          <div>
            <span className="text-xs font-extrabold tracking-widest text-brand-orange uppercase block mb-1">
              02 · JUST LANDED
            </span>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight text-brand-dark">
              New arrivals for the run.
            </h2>
          </div>

          {/* Filter Pills */}
          <div className="flex flex-wrap gap-2">
            {tabs.map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-4 py-2 text-xs font-extrabold uppercase tracking-wider rounded-full transition-all ${
                  activeTab === tab
                    ? 'bg-brand-dark text-white shadow-sm'
                    : 'bg-white/80 hover:bg-white text-brand-dark border border-brand-border'
                }`}
              >
                {tab}
              </button>
            ))}
          </div>
        </div>

        {/* 4 Product Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {displayedProducts.map((product) => {
            const isFavorited = wishlist.includes(product.id);

            return (
              <div
                key={product.id}
                className="group bg-brand-lightCard border border-brand-border rounded-xs overflow-hidden flex flex-col justify-between hover:shadow-xl transition-all duration-300"
              >
                {/* Image & Badges */}
                <div className="relative aspect-square bg-[#ece5d8] p-6 flex items-center justify-center overflow-hidden">
                  {/* Badge */}
                  <span
                    className={`absolute top-4 left-4 text-[10px] font-black tracking-widest px-2.5 py-1 uppercase rounded-xs z-10 ${
                      product.badge === 'SALE'
                        ? 'bg-brand-orange text-white'
                        : 'bg-brand-dark text-white'
                    }`}
                  >
                    {product.badge}
                  </span>

                  {/* Wishlist Heart */}
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      toggleWishlist(product.id, product.name);
                    }}
                    className="absolute top-4 right-4 z-10 p-2 text-neutral-500 hover:text-red-500 transition-colors"
                    aria-label="Save to wishlist"
                  >
                    <Heart
                      className={`w-5 h-5 ${
                        isFavorited ? 'fill-red-500 text-red-500' : 'stroke-[1.75]'
                      }`}
                    />
                  </button>

                  {/* Product Image */}
                  <img
                    src={product.image}
                    alt={product.name}
                    loading="lazy"
                    className="w-full h-full object-contain card-zoom-img"
                  />

                  {/* Quick Action Overlay on Hover */}
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
                      title="Quick Add UK 8.5"
                      aria-label="Add to bag"
                    >
                      <ShoppingBag className="w-4 h-4" />
                    </button>
                  </div>
                </div>

                {/* Info */}
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
      </section>

      {/* ======================================================== */}
      {/* OUR STORY BANNER (50/50 SPLIT)                            */}
      {/* ======================================================== */}
      <section className="w-full bg-brand-dark text-white grid grid-cols-1 lg:grid-cols-2">
        {/* Left Image */}
        <div className="relative min-h-[420px] sm:min-h-[520px] lg:min-h-[640px]">
          <img
            src="/assets/Home/story_section/image.png"
            alt="Runner on mountain ridge above the clouds"
            loading="lazy"
            className="w-full h-full object-cover"
          />
        </div>

        {/* Right Editorial Story Box */}
        <div className="p-8 sm:p-14 lg:p-20 flex flex-col justify-center space-y-6">
          <span className="text-xs font-extrabold tracking-widest text-brand-lime uppercase">
            OUR STORY
          </span>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight text-white leading-tight">
            Built by runners. <br />
            Worn on every terrain.
          </h2>

          <p className="text-xs sm:text-sm text-neutral-300 leading-relaxed max-w-xl">
            PACELINE opened in 2015 with one goal — to become an all-inclusive hub for runners. Twenty seasons in, we still hand-pick every shoe, every layer and every accessory in our range. From your first Couch-to-5K to your third marathon, we prepare, empower and equip you with zero compromise on performance or style.
          </p>

          {/* Stats Row */}
          <div className="grid grid-cols-3 gap-6 pt-4 border-t border-neutral-800">
            <div>
              <span className="text-3xl sm:text-4xl font-black text-brand-lime block tracking-tight">
                10+
              </span>
              <span className="text-[11px] font-bold text-neutral-400 uppercase tracking-wider">
                YEARS IN SPORT
              </span>
            </div>
            <div>
              <span className="text-3xl sm:text-4xl font-black text-white block tracking-tight">
                40+
              </span>
              <span className="text-[11px] font-bold text-neutral-400 uppercase tracking-wider">
                BRANDS STOCKED
              </span>
            </div>
            <div>
              <span className="text-3xl sm:text-4xl font-black text-white block tracking-tight">
                1
              </span>
              <span className="text-[11px] font-bold text-neutral-400 uppercase tracking-wider">
                STORE IN GLASGOW
              </span>
            </div>
          </div>

          <div className="pt-4">
            <button
              onClick={() => navigateTo('about')}
              className="px-6 py-3.5 border border-white hover:bg-white hover:text-brand-dark text-white font-extrabold text-xs uppercase tracking-widest transition-colors flex items-center gap-2 group"
            >
              <span>READ THE FULL STORY</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>
          </div>
        </div>
      </section>

      {/* ======================================================== */}
      {/* EXPLORE GENDER / CATEGORIES (50/50 PROMO CARDS)          */}
      {/* ======================================================== */}
      <section className="py-20 px-4 sm:px-8 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Men's Running Card */}
          <div
            onClick={() => navigateTo('shop', 'Men')}
            className="group relative h-[450px] sm:h-[520px] rounded-xs overflow-hidden cursor-pointer shadow-lg bg-neutral-900"
          >
            <img
              src="/assets/Home/explore_section/image_male.png"
              alt="Men's Running Collection"
              loading="lazy"
              className="w-full h-full object-cover card-zoom-img"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/25 to-transparent" />
            <div className="absolute bottom-0 inset-x-0 p-8 text-white space-y-1">
              <h3 className="text-3xl sm:text-4xl font-black tracking-tight text-white group-hover:text-brand-lime transition-colors">
                Men&apos;s Running
              </h3>
              <p className="text-xs sm:text-sm text-neutral-300">
                Pyjamas &amp; running kit from race-day heroes.
              </p>
              <div className="pt-2 flex items-center gap-2 text-xs font-extrabold uppercase tracking-widest text-brand-orange group-hover:translate-x-1 transition-transform">
                <span>SHOP NOW</span>
                <ArrowRight className="w-4 h-4" />
              </div>
            </div>
          </div>

          {/* Women's Running Card */}
          <div
            onClick={() => navigateTo('shop', 'Women')}
            className="group relative h-[450px] sm:h-[520px] rounded-xs overflow-hidden cursor-pointer shadow-lg bg-neutral-900"
          >
            <img
              src="/assets/Home/explore_section/image_female.png"
              alt="Women's Running Collection"
              loading="lazy"
              className="w-full h-full object-cover card-zoom-img"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/25 to-transparent" />
            <div className="absolute bottom-0 inset-x-0 p-8 text-white space-y-1">
              <h3 className="text-3xl sm:text-4xl font-black tracking-tight text-white group-hover:text-brand-lime transition-colors">
                Women&apos;s Running
              </h3>
              <p className="text-xs sm:text-sm text-neutral-300">
                20% of profits from kits go to Girls Run Glasgow.
              </p>
              <div className="pt-2 flex items-center gap-2 text-xs font-extrabold uppercase tracking-widest text-brand-orange group-hover:translate-x-1 transition-transform">
                <span>SHOP NOW</span>
                <ArrowRight className="w-4 h-4" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Newsletter */}
      <Newsletter />
    </div>
  );
}
