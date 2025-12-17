import React from 'react'
import Link from 'next/link'

export default function PantallaInicio() {
  return (
    <div className="w-full">
      <div className="hero">
        <div className="floating-circle" aria-hidden />
        <div className="flex items-start justify-between gap-6">
          <div className="flex-1">
            <div className="flex items-center gap-4">
              <div>
                <h1 className="title">Quiz Interactivo</h1>
                <p className="subtitle">Prueba tus conocimientos con preguntas cortas y retroalimentación instantánea.</p>
              </div>
              <div className="hidden sm:block">
                <svg width="84" height="84" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden>
                  <rect width="24" height="24" rx="6" fill="#fff" opacity="0.06" />
                  <path d="M12 7.5V12L14.2 13.6" stroke="#7C3AED" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
                  <circle cx="12" cy="12" r="8" stroke="#06B6D4" strokeWidth="1.2" />
                </svg>
              </div>
            </div>
            <div className="mt-4 flex gap-3">
              <span className="badge">10 preguntas</span>
              <span className="badge" style={{ background: 'linear-gradient(90deg, #FB7185, #FDE68A)' }}>Retroalimentación</span>
            </div>
          </div>
          <div className="flex gap-3 items-center">
            <Link href="/quiz" className="btn-primary">Comenzar</Link>
            <a href="https://nextjs.org/docs" target="_blank" rel="noreferrer" className="btn-outline">Docs</a>
          </div>
        </div>
      </div>

      <div className="mt-6">
        <div className="card">
          <h2 className="text-xl font-semibold">¿Listo para empezar?</h2>
          <p className="mt-2 text-muted">Cuando comiences, tendrás un tiempo por pregunta y retroalimentación inmediata.</p>
        </div>
      </div>
    </div>
  )
}
