import { motion } from 'framer-motion'
import { VARIANTS, TRANSITIONS } from '@/lib/motion'

interface StaggerListProps {
  children: React.ReactNode[]
  className?: string
}

export function StaggerList({ children, className }: StaggerListProps) {
  return (
    <motion.div
      className={className}
      variants={VARIANTS.stagger}
      initial="initial"
      animate="animate"
    >
      {children.map((child, i) => (
        <motion.div key={i} variants={VARIANTS.slideUp} transition={TRANSITIONS.default}>
          {child}
        </motion.div>
      ))}
    </motion.div>
  )
}
