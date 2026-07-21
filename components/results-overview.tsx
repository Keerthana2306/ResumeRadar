'use client'

import { motion } from 'framer-motion'

interface ResultsOverviewProps {
  score: number
  atsScore: number
  summary: string
  isLoading?: boolean
}

export function ResultsOverview({ score, atsScore, summary, isLoading }: ResultsOverviewProps) {
  const CircularProgress = ({ value }: { value: number }) => {
    const circumference = 2 * Math.PI * 45
    const offset = circumference - (value / 100) * circumference

    return (
      <div className="relative w-32 h-32">
        <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
          <circle cx="50" cy="50" r="45" fill="none" stroke="currentColor" strokeWidth="3" className="text-secondary" />
          <motion.circle
            cx="50"
            cy="50"
            r="45"
            fill="none"
            stroke="currentColor"
            strokeWidth="3"
            className="text-primary"
            strokeDasharray={circumference}
            initial={{ strokeDashoffset: circumference }}
            animate={{ strokeDashoffset: offset }}
            transition={{ duration: 1.5, ease: 'easeOut' }}
            strokeLinecap="round"
          />
        </svg>
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="text-3xl font-bold text-primary">{value}%</span>
        </div>
      </div>
    )
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="bg-card border border-border rounded-2xl p-8 hover:border-primary/50 transition-all"
    >
      <h2 className="text-2xl font-bold mb-8">Overview</h2>

      <div className="grid md:grid-cols-3 gap-8 items-center">
        {/* Match Score */}
        <div className="flex flex-col items-center">
          <CircularProgress value={score} />
          <p className="text-foreground/60 text-sm mt-4">Resume Match Score</p>
        </div>

        {/* ATS Score */}
        <div className="flex flex-col items-center">
          <CircularProgress value={atsScore} />
          <p className="text-foreground/60 text-sm mt-4">ATS Compatibility</p>
        </div>

        {/* Summary */}
        <div className="flex flex-col justify-center">
          <p className="text-lg font-semibold mb-4 text-primary">Summary</p>
          <p className="text-foreground/70 leading-relaxed">
            {isLoading ? 'Analyzing your resume against the job description...' : summary || 'No summary available.'}
          </p>
        </div>
      </div>
    </motion.div>
  )
}
