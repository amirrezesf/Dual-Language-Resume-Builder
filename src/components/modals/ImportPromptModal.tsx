import React, { useState, useEffect } from 'react';
import {
  X,
  Github,
  Sparkles,
  Copy,
  Check,
  Upload,
  Download,
  AlertCircle,
  CheckCircle2,
  ExternalLink,
  ArrowRight,
  FileCode2,
  Loader2,
  RefreshCw,
  Code2,
  Languages,
  BookOpen,
} from 'lucide-react';
import { DualResumeData, Language, ResumeSettings } from '../../types';
import {
  buildGitHubResumePrompt,
  fetchGitHubUserData,
  GitHubProfileInfo,
  parseAndValidateResumeJson,
  ParseResult,
} from '../../utils/githubPromptGenerator';

interface ImportPromptModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentResumeData: DualResumeData;
  onImportResumeData: (data: DualResumeData, settings?: Partial<ResumeSettings>) => void;
  activeLanguage: Language;
  settings: ResumeSettings;
}

type ModalTab = 'prompt' | 'import' | 'export';

export const ImportPromptModal: React.FC<ImportPromptModalProps> = ({
  isOpen,
  onClose,
  currentResumeData,
  onImportResumeData,
  activeLanguage,
  settings,
}) => {
  const [activeTab, setActiveTab] = useState<ModalTab>('prompt');

  // GitHub Prompt Generator State
  const [githubInput, setGithubInput] = useState<string>(
    currentResumeData[activeLanguage]?.contact?.github || ''
  );
  const [targetRole, setTargetRole] = useState<string>(
    currentResumeData[activeLanguage]?.roleTitle || 'Full-Stack Software Developer'
  );
  const [languageOption, setLanguageOption] = useState<'dual' | 'en' | 'fa'>('dual');
  const [customNotes, setCustomNotes] = useState<string>('');
  const [isFetchingGithub, setIsFetchingGithub] = useState<boolean>(false);
  const [githubProfile, setGithubProfile] = useState<GitHubProfileInfo | null>(null);
  const [fetchError, setFetchError] = useState<string | null>(null);
  const [copiedPrompt, setCopiedPrompt] = useState<boolean>(false);

  // Import JSON State
  const [jsonText, setJsonText] = useState<string>('');
  const [parseResult, setParseResult] = useState<ParseResult | null>(null);
  const [importSuccess, setImportSuccess] = useState<boolean>(false);

  // Export JSON State
  const [copiedExport, setCopiedExport] = useState<boolean>(false);

  // Update prompt whenever parameters change
  const currentPrompt = buildGitHubResumePrompt({
    githubUsername: githubInput || 'your-github-username',
    targetRole,
    languageOption,
    customNotes,
    githubProfileData: githubProfile,
  });

  // Re-parse when jsonText changes
  useEffect(() => {
    if (!jsonText.trim()) {
      setParseResult(null);
      setImportSuccess(false);
      return;
    }
    const result = parseAndValidateResumeJson(jsonText, currentResumeData, activeLanguage);
    setParseResult(result);
    setImportSuccess(false);
  }, [jsonText, currentResumeData, activeLanguage]);

  if (!isOpen) return null;

  const handleFetchGithub = async () => {
    if (!githubInput.trim()) {
      setFetchError('Please enter a GitHub username or URL first.');
      return;
    }
    try {
      setIsFetchingGithub(true);
      setFetchError(null);
      const profile = await fetchGitHubUserData(githubInput);
      setGithubProfile(profile);
      if (profile.name && !targetRole) {
        setTargetRole('Software Engineer');
      }
    } catch (err: any) {
      setFetchError(err.message || 'Failed to fetch GitHub profile.');
    } finally {
      setIsFetchingGithub(false);
    }
  };

  const handleCopyPrompt = async () => {
    try {
      await navigator.clipboard.writeText(currentPrompt);
      setCopiedPrompt(true);
      setTimeout(() => setCopiedPrompt(false), 2200);
    } catch (err) {
      console.error('Clipboard copy failed', err);
    }
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (event) => {
      const content = event.target?.result as string;
      setJsonText(content);
    };
    reader.readAsText(file);
    e.target.value = '';
  };

  const handleApplyImport = () => {
    if (!parseResult || !parseResult.valid || !parseResult.resumeData) return;
    onImportResumeData(parseResult.resumeData, parseResult.settings);
    setImportSuccess(true);
    setTimeout(() => {
      onClose();
    }, 1200);
  };

  const handleLoadSampleJson = () => {
    setJsonText(JSON.stringify({ resumeData: currentResumeData, settings }, null, 2));
  };

  const handleExportDownload = () => {
    const dataStr =
      'data:text/json;charset=utf-8,' +
      encodeURIComponent(JSON.stringify({ resumeData: currentResumeData, settings }, null, 2));
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute('href', dataStr);
    downloadAnchor.setAttribute(
      'download',
      `${(currentResumeData.en.name || 'resume').replace(/\s+/g, '_')}_backup.json`
    );
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
  };

  const handleCopyExportJson = async () => {
    try {
      const exportString = JSON.stringify({ resumeData: currentResumeData, settings }, null, 2);
      await navigator.clipboard.writeText(exportString);
      setCopiedExport(true);
      setTimeout(() => setCopiedExport(false), 2200);
    } catch (err) {
      console.error('Failed to copy JSON export', err);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-900/60 backdrop-blur-xs animate-in fade-in duration-200">
      <div
        className="bg-white w-full max-w-4xl max-h-[92vh] rounded-2xl shadow-2xl border border-slate-200 flex flex-col overflow-hidden text-slate-900"
        role="dialog"
        aria-modal="true"
      >
        {/* Modal Header */}
        <div className="px-5 py-3.5 bg-slate-50 border-b border-slate-200 flex items-center justify-between shrink-0">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xl bg-blue-600 text-white flex items-center justify-center shadow-xs">
              <Github className="w-4 h-4" />
            </div>
            <div>
              <h2 className="text-sm sm:text-base font-bold text-slate-900 leading-tight flex items-center gap-2">
                <span>GitHub Prompt & JSON Importer</span>
                <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-blue-100 text-blue-800">
                  AI Ready
                </span>
              </h2>
              <p className="text-[11.5px] text-slate-500">
                Transform any GitHub profile into compliant resume JSON, or import existing files.
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-200/60 transition-colors"
            title="Close dialog"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tab Navigation */}
        <div className="flex border-b border-slate-200 bg-slate-100/70 px-4 pt-2 gap-2 text-xs font-semibold shrink-0">
          <button
            type="button"
            onClick={() => setActiveTab('prompt')}
            className={`px-3.5 py-2 rounded-t-xl flex items-center gap-1.5 transition-all border-t border-x ${
              activeTab === 'prompt'
                ? 'bg-white text-blue-600 border-slate-200 shadow-2xs'
                : 'bg-transparent text-slate-600 border-transparent hover:text-slate-900 hover:bg-slate-200/50'
            }`}
          >
            <Sparkles className="w-3.5 h-3.5 text-blue-600" />
            <span>1. GitHub AI Prompt</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('import')}
            className={`px-3.5 py-2 rounded-t-xl flex items-center gap-1.5 transition-all border-t border-x relative ${
              activeTab === 'import'
                ? 'bg-white text-blue-600 border-slate-200 shadow-2xs'
                : 'bg-transparent text-slate-600 border-transparent hover:text-slate-900 hover:bg-slate-200/50'
            }`}
          >
            <Upload className="w-3.5 h-3.5 text-emerald-600" />
            <span>2. Import JSON</span>
            {parseResult?.valid && (
              <span className="w-2 h-2 rounded-full bg-emerald-500" />
            )}
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('export')}
            className={`px-3.5 py-2 rounded-t-xl flex items-center gap-1.5 transition-all border-t border-x ${
              activeTab === 'export'
                ? 'bg-white text-blue-600 border-slate-200 shadow-2xs'
                : 'bg-transparent text-slate-600 border-transparent hover:text-slate-900 hover:bg-slate-200/50'
            }`}
          >
            <Download className="w-3.5 h-3.5 text-slate-500" />
            <span>3. Export & Backup</span>
          </button>
        </div>

        {/* Modal Body */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-4">
          {/* ========================================================================= */}
          {/* TAB 1: GITHUB PROMPT GENERATOR */}
          {/* ========================================================================= */}
          {activeTab === 'prompt' && (
            <div className="space-y-4">
              {/* Step indicator workflow banner */}
              <div className="bg-blue-50/80 border border-blue-200/80 rounded-xl p-3 flex items-start gap-3 text-xs text-blue-900">
                <div className="w-6 h-6 rounded-lg bg-blue-600 text-white flex items-center justify-center shrink-0 font-bold text-xs">
                  1
                </div>
                <div className="space-y-0.5">
                  <span className="font-bold">How it works:</span>
                  <p className="text-[11.5px] text-blue-800 leading-relaxed">
                    Enter your GitHub username below. We generate a specialized prompt with your profile info and strict schema.
                    Copy it, paste it into any AI (ChatGPT, Gemini, Claude), then paste the JSON response into the{' '}
                    <button
                      type="button"
                      onClick={() => setActiveTab('import')}
                      className="font-bold underline hover:text-blue-950"
                    >
                      Import JSON tab
                    </button>.
                  </p>
                </div>
              </div>

              {/* Input Form Fields */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-3 p-3.5 bg-slate-50 rounded-xl border border-slate-200">
                {/* GitHub Username Input */}
                <div className="space-y-1">
                  <label className="block text-[11px] font-bold text-slate-700 uppercase tracking-wider">
                    GitHub Username or Profile URL
                  </label>
                  <div className="flex items-center gap-1.5">
                    <div className="relative flex-1">
                      <div className="absolute inset-y-0 left-0 pl-2.5 flex items-center pointer-events-none text-slate-400">
                        <Github className="w-4 h-4" />
                      </div>
                      <input
                        type="text"
                        value={githubInput}
                        onChange={(e) => setGithubInput(e.target.value)}
                        placeholder="e.g. amirrezesf or torvalds"
                        className="w-full pl-8 pr-3 py-1.5 bg-white border border-slate-300 rounded-lg text-xs font-medium focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-hidden"
                      />
                    </div>
                    <button
                      type="button"
                      onClick={handleFetchGithub}
                      disabled={isFetchingGithub}
                      className="px-2.5 py-1.5 rounded-lg bg-slate-900 hover:bg-slate-800 text-white text-xs font-semibold flex items-center gap-1 shrink-0 transition-colors disabled:opacity-50"
                      title="Fetch public profile and repositories"
                    >
                      {isFetchingGithub ? (
                        <Loader2 className="w-3.5 h-3.5 animate-spin" />
                      ) : (
                        <RefreshCw className="w-3.5 h-3.5" />
                      )}
                      <span className="hidden sm:inline">Fetch</span>
                    </button>
                  </div>
                </div>

                {/* Target Role */}
                <div className="space-y-1">
                  <label className="block text-[11px] font-bold text-slate-700 uppercase tracking-wider">
                    Target Job Title / Role
                  </label>
                  <input
                    type="text"
                    value={targetRole}
                    onChange={(e) => setTargetRole(e.target.value)}
                    placeholder="e.g. Full-Stack Developer, DevOps Engineer"
                    className="w-full px-3 py-1.5 bg-white border border-slate-300 rounded-lg text-xs font-medium focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-hidden"
                  />
                </div>

                {/* Language Requirement */}
                <div className="space-y-1">
                  <label className="block text-[11px] font-bold text-slate-700 uppercase tracking-wider">
                    Resume Output Language
                  </label>
                  <div className="flex items-center gap-1 bg-white p-1 rounded-lg border border-slate-300 text-xs">
                    <button
                      type="button"
                      onClick={() => setLanguageOption('dual')}
                      className={`flex-1 py-1 rounded-md text-center font-semibold transition-all ${
                        languageOption === 'dual'
                          ? 'bg-blue-600 text-white shadow-2xs'
                          : 'text-slate-600 hover:text-slate-900'
                      }`}
                    >
                      Dual (EN + FA)
                    </button>
                    <button
                      type="button"
                      onClick={() => setLanguageOption('en')}
                      className={`flex-1 py-1 rounded-md text-center font-semibold transition-all ${
                        languageOption === 'en'
                          ? 'bg-blue-600 text-white shadow-2xs'
                          : 'text-slate-600 hover:text-slate-900'
                      }`}
                    >
                      English
                    </button>
                    <button
                      type="button"
                      onClick={() => setLanguageOption('fa')}
                      className={`flex-1 py-1 rounded-md text-center font-semibold transition-all font-['Vazirmatn'] ${
                        languageOption === 'fa'
                          ? 'bg-blue-600 text-white shadow-2xs'
                          : 'text-slate-600 hover:text-slate-900'
                      }`}
                    >
                      فارسی
                    </button>
                  </div>
                </div>

                {/* Additional Candidate Context (Span 3) */}
                <div className="md:col-span-3 space-y-1">
                  <label className="block text-[11px] font-bold text-slate-700 uppercase tracking-wider flex items-center justify-between">
                    <span>Additional Context (Optional — Education, Phone, Past Companies)</span>
                    <span className="text-[10px] text-slate-500 font-normal">
                      Appended into the prompt to enrich non-GitHub items
                    </span>
                  </label>
                  <textarea
                    rows={2}
                    value={customNotes}
                    onChange={(e) => setCustomNotes(e.target.value)}
                    placeholder="e.g.: Phone: +1 234 567 8900, Education: B.Sc. Computer Science from MIT (2018-2022), Previously worked at Acme Corp as Backend Intern."
                    className="w-full px-3 py-1.5 bg-white border border-slate-300 rounded-lg text-xs font-normal focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-hidden"
                  />
                </div>
              </div>

              {/* GitHub Fetch Status Banner */}
              {fetchError && (
                <div className="p-2.5 rounded-xl bg-amber-50 border border-amber-200 text-amber-900 text-xs flex items-center gap-2">
                  <AlertCircle className="w-4 h-4 text-amber-600 shrink-0" />
                  <span>{fetchError}</span>
                </div>
              )}

              {githubProfile && (
                <div className="p-3 bg-emerald-50/70 border border-emerald-200/80 rounded-xl flex flex-wrap items-center justify-between gap-3 text-xs">
                  <div className="flex items-center gap-3">
                    {githubProfile.avatar_url && (
                      <img
                        src={githubProfile.avatar_url}
                        alt={githubProfile.username}
                        className="w-9 h-9 rounded-full border border-emerald-300 shadow-2xs shrink-0"
                      />
                    )}
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-slate-900">
                          {githubProfile.name || githubProfile.username}
                        </span>
                        <span className="text-slate-500 text-[11px]">
                          (@{githubProfile.username})
                        </span>
                      </div>
                      <p className="text-[11px] text-slate-600 line-clamp-1">
                        {githubProfile.bio || 'Public GitHub profile loaded'}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 text-[11px] text-emerald-800 font-medium">
                    <span className="px-2 py-0.5 bg-white rounded-md border border-emerald-200">
                      ⭐ {githubProfile.repos.reduce((acc, r) => acc + r.stars, 0)} Stars
                    </span>
                    <span className="px-2 py-0.5 bg-white rounded-md border border-emerald-200">
                      📦 {githubProfile.repos.length} Repositories Ready
                    </span>
                  </div>
                </div>
              )}

              {/* Generated Prompt Code Container */}
              <div className="space-y-1.5">
                <div className="flex items-center justify-between">
                  <label className="text-xs font-bold text-slate-800 flex items-center gap-1.5">
                    <Code2 className="w-3.5 h-3.5 text-blue-600" />
                    <span>Generated AI Prompt (Ready to Copy):</span>
                  </label>

                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      onClick={handleCopyPrompt}
                      className={`px-3 py-1.5 rounded-lg text-xs font-bold flex items-center gap-1.5 shadow-2xs transition-all ${
                        copiedPrompt
                          ? 'bg-emerald-600 text-white scale-102'
                          : 'bg-blue-600 hover:bg-blue-700 text-white'
                      }`}
                    >
                      {copiedPrompt ? (
                        <>
                          <Check className="w-3.5 h-3.5 stroke-[3]" />
                          <span>Copied to Clipboard!</span>
                        </>
                      ) : (
                        <>
                          <Copy className="w-3.5 h-3.5" />
                          <span>Copy Prompt</span>
                        </>
                      )}
                    </button>
                  </div>
                </div>

                <div className="relative">
                  <textarea
                    readOnly
                    rows={10}
                    value={currentPrompt}
                    className="w-full p-3 font-mono text-[11px] leading-relaxed bg-slate-900 text-slate-100 rounded-xl border border-slate-800 focus:outline-hidden select-all"
                  />
                  <span className="absolute bottom-3 right-3 text-[10px] text-slate-400 bg-slate-800/80 px-2 py-0.5 rounded border border-slate-700">
                    {currentPrompt.length} chars
                  </span>
                </div>
              </div>

              {/* Quick AI Launch Links & Next Step */}
              <div className="flex flex-wrap items-center justify-between gap-3 pt-2 border-t border-slate-200">
                <div className="flex items-center gap-2 text-xs text-slate-500">
                  <span className="font-semibold">Paste directly into:</span>
                  <a
                    href="https://chatgpt.com"
                    target="_blank"
                    rel="noreferrer"
                    className="px-2 py-1 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-md font-medium inline-flex items-center gap-1 text-[11px]"
                  >
                    ChatGPT <ExternalLink className="w-2.5 h-2.5" />
                  </a>
                  <a
                    href="https://gemini.google.com"
                    target="_blank"
                    rel="noreferrer"
                    className="px-2 py-1 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-md font-medium inline-flex items-center gap-1 text-[11px]"
                  >
                    Gemini <ExternalLink className="w-2.5 h-2.5" />
                  </a>
                  <a
                    href="https://claude.ai"
                    target="_blank"
                    rel="noreferrer"
                    className="px-2 py-1 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-md font-medium inline-flex items-center gap-1 text-[11px]"
                  >
                    Claude <ExternalLink className="w-2.5 h-2.5" />
                  </a>
                </div>

                <button
                  type="button"
                  onClick={() => setActiveTab('import')}
                  className="px-3.5 py-1.5 bg-slate-900 hover:bg-slate-800 text-white rounded-xl text-xs font-bold flex items-center gap-1.5 transition-colors"
                >
                  <span>Go to Import JSON</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          )}

          {/* ========================================================================= */}
          {/* TAB 2: IMPORT JSON */}
          {/* ========================================================================= */}
          {activeTab === 'import' && (
            <div className="space-y-4">
              {/* File Upload Dropzone + Quick Load Sample */}
              <div className="flex flex-wrap items-center justify-between gap-2 p-3 bg-slate-50 rounded-xl border border-slate-200 text-xs">
                <div className="flex items-center gap-2">
                  <label className="px-3 py-1.5 bg-white hover:bg-slate-100 border border-slate-300 rounded-lg font-semibold text-slate-700 cursor-pointer flex items-center gap-1.5 shadow-2xs transition-colors">
                    <Upload className="w-3.5 h-3.5 text-blue-600" />
                    <span>Upload .JSON File</span>
                    <input
                      type="file"
                      accept=".json,application/json"
                      onChange={handleFileUpload}
                      className="hidden"
                    />
                  </label>
                  <span className="text-slate-400">or paste JSON directly below</span>
                </div>

                <button
                  type="button"
                  onClick={handleLoadSampleJson}
                  className="px-2.5 py-1 text-slate-600 hover:text-slate-900 hover:bg-slate-200/60 rounded-md text-[11px] font-medium"
                  title="Populate with the current resume data structure as reference"
                >
                  Load Current Template
                </button>
              </div>

              {/* JSON Editor Textarea */}
              <div className="space-y-1.5">
                <div className="flex items-center justify-between">
                  <label className="text-xs font-bold text-slate-800 flex items-center gap-1.5">
                    <FileCode2 className="w-3.5 h-3.5 text-emerald-600" />
                    <span>Paste Resume JSON (Raw or Markdown Code Block):</span>
                  </label>

                  {jsonText && (
                    <button
                      type="button"
                      onClick={() => setJsonText('')}
                      className="text-[11px] text-slate-400 hover:text-red-600"
                    >
                      Clear
                    </button>
                  )}
                </div>

                <textarea
                  rows={10}
                  value={jsonText}
                  onChange={(e) => setJsonText(e.target.value)}
                  placeholder={`Paste the JSON returned by AI or backup here, e.g.:\n{\n  "en": {\n    "name": "Alex Smith",\n    "roleTitle": "Software Engineer",\n    ...\n  }\n}`}
                  className="w-full p-3 font-mono text-[11.5px] leading-relaxed bg-slate-950 text-emerald-300 rounded-xl border border-slate-800 focus:outline-hidden focus:ring-2 focus:ring-emerald-500/50"
                />
              </div>

              {/* Validation Status Card */}
              {parseResult && (
                <div>
                  {parseResult.valid ? (
                    <div className="p-3.5 bg-emerald-50 border border-emerald-200 rounded-xl space-y-2">
                      <div className="flex items-center gap-2 text-emerald-800 font-bold text-xs">
                        <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                        <span>Valid Resume JSON Detected!</span>
                      </div>

                      {parseResult.summary && (
                        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-[11px] pt-1">
                          <div className="bg-white/80 p-2 rounded-lg border border-emerald-100">
                            <span className="text-slate-500 block">Candidate:</span>
                            <span className="font-bold text-slate-800 truncate block">
                              {parseResult.summary.enName || parseResult.summary.faName || 'Loaded'}
                            </span>
                          </div>
                          <div className="bg-white/80 p-2 rounded-lg border border-emerald-100">
                            <span className="text-slate-500 block">Experiences:</span>
                            <span className="font-bold text-slate-800">
                              {parseResult.summary.expCount} entries
                            </span>
                          </div>
                          <div className="bg-white/80 p-2 rounded-lg border border-emerald-100">
                            <span className="text-slate-500 block">Projects:</span>
                            <span className="font-bold text-slate-800">
                              {parseResult.summary.projCount} repos/projects
                            </span>
                          </div>
                          <div className="bg-white/80 p-2 rounded-lg border border-emerald-100">
                            <span className="text-slate-500 block">Skills Total:</span>
                            <span className="font-bold text-slate-800">
                              {parseResult.summary.skillsCount} skills
                            </span>
                          </div>
                        </div>
                      )}
                    </div>
                  ) : (
                    <div className="p-3 bg-red-50 border border-red-200 rounded-xl text-xs space-y-1">
                      <div className="flex items-center gap-2 text-red-800 font-bold">
                        <AlertCircle className="w-4 h-4 text-red-600 shrink-0" />
                        <span>Unable to Parse Resume JSON:</span>
                      </div>
                      <ul className="text-[11.5px] text-red-700 list-disc list-inside space-y-0.5 pl-1">
                        {parseResult.errors.map((err, idx) => (
                          <li key={idx}>{err}</li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              )}

              {/* Success Toast Confirmation */}
              {importSuccess && (
                <div className="p-3 bg-emerald-600 text-white rounded-xl text-xs font-bold flex items-center justify-center gap-2 shadow-md animate-in fade-in">
                  <Check className="w-4 h-4 stroke-[3]" />
                  <span>Resume data successfully imported and applied!</span>
                </div>
              )}

              {/* Action Buttons */}
              <div className="flex items-center justify-end gap-3 pt-2 border-t border-slate-200">
                <button
                  type="button"
                  onClick={onClose}
                  className="px-4 py-2 rounded-xl text-xs font-semibold text-slate-600 hover:bg-slate-100 transition-colors"
                >
                  Cancel
                </button>

                <button
                  type="button"
                  onClick={handleApplyImport}
                  disabled={!parseResult?.valid}
                  className="px-5 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 active:scale-98 text-white text-xs font-bold flex items-center gap-1.5 shadow-xs transition-all disabled:opacity-40 disabled:cursor-not-allowed"
                >
                  <Check className="w-4 h-4 stroke-[3]" />
                  <span>Apply & Import Resume Data</span>
                </button>
              </div>
            </div>
          )}

          {/* ========================================================================= */}
          {/* TAB 3: EXPORT & BACKUP */}
          {/* ========================================================================= */}
          {activeTab === 'export' && (
            <div className="space-y-4">
              <div className="bg-slate-50 border border-slate-200 rounded-xl p-3.5 text-xs text-slate-600 space-y-2">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-slate-800 text-sm">
                    Export Current Resume Data
                  </span>
                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      onClick={handleCopyExportJson}
                      className="px-2.5 py-1.5 rounded-lg bg-white border border-slate-300 hover:bg-slate-50 text-slate-700 font-semibold flex items-center gap-1.5 shadow-2xs text-xs transition-colors"
                    >
                      {copiedExport ? (
                        <>
                          <Check className="w-3.5 h-3.5 text-emerald-600" />
                          <span className="text-emerald-700">Copied!</span>
                        </>
                      ) : (
                        <>
                          <Copy className="w-3.5 h-3.5 text-slate-500" />
                          <span>Copy JSON</span>
                        </>
                      )}
                    </button>

                    <button
                      type="button"
                      onClick={handleExportDownload}
                      className="px-3 py-1.5 rounded-lg bg-blue-600 hover:bg-blue-700 text-white font-bold flex items-center gap-1.5 shadow-xs text-xs transition-colors"
                    >
                      <Download className="w-3.5 h-3.5" />
                      <span>Download .JSON</span>
                    </button>
                  </div>
                </div>
                <p className="text-[11.5px]">
                  You can back up all English and Persian resume content, plus active layout and color preferences, as a single reusable file.
                </p>
              </div>

              <div className="space-y-1">
                <span className="text-xs font-bold text-slate-700">
                  Data Preview:
                </span>
                <textarea
                  readOnly
                  rows={10}
                  value={JSON.stringify({ resumeData: currentResumeData, settings }, null, 2)}
                  className="w-full p-3 font-mono text-[11px] leading-relaxed bg-slate-900 text-slate-200 rounded-xl border border-slate-800 select-all"
                />
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
