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
    updateBoard()
  }

  return (
    <div onClick={handleClick} className={className}>
      {children}
    </div>
  )
}

function App() {
  const [board, setBoard] = useState(Array(9).fill(null))

  const [turn, setTurn] = useState(Turns.X)

  const updateBoard = () => {
    const newTurn = turn === Turns.X ? Turns.O : Turns.X
    const newBoard = [...setBoard]
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
    </main>
  )
}

export default App
