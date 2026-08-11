import React from 'react';
import { PageType, CourseItem } from '../types';
import { useData } from '../context/DataContext';
import { INSTITUTE_CONTACT, WHY_CHOOSE_US, INSTAGRAM_POSTS } from '../data/instituteData';
import { TiltCard } from '../components/TiltCard';
import { 
  Sparkles, GraduationCap, Code, ShieldCheck, MapPin, 
  ArrowRight, Users, Trophy, Instagram, Star, CheckCircle2, 
  ChevronRight, Play, ExternalLink, BookOpen, Clock, Heart, Award, Phone
} from 'lucide-react';
import { motion } from 'motion/react';

interface HomePageProps {
  setActivePage: (page: PageType) => void;
  onOpenEnrollModal: (courseId?: string) => void;
  onOpenVideoModal: (videoId: string) => void;
}

export const HomePage: React.FC<HomePageProps> = ({
  setActivePage,
  onOpenEnrollModal,
  onOpenVideoModal
}) => {
  const { courses, testimonials } = useData();
  const popularCourses = courses.filter(c => c.isPopular).slice(0, 6);

  return (
    <div className="space-y-24 pb-16">
      {/* HERO SECTION */}
      <section className="relative pt-8 sm:pt-16 pb-12 overflow-hidden">
        {/* Soft Background Accents */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] bg-blue-100/50 rounded-full blur-[120px] pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            {/* Left Content */}
            <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
              {/* Pill badge */}
              <motion.div 
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-blue-50 border border-blue-200 text-blue-700 text-xs font-semibold shadow-xs"
              >
                <Sparkles className="w-3.5 h-3.5 text-blue-600" />
                <span>Premier Computer Education • Rishra & Konnagar</span>
              </motion.div>

              {/* Bold Headline */}
              <motion.h1 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="text-3xl sm:text-5xl lg:text-6xl font-bold text-slate-900 tracking-tight leading-[1.15]"
              >
                Turning Learners Into <br className="hidden sm:inline" />
                <span className="text-blue-600">
                  Skilled Computer
                </span>{' '}
                Professionals.
              </motion.h1>

              {/* Persuasive Subheadline */}
              <motion.p 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="text-sm sm:text-base lg:text-lg text-slate-600 leading-relaxed max-w-2xl mx-auto lg:mx-0"
              >
                Hands-on, career-oriented training in programming, cyber security, computerized accounting, and university BCA tuition. Experienced faculty providing individual 1-on-1 attention at two convenient campuses.
              </motion.p>

              {/* CTA Buttons */}
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="pt-2 flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4"
              >
                <button
                  onClick={() => onOpenEnrollModal()}
                  className="w-full sm:w-auto px-8 py-4 rounded-full bg-slate-900 hover:bg-blue-600 text-white font-bold text-xs uppercase tracking-wider shadow-lg shadow-slate-900/10 hover:scale-105 active:scale-95 transition-all duration-200 flex items-center justify-center space-x-2"
                >
                  <span>Enroll Now / Free Demo</span>
                  <ArrowRight className="w-4 h-4" />
                </button>

                <button
                  onClick={() => setActivePage('courses')}
                  className="w-full sm:w-auto px-8 py-4 rounded-full bg-white text-slate-800 border border-slate-200 font-bold text-xs uppercase tracking-wider hover:bg-slate-50 hover:border-slate-300 transition-all duration-200 flex items-center justify-center space-x-2 shadow-xs"
                >
                  <BookOpen className="w-4 h-4 text-blue-600" />
                  <span>Explore 13+ Courses</span>
                </button>
              </motion.div>

              {/* Trust Badges Bar */}
              <div className="pt-6 border-t border-slate-200 grid grid-cols-3 gap-4 text-center lg:text-left">
                <div>
                  <div className="text-xl sm:text-2xl font-bold text-slate-900">26+ Years</div>
                  <div className="text-xs text-slate-500 font-medium">Teaching Excellence</div>
                </div>
                <div>
                  <div className="text-xl sm:text-2xl font-bold text-blue-600">5,000+</div>
                  <div className="text-xs text-slate-500 font-medium">Students Trained</div>
                </div>
                <div>
                  <div className="text-xl sm:text-2xl font-bold text-slate-900">100%</div>
                  <div className="text-xs text-slate-500 font-medium">Practical Lab Ratio</div>
                </div>
              </div>
            </div>

            {/* Right Graphic: 3D Tilt Card Visual */}
            <div className="lg:col-span-5">
              <TiltCard glow="blue" className="w-full">
                <div className="relative rounded-3xl bg-white border border-slate-200 p-3 sm:p-4 shadow-xl overflow-hidden group">
                  <div className="aspect-[4/3] rounded-2xl overflow-hidden relative">
                    <img 
                      src="https://lh3.googleusercontent.com/d/1i_eUvNy6tvHcrSNYcPfVETxlQkBr2NL5" 
                      alt="Unique The Computer Professional Founder Address"
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      referrerPolicy="no-referrer"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-slate-950/20 to-transparent" />
                    
                    {/* Overlay Floating Tags */}
                    <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-md px-3 py-1.5 rounded-full border border-slate-200 text-xs font-semibold text-slate-800 flex items-center space-x-1.5 shadow-sm">
                      <GraduationCap className="w-3.5 h-3.5 text-blue-600" />
                      <span>Individual PC Practice</span>
                    </div>

                    <button 
                      onClick={() => onOpenVideoModal('founder-desk')}
                      className="absolute inset-0 flex items-center justify-center group/btn"
                    >
                      <div className="w-14 h-14 rounded-full bg-blue-600 text-white flex items-center justify-center shadow-xl group-hover/btn:scale-110 transition-transform">
                        <Play className="w-7 h-7 fill-current ml-1" />
                      </div>
                    </button>

                    <div className="absolute bottom-4 left-4 right-4 bg-white/95 backdrop-blur-md p-3.5 rounded-xl border border-slate-200 shadow-lg flex items-center justify-between">
                      <div>
                        <div className="text-xs font-bold text-slate-900">Watch Director's Vision</div>
                        <div className="text-[11px] text-slate-500">Rishra & Konnagar Campuses</div>
                      </div>
                      <span className="text-xs font-bold text-blue-600 flex items-center">
                        Play Video <ChevronRight className="w-3.5 h-3.5 ml-0.5" />
                      </span>
                    </div>
                  </div>
                </div>
              </TiltCard>
            </div>

          </div>
        </div>
      </section>

      {/* WHY CHOOSE US */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <div className="text-xs font-bold uppercase tracking-wider text-blue-600 mb-2">
            The Unique Difference
          </div>
          <h2 className="text-2xl sm:text-4xl font-bold text-slate-900">
            Why Students Choose Our Institute
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 mt-2">
            Built on a core philosophy of individual attention, rigorous practical training, and experienced faculty support.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {WHY_CHOOSE_US.map((item, index) => (
            <TiltCard key={index}>
              <div className="h-full bg-white border border-slate-200 rounded-2xl p-6 flex flex-col justify-between hover:border-blue-300 hover:shadow-md transition-all">
                <div className="space-y-4">
                  <div className="w-12 h-12 rounded-2xl bg-blue-50 border border-blue-100 flex items-center justify-center text-blue-600 shadow-xs">
                    <CheckCircle2 className="w-6 h-6" />
                  </div>
                  <h3 className="text-lg font-bold text-slate-900">
                    {item.title}
                  </h3>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    {item.description}
                  </p>
                </div>
                <div className="pt-4 mt-4 border-t border-slate-100 text-[11px] text-blue-600 font-semibold">
                  Verified Feature
                </div>
              </div>
            </TiltCard>
          ))}
        </div>
      </section>

      {/* POPULAR COURSES PREVIEW */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-4">
          <div>
            <div className="text-xs font-bold uppercase tracking-wider text-blue-600 mb-1">
              Popular Career Programs
            </div>
            <h2 className="text-2xl sm:text-4xl font-bold text-slate-900">
              Flagship Courses Offered
            </h2>
            <p className="text-xs sm:text-sm text-slate-500 mt-1">
              Explore job-ready certifications, degree tuitions, and board exam courses.
            </p>
          </div>

          <button
            onClick={() => setActivePage('courses')}
            className="self-start md:self-auto px-5 py-2.5 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-bold transition-colors flex items-center space-x-2 border border-slate-200"
          >
            <span>View All 13 Courses</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

        {/* Courses Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {popularCourses.map((course) => (
            <TiltCard key={course.id}>
              <div className="h-full bg-white border border-slate-200 rounded-2xl p-6 flex flex-col justify-between hover:border-blue-300 hover:shadow-md transition-all duration-300 group">
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full bg-blue-50 text-blue-700 border border-blue-200">
                      {course.categoryLabel}
                    </span>
                    {course.badge && (
                      <span className="text-[10px] font-semibold text-amber-800 bg-amber-50 px-2 py-0.5 rounded-full border border-amber-200">
                        {course.badge}
                      </span>
                    )}
                  </div>

                  <h3 className="text-xl font-bold text-slate-900 group-hover:text-blue-600 transition-colors">
                    {course.name}
                  </h3>

                  <p className="text-xs text-slate-600 leading-relaxed line-clamp-3">
                    {course.shortDesc}
                  </p>

                  <div className="space-y-2 pt-2">
                    <div className="flex items-center space-x-2 text-xs text-slate-500">
                      <Clock className="w-3.5 h-3.5 text-blue-600" />
                      <span>{course.duration}</span>
                    </div>
                    <div className="flex items-center space-x-2 text-xs text-slate-500">
                      <GraduationCap className="w-3.5 h-3.5 text-amber-600" />
                      <span>{course.level}</span>
                    </div>
                  </div>
                </div>

                <div className="pt-6 mt-6 border-t border-slate-100 flex items-center justify-between">
                  <button
                    onClick={() => setActivePage('courses')}
                    className="text-xs font-bold text-slate-600 hover:text-slate-900 transition-colors"
                  >
                    View Details
                  </button>

                  <button
                    onClick={() => onOpenEnrollModal(course.id)}
                    className="px-4 py-2 rounded-xl bg-slate-900 hover:bg-blue-600 text-white font-bold text-xs uppercase tracking-wider transition-all shadow-xs"
                  >
                    Enroll Now
                  </button>
                </div>
              </div>
            </TiltCard>
          ))}
        </div>
      </section>

      {/* STUDENT SUCCESS / TRUST STRIP */}
      <section className="bg-slate-900 text-white rounded-3xl mx-4 sm:mx-6 lg:mx-8 py-12 px-6 sm:px-12 shadow-xl">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            
            <div className="lg:col-span-5 space-y-4">
              <div className="text-xs font-bold uppercase tracking-wider text-blue-400">
                Track Record & Achievements
              </div>
              <h2 className="text-2xl sm:text-3xl font-bold text-white">
                Empowering Students Since 1998
              </h2>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                Whether mastering high school board Computer Applications, scoring university marks in BCA, or preparing for high-paying finance and cyber security jobs, our alumni consistently excel.
              </p>
              <div className="pt-2">
                <button
                  onClick={() => setActivePage('verify')}
                  className="px-5 py-2.5 rounded-xl bg-slate-800 border border-slate-700 text-blue-300 text-xs font-semibold hover:bg-slate-700 transition-colors inline-flex items-center space-x-2"
                >
                  <ShieldCheck className="w-4 h-4 text-blue-400" />
                  <span>Verify Student Certificates Online</span>
                </button>
              </div>
            </div>

            <div className="lg:col-span-7 grid grid-cols-2 sm:grid-cols-3 gap-4">
              <div className="p-5 rounded-2xl bg-slate-800/80 border border-slate-700 text-center">
                <Trophy className="w-8 h-8 text-amber-400 mx-auto mb-2" />
                <div className="text-2xl font-bold text-white">98%</div>
                <div className="text-xs text-slate-400 mt-1">Highest Board Score</div>
              </div>

              <div className="p-5 rounded-2xl bg-slate-800/80 border border-slate-700 text-center">
                <Users className="w-8 h-8 text-blue-400 mx-auto mb-2" />
                <div className="text-2xl font-bold text-white">5,000+</div>
                <div className="text-xs text-slate-400 mt-1">Graduates & Professionals</div>
              </div>

              <div className="p-5 rounded-2xl bg-slate-800/80 border border-slate-700 text-center col-span-2 sm:col-span-1">
                <MapPin className="w-8 h-8 text-cyan-400 mx-auto mb-2" />
                <div className="text-2xl font-bold text-white">2</div>
                <div className="text-xs text-slate-400 mt-1">Campuses (Rishra & Konnagar)</div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* INSTAGRAM SECTION */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row items-center justify-between mb-8 gap-4">
          <div>
            <div className="flex items-center space-x-2 text-xs font-bold uppercase tracking-wider text-pink-600">
              <Instagram className="w-4 h-4" />
              <span>Connect On Instagram</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 mt-1">
              Latest Campus Updates & Student Highlights
            </h2>
          </div>

          <a
            href={INSTITUTE_CONTACT.instagramUrl}
            target="_blank"
            rel="noreferrer"
            className="px-5 py-2.5 rounded-full bg-slate-900 text-white font-bold text-xs hover:bg-blue-600 transition-colors shadow-sm flex items-center space-x-2"
          >
            <Instagram className="w-4 h-4 text-pink-400" />
            <span>Follow @uniquethecomputerprofessional</span>
          </a>
        </div>

        {/* Instagram Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {INSTAGRAM_POSTS.map((post) => (
            <div key={post.id} className="bg-white border border-slate-200 rounded-2xl overflow-hidden group hover:border-pink-300 transition-colors shadow-xs">
              <div className="aspect-square relative overflow-hidden">
                <img
                  src={post.imageUrl}
                  alt="Instagram post update"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-slate-900/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center space-x-4 text-white text-xs font-bold">
                  <span className="flex items-center space-x-1">
                    <Heart className="w-4 h-4 text-pink-400 fill-current" />
                    <span>{post.likes}</span>
                  </span>
                </div>
              </div>
              <div className="p-4 space-y-2">
                <p className="text-xs text-slate-600 line-clamp-2 leading-relaxed">
                  {post.caption}
                </p>
                <div className="flex items-center justify-between text-[11px] text-slate-400 pt-1">
                  <span>{post.date}</span>
                  <a
                    href={post.postUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="text-pink-600 hover:underline flex items-center space-x-0.5 font-semibold"
                  >
                    <span>View Post</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* TESTIMONIAL TEASER */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white border border-slate-200 rounded-3xl p-8 sm:p-12 shadow-sm relative overflow-hidden">
          <div className="text-center max-w-2xl mx-auto mb-10">
            <div className="text-xs font-bold uppercase tracking-wider text-blue-600 mb-1">
              Student Testimonials
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold text-slate-900">
              What Our Alumni Say
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {testimonials.slice(0, 2).map((rev) => (
              <div key={rev.id} className="p-6 rounded-2xl bg-slate-50 border border-slate-200 space-y-4">
                <div className="flex items-center space-x-1 text-amber-500">
                  {[...Array(rev.rating)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-current" />
                  ))}
                </div>
                <p className="text-xs sm:text-sm text-slate-600 italic leading-relaxed">
                  "{rev.quote}"
                </p>
                <div className="flex items-center space-x-3 pt-2">
                  <img
                    src={rev.avatar}
                    alt={rev.name}
                    className="w-10 h-10 rounded-full object-cover border border-slate-200"
                    referrerPolicy="no-referrer"
                  />
                  <div>
                    <div className="text-sm font-bold text-slate-900">{rev.name}</div>
                    <div className="text-xs text-blue-600 font-semibold">{rev.course} • {rev.campus}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-8 text-center">
            <button
              onClick={() => setActivePage('gallery')}
              className="inline-flex items-center space-x-2 text-xs font-bold text-blue-600 hover:text-blue-700 transition-colors"
            >
              <span>See More Student Video Reviews & Photos in Gallery</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </section>

      {/* FINAL CTA BANNER */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="rounded-3xl bg-slate-900 p-8 sm:p-12 text-center text-white relative overflow-hidden shadow-xl">
          <div className="max-w-3xl mx-auto space-y-4 relative z-10">
            <span className="px-3.5 py-1 rounded-full bg-blue-900/80 text-blue-300 text-xs font-bold uppercase tracking-wider border border-blue-700/60">
              Take The Next Step
            </span>
            <h2 className="text-2xl sm:text-4xl font-bold tracking-tight text-white">
              Ready to Build Your Future in Tech?
            </h2>
            <p className="text-xs sm:text-base text-slate-300 max-w-xl mx-auto leading-relaxed">
              Book a free counselling session or attend a demo practical class at our Rishra or Konnagar campus today.
            </p>
            <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-4">
              <button
                onClick={() => onOpenEnrollModal()}
                className="w-full sm:w-auto px-8 py-3.5 rounded-full bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs uppercase tracking-wider transition-colors shadow-lg shadow-blue-600/30"
              >
                Enroll Today
              </button>
              <a
                href={`tel:${INSTITUTE_CONTACT.phone}`}
                className="w-full sm:w-auto px-8 py-3.5 rounded-full bg-slate-800 text-slate-200 border border-slate-700 font-bold text-xs uppercase tracking-wider hover:bg-slate-700 hover:text-white transition-colors flex items-center justify-center space-x-2"
              >
                <Phone className="w-4 h-4 text-blue-400" />
                <span>Call 9231660503</span>
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
