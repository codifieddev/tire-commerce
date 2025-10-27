'use client'
import { useState, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { motion, AnimatePresence, useScroll, useMotionValueEvent } from 'framer-motion'
import {
  Search,
  ShoppingCart,
  User,
  ChevronDown,
  Menu,
  X,
  Building2,
  FileText,
  Calculator,
  LayoutDashboard,
} from 'lucide-react'
import { LOGO_PATH } from '@/lib/image-utils'

const navigationLinks = {
  shop: [
    { label: 'Road', href: '/shop/road', description: 'High-performance road tires' },
    { label: 'Gravel', href: '/shop/gravel', description: 'Adventure-ready gravel tires' },
    { label: 'MTB', href: '/shop/mtb', description: 'Mountain bike tires' },
    { label: 'Urban', href: '/shop/urban', description: 'City and touring tires' },
  ],
  resources: [
    { label: 'Tire Pressure Calculator', href: '/calculator', icon: Calculator },
    { label: 'Installation Guide', href: '/resources/installation', icon: FileText },
    { label: 'B2B Portal', href: '/b2b/login', icon: Building2 },
  ],
  about: [
    { label: 'About Us', href: '/about' },
    { label: 'All Products', href: '/shop' },
    { label: 'Cart', href: '/cart' },
    { label: 'B2B Dashboard', href: '/b2b/dashboard' },
    { label: 'B2B Login', href: '/b2b/login' },
    { label: 'B2B Register', href: '/b2b/register' },
  ],
}

export function Header() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isHidden, setIsHidden] = useState(false)
  const [activeMenu, setActiveMenu] = useState<string | null>(null)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [mobileAccordion, setMobileAccordion] = useState<string | null>(null)
  
  const { scrollY } = useScroll()
  const [lastScrollY, setLastScrollY] = useState(0)

  // Scroll behavior: shrink header, hide on scroll down, reveal on scroll up
  useMotionValueEvent(scrollY, 'change', (latest) => {
    const delta = latest - lastScrollY
    
    if (latest > 100) {
      setIsScrolled(true)
      
      // Hide on fast scroll down (delta > 10)
      if (delta > 10) {
        setIsHidden(true)
      }
      // Reveal on any scroll up
      else if (delta < -5) {
        setIsHidden(false)
      }
    } else {
      setIsScrolled(false)
      setIsHidden(false)
    }
    
    setLastScrollY(latest)
  })

  // Close menus on Esc key
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
      <motion.header
        animate={{
          y: isHidden ? -100 : 0,
          height: isScrolled ? 64 : 80,
        }}
        transition={{ duration: 0.3, ease: 'easeInOut' }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all ${
          isScrolled ? 'bg-white/80 backdrop-blur-xl shadow-sm' : 'bg-white'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-full">
          <div className="flex items-center justify-between h-full">
            {/* Logo */}
            <Link href="/" className="flex-shrink-0">
              <Image
                src={LOGO_PATH}
                alt="Goodyear Bicycle Tires"
                width={isScrolled ? 160 : 200}
                height={isScrolled ? 35 : 43}
                priority
                className="transition-all duration-300"
              />
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center gap-8">
              {/* Shop Megamenu */}
              <div
                className="relative"
                onMouseEnter={() => setTimeout(() => setActiveMenu('shop'), 150)}
                onMouseLeave={() => setActiveMenu(null)}
              >
                <button
                  className="flex items-center gap-1 text-neutral-900 font-medium hover:text-primary transition-colors"
                  aria-expanded={activeMenu === 'shop'}
                >
                  Shop
                  <ChevronDown
                    className={`w-4 h-4 transition-transform ${
                      activeMenu === 'shop' ? 'rotate-180' : ''
                    }`}
                  />
                </button>

                <AnimatePresence>
                  {activeMenu === 'shop' && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 10 }}
                      transition={{ duration: 0.2 }}
                      className="absolute top-full left-0 mt-2 w-64 bg-white rounded-2xl shadow-xl border border-neutral-200 p-4"
                    >
                      {navigationLinks.shop.map((link) => (
                        <Link
                          key={link.href}
                          href={link.href}
                          className="block p-3 rounded-xl hover:bg-neutral-50 transition-colors group"
                        >
                          <div className="font-semibold text-neutral-900 group-hover:text-primary transition-colors">
                            {link.label}
                          </div>
                          <div className="text-sm text-neutral-600 mt-1">
                            {link.description}
                          </div>
                        </Link>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* Resources Megamenu */}
              <div
                className="relative"
                onMouseEnter={() => setTimeout(() => setActiveMenu('resources'), 150)}
                onMouseLeave={() => setActiveMenu(null)}
              >
                <button
                  className="flex items-center gap-1 text-neutral-900 font-medium hover:text-primary transition-colors"
                  aria-expanded={activeMenu === 'resources'}
                >
                  Resources
                  <ChevronDown
                    className={`w-4 h-4 transition-transform ${
                      activeMenu === 'resources' ? 'rotate-180' : ''
                    }`}
                  />
                </button>

                <AnimatePresence>
                  {activeMenu === 'resources' && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 10 }}
                      transition={{ duration: 0.2 }}
                      className="absolute top-full left-0 mt-2 w-64 bg-white rounded-2xl shadow-xl border border-neutral-200 p-4"
                    >
                      {navigationLinks.resources.map((link) => {
                        const Icon = link.icon
                        return (
                          <Link
                            key={link.href}
                            href={link.href}
                            className="flex items-center gap-3 p-3 rounded-xl hover:bg-neutral-50 transition-colors group"
                          >
                            <div className="w-10 h-10 bg-neutral-100 rounded-lg flex items-center justify-center group-hover:bg-primary/10 transition-colors">
                              <Icon className="w-5 h-5 text-neutral-600 group-hover:text-primary transition-colors" />
                            </div>
                            <span className="font-semibold text-neutral-900 group-hover:text-primary transition-colors">
                              {link.label}
                            </span>
                          </Link>
                        )
                      })}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* About Dropdown */}
              <div
                className="relative"
                onMouseEnter={() => setTimeout(() => setActiveMenu('about'), 150)}
                onMouseLeave={() => setActiveMenu(null)}
              >
                <button
                  className="flex items-center gap-1 text-neutral-900 font-medium hover:text-primary transition-colors"
                  aria-expanded={activeMenu === 'about'}
                >
                  About
                  <ChevronDown
                    className={`w-4 h-4 transition-transform ${
                      activeMenu === 'about' ? 'rotate-180' : ''
                    }`}
                  />
                </button>

                <AnimatePresence>
                  {activeMenu === 'about' && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 10 }}
                      transition={{ duration: 0.2 }}
                      className="absolute top-full left-0 mt-2 w-48 bg-white rounded-2xl shadow-xl border border-neutral-200 p-2"
                    >
                      {navigationLinks.about.map((link) => (
                        <Link
                          key={link.href}
                          href={link.href}
                          className="block px-4 py-2 rounded-xl hover:bg-neutral-50 text-neutral-900 hover:text-primary transition-colors"
                        >
                          {link.label}
                        </Link>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </nav>

            {/* Right Actions */}
            <div className="flex items-center gap-4">
              <button className="p-2 hover:bg-neutral-100 rounded-xl transition-colors">
                <Search className="w-5 h-5 text-neutral-900" />
              </button>
              
              <Link
                href="/cart"
                className="p-2 hover:bg-neutral-100 rounded-xl transition-colors relative"
              >
                <ShoppingCart className="w-5 h-5 text-neutral-900" />
                <span className="absolute -top-1 -right-1 w-5 h-5 bg-primary text-neutral-900 text-xs font-bold rounded-full flex items-center justify-center">
                  3
                </span>
              </Link>

              <Link
                href="/b2b/login"
                className="hidden lg:block p-2 hover:bg-neutral-100 rounded-xl transition-colors"
              >
                <User className="w-5 h-5 text-neutral-900" />
              </Link>

              {/* Mobile Menu Button */}
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="lg:hidden p-2 hover:bg-neutral-100 rounded-xl transition-colors"
                aria-label="Toggle menu"
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
      </motion.header>

      {/* Mobile Menu - Top Sheet */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsMobileMenuOpen(false)}
              className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40 lg:hidden"
            />
            
            <motion.div
              initial={{ y: '-100%' }}
              animate={{ y: 0 }}
              exit={{ y: '-100%' }}
              transition={{ type: 'spring', damping: 30, stiffness: 300 }}
              className="fixed top-0 left-0 right-0 bg-white z-50 lg:hidden max-h-[80vh] overflow-y-auto rounded-b-3xl shadow-2xl"
            >
              <div className="p-6">
                {/* Header */}
                <div className="flex items-center justify-between mb-6">
                  <Image
                    src={LOGO_PATH}
                    alt="Goodyear"
                    width={160}
                    height={35}
                  />
                  <button
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="p-2 hover:bg-neutral-100 rounded-xl"
                  >
                    <X className="w-6 h-6" />
                  </button>
                </div>

                {/* Accordions */}
                <div className="space-y-4">
                  {/* Shop Accordion */}
                  <div className="border-b border-neutral-200 pb-4">
                    <button
                      onClick={() =>
                        setMobileAccordion(mobileAccordion === 'shop' ? null : 'shop')
                      }
                      className="w-full flex items-center justify-between py-3 text-left"
                    >
                      <span className="text-lg font-semibold">Shop</span>
                      <ChevronDown
                        className={`w-5 h-5 transition-transform ${
                          mobileAccordion === 'shop' ? 'rotate-180' : ''
                        }`}
                      />
                    </button>
                    <AnimatePresence>
                      {mobileAccordion === 'shop' && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: 'auto', opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          className="overflow-hidden"
                        >
                          <div className="space-y-2 pt-2">
                            {navigationLinks.shop.map((link) => (
                              <Link
                                key={link.href}
                                href={link.href}
                                onClick={() => setIsMobileMenuOpen(false)}
                                className="block p-3 rounded-xl hover:bg-neutral-50"
                              >
                                <div className="font-semibold">{link.label}</div>
                                <div className="text-sm text-neutral-600">
                                  {link.description}
                                </div>
                              </Link>
                            ))}
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>

                  {/* Resources Accordion */}
                  <div className="border-b border-neutral-200 pb-4">
                    <button
                      onClick={() =>
                        setMobileAccordion(
                          mobileAccordion === 'resources' ? null : 'resources'
                        )
                      }
                      className="w-full flex items-center justify-between py-3 text-left"
                    >
                      <span className="text-lg font-semibold">Resources</span>
                      <ChevronDown
                        className={`w-5 h-5 transition-transform ${
                          mobileAccordion === 'resources' ? 'rotate-180' : ''
                        }`}
                      />
                    </button>
                    <AnimatePresence>
                      {mobileAccordion === 'resources' && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: 'auto', opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          className="overflow-hidden"
                        >
                          <div className="space-y-2 pt-2">
                            {navigationLinks.resources.map((link) => {
                              const Icon = link.icon
                              return (
                                <Link
                                  key={link.href}
                                  href={link.href}
                                  onClick={() => setIsMobileMenuOpen(false)}
                                  className="flex items-center gap-3 p-3 rounded-xl hover:bg-neutral-50"
                                >
                                  <Icon className="w-5 h-5" />
                                  <span>{link.label}</span>
                                </Link>
                              )
                            })}
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>

                  {/* About Accordion */}
                  <div className="pb-4">
                    <button
                      onClick={() =>
                        setMobileAccordion(mobileAccordion === 'about' ? null : 'about')
                      }
                      className="w-full flex items-center justify-between py-3 text-left"
                    >
                      <span className="text-lg font-semibold">About & More</span>
                      <ChevronDown
                        className={`w-5 h-5 transition-transform ${
                          mobileAccordion === 'about' ? 'rotate-180' : ''
                        }`}
                      />
                    </button>
                    <AnimatePresence>
                      {mobileAccordion === 'about' && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: 'auto', opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          className="overflow-hidden"
                        >
                          <div className="space-y-2 pt-2">
                            {navigationLinks.about.map((link) => (
                              <Link
                                key={link.href}
                                href={link.href}
                                onClick={() => setIsMobileMenuOpen(false)}
                                className="block p-3 rounded-xl hover:bg-neutral-50"
                              >
                                {link.label}
                              </Link>
                            ))}
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Spacer to prevent content jump */}
      <div className={isScrolled ? 'h-16' : 'h-20'} />
    </>
  )
}
