import { useContext } from 'react';
import Game, { GameContext } from './GameContext.js';
import './App.css';

export default function App() {
  return (
    <div className="App">
      <Game>
        <div>
          <Status />
          <PlayAgain />
        </div>
        <Board />
      </Game>
    </div>
  );
}

function Status() {
  const { player, active, winner, tie } = useContext(GameContext);
  if (active) return <p>{player}&apos;s Turn</p>;
  if (tie) return <p>😼 Game</p>;
  return <p>{winner} wins!</p>;
}

function PlayAgain() {
  const { active, reset } = useContext(GameContext);
  if (active) return null;
  return <button onClick={reset}>Play Again</button>;
}

function Board() {
  const { board, playAt } = useContext(GameContext);

  return (
    <ul className="Board">
      {board.map((contents, i) => (
        <Cell key={i} contents={contents} onClick={() => playAt(i)} />
      ))}
    </ul>
  );
}

function Cell({ contents, onClick }) {
  return (
    <li className="Cell" onClick={onClick}>
      {contents}
    </li>
  );
}
