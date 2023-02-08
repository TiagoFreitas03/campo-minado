import { useMemo } from "react"

import '../styles/field.css'

import { bomb, flag } from "../assets"
import { IField } from "../interfaces/IField"

/** Propriedades do campo */
interface FieldProps extends IField {
	/** número de quadrados do grid */
	fieldCount: number
	/** evento para tratar clique com botão direito do mouse */
	onMark: () => void
	/** evento para tratar clique com botão esquerdo do mouse */
	onOpen: () => void
}

/** cor do número de bombas ao redor */
const COLORS = ['#FFFFFF', '#0A9396', '#005F73', '#CA6702', '#BB3E03', '#AE2012', '#9B2226']

/** campo do grid */
export function Field(props: FieldProps) {
	const { state, isBomb, bombsAround, fieldCount, onMark, onOpen } = props

	/** calcula o tamanho do quadrado de acordo com a quantidade de campos total */
	const fieldSize = useMemo(() => {
		return fieldCount <= 80 ? 48 :
			fieldCount <= 252 ? 36 : 30
	}, [fieldCount])

	return (
		<div
			className={`field ${state}`}
			style={{
				color: COLORS[bombsAround] ?? '#000000',
				height: `${fieldSize}px`,
				width: `${fieldSize}px`,
				cursor: state === 'closed' ? 'pointer' : 'default'
			}}
			onContextMenu={(e) => {
				e.preventDefault()
				onMark()
			}}
			onClick={onOpen}
		>
			{
				state === 'closed' ? '' :
					state === 'marked' ? <img src={flag} /> :
						isBomb ? <img src={bomb} /> :
							bombsAround === 0 ? '' : bombsAround
			}
		</div>
	)
}
