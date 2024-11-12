import { Children, useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
// import './App.css'

const TURNS = {
  x: "x",
  o: "o",
};

const WINNER_COMBOS = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];

const Square = ({ children, isSelected, updateBoard, index }) => {
  const className = `square ${isSelected ? "is-selected" : ""}`;

  const handleClick = () => {
    updateBoard(index);
  };

  return (
    <div onClick={handleClick} className={className} key={index}>
      {children}
    </div>
  );
};

function App() {
  //Inicializamos el estado del tablero
  const [board, setBoard] = useState(Array(9).fill(null));

  //Inicializamos el estado del turno
  const [turn, setTurn] = useState(TURNS.x);

  //Inicializamos un estado para saber si hay ganador
  const [winner, setWinner] = useState(null);
  //Función para saber si hay una combinación ganadora
  const checkWinner = (boardToCheck) => {
    for (const combo of WINNER_COMBOS) {
      const [a, b, c] = combo;

      if (
        boardToCheck[a] &&
        boardToCheck[a] === boardToCheck[b] &&
        boardToCheck[a] === boardToCheck[c]
      ) {
        return boardToCheck[a];
      }
    }

    return null;
  };

  const resetGame = () => {
    setBoard(Array(9).fill(null));
    setTurn(TURNS.x);
    setWinner(null);
  };

  const checkEndGame = (newBoard) => {
    return newBoard.every((square) => square != null);
  };

  //Función que actualiza el tablero, el turno
  const updateBoard = (index) => {
    //No dejamos que se pinte una nueva ficha en un casillero ocupado
    if (board[index] || winner) return;

    //Comprobamos si hay ganador
    if (board[index]) {
    }

    //Actualizamos el tablero
    const newBoard = [...board];
    newBoard[index] = turn;
    setBoard(newBoard);

    //Cambiar el estado del turno
    const newTurn = turn === TURNS.x ? TURNS.o : TURNS.x;
    setTurn(newTurn);

    const newWinner = checkWinner(newBoard);

    if (newWinner) {
      setWinner(newWinner);
    } else if (checkEndGame(newBoard)) {
      setWinner(false);
    }
  };

  return (
    <>
      <main className="board">
        <h1>Tres en raya</h1>
        <button onClick={resetGame}>Reset</button>
        <section className="game">
          {board.map((h, index) => {
            return (
              <Square key={index} index={index} updateBoard={updateBoard}>
                {board[index]}
              </Square>
            );
          })}
        </section>

        <section className="turn">
          <Square isSelected={turn === TURNS.x}>{TURNS.x}</Square>
          <Square isSelected={turn === TURNS.o}>{TURNS.o}</Square>
        </section>

        {winner != null && (
          <section className="winner">
            <div className="text">
              <h2>{winner === false ? "Empate" : "Ganó"}</h2>

              <header className="win">
                {winner && <Square>{winner}</Square>}
              </header>

              <footer>
                <button onClick={resetGame}>Empezar otra vez</button>
              </footer>
            </div>
          </section>
        )}
      </main>
    </>
  );
}

export default App;
