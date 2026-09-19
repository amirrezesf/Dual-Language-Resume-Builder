import React from 'react';
import {
  Mail,
  Phone,
  MapPin,
  Github,
  Linkedin,
  Globe,
  Database,
  Zap,
  ShieldCheck,
  GraduationCap,
} from 'lucide-react';
import { ResumeContent, Language, ResumeSettings } from '../../types';
import { ResumeLogo } from '../ResumeLogo';
import { SkillBadge } from '../common/SkillBadge';
import { normalizeLinkHref } from '../../utils/linkUtils';

interface LayoutProps {
  data: ResumeContent;
  language: Language;
  settings: ResumeSettings;
  pageFilter?: 'all' | '1' | '2';
}

export const CompactSingleLayout: React.FC<LayoutProps> = ({
  data,
  language,
  settings,
}) => {
  const isRtl = language === 'fa';
  const accent = settings.accentColor || '#2563eb';

  const labels = {
    summary: isRtl ? 'خلاصه سوابق حرفه‌ای' : 'PROFESSIONAL SUMMARY',
    skills: isRtl ? 'مهارت‌های فنی' : 'TECHNICAL SKILLS',
    experience: isRtl ? 'سوابق کاری' : 'EXPERIENCE',
    projects: isRtl ? 'پروژه‌های شاخص' : 'SELECTED PROJECTS',
    highlights: isRtl ? 'رویکردهای مهندسی' : 'CORE CAPABILITIES',
    education: isRtl ? 'تحصیلات' : 'EDUCATION',
    page1Of1: isRtl ? 'صفحه ۱ از ۱ (تک صفحه‌ای)' : 'Page 1 of 1',
  };

  return (
    <div
      id="resume-page-1"
      className="resume-sheet resume-page relative bg-white text-slate-900 px-8 pt-7 pb-6 flex flex-col justify-between shadow-xl sm:rounded-sm border border-slate-200/80 overflow-hidden"
      style={{ width: '210mm', minHeight: '297mm', height: '297mm' }}
    >
      <div className="space-y-3.5">
        {/* COMPACT HEADER */}
        <header className="flex items-start justify-between gap-4 pb-2.5 border-b border-slate-200">
          <div className="flex items-center gap-3">
            <ResumeLogo color={accent} className="w-8 h-8 shrink-0" />
            <div>
              <h1 className={`${isRtl ? '' : 'tracking-tight'} text-[22px] font-black text-slate-950 leading-none`}>
                {data.name}
              </h1>
              <p
                className={`${isRtl ? '' : 'tracking-wider'} text-[10.5px] font-bold uppercase mt-1`}
                style={{ color: accent }}
              >
                {data.roleTitle}
              </p>
            </div>
          </div>

          {/* Contact 2x3 Mini Grid */}
          <div className="grid grid-cols-2 gap-x-4 gap-y-1 text-[10px] text-slate-600 font-medium">
            <span className="truncate flex items-center gap-1">
              <Mail className="w-3 h-3 text-slate-400 shrink-0" />
              {data.contact.email}
            </span>
            <span className="truncate flex items-center gap-1">
              <Phone className="w-3 h-3 text-slate-400 shrink-0" />
              {data.contact.phone}
            </span>
            <span className="truncate flex items-center gap-1">
              <Github className="w-3 h-3 text-slate-400 shrink-0" />
              {data.contact.github}
            </span>
            <span className="truncate flex items-center gap-1">
              <MapPin className="w-3 h-3 text-slate-400 shrink-0" />
              {data.contact.location}
            </span>
          </div>
        </header>

        {/* SUMMARY */}
        <section>
          <div className="flex items-center gap-2 mb-1">
            <h2 className={`${isRtl ? '' : 'tracking-wider'} text-[10.5px] font-extrabold uppercase text-slate-900 shrink-0`}>
              {labels.summary}
            </h2>
            <div className="h-px bg-slate-200 flex-1" />
          </div>
          <p className="text-[10.5px] leading-[1.55] text-slate-700 text-justify">
            {data.summary}
          </p>
        </section>

        {/* TECHNICAL SKILLS */}
        <section>
          <div className="flex items-center gap-2 mb-1.5">
            <h2 className={`${isRtl ? '' : 'tracking-wider'} text-[10.5px] font-extrabold uppercase text-slate-900 shrink-0`}>
              {labels.skills}
            </h2>
            <div className="h-px bg-slate-200 flex-1" />
          </div>

          <div className="grid grid-cols-2 gap-x-4 gap-y-2 text-[10px]">
            {data.skillCategories.slice(0, 4).map((cat) => (
              <div key={cat.id} className="space-y-1">
                <span className={`${isRtl ? '' : 'tracking-wider'} block font-bold text-slate-700 text-[9px] uppercase`}>
                  {cat.title}
                </span>
                <div className="flex flex-wrap gap-1">
                  {cat.skills.map((s, idx) => (
                    <SkillBadge
                      key={idx}
                      skill={s}
                      accentColor={accent}
                      style={settings.skillBadgeStyle || 'tinted'}
                      size="xs"
                    />
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* EXPERIENCE */}
        <section>
          <div className="flex items-center gap-2 mb-1.5">
            <h2 className={`${isRtl ? '' : 'tracking-wider'} text-[10.5px] font-extrabold uppercase text-slate-900 shrink-0`}>
              {labels.experience}
            </h2>
            <div className="h-px bg-slate-200 flex-1" />
          </div>

          {data.experiences.map((exp) => (
            <div
              key={exp.id}
              className="p-3 rounded-lg border border-slate-200 bg-slate-50/50 space-y-1"
            >
              <div className="flex items-center justify-between gap-2">
                <div className="flex items-center gap-2">
                  <span className="text-[12.5px] font-bold text-slate-950">
                    {exp.company}
                  </span>
                  {exp.badge && (
                    <span className="px-1.5 py-0.2 rounded text-[9px] font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200">
                      {exp.badge}
                    </span>
                  )}
                  <span className="text-[10.5px] text-slate-500 font-medium">
                    ({exp.role})
                  </span>
                </div>
                <span className="text-[9.5px] font-bold text-slate-500">
                  {exp.period}
                </span>
              </div>

              {exp.highlight && (
                <p className="text-[10.5px] font-semibold text-slate-800">
                  {exp.highlight}
                </p>
              )}

              <ul className="space-y-1 text-[10px] leading-normal text-slate-700">
                {exp.bullets.slice(0, 3).map((b, idx) => (
                  <li key={idx} className="flex items-start gap-1.5">
                    <span
                      className="w-1 h-1 rounded-full mt-1.5 shrink-0"
                      style={{ backgroundColor: accent }}
                    />
                    <span>{b}</span>
                  </li>
                ))}
              </ul>

              {exp.tags && exp.tags.length > 0 && (
                <div className="flex flex-wrap gap-1 pt-0.5">
                  {exp.tags.map((t, i) => (
                    <span
                      key={i}
                      className="px-1.5 py-0.2 text-[8.5px] rounded bg-white text-slate-600 border border-slate-200 font-medium"
                    >
                      {t}
                    </span>
                  ))}
                </div>
              )}
            </div>
          ))}
        </section>

        {/* SELECTED PROJECTS */}
        <section>
          <div className="flex items-center gap-2 mb-1.5">
            <h2 className={`${isRtl ? '' : 'tracking-wider'} text-[10.5px] font-extrabold uppercase text-slate-900 shrink-0`}>
              {labels.projects}
            </h2>
            <div className="h-px bg-slate-200 flex-1" />
          </div>

          <div className="grid grid-cols-2 gap-2.5">
            {data.selectedProjects.slice(0, 2).map((p) => (
              <div
                key={p.id}
                className="p-2.5 border border-slate-200 rounded-lg bg-white shadow-2xs flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-baseline justify-between gap-1 mb-0.5">
                    <span className="text-[11.5px] font-bold text-slate-900">
                      {p.title}
                    </span>
                    <a
                      href={normalizeLinkHref(p.linkUrl)}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center gap-1 text-[9.5px] font-semibold hover:underline shrink-0 ext-font-override-target"
                      style={{ color: accent }}
                    >
                      <span className="ext-font-override-target">{p.linkText}</span>
                    </a>
                  </div>
                  <p className="text-[9.5px] text-slate-600 leading-normal line-clamp-2">
                    {p.description}
                  </p>
                </div>
                <p className="text-[8.5px] text-slate-400 font-medium mt-1 pt-1 border-t border-slate-100">
                  {p.techStack}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* HIGHLIGHTS & EDUCATION IN 2 COLUMNS */}
        <div className="grid grid-cols-2 gap-3 pt-1">
          {/* Engineering Highlights */}
          <section>
            <div className="flex items-center gap-2 mb-1">
              <h2 className={`${isRtl ? '' : 'tracking-wider'} text-[10px] font-extrabold uppercase text-slate-900 shrink-0`}>
                {labels.highlights}
              </h2>
              <div className="h-px bg-slate-200 flex-1" />
            </div>
            <div className="space-y-1.5 text-[9.5px]">
              {data.highlights.slice(0, 3).map((hl) => (
                <div key={hl.id} className="leading-tight">
                  <span className="font-bold text-slate-900">{hl.title}: </span>
                  <span className="text-slate-600">{hl.description}</span>
                </div>
              ))}
            </div>
          </section>

          {/* Education */}
          <section>
            <div className="flex items-center gap-2 mb-1">
              <h2 className={`${isRtl ? '' : 'tracking-wider'} text-[10px] font-extrabold uppercase text-slate-900 shrink-0`}>
                {labels.education}
              </h2>
              <div className="h-px bg-slate-200 flex-1" />
            </div>
            <div className="space-y-1 text-[10px]">
              {data.educations.map((edu) => (
                <div key={edu.id}>
                  <span className="font-bold text-slate-900 block leading-tight">
                    {edu.degree}
                  </span>
                  <span className="text-slate-600 text-[9.5px] block">
                    {edu.institution} • {edu.period}
                  </span>
                </div>
              ))}
            </div>
          </section>
        </div>
      </div>

      {/* FOOTER */}
      <footer className="pt-2 border-t border-slate-200 flex items-center justify-between text-[9px] text-slate-400 font-medium">
        <span>{data.footerQuotePage1}</span>
        <span>{labels.page1Of1}</span>
      </footer>
    </div>
  );
};
