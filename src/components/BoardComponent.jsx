import { useState } from 'react'
import { Chess } from 'chess.js'
import { Chessboard } from 'react-chessboard'
import MoveSelector from './MoveSelector'

const BoardComponent = () => {
  	const [game, setGame] = useState(new Chess());
  	const [position, setPosition] = useState();
	const [boardWidth, setBoardWidth] = useState(500);
  	let moveHistory = [];
  	let nextMove;

	var viewPortWidth = window.innerWidth;
	var viewPortHeight = window.innerHeight;

	window.onresize = function() {
		console.log("window resized")
		viewPortWidth = window.innerWidth;
		viewPortHeight = window.innerHeight;
		
		if(viewPortWidth/2 > 500){
			setBoardWidth(500);
		} else {
			setBoardWidth(viewPortWidth/2);
		}
	};

	window.addEventListener('load', function() { 
		viewPortWidth = window.innerWidth;
		viewPortHeight = window.innerHeight;
	
		if(viewPortWidth/2 > 500){
			setBoardWidth(500);
		} else {
			setBoardWidth(viewPortWidth/2);
		}
	}, false);

    const makeMove = (move) => {
        const gameCopy = game;
        gameCopy.loadPgn(game.pgn());
        gameCopy.move(move);
        setGame(gameCopy);
        setPosition(game.fen())

		moveHistory = gameCopy.history();
        nextMove = MoveSelector(moveHistory)

		setTimeout(() => {
			playMove(nextMove)
		}, 250);
    }

    const playMove = (nextMove) => {
        const gameCopy = game;
        gameCopy.loadPgn(game.pgn());
        gameCopy.move(nextMove);
        setGame(gameCopy);
        setPosition(game.fen())
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
    <div style={{margin:'20px'}}>
      <Chessboard boardWidth={boardWidth} position={position} onPieceDrop={onDrop} animationDuration={750}/>
    </div>
  )
}

export default BoardComponent
