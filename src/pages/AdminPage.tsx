import React, { useState } from 'react';
import { useData } from '../context/DataContext';
import { CourseItem, GalleryVideo, GalleryPhoto, Testimonial, CourseCategory, PageType } from '../types';
import { 
  Lock, KeyRound, LogOut, Plus, Edit2, Trash2, CheckCircle2, 
  AlertCircle, Eye, RefreshCw, Download, Upload, ShieldCheck, 
  BookOpen, Video, Image as ImageIcon, MessageSquare, Bell, 
  UserCheck, ArrowLeft, Search, Filter, Sparkles, ExternalLink,
  Phone, Mail, MapPin, Calendar, Check, X
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface AdminPageProps {
  setActivePage: (page: PageType) => void;
}

export const AdminPage: React.FC<AdminPageProps> = ({ setActivePage }) => {
  const {
    courses,
    videos,
    photos,
    testimonials,
    noticeText,
    enrollments,
    isAdminLoggedIn,
    loginAdmin,
    logoutAdmin,
    addCourse,
    updateCourse,
    deleteCourse,
    addVideo,
    updateVideo,
    deleteVideo,
    addPhoto,
    updatePhoto,
    deletePhoto,
    addTestimonial,
    updateTestimonial,
    deleteTestimonial,
    updateNoticeText,
    updateEnrollmentStatus,
    deleteEnrollment,
    resetToDefaults,
    exportDataJSON,
    importDataJSON
  } = useData();

  // Login Form state
  const [passwordInput, setPasswordInput] = useState('');
  const [loginError, setLoginError] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  // Active Tab
  const [activeTab, setActiveTab] = useState<'courses' | 'videos' | 'photos' | 'reviews' | 'inquiries' | 'notice'>('courses');

  // Filter & Search
  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState<string>('all');

  // Modals state
  const [editingCourse, setEditingCourse] = useState<CourseItem | null>(null);
  const [isAddingCourse, setIsAddingCourse] = useState(false);

  const [editingVideo, setEditingVideo] = useState<GalleryVideo | null>(null);
  const [isAddingVideo, setIsAddingVideo] = useState(false);

  const [editingPhoto, setEditingPhoto] = useState<GalleryPhoto | null>(null);
  const [isAddingPhoto, setIsAddingPhoto] = useState(false);

  const [editingReview, setEditingReview] = useState<Testimonial | null>(null);
  const [isAddingReview, setIsAddingReview] = useState(false);

  const [noticeInput, setNoticeInput] = useState(noticeText);
  const [noticeSaved, setNoticeSaved] = useState(false);

  const [importJsonText, setImportJsonText] = useState('');
  const [showImportModal, setShowImportModal] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };

  // Login Submit Handler
  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (loginAdmin(passwordInput)) {
      setLoginError('');
      setPasswordInput('');
      showToast('Welcome back, Academic Director!');
    } else {
      setLoginError('Incorrect password. Try "admin123" or "unique1998".');
    }
  };

  const handleQuickLogin = () => {
    loginAdmin('admin123');
    showToast('Welcome back, Academic Director!');
  };

  // Export JSON backup
  const handleExportBackup = () => {
    const json = exportDataJSON();
    const blob = new Blob([json], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `utcp-institute-backup-${new Date().toISOString().slice(0,10)}.json`;
    a.click();
    showToast('Backup downloaded successfully!');
  };

  // Import JSON backup
  const handleImportSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!importJsonText.trim()) return;
    if (importDataJSON(importJsonText)) {
      setShowImportModal(false);
      setImportJsonText('');
      showToast('Data imported successfully!');
    } else {
      alert('Failed to parse JSON backup. Please check format.');
    }
  };

  // Handle Notice Update
  const handleNoticeSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    updateNoticeText(noticeInput);
    setNoticeSaved(true);
    showToast('Top Announcement Banner updated live!');
    setTimeout(() => setNoticeSaved(false), 2500);
  };

  // Render Login Page if not logged in
  if (!isAdminLoggedIn) {
    return (
      <div className="min-h-[80vh] flex items-center justify-center px-4 py-12 bg-slate-900 text-white">
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="w-full max-w-md bg-white text-slate-900 rounded-3xl p-8 shadow-2xl border border-slate-200"
        >
          <div className="text-center space-y-3 mb-8">
            <div className="w-16 h-16 rounded-2xl bg-blue-600 text-white flex items-center justify-center mx-auto shadow-lg shadow-blue-600/30">
              <ShieldCheck className="w-8 h-8" />
            </div>
            <h1 className="text-2xl font-bold tracking-tight text-slate-900">
              UTCP Admin Portal
            </h1>
            <p className="text-xs text-slate-500 font-medium">
              Unique The Computer Professional • Academic Management Panel
            </p>
          </div>

          <form onSubmit={handleLogin} className="space-y-5">
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-1.5">
                Admin Security Password
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                  <KeyRound className="w-4 h-4" />
                </div>
                <input
                  type={showPassword ? 'text' : 'password'}
                  required
                  value={passwordInput}
                  onChange={(e) => setPasswordInput(e.target.value)}
                  placeholder="Enter admin password..."
                  className="w-full pl-10 pr-10 py-3 rounded-xl border border-slate-300 text-sm focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent transition-all"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 pr-3 flex items-center text-xs font-bold text-slate-400 hover:text-slate-600"
                >
                  {showPassword ? 'Hide' : 'Show'}
                </button>
              </div>
              {loginError && (
                <div className="mt-2 text-xs text-rose-600 font-semibold flex items-center space-x-1">
                  <AlertCircle className="w-3.5 h-3.5" />
                  <span>{loginError}</span>
                </div>
              )}
            </div>

            <button
              type="submit"
              className="w-full py-3.5 rounded-xl bg-slate-900 hover:bg-blue-600 text-white font-bold text-xs uppercase tracking-wider transition-all shadow-md shadow-slate-900/10"
            >
              Log In to Portal
            </button>

            <div className="pt-3 border-t border-slate-100 text-center space-y-2">
              <button
                type="button"
                onClick={handleQuickLogin}
                className="w-full py-2.5 rounded-xl bg-blue-50 hover:bg-blue-100 text-blue-700 font-bold text-xs flex items-center justify-center space-x-1.5 transition-colors border border-blue-200"
              >
                <Sparkles className="w-3.5 h-3.5 text-blue-600" />
                <span>One-Click Demo Admin Login</span>
              </button>

              <button
                type="button"
                onClick={() => setActivePage('home')}
                className="text-xs text-slate-500 hover:text-blue-600 font-medium inline-flex items-center space-x-1 pt-1"
              >
                <ArrowLeft className="w-3.5 h-3.5" />
                <span>Return to Main Website</span>
              </button>
            </div>
          </form>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-100/70 pb-20">
      
      {/* Toast Notification */}
      <AnimatePresence>
        {toastMessage && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed top-20 right-6 z-50 px-5 py-3 rounded-2xl bg-slate-900 text-white text-xs font-bold shadow-2xl flex items-center space-x-2 border border-slate-800"
          >
            <CheckCircle2 className="w-4 h-4 text-emerald-400" />
            <span>{toastMessage}</span>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Admin Top Header */}
      <header className="bg-slate-900 text-white border-b border-slate-800 sticky top-[73px] z-30 shadow-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-xl bg-blue-600 text-white flex items-center justify-center font-black text-lg shadow-md shadow-blue-600/30">
              A
            </div>
            <div>
              <div className="text-base font-bold flex items-center space-x-2">
                <span>Academic Admin Control Center</span>
                <span className="px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 text-[10px] font-bold border border-emerald-500/30">
                  LIVE EDIT MODE
                </span>
              </div>
              <div className="text-xs text-slate-400">
                Unique The Computer Professional • Rishra & Konnagar
              </div>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <button
              onClick={() => setActivePage('home')}
              className="px-3.5 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-bold flex items-center space-x-1.5 transition-colors border border-slate-700"
            >
              <Eye className="w-3.5 h-3.5 text-blue-400" />
              <span>View Website</span>
            </button>

            <button
              onClick={handleExportBackup}
              className="px-3.5 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-bold flex items-center space-x-1.5 transition-colors border border-slate-700"
              title="Download backup file"
            >
              <Download className="w-3.5 h-3.5 text-amber-400" />
              <span>Export Backup</span>
            </button>

            <button
              onClick={() => setShowImportModal(true)}
              className="px-3.5 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-bold flex items-center space-x-1.5 transition-colors border border-slate-700"
              title="Restore from JSON"
            >
              <Upload className="w-3.5 h-3.5 text-cyan-400" />
              <span>Import</span>
            </button>

            <button
              onClick={() => {
                if (window.confirm('Reset all courses, videos, photos, and reviews to factory default values?')) {
                  resetToDefaults();
                  showToast('Reset data to factory defaults.');
                }
              }}
              className="px-3.5 py-2 rounded-xl bg-slate-800 hover:bg-rose-900/60 text-slate-300 hover:text-rose-200 text-xs font-bold flex items-center space-x-1.5 transition-colors border border-slate-700"
              title="Reset data"
            >
              <RefreshCw className="w-3.5 h-3.5" />
              <span>Reset</span>
            </button>

            <button
              onClick={logoutAdmin}
              className="px-3.5 py-2 rounded-xl bg-rose-600 hover:bg-rose-500 text-white text-xs font-bold flex items-center space-x-1.5 transition-colors shadow-sm"
            >
              <LogOut className="w-3.5 h-3.5" />
              <span>Log Out</span>
            </button>
          </div>
        </div>
      </header>

      {/* Main Container */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
        
        {/* Quick Metrics Cards */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
          <div 
            onClick={() => setActiveTab('courses')}
            className={`p-5 rounded-2xl border transition-all cursor-pointer ${
              activeTab === 'courses' ? 'bg-white border-blue-600 shadow-md ring-2 ring-blue-600/20' : 'bg-white border-slate-200 hover:border-slate-300'
            }`}
          >
            <div className="flex items-center justify-between text-slate-500 mb-2">
              <span className="text-xs font-bold uppercase tracking-wider">Courses</span>
              <BookOpen className="w-4 h-4 text-blue-600" />
            </div>
            <div className="text-2xl font-black text-slate-900">{courses.length}</div>
            <div className="text-[11px] text-slate-500 mt-1">Active Curriculums</div>
          </div>

          <div 
            onClick={() => setActiveTab('videos')}
            className={`p-5 rounded-2xl border transition-all cursor-pointer ${
              activeTab === 'videos' ? 'bg-white border-blue-600 shadow-md ring-2 ring-blue-600/20' : 'bg-white border-slate-200 hover:border-slate-300'
            }`}
          >
            <div className="flex items-center justify-between text-slate-500 mb-2">
              <span className="text-xs font-bold uppercase tracking-wider">Videos</span>
              <Video className="w-4 h-4 text-rose-600" />
            </div>
            <div className="text-2xl font-black text-slate-900">{videos.length}</div>
            <div className="text-[11px] text-slate-500 mt-1">Founder & Tour Videos</div>
          </div>

          <div 
            onClick={() => setActiveTab('photos')}
            className={`p-5 rounded-2xl border transition-all cursor-pointer ${
              activeTab === 'photos' ? 'bg-white border-blue-600 shadow-md ring-2 ring-blue-600/20' : 'bg-white border-slate-200 hover:border-slate-300'
            }`}
          >
            <div className="flex items-center justify-between text-slate-500 mb-2">
              <span className="text-xs font-bold uppercase tracking-wider">Gallery</span>
              <ImageIcon className="w-4 h-4 text-amber-600" />
            </div>
            <div className="text-2xl font-black text-slate-900">{photos.length}</div>
            <div className="text-[11px] text-slate-500 mt-1">Campus Photo Assets</div>
          </div>

          <div 
            onClick={() => setActiveTab('reviews')}
            className={`p-5 rounded-2xl border transition-all cursor-pointer ${
              activeTab === 'reviews' ? 'bg-white border-blue-600 shadow-md ring-2 ring-blue-600/20' : 'bg-white border-slate-200 hover:border-slate-300'
            }`}
          >
            <div className="flex items-center justify-between text-slate-500 mb-2">
              <span className="text-xs font-bold uppercase tracking-wider">Reviews</span>
              <MessageSquare className="w-4 h-4 text-emerald-600" />
            </div>
            <div className="text-2xl font-black text-slate-900">{testimonials.length}</div>
            <div className="text-[11px] text-slate-500 mt-1">Student Feedback</div>
          </div>

          <div 
            onClick={() => setActiveTab('inquiries')}
            className={`p-5 rounded-2xl border transition-all cursor-pointer col-span-2 sm:col-span-1 ${
              activeTab === 'inquiries' ? 'bg-white border-blue-600 shadow-md ring-2 ring-blue-600/20' : 'bg-white border-slate-200 hover:border-slate-300'
            }`}
          >
            <div className="flex items-center justify-between text-slate-500 mb-2">
              <span className="text-xs font-bold uppercase tracking-wider">Inquiries</span>
              <UserCheck className="w-4 h-4 text-purple-600" />
            </div>
            <div className="text-2xl font-black text-slate-900 flex items-center space-x-2">
              <span>{enrollments.length}</span>
              {enrollments.filter(e => e.status === 'New').length > 0 && (
                <span className="text-xs px-2 py-0.5 rounded-full bg-rose-500 text-white font-bold animate-pulse">
                  {enrollments.filter(e => e.status === 'New').length} New
                </span>
              )}
            </div>
            <div className="text-[11px] text-slate-500 mt-1">Submitted Leads</div>
          </div>
        </div>

        {/* Tab Selector Bar */}
        <div className="flex items-center space-x-2 overflow-x-auto pb-2 border-b border-slate-200 scrollbar-none">
          <button
            onClick={() => setActiveTab('courses')}
            className={`px-5 py-3 rounded-xl font-bold text-xs uppercase tracking-wider flex items-center space-x-2 transition-all shrink-0 ${
              activeTab === 'courses'
                ? 'bg-blue-600 text-white shadow-md'
                : 'bg-white text-slate-600 hover:bg-slate-200/70 border border-slate-200'
            }`}
          >
            <BookOpen className="w-4 h-4" />
            <span>Manage Courses ({courses.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('videos')}
            className={`px-5 py-3 rounded-xl font-bold text-xs uppercase tracking-wider flex items-center space-x-2 transition-all shrink-0 ${
              activeTab === 'videos'
                ? 'bg-blue-600 text-white shadow-md'
                : 'bg-white text-slate-600 hover:bg-slate-200/70 border border-slate-200'
            }`}
          >
            <Video className="w-4 h-4" />
            <span>Gallery Videos ({videos.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('photos')}
            className={`px-5 py-3 rounded-xl font-bold text-xs uppercase tracking-wider flex items-center space-x-2 transition-all shrink-0 ${
              activeTab === 'photos'
                ? 'bg-blue-600 text-white shadow-md'
                : 'bg-white text-slate-600 hover:bg-slate-200/70 border border-slate-200'
            }`}
          >
            <ImageIcon className="w-4 h-4" />
            <span>Gallery Photos ({photos.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('reviews')}
            className={`px-5 py-3 rounded-xl font-bold text-xs uppercase tracking-wider flex items-center space-x-2 transition-all shrink-0 ${
              activeTab === 'reviews'
                ? 'bg-blue-600 text-white shadow-md'
                : 'bg-white text-slate-600 hover:bg-slate-200/70 border border-slate-200'
            }`}
          >
            <MessageSquare className="w-4 h-4" />
            <span>Student Reviews ({testimonials.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('inquiries')}
            className={`px-5 py-3 rounded-xl font-bold text-xs uppercase tracking-wider flex items-center space-x-2 transition-all shrink-0 ${
              activeTab === 'inquiries'
                ? 'bg-blue-600 text-white shadow-md'
                : 'bg-white text-slate-600 hover:bg-slate-200/70 border border-slate-200'
            }`}
          >
            <UserCheck className="w-4 h-4" />
            <span>Student Inquiries ({enrollments.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('notice')}
            className={`px-5 py-3 rounded-xl font-bold text-xs uppercase tracking-wider flex items-center space-x-2 transition-all shrink-0 ${
              activeTab === 'notice'
                ? 'bg-blue-600 text-white shadow-md'
                : 'bg-white text-slate-600 hover:bg-slate-200/70 border border-slate-200'
            }`}
          >
            <Bell className="w-4 h-4 text-amber-400" />
            <span>Notice Bar Settings</span>
          </button>
        </div>

        {/* TAB 1: COURSES MANAGEMENT */}
        {activeTab === 'courses' && (
          <div className="space-y-6">
            <div className="flex flex-wrap items-center justify-between gap-4 bg-white p-5 rounded-2xl border border-slate-200 shadow-xs">
              <div>
                <h2 className="text-lg font-bold text-slate-900">Institute Course Directory</h2>
                <p className="text-xs text-slate-500">
                  Add new offerings, edit syllabus, toggle popular status, or update durations live.
                </p>
              </div>

              <button
                onClick={() => setIsAddingCourse(true)}
                className="px-5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold uppercase tracking-wider flex items-center space-x-2 shadow-md transition-all"
              >
                <Plus className="w-4 h-4" />
                <span>Add New Course</span>
              </button>
            </div>

            {/* Course Cards Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {courses.map((course) => (
                <div key={course.id} className="bg-white rounded-2xl border border-slate-200 p-5 shadow-xs hover:shadow-md transition-all flex flex-col justify-between space-y-4">
                  <div className="space-y-3">
                    <div className="flex items-start justify-between gap-2">
                      <span className="px-2.5 py-1 rounded-full bg-blue-50 border border-blue-200 text-blue-700 text-[10px] font-bold uppercase tracking-wider">
                        {course.categoryLabel}
                      </span>
                      {course.isPopular && (
                        <span className="px-2.5 py-1 rounded-full bg-amber-500 text-white text-[10px] font-bold uppercase tracking-wider">
                          Popular
                        </span>
                      )}
                    </div>

                    <h3 className="text-base font-bold text-slate-900 leading-snug">
                      {course.name}
                    </h3>

                    <p className="text-xs text-slate-600 line-clamp-2">
                      {course.shortDesc}
                    </p>

                    <div className="text-xs text-slate-500 flex flex-wrap gap-2 pt-1">
                      <span className="font-semibold text-slate-700">Duration: {course.duration}</span>
                      <span>•</span>
                      <span>Level: {course.level}</span>
                    </div>
                  </div>

                  <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
                    <div className="text-xs font-bold text-blue-600">
                      {course.badge || 'Certification Ready'}
                    </div>

                    <div className="flex items-center space-x-1">
                      <button
                        onClick={() => setEditingCourse(course)}
                        className="p-2 rounded-lg bg-slate-100 hover:bg-blue-50 text-slate-600 hover:text-blue-600 transition-colors"
                        title="Edit Course"
                      >
                        <Edit2 className="w-4 h-4" />
                      </button>

                      <button
                        onClick={() => {
                          if (window.confirm(`Delete course "${course.name}"?`)) {
                            deleteCourse(course.id);
                            showToast('Course deleted');
                          }
                        }}
                        className="p-2 rounded-lg bg-slate-100 hover:bg-rose-50 text-slate-600 hover:text-rose-600 transition-colors"
                        title="Delete Course"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 2: GALLERY VIDEOS */}
        {activeTab === 'videos' && (
          <div className="space-y-6">
            <div className="flex flex-wrap items-center justify-between gap-4 bg-white p-5 rounded-2xl border border-slate-200 shadow-xs">
              <div>
                <h2 className="text-lg font-bold text-slate-900">Gallery & Founder Video Manager</h2>
                <p className="text-xs text-slate-500">
                  Update Google Drive previews, YouTube embeds, founder address videos, and student testimonial clips.
                </p>
              </div>

              <button
                onClick={() => setIsAddingVideo(true)}
                className="px-5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold uppercase tracking-wider flex items-center space-x-2 shadow-md transition-all"
              >
                <Plus className="w-4 h-4" />
                <span>Add New Video</span>
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {videos.map((vid) => (
                <div key={vid.id} className="bg-white rounded-2xl border border-slate-200 p-5 shadow-xs flex flex-col justify-between space-y-4">
                  <div className="space-y-3">
                    <div className="relative aspect-video rounded-xl overflow-hidden bg-slate-900 border border-slate-200">
                      <img
                        src={vid.thumbnailUrl}
                        alt={vid.title}
                        className="w-full h-full object-cover"
                        referrerPolicy="no-referrer"
                      />
                      <div className="absolute top-2 left-2 px-2 py-0.5 rounded-full bg-slate-900/80 text-white text-[10px] font-bold uppercase">
                        {vid.categoryLabel}
                      </div>
                    </div>

                    <h3 className="text-base font-bold text-slate-900 leading-snug">
                      {vid.title}
                    </h3>

                    <p className="text-xs text-slate-600 line-clamp-2">
                      {vid.description}
                    </p>

                    <div className="text-xs text-slate-500 font-medium">
                      Speaker: <span className="text-slate-800 font-bold">{vid.speakerName}</span> ({vid.speakerRole})
                    </div>
                  </div>

                  <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
                    <div className="text-[11px] text-blue-600 font-bold truncate max-w-[180px]">
                      {vid.videoUrl.includes('drive.google.com') ? 'Google Drive Embed' : 'Video Link'}
                    </div>

                    <div className="flex items-center space-x-1">
                      <button
                        onClick={() => setEditingVideo(vid)}
                        className="p-2 rounded-lg bg-slate-100 hover:bg-blue-50 text-slate-600 hover:text-blue-600 transition-colors"
                        title="Edit Video"
                      >
                        <Edit2 className="w-4 h-4" />
                      </button>

                      <button
                        onClick={() => {
                          if (window.confirm(`Delete video "${vid.title}"?`)) {
                            deleteVideo(vid.id);
                            showToast('Video deleted');
                          }
                        }}
                        className="p-2 rounded-lg bg-slate-100 hover:bg-rose-50 text-slate-600 hover:text-rose-600 transition-colors"
                        title="Delete Video"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 3: GALLERY PHOTOS */}
        {activeTab === 'photos' && (
          <div className="space-y-6">
            <div className="flex flex-wrap items-center justify-between gap-4 bg-white p-5 rounded-2xl border border-slate-200 shadow-xs">
              <div>
                <h2 className="text-lg font-bold text-slate-900">Campus Photo Gallery Manager</h2>
                <p className="text-xs text-slate-500">
                  Manage computer lab pictures, classroom sessions, event photos, and certificate ceremonies.
                </p>
              </div>

              <button
                onClick={() => setIsAddingPhoto(true)}
                className="px-5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold uppercase tracking-wider flex items-center space-x-2 shadow-md transition-all"
              >
                <Plus className="w-4 h-4" />
                <span>Add New Photo</span>
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {photos.map((pic) => (
                <div key={pic.id} className="bg-white rounded-2xl border border-slate-200 p-4 shadow-xs flex flex-col justify-between space-y-3">
                  <div className="space-y-2">
                    <div className="aspect-[4/3] rounded-xl overflow-hidden bg-slate-100 relative">
                      <img
                        src={pic.imageUrl}
                        alt={pic.title}
                        className="w-full h-full object-cover"
                        referrerPolicy="no-referrer"
                      />
                      <span className="absolute bottom-2 left-2 px-2 py-0.5 rounded-md bg-slate-900/80 text-white text-[10px] font-bold">
                        {pic.category}
                      </span>
                    </div>

                    <h4 className="text-sm font-bold text-slate-900 line-clamp-1">{pic.title}</h4>
                    <p className="text-xs text-slate-500 line-clamp-2">{pic.caption}</p>
                  </div>

                  <div className="pt-2 border-t border-slate-100 flex items-center justify-between">
                    <span className="text-[10px] text-slate-400">{pic.date}</span>

                    <div className="flex items-center space-x-1">
                      <button
                        onClick={() => setEditingPhoto(pic)}
                        className="p-1.5 rounded-lg bg-slate-100 hover:bg-blue-50 text-slate-600 hover:text-blue-600 transition-colors"
                      >
                        <Edit2 className="w-3.5 h-3.5" />
                      </button>

                      <button
                        onClick={() => {
                          if (window.confirm(`Delete photo "${pic.title}"?`)) {
                            deletePhoto(pic.id);
                            showToast('Photo deleted');
                          }
                        }}
                        className="p-1.5 rounded-lg bg-slate-100 hover:bg-rose-50 text-slate-600 hover:text-rose-600 transition-colors"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 4: STUDENT REVIEWS */}
        {activeTab === 'reviews' && (
          <div className="space-y-6">
            <div className="flex flex-wrap items-center justify-between gap-4 bg-white p-5 rounded-2xl border border-slate-200 shadow-xs">
              <div>
                <h2 className="text-lg font-bold text-slate-900">Student Reviews & Testimonials</h2>
                <p className="text-xs text-slate-500">
                  Add student quotes, ratings, course details, and placement achievements.
                </p>
              </div>

              <button
                onClick={() => setIsAddingReview(true)}
                className="px-5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold uppercase tracking-wider flex items-center space-x-2 shadow-md transition-all"
              >
                <Plus className="w-4 h-4" />
                <span>Add New Review</span>
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {testimonials.map((rev) => (
                <div key={rev.id} className="bg-white rounded-2xl border border-slate-200 p-5 shadow-xs flex flex-col justify-between space-y-4">
                  <div className="space-y-3">
                    <div className="flex items-center space-x-3">
                      <img
                        src={rev.avatar}
                        alt={rev.name}
                        className="w-12 h-12 rounded-full object-cover border border-slate-200"
                        referrerPolicy="no-referrer"
                      />
                      <div>
                        <div className="text-sm font-bold text-slate-900">{rev.name}</div>
                        <div className="text-xs text-blue-600 font-semibold">{rev.course} • {rev.campus} Campus</div>
                        {rev.companyOrCollege && (
                          <div className="text-[11px] text-slate-500">{rev.companyOrCollege}</div>
                        )}
                      </div>
                    </div>

                    <p className="text-xs text-slate-600 italic leading-relaxed">
                      "{rev.quote}"
                    </p>
                  </div>

                  <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
                    <div className="text-amber-500 text-xs font-bold">
                      {'★'.repeat(rev.rating)} <span className="text-slate-400">({rev.rating}/5)</span>
                    </div>

                    <div className="flex items-center space-x-1">
                      <button
                        onClick={() => setEditingReview(rev)}
                        className="p-2 rounded-lg bg-slate-100 hover:bg-blue-50 text-slate-600 hover:text-blue-600 transition-colors"
                      >
                        <Edit2 className="w-4 h-4" />
                      </button>

                      <button
                        onClick={() => {
                          if (window.confirm(`Delete review from "${rev.name}"?`)) {
                            deleteTestimonial(rev.id);
                            showToast('Review deleted');
                          }
                        }}
                        className="p-2 rounded-lg bg-slate-100 hover:bg-rose-50 text-slate-600 hover:text-rose-600 transition-colors"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 5: STUDENT INQUIRIES / LEADS */}
        {activeTab === 'inquiries' && (
          <div className="space-y-6">
            <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs">
              <h2 className="text-lg font-bold text-slate-900">Student Admission Inquiries ({enrollments.length})</h2>
              <p className="text-xs text-slate-500">
                Inquiries submitted by students via the "Enroll Now" form across the website.
              </p>
            </div>

            {enrollments.length === 0 ? (
              <div className="p-12 text-center bg-white rounded-2xl border border-slate-200 text-slate-500 space-y-2">
                <UserCheck className="w-10 h-10 text-slate-300 mx-auto" />
                <div className="text-sm font-bold">No Inquiries Submitted Yet</div>
                <div className="text-xs text-slate-400">When students fill the enrollment modal, leads will appear here.</div>
              </div>
            ) : (
              <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-xs">
                <div className="overflow-x-auto">
                  <table className="w-full text-left border-collapse">
                    <thead>
                      <tr className="bg-slate-50 border-b border-slate-200 text-[11px] font-bold uppercase tracking-wider text-slate-500">
                        <th className="p-4">Student Info</th>
                        <th className="p-4">Campus & Course</th>
                        <th className="p-4">Qualification / Message</th>
                        <th className="p-4">Submitted Date</th>
                        <th className="p-4">Status</th>
                        <th className="p-4 text-right">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100 text-xs text-slate-700">
                      {enrollments.map((enr) => {
                        const course = courses.find(c => c.id === enr.courseId);
                        return (
                          <tr key={enr.id} className="hover:bg-slate-50/80 transition-colors">
                            <td className="p-4 space-y-0.5">
                              <div className="font-bold text-slate-900">{enr.studentName}</div>
                              <div className="flex items-center space-x-2 text-slate-500">
                                <a href={`tel:${enr.phone}`} className="hover:text-blue-600 font-semibold flex items-center space-x-1">
                                  <Phone className="w-3 h-3 text-blue-600" />
                                  <span>{enr.phone}</span>
                                </a>
                              </div>
                              {enr.email && <div className="text-[11px] text-slate-400">{enr.email}</div>}
                            </td>

                            <td className="p-4 space-y-0.5">
                              <span className="inline-block px-2 py-0.5 rounded bg-blue-50 text-blue-700 font-bold text-[10px]">
                                {enr.campus} Campus
                              </span>
                              <div className="font-bold text-slate-800">{course ? course.name : enr.courseId}</div>
                            </td>

                            <td className="p-4 space-y-1 max-w-xs">
                              <div className="font-semibold text-slate-800">{enr.standardOrQualification || 'N/A'}</div>
                              {enr.message && <p className="text-[11px] text-slate-500 line-clamp-2">{enr.message}</p>}
                            </td>

                            <td className="p-4 text-slate-500 font-medium text-[11px]">
                              {enr.submittedAt || 'Recent'}
                            </td>

                            <td className="p-4">
                              <select
                                value={enr.status || 'New'}
                                onChange={(e) => {
                                  if (enr.id) updateEnrollmentStatus(enr.id, e.target.value as any);
                                  showToast('Status updated!');
                                }}
                                className={`px-2.5 py-1.5 rounded-lg text-xs font-bold border focus:outline-none ${
                                  enr.status === 'New' 
                                    ? 'bg-rose-50 border-rose-200 text-rose-700'
                                    : enr.status === 'Contacted'
                                    ? 'bg-amber-50 border-amber-200 text-amber-700'
                                    : enr.status === 'Enrolled'
                                    ? 'bg-emerald-50 border-emerald-200 text-emerald-700'
                                    : 'bg-slate-100 border-slate-200 text-slate-600'
                                }`}
                              >
                                <option value="New">New Lead</option>
                                <option value="Contacted">Contacted</option>
                                <option value="Enrolled">Enrolled</option>
                                <option value="Closed">Closed</option>
                              </select>
                            </td>

                            <td className="p-4 text-right">
                              <button
                                onClick={() => {
                                  if (enr.id && window.confirm(`Delete inquiry for ${enr.studentName}?`)) {
                                    deleteEnrollment(enr.id);
                                    showToast('Inquiry removed');
                                  }
                                }}
                                className="p-2 rounded-lg bg-slate-100 hover:bg-rose-50 text-slate-500 hover:text-rose-600 transition-colors"
                              >
                                <Trash2 className="w-4 h-4" />
                              </button>
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              </div>
            )}
          </div>
        )}

        {/* TAB 6: NOTICE BAR SETTINGS */}
        {activeTab === 'notice' && (
          <div className="max-w-2xl bg-white p-8 rounded-3xl border border-slate-200 shadow-xs space-y-6">
            <div>
              <div className="text-xs font-bold uppercase tracking-wider text-blue-600 mb-1">
                Website Header Announcement
              </div>
              <h2 className="text-xl font-bold text-slate-900">
                Top Announcement Banner Text
              </h2>
              <p className="text-xs text-slate-500 mt-1">
                This text flashes live in the blue top notification bar across every page on the institute website.
              </p>
            </div>

            <form onSubmit={handleNoticeSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-2">
                  Banner Text Content
                </label>
                <textarea
                  rows={3}
                  value={noticeInput}
                  onChange={(e) => setNoticeInput(e.target.value)}
                  className="w-full p-3.5 rounded-xl border border-slate-300 text-xs sm:text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-600"
                  placeholder="e.g. Admissions Open for New Batches at Rishra & Konnagar..."
                />
              </div>

              <div className="p-4 rounded-xl bg-blue-50 border border-blue-100 text-xs text-blue-900 flex items-center space-x-2">
                <Bell className="w-4 h-4 text-blue-600 shrink-0" />
                <span>
                  <strong>Live Preview:</strong> {noticeInput || 'Admissions Open...'}
                </span>
              </div>

              <div className="flex items-center space-x-3 pt-2">
                <button
                  type="submit"
                  className="px-6 py-3 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs uppercase tracking-wider shadow-md transition-all flex items-center space-x-2"
                >
                  <Check className="w-4 h-4" />
                  <span>Update Announcement Live</span>
                </button>

                {noticeSaved && (
                  <span className="text-xs font-bold text-emerald-600 flex items-center space-x-1">
                    <CheckCircle2 className="w-4 h-4" />
                    <span>Saved & Updated Live!</span>
                  </span>
                )}
              </div>
            </form>
          </div>
        )}

      </div>

      {/* MODAL: ADD / EDIT COURSE */}
      {(isAddingCourse || editingCourse) && (
        <CourseFormModal
          course={editingCourse}
          onClose={() => {
            setIsAddingCourse(false);
            setEditingCourse(null);
          }}
          onSave={(data) => {
            if (editingCourse) {
              updateCourse(editingCourse.id, data);
              showToast('Course updated!');
            } else {
              addCourse(data as any);
              showToast('New course created!');
            }
            setIsAddingCourse(false);
            setEditingCourse(null);
          }}
        />
      )}

      {/* MODAL: ADD / EDIT VIDEO */}
      {(isAddingVideo || editingVideo) && (
        <VideoFormModal
          video={editingVideo}
          onClose={() => {
            setIsAddingVideo(false);
            setEditingVideo(null);
          }}
          onSave={(data) => {
            if (editingVideo) {
              updateVideo(editingVideo.id, data);
              showToast('Video updated!');
            } else {
              addVideo(data as any);
              showToast('New video added!');
            }
            setIsAddingVideo(false);
            setEditingVideo(null);
          }}
        />
      )}

      {/* MODAL: ADD / EDIT PHOTO */}
      {(isAddingPhoto || editingPhoto) && (
        <PhotoFormModal
          photo={editingPhoto}
          onClose={() => {
            setIsAddingPhoto(false);
            setEditingPhoto(null);
          }}
          onSave={(data) => {
            if (editingPhoto) {
              updatePhoto(editingPhoto.id, data);
              showToast('Photo updated!');
            } else {
              addPhoto(data as any);
              showToast('New photo added!');
            }
            setIsAddingPhoto(false);
            setEditingPhoto(null);
          }}
        />
      )}

      {/* MODAL: ADD / EDIT REVIEW */}
      {(isAddingReview || editingReview) && (
        <ReviewFormModal
          review={editingReview}
          onClose={() => {
            setIsAddingReview(false);
            setEditingReview(null);
          }}
          onSave={(data) => {
            if (editingReview) {
              updateTestimonial(editingReview.id, data);
              showToast('Review updated!');
            } else {
              addTestimonial(data as any);
              showToast('New review added!');
            }
            setIsAddingReview(false);
            setEditingReview(null);
          }}
        />
      )}

      {/* MODAL: IMPORT BACKUP */}
      {showImportModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm overflow-y-auto">
          <div className="bg-white text-slate-900 rounded-3xl p-6 max-w-lg w-full space-y-4 shadow-2xl">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <h3 className="text-base font-bold text-slate-900">Import Data JSON Backup</h3>
              <button onClick={() => setShowImportModal(false)} className="p-1 rounded-lg text-slate-400 hover:text-slate-700">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleImportSubmit} className="space-y-4">
              <p className="text-xs text-slate-500">
                Paste the contents of a previously exported JSON backup file below to restore courses, videos, photos, and reviews.
              </p>

              <textarea
                rows={8}
                required
                value={importJsonText}
                onChange={(e) => setImportJsonText(e.target.value)}
                placeholder="Paste JSON content here..."
                className="w-full p-3 rounded-xl border border-slate-300 text-xs font-mono text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-600"
              />

              <div className="flex items-center justify-end space-x-2 pt-2">
                <button
                  type="button"
                  onClick={() => setShowImportModal(false)}
                  className="px-4 py-2 rounded-xl bg-slate-100 text-slate-700 text-xs font-bold hover:bg-slate-200"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2.5 rounded-xl bg-blue-600 text-white text-xs font-bold uppercase hover:bg-blue-700"
                >
                  Restore Data
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
};

// ==========================================
// SUB-MODAL: COURSE FORM
// ==========================================
interface CourseFormModalProps {
  course: CourseItem | null;
  onClose: () => void;
  onSave: (data: Omit<CourseItem, 'id'> | Partial<CourseItem>) => void;
}

const CourseFormModal: React.FC<CourseFormModalProps> = ({ course, onClose, onSave }) => {
  const [name, setName] = useState(course?.name || '');
  const [category, setCategory] = useState<CourseCategory>(course?.category || 'programming');
  const [categoryLabel, setCategoryLabel] = useState(course?.categoryLabel || 'Programming & Software');
  const [shortDesc, setShortDesc] = useState(course?.shortDesc || '');
  const [fullDesc, setFullDesc] = useState(course?.fullDesc || '');
  const [duration, setDuration] = useState(course?.duration || '6 Months');
  const [level, setLevel] = useState(course?.level || 'Beginner to Advanced');
  const [prerequisites, setPrerequisites] = useState(course?.prerequisites || 'Basic Computer Knowledge');
  const [badge, setBadge] = useState(course?.badge || 'Certified Course');
  const [isPopular, setIsPopular] = useState(course?.isPopular || false);
  const [highlightsText, setHighlightsText] = useState(course?.highlights?.join('\n') || '1-on-1 Practical Training\nLive Project Work\nCertificate of Completion');
  const [syllabusText, setSyllabusText] = useState(course?.syllabus?.join('\n') || 'Module 1: Fundamentals\nModule 2: Practical Exercises\nModule 3: Project Assessment');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave({
      name,
      category,
      categoryLabel,
      shortDesc,
      fullDesc,
      duration,
      level,
      prerequisites,
      badge,
      isPopular,
      iconName: course?.iconName || 'Code',
      highlights: highlightsText.split('\n').map(s => s.trim()).filter(Boolean),
      syllabus: syllabusText.split('\n').map(s => s.trim()).filter(Boolean),
    });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm overflow-y-auto">
      <div className="bg-white text-slate-900 rounded-3xl p-6 sm:p-8 max-w-2xl w-full space-y-6 shadow-2xl my-8">
        <div className="flex items-center justify-between border-b border-slate-100 pb-4">
          <h3 className="text-lg font-bold text-slate-900">
            {course ? 'Edit Course Details' : 'Add New Course'}
          </h3>
          <button onClick={onClose} className="p-1 rounded-lg text-slate-400 hover:text-slate-700">
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4 max-h-[75vh] overflow-y-auto pr-2">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="sm:col-span-2">
              <label className="block text-xs font-bold uppercase text-slate-700 mb-1">Course Title</label>
              <input
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="e.g. Full Stack Web Development with React"
                className="w-full p-3 rounded-xl border border-slate-300 text-xs font-semibold"
              />
            </div>

            <div>
              <label className="block text-xs font-bold uppercase text-slate-700 mb-1">Category Code</label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value as CourseCategory)}
                className="w-full p-3 rounded-xl border border-slate-300 text-xs font-semibold"
              >
                <option value="school">School Board (ICSE/CBSE/WB)</option>
                <option value="degree">University (BCA / B.Sc IT)</option>
                <option value="programming">Programming & Software</option>
                <option value="finance">Accounting & Finance (Tally)</option>
                <option value="specialization">Cyber & Specialization</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-bold uppercase text-slate-700 mb-1">Category Display Label</label>
              <input
                type="text"
                required
                value={categoryLabel}
                onChange={(e) => setCategoryLabel(e.target.value)}
                placeholder="e.g. Programming & Coding"
                className="w-full p-3 rounded-xl border border-slate-300 text-xs font-semibold"
              />
            </div>

            <div>
              <label className="block text-xs font-bold uppercase text-slate-700 mb-1">Duration</label>
              <input
                type="text"
                required
                value={duration}
                onChange={(e) => setDuration(e.target.value)}
                placeholder="e.g. 6 Months / 1 Year"
                className="w-full p-3 rounded-xl border border-slate-300 text-xs font-semibold"
              />
            </div>

            <div>
              <label className="block text-xs font-bold uppercase text-slate-700 mb-1">Badge Tag</label>
              <input
                type="text"
                value={badge}
                onChange={(e) => setBadge(e.target.value)}
                placeholder="e.g. Most Popular / Job Guarantee"
                className="w-full p-3 rounded-xl border border-slate-300 text-xs font-semibold"
              />
            </div>

            <div className="sm:col-span-2">
              <label className="block text-xs font-bold uppercase text-slate-700 mb-1">Short Description</label>
              <input
                type="text"
                required
                value={shortDesc}
                onChange={(e) => setShortDesc(e.target.value)}
                placeholder="Brief 1-2 sentence overview for course cards"
                className="w-full p-3 rounded-xl border border-slate-300 text-xs"
              />
            </div>

            <div className="sm:col-span-2">
              <label className="block text-xs font-bold uppercase text-slate-700 mb-1">Full Description</label>
              <textarea
                rows={3}
                value={fullDesc}
                onChange={(e) => setFullDesc(e.target.value)}
                placeholder="Detailed explanation of career opportunities and training scope"
                className="w-full p-3 rounded-xl border border-slate-300 text-xs"
              />
            </div>

            <div>
              <label className="block text-xs font-bold uppercase text-slate-700 mb-1">Level</label>
              <input
                type="text"
                value={level}
                onChange={(e) => setLevel(e.target.value)}
                className="w-full p-3 rounded-xl border border-slate-300 text-xs"
              />
            </div>

            <div>
              <label className="block text-xs font-bold uppercase text-slate-700 mb-1">Prerequisites</label>
              <input
                type="text"
                value={prerequisites}
                onChange={(e) => setPrerequisites(e.target.value)}
                className="w-full p-3 rounded-xl border border-slate-300 text-xs"
              />
            </div>

            <div className="sm:col-span-2">
              <label className="block text-xs font-bold uppercase text-slate-700 mb-1">Highlights (1 per line)</label>
              <textarea
                rows={3}
                value={highlightsText}
                onChange={(e) => setHighlightsText(e.target.value)}
                className="w-full p-3 rounded-xl border border-slate-300 text-xs font-mono"
              />
            </div>

            <div className="sm:col-span-2">
              <label className="block text-xs font-bold uppercase text-slate-700 mb-1">Syllabus Modules (1 per line)</label>
              <textarea
                rows={4}
                value={syllabusText}
                onChange={(e) => setSyllabusText(e.target.value)}
                className="w-full p-3 rounded-xl border border-slate-300 text-xs font-mono"
              />
            </div>

            <div className="sm:col-span-2 flex items-center space-x-2 pt-2">
              <input
                type="checkbox"
                id="popular-check"
                checked={isPopular}
                onChange={(e) => setIsPopular(e.target.checked)}
                className="w-4 h-4 text-blue-600 rounded"
              />
              <label htmlFor="popular-check" className="text-xs font-bold text-slate-800">
                Mark as Featured / Popular Course on Homepage
              </label>
            </div>
          </div>

          <div className="flex items-center justify-end space-x-3 pt-4 border-t border-slate-100">
            <button
              type="button"
              onClick={onClose}
              className="px-5 py-2.5 rounded-xl bg-slate-100 text-slate-700 text-xs font-bold hover:bg-slate-200"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-6 py-2.5 rounded-xl bg-blue-600 text-white text-xs font-bold uppercase hover:bg-blue-700 shadow-md"
            >
              Save Course
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

// ==========================================
// SUB-MODAL: VIDEO FORM
// ==========================================
interface VideoFormModalProps {
  video: GalleryVideo | null;
  onClose: () => void;
  onSave: (data: Omit<GalleryVideo, 'id'> | Partial<GalleryVideo>) => void;
}

const VideoFormModal: React.FC<VideoFormModalProps> = ({ video, onClose, onSave }) => {
  const [title, setTitle] = useState(video?.title || '');
  const [type, setType] = useState<'founder' | 'review' | 'tour'>(video?.type || 'founder');
  const [categoryLabel, setCategoryLabel] = useState(video?.categoryLabel || 'Founder Address');
  const [videoUrl, setVideoUrl] = useState(video?.videoUrl || 'https://drive.google.com/file/d/1_kI2y-pf4_Tnlr-8ih7SoK_8GFbwU9Xw/preview');
  const [thumbnailUrl, setThumbnailUrl] = useState(video?.thumbnailUrl || 'https://lh3.googleusercontent.com/d/1i_eUvNy6tvHcrSNYcPfVETxlQkBr2NL5');
  const [duration, setDuration] = useState(video?.duration || 'Founder Video');
  const [speakerName, setSpeakerName] = useState(video?.speakerName || 'Founder & Academic Director');
  const [speakerRole, setSpeakerRole] = useState(video?.speakerRole || 'Unique The Computer Professional');
  const [description, setDescription] = useState(video?.description || '');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave({
      title,
      type,
      categoryLabel,
      videoUrl,
      thumbnailUrl,
      duration,
      speakerName,
      speakerRole,
      description
    });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm overflow-y-auto">
      <div className="bg-white text-slate-900 rounded-3xl p-6 sm:p-8 max-w-xl w-full space-y-6 shadow-2xl my-8">
        <div className="flex items-center justify-between border-b border-slate-100 pb-4">
          <h3 className="text-lg font-bold text-slate-900">
            {video ? 'Edit Video Details' : 'Add New Video'}
          </h3>
          <button onClick={onClose} className="p-1 rounded-lg text-slate-400 hover:text-slate-700">
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4 max-h-[75vh] overflow-y-auto pr-2">
          <div>
            <label className="block text-xs font-bold uppercase text-slate-700 mb-1">Video Title</label>
            <input
              type="text"
              required
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="e.g. From the Founder's Desk"
              className="w-full p-3 rounded-xl border border-slate-300 text-xs font-semibold"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold uppercase text-slate-700 mb-1">Video Type</label>
              <select
                value={type}
                onChange={(e) => setType(e.target.value as any)}
                className="w-full p-3 rounded-xl border border-slate-300 text-xs font-semibold"
              >
                <option value="founder">Founder Message</option>
                <option value="review">Student Review Video</option>
                <option value="tour">Campus Tour</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-bold uppercase text-slate-700 mb-1">Category Label</label>
              <input
                type="text"
                required
                value={categoryLabel}
                onChange={(e) => setCategoryLabel(e.target.value)}
                placeholder="e.g. Founder Address"
                className="w-full p-3 rounded-xl border border-slate-300 text-xs font-semibold"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold uppercase text-slate-700 mb-1">
              Video URL (Google Drive preview link or YouTube embed)
            </label>
            <input
              type="text"
              required
              value={videoUrl}
              onChange={(e) => setVideoUrl(e.target.value)}
              placeholder="e.g. https://drive.google.com/file/d/.../preview"
              className="w-full p-3 rounded-xl border border-slate-300 text-xs font-mono"
            />
          </div>

          <div>
            <label className="block text-xs font-bold uppercase text-slate-700 mb-1">
              Thumbnail Image URL
            </label>
            <input
              type="text"
              required
              value={thumbnailUrl}
              onChange={(e) => setThumbnailUrl(e.target.value)}
              placeholder="e.g. https://lh3.googleusercontent.com/d/..."
              className="w-full p-3 rounded-xl border border-slate-300 text-xs font-mono"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold uppercase text-slate-700 mb-1">Speaker Name</label>
              <input
                type="text"
                required
                value={speakerName}
                onChange={(e) => setSpeakerName(e.target.value)}
                className="w-full p-3 rounded-xl border border-slate-300 text-xs"
              />
            </div>

            <div>
              <label className="block text-xs font-bold uppercase text-slate-700 mb-1">Speaker Role</label>
              <input
                type="text"
                required
                value={speakerRole}
                onChange={(e) => setSpeakerRole(e.target.value)}
                className="w-full p-3 rounded-xl border border-slate-300 text-xs"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold uppercase text-slate-700 mb-1">Description</label>
            <textarea
              rows={3}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full p-3 rounded-xl border border-slate-300 text-xs"
            />
          </div>

          <div className="flex items-center justify-end space-x-3 pt-4 border-t border-slate-100">
            <button
              type="button"
              onClick={onClose}
              className="px-5 py-2.5 rounded-xl bg-slate-100 text-slate-700 text-xs font-bold hover:bg-slate-200"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-6 py-2.5 rounded-xl bg-blue-600 text-white text-xs font-bold uppercase hover:bg-blue-700 shadow-md"
            >
              Save Video
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

// ==========================================
// SUB-MODAL: PHOTO FORM
// ==========================================
interface PhotoFormModalProps {
  photo: GalleryPhoto | null;
  onClose: () => void;
  onSave: (data: Omit<GalleryPhoto, 'id'> | Partial<GalleryPhoto>) => void;
}

const PhotoFormModal: React.FC<PhotoFormModalProps> = ({ photo, onClose, onSave }) => {
  const [title, setTitle] = useState(photo?.title || '');
  const [category, setCategory] = useState<'Classrooms' | 'Practical Labs' | 'Certificates' | 'Events' | 'Student Life'>(photo?.category || 'Practical Labs');
  const [imageUrl, setImageUrl] = useState(photo?.imageUrl || '');
  const [caption, setCaption] = useState(photo?.caption || '');
  const [date, setDate] = useState(photo?.date || 'August 2026');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave({ title, category, imageUrl, caption, date });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm overflow-y-auto">
      <div className="bg-white text-slate-900 rounded-3xl p-6 max-w-md w-full space-y-4 shadow-2xl">
        <div className="flex items-center justify-between border-b border-slate-100 pb-3">
          <h3 className="text-base font-bold text-slate-900">
            {photo ? 'Edit Gallery Photo' : 'Add Gallery Photo'}
          </h3>
          <button onClick={onClose} className="p-1 rounded-lg text-slate-400 hover:text-slate-700">
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-bold uppercase text-slate-700 mb-1">Photo Title</label>
            <input
              type="text"
              required
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="e.g. Rishra Air-Conditioned Computer Lab"
              className="w-full p-3 rounded-xl border border-slate-300 text-xs font-semibold"
            />
          </div>

          <div>
            <label className="block text-xs font-bold uppercase text-slate-700 mb-1">Category</label>
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value as any)}
              className="w-full p-3 rounded-xl border border-slate-300 text-xs font-semibold"
            >
              <option value="Classrooms">Classrooms</option>
              <option value="Practical Labs">Practical Labs</option>
              <option value="Certificates">Certificates</option>
              <option value="Events">Events</option>
              <option value="Student Life">Student Life</option>
            </select>
          </div>

          <div>
            <label className="block text-xs font-bold uppercase text-slate-700 mb-1">Image URL</label>
            <input
              type="text"
              required
              value={imageUrl}
              onChange={(e) => setImageUrl(e.target.value)}
              placeholder="https://images.unsplash.com/... or Google Drive URL"
              className="w-full p-3 rounded-xl border border-slate-300 text-xs font-mono"
            />
          </div>

          <div>
            <label className="block text-xs font-bold uppercase text-slate-700 mb-1">Caption</label>
            <input
              type="text"
              value={caption}
              onChange={(e) => setCaption(e.target.value)}
              placeholder="Brief description"
              className="w-full p-3 rounded-xl border border-slate-300 text-xs"
            />
          </div>

          <div>
            <label className="block text-xs font-bold uppercase text-slate-700 mb-1">Date</label>
            <input
              type="text"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              className="w-full p-3 rounded-xl border border-slate-300 text-xs"
            />
          </div>

          <div className="flex items-center justify-end space-x-2 pt-2 border-t border-slate-100">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded-xl bg-slate-100 text-slate-700 text-xs font-bold hover:bg-slate-200"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-5 py-2 rounded-xl bg-blue-600 text-white text-xs font-bold uppercase hover:bg-blue-700"
            >
              Save Photo
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

// ==========================================
// SUB-MODAL: REVIEW FORM
// ==========================================
interface ReviewFormModalProps {
  review: Testimonial | null;
  onClose: () => void;
  onSave: (data: Omit<Testimonial, 'id'> | Partial<Testimonial>) => void;
}

const ReviewFormModal: React.FC<ReviewFormModalProps> = ({ review, onClose, onSave }) => {
  const [name, setName] = useState(review?.name || '');
  const [course, setCourse] = useState(review?.course || '');
  const [campus, setCampus] = useState(review?.campus || 'Rishra');
  const [quote, setQuote] = useState(review?.quote || '');
  const [companyOrCollege, setCompanyOrCollege] = useState(review?.companyOrCollege || '');
  const [rating, setRating] = useState(review?.rating || 5);
  const [avatar, setAvatar] = useState(review?.avatar || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave({
      name,
      course,
      campus,
      quote,
      companyOrCollege,
      rating,
      avatar,
      year: review?.year || '2026'
    });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm overflow-y-auto">
      <div className="bg-white text-slate-900 rounded-3xl p-6 max-w-md w-full space-y-4 shadow-2xl">
        <div className="flex items-center justify-between border-b border-slate-100 pb-3">
          <h3 className="text-base font-bold text-slate-900">
            {review ? 'Edit Student Review' : 'Add Student Review'}
          </h3>
          <button onClick={onClose} className="p-1 rounded-lg text-slate-400 hover:text-slate-700">
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-bold uppercase text-slate-700 mb-1">Student Full Name</label>
            <input
              type="text"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="e.g. Snehanshu Chatterjee"
              className="w-full p-3 rounded-xl border border-slate-300 text-xs font-semibold"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-bold uppercase text-slate-700 mb-1">Course Completed</label>
              <input
                type="text"
                required
                value={course}
                onChange={(e) => setCourse(e.target.value)}
                placeholder="e.g. ICSE Java Programming"
                className="w-full p-3 rounded-xl border border-slate-300 text-xs"
              />
            </div>

            <div>
              <label className="block text-xs font-bold uppercase text-slate-700 mb-1">Campus</label>
              <select
                value={campus}
                onChange={(e) => setCampus(e.target.value)}
                className="w-full p-3 rounded-xl border border-slate-300 text-xs"
              >
                <option value="Rishra">Rishra Campus</option>
                <option value="Konnagar">Konnagar Campus</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold uppercase text-slate-700 mb-1">Testimonial Quote</label>
            <textarea
              rows={3}
              required
              value={quote}
              onChange={(e) => setQuote(e.target.value)}
              placeholder="What the student said about faculty and practical learning..."
              className="w-full p-3 rounded-xl border border-slate-300 text-xs"
            />
          </div>

          <div>
            <label className="block text-xs font-bold uppercase text-slate-700 mb-1">Achievement / College / Company</label>
            <input
              type="text"
              value={companyOrCollege}
              onChange={(e) => setCompanyOrCollege(e.target.value)}
              placeholder="e.g. Scored 98/100 ICSE Board / TCS Accountant"
              className="w-full p-3 rounded-xl border border-slate-300 text-xs"
            />
          </div>

          <div>
            <label className="block text-xs font-bold uppercase text-slate-700 mb-1">Rating (1 to 5 Stars)</label>
            <input
              type="number"
              min={1}
              max={5}
              value={rating}
              onChange={(e) => setRating(Number(e.target.value))}
              className="w-full p-3 rounded-xl border border-slate-300 text-xs"
            />
          </div>

          <div>
            <label className="block text-xs font-bold uppercase text-slate-700 mb-1">Avatar Image URL</label>
            <input
              type="text"
              value={avatar}
              onChange={(e) => setAvatar(e.target.value)}
              className="w-full p-3 rounded-xl border border-slate-300 text-xs font-mono"
            />
          </div>

          <div className="flex items-center justify-end space-x-2 pt-2 border-t border-slate-100">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded-xl bg-slate-100 text-slate-700 text-xs font-bold hover:bg-slate-200"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-5 py-2 rounded-xl bg-blue-600 text-white text-xs font-bold uppercase hover:bg-blue-700"
            >
              Save Review
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
