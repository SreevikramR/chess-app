import './styles/RegisterPage.css'
import { Link } from 'react-router-dom'
import React, {useState} from 'react'
import { useAuth } from '../contexts/AuthContext'

const RegisterPage = () => {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [passwordConfirm, setPasswordConfirm] = useState('');
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [userName, setUserName] = useState('');
    const { register } = useAuth()

    const handleSubmit = (e) => {
        e.preventDefault()
        console.log(email + password)
        register(email, password)
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
            <h1>Register</h1>
            <form>
                <div className='nameSection'>
                    <div className='fNameSection'>
                        <label className='fNameLabel'>First Name</label>
                        <input type='text' placeholder='First' value={firstName} onChange={(e) => setFirstName(e.target.value)} className='fName'/>
                    </div>
                    <div className='lNameSection'>
                        <label className='lNameLabel'>Last Name</label>
                        <input type='text' placeholder='Last' value={lastName} onChange={(e) => setLastName(e.target.value)} className='lName'/>
                    </div>
                </div>
                <label>Username</label>
                <input type='text' placeholder='username' id='text' value={userName} onChange={(e) => setUserName(e.target.value)}/>
                <label>Email</label>
                <input type='email' placeholder='name@mail.com' id='email' value={email} onChange={(e) => setEmail(e.target.value)}/>
                <label>Password</label>
                <input type='password' placeholder='**********' id='password' value={password} onChange={(e) => setPassword(e.target.value)}/>
                <label>Password Confirmation</label>
                <input type='password' placeholder='**********' id='password' value={passwordConfirm} onChange={(e) => setPasswordConfirm(e.target.value)}/>
                <button onClick={handleSubmit} type='submit'>Register!</button>
            </form>
        </div>
    )
}

export default RegisterPage