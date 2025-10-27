// components/cart/order-summary.tsx
'use client'
import { motion } from 'framer-motion'
import { Truck, Shield, ArrowRight } from 'lucide-react'
import Link from 'next/link'

interface OrderSummaryProps {
  subtotal: number
  shipping: number
  tax: number
  discount: number
  total: number
}

export function OrderSummary({ subtotal, shipping, tax, discount, total }: OrderSummaryProps) {
  const freeShippingThreshold = 200
  const remainingForFreeShipping = Math.max(0, freeShippingThreshold - subtotal)
  const freeShippingProgress = Math.min(100, (subtotal / freeShippingThreshold) * 100)

  return (
    <div className="bg-white rounded-2xl p-6 shadow-lg space-y-6">
      <h2 className="text-2xl font-bold text-neutral-900">Order Summary</h2>

      {/* Free Shipping Progress */}
      {remainingForFreeShipping > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="p-4 bg-blue-50 rounded-xl"
        >
          <div className="flex items-center gap-2 mb-2">
            <Truck className="w-5 h-5 text-blue-600" />
            <p className="text-sm font-medium text-blue-900">
              Add ${remainingForFreeShipping.toFixed(2)} more for FREE shipping!
            </p>
          </div>
          <div className="w-full h-2 bg-blue-200 rounded-full overflow-hidden">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${freeShippingProgress}%` }}
              transition={{ duration: 0.5, ease: 'easeOut' }}
              className="h-full bg-blue-600"
            />
          </div>
        </motion.div>
      )}

      {shipping === 0 && (
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="p-4 bg-green-50 rounded-xl flex items-center gap-3"
        >
          <Truck className="w-5 h-5 text-green-600" />
          <p className="text-sm font-semibold text-green-900">
            Congratulations! You qualify for FREE shipping
          </p>
        </motion.div>
      )}

      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <span className="text-neutral-600">Subtotal</span>
          <motion.span
            key={subtotal}
            initial={{ scale: 1.1, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="font-semibold text-neutral-900"
          >
            ${subtotal.toFixed(2)}
          </motion.span>
        </div>

        {discount > 0 && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex items-center justify-between text-green-600"
          >
            <span>Discount</span>
            <span className="font-semibold">-${discount.toFixed(2)}</span>
          </motion.div>
        )}

        <div className="flex items-center justify-between">
          <span className="text-neutral-600">Shipping</span>
          <span className="font-semibold text-neutral-900">
            {shipping === 0 ? 'FREE' : `$${shipping.toFixed(2)}`}
          </span>
        </div>

        <div className="flex items-center justify-between">
          <span className="text-neutral-600">Tax (8%)</span>
          <motion.span
            key={tax}
            initial={{ scale: 1.1, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="font-semibold text-neutral-900"
          >
            ${tax.toFixed(2)}
          </motion.span>
        </div>
      </div>

      <div className="h-px bg-neutral-200" />

      <div className="flex items-center justify-between text-xl">
        <span className="font-bold text-neutral-900">Total</span>
        <motion.span
          key={total}
          initial={{ scale: 1.2, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ type: 'spring', stiffness: 200 }}
          className="font-bold text-neutral-900"
        >
          ${total.toFixed(2)}
        </motion.span>
      </div>

      <Link href="/checkout">
        <motion.button
          whileHover={{ scale: 1.02, y: -2 }}
          whileTap={{ scale: 0.98 }}
          className="w-full py-4 bg-primary hover:bg-primary-dark text-neutral-900 font-bold text-lg rounded-xl flex items-center justify-center gap-2 shadow-lg hover:shadow-xl transition-all"
        >
          Proceed to Checkout
          <ArrowRight className="w-5 h-5" />
        </motion.button>
      </Link>

      <Link href="/shop">
        <motion.button
          whileHover={{ scale: 1.01 }}
          whileTap={{ scale: 0.99 }}
          className="w-full py-3 bg-white border-2 border-neutral-200 hover:border-neutral-300 text-neutral-900 font-semibold rounded-xl transition-colors"
        >
          Continue Shopping
        </motion.button>
      </Link>

      {/* Trust Badges */}
      <div className="pt-4 space-y-3 border-t border-neutral-200">
        <div className="flex items-center gap-3 text-sm">
          <Shield className="w-5 h-5 text-green-600" />
          <span className="text-neutral-700">Secure checkout with SSL encryption</span>
        </div>
        <div className="flex items-center gap-3 text-sm">
          <Truck className="w-5 h-5 text-blue-600" />
          <span className="text-neutral-700">Fast delivery in 3-5 business days</span>
        </div>
      </div>
    </div>
  )
}