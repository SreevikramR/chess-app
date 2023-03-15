import './styles/BoardPage.css'
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
let moveHistory = [];
let indexid = 'ti0';

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

    window.addEventListener('load', function() { 
        viewPortWidth = window.innerWidth;
        viewPortHeight = window.innerHeight;
    
        if(viewPortWidth/2 > 500){
            setBoardWidth(500);
        } else {
            setBoardWidth(viewPortWidth/2.2);
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
            document.getElementById(indexid).className = '';
            moveMessage = " is not the correct move"
            indexid = 'ti' + (moveHistory.length - 1);
            document.getElementById(indexid).classList.add('wrongMove');
            image = close
            movePlayed = moveHistory[moveHistory.length - 1]
            setTimeout(() =>  {
                game.undo();
                setGame(gameBackup)
                setPosition(gameBackup.fen());
            }, 100)
            
        } else if(nextMove == null){
            document.getElementById(indexid).className = '';
            moveMessage = " is the correct move!"
            indexid = 'ti' + (moveHistory.length - 1);
            document.getElementById(indexid).classList.add('correctMove');
            image = correct
            movePlayed = moveHistory[moveHistory.length - 1]
            moveMessage = "Opening Complete!"
            image = correct
            movePlayed = ""
            console.log("move sequence complete")
        } else {
            setTimeout(() => {
                document.getElementById(indexid).className = '';
                moveMessage = " is the correct move!"
                indexid = 'ti' + (moveHistory.length - 1);
                document.getElementById(indexid).classList.add('correctMove');
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
        document.getElementById(indexid).className = ''
        moveHistory = []
    }

    return(
        <>
            <div className="row">
                <div className="hc1">
                    <Chessboard boardWidth={boardWidth} position={position} onPieceDrop={onDrop} isDraggablePiece={isDraggable} animationDuration={750}/>
                </div>
                <div className="hc2">
                    <h1>{openeingName}</h1>
                    <table>
                        <tr>
                            <th colSpan={3}>
                                <h2>{openingLine}</h2>
                            </th>
                        </tr>
                        <tr>
                            <td className='indexNumber'>1</td>
                            <td id='ti0'>{moveHistory[0]}</td>
                            <td id='ti1'>{moveHistory[1]}</td>
                        </tr>
                        <tr>
                            <td className='indexNumber'>2</td>
                            <td id='ti2'>{moveHistory[2]}</td>
                            <td id='ti3'>{moveHistory[3]}</td>
                        </tr>
                        <tr>
                            <td className='indexNumber'>3</td>
                            <td id='ti4'>{moveHistory[4]}</td>
                            <td id='ti5'>{moveHistory[5]}</td>
                        </tr>
                        <tr>
                            <td className='indexNumber'>4</td>
                            <td id='ti6'>{moveHistory[6]}</td>
                            <td id='ti7'>{moveHistory[7]}</td>
                        </tr>
                        <tr>
                            <td className='indexNumber'>5</td>
                            <td id='ti8'>{moveHistory[8]}</td>
                            <td id='ti9'>{moveHistory[9]}</td>
                        </tr>
                        <tr>
                            <td className='indexNumber'>6</td>
                            <td id='ti10'>{moveHistory[10]}</td>
                            <td id='ti11'>{moveHistory[11]}</td>
                        </tr>
                        <tr>
                            <td className='indexNumber'>7</td>
                            <td id='ti12'>{moveHistory[12]}</td>
                            <td id='ti13'>{moveHistory[13]}</td>
                        </tr>
                        <tr>
                            <td className='indexNumber'>8</td>
                            <td id='ti14'>{moveHistory[14]}</td>
                            <td id='ti15'>{moveHistory[15]}</td>
                        </tr>
                    </table>

                    {/* <img src={image}/>
                    <h3>{movePlayed}{moveMessage}</h3> */}
                
                </div>
            </div>
            <div className='navigationButtons'>
                    <button onClick={onClick}>Back</button>
                    <button onClick={changeLine}>Try another line!</button>
            </div>
        </>
        
    )
}

export default TrialPage