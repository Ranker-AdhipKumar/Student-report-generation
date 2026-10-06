import React from 'react';
import { useCart } from '../context/CartContext';
import { TIMELINE, FOUNDERS, VALUES } from '../data/products';
import { ArrowRight, MapPin, Calendar, Clock, Phone, Mail, Navigation } from 'lucide-react';
import Newsletter from '../components/Newsletter';

export default function About() {
  const { navigateTo, setIsGaitModalOpen } = useCart();

  return (
    <div className="min-h-screen bg-brand-light text-brand-dark">
      {/* ======================================================== */}
      {/* BREADCRUMB & HERO HEADER                                 */}
      {/* ======================================================== */}
      <section className="pt-10 sm:pt-14 pb-12 sm:pb-16 px-4 sm:px-8 max-w-7xl mx-auto text-center">
        {/* Breadcrumb */}
        <div className="flex items-center justify-center gap-2 text-xs font-bold uppercase tracking-widest text-brand-muted mb-6">
          <button
            onClick={() => navigateTo('home')}
            className="hover:text-brand-dark transition-colors"
          >
            HOME
          </button>
          <span>/</span>
          <span className="text-brand-dark">ABOUT</span>
        </div>

        {/* Big Title */}
        <h1 className="text-6xl sm:text-7xl lg:text-8xl font-black tracking-tighter text-brand-dark uppercase">
          Our Story
        </h1>

        {/* Subtitle */}
        <p className="mt-6 max-w-2xl mx-auto text-sm sm:text-base text-neutral-600 leading-relaxed font-normal">
          We opened Paceline in 2015 with one goal — to build the running shop we&apos;d always wanted. A decade in, we&apos;re still hand-picking every shoe, every layer and every accessory for runners just like us.
        </p>

        {/* Panoramic Runners Banner */}
        <div className="mt-12 w-full rounded-xs overflow-hidden shadow-xl border border-brand-border">
          <img
            src="/assets/About/main_story_section/image_joggers.png"
            alt="Marathon runners crossing start line"
            className="w-full h-[320px] sm:h-[450px] lg:h-[540px] object-cover"
          />
        </div>
      </section>

      {/* ======================================================== */}
      {/* 01 · WHY WE EXIST                                        */}
      {/* ======================================================== */}
      <section className="py-16 sm:py-24 px-4 sm:px-8 max-w-7xl mx-auto border-t border-brand-border">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16">
          {/* Left Title Column */}
          <div className="lg:col-span-5 space-y-2">
            <span className="text-xs font-extrabold tracking-widest text-brand-orange uppercase block">
              01 · WHY WE EXIST
            </span>
            <h2 className="text-4xl sm:text-5xl font-black tracking-tight text-brand-dark leading-tight">
              We&apos;re all about the run.
            </h2>
          </div>

          {/* Right Narrative Column */}
          <div className="lg:col-span-7 space-y-6 text-sm sm:text-base text-neutral-700 leading-relaxed">
            <p>
              If your aim is 5K or 26.2 miles, on road or trail, we&apos;re here to prepare, empower and equip you — from your first training run through to race-day. Our tried-and-tested range covers road, trail, track and field, apparel and accessories, with zero compromise on performance or style.
            </p>
            <p>
              Paceline is small and independent, but the community around it is anything but. We run our own weekly club, host free gait analysis, and partner with local charities so 20% of profits from kids&apos; kits go to Girls Run Glasgow.
            </p>
            <p>
              Whatever mile you&apos;re on, we want to be your shop. Come say hello.
            </p>
            <div className="pt-2 font-bold text-brand-dark text-sm sm:text-base">
              — Rae &amp; Jamie, Founders
            </div>
          </div>
        </div>
      </section>

      {/* ======================================================== */}
      {/* 02 · WHAT WE STAND FOR (3 PROMISES CARDS)                 */}
      {/* ======================================================== */}
      <section className="py-16 sm:py-24 px-4 sm:px-8 max-w-7xl mx-auto border-t border-brand-border">
        <div className="mb-12">
          <span className="text-xs font-extrabold tracking-widest text-brand-orange uppercase block mb-1">
            02 · WHAT WE STAND FOR
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight text-brand-dark">
            Three things we won&apos;t compromise on.
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {VALUES.map((val) => (
            <div
              key={val.number}
              className="bg-white p-8 sm:p-10 rounded-xs border border-brand-border shadow-md hover:shadow-xl transition-shadow flex flex-col justify-between"
            >
              <div>
                <span className={`text-5xl sm:text-6xl font-black block tracking-tighter ${val.accent} mb-4`}>
                  {val.number}
                </span>
                <h3 className="text-xl sm:text-2xl font-black text-brand-dark tracking-tight mb-3">
                  {val.title}
                </h3>
                <p className="text-xs sm:text-sm text-neutral-600 leading-relaxed">
                  {val.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ======================================================== */}
      {/* 03 · TEN SEASONS IN (TIMELINE)                            */}
      {/* ======================================================== */}
      <section className="py-16 sm:py-24 px-4 sm:px-8 max-w-7xl mx-auto border-t border-brand-border">
        <div className="mb-14">
          <span className="text-xs font-extrabold tracking-widest text-brand-orange uppercase block mb-1">
            03 · TEN SEASONS IN
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight text-brand-dark">
            How we got here.
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {TIMELINE.map((item) => (
            <div key={item.year} className="border-t-2 border-brand-orange pt-6 space-y-2">
              <span className="text-4xl sm:text-5xl font-black text-brand-orange tracking-tighter block">
                {item.year}
              </span>
              <h3 className="text-lg font-black text-brand-dark tracking-tight">
                {item.title}
              </h3>
              <p className="text-xs sm:text-sm text-neutral-600 leading-relaxed">
                {item.description}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* ======================================================== */}
      {/* 04 · COME SAY HI (VISIT US IN GLASGOW)                    */}
      {/* ======================================================== */}
      <section className="w-full bg-brand-dark text-white grid grid-cols-1 lg:grid-cols-2">
        {/* Left Information Box */}
        <div className="p-8 sm:p-14 lg:p-20 flex flex-col justify-center space-y-6">
          <span className="text-xs font-extrabold tracking-widest text-brand-lime uppercase">
            04 · COME SAY HI
          </span>

          <h2 className="text-4xl sm:text-5xl font-black tracking-tight text-white">
            Visit us in Glasgow.
          </h2>

          <div className="space-y-4 text-xs sm:text-sm text-neutral-300">
            <div className="flex items-start gap-3">
              <MapPin className="w-5 h-5 text-brand-lime flex-shrink-0 mt-0.5" />
              <div>
                <strong className="text-white block text-sm">Store Location</strong>
                <p>142 Great Western Road, Glasgow G4 9NT</p>
                <p className="text-neutral-400 text-xs mt-0.5">2 minutes from St George&apos;s Cross Subway Station</p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <Clock className="w-5 h-5 text-brand-lime flex-shrink-0 mt-0.5" />
              <div>
                <strong className="text-white block text-sm">Opening Hours</strong>
                <p>Monday – Friday: 9:00 AM – 6:00 PM</p>
                <p>Saturday: 9:00 AM – 5:00 PM (Gait Clinic Active)</p>
                <p>Sunday: 10:00 AM – 4:00 PM</p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <Calendar className="w-5 h-5 text-brand-lime flex-shrink-0 mt-0.5" />
              <div>
                <strong className="text-white block text-sm">Weekly Run Club</strong>
                <p>Every Wednesday at 6:30 PM — 5K &amp; 8K loops across Kelvingrove Park. All paces welcomed.</p>
              </div>
            </div>
          </div>

          <div className="pt-4 flex flex-wrap gap-4">
            <button
              onClick={() => setIsGaitModalOpen(true)}
              className="px-6 py-3.5 bg-brand-lime text-brand-dark font-extrabold text-xs uppercase tracking-widest hover:bg-brand-limeHover transition-colors flex items-center gap-2"
            >
              <span>BOOK GAIT CLINIC</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            <a
              href="https://maps.google.com/?q=Great+Western+Road+Glasgow"
              target="_blank"
              rel="noopener noreferrer"
              className="px-6 py-3.5 border border-white text-white hover:bg-white hover:text-brand-dark font-extrabold text-xs uppercase tracking-widest transition-colors flex items-center gap-2"
            >
              <Navigation className="w-4 h-4" />
              <span>GET DIRECTIONS</span>
            </a>
          </div>
        </div>

        {/* Right Map Illustration with Pin */}
        <div className="relative min-h-[420px] sm:min-h-[500px] lg:min-h-[600px] bg-neutral-800 overflow-hidden flex items-center justify-center">
          <img
            src="/assets/About/visit_us_section/map.png"
            alt="Illustrated Map of Paceline Store in Glasgow"
            loading="lazy"
            className="w-full h-full object-cover"
          />

          {/* Interactive Glowing Map Pin */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex flex-col items-center pointer-events-none">
            <div className="relative">
              <span className="w-8 h-8 rounded-full bg-brand-orange/40 absolute -inset-2 animate-ping" />
              <div className="w-5 h-5 rounded-full bg-brand-orange border-2 border-white shadow-xl flex items-center justify-center">
                <div className="w-1.5 h-1.5 rounded-full bg-white" />
              </div>
            </div>
            <div className="mt-2 bg-brand-dark text-white text-[11px] font-black uppercase tracking-wider px-3 py-1 rounded-xs shadow-xl border border-neutral-700 whitespace-nowrap">
              PACELINE GLASGOW
            </div>
          </div>
        </div>
      </section>

      {/* ======================================================== */}
      {/* 05 · MEET THE FOUNDERS                                   */}
      {/* ======================================================== */}
      <section className="py-16 sm:py-24 px-4 sm:px-8 max-w-7xl mx-auto">
        <div className="mb-12">
          <span className="text-xs font-extrabold tracking-widest text-brand-orange uppercase block mb-1">
            05 · MEET THE FOUNDERS
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight text-brand-dark">
            The people behind the shop.
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {FOUNDERS.map((founder) => (
            <div
              key={founder.name}
              className="bg-white rounded-xs border border-brand-border overflow-hidden shadow-md flex flex-col justify-between"
            >
              {/* Founder Image Container */}
              <div className="relative aspect-[4/3] bg-neutral-100 overflow-hidden">
                <img
                  src={founder.image}
                  alt={founder.name}
                  loading="lazy"
                  className="w-full h-full object-cover"
                />
                {/* Badge pill */}
                <span className="absolute bottom-4 left-4 bg-brand-lime text-brand-dark text-[10px] font-extrabold tracking-wider uppercase px-3 py-1.5 rounded-full shadow-md">
                  {founder.badge}
                </span>
              </div>

              {/* Bio Content */}
              <div className="p-6 sm:p-8 space-y-2">
                <h3 className="text-2xl font-black text-brand-dark tracking-tight">
                  {founder.name}
                </h3>
                <span className="text-xs font-extrabold uppercase tracking-widest text-brand-orange block">
                  {founder.role}
                </span>
                <p className="text-xs sm:text-sm text-neutral-600 leading-relaxed pt-2">
                  {founder.bio}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ======================================================== */}
      {/* CALL TO ACTION BANNER (VIBRANT VOLT LIME)                 */}
      {/* ======================================================== */}
      <section className="bg-brand-lime text-brand-dark py-20 px-4 sm:px-8 text-center">
        <div className="max-w-4xl mx-auto space-y-6">
          <span className="text-xs font-extrabold tracking-widest text-brand-dark uppercase">
            READY TO RUN?
          </span>

          <h2 className="text-4xl sm:text-6xl lg:text-7xl font-black tracking-tighter uppercase leading-[0.95]">
            Come find your next <br className="hidden sm:block" /> pair of shoes.
          </h2>

          <div className="pt-4 flex flex-wrap items-center justify-center gap-4">
            <button
              onClick={() => navigateTo('shop', 'Footwear')}
              className="px-8 py-4 bg-brand-dark text-white hover:bg-neutral-800 font-extrabold text-xs uppercase tracking-widest transition-colors shadow-lg"
            >
              SHOP FOOTWEAR
            </button>

            <button
              onClick={() => setIsGaitModalOpen(true)}
              className="px-8 py-4 bg-transparent border-2 border-brand-dark hover:bg-brand-dark hover:text-white text-brand-dark font-extrabold text-xs uppercase tracking-widest transition-colors"
            >
              BOOK GAIT ANALYSIS
            </button>
          </div>
        </div>
      </section>

      {/* Newsletter */}
      <Newsletter />
    </div>
  );
}
