// app/b2b/register/page.tsx
'use client'
import { motion, AnimatePresence } from 'framer-motion'
import { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { 
  Building2, Mail, Phone, MapPin, User, Lock, 
  CheckCircle, ArrowRight, FileText, Upload 
} from 'lucide-react'

type OnboardingStep = 1 | 2 | 3 | 4

interface BusinessInfo {
  businessName: string
  businessType: 'dealership' | 'wholesaler' | 'distributor' | 'retailer'
  taxId: string
  email: string
  phone: string
  address: string
  city: string
  state: string
  zipCode: string
  country: string
}

interface ContactInfo {
  firstName: string
  lastName: string
  position: string
  email: string
  phone: string
}

interface AccountInfo {
  username: string
  password: string
  confirmPassword: string
}

export default function B2BRegisterPage() {
  const [currentStep, setCurrentStep] = useState<OnboardingStep>(1)
  const [businessInfo, setBusinessInfo] = useState<BusinessInfo>({
    businessName: '',
    businessType: 'dealership',
    taxId: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    state: '',
    zipCode: '',
    country: 'USA',
  })
  const [contactInfo, setContactInfo] = useState<ContactInfo>({
    firstName: '',
    lastName: '',
    position: '',
    email: '',
    phone: '',
  })
  const [accountInfo, setAccountInfo] = useState<AccountInfo>({
    username: '',
    password: '',
    confirmPassword: '',
  })
  const [documents, setDocuments] = useState<File[]>([])
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isComplete, setIsComplete] = useState(false)

  const handleSubmit = async () => {
    setIsSubmitting(true)
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 2000))
    setIsSubmitting(false)
    setIsComplete(true)
  }

  const steps = [
    { number: 1, title: 'Business Information' },
    { number: 2, title: 'Contact Details' },
    { number: 3, title: 'Account Setup' },
    { number: 4, title: 'Documents & Verification' },
  ]

  return (
    <main className="min-h-screen bg-gradient-to-br from-neutral-50 to-neutral-100">
      {/* Header */}
      <div className="bg-white border-b border-neutral-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <Link href="/">
            <motion.div whileHover={{ scale: 1.05 }}>
              <Image
                src="/images/Goodyear-Bicyle-Logo-Black-320x-20px.png"
                alt="Goodyear Bicycle Tires"
                width={200}
                height={43}
              />
            </motion.div>
          </Link>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Progress Steps */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-12"
        >
          <h1 className="text-4xl font-bold text-neutral-900 mb-2">
            B2B Partner Registration
          </h1>
          <p className="text-neutral-600 mb-8">
            Join our network of authorized dealers and wholesalers
          </p>

          <div className="flex items-center justify-between">
            {steps.map((step, index) => (
              <div key={step.number} className="flex items-center flex-1">
                <div className="flex flex-col items-center flex-1">
                  <motion.div
                    animate={{
                      backgroundColor:
                        currentStep >= step.number ? '#FFD100' : '#E5E5E5',
                      scale: currentStep === step.number ? 1.1 : 1,
                    }}
                    className={`w-12 h-12 rounded-full flex items-center justify-center font-bold ${
                      currentStep >= step.number
                        ? 'text-neutral-900'
                        : 'text-neutral-500'
                    }`}
                  >
                    {currentStep > step.number ? (
                      <CheckCircle className="w-6 h-6" />
                    ) : (
                      step.number
                    )}
                  </motion.div>
                  <p
                    className={`mt-2 text-sm font-medium text-center ${
                      currentStep >= step.number
                        ? 'text-neutral-900'
                        : 'text-neutral-500'
                    }`}
                  >
                    {step.title}
                  </p>
                </div>

                {index < steps.length - 1 && (
                  <div className="flex-1 h-0.5 bg-neutral-200 mx-4 relative">
                    <motion.div
                      initial={{ scaleX: 0 }}
                      animate={{
                        scaleX: currentStep > step.number ? 1 : 0,
                      }}
                      className="h-full bg-primary origin-left"
                    />
                  </div>
                )}
              </div>
            ))}
          </div>
        </motion.div>

        {/* Form Container */}
        <AnimatePresence mode="wait">
          {!isComplete ? (
            <motion.div
              key={currentStep}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="bg-white rounded-3xl shadow-xl p-8"
            >
              {/* Step 1: Business Information */}
              {currentStep === 1 && (
                <BusinessInfoForm
                  data={businessInfo}
                  onChange={setBusinessInfo}
                  onNext={() => setCurrentStep(2)}
                />
              )}

       
              {/* {currentStep === 2 && (
                <ContactInfoForm
                  data={contactInfo}
                  onChange={setContactInfo}
                  onNext={() => setCurrentStep(3)}
                  onBack={() => setCurrentStep(1)}
                />
              )}

             
              {currentStep === 3 && (
                <AccountSetupForm
                  data={accountInfo}
                  onChange={setAccountInfo}
                  onNext={() => setCurrentStep(4)}
                  onBack={() => setCurrentStep(2)}
                />
              )}

        
              {currentStep === 4 && (
                <DocumentUploadForm
                  documents={documents}
                  onChange={setDocuments}
                  onSubmit={handleSubmit}
                  onBack={() => setCurrentStep(3)}
                  isSubmitting={isSubmitting}
                />
              )} */}
            </motion.div>
          ) : (
            <SuccessMessage />
          )}
        </AnimatePresence>

        {/* Footer Link */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="text-center mt-8 text-neutral-600"
        >
          Already have an account?{' '}
          <Link
            href="/b2b/login"
            className="text-primary font-semibold hover:underline"
          >
            Sign in here
          </Link>
        </motion.p>
      </div>
    </main>
  )
}

