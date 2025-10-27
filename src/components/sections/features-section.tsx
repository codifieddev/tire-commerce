// components/sections/features-section.tsx
'use client'
import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { Leaf, Wrench, Truck, TreePine } from 'lucide-react'

const features = [
  {
    icon: Leaf,
    title: 'Eco-Friendly Materials',
    description: 'We craft our tires using responsibly sourced, environmentally friendly materials.',
  },
  {
    icon: Wrench,
    title: 'Effortless Installation',
    description: 'Thoughtfully designed for quick setup, requiring minimal effort and no extra tools.',
  },
  {
    icon: Truck,
    title: 'Free Shipping',
    description: 'Free shipping and returns on all orders over $200. Fast delivery guaranteed.',
  },
  {
    icon: TreePine,
    title: 'Giving Back to Nature',
    description: 'Every purchase contributes to reforestation efforts, helping restore green spaces.',
  },
]

export function FeaturesSection() {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  })

  return (
    <section ref={ref} className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => {
            const Icon = feature.icon
            return (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 30 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{
                  duration: 0.6,
                  delay: index * 0.1,
                  ease: [0.16, 1, 0.3, 1],
                }}
              >
                <motion.div
                  whileHover={{ y: -8 }}
                  transition={{ duration: 0.3 }}
                  className="group relative p-6 rounded-2xl bg-neutral-50 hover:bg-white hover:shadow-xl transition-all duration-300 h-full"
                >
                  {/* Icon Container */}
                  <motion.div
                    whileHover={{ scale: 1.1, rotate: 5 }}
                    transition={{ duration: 0.3 }}
                    className="w-14 h-14 mb-6 rounded-2xl bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors"
                  >
                    <Icon className="w-7 h-7 text-primary" />
                  </motion.div>

                  <h3 className="text-lg font-semibold text-neutral-900 mb-2">
                    {feature.title}
                  </h3>
                  <p className="text-neutral-600 text-sm leading-relaxed">
                    {feature.description}
                  </p>

                  {/* Hover Accent */}
                  <motion.div
                    className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-primary to-primary-dark rounded-b-2xl"
                    initial={{ scaleX: 0 }}
                    whileHover={{ scaleX: 1 }}
                    transition={{ duration: 0.3 }}
                  />
                </motion.div>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}