'use client';

import { useState } from 'react';
import { Button } from './ui/Button';
import type { HaloSettings } from './HaloControls';

interface CodeViewerProps {
  settings: HaloSettings;
}

export function CodeViewer({ settings }: CodeViewerProps) {
  const [copied, setCopied] = useState(false);

  const code = `import { Halo } from '@/components/Halo';

export default function MyPage() {
  return (
    <div className="relative min-h-screen">
      <Halo
        preset="${settings.preset}"
        customColors={{
          primary: '${settings.customColors.primary}',
          secondary: '${settings.customColors.secondary}',
          accent: '${settings.customColors.accent}',
          edge: '${settings.customColors.edge}',
        }}
      />

      <div className="relative z-10">
        {/* Your content here */}
      </div>
    </div>
  );
}`;

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(code);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      alert('Failed to copy code');
    }
  };

  return (
    <div className="glass relative w-full max-w-2xl space-y-2 rounded-2xl border border-neutral-200/30 p-6 dark:border-white/10">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold text-neutral-900 dark:text-white">
          React Component Code
        </h3>
        <Button variant="outline" onClick={handleCopy}>
          {copied ? 'Copied!' : 'Copy Code'}
        </Button>
      </div>
      <pre className="overflow-x-auto rounded-lg bg-neutral-900 p-4 text-sm text-neutral-100 dark:bg-neutral-950">
        <code>{code}</code>
      </pre>
    </div>
  );
}
