'use client'

import { motion } from 'framer-motion'
import { Upload, FileText, Brain, Sparkles } from 'lucide-react'

const steps = [
  {
    icon: Upload,
    title: 'Upload Resume',
    description: 'Paste your resume or upload your PDF/DOCX file',
  },
  {
    icon: FileText,
    title: 'Paste Job Description',
    description: 'Share the job description you&apos;re interested in',
  },
  {
    icon: Brain,
    title: 'AI Analysis',
    description: 'Our AI analyzes both documents in real-time',
  },
  {
    icon: Sparkles,
    title: 'Get Insights',
    description: 'Receive personalized recommendations and improvements',
  },
]

export function HowItWorks() {
  return (
    <section id="how-it-works" className="py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} className="text-center mb-16">
          <h2 className="text-4xl font-bold mb-4">How It Works</h2>
          <p className="text-xl text-foreground/70">Four simple steps to optimize your resume</p>
        </motion.div>

        <div className="grid md:grid-cols-4 gap-6">
          {steps.map((step, i) => {
            const Icon = step.icon
            return (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                whileHover={{ y: -4 }}
                transition={{ delay: i * 0.1 }}
                viewport={{ once: true }}
                className="relative"
              >
                {/* Arrow connector */}
                {i < steps.length - 1 && (
                  <div className="hidden md:block absolute left-1/2 top-1/4 w-12 h-1 bg-gradient-to-r from-primary to-transparent transform translate-x-12" />
                )}

                <div className="bg-card border-2 border-border rounded-2xl p-8 text-center hover:border-primary/50 transition-colors h-full">
                  <div className="flex justify-center mb-6">
                    <motion.div
                      animate={{ y: [0, -5, 0] }}
                      transition={{ duration: 2, repeat: Infinity, delay: i * 0.2 }}
                      className="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center"
                    >
                      <Icon className="text-primary" size={32} />
                    </motion.div>
                  </div>
                  <h3 className="text-xl font-semibold mb-2">{step.title}</h3>
                  <p className="text-foreground/70 text-sm">{step.description}</p>
                </div>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
