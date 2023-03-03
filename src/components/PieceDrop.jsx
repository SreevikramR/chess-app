import { Chess } from "chess.js";

const PieceDrop = (startSquare, endSquare) => {
    makeMove({
        from: startSquare,
        to: endSquare,
        promotion: "q",
    });
}

const makeMove = (move) => {
    const gameCopy = new Chess();
    gameCopy.loadPgn(game.pgn());
    gameCopy.move(move);
    setGame(gameCopy);
    console.log(gameCopy.pgn())
}

export default PieceDrop