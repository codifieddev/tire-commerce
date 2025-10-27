// components/calculator/tire-pressure-calculator.tsx
'use client'
import { motion, AnimatePresence } from 'framer-motion'
import { useState, useEffect } from 'react'
import { Calculator, Info, AlertCircle } from 'lucide-react'

type MassUnit = 'kg' | 'lbs'
type PressureUnit = 'psi' | 'bar'
type RideStyle = 'road' | 'gravel' | 'mtb-xc' | 'mtb-trail' | 'mtb-enduro' | 'mtb-downhill'
type RimType = 'tubes' | 'tubular' | 'hookless' | 'hooks'

interface PressureResult {
  front: number
  rear: number
  warning?: string
}

const rideStyles = [
  { value: 'road', label: 'Road' },
  { value: 'gravel', label: 'Gravel' },
  { value: 'mtb-xc', label: 'MTB Cross Country' },
  { value: 'mtb-trail', label: 'MTB Trail' },
  { value: 'mtb-enduro', label: 'MTB Enduro' },
  { value: 'mtb-downhill', label: 'MTB Downhill' },
]

const rimTypes = [
  { value: 'tubes', label: 'Tubes (Crochet)' },
  { value: 'tubular', label: 'Tubular' },
  { value: 'hooks', label: 'Hooks (Tubeless Crochet)' },
  { value: 'hookless', label: 'Hookless (Tubeless Straight Side)' },
]

const tireOptions = [
  'Eagle F1R',
  'Eagle F1',
  'Eagle F1 SuperSport R',
  'Vector R NSW',
  'Vector 4Seasons',
  'Transit Speed',
  'Transit Tour',
  'Connector Slick',
  'Connector Speed',
  'Peak SL',
  'Escape Inter',
  'Newton MTF Trail',
  'Wrangler MTF Enduro',
]

