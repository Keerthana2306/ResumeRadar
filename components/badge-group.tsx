'use client'

import { motion } from 'framer-motion'

interface BadgeGroupProps {
  title: string
  badges: string[]
  isLoading: boolean
  variant?: 'success' | 'warning'
}

export function BadgeGroup({ title, badges, isLoading, variant = 'success' }: BadgeGroupProps) {
  const bgColor = variant === 'success' ? 'bg-success/10' : 'bg-warning/10'
  const textColor = variant === 'success' ? 'text-success' : 'text-warning'
  const borderColor = variant === 'success' ? 'border-success/30' : 'border-warning/30'

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.3 }}
      className="bg-card border border-border rounded-2xl p-8"
    >
      <h3 className="text-lg font-semibold mb-6">{title}</h3>

      {isLoading ? (
        <div className="flex flex-wrap gap-2">
          {[...Array(6)].map((_, i) => (
            <motion.div
              key={i}
              animate={{ opacity: [0.5, 1, 0.5] }}
              transition={{ duration: 1.5, repeat: Infinity, delay: i * 0.1 }}
              className="h-8 w-20 bg-secondary rounded-full"
            />
          ))}
        </div>
      ) : (
        <div className="flex flex-wrap gap-2">
          {badges.length > 0 ? (
            badges.map((badge, i) => (
              <motion.span
                key={i}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.4 + i * 0.05 }}
                className={`inline-block px-3 py-1.5 rounded-full text-sm font-medium border ${bgColor} ${textColor} ${borderColor}`}
              >
                {badge}
              </motion.span>
            ))
          ) : (
            <p className="text-foreground/60 text-sm">No {title.toLowerCase()} found</p>
          )}
        </div>
      )}
    </motion.div>
  )
}
