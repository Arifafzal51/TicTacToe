import React, { useState, useEffect } from 'react';
import './App.css';

function App() {
  const [board, setBoard] = useState(Array(9).fill(null));
  const [isXNext, setIsXNext] = useState(true);
  const [scores, setScores] = useState({ X: 0, O: 0 });

  useEffect(() => {
    const storedScores = JSON.parse(localStorage.getItem('scores'));
    if (storedScores) {
      setScores(storedScores);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('scores', JSON.stringify(scores));
  }, [scores]);

  const handleClick = (index) => {
    if (board[index] || calculateWinner(board)) return;

    const newBoard = board.slice();
    newBoard[index] = isXNext ? 'X' : 'O';
    setBoard(newBoard);
    setIsXNext(!isXNext);

    const winner = calculateWinner(newBoard);
    if (winner) {
      setScores({
        ...scores,
        [winner]: scores[winner] + 1,
      });
    }
  };

  const calculateWinner = (board) => {
    const lines = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];

    for (let i = 0; i < lines.length; i++) {
      const [a, b, c] = lines[i];
      if (board[a] && board[a] === board[b] && board[a] === board[c]) {
        return board[a];
      }
    }
    return null;
  };

  const renderSquare = (index) => (
    <button className={`square ${board[index] === 'X' ? 'blue' : 'red'}`} onClick={() => handleClick(index)}>
      {board[index]}
    </button>
  );

  return (
    <div className="tic-tac-toe">
      <div className="scoreboard">
        <div className="score blue">Player X (Blue): {scores.X}</div>
        <div className="score red">Player O (Red): {scores.O}</div>
      </div>
      <div className="board">
        {Array(9).fill(null).map((_, index) => renderSquare(index))}
      </div>
      <button className="reset-button" onClick={() => setBoard(Array(9).fill(null))}>Reset Board</button>
    </div>
  );
}

export default App;
