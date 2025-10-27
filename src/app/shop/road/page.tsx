'use client'
import { useState } from 'react'
import Link from 'next/link'
import { OptimizedImage } from '@/components/ui/optimized-image'

const products = [
  {
    id: 1,
    name: 'Eagle F1 SuperSport R',
    series: 'Ultra High-Performance',
    price: 89.99,
    description: 'Premium racing tire with R:Shield protection',
    image: 'peak-sl.jpg',
    slug: 'eagle-f1-supersport-r',
  },
  {
    id: 2,
    name: 'Eagle F1R',
    series: 'Ultra High-Performance',
    price: 79.99,
    description: 'High-performance road racing',
    image: 'peak-sl.jpg',
    slug: 'eagle-f1r',
  },
  {
    id: 3,
    name: 'Vector 4Seasons',
    series: 'High-Performance',
    price: 69.99,
    description: 'All-season versatility',
    image: 'peak-sl.jpg',
    slug: 'vector-4seasons',
  },
  {
    id: 4,
    name: 'Vector R',
    series: 'Fitment Series',
    price: 84.99,
    description: 'System-optimized performance',
    image: 'peak-sl.jpg',
    slug: 'vector-r',
  },
  {
    id: 5,
    name: 'Eagle',
    series: 'Performance',
    price: 59.99,
    description: 'Reliable everyday performance',
    image: 'peak-sl.jpg',
    slug: 'eagle',
  },
  {
    id: 6,
    name: 'Vector Sport',
    series: 'Performance',
    price: 54.99,
    description: 'Value-focused road tire',
    image: 'peak-sl.jpg',
    slug: 'vector-sport',
  },
]

export default function RoadTiresPage() {
  const [filter, setFilter] = useState<string>('all')

  const filteredProducts = filter === 'all' 
    ? products 
    : products.filter(p => p.series === filter)

  return (
    <main className="min-h-screen bg-white pt-28 pb-20">
      {/* Hero Section */}
      <section className="relative h-[60vh] mb-20">
        <div className="absolute inset-0 bg-neutral-100">
          <div className="w-full h-full bg-gradient-to-br from-neutral-200 to-neutral-100" />
        </div>
        
        <div className="relative h-full flex items-end">
          <div className="max-w-7xl mx-auto px-6 lg:px-8 pb-16 w-full">
            <h1 className="text-display mb-4">Road Tires</h1>
            <p className="text-xl text-neutral-700 max-w-2xl">
              High-performance tires engineered for speed, grip, and endurance on the road.
            </p>
          </div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        {/* Filter Bar */}
        <div className="flex items-center justify-between mb-12 pb-6 border-b border-neutral-200">
          <div className="flex gap-4">
            <button
              onClick={() => setFilter('all')}
              className={`px-6 py-2 rounded-full transition-colors ${
                filter === 'all'
                  ? 'bg-neutral-900 text-white'
                  : 'bg-white text-neutral-900 border border-neutral-300 hover:border-neutral-900'
              }`}
            >
              All
            </button>
            <button
              onClick={() => setFilter('Ultra High-Performance')}
              className={`px-6 py-2 rounded-full transition-colors ${
                filter === 'Ultra High-Performance'
                  ? 'bg-neutral-900 text-white'
                  : 'bg-white text-neutral-900 border border-neutral-300 hover:border-neutral-900'
              }`}
            >
              UHP
            </button>
            <button
              onClick={() => setFilter('High-Performance')}
              className={`px-6 py-2 rounded-full transition-colors ${
                filter === 'High-Performance'
                  ? 'bg-neutral-900 text-white'
                  : 'bg-white text-neutral-900 border border-neutral-300 hover:border-neutral-900'
              }`}
            >
              HP
            </button>
            <button
              onClick={() => setFilter('Performance')}
              className={`px-6 py-2 rounded-full transition-colors ${
                filter === 'Performance'
                  ? 'bg-neutral-900 text-white'
                  : 'bg-white text-neutral-900 border border-neutral-300 hover:border-neutral-900'
              }`}
            >
              Performance
            </button>
          </div>

          <p className="text-neutral-600">
            {filteredProducts.length} {filteredProducts.length === 1 ? 'Product' : 'Products'}
          </p>
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProducts.map((product) => (
            <Link
              key={product.id}
              href={`/shop/road/${product.slug}`}
              className="group"
            >
              <div className="aspect-square bg-neutral-100 rounded-lg overflow-hidden mb-4">
                <div className="w-full h-full bg-gradient-to-br from-neutral-200 to-neutral-100 group-hover:scale-105 transition-transform duration-500" />
              </div>
              
              <div>
                <p className="text-sm text-neutral-600 mb-1">{product.series}</p>
                <h3 className="text-xl font-bold mb-2 group-hover:underline">
                  {product.name}
                </h3>
                <p className="text-neutral-600 mb-3">{product.description}</p>
                <p className="text-lg font-medium">${product.price}</p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </main>
  )
}
