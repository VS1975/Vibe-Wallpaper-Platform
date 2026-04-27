'use client'

import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { Sparkles, ArrowRight } from 'lucide-react'
import Link from 'next/link'
import { WallpaperCard } from './wallpaper-card'
import type { Wallpaper } from '@/lib/types'

// Sample data - in production, this would come from the API
const sampleWallpapers: Wallpaper[] = [
  {
    id: '1',
    title: 'Neon Tokyo Nights',
    category: 'cyberpunk',
    type: 'live',
    tags: ['cyberpunk', 'neon', 'city', 'night'],
    thumbnail_url: 'https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?w=800&q=80',
    image_url: 'https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?w=1920&q=80',
    video_url: '',
    width: 3840,
    height: 2160,
    downloads: 15420,
    created_at: '2024-01-15',
    updated_at: '2024-01-15',
    is_featured: true,
  },
  {
    id: '2',
    title: 'Minimal Misty Mountains',
    category: 'minimal',
    type: 'static',
    tags: ['minimal', 'nature', 'mountains', 'fog'],
    thumbnail_url: 'https://images.unsplash.com/photo-1519681393784-d120267933ba?w=800&q=80',
    image_url: 'https://images.unsplash.com/photo-1519681393784-d120267933ba?w=1920&q=80',
    width: 3840,
    height: 2160,
    downloads: 8932,
    created_at: '2024-01-14',
    updated_at: '2024-01-14',
    is_featured: true,
  },
  {
    id: '3',
    title: 'Cyberpunk Street Rain',
    category: 'cyberpunk',
    type: 'live',
    tags: ['cyberpunk', 'rain', 'street', 'neon'],
    thumbnail_url: 'https://images.unsplash.com/photo-1555680202-c86f0e12f086?w=800&q=80',
    image_url: 'https://images.unsplash.com/photo-1555680202-c86f0e12f086?w=1920&q=80',
    width: 3840,
    height: 2160,
    downloads: 23100,
    created_at: '2024-01-13',
    updated_at: '2024-01-13',
    is_featured: true,
  },
  {
    id: '4',
    title: 'Dark Abstract Waves',
    category: 'abstract',
    type: 'static',
    tags: ['abstract', 'dark', 'waves', 'fluid'],
    thumbnail_url: 'https://images.unsplash.com/photo-1550684848-fac1c5b4e853?w=800&q=80',
    image_url: 'https://images.unsplash.com/photo-1550684848-fac1c5b4e853?w=1920&q=80',
    width: 3840,
    height: 2160,
    downloads: 7654,
    created_at: '2024-01-12',
    updated_at: '2024-01-12',
    is_featured: true,
  },
  {
    id: '5',
    title: 'Serene Forest Dawn',
    category: 'nature',
    type: 'static',
    tags: ['nature', 'forest', 'sunrise', 'peaceful'],
    thumbnail_url: 'https://images.unsplash.com/photo-1448375240586-882707db888b?w=800&q=80',
    image_url: 'https://images.unsplash.com/photo-1448375240586-882707db888b?w=1920&q=80',
    width: 3840,
    height: 2160,
    downloads: 11200,
    created_at: '2024-01-11',
    updated_at: '2024-01-11',
    is_featured: true,
  },
  {
    id: '6',
    title: 'Anime Sunset City',
    category: 'anime',
    type: 'live',
    tags: ['anime', 'sunset', 'city', 'skyline'],
    thumbnail_url: 'https://images.unsplash.com/photo-1578632767115-351597cf2477?w=800&q=80',
    image_url: 'https://images.unsplash.com/photo-1578632767115-351597cf2477?w=1920&q=80',
    width: 3840,
    height: 2160,
    downloads: 18900,
    created_at: '2024-01-10',
    updated_at: '2024-01-10',
    is_featured: true,
  },
]

export function FeaturedWallpapers() {
  const [wallpapers, setWallpapers] = useState<Wallpaper[]>(sampleWallpapers)

  // In production, fetch from API
  // useEffect(() => {
  //   fetch('/api/wallpapers?featured=true')
  //     .then(res => res.json())
  //     .then(data => setWallpapers(data))
  // }, [])

  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="flex items-center justify-between mb-12"
        >
          <div>
            <div className="flex items-center gap-2 mb-2">
              <Sparkles className="w-5 h-5 text-accent-purple" />
              <span className="text-accent-purple text-sm font-medium uppercase tracking-wider">
                Featured
              </span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-bold text-text-primary">
              Curated <span className="gradient-text">Wallpapers</span>
            </h2>
          </div>
          <Link
            href="/explore"
            className="hidden sm:flex items-center gap-2 text-text-secondary hover:text-accent-purple transition-colors group"
          >
            View All
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {wallpapers.map((wallpaper, index) => (
            <WallpaperCard key={wallpaper.id} wallpaper={wallpaper} index={index} />
          ))}
        </div>

        {/* Mobile View All Button */}
        <div className="sm:hidden mt-8 text-center">
          <Link
            href="/explore"
            className="inline-flex items-center gap-2 text-text-secondary hover:text-accent-purple transition-colors"
          >
            View All Wallpapers
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </section>
  )
}
