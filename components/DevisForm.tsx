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
  clientAddress: string
  items: LineItem[]
  currency: 'EUR' | 'USD'
  subtotal: number
  total: number
  transportFee: number
  grandTotal: number
  createdAt: Date
  invoiceNumber: string
  page2Text: string
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

const UNITS_PER_PALLET: Record<string, number> = {
  ml250: 2016, ml500: 1248, ml750: 1152, ml1000: 1008,
  l3: 300, l5: 400, l10: 384, l20: 495,
}

const getPaletteOptions = (contenanceId: string) => {
  const upp = UNITS_PER_PALLET[contenanceId]
  if (!upp) return []
  return [1, 2, 3, 5, 10, 15, 20].map(n => ({
    palettes: n,
    units: n * upp,
  }))
}

const getPaletteCount = (contenanceId: string, qty: number): number | null => {
  const upp = UNITS_PER_PALLET[contenanceId]
  if (!upp) return null
  return qty / upp
}

// Default page 2 text matching reference proforma
const DEFAULT_PAGE2_TEXT = `SHIPPING TERMS
Origin and Source: Tunisia
Incoterm: EXW - Sfax , Tunisia

PAYMENT TERMS
Beneficiary: STE CARTHAGE CROWN OLIVE OIL
Payment method: Bank transfer (T/T)
RIB (Attijari Bank): 04703040800995308721
IBAN: TN59 04703048008995306721
Code Bic: BSTUTNTT

• 30% Advance Payment (T/T) upon confirmation of Proforma Invoice
→ {30_PERCENT}
• 70% by Irrevocable and Confirmed Letter of Credit (L/C) at sight
→ {70_PERCENT}
The L/C must be issued by a first-class international bank and payable at sight in favor of CARTHAGE CROWN OLIVE OIL.
All banking charges outside Tunisia are at buyer's account.

Delivery time: 30 days after order confirmation and receipt of advance payment (30%)
Offer validity: Valid for 7 days from the date of issue of the quotation`

