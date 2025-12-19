import type { Metadata } from 'next';
import { Montserrat, Rajdhani, Orbitron, Kanit, Syncopate } from 'next/font/google';
import '@/styles/globals.css';

const montserrat = Montserrat({
  subsets: ['latin'],
  variable: '--font-montserrat',
  weight: ['400', '500', '600', '700'],
});

const rajdhani = Rajdhani({
  subsets: ['latin'],
  variable: '--font-rajdhani',
  weight: ['300', '400', '500', '600', '700'],
});

const orbitron = Orbitron({
  subsets: ['latin'],
  variable: '--font-orbitron',
  weight: ['400', '500', '600', '700', '800', '900'],
});

const kanit = Kanit({
  subsets: ['latin'],
  variable: '--font-kanit',
  weight: ['400', '500', '600', '700', '800', '900'],
});

const syncopate = Syncopate({
  subsets: ['latin'],
  variable: '--font-syncopate',
  weight: ['400', '700'],
});

export const metadata: Metadata = {
  title: 'Halo Playground',
  description: 'Interactive playground for the Halo animated background component',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark">
      <body
        className={`${montserrat.variable} ${rajdhani.variable} ${orbitron.variable} ${kanit.variable} ${syncopate.variable} font-rajdhani`}
      >
        {children}
      </body>
    </html>
  );
}
