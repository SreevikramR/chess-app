import React from 'react'
import { getLines } from '../../scripts/MoveRetreival'
import { useChessboard } from '../../contexts/BoardContext'
import { getMoveSequence } from '../../scripts/MoveRetreival'
import './VariationTable.css'

const VariationTable = () => {
  const {openingName, setOpeningLine, setMoveSequence, setOpeningComplete, setMoveHistory} = useChessboard()

  let lines = getLines(openingName)
  let rows = []

  function setLine(line) {
    console.log(line)
    setOpeningLine(line);
    setMoveSequence(getMoveSequence(openingName, line));
    setOpeningComplete(false)
    setMoveHistory([]);
  }

  for (let i = 0; i < lines.length; i++){
    let line = lines[i]
    let row = (
      <tr key={lines[i]} onClick={() => setLine(line)} className='variationRow'>
        <td>{lines[i]}</td>
      </tr>
    );
    rows.push(row)
  }

  return (
    <>
      <table>
        <thead>
          <tr>
            <th>
              <h2>Variations</h2>
            </th>
          </tr>
        </thead>
        <tbody>{rows}</tbody>
      </table>
    </>
  )
}

export default VariationTable