export function TirePressureCalculator() {
  const [massUnit, setMassUnit] = useState<MassUnit>('kg')
  const [pressureUnit, setPressureUnit] = useState<PressureUnit>('psi')
  const [riderWeight, setRiderWeight] = useState<number>(75)
  const [bikeWeight, setBikeWeight] = useState<number>(8)
  const [rideStyle, setRideStyle] = useState<RideStyle>('road')
  const [frontTireWidth, setFrontTireWidth] = useState<number>(25)
  const [rearTireWidth, setRearTireWidth] = useState<number>(25)
  const [innerRimWidth, setInnerRimWidth] = useState<number>(19)
  const [frontTire, setFrontTire] = useState<string>('Eagle F1R')
  const [rearTire, setRearTire] = useState<string>('Eagle F1R')
  const [rimType, setRimType] = useState<RimType>('hooks')
  const [result, setResult] = useState<PressureResult | null>(null)
  const [showResult, setShowResult] = useState(false)

  // Convert weights based on unit
  const getWeightInKg = (weight: number) => {
    return massUnit === 'lbs' ? weight * 0.453592 : weight
  }

  const convertPressure = (psi: number) => {
    return pressureUnit === 'bar' ? psi * 0.0689476 : psi
  }

  // Calculate tire pressure based on SRAM algorithm principles
  const calculatePressure = () => {
    const totalWeightKg = getWeightInKg(riderWeight) + getWeightInKg(bikeWeight)
    
    // Base pressure calculation (simplified SRAM formula)
    // Front typically carries 40-45% of weight, rear 55-60%
    const frontWeightRatio = 0.42
    const rearWeightRatio = 0.58

    const frontWeightKg = totalWeightKg * frontWeightRatio
    const rearWeightKg = totalWeightKg * rearWeightRatio

    // Base PSI calculation: Weight / Tire Volume factor
    // Wider tires = lower pressure needed
    const tireFactor = (tireWidth: number) => {
      return Math.max(20, 100 - tireWidth * 1.2)
    }

    let frontBasePsi = (frontWeightKg / frontTireWidth) * tireFactor(frontTireWidth)
    let rearBasePsi = (rearWeightKg / rearTireWidth) * tireFactor(rearTireWidth)

    // Adjust based on ride style
    const styleMultipliers: Record<RideStyle, number> = {
      road: 1.1,
      gravel: 0.85,
      'mtb-xc': 0.7,
      'mtb-trail': 0.6,
      'mtb-enduro': 0.5,
      'mtb-downhill': 0.45,
    }

    const multiplier = styleMultipliers[rideStyle]
    frontBasePsi *= multiplier
    rearBasePsi *= multiplier

    // Adjust for rim type
    const rimAdjustments: Record<RimType, number> = {
      tubes: 1.0,
      tubular: 0.95,
      hooks: 0.9,
      hookless: 0.85,
    }

    frontBasePsi *= rimAdjustments[rimType]
    rearBasePsi *= rimAdjustments[rimType]

    // Rim width compatibility check
    const isCompatible = (tireWidth: number) => {
      const minRimWidth = tireWidth * 0.5
      const maxRimWidth = tireWidth * 0.8
      return innerRimWidth >= minRimWidth && innerRimWidth <= maxRimWidth
    }

    let warning = ''
    if (!isCompatible(frontTireWidth) || !isCompatible(rearTireWidth)) {
      warning = 'Selected tire width may be incompatible with rim width. Please verify compatibility.'
    }

    // Max pressure limits
    const maxPressure = rimType === 'hookless' ? 72 : 120
    if (frontBasePsi > maxPressure || rearBasePsi > maxPressure) {
      warning = 'Suggested tire pressure exceeds rim pressure rating. Please select a larger tire size.'
      frontBasePsi = Math.min(frontBasePsi, maxPressure)
      rearBasePsi = Math.min(rearBasePsi, maxPressure)
    }

    setResult({
      front: Math.round(convertPressure(frontBasePsi) * 10) / 10,
      rear: Math.round(convertPressure(rearBasePsi) * 10) / 10,
      warning,
    })
    setShowResult(true)
  }

  useEffect(() => {
    if (showResult) {
      calculatePressure()
    }
  }, [pressureUnit])

  return (
    <motion.section
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="mt-16 bg-gradient-to-br from-neutral-900 to-neutral-800 rounded-3xl p-8 text-white"
    >
      <div className="flex items-center gap-4 mb-8">
        <div className="w-12 h-12 bg-primary rounded-xl flex items-center justify-center">
          <Calculator className="w-6 h-6 text-neutral-900" />
        </div>
        <div>
          <h2 className="text-3xl font-bold">Tire Pressure Calculator</h2>
          <p className="text-neutral-400 text-sm">
            Powered by SRAM - Find your optimal tire pressure
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Left Column - Inputs */}
        <div className="space-y-6">
          {/* Unit Toggles */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-semibold mb-2 uppercase tracking-wider">
                Mass Unit
              </label>
              <div className="flex rounded-xl overflow-hidden border-2 border-neutral-700">
                {(['kg', 'lbs'] as MassUnit[]).map((unit) => (
                  <motion.button
                    key={unit}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setMassUnit(unit)}
                    className={`flex-1 py-2 font-semibold uppercase transition-colors ${
                      massUnit === unit
                        ? 'bg-primary text-neutral-900'
                        : 'bg-neutral-800 hover:bg-neutral-700'
                    }`}
                  >
                    {unit}
                  </motion.button>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-sm font-semibold mb-2 uppercase tracking-wider">
                Pressure Unit
              </label>
              <div className="flex rounded-xl overflow-hidden border-2 border-neutral-700">
                {(['psi', 'bar'] as PressureUnit[]).map((unit) => (
                  <motion.button
                    key={unit}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setPressureUnit(unit)}
                    className={`flex-1 py-2 font-semibold uppercase transition-colors ${
                      pressureUnit === unit
                        ? 'bg-primary text-neutral-900'
                        : 'bg-neutral-800 hover:bg-neutral-700'
                    }`}
                  >
                    {unit}
                  </motion.button>
                ))}
              </div>
            </div>
          </div>

          {/* Rider Weight */}
          <InputField
            label="Rider Weight"
            value={riderWeight}
            onChange={setRiderWeight}
            unit={massUnit}
            min={40}
            max={150}
          />

          {/* Bike Weight */}
          <InputField
            label="Bike Weight"
            value={bikeWeight}
            onChange={setBikeWeight}
            unit={massUnit}
            min={5}
            max={20}
          />

          {/* Ride Style */}
          <div>
            <label className="block text-sm font-semibold mb-2 uppercase tracking-wider">
              Ride Style
            </label>
            <select
              value={rideStyle}
              onChange={(e) => setRideStyle(e.target.value as RideStyle)}
              className="w-full px-4 py-3 bg-neutral-800 border-2 border-neutral-700 rounded-xl text-white focus:border-primary focus:outline-none transition-colors"
            >
              {rideStyles.map((style) => (
                <option key={style.value} value={style.value}>
                  {style.label}
                </option>
              ))}
            </select>
          </div>

          {/* Tire Widths */}
          <div className="grid grid-cols-2 gap-4">
            <InputField
              label="Front Tire Width"
              value={frontTireWidth}
              onChange={setFrontTireWidth}
              unit="mm"
              min={20}
              max={65}
            />
            <InputField
              label="Rear Tire Width"
              value={rearTireWidth}
              onChange={setRearTireWidth}
              unit="mm"
              min={20}
              max={65}
            />
          </div>

          {/* Inner Rim Width */}
          <InputField
            label="Inner Rim Width"
            value={innerRimWidth}
            onChange={setInnerRimWidth}
            unit="mm"
            min={15}
            max={35}
          />
        </div>

        {/* Right Column - More Inputs */}
        <div className="space-y-6">
          {/* Tire Selection */}
          <div>
            <label className="block text-sm font-semibold mb-2 uppercase tracking-wider">
              Front Goodyear Tire
            </label>
            <select
              value={frontTire}
              onChange={(e) => setFrontTire(e.target.value)}
              className="w-full px-4 py-3 bg-neutral-800 border-2 border-neutral-700 rounded-xl text-white focus:border-primary focus:outline-none transition-colors"
            >
              {tireOptions.map((tire) => (
                <option key={tire} value={tire}>
                  {tire}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-semibold mb-2 uppercase tracking-wider">
              Rear Goodyear Tire
            </label>
            <select
              value={rearTire}
              onChange={(e) => setRearTire(e.target.value)}
              className="w-full px-4 py-3 bg-neutral-800 border-2 border-neutral-700 rounded-xl text-white focus:border-primary focus:outline-none transition-colors"
            >
              {tireOptions.map((tire) => (
                <option key={tire} value={tire}>
                  {tire}
                </option>
              ))}
            </select>
          </div>

          {/* Rim Type */}
          <div>
            <label className="block text-sm font-semibold mb-2 uppercase tracking-wider">
              Rim Type
            </label>
            <select
              value={rimType}
              onChange={(e) => setRimType(e.target.value as RimType)}
              className="w-full px-4 py-3 bg-neutral-800 border-2 border-neutral-700 rounded-xl text-white focus:border-primary focus:outline-none transition-colors"
            >
              {rimTypes.map((type) => (
                <option key={type.value} value={type.value}>
                  {type.label}
                </option>
              ))}
            </select>
          </div>

          {/* Calculate Button */}
          <motion.button
            whileHover={{ scale: 1.02, y: -2 }}
            whileTap={{ scale: 0.98 }}
            onClick={calculatePressure}
            className="w-full py-4 bg-primary text-neutral-900 font-bold text-lg rounded-xl shadow-lg hover:bg-primary-dark transition-colors"
          >
            Calculate Pressure
          </motion.button>

          {/* Info Box */}
          <div className="p-4 bg-blue-900/30 border-2 border-blue-700 rounded-xl flex gap-3">
            <Info className="w-5 h-5 text-blue-400 flex-shrink-0 mt-0.5" />
            <p className="text-sm text-blue-100">
              This calculator provides a recommended starting point. Adjust based
              on personal preference, terrain, and conditions.
            </p>
          </div>
        </div>
      </div>

      {/* Results */}
      <AnimatePresence>
        {showResult && result && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="mt-8 overflow-hidden"
          >
            {result.warning && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="mb-6 p-4 bg-orange-900/30 border-2 border-orange-700 rounded-xl flex gap-3"
              >
                <AlertCircle className="w-5 h-5 text-orange-400 flex-shrink-0 mt-0.5" />
                <p className="text-sm text-orange-100">{result.warning}</p>
              </motion.div>
            )}

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.1 }}
                className="p-6 bg-gradient-to-br from-primary/20 to-primary/5 border-2 border-primary/30 rounded-2xl"
              >
                <h3 className="text-sm font-semibold uppercase tracking-wider text-primary mb-2">
                  Front Tire
                </h3>
                <p className="text-5xl font-bold mb-1">
                  {result.front}
                  <span className="text-2xl ml-2 text-neutral-400">
                    {pressureUnit}
                  </span>
                </p>
                <p className="text-sm text-neutral-400">Recommended Pressure</p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.2 }}
                className="p-6 bg-gradient-to-br from-primary/20 to-primary/5 border-2 border-primary/30 rounded-2xl"
              >
                <h3 className="text-sm font-semibold uppercase tracking-wider text-primary mb-2">
                  Rear Tire
                </h3>
                <p className="text-5xl font-bold mb-1">
                  {result.rear}
                  <span className="text-2xl ml-2 text-neutral-400">
                    {pressureUnit}
                  </span>
                </p>
                <p className="text-sm text-neutral-400">Recommended Pressure</p>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.section>
  )
}

interface InputFieldProps {
  label: string
  value: number
  onChange: (value: number) => void
  unit: string
  min: number
  max: number
}

function InputField({ label, value, onChange, unit, min, max }: InputFieldProps) {
  return (
    <div>
      <label className="block text-sm font-semibold mb-2 uppercase tracking-wider">
        {label}
      </label>
      <div className="flex gap-2">
        <input
          type="number"
          value={value}
          onChange={(e) => onChange(parseFloat(e.target.value) || 0)}
          min={min}
          max={max}
          className="flex-1 px-4 py-3 bg-neutral-800 border-2 border-neutral-700 rounded-xl text-white focus:border-primary focus:outline-none transition-colors"
        />
        <div className="flex items-center px-4 bg-neutral-800 border-2 border-neutral-700 rounded-xl font-semibold">
          {unit}
        </div>
      </div>
      <input
        type="range"
        value={value}
        onChange={(e) => onChange(parseFloat(e.target.value))}
        min={min}
        max={max}
        className="w-full mt-2 accent-primary"
      />
    </div>
  )
}