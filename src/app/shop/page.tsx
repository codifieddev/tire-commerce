'use client'
import { useState } from 'react'
import Link from 'next/link'
import { OptimizedImage } from '@/components/ui/optimized-image'
import { X, SlidersHorizontal } from 'lucide-react'

const products = Array.from({ length: 24 }, (_, i) => ({
  id: i + 1,
  name: `Tire Model ${i + 1}`,
  category: ['Road', 'Gravel', 'MTB', 'Urban'][i % 4],
  series: ['Ultra High-Performance', 'High-Performance', 'Performance'][i % 3],
  price: 559 + (i * 5),
  image: 'peak-sl.jpg',
  rating: 4 + (i % 2),
  slug: `tire-${i + 1}`,
}))

export default function ShopPage() {
  const [currentPage, setCurrentPage] = useState(1)
  const [selectedCategories, setSelectedCategories] = useState<string[]>([])
  const [selectedSeries, setSelectedSeries] = useState<string[]>([])
  const [priceRange, setPriceRange] = useState([0, 200])
  const [sortBy, setSortBy] = useState('featured')
  const [showMobileFilters, setShowMobileFilters] = useState(false)

  const productsPerPage = 12

  // Filter products
  let filteredProducts = products.filter((product) => {
    if (selectedCategories.length > 0 && !selectedCategories.includes(product.category)) return false
    if (selectedSeries.length > 0 && !selectedSeries.includes(product.series)) return false
    if (product.price < priceRange || product.price > priceRange) return false
    return true
  })

  // Sort products
  filteredProducts = filteredProducts.sort((a, b) => {
    switch (sortBy) {
      case 'price-low': return a.price - b.price
      case 'price-high': return b.price - a.price
      case 'rating': return b.rating - a.rating
      default: return 0
    }
  })

  const totalPages = Math.ceil(filteredProducts.length / productsPerPage)
  const startIndex = (currentPage - 1) * productsPerPage
  const currentProducts = filteredProducts.slice(startIndex, startIndex + productsPerPage)

  const toggleCategory = (cat: string) => {
    setSelectedCategories(prev =>
      prev.includes(cat) ? prev.filter(c => c !== cat) : [...prev, cat]
    )
  }

  const toggleSeries = (series: string) => {
    setSelectedSeries(prev =>
      prev.includes(series) ? prev.filter(s => s !== series) : [...prev, series]
    )
  }

  const clearFilters = () => {
    setSelectedCategories([])
    setSelectedSeries([])
    setPriceRange([0, 200])
  }

  const activeFiltersCount = selectedCategories.length + selectedSeries.length

  return (
    <main className="min-h-screen bg-white pt-28 pb-20">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="mb-8">
          <h1 className="text-5xl font-bold mb-4">All Products</h1>
          <p className="text-xl text-neutral-600">
            {filteredProducts.length} Products
          </p>
        </div>

        {/* Mobile Filter Button */}
        <button
          onClick={() => setShowMobileFilters(true)}
          className="lg:hidden mb-6 flex items-center gap-2 px-4 py-3 bg-neutral-900 text-white rounded-full"
        >
          <SlidersHorizontal className="w-5 h-5" />
          Filters {activeFiltersCount > 0 && `(${activeFiltersCount})`}
        </button>

        <div className="lg:grid lg:grid-cols-[280px_1fr] lg:gap-12">
          {/* Filters Sidebar - Desktop */}
          <aside className="hidden lg:block">
            <div className="sticky top-28">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-lg font-bold">Filters</h2>
                {activeFiltersCount > 0 && (
                  <button
                    onClick={clearFilters}
                    className="text-sm text-neutral-600 hover:text-neutral-900"
                  >
                    Clear All
                  </button>
                )}
              </div>

              {/* Category Filter */}
              <div className="mb-8">
                <h3 className="font-semibold mb-4">Category</h3>
                <div className="space-y-3">
                  {['Road', 'Gravel', 'MTB', 'Urban'].map((cat) => (
                    <label key={cat} className="flex items-center gap-3 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={selectedCategories.includes(cat)}
                        onChange={() => toggleCategory(cat)}
                        className="w-5 h-5 rounded border-neutral-300 accent-neutral-900"
                      />
                      <span className="text-sm">{cat}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Series Filter */}
              <div className="mb-8">
                <h3 className="font-semibold mb-4">Series</h3>
                <div className="space-y-3">
                  {['Ultra High-Performance', 'High-Performance', 'Performance'].map((series) => (
                    <label key={series} className="flex items-center gap-3 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={selectedSeries.includes(series)}
                        onChange={() => toggleSeries(series)}
                        className="w-5 h-5 rounded border-neutral-300 accent-neutral-900"
                      />
                      <span className="text-sm">{series}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Price Range */}
              <div className="mb-8">
                <h3 className="font-semibold mb-4">Price Range</h3>
                <div className="space-y-4">
                  <input
                    type="range"
                    min="0"
                    max="200"
                    value={priceRange}
                    onChange={(e) => setPriceRange([0, Number(e.target.value)])}
                    className="w-full accent-neutral-900"
                  />
                  <div className="flex items-center justify-between text-sm">
                    <span>${priceRange}</span>
                    <span>${priceRange}</span>
                  </div>
                </div>
              </div>
            </div>
          </aside>

          {/* Main Content */}
          <div>
            {/* Active Filters & Sort */}
            <div className="flex items-center justify-between mb-8">
              {/* Active Filters */}
              <div className="flex flex-wrap gap-2">
                {selectedCategories.map((cat) => (
                  <button
                    key={cat}
                    onClick={() => toggleCategory(cat)}
                    className="flex items-center gap-2 px-3 py-2 bg-neutral-100 rounded-full text-sm hover:bg-neutral-200"
                  >
                    {cat}
                    <X className="w-4 h-4" />
                  </button>
                ))}
                {selectedSeries.map((series) => (
                  <button
                    key={series}
                    onClick={() => toggleSeries(series)}
                    className="flex items-center gap-2 px-3 py-2 bg-neutral-100 rounded-full text-sm hover:bg-neutral-200"
                  >
                    {series}
                    <X className="w-4 h-4" />
                  </button>
                ))}
              </div>

              {/* Sort */}
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="px-4 py-2 border border-neutral-300 rounded-lg focus:border-neutral-900 outline-none"
              >
                <option value="featured">Featured</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
                <option value="rating">Highest Rated</option>
              </select>
            </div>

            {/* Products Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
              {currentProducts.map((product) => (
                <Link
                  key={product.id}
                  href={`/shop/${product.category.toLowerCase()}/${product.slug}`}
                  className="group"
                >
                  <div className="aspect-square bg-neutral-100 rounded-lg overflow-hidden mb-4">
                    <OptimizedImage
                      src={product.image}
                      alt={product.name}
                      type="card"
                      className="w-full h-full group-hover:scale-105 transition-transform duration-500"
                    />
                  </div>
                  
                  <div>
                    <p className="text-sm text-neutral-600 mb-1">{product.category}</p>
                    <h3 className="text-lg font-bold mb-2 group-hover:underline">
                      {product.name}
                    </h3>
                    <p className="text-lg font-medium">${product.price}</p>
                  </div>
                </Link>
              ))}
            </div>

            {/* Pagination */}
            <div className="flex items-center justify-center gap-2">
              <button
                onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
                disabled={currentPage === 1}
                className="px-4 py-2 rounded-lg border border-neutral-300 hover:border-neutral-900 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                Previous
              </button>

              {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                <button
                  key={page}
                  onClick={() => setCurrentPage(page)}
                  className={`w-10 h-10 rounded-lg transition-colors ${
                    currentPage === page
                      ? 'bg-neutral-900 text-white'
                      : 'border border-neutral-300 hover:border-neutral-900'
                  }`}
                >
                  {page}
                </button>
              ))}

              <button
                onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
                disabled={currentPage === totalPages}
                className="px-4 py-2 rounded-lg border border-neutral-300 hover:border-neutral-900 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                Next
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Filters Modal */}
      {showMobileFilters && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div className="absolute inset-0 bg-black/50" onClick={() => setShowMobileFilters(false)} />
          <div className="absolute right-0 top-0 bottom-0 w-80 bg-white p-6 overflow-y-auto">
            <button
              onClick={() => setShowMobileFilters(false)}
              className="mb-6 p-2 hover:bg-neutral-100 rounded-full"
            >
              <X className="w-6 h-6" />
            </button>

            {/* Same filters as desktop */}
            <div className="mb-8">
              <h3 className="font-semibold mb-4">Category</h3>
              <div className="space-y-3">
                {['Road', 'Gravel', 'MTB', 'Urban'].map((cat) => (
                  <label key={cat} className="flex items-center gap-3 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={selectedCategories.includes(cat)}
                      onChange={() => toggleCategory(cat)}
                      className="w-5 h-5 rounded border-neutral-300 accent-neutral-900"
                    />
                    <span className="text-sm">{cat}</span>
                  </label>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </main>
  )
}
