'use client'
import { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { OptimizedImage } from '@/components/ui/optimized-image'
import { 
  ChevronDown, Minus, Plus, Star, Heart, 
  Share2, Truck, RefreshCw, Shield 
} from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'

// Complete Eagle F1 R Product Data
const productData = {
  id: 1,
  name: 'Eagle F1 R',
  sku: 'GY-EF1R-700x25',
  price: 79.99,
  originalPrice: 89.99,
  category: 'Road',
  series: 'Ultra High-Performance',
  rating: 4.8,
  reviewCount: 127,
  inStock: true,
  description: 'The Eagle F1 R is a high-performance road racing tire featuring R:Shield puncture protection and Dynamic:HP compound for exceptional grip and durability. Engineered for competitive cyclists who demand the ultimate in speed, handling, and reliability.',
  
  images: [
    '/images/products/eagle-f1-r-1.jpg',
    '/images/products/eagle-f1-r-2.jpg',
    '/images/products/eagle-f1-r-3.jpg',
    '/images/products/eagle-f1-r-4.jpg',
  ],
  
  sizes: [
    { value: '700x23c', stock: 15 },
    { value: '700x25c', stock: 28 },
    { value: '700x28c', stock: 12 },
    { value: '700x30c', stock: 8 },
  ],
  
  features: [
    {
      icon: Shield,
      title: 'R:Shield Puncture Protection',
      desc: 'Advanced multi-layer protection against thorns, glass, and road debris'
    },
    {
      icon: Truck,
      title: 'Free Shipping',
      desc: 'On orders over $50'
    },
    {
      icon: RefreshCw,
      title: 'Easy Returns',
      desc: '30-day return policy'
    },
  ],
  
  detailedFeatures: [
    'R:Shield Puncture Protection - Advanced layer for superior flat resistance',
    'Dynamic:HP Compound - Optimized grip in all conditions',
    '240 TPI Casing - Supple ride quality with low rolling resistance',
    'Tubeless Ready - Easy setup with sealant for improved performance',
    'Road Race Optimized - Engineered for competitive cycling',
    'Bead-to-Bead Protection - Complete sidewall coverage',
    'Low Rolling Resistance - Speed-focused design',
    'All-Weather Compound - Consistent performance year-round',
  ],
  
  specifications: {
    'Weight': '240g (700x25c)',
    'TPI': '240',
    'Bead': 'Folding Kevlar',
    'Casing': 'Supple 240 TPI',
    'Compound': 'Dynamic:HP',
    'Protection': 'R:Shield Full Coverage',
    'Tubeless': 'Tubeless Ready',
    'Recommended Pressure': '85-100 PSI',
    'Max Pressure': '120 PSI',
    'Recommended Rim Width': '19-25mm',
    'Origin': 'Made in Europe',
  },
  
  technologies: [
    {
      name: 'R:Shield Technology',
      description: 'Multi-layer puncture protection system that shields against thorns, glass, and road debris without sacrificing rolling resistance. Strategic placement of protective materials provides comprehensive coverage while maintaining flexibility.',
      benefits: ['Superior puncture resistance', 'Lightweight design', 'Maintained rolling efficiency']
    },
    {
      name: 'Dynamic:HP Compound',
      description: 'High-performance rubber compound engineered for optimal grip, longevity, and low rolling resistance across all weather conditions. Advanced silica-based formula adapts to temperature variations.',
      benefits: ['Excellent wet grip', 'Long tread life', 'Low rolling resistance', 'Temperature adaptive']
    },
    {
      name: '240 TPI Casing',
      description: 'Ultra-supple 240 threads per inch casing provides exceptional ride quality and cornering confidence. Higher thread count delivers superior comfort and control.',
      benefits: ['Supple ride feel', 'Enhanced cornering', 'Reduced vibration', 'Better road conformance']
    },
  ],
  
  whatInBox: [
    '1x Eagle F1 R Tire',
    'Installation Guide',
    'Warranty Card',
  ],
}

// Related/Recommended Products
const relatedProducts = [
  { 
    id: 2, 
    name: 'Eagle F1 SuperSport R', 
    price: 89.99, 
    series: 'Ultra High-Performance', 
    image: 'eagle-f1-supersport-r.jpg',
    rating: 4.9,
    category: 'road'
  },
  { 
    id: 3, 
    name: 'Vector 4Seasons', 
    price: 69.99, 
    series: 'High-Performance', 
    image: 'vector-4seasons.jpg',
    rating: 4.7,
    category: 'road'
  },
  { 
    id: 4, 
    name: 'Vector R', 
    price: 84.99, 
    series: 'Fitment Series', 
    image: 'vector-r.jpg',
    rating: 4.8,
    category: 'road'
  },
  { 
    id: 5, 
    name: 'Eagle Sport', 
    price: 59.99, 
    series: 'Performance', 
    image: 'eagle-sport.jpg',
    rating: 4.5,
    category: 'road'
  },
]

export default function EnhancedProductPage() {
  const [selectedSize, setSelectedSize] = useState(productData.sizes.value)
  const [quantity, setQuantity] = useState(1)
  const [activeAccordion, setActiveAccordion] = useState<string | null>('features')
  const [selectedImage, setSelectedImage] = useState(0)
  const [isFavorite, setIsFavorite] = useState(false)

  return (
    <main className="min-h-screen bg-white">
      {/* Breadcrumb */}
      <div className="bg-neutral-50 py-4">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <nav className="text-sm">
            <ol className="flex items-center gap-2 text-neutral-600">
              <li><Link href="/" className="hover:text-neutral-900">Home</Link></li>
              <li>/</li>
              <li><Link href="/shop" className="hover:text-neutral-900">Shop</Link></li>
              <li>/</li>
              <li><Link href={`/shop/${productData.category.toLowerCase()}`} className="hover:text-neutral-900">{productData.category}</Link></li>
              <li>/</li>
              <li className="text-neutral-900 font-medium">{productData.name}</li>
            </ol>
          </nav>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Left: Images Gallery */}
          <div className="space-y-4">
            {/* Main Image */}
            <div className="aspect-square bg-neutral-100 rounded-2xl overflow-hidden">
              <OptimizedImage
                src={`eagle-f1-r-${selectedImage + 1}.jpg`}
                alt={`${productData.name} - View ${selectedImage + 1}`}
                type="product"
                className="w-full h-full object-cover"
              />
            </div>

            {/* Thumbnail Grid */}
            <div className="grid grid-cols-4 gap-4">
              {productData.images.map((img, index) => (
                <button
                  key={index}
                  onClick={() => setSelectedImage(index)}
                  className={`aspect-square bg-neutral-100 rounded-lg overflow-hidden border-2 transition-all ${
                    selectedImage === index
                      ? 'border-neutral-900'
                      : 'border-transparent hover:border-neutral-300'
                  }`}
                >
                  <OptimizedImage
                    src={`eagle-f1-r-${index + 1}.jpg`}
                    alt={`Thumbnail ${index + 1}`}
                    type="thumbnail"
                    className="w-full h-full object-cover"
                  />
                </button>
              ))}
            </div>
          </div>

          {/* Right: Product Info - Sticky */}
          <div className="lg:sticky lg:top-24 lg:h-fit">
            {/* Header */}
            <div className="mb-6">
              <div className="flex items-start justify-between mb-2">
                <div>
                  <p className="text-sm text-neutral-600 mb-1">{productData.series}</p>
                  <h1 className="text-4xl md:text-5xl font-bold mb-2">
                    {productData.name}
                  </h1>
                </div>
                <button
                  onClick={() => setIsFavorite(!isFavorite)}
                  className="p-3 rounded-full hover:bg-neutral-100 transition-colors"
                >
                  <Heart
                    className={`w-6 h-6 ${
                      isFavorite ? 'fill-red-500 text-red-500' : 'text-neutral-600'
                    }`}
                  />
                </button>
              </div>

              {/* Rating */}
              <div className="flex items-center gap-3 mb-4">
                <div className="flex items-center">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`w-5 h-5 ${
                        i < Math.floor(productData.rating)
                          ? 'fill-primary text-primary'
                          : 'text-neutral-300'
                      }`}
                    />
                  ))}
                </div>
                <span className="text-sm text-neutral-600">
                  {productData.rating} ({productData.reviewCount} reviews)
                </span>
              </div>

              {/* Price */}
              <div className="flex items-baseline gap-3 mb-4">
                <span className="text-3xl font-bold">${productData.price}</span>
                {productData.originalPrice && (
                  <span className="text-xl text-neutral-500 line-through">
                    ${productData.originalPrice}
                  </span>
                )}
                {productData.originalPrice && (
                  <span className="px-3 py-1 bg-red-100 text-red-700 text-sm font-semibold rounded-full">
                    Save ${(productData.originalPrice - productData.price).toFixed(2)}
                  </span>
                )}
              </div>

              {/* Stock Status */}
              <div className="flex items-center gap-2 mb-6">
                <div className={`w-2 h-2 rounded-full ${productData.inStock ? 'bg-green-500' : 'bg-red-500'}`} />
                <span className={`text-sm font-medium ${productData.inStock ? 'text-green-700' : 'text-red-700'}`}>
                  {productData.inStock ? 'In Stock' : 'Out of Stock'}
                </span>
              </div>
            </div>

            {/* Description */}
            <p className="text-neutral-700 mb-8 leading-relaxed">
              {productData.description}
            </p>

            {/* Size Selection */}
            <div className="mb-8">
              <div className="flex items-center justify-between mb-4">
                <p className="font-semibold text-lg">Select Size</p>
                <Link href="/size-guide" className="text-sm text-neutral-600 hover:text-neutral-900 underline">
                  Size Guide
                </Link>
              </div>

              <div className="grid grid-cols-2 gap-3">
                {productData.sizes.map((size) => (
                  <button
                    key={size.value}
                    onClick={() => setSelectedSize(size.value)}
                    disabled={size.stock === 0}
                    className={`py-4 px-6 rounded-xl border-2 font-medium transition-all relative ${
                      selectedSize === size.value
                        ? 'border-neutral-900 bg-neutral-50'
                        : size.stock === 0
                        ? 'border-neutral-200 bg-neutral-50 opacity-50 cursor-not-allowed'
                        : 'border-neutral-300 hover:border-neutral-900'
                    }`}
                  >
                    {size.value}
                    {size.stock > 0 && size.stock < 10 && (
                      <span className="absolute top-1 right-1 text-xs text-orange-600">
                        Only {size.stock} left
                      </span>
                    )}
                    {size.stock === 0 && (
                      <span className="absolute inset-0 flex items-center justify-center text-xs text-neutral-500">
                        Out of Stock
                      </span>
                    )}
                  </button>
                ))}
              </div>
            </div>

            {/* Quantity */}
            <div className="mb-8">
              <p className="font-semibold text-lg mb-4">Quantity</p>
              <div className="flex items-center gap-4">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="w-12 h-12 rounded-full border-2 border-neutral-300 hover:border-neutral-900 flex items-center justify-center transition-colors"
                >
                  <Minus className="w-5 h-5" />
                </button>
                <span className="text-xl font-semibold w-16 text-center">
                  {quantity}
                </span>
                <button
                  onClick={() => setQuantity(quantity + 1)}
                  className="w-12 h-12 rounded-full border-2 border-neutral-300 hover:border-neutral-900 flex items-center justify-center transition-colors"
                >
                  <Plus className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="space-y-3 mb-8">
              <button className="w-full py-4 bg-neutral-900 text-white font-semibold text-lg rounded-full hover:bg-neutral-700 transition-colors">
                Add to Cart
              </button>

              <button className="w-full py-4 bg-white text-neutral-900 font-semibold text-lg rounded-full border-2 border-neutral-300 hover:border-neutral-900 transition-colors flex items-center justify-center gap-2">
                <Share2 className="w-5 h-5" />
                Share
              </button>
            </div>

            {/* Feature Icons */}
            <div className="grid grid-cols-3 gap-4 py-6 border-y border-neutral-200 mb-8">
              {productData.features.map((feature, index) => {
                const Icon = feature.icon
                return (
                  <div key={index} className="text-center">
                    <div className="w-12 h-12 mx-auto mb-2 bg-neutral-100 rounded-full flex items-center justify-center">
                      <Icon className="w-6 h-6 text-neutral-700" />
                    </div>
                    <p className="text-xs font-semibold mb-1">{feature.title}</p>
                    <p className="text-xs text-neutral-600">{feature.desc}</p>
                  </div>
                )
              })}
            </div>

            {/* Accordions */}
            <div className="space-y-1">
              <ProductAccordion
                title="Features & Benefits"
                isOpen={activeAccordion === 'features'}
                onToggle={() => setActiveAccordion(activeAccordion === 'features' ? null : 'features')}
              >
                <ul className="space-y-3">
                  {productData.detailedFeatures.map((feature, index) => (
                    <li key={index} className="flex items-start gap-3">
                      <span className="w-1.5 h-1.5 bg-neutral-900 rounded-full mt-2 flex-shrink-0" />
                      <span className="text-neutral-700 text-sm">{feature}</span>
                    </li>
                  ))}
                </ul>
              </ProductAccordion>

              <ProductAccordion
                title="Specifications"
                isOpen={activeAccordion === 'specs'}
                onToggle={() => setActiveAccordion(activeAccordion === 'specs' ? null : 'specs')}
              >
                <div className="space-y-3">
                  {Object.entries(productData.specifications).map(([key, value], index) => (
                    <div key={index} className="flex justify-between py-3 border-b border-neutral-100 last:border-0">
                      <span className="font-medium text-neutral-900 text-sm">{key}</span>
                      <span className="text-neutral-700 text-sm text-right">{value}</span>
                    </div>
                  ))}
                </div>
              </ProductAccordion>

              <ProductAccordion
                title="Technology Deep Dive"
                isOpen={activeAccordion === 'tech'}
                onToggle={() => setActiveAccordion(activeAccordion === 'tech' ? null : 'tech')}
              >
                <div className="space-y-6">
                  {productData.technologies.map((tech, index) => (
                    <div key={index} className="pb-6 border-b border-neutral-100 last:border-0">
                      <h4 className="font-bold text-neutral-900 mb-3">{tech.name}</h4>
                      <p className="text-neutral-700 text-sm mb-4">{tech.description}</p>
                      <div className="space-y-2">
                        {tech.benefits.map((benefit, idx) => (
                          <div key={idx} className="flex items-center gap-2">
                            <div className="w-1 h-1 bg-primary rounded-full" />
                            <span className="text-neutral-700 text-sm">{benefit}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </ProductAccordion>

              <ProductAccordion
                title="What's in the Box"
                isOpen={activeAccordion === 'box'}
                onToggle={() => setActiveAccordion(activeAccordion === 'box' ? null : 'box')}
              >
                <ul className="space-y-2">
                  {productData.whatInBox.map((item, index) => (
                    <li key={index} className="flex items-center gap-3 text-sm text-neutral-700">
                      <div className="w-1.5 h-1.5 bg-neutral-900 rounded-full" />
                      {item}
                    </li>
                  ))}
                </ul>
              </ProductAccordion>

              <ProductAccordion
                title="Shipping & Returns"
                isOpen={activeAccordion === 'shipping'}
                onToggle={() => setActiveAccordion(activeAccordion === 'shipping' ? null : 'shipping')}
              >
                <div className="space-y-4 text-sm text-neutral-700">
                  <div>
                    <h5 className="font-semibold text-neutral-900 mb-2">Shipping</h5>
                    <ul className="space-y-2">
                      <li>• Free shipping on orders over $50</li>
                      <li>• Standard delivery: 3-5 business days</li>
                      <li>• Express delivery: 1-2 business days (+$15)</li>
                    </ul>
                  </div>
                  <div>
                    <h5 className="font-semibold text-neutral-900 mb-2">Returns</h5>
                    <ul className="space-y-2">
                      <li>• 30-day return policy</li>
                      <li>• Free return shipping</li>
                      <li>• Full refund or exchange</li>
                    </ul>
                  </div>
                </div>
              </ProductAccordion>
            </div>
          </div>
        </div>

        {/* Related Products */}
        <section className="mt-24">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-3xl font-bold">You Might Also Like</h2>
            <Link href="/shop" className="text-sm font-medium hover:underline">
              View All →
            </Link>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {relatedProducts.map((item) => (
              <Link
                key={item.id}
                href={`/products/${item.image.replace('.jpg', '')}`}
                className="group"
              >
                <div className="aspect-square bg-neutral-100 rounded-xl overflow-hidden mb-4">
                  <OptimizedImage
                    src={item.image}
                    alt={item.name}
                    type="card"
                    className="w-full h-full group-hover:scale-105 transition-transform duration-500"
                  />
                </div>
                
                <div>
                  <p className="text-sm text-neutral-600 mb-1">{item.series}</p>
                  <h3 className="text-lg font-bold mb-2 group-hover:underline">
                    {item.name}
                  </h3>
                  <div className="flex items-center gap-2 mb-2">
                    <div className="flex items-center">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={`w-4 h-4 ${
                            i < Math.floor(item.rating)
                              ? 'fill-primary text-primary'
                              : 'text-neutral-300'
                          }`}
                        />
                      ))}
                    </div>
                    <span className="text-xs text-neutral-600">{item.rating}</span>
                  </div>
                  <p className="text-lg font-semibold">${item.price}</p>
                </div>
              </Link>
            ))}
          </div>
        </section>
      </div>
    </main>
  )
}

// Product Accordion Component
interface ProductAccordionProps {
  title: string
  children: React.ReactNode
  isOpen: boolean
  onToggle: () => void
}

function ProductAccordion({ title, children, isOpen, onToggle }: ProductAccordionProps) {
  return (
    <div className="border-b border-neutral-200">
      <button
        onClick={onToggle}
        className="w-full flex items-center justify-between py-5 text-left hover:bg-neutral-50 px-4 -mx-4 rounded-lg transition-colors"
      >
        <span className="text-base font-semibold">{title}</span>
        <ChevronDown
          className={`w-5 h-5 transition-transform ${
            isOpen ? 'rotate-180' : ''
          }`}
        />
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="overflow-hidden"
          >
            <div className="pb-6 px-4">{children}</div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
