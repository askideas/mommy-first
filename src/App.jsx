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

const App = () => {
  // Enable global fade-up animations for all elements with fade-up classes
  useGlobalFadeUpAnimations()

  return (
    <>
      <BrowserRouter>
        <Header />
        <Routes>
          <Route element={<Home/>} path='/' />
          <Route element={<Shop/>} path='/shop' />
          <Route element={<Bundles/>} path='/bundles' />
          <Route element={<BundlesRecommended/>} path='/bundles/recommended' />
        </Routes>
        <ContactBanner />
        <Footer />
      </BrowserRouter>
    </>
  )
}

export default App