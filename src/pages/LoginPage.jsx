import './styles/LoginPage.css'
import { Link } from 'react-router-dom'
import { useState, useEffect } from 'react'
import { auth } from '../firebase'
import { setPersistence, signInWithEmailAndPassword, browserSessionPersistence } from 'firebase/auth'
import { useNavigate } from 'react-router-dom'
import Navbar from '../components/Navbar'

const LoginPage = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const [loggedIn, setLoggedIn] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        if(loggedIn){
            navigate('/dashboard')
        }
    }, [loggedIn])
    
    useEffect(() => {
        const user = auth.currentUser
        if(user == null) {
            setLoggedIn(false)
        } else {
            setLoggedIn(true)
        }
    }, [])

    const handleSubmit = async (e) => {
        e.preventDefault()
        try{
            await setPersistence(auth, browserSessionPersistence).then(() => signInWithEmailAndPassword(auth, email, password))
            navigate('/dashboard')
        } catch (error) {
            document.getElementById("errorBox").style.display = 'block'
            switch(error.code){
                case "auth/user-not-found":
                    setErrorMessage("No Account found, try making one!")
                    break
                case "auth/internal-error":
                    setErrorMessage("Server Error: Please try again later")
                    break
                case "auth/invalid-email":
                    setErrorMessage("Please enter a valid email")
                    break
                case "auth/invalid-password":
                    setErrorMessage("Please enter a valid password")
                    break
                case "auth/wrong-password":
                    setErrorMessage("Username/password is incorrect")
                    break
                case "auth/too-many-requests":
                    setErrorMessage("Too many attemps, please try again later")
                    break
                default:
                    setErrorMessage("Code: " + error.code)
                    break
            }
            console.log(error.message);
        }
    }

    return (
        <div>
            <Navbar inDashboard={false}/>
            <div className='content'>
                <h1>Login</h1>
                <div id='errorBox' className='errorBox'><p className='errorMessage'>{errorMessage}</p></div>
                <form>
                    <label>Email</label>
                    <input type='email' placeholder='name@mail.com' id='email' value={email} onChange={(e) => setEmail(e.target.value)}/>
                    <label>Password</label>
                    <input type='password' placeholder='**********' id='password' value={password} onChange={(e) => setPassword(e.target.value)}/>
                    <button onClick={handleSubmit} type='submit' className='submitButton'>Login!</button>
                </form>
                <div className='otherActions'>
                    <Link to='/register' style={{textDecoration: 'none'}}>
                        <label className='registerButton'>Register</label>
                    </Link>
                    <Link to='/reset' style={{textDecoration: 'none'}}>
                        <label className='forgotPassword'>Forgot Password?</label>
                    </Link>
                </div>
            </div>
        </div>
    )
}

export default LoginPage