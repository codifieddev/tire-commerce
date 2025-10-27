import { OptimizedImage } from '@/components/ui/optimized-image'
import Link from 'next/link'

export default function HomePage() {
  return (
    <main className="min-h-screen bg-white">
      {/* Hero Section - Nike Style */}
      <section className="relative h-screen">
        <div className="absolute inset-0 bg-neutral-100">
          {/* Placeholder for hero image */}
          <div className="w-full h-full bg-gradient-to-br from-neutral-200 to-neutral-100" />
        </div>
        
        <div className="relative h-full flex items-end">
          <div className="max-w-7xl mx-auto px-6 lg:px-8 pb-24 w-full">
            <div className="max-w-2xl">
              <h1 className="text-display mb-6">
                Roll
                <br />
                Faster
              </h1>
              <p className="text-xl md:text-2xl text-neutral-700 mb-8">
                High-performance bicycle tires engineered for speed, grip, and durability.
              </p>
              <div className="flex gap-4">
                <Link href="/shop" className="btn-primary">
                  Shop Now
                </Link>
                <Link href="/calculator" className="btn-secondary">
                  Find Your Tire
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Category - Road */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <p className="text-sm font-semibold text-neutral-600 mb-2">ULTRA HIGH-PERFORMANCE</p>
              <h2 className="text-hero mb-6">Road Tires</h2>
              <p className="text-lg text-neutral-600 mb-8">
                Engineered for speed. Built for endurance. Designed to dominate the road.
              </p>
              <Link href="/shop/road" className="btn-primary">
                Explore Road
              </Link>
            </div>
            <div className="aspect-square bg-neutral-100 rounded-lg overflow-hidden">
              {/* Placeholder */}
              <div className="w-full h-full bg-gradient-to-br from-neutral-200 to-neutral-100" />
            </div>
          </div>
        </div>
      </section>

      {/* Categories Grid */}
      <section className="py-20 bg-neutral-50">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <h2 className="text-4xl font-bold mb-12">Shop by Category</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { name: 'Road', href: '/shop/road', desc: 'High-performance racing' },
              { name: 'Gravel', href: '/shop/gravel', desc: 'Adventure-ready' },
              { name: 'MTB', href: '/shop/mtb', desc: 'Mountain dominance' },
              { name: 'Urban', href: '/shop/urban', desc: 'City commuting' },
            ].map((category) => (
              <Link
                key={category.name}
                href={category.href}
                className="group block"
              >
                <div className="aspect-square bg-neutral-100 rounded-lg overflow-hidden mb-4">
                  <div className="w-full h-full bg-gradient-to-br from-neutral-200 to-neutral-100 group-hover:scale-105 transition-transform duration-500" />
                </div>
                <h3 className="text-xl font-bold mb-1">{category.name}</h3>
                <p className="text-neutral-600">{category.desc}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="flex items-center justify-between mb-12">
            <h2 className="text-4xl font-bold">Featured Products</h2>
            <Link href="/shop" className="text-lg font-medium hover:underline">
              View All →
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[1, 2, 3, 4].map((i) => (
              <Link key={i} href={`/shop/road/peak-sl-${i}`} className="group">
                <div className="aspect-square bg-neutral-100 rounded-lg overflow-hidden mb-4">
                  <div className="w-full h-full bg-gradient-to-br from-neutral-200 to-neutral-100 group-hover:scale-105 transition-transform duration-500" />
                </div>
                <div>
                  <p className="text-sm text-neutral-600 mb-1">Road Tire</p>
                  <h3 className="text-lg font-bold mb-2">Peak SL {i}</h3>
                  <p className="text-lg font-medium">$89.99</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Resources Banner */}
      <section className="py-20 bg-neutral-900 text-white">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 text-center">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Not Sure Which Tire?
          </h2>
          <p className="text-xl text-neutral-300 mb-8">
            Use our tire pressure calculator to find your perfect setup
          </p>
          <Link href="/calculator" className="bg-white text-neutral-900 px-8 py-4 rounded-full font-medium hover:bg-neutral-100 transition-colors inline-block">
            Calculate Now
          </Link>
        </div>
      </section>
    </main>
  )
}
