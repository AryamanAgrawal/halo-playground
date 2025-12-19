'use client';

import { useEffect, useState } from 'react';
import {
  generateHaloGradients,
  type HaloColors,
} from '@/lib/generateHaloGradients';

export type { HaloColors };

/**
 * Halo - Animated aurora/halo background that adapts to light/dark mode
 *
 * Interactive playground for experimenting with animated gradient halo effects
 *
 * Props:
 *   preset: 'center' | 'top-left' | 'top-right' | 'top-center' (default: 'center')
 *   customColors: Custom color palette to override default gradients
 *
 * Motion Config (set on :root or parent element):
 *   --halo-speed-multiplier: 0.25   (0.5 = half speed, 2 = double speed)
 *   --halo-motion-scale: 1          (0 = no movement, 1 = normal, 2 = exaggerated)
 *   --halo-blur-intensity: 1        (0.5 = sharper, 2 = more diffuse)
 *   --halo-opacity-multiplier: 1    (0.5 = subtle, 1.5 = intense)
 *
 * Position Config (set via preset or custom CSS):
 *   --halo-scale: 0.7               (size relative to container)
 *   --halo-offset-x: 0%             (horizontal offset)
 *   --halo-offset-y: -10%           (vertical offset)
 */

export type HaloPreset =
  | 'center'
  | 'top-left'
  | 'top-right'
  | 'top-center'
  | 'bottom-left'
  | 'bottom-center'
  | 'bottom-right'
  | 'chat-glow';

interface HaloProps {
  preset?: HaloPreset;
  variant?: 'fixed' | 'absolute';
  customColors?: HaloColors | null;
  invertColors?: boolean;
}

