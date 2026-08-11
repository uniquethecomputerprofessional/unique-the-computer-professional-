import React, { createContext, useContext, useState, useEffect } from 'react';
import { CourseItem, GalleryVideo, GalleryPhoto, Testimonial, EnrollmentFormData } from '../types';
import { ALL_COURSES } from '../data/coursesData';
import { GALLERY_VIDEOS, GALLERY_PHOTOS, STUDENT_CAROUSEL_REVIEWS } from '../data/instituteData';

interface DataContextType {
  courses: CourseItem[];
  videos: GalleryVideo[];
  photos: GalleryPhoto[];
  testimonials: Testimonial[];
  noticeText: string;
  enrollments: EnrollmentFormData[];
  isAdminLoggedIn: boolean;

  // Auth
  loginAdmin: (password: string) => boolean;
  logoutAdmin: () => void;

  // Course CRUD
  addCourse: (course: Omit<CourseItem, 'id'>) => void;
  updateCourse: (id: string, course: Partial<CourseItem>) => void;
  deleteCourse: (id: string) => void;

  // Video CRUD
  addVideo: (video: Omit<GalleryVideo, 'id'>) => void;
  updateVideo: (id: string, video: Partial<GalleryVideo>) => void;
  deleteVideo: (id: string) => void;

  // Photo CRUD
  addPhoto: (photo: Omit<GalleryPhoto, 'id'>) => void;
  updatePhoto: (id: string, photo: Partial<GalleryPhoto>) => void;
  deletePhoto: (id: string) => void;

  // Testimonial CRUD
  addTestimonial: (testimonial: Omit<Testimonial, 'id'>) => void;
  updateTestimonial: (id: string, testimonial: Partial<Testimonial>) => void;
  deleteTestimonial: (id: string) => void;

  // Notice Bar
  updateNoticeText: (text: string) => void;

  // Enrollments / Inquiries
  addEnrollment: (enrollment: EnrollmentFormData) => void;
  updateEnrollmentStatus: (id: string, status: 'New' | 'Contacted' | 'Enrolled' | 'Closed') => void;
  deleteEnrollment: (id: string) => void;

  // System
  resetToDefaults: () => void;
  exportDataJSON: () => string;
  importDataJSON: (jsonString: string) => boolean;
}

const DataContext = createContext<DataContextType | undefined>(undefined);

const STORAGE_KEYS = {
  COURSES: 'utcp_courses_v1',
  VIDEOS: 'utcp_videos_v1',
  PHOTOS: 'utcp_photos_v1',
  TESTIMONIALS: 'utcp_testimonials_v1',
  NOTICE: 'utcp_notice_v1',
  ENROLLMENTS: 'utcp_enrollments_v1',
  ADMIN_AUTH: 'utcp_admin_auth_v1',
};

const DEFAULT_NOTICE = 'Admissions Open for New Batches at Rishra & Konnagar Campuses';

