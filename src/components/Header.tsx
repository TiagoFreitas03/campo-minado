import { useState, useEffect } from 'react'

import '../styles/header.css'

import { clock, flag } from "../assets"

/** proprieades do header */
interface HeaderProps {
	/** número de bombas restantes no jogo */
	bombs: number
	/** tempo de partida */
	time: string
	/** evento para tratar quando houver uma mudança no nível selecionado */
	onChangeLevel: (level: string) => void
}

/** cabeçalho do jogo */
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

			<div id='clock'>
				<img src={clock} alt="" width={28} height={28} />

				<p>{time}</p>
			</div>

			<div id='bombs'>
				<img src={flag} alt="" width={28} height={28} />

				<p>{bombs}</p>
			</div>
		</header>
	)
}
