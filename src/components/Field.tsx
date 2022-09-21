import { useMemo } from "react"

import { IField } from "../interfaces/IField"

import '../styles/field.css'
import { COLORS } from "../theme"

/** Propriedades do campo */
interface FieldProps extends IField {
	/** linha do grid */
	row: number
	/** coluna do grid */
	col: number
	/** número de quadrados do grid */
	fieldCount: number
	/** evento para tratar clique com botão direito do mouse */
	onMark: () => void
	/** evento para tratar clique com botão esquerdo do mouse */
	onOpen: () => void
}

export function Field(props: FieldProps) {
	const { state, isBomb, row, col, bombsAround, fieldCount, onMark, onOpen } = props

	/** retorna a cor de fundo do quadrado */
	function bgColor() {
		if (state === 'opened' && isBomb)
			return COLORS.RED

		if ((row + col) % 2 === 0)
			return state === 'opened' ? COLORS.LIGHT_SAND : COLORS.LIGHT_GREEN

		return state === 'opened' ? COLORS.DARK_SAND : COLORS.DARK_GREEN
	}

	/** retorna a cor do texto do quadrado */
	const fieldColor = () => isBomb ? COLORS.BLACK : COLORS.FIELDS[bombsAround] ?? COLORS.BLACK

	/** calcula o tamanho do quadrado de acordo com a quantidade de campos total */
	const fieldSize = useMemo(() => {
		if (fieldCount <= 80)
			return 48
		else if (fieldCount <= 252)
			return 36
		else
			return 30
	}, [fieldCount])

	return (
		<div
			className='field'
			style={{
				backgroundColor: bgColor(),
				color: fieldColor(),
				height: `${fieldSize}px`,
				width: `${fieldSize}px`,
			}}
			onContextMenu={(e) => {
				e.preventDefault()
				onMark()
			}}
			onClick={onOpen}
		>
			{
				state === 'closed' ? '' :
					state === 'marked' ? <i className="fa-solid fa-flag marked-field" /> :
						isBomb ? <i className="fa-solid fa-bomb" /> :
							bombsAround === 0 ? '' : bombsAround
			}
		</div>
	)
}
