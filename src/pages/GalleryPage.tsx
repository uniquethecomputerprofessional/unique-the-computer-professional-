import React, { useState } from 'react';
import { GalleryVideo, GalleryPhoto, Testimonial } from '../types';
import { GALLERY_VIDEOS, GALLERY_PHOTOS, STUDENT_CAROUSEL_REVIEWS } from '../data/instituteData';
import { TiltCard } from '../components/TiltCard';
import { 
  Play, Video, Image as ImageIcon, Sparkles, X, ChevronRight, 
  ChevronLeft, Star, Quote, Eye, Maximize2 
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface GalleryPageProps {
  onOpenVideoModal: (videoId: string) => void;
  onOpenEnrollModal: () => void;
}

export const GalleryPage: React.FC<GalleryPageProps> = ({
  onOpenVideoModal,
  onOpenEnrollModal
}) => {
  const [activePhotoCategory, setActivePhotoCategory] = useState<string>('All');
  const [lightboxPhoto, setLightboxPhoto] = useState<GalleryPhoto | null>(null);

  const categories = ['All', 'Practical Labs', 'Classrooms', 'Certificates', 'Student Life'];

  const filteredPhotos = GALLERY_PHOTOS.filter(photo => 
    activePhotoCategory === 'All' || photo.category === activePhotoCategory
  );

  return (
    <div className="space-y-20 pb-16">
      {/* Header Banner */}
      <section className="bg-slate-900 border-b border-slate-800 pt-12 pb-16 text-center text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-4">
          <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-slate-800 border border-slate-700 text-blue-300 text-xs font-semibold">
            <Sparkles className="w-3.5 h-3.5 text-blue-400" />
            <span>Campus Life & Achievements • Rishra & Konnagar</span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-bold text-white tracking-tight">
            Institute Gallery & Video Insights
          </h1>

          <p className="text-xs sm:text-base text-slate-300 max-w-xl mx-auto leading-relaxed">
            Experience our modern practical computer labs, classroom sessions, student reviews, and founder addresses.
          </p>
        </div>
      </section>

      {/* 1. THREE HEADLINE VIDEO SECTIONS */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="text-center max-w-xl mx-auto">
          <div className="text-xs font-bold uppercase tracking-wider text-blue-600 mb-1">
            Featured Video Messages
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold text-slate-900">
            Headline Video Presentations
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {GALLERY_VIDEOS.map((video) => (
            <TiltCard key={video.id}>
              <div 
                onClick={() => onOpenVideoModal(video.id)}
                className="bg-white border border-slate-200 rounded-3xl p-5 flex flex-col justify-between cursor-pointer hover:border-blue-300 hover:shadow-md transition-all group"
              >
                <div className="space-y-4">
                  {/* Headline Title */}
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full bg-blue-50 text-blue-700 border border-blue-200">
                      {video.categoryLabel}
                    </span>
                    <span className="text-xs text-slate-500 font-medium">{video.duration}</span>
                  </div>

                  <h3 className="text-lg font-bold text-slate-900 group-hover:text-blue-600 transition-colors">
                    {video.title}
                  </h3>

                  {/* Thumbnail Container */}
                  <div className="aspect-video rounded-2xl overflow-hidden relative bg-slate-100 border border-slate-200">
                    <img
                      src={video.thumbnailUrl}
                      alt={video.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      referrerPolicy="no-referrer"
                    />
                    <div className="absolute inset-0 bg-slate-950/30 group-hover:bg-slate-950/10 transition-colors flex items-center justify-center">
                      <div className="w-14 h-14 rounded-full bg-blue-600 text-white flex items-center justify-center shadow-xl group-hover:scale-110 transition-transform">
                        <Play className="w-7 h-7 fill-current ml-1" />
                      </div>
                    </div>
                  </div>

                  <p className="text-xs text-slate-600 leading-relaxed line-clamp-2">
                    {video.description}
                  </p>
                </div>

                <div className="pt-4 mt-4 border-t border-slate-100 flex items-center justify-between text-xs font-bold text-blue-600">
                  <span>Watch Presentation</span>
                  <ChevronRight className="w-4 h-4" />
                </div>
              </div>
            </TiltCard>
          ))}
        </div>
      </section>

      {/* 2. STUDENT REVIEW SIDE-SCROLL CAROUSEL */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <div className="text-xs font-bold uppercase tracking-wider text-blue-600">
              Student Voices
            </div>
            <h2 className="text-xl sm:text-3xl font-bold text-slate-900">
              Student Review Side-Scroll Carousel
            </h2>
          </div>
          <div className="text-xs text-slate-500 hidden sm:block font-medium">
            Swipe or scroll horizontally →
          </div>
        </div>

        {/* Carousel Container */}
        <div className="flex space-x-6 overflow-x-auto pb-4 no-scrollbar pt-2">
          {STUDENT_CAROUSEL_REVIEWS.map((review) => (
            <div
              key={review.id}
              className="min-w-[280px] sm:min-w-[340px] max-w-[360px] bg-white border border-slate-200 rounded-2xl p-6 flex-shrink-0 flex flex-col justify-between hover:border-blue-300 hover:shadow-sm transition-all"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-1 text-amber-500">
                    {[...Array(review.rating)].map((_, i) => (
                      <Star key={i} className="w-3.5 h-3.5 fill-current" />
                    ))}
                  </div>
                  <span className="text-[10px] text-blue-700 font-semibold px-2 py-0.5 rounded-full bg-blue-50 border border-blue-200">
                    {review.campus}
                  </span>
                </div>

                <p className="text-xs text-slate-600 italic leading-relaxed">
                  "{review.quote}"
                </p>
              </div>

              <div className="pt-4 mt-4 border-t border-slate-100 flex items-center space-x-3">
                <img
                  src={review.avatar}
                  alt={review.name}
                  className="w-10 h-10 rounded-full object-cover border border-slate-200"
                  referrerPolicy="no-referrer"
                />
                <div>
                  <div className="text-xs font-bold text-slate-900">{review.name}</div>
                  <div className="text-[11px] text-slate-500">{review.course}</div>
                  {review.companyOrCollege && (
                    <div className="text-[10px] text-blue-600 font-semibold">{review.companyOrCollege}</div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 3. PHOTO GALLERY GRID WITH LIGHTBOX */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div>
            <div className="text-xs font-bold uppercase tracking-wider text-blue-600">
              Visual Highlights
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold text-slate-900">
              Campus Photo Gallery
            </h2>
          </div>

          {/* Filter Categories */}
          <div className="flex flex-wrap gap-2">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActivePhotoCategory(cat)}
                className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-colors ${
                  activePhotoCategory === cat
                    ? 'bg-blue-600 text-white shadow-xs'
                    : 'bg-slate-50 text-slate-600 border border-slate-200 hover:text-slate-900'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Photo Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredPhotos.map((photo) => (
            <div
              key={photo.id}
              onClick={() => setLightboxPhoto(photo)}
              className="group bg-white border border-slate-200 rounded-2xl overflow-hidden cursor-pointer hover:border-blue-300 hover:shadow-md transition-all"
            >
              <div className="aspect-[4/3] relative overflow-hidden bg-slate-100">
                <img
                  src={photo.imageUrl}
                  alt={photo.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-slate-950/20 to-transparent opacity-60 group-hover:opacity-80 transition-opacity" />
                
                <div className="absolute top-3 right-3 p-2 rounded-xl bg-slate-900/80 text-white backdrop-blur-md opacity-0 group-hover:opacity-100 transition-opacity">
                  <Maximize2 className="w-4 h-4" />
                </div>

                <div className="absolute bottom-3 left-3 right-3 text-white">
                  <div className="text-[10px] uppercase font-bold text-blue-300 tracking-wider">
                    {photo.category} • {photo.date}
                  </div>
                  <div className="text-sm font-bold truncate text-white">{photo.title}</div>
                </div>
              </div>

              <div className="p-3.5 text-xs text-slate-600 leading-relaxed">
                {photo.caption}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* LIGHTBOX MODAL */}
      <AnimatePresence>
        {lightboxPhoto && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="relative max-w-4xl w-full bg-white border border-slate-200 rounded-3xl overflow-hidden p-4 shadow-2xl"
            >
              <button
                onClick={() => setLightboxPhoto(null)}
                className="absolute top-4 right-4 z-10 p-2 rounded-full bg-slate-900/80 text-white hover:bg-slate-900 transition-colors"
              >
                <X className="w-6 h-6" />
              </button>

              <div className="max-h-[70vh] overflow-hidden rounded-2xl bg-slate-950 flex items-center justify-center">
                <img
                  src={lightboxPhoto.imageUrl}
                  alt={lightboxPhoto.title}
                  className="max-h-[70vh] w-auto object-contain rounded-2xl"
                  referrerPolicy="no-referrer"
                />
              </div>

              <div className="p-4 space-y-1">
                <div className="text-xs text-blue-600 font-bold uppercase">{lightboxPhoto.category}</div>
                <h3 className="text-lg font-bold text-slate-900">{lightboxPhoto.title}</h3>
                <p className="text-xs text-slate-600">{lightboxPhoto.caption}</p>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* BOTTOM CTA */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-slate-900 border border-slate-800 rounded-3xl p-8 sm:p-12 text-center text-white space-y-4 shadow-xl">
          <h2 className="text-2xl sm:text-3xl font-bold text-white">
            Want to Be Our Next Success Story?
          </h2>
          <p className="text-xs sm:text-base text-slate-300 max-w-xl mx-auto leading-relaxed">
            Join thousands of successful students who built their programming and computer career at Unique The Computer Professional.
          </p>
          <button
            onClick={onOpenEnrollModal}
            className="px-8 py-3.5 rounded-full bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs uppercase tracking-wider transition-colors shadow-lg shadow-blue-600/30"
          >
            Enroll Now
          </button>
        </div>
      </section>
    </div>
  );
};
