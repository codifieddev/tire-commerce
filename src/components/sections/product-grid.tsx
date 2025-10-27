// components/sections/product-grid.tsx
'use client'
import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { ProductCard } from '@/components/ui/product-card'

interface ProductGridProps {
  title: string
  variant?: 'default' | 'featured'
}

const mockProducts = [
  {
    id: 1,
    name: 'Peak SL Road Tire',
    price: 107.0,
    originalPrice: 120.0,
    image: '/images/products/peak-sl.jpg',
    rating: 4.8,
    reviews: 156,
    badge: 'New',
    sizes: ['700x25c', '700x28c'],
  },
  {
    id: 2,
    name: 'Connector Max Gravel',
    price: 95.0,
    image: '/images/products/peak-sl.jpg',
    rating: 4.9,
    reviews: 203,
    sizes: ['700x32c', '700x40c'],
  },
  // Add more products...
]

export function ProductGrid({ title, variant = 'default' }: ProductGridProps) {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  })

  return (
    <section ref={ref} className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-neutral-900 mb-4 uppercase tracking-tight">
            {title}
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {mockProducts.map((product, index) => (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{
                duration: 0.5,
                delay: index * 0.05,
                ease: [0.16, 1, 0.3, 1],
              }}
            >
              <ProductCard product={product} />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}