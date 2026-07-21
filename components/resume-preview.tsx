'use client'

import { motion } from 'framer-motion'
import { Copy, Download } from 'lucide-react'

interface ResumePreviewProps {
  isLoading: boolean
}

const resumeContent = `
ALEX JOHNSON
San Francisco, CA | (555) 123-4567 | alex.johnson@email.com | linkedin.com/in/alexjohnson

PROFESSIONAL SUMMARY
Experienced Full Stack Developer with 5+ years of expertise in React, Node.js, and cloud technologies. 
Passionate about building scalable applications and mentoring junior developers.

EXPERIENCE

Senior Full Stack Developer | Tech Company Inc.
Jan 2022 - Present
• Orchestrated migration of legacy system to React + TypeScript, improving performance by 40%
• Designed and implemented GraphQL API serving 2M+ daily users with 99.9% uptime
• Led technical interviews and mentored 3 junior developers, resulting in team growth and improved code quality
• Architected real-time notification system using WebSockets, reducing latency by 60%

Full Stack Developer | StartupXYZ
Jun 2020 - Dec 2021
• Developed responsive web application using React, Redux, and Tailwind CSS
• Built RESTful APIs with Node.js and Express, handling 10,000+ requests/day
• Implemented automated testing suite achieving 85% code coverage
• Collaborated with product team to deliver features 2 weeks ahead of schedule

TECHNICAL SKILLS
Languages: JavaScript, TypeScript, Python, SQL
Frontend: React, Redux, Next.js, Tailwind CSS, HTML/CSS
Backend: Node.js, Express, Django, RESTful APIs, GraphQL
Databases: PostgreSQL, MongoDB, Redis
DevOps: Docker, AWS, CI/CD pipelines, GitHub Actions
Tools: Git, Webpack, Jest, Figma, Jira

EDUCATION
Bachelor of Science in Computer Science
State University | Graduated: 2020
`

export function ResumePreview({ isLoading }: ResumePreviewProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.7 }}
      className="bg-card border border-border rounded-2xl p-8 col-span-full"
    >
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold">Improved Resume Preview</h3>
        <div className="flex gap-2">
          <button className="p-2 hover:bg-secondary rounded-lg transition-colors flex items-center gap-2 text-sm">
            <Copy size={18} />
            <span>Copy</span>
          </button>
          <button className="p-2 hover:bg-secondary rounded-lg transition-colors flex items-center gap-2 text-sm">
            <Download size={18} />
            <span>Download</span>
          </button>
        </div>
      </div>

      {isLoading ? (
        <div className="space-y-3">
          {[...Array(8)].map((_, i) => (
            <motion.div
              key={i}
              animate={{ opacity: [0.5, 1, 0.5] }}
              transition={{ duration: 1.5, repeat: Infinity, delay: i * 0.1 }}
              className="h-4 bg-secondary rounded-full w-full"
            />
          ))}
        </div>
      ) : (
        <div className="bg-white dark:bg-slate-900 text-black dark:text-white rounded-lg p-8 font-serif text-sm leading-relaxed max-h-96 overflow-y-auto border border-border">
          <motion.pre
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="whitespace-pre-wrap text-xs font-sans break-words"
          >
            {resumeContent}
          </motion.pre>
        </div>
      )}

      <p className="text-xs text-foreground/60 mt-4 text-center">
        Preview of your optimized resume. Copy or download to use in your application.
      </p>
    </motion.div>
  )
}
