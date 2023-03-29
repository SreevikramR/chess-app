import React, { useEffect } from "react";
import "./MoveTable.css";
import WhitePlays from "./WhitePlays";
import BlackPlays from "./BlackPlays";
import { useChessboard } from "../../contexts/BoardContext";

const MoveTable = () => {

  const {playerColor} = useChessboard()

  if (playerColor == 'black'){
    return <BlackPlays/>
  } else if (playerColor == 'white'){
    return <WhitePlays/>
  }
};

export default MoveTable;
