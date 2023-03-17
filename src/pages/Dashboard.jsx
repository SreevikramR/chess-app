import React, { useEffect, useState } from 'react'
import { auth } from '../firebase'
import { useNavigate } from 'react-router-dom';
import { signOut } from 'firebase/auth';
import './styles/Navbar.css'
import { getfName } from '../components/FSAcess';
import './styles/Navbar.css'
import { Link } from 'react-router-dom';
import './styles/Dashboard.css'
import learn from '../assets/learn-logo.jpg'
import train from '../assets/train-logo.jpg'

function Dashboard() {
    const navigate = useNavigate();
    const [name, setName] = useState('');

    useEffect(() => {
        setData()
    }, [])

    async function setData() {
        const data = (await getfName())
        setName(data)
    }

    const handleSignOut = () => {
        setTimeout(() => {
            auth.signOut()
            navigate('/')
        }, 200)
    }

    const _dashboard = () => {
        return (
            <>
                <div className="navbar">
                    <div className="leftAlign">
                        <Link to={"/"} style={{textDecoration: 'none'}}>
                            <h4>Chess Openings</h4>
                        </Link>
                    </div>
                    <div className="rightAlign">
                        <div className="navBarText">Welcome back {name}!</div>
                    </div>
                </div>
                <div className='content'>
                    <h1>Dashboard</h1>
                    <h2>What would you like to do today?</h2>
                    <div className='dbOptions'>
                        <_learn/>
                        <_train/>
                    </div>
                    <button onClick={handleSignOut}>Sign Out</button>
                    <button onClick={() => navigate('/')}>Home</button>
                </div>
            </>
        )
    }

    const _learn = () => {
        return (
            <div className='learnBox'>
                <img src={learn} className='learnImg'/>
                <h2>Learn</h2>
            </div>
        )
    }

    const _train = () => {
        return (
            <div className='trainBox'>
                <img src={train} className='trainImg'/>
                <h2>Practice</h2>
            </div>
        )
    }

    if (auth.currentUser === null) {
        setTimeout(() => {
            navigate('/login')
        }, 2000)
        
        return (
            <h1> Please Login </h1>
        )
    } else {
        return (
            <>
                <_dashboard/>
            </>
        )
    }

    
}

export default Dashboard