// Sub-components

interface BusinessInfoFormProps {
  data: BusinessInfo
  onChange: (data: BusinessInfo) => void
  onNext: () => void
}

function BusinessInfoForm({ data, onChange, onNext }: BusinessInfoFormProps) {
  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3 mb-6">
        <div className="w-10 h-10 bg-primary/10 rounded-xl flex items-center justify-center">
          <Building2 className="w-6 h-6 text-primary" />
        </div>
        <h2 className="text-2xl font-bold">Business Information</h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="md:col-span-2">
          <label className="block text-sm font-semibold mb-2">
            Business Name *
          </label>
          <input
            type="text"
            value={data.businessName}
            onChange={(e) => onChange({ ...data, businessName: e.target.value })}
            className="w-full px-4 py-3 border-2 border-neutral-200 rounded-xl focus:border-primary focus:outline-none transition-colors"
            placeholder="Your Business Name"
          />
        </div>

        <div>
          <label className="block text-sm font-semibold mb-2">
            Business Type *
          </label>
          <select
            value={data.businessType}
            onChange={(e) =>
              onChange({
                ...data,
                businessType: e.target.value as BusinessInfo['businessType'],
              })
            }
            className="w-full px-4 py-3 border-2 border-neutral-200 rounded-xl focus:border-primary focus:outline-none transition-colors"
          >
            <option value="dealership">Dealership</option>
            <option value="wholesaler">Wholesaler</option>
            <option value="distributor">Distributor</option>
            <option value="retailer">Retailer</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-semibold mb-2">
            Tax ID / EIN *
          </label>
          <input
            type="text"
            value={data.taxId}
            onChange={(e) => onChange({ ...data, taxId: e.target.value })}
            className="w-full px-4 py-3 border-2 border-neutral-200 rounded-xl focus:border-primary focus:outline-none transition-colors"
            placeholder="XX-XXXXXXX"
          />
        </div>

        <div>
          <label className="block text-sm font-semibold mb-2">
            Business Email *
          </label>
          <input
            type="email"
            value={data.email}
            onChange={(e) => onChange({ ...data, email: e.target.value })}
            className="w-full px-4 py-3 border-2 border-neutral-200 rounded-xl focus:border-primary focus:outline-none transition-colors"
            placeholder="business@example.com"
          />
        </div>

        <div>
          <label className="block text-sm font-semibold mb-2">
            Business Phone *
          </label>
          <input
            type="tel"
            value={data.phone}
            onChange={(e) => onChange({ ...data, phone: e.target.value })}
            className="w-full px-4 py-3 border-2 border-neutral-200 rounded-xl focus:border-primary focus:outline-none transition-colors"
            placeholder="+1 (555) 000-0000"
          />
        </div>

        <div className="md:col-span-2">
          <label className="block text-sm font-semibold mb-2">
            Business Address *
          </label>
          <input
            type="text"
            value={data.address}
            onChange={(e) => onChange({ ...data, address: e.target.value })}
            className="w-full px-4 py-3 border-2 border-neutral-200 rounded-xl focus:border-primary focus:outline-none transition-colors"
            placeholder="Street address"
          />
        </div>

        <div>
          <label className="block text-sm font-semibold mb-2">City *</label>
          <input
            type="text"
            value={data.city}
            onChange={(e) => onChange({ ...data, city: e.target.value })}
            className="w-full px-4 py-3 border-2 border-neutral-200 rounded-xl focus:border-primary focus:outline-none transition-colors"
          />
        </div>

        <div>
          <label className="block text-sm font-semibold mb-2">State *</label>
          <input
            type="text"
            value={data.state}
            onChange={(e) => onChange({ ...data, state: e.target.value })}
            className="w-full px-4 py-3 border-2 border-neutral-200 rounded-xl focus:border-primary focus:outline-none transition-colors"
          />
        </div>

        <div>
          <label className="block text-sm font-semibold mb-2">ZIP Code *</label>
          <input
            type="text"
            value={data.zipCode}
            onChange={(e) => onChange({ ...data, zipCode: e.target.value })}
            className="w-full px-4 py-3 border-2 border-neutral-200 rounded-xl focus:border-primary focus:outline-none transition-colors"
          />
        </div>

        <div>
          <label className="block text-sm font-semibold mb-2">Country *</label>
          <select
            value={data.country}
            onChange={(e) => onChange({ ...data, country: e.target.value })}
            className="w-full px-4 py-3 border-2 border-neutral-200 rounded-xl focus:border-primary focus:outline-none transition-colors"
          >
            <option value="USA">United States</option>
            <option value="CAN">Canada</option>
            <option value="MEX">Mexico</option>
            <option value="UK">United Kingdom</option>
            {/* Add more countries */}
          </select>
        </div>
      </div>

      <motion.button
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        onClick={onNext}
        className="w-full py-4 bg-primary text-neutral-900 font-bold text-lg rounded-xl flex items-center justify-center gap-2"
      >
        Continue
        <ArrowRight className="w-5 h-5" />
      </motion.button>
    </div>
  )
}

// Similar patterns for ContactInfoForm, AccountSetupForm, DocumentUploadForm...
// (Truncated for brevity - follow same structure)

function SuccessMessage() {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      className="bg-white rounded-3xl shadow-xl p-12 text-center"
    >
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ delay: 0.2, type: 'spring' }}
        className="w-24 h-24 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6"
      >
        <CheckCircle className="w-12 h-12 text-green-600" />
      </motion.div>

      <h2 className="text-3xl font-bold text-neutral-900 mb-4">
        Registration Submitted!
      </h2>
      <p className="text-neutral-600 mb-8 max-w-md mx-auto">
        Thank you for applying to become a Goodyear B2B partner. Our team will
        review your application and contact you within 2-3 business days.
      </p>

      <Link href="/">
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className="px-8 py-3 bg-primary text-neutral-900 font-semibold rounded-xl"
        >
          Return to Home
        </motion.button>
      </Link>
    </motion.div>
  )
}