import React, { useContext, createContext } from 'react'
import { useState } from 'react';
import { Chess } from 'chess.js';

export const ChessboardContext = createContext();

export const useChessboard = () => useContext(ChessboardContext)

export const BoardProvider = ({ children }) => {
	const [moveHistory, setMoveHistory] = useState([]);
	const [openingName, setOpeningName] = useState("Ruy Lopez")
  const [openingLine, setOpeningLine] = useState("Cozio Defense");
  const [moveResult, setMoveResult] = useState("correct");
	const [moveSequence, setMoveSequence] = useState([]);
	const [popUpState, setPopUpState] = useState(false);
	const [game, setGame] = useState(new Chess());
	const [position, setPosition] = useState()
	const [openingComplete, setOpeningComplete] = useState(false)
	

	return (
		<ChessboardContext.Provider value={{
			openingName, 
			setOpeningName,
			moveHistory,
			setMoveHistory,
			openingLine,
			setOpeningLine,
			moveResult,
			setMoveResult,
			moveSequence,
			setMoveSequence,
			popUpState,
			setPopUpState,
			game,
			setGame,
			position,
			setPosition,
			openingComplete,
			setOpeningComplete,
			}}>
			{ children }
		</ChessboardContext.Provider>
	)
}