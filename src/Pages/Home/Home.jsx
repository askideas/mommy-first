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
import WelcomeModal from '../../Components/WelcomeModal/WelcomeModal'

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
  const [showWelcomeModal, setShowWelcomeModal] = useState(false)

  const [heroSectionData, setHeroSectionData] = useState(null)
  const [bundlesHome, setBundlesHome] = useState(null)
  const [newArrivals, setNewArrivals] = useState(null)
  const [shopByCategory, setShopByCategory] = useState(null)
  const [seeHowItWorks, setSeeHowItWorks] = useState(null)
  const [homeReviews, setHomeReviews] = useState(null)
  const [freeGuide, setFreeGuide] = useState(null)
  const [textSectionData, setTextSectionData] = useState(null)
  const [momsTrustData, setMomsTrustData] = useState(null)

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
        const textSection = await getSectionData('homepage', 'textsection')
        const momsTrust = await getSectionData('homepage', 'momstrust')

        setHeroSectionData(hero)
        setBundlesHome(bundles)
        setNewArrivals(arrivals)
        setShopByCategory(category)
        setSeeHowItWorks(howItWorks)
        setHomeReviews(reviews)
        setFreeGuide(guide)
        setTextSectionData(textSection)
        setMomsTrustData(momsTrust)
      } catch (error) {
        console.error('🔥 HOME PAGE FETCH FAILED:', error)
      } finally {
        setLoading(false)
        console.log('✅ FETCH COMPLETE')
        
        // Check if we should show the welcome modal
        checkWelcomeModal()
      }
    }

    fetchHomePageData()
  }, [])

  // Check if welcome modal should be shown (24-hour logic)
  const checkWelcomeModal = () => {
    const MODAL_KEY = 'welcomeModalLastClosed'
    const lastClosed = localStorage.getItem(MODAL_KEY)
    
    if (!lastClosed) {
      // Never closed before, show modal
      setShowWelcomeModal(true)
    } else {
      const lastClosedTime = parseInt(lastClosed, 10)
      const currentTime = new Date().getTime()
      const twentyFourHours = 24 * 60 * 60 * 1000 // 24 hours in milliseconds
      
      // Check if 24 hours have passed
      if (currentTime - lastClosedTime >= twentyFourHours) {
        setShowWelcomeModal(true)
      }
    }
  }

  // Handle modal close
  const handleWelcomeModalClose = () => {
    const MODAL_KEY = 'welcomeModalLastClosed'
    const currentTime = new Date().getTime()
    localStorage.setItem(MODAL_KEY, currentTime.toString())
    setShowWelcomeModal(false)
  }

  return (
    <>
      {loading && <PageLoader />}
      {!loading && <WelcomeModal isOpen={showWelcomeModal} onClose={handleWelcomeModalClose} />}
      {/* <Snowfall /> */}

      {heroSectionData && heroSectionData.isEnabled && <HeroSection data={heroSectionData} loading={loading} />}
      {textSectionData && <HeroTextSection />}

      {bundlesHome && bundlesHome.isEnabled && <BundlesHome data={bundlesHome} loading={loading} />}
      {newArrivals && newArrivals.isEnabled && <NewArrivals data={newArrivals} loading={loading} />}

      {shopByCategory && shopByCategory.isEnabled && <ImageCardContainer data={shopByCategory} loading={loading} />}

      {momsTrustData && momsTrustData.isEnabled && <MommyFirstTrust />}

      {seeHowItWorks && seeHowItWorks.isEnabled && <HomeVideoSection data={seeHowItWorks} loading={loading} />}
      {homeReviews && homeReviews.isEnabled && <StoriesHome data={homeReviews} loading={loading} />}

      <ActivitiesHome />

      {freeGuide && freeGuide.isEnabled && <FreeGuide data={freeGuide} loading={loading} />}
      <MomsHub />
    </>
  )
}

export default Home
