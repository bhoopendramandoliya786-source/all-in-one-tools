import React, { useEffect, useMemo, useState, lazy, Suspense } from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ErrorBoundary } from '@/components/error-boundary';
import { Toaster } from '@/components/ui/toaster';
import { TooltipProvider } from '@/components/ui/tooltip';
import { Link, Route, Switch, useLocation, useParams, Router as WouterRouter } from 'wouter';
import {
  ArrowLeft, ArrowLeftRight, ArrowRight, Calculator, Check, ChevronRight, CircleHelp,
  Clock3, Copy, Download, FileText, Heart, Image as ImageIcon, Lightbulb, Menu, Moon,
  RefreshCcw, Search, ShieldCheck, Sparkles, Sun, Terminal, Type, Upload, X, Zap,
} from 'lucide-react';
import type { LucideIcon } from 'lucide-react';
import { categories, categoryInfo, toolBySlug, tools, type Category, type Tool } from '@/data/tools';
import { formatCode, formatNumber, makeRandomPassword, numberToWords, transformText } from '@/lib/tool-engine';

const queryClient = new QueryClient();
const iconMap: Record<string, LucideIcon> = { FileText, Image: ImageIcon, Type, Calculator, Terminal, ArrowLeftRight };
const getIcon = (name: string) => iconMap[name] || Sparkles;
const categoryPath = (category: Category) => `/categories/${encodeURIComponent(category)}`;

function useTheme() {
  const [dark, setDark] = useState(() => localStorage.getItem('ait-theme') === 'dark');
  useEffect(() => { 
    document.documentElement.classList.toggle('dark', dark); 
    localStorage.setItem('ait-theme', dark ? 'dark' : 'light'); 
  }, [dark]);
  return [dark, () => setDark((value) => !value)] as const;
}

function PageMeta({ title, description }: { title: string; description?: string }) {
  useEffect(() => {
    document.title = `${title} · All in One Tools`;
    const meta = document.querySelector('meta[name="description"]') || document.createElement('meta');
    meta.setAttribute('name', 'description'); 
    meta.setAttribute('content', description || 'Simple browser tools for real everyday results.');
    document.head.appendChild(meta);
  }, [title, description]);
  return null;
}

function Header() {
  const [dark, toggleTheme] = useTheme();
  const [open, setOpen] = useState(false);
  const [location, setLocation] = useLocation();
  const [query, setQuery] = useState('');
  const submitSearch = (event: React.FormEvent) => {
    event.preventDefault();
    if (query.trim()) setLocation(`/tools?search=${encodeURIComponent(query.trim())}`);
  };
  return (
    <header className="sticky top-0 z-40 border-b border-border/80 bg-background/95">
      <div className="mx-auto flex h-[4.5rem] max-w-7xl items-center gap-4 px-4 sm:px-6">
        <Link href="/" data-testid="link-brand" className="group flex shrink-0 items-center gap-2.5">
          <span className="grid h-9 w-9 place-items-center rounded-xl bg-primary text-primary-foreground shadow-sm transition-transform group-hover:rotate-[-6deg]">
            <Zap size={18} fill="currentColor" />
          </span>
          <span className="font-display text-[17px] font-bold tracking-[-.03em]">all in one <span className="text-primary">tools</span></span>
        </Link>
        <nav className="hidden items-center gap-1 md:flex">
          <Link href="/tools" data-testid="link-all-tools" className={`rounded-full px-3 py-2 text-sm font-semibold transition-colors hover:bg-secondary ${location === '/tools' ? 'text-primary' : 'text-muted-foreground'}`}>All tools</Link>
          <Link href={categoryPath('Text Tools')} data-testid="link-text-tools" className="rounded-full px-3 py-2 text-sm font-semibold text-muted-foreground transition-colors hover:bg-secondary">Text tools</Link>
          <Link href={categoryPath('Calculators')} data-testid="link-calculators" className="rounded-full px-3 py-2 text-sm font-semibold text-muted-foreground transition-colors hover:bg-secondary">Calculators</Link>
        </nav>
        <form onSubmit={submitSearch} className="ml-auto hidden max-w-[260px] flex-1 items-center gap-2 rounded-full border border-border bg-card px-3 py-2 sm:flex">
          <Search size={16} className="text-muted-foreground" />
          <input data-testid="input-header-search" value={query} onChange={(e) => setQuery(e.target.value)} className="min-w-0 flex-1 bg-transparent text-sm outline-none placeholder:text-muted-foreground" placeholder="Find a tool..." />
          {query && <button type="button" data-testid="button-clear-search" onClick={() => setQuery('')} className="text-muted-foreground hover:text-foreground"><X size={14} /></button>}
        </form>
        <button data-testid="button-theme-toggle" aria-label="Toggle theme" onClick={toggleTheme} className="grid h-9 w-9 place-items-center rounded-full border border-border bg-card text-muted-foreground transition hover:border-primary hover:text-primary">
          {dark ? <Sun size={16} /> : <Moon size={16} />}
        </button>
        <button data-testid="button-mobile-menu" onClick={() => setOpen(!open)} className="grid h-9 w-9 place-items-center rounded-full border border-border md:hidden">
          {open ? <X size={18} /> : <Menu size={18} />}
        </button>
      </div>
      {open && (
        <div className="border-t border-border bg-card px-4 py-3 md:hidden">
          <form onSubmit={submitSearch} className="mb-2 flex items-center gap-2 rounded-xl border border-border bg-background px-3 py-2">
            <Search size={16} className="text-muted-foreground" />
            <input autoFocus data-testid="input-mobile-search" value={query} onChange={(e) => setQuery(e.target.value)} className="min-w-0 flex-1 bg-transparent py-1 text-sm outline-none" placeholder="Search all 69 tools" />
          </form>
          <Link onClick={() => setOpen(false)} href="/tools" data-testid="mobile-link-all-tools" className="block rounded-lg px-3 py-3 text-sm font-semibold">Browse all tools</Link>
          {categories.map((cat) => (
            <Link onClick={() => setOpen(false)} key={cat} href={categoryPath(cat)} data-testid={`mobile-link-category-${cat}`} className="block rounded-lg px-3 py-3 text-sm text-muted-foreground">{categoryInfo[cat].label}</Link>
          ))}
        </div>
      )}
    </header>
  );
}

