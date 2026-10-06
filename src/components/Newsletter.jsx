import React, { useState } from 'react';
import { useCart } from '../context/CartContext';
import { Check, Mail } from 'lucide-react';

export default function Newsletter() {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);
  const { showToast } = useCart();

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (!email || !email.includes('@')) return;

    setSubscribed(true);
    showToast('Welcome to the Paceline Club! Use code PACELINE10 for 10% off.');
  };

  return (
    <section className="bg-brand-dark text-white py-14 px-4 sm:px-8 border-t border-neutral-800">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row md:items-center justify-between gap-8">
        {/* Left Copy */}
        <div className="space-y-1.5 max-w-xl">
          <h2 className="text-2xl sm:text-3xl font-black tracking-tight text-white">
            Join the Paceline club.
          </h2>
          <p className="text-xs sm:text-sm text-neutral-400">
            Early access to new drops, race-day tips, and 10% off your first order.
          </p>
        </div>

        {/* Right Form */}
        <div className="w-full md:w-auto md:min-w-[420px]">
          {subscribed ? (
            <div className="bg-neutral-800/80 border border-brand-lime/40 text-brand-lime px-4 py-3 rounded-xs text-xs flex items-center gap-2.5 animate-in fade-in">
              <Check className="w-4 h-4 flex-shrink-0" />
              <span>You&apos;re subscribed! Use coupon <strong>PACELINE10</strong> at checkout for 10% off.</span>
            </div>
          ) : (
            <form onSubmit={handleSubscribe} className="flex flex-col sm:flex-row gap-2">
              <div className="relative flex-1">
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="your@email.com"
                  className="w-full px-4 py-3 bg-neutral-900 text-white placeholder-neutral-500 text-xs sm:text-sm border border-neutral-700 rounded-none focus:outline-none focus:border-brand-lime"
                  aria-label="Email address for newsletter"
                />
              </div>
              <button
                type="submit"
                className="px-7 py-3 bg-brand-lime text-brand-dark font-extrabold text-xs uppercase tracking-widest hover:bg-brand-limeHover transition-colors flex-shrink-0"
              >
                SUBSCRIBE
              </button>
            </form>
          )}
        </div>
      </div>
    </section>
  );
}
