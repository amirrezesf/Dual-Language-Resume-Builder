import React from 'react';
import {
  Mail,
  Phone,
  MapPin,
  Github,
  Linkedin,
  Globe,
  GraduationCap,
  Layers,
  FolderGit2,
  Briefcase,
  Code2,
  Utensils,
  MessageCircle,
  LayoutDashboard,
  ShieldCheck,
  Zap,
  Database,
  Cloud,
  Network,
  Monitor,
  CheckCircle2,
} from 'lucide-react';
import { ResumeContent, Language, ResumeSettings } from '../../types';
import { ResumeLogo } from '../ResumeLogo';
import { SkillBadge } from '../common/SkillBadge';

interface LayoutProps {
  data: ResumeContent;
  language: Language;
  settings: ResumeSettings;
  pageFilter?: 'all' | '1' | '2';
}

export const ExecutiveSidebarLayout: React.FC<LayoutProps> = ({
  data,
  language,
  settings,
  pageFilter = 'all',
}) => {
  const isRtl = language === 'fa';
  const accent = settings.accentColor || '#2563eb';

  const labels = {
    summary: isRtl ? 'درباره من و خلاصه حرفه‌ای' : 'EXECUTIVE SUMMARY',
    skills: isRtl ? 'مهارت‌های تخصصی' : 'SKILLS & EXPERTISE',
    experience: isRtl ? 'سوابق اجرایی و شغلی' : 'WORK EXPERIENCE',
    selectedProjects: isRtl ? 'پروژه‌های شاخص' : 'FEATURED PROJECTS',
    moreProjects: isRtl ? 'سایر پروژه‌ها' : 'ADDITIONAL PROJECTS',
    highlights: isRtl ? 'تمرکز و رویکردهای مهندسی' : 'KEY CAPABILITIES',
    education: isRtl ? 'تحصیلات و دانشگاه' : 'EDUCATION',
    contact: isRtl ? 'اطلاعات تماس' : 'CONTACT',
    languages: isRtl ? 'زبان‌ها' : 'LANGUAGES',
    page1Of2: isRtl ? 'صفحه ۱ از ۲' : 'Page 1 of 2',
    page2Of2: isRtl ? 'صفحه ۲ از ۲' : 'Page 2 of 2',
  };

  const renderHighlightIcon = (iconName: string) => {
    switch (iconName) {
      case 'database':
        return <Database className="w-3.5 h-3.5" style={{ color: accent }} />;
      case 'zap':
        return <Zap className="w-3.5 h-3.5" style={{ color: accent }} />;
      case 'shield':
        return <ShieldCheck className="w-3.5 h-3.5" style={{ color: accent }} />;
      case 'cloud':
        return <Cloud className="w-3.5 h-3.5" style={{ color: accent }} />;
      case 'api':
        return <Network className="w-3.5 h-3.5" style={{ color: accent }} />;
      case 'monitor':
        return <Monitor className="w-3.5 h-3.5" style={{ color: accent }} />;
      default:
        return <CheckCircle2 className="w-3.5 h-3.5" style={{ color: accent }} />;
    }
  };

  return (
    <>
      {/* ========================================================================= */}
      {/* PAGE 1 */}
      {/* ========================================================================= */}
      {(pageFilter === 'all' || pageFilter === '1') && (
        <div
          id="resume-page-1"
          className="resume-sheet resume-page relative bg-white text-slate-900 flex shadow-xl sm:rounded-sm border border-slate-200/80 overflow-hidden"
          style={{ width: '210mm', minHeight: '297mm', height: '297mm' }}
        >
          {/* SIDEBAR (Left in LTR, Right in RTL) */}
          <aside
            className={`w-[70mm] shrink-0 bg-slate-50/90 p-7 flex flex-col justify-between ${
              isRtl ? 'border-l border-slate-200/90' : 'border-r border-slate-200/90'
            }`}
          >
            <div className="space-y-6">
              {/* Monogram / Logo Mark */}
              <div className="flex items-center gap-3 pb-4 border-b border-slate-200">
                <div
                  className="w-11 h-11 rounded-xl flex items-center justify-center shadow-xs font-black text-white text-base"
                  style={{ backgroundColor: accent }}
                >
                  {data.name
                    .split(' ')
                    .map((n) => n[0])
                    .slice(0, 2)
                    .join('')}
                </div>
                <div>
                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest block">
                    PORTFOLIO
                  </span>
                  <span className="text-xs font-bold text-slate-800">
                    {data.name.split(' ')[0]}
                  </span>
                </div>
              </div>

              {/* CONTACT SECTION */}
              <div>
                <h3
                  className="text-[10px] font-extrabold uppercase tracking-widest mb-2.5 pb-1 border-b"
                  style={{ color: accent, borderColor: `${accent}30` }}
                >
                  {labels.contact}
                </h3>
                <div className="space-y-2 text-[10.5px] text-slate-700 font-medium">
                  <div className="flex items-center gap-2">
                    <Mail className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                    <span className="truncate">{data.contact.email}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Phone className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                    <span>{data.contact.phone}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <MapPin className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                    <span>{data.contact.location}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Github className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                    <span className="truncate">{data.contact.github}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Linkedin className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                    <span className="truncate">{data.contact.linkedin}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Globe className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                    <span className="truncate">{data.contact.website}</span>
                  </div>
                </div>
              </div>

              {/* TECHNICAL SKILLS */}
              <div>
                <h3
                  className="text-[10px] font-extrabold uppercase tracking-widest mb-2.5 pb-1 border-b"
                  style={{ color: accent, borderColor: `${accent}30` }}
                >
                  {labels.skills}
                </h3>
                <div className="space-y-3">
                  {data.skillCategories.slice(0, 4).map((cat) => (
                    <div key={cat.id}>
                      <span className="block text-[9.5px] font-bold text-slate-500 uppercase tracking-wider mb-1">
                        {cat.title}
                      </span>
                      <div className="flex flex-wrap gap-1">
                        {cat.skills.map((s, idx) => (
                          <SkillBadge
                            key={idx}
                            skill={s}
                            accentColor={accent}
                            style={settings.skillBadgeStyle || 'tinted'}
                            size="sm"
                          />
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* LANGUAGES */}
              {data.languages.length > 0 && (
                <div>
                  <h3
                    className="text-[10px] font-extrabold uppercase tracking-widest mb-2 pb-1 border-b"
                    style={{ color: accent, borderColor: `${accent}30` }}
                  >
                    {labels.languages}
                  </h3>
                  <div className="space-y-1 text-[10.5px]">
                    {data.languages.map((l, idx) => (
                      <div key={idx} className="flex justify-between items-center">
                        <span className="font-semibold text-slate-800">{l.name}</span>
                        <span className="text-slate-500 text-[10px]">{l.level}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* SIDEBAR FOOTER */}
            <div className="text-[9.5px] text-slate-400 font-medium pt-3 border-t border-slate-200">
              {data.footerQuotePage1}
            </div>
          </aside>

          {/* MAIN CONTENT AREA */}
          <main className="flex-1 p-8 flex flex-col justify-between overflow-hidden">
            <div className="space-y-5">
              {/* Header */}
              <header className="pb-3 border-b border-slate-200">
                <h1 className="text-[28px] font-extrabold text-slate-950 tracking-tight leading-tight">
                  {data.name}
                </h1>
                <p
                  className="text-xs font-bold uppercase tracking-[0.18em] mt-1"
                  style={{ color: accent }}
                >
                  {data.roleTitle}
                </p>
              </header>

              {/* SUMMARY */}
              <section>
                <h2 className="text-[11.5px] font-extrabold uppercase tracking-wider text-slate-900 mb-1.5">
                  {labels.summary}
                </h2>
                <p className="text-[11px] leading-[1.65] text-slate-700 text-justify">
                  {data.summary}
                </p>
              </section>

              {/* EXPERIENCE */}
              <section>
                <h2 className="text-[11.5px] font-extrabold uppercase tracking-wider text-slate-900 mb-2.5">
                  {labels.experience}
                </h2>
                <div className="space-y-3">
                  {data.experiences.map((exp) => (
                    <div
                      key={exp.id}
                      className={`pl-3.5 ${
                        isRtl ? 'border-r-2 pr-3.5 pl-0' : 'border-l-2'
                      }`}
                      style={{ borderColor: accent }}
                    >
                      <div className="flex items-center justify-between gap-2">
                        <div className="flex items-center gap-2">
                          <span className="text-[14px] font-bold text-slate-950">
                            {exp.company}
                          </span>
                          {exp.badge && (
                            <span className="px-1.5 py-0.5 rounded text-[9.5px] font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200">
                              {exp.badge}
                            </span>
                          )}
                        </div>
                        <span className="text-[10px] font-bold text-slate-500">
                          {exp.period}
                        </span>
                      </div>

                      <div className="text-[10.5px] font-medium text-slate-600 mt-0.5">
                        <span>{exp.role}</span>
                        <span className="mx-1.5 text-slate-300">•</span>
                        <span>{exp.location}</span>
                      </div>

                      {exp.highlight && (
                        <p className="text-[11px] font-semibold text-slate-800 mt-1.5">
                          {exp.highlight}
                        </p>
                      )}

                      <ul className="mt-1.5 space-y-1 text-[10.5px] leading-relaxed text-slate-700">
                        {exp.bullets.map((b, bIdx) => (
                          <li key={bIdx} className="flex items-start gap-1.5">
                            <span
                              className="w-1.5 h-1.5 rounded-full mt-1.5 shrink-0"
                              style={{ backgroundColor: accent }}
                            />
                            <span>{b}</span>
                          </li>
                        ))}
                      </ul>

                      {exp.tags && exp.tags.length > 0 && (
                        <div className="flex flex-wrap gap-1 mt-2">
                          {exp.tags.map((t, tIdx) => (
                            <span
                              key={tIdx}
                              className="px-1.5 py-0.5 text-[9px] rounded bg-slate-100 text-slate-600 font-medium"
                            >
                              {t}
                            </span>
                          ))}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </section>

              {/* SELECTED PROJECTS */}
              <section>
                <h2 className="text-[11.5px] font-extrabold uppercase tracking-wider text-slate-900 mb-2">
                  {labels.selectedProjects}
                </h2>
                <div className="grid grid-cols-2 gap-3">
                  {data.selectedProjects.map((p) => (
                    <div
                      key={p.id}
                      className="border border-slate-200 rounded-lg p-3 bg-white shadow-2xs flex flex-col justify-between"
                    >
                      <div>
                        <div className="flex items-start justify-between gap-1 mb-1">
                          <span className="text-[12px] font-bold text-slate-950">
                            {p.title}
                          </span>
                          <span
                            className="text-[10px] font-bold shrink-0"
                            style={{ color: accent }}
                          >
                            {p.linkText}
                          </span>
                        </div>
                        <p className="text-[9.5px] font-medium text-slate-500 mb-1">
                          {p.subtitle}
                        </p>
                        <p className="text-[10px] text-slate-600 leading-normal line-clamp-3">
                          {p.description}
                        </p>
                      </div>
                      <p className="text-[9px] font-medium text-slate-400 mt-2 pt-1 border-t border-slate-100">
                        {p.techStack}
                      </p>
                    </div>
                  ))}
                </div>
              </section>
            </div>

            {/* MAIN FOOTER */}
            <footer className="pt-3 border-t border-slate-200 flex items-center justify-between text-[10px] text-slate-400 font-medium">
              <span>{labels.page1Of2}</span>
            </footer>
          </main>
        </div>
      )}

      {/* ========================================================================= */}
      {/* PAGE 2 */}
      {/* ========================================================================= */}
      {settings.showPage2 && (pageFilter === 'all' || pageFilter === '2') && (
        <div
          id="resume-page-2"
          className="resume-sheet resume-page relative bg-white text-slate-900 flex shadow-xl sm:rounded-sm border border-slate-200/80 overflow-hidden"
          style={{ width: '210mm', minHeight: '297mm', height: '297mm' }}
        >
          {/* SIDEBAR PAGE 2 */}
          <aside
            className={`w-[70mm] shrink-0 bg-slate-50/90 p-7 flex flex-col justify-between ${
              isRtl ? 'border-l border-slate-200/90' : 'border-r border-slate-200/90'
            }`}
          >
            <div className="space-y-6">
              {/* EDUCATION IN SIDEBAR */}
              <div>
                <h3
                  className="text-[10px] font-extrabold uppercase tracking-widest mb-2.5 pb-1 border-b"
                  style={{ color: accent, borderColor: `${accent}30` }}
                >
                  {labels.education}
                </h3>
                <div className="space-y-2.5">
                  {data.educations.map((edu) => (
                    <div key={edu.id} className="text-[10.5px]">
                      <span className="font-bold text-slate-900 block leading-tight">
                        {edu.degree}
                      </span>
                      <span className="text-slate-600 block mt-0.5">
                        {edu.institution}
                      </span>
                      <span className="text-slate-400 text-[10px] block mt-0.5">
                        {edu.period}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* REMAINING SKILLS CATEGORIES */}
              {data.skillCategories.length > 4 && (
                <div>
                  <h3
                    className="text-[10px] font-extrabold uppercase tracking-widest mb-2 pb-1 border-b"
                    style={{ color: accent, borderColor: `${accent}30` }}
                  >
                    ADDITIONAL SKILLS
                  </h3>
                  <div className="space-y-2">
                    {data.skillCategories.slice(4).map((cat) => (
                      <div key={cat.id}>
                        <span className="block text-[9.5px] font-bold text-slate-500 uppercase tracking-wider mb-1">
                          {cat.title}
                        </span>
                        <div className="flex flex-wrap gap-1">
                          {cat.skills.map((s, idx) => (
                            <SkillBadge
                              key={idx}
                              skill={s}
                              accentColor={accent}
                              style={settings.skillBadgeStyle || 'tinted'}
                              size="sm"
                            />
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            <div className="text-[9.5px] text-slate-400 font-medium pt-3 border-t border-slate-200">
              {data.footerQuotePage2}
            </div>
          </aside>

          {/* MAIN PAGE 2 */}
          <main className="flex-1 p-8 flex flex-col justify-between overflow-hidden">
            <div className="space-y-6">
              {/* MORE PROJECTS */}
              <section>
                <h2 className="text-[11.5px] font-extrabold uppercase tracking-wider text-slate-900 mb-3 flex items-center gap-2">
                  <FolderGit2 className="w-3.5 h-3.5 text-slate-500" />
                  <span>{labels.moreProjects}</span>
                </h2>
                <div className="space-y-3">
                  {data.moreProjects.map((p) => (
                    <div
                      key={p.id}
                      className="border border-slate-200 rounded-xl p-3.5 bg-slate-50/30"
                    >
                      <div className="flex items-center justify-between mb-1">
                        <div>
                          <span className="text-[13px] font-bold text-slate-950">
                            {p.title}
                          </span>
                          <span className="mx-2 text-slate-300">•</span>
                          <span className="text-[10.5px] text-slate-500 font-medium">
                            {p.subtitle}
                          </span>
                        </div>
                        <span
                          className="text-[10.5px] font-bold"
                          style={{ color: accent }}
                        >
                          {p.linkText}
                        </span>
                      </div>
                      <p className="text-[10.5px] text-slate-600 leading-relaxed mt-1">
                        {p.description}
                      </p>
                      <p className="text-[9.5px] font-medium text-slate-400 mt-2">
                        {p.techStack}
                      </p>
                    </div>
                  ))}
                </div>
              </section>

              {/* ENGINEERING HIGHLIGHTS */}
              <section>
                <h2 className="text-[11.5px] font-extrabold uppercase tracking-wider text-slate-900 mb-3 flex items-center gap-2">
                  <Layers className="w-3.5 h-3.5 text-slate-500" />
                  <span>{labels.highlights}</span>
                </h2>
                <div className="grid grid-cols-2 gap-3">
                  {data.highlights.map((hl) => (
                    <div
                      key={hl.id}
                      className="border border-slate-200 rounded-lg p-3 bg-white shadow-2xs flex items-start gap-2.5"
                    >
                      <div
                        className="w-7 h-7 rounded-md shrink-0 flex items-center justify-center mt-0.5"
                        style={{ backgroundColor: `${accent}15` }}
                      >
                        {renderHighlightIcon(hl.icon)}
                      </div>
                      <div>
                        <span className="text-[11px] font-bold text-slate-900 block leading-tight">
                          {hl.title}
                        </span>
                        <span className="text-[10px] text-slate-600 leading-normal block mt-0.5">
                          {hl.description}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </section>
            </div>

            <footer className="pt-3 border-t border-slate-200 flex items-center justify-between text-[10px] text-slate-400 font-medium">
              <span>{labels.page2Of2}</span>
            </footer>
          </main>
        </div>
      )}
    </>
  );
};
