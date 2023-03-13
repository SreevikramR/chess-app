import './BoardPage.css'
import navigateTo from "../components/NavigationManager"
import { getLineIndex, getAlternateLine } from "../components/MoveRetreival"
import { useState, useEffect } from 'react'
import { Chess } from 'chess.js'
import { Chessboard } from 'react-chessboard'
import MoveSelector from '../components/MoveSelector'

let openeingName = 'Ruy Lopez';
let openeingLine = 'Cozio Defense';

function BoardPage() {

    let openeingLineIndex = getLineIndex(openeingName, openeingLine);

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
        console.log(openeingLineIndex);
        nextMove = MoveSelector(moveHistory, openeingName, openeingLineIndex)

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

    function onClick(){
        navigateTo('home')
    }

    function changeLine(){
        let gameCopy = new Chess();
        openeingLine = getAlternateLine(openeingName, openeingLine);
        openeingLineIndex = getLineIndex(openeingName, openeingLine);
        setGame(gameCopy);
        setPosition(gameCopy.fen());
        moveHistory = []
    }

    return(
        <div className="row">
            <div className="hc1">
                <Chessboard boardWidth={boardWidth} position={position} onPieceDrop={onDrop} isDraggablePiece={isDraggable} animationDuration={750}/>
            </div>
            <div className="hc2">
				<h1>{openeingName}</h1>
                <h2>{openeingLine}</h2>
                <button onClick={onClick}>Back</button>
                <button onClick={changeLine}>Try a different line!</button>
            </div>
        </div>
    )
}

export default BoardPage