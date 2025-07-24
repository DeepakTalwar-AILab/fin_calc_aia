import type { Metadata } from 'next'
import './globals.css'
import { ThemeProvider } from './lib/contexts/ThemeContext'

export const metadata: Metadata = {
  title: 'Buy vs Rent Calculator',
  description: 'A comprehensive financial calculator to help you decide between buying and renting a home',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className="min-h-screen theme-transition">
        <ThemeProvider>
          <main className="container mx-auto px-4 py-8">
            {children}
          </main>
        </ThemeProvider>
      </body>
    </html>
  )
} 