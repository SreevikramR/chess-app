import React, { useState, useEffect } from "react";
import { Chess } from "chess.js";
import MoveSelector from "../../scripts/MoveSelector";
import { Chessboard } from "react-chessboard";
import { useChessboard } from "../../contexts/BoardContext";

let previousLine = "Cozio Defense";
let nextMove;
let tempMoveHistory = []
let playedFirstMove = false

const TrainBoardWhite = () => {

  const {moveHistory, setMoveHistory, openingLine, setMoveResult, openingName, moveSequence, game, setGame, position, setPosition, setOpeningComplete, openingComplete, playerColor, setPlayerColor} = useChessboard()

  tempMoveHistory = moveHistory;

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
    if(playerColor == 'black'){
      console.log('black playing')
      setTimeout(() => {
        if(!playedFirstMove){
          blackFirstMove()
          playedFirstMove = true
        }
      }, 1500);  
    }
  }, []);

  async function blackFirstMove(){
    const gameBackup = game;
    gameBackup.loadPgn(game.pgn());
    const gameCopy = game;
    gameCopy.loadPgn(game.pgn());
    //console.log(move)
    console.log(moveSequence)
    await gameCopy.move(moveSequence[0]);
    await setGame(gameCopy);
    await setPosition(game.fen());
    await setMoveHistory(gameCopy.history());
  }

  useEffect(() => {
    const gameCopy = new Chess();
    game.loadPgn(gameCopy.pgn());
    setPosition(game.fen());
    setOpeningComplete(false)
    if(playerColor == 'black'){
      setTimeout(() => {
        blackFirstMove()
        playedFirstMove = true
      }, 800);
    }
  }, [openingLine, playerColor]);

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
    nextMove = MoveSelector(tempMoveHistory, openingLine);
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
      setOpeningComplete(true)
      //console.log("move sequence complete")
    } else {
      setTimeout(() => {
        setMoveResult("correct");

        if (tempMoveHistory.length === moveSequence.length - 1) {
          setOpeningComplete(true)
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
    if(!openingComplete) {
      if (playerColor == 'white') {
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
      } else if (playerColor == 'black'){
        if (
          piece.piece === "bP" ||
          piece.piece === "bR" ||
          piece.piece === "bB" ||
          piece.piece === "bN" ||
          piece.piece === "bK" ||
          piece.piece === "bQ"
        ) {
          return true;
        } else return false;
      }
    } else return false;
  };

  return (
    <Chessboard
      boardWidth={boardWidth}
      position={position}
      onPieceDrop={onDrop}
      isDraggablePiece={isDraggable}
      animationDuration={750}
      boardOrientation={playerColor}
    />
  );
};

export default TrainBoardWhite;
