import React, { useState } from 'react';
import { PageType, CourseCategory, CourseItem } from '../types';
import { ALL_COURSES, COURSE_CATEGORIES } from '../data/coursesData';
import { TiltCard } from '../components/TiltCard';
import { 
  Search, BookOpen, GraduationCap, Code, FileSpreadsheet, 
  ShieldAlert, CheckCircle2, Sparkles, Clock, Layers, ChevronDown, 
  ChevronUp, ArrowRight, UserCheck, Target
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface CoursePageProps {
  onOpenEnrollModal: (courseId?: string) => void;
}

export const CoursePage: React.FC<CoursePageProps> = ({ onOpenEnrollModal }) => {
  const [selectedCategory, setSelectedCategory] = useState<CourseCategory | 'all'>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [expandedSyllabusId, setExpandedSyllabusId] = useState<string | null>(null);

  const filteredCourses = ALL_COURSES.filter(course => {
    const matchesCategory = selectedCategory === 'all' || course.category === selectedCategory;
    const matchesSearch = searchQuery === '' || 
      course.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      course.shortDesc.toLowerCase().includes(searchQuery.toLowerCase()) ||
      course.categoryLabel.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const toggleSyllabus = (courseId: string) => {
    setExpandedSyllabusId(expandedSyllabusId === courseId ? null : courseId);
  };

  return (
    <div className="space-y-16 pb-16">
      {/* Top Differentiator Banner */}
      <section className="bg-slate-900 border-b border-slate-800 text-white pt-12 pb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-6">
          <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-slate-800 border border-slate-700 text-blue-300 text-xs font-semibold">
            <Sparkles className="w-3.5 h-3.5 text-blue-400" />
            <span>Structured Career Curriculum • No Hidden Charges</span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-bold text-white tracking-tight">
            Explore Our Comprehensive Courses
          </h1>

          <p className="text-xs sm:text-base text-slate-300 max-w-2xl mx-auto leading-relaxed">
            From middle school board preparations to degree-level BCA tuitions and professional career certifications in programming, financial accounting, and cyber security.
          </p>

          {/* Differentiators Bar */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-6 max-w-4xl mx-auto text-left">
            <div className="p-4 rounded-2xl bg-slate-800/80 border border-slate-700 flex items-start space-x-3">
              <div className="p-2 rounded-xl bg-blue-900/60 text-blue-400 border border-blue-700/50 shrink-0">
                <UserCheck className="w-5 h-5" />
              </div>
              <div>
                <div className="text-sm font-bold text-white">Experienced Faculty</div>
                <div className="text-xs text-slate-400 mt-0.5">26+ years of teaching excellence & industry experts</div>
              </div>
            </div>

            <div className="p-4 rounded-2xl bg-slate-800/80 border border-slate-700 flex items-start space-x-3">
              <div className="p-2 rounded-xl bg-amber-900/60 text-amber-400 border border-amber-700/50 shrink-0">
                <Sparkles className="w-5 h-5" />
              </div>
              <div>
                <div className="text-sm font-bold text-white">Individual Attention</div>
                <div className="text-xs text-slate-400 mt-0.5">1-on-1 PC practice & personal doubt clearing</div>
              </div>
            </div>

            <div className="p-4 rounded-2xl bg-slate-800/80 border border-slate-700 flex items-start space-x-3">
              <div className="p-2 rounded-xl bg-cyan-900/60 text-cyan-400 border border-cyan-700/50 shrink-0">
                <Target className="w-5 h-5" />
              </div>
              <div>
                <div className="text-sm font-bold text-white">Career-Oriented Learning</div>
                <div className="text-xs text-slate-400 mt-0.5">Real projects, practical labs & job-ready skills</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Filter & Search Controls */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 bg-white border border-slate-200 p-4 rounded-2xl shadow-xs">
          
          {/* Search Box */}
          <div className="relative w-full md:w-80">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search course name or skill..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-900 placeholder-slate-400 focus:outline-none focus:border-blue-600 focus:bg-white transition-colors"
            />
          </div>

          {/* Category Tabs */}
          <div className="flex items-center space-x-1.5 overflow-x-auto w-full md:w-auto pb-2 md:pb-0 no-scrollbar">
            <button
              onClick={() => setSelectedCategory('all')}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-colors ${
                selectedCategory === 'all'
                  ? 'bg-blue-600 text-white shadow-xs'
                  : 'bg-slate-50 text-slate-600 hover:text-slate-900 border border-slate-200'
              }`}
            >
              All Courses ({ALL_COURSES.length})
            </button>

            {COURSE_CATEGORIES.map(cat => (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-colors ${
                  selectedCategory === cat.id
                    ? 'bg-blue-600 text-white shadow-xs'
                    : 'bg-slate-50 text-slate-600 hover:text-slate-900 border border-slate-200'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>

        </div>

        {/* Courses Listing */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredCourses.map(course => {
            const isSyllabusOpen = expandedSyllabusId === course.id;

            return (
              <TiltCard key={course.id}>
                <div className="h-full bg-white border border-slate-200 rounded-2xl p-6 flex flex-col justify-between hover:border-blue-300 hover:shadow-md transition-all">
                  
                  <div className="space-y-4">
                    {/* Header Badges */}
                    <div className="flex items-center justify-between">
                      <span className="text-[10px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-blue-50 text-blue-700 border border-blue-200">
                        {course.categoryLabel}
                      </span>
                      {course.badge && (
                        <span className="text-[10px] font-semibold text-amber-800 bg-amber-50 px-2 py-0.5 rounded-full border border-amber-200">
                          {course.badge}
                        </span>
                      )}
                    </div>

                    <h3 className="text-xl font-bold text-slate-900">
                      {course.name}
                    </h3>

                    <p className="text-xs text-slate-600 leading-relaxed">
                      {course.fullDesc}
                    </p>

                    {/* Metadata */}
                    <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 space-y-1.5 text-xs text-slate-600">
                      <div className="flex justify-between">
                        <span className="text-slate-500">Duration:</span>
                        <span className="text-slate-900 font-semibold">{course.duration}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-slate-500">Target Level:</span>
                        <span className="text-slate-900 font-semibold">{course.level}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-slate-500">Prerequisites:</span>
                        <span className="text-slate-900 font-semibold">{course.prerequisites}</span>
                      </div>
                    </div>

                    {/* Highlights */}
                    <div className="space-y-1.5 pt-1">
                      <div className="text-xs font-bold text-slate-800">Key Highlights:</div>
                      {course.highlights.map((hl, i) => (
                        <div key={i} className="flex items-start space-x-2 text-xs text-slate-600">
                          <CheckCircle2 className="w-3.5 h-3.5 text-blue-600 shrink-0 mt-0.5" />
                          <span>{hl}</span>
                        </div>
                      ))}
                    </div>

                    {/* Expandable Syllabus */}
                    <div className="pt-2">
                      <button
                        onClick={() => toggleSyllabus(course.id)}
                        className="w-full py-2 px-3 rounded-xl bg-slate-50 border border-slate-200 text-xs font-semibold text-blue-600 hover:text-blue-700 flex items-center justify-between transition-colors"
                      >
                        <span className="flex items-center space-x-1.5">
                          <Layers className="w-3.5 h-3.5" />
                          <span>View Course Syllabus ({course.syllabus.length} Topics)</span>
                        </span>
                        {isSyllabusOpen ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                      </button>

                      <AnimatePresence>
                        {isSyllabusOpen && (
                          <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: 'auto' }}
                            exit={{ opacity: 0, height: 0 }}
                            className="mt-2 p-3 rounded-xl bg-slate-50 border border-slate-200 space-y-1.5 text-xs text-slate-600"
                          >
                            <div className="font-bold text-slate-900 mb-1">Detailed Syllabus Coverage:</div>
                            {course.syllabus.map((topic, tid) => (
                              <div key={tid} className="flex items-start space-x-2">
                                <span className="text-blue-600 font-bold">•</span>
                                <span>{topic}</span>
                              </div>
                            ))}
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>

                  </div>

                  {/* Card Bottom CTA */}
                  <div className="pt-6 mt-6 border-t border-slate-100 flex items-center justify-between gap-3">
                    <button
                      onClick={() => onOpenEnrollModal(course.id)}
                      className="w-full py-2.5 rounded-xl bg-slate-900 hover:bg-blue-600 text-white font-bold text-xs uppercase tracking-wider transition-all text-center shadow-xs"
                    >
                      Enroll / Enquire Course
                    </button>
                  </div>

                </div>
              </TiltCard>
            );
          })}
        </div>

        {filteredCourses.length === 0 && (
          <div className="p-12 text-center bg-white border border-slate-200 rounded-2xl text-slate-500">
            No courses found matching "{searchQuery}". Try searching for "Python", "BCA", or "Tally".
          </div>
        )}
      </section>

      {/* Bottom Counselling Banner */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-slate-900 border border-slate-800 rounded-3xl p-8 text-center text-white space-y-4">
          <h3 className="text-2xl font-bold text-white">Unsure Which Course Suits Your Goals?</h3>
          <p className="text-xs sm:text-sm text-slate-300 max-w-xl mx-auto leading-relaxed">
            Visit our Rishra or Konnagar campus for a free face-to-face counselling session with our academic director.
          </p>
          <button
            onClick={() => onOpenEnrollModal()}
            className="px-8 py-3 rounded-full bg-blue-600 text-white font-bold text-xs uppercase tracking-wider hover:bg-blue-500 transition-colors shadow-lg shadow-blue-600/30"
          >
            Book Free Counselling Session
          </button>
        </div>
      </section>
    </div>
  );
};