export default function DevisForm({ onPreview }: DevisFormProps) {
  const [formData, setFormData] = useState({
    clientName: '',
    clientEmail: '',
    clientPhone: '',
    clientAddress: '',
    invoiceNumber: '',
    items: [] as LineItem[],
    currency: 'USD' as 'EUR' | 'USD',
    transportFee: 0,
    page2Text: DEFAULT_PAGE2_TEXT,
  })

  // Add item
  const addItem = () => {
    const defaultContenance = 'ml1000'
    const product = CONTENANCES.find(c => c.id === defaultContenance)!
    const qty = UNITS_PER_PALLET[defaultContenance] ?? 1
    const newItem: LineItem = {
      id: `item-${Date.now()}`,
      contenance: defaultContenance,
      conditionnement: 'verre',
      quantity: qty,
      unitPrice: product.price,
      totalPrice: product.price * qty,
    }
    setFormData(prev => ({ ...prev, items: [...prev.items, newItem] }))
  }

  // Remove item
  const removeItem = (id: string) => {
    setFormData(prev => ({ ...prev, items: prev.items.filter(i => i.id !== id) }))
  }

  // Update item field
  const updateItem = (id: string, field: keyof LineItem, value: any) => {
    setFormData(prev => ({
      ...prev,
      items: prev.items.map(item => {
        if (item.id !== id) return item
        const updated = { ...item, [field]: value }
        if (field === 'contenance') {
          const product = CONTENANCES.find(c => c.id === value)
          if (product) updated.unitPrice = product.price
          updated.quantity = UNITS_PER_PALLET[value as string] ?? 1
        }
        updated.totalPrice = updated.unitPrice * updated.quantity
        return updated
      }),
    }))
  }

  // Set palette quantity
  const setPaletteQty = (id: string, units: number) => {
    setFormData(prev => ({
      ...prev,
      items: prev.items.map(item => {
        if (item.id !== id) return item
        return { ...item, quantity: units, totalPrice: item.unitPrice * units }
      }),
    }))
  }

  // Calculate totals
  const subtotal = formData.items.reduce((s, i) => s + i.totalPrice, 0)
  const grandTotal = subtotal + formData.transportFee

  // Inject payment amounts into page2 text
  const resolvedPage2Text = formData.page2Text
    .replace('{30_PERCENT}', `→ ${formData.currency} ${(grandTotal * 0.3).toFixed(2)}`)
    .replace('{70_PERCENT}', `→ ${formData.currency} ${(grandTotal * 0.7).toFixed(2)}`)

  const handlePreview = () => {
    onPreview({
      ...formData,
      subtotal,
      total: subtotal,
      grandTotal,
      createdAt: new Date(),
      page2Text: resolvedPage2Text,
    })
  }

  const inputClass = "w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-amber-500 focus:border-transparent text-sm"
  const labelClass = "block text-xs font-semibold text-gray-600 mb-1 uppercase tracking-wide"

  return (
    <div className="space-y-8">

      {/* ── Client Information ── */}
      <section>
        <h2 className="text-lg font-bold text-gray-800 mb-4 pb-2 border-b-2 border-amber-500">
          Client Details
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          <div>
            <label className={labelClass}>Client / Company Name *</label>
            <input type="text" value={formData.clientName}
              onChange={e => setFormData(p => ({ ...p, clientName: e.target.value }))}
              className={inputClass} placeholder="Company name" />
          </div>
          <div>
            <label className={labelClass}>Address</label>
            <input type="text" value={formData.clientAddress}
              onChange={e => setFormData(p => ({ ...p, clientAddress: e.target.value }))}
              className={inputClass} placeholder="Full address" />
          </div>
          <div>
            <label className={labelClass}>Email</label>
            <input type="email" value={formData.clientEmail}
              onChange={e => setFormData(p => ({ ...p, clientEmail: e.target.value }))}
              className={inputClass} placeholder="email@company.com" />
          </div>
          <div>
            <label className={labelClass}>Phone</label>
            <input type="tel" value={formData.clientPhone}
              onChange={e => setFormData(p => ({ ...p, clientPhone: e.target.value }))}
              className={inputClass} placeholder="+971 50 000 0000" />
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className={labelClass}>Invoice Number</label>
            <input type="text" value={formData.invoiceNumber}
              onChange={e => setFormData(p => ({ ...p, invoiceNumber: e.target.value }))}
              className={inputClass} placeholder="07/2026" />
          </div>
          <div>
            <label className={labelClass}>Currency</label>
            <div className="flex gap-4 mt-2">
              {(['USD', 'EUR'] as const).map(c => (
                <label key={c} className="flex items-center cursor-pointer">
                  <input type="radio" value={c} checked={formData.currency === c}
                    onChange={() => setFormData(p => ({ ...p, currency: c }))}
                    className="mr-2 accent-amber-600" />
                  <span className="text-sm font-medium">{c === 'USD' ? 'Dollar ($)' : 'Euro (€)'}</span>
                </label>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── Articles ── */}
      <section>
        <div className="flex justify-between items-center mb-4 pb-2 border-b-2 border-amber-500">
          <h2 className="text-lg font-bold text-gray-800">Products</h2>
          <button onClick={addItem}
            className="bg-amber-600 hover:bg-amber-700 text-white px-4 py-2 rounded-md text-sm font-semibold transition-colors">
            + Add product
          </button>
        </div>

        {formData.items.length === 0 ? (
          <div className="text-center py-10 text-gray-400 border-2 border-dashed border-gray-200 rounded-lg">
            No products yet. Click &quot;Add product&quot; to begin.
          </div>
        ) : (
          <div className="space-y-4">
            {formData.items.map((item, index) => {
              const paletteOpts = getPaletteOptions(item.contenance)
              const currentPalettes = getPaletteCount(item.contenance, item.quantity)
              return (
                <div key={item.id} className="border border-gray-200 rounded-xl p-4 bg-gray-50 hover:shadow-md transition-shadow">
                  <div className="flex items-start gap-3">
                    <div className="flex-shrink-0 w-7 h-7 bg-amber-100 rounded-full flex items-center justify-center text-amber-700 font-bold text-xs">
                      {index + 1}
                    </div>
                    <div className="flex-1 space-y-3">
                      {/* Row 1 */}
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                        <div>
                          <label className={labelClass}>Volume</label>
                          <select value={item.contenance}
                            onChange={e => updateItem(item.id, 'contenance', e.target.value)}
                            className={inputClass}>
                            {CONTENANCES.map(c => <option key={c.id} value={c.id}>{c.label}</option>)}
                          </select>
                        </div>
                        <div>
                          <label className={labelClass}>Packaging</label>
                          <select value={item.conditionnement}
                            onChange={e => updateItem(item.id, 'conditionnement', e.target.value)}
                            className={inputClass}>
                            {CONDITIONNEMENTS.map(c => <option key={c.id} value={c.id}>{c.label}</option>)}
                          </select>
                        </div>
                        <div>
                          <label className={labelClass}>Unit Price ({formData.currency})</label>
                          <input type="number" step="0.001" value={item.unitPrice}
                            onChange={e => updateItem(item.id, 'unitPrice', parseFloat(e.target.value) || 0)}
                            className={inputClass} />
                        </div>
                        <div>
                          <label className={labelClass}>Line Total</label>
                          <div className="px-3 py-2 bg-white border border-gray-200 rounded-md text-sm font-bold text-amber-700">
                            {formData.currency === 'USD' ? '$' : '€'} {item.totalPrice.toLocaleString('en-US', { minimumFractionDigits: 2 })}
                          </div>
                        </div>
                      </div>

                      {/* Row 2: palette picker */}
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-3 items-end">
                        <div>
                          <label className={labelClass}>
                            Palettes — quick select
                            {currentPalettes !== null && Number.isInteger(currentPalettes) && (
                              <span className="ml-2 text-amber-600 font-bold normal-case">
                                ({currentPalettes} pallet{currentPalettes !== 1 ? 's' : ''} selected)
                              </span>
                            )}
                          </label>
                          <div className="flex flex-wrap gap-1.5">
                            {paletteOpts.map(opt => (
                              <button key={opt.palettes}
                                onClick={() => setPaletteQty(item.id, opt.units)}
                                className={`px-3 py-1 text-xs rounded-full border font-semibold transition-colors ${
                                  item.quantity === opt.units
                                    ? 'bg-amber-600 text-white border-amber-600'
                                    : 'border-gray-300 text-gray-500 hover:border-amber-500 hover:text-amber-700'
                                }`}>
                                {opt.palettes}P
                              </button>
                            ))}
                          </div>
                        </div>
                        <div>
                          <label className={labelClass}>Quantity (units)</label>
                          <input type="number" min="1" value={item.quantity}
                            onChange={e => updateItem(item.id, 'quantity', parseInt(e.target.value) || 1)}
                            className={inputClass} />
                        </div>
                      </div>
                    </div>

                    <button onClick={() => removeItem(item.id)}
                      className="flex-shrink-0 text-red-400 hover:text-red-600 p-1.5 transition-colors" title="Remove">
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                          d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                      </svg>
                    </button>
                  </div>
                </div>
              )
            })}
          </div>
        )}
      </section>

      {/* ── Transport fee ── */}
      <section>
        <h2 className="text-lg font-bold text-gray-800 mb-4 pb-2 border-b-2 border-amber-500">
          Transport Fees
        </h2>
        <div className="max-w-xs">
          <label className={labelClass}>Transport fee ({formData.currency}) — leave 0 to omit</label>
          <input type="number" step="0.01" min="0" value={formData.transportFee}
            onChange={e => setFormData(p => ({ ...p, transportFee: parseFloat(e.target.value) || 0 }))}
            className={inputClass} />
        </div>
      </section>

      {/* ── Totals summary ── */}
      {formData.items.length > 0 && (
        <div className="bg-amber-50 rounded-xl p-5 border-2 border-amber-200">
          <div className="max-w-sm ml-auto space-y-2">
            <div className="flex justify-between text-gray-700 text-sm">
              <span>Subtotal (products):</span>
              <span className="font-semibold">{formData.currency === 'USD' ? '$' : '€'} {subtotal.toLocaleString('en-US', { minimumFractionDigits: 3 })}</span>
            </div>
            {formData.transportFee > 0 && (
              <div className="flex justify-between text-gray-700 text-sm">
                <span>Transport fees:</span>
                <span className="font-semibold">{formData.currency === 'USD' ? '$' : '€'} {formData.transportFee.toLocaleString('en-US', { minimumFractionDigits: 3 })}</span>
              </div>
            )}
            <div className="flex justify-between text-lg font-bold text-amber-800 pt-2 border-t-2 border-amber-300">
              <span>Grand Total EXW:</span>
              <span>{formData.currency === 'USD' ? '$' : '€'} {grandTotal.toLocaleString('en-US', { minimumFractionDigits: 3 })}</span>
            </div>
            {grandTotal > 0 && (
              <div className="text-xs text-gray-500 pt-1 border-t border-amber-200 space-y-0.5">
                <div className="flex justify-between">
                  <span>30% advance (T/T):</span>
                  <span>{formData.currency === 'USD' ? '$' : '€'} {(grandTotal * 0.3).toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span>70% L/C at sight:</span>
                  <span>{formData.currency === 'USD' ? '$' : '€'} {(grandTotal * 0.7).toFixed(2)}</span>
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* ── Page 2 text ── */}
      <section>
        <h2 className="text-lg font-bold text-gray-800 mb-2 pb-2 border-b-2 border-amber-500">
          Page 2 — Payment Terms &amp; Conditions
        </h2>
        <p className="text-xs text-gray-500 mb-3">
          Edit the text below. Use ALL CAPS lines for section titles, <code className="bg-gray-100 px-1">•</code> for bullet points,
          <code className="bg-gray-100 px-1 ml-1">→</code> for amount lines.
          <code className="bg-gray-100 px-1 ml-1">{'{30_PERCENT}'}</code> and <code className="bg-gray-100 px-1">{'{70_PERCENT}'}</code> are auto-replaced with calculated amounts.
        </p>
        <textarea
          value={formData.page2Text}
          onChange={e => setFormData(p => ({ ...p, page2Text: e.target.value }))}
          rows={22}
          className="w-full px-3 py-3 border border-gray-300 rounded-lg font-mono text-xs leading-relaxed focus:ring-2 focus:ring-amber-500 focus:border-transparent resize-y"
        />
        <div className="mt-2 flex justify-end">
          <button
            onClick={() => setFormData(p => ({ ...p, page2Text: DEFAULT_PAGE2_TEXT }))}
            className="text-xs text-gray-500 hover:text-amber-700 underline"
          >
            Reset to default text
          </button>
        </div>
      </section>

      {/* ── Submit ── */}
      <div className="flex justify-end pt-2">
        <button
          onClick={handlePreview}
          disabled={!formData.clientName || formData.items.length === 0}
          className="bg-amber-600 hover:bg-amber-700 disabled:bg-gray-300 disabled:cursor-not-allowed text-white px-10 py-3 rounded-lg font-bold text-sm transition-colors shadow-md">
          Preview Proforma →
        </button>
      </div>
    </div>
  )
}