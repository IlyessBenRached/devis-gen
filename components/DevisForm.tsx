/* eslint-disable @typescript-eslint/no-explicit-any */
'use client'

import { useState } from 'react'

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

const CONTENANCES = [
  { id: 'ml250',  label: '250 ml', price: 1.517  },
  { id: 'ml500',  label: '500 ml', price: 2.508  },
  { id: 'ml750',  label: '750 ml', price: 3.429  },
  { id: 'ml1000', label: '1L',     price: 5.846  },
  { id: 'l3',     label: '3L',     price: 10.500 },
  { id: 'l5',     label: '5L',     price: 24.320 },
  { id: 'l10',    label: '10L',    price: 35.000 },
  { id: 'l15',    label: '15L',    price: 52.000 },
  { id: 'l20',    label: '20L',     price: 97.490   },
  { id: 'l1000',  label: '1000L',   price: 4411.786 },
]

const CONDITIONNEMENTS = [
  { id: 'verre', label: 'Bouteille en verre' },
  { id: 'metal', label: 'Bidon Métallique'   },
]

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

// ── Hardcoded default items — DO NOT change quantities ───
const DEFAULT_ITEMS: LineItem[] = [
  { id: 'default-1', contenance: 'ml500',  conditionnement: 'verre', quantity: 1512, unitPrice: 2.508,  totalPrice: 2.508  * 1512 },
  { id: 'default-2', contenance: 'ml750',  conditionnement: 'verre', quantity: 1152, unitPrice: 3.429,  totalPrice: 3.429  * 1152 },
  { id: 'default-3', contenance: 'ml1000', conditionnement: 'verre', quantity: 3024, unitPrice: 5.846,  totalPrice: 5.846  * 3024 },
  { id: 'default-4', contenance: 'l3',     conditionnement: 'metal', quantity: 240,  unitPrice: 10.500, totalPrice: 10.500 * 240  },
  { id: 'default-5', contenance: 'l5',     conditionnement: 'metal', quantity: 1536, unitPrice: 24.320, totalPrice: 24.320 * 1536 },
  { id: 'default-6', contenance: 'l10',    conditionnement: 'metal', quantity: 384,  unitPrice: 35.000, totalPrice: 35.000 * 384  },
  { id: 'default-7', contenance: 'l20',    conditionnement: 'metal', quantity: 180,  unitPrice: 97.490,   totalPrice: 97.490   * 180 },
  { id: 'default-8', contenance: 'l1000',  conditionnement: 'metal', quantity: 1,    unitPrice: 4411.786, totalPrice: 4411.786 * 1   },
]

