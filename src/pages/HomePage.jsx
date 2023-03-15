import React from "react"
import './styles/HomePage.css'
import { Link } from "react-router-dom"
import { useState, useEffect } from 'react'
import { Chess } from 'chess.js'
import { Chessboard } from 'react-chessboard'
import { getMoveSequence, getLines, getOpenings } from '../components/MoveRetreival';
import './styles/Navbar.css'

function HomePage() {
    var viewPortWidth = window.innerWidth;
    var viewPortHeight = window.innerHeight;
    
    let isHomePage = true;
    //console.log(import.meta.env.VITE_FIREBASE_API)

    const ShowBoard = () => {
        const [boardWidth, setBoardWidth] = useState(450);
        const [game, setGame] = useState(new Chess());
        const [position, setPosition] = useState();
        const openingList = getOpenings();
        let moveSequence = [];
        let randomOpeningIndex;
        let opening;
        let openingVariation
        let openingVariationIndex;	
    
        viewPortWidth = window.innerWidth;
        viewPortHeight = window.innerHeight;

        window.setTimeout(function(){
            viewPortWidth = window.innerWidth;
            viewPortHeight = window.innerHeight;
            
            if(viewPortWidth/2 > 450){
                setBoardWidth(450);
            } else {
                setBoardWidth(viewPortWidth/2.5);
            }
        }, 100)
        
        useEffect(() => {
            viewPortWidth = window.innerWidth;
            viewPortHeight = window.innerHeight;
        
            if(viewPortWidth/2 > 450){
                setBoardWidth(450);
            } else {
                setBoardWidth(viewPortWidth/2.5);
            }
            playMoves();
        }, [])
        
        window.onresize = function() {
            console.log("window resized")
            viewPortWidth = window.innerWidth;
            viewPortHeight = window.innerHeight;
            
            if(viewPortWidth/2 > 450){
                setBoardWidth(450);
            } else {
                setBoardWidth(viewPortWidth/2.5);
            }
        };
        
        const makeMove = (move) => {
            const gameCopy = game;
            gameCopy.loadPgn(game.pgn());
            gameCopy.move(move);
            setGame(gameCopy);
            setPosition(game.fen());
            //console.log(game.pgn());
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
        <>
            <div className="navbar">
                <div className="leftAlign">
                    <h4>Chess Openings</h4>
                </div>
                <div className="rightAlign">
                    <div className="textSplitter">
                        <Link to="/login" style={{ textDecoration: 'none' }} onClick={homePageFalse}>
                            <div className="navBarText">Login</div>
                        </Link>
                    </div>
                    <div className="textSplitter">
                        <Link to='/register' style={{ textDecoration: 'none' }} onClick={homePageFalse}>
                            <div className="navBarText">Register</div>
                        </Link>
                    </div>
                    <Link to='/try_now'>
                        <button className="navBarButton" onClick={homePageFalse}>Try Now!</button>
                    </Link>
                </div>
            </div>
            <div style={{marginTop: '13vh'}}>
                <div className='row'>
                    <div className='hc1'>
                        <ShowBoard/>
                    </div>
                    <div className='hc2'>
                        <h1 className="title"><mark className="headingMarker">Crush</mark> your opponents with <mark className="headingMarker">flawless</mark> openings</h1>
                        <Link to='/try_now'>
                            <button onClick={homePageFalse} className="tryNowButton">Try now!</button>
                        </Link>
                    </div>
                </div>  
            </div>
        </>
    )
}

export default HomePage