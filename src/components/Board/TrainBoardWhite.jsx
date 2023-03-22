import React, { useState, useEffect } from "react";
import { Chess } from "chess.js";
import { getLineIndex } from "../../scripts/MoveRetreival";
import MoveSelector from "../../scripts/MoveSelector";
import { Chessboard } from "react-chessboard";
import { useChessboard } from "../../contexts/BoardContext";

let previousLine = "Cozio Defense";
let indexid = "ti0";
let nextMove;
let tempMoveHistory = []

const TrainBoardWhite = () => {

  const {moveHistory, setMoveHistory, openingLine, setMoveResult, openingName, moveSequence} = useChessboard()

  tempMoveHistory = moveHistory;
  let openingLineIndex = getLineIndex(openingName, openingLine);

  var viewPortWidth = window.innerWidth;
  var viewPortHeight = window.innerHeight;

  const [game, setGame] = useState(new Chess());
  const [position, setPosition] = useState();
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
  }, []);

  useEffect(() => {
    const gameCopy = new Chess();
    game.loadPgn(gameCopy.pgn());
    setPosition(game.fen());
    previousLine = openingLine;
  }, [openingLine]);

  if (previousLine != openingLine) {
    const newGame = new Chess();
    setGame(newGame);
    setPosition(game.fen());
    previousLine = openingLine;
  }

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
      indexid = "ti" + (tempMoveHistory.length - 1);
      setMoveResult("wrong");
      setTimeout(() => {
        game.undo();
        setGame(gameBackup);
        setPosition(gameBackup.fen());
      }, 100);
    } else if (nextMove == null) {
      indexid = "ti" + (tempMoveHistory.length - 1);
      setMoveResult("correct");
      //console.log("move sequence complete")
    } else {
      setTimeout(() => {
        indexid = "ti" + (tempMoveHistory.length - 1);
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
    gameCopy.move(nextMove);
    setGame(gameCopy);
    setPosition(game.fen());
    //moveHistory.push(nextMove)
    setMoveHistory(gameCopy.history());
  };

  const onDrop = (startSquare, endSquare) => {
    makeMove({
      from: startSquare,
      to: endSquare,
      promotion: "q",
    });
  };

  const isDraggable = (piece, sourceSquare) => {
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
  };

  return (
    <Chessboard
      boardWidth={boardWidth}
      position={position}
      onPieceDrop={onDrop}
      isDraggablePiece={isDraggable}
      animationDuration={750}
    />
  );
};

export default TrainBoardWhite;
