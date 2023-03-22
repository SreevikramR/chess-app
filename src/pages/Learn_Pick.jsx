import React, { useEffect, useState } from "react";
import { auth } from "../firebase";
import { useNavigate } from "react-router-dom";
import "./styles/Learn_Pick.css";
import { Link } from "react-router-dom";
import { getfName } from "../scripts/FSAcess";
import ruyLopez from "../assets/ruy-lopez.png";
import Navbar from "../components/Navbar/Navbar"
import { useChessboard } from "../contexts/BoardContext";
import PopUp from "../components/PopUp/PopUp";

const Learn_Pick = () => {
  const navigate = useNavigate();
  const [name, setName] = useState("");

  const {setPopUpState, setOpeningName, openingName} = useChessboard()

  useEffect(() => {
    setData();
    setPopUpState(false)
  }, []);

  async function setData() {
    const data = await getfName();
    setName(data);
  }

  function openPopUp() {
    setPopUpState(true)
  }

  const _openingBlock = () => {
    return (
      <div className="openingBlock" onClick={openPopUp}>
        <img src={ruyLopez} />
        <h2>{openingName}</h2>
      </div>
    );
  };

  const _learn = () => {
    return (
      <>
        <h1>Pick Opening to learn</h1>
        <div style={{ flexDirection: "row" }} className="gridrow">
          <_openingBlock />
          <_openingBlock />
          <_openingBlock />
          <_openingBlock />
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

export default Learn_Pick;
