'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronDown } from 'lucide-react'

const faqs = [
  {
    question: 'How does ResumeRadar analyze my resume?',
    answer:
      'Our AI engine uses advanced NLP algorithms to parse your resume and compare it against the job description you provide. It scores compatibility across formatting, keywords, skills, and readability metrics.',
  },
  {
    question: 'Is my resume data secure?',
    answer: 'Yes, your data is encrypted and never stored permanently. We use industry-standard security protocols and comply with GDPR and privacy regulations.',
  },
  {
    question: 'Can I use ResumeRadar for multiple jobs?',
    answer:
      'Absolutely! You can analyze your resume against as many job descriptions as you want. This helps you see which roles are best fits.',
  },
  {
    question: 'What file formats are supported?',
    answer: 'We support PDF, DOCX, and TXT files. You can also paste your resume directly into the text area.',
  },
  {
    question: 'Do you offer resume rewriting services?',
    answer:
      'Yes! Our AI provides specific suggestions to improve your resume. You can implement these changes yourself, or we can guide you through the process.',
  },
]

export function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null)

  return (
    <section id="faq" className="py-20">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} className="text-center mb-16">
          <h2 className="text-4xl font-bold mb-4">Frequently Asked Questions</h2>
          <p className="text-xl text-foreground/70">Everything you need to know</p>
        </motion.div>

        <div className="space-y-4">
          {faqs.map((faq, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.05 }}
              viewport={{ once: true }}
              className="bg-card border border-border rounded-xl overflow-hidden hover:border-primary/50 transition-colors"
            >
              <button
                onClick={() => setOpenIndex(openIndex === i ? null : i)}
                className="w-full px-6 py-4 flex items-center justify-between hover:bg-secondary/50 transition-colors text-left"
              >
                <span className="font-semibold text-foreground">{faq.question}</span>
                <motion.div animate={{ rotate: openIndex === i ? 180 : 0 }} transition={{ duration: 0.3 }}>
                  <ChevronDown className="text-primary" size={20} />
                </motion.div>
              </button>

              <AnimatePresence>
                {openIndex === i && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.3 }}
                    className="border-t border-border px-6 py-4 bg-secondary/30"
                  >
                    <p className="text-foreground/70">{faq.answer}</p>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
