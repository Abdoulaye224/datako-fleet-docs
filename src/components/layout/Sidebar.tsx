import { useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { AnimatePresence, motion } from 'framer-motion'
import { BarChart3, BookOpen, ChevronDown, Compass, HelpCircle, Home, Sparkles, Truck, Users, Zap } from 'lucide-react'
import { SearchBar } from '@/components/search/SearchBar'
import { ProfilProgress } from '@/components/ui/ProfilProgress'
import { useProfil } from '@/context/ProfilContext'
import { PROFILS } from '@/data/fleet'
import { TRANSITIONS } from '@/lib/motion'

const navItems = [
  { label: 'Accueil', href: '/', icon: Home },
  { label: 'Profils', href: '/profils', icon: Compass },
  { label: 'Onboarding', href: '/onboarding', icon: Zap },
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
  { label: 'Nouveautés', href: '/nouveautes', icon: Sparkles },
] as const

export function Sidebar() {
  const location = useLocation()
  const [openSections, setOpenSections] = useState<string[]>(['Transport'])
  const { profilActif, progress } = useProfil()
  const profil = PROFILS.find(item => item.id === profilActif)

  const toggleSection = (label: string) => {
    setOpenSections(prev => (prev.includes(label) ? prev.filter(section => section !== label) : [...prev, label]))
  }

  return (
    <nav
      className="sticky top-0 hidden h-screen w-[260px] flex-shrink-0 flex-col overflow-y-auto border-r border-[var(--border)] bg-surface-2 lg:flex"
      aria-label="Navigation principale"
    >
      <div className="border-b border-[var(--border)] px-5 py-5">
        <Link to="/" className="flex items-center gap-2">
          <div
            className="flex h-8 w-8 items-center justify-center rounded-lg text-sm font-bold text-white"
            style={{ background: 'linear-gradient(135deg, var(--gradient-start), var(--gradient-end))' }}
          >
            D
          </div>
          <div>
            <p className="text-sm font-semibold text-[var(--text-primary)]">Datakö Fleet</p>
            <p className="text-xs text-[var(--text-muted)]">Documentation</p>
          </div>
        </Link>

        {profil && (
          <motion.div
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            transition={TRANSITIONS.default}
            className="mt-4 rounded-xl border border-blue-500/20 bg-blue-500/5 p-3"
          >
            <div className="mb-2 flex items-center gap-2 text-xs font-medium text-blue-400">
              <span className="h-2 w-2 rounded-full bg-blue-400" />
              Profil actif
            </div>
            <Link to={`/profils/${profil.id}`} className="text-sm text-[var(--text-primary)] transition-colors hover:text-blue-400">
              {profil.emoji} {profil.nom}
            </Link>
            <ProfilProgress
              done={progress.size}
              total={profil.parcoursRecommande.length}
              className="mt-3"
            />
          </motion.div>
        )}

        <div className="mt-4">
          <SearchBar />
        </div>
      </div>

      <div className="flex-1 space-y-1 px-3 py-4">
        {navItems.map(item => {
          if (!('children' in item)) {
            const isActive = item.href === '/'
              ? location.pathname === '/'
              : location.pathname === item.href || location.pathname.startsWith(`${item.href}/`)

            return (
              <div key={item.href} className="relative">
                {isActive && (
                  <motion.div
                    layoutId="sidebar-active"
                    className="absolute inset-y-0 left-0 w-0.5 rounded-full bg-blue-500"
                    transition={TRANSITIONS.springGentle}
                  />
                )}
                <Link
                  to={item.href}
                  className={`flex items-center gap-2.5 rounded-lg px-3 py-2 text-sm transition-colors ${
                    isActive
                      ? 'bg-blue-500/10 text-blue-400'
                      : 'text-[var(--text-secondary)] hover:bg-surface-3 hover:text-[var(--text-primary)]'
                  }`}
                >
                  <item.icon size={16} />
                  {item.label}
                </Link>
              </div>
            )
          }

          const isOpen = openSections.includes(item.label)
          const isChildActive = item.children.some(child => location.pathname.startsWith(child.href))

          return (
            <div key={item.label}>
              <button
                type="button"
                onClick={() => toggleSection(item.label)}
                className={`flex w-full items-center justify-between gap-2.5 rounded-lg px-3 py-2 text-sm transition-colors ${
                  isChildActive
                    ? 'text-[var(--text-primary)]'
                    : 'text-[var(--text-secondary)] hover:bg-surface-3 hover:text-[var(--text-primary)]'
                }`}
              >
                <span className="flex items-center gap-2.5">
                  <item.icon size={16} />
                  {item.label}
                </span>
                <motion.div animate={{ rotate: isOpen ? 180 : 0 }} transition={TRANSITIONS.fast}>
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
                    <div className="ml-4 mt-1 space-y-0.5 border-l border-[var(--border)] pl-3">
                      {item.children.map(child => {
                        const isActive = location.pathname === child.href || location.pathname.startsWith(`${child.href}/`)
                        return (
                          <Link
                            key={child.href}
                            to={child.href}
                            className={`block rounded-lg px-3 py-1.5 text-xs transition-colors ${
                              isActive
                                ? 'bg-blue-500/10 text-blue-400'
                                : 'text-[var(--text-secondary)] hover:bg-surface-3 hover:text-[var(--text-primary)]'
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

      <div className="border-t border-[var(--border)] px-5 py-4">
        <a
          href="https://fleet.datako.app"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-2 text-xs text-[var(--text-muted)] transition-colors hover:text-[var(--text-secondary)]"
        >
          <BookOpen size={12} />
          Ouvrir Fleet Manager
        </a>
      </div>
    </nav>
  )
}
