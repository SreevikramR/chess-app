import React, { useEffect } from 'react'
import { useChessboard } from '../../contexts/BoardContext'
import './PopUp.css'
import { Link } from 'react-router-dom'

const PopUp = () => {
  const {popUpState, setPopUpState, openingName} = useChessboard()

  useEffect(() => {
    if(popUpState) {
      document.getElementById('modal').classList.add('active')
      document.getElementById('overlay').classList.add('active')
    } else {
      closePopUp()
    }
  }, [popUpState])

  function closePopUp() {
    document.getElementById('modal').classList.remove('active')
    document.getElementById('overlay').classList.remove('active')
    setPopUpState(false)
  }

  return (
    <>
        <div className="modal"  id="modal">
          <div className="modal-header">
            <div className="title">The {openingName}</div>
            <button className="close-button" onClick={closePopUp}>&times;</button>
          </div>
          <div className="modal-body">
          The Ruy Lopez, also known as the Spanish Opening, is one of the oldest and most popular chess openings in the game's history. It begins with the moves 1.e4 e5 2.Nf3 Nc6 3.Bb5, in which the white bishop attacks the black knight on c6. The Ruy Lopez is considered a highly strategic opening and is intended for intermediate to advanced level players. It has a numerical difficulty score of 4 out of 5, which means it requires a good understanding of pawn structures, piece coordination, and positional play.

There are several reasons why players should learn the Ruy Lopez. Firstly, it allows white to control the center of the board and develop pieces quickly. Secondly, it offers white the opportunity to put pressure on black's pawn structure, particularly on the weak d6-pawn. Thirdly, the Ruy Lopez provides white with various attacking options and a chance to gain a strong initiative early on in the game.

Although the Ruy Lopez can be played from either side, it is more commonly seen from the white perspective. However, the opening has been extensively studied and analyzed by both players, and it is known to be a highly dynamic and strategic battle. While the Ruy Lopez does not necessarily guarantee a win for white, it has been shown to be a highly effective and versatile opening. As such, it is a valuable addition to any player's repertoire and can lead to improved results on the board.
            <Link to='/learn' onClick={() => setPopUpState(false)}>
              <button className='learnButton'>Learn now!</button>
            </Link>
          </div>
        </div>
        <div id="overlay" onClick={closePopUp}></div>
    </>
  )
}

export default PopUp