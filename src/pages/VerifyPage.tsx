import React, { useState } from 'react';
import { CertificateRecord } from '../types';
import { verifyCertificateRecord, isSupabaseConfigured } from '../lib/supabase';
import { useData } from '../context/DataContext';
import { 
  ShieldCheck, Lock, Search, CheckCircle2, XCircle, 
  Printer, Phone, Database, Server, Loader2, Copy, Check, ChevronDown, ChevronUp, Code
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

export const VerifyPage: React.FC = () => {
  const { certificates } = useData();
  const [studentIdInput, setStudentIdInput] = useState('');
  const [searched, setSearched] = useState(false);
  const [isVerifying, setIsVerifying] = useState(false);
  const [record, setRecord] = useState<CertificateRecord | null>(null);
  const [dataDataSource, setDataDataSource] = useState<'supabase' | 'local' | 'none'>('none');
  const [showSqlGuide, setShowSqlGuide] = useState(false);
  const [copiedSql, setCopiedSql] = useState(false);

  const isConfigured = isSupabaseConfigured();

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
        setDataDataSource(res.source);
      } else {
        // Fallback: Check local DataContext certificates added via Admin Panel
        const found = certificates.find(c => 
          c.studentId.toUpperCase() === cleanQ.toUpperCase() ||
          c.certificateNo.toUpperCase() === cleanQ.toUpperCase() ||
          c.regNo.toUpperCase() === cleanQ.toUpperCase()
        );

        if (found) {
          setRecord(found);
          setDataDataSource('local');
        } else {
          setRecord(null);
          setDataDataSource('none');
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

  const sampleSql = `-- 1. Create the 'certificates' table in your Supabase SQL Editor
CREATE TABLE public.certificates (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  student_id TEXT UNIQUE NOT NULL,
  student_name TEXT NOT NULL,
  course_name TEXT NOT NULL,
  campus TEXT DEFAULT 'Rishra',
  issue_date TEXT NOT NULL,
  completion_year TEXT NOT NULL,
  grade TEXT DEFAULT 'A+',
  percentage TEXT DEFAULT '90%',
  status TEXT DEFAULT 'Verified & Authentic',
  certificate_no TEXT UNIQUE NOT NULL,
  reg_no TEXT UNIQUE NOT NULL,
  skills_acquired JSONB DEFAULT '[]'::jsonb,
  avatar_url TEXT,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- 2. Enable Row Level Security (RLS) & allow anonymous read queries for verification
ALTER TABLE public.certificates ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Allow public read access for student certificate verification"
ON public.certificates FOR SELECT USING (true);

-- 3. Insert sample student certificate records
INSERT INTO public.certificates (
  student_id, student_name, course_name, campus, issue_date, 
  completion_year, grade, percentage, status, certificate_no, reg_no, skills_acquired
) VALUES 
('UTCP-2024-892', 'Subhadip Chatterjee', 'Python 3 Masterclass', 'Rishra', '15-Jan-2025', '2024-2025', 'A+ (Excellence)', '92.5%', 'Verified & Authentic', 'UTCP/CERT/2025/0892', 'REG-2024-RIS-0481', '["Python 3", "OOP", "Data Analysis", "SQLite Integration", "File Automation"]'::jsonb),
('UTCP-2024-105', 'Priyanka Das', 'Ethical Hacking & Cyber Security', 'Konnagar', '10-Dec-2024', '2024', 'O (Outstanding)', '96.0%', 'Verified & Authentic', 'UTCP/CERT/2024/0105', 'REG-2024-KON-0112', '["Network Penetration", "Kali Linux", "Nmap", "Metasploit", "OWASP Security"]'::jsonb);`;

  const copySqlToClipboard = () => {
    navigator.clipboard.writeText(sampleSql);
    setCopiedSql(true);
    setTimeout(() => setCopiedSql(false), 2500);
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

          {/* Supabase Connection Status Pill */}
          <div className="pt-2 flex items-center justify-center space-x-3">
            <div className={`inline-flex items-center space-x-2 px-3 py-1 rounded-full border text-xs font-medium ${
              isConfigured 
                ? 'bg-blue-950/80 border-blue-700/80 text-blue-300' 
                : 'bg-amber-950/80 border-amber-800/80 text-amber-300'
            }`}>
              <Database className="w-3.5 h-3.5" />
              <span>
                Supabase Backend: {isConfigured ? 'Connected & Active' : 'Demo Fallback Mode'}
              </span>
            </div>

            <button
              onClick={() => setShowSqlGuide(!showSqlGuide)}
              className="inline-flex items-center space-x-1.5 text-xs text-slate-400 hover:text-white underline transition-colors"
            >
              <Code className="w-3.5 h-3.5 text-blue-400" />
              <span>{showSqlGuide ? 'Hide Supabase Setup Guide' : 'View Supabase Setup SQL'}</span>
              {showSqlGuide ? <ChevronUp className="w-3 h-3" /> : <ChevronDown className="w-3 h-3" />}
            </button>
          </div>
        </div>
      </section>

      {/* Supabase Setup Accordion / Guide */}
      <AnimatePresence>
        {showSqlGuide && (
          <motion.section 
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="max-w-3xl mx-auto px-4 overflow-hidden"
          >
            <div className="bg-slate-900 border border-blue-900/60 rounded-2xl p-6 text-slate-300 space-y-4">
              <div className="flex items-center justify-between pb-3 border-b border-slate-800">
                <div className="flex items-center space-x-2 text-white font-bold text-sm">
                  <Server className="w-4 h-4 text-blue-400" />
                  <span>How to Connect Supabase to Veryfi / Verification Page</span>
                </div>
                <button
                  onClick={copySqlToClipboard}
                  className="px-3 py-1.5 rounded-lg bg-blue-600 hover:bg-blue-500 text-white text-xs font-semibold flex items-center space-x-1.5 transition-colors"
                >
                  {copiedSql ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                  <span>{copiedSql ? 'Copied SQL!' : 'Copy SQL Schema'}</span>
                </button>
              </div>

              <ol className="text-xs space-y-2 list-decimal list-inside text-slate-300 leading-relaxed">
                <li>Create a free project at <strong className="text-white">supabase.com</strong>.</li>
                <li>Go to <strong className="text-white">SQL Editor</strong> in your Supabase dashboard and run the SQL query below to create the <code className="bg-slate-950 px-1 py-0.5 rounded text-blue-300 font-mono">certificates</code> table.</li>
                <li>In your Supabase project settings, copy <strong className="text-white">Project URL</strong> and <strong className="text-white">anon public key</strong>.</li>
                <li>Set <code className="bg-slate-950 px-1.5 py-0.5 rounded text-blue-300 font-mono">VITE_SUPABASE_URL</code> and <code className="bg-slate-950 px-1.5 py-0.5 rounded text-blue-300 font-mono">VITE_SUPABASE_ANON_KEY</code> in environment variables / AI Studio settings.</li>
              </ol>

              <div className="relative">
                <pre className="bg-slate-950 border border-slate-800 rounded-xl p-4 text-[11px] font-mono text-emerald-400 overflow-x-auto max-h-56 no-scrollbar">
                  {sampleSql}
                </pre>
              </div>
            </div>
          </motion.section>
        )}
      </AnimatePresence>

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
                            <span className={`px-2 py-0.5 rounded text-[10px] font-semibold uppercase ${
                              dataDataSource === 'supabase'
                                ? 'bg-blue-900/60 text-blue-300 border border-blue-700/50'
                                : 'bg-slate-800 text-slate-300'
                            }`}>
                              Source: {dataDataSource === 'supabase' ? 'Supabase Live DB' : 'Institute Archive'}
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
                      No matching student record was found for "<span className="text-rose-400 font-mono font-bold">{studentIdInput}</span>" {isConfigured ? 'in Supabase database or local archives' : 'in institute archives'}. Please double-check the Student ID printed on the physical certificate or contact our office.
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
              Every graduate from Unique The Computer Professional receives a unique Student ID and Registration Number upon completion of coursework and practical laboratory examinations. All digital verification records are cryptographically verified against Supabase database archives and institute records.
            </p>
          </div>

        </div>
      </section>
    </div>
  );
};

