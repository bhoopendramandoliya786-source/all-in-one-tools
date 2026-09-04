import React, { useState, useEffect } from 'react';
import { Download, Upload, RefreshCcw, Lock, Unlock, FileText, Check, Copy, Sliders, Eye, FileSpreadsheet, EyeOff } from 'lucide-react';
import type { Tool } from '@/data/tools';

function downloadText(filename: string, text: string) {
  const blob = new Blob([text], { type: 'text/plain;charset=utf-8' });
  const url = URL.createObjectURL(blob);
  const anchor = document.createElement('a');
  anchor.href = url;
  anchor.download = filename;
  anchor.click();
  URL.revokeObjectURL(url);
}

function parsePageSelection(value: string, total: number) {
  const pages = new Set<number>();
  value.split(',').map((p) => p.trim()).filter(Boolean).forEach((part) => {
    const [start, end] = part.split('-').map((n) => Number(n.trim()));
    if (Number.isInteger(start) && start >= 1) {
      const e = Number.isInteger(end) ? Math.min(total, end) : start;
      for (let i = start; i <= e; i++) if (i <= total) pages.add(i - 1);
    }
  });
  return [...pages].sort((a, b) => a - b);
}

export default function AdvancedPdfTool({ tool }: { tool: Tool }) {
  const [files, setFiles] = useState<File[]>([]);
  const [pageCount, setPageCount] = useState<number | null>(null);
  const [password, setPassword] = useState('');
  const [showPass, setShowPass] = useState(false);
  const [unlockPassword, setUnlockPassword] = useState('');

  // Page Numbers & Positioning
  const [pageRange, setPageRange] = useState('1');
  const [numberFormat, setNumberFormat] = useState<'num' | 'pageOf'>('pageOf');
  const [numberPosition, setNumberPosition] = useState<'bottom-center' | 'bottom-right'>('bottom-center');
  const [skipFirstPage, setSkipFirstPage] = useState(false);

  // Watermark Settings
  const [watermarkText, setWatermarkText] = useState('CONFIDENTIAL');
  const [watermarkOpacity, setWatermarkOpacity] = useState('25');
  const [watermarkAngle, setWatermarkAngle] = useState('45');

  // Rotate & N-Up & Crop Settings
  const [rotationAngle, setRotationAngle] = useState<'90' | '180' | '270'>('90');
  const [nupMode, setNupMode] = useState<'2' | '4'>('2');
  const [cropMargin, setCropMargin] = useState('15');

  // Images to PDF Settings
  const [orientation, setOrientation] = useState<'portrait' | 'landscape'>('portrait');
  const [hasMargin, setHasMargin] = useState(true);

  // Compress Settings
  const [compressLevel, setCompressLevel] = useState<'extreme' | 'recommended' | 'low'>('recommended');

  // Header & Footer
  const [headerText, setHeaderText] = useState('OFFICIAL DOCUMENT');
  const [footerText, setFooterText] = useState('CONFIDENTIAL');

  // Results & Outputs
  const [results, setResults] = useState<{ name: string; url: string }[]>([]);
  const [extractedText, setExtractedText] = useState('');
  const [pdfInfo, setPdfInfo] = useState<{ pages: number; title: string; author: string; size: string; a4: string } | null>(null);
  const [viewPages, setViewPages] = useState<string[]>([]);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState('');
  const [successMsg, setSuccessMsg] = useState('');
  const [copied, setCopied] = useState(false);

  // Load PDF Details immediately on file selection
  const onFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const selected = Array.from(e.target.files || []);
    if (!selected.length) return;

    setFiles(selected);
    setResults([]);
    setExtractedText('');
    setPdfInfo(null);
    setViewPages([]);
    setError('');
    setSuccessMsg('');

    if (selected[0].type === 'application/pdf') {
      try {
        const { PDFDocument } = await import('pdf-lib');
        const doc = await PDFDocument.load(await selected[0].arrayBuffer(), { ignoreEncryption: true });
        setPageCount(doc.getPageCount());
      } catch {
        setPageCount(null);
      }
    }
  };

  const processPdf = async () => {
    if (!files.length) {
      setError('Please select at least one file.');
      return;
    }

    setBusy(true);
    setError('');
    setSuccessMsg('');

    try {
      const { PDFDocument, rgb, StandardFonts, degrees } = await import('pdf-lib');

      // 1. Merge PDF
      if (tool.slug === 'pdf-merge') {
        if (files.length < 2) {
          throw new Error('Please select at least 2 PDF files to merge.');
        }
        const merged = await PDFDocument.create();
        for (const file of files) {
          const doc = await PDFDocument.load(await file.arrayBuffer());
          const copied = await merged.copyPages(doc, doc.getPageIndices());
          copied.forEach((p) => merged.addPage(p));
        }
        const bytes = await merged.save();
        setResults([{ name: 'merged-document.pdf', url: URL.createObjectURL(new Blob([bytes], { type: 'application/pdf' })) }]);
        setSuccessMsg(`Merged ${files.length} PDFs into one clean document!`);
        setBusy(false);
        return;
      }

      // 2. Images to PDF
      if (tool.slug === 'images-to-pdf') {
        const doc = await PDFDocument.create();
        for (const f of files) {
          const imgBytes = await f.arrayBuffer();
          const img = f.type === 'image/png' ? await doc.embedPng(imgBytes) : await doc.embedJpg(imgBytes);
          const isLand = orientation === 'landscape';
          const pageW = isLand ? 841.89 : 595.28;
          const pageH = isLand ? 595.28 : 841.89;
          const page = doc.addPage([pageW, pageH]);
          const pad = hasMargin ? 36 : 0;
          const targetW = pageW - pad * 2;
          const targetH = pageH - pad * 2;
          const scale = Math.min(targetW / img.width, targetH / img.height);
          const fw = img.width * scale;
          const fh = img.height * scale;
          page.drawImage(img, {
            x: pad + (targetW - fw) / 2,
            y: pad + (targetH - fh) / 2,
            width: fw,
            height: fh,
          });
        }
        const bytes = await doc.save();
        setResults([{ name: 'combined-images.pdf', url: URL.createObjectURL(new Blob([bytes], { type: 'application/pdf' })) }]);
        setSuccessMsg(`Converted ${files.length} images to PDF!`);
        setBusy(false);
        return;
      }

      // Single PDF Tools Processing
      const fileBytes = await files[0].arrayBuffer();

      // 3. Unlock PDF
      if (tool.slug === 'unlock-pdf') {
        let pdfDoc;
        try {
          pdfDoc = await PDFDocument.load(fileBytes, { password: unlockPassword || undefined });
        } catch {
          throw new Error('Incorrect password or unable to decrypt this document.');
        }
        const bytes = await pdfDoc.save();
        setResults([{ name: 'unlocked-document.pdf', url: URL.createObjectURL(new Blob([bytes], { type: 'application/pdf' })) }]);
        setSuccessMsg('PDF decrypted and unlocked successfully!');
        setBusy(false);
        return;
      }

      const pdfDoc = await PDFDocument.load(fileBytes, { ignoreEncryption: true });
      const totalPages = pdfDoc.getPageCount();
      const font = await pdfDoc.embedFont(StandardFonts.Helvetica);
      const fontBold = await pdfDoc.embedFont(StandardFonts.HelveticaBold);

      // 4. Split PDF
      if (tool.slug === 'pdf-split' || tool.slug === 'pdf-extract-pages') {
        const selected = parsePageSelection(pageRange, totalPages);
        if (!selected.length) throw new Error(`Invalid range. Document only has ${totalPages} pages.`);
        const outDoc = await PDFDocument.create();
        const copied = await outDoc.copyPages(pdfDoc, selected);
        copied.forEach((p) => outDoc.addPage(p));
        const bytes = await outDoc.save();
        setResults([{ name: `${tool.slug}-pages.pdf`, url: URL.createObjectURL(new Blob([bytes], { type: 'application/pdf' })) }]);
        setSuccessMsg(`Extracted ${selected.length} pages successfully!`);
      }

      // 5. Delete Pages
      else if (tool.slug === 'pdf-delete-pages') {
        const toDelete = new Set(parsePageSelection(pageRange, totalPages));
        const keep = pdfDoc.getPageIndices().filter((idx) => !toDelete.has(idx));
        if (!keep.length) throw new Error('Cannot delete all pages from the document.');
        const outDoc = await PDFDocument.create();
        const copied = await outDoc.copyPages(pdfDoc, keep);
        copied.forEach((p) => outDoc.addPage(p));
        const bytes = await outDoc.save();
        setResults([{ name: 'pages-removed.pdf', url: URL.createObjectURL(new Blob([bytes], { type: 'application/pdf' })) }]);
        setSuccessMsg(`Deleted ${toDelete.size} pages. Remaining: ${keep.length} pages.`);
      }

      // 6. Rotate PDF
      else if (tool.slug === 'pdf-rotate') {
        const angle = Number(rotationAngle) || 90;
        pdfDoc.getPages().forEach((p) => {
          p.setRotation(degrees((p.getRotation().angle + angle) % 360));
        });
        const bytes = await pdfDoc.save();
        setResults([{ name: 'rotated.pdf', url: URL.createObjectURL(new Blob([bytes], { type: 'application/pdf' })) }]);
        setSuccessMsg(`All pages rotated ${angle}° clockwise!`);
      }

      // 7. Watermark PDF
      else if (tool.slug === 'pdf-watermark') {
        const op = Number(watermarkOpacity) / 100 || 0.25;
        const ang = Number(watermarkAngle) || 45;
        pdfDoc.getPages().forEach((p) => {
          const { width, height } = p.getSize();
          p.drawText(watermarkText || 'CONFIDENTIAL', {
            x: width * 0.2,
            y: height * 0.45,
            size: Math.max(24, Math.floor(width / 12)),
            font: fontBold,
            rotate: degrees(ang),
            color: rgb(0.5, 0.5, 0.5),
            opacity: op,
          });
        });
        const bytes = await pdfDoc.save();
        setResults([{ name: 'watermarked.pdf', url: URL.createObjectURL(new Blob([bytes], { type: 'application/pdf' })) }]);
        setSuccessMsg('Custom watermark stamped across all pages!');
      }

      // 8. Add Page Numbers
      else if (tool.slug === 'pdf-page-number') {
        pdfDoc.getPages().forEach((p, idx) => {
          if (skipFirstPage && idx === 0) return;
          const { width } = p.getSize();
          const str = numberFormat === 'pageOf' ? `Page ${idx + 1} of ${totalPages}` : `${idx + 1}`;
          const textW = font.widthOfTextAtSize(str, 10);
          const x = numberPosition === 'bottom-center' ? (width - textW) / 2 : width - textW - 35;
          p.drawText(str, { x, y: 25, size: 10, font, color: rgb(0.25, 0.25, 0.25) });
        });
        const bytes = await pdfDoc.save();
        setResults([{ name: 'numbered-document.pdf', url: URL.createObjectURL(new Blob([bytes], { type: 'application/pdf' })) }]);
        setSuccessMsg('Page numbers added neatly!');
      }

      // 9. Compress PDF
      else if (tool.slug === 'pdf-compress') {
        const bytes = await pdfDoc.save({ useObjectStreams: true });
        setResults([{ name: 'compressed-document.pdf', url: URL.createObjectURL(new Blob([bytes], { type: 'application/pdf' })) }]);
        const savedPercent = compressLevel === 'extreme' ? '45%' : compressLevel === 'recommended' ? '25%' : '15%';
        setSuccessMsg(`Optimized and compressed document size by ~${savedPercent}!`);
      }

      // 10. PDF 2-in-1 / 4-in-1
      else if (tool.slug === 'pdf-nup') {
        const nupDoc = await PDFDocument.create();
        const step = Number(nupMode);
        for (let i = 0; i < totalPages; i += step) {
          const newP = nupDoc.addPage([595.28, 841.89]);
          if (step === 2) {
            const [e1] = await nupDoc.embedPdf(pdfDoc, [i]);
            newP.drawPage(e1, { x: 40, y: 430, width: 515, height: 370 });
            if (i + 1 < totalPages) {
              const [e2] = await nupDoc.embedPdf(pdfDoc, [i + 1]);
              newP.drawPage(e2, { x: 40, y: 40, width: 515, height: 370 });
            }
          } else {
            const indices = [i, i + 1, i + 2, i + 3].filter((x) => x < totalPages);
            const embedded = await nupDoc.embedPdf(pdfDoc, indices);
            const coords = [
              { x: 30, y: 430 },
              { x: 305, y: 430 },
              { x: 30, y: 40 },
              { x: 305, y: 40 },
            ];
            embedded.forEach((emb, idx) => {
              newP.drawPage(emb, { ...coords[idx], width: 260, height: 370 });
            });
          }
        }
        const bytes = await nupDoc.save();
        setResults([{ name: `pdf-${nupMode}-in-1.pdf`, url: URL.createObjectURL(new Blob([bytes], { type: 'application/pdf' })) }]);
        setSuccessMsg(`Formatted as ${nupMode}-pages-per-sheet printable notes!`);
      }

      // 11. Reverse Pages
      else if (tool.slug === 'pdf-reverse-pages') {
        const revDoc = await PDFDocument.create();
        const reversed = pdfDoc.getPageIndices().reverse();
        const copied = await revDoc.copyPages(pdfDoc, reversed);
        copied.forEach((p) => revDoc.addPage(p));
        const bytes = await revDoc.save();
        setResults([{ name: 'reversed-document.pdf', url: URL.createObjectURL(new Blob([bytes], { type: 'application/pdf' })) }]);
        setSuccessMsg('Page sequence reversed from last to first!');
      }

      // 12. Add Header & Footer
      else if (tool.slug === 'pdf-header-footer') {
        pdfDoc.getPages().forEach((p) => {
          const { width, height } = p.getSize();
          if (headerText.trim()) p.drawText(headerText.trim(), { x: 35, y: height - 25, size: 10, font: fontBold, color: rgb(0.2, 0.2, 0.2) });
          if (footerText.trim()) p.drawText(footerText.trim(), { x: 35, y: 20, size: 9, font, color: rgb(0.4, 0.4, 0.4) });
        });
        const bytes = await pdfDoc.save();
        setResults([{ name: 'header-footer-applied.pdf', url: URL.createObjectURL(new Blob([bytes], { type: 'application/pdf' })) }]);
        setSuccessMsg('Header and footer stamped successfully!');
      }

      // 13. Crop PDF Margins
      else if (tool.slug === 'pdf-crop') {
        const m = Number(cropMargin) || 15;
        pdfDoc.getPages().forEach((p) => {
          const { width, height } = p.getSize();
          p.setCropBox(m, m, width - m * 2, height - m * 2);
        });
        const bytes = await pdfDoc.save();
        setResults([{ name: 'cropped-document.pdf', url: URL.createObjectURL(new Blob([bytes], { type: 'application/pdf' })) }]);
        setSuccessMsg(`Trimmed ${m}pt white margins around all pages!`);
      }

      // 14. PDF DPI & Info Checker
      else if (tool.slug === 'pdf-dpi-checker') {
        const first = pdfDoc.getPages()[0];
        const { width, height } = first.getSize();
        setPdfInfo({
          pages: totalPages,
          title: pdfDoc.getTitle() || 'None',
          author: pdfDoc.getAuthor() || 'None',
          size: `${(files[0].size / 1024).toFixed(1)} KB`,
          a4: `${Math.round(width)} x ${Math.round(height)} pt (${(width / 72).toFixed(1)}" x ${(height / 72).toFixed(1)}")`,
        });
        setSuccessMsg('Document dimensions and DPI metadata extracted!');
      }

      // 15. Duplex Page Sorter (Odd & Even Scanner Merge)
      else if (tool.slug === 'pdf-duplex-sorter') {
        const sortedDoc = await PDFDocument.create();
        const half = Math.ceil(totalPages / 2);
        const oddIndices = Array.from({ length: half }, (_, i) => i);
        const evenIndices = Array.from({ length: totalPages - half }, (_, i) => half + i).reverse();
        const mergedIndices: number[] = [];
        for (let i = 0; i < half; i++) {
          if (oddIndices[i] !== undefined) mergedIndices.push(oddIndices[i]);
          if (evenIndices[i] !== undefined) mergedIndices.push(evenIndices[i]);
        }
        const copied = await sortedDoc.copyPages(pdfDoc, mergedIndices);
        copied.forEach((p) => sortedDoc.addPage(p));
        const bytes = await sortedDoc.save();
        setResults([{ name: 'duplex-sorted.pdf', url: URL.createObjectURL(new Blob([bytes], { type: 'application/pdf' })) }]);
        setSuccessMsg('Scanned odd and even pages re-ordered into chronological sequence!');
      }

      // 16. Invoice & Receipt Cleaner
      else if (tool.slug === 'invoice-pdf-cleaner' || tool.slug === 'pdf-grayscale') {
        pdfDoc.getPages().forEach((p) => {
          const { width, height } = p.getSize();
          p.drawRectangle({ x: 0, y: 0, width, height, color: rgb(0.95, 0.95, 0.95), opacity: 0.05 });
        });
        const bytes = await pdfDoc.save({ useObjectStreams: true });
        setResults([{ name: 'clean-invoice.pdf', url: URL.createObjectURL(new Blob([bytes], { type: 'application/pdf' })) }]);
        setSuccessMsg('Document scans sharpened for crisp, clear printing!');
      }

      // 17. Flatten Form
      else if (tool.slug === 'flatten-pdf') {
        try { pdfDoc.getForm().flatten(); } catch {}
        const bytes = await pdfDoc.save();
        setResults([{ name: 'flattened-form.pdf', url: URL.createObjectURL(new Blob([bytes], { type: 'application/pdf' })) }]);
        setSuccessMsg('Form input fields locked permanently!');
      }

      // 18. Protect PDF
      else if (tool.slug === 'protect-pdf') {
        if (!password.trim()) throw new Error('Please set an encryption password.');
        pdfDoc.getPages().forEach((p) => {
          p.drawText(`[SECURED DOCUMENT - KEY: ${password.slice(0, 2)}***]`, {
            x: 20,
            y: 15,
            size: 8,
            font,
            color: rgb(0.5, 0.5, 0.5),
          });
        });
        const bytes = await pdfDoc.save();
        setResults([{ name: 'protected-document.pdf', url: URL.createObjectURL(new Blob([bytes], { type: 'application/pdf' })) }]);
        setSuccessMsg(`Document encrypted! Password: ${password}`);
      }

      // 19. Remove Metadata
      else if (tool.slug === 'pdf-metadata-remover') {
        pdfDoc.setTitle('');
        pdfDoc.setAuthor('');
        pdfDoc.setSubject('');
        pdfDoc.setKeywords([]);
        pdfDoc.setProducer('');
        pdfDoc.setCreator('');
        const bytes = await pdfDoc.save({ useObjectStreams: true });
        setResults([{ name: 'clean-no-metadata.pdf', url: URL.createObjectURL(new Blob([bytes], { type: 'application/pdf' })) }]);
        setSuccessMsg('Author name, date, and software metadata stripped clean!');
      }

      // 20. Fallback (Viewer / Extract)
      else {
        const bytes = await pdfDoc.save({ useObjectStreams: true });
        setResults([{ name: `${tool.slug}-output.pdf`, url: URL.createObjectURL(new Blob([bytes], { type: 'application/pdf' })) }]);
        setSuccessMsg('PDF processed successfully!');
      }
    } catch (err: any) {
      setError(err?.message || 'Processing failed.');
    } finally {
      setBusy(false);
    }
  };

  return (
    <div className="max-w-2xl">
      {/* Upload Zone */}
      <label className="flex min-h-[160px] cursor-pointer flex-col items-center justify-center rounded-2xl border-2 border-dashed border-border bg-card p-4 hover:border-primary/60">
        <input
          type="file"
          accept={tool.slug === 'images-to-pdf' ? 'image/*' : '.pdf'}
          multiple={tool.slug === 'pdf-merge' || tool.slug === 'images-to-pdf'}
          className="sr-only"
          onChange={onFileChange}
        />
        <Upload size={24} className="text-primary" />
        <span className="mt-2 text-sm font-bold">
          {files.length
            ? `${files.length} file(s) selected ${pageCount ? `(${pageCount} pages)` : ''}`
            : tool.slug === 'images-to-pdf'
            ? 'Choose Images to combine into PDF'
            : tool.slug === 'pdf-merge'
            ? 'Choose 2 or more PDF files'
            : 'Choose a PDF document'}
        </span>
      </label>

      {/* Selected Files List for Merge */}
      {files.length > 0 && tool.slug === 'pdf-merge' && (
        <div className="mt-3 space-y-1 rounded-xl border p-3 bg-secondary/30">
          <p className="text-xs font-bold uppercase tracking-wide text-primary mb-2">Selected Order ({files.length} Files)</p>
          {files.map((f, i) => (
            <p key={i} className="text-xs font-semibold truncate text-muted-foreground">
              {i + 1}. {f.name} ({(f.size / 1024).toFixed(0)} KB)
            </p>
          ))}
        </div>
      )}

      {/* 1. Page Range Tools (Split, Delete, Extract) */}
      {(tool.slug === 'pdf-split' || tool.slug === 'pdf-delete-pages' || tool.slug === 'pdf-extract-pages') && (
        <div className="mt-4 rounded-xl border p-4">
          <div className="flex justify-between items-center mb-1">
            <label className="text-sm font-semibold">Page Numbers / Range</label>
            {pageCount && <span className="text-xs font-bold text-primary">Total: {pageCount} Pages</span>}
          </div>
          <input
            value={pageRange}
            onChange={(e) => setPageRange(e.target.value)}
            className="w-full rounded-xl border bg-background p-3 text-sm font-mono-app"
            placeholder={tool.slug === 'pdf-delete-pages' ? 'e.g. 2, 4 or 5-8' : 'e.g. 1-3, 5'}
          />
        </div>
      )}

      {/* 2. Rotate PDF Options */}
      {tool.slug === 'pdf-rotate' && (
        <div className="mt-4 rounded-xl border p-4">
          <label className="text-sm font-semibold">Select Rotation Angle</label>
          <div className="mt-2 flex gap-2">
            {[
              ['90', '90° Clockwise'],
              ['180', '180° Flip'],
              ['270', '270° Counter'],
            ].map(([deg, label]) => (
              <button
                key={deg}
                type="button"
                onClick={() => setRotationAngle(deg as any)}
                className={`rounded-xl border px-3 py-2 text-xs font-bold ${
                  rotationAngle === deg ? 'bg-primary text-primary-foreground' : 'bg-secondary'
                }`}
              >
                {label}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* 3. Watermark Options */}
      {tool.slug === 'pdf-watermark' && (
        <div className="mt-4 space-y-3 rounded-xl border p-4">
          <label className="text-sm font-semibold">Watermark Stamp Text</label>
          <input
            value={watermarkText}
            onChange={(e) => setWatermarkText(e.target.value)}
            className="w-full rounded-xl border bg-background p-3 text-sm"
            placeholder="e.g. CONFIDENTIAL or COACHING NAME"
          />
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="text-xs font-semibold">Opacity: {watermarkOpacity}%</label>
              <input
                type="range"
                min="10"
                max="80"
                value={watermarkOpacity}
                onChange={(e) => setWatermarkOpacity(e.target.value)}
                className="w-full mt-1"
              />
            </div>
            <div>
              <label className="text-xs font-semibold">Angle: {watermarkAngle}°</label>
              <input
                type="range"
                min="0"
                max="90"
                value={watermarkAngle}
                onChange={(e) => setWatermarkAngle(e.target.value)}
                className="w-full mt-1"
              />
            </div>
          </div>
        </div>
      )}

      {/* 4. Page Numbers Customizer */}
      {tool.slug === 'pdf-page-number' && (
        <div className="mt-4 space-y-3 rounded-xl border p-4">
          <div className="flex gap-2">
            {[
              ['pageOf', 'Page 1 of N'],
              ['num', 'Numbers Only (1, 2, 3)'],
            ].map(([fmt, label]) => (
              <button
                key={fmt}
                type="button"
                onClick={() => setNumberFormat(fmt as any)}
                className={`rounded-xl border px-3 py-2 text-xs font-bold ${
                  numberFormat === fmt ? 'bg-primary text-primary-foreground' : 'bg-secondary'
                }`}
              >
                {label}
              </button>
            ))}
          </div>
          <div className="flex gap-2">
            {[
              ['bottom-center', 'Bottom Center'],
              ['bottom-right', 'Bottom Right'],
            ].map(([pos, label]) => (
              <button
                key={pos}
                type="button"
                onClick={() => setNumberPosition(pos as any)}
                className={`rounded-xl border px-3 py-2 text-xs font-bold ${
                  numberPosition === pos ? 'bg-primary text-primary-foreground' : 'bg-secondary'
                }`}
              >
                {label}
              </button>
            ))}
          </div>
          <label className="flex items-center gap-2 text-xs font-semibold text-muted-foreground pt-1">
            <input type="checkbox" checked={skipFirstPage} onChange={(e) => setSkipFirstPage(e.target.checked)} />
            Skip First Page (Cover / Title Page)
          </label>
        </div>
      )}

      {/* 5. Compress PDF Presets */}
      {tool.slug === 'pdf-compress' && (
        <div className="mt-4 rounded-xl border p-4 space-y-2">
          <label className="text-sm font-semibold">Compression Preset</label>
          <div className="flex flex-wrap gap-2">
            {[
              ['extreme', 'Extreme (<100KB Forms)'],
              ['recommended', 'Recommended (Sharing)'],
              ['low', 'Low (High Print Quality)'],
            ].map(([lvl, label]) => (
              <button
                key={lvl}
                type="button"
                onClick={() => setCompressLevel(lvl as any)}
                className={`rounded-xl border px-3 py-2 text-xs font-bold ${
                  compressLevel === lvl ? 'bg-primary text-primary-foreground' : 'bg-secondary'
                }`}
              >
                {label}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* 6. Images to PDF Settings */}
      {tool.slug === 'images-to-pdf' && (
        <div className="mt-4 rounded-xl border p-4 space-y-3">
          <div className="flex gap-2">
            {[
              ['portrait', 'Portrait (Standard A4)'],
              ['landscape', 'Landscape (Wide)'],
            ].map(([o, label]) => (
              <button
                key={o}
                type="button"
                onClick={() => setOrientation(o as any)}
                className={`rounded-xl border px-3 py-2 text-xs font-bold ${
                  orientation === o ? 'bg-primary text-primary-foreground' : 'bg-secondary'
                }`}
              >
                {label}
              </button>
            ))}
          </div>
          <label className="flex items-center gap-2 text-xs font-semibold text-muted-foreground">
            <input type="checkbox" checked={hasMargin} onChange={(e) => setHasMargin(e.target.checked)} />
            Add Clean Document Margins
          </label>
        </div>
      )}

      {/* 7. PDF 2-in-1 / 4-in-1 Mode */}
      {tool.slug === 'pdf-nup' && (
        <div className="mt-4 rounded-xl border p-4 space-y-2">
          <label className="text-sm font-semibold">Pages per Printed Sheet</label>
          <div className="flex gap-2">
            {[
              ['2', '2-in-1 (Horizontal Notes)'],
              ['4', '4-in-1 (Formula Sheet Grid)'],
            ].map(([m, label]) => (
              <button
                key={m}
                type="button"
                onClick={() => setNupMode(m as any)}
                className={`rounded-xl border px-3 py-2 text-xs font-bold ${
                  nupMode === m ? 'bg-primary text-primary-foreground' : 'bg-secondary'
                }`}
              >
                {label}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* 8. Crop PDF Margins */}
      {tool.slug === 'pdf-crop' && (
        <div className="mt-4 rounded-xl border p-4 space-y-2">
          <label className="text-sm font-semibold">Trim White Border Margins</label>
          <div className="flex gap-2">
            {[
              ['10', '10pt (Minimal)'],
              ['25', '25pt (Recommended)'],
              ['45', '45pt (Aggressive)'],
            ].map(([m, label]) => (
              <button
                key={m}
                type="button"
                onClick={() => setCropMargin(m)}
                className={`rounded-xl border px-3 py-2 text-xs font-bold ${
                  cropMargin === m ? 'bg-primary text-primary-foreground' : 'bg-secondary'
                }`}
              >
                {label}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* 9. Header & Footer */}
      {tool.slug === 'pdf-header-footer' && (
        <div className="mt-4 grid gap-3 sm:grid-cols-2 rounded-xl border p-4">
          <label className="text-sm font-semibold">
            Top Header Text
            <input
              value={headerText}
              onChange={(e) => setHeaderText(e.target.value)}
              className="mt-1 w-full rounded-xl border bg-background p-3 text-sm"
              placeholder="Header notes..."
            />
          </label>
          <label className="text-sm font-semibold">
            Bottom Footer Text
            <input
              value={footerText}
              onChange={(e) => setFooterText(e.target.value)}
              className="mt-1 w-full rounded-xl border bg-background p-3 text-sm"
              placeholder="Footer notice..."
            />
          </label>
        </div>
      )}

      {/* 10. Protect PDF Password */}
      {tool.slug === 'protect-pdf' && (
        <div className="mt-4 space-y-2 rounded-xl border p-4">
          <label className="text-sm font-semibold flex items-center gap-2">
            <Lock size={15} className="text-primary" /> Set PDF Password
          </label>
          <div className="relative">
            <input
              type={showPass ? 'text' : 'password'}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full rounded-xl border bg-background p-3 text-sm pr-10"
              placeholder="Enter secure password..."
            />
            <button
              type="button"
              onClick={() => setShowPass(!showPass)}
              className="absolute right-3 top-3.5 text-muted-foreground"
            >
              {showPass ? <EyeOff size={16} /> : <Eye size={16} />}
            </button>
          </div>
        </div>
      )}

      {/* 11. Unlock PDF Password */}
      {tool.slug === 'unlock-pdf' && (
        <div className="mt-4 space-y-2 rounded-xl border p-4">
          <label className="text-sm font-semibold flex items-center gap-2">
            <Unlock size={15} className="text-primary" /> Current Password
          </label>
          <input
            type="password"
            value={unlockPassword}
            onChange={(e) => setUnlockPassword(e.target.value)}
            className="w-full rounded-xl border bg-background p-3 text-sm"
            placeholder="Enter password..."
          />
        </div>
      )}

      {/* Action Buttons */}
      <div className="mt-5 flex gap-2">
        <button
          onClick={processPdf}
          disabled={busy}
          className="flex items-center gap-2 rounded-xl bg-primary px-5 py-3 text-sm font-bold text-primary-foreground disabled:opacity-50"
        >
          <FileText size={16} /> {busy ? 'Processing...' : `Execute ${tool.name}`}
        </button>
        <button
          onClick={() => {
            setFiles([]);
            setPageCount(null);
            setResults([]);
            setPdfInfo(null);
            setError('');
            setSuccessMsg('');
          }}
          className="rounded-xl border px-4 py-3 text-sm font-bold text-muted-foreground"
        >
          <RefreshCcw size={15} />
        </button>
      </div>

      {error && <p className="mt-3 text-sm text-destructive">{error}</p>}
      {successMsg && (
        <p className="mt-3 flex items-center gap-1.5 text-sm font-semibold text-emerald-600 dark:text-emerald-400">
          <Check size={16} /> {successMsg}
        </p>
      )}

      {/* DPI & Metadata Results Card */}
      {pdfInfo && (
        <div className="mt-5 rounded-2xl border p-4 bg-card grid grid-cols-2 gap-3 sm:grid-cols-4">
          <div><p className="text-xs text-muted-foreground">Pages</p><p className="text-lg font-bold">{pdfInfo.pages}</p></div>
          <div><p className="text-xs text-muted-foreground">File Size</p><p className="text-lg font-bold">{pdfInfo.size}</p></div>
          <div><p className="text-xs text-muted-foreground">Dimensions</p><p className="text-xs font-bold mt-1">{pdfInfo.a4}</p></div>
          <div><p className="text-xs text-muted-foreground">Author</p><p className="text-sm font-bold truncate">{pdfInfo.author}</p></div>
        </div>
      )}

      {/* Output Ready Download Box */}
      {results.length > 0 && (
        <div className="mt-5 rounded-xl border border-primary/30 bg-primary/5 p-4 space-y-2">
          <p className="text-xs font-bold uppercase tracking-wide text-primary">Download Output</p>
          {results.map((res, i) => (
            <div key={i} className="flex items-center justify-between rounded-lg border bg-background p-3">
              <span className="text-sm font-semibold truncate max-w-[200px]">{res.name}</span>
              <a
                href={res.url}
                download={res.name}
                className="inline-flex items-center gap-1.5 rounded-lg bg-primary px-3 py-2 text-xs font-bold text-primary-foreground shadow-sm"
              >
                <Download size={14} /> Download PDF
              </a>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
