import { Menu, Search } from 'lucide-react'
import { Link } from 'react-router-dom'

interface MobileHeaderProps {
  onMenuOpen: () => void
  onSearchOpen?: () => void
}

export function MobileHeader({ onMenuOpen, onSearchOpen }: MobileHeaderProps) {
  return (
    <header className="lg:hidden flex items-center justify-between px-4 py-3 border-b border-[rgba(255,255,255,0.08)] bg-[#181C27] sticky top-0 z-30">
      <button
        onClick={onMenuOpen}
        className="w-10 h-10 flex items-center justify-center rounded-lg hover:bg-[#1F2537] transition-colors"
        aria-label="Ouvrir le menu"
      >
        <Menu size={20} className="text-[#94A3B8]" />
      </button>

      <Link to="/" className="flex items-center gap-2">
        <div
          className="w-7 h-7 rounded-lg flex items-center justify-center text-white font-bold text-xs"
          style={{ background: 'linear-gradient(135deg, #2563EB, #7C3AED)' }}
        >
          D
        </div>
        <span className="text-sm font-semibold text-[#F1F5F9]">Datakö Fleet</span>
      </Link>

      <button
        onClick={onSearchOpen}
        className="w-10 h-10 flex items-center justify-center rounded-lg hover:bg-[#1F2537] transition-colors"
        aria-label="Rechercher"
      >
        <Search size={20} className="text-[#94A3B8]" />
      </button>
    </header>
  )
}
