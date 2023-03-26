import './styles/TrialPage.css'
import { getMoveSequence, getAlternateLine } from '../scripts/FSAcess'
import { useEffect } from 'react'
import Navbar from '../components/Navbar/Navbar'
import MoveTable from '../components/MoveTable/MoveTable'
import TrainBoardWhite from '../components/Board/TrainBoardWhite'
import { useChessboard } from '../contexts/BoardContext'

function TrialPage() {
  const {setMoveHistory, openingLine, setOpeningLine, openingName, setOpeningName, setMoveSequence, moveSequence} = useChessboard()

  async function changeLine() {
    const line = await getAlternateLine(openingLine)
    setOpeningLine(line)
    setMoveSequence(getMoveSequence(line));
    console.log(moveSequence)
    setMoveHistory([]);
  }

  return (
    <>
      <Navbar inDashboard={false} />
      <div className="content">
        <div className="row">
          <div className="hc1">
            <TrainBoardWhite />
          </div>
          <div className="hc2">
            <h1>{openingName}</h1>

            <MoveTable />

            {/* <img src={image}/>
                        <h3>{movePlayed}{moveMessage}</h3> */}
          </div>
        </div>
        <div className="navigationButtons">
          <button onClick={changeLine}>Try another line!</button>
        </div>
      </div>
    </>
  );
}

export default TrialPage;
