'use client'

import { motion } from 'framer-motion'
import { FileText } from 'lucide-react'

export function EmptyState() {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5 }}
      className="bg-gradient-to-br from-secondary to-secondary/50 rounded-2xl p-12 text-center min-h-96 flex flex-col items-center justify-center border-2 border-dashed border-border"
    >
      <motion.div
        animate={{ y: [0, -10, 0] }}
        transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
        className="mb-6"
      >
        <div className="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center mx-auto">
          <FileText className="text-primary" size={40} />
        </div>
      </motion.div>

      <h2 className="text-2xl font-bold mb-2">No Analysis Yet</h2>
      <p className="text-foreground/70 max-w-sm mb-8">
        Upload your resume and paste a job description to generate AI-powered insights about your match and recommendations
        for improvement.
      </p>

      <motion.div
        animate={{ opacity: [0.5, 1] }}
        transition={{ duration: 2, repeat: Infinity }}
        className="text-sm text-primary font-medium"
      >
        ↓ Get started by uploading your resume ↓
      </motion.div>
    </motion.div>
  )
}
