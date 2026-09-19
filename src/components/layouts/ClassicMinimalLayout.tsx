import React from 'react';
import {
  Mail,
  Phone,
  MapPin,
  Github,
  Linkedin,
  Globe,
} from 'lucide-react';
import { ResumeContent, Language, ResumeSettings } from '../../types';
import { SkillBadge } from '../common/SkillBadge';
import { normalizeLinkHref } from '../../utils/linkUtils';

interface LayoutProps {
  data: ResumeContent;
  language: Language;
  settings: ResumeSettings;
  pageFilter?: 'all' | '1' | '2';
}

export const ClassicMinimalLayout: React.FC<LayoutProps> = ({
  data,
  language,
  settings,
  pageFilter = 'all',
}) => {
  const isRtl = language === 'fa';
  const accent = settings.accentColor || '#1e293b';

  const labels = {
    summary: isRtl ? 'خلاصه سوابق حرفه‌ای' : 'PROFESSIONAL SUMMARY',
    skills: isRtl ? 'مهارت‌های تخصصی' : 'TECHNICAL SKILLS',
    experience: isRtl ? 'سوابق کاری' : 'EXPERIENCE',
    selectedProjects: isRtl ? 'پروژه‌های شاخص' : 'SELECTED PROJECTS',
    moreProjects: isRtl ? 'سایر پروژه‌ها' : 'MORE PROJECTS',
    highlights: isRtl ? 'برجستگی‌های مهندسی' : 'ENGINEERING HIGHLIGHTS',
    education: isRtl ? 'تحصیلات' : 'EDUCATION',
    page1Of2: isRtl ? 'صفحه ۱ از ۲' : 'Page 1 of 2',
    page2Of2: isRtl ? 'صفحه ۲ از ۲' : 'Page 2 of 2',
  };

  return (
    <>
      {/* ========================================================================= */}
      {/* PAGE 1 */}
      {/* ========================================================================= */}
      {(pageFilter === 'all' || pageFilter === '1') && (
        <div
          id="resume-page-1"
          className="resume-sheet resume-page relative bg-white text-slate-900 px-12 pt-10 pb-8 flex flex-col justify-between shadow-xl sm:rounded-sm border border-slate-200/80 overflow-hidden"
          style={{ width: '210mm', minHeight: '297mm', height: '297mm' }}
        >
          <div className="space-y-5">
            {/* Header: Centered & Minimal */}
            <header className="text-center pb-3 border-b-2 border-slate-900">
              <h1 className={`${isRtl ? '' : 'tracking-tight'} text-[26px] font-black text-slate-950 uppercase`}>
                {data.name}
              </h1>
              <p
                className="text-[11.5px] font-bold tracking-[0.2em] uppercase mt-0.5"
                style={{ color: accent }}
              >
                {data.roleTitle}
              </p>

              {/* Contact Bar */}
              <div className="flex flex-wrap items-center justify-center gap-x-3 gap-y-1 mt-2.5 text-[10.5px] text-slate-600 font-medium">
                <span>{data.contact.email}</span>
                <span>•</span>
                <span>{data.contact.phone}</span>
                <span>•</span>
                <span>{data.contact.location}</span>
                <span>•</span>
                <span>{data.contact.github}</span>
                <span>•</span>
                <span>{data.contact.linkedin}</span>
              </div>
            </header>

            {/* SUMMARY */}
            <section>
              <h2
                className={`${isRtl ? '' : 'tracking-wider'} text-[11px] font-black uppercase pb-1 mb-1.5 border-b border-slate-300`}
                style={{ color: accent }}
              >
                {labels.summary}
              </h2>
              <p className="text-[11px] leading-[1.65] text-slate-700 text-justify font-normal">
                {data.summary}
              </p>
            </section>

            {/* TECHNICAL SKILLS */}
            <section>
              <h2
                className={`${isRtl ? '' : 'tracking-wider'} text-[11px] font-black uppercase pb-1 mb-2 border-b border-slate-300`}
                style={{ color: accent }}
              >
                {labels.skills}
              </h2>
              <div className="space-y-2 text-[11px]">
                {data.skillCategories.map((cat) => (
                  <div key={cat.id} className="flex items-baseline gap-2.5">
                    <span className="font-bold text-slate-800 shrink-0 w-28 uppercase text-[9.5px]">
                      {cat.title}:
                    </span>
                    <div className="flex flex-wrap gap-1.5 flex-1">
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
                {data.languages.length > 0 && (
                  <div className="flex items-baseline gap-2.5 pt-1">
                    <span className="font-bold text-slate-800 shrink-0 w-28 uppercase text-[9.5px]">
                      {isRtl ? 'زبان‌ها' : 'LANGUAGES'}:
                    </span>
                    <div className="flex flex-wrap gap-1.5 flex-1">
                      {data.languages.map((l, idx) => {
                        const hasLevel = Boolean(l.level?.trim());
                        const hasCertificate = Boolean(l.certificateTitle?.trim()) && Boolean(l.certificateUrl?.trim());
                        return (
                          <span
                            key={idx}
                            className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-md text-[9.5px] font-semibold border shadow-2xs"
                            style={{
                              backgroundColor: `${accent}0A`,
                              borderColor: `${accent}25`,
                              color: '#0f172a',
                            }}
                          >
                            <span
                              className="w-1.5 h-1.5 rounded-full shrink-0"
                              style={{ backgroundColor: accent }}
                            />
                            <span>{l.name}</span>
                            {hasLevel && <span className="text-slate-500 font-normal text-[8.5px]">({l.level})</span>}
                            {hasCertificate && (
                              <a
                                href={l.certificateUrl}
                                target="_blank"
                                rel="noreferrer"
                                className="text-slate-600 underline underline-offset-2 hover:text-slate-800"
                              >
                                — {l.certificateTitle}
                              </a>
                            )}
                          </span>
                        );
                      })}
                    </div>
                  </div>
                )}
              </div>
            </section>

            {/* WORK EXPERIENCE */}
            <section>
              <h2
                className={`${isRtl ? '' : 'tracking-wider'} text-[11px] font-black uppercase pb-1 mb-2 border-b border-slate-300`}
                style={{ color: accent }}
              >
                {labels.experience}
              </h2>

              <div className="space-y-3.5">
                {data.experiences.map((exp) => (
                  <div key={exp.id}>
                    <div className="flex items-baseline justify-between gap-2">
                      <div>
                        <span className="text-[13px] font-extrabold text-slate-950">
                          {exp.company}
                        </span>
                        <span className="mx-2 text-slate-400">/</span>
                        <span className="text-[11.5px] font-semibold text-slate-700">
                          {exp.role}
                        </span>
                      </div>
                      <span className="text-[10.5px] font-semibold text-slate-500">
                        {exp.period}
                      </span>
                    </div>

                    <div className="text-[10px] text-slate-500 font-medium mt-0.5">
                      <span>{exp.location}</span>
                      {exp.tags && exp.tags.length > 0 && (
                        <>
                          <span className="mx-1.5">•</span>
                          <span>{exp.tags.join(', ')}</span>
                        </>
                      )}
                    </div>

                    {exp.highlight && (
                      <p className="text-[11px] font-medium italic text-slate-700 mt-1">
                        {exp.highlight}
                      </p>
                    )}

                    <ul className="mt-1.5 space-y-1 text-[10.5px] text-slate-700 leading-relaxed list-disc list-inside">
                      {exp.bullets.map((bullet, idx) => (
                        <li key={idx}>
                          <span>{bullet}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </section>

            {/* SELECTED PROJECTS */}
            <section>
              <h2
                className={`${isRtl ? '' : 'tracking-wider'} text-[11px] font-black uppercase pb-1 mb-2 border-b border-slate-300`}
                style={{ color: accent }}
              >
                {labels.selectedProjects}
              </h2>

              <div className="space-y-3">
                {data.selectedProjects.map((p) => (
                  <div key={p.id}>
                    <div className="flex items-baseline justify-between gap-2">
                      <div className="flex items-center gap-2">
                        <span className="text-[12.5px] font-bold text-slate-900">
                          {p.title}
                        </span>
                        <span className="text-slate-400">•</span>
                        <span className="text-[10.5px] text-slate-500 font-medium">
                          {p.subtitle}
                        </span>
                      </div>
                      <a
                        href={normalizeLinkHref(p.linkUrl)}
                        target="_blank"
                        rel="noreferrer"
                        className="inline-flex items-center gap-1 text-[10.5px] font-semibold hover:underline shrink-0 ext-font-override-target"
                        style={{ color: accent }}
                      >
                        <span className="ext-font-override-target">{p.linkText}</span>
                      </a>
                    </div>
                    <p className="text-[10.5px] text-slate-600 leading-relaxed mt-0.5">
                      {p.description}
                    </p>
                    <p className="text-[9.5px] font-medium text-slate-500 mt-0.5">
                      {p.techStack}
                    </p>
                  </div>
                ))}
              </div>
            </section>
          </div>

          {/* PAGE 1 FOOTER */}
          <footer className="pt-3 border-t border-slate-200 flex items-center justify-between text-[9.5px] text-slate-400 font-medium">
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
          className="resume-sheet resume-page relative bg-white text-slate-900 px-12 pt-10 pb-8 flex flex-col justify-between shadow-xl sm:rounded-sm border border-slate-200/80 overflow-hidden"
          style={{ width: '210mm', minHeight: '297mm', height: '297mm' }}
        >
          <div className="space-y-6">
            {/* MORE PROJECTS */}
            <section>
              <h2
                className={`${isRtl ? '' : 'tracking-wider'} text-[11px] font-black uppercase pb-1 mb-2.5 border-b border-slate-300`}
                style={{ color: accent }}
              >
                {labels.moreProjects}
              </h2>
              <div className="space-y-3.5">
                {data.moreProjects.map((p) => (
                  <div key={p.id}>
                    <div className="flex items-baseline justify-between gap-2">
                      <div className="flex items-center gap-2">
                        <span className="text-[12.5px] font-bold text-slate-900">
                          {p.title}
                        </span>
                        <span className="text-slate-400">•</span>
                        <span className="text-[10.5px] text-slate-500 font-medium">
                          {p.subtitle}
                        </span>
                      </div>
                      <a
                        href={normalizeLinkHref(p.linkUrl)}
                        target="_blank"
                        rel="noreferrer"
                        className="inline-flex items-center gap-1 text-[10.5px] font-semibold hover:underline shrink-0 ext-font-override-target"
                        style={{ color: accent }}
                      >
                        <span className="ext-font-override-target">{p.linkText}</span>
                      </a>
                    </div>
                    <p className="text-[10.5px] text-slate-600 leading-relaxed mt-0.5">
                      {p.description}
                    </p>
                    <p className="text-[9.5px] font-medium text-slate-500 mt-0.5">
                      {p.techStack}
                    </p>
                  </div>
                ))}
              </div>
            </section>

            {/* ENGINEERING HIGHLIGHTS */}
            <section>
              <h2
                className={`${isRtl ? '' : 'tracking-wider'} text-[11px] font-black uppercase pb-1 mb-2.5 border-b border-slate-300`}
                style={{ color: accent }}
              >
                {labels.highlights}
              </h2>
              <div className="grid grid-cols-2 gap-3.5">
                {data.highlights.map((hl) => (
                  <div
                    key={hl.id}
                    className="p-3 border border-slate-200 rounded-md bg-slate-50/50"
                  >
                    <span className="text-[11.5px] font-bold text-slate-900 block leading-tight">
                      {hl.title}
                    </span>
                    <span className="text-[10px] text-slate-600 leading-normal block mt-1">
                      {hl.description}
                    </span>
                  </div>
                ))}
              </div>
            </section>

            {/* EDUCATION */}
            <section>
              <h2
                className={`${isRtl ? '' : 'tracking-wider'} text-[11px] font-black uppercase pb-1 mb-2 border-b border-slate-300`}
                style={{ color: accent }}
              >
                {labels.education}
              </h2>
              <div className="space-y-2">
                {data.educations.map((edu) => (
                  <div
                    key={edu.id}
                    className="flex items-baseline justify-between"
                  >
                    <div>
                      <span className="text-[12px] font-bold text-slate-900 block">
                        {edu.degree}
                      </span>
                      <span className="text-[10.5px] text-slate-600 block mt-0.5">
                        {edu.institution}
                      </span>
                    </div>
                    <span className="text-[10.5px] font-medium text-slate-500">
                      {edu.period}
                    </span>
                  </div>
                ))}
              </div>
            </section>
          </div>

          <footer className="pt-3 border-t border-slate-200 flex items-center justify-between text-[9.5px] text-slate-400 font-medium">
            <span>{data.footerQuotePage2}</span>
            <span>{labels.page2Of2}</span>
          </footer>
        </div>
      )}
    </>
  );
};
