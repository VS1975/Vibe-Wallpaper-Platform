import { Metadata } from 'next'
import { Inter } from 'next/font/google'
import '../globals.css'
import { AdminNavbar } from '@/components/admin-navbar'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Admin - Vibe Wallpaper',
  description: 'Admin panel for managing wallpapers',
}

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className="dark">
      <body className={`${inter.className} bg-background text-text-primary antialiased`}>
        <AdminNavbar />
        <main className="min-h-screen pt-16">
          {children}
        </main>
      </body>
    </html>
  )
}
