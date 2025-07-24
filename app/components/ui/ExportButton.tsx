'use client'

import React, { useState } from 'react'
import { CalculatorResults } from '../../lib/types/calculator'
import { useTheme } from '../../lib/contexts/ThemeContext'

interface ExportButtonProps {
  results: CalculatorResults
}

export default function ExportButton({ results }: ExportButtonProps) {
  const { theme } = useTheme()
  const [isExporting, setIsExporting] = useState(false)

  const handlePrint = () => {
    window.print()
  }

  const handleExportPDF = async () => {
    setIsExporting(true)
    
    // Create a clean summary for export
    const exportData = {
      recommendation: results.comparison.recommendation,
      confidence: results.comparison.confidenceLevel,
      monthlyDifference: results.comparison.monthlyDifference,
      breakEven: results.comparison.breakEvenPoint,
      netWorthDifference: results.comparison.netWorthDifference,
      buyMonthlyCost: results.buyScenario.totalMonthlyCost,
      rentMonthlyCost: results.rentScenario.totalMonthlyCost,
      keyFactors: results.comparison.keyFactors,
      timestamp: new Date().toLocaleDateString(),
    }

    // Create downloadable JSON
    const dataStr = JSON.stringify(exportData, null, 2)
    const dataUri = 'data:application/json;charset=utf-8,'+ encodeURIComponent(dataStr)
    
    const exportFileDefaultName = `buy-vs-rent-analysis-${new Date().toISOString().split('T')[0]}.json`
    
    const linkElement = document.createElement('a')
    linkElement.setAttribute('href', dataUri)
    linkElement.setAttribute('download', exportFileDefaultName)
    linkElement.click()
    
    setTimeout(() => setIsExporting(false), 1000)
  }

  const handleShare = async () => {
    const shareData = {
      title: 'Buy vs Rent Analysis',
      text: `My recommendation: ${results.comparison.recommendation} with ${results.comparison.confidenceLevel.toLowerCase()} confidence. Monthly difference: $${Math.abs(results.comparison.monthlyDifference)} ${results.comparison.monthlyDifference > 0 ? 'more to buy' : 'more to rent'}.`,
      url: window.location.href,
    }

    if (navigator.share) {
      try {
        await navigator.share(shareData)
      } catch (err) {
        console.log('Error sharing:', err)
      }
    } else {
      // Fallback: copy to clipboard
      await navigator.clipboard.writeText(`${shareData.text} ${shareData.url}`)
      alert('Analysis copied to clipboard!')
    }
  }

  return (
    <div className="flex items-center space-x-2">
      {/* Print Button */}
      <button
        onClick={handlePrint}
        className="btn-secondary flex items-center space-x-2 text-sm"
        title="Print Analysis"
      >
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-1a2 2 0 00-2-2H9a2 2 0 00-2 2v1a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z" />
        </svg>
        <span>Print</span>
      </button>

      {/* Export Button */}
      <button
        onClick={handleExportPDF}
        disabled={isExporting}
        className="btn-secondary flex items-center space-x-2 text-sm"
        title="Export Analysis"
      >
        {isExporting ? (
          <div className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin" />
        ) : (
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
          </svg>
        )}
        <span>{isExporting ? 'Exporting...' : 'Export'}</span>
      </button>

      {/* Share Button */}
      <button
        onClick={handleShare}
        className="btn-primary flex items-center space-x-2 text-sm"
        title="Share Analysis"
      >
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.367 2.684 3 3 0 00-5.367-2.684z" />
        </svg>
        <span>Share</span>
      </button>
    </div>
  )
} 