'use client'

import { motion } from 'framer-motion'

interface MatchScoreCardProps {
  score: number
  isLoading: boolean
}

export function MatchScoreCard({ score, isLoading }: MatchScoreCardProps) {
  const circumference = 2 * Math.PI * 45
  const offset = circumference - (score / 100) * circumference

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.1 }}
      className="bg-card border border-border rounded-2xl p-8"
    >
      <h3 className="text-lg font-semibold mb-6">Resume Match Score</h3>

      {isLoading ? (
        <div className="flex justify-center py-12">
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
            className="w-24 h-24 border-4 border-primary/20 border-t-primary rounded-full"
          />
        </div>
      ) : (
        <div className="flex flex-col items-center gap-6">
          {/* Circular Progress */}
          <div className="relative w-40 h-40">
            <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
              {/* Background circle */}
              <circle cx="50" cy="50" r="45" fill="none" stroke="currentColor" strokeWidth="3" className="text-secondary" />

              {/* Progress circle */}
              <motion.circle
                cx="50"
                cy="50"
                r="45"
                fill="none"
                stroke="url(#gradient)"
                strokeWidth="3"
                strokeDasharray={circumference}
                initial={{ strokeDashoffset: circumference }}
                animate={{ strokeDashoffset: offset }}
                transition={{ duration: 1, ease: 'easeOut' }}
                strokeLinecap="round"
              />

              <defs>
                <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="var(--color-primary)" />
                  <stop offset="100%" stopColor="var(--color-primary)" opacity="0.6" />
                </linearGradient>
              </defs>
            </svg>

            {/* Score text */}
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="text-center">
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.5, type: 'spring', stiffness: 200 }}
                  className="text-4xl font-bold text-primary"
                >
                  {score}%
                </motion.div>
                <div className="text-xs text-foreground/60 mt-1">Match</div>
              </div>
            </div>

            {/* Glow effect */}
            <div className="absolute inset-0 rounded-full glow-blue opacity-50" />
          </div>

          {/* Description */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8 }}
            className="text-center text-foreground/70 max-w-xs"
          >
            Your resume has a {score}% match with the job description. Strong alignment on skills and keywords.
          </motion.p>
        </div>
      )}
    </motion.div>
  )
}
