// components/ui/product-card-3d.tsx
'use client'
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion'
import { useState } from 'react'
import Image from 'next/image'
import { ShoppingCart, Heart } from 'lucide-react'

interface Product3DCardProps {
  product: {
    id: number
    name: string
    price: number
    image: string
    rating: number
  }
}

export function ProductCard3D({ product }: Product3DCardProps) {
  const [isHovered, setIsHovered] = useState(false)

  // Motion values for mouse position
  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)

  // Spring physics for smooth motion
  const rotateX = useSpring(useTransform(mouseY, [-0.5, 0.5], [10, -10]), {
    stiffness: 200,
    damping: 30,
  })
  const rotateY = useSpring(useTransform(mouseX, [-0.5, 0.5], [-10, 10]), {
    stiffness: 200,
    damping: 30,
  })

  // Parallax effect for inner elements
  const translateX = useTransform(mouseX, [-0.5, 0.5], [-20, 20])
  const translateY = useTransform(mouseY, [-0.5, 0.5], [-20, 20])

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect()
    const width = rect.width
    const height = rect.height
    const mouseXValue = (e.clientX - rect.left) / width - 0.5
    const mouseYValue = (e.clientY - rect.top) / height - 0.5

    mouseX.set(mouseXValue)
    mouseY.set(mouseYValue)
  }

  const handleMouseLeave = () => {
    mouseX.set(0)
    mouseY.set(0)
    setIsHovered(false)
  }

  return (
    <motion.div
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={handleMouseLeave}
      style={{
        rotateX,
        rotateY,
        transformStyle: 'preserve-3d',
      }}
      className="relative w-full aspect-[3/4] cursor-pointer"
    >
      <motion.div
        animate={{
          scale: isHovered ? 1.05 : 1,
        }}
        transition={{ duration: 0.3 }}
        className="relative w-full h-full bg-white rounded-3xl shadow-2xl overflow-hidden"
        style={{ transformStyle: 'preserve-3d' }}
      >
        {/* Image Layer */}
        <motion.div
          style={{
            translateZ: isHovered ? 50 : 0,
            x: translateX,
            y: translateY,
          }}
          transition={{ duration: 0.3 }}
          className="relative w-full h-2/3 bg-neutral-100"
        >
          <Image
            src={product.image}
            alt={product.name}
            fill
            className="object-cover"
          />

          {/* Shine Effect */}
          <motion.div
            animate={{
              x: isHovered ? ['0%', '100%'] : '0%',
            }}
            transition={{
              duration: 0.6,
              ease: 'easeInOut',
            }}
            className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent -skew-x-12"
          />
        </motion.div>

        {/* Content Layer */}
        <motion.div
          style={{
            translateZ: isHovered ? 75 : 0,
          }}
          transition={{ duration: 0.3 }}
          className="p-6 space-y-3"
        >
          <h3 className="text-xl font-bold text-neutral-900 line-clamp-2">
            {product.name}
          </h3>
          <div className="flex items-center justify-between">
            <span className="text-3xl font-bold text-neutral-900">
              ${product.price}
            </span>
            <div className="flex gap-2">
              <motion.button
                whileHover={{ scale: 1.2, rotate: 10 }}
                whileTap={{ scale: 0.9 }}
                style={{ translateZ: 100 }}
                className="w-12 h-12 bg-primary rounded-full flex items-center justify-center shadow-lg"
              >
                <Heart className="w-5 h-5" />
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.2, rotate: -10 }}
                whileTap={{ scale: 0.9 }}
                style={{ translateZ: 100 }}
                className="w-12 h-12 bg-neutral-900 text-white rounded-full flex items-center justify-center shadow-lg"
              >
                <ShoppingCart className="w-5 h-5" />
              </motion.button>
            </div>
          </div>
        </motion.div>

        {/* Glow Effect */}
        <motion.div
          animate={{
            opacity: isHovered ? 0.3 : 0,
          }}
          className="absolute inset-0 bg-gradient-to-br from-primary/20 via-transparent to-blue-500/20 pointer-events-none"
          style={{ translateZ: 25 }}
        />
      </motion.div>
    </motion.div>
  )
}