'use client'
import { useState } from 'react'
import Image from 'next/image'
import { ChevronDown, Minus, Plus } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'

const product = {
  name: 'Peak SL Road Tire',
  price: 89.99,
  series: 'Ultra High-Performance',
  description: 'Premium road racing tire with R:Shield puncture protection and Dynamic:HP compound.',
  images: [
    '/images/products/peak-sl.jpg',
    '/images/products/peak-sl.jpg',
    '/images/products/peak-sl.jpg',
    '/images/products/peak-sl.jpg',
  ],
  sizes: ['700x23c', '700x25c', '700x28c', '700x30c'],
  features: [
    'R:Shield puncture protection',
    'Dynamic:HP compound',
    '240 TPI casing',
    'Tubeless ready',
  ],
}

export default function ProductPage() {
  const [selectedSize, setSelectedSize] = useState(product.sizes[0])
  const [quantity, setQuantity] = useState(1)
  const [activeAccordion, setActiveAccordion] = useState<string | null>(null)

  return (
    <main className="min-h-screen bg-white pt-28 pb-20">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          {/* Left: Images */}
          <div className="space-y-4">
            {product.images.map((img, index) => (
              <div
                key={index}
                className="aspect-square bg-neutral-100 rounded-lg overflow-hidden"
              >
                <div className="w-full h-full bg-gradient-to-br from-neutral-200 to-neutral-100" />
              </div>
            ))}
          </div>

          {/* Right: Info - Sticky */}
          <div className="lg:sticky lg:top-28 lg:h-fit">
            <div className="mb-8">
              <p className="text-sm text-neutral-600 mb-2">{product.series}</p>
              <h1 className="text-4xl md:text-5xl font-bold mb-4">
                {product.name}
              </h1>
              <p className="text-2xl font-medium">${product.price}</p>
            </div>

            <p className="text-lg text-neutral-700 mb-8">
              {product.description}
            </p>

            {/* Size Selection */}
            <div className="mb-8">
              <div className="flex items-center justify-between mb-4">
                <p className="font-medium">Select Size</p>
                <button className="text-sm text-neutral-600 hover:text-neutral-900">
                  Size Guide
                </button>
              </div>

              <div className="grid grid-cols-2 gap-3">
                {product.sizes.map((size:string) => (
                  <button
                    key={size}
                    onClick={() => setSelectedSize(size)}
                    className={`py-4 px-6 rounded-lg border-2 font-medium transition-all ${
                      selectedSize === size
                        ? 'border-neutral-900 bg-neutral-50'
                        : 'border-neutral-300 hover:border-neutral-900'
                    }`}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>

            {/* Quantity */}
            <div className="mb-8">
              <p className="font-medium mb-4">Quantity</p>
              <div className="flex items-center gap-4">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="w-12 h-12 rounded-full border-2 border-neutral-300 hover:border-neutral-900 flex items-center justify-center transition-colors"
                >
                  <Minus className="w-4 h-4" />
                </button>
                <span className="text-lg font-medium w-12 text-center">
                  {quantity}
                </span>
                <button
                  onClick={() => setQuantity(quantity + 1)}
                  className="w-12 h-12 rounded-full border-2 border-neutral-300 hover:border-neutral-900 flex items-center justify-center transition-colors"
                >
                  <Plus className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Add to Cart */}
            <button className="w-full py-4 bg-neutral-900 text-white font-medium rounded-full hover:bg-neutral-700 transition-colors mb-4">
              Add to Cart
            </button>

            <button className="w-full py-4 bg-white text-neutral-900 font-medium rounded-full border-2 border-neutral-300 hover:border-neutral-900 transition-colors">
              Favorite
            </button>

            {/* Accordions */}
            <div className="mt-12 space-y-4">
              <Accordion
                title="Features"
                isOpen={activeAccordion === 'features'}
                onToggle={() =>
                  setActiveAccordion(
                    activeAccordion === 'features' ? null : 'features'
                  )
                }
              >
                <ul className="space-y-2">
                  {product.features.map((feature, index) => (
                    <li key={index} className="flex items-start gap-2">
                      <span className="w-1.5 h-1.5 bg-neutral-900 rounded-full mt-2" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </Accordion>

              <Accordion
                title="Delivery & Returns"
                isOpen={activeAccordion === 'delivery'}
                onToggle={() =>
                  setActiveAccordion(
                    activeAccordion === 'delivery' ? null : 'delivery'
                  )
                }
              >
                <p className="text-neutral-700">
                  Free standard delivery on orders over $50. Free returns within 30 days.
                </p>
              </Accordion>

              <Accordion
                title="Product Information"
                isOpen={activeAccordion === 'info'}
                onToggle={() =>
                  setActiveAccordion(activeAccordion === 'info' ? null : 'info')
                }
              >
                <div className="space-y-2 text-neutral-700">
                  <p><strong>Weight:</strong> 240g</p>
                  <p><strong>TPI:</strong> 240</p>
                  <p><strong>Compound:</strong> Dynamic:HP</p>
                  <p><strong>Protection:</strong> R:Shield</p>
                </div>
              </Accordion>
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}

// Accordion Component
interface AccordionProps {
  title: string
  children: React.ReactNode
  isOpen: boolean
  onToggle: () => void
}

function Accordion({ title, children, isOpen, onToggle }: AccordionProps) {
  return (
    <div className="border-t border-neutral-200 py-6">
      <button
        onClick={onToggle}
        className="w-full flex items-center justify-between text-left"
      >
        <span className="text-lg font-medium">{title}</span>
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
            <div className="pt-4">{children}</div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
