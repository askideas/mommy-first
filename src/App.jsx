import React, { useEffect } from 'react'
import Header from './Components/Header/Header'
import { BrowserRouter, Route, Routes, useLocation } from 'react-router-dom'
import Home from './Pages/Home/Home'
import Footer from './Components/Footer/Footer'
import ContactBanner from './Components/ContactBanner/ContactBanner'
import { useGlobalFadeUpAnimations } from './hooks/useFadeUpAnimation'
import BundlesRecommended from './Pages/BundlesRecommended/BundlesRecommended'
import Bundles from './Pages/Bundles/Bundles'
import Shop from './Pages/Shop/Shop'
import ScrollToTop from './Components/ScrollToTop/ScrollToTop'
import ComingSoon from './Components/ComingSoon/ComingSoon'
import ProductDetails from './Pages/ProductDetails/ProductDetails'
import ChatBot from './Components/ChatBot/ChatBot'
import Modals from './Pages/Modals/Modals'
import Stories from './Pages/Stories/Stories'
import Events from './Pages/Events/Events'
import EventDetails from './Pages/EventDetails/EventDetails'
import Wishlist from './Pages/Wishlist/Wishlist'
import SearchResults from './Pages/SearchResults/SearchResults'
import Cart from './Pages/Cart/Cart'
import About from './Pages/About/About'
import Contact from './Pages/Contact/Contact'
import FAQ from './Pages/FAQ/FAQ'
import Enquiries from './Pages/Enquiries/Enquiries'
import Profile from './Pages/Profile/Profile'
import AuthCallback from './Pages/AuthCallback/AuthCallback'
import ProtectedRoute from './Components/ProtectedRoute/ProtectedRoute'
import { AuthProvider } from './contexts/AuthContext'
import { CartProvider } from './contexts/CartContext'
import CareHub from './Pages/Carehub/CareHub'
import Blogs from './Pages/Blogs/Blogs'
import BlogDetails from './Pages/BlogDetails/BlogDetails'
import AFMarketing from './Pages/AFMarketing/AFMarketing'
import Collection from './Pages/Collection/Collection'
import Donation from './Pages/Donation/Donation'
import NotFound from './Pages/NotFound/NotFound'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import './App.css'
import ReturnRefund from './Pages/ReturnRefund/ReturnRefund'
import AppScreen from './Pages/AppScreen/AppScreen'

const AppContent = () => {
  // Enable global fade-up animations for all elements with fade-up classes
  useGlobalFadeUpAnimations()
  
  const location = useLocation();

  useEffect(() => {
    const closeBtn = document.querySelector('#MegaMenuModal .close-btn');
      if (closeBtn) {
        closeBtn.click();
      }
  }, [location.pathname]);

  return (
    <>
      <ToastContainer
        position="top-center"
        autoClose={1500}
        hideProgressBar={true}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss={false}
        draggable={false}
        pauseOnHover={false}
      />
      <div>
        <ScrollToTop />
        <Header />
        <Routes>
          <Route element={<Home/>} path='/' />
          <Route element={<Shop/>} path='/shop' />
          <Route element={<Collection/>} path='/collection/:collectionHandle' />
          <Route element={<SearchResults/>} path='/search' />
          <Route element={<SearchResults/>} path='/search/:query' />
          <Route element={<ProductDetails/>} path='/shop/:productHandle' />
          <Route element={<Bundles/>} path='/bundles' />
          <Route element={<BundlesRecommended/>} path='/bundles/recommended' />
          <Route element={<ComingSoon/>} path='/pregnancy-care' />
          <Route element={<ComingSoon/>} path='/postpartum-care' />
          <Route element={<CareHub/>} path='/care-hub' />
          <Route element={<Stories/>} path='/stories' />
          <Route element={<Wishlist/>} path='/wishlist' />
          <Route element={<Cart/>} path='/cart' />
          <Route element={<Events />} path='/events' />
          <Route element={<EventDetails />} path='/events/:eventId' />
          <Route element={<About/>} path='/about' />
          <Route element={<Contact/>} path='/contact' />
          <Route element={<FAQ/>} path='/faqs' />
          <Route element={<Blogs/>} path='/blogs' />
          <Route element={<BlogDetails/>} path='/blogs/:id' />
          <Route element={<Enquiries/>} path='/enquiries' />
          <Route element={<AFMarketing/>} path='/af-marketing' />
          <Route element={<ProtectedRoute><Profile/></ProtectedRoute>} path='/profile' />
          <Route element={<AuthCallback/>} path='/auth/callback' />
          <Route element={<Donation/>} path='/donation' />
          <Route element={<ReturnRefund/>} path='/returns-refunds' />
          {/* <Route element={<AppScreen />} path='/download-app' /> */}
          <Route element={<NotFound/>} path='*' />
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
    <AuthProvider>
      <CartProvider>
        <BrowserRouter>
          <AppContent />
        </BrowserRouter>
      </CartProvider>
    </AuthProvider>
  )
}

export default App