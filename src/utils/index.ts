import { IField } from "../interfaces/IField"

/**
 * retorna array com campos ao redor de um campo
 * @param row Número da linha
 * @param col Número da coluna
 */
export const getFieldNeighbors = (row: number, col: number) => {
	return [
		[row - 1, col - 1],
		[row - 1, col],
		[row - 1, col + 1],
		[row, col - 1],
		[row, col + 1],
		[row + 1, col - 1],
		[row + 1, col],
		[row + 1, col + 1]
	]
}

/**
 * abre todos os campos com bomba no grid
 * @param grid Grid do jogo
 */
export function revealBombs(grid: IField[][]) {
	for (let i = 0; i < grid.length; i++)
		for (let j = 0; j < grid[i].length; j++)
			if (grid[i][j].isBomb)
				grid[i][j].state = 'opened'

	return grid
}
