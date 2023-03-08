import data from '../Data/openings.json';

export function getMoveSequence(openingName) {
    const openingLines = Object.keys(data.Openings[openingName]['lines'])
    console.log("Ruy Lopez lines: " + openingLines)
    return openingLines;
}

export function getLines(opening, openingLine) {
    const line = data.Openings[opening]['lines'][openingLine]
    return line;
}