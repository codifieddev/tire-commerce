// components/product/product-gallery.tsx
'use client'
import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Image from 'next/image'
import { ChevronLeft, ChevronRight, Maximize2, X } from 'lucide-react'

const productImages = [
  '/images/peak-sl.jpg',
  '/images/peak-sl.jpg',
  '/images/peak-sl.jpg',
  '/images/peak-sl.jpg',
  '/images/peak-sl.jpg',
]

export function ProductGallery() {
  const [selectedIndex, setSelectedIndex] = useState(0)
  const [isLightboxOpen, setIsLightboxOpen] = useState(false)
  const [direction, setDirection] = useState(0)

  const changeImage = (newIndex: number) => {
    setDirection(newIndex > selectedIndex ? 1 : -1)
    setSelectedIndex(newIndex)
  }

  const nextImage = () => {
    changeImage((selectedIndex + 1) % productImages.length)
  }

  const prevImage = () => {
    changeImage(
      selectedIndex === 0 ? productImages.length - 1 : selectedIndex - 1
    )
  }

  const variants = {
    enter: (direction: number) => ({
      x: direction > 0 ? 100 : -100,
      opacity: 0,
    }),
    center: {
      x: 0,
      opacity: 1,
    },
    exit: (direction: number) => ({
      x: direction > 0 ? -100 : 100,
      opacity: 0,
    }),
  }

  return (
    <>
      <div className="space-y-4">
        {/* Main Image */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="relative aspect-square bg-neutral-100 rounded-3xl overflow-hidden group"
        >
          <AnimatePresence initial={false} custom={direction}>
            <motion.div
              key={selectedIndex}
              custom={direction}
              variants={variants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{
                x: { type: 'spring', stiffness: 300, damping: 30 },
                opacity: { duration: 0.2 },
              }}
              className="absolute inset-0"
            >
              <Image
                src={productImages[selectedIndex]}
                alt={`Product image ${selectedIndex + 1}`}
                fill
                className="object-cover"
                priority={selectedIndex === 0}
              />
            </motion.div>
          </AnimatePresence>

          {/* Navigation Arrows */}
          <motion.button
            whileHover={{ scale: 1.1, x: -5 }}
            whileTap={{ scale: 0.9 }}
            onClick={prevImage}
            className="absolute left-4 top-1/2 -translate-y-1/2 w-12 h-12 bg-white/90 backdrop-blur rounded-full flex items-center justify-center shadow-lg opacity-0 group-hover:opacity-100 transition-opacity"
          >
            <ChevronLeft className="w-6 h-6" />
          </motion.button>

          <motion.button
            whileHover={{ scale: 1.1, x: 5 }}
            whileTap={{ scale: 0.9 }}
            onClick={nextImage}
            className="absolute right-4 top-1/2 -translate-y-1/2 w-12 h-12 bg-white/90 backdrop-blur rounded-full flex items-center justify-center shadow-lg opacity-0 group-hover:opacity-100 transition-opacity"
          >
            <ChevronRight className="w-6 h-6" />
          </motion.button>

          {/* Zoom Button */}
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => setIsLightboxOpen(true)}
            className="absolute top-4 right-4 w-12 h-12 bg-white/90 backdrop-blur rounded-full flex items-center justify-center shadow-lg opacity-0 group-hover:opacity-100 transition-opacity"
          >
            <Maximize2 className="w-5 h-5" />
          </motion.button>

          {/* Image Counter */}
          <div className="absolute bottom-4 right-4 px-3 py-2 bg-black/70 backdrop-blur text-white text-sm rounded-full">
            {selectedIndex + 1} / {productImages.length}
          </div>
        </motion.div>

        {/* Thumbnail Grid */}
        <div className="grid grid-cols-5 gap-3">
          {productImages.map((image, index) => (
            <motion.button
              key={index}
              onClick={() => changeImage(index)}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
              className={`relative aspect-square rounded-xl overflow-hidden ${
                index === selectedIndex
                  ? 'ring-4 ring-primary'
                  : 'ring-2 ring-transparent hover:ring-neutral-300'
              } transition-all`}
            >
              <Image
                src={image}
                alt={`Thumbnail ${index + 1}`}
                fill
                className="object-cover"
              />
              {index === selectedIndex && (
                <motion.div
                  layoutId="thumbnail-indicator"
                  className="absolute inset-0 bg-primary/20"
                  transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                />
              )}
            </motion.button>
          ))}
        </div>
      </div>

      {/* Lightbox */}
      <AnimatePresence>
        {isLightboxOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/95 flex items-center justify-center p-4"
            onClick={() => setIsLightboxOpen(false)}
          >
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={() => setIsLightboxOpen(false)}
              className="absolute top-4 right-4 w-12 h-12 bg-white/10 backdrop-blur rounded-full flex items-center justify-center text-white hover:bg-white/20 transition-colors z-10"
            >
              <X className="w-6 h-6" />
            </motion.button>

            <motion.div
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.9 }}
              className="relative w-full max-w-5xl aspect-square"
              onClick={(e) => e.stopPropagation()}
            >
              <Image
                src={productImages[selectedIndex]}
                alt="Product"
                fill
                className="object-contain"
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}