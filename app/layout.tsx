import './globals.css'
import { Inter } from 'next/font/google'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Mom & Me Clinic',
  description: 'Obstetrics and Gynecology services in Room 611 Cebu Velez Medical Arts F. Ramos St., Cebu City',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>{children}</body>
    </html>
  )
}
