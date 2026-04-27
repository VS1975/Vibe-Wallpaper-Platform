'use client'

import Link from 'next/link'
import { Sparkles, Github, Twitter, Instagram } from 'lucide-react'

const footerLinks = {
  product: [
    { label: 'Explore', href: '/explore' },
    { label: 'Categories', href: '/categories' },
    { label: 'Trending', href: '/explore?sort=trending' },
  ],
  categories: [
    { label: 'Cyberpunk', href: '/explore?category=cyberpunk' },
    { label: 'Minimal', href: '/explore?category=minimal' },
    { label: 'Anime', href: '/explore?category=anime' },
    { label: 'Dark', href: '/explore?category=dark' },
  ],
  legal: [
    { label: 'Privacy', href: '/privacy' },
    { label: 'Terms', href: '/terms' },
  ],
}

const socialLinks = [
  { icon: Twitter, href: '#', label: 'Twitter' },
  { icon: Instagram, href: '#', label: 'Instagram' },
  { icon: Github, href: '#', label: 'GitHub' },
]

export function Footer() {
  return (
    <footer className="border-t border-surface-light bg-surface mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="col-span-1 md:col-span-1">
            <Link href="/" className="flex items-center gap-2 mb-4">
              <Sparkles className="w-6 h-6 text-accent-purple" />
              <span className="text-xl font-bold gradient-text">VibeWallpaper</span>
            </Link>
            <p className="text-text-muted text-sm">
              Transform your desktop with premium wallpapers and live backgrounds.
            </p>
          </div>

          {/* Product Links */}
          <div>
            <h3 className="text-text-primary font-semibold mb-4">Product</h3>
            <ul className="space-y-2">
              {footerLinks.product.map((link) => (
                <li key={link.label}>
                  <Link href={link.href} className="text-text-secondary hover:text-text-primary text-sm transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Categories */}
          <div>
            <h3 className="text-text-primary font-semibold mb-4">Categories</h3>
            <ul className="space-y-2">
              {footerLinks.categories.map((link) => (
                <li key={link.label}>
                  <Link href={link.href} className="text-text-secondary hover:text-text-primary text-sm transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal & Social */}
          <div>
            <h3 className="text-text-primary font-semibold mb-4">Legal</h3>
            <ul className="space-y-2 mb-6">
              {footerLinks.legal.map((link) => (
                <li key={link.label}>
                  <Link href={link.href} className="text-text-secondary hover:text-text-primary text-sm transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
            <div className="flex gap-4">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  className="text-text-muted hover:text-text-primary transition-colors"
                  aria-label={social.label}
                >
                  <social.icon className="w-5 h-5" />
                </a>
              ))}
            </div>
          </div>
        </div>

        <div className="border-t border-surface-light mt-12 pt-8 text-center">
          <p className="text-text-muted text-sm">
            © {new Date().getFullYear()} VibeWallpaper. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  )
}
