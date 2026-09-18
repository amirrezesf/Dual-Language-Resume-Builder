import React, { useState } from 'react';
import {
  Download,
  Printer,
  FileDown,
  Upload,
  Languages,
  Palette,
  Eye,
  Sliders,
  Sparkles,
  Check,
  ZoomIn,
  ZoomOut,
  Maximize2,
  FileText,
  SplitSquareVertical,
  LayoutTemplate,
  ChevronDown,
} from 'lucide-react';
import { Language, ResumeSettings, ResumeLayoutId } from '../types';
import { defaultThemeColors } from '../data/initialData';
import { availableLayouts } from '../data/layouts';

interface ToolbarProps {
  language: Language;
  onLanguageChange: (lang: Language) => void;
  viewMode: 'single' | 'split';
  onViewModeChange: (mode: 'single' | 'split') => void;
  settings: ResumeSettings;
  onSettingsChange: (settings: ResumeSettings) => void;
  pageFilter: 'all' | '1' | '2';
  onPageFilterChange: (p: 'all' | '1' | '2') => void;
  zoom: number;
  onZoomChange: (z: number) => void;
  onExportPdf: () => void;
  onPrint: () => void;
  isExporting: boolean;
  exportStatus?: string;
  exportError?: string | null;
  onClearExportError?: () => void;
  isEditorOpen: boolean;
  onToggleEditor: () => void;
  onExportJson: () => void;
  onImportJson: (data: any) => void;
  onOpenImportPrompt: () => void;
  dualBoxExportFormat?: 'board-spread' | 'a4-pages';
  onDualBoxExportFormatChange?: (format: 'board-spread' | 'a4-pages') => void;
}

