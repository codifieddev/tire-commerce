import Link from 'next/link'
import { OptimizedImage } from '@/components/ui/optimized-image'

export default function LandingAlt1() {
  return (
    <main className="min-h-screen bg-white">
      {/* Hero with Gradient Overlay */}
      <section className="relative h-screen flex items-center">
        <div className="absolute inset-0 bg-gradient-to-r from-neutral-900 via-neutral-800 to-neutral-700">
          <div className="absolute inset-0 opacity-20">
            <div className="w-full h-full bg-gradient-to-br from-primary/30 to-transparent" />
          </div>
        </div>
        
        <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8 w-full text-center">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-6xl md:text-8xl font-black text-white mb-6"
          >
            Performance
            <br />
            Unleashed
          </motion.h1>
          <p className="text-xl md:text-2xl text-neutral-300 mb-12 max-w-2xl mx-auto">
            Experience the next generation of bicycle tire technology
          </p>
          <div className="flex gap-6 justify-center">
            <Link href="/shop" className="btn-primary">
              Explore Collection
            </Link>
            <Link href="/calculator" className="bg-white text-neutral-900 px-8 py-4 rounded-full font-medium hover:bg-neutral-100 transition-colors">
              Find Your Tire
            </Link>
          </div>
        </div>
      </section>

      {/* Feature Cards */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <h2 className="text-4xl font-bold text-center mb-16">Why Choose Goodyear</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { title: 'Innovation', desc: 'Cutting-edge technology in every tire' },
              { title: 'Performance', desc: 'Engineered for speed and durability' },
              { title: 'Quality', desc: 'Rigorous testing for excellence' },
            ].map((feature, idx) => (
              <div key={idx} className="p-8 bg-gradient-to-br from-neutral-50 to-neutral-100 rounded-2xl hover:shadow-lg transition-shadow">
                <div className="w-16 h-16 bg-primary rounded-2xl mb-6 flex items-center justify-center">
                  <span className="text-3xl font-black text-neutral-900">{idx + 1}</span>
                </div>
                <h3 className="text-2xl font-bold mb-4">{feature.title}</h3>
                <p className="text-neutral-600">{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Product Showcase */}
      <section className="py-24 bg-neutral-900 text-white">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-5xl font-bold mb-6">Eagle F1 R</h2>
              <p className="text-xl text-neutral-300 mb-8">
                The ultimate road racing tire. R:Shield protection meets Dynamic:HP compound for unmatched performance.
              </p>
              <Link href="/shop/road/eagle-f1-r" className="bg-primary text-neutral-900 px-8 py-4 rounded-full font-medium hover:bg-primary-dark transition-colors inline-block">
                Learn More
              </Link>
            </div>
            <div className="aspect-square bg-neutral-800 rounded-2xl">
              <div className="w-full h-full bg-gradient-to-br from-neutral-700 to-neutral-800" />
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}
