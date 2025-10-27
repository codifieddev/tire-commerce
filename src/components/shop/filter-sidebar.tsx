// components/shop/filter-sidebar.tsx
'use client'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronDown } from 'lucide-react'
import { useState } from 'react'
import type { Filters } from '@/app/shop/page'

interface FilterSidebarProps {
  filters: Filters
  onFilterChange: (filters: Partial<Filters>) => void
}

const categories = ['Road', 'Gravel', 'MTB', 'Hybrid', 'E-Bike']
const sizes = ['700x23c', '700x25c', '700x28c', '700x32c', '700x40c', '29x2.4', '29x2.6']
const protectionLevels = ['1mm', '3mm', '5mm']

export function FilterSidebar({ filters, onFilterChange }: FilterSidebarProps) {
  const [expandedSections, setExpandedSections] = useState<string[]>([
    'category',
    'size',
    'protection',
    'price',
  ])

  const toggleSection = (section: string) => {
    setExpandedSections((prev) =>
      prev.includes(section)
        ? prev.filter((s) => s !== section)
        : [...prev, section]
    )
  }

  const toggleCategory = (category: string) => {
    const newCategories = filters.categories.includes(category)
      ? filters.categories.filter((c) => c !== category)
      : [...filters.categories, category]
    onFilterChange({ categories: newCategories })
  }

  const toggleSize = (size: string) => {
    const newSizes = filters.sizes.includes(size)
      ? filters.sizes.filter((s) => s !== size)
      : [...filters.sizes, size]
    onFilterChange({ sizes: newSizes })
  }

  const toggleProtection = (level: string) => {
    const newProtection = filters.protection.includes(level)
      ? filters.protection.filter((p) => p !== level)
      : [...filters.protection, level]
    onFilterChange({ protection: newProtection })
  }

  return (
    <div className="bg-white rounded-2xl p-6 shadow-sm space-y-6">
      <div className="flex items-center justify-between">
        <h3 className="text-xl font-bold text-neutral-900">Filters</h3>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() =>
            onFilterChange({
              categories: [],
              sizes: [],
              protection: [],
              priceRange: [0, 200],
              inStock: false,
            })
          }
          className="text-sm text-primary font-semibold hover:underline"
        >
          Clear All
        </motion.button>
      </div>

      {/* Category Filter */}
      <FilterSection
        title="Category"
        sectionKey="category"
        isExpanded={expandedSections.includes('category')}
        onToggle={() => toggleSection('category')}
      >
        <div className="space-y-2">
          {categories.map((category) => (
            <CheckboxItem
              key={category}
              label={category}
              checked={filters.categories.includes(category)}
              onChange={() => toggleCategory(category)}
            />
          ))}
        </div>
      </FilterSection>

      {/* Size Filter */}
      <FilterSection
        title="Size"
        sectionKey="size"
        isExpanded={expandedSections.includes('size')}
        onToggle={() => toggleSection('size')}
      >
        <div className="grid grid-cols-2 gap-2">
          {sizes.map((size) => (
            <motion.button
              key={size}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => toggleSize(size)}
              className={`px-3 py-2 rounded-lg border-2 text-sm font-medium transition-all ${
                filters.sizes.includes(size)
                  ? 'border-primary bg-primary/10 text-neutral-900'
                  : 'border-neutral-200 hover:border-neutral-300'
              }`}
            >
              {size}
            </motion.button>
          ))}
        </div>
      </FilterSection>

      {/* Protection Level Filter */}
      <FilterSection
        title="Protection Level"
        sectionKey="protection"
        isExpanded={expandedSections.includes('protection')}
        onToggle={() => toggleSection('protection')}
      >
        <div className="space-y-2">
          {protectionLevels.map((level) => (
            <CheckboxItem
              key={level}
              label={`${level} Protection`}
              checked={filters.protection.includes(level)}
              onChange={() => toggleProtection(level)}
            />
          ))}
        </div>
      </FilterSection>

      {/* Price Range Filter */}
      <FilterSection
        title="Price Range"
        sectionKey="price"
        isExpanded={expandedSections.includes('price')}
        onToggle={() => toggleSection('price')}
      >
        <PriceRangeSlider
          value={filters.priceRange}
          onChange={(range) => onFilterChange({ priceRange: range })}
        />
      </FilterSection>

      {/* In Stock Toggle */}
      <div className="pt-4 border-t border-neutral-200">
        <label className="flex items-center gap-3 cursor-pointer group">
          <div className="relative">
            <input
              type="checkbox"
              checked={filters.inStock}
              onChange={(e) => onFilterChange({ inStock: e.target.checked })}
              className="sr-only"
            />
            <motion.div
              animate={{
                backgroundColor: filters.inStock ? '#FFD100' : '#E5E5E5',
              }}
              className="w-12 h-6 rounded-full"
            />
            <motion.div
              animate={{
                x: filters.inStock ? 24 : 0,
              }}
              transition={{ type: 'spring', stiffness: 500, damping: 30 }}
              className="absolute top-0.5 left-0.5 w-5 h-5 bg-white rounded-full shadow"
            />
          </div>
          <span className="font-medium text-neutral-900 group-hover:text-primary transition-colors">
            In Stock Only
          </span>
        </label>
      </div>
    </div>
  )
}

