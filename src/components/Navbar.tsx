import React, { useState, useEffect } from 'react';
import { PageType } from '../types';
import { INSTITUTE_CONTACT } from '../data/instituteData';
import { 
  Menu, X, Phone, GraduationCap, ShieldCheck, MapPin, 
  BookOpen, Image as ImageIcon, Info, ChevronRight, Sparkles 
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface NavbarProps {
  activePage: PageType;
  setActivePage: (page: PageType) => void;
  onOpenEnrollModal: (courseId?: string) => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  activePage,
  setActivePage,
  onOpenEnrollModal
}) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems: { id: PageType; label: string; icon: React.ReactNode }[] = [
    { id: 'home', label: 'Home', icon: <GraduationCap className="w-4 h-4" /> },
    { id: 'courses', label: 'Courses', icon: <BookOpen className="w-4 h-4" /> },
    { id: 'gallery', label: 'Gallery', icon: <ImageIcon className="w-4 h-4" /> },
    { id: 'verify', label: 'Verify', icon: <ShieldCheck className="w-4 h-4" /> },
    { id: 'about', label: 'About Us', icon: <Info className="w-4 h-4" /> },
    { id: 'visit', label: 'Visit Us', icon: <MapPin className="w-4 h-4" /> },
  ];

  const handleNavClick = (pageId: PageType) => {
    setActivePage(pageId);
    setMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <>
      {/* Top Notification / Urgency Bar */}
      <div className="bg-blue-50/80 text-slate-700 text-xs py-2 px-4 border-b border-blue-100/80">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-2">
          <div className="flex items-center space-x-2 text-blue-800 font-semibold">
            <span className="flex h-2 w-2 relative">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-500 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-600"></span>
            </span>
            <span>Admissions Open for New Batches at Rishra & Konnagar Campuses</span>
          </div>

          <div className="flex items-center space-x-6">
            <a 
              href={`tel:${INSTITUTE_CONTACT.phone}`} 
              className="flex items-center space-x-1.5 text-slate-600 hover:text-blue-600 font-medium transition-colors"
            >
              <Phone className="w-3.5 h-3.5 text-blue-600" />
              <span>Call: {INSTITUTE_CONTACT.phone}</span>
            </a>
            <span className="hidden md:inline text-slate-300">|</span>
            <span className="hidden md:inline text-slate-600 font-semibold text-xs">
              Direct Practical Training & 1-on-1 Guidance
            </span>
          </div>
        </div>
      </div>

      {/* Main Sticky Navbar */}
      <header
        className={`sticky top-0 z-40 transition-all duration-300 backdrop-blur-md ${
          isScrolled
            ? 'bg-white/90 border-b border-slate-200/90 shadow-sm py-3'
            : 'bg-white/80 border-b border-slate-200 py-4'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          {/* Logo Brand */}
          <button
            onClick={() => handleNavClick('home')}
            className="flex items-center space-x-3 text-left group focus:outline-none"
            id="brand-logo-button"
          >
            <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center text-white font-black text-xl shadow-md shadow-blue-600/20 group-hover:scale-105 transition-transform duration-300">
              U
            </div>
            <div>
              <div className="text-base sm:text-lg font-bold tracking-tighter text-slate-900 uppercase flex items-center gap-1.5">
                <span>UNIQUE</span>
                <span className="text-[10px] px-2 py-0.5 rounded-full bg-blue-50 text-blue-700 font-bold border border-blue-200 tracking-wide">
                  PRO
                </span>
              </div>
              <div className="text-[10px] sm:text-[11px] text-slate-500 font-semibold tracking-[0.15em] uppercase -mt-0.5">
                The Computer Professional
              </div>
            </div>
          </button>

          {/* Desktop Links */}
          <nav className="hidden lg:flex items-center space-x-1 bg-slate-100/80 p-1.5 rounded-full border border-slate-200">
            {navItems.map((item) => {
              const isActive = activePage === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => handleNavClick(item.id)}
                  id={`nav-item-${item.id}`}
                  className={`relative px-4 py-2 rounded-full text-xs sm:text-sm font-semibold transition-all duration-200 flex items-center space-x-2 ${
                    isActive
                      ? 'text-white bg-blue-600 shadow-sm'
                      : 'text-slate-600 hover:text-blue-600 hover:bg-white'
                  }`}
                >
                  {item.icon}
                  <span>{item.label}</span>
                </button>
              );
            })}
          </nav>

          {/* Right Action Button */}
          <div className="hidden lg:flex items-center space-x-3">
            <button
              onClick={() => onOpenEnrollModal()}
              id="desktop-enroll-cta"
              className="px-6 py-2.5 bg-slate-900 text-white text-xs font-bold uppercase tracking-wider rounded-full hover:bg-blue-600 transition-all shadow-lg shadow-slate-900/10 flex items-center space-x-2"
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>Enroll Now</span>
            </button>
          </div>

          {/* Mobile Hamburger Toggle */}
          <div className="flex items-center space-x-2 lg:hidden">
            <button
              onClick={() => onOpenEnrollModal()}
              className="px-3 py-1.5 rounded-lg bg-blue-600 text-white font-semibold text-xs flex items-center space-x-1"
            >
              <span>Enroll</span>
            </button>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-xl bg-slate-100 text-slate-700 border border-slate-200 focus:outline-none"
              aria-label="Toggle Navigation"
              id="mobile-menu-toggle"
            >
              {mobileMenuOpen ? <X className="w-6 h-6 text-slate-900" /> : <Menu className="w-6 h-6 text-slate-900" />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="lg:hidden fixed top-[105px] inset-x-0 bg-white/95 backdrop-blur-xl border-b border-slate-200 z-30 px-4 py-6 shadow-2xl"
          >
            <div className="flex flex-col space-y-2 max-w-md mx-auto">
              <div className="text-xs uppercase font-bold tracking-wider text-slate-400 px-3 mb-1">
                Navigation Menu
              </div>
              {navItems.map((item) => {
                const isActive = activePage === item.id;
                return (
                  <button
                    key={item.id}
                    onClick={() => handleNavClick(item.id)}
                    className={`flex items-center justify-between p-3 rounded-xl font-medium text-sm transition-colors ${
                      isActive
                        ? 'bg-blue-50 text-blue-700 font-bold border border-blue-200'
                        : 'text-slate-700 hover:bg-slate-100 hover:text-blue-600'
                    }`}
                  >
                    <div className="flex items-center space-x-3">
                      <div className={`p-2 rounded-lg ${isActive ? 'bg-blue-600 text-white' : 'bg-slate-100 text-slate-600'}`}>
                        {item.icon}
                      </div>
                      <span className="font-semibold">{item.label}</span>
                    </div>
                    <ChevronRight className="w-4 h-4 text-slate-400" />
                  </button>
                );
              })}

              <div className="pt-4 mt-2 border-t border-slate-200 flex flex-col space-y-3">
                <button
                  onClick={() => {
                    setMobileMenuOpen(false);
                    onOpenEnrollModal();
                  }}
                  className="w-full py-3 rounded-xl bg-slate-900 hover:bg-blue-600 text-white font-bold text-center shadow-lg shadow-slate-900/10"
                >
                  Enroll Now / Book Free Demo
                </button>
                <div className="text-center text-xs text-slate-500">
                  Campuses at Rishra & Konnagar • Call 9231660503
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
