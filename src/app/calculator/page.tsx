'use client'
import { useState } from 'react'

export default function CalculatorPage() {
  const [weight, setWeight] = useState(75)
  const [tireWidth, setTireWidth] = useState(25)
  const [result, setResult] = useState<number | null>(null)

  const calculate = () => {
    // Simple formula
    const basePressure = (weight / tireWidth) * 2.5
    setResult(Math.round(basePressure))
  }

  return (
    <main className="min-h-screen bg-white pt-28 pb-20">
      <div className="max-w-3xl mx-auto px-6 lg:px-8">
        <h1 className="text-5xl font-bold mb-6">Tire Pressure Calculator</h1>
        <p className="text-xl text-neutral-600 mb-12">
          Find your optimal tire pressure based on your weight and tire size
        </p>

        <div className="bg-neutral-50 rounded-2xl p-8 space-y-8">
          <div>
            <label className="block text-lg font-medium mb-4">
              Your Weight (kg)
            </label>
            <input
              type="number"
              value={weight}
              onChange={(e) => setWeight(Number(e.target.value))}
              className="w-full px-4 py-3 rounded-lg border-2 border-neutral-300 focus:border-neutral-900 outline-none"
            />
          </div>

          <div>
            <label className="block text-lg font-medium mb-4">
              Tire Width (mm)
            </label>
            <input
              type="number"
              value={tireWidth}
              onChange={(e) => setTireWidth(Number(e.target.value))}
              className="w-full px-4 py-3 rounded-lg border-2 border-neutral-300 focus:border-neutral-900 outline-none"
            />
          </div>

          <button
            onClick={calculate}
            className="w-full py-4 bg-neutral-900 text-white font-medium rounded-full hover:bg-neutral-700 transition-colors"
          >
            Calculate
          </button>

          {result && (
            <div className="text-center p-8 bg-white rounded-xl">
              <p className="text-neutral-600 mb-2">Recommended Pressure</p>
              <p className="text-6xl font-bold">{result}</p>
              <p className="text-2xl text-neutral-600 mt-2">PSI</p>
            </div>
          )}
        </div>
      </div>
    </main>
  )
}
