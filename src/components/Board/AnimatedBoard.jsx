import { Chess } from "chess.js";
import { Chessboard } from 'react-chessboard'
import { useState, useEffect } from "react";
import { getAlternateLine, getMoveSequence, readOpening, setFirstLine } from "../../scripts/FSAcess";
import { useLocation } from "react-router-dom";

let firstRun = true;

const ShowBoard = (props) => {
  const [game, setGame] = useState(new Chess());
  const [position, setPosition] = useState();
  const [boardWidth, setBoardWidth] = useState(450);

  const location = useLocation();

  let moveSequence = [];
  let openingVariation;
  var viewPortWidth = window.innerWidth;
  var viewPortHeight = window.innerHeight;

  useEffect(() => {
    firstRun = true
    viewPortWidth = window.innerWidth;
    viewPortHeight = window.innerHeight;

    if (viewPortWidth / 2 > 450) {
      setBoardWidth(450);
    } else {
      setBoardWidth(viewPortWidth / 2.5);
    }
    playMoves();
  }, [location.pathname])

  useEffect(() => {
    viewPortWidth = window.innerWidth;
    viewPortHeight = window.innerHeight;

    if (viewPortWidth / 2 > 450) {
      setBoardWidth(450);
    } else {
      setBoardWidth(viewPortWidth / 2.5);
    }
    playMoves();
  }, []);

  window.onresize = function () {
    //console.log("window resized")
    viewPortWidth = window.innerWidth;
    viewPortHeight = window.innerHeight;

    if (viewPortWidth / 2 > 500) {
      setBoardWidth(450);
    } else {
      setBoardWidth(viewPortWidth / 2.5);
    }
  };

  const makeMove = (move) => {
    const gameCopy = game;
    gameCopy.loadPgn(game.pgn());
    gameCopy.move(move);
    setGame(gameCopy);
    setPosition(game.fen());
    //console.log(game.pgn());
  };

  const isDraggable = (piece, sourceSquare) => {
    return false;
  };

  async function playMoves() {
    if(firstRun){
      await readOpening("Ruy Lopez")
      openingVariation = await setFirstLine("Ruy Lopez")
      firstRun = false
    }
    const gameCopy = new Chess();
    game.loadPgn(gameCopy.pgn());
    setPosition(game.fen());

    openingVariation = await getAlternateLine(openingVariation)
    moveSequence = await getMoveSequence(openingVariation);

    for (var i = 0; i < moveSequence.length; i++) {
      if (window.location.pathname === "/") {
        const timer = (ms) => new Promise((res) => setTimeout(res, ms));
        await timer(1400);
        makeMove(moveSequence[i]);
      }
    }

    const timer = (ms) => new Promise((res) => setTimeout(res, ms));
    await timer(1400);
    if (window.location.pathname !== "/") {
      //console.log('stopped')
      return;
    } else {
      //console.log('still running')
      playMoves();
    }
  }

  return (
    <Chessboard
      boardWidth={boardWidth}
      position={position}
      isDraggablePiece={isDraggable}
      animationDuration={750}
    />
  );
};

export default ShowBoard;
