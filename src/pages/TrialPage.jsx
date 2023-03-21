import './styles/TrialPage.css'
import { getLineIndex, getAlternateLine, getMoveSequence } from "../components/MoveRetreival"
import { useEffect, useState } from 'react'
import Navbar from '../components/Navbar'
import MoveTable from '../components/MoveTable'
import TrainBoardWhite from '../components/TrainBoardWhite'

let openeingName = "Ruy Lopez";
let moveSequence = [];

function TrialPage() {
  const [moveHistory, setMoveHistory] = useState([]);
  const [openingLine, setOpeningLine] = useState("Cozio Defense");
  const [moveResult, setMoveResult] = useState("correct");
  let openingLineIndex = getLineIndex(openeingName, openingLine);
  moveSequence = getMoveSequence(openeingName, openingLine);

  useEffect(() => {
    setMoveHistory([]);
  }, []);

  function changeLine() {
    setOpeningLine(getAlternateLine(openeingName, openingLine));
    openingLineIndex = getLineIndex(openeingName, openingLine);
    moveSequence = getMoveSequence(openeingName, openingLine[openingLineIndex]);
    setMoveHistory([]);
  }

  function updateMoveHistory(history) {
    setMoveHistory(history);
  }

  function setMoveResultFunc(result) {
    setMoveResult(result);
  }

  return (
    <>
      <Navbar inDashboard={false} />
      <div className="content">
        <div className="row">
          <div className="hc1">
            <TrainBoardWhite
              openingName={openeingName}
              openingLine={openingLine}
              moveHistory={moveHistory}
              updateMoveHistory={updateMoveHistory}
              setMoveResult={setMoveResultFunc}
            />
          </div>
          <div className="hc2">
            <h1>{openeingName}</h1>

            <MoveTable
              moveSequence={moveSequence}
              moves={moveHistory}
              openingLine={openingLine}
              moveResult={moveResult}
            />

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
