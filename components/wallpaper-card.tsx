'use client'

import { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { motion } from 'framer-motion'
import { Download, Play, Eye, Maximize2 } from 'lucide-react'
import type { Wallpaper } from '@/lib/types'
import { cn, getResolutionLabel } from '@/lib/utils'

interface WallpaperCardProps {
  wallpaper: Wallpaper
  index?: number
}

export function WallpaperCard({ wallpaper, index = 0 }: WallpaperCardProps) {
  const [isHovered, setIsHovered] = useState(false)
  const [imageLoaded, setImageLoaded] = useState(false)

  const isLive = wallpaper.type === 'live'

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.05 }}
    >
      <Link href={`/wallpaper/${wallpaper.id}`}>
        <div
          className="group relative overflow-hidden rounded-xl bg-surface border border-surface-light hover:border-accent-purple/50 transition-all duration-300"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          {/* Image Container */}
          <div className="relative aspect-video overflow-hidden">
            {/* Loading Skeleton */}
            {!imageLoaded && (
              <div className="absolute inset-0 bg-surface-light animate-pulse" />
            )}

            {/* Main Image */}
            <Image
              src={wallpaper.thumbnail_url}
              alt={wallpaper.title}
              fill
              className={cn(
                "object-cover transition-transform duration-500",
                isHovered ? "scale-110" : "scale-100",
                imageLoaded ? "opacity-100" : "opacity-0"
              )}
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
              onLoad={() => setImageLoaded(true)}
            />

            {/* Video Preview Overlay for Live Wallpapers */}
            {isLive && isHovered && wallpaper.video_url && (
              <video
                src={wallpaper.video_url}
                autoPlay
                muted
                loop
                playsInline
                className="absolute inset-0 w-full h-full object-cover"
              />
            )}

            {/* Gradient Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-background/20 to-transparent" />

            {/* Type Badge */}
            <div className="absolute top-3 left-3">
              <span className={cn(
                "px-2 py-1 rounded-full text-xs font-medium",
                isLive 
                  ? "bg-accent-purple/80 text-white" 
                  : "bg-surface-light/80 text-text-secondary"
              )}>
                {isLive ? (
                  <span className="flex items-center gap-1">
                    <Play className="w-3 h-3" /> Live
                  </span>
                ) : 'Static'}
              </span>
            </div>

            {/* Resolution Badge */}
            <div className="absolute top-3 right-3">
              <span className="px-2 py-1 rounded-full text-xs font-medium bg-surface-light/80 text-text-secondary">
                {getResolutionLabel(wallpaper.width, wallpaper.height)}
              </span>
            </div>

            {/* Hover Overlay */}
            <motion.div
              initial={false}
              animate={{ opacity: isHovered ? 1 : 0 }}
              className="absolute inset-0 flex items-center justify-center gap-3"
            >
              <div className="p-3 rounded-full bg-accent-purple/90 text-white hover:bg-accent-purple transition-colors">
                <Maximize2 className="w-5 h-5" />
              </div>
            </motion.div>

            {/* Bottom Info */}
            <div className="absolute bottom-0 left-0 right-0 p-4">
              <h3 className="text-text-primary font-semibold text-sm truncate mb-1">
                {wallpaper.title}
              </h3>
              <div className="flex items-center justify-between">
                <span className="text-text-muted text-xs capitalize">{wallpaper.category}</span>
                <div className="flex items-center gap-3 text-text-muted text-xs">
                  <span className="flex items-center gap-1">
                    <Eye className="w-3 h-3" />
                    {wallpaper.downloads.toLocaleString()}
                  </span>
                  <span className="flex items-center gap-1">
                    <Download className="w-3 h-3" />
                    {wallpaper.downloads > 0 ? (wallpaper.downloads / 10).toFixed(0) : 0}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Link>
    </motion.div>
  )
}
