import React from 'react';
import { ResumeContent, Language, ResumeSettings } from '../types';
import { ModernTechLayout } from './layouts/ModernTechLayout';
import { ExecutiveSidebarLayout } from './layouts/ExecutiveSidebarLayout';
import { ClassicMinimalLayout } from './layouts/ClassicMinimalLayout';
import { CompactSingleLayout } from './layouts/CompactSingleLayout';
import { DualBoxCanvasLayout } from './layouts/DualBoxCanvasLayout';

interface ResumePreviewProps {
  data: ResumeContent;
  language: Language;
  settings: ResumeSettings;
  pageFilter?: 'all' | '1' | '2';
}

export const ResumePreview: React.FC<ResumePreviewProps> = ({
  data,
  language,
  settings,
  pageFilter = 'all',
}) => {
  const isRtl = language === 'fa';
  const layoutId = settings.layoutId || 'modern-tech';

  const renderLayoutContent = () => {
    switch (layoutId) {
      case 'dual-box-board':
        return (
          <DualBoxCanvasLayout
            data={data}
            language={language}
            settings={settings}
            pageFilter={pageFilter}
          />
        );
      case 'executive-sidebar':
        return (
          <ExecutiveSidebarLayout
            data={data}
            language={language}
            settings={settings}
            pageFilter={pageFilter}
          />
        );
      case 'classic-minimal':
        return (
          <ClassicMinimalLayout
            data={data}
            language={language}
            settings={settings}
            pageFilter={pageFilter}
          />
        );
      case 'compact-single':
        return (
          <CompactSingleLayout
            data={data}
            language={language}
            settings={settings}
            pageFilter={pageFilter}
          />
        );
      case 'modern-tech':
      default:
        return (
          <ModernTechLayout
            data={data}
            language={language}
            settings={settings}
            pageFilter={pageFilter}
          />
        );
    }
  };

  return (
    <div
      id={`resume-print-area-${language}`}
      data-resume-lang={language}
      className={`resume-preview-container flex flex-col items-center gap-8 ${
        isRtl ? 'rtl' : 'ltr'
      }`}
      dir={isRtl ? 'rtl' : 'ltr'}
      style={{
        fontFamily: isRtl
          ? "'Vazirmatn', 'Tahoma', 'Segoe UI', sans-serif"
          : "'Plus Jakarta Sans', -apple-system, BlinkMacSystemFont, sans-serif",
      }}
    >
      {renderLayoutContent()}
    </div>
  );
};
