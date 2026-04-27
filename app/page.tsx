'use client'

import { motion } from 'framer-motion'
import { Hero } from '@/components/hero'
import { FeaturedWallpapers } from '@/components/featured-wallpapers'
import { Categories } from '@/components/categories'
import { TrendingSection } from '@/components/trending-section'

export default function HomePage() {
  return (
    <div className="relative overflow-hidden">
      {/* Background gradient */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-accent-purple/20 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-accent-blue/20 rounded-full blur-3xl" />
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <Hero />
        <Categories />
        <FeaturedWallpapers />
        <TrendingSection />
      </motion.div>
    </div>
  )
}
