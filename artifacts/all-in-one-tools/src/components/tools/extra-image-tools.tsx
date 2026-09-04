import React, { useState } from 'react';
import { Download, Upload, RefreshCcw, Sparkles, Image as ImageIcon } from 'lucide-react';
import type { Tool } from '@/data/tools';

export default function ExtraImageTool({ tool }: { tool: Tool }) {
  const [file, setFile] = useState<File | null>(null);
  const [resultUrl, setResultUrl] = useState('');
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState('');

  // 1. Passport Photo Maker State
  const [bgChoice, setBgChoice] = useState('#ffffff');
  const [preset, setPreset] = useState<'ssc' | 'standard' | 'square'>('ssc');

  // 2. Meme Generator State
  const [topText, setTopText] = useState('WHEN CODE BUILDS');
  const [bottomText, setBottomText] = useState('ON FIRST TRY');

  // 3. Color Palette State
  const [palette, setPalette] = useState<string[]>([]);

  // 4. Privacy Blur State
  const [blurRadius, setBlurRadius] = useState('15');

  // 5. Exam Photo Date & Name Stamp State
  const [applicantName, setApplicantName] = useState('STUDENT NAME');
  const [dopDate, setDopDate] = useState('04-09-2026');

  // 6. Round Corner State
  const [borderRadius, setBorderRadius] = useState('40');

  const onFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const f = e.target.files?.[0];
    if (f) {
      setFile(f);
      setResultUrl('');
      setError('');
      setPalette([]);
    }
  };

  const processImage = () => {
    if (!file) {
      setError('Please select an image file first.');
      return;
    }
    setBusy(true);
    setError('');

    // --- HEIC to JPG Converter ---
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
        img.onerror = () => {
          setError('Browser could not parse this format directly. Please try a standard photo.');
          setBusy(false);
        };
        img.src = event.target?.result as string;
      };
      reader.readAsDataURL(file);
      return;
    }

    // --- SVG to PNG Converter ---
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

    // --- HTML5 Canvas Tools ---
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
        ctx.strokeStyle = '#cccccc';
        ctx.lineWidth = 1;
        ctx.strokeRect(0, 0, targetW, targetH);

        setResultUrl(canvas.toDataURL('image/jpeg', 0.88));
      }

      // 2. Exam Photo Date & Name Stamp
      else if (tool.slug === 'photo-date-namer') {
        canvas.width = img.width;
        canvas.height = img.height;
        ctx.drawImage(img, 0, 0);

        const stripHeight = Math.max(50, Math.floor(img.height * 0.2));
        ctx.fillStyle = '#ffffff';
        ctx.fillRect(0, img.height - stripHeight, img.width, stripHeight);
        ctx.strokeStyle = '#000000';
        ctx.lineWidth = 2;
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

      // 3. Exam Signature Resizer
      else if (tool.slug === 'signature-resizer') {
        canvas.width = 280;
        canvas.height = 120;
        ctx.fillStyle = '#ffffff';
        ctx.fillRect(0, 0, 280, 120);
        ctx.drawImage(img, 10, 10, 260, 100);
        setResultUrl(canvas.toDataURL('image/jpeg', 0.75));
      }

      // 4. Meme Generator
      else if (tool.slug === 'meme-generator') {
        canvas.width = img.width;
        canvas.height = img.height;
        ctx.drawImage(img, 0, 0);

        const fontSize = Math.max(24, Math.floor(canvas.width / 12));
        ctx.font = `900 ${fontSize}px Impact, sans-serif`;
        ctx.fillStyle = '#ffffff';
        ctx.strokeStyle = '#000000';
        ctx.lineWidth = Math.max(3, Math.floor(fontSize / 8));
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

      // 5. Color Palette Extractor
      else if (tool.slug === 'color-palette-extractor') {
        canvas.width = 150;
        canvas.height = 150;
        ctx.drawImage(img, 0, 0, 150, 150);
        const imgData = ctx.getImageData(0, 0, 150, 150).data;
        const colors: string[] = [];

        const step = 4 * 80;
        for (let i = 0; i < imgData.length && colors.length < 5; i += step) {
          const r = imgData[i];
          const g = imgData[i + 1];
          const b = imgData[i + 2];
          const hex = `#${((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1)}`;
          if (!colors.includes(hex)) colors.push(hex);
        }
        setPalette(colors);
        setResultUrl(url);
      }

      // 6. Blur Face & Privacy Censor
      else if (tool.slug === 'blur-face') {
        canvas.width = img.width;
        canvas.height = img.height;
        ctx.drawImage(img, 0, 0);

        ctx.filter = `blur(${blurRadius}px)`;
        ctx.drawImage(
          canvas,
          canvas.width * 0.25,
          canvas.height * 0.15,
          canvas.width * 0.5,
          canvas.height * 0.4,
          canvas.width * 0.25,
          canvas.height * 0.15,
          canvas.width * 0.5,
          canvas.height * 0.4
        );
        ctx.filter = 'none';

        setResultUrl(canvas.toDataURL('image/jpeg', 0.9));
      }

      // 7. Round Corner Maker
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

      // 8. B&W Document Scanner
      else if (tool.slug === 'black-white-threshold') {
        canvas.width = img.width;
        canvas.height = img.height;
        ctx.drawImage(img, 0, 0);
        const imgData = ctx.getImageData(0, 0, canvas.width, canvas.height);
        const data = imgData.data;
        for (let i = 0; i < data.length; i += 4) {
          const brightness = 0.34 * data[i] + 0.5 * data[i + 1] + 0.16 * data[i + 2];
          const v = brightness >= 135 ? 255 : 0;
          data[i] = v;
          data[i + 1] = v;
          data[i + 2] = v;
        }
        ctx.putImageData(imgData, 0, 0);
        setResultUrl(canvas.toDataURL('image/jpeg', 0.9));
      }

      // 9. Negative Color Inverter
      else if (tool.slug === 'image-color-inverter') {
        canvas.width = img.width;
        canvas.height = img.height;
        ctx.drawImage(img, 0, 0);
        const imgData = ctx.getImageData(0, 0, canvas.width, canvas.height);
        const data = imgData.data;
        for (let i = 0; i < data.length; i += 4) {
          data[i] = 255 - data[i];
          data[i + 1] = 255 - data[i + 1];
          data[i + 2] = 255 - data[i + 2];
        }
        ctx.putImageData(imgData, 0, 0);
        setResultUrl(canvas.toDataURL('image/jpeg', 0.9));
      }

      // Fallback
      else {
        canvas.width = img.width;
        canvas.height = img.height;
        ctx.drawImage(img, 0, 0);
        setResultUrl(canvas.toDataURL('image/png'));
      }

      setBusy(false);
      URL.revokeObjectURL(url);
    };

    img.onerror = () => {
      setError('Could not process image.');
      setBusy(false);
    };
    img.src = url;
  };

  return (
    <div className="max-w-2xl">
      <label className="flex min-h-[160px] cursor-pointer flex-col items-center justify-center rounded-2xl border-2 border-dashed border-border bg-card p-4 hover:border-primary/60">
        <input
          type="file"
          accept={tool.slug === 'svg-to-png' ? '.svg' : 'image/*'}
          className="sr-only"
          onChange={onFileChange}
        />
        <Upload size={24} className="text-primary" />
        <span className="mt-2 text-sm font-bold">
          {file ? `${file.name} (${Math.round(file.size / 1024)} KB)` : 'Choose an image file'}
        </span>
      </label>

      {/* 1. Passport Photo Controls */}
      {tool.slug === 'passport-photo-maker' && (
        <div className="mt-5 space-y-4 rounded-xl border p-4">
          <p className="text-xs font-bold uppercase tracking-wider text-primary">Passport Presets</p>
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

      {/* 2. Photo Name & Date Stamp */}
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

      {/* 3. Meme Generator Controls */}
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

      {/* 4. Blur Privacy Controls */}
      {tool.slug === 'blur-face' && (
        <div className="mt-4">
          <label className="text-sm font-semibold">Blur Strength: {blurRadius}px</label>
          <input
            type="range"
            min="5"
            max="35"
            value={blurRadius}
            onChange={(e) => setBlurRadius(e.target.value)}
            className="mt-2 w-full"
          />
        </div>
      )}

      {/* 5. Round Corner Controls */}
      {tool.slug === 'round-corner-maker' && (
        <div className="mt-4">
          <label className="text-sm font-semibold">Border Radius (px): {borderRadius}px</label>
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

      <div className="mt-5 flex gap-2">
        <button
          onClick={processImage}
          disabled={busy}
          className="flex items-center gap-2 rounded-xl bg-primary px-5 py-3 text-sm font-bold text-primary-foreground disabled:opacity-50"
        >
          <Sparkles size={16} /> {busy ? 'Processing...' : `Generate ${tool.name}`}
        </button>
        <button
          onClick={() => {
            setFile(null);
            setResultUrl('');
            setError('');
          }}
          className="rounded-xl border px-4 py-3 text-sm font-bold text-muted-foreground"
        >
          <RefreshCcw size={15} />
        </button>
      </div>

      {error && <p className="mt-3 text-sm text-destructive">{error}</p>}

      {/* Palette Result */}
      {palette.length > 0 && (
        <div className="mt-5 rounded-xl border p-4 bg-card">
          <p className="text-xs font-bold uppercase tracking-wider text-primary mb-3">Extracted Color Palette</p>
          <div className="flex gap-2">
            {palette.map((hex) => (
              <div key={hex} className="flex-1 text-center">
                <div className="h-16 rounded-lg border shadow-sm" style={{ backgroundColor: hex }} />
                <span className="mt-1 block font-mono-app text-xs font-bold">{hex.toUpperCase()}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Output Download Box */}
      {resultUrl && tool.slug !== 'color-palette-extractor' && (
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
