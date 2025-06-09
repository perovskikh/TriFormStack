import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { Toaster } from 'react-hot-toast'

const inter = Inter({ subsets: ['latin', 'cyrillic'] })

export const metadata: Metadata = {
  title: 'TriFormStack - Строительные материалы',
  description: 'Качественные строительные материалы: профнастил, металлочерепица, сайдинг. Лучшие цены и быстрая доставка.',
  keywords: 'строительные материалы, профнастил, металлочерепица, сайдинг, кровля',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="ru">
      <body className={inter.className}>
        {children}
        <Toaster position="top-right" />
      </body>
    </html>
  )
}