'use client'

import { motion } from 'framer-motion'
import { Check, X } from 'lucide-react'

interface SkillAnalysisProps {
  strengths: string[]
  missingSkills: string[]
  matchedKeywords: string[]
  missingKeywords: string[]
  isLoading?: boolean
}

export function SkillAnalysis({
  strengths,
  missingSkills,
  matchedKeywords,
  missingKeywords,
}: SkillAnalysisProps) {

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.05 },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: { opacity: 1, scale: 1 },
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.1 }}
      className="bg-card border border-border rounded-2xl p-8 hover:border-primary/50 transition-all"
    >
      <h2 className="text-2xl font-bold mb-8">Skill Analysis</h2>

      {/* Skills Section */}
      <div className="grid md:grid-cols-2 gap-8 mb-8 pb-8 border-b border-border">
        {/* Strengths */}
        <div>
          <h3 className="font-semibold text-foreground/80 mb-4 flex items-center gap-2">
            <span className="text-success">✓</span> Strengths
          </h3>
          <motion.div className="flex flex-wrap gap-3" variants={containerVariants} initial="hidden" animate="visible">
            {strengths.map((skill, i) => (
              <motion.div
                key={i}
                variants={itemVariants}
                className="bg-success/20 text-success rounded-full px-4 py-2 text-sm font-medium flex items-center gap-2 border border-success/30"
              >
                <Check size={14} />
                {skill}
              </motion.div>
            ))}
          </motion.div>
        </div>

        {/* Missing Skills */}
        <div>
          <h3 className="font-semibold text-foreground/80 mb-4 flex items-center gap-2">
            <span className="text-warning">○</span> Missing Skills
          </h3>
          <motion.div className="flex flex-wrap gap-3" variants={containerVariants} initial="hidden" animate="visible">
            {missingSkills.map((skill, i) => (
              <motion.div
                key={i}
                variants={itemVariants}
                className="border-2 border-warning/40 text-warning rounded-full px-4 py-2 text-sm font-medium flex items-center gap-2 bg-warning/5 hover:bg-warning/10 transition-colors"
              >
                {skill}
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>

      {/* Keywords Section */}
      <div>
        <h3 className="font-semibold text-lg mb-6">ATS Keywords</h3>
        <div className="grid md:grid-cols-2 gap-8">
          {/* Matched */}
          <div>
            <p className="text-foreground/60 text-sm mb-3">Matched Keywords</p>
            <motion.div className="flex flex-wrap gap-2" variants={containerVariants} initial="hidden" animate="visible">
              {matchedKeywords.map((keyword, i) => (
                <motion.div
                  key={i}
                  variants={itemVariants}
                  className="bg-success/20 text-success rounded-full px-3 py-1 text-xs font-medium"
                >
                  {keyword}
                </motion.div>
              ))}
            </motion.div>
          </div>

          {/* Missing */}
          <div>
            <p className="text-foreground/60 text-sm mb-3">Missing Keywords</p>
            <motion.div className="flex flex-wrap gap-2" variants={containerVariants} initial="hidden" animate="visible">
              {missingKeywords.map((keyword, i) => (
                <motion.div
                  key={i}
                  variants={itemVariants}
                  className="bg-warning/20 text-warning rounded-full px-3 py-1 text-xs font-medium"
                >
                  {keyword}
                </motion.div>
              ))}
            </motion.div>
          </div>
        </div>
      </div>
    </motion.div>
  )
}
