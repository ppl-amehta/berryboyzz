import React, { useState } from 'react';
import { Calendar, Clock, MapPin, Users, CheckCircle2, MessageCircle, ArrowRight } from 'lucide-react';
import { TOUR_PACKAGES } from '../../data/tourPackages';
import { FarmTourPackage } from '../../types/farm';
import { openWhatsAppLead } from '../../utils/whatsapp';

export const FarmTourBooking: React.FC = () => {
  const [selectedTour, setSelectedTour] = useState<FarmTourPackage>(TOUR_PACKAGES[0]);

  return (
    <section id="farm-tours" className="py-24 px-6 md:px-12 max-w-7xl mx-auto relative z-20">
      <div className="space-y-4 max-w-3xl mb-16">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-mono tracking-wider bg-rose-500/10 border border-rose-500/25 text-rose-600 dark:text-rose-400 font-semibold">
          <Calendar className="w-3.5 h-3.5 text-rose-600 dark:text-rose-400" />
          <span>Experiential Farm Visits &amp; Practical Workshops</span>
        </div>
        <h2 className="text-3xl md:text-5xl font-extrabold text-stone-900 dark:text-white tracking-tight leading-tight">
          How You Can Visit <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-rose-600 via-amber-600 to-emerald-600 dark:from-rose-400 dark:via-amber-300 dark:to-emerald-400">
            Our Various Berry Farms.
          </span>
        </h2>
        <p className="text-stone-600 dark:text-zinc-400 text-base md:text-lg font-light leading-relaxed">
          From weekend harvest berry tastings in the Panchgani foothills to commercial grower masterclasses, 
          experience our high-tech greenhouse ecosystems in person with our senior agronomists.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left List of 5 Tours (5 Cols) */}
        <div className="lg:col-span-5 space-y-3">
          {TOUR_PACKAGES.map((pkg) => {
            const isSelected = pkg.id === selectedTour.id;
            return (
              <button
                key={pkg.id}
                onClick={() => setSelectedTour(pkg)}
                className={`w-full p-5 rounded-2xl text-left border transition-all flex items-center justify-between ${
                  isSelected
                    ? 'bg-rose-500/10 dark:bg-rose-500/15 border-rose-500 shadow-md text-stone-900 dark:text-white'
                    : 'glass-panel text-stone-600 dark:text-zinc-400 hover:text-stone-900 dark:hover:text-zinc-200 hover:border-stone-300 dark:hover:border-zinc-700'
                }`}
              >
                <div className="space-y-1 pr-4">
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] font-mono uppercase tracking-wider text-rose-600 dark:text-rose-400 font-semibold">
                      {pkg.duration}
                    </span>
                    <span className="text-stone-300 dark:text-zinc-600">·</span>
                    <span className="text-[10px] font-mono text-stone-500 dark:text-zinc-400">₹{pkg.feePerPersonINR}/person</span>
                  </div>
                  <h3 className="text-base font-bold text-stone-900 dark:text-white">{pkg.title}</h3>
                  <p className="text-xs text-stone-500 dark:text-zinc-400 line-clamp-1 font-light">{pkg.tagline}</p>
                </div>
                <ArrowRight
                  className={`w-4 h-4 flex-shrink-0 transition-transform ${
                    isSelected ? 'text-rose-600 dark:text-rose-400 translate-x-1' : 'text-stone-400 dark:text-zinc-600'
                  }`}
                />
              </button>
            );
          })}
        </div>

        {/* Right Detail Card for Selected Tour (7 Cols) */}
        <div className="lg:col-span-7 p-8 md:p-10 rounded-3xl glass-panel-glow space-y-7">
          <div className="space-y-3 border-b border-stone-200 dark:border-zinc-800 pb-6">
            <div className="flex flex-wrap items-center gap-4 text-xs font-mono text-stone-600 dark:text-zinc-400">
              <span className="flex items-center gap-1.5">
                <Clock className="w-3.5 h-3.5 text-rose-500" />
                <span>{selectedTour.timing}</span>
              </span>
              <span className="flex items-center gap-1.5">
                <MapPin className="w-3.5 h-3.5 text-amber-500" />
                <span>{selectedTour.location}</span>
              </span>
              <span className="flex items-center gap-1.5">
                <Users className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
                <span>Max {selectedTour.maxGroupSize} Guests / Group</span>
              </span>
            </div>

            <h3 className="text-2xl md:text-3xl font-extrabold text-stone-900 dark:text-white">
              {selectedTour.title}
            </h3>
            <p className="text-sm text-stone-600 dark:text-zinc-300 font-light leading-relaxed">
              {selectedTour.tagline}
            </p>
          </div>

          {/* Included Features */}
          <div className="space-y-3">
            <h4 className="text-xs font-mono uppercase tracking-wider text-stone-500 dark:text-zinc-400 font-semibold">
              Package Includes:
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 text-xs text-stone-700 dark:text-zinc-300">
              {selectedTour.includes.map((inc, iIdx) => (
                <div key={iIdx} className="flex items-start gap-2.5 p-3 rounded-xl bg-stone-50 dark:bg-zinc-900/60 border border-stone-200 dark:border-zinc-800">
                  <CheckCircle2 className="w-4 h-4 text-rose-600 dark:text-rose-400 flex-shrink-0 mt-0.5" />
                  <span className="leading-relaxed">{inc}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Tour Itinerary Walkthrough */}
          <div className="space-y-3">
            <h4 className="text-xs font-mono uppercase tracking-wider text-stone-500 dark:text-zinc-400 font-semibold">
              Typical Schedule Itinerary:
            </h4>
            <div className="space-y-2 text-xs font-mono text-stone-700 dark:text-zinc-300">
              {selectedTour.itinerary.map((step, sIdx) => (
                <div key={sIdx} className="p-3 rounded-xl bg-stone-50 dark:bg-black/40 border border-stone-200 dark:border-zinc-800 flex items-center gap-3">
                  <span className="w-1.5 h-1.5 rounded-full bg-rose-500 flex-shrink-0" />
                  <span>{step}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Booking Action */}
          <div className="pt-4 border-t border-stone-200 dark:border-zinc-800 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div>
              <span className="text-xs font-mono text-stone-500 block">Experience Fee:</span>
              <div className="text-2xl font-bold font-mono text-stone-900 dark:text-white">
                ₹{selectedTour.feePerPersonINR}{' '}
                <span className="text-xs text-stone-500 dark:text-zinc-400 font-normal">/ person (all inclusive)</span>
              </div>
            </div>

            <button
              onClick={() =>
                openWhatsAppLead({
                  leadSource: 'tour_booking',
                  tourId: selectedTour.id,
                  customMessage: `I want to book slots for '${selectedTour.title}' (${selectedTour.timing}) at ₹${selectedTour.feePerPersonINR}/person`,
                })
              }
              className="w-full sm:w-auto px-8 py-3.5 rounded-2xl font-semibold text-xs text-white bg-gradient-to-r from-rose-600 to-purple-600 hover:from-rose-500 hover:to-purple-500 shadow-xl shadow-rose-950/20 transition-all flex items-center justify-center gap-2"
            >
              <MessageCircle className="w-4 h-4" />
              <span>Confirm Weekend Slot via WhatsApp</span>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};
