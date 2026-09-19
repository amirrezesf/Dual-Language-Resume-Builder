import html2canvas from 'html2canvas-pro';
import { jsPDF } from 'jspdf';
import { normalizeLinkHref } from './linkUtils';

function collectPdfLinkAnnotations(
  element: HTMLElement,
  pdfWidth: number,
  pdfHeight: number
): Array<{ x: number; y: number; w: number; h: number; url: string }> {
  const pageRect = element.getBoundingClientRect();

  if (!pageRect.width || !pageRect.height) {
    return [];
  }

  const annotations: Array<{ x: number; y: number; w: number; h: number; url: string }> = [];

  const anchors = element.querySelectorAll<HTMLAnchorElement>('a[href]');
  anchors.forEach((anchor) => {
    const href = normalizeLinkHref(anchor.getAttribute('href'));
    if (!href) {
      return;
    }

    const rect = anchor.getBoundingClientRect();

    const x = ((rect.left - pageRect.left) / pageRect.width) * pdfWidth;
    const y = ((rect.top - pageRect.top) / pageRect.height) * pdfHeight;
    const w = (rect.width / pageRect.width) * pdfWidth;
    const h = (rect.height / pageRect.height) * pdfHeight;

    if (!Number.isFinite(x) || !Number.isFinite(y) || !Number.isFinite(w) || !Number.isFinite(h)) {
      return;
    }

    annotations.push({ x, y, w, h, url: href });
  });

  return annotations;
}

export interface ExportPdfOptions {
  fileName?: string;
  onProgress?: (status: string) => void;
  isCanvasBoard?: boolean;
  wrapCanvasBackdrop?: boolean;
}