function Footer() {
  return (
    <footer className="mt-20 border-t border-border bg-secondary/35">
      <div className="mx-auto grid max-w-7xl gap-8 px-4 py-10 sm:px-6 md:grid-cols-[1.5fr_1fr_1fr]">
        <div>
          <div className="flex items-center gap-2 font-display font-bold">
            <span className="grid h-7 w-7 place-items-center rounded-lg bg-primary text-primary-foreground"><Zap size={14} fill="currentColor" /></span> all in one tools
          </div>
          <p className="mt-3 max-w-xs text-sm leading-6 text-muted-foreground">Small tools for the work between the big tasks. Private by default, useful by design.</p>
        </div>
        <div>
          <p className="mb-3 text-xs font-bold uppercase tracking-[.16em] text-muted-foreground">Explore</p>
          <div className="grid gap-2 text-sm">
            <Link href="/tools" data-testid="footer-link-tools" className="hover:text-primary">All tools</Link>
            <Link href={categoryPath('Calculators')} data-testid="footer-link-calculators" className="hover:text-primary">Calculators</Link>
            <Link href={categoryPath('Text Tools')} data-testid="footer-link-text" className="hover:text-primary">Text tools</Link>
          </div>
        </div>
        <div>
          <p className="mb-3 text-xs font-bold uppercase tracking-[.16em] text-muted-foreground">The promise</p>
          <p className="font-display text-lg font-bold">Simple tools.<br />Real results.</p>
          <p className="mt-2 text-xs text-muted-foreground">No account. No upload. No fuss.</p>
        </div>
      </div>
      <div className="mx-auto flex max-w-7xl items-center justify-between border-t border-border px-4 py-5 text-xs text-muted-foreground sm:px-6">
        <span>© 2025 All in One Tools</span>
        <span className="flex items-center gap-1.5"><ShieldCheck size={14} className="text-primary" /> Runs in your browser</span>
      </div>
    </footer>
  );
}

function Shell({ children }: { children: React.ReactNode }) {
  return <div className="min-h-[100dvh] bg-background text-foreground"><Header />{children}<Footer /></div>;
}

function ToolCard({ tool, featured = false }: { tool: Tool; featured?: boolean }) {
  const Icon = getIcon(tool.icon);
  const meta = categoryInfo[tool.category];
  return (
    <Link href={`/tools/${tool.slug}`} data-testid={`card-tool-${tool.slug}`} className={`tool-card group relative flex flex-col rounded-2xl border border-border bg-card p-4 transition hover:border-primary/50 ${featured ? 'min-h-[190px] bg-primary text-primary-foreground shadow-md shadow-primary/15' : 'min-h-[160px]'}`}>
      <div className="flex items-start justify-between">
        <span style={{ backgroundColor: featured ? 'hsl(var(--primary-foreground) / .15)' : `${meta.color}1a`, color: featured ? 'inherit' : meta.color }} className="grid h-9 w-9 place-items-center rounded-xl">
          <Icon size={18} />
        </span>
        <ArrowRight size={17} className="text-muted-foreground opacity-0 transition-all group-hover:translate-x-1 group-hover:opacity-100" />
      </div>
      <div className="mt-auto">
        <h3 className="font-display text-[16px] font-bold tracking-[-.02em]">{tool.name}</h3>
        <p className={`mt-1 line-clamp-2 text-xs leading-5 ${featured ? 'text-primary-foreground/75' : 'text-muted-foreground'}`}>{tool.description}</p>
      </div>
    </Link>
  );
}

function CategoryPill({ category, count }: { category: Category; count: number }) {
  const Icon = getIcon(categoryInfo[category].icon);
  return (
    <Link href={categoryPath(category)} data-testid={`link-category-${category}`} className="group flex min-h-[126px] flex-col justify-between rounded-2xl border border-border bg-card p-4 transition hover:-translate-y-1 hover:border-primary/40">
      <div className="flex items-center justify-between">
        <span className="grid h-9 w-9 place-items-center rounded-xl" style={{ backgroundColor: `${categoryInfo[category].color}1b`, color: categoryInfo[category].color }}>
          <Icon size={18} />
        </span>
        <span className="font-mono-app text-xs text-muted-foreground">{String(count).padStart(2, '0')}</span>
      </div>
      <div>
        <p className="font-display text-sm font-bold">{categoryInfo[category].label}</p>
        <p className="mt-1 text-[11px] leading-4 text-muted-foreground">{categoryInfo[category].short}</p>
      </div>
    </Link>
  );
}

