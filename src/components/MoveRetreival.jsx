import data from '../Data/openings.json';

const ruyLopezLines = ["Alapin Defense", "Cozio Defense", "Schliemann Defense"];

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

export function getLineIndex(openingName, openingLine){
    switch(openingName){
        case 'Ruy Lopez':
            return ruyLopezLines.indexOf(openingLine);
    }
}

export function getAlternateLine(openingName, currentLine){
    let foundLine = false;
    switch(openingName){
        case 'Ruy Lopez':
            while(foundLine === false){
                console.log("finding")
                let index = Math.round(randomNumber(ruyLopezLines.length - 1));
                if(ruyLopezLines[index] != currentLine){
                    return ruyLopezLines[index]
                }
            }
    }
}

function randomNumber(max) {
    return Math.random() * (max);
}
