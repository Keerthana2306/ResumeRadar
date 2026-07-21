'use client'

import { motion } from 'framer-motion'
import { BarChart3, Zap, Target, Search, Edit, Briefcase } from 'lucide-react'

const features = [
  {
    icon: BarChart3,
    title: 'Resume Match Score',
    description: 'Get a comprehensive compatibility score comparing your resume against job descriptions.',
  },
  {
    icon: Zap,
    title: 'ATS Compatibility',
    description: 'Ensure your resume passes applicant tracking systems with optimized formatting and keywords.',
  },
  {
    icon: Target,
    title: 'Skill Gap Detection',
    description: 'Identify missing skills and get personalized recommendations for improvement.',
  },
  {
    icon: Search,
    title: 'Keyword Analysis',
    description: 'Discover critical keywords from job descriptions and integrate them into your resume.',
  },
  {
    icon: Edit,
    title: 'Resume Rewrite',
    description: 'Get AI-powered suggestions to improve language, formatting, and impact.',
  },
  {
    icon: Briefcase,
    title: 'Interview Readiness',
    description: 'Prepare for interviews with AI-generated topics based on your resume and job description.',
  },
]

export function FeaturesSection() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6 },
    },
  }

  return (
    <section id="features" className="py-20 bg-secondary/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} className="text-center mb-16">
          <h2 className="text-4xl font-bold mb-4">Powerful Features</h2>
          <p className="text-xl text-foreground/70">Everything you need to optimize your resume</p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {features.map((feature, i) => {
            const Icon = feature.icon
            return (
              <motion.div
                key={i}
                variants={itemVariants}
                whileHover={{ y: -8 }}
                className="bg-card border border-border rounded-2xl p-8 hover:border-primary/50 transition-all group"
              >
                <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center mb-6 group-hover:bg-primary/20 transition-colors">
                  <Icon className="text-primary" size={24} />
                </div>
                <h3 className="text-xl font-semibold mb-3">{feature.title}</h3>
                <p className="text-foreground/70">{feature.description}</p>
              </motion.div>
            )
          })}
        </motion.div>
      </div>
    </section>
  )
}
