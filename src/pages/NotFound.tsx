import { Link } from 'react-router-dom'
import { Home } from 'lucide-react'
import { PageTransition } from '@/components/ui/PageTransition'

export function NotFound() {
  return (
    <PageTransition>
      <div className="flex flex-col items-center justify-center min-h-[50vh] text-center space-y-4">
        <p className="text-6xl font-bold text-[#1F2537]">404</p>
        <h1 className="text-xl font-semibold text-[#F1F5F9]">Page introuvable</h1>
        <p className="text-sm text-[#64748B]">Cette page n'existe pas ou a été déplacée.</p>
        <Link
          to="/"
          className="flex items-center gap-2 px-4 py-2 rounded-lg bg-blue-500/10 text-blue-400 hover:bg-blue-500/20 transition-colors text-sm font-medium"
        >
          <Home size={14} />
          Retour à l'accueil
        </Link>
      </div>
    </PageTransition>
  )
}
