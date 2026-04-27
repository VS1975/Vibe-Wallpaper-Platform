'use client'

import { useEffect, useState, useCallback } from 'react'
import { useSearchParams } from 'next/navigation'
import { motion } from 'framer-motion'
import { Search, SlidersHorizontal, Grid3X3, LayoutGrid, Loader2 } from 'lucide-react'
import { WallpaperCard } from '@/components/wallpaper-card'
import type { Wallpaper, Category, WallpaperType } from '@/lib/types'

const categories: { value: Category | 'all'; label: string }[] = [
  { value: 'all', label: 'All Categories' },
  { value: 'cyberpunk', label: 'Cyberpunk' },
  { value: 'minimal', label: 'Minimal' },
  { value: 'anime', label: 'Anime' },
  { value: 'dark', label: 'Dark' },
  { value: 'nature', label: 'Nature' },
  { value: 'abstract', label: 'Abstract' },
]

const types: { value: WallpaperType | 'all'; label: string }[] = [
  { value: 'all', label: 'All Types' },
  { value: 'static', label: 'Static' },
  { value: 'live', label: 'Live' },
]

const resolutions = [
  { value: 'all', label: 'All Resolutions' },
  { value: '4k', label: '4K (3840x2160)' },
  { value: '1440p', label: '1440p (2560x1440)' },
  { value: '1080p', label: '1080p (1920x1080)' },
]

export default function ExplorePage() {
  const searchParams = useSearchParams()
  
  const [wallpapers, setWallpapers] = useState<Wallpaper[]>([])
  const [loading, setLoading] = useState(true)
  const [viewMode, setViewMode] = useState<'grid' | 'masonry'>('grid')
  const [searchQuery, setSearchQuery] = useState('')
  
  const [filters, setFilters] = useState({
    category: (searchParams.get('category') as Category | 'all') || 'all',
    type: (searchParams.get('type') as WallpaperType | 'all') || 'all',
    resolution: 'all',
  })

  const fetchWallpapers = useCallback(async () => {
    setLoading(true)
    try {
      const params = new URLSearchParams()
      if (filters.category !== 'all') params.append('category', filters.category)
      if (filters.type !== 'all') params.append('type', filters.type)
      if (filters.resolution !== 'all') params.append('resolution', filters.resolution)
      if (searchQuery) params.append('search', searchQuery)

      const res = await fetch(`/api/wallpapers?${params.toString()}`)
      const data = await res.json()
      setWallpapers(data.wallpapers || [])
    } catch (error) {
      console.error('Failed to fetch wallpapers:', error)
      setWallpapers([])
    } finally {
      setLoading(false)
    }
  }, [filters, searchQuery])

  useEffect(() => {
    fetchWallpapers()
  }, [fetchWallpapers])

  return (
    <div className="min-h-screen pt-24 pb-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-8"
        >
          <h1 className="text-4xl font-bold text-text-primary mb-4">
            Explore <span className="gradient-text">Wallpapers</span>
          </h1>
          <p className="text-text-secondary">
            Discover the perfect wallpaper for your desktop. Browse by category, type, or resolution.
          </p>
        </motion.div>

        {/* Filters Bar */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="glass rounded-2xl p-4 mb-8"
        >
          <div className="flex flex-col lg:flex-row gap-4 items-start lg:items-center justify-between">
            {/* Search */}
            <div className="relative w-full lg:w-72">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-text-muted" />
              <input
                type="text"
                placeholder="Search wallpapers..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-surface-light border border-surface-light rounded-xl pl-10 pr-4 py-2.5 text-sm text-text-primary placeholder:text-text-muted focus:outline-none focus:border-accent-purple transition-colors"
              />
            </div>

            {/* Filter Dropdowns */}
            <div className="flex flex-wrap gap-3 w-full lg:w-auto">
              <select
                value={filters.category}
                onChange={(e) => setFilters(prev => ({ ...prev, category: e.target.value as Category | 'all' }))}
                className="bg-surface-light border border-surface-light rounded-xl px-4 py-2.5 text-sm text-text-primary focus:outline-none focus:border-accent-purple cursor-pointer"
              >
                {categories.map(cat => (
                  <option key={cat.value} value={cat.value}>{cat.label}</option>
                ))}
              </select>

              <select
                value={filters.type}
                onChange={(e) => setFilters(prev => ({ ...prev, type: e.target.value as WallpaperType | 'all' }))}
                className="bg-surface-light border border-surface-light rounded-xl px-4 py-2.5 text-sm text-text-primary focus:outline-none focus:border-accent-purple cursor-pointer"
              >
                {types.map(type => (
                  <option key={type.value} value={type.value}>{type.label}</option>
                ))}
              </select>

              <select
                value={filters.resolution}
                onChange={(e) => setFilters(prev => ({ ...prev, resolution: e.target.value }))}
                className="bg-surface-light border border-surface-light rounded-xl px-4 py-2.5 text-sm text-text-primary focus:outline-none focus:border-accent-purple cursor-pointer"
              >
                {resolutions.map(res => (
                  <option key={res.value} value={res.value}>{res.label}</option>
                ))}
              </select>
            </div>

            {/* View Toggle */}
            <div className="flex gap-2 bg-surface-light rounded-xl p-1">
              <button
                onClick={() => setViewMode('grid')}
                className={`p-2 rounded-lg transition-colors ${viewMode === 'grid' ? 'bg-accent-purple text-white' : 'text-text-muted hover:text-text-primary'}`}
              >
                <Grid3X3 className="w-4 h-4" />
              </button>
              <button
                onClick={() => setViewMode('masonry')}
                className={`p-2 rounded-lg transition-colors ${viewMode === 'masonry' ? 'bg-accent-purple text-white' : 'text-text-muted hover:text-text-primary'}`}
              >
                <LayoutGrid className="w-4 h-4" />
              </button>
            </div>
          </div>
        </motion.div>

        {/* Results */}
        {loading ? (
          <div className="flex items-center justify-center py-20">
            <Loader2 className="w-8 h-8 text-accent-purple animate-spin" />
          </div>
        ) : wallpapers.length === 0 ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-20"
          >
            <SlidersHorizontal className="w-16 h-16 text-text-muted mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-text-primary mb-2">No wallpapers found</h3>
            <p className="text-text-secondary">Try adjusting your filters</p>
          </motion.div>
        ) : (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            className={`grid gap-6 ${
              viewMode === 'grid' 
                ? 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4' 
                : 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4'
            }`}
          >
            {wallpapers.map((wallpaper, index) => (
              <WallpaperCard key={wallpaper.id} wallpaper={wallpaper} index={index} />
            ))}
          </motion.div>
        )}
      </div>
    </div>
  )
}
