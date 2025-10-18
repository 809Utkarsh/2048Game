import React, { useEffect, useState } from 'react';
import Board from './Board';

import {
  createEmptyBoard,
  assTitle,
  moveleft,
  moveRight,
  moveup,
  moveDown,
  hasmoves,
  getScore,
} from '../logic/game';

import '../styles/GamePage.css';

const Game = () => {
  const [board, setBoard] = useState([]);
  const [score, setScore] = useState(0);

  const initGame = () => {
    let newBoard = createEmptyBoard();
    newBoard = assTitle(assTitle(newBoard));
    setBoard(newBoard);
    setScore(0);
  };

  useEffect(() => {
    initGame();
  }, []);

  useEffect(() => {
    const handleKey = (e) => {
      let newBoard = board;
      if (e.key === 'ArrowLeft') newBoard = moveleft(board);
      if (e.key === 'ArrowRight') newBoard = moveRight(board);
      if (e.key === 'ArrowUp') newBoard = moveup(board);
      if (e.key === 'ArrowDown') newBoard = moveDown(board);

      if (JSON.stringify(newBoard) !== JSON.stringify(board)) {
        const boardWithNewTile = assTitle(newBoard);
        setBoard(boardWithNewTile);
        setScore(getScore(boardWithNewTile));
        if (!hasmoves(boardWithNewTile)) alert('Game Over!');
      }
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [board]);

  return (
    <div className="game-container">
      <h2>2048 Game</h2>
      <p>Score: {score}</p>
      <Board board={board} />
      <button onClick={initGame} className="restart-btn">
        Restart
      </button>
    </div>
  );
};

export default Game;
