export const TRANSITIONS = {
  fast:    { duration: 0.15, ease: 'easeOut' as const },
  default: { duration: 0.25, ease: [0.25, 0.46, 0.45, 0.94] as [number, number, number, number] },
  slow:    { duration: 0.4,  ease: [0.25, 0.46, 0.45, 0.94] as [number, number, number, number] },
  spring:  { type: 'spring' as const, stiffness: 400, damping: 30 },
  springGentle: { type: 'spring' as const, stiffness: 200, damping: 25 },
} as const

export const VARIANTS = {
  fadeIn: {
    initial: { opacity: 0 },
    animate: { opacity: 1 },
    exit:    { opacity: 0 },
  },
  slideUp: {
    initial: { opacity: 0, y: 16 },
    animate: { opacity: 1, y: 0 },
    exit:    { opacity: 0, y: -8 },
  },
  slideInLeft: {
    initial: { opacity: 0, x: -20 },
    animate: { opacity: 1, x: 0 },
    exit:    { opacity: 0, x: -20 },
  },
  scaleIn: {
    initial: { opacity: 0, scale: 0.95 },
    animate: { opacity: 1, scale: 1 },
    exit:    { opacity: 0, scale: 0.95 },
  },
  stagger: {
    animate: { transition: { staggerChildren: 0.06 } },
  },
} as const
