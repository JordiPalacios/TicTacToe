import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

const Turns = {
  X: 'X',
  O:'O'
}


const Square = ({children, isSelected, updateBoard, index}) => {
  const className = `square ${isSelected ? 'is-selected' : ''}`

  const handleClick = () => {
    updateBoard(index)
  }

  return (
    <div onClick={handleClick} className={className}>
      {children}
    </div>
  )
}

const Winner_Combos = [
  [0,1,2],
  [3,4,5],
  [6,7,8],
  [0,3,6],
  [1,4,7],
  [2,5,8],
  [0,4,8],
  [2,4,6]
]

function App() {
  const [board, setBoard] = useState(
    Array(9).fill(null)
  )
  const [turn, setTurn] = useState(Turns.X)
  // null es que no hay ganador y false es un empate
  const [winner, setWinner] = useState(null)

  const checkWinner = (boardToCheck) => {
    //revisamos todas las posibles combinaciones ganadoras
    //para ver si x u o ganó
    for (const combo of Winner_Combos) {
      const [a, b, c] = combo
      if (
        boardToCheck[a] && 
        boardToCheck[a] === boardToCheck[b] && 
        boardToCheck[a] === boardToCheck[c]
        ){
        return boardToCheck[a]
        }
    }
    //si no hay ganador
    return null
  }

  //funcion de reset del juego
  const resetGame = () => {
    setBoard(Array(9).fill(null))
    setTurn(Turns.X)
    setWinner(null)
  }
 
  const updateBoard = (index) => {
    // no actualizamos esta posicion
    // si ya tiene algo
    if (board[index] || winner) return
    // actualizar tablero
    const newBoard = [...board]
    newBoard[index] = turn
    setBoard(newBoard)
    // cambiar turno
    const newTurn = turn === Turns.X ? Turns.O : Turns.X
    setTurn(newTurn)
    //revisar si hyay un ganador
    const newWinner = checkWinner(newBoard)
    if (newWinner) {
      setWinner(newWinner)
    } //TODO: check if game is over
  }

  return (
    <main className="board">
      <h1>TicTacToe</h1>
      <section className="game">
        {
          board.map((_, index) => {
            return (
              <Square
              key={index}
              index={index}
              updateBoard={updateBoard}
              >
                {board[index]}
              </Square>
            )
          })
        }
      </section>
      <section className="turn">
        <Square isSelected = {turn === Turns.X}>
          {Turns.X}
        </Square>
        <Square isSelected = {turn === Turns.O}>
          {Turns.O}
        </Square> 
      </section>
      {/* si tenemos el null <> 0 significa que ya se ha resuelto la partida */}
      {
        winner !== null && (
          <section className='winner'>
            <div className="text">
              <h2>
                {
                  winner === false
                  ? '¡Empate!'
                  : '¡Ganó' + ' ' + winner + '!'
                }
              </h2>

              <header className="win">
                {winner && <Square>{winner}</Square>}
              </header>

              <footer>
                <button onClick={resetGame}>Empezar de nuevo</button>
              </footer>
            </div>
          </section>
        )
      }
    </main>
  )
}

export default App
