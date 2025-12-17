"use client"
import React, { useEffect, useState } from 'react'
import preguntasData from '../../data/preguntas.json'
import TarjetaPregunta from '../../components/TarjetaPregunta'
import Temporizador from '../../components/Temporizador'
import { useRouter } from 'next/navigation'

type Pregunta = typeof preguntasData.preguntas[number]

export default function QuizPage() {
  const router = useRouter()
  const preguntas: Pregunta[] = preguntasData.preguntas

  const [indice, setIndice] = useState(0)
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null)
  const [score, setScore] = useState(0)
  const [results, setResults] = useState<Array<{ id: number; elegido: number | null; correcta: number }>>([])
  const [disabled, setDisabled] = useState(false)
  const [useTimer] = useState(true) // enable optional timer; change to false to disable

  useEffect(() => {
    // init results
    setResults(preguntas.map(p => ({ id: p.id, elegido: null, correcta: p.respuestaCorrecta })))
  }, [])

  function handleSelect(i: number) {
    if (disabled) return
    setSelectedIndex(i)
    setDisabled(true)

    const pregunta = preguntas[indice]
    const nueva = [...results]
    nueva[indice] = { id: pregunta.id, elegido: i, correcta: pregunta.respuestaCorrecta }
    setResults(nueva)

    if (i === pregunta.respuestaCorrecta) setScore(s => s + 1)
  }

  function next() {
    setSelectedIndex(null)
    setDisabled(false)
    if (indice + 1 < preguntas.length) setIndice(indice + 1)
    else finish()
  }

  function finish() {
    // save results in localStorage and navigate to resultados
    const payload = { score, total: preguntas.length, results }
    localStorage.setItem('quiz_resultados', JSON.stringify(payload))
    router.push('/resultados')
  }

  function onTimeUp() {
    // mark as not answered, decrement score by 1 and advance
    const pregunta = preguntas[indice]
    const nueva = [...results]
    nueva[indice] = { id: pregunta.id, elegido: null, correcta: pregunta.respuestaCorrecta }
    setResults(nueva)
    setScore(s => Math.max(0, s - 1))
    setDisabled(true)
    setTimeout(() => {
      setDisabled(false)
      setIndice(i => (i + 1 < preguntas.length ? i + 1 : i))
    }, 500)
  }

  const preguntaActual = preguntas[indice]

  return (
    <div className="flex flex-col gap-6">
      <div className="flex justify-between items-center">
        <div className="text-sm">Puntuación: <strong>{score}</strong></div>
        <div className="text-sm">Pregunta {indice + 1} / {preguntas.length}</div>
      </div>

      {useTimer && (
        <Temporizador segundosIniciales={60} activo={!disabled} onTimeUp={onTimeUp} />
      )}

      <TarjetaPregunta
        preguntaObj={preguntaActual}
        indice={indice}
        total={preguntas.length}
        onSelect={handleSelect}
        selectedIndex={selectedIndex}
        disabled={disabled}
      />

      <div className="flex gap-3">
        {selectedIndex !== null || disabled ? (
          <button onClick={next} className="px-4 py-2 bg-indigo-600 text-white rounded">{indice + 1 < preguntas.length ? 'Siguiente' : 'Ver resultados'}</button>
        ) : (
          <button onClick={() => { setSelectedIndex(preguntaActual.respuestaCorrecta); handleSelect(preguntaActual.respuestaCorrecta) }} className="px-4 py-2 border rounded">Mostrar respuesta</button>
        )}
        <button onClick={() => { localStorage.removeItem('quiz_resultados'); router.push('/') }} className="px-4 py-2 border rounded">Salir</button>
      </div>
    </div>
  )
}
