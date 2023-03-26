import React from 'react'
import { useChessboard } from '../../contexts/BoardContext'
import { getMoveSequence } from '../../scripts/FSAcess'
import './VariationTable.css'

const VariationTable = () => {
  const {lineVariations, setOpeningLine, setMoveSequence, setOpeningComplete, setMoveHistory} = useChessboard()

  let lines = lineVariations

  let rows = []

  function setLine(line) {
    setOpeningLine(line);
    setMoveSequence(getMoveSequence(line));
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