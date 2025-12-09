import React from 'react'
import MomsHub from '../../Components/MomsHub/MomsHub'
import ActivitiesHome from '../../Components/ActivitiesHome/ActivitiesHome'
import FreeGuide from '../../Components/FreeGuide/FreeGuide'
import StoriesHome from '../../Components/StoriesHome/StoriesHome'
import HomeVideoSection from '../../Components/HomeVideoSection/HomeVideoSection'

const Home = () => {
  return (
    <>
      <HomeVideoSection />
      <StoriesHome />
      <ActivitiesHome />
      <FreeGuide />
      <MomsHub />
    </>
  )
}

export default Home