export default function DevisForm({ onPreview }: DevisFormProps) {
  const [formData, setFormData] = useState({
    clientName:    'AL THIMAR AL LIBNANIA FOODSTUFF TRADING LLC',
    clientAddress: 'UAE, SHARJAH, TAAWON MAIN ROAD, BESIDE PULMAN HOTEL, AL SAAD 1 TOWER',
    clientPhone:   '00971-505188085 / 00962796986900',
    clientEmail:   'sales@thimarlibnan.ae / Export.manager@setalkel.com',
    invoiceNumber: '',
    items:         DEFAULT_ITEMS,
    currency:      'USD' as 'EUR' | 'USD',
    transportFee:  0,
    page2Text:     DEFAULT_PAGE2_TEXT,
  })

  const addItem = () => {
    setFormData(prev => ({
      ...prev,
      items: [...prev.items, {
        id: `item-${Date.now()}`,
        contenance: 'ml1000',
        conditionnement: 'verre',
        quantity: 1,
        unitPrice: 5.846,
        totalPrice: 5.846,
      }],
    }))
  }

  const removeItem = (id: string) =>
    setFormData(prev => ({ ...prev, items: prev.items.filter(i => i.id !== id) }))

  const updateItem = (id: string, field: keyof LineItem, value: any) => {
    setFormData(prev => ({
      ...prev,
      items: prev.items.map(item => {
        if (item.id !== id) return item
        const updated = { ...item, [field]: value }
        if (field === 'contenance') {
          const product = CONTENANCES.find(c => c.id === value)
          if (product) updated.unitPrice = product.price
        }
        updated.totalPrice = updated.unitPrice * updated.quantity
        return updated
      }),
    }))
  }

  const subtotal = formData.items.reduce((s, i) => s + i.totalPrice, 0)
  const grandTotal = subtotal + formData.transportFee
  const cSym = formData.currency === 'USD' ? '$' : '€'

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

  const inp = "w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-amber-500 focus:border-transparent text-sm"
  const lbl = "block text-xs font-semibold text-gray-600 mb-1 uppercase tracking-wide"

  return (
    <div className="space-y-8">

      {/* ── Client ── */}
      <section>
        <h2 className="text-lg font-bold text-gray-800 mb-4 pb-2 border-b-2 border-amber-500">Client Details</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="md:col-span-2">
            <label className={lbl}>Client / Company Name *</label>
            <input type="text" value={formData.clientName}
              onChange={e => setFormData(p => ({ ...p, clientName: e.target.value }))}
              className={inp} />
          </div>
          <div className="md:col-span-2">
            <label className={lbl}>Address</label>
            <input type="text" value={formData.clientAddress}
              onChange={e => setFormData(p => ({ ...p, clientAddress: e.target.value }))}
              className={inp} />
          </div>
          <div>
            <label className={lbl}>Phone</label>
            <input type="tel" value={formData.clientPhone}
              onChange={e => setFormData(p => ({ ...p, clientPhone: e.target.value }))}
              className={inp} />
          </div>
          <div>
            <label className={lbl}>Email</label>
            <input type="text" value={formData.clientEmail}
              onChange={e => setFormData(p => ({ ...p, clientEmail: e.target.value }))}
              className={inp} />
          </div>
          <div>
            <label className={lbl}>Invoice Number</label>
            <input type="text" value={formData.invoiceNumber}
              onChange={e => setFormData(p => ({ ...p, invoiceNumber: e.target.value }))}
              className={inp} placeholder="07/2026" />
          </div>
          <div>
            <label className={lbl}>Currency</label>
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

      {/* ── Products ── */}
      <section>
        <div className="flex justify-between items-center mb-4 pb-2 border-b-2 border-amber-500">
          <h2 className="text-lg font-bold text-gray-800">Products</h2>
          <button onClick={addItem}
            className="bg-amber-600 hover:bg-amber-700 text-white px-4 py-2 rounded-md text-sm font-semibold transition-colors">
            + Add product
          </button>
        </div>

        <div className="space-y-3">
          {formData.items.map((item, index) => (
            <div key={item.id} className="border border-gray-200 rounded-xl p-4 bg-gray-50 hover:shadow-md transition-shadow">
              <div className="flex items-start gap-3">
                <div className="flex-shrink-0 w-7 h-7 bg-amber-100 rounded-full flex items-center justify-center text-amber-700 font-bold text-xs mt-1">
                  {index + 1}
                </div>

                <div className="flex-1 grid grid-cols-2 md:grid-cols-5 gap-3">
                  <div>
                    <label className={lbl}>Volume</label>
                    <select value={item.contenance}
                      onChange={e => updateItem(item.id, 'contenance', e.target.value)}
                      className={inp}>
                      {CONTENANCES.map(c => <option key={c.id} value={c.id}>{c.label}</option>)}
                    </select>
                  </div>
                  <div>
                    <label className={lbl}>Packaging</label>
                    <select value={item.conditionnement}
                      onChange={e => updateItem(item.id, 'conditionnement', e.target.value)}
                      className={inp}>
                      {CONDITIONNEMENTS.map(c => <option key={c.id} value={c.id}>{c.label}</option>)}
                    </select>
                  </div>
                  <div>
                    <label className={lbl}>Quantity</label>
                    <input type="number" min="1" value={item.quantity}
                      onChange={e => updateItem(item.id, 'quantity', parseInt(e.target.value) || 1)}
                      className={inp} />
                  </div>
                  <div>
                    <label className={lbl}>Unit Price ({formData.currency})</label>
                    <input type="number" step="0.001" value={item.unitPrice}
                      onChange={e => updateItem(item.id, 'unitPrice', parseFloat(e.target.value) || 0)}
                      className={inp} />
                  </div>
                  <div>
                    <label className={lbl}>Line Total</label>
                    <div className="px-3 py-2 bg-white border border-gray-200 rounded-md text-sm font-bold text-amber-700">
                      {cSym} {item.totalPrice.toLocaleString('en-US', { minimumFractionDigits: 2 })}
                    </div>
                  </div>
                </div>

                <button onClick={() => removeItem(item.id)}
                  className="flex-shrink-0 text-red-400 hover:text-red-600 p-1.5 transition-colors mt-1">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                      d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                  </svg>
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── Transport fee ── */}
      <section>
        <h2 className="text-lg font-bold text-gray-800 mb-4 pb-2 border-b-2 border-amber-500">Transport Fees</h2>
        <div className="max-w-xs">
          <label className={lbl}>Amount ({formData.currency}) — leave 0 to omit</label>
          <input type="number" step="0.01" min="0" value={formData.transportFee}
            onChange={e => setFormData(p => ({ ...p, transportFee: parseFloat(e.target.value) || 0 }))}
            className={inp} />
        </div>
      </section>

      {/* ── Totals ── */}
      <div className="bg-amber-50 rounded-xl p-5 border-2 border-amber-200">
        <div className="max-w-sm ml-auto space-y-2">
          <div className="flex justify-between text-gray-700 text-sm">
            <span>Subtotal:</span>
            <span className="font-semibold">{cSym} {subtotal.toLocaleString('en-US', { minimumFractionDigits: 3 })}</span>
          </div>
          {formData.transportFee > 0 && (
            <div className="flex justify-between text-gray-700 text-sm">
              <span>Transport fees:</span>
              <span className="font-semibold">{cSym} {formData.transportFee.toLocaleString('en-US', { minimumFractionDigits: 3 })}</span>
            </div>
          )}
          <div className="flex justify-between text-lg font-bold text-amber-800 pt-2 border-t-2 border-amber-300">
            <span>Grand Total EXW:</span>
            <span>{cSym} {grandTotal.toLocaleString('en-US', { minimumFractionDigits: 3 })}</span>
          </div>
          {grandTotal > 0 && (
            <div className="text-xs text-gray-500 pt-1 border-t border-amber-200 space-y-0.5">
              <div className="flex justify-between">
                <span>30% advance (T/T):</span>
                <span>{cSym} {(grandTotal * 0.3).toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span>70% L/C at sight:</span>
                <span>{cSym} {(grandTotal * 0.7).toFixed(2)}</span>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* ── Page 2 text ── */}
      <section>
        <h2 className="text-lg font-bold text-gray-800 mb-2 pb-2 border-b-2 border-amber-500">
          Page 2 — Payment Terms &amp; Conditions
        </h2>
        <p className="text-xs text-gray-500 mb-3">
          ALL CAPS lines → section titles &nbsp;|&nbsp;
          <code className="bg-gray-100 px-1">•</code> bullet &nbsp;|&nbsp;
          <code className="bg-gray-100 px-1">→</code> amount line &nbsp;|&nbsp;
          <code className="bg-gray-100 px-1">{'{30_PERCENT}'}</code> and <code className="bg-gray-100 px-1">{'{70_PERCENT}'}</code> auto-calculated
        </p>
        <textarea
          value={formData.page2Text}
          onChange={e => setFormData(p => ({ ...p, page2Text: e.target.value }))}
          rows={22}
          className="w-full px-3 py-3 border border-gray-300 rounded-lg font-mono text-xs leading-relaxed focus:ring-2 focus:ring-amber-500 focus:border-transparent resize-y"
        />
        <div className="mt-2 flex justify-end">
          <button onClick={() => setFormData(p => ({ ...p, page2Text: DEFAULT_PAGE2_TEXT }))}
            className="text-xs text-gray-500 hover:text-amber-700 underline">
            Reset to default text
          </button>
        </div>
      </section>

      {/* ── Submit ── */}
      <div className="flex justify-end pt-2">
        <button onClick={handlePreview}
          disabled={!formData.clientName || formData.items.length === 0}
          className="bg-amber-600 hover:bg-amber-700 disabled:bg-gray-300 disabled:cursor-not-allowed text-white px-10 py-3 rounded-lg font-bold text-sm transition-colors shadow-md">
          Preview Proforma →
        </button>
      </div>
    </div>
  )
}