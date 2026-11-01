import React, { useState } from 'react';
import { Sprout, MessageCircle, Menu, X, ArrowUpRight } from 'lucide-react';
import { openWhatsAppLead } from '../../utils/whatsapp';

export const Navbar: React.FC = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    { label: 'Cultivars', href: '#berries-portfolio' },
    { label: 'Commercial Models', href: '#commercial-models' },
    { label: 'Biological OS', href: '#biological-os' },
    { label: 'Investment Tiers', href: '#investment-ladder' },
    { label: 'ROI Calculator', href: '#roi-calculator' },
    { label: 'Farm Tours', href: '#farm-tours' },
  ];

  return (
    <header className="fixed top-0 left-0 right-0 z-40 px-4 sm:px-8 py-3.5 backdrop-blur-xl bg-[#08090C]/80 border-b border-zinc-800/80">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        {/* Brand Lockup */}
        <a href="#" className="flex items-center gap-2.5 group">
          <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-rose-600 via-rose-500 to-purple-600 flex items-center justify-center shadow-lg shadow-rose-950/60 group-hover:scale-105 transition-transform">
            <span className="text-white font-extrabold text-sm tracking-tighter">BB</span>
          </div>
          <div>
            <div className="flex items-center gap-1.5">
              <span className="text-sm font-extrabold tracking-wider text-white uppercase font-mono">
                BERRYBOYZZ™
              </span>
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
            </div>
            <span className="text-[9px] font-mono text-zinc-400 block tracking-tight">
              PRECISION AGRO-ASSETS · PUNE & SATARA
            </span>
          </div>
        </a>

        {/* Desktop Links */}
        <nav className="hidden lg:flex items-center gap-6 text-xs font-mono tracking-wider text-zinc-400">
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              className="hover:text-white transition-colors"
            >
              {link.label}
            </a>
          ))}
        </nav>

        {/* Right Action Trigger */}
        <div className="hidden sm:flex items-center gap-3">
          <button
            onClick={() =>
              openWhatsAppLead({
                leadSource: 'hero',
                customMessage: 'Inquiring from main navigation header regarding Berryboyzz agro-assets',
              })
            }
            className="flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-mono font-medium text-white bg-emerald-600 hover:bg-emerald-500 shadow-md shadow-emerald-950/40 transition-all"
          >
            <MessageCircle className="w-3.5 h-3.5" />
            <span>WhatsApp Desk</span>
          </button>
        </div>

        {/* Mobile Hamburger */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="lg:hidden p-2 text-zinc-400 hover:text-white"
          aria-label="Toggle Navigation Menu"
        >
          {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden mt-3 p-4 rounded-2xl bg-zinc-900/95 border border-zinc-800 space-y-3 font-mono text-xs">
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              onClick={() => setMobileMenuOpen(false)}
              className="block py-2 text-zinc-300 hover:text-rose-400 border-b border-zinc-800/60"
            >
              {link.label}
            </a>
          ))}
          <button
            onClick={() => {
              setMobileMenuOpen(false);
              openWhatsAppLead({ leadSource: 'hero' });
            }}
            className="w-full mt-2 py-3 rounded-xl bg-emerald-600 text-white font-semibold flex items-center justify-center gap-2"
          >
            <MessageCircle className="w-4 h-4" />
            <span>WhatsApp Agronomy Desk</span>
          </button>
        </div>
      )}
    </header>
  );
};
