/** Representa um quadrado do campo minado */
export interface IField {
	/** Estado do campo (fechado, marcado ou aberto) */
	state: 'closed' | 'marked' | 'opened'

	/** Indice se o campo é uma bomba */
	isBomb: boolean

	/** Número de bombas nos campos ao redor */
	bombsAround: number
}
