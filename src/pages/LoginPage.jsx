import './styles/LoginPage.css'
import { Link } from 'react-router-dom'
import { useState } from 'react'

const LoginPage = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = (e) => {
        console.log(email + password)
    }

    return (
        <div>
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
            <h1>Login</h1>
            <form>
                <label>Email</label>
                <input type='email' placeholder='name@mail.com' id='email' value={email} onChange={(e) => setEmail(e.target.value)}/>
                <label>Password</label>
                <input type='password' placeholder='**********' id='password' value={password} onChange={(e) => setPassword(e.target.value)}/>
                <button onClick={handleSubmit} type='submit'>Register!</button>
            </form>
        </div>
    )
}

export default LoginPage