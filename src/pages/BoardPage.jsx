import BoardComponent from "../components/BoardComponent"
import './BoardPage.css'
import navigateTo from "../components/NavigationManager"

function BoardPage() {

    function onClick(){
        navigateTo('home')
    }

    return(
        <>
            <BoardComponent/>
                <button onClick={onClick}>Back</button>
        </>
    )
}

export default BoardPage