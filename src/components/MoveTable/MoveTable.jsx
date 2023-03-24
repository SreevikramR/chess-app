import React, { useEffect } from "react";
import "./MoveTable.css";
import { useChessboard } from "../../contexts/BoardContext";

let moveIds = [];
let correctMoves = [];
let wrongMove;
let previousMoveSequence;

const MoveTable = () => {
  
  const {moveHistory, openingLine, moveResult, moveSequence, openingComplete} = useChessboard()

  let sequenceLength = moveSequence ? moveSequence.length : 0;
  let numRows = Math.ceil(sequenceLength / 2);
  if (previousMoveSequence !== moveSequence) {
    previousMoveSequence = moveSequence;
    correctMoves = [];
    wrongMove = "";
    moveIds = [];
  }

  let rows = [];

  useEffect(() => {
    if(openingComplete) {
      document.getElementById('movesTable').classList.add('openingComplete')
    } else {
      document.getElementById('movesTable').classList.remove('openingComplete')
    }
  }, [openingComplete])


  for (let i = 0; i < numRows; i++) {
    let rowNumber = i + 1;
    let whiteMove = moveHistory[i * 2];
    let blackMove = moveHistory[i * 2 + 1];

    let whiteCellId = whiteMove !== undefined ? "ti" + i * 2 : "";
    if (whiteCellId !== "") {
      moveIds.push(whiteCellId);
    }
    let blackCellId = blackMove !== undefined ? "ti" + (i * 2 + 1) : "";

    let row = (
      <tr key={rowNumber}>
        <td className="indexNumber">{rowNumber}</td>
        <td id={whiteCellId}>{whiteMove}</td>
        <td id={blackCellId}>{blackMove}</td>
      </tr>
    );

    rows.push(row);
  }

  let lastMove = moveIds[moveIds.length - 1];
  if (
    moveResult === "correct" &&
    lastMove !== undefined &&
    lastMove !== correctMoves[correctMoves.length - 1]
  ) {
    correctMoves.push(lastMove);
    wrongMove = "";
  } else if (moveResult === "wrong") {
    wrongMove = lastMove;
    //console.log("move is wrong");
  }

  useEffect(() => {
    setTimeout(() => {
      if (correctMoves.length !== 0 || wrongMove) {
        for (let j = 0; j < correctMoves.length; j++) {
          //console.log(correctMoves[j]);
          document.getElementById(correctMoves[j]).className = "";
          document.getElementById(correctMoves[j]).classList.add("correct");
        }
        if (wrongMove) {
          document.getElementById(wrongMove).className = "";
          document.getElementById(wrongMove).classList.add("wrong");
        }
      }
    }, 50);
  }, [moveHistory]);

  return (
    <table id='movesTable'>
      <thead>
        <tr>
          <th colSpan={3}>
            <h2>{openingLine}</h2>
          </th>
        </tr>
      </thead>
      <tbody>{rows}</tbody>
    </table>
  );
};

export default MoveTable;
