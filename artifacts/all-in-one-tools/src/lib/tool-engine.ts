export const cleanNumber = (value: string) => Number(value) || 0;
export const formatNumber = (value: number) => Number.isFinite(value) ? value.toLocaleString('en-IN', { maximumFractionDigits: 2 }) : '—';

export function transformText(slug: string, input: string, options: Record<string, string> = {}) {
  const lines = input.split(/\r?\n/);
  switch (slug) {
    case 'case-converter': {
      const mode = options.mode || 'sentence';
      if (mode === 'upper') return input.toUpperCase();
      if (mode === 'lower') return input.toLowerCase();
      if (mode === 'title') return input.toLowerCase().replace(/\b\w/g, (c) => c.toUpperCase());
      if (mode === 'camel') return input.toLowerCase().replace(/[^a-zA-Z0-9]+(.)/g, (_, c) => c.toUpperCase()).replace(/\s/g, '');
      return input.toLowerCase().replace(/(^\s*\w|[.!?]\s+\w)/g, (c) => c.toUpperCase());
    }
    case 'remove-extra-spaces': return input.replace(/[ \t]+/g, ' ').replace(/\n{3,}/g, '\n\n').trim();
    case 'text-sorter': return [...lines].filter(Boolean).sort((a, b) => a.localeCompare(b, undefined, { numeric: true })).join('\n');
    case 'duplicate-line-remover': return [...new Set(lines.map((l) => l.trim()).filter(Boolean))].join('\n');
    case 'text-reverser': return options.mode === 'lines' ? lines.reverse().join('\n') : [...input].reverse().join('');
    case 'text-cleaner': return input.replace(/[\u200B-\u200D\uFEFF]/g, '').replace(/[ \t]+/g, ' ').replace(/\n{3,}/g, '\n\n').trim();
    case 'slug-generator': return input.toLowerCase().normalize('NFKD').replace(/[^\w\s-]/g, '').trim().replace(/[\s_-]+/g, '-');
    default: return input;
  }
}

export function formatCode(input: string, type: string) {
  const source = input.trim();
  if (!source) return '';
  if (type === 'json-formatter') return JSON.stringify(JSON.parse(source), null, 2);
  if (type === 'json-minifier') return JSON.stringify(JSON.parse(source));
  let depth = 0;
  return source.replace(/>\s*</g, '><').split(/(?=<)|(?<=>)/).filter(Boolean).map((part) => {
    const closing = /^<\//.test(part);
    if (closing) depth = Math.max(0, depth - 1);
    const line = `${'  '.repeat(depth)}${part.trim()}`;
    if (/^<[^!/][^>]*[^/]>(?!.*<\/)/.test(part) && !closing) depth += 1;
    return line;
  }).join('\n').replace(/;\s*/g, ';\n').replace(/\{\s*/g, '{\n').replace(/\}\s*/g, '\n}\n');
}

export const makeRandomPassword = (length: number, symbols: boolean) => {
  const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz23456789' + (symbols ? '!@#$%^&*_-+=' : '');
  const values = new Uint32Array(length);
  crypto.getRandomValues(values);
  return Array.from(values, (n) => chars[n % chars.length]).join('');
};

export function numberToWords(num: number): string {
  if (!Number.isFinite(num)) return '';
  if (num === 0) return 'zero';
  if (num < 0) return `minus ${numberToWords(-num)}`;
  const small = ['','one','two','three','four','five','six','seven','eight','nine','ten','eleven','twelve','thirteen','fourteen','fifteen','sixteen','seventeen','eighteen','nineteen'];
  const tens = ['','','twenty','thirty','forty','fifty','sixty','seventy','eighty','ninety'];
  const underThousand = (n: number): string => n < 20 ? small[n] : n < 100 ? `${tens[Math.floor(n / 10)]}${n % 10 ? `-${small[n % 10]}` : ''}` : `${small[Math.floor(n / 100)]} hundred${n % 100 ? ` ${underThousand(n % 100)}` : ''}`;
  const chunks = [[1e9,'billion'],[1e6,'million'],[1e3,'thousand'],[1,'']] as [number,string][];
  let result = '';
  for (const [value, label] of chunks) { const chunk = Math.floor(num / value); if (chunk) { result += `${underThousand(chunk)}${label ? ` ${label}` : ''} `; num %= value; } }
  return result.trim();
}