// components/sections/rotating-showcase.tsx
'use client'
import { motion, useScroll, useTransform } from 'framer-motion'
import { useRef } from 'react'
import Image from 'next/image'

export function RotatingShowcase() {
  const containerRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start end', 'end start'],
  })

  // 3D rotation based on scroll
  const rotateY = useTransform(scrollYProgress, [0, 1], [0, 360])
  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [0.8, 1.2, 0.8])

  return (
    <section
      ref={containerRef}
      className="relative min-h-screen flex items-center justify-center bg-neutral-900 overflow-hidden"
    >
      <div className="relative w-full max-w-2xl aspect-square perspective-[2000px]">
        <motion.div
          style={{
            rotateY,
            scale,
            transformStyle: 'preserve-3d',
          }}
          className="relative w-full h-full"
        >
          {/* Front Face */}
          <motion.div
            style={{
              transform: 'translateZ(200px)',
              backfaceVisibility: 'hidden',
            }}
            className="absolute inset-0 bg-gradient-to-br from-primary to-yellow-600 rounded-3xl shadow-2xl flex items-center justify-center"
          >
            <div className="relative w-3/4 h-3/4">
              <Image
                src="/images/peak-sl.jpg"
                alt="Product Front"
                fill
                className="object-contain drop-shadow-2xl"
              />
            </div>
          </motion.div>

          {/* Back Face */}
          <motion.div
            style={{
              transform: 'rotateY(180deg) translateZ(200px)',
              backfaceVisibility: 'hidden',
            }}
            className="absolute inset-0 bg-gradient-to-br from-blue-600 to-purple-600 rounded-3xl shadow-2xl flex items-center justify-center"
          >
            <div className="relative w-3/4 h-3/4">
              <Image
                src="/images/peak-sl.jpg"
                alt="Product Back"
                fill
                className="object-contain drop-shadow-2xl"
              />
            </div>
          </motion.div>

          {/* Side Faces */}
          <motion.div
            style={{
              transform: 'rotateY(90deg) translateZ(200px)',
              backfaceVisibility: 'hidden',
            }}
            className="absolute inset-0 bg-neutral-800 rounded-3xl shadow-2xl"
          />
          <motion.div
            style={{
              transform: 'rotateY(-90deg) translateZ(200px)',
              backfaceVisibility: 'hidden',
            }}
            className="absolute inset-0 bg-neutral-800 rounded-3xl shadow-2xl"
          />
        </motion.div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        style={{ opacity: useTransform(scrollYProgress, [0, 0.2], [1, 0]) }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 text-white text-center"
      >
        <p className="text-sm mb-2">Scroll to rotate</p>
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 1.5, repeat: Infinity }}
          className="w-6 h-10 border-2 border-white rounded-full mx-auto flex items-start justify-center p-2"
        >
          <div className="w-1 h-2 bg-white rounded-full" />
        </motion.div>
      </motion.div>
    </section>
  )
}