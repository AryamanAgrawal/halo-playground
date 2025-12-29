'use client';

import { Slider } from '@/components/ui/Slider';
import { Label } from '@/components/ui/Label';
import { Switch } from '@/components/ui/Switch';
import { Input } from '@/components/ui/Input';
import { Button } from '@/components/ui/Button';
import type { FalconSettings } from '@/components/MillenniumFalcon';
import type { HaloSettings } from '@/components/HaloControls';

interface FalconControlsProps {
  settings: FalconSettings;
  onSettingsChange: (settings: FalconSettings) => void;
  haloSettings?: HaloSettings;
}

export function FalconControls({
  settings,
  onSettingsChange,
  haloSettings,
}: FalconControlsProps) {
  const updateSetting = <K extends keyof FalconSettings>(
    key: K,
    value: FalconSettings[K],
  ) => {
    onSettingsChange({ ...settings, [key]: value });
  };

  const matchHaloColors = () => {
    if (haloSettings) {
      onSettingsChange({
        ...settings,
        useGradient: true,
        gradientColor1: haloSettings.customColors.primary,
        gradientColor2: haloSettings.customColors.secondary,
        gradientColor3: haloSettings.customColors.accent,
        gradientColor4: haloSettings.customColors.edge,
      });
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <div className="mb-4 flex items-center justify-between">
          <Label className="font-montserrat text-sm font-semibold uppercase tracking-wider text-neutral-200">
            Millennium Falcon
          </Label>
          <Switch
            checked={settings.enabled}
            onCheckedChange={(checked) => updateSetting('enabled', checked)}
          />
        </div>

        {settings.enabled && (
          <div className="space-y-4 border-l-2 border-white/10 pl-4">
            <div className="flex items-center justify-between">
              <Label className="font-montserrat text-xs text-neutral-400">
                Auto-Rotate
              </Label>
              <Switch
                checked={settings.autoRotate}
                onCheckedChange={(checked) => updateSetting('autoRotate', checked)}
              />
            </div>

            {settings.autoRotate && settings.autoRotateSpeed !== undefined && (
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Label className="font-montserrat text-xs text-neutral-400">
                    Rotation Speed
                  </Label>
                  <span className="font-mono text-xs text-white">
                    {settings.autoRotateSpeed.toFixed(3)}
                  </span>
                </div>
                <Slider
                  value={settings.autoRotateSpeed}
                  onValueChange={(value) => updateSetting('autoRotateSpeed', value)}
                  min={0}
                  max={0.1}
                  step={0.001}
                />
              </div>
            )}

            <div className="border-t border-white/10 pt-4">
              <Label className="font-montserrat mb-3 block text-xs font-semibold uppercase tracking-wider text-neutral-300">
                Position
              </Label>

              <div className="space-y-3">
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <Label className="font-montserrat text-xs text-neutral-400">
                      X (Left/Right)
                    </Label>
                    <span className="font-mono text-xs text-white">
                      {settings.positionX.toFixed(1)}
                    </span>
                  </div>
                  <Slider
                    value={settings.positionX}
                    onValueChange={(value) => updateSetting('positionX', value)}
                    min={-20}
                    max={20}
                    step={0.5}
                  />
                </div>

                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <Label className="font-montserrat text-xs text-neutral-400">
                      Y (Up/Down)
                    </Label>
                    <span className="font-mono text-xs text-white">
                      {settings.positionY.toFixed(1)}
                    </span>
                  </div>
                  <Slider
                    value={settings.positionY}
                    onValueChange={(value) => updateSetting('positionY', value)}
                    min={-10}
                    max={10}
                    step={0.5}
                  />
                </div>

                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <Label className="font-montserrat text-xs text-neutral-400">
                      Z (Forward/Back)
                    </Label>
                    <span className="font-mono text-xs text-white">
                      {settings.positionZ.toFixed(1)}
                    </span>
                  </div>
                  <Slider
                    value={settings.positionZ}
                    onValueChange={(value) => updateSetting('positionZ', value)}
                    min={-20}
                    max={20}
                    step={0.5}
                  />
                </div>
              </div>
            </div>

            <div className="border-t border-white/10 pt-4">
              <Label className="font-montserrat mb-3 block text-xs font-semibold uppercase tracking-wider text-neutral-300">
                Rotation
              </Label>

              <div className="space-y-3">
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <Label className="font-montserrat text-xs text-neutral-400">
                      X Rotation
                    </Label>
                    <span className="font-mono text-xs text-white">
                      {settings.rotationX.toFixed(2)}
                    </span>
                  </div>
                  <Slider
                    value={settings.rotationX}
                    onValueChange={(value) => updateSetting('rotationX', value)}
                    min={0}
                    max={6.28}
                    step={0.1}
                  />
                </div>

                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <Label className="font-montserrat text-xs text-neutral-400">
                      Y Rotation
                    </Label>
                    <span className="font-mono text-xs text-white">
                      {settings.rotationY.toFixed(2)}
                    </span>
                  </div>
                  <Slider
                    value={settings.rotationY}
                    onValueChange={(value) => updateSetting('rotationY', value)}
                    min={0}
                    max={6.28}
                    step={0.1}
                  />
                </div>

                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <Label className="font-montserrat text-xs text-neutral-400">
                      Z Rotation
                    </Label>
                    <span className="font-mono text-xs text-white">
                      {settings.rotationZ.toFixed(2)}
                    </span>
                  </div>
                  <Slider
                    value={settings.rotationZ}
                    onValueChange={(value) => updateSetting('rotationZ', value)}
                    min={0}
                    max={6.28}
                    step={0.1}
                  />
                </div>
              </div>
            </div>

            <div className="border-t border-white/10 pt-4">
              <Label className="font-montserrat mb-3 block text-xs font-semibold uppercase tracking-wider text-neutral-300">
                Size
              </Label>

              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Label className="font-montserrat text-xs text-neutral-400">
                    Scale
                  </Label>
                  <span className="font-mono text-xs text-white">
                    {settings.scale.toFixed(2)}
                  </span>
                </div>
                <Slider
                  value={settings.scale}
                  onValueChange={(value) => updateSetting('scale', value)}
                  min={0.01}
                  max={1}
                  step={0.01}
                />
              </div>
            </div>

            <div className="border-t border-white/10 pt-4">
              <Label className="font-montserrat mb-3 block text-xs font-semibold uppercase tracking-wider text-neutral-300">
                Color
              </Label>

              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <Label className="font-montserrat text-xs text-neutral-400">
                    Use Gradient
                  </Label>
                  <Switch
                    checked={settings.useGradient}
                    onCheckedChange={(checked) => updateSetting('useGradient', checked)}
                  />
                </div>

                {!settings.useGradient ? (
                  <div className="flex gap-2">
                    <Input
                      type="color"
                      value={settings.color}
                      onChange={(e) => updateSetting('color', e.target.value)}
                      className="h-10 w-16 cursor-pointer"
                    />
                    <Input
                      type="text"
                      value={settings.color}
                      onChange={(e) => updateSetting('color', e.target.value)}
                      className="flex-1 font-mono text-xs"
                      placeholder="#bbbbbb"
                    />
                  </div>
                ) : (
                  <div className="space-y-3">
                    <div>
                      <Label className="font-montserrat mb-2 block text-xs text-neutral-400">
                        Gradient Color 1
                      </Label>
                      <div className="flex gap-2">
                        <Input
                          type="color"
                          value={settings.gradientColor1}
                          onChange={(e) => updateSetting('gradientColor1', e.target.value)}
                          className="h-10 w-16 cursor-pointer"
                        />
                        <Input
                          type="text"
                          value={settings.gradientColor1}
                          onChange={(e) => updateSetting('gradientColor1', e.target.value)}
                          className="flex-1 font-mono text-xs"
                          placeholder="#06b6d4"
                        />
                      </div>
                    </div>

                    <div>
                      <Label className="font-montserrat mb-2 block text-xs text-neutral-400">
                        Gradient Color 2
                      </Label>
                      <div className="flex gap-2">
                        <Input
                          type="color"
                          value={settings.gradientColor2}
                          onChange={(e) => updateSetting('gradientColor2', e.target.value)}
                          className="h-10 w-16 cursor-pointer"
                        />
                        <Input
                          type="text"
                          value={settings.gradientColor2}
                          onChange={(e) => updateSetting('gradientColor2', e.target.value)}
                          className="flex-1 font-mono text-xs"
                          placeholder="#14b8a6"
                        />
                      </div>
                    </div>

                    <div>
                      <Label className="font-montserrat mb-2 block text-xs text-neutral-400">
                        Gradient Color 3
                      </Label>
                      <div className="flex gap-2">
                        <Input
                          type="color"
                          value={settings.gradientColor3}
                          onChange={(e) => updateSetting('gradientColor3', e.target.value)}
                          className="h-10 w-16 cursor-pointer"
                        />
                        <Input
                          type="text"
                          value={settings.gradientColor3}
                          onChange={(e) => updateSetting('gradientColor3', e.target.value)}
                          className="flex-1 font-mono text-xs"
                          placeholder="#f5d69c"
                        />
                      </div>
                    </div>

                    <div>
                      <Label className="font-montserrat mb-2 block text-xs text-neutral-400">
                        Gradient Color 4
                      </Label>
                      <div className="flex gap-2">
                        <Input
                          type="color"
                          value={settings.gradientColor4}
                          onChange={(e) => updateSetting('gradientColor4', e.target.value)}
                          className="h-10 w-16 cursor-pointer"
                        />
                        <Input
                          type="text"
                          value={settings.gradientColor4}
                          onChange={(e) => updateSetting('gradientColor4', e.target.value)}
                          className="flex-1 font-mono text-xs"
                          placeholder="#e8dcc8"
                        />
                      </div>
                    </div>

                    {haloSettings && (
                      <Button
                        onClick={matchHaloColors}
                        variant="outline"
                        className="w-full"
                      >
                        Match Halo Colors
                      </Button>
                    )}
                  </div>
                )}
              </div>
            </div>

            {settings.useGradient && (
              <div className="border-t border-white/10 pt-4">
                <Label className="font-montserrat mb-3 block text-xs font-semibold uppercase tracking-wider text-neutral-300">
                  Liquid Metal
                </Label>

                <div className="space-y-3">
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <Label className="font-montserrat text-xs text-neutral-400">
                        Flow Speed
                      </Label>
                      <span className="font-mono text-xs text-white">
                        {settings.flowSpeed.toFixed(2)}
                      </span>
                    </div>
                    <Slider
                      value={settings.flowSpeed}
                      onValueChange={(value) => updateSetting('flowSpeed', value)}
                      min={0.1}
                      max={1.0}
                      step={0.05}
                    />
                    <p className="font-montserrat text-[10px] text-neutral-500">
                      0.2 = slow & dreamy, 0.4 = balanced, 0.6 = energetic
                    </p>
                  </div>

                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <Label className="font-montserrat text-xs text-neutral-400">
                        Pool Size
                      </Label>
                      <span className="font-mono text-xs text-white">
                        {settings.noiseScale.toFixed(2)}
                      </span>
                    </div>
                    <Slider
                      value={settings.noiseScale}
                      onValueChange={(value) => updateSetting('noiseScale', value)}
                      min={0.1}
                      max={0.6}
                      step={0.05}
                    />
                    <p className="font-montserrat text-[10px] text-neutral-500">
                      0.2 = large pools, 0.3 = balanced, 0.5 = detailed ripples
                    </p>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
