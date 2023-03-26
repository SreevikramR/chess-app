import React, { useEffect, useState } from "react";
import { auth } from "../firebase";
import { useNavigate } from "react-router-dom";
import { signOut } from "firebase/auth";
import { getAllOpenings, getfName } from "../scripts/FSAcess";
import { Link } from "react-router-dom";
import "./styles/Dashboard.css";
import learn from "../assets/learn-logo.jpg";
import train from "../assets/train-logo.jpg";
import { useChessboard } from "../contexts/BoardContext";

function Dashboard() {
  const navigate = useNavigate();
  const [name, setName] = useState("");

  const {setAllOpenings} = useChessboard()

  useEffect(() => {
    setData();
    getData()
  }, []);

  async function getData(){
    const openings = await getAllOpenings()
    setAllOpenings(openings)
  }

  async function setData() {
    const data = await getfName();
    setName(data);
  }

  const handleSignOut = () => {
    setTimeout(() => {
      auth.signOut();
      navigate("/");
    }, 200);
  };

  const _dashboard = () => {
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
          <h1>Dashboard</h1>
          <h2>What would you like to do today?</h2>
          <div className="dbOptions">
            <_learn />
            <_train />
          </div>
          <button onClick={handleSignOut}>Sign Out</button>
          <button onClick={() => navigate("/")}>Home</button>
        </div>
      </>
    );
  };

  const _learn = () => {
    return (
      <Link to="/learn_now">
        <div className="learnBox">
          <img src={learn} className="learnImg" />
          <h2>Learn</h2>
        </div>
      </Link>
    );
  };

  const _train = () => {
    return (
      <div className="trainBox">
        <img src={train} className="trainImg" />
        <h2>Practice</h2>
      </div>
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
        <_dashboard />
      </>
    );
  }
}

export default Dashboard;