export function Halo({
  preset = 'center',
  variant = 'fixed',
  invertColors = false,
  customColors = null,
}: HaloProps) {
  const mode = invertColors ? 'dark' : 'light';

  const customGradients = customColors
    ? generateHaloGradients(customColors, mode)
    : null;
  return (
    <>
      <style>{`
        /* Motion configuration defaults */
        :root {
          --halo-speed-multiplier: 0.25;
          --halo-motion-scale: 1;
          --halo-blur-intensity: 1;
          --halo-opacity-multiplier: 1;
        }

        /* Position configuration defaults */
        :root {
          --halo-scale: 0.7;
          --halo-offset-x: 0%;
          --halo-offset-y: -10%;
          --halo-aspect-ratio: 1;
          --halo-gradient-shape: circle;
        }

        /* Preset: center (default) */
        .halo-preset-center {
          --halo-scale: 0.7;
          --halo-offset-x: 0%;
          --halo-offset-y: -10%;
        }

        /* Preset: top-left - zoomed in, positioned in top-left */
        .halo-preset-top-left {
          --halo-scale: 2.5;
          --halo-offset-x: -35%;
          --halo-offset-y: -35%;
        }

        /* Preset: top-right - zoomed in, positioned in top-right */
        .halo-preset-top-right {
          --halo-scale: 2.5;
          --halo-offset-x: 35%;
          --halo-offset-y: -30%;
        }

        /* Preset: top-center - larger, positioned at top with elliptical shape */
        .halo-preset-top-center {
          --halo-scale: 2.5;
          --halo-offset-x: 0%;
          --halo-offset-y: -35%;
          --halo-aspect-ratio: 1.5;
          --halo-gradient-shape: ellipse 95% 30%;
        }

        /* Preset: chat-glow - centered behind chat box, wider aspect ratio */
        .halo-preset-chat-glow {
          --halo-scale: 2.5;
          --halo-offset-x: 0%;
          --halo-offset-y: -9%;
          --halo-aspect-ratio: 1.5;
          --halo-gradient-shape: ellipse 95% 30%;
        }

        /* Preset: bottom-left - zoomed in, positioned in bottom-left */
        .halo-preset-bottom-left {
          --halo-scale: 2.5;
          --halo-offset-x: -35%;
          --halo-offset-y: 35%;
          --halo-aspect-ratio: 1.5;
          --halo-gradient-shape: ellipse 95% 30%;
        }

        /* Preset: bottom-center - zoomed in, positioned at bottom */
        .halo-preset-bottom-center {
          --halo-scale: 2.5;
          --halo-offset-x: 0%;
          --halo-offset-y: 35%;
          --halo-aspect-ratio: 1.5;
          --halo-gradient-shape: ellipse 95% 30%;
        }

        /* Preset: bottom-right - zoomed in, positioned in bottom-right */
        .halo-preset-bottom-right {
          --halo-scale: 2.5;
          --halo-offset-x: 35%;
          --halo-offset-y: 35%;
          --halo-aspect-ratio: 1.5;
          --halo-gradient-shape: ellipse 95% 30%;
        }

        @keyframes falconer-rotate {
          0% {
            transform: rotate(0deg) scale(1);
          }
          50% {
            transform: rotate(180deg)
              scale(calc(1 + 0.08 * var(--halo-motion-scale)));
          }
          100% {
            transform: rotate(360deg) scale(1);
          }
        }

        @keyframes falconer-pulse {
          0%,
          100% {
            opacity: calc(
              var(--halo-pulse-min) * var(--halo-opacity-multiplier)
            );
            filter: blur(calc(80px * var(--halo-blur-intensity)));
          }
          50% {
            opacity: calc(
              var(--halo-pulse-max) * var(--halo-opacity-multiplier)
            );
            filter: blur(calc(100px * var(--halo-blur-intensity)));
          }
        }

        @keyframes falconer-drift {
          0%,
          100% {
            transform: translate(0, 0) rotate(0deg);
          }
          25% {
            transform: translate(
                calc(8% * var(--halo-motion-scale)),
                calc(-5% * var(--halo-motion-scale))
              )
              rotate(90deg);
          }
          50% {
            transform: translate(
                calc(-5% * var(--halo-motion-scale)),
                calc(8% * var(--halo-motion-scale))
              )
              rotate(180deg);
          }
          75% {
            transform: translate(
                calc(-8% * var(--halo-motion-scale)),
                calc(-3% * var(--halo-motion-scale))
              )
              rotate(270deg);
          }
        }

        @keyframes falconer-morph {
          0%,
          100% {
            border-radius: 60% 40% 30% 70% / 60% 30% 70% 40%;
          }
          25% {
            border-radius: 30% 60% 70% 40% / 50% 60% 30% 60%;
          }
          50% {
            border-radius: 50% 60% 30% 60% / 30% 60% 70% 40%;
          }
          75% {
            border-radius: 60% 40% 60% 30% / 70% 30% 50% 60%;
          }
        }

        /*
         * Light mode: Cyan center fading to warm peach/cream at edges
         * Designed to blend with light backgrounds
         */
        :root {
          /* Primary: cyan center → teal → warm cream edges */
          --halo-primary-gradient: radial-gradient(
            var(--halo-gradient-shape) at center,
            #06b6d4 0%,
            #14b8a6 15%,
            #8dbfaf 30%,
            #aad8ca 45%,
            #d4c4a8 60%,
            #e8dcc8 75%,
            transparent 90%
          );
          /* Secondary: deeper teal center → muted brown edges */
          --halo-secondary-gradient: radial-gradient(
            var(--halo-gradient-shape) at center,
            #0891b2 0%,
            #0d9488 20%,
            #5da8a0 40%,
            #9cb8a8 55%,
            #c4b89c 70%,
            transparent 85%
          );
          /* Tertiary: warm accent glow */
          --halo-tertiary-gradient: radial-gradient(
            ellipse at 30% 30%,
            #ffedc9 0%,
            #f5d69c 25%,
            #d4b896 45%,
            transparent 65%
          );
          /* Core: bright cyan center */
          --halo-core-gradient: radial-gradient(
            var(--halo-gradient-shape) at center,
            #22d3ee 0%,
            #06b6d4 15%,
            #14b8a6 30%,
            transparent 50%
          );
          /* Glow: soft teal to warm edge */
          --halo-glow-gradient: radial-gradient(
            var(--halo-gradient-shape) at center,
            #8dbfaf 0%,
            #aac8b8 25%,
            #c8c4a8 50%,
            transparent 75%
          );
          --halo-blend-mode: multiply;
          --halo-primary-opacity: 0.45;
          --halo-secondary-opacity: 0.35;
          --halo-tertiary-opacity: 0.25;
          --halo-core-opacity: 0.4;
          --halo-glow-opacity: 0.2;
          --halo-pulse-min: 0.35;
          --halo-pulse-max: 0.55;
        }

        /*
         * Dark mode: Cyan center fading to brown at edges
         * ALL layers must end with brown/dark tones before transparent
         * to blend seamlessly into black backgrounds
         */
        .dark {
          /* Primary: bright cyan center → teal → brown → dark brown → transparent */
          --halo-primary-gradient: radial-gradient(
            var(--halo-gradient-shape) at center,
            #06b6d4 0%,
            #14b8a6 10%,
            #0d9488 20%,
            #0f5e56 30%,
            #2d4a3a 42%,
            #4a4530 54%,
            #5c4a2a 66%,
            #3d3020 78%,
            #1a1510 88%,
            transparent 100%
          );
          /* Secondary: teal center → brown edges → dark */
          --halo-secondary-gradient: radial-gradient(
            var(--halo-gradient-shape) at center,
            #0891b2 0%,
            #0e7490 12%,
            #155e65 24%,
            #1a4a4a 36%,
            #3a4535 50%,
            #4a4028 64%,
            #3a3020 78%,
            #1a1510 90%,
            transparent 100%
          );
          /* Tertiary: warm amber accent → brown → dark */
          --halo-tertiary-gradient: radial-gradient(
            ellipse at 30% 30%,
            #f59e0b 0%,
            #d97706 15%,
            #a36a1a 30%,
            #6b4a1a 45%,
            #3d3018 60%,
            #1a1508 75%,
            transparent 90%
          );
          /* Core: bright teal/cyan center → brown fade (small, centered) */
          --halo-core-gradient: radial-gradient(
            var(--halo-gradient-shape) at center,
            #2dd4bf 0%,
            #14b8a6 15%,
            #0d9488 30%,
            #1a5a4a 45%,
            #2a3a2a 60%,
            transparent 75%
          );
          /* Glow: teal → brown → dark ambient fade */
          --halo-glow-gradient: radial-gradient(
            var(--halo-gradient-shape) at center,
            #0d9488 0%,
            #134e4a 15%,
            #1a3a32 30%,
            #2a352a 45%,
            #332a1a 60%,
            #1a1510 75%,
            transparent 90%
          );
          --halo-blend-mode: screen;
          --halo-primary-opacity: 0.7;
          --halo-secondary-opacity: 0.5;
          --halo-tertiary-opacity: 0.25;
          --halo-core-opacity: 0.4;
          --halo-glow-opacity: 0.35;
          --halo-pulse-min: 0.5;
          --halo-pulse-max: 0.75;
        }

        .halo-container {
          inset: 0;
          width: 100%;
          height: 100%;
          overflow: hidden;
          pointer-events: none;
          z-index: 0;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .halo-container-fixed {
          position: fixed;
        }

        .halo-container-absolute {
          position: absolute;
        }

        .halo-inner {
          position: relative;
          width: calc(100% * var(--halo-scale) * var(--halo-aspect-ratio));
          height: calc(100% * var(--halo-scale));
          transform: translate(var(--halo-offset-x), var(--halo-offset-y));
        }

        .halo-layer {
          position: absolute;
          inset: 0;
          border-radius: 50%;
          mix-blend-mode: var(--halo-blend-mode);
        }

        .halo-primary {
          background: var(--halo-primary-gradient);
          animation:
            falconer-rotate calc(20s / var(--halo-speed-multiplier)) linear
              infinite,
            falconer-morph calc(12s / var(--halo-speed-multiplier)) ease-in-out
              infinite;
          opacity: calc(
            var(--halo-primary-opacity) * var(--halo-opacity-multiplier)
          );
          filter: blur(calc(80px * var(--halo-blur-intensity)));
        }

        .halo-secondary {
          background: var(--halo-secondary-gradient);
          animation:
            falconer-rotate calc(28s / var(--halo-speed-multiplier)) linear
              infinite reverse,
            falconer-pulse calc(5s / var(--halo-speed-multiplier)) ease-in-out
              infinite;
          opacity: calc(
            var(--halo-secondary-opacity) * var(--halo-opacity-multiplier)
          );
          transform: scale(0.9);
          filter: blur(calc(100px * var(--halo-blur-intensity)));
        }

        .halo-tertiary {
          background: var(--halo-tertiary-gradient);
          animation:
            falconer-drift calc(15s / var(--halo-speed-multiplier)) ease-in-out
              infinite,
            falconer-morph calc(10s / var(--halo-speed-multiplier)) ease-in-out
              infinite reverse;
          opacity: calc(
            var(--halo-tertiary-opacity) * var(--halo-opacity-multiplier)
          );
          filter: blur(calc(60px * var(--halo-blur-intensity)));
          transform: scale(0.5) translate(20%, 20%);
        }

        .halo-core {
          background: var(--halo-core-gradient);
          animation: falconer-pulse calc(4s / var(--halo-speed-multiplier))
            ease-in-out infinite;
          opacity: calc(
            var(--halo-core-opacity) * var(--halo-opacity-multiplier)
          );
          filter: blur(calc(40px * var(--halo-blur-intensity)));
          transform: scale(0.4);
        }

        .halo-glow {
          position: absolute;
          inset: -30%;
          background: var(--halo-glow-gradient);
          opacity: calc(
            var(--halo-glow-opacity) * var(--halo-opacity-multiplier)
          );
          filter: blur(calc(120px * var(--halo-blur-intensity)));
          animation: falconer-pulse calc(7s / var(--halo-speed-multiplier))
            ease-in-out infinite;
        }

        @media (prefers-reduced-motion: reduce) {
          .halo-primary,
          .halo-secondary,
          .halo-tertiary,
          .halo-core,
          .halo-glow {
            animation: none;
          }
        }
      `}</style>

      {/* Custom color overrides */}
      {customGradients && (
        <style
          dangerouslySetInnerHTML={{
            __html: `
              :root,
              .dark {
                ${Object.entries(customGradients)
                  .map(([key, value]) => `${key}: ${value};`)
                  .join('\n                ')}
              }
            `,
          }}
        />
      )}

      {/* eslint-disable tailwindcss/no-custom-classname */}
      <div
        className={`halo-container halo-container-${variant} halo-preset-${preset}`}
        aria-hidden="true"
      >
        <div className="halo-inner">
          <div className="halo-glow" />
          <div className="halo-layer halo-primary" />
          <div className="halo-layer halo-secondary" />
          <div className="halo-layer halo-tertiary" />
          <div className="halo-layer halo-core" />
        </div>
        {/* eslint-enable tailwindcss/no-custom-classname */}
      </div>
    </>
  );
}
