// components/ui/text-reveal.tsx
'use client'
import { motion, useScroll, useTransform } from 'framer-motion'
import { useRef } from 'react'

interface TextRevealProps {
  text: string
  className?: string
}

export function TextReveal({ text, className }: TextRevealProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start 0.8', 'start 0.5'],
  })

  const words = text.split(' ')

  return (
    <div ref={containerRef} className={className}>
      {words.map((word, i) => {
        const start = i / words.length
        const end = start + 1 / words.length

        const opacity = useTransform(scrollYProgress, [start, end], [0.3, 1])
        const y = useTransform(scrollYProgress, [start, end], [20, 0])

        return (
          <motion.span
            key={i}
            style={{ opacity, y }}
            className="inline-block mr-2"
          >
            {word}
          </motion.span>
        )
      })}
    </div>
  )
}

// Usage
<TextReveal
  text="Experience the ultimate performance with our premium tire collection designed for champions"
  className="text-5xl font-bold text-neutral-900 max-w-4xl"
/>