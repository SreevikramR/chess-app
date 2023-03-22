import React from 'react'
import Navbar from '../components/Navbar/Navbar'
import LearnBoardWhite from '../components/Board/LearnBoardWhite'

const LearnPage = () => {
  return (
    <>
      <Navbar/>
      <div className='content'>
        <LearnBoardWhite />
      </div>
    </>
  )
}

export default LearnPage