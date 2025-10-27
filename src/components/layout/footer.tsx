// components/layout/footer.tsx
'use client'
import { motion } from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link'
import { Facebook, Instagram, Youtube, Twitter } from 'lucide-react'
import { useState } from 'react'

const footerLinks = {
  road: [
    'Eagle F1 SuperSport R',
    'Eagle F1 R',
    'Vector 4Seasons',
    'Eagle F1R Z29 Aero',
    'Vector R',
    'Eagle',
    'Vector Sport',
    'Eagle Sport',
  ],
  urbanTrekking: [
    'Transit Speed',
    'Transit Tour',
    'Transit Tour Plus',
    'Transit SUV',
  ],
  gravel: [
    'Connector Slick',
    'Connector Speed',
    'Connector Inter',
    'Peak',
    'XPLR Slick',
    'XPLR Inter',
  ],
  mountain: [
    'Peak SL',
    'Peak',
    'Escape Inter',
    'Escape Max',
    'Wrangler MTF',
    'Wrangler MTR',
    'Newton MTF',
    'Newton MTR',
    'Wingfoot Dirt',
    'Wingfoot Park',
  ],
  company: [
    'About',
    'Stories',
    'Wingfoot Alliance',
    'Tire Pressure Calculator',
    'TLR Installation Guide',
    'Contact',
    'OEM Contact',
    'Distributors',
    'T&Cs',
    'Privacy Policy',
    'USA Shop',
    'UK Shop',
  ],
}

export function Footer() {
  const [email, setEmail] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitted, setSubmitted] = useState(false)

  const handleNewsletterSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!email) return

    setIsSubmitting(true)
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000))
    setSubmitted(true)
    setIsSubmitting(false)
    setEmail('')

    setTimeout(() => setSubmitted(false), 3000)
  }

  return (
    <footer className="bg-neutral-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-8 mb-12">
          {/* Logo & Social */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="lg:col-span-1"
          >
            <Link href="/">
              <motion.div whileHover={{ scale: 1.05 }} className="mb-6">
                <Image
                  src="/images/Goodyear-Bicyle-Logo-White-500x108px.png"
                  alt="Goodyear Bicycle Tires"
                  width={200}
                  height={43}
                  className="brightness-100"
                />
              </motion.div>
            </Link>

            <p className="text-neutral-400 text-sm mb-6 leading-relaxed">
              Global producers of high performance bicycle tires
            </p>

            <div className="space-y-4">
              <p className="text-sm font-semibold uppercase tracking-wider">
                Stay in Touch:
              </p>
              <div className="flex gap-3">
                {[
                  { Icon: Facebook, href: '#' },
                  { Icon: Instagram, href: '#' },
                  { Icon: Youtube, href: '#' },
                  { Icon: Twitter, href: '#' },
                ].map(({ Icon, href }, index) => (
                  <motion.a
                    key={index}
                    href={href}
                    whileHover={{ scale: 1.2, y: -3 }}
                    whileTap={{ scale: 0.9 }}
                    className="w-10 h-10 bg-neutral-800 hover:bg-primary rounded-full flex items-center justify-center transition-colors"
                  >
                    <Icon className="w-5 h-5" />
                  </motion.a>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Road */}
          <FooterColumn title="ROAD" links={footerLinks.road} delay={0.1} />

          {/* Urban/Trekking */}
          <FooterColumn
            title="URBAN/TREKKING"
            links={footerLinks.urbanTrekking}
            delay={0.2}
          />

          {/* Gravel */}
          <FooterColumn title="GRAVEL" links={footerLinks.gravel} delay={0.3} />

          {/* Mountain */}
          <FooterColumn
            title="MOUNTAIN"
            links={footerLinks.mountain}
            delay={0.4}
          />

          {/* Company */}
          <FooterColumn
            title="COMPANY"
            links={footerLinks.company}
            delay={0.5}
          />
        </div>

        {/* Newsletter Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.6 }}
          className="border-t border-neutral-800 pt-12"
        >
          <div className="max-w-md mx-auto lg:mx-0 lg:max-w-lg">
            <h3 className="text-xl font-bold mb-4 uppercase tracking-wider">
              Newsletter:
            </h3>
            <form onSubmit={handleNewsletterSubmit} className="flex gap-2">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Your E-Mail"
                disabled={isSubmitting || submitted}
                className="flex-1 px-4 py-3 bg-neutral-800 border-2 border-neutral-700 rounded-xl text-white placeholder:text-neutral-500 focus:border-primary focus:outline-none transition-colors disabled:opacity-50"
              />
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                disabled={isSubmitting || submitted || !email}
                type="submit"
                className="px-6 py-3 bg-primary text-neutral-900 font-bold rounded-xl hover:bg-primary-dark transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {submitted ? '✓ Sent' : isSubmitting ? '...' : 'Subscribe'}
              </motion.button>
            </form>
          </div>
        </motion.div>

        {/* Bottom Bar */}
        <div className="border-t border-neutral-800 mt-12 pt-8 flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-neutral-500">
          <p>© 2025 Goodyear Bicycle Tires. All rights reserved.</p>
          <div className="flex gap-6">
            <Link
              href="/privacy"
              className="hover:text-white transition-colors"
            >
              Privacy Policy
            </Link>
            <Link href="/terms" className="hover:text-white transition-colors">
              Terms & Conditions
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}

interface FooterColumnProps {
  title: string
  links: string[]
  delay: number
}

function FooterColumn({ title, links, delay }: FooterColumnProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay }}
      className="space-y-4"
    >
      <h3 className="text-sm font-bold uppercase tracking-wider">{title}</h3>
      <ul className="space-y-2">
        {links.map((link, index) => (
          <motion.li key={index} whileHover={{ x: 4 }}>
            <Link
              href={`/shop/${link.toLowerCase().replace(/\s+/g, '-')}`}
              className="text-neutral-400 hover:text-white transition-colors text-sm"
            >
              {link}
            </Link>
          </motion.li>
        ))}
      </ul>
    </motion.div>
  )
}