export async function exportResumeToPdf(
  targets: (HTMLElement | string)[],
  options: ExportPdfOptions = {}
): Promise<void> {
  const { fileName = 'resume.pdf', onProgress, isCanvasBoard: forceCanvasBoard } = options;

  try {
    onProgress?.('Preparing document for PDF export...');

    // Ensure all web fonts (Plus Jakarta Sans, Vazirmatn) are completely loaded
    if (document.fonts?.ready) {
      await document.fonts.ready;
    }

    const elements: HTMLElement[] = [];
    for (const target of targets) {
      if (typeof target === 'string') {
        const el = document.getElementById(target);
        if (el) elements.push(el);
      } else if (target && target instanceof HTMLElement) {
        elements.push(target);
      }
    }

    // Fallback: If no elements found by IDs, query all resume sheets in preview
    if (elements.length === 0) {
      const fallbackElements = Array.from(
        document.querySelectorAll<HTMLElement>('.resume-sheet')
      );
      if (fallbackElements.length > 0) {
        elements.push(...fallbackElements);
      } else {
        throw new Error('Resume pages could not be located in preview.');
      }
    }

    let pdf: jsPDF | null = null;

    for (let i = 0; i < elements.length; i++) {
      const element = elements[i];
      const isBoard =
        forceCanvasBoard ||
        element.classList.contains('canvas-board-wrapper') ||
        element.id.includes('canvas-board');

      const isCharcoalBoard =
        isBoard &&
        (element.getAttribute('data-backdrop') === 'charcoal' ||
          element.classList.contains('text-white'));

      onProgress?.(
        isBoard
          ? 'Rendering Dual-Box presentation canvas...'
          : `Rendering page ${i + 1} of ${elements.length}...`
      );

      // Assign a temporary unique marker to the element to accurately identify it in the clone
      const tempMarker = `export-marker-${Date.now()}-${i}`;
      element.setAttribute('data-pdf-export-marker', tempMarker);

      try {
        // High-resolution canvas rendering with html2canvas-pro (full OKLCH & modern CSS support)
        const canvas = await html2canvas(element, {
          scale: isBoard ? 2 : 2.5, // 2x scale for large boards, 2.5x for A4 sheets
          useCORS: true,
          allowTaint: true,
          backgroundColor: isBoard ? (isCharcoalBoard ? '#0f172a' : '#e5ebf2') : '#ffffff',
          logging: false,
          imageTimeout: 15000,
          scrollX: 0,
          scrollY: 0,
          onclone: (clonedDoc) => {
            const clonedEl = clonedDoc.querySelector<HTMLElement>(
              `[data-pdf-export-marker="${tempMarker}"]`
            );
            if (clonedEl) {
              // Reset all ancestor CSS transforms/zoom in the cloned DOM tree
              let parent = clonedEl.parentElement;
              while (parent && parent !== clonedDoc.body) {
                parent.style.transform = 'none';
                (parent.style as any).webkitTransform = 'none';
                (parent.style as any).zoom = '1';
                parent.style.filter = 'none';
                parent = parent.parentElement;
              }

              if (isBoard) {
                // Dual-Box Canvas Board Mode
                // Hide screen-only buttons, switchers, hints
                const noPrintElements = clonedEl.querySelectorAll<HTMLElement>('.no-print');
                noPrintElements.forEach((el) => {
                  el.style.display = 'none';
                });

                // Preserve spread arrangement in cloned canvas
                const spreadMode = clonedEl.getAttribute('data-spread') || 'side-by-side';
                const pagesContainer = clonedEl.querySelector<HTMLElement>('.dual-box-pages-container');
                if (pagesContainer && spreadMode === 'side-by-side') {
                  pagesContainer.style.display = 'flex';
                  pagesContainer.style.flexDirection = 'row';
                  pagesContainer.style.flexWrap = 'nowrap';
                  pagesContainer.style.alignItems = 'flex-start';
                  pagesContainer.style.justifyContent = 'center';
                  pagesContainer.style.gap = '2.5rem';
                  clonedEl.style.width = 'fit-content';
                  clonedEl.style.minWidth = '460mm';
                }

                // Ensure the elevated sheets retain their shadows, borders and rounded corners
                const sheets = clonedEl.querySelectorAll<HTMLElement>('.resume-sheet');
                sheets.forEach((sheet) => {
                  sheet.style.transform = 'none';
                  sheet.style.margin = '0';
                  // Keep box shadow and border radius intact
                });
              } else {
                // Page Mode
                const isDualBoxPage =
                  clonedEl.getAttribute('data-layout-style') === 'dual-box' ||
                  Boolean(clonedEl.closest('.canvas-board-wrapper'));

                clonedEl.style.transform = 'none';
                clonedEl.style.margin = '0';

                if (isDualBoxPage) {
                  // Retain elegant rounded borders and card style for dual-box layout
                  clonedEl.style.borderRadius = '1rem';
                  clonedEl.style.border = '1px solid rgba(203, 213, 225, 0.9)';
                  // Soft card shadow for realistic elevation
                  clonedEl.style.boxShadow =
                    '0 10px 25px -5px rgba(15, 23, 42, 0.1), 0 8px 10px -6px rgba(15, 23, 42, 0.05)';
                } else {
                  // Standard A4 full-bleed: remove screen shadows and outer borders
                  clonedEl.style.boxShadow = 'none';
                  clonedEl.style.border = 'none';
                  clonedEl.style.borderRadius = '0';
                }
              }
            }
          },
        });

        const imgData = canvas.toDataURL('image/jpeg', 0.98);
        const canvasWidth = canvas.width;
        const canvasHeight = canvas.height;
        const aspectRatio = canvasWidth / canvasHeight;

        let pdfWidth: number;
        let pdfHeight: number;
        let orientation: 'landscape' | 'portrait';

        if (isBoard) {
          // Dynamic aspect ratio sizing for Dual-Box Canvas Board
          if (aspectRatio >= 1) {
            // Side-by-side or wide presentation
            orientation = 'landscape';
            pdfHeight = 297; // Standard presentation height in mm
            pdfWidth = Math.round(pdfHeight * aspectRatio);
          } else {
            // Stacked vertical presentation
            orientation = 'portrait';
            pdfWidth = 210;
            pdfHeight = Math.round(pdfWidth / aspectRatio);
          }
        } else {
          // Standard A4 page
          orientation = 'portrait';
          pdfWidth = 210;
          pdfHeight = 297;
        }

        if (!pdf) {
          pdf = new jsPDF({
            orientation,
            unit: 'mm',
            format: [pdfWidth, pdfHeight],
            compress: true,
          });
        } else {
          pdf.addPage([pdfWidth, pdfHeight], orientation);
        }

        pdf.addImage(imgData, 'JPEG', 0, 0, pdfWidth, pdfHeight, undefined, 'FAST');

        const currentPdf = pdf;
        if (!currentPdf) {
          throw new Error('PDF was not initialized before adding link annotations.');
        }

        const linkAnnotations = collectPdfLinkAnnotations(element, pdfWidth, pdfHeight);
        linkAnnotations.forEach(({ x, y, w, h, url }) => {
          // jsPDF link annotations use the page's lower-left origin, while DOM rectangles
          // are measured from the page's top-left. Convert the Y coordinate accordingly.
          const pdfY = pdfHeight - (y + h);
          currentPdf.link(x, pdfY, w, h, { url });
        });
      } finally {
        element.removeAttribute('data-pdf-export-marker');
      }
    }

    if (!pdf) {
      throw new Error('No PDF content could be generated.');
    }

    onProgress?.('Finalizing and saving PDF...');

    // Multi-tier download strategy to guarantee delivery inside browser or sandboxed iframes
    let downloadSucceeded = false;

    // Strategy 1: Standard jsPDF .save()
    try {
      pdf.save(fileName);
      downloadSucceeded = true;
    } catch (saveError) {
      console.warn('Standard pdf.save failed, trying blob download:', saveError);
    }

    // Strategy 2: Blob URL download anchor
    if (!downloadSucceeded) {
      try {
        const blob = pdf.output('blob');
        const blobUrl = URL.createObjectURL(blob);
        const anchor = document.createElement('a');
        anchor.href = blobUrl;
        anchor.download = fileName;
        anchor.target = '_blank';
        anchor.rel = 'noopener noreferrer';
        document.body.appendChild(anchor);
        anchor.click();
        setTimeout(() => {
          anchor.remove();
          URL.revokeObjectURL(blobUrl);
        }, 3000);
        downloadSucceeded = true;
      } catch (blobError) {
        console.warn('Blob URL fallback failed, trying data URI download:', blobError);
      }
    }

    // Strategy 3: Direct Data URI anchor download
    if (!downloadSucceeded) {
      try {
        const dataUri = pdf.output('datauristring');
        const anchor = document.createElement('a');
        anchor.href = dataUri;
        anchor.download = fileName;
        document.body.appendChild(anchor);
        anchor.click();
        setTimeout(() => anchor.remove(), 1500);
        downloadSucceeded = true;
      } catch (dataError) {
        console.error('All download strategies failed:', dataError);
        throw new Error('Unable to trigger PDF download in this browser environment. Please use "Print / Vector PDF".');
      }
    }

    onProgress?.('Done!');
  } catch (error) {
    console.error('Failed to generate PDF:', error);
    throw error;
  }
}

export function triggerPrintDialog(): void {
  window.print();
}
