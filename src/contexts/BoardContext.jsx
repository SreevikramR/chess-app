import React, { useContext, createContext } from 'react'
import { useState } from 'react';

export const ChessboardContext = createContext();

export const useChessboard = () => useContext(ChessboardContext)

export const BoardProvider = ({ children }) => {
	const [moveHistory, setMoveHistory] = useState([]);
	const [openingName, setOpeningName] = useState("Ruy Lopez")
  const [openingLine, setOpeningLine] = useState("Cozio Defense");
  const [moveResult, setMoveResult] = useState("correct");
	const [moveSequence, setMoveSequence] = useState([]);
	

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
			}}>
			{ children }
		</ChessboardContext.Provider>
	)
}