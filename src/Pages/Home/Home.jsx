import React from 'react'
import MomsHub from '../../Components/MomsHub/MomsHub'
import ActivitiesHome from '../../Components/ActivitiesHome/ActivitiesHome'
import FreeGuide from '../../Components/FreeGuide/FreeGuide'

const Home = () => {
  return (
    <>
      <ActivitiesHome />
      <FreeGuide />
      <MomsHub />
    </>
  )
}

export default Home