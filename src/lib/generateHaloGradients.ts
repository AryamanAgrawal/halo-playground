export interface HaloColors {
  primary: string; // Main center glow (e.g., '#06b6d4')
  secondary: string; // Supporting outer layers (e.g., '#14b8a6')
  accent: string; // Warm accent highlights (e.g., '#f59e0b')
  edge: string; // Fade to background color (e.g., '#e8dcc8')
}

/**
 * Generates CSS custom properties for all halo gradients from base colors
 */
export function generateHaloGradients(
  colors: HaloColors,
  mode: 'light' | 'dark',
): Record<string, string> {
  const { primary, secondary, accent, edge } = colors;

  if (mode === 'light') {
    return {
      '--halo-primary-gradient': `radial-gradient(
        var(--halo-gradient-shape) at center,
        ${primary} 0%,
        ${secondary} 15%,
        ${mixColors(secondary, edge, 0.6)} 30%,
        ${mixColors(secondary, edge, 0.4)} 45%,
        ${mixColors(edge, secondary, 0.7)} 60%,
        ${edge} 75%,
        transparent 90%
      )`,
      '--halo-secondary-gradient': `radial-gradient(
        var(--halo-gradient-shape) at center,
        ${darken(primary, 0.1)} 0%,
        ${secondary} 20%,
        ${mixColors(secondary, edge, 0.5)} 40%,
        ${mixColors(secondary, edge, 0.3)} 55%,
        ${mixColors(edge, secondary, 0.8)} 70%,
        transparent 85%
      )`,
      '--halo-tertiary-gradient': `radial-gradient(
        ellipse at 30% 30%,
        ${lighten(accent, 0.3)} 0%,
        ${lighten(accent, 0.1)} 25%,
        ${mixColors(accent, edge, 0.5)} 45%,
        transparent 65%
      )`,
      '--halo-core-gradient': `radial-gradient(
        var(--halo-gradient-shape) at center,
        ${lighten(primary, 0.2)} 0%,
        ${primary} 15%,
        ${secondary} 30%,
        transparent 50%
      )`,
      '--halo-glow-gradient': `radial-gradient(
        var(--halo-gradient-shape) at center,
        ${mixColors(secondary, edge, 0.6)} 0%,
        ${mixColors(secondary, edge, 0.4)} 25%,
        ${mixColors(edge, secondary, 0.7)} 50%,
        transparent 75%
      )`,
      '--halo-blend-mode': 'multiply',
      '--halo-primary-opacity': '0.45',
      '--halo-secondary-opacity': '0.35',
      '--halo-tertiary-opacity': '0.25',
      '--halo-core-opacity': '0.4',
      '--halo-glow-opacity': '0.2',
      '--halo-pulse-min': '0.35',
      '--halo-pulse-max': '0.55',
    };
  } else {
    // Dark mode
    return {
      '--halo-primary-gradient': `radial-gradient(
        var(--halo-gradient-shape) at center,
        ${primary} 0%,
        ${secondary} 10%,
        ${darken(secondary, 0.2)} 20%,
        ${darken(secondary, 0.4)} 30%,
        ${mixColors(secondary, '#1a1510', 0.3)} 42%,
        ${mixColors(accent, '#1a1510', 0.2)} 54%,
        ${mixColors(accent, '#1a1510', 0.4)} 66%,
        ${darken(accent, 0.6)} 78%,
        #1a1510 88%,
        transparent 100%
      )`,
      '--halo-secondary-gradient': `radial-gradient(
        var(--halo-gradient-shape) at center,
        ${darken(primary, 0.1)} 0%,
        ${darken(secondary, 0.1)} 12%,
        ${darken(secondary, 0.3)} 24%,
        ${darken(secondary, 0.5)} 36%,
        ${mixColors(secondary, '#1a1510', 0.4)} 50%,
        ${mixColors(accent, '#1a1510', 0.3)} 64%,
        ${darken(accent, 0.6)} 78%,
        #1a1510 90%,
        transparent 100%
      )`,
      '--halo-tertiary-gradient': `radial-gradient(
        ellipse at 30% 30%,
        ${accent} 0%,
        ${darken(accent, 0.2)} 15%,
        ${darken(accent, 0.4)} 30%,
        ${darken(accent, 0.6)} 45%,
        ${darken(accent, 0.7)} 60%,
        #1a1510 75%,
        transparent 90%
      )`,
      '--halo-core-gradient': `radial-gradient(
        var(--halo-gradient-shape) at center,
        ${lighten(primary, 0.1)} 0%,
        ${secondary} 15%,
        ${darken(secondary, 0.2)} 30%,
        ${darken(secondary, 0.4)} 45%,
        ${mixColors(secondary, '#1a1510', 0.5)} 60%,
        transparent 75%
      )`,
      '--halo-glow-gradient': `radial-gradient(
        var(--halo-gradient-shape) at center,
        ${darken(secondary, 0.2)} 0%,
        ${darken(secondary, 0.4)} 15%,
        ${darken(secondary, 0.5)} 30%,
        ${mixColors(secondary, '#1a1510', 0.6)} 45%,
        ${mixColors(accent, '#1a1510', 0.5)} 60%,
        #1a1510 75%,
        transparent 90%
      )`,
      '--halo-blend-mode': 'screen',
      '--halo-primary-opacity': '0.7',
      '--halo-secondary-opacity': '0.5',
      '--halo-tertiary-opacity': '0.25',
      '--halo-core-opacity': '0.4',
      '--halo-glow-opacity': '0.35',
      '--halo-pulse-min': '0.5',
      '--halo-pulse-max': '0.75',
    };
  }
}

// Color manipulation utilities
function hexToRgb(hex: string): { r: number; g: number; b: number } | null {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return result
    ? {
        r: parseInt(result[1], 16),
        g: parseInt(result[2], 16),
        b: parseInt(result[3], 16),
      }
    : null;
}

function rgbToHex(r: number, g: number, b: number): string {
  return (
    '#' +
    [r, g, b]
      .map((x) => {
        const hex = Math.round(x).toString(16);
        return hex.length === 1 ? '0' + hex : hex;
      })
      .join('')
  );
}

function lighten(hex: string, amount: number): string {
  const rgb = hexToRgb(hex);
  if (!rgb) return hex;

  const { r, g, b } = rgb;
  return rgbToHex(
    Math.min(255, r + (255 - r) * amount),
    Math.min(255, g + (255 - g) * amount),
    Math.min(255, b + (255 - b) * amount),
  );
}

function darken(hex: string, amount: number): string {
  const rgb = hexToRgb(hex);
  if (!rgb) return hex;

  const { r, g, b } = rgb;
  return rgbToHex(r * (1 - amount), g * (1 - amount), b * (1 - amount));
}

function mixColors(hex1: string, hex2: string, ratio: number): string {
  const rgb1 = hexToRgb(hex1);
  const rgb2 = hexToRgb(hex2);
  if (!rgb1 || !rgb2) return hex1;

  return rgbToHex(
    rgb1.r * ratio + rgb2.r * (1 - ratio),
    rgb1.g * ratio + rgb2.g * (1 - ratio),
    rgb1.b * ratio + rgb2.b * (1 - ratio),
  );
}