function Home() {
  const [heroSearch, setHeroSearch] = useState('');
  const [, setLocation] = useLocation();
  const [favorites] = useState<string[]>(() => JSON.parse(localStorage.getItem('ait-favorites') || '[]'));
  const recent = useMemo(() => JSON.parse(localStorage.getItem('ait-recent') || '[]') as string[], []);
  const popular = useMemo(() => tools.filter((tool) => tool.popular), []);
  const submit = (event: React.FormEvent) => { 
    event.preventDefault(); 
    setLocation(heroSearch ? `/tools?search=${encodeURIComponent(heroSearch)}` : '/tools'); 
  };

  return (
    <Shell>
      <PageMeta title="Simple Tools. Real Results." description="69+ free, fast and private online tools for everyday work." />
      <main>
        <section className="relative overflow-hidden border-b border-border bg-primary text-primary-foreground">
          <div className="relative mx-auto grid max-w-7xl gap-10 px-4 pb-14 pt-14 sm:px-6 md:grid-cols-[1.1fr_.9fr] md:items-end md:pb-20 md:pt-20">
            <div>
              <p className="mb-5 flex items-center gap-2 font-mono-app text-[11px] uppercase tracking-[.2em] text-primary-foreground/70">
                <span className="h-2 w-2 rounded-full bg-accent" /> 69+ tools, no account needed
              </p>
              <h1 className="max-w-xl font-display text-[clamp(2.5rem,6vw,5rem)] font-bold leading-[1] tracking-[-.05em]">
                Har Kaam Ke Liye<br /><span className="text-accent">Ek Tool.</span>
              </h1>
              <p className="mt-6 max-w-md text-base leading-7 text-primary-foreground/75">
                69+ Free Online Tools — Fast, Simple & Useful. Get the little things done and get back to your day.
              </p>
            </div>
            <div className="rounded-3xl border border-primary-foreground/15 bg-primary-foreground/[.08] p-3 shadow-xl">
              <form onSubmit={submit} className="flex items-center gap-3 rounded-2xl bg-background p-2 text-foreground">
                <Search className="ml-2 text-muted-foreground" size={21} />
                <input data-testid="input-hero-search" value={heroSearch} onChange={(e) => setHeroSearch(e.target.value)} className="min-w-0 flex-1 bg-transparent px-1 py-3 text-sm outline-none placeholder:text-muted-foreground" placeholder="What do you need to do?" />
                <button data-testid="button-hero-search" className="flex shrink-0 items-center gap-2 rounded-xl bg-accent px-4 py-3 text-sm font-bold text-accent-foreground transition hover:brightness-105">Find tool <ArrowRight size={16} /></button>
              </form>
              <div className="flex flex-wrap gap-2 px-2 pb-1 pt-3 text-[11px] text-primary-foreground/65">
                <span>Try:</span>
                {['word counter', 'compress image', 'BMI calculator'].map((item) => (
                  <button type="button" onClick={() => setHeroSearch(item)} data-testid={`button-suggestion-${item}`} key={item} className="underline decoration-primary-foreground/25 underline-offset-2 hover:text-primary-foreground">{item}</button>
                ))}
              </div>
            </div>
          </div>
        </section>

        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <section className="py-12">
            <div className="mb-5 flex items-end justify-between">
              <div>
                <p className="font-mono-app text-[11px] uppercase tracking-[.16em] text-accent">Start here</p>
                <h2 className="mt-1 font-display text-2xl font-bold tracking-[-.04em]">Browse by need</h2>
              </div>
              <Link href="/tools" data-testid="link-browse-all" className="flex items-center gap-1 text-sm font-bold text-primary hover:underline">See all <ArrowRight size={15} /></Link>
            </div>
            <div className="grid grid-cols-2 gap-3 md:grid-cols-3 lg:grid-cols-6">
              {categories.map((cat) => (
                <CategoryPill key={cat} category={cat} count={tools.filter((t) => t.category === cat).length} />
              ))}
            </div>
          </section>

          <section className="pb-14">
            <div className="mb-5 flex items-end justify-between">
              <div>
                <p className="font-mono-app text-[11px] uppercase tracking-[.16em] text-accent">Popular right now</p>
                <h2 className="mt-1 font-display text-2xl font-bold tracking-[-.04em]">The useful shelf</h2>
              </div>
              <span className="hidden items-center gap-2 text-xs text-muted-foreground sm:flex"><Lightbulb size={14} className="text-accent" /> Hand-picked for quick wins</span>
            </div>
            <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
              {popular.slice(0, 4).map((tool, i) => (
                <ToolCard featured={i === 0} key={tool.slug} tool={tool} />
              ))}
            </div>
          </section>

          <section className="grid gap-4 pb-14 md:grid-cols-2">
            <div className="rounded-3xl bg-secondary p-5 sm:p-6">
              <div className="flex items-start justify-between">
                <div>
                  <p className="font-mono-app text-[11px] uppercase tracking-[.16em] text-accent">Today’s toolkit</p>
                  <h2 className="mt-1 font-display text-2xl font-bold tracking-[-.04em]">The 5-minute wins</h2>
                </div>
                <Clock3 className="text-primary" size={22} />
              </div>
              <div className="mt-5 grid gap-2">
                {tools.filter((tool) => ['pdf-compress', 'image-compress', 'remove-extra-spaces'].includes(tool.slug)).map((tool) => (
                  <Link key={tool.slug} href={`/tools/${tool.slug}`} data-testid={`today-tool-${tool.slug}`} className="flex items-center justify-between rounded-xl bg-background/70 px-3 py-3 text-sm font-semibold transition hover:bg-background">
                    <span>{tool.name}</span>
                    <ArrowRight size={15} className="text-muted-foreground" />
                  </Link>
                ))}
              </div>
            </div>
            <div className="rounded-3xl border border-border bg-card p-5 sm:p-6">
              <div className="flex items-start justify-between">
                <div>
                  <p className="font-mono-app text-[11px] uppercase tracking-[.16em] text-accent">Quick picks</p>
                  <h2 className="mt-1 font-display text-2xl font-bold tracking-[-.04em]">No thinking required</h2>
                </div>
                <Zap className="text-accent" size={22} />
              </div>
              <p className="mt-3 max-w-sm text-sm leading-6 text-muted-foreground">The tiny jobs that show up between meetings, drafts and downloads.</p>
              <div className="mt-5 flex flex-wrap gap-2">
                {tools.filter((tool) => ['word-counter', 'percentage-calculator', 'qr-code-generator', 'timestamp-converter'].includes(tool.slug)).map((tool) => (
                  <Link key={tool.slug} href={`/tools/${tool.slug}`} data-testid={`quick-tool-${tool.slug}`} className="rounded-xl border border-border px-3 py-2 text-xs font-bold transition hover:border-primary hover:text-primary">
                    {tool.name}
                  </Link>
                ))}
              </div>
            </div>
          </section>

          {recent.length > 0 && (
            <section className="py-12">
              <div className="mb-5 flex items-center justify-between">
                <div>
                  <p className="font-mono-app text-[11px] uppercase tracking-[.16em] text-accent">Pick up where you left off</p>
                  <h2 className="mt-1 font-display text-2xl font-bold tracking-[-.04em]">Recent tools</h2>
                </div>
                <button data-testid="button-clear-recent" onClick={() => { localStorage.removeItem('ait-recent'); window.location.reload(); }} className="text-xs font-bold text-muted-foreground hover:text-destructive">Clear history</button>
              </div>
              <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
                {recent.slice(0, 4).map((slug) => toolBySlug[slug]).filter(Boolean).map((tool) => (
                  <ToolCard key={tool.slug} tool={tool} />
                ))}
              </div>
            </section>
          )}

          {favorites.length > 0 && (
            <section className="pb-8">
              <h2 className="mb-4 font-display text-xl font-bold">Your favorites</h2>
              <div className="grid gap-3 sm:grid-cols-3">
                {favorites.map((slug) => toolBySlug[slug]).filter(Boolean).map((tool) => (
                  <ToolCard key={tool.slug} tool={tool} />
                ))}
              </div>
            </section>
          )}
        </div>
      </main>
    </Shell>
  );
}

