'use client'
import { useState, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { motion, AnimatePresence } from 'framer-motion'
import { Search, ShoppingCart, User, Menu, X } from 'lucide-react'
import { LOGO_PATH } from '@/lib/image-utils'

const megaMenuData = {
  'New & Featured': {
    columns: [
      {
        title: 'New & Featured',
        links: [
          { label: 'New to Sale', href: '/shop?filter=sale' },
          { label: 'New Arrivals', href: '/shop?filter=new' },
          { label: 'Best Sellers', href: '/shop?filter=bestsellers' },
          { label: 'Latest Drops', href: '/shop?filter=latest' },
        ],
      },
    ],
  },
  Shop: {
    columns: [
      {
        title: 'By Category',
        links: [
          { label: 'Road', href: '/shop/road' },
          { label: 'Gravel', href: '/shop/gravel' },
          { label: 'MTB', href: '/shop/mtb' },
          { label: 'Urban/Trekking', href: '/shop/urban' },
        ],
      },
      {
        title: 'By Series',
        links: [
          { label: 'Ultra High-Performance', href: '/shop?series=uhp' },
          { label: 'High-Performance', href: '/shop?series=hp' },
          { label: 'Performance', href: '/shop?series=performance' },
          { label: 'Fitment Series', href: '/shop?series=fitment' },
        ],
      },
      {
        title: 'Popular',
        links: [
          { label: 'Eagle F1 R', href: '/shop/road/eagle-f1-r' },
          { label: 'Peak SL', href: '/shop/mtb/peak-sl' },
          { label: 'Vector 4Seasons', href: '/shop/road/vector-4seasons' },
          { label: 'Transit Tour', href: '/shop/urban/transit-tour' },
        ],
      },
    ],
  },
  Resources: {
    columns: [
      {
        title: 'Help & Support',
        links: [
          { label: 'Tire Pressure Calculator', href: '/calculator' },
          { label: 'Installation Guide', href: '/resources/installation' },
          { label: 'Size Guide', href: '/resources/size-guide' },
          { label: 'FAQs', href: '/resources/faq' },
        ],
      },
    ],
  },
  'B2B Portal': {
    columns: [
      {
        title: 'Business',
        links: [
          { label: 'B2B Login', href: '/b2b/login' },
          { label: 'Register as Partner', href: '/b2b/register' },
          { label: 'Dashboard', href: '/b2b/dashboard' },
        ],
      },
    ],
  },
}

export function HeaderNikeMega() {
  const [activeMenu, setActiveMenu] = useState<string | null>(null)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 0)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Close on Esc
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setActiveMenu(null)
        setIsMobileMenuOpen(false)
      }
    }
    window.addEventListener('keydown', handleEsc)
    return () => window.removeEventListener('keydown', handleEsc)
  }, [])

  return (
    <>
      {/* Top Utility Bar */}
      <div className="bg-neutral-50 border-b border-neutral-200">
        <div className="max-w-7xl mx-auto px-6 py-2 flex items-center justify-end gap-6 text-sm">
          <Link href="/stores" className="hover:text-neutral-600 transition-colors">
            Find a Store
          </Link>
          <span className="text-neutral-300">|</span>
          <Link href="/help" className="hover:text-neutral-600 transition-colors">
            Help
          </Link>
          <span className="text-neutral-300">|</span>
          <Link href="/b2b/login" className="hover:text-neutral-600 transition-colors">
            Join Us
          </Link>
          <span className="text-neutral-300">|</span>
          <Link href="/b2b/login" className="hover:text-neutral-600 transition-colors">
            Sign In
          </Link>
        </div>
      </div>

      {/* Main Header */}
      <header
        className={`sticky top-0 z-50 bg-white transition-all duration-300 ${
          isScrolled ? 'shadow-sm' : ''
        }`}
      >
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <Link href="/" className="flex-shrink-0">
              <Image
                src={LOGO_PATH}
                alt="Goodyear Bicycle Tires"
                width={180}
                height={39}
                priority
                className="h-8 w-auto"
              />
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center gap-8">
              {Object.keys(megaMenuData).map((menuKey) => (
                <div
                  key={menuKey}
                  className="relative"
                  onMouseEnter={() => setTimeout(() => setActiveMenu(menuKey), 100)}
                  onMouseLeave={() => setActiveMenu(null)}
                >
                  <button
                    className="text-sm font-medium hover:text-neutral-600 transition-colors py-2"
                    aria-expanded={activeMenu === menuKey}
                  >
                    {menuKey}
                  </button>

                  {/* Mega Menu Dropdown */}
                  <AnimatePresence>
                    {activeMenu === menuKey && (
                      <motion.div
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        transition={{ duration: 0.2 }}
                        className="absolute left-0 top-full pt-4"
                        style={{ minWidth: '240px' }}
                      >
                        <div className="bg-white rounded-lg shadow-xl border border-neutral-200 p-6">
                          <div className="grid grid-cols-1 gap-8" style={{
                            gridTemplateColumns: `repeat(${megaMenuData[menuKey as keyof typeof megaMenuData].columns.length}, minmax(200px, 1fr))`
                          }}>
                            {megaMenuData[menuKey as keyof typeof megaMenuData].columns.map((column, idx) => (
                              <div key={idx}>
                                <h3 className="text-sm font-bold text-neutral-900 mb-4 uppercase tracking-wide">
                                  {column.title}
                                </h3>
                                <ul className="space-y-3">
                                  {column.links.map((link) => (
                                    <li key={link.href}>
                                      <Link
                                        href={link.href}
                                        className="text-sm text-neutral-700 hover:text-neutral-900 transition-colors block"
                                        onClick={() => setActiveMenu(null)}
                                      >
                                        {link.label}
                                      </Link>
                                    </li>
                                  ))}
                                </ul>
                              </div>
                            ))}
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              ))}
            </nav>

            {/* Right Actions */}
            <div className="flex items-center gap-4">
              {/* Search */}
              <button className="hidden lg:flex items-center gap-2 px-4 py-2 bg-neutral-100 hover:bg-neutral-200 rounded-full transition-colors">
                <Search className="w-4 h-4 text-neutral-600" />
                <span className="text-sm text-neutral-600">Search</span>
              </button>

              {/* Icons */}
              <button className="p-2 hover:bg-neutral-100 rounded-full transition-colors">
                <User className="w-5 h-5 text-neutral-900" />
              </button>

              <Link
                href="/cart"
                className="p-2 hover:bg-neutral-100 rounded-full transition-colors relative"
              >
                <ShoppingCart className="w-5 h-5 text-neutral-900" />
                <span className="absolute top-0 right-0 w-4 h-4 bg-primary text-neutral-900 text-xs font-bold rounded-full flex items-center justify-center">
                  3
                </span>
              </Link>

              {/* Mobile Menu Button */}
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="lg:hidden p-2 hover:bg-neutral-100 rounded-full transition-colors"
              >
                {isMobileMenuOpen ? (
                  <X className="w-6 h-6" />
                ) : (
                  <Menu className="w-6 h-6" />
                )}
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsMobileMenuOpen(false)}
              className="fixed inset-0 bg-black/50 z-40 lg:hidden"
            />
            
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 30, stiffness: 300 }}
              className="fixed top-0 right-0 bottom-0 w-80 bg-white z-50 lg:hidden overflow-y-auto"
            >
              <div className="p-6">
                <button
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="mb-8 p-2 hover:bg-neutral-100 rounded-full"
                >
                  <X className="w-6 h-6" />
                </button>

                {Object.entries(megaMenuData).map(([menuKey, menu]) => (
                  <div key={menuKey} className="mb-8">
                    <h3 className="text-lg font-bold mb-4">{menuKey}</h3>
                    {menu.columns.map((column, idx) => (
                      <div key={idx} className="mb-6">
                        <h4 className="text-sm font-semibold text-neutral-600 mb-3">
                          {column.title}
                        </h4>
                        <ul className="space-y-2">
                          {column.links.map((link) => (
                            <li key={link.href}>
                              <Link
                                href={link.href}
                                onClick={() => setIsMobileMenuOpen(false)}
                                className="text-sm block py-2 hover:text-neutral-600"
                              >
                                {link.label}
                              </Link>
                            </li>
                          ))}
                        </ul>
                      </div>
                    ))}
                  </div>
                ))}
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  )
}
