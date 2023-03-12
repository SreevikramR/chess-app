import React from "react"
import './HomePage.css'
import ShowBoard from "../components/ShowBoard" 
import { Link } from "react-router-dom"

function HomePage() {

    return(
        <div>
            <h1> Chess Openings </h1>
            <div className='row'>
			    <div className='hc1'>
				    <ShowBoard/>
			    </div>
			    <div className='hc2'>
				    <Link to='/board'>
                        <button>Try now!</button>
                    </Link>
			    </div>
    	    </div>  
        </div>
    )
}

export default HomePage