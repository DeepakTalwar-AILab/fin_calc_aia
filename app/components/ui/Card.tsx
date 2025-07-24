'use client'

import React, { ReactNode } from 'react'

export interface CardProps {
  children: ReactNode
  title?: string
  className?: string
  padding?: 'sm' | 'md' | 'lg'
}

export default function Card({ children, title, className = '', padding = 'md' }: CardProps) {
  const paddingClasses = {
    sm: 'p-4',
    md: 'p-6',
    lg: 'p-8'
  }

  return (
    <div className={`card ${paddingClasses[padding]} ${className}`}>
      {title && (
        <h3 className="section-title">{title}</h3>
      )}
      {children}
    </div>
  )
} 