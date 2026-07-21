'use client'

import { motion } from 'framer-motion'
import { Copy, Download, Maximize2 } from 'lucide-react'

interface ResumePreviewImprovedProps {
  improvedResume: string
  isLoading?: boolean
}

export function ResumePreviewImproved({ improvedResume }: ResumePreviewImprovedProps) {
  const handleCopy = async () => {
    if (!improvedResume) return
    await navigator.clipboard.writeText(improvedResume)
  }

  const handleDownload = () => {
    if (!improvedResume) return
    const blob = new Blob([improvedResume], { type: 'text/plain' })
    const url = URL.createObjectURL(blob)
    const link = document.createElement('a')
    link.href = url
    link.download = 'improved-resume.txt'
    link.click()
    URL.revokeObjectURL(url)
  }
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.4 }}
      className="bg-card border border-border rounded-2xl overflow-hidden hover:border-primary/50 transition-all"
    >
      {/* Toolbar */}
      <div className="bg-secondary/50 border-b border-border px-6 py-4 flex items-center justify-between">
        <h2 className="text-lg font-semibold">Improved Resume</h2>
        <div className="flex items-center gap-2">
          <button
            onClick={handleCopy}
            className="p-2 hover:bg-secondary rounded-lg transition-colors text-foreground/60 hover:text-foreground"
            title="Copy"
          >
            <Copy size={18} />
          </button>
          <button
            onClick={handleDownload}
            className="p-2 hover:bg-secondary rounded-lg transition-colors text-foreground/60 hover:text-foreground"
            title="Download"
          >
            <Download size={18} />
          </button>
          <button
            className="p-2 hover:bg-secondary rounded-lg transition-colors text-foreground/60 hover:text-foreground"
            title="Expand"
          >
            <Maximize2 size={18} />
          </button>
        </div>
      </div>

      {/* Resume Content */}
      <div className="p-8">
        <div className="bg-white dark:bg-slate-50 text-slate-900 rounded-xl shadow-lg p-8 max-w-2xl mx-auto min-h-[600px] max-h-[800px] overflow-y-auto">
          <pre className="whitespace-pre-wrap font-sans text-sm text-slate-700 leading-relaxed">
            {improvedResume || 'No improved resume generated.'}
          </pre>
        </div>
      </div>

      {/* Info Text */}
      <div className="px-8 py-4 bg-secondary/30 border-t border-border text-xs text-foreground/60 text-center">
        Resume preview shows optimized formatting and recommended improvements
      </div>
    </motion.div>
  )
}
