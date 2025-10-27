// components/cart/cart-item.tsx
'use client'
import { motion } from 'framer-motion'
import { Trash2, Plus, Minus, AlertCircle } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import { useState } from 'react'

interface CartItemProps {
  item: {
    id: number
    name: string
    size: string
    casing: string
    compound: string
    price: number
    quantity: number
    image: string
    inStock: boolean
  }
  onUpdateQuantity: (id: number, quantity: number) => void
  onRemove: (id: number) => void
}

export function CartItem({ item, onUpdateQuantity, onRemove }: CartItemProps) {
  const [isRemoving, setIsRemoving] = useState(false)

  const handleRemove = () => {
    setIsRemoving(true)
    setTimeout(() => onRemove(item.id), 300)
  }

  const itemTotal = item.price * item.quantity

  return (
    <motion.div
      animate={isRemoving ? { opacity: 0, x: -100 } : {}}
      className="bg-white rounded-2xl p-6 shadow-sm hover:shadow-md transition-shadow"
    >
      <div className="flex gap-6">
        {/* Image */}
        <Link href={`/shop/product/${item.id}`}>
          <motion.div
            whileHover={{ scale: 1.05 }}
            className="relative w-32 h-32 flex-shrink-0 bg-neutral-100 rounded-xl overflow-hidden cursor-pointer"
          >
            <Image
              src={item.image}
              alt={item.name}
              fill
              className="object-cover"
            />
            {!item.inStock && (
              <div className="absolute inset-0 bg-black/60 flex items-center justify-center">
                <span className="text-white text-xs font-bold">Out of Stock</span>
              </div>
            )}
          </motion.div>
        </Link>

        {/* Details */}
        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between gap-4">
            <div className="flex-1">
              <Link href={`/shop/product/${item.id}`}>
                <h3 className="text-xl font-bold text-neutral-900 hover:text-primary transition-colors line-clamp-1">
                  {item.name}
                </h3>
              </Link>
              
              <div className="mt-2 space-y-1">
                <p className="text-sm text-neutral-600">
                  Size: <span className="font-medium text-neutral-900">{item.size}</span>
                </p>
                <p className="text-sm text-neutral-600">
                  Casing: <span className="font-medium text-neutral-900">{item.casing}</span>
                </p>
                <p className="text-sm text-neutral-600">
                  Compound: <span className="font-medium text-neutral-900">{item.compound}</span>
                </p>
              </div>

              {!item.inStock && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mt-3 flex items-center gap-2 text-orange-600"
                >
                  <AlertCircle className="w-4 h-4" />
                  <span className="text-sm font-medium">
                    This item is currently out of stock
                  </span>
                </motion.div>
              )}
            </div>

            {/* Price */}
            <div className="text-right">
              <p className="text-2xl font-bold text-neutral-900">
                ${item.price.toFixed(2)}
              </p>
              <p className="text-sm text-neutral-500">per tire</p>
            </div>
          </div>

          {/* Controls */}
          <div className="flex items-center justify-between mt-6">
            {/* Quantity */}
            <div className="flex items-center gap-3">
              <span className="text-sm font-medium text-neutral-700">Quantity:</span>
              <div className="flex items-center border-2 border-neutral-200 rounded-xl overflow-hidden">
                <motion.button
                  whileHover={{ backgroundColor: '#f5f5f5' }}
                  whileTap={{ scale: 0.9 }}
                  onClick={() => onUpdateQuantity(item.id, item.quantity - 1)}
                  disabled={item.quantity <= 1}
                  className="p-2 hover:bg-neutral-100 transition-colors disabled:opacity-50"
                >
                  <Minus className="w-4 h-4" />
                </motion.button>
                
                <motion.span
                  key={item.quantity}
                  initial={{ scale: 1.2, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  className="px-4 font-semibold text-lg min-w-[3rem] text-center"
                >
                  {item.quantity}
                </motion.span>
                
                <motion.button
                  whileHover={{ backgroundColor: '#f5f5f5' }}
                  whileTap={{ scale: 0.9 }}
                  onClick={() => onUpdateQuantity(item.id, item.quantity + 1)}
                  disabled={!item.inStock}
                  className="p-2 hover:bg-neutral-100 transition-colors disabled:opacity-50"
                >
                  <Plus className="w-4 h-4" />
                </motion.button>
              </div>
            </div>

            {/* Item Total */}
            <div className="flex items-center gap-6">
              <div className="text-right">
                <p className="text-sm text-neutral-600">Item Total</p>
                <motion.p
                  key={itemTotal}
                  initial={{ scale: 1.1, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  className="text-2xl font-bold text-neutral-900"
                >
                  ${itemTotal.toFixed(2)}
                </motion.p>
              </div>

              {/* Remove */}
              <motion.button
                whileHover={{ scale: 1.1, rotate: 10 }}
                whileTap={{ scale: 0.9 }}
                onClick={handleRemove}
                className="w-10 h-10 flex items-center justify-center text-neutral-400 hover:text-red-500 hover:bg-red-50 rounded-xl transition-colors"
              >
                <Trash2 className="w-5 h-5" />
              </motion.button>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  )
}