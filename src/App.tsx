import { useEffect, useState } from "react"

import { Field } from "./components/Field"
import { Header } from "./components/Header"
import { useStopwatch } from "./hooks/Stopwatch"
import { IField } from "./interfaces/IField"

import './styles/app.css'

export function App() {
	const [settings, setSettings] = useState({ rows: 10, columns: 10, bombs: 10 })
	const [grid, setGrid] = useState<IField[][]>([])
	const [gameOver, setGameOver] = useState(false)
	const [bombsMarked, setBombsMarked] = useState(0)

	const { rows, columns, bombs } = settings
	const { start, stop, restart, time, running } = useStopwatch()

	/** configura o campo minado de acordo com a dificuldade */
	function handleLevelChange(level: string) {
		setGameOver(false)
		setBombsMarked(0)
		restart()

		switch (level) {
			case 'medium': return setSettings({ rows: 14, columns: 18, bombs: 40 })
			case 'hard': return setSettings({ rows: 20, columns: 24, bombs: 99 })
			default: return setSettings({ rows: 8, columns: 10, bombs: 10 })
		}
	}

	useEffect(() => {
		const auxGrid = Array.from({ length: rows }, () => {
			return Array.from({ length: columns }, () => {
				return { state: 'closed', isBomb: false, bombsAround: 0 } as IField
			})
		})

		let bombCount = 0

		while (bombCount < bombs) {
			const [row, col] = [Math.floor(Math.random() * rows), Math.floor(Math.random() * columns)]

			if (!auxGrid[row][col].isBomb) {
				auxGrid[row][col].isBomb = true
				bombCount++

				getFieldNeighbors(row, col).forEach(neighbour => {
					const [r, c] = neighbour

					if (r > -1 && r < rows && c > -1 && c < columns)
						auxGrid[r][c].bombsAround++
				})
			}
		}

		setGrid(auxGrid)
	}, [rows, columns, bombs])

	/** retorna array com campos ao redor de um campo */
	const getFieldNeighbors = (r: number, c: number) => {
		return [
			[r - 1, c - 1], [r - 1, c], [r - 1, c + 1],
			[r, c - 1], [r, c + 1],
			[r + 1, c - 1], [r + 1, c], [r + 1, c + 1]
		]
	}

	/** marca campo com "bandeira" */
	function markField(row: number, col: number) {
		if (gameOver || grid[row][col].state === 'opened')
			return

		if (!running)
			start()

		const auxGrid = grid.slice()

		if (auxGrid[row][col].state === 'marked') {
			auxGrid[row][col].state = 'closed'
			setBombsMarked(state => state - 1)
		} else {
			if (bombsMarked === bombs)
				return

			auxGrid[row][col].state = 'marked'
			setBombsMarked(state => state + 1)
		}

		setGrid(auxGrid)
	}

	/** abre o campo e os adjacentes que não têm nenhuma bomba ao redor */
	function openField(row: number, col: number) {
		if (gameOver || ['opened', 'marked'].includes(grid[row][col].state))
			return

		if (!running)
			start()

		if (grid[row][col].isBomb) {
			revealBombs()
			setGameOver(true)
			return stop()
		}

		const auxGrid = grid.slice()

		function openAdjacent(r: number, c: number) {
			if (auxGrid[r][c].bombsAround === 0) {
				getFieldNeighbors(r, c).forEach(([x, y]) => {
					if (x > -1 && x < rows && y > -1 && y < columns) {
						if (auxGrid[x][y].state === 'opened')
							return

						if (auxGrid[x][y].state === 'marked')
							setBombsMarked(state => state - 1)

						auxGrid[x][y].state = 'opened'
						openAdjacent(x, y)
					}
				})
			}
		}

		auxGrid[row][col].state = 'opened'
		openAdjacent(row, col)
		setGrid(auxGrid)
		let opened = 0
		auxGrid.forEach(row => row.forEach(field => field.state === 'opened' && opened++))

		if (opened === ((rows * columns) - bombs)) {
			alert('Parebéns!!!')
			setGameOver(true)
			stop()
		}
	}

	/** revela a posição das bombas */
	function revealBombs() {
		const auxGrid = grid.slice()

		for (let i = 0; i < auxGrid.length; i++)
			for (let j = 0; j < auxGrid[i].length; j++)
				if (auxGrid[i][j].isBomb)
					auxGrid[i][j].state = 'opened'

		setGrid(auxGrid)
	}

	return (
		<div className="container">
			<div className="game-container">
				<h1 className="title">Campo Minado</h1>

				<Header bombs={bombs - bombsMarked} time={time} onChangeLevel={handleLevelChange} />

				<div>
					{ grid.map((row, i) => (
						<div key={i} className='grid-row'>
							{ row.map((column, j) => (
								<Field
									key={j}
									state={column.state}
									isBomb={column.isBomb}
									bombsAround={column.bombsAround}
									row={i}
									col={j}
									fieldCount={rows * columns}
									onMark={() => markField(i, j)}
									onOpen={() => openField(i, j)}
								/>
							)) }
						</div>
					)) }
				</div>
			</div>
		</div>
	)
}
