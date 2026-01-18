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
  // Try to find by id 'herosection' or use the first document if not found
  const heroSectionData = homeData?.find(item => item.id === 'herosection') || homeData?.[0] || null
  const bundlesHome = homeData?.find(item => item.id === 'recommendedbundles') || homeData?.[0] || null
  const newArrivals = homeData?.find(item => item.id === 'newarrivals') || homeData?.[0] || null
  const shopByCategory = homeData?.find(item => item.id === 'shopbycategory') || homeData?.[0] || null
  const seeHowItWorks = homeData?.find(item => item.id === 'seehowworks') || homeData?.[0] || null
  const homeReviews = homeData?.find(item => item.id === 'reviews') || homeData?.[0] || null
  const freeGuide = homeData?.find(item => item.id === 'freeguide') || homeData?.[0] || null
  

  return (
    <>
      <Snowfall />
      <HeroSection data={heroSectionData} loading={loading} />
      <HeroTextSection />
      <BundlesHome data={bundlesHome} loading={loading} />
      <NewArrivals data={newArrivals} loading={loading} />
      <ImageCardContainer data={shopByCategory} />
      <MommyFirstTrust />
      <HomeVideoSection data={seeHowItWorks} loading={loading} />
      <StoriesHome data={homeReviews} loading={loading} />
      <ActivitiesHome />
      <FreeGuide data={freeGuide} loading={loading} />
      <MomsHub />
    </>
  )
}

export default Home