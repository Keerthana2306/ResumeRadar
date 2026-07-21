'use client'

import { motion } from 'framer-motion'
import { Lightbulb } from 'lucide-react'

interface SuggestionsCardProps {
  isLoading: boolean
}

const suggestions = [
  { title: 'Add Quantifiable Metrics', description: 'Use numbers and percentages to showcase your achievements' },
  { title: 'Strengthen Action Verbs', description: 'Replace weak verbs with powerful action words like "orchestrated"' },
  { title: 'Optimize Formatting', description: 'Ensure consistent spacing and font sizes for ATS compatibility' },
  { title: 'Add Missing Keywords', description: 'Incorporate Docker, Kubernetes, and GraphQL naturally' },
  { title: 'Improve Summary', description: 'Your professional summary needs more specificity and keywords' },
]

export function SuggestionsCard({ isLoading }: SuggestionsCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.5 }}
      className="bg-card border border-border rounded-2xl p-8 col-span-full"
    >
      <h3 className="text-lg font-semibold mb-6">Resume Rewrite Suggestions</h3>

      {isLoading ? (
        <div className="space-y-3">
          {[...Array(5)].map((_, i) => (
            <motion.div
              key={i}
              animate={{ opacity: [0.5, 1, 0.5] }}
              transition={{ duration: 1.5, repeat: Infinity, delay: i * 0.1 }}
              className="h-16 bg-secondary rounded-lg"
            />
          ))}
        </div>
      ) : (
        <div className="space-y-3">
          {suggestions.map((suggestion, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 + i * 0.1 }}
              className="bg-secondary rounded-lg p-4 border border-border hover:border-primary/30 transition-colors flex gap-4"
            >
              <div className="flex-shrink-0">
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.4 + i * 0.1, type: 'spring', stiffness: 200 }}
                  className="w-8 h-8 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0"
                >
                  <span className="font-bold text-primary text-sm">{i + 1}</span>
                </motion.div>
              </div>
              <div className="flex-1 min-w-0">
                <h4 className="font-semibold text-foreground mb-1">{suggestion.title}</h4>
                <p className="text-sm text-foreground/70">{suggestion.description}</p>
              </div>
            </motion.div>
          ))}
        </div>
      )}
    </motion.div>
  )
}
