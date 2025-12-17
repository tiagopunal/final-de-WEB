import React from 'react'

type Props = {
  index: number
  texto: string
  disabled?: boolean
  isSelected?: boolean
  isCorrect?: boolean
  onClick: (i: number) => void
}

export default function OpcionRespuesta({ index, texto, disabled = false, isSelected = false, isCorrect = false, onClick }: Props) {
  const base = 'option'
  let extra = ''

  if (isCorrect) extra = 'is-correct'
  else if (isSelected) extra = 'is-wrong'

  const disabledClass = disabled ? 'opacity-60 cursor-not-allowed' : ''

  const icon = isCorrect ? '✓' : isSelected ? '✕' : ''

  return (
    <button
      className={`${base} ${extra} ${disabledClass}`}
      disabled={disabled}
      onClick={() => onClick(index)}
    >
      <span className="text">{texto}</span>
      <span className="icon" aria-hidden>{icon}</span>
    </button>
  )
}
