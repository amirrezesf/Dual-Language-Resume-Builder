import { DualResumeData } from '../types';

export const initialResumeData: DualResumeData = {
  en: {
    name: "AmirReza Esfandiyari",
    roleTitle: "FULL-STACK SOFTWARE DEVELOPER",
    contact: {
      email: "amirrezesf@gmail.com",
      phone: "+98 9214834536",
      location: "Tehran, Iran",
      github: "github.com/amirrezesf",
      linkedin: "linkedin.com/in/amirrezesf",
      website: "amirrezesf.github.io",
    },
    summary:
      "Full-stack developer combining Django/DRF backends with React and Vue/Nuxt frontends, and Flutter for mobile. Founder of Clinitech, an offline-first clinic management platform built to survive internet blackouts, with a dual-server architecture and encrypted data sync. Handles architecture, API design, and database modeling myself, with recurring experience building Persian/RTL interfaces.",
    skillCategories: [
      {
        id: "backend",
        title: "BACKEND",
        skills: ["Python", "Django", "DRF", "Channels", "Celery", "FastAPI"],
      },
      {
        id: "frontend",
        title: "FRONTEND",
        skills: ["React", "Vue", "Nuxt", "TypeScript", "HTML/CSS", "Tailwind CSS"],
      },
      {
        id: "mobile",
        title: "MOBILE",
        skills: ["Flutter", "Dart"],
      },
      {
        id: "data-infra",
        title: "DATA / INFRA",
        skills: ["Redis", "SQLite", "Docker", "Git"],
      },
      {
        id: "other",
        title: "OTHER",
        skills: ["Android Studio", "Computer Vision / OCR (OpenCV)"],
      },
    ],
    languages: [
      { name: "Persian", level: "native" },
      { name: "English", level: "advanced" },
    ],
    experiences: [
      {
        id: "exp-1",
        company: "Clinitech",
        badge: "Product in development",
        role: "Founder & Full-Stack Developer",
        location: "Tehran, Iran",
        period: "Ongoing",
        highlight: "Offline-first clinic management platform for Iranian clinics.",
        bullets: [
          "Designed and built a dual-server architecture: local clinic server (offline-tolerant) and cloud server (for licensing, encrypted backups, and SMS coordination).",
          "Implemented appointment scheduling with priority/queue logic, patient EMR with record-sharing and isolation controls, RSA-encrypted backup & restore, and an SMS notification pipeline.",
          "Led a small founding team, coordinating with a co-founder on DevOps and a marketing partner on regional go-to-market efforts across multiple Iranian cities.",
        ],
        tags: ["Django", "Channels", "Celery", "Redis", "Docker"],
        icon: "cross",
      },
    ],
    selectedProjects: [
      {
        id: "proj-1",
        title: "CRM-Nuxt",
        subtitle: "RTL-First CRM Dashboard",
        linkText: "GitHub ↗",
        linkUrl: "https://github.com/amirrezesf/CRM-Nuxt",
        description:
          "A Persian, right-to-left CRM/admin dashboard with Jalali-calendar-aware date handling, a sales pipeline board, ranking tables, and Chart.js-driven analytics widgets — built for local-market sales and operations teams.",
        techStack: "Tech: Nuxt 4, Vue 3, TypeScript, Tailwind CSS, SCSS, Chart.js",
        icon: "dashboard",
      },
      {
        id: "proj-2",
        title: "Food-App",
        subtitle: "Full-Stack Delivery Platform",
        linkText: "GitHub ↗",
        linkUrl: "https://github.com/amirrezesf/Food-App",
        description:
          "A full-stack food delivery system covering map-based delivery coverage, multi-branch support, financial reporting, and real-time order tracking across web and mobile.",
        techStack: "Tech: Django, DRF, React, Flutter, PostgreSQL/SQLite, REST APIs",
        icon: "food",
      },
    ],
    moreProjects: [
      {
        id: "proj-3",
        title: "Chat-App",
        subtitle: "Real-Time Messaging App",
        linkText: "GitHub ↗",
        linkUrl: "https://github.com/amirrezesf/Chat-App",
        description:
          "A Flutter chat application backed by a Django server, supporting real-time communication behind a modern, custom-built UI.",
        techStack: "Tech: Flutter, Dart, Django",
        icon: "chat",
      },
      {
        id: "proj-4",
        title: "wire2django",
        subtitle: "Wireframe-to-Code Generator",
        linkText: "GitHub ↗",
        linkUrl: "https://github.com/amirrezesf/wire2django",
        description:
          "A computer-vision tool that converts hand-drawn UI wireframes into working Django applications: detects form fields with OCR, infers Django field types, and generates ready-to-use models, forms, and views.",
        techStack: "Tech: Python, Django, OpenCV, OCR",
        icon: "code",
      },
    ],
    highlights: [
      {
        id: "hl-1",
        title: "Offline-First Architecture",
        description: "Local operations with cloud synchronization and encrypted backups.",
        icon: "database",
      },
      {
        id: "hl-2",
        title: "Real-Time Systems",
        description: "WebSocket updates using Django Channels and ASGI.",
        icon: "zap",
      },
      {
        id: "hl-3",
        title: "Security & Data Integrity",
        description: "RSA encryption, secure backups, and controlled access.",
        icon: "shield",
      },
      {
        id: "hl-4",
        title: "Scalable Infrastructure",
        description: "Docker, Redis, Celery for background tasks and reliable services.",
        icon: "cloud",
      },
      {
        id: "hl-5",
        title: "REST APIs & Integrations",
        description: "Clean architecture with well-documented APIs and external services (SMS, etc.).",
        icon: "api",
      },
      {
        id: "hl-6",
        title: "RTL / Persian Interfaces",
        description: "Experience building modern, right-to-left UIs and Persian UX conventions.",
        icon: "monitor",
      },
    ],
    educations: [
      {
        id: "edu-1",
        degree: "Bachelor of Science — Health Information Technology (HIT)",
        institution: "Ahvaz Jundishapur University of Medical Sciences",
        period: "2023 – Present",
      },
    ],
    footerQuotePage1: "Build · Ship · Improve",
    footerQuotePage2: "Better Systems. Better Experiences.",
  },
  fa: {
    name: "امیررضا اسفندیاری",
    roleTitle: "توسعه‌دهنده نرم‌افزار فول‌استک (Full-Stack Developer)",
    contact: {
      email: "amirrezesf@gmail.com",
      phone: "+98 9214834536",
      location: "تهران، ایران",
      github: "github.com/amirrezesf",
      linkedin: "linkedin.com/in/amirrezesf",
      website: "amirrezesf.github.io",
    },
    summary:
      "توسعه‌دهنده فول‌استک متخصص در طراحی و ساخت سیستم‌های کامل و مقیاس‌پذیر در محیط‌های عملیاتی؛ ترکیب بک‌اند جنگو و DRF با فرانت‌اندهای مدرن React و Vue/Nuxt و توسعه اپلیکیشن موبایل با Flutter. بنیان‌گذار کلینیتک (Clinitech)، سامانه مدیریت هوشمند مراکز پزشکی مبتنی بر معماری Offline-First جهت حفظ تداوم کامل فعالیت در زمان قطعی اینترنت، همگام‌سازی ابری امن و به‌روزرسانی زنده. مسلط بر مدیریت چرخه کامل محصول از معماری و طراحی دیتابیس تا پیاده‌سازی API و رابط کاربری مدرن با تمرکز ویژه بر استانداردهای بومی و راست‌چین (RTL).",
    skillCategories: [
      {
        id: "backend",
        title: "بک‌اند (BACKEND)",
        skills: ["Python", "Django", "DRF", "Channels", "Celery", "FastAPI"],
      },
      {
        id: "frontend",
        title: "فرانت‌اند (FRONTEND)",
        skills: ["React", "Vue", "Nuxt", "TypeScript", "HTML/CSS", "Tailwind CSS"],
      },
      {
        id: "mobile",
        title: "موبایل (MOBILE)",
        skills: ["Flutter", "Dart"],
      },
      {
        id: "data-infra",
        title: "داده و زیرساخت (DATA / INFRA)",
        skills: ["Redis", "SQLite", "Docker", "Git"],
      },
      {
        id: "other",
        title: "سایر مهارت‌ها (OTHER)",
        skills: ["Android Studio", "Computer Vision / OCR (OpenCV)"],
      },
    ],
    languages: [
      { name: "فارسی", level: "زبان مادری" },
      { name: "انگلیسی", level: "پیشرفته (C1)" },
    ],
    experiences: [
      {
        id: "exp-1",
        company: "کلینیتک (Clinitech)",
        badge: "محصول در حال توسعه",
        role: "بنیان‌گذار و توسعه‌دهنده ارشد فول‌استک",
        location: "تهران، ایران",
        period: "در حال حاضر",
        highlight: "پلتفرم مدیریت جامع و آفلاین‌محور مراکز درمانی و کلینیک‌های پزشکی ایران.",
        bullets: [
          "طراحی و پیاده‌سازی معماری دو سروری: سرور محلی مستقر در کلینیک (مقاوم در برابر قطعی کامل اینترنت) و سرور مرکزی ابری (جهت صدور لایسنس، پشتیبان‌گیری رمزنگاری‌شده و هماهنگی پیامک‌ها).",
          "پیاده‌سازی نوبت‌دهی هوشمند با الگوریتم مدیریت صف و اولویت، پرونده الکترونیک سلامت بیماران (EMR) با تفکیک دقیق دسترسی‌ها، پشتیبان‌گیری خودکار رمزنگاری‌شده RSA و پایپ‌لاین ارسال پیامک.",
          "مدیریت تیم فنی هسته، هماهنگی با متخصص دواپس و هدایت بازاریابی منطقه‌ای برای استقرار نرم‌افزار در مراکز درمانی چندین شهر کشور.",
        ],
        tags: ["Django", "Channels", "Celery", "Redis", "Docker"],
        icon: "cross",
      },
    ],
    selectedProjects: [
      {
        id: "proj-1",
        title: "CRM-Nuxt",
        subtitle: "داشبورد مدیریت ارتباط با مشتری تماماً راست‌چین",
        linkText: "گیت‌هاب ↖",
        linkUrl: "https://github.com/amirrezesf/CRM-Nuxt",
        description:
          "سامانه داشبورد مدیریتی و CRM بومی با پشتیبانی کامل از تاریخ و تقویم شمسی (جلالی)، پایپ‌لاین فروش کانبان، جداول ارزیابی عملکرد و نمودارهای آماری تحلیلی Chart.js ویژه تیم‌های فروش و عملیات.",
        techStack: "فناوری‌ها: Nuxt 4, Vue 3, TypeScript, Tailwind CSS, SCSS, Chart.js",
        icon: "dashboard",
      },
      {
        id: "proj-2",
        title: "Food-App",
        subtitle: "سامانه یکپارچه سفارش آنلاین و توزیع غذا",
        linkText: "گیت‌هاب ↖",
        linkUrl: "https://github.com/amirrezesf/Food-App",
        description:
          "پلتفرم فول‌استک توزیع غذا شامل تعیین محدوده دلیوری روی نقشه، پشتیبانی چندشعبه‌ای، گزارش‌های مالی و سیستم پیگیری زنده سفارش در وب و اپلیکیشن موبایل.",
        techStack: "فناوری‌ها: Django, DRF, React, Flutter, PostgreSQL/SQLite, REST APIs",
        icon: "food",
      },
    ],
    moreProjects: [
      {
        id: "proj-3",
        title: "Chat-App",
        subtitle: "پیام‌رسان بلادرنگ و سریع موبایل",
        linkText: "گیت‌هاب ↖",
        linkUrl: "https://github.com/amirrezesf/Chat-App",
        description:
          "اپلیکیشن چت توسعه‌یافته با فلاتر و متصل به سرور قدرتمند جنگو با معماری وب‌سوکت برای تبادل پیام‌های همزمان با رابط کاربری اختصاصی و روان.",
        techStack: "فناوری‌ها: Flutter, Dart, Django",
        icon: "chat",
      },
      {
        id: "proj-4",
        title: "wire2django",
        subtitle: "مولد هوشمند کد جنگو از روی وایرفریم",
        linkText: "گیت‌هاب ↖",
        linkUrl: "https://github.com/amirrezesf/wire2django",
        description:
          "ابزار بینایی ماشین برای تبدیل طرح‌های دستی و کاغذی UI به پروژه‌های عملیاتی جنگو: استخراج خودکار فرم‌ها با الگوریتم OCR، تشخیص تایپ‌های فیلد و تولید فایل‌های Model، Form و View.",
        techStack: "فناوری‌ها: Python, Django, OpenCV, OCR",
        icon: "code",
      },
    ],
    highlights: [
      {
        id: "hl-1",
        title: "معماری آفلاین‌محور (Offline-First)",
        description: "تداوم بدون وقفه عملیات محلی همراه با همگام‌سازی ابری و بکاپ رمزنگاری‌شده.",
        icon: "database",
      },
      {
        id: "hl-2",
        title: "سیستم‌های بلادرنگ (Real-Time)",
        description: "تبادل آنی پیام و اعلان با WebSocket مبتنی بر Django Channels و ASGI.",
        icon: "zap",
      },
      {
        id: "hl-3",
        title: "امنیت و یکپارچگی داده‌ها",
        description: "رمزنگاری پیشرفته RSA، پشتیبان‌گیری خودکار و سطوح دسترسی تفکیک‌شده.",
        icon: "shield",
      },
      {
        id: "hl-4",
        title: "زیرساخت ابری و مقیاس‌پذیر",
        description: "مدیریت پردازش‌های پس‌زمینه با Docker، Redis و Celery برای پایداری حداکثری.",
        icon: "cloud",
      },
      {
        id: "hl-5",
        title: "طراحی REST API و اتصال به وب‌سرویس‌ها",
        description: "معماری تمیز، مستندسازی استاندارد OpenAPI و ارتباط با درگاه‌ها و پیامک.",
        icon: "api",
      },
      {
        id: "hl-6",
        title: "تخصص عمیق در استانداردهای RTL و فارسی",
        description: "تسلط کامل بر چالش‌های تایپوگرافی، تقویم شمسی و الگوهای کاربری راست‌چین.",
        icon: "monitor",
      },
    ],
    educations: [
      {
        id: "edu-1",
        degree: "کارشناسی فناوری اطلاعات سلامت (HIT)",
        institution: "دانشگاه علوم پزشکی جندی‌شاپور اهواز",
        period: "۱۴۰۲ – تاکنون",
      },
    ],
    footerQuotePage1: "ساخت · انتشار · ارتقا",
    footerQuotePage2: "سیستم‌های پایدارتر. تجربه‌های غنی‌تر.",
  },
};

