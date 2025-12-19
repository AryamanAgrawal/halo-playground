'use client';

import { useState, useEffect } from 'react';
import { Halo } from '@/components/Halo';
import { HaloControls } from '@/components/HaloControls';
import type { HaloSettings, HaloColors } from '@/components/HaloControls';

const DEFAULT_COLORS: HaloColors = {
  primary: '#06b6d4',
  secondary: '#14b8a6',
  accent: '#f5d69c',
  edge: '#e8dcc8',
};

const DEFAULT_SETTINGS: HaloSettings = {
  preset: 'bottom-left',
  customColors: DEFAULT_COLORS,
  isDarkMode: false,
};

export default function Home() {
  const [settings, setSettings] = useState<HaloSettings>(DEFAULT_SETTINGS);

  // Apply theme to document
  useEffect(() => {
    if (settings.isDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [settings.isDarkMode]);

  const handleReset = () => {
    setSettings(DEFAULT_SETTINGS);
  };

  return (
    <main className="relative flex min-h-screen flex-col items-center justify-center gap-8 p-8">
      <Halo preset={settings.preset} customColors={settings.customColors} />

      <div className="relative z-10 flex flex-col items-center gap-8">
        <div className="text-center">
          <h1 className="text-6xl font-bold text-neutral-900 dark:text-white">
            Halo Playground
          </h1>
          <p className="mt-2 text-xl text-neutral-600 dark:text-neutral-400">
            Interactive animated background component
          </p>
        </div>

        <HaloControls
          settings={settings}
          onSettingsChange={setSettings}
          onReset={handleReset}
        />
      </div>
    </main>
  );
}
