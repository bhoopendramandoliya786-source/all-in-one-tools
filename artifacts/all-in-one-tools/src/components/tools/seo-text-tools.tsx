import React, { useState, useMemo } from 'react';
import { Copy, RefreshCcw, Sparkles, Check, Download, FileText, ArrowRightLeft } from 'lucide-react';
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

export default function SeoTextTool({ tool }: { tool: Tool }) {
  const [textA, setTextA] = useState('');
  const [textB, setTextB] = useState('');
  const [result, setResult] = useState('');
  const [copied, setCopied] = useState(false);
  const [error, setError] = useState('');

  // 1. Morse Code Dictionary
  const morseMap: Record<string, string> = useMemo(() => ({
    A: '.-', B: '-...', C: '-.-.', D: '-..', E: '.', F: '..-.',
    G: '--.', H: '....', I: '..', J: '.---', K: '-.-', L: '.-..',
    M: '--', N: '-.', O: '---', P: '.--.', Q: '--.-', R: '.-.',
    S: '...', T: '-', U: '..-', V: '...-', W: '.--', X: '-..-',
    Y: '-.--', Z: '--..', '1': '.----', '2': '..---', '3': '...--',
    '4': '....-', '5': '.....', '6': '-....', '7': '--...', '8': '---..',
    '9': '----.', '0': '-----', ' ': '/'
  }), []);

  // 2. Keyword Density Analyzer
  const keywordStats = useMemo(() => {
    if (tool.slug !== 'keyword-density' || !textA.trim()) return [];
    const words = textA.toLowerCase().match(/\b[a-zA-Z0-9_\u0900-\u097F]+\b/g) || [];
    const total = words.length;
    if (!total) return [];
    const freq: Record<string, number> = {};
    words.forEach((w) => {
      if (w.length > 2) freq[w] = (freq[w] || 0) + 1;
    });
    return Object.entries(freq)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 15)
      .map(([word, count]) => ({
        word,
        count,
        density: ((count / total) * 100).toFixed(1),
      }));
  }, [tool.slug, textA]);

  // 3. Process Button Logic
  const handleProcess = () => {
    setError('');
    if (!textA.trim() && tool.slug !== 'text-diff') {
      setError('Please provide input text.');
      return;
    }

    try {
      // Markdown to HTML
      if (tool.slug === 'markdown-to-html') {
        let html = textA
          .replace(/^### (.*$)/gim, '<h3>$1</h3>')
          .replace(/^## (.*$)/gim, '<h2>$1</h2>')
          .replace(/^# (.*$)/gim, '<h1>$1</h1>')
          .replace(/\*\*(.*?)\*\*/gim, '<strong>$1</strong>')
          .replace(/\*(.*?)\*/gim, '<em>$1</em>')
          .replace(/\[(.*?)\]\((.*?)\)/gim, '<a href="$2" target="_blank" rel="noopener">$1</a>')
          .replace(/\n$/gim, '<br />');
        setResult(html);
      }
      // HTML to Markdown
      else if (tool.slug === 'html-to-markdown') {
        let md = textA
          .replace(/<h1>(.*?)<\/h1>/gi, '# $1\n')
          .replace(/<h2>(.*?)<\/h2>/gi, '## $1\n')
          .replace(/<h3>(.*?)<\/h3>/gi, '### $1\n')
          .replace(/<strong>(.*?)<\/strong>/gi, '**$1**')
          .replace(/<b>(.*?)<\/b>/gi, '**$1**')
          .replace(/<em>(.*?)<\/em>/gi, '*$1*')
          .replace(/<i>(.*?)<\/i>/gi, '*$1*')
          .replace(/<a.*?href="(.*?)".*?>(.*?)<\/a>/gi, '[$2]($1)')
          .replace(/<br\s*\/?>/gi, '\n')
          .replace(/<p>(.*?)<\/p>/gi, '$1\n\n')
          .replace(/<[^>]+>/g, '');
        setResult(md.trim());
      }
      // Morse Code Converter
      else if (tool.slug === 'morse-code') {
        if (textA.includes('.') || textA.includes('-')) {
          // Decode Morse to Text
          const revMap = Object.fromEntries(Object.entries(morseMap).map(([k, v]) => [v, k]));
          const decoded = textA.trim().split(' ').map((code) => revMap[code] || (code === '/' ? ' ' : '')).join('');
          setResult(decoded || 'Invalid Morse sequence.');
        } else {
          // Encode Text to Morse
          const encoded = textA.toUpperCase().split('').map((char) => morseMap[char] || '').filter(Boolean).join(' ');
          setResult(encoded);
        }
      }
      // Text to Binary
      else if (tool.slug === 'binary-text-converter') {
        if (/^[01\s]+$/.test(textA.trim())) {
          // Binary to Text
          const chars = textA.trim().split(/\s+/).map((bin) => String.fromCharCode(parseInt(bin, 2)));
          setResult(chars.join(''));
        } else {
          // Text to Binary
          const bin = textA.split('').map((c) => c.charCodeAt(0).toString(2).padStart(8, '0')).join(' ');
          setResult(bin);
        }
      }
      // Extract Emails
      else if (tool.slug === 'extract-emails') {
        const emails = textA.match(/([a-zA-Z0-9._-]+@[a-zA-Z0-9._-]+\.[a-zA-Z0-9_-]+)/gi) || [];
        const unique = [...new Set(emails)];
        setResult(unique.length ? unique.join('\n') : 'No email addresses found.');
      }
      // Extract URLs
      else if (tool.slug === 'extract-urls') {
        const urls = textA.match(/(https?:\/\/[^\s]+)/gi) || [];
        const unique = [...new Set(urls)];
        setResult(unique.length ? unique.join('\n') : 'No URLs found.');
      }
      // Line Numberer
      else if (tool.slug === 'line-numberer') {
        const lines = textA.split('\n');
        setResult(lines.map((l, i) => `${i + 1}. ${l}`).join('\n'));
      }
      // Fallback
      else {
        setResult(textA);
      }
    } catch {
      setError('Processing failed. Please check your input.');
    }
  };

  const copyResult = () => {
    navigator.clipboard.writeText(result);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="max-w-3xl">
      {/* 1. Text Diff / Compare View */}
      {tool.slug === 'text-diff' ? (
        <div className="space-y-4">
          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <label className="text-xs font-bold uppercase tracking-wider text-muted-foreground">Original Text (Before)</label>
              <textarea
                value={textA}
                onChange={(e) => setTextA(e.target.value)}
                placeholder="Paste original version..."
                className="mt-1 min-h-[220px] w-full rounded-2xl border p-4 text-sm font-mono-app outline-none focus:border-primary"
              />
            </div>
            <div>
              <label className="text-xs font-bold uppercase tracking-wider text-muted-foreground">Modified Text (After)</label>
              <textarea
                value={textB}
                onChange={(e) => setTextB(e.target.value)}
                placeholder="Paste modified version..."
                className="mt-1 min-h-[220px] w-full rounded-2xl border p-4 text-sm font-mono-app outline-none focus:border-primary"
              />
            </div>
          </div>

          <div className="rounded-2xl border bg-secondary/20 p-4">
            <p className="text-xs font-bold uppercase tracking-wider text-primary mb-2">Comparison Result</p>
            <div className="space-y-1 font-mono-app text-sm">
              {textA.split('\n').map((line, idx) => {
                const modLine = textB.split('\n')[idx];
                if (modLine === undefined) {
                  return <div key={idx} className="bg-destructive/15 text-destructive px-2 py-0.5 rounded">- {line}</div>;
                }
                if (line !== modLine) {
                  return (
                    <div key={idx} className="space-y-0.5">
                      <div className="bg-destructive/15 text-destructive px-2 py-0.5 rounded">- {line}</div>
                      <div className="bg-emerald-500/15 text-emerald-600 dark:text-emerald-400 px-2 py-0.5 rounded">+ {modLine}</div>
                    </div>
                  );
                }
                return <div key={idx} className="text-muted-foreground px-2 py-0.5">  {line}</div>;
              })}
              {textB.split('\n').slice(textA.split('\n').length).map((line, idx) => (
                <div key={idx} className="bg-emerald-500/15 text-emerald-600 dark:text-emerald-400 px-2 py-0.5 rounded">+ {line}</div>
              ))}
            </div>
          </div>
        </div>
      ) : tool.slug === 'keyword-density' ? (
        /* 2. Keyword Density Analyzer View */
        <div className="space-y-4">
          <label className="text-sm font-semibold">Paste Your Article or Content</label>
          <textarea
            value={textA}
            onChange={(e) => setTextA(e.target.value)}
            placeholder="Type or paste text to analyze word frequencies..."
            className="min-h-[200px] w-full rounded-2xl border p-4 text-sm outline-none focus:border-primary"
          />
          {keywordStats.length > 0 && (
            <div className="rounded-2xl border p-4">
              <p className="text-xs font-bold uppercase tracking-wider text-primary mb-3">Top Recurring Keywords</p>
              <div className="grid grid-cols-2 gap-2 sm:grid-cols-3">
                {keywordStats.map(({ word, count, density }) => (
                  <div key={word} className="rounded-xl border bg-card p-2.5 flex items-center justify-between">
                    <span className="font-semibold text-sm truncate">{word}</span>
                    <span className="rounded-md bg-secondary px-2 py-0.5 text-xs font-bold text-muted-foreground">
                      {count}x ({density}%)
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      ) : (
        /* 3. Standard Text Operations View */
        <div className="space-y-4">
          <label className="text-sm font-semibold">Input Content</label>
          <textarea
            value={textA}
            onChange={(e) => setTextA(e.target.value)}
            placeholder="Paste text here..."
            className="min-h-[220px] w-full rounded-2xl border p-4 text-sm outline-none focus:border-primary font-mono-app"
          />

          <div className="flex gap-2">
            <button
              onClick={handleProcess}
              className="flex items-center gap-2 rounded-xl bg-primary px-5 py-3 text-sm font-bold text-primary-foreground"
            >
              <Sparkles size={16} /> Execute {tool.name}
            </button>
            <button
              onClick={() => {
                setTextA('');
                setResult('');
                setError('');
              }}
              className="rounded-xl border px-4 py-3 text-sm font-bold text-muted-foreground hover:text-foreground"
            >
              <RefreshCcw size={15} />
            </button>
          </div>

          {error && <p className="text-sm text-destructive">{error}</p>}

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
                    title="Copy text"
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
      )}
    </div>
  );
}
