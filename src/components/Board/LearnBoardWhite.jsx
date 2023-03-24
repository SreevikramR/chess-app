import { useChessboard } from "../../contexts/BoardContext";
import { Chessboard } from "react-chessboard";
import { Chess } from "chess.js";
import { getLineIndex } from "../../scripts/MoveRetreival";
import MoveSelector from "../../scripts/MoveSelector";
import React, { useState, useEffect } from 'react'

let nextMove;
let tempMoveHistory = []
let arrowArray = []

const LearnBoardWhite = () => {
  const {moveHistory, setMoveHistory, openingLine, setMoveResult, openingName, moveSequence, game, setGame, position, setPosition, setOpeningComplete, openingComplete} = useChessboard()

  tempMoveHistory = moveHistory;
  let openingLineIndex = getLineIndex(openingName, openingLine);

  var viewPortWidth = window.innerWidth;
  var viewPortHeight = window.innerHeight;

  const [boardWidth, setBoardWidth] = useState(500);

  viewPortWidth = window.innerWidth;
  viewPortHeight = window.innerHeight;

  window.onresize = function () {
    viewPortWidth = window.innerWidth;
    viewPortHeight = window.innerHeight;

    if (viewPortWidth / 2 > 500) {
      setBoardWidth(500);
    } else {
      setBoardWidth(viewPortWidth / 2.2);
    }
  };

  useEffect(() => {
    setGame(new Chess());
    getExpectedMove()
  }, []);

  function getExpectedMove() {
    arrowArray = []
    let gameCopy = new Chess(game.fen());
    gameCopy.loadPgn(game.pgn());
    tempMoveHistory = gameCopy.history();
    let expectedMove = MoveSelector(tempMoveHistory, openingName, openingLineIndex);
    if(expectedMove != undefined) {
      //console.log(expectedMove)
      gameCopy.move(expectedMove)
      let history = gameCopy.history({verbose: true})
      arrowArray.push(history.at(-1).from)
      arrowArray.push(history.at(-1).to)
    } else {
      arrowArray = ['', '']
      setOpeningComplete(true)
    }
  }

  useEffect(() => {
    const gameCopy = new Chess();
    game.loadPgn(gameCopy.pgn());
    setPosition(game.fen());
    getExpectedMove()
  }, [openingLine]);

  useEffect(() => {
    viewPortWidth = window.innerWidth;
    viewPortHeight = window.innerHeight;

    if (viewPortWidth / 2 > 500) {
      setBoardWidth(500);
    } else {
      setBoardWidth(viewPortWidth / 2.5);
    }
  }, []);

  const makeMove = (move) => {
    const gameBackup = game;
    gameBackup.loadPgn(game.pgn());
    const gameCopy = game;
    gameCopy.loadPgn(game.pgn());
    //console.log(move)
    gameCopy.move(move);
    setGame(gameCopy);
    setPosition(game.fen());

    //moveHistory = gameCopy.history();
    setMoveHistory(gameCopy.history());
    tempMoveHistory = gameCopy.history();
    //console.log("last move played: " + moveHistory[moveHistory.length - 1])
    nextMove = MoveSelector(tempMoveHistory, openingName, openingLineIndex);
    //console.log(nextMove)

    if (nextMove === "invalid") {
      setMoveResult("wrong");
      setTimeout(() => {
        game.undo();
        setGame(gameBackup);
        setPosition(gameBackup.fen());
      }, 100);
    } else if (nextMove == null) {
      setMoveResult("correct");
      //console.log("move sequence complete")
    } else {
      setTimeout(() => {
        setMoveResult("correct");

        if (tempMoveHistory.length === moveSequence.length - 1) {
          //console.log("move sequence complete")
        }

        playMove(nextMove);
      }, 250);
    }
  };

  const playMove = (nextMove) => {
    const gameCopy = game;
    gameCopy.loadPgn(game.pgn());
    console.log(nextMove)
    gameCopy.move(nextMove);
    setGame(gameCopy);
    setPosition(game.fen());
    //moveHistory.push(nextMove)
    setMoveHistory(gameCopy.history());
    getExpectedMove()
  };

  const onDrop = (startSquare, endSquare) => {
    makeMove({
      from: startSquare,
      to: endSquare,
      promotion: "q",
    });
  };

  const isDraggable = (piece, sourceSquare) => {
    if(!openingComplete) {
      if (
        piece.piece === "wP" ||
        piece.piece === "wR" ||
        piece.piece === "wB" ||
        piece.piece === "wN" ||
        piece.piece === "wK" ||
        piece.piece === "wQ"
      ) {
        return true;
      } else return false;
    } else return false;
  };

  return (
    <Chessboard
      boardWidth={boardWidth}
      position={position}
      onPieceDrop={onDrop}
      isDraggablePiece={isDraggable}
      animationDuration={750}
      customArrows={[arrowArray]}
      customArrowColor="rgb(87, 109, 232, 0.9)"
    />
  );
}

export default LearnBoardWhite