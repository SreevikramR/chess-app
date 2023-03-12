import data from '../Data/openings.json';

export function getLines(openingName) {
    const openingLines = Object.keys(data.Openings[openingName]['lines'])
    return openingLines;
}

export function getMoveSequence(opening, openingLine) {
    const line = data.Openings[opening]['lines'][openingLine]
    return line;
}

export function getOpenings() {
    const openings = ['Ruy Lopez']
    return openings;
}
