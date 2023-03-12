import { useState } from 'react'
import { Chess } from 'chess.js'
import { Chessboard } from 'react-chessboard'
import { getMoveSequence, getLines, getOpenings } from './MoveRetreival';

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

	var viewPortWidth = window.innerWidth;
	var viewPortHeight = window.innerHeight;
  
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

	window.onresize = function(event) {
		console.log("window resized")
    viewPortWidth = window.innerWidth;
		viewPortHeight = window.innerHeight;
		
		if(viewPortWidth/2 > 500){
			setBoardWidth(500);
		} else {
			setBoardWidth(viewPortWidth/2);
		}
	};

  	console.log(viewPortHeight + ": Height");
  	console.log(viewPortWidth + ": Width");

	const makeMove = (move) => {
		const gameCopy = game;
		console.log(game.pgn());
        gameCopy.loadPgn(game.pgn());
        gameCopy.move(move);
        setGame(gameCopy);
		setPosition(game.fen());
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
			const timer = ms => new Promise(res => setTimeout(res, ms));
			await timer(1500)
			makeMove(moveSequence[i]);
		}

		const timer = ms => new Promise(res => setTimeout(res, ms));
		await timer(1500);
		playMoves();

		function randomNumber(max) {
			return Math.random() * (max);
		}
	}

  	return (
    	<Chessboard boardWidth={boardWidth} position={position} isDraggablePiece={isDraggable} animationDuration={750}/>
  	)
}

export default ShowBoard