export const Toolbar: React.FC<ToolbarProps> = ({
  language,
  onLanguageChange,
  viewMode,
  onViewModeChange,
  settings,
  onSettingsChange,
  pageFilter,
  onPageFilterChange,
  zoom,
  onZoomChange,
  onExportPdf,
  onPrint,
  isExporting,
  exportStatus,
  exportError,
  onClearExportError,
  isEditorOpen,
  onToggleEditor,
  onExportJson,
  onImportJson,
  onOpenImportPrompt,
  dualBoxExportFormat = 'board-spread',
  onDualBoxExportFormatChange,
}) => {
  const [showColorPicker, setShowColorPicker] = useState(false);
  const [showLayoutPicker, setShowLayoutPicker] = useState(false);

  const currentLayout =
    availableLayouts.find((l) => l.id === settings.layoutId) || availableLayouts[0];

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (event) => {
      try {
        const json = JSON.parse(event.target?.result as string);
        onImportJson(json);
      } catch (err) {
        alert('Invalid JSON file format.');
      }
    };
    reader.readAsText(file);
    e.target.value = '';
  };

  return (
    <header className="no-print sticky top-0 z-30 bg-white/95 backdrop-blur-md border-b border-slate-200/90 shadow-2xs">
      <div className="max-w-7xl mx-auto px-4 py-2.5 flex flex-wrap items-center justify-between gap-3">
        {/* Left: App Identity */}
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-blue-600 text-white flex items-center justify-center shadow-xs font-bold text-base">
            <span className="tracking-tight">CV</span>
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-sm font-bold text-slate-900 leading-none">
                Dual-Language Resume Builder
              </h1>
              <span className="text-[10px] font-bold px-1.5 py-0.5 rounded bg-blue-50 text-blue-700 border border-blue-200/70 uppercase">
                RTL + LTR
              </span>
            </div>
            <p className="text-[11px] text-slate-500 font-medium mt-0.5">
              Multi-layout • Persian & English • Instant PDF
            </p>
          </div>
        </div>

        {/* Center: Controls (Layout, Language, View Mode, Pages) */}
        <div className="flex items-center flex-wrap gap-2">
          {/* Layout Selector Dropdown */}
          <div className="relative">
            <button
              type="button"
              onClick={() => {
                setShowLayoutPicker(!showLayoutPicker);
                setShowColorPicker(false);
              }}
              className="px-2.5 py-1.5 rounded-lg border border-slate-200 bg-white hover:bg-slate-50 text-slate-800 flex items-center gap-1.5 text-xs font-bold shadow-2xs transition-colors"
              title="Change Resume Layout Style"
            >
              <LayoutTemplate className="w-3.5 h-3.5 text-blue-600" />
              <span className="hidden sm:inline">
                {language === 'fa' ? currentLayout.nameFa : currentLayout.name}
              </span>
              <ChevronDown className="w-3 h-3 text-slate-400" />
            </button>

            {showLayoutPicker && (
              <div
                className={`absolute top-full mt-2 p-2 bg-white border border-slate-200 rounded-xl shadow-xl w-72 sm:w-80 z-50 animate-in fade-in zoom-in-95 ${
                  language === 'fa' ? 'right-0 text-right' : 'left-0 text-left'
                }`}
                dir={language === 'fa' ? 'rtl' : 'ltr'}
              >
                <div className="px-2 py-1.5 border-b border-slate-100 flex items-center justify-between">
                  <span className="text-[10.5px] font-bold text-slate-500 uppercase tracking-wider">
                    {language === 'fa' ? 'انتخاب قالب و چیدمان' : 'Select Layout Style'}
                  </span>
                  <span className="text-[10px] text-blue-600 font-semibold">
                    {availableLayouts.length} {language === 'fa' ? 'قالب آماده' : 'Layouts'}
                  </span>
                </div>
                <div className="mt-1.5 space-y-1">
                  {availableLayouts.map((l) => {
                    const isSelected = settings.layoutId === l.id;
                    return (
                      <button
                        key={l.id}
                        type="button"
                        onClick={() => {
                          onSettingsChange({ ...settings, layoutId: l.id });
                          setShowLayoutPicker(false);
                        }}
                        className={`w-full p-2.5 rounded-lg text-left transition-all flex items-start justify-between gap-2 ${
                          isSelected
                            ? 'bg-blue-50/80 border border-blue-200 text-blue-900'
                            : 'hover:bg-slate-50 text-slate-800 border border-transparent'
                        }`}
                      >
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-1.5">
                            <span className="text-xs font-bold leading-tight">
                              {language === 'fa' ? l.nameFa : l.name}
                            </span>
                            {l.badge && (
                              <span className="px-1.5 py-0.2 rounded text-[9px] font-bold bg-slate-200/80 text-slate-700">
                                {l.badge}
                              </span>
                            )}
                          </div>
                          <p className="text-[10.5px] text-slate-500 leading-normal mt-0.5">
                            {language === 'fa' ? l.descriptionFa : l.description}
                          </p>
                        </div>
                        {isSelected && (
                          <Check className="w-4 h-4 text-blue-600 shrink-0 mt-0.5" />
                        )}
                      </button>
                    );
                  })}
                </div>
              </div>
            )}
          </div>

          {/* Language Switcher */}
          <div className="flex items-center p-0.5 bg-slate-100 rounded-lg border border-slate-200">
            <button
              type="button"
              onClick={() => onLanguageChange('en')}
              className={`px-2.5 py-1 text-xs font-semibold rounded-md transition-all ${
                language === 'en' && viewMode === 'single'
                  ? 'bg-white text-blue-600 shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              English (LTR)
            </button>
            <button
              type="button"
              onClick={() => onLanguageChange('fa')}
              className={`px-2.5 py-1 text-xs font-semibold rounded-md transition-all font-['Vazirmatn'] ${
                language === 'fa' && viewMode === 'single'
                  ? 'bg-white text-blue-600 shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              فارسی (RTL)
            </button>
            <button
              type="button"
              onClick={() =>
                onViewModeChange(viewMode === 'split' ? 'single' : 'split')
              }
              className={`px-2 py-1 text-xs font-semibold rounded-md transition-all flex items-center gap-1 ${
                viewMode === 'split'
                  ? 'bg-blue-600 text-white shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
              title="View Persian and English side-by-side"
            >
              <SplitSquareVertical className="w-3.5 h-3.5" />
              <span>Side-by-Side</span>
            </button>
          </div>

          {/* Page Filter (hidden if 1-page compact layout) */}
          {settings.layoutId !== 'compact-single' && (
            <div className="hidden sm:flex items-center p-0.5 bg-slate-100 rounded-lg border border-slate-200 text-xs font-medium">
              <button
                type="button"
                onClick={() => onPageFilterChange('all')}
                className={`px-2 py-1 rounded-md transition-all ${
                  pageFilter === 'all'
                    ? 'bg-white text-slate-900 font-bold shadow-xs'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                Both Pages
              </button>
              <button
                type="button"
                onClick={() => onPageFilterChange('1')}
                className={`px-2 py-1 rounded-md transition-all ${
                  pageFilter === '1'
                    ? 'bg-white text-slate-900 font-bold shadow-xs'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                P.1
              </button>
              <button
                type="button"
                onClick={() => onPageFilterChange('2')}
                className={`px-2 py-1 rounded-md transition-all ${
                  pageFilter === '2'
                    ? 'bg-white text-slate-900 font-bold shadow-xs'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                P.2
              </button>
            </div>
          )}

          {/* Theme Color Picker Dropdown */}
          <div className="relative">
            <button
              type="button"
              onClick={() => {
                setShowColorPicker(!showColorPicker);
                setShowLayoutPicker(false);
              }}
              className="p-1.5 rounded-lg border border-slate-200 bg-white hover:bg-slate-50 text-slate-700 flex items-center gap-1.5 text-xs font-semibold"
              title="Choose accent theme color"
            >
              <span
                className="w-3.5 h-3.5 rounded-full border border-black/10 shadow-2xs"
                style={{ backgroundColor: settings.accentColor }}
              />
              <Palette className="w-3.5 h-3.5 text-slate-500" />
            </button>

            {showColorPicker && (
              <div className="absolute top-full right-0 mt-2 p-2.5 bg-white border border-slate-200 rounded-xl shadow-xl w-52 z-50 animate-in fade-in zoom-in-95">
                <span className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-2">
                  Accent Color
                </span>
                <div className="grid grid-cols-3 gap-2">
                  {defaultThemeColors.map((c) => (
                    <button
                      key={c.value}
                      type="button"
                      onClick={() => {
                        onSettingsChange({ ...settings, accentColor: c.value });
                        setShowColorPicker(false);
                      }}
                      className="group flex flex-col items-center gap-1 p-1 rounded-lg hover:bg-slate-50"
                    >
                      <div
                        className="w-6 h-6 rounded-full flex items-center justify-center transition-transform group-hover:scale-110 shadow-xs"
                        style={{ backgroundColor: c.value }}
                      >
                        {settings.accentColor === c.value && (
                          <Check className="w-3.5 h-3.5 text-white stroke-[3]" />
                        )}
                      </div>
                      <span className="text-[9.5px] text-slate-600 font-medium truncate w-full text-center">
                        {c.name.split(' ')[0]}
                      </span>
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Zoom controls */}
          <div className="hidden md:flex items-center bg-slate-100 rounded-lg p-0.5 border border-slate-200 text-xs">
            <button
              type="button"
              onClick={() => onZoomChange(Math.max(50, zoom - 10))}
              className="p-1 text-slate-600 hover:text-slate-900"
              title="Zoom out"
            >
              <ZoomOut className="w-3.5 h-3.5" />
            </button>
            <span className="px-1.5 font-semibold text-slate-700 select-none">
              {zoom}%
            </span>
            <button
              type="button"
              onClick={() => onZoomChange(Math.min(130, zoom + 10))}
              className="p-1 text-slate-600 hover:text-slate-900"
              title="Zoom in"
            >
              <ZoomIn className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* Right: Actions (Editor Toggle, Print, Export PDF, JSON) */}
        <div className="flex items-center gap-2">
          {/* Toggle Editor */}
          <button
            type="button"
            onClick={onToggleEditor}
            className={`inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-lg border transition-all ${
              isEditorOpen
                ? 'bg-slate-100 text-slate-800 border-slate-300'
                : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-50'
            }`}
          >
            <Sliders className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">
              {isEditorOpen ? 'Hide Editor' : 'Edit Resume'}
            </span>
          </button>

          {/* GitHub AI Prompt & JSON Import Dialog */}
          <button
            type="button"
            onClick={onOpenImportPrompt}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-bold rounded-lg border border-blue-200 bg-blue-50/80 hover:bg-blue-100 text-blue-700 transition-all shadow-2xs hover:scale-102"
            title="Import Resume JSON or Generate GitHub AI Prompt"
          >
            <Sparkles className="w-3.5 h-3.5 text-blue-600" />
            <span>Import / GitHub Prompt</span>
          </button>

          {/* Browser Vector Print */}
          <button
            type="button"
            onClick={onPrint}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-lg border border-slate-200 bg-white hover:bg-slate-50 text-slate-700 transition-colors shadow-2xs"
            title="Open browser print dialog for crystal-clear vector output"
          >
            <Printer className="w-3.5 h-3.5 text-slate-500" />
            <span className="hidden md:inline">Print / Vector PDF</span>
          </button>

          {/* Dual-Box Format Toggle (when Dual-Box layout is active) */}
          {settings.layoutId === 'dual-box-board' && (
            <div className="hidden sm:flex items-center p-0.5 rounded-lg border border-slate-200 bg-slate-100 text-[11px] font-semibold">
              <button
                type="button"
                onClick={() => onDualBoxExportFormatChange?.('board-spread')}
                className={`px-2 py-1 rounded-md transition-all ${
                  dualBoxExportFormat === 'board-spread'
                    ? 'bg-white text-blue-700 shadow-2xs font-bold'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
                title="Export the full presentation canvas board with both pages"
              >
                Canvas Board
              </button>
              <button
                type="button"
                onClick={() => onDualBoxExportFormatChange?.('a4-pages')}
                className={`px-2 py-1 rounded-md transition-all ${
                  dualBoxExportFormat === 'a4-pages'
                    ? 'bg-white text-blue-700 shadow-2xs font-bold'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
                title="Export separate A4 pages styled with dual-box cards"
              >
                A4 Sheets
              </button>
            </div>
          )}

          {/* Export PDF Direct Download */}
          <button
            type="button"
            onClick={onExportPdf}
            disabled={isExporting}
            className="inline-flex items-center gap-1.5 px-3.5 py-1.5 text-xs font-bold rounded-lg bg-blue-600 hover:bg-blue-700 active:scale-98 text-white shadow-xs transition-all disabled:opacity-50"
            title={
              settings.layoutId === 'dual-box-board' && dualBoxExportFormat === 'board-spread'
                ? 'Download the Dual-Box presentation canvas PDF'
                : 'Download resume as PDF'
            }
          >
            <Download className="w-3.5 h-3.5" />
            <span>
              {isExporting
                ? 'Generating...'
                : settings.layoutId === 'dual-box-board' && dualBoxExportFormat === 'board-spread'
                ? 'Download Canvas PDF'
                : 'Download PDF'}
            </span>
          </button>

          {/* Data Backup / Restore (JSON) */}
          <div className="hidden lg:flex items-center gap-1">
            <button
              type="button"
              onClick={onExportJson}
              className="p-1.5 rounded-lg border border-slate-200 bg-white hover:bg-slate-50 text-slate-600"
              title="Backup resume data to JSON"
            >
              <FileDown className="w-3.5 h-3.5" />
            </button>
            <label
              className="p-1.5 rounded-lg border border-slate-200 bg-white hover:bg-slate-50 text-slate-600 cursor-pointer"
              title="Restore resume data from JSON"
            >
              <Upload className="w-3.5 h-3.5" />
              <input
                type="file"
                accept=".json"
                onChange={handleFileInput}
                className="hidden"
              />
            </label>
          </div>
        </div>
      </div>

      {/* Progress / Status banner during PDF generation */}
      {exportStatus && (
        <div className="bg-blue-50 border-t border-blue-200 px-4 py-2 text-center text-xs font-semibold text-blue-900 flex items-center justify-center gap-2.5 transition-all">
          {isExporting && (
            <span className="w-2 h-2 rounded-full bg-blue-600 animate-ping inline-block" />
          )}
          <span>{exportStatus}</span>
        </div>
      )}

      {/* Error notification banner */}
      {exportError && (
        <div className="bg-amber-50 border-t border-amber-200 px-4 py-2.5 text-center text-xs text-amber-900 flex items-center justify-between gap-4">
          <div className="flex items-center gap-2 text-left">
            <span className="font-bold text-amber-800">Notice:</span>
            <span>{exportError}</span>
          </div>
          <button
            type="button"
            onClick={onClearExportError}
            className="px-2 py-0.5 rounded-md bg-amber-100 hover:bg-amber-200 text-amber-800 font-bold shrink-0 transition-colors"
          >
            Dismiss
          </button>
        </div>
      )}
    </header>
  );
};

