'use client'

import React, { forwardRef } from 'react'

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string
  error?: string
  prefix?: string
  suffix?: string
  helpText?: string
}

const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ label, error, prefix, suffix, helpText, className = '', ...props }, ref) => {
    return (
      <div className="space-y-1">
        <label className="block text-sm font-medium text-gray-700">
          {label}
        </label>
        
        <div className="relative">
          {prefix && (
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <span className="text-gray-500 text-sm">{prefix}</span>
            </div>
          )}
          
          <input
            ref={ref}
            className={`
              input-field
              ${prefix ? 'pl-8' : ''}
              ${suffix ? 'pr-12' : ''}
              ${error ? 'border-red-500 focus:ring-red-500' : ''}
              ${className}
            `}
            {...props}
          />
          
          {suffix && (
            <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
              <span className="text-gray-500 text-sm">{suffix}</span>
            </div>
          )}
        </div>
        
        {helpText && !error && (
          <p className="text-xs text-gray-500">{helpText}</p>
        )}
        
        {error && (
          <p className="text-xs text-red-600">{error}</p>
        )}
      </div>
    )
  }
)

Input.displayName = 'Input'

// Currency Input Component
export interface CurrencyInputProps extends Omit<InputProps, 'prefix' | 'type'> {
  value: number
  onValueChange: (value: number) => void
}

export const CurrencyInput = forwardRef<HTMLInputElement, CurrencyInputProps>(
  ({ value, onValueChange, ...props }, ref) => {
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const numericValue = parseFloat(e.target.value.replace(/[^0-9.]/g, '')) || 0
      onValueChange(numericValue)
    }

    return (
      <Input
        ref={ref}
        type="text"
        prefix="$"
        value={value.toLocaleString()}
        onChange={handleChange}
        {...props}
      />
    )
  }
)

CurrencyInput.displayName = 'CurrencyInput'

// Percentage Input Component
export interface PercentageInputProps extends Omit<InputProps, 'suffix' | 'type'> {
  value: number
  onValueChange: (value: number) => void
  step?: number
  min?: number
  max?: number
}

export const PercentageInput = forwardRef<HTMLInputElement, PercentageInputProps>(
  ({ value, onValueChange, step = 0.1, min = 0, max = 100, ...props }, ref) => {
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const numericValue = parseFloat(e.target.value) || 0
      onValueChange(Math.min(Math.max(numericValue, min), max))
    }

    return (
      <Input
        ref={ref}
        type="number"
        suffix="%"
        value={value}
        onChange={handleChange}
        step={step}
        min={min}
        max={max}
        {...props}
      />
    )
  }
)

PercentageInput.displayName = 'PercentageInput'

// Number Input Component
export interface NumberInputProps extends Omit<InputProps, 'type'> {
  value: number
  onValueChange: (value: number) => void
  step?: number
  min?: number
  max?: number
}

export const NumberInput = forwardRef<HTMLInputElement, NumberInputProps>(
  ({ value, onValueChange, step = 1, min, max, ...props }, ref) => {
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      let numericValue = parseFloat(e.target.value) || 0
      if (min !== undefined) numericValue = Math.max(numericValue, min)
      if (max !== undefined) numericValue = Math.min(numericValue, max)
      onValueChange(numericValue)
    }

    return (
      <Input
        ref={ref}
        type="number"
        value={value}
        onChange={handleChange}
        step={step}
        min={min}
        max={max}
        {...props}
      />
    )
  }
)

NumberInput.displayName = 'NumberInput'

export default Input 