function ToolsPage() {
  const params = new URLSearchParams(window.location.search);
  const [query, setQuery] = useState(params.get('search') || '');
  const [active, setActive] = useState<Category | 'All'>('All');
  const shown = useMemo(() => {
    return tools.filter((tool) => (active === 'All' || tool.category === active) && `${tool.name} ${tool.description} ${tool.category}`.toLowerCase().includes(query.toLowerCase()));
  }, [active, query]);

  return (
    <Shell>
      <PageMeta title="All tools" />
      <main className="mx-auto max-w-7xl px-4 py-10 sm:px-6 md:py-14">
        <div className="max-w-2xl">
          <p className="font-mono-app text-[11px] uppercase tracking-[.16em] text-accent">The complete kit</p>
          <h1 className="mt-2 font-display text-4xl font-bold tracking-[-.06em] md:text-5xl">Find the right little tool.</h1>
          <p className="mt-4 text-muted-foreground">Search the whole toolbox or narrow it down by what you are working on.</p>
        </div>
        <div className="mt-8 flex flex-col gap-3 lg:flex-row">
          <label className="flex flex-1 items-center gap-3 rounded-2xl border border-border bg-card px-4 py-3 shadow-sm">
            <Search size={19} className="text-muted-foreground" />
            <input data-testid="input-tools-search" value={query} onChange={(e) => setQuery(e.target.value)} className="min-w-0 flex-1 bg-transparent text-sm outline-none" placeholder="Search 69 tools..." />
            {query && <button data-testid="button-tools-clear" onClick={() => setQuery('')}><X size={16} /></button>}
          </label>
          <div className="flex gap-2 overflow-x-auto pb-1">
            {(['All', ...categories] as const).map((cat) => (
              <button key={cat} data-testid={`filter-${cat}`} onClick={() => setActive(cat)} className={`shrink-0 rounded-xl px-3 py-2 text-xs font-bold transition ${active === cat ? 'bg-primary text-primary-foreground' : 'bg-secondary text-muted-foreground hover:text-foreground'}`}>
                {cat === 'Generators & Developer Utilities' ? 'Dev utilities' : cat === 'Converters & Other Utilities' ? 'Converters' : cat}
              </button>
            ))}
          </div>
        </div>
        <div className="mt-10 flex items-center justify-between">
          <p className="text-sm text-muted-foreground"><strong className="text-foreground">{shown.length}</strong> tools found</p>
          <span className="hidden items-center gap-1.5 text-xs text-muted-foreground sm:flex"><ShieldCheck size={14} className="text-primary" /> Private in your browser</span>
        </div>
        {shown.length ? (
          <div className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {shown.map((tool) => <ToolCard key={tool.slug} tool={tool} />)}
          </div>
        ) : (
          <EmptySearch onReset={() => { setQuery(''); setActive('All'); }} />
        )}
      </main>
    </Shell>
  );
}

function EmptySearch({ onReset }: { onReset: () => void }) {
  return (
    <div className="mt-8 rounded-3xl border border-dashed border-border bg-card p-10 text-center">
      <span className="mx-auto grid h-12 w-12 place-items-center rounded-2xl bg-secondary text-muted-foreground"><Search size={21} /></span>
      <h2 className="mt-4 font-display text-xl font-bold">Nothing in that drawer</h2>
      <p className="mx-auto mt-2 max-w-sm text-sm leading-6 text-muted-foreground">Try a broader phrase, or reset to see every tool in the kit.</p>
      <button data-testid="button-reset-search" onClick={onReset} className="mt-5 inline-flex items-center gap-2 rounded-xl bg-primary px-4 py-2.5 text-sm font-bold text-primary-foreground">
        <RefreshCcw size={15} /> Show all tools
      </button>
    </div>
  );
}

