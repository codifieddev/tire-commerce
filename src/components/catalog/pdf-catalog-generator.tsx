// components/catalog/pdf-catalog-generator.tsx
'use client'
import { motion } from 'framer-motion'
import { Download, FileText } from 'lucide-react'

interface CatalogProduct {
  sku: string
  name: string
  category: string
  sizes: string[]
  retailPrice: number
  wholesalePrice: number
  features: string[]
  image: string
}

const catalogData: CatalogProduct[] = [
  {
    sku: 'GY-EF1R-700x25',
    name: 'Eagle F1R',
    category: 'Road',
    sizes: ['700x23c', '700x25c', '700x28c'],
    retailPrice: 89.99,
    wholesalePrice: 62.99,
    features: ['240 TPI', 'Tubeless Ready', 'R:Shield Protection'],
    image: '/images/eagle-f1r.jpg',
  },
  // Add more products...
]

export function PDFCatalogGenerator() {
  const generatePDF = async () => {
    // In production, use jsPDF or a server-side PDF generator
    console.log('Generating PDF catalog...')
    
    // Mock download
    const blob = new Blob(['PDF content'], { type: 'application/pdf' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = 'goodyear-b2b-catalog-2025.pdf'
    a.click()
  }

  return (
    <div className="bg-white rounded-2xl p-8 shadow-lg">
      <div className="flex items-center gap-4 mb-6">
        <div className="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center">
          <FileText className="w-8 h-8 text-primary" />
        </div>
        <div>
          <h3 className="text-2xl font-bold text-neutral-900">
            2025 Product Catalog
          </h3>
          <p className="text-neutral-600">
            Complete B2B wholesale pricing and specifications
          </p>
        </div>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        <div className="p-4 bg-neutral-50 rounded-xl">
          <p className="text-3xl font-bold text-primary">120+</p>
          <p className="text-sm text-neutral-600">Products</p>
        </div>
        <div className="p-4 bg-neutral-50 rounded-xl">
          <p className="text-3xl font-bold text-primary">4</p>
          <p className="text-sm text-neutral-600">Categories</p>
        </div>
        <div className="p-4 bg-neutral-50 rounded-xl">
          <p className="text-3xl font-bold text-primary">PDF</p>
          <p className="text-sm text-neutral-600">Format</p>
        </div>
        <div className="p-4 bg-neutral-50 rounded-xl">
          <p className="text-3xl font-bold text-primary">25%</p>
          <p className="text-sm text-neutral-600">Avg Discount</p>
        </div>
      </div>

      <motion.button
        whileHover={{ scale: 1.02, y: -2 }}
        whileTap={{ scale: 0.98 }}
        onClick={generatePDF}
        className="w-full py-4 bg-primary text-neutral-900 font-bold text-lg rounded-xl flex items-center justify-center gap-2 shadow-lg"
      >
        <Download className="w-5 h-5" />
        Download Full Catalog (PDF)
      </motion.button>

      <p className="text-center text-sm text-neutral-500 mt-4">
        Last updated: October 2025 | File size: ~8MB
      </p>
    </div>
  )
}