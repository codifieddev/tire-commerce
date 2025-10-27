// components/product/rim-widths-chart.tsx
'use client'
import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'

const rimData = [
  {
    tireSize: '35-622 | 700x35',
    rimWidths: [17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27],
    optimalIndex: 6, // 23mm is optimal (blue dot)
  },
  {
    tireSize: '40-622 | 700x40',
    rimWidths: [17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27],
    optimalIndex: 6, // 23mm is optimal
  },
  {
    tireSize: '50-622 | 700x50',
    rimWidths: [17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30],
    optimalIndex: 8, // 25mm is optimal
  },
  {
    tireSize: '50-584 | 27.5x2.0',
    rimWidths: [17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30],
    optimalIndex: 8, // 25mm is optimal
  },
]

export function RimWidthsChart() {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 })

  return (
    <motion.section
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      className="mt-16 bg-neutral-50 rounded-3xl p-8"
    >
      <h2 className="text-3xl font-bold text-neutral-900 mb-2">
        Optimal Rim Widths
      </h2>
      <p className="text-neutral-600 mb-8">
        Crotchet (C): Rim Inner Width Measurement Millimeters
      </p>

      <div className="bg-white rounded-2xl overflow-hidden">
        <table className="w-full">
          <thead>
            <tr className="bg-neutral-100">
              <th className="px-4 py-4 text-left text-sm font-bold uppercase tracking-wider">
                Tube Type:
                <br />
                <span className="text-xs font-normal">Clincher</span>
                <br />
                <span className="text-xs font-normal">Tire Size</span>
              </th>
              {[...Array(22)].map((_, i) => (
                <th
                  key={i}
                  className="px-2 py-4 text-center text-sm font-bold"
                >
                  {17 + i}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {rimData.map((row, rowIndex) => (
              <motion.tr
                key={rowIndex}
                initial={{ opacity: 0, x: -20 }}
                animate={inView ? { opacity: 1, x: 0 } : {}}
                transition={{ delay: rowIndex * 0.1 }}
                className="border-t border-neutral-200"
              >
                <td className="px-4 py-6 font-semibold text-sm whitespace-nowrap">
                  {row.tireSize}
                </td>
                {[...Array(22)].map((_, i) => {
                  const hasRim = row.rimWidths.includes(17 + i)
                  const isOptimal = i === row.optimalIndex
                  return (
                    <td key={i} className="px-2 py-6 text-center">
                      {hasRim && (
                        <motion.div
                          initial={{ scale: 0 }}
                          animate={inView ? { scale: 1 } : {}}
                          transition={{
                            delay: rowIndex * 0.1 + i * 0.02,
                            type: 'spring',
                            stiffness: 200,
                          }}
                          className={`w-8 h-8 rounded-full mx-auto ${
                            isOptimal
                              ? 'bg-blue-600'
                              : 'bg-primary'
                          }`}
                        />
                      )}
                    </td>
                  )
                })}
              </motion.tr>
            ))}
          </tbody>
        </table>

        <div className="p-6 bg-neutral-50 border-t border-neutral-200 flex items-center gap-8 justify-center">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded-full bg-primary" />
            <span className="text-sm font-medium">Compatible</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded-full bg-blue-600" />
            <span className="text-sm font-medium">Optimal</span>
          </div>
        </div>
      </div>
    </motion.section>
  )
}