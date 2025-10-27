import { OptimizedImage } from '@/components/ui/optimized-image'

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-white pt-28 pb-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-5xl font-bold mb-8">About Goodyear Bicycle Tires</h1>
        
        <div className="prose prose-lg max-w-none">
          <p className="text-xl text-neutral-600 mb-8">
            Global producers of high-performance bicycle tires for road, gravel, mountain, and urban cycling.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 my-12">
            <OptimizedImage
              src="peak-sl.jpg"
              alt="Goodyear Peak SL"
              type="card"
              className="rounded-2xl aspect-video"
            />
            <OptimizedImage
              src="peak-sl.jpg"
              alt="Goodyear Manufacturing"
              type="card"
              className="rounded-2xl aspect-video"
            />
          </div>

          <h2 className="text-3xl font-bold mt-12 mb-4">Our Product Lines</h2>
          <ul className="space-y-2">
            <li>Road Tires - High-performance racing</li>
            <li>Gravel Tires - Adventure-ready</li>
            <li>MTB Tires - Mountain bike excellence</li>
            <li>Urban Tires - City commuting</li>
          </ul>

          <h2 className="text-3xl font-bold mt-12 mb-4">Quick Links</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {[
              { label: 'Shop All', href: '/shop' },
              { label: 'Cart', href: '/cart' },
              { label: 'Tire Calculator', href: '/calculator' },
              { label: 'B2B Portal', href: '/b2b/login' },
              { label: 'B2B Register', href: '/b2b/register' },
              { label: 'B2B Dashboard', href: '/b2b/dashboard' },
            ].map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="block p-4 bg-neutral-50 hover:bg-neutral-100 rounded-xl transition-colors font-semibold"
              >
                {link.label}
              </a>
            ))}
          </div>
        </div>
      </div>
    </main>
  )
}