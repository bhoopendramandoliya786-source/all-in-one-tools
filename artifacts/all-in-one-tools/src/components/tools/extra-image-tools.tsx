import React, { useState } from 'react';
import { Download, Upload, RefreshCcw, Sparkles, Copy, Check, Grid, Shield, Sliders } from 'lucide-react';
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

export default function ExtraImageTool({ tool }: { tool: Tool }) {
  const [file, setFile] = useState<File | null>(null);
  const [bulkFiles, setBulkFiles] = useState<File[]>([]);
  const [resultUrl, setResultUrl] = useState('');
  const [bulkResults, setBulkResults] = useState<{ name: string; url: string }[]>([]);
  const [asciiText, setAsciiText] = useState('');
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState('');
  const [copied, setCopied] = useState(false);

  // Passport Controls
  const [bgChoice, setBgChoice] = useState('#ffffff');
  const [preset, setPreset] = useState<'ssc' | 'standard' | 'square'>('ssc');

  // Exam Name & Date Stamp
  const [applicantName, setApplicantName] = useState('STUDENT NAME');
  const [dopDate, setDopDate] = useState('04-09-2026');

  // Meme Controls
  const [topText, setTopText] = useState('WHEN IT WORKS');
  const [bottomText, setBottomText] = useState('100 PERCENT');

  // Specific Tools Controls
  const [targetBgColor, setTargetBgColor] = useState('#3b82f6');
  const [blurRadius, setBlurRadius] = useState('15');
  const [pixelSize, setPixelSize] = useState('12');
  const [borderRadius, setBorderRadius] = useState('40');
  const [aspectRatio, setAspectRatio] = useState<'16:9' | '1:1' | '4:3'>('16:9');
  const [targetDpi, setTargetDpi] = useState('300');
  const [gridCount, setGridCount] = useState<'2x2' | '3x3'>('3x3');
  const [bulkWidth, setBulkWidth] = useState('800');
  const [bulkHeight, setBulkHeight] = useState('600');
  const [palette, setPalette] = useState<string[]>([]);

  const onSingleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const f = e.target.files?.[0];
    if (f) {
      setFile(f);
      setResultUrl('');
      setAsciiText('');
      setError('');
      setPalette([]);
      setBulkResults([]);
    }
  };

  const onBulkFilesChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files?.length) {
      setBulkFiles(Array.from(e.target.files));
      setBulkResults([]);
      setError('');
    }
  };

  const processImage = async () => {
    // --- Bulk Image Resizer Handling ---
    if (tool.slug === 'bulk-image-resizer') {
      if (!bulkFiles.length) {
        setError('Please select at least one image.');
        return;
      }
      setBusy(true);
      setError('');
      const processed: { name: string; url: string }[] = [];

      for (const bFile of bulkFiles) {
        const bUrl = URL.createObjectURL(bFile);
        await new Promise<void>((resolve) => {
          const bImg = new Image();
          bImg.onload = () => {
            const bCanvas = document.createElement('canvas');
            const targetW = Number(bulkWidth) || 800;
            const targetH = Number(bulkHeight) || 600;
            bCanvas.width = targetW;
            bCanvas.height = targetH;
            const bCtx = bCanvas.getContext('2d');
            if (bCtx) {
              bCtx.drawImage(bImg, 0, 0, targetW, targetH);
              processed.push({
                name: `resized-${bFile.name}`,
                url: bCanvas.toDataURL('image/jpeg', 0.88),
              });
            }
            URL.revokeObjectURL(bUrl);
            resolve();
          };
          bImg.src = bUrl;
        });
      }
      setBulkResults(processed);
      setBusy(false);
      return;
    }

    // --- Single Image Tools ---
    if (!file) {
      setError('Please select an image file first.');
      return;
    }
    setBusy(true);
    setError('');

    // HEIC to JPG
    if (tool.slug === 'heic-to-jpg') {
      const reader = new FileReader();
      reader.onload = (event) => {
        const img = new Image();
        img.onload = () => {
          const canvas = document.createElement('canvas');
          canvas.width = img.width;
          canvas.height = img.height;
          const ctx = canvas.getContext('2d');
          if (ctx) {
            ctx.fillStyle = '#ffffff';
            ctx.fillRect(0, 0, canvas.width, canvas.height);
            ctx.drawImage(img, 0, 0);
            setResultUrl(canvas.toDataURL('image/jpeg', 0.92));
          }
          setBusy(false);
        };
        img.src = event.target?.result as string;
      };
      reader.readAsDataURL(file);
      return;
    }

    // SVG to PNG
    if (tool.slug === 'svg-to-png') {
      const reader = new FileReader();
      reader.onload = (event) => {
        const img = new Image();
        img.onload = () => {
          const canvas = document.createElement('canvas');
          canvas.width = img.width || 1200;
          canvas.height = img.height || 1200;
          const ctx = canvas.getContext('2d');
          if (ctx) {
            ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
            setResultUrl(canvas.toDataURL('image/png'));
          }
          setBusy(false);
        };
        img.src = event.target?.result as string;
      };
      reader.readAsDataURL(file);
      return;
    }

    // Canvas Processing
    const img = new Image();
    const url = URL.createObjectURL(file);

    img.onload = () => {
      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d');
      if (!ctx) {
        setBusy(false);
        return;
      }

      // 1. Passport Photo Maker
      if (tool.slug === 'passport-photo-maker') {
        let targetW = 350;
        let targetH = 450;
        if (preset === 'square') {
          targetW = 400;
          targetH = 400;
        } else if (preset === 'standard') {
          targetW = 300;
          targetH = 400;
        }

        canvas.width = targetW;
        canvas.height = targetH;
        ctx.fillStyle = bgChoice;
        ctx.fillRect(0, 0, targetW, targetH);

        const imgRatio = img.width / img.height;
        const targetRatio = targetW / targetH;
        let sw = img.width;
        let sh = img.height;
        let sx = 0;
        let sy = 0;

        if (imgRatio > targetRatio) {
          sw = img.height * targetRatio;
          sx = (img.width - sw) / 2;
        } else {
          sh = img.width / targetRatio;
          sy = (img.height - sh) / 4;
        }

        ctx.drawImage(img, sx, sy, sw, sh, 0, 0, targetW, targetH);
        ctx.strokeStyle = '#cbd5e1';
        ctx.lineWidth = 2;
        ctx.strokeRect(0, 0, targetW, targetH);
        setResultUrl(canvas.toDataURL('image/jpeg', 0.88));
      }

      // 2. Exam Signature Resizer (10-20KB standard)
      else if (tool.slug === 'signature-resizer') {
        canvas.width = 280;
        canvas.height = 120;
        ctx.fillStyle = '#ffffff';
        ctx.fillRect(0, 0, 280, 120);
        ctx.drawImage(img, 10, 10, 260, 100);
        setResultUrl(canvas.toDataURL('image/jpeg', 0.72));
      }

      // 3. Exam Photo Date & Name Stamp (SSC / Police)
      else if (tool.slug === 'photo-date-namer') {
        canvas.width = img.width;
        canvas.height = img.height;
        ctx.drawImage(img, 0, 0);

        const stripHeight = Math.max(54, Math.floor(img.height * 0.22));
        ctx.fillStyle = '#ffffff';
        ctx.fillRect(0, img.height - stripHeight, img.width, stripHeight);
        ctx.strokeStyle = '#000000';
        ctx.lineWidth = 3;
        ctx.strokeRect(0, img.height - stripHeight, img.width, stripHeight);

        const fontSize = Math.max(14, Math.floor(stripHeight * 0.35));
        ctx.fillStyle = '#000000';
        ctx.font = `bold ${fontSize}px sans-serif`;
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';

        ctx.fillText(applicantName.toUpperCase(), img.width / 2, img.height - stripHeight * 0.65);
        ctx.fillText(`DOP: ${dopDate}`, img.width / 2, img.height - stripHeight * 0.25);
        setResultUrl(canvas.toDataURL('image/jpeg', 0.9));
      }

      // 4. Image to ASCII Art
      else if (tool.slug === 'ascii-art-generator') {
        const cols = 80;
        const rows = Math.floor((img.height / img.width) * cols * 0.5);
        canvas.width = cols;
        canvas.height = rows;
        ctx.drawImage(img, 0, 0, cols, rows);
        const data = ctx.getImageData(0, 0, cols, rows).data;

        const chars = '@%#*+=-:. ';
        let out = '';
        for (let y = 0; y < rows; y++) {
          for (let x = 0; x < cols; x++) {
            const idx = (y * cols + x) * 4;
            const b = (data[idx] + data[idx + 1] + data[idx + 2]) / 3;
            const charIdx = Math.floor((b / 255) * (chars.length - 1));
            out += chars[charIdx];
          }
          out += '\n';
        }
        setAsciiText(out);
      }

      // 5. Replace Background Color
      else if (tool.slug === 'transparent-color-remover') {
        canvas.width = img.width;
        canvas.height = img.height;
        ctx.drawImage(img, 0, 0);

        const imgData = ctx.getImageData(0, 0, canvas.width, canvas.height);
        const d = imgData.data;

        const bgR = d[0];
        const bgG = d[1];
        const bgB = d[2];

        const hex = targetBgColor.replace('#', '');
        const newR = parseInt(hex.substring(0, 2), 16);
        const newG = parseInt(hex.substring(2, 4), 16);
        const newB = parseInt(hex.substring(4, 6), 16);

        for (let i = 0; i < d.length; i += 4) {
          const diff = Math.abs(d[i] - bgR) + Math.abs(d[i + 1] - bgG) + Math.abs(d[i + 2] - bgB);
          if (diff < 70) {
            d[i] = newR;
            d[i + 1] = newG;
            d[i + 2] = newB;
          }
        }
        ctx.putImageData(imgData, 0, 0);
        setResultUrl(canvas.toDataURL('image/jpeg', 0.9));
      }

      // 6. Aspect Ratio Fitter (with Blur Margin)
      else if (tool.slug === 'aspect-ratio-fitter') {
        let targetW = 1280;
        let targetH = 720;
        if (aspectRatio === '1:1') {
          targetW = 1080;
          targetH = 1080;
        } else if (aspectRatio === '4:3') {
          targetW = 1200;
          targetH = 900;
        }

        canvas.width = targetW;
        canvas.height = targetH;

        ctx.filter = 'blur(25px)';
        ctx.drawImage(img, -30, -30, targetW + 60, targetH + 60);
        ctx.filter = 'none';

        const scale = Math.min(targetW / img.width, targetH / img.height);
        const fw = img.width * scale;
        const fh = img.height * scale;
        ctx.drawImage(img, (targetW - fw) / 2, (targetH - fh) / 2, fw, fh);
        setResultUrl(canvas.toDataURL('image/jpeg', 0.92));
      }

      // 7. Pixelate Privacy Censor
      else if (tool.slug === 'pixelate-censor') {
        const pSize = Number(pixelSize) || 12;
        canvas.width = img.width;
        canvas.height = img.height;

        const offCanvas = document.createElement('canvas');
        const offCtx = offCanvas.getContext('2d');
        const sw = Math.max(1, Math.floor(img.width / pSize));
        const sh = Math.max(1, Math.floor(img.height / pSize));
        offCanvas.width = sw;
        offCanvas.height = sh;

        if (offCtx) {
          offCtx.drawImage(img, 0, 0, sw, sh);
          ctx.imageSmoothingEnabled = false;
          ctx.drawImage(offCanvas, 0, 0, sw, sh, 0, 0, canvas.width, canvas.height);
        }
        setResultUrl(canvas.toDataURL('image/jpeg', 0.9));
      }

      // 8. Round Corner Maker
      else if (tool.slug === 'round-corner-maker') {
        canvas.width = img.width;
        canvas.height = img.height;
        const rad = Number(borderRadius) || 40;

        ctx.beginPath();
        ctx.moveTo(rad, 0);
        ctx.lineTo(canvas.width - rad, 0);
        ctx.quadraticCurveTo(canvas.width, 0, canvas.width, rad);
        ctx.lineTo(canvas.width, canvas.height - rad);
        ctx.quadraticCurveTo(canvas.width, canvas.height, canvas.width - rad, canvas.height);
        ctx.lineTo(rad, canvas.height);
        ctx.quadraticCurveTo(0, canvas.height, 0, canvas.height - rad);
        ctx.lineTo(0, rad);
        ctx.quadraticCurveTo(0, 0, rad, 0);
        ctx.closePath();
        ctx.clip();

        ctx.drawImage(img, 0, 0);
        setResultUrl(canvas.toDataURL('image/png'));
      }

      // 9. B&W Document Scanner
      else if (tool.slug === 'black-white-threshold') {
        canvas.width = img.width;
        canvas.height = img.height;
        ctx.drawImage(img, 0, 0);
        const imgData = ctx.getImageData(0, 0, canvas.width, canvas.height);
        const d = imgData.data;
        for (let i = 0; i < d.length; i += 4) {
          const lum = 0.34 * d[i] + 0.5 * d[i + 1] + 0.16 * d[i + 2];
          const v = lum >= 135 ? 255 : 0;
          d[i] = v;
          d[i + 1] = v;
          d[i + 2] = v;
        }
        ctx.putImageData(imgData, 0, 0);
        setResultUrl(canvas.toDataURL('image/jpeg', 0.9));
      }

      // 10. Negative Color Inverter
      else if (tool.slug === 'image-color-inverter') {
        canvas.width = img.width;
        canvas.height = img.height;
        ctx.drawImage(img, 0, 0);
        const imgData = ctx.getImageData(0, 0, canvas.width, canvas.height);
        const d = imgData.data;
        for (let i = 0; i < d.length; i += 4) {
          d[i] = 255 - d[i];
          d[i + 1] = 255 - d[i + 1];
          d[i + 2] = 255 - d[i + 2];
        }
        ctx.putImageData(imgData, 0, 0);
        setResultUrl(canvas.toDataURL('image/jpeg', 0.9));
      }

      // 11. Sepia Vintage Tone Filter
      else if (tool.slug === 'sepia-filter') {
        canvas.width = img.width;
        canvas.height = img.height;
        ctx.drawImage(img, 0, 0);
        const imgData = ctx.getImageData(0, 0, canvas.width, canvas.height);
        const d = imgData.data;
        for (let i = 0; i < d.length; i += 4) {
          const r = d[i], g = d[i + 1], b = d[i + 2];
          d[i] = Math.min(255, 0.393 * r + 0.769 * g + 0.189 * b);
          d[i + 1] = Math.min(255, 0.349 * r + 0.686 * g + 0.168 * b);
          d[i + 2] = Math.min(255, 0.272 * r + 0.534 * g + 0.131 * b);
        }
        ctx.putImageData(imgData, 0, 0);
        setResultUrl(canvas.toDataURL('image/jpeg', 0.9));
      }

      // 12. Strip EXIF / Clean Metadata
      else if (tool.slug === 'png-metadata-stripper') {
        canvas.width = img.width;
        canvas.height = img.height;
        ctx.drawImage(img, 0, 0);
        // Clean render without camera exif
        setResultUrl(canvas.toDataURL('image/jpeg', 0.92));
      }

      // 13. Grid Image Splitter (Instagram Grid)
      else if (tool.slug === 'image-splitter') {
        const parts = gridCount === '2x2' ? 2 : 3;
        const pieceW = Math.floor(img.width / parts);
        const pieceH = Math.floor(img.height / parts);
        const tiles: { name: string; url: string }[] = [];

        for (let r = 0; r < parts; r++) {
          for (let c = 0; c < parts; c++) {
            const tCanvas = document.createElement('canvas');
            tCanvas.width = pieceW;
            tCanvas.height = pieceH;
            const tCtx = tCanvas.getContext('2d');
            if (tCtx) {
              tCtx.drawImage(img, c * pieceW, r * pieceH, pieceW, pieceH, 0, 0, pieceW, pieceH);
              tiles.push({
                name: `tile-row${r + 1}-col${c + 1}.jpg`,
                url: tCanvas.toDataURL('image/jpeg', 0.9),
              });
            }
          }
        }
        setBulkResults(tiles);
      }

      // 14. DPI Converter
      else if (tool.slug === 'dpi-converter') {
        canvas.width = img.width;
        canvas.height = img.height;
        ctx.drawImage(img, 0, 0);
        setResultUrl(canvas.toDataURL('image/jpeg', 0.95));
      }

      // 15. Color Palette Extractor
      else if (tool.slug === 'color-palette-extractor') {
        canvas.width = 150;
        canvas.height = 150;
        ctx.drawImage(img, 0, 0, 150, 150);
        const data = ctx.getImageData(0, 0, 150, 150).data;
        const colors: string[] = [];
        const step = 4 * 75;
        for (let i = 0; i < data.length && colors.length < 5; i += step) {
          const hex = `#${((1 << 24) + (data[i] << 16) + (data[i + 1] << 8) + data[i + 2]).toString(16).slice(1)}`;
          if (!colors.includes(hex)) colors.push(hex);
        }
        setPalette(colors);
        setResultUrl(url);
      }

      // 16. Blur Face
      else if (tool.slug === 'blur-face') {
        canvas.width = img.width;
        canvas.height = img.height;
        ctx.drawImage(img, 0, 0);
        ctx.filter = `blur(${blurRadius}px)`;
        ctx.drawImage(canvas, canvas.width * 0.25, canvas.height * 0.15, canvas.width * 0.5, canvas.height * 0.4, canvas.width * 0.25, canvas.height * 0.15, canvas.width * 0.5, canvas.height * 0.4);
        ctx.filter = 'none';
        setResultUrl(canvas.toDataURL('image/jpeg', 0.9));
      }

      // 17. Meme Generator
      else if (tool.slug === 'meme-generator') {
        canvas.width = img.width;
        canvas.height = img.height;
        ctx.drawImage(img, 0, 0);

        const fSize = Math.max(24, Math.floor(canvas.width / 12));
        ctx.font = `900 ${fSize}px Impact, sans-serif`;
        ctx.fillStyle = '#ffffff';
        ctx.strokeStyle = '#000000';
        ctx.lineWidth = Math.max(3, Math.floor(fSize / 8));
        ctx.textAlign = 'center';

        if (topText.trim()) {
          ctx.textBaseline = 'top';
          ctx.strokeText(topText.toUpperCase(), canvas.width / 2, 20);
          ctx.fillText(topText.toUpperCase(), canvas.width / 2, 20);
        }

        if (bottomText.trim()) {
          ctx.textBaseline = 'bottom';
          ctx.strokeText(bottomText.toUpperCase(), canvas.width / 2, canvas.height - 20);
          ctx.fillText(bottomText.toUpperCase(), canvas.width / 2, canvas.height - 20);
        }
        setResultUrl(canvas.toDataURL('image/jpeg', 0.9));
      }

      // Fallback
      else {
        canvas.width = img.width;
        canvas.height = img.height;
        ctx.drawImage(img, 0, 0);
        setResultUrl(canvas.toDataURL('image/jpeg', 0.9));
      }

      setBusy(false);
      URL.revokeObjectURL(url);
    };

    img.onerror = () => {
      setError('Could not process this image.');
      setBusy(false);
    };
    img.src = url;
  };

  return (
    <div className="max-w-2xl">
      {/* Upload Zone */}
      {tool.slug === 'bulk-image-resizer' ? (
        <label className="flex min-h-[160px] cursor-pointer flex-col items-center justify-center rounded-2xl border-2 border-dashed border-border bg-card p-4 hover:border-primary/60">
          <input type="file" accept="image/*" multiple className="sr-only" onChange={onBulkFilesChange} />
          <Upload size={24} className="text-primary" />
          <span className="mt-2 text-sm font-bold">
            {bulkFiles.length ? `${bulkFiles.length} images selected` : 'Choose Multiple Images to Resize'}
          </span>
        </label>
      ) : (
        <label className="flex min-h-[160px] cursor-pointer flex-col items-center justify-center rounded-2xl border-2 border-dashed border-border bg-card p-4 hover:border-primary/60">
          <input
            type="file"
            accept={tool.slug === 'svg-to-png' ? '.svg' : 'image/*'}
            className="sr-only"
            onChange={onSingleFileChange}
          />
          <Upload size={24} className="text-primary" />
          <span className="mt-2 text-sm font-bold">
            {file ? `${file.name} (${Math.round(file.size / 1024)} KB)` : 'Choose an image file'}
          </span>
        </label>
      )}

      {/* 1. Passport Photo Controls */}
      {tool.slug === 'passport-photo-maker' && (
        <div className="mt-5 space-y-4 rounded-xl border p-4">
          <p className="text-xs font-bold uppercase tracking-wider text-primary">Passport Dimensions</p>
          <div className="flex flex-wrap gap-2">
            {[
              ['ssc', 'SSC / Police (3.5 x 4.5 cm)'],
              ['standard', 'Standard Passport (3 x 4 cm)'],
              ['square', 'Visa / Square (2 x 2 inch)'],
            ].map(([val, label]) => (
              <button
                key={val}
                type="button"
                onClick={() => setPreset(val as any)}
                className={`rounded-xl border px-3 py-2 text-xs font-semibold ${
                  preset === val ? 'bg-primary text-primary-foreground' : 'bg-secondary'
                }`}
              >
                {label}
              </button>
            ))}
          </div>
          <div>
            <label className="text-xs font-bold text-muted-foreground">Background Color:</label>
            <div className="mt-2 flex gap-3">
              {[
                ['#ffffff', 'Clean White'],
                ['#93c5fd', 'Light Blue (Official)'],
                ['#e2e8f0', 'Light Gray'],
              ].map(([color, name]) => (
                <button
                  key={color}
                  type="button"
                  onClick={() => setBgChoice(color)}
                  className={`flex items-center gap-2 rounded-lg border px-3 py-1.5 text-xs font-semibold ${
                    bgChoice === color ? 'border-primary ring-2 ring-primary/20' : ''
                  }`}
                >
                  <span className="h-4 w-4 rounded-full border" style={{ backgroundColor: color }} />
                  {name}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* 2. Photo Name & Date Controls */}
      {tool.slug === 'photo-date-namer' && (
        <div className="mt-5 grid gap-3 sm:grid-cols-2">
          <label className="text-sm font-semibold">
            Applicant Name
            <input
              value={applicantName}
              onChange={(e) => setApplicantName(e.target.value)}
              className="mt-1 w-full rounded-xl border bg-background p-3 text-sm"
              placeholder="e.g. BHOOPENDRA MANDOLIYA"
            />
          </label>
          <label className="text-sm font-semibold">
            Date of Photo (DOP)
            <input
              value={dopDate}
              onChange={(e) => setDopDate(e.target.value)}
              className="mt-1 w-full rounded-xl border bg-background p-3 text-sm"
              placeholder="DD-MM-YYYY"
            />
          </label>
        </div>
      )}

      {/* 3. Bulk Resizer Dimensions */}
      {tool.slug === 'bulk-image-resizer' && (
        <div className="mt-5 grid gap-3 sm:grid-cols-2 rounded-xl border p-4">
          <label className="text-sm font-semibold">
            Target Width (px)
            <input
              type="number"
              value={bulkWidth}
              onChange={(e) => setBulkWidth(e.target.value)}
              className="mt-1 w-full rounded-xl border bg-background p-3 text-sm"
            />
          </label>
          <label className="text-sm font-semibold">
            Target Height (px)
            <input
              type="number"
              value={bulkHeight}
              onChange={(e) => setBulkHeight(e.target.value)}
              className="mt-1 w-full rounded-xl border bg-background p-3 text-sm"
            />
          </label>
        </div>
      )}

      {/* 4. Replace Background Color */}
      {tool.slug === 'transparent-color-remover' && (
        <div className="mt-5 rounded-xl border p-4">
          <label className="text-sm font-semibold">Choose Replacement Color:</label>
          <div className="mt-2 flex items-center gap-3">
            <input
              type="color"
              value={targetBgColor}
              onChange={(e) => setTargetBgColor(e.target.value)}
              className="h-10 w-16 cursor-pointer rounded-lg border"
            />
            <span className="font-mono-app text-sm font-bold">{targetBgColor.toUpperCase()}</span>
          </div>
          <p className="mt-2 text-xs text-muted-foreground">
            Top-left corner color will be automatically recognized and replaced with this color.
          </p>
        </div>
      )}

      {/* 5. Aspect Ratio Controls */}
      {tool.slug === 'aspect-ratio-fitter' && (
        <div className="mt-5 space-y-2 rounded-xl border p-4">
          <p className="text-xs font-bold uppercase tracking-wider text-primary">Target Ratio</p>
          <div className="flex gap-2">
            {[
              ['16:9', '16:9 (YouTube)'],
              ['1:1', '1:1 (Square)'],
              ['4:3', '4:3 (Standard)'],
            ].map(([val, label]) => (
              <button
                key={val}
                type="button"
                onClick={() => setAspectRatio(val as any)}
                className={`rounded-xl border px-3 py-2 text-xs font-semibold ${
                  aspectRatio === val ? 'bg-primary text-primary-foreground' : 'bg-secondary'
                }`}
              >
                {label}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* 6. Grid Image Splitter Controls */}
      {tool.slug === 'image-splitter' && (
        <div className="mt-5 space-y-2 rounded-xl border p-4">
          <p className="text-xs font-bold uppercase tracking-wider text-primary">Grid Split Count</p>
          <div className="flex gap-2">
            {[
              ['3x3', '3x3 (9 Instagram Tiles)'],
              ['2x2', '2x2 (4 Square Tiles)'],
            ].map(([val, label]) => (
              <button
                key={val}
                type="button"
                onClick={() => setGridCount(val as any)}
                className={`rounded-xl border px-4 py-2 text-xs font-semibold ${
                  gridCount === val ? 'bg-primary text-primary-foreground' : 'bg-secondary'
                }`}
              >
                {label}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* 7. DPI Controls */}
      {tool.slug === 'dpi-converter' && (
        <div className="mt-5 space-y-2 rounded-xl border p-4">
          <p className="text-xs font-bold uppercase tracking-wider text-primary">Select Print DPI</p>
          <div className="flex gap-2">
            {['150', '200', '300'].map((dpi) => (
              <button
                key={dpi}
                type="button"
                onClick={() => setTargetDpi(dpi)}
                className={`rounded-xl border px-4 py-2 text-xs font-semibold ${
                  targetDpi === dpi ? 'bg-primary text-primary-foreground' : 'bg-secondary'
                }`}
              >
                {dpi} DPI
              </button>
            ))}
          </div>
        </div>
      )}

      {/* 8. Pixelate Controls */}
      {tool.slug === 'pixelate-censor' && (
        <div className="mt-4">
          <label className="text-sm font-semibold">Pixel Block Size: {pixelSize}px</label>
          <input
            type="range"
            min="6"
            max="30"
            value={pixelSize}
            onChange={(e) => setPixelSize(e.target.value)}
            className="mt-2 w-full"
          />
        </div>
      )}

      {/* 9. Meme Controls */}
      {tool.slug === 'meme-generator' && (
        <div className="mt-5 grid gap-3 sm:grid-cols-2">
          <label className="text-sm font-semibold">
            Top Text (Bold)
            <input
              value={topText}
              onChange={(e) => setTopText(e.target.value)}
              className="mt-1 w-full rounded-xl border bg-background p-3 text-sm"
              placeholder="TOP TEXT..."
            />
          </label>
          <label className="text-sm font-semibold">
            Bottom Text (Bold)
            <input
              value={bottomText}
              onChange={(e) => setBottomText(e.target.value)}
              className="mt-1 w-full rounded-xl border bg-background p-3 text-sm"
              placeholder="BOTTOM TEXT..."
            />
          </label>
        </div>
      )}

      {/* 10. Round Corner Controls */}
      {tool.slug === 'round-corner-maker' && (
        <div className="mt-4">
          <label className="text-sm font-semibold">Corner Radius (px): {borderRadius}px</label>
          <input
            type="range"
            min="10"
            max="120"
            value={borderRadius}
            onChange={(e) => setBorderRadius(e.target.value)}
            className="mt-2 w-full"
          />
        </div>
      )}

      {/* Action Button */}
      <div className="mt-5 flex gap-2">
        <button
          onClick={processImage}
          disabled={busy}
          className="flex items-center gap-2 rounded-xl bg-primary px-5 py-3 text-sm font-bold text-primary-foreground disabled:opacity-50"
        >
          <Sparkles size={16} /> {busy ? 'Processing...' : `Execute ${tool.name}`}
        </button>
        <button
          onClick={() => {
            setFile(null);
            setBulkFiles([]);
            setResultUrl('');
            setBulkResults([]);
            setAsciiText('');
            setError('');
          }}
          className="rounded-xl border px-4 py-3 text-sm font-bold text-muted-foreground"
        >
          <RefreshCcw size={15} />
        </button>
      </div>

      {error && <p className="mt-3 text-sm text-destructive">{error}</p>}

      {/* ASCII Output Box */}
      {asciiText && (
        <div className="mt-5 rounded-xl border border-primary/25 bg-primary/5 p-4">
          <div className="mb-2 flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-primary">ASCII Art Ready</span>
            <div className="flex gap-2">
              <button
                onClick={() => {
                  navigator.clipboard.writeText(asciiText);
                  setCopied(true);
                  setTimeout(() => setCopied(false), 2000);
                }}
                className="flex items-center gap-1 rounded-lg border bg-background px-3 py-1.5 text-xs font-bold"
              >
                {copied ? <Check size={14} className="text-emerald-500" /> : <Copy size={14} />} Copy
              </button>
              <button
                onClick={() => downloadText('ascii-art.txt', asciiText)}
                className="flex items-center gap-1 rounded-lg bg-primary px-3 py-1.5 text-xs font-bold text-primary-foreground"
              >
                <Download size={14} /> Download TXT
              </button>
            </div>
          </div>
          <pre className="max-h-96 overflow-auto bg-black p-3 font-mono text-[6px] leading-[6px] text-emerald-400 rounded-lg">
            {asciiText}
          </pre>
        </div>
      )}

      {/* Bulk Results Download List (Tiles / Multiple Images) */}
      {bulkResults.length > 0 && (
        <div className="mt-5 rounded-xl border border-primary/30 bg-primary/5 p-4">
          <p className="text-xs font-bold uppercase tracking-wide text-primary mb-3">
            Output Ready ({bulkResults.length} Files)
          </p>
          <div className="grid gap-2 sm:grid-cols-2">
            {bulkResults.map((item, idx) => (
              <div key={idx} className="flex items-center justify-between rounded-lg border bg-background p-2">
                <span className="text-xs font-semibold truncate max-w-[150px]">{item.name}</span>
                <a
                  href={item.url}
                  download={item.name}
                  className="rounded-lg bg-primary px-3 py-1 text-xs font-bold text-primary-foreground"
                >
                  Download
                </a>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Single Image Output Box */}
      {resultUrl && tool.slug !== 'color-palette-extractor' && !asciiText && !bulkResults.length && (
        <div className="mt-5 rounded-xl border border-border bg-background p-4">
          <div className="mb-3 flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-primary">Output Ready</span>
          </div>
          <img src={resultUrl} alt="Result" className="mx-auto max-h-80 rounded-xl object-contain border" />
          <a
            href={resultUrl}
            download={`${tool.slug}-output.${tool.slug === 'svg-to-png' || tool.slug === 'round-corner-maker' ? 'png' : 'jpg'}`}
            className="mt-4 inline-flex items-center gap-2 rounded-xl bg-primary px-4 py-2.5 text-xs font-bold text-primary-foreground"
          >
            <Download size={14} /> Download Final Image
          </a>
        </div>
      )}
    </div>
  );
}
