import React, { useEffect } from "react";
import "./MoveTable.css";
import { useChessboard } from "../../contexts/BoardContext";


const MoveTable = () => {
  const {moveHistory, openingLine, moveResult, moveSequence, openingComplete, setOpeningComplete, playerColor} = useChessboard()
  
  useEffect(() => {
    setOpeningComplete(false)
  }, [])
  
  let moveIds = [];
  let correctMoves = [];
  let wrongMove;
  let previousMoveSequence;
  
    useEffect(() => {
      for (let i = 0; i < moveHistory.length - 1; i++){
        document.getElementById("ti" + i).className = "";
      }
      moveIds = []
      correctMoves = []
      wrongMove = ""
    }, [openingLine, playerColor])
  
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
        setTimeout(() => {
          document.getElementById('movesTable').classList.remove('openingComplete')
        }, 10);
      }
    }, [openingComplete])
  
  
    for (let i = 0; i < numRows; i++) {
      let rowNumber = i + 1;
      let whiteMove = moveHistory[i * 2];
      let blackMove = moveHistory[i * 2 + 1];
      
      let whiteCellId = whiteMove !== undefined ? "ti" + i * 2 : "";
      let blackCellId = blackMove !== undefined ? "ti" + (i * 2 + 1) : "";
      
      if (playerColor == 'white') {
        if (whiteCellId !== "") {
          moveIds.push(whiteCellId);
        }
      } else if (playerColor == 'black') {
        if (blackCellId !== "") {
          moveIds.push(blackCellId);
        }
      }

  
      let row = (
        <tr key={rowNumber}>
          <td className="indexNumber">{rowNumber}</td>
          <td id={whiteCellId} className="">{whiteMove}</td>
          <td id={blackCellId} className="">{blackMove}</td>
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
      <table id='movesTable' className="moveTable">
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
}

export default MoveTable