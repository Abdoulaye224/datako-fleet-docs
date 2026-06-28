import { motion, AnimatePresence } from 'framer-motion'
import { X, Home, Truck, Users, BarChart3, HelpCircle, BookOpen, ChevronDown } from 'lucide-react'
import { Link, useLocation } from 'react-router-dom'
import { useState } from 'react'
import { TRANSITIONS } from '@/lib/motion'

const navItems = [
  { label: 'Accueil', href: '/', icon: Home },
  {
    label: 'Transport',
    icon: Truck,
    children: [
      { label: 'Comprendre les pages', href: '/transport/pages' },
      { label: 'Guides pas-à-pas', href: '/transport/guides' },
      { label: "Cycle d'une rotation", href: '/transport/cycle' },
      { label: 'Cas particuliers', href: '/transport/cas-particuliers' },
    ],
  },
  { label: 'Les rôles', href: '/roles', icon: Users },
  { label: 'Indicateurs', href: '/indicateurs', icon: BarChart3 },
  { label: 'FAQ', href: '/faq', icon: HelpCircle },
]

interface MobileMenuProps {
  isOpen: boolean
  onClose: () => void
}

export function MobileMenu({ isOpen, onClose }: MobileMenuProps) {
  const location = useLocation()
  const [openSections, setOpenSections] = useState<string[]>(['Transport'])

  const toggleSection = (label: string) => {
    setOpenSections(prev =>
      prev.includes(label) ? prev.filter(s => s !== label) : [...prev, label]
    )
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={TRANSITIONS.fast}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40 lg:hidden"
            onClick={onClose}
          />

          <motion.div
            initial={{ x: '-100%' }}
            animate={{ x: 0 }}
            exit={{ x: '-100%' }}
            transition={TRANSITIONS.springGentle}
            drag="x"
            dragConstraints={{ left: 0, right: 0 }}
            dragElastic={{ left: 0.3, right: 0 }}
            onDragEnd={(_: unknown, info: { offset: { x: number } }) => {
              if (info.offset.x < -80) onClose()
            }}
            className="fixed left-0 top-0 bottom-0 w-72 bg-[#181C27] z-50 overflow-y-auto lg:hidden border-r border-[rgba(255,255,255,0.08)]"
          >
            <div className="flex items-center justify-between px-5 py-4 border-b border-[rgba(255,255,255,0.08)]">
              <Link to="/" onClick={onClose} className="flex items-center gap-2">
                <div
                  className="w-8 h-8 rounded-lg flex items-center justify-center text-white font-bold text-sm"
                  style={{ background: 'linear-gradient(135deg, #2563EB, #7C3AED)' }}
                >
                  D
                </div>
                <div>
                  <p className="text-sm font-semibold text-[#F1F5F9]">Datakö Fleet</p>
                  <p className="text-xs text-[#64748B]">Documentation</p>
                </div>
              </Link>
              <button
                onClick={onClose}
                className="w-8 h-8 flex items-center justify-center rounded-lg hover:bg-[#1F2537] transition-colors"
                aria-label="Fermer le menu"
              >
                <X size={18} className="text-[#94A3B8]" />
              </button>
            </div>

            <div className="px-3 py-4 space-y-1">
              {navItems.map(item => {
                if (!item.children) {
                  const isActive = location.pathname === item.href
                  return (
                    <Link
                      key={item.href}
                      to={item.href!}
                      onClick={onClose}
                      className={`flex items-center gap-2.5 px-3 py-2.5 rounded-lg text-sm min-h-[44px] transition-colors ${
                        isActive
                          ? 'bg-blue-500/10 text-blue-400'
                          : 'text-[#94A3B8] hover:bg-[#1F2537] hover:text-[#F1F5F9]'
                      }`}
                    >
                      {item.icon && <item.icon size={16} />}
                      {item.label}
                    </Link>
                  )
                }

                const isOpen2 = openSections.includes(item.label)

                return (
                  <div key={item.label}>
                    <button
                      onClick={() => toggleSection(item.label)}
                      className="w-full flex items-center justify-between gap-2.5 px-3 py-2.5 rounded-lg text-sm min-h-[44px] text-[#94A3B8] hover:bg-[#1F2537] hover:text-[#F1F5F9] transition-colors"
                    >
                      <span className="flex items-center gap-2.5">
                        {item.icon && <item.icon size={16} />}
                        {item.label}
                      </span>
                      <motion.div animate={{ rotate: isOpen2 ? 180 : 0 }} transition={TRANSITIONS.fast}>
                        <ChevronDown size={14} />
                      </motion.div>
                    </button>

                    <AnimatePresence initial={false}>
                      {isOpen2 && (
                        <motion.div
                          initial={false}
                          animate={{ height: 'auto', opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={TRANSITIONS.default}
                          className="overflow-hidden"
                        >
                          <div className="ml-4 pl-3 border-l border-[rgba(255,255,255,0.08)] mt-1 space-y-0.5">
                            {item.children?.map(child => {
                              const isActive = location.pathname.startsWith(child.href)
                              return (
                                <Link
                                  key={child.href}
                                  to={child.href}
                                  onClick={onClose}
                                  className={`flex items-center px-3 py-2 rounded-lg text-sm min-h-[40px] transition-colors ${
                                    isActive
                                      ? 'bg-blue-500/10 text-blue-400'
                                      : 'text-[#94A3B8] hover:bg-[#1F2537] hover:text-[#F1F5F9]'
                                  }`}
                                >
                                  {child.label}
                                </Link>
                              )
                            })}
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                )
              })}
            </div>

            <div className="px-5 py-4 border-t border-[rgba(255,255,255,0.08)]">
              <a
                href="https://fleet.datako.app"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-xs text-[#64748B] hover:text-[#94A3B8] transition-colors"
              >
                <BookOpen size={12} />
                Ouvrir Fleet Manager
              </a>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}
