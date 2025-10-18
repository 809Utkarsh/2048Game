import React from 'react';
import Title from './Tile';

const Board = ({ board }) => (
  <div className="grid">
    {board.map((row, i) =>
      row.map((value, j) => <Title key={`${i} - ${j}`} value={value} />)
    )}
  </div>
);

export default Board;
