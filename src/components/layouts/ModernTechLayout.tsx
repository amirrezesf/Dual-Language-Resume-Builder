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
  Database,
  Zap,
  ShieldCheck,
  Cloud,
  Monitor,
  Code2,
  Utensils,
  MessageCircle,
  LayoutDashboard,
  Activity,
  Network,
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

export const ModernTechLayout: React.FC<LayoutProps> = ({
  data,
  language,
  settings,
  pageFilter = 'all',
}) => {
  const isRtl = language === 'fa';
  const accent = settings.accentColor || '#2563eb';

  const labels = {
    summary: isRtl ? 'خلاصه سوابق حرفه‌ای' : 'PROFESSIONAL SUMMARY',
    skills: isRtl ? 'مهارت‌های فنی' : 'TECHNICAL SKILLS',
    experience: isRtl ? 'سوابق کاری و حرفه‌ای' : 'EXPERIENCE',
    selectedProjects: isRtl ? 'پروژه‌های منتخب' : 'SELECTED PROJECTS',
    moreProjects: isRtl ? 'سایر پروژه‌ها' : 'MORE PROJECTS',
    highlights: isRtl ? 'برجستگی‌های فنی و مهندسی' : 'ENGINEERING HIGHLIGHTS',
    education: isRtl ? 'تحصیلات و مدارک دانشگاهی' : 'EDUCATION',
    page1Of2: isRtl ? 'صفحه ۱ از ۲' : 'Page 1 of 2',
    page2Of2: isRtl ? 'صفحه ۲ از ۲' : 'Page 2 of 2',
    languages: isRtl ? 'زبان‌ها' : 'Languages',
  };

  const renderProjectIcon = (iconName?: string) => {
    switch (iconName) {
      case 'dashboard':
        return <LayoutDashboard className="w-4 h-4 text-blue-600" />;
      case 'food':
        return <Utensils className="w-4 h-4 text-blue-600" />;
      case 'chat':
        return <MessageCircle className="w-4 h-4 text-blue-600" />;
      case 'code':
        return <Code2 className="w-4 h-4 text-blue-600" />;
      default:
        return <Code2 className="w-4 h-4 text-blue-600" />;
    }
  };

  const renderHighlightIcon = (iconName: string) => {
    switch (iconName) {
      case 'database':
        return <Database className="w-4 h-4" style={{ color: accent }} />;
      case 'zap':
        return <Zap className="w-4 h-4" style={{ color: accent }} />;
      case 'shield':
        return <ShieldCheck className="w-4 h-4" style={{ color: accent }} />;
      case 'cloud':
        return <Cloud className="w-4 h-4" style={{ color: accent }} />;
      case 'api':
        return <Network className="w-4 h-4" style={{ color: accent }} />;
      case 'monitor':
        return <Monitor className="w-4 h-4" style={{ color: accent }} />;
      default:
        return <Activity className="w-4 h-4" style={{ color: accent }} />;
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
          className="resume-sheet resume-page relative bg-white text-slate-900 px-10 pt-10 pb-8 flex flex-col justify-between shadow-xl sm:rounded-sm border border-slate-200/80 overflow-hidden"
          style={{ width: '210mm', minHeight: '297mm', height: '297mm' }}
        >
          {/* Subtle abstract curved watermark line in top corner */}
          {settings.showWatermark && (
            <svg
              className={`absolute top-0 pointer-events-none opacity-40 select-none ${
                isRtl ? 'left-0 scale-x-[-1]' : 'right-0'
              }`}
              width="240"
              height="200"
              viewBox="0 0 240 200"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M40 0C100 40 180 30 240 120V0H40Z"
                fill="url(#paint0_linear_modern)"
                fillOpacity="0.06"
              />
              <path
                d="M120 0C170 60 210 100 240 160"
                stroke={accent}
                strokeWidth="1"
                strokeDasharray="4 4"
                strokeOpacity="0.25"
              />
              <defs>
                <linearGradient
                  id="paint0_linear_modern"
                  x1="240"
                  y1="0"
                  x2="40"
                  y2="120"
                  gradientUnits="userSpaceOnUse"
                >
                  <stop stopColor={accent} />
                  <stop offset="1" stopColor={accent} stopOpacity="0" />
                </linearGradient>
              </defs>
            </svg>
          )}

          {/* PAGE 1 TOP CONTENT */}
          <div className="flex flex-col space-y-5">
            {/* Header Section */}
            <header className="relative z-10">
              <div className="flex items-start gap-4">
                <div className="shrink-0 pt-1">
                  <ResumeLogo color={accent} className="w-9 h-9" />
                </div>
                <div className="flex-1">
                  <h1 className="text-[28px] leading-tight font-extrabold text-slate-950 tracking-tight">
                    {data.name}
                  </h1>
                  <p
                    className="text-[12px] font-bold tracking-[0.16em] uppercase mt-0.5"
                    style={{ color: '#64748b' }}
                  >
                    {data.roleTitle}
                  </p>
                </div>
              </div>

              {/* Contact Grid */}
              <div className="mt-4 pt-3 border-t border-slate-200/80 grid grid-cols-3 gap-y-2 text-[11px] text-slate-700 font-medium">
                <div className="flex items-center gap-2 overflow-hidden">
                  <Mail className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                  <a href={`mailto:${data.contact.email}`} className="hover:underline truncate">
                    {data.contact.email}
                  </a>
                </div>
                <div className="flex items-center gap-2 overflow-hidden">
                  <Phone className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                  <span className="truncate">{data.contact.phone}</span>
                </div>
                <div className="flex items-center gap-2 overflow-hidden">
                  <MapPin className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                  <span className="truncate">{data.contact.location}</span>
                </div>

                <div className="flex items-center gap-2 overflow-hidden">
                  <Github className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                  <a href={`https://${data.contact.github}`} target="_blank" rel="noreferrer" className="hover:underline truncate">
                    {data.contact.github}
                  </a>
                </div>
                <div className="flex items-center gap-2 overflow-hidden">
                  <Linkedin className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                  <a href={`https://${data.contact.linkedin}`} target="_blank" rel="noreferrer" className="hover:underline truncate">
                    {data.contact.linkedin}
                  </a>
                </div>
                <div className="flex items-center gap-2 overflow-hidden">
                  <Globe className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                  <a href={`https://${data.contact.website}`} target="_blank" rel="noreferrer" className="hover:underline truncate">
                    {data.contact.website}
                  </a>
                </div>
              </div>
            </header>

            {/* PROFESSIONAL SUMMARY */}
            <section>
              <div className="flex items-center gap-3 mb-2">
                <h2 className="text-[12px] font-extrabold uppercase tracking-wider text-slate-900 shrink-0">
                  {labels.summary}
                </h2>
                <div className="h-px bg-slate-200/90 flex-1" />
              </div>
              <p className="text-[11.5px] leading-[1.65] text-slate-700 font-normal text-justify">
                {data.summary}
              </p>
            </section>

            {/* TECHNICAL SKILLS */}
            <section>
              <div className="flex items-center gap-3 mb-3">
                <h2 className="text-[12px] font-extrabold uppercase tracking-wider text-slate-900 shrink-0">
                  {labels.skills}
                </h2>
                <div className="h-px bg-slate-200/90 flex-1" />
              </div>

              <div className="grid grid-cols-2 gap-x-6 gap-y-3">
                <div className="space-y-3">
                  {data.skillCategories.slice(0, 3).map((cat) => (
                    <div key={cat.id}>
                      <span className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">
                        {cat.title}
                      </span>
                      <div className="flex flex-wrap gap-1.5">
                        {cat.skills.map((s, idx) => (
                          <SkillBadge
                            key={idx}
                            skill={s}
                            accentColor={accent}
                            style={settings.skillBadgeStyle || 'tinted'}
                            size="md"
                          />
                        ))}
                      </div>
                    </div>
                  ))}
                </div>

                <div className="space-y-3">
                  {data.skillCategories.slice(3).map((cat) => (
                    <div key={cat.id}>
                      <span className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">
                        {cat.title}
                      </span>
                      <div className="flex flex-wrap gap-1.5">
                        {cat.skills.map((s, idx) => (
                          <SkillBadge
                            key={idx}
                            skill={s}
                            accentColor={accent}
                            style={settings.skillBadgeStyle || 'tinted'}
                            size="md"
                          />
                        ))}
                      </div>
                    </div>
                  ))}

                  {data.languages.length > 0 && (
                    <div className="pt-1.5">
                      <div className="flex items-center gap-1.5 text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">
                        <MessageCircle className="w-3 h-3 text-slate-400" />
                        <span>{labels.languages}</span>
                      </div>
                      <div className="flex flex-wrap gap-1.5">
                        {data.languages.map((l, i) => (
                          <span
                            key={i}
                            className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-md text-[10px] font-semibold border shadow-2xs"
                            style={{
                              backgroundColor: `${accent}0C`,
                              borderColor: `${accent}25`,
                              color: '#0f172a',
                            }}
                          >
                            <span
                              className="w-1.5 h-1.5 rounded-full shrink-0"
                              style={{ backgroundColor: accent }}
                            />
                            <span>{l.name}</span>
                            <span className="text-slate-500 font-normal text-[9px]">({l.level})</span>
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </section>

            {/* EXPERIENCE */}
            <section>
              <div className="flex items-center gap-3 mb-2.5">
                <h2 className="text-[12px] font-extrabold uppercase tracking-wider text-slate-900 shrink-0">
                  {labels.experience}
                </h2>
                <div className="h-px bg-slate-200/90 flex-1" />
              </div>

              {data.experiences.map((exp) => (
                <div
                  key={exp.id}
                  className="rounded-xl border border-slate-200/80 bg-slate-50/40 p-4 transition-colors"
                >
                  <div className="flex items-start justify-between gap-2">
                    <div className="flex items-center gap-2.5 flex-wrap">
                      <div className="w-6 h-6 rounded-md bg-emerald-50 text-emerald-600 border border-emerald-200/80 flex items-center justify-center shrink-0">
                        <span className="text-emerald-700 font-bold text-sm leading-none">
                          ✚
                        </span>
                      </div>
                      <span className="text-[15px] font-bold text-slate-950">
                        {exp.company}
                      </span>
                      {exp.badge && (
                        <span className="px-2 py-0.5 rounded-full text-[10px] font-medium bg-emerald-50 text-emerald-700 border border-emerald-200/80">
                          {exp.badge}
                        </span>
                      )}
                    </div>

                    {exp.tags && exp.tags.length > 0 && (
                      <div className="flex flex-wrap gap-1 justify-end max-w-[45%]">
                        {exp.tags.map((tag, tIdx) => (
                          <span
                            key={tIdx}
                            className="px-1.5 py-0.5 text-[9.5px] font-medium rounded bg-white text-slate-600 border border-slate-200/80 shadow-2xs"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>

                  <div className="text-[11px] text-slate-600 font-medium mt-1">
                    <span>{exp.role}</span>
                    <span className="mx-2 text-slate-300">|</span>
                    <span>{exp.location}</span>
                    <span className="mx-2 text-slate-300">|</span>
                    <span className="font-semibold text-slate-800">
                      {exp.period}
                    </span>
                  </div>

                  {exp.highlight && (
                    <p className="text-[11.5px] font-bold text-slate-900 mt-2">
                      {exp.highlight}
                    </p>
                  )}

                  <ul className="mt-2 space-y-1.5 text-[11px] leading-relaxed text-slate-700">
                    {exp.bullets.map((bullet, bIdx) => (
                      <li key={bIdx} className="flex items-start gap-2">
                        <span
                          className="w-1.5 h-1.5 rounded-full mt-1.5 shrink-0"
                          style={{ backgroundColor: '#059669' }}
                        />
                        <span className="flex-1">{bullet}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </section>

            {/* SELECTED PROJECTS */}
            <section>
              <div className="flex items-center gap-3 mb-2.5">
                <h2 className="text-[12px] font-extrabold uppercase tracking-wider text-slate-900 shrink-0">
                  {labels.selectedProjects}
                </h2>
                <div className="h-px bg-slate-200/90 flex-1" />
              </div>

              <div className="grid grid-cols-2 gap-3.5">
                {data.selectedProjects.map((proj) => (
                  <div
                    key={proj.id}
                    className="border border-slate-200/80 rounded-xl p-3.5 bg-slate-50/20 flex flex-col justify-between"
                  >
                    <div>
                      <div className="flex items-start justify-between gap-2 mb-1.5">
                        <div className="flex items-center gap-2">
                          <div
                            className="w-7 h-7 rounded-lg flex items-center justify-center shrink-0"
                            style={{
                              backgroundColor: `${accent}15`,
                              border: `1px solid ${accent}30`,
                            }}
                          >
                            {renderProjectIcon(proj.icon)}
                          </div>
                          <div>
                            <h3 className="text-[13px] font-bold text-slate-950 leading-tight">
                              {proj.title}
                            </h3>
                            <p className="text-[10px] text-slate-500 font-medium">
                              {proj.subtitle}
                            </p>
                          </div>
                        </div>

                        <a
                          href={proj.linkUrl}
                          target="_blank"
                          rel="noreferrer"
                          className="inline-flex items-center gap-1 text-[11px] font-semibold hover:underline shrink-0"
                          style={{ color: accent }}
                        >
                          <span>{proj.linkText}</span>
                        </a>
                      </div>

                      <p className="text-[10.5px] leading-normal text-slate-600 mt-2 line-clamp-3">
                        {proj.description}
                      </p>
                    </div>

                    <p className="text-[10px] font-medium text-slate-500 mt-2.5 pt-2 border-t border-slate-100">
                      {proj.techStack}
                    </p>
                  </div>
                ))}
              </div>
            </section>
          </div>

          {/* PAGE 1 FOOTER */}
          <footer className="pt-3 border-t border-slate-200/80 flex items-center justify-between text-[10px] text-slate-400 font-medium tracking-wide">
            <span>{data.footerQuotePage1}</span>
            <span>{labels.page1Of2}</span>
          </footer>
        </div>
      )}

      {/* ========================================================================= */}
      {/* PAGE 2 */}
      {/* ========================================================================= */}
      {settings.showPage2 && (pageFilter === 'all' || pageFilter === '2') && (
        <div
          id="resume-page-2"
          className="resume-sheet resume-page relative bg-white text-slate-900 px-10 pt-10 pb-8 flex flex-col justify-between shadow-xl sm:rounded-sm border border-slate-200/80 overflow-hidden"
          style={{ width: '210mm', minHeight: '297mm', height: '297mm' }}
        >
          <div className="flex flex-col space-y-6">
            {/* MORE PROJECTS */}
            <section>
              <div className="flex items-center gap-2 mb-3">
                <FolderGit2 className="w-4 h-4 text-slate-700" />
                <h2 className="text-[12px] font-extrabold uppercase tracking-wider text-slate-900 shrink-0">
                  {labels.moreProjects}
                </h2>
                <div className="h-px bg-slate-200/90 flex-1" />
              </div>

              <div className="space-y-3">
                {data.moreProjects.map((proj) => (
                  <div
                    key={proj.id}
                    className="border border-slate-200/80 rounded-xl p-3.5 bg-slate-50/30"
                  >
                    <div className="flex items-start justify-between gap-2 mb-1.5">
                      <div className="flex items-center gap-2.5">
                        <div
                          className="w-7 h-7 rounded-lg flex items-center justify-center shrink-0"
                          style={{
                            backgroundColor: `${accent}15`,
                            border: `1px solid ${accent}30`,
                          }}
                        >
                          {renderProjectIcon(proj.icon)}
                        </div>
                        <div>
                          <h3 className="text-[13px] font-bold text-slate-950 leading-tight">
                            {proj.title}
                          </h3>
                          <p className="text-[10.5px] text-slate-500 font-medium">
                            {proj.subtitle}
                          </p>
                        </div>
                      </div>

                      <a
                        href={proj.linkUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="inline-flex items-center gap-1 text-[11px] font-semibold hover:underline shrink-0"
                        style={{ color: accent }}
                      >
                        <span>{proj.linkText}</span>
                      </a>
                    </div>

                    <p className="text-[11px] leading-relaxed text-slate-600 mt-1.5">
                      {proj.description}
                    </p>

                    <p className="text-[10px] font-medium text-slate-500 mt-2">
                      {proj.techStack}
                    </p>
                  </div>
                ))}
              </div>
            </section>

            {/* ENGINEERING HIGHLIGHTS */}
            <section>
              <div className="flex items-center gap-2 mb-3">
                <Layers className="w-4 h-4 text-slate-700" />
                <h2 className="text-[12px] font-extrabold uppercase tracking-wider text-slate-900 shrink-0">
                  {labels.highlights}
                </h2>
                <div className="h-px bg-slate-200/90 flex-1" />
              </div>

              <div className="grid grid-cols-3 gap-3">
                {data.highlights.map((hl) => (
                  <div
                    key={hl.id}
                    className="border border-slate-200/80 rounded-xl p-3 bg-slate-50/40 flex flex-col"
                  >
                    <div className="mb-2">
                      <div
                        className="w-6 h-6 rounded-md flex items-center justify-center"
                        style={{
                          backgroundColor: `${accent}15`,
                        }}
                      >
                        {renderHighlightIcon(hl.icon)}
                      </div>
                    </div>
                    <h3 className="text-[11.5px] font-bold text-slate-900 leading-tight">
                      {hl.title}
                    </h3>
                    <p className="text-[10px] leading-relaxed text-slate-600 mt-1">
                      {hl.description}
                    </p>
                  </div>
                ))}
              </div>
            </section>

            {/* EDUCATION */}
            <section>
              <div className="flex items-center gap-2 mb-3">
                <GraduationCap className="w-4 h-4 text-slate-700" />
                <h2 className="text-[12px] font-extrabold uppercase tracking-wider text-slate-900 shrink-0">
                  {labels.education}
                </h2>
                <div className="h-px bg-slate-200/90 flex-1" />
              </div>

              <div className="space-y-2">
                {data.educations.map((edu) => (
                  <div key={edu.id} className="pl-1">
                    <h3 className="text-[13px] font-bold text-slate-900">
                      {edu.degree}
                    </h3>
                    <p className="text-[11px] text-slate-600 font-medium mt-0.5">
                      <span>{edu.institution}</span>
                      <span className="mx-2 text-slate-300">|</span>
                      <span className="text-slate-500">{edu.period}</span>
                    </p>
                  </div>
                ))}
              </div>
            </section>
          </div>

          {/* PAGE 2 FOOTER */}
          <footer className="pt-3 border-t border-slate-200/80 flex items-center justify-between text-[10px] text-slate-400 font-medium tracking-wide">
            <span>{data.footerQuotePage2}</span>
            <span>{labels.page2Of2}</span>
          </footer>
        </div>
      )}
    </>
  );
};
