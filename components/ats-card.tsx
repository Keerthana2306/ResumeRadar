'use client'

import { motion } from 'framer-motion'
import { CheckCircle, AlertCircle } from 'lucide-react'

interface ATSCardProps {
  isLoading: boolean
}

const metrics = [
  { label: 'Formatting', score: 92, status: 'excellent' },
  { label: 'Keyword Coverage', score: 87, status: 'excellent' },
  { label: 'Readability', score: 85, status: 'good' },
  { label: 'Action Verbs', score: 78, status: 'good' },
]

export function ATSCard({ isLoading }: ATSCardProps) {
  const overallScore = Math.round(metrics.reduce((sum, m) => sum + m.score, 0) / metrics.length)

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.2 }}
      className="bg-card border border-border rounded-2xl p-8 col-span-full lg:col-span-1"
    >
      <h3 className="text-lg font-semibold mb-6">ATS Compatibility Score</h3>

      {isLoading ? (
        <div className="space-y-4">
          {[...Array(4)].map((_, i) => (
            <motion.div
              key={i}
              animate={{ opacity: [0.5, 1, 0.5] }}
              transition={{ duration: 1.5, repeat: Infinity, delay: i * 0.1 }}
              className="h-12 bg-secondary rounded-lg"
            />
          ))}
        </div>
      ) : (
        <div className="space-y-4">
          {/* Overall Score */}
          <div className="mb-6">
            <div className="flex justify-between items-center mb-2">
              <span className="text-sm font-medium">Overall Score</span>
              <span className="text-2xl font-bold text-primary">{overallScore}%</span>
            </div>
            <div className="h-3 bg-secondary rounded-full overflow-hidden">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${overallScore}%` }}
                transition={{ delay: 0.3, duration: 1 }}
                className="h-full bg-gradient-to-r from-primary to-primary/70 rounded-full"
              />
            </div>
          </div>

          {/* Metrics */}
          <div className="grid grid-cols-2 gap-3">
            {metrics.map((metric, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 + i * 0.1 }}
                className="bg-secondary rounded-lg p-3"
              >
                <div className="flex items-start gap-2 mb-2">
                  {metric.status === 'excellent' ? (
                    <CheckCircle className="text-success flex-shrink-0 mt-0.5" size={16} />
                  ) : (
                    <AlertCircle className="text-warning flex-shrink-0 mt-0.5" size={16} />
                  )}
                  <div className="flex-1 min-w-0">
                    <div className="text-xs font-medium text-foreground/70 truncate">{metric.label}</div>
                    <div className="text-sm font-bold text-primary">{metric.score}%</div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      )}
    </motion.div>
  )
}
