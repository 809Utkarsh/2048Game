export const createEmptyBoard = (size = 4) =>
  Array.from({ length: size }, () => Array(size).fill(0));

export const assTitle = (board) => {
  const emptyCells = [];
  board.forEach((row, i) =>
    row.forEach((cell, j) => cell === 0 && emptyCells.push([i, j]))
  );

  if (emptyCells.length === 0) return board;
  const [x, y] = emptyCells[Math.floor(Math.random() * emptyCells.length)];
  board[x][y] = Math.random() < 0.9 ? 2 : 4;
  return board;
};

// slinding and merging the row
export const slideTile = (row) => {
  const filtered = row.filter((num) => num != 0);
  const merged = [];
  let skip = false;

  for (let i = 0; i < filtered.length; i++) {
    if (skip) {
      skip = false;
      continue;
    }
    if (filtered[i] == filtered[i + 1]) {
      merged.push(filtered[i] * 2);
      skip = true;
    } else {
      merged.push(filtered[i]);
    }
  }
  while (merged.length < row.length) merged.push(0);
  return merged;
};

export const moveleft = (board) => board.map((row) => slideTile(row));

export const reverseBoard = (board) => board.map((row) => [...row].reverse());

export const rotateBoard = (board) =>
  board[0].map((_, i) => board.map((row) => row[i]));

export const moveRight = (board) =>
  moveleft(reverseBoard(board).map((row) => row.reverse()));

export const moveup = (board) => rotateBoard(moveleft(rotateBoard(board)));

export const moveDown = (board) =>
  rotateBoard(reverseBoard(moveleft(reverseBoard(rotateBoard(board)))));

export const hasmoves = (board) => {
  const size = board.length;

  for (let i = 0; i < size; i++)
    for (let j = 0; j < size; j++)
      if (
        board[i][j] == 0 ||
        (i < size - 1 && board[i][j] == board[i + 1][j]) ||
        (j < size - 1 && board[i][j] == board[i][j + 1])
      )
        return true;
  return false;
};

export const getScore = (board) => board.flat().reduce((a, b) => a + b, 0);
