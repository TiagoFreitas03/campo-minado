import { useEffect, useState } from "react"

import '../styles/header.css'

/** propriedades do header */
interface HeaderProps {
	/** número de bombas restantes no jogo */
	bombs: number
	/** tempo de partida */
	time: string
	/** evento para tratar quando houver uma mudança no nível selecionado */
	onChangeLevel: (level: string) => void
}

export function Header({ bombs, time, onChangeLevel }: HeaderProps) {
	const [level, setLevel] = useState('easy')

	useEffect(() => {
		onChangeLevel(level)
	}, [level])

	return (
		<header>
			<div>
				<select value={level} onChange={e => setLevel(e.target.value)}>
					<option value="easy">Fácil</option>
					<option value="medium">Médio</option>
					<option value="hard">Díficil</option>
				</select>
			</div>

			<div className="clock">
				<i className="fa-regular fa-clock" />

				<p>{time}</p>
			</div>

			<div className="bombs-count">
				<i className="fa-solid fa-flag" />

				<p>{bombs}</p>
			</div>
		</header>
	)
}
