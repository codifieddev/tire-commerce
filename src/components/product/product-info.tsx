// components/product/product-info.tsx
'use client'
import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Star, Heart, Share2, Minus, Plus, ShoppingCart, Truck, Shield, RotateCcw } from 'lucide-react'

const sizes = ['700x25c', '700x28c', '700x32c']
const casings = ['120 TPI', '180 TPI', '240 TPI']
const compounds = ['Standard', 'UltraGrip', 'Endurance']

export function ProductInfo() {
  const [selectedSize, setSelectedSize] = useState(sizes[0])
  const [selectedCasing, setSelectedCasing] = useState(casings[0])
  const [selectedCompound, setSelectedCompound] = useState(compounds[0])
  const [quantity, setQuantity] = useState(1)
  const [price, setPrice] = useState(107.0)
  const [isAddingToCart, setIsAddingToCart] = useState(false)
  const [isWishlisted, setIsWishlisted] = useState(false)

  const handleAddToCart = async () => {
    setIsAddingToCart(true)
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000))
    setIsAddingToCart(false)
  }

  return (
    <motion.div
      initial={{ opacity: 0, x: 30 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.6, delay: 0.2 }}
      className="space-y-6"
    >
      {/* Product Title & Rating */}
      <div className="space-y-3">
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="text-4xl font-bold text-neutral-900"
        >
          Peak SL Road Tire
        </motion.h1>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="flex items-center gap-4"
        >
          <div className="flex items-center gap-1">
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                className={`w-5 h-5 ${
                  i < 4 ? 'fill-primary text-primary' : 'text-neutral-300'
                }`}
              />
            ))}
          </div>
          <span className="text-neutral-600">4.8 (156 reviews)</span>
        </motion.div>
      </div>

      {/* Price */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        className="flex items-baseline gap-3"
      >
        <AnimatePresence mode="wait">
          <motion.span
            key={price}
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            className="text-5xl font-bold text-neutral-900"
          >
            ${price.toFixed(2)}
          </motion.span>
        </AnimatePresence>
        <span className="text-2xl text-neutral-400 line-through">$120.00</span>
        <span className="px-3 py-1 bg-red-100 text-red-700 font-semibold rounded-full text-sm">
          Save 11%
        </span>
      </motion.div>

      {/* Stock & Social Proof */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6 }}
        className="flex items-center gap-4 p-4 bg-green-50 border border-green-200 rounded-xl"
      >
        <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
        <span className="text-green-800 font-medium">44 in stock</span>
        <span className="text-neutral-600">• 23 people viewing</span>
      </motion.div>

      <div className="h-px bg-neutral-200" />

      {/* Configuration */}
      <div className="space-y-6">
        {/* Size Selector */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7 }}
          className="space-y-3"
        >
          <label className="text-sm font-semibold text-neutral-900 uppercase tracking-wider">
            Size
          </label>
          <div className="grid grid-cols-3 gap-3">
            {sizes.map((size) => (
              <motion.button
                key={size}
                onClick={() => setSelectedSize(size)}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className={`relative p-4 rounded-xl border-2 font-semibold transition-all ${
                  selectedSize === size
                    ? 'border-primary bg-primary/10 text-neutral-900'
                    : 'border-neutral-200 hover:border-neutral-300'
                }`}
              >
                {size}
                {selectedSize === size && (
                  <motion.div
                    layoutId="size-indicator"
                    className="absolute inset-0 border-2 border-primary rounded-xl"
                    transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                  />
                )}
              </motion.button>
            ))}
          </div>
        </motion.div>

        {/* Casing Selector */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
          className="space-y-3"
        >
          <label className="text-sm font-semibold text-neutral-900 uppercase tracking-wider">
            Casing
          </label>
          <div className="grid grid-cols-3 gap-3">
            {casings.map((casing) => (
              <motion.button
                key={casing}
                onClick={() => setSelectedCasing(casing)}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className={`p-4 rounded-xl border-2 font-semibold transition-all ${
                  selectedCasing === casing
                    ? 'border-primary bg-primary/10'
                    : 'border-neutral-200 hover:border-neutral-300'
                }`}
              >
                {casing}
              </motion.button>
            ))}
          </div>
        </motion.div>

        {/* Compound Selector */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.9 }}
          className="space-y-3"
        >
          <label className="text-sm font-semibold text-neutral-900 uppercase tracking-wider">
            Compound
          </label>
          <div className="space-y-2">
            {compounds.map((compound) => (
              <motion.button
                key={compound}
                onClick={() => setSelectedCompound(compound)}
                whileHover={{ x: 4 }}
                className={`w-full p-4 rounded-xl border-2 text-left font-medium transition-all ${
                  selectedCompound === compound
                    ? 'border-primary bg-primary/10'
                    : 'border-neutral-200 hover:border-neutral-300'
                }`}
              >
                <div className="flex items-center justify-between">
                  <span>{compound}</span>
                  {selectedCompound === compound && (
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      className="w-6 h-6 bg-primary rounded-full flex items-center justify-center"
                    >
                      <svg className="w-4 h-4 text-neutral-900" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                      </svg>
                    </motion.div>
                  )}
                </div>
              </motion.button>
            ))}
          </div>
        </motion.div>
      </div>

      <div className="h-px bg-neutral-200" />

      {/* Quantity & Add to Cart */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.0 }}
        className="space-y-4"
      >
        <div className="flex items-center gap-4">
          <div className="flex items-center border-2 border-neutral-200 rounded-xl overflow-hidden">
            <motion.button
              whileHover={{ backgroundColor: '#f5f5f5' }}
              whileTap={{ scale: 0.9 }}
              onClick={() => setQuantity(Math.max(1, quantity - 1))}
              className="p-4 hover:bg-neutral-100 transition-colors"
            >
              <Minus className="w-5 h-5" />
            </motion.button>
            <span className="px-6 font-semibold text-lg">{quantity}</span>
            <motion.button
              whileHover={{ backgroundColor: '#f5f5f5' }}
              whileTap={{ scale: 0.9 }}
              onClick={() => setQuantity(quantity + 1)}
              className="p-4 hover:bg-neutral-100 transition-colors"
            >
              <Plus className="w-5 h-5" />
            </motion.button>
          </div>

          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => setIsWishlisted(!isWishlisted)}
            className={`p-4 rounded-xl border-2 transition-all ${
              isWishlisted
                ? 'border-red-500 bg-red-50'
                : 'border-neutral-200 hover:border-neutral-300'
            }`}
          >
            <Heart
              className={`w-6 h-6 ${
                isWishlisted ? 'fill-red-500 text-red-500' : ''
              }`}
            />
          </motion.button>

          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="p-4 rounded-xl border-2 border-neutral-200 hover:border-neutral-300 transition-all"
          >
            <Share2 className="w-6 h-6" />
          </motion.button>
        </div>

        <motion.button
          onClick={handleAddToCart}
          whileHover={{ scale: 1.01 }}
          whileTap={{ scale: 0.99 }}
          disabled={isAddingToCart}
          className="w-full py-5 bg-primary hover:bg-primary-dark text-neutral-900 font-bold text-lg rounded-xl flex items-center justify-center gap-3 shadow-lg hover:shadow-xl transition-all disabled:opacity-70"
        >
          <AnimatePresence mode="wait">
            {isAddingToCart ? (
              <motion.div
                key="loading"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="w-6 h-6 border-3 border-neutral-900 border-t-transparent rounded-full animate-spin"
              />
            ) : (
              <motion.div
                key="cart"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="flex items-center gap-3"
              >
                <ShoppingCart className="w-6 h-6" />
                <span>Add to Cart</span>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.button>

        <motion.button
          whileHover={{ scale: 1.01 }}
          whileTap={{ scale: 0.99 }}
          className="w-full py-5 bg-neutral-900 hover:bg-neutral-800 text-white font-bold text-lg rounded-xl transition-all"
        >
          Buy It Now
        </motion.button>
      </motion.div>

      {/* Benefits */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.1 }}
        className="grid grid-cols-1 gap-3"
      >
        {[
          { icon: Truck, text: 'Free shipping on orders over $200' },
          { icon: RotateCcw, text: '30-day easy returns' },
          { icon: Shield, text: '2-year warranty included' },
        ].map((benefit, index) => {
          const Icon = benefit.icon
          return (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 1.2 + index * 0.1 }}
              className="flex items-center gap-3 p-3 bg-neutral-50 rounded-xl"
            >
              <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                <Icon className="w-5 h-5 text-primary" />
              </div>
              <span className="text-neutral-700 font-medium">{benefit.text}</span>
            </motion.div>
          )
        })}
      </motion.div>

      {/* Estimated Delivery */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.4 }}
        className="p-4 bg-blue-50 border border-blue-200 rounded-xl"
      >
        <p className="text-blue-900 font-medium">
          Estimated Delivery: <span className="font-bold">Oct 28 - Nov 02, 2025</span>
        </p>
      </motion.div>
    </motion.div>
  )
}