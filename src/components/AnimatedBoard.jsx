import { Chess } from "chess.js";
import { getMoveSequence, getLines, getOpenings } from '../components/MoveRetreival';
import { Chessboard } from 'react-chessboard'
import { useState, useEffect } from "react";

const ShowBoard = () => {
  const [game, setGame] = useState(new Chess());
  const [position, setPosition] = useState();
  const [boardWidth, setBoardWidth] = useState(450);
  const openingList = getOpenings();
  let moveSequence = [];
  let randomOpeningIndex;
  let opening;
  let openingVariation;
  let openingVariationIndex;
  var viewPortWidth = window.innerWidth;
  var viewPortHeight = window.innerHeight;

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
    const gameCopy = new Chess();
    game.loadPgn(gameCopy.pgn());
    setPosition(game.fen());

    randomOpeningIndex = Math.round(randomNumber(openingList.length - 1));
    opening = getOpenings()[randomOpeningIndex];
    openingVariationIndex = Math.round(
      randomNumber(getLines(opening).length - 1)
    );
    openingVariation = getLines(opening)[openingVariationIndex];
    moveSequence = getMoveSequence(opening, openingVariation);

    for (var i = 0; i < moveSequence.length; i++) {
      if (window.location.pathname === "/") {
        const timer = (ms) => new Promise((res) => setTimeout(res, ms));
        await timer(1500);
        makeMove(moveSequence[i]);
      }
    }

    const timer = (ms) => new Promise((res) => setTimeout(res, ms));
    await timer(1500);
    if (window.location.pathname !== "/") {
      //console.log('stopped')
      return;
    } else {
      //console.log('still running')
      playMoves();
    }

    function randomNumber(max) {
      return Math.random() * max;
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
