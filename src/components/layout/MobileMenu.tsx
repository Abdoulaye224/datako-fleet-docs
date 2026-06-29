import { useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { BarChart3, BookOpen, ChevronDown, Compass, HelpCircle, Home, MessageCircle, Package, Sparkles, Truck, Users, X, Zap } from 'lucide-react'
import { Link, useLocation } from 'react-router-dom'
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
  {
    label: 'Vente / Distribution',
    icon: Package,
    children: [
      { label: 'Comprendre les pages', href: '/vente/pages' },
      { label: 'Guides pas-à-pas', href: '/vente/guides' },
      { label: 'Indicateurs vente', href: '/vente/indicateurs' },
    ],
  },
  { label: 'WhatsApp', href: '/whatsapp', icon: MessageCircle },
  { label: 'Portail Propriétaire', href: '/portail-proprietaire', icon: BookOpen },
  { label: 'Les rôles', href: '/roles', icon: Users },
  { label: 'Indicateurs', href: '/indicateurs', icon: BarChart3 },
  { label: 'FAQ', href: '/faq', icon: HelpCircle },
  { label: 'Nouveautés', href: '/nouveautes', icon: Sparkles },
] as const

interface MobileMenuProps {
  isOpen: boolean
  onClose: () => void
}

export function MobileMenu({ isOpen, onClose }: MobileMenuProps) {
  const location = useLocation()
  const [openSections, setOpenSections] = useState<string[]>(['Transport'])
  const { profilActif } = useProfil()
  const profil = PROFILS.find(item => item.id === profilActif)

  useEffect(() => {
    if (!isOpen) return

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') onClose()
    }

    document.addEventListener('keydown', handleKeyDown)
    return () => document.removeEventListener('keydown', handleKeyDown)
  }, [isOpen, onClose])

  const toggleSection = (label: string) => {
    setOpenSections(prev => (prev.includes(label) ? prev.filter(section => section !== label) : [...prev, label]))
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
            className="fixed inset-0 z-40 bg-black/60 backdrop-blur-sm lg:hidden"
            onClick={onClose}
          />

          <motion.nav
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
            className="fixed inset-y-0 left-0 z-50 w-72 overflow-y-auto border-r border-[var(--border)] bg-surface-2 lg:hidden"
            aria-label="Navigation mobile"
          >
            <div className="border-b border-[var(--border)] px-5 py-4">
              <div className="flex items-center justify-between">
                <Link to="/" onClick={onClose} className="flex items-center gap-2">
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
                <button
                  type="button"
                  onClick={onClose}
                  className="flex h-10 w-10 items-center justify-center rounded-xl text-[var(--text-secondary)] transition-colors hover:bg-surface-3 hover:text-[var(--text-primary)]"
                  aria-label="Fermer le menu"
                >
                  <X size={18} />
                </button>
              </div>

              {profil && (
                <div className="mt-4 rounded-xl border border-blue-500/20 bg-blue-500/5 p-3">
                  <p className="text-xs font-medium text-blue-400">Profil actif</p>
                  <Link
                    to={`/profils/${profil.id}`}
                    onClick={onClose}
                    className="mt-1 block text-sm text-[var(--text-primary)] transition-colors hover:text-blue-400"
                  >
                    {profil.emoji} {profil.nom}
                  </Link>
                </div>
              )}
            </div>

            <div className="space-y-1 px-3 py-4">
              {navItems.map(item => {
                if (!('children' in item)) {
                  const isActive = item.href === '/'
                    ? location.pathname === '/'
                    : location.pathname === item.href || location.pathname.startsWith(`${item.href}/`)

                  return (
                    <Link
                      key={item.href}
                      to={item.href}
                      onClick={onClose}
                      className={`flex min-h-[44px] items-center gap-2.5 rounded-lg px-3 py-2.5 text-sm transition-colors ${
                        isActive
                          ? 'bg-blue-500/10 text-blue-400'
                          : 'text-[var(--text-secondary)] hover:bg-surface-3 hover:text-[var(--text-primary)]'
                      }`}
                    >
                      <item.icon size={16} />
                      {item.label}
                    </Link>
                  )
                }

                const isOpenSection = openSections.includes(item.label)

                return (
                  <div key={item.label}>
                    <button
                      type="button"
                      onClick={() => toggleSection(item.label)}
                      className="flex min-h-[44px] w-full items-center justify-between gap-2.5 rounded-lg px-3 py-2.5 text-sm text-[var(--text-secondary)] transition-colors hover:bg-surface-3 hover:text-[var(--text-primary)]"
                    >
                      <span className="flex items-center gap-2.5">
                        <item.icon size={16} />
                        {item.label}
                      </span>
                      <motion.div animate={{ rotate: isOpenSection ? 180 : 0 }} transition={TRANSITIONS.fast}>
                        <ChevronDown size={14} />
                      </motion.div>
                    </button>

                    <AnimatePresence initial={false}>
                      {isOpenSection && (
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
                                  onClick={onClose}
                                  className={`flex min-h-[40px] items-center rounded-lg px-3 py-2 text-sm transition-colors ${
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
          </motion.nav>
        </>
      )}
    </AnimatePresence>
  )
}
