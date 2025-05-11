import { type ReactNode } from 'react'
import './globals.css'

interface RootLayoutProps {
  children: ReactNode
}

export const metadata = {
  title: 'v0 App',
  description: 'Created with v0',
  generator: 'v0.dev',
}

export default function RootLayout({
  children,
}: RootLayoutProps) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
} 