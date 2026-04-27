'use client'

import Link from 'next/link'
import { Shield, Sparkles } from 'lucide-react'

export function AdminNavbar() {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 glass">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Link href="/admin/dashboard" className="flex items-center gap-2">
            <Sparkles className="w-6 h-6 text-accent-purple" />
            <span className="text-xl font-bold gradient-text">VibeWallpaper</span>
            <span className="px-2 py-0.5 rounded-full bg-accent-purple/20 text-accent-purple text-xs font-medium">
              Admin
            </span>
          </Link>
          
          <div className="flex items-center gap-4">
            <Link 
              href="/" 
              target="_blank"
              className="text-text-secondary hover:text-text-primary text-sm transition-colors"
            >
              View Site
            </Link>
          </div>
        </div>
      </div>
    </nav>
  )
}
