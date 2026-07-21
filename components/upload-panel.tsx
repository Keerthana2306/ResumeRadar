'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { InputSection } from './input-section'

interface UploadPanelProps {
  onAnalyze: (resume: string, jobDescription: string) => void
  isLoading: boolean
}

export function UploadPanel({ onAnalyze, isLoading }: UploadPanelProps) {
  const [resume, setResume] = useState('')
  const [jobDescription, setJobDescription] = useState('')

  const handleAnalyze = () => {
    if (resume.trim() && jobDescription.trim()) {
      onAnalyze(resume, jobDescription)
    }
  }

  const canAnalyze = resume.trim().length > 0 && jobDescription.trim().length > 0

  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: 0.2 }}
      className="space-y-8"
    >
      {/* Resume Section */}
      <InputSection
        title="Resume"
        placeholder="Paste your complete resume here..."
        value={resume}
        onChange={setResume}
        defaultTab="upload"
      />

      {/* Job Description Section */}
      <InputSection
        title="Job Description"
        placeholder="Paste the complete job description here..."
        value={jobDescription}
        onChange={setJobDescription}
        defaultTab="paste"
      />

      {/* Action Buttons */}
      <div className="flex gap-3 pt-4">
        <motion.button
          whileHover={{ scale: canAnalyze ? 1.02 : 1 }}
          whileTap={{ scale: canAnalyze ? 0.98 : 1 }}
          onClick={handleAnalyze}
          disabled={!canAnalyze || isLoading}
          className={`flex-1 py-3 rounded-xl font-semibold transition-all ${
            canAnalyze
              ? 'bg-primary text-primary-foreground hover:shadow-lg hover:shadow-primary/50'
              : 'bg-secondary text-foreground/50 cursor-not-allowed'
          }`}
        >
          {isLoading ? (
            <motion.span animate={{ opacity: [1, 0.5, 1] }} transition={{ duration: 1.5, repeat: Infinity }}>
              Analyzing...
            </motion.span>
          ) : (
            'Analyze Resume'
          )}
        </motion.button>
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={() => {
            setResume('')
            setJobDescription('')
          }}
          className="px-6 py-3 border-2 border-border rounded-xl hover:bg-secondary transition-all font-semibold"
        >
          Clear
        </motion.button>
      </div>

      <p className="text-xs text-foreground/60 text-center">
        ✓ Your data is encrypted and never stored permanently
      </p>
    </motion.div>
  )
}
