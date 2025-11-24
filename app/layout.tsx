import './globals.css'
import Nav from '../components/Nav'
import Providers from './providers'
import type { ReactNode } from 'react'

export const metadata = { title: 'NextAuth Mongo Demo' }

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body>
        <Providers>
          <Nav />
          <main className="max-w-4xl mx-auto p-6">{children}</main>
        </Providers>
      </body>
    </html>
  )
}
