'use client'

import { motion } from 'framer-motion'
import { ArrowRight, BarChart3, Zap, CheckCircle } from 'lucide-react'
import Link from 'next/link'

export function HeroSection() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.1,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: 'easeOut' },
    },
  }

  return (
    <div className="min-h-screen flex items-center justify-center overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <motion.div variants={containerVariants} initial="hidden" animate="visible" className="space-y-8">
            <motion.div variants={itemVariants} className="space-y-4">
              <h1 className="text-5xl sm:text-6xl font-bold tracking-tight text-foreground">
                Analyze, Optimize{' '}
                <span className="bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent">
                  & Match
                </span>{' '}
                Your Resume
              </h1>
              <p className="text-xl text-foreground/70 leading-relaxed">
                ResumeRadar uses AI to compare your resume with any job description, identify missing skills, improve ATS
                compatibility, rewrite your resume, and prepare you for interviews.
              </p>
            </motion.div>

            {/* CTA Buttons */}
            <motion.div variants={itemVariants} className="flex gap-4 flex-wrap">
              <motion.div whileHover={{ scale: 1.02, y: -2 }} whileTap={{ scale: 0.98 }}>
                <Link
                  href="/dashboard"
                  className="px-8 py-4 bg-primary text-primary-foreground rounded-xl hover:shadow-lg hover:shadow-primary/50 transition-all font-semibold flex items-center gap-2 group"
                >
                  Get Started
                  <ArrowRight className="group-hover:translate-x-1 transition-transform" size={20} />
                </Link>
              </motion.div>
              <motion.button
                whileHover={{ borderColor: '#3B82F6', backgroundColor: 'rgba(59, 130, 246, 0.1)' }}
                whileTap={{ scale: 0.98 }}
                className="px-8 py-4 border-2 border-border rounded-xl transition-all font-semibold"
              >
                Learn More
              </motion.button>
            </motion.div>
          </motion.div>

          {/* Right Illustration */}
          <motion.div
            initial={{ opacity: 0, x: 100 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1, ease: 'easeOut' }}
            className="relative hidden md:block"
          >
            <div className="relative">
              {/* Blurred background circles */}
              <div className="absolute inset-0">
                <motion.div
                  animate={{ y: [0, 20, 0], opacity: [0.3, 0.5, 0.3] }}
                  transition={{ duration: 8, repeat: Infinity }}
                  className="absolute w-80 h-80 bg-blue-400 rounded-full filter blur-3xl -top-20 -right-20"
                />
                <motion.div
                  animate={{ y: [0, -20, 0], opacity: [0.2, 0.4, 0.2] }}
                  transition={{ duration: 10, repeat: Infinity }}
                  className="absolute w-64 h-64 bg-primary rounded-full filter blur-3xl bottom-20 left-10"
                />
              </div>

              {/* Dashboard Illustration */}
              <motion.div
                animate={{ y: [0, 10, 0] }}
                transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
                className="relative z-10 bg-card border border-border rounded-2xl p-6 shadow-2xl glass"
              >
                <div className="space-y-4">
                  <div className="flex items-center gap-3 pb-4 border-b border-border">
                    <div className="w-3 h-3 rounded-full bg-primary"></div>
                    <div className="flex-1 h-2 bg-secondary rounded-full"></div>
                  </div>

                  <div className="space-y-3">
                    <div className="text-sm font-semibold text-foreground">Resume Match Score</div>
                    <div className="relative h-12 bg-secondary rounded-xl flex items-center justify-center">
                      <motion.div
                        initial={{ width: '0%' }}
                        animate={{ width: '87%' }}
                        transition={{ delay: 0.5, duration: 1.5 }}
                        className="absolute left-0 h-full bg-gradient-to-r from-primary to-primary/70 rounded-xl flex items-center justify-end pr-4"
                      >
                        <span className="text-sm font-bold text-primary-foreground">87%</span>
                      </motion.div>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-3 pt-4">
                    {[
                      { label: 'ATS Score', value: 89 },
                      { label: 'Skills Match', value: 87 },
                      { label: 'Keywords', value: 91 },
                      { label: 'Format', value: 85 },
                    ].map((item, i) => (
                      <motion.div
                        key={i}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.7 + i * 0.1 }}
                        className="bg-secondary rounded-lg p-3 text-center"
                      >
                        <div className="text-xs text-foreground/60 mb-1">{item.label}</div>
                        <div className="font-bold text-primary text-sm">{item.value}%</div>
                      </motion.div>
                    ))}
                  </div>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  )
}
