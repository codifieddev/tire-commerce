// // components/sections/stagger-grid.tsx
// 'use client'
// import { motion } from 'framer-motion'
// import { useInView } from 'react-intersection-observer'

// const items = Array.from({ length: 12 }, (_, i) => i + 1)

// export function StaggerGrid() {
//   const [ref, inView] = useInView({
//     triggerOnce: true,
//     threshold: 0.1,
//   })

//   const container = {
//     hidden: { opacity: 0 },
//     show: {
//       opacity: 1,
//       transition: {
//         staggerChildren: 0.05,
//       },
//     },
//   }

//   const item = {
//     hidden: { opacity: 0, scale: 0.8, rotateX: -90 },
//     show: {
//       opacity: 1,
//       scale: 1,
//       rotateX: 0,
//       transition: {
//         type: 'spring',
//         stiffness: 200,
//         damping: 20,
//       },
//     },
//   }

//   return (
//     <motion.div
//       ref={ref}
//       variants={container}
//       initial="hidden"
//       animate={inView ? 'show' : 'hidden'}
//       className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 p-8"
//     >
//       {items.map((num) => (
//         <motion.div
//           key={num}
//           variants={item}
//           whileHover={{
//             scale: 1.05,
//             rotateZ: 5,
//             transition: { duration: 0.2 },
//           }}
//           className="aspect-square bg-gradient-to-br from-primary to-yellow-600 rounded-3xl shadow-xl flex items-center justify-center text-4xl font-bold text-white"
//           style={{ transformStyle: 'preserve-3d' }}
//         >
//           {num}
//         </motion.div>
//       ))}
//     </motion.div>
//   )
// }


// components/sections/stagger-grid.tsx
'use client'
import { motion, type Variants, type Transition } from 'framer-motion'
import { useInView } from 'react-intersection-observer'

const items = Array.from({ length: 12 }, (_, i) => i + 1)

export function StaggerGrid() {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  })

  const container: Variants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.05,
      },
    },
  }

  const spring: Transition = {
    type: 'spring',
    stiffness: 200,
    damping: 20,
  }

  const item: Variants = {
    hidden: { opacity: 0, scale: 0.8, rotateX: -90 },
    show: {
      opacity: 1,
      scale: 1,
      rotateX: 0,
      transition: spring,
    },
  }

  return (
    <motion.div
      ref={ref}
      variants={container}
      initial="hidden"
      animate={inView ? 'show' : 'hidden'}
      className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 p-8"
      style={{ perspective: 800 }} // helps 3D rotations like rotateX
    >
      {items.map((num) => (
        <motion.div
          key={num}
          variants={item}
          whileHover={{
            scale: 1.05,
            rotateZ: 5,
            transition: { duration: 0.2 },
          }}
          className="aspect-square bg-gradient-to-br from-primary to-yellow-600 rounded-3xl shadow-xl flex items-center justify-center text-4xl font-bold text-white"
          style={{ transformStyle: 'preserve-3d' }}
        >
          {num}
        </motion.div>
      ))}
    </motion.div>
  )
}
