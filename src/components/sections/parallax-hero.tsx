'use client'
import { motion, useScroll, useTransform, useSpring } from 'framer-motion'
import { useRef } from 'react'
import Image from 'next/image'

export function ParallaxHero() {
  const containerRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end start'],
  })

  // Create smooth parallax values
  const y1 = useTransform(scrollYProgress, [0, 1], ['0%', '50%'])
  const y2 = useTransform(scrollYProgress, [0, 1], ['0%', '30%'])
  const y3 = useTransform(scrollYProgress, [0, 1], ['0%', '70%'])
  const opacity = useTransform(scrollYProgress, [0, 0.5, 1], [1, 0.5, 0])
  const scale = useTransform(scrollYProgress, [0, 1], [1, 1.2])

  // Add spring physics for smoother motion
  const springY1 = useSpring(y1, { stiffness: 100, damping: 30 })
  const springY2 = useSpring(y2, { stiffness: 100, damping: 30 })
  const springY3 = useSpring(y3, { stiffness: 100, damping: 30 })

  return (
    <div ref={containerRef} className="relative h-screen overflow-hidden">
      {/* Background Layer - Slowest */}
      <motion.div
        style={{ y: springY3, scale }}
        className="absolute inset-0 -z-10"
      >
        <Image
          src="/images/peak-sl.jpg"
          alt="Background"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/40 to-black/60" />
      </motion.div>

      {/* Mid Layer - Medium Speed */}
      <motion.div
        style={{ y: springY2 }}
        className="absolute inset-0 flex items-center justify-center -z-5"
      >
        <div className="relative w-full max-w-4xl h-96">
          <Image
            src="/images/peak-sl.jpg"
            alt="Shadow"
            fill
            className="object-contain opacity-30"
          />
        </div>
      </motion.div>

      {/* Content Layer - Fastest */}
      <motion.div
        style={{ y: springY1, opacity }}
        className="relative h-full flex items-center justify-center z-10"
      >
        <div className="text-center space-y-6 px-4">
          <motion.h1
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-6xl md:text-8xl font-bold text-white"
          >
            Built for Speed
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-2xl text-white/90 max-w-2xl mx-auto"
          >
            Experience ultimate performance with our premium tire collection
          </motion.p>
          <motion.button
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.6 }}
            whileHover={{ scale: 1.05, y: -5 }}
            whileTap={{ scale: 0.95 }}
            className="px-10 py-5 bg-primary text-neutral-900 font-bold text-lg rounded-full shadow-2xl"
          >
            Explore Collection
          </motion.button>
        </div>
      </motion.div>

      {/* Floating Elements with Different Parallax Speeds */}
      <motion.div
        style={{ y: useTransform(scrollYProgress, [0, 1], ['0%', '150%']) }}
        className="absolute top-20 left-10 w-32 h-32 bg-primary/10 rounded-full blur-3xl"
      />
      <motion.div
        style={{ y: useTransform(scrollYProgress, [0, 1], ['0%', '90%']) }}
        className="absolute bottom-20 right-10 w-48 h-48 bg-blue-500/10 rounded-full blur-3xl"
      />
    </div>
  )
}