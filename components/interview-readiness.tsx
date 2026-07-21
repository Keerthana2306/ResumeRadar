'use client'

import { motion } from 'framer-motion'
import { CheckSquare, HelpCircle } from 'lucide-react'

interface InterviewReadinessProps {
  interviewQuestions: string[]
  topicsToRevise: string[]
  isLoading?: boolean
}

export function InterviewReadiness({ interviewQuestions, topicsToRevise }: InterviewReadinessProps) {

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.05 },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: { opacity: 1, y: 0 },
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.3 }}
      className="bg-card border border-border rounded-2xl p-8 hover:border-primary/50 transition-all"
    >
      <h2 className="text-2xl font-bold mb-8">Interview Readiness</h2>

      <div className="grid md:grid-cols-2 gap-8">
        {/* Likely Interview Questions */}
        <div>
          <h3 className="font-semibold text-lg mb-6 flex items-center gap-2">
            <HelpCircle size={20} className="text-primary" />
            Likely Interview Questions
          </h3>
          <motion.div
            className="space-y-3"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            {interviewQuestions.map((question, i) => (
              <motion.div
                key={i}
                variants={itemVariants}
                className="p-4 bg-secondary/50 border border-border rounded-lg hover:border-primary/50 hover:bg-secondary transition-all cursor-pointer group"
              >
                <p className="text-sm font-medium text-foreground group-hover:text-primary transition-colors">
                  {question}
                </p>
              </motion.div>
            ))}
          </motion.div>
        </div>

        {/* Topics to Revise */}
        <div>
          <h3 className="font-semibold text-lg mb-6 flex items-center gap-2">
            <CheckSquare size={20} className="text-warning" />
            Topics to Revise
          </h3>
          <motion.div
            className="space-y-3"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            {topicsToRevise.map((topic, i) => (
              <motion.div
                key={i}
                variants={itemVariants}
                className="p-4 bg-warning/10 border border-warning/30 rounded-lg hover:bg-warning/20 transition-all group cursor-pointer"
              >
                <div className="flex items-start gap-3">
                  <CheckSquare size={18} className="text-warning mt-1 flex-shrink-0" />
                  <p className="text-sm font-medium text-foreground">{topic}</p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </motion.div>
  )
}
