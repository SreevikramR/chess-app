import { useState } from 'react'
import reactLogo from './assets/react.svg'
import './App.css'
import { Chess } from 'chess.js'
import { Chessboard } from 'react-chessboard'
import PieceDrop from './components/PieceDrop'

function App() {
  const [game, setGame] = useState(new Chess());
  let moveHistory = [];

    const makeMove = (move) => {
        const gameCopy = new Chess();
        gameCopy.loadPgn(game.pgn());
        gameCopy.move(move);
        setGame(gameCopy);
        moveHistory = gameCopy.history();
        console.log(moveHistory);
    }
    const onDrop = (startSquare, endSquare) => {
        makeMove({
            from: startSquare,
            to: endSquare,
            promotion: "q",
        });
    }

  return (
    <div className="App">
      <Chessboard boardWidth={500} position={game.fen()} onPieceDrop={onDrop}/>
    </div>
  )
}

export default App