export const defaultThemeColors = [
  {
    name: 'Cobalt Blue (Original)',
    value: '#2563eb', // Matches the sent photo accent
    lightBg: '#eff6ff',
    border: '#bfdbfe',
    text: '#1d4ed8',
    ring: '#3b82f6',
  },
  {
    name: 'Teal Cyan',
    value: '#0d9488',
    lightBg: '#f0fdfa',
    border: '#99f6e4',
    text: '#0f766e',
    ring: '#14b8a6',
  },
  {
    name: 'Emerald Green',
    value: '#059669',
    lightBg: '#ecfdf5',
    border: '#a7f3d0',
    text: '#047857',
    ring: '#10b981',
  },
  {
    name: 'Indigo Violet',
    value: '#6366f1',
    lightBg: '#eef2ff',
    border: '#c7d2fe',
    text: '#4338ca',
    ring: '#6366f1',
  },
  {
    name: 'Neutral Slate',
    value: '#334155',
    lightBg: '#f1f5f9',
    border: '#cbd5e1',
    text: '#1e293b',
    ring: '#475569',
  },
  {
    name: 'Deep Crimson',
    value: '#e11d48',
    lightBg: '#fff1f2',
    border: '#fecdd3',
    text: '#be123c',
    ring: '#f43f5e',
  },
];