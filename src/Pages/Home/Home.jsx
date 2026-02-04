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
import PageLoader from '../../Components/PageLoader/PageLoader'

import { db } from '../../firebase/config'
import { doc, getDoc } from 'firebase/firestore'

/**
 * 🔍 DEBUG Firestore Fetch
 */
const getSectionData = async (collectionName, documentId) => {

  try {
    const docRef = doc(db, collectionName, documentId)

    const docSnap = await getDoc(docRef)

    if (docSnap.exists()) {
      const data = {
        id: docSnap.id,
        ...docSnap.data(),
      }
      return data
    } else {
      return null
    }
  } catch (error) {
    return null
  }
}

const Home = () => {
  const [loading, setLoading] = useState(true)

  const [heroSectionData, setHeroSectionData] = useState(null)
  const [bundlesHome, setBundlesHome] = useState(null)
  const [newArrivals, setNewArrivals] = useState(null)
  const [shopByCategory, setShopByCategory] = useState(null)
  const [seeHowItWorks, setSeeHowItWorks] = useState(null)
  const [homeReviews, setHomeReviews] = useState(null)
  const [freeGuide, setFreeGuide] = useState(null)

  useEffect(() => {
    const fetchHomePageData = async () => {
      setLoading(true)

      try {
        const hero = await getSectionData('homepage', 'herosection')
        const bundles = await getSectionData('homepage', 'recommendedbundles')
        const arrivals = await getSectionData('homepage', 'newarrivals')
        const category = await getSectionData('homepage', 'shopbycategory')
        const howItWorks = await getSectionData('homepage', 'seehowworks')
        const reviews = await getSectionData('homepage', 'reviews')
        const guide = await getSectionData('homepage', 'freeguide')

        setHeroSectionData(hero)
        setBundlesHome(bundles)
        setNewArrivals(arrivals)
        setShopByCategory(category)
        setSeeHowItWorks(howItWorks)
        setHomeReviews(reviews)
        setFreeGuide(guide)
      } catch (error) {
        console.error('🔥 HOME PAGE FETCH FAILED:', error)
      } finally {
        setLoading(false)
        console.log('✅ FETCH COMPLETE')
      }
    }

    fetchHomePageData()
  }, [])

  return (
    <>
      {loading && <PageLoader />}
      <Snowfall />

      <HeroSection data={heroSectionData} loading={loading} />
      <HeroTextSection />

      <BundlesHome data={bundlesHome} loading={loading} />
      <NewArrivals data={newArrivals} loading={loading} />

      <ImageCardContainer data={shopByCategory} loading={loading} />

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
