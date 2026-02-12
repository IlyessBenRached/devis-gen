'use client'

import { useState } from 'react'
import DevisForm, { type DevisFormData } from '@/components/DevisForm'
import DevisPreview from '@/components/DevisPreview'

export default function HomePage() {
  const [step, setStep] = useState<'form' | 'preview'>('form')
  const [devisData, setDevisData] = useState<DevisFormData | null>(null)

  const handlePreview = (data: DevisFormData) => {
    setDevisData(data)
    setStep('preview')
  }

  const handleReset = () => {
    setDevisData(null)
    setStep('form')
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-emerald-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <header className="mb-12 text-center">
          <div className="flex justify-center mb-4">
            <img 
              src="/logo/logo_carthage_crown_page-0001.jpg" 
              alt="Carthage Crown Logo" 
              className="h-24 object-contain"
            />
          </div>
          <h1 className="text-4xl font-bold text-gray-800">
            Générateur de Devis
          </h1>
          <p className="text-gray-600 mt-2">
            Créez un devis en quelques clics
          </p>
        </header>

        <div className="bg-white rounded-lg shadow-lg p-6">
          {step === 'form' ? (
            <DevisForm onPreview={handlePreview} />
          ) : (
            devisData && (
              <DevisPreview 
                devis={devisData} 
                onBack={() => setStep('form')} 
                onReset={handleReset} 
              />
            )
          )}
        </div>
      </div>
    </div>
  )
}