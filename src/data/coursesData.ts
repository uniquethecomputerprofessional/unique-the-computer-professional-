import { CourseItem, CourseCategory } from '../types';

export const COURSE_CATEGORIES: { id: CourseCategory; label: string; icon: string; description: string }[] = [
  {
    id: 'school',
    label: 'School & Foundation Courses',
    icon: 'GraduationCap',
    description: 'Targeted computer curriculum support for ICSE, CBSE, ISC, and WB Board students (Classes XI & XII).'
  },
  {
    id: 'degree',
    label: 'Degree-Level Program',
    icon: 'BookOpen',
    description: 'Comprehensive semester-by-semester coaching for Bachelor of Computer Applications (BCA) university curriculum.'
  },
  {
    id: 'programming',
    label: 'Programming & Development',
    icon: 'Code',
    description: 'Core logic, object-oriented design, and modern software development skills from fundamental C to advanced Python and Java.'
  },
  {
    id: 'finance',
    label: 'Office & Finance Skills',
    icon: 'FileSpreadsheet',
    description: 'Industry-standard financial accounting, GST filing, TDS compliance, and advanced data manipulation tools.'
  },
  {
    id: 'specialization',
    label: 'Career & Specialization Tracks',
    icon: 'ShieldAlert',
    description: 'High-demand technological certifications in Cyber Security, Penetration Testing, and Architectural/Engineering CAD design.'
  }
];

