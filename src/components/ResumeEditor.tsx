import React, { useState } from 'react';
import {
  User,
  FileText,
  Wrench,
  Briefcase,
  FolderGit2,
  Layers,
  GraduationCap,
  Plus,
  Trash2,
  ChevronDown,
  ChevronUp,
  Languages,
  RotateCcw,
  LayoutTemplate,
  Check,
  Palette,
  Sparkles,
} from 'lucide-react';
import {
  DualResumeData,
  Language,
  ExperienceItem,
  ProjectItem,
  EngineeringHighlight,
  EducationItem,
  SkillCategory,
  ResumeSettings,
  ResumeLayoutId,
  SkillBadgeStyle,
} from '../types';
import { availableLayouts } from '../data/layouts';
import { defaultThemeColors } from '../data/initialData';
import { SkillBadge } from './common/SkillBadge';

interface ResumeEditorProps {
  resumeData: DualResumeData;
  onChange: (updatedData: DualResumeData) => void;
  activeLanguage: Language;
  onLanguageChange: (lang: Language) => void;
  onReset: () => void;
  settings: ResumeSettings;
  onSettingsChange: (settings: ResumeSettings) => void;
  onOpenImportPrompt?: () => void;
}

export const ResumeEditor: React.FC<ResumeEditorProps> = ({
  resumeData,
  onChange,
  activeLanguage,
  onLanguageChange,
  onReset,
  settings,
  onSettingsChange,
  onOpenImportPrompt,
}) => {
  const [activeTab, setActiveTab] = useState<
    'layout' | 'info' | 'summary' | 'skills' | 'experience' | 'projects' | 'highlights' | 'education'
  >('layout');

  const currentContent = resumeData[activeLanguage];
  const isRtl = activeLanguage === 'fa';

  const updateCurrentContent = (updater: (prev: typeof currentContent) => typeof currentContent) => {
    onChange({
      ...resumeData,
      [activeLanguage]: updater(resumeData[activeLanguage]),
    });
  };

  const handleContactChange = (field: keyof typeof currentContent.contact, val: string) => {
    updateCurrentContent((prev) => ({
      ...prev,
      contact: {
        ...prev.contact,
        [field]: val,
      },
    }));
  };

  return (
    <div className="flex flex-col h-full bg-white border border-slate-200 rounded-xl shadow-xs overflow-hidden">
      {/* Editor Top Bar: Language Mode Switcher */}
      <div className="p-3.5 bg-slate-50 border-b border-slate-200 flex items-center justify-between gap-3">
        <div className="flex items-center gap-2">
          <Languages className="w-4 h-4 text-blue-600" />
          <span className="text-xs font-bold text-slate-700 uppercase tracking-wider">
            Editing Language:
          </span>
        </div>

        <div className="flex items-center gap-1.5 bg-slate-200/80 p-1 rounded-lg">
          <button
            type="button"
            onClick={() => onLanguageChange('en')}
            className={`px-3 py-1 text-xs font-semibold rounded-md transition-all ${
              activeLanguage === 'en'
                ? 'bg-white text-blue-700 shadow-xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            English (LTR)
          </button>
          <button
            type="button"
            onClick={() => onLanguageChange('fa')}
            className={`px-3 py-1 text-xs font-semibold rounded-md transition-all font-['Vazirmatn'] ${
              activeLanguage === 'fa'
                ? 'bg-white text-blue-700 shadow-xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            فارسی (RTL)
          </button>
        </div>
      </div>

      {/* GitHub AI Prompt & Import Quick Banner */}
      {onOpenImportPrompt && (
        <div className="px-3 py-2 bg-gradient-to-r from-blue-50/90 to-indigo-50/80 border-b border-blue-100 flex items-center justify-between gap-2 shrink-0">
          <div className="flex items-center gap-2 text-xs text-blue-900 min-w-0">
            <Sparkles className="w-3.5 h-3.5 text-blue-600 shrink-0" />
            <span className="font-bold text-[11.5px] truncate">
              {isRtl ? 'پرامپت هوش مصنوعی بر اساس گیت‌هاب' : 'GitHub AI Prompt & JSON Import'}
            </span>
          </div>
          <button
            type="button"
            onClick={onOpenImportPrompt}
            className="px-2.5 py-1 rounded-md bg-blue-600 hover:bg-blue-700 active:scale-98 text-white text-[11px] font-bold shadow-2xs transition-all shrink-0 flex items-center gap-1"
          >
            <span>{isRtl ? 'دریافت پرامپت' : 'Get Prompt'}</span>
          </button>
        </div>
      )}

      {/* Navigation Tabs for Sections */}
      <div className="flex overflow-x-auto border-b border-slate-200 bg-slate-50/50 p-1.5 gap-1 text-xs font-medium no-scrollbar">
        {[
          { id: 'layout', label: isRtl ? 'قالب‌ها و استایل' : 'Layout & Design', icon: LayoutTemplate },
          { id: 'info', label: isRtl ? 'مشخصات' : 'Personal', icon: User },
          { id: 'summary', label: isRtl ? 'خلاصه' : 'Summary', icon: FileText },
          { id: 'skills', label: isRtl ? 'مهارت‌ها' : 'Skills', icon: Wrench },
          { id: 'experience', label: isRtl ? 'سوابق' : 'Experience', icon: Briefcase },
          { id: 'projects', label: isRtl ? 'پروژه‌ها' : 'Projects', icon: FolderGit2 },
          { id: 'highlights', label: isRtl ? 'نکات فنی' : 'Highlights', icon: Layers },
          { id: 'education', label: isRtl ? 'تحصیلات' : 'Education', icon: GraduationCap },
        ].map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              type="button"
              onClick={() => setActiveTab(tab.id as any)}
              className={`flex items-center gap-1.5 px-3 py-2 rounded-lg whitespace-nowrap transition-colors ${
                isActive
                  ? 'bg-white text-blue-600 font-bold shadow-xs border border-slate-200'
                  : 'text-slate-600 hover:bg-slate-100'
              }`}
            >
              <Icon className="w-3.5 h-3.5" />
              <span>{tab.label}</span>
            </button>
          );
        })}
      </div>

      {/* Editor Content Scrollable Body */}
      <div
        className="flex-1 overflow-y-auto p-4 space-y-4 text-xs"
        dir={isRtl ? 'rtl' : 'ltr'}
      >
        {/* ======================= TAB: LAYOUT & DESIGN ======================= */}
        {activeTab === 'layout' && (
          <div className="space-y-4">
            <div>
              <label className="block font-bold text-slate-800 mb-1.5 text-sm">
                {isRtl ? 'انتخاب قالب رزومه' : 'Select Resume Layout'}
              </label>
              <p className="text-[11px] text-slate-500 mb-3">
                {isRtl
                  ? 'تمامی قالب‌ها سازگاری کامل با زبان فارسی و انگلیسی و استانداردهای خروجی PDF دارند.'
                  : 'All layouts support dual Persian RTL & English LTR with high-resolution PDF export.'}
              </p>

              <div className="grid grid-cols-1 gap-2.5">
                {availableLayouts.map((l) => {
                  const isSelected = (settings.layoutId || 'modern-tech') === l.id;
                  return (
                    <button
                      key={l.id}
                      type="button"
                      onClick={() => onSettingsChange({ ...settings, layoutId: l.id })}
                      className={`w-full p-3.5 rounded-xl border text-left transition-all flex items-start gap-3 ${
                        isSelected
                          ? 'border-blue-600 bg-blue-50/50 shadow-xs'
                          : 'border-slate-200 hover:border-slate-300 bg-white'
                      }`}
                    >
                      <div
                        className={`w-4 h-4 rounded-full mt-0.5 border flex items-center justify-center shrink-0 ${
                          isSelected
                            ? 'border-blue-600 bg-blue-600 text-white'
                            : 'border-slate-300 bg-white'
                        }`}
                      >
                        {isSelected && <Check className="w-2.5 h-2.5 stroke-[3]" />}
                      </div>

                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2">
                          <span className="font-bold text-slate-900 text-xs">
                            {isRtl ? l.nameFa : l.name}
                          </span>
                          {l.badge && (
                            <span className="px-1.5 py-0.5 rounded text-[9px] font-bold bg-slate-100 text-slate-700 border border-slate-200">
                              {l.badge}
                            </span>
                          )}
                        </div>
                        <p className="text-[11px] text-slate-600 mt-1 leading-normal">
                          {isRtl ? l.descriptionFa : l.description}
                        </p>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Visual Options */}
            <div className="pt-3 border-t border-slate-200 space-y-3">
              <span className="block font-bold text-slate-800 text-xs">
                {isRtl ? 'رنگ شاخص و تنظیمات ظاهری' : 'Theme & Visual Elements'}
              </span>

              {/* Accent Color Presets */}
              <div>
                <label className="block text-slate-600 text-[11px] mb-1.5 font-medium">
                  {isRtl ? 'رنگ تم اصلی' : 'Accent Theme Color'}
                </label>
                <div className="grid grid-cols-6 gap-2">
                  {defaultThemeColors.map((c) => (
                    <button
                      key={c.value}
                      type="button"
                      onClick={() => onSettingsChange({ ...settings, accentColor: c.value })}
                      className="p-1 rounded-lg border border-slate-200 hover:bg-slate-50 flex flex-col items-center gap-1"
                    >
                      <div
                        className="w-5 h-5 rounded-full flex items-center justify-center"
                        style={{ backgroundColor: c.value }}
                      >
                        {settings.accentColor === c.value && (
                          <Check className="w-3 h-3 text-white stroke-[3]" />
                        )}
                      </div>
                      <span className="text-[8.5px] text-slate-500 font-medium truncate w-full text-center">
                        {c.name.split(' ')[0]}
                      </span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Skill Badge Style Selector */}
              <div>
                <label className="block text-slate-600 text-[11px] mb-1.5 font-medium">
                  {isRtl ? 'استایل نشان‌ها (Badges) مهارت‌ها' : 'Skill Badges Style'}
                </label>
                <div className="grid grid-cols-3 gap-2">
                  {(
                    [
                      { id: 'tinted', labelEn: 'Tinted', labelFa: 'رنگ محو و ملایم' },
                      { id: 'outlined', labelEn: 'Outlined', labelFa: 'کادر حاشیه‌دار' },
                      { id: 'neutral', labelEn: 'Neutral', labelFa: 'خنثی کلاسیک' },
                    ] as { id: SkillBadgeStyle; labelEn: string; labelFa: string }[]
                  ).map((b) => {
                    const isSelected = (settings.skillBadgeStyle || 'tinted') === b.id;
                    return (
                      <button
                        key={b.id}
                        type="button"
                        onClick={() => onSettingsChange({ ...settings, skillBadgeStyle: b.id })}
                        className={`p-2 rounded-lg border text-center transition-all flex flex-col items-center gap-1.5 ${
                          isSelected
                            ? 'border-blue-600 bg-blue-50/50 shadow-2xs ring-1 ring-blue-500/20'
                            : 'border-slate-200 hover:border-slate-300 bg-white'
                        }`}
                      >
                        <SkillBadge
                          skill="React.js"
                          accentColor={settings.accentColor}
                          style={b.id}
                          size="xs"
                        />
                        <span className="text-[10px] font-bold text-slate-700 mt-0.5">
                          {isRtl ? b.labelFa : b.labelEn}
                        </span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Toggles */}
              <div className="space-y-2 pt-2">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={settings.showWatermark}
                    onChange={(e) =>
                      onSettingsChange({ ...settings, showWatermark: e.target.checked })
                    }
                    className="rounded border-slate-300 text-blue-600 focus:ring-blue-500"
                  />
                  <span className="text-slate-700 font-medium">
                    {isRtl ? 'نمایش خط انتزاعی پس‌زمینه (واترمارک)' : 'Show Subtle Background Watermark'}
                  </span>
                </label>

                {settings.layoutId !== 'compact-single' && (
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={settings.showPage2}
                      onChange={(e) =>
                        onSettingsChange({ ...settings, showPage2: e.target.checked })
                      }
                      className="rounded border-slate-300 text-blue-600 focus:ring-blue-500"
                    />
                    <span className="text-slate-700 font-medium">
                      {isRtl ? 'نمایش صفحه دوم (پروژه‌ها و نکات مهندسی)' : 'Include Page 2 (More Projects & Highlights)'}
                    </span>
                  </label>
                )}
              </div>
            </div>
          </div>
        )}
        {activeTab === 'info' && (
          <div className="space-y-3.5">
            <div>
              <label className="block font-bold text-slate-700 mb-1">
                {isRtl ? 'نام و نام خانوادگی' : 'Full Name'}
              </label>
              <input
                type="text"
                value={currentContent.name}
                onChange={(e) =>
                  updateCurrentContent((p) => ({ ...p, name: e.target.value }))
                }
                className="w-full px-3 py-2 border border-slate-300 rounded-lg text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500 font-medium"
                placeholder="e.g. AmirReza Esfandiyari"
              />
            </div>

            <div>
              <label className="block font-bold text-slate-700 mb-1">
                {isRtl ? 'عنوان شغلی / نقش' : 'Job Title / Subtitle'}
              </label>
              <input
                type="text"
                value={currentContent.roleTitle}
                onChange={(e) =>
                  updateCurrentContent((p) => ({
                    ...p,
                    roleTitle: e.target.value,
                  }))
                }
                className="w-full px-3 py-2 border border-slate-300 rounded-lg text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500 font-medium"
                placeholder="e.g. FULL-STACK SOFTWARE DEVELOPER"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
              <div>
                <label className="block font-semibold text-slate-600 mb-1">
                  {isRtl ? 'ایمیل' : 'Email Address'}
                </label>
                <input
                  type="email"
                  value={currentContent.contact.email}
                  onChange={(e) => handleContactChange('email', e.target.value)}
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="block font-semibold text-slate-600 mb-1">
                  {isRtl ? 'شماره تماس' : 'Phone Number'}
                </label>
                <input
                  type="text"
                  value={currentContent.contact.phone}
                  onChange={(e) => handleContactChange('phone', e.target.value)}
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="block font-semibold text-slate-600 mb-1">
                  {isRtl ? 'موقعیت مکانی' : 'Location'}
                </label>
                <input
                  type="text"
                  value={currentContent.contact.location}
                  onChange={(e) =>
                    handleContactChange('location', e.target.value)
                  }
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="block font-semibold text-slate-600 mb-1">
                  {isRtl ? 'نشانی گیت‌هاب' : 'GitHub'}
                </label>
                <input
                  type="text"
                  value={currentContent.contact.github}
                  onChange={(e) => handleContactChange('github', e.target.value)}
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="block font-semibold text-slate-600 mb-1">
                  {isRtl ? 'نشانی لینکدین' : 'LinkedIn'}
                </label>
                <input
                  type="text"
                  value={currentContent.contact.linkedin}
                  onChange={(e) =>
                    handleContactChange('linkedin', e.target.value)
                  }
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="block font-semibold text-slate-600 mb-1">
                  {isRtl ? 'وب‌سایت شخصی' : 'Portfolio Website'}
                </label>
                <input
                  type="text"
                  value={currentContent.contact.website}
                  onChange={(e) =>
                    handleContactChange('website', e.target.value)
                  }
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>

            <div className="pt-3 border-t border-slate-200">
              <label className="block font-bold text-slate-700 mb-1">
                {isRtl ? 'شعار / پاورقی صفحه ۱' : 'Footer Slogan (Page 1)'}
              </label>
              <input
                type="text"
                value={currentContent.footerQuotePage1}
                onChange={(e) =>
                  updateCurrentContent((p) => ({
                    ...p,
                    footerQuotePage1: e.target.value,
                  }))
                }
                className="w-full px-3 py-2 border border-slate-300 rounded-lg text-slate-800"
              />
            </div>
            <div>
              <label className="block font-bold text-slate-700 mb-1">
                {isRtl ? 'شعار / پاورقی صفحه ۲' : 'Footer Slogan (Page 2)'}
              </label>
              <input
                type="text"
                value={currentContent.footerQuotePage2}
                onChange={(e) =>
                  updateCurrentContent((p) => ({
                    ...p,
                    footerQuotePage2: e.target.value,
                  }))
                }
                className="w-full px-3 py-2 border border-slate-300 rounded-lg text-slate-800"
              />
            </div>
          </div>
        )}

        {/* ======================= TAB: SUMMARY ======================= */}
        {activeTab === 'summary' && (
          <div className="space-y-3">
            <label className="block font-bold text-slate-700">
              {isRtl
                ? 'متن خلاصه سوابق حرفه‌ای (Professional Summary)'
                : 'Professional Summary Narrative'}
            </label>
            <p className="text-slate-500 text-[11px]">
              {isRtl
                ? 'پاراگراف خلاصه معرف تجربیات محوری و تخصص‌های اصلی شما.'
                : 'A high-impact paragraph describing your engineering focus, key achievements, and core architectural expertise.'}
            </p>
            <textarea
              rows={6}
              value={currentContent.summary}
              onChange={(e) =>
                updateCurrentContent((p) => ({
                  ...p,
                  summary: e.target.value,
                }))
              }
              className="w-full p-3 border border-slate-300 rounded-lg text-slate-900 leading-relaxed focus:ring-2 focus:ring-blue-500"
              placeholder="Write a concise overview..."
            />
          </div>
        )}

        {/* ======================= TAB: SKILLS ======================= */}
        {activeTab === 'skills' && (
          <div className="space-y-4">
            <div className="flex items-center justify-between pb-1 border-b border-slate-200">
              <span className="font-bold text-slate-800">
                {isRtl ? 'دسته‌بندی‌های مهارت فنی' : 'Technical Skill Groups'}
              </span>
              <button
                type="button"
                onClick={() => {
                  const newCategory: SkillCategory = {
                    id: `cat-${Date.now()}`,
                    title: isRtl ? 'مهارت جدید' : 'NEW CATEGORY',
                    skills: ['Skill 1', 'Skill 2'],
                  };
                  updateCurrentContent((p) => ({
                    ...p,
                    skillCategories: [...p.skillCategories, newCategory],
                  }));
                }}
                className="inline-flex items-center gap-1 text-blue-600 hover:text-blue-700 font-bold"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>{isRtl ? 'افزودن دسته' : 'Add Category'}</span>
              </button>
            </div>

            {/* Quick Badge Style Switcher */}
            <div className="p-2.5 bg-slate-100/80 rounded-lg border border-slate-200 flex items-center justify-between gap-2">
              <span className="text-[11px] font-semibold text-slate-700 shrink-0">
                {isRtl ? 'استایل نشان‌ها:' : 'Badge Style:'}
              </span>
              <div className="flex items-center gap-1.5">
                {(
                  [
                    { id: 'tinted', labelEn: 'Tinted', labelFa: 'رنگین' },
                    { id: 'outlined', labelEn: 'Outlined', labelFa: 'حاشیه‌دار' },
                    { id: 'neutral', labelEn: 'Neutral', labelFa: 'خنثی' },
                  ] as { id: SkillBadgeStyle; labelEn: string; labelFa: string }[]
                ).map((b) => {
                  const isSelected = (settings.skillBadgeStyle || 'tinted') === b.id;
                  return (
                    <button
                      key={b.id}
                      type="button"
                      onClick={() => onSettingsChange({ ...settings, skillBadgeStyle: b.id })}
                      className={`px-2 py-0.5 rounded text-[10.5px] font-bold transition-all flex items-center gap-1 border ${
                        isSelected
                          ? 'bg-white border-blue-600 text-blue-700 shadow-2xs'
                          : 'bg-transparent border-transparent text-slate-600 hover:bg-white/60'
                      }`}
                    >
                      <span
                        className="w-1.5 h-1.5 rounded-full"
                        style={{
                          backgroundColor:
                            b.id === 'neutral' ? '#64748b' : settings.accentColor,
                        }}
                      />
                      <span>{isRtl ? b.labelFa : b.labelEn}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            {currentContent.skillCategories.map((cat, catIdx) => (
              <div
                key={cat.id}
                className="p-3 bg-slate-50 border border-slate-200 rounded-lg space-y-2"
              >
                <div className="flex items-center justify-between gap-2">
                  <input
                    type="text"
                    value={cat.title}
                    onChange={(e) => {
                      const newTitle = e.target.value;
                      updateCurrentContent((p) => {
                        const updated = [...p.skillCategories];
                        updated[catIdx] = { ...updated[catIdx], title: newTitle };
                        return { ...p, skillCategories: updated };
                      });
                    }}
                    className="font-bold uppercase tracking-wider text-slate-800 bg-transparent border-b border-transparent hover:border-slate-300 focus:border-blue-500 focus:outline-none px-1 py-0.5"
                  />
                  <button
                    type="button"
                    onClick={() => {
                      updateCurrentContent((p) => ({
                        ...p,
                        skillCategories: p.skillCategories.filter(
                          (_, i) => i !== catIdx
                        ),
                      }));
                    }}
                    className="text-red-500 hover:text-red-700 p-1"
                    title="Delete group"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>

                <div>
                  <label className="block text-slate-500 text-[10px] mb-1">
                    {isRtl
                      ? 'مهارت‌ها (جدا شده با کاما ,)'
                      : 'Skills (comma-separated)'}
                  </label>
                  <input
                    type="text"
                    value={cat.skills.join(', ')}
                    onChange={(e) => {
                      const skills = e.target.value
                        .split(',')
                        .map((s) => s.trim())
                        .filter(Boolean);
                      updateCurrentContent((p) => {
                        const updated = [...p.skillCategories];
                        updated[catIdx] = { ...updated[catIdx], skills };
                        return { ...p, skillCategories: updated };
                      });
                    }}
                    className="w-full px-2.5 py-1.5 bg-white border border-slate-300 rounded text-slate-800 focus:ring-1 focus:ring-blue-500"
                  />

                  {/* Live Badges Preview */}
                  {cat.skills.length > 0 && (
                    <div className="flex flex-wrap gap-1.5 pt-1.5">
                      {cat.skills.map((s, sIdx) => (
                        <SkillBadge
                          key={sIdx}
                          skill={s}
                          accentColor={settings.accentColor}
                          style={settings.skillBadgeStyle || 'tinted'}
                          size="xs"
                        />
                      ))}
                    </div>
                  )}
                </div>
              </div>
            ))}

            {/* Languages Section */}
            <div className="pt-3 border-t border-slate-200">
              <span className="font-bold text-slate-800 block mb-2">
                {isRtl ? 'تسلط به زبان‌ها' : 'Languages & Proficiency'}
              </span>
              <div className="space-y-2">
                {currentContent.languages.map((lang, lIdx) => (
                  <div key={lIdx} className="space-y-2 rounded-lg border border-slate-200 bg-slate-50 p-2">
                    <div className="flex items-center gap-2">
                      <input
                        type="text"
                        value={lang.name}
                        onChange={(e) => {
                          const val = e.target.value;
                          updateCurrentContent((p) => {
                            const langs = [...p.languages];
                            langs[lIdx] = { ...langs[lIdx], name: val };
                            return { ...p, languages: langs };
                          });
                        }}
                        placeholder="Language"
                        className="flex-1 px-2 py-1 bg-white border border-slate-300 rounded"
                      />
                      <input
                        type="text"
                        value={lang.level ?? ''}
                        onChange={(e) => {
                          const val = e.target.value;
                          updateCurrentContent((p) => {
                            const langs = [...p.languages];
                            langs[lIdx] = { ...langs[lIdx], level: val };
                            return { ...p, languages: langs };
                          });
                        }}
                        placeholder="e.g. native / advanced"
                        className="w-32 px-2 py-1 bg-white border border-slate-300 rounded"
                      />
                      <button
                        type="button"
                        onClick={() => {
                          updateCurrentContent((p) => ({
                            ...p,
                            languages: p.languages.filter((_, i) => i !== lIdx),
                          }));
                        }}
                        className="text-red-500 hover:text-red-700 p-1"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                      <input
                        type="text"
                        value={lang.certificateTitle ?? ''}
                        onChange={(e) => {
                          const val = e.target.value;
                          updateCurrentContent((p) => {
                            const langs = [...p.languages];
                            langs[lIdx] = { ...langs[lIdx], certificateTitle: val };
                            return { ...p, languages: langs };
                          });
                        }}
                        placeholder={isRtl ? 'عنوان مدرک زبان (اختیاری)' : 'Certificate title (optional)'}
                        className="px-2 py-1 bg-white border border-slate-300 rounded"
                      />
                      <input
                        type="url"
                        value={lang.certificateUrl ?? ''}
                        onChange={(e) => {
                          const val = e.target.value;
                          updateCurrentContent((p) => {
                            const langs = [...p.languages];
                            langs[lIdx] = { ...langs[lIdx], certificateUrl: val };
                            return { ...p, languages: langs };
                          });
                        }}
                        placeholder={isRtl ? 'لینک مدرک زبان (اختیاری)' : 'Certificate URL (optional)'}
                        className="px-2 py-1 bg-white border border-slate-300 rounded"
                      />
                    </div>
                  </div>
                ))}
                <button
                  type="button"
                  onClick={() => {
                    updateCurrentContent((p) => ({
                      ...p,
                      languages: [
                        ...p.languages,
                        {
                          name: isRtl ? 'زبان جدید' : 'Language',
                          level: isRtl ? 'متوسط' : 'intermediate',
                          certificateTitle: '',
                          certificateUrl: '',
                        },
                      ],
                    }));
                  }}
                  className="inline-flex items-center gap-1 text-blue-600 font-bold mt-1"
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>{isRtl ? 'افزودن زبان' : 'Add Language'}</span>
                </button>
              </div>
            </div>
          </div>
        )}

        {/* ======================= TAB: EXPERIENCE ======================= */}
        {activeTab === 'experience' && (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="font-bold text-slate-800">
                {isRtl ? 'سوابق شغلی' : 'Work Experience Items'}
              </span>
              <button
                type="button"
                onClick={() => {
                  const newExp: ExperienceItem = {
                    id: `exp-${Date.now()}`,
                    company: isRtl ? 'نام شرکت' : 'Company Name',
                    badge: isRtl ? 'فعال' : 'Active',
                    role: isRtl ? 'سمت شغلی' : 'Role Title',
                    location: isRtl ? 'تهران، ایران' : 'Location',
                    period: isRtl ? '۱۴۰۲ – تاکنون' : '2023 – Present',
                    highlight: isRtl ? 'توضیح کلیدی درباره محصول و دستاورد' : 'Key impact overview',
                    bullets: [
                      isRtl ? 'دستاورد یا مسئولیت کلیدی اول' : 'Key achievement or responsibility 1',
                      isRtl ? 'دستاورد یا مسئولیت کلیدی دوم' : 'Key achievement or responsibility 2',
                    ],
                    tags: ['Python', 'Django', 'React'],
                    icon: 'cross',
                  };
                  updateCurrentContent((p) => ({
                    ...p,
                    experiences: [...p.experiences, newExp],
                  }));
                }}
                className="inline-flex items-center gap-1 text-blue-600 hover:text-blue-700 font-bold"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>{isRtl ? 'افزودن سابقه' : 'Add Experience'}</span>
              </button>
            </div>

            {currentContent.experiences.map((exp, eIdx) => (
              <div
                key={exp.id}
                className="p-3.5 bg-slate-50 border border-slate-200 rounded-xl space-y-3"
              >
                <div className="flex items-center justify-between gap-2">
                  <span className="font-bold text-slate-800 text-sm">
                    #{eIdx + 1}: {exp.company || 'Company'}
                  </span>
                  <button
                    type="button"
                    onClick={() => {
                      updateCurrentContent((p) => ({
                        ...p,
                        experiences: p.experiences.filter((_, i) => i !== eIdx),
                      }));
                    }}
                    className="text-red-500 hover:text-red-700 p-1"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>

                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <label className="block text-slate-500 text-[10px] mb-0.5">
                      {isRtl ? 'نام شرکت / سازمان' : 'Company Name'}
                    </label>
                    <input
                      type="text"
                      value={exp.company}
                      onChange={(e) => {
                        const val = e.target.value;
                        updateCurrentContent((p) => {
                          const exps = [...p.experiences];
                          exps[eIdx] = { ...exps[eIdx], company: val };
                          return { ...p, experiences: exps };
                        });
                      }}
                      className="w-full px-2.5 py-1.5 bg-white border border-slate-300 rounded font-semibold"
                    />
                  </div>

                  <div>
                    <label className="block text-slate-500 text-[10px] mb-0.5">
                      {isRtl ? 'برچسب وضعیت' : 'Status Badge'}
                    </label>
                    <input
                      type="text"
                      value={exp.badge || ''}
                      onChange={(e) => {
                        const val = e.target.value;
                        updateCurrentContent((p) => {
                          const exps = [...p.experiences];
                          exps[eIdx] = { ...exps[eIdx], badge: val };
                          return { ...p, experiences: exps };
                        });
                      }}
                      placeholder="e.g. Product in development"
                      className="w-full px-2.5 py-1.5 bg-white border border-slate-300 rounded"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-3 gap-2">
                  <div>
                    <label className="block text-slate-500 text-[10px] mb-0.5">
                      {isRtl ? 'نقش / سمت' : 'Role Title'}
                    </label>
                    <input
                      type="text"
                      value={exp.role}
                      onChange={(e) => {
                        const val = e.target.value;
                        updateCurrentContent((p) => {
                          const exps = [...p.experiences];
                          exps[eIdx] = { ...exps[eIdx], role: val };
                          return { ...p, experiences: exps };
                        });
                      }}
                      className="w-full px-2 py-1 bg-white border border-slate-300 rounded"
                    />
                  </div>

                  <div>
                    <label className="block text-slate-500 text-[10px] mb-0.5">
                      {isRtl ? 'مکان' : 'Location'}
                    </label>
                    <input
                      type="text"
                      value={exp.location}
                      onChange={(e) => {
                        const val = e.target.value;
                        updateCurrentContent((p) => {
                          const exps = [...p.experiences];
                          exps[eIdx] = { ...exps[eIdx], location: val };
                          return { ...p, experiences: exps };
                        });
                      }}
                      className="w-full px-2 py-1 bg-white border border-slate-300 rounded"
                    />
                  </div>

                  <div>
                    <label className="block text-slate-500 text-[10px] mb-0.5">
                      {isRtl ? 'بازه زمانی' : 'Period'}
                    </label>
                    <input
                      type="text"
                      value={exp.period}
                      onChange={(e) => {
                        const val = e.target.value;
                        updateCurrentContent((p) => {
                          const exps = [...p.experiences];
                          exps[eIdx] = { ...exps[eIdx], period: val };
                          return { ...p, experiences: exps };
                        });
                      }}
                      className="w-full px-2 py-1 bg-white border border-slate-300 rounded"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-slate-500 text-[10px] mb-0.5">
                    {isRtl ? 'تگ‌های فناوری (با کاما ,)' : 'Tech Tags (comma-separated)'}
                  </label>
                  <input
                    type="text"
                    value={exp.tags.join(', ')}
                    onChange={(e) => {
                      const tags = e.target.value
                        .split(',')
                        .map((t) => t.trim())
                        .filter(Boolean);
                      updateCurrentContent((p) => {
                        const exps = [...p.experiences];
                        exps[eIdx] = { ...exps[eIdx], tags };
                        return { ...p, experiences: exps };
                      });
                    }}
                    placeholder="Django, Channels, Celery, Redis..."
                    className="w-full px-2.5 py-1.5 bg-white border border-slate-300 rounded"
                  />
                </div>

                <div>
                  <label className="block text-slate-500 text-[10px] mb-0.5">
                    {isRtl ? 'جمله معرفی یا دستاورد کلیدی' : 'Key Highlight Sentence'}
                  </label>
                  <input
                    type="text"
                    value={exp.highlight}
                    onChange={(e) => {
                      const val = e.target.value;
                      updateCurrentContent((p) => {
                        const exps = [...p.experiences];
                        exps[eIdx] = { ...exps[eIdx], highlight: val };
                        return { ...p, experiences: exps };
                      });
                    }}
                    className="w-full px-2.5 py-1.5 bg-white border border-slate-300 rounded font-medium"
                  />
                </div>

                {/* Bullets */}
                <div>
                  <label className="block text-slate-500 text-[10px] mb-1">
                    {isRtl ? 'نکات کلیدی و فعالیت‌ها' : 'Bullet Points'}
                  </label>
                  <div className="space-y-1.5">
                    {exp.bullets.map((b, bIdx) => (
                      <div key={bIdx} className="flex items-start gap-1.5">
                        <textarea
                          rows={2}
                          value={b}
                          onChange={(e) => {
                            const val = e.target.value;
                            updateCurrentContent((p) => {
                              const exps = [...p.experiences];
                              const bullets = [...exps[eIdx].bullets];
                              bullets[bIdx] = val;
                              exps[eIdx] = { ...exps[eIdx], bullets };
                              return { ...p, experiences: exps };
                            });
                          }}
                          className="flex-1 p-1.5 bg-white border border-slate-300 rounded text-[11px]"
                        />
                        <button
                          type="button"
                          onClick={() => {
                            updateCurrentContent((p) => {
                              const exps = [...p.experiences];
                              const bullets = exps[eIdx].bullets.filter(
                                (_, i) => i !== bIdx
                              );
                              exps[eIdx] = { ...exps[eIdx], bullets };
                              return { ...p, experiences: exps };
                            });
                          }}
                          className="text-red-500 hover:text-red-700 p-1"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    ))}
                    <button
                      type="button"
                      onClick={() => {
                        updateCurrentContent((p) => {
                          const exps = [...p.experiences];
                          const bullets = [
                            ...exps[eIdx].bullets,
                            isRtl ? 'نکته جدید...' : 'New bullet point...',
                          ];
                          exps[eIdx] = { ...exps[eIdx], bullets };
                          return { ...p, experiences: exps };
                        });
                      }}
                      className="inline-flex items-center gap-1 text-blue-600 font-bold"
                    >
                      <Plus className="w-3.5 h-3.5" />
                      <span>{isRtl ? 'افزودن نکته' : 'Add Bullet'}</span>
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* ======================= TAB: PROJECTS ======================= */}
        {activeTab === 'projects' && (
          <div className="space-y-5">
            {/* Selected Projects (Page 1) */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="font-bold text-slate-800">
                  {isRtl
                    ? 'پروژه‌های منتخب (صفحه ۱)'
                    : 'Selected Projects (Page 1)'}
                </span>
                <button
                  type="button"
                  onClick={() => {
                    const newProj: ProjectItem = {
                      id: `proj-${Date.now()}`,
                      title: 'Project Title',
                      subtitle: 'Subtitle',
                      linkText: isRtl ? 'گیت‌هاب ↖' : 'GitHub ↗',
                      linkUrl: 'https://github.com/',
                      description: 'Project description...',
                      techStack: 'Tech: React, TypeScript',
                      icon: 'code',
                    };
                    updateCurrentContent((p) => ({
                      ...p,
                      selectedProjects: [...p.selectedProjects, newProj],
                    }));
                  }}
                  className="inline-flex items-center gap-1 text-blue-600 font-bold"
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>{isRtl ? 'افزودن پروژه' : 'Add Project'}</span>
                </button>
              </div>

              <div className="space-y-3">
                {currentContent.selectedProjects.map((proj, pIdx) => (
                  <div
                    key={proj.id}
                    className="p-3 bg-slate-50 border border-slate-200 rounded-lg space-y-2"
                  >
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-slate-800">
                        {proj.title}
                      </span>
                      <button
                        type="button"
                        onClick={() => {
                          updateCurrentContent((p) => ({
                            ...p,
                            selectedProjects: p.selectedProjects.filter(
                              (_, i) => i !== pIdx
                            ),
                          }));
                        }}
                        className="text-red-500 hover:text-red-700 p-1"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>

                    <div className="grid grid-cols-2 gap-2">
                      <input
                        type="text"
                        value={proj.title}
                        onChange={(e) => {
                          const val = e.target.value;
                          updateCurrentContent((p) => {
                            const list = [...p.selectedProjects];
                            list[pIdx] = { ...list[pIdx], title: val };
                            return { ...p, selectedProjects: list };
                          });
                        }}
                        placeholder="Title"
                        className="px-2 py-1 bg-white border border-slate-300 rounded font-semibold"
                      />
                      <input
                        type="text"
                        value={proj.subtitle}
                        onChange={(e) => {
                          const val = e.target.value;
                          updateCurrentContent((p) => {
                            const list = [...p.selectedProjects];
                            list[pIdx] = { ...list[pIdx], subtitle: val };
                            return { ...p, selectedProjects: list };
                          });
                        }}
                        placeholder="Subtitle"
                        className="px-2 py-1 bg-white border border-slate-300 rounded"
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-2">
                      <input
                        type="text"
                        value={proj.linkText}
                        onChange={(e) => {
                          const val = e.target.value;
                          updateCurrentContent((p) => {
                            const list = [...p.selectedProjects];
                            list[pIdx] = { ...list[pIdx], linkText: val };
                            return { ...p, selectedProjects: list };
                          });
                        }}
                        placeholder="Link Label (e.g. GitHub ↗)"
                        className="px-2 py-1 bg-white border border-slate-300 rounded"
                      />
                      <input
                        type="text"
                        value={proj.linkUrl}
                        onChange={(e) => {
                          const val = e.target.value;
                          updateCurrentContent((p) => {
                            const list = [...p.selectedProjects];
                            list[pIdx] = { ...list[pIdx], linkUrl: val };
                            return { ...p, selectedProjects: list };
                          });
                        }}
                        placeholder="Link URL"
                        className="px-2 py-1 bg-white border border-slate-300 rounded"
                      />
                    </div>

                    <textarea
                      rows={2}
                      value={proj.description}
                      onChange={(e) => {
                        const val = e.target.value;
                        updateCurrentContent((p) => {
                          const list = [...p.selectedProjects];
                          list[pIdx] = { ...list[pIdx], description: val };
                          return { ...p, selectedProjects: list };
                        });
                      }}
                      placeholder="Description"
                      className="w-full p-2 bg-white border border-slate-300 rounded"
                    />

                    <input
                      type="text"
                      value={proj.techStack}
                      onChange={(e) => {
                        const val = e.target.value;
                        updateCurrentContent((p) => {
                          const list = [...p.selectedProjects];
                          list[pIdx] = { ...list[pIdx], techStack: val };
                          return { ...p, selectedProjects: list };
                        });
                      }}
                      placeholder="Tech: Nuxt, Vue..."
                      className="w-full px-2 py-1 bg-white border border-slate-300 rounded text-[11px]"
                    />
                  </div>
                ))}
              </div>
            </div>

            {/* More Projects (Page 2) */}
            <div className="pt-3 border-t border-slate-200">
              <div className="flex items-center justify-between mb-2">
                <span className="font-bold text-slate-800">
                  {isRtl ? 'سایر پروژه‌ها (صفحه ۲)' : 'More Projects (Page 2)'}
                </span>
                <button
                  type="button"
                  onClick={() => {
                    const newProj: ProjectItem = {
                      id: `proj-${Date.now()}`,
                      title: 'App Name',
                      subtitle: 'Subtitle',
                      linkText: isRtl ? 'گیت‌هاب ↖' : 'GitHub ↗',
                      linkUrl: 'https://github.com/',
                      description: 'Description...',
                      techStack: 'Tech: Flutter, Dart',
                      icon: 'chat',
                    };
                    updateCurrentContent((p) => ({
                      ...p,
                      moreProjects: [...p.moreProjects, newProj],
                    }));
                  }}
                  className="inline-flex items-center gap-1 text-blue-600 font-bold"
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>{isRtl ? 'افزودن پروژه' : 'Add Project'}</span>
                </button>
              </div>

              <div className="space-y-3">
                {currentContent.moreProjects.map((proj, pIdx) => (
                  <div
                    key={proj.id}
                    className="p-3 bg-slate-50 border border-slate-200 rounded-lg space-y-2"
                  >
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-slate-800">
                        {proj.title}
                      </span>
                      <button
                        type="button"
                        onClick={() => {
                          updateCurrentContent((p) => ({
                            ...p,
                            moreProjects: p.moreProjects.filter(
                              (_, i) => i !== pIdx
                            ),
                          }));
                        }}
                        className="text-red-500 hover:text-red-700 p-1"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>

                    <div className="grid grid-cols-2 gap-2">
                      <input
                        type="text"
                        value={proj.title}
                        onChange={(e) => {
                          const val = e.target.value;
                          updateCurrentContent((p) => {
                            const list = [...p.moreProjects];
                            list[pIdx] = { ...list[pIdx], title: val };
                            return { ...p, moreProjects: list };
                          });
                        }}
                        placeholder="Title"
                        className="px-2 py-1 bg-white border border-slate-300 rounded font-semibold"
                      />
                      <input
                        type="text"
                        value={proj.subtitle}
                        onChange={(e) => {
                          const val = e.target.value;
                          updateCurrentContent((p) => {
                            const list = [...p.moreProjects];
                            list[pIdx] = { ...list[pIdx], subtitle: val };
                            return { ...p, moreProjects: list };
                          });
                        }}
                        placeholder="Subtitle"
                        className="px-2 py-1 bg-white border border-slate-300 rounded"
                      />
                    </div>

                    <textarea
                      rows={2}
                      value={proj.description}
                      onChange={(e) => {
                        const val = e.target.value;
                        updateCurrentContent((p) => {
                          const list = [...p.moreProjects];
                          list[pIdx] = { ...list[pIdx], description: val };
                          return { ...p, moreProjects: list };
                        });
                      }}
                      placeholder="Description"
                      className="w-full p-2 bg-white border border-slate-300 rounded"
                    />

                    <input
                      type="text"
                      value={proj.techStack}
                      onChange={(e) => {
                        const val = e.target.value;
                        updateCurrentContent((p) => {
                          const list = [...p.moreProjects];
                          list[pIdx] = { ...list[pIdx], techStack: val };
                          return { ...p, moreProjects: list };
                        });
                      }}
                      placeholder="Tech: Python, Django..."
                      className="w-full px-2 py-1 bg-white border border-slate-300 rounded text-[11px]"
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* ======================= TAB: HIGHLIGHTS ======================= */}
        {activeTab === 'highlights' && (
          <div className="space-y-4">
            <div>
              <span className="font-bold text-slate-800 block mb-1">
                {isRtl
                  ? 'برجستگی‌های فنی و مهندسی (۶ کارت صفحه ۲)'
                  : 'Engineering Highlights (Page 2 - 6 Grid Cards)'}
              </span>
              <p className="text-slate-500 text-[11px] mb-3">
                {isRtl
                  ? 'این ۶ کارت مهارت‌های کلیدی مهندسی سیستم، قابلیت اطمینان، بلادرنگ و امنیت را معرفی می‌کنند.'
                  : 'These cards showcase core engineering pillars: Offline-First, Real-Time, Security, Infrastructure, APIs, RTL interfaces.'}
              </p>
            </div>

            <div className="space-y-2.5">
              {currentContent.highlights.map((hl, hIdx) => (
                <div
                  key={hl.id}
                  className="p-2.5 bg-slate-50 border border-slate-200 rounded-lg space-y-1.5"
                >
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-slate-500 text-[10px]">
                      #{hIdx + 1}
                    </span>
                    <input
                      type="text"
                      value={hl.title}
                      onChange={(e) => {
                        const val = e.target.value;
                        updateCurrentContent((p) => {
                          const list = [...p.highlights];
                          list[hIdx] = { ...list[hIdx], title: val };
                          return { ...p, highlights: list };
                        });
                      }}
                      className="flex-1 px-2 py-1 bg-white border border-slate-300 rounded font-bold text-slate-800"
                    />
                  </div>
                  <textarea
                    rows={2}
                    value={hl.description}
                    onChange={(e) => {
                      const val = e.target.value;
                      updateCurrentContent((p) => {
                        const list = [...p.highlights];
                        list[hIdx] = { ...list[hIdx], description: val };
                        return { ...p, highlights: list };
                      });
                    }}
                    className="w-full p-2 bg-white border border-slate-300 rounded text-[11px]"
                  />
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ======================= TAB: EDUCATION ======================= */}
        {activeTab === 'education' && (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="font-bold text-slate-800">
                {isRtl ? 'تحصیلات و دانشگاه' : 'Education & Degrees'}
              </span>
              <button
                type="button"
                onClick={() => {
                  const newEdu: EducationItem = {
                    id: `edu-${Date.now()}`,
                    degree: isRtl ? 'مدرک تحصیلی' : 'Degree Name',
                    institution: isRtl ? 'دانشگاه یا موسسه' : 'Institution',
                    period: '2023 – Present',
                  };
                  updateCurrentContent((p) => ({
                    ...p,
                    educations: [...p.educations, newEdu],
                  }));
                }}
                className="inline-flex items-center gap-1 text-blue-600 font-bold"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>{isRtl ? 'افزودن مدرک' : 'Add Degree'}</span>
              </button>
            </div>

            <div className="space-y-3">
              {currentContent.educations.map((edu, edIdx) => (
                <div
                  key={edu.id}
                  className="p-3 bg-slate-50 border border-slate-200 rounded-lg space-y-2"
                >
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-slate-800">
                      #{edIdx + 1}
                    </span>
                    <button
                      type="button"
                      onClick={() => {
                        updateCurrentContent((p) => ({
                          ...p,
                          educations: p.educations.filter((_, i) => i !== edIdx),
                        }));
                      }}
                      className="text-red-500 hover:text-red-700 p-1"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>

                  <div>
                    <label className="block text-slate-500 text-[10px] mb-0.5">
                      {isRtl ? 'مقطع و رشته' : 'Degree & Field'}
                    </label>
                    <input
                      type="text"
                      value={edu.degree}
                      onChange={(e) => {
                        const val = e.target.value;
                        updateCurrentContent((p) => {
                          const list = [...p.educations];
                          list[edIdx] = { ...list[edIdx], degree: val };
                          return { ...p, educations: list };
                        });
                      }}
                      className="w-full px-2.5 py-1.5 bg-white border border-slate-300 rounded font-semibold"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-2">
                    <div>
                      <label className="block text-slate-500 text-[10px] mb-0.5">
                        {isRtl ? 'نام دانشگاه' : 'University / School'}
                      </label>
                      <input
                        type="text"
                        value={edu.institution}
                        onChange={(e) => {
                          const val = e.target.value;
                          updateCurrentContent((p) => {
                            const list = [...p.educations];
                            list[edIdx] = { ...list[edIdx], institution: val };
                            return { ...p, educations: list };
                          });
                        }}
                        className="w-full px-2 py-1 bg-white border border-slate-300 rounded"
                      />
                    </div>
                    <div>
                      <label className="block text-slate-500 text-[10px] mb-0.5">
                        {isRtl ? 'سال / دوره' : 'Years / Status'}
                      </label>
                      <input
                        type="text"
                        value={edu.period}
                        onChange={(e) => {
                          const val = e.target.value;
                          updateCurrentContent((p) => {
                            const list = [...p.educations];
                            list[edIdx] = { ...list[edIdx], period: val };
                            return { ...p, educations: list };
                          });
                        }}
                        className="w-full px-2 py-1 bg-white border border-slate-300 rounded"
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Editor Footer / Quick Reset */}
      <div className="p-3 bg-slate-50 border-t border-slate-200 flex items-center justify-between text-xs">
        <button
          type="button"
          onClick={onReset}
          className="inline-flex items-center gap-1.5 text-slate-600 hover:text-red-600 transition-colors"
        >
          <RotateCcw className="w-3.5 h-3.5" />
          <span>{isRtl ? 'بازنشانی به داده اولیه' : 'Reset to Sample Data'}</span>
        </button>

        <span className="text-slate-400 font-medium">
          Auto-saves in browser
        </span>
      </div>
    </div>
  );
};
