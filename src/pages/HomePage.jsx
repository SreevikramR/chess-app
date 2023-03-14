import React from "react"
import './HomePage.css'
import { Link } from "react-router-dom"
import { useState } from 'react'
import { Chess } from 'chess.js'
import { Chessboard } from 'react-chessboard'
import { getMoveSequence, getLines, getOpenings } from '../components/MoveRetreival';

function HomePage() {

    var viewPortWidth = window.innerWidth;
    var viewPortHeight = window.innerHeight;
    
    let isHomePage = true;  

    window.setTimeout(function(){
        viewPortWidth = window.innerWidth;
        viewPortHeight = window.innerHeight;
        
        if(viewPortWidth/2 > 500){
            setBoardWidth(500);
        } else {
            setBoardWidth(viewPortWidth/2);
        }
    }, 100)

    const ShowBoard = () => {
        const [game, setGame] = useState(new Chess());
        const [position, setPosition] = useState();
        const [boardWidth, setBoardWidth] = useState();
        const openingList = getOpenings();
        let moveSequence = [];
        let randomOpeningIndex;
        let opening;
        let openingVariation
        let openingVariationIndex;	
    
        viewPortWidth = window.innerWidth;
        viewPortHeight = window.innerHeight;        
        
        window.addEventListener('load', function() { 
            viewPortWidth = window.innerWidth;
            viewPortHeight = window.innerHeight;
        
            if(viewPortWidth/2 > 500){
                setBoardWidth(500);
            } else {
                setBoardWidth(viewPortWidth/2);
            }
            playMoves();
        }, false);
        
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
        
        const makeMove = (move) => {
            const gameCopy = game;
            gameCopy.loadPgn(game.pgn());
            gameCopy.move(move);
            setGame(gameCopy);
            setPosition(game.fen());
            console.log(game.pgn());
        }
        
        const isDraggable = (piece, sourceSquare) => {return false}
        
        async function playMoves(){
            const gameCopy = new Chess();
            game.loadPgn(gameCopy.pgn())
            setPosition(game.fen());
        
            randomOpeningIndex = Math.round(randomNumber(openingList.length - 1));
            opening = getOpenings()[randomOpeningIndex];
            openingVariationIndex = Math.round(randomNumber(getLines(opening).length - 1));
            openingVariation = getLines(opening)[openingVariationIndex]
            moveSequence = getMoveSequence(opening, openingVariation)
        
            for(var i = 0; i < moveSequence.length; i++){
                if(isHomePage === true){
                    const timer = ms => new Promise(res => setTimeout(res, ms));
                    await timer(1500)
                    makeMove(moveSequence[i]);
                }
            }
        
            const timer = ms => new Promise(res => setTimeout(res, ms));
            await timer(1500);
            if(isHomePage === false){
                return
            } else {
                console.log('still running')
                playMoves();
            }
        
            function randomNumber(max) {
                return Math.random() * (max);
            }
        }
        
            return (
            <Chessboard boardWidth={boardWidth} position={position} isDraggablePiece={isDraggable} animationDuration={750}/>
            )
    }

    function homePageFalse(){
        console.log("button clicked")
        isHomePage = false
        console.log(isHomePage);
    }

    return(
        <div>
            <h1> Chess Openings </h1>
            <div className='row'>
			    <div className='hc1'>
				    <ShowBoard/>
                    
			    </div>
			    <div className='hc2'>
				    <Link to='/board'>
                        <button onClick={homePageFalse}>Try now!</button>
                    </Link>
			    </div>
    	    </div>  
        </div>
    )
}

export default HomePage