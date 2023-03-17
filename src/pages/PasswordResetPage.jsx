import './styles/LoginPage.css'
import { Link } from 'react-router-dom'
import { useState } from 'react'
import { auth } from '../firebase'
import { sendPasswordResetEmail } from 'firebase/auth'
import { useNavigate } from 'react-router-dom'
import './styles/Navbar.css'
import Navbar from '../components/Navbar'

const PasswordResetPage = () => {
    const [email, setEmail] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const [loading, setLoading] = useState(false)
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault()
        try{
            setLoading(true);
            await sendPasswordResetEmail(auth, email)
            console.log("password reset email sent")
            document.getElementById("errorBox").style.backgroundColor = 'green'
            setErrorMessage("Reset Email sent!")
            //navigate('/dashboard')
            setLoading(false)
        } catch (error) {
            document.getElementById("errorBox").style.display = 'block'
            document.getElementById("errorBox").style.backgroundColor = 'rgba(255, 25, 25, 0.753)'
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
                case "auth/missing-email":
                    setErrorMessage("Please enter a valid email")
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
            setLoading(false)
            console.log(error.message);
        }
    }

    return (
        <div>
            <Navbar/>
            <div className='content'>
                <h1>Login</h1>
                <div id='errorBox' className='errorBox'><p className='errorMessage'>{errorMessage}</p></div>
                <form>
                    <label>Email</label>
                    <input type='email' placeholder='name@mail.com' id='email' value={email} onChange={(e) => setEmail(e.target.value)}/>
                    <button onClick={handleSubmit} type='submit' className='submitButton' disabled={loading}>Reset Password</button>
                </form>
                <div className='otherActions'>
                    <Link to='/register' style={{textDecoration: 'none'}}>
                        <label className='registerButton'>Register</label>
                    </Link>
                    <Link to='/login' style={{textDecoration: 'none'}}>
                        <label className='forgotPassword'>Login</label>
                    </Link>
                </div>
            </div>
        </div>
    )
}

export default PasswordResetPage