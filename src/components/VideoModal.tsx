import React, { useState, useEffect } from 'react';
import { GalleryVideo } from '../types';
import { X, Play, Clock, User, Award, ExternalLink } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface VideoModalProps {
  video: GalleryVideo | null;
  onClose: () => void;
  onOpenEnroll: () => void;
}

export const VideoModal: React.FC<VideoModalProps> = ({ video, onClose, onOpenEnroll }) => {
  const [isPlaying, setIsPlaying] = useState<boolean>(true);

  useEffect(() => {
    setIsPlaying(true);
  }, [video?.id]);

  if (!video) return null;

  const getEmbedUrl = (url: string) => {
    if (!url) return '';
    if (url.includes('drive.google.com')) {
      return url.replace(/\/view(\?.*)?$/, '/preview').replace(/\/edit(\?.*)?$/, '/preview');
    }
    return url;
  };

  const getDirectDriveUrl = (url: string) => {
    if (url.includes('drive.google.com')) {
      return url.replace(/\/preview(\?.*)?$/, '/view?usp=sharing');
    }
    return url;
  };

  const embedUrl = getEmbedUrl(video.videoUrl);
  const isDriveVideo = video.videoUrl.includes('drive.google.com');

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm overflow-y-auto">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
          className="relative w-full max-w-3xl bg-white border border-slate-200 rounded-3xl p-4 sm:p-6 shadow-2xl text-slate-900 my-8 overflow-hidden"
        >
          {/* Close Button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 z-10 p-2 rounded-full bg-slate-100 text-slate-500 hover:text-slate-900 hover:bg-slate-200 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>

          {/* Video Player Container */}
          <div className="relative aspect-video rounded-2xl overflow-hidden bg-slate-900 border border-slate-200 mb-5 shadow-inner">
            {isPlaying && embedUrl ? (
              <iframe
                src={embedUrl}
                title={video.title}
                className="w-full h-full border-0"
                allow="autoplay; encrypted-media; picture-in-picture; fullscreen"
                allowFullScreen
              />
            ) : (
              <div 
                onClick={() => setIsPlaying(true)}
                className="w-full h-full relative group flex items-center justify-center cursor-pointer"
              >
                <img
                  src={video.thumbnailUrl}
                  alt={video.title}
                  className="w-full h-full object-cover opacity-85 group-hover:scale-105 transition-transform duration-500"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/30 to-transparent flex flex-col items-center justify-center p-6 text-center">
                  <div className="w-16 h-16 rounded-full bg-blue-600 text-white flex items-center justify-center shadow-xl group-hover:scale-110 transition-transform">
                    <Play className="w-8 h-8 fill-current ml-1" />
                  </div>
                  <div className="mt-3 text-xs uppercase font-bold tracking-wider text-blue-100 bg-blue-600/80 px-3 py-1 rounded-full backdrop-blur-sm">
                    {video.categoryLabel}
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Video Metadata & Description */}
          <div className="space-y-3 px-2">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <h3 className="text-xl sm:text-2xl font-bold text-slate-900">
                {video.title}
              </h3>
              <div className="flex items-center space-x-2 text-xs text-slate-600 bg-slate-100 px-3 py-1 rounded-lg border border-slate-200 font-semibold">
                <Clock className="w-3.5 h-3.5 text-blue-600" />
                <span>{video.duration}</span>
              </div>
            </div>

            <div className="flex flex-wrap items-center justify-between gap-2">
              <div className="flex items-center space-x-2 text-xs text-blue-600 font-bold">
                <User className="w-3.5 h-3.5" />
                <span>{video.speakerName} ({video.speakerRole})</span>
              </div>

              {isDriveVideo && (
                <a
                  href={getDirectDriveUrl(video.videoUrl)}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center space-x-1.5 text-xs text-blue-600 hover:text-blue-700 font-bold hover:underline"
                >
                  <span>Open Drive Video in New Tab</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              )}
            </div>

            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
              {video.description}
            </p>

            {/* Bottom CTA within modal */}
            <div className="pt-4 mt-4 border-t border-slate-200 flex flex-wrap items-center justify-between gap-3">
              <div className="text-xs text-slate-500 font-medium">
                Like what you see? Visit our campuses at Rishra or Konnagar.
              </div>
              <button
                onClick={() => {
                  onClose();
                  onOpenEnroll();
                }}
                className="px-6 py-2.5 rounded-full bg-slate-900 text-white font-bold text-xs uppercase tracking-wider hover:bg-blue-600 transition-colors shadow-xs"
              >
                Enroll Now
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
