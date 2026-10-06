import React from 'react';
import { useCart } from '../context/CartContext';
import { CheckCircle2 } from 'lucide-react';

export default function Toast() {
  const { toastMessage } = useCart();

  if (!toastMessage) return null;

  return (
    <aside
      aria-label="Notifications"
      aria-live="polite"
      className="fixed bottom-6 right-6 z-50 flex items-center gap-3 bg-brand-dark text-white px-5 py-3.5 shadow-2xl rounded-sm border border-neutral-800 transition-all transform animate-in fade-in slide-in-from-bottom-3 duration-300 max-w-md"
    >
      <CheckCircle2 className="w-5 h-5 text-brand-lime flex-shrink-0" />
      <span className="text-sm font-medium text-neutral-100">{toastMessage}</span>
    </aside>
  );
}
