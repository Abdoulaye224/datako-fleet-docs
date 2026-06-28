import { useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronDown, Truck, BookOpen, Home, Users, BarChart3, HelpCircle } from 'lucide-react'
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

export function Sidebar() {
  const location = useLocation()
  const [openSections, setOpenSections] = useState<string[]>(['Transport'])

  const toggleSection = (label: string) => {
    setOpenSections(prev =>
      prev.includes(label) ? prev.filter(s => s !== label) : [...prev, label]
    )
  }

  return (
    <nav
      className="hidden lg:flex flex-col w-[260px] flex-shrink-0 border-r border-[rgba(255,255,255,0.08)] bg-[#181C27] h-screen sticky top-0 overflow-y-auto"
      role="navigation"
      aria-label="Navigation principale"
    >
      <div className="px-5 py-5 border-b border-[rgba(255,255,255,0.08)]">
        <Link to="/" className="flex items-center gap-2">
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
      </div>

      <div className="flex-1 px-3 py-4 space-y-1">
        {navItems.map(item => {
          if (!item.children) {
            const isActive = location.pathname === item.href
            return (
              <div key={item.href} className="relative">
                {isActive && (
                  <motion.div
                    layoutId="sidebar-active"
                    className="absolute left-0 top-0 bottom-0 w-0.5 bg-blue-500 rounded-full"
                    transition={TRANSITIONS.springGentle}
                  />
                )}
                <Link
                  to={item.href!}
                  className={`flex items-center gap-2.5 px-3 py-2 rounded-lg text-sm transition-colors ${
                    isActive
                      ? 'bg-blue-500/10 text-blue-400'
                      : 'text-[#94A3B8] hover:bg-[#1F2537] hover:text-[#F1F5F9]'
                  }`}
                >
                  {item.icon && <item.icon size={16} />}
                  {item.label}
                </Link>
              </div>
            )
          }

          const isOpen = openSections.includes(item.label)
          const isChildActive = item.children?.some(c => location.pathname.startsWith(c.href))

          return (
            <div key={item.label}>
              <button
                onClick={() => toggleSection(item.label)}
                className={`w-full flex items-center justify-between gap-2.5 px-3 py-2 rounded-lg text-sm transition-colors ${
                  isChildActive
                    ? 'text-[#F1F5F9]'
                    : 'text-[#94A3B8] hover:bg-[#1F2537] hover:text-[#F1F5F9]'
                }`}
              >
                <span className="flex items-center gap-2.5">
                  {item.icon && <item.icon size={16} />}
                  {item.label}
                </span>
                <motion.div
                  animate={{ rotate: isOpen ? 180 : 0 }}
                  transition={TRANSITIONS.fast}
                >
                  <ChevronDown size={14} />
                </motion.div>
              </button>

              <AnimatePresence initial={false}>
                {isOpen && (
                  <motion.div
                    initial={false}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={TRANSITIONS.default}
                    className="overflow-hidden"
                  >
                    <div className="ml-4 pl-3 border-l border-[rgba(255,255,255,0.08)] mt-1 space-y-0.5">
                      {item.children?.map(child => {
                        const isActive = location.pathname === child.href || location.pathname.startsWith(child.href + '/')
                        return (
                          <Link
                            key={child.href}
                            to={child.href}
                            className={`block px-3 py-1.5 rounded-lg text-xs transition-colors ${
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
    </nav>
  )
}
