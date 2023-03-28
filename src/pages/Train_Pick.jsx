import React, { useEffect, useState } from "react";
import { auth } from "../firebase";
import { useNavigate } from "react-router-dom";
import "./styles/Learn_Pick.css";
import { Link } from "react-router-dom";
import { getLines, getfName, setFirstLine, readOpening, getAllOpenings } from "../scripts/FSAcess";
import ruyLopez from "../assets/ruy-lopez.png";
import Navbar from "../components/Navbar/Navbar"
import { useChessboard } from "../contexts/BoardContext";
import PopUp from "../components/PopUp/PopUp";

const Train_Pick = () => {
  const navigate = useNavigate();
  const {setPopUpState, setOpeningName, openingName, setOpeningLine, setLineVariations, allOpenings, setPlayerColor, setPopUpType} = useChessboard()

  let tiles = []

  for(let i=0; i < allOpenings.length; i++){
    let opening = allOpenings[i]
    let _openingBlock = (
      <div className="openingBlock" onClick={() => openPopUp(opening)}>
        <img src={ruyLopez} />
        <h2>{opening}</h2>
      </div>
    );
    tiles.push(_openingBlock)
  }

  useEffect(() => {
    setPopUpState(false)
    setPopUpType('train')
    getAllOpenings()
  }, []);

  async function openPopUp(opening) {
    console.log(opening)
    setPopUpState(true)
    setOpeningName(opening)
    await readOpening(opening)
    await setOpeningLine(await setFirstLine(opening))
    await setLineVariations(await getLines())
    await setPlayerColor('white')
  }

  const _learn = () => {
    return (
      <>
        <h1>Pick Opening to train</h1>
        <div style={{ flexDirection: "row" }} className="gridrow">
          {tiles}
        </div>
      </>
    );
  };

  if (auth.currentUser === null) {
    setTimeout(() => {
      navigate("/login");
    }, 3000);

    return (
      <div style={{ marginTop: "40vh" }}>
        <h1> Please Login to view this page.</h1>
        <h2 style={{ marginTop: "2vh" }}>Redirecting to login page...</h2>
      </div>
    );
  } else {
    return (
      <>
        <Navbar />
        <div className="content">
          <_learn />
        </div>
        <PopUp />
      </>
    );
  }
};

export default Train_Pick;