export const DataProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [courses, setCourses] = useState<CourseItem[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.COURSES);
      return saved ? JSON.parse(saved) : ALL_COURSES;
    } catch {
      return ALL_COURSES;
    }
  });

  const [videos, setVideos] = useState<GalleryVideo[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.VIDEOS);
      return saved ? JSON.parse(saved) : GALLERY_VIDEOS;
    } catch {
      return GALLERY_VIDEOS;
    }
  });

  const [photos, setPhotos] = useState<GalleryPhoto[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.PHOTOS);
      return saved ? JSON.parse(saved) : GALLERY_PHOTOS;
    } catch {
      return GALLERY_PHOTOS;
    }
  });

  const [testimonials, setTestimonials] = useState<Testimonial[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.TESTIMONIALS);
      return saved ? JSON.parse(saved) : STUDENT_CAROUSEL_REVIEWS;
    } catch {
      return STUDENT_CAROUSEL_REVIEWS;
    }
  });

  const [noticeText, setNoticeText] = useState<string>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.NOTICE);
      return saved || DEFAULT_NOTICE;
    } catch {
      return DEFAULT_NOTICE;
    }
  });

  const [enrollments, setEnrollments] = useState<EnrollmentFormData[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.ENROLLMENTS);
      return saved ? JSON.parse(saved) : [
        {
          id: 'enr-sample-1',
          studentName: 'Sourav Roy',
          phone: '9830123456',
          email: 'sourav.roy@example.com',
          campus: 'Rishra',
          courseId: 'icse-cbse-computer',
          standardOrQualification: 'Class 10 Student',
          message: 'Interested in weekend batch for Class 10 ICSE Computer Application.',
          submittedAt: '2026-08-01 10:30 AM',
          status: 'New'
        },
        {
          id: 'enr-sample-2',
          studentName: 'Priyanka Das',
          phone: '9874561230',
          email: 'priyanka.d@example.com',
          campus: 'Konnagar',
          courseId: 'tally-gst-pro',
          standardOrQualification: 'B.Com Graduate',
          message: 'Want to inquire about Tally Prime GST batch timings beside Konnagar station.',
          submittedAt: '2026-08-05 02:15 PM',
          status: 'Contacted'
        }
      ];
    } catch {
      return [];
    }
  });

  const [isAdminLoggedIn, setIsAdminLoggedIn] = useState<boolean>(() => {
    try {
      return localStorage.getItem(STORAGE_KEYS.ADMIN_AUTH) === 'true';
    } catch {
      return false;
    }
  });

  // Sync to local storage
  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.COURSES, JSON.stringify(courses));
  }, [courses]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.VIDEOS, JSON.stringify(videos));
  }, [videos]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.PHOTOS, JSON.stringify(photos));
  }, [photos]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.TESTIMONIALS, JSON.stringify(testimonials));
  }, [testimonials]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.NOTICE, noticeText);
  }, [noticeText]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.ENROLLMENTS, JSON.stringify(enrollments));
  }, [enrollments]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.ADMIN_AUTH, isAdminLoggedIn ? 'true' : 'false');
  }, [isAdminLoggedIn]);

  // Auth
  const loginAdmin = (password: string): boolean => {
    // Default admin credentials: unique1998, admin123, or unique@1998
    const validPasswords = ['unique1998', 'admin123', 'unique@1998', 'admin'];
    if (validPasswords.includes(password.trim().toLowerCase())) {
      setIsAdminLoggedIn(true);
      return true;
    }
    return false;
  };

  const logoutAdmin = () => {
    setIsAdminLoggedIn(false);
  };

  // Course actions
  const addCourse = (course: Omit<CourseItem, 'id'>) => {
    const newCourse: CourseItem = {
      ...course,
      id: 'course-' + Date.now() + '-' + Math.random().toString(36).substring(2, 6)
    };
    setCourses(prev => [newCourse, ...prev]);
  };

  const updateCourse = (id: string, updated: Partial<CourseItem>) => {
    setCourses(prev => prev.map(c => c.id === id ? { ...c, ...updated } : c));
  };

  const deleteCourse = (id: string) => {
    setCourses(prev => prev.filter(c => c.id !== id));
  };

  // Video actions
  const addVideo = (video: Omit<GalleryVideo, 'id'>) => {
    const newVideo: GalleryVideo = {
      ...video,
      id: 'vid-' + Date.now() + '-' + Math.random().toString(36).substring(2, 6)
    };
    setVideos(prev => [newVideo, ...prev]);
  };

  const updateVideo = (id: string, updated: Partial<GalleryVideo>) => {
    setVideos(prev => prev.map(v => v.id === id ? { ...v, ...updated } : v));
  };

  const deleteVideo = (id: string) => {
    setVideos(prev => prev.filter(v => v.id !== id));
  };

  // Photo actions
  const addPhoto = (photo: Omit<GalleryPhoto, 'id'>) => {
    const newPhoto: GalleryPhoto = {
      ...photo,
      id: 'photo-' + Date.now() + '-' + Math.random().toString(36).substring(2, 6)
    };
    setPhotos(prev => [newPhoto, ...prev]);
  };

  const updatePhoto = (id: string, updated: Partial<GalleryPhoto>) => {
    setPhotos(prev => prev.map(p => p.id === id ? { ...p, ...updated } : p));
  };

  const deletePhoto = (id: string) => {
    setPhotos(prev => prev.filter(p => p.id !== id));
  };

  // Testimonial actions
  const addTestimonial = (testimonial: Omit<Testimonial, 'id'>) => {
    const newTestimonial: Testimonial = {
      ...testimonial,
      id: 'rev-' + Date.now() + '-' + Math.random().toString(36).substring(2, 6)
    };
    setTestimonials(prev => [newTestimonial, ...prev]);
  };

  const updateTestimonial = (id: string, updated: Partial<Testimonial>) => {
    setTestimonials(prev => prev.map(t => t.id === id ? { ...t, ...updated } : t));
  };

  const deleteTestimonial = (id: string) => {
    setTestimonials(prev => prev.filter(t => t.id !== id));
  };

  // Notice Bar
  const updateNoticeText = (text: string) => {
    setNoticeText(text);
  };

  // Enrollments
  const addEnrollment = (enrollment: EnrollmentFormData) => {
    const newInquiry: EnrollmentFormData = {
      ...enrollment,
      id: 'enr-' + Date.now(),
      submittedAt: new Date().toLocaleString('en-IN', {
        dateStyle: 'medium',
        timeStyle: 'short'
      }),
      status: 'New'
    };
    setEnrollments(prev => [newInquiry, ...prev]);
  };

  const updateEnrollmentStatus = (id: string, status: 'New' | 'Contacted' | 'Enrolled' | 'Closed') => {
    setEnrollments(prev => prev.map(e => e.id === id ? { ...e, status } : e));
  };

  const deleteEnrollment = (id: string) => {
    setEnrollments(prev => prev.filter(e => e.id !== id));
  };

  // Reset to default factory state
  const resetToDefaults = () => {
    setCourses(ALL_COURSES);
    setVideos(GALLERY_VIDEOS);
    setPhotos(GALLERY_PHOTOS);
    setTestimonials(STUDENT_CAROUSEL_REVIEWS);
    setNoticeText(DEFAULT_NOTICE);
    localStorage.removeItem(STORAGE_KEYS.COURSES);
    localStorage.removeItem(STORAGE_KEYS.VIDEOS);
    localStorage.removeItem(STORAGE_KEYS.PHOTOS);
    localStorage.removeItem(STORAGE_KEYS.TESTIMONIALS);
    localStorage.removeItem(STORAGE_KEYS.NOTICE);
  };

  // Export / Import
  const exportDataJSON = (): string => {
    const backupObj = {
      courses,
      videos,
      photos,
      testimonials,
      noticeText,
      enrollments,
      exportedAt: new Date().toISOString()
    };
    return JSON.stringify(backupObj, null, 2);
  };

  const importDataJSON = (jsonString: string): boolean => {
    try {
      const parsed = JSON.parse(jsonString);
      if (parsed.courses) setCourses(parsed.courses);
      if (parsed.videos) setVideos(parsed.videos);
      if (parsed.photos) setPhotos(parsed.photos);
      if (parsed.testimonials) setTestimonials(parsed.testimonials);
      if (parsed.noticeText) setNoticeText(parsed.noticeText);
      if (parsed.enrollments) setEnrollments(parsed.enrollments);
      return true;
    } catch (e) {
      console.error('Import error:', e);
      return false;
    }
  };

  return (
    <DataContext.Provider
      value={{
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
        addEnrollment,
        updateEnrollmentStatus,
        deleteEnrollment,
        resetToDefaults,
        exportDataJSON,
        importDataJSON,
      }}
    >
      {children}
    </DataContext.Provider>
  );
};

export const useData = () => {
  const context = useContext(DataContext);
  if (!context) {
    throw new Error('useData must be used within a DataProvider');
  }
  return context;
};
