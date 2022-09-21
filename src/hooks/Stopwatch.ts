import { useEffect, useState } from "react"

export function useStopwatch() {
	/** tempo decorrido */
	const [time, setTime] = useState(0)
	/** id do setTimeout */
	const [timeoutId, setTimeoutId] = useState<number>()
	/** indica se o cronômetro está "correndo" ou não */
	const [running, setRunning] = useState(false)

	/** minutos */
	const minutes = Math.floor(time / 60)
	/** segundos */
	const seconds = String(time % 60).padStart(2, '0')

	/** inicia o cronômetro */
	const start = () => setRunning(true)

	/** pausa o cronômetro */
	function stop() {
		setRunning(false)

		if (timeoutId)
		clearTimeout(timeoutId)
	}

	/** reinicia o cronômetro */
	const restart = () => setTime(0)

	useEffect(() => {
		if (running) {
			const id = setTimeout(() => setTime(state => state + 1), 1000)
			setTimeoutId(id)
		}
	}, [running, time])

	return {
		/** inicia o cronômetro */
		start,
		/** pausa o cronômetro */
		stop,
		/** reinicia o cronômetro */
		restart,
		/** tempo decorrido */
		time: `${minutes}:${seconds}`,
		/** indica se o cronômetro está "correndo" ou não */
		running
	}
}
