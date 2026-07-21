'use client'

import { motion } from 'framer-motion'
import { Star } from 'lucide-react'

const testimonials = [
  {
    name: 'Sarah Chen',
    role: 'Product Manager',
    content: 'ResumeRadar helped me land my dream job. The ATS optimization alone made a huge difference in getting past initial screenings.',
    avatar: 'SC',
  },
  {
    name: 'Marcus Williams',
    role: 'Software Engineer',
    content:
      'The skill gap analysis showed me exactly what I was missing. Within a month of improvements, I had 3 offers. Incredible ROI on my time.',
    avatar: 'MW',
  },
  {
    name: 'Elena Rodriguez',
    role: 'UX Designer',
    content: 'The interview preparation tips were spot-on. I felt so much more confident going into interviews after using ResumeRadar insights.',
    avatar: 'ER',
  },
]

export function Testimonials() {
  return (
    <section className="py-20 bg-secondary/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} className="text-center mb-16">
          <h2 className="text-4xl font-bold mb-4">Loved by Job Seekers</h2>
          <p className="text-xl text-foreground/70">See what our users have to say</p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              whileHover={{ y: -4 }}
              transition={{ delay: i * 0.1 }}
              viewport={{ once: true }}
              className="bg-card border border-border rounded-2xl p-8 hover:border-primary/50 transition-all"
            >
              <div className="flex gap-1 mb-4">
                {[...Array(5)].map((_, j) => (
                  <Star key={j} size={16} className="fill-primary text-primary" />
                ))}
              </div>

              <p className="text-foreground/80 mb-6 leading-relaxed">&quot;{testimonial.content}&quot;</p>

              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-primary/20 rounded-full flex items-center justify-center font-semibold text-primary">
                  {testimonial.avatar}
                </div>
                <div>
                  <div className="font-semibold">{testimonial.name}</div>
                  <div className="text-sm text-foreground/60">{testimonial.role}</div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
