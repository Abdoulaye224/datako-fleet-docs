import { useState } from 'react'
import { Outlet } from 'react-router-dom'
import { Sidebar } from './Sidebar'
import { MobileHeader } from './MobileHeader'
import { MobileMenu } from './MobileMenu'

export function Layout() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  return (
    <div className="flex min-h-screen bg-[#0F1117]">
      <Sidebar />
      <div className="flex-1 flex flex-col min-w-0">
        <MobileHeader
          onMenuOpen={() => setMobileMenuOpen(true)}
        />
        <MobileMenu
          isOpen={mobileMenuOpen}
          onClose={() => setMobileMenuOpen(false)}
        />
        <main className="flex-1 px-6 py-8 lg:px-10 lg:py-10 max-w-4xl" role="main">
          <Outlet />
        </main>
      </div>
    </div>
  )
}
