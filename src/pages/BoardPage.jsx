import './BoardPage.css'
import navigateTo from "../components/NavigationManager"
import { getLineIndex, getAlternateLine, getMoveSequence } from "../components/MoveRetreival"
import { useState, useEffect } from 'react'
import { Chess } from 'chess.js'
import { Chessboard } from 'react-chessboard'
import MoveSelector from '../components/MoveSelector'
import close from '../assets/close.png'
import correct from '../assets/correct.png'

let openeingName = 'Ruy Lopez';
let openingLine = 'Cozio Defense';
let movePlayed;
let moveMessage;
let moveSequence = [];
let image;

function BoardPage() {

    let openingLineIndex = getLineIndex(openeingName, openingLine);
    moveSequence = getMoveSequence(openeingName, openingLine);

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
        const gameBackup = game;
        gameBackup.loadPgn(game.pgn())
        const gameCopy = game;
        gameCopy.loadPgn(game.pgn());
        gameCopy.move(move);
        setGame(gameCopy);
        setPosition(game.fen())

        moveHistory = gameCopy.history();
        console.log("last move played: " + moveHistory[moveHistory.length - 1])
        nextMove = MoveSelector(moveHistory, openeingName, openingLineIndex)
        console.log(nextMove)

        if(nextMove === "invalid"){
            moveMessage = " is not the correct move"
            image = close
            movePlayed = moveHistory[moveHistory.length - 1]
            setTimeout(() =>  {
                game.undo();
                setGame(gameBackup)
                setPosition(gameBackup.fen());
            }, 100)
            
        } else if(nextMove == null){
            moveMessage = "Opening Complete!"
            image = correct
            movePlayed = ""
            console.log("move sequence complete")
        } else {
            setTimeout(() => {
                moveMessage = " is the correct move!"
                image = correct
                movePlayed = moveHistory[moveHistory.length - 1]


                if(moveHistory.length === moveSequence.length - 1){
                    image = correct
                    moveMessage = "Opening Complete!"
                    movePlayed = ""
                    console.log("move sequence complete")
                }


                playMove(nextMove)
            }, 250);
        }
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
        openingLine = getAlternateLine(openeingName, openingLine);
        openingLineIndex = getLineIndex(openeingName, openingLine);
        moveSequence = getMoveSequence(openeingName, openingLine[openingLineIndex]);
        setGame(gameCopy);
        setPosition(gameCopy.fen());
        moveHistory = []
    }

    return(
        <>
            <div className="row">
                <div className="hc1">
                    <Chessboard boardWidth={boardWidth} position={position} onPieceDrop={onDrop} isDraggablePiece={isDraggable} animationDuration={750}/>
                </div>
                <div className="hc2">
                    <div className="box">
                        <h1>{openeingName}</h1>
                        <h2>{openingLine}</h2>
                    </div>
                    <img src={image}/>
                    <h3>{movePlayed}{moveMessage}</h3>
                </div>
            </div>
            <div className='navigationButtons'>
                    <button onClick={onClick}>Back</button>
                    <button onClick={changeLine}>Try a different line!</button>
            </div>
        </>
        
    )
}

export default BoardPage