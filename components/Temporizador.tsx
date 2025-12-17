import React, { useEffect, useState } from 'react'

type Props = {
  segundosIniciales: number
  activo: boolean
  onTimeUp: () => void
}

export default function Temporizador({ segundosIniciales, activo, onTimeUp }: Props) {
  const [segundos, setSegundos] = useState(segundosIniciales)

  useEffect(() => {
    if (!activo) return
    setSegundos(segundosIniciales)
  }, [activo, segundosIniciales])

  useEffect(() => {
    if (!activo) return
    if (segundos <= 0) {
      onTimeUp()
      return
    }
    const id = setInterval(() => setSegundos(s => s - 1), 1000)
    return () => clearInterval(id)
  }, [activo, segundos, onTimeUp])

  const pct = Math.max(0, (segundos / segundosIniciales) * 100)

  return (
    <div className="w-full">
      <div className="flex justify-between items-center mb-1">
        <span className="text-sm">Tiempo: {segundos}s</span>
        <span className="text-sm text-muted">{Math.round(pct)}%</span>
      </div>
      <div className="progress">
        <div className="bar" style={{ width: `${pct}%` }} />
      </div>
    </div>
  )
}
