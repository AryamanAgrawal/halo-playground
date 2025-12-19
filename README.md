# Halo Playground

Interactive playground for experimenting with the Halo animated background component. Create stunning aurora-like gradient animations with full customization controls.

## Features

- 🎨 **8 Preset Positions** - Center, top/bottom corners, edges, and chat-glow
- 🌈 **Custom Color Palettes** - 4-color gradient system (Primary, Secondary, Accent, Edge)
- 🎭 **Light/Dark Mode** - Seamless theme switching
- ⚡ **Motion Controls** - Adjust speed, scale, blur, and opacity
- 📤 **Export CSS** - Copy settings as CSS variables
- 🔗 **URL Sharing** - Share configurations via URL parameters
- 🖼️ **Preset Gallery** - View all presets side-by-side
- 💻 **Code Viewer** - See React implementation code

## Quick Start

### Installation

```bash
# Install dependencies
pnpm install

# Run development server
pnpm dev
```

The playground will be available at `http://localhost:3001`

### Build for Production

```bash
pnpm build
pnpm start
```

## Usage

### Basic Usage

```tsx
import { Halo } from '@/components/Halo';

export default function MyPage() {
  return (
    <div className="relative min-h-screen">
      <Halo preset="bottom-left" />

      <div className="relative z-10">
        {/* Your content here */}
      </div>
    </div>
  );
}
```

### With Custom Colors

```tsx
<Halo
  preset="center"
  customColors={{
    primary: '#06b6d4',
    secondary: '#14b8a6',
    accent: '#f5d69c',
    edge: '#e8dcc8',
  }}
/>
```

## Configuration

### Presets

| Preset | Description |
|--------|-------------|
| `center` | Centered glow effect |
| `top-left` | Positioned in top-left corner |
| `top-right` | Positioned in top-right corner |
| `top-center` | Positioned at top center |
| `bottom-left` | Positioned in bottom-left corner (default) |
| `bottom-center` | Positioned at bottom center |
| `bottom-right` | Positioned in bottom-right corner |
| `chat-glow` | Optimized for chat interfaces |

### Color System

The Halo uses a 4-color gradient system:

- **Primary**: Main gradient color (default: `#06b6d4` - Cyan)
- **Secondary**: Secondary gradient color (default: `#14b8a6` - Teal)
- **Accent**: Tertiary gradient color (default: `#f5d69c` - Warm peach)
- **Edge**: Edge/rim color (default: `#e8dcc8` - Cream)

### Motion Controls

Control animation behavior via CSS variables:

```css
:root {
  --halo-speed-multiplier: 0.25;     /* 0.1-2.0, controls animation speed */
  --halo-motion-scale: 1;            /* 0-2, movement intensity */
  --halo-blur-intensity: 1;          /* 0.5-2, blur amount */
  --halo-opacity-multiplier: 1;      /* 0.3-1.5, overall opacity */
}
```

### Component Props

```typescript
interface HaloProps {
  preset?: HaloPreset;              // Default: 'center'
  variant?: 'fixed' | 'absolute';   // Default: 'fixed'
  customColors?: HaloColors | null; // Optional custom palette
}

interface HaloColors {
  primary: string;    // Hex color
  secondary: string;  // Hex color
  accent: string;     // Hex color
  edge: string;       // Hex color
}
```

## Interactive Features

### Export CSS

Click the "Export CSS" button in the playground to copy your current settings as CSS variables. Paste into your stylesheet to replicate the exact configuration.

### Share Configurations

Click "Share Configuration" to copy a URL containing all your settings. Anyone with the link can instantly load your exact Halo configuration.

### Gallery

Visit `/gallery` to see all 8 presets displayed side-by-side. Click "Try This Preset" on any card to load it in the playground.

## Development

### Project Structure

```
halo-playground/
├── src/
│   ├── app/
│   │   ├── layout.tsx           # Root layout
│   │   ├── page.tsx             # Main playground page
│   │   └── gallery/
│   │       └── page.tsx         # Preset gallery
│   ├── components/
│   │   ├── Halo.tsx             # Main Halo component
│   │   ├── HaloControls.tsx    # Interactive controls
│   │   ├── CodeViewer.tsx      # Code display
│   │   └── ui/                  # UI primitives
│   ├── lib/
│   │   └── generateHaloGradients.ts  # Gradient generation
│   └── styles/
│       └── globals.css          # Global styles
├── package.json
├── tailwind.config.ts
└── tsconfig.json
```

### Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Animation**: Framer Motion
- **Port**: 3001 (to avoid conflicts with other projects)

### Scripts

```bash
pnpm dev        # Start development server
pnpm build      # Build for production
pnpm start      # Start production server
pnpm lint       # Run ESLint
```

## Examples

### Subtle Background

```tsx
<Halo
  preset="bottom-left"
  customColors={{
    primary: '#e0e7ff',
    secondary: '#ddd6fe',
    accent: '#fce7f3',
    edge: '#fef3c7',
  }}
/>
```

Apply motion controls for subtlety:
```css
:root {
  --halo-speed-multiplier: 0.15;
  --halo-motion-scale: 0.5;
  --halo-opacity-multiplier: 0.5;
}
```

### Vibrant Center Glow

```tsx
<Halo
  preset="center"
  customColors={{
    primary: '#ec4899',
    secondary: '#8b5cf6',
    accent: '#3b82f6',
    edge: '#06b6d4',
  }}
/>
```

Apply motion controls for intensity:
```css
:root {
  --halo-speed-multiplier: 0.4;
  --halo-motion-scale: 1.5;
  --halo-opacity-multiplier: 1.2;
}
```

### Chat Interface Glow

```tsx
<Halo
  preset="chat-glow"
  customColors={{
    primary: '#10b981',
    secondary: '#14b8a6',
    accent: '#06b6d4',
    edge: '#0ea5e9',
  }}
/>
```

## License

MIT - Feel free to use in your own projects!

## Credits

Built with inspiration from modern gradient aesthetics and aurora animations.
