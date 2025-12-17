import '../styles/globals.css'
import React from 'react'

export const metadata = {
  title: 'Proyecto Quiz',
  description: 'Quiz interactivo con Next.js'
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es">
      <body>
        <main className="min-h-screen flex items-center justify-center p-6">
          <div className="w-full max-w-3xl">{children}</div>
        </main>
      </body>
    </html>
  )
}
