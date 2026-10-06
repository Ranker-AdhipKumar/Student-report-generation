# PACELINE Running Co. — DCS Frontend Task

A modern, high-performance, and responsive e-commerce web application for **PACELINE Running Co.** (Glasgow, UK), developed for the **DCS & GDG Web Cluster Frontend Task (October 2026)**.

The design faithfully implements the provided specifications for both **Home** and **About** pages, enhanced with modern interactions, state management, and accessibility.

---

## 🚀 Live Demo & Repository

- **GitHub Repository:** [https://github.com/Ranker-AdhipKumar/Student-report-generation](https://github.com/Ranker-AdhipKumar/Student-report-generation)
- **Local Dev Server:** `http://localhost:3000`

---

## 🛠️ Tech Stack & Architecture

- **Framework:** React 18 (Vite 6)
- **Styling:** Tailwind CSS v3 with custom brand tokens:
  - Sand / Ecru Light: `#efe9de`
  - Volt / Lime Accent: `#c9f04c`
  - International Orange: `#e85d2f`
  - Deep Obsidian Dark: `#171614`
- **Typography:** Google Fonts — *Plus Jakarta Sans*
- **Icons:** Lucide React
- **State Management:** React Context API (`CartContext`) with `localStorage` persistence
- **Responsive Design:** Mobile-first architecture supporting 320px, 768px, 1024px, 1440px+ screens

---

## ✨ Features & Interactivity

### 1. Home Page (`Home.jsx`)
- **Hero Slider:** Full-bleed runner background with responsive typography, active slide indicator bar, and quick CTA buttons.
- **01 · Shop By Category:** 4-card grid (Road Running, Trail Running, Apparel, Accessories) with hover zoom and card elevation.
- **02 · Just Landed (New Arrivals):** Interactive category filter tabs (*New In*, *Best Sellers*, *Race Day*, *Trail*), product cards with brand badges (`NEW`, `SALE`), wishlist toggle, and quick add buttons.
- **Editorial Story Banner:** 50/50 split layout featuring high-altitude mountain runner imagery, brand story, and milestone metrics (`10+ Years`, `40+ Brands`, `1 Glasgow Store`).
- **Explore Gender Cards:** Split promotional cards for *Men's Running* and *Women's Running* with callout details.
- **Newsletter Subscription:** Email input with validation and instant promo code reward (`PACELINE10`).

### 2. About Page (`About.jsx`)
- **Our Story Hero:** Panoramic crowd banner of runners and founding narrative.
- **01 · Why We Exist:** Two-column split narrative with founder sign-off (*Rae & Jamie*).
- **02 · What We Stand For:** 3 core promise cards with vibrant accent numbers and shadow elevation.
- **03 · Ten Seasons In:** Interactive milestone timeline (2015, 2018, 2022, 2026).
- **04 · Come Say Hi (Glasgow Hub):** 50/50 split with store address, weekly run club schedule, opening hours, directions link, and Glasgow map illustration with an animated pulsing location pin.
- **05 · Meet the Founders:** Profile cards for Rae Sinclair (*12x sub-3 marathoner*) and Jamie Roy (*20+ years coaching*).
- **Volt Lime CTA Banner:** Full-width high-impact banner with *Shop Footwear* and *Book Gait Analysis* actions.

### 3. Interactive Modals & E-Commerce Flow
- **Slide-out Cart Drawer:**
  - Real-time cart quantity controls (+ / - / delete)
  - Free UK Delivery meter (tracks progress toward £75 threshold)
  - Coupon code input (e.g. `PACELINE10` for 10% off)
  - Seamless checkout completion screen
- **Instant Search Modal (`Ctrl+K` / Search Icon):**
  - Instant live filtering across all products, categories, and brands
  - Keyboard navigation and ESC to close
- **Product Quick View Modal:**
  - High-res image display, brand, title, pricing, and technical runner specifications (Weight, Drop, Surface, Cushioning)
  - Interactive UK shoe size selector
  - Add to Bag with size confirmation
- **Free Gait Analysis Booking Modal:**
  - Select Saturday clinic date, time slot, running goal, and shoe model
  - Generates instant appointment confirmation pass
- **Toast Notifications:** Real-time feedback when saving items to wishlist, adding to bag, or applying promo codes.

---

## 💻 How to Run Locally

### Prerequisites
- Node.js (v18.0 or newer)
- npm (v9.0 or newer)

### Installation Steps

1. **Clone the repository:**
   ```bash
   git clone https://github.com/Ranker-AdhipKumar/Student-report-generation.git
   cd Student-report-generation
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Start the development server:**
   ```bash
   npm run dev
   ```
   Open your browser at `http://localhost:3000` (or the port shown in terminal).

4. **Build for production:**
   ```bash
   npm run build
   ```
   The optimized production bundle will be generated in the `dist/` directory.

5. **Preview production build locally:**
   ```bash
   npm run preview
   ```

---

## 🌐 Deploy to Vercel or Netlify

The repository is pre-configured for one-click deployment:

### Deploy to Vercel:
1. Import repository on [Vercel](https://vercel.com)
2. Framework Preset: **Vite**
3. Build Command: `npm run build`
4. Output Directory: `dist`
5. Click **Deploy**

### Deploy to Netlify:
1. Connect repository on [Netlify](https://netlify.com)
2. Build command: `npm run build`
3. Publish directory: `dist`
4. Click **Deploy Site**
