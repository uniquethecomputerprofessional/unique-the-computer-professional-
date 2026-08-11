import React, { useState } from 'react';
import { CertificateRecord } from '../types';
import { verifyCertificateRecord } from '../lib/supabase';
import { useData } from '../context/DataContext';
import { 
  ShieldCheck, Lock, Search, CheckCircle2, XCircle, 
  Printer, Phone, Loader2
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

export const VerifyPage: React.FC = () => {
  const { certificates } = useData();
  const [studentIdInput, setStudentIdInput] = useState('');
  const [searched, setSearched] = useState(false);
  const [isVerifying, setIsVerifying] = useState(false);
  const [record, setRecord] = useState<CertificateRecord | null>(null);

  const handleVerify = async (e?: React.FormEvent, customId?: string) => {
    if (e) e.preventDefault();
    const queryToUse = customId || studentIdInput;
    const cleanQ = queryToUse.trim();
    if (!cleanQ) return;

    setIsVerifying(true);
    setSearched(false);

    try {
      const res = await verifyCertificateRecord(cleanQ);
      if (res.record) {
        setRecord(res.record);
      } else {
        // Fallback: Check local DataContext certificates added via Admin Panel
        const found = certificates.find(c => 
          c.studentId.toUpperCase() === cleanQ.toUpperCase() ||
          c.certificateNo.toUpperCase() === cleanQ.toUpperCase() ||
          c.regNo.toUpperCase() === cleanQ.toUpperCase()
        );

        if (found) {
          setRecord(found);
        } else {
          setRecord(null);
        }
      }
    } catch (err) {
      console.error('Verification error:', err);
      setRecord(null);
    } finally {
      setIsVerifying(false);
      setSearched(true);
    }
  };

  const handleQuickFill = (id: string) => {
    setStudentIdInput(id);
    handleVerify(undefined, id);
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="space-y-12 pb-16">
      {/* Top Header Banner */}
      <section className="bg-slate-950 border-b border-slate-800/80 pt-12 pb-14 text-center">
        <div className="max-w-3xl mx-auto px-4 space-y-4">
          <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-emerald-950/80 border border-emerald-800/60 text-emerald-300 text-xs font-semibold">
            <Lock className="w-3.5 h-3.5 text-emerald-400" />
            <span>Official Institute Verification Portal</span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-black text-white tracking-tight">
            Verify Student Certificate
          </h1>

          <p className="text-xs sm:text-sm text-slate-300 leading-relaxed max-w-xl mx-auto">
            Employers, academic institutions, and students can authenticate official course completion certificates issued by Unique The Computer Professional (Rishra & Konnagar).
          </p>
        </div>
      </section>

      {/* Main Verification Card */}
      <section className="max-w-3xl mx-auto px-4">
        <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-10 shadow-2xl space-y-8 relative overflow-hidden">
          {/* Background Ambient Shield */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-blue-500/5 rounded-full blur-3xl pointer-events-none" />

          {/* Form Area */}
          <form onSubmit={handleVerify} className="space-y-4">
            <div className="space-y-1.5">
              <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider">
                Enter Student ID / Certificate No. / Reg No.
              </label>
              <div className="relative">
                <Search className="w-5 h-5 text-slate-400 absolute left-4 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  required
                  placeholder="e.g. UTCP-2024-892 or REG-2024-RIS-0481"
                  value={studentIdInput}
                  onChange={(e) => {
                    setStudentIdInput(e.target.value);
                    if (searched) setSearched(false);
                  }}
                  className="w-full pl-12 pr-32 py-4 rounded-2xl bg-slate-950 border border-slate-800 text-base text-white font-mono placeholder-slate-500 focus:outline-none focus:border-blue-500 transition-colors uppercase tracking-wider"
                />
                <button
                  type="submit"
                  disabled={isVerifying}
                  className="absolute right-2 top-2 bottom-2 px-6 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-bold text-xs uppercase tracking-wider hover:shadow-lg hover:shadow-blue-600/30 transition-all disabled:opacity-50 flex items-center space-x-1.5"
                  id="verify-submit-button"
                >
                  {isVerifying ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin text-white" />
                      <span>Checking...</span>
                    </>
                  ) : (
                    <span>Verify</span>
                  )}
                </button>
              </div>
            </div>

            {/* Quick Demo Sample IDs */}
            <div className="pt-2">
              <div className="text-[11px] text-slate-400 mb-2 font-medium">
                Try clicking sample Student IDs for instant demonstration:
              </div>
              <div className="flex flex-wrap gap-2">
                {[
                  'UTCP-2024-892',
                  'UTCP-2024-105',
                  'UTCP-2025-302',
                  'UTCP-2024-512'
                ].map((sampleId) => (
                  <button
                    type="button"
                    key={sampleId}
                    onClick={() => handleQuickFill(sampleId)}
                    className="px-3 py-1 rounded-lg bg-slate-950 border border-slate-800 text-xs font-mono text-blue-400 hover:text-white hover:border-blue-500 transition-colors"
                  >
                    {sampleId}
                  </button>
                ))}
              </div>
            </div>
          </form>

          {/* VERIFICATION RESULT STATE */}
          <AnimatePresence mode="wait">
            {searched && (
              <motion.div
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                transition={{ duration: 0.3 }}
              >
                {record ? (
                  /* VERIFIED SUCCESS CARD */
                  <div className="p-6 sm:p-8 rounded-2xl bg-slate-950 border-2 border-emerald-500/40 relative space-y-6 overflow-hidden">
                    
                    {/* Top Status Header */}
                    <div className="flex flex-wrap items-center justify-between gap-3 pb-6 border-b border-slate-800">
                      <div className="flex items-center space-x-3">
                        <div className="w-12 h-12 rounded-2xl bg-emerald-500/20 text-emerald-400 border border-emerald-500/40 flex items-center justify-center shrink-0">
                          <CheckCircle2 className="w-7 h-7" />
                        </div>
                        <div>
                          <div className="flex items-center space-x-2">
                            <span className="text-xs font-bold uppercase tracking-widest text-emerald-400 block">
                              Status: Authentic Record
                            </span>
                            <span className="px-2 py-0.5 rounded text-[10px] font-semibold uppercase bg-emerald-950/80 text-emerald-300 border border-emerald-800/60">
                              Verified Central Registry
                            </span>
                          </div>
                          <span className="text-lg font-black text-white">
                            {record.status}
                          </span>
                        </div>
                      </div>

                      <div className="text-right">
                        <div className="text-[11px] text-slate-400">Cert Reg No.</div>
                        <div className="text-xs font-mono text-slate-200 font-bold">{record.certificateNo}</div>
                      </div>
                    </div>

                    {/* Certificate Details Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-4">
                        <div>
                          <span className="text-[11px] uppercase font-bold text-slate-400 block">Student Name</span>
                          <span className="text-lg font-extrabold text-white">{record.studentName}</span>
                        </div>

                        <div>
                          <span className="text-[11px] uppercase font-bold text-slate-400 block">Course Completed</span>
                          <span className="text-sm font-bold text-blue-400">{record.courseName}</span>
                        </div>

                        <div>
                          <span className="text-[11px] uppercase font-bold text-slate-400 block">Campus Location</span>
                          <span className="text-xs text-slate-200 font-medium">{record.campus} Campus</span>
                        </div>
                      </div>

                      <div className="space-y-4">
                        <div>
                          <span className="text-[11px] uppercase font-bold text-slate-400 block">Final Performance Grade</span>
                          <span className="text-sm font-bold text-amber-400">{record.grade} ({record.percentage})</span>
                        </div>

                        <div>
                          <span className="text-[11px] uppercase font-bold text-slate-400 block">Issue Date / Session</span>
                          <span className="text-xs text-slate-200 font-medium">{record.issueDate} ({record.completionYear})</span>
                        </div>

                        <div>
                          <span className="text-[11px] uppercase font-bold text-slate-400 block">Student ID / Reg</span>
                          <span className="text-xs font-mono text-slate-300">{record.studentId}</span>
                        </div>
                      </div>
                    </div>

                    {/* Verified Skills Tags */}
                    <div className="pt-2">
                      <span className="text-[11px] uppercase font-bold text-slate-400 block mb-2">Verified Modules & Practical Skills</span>
                      <div className="flex flex-wrap gap-1.5">
                        {record.skillsAcquired.map((skill, i) => (
                          <span key={i} className="px-2.5 py-1 rounded-lg bg-slate-900 border border-slate-800 text-[11px] text-blue-300 font-medium">
                            ✓ {skill}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Action Bar */}
                    <div className="pt-4 border-t border-slate-800 flex flex-wrap items-center justify-between gap-3 print:hidden">
                      <div className="text-[11px] text-slate-400">
                        Official Seal of Unique The Computer Professional
                      </div>
                      <div className="flex items-center space-x-2">
                        <button
                          onClick={handlePrint}
                          className="px-4 py-2 rounded-xl bg-slate-900 border border-slate-700 text-white font-semibold text-xs hover:bg-slate-800 transition-colors flex items-center space-x-1.5"
                        >
                          <Printer className="w-3.5 h-3.5" />
                          <span>Print Certificate Summary</span>
                        </button>
                      </div>
                    </div>

                  </div>
                ) : (
                  /* NOT FOUND CARD */
                  <div className="p-8 rounded-2xl bg-slate-950 border border-rose-500/30 text-center space-y-4">
                    <div className="w-12 h-12 rounded-2xl bg-rose-500/20 text-rose-400 border border-rose-500/40 flex items-center justify-center mx-auto">
                      <XCircle className="w-7 h-7" />
                    </div>
                    <h3 className="text-xl font-bold text-white">Certificate Record Not Found</h3>
                    <p className="text-xs text-slate-300 max-w-md mx-auto leading-relaxed">
                      No matching student record was found for "<span className="text-rose-400 font-mono font-bold">{studentIdInput}</span>" in official institute archives. Please double-check the Student ID printed on the physical certificate or contact our office.
                    </p>
                    <div className="pt-2 flex items-center justify-center space-x-2 text-xs text-blue-400 font-medium">
                      <Phone className="w-3.5 h-3.5" />
                      <span>Verification Helpline: +91 9231660503</span>
                    </div>
                  </div>
                )}
              </motion.div>
            )}
          </AnimatePresence>

          {/* Verification Process Note */}
          <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 text-xs text-slate-400 space-y-2">
            <div className="flex items-center space-x-2 text-slate-200 font-bold">
              <ShieldCheck className="w-4 h-4 text-blue-400" />
              <span>How Certificate Verification Works</span>
            </div>
            <p className="leading-relaxed">
              Every graduate from Unique The Computer Professional receives a unique Student ID and Registration Number upon completion of coursework and practical laboratory examinations. All digital verification records are authenticated against official central institute registries and academic archives.
            </p>
          </div>

        </div>
      </section>
    </div>
  );
};

