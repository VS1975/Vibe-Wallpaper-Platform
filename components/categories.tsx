'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { Monitor, Minimize2, Ghost, Moon, TreePine, Shapes } from 'lucide-react'
import type { Category } from '@/lib/types'

const categories: { id: Category; label: string; icon: typeof Monitor; color: string }[] = [
  { id: 'cyberpunk', label: 'Cyberpunk', icon: Monitor, color: 'from-purple-500 to-pink-500' },
  { id: 'minimal', label: 'Minimal', icon: Minimize2, color: 'from-gray-400 to-gray-600' },
  { id: 'anime', label: 'Anime', icon: Ghost, color: 'from-pink-400 to-rose-500' },
  { id: 'dark', label: 'Dark', icon: Moon, color: 'from-slate-600 to-slate-800' },
  { id: 'nature', label: 'Nature', icon: TreePine, color: 'from-emerald-400 to-teal-500' },
  { id: 'abstract', label: 'Abstract', icon: Shapes, color: 'from-blue-400 to-cyan-500' },
]

export function Categories() {
  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl sm:text-4xl font-bold text-text-primary mb-4">
            Browse by <span className="gradient-text">Vibe</span>
          </h2>
          <p className="text-text-secondary max-w-2xl mx-auto">
            Find the perfect aesthetic for your desktop. From neon cyberpunk streets to peaceful minimal landscapes.
          </p>
        </motion.div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {categories.map((category, index) => (
            <motion.div
              key={category.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <Link href={`/explore?category=${category.id}`}>
                <div className="group relative overflow-hidden rounded-2xl bg-surface border border-surface-light p-6 hover:border-accent-purple/50 transition-all duration-300 hover:scale-105">
                  <div className={`absolute inset-0 bg-gradient-to-br ${category.color} opacity-0 group-hover:opacity-10 transition-opacity duration-300`} />
                  <div className="relative z-10 flex flex-col items-center text-center">
                    <div className={`p-3 rounded-xl bg-gradient-to-br ${category.color} mb-4 group-hover:scale-110 transition-transform duration-300`}>
                      <category.icon className="w-6 h-6 text-white" />
                    </div>
                    <h3 className="text-text-primary font-semibold text-sm">{category.label}</h3>
                    <p className="text-text-muted text-xs mt-1">Explore</p>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
