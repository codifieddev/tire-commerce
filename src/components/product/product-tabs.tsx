// components/product/product-tabs.tsx
'use client'
import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Star } from 'lucide-react'

type Tab = 'description' | 'specifications' | 'reviews'

const tabs: { id: Tab; label: string }[] = [
  { id: 'description', label: 'Description' },
  { id: 'specifications', label: 'Specifications' },
  { id: 'reviews', label: 'Reviews (156)' },
]

export function ProductTabs() {
  const [activeTab, setActiveTab] = useState<Tab>('description')

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.5 }}
      className="mt-16 space-y-6"
    >
      {/* Tab Headers */}
      <div className="flex gap-2 border-b border-neutral-200">
        {tabs.map((tab) => (
          <motion.button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            whileHover={{ y: -2 }}
            className={`relative px-6 py-4 font-semibold transition-colors ${
              activeTab === tab.id
                ? 'text-neutral-900'
                : 'text-neutral-500 hover:text-neutral-700'
            }`}
          >
            {tab.label}
            {activeTab === tab.id && (
              <motion.div
                layoutId="tab-indicator"
                className="absolute bottom-0 left-0 right-0 h-1 bg-primary rounded-t-full"
                transition={{ type: 'spring', stiffness: 300, damping: 30 }}
              />
            )}
          </motion.button>
        ))}
      </div>

      {/* Tab Content */}
      <AnimatePresence mode="wait">
        <motion.div
          key={activeTab}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -20 }}
          transition={{ duration: 0.3 }}
          className="py-8"
        >
          {activeTab === 'description' && <DescriptionContent />}
          {activeTab === 'specifications' && <SpecificationsContent />}
          {activeTab === 'reviews' && <ReviewsContent />}
        </motion.div>
      </AnimatePresence>
    </motion.div>
  )
}

function DescriptionContent() {
  return (
    <div className="prose prose-neutral max-w-none">
      <h3 className="text-2xl font-bold text-neutral-900 mb-4">Product Description</h3>
      <p className="text-neutral-700 leading-relaxed mb-4">
        The Peak SL is our most advanced road tire, engineered for riders who demand the perfect
        balance of speed, grip, and durability. Featuring our proprietary UltraGrip compound and
        lightweight 240 TPI casing, this tire delivers exceptional performance in all conditions.
      </p>
      <p className="text-neutral-700 leading-relaxed mb-4">
        Whether you're racing, training, or enjoying a weekend ride, the Peak SL provides
        confidence-inspiring traction and responsive handling that elevates your cycling experience.
      </p>

      <h4 className="text-xl font-bold text-neutral-900 mt-8 mb-4">Key Features</h4>
      <ul className="space-y-2 text-neutral-700">
        <li>✓ UltraGrip compound for superior wet and dry traction</li>
        <li>✓ Lightweight 240 TPI supple casing</li>
        <li>✓ 5mm puncture protection layer</li>
        <li>✓ Optimized tread pattern for low rolling resistance</li>
        <li>✓ Tubeless-ready construction</li>
      </ul>
    </div>
  )
}

function SpecificationsContent() {
  const specs = [
    { label: 'Weight', value: '285g (700x28c)' },
    { label: 'TPI (Threads Per Inch)', value: '240' },
    { label: 'Bead Type', value: 'Foldable' },
    { label: 'Compound', value: 'UltraGrip' },
    { label: 'Protection', value: '5mm Puncture Belt' },
    { label: 'Tubeless', value: 'Yes (Tubeless Ready)' },
    { label: 'Recommended Pressure', value: '80-110 PSI' },
    { label: 'Max Pressure', value: '120 PSI' },
  ]

  return (
    <div className="overflow-hidden rounded-2xl border border-neutral-200">
      <table className="w-full">
        <tbody className="divide-y divide-neutral-200">
          {specs.map((spec, index) => (
            <motion.tr
              key={spec.label}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.05 }}
              className="hover:bg-neutral-50 transition-colors"
            >
              <td className="p-4 font-semibold text-neutral-900">{spec.label}</td>
              <td className="p-4 text-neutral-700 text-right">{spec.value}</td>
            </motion.tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

function ReviewsContent() {
  const reviews = [
    {
      author: 'John D.',
      location: 'California',
      rating: 5,
      date: 'Oct 15, 2025',
      title: 'Best road tire I\'ve used!',
      content:
        'Incredible grip in both wet and dry conditions. The rolling resistance is noticeably low, and I\'ve had zero punctures in 500+ miles.',
    },
    {
      author: 'Sarah M.',
      location: 'Colorado',
      rating: 5,
      date: 'Oct 10, 2025',
      title: 'Perfect for racing',
      content:
        'Used these in my last criterium and they performed flawlessly. Corners with confidence and the speed is amazing.',
    },
  ]

  return (
    <div className="space-y-6">
      {reviews.map((review, index) => (
        <motion.div
          key={index}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.1 }}
          className="p-6 bg-neutral-50 rounded-2xl space-y-3"
        >
          <div className="flex items-start justify-between">
            <div>
              <h4 className="font-bold text-neutral-900">{review.author}</h4>
              <p className="text-sm text-neutral-600">{review.location}</p>
            </div>
            <span className="text-sm text-neutral-500">{review.date}</span>
          </div>

          <div className="flex items-center gap-1">
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                className={`w-4 h-4 ${
                  i < review.rating ? 'fill-primary text-primary' : 'text-neutral-300'
                }`}
              />
            ))}
          </div>

          <h5 className="font-semibold text-neutral-900">{review.title}</h5>
          <p className="text-neutral-700 leading-relaxed">{review.content}</p>
        </motion.div>
      ))}
    </div>
  )
}