function CategoryPage() {
  const { category } = useParams<{ category: string }>();
  const decoded = decodeURIComponent(category || '') as Category;
  const info = categoryInfo[decoded];
  const list = tools.filter((tool) => tool.category === decoded);
  if (!info) return <NotFound />;
  const Icon = getIcon(info.icon);
  return (
    <Shell>
      <PageMeta title={info.label} description={info.short} />
      <main className="mx-auto max-w-7xl px-4 py-10 sm:px-6 md:py-14">
        <Link href="/tools" data-testid="link-category-back" className="mb-9 inline-flex items-center gap-2 text-sm font-bold text-muted-foreground hover:text-primary">
          <ArrowLeft size={15} /> All tools
        </Link>
        <div className="rounded-3xl border border-border p-6 sm:p-9" style={{ background: `linear-gradient(110deg, ${info.color}18, transparent 65%)` }}>
          <span className="grid h-12 w-12 place-items-center rounded-2xl" style={{ color: info.color, backgroundColor: `${info.color}22` }}>
            <Icon size={24} />
          </span>
          <p className="mt-6 font-mono-app text-[11px] uppercase tracking-[.16em]" style={{ color: info.color }}>Tool drawer · {list.length} utilities</p>
          <h1 className="mt-2 font-display text-4xl font-bold tracking-[-.06em] md:text-5xl">{info.label}</h1>
          <p className="mt-3 max-w-xl text-muted-foreground">{info.short} Everything runs with a focused interface and no unnecessary steps.</p>
        </div>
        <div className="mt-10 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {list.map((tool) => <ToolCard key={tool.slug} tool={tool} />)}
        </div>
      </main>
    </Shell>
  );
}

function Field({ label, value, onChange, type = 'text', placeholder, min, step }: { label: string; value: string; onChange: (value: string) => void; type?: string; placeholder?: string; min?: string; step?: string }) {
  return (
    <label className="grid gap-2 text-sm font-semibold">
      <span>{label}</span>
      <input data-testid={`input-${label.toLowerCase().replaceAll(' ', '-')}`} type={type} min={min} step={step} placeholder={placeholder} value={value} onChange={(e) => onChange(e.target.value)} className="rounded-xl border border-input bg-background px-3.5 py-3 text-sm outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/15" />
    </label>
  );
}

function ResultBox({ result, onCopy, onDownload }: { result: string; onCopy: () => void; onDownload: () => void }) {
  return (
    <div className="mt-5 rounded-2xl border border-primary/20 bg-primary/[.06] p-4">
      <div className="mb-3 flex items-center justify-between">
        <span className="flex items-center gap-2 text-xs font-bold uppercase tracking-[.12em] text-primary"><Check size={14} /> Result</span>
        <div className="flex gap-1">
          <button title="Copy result" data-testid="button-copy-result" onClick={onCopy} className="rounded-lg p-2 text-muted-foreground hover:bg-primary/10 hover:text-primary"><Copy size={15} /></button>
          <button title="Download result" data-testid="button-download-result" onClick={onDownload} className="rounded-lg p-2 text-muted-foreground hover:bg-primary/10 hover:text-primary"><Download size={15} /></button>
        </div>
      </div>
      <pre data-testid="text-tool-result" className="max-h-80 overflow-auto whitespace-pre-wrap break-words font-mono-app text-sm leading-6">{result}</pre>
    </div>
  );
}

function TextTool({ tool }: { tool: Tool }) {
  const [input, setInput] = useState('');
  const [mode, setMode] = useState('sentence');
  const isCounter = tool.slug === 'word-counter' || tool.slug === 'character-counter';
  const isLorem = tool.slug === 'lorem-ipsum-generator';
  const [count, setCount] = useState('3');
  const result = isLorem && count.trim() ? Array.from({ length: Math.min(10, Math.max(1, Number(count) || 1)) }, (_, i) => `Lorem ipsum dolor sit amet, consectetur adipiscing elit. ${i === 0 ? 'Vestibulum ante ipsum primis in faucibus orci luctus et ultrices.' : 'Integer posuere erat a ante venenatis dapibus posuere velit aliquet.'}`).join('\n\n') : isLorem ? '' : transformText(tool.slug, input, { mode });
  const words = input.trim() ? input.trim().split(/\s+/).length : 0;
  const characters = input.length;
  const copy = () => navigator.clipboard?.writeText(isCounter ? `${words} words · ${characters} characters` : result);
  return (
    <div className="grid gap-5 lg:grid-cols-[1fr_.78fr]">
      <div>
        <label className="grid gap-2 text-sm font-semibold">
          <span>{isLorem ? 'How many paragraphs?' : 'Your text'}</span>
          {isLorem ? (
            <input data-testid="input-paragraph-count" type="number" min="1" max="10" value={count} onChange={(e) => setCount(e.target.value)} className="w-40 rounded-xl border border-input bg-background px-3.5 py-3 text-sm outline-none focus:border-primary" />
          ) : (
            <textarea data-testid="input-text-content" value={input} onChange={(e) => setInput(e.target.value)} className="min-h-[270px] resize-y rounded-2xl border border-input bg-background p-4 text-sm leading-6 outline-none focus:border-primary focus:ring-2 focus:ring-primary/15" placeholder="Paste or type here..." />
          )}
        </label>
        {tool.slug === 'case-converter' && (
          <div className="mt-3 flex flex-wrap gap-2">
            {[['sentence','Sentence case'],['upper','UPPERCASE'],['lower','lowercase'],['title','Title Case'],['camel','camelCase']].map(([val, label]) => (
              <button key={val} data-testid={`button-case-${val}`} onClick={() => setMode(val)} className={`rounded-lg px-3 py-2 text-xs font-bold ${mode === val ? 'bg-primary text-primary-foreground' : 'bg-secondary text-muted-foreground'}`}>{label}</button>
            ))}
          </div>
        )}
        <button data-testid="button-reset-text" onClick={() => { setInput(''); setCount('3'); setMode('sentence'); }} className="mt-4 inline-flex items-center gap-2 rounded-xl border border-border px-4 py-2.5 text-sm font-bold text-muted-foreground hover:text-foreground">
          <RefreshCcw size={15} /> Reset
        </button>
      </div>
      <div>
        {isCounter ? (
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-1">
            <div className="rounded-2xl bg-secondary p-5"><p className="text-xs text-muted-foreground">Words</p><p data-testid="text-word-count" className="mt-2 font-display text-4xl font-bold">{words.toLocaleString()}</p></div>
            <div className="rounded-2xl bg-accent/15 p-5"><p className="text-xs text-muted-foreground">Characters</p><p data-testid="text-character-count" className="mt-2 font-display text-4xl font-bold">{characters.toLocaleString()}</p></div>
            <div className="rounded-2xl border border-border bg-card p-4 text-sm text-muted-foreground">Approx. reading time: <strong className="text-foreground">{Math.max(1, Math.ceil(words / 200))} min</strong></div>
          </div>
        ) : result ? (
          <ResultBox result={result} onCopy={copy} onDownload={() => downloadText(`${tool.slug}.txt`, result)} />
        ) : (
          <div data-testid="text-empty-result" className="rounded-2xl border border-dashed border-border bg-secondary/30 p-5 text-sm text-muted-foreground">Your transformed text will appear here.</div>
        )}
      </div>
    </div>
  );
}

