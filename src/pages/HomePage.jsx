import React from "react"
import './HomePage.css'
import ShowBoard from "../components/ShowBoard" 

function HomePage() {

    return(
        <div>
            <h1> Chess Openings </h1>
            <ShowBoard/>
        </div>
    )
}

export default HomePage