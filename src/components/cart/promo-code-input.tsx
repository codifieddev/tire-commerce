// components/cart/promo-code-input.tsx
'use client'
import { motion, AnimatePresence } from 'framer-motion'
import { Tag, Check, X } from 'lucide-react'
import { useState } from 'react'

interface PromoCodeInputProps {
  onApply: (code: string) => boolean
  appliedCode: string | null
  discount: number
}

export function PromoCodeInput({ onApply, appliedCode, discount }: PromoCodeInputProps) {
  const [code, setCode] = useState('')
  const [isOpen, setIsOpen] = useState(false)
  const [error, setError] = useState('')

  const handleApply = () => {
    if (!code.trim()) return

    const success = onApply(code)
    if (success) {
      setError('')
      setCode('')
    } else {
      setError('Invalid promo code')
      setTimeout(() => setError(''), 3000)
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="bg-white rounded-2xl p-6 shadow-sm"
    >
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 text-neutral-900 font-semibold"
      >
        <Tag className="w-5 h-5 text-primary" />
        Have a promo code?
        <motion.span
          animate={{ rotate: isOpen ? 180 : 0 }}
          className="ml-auto"
        >
          ▼
        </motion.span>
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="overflow-hidden"
          >
            <div className="mt-4 flex gap-2">
              <input
                type="text"
                value={code}
                onChange={(e) => setCode(e.target.value.toUpperCase())}
                onKeyDown={(e) => e.key === 'Enter' && handleApply()}
                placeholder="Enter code"
                disabled={!!appliedCode}
                className="flex-1 px-4 py-3 border-2 border-neutral-200 rounded-xl focus:border-primary focus:outline-none disabled:bg-neutral-100 disabled:cursor-not-allowed"
              />
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleApply}
                disabled={!!appliedCode || !code.trim()}
                className="px-6 py-3 bg-primary text-neutral-900 font-semibold rounded-xl disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Apply
              </motion.button>
            </div>

            {error && (
              <motion.p
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                className="mt-2 text-sm text-red-600 flex items-center gap-2"
              >
                <X className="w-4 h-4" />
                {error}
              </motion.p>
            )}

            {appliedCode && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="mt-3 p-3 bg-green-50 rounded-xl flex items-center justify-between"
              >
                <div className="flex items-center gap-2 text-green-900">
                  <Check className="w-5 h-5" />
                  <span className="font-semibold">
                    Code "{appliedCode}" applied! You saved ${discount.toFixed(2)}
                  </span>
                </div>
              </motion.div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  )
}