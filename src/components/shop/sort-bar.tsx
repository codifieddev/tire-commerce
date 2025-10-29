// components/shop/sort-bar.tsx
'use client'
import { motion } from 'framer-motion'
import { Grid3x3, LayoutGrid, List, ChevronDown } from 'lucide-react'


interface SortBarProps {
  sortBy: string
  onSortChange: (sort: string) => void
  viewMode: any
  onViewModeChange: (mode: any) => void
}

const sortOptions = [
  { value: 'featured', label: 'Featured' },
  { value: 'price-low', label: 'Price: Low to High' },
  { value: 'price-high', label: 'Price: High to Low' },
  { value: 'newest', label: 'Newest First' },
  { value: 'popular', label: 'Most Popular' },
  { value: 'rating', label: 'Highest Rated' },
]

export function SortBar({
  sortBy,
  onSortChange,
  viewMode,
  onViewModeChange,
}: SortBarProps) {
  return (
    <div className="flex items-center justify-between p-4 bg-white rounded-2xl shadow-sm mb-6">
      <div className="flex items-center gap-2">
        <span className="text-sm text-neutral-600">Sort by:</span>
        <div className="relative">
          <select
            value={sortBy}
            onChange={(e) => onSortChange(e.target.value)}
            className="appearance-none px-4 py-2 pr-10 bg-neutral-50 border-2 border-neutral-200 rounded-xl font-medium text-neutral-900 cursor-pointer hover:border-neutral-300 focus:border-primary focus:outline-none transition-colors"
          >
            {sortOptions.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
          <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-neutral-500 pointer-events-none" />
        </div>
      </div>

      <div className="hidden md:flex items-center gap-2">
        <span className="text-sm text-neutral-600 mr-2">View:</span>
        
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => onViewModeChange('grid-3')}
          className={`p-2 rounded-lg transition-colors ${
            viewMode === 'grid-3'
              ? 'bg-primary text-neutral-900'
              : 'bg-neutral-100 text-neutral-600 hover:bg-neutral-200'
          }`}
        >
          <Grid3x3 className="w-5 h-5" />
        </motion.button>

        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => onViewModeChange('grid-4')}
          className={`p-2 rounded-lg transition-colors ${
            viewMode === 'grid-4'
              ? 'bg-primary text-neutral-900'
              : 'bg-neutral-100 text-neutral-600 hover:bg-neutral-200'
          }`}
        >
          <LayoutGrid className="w-5 h-5" />
        </motion.button>

        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => onViewModeChange('list')}
          className={`p-2 rounded-lg transition-colors ${
            viewMode === 'list'
              ? 'bg-primary text-neutral-900'
              : 'bg-neutral-100 text-neutral-600 hover:bg-neutral-200'
          }`}
        >
          <List className="w-5 h-5" />
        </motion.button>
      </div>
    </div>
  )
}