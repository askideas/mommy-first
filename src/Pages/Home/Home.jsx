import React from 'react'
import MomsHub from '../../Components/MomsHub/MomsHub'
import ActivitiesHome from '../../Components/ActivitiesHome/ActivitiesHome'
import FreeGuide from '../../Components/FreeGuide/FreeGuide'
import StoriesHome from '../../Components/StoriesHome/StoriesHome'
import HomeVideoSection from '../../Components/HomeVideoSection/HomeVideoSection'
import ImageCardContainer from '../../Components/ImageCardContainer/ImageCardContainer'
import NewArrivals from '../../Components/NewArrivals/NewArrivals'
import MommyFirstTrust from '../../Components/MommyFirstTrust/MommyFirstTrust'
import BundlesHome from '../../Components/BundlesHome/BundlesHome'
import HeroSection from '../../Components/HeroSection/HeroSection'
import HeroTextSection from '../../Components/HeroTextSection/HeroTextSection'
import Snowfall from '../../Components/Snowfall/Snowfall'

const Home = () => {
  return (
    <>
      {/* <Snowfall /> */}
      <HeroSection />
      <HeroTextSection />
      <BundlesHome />
      <NewArrivals />
      <ImageCardContainer />
      <MommyFirstTrust />
      <HomeVideoSection />
      <StoriesHome />
      <ActivitiesHome />
      <FreeGuide />
      <MomsHub />
    </>
  )
}

export default Home