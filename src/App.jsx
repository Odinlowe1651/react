import { useState } from 'react'
import './App.css'

function App() {
  // Estados del juego
  const [jugadorElige, setJugadorElige] = useState('')
  const [computadoraElige, setComputadoraElige] = useState('')
  const [resultado, setResultado] = useState('')
  const [puntajeJugador, setPuntajeJugador] = useState(0)
  const [puntajeComputadora, setPuntajeComputadora] = useState(0)
  const [juegoActivo, setJuegoActivo] = useState(false)

  // Opciones del juego
  const opciones = [
    { nombre: 'piedra', emoji: '👊', id: 'piedra' },
    { nombre: 'papel', emoji: '📄', id: 'papel' },
    { nombre: 'tijeras', emoji: '✂️', id: 'tijeras' }
  ]

  // Función para determinar el ganador
  const determinarGanador = (jugador, computadora) => {
    if (jugador === computadora) {
      return 'empate'
    }
    
    if (
      (jugador === 'piedra' && computadora === 'tijeras') ||
      (jugador === 'papel' && computadora === 'piedra') ||
      (jugador === 'tijeras' && computadora === 'papel')
    ) {
      return 'jugador'
    } else {
      return 'computadora'
    }
  }

  // Función para jugar
  const jugar = (eleccionJugador) => {
    // Generar elección aleatoria de la computadora
    const eleccionComputadora = opciones[Math.floor(Math.random() * 3)].id
    
    // Determinar ganador
    const ganador = determinarGanador(eleccionJugador, eleccionComputadora)
    
    // Actualizar estados
    setJugadorElige(eleccionJugador)
    setComputadoraElige(eleccionComputadora)
    setJuegoActivo(true)
    
    // Actualizar resultado y puntajes
    if (ganador === 'empate') {
      setResultado('¡Empate! 🤝')
    } else if (ganador === 'jugador') {
      setResultado('¡Ganaste! 🎉')
      setPuntajeJugador(puntajeJugador + 1)
    } else {
      setResultado('¡Perdiste! 😅')
      setPuntajeComputadora(puntajeComputadora + 1)
    }
  }

  // Función para reiniciar el juego
  const reiniciarJuego = () => {
    setJugadorElige('')
    setComputadoraElige('')
    setResultado('')
    setPuntajeJugador(0)
    setPuntajeComputadora(0)
    setJuegoActivo(false)
  }

  // Función para nueva ronda
  const nuevaRonda = () => {
    setJugadorElige('')
    setComputadoraElige('')
    setResultado('')
    setJuegoActivo(false)
  }

  // Obtener emoji de la opción
  const obtenerEmoji = (opcion) => {
    const encontrada = opciones.find(o => o.id === opcion)
    return encontrada ? encontrada.emoji : '❓'
  }

  return (
    <div className="App">
      <div className="game-container">
        <h1>👊📄✂️ Piedra, Papel y Tijeras</h1>
        
        {/* Marcador */}
        <div className="scoreboard">
          <div className="score">
            <h3>🙋‍♂️ Tú</h3>
            <span className="points">{puntajeJugador}</span>
          </div>
          <div className="vs">VS</div>
          <div className="score">
            <h3>🤖 CPU</h3>
            <span className="points">{puntajeComputadora}</span>
          </div>
        </div>

        {/* Área de juego */}
        {juegoActivo ? (
          <div className="game-result">
            <div className="choices">
              <div className="choice">
                <h4>Tu elección</h4>
                <div className="choice-display">
                  {obtenerEmoji(jugadorElige)}
                </div>
                <p>{jugadorElige}</p>
              </div>
              
              <div className="vs-symbol">VS</div>
              
              <div className="choice">
                <h4>CPU eligió</h4>
                <div className="choice-display">
                  {obtenerEmoji(computadoraElige)}
                </div>
                <p>{computadoraElige}</p>
              </div>
            </div>
            
            <div className="result">
              <h2>{resultado}</h2>
            </div>
            
            <div className="game-buttons">
              <button onClick={nuevaRonda} className="play-again-btn">
                🔄 Nueva Ronda
              </button>
              <button onClick={reiniciarJuego} className="reset-btn">
                🆕 Reiniciar Juego
              </button>
            </div>
          </div>
        ) : (
          <div className="game-options">
            <h3>¡Elige tu opción!</h3>
            <div className="options">
              {opciones.map((opcion) => (
                <button
                  key={opcion.id}
                  onClick={() => jugar(opcion.id)}
                  className="option-btn"
                  title={opcion.nombre}
                >
                  <span className="option-emoji">{opcion.emoji}</span>
                  <span className="option-name">{opcion.nombre}</span>
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Reglas del juego */}
        <div className="rules">
          <details>
            <summary>📜 ¿Cómo jugar?</summary>
            <ul>
              <li>👊 Piedra vence a ✂️ Tijeras</li>
              <li>📄 Papel vence a 👊 Piedra</li>
              <li>✂️ Tijeras vence a 📄 Papel</li>
            </ul>
          </details>
        </div>
      </div>
    </div>
  )
}

export default App