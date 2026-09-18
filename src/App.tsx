import React, { useState, useEffect } from 'react';
import {
  DualResumeData,
  Language,
  ResumeSettings,
} from './types';
import { initialResumeData } from './data/initialData';
import { ResumePreview } from './components/ResumePreview';
import { ResumeEditor } from './components/ResumeEditor';
import { Toolbar } from './components/Toolbar';
import { exportResumeToPdf, triggerPrintDialog } from './utils/pdfExport';
import { ChevronLeft, ChevronRight, Sparkles } from 'lucide-react';
import { ImportPromptModal } from './components/modals/ImportPromptModal';

const STORAGE_KEY = 'dual_language_resume_v1';
const SETTINGS_KEY = 'dual_language_resume_settings_v1';

export default function App() {
  // Load saved data or fallback to initial data
  const [resumeData, setResumeData] = useState<DualResumeData>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) return JSON.parse(saved);
    } catch (e) {
      console.warn('Failed to load saved resume from storage', e);
    }
    return initialResumeData;
  });

  const [language, setLanguage] = useState<Language>('en');
  const [viewMode, setViewMode] = useState<'single' | 'split'>('single');
  const [pageFilter, setPageFilter] = useState<'all' | '1' | '2'>('all');
  const [zoom, setZoom] = useState<number>(85);
  const [isEditorOpen, setIsEditorOpen] = useState<boolean>(true);

  const [settings, setSettings] = useState<ResumeSettings>(() => {
    try {
      const saved = localStorage.getItem(SETTINGS_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        return {
          ...parsed,
          layoutId: parsed.layoutId || 'modern-tech',
          skillBadgeStyle: parsed.skillBadgeStyle || 'tinted',
        };
      }
    } catch (e) {
      console.warn('Failed to load saved settings', e);
    }
    return {
      accentColor: '#2563eb', // Matches photo
      activeLanguage: 'en',
      layoutId: 'modern-tech',
      skillBadgeStyle: 'tinted',
      showPage2: true,
      usePersianNumerals: true,
      showWatermark: true,
    };
  });

  const [isExporting, setIsExporting] = useState(false);
  const [exportStatus, setExportStatus] = useState('');
  const [exportError, setExportError] = useState<string | null>(null);
  const [isImportPromptOpen, setIsImportPromptOpen] = useState(false);
  const [dualBoxExportFormat, setDualBoxExportFormat] = useState<'board-spread' | 'a4-pages'>('board-spread');

  // Persist resume data
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(resumeData));
    } catch (e) {
      console.error('Storage write error', e);
    }
  }, [resumeData]);

  // Persist settings
  useEffect(() => {
    try {
      localStorage.setItem(SETTINGS_KEY, JSON.stringify(settings));
    } catch (e) {
      console.error('Settings write error', e);
    }
  }, [settings]);

  // Auto-adjust initial zoom on small screens
  useEffect(() => {
    if (window.innerWidth < 1024) {
      setZoom(65);
      setIsEditorOpen(false);
    }
  }, []);

  const handleExportPdf = async () => {
    setIsExporting(true);
    setExportError(null);
    setExportStatus('Preparing resume pages for PDF download...');

    try {
      // Find the preview container for the target language (supports both single and split view)
      const langContainer =
        document.querySelector<HTMLElement>(`[data-resume-lang="${language}"]`) ||
        document.getElementById(`resume-print-area-${language}`) ||
        document.getElementById('resume-print-area') ||
        document.body;

      const isDualBoxLayout = settings.layoutId === 'dual-box-board';
      const canvasBoard =
        langContainer.querySelector<HTMLElement>('#resume-canvas-board') ||
        document.getElementById('resume-canvas-board');

      const targetElements: HTMLElement[] = [];

      if (
        isDualBoxLayout &&
        canvasBoard &&
        pageFilter === 'all' &&
        dualBoxExportFormat === 'board-spread'
      ) {
        targetElements.push(canvasBoard);
      } else {
        if (pageFilter === 'all' || pageFilter === '1') {
          const p1 = langContainer.querySelector<HTMLElement>('#resume-page-1');
          if (p1) targetElements.push(p1);
        }
        if (settings.showPage2 && (pageFilter === 'all' || pageFilter === '2')) {
          const p2 = langContainer.querySelector<HTMLElement>('#resume-page-2');
          if (p2) targetElements.push(p2);
        }
      }

      // If specific IDs weren't matched in the container, locate sheets directly
      if (targetElements.length === 0) {
        if (isDualBoxLayout && canvasBoard) {
          targetElements.push(canvasBoard);
        } else {
          const sheets = Array.from(
            langContainer.querySelectorAll<HTMLElement>('.resume-sheet')
          );
          if (sheets.length > 0) {
            if (pageFilter === '1') {
              targetElements.push(sheets[0]);
            } else if (pageFilter === '2' && sheets[1]) {
              targetElements.push(sheets[1]);
            } else {
              targetElements.push(...sheets);
            }
          }
        }
      }

      // Global fallback if needed
      if (targetElements.length === 0) {
        if (isDualBoxLayout && canvasBoard) {
          targetElements.push(canvasBoard);
        } else {
          if (pageFilter === 'all' || pageFilter === '1') {
            const el1 = document.getElementById('resume-page-1');
            if (el1) targetElements.push(el1);
          }
          if (settings.showPage2 && (pageFilter === 'all' || pageFilter === '2')) {
            const el2 = document.getElementById('resume-page-2');
            if (el2) targetElements.push(el2);
          }
        }
      }

      const activeName =
        resumeData[language].name.trim().replace(/\s+/g, '_') || 'Resume';
      const isExportingBoard =
        isDualBoxLayout &&
        Boolean(canvasBoard) &&
        targetElements.includes(canvasBoard!);
      const fileName = isExportingBoard
        ? `${activeName}_Dual_Box_Canvas_${language.toUpperCase()}.pdf`
        : `${activeName}_${language.toUpperCase()}.pdf`;

      await exportResumeToPdf(targetElements, {
        fileName,
        isCanvasBoard: isExportingBoard,
        onProgress: (status) => setExportStatus(status),
      });

      setExportStatus('PDF downloaded successfully!');
      setTimeout(() => {
        setExportStatus('');
      }, 3500);
    } catch (error: any) {
      console.error('PDF Export Error:', error);
      setExportError(
        error?.message ||
          'PDF generation failed. You can also click "Print / Vector PDF" to save directly from your browser print dialog.'
      );
      setExportStatus('');
    } finally {
      setIsExporting(false);
    }
  };

  const handlePrint = () => {
    triggerPrintDialog();
  };

  const handleResetData = () => {
    if (
      window.confirm(
        'Reset resume to the original sample content (from the photo)? Any custom edits will be replaced.'
      )
    ) {
      setResumeData(initialResumeData);
      setSettings({
        accentColor: '#2563eb',
        activeLanguage: 'en',
        layoutId: 'modern-tech',
        skillBadgeStyle: 'tinted',
        showPage2: true,
        usePersianNumerals: true,
        showWatermark: true,
      });
    }
  };

  const handleExportJson = () => {
    const dataStr =
      'data:text/json;charset=utf-8,' +
      encodeURIComponent(JSON.stringify({ resumeData, settings }, null, 2));
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute('href', dataStr);
    downloadAnchor.setAttribute('download', 'resume_backup.json');
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
  };

  const handleImportJson = (json: any) => {
    if (json.resumeData) {
      setResumeData(json.resumeData);
    } else if (json.en && json.fa) {
      setResumeData(json);
    }
    if (json.settings) {
      setSettings(json.settings);
    }
  };

  return (
    <div className="min-h-screen bg-slate-100 flex flex-col font-sans overflow-x-hidden">
      {/* Top Application Toolbar */}
      <Toolbar
        language={language}
        onLanguageChange={(lang) => {
          setLanguage(lang);
          setSettings((s) => ({ ...s, activeLanguage: lang }));
        }}
        viewMode={viewMode}
        onViewModeChange={setViewMode}
        settings={settings}
        onSettingsChange={setSettings}
        pageFilter={pageFilter}
        onPageFilterChange={setPageFilter}
        zoom={zoom}
        onZoomChange={setZoom}
        onExportPdf={handleExportPdf}
        onPrint={handlePrint}
        isExporting={isExporting}
        exportStatus={exportStatus}
        exportError={exportError}
        onClearExportError={() => setExportError(null)}
        isEditorOpen={isEditorOpen}
        onToggleEditor={() => setIsEditorOpen(!isEditorOpen)}
        onExportJson={handleExportJson}
        onImportJson={handleImportJson}
        onOpenImportPrompt={() => setIsImportPromptOpen(true)}
        dualBoxExportFormat={dualBoxExportFormat}
        onDualBoxExportFormatChange={setDualBoxExportFormat}
      />

      {/* Main Workspace Layout */}
      <div className="flex-1 flex overflow-hidden relative overflow-x-hidden">
        {/* Editor Sidebar Drawer */}
        {isEditorOpen && (
          <aside className="no-print sticky top-[57px] self-start w-full md:w-[420px] lg:w-[460px] p-4 bg-slate-100/60 border-r border-slate-200/90 h-[calc(100vh-57px)] overflow-y-auto shrink-0 z-20 transition-all duration-300">
            <ResumeEditor
              resumeData={resumeData}
              onChange={setResumeData}
              activeLanguage={language}
              onLanguageChange={(lang) => {
                setLanguage(lang);
                setSettings((s) => ({ ...s, activeLanguage: lang }));
              }}
              onReset={handleResetData}
              settings={settings}
              onSettingsChange={setSettings}
              onOpenImportPrompt={() => setIsImportPromptOpen(true)}
            />
          </aside>
        )}

        {/* Floating toggle button when sidebar is collapsed */}
        {!isEditorOpen && (
          <button
            type="button"
            onClick={() => setIsEditorOpen(true)}
            className="no-print absolute top-4 left-4 z-20 p-2.5 bg-white text-slate-700 hover:text-blue-600 rounded-xl shadow-md border border-slate-200 flex items-center gap-1.5 text-xs font-bold transition-all hover:scale-105"
            title="Open Editor"
          >
            <ChevronRight className="w-4 h-4" />
            <span>Edit Resume</span>
          </button>
        )}

        {/* Resume Preview Stage */}
        <main className="flex-1 h-[calc(100vh-57px)] overflow-y-auto overflow-x-hidden p-4 md:p-8 bg-slate-200/70 flex flex-col items-center">
          {/* Side-by-Side Dual View */}
          {viewMode === 'split' ? (
            <div className="w-full flex flex-col xl:flex-row items-center justify-center gap-10">
              {/* English Version */}
              <div className="flex flex-col items-center">
                <div className="mb-3 px-3 py-1 rounded-full bg-blue-600 text-white text-xs font-bold shadow-xs">
                  English (LTR)
                </div>
                <div
                  style={{
                    transform: `scale(${zoom / 100})`,
                    transformOrigin: 'top center',
                  }}
                  className="transition-transform duration-150"
                >
                  <ResumePreview
                    data={resumeData.en}
                    language="en"
                    settings={settings}
                    pageFilter={pageFilter}
                  />
                </div>
              </div>

              {/* Persian Version */}
              <div className="flex flex-col items-center">
                <div className="mb-3 px-3 py-1 rounded-full bg-emerald-600 text-white text-xs font-bold shadow-xs font-['Vazirmatn']">
                  فارسی (RTL)
                </div>
                <div
                  style={{
                    transform: `scale(${zoom / 100})`,
                    transformOrigin: 'top center',
                  }}
                  className="transition-transform duration-150"
                >
                  <ResumePreview
                    data={resumeData.fa}
                    language="fa"
                    settings={settings}
                    pageFilter={pageFilter}
                  />
                </div>
              </div>
            </div>
          ) : (
            /* Single Language Focused View */
            <div
              style={{
                transform: `scale(${zoom / 100})`,
                transformOrigin: 'top center',
              }}
              className="transition-transform duration-150 py-2"
            >
              <ResumePreview
                data={resumeData[language]}
                language={language}
                settings={settings}
                pageFilter={pageFilter}
              />
            </div>
          )}
        </main>
      </div>

      {/* GitHub AI Prompt & JSON Import Dialog */}
      <ImportPromptModal
        isOpen={isImportPromptOpen}
        onClose={() => setIsImportPromptOpen(false)}
        currentResumeData={resumeData}
        onImportResumeData={(importedData, newSettings) => {
          setResumeData(importedData);
          if (newSettings) {
            setSettings((prev) => ({
              ...prev,
              ...newSettings,
            }));
          }
        }}
        activeLanguage={language}
        settings={settings}
      />
    </div>
  );
}
