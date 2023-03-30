import { Link } from "react-router-dom";
import { auth } from "../../firebase";
import { useState, useEffect } from "react";
import { getfName } from "../../scripts/FSAcess";
import "./Navbar.css";

const Navbar = ({ inDashboard }) => {
  const [loggedIn, setLoggedIn] = useState(false);
  const [username, setUsername] = useState("");

  async function setData() {
    const data = await getfName();
    setUsername(data);
  }

  useEffect(() => {
    setTimeout(() => {
      const user = auth.currentUser;
      if (user == null) {
        setLoggedIn(false);
      } else {
        setData();
        setLoggedIn(true);
      }
    }, 50);
  }, []);

  const _loggedIn = () => {
    return (
      <div className="rightAlignLoggedIn">
        <div className="textSplitter">
          <Link to="/dashboard" style={{ textDecoration: "none" }}>
            <div className="navBarText">Hi {username}</div>
          </Link>
        </div>
        <Link to="/dashboard">
          <button className="navBarButton">Dashboard</button>
        </Link>
      </div>
    );
  };

  const _loggedOut = () => {
    return (
      <div className="rightAlignNotLoggedIn">
        <div className="textSplitter">
          <Link to="/login" style={{ textDecoration: "none" }}>
            <div className="navBarText">Login</div>
          </Link>
        </div>
        <div className="textSplitter">
          <Link to="/register" style={{ textDecoration: "none" }}>
            <div className="navBarText">Register</div>
          </Link>
        </div>
        <Link to="/try_now">
          <button className="navBarButton">Try Now!</button>
        </Link>
      </div>
    );
  };

  const RightAlignContent = () => {
    if (inDashboard == false) {
      if (loggedIn) {
        return <_loggedIn />;
      } else {
        return <_loggedOut />;
      }
    } else {
      return (
        <div className="rightAlign">
          <div className="navBarText">Welcome back {username}!</div>
        </div>
      );
    }
  };

  return (
    <>
      <div className="navbar">
        <div className="leftAlign">
          <Link to="/" style={{ textDecoration: "none" }}>
            <h4>Chess Openings</h4>
          </Link>
        </div>
        <RightAlignContent />
      </div>
    </>
  );
};

export default Navbar;
