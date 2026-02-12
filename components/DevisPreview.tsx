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

export default function DevisPreview({
  devis,
  onBack,
  onReset,
}: DevisPreviewProps) {
  const [downloading, setDownloading] = useState(false)

  const handleDownloadPDF = async () => {
    setDownloading(true)
    try {
      const pdfBlob = await pdf(<DevisPDF devis={devis} />).toBlob()
      const url = URL.createObjectURL(pdfBlob)
      const link = document.createElement('a')
      link.href = url
      link.download = `devis-carthage-crown-${new Date().toISOString().split('T')[0]}.pdf`
      link.click()
      URL.revokeObjectURL(url)
    } catch (error) {
      console.error('Error generating PDF:', error)
      alert('Erreur lors de la génération du PDF')
    } finally {
      setDownloading(false)
    }
  }

  return (
    <div className="space-y-8">
      {/* Preview Header */}
      <div className="text-center">
        <h2 className="text-3xl font-bold text-gray-800 mb-2">Aperçu du Devis</h2>
        <p className="text-gray-600">Vérifiez les informations avant de télécharger</p>
      </div>

      {/* Client Info Preview */}
      <section className="bg-blue-50 p-6 rounded-lg">
        <h3 className="text-xl font-semibold text-gray-800 mb-4">Client</h3>
        <div className="space-y-2">
          <p><span className="font-medium">Nom:</span> {devis.clientName}</p>
          {devis.clientEmail && <p><span className="font-medium">Email:</span> {devis.clientEmail}</p>}
          {devis.clientPhone && <p><span className="font-medium">Téléphone:</span> {devis.clientPhone}</p>}
        </div>
      </section>

      {/* Items Preview */}
      <section>
        <h3 className="text-xl font-semibold text-gray-800 mb-4">Articles</h3>
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white border border-gray-200 rounded-lg">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">Réf.</th>
                <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">Désignation</th>
                <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">Conditionnement</th>
                <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">Contenance</th>
                <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">P.U. ({devis.currency})</th>
                <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">Quantité</th>
                <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">Total</th>
              </tr>
            </thead>
            <tbody>
              {devis.items.map((item, index) => (
                <tr key={item.id} className="border-t border-gray-200">
                  <td className="px-4 py-3 text-sm">{index + 1}</td>
                  <td className="px-4 py-3 text-sm">Huile d&apos;olive Vierge Extra</td>
                  <td className="px-4 py-3 text-sm">
                    {item.conditionnement === 'verre' ? 'Bouteille en verre' : 'Bidon métallique'}
                  </td>
                  <td className="px-4 py-3 text-sm">
                    {item.contenance.replace('ml', ' ML').replace('l', ' L').toUpperCase()}
                  </td>
                  <td className="px-4 py-3 text-sm font-mono">
                    {(item.unitPrice).toFixed(3)}
                  </td>
                  <td className="px-4 py-3 text-sm">{item.quantity}</td>
                  <td className="px-4 py-3 text-sm font-semibold">
                    {devis.currency === 'EUR' ? '€' : '$'} {item.totalPrice.toFixed(2)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* Totals */}
      <section className="border-t-2 border-green-600 pt-6">
        <div className="flex justify-between text-lg font-semibold mb-2">
          <span>Sous-total:</span>
          <span>{devis.currency === 'EUR' ? '€' : '$'} {devis.subtotal.toFixed(2)}</span>
        </div>
        <div className="flex justify-between text-3xl font-bold text-gray-800">
          <span>Total:</span>
          <span>{devis.currency === 'EUR' ? '€' : '$'} {devis.total.toFixed(2)}</span>
        </div>
      </section>

      {/* Actions */}
      <div className="flex justify-between gap-4 pt-6 border-t">
        <button
          onClick={onBack}
          className="px-6 py-3 bg-gray-600 text-white rounded-md font-medium hover:bg-gray-700 transition"
        >
          ← Modifier
        </button>
        <div className="flex gap-4">
          <button
            onClick={onReset}
            className="px-6 py-3 bg-red-600 text-white rounded-md font-medium hover:bg-red-700 transition"
          >
            Nouveau Devis
          </button>
          <button
            onClick={handleDownloadPDF}
            disabled={downloading}
            className="px-8 py-3 bg-green-600 text-white rounded-md font-medium hover:bg-green-700 disabled:bg-gray-300 disabled:cursor-not-allowed transition flex items-center gap-2"
          >
            {downloading ? (
              <>
                <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                </svg>
                Génération...
              </>
            ) : (
              <>
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M3 17a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm3.293-7.707a1 1 0 011.414 0L9 10.586V3a1 1 0 112 0v7.586l1.293-1.293a1 1 0 111.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z" clipRule="evenodd" />
                </svg>
                Télécharger PDF
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  )
}