// components/cart/cart-drawer.tsx
'use client'
import { motion, AnimatePresence } from 'framer-motion'
import { X, Trash2, Plus, Minus, ShoppingBag } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import { useState } from 'react'

interface CartItem {
  id: number
  name: string
  size: string
  price: number
  quantity: number
  image: string
}

interface CartDrawerProps {
  isOpen: boolean
  onClose: () => void
}

export function CartDrawer({ isOpen, onClose }: CartDrawerProps) {
  const [items, setItems] = useState<CartItem[]>([
    {
      id: 1,
      name: 'Peak SL Road Tire',
      size: '700x28c',
      price: 107.0,
      quantity: 2,
      image: '/images/products/peak-sl.jpg',
    },
    {
      id: 2,
      name: 'Connector Max Gravel',
      size: '700x40c',
      price: 95.0,
      quantity: 1,
      image: '/images/products/peak-sl.jpg',
    },
  ])

  const updateQuantity = (id: number, delta: number) => {
    setItems(
      items
        .map((item) =>
          item.id === id
            ? { ...item, quantity: Math.max(0, item.quantity + delta) }
            : item
        )
        .filter((item) => item.quantity > 0)
    )
  }

  const removeItem = (id: number) => {
    setItems(items.filter((item) => item.id !== id))
  }

  const subtotal = items.reduce((sum, item) => sum + item.price * item.quantity, 0)

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40"
          />

          {/* Drawer */}
          <motion.aside
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed top-0 right-0 bottom-0 w-full max-w-md bg-white shadow-2xl z-50 flex flex-col"
          >
            {/* Header */}
            <div className="flex items-center justify-between p-6 border-b border-neutral-200">
              <div className="flex items-center gap-3">
                <ShoppingBag className="w-6 h-6" />
                <h2 className="text-xl font-bold text-neutral-900">
                  Cart ({items.length})
                </h2>
              </div>
              <motion.button
                whileHover={{ scale: 1.1, rotate: 90 }}
                whileTap={{ scale: 0.9 }}
                onClick={onClose}
                className="w-10 h-10 flex items-center justify-center rounded-full hover:bg-neutral-100 transition-colors"
              >
                <X className="w-6 h-6" />
              </motion.button>
            </div>

            {/* Items */}
            <div className="flex-1 overflow-y-auto p-6 space-y-4">
              <AnimatePresence mode="popLayout">
                {items.length === 0 ? (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="flex flex-col items-center justify-center py-16 text-center"
                  >
                    <ShoppingBag className="w-16 h-16 text-neutral-300 mb-4" />
                    <h3 className="text-xl font-semibold text-neutral-900 mb-2">
                      Your cart is empty
                    </h3>
                    <p className="text-neutral-600 mb-6">
                      Add some tires to get started
                    </p>
                    <Link href="/shop">
                      <motion.button
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        onClick={onClose}
                        className="px-6 py-3 bg-primary text-neutral-900 font-semibold rounded-xl"
                      >
                        Start Shopping
                      </motion.button>
                    </Link>
                  </motion.div>
                ) : (
                  items.map((item) => (
                    <motion.div
                      key={item.id}
                      layout
                      initial={{ opacity: 0, x: 50 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -50, height: 0 }}
                      className="flex gap-4 p-4 bg-neutral-50 rounded-2xl"
                    >
                      {/* Image */}
                      <div className="relative w-20 h-20 bg-white rounded-xl overflow-hidden flex-shrink-0">
                        <Image
                          src={item.image}
                          alt={item.name}
                          fill
                          className="object-cover"
                        />
                      </div>

                      {/* Details */}
                      <div className="flex-1 min-w-0">
                        <h3 className="font-semibold text-neutral-900 truncate">
                          {item.name}
                        </h3>
                        <p className="text-sm text-neutral-600">{item.size}</p>
                        <p className="text-lg font-bold text-neutral-900 mt-1">
                          ${item.price.toFixed(2)}
                        </p>

                        {/* Quantity Controls */}
                        <div className="flex items-center gap-2 mt-2">
                          <motion.button
                            whileTap={{ scale: 0.9 }}
                            onClick={() => updateQuantity(item.id, -1)}
                            className="w-7 h-7 bg-white rounded-lg flex items-center justify-center border border-neutral-200 hover:border-neutral-300"
                          >
                            <Minus className="w-4 h-4" />
                          </motion.button>
                          <span className="w-8 text-center font-semibold">
                            {item.quantity}
                          </span>
                          <motion.button
                            whileTap={{ scale: 0.9 }}
                            onClick={() => updateQuantity(item.id, 1)}
                            className="w-7 h-7 bg-white rounded-lg flex items-center justify-center border border-neutral-200 hover:border-neutral-300"
                          >
                            <Plus className="w-4 h-4" />
                          </motion.button>
                        </div>
                      </div>

                      {/* Remove */}
                      <motion.button
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        onClick={() => removeItem(item.id)}
                        className="w-8 h-8 flex items-center justify-center text-neutral-400 hover:text-red-500 transition-colors"
                      >
                        <Trash2 className="w-5 h-5" />
                      </motion.button>
                    </motion.div>
                  ))
                )}
              </AnimatePresence>
            </div>

            {/* Footer */}
            {items.length > 0 && (
              <div className="border-t border-neutral-200 p-6 space-y-4 bg-neutral-50">
                <div className="flex items-center justify-between text-lg">
                  <span className="font-semibold text-neutral-900">Subtotal</span>
                  <motion.span
                    key={subtotal}
                    initial={{ scale: 1.2, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    className="font-bold text-neutral-900"
                  >
                    ${subtotal.toFixed(2)}
                  </motion.span>
                </div>

                <Link href="/cart">
                  <motion.button
                    whileHover={{ scale: 1.01 }}
                    whileTap={{ scale: 0.99 }}
                    onClick={onClose}
                    className="w-full py-4 bg-primary hover:bg-primary-dark text-neutral-900 font-bold rounded-xl transition-colors"
                  >
                    View Cart
                  </motion.button>
                </Link>

                <motion.button
                  whileHover={{ scale: 1.01 }}
                  whileTap={{ scale: 0.99 }}
                  onClick={onClose}
                  className="w-full py-4 bg-white border-2 border-neutral-200 hover:border-neutral-300 text-neutral-900 font-semibold rounded-xl transition-colors"
                >
                  Continue Shopping
                </motion.button>
              </div>
            )}
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  )
}