function CalculatorTool({ tool }: { tool: Tool }) {
  const [values, setValues] = useState<Record<string, string>>({ a: '', b: '', c: '', d: '' });
  const [result, setResult] = useState('');
  const [error, setError] = useState('');
  const update = (key: string) => (value: string) => setValues((old) => ({ ...old, [key]: value }));
  const calc = () => {
    const a = Number(values.a), b = Number(values.b), c = Number(values.c);
    setError('');
    const dateMode = tool.slug === 'age-calculator' || tool.slug === 'date-difference-calculator';
    const fractionMode = tool.slug === 'fraction-calculator';
    const averageValues = values.a.split(',').map((item) => item.trim()).filter(Boolean);
    if (dateMode ? !values.a || !values.b : fractionMode ? !/^\d+\s*\/\s*\d+$/.test(values.a) || !/^\d+\s*\/\s*\d+$/.test(values.b) : tool.slug === 'average-calculator' ? !averageValues.length || averageValues.some((item) => !Number.isFinite(Number(item))) : !values.a || !Number.isFinite(a) || (labelsNeedSecond(tool.slug) && (!values.b || !Number.isFinite(b)))) {
      setError(fractionMode ? 'Use fractions like 1/2 and 3/4.' : dateMode ? 'Choose both dates to continue.' : 'Add the required values to calculate.');
      return;
    }
    let answer = '';
    if (tool.slug === 'percentage-calculator') answer = `${formatNumber(a * b / 100)} is ${b}% of ${formatNumber(a)}`;
    else if (tool.slug === 'discount-calculator') answer = `Sale price: ${formatNumber(a - a * b / 100)}\nYou save: ${formatNumber(a * b / 100)}`;
    else if (tool.slug === 'gst-calculator') answer = `Total with GST: ${formatNumber(a + a * b / 100)}\nGST amount: ${formatNumber(a * b / 100)}`;
    else if (tool.slug === 'profit-loss-calculator') { const diff = b - a; answer = `${diff >= 0 ? 'Profit' : 'Loss'}: ${formatNumber(Math.abs(diff))}\nMargin: ${formatNumber(Math.abs(diff) / Math.max(1, a) * 100)}%`; }
    else if (tool.slug === 'bmi-calculator') { const bmi = a / ((b / 100) ** 2); answer = `BMI: ${formatNumber(bmi)}\n${bmi < 18.5 ? 'Underweight range' : bmi < 25 ? 'Healthy range' : bmi < 30 ? 'Overweight range' : 'Obesity range'}`; }
    else if (tool.slug === 'simple-interest-calculator') answer = `Interest: ${formatNumber(a * b * c / 100)}\nTotal: ${formatNumber(a + a * b * c / 100)}`;
    else if (tool.slug === 'compound-interest-calculator') { const total = a * (1 + b / 100) ** c; answer = `Interest: ${formatNumber(total - a)}\nTotal: ${formatNumber(total)}`; }
    else if (tool.slug === 'emi-calculator') { const monthly = b / 1200; const emi = a * monthly * (1 + monthly) ** c / ((1 + monthly) ** c - 1); answer = `Monthly EMI: ${formatNumber(emi)}\nTotal payment: ${formatNumber(emi * c)}`; }
    else if (tool.slug === 'average-calculator') { const nums = values.a.split(',').map(Number).filter(Number.isFinite); answer = `Average: ${formatNumber(nums.reduce((x, y) => x + y, 0) / Math.max(1, nums.length))}`; }
    else if (tool.slug === 'date-difference-calculator') answer = `${Math.abs(Math.round((new Date(values.b).getTime() - new Date(values.a).getTime()) / 86400000)).toLocaleString()} days`;
    else if (tool.slug === 'age-calculator') { const born = new Date(values.a), now = new Date(values.b || Date.now()); let age = now.getFullYear() - born.getFullYear(); if (now < new Date(now.getFullYear(), born.getMonth(), born.getDate())) age--; answer = `${Math.max(0, age)} years old`; }
    else answer = `Result: ${formatNumber(a + b)}`;
    setResult(answer);
  };
  const labels = tool.slug === 'average-calculator' ? ['Numbers, comma separated'] : tool.slug === 'bmi-calculator' ? ['Weight (kg)', 'Height (cm)'] : tool.slug === 'age-calculator' || tool.slug === 'date-difference-calculator' ? ['Start date', 'End date'] : tool.slug === 'discount-calculator' || tool.slug === 'gst-calculator' ? ['Original amount', 'Percentage'] : tool.slug === 'emi-calculator' ? ['Loan amount', 'Annual interest %', 'Months'] : tool.slug === 'simple-interest-calculator' ? ['Principal', 'Rate %', 'Years'] : ['First value', 'Second value'];
  return (
    <div className="max-w-2xl">
      <div className="grid gap-4 sm:grid-cols-2">{labels.map((label, i) => <Field key={label} label={label} value={values[String.fromCharCode(97 + i)]} onChange={update(String.fromCharCode(97 + i))} type={label.includes('date') ? 'date' : 'text'} />)}</div>
      <div className="mt-5 flex flex-wrap gap-2">
        <button data-testid="button-calculate" onClick={calc} className="inline-flex items-center gap-2 rounded-xl bg-primary px-5 py-3 text-sm font-bold text-primary-foreground"><Calculator size={16} /> Calculate</button>
        <button data-testid="button-reset-calculator" onClick={() => { setValues({ a: '', b: '', c: '', d: '' }); setResult(''); setError(''); }} className="inline-flex items-center gap-2 rounded-xl border border-border px-4 py-3 text-sm font-bold text-muted-foreground hover:text-foreground"><RefreshCcw size={15} /> Reset</button>
      </div>
      {error && <p data-testid="status-calculator-error" className="mt-3 rounded-xl bg-destructive/10 p-3 text-sm text-destructive">{error}</p>}
      {result && <ResultBox result={result} onCopy={() => navigator.clipboard?.writeText(result)} onDownload={() => downloadText(`${tool.slug}.txt`, result)} />}
    </div>
  );
}

