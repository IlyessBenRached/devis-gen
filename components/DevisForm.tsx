/* eslint-disable @typescript-eslint/no-explicit-any */
'use client'

import { useState } from 'react'

// Types
interface LineItem {
  id: string
  contenance: string
  conditionnement: string
  quantity: number
  unitPrice: number
  totalPrice: number
}

export interface DevisFormData {
  clientName: string
  clientEmail: string
  clientPhone: string
  items: LineItem[]
  currency: 'EUR' | 'USD'
  subtotal: number
  total: number
  createdAt: Date
}

interface DevisFormProps {
  onPreview: (data: DevisFormData) => void
}

// Product configurations
const CONTENANCES = [
  { id: 'ml250', label: '250 ml', price: 1.517 },
  { id: 'ml500', label: '500 ml', price: 2.508 },
  { id: 'ml750', label: '750 ml', price: 3.429 },
  { id: 'ml1000', label: '1L', price: 4.351 },
  { id: 'l3', label: '3L', price: 10.500 },
  { id: 'l5', label: '5L', price: 18.726 },
  { id: 'l10', label: '10L', price: 35.000 },
  { id: 'l15', label: '15L', price: 52.000 },
  { id: 'l20', label: '20L', price: 68.000 },
]

const CONDITIONNEMENTS = [
  { id: 'verre', label: 'Bouteille en verre' },
  { id: 'metal', label: 'Bidon Métallique' },
]

