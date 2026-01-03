import React from 'react'
import Header from './Components/Header/Header'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Home from './Pages/Home/Home'
import Footer from './Components/Footer/Footer'
import ContactBanner from './Components/ContactBanner/ContactBanner'
import { useGlobalFadeUpAnimations } from './hooks/useFadeUpAnimation'
import './App.css'
import BundlesRecommended from './Pages/BundlesRecommended/BundlesRecommended'
import Bundles from './Pages/Bundles/Bundles'
import Shop from './Pages/Shop/Shop'
import ScrollToTop from './Components/ScrollToTop/ScrollToTop'
import ComingSoon from './Components/ComingSoon/ComingSoon'
import ProductDetails from './Pages/ProductDetails/ProductDetails'
import ChatBot from './Components/ChatBot/ChatBot'
import Modals from './Pages/Modals/Modals'
import PageLoader from './Components/PageLoader/PageLoader'
import { useLoading } from './contexts/LoadingContext'
import { usePageLoading } from './hooks/usePageLoading'
import Stories from './Pages/Stories/Stories'
import Events from './Pages/Events/Events'
import EventDetails from './Pages/EventDetails/EventDetails'
import Wishlist from './Pages/Wishlist/Wishlist'
import SearchResults from './Pages/SearchResults/SearchResults'

const AppContent = () => {
  // Enable global fade-up animations for all elements with fade-up classes
  useGlobalFadeUpAnimations()
  
  // Handle page loading on route changes
  usePageLoading()
  
  const { isLoading } = useLoading()

  return (
    <>
      {isLoading && <PageLoader />}
      <div style={{ opacity: isLoading ? 0 : 1, transition: 'opacity 0.3s ease' }}>
        <ScrollToTop />
        <Header />
        <Routes>
          <Route element={<Home/>} path='/' />
          <Route element={<Shop/>} path='/shop' />
          <Route element={<SearchResults/>} path='/search' />
          <Route element={<SearchResults/>} path='/search/:query' />
          <Route element={<ProductDetails/>} path='/shop/:productid' />
          <Route element={<Bundles/>} path='/bundles' />
          <Route element={<BundlesRecommended/>} path='/bundles/recommended' />
          <Route element={<ComingSoon/>} path='/pregnancy-care' />
          <Route element={<ComingSoon/>} path='/postpartum-care' />
          <Route element={<ComingSoon/>} path='/care-hub' />
          <Route element={<Stories/>} path='/stories' />
          <Route element={<Wishlist/>} path='/wishlist' />
          <Route element={<Events />} path='/events' />
          <Route element={<EventDetails />} path='/events/:eventId' />
        </Routes>
        <ContactBanner />
        <Footer />
        <ChatBot />
        <Modals />
      </div>
    </>
  )
}

const App = () => {
  return (
    <BrowserRouter>
      <AppContent />
    </BrowserRouter>
  )
}

export default App