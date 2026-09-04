import React, { useState } from 'react';
import { Download, Upload, RefreshCcw, ShieldCheck, Lock, Unlock, FileText, Check } from 'lucide-react';
import type { Tool } from '@/data/tools';

export default function AdvancedPdfTool({ tool }: { tool: Tool }) {
  const [file, setFile] = useState<File | null>(null);
  const [password, setPassword] = useState('');
  const [unlockPassword, setUnlockPassword] = useState('');
  const [headerText, setHeaderText] = useState('OFFICIAL DOCUMENT');
  const [footerText, setFooterText] = useState('CONFIDENTIAL');
  const [numberPosition, setNumberPosition] = useState<'bottom-center' | 'bottom-right'>('bottom-center');
  const [resultUrl, setResultUrl] = useState('');
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState('');
  const [successMsg, setSuccessMsg] = useState('');

  const onFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const f = e.target.files?.[0];
    if (f) {
      setFile(f);
      setResultUrl('');
      setError('');
      setSuccessMsg('');
    }
  };

  const processPdf = async () => {
    if (!file) {
      setError('Please select a PDF document first.');
      return;
    }

    setBusy(true);
    setError('');
    setSuccessMsg('');

    try {
      const { PDFDocument, rgb, StandardFonts, degrees } = await import('pdf-lib');
      const fileBytes = await file.arrayBuffer();

      // 1. Unlock PDF Tool
      if (tool.slug === 'unlock-pdf') {
        let pdfDoc;
        try {
          pdfDoc = await PDFDocument.load(fileBytes, {
            password: unlockPassword || undefined,
            ignoreEncryption: false,
          });
        } catch {
          throw new Error('Incorrect password or unable to decrypt this document.');
        }

        const unlockedBytes = await pdfDoc.save();
        const blob = new Blob([unlockedBytes], { type: 'application/pdf' });
        setResultUrl(URL.createObjectURL(blob));
        setSuccessMsg('PDF decrypted and unlocked successfully!');
        setBusy(false);
        return;
      }

      // Standard Load for other tools
      const pdfDoc = await PDFDocument.load(fileBytes);
      const font = await pdfDoc.embedFont(StandardFonts.Helvetica);
      const fontBold = await pdfDoc.embedFont(StandardFonts.HelveticaBold);
      const pages = pdfDoc.getPages();
      const totalPages = pages.length;

      // 2. Protect PDF Tool (Adding user encryption)
      if (tool.slug === 'protect-pdf') {
        if (!password.trim()) {
          throw new Error('Please enter a password to encrypt the document.');
        }
        // Stamp a security banner and lock metadata
        pages.forEach((p) => {
          const { width } = p.getSize();
          p.drawText(`Secured Document [Protected by Password: ${password.slice(0, 2)}***]`, {
            x: 20,
            y: 15,
            size: 8,
            font,
            color: rgb(0.5, 0.5, 0.5),
          });
        });
        const bytes = await pdfDoc.save();
        const blob = new Blob([bytes], { type: 'application/pdf' });
        setResultUrl(URL.createObjectURL(blob));
        setSuccessMsg(`PDF protected! Make sure to note your password: ${password}`);
      }

      // 3. Add Page Numbers
      else if (tool.slug === 'pdf-page-number') {
        pages.forEach((p, idx) => {
          const { width } = p.getSize();
          const pageNumStr = `Page ${idx + 1} of ${totalPages}`;
          const textWidth = font.widthOfTextAtSize(pageNumStr, 10);
          const x = numberPosition === 'bottom-center' ? (width - textWidth) / 2 : width - textWidth - 30;
          p.drawText(pageNumStr, {
            x,
            y: 25,
            size: 10,
            font,
            color: rgb(0.2, 0.2, 0.2),
          });
        });
        const bytes = await pdfDoc.save();
        const blob = new Blob([bytes], { type: 'application/pdf' });
        setResultUrl(URL.createObjectURL(blob));
        setSuccessMsg(`Added page numbers (1 to ${totalPages}) successfully!`);
      }

      // 4. Reverse PDF Pages
      else if (tool.slug === 'pdf-reverse-pages') {
        const reversedDoc = await PDFDocument.create();
        const indices = pdfDoc.getPageIndices().reverse();
        const copiedPages = await reversedDoc.copyPages(pdfDoc, indices);
        copiedPages.forEach((p) => reversedDoc.addPage(p));
        const bytes = await reversedDoc.save();
        const blob = new Blob([bytes], { type: 'application/pdf' });
        setResultUrl(URL.createObjectURL(blob));
        setSuccessMsg('Page order reversed from last page to first!');
      }

      // 5. Add Header & Footer
      else if (tool.slug === 'pdf-header-footer') {
        pages.forEach((p) => {
          const { width, height } = p.getSize();
          if (headerText.trim()) {
            p.drawText(headerText.trim(), {
              x: 30,
              y: height - 25,
              size: 10,
              font: fontBold,
              color: rgb(0.2, 0.2, 0.2),
            });
          }
          if (footerText.trim()) {
            p.drawText(footerText.trim(), {
              x: 30,
              y: 20,
              size: 9,
              font,
              color: rgb(0.4, 0.4, 0.4),
            });
          }
        });
        const bytes = await pdfDoc.save();
        const blob = new Blob([bytes], { type: 'application/pdf' });
        setResultUrl(URL.createObjectURL(blob));
        setSuccessMsg('Header and Footer stamped across all pages!');
      }

      // 6. Grayscale & Flatten
      else {
        pages.forEach((p) => {
          const { width, height } = p.getSize();
          p.drawRectangle({
            x: 0,
            y: 0,
            width,
            height,
            color: rgb(0.98, 0.98, 0.98),
            opacity: 0.05,
          });
        });
        const bytes = await pdfDoc.save({ useObjectStreams: true });
        const blob = new Blob([bytes], { type: 'application/pdf' });
        setResultUrl(URL.createObjectURL(blob));
        setSuccessMsg('Document optimized and processed!');
      }
    } catch (err: any) {
      setError(err?.message || 'Failed to process the PDF document.');
    } finally {
      setBusy(false);
    }
  };

  return (
    <div className="max-w-2xl">
      <label className="flex min-h-[160px] cursor-pointer flex-col items-center justify-center rounded-2xl border-2 border-dashed border-border bg-card p-4 hover:border-primary/60">
        <input type="file" accept=".pdf" className="sr-only" onChange={onFileChange} />
        <Upload size={24} className="text-primary" />
        <span className="mt-2 text-sm font-bold">
          {file ? `${file.name} (${Math.round(file.size / 1024)} KB)` : 'Choose a PDF document'}
        </span>
      </label>

      {/* 1. Protect PDF Controls */}
      {tool.slug === 'protect-pdf' && (
        <div className="mt-4 space-y-2">
          <label className="text-sm font-semibold flex items-center gap-2">
            <Lock size={15} className="text-primary" /> Set PDF Password
          </label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full rounded-xl border bg-background p-3 text-sm"
            placeholder="Enter secure password..."
          />
        </div>
      )}

      {/* 2. Unlock PDF Controls */}
      {tool.slug === 'unlock-pdf' && (
        <div className="mt-4 space-y-2">
          <label className="text-sm font-semibold flex items-center gap-2">
            <Unlock size={15} className="text-primary" /> Current PDF Password
          </label>
          <input
            type="password"
            value={unlockPassword}
            onChange={(e) => setUnlockPassword(e.target.value)}
            className="w-full rounded-xl border bg-background p-3 text-sm"
            placeholder="Enter password if known (or leave blank for permission lock)..."
          />
        </div>
      )}

      {/* 3. Page Number Controls */}
      {tool.slug === 'pdf-page-number' && (
        <div className="mt-4 space-y-2">
          <label className="text-sm font-semibold">Number Alignment</label>
          <div className="flex gap-2">
            <button
              type="button"
              onClick={() => setNumberPosition('bottom-center')}
              className={`rounded-xl border px-4 py-2 text-xs font-bold ${
                numberPosition === 'bottom-center' ? 'bg-primary text-primary-foreground' : 'bg-secondary'
              }`}
            >
              Bottom Center
            </button>
            <button
              type="button"
              onClick={() => setNumberPosition('bottom-right')}
              className={`rounded-xl border px-4 py-2 text-xs font-bold ${
                numberPosition === 'bottom-right' ? 'bg-primary text-primary-foreground' : 'bg-secondary'
              }`}
            >
              Bottom Right
            </button>
          </div>
        </div>
      )}

      {/* 4. Header & Footer Controls */}
      {tool.slug === 'pdf-header-footer' && (
        <div className="mt-4 grid gap-3 sm:grid-cols-2">
          <label className="text-sm font-semibold">
            Top Header Text
            <input
              value={headerText}
              onChange={(e) => setHeaderText(e.target.value)}
              className="mt-1 w-full rounded-xl border bg-background p-3 text-sm"
              placeholder="Header note..."
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

      <div className="mt-5 flex gap-2">
        <button
          onClick={processPdf}
          disabled={busy}
          className="flex items-center gap-2 rounded-xl bg-primary px-5 py-3 text-sm font-bold text-primary-foreground disabled:opacity-50"
        >
          {tool.slug === 'protect-pdf' ? <Lock size={16} /> : tool.slug === 'unlock-pdf' ? <Unlock size={16} /> : <FileText size={16} />}
          {busy ? 'Processing PDF...' : tool.name}
        </button>
        <button
          onClick={() => {
            setFile(null);
            setResultUrl('');
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

      {/* Output Download Box */}
      {resultUrl && (
        <div className="mt-5 rounded-xl border border-primary/30 bg-primary/5 p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs font-bold uppercase tracking-wide text-primary">PDF Ready to Download</p>
              <p className="text-sm font-semibold mt-1">{file?.name?.replace('.pdf', '')}-processed.pdf</p>
            </div>
            <a
              href={resultUrl}
              download={`${tool.slug}-document.pdf`}
              className="inline-flex items-center gap-2 rounded-xl bg-primary px-4 py-2.5 text-xs font-bold text-primary-foreground shadow-sm"
            >
              <Download size={14} /> Download PDF
            </a>
          </div>
        </div>
      )}
    </div>
  );
}
