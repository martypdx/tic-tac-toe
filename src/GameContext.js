import { createContext, useState } from 'react';

export const GameContext = createContext();

const EMPTY_BOARD = ['', '', '', '', '', '', '', '', ''];

export default function Game({ children }) {
  const [board, setBoard] = useState(EMPTY_BOARD);
  const player = countO(board) < countX(board) ? 'O' : 'X';
  const winner = findWinner(board);
  const active = !winner && board.some((c) => c === '');
  const tie = !winner && !active;

  const playAt = (index) => {
    if (board[index]) return;

    setBoard((board) => {
      const newBoard = board.slice();
      newBoard[index] = player;
      return newBoard;
    });
  };

  const reset = () => {
    setBoard(EMPTY_BOARD);
  };

  const value = {
    board,
    playAt,
    reset,
    player,
    active,
    winner,
    tie,
  };

  return <GameContext.Provider value={value}>{children}</GameContext.Provider>;
}

const countPlays = (player) => (board) => board.filter((cell) => cell === player).length;
const countX = countPlays('X');
const countO = countPlays('O');

const WINS = [
  [0, 1, 2], // top
  [3, 4, 5], // middle
  [6, 7, 8], // bottom
  [0, 3, 6], // left
  [1, 4, 7], // center
  [2, 5, 8], // right
  [0, 4, 8], // zig
  [2, 4, 6], // zag
];

function findWinner(board) {
  for (const [x, y, z] of WINS) {
    if (board[x] === '') continue;
    if (board[x] === board[y] && board[y] === board[z]) return board[x];
  }
  return '';
}
