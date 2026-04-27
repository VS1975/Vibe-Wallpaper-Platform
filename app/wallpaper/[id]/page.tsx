'use client'

import { useEffect, useState } from 'react'
import { useParams } from 'next/navigation'
import Link from 'next/link'
import Image from 'next/image'
import { motion } from 'framer-motion'
import { 
  Download, ArrowLeft, Eye, Heart, Share2, 
  Play, Pause, Maximize2, Tag, Calendar, 
  Monitor, Type, Grid3X3
} from 'lucide-react'
import { WallpaperCard } from '@/components/wallpaper-card'
import type { Wallpaper } from '@/lib/types'
import { formatResolution, getResolutionLabel } from '@/lib/utils'

export default function WallpaperDetailPage() {
  const params = useParams()
  const [wallpaper, setWallpaper] = useState<Wallpaper | null>(null)
  const [related, setRelated] = useState<Wallpaper[]>([])
  const [loading, setLoading] = useState(true)
  const [isPlaying, setIsPlaying] = useState(true)
  const [isFullscreen, setIsFullscreen] = useState(false)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [wallpaperRes, relatedRes] = await Promise.all([
          fetch(`/api/wallpapers/${params.id}`),
          fetch(`/api/wallpapers?limit=4&exclude=${params.id}`)
        ])
        
        const wallpaperData = await wallpaperRes.json()
        const relatedData = await relatedRes.json()
        
        setWallpaper(wallpaperData.wallpaper)
        setRelated(relatedData.wallpapers || [])
      } catch (error) {
        console.error('Failed to fetch:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [params.id])

  const handleDownload = async () => {
    if (!wallpaper) return
    
    // Increment download count
    await fetch(`/api/wallpapers/${wallpaper.id}/download`, { method: 'POST' })
    
    // Trigger download
    window.open(wallpaper.image_url, '_blank')
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="w-8 h-8 border-2 border-accent-purple border-t-transparent rounded-full animate-spin" />
      </div>
    )
  }

  if (!wallpaper) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-text-primary mb-2">Wallpaper not found</h1>
          <Link href="/explore" className="text-accent-purple hover:underline">
            Browse all wallpapers
          </Link>
        </div>
      </div>
    )
  }

  const isLive = wallpaper.type === 'live'

  return (
    <div className="min-h-screen pt-20 pb-20">
      {/* Navigation */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-6">
        <Link 
          href="/explore" 
          className="inline-flex items-center gap-2 text-text-secondary hover:text-text-primary transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Explore
        </Link>
      </div>

      {/* Main Preview */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          {/* Preview Container */}
          <div className="relative rounded-2xl overflow-hidden bg-surface mb-8">
            <div className={`relative ${isFullscreen ? 'fixed inset-0 z-50' : 'aspect-video'}`}>
              {isLive && wallpaper.video_url ? (
                <video
                  src={wallpaper.video_url}
                  autoPlay={isPlaying}
                  muted
                  loop
                  playsInline
                  className="w-full h-full object-cover"
                  poster={wallpaper.thumbnail_url}
                />
              ) : (
                <Image
                  src={wallpaper.image_url}
                  alt={wallpaper.title}
                  fill
                  className="object-cover"
                  priority
                  sizes="(max-width: 1280px) 100vw, 1280px"
                />
              )}

              {/* Overlay Controls */}
              <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-transparent to-transparent" />
              
              {/* Top Badges */}
              <div className="absolute top-4 left-4 right-4 flex justify-between">
                <div className="flex gap-2">
                  <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                    isLive ? 'bg-accent-purple text-white' : 'bg-surface-light text-text-secondary'
                  }`}>
                    {isLive ? 'Live Wallpaper' : 'Static'}
                  </span>
                  <span className="px-3 py-1 rounded-full text-sm font-medium bg-surface-light text-text-secondary">
                    {getResolutionLabel(wallpaper.width, wallpaper.height)}
                  </span>
                </div>
                
                {isLive && (
                  <button
                    onClick={() => setIsPlaying(!isPlaying)}
                    className="p-3 rounded-full bg-surface-light/80 text-white hover:bg-accent-purple transition-colors"
                  >
                    {isPlaying ? <Pause className="w-5 h-5" /> : <Play className="w-5 h-5" />}
                  </button>
                )}
              </div>

              {/* Bottom Info */}
              <div className="absolute bottom-0 left-0 right-0 p-6">
                <h1 className="text-3xl sm:text-4xl font-bold text-white mb-2">{wallpaper.title}</h1>
                <div className="flex flex-wrap items-center gap-4 text-text-secondary">
                  <span className="flex items-center gap-1">
                    <Eye className="w-4 h-4" />
                    {wallpaper.downloads.toLocaleString()} views
                  </span>
                  <span className="flex items-center gap-1">
                    <Calendar className="w-4 h-4" />
                    {new Date(wallpaper.created_at).toLocaleDateString()}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Details & Actions */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Left Column - Info */}
            <div className="lg:col-span-2 space-y-6">
              {wallpaper.description && (
                <div className="glass rounded-xl p-6">
                  <h3 className="text-lg font-semibold text-text-primary mb-2">About</h3>
                  <p className="text-text-secondary">{wallpaper.description}</p>
                </div>
              )}

              <div className="glass rounded-xl p-6">
                <h3 className="text-lg font-semibold text-text-primary mb-4">Details</h3>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                  <div className="flex items-center gap-3">
                    <div className="p-2 rounded-lg bg-surface-light">
                      <Monitor className="w-5 h-5 text-accent-purple" />
                    </div>
                    <div>
                      <p className="text-xs text-text-muted">Resolution</p>
                      <p className="text-sm text-text-primary font-medium">
                        {formatResolution(wallpaper.width, wallpaper.height)}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="p-2 rounded-lg bg-surface-light">
                      <Type className="w-5 h-5 text-accent-blue" />
                    </div>
                    <div>
                      <p className="text-xs text-text-muted">Type</p>
                      <p className="text-sm text-text-primary font-medium capitalize">
                        {wallpaper.type}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="p-2 rounded-lg bg-surface-light">
                      <Grid3X3 className="w-5 h-5 text-accent-cyan" />
                    </div>
                    <div>
                      <p className="text-xs text-text-muted">Category</p>
                      <p className="text-sm text-text-primary font-medium capitalize">
                        {wallpaper.category}
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Tags */}
              {wallpaper.tags && wallpaper.tags.length > 0 && (
                <div className="glass rounded-xl p-6">
                  <h3 className="text-lg font-semibold text-text-primary mb-4">Tags</h3>
                  <div className="flex flex-wrap gap-2">
                    {wallpaper.tags.map(tag => (
                      <Link
                        key={tag}
                        href={`/explore?search=${encodeURIComponent(tag)}`}
                        className="inline-flex items-center gap-1 px-3 py-1.5 rounded-full bg-surface-light text-text-secondary hover:text-text-primary hover:bg-surface-light/80 transition-colors text-sm"
                      >
                        <Tag className="w-3 h-3" />
                        {tag}
                      </Link>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Right Column - Actions */}
            <div className="space-y-4">
              <button
                onClick={handleDownload}
                className="w-full flex items-center justify-center gap-2 px-6 py-4 bg-accent-purple hover:bg-accent-purple/90 text-white rounded-xl font-medium transition-all hover:scale-105 glow"
              >
                <Download className="w-5 h-5" />
                Download Wallpaper
              </button>

              <div className="flex gap-3">
                <button className="flex-1 flex items-center justify-center gap-2 px-4 py-3 bg-surface-light hover:bg-surface-light/80 text-text-primary rounded-xl transition-colors">
                  <Heart className="w-5 h-5" />
                  Like
                </button>
                <button className="flex-1 flex items-center justify-center gap-2 px-4 py-3 bg-surface-light hover:bg-surface-light/80 text-text-primary rounded-xl transition-colors">
                  <Share2 className="w-5 h-5" />
                  Share
                </button>
              </div>
            </div>
          </div>

          {/* Related Wallpapers */}
          {related.length > 0 && (
            <div className="mt-16">
              <h2 className="text-2xl font-bold text-text-primary mb-6">
                More Like <span className="gradient-text">This</span>
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {related.map((wallpaper, index) => (
                  <WallpaperCard key={wallpaper.id} wallpaper={wallpaper} index={index} />
                ))}
              </div>
            </div>
          )}
        </motion.div>
      </div>
    </div>
  )
}
