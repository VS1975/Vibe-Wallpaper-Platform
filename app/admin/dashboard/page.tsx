'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { motion } from 'framer-motion'
import { 
  Image as ImageIcon, Video, Upload, Trash2, Edit, 
  Eye, TrendingUp, Plus, Search, LogOut, CheckCircle
} from 'lucide-react'
import Link from 'next/link'
import type { Wallpaper, Category, WallpaperType } from '@/lib/types'

const categories: { value: Category; label: string }[] = [
  { value: 'cyberpunk', label: 'Cyberpunk' },
  { value: 'minimal', label: 'Minimal' },
  { value: 'anime', label: 'Anime' },
  { value: 'dark', label: 'Dark' },
  { value: 'nature', label: 'Nature' },
  { value: 'abstract', label: 'Abstract' },
]

export default function AdminDashboardPage() {
  const router = useRouter()
  const [wallpapers, setWallpapers] = useState<Wallpaper[]>([])
  const [loading, setLoading] = useState(true)
  const [showUploadModal, setShowUploadModal] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')
  const [uploading, setUploading] = useState(false)

  // Form state
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    category: 'cyberpunk' as Category,
    type: 'static' as WallpaperType,
    tags: '',
    is_featured: false,
  })
  const [imageFile, setImageFile] = useState<File | null>(null)
  const [videoFile, setVideoFile] = useState<File | null>(null)

  useEffect(() => {
    const isAuth = sessionStorage.getItem('admin-auth')
    if (!isAuth) {
      router.push('/admin')
      return
    }
    fetchWallpapers()
  }, [router])

  const fetchWallpapers = async () => {
    try {
      const res = await fetch('/api/wallpapers?limit=100')
      const data = await res.json()
      setWallpapers(data.wallpapers || [])
    } catch (error) {
      console.error('Failed to fetch:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleLogout = () => {
    sessionStorage.removeItem('admin-auth')
    router.push('/admin')
  }

  const handleUpload = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!imageFile) return

    setUploading(true)
    try {
      // Upload image
      const imageForm = new FormData()
      imageForm.append('file', imageFile)
      imageForm.append('type', 'image')

      const imageRes = await fetch('/api/upload', {
        method: 'POST',
        body: imageForm,
      })
      const imageData = await imageRes.json()

      let videoUrl = ''
      if (videoFile && formData.type === 'live') {
        const videoForm = new FormData()
        videoForm.append('file', videoFile)
        videoForm.append('type', 'video')

        const videoRes = await fetch('/api/upload', {
          method: 'POST',
          body: videoForm,
        })
        const videoData = await videoRes.json()
        videoUrl = videoData.url
      }

      // Create wallpaper record
      const img = new Image()
      img.src = imageData.url
      await new Promise(resolve => { img.onload = resolve })

      const wallpaperData = {
        title: formData.title,
        description: formData.description,
        category: formData.category,
        type: formData.type,
        tags: formData.tags.split(',').map(t => t.trim()).filter(Boolean),
        thumbnail_url: imageData.url,
        image_url: imageData.url,
        video_url: videoUrl || null,
        width: img.width,
        height: img.height,
        file_size: imageData.size,
        is_featured: formData.is_featured,
      }

      const res = await fetch('/api/wallpapers', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(wallpaperData),
      })

      if (res.ok) {
        setShowUploadModal(false)
        setFormData({
          title: '',
          description: '',
          category: 'cyberpunk',
          type: 'static',
          tags: '',
          is_featured: false,
        })
        setImageFile(null)
        setVideoFile(null)
        fetchWallpapers()
      }
    } catch (error) {
      console.error('Upload failed:', error)
    } finally {
      setUploading(false)
    }
  }

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this wallpaper?')) return

    try {
      const res = await fetch(`/api/wallpapers/${id}`, {
        method: 'DELETE',
      })

      if (res.ok) {
        fetchWallpapers()
      }
    } catch (error) {
      console.error('Delete failed:', error)
    }
  }

  const filteredWallpapers = wallpapers.filter(w =>
    w.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    w.category.toLowerCase().includes(searchQuery.toLowerCase())
  )

  if (loading) {
    return (
      <div className="flex items-center justify-center h-96">
        <div className="w-8 h-8 border-2 border-accent-purple border-t-transparent rounded-full animate-spin" />
      </div>
    )
  }

  return (
    <div className="p-6 max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
        <div>
          <h1 className="text-3xl font-bold text-text-primary">Dashboard</h1>
          <p className="text-text-secondary">Manage your wallpaper collection</p>
        </div>
        <div className="flex gap-3">
          <button
            onClick={() => setShowUploadModal(true)}
            className="flex items-center gap-2 px-4 py-2 bg-accent-purple hover:bg-accent-purple/90 text-white rounded-xl font-medium transition-colors"
          >
            <Plus className="w-5 h-5" />
            Upload Wallpaper
          </button>
          <button
            onClick={handleLogout}
            className="flex items-center gap-2 px-4 py-2 bg-surface-light hover:bg-surface-light/80 text-text-primary rounded-xl transition-colors"
          >
            <LogOut className="w-5 h-5" />
            Logout
          </button>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <div className="glass rounded-xl p-4">
          <div className="flex items-center gap-3 mb-2">
            <div className="p-2 rounded-lg bg-accent-purple/20">
              <ImageIcon className="w-5 h-5 text-accent-purple" />
            </div>
            <span className="text-text-secondary text-sm">Total</span>
          </div>
          <p className="text-2xl font-bold text-text-primary">{wallpapers.length}</p>
        </div>
        <div className="glass rounded-xl p-4">
          <div className="flex items-center gap-3 mb-2">
            <div className="p-2 rounded-lg bg-accent-cyan/20">
              <Video className="w-5 h-5 text-accent-cyan" />
            </div>
            <span className="text-text-secondary text-sm">Live</span>
          </div>
          <p className="text-2xl font-bold text-text-primary">
            {wallpapers.filter(w => w.type === 'live').length}
          </p>
        </div>
        <div className="glass rounded-xl p-4">
          <div className="flex items-center gap-3 mb-2">
            <div className="p-2 rounded-lg bg-accent-blue/20">
              <TrendingUp className="w-5 h-5 text-accent-blue" />
            </div>
            <span className="text-text-secondary text-sm">Featured</span>
          </div>
          <p className="text-2xl font-bold text-text-primary">
            {wallpapers.filter(w => w.is_featured).length}
          </p>
        </div>
        <div className="glass rounded-xl p-4">
          <div className="flex items-center gap-3 mb-2">
            <div className="p-2 rounded-lg bg-green-500/20">
              <Eye className="w-5 h-5 text-green-500" />
            </div>
            <span className="text-text-secondary text-sm">Downloads</span>
          </div>
          <p className="text-2xl font-bold text-text-primary">
            {wallpapers.reduce((acc, w) => acc + w.downloads, 0).toLocaleString()}
          </p>
        </div>
      </div>

      {/* Search */}
      <div className="relative mb-6">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-text-muted" />
        <input
          type="text"
          placeholder="Search wallpapers..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full bg-surface-light border border-surface-light rounded-xl pl-12 pr-4 py-3 text-text-primary placeholder:text-text-muted focus:outline-none focus:border-accent-purple transition-colors"
        />
      </div>

      {/* Wallpapers Table */}
      <div className="glass rounded-2xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-surface-light/50">
              <tr>
                <th className="text-left px-6 py-4 text-sm font-medium text-text-secondary">Wallpaper</th>
                <th className="text-left px-6 py-4 text-sm font-medium text-text-secondary">Category</th>
                <th className="text-left px-6 py-4 text-sm font-medium text-text-secondary">Type</th>
                <th className="text-left px-6 py-4 text-sm font-medium text-text-secondary">Downloads</th>
                <th className="text-left px-6 py-4 text-sm font-medium text-text-secondary">Featured</th>
                <th className="text-right px-6 py-4 text-sm font-medium text-text-secondary">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-surface-light">
              {filteredWallpapers.map((wallpaper) => (
                <tr key={wallpaper.id} className="hover:bg-surface-light/30 transition-colors">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <img
                        src={wallpaper.thumbnail_url}
                        alt={wallpaper.title}
                        className="w-12 h-12 rounded-lg object-cover"
                      />
                      <div>
                        <p className="font-medium text-text-primary">{wallpaper.title}</p>
                        <p className="text-sm text-text-muted">{wallpaper.width}x{wallpaper.height}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className="capitalize text-text-secondary">{wallpaper.category}</span>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium ${
                      wallpaper.type === 'live' 
                        ? 'bg-accent-purple/20 text-accent-purple' 
                        : 'bg-surface-light text-text-secondary'
                    }`}>
                      {wallpaper.type === 'live' ? <Video className="w-3 h-3" /> : <ImageIcon className="w-3 h-3" />}
                      {wallpaper.type}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-text-secondary">
                    {wallpaper.downloads.toLocaleString()}
                  </td>
                  <td className="px-6 py-4">
                    {wallpaper.is_featured && (
                      <CheckCircle className="w-5 h-5 text-green-500" />
                    )}
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center justify-end gap-2">
                      <Link
                        href={`/wallpaper/${wallpaper.id}`}
                        target="_blank"
                        className="p-2 rounded-lg hover:bg-surface-light text-text-muted hover:text-text-primary transition-colors"
                      >
                        <Eye className="w-4 h-4" />
                      </Link>
                      <button
                        onClick={() => handleDelete(wallpaper.id)}
                        className="p-2 rounded-lg hover:bg-red-500/20 text-text-muted hover:text-red-400 transition-colors"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Upload Modal */}
      {showUploadModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="w-full max-w-2xl glass rounded-2xl p-6 max-h-[90vh] overflow-y-auto"
          >
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold text-text-primary">Upload Wallpaper</h2>
              <button
                onClick={() => setShowUploadModal(false)}
                className="p-2 rounded-lg hover:bg-surface-light text-text-muted transition-colors"
              >
                ×
              </button>
            </div>

            <form onSubmit={handleUpload} className="space-y-4">
              <div>
                <label className="block text-sm text-text-secondary mb-2">Title *</label>
                <input
                  type="text"
                  required
                  value={formData.title}
                  onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
                  className="w-full bg-surface-light border border-surface-light rounded-xl px-4 py-3 text-text-primary focus:outline-none focus:border-accent-purple"
                  placeholder="Enter wallpaper title"
                />
              </div>

              <div>
                <label className="block text-sm text-text-secondary mb-2">Description</label>
                <textarea
                  value={formData.description}
                  onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
                  className="w-full bg-surface-light border border-surface-light rounded-xl px-4 py-3 text-text-primary focus:outline-none focus:border-accent-purple h-24 resize-none"
                  placeholder="Enter description"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm text-text-secondary mb-2">Category *</label>
                  <select
                    value={formData.category}
                    onChange={(e) => setFormData(prev => ({ ...prev, category: e.target.value as Category }))}
                    className="w-full bg-surface-light border border-surface-light rounded-xl px-4 py-3 text-text-primary focus:outline-none focus:border-accent-purple"
                  >
                    {categories.map(cat => (
                      <option key={cat.value} value={cat.value}>{cat.label}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm text-text-secondary mb-2">Type *</label>
                  <select
                    value={formData.type}
                    onChange={(e) => setFormData(prev => ({ ...prev, type: e.target.value as WallpaperType }))}
                    className="w-full bg-surface-light border border-surface-light rounded-xl px-4 py-3 text-text-primary focus:outline-none focus:border-accent-purple"
                  >
                    <option value="static">Static</option>
                    <option value="live">Live</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-sm text-text-secondary mb-2">Tags (comma separated)</label>
                <input
                  type="text"
                  value={formData.tags}
                  onChange={(e) => setFormData(prev => ({ ...prev, tags: e.target.value }))}
                  className="w-full bg-surface-light border border-surface-light rounded-xl px-4 py-3 text-text-primary focus:outline-none focus:border-accent-purple"
                  placeholder="neon, cyberpunk, city"
                />
              </div>

              <div>
                <label className="block text-sm text-text-secondary mb-2">Image File *</label>
                <input
                  type="file"
                  accept="image/*"
                  required
                  onChange={(e) => setImageFile(e.target.files?.[0] || null)}
                  className="w-full bg-surface-light border border-surface-light rounded-xl px-4 py-3 text-text-primary file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:bg-accent-purple file:text-white hover:file:bg-accent-purple/90"
                />
              </div>

              {formData.type === 'live' && (
                <div>
                  <label className="block text-sm text-text-secondary mb-2">Video File (for live wallpapers)</label>
                  <input
                    type="file"
                    accept="video/*"
                    onChange={(e) => setVideoFile(e.target.files?.[0] || null)}
                    className="w-full bg-surface-light border border-surface-light rounded-xl px-4 py-3 text-text-primary file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:bg-accent-cyan file:text-white hover:file:bg-accent-cyan/90"
                  />
                </div>
              )}

              <div className="flex items-center gap-2">
                <input
                  type="checkbox"
                  id="featured"
                  checked={formData.is_featured}
                  onChange={(e) => setFormData(prev => ({ ...prev, is_featured: e.target.checked }))}
                  className="w-4 h-4 rounded border-surface-light bg-surface-light text-accent-purple focus:ring-accent-purple"
                />
                <label htmlFor="featured" className="text-sm text-text-secondary">Feature this wallpaper</label>
              </div>

              <div className="flex gap-3 pt-4">
                <button
                  type="button"
                  onClick={() => setShowUploadModal(false)}
                  className="flex-1 px-4 py-3 bg-surface-light hover:bg-surface-light/80 text-text-primary rounded-xl transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={uploading || !imageFile}
                  className="flex-1 flex items-center justify-center gap-2 px-4 py-3 bg-accent-purple hover:bg-accent-purple/90 disabled:opacity-50 text-white rounded-xl font-medium transition-colors"
                >
                  {uploading ? (
                    <>
                      <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                      Uploading...
                    </>
                  ) : (
                    <>
                      <Upload className="w-4 h-4" />
                      Upload
                    </>
                  )}
                </button>
              </div>
            </form>
          </motion.div>
        </div>
      )}
    </div>
  )
}
