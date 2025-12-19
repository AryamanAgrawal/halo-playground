'use client';

import Link from 'next/link';
import { Halo } from '@/components/Halo';
import type { HaloPreset } from '@/components/Halo';
import { Button } from '@/components/ui/Button';

const PRESETS: { value: HaloPreset; label: string }[] = [
  { value: 'center', label: 'Center' },
  { value: 'top-left', label: 'Top Left' },
  { value: 'top-right', label: 'Top Right' },
  { value: 'top-center', label: 'Top Center' },
  { value: 'bottom-left', label: 'Bottom Left' },
  { value: 'bottom-center', label: 'Bottom Center' },
  { value: 'bottom-right', label: 'Bottom Right' },
  { value: 'chat-glow', label: 'Chat Glow' },
];

export default function GalleryPage() {
  return (
    <main className="min-h-screen bg-neutral-100 p-8 dark:bg-neutral-900">
      <div className="mx-auto max-w-7xl space-y-8">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-4xl font-bold text-neutral-900 dark:text-white">
              Preset Gallery
            </h1>
            <p className="mt-2 text-neutral-600 dark:text-neutral-400">
              Explore all Halo animation presets
            </p>
          </div>
          <Link href="/">
            <Button variant="outline">Back to Playground</Button>
          </Link>
        </div>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {PRESETS.map((preset) => (
            <div
              key={preset.value}
              className="relative overflow-hidden rounded-2xl border border-neutral-200/50 bg-white dark:border-neutral-700 dark:bg-neutral-800"
            >
              <div className="relative h-64">
                <Halo preset={preset.value} variant="absolute" />
                <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
                  <div className="glass rounded-lg px-4 py-2">
                    <h3 className="text-lg font-semibold text-neutral-900 dark:text-white">
                      {preset.label}
                    </h3>
                  </div>
                </div>
              </div>
              <div className="border-t border-neutral-200 p-4 dark:border-neutral-700">
                <Link href={`/?preset=${preset.value}`}>
                  <Button variant="outline" className="w-full">
                    Try This Preset
                  </Button>
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}
