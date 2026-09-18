export type Language = 'en' | 'fa';

export type ResumeLayoutId =
  | 'modern-tech'
  | 'dual-box-board'
  | 'executive-sidebar'
  | 'classic-minimal'
  | 'compact-single';

export interface LayoutOption {
  id: ResumeLayoutId;
  name: string;
  nameFa: string;
  description: string;
  descriptionFa: string;
  badge?: string;
}

export interface ContactInfo {
  email: string;
  phone: string;
  location: string;
  github: string;
  linkedin: string;
  website: string;
}

export interface SkillCategory {
  id: string;
  title: string;
  skills: string[];
}

export interface LanguageProficiency {
  name: string;
  level: string;
}

export interface ExperienceItem {
  id: string;
  company: string;
  badge?: string;
  role: string;
  location: string;
  period: string;
  highlight: string;
  bullets: string[];
  tags: string[];
  icon?: string;
}

export interface ProjectItem {
  id: string;
  title: string;
  subtitle: string;
  linkText: string;
  linkUrl: string;
  description: string;
  techStack: string;
  icon?: string;
}

export interface EngineeringHighlight {
  id: string;
  title: string;
  description: string;
  icon: string;
}

export interface EducationItem {
  id: string;
  degree: string;
  institution: string;
  period: string;
}

export interface ResumeContent {
  name: string;
  roleTitle: string;
  contact: ContactInfo;
  summary: string;
  skillCategories: SkillCategory[];
  languages: LanguageProficiency[];
  experiences: ExperienceItem[];
  selectedProjects: ProjectItem[];
  moreProjects: ProjectItem[];
  highlights: EngineeringHighlight[];
  educations: EducationItem[];
  footerQuotePage1: string;
  footerQuotePage2: string;
}

export interface DualResumeData {
  en: ResumeContent;
  fa: ResumeContent;
}

export type AccentColor = {
  name: string;
  value: string;
  lightBg: string;
  border: string;
  text: string;
  ring: string;
};

export type SkillBadgeStyle = 'tinted' | 'outlined' | 'neutral';

export interface ResumeSettings {
  accentColor: string; // hex
  activeLanguage: Language;
  layoutId: ResumeLayoutId;
  skillBadgeStyle?: SkillBadgeStyle;
  showPage2: boolean;
  usePersianNumerals: boolean;
  showWatermark: boolean;
}
