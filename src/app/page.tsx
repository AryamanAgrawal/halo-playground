'use client';

import { useState, useEffect } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import { Halo } from '@/components/Halo';
import { HaloControls } from '@/components/HaloControls';
import { Button } from '@/components/ui/Button';
import { Switch } from '@/components/ui/Switch';
import type {
  HaloSettings,
  HaloColors,
  HaloMotion,
} from '@/components/HaloControls';

const DEFAULT_COLORS: HaloColors = {
  primary: '#06b6d4',
  secondary: '#14b8a6',
  accent: '#f5d69c',
  edge: '#e8dcc8',
};

const DEFAULT_MOTION: HaloMotion = {
  speedMultiplier: 0.25,
  motionScale: 1,
  blurIntensity: 1,
  opacityMultiplier: 1,
};

const DEFAULT_SETTINGS: HaloSettings = {
  preset: 'bottom-left',
  customColors: DEFAULT_COLORS,
  motion: DEFAULT_MOTION,
  isDarkMode: false,
};

// Encode settings to URL params
function encodeSettings(settings: HaloSettings): string {
  const params = new URLSearchParams();
  params.set('preset', settings.preset);
  params.set('primary', settings.customColors.primary);
  params.set('secondary', settings.customColors.secondary);
  params.set('accent', settings.customColors.accent);
  params.set('edge', settings.customColors.edge);
  params.set('speed', settings.motion.speedMultiplier.toString());
  params.set('scale', settings.motion.motionScale.toString());
  params.set('blur', settings.motion.blurIntensity.toString());
  params.set('opacity', settings.motion.opacityMultiplier.toString());
  params.set('dark', settings.isDarkMode.toString());
  return params.toString();
}

// Decode settings from URL params
function decodeSettings(
  searchParams: URLSearchParams,
): HaloSettings | null {
  const preset = searchParams.get('preset');
  if (!preset) return null;

  return {
    preset: preset as any,
    customColors: {
      primary: searchParams.get('primary') || DEFAULT_COLORS.primary,
      secondary: searchParams.get('secondary') || DEFAULT_COLORS.secondary,
      accent: searchParams.get('accent') || DEFAULT_COLORS.accent,
      edge: searchParams.get('edge') || DEFAULT_COLORS.edge,
    },
    motion: {
      speedMultiplier: parseFloat(
        searchParams.get('speed') || DEFAULT_MOTION.speedMultiplier.toString(),
      ),
      motionScale: parseFloat(
        searchParams.get('scale') || DEFAULT_MOTION.motionScale.toString(),
      ),
      blurIntensity: parseFloat(
        searchParams.get('blur') || DEFAULT_MOTION.blurIntensity.toString(),
      ),
      opacityMultiplier: parseFloat(
        searchParams.get('opacity') ||
          DEFAULT_MOTION.opacityMultiplier.toString(),
      ),
    },
    isDarkMode: searchParams.get('dark') === 'true',
  };
}

export default function Home() {
  const searchParams = useSearchParams();
  const router = useRouter();

  // Initialize settings from URL params or defaults
  const [settings, setSettings] = useState<HaloSettings>(() => {
    const urlSettings = decodeSettings(searchParams);
    return urlSettings || DEFAULT_SETTINGS;
  });

  // Apply theme to document
  useEffect(() => {
    if (settings.isDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [settings.isDarkMode]);

  // Apply motion CSS variables to document
  useEffect(() => {
    const root = document.documentElement;
    root.style.setProperty(
      '--halo-speed-multiplier',
      settings.motion.speedMultiplier.toString(),
    );
    root.style.setProperty(
      '--halo-motion-scale',
      settings.motion.motionScale.toString(),
    );
    root.style.setProperty(
      '--halo-blur-intensity',
      settings.motion.blurIntensity.toString(),
    );
    root.style.setProperty(
      '--halo-opacity-multiplier',
      settings.motion.opacityMultiplier.toString(),
    );
  }, [settings.motion]);

  // Update URL when settings change
  useEffect(() => {
    const params = encodeSettings(settings);
    router.replace(`?${params}`, { scroll: false });
  }, [settings, router]);

  const handleReset = () => {
    setSettings(DEFAULT_SETTINGS);
  };

  const handleShare = async () => {
    const params = encodeSettings(settings);
    const url = `${window.location.origin}${window.location.pathname}?${params}`;

    try {
      await navigator.clipboard.writeText(url);
      alert('Share link copied to clipboard!');
    } catch (err) {
      alert('Failed to copy share link');
    }
  };

  return (
    <main className="relative flex min-h-screen">
      <Halo preset={settings.preset} customColors={settings.customColors} />

      {/* Main Content Area */}
      <div className="relative z-10 flex flex-1 items-center justify-center p-8">
        <div className="text-center">
          <div className="glass inline-block rounded-2xl px-8 py-6">
            <h1 className="font-orbitron text-7xl font-black uppercase tracking-wider text-neutral-900 dark:text-white">
              Halo
            </h1>
            <p className="mt-3 font-orbitron text-2xl font-medium tracking-wide text-neutral-600 dark:text-neutral-300">
              Playground
            </p>
          </div>
          <p className="glass mt-6 inline-block rounded-lg px-6 py-3 font-rajdhani text-lg font-medium tracking-wide text-neutral-700 dark:text-neutral-300">
            Interactive animated background component
          </p>
        </div>
      </div>

      {/* Right Sidebar */}
      <aside className="glass relative z-10 flex h-screen w-[420px] flex-col overflow-y-auto border-l border-neutral-200/30 dark:border-white/10">
        <div className="sticky top-0 z-20 border-b border-neutral-200/30 bg-white/80 p-6 backdrop-blur-xl dark:border-white/10 dark:bg-black/40">
          <div className="flex items-center justify-between">
            <h2 className="font-orbitron text-xl font-bold uppercase tracking-wider text-neutral-900 dark:text-white">
              Controls
            </h2>
            <div className="flex items-center gap-2">
              <span className="font-rajdhani text-sm font-medium text-neutral-600 dark:text-neutral-400">
                {settings.isDarkMode ? 'Dark' : 'Light'}
              </span>
              <Switch
                checked={settings.isDarkMode}
                onCheckedChange={(checked) =>
                  setSettings({ ...settings, isDarkMode: checked })
                }
              />
            </div>
          </div>
        </div>

        <div className="flex-1 space-y-6 p-6">
          <HaloControls
            settings={settings}
            onSettingsChange={setSettings}
            onReset={handleReset}
          />

          <div className="space-y-2">
            <Button onClick={handleShare} className="w-full">
              Share Configuration
            </Button>
            <Link href="/gallery" className="block w-full">
              <Button variant="outline" className="w-full">
                View Gallery
              </Button>
            </Link>
          </div>
        </div>
      </aside>
    </main>
  );
}
