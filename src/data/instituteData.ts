import { GalleryVideo, GalleryPhoto, Testimonial, InstagramPost } from '../types';

export const INSTITUTE_CONTACT = {
  phone: '9231660503',
  phoneFormatted: '+91 9231660503',
  email: 'uniquethecomputerprofessional@gmail.com',
  instagramUrl: 'https://instagram.com/uniquethecomputerprofessional',
  workingHours: 'Mon - Sat: 8:00 AM - 8:00 PM | Sun: 9:00 AM - 2:00 PM',
  foundingYear: '1998',
  tagline: 'Turning Learners Into Skilled Computer Professionals'
};

export const CAMPUSES = [
  {
    id: 'rishra',
    name: 'Rishra Campus',
    address: '49/10, Rabindra Sarani, 95/A, Lal Bahadur Shastri Road',
    city: 'Rishra, Hooghly, West Bengal',
    landmark: 'Near Rabindra Sarani Main Junction',
    phone: '9231660503',
    email: 'uniquethecomputerprofessional@gmail.com',
    mapEmbedUrl: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3680.1234567!2d88.351234!3d22.71234!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMjLCsDQyJzQ0LjQiTiA4OMKwMjEnMDQuNCJF!5e0!3m2!1sen!2sin!4v1600000000000!5m2!1sen!2sin',
    directionsUrl: 'https://maps.google.com/?q=49/10+Rabindra+Sarani+Rishra',
    image: '/src/assets/images/campus_facility_1785695457977.jpg',
    features: ['Modern Air-Conditioned Computer Lab', '1-Student 1-PC Ratio', 'High-Speed Broadband Internet', 'Doubt Clearing Classrooms']
  },
  {
    id: 'konnagar',
    name: 'Konnagar Campus',
    address: '95/A, Lal Bahadur Shastri Road, Beside Konnagar Railway Platform No. 1 (towards Howrah)',
    city: 'Konnagar, Kolkata, West Bengal 712235',
    landmark: 'Beside Konnagar Railway Platform No. 1 (Towards Howrah)',
    phone: '9231660503',
    email: 'uniquethecomputerprofessional@gmail.com',
    mapEmbedUrl: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3680.8765432!2d88.345678!3d22.70123!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMjLCsDQyJzA0LjQiTiA4OMKwMjAnNDQuNCJF!5e0!3m2!1sen!2sin!4v1600000000000!5m2!1sen!2sin',
    directionsUrl: 'https://maps.google.com/?q=95/A+Lal+Bahadur+Shastri+Road+Konnagar',
    image: '/src/assets/images/institute_hero_lab_1785695443132.jpg',
    features: ['Prime Location Next to Konnagar Railway Station', 'Advanced Programming Lab', 'Project Seminar Hall', 'Individual Attention Guidance']
  }
];

export const GALLERY_VIDEOS: GalleryVideo[] = [
  {
    id: 'founder-desk',
    title: 'From the Founder’s Desk',
    type: 'founder',
    categoryLabel: 'Founder Address',
    videoUrl: 'https://drive.google.com/file/d/1_kI2y-pf4_Tnlr-8ih7SoK_8GFbwU9Xw/preview',
    thumbnailUrl: 'https://lh3.googleusercontent.com/d/1i_eUvNy6tvHcrSNYcPfVETxlQkBr2NL5',
    duration: 'Founder Video',
    speakerName: 'Founder & Academic Director',
    speakerRole: 'Unique The Computer Professional',
    description: 'Watch the official message from our Founder & Academic Director sharing the mission, hands-on computer education, and 1-on-1 practical student guidance at Rishra and Konnagar campuses.'
  },
  {
    id: 'student-review-video',
    title: 'Student Review & Success Story',
    type: 'review',
    categoryLabel: 'Student Testimonial',
    videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
    thumbnailUrl: 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=800&q=80',
    duration: '3:20',
    speakerName: 'Sourav Roy & Batchmates',
    speakerRole: 'BCA & Python Alumni',
    description: 'Hear how individual attention, hands-on lab practicals, and 1-on-1 guidance helped students secure high marks in BCA and land tech roles.'
  },
  {
    id: 'classroom-visit-video',
    title: 'Classroom & Lab Walkthrough',
    type: 'tour',
    categoryLabel: 'Campus Tour',
    videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
    thumbnailUrl: 'https://images.unsplash.com/photo-1531482615713-2afd69097998?auto=format&fit=crop&w=800&q=80',
    duration: '2:45',
    speakerName: 'Institute Walkthrough',
    speakerRole: 'Rishra & Konnagar Campuses',
    description: 'Take a virtual tour of our state-of-the-art computer labs, individual workstations, high-speed connectivity, and student collaboration hubs.'
  }
];

