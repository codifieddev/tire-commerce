// components/cart/progress-steps.tsx
'use client'
import { motion } from 'framer-motion'
import { Check } from 'lucide-react'

interface ProgressStepsProps {
  currentStep: number
}

const steps = [
  { number: 1, label: 'Shopping Cart' },
  { number: 2, label: 'Checkout Details' },
  { number: 3, label: 'Payment' },
  { number: 4, label: 'Confirmation' },
]

export function ProgressSteps({ currentStep }: ProgressStepsProps) {
  return (
    <div className="flex items-center justify-between max-w-3xl mx-auto mb-12">
      {steps.map((step, index) => {
        const isCompleted = currentStep > step.number
        const isCurrent = currentStep === step.number
        const isUpcoming = currentStep < step.number

        return (
          <div key={step.number} className="flex items-center flex-1">
            <div className="flex flex-col items-center flex-1">
              <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: index * 0.1 }}
                className="relative"
              >
                <motion.div
                  animate={{
                    backgroundColor: isCompleted || isCurrent ? '#FFD100' : '#E5E5E5',
                    scale: isCurrent ? 1.1 : 1,
                  }}
                  className={`w-12 h-12 rounded-full flex items-center justify-center font-bold ${
                    isCompleted || isCurrent ? 'text-neutral-900' : 'text-neutral-500'
                  }`}
                >
                  {isCompleted ? (
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ type: 'spring', stiffness: 200 }}
                    >
                      <Check className="w-6 h-6" />
                    </motion.div>
                  ) : (
                    step.number
                  )}
                </motion.div>

                {isCurrent && (
                  <motion.div
                    className="absolute -inset-1 border-2 border-primary rounded-full"
                    animate={{ scale: [1, 1.1, 1] }}
                    transition={{ duration: 2, repeat: Infinity }}
                  />
                )}
              </motion.div>

              <motion.p
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 + 0.2 }}
                className={`mt-2 text-sm font-medium text-center ${
                  isCompleted || isCurrent ? 'text-neutral-900' : 'text-neutral-500'
                }`}
              >
                {step.label}
              </motion.p>
            </div>

            {index < steps.length - 1 && (
              <div className="flex-1 h-0.5 bg-neutral-200 mx-4 relative">
                <motion.div
                  initial={{ scaleX: 0 }}
                  animate={{ scaleX: isCompleted ? 1 : 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="h-full bg-primary origin-left"
                />
              </div>
            )}
          </div>
        )
      })}
    </div>
  )
}