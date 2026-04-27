'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { motion } from 'framer-motion'
import { Lock, Shield, Sparkles, Eye, Download, Image as ImageIcon, Video } from 'lucide-react'

export default function AdminLoginPage() {
  const router = useRouter()
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const [stats, setStats] = useState({
    totalWallpapers: 0,
    liveWallpapers: 0,
    staticWallpapers: 0,
    totalDownloads: 0,
  })

  useEffect(() => {
    // Check if already logged in
    const isAuth = sessionStorage.getItem('admin-auth')
    if (isAuth === 'true') {
      router.push('/admin/dashboard')
    }

    // Fetch public stats
    fetch('/api/wallpapers?limit=1000')
      .then(res => res.json())
      .then(data => {
        const wallpapers = data.wallpapers || []
        setStats({
          totalWallpapers: wallpapers.length,
          liveWallpapers: wallpapers.filter((w: any) => w.type === 'live').length,
          staticWallpapers: wallpapers.filter((w: any) => w.type === 'static').length,
          totalDownloads: wallpapers.reduce((acc: number, w: any) => acc + (w.downloads || 0), 0),
        })
      })
  }, [router])

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError('')

    try {
      const res = await fetch('/api/admin/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password }),
      })

      if (res.ok) {
        sessionStorage.setItem('admin-auth', 'true')
        router.push('/admin/dashboard')
      } else {
        setError('Invalid credentials')
      }
    } catch {
      setError('Login failed')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <div className="w-full max-w-md">
        {/* Logo */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-8"
        >
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-accent-purple/20 mb-4">
            <Sparkles className="w-8 h-8 text-accent-purple" />
          </div>
          <h1 className="text-2xl font-bold text-text-primary">Vibe Wallpaper</h1>
          <p className="text-text-secondary">Admin Panel</p>
        </motion.div>

        {/* Stats Preview */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="grid grid-cols-2 gap-4 mb-8"
        >
          <div className="glass rounded-xl p-4 text-center">
            <ImageIcon className="w-5 h-5 text-accent-purple mx-auto mb-2" />
            <p className="text-2xl font-bold text-text-primary">{stats.totalWallpapers}</p>
            <p className="text-xs text-text-muted">Total</p>
          </div>
          <div className="glass rounded-xl p-4 text-center">
            <Video className="w-5 h-5 text-accent-cyan mx-auto mb-2" />
            <p className="text-2xl font-bold text-text-primary">{stats.liveWallpapers}</p>
            <p className="text-xs text-text-muted">Live</p>
          </div>
        </motion.div>

        {/* Login Form */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="glass rounded-2xl p-8"
        >
          <div className="flex items-center gap-3 mb-6">
            <div className="p-2 rounded-lg bg-accent-purple/20">
              <Shield className="w-5 h-5 text-accent-purple" />
            </div>
            <h2 className="text-xl font-semibold text-text-primary">Secure Login</h2>
          </div>

          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block text-sm text-text-secondary mb-2">Username</label>
              <div className="relative">
                <input
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="w-full bg-surface-light border border-surface-light rounded-xl pl-10 pr-4 py-3 text-text-primary focus:outline-none focus:border-accent-purple transition-colors"
                  placeholder="Enter username"
                  required
                />
                <Shield className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-text-muted" />
              </div>
            </div>

            <div>
              <label className="block text-sm text-text-secondary mb-2">Password</label>
              <div className="relative">
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full bg-surface-light border border-surface-light rounded-xl pl-10 pr-4 py-3 text-text-primary focus:outline-none focus:border-accent-purple transition-colors"
                  placeholder="Enter password"
                  required
                />
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-text-muted" />
              </div>
            </div>

            {error && (
              <p className="text-red-400 text-sm">{error}</p>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full flex items-center justify-center gap-2 px-6 py-3 bg-accent-purple hover:bg-accent-purple/90 disabled:opacity-50 text-white rounded-xl font-medium transition-colors"
            >
              {loading ? 'Logging in...' : 'Login to Admin'}
            </button>
          </form>
        </motion.div>

        <p className="text-center text-text-muted text-sm mt-8">
          Protected area. Unauthorized access prohibited.
        </p>
      </div>
    </div>
  )
}