export default function DevisForm({ onPreview }: DevisFormProps) {
  const [formData, setFormData] = useState({
    clientName: '',
    clientEmail: '',
    clientPhone: '',
    items: [] as LineItem[],
    currency: 'EUR' as 'EUR' | 'USD',
  })

  // Add item to quote
  const addItem = () => {
    const newItem: LineItem = {
      id: `item-${Date.now()}`,
      contenance: 'ml500',
      conditionnement: 'verre',
      quantity: 1,
      unitPrice: 2.508,
      totalPrice: 2.508,
    }
    setFormData(prev => ({
      ...prev,
      items: [...prev.items, newItem],
    }))
  }

  // Remove item
  const removeItem = (id: string) => {
    setFormData(prev => ({
      ...prev,
      items: prev.items.filter(item => item.id !== id),
    }))
  }

  // Update item
  const updateItem = (id: string, field: keyof LineItem, value: any) => {
    setFormData(prev => ({
      ...prev,
      items: prev.items.map(item => {
        if (item.id === id) {
          const updated = { ...item, [field]: value }
          
          // Update price if contenance changes
          if (field === 'contenance') {
            const product = CONTENANCES.find(c => c.id === value)
            if (product) {
              updated.unitPrice = product.price
            }
          }
          
          // Recalculate total
          updated.totalPrice = updated.unitPrice * updated.quantity
          
          return updated
        }
        return item
      }),
    }))
  }

  // Calculate totals
  const subtotal = formData.items.reduce((sum, item) => sum + item.totalPrice, 0)
  const total = subtotal

  // Handle preview
  const handlePreview = () => {
    const devisData: DevisFormData = {
      ...formData,
      subtotal,
      total,
      createdAt: new Date(),
    }
    onPreview(devisData)
  }

  return (
    <div className="space-y-8">
      {/* Client Information Form */}
      <div>
        <h2 className="text-xl font-semibold text-gray-800 mb-4 pb-2 border-b-2 border-green-600">
          Informations Client
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Nom du client *
            </label>
            <input
              type="text"
              value={formData.clientName}
              onChange={(e) => setFormData(prev => ({ ...prev, clientName: e.target.value }))}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500 focus:border-transparent"
              placeholder="Nom du client"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Email
            </label>
            <input
              type="email"
              value={formData.clientEmail}
              onChange={(e) => setFormData(prev => ({ ...prev, clientEmail: e.target.value }))}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500 focus:border-transparent"
              placeholder="email@exemple.com"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Téléphone
            </label>
            <input
              type="tel"
              value={formData.clientPhone}
              onChange={(e) => setFormData(prev => ({ ...prev, clientPhone: e.target.value }))}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500 focus:border-transparent"
              placeholder="+216 12 345 678"
            />
          </div>
        </div>
      </div>

      {/* Currency Selection */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Devise
        </label>
        <div className="flex gap-4">
          <label className="flex items-center">
            <input
              type="radio"
              value="EUR"
              checked={formData.currency === 'EUR'}
              onChange={(e) => setFormData(prev => ({ ...prev, currency: e.target.value as 'EUR' | 'USD' }))}
              className="mr-2"
            />
            <span className="text-sm">Euro (€)</span>
          </label>
          <label className="flex items-center">
            <input
              type="radio"
              value="USD"
              checked={formData.currency === 'USD'}
              onChange={(e) => setFormData(prev => ({ ...prev, currency: e.target.value as 'EUR' | 'USD' }))}
              className="mr-2"
            />
            <span className="text-sm">Dollar ($)</span>
          </label>
        </div>
      </div>

      {/* Items Section */}
      <div>
        <div className="flex justify-between items-center mb-4 pb-2 border-b-2 border-green-600">
          <h2 className="text-xl font-semibold text-gray-800">
            Articles
          </h2>
          <button
            onClick={addItem}
            className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-md font-medium transition-colors"
          >
            + Ajouter un article
          </button>
        </div>

        {formData.items.length === 0 ? (
          <div className="text-center py-8 text-gray-500">
            Aucun article ajouté. Cliquez sur &quot;Ajouter un article&quot; pour commencer.
          </div>
        ) : (
          <div className="space-y-4">
            {formData.items.map((item, index) => (
              <div key={item.id} className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 w-8 h-8 bg-green-100 rounded-full flex items-center justify-center text-green-700 font-semibold">
                    {index + 1}
                  </div>
                  
                  <div className="flex-1 grid grid-cols-1 md:grid-cols-5 gap-4">
                    <div>
                      <label className="block text-xs font-medium text-gray-600 mb-1">
                        Contenance
                      </label>
                      <select
                        value={item.contenance}
                        onChange={(e) => updateItem(item.id, 'contenance', e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:ring-2 focus:ring-green-500 focus:border-transparent"
                      >
                        {CONTENANCES.map(c => (
                          <option key={c.id} value={c.id}>{c.label}</option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <label className="block text-xs font-medium text-gray-600 mb-1">
                        Conditionnement
                      </label>
                      <select
                        value={item.conditionnement}
                        onChange={(e) => updateItem(item.id, 'conditionnement', e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:ring-2 focus:ring-green-500 focus:border-transparent"
                      >
                        {CONDITIONNEMENTS.map(c => (
                          <option key={c.id} value={c.id}>{c.label}</option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <label className="block text-xs font-medium text-gray-600 mb-1">
                        Quantité
                      </label>
                      <input
                        type="number"
                        min="1"
                        value={item.quantity}
                        onChange={(e) => updateItem(item.id, 'quantity', parseInt(e.target.value) || 1)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:ring-2 focus:ring-green-500 focus:border-transparent"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-medium text-gray-600 mb-1">
                        Prix unitaire ({formData.currency})
                      </label>
                      <input
                        type="number"
                        step="0.001"
                        value={item.unitPrice}
                        onChange={(e) => updateItem(item.id, 'unitPrice', parseFloat(e.target.value) || 0)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:ring-2 focus:ring-green-500 focus:border-transparent"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-medium text-gray-600 mb-1">
                        Total
                      </label>
                      <div className="px-3 py-2 bg-gray-50 border border-gray-200 rounded-md text-sm font-semibold text-gray-700">
                        {item.totalPrice.toFixed(2)} {formData.currency}
                      </div>
                    </div>
                  </div>

                  <button
                    onClick={() => removeItem(item.id)}
                    className="flex-shrink-0 text-red-600 hover:text-red-800 p-2"
                    title="Supprimer"
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                    </svg>
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Totals */}
      {formData.items.length > 0 && (
        <div className="bg-gray-50 rounded-lg p-6 border-2 border-green-200">
          <div className="max-w-md ml-auto space-y-2">
            <div className="flex justify-between text-gray-700">
              <span className="font-medium">Sous-total:</span>
              <span className="font-semibold">{subtotal.toFixed(2)} {formData.currency}</span>
            </div>
            <div className="flex justify-between text-lg font-bold text-green-700 pt-2 border-t-2 border-green-300">
              <span>Total:</span>
              <span>{total.toFixed(2)} {formData.currency}</span>
            </div>
          </div>
        </div>
      )}

      {/* Submit Button */}
      <div className="flex justify-end">
        <button
          onClick={handlePreview}
          disabled={!formData.clientName || formData.items.length === 0}
          className="bg-green-600 hover:bg-green-700 disabled:bg-gray-400 disabled:cursor-not-allowed text-white px-8 py-3 rounded-md font-medium transition-colors"
        >
          Voir l&apos;aperçu
        </button>
      </div>
    </div>
  )
}