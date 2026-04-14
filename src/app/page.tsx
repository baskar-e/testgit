'use client'

import FloatingShapes from '@/components/FloatingShapes';
import LightRays from '@/components/LightRays'
import ShinyText from '@/components/ShinyText';

export default function Home() {
  return (
    <section className="relative w-full h-screen flex items-center justify-center overflow-hidden">
      <FloatingShapes />
      <div className="absolute inset-0 bg-[hsl(240,10%,4%)]">
        <LightRays
          raysOrigin="top-center"
          raysColor="#8b5cf6"
          raysSpeed={1}
          lightSpread={1.2}
          rayLength={3}
          followMouse={true}
          mouseInfluence={0.15}
          fadeDistance={1}
        />
      </div>
      <div className="relative z-10 text-center pointer-events-auto">
        <h1 className="text-6xl sm:text-7xl md:text-8xl lg:text-9xl font-extrabold tracking-tight">
          <ShinyText
            text="ShapeS Library"
            speed={3}
            color="#b5b5b5"
            shineColor="hsl(0, 0%, 100%)"
            spread={120}
          //  className="font-black"
          />
        </h1>
        <p className="mt-6 text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto px-4">
          A curated collection of beautiful, animated React components
        </p>
      </div>
    </section>
  );
}
