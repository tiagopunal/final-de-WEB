import React from 'react'
import OpcionRespuesta from './OpcionRespuesta'

type Pregunta = {
  id: number
  pregunta: string
  opciones: string[]
  respuestaCorrecta: number
  explicacion?: string
}

type Props = {
  preguntaObj: Pregunta
  indice: number
  total: number
  onSelect: (i: number) => void
  selectedIndex: number | null
  disabled: boolean
}

export default function TarjetaPregunta({ preguntaObj, indice, total, onSelect, selectedIndex, disabled }: Props) {
  return (
    <div className="card animate-float">
      <div className="flex justify-between items-start mb-4">
        <div>
          <h2 className="text-lg font-semibold">Pregunta {indice + 1} / {total}</h2>
          <p className="mt-2 text-muted">{preguntaObj.pregunta}</p>
        </div>
        <div>
          <span className="chip">{indice + 1} / {total}</span>
        </div>
      </div>

      <div className="flex flex-col gap-3">
        {preguntaObj.opciones.map((op, i) => {
          const isCorrect = selectedIndex !== null ? i === preguntaObj.respuestaCorrecta : false
          const isSelected = selectedIndex === i
          return (
            <OpcionRespuesta
              key={i}
              index={i}
              texto={op}
              disabled={disabled}
              isSelected={isSelected && !isCorrect}
              isCorrect={isCorrect}
              onClick={onSelect}
            />
          )
        })}
      </div>

      {selectedIndex !== null && (
        <div className="mt-4 text-sm text-muted">
          <p>
            {selectedIndex === preguntaObj.respuestaCorrecta ? (
              <span className="text-green-300 font-semibold">¡Correcto!</span>
            ) : (
              <span className="text-red-300 font-semibold">Incorrecto.</span>
            )}
          </p>
          {preguntaObj.explicacion && <p className="mt-2">{preguntaObj.explicacion}</p>}
        </div>
      )}
    </div>
  )
}
