// Chessboard.js

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
  const [selectedPiece, setSelectedPiece] = useState(null);
  const [turn, setTurn] = useState('white');

  const isMoveLegal = (start, end, piece) => {
    const [startRow, startCol] = start;
    const [endRow, endCol] = end;

    if (board[endRow][endCol] && board[endRow][endCol].toUpperCase() === board[endRow][endCol] === (piece === piece.toUpperCase())) {
      return false; // Cannot capture own pieces
    }

    switch (piece.toLowerCase()) {
      case 'p':
        const direction = piece === 'p' ? 1 : -1;
        const startRowHome = piece === 'p' ? 1 : 6;
        if (startCol === endCol && !board[endRow][endCol]) {
          return (endRow === startRow + direction) || 
                 (startRow === startRowHome && endRow === startRow + 2 * direction && !board[startRow + direction][endCol]);
        }
        if (Math.abs(startCol - endCol) === 1 && endRow === startRow + direction && board[endRow][endCol]) {
          return true; // Capture
        }
        break;
      case 'r':
        return (startRow === endRow || startCol === endCol) && isPathClear(start, end);
      case 'b':
        return Math.abs(startRow - endRow) === Math.abs(startCol - endCol) && isPathClear(start, end);
      case 'q':
        return (startRow === endRow || startCol === endCol || Math.abs(startRow - endRow) === Math.abs(startCol - endCol)) && isPathClear(start, end);
      case 'k':
        return Math.abs(startRow - endRow) <= 1 && Math.abs(startCol - endCol) <= 1;
      case 'n':
        return (Math.abs(startRow - endRow) === 2 && Math.abs(startCol - endCol) === 1) || (Math.abs(startRow - endRow) === 1 && Math.abs(startCol - endCol) === 2);
      default:
        return false;
    }
    return false;
  };

  const isPathClear = (start, end) => {
    const [startRow, startCol] = start;
    const [endRow, endCol] = end;
    const rowStep = endRow > startRow ? 1 : endRow < startRow ? -1 : 0;
    const colStep = endCol > startCol ? 1 : endCol < startCol ? -1 : 0;
    let row = startRow + rowStep;
    let col = startCol + colStep;

    while (row !== endRow || col !== endCol) {
      if (board[row][col]) return false;
      row += rowStep;
      col += colStep;
    }
    return true;
  };

  const handleClick = (row, col) => {
    const piece = board[row][col];

    if (selectedPiece) {
      const [startRow, startCol] = selectedPiece;
      const movingPiece = board[startRow][startCol];

      if (isMoveLegal(selectedPiece, [row, col], movingPiece)) {
        const newBoard = board.map(r => r.slice());
        newBoard[row][col] = movingPiece;
        newBoard[startRow][startCol] = null;
        setBoard(newBoard);
        setTurn(turn === 'white' ? 'black' : 'white');
      }
      setSelectedPiece(null);
    } else if (piece && ((turn === 'white' && piece === piece.toUpperCase()) || (turn === 'black' && piece === piece.toLowerCase()))) {
      setSelectedPiece([row, col]);
    }
  };

  return (
    <div className="chessboard">
      {board.map((row, rowIndex) =>
        row.map((piece, colIndex) => (
          <div
            key={`${rowIndex}-${colIndex}`}
            className={`cell ${(rowIndex + colIndex) % 2 === 0 ? 'white' : 'black'} ${selectedPiece && selectedPiece[0] === rowIndex && selectedPiece[1] === colIndex ? 'selected' : ''}`}
            onClick={() => handleClick(rowIndex, colIndex)}
          >
            {piece && pieceIcons[piece]}
          </div>
        ))
      )}
    </div>
  );
}

export default Chessboard;