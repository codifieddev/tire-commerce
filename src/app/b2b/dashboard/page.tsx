// app/b2b/dashboard/page.tsx
'use client'
import { motion } from 'framer-motion'
import { useState } from 'react'
import Image from 'next/image'
import { 
  Package, ShoppingCart, FileText, Download, 
  TrendingUp, DollarSign, Users, AlertCircle 
} from 'lucide-react'

export default function B2BDashboard() {
  const [activeTab, setActiveTab] = useState<'overview' | 'orders' | 'catalog' | 'pricing'>('overview')

  return (
    <main className="min-h-screen bg-neutral-50">
      {/* Header */}
      <div className="bg-white border-b border-neutral-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between">
            <Image
              src="/images/Goodyear-Bicyle-Logo-Black-320x-20px.png"
              alt="Goodyear"
              width={200}
              height={43}
            />
            <div className="flex items-center gap-4">
              <div className="text-right">
                <p className="text-sm text-neutral-600">Acme Bicycle Co.</p>
                <p className="text-xs text-neutral-500">Dealership #12345</p>
              </div>
              <div className="w-10 h-10 bg-primary rounded-full flex items-center justify-center font-bold text-neutral-900">
                AC
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Tabs */}
        <div className="flex gap-4 mb-8">
          {[
            { id: 'overview', label: 'Overview' },
            { id: 'orders', label: 'Orders' },
            { id: 'catalog', label: 'Catalog' },
            { id: 'pricing', label: 'Pricing Tiers' },
          ].map((tab) => (
            <motion.button
              key={tab.id}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => setActiveTab(tab.id as any)}
              className={`px-6 py-3 rounded-xl font-semibold transition-colors ${
                activeTab === tab.id
                  ? 'bg-primary text-neutral-900'
                  : 'bg-white text-neutral-600 hover:bg-neutral-100'
              }`}
            >
              {tab.label}
            </motion.button>
          ))}
        </div>

        {/* Overview Tab */}
        {activeTab === 'overview' && <OverviewTab />}
        
        {/* Orders Tab */}
        {activeTab === 'orders' && <OrdersTab />}
        
        {/* Catalog Tab */}
        {activeTab === 'catalog' && <CatalogTab />}
        
        {/* Pricing Tab */}
        {activeTab === 'pricing' && <PricingTab />}
      </div>
    </main>
  )
}

function OverviewTab() {
  const stats = [
    { label: 'Total Orders', value: '248', icon: Package, color: 'bg-blue-100 text-blue-600' },
    { label: 'This Month', value: '$45,280', icon: DollarSign, color: 'bg-green-100 text-green-600' },
    { label: 'Pending Orders', value: '12', icon: AlertCircle, color: 'bg-orange-100 text-orange-600' },
    { label: 'Growth', value: '+23%', icon: TrendingUp, color: 'bg-purple-100 text-purple-600' },
  ]

  return (
    <div className="space-y-6">
      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => {
          const Icon = stat.icon
          return (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ y: -4 }}
              className="bg-white rounded-2xl p-6 shadow-sm"
            >
              <div className="flex items-center justify-between mb-4">
                <div className={`w-12 h-12 ${stat.color} rounded-xl flex items-center justify-center`}>
                  <Icon className="w-6 h-6" />
                </div>
              </div>
              <p className="text-3xl font-bold text-neutral-900">{stat.value}</p>
              <p className="text-sm text-neutral-600">{stat.label}</p>
            </motion.div>
          )
        })}
      </div>

      {/* Recent Orders */}
      <div className="bg-white rounded-2xl p-6 shadow-sm">
        <h3 className="text-xl font-bold text-neutral-900 mb-4">Recent Orders</h3>
        <div className="space-y-3">
          {[
            { id: '#ORD-2891', date: 'Oct 24, 2025', total: '$2,450', status: 'Shipped' },
            { id: '#ORD-2890', date: 'Oct 23, 2025', total: '$1,850', status: 'Processing' },
            { id: '#ORD-2889', date: 'Oct 22, 2025', total: '$3,200', status: 'Delivered' },
          ].map((order) => (
            <div key={order.id} className="flex items-center justify-between p-4 bg-neutral-50 rounded-xl">
              <div>
                <p className="font-semibold text-neutral-900">{order.id}</p>
                <p className="text-sm text-neutral-600">{order.date}</p>
              </div>
              <div className="text-right">
                <p className="font-bold text-neutral-900">{order.total}</p>
                <span className={`text-xs px-2 py-1 rounded-full ${
                  order.status === 'Delivered' ? 'bg-green-100 text-green-700' :
                  order.status === 'Shipped' ? 'bg-blue-100 text-blue-700' :
                  'bg-orange-100 text-orange-700'
                }`}>
                  {order.status}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

function OrdersTab() {
  return (
    <div className="bg-white rounded-2xl p-6 shadow-sm">
      <h3 className="text-xl font-bold mb-4">Order History</h3>
      {/* Order management interface */}
      <p className="text-neutral-600">Full order management coming soon...</p>
    </div>
  )
}

function CatalogTab() {
  return (
    <div className="space-y-6">
      <div className="bg-white rounded-2xl p-6 shadow-sm">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-xl font-bold">Product Catalog</h3>
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="flex items-center gap-2 px-6 py-3 bg-primary text-neutral-900 font-semibold rounded-xl"
          >
            <Download className="w-5 h-5" />
            Download PDF Catalog
          </motion.button>
        </div>
        
        {/* Catalog preview */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {['Road', 'Gravel', 'MTB', 'Urban'].map((category) => (
            <div key={category} className="p-4 border-2 border-neutral-200 rounded-xl hover:border-primary transition-colors cursor-pointer">
              <div className="aspect-square bg-neutral-100 rounded-lg mb-2" />
              <p className="font-semibold text-center">{category} Tires</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

function PricingTab() {
  return (
    <div className="bg-white rounded-2xl p-6 shadow-sm">
      <h3 className="text-xl font-bold mb-4">Your Pricing Tier: Gold Partner</h3>
      <div className="space-y-4">
        <div className="p-4 bg-green-50 border border-green-200 rounded-xl">
          <p className="font-semibold text-green-900">Volume Discount: 25%</p>
          <p className="text-sm text-green-700">Available on all orders over 100 units</p>
        </div>
      </div>
    </div>
  )
}