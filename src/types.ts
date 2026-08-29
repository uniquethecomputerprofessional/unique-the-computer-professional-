export type PageType = 'home' | 'courses' | 'gallery' | 'verify' | 'about' | 'visit' | 'admin';

export type CourseCategory = 
  | 'school' 
  | 'degree' 
  | 'programming' 
  | 'finance' 
  | 'specialization';

export interface CourseItem {
  id: string;
  name: string;
  category: CourseCategory;
  categoryLabel: string;
  shortDesc: string;
  fullDesc: string;
  duration: string;
  level: string;
  prerequisites: string;
  highlights: string[];
  syllabus: string[];
  isPopular?: boolean;
  iconName: string;
  badge?: string;
}

export interface CertificateRecord {
  id: string;
  studentId: string;
  studentName: string;
  courseName: string;
  campus: 'Rishra' | 'Konnagar';
  issueDate: string;
  completionYear: string;
  grade: string;
  percentage: string;
  status: 'Verified & Authentic' | 'Revoked' | 'Pending Verification';
  certificateNo: string;
  regNo: string;
  avatarUrl?: string;
  skillsAcquired: string[];
}

export interface GalleryVideo {
  id: string;
  title: string;
  type: 'founder' | 'review' | 'tour';
  categoryLabel: string;
  videoUrl: string; // YouTube embed or sample video
  thumbnailUrl: string;
  duration: string;
  speakerName: string;
  speakerRole: string;
  description: string;
}

export interface GalleryPhoto {
  id: string;
  title: string;
  category: 'Classrooms' | 'Practical Labs' | 'Certificates' | 'Events' | 'Student Life';
  imageUrl: string;
  caption: string;
  date: string;
}

export interface Testimonial {
  id: string;
  name: string;
  course: string;
  year: string;
  campus: string;
  quote: string;
  companyOrCollege?: string;
  rating: number;
  avatar: string;
}

export interface FacultyMember {
  id: string;
  name: string;
  designation: string;
  specialization: string;
  experience: string;
  qualification: string;
  campusAvailability: string;
  bio: string;
  keySubjects: string[];
  avatar: string;
}

export interface InstagramPost {
  id: string;
  imageUrl: string;
  caption: string;
  likes: number;
  comments: number;
  date: string;
  postUrl: string;
}

export interface EnrollmentFormData {
  id?: string;
  studentName: string;
  phone: string;
  email: string;
  campus: 'Rishra' | 'Konnagar' | 'Either Campus';
  courseId: string;
  standardOrQualification: string;
  message: string;
  preferredTime?: string;
  submittedAt?: string;
  status?: 'New' | 'Contacted' | 'Enrolled' | 'Closed';
}
