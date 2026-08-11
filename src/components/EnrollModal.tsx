import React, { useState, useEffect } from 'react';
import { CAMPUSES } from '../data/instituteData';
import { useData } from '../context/DataContext';
import { EnrollmentFormData } from '../types';
import { X, CheckCircle2, Sparkles, Send, Phone, MapPin, BookOpen } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface EnrollModalProps {
  isOpen: boolean;
  onClose: () => void;
  selectedCourseId?: string;
}

export const EnrollModal: React.FC<EnrollModalProps> = ({
  isOpen,
  onClose,
  selectedCourseId
}) => {
  const { courses, addEnrollment } = useData();
  const defaultCourseId = selectedCourseId || (courses.length > 0 ? courses[0].id : '');

  const [formData, setFormData] = useState<EnrollmentFormData>({
    studentName: '',
    phone: '',
    email: '',
    campus: 'Rishra',
    courseId: defaultCourseId,
    standardOrQualification: 'High School / Class XI-XII',
    message: ''
  });

  const [isSubmitted, setIsSubmitted] = useState(false);

  useEffect(() => {
    if (selectedCourseId) {
      setFormData(prev => ({ ...prev, courseId: selectedCourseId }));
    } else if (courses.length > 0 && !formData.courseId) {
      setFormData(prev => ({ ...prev, courseId: courses[0].id }));
    }
  }, [selectedCourseId, courses]);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    addEnrollment(formData);
    setIsSubmitted(true);
  };

  const handleReset = () => {
    setIsSubmitted(false);
    onClose();
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md overflow-y-auto">
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 10 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 10 }}
          className="relative w-full max-w-lg bg-white border border-slate-200 rounded-3xl p-6 sm:p-8 shadow-2xl text-slate-900 my-8 overflow-hidden"
        >
          {/* Top Background Decor */}
          <div className="absolute -top-12 -right-12 w-48 h-48 bg-blue-50 rounded-full blur-2xl pointer-events-none" />

          {/* Close Button */}
          <button
            onClick={onClose}
            className="absolute top-5 right-5 p-2 rounded-full bg-slate-100 text-slate-500 hover:text-slate-900 hover:bg-slate-200 transition-colors"
            id="close-enroll-modal"
          >
            <X className="w-5 h-5" />
          </button>

          {!isSubmitted ? (
            <div>
              <div className="flex items-center space-x-2 text-blue-600 text-xs font-bold uppercase tracking-wider mb-1">
                <Sparkles className="w-4 h-4" />
                <span>Admissions & Demo Session</span>
              </div>
              <h3 className="text-xl sm:text-2xl font-bold text-slate-900">
                Enroll / Book a Free Demo Class
              </h3>
              <p className="text-xs text-slate-500 mt-1 mb-6">
                Fill out this quick form and our counseling team at Rishra & Konnagar will reach out within 2 hours.
              </p>

              <form onSubmit={handleSubmit} className="space-y-4">
                {/* Full Name */}
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Student Full Name <span className="text-blue-600">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Rahul Mukherjee"
                    value={formData.studentName}
                    onChange={(e) => setFormData({ ...formData, studentName: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-sm text-slate-900 focus:outline-none focus:border-blue-600 focus:bg-white transition-colors"
                  />
                </div>

                {/* Phone & Email Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      Phone Number <span className="text-blue-600">*</span>
                    </label>
                    <input
                      type="tel"
                      required
                      placeholder="e.g. 9830000000"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className="w-full px-4 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-sm text-slate-900 focus:outline-none focus:border-blue-600 focus:bg-white transition-colors"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      Email Address
                    </label>
                    <input
                      type="email"
                      placeholder="e.g. rahul@gmail.com"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full px-4 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-sm text-slate-900 focus:outline-none focus:border-blue-600 focus:bg-white transition-colors"
                    />
                  </div>
                </div>

                {/* Preferred Campus */}
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Preferred Campus Location <span className="text-blue-600">*</span>
                  </label>
                  <div className="grid grid-cols-3 gap-2">
                    {[
                      { id: 'Rishra', label: 'Rishra Campus' },
                      { id: 'Konnagar', label: 'Konnagar Campus' },
                      { id: 'Either Campus', label: 'Either Campus' }
                    ].map(camp => (
                      <button
                        type="button"
                        key={camp.id}
                        onClick={() => setFormData({ ...formData, campus: camp.id as any })}
                        className={`py-2 px-3 rounded-xl text-xs font-semibold border text-center transition-all ${
                          formData.campus === camp.id
                            ? 'bg-blue-600 text-white border-blue-600 shadow-sm'
                            : 'bg-slate-50 text-slate-600 border-slate-200 hover:text-slate-900'
                        }`}
                      >
                        {camp.label}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Preferred Course */}
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Select Course <span className="text-blue-600">*</span>
                  </label>
                  <select
                    value={formData.courseId}
                    onChange={(e) => setFormData({ ...formData, courseId: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-sm text-slate-900 focus:outline-none focus:border-blue-600 focus:bg-white transition-colors"
                  >
                    {courses.map(course => (
                      <option key={course.id} value={course.id}>
                        {course.name} ({course.categoryLabel})
                      </option>
                    ))}
                  </select>
                </div>

                {/* Qualification / Standard */}
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Current Standard / Academic Qualification
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. Class 11 (WB Board) / BCA 1st Sem / Graduate"
                    value={formData.standardOrQualification}
                    onChange={(e) => setFormData({ ...formData, standardOrQualification: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-sm text-slate-900 focus:outline-none focus:border-blue-600 focus:bg-white transition-colors"
                  />
                </div>

                {/* Extra Note / Message */}
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Any specific question or timing preference?
                  </label>
                  <textarea
                    rows={2}
                    placeholder="e.g. Interested in morning batch at Konnagar campus..."
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-sm text-slate-900 focus:outline-none focus:border-blue-600 focus:bg-white transition-colors resize-none"
                  />
                </div>

                {/* Submit CTA */}
                <button
                  type="submit"
                  className="w-full py-3.5 rounded-xl bg-slate-900 hover:bg-blue-600 text-white font-bold text-xs uppercase tracking-wider shadow-lg shadow-slate-900/10 transition-all flex items-center justify-center space-x-2"
                >
                  <Send className="w-4 h-4" />
                  <span>Submit Enrollment Inquiry</span>
                </button>
              </form>
            </div>
          ) : (
            <div className="py-6 text-center space-y-4">
              <div className="w-16 h-16 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-600 flex items-center justify-center mx-auto">
                <CheckCircle2 className="w-10 h-10" />
              </div>
              <h3 className="text-2xl font-bold text-slate-900">Inquiry Received!</h3>
              <p className="text-sm text-slate-600 leading-relaxed max-w-sm mx-auto">
                Thank you <span className="text-blue-600 font-bold">{formData.studentName}</span>! Our faculty team at <span className="text-slate-900 font-bold">{formData.campus}</span> will call you shortly at <span className="text-slate-900 font-bold">{formData.phone}</span> with batch details.
              </p>

              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 text-xs text-slate-600 space-y-1.5 text-left max-w-sm mx-auto">
                <div className="text-slate-900 font-bold mb-1">Reference Confirmation:</div>
                <div className="flex justify-between">
                  <span>Selected Course:</span>
                  <span className="text-slate-900 font-semibold">
                    {courses.find(c => c.id === formData.courseId)?.name || 'Computer Training Course'}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span>Preferred Campus:</span>
                  <span className="text-slate-900 font-semibold">{formData.campus}</span>
                </div>
                <div className="flex justify-between">
                  <span>Direct Help Line:</span>
                  <span className="text-blue-600 font-semibold">9231660503</span>
                </div>
              </div>

              <button
                onClick={handleReset}
                className="px-6 py-2.5 rounded-xl bg-slate-100 text-slate-700 font-semibold text-xs hover:bg-slate-200 transition-colors"
              >
                Close Window
              </button>
            </div>
          )}
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
