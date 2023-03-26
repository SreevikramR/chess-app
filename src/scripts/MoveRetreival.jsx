import data from "../Data/openings.json";

const ruyLopezLines = ["Alapin Defense", "Bird Variation", "Classical Defense", "Cozio Defense", "Schliemann Defense", "Steinitz Defense"];

export function getLines(openingName) {
  const openingLines = Object.keys(data.Openings[openingName]["lines"]);
  return openingLines;
}

export function getMoveSequence(opening, openingLine) {
  const line = data.Openings[opening]["lines"][openingLine];
  return line;
}

export function getOpenings() {
  const openings = ["Ruy Lopez"];
  return openings;
}

export function getLineIndex(openingName, openingLine) {
  switch (openingName) {
    case "Ruy Lopez":
      return ruyLopezLines.indexOf(openingLine);
  }
}

export function setFristLine(openingName){
  let linesList;
  switch (openingName) {
    case "Ruy Lopez":
      linesList = ruyLopezLines;
  }
  return linesList[0]
}

export function getAlternateLine(openingName, currentLine) {
  let foundLine = false;
  let linesList;
  switch (openingName) {
    case "Ruy Lopez":
      linesList = ruyLopezLines
  }
    while (foundLine === false) {
      //console.log("finding")
      let index = Math.round(randomNumber(linesList.length - 1));
      if (linesList[index] != currentLine) {
        return linesList[index];
      }
    }
}

function randomNumber(max) {
  return Math.random() * max;
}
