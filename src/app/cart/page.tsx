// app/cart/page.tsx
'use client'
import { motion, AnimatePresence } from 'framer-motion'
import { CartItem } from '@/components/cart/cart-item'
import { OrderSummary } from '@/components/cart/order-summary'
import { RecommendedProducts } from '@/components/cart/recommended-products'
import { ProgressSteps } from '@/components/cart/progress-steps'
import { PromoCodeInput } from '@/components/cart/promo-code-input'
import { ShoppingBag, ArrowLeft } from 'lucide-react'
import Link from 'next/link'
import { useState } from 'react'

interface CartItemType {
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

export default function CartPage() {
  const [items, setItems] = useState<CartItemType[]>([
    {
      id: 1,
      name: 'Peak SL Road Tire',
      size: '700x28c',
      casing: '240 TPI',
      compound: 'UltraGrip',
      price: 107.0,
      quantity: 2,
      image: '/images/products/peak-sl.jpg',
      inStock: true,
    },
    {
      id: 2,
      name: 'Connector Max Gravel',
      size: '700x40c',
      casing: '180 TPI',
      compound: 'Standard',
      price: 95.0,
      quantity: 1,
      image: '/images/products/peak-sl.jpg',
      inStock: true,
    },
    {
      id: 3,
      name: 'Escape Trail MTB',
      size: '29x2.4',
      casing: '120 TPI',
      compound: 'Endurance',
      price: 89.0,
      quantity: 1,
      image: '/images/products/peak-sl.jpg',
      inStock: false,
    },
  ])

  const [promoCode, setPromoCode] = useState<string | null>(null)
  const [discount, setDiscount] = useState(0)

  const updateQuantity = (id: number, newQuantity: number) => {
    setItems(
      items
        .map((item) => (item.id === id ? { ...item, quantity: newQuantity } : item))
        .filter((item) => item.quantity > 0)
    )
  }

  const removeItem = (id: number) => {
    setItems(items.filter((item) => item.id !== id))
  }

  const subtotal = items.reduce((sum, item) => sum + item.price * item.quantity, 0)
  const shipping = subtotal > 200 ? 0 : 15
  const tax = subtotal * 0.08
  const total = subtotal - discount + shipping + tax

  const applyPromoCode = (code: string) => {
    if (code.toUpperCase() === 'SAVE20') {
      setPromoCode(code)
      setDiscount(subtotal * 0.2)
      return true
    }
    return false
  }

  if (items.length === 0) {
    return <EmptyCartState />
  }

  return (
    <main className="min-h-screen bg-neutral-50 pt-32 pb-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <Link href="/shop">
            <motion.button
              whileHover={{ x: -5 }}
              className="flex items-center gap-2 text-neutral-600 hover:text-neutral-900 mb-4"
            >
              <ArrowLeft className="w-5 h-5" />
              Continue Shopping
            </motion.button>
          </Link>
          <h1 className="text-4xl md:text-5xl font-bold text-neutral-900">
            Shopping Cart
          </h1>
          <p className="text-neutral-600 mt-2">
            {items.length} {items.length === 1 ? 'item' : 'items'} in your cart
          </p>
        </motion.div>

        {/* Progress Steps */}
        <ProgressSteps currentStep={1} />

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mt-8">
          {/* Cart Items */}
          <div className="lg:col-span-2 space-y-4">
            <AnimatePresence mode="popLayout">
              {items.map((item, index) => (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, x: -100, height: 0 }}
                  transition={{ delay: index * 0.05 }}
                  layout
                >
                  <CartItem
                    item={item}
                    onUpdateQuantity={updateQuantity}
                    onRemove={removeItem}
                  />
                </motion.div>
              ))}
            </AnimatePresence>

            {/* Promo Code */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: items.length * 0.05 }}
            >
              <PromoCodeInput
                onApply={applyPromoCode}
                appliedCode={promoCode}
                discount={discount}
              />
            </motion.div>
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
              className="sticky top-32"
            >
              <OrderSummary
                subtotal={subtotal}
                shipping={shipping}
                tax={tax}
                discount={discount}
                total={total}
              />
            </motion.div>
          </div>
        </div>

        {/* Recommended Products */}
        <RecommendedProducts />
      </div>
    </main>
  )
}

function EmptyCartState() {
  return (
    <main className="min-h-screen bg-neutral-50 pt-32 flex items-center justify-center">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="text-center max-w-md mx-auto px-4"
      >
        <motion.div
          animate={{ y: [0, -10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="w-32 h-32 mx-auto mb-6 bg-neutral-200 rounded-full flex items-center justify-center"
        >
          <ShoppingBag className="w-16 h-16 text-neutral-400" />
        </motion.div>
        <h1 className="text-3xl font-bold text-neutral-900 mb-4">
          Your cart is empty
        </h1>
        <p className="text-neutral-600 mb-8">
          Looks like you haven't added any tires yet. Start exploring our collection!
        </p>
        <Link href="/shop">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="px-8 py-4 bg-primary text-neutral-900 font-bold rounded-xl shadow-lg"
          >
            Start Shopping
          </motion.button>
        </Link>
      </motion.div>
    </main>
  )
}