// Sub-components

interface FilterSectionProps {
  title: string
  sectionKey: string
  isExpanded: boolean
  onToggle: () => void
  children: React.ReactNode
}

function FilterSection({
  title,
  sectionKey,
  isExpanded,
  onToggle,
  children,
}: FilterSectionProps) {
  return (
    <div className="border-b border-neutral-200 pb-4">
      <button
        onClick={onToggle}
        className="w-full flex items-center justify-between text-left mb-3"
      >
        <h4 className="font-semibold text-neutral-900">{title}</h4>
        <motion.div animate={{ rotate: isExpanded ? 180 : 0 }}>
          <ChevronDown className="w-5 h-5 text-neutral-500" />
        </motion.div>
      </button>

      <AnimatePresence initial={false}>
        {isExpanded && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="overflow-hidden"
          >
            {children}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

interface CheckboxItemProps {
  label: string
  checked: boolean
  onChange: () => void
}

function CheckboxItem({ label, checked, onChange }: CheckboxItemProps) {
  return (
    <motion.label
      whileHover={{ x: 4 }}
      className="flex items-center gap-3 cursor-pointer group"
    >
      <div className="relative">
        <input
          type="checkbox"
          checked={checked}
          onChange={onChange}
          className="sr-only"
        />
        <motion.div
          animate={{
            backgroundColor: checked ? '#FFD100' : '#ffffff',
            borderColor: checked ? '#FFD100' : '#E5E5E5',
          }}
          className="w-5 h-5 border-2 rounded flex items-center justify-center"
        >
          {checked && (
            <motion.svg
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              className="w-3 h-3 text-neutral-900"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={3}
                d="M5 13l4 4L19 7"
              />
            </motion.svg>
          )}
        </motion.div>
      </div>
      <span className="text-neutral-700 group-hover:text-neutral-900 transition-colors">
        {label}
      </span>
    </motion.label>
  )
}

interface PriceRangeSliderProps {
  value: [number, number]
  onChange: (value: [number, number]) => void
}

function PriceRangeSlider({ value, onChange }: PriceRangeSliderProps) {
  const [min, max] = value

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between text-sm">
        <span className="font-semibold text-neutral-900">${min}</span>
        <span className="font-semibold text-neutral-900">${max}</span>
      </div>

      <div className="relative h-2 bg-neutral-200 rounded-full">
        <motion.div
          animate={{
            left: `${(min / 200) * 100}%`,
            right: `${100 - (max / 200) * 100}%`,
          }}
          className="absolute top-0 bottom-0 bg-primary rounded-full"
        />
      </div>

      <div className="flex gap-4">
        <input
          type="range"
          min={0}
          max={200}
          value={min}
          onChange={(e) => onChange([parseInt(e.target.value), max])}
          className="flex-1"
        />
        <input
          type="range"
          min={0}
          max={200}
          value={max}
          onChange={(e) => onChange([min, parseInt(e.target.value)])}
          className="flex-1"
        />
      </div>
    </div>
  )
}