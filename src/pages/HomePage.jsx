import React, { useEffect } from "react";
import "./styles/HomePage.css";
import { Link } from "react-router-dom";
import { useLocation } from "react-router-dom";
import ShowBoard from "../components/Board/AnimatedBoard";
import Navbar from "../components/Navbar/Navbar";
import { useChessboard } from "../contexts/BoardContext";
import { readOpening, getMoveSequence, setFirstLine } from "../scripts/FSAcess";

function HomePage() {

  const location = useLocation();

  const {setMoveHistory, openingLine, setOpeningLine, openingName, setOpeningName, setMoveSequence, moveSequence} = useChessboard()

  useEffect(() => {
    initData()
  }, [])

  async function initData() {
    await setOpeningName('Ruy Lopez')
    await readOpening(openingName)
    const line = await setFirstLine()
    await setOpeningLine(line)
    const sequence = await getMoveSequence(line)
    await setMoveSequence(sequence);
    setMoveHistory([]);
  }

  return (
    <>
      <Navbar inDashboard={false} />
      <div className="content">
        <div className="row">
          <div className="hc1">
            <ShowBoard />
          </div>
          <div className="hc2">
            <h1 className="title">
              <mark className="headingMarker">Crush</mark> your opponents with{" "}
              <mark className="headingMarker">flawless</mark> openings
            </h1>
            <Link to="/try_now">
              <button className="tryNowButton">Try now!</button>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}

export default HomePage;
