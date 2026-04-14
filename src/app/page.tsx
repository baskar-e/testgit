'use client'

import { ComponentShowcase } from '@/components/componentShowcase';
import { HeroBanner } from '@/components/heroBanner';

export default function Home() {
  return (
    <main className="min-h-screen h-dvh bg-[hsl(240,10%,4%)] overflow-y-auto no-scrollbar">
      <HeroBanner />
      <ComponentShowcase />
    </main>
  );
}