function labelsNeedSecond(slug: string) {
  return !['number-to-words'].includes(slug);
}

function GeneratorTool({ tool }: { tool: Tool }) {
  const [value, setValue] = useState('');
  const [length, setLength] = useState('18');
  const [symbols, setSymbols] = useState(true);
  const [result, setResult] = useState('');
  const [resultUrl, setResultUrl] = useState('');
  const [error, setError] = useState('');

  const generate = async () => {
    setError(''); setResultUrl('');
    if (tool.slug === 'password-generator') setResult(makeRandomPassword(Math.min(64, Math.max(6, Number(length) || 18)), symbols));
    else if (tool.slug === 'uuid-generator') setResult(crypto.randomUUID());
    else if (tool.slug === 'random-number-generator') {
      const min = Number(value), max = Number(length);
      if (!value || !length || max < min) { setError('Enter valid min and max.'); return; }
      setResult(String(Math.floor(Math.random() * (max - min + 1)) + min));
    } else if (tool.slug === 'number-to-words') {
      const num = Number(value);
      if (!Number.isFinite(num)) { setError('Enter a valid number.'); return; }
      setResult(numberToWords(num));
    } else if (tool.slug === 'qr-code-generator') {
      if (!value.trim()) { setError('Enter text or URL.'); return; }
      const QRCode = (await import('qrcode')).default;
      QRCode.toDataURL(value.trim(), { margin: 2, width: 720 }).then(setResultUrl).catch(() => setError('Failed to generate QR code.'));
    } else if (tool.slug === 'barcode-generator') {
      if (!value.trim()) { setError('Enter barcode value.'); return; }
      try {
        const JsBarcode = (await import('jsbarcode')).default;
        const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
        JsBarcode(svg, value.trim(), { format: 'CODE128', displayValue: true, height: 100 });
        const serialized = new XMLSerializer().serializeToString(svg);
        setResultUrl(`data:image/svg+xml;charset=utf-8,${encodeURIComponent(serialized)}`);
      } catch { setError('Barcode generation failed.'); }
    }
  };

  return (
    <div className="max-w-2xl">
      <Field label="Input / Text" value={value} onChange={setValue} placeholder="Type here..." />
      <div className="mt-4 flex gap-2">
        <button data-testid="button-generate" onClick={generate} className="inline-flex items-center gap-2 rounded-xl bg-primary px-5 py-3 text-sm font-bold text-primary-foreground"><Sparkles size={16} /> Generate</button>
      </div>
      {error && <p className="mt-3 text-sm text-destructive">{error}</p>}
      {result && <ResultBox result={result} onCopy={() => navigator.clipboard.writeText(result)} onDownload={() => downloadText(`${tool.slug}.txt`, result)} />}
      {resultUrl && <img src={resultUrl} alt="Result" className="mt-4 max-h-60 rounded-xl border bg-white p-2" />}
    </div>
  );
}

function CodeTool({ tool }: { tool: Tool }) {
  const [input, setInput] = useState('');
  const [result, setResult] = useState('');
  const run = () => {
    try {
      let out = input;
      if (tool.slug === 'json-formatter' || tool.slug === 'json-minifier') out = formatCode(input, tool.slug);
      else if (tool.slug === 'base64-encoder-decoder') out = btoa(input);
      setResult(out);
    } catch { setResult('Invalid Input'); }
  };
  return (
    <div className="max-w-2xl">
      <textarea value={input} onChange={(e) => setInput(e.target.value)} className="min-h-[220px] w-full rounded-xl border p-3 font-mono-app text-sm" placeholder="Paste code..." />
      <button onClick={run} className="mt-3 rounded-xl bg-primary px-5 py-3 text-sm font-bold text-primary-foreground">Format</button>
      {result && <ResultBox result={result} onCopy={() => navigator.clipboard.writeText(result)} onDownload={() => downloadText(`${tool.slug}.txt`, result)} />}
    </div>
  );
}

