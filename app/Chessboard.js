// src/Chessboard.js
"use client";

// src/Chessboard.js
import React, { useState } from 'react';
import './Chessboard.css';

const initialBoard = [
  ['r', 'n', 'b', 'q', 'k', 'b', 'n', 'r'],
  ['p', 'p', 'p', 'p', 'p', 'p', 'p', 'p'],
  ...Array(4).fill(Array(8).fill(null)),
  ['P', 'P', 'P', 'P', 'P', 'P', 'P', 'P'],
  ['R', 'N', 'B', 'Q', 'K', 'B', 'N', 'R']
];

const pieceIcons = {
  r: '♜', n: '♞', b: '♝', q: '♛', k: '♚', p: '♟',
  R: '♖', N: '♘', B: '♗', Q: '♕', K: '♔', P: '♙'
};

function Chessboard() {
  const [board, setBoard] = useState(initialBoard);

  const handleClick = (row, col) => {
    console.log(`Clicked on (${row}, ${col})`);
    // Add game logic here
  };

  return (
    <div className="chessboard">
      {board.map((row, rowIndex) => (
        row.map((piece, colIndex) => (
          <div
            key={`${rowIndex}-${colIndex}`}
            className={`cell ${(rowIndex + colIndex) % 2 === 0 ? 'white' : 'black'}`}
            onClick={() => handleClick(rowIndex, colIndex)}
          >
            {piece && pieceIcons[piece]}
          </div>
        ))
      ))}
    </div>
  );
}

export default Chessboard;