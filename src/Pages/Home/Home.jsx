import React, { useState, useEffect } from 'react'
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
import { db } from '../../firebase/config'
import { collection, getDocs } from 'firebase/firestore'

const Home = () => {
  const [homeData, setHomeData] = useState(null)
  const [loading, setLoading] = useState(true)

  // Fetch all home page data from Firebase
  useEffect(() => {
    const fetchHomeData = async () => {
      try {
        const homeCollection = collection(db, 'homepage')
        const homeSnapshot = await getDocs(homeCollection)
        const homeList = homeSnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        }))
        setHomeData(homeList)
        setLoading(false)
        console.log('Home page data from Firebase:', homeList)
      } catch (error) {
        console.error('Error fetching home page data:', error)
        setLoading(false)
      }
    }

    fetchHomeData()
  }, [])

  // Get herosection data from homeData
  const heroSectionData = homeData?.find(item => item.id === 'herosection') || null

  return (
    <>
      <Snowfall />
      <HeroSection data={heroSectionData} loading={loading} />
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