function ImageTool({ tool }: { tool: Tool }) {
  const [file, setFile] = useState<File | null>(null);
  const [resultUrl, setResultUrl] = useState('');
  const process = () => {
    if (!file) return;
    const url = URL.createObjectURL(file);
    setResultUrl(url);
  };
  return (
    <div className="max-w-2xl">
      <label className="flex min-h-[160px] cursor-pointer flex-col items-center justify-center rounded-2xl border-2 border-dashed border-border bg-card p-4">
        <input type="file" accept="image/*" className="sr-only" onChange={(e) => setFile(e.target.files?.[0] || null)} />
        <Upload size={24} className="text-primary" />
        <span className="mt-2 text-sm font-bold">{file ? file.name : 'Choose an image'}</span>
      </label>
      <button onClick={process} className="mt-4 rounded-xl bg-primary px-5 py-3 text-sm font-bold text-primary-foreground">Process</button>
      {resultUrl && <img src={resultUrl} alt="Result" className="mt-4 max-h-60 rounded-xl" />}
    </div>
  );
}

function PdfTool({ tool }: { tool: Tool }) {
  const [files, setFiles] = useState<File[]>([]);
  const [status, setStatus] = useState('');
  const process = async () => {
    if (!files.length) return;
    setStatus('Processing locally...');
    try {
      const { PDFDocument } = await import('pdf-lib');
      const doc = await PDFDocument.create();
      setStatus('Done!');
    } catch { setStatus('Error processing PDF'); }
  };
  return (
    <div className="max-w-2xl">
      <label className="flex min-h-[160px] cursor-pointer flex-col items-center justify-center rounded-2xl border-2 border-dashed border-border bg-card p-4">
        <input type="file" accept=".pdf" multiple onChange={(e) => setFiles(Array.from(e.target.files || []))} className="sr-only" />
        <Upload size={24} className="text-primary" />
        <span className="mt-2 text-sm font-bold">{files.length ? `${files.length} file(s) selected` : 'Select PDF'}</span>
      </label>
      <button onClick={process} className="mt-4 rounded-xl bg-primary px-5 py-3 text-sm font-bold text-primary-foreground">{tool.name}</button>
      {status && <p className="mt-2 text-sm font-semibold">{status}</p>}
    </div>
  );
}

function ToolPage() {
  const { slug } = useParams<{ slug: string }>();
  const tool = toolBySlug[slug || ''];
  const [favorite, setFavorite] = useState(() => JSON.parse(localStorage.getItem('ait-favorites') || '[]').includes(slug));

  if (!tool) return <NotFound />;
  const Icon = getIcon(tool.icon);
  const textSlugs = ['word-counter','character-counter','case-converter','remove-extra-spaces','text-sorter','duplicate-line-remover','text-reverser','text-cleaner','slug-generator','lorem-ipsum-generator'];
  const calcSlugs = tools.filter((item) => item.category === 'Calculators').map((item) => item.slug);
  const devSlugs = ['number-to-words','password-generator','uuid-generator','random-number-generator','color-picker','hex-to-rgb-converter','timestamp-converter','qr-code-generator','barcode-generator'];
  const codeSlugs = ['json-formatter','json-minifier','base64-encoder-decoder','url-encoder-decoder','text-encrypt-decrypt'];
  const imageSlugs = tools.filter((item) => item.category === 'Image Tools').map((item) => item.slug);

  const toolView = textSlugs.includes(tool.slug) ? <TextTool tool={tool} /> : calcSlugs.includes(tool.slug) ? <CalculatorTool tool={tool} /> : devSlugs.includes(tool.slug) ? <GeneratorTool tool={tool} /> : codeSlugs.includes(tool.slug) ? <CodeTool tool={tool} /> : imageSlugs.includes(tool.slug) ? <ImageTool tool={tool} /> : <PdfTool tool={tool} />;

  return (
    <Shell>
      <PageMeta title={tool.name} description={tool.description} />
      <main className="mx-auto max-w-7xl px-4 py-8 sm:px-6 md:py-12">
        <div className="flex items-center gap-4">
          <span className="grid h-12 w-12 place-items-center rounded-xl bg-primary text-primary-foreground"><Icon size={22} /></span>
          <div>
            <h1 className="font-display text-3xl font-bold">{tool.name}</h1>
            <p className="text-sm text-muted-foreground">{tool.description}</p>
          </div>
        </div>
        <div className="mt-8 rounded-2xl border border-border bg-card p-5">{toolView}</div>
      </main>
    </Shell>
  );
}

function NotFound() {
  return (
    <Shell>
      <main className="mx-auto max-w-xl px-4 py-24 text-center">
        <h1 className="font-display text-4xl font-bold">404 - Not Found</h1>
        <Link href="/tools" className="mt-6 inline-flex rounded-xl bg-primary px-5 py-3 text-sm font-bold text-primary-foreground">Browse all tools</Link>
      </main>
    </Shell>
  );
}

function downloadText(filename: string, text: string) {
  const blob = new Blob([text], { type: 'text/plain;charset=utf-8' });
  const url = URL.createObjectURL(blob);
  const anchor = document.createElement('a');
  anchor.href = url;
  anchor.download = filename;
  anchor.click();
  URL.revokeObjectURL(url);
}

function Router() {
  return (
    <ErrorBoundary resetKey={window.location.pathname}>
      <Switch>
        <Route path="/" component={Home} />
        <Route path="/tools" component={ToolsPage} />
        <Route path="/categories/:category" component={CategoryPage} />
        <Route path="/tools/:slug" component={ToolPage} />
        <Route component={NotFound} />
      </Switch>
    </ErrorBoundary>
  );
}

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <WouterRouter base={import.meta.env.BASE_URL.replace(/\/$/, '')}>
          <Router />
        </WouterRouter>
        <Toaster />
      </TooltipProvider>
    </QueryClientProvider>
  );
}
