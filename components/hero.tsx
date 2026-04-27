'use client'

import { motion } from 'framer-motion'
import { ArrowRight, Download, Sparkles } from 'lucide-react'
import Link from 'next/link'

export function Hero() {
  return (
    <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden pt-16">
      {/* Animated background */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-accent-purple/30 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] bg-accent-blue/30 rounded-full blur-3xl animate-pulse delay-1000" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-accent-cyan/20 rounded-full blur-3xl animate-pulse delay-2000" />
      </div>

      {/* Grid pattern overlay */}
      <div 
        className="absolute inset-0 opacity-20"
        style={{
          backgroundImage: `linear-gradient(rgba(139, 92, 246, 0.1) 1px, transparent 1px),
                           linear-gradient(90deg, rgba(139, 92, 246, 0.1) 1px, transparent 1px)`,
          backgroundSize: '50px 50px'
        }}
      />

      <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-surface-light border border-surface-light mb-8">
            <Sparkles className="w-4 h-4 text-accent-purple" />
            <span className="text-sm text-text-secondary">Premium Desktop Transformation</span>
          </div>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="text-5xl sm:text-6xl lg:text-7xl font-bold mb-6 leading-tight"
        >
          <span className="gradient-text">Transform</span>
          <br />
          <span className="text-text-primary">Your Desktop</span>
          <br />
          <span className="text-text-secondary text-3xl sm:text-4xl lg:text-5xl font-normal">
            Into Art
          </span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="text-lg sm:text-xl text-text-secondary max-w-2xl mx-auto mb-10"
        >
          Discover thousands of premium wallpapers and live backgrounds.
          From cyberpunk cityscapes to minimalist landscapes, find your perfect vibe.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="flex flex-col sm:flex-row gap-4 justify-center"
        >
          <Link
            href="/explore"
            className="group inline-flex items-center justify-center gap-2 px-8 py-4 bg-accent-purple hover:bg-accent-purple/90 text-white rounded-full font-medium transition-all hover:scale-105 glow"
          >
            Explore Vibes
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </Link>
          <Link
            href="/explore?type=live"
            className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-surface-light hover:bg-surface-light/80 text-text-primary border border-surface-light rounded-full font-medium transition-all hover:scale-105"
          >
            <Download className="w-5 h-5" />
            Live Wallpapers
          </Link>
        </motion.div>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1 }}
          className="flex flex-wrap justify-center gap-8 sm:gap-16 mt-16 pt-8 border-t border-surface-light/50"
        >
          <div className="text-center">
            <div className="text-3xl sm:text-4xl font-bold gradient-text">10K+</div>
            <div className="text-text-muted text-sm mt-1">Wallpapers</div>
          </div>
          <div className="text-center">
            <div className="text-3xl sm:text-4xl font-bold gradient-text">4K</div>
            <div className="text-text-muted text-sm mt-1">Resolution</div>
          </div>
          <div className="text-center">
            <div className="text-3xl sm:text-4xl font-bold gradient-text">500+</div>
            <div className="text-text-muted text-sm mt-1">Live Vibes</div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
