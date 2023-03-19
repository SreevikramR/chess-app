
const MoveTable = ({ moveSequence, moves, openingLine }) => {
    let sequenceLength = moveSequence.length
    let numRows = Math.ceil(sequenceLength / 2);

    let rows = [];

    for (let i = 0; i < numRows; i++) {
        let rowNumber = i + 1;
        let whiteMove = moves[i * 2];
        let blackMove = moves[i * 2 + 1];
    
        let whiteCellId = whiteMove !== undefined ? "ti" + (i * 2) : "";
        let blackCellId = blackMove !== undefined ? "ti" + (i * 2 + 1) : "";
    
        let row = (
          <tr key={rowNumber}>
            <td className="indexNumber">{rowNumber}</td>
            <td id={whiteCellId}>{whiteMove}</td>
            <td id={blackCellId}>{blackMove}</td>
          </tr>
        );
    
        rows.push(row);
      }

    return (
        <table>
            <thead>
                <tr>
                    <th colSpan={3}>
                        <h2>{openingLine}</h2>
                    </th>
                </tr>
            </thead>
            <tbody>{rows}</tbody>
        </table>
    )
}

export default MoveTable