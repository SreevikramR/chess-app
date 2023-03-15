import { Link } from "react-router-dom"

const Navbar = () => {
  return (
    <div className="navbar">
        <div className="leftAlign">
            <Link to={"/"} style={{textDecoration: 'none'}}>
                <h4>Chess Openings</h4>
            </Link>
        </div>
        <div className="rightAlign">
            <div className="textSplitter">
                <Link to="/login" style={{ textDecoration: 'none' }}>
                    <div className="navBarText">Login</div>
                </Link>
            </div>
            <div className="textSplitter">
                <Link to='/register' style={{ textDecoration: 'none' }}>
                    <div className="navBarText">Register</div>
                </Link>
            </div>
            <Link to='/try_now'>
                <button className="navBarButton">Try Now!</button>
            </Link>
        </div>
    </div>
  )
}

export default Navbar