import { Metadata } from 'next'
import './globals.css'
import { Inter } from 'next/font/google'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  metadataBase: new URL('https://momandme.clinic'),
  title: 'Mom & Me Clinic',
  description: 'Women, Kids and Teens Health Hub. Located in Room 611 Cebu Velez Medical Arts F. Ramos St., Cebu City',
  openGraph: {
    type: 'website',
    url: 'https://momandme.clinic',
    title: 'Mom & Me Clinic',
    description: 'Women, Kids and Teens Health Hub.',
    siteName: 'Mom & Me Clinic',
    images: [{
      url: 'https://momandme.clinic/og_image.png'
    }]
  }
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
