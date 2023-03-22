import React from 'react'
import { useChessboard } from '../contexts/BoardContext'
import { getLineIndex } from './MoveRetreival'

const LearnLine = () => {
  const { game, openingName, openingLine } = useChessboard()

  let arrowArray = []
  let openingLineIndex = getLineIndex(openingName, openingLine);
  let gameCopy = game;
  gameCopy.loadPgn(game.pgn());
  tempMoveHistory = gameCopy.history();
  let expectedMove = MoveSelector(tempMoveHistory, openingName, openingLineIndex);
  console.log(expectedMove)
  gameCopy.move(expectedMove)
  let history = gameCopy.history({verbose: true})
  arrowArray.push(history.at(-1).from)
  arrowArray.push(history.at(-1).to)

  return arrowArray
}

export default LearnLine