'use client'

import { motion } from 'framer-motion'
import { ArrowRight } from 'lucide-react'

import type { Recommendation } from '@/lib/types/analysis'

interface RecommendationsTimelineProps {
  recommendations: Recommendation[]
  isLoading?: boolean
}

export function RecommendationsTimeline({ recommendations }: RecommendationsTimelineProps) {

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1, delayChildren: 0.2 },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: { opacity: 1, x: 0 },
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.2 }}
      className="bg-card border border-border rounded-2xl p-8 hover:border-primary/50 transition-all"
    >
      <h2 className="text-2xl font-bold mb-8">AI Resume Improvements</h2>

      <motion.div
        className="space-y-6"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {recommendations.map((rec, i) => (
          <motion.div
            key={i}
            variants={itemVariants}
            className="flex gap-6 group"
          >
            {/* Timeline circle */}
            <div className="flex flex-col items-center flex-shrink-0">
              <div className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center font-bold text-primary border-2 border-primary">
                {i + 1}
              </div>
              {i < recommendations.length - 1 && (
                <div className="w-1 h-12 bg-gradient-to-b from-primary/50 to-primary/10 mt-2"></div>
              )}
            </div>

            {/* Content */}
            <div className="flex-1 pt-2 pb-4">
              <h3 className="font-semibold text-lg mb-2 group-hover:text-primary transition-colors">
                {rec.title}
              </h3>
              <p className="text-foreground/70 leading-relaxed">{rec.description}</p>
            </div>

            {/* Arrow */}
            <motion.div
              className="flex items-center pt-2 text-primary opacity-0 group-hover:opacity-100 transition-opacity"
              whileHover={{ x: 4 }}
            >
              <ArrowRight size={20} />
            </motion.div>
          </motion.div>
        ))}
      </motion.div>
    </motion.div>
  )
}
