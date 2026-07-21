'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { Logo } from './logo'

export function DashboardNavbar() {
  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
      className="sticky top-0 z-50 bg-card/80 backdrop-blur-md border-b border-border"
    >
      <div className="px-6 h-16 flex justify-between items-center">
        {/* Left */}
        <div className="flex items-center gap-8">
          <Link href="/" className="flex items-center gap-2 font-semibold hover:opacity-80 transition-opacity">
            <div className="w-8 h-8 text-primary">
              <Logo className="w-full h-full" />
            </div>
            <span>ResumeRadar</span>
          </Link>
          <span className="text-foreground/60">Dashboard</span>
        </div>
      </div>
    </motion.nav>
  )
}
