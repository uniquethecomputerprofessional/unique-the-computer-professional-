import React, { useState, useEffect } from 'react';
import { PageType, GalleryVideo } from './types';
import { DataProvider, useData } from './context/DataContext';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { EnrollModal } from './components/EnrollModal';
import { VideoModal } from './components/VideoModal';

// Pages
import { HomePage } from './pages/HomePage';
import { CoursePage } from './pages/CoursePage';
import { GalleryPage } from './pages/GalleryPage';
import { VerifyPage } from './pages/VerifyPage';
import { AboutPage } from './pages/AboutPage';
import { VisitPage } from './pages/VisitPage';
import { AdminPage } from './pages/AdminPage';

import { Phone, Sparkles, ArrowUp } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

function MainAppContent() {
  const { videos } = useData();
  const [activePage, setActivePage] = useState<PageType>('home');
  const [enrollModalOpen, setEnrollModalOpen] = useState(false);
  const [selectedCourseForEnroll, setSelectedCourseForEnroll] = useState<string | undefined>();
  
  const [selectedVideo, setSelectedVideo] = useState<GalleryVideo | null>(null);
  const [showScrollTop, setShowScrollTop] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 400);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleOpenEnrollModal = (courseId?: string) => {
    setSelectedCourseForEnroll(courseId);
    setEnrollModalOpen(true);
  };

  const handleOpenVideoModal = (videoId: string) => {
    const video = videos.find(v => v.id === videoId) || videos[0];
    if (video) {
      setSelectedVideo(video);
    }
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 flex flex-col font-sans selection:bg-blue-600 selection:text-white relative">
      
      {/* Sticky Top Navbar */}
      <Navbar
        activePage={activePage}
        setActivePage={setActivePage}
        onOpenEnrollModal={handleOpenEnrollModal}
      />

      {/* Main Page Area */}
      <main className="flex-1">
        <AnimatePresence mode="wait">
          <motion.div
            key={activePage}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.25 }}
          >
            {activePage === 'home' && (
              <HomePage
                setActivePage={setActivePage}
                onOpenEnrollModal={handleOpenEnrollModal}
                onOpenVideoModal={handleOpenVideoModal}
              />
            )}

            {activePage === 'courses' && (
              <CoursePage
                onOpenEnrollModal={handleOpenEnrollModal}
              />
            )}

            {activePage === 'gallery' && (
              <GalleryPage
                onOpenVideoModal={handleOpenVideoModal}
                onOpenEnrollModal={() => handleOpenEnrollModal()}
              />
            )}

            {activePage === 'verify' && (
              <VerifyPage />
            )}

            {activePage === 'about' && (
              <AboutPage
                setActivePage={setActivePage}
                onOpenVideoModal={handleOpenVideoModal}
                onOpenEnrollModal={() => handleOpenEnrollModal()}
              />
            )}

            {activePage === 'visit' && (
              <VisitPage />
            )}

            {activePage === 'admin' && (
              <AdminPage
                setActivePage={setActivePage}
              />
            )}
          </motion.div>
        </AnimatePresence>
      </main>

      {/* Persistent Repeatable Footer */}
      <Footer
        setActivePage={setActivePage}
        onOpenEnrollModal={handleOpenEnrollModal}
      />

      {/* Floating Call & Enroll Actions */}
      <div className="fixed bottom-6 right-6 z-30 flex flex-col items-end space-y-3 pointer-events-none">
        
        {/* Scroll To Top Button */}
        <AnimatePresence>
          {showScrollTop && (
            <motion.button
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              onClick={scrollToTop}
              className="p-3 rounded-full bg-white border border-slate-200 text-slate-700 hover:text-blue-600 hover:border-blue-300 shadow-lg pointer-events-auto transition-colors"
              title="Scroll to Top"
            >
              <ArrowUp className="w-5 h-5" />
            </motion.button>
          )}
        </AnimatePresence>

        {/* Quick Phone Call Pill */}
        <a
          href="tel:9231660503"
          className="px-4 py-2.5 rounded-full bg-white/90 border border-slate-200 text-slate-800 hover:text-blue-600 font-bold text-xs shadow-lg backdrop-blur-md flex items-center space-x-2 pointer-events-auto hover:scale-105 transition-transform"
        >
          <Phone className="w-4 h-4 text-blue-600" />
          <span className="hidden sm:inline text-slate-600">Call Office:</span>
          <span>9231660503</span>
        </a>

        {/* Floating Enroll Button */}
        <button
          onClick={() => handleOpenEnrollModal()}
          className="px-5 py-3 rounded-full bg-slate-900 hover:bg-blue-600 text-white font-bold text-xs uppercase tracking-wider shadow-xl shadow-slate-900/20 hover:scale-105 active:scale-95 transition-all pointer-events-auto flex items-center space-x-2"
        >
          <Sparkles className="w-4 h-4 text-blue-400" />
          <span>Enroll Now</span>
        </button>
      </div>

      {/* Interactive Modals */}
      <EnrollModal
        isOpen={enrollModalOpen}
        onClose={() => setEnrollModalOpen(false)}
        selectedCourseId={selectedCourseForEnroll}
      />

      <VideoModal
        video={selectedVideo}
        onClose={() => setSelectedVideo(null)}
        onOpenEnroll={() => handleOpenEnrollModal()}
      />

    </div>
  );
}

export default function App() {
  return (
    <DataProvider>
      <MainAppContent />
    </DataProvider>
  );
}
