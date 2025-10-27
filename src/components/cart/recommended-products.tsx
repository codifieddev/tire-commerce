// components/cart/recommended-products.tsx
'use client'
import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { ProductCard } from '@/components/ui/product-card'

const recommendedProducts = [
  {
    id: 10,
    name: 'Tire Lever Set',
    price: 12.99,
    image: '/images/accessories/peak-sl.jpg',
    rating: 4.9,
    reviews: 342,
    sizes: ['Standard'],
  },
  {
    id: 11,
    name: 'Portable Pump',
    price: 39.99,
    image: '/images/accessories/peak-sl.jpg',
    rating: 4.7,
    reviews: 198,
    sizes: ['Compact'],
  },
  {
    id: 12,
    name: 'Patch Kit',
    price: 8.99,
    image: '/images/accessories/peak-sl.jpg',
    rating: 4.8,
    reviews: 267,
    sizes: ['Standard'],
  },
]

export function RecommendedProducts() {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  })

  return (
    <section ref={ref} className="mt-16">
      <motion.h2
        initial={{ opacity: 0, y: 20 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        className="text-3xl font-bold text-neutral-900 mb-8"
      >
        You Might Also Need
      </motion.h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {recommendedProducts.map((product, index) => (
          <motion.div
            key={product.id}
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: index * 0.1, duration: 0.5 }}
          >
            <ProductCard product={product} />
          </motion.div>
        ))}
      </div>
    </section>
  )
}