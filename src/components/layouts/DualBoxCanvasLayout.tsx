import React, { useState } from 'react';
import html2canvas from 'html2canvas-pro';
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
  Sparkles,
  Camera,
  Loader2,
  Download,
} from 'lucide-react';
import { ResumeContent, Language, ResumeSettings } from '../../types';
import { ResumeLogo } from '../ResumeLogo';
import { SkillBadge } from '../common/SkillBadge';
import { exportResumeToPdf } from '../../utils/pdfExport';

interface LayoutProps {
  data: ResumeContent;
  language: Language;
  settings: ResumeSettings;
  pageFilter?: 'all' | '1' | '2';
}

type CanvasBackdropTheme = 'studio' | 'charcoal' | 'minimal';

export const DualBoxCanvasLayout: React.FC<LayoutProps> = ({
  data,
  language,
  settings,
  pageFilter = 'all',
}) => {
  const isRtl = language === 'fa';
  const accent = settings.accentColor || '#2563eb';
  const spreadMode: 'side-by-side' | 'stacked' = 'side-by-side';
  const [canvasBg, setCanvasBg] = useState<CanvasBackdropTheme>('studio');
  const [isExportingMockup, setIsExportingMockup] = useState(false);
  const [isExportingPdf, setIsExportingPdf] = useState(false);

  const labels = {
    summary: isRtl ? 'خلاصه سوابق حرفه‌ای' : 'PROFESSIONAL SUMMARY',
    skills: isRtl ? 'مهارت‌های تخصصی' : 'TECHNICAL SKILLS',
    experience: isRtl ? 'سوابق شغلی و تجربیات' : 'WORK EXPERIENCE',
    selectedProjects: isRtl ? 'پروژه‌های شاخص و برجسته' : 'SELECTED PROJECTS',
    moreProjects: isRtl ? 'سایر پروژه‌های کلیدی' : 'ADDITIONAL PROJECTS',
    highlights: isRtl ? 'برجستگی‌های فنی و مهندسی' : 'ENGINEERING HIGHLIGHTS',
    education: isRtl ? 'تحصیلات و مدارک دانشگاهی' : 'EDUCATION',
    page1Of2: isRtl ? 'صفحه ۱ از ۲' : 'Page 1 of 2',
    page2Of2: isRtl ? 'صفحه ۲ از ۲' : 'Page 2 of 2',
    languages: isRtl ? 'زبان‌ها' : 'Languages',
    canvasTitle: isRtl ? 'بورد ارائه دو صفحه‌ای' : 'Dual-Page Canvas Board',
    sideBySide: isRtl ? 'کنار هم' : 'Side-by-Side',
    stacked: isRtl ? 'زیر هم' : 'Stacked',
    exportCanvasPdf: isRtl ? 'دانلود PDF بورد' : 'Canvas PDF',
    exportMockup: isRtl ? 'تصویر بورد (PNG)' : 'Canvas PNG',
  };

  const handleExportCanvasPdf = async () => {
    const boardEl = document.getElementById('resume-canvas-board');
    if (!boardEl) return;
    try {
      setIsExportingPdf(true);
      const activeName = data.name.trim().replace(/\s+/g, '_') || 'Resume';
      const fileName = `${activeName}_Dual_Box_Canvas_${language.toUpperCase()}.pdf`;
      await exportResumeToPdf([boardEl], {
        fileName,
        isCanvasBoard: true,
      });
    } catch (err) {
      console.error('Failed to export canvas PDF', err);
    } finally {
      setIsExportingPdf(false);
    }
  };

  const handleExportCanvasImage = async () => {
    const boardEl = document.getElementById('resume-canvas-board');
    if (!boardEl) return;
    try {
      setIsExportingMockup(true);
      const canvas = await html2canvas(boardEl, {
        scale: 2,
        useCORS: true,
        allowTaint: true,
        backgroundColor: null,
        logging: false,
        ignoreElements: (element) => element.classList.contains('no-print'),
      });
      const link = document.createElement('a');
      link.download = `${data.name.replace(/\s+/g, '_')}_Dual_Page_Canvas.png`;
      link.href = canvas.toDataURL('image/png');
      link.click();
    } catch (err) {
      console.error('Failed to export canvas mockup', err);
    } finally {
      setIsExportingMockup(false);
    }
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

  // High elevation floating box shadow
  const pageBoxShadowStyle: React.CSSProperties = {
    boxShadow:
      canvasBg === 'charcoal'
        ? '0 30px 65px -12px rgba(0, 0, 0, 0.65), 0 15px 30px -8px rgba(0, 0, 0, 0.45), 0 0 0 1px rgba(255, 255, 255, 0.12)'
        : '0 25px 50px -12px rgba(15, 23, 42, 0.22), 0 12px 24px -8px rgba(15, 23, 42, 0.12), 0 0 0 1px rgba(15, 23, 42, 0.08)',
  };

  const getCanvasBackground = () => {
    switch (canvasBg) {
      case 'charcoal':
        return 'linear-gradient(135deg, #1e293b 0%, #0f172a 100%)';
      case 'minimal':
        return '#e8edf3';
      case 'studio':
      default:
        // Sophisticated linear gradient: starts with an off-white mist tint (#e5ebf2)
        // that belongs to the white family but provides crisp contrast with pure white (#ffffff) pages
        return 'linear-gradient(180deg, #e5ebf2 0%, #dae2ec 45%, #ccd6e2 100%)';
    }
  };

  return (
    <div
      id="resume-canvas-board"
      data-spread={spreadMode}
      data-backdrop={canvasBg}
      className={`canvas-board-wrapper w-full max-w-full rounded-3xl p-4 sm:p-8 lg:p-10 transition-all border relative select-text ${
        canvasBg === 'charcoal'
          ? 'border-slate-700/80 text-white'
          : 'border-slate-300/80 text-slate-800'
      }`}
      style={{
        background: getCanvasBackground(),
      }}
    >
      {/* Presentation Canvas Header Toolbar (Screen only) */}
      <div className="no-print mb-6 flex flex-wrap items-center justify-between gap-3 px-2">
        <div className="flex items-center gap-2.5">
          <div
            className="w-8 h-8 rounded-xl flex items-center justify-center text-white shadow-sm"
            style={{ backgroundColor: accent }}
          >
            <Sparkles className="w-4 h-4" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span
                className={`font-bold text-sm ${
                  canvasBg === 'charcoal' ? 'text-white' : 'text-slate-800'
                }`}
              >
                {labels.canvasTitle}
              </span>
              <span
                className={`px-2 py-0.5 rounded-full text-[10px] font-bold border shadow-2xs ${
                  canvasBg === 'charcoal'
                    ? 'bg-slate-800 text-slate-200 border-slate-700'
                    : 'bg-white text-slate-700 border-slate-200'
                }`}
              >
                {data.name}
              </span>
            </div>
            <p
              className={`text-[11px] ${
                canvasBg === 'charcoal' ? 'text-slate-400' : 'text-slate-500'
              }`}
            >
              {isRtl
                ? 'هر دو صفحه در یک پس‌زمینه یکپارچه به صورت دو باکس شناور با سایه عمیق قرار گرفته‌اند.'
                : 'Both pages presented inside a unified backdrop as elevated boxes with deep box shadows.'}
            </p>
          </div>
        </div>

        {/* View Controls (Screen only) */}
        <div className="flex items-center flex-wrap gap-2">
          {/* Backdrop Style Switcher */}
          <div
            className={`flex items-center gap-1 p-1 rounded-xl border text-[10.5px] font-semibold ${
              canvasBg === 'charcoal'
                ? 'bg-slate-800/90 border-slate-700 text-slate-300'
                : 'bg-white/95 border-slate-200 text-slate-600'
            }`}
          >
            {(
              [
                { id: 'studio', label: isRtl ? 'استودیو' : 'Studio' },
                { id: 'charcoal', label: isRtl ? 'تاریک' : 'Dark' },
                { id: 'minimal', label: isRtl ? 'مینیمال' : 'Minimal' },
              ] as { id: CanvasBackdropTheme; label: string }[]
            ).map((t) => (
              <button
                key={t.id}
                type="button"
                onClick={() => setCanvasBg(t.id)}
                className={`px-2 py-1 rounded-lg transition-all ${
                  canvasBg === t.id
                    ? 'bg-blue-600 text-white shadow-2xs font-bold'
                    : 'hover:bg-slate-200/50'
                }`}
              >
                {t.label}
              </button>
            ))}
          </div>

          {/* Export Canvas PDF Button */}
          <button
            type="button"
            onClick={handleExportCanvasPdf}
            disabled={isExportingPdf}
            className="px-2.5 py-1.5 rounded-xl border flex items-center gap-1.5 text-xs font-bold shadow-2xs transition-all bg-blue-600 hover:bg-blue-700 text-white border-blue-500 disabled:opacity-50"
            title={labels.exportCanvasPdf}
          >
            {isExportingPdf ? (
              <Loader2 className="w-3.5 h-3.5 animate-spin text-white" />
            ) : (
              <Download className="w-3.5 h-3.5 text-white" />
            )}
            <span>
              {isExportingPdf
                ? isRtl
                  ? 'در حال آماده‌سازی PDF...'
                  : 'Generating PDF...'
                : labels.exportCanvasPdf}
            </span>
          </button>

          {/* Save Mockup Image Button (PNG) */}
          <button
            type="button"
            onClick={handleExportCanvasImage}
            disabled={isExportingMockup}
            className={`px-2.5 py-1.5 rounded-xl border flex items-center gap-1.5 text-xs font-semibold shadow-2xs transition-all ${
              canvasBg === 'charcoal'
                ? 'bg-slate-800 hover:bg-slate-700 text-white border-slate-700'
                : 'bg-white hover:bg-slate-50 text-slate-700 border-slate-200'
            }`}
            title={labels.exportMockup}
          >
            {isExportingMockup ? (
              <Loader2 className="w-3.5 h-3.5 animate-spin text-blue-600" />
            ) : (
              <Camera className="w-3.5 h-3.5 text-blue-600" />
            )}
            <span className="hidden sm:inline">
              {isExportingMockup
                ? isRtl
                  ? 'در حال خروجی...'
                  : 'Exporting...'
                : labels.exportMockup}
            </span>
          </button>
        </div>
      </div>

      {/* Pages Container holding Page 1 and Page 2 boxes */}
      <div
        className={`dual-box-pages-container flex ${
          spreadMode === 'side-by-side' && settings.showPage2 && pageFilter === 'all'
            ? 'flex-col 2xl:flex-row items-center 2xl:items-start justify-center gap-8 2xl:gap-10'
            : 'flex-col items-center justify-center gap-10'
        }`}
      >
        {/* ========================================================================= */}
        {/* PAGE 1 BOX */}
        {/* ========================================================================= */}
        {(pageFilter === 'all' || pageFilter === '1') && (
          <div
            id="resume-page-1"
            data-layout-style="dual-box"
            className="resume-sheet resume-page relative bg-white text-slate-900 px-9 pt-9 pb-8 flex flex-col justify-between rounded-2xl border border-slate-200/90 overflow-hidden shrink-0 transition-all duration-300"
            style={{
              width: '210mm',
              minHeight: '297mm',
              height: '297mm',
              ...pageBoxShadowStyle,
            }}
          >
            {/* Watermark */}
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
                  fill="url(#paint0_linear_canvas_p1)"
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
                    id="paint0_linear_canvas_p1"
                    x1="240"
                    y1="0"
                    x2="100"
                    y2="150"
                    gradientUnits="userSpaceOnUse"
                  >
                    <stop stopColor={accent} />
                    <stop offset="1" stopColor={accent} stopOpacity="0" />
                  </linearGradient>
                </defs>
              </svg>
            )}

            <div className="space-y-4">
              {/* HEADER SECTION */}
              <div className="flex items-start justify-between gap-4 pb-3.5 border-b border-slate-200">
                <div className="space-y-1 max-w-[480px]">
                  <h1 className="text-3xl font-extrabold tracking-tight text-slate-900 leading-tight">
                    {data.name}
                  </h1>
                  <p
                    className="text-xs font-bold tracking-wider uppercase"
                    style={{ color: accent }}
                  >
                    {data.roleTitle}
                  </p>
                  <p className="text-[11.5px] text-slate-600 leading-relaxed pt-1">
                    {data.summary}
                  </p>
                </div>

                {/* Candidate Logo */}
                <div className="shrink-0 pt-1">
                  <ResumeLogo color={accent} className="w-9 h-9" />
                </div>
              </div>

              {/* CONTACT STRIP */}
              <div className="flex flex-wrap items-center gap-x-4 gap-y-1.5 text-[10.5px] text-slate-600 bg-slate-50/90 px-3.5 py-2 rounded-xl border border-slate-200/80">
                {data.contact.email && (
                  <div className="flex items-center gap-1.5">
                    <Mail className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                    <span>{data.contact.email}</span>
                  </div>
                )}
                {data.contact.phone && (
                  <div className="flex items-center gap-1.5">
                    <Phone className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                    <span dir="ltr">{data.contact.phone}</span>
                  </div>
                )}
                {data.contact.location && (
                  <div className="flex items-center gap-1.5">
                    <MapPin className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                    <span>{data.contact.location}</span>
                  </div>
                )}
                {data.contact.github && (
                  <div className="flex items-center gap-1.5">
                    <Github className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                    <span>{data.contact.github}</span>
                  </div>
                )}
                {data.contact.linkedin && (
                  <div className="flex items-center gap-1.5">
                    <Linkedin className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                    <span>{data.contact.linkedin}</span>
                  </div>
                )}
                {data.contact.website && (
                  <div className="flex items-center gap-1.5">
                    <Globe className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                    <span>{data.contact.website}</span>
                  </div>
                )}
              </div>

              {/* TECHNICAL SKILLS SECTION (BADGES) */}
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <div
                    className="w-2.5 h-2.5 rounded-full shrink-0"
                    style={{ backgroundColor: accent }}
                  />
                  <h2 className="text-xs font-black tracking-wider uppercase text-slate-900">
                    {labels.skills}
                  </h2>
                  <div className="h-px bg-slate-200 flex-1" />
                </div>

                <div className="grid grid-cols-2 gap-x-5 gap-y-2.5">
                  <div className="space-y-2.5">
                    {data.skillCategories.slice(0, 3).map((cat) => (
                      <div key={cat.id}>
                        <span className="block text-[9.5px] font-bold text-slate-500 uppercase tracking-wider mb-1">
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

                  <div className="space-y-2.5">
                    {data.skillCategories.slice(3).map((cat) => (
                      <div key={cat.id}>
                        <span className="block text-[9.5px] font-bold text-slate-500 uppercase tracking-wider mb-1">
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

                    {/* Spoken Languages Badges */}
                    {data.languages.length > 0 && (
                      <div className="pt-1">
                        <div className="flex items-center gap-1.5 text-[9.5px] font-bold text-slate-500 uppercase tracking-wider mb-1">
                          <MessageCircle className="w-3 h-3 text-slate-400" />
                          <span>{labels.languages}</span>
                        </div>
                        <div className="flex flex-wrap gap-1.5">
                          {data.languages.map((l, i) => {
                          const hasLevel = Boolean(l.level?.trim());
                          const hasCertificate = Boolean(l.certificateTitle?.trim()) && Boolean(l.certificateUrl?.trim());
                          return (
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
                              {hasLevel && <span className="text-slate-500 font-normal text-[9px]">({l.level})</span>}
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
                </div>
              </div>

              {/* WORK EXPERIENCE SECTION */}
              <div className="space-y-2.5">
                <div className="flex items-center gap-2">
                  <div
                    className="w-2.5 h-2.5 rounded-full shrink-0"
                    style={{ backgroundColor: accent }}
                  />
                  <h2 className="text-xs font-black tracking-wider uppercase text-slate-900">
                    {labels.experience}
                  </h2>
                  <div className="h-px bg-slate-200 flex-1" />
                </div>

                <div className="space-y-3">
                  {data.experiences.slice(0, 2).map((exp) => (
                    <div
                      key={exp.id}
                      className="p-3.5 rounded-xl border border-slate-200/80 bg-slate-50/50 hover:bg-slate-50 transition-colors"
                    >
                      <div className="flex items-baseline justify-between gap-2">
                        <div>
                          <span className="font-bold text-slate-900 text-[12.5px]">
                            {exp.role}
                          </span>
                          <span className="mx-1.5 text-slate-400">•</span>
                          <span
                            className="font-semibold text-[12px]"
                            style={{ color: accent }}
                          >
                            {exp.company}
                          </span>
                          {exp.location && (
                            <span className="text-slate-500 text-[10.5px] ml-1.5">
                              ({exp.location})
                            </span>
                          )}
                        </div>

                        <div className="flex items-center gap-2 shrink-0">
                          {exp.badge && (
                            <span
                              className="px-2 py-0.5 rounded-full text-[9.5px] font-bold uppercase tracking-wider"
                              style={{
                                backgroundColor: `${accent}15`,
                                color: accent,
                              }}
                            >
                              {exp.badge}
                            </span>
                          )}
                          <span className="text-[10.5px] text-slate-500 font-medium whitespace-nowrap">
                            {exp.period}
                          </span>
                        </div>
                      </div>

                      {exp.highlight && (
                        <p className="text-[11px] font-semibold text-slate-800 mt-1">
                          {exp.highlight}
                        </p>
                      )}

                      <ul className="mt-1.5 space-y-1 text-[11px] text-slate-600 list-disc list-inside marker:text-slate-400">
                        {exp.bullets.map((bullet, bIdx) => (
                          <li key={bIdx} className="leading-snug">
                            {bullet}
                          </li>
                        ))}
                      </ul>

                      {exp.tags && exp.tags.length > 0 && (
                        <div className="mt-2 flex flex-wrap gap-1">
                          {exp.tags.map((tag, tIdx) => (
                            <span
                              key={tIdx}
                              className="px-1.5 py-0.5 rounded text-[9.5px] font-medium bg-white text-slate-600 border border-slate-200/70"
                            >
                              {tag}
                            </span>
                          ))}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>

              {/* SELECTED PROJECTS PREVIEW ON PAGE 1 */}
              {data.selectedProjects.length > 0 && (
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <div
                      className="w-2.5 h-2.5 rounded-full shrink-0"
                      style={{ backgroundColor: accent }}
                    />
                    <h2 className="text-xs font-black tracking-wider uppercase text-slate-900">
                      {labels.selectedProjects}
                    </h2>
                    <div className="h-px bg-slate-200 flex-1" />
                  </div>

                  <div className="grid grid-cols-2 gap-2.5">
                    {data.selectedProjects.slice(0, 2).map((proj) => (
                      <div
                        key={proj.id}
                        className="p-3 rounded-xl border border-slate-200/90 bg-white shadow-2xs flex flex-col justify-between"
                      >
                        <div className="space-y-1">
                          <div className="flex items-center gap-2">
                            <div
                              className="p-1 rounded-lg shrink-0"
                              style={{ backgroundColor: `${accent}15` }}
                            >
                              {renderProjectIcon(proj.icon)}
                            </div>
                            <div>
                              <h3 className="font-bold text-slate-900 text-[11.5px] leading-tight">
                                {proj.title}
                              </h3>
                              <p className="text-[9.5px] text-slate-500">
                                {proj.subtitle}
                              </p>
                            </div>
                          </div>
                          <p className="text-[10px] text-slate-600 leading-relaxed line-clamp-2 pt-0.5">
                            {proj.description}
                          </p>
                        </div>
                        <p className="text-[9px] font-medium text-slate-500 mt-1.5 pt-1.5 border-t border-slate-100 truncate">
                          {proj.techStack}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* PAGE 1 FOOTER */}
            <div className="pt-3 border-t border-slate-200 flex items-center justify-between text-[10px] text-slate-400">
              <span className="font-semibold text-slate-600">
                {settings.layoutId === 'dual-box-board'
                  ? data.footerQuotePage1
                  : data.footerQuotePage1 || `${data.name} — ${data.roleTitle}`}
              </span>
              <span className="font-mono">{labels.page1Of2}</span>
            </div>
          </div>
        )}

        {/* ========================================================================= */}
        {/* PAGE 2 BOX */}
        {/* ========================================================================= */}
        {settings.showPage2 && (pageFilter === 'all' || pageFilter === '2') && (
          <div
            id="resume-page-2"
            data-layout-style="dual-box"
            className="resume-sheet resume-page relative bg-white text-slate-900 px-9 pt-9 pb-8 flex flex-col justify-between rounded-2xl border border-slate-200/90 overflow-hidden shrink-0 transition-all duration-300"
            style={{
              width: '210mm',
              minHeight: '297mm',
              height: '297mm',
              ...pageBoxShadowStyle,
            }}
          >
            {/* Watermark on Page 2 */}
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
                  fill="url(#paint0_linear_canvas_p2)"
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
                    id="paint0_linear_canvas_p2"
                    x1="240"
                    y1="0"
                    x2="100"
                    y2="150"
                    gradientUnits="userSpaceOnUse"
                  >
                    <stop stopColor={accent} />
                    <stop offset="1" stopColor={accent} stopOpacity="0" />
                  </linearGradient>
                </defs>
              </svg>
            )}

            <div className="space-y-4">
              {/* PAGE 2 CONTINUITY HEADER */}
              {settings.layoutId !== 'dual-box-board' ? (
                <div className="flex items-center justify-between pb-2.5 border-b border-slate-200">
                  <div className="flex items-center gap-2.5">
                    <ResumeLogo color={accent} className="w-6 h-6" />
                    <div>
                      <span className="font-bold text-slate-900 text-sm">
                        {data.name}
                      </span>
                      <span className="text-xs text-slate-400 mx-2">•</span>
                      <span className="text-xs text-slate-600 font-medium">
                        {data.roleTitle}
                      </span>
                    </div>
                  </div>

                  <div className="text-[10px] text-slate-400 font-mono">
                    {labels.page2Of2}
                  </div>
                </div>
              ) : (
                <div className="flex justify-start pb-2.5">
                  <ResumeLogo color={accent} className="w-6 h-6" />
                </div>
              )}

              {/* MORE WORK EXPERIENCE (if > 2 experiences) */}
              {data.experiences.length > 2 && (
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <div
                      className="w-2.5 h-2.5 rounded-full shrink-0"
                      style={{ backgroundColor: accent }}
                    />
                    <h2 className="text-xs font-black tracking-wider uppercase text-slate-900">
                      {labels.experience} ({isRtl ? 'ادامه' : 'Continued'})
                    </h2>
                    <div className="h-px bg-slate-200 flex-1" />
                  </div>

                  <div className="space-y-2">
                    {data.experiences.slice(2).map((exp) => (
                      <div
                        key={exp.id}
                        className="p-3 rounded-xl border border-slate-200/80 bg-slate-50/50"
                      >
                        <div className="flex items-baseline justify-between gap-2">
                          <div>
                            <span className="font-bold text-slate-900 text-[12px]">
                              {exp.role}
                            </span>
                            <span className="mx-1.5 text-slate-400">•</span>
                            <span
                              className="font-semibold text-[11.5px]"
                              style={{ color: accent }}
                            >
                              {exp.company}
                            </span>
                          </div>
                          <span className="text-[10px] text-slate-500 font-medium">
                            {exp.period}
                          </span>
                        </div>
                        <ul className="mt-1 space-y-0.5 text-[10.5px] text-slate-600 list-disc list-inside">
                          {exp.bullets.map((bullet, bIdx) => (
                            <li key={bIdx}>{bullet}</li>
                          ))}
                        </ul>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* MORE PROJECTS */}
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <FolderGit2 className="w-4 h-4 shrink-0" style={{ color: accent }} />
                  <h2 className="text-xs font-black tracking-wider uppercase text-slate-900">
                    {labels.moreProjects}
                  </h2>
                  <div className="h-px bg-slate-200 flex-1" />
                </div>

                <div className="space-y-2.5">
                  {data.moreProjects.map((proj) => (
                    <div
                      key={proj.id}
                      className="p-3 rounded-xl border border-slate-200/80 bg-slate-50/30"
                    >
                      <div className="flex items-start justify-between gap-2 mb-1">
                        <div className="flex items-center gap-2">
                          <div
                            className="w-6 h-6 rounded-lg flex items-center justify-center shrink-0"
                            style={{
                              backgroundColor: `${accent}15`,
                              border: `1px solid ${accent}30`,
                            }}
                          >
                            {renderProjectIcon(proj.icon)}
                          </div>
                          <div>
                            <h3 className="text-[12px] font-bold text-slate-950 leading-tight">
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
                          className="inline-flex items-center gap-1 text-[10.5px] font-semibold hover:underline shrink-0"
                          style={{ color: accent }}
                        >
                          <span>{proj.linkText}</span>
                        </a>
                      </div>

                      <p className="text-[10.5px] leading-relaxed text-slate-600 mt-1">
                        {proj.description}
                      </p>

                      <p className="text-[9.5px] font-medium text-slate-500 mt-1.5 pt-1 border-t border-slate-100">
                        {proj.techStack}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              {/* ENGINEERING HIGHLIGHTS (3x2 Grid) */}
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <Layers className="w-4 h-4 shrink-0" style={{ color: accent }} />
                  <h2 className="text-xs font-black tracking-wider uppercase text-slate-900">
                    {labels.highlights}
                  </h2>
                  <div className="h-px bg-slate-200 flex-1" />
                </div>

                <div className="grid grid-cols-3 gap-2">
                  {data.highlights.map((hl) => (
                    <div
                      key={hl.id}
                      className="p-2.5 rounded-xl border border-slate-200/80 bg-slate-50/60 flex flex-col justify-between"
                    >
                      <div className="flex items-center gap-1.5 mb-1">
                        {renderHighlightIcon(hl.icon)}
                        <span className="font-bold text-slate-900 text-[10.5px] truncate">
                          {hl.title}
                        </span>
                      </div>
                      <p className="text-[9.5px] text-slate-600 leading-snug">
                        {hl.description}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              {/* EDUCATION & CERTIFICATIONS */}
              {data.educations.length > 0 && (
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <GraduationCap className="w-4 h-4 shrink-0" style={{ color: accent }} />
                    <h2 className="text-xs font-black tracking-wider uppercase text-slate-900">
                      {labels.education}
                    </h2>
                    <div className="h-px bg-slate-200 flex-1" />
                  </div>

                  <div className="space-y-1.5">
                    {data.educations.map((edu) => (
                      <div
                        key={edu.id}
                        className="flex items-center justify-between p-2.5 rounded-xl border border-slate-200/70 bg-slate-50/40 text-[11px]"
                      >
                        <div className="flex items-center gap-2">
                          <span
                            className="w-1.5 h-1.5 rounded-full shrink-0"
                            style={{ backgroundColor: accent }}
                          />
                          <div>
                            <span className="font-bold text-slate-900">
                              {edu.degree}
                            </span>
                            <span className="mx-1.5 text-slate-400">•</span>
                            <span className="text-slate-700 font-medium">
                              {edu.institution}
                            </span>
                          </div>
                        </div>
                        <span className="text-slate-500 font-mono text-[10.5px]">
                          {edu.period}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* PAGE 2 FOOTER */}
            <div className="pt-3 border-t border-slate-200 flex items-center justify-between text-[10px] text-slate-400">
              <span className="font-semibold text-slate-600">
                {settings.layoutId === 'dual-box-board'
                  ? data.footerQuotePage2
                  : data.footerQuotePage2 || `${data.name} — ${data.roleTitle}`}
              </span>
              <span className="font-mono">{labels.page2Of2}</span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
