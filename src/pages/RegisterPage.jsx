import './styles/RegisterPage.css'
import React, {useState} from 'react'
import { createUserWithEmailAndPassword, onAuthStateChanged, setPersistence, browserSessionPersistence } from 'firebase/auth'
import { auth } from '../firebase'
import { useNavigate } from "react-router-dom";
import Navbar from '../components/Navbar'
import './styles/Navbar.css'

const RegisterPage = () => {
    const navigate = useNavigate();

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [passwordConfirm, setPasswordConfirm] = useState('');
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [userName, setUserName] = useState('');
    const [errorMessage, setErrorMessage] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault()
        if(password !== passwordConfirm) {
            document.getElementById("errorBox").style.display = 'block'
            setErrorMessage("Passwords don't match")
        } else {
            try{
                await setPersistence(auth, browserSessionPersistence).then(() =>
                    createUserWithEmailAndPassword(auth, email, password))
                console.log("user: " + auth.currentUser)
                navigate('/dashboard')
            } catch (error) {
                document.getElementById("errorBox").style.display = 'block'
                switch(error.code){
                    case "auth/email-already-exists":
                        setErrorMessage("Account with Email already exists")
                        break
                    case "auth/missing-email":
                        setErrorMessage("Please enter an email")
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
                    case "auth/weak-password":
                        setErrorMessage("Please enter a longer password")
                        break
                    default:
                        setErrorMessage("Code: " + error.code)
                        break
                }
                console.log(error.code);
            }
        }
        
    }

    return (
        <div>
            <Navbar/>
            <div className='content'>
                <h1>Register</h1>
                <div id='errorBox' className='errorBox'><p className='errorMessage'>{errorMessage}</p></div>
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
                    <input type='password' placeholder='**********' id='passwordConfirm' value={passwordConfirm} onChange={(e) => setPasswordConfirm(e.target.value)}/>
                    <button onClick={handleSubmit} type='submit' className='submitButton'>Register!</button>
                </form>
            </div>
        </div>
    )
}

export default RegisterPage