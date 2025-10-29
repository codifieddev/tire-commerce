// components/shop/active-filters.tsx
'use client'
import { motion, AnimatePresence } from 'framer-motion'
import { X } from 'lucide-react'


interface ActiveFiltersProps {
  filters: any
  onClearFilter: (filterType: keyof any, value?: string) => void
  onClearAll: () => void
}

export function ActiveFilters({ filters, onClearFilter, onClearAll }: ActiveFiltersProps) {
  const activeFilters = [
    ...filters.categories.map((cat:any) => ({ type: 'categories' as const, value: cat, label: cat })),
    ...filters.sizes.map((size:any) => ({ type: 'sizes' as const, value: size, label: size })),
    ...filters.protection.map((prot:any) => ({
      type: 'protection' as const,
      value: prot,
      label: `${prot} Protection`,
    })),
    ...(filters.inStock ? [{ type: 'inStock' as const, value: 'true', label: 'In Stock' }] : []),
  ]

  if (activeFilters.length === 0) return null

  return (
    <motion.div
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      className="flex flex-wrap items-center gap-2 mb-4"
    >
      <span className="text-sm font-medium text-neutral-600">Active Filters:</span>
      
      <AnimatePresence mode="popLayout">
        {activeFilters.map((filter) => (
          <motion.button
            key={`${filter.type}-${filter.value}`}
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0, opacity: 0 }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => onClearFilter(filter.type, filter.value)}
            className="flex items-center gap-2 px-3 py-1.5 bg-primary/10 border-2 border-primary/20 rounded-full text-sm font-medium text-neutral-900 hover:bg-primary/20 transition-colors"
          >
            {filter.label}
            <X className="w-4 h-4" />
          </motion.button>
        ))}
      </AnimatePresence>

      {activeFilters.length > 1 && (
        <motion.button
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={onClearAll}
          className="px-3 py-1.5 text-sm font-semibold text-red-600 hover:text-red-700 hover:underline"
        >
          Clear All
        </motion.button>
      )}
    </motion.div>
  )
}