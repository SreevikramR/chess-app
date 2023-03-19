import './styles/TrialPage.css'
import { getLineIndex, getAlternateLine, getMoveSequence } from "../components/MoveRetreival"
import { useState, useEffect } from 'react'
import { Chess } from 'chess.js'
import { Chessboard } from 'react-chessboard'
import MoveSelector from '../components/MoveSelector'
import Navbar from '../components/Navbar'
import MoveTable from '../components/MoveTable'

let openeingName = 'Ruy Lopez';
let openingLine = 'Cozio Defense';
let movePlayed;
let moveMessage;
let moveSequence = [];
let moveHistory = []

function TrialPage() {

    var viewPortWidth = window.innerWidth;
    var viewPortHeight = window.innerHeight;
    let openingLineIndex = getLineIndex(openeingName, openingLine);
    moveSequence = getMoveSequence(openeingName, openingLine);

    const [game, setGame] = useState(new Chess());
    const [position, setPosition] = useState();
    const [boardWidth, setBoardWidth] = useState(500);
    let nextMove;

    window.setTimeout(function(){
        viewPortWidth = window.innerWidth;
        viewPortHeight = window.innerHeight;
        
        if(viewPortWidth/2 > 500){
            setBoardWidth(500);
        } else {
            setBoardWidth(viewPortWidth/2);
        }
    }, 100)

    viewPortWidth = window.innerWidth;
    viewPortHeight = window.innerHeight;

    window.onresize = function() {
        viewPortWidth = window.innerWidth;
        viewPortHeight = window.innerHeight;
        
        if(viewPortWidth/2 > 500){
            setBoardWidth(500);
        } else {
            setBoardWidth(viewPortWidth/2.2);
        }
    };

    useEffect(() => {
        viewPortWidth = window.innerWidth;
        viewPortHeight = window.innerHeight;
    
        if(viewPortWidth/2 > 500){
            setBoardWidth(500);
        } else {
            setBoardWidth(viewPortWidth/2.5);
        }
        moveHistory = []
    }, [])

    const makeMove = (move) => {
        const gameBackup = game;
        gameBackup.loadPgn(game.pgn())
        const gameCopy = game;
        gameCopy.loadPgn(game.pgn());
        gameCopy.move(move);
        setGame(gameCopy);
        setPosition(game.fen())

        moveHistory = gameCopy.history();
        //console.log("last move played: " + moveHistory[moveHistory.length - 1])
        nextMove = MoveSelector(moveHistory, openeingName, openingLineIndex)
        //console.log(nextMove)

        if(nextMove === "invalid"){
            moveMessage = " is not the correct move"
            movePlayed = moveHistory[moveHistory.length - 1]
            setTimeout(() =>  {
                game.undo();
                setGame(gameBackup)
                setPosition(gameBackup.fen());
            }, 100)
            
        } else if(nextMove == null){
            moveMessage = " is the correct move!"
            movePlayed = moveHistory[moveHistory.length - 1]
            moveMessage = "Opening Complete!"
            movePlayed = ""
            //console.log("move sequence complete")
        } else {
            setTimeout(() => {
                moveMessage = " is the correct move!"
                movePlayed = moveHistory[moveHistory.length - 1]


                if(moveHistory.length === moveSequence.length - 1){
                    moveMessage = "Opening Complete!"
                    movePlayed = ""
                    //console.log("move sequence complete")
                }


                playMove(nextMove)
            }, 250);
        }
        console.log(moveMessage)
    }

    const playMove = (nextMove) => {
        const gameCopy = game;
        gameCopy.loadPgn(game.pgn());
        gameCopy.move(nextMove);
        setGame(gameCopy);
        setPosition(game.fen())
        moveHistory.push(nextMove)
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
            <Navbar inDashboard={false}/>
            <div className='content'>
                <div className="row">
                    <div className="hc1">
                        <Chessboard boardWidth={boardWidth} position={position} onPieceDrop={onDrop} isDraggablePiece={isDraggable} animationDuration={750}/>
                    </div>
                    <div className="hc2">
                        <h1>{openeingName}</h1>
                        
                        <MoveTable moveSequence={moveSequence} moves={moveHistory} openingLine={openingLine}/>

                        {/* <img src={image}/>
                        <h3>{movePlayed}{moveMessage}</h3> */}
                    
                    </div>
                </div>
                <div className='navigationButtons'>
                    <button onClick={changeLine}>Try another line!</button>
                </div>
            </div>
        </>
        
    )
}

export default TrialPage