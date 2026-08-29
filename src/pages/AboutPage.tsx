import React from 'react';
import { PageType } from '../types';
import { CAMPUSES, INSTITUTE_CONTACT, FACULTY_MEMBERS } from '../data/instituteData';
import { TiltCard } from '../components/TiltCard';
import { 
  Sparkles, Award, Users, GraduationCap, MapPin, 
  Target, HeartHandshake, CheckCircle2, Play, ArrowRight, ShieldCheck,
  BookOpen, CheckCircle, Clock, UserCheck
} from 'lucide-react';

interface AboutPageProps {
  setActivePage: (page: PageType) => void;
  onOpenVideoModal: (videoId: string) => void;
  onOpenEnrollModal: () => void;
}

export const AboutPage: React.FC<AboutPageProps> = ({
  setActivePage,
  onOpenVideoModal,
  onOpenEnrollModal
}) => {
  return (
    <div className="space-y-20 pb-16">
      {/* Header Banner */}
      <section className="bg-slate-900 border-b border-slate-800 pt-12 pb-16 text-center text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-4">
          <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-slate-800 border border-slate-700 text-blue-300 text-xs font-semibold">
            <Sparkles className="w-3.5 h-3.5 text-blue-400" />
            <span>Established 1998 • Rishra & Konnagar</span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-bold text-white tracking-tight">
            About Unique The Computer Professional
          </h1>

          <p className="text-xs sm:text-base text-slate-300 max-w-2xl mx-auto leading-relaxed">
            Dedicated to transforming computer education through individual student attention, modern practical laboratories, and career-first guidance.
          </p>
        </div>
      </section>

      {/* 1. INSTITUTE STORY NARRATIVE */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          <div className="lg:col-span-6 space-y-6">
            <div className="text-xs font-bold uppercase tracking-wider text-blue-600">
              Our Journey & Purpose
            </div>
            <h2 className="text-2xl sm:text-4xl font-bold text-slate-900 leading-tight">
              Over 25 Years of Dedicated Computer Mentorship
            </h2>
            
            <div className="space-y-4 text-xs sm:text-sm text-slate-600 leading-relaxed">
              <p>
                Founded with a vision to bridge the gap between theoretical classroom learning and real-world technology demands, <strong className="text-slate-900">Unique The Computer Professional</strong> has grown into Hooghly's premier computer education institute.
              </p>
              <p>
                Unlike generic coaching centers that pack hundreds of students into single lecture halls, we maintain strict small batch limits and a 1-Student 1-PC lab ratio. Every learner receives direct, hands-on guidance tailored to their exact speed of comprehension.
              </p>
              <p>
                From school board students in Classes XI & XII aiming for top marks in Computer Applications, to university undergraduates navigating BCA semester subjects and job seekers mastering Tally GST & Cyber Security, our faculty stands by every student until concepts are fully mastered.
              </p>
            </div>

            <div className="pt-2 flex flex-wrap items-center gap-6 text-xs font-bold text-slate-700">
              <div className="flex items-center space-x-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                <span>26+ Years Teaching Legacy</span>
              </div>
              <div className="flex items-center space-x-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                <span>5,000+ Alumni</span>
              </div>
              <div className="flex items-center space-x-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                <span>Dual Campus Presence</span>
              </div>
            </div>
          </div>

          <div className="lg:col-span-6">
            <TiltCard>
              <div className="relative rounded-3xl overflow-hidden bg-white border border-slate-200 p-4 shadow-xl">
                <img
                  src="https://lh3.googleusercontent.com/d/1idMprOWSTuIeVtRL0C1RnO7e02MBlYOh"
                  alt="Unique The Computer Professional Journey"
                  className="w-full aspect-[4/3] object-cover rounded-2xl"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent opacity-80" />
                
                <div className="absolute bottom-6 left-6 right-6 p-4 rounded-2xl bg-white/95 backdrop-blur-md border border-slate-200 text-slate-900 shadow-lg space-y-1">
                  <div className="text-xs font-bold text-blue-600">Practical Computer Mentorship Since 1998</div>
                  <div className="text-sm font-bold">1-on-1 Workstation Guidance at Rishra & Konnagar</div>
                </div>
              </div>
            </TiltCard>
          </div>

        </div>
      </section>

      {/* 2. MISSION & APPROACH */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-xl mx-auto mb-12">
          <div className="text-xs font-bold uppercase tracking-wider text-blue-600 mb-1">
            Core Philosophy
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold text-slate-900">
            Our Mission & Academic Approach
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="p-8 rounded-3xl bg-white border border-slate-200 space-y-4 shadow-xs">
            <div className="w-12 h-12 rounded-2xl bg-blue-50 text-blue-600 border border-blue-100 flex items-center justify-center">
              <HeartHandshake className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-slate-900">Personalized 1-on-1 Attention</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Every student learns at a unique pace. Our individual workstation model ensures faculty members resolve doubts instantly in real-time during class practicals.
            </p>
          </div>

          <div className="p-8 rounded-3xl bg-white border border-slate-200 space-y-4 shadow-xs">
            <div className="w-12 h-12 rounded-2xl bg-amber-50 text-amber-600 border border-amber-100 flex items-center justify-center">
              <Target className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-slate-900">Career-Oriented Skill Mastery</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              We focus on job relevance. Whether writing C++ algorithms, configuring Tally GST ledgers, or performing ethical network audits, students build real skills.
            </p>
          </div>

          <div className="p-8 rounded-3xl bg-white border border-slate-200 space-y-4 shadow-xs">
            <div className="w-12 h-12 rounded-2xl bg-cyan-50 text-cyan-600 border border-cyan-100 flex items-center justify-center">
              <GraduationCap className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-slate-900">Comprehensive Curriculum Depth</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Supporting students seamlessly from ICSE, CBSE, ISC, and West Bengal Board school exams up to university BCA degree programs and corporate IT certifications.
            </p>
          </div>
        </div>
      </section>

      {/* 3. FOUNDER & FACULTY SPOTLIGHT */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-slate-900 text-white rounded-3xl p-8 sm:p-12 relative overflow-hidden shadow-xl">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            
            <div className="lg:col-span-5 relative">
              <div className="aspect-square rounded-2xl overflow-hidden bg-slate-950 border border-slate-800 relative group">
                <img
                  src="https://lh3.googleusercontent.com/d/1i_eUvNy6tvHcrSNYcPfVETxlQkBr2NL5"
                  alt="Founder Address"
                  className="w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                />
                <button
                  onClick={() => onOpenVideoModal('founder-desk')}
                  className="absolute inset-0 bg-slate-950/40 flex flex-col items-center justify-center group-hover:bg-slate-950/20 transition-colors"
                >
                  <div className="w-16 h-16 rounded-full bg-blue-600 border-2 border-white text-white flex items-center justify-center shadow-2xl hover:scale-110 transition-transform">
                    <Play className="w-8 h-8 fill-current ml-1" />
                  </div>
                  <span className="mt-2 text-xs font-bold text-white">Click to Watch Founder's Message</span>
                </button>
              </div>
            </div>

            <div className="lg:col-span-7 space-y-4">
              <div className="text-xs font-bold uppercase tracking-wider text-blue-400">
                Message From Founder's Desk
              </div>
              <h2 className="text-2xl sm:text-3xl font-bold text-white">
                "Our Goal is Building Confidence Through Coding & Technology"
              </h2>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed italic">
                "Computer science is not about memorizing code syntax — it is about learning how to break down complex problems logically. At Unique The Computer Professional, we take pride in seeing every student gain total confidence on the keyboard."
              </p>
              <div className="pt-2">
                <div className="text-sm font-bold text-white">Mr. Sunil Singh</div>
                <div className="text-xs text-blue-400 font-semibold">Founder & Academic Director, Unique The Computer Professional</div>
              </div>
              <div className="pt-4">
                <button
                  onClick={() => onOpenVideoModal('founder-desk')}
                  className="px-5 py-2.5 rounded-xl bg-blue-600 text-white font-bold text-xs uppercase tracking-wider hover:bg-blue-500 transition-colors inline-flex items-center space-x-2"
                >
                  <Play className="w-4 h-4 fill-current" />
                  <span>Watch Founder Video Address</span>
                </button>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 4. FACULTY MEMBERS (4 INSTRUCTORS) */}
      <section id="faculty-members-section" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="text-center max-w-2xl mx-auto space-y-2">
          <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-blue-50 border border-blue-200 text-blue-700 text-xs font-semibold">
            <Users className="w-3.5 h-3.5 text-blue-600" />
            <span>Academic Mentors & Lab Instructors</span>
          </div>
          <h2 className="text-2xl sm:text-4xl font-bold text-slate-900 tracking-tight">
            Meet Our 4 Expert Faculty Members
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
            Our dedicated team of 4 senior professors, systems specialists, and accounting practitioners provide individual 1-on-1 computer workstation coaching across both Rishra and Konnagar campuses.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8">
          {FACULTY_MEMBERS.map((faculty) => (
            <div 
              key={faculty.id}
              id={`faculty-card-${faculty.id}`}
              className="bg-white border border-slate-200 rounded-3xl p-6 sm:p-7 shadow-xs hover:shadow-xl transition-all duration-300 flex flex-col justify-between group"
            >
              <div className="space-y-5">
                {/* Large Portrait Image & Primary Details */}
                <div className="flex flex-col sm:flex-row gap-5 items-start">
                  <div className="relative w-full sm:w-48 md:w-52 aspect-[4/4] sm:aspect-[3/4] shrink-0 rounded-2xl overflow-hidden bg-slate-100 border border-slate-200 shadow-sm">
                    <img
                      src={faculty.avatar}
                      alt={faculty.name}
                      className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-500"
                      referrerPolicy="no-referrer"
                    />
                    <div className="absolute top-3 left-3">
                      <span className="inline-flex items-center space-x-1 px-2.5 py-1 rounded-full bg-white/95 backdrop-blur-xs text-blue-700 text-[11px] font-bold shadow-xs">
                        <Clock className="w-3 h-3 text-blue-600" />
                        <span>{faculty.experience}</span>
                      </span>
                    </div>
                  </div>

                  <div className="space-y-2.5 flex-1 min-w-0">
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="inline-flex items-center space-x-1 px-2.5 py-0.5 rounded-full bg-slate-100 text-slate-700 text-[11px] font-medium">
                        <GraduationCap className="w-3.5 h-3.5 text-slate-500" />
                        <span>{faculty.qualification}</span>
                      </span>
                    </div>

                    <div>
                      <h3 className="text-xl sm:text-2xl font-bold text-slate-900 leading-snug">
                        {faculty.name}
                      </h3>
                      <p className="text-xs sm:text-sm font-semibold text-blue-600 mt-0.5">
                        {faculty.designation}
                      </p>
                    </div>

                    <div className="space-y-1.5 pt-2 border-t border-slate-100 text-xs">
                      <div className="flex items-start space-x-1.5 text-slate-700 font-medium">
                        <Target className="w-3.5 h-3.5 text-amber-600 shrink-0 mt-0.5" />
                        <span><strong>Focus:</strong> {faculty.specialization}</span>
                      </div>
                      <div className="flex items-center space-x-1.5 text-[11px] text-slate-500 font-medium">
                        <MapPin className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                        <span>Available at: {faculty.campusAvailability}</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Bio */}
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                  {faculty.bio}
                </p>

                {/* Key Subjects Taught */}
                <div className="space-y-2 pt-1">
                  <div className="text-[11px] font-bold uppercase tracking-wider text-slate-500 flex items-center space-x-1">
                    <BookOpen className="w-3 h-3 text-slate-400" />
                    <span>Key Subjects & Guidance:</span>
                  </div>
                  <div className="flex flex-wrap gap-1.5">
                    {faculty.keySubjects.map((sub, idx) => (
                      <span
                        key={idx}
                        className="px-2.5 py-1 rounded-lg bg-slate-50 hover:bg-blue-50 text-slate-700 hover:text-blue-700 text-xs font-medium border border-slate-200/80 transition-colors"
                      >
                        {sub}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Card Footer Button */}
              <div className="pt-4 mt-4 border-t border-slate-100 flex items-center justify-between">
                <div className="flex items-center space-x-1.5 text-xs font-medium text-emerald-700">
                  <CheckCircle className="w-3.5 h-3.5 text-emerald-600" />
                  <span>1-on-1 Practical Doubt Clearing</span>
                </div>
                <button
                  id={`faculty-enquire-btn-${faculty.id}`}
                  onClick={onOpenEnrollModal}
                  className="px-4 py-2 rounded-xl bg-slate-900 hover:bg-blue-600 text-white text-xs font-bold flex items-center space-x-1.5 transition-colors shadow-xs"
                >
                  <UserCheck className="w-3.5 h-3.5" />
                  <span>Request Mentorship</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 5. TWO CAMPUSES REACH */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        <div className="text-center max-w-xl mx-auto">
          <div className="text-xs font-bold uppercase tracking-wider text-blue-600 mb-1">
            Convenient Locations
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold text-slate-900">
            Serving Rishra & Konnagar Students
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {CAMPUSES.map((camp) => (
            <div key={camp.id} className="p-6 rounded-2xl bg-white border border-slate-200 space-y-3 shadow-xs">
              <div className="flex items-center space-x-2 text-slate-900 font-bold text-lg">
                <MapPin className="w-5 h-5 text-blue-600" />
                <span>{camp.name}</span>
              </div>
              <p className="text-xs text-slate-600 leading-relaxed">{camp.address}</p>
              <div className="text-[11px] text-slate-500 font-medium">Landmark: {camp.landmark}</div>
              <div className="pt-2">
                <button
                  onClick={() => setActivePage('visit')}
                  className="text-xs font-bold text-blue-600 hover:underline flex items-center space-x-1"
                >
                  <span>View Campus Details & Maps</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* BOTTOM CTA */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="bg-slate-900 border border-slate-800 rounded-3xl p-10 space-y-4 text-white shadow-xl">
          <h2 className="text-2xl sm:text-3xl font-bold text-white">
            Meet Us In Person — Visit Our Campus
          </h2>
          <p className="text-xs sm:text-sm text-slate-300 max-w-md mx-auto leading-relaxed">
            Walk in for a friendly chat, inspect our computer labs, and experience our faculty support firsthand.
          </p>
          <button
            onClick={() => setActivePage('visit')}
            className="px-8 py-3.5 rounded-full bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs uppercase tracking-wider transition-all shadow-md shadow-blue-600/30"
          >
            Visit Our Campus
          </button>
        </div>
      </section>
    </div>
  );
};
