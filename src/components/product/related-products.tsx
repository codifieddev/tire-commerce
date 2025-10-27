// components/product/related-products.tsx
'use client'
import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { ProductCard } from '@/components/ui/product-card'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { useRef } from 'react'

const relatedProducts = [
  {
    id: 2,
    name: 'Connector Max Gravel',
    price: 95.0,
    image: '/images/products/peak-sl.jpg',
    rating: 4.9,
    reviews: 203,
    sizes: ['700x32c', '700x40c'],
  },
  {
    id: 3,
    name: 'Escape Trail MTB',
    price: 89.0,
    image: '/images/products/peak-sl.jpg',
    rating: 4.7,
    reviews: 178,
    sizes: ['29x2.4', '29x2.6'],
  },
  {
    id: 4,
    name: 'Peak Endurance Road',
    price: 99.0,
    image: '/images/products/peak-sl.jpg',
    rating: 4.8,
    reviews: 142,
    sizes: ['700x25c', '700x28c'],
  },
  {
    id: 5,
    name: 'Vector Road Race',
    price: 115.0,
    image: '/images/products/peak-sl.jpg',
    rating: 5.0,
    reviews: 96,
    badge: 'New',
    sizes: ['700x23c', '700x25c'],
  },
]

export function RelatedProducts() {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  })
  const scrollRef = useRef<HTMLDivElement>(null)

  const scroll = (direction: 'left' | 'right') => {
    if (scrollRef.current) {
      const scrollAmount = 400
      scrollRef.current.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth',
      })
    }
  }

  return (
    <section ref={ref} className="mt-24 py-16 bg-neutral-50 -mx-4 sm:-mx-6 lg:-mx-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="flex items-center justify-between mb-8"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-neutral-900">
            You Might Also Like
          </h2>

          <div className="hidden md:flex items-center gap-2">
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={() => scroll('left')}
              className="w-12 h-12 bg-white rounded-full flex items-center justify-center shadow-lg hover:shadow-xl transition-shadow"
            >
              <ChevronLeft className="w-6 h-6" />
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={() => scroll('right')}
              className="w-12 h-12 bg-white rounded-full flex items-center justify-center shadow-lg hover:shadow-xl transition-shadow"
            >
              <ChevronRight className="w-6 h-6" />
            </motion.button>
          </div>
        </motion.div>

        <div
          ref={scrollRef}
          className="flex gap-6 overflow-x-auto scrollbar-hide snap-x snap-mandatory pb-4"
        >
          {relatedProducts.map((product, index) => (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="flex-none w-[280px] snap-start"
            >
              <ProductCard product={product} />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}