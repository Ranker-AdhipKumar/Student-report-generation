import React, { useState } from 'react';
import { useCart } from '../context/CartContext';
import { X, Calendar, Clock, MapPin, CheckCircle, Activity } from 'lucide-react';

export default function GaitModal() {
  const { isGaitModalOpen, setIsGaitModalOpen, showToast } = useCart();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    date: '2026-10-10',
    time: '11:00 AM',
    goal: 'Marathon Training',
    currentShoe: '',
  });
  const [isSubmitted, setIsSubmitted] = useState(false);

  if (!isGaitModalOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitted(true);
    showToast('Gait analysis booked with Jamie Roy!');
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto p-4 sm:p-6 md:p-12 flex justify-center items-center" role="dialog" aria-modal="true">
      <div
        className="fixed inset-0 bg-black/70 backdrop-blur-sm transition-opacity"
        onClick={() => setIsGaitModalOpen(false)}
      />

      <div className="relative bg-white text-brand-dark w-full max-w-lg shadow-2xl rounded-sm border border-brand-border overflow-hidden z-10 animate-in fade-in zoom-in-95 duration-200">
        <div className="bg-brand-dark text-white px-6 py-5 flex justify-between items-center">
          <div className="flex items-center gap-2">
            <Activity className="w-5 h-5 text-brand-lime" />
            <div>
              <h3 className="text-base font-bold uppercase tracking-wider">Book Free Gait Analysis</h3>
              <p className="text-[11px] text-neutral-400">Led by Jamie Roy · Saturday Clinic · Glasgow Store</p>
            </div>
          </div>
          <button
            onClick={() => setIsGaitModalOpen(false)}
            className="p-1 rounded-full text-neutral-400 hover:text-white"
            aria-label="Close"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {isSubmitted ? (
          <div className="p-8 text-center space-y-4">
            <div className="w-16 h-16 bg-brand-lime rounded-full flex items-center justify-center mx-auto text-brand-dark">
              <CheckCircle className="w-9 h-9" />
            </div>
            <h4 className="text-2xl font-black uppercase tracking-tight">Booking Confirmed!</h4>
            <div className="bg-brand-light p-4 text-xs text-left space-y-1.5 border border-brand-border">
              <p><strong>Athlete:</strong> {formData.name || 'Runner'}</p>
              <p><strong>Appointment:</strong> Saturday, {formData.date} at {formData.time}</p>
              <p><strong>Location:</strong> 142 Great Western Road, Glasgow G4 9NT</p>
              <p><strong>Preparation:</strong> Bring your current running shoes and shorts/tights.</p>
            </div>
            <p className="text-xs text-brand-muted">
              We've dispatched confirmation & calendar invite to <strong>{formData.email}</strong>.
            </p>
            <button
              onClick={() => {
                setIsSubmitted(false);
                setIsGaitModalOpen(false);
              }}
              className="w-full py-3 bg-brand-dark text-brand-lime font-bold text-xs uppercase tracking-widest hover:bg-neutral-800 transition-colors"
            >
              Done
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="p-6 space-y-4">
            <p className="text-xs text-brand-muted leading-relaxed">
              Step onto our clinic treadmill for high-speed video analysis. Jamie will measure your pronation angle, foot strike, and cadence to prescribe the exact shoe geometry for your bio-mechanics.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-[11px] font-bold uppercase tracking-wider text-brand-dark mb-1">
                  Full Name
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Rae Sinclair"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full px-3 py-2 text-xs bg-brand-light border border-brand-border rounded-xs focus:outline-none focus:border-brand-dark"
                />
              </div>

              <div>
                <label className="block text-[11px] font-bold uppercase tracking-wider text-brand-dark mb-1">
                  Email Address
                </label>
                <input
                  type="email"
                  required
                  placeholder="rae@paceline.co.uk"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full px-3 py-2 text-xs bg-brand-light border border-brand-border rounded-xs focus:outline-none focus:border-brand-dark"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-[11px] font-bold uppercase tracking-wider text-brand-dark mb-1">
                  Saturday Session
                </label>
                <select
                  value={formData.date}
                  onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                  className="w-full px-3 py-2 text-xs bg-brand-light border border-brand-border rounded-xs focus:outline-none focus:border-brand-dark"
                >
                  <option value="2026-10-10">Sat, 10 Oct 2026</option>
                  <option value="2026-10-17">Sat, 17 Oct 2026</option>
                  <option value="2026-10-24">Sat, 24 Oct 2026</option>
                  <option value="2026-10-31">Sat, 31 Oct 2026</option>
                </select>
              </div>

              <div>
                <label className="block text-[11px] font-bold uppercase tracking-wider text-brand-dark mb-1">
                  Time Slot
                </label>
                <select
                  value={formData.time}
                  onChange={(e) => setFormData({ ...formData, time: e.target.value })}
                  className="w-full px-3 py-2 text-xs bg-brand-light border border-brand-border rounded-xs focus:outline-none focus:border-brand-dark"
                >
                  <option value="09:30 AM">09:30 AM</option>
                  <option value="11:00 AM">11:00 AM</option>
                  <option value="01:30 PM">01:30 PM</option>
                  <option value="03:00 PM">03:00 PM</option>
                  <option value="04:30 PM">04:30 PM</option>
                </select>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-[11px] font-bold uppercase tracking-wider text-brand-dark mb-1">
                  Primary Goal
                </label>
                <select
                  value={formData.goal}
                  onChange={(e) => setFormData({ ...formData, goal: e.target.value })}
                  className="w-full px-3 py-2 text-xs bg-brand-light border border-brand-border rounded-xs focus:outline-none focus:border-brand-dark"
                >
                  <option value="Couch-to-5K">Couch-to-5K</option>
                  <option value="10K / Half Marathon">10K / Half Marathon</option>
                  <option value="Marathon Training">Marathon Training</option>
                  <option value="Trail & Ultra">Trail & Ultra</option>
                  <option value="Injury Prevention">Injury Prevention</option>
                </select>
              </div>

              <div>
                <label className="block text-[11px] font-bold uppercase tracking-wider text-brand-dark mb-1">
                  Current Shoe Model
                </label>
                <input
                  type="text"
                  placeholder="e.g. Pegasus 40, Clifton 9"
                  value={formData.currentShoe}
                  onChange={(e) => setFormData({ ...formData, currentShoe: e.target.value })}
                  className="w-full px-3 py-2 text-xs bg-brand-light border border-brand-border rounded-xs focus:outline-none focus:border-brand-dark"
                />
              </div>
            </div>

            <button
              type="submit"
              className="w-full mt-2 py-3.5 bg-brand-lime text-brand-dark font-bold text-xs uppercase tracking-widest hover:bg-brand-limeHover transition-all shadow-md active:scale-[0.99]"
            >
              Reserve Free Appointment
            </button>
          </form>
        )}
      </div>
    </div>
  );
}
