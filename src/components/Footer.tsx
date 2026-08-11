import React from 'react';
import { PageType } from '../types';
import { INSTITUTE_CONTACT, CAMPUSES } from '../data/instituteData';
import { 
  Phone, Mail, MapPin, ShieldCheck, Instagram, 
  GraduationCap, BookOpen, ArrowUpRight, Heart, Sparkles 
} from 'lucide-react';

interface FooterProps {
  setActivePage: (page: PageType) => void;
  onOpenEnrollModal: (courseId?: string) => void;
}

export const Footer: React.FC<FooterProps> = ({ setActivePage, onOpenEnrollModal }) => {
  return (
    <footer className="bg-slate-950 border-t border-slate-800 text-slate-300 pt-16 pb-12 relative overflow-hidden">
      {/* Subtle Background Glow */}
      <div className="absolute -bottom-40 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-blue-900/10 blur-[120px] pointer-events-none rounded-full" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 pb-12 border-b border-slate-800/80">
          
          {/* Column 1: Institute Brand & Tagline */}
          <div className="space-y-4">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center text-white font-black text-xl shadow-md shadow-blue-600/30">
                U
              </div>
              <div>
                <span className="text-lg font-bold tracking-tight text-white block">
                  UNIQUE
                </span>
                <span className="text-xs text-blue-400 font-semibold uppercase tracking-wider block">
                  The Computer Professional
                </span>
              </div>
            </div>

            <p className="text-xs text-slate-400 leading-relaxed">
              Empowering students with industry-standard programming, cyber security, computerized accounting, and university BCA academic coaching since 1998.
            </p>

            <div className="pt-2 flex items-center space-x-3">
              <a
                href={INSTITUTE_CONTACT.instagramUrl}
                target="_blank"
                rel="noreferrer"
                className="w-9 h-9 rounded-xl bg-slate-800 border border-slate-700 flex items-center justify-center text-slate-300 hover:text-pink-400 hover:border-pink-500/40 hover:scale-105 transition-all"
                title="Follow on Instagram"
              >
                <Instagram className="w-4 h-4" />
              </a>
              <a
                href={`tel:${INSTITUTE_CONTACT.phone}`}
                className="w-9 h-9 rounded-xl bg-slate-800 border border-slate-700 flex items-center justify-center text-slate-300 hover:text-blue-400 hover:border-blue-500/40 hover:scale-105 transition-all"
                title="Call Institute"
              >
                <Phone className="w-4 h-4" />
              </a>
              <button
                onClick={() => setActivePage('verify')}
                className="px-3 py-1.5 rounded-xl bg-blue-900/60 border border-blue-700/60 text-xs font-medium text-blue-300 hover:bg-blue-800/60 transition-colors flex items-center space-x-1"
              >
                <ShieldCheck className="w-3.5 h-3.5 text-blue-400" />
                <span>Verify Cert</span>
              </button>
            </div>
          </div>

          {/* Column 2: Rishra Campus */}
          <div className="space-y-3">
            <div className="flex items-center space-x-2 text-white font-bold text-sm">
              <MapPin className="w-4 h-4 text-blue-400" />
              <span>Rishra Campus</span>
            </div>
            <p className="text-xs text-slate-400 leading-relaxed">
              {CAMPUSES[0].address}
            </p>
            <p className="text-[11px] text-slate-500">
              Landmark: {CAMPUSES[0].landmark}
            </p>
            <div className="pt-1">
              <a
                href={CAMPUSES[0].directionsUrl}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center space-x-1 text-xs text-blue-400 hover:text-blue-300 font-medium"
              >
                <span>Get Google Map Directions</span>
                <ArrowUpRight className="w-3 h-3" />
              </a>
            </div>
          </div>

          {/* Column 3: Konnagar Campus */}
          <div className="space-y-3">
            <div className="flex items-center space-x-2 text-white font-bold text-sm">
              <MapPin className="w-4 h-4 text-amber-400" />
              <span>Konnagar Campus</span>
            </div>
            <p className="text-xs text-slate-400 leading-relaxed">
              {CAMPUSES[1].address}
            </p>
            <p className="text-[11px] text-slate-500">
              Landmark: {CAMPUSES[1].landmark}
            </p>
            <div className="pt-1">
              <a
                href={CAMPUSES[1].directionsUrl}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center space-x-1 text-xs text-amber-400 hover:text-amber-300 font-medium"
              >
                <span>Get Google Map Directions</span>
                <ArrowUpRight className="w-3 h-3" />
              </a>
            </div>
          </div>

          {/* Column 4: Direct Contact & Links */}
          <div className="space-y-3">
            <div className="text-white font-bold text-sm">Direct Contact</div>
            <div className="space-y-2 text-xs text-slate-300">
              <a href={`tel:${INSTITUTE_CONTACT.phone}`} className="flex items-center space-x-2 hover:text-blue-400 transition-colors">
                <Phone className="w-3.5 h-3.5 text-blue-400" />
                <span>+91 {INSTITUTE_CONTACT.phone}</span>
              </a>
              <a href={`mailto:${INSTITUTE_CONTACT.email}`} className="flex items-start space-x-2 hover:text-blue-400 transition-colors break-all">
                <Mail className="w-3.5 h-3.5 text-blue-400 shrink-0 mt-0.5" />
                <span>{INSTITUTE_CONTACT.email}</span>
              </a>
            </div>

            <div className="pt-3">
              <button
                onClick={() => onOpenEnrollModal()}
                className="w-full py-2.5 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-semibold text-xs uppercase tracking-wider shadow-lg shadow-blue-600/20 hover:shadow-blue-600/40 transition-all flex items-center justify-center space-x-2"
              >
                <Sparkles className="w-3.5 h-3.5" />
                <span>Enroll For Free Counselling</span>
              </button>
            </div>
          </div>

        </div>

        {/* Quick Links & Copyright Bar */}
        <div className="pt-8 flex flex-col md:flex-row items-center justify-between text-xs text-slate-500 gap-4">
          <div className="flex flex-wrap items-center justify-center md:justify-start gap-4">
            <button onClick={() => setActivePage('home')} className="hover:text-slate-300 transition-colors">Home</button>
            <span>•</span>
            <button onClick={() => setActivePage('courses')} className="hover:text-slate-300 transition-colors">Course Catalog</button>
            <span>•</span>
            <button onClick={() => setActivePage('gallery')} className="hover:text-slate-300 transition-colors">Gallery & Videos</button>
            <span>•</span>
            <button onClick={() => setActivePage('verify')} className="hover:text-slate-300 transition-colors">Verify Certificate</button>
            <span>•</span>
            <button onClick={() => setActivePage('about')} className="hover:text-slate-300 transition-colors">About Us</button>
            <span>•</span>
            <button onClick={() => setActivePage('visit')} className="hover:text-slate-300 transition-colors">Campus Locations</button>
          </div>

          <div className="text-center md:text-right">
            © {new Date().getFullYear()} Unique The Computer Professional. All Rights Reserved.
          </div>
        </div>
      </div>
    </footer>
  );
};
