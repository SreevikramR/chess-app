import { useState } from 'react'
import './App.css'
import { Chess } from 'chess.js'
import { Chessboard } from 'react-chessboard'
import MoveSelector from './components/MoveSelector'

function App() {
  const [game, setGame] = useState(new Chess());
  let moveHistory = [];
  let nextMove;

    const makeMove = (move) => {
        const gameCopy = new Chess();
        gameCopy.loadPgn(game.pgn());
        gameCopy.move(move);
        setGame(gameCopy);
        moveHistory = gameCopy.history();
        nextMove = MoveSelector(moveHistory)

        gameCopy.move(nextMove);
        setGame(gameCopy);
        moveHistory = gameCopy.history();
    }
    const onDrop = (startSquare, endSquare) => {
        makeMove({
            from: startSquare,
            to: endSquare,
            promotion: "q",
        });
    }

    const isDraggable = (piece, sourceSquare) => {
      if(piece.piece === 'wP' || piece.piece === 'wR' || piece.piece === 'wB' || piece.piece === 'wN' || piece.piece === 'wK' || piece.piece === 'wQ'){
        return true
      } else return false
    }

  return (
    <div className="App">
      <Chessboard boardWidth={500} position={game.fen()} onPieceDrop={onDrop} isDraggablePiece={isDraggable}/>
    </div>
  )
}

export default App
