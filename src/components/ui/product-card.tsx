// components/ui/product-card.tsx
'use client'
import { motion } from 'framer-motion'
import { Heart, ShoppingCart, Eye, Star } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import { useState } from 'react'
//import { OptimizedImage } from '@/components/ui/optimized-image'


interface ProductCardProps {
  product: {
    id: number
    name: string
    price: number
    originalPrice?: number
    image: string
    rating: number
    reviews: number
    badge?: string
    sizes: string[]
  }
}

export function ProductCard({ product }: ProductCardProps) {
  const [isHovered, setIsHovered] = useState(false)
  const discount = product.originalPrice
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
    : 0

  return (
    <motion.div
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      whileHover={{ y: -8 }}
      transition={{ duration: 0.3 }}
      className="group relative bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-2xl transition-shadow duration-300"
    >
      {/* Image Container */}
      <Link href={`/shop/product/${product.id}`}>
        <div className="relative aspect-square bg-neutral-100 overflow-hidden">
          <Image
            src={product.image}
            alt={product.name}
            fill
            className="object-cover transition-transform duration-700 group-hover:scale-110"
          />

          {/* Badges */}
          <div className="absolute top-4 left-4 flex flex-col gap-2">
            {product.badge && (
              <motion.span
                initial={{ x: -20, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                className="px-3 py-1 bg-primary text-neutral-900 text-xs font-bold uppercase rounded-full"
              >
                {product.badge}
              </motion.span>
            )}
            {discount > 0 && (
              <motion.span
                initial={{ x: -20, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: 0.1 }}
                className="px-3 py-1 bg-red-500 text-white text-xs font-bold rounded-full"
              >
                -{discount}%
              </motion.span>
            )}
          </div>

          {/* Quick Actions */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: isHovered ? 1 : 0 }}
            className="absolute top-4 right-4 flex flex-col gap-2"
          >
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              className="w-10 h-10 bg-white rounded-full flex items-center justify-center shadow-lg hover:bg-primary transition-colors"
            >
              <Heart className="w-5 h-5" />
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              className="w-10 h-10 bg-white rounded-full flex items-center justify-center shadow-lg hover:bg-primary transition-colors"
            >
              <Eye className="w-5 h-5" />
            </motion.button>
          </motion.div>

          {/* Add to Cart - Slides up on hover */}
          <motion.div
            initial={{ y: '100%' }}
            animate={{ y: isHovered ? 0 : '100%' }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/90 to-transparent"
          >
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="w-full py-3 bg-primary text-neutral-900 font-semibold rounded-xl flex items-center justify-center gap-2 hover:bg-primary-dark transition-colors"
            >
              <ShoppingCart className="w-5 h-5" />
              Add to Cart
            </motion.button>
          </motion.div>
        </div>
      </Link>

      {/* Product Info */}
      <div className="p-4 space-y-3">
        <Link href={`/shop/product/${product.id}`}>
          <h3 className="font-semibold text-neutral-900 group-hover:text-primary transition-colors line-clamp-2">
            {product.name}
          </h3>
        </Link>

        {/* Sizes */}
        <div className="flex flex-wrap gap-1">
          {product.sizes.map((size) => (
            <span
              key={size}
              className="px-2 py-1 bg-neutral-100 text-neutral-700 text-xs rounded-md"
            >
              {size}
            </span>
          ))}
        </div>

        {/* Rating */}
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-1">
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                className={`w-4 h-4 ${
                  i < Math.floor(product.rating)
                    ? 'fill-primary text-primary'
                    : 'text-neutral-300'
                }`}
              />
            ))}
          </div>
          <span className="text-sm text-neutral-600">
            {product.rating} ({product.reviews})
          </span>
        </div>

        {/* Price */}
        <div className="flex items-center gap-2">
          <motion.span
            key={product.price}
            initial={{ scale: 1.2, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="text-2xl font-bold text-neutral-900"
          >
            ${product.price.toFixed(2)}
          </motion.span>
          {product.originalPrice && (
            <span className="text-lg text-neutral-400 line-through">
              ${product.originalPrice.toFixed(2)}
            </span>
          )}
        </div>
      </div>
    </motion.div>
  )
}