import React from 'react'
import { auth } from '../firebase'
import { Link } from 'react-router-dom'
import { useNavigate } from 'react-router-dom';

function Dashboard() {
    const navigate = useNavigate();
    console.log(auth.currentUser)

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
            <button>Sign Out</button>
        </>
    
        )
    }

    
}

export default Dashboard