import React, { useState, useMemo } from 'react';
import { Copy, RefreshCcw, Sparkles, Check, Download, Terminal, QrCode, ShieldAlert } from 'lucide-react';
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

// Luhn Algorithm Checker
function validateLuhn(numberStr: string): boolean {
  const sanitized = numberStr.replace(/\D/g, '');
  if (sanitized.length < 13 || sanitized.length > 19) return false;
  let sum = 0;
  let shouldDouble = false;
  for (let i = sanitized.length - 1; i >= 0; i--) {
    let digit = parseInt(sanitized.charAt(i), 10);
    if (shouldDouble) {
      digit *= 2;
      if (digit > 9) digit -= 9;
    }
    sum += digit;
    shouldDouble = !shouldDouble;
  }
  return sum % 10 === 0;
}

export default function DevUtilityTool({ tool }: { tool: Tool }) {
  const [inputVal, setInputVal] = useState('');
  const [secondaryVal, setSecondaryVal] = useState('');
  const [result, setResult] = useState('');
  const [qrCodeUrl, setQrCodeUrl] = useState('');
  const [copied, setCopied] = useState(false);
  const [error, setError] = useState('');

  // 1. UPI QR Generator State
  const [upiId, setUpiId] = useState('');
  const [upiName, setUpiName] = useState('');
  const [upiAmount, setUpiAmount] = useState('');

  // 2. WiFi QR State
  const [wifiSsid, setWifiSsid] = useState('');
  const [wifiPass, setWifiPass] = useState('');
  const [wifiType, setWifiType] = useState('WPA');

  // 3. Regex Tester Matches
  const regexMatches = useMemo(() => {
    if (tool.slug !== 'regex-tester' || !inputVal.trim() || !secondaryVal.trim()) return [];
    try {
      const re = new RegExp(inputVal, 'g');
      const matches = [...secondaryVal.matchAll(re)];
      return matches.map((m) => m[0]);
    } catch {
      return [];
    }
  }, [tool.slug, inputVal, secondaryVal]);

  const handleRun = async () => {
    setError('');
    setResult('');
    setQrCodeUrl('');

    try {
      // 1. JWT Decoder
      if (tool.slug === 'jwt-decoder') {
        const parts = inputVal.trim().split('.');
        if (parts.length < 2) throw new Error('Invalid JWT format. A token must have header and payload separated by dots.');
        const decodePart = (str: string) => {
          const base64 = str.replace(/-/g, '+').replace(/_/g, '/');
          const jsonPayload = decodeURIComponent(
            atob(base64)
              .split('')
              .map((c) => '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2))
              .join('')
          );
          return JSON.parse(jsonPayload);
        };
        const header = decodePart(parts[0]);
        const payload = decodePart(parts[1]);
        setResult(`// --- HEADER ---\n${JSON.stringify(header, null, 2)}\n\n// --- PAYLOAD (DATA) ---\n${JSON.stringify(payload, null, 2)}`);
      }

      // 2. SQL Formatter
      else if (tool.slug === 'sql-formatter') {
        if (!inputVal.trim()) throw new Error('Please enter a SQL query.');
        const formatted = inputVal
          .replace(/\s+/g, ' ')
          .replace(/\b(SELECT|FROM|WHERE|GROUP BY|ORDER BY|HAVING|LIMIT|JOIN|LEFT JOIN|RIGHT JOIN|INNER JOIN|UNION|VALUES|SET|INSERT INTO|UPDATE|DELETE FROM)\b/gi, '\n$1')
          .replace(/,\s*/g, ',\n  ')
          .replace(/\bAND\b/gi, '\n  AND')
          .replace(/\bOR\b/gi, '\n  OR')
          .trim();
        setResult(formatted);
      }

      // 3. MD5 / SHA Hash Generator
      else if (tool.slug === 'hash-generator') {
        if (!inputVal) throw new Error('Please enter text to hash.');
        const msgBuffer = new TextEncoder().encode(inputVal);
        const hash256Buffer = await crypto.subtle.digest('SHA-256', msgBuffer);
        const hash256 = Array.from(new Uint8Array(hash256Buffer)).map((b) => b.toString(16).padStart(2, '0')).join('');
        const hash512Buffer = await crypto.subtle.digest('SHA-512', msgBuffer);
        const hash512 = Array.from(new Uint8Array(hash512Buffer)).map((b) => b.toString(16).padStart(2, '0')).join('');
        setResult(`SHA-256:\n${hash256}\n\nSHA-512:\n${hash512}`);
      }

      // 4. UPI Payment QR Generator
      else if (tool.slug === 'upi-qr-generator') {
        if (!upiId.trim()) throw new Error('Please enter your UPI ID (e.g. yourname@upi).');
        const upiUrl = `upi://pay?pa=${encodeURIComponent(upiId.trim())}&pn=${encodeURIComponent(upiName.trim() || 'Merchant')}${upiAmount ? `&am=${encodeURIComponent(upiAmount)}` : ''}&cu=INR`;
        const QRCode = (await import('qrcode')).default;
        const qr = await QRCode.toDataURL(upiUrl, { margin: 2, width: 640 });
        setQrCodeUrl(qr);
        setResult(`UPI String: ${upiUrl}`);
      }

      // 5. WiFi QR Generator
      else if (tool.slug === 'wifi-qr-generator') {
        if (!wifiSsid.trim()) throw new Error('Please enter WiFi Network Name (SSID).');
        const wifiString = `WIFI:T:${wifiType};S:${wifiSsid.trim()};P:${wifiPass};;`;
        const QRCode = (await import('qrcode')).default;
        const qr = await QRCode.toDataURL(wifiString, { margin: 2, width: 640 });
        setQrCodeUrl(qr);
        setResult(`WiFi Config: ${wifiString}`);
      }

      // 6. Credit Card Luhn Validator
      else if (tool.slug === 'credit-card-validator') {
        if (!inputVal.trim()) throw new Error('Please enter a card number.');
        const isValid = validateLuhn(inputVal);
        const clean = inputVal.replace(/\D/g, '');
        let cardType = 'Unknown Card';
        if (/^4/.test(clean)) cardType = 'Visa Card';
        else if (/^5[1-5]/.test(clean)) cardType = 'MasterCard';
        else if (/^3[47]/.test(clean)) cardType = 'American Express';
        else if (/^6(?:011|5)/.test(clean)) cardType = 'Discover / RuPay';
        setResult(`Card Type: ${cardType}\nNumber Checked: ${clean.replace(/(\d{4})/g, '$1 ').trim()}\nLuhn Checksum Status: ${isValid ? 'VALID CARD STRUCTURE ✓' : 'INVALID CARD NUMBER ✗'}`);
      }

      // 7. HTML Entity Encoder
      else if (tool.slug === 'html-entity-encoder') {
        const encoded = inputVal
          .replace(/&/g, '&amp;')
          .replace(/</g, '&lt;')
          .replace(/>/g, '&gt;')
          .replace(/"/g, '&quot;')
          .replace(/'/g, '&#39;');
        setResult(encoded);
      }

      // 8. User Agent Inspector
      else if (tool.slug === 'user-agent-parser') {
        setResult(`User Agent String:\n${navigator.userAgent}\n\nPlatform / OS: ${navigator.platform}\nLanguage: ${navigator.language}\nCookies Enabled: ${navigator.cookieEnabled ? 'Yes' : 'No'}\nScreen Resolution: ${window.screen.width} x ${window.screen.height}`);
      }

      // Fallback
      else {
        setResult(inputVal);
      }
    } catch (err: any) {
      setError(err?.message || 'Operation failed.');
    }
  };

  const copyResult = () => {
    navigator.clipboard.writeText(result);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="max-w-3xl">
      {/* 1. UPI Payment QR Maker View */}
      {tool.slug === 'upi-qr-generator' ? (
        <div className="space-y-4">
          <div className="grid gap-3 sm:grid-cols-3">
            <div>
              <label className="text-sm font-semibold">UPI ID / VPA *</label>
              <input
                value={upiId}
                onChange={(e) => setUpiId(e.target.value)}
                placeholder="e.g. 9876543210@paytm"
                className="mt-1 w-full rounded-xl border bg-background p-3 text-sm"
              />
            </div>
            <div>
              <label className="text-sm font-semibold">Name / Shop Name</label>
              <input
                value={upiName}
                onChange={(e) => setUpiName(e.target.value)}
                placeholder="e.g. Bhoopendra Store"
                className="mt-1 w-full rounded-xl border bg-background p-3 text-sm"
              />
            </div>
            <div>
              <label className="text-sm font-semibold">Fixed Amount (₹ Optional)</label>
              <input
                type="number"
                value={upiAmount}
                onChange={(e) => setUpiAmount(e.target.value)}
                placeholder="Leave blank for any"
                className="mt-1 w-full rounded-xl border bg-background p-3 text-sm"
              />
            </div>
          </div>
        </div>
      ) : tool.slug === 'wifi-qr-generator' ? (
        /* 2. WiFi QR Generator View */
        <div className="space-y-4">
          <div className="grid gap-3 sm:grid-cols-3">
            <div>
              <label className="text-sm font-semibold">WiFi SSID (Name) *</label>
              <input
                value={wifiSsid}
                onChange={(e) => setWifiSsid(e.target.value)}
                placeholder="e.g. Airtel_Home_5G"
                className="mt-1 w-full rounded-xl border bg-background p-3 text-sm"
              />
            </div>
            <div>
              <label className="text-sm font-semibold">Password</label>
              <input
                type="password"
                value={wifiPass}
                onChange={(e) => setWifiPass(e.target.value)}
                placeholder="WiFi password"
                className="mt-1 w-full rounded-xl border bg-background p-3 text-sm"
              />
            </div>
            <div>
              <label className="text-sm font-semibold">Security</label>
              <select
                value={wifiType}
                onChange={(e) => setWifiType(e.target.value)}
                className="mt-1 w-full rounded-xl border bg-background p-3 text-sm"
              >
                <option value="WPA">WPA / WPA2 (Common)</option>
                <option value="WEP">WEP (Old)</option>
                <option value="nopass">No Password (Open)</option>
              </select>
            </div>
          </div>
        </div>
      ) : tool.slug === 'regex-tester' ? (
        /* 3. Regex Pattern Tester View */
        <div className="space-y-4">
          <div>
            <label className="text-sm font-semibold">Regular Expression Pattern (e.g. \d+ or [a-z]+)</label>
            <input
              value={inputVal}
              onChange={(e) => setInputVal(e.target.value)}
              placeholder="e.g. [A-Z]{5}[0-9]{4}[A-Z]{1} (PAN Card Regex)"
              className="mt-1 w-full rounded-xl border bg-background p-3 text-sm font-mono-app"
            />
          </div>
          <div>
            <label className="text-sm font-semibold">Test Text String</label>
            <textarea
              value={secondaryVal}
              onChange={(e) => setSecondaryVal(e.target.value)}
              placeholder="Paste text to test match..."
              className="mt-1 min-h-[160px] w-full rounded-xl border p-3 text-sm font-mono-app"
            />
          </div>
          {regexMatches.length > 0 && (
            <div className="rounded-xl border border-emerald-500/30 bg-emerald-500/5 p-4">
              <p className="text-xs font-bold uppercase tracking-wider text-emerald-600 dark:text-emerald-400 mb-2">
                Matched Patterns Found ({regexMatches.length})
              </p>
              <div className="flex flex-wrap gap-2">
                {regexMatches.map((m, i) => (
                  <span key={i} className="rounded-lg bg-background border px-2.5 py-1 text-xs font-mono-app font-bold">
                    {m}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>
      ) : (
        /* 4. General Input Box (JWT, SQL, Hash, Cards) */
        <div className="space-y-4">
          <label className="text-sm font-semibold">
            {tool.slug === 'jwt-decoder'
              ? 'Paste Encoded JWT Token (eyJhbGci...)'
              : tool.slug === 'credit-card-validator'
              ? 'Card Number to Validate'
              : tool.slug === 'sql-formatter'
              ? 'Paste Messy SQL Query'
              : 'Input Text / Payload'}
          </label>
          <textarea
            value={inputVal}
            onChange={(e) => setInputVal(e.target.value)}
            placeholder="Type or paste here..."
            className="min-h-[200px] w-full rounded-2xl border p-4 text-sm font-mono-app outline-none focus:border-primary"
          />
        </div>
      )}

      {/* Action Trigger */}
      <div className="mt-5 flex gap-2">
        <button
          onClick={handleRun}
          className="flex items-center gap-2 rounded-xl bg-primary px-5 py-3 text-sm font-bold text-primary-foreground"
        >
          <Sparkles size={16} /> Execute {tool.name}
        </button>
        <button
          onClick={() => {
            setInputVal('');
            setSecondaryVal('');
            setResult('');
            setError('');
            setQrCodeUrl('');
          }}
          className="rounded-xl border px-4 py-3 text-sm font-bold text-muted-foreground hover:text-foreground"
        >
          <RefreshCcw size={15} />
        </button>
      </div>

      {error && <p className="mt-3 text-sm text-destructive">{error}</p>}

      {/* QR Code Output Box */}
      {qrCodeUrl && (
        <div className="mt-5 rounded-2xl border bg-card p-5 text-center">
          <p className="text-xs font-bold uppercase tracking-wider text-primary mb-3">Scan Code with Mobile Camera</p>
          <img src={qrCodeUrl} alt="QR Code" className="mx-auto h-52 w-52 rounded-xl border bg-white p-2 shadow-sm" />
          <a
            href={qrCodeUrl}
            download={`${tool.slug}-code.png`}
            className="mt-4 inline-flex items-center gap-2 rounded-xl bg-primary px-4 py-2 text-xs font-bold text-primary-foreground"
          >
            <Download size={14} /> Download QR Code Image
          </a>
        </div>
      )}

      {/* Text Output Box */}
      {result && (
        <div className="mt-5 rounded-2xl border border-primary/25 bg-primary/5 p-4">
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-bold uppercase tracking-wider text-primary flex items-center gap-1.5">
              <Check size={14} /> Result Output
            </span>
            <div className="flex gap-1">
              <button
                onClick={copyResult}
                className="rounded-lg p-2 text-muted-foreground hover:bg-primary/10 hover:text-primary"
                title="Copy result"
              >
                {copied ? <Check size={15} className="text-emerald-500" /> : <Copy size={15} />}
              </button>
              <button
                onClick={() => downloadText(`${tool.slug}-result.txt`, result)}
                className="rounded-lg p-2 text-muted-foreground hover:bg-primary/10 hover:text-primary"
                title="Download text"
              >
                <Download size={15} />
              </button>
            </div>
          </div>
          <pre className="max-h-80 overflow-auto whitespace-pre-wrap break-words font-mono-app text-sm leading-6">
            {result}
          </pre>
        </div>
      )}
    </div>
  );
}
