import React, { useEffect } from 'react'
import Navbar from '../components/Navbar/Navbar'
import LearnBoardWhite from '../components/Board/LearnBoardWhite'
import MoveTable from '../components/MoveTable/MoveTable'
import { useChessboard } from '../contexts/BoardContext'
import { getMoveSequence, getAlternateLine } from '../scripts/FSAcess'
import VariationTable from '../components/VariationTable/VariationTable'
import './styles/LearnPage.css'

const LearnPage = () => {
  const {setMoveHistory, openingLine, setOpeningLine, openingName, setMoveSequence, moveSequence, setOpeningComplete} = useChessboard()

  useEffect(() => {
    setMoveSequence(getMoveSequence(openingLine));
    setMoveHistory([]);
    setOpeningComplete(false);
  }, [openingName, openingLine, setMoveSequence, setMoveHistory, setOpeningComplete]);

  useEffect(() => {
    setMoveHistory([]);
  }, []);

  async function changeLine() {
    setOpeningLine(await getAlternateLine(openingLine));
    setMoveSequence(getMoveSequence(openingLine));
    setOpeningComplete(false)
    setMoveHistory([]);
  }

  return (
    <>
      <Navbar/>
      <div className='content'>
        <div className="learn_row">
          <div className='learn_hc1'>
            <VariationTable />
          </div>
          <div className="learn_hc2">
            <LearnBoardWhite/>
          </div>
          <div className="learn_hc3">
            <h1 style={{paddingTop:0}}>{openingName}</h1>
              <MoveTable />
            </div>
          </div>
        <button onClick={changeLine}>Try another line!</button>
      </div>
    </>
  )
}

export default LearnPage