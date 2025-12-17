"use client"
import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'

type Resultado = {
  score: number
  total: number
  results: Array<{ id: number; elegido: number | null; correcta: number }>
}

export default function ResultadosPage() {
  const router = useRouter()
  const [data, setData] = useState<Resultado | null>(null)

  useEffect(() => {
    const raw = localStorage.getItem('quiz_resultados')
    if (!raw) return
    try {
      setData(JSON.parse(raw))
    } catch (e) {
      console.error(e)
    }
  }, [])

  if (!data) {
    return (
      <div className="card">
        <p>No hay resultados guardados.</p>
        <div className="mt-4">
          <button onClick={() => router.push('/')} className="px-4 py-2 border rounded">Volver</button>
        </div>
      </div>
    )
  }

  const porcentaje = Math.round((data.score / data.total) * 100)

  return (
    <div className="card">
      <h2 className="text-2xl font-semibold">Resultados</h2>
      <p className="mt-2">Puntuación: <strong>{data.score}</strong> / {data.total} ({porcentaje}%)</p>

      <div className="mt-4">
        <h3 className="font-semibold">Resumen</h3>
        <ul className="mt-2 space-y-2 text-sm">
          {data.results.map((r, i) => (
            <li key={i} className="p-2 border rounded">
              <div>Pregunta ID: {r.id}</div>
              <div>Tu respuesta: {r.elegido === null ? 'Sin responder' : `Opción ${r.elegido + 1}`}</div>
              <div>Respuesta correcta: Opción {r.correcta + 1}</div>
              <div>Estado: {r.elegido === r.correcta ? <span className="text-green-600 font-semibold">Correcta</span> : <span className="text-red-600 font-semibold">Incorrecta</span>}</div>
            </li>
          ))}
        </ul>
      </div>

      <div className="mt-6 flex gap-3">
        <button onClick={() => { localStorage.removeItem('quiz_resultados'); router.push('/quiz') }} className="px-4 py-2 bg-indigo-600 text-white rounded">Reiniciar Quiz</button>
        <button onClick={() => { localStorage.removeItem('quiz_resultados'); router.push('/') }} className="px-4 py-2 border rounded">Volver al inicio</button>
      </div>
    </div>
  )
}
