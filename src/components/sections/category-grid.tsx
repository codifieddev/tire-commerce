// components/sections/category-grid.tsx
'use client'
import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import Image from 'next/image'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'

const categories = [
  {
    title: 'Road',
    subtitle: 'Ultra High-Performance',
    image: '/images/peak-sl.jpg',
    href: '/shop/road',
  },
  {
    title: 'Gravel',
    subtitle: 'Connector Series',
    image: '/images/peak-sl.jpg',
    href: '/shop/gravel',
  },
  {
    title: 'MTB',
    subtitle: 'Escape Collection',
    image: '/images/peak-sl.jpg',
    href: '/shop/mtb',
  },
]

export function CategoryGrid() {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  })

  return (
    <section ref={ref} className="py-24 bg-neutral-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-neutral-900 mb-4">
            Shop By Category
          </h2>
          <p className="text-xl text-neutral-600">
            Find the perfect tire for your riding style
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {categories.map((category, index) => (
            <motion.div
              key={category.title}
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{
                duration: 0.6,
                delay: index * 0.1,
                ease: [0.16, 1, 0.3, 1],
              }}
            >
              <Link href={category.href}>
                <motion.div
                  whileHover={{ y: -8 }}
                  transition={{ duration: 0.3 }}
                  className="group relative aspect-[3/4] rounded-3xl overflow-hidden cursor-pointer"
                >
                  {/* Image */}
                  <Image
                    src={category.image}
                    alt={category.title}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-110"
                  />

                  {/* Gradient Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent group-hover:from-black/90 transition-all duration-500" />

                  {/* Content */}
                  <div className="absolute inset-0 p-8 flex flex-col justify-end">
                    <motion.div
                      initial={{ y: 0 }}
                      whileHover={{ y: -10 }}
                      transition={{ duration: 0.3 }}
                    >
                      <p className="text-primary text-sm font-semibold mb-2 uppercase tracking-wider">
                        {category.subtitle}
                      </p>
                      <h3 className="text-4xl font-bold text-white mb-4">
                        {category.title}
                      </h3>
                      
                      <motion.div
                        className="flex items-center gap-2 text-white group-hover:text-primary transition-colors"
                        whileHover={{ x: 5 }}
                      >
                        <span className="font-medium">Explore</span>
                        <ArrowRight className="w-5 h-5" />
                      </motion.div>
                    </motion.div>
                  </div>

                  {/* Border Animation */}
                  <motion.div
                    className="absolute inset-0 border-4 border-primary rounded-3xl"
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileHover={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.3 }}
                  />
                </motion.div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}