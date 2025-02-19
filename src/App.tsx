import { useState } from "react";
import "./App.css";

type Player = "X" | "O" | null;
type Board = Player[];
type WinningCombo = number[] | null;

const WINNING_COMBINATIONS = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];

function App() {
  const [board, setBoard] = useState<Board>(Array(9).fill(null));
  const [currentPlayer, setCurrentPlayer] = useState<"X" | "O">("X");
  const [winner, setWinner] = useState<Player>(null);
  const [winningCombo, setWinningCombo] = useState<WinningCombo>(null);

  const checkWinner = (boardState: Board): [Player, number[] | null] => {
    for (const combo of WINNING_COMBINATIONS) {
      const [a, b, c] = combo;
      if (
        boardState[a] &&
        boardState[a] === boardState[b] &&
        boardState[a] === boardState[c]
      ) {
        return [boardState[a], combo];
      }
    }
    return [null, null];
  };

  const handleClick = (index: number) => {
    if (board[index] || winner) return;

    const newBoard = [...board];
    newBoard[index] = currentPlayer;
    setBoard(newBoard);

    const [newWinner, winCombo] = checkWinner(newBoard);
    if (newWinner) {
      setWinningCombo(winCombo);
      setWinner(newWinner);
    } else {
      setCurrentPlayer(currentPlayer === "X" ? "O" : "X");
    }
  };

  const resetGame = () => {
    setBoard(Array(9).fill(null));
    setCurrentPlayer("X");
    setWinner(null);
    setWinningCombo(null);
  };

  const isDraw = !winner && board.every((cell) => cell !== null);

  return (
    <div className="game-container">
      <h1>Tic Tac Toe</h1>
      <div className="game-board">
        {board.map((cell, index) => (
          <button
            key={index}
            className={`cell ${cell ? `cell-${cell.toLowerCase()}` : ""} ${
              winningCombo?.includes(index) ? "winning-cell" : ""
            }`}
            onClick={() => handleClick(index)}
          >
            {cell}
          </button>
        ))}
      </div>
      <div className="game-info">
        {winner ? (
          <p className={`game-status winner-${winner?.toLowerCase()}`}>
            Winner: {winner}!
          </p>
        ) : isDraw ? (
          <p className="game-status">It's a draw!</p>
        ) : (
          <p className="game-status">Current player: {currentPlayer}</p>
        )}
        <button className="reset-button" onClick={resetGame}>
          Reset Game
        </button>
      </div>
    </div>
  );
}

export default App;
