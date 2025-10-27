// components/product/specifications-table.tsx
'use client'
import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { useState } from 'react'
import { ChevronDown } from 'lucide-react'

interface Specification {
  sku: string
  name: string
  airRetention: string
  commonSize: string
  etrto: string
  casing: string
  compound: string
  sidewallColor: string
  bead: string
  weight: number
  eRating: string
}

const specifications: Specification[] = [
  {
    sku: 'GR.007.50.584.V302W.R',
    name: 'Transit Tour',
    airRetention: 'Tube Type',
    commonSize: '27.5x2.0',
    etrto: '50-584',
    casing: '60tpi + S3:Shell',
    compound: 'Dynamic:HP',
    sidewallColor: 'Black + Reflect',
    bead: 'Wire',
    weight: 740,
    eRating: 'E-50',
  },
  {
    sku: 'GR.007.61.584.V302W.R',
    name: 'Transit Tour',
    airRetention: 'Tube Type',
    commonSize: '27.5x2.4',
    etrto: '61-584',
    casing: '60tpi + S3:Shell',
    compound: 'Dynamic:HP',
    sidewallColor: 'Black + Reflect',
    bead: 'Wire',
    weight: 1125,
    eRating: 'E-50',
  },
  // Add more specifications...
]

export function SpecificationsTable() {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 })
  const [isExpanded, setIsExpanded] = useState(false)

  const displayedSpecs = isExpanded ? specifications : specifications.slice(0, 3)

  return (
    <motion.section
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      className="mt-16 bg-neutral-50 rounded-3xl p-8"
    >
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-3xl font-bold text-neutral-900">
          Size and Specifications
        </h2>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => setIsExpanded(!isExpanded)}
          className="flex items-center gap-2 px-4 py-2 bg-white rounded-xl border-2 border-neutral-200 hover:border-neutral-300 transition-colors"
        >
          <span className="font-medium">
            {isExpanded ? 'Show Less' : 'Show All'}
          </span>
          <motion.div
            animate={{ rotate: isExpanded ? 180 : 0 }}
            transition={{ duration: 0.3 }}
          >
            <ChevronDown className="w-5 h-5" />
          </motion.div>
        </motion.button>
      </div>

      <div className="overflow-x-auto rounded-2xl">
        <table className="w-full bg-white">
          <thead>
            <tr className="bg-neutral-900 text-white">
              <th className="px-4 py-4 text-left text-sm font-bold uppercase tracking-wider">
                SKU
              </th>
              <th className="px-4 py-4 text-left text-sm font-bold uppercase tracking-wider">
                Name
              </th>
              <th className="px-4 py-4 text-left text-sm font-bold uppercase tracking-wider">
                Air Retention
              </th>
              <th className="px-4 py-4 text-left text-sm font-bold uppercase tracking-wider">
                Common Size
              </th>
              <th className="px-4 py-4 text-left text-sm font-bold uppercase tracking-wider">
                ETRTO
              </th>
              <th className="px-4 py-4 text-left text-sm font-bold uppercase tracking-wider">
                Casing
              </th>
              <th className="px-4 py-4 text-left text-sm font-bold uppercase tracking-wider">
                Compound
              </th>
              <th className="px-4 py-4 text-left text-sm font-bold uppercase tracking-wider">
                Sidewall Color
              </th>
              <th className="px-4 py-4 text-left text-sm font-bold uppercase tracking-wider">
                Bead
              </th>
              <th className="px-4 py-4 text-left text-sm font-bold uppercase tracking-wider">
                Weight (g)
              </th>
              <th className="px-4 py-4 text-left text-sm font-bold uppercase tracking-wider">
                E-Rating
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-neutral-200">
            {displayedSpecs.map((spec, index) => (
              <motion.tr
                key={spec.sku}
                initial={{ opacity: 0, x: -20 }}
                animate={inView ? { opacity: 1, x: 0 } : {}}
                transition={{ delay: index * 0.05 }}
                className={`hover:bg-neutral-50 transition-colors ${
                  index === 1 ? 'bg-primary/10' : ''
                }`}
              >
                <td className="px-4 py-4 text-sm font-mono">{spec.sku}</td>
                <td className="px-4 py-4 text-sm font-semibold">{spec.name}</td>
                <td className="px-4 py-4 text-sm">{spec.airRetention}</td>
                <td className="px-4 py-4 text-sm font-medium">
                  {spec.commonSize}
                </td>
                <td className="px-4 py-4 text-sm">{spec.etrto}</td>
                <td className="px-4 py-4 text-sm">{spec.casing}</td>
                <td className="px-4 py-4 text-sm">{spec.compound}</td>
                <td className="px-4 py-4 text-sm">{spec.sidewallColor}</td>
                <td className="px-4 py-4 text-sm">{spec.bead}</td>
                <td className="px-4 py-4 text-sm font-bold">{spec.weight}</td>
                <td className="px-4 py-4 text-sm">{spec.eRating}</td>
              </motion.tr>
            ))}
          </tbody>
        </table>
      </div>
    </motion.section>
  )
}