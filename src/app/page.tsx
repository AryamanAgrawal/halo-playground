'use client';

import { useState, useEffect } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import { Halo } from '@/components/Halo';
import { HaloControls } from '@/components/HaloControls';
import { MillenniumFalcon } from '@/components/MillenniumFalcon';
import { FalconControls } from '@/components/FalconControls';
import { Button } from '@/components/ui/Button';
import { Switch } from '@/components/ui/Switch';
import type {
  HaloSettings,
  HaloColors,
  HaloMotion,
} from '@/components/HaloControls';
import type { FalconSettings } from '@/components/MillenniumFalcon';

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
  invertColors: true, // true = dark mode gradients
};

const DEFAULT_FALCON_SETTINGS: FalconSettings = {
  enabled: false,
  positionX: 0,
  positionY: 0,
  positionZ: 0,
  rotationX: 0,
  rotationY: 0,
  rotationZ: 0,
  scale: 0.15,
  autoRotate: true,
  autoRotateSpeed: 0.01,
  color: '#bbbbbb',
  useGradient: true,
  gradientColor1: '#06b6d4',
  gradientColor2: '#14b8a6',
  gradientColor3: '#f5d69c',
  gradientColor4: '#e8dcc8',
  flowSpeed: 0.3,
  noiseScale: 0.3,
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

  // Falcon settings state
  const [falconSettings, setFalconSettings] = useState<FalconSettings>(DEFAULT_FALCON_SETTINGS);

  // Sidebar collapse state
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

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

  // Toggle dark/light mode class on html element
  useEffect(() => {
    const root = document.documentElement;
    if (settings.invertColors) {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
  }, [settings.invertColors]);

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

      {/* Millennium Falcon 3D Model */}
      <MillenniumFalcon settings={falconSettings} />

      {/* Main Content Area */}
      <div className="font-syncopate relative z-10 flex flex-1 items-center justify-center p-8">
        <div className="font-syncopate text-center">
          <h1 className="font-syncopate text-9xl font-bold uppercase tracking-[0.2em] text-black/50 dark:text-white/70">
            Halo
          </h1>
        </div>
      </div>

      {/* Sidebar Toggle Button (when collapsed) */}
      {sidebarCollapsed && (
        <button
          onClick={() => setSidebarCollapsed(false)}
          className="fixed right-6 top-6 z-20 flex h-10 w-10 items-center justify-center rounded-lg border border-black/10 bg-white/50 backdrop-blur-xl transition-all hover:bg-white/70 dark:border-white/10 dark:bg-black/60 dark:hover:bg-black/80"
          aria-label="Open sidebar"
        >
          <svg className="h-5 w-5 text-black dark:text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
        </button>
      )}

      {/* Right Sidebar */}
      <aside
        className={`relative z-10 flex h-screen flex-col overflow-y-auto border-l border-black/10 bg-white/50 backdrop-blur-xl transition-all duration-300 dark:border-white/10 dark:bg-black/60 ${
          sidebarCollapsed ? 'w-0 overflow-hidden border-l-0' : 'w-[420px]'
        }`}
      >
        <div className="sticky top-0 z-20 border-b border-black/10 bg-white/50 p-6 backdrop-blur-xl dark:border-white/10 dark:bg-black/60">
          <div className="flex items-center justify-between">
            <h2 className="font-montserrat text-lg font-semibold uppercase tracking-wider text-black dark:text-white">
              Controls
            </h2>
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-2">
                <span className="font-montserrat text-sm font-normal text-neutral-500 dark:text-neutral-400">
                  {settings.invertColors ? 'Dark' : 'Light'}
                </span>
                <Switch
                  checked={settings.invertColors}
                  onCheckedChange={(checked) =>
                    setSettings({ ...settings, invertColors: checked })
                  }
                />
              </div>
              <button
                onClick={() => setSidebarCollapsed(true)}
                className="flex h-8 w-8 items-center justify-center rounded-md text-neutral-500 transition-colors hover:bg-black/5 hover:text-black dark:text-neutral-400 dark:hover:bg-white/10 dark:hover:text-white"
                aria-label="Close sidebar"
              >
                <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </button>
            </div>
          </div>
        </div>

        <div className="flex-1 space-y-6 p-6">
          <HaloControls
            settings={settings}
            onSettingsChange={setSettings}
            onReset={handleReset}
          />

          {/* Millennium Falcon Controls */}
          <div className="border-t border-black/10 pt-6 dark:border-white/10">
            <FalconControls
              settings={falconSettings}
              onSettingsChange={setFalconSettings}
              haloSettings={settings}
            />
          </div>

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
