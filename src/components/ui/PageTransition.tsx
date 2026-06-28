import { motion } from 'framer-motion'
import { VARIANTS, TRANSITIONS } from '@/lib/motion'

interface PageTransitionProps {
  children: React.ReactNode
}

export function PageTransition({ children }: PageTransitionProps) {
  return (
    <motion.div
      variants={VARIANTS.slideUp}
      initial="initial"
      animate="animate"
      exit="exit"
      transition={TRANSITIONS.default}
    >
      {children}
    </motion.div>
  )
}
