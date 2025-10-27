import Link from 'next/link'

export default function LandingAlt2() {
  return (
    <main className="min-h-screen bg-white">
      {/* Split Hero */}
      <section className="min-h-screen grid grid-cols-1 lg:grid-cols-2">
        {/* Left */}
        <div className="flex items-center justify-center p-12 lg:p-24">
          <div className="max-w-lg">
            <span className="text-sm font-semibold text-neutral-600 uppercase tracking-wider mb-4 block">
              New Collection 2025
            </span>
            <h1 className="text-6xl md:text-7xl font-black mb-8">
              Built for
              <br />
              Champions
            </h1>
            <p className="text-xl text-neutral-600 mb-12">
              Professional-grade bicycle tires for road, gravel, and mountain terrain
            </p>
            <Link href="/shop" className="btn-primary">
              Shop Now
            </Link>
          </div>
        </div>

        {/* Right */}
        <div className="bg-neutral-100 flex items-center justify-center p-12">
          <div className="w-full max-w-lg aspect-square bg-gradient-to-br from-neutral-200 to-neutral-100 rounded-3xl" />
        </div>
      </section>

      {/* Floating Cards Grid */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">Explore by Category</h2>
            <p className="text-xl text-neutral-600">Find the perfect tire for your riding style</p>
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { name: 'Road', count: '12 models' },
              { name: 'Gravel', count: '8 models' },
              { name: 'MTB', count: '15 models' },
              { name: 'Urban', count: '6 models' },
            ].map((cat) => (
              <Link
                key={cat.name}
                href={`/shop/${cat.name.toLowerCase()}`}
                className="group"
              >
                <div className="aspect-square bg-neutral-100 rounded-2xl mb-4 overflow-hidden">
                  <div className="w-full h-full bg-gradient-to-br from-neutral-200 to-neutral-100 group-hover:scale-110 transition-transform duration-500" />
                </div>
                <h3 className="text-xl font-bold mb-1">{cat.name}</h3>
                <p className="text-neutral-600 text-sm">{cat.count}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Banner */}
      <section className="py-24 bg-primary">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 text-center">
          <h2 className="text-5xl font-black text-neutral-900 mb-6">
            Join the Revolution
          </h2>
          <p className="text-xl text-neutral-800 mb-8">
            Over 50,000 riders trust Goodyear for their cycling adventures
          </p>
          <Link href="/b2b/register" className="bg-neutral-900 text-white px-8 py-4 rounded-full font-medium hover:bg-neutral-700 transition-colors inline-block">
            Become a Partner
          </Link>
        </div>
      </section>
    </main>
  )
}
