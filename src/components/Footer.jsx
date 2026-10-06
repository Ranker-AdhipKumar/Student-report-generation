import React from 'react';
import { useCart } from '../context/CartContext';

export default function Footer() {
  const { navigateTo, setIsGaitModalOpen, showToast } = useCart();

  const handleLinkClick = (text) => {
    if (text === 'About Us' || text === 'Store · Glasgow') {
      navigateTo('about');
    } else if (text === 'Gait Analysis') {
      setIsGaitModalOpen(true);
    } else if (['Men\'s', 'Women\'s', 'Footwear', 'Apparel', 'Accessories', 'Sale'].includes(text)) {
      const clean = text.replace('\'s', '');
      navigateTo('shop', clean);
    } else {
      showToast(`${text} — info requested`);
    }
  };

  return (
    <footer className="bg-[#121110] text-neutral-400 text-xs border-t border-neutral-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-8 py-16">
        <div className="grid grid-cols-2 md:grid-cols-5 gap-8 lg:gap-12">
          {/* Brand Info */}
          <div className="col-span-2 space-y-4">
            <button
              onClick={() => navigateTo('home')}
              className="text-2xl font-black tracking-tighter text-white uppercase text-left block"
            >
              PACELINE
            </button>
            <p className="text-neutral-400 text-xs sm:text-[13px] leading-relaxed max-w-sm">
              Race-day gear, trail-tested essentials, and everyday running kit — curated in Glasgow since 2015.
            </p>
            <div className="pt-2 text-[11px] text-neutral-500">
              <p>142 Great Western Road, Glasgow G4 9NT</p>
              <p className="mt-0.5">Wednesday Run Club: 6:30pm · Free Saturday Clinic</p>
            </div>
          </div>

          {/* SHOP Column */}
          <div>
            <h4 className="text-white font-extrabold uppercase tracking-widest text-[11px] mb-4">
              SHOP
            </h4>
            <ul className="space-y-2.5">
              {['Men\'s', 'Women\'s', 'Footwear', 'Apparel', 'Accessories', 'Sale'].map((item) => (
                <li key={item}>
                  <button
                    onClick={() => handleLinkClick(item)}
                    className="hover:text-white transition-colors text-left"
                  >
                    {item}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* HELP Column */}
          <div>
            <h4 className="text-white font-extrabold uppercase tracking-widest text-[11px] mb-4">
              HELP
            </h4>
            <ul className="space-y-2.5">
              {['Contact', 'Shipping', 'Returns', 'Size Guides', 'Gait Analysis', 'FAQs'].map((item) => (
                <li key={item}>
                  <button
                    onClick={() => handleLinkClick(item)}
                    className="hover:text-white transition-colors text-left"
                  >
                    {item}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* COMPANY & FOLLOW Column */}
          <div className="grid grid-cols-1 sm:grid-cols-2 col-span-2 md:col-span-1 gap-6">
            <div>
              <h4 className="text-white font-extrabold uppercase tracking-widest text-[11px] mb-4">
                COMPANY
              </h4>
              <ul className="space-y-2.5">
                {['About Us', 'Store · Glasgow', 'Sustainability', 'Careers', 'Wholesale', 'Press'].map((item) => (
                  <li key={item}>
                    <button
                      onClick={() => handleLinkClick(item)}
                      className="hover:text-white transition-colors text-left"
                    >
                      {item}
                    </button>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h4 className="text-white font-extrabold uppercase tracking-widest text-[11px] mb-4">
                FOLLOW
              </h4>
              <ul className="space-y-2.5">
                {['Instagram', 'Strava', 'TikTok', 'YouTube', 'Newsletter', 'Blog'].map((item) => (
                  <li key={item}>
                    <button
                      onClick={() => handleLinkClick(item)}
                      className="hover:text-white transition-colors text-left"
                    >
                      {item}
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-16 pt-8 border-t border-neutral-800/80 flex flex-col sm:flex-row justify-between items-center gap-4 text-[11px] text-neutral-500">
          <div>
            © 2026 Paceline Running Co. — All rights reserved.
          </div>
          <div className="flex flex-wrap gap-5 text-neutral-400">
            {['Privacy', 'Terms', 'Cookies', 'Accessibility'].map((link) => (
              <button
                key={link}
                onClick={() => showToast(`${link} policy view`)}
                className="hover:text-white transition-colors"
              >
                {link}
              </button>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
