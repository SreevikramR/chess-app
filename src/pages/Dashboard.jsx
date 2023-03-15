import React from 'react'
import { auth } from '../firebase'
import { useNavigate } from 'react-router-dom';
import { signOut } from 'firebase/auth';

function Dashboard() {
    const navigate = useNavigate();
    console.log(auth.currentUser)

    const handleSignOut = () => {
        setTimeout(() => {
            auth.signOut()
            navigate('/')
        }, 200)
        
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
            <h1>Dashboard</h1>
            <h2>{auth.currentUser.email}</h2>
            <button onClick={handleSignOut}>Sign Out</button>
            <button onClick={() => navigate('/')}>Home</button>
        </>
    
        )
    }

    
}

export default Dashboard