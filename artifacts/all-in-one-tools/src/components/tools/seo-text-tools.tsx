import React from 'react';
import type { Tool } from '@/data/tools';

export default function SeoTextTool({ tool }: { tool: Tool }) {
  return (
    <div className="rounded-xl border border-dashed p-6 text-center text-muted-foreground">
      <h3 className="font-bold text-foreground">{tool.name}</h3>
      <p className="mt-1 text-sm">Text & SEO Engine Module Loading...</p>
    </div>
  );
}
