import React, { useEffect, useState } from "react";
import { auth } from "../firebase";
import { useNavigate } from "react-router-dom";
import "../components/styles/Navbar.css";
import "./styles/Learn_Pick.css";
import { Link } from "react-router-dom";
import { getfName } from "../components/FSAcess";
import ruyLopez from "../assets/ruy-lopez.png";

const Learn_Pick = () => {
  const navigate = useNavigate();
  const [name, setName] = useState("");

  useEffect(() => {
    setData();
  }, []);

  async function setData() {
    const data = await getfName();
    setName(data);
  }

  const _openingBlock = () => {
    return (
      <div className="openingBlock">
        <img src={ruyLopez} />
        <h2>Ruy Lopez</h2>
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
        <div className="navbar">
          <div className="leftAlign">
            <Link to={"/"} style={{ textDecoration: "none" }}>
              <h4>Chess Openings</h4>
            </Link>
          </div>
          <div className="rightAlign">
            <div className="navBarText">Welcome back {name}!</div>
          </div>
        </div>
        <div className="content">
          <_learn />
        </div>
      </>
    );
  }
};

export default Learn_Pick;
