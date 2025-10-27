import { HeroSection } from '@/components/sections/hero-section'
import { FeaturesSection } from '@/components/sections/features-section'
import { CategoryGrid } from '@/components/sections/category-grid'
import { ProductGrid } from '@/components/sections/product-grid'

export default function HomePage() {
  return (
    <main className="overflow-hidden">
      <HeroSection />
      <FeaturesSection />
      <CategoryGrid />
      <ProductGrid title="MOST POPULAR PRODUCTS" />
    </main>
  )
}