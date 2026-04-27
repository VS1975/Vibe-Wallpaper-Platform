'use client'

import { motion } from 'framer-motion'
import { TrendingUp, Flame } from 'lucide-react'
import Link from 'next/link'
import { WallpaperCard } from './wallpaper-card'
import type { Wallpaper } from '@/lib/types'

const trendingWallpapers: Wallpaper[] = [
  {
    id: '7',
    title: 'Midnight City Drive',
    category: 'cyberpunk',
    type: 'live',
    tags: ['cyberpunk', 'car', 'night', 'drive'],
    thumbnail_url: 'https://images.unsplash.com/photo-1563089145-599997674d42?w=800&q=80',
    image_url: 'https://images.unsplash.com/photo-1563089145-599997674d42?w=1920&q=80',
    width: 3840,
    height: 2160,
    downloads: 45600,
    created_at: '2024-01-20',
    updated_at: '2024-01-20',
    is_featured: false,
  },
  {
    id: '8',
    title: 'Ocean Waves at Night',
    category: 'nature',
    type: 'live',
    tags: ['ocean', 'waves', 'night', 'moonlight'],
    thumbnail_url: 'https://images.unsplash.com/photo-1518837695005-2083093ee35b?w=800&q=80',
    image_url: 'https://images.unsplash.com/photo-1518837695005-2083093ee35b?w=1920&q=80',
    width: 3840,
    height: 2160,
    downloads: 32100,
    created_at: '2024-01-19',
    updated_at: '2024-01-19',
    is_featured: false,
  },
  {
    id: '9',
    title: 'Geometric Minimalist',
    category: 'minimal',
    type: 'static',
    tags: ['minimal', 'geometric', 'shapes', 'clean'],
    thumbnail_url: 'https://images.unsplash.com/photo-1558591710-4b4a1ae0f04d?w=800&q=80',
    image_url: 'https://images.unsplash.com/photo-1558591710-4b4a1ae0f04d?w=1920&q=80',
    width: 3840,
    height: 2160,
    downloads: 28900,
    created_at: '2024-01-18',
    updated_at: '2024-01-18',
    is_featured: false,
  },
  {
    id: '10',
    title: 'Space Nebula Deep',
    category: 'dark',
    type: 'live',
    tags: ['space', 'nebula', 'stars', 'cosmos'],
    thumbnail_url: 'https://images.unsplash.com/photo-1462331940025-496dfbfc7564?w=800&q=80',
    image_url: 'https://images.unsplash.com/photo-1462331940025-496dfbfc7564?w=1920&q=80',
    width: 3840,
    height: 2160,
    downloads: 41200,
    created_at: '2024-01-17',
    updated_at: '2024-01-17',
    is_featured: false,
  },
]

export function TrendingSection() {
  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 bg-surface/50">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-12"
        >
          <div className="flex items-center gap-2 mb-2">
            <Flame className="w-5 h-5 text-orange-500" />
            <span className="text-orange-500 text-sm font-medium uppercase tracking-wider">
              Hot Right Now
            </span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold text-text-primary">
            Trending <span className="gradient-text">This Week</span>
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {trendingWallpapers.map((wallpaper, index) => (
            <WallpaperCard key={wallpaper.id} wallpaper={wallpaper} index={index} />
          ))}
        </div>
      </div>
    </section>
  )
}