export const STUDENT_CAROUSEL_REVIEWS: Testimonial[] = [
  {
    id: 'rev-1',
    name: 'Suman Mukherjee',
    course: 'BCA (All Semesters)',
    year: '2024 Graduate',
    campus: 'Rishra Campus',
    quote: 'The faculty at Unique The Computer Professional explains every complex C and Java logic with easy real-world examples. My BCA semester marks improved drastically!',
    companyOrCollege: 'University First Class',
    rating: 5,
    avatar: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&w=200&q=80'
  },
  {
    id: 'rev-2',
    name: 'Ritu Sen',
    course: 'Tally Prime with GST',
    year: '2024 Batch',
    campus: 'Konnagar Campus',
    quote: 'I learned full computerized accounting, GSTR-1, and 3B return filing step-by-step. The practical lab training gave me confidence during job interviews.',
    companyOrCollege: 'Junior Accountant at Local Firm',
    rating: 5,
    avatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=200&q=80'
  },
  {
    id: 'rev-3',
    name: 'Aritra Das',
    course: 'Ethical Hacking & Cyber Security',
    year: '2025 Current Student',
    campus: 'Rishra Campus',
    quote: 'Awesome hands-on penetration testing on Kali Linux! The 1-on-1 attention from Sir made mastering networking tools like Nmap and Metasploit effortless.',
    companyOrCollege: 'Cyber Security Enthusiast',
    rating: 5,
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=200&q=80'
  },
  {
    id: 'rev-4',
    name: 'Pooja Ghosh',
    course: 'Computer Science (ISC Board)',
    year: 'Class XII (98% in CS)',
    campus: 'Konnagar Campus',
    quote: 'Secured 98 marks in my ISC Computer Science paper thanks to the thorough practical coding practice and previous board paper solutions solved at the institute.',
    companyOrCollege: 'ISC School Topper',
    rating: 5,
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=200&q=80'
  }
];

export const GALLERY_PHOTOS: GalleryPhoto[] = [
  {
    id: 'p1',
    title: 'Modern Workstation Practical Session',
    category: 'Practical Labs',
    imageUrl: 'https://images.unsplash.com/photo-1531482615713-2afd69097998?auto=format&fit=crop&w=800&q=80',
    caption: 'Students working on real programming & web design practicals with individual dedicated PCs.',
    date: 'Jan 2025'
  },
  {
    id: 'p2',
    title: 'Interactive Coding & Logic Discussion',
    category: 'Classrooms',
    imageUrl: 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=800&q=80',
    caption: 'Small batch class discussion clarifying C++ and Java OOP concepts.',
    date: 'Dec 2024'
  },
  {
    id: 'p3',
    title: 'Annual Certificate Distribution Ceremony',
    category: 'Certificates',
    imageUrl: 'https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&w=800&q=80',
    caption: 'Proud students receiving their official completion certificates and performance awards.',
    date: 'Nov 2024'
  },
  {
    id: 'p4',
    title: 'Tally & GST Return Filing Workshop',
    category: 'Practical Labs',
    imageUrl: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=800&q=80',
    caption: 'Hands-on filing session on live tax portals and Tally Prime software.',
    date: 'Jan 2025'
  },
  {
    id: 'p5',
    title: 'Ethical Hacking Lab & Defense Tools',
    category: 'Practical Labs',
    imageUrl: 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&w=800&q=80',
    caption: 'Students analyzing network packet logs and configuring firewall rules.',
    date: 'Oct 2024'
  },
  {
    id: 'p6',
    title: 'Konnagar Campus Entrance & Lab Facility',
    category: 'Student Life',
    imageUrl: 'https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&w=800&q=80',
    caption: 'Convenient campus right beside Konnagar Railway Station Platform No. 1.',
    date: 'Jan 2025'
  }
];

export const INSTAGRAM_POSTS: InstagramPost[] = [
  {
    id: 'ig-1',
    imageUrl: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=600&q=80',
    caption: '🚀 New Python 3 Batch starting next week at both Rishra & Konnagar Campuses! Learn automation, OOP, and data analytics.',
    likes: 142,
    comments: 18,
    date: '2 days ago',
    postUrl: 'https://instagram.com/uniquethecomputerprofessional'
  },
  {
    id: 'ig-2',
    imageUrl: 'https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&w=600&q=80',
    caption: '🎓 Congratulations to our BCA 5th Semester students for scoring First Class marks in university practical examinations!',
    likes: 210,
    comments: 32,
    date: '5 days ago',
    postUrl: 'https://instagram.com/uniquethecomputerprofessional'
  },
  {
    id: 'ig-3',
    imageUrl: 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&w=600&q=80',
    caption: '🔒 Hands-on Cyber Security workshop on Wireshark packet capture and OWASP vulnerability assessments.',
    likes: 189,
    comments: 24,
    date: '1 week ago',
    postUrl: 'https://instagram.com/uniquethecomputerprofessional'
  },
  {
    id: 'ig-4',
    imageUrl: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=600&q=80',
    caption: '📊 Master Advance Excel & Tally Prime with GST. Become job-ready in 60 days with individual computer practice.',
    likes: 165,
    comments: 15,
    date: '2 weeks ago',
    postUrl: 'https://instagram.com/uniquethecomputerprofessional'
  }
];

export const WHY_CHOOSE_US = [
  {
    icon: 'UserCheck',
    title: 'Experienced Faculty',
    description: 'Learn directly from veteran computer professionals with 26+ years of teaching excellence and industry expertise.'
  },
  {
    icon: 'Sparkles',
    title: 'Individual Attention',
    description: '1-on-1 computer workstation practice with custom pacing suited to every student’s learning speed.'
  },
  {
    icon: 'Target',
    title: 'Career-Oriented Learning',
    description: 'Hands-on practicals, real project assignments, and industry-standard tools for immediate workplace readiness.'
  },
  {
    icon: 'MapPin',
    title: 'Two Convenient Campuses',
    description: 'Easily accessible locations at Rishra (Rabindra Sarani) and Konnagar (Beside Railway Platform No. 1).'
  }
];
