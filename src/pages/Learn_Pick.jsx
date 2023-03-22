import React, { useEffect, useState } from "react";
import { auth } from "../firebase";
import { useNavigate } from "react-router-dom";
import "./styles/Learn_Pick.css";
import { Link } from "react-router-dom";
import { getfName } from "../scripts/FSAcess";
import ruyLopez from "../assets/ruy-lopez.png";
import Navbar from "../components/Navbar/Navbar"

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
      <Link to={"/learn"}>
        <div className="openingBlock">
          <img src={ruyLopez} />
          <h2>Ruy Lopez</h2>
        </div>
      </Link>
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
        <div className="modal" id="modal">
          <div className="modal-header">
            <div className="title">Modal Title</div>
            <button className="close-button">&times;</button>
          </div>
          <div className="modal-body">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Mattis vulputate enim nulla aliquet porttitor lacus luctus. In dictum non consectetur a erat nam. Pellentesque sit amet porttitor eget. Potenti nullam ac tortor vitae purus faucibus ornare suspendisse sed. Sagittis orci a scelerisque purus semper eget. Nam at lectus urna duis convallis convallis tellus. Convallis convallis tellus id interdum. Mi in nulla posuere sollicitudin aliquam ultrices sagittis orci. Sodales neque sodales ut etiam sit. Tincidunt eget nullam non nisi est. Ullamcorper velit sed ullamcorper morbi tincidunt ornare massa eget egestas. Euismod quis viverra nibh cras pulvinar mattis nunc sed. Tempor nec feugiat nisl pretium fusce id velit ut tortor
          </div>
        </div>
        <div id="overlay"></div>
      </>
    );
  }
};

export default Learn_Pick;
