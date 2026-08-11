import React, { useState } from 'react';
import { CAMPUSES, INSTITUTE_CONTACT, INSTAGRAM_POSTS } from '../data/instituteData';
import { 
  MapPin, Phone, Mail, Clock, Navigation, Send, 
  Instagram, ExternalLink, CheckCircle2, Sparkles, Heart 
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

export const VisitPage: React.FC = () => {
  const [inquiryForm, setInquiryForm] = useState({
    name: '',
    phone: '',
    email: '',
    campus: 'Rishra Campus',
    message: ''
  });

  const [formSent, setFormSent] = useState(false);

  const handleSubmitInquiry = (e: React.FormEvent) => {
    e.preventDefault();
    setFormSent(true);
  };

  return (
    <div className="space-y-16 pb-16">
      {/* Header Banner */}
      <section className="bg-slate-950 border-b border-slate-800/80 pt-12 pb-14 text-center">
        <div className="max-w-3xl mx-auto px-4 space-y-4">
          <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-blue-950/80 border border-blue-800/60 text-blue-300 text-xs font-semibold">
            <MapPin className="w-3.5 h-3.5 text-blue-400" />
            <span>Two Convenient Locations • Rishra & Konnagar</span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-black text-white tracking-tight">
            Visit Our Campuses & Contact Us
          </h1>

          <p className="text-xs sm:text-sm text-slate-300 leading-relaxed max-w-xl mx-auto">
            Walk in for a free face-to-face counselling session or contact our administrative office directly.
          </p>
        </div>
      </section>

      {/* 1. TWO LOCATION CARDS (Rishra & Konnagar) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="text-center max-w-xl mx-auto">
          <div className="text-xs font-bold uppercase tracking-wider text-blue-400 mb-1">
            Campus Locations
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-white">
            Find Our Nearest Institute Branch
          </h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {CAMPUSES.map((camp) => (
            <div
              key={camp.id}
              className="bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8 space-y-6 shadow-xl hover:border-slate-700 transition-colors flex flex-col justify-between"
            >
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 rounded-2xl bg-blue-950 border border-blue-800/60 text-blue-400 flex items-center justify-center">
                      <MapPin className="w-5 h-5" />
                    </div>
                    <div>
                      <h3 className="text-xl font-extrabold text-white">{camp.name}</h3>
                      <p className="text-xs text-blue-400 font-medium">{camp.landmark}</p>
                    </div>
                  </div>

                  <span className="text-[10px] uppercase font-bold text-slate-400 bg-slate-950 px-3 py-1 rounded-full border border-slate-800">
                    Active Branch
                  </span>
                </div>

                <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-2 text-xs text-slate-300">
                  <div className="text-white font-bold">Address Details:</div>
                  <p className="leading-relaxed">{camp.address}</p>
                  <p className="text-slate-400">{camp.city}</p>
                </div>

                {/* Features Checklist */}
                <div className="space-y-1.5 pt-1">
                  <div className="text-xs font-bold text-slate-300">Branch Facilities:</div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-slate-300">
                    {camp.features.map((feat, fi) => (
                      <div key={fi} className="flex items-center space-x-1.5">
                        <CheckCircle2 className="w-3.5 h-3.5 text-blue-400 shrink-0" />
                        <span>{feat}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Map Preview Image / Embed Container */}
                <div className="aspect-[16/9] rounded-2xl overflow-hidden bg-slate-950 border border-slate-800 relative group">
                  <img
                    src={camp.image}
                    alt={`${camp.name} Facility`}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 opacity-90"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-transparent opacity-80" />
                  <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between text-xs text-white">
                    <span className="font-bold flex items-center space-x-1">
                      <Navigation className="w-3.5 h-3.5 text-blue-400" />
                      <span>{camp.landmark}</span>
                    </span>
                  </div>
                </div>
              </div>

              {/* Get Directions Button */}
              <div className="pt-4 border-t border-slate-800">
                <a
                  href={camp.directionsUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="w-full py-3 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-bold text-xs uppercase tracking-wider hover:shadow-lg hover:shadow-blue-600/30 transition-all flex items-center justify-center space-x-2"
                >
                  <Navigation className="w-4 h-4" />
                  <span>Get Google Maps Directions</span>
                </a>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 2. DIRECT CONTACT DETAILS BLOCK */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-slate-900 border border-slate-800 rounded-3xl p-8 sm:p-10 shadow-xl space-y-6">
          <div className="text-center max-w-md mx-auto">
            <div className="text-xs font-bold uppercase tracking-wider text-blue-400">
              Direct Contact Information
            </div>
            <h2 className="text-2xl font-extrabold text-white mt-1">
              Reach Our Support Team
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-4">
            {/* Phone */}
            <a
              href={`tel:${INSTITUTE_CONTACT.phone}`}
              className="p-6 rounded-2xl bg-slate-950 border border-slate-800/80 hover:border-blue-500/50 transition-colors space-y-3 block group"
            >
              <div className="w-10 h-10 rounded-xl bg-blue-950 border border-blue-800 text-blue-400 flex items-center justify-center group-hover:scale-110 transition-transform">
                <Phone className="w-5 h-5" />
              </div>
              <div className="text-xs text-slate-400 uppercase font-bold tracking-wider">Tap To Call</div>
              <div className="text-lg font-black text-white group-hover:text-blue-300 transition-colors">
                +91 {INSTITUTE_CONTACT.phone}
              </div>
              <p className="text-[11px] text-slate-500">Available Mon-Sat: 8:00 AM - 8:00 PM</p>
            </a>

            {/* Email */}
            <a
              href={`mailto:${INSTITUTE_CONTACT.email}`}
              className="p-6 rounded-2xl bg-slate-950 border border-slate-800/80 hover:border-blue-500/50 transition-colors space-y-3 block group break-all"
            >
              <div className="w-10 h-10 rounded-xl bg-blue-950 border border-blue-800 text-blue-400 flex items-center justify-center group-hover:scale-110 transition-transform">
                <Mail className="w-5 h-5" />
              </div>
              <div className="text-xs text-slate-400 uppercase font-bold tracking-wider">Tap To Email</div>
              <div className="text-xs sm:text-sm font-bold text-white group-hover:text-blue-300 transition-colors">
                {INSTITUTE_CONTACT.email}
              </div>
              <p className="text-[11px] text-slate-500">Official Admissions & Inquiry Email</p>
            </a>

            {/* Timings */}
            <div className="p-6 rounded-2xl bg-slate-950 border border-slate-800/80 space-y-3">
              <div className="w-10 h-10 rounded-xl bg-blue-950 border border-blue-800 text-blue-400 flex items-center justify-center">
                <Clock className="w-5 h-5" />
              </div>
              <div className="text-xs text-slate-400 uppercase font-bold tracking-wider">Working Hours</div>
              <div className="text-xs sm:text-sm font-bold text-white">
                {INSTITUTE_CONTACT.workingHours}
              </div>
              <p className="text-[11px] text-slate-500">Open for Walk-In Counselling Sessions</p>
            </div>
          </div>
        </div>
      </section>

      {/* 3. CONTACT FORM SECTION */}
      <section className="max-w-3xl mx-auto px-4">
        <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-10 shadow-2xl space-y-6">
          <div className="text-center space-y-2">
            <div className="text-xs font-bold uppercase tracking-wider text-blue-400">
              Admission Inquiry Form
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white">
              Send Us a Message
            </h2>
            <p className="text-xs text-slate-400">
              Have questions about batch timings, syllabus, or course selection? Drop us a note below.
            </p>
          </div>

          {!formSent ? (
            <form onSubmit={handleSubmitInquiry} className="space-y-4 pt-2">
              <div>
                <label className="block text-xs font-bold text-slate-300 mb-1">Your Full Name *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Suman Roy"
                  value={inquiryForm.name}
                  onChange={(e) => setInquiryForm({ ...inquiryForm, name: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl bg-slate-950 border border-slate-800 text-sm text-white focus:outline-none focus:border-blue-500"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-slate-300 mb-1">Phone Number *</label>
                  <input
                    type="tel"
                    required
                    placeholder="e.g. 9830000000"
                    value={inquiryForm.phone}
                    onChange={(e) => setInquiryForm({ ...inquiryForm, phone: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl bg-slate-950 border border-slate-800 text-sm text-white focus:outline-none focus:border-blue-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-300 mb-1">Email Address</label>
                  <input
                    type="email"
                    placeholder="e.g. suman@gmail.com"
                    value={inquiryForm.email}
                    onChange={(e) => setInquiryForm({ ...inquiryForm, email: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl bg-slate-950 border border-slate-800 text-sm text-white focus:outline-none focus:border-blue-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-300 mb-1">Preferred Campus</label>
                <select
                  value={inquiryForm.campus}
                  onChange={(e) => setInquiryForm({ ...inquiryForm, campus: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl bg-slate-950 border border-slate-800 text-sm text-white focus:outline-none focus:border-blue-500"
                >
                  <option value="Rishra Campus">Rishra Campus (Rabindra Sarani)</option>
                  <option value="Konnagar Campus">Konnagar Campus (Beside Platform No. 1)</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-300 mb-1">Your Message / Query *</label>
                <textarea
                  rows={3}
                  required
                  placeholder="Ask any question about courses, batch schedules, or fee structures..."
                  value={inquiryForm.message}
                  onChange={(e) => setInquiryForm({ ...inquiryForm, message: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl bg-slate-950 border border-slate-800 text-sm text-white focus:outline-none focus:border-blue-500 resize-none"
                />
              </div>

              <button
                type="submit"
                className="w-full py-3.5 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-bold text-xs uppercase tracking-wider hover:shadow-lg hover:shadow-blue-600/30 transition-all flex items-center justify-center space-x-2"
              >
                <Send className="w-4 h-4" />
                <span>Send Inquiry</span>
              </button>
            </form>
          ) : (
            <div className="py-8 text-center space-y-4">
              <div className="w-14 h-14 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/40 flex items-center justify-center mx-auto">
                <CheckCircle2 className="w-8 h-8" />
              </div>
              <h3 className="text-xl font-bold text-white">Inquiry Sent Successfully!</h3>
              <p className="text-xs text-slate-300 max-w-sm mx-auto">
                Thank you <span className="text-blue-400 font-bold">{inquiryForm.name}</span>. Our counselling desk will contact you at <span className="text-white font-bold">{inquiryForm.phone}</span> shortly.
              </p>
              <button
                onClick={() => setFormSent(false)}
                className="px-6 py-2 rounded-xl bg-slate-800 text-white font-semibold text-xs hover:bg-slate-700 transition-colors"
              >
                Send Another Message
              </button>
            </div>
          )}
        </div>
      </section>

      {/* 4. INSTAGRAM SECTION */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2 text-xs font-bold uppercase tracking-wider text-pink-400">
            <Instagram className="w-4 h-4" />
            <span>Follow Us On Instagram</span>
          </div>
          <a
            href={INSTITUTE_CONTACT.instagramUrl}
            target="_blank"
            rel="noreferrer"
            className="text-xs font-bold text-pink-400 hover:underline flex items-center space-x-1"
          >
            <span>Visit @uniquethecomputerprofessional</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </a>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {INSTAGRAM_POSTS.map((post) => (
            <a
              key={post.id}
              href={post.postUrl}
              target="_blank"
              rel="noreferrer"
              className="aspect-square rounded-2xl overflow-hidden bg-slate-900 border border-slate-800 relative group block"
            >
              <img
                src={post.imageUrl}
                alt="Instagram post"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-slate-950/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center space-x-2 text-white text-xs font-bold">
                <Heart className="w-4 h-4 text-pink-400 fill-current" />
                <span>{post.likes}</span>
              </div>
            </a>
          ))}
        </div>
      </section>

      {/* 5. CTA BANNER */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="bg-gradient-to-r from-blue-900 via-indigo-900 to-slate-900 border border-blue-700/50 rounded-3xl p-10 space-y-4 shadow-2xl">
          <h2 className="text-2xl sm:text-3xl font-black text-white">
            Walk In For a Free Counselling Session — We'd Love To Meet You!
          </h2>
          <p className="text-xs sm:text-sm text-slate-300 max-w-lg mx-auto">
            Experience our personal attention and state-of-the-art computer labs at Rishra or Konnagar.
          </p>
          <div className="pt-2">
            <a
              href={`tel:${INSTITUTE_CONTACT.phone}`}
              className="inline-flex items-center space-x-2 px-8 py-3.5 rounded-full bg-blue-600 text-white font-extrabold text-xs uppercase tracking-wider hover:bg-blue-500 transition-colors shadow-lg shadow-blue-600/30"
            >
              <Phone className="w-4 h-4" />
              <span>Call 9231660503</span>
            </a>
          </div>
        </div>
      </section>
    </div>
  );
};
