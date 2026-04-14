import { motion } from 'motion/react';

const shapes = [
  { type: 'square', size: 50, x: '8%', y: '18%', rotate: 15, duration: 8, delay: 0 },
  { type: 'square', size: 30, x: '82%', y: '30%', rotate: -20, duration: 10, delay: 1 },
  { type: 'square', size: 40, x: '68%', y: '72%', rotate: 45, duration: 9, delay: 0.5 },
  { type: 'circle', size: 38, x: '22%', y: '65%', rotate: 0, duration: 7, delay: 0.3 },
  { type: 'circle', size: 26, x: '78%', y: '12%', rotate: 0, duration: 11, delay: 1.5 },
  { type: 'circle', size: 55, x: '48%', y: '82%', rotate: 0, duration: 8.5, delay: 0.8 },
  { type: 'triangle', size: 42, x: '12%', y: '45%', rotate: 30, duration: 9, delay: 0.2 },
  { type: 'triangle', size: 34, x: '88%', y: '55%', rotate: -15, duration: 10, delay: 1.2 },
  { type: 'triangle', size: 28, x: '38%', y: '10%', rotate: 60, duration: 7.5, delay: 0.6 },
  { type: 'diamond', size: 36, x: '58%', y: '22%', rotate: 0, duration: 9.5, delay: 0.4 },
  { type: 'diamond', size: 24, x: '5%', y: '78%', rotate: 0, duration: 8, delay: 1.8 },
  { type: 'hexagon', size: 40, x: '72%', y: '45%', rotate: 10, duration: 10.5, delay: 0.7 },
  { type: 'hexagon', size: 30, x: '32%', y: '35%', rotate: -25, duration: 8, delay: 1.1 },
];

function ShapeElement({ type, size }: { type: string; size: number }) {
  const glowFilter = (
    <defs>
      <filter id={`glow-${type}`} x="-50%" y="-50%" width="200%" height="200%">
        <feGaussianBlur stdDeviation="4" result="blur" />
        <feFlood floodColor="hsl(270, 80%, 65%)" floodOpacity="0.8" result="color" />
        <feComposite in="color" in2="blur" operator="in" result="shadow" />
        <feMerge>
          <feMergeNode in="shadow" />
          <feMergeNode in="shadow" />
          <feMergeNode in="SourceGraphic" />
        </feMerge>
      </filter>
      <filter id={`dim-${type}`} x="-50%" y="-50%" width="200%" height="200%">
        <feGaussianBlur stdDeviation="1.5" result="blur" />
        <feFlood floodColor="hsl(270, 60%, 50%)" floodOpacity="0.25" result="color" />
        <feComposite in="color" in2="blur" operator="in" result="shadow" />
        <feMerge>
          <feMergeNode in="shadow" />
          <feMergeNode in="SourceGraphic" />
        </feMerge>
      </filter>
    </defs>
  );
  const color = 'hsl(270 80% 75%)';
  const f = `url(#glow-${type})`;

  switch (type) {
    case 'square':
      return (
        <svg width={size} height={size} viewBox="0 0 40 40" style={{ overflow: 'visible' }}>
          {glowFilter}
          <rect x="2" y="2" width="36" height="36" rx="4" fill="none" stroke={color} strokeWidth="1.5" filter={f} />
        </svg>
      );
    case 'circle':
      return (
        <svg width={size} height={size} viewBox="0 0 40 40" style={{ overflow: 'visible' }}>
          {glowFilter}
          <circle cx="20" cy="20" r="18" fill="none" stroke={color} strokeWidth="1.5" filter={f} />
        </svg>
      );
    case 'triangle':
      return (
        <svg width={size} height={size} viewBox="0 0 40 40" style={{ overflow: 'visible' }}>
          {glowFilter}
          <polygon points="20,2 38,38 2,38" fill="none" stroke={color} strokeWidth="1.5" filter={f} />
        </svg>
      );
    case 'diamond':
      return (
        <svg width={size} height={size} viewBox="0 0 40 40" style={{ overflow: 'visible' }}>
          {glowFilter}
          <polygon points="20,2 38,20 20,38 2,20" fill="none" stroke={color} strokeWidth="1.5" filter={f} />
        </svg>
      );
    case 'hexagon':
      return (
        <svg width={size} height={size} viewBox="0 0 40 40" style={{ overflow: 'visible' }}>
          {glowFilter}
          <polygon points="20,2 36,11 36,29 20,38 4,29 4,11" fill="none" stroke={color} strokeWidth="1.5" filter={f} />
        </svg>
      );
    default:
      return null;
  }
}

export default function FloatingShapes() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none z-[5]">
      {shapes.map((shape, i) => (
        <motion.div
          key={i}
          className="absolute"
          style={{ left: shape.x, top: shape.y }}
          animate={{
            y: [0, -25, 0, 25, 0],
            rotate: [shape.rotate, shape.rotate + 180, shape.rotate + 360],
            opacity: [0.15, 0.7, 0.15],
            scale: [0.9, 1.1, 0.9],
          }}
          transition={{
            duration: shape.duration,
            delay: shape.delay,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        >
          <ShapeElement type={shape.type} size={shape.size} />
        </motion.div>
      ))}
    </div>
  );
}
