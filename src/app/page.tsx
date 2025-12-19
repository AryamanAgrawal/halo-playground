'use client';

import { Halo } from '@/components/Halo';

export default function Home() {
  return (
    <main className="relative flex min-h-screen flex-col items-center justify-center p-24">
      <Halo preset="bottom-left" />

      <div className="relative z-10 flex flex-col items-center gap-8">
        <h1 className="text-6xl font-bold text-neutral-900 dark:text-white">
          Halo Playground
        </h1>
        <p className="text-xl text-neutral-600 dark:text-neutral-400">
          Interactive animated background component
        </p>
      </div>
    </main>
  );
}
