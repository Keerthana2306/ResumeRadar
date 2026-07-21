'use client'

export function Logo({ className = '' }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 32 32"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      {/* Document outline */}
      <rect x="6" y="4" width="14" height="18" rx="1.5" stroke="currentColor" strokeWidth="1.5" fill="none" />
      
      {/* Document lines */}
      <line x1="9" y1="9" x2="17" y2="9" stroke="currentColor" strokeWidth="1" />
      <line x1="9" y1="13" x2="17" y2="13" stroke="currentColor" strokeWidth="1" />
      <line x1="9" y1="17" x2="14" y2="17" stroke="currentColor" strokeWidth="1" />
      
      {/* Radar pulse circles */}
      <circle cx="22" cy="20" r="4" stroke="currentColor" strokeWidth="1.2" fill="none" opacity="0.7" />
      <circle cx="22" cy="20" r="7" stroke="currentColor" strokeWidth="1" fill="none" opacity="0.4" />
      
      {/* Radar center dot */}
      <circle cx="22" cy="20" r="1.5" fill="currentColor" />
      
      {/* Radar pulse line */}
      <line x1="22" y1="13" x2="22" y2="27" stroke="currentColor" strokeWidth="1" opacity="0.5" />
    </svg>
  )
}
