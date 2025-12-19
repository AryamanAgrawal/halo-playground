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
  scale: 0.7,
};

const DEFAULT_SETTINGS: HaloSettings = {
  preset: 'bottom-left',
  customColors: DEFAULT_COLORS,
  motion: DEFAULT_MOTION,
  invertColors: false,
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
  params.set('motionScale', settings.motion.motionScale.toString());
  params.set('blur', settings.motion.blurIntensity.toString());
  params.set('opacity', settings.motion.opacityMultiplier.toString());
  params.set('size', settings.motion.scale.toString());
  params.set('invert', settings.invertColors.toString());
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
        searchParams.get('motionScale') || DEFAULT_MOTION.motionScale.toString(),
      ),
      blurIntensity: parseFloat(
        searchParams.get('blur') || DEFAULT_MOTION.blurIntensity.toString(),
      ),
      opacityMultiplier: parseFloat(
        searchParams.get('opacity') ||
          DEFAULT_MOTION.opacityMultiplier.toString(),
      ),
      scale: parseFloat(
        searchParams.get('size') || DEFAULT_MOTION.scale.toString(),
      ),
    },
    invertColors: searchParams.get('invert') === 'true',
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
    root.style.setProperty(
      '--halo-scale',
      settings.motion.scale.toString(),
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
      <Halo
        preset={settings.preset}
        customColors={settings.customColors}
        invertColors={settings.invertColors}
      />

      {/* Main Content Area */}
      <div className="font-syncopate relative z-10 flex flex-1 items-center justify-center p-8">
        <div className="font-syncopate text-center">
          <h1 className="font-syncopate text-9xl font-bold uppercase tracking-[0.2em] text-white/70">
            Halo
          </h1>
        </div>
      </div>

      {/* Right Sidebar */}
      <aside className="relative z-10 flex h-screen w-[420px] flex-col overflow-y-auto border-l border-white/10 bg-black/40 backdrop-blur-xl">
        <div className="sticky top-0 z-20 border-b border-white/10 bg-black/40 p-6 backdrop-blur-xl">
          <div className="flex items-center justify-between">
            <h2 className="font-montserrat text-lg font-semibold uppercase tracking-wider text-white">
              Controls
            </h2>
            <div className="flex items-center gap-2">
              <span className="font-montserrat text-sm font-normal text-neutral-400">
                Invert Colors
              </span>
              <Switch
                checked={settings.invertColors}
                onCheckedChange={(checked) =>
                  setSettings({ ...settings, invertColors: checked })
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
