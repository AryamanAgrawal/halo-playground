'use client';

import { Button } from './ui/Button';
import { Input } from './ui/Input';
import { Label } from './ui/Label';
import { Select } from './ui/Select';
import { Switch } from './ui/Switch';
import { Slider } from './ui/Slider';
import type { HaloPreset } from './Halo';

export interface HaloColors {
  primary: string;
  secondary: string;
  accent: string;
  edge: string;
}

export interface HaloMotion {
  speedMultiplier: number;
  motionScale: number;
  blurIntensity: number;
  opacityMultiplier: number;
}

export interface HaloSettings {
  preset: HaloPreset;
  customColors: HaloColors;
  motion: HaloMotion;
  isDarkMode: boolean;
}

interface HaloControlsProps {
  settings: HaloSettings;
  onSettingsChange: (settings: HaloSettings) => void;
  onReset: () => void;
}

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

export function HaloControls({
  settings,
  onSettingsChange,
  onReset,
}: HaloControlsProps) {
  const handlePresetChange = (preset: HaloPreset) => {
    onSettingsChange({ ...settings, preset });
  };

  const handleColorChange = (colorKey: keyof HaloColors, value: string) => {
    onSettingsChange({
      ...settings,
      customColors: {
        ...settings.customColors,
        [colorKey]: value,
      },
    });
  };

  const handleThemeToggle = (isDarkMode: boolean) => {
    onSettingsChange({ ...settings, isDarkMode });
  };

  const handleMotionChange = (key: keyof HaloMotion, value: number) => {
    onSettingsChange({
      ...settings,
      motion: {
        ...settings.motion,
        [key]: value,
      },
    });
  };

  const handleExportCSS = async () => {
    const css = `/* Halo Animation CSS */
:root {
  /* Motion Controls */
  --halo-speed-multiplier: ${settings.motion.speedMultiplier};
  --halo-motion-scale: ${settings.motion.motionScale};
  --halo-blur-intensity: ${settings.motion.blurIntensity};
  --halo-opacity-multiplier: ${settings.motion.opacityMultiplier};

  /* Custom Colors */
  --halo-color-primary: ${settings.customColors.primary};
  --halo-color-secondary: ${settings.customColors.secondary};
  --halo-color-accent: ${settings.customColors.accent};
  --halo-color-edge: ${settings.customColors.edge};

  /* Preset */
  --halo-preset: ${settings.preset};
}`;

    try {
      await navigator.clipboard.writeText(css);
      alert('CSS copied to clipboard!');
    } catch (err) {
      alert('Failed to copy CSS to clipboard');
    }
  };

  return (
    <div className="glass relative z-10 w-full max-w-2xl space-y-6 rounded-2xl border border-neutral-200/30 p-6 dark:border-white/10">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-neutral-900 dark:text-white">
          Halo Controls
        </h2>
        <div className="flex gap-2">
          <Button variant="outline" onClick={handleExportCSS}>
            Export CSS
          </Button>
          <Button variant="outline" onClick={onReset}>
            Reset
          </Button>
        </div>
      </div>

      {/* Preset Selector */}
      <div className="space-y-2">
        <Label htmlFor="preset-select">Preset</Label>
        <Select
          id="preset-select"
          value={settings.preset}
          onChange={(e) => handlePresetChange(e.target.value as HaloPreset)}
          className="w-full"
        >
          {PRESETS.map((preset) => (
            <option key={preset.value} value={preset.value}>
              {preset.label}
            </option>
          ))}
        </Select>
      </div>

      {/* Theme Toggle */}
      <div className="flex items-center justify-between">
        <Label>Dark Mode</Label>
        <Switch
          checked={settings.isDarkMode}
          onCheckedChange={handleThemeToggle}
        />
      </div>

      {/* Color Pickers */}
      <div className="space-y-4">
        <Label>Custom Colors</Label>
        <div className="flex flex-wrap gap-4">
          {/* Primary */}
          <div className="inline-flex flex-col gap-1">
            <Label htmlFor="color-primary" className="text-xs">
              Primary
            </Label>
            <div className="flex gap-1.5">
              <Input
                id="color-primary"
                type="color"
                value={settings.customColors.primary}
                onChange={(e) => handleColorChange('primary', e.target.value)}
                className="h-9 w-12 cursor-pointer"
              />
              <Input
                type="text"
                value={settings.customColors.primary}
                onChange={(e) => handleColorChange('primary', e.target.value)}
                className="h-9 w-[100px] font-mono text-xs"
              />
            </div>
          </div>

          {/* Secondary */}
          <div className="inline-flex flex-col gap-1">
            <Label htmlFor="color-secondary" className="text-xs">
              Secondary
            </Label>
            <div className="flex gap-1.5">
              <Input
                id="color-secondary"
                type="color"
                value={settings.customColors.secondary}
                onChange={(e) =>
                  handleColorChange('secondary', e.target.value)
                }
                className="h-9 w-12 cursor-pointer"
              />
              <Input
                type="text"
                value={settings.customColors.secondary}
                onChange={(e) =>
                  handleColorChange('secondary', e.target.value)
                }
                className="h-9 w-[100px] font-mono text-xs"
              />
            </div>
          </div>

          {/* Accent */}
          <div className="inline-flex flex-col gap-1">
            <Label htmlFor="color-accent" className="text-xs">
              Accent
            </Label>
            <div className="flex gap-1.5">
              <Input
                id="color-accent"
                type="color"
                value={settings.customColors.accent}
                onChange={(e) => handleColorChange('accent', e.target.value)}
                className="h-9 w-12 cursor-pointer"
              />
              <Input
                type="text"
                value={settings.customColors.accent}
                onChange={(e) => handleColorChange('accent', e.target.value)}
                className="h-9 w-[100px] font-mono text-xs"
              />
            </div>
          </div>

          {/* Edge */}
          <div className="inline-flex flex-col gap-1">
            <Label htmlFor="color-edge" className="text-xs">
              Edge
            </Label>
            <div className="flex gap-1.5">
              <Input
                id="color-edge"
                type="color"
                value={settings.customColors.edge}
                onChange={(e) => handleColorChange('edge', e.target.value)}
                className="h-9 w-12 cursor-pointer"
              />
              <Input
                type="text"
                value={settings.customColors.edge}
                onChange={(e) => handleColorChange('edge', e.target.value)}
                className="h-9 w-[100px] font-mono text-xs"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Motion Controls */}
      <div className="space-y-4">
        <Label>Motion Controls</Label>

        {/* Speed Multiplier */}
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <Label htmlFor="speed-slider" className="text-xs">
              Speed
            </Label>
            <span className="text-xs text-neutral-600 dark:text-neutral-400">
              {settings.motion.speedMultiplier.toFixed(2)}x
            </span>
          </div>
          <Slider
            value={settings.motion.speedMultiplier}
            onValueChange={(value) =>
              handleMotionChange('speedMultiplier', value)
            }
            min={0.1}
            max={2}
            step={0.1}
          />
        </div>

        {/* Motion Scale */}
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <Label htmlFor="motion-scale-slider" className="text-xs">
              Motion Scale
            </Label>
            <span className="text-xs text-neutral-600 dark:text-neutral-400">
              {settings.motion.motionScale.toFixed(1)}
            </span>
          </div>
          <Slider
            value={settings.motion.motionScale}
            onValueChange={(value) => handleMotionChange('motionScale', value)}
            min={0}
            max={2}
            step={0.1}
          />
        </div>

        {/* Blur Intensity */}
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <Label htmlFor="blur-slider" className="text-xs">
              Blur Intensity
            </Label>
            <span className="text-xs text-neutral-600 dark:text-neutral-400">
              {settings.motion.blurIntensity.toFixed(1)}
            </span>
          </div>
          <Slider
            value={settings.motion.blurIntensity}
            onValueChange={(value) =>
              handleMotionChange('blurIntensity', value)
            }
            min={0.5}
            max={2}
            step={0.1}
          />
        </div>

        {/* Opacity Multiplier */}
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <Label htmlFor="opacity-slider" className="text-xs">
              Opacity
            </Label>
            <span className="text-xs text-neutral-600 dark:text-neutral-400">
              {settings.motion.opacityMultiplier.toFixed(1)}
            </span>
          </div>
          <Slider
            value={settings.motion.opacityMultiplier}
            onValueChange={(value) =>
              handleMotionChange('opacityMultiplier', value)
            }
            min={0.3}
            max={1.5}
            step={0.1}
          />
        </div>
      </div>
    </div>
  );
}
