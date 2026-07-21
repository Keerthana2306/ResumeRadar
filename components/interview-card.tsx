'use client'

import { motion } from 'framer-motion'
import { Briefcase, AlertCircle } from 'lucide-react'

interface InterviewCardProps {
  isLoading: boolean
}

const interviewTopics = ['React Architecture', 'Database Design', 'System Scalability', 'API Development']
const skillsToImprove = ['Docker & Containers', 'Cloud Services', 'GraphQL', 'Performance Optimization']

export function InterviewCard({ isLoading }: InterviewCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.6 }}
      className="bg-card border border-border rounded-2xl p-8 col-span-full"
    >
      <h3 className="text-lg font-semibold mb-6">Interview Readiness</h3>

      {isLoading ? (
        <div className="grid md:grid-cols-2 gap-8">
          {[1, 2].map((col) => (
            <div key={col} className="space-y-3">
              {[...Array(2)].map((_, i) => (
                <motion.div
                  key={i}
                  animate={{ opacity: [0.5, 1, 0.5] }}
                  transition={{ duration: 1.5, repeat: Infinity, delay: i * 0.1 }}
                  className="h-12 bg-secondary rounded-lg"
                />
              ))}
            </div>
          ))}
        </div>
      ) : (
        <div className="grid md:grid-cols-2 gap-8">
          {/* Interview Topics */}
          <div>
            <h4 className="font-semibold text-primary mb-4 flex items-center gap-2">
              <Briefcase size={18} />
              Likely Interview Topics
            </h4>
            <div className="space-y-2">
              {interviewTopics.map((topic, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.3 + i * 0.1 }}
                  className="p-3 bg-primary/5 border border-primary/20 rounded-lg text-sm font-medium text-foreground"
                >
                  • {topic}
                </motion.div>
              ))}
            </div>
          </div>

          {/* Skills to Improve */}
          <div>
            <h4 className="font-semibold text-warning mb-4 flex items-center gap-2">
              <AlertCircle size={18} />
              Skills Needing Improvement
            </h4>
            <div className="space-y-2">
              {skillsToImprove.map((skill, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.5 + i * 0.1 }}
                  className="p-3 bg-warning/5 border border-warning/20 rounded-lg text-sm font-medium text-foreground"
                >
                  • {skill}
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      )}
    </motion.div>
  )
}
