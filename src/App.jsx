import React from 'react'
import Header from './Components/Header/Header'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Home from './Pages/Home/Home'
import Footer from './Components/Footer/Footer'
import ContactBanner from './Components/ContactBanner/ContactBanner'
import { useGlobalFadeUpAnimations } from './hooks/useFadeUpAnimation'
import './App.css'

const App = () => {
  // Enable global fade-up animations for all elements with fade-up classes
  useGlobalFadeUpAnimations()

  return (
    <>
      <BrowserRouter>
        <Header />
        <Routes>
          <Route element={<Home/>} path='/' />
        </Routes>
        <ContactBanner />
        <Footer />
      </BrowserRouter>
    </>
  )
}

export default App