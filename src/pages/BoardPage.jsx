import BoardComponent from "../components/BoardComponent"
import './BoardPage.css'
import { Link } from "react-router-dom"

function BoardPage(params) {
    return(
        <>
            <BoardComponent/>
            <Link to={'/'}>
                <button>Back</button>
            </Link>
        </>
    )
}

export default BoardPage