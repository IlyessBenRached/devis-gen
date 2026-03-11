'use client'

import { useState } from 'react'
import { pdf } from '@react-pdf/renderer'
import DevisPDF from './DevisPDF'
import type { DevisFormData } from './DevisForm'

interface DevisPreviewProps {
  devis: DevisFormData
  onBack: () => void
  onReset: () => void
}

const COND_LABEL: Record<string, string> = {
  verre: 'Glass bottle',
  metal: 'Tin can',
}
const VOL_LABEL: Record<string, string> = {
  ml250: '250ml', ml500: '500ml', ml750: '750ml', ml1000: '1L',
  l3: '3L', l5: '5L', l10: '10L', l15: '15L', l20: '20L',
}

// ── Hardcoded palette label overrides ────────────────────
const PALETTE_OVERRIDES: Record<string, string> = {
  'ml1000-5040': '5040 (5 Pallets)',
  'l5-3240':     '3240 (15 Pallets)',
  'l20-225':     '225 (2 Pallets)',
}

const paletteLabel = (contenance: string, qty: number): string => {
  const key = `${contenance}-${qty}`
  if (PALETTE_OVERRIDES[key]) return PALETTE_OVERRIDES[key]
  return String(qty)
}

const fmtNum = (n: number) =>
  n.toLocaleString('en-US', { minimumFractionDigits: 3, maximumFractionDigits: 3 })

export default function DevisPreview({ devis, onBack, onReset }: DevisPreviewProps) {
  const [downloading, setDownloading] = useState(false)
  const [activePage, setActivePage] = useState<1 | 2>(1)

  const cSym = devis.currency === 'EUR' ? '€' : '$'
  const date = new Date(devis.createdAt)
  const fmtDate = (d: Date) => d.toLocaleDateString('en-GB', { day: '2-digit', month: '2-digit', year: 'numeric' })
  const invoiceNum = devis.invoiceNumber || `${String(date.getMonth() + 1).padStart(2, '0')}/${date.getFullYear()}`

  const handleDownloadPDF = async () => {
    setDownloading(true)
    try {
      const pdfBlob = await pdf(<DevisPDF devis={devis} />).toBlob()
      const url = URL.createObjectURL(pdfBlob)
      const link = document.createElement('a')
      link.href = url
      link.download = `proforma-carthage-crown-${new Date().toISOString().split('T')[0]}.pdf`
      link.click()
      URL.revokeObjectURL(url)
    } catch (error) {
      console.error('Error generating PDF:', error)
      alert('Error generating PDF')
    } finally {
      setDownloading(false)
    }
  }

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="text-2xl font-bold text-gray-800">Proforma Preview</h2>
        <p className="text-gray-500 text-sm mt-1">Review before downloading</p>
      </div>

      {/* Page tabs */}
      <div className="flex gap-2 justify-center">
        {([1, 2] as const).map(p => (
          <button key={p} onClick={() => setActivePage(p)}
            className={`px-6 py-2 rounded-full text-sm font-semibold transition-colors ${
              activePage === p ? 'bg-amber-600 text-white' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
            }`}>
            Page {p}/2
          </button>
        ))}
      </div>

      {/* PAGE 1 */}
      {activePage === 1 && (
        <div className="border border-gray-200 rounded-xl overflow-hidden shadow-sm bg-white">
          <div className="bg-amber-500 px-6 py-4 flex items-center gap-4">
            <div className="w-14 h-14 bg-white rounded flex items-center justify-center">
              <img src="/logo/logo_carthage_crown_page-0001.jpg" alt="Logo" className="w-12 h-12 object-contain" />
            </div>
            <div className="text-white font-bold text-lg tracking-wide">CARTHAGE CROWN OLIVE OIL</div>
          </div>

          <div className="px-6 py-5">
            <div className="flex justify-between items-start mb-5">
              <div className="font-bold text-gray-900 text-base">PROFORMA INVOICE N° : {invoiceNum}</div>
              <div className="text-right text-sm text-gray-500">
                <div>Date: {fmtDate(date)}</div>
                <div>Page : 1/2</div>
              </div>
            </div>

            <div className="mb-4">
              <div className="text-xs font-bold text-gray-900 underline mb-2 uppercase tracking-wide">Client Details</div>
              <div className="text-sm text-gray-700 space-y-0.5">
                <div><span className="font-semibold">Client / Company Name : </span>{devis.clientName}</div>
                {devis.clientAddress && <div><span className="font-semibold">Address: </span>{devis.clientAddress}</div>}
                {devis.clientPhone && <div><span className="font-semibold">Tel: </span>{devis.clientPhone}</div>}
                {devis.clientEmail && <div><span className="font-semibold">Email: </span>{devis.clientEmail}</div>}
              </div>
            </div>

            <div className="mb-4">
              <div className="text-xs font-bold text-gray-900 underline mb-1 uppercase tracking-wide">Subject :</div>
              <div className="text-sm text-gray-700">Price offer - Extra Virgin Olive Oil</div>
            </div>

            <div className="overflow-x-auto mb-4">
              <table className="min-w-full border border-gray-300 text-sm">
                <thead>
                  <tr className="bg-white border-b border-gray-300">
                    <th className="px-3 py-2 text-center text-xs font-bold text-gray-800 border-r border-gray-300 w-10">Ref.</th>
                    <th className="px-3 py-2 text-center text-xs font-bold text-gray-800 border-r border-gray-300">Packaging</th>
                    <th className="px-3 py-2 text-center text-xs font-bold text-gray-800 border-r border-gray-300">Volume</th>
                    <th className="px-3 py-2 text-center text-xs font-bold text-gray-800 border-r border-gray-300">Quantity</th>
                    <th className="px-3 py-2 text-center text-xs font-bold text-gray-800 border-r border-gray-300">Unit Price EXW ({cSym})</th>
                    <th className="px-3 py-2 text-center text-xs font-bold text-gray-800">Total ({devis.currency})</th>
                  </tr>
                </thead>
                <tbody>
                  {devis.items.map((item, idx) => (
                    <tr key={item.id} className="border-b border-gray-200">
                      <td className="px-3 py-3 text-center text-xs border-r border-gray-300">{idx + 1}</td>
                      <td className="px-3 py-3 text-center text-xs border-r border-gray-300">{COND_LABEL[item.conditionnement] || item.conditionnement}</td>
                      <td className="px-3 py-3 text-center text-xs border-r border-gray-300">{VOL_LABEL[item.contenance] || item.contenance}</td>
                      <td className="px-3 py-3 text-center text-xs border-r border-gray-300">{paletteLabel(item.contenance, item.quantity)}</td>
                      <td className="px-3 py-3 text-center text-xs border-r border-gray-300">{item.unitPrice.toFixed(3)}</td>
                      <td className="px-3 py-3 text-right text-xs font-mono">{fmtNum(item.totalPrice)}</td>
                    </tr>
                  ))}
                  <tr>
                    <td colSpan={5} className="px-3 py-3 text-center text-sm font-bold text-gray-500 border-r border-gray-300">
                      SUBTOTAL ({devis.currency})
                    </td>
                    <td className="px-3 py-3 text-right text-sm font-bold text-gray-700">
                      {fmtNum(devis.subtotal)}
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>

            {/* Transport fee — below table */}
            {devis.transportFee > 0 && (
              <div className="flex justify-between items-center px-4 py-2 border border-dashed border-gray-300 text-sm mt-1">
                <span className="text-gray-500">+ Transport fees</span>
                <span className="font-bold text-gray-800">{fmtNum(devis.transportFee)} {devis.currency}</span>
              </div>
            )}

            {/* Grand total */}
            <div className="flex justify-between items-center px-4 py-3 bg-amber-500 mt-1">
              <span className="font-bold text-white text-sm">GRAND TOTAL EXW ({devis.currency})</span>
              <span className="font-bold text-white text-base">{fmtNum(devis.grandTotal)}</span>
            </div>
          </div>

          <div className="bg-amber-500 px-6 py-2 flex justify-between items-center">
            <span className="text-xs font-bold text-amber-900">M.F.: 1858707 C/N/M/000 — R.C.: C0870132024</span>
            <span className="text-xs font-bold text-amber-900">france@carthagecrown.com</span>
          </div>
        </div>
      )}

      {/* PAGE 2 */}
      {activePage === 2 && (
        <div className="border border-gray-200 rounded-xl overflow-hidden shadow-sm bg-white">
          <div className="bg-amber-500 px-6 py-4 flex items-center gap-4">
            <div className="w-14 h-14 bg-white rounded flex items-center justify-center">
              <img src="/logo/logo_carthage_crown_page-0001.jpg" alt="Logo" className="w-12 h-12 object-contain" />
            </div>
            <div className="text-white font-bold text-lg tracking-wide">CARTHAGE CROWN OLIVE OIL</div>
          </div>

          <div className="px-6 py-5">
            <div className="flex justify-between items-start mb-5">
              <div className="font-bold text-gray-900 text-base">PROFORMA INVOICE</div>
              <div className="text-right text-sm text-gray-500">
                <div>Date: {fmtDate(date)}</div>
                <div>Page : 2/2</div>
              </div>
            </div>

            <div className="text-base font-bold text-gray-900 mb-5">
              Total Amount: {devis.currency} {fmtNum(devis.grandTotal)}
            </div>

            <div className="space-y-0.5 text-sm text-gray-800">
              {devis.page2Text.split('\n').map((line, i) => {
                const trimmed = line.trim()
                if (trimmed === '') return <div key={i} className="h-3" />
                if (trimmed.startsWith('•') || trimmed.startsWith('-')) {
                  return (
                    <div key={i} className="flex items-start gap-2 pl-4">
                      <span className="mt-0.5">•</span>
                      <span>{trimmed.replace(/^[•\-]\s*/, '')}</span>
                    </div>
                  )
                }
                if (trimmed.startsWith('→') || trimmed.startsWith('->')) {
                  return <div key={i} className="pl-4 font-bold text-amber-800">{trimmed}</div>
                }
                if (trimmed === trimmed.toUpperCase() && trimmed.length > 2) {
                  return <div key={i} className="font-bold text-gray-900 underline mt-4 first:mt-0">{trimmed}</div>
                }
                if (trimmed.includes(':')) {
                  const idx = trimmed.indexOf(':')
                  return (
                    <div key={i}>
                      <span className="font-semibold">{trimmed.substring(0, idx + 1)}</span>
                      {trimmed.substring(idx + 1)}
                    </div>
                  )
                }
                return <div key={i}>{trimmed}</div>
              })}
            </div>
          </div>

          <div className="bg-amber-500 px-6 py-2 flex justify-between items-center">
            <span className="text-xs font-bold text-amber-900">M.F.: 1858707 C/N/M/000 — R.C.: C0870132024</span>
            <span className="text-xs font-bold text-amber-900">france@carthagecrown.com</span>
          </div>
        </div>
      )}

      {/* Actions */}
      <div className="flex justify-between gap-4 pt-2">
        <button onClick={onBack}
          className="px-6 py-3 bg-gray-600 text-white rounded-lg font-semibold hover:bg-gray-700 transition text-sm">
          ← Edit
        </button>
        <div className="flex gap-3">
          <button onClick={onReset}
            className="px-6 py-3 bg-red-600 text-white rounded-lg font-semibold hover:bg-red-700 transition text-sm">
            New Proforma
          </button>
          <button onClick={handleDownloadPDF} disabled={downloading}
            className="px-8 py-3 bg-amber-600 text-white rounded-lg font-semibold hover:bg-amber-700 disabled:bg-gray-300 disabled:cursor-not-allowed transition text-sm flex items-center gap-2 shadow-md">
            {downloading ? (
              <>
                <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                </svg>
                Generating...
              </>
            ) : (
              <>
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M3 17a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm3.293-7.707a1 1 0 011.414 0L9 10.586V3a1 1 0 112 0v7.586l1.293-1.293a1 1 0 111.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z" clipRule="evenodd" />
                </svg>
                Download PDF
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  )
}