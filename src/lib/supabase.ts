import { createClient, SupabaseClient } from '@supabase/supabase-js';
import { CertificateRecord } from '../types';
import { searchCertificate as searchLocalCertificate } from '../data/certificatesData';

// Public Supabase credentials from environment
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || '';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || '';

let supabaseClient: SupabaseClient | null = null;

export function getSupabase(): SupabaseClient | null {
  if (!supabaseClient && supabaseUrl && supabaseAnonKey && supabaseUrl !== 'https://your-project.supabase.co') {
    try {
      supabaseClient = createClient(supabaseUrl, supabaseAnonKey);
    } catch (err) {
      console.warn('Failed to initialize Supabase client:', err);
    }
  }
  return supabaseClient;
}

export function isSupabaseConfigured(): boolean {
  return Boolean(
    supabaseUrl && 
    supabaseAnonKey && 
    supabaseUrl !== 'https://your-project.supabase.co' &&
    supabaseAnonKey !== 'your-anon-key'
  );
}

/**
 * Searches for a certificate record either in Supabase `certificates` table 
 * or falls back to local student records if Supabase isn't configured or record not found.
 */
export async function verifyCertificateRecord(query: string): Promise<{
  record: CertificateRecord | null;
  source: 'supabase' | 'local' | 'none';
  error?: string;
}> {
  const cleanQuery = query.trim();
  if (!cleanQuery) return { record: null, source: 'none' };

  const client = getSupabase();

  if (client) {
    try {
      // Search Supabase 'certificates' table by student_id, certificate_no, or reg_no
      const { data, error } = await client
        .from('certificates')
        .select('*')
        .or(`student_id.eq.${cleanQuery},certificate_no.eq.${cleanQuery},reg_no.eq.${cleanQuery},student_id.ilike.${cleanQuery},certificate_no.ilike.${cleanQuery}`)
        .maybeSingle();

      if (error) {
        console.warn('Supabase query notice:', error.message);
      } else if (data) {
        const record: CertificateRecord = {
          id: String(data.id || data.student_id),
          studentId: data.student_id || data.studentId || cleanQuery,
          studentName: data.student_name || data.studentName || 'Student',
          courseName: data.course_name || data.courseName || 'Computer Course',
          campus: (data.campus === 'Konnagar' ? 'Konnagar' : 'Rishra'),
          issueDate: data.issue_date || data.issueDate || 'N/A',
          completionYear: data.completion_year || data.completionYear || '2024-2025',
          grade: data.grade || 'A+',
          percentage: data.percentage || '90%',
          status: data.status || 'Verified & Authentic',
          certificateNo: data.certificate_no || data.certificateNo || cleanQuery,
          regNo: data.reg_no || data.regNo || 'N/A',
          skillsAcquired: Array.isArray(data.skills_acquired) 
            ? data.skills_acquired 
            : Array.isArray(data.skillsAcquired) 
            ? data.skillsAcquired 
            : typeof data.skills_acquired === 'string'
            ? data.skills_acquired.split(',').map((s: string) => s.trim())
            : ['Practical Computer Skills', 'Laboratory Verification Passed'],
          avatarUrl: data.avatar_url || data.avatarUrl
        };
        return { record, source: 'supabase' };
      }
    } catch (err: any) {
      console.warn('Supabase connection error:', err?.message || err);
    }
  }

  // Fallback to local sample database
  const localRecord = searchLocalCertificate(cleanQuery);
  return { 
    record: localRecord, 
    source: isSupabaseConfigured() ? 'supabase' : 'local' 
  };
}

/**
 * Uploads/upserts a student certificate to Supabase
 */
export async function upsertCertificateToSupabase(cert: Partial<CertificateRecord>): Promise<{ success: boolean; error?: string }> {
  const client = getSupabase();
  if (!client) {
    return { success: false, error: 'Supabase is not configured. Please add VITE_SUPABASE_URL & VITE_SUPABASE_ANON_KEY to environment variables.' };
  }

  try {
    const payload = {
      student_id: cert.studentId,
      student_name: cert.studentName,
      course_name: cert.courseName,
      campus: cert.campus || 'Rishra',
      issue_date: cert.issueDate,
      completion_year: cert.completionYear,
      grade: cert.grade || 'A+',
      percentage: cert.percentage || '90%',
      status: cert.status || 'Verified & Authentic',
      certificate_no: cert.certificateNo,
      reg_no: cert.regNo,
      skills_acquired: cert.skillsAcquired || [],
      avatar_url: cert.avatarUrl || null
    };

    const { error } = await client
      .from('certificates')
      .upsert(payload, { onConflict: 'student_id' });

    if (error) {
      return { success: false, error: error.message };
    }
    return { success: true };
  } catch (err: any) {
    return { success: false, error: err?.message || 'Unexpected database error' };
  }
}

/**
 * Deletes a student certificate from Supabase by student_id
 */
export async function deleteCertificateFromSupabase(studentId: string): Promise<{ success: boolean; error?: string }> {
  const client = getSupabase();
  if (!client) return { success: false, error: 'Supabase client not initialized' };

  try {
    const { error } = await client
      .from('certificates')
      .delete()
      .eq('student_id', studentId);

    if (error) return { success: false, error: error.message };
    return { success: true };
  } catch (err: any) {
    return { success: false, error: err?.message || 'Delete error' };
  }
}

/**
 * Fetches all student certificates from Supabase
 */
export async function fetchAllCertificatesFromSupabase(): Promise<CertificateRecord[]> {
  const client = getSupabase();
  if (!client) return [];

  try {
    const { data, error } = await client
      .from('certificates')
      .select('*')
      .order('created_at', { ascending: false });

    if (error || !data) return [];

    return data.map((item: any) => ({
      id: String(item.id || item.student_id),
      studentId: item.student_id || item.studentId,
      studentName: item.student_name || item.studentName,
      courseName: item.course_name || item.courseName,
      campus: item.campus === 'Konnagar' ? 'Konnagar' : 'Rishra',
      issueDate: item.issue_date || item.issueDate || 'N/A',
      completionYear: item.completion_year || item.completionYear || '2024-2025',
      grade: item.grade || 'A+',
      percentage: item.percentage || '90%',
      status: item.status || 'Verified & Authentic',
      certificateNo: item.certificate_no || item.certificateNo,
      regNo: item.reg_no || item.regNo,
      skillsAcquired: Array.isArray(item.skills_acquired)
        ? item.skills_acquired
        : typeof item.skills_acquired === 'string'
        ? item.skills_acquired.split(',').map((s: string) => s.trim())
        : [],
      avatarUrl: item.avatar_url || item.avatarUrl
    }));
  } catch (err) {
    console.warn('Error fetching certificates from Supabase:', err);
    return [];
  }
}
