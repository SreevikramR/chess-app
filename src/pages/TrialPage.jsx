import './styles/TrialPage.css'
import { getMoveSequence, getAlternateLine } from '../scripts/FSAcess'
import { useState } from 'react'
import Navbar from '../components/Navbar/Navbar'
import MoveTable from '../components/MoveTable/MoveTable'
import TrainBoard from '../components/Board/TrainBoard'
import { useChessboard } from '../contexts/BoardContext'

function TrialPage() {
  const {setMoveHistory, openingLine, setOpeningLine, openingName, setOpeningName, setMoveSequence, moveSequence, setPlayerColor} = useChessboard()

  const [isPlayerWhite, setIsPlayerWhite] = useState(true);

  async function changeLine() {
    const line = await getAlternateLine(openingLine)
    setOpeningLine(line)
    setMoveSequence(getMoveSequence(line));
    console.log(moveSequence)
    setMoveHistory([]);
  }

  function togglePlayerColor() {
    setIsPlayerWhite(isWhite => !isWhite);
    setPlayerColor(color => color === 'white' ? 'black' : 'white');
  }

  return (
    <>
      <Navbar inDashboard={false} />
      <div className="content">
        <div className="row">
          <div className="hc1">
            <TrainBoard />
          </div>
          <div className="hc2">
            <h1>{openingName}</h1>
            <div className="toggle-switch" onClick={togglePlayerColor}>
              <div className={`toggle-switch-handle ${isPlayerWhite ? 'white' : 'black'}`}></div>
            </div>

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