export const ALL_COURSES: CourseItem[] = [
  // 1. School & Foundation Courses
  {
    id: 'comp-app-xi-xii',
    name: 'Computer Applications (XI–XII)',
    category: 'school',
    categoryLabel: 'School & Foundation',
    shortDesc: 'Comprehensive board-oriented coaching for Class XI and XII students mastering syllabus fundamentals and practical labs.',
    fullDesc: 'Tailored specifically for Higher Secondary students appearing for WB Board, CBSE, and ISC examinations. Covers Boolean Algebra, Data Structures, OOP concepts, Database Management Systems, and complete hands-on practical lab assignments with 1-on-1 exam guidance.',
    duration: '1 Year Academic Program',
    level: 'School Level (Classes 11 & 12)',
    prerequisites: 'Basic familiarity with computer operations',
    highlights: [
      'Comprehensive Coverage of WB Board / ISC / CBSE Syllabus',
      'Dedicated Practical Lab sessions for board project work',
      'Mock Board Examinations with regular diagnostic evaluations',
      'Individual doubt-clearing sessions before board exams'
    ],
    syllabus: [
      'Boolean Algebra & Logic Gates',
      'Data Representation & Computer Fundamentals',
      'Object Oriented Programming Principles',
      'Arrays, Strings & Data Structures',
      'Database Concepts & Basic SQL Queries',
      'Board Project Preparation & Viva Voce Guidance'
    ],
    isPopular: true,
    iconName: 'BookMarked',
    badge: 'Board Exam Special'
  },
  {
    id: 'comp-sci-boards',
    name: 'Computer Science (ICSE, CBSE, ISC & WB Boards)',
    category: 'school',
    categoryLabel: 'School & Foundation',
    shortDesc: 'Foundational and advanced computer science coaching for middle and high school students across all major education boards.',
    fullDesc: 'Building early analytical problem-solving skills and strong computational logic for ICSE, CBSE, ISC, and West Bengal Board students. Covers logic design, Java/Python basis as per board syllabus, flowcharting, and conceptual depth.',
    duration: 'Flexible Academic Session',
    level: 'School Level (Classes 6 to 12)',
    prerequisites: 'School enrollment',
    highlights: [
      'Board-aligned topic breakdowns and notes',
      'Concept-first teaching approach to score top marks',
      'Hands-on coding exercises in class',
      'Small batch size ensuring personalized attention'
    ],
    syllabus: [
      'Computer Architecture & Operating Systems Basics',
      'Algorithm & Flowchart Construction',
      'Elementary Programming in Java/Python',
      'Control Structures & Loop Execution',
      'Functions, Methods & Parameter Passing',
      'Board Sample Paper Solutions & Revision'
    ],
    isPopular: false,
    iconName: 'School',
    badge: 'All Boards'
  },

  // 2. Degree-Level Program
  {
    id: 'bca-all-semesters',
    name: 'BCA (All Semesters)',
    category: 'degree',
    categoryLabel: 'Degree-Level Program',
    shortDesc: 'Complete semester-wise university tuition and project assistance for Bachelor of Computer Applications students.',
    fullDesc: 'In-depth subject guidance for BCA students under MAKAUT, Calcutta University, Burdwan University, and open universities. Master core computer science subjects, algorithms, web technologies, database architecture, software engineering, and university final year projects.',
    duration: 'Semester-wise / 3-Year Degree Track',
    level: 'Undergraduate / University Level',
    prerequisites: '10+2 with Mathematics/Computer Application background',
    highlights: [
      'Semester-wise subject modular preparation',
      'Previous 10 Years University Exam Question Paper Solutions',
      'Final Year Major & Minor Project Guidance',
      'Hands-on practicals for C, Data Structures, C++, Java, DBMS & Web'
    ],
    syllabus: [
      'Sem 1: Computer Fundamentals, Programming in C, Digital Electronics',
      'Sem 2: Data Structures using C/C++, Discrete Mathematics',
      'Sem 3: Object-Oriented Programming with Java/C++, Computer Organization',
      'Sem 4: Database Management Systems (DBMS), Operating Systems, Software Engineering',
      'Sem 5: Python Programming, Computer Networks, Web Tech (HTML/CSS/JS/PHP)',
      'Sem 6: Cloud Computing, Information Security, Major University Capstone Project'
    ],
    isPopular: true,
    iconName: 'GraduationCap',
    badge: 'Degree Special'
  },

  // 3. Programming & Development
  {
    id: 'c-programming',
    name: 'C Programming',
    category: 'programming',
    categoryLabel: 'Programming & Development',
    shortDesc: 'Master the mother of all programming languages, memory management, pointers, and fundamental algorithmic logic.',
    fullDesc: 'Essential stepping stone for every aspiring computer engineer and coder. Learn fundamental syntax, memory allocation, pointers, structures, file handling, and modular code architecture with extensive practical problem sets.',
    duration: '2 to 3 Months',
    level: 'Beginner to Intermediate',
    prerequisites: 'Basic computer literacy',
    highlights: [
      'Strong foundation in computer memory concepts',
      'Deep dive into Pointers, Memory Allocation & Structures',
      '100+ Hands-on coding problems solved in class',
      'Real-world logic building exercises'
    ],
    syllabus: [
      'History, Compilation Process & Environment Setup',
      'Variables, Data Types & Operators',
      'Decision Making (if-else, switch) & Loop Execution',
      'Functions, Recursion & Scope Rules',
      'Arrays (1D, 2D) & String Manipulations',
      'Pointers, Dynamic Memory Allocation (malloc, calloc)',
      'Structures, Unions & Typedef',
      'File Handling Operations (Reading/Writing Data)'
    ],
    isPopular: false,
    iconName: 'Code2',
    badge: 'Foundational'
  },
  {
    id: 'cpp-programming',
    name: 'C++ Programming',
    category: 'programming',
    categoryLabel: 'Programming & Development',
    shortDesc: 'Unlock Object-Oriented Programming (OOP) paradigms, classes, inheritance, polymorphism, and STL containers.',
    fullDesc: 'Transition from procedural programming to Object-Oriented software design. Learn how modern software engines are constructed using classes, encapsulation, inheritance, polymorphism, templates, exception handling, and the Standard Template Library (STL).',
    duration: '2 to 3 Months',
    level: 'Intermediate',
    prerequisites: 'Basic knowledge of C or basic programming concepts',
    highlights: [
      'Comprehensive Object-Oriented Programming (OOP) concepts',
      'Hands-on STL usage for competitive coding & job interviews',
      'Memory management with Constructors & Destructors',
      'Real-world software design mini-projects'
    ],
    syllabus: [
      'Introduction to OOP vs Procedural Programming',
      'Classes, Objects, Access Specifiers',
      'Constructors, Destructors & Copy Constructors',
      'Operator Overloading & Function Overloading',
      'Inheritance (Single, Multiple, Multilevel, Hybrid)',
      'Virtual Functions, Abstract Classes & Polymorphism',
      'Templates, Exception Handling & File I/O',
      'Standard Template Library (Vectors, Maps, Sets, Iterators)'
    ],
    isPopular: false,
    iconName: 'Binary',
    badge: 'Core Developer'
  },
  {
    id: 'python-3',
    name: 'Python 3 Masterclass',
    category: 'programming',
    categoryLabel: 'Programming & Development',
    shortDesc: 'Learn the world’s most versatile language for automation, web development, data analysis, and modern AI application.',
    fullDesc: 'Python 3 is today’s most sought-after programming language. This practical course takes you from clean syntax basics to Object-Oriented Python, file automation, modules, database connectivity, and introducing data handling libraries like Pandas & NumPy.',
    duration: '3 Months',
    level: 'Beginner to Advanced',
    prerequisites: 'No prior coding experience required',
    highlights: [
      'Clean, expressive code syntax & pythonic conventions',
      'Hands-on mini-projects (Automation scripts, Games, File parsers)',
      'Database integration with MySQL/SQLite',
      'Introduction to Data Science & Web Scraping concepts'
    ],
    syllabus: [
      'Python Environment, IDLE & Jupyter Notebook setup',
      'Variables, Numbers, Strings & Formatting',
      'Data Collections: Lists, Tuples, Dictionaries & Sets',
      'Control Flow, Functions, Lambda Expressions & Generators',
      'Object-Oriented Programming in Python (Classes & Methods)',
      'Modules, Packages, Virtual Environments & Pip',
      'File Input/Output, Error & Exception Handling',
      'Database Operations (SQLite/MySQL Integration)',
      'Intro to NumPy, Pandas & Web Scraping with BeautifulSoup'
    ],
    isPopular: true,
    iconName: 'Terminal',
    badge: 'Top Choice'
  },
  {
    id: 'java-programming',
    name: 'Java Programming',
    category: 'programming',
    categoryLabel: 'Programming & Development',
    shortDesc: 'Enterprise-grade Java development, object-oriented software design, multithreading, and GUI application building.',
    fullDesc: 'Master platform-independent software development using Java. Understand the JVM, byte-code execution, Object-Oriented Architecture, Exception Handling, Collections Framework, Multithreading, I/O Streams, and JDBC database connectivity.',
    duration: '3 to 4 Months',
    level: 'Intermediate to Advanced',
    prerequisites: 'Basic knowledge of any programming logic is beneficial',
    highlights: [
      'Enterprise-oriented Java syntax & standard conventions',
      'Deep dive into Java Collections Framework',
      'JDBC Database Integration for desktop application creation',
      'Preparation for technical interview coding rounds'
    ],
    syllabus: [
      'Java Architecture (JDK, JRE, JVM) & Bytecode Execution',
      'Data Types, Variables, Operators & Control Statements',
      'OOP in Java: Inheritance, Interfaces, Packages & Abstract Classes',
      'String Handling (String, StringBuilder, StringBuffer)',
      'Exception Handling (Try-Catch-Finally, Custom Exceptions)',
      'Java Collections Framework (List, Set, Map, Queue, Iterator)',
      'Multithreading, Thread Synchronization & Concurrency',
      'File Handling & Stream I/O',
      'JDBC Architecture: Connecting Java with Databases'
    ],
    isPopular: false,
    iconName: 'Cpu',
    badge: 'Enterprise Skill'
  },
  {
    id: 'algo-flowcharts',
    name: 'Algorithms & Flowcharts',
    category: 'programming',
    categoryLabel: 'Programming & Development',
    shortDesc: 'Build bulletproof computational logic, problem breakdown skills, and pseudocode formulation prior to coding.',
    fullDesc: 'Designed for beginner programmers who want to sharpen their logical thinking. Learn step-by-step problem representation using standard flowchart symbols, pseudocode writing, dry-running algorithms, and analyzing time & space efficiency.',
    duration: '1 Month Intensive',
    level: 'Absolute Beginner',
    prerequisites: 'None',
    highlights: [
      'Logic development before touching syntax',
      'Standard Flowchart drafting & symbol standards',
      'Sorting & Searching algorithm visualizations',
      'Essential for school & university exam foundational rounds'
    ],
    syllabus: [
      'Problem Solving Process & Logical Thinking',
      'Flowchart Symbols, Rules & Execution Flow',
      'Decision Tree Representation & Nested Conditions',
      'Looping Structures in Logic Diagrams',
      'Pseudocode Conventions & Algorithm Writing',
      'Dry-Running Logic with Trace Tables',
      'Basic Searching (Linear, Binary) & Sorting Algorithms'
    ],
    isPopular: false,
    iconName: 'GitBranch',
    badge: 'Logic Foundation'
  },

  // 4. Office & Finance Skills
  {
    id: 'advance-excel',
    name: 'Advance Excel',
    category: 'finance',
    categoryLabel: 'Office & Finance Skills',
    shortDesc: 'Master dynamic lookup formulas, Pivot Tables, Power Query, dashboards, and automated business data analysis.',
    fullDesc: 'Transform raw corporate data into actionable business insights. Learn advanced lookup functions (VLOOKUP, XLOOKUP, INDEX-MATCH), nested IF logic, Pivot Tables, Slicers, Data Validation, Conditional Formatting, and introductory Excel Macros/VBA.',
    duration: '1.5 to 2 Months',
    level: 'Beginner to Advanced',
    prerequisites: 'Basic MS Office operations',
    highlights: [
      'Master XLOOKUP, VLOOKUP, INDEX-MATCH & Complex Nesting',
      'Build Interactive Management Dashboards with Slicers',
      'Data Cleaning using Power Query & Text Functions',
      'Real-world business case studies (Sales, HR, Finance)'
    ],
    syllabus: [
      'Excel Interface, Keyboard Shortcuts & Formula References',
      'Logical Functions (IF, AND, OR, IFS, SUMIFS, COUNTIFS)',
      'Advanced Lookup Functions (VLOOKUP, HLOOKUP, XLOOKUP, INDEX-MATCH)',
      'Data Cleaning, Text Functions & Date Arithmetic',
      'Pivot Tables, Calculated Fields, Slicers & Pivot Charts',
      'Data Validation, Dropdowns & Conditional Formatting Rules',
      'Financial & Statistical Functions (NPV, IRR, PMT)',
      'Creating Professional Analytical Executive Dashboards'
    ],
    isPopular: true,
    iconName: 'FileSpreadsheet',
    badge: 'High In-Demand'
  },
  {
    id: 'tally-gst',
    name: 'Tally Prime with GST',
    category: 'finance',
    categoryLabel: 'Office & Finance Skills',
    shortDesc: 'Comprehensive computerized accounting, voucher entry, inventory management, e-Way bill, and automated GST reporting.',
    fullDesc: 'Practical training on India’s leading business accounting software Tally Prime. Master voucher posting, ledger creation, stock item tracking, GST ledger configuration, debit/credit notes, bank reconciliation, and generating P&L / Balance Sheets.',
    duration: '2 to 3 Months',
    level: 'Beginner to Professional',
    prerequisites: 'Commerce background helpful but not required',
    highlights: [
      '100% Practical Accounting on Tally Prime',
      'GST Accounting (CGST, SGST, IGST Setup & Invoicing)',
      'Inventory & Stock Management with Multi-Locations',
      'Bank Reconciliation & Financial Statement Generation'
    ],
    syllabus: [
      'Fundamentals of Accounting & Double Entry System',
      'Company Creation, Grouping & Ledger Setup in Tally Prime',
      'Voucher Entries (Payment, Receipt, Contra, Journal, Sales, Purchase)',
      'Inventory Management: Stock Groups, Units, Items & Reorder Levels',
      'GST Activation, HSN/SAC Codes & Tax Rate Configuration',
      'GST Compliant Sales & Purchase Invoicing',
      'Bank Reconciliation Statement (BRS) & Petty Cash Management',
      'Generating Balance Sheet, Profit & Loss A/c, Cash Flow & GST Returns'
    ],
    isPopular: true,
    iconName: 'Calculator',
    badge: 'Job Ready'
  },
  {
    id: 'taxation-returns-filing',
    name: 'Income Tax / TDS / GST Return Filing',
    category: 'finance',
    categoryLabel: 'Office & Finance Skills',
    shortDesc: 'Practical tax compliance training covering GSTR-1, GSTR-3B, TDS calculations, and Income Tax Return (ITR) portal procedures.',
    fullDesc: 'Become a certified tax filing specialist. Learn statutory tax regulations, online government portal navigation, computing taxable income, filing GST returns (GSTR-1, GSTR-3B), preparing Form 16/16A, computing TDS deductions, and submitting ITR-1 / ITR-2 returns.',
    duration: '2 Months',
    level: 'Professional',
    prerequisites: 'Basic knowledge of Tally or accounting',
    highlights: [
      'Hands-on practice on Government GST & IT Portals',
      'Live GSTR-1 & GSTR-3B preparation with offline utility',
      'TDS Certificate generation & challan payment process',
      'Individual & Business Income Tax Return (ITR) computation'
    ],
    syllabus: [
      'GST Framework, Registration Rules & Input Tax Credit (ITC)',
      'Preparing & Filing GSTR-1 (Outward Supplies) & GSTR-3B',
      'Reconciliation of GSTR-2B with Purchase Register',
      'TDS Rates, Thresholds, Challan 280/281 Payment',
      'Quarterly TDS Return Filing (Form 24Q, 26Q) & Form 16 Generation',
      'Income Tax Heads (Salary, House Property, Business, Capital Gains)',
      'E-Filing of Income Tax Returns (ITR-1 SAHAJ, ITR-4 SUGAM)',
      'Tax Planning, Deductions under Sec 80C, 80D & Refund Claiming'
    ],
    isPopular: false,
    iconName: 'Receipt',
    badge: 'Tax Specialist'
  },

  // 5. Career & Specialization Tracks
  {
    id: 'ethical-hacking-cyber-sec',
    name: 'Ethical Hacking & Cyber Security',
    category: 'specialization',
    categoryLabel: 'Career & Specialization Tracks',
    shortDesc: 'Master penetration testing, network defense, vulnerability assessment, ethical exploitation, and security audit tools.',
    fullDesc: 'Step into the fast-growing cyber security industry. Learn offensive and defensive security practices in a safe lab environment using Kali Linux, Nmap, Wireshark, Metasploit, Burp Suite, Web Application Security (OWASP Top 10), and wireless security principles.',
    duration: '3 to 4 Months',
    level: 'Intermediate to Advanced',
    prerequisites: 'Basic understanding of networking and OS concepts',
    highlights: [
      'Hands-on penetration testing labs using Kali Linux',
      'Real vulnerability auditing on target lab machines',
      'OWASP Top 10 web application security assessment',
      'Guidance for CEH / CompTIA Security+ certifications'
    ],
    syllabus: [
      'Introduction to Ethical Hacking, Cyber Laws & Ethics',
      'Networking Fundamentals, TCP/IP, OSI Layers & Subnetting',
      'Footprinting, Reconnaissance & OSINT Techniques',
      'Network Scanning & Enumeration with Nmap & Zenmap',
      'Vulnerability Assessment & Exploit Frameworks (Metasploit)',
      'Password Cracking, Social Engineering & Phishing Defense',
      'Web Application Hacking: SQL Injection, XSS, CSRF (Burp Suite)',
      'Wireless Network Security (WPA2/WPA3 auditing)',
      'Firewalls, IDS/IPS, Malware Analysis & Security Hardening'
    ],
    isPopular: true,
    iconName: 'ShieldCheck',
    badge: 'Hot Career'
  },
  {
    id: 'autocad-2d-3d',
    name: 'AutoCAD (2D & 3D)',
    category: 'specialization',
    categoryLabel: 'Career & Specialization Tracks',
    shortDesc: 'Professional computer-aided drafting and 3D modeling for engineering, architectural, and mechanical design.',
    fullDesc: 'Master industry-standard computer-aided drafting software. Learn 2D floor plans, elevation drawings, structural detailing, dimensioning standards, block creation, and rendering 3D solid models for civil, mechanical, and architectural projects.',
    duration: '2 to 3 Months',
    level: 'Beginner to Professional',
    prerequisites: 'High school education; diploma or engineering background helpful',
    highlights: [
      '100% Practical CAD workstation drafting',
      'Architectural 2D Plan, Section & Elevation Creation',
      '3D Solid Modeling, Texturing & Isometric Views',
      'Plotting, Layout Scales & Printing Standards'
    ],
    syllabus: [
      'AutoCAD UI, Coordinate Systems & Workspace Setup',
      '2D Drawing Commands (Line, Polyline, Circle, Arc, Rectangle)',
      'Modification Tools (Trim, Extend, Offset, Array, Mirror, Scale)',
      'Layer Management, Line Types, Colors & Hatch Patterns',
      'Dimension Styles, Text Formatting & Leader Annotations',
      'Creating & Inserting Blocks, Attributes & Dynamic Blocks',
      '3D Modeling Environment: Extrude, Revolve, Sweep, Loft',
      '3D Solid Editing, Boolean Operations (Union, Subtract, Intersect)',
      'Materials, Camera Lights & Rendering High-Res Images',
      'Plotting, Page Setup, Viewports & Exporting to PDF/DWG'
    ],
    isPopular: false,
    iconName: 'Compass',
    badge: 'Technical Skill'
  }
];
