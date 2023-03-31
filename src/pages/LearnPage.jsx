import React, { useEffect, useState } from 'react'
import Navbar from '../components/Navbar/Navbar'
import LearnBoard from '../components/Board/LearnBoard'
import MoveTable from '../components/MoveTable/MoveTable'
import { useChessboard } from '../contexts/BoardContext'
import { getMoveSequence, getAlternateLine } from '../scripts/FSAcess'
import VariationTable from '../components/VariationTable/VariationTable'
import './styles/LearnPage.css'

const LearnPage = () => {
  const {setMoveHistory, openingLine, setOpeningLine, openingName, setMoveSequence, setOpeningComplete, setPlayerColor} = useChessboard()

  useEffect(() => {
    setMoveSequence(getMoveSequence(openingLine));
    setMoveHistory([]);
    setOpeningComplete(false);
  }, [openingName, openingLine, setMoveSequence, setMoveHistory, setOpeningComplete]);

  useEffect(() => {
    setMoveHistory([]);
  }, []);

  const [isPlayerWhite, setIsPlayerWhite] = useState(true);

  async function changeLine() {
    setOpeningLine(await getAlternateLine(openingLine));
    setMoveSequence(getMoveSequence(openingLine));
    setOpeningComplete(false)
    setMoveHistory([]);
  }

  function togglePlayerColor() {
    setIsPlayerWhite(isWhite => !isWhite);
    setPlayerColor(color => color === 'white' ? 'black' : 'white');
  }


  return (
    <>
      <React.Suspense fallback={<span>Loading...</span>}>
        <Navbar/>
        <div className='content'>
          <div className="learn_row">
            <div className='learn_hc1'>
              <VariationTable />
            </div>
            <div className="learn_hc2">
              <LearnBoard/>
            </div>
            <div className="learn_hc3">
              <h1 style={{paddingTop:0, marginLeft:"15%"}}>{openingName}</h1>
              <div className="toggle-switch" onClick={togglePlayerColor}>
                <div className={`toggle-switch-handle ${isPlayerWhite ? 'white' : 'black'}`}></div>
              </div>
                <MoveTable />
              </div>
            </div>
          <button onClick={changeLine}>Try another line!</button>
        </div>
      </React.Suspense>
    </>
  )
}

export default LearnPage