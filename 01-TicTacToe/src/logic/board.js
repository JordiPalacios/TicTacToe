import {Winner_Combos} from "../constants.js"

export const checkWinnerFrom = (boardToCheck) => {
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