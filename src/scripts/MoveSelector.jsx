import { getMoveSequence } from "./FSAcess.jsx";

const MoveSelector = (moveHistory, openingLine) => {

  var moveSequence = [];
  moveSequence = getMoveSequence(openingLine);

  //console.log(moveHistory);
  var i = 0;
  var j = moveHistory.length;

  if (moveSequence.length + 1 == moveHistory.length) {
    return null;
  }

  for (i = moveHistory.length - 1; i < moveHistory.length; i++) {
    if (moveHistory[i] !== moveSequence[i]) {
      //console.log("moveHistory: " + moveHistory[i] + ", moveSequence: " + moveSequence[i]);
      return "invalid";
    } else {
      // console.log("Next move: " + moveSequence[j]);
      return moveSequence[j];
    }
  }
};

export default MoveSelector;

// Use JSON to store data of all the openings
/* {
        "opening": {
            "eco": eco
            "name": opening name
            "line": opening line name
            "sequence": [move sequence] [e4, e5, ... etc]
        },
        "opening2": {
            "eco": eco
            "name": opening name
            "line": opening line name
            "sequence": [move sequence] [e4, d5, ... etc]
        },
    }
*/

// To retrieve the JSON data, store all the names of the openings with the same sequence in an array
// .indexOf("Opening Name") to get the location in array -> corresponds to the location in the json file
