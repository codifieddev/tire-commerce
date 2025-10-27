// components/ui/morphing-icon.tsx
'use client'
import { motion } from 'framer-motion'
import { useState } from 'react'

export function MorphingIcon() {
  const [isHovered, setIsHovered] = useState(false)

  const pathVariants = {
    normal: {
      d: 'M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z',
    },
    hovered: {
      d: 'M12 2C6.48 2 2 6.48 2 12C2 17.52 6.48 22 12 22C17.52 22 22 17.52 22 12C22 6.48 17.52 2 12 2Z',
    },
  }

  return (
    <motion.button
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      whileHover={{ scale: 1.1, rotate: 180 }}
      whileTap={{ scale: 0.9 }}
      className="w-16 h-16"
    >
      <svg viewBox="0 0 24 24" className="w-full h-full">
        <motion.path
          variants={pathVariants}
          animate={isHovered ? 'hovered' : 'normal'}
          transition={{ duration: 0.5, ease: 'easeInOut' }}
          fill="currentColor"
          className="text-primary"
        />
      </svg>
    </motion.button>
  )
}