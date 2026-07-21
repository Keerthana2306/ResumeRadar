'use client'

import { motion } from 'framer-motion'

interface KeywordsCardProps {
  isLoading: boolean
}

const matchedKeywords = ['React', 'TypeScript', 'Tailwind CSS', 'Next.js', 'Database', 'REST API']
const missingKeywords = ['Docker', 'Kubernetes', 'GraphQL', 'AWS', 'CI/CD']

export function KeywordsCard({ isLoading }: KeywordsCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.4 }}
      className="bg-card border border-border rounded-2xl p-8 col-span-full"
    >
      <h3 className="text-lg font-semibold mb-6">ATS Keywords</h3>

      {isLoading ? (
        <div className="grid md:grid-cols-2 gap-8">
          {[1, 2].map((col) => (
            <div key={col} className="space-y-3">
              {[...Array(3)].map((_, i) => (
                <motion.div
                  key={i}
                  animate={{ opacity: [0.5, 1, 0.5] }}
                  transition={{ duration: 1.5, repeat: Infinity, delay: i * 0.1 }}
                  className="h-8 w-32 bg-secondary rounded-full"
                />
              ))}
            </div>
          ))}
        </div>
      ) : (
        <div className="grid md:grid-cols-2 gap-8">
          {/* Matched Keywords */}
          <div>
            <h4 className="font-semibold text-success mb-4 flex items-center gap-2">
              <span className="w-3 h-3 bg-success rounded-full"></span>
              Matched Keywords
            </h4>
            <div className="flex flex-wrap gap-2">
              {matchedKeywords.map((keyword, i) => (
                <motion.span
                  key={i}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.3 + i * 0.05 }}
                  className="px-3 py-1.5 bg-success/10 text-success rounded-full text-sm font-medium border border-success/30"
                >
                  {keyword}
                </motion.span>
              ))}
            </div>
          </div>

          {/* Missing Keywords */}
          <div>
            <h4 className="font-semibold text-warning mb-4 flex items-center gap-2">
              <span className="w-3 h-3 bg-warning rounded-full"></span>
              Missing Keywords
            </h4>
            <div className="flex flex-wrap gap-2">
              {missingKeywords.map((keyword, i) => (
                <motion.span
                  key={i}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.5 + i * 0.05 }}
                  className="px-3 py-1.5 bg-warning/10 text-warning rounded-full text-sm font-medium border border-warning/30"
                >
                  {keyword}
                </motion.span>
              ))}
            </div>
          </div>
        </div>
      )}
    </motion.div>
  )
}
