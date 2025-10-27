// components/shop/mobile-filter-button.tsx
'use client'
import { motion } from 'framer-motion'
import { SlidersHorizontal } from 'lucide-react'

interface MobileFilterButtonProps {
  onClick: () => void
  activeFiltersCount: number
}

export function MobileFilterButton({ onClick, activeFiltersCount }: MobileFilterButtonProps) {
  return (
    <motion.button
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      onClick={onClick}
      className="lg:hidden fixed bottom-6 right-6 w-14 h-14 bg-neutral-900 text-white rounded-full shadow-2xl flex items-center justify-center z-30"
    >
      <SlidersHorizontal className="w-6 h-6" />
      {activeFiltersCount > 0 && (
        <motion.span
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          className="absolute -top-1 -right-1 w-6 h-6 bg-primary text-neutral-900 text-xs font-bold rounded-full flex items-center justify-center"
        >
          {activeFiltersCount}
        </motion.span>
      )}
    </motion.button>
  )
}