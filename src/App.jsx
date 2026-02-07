import React, { useEffect, lazy, Suspense } from 'react'
import Header from './Components/Header/Header'
import { BrowserRouter, Route, Routes, useLocation } from 'react-router-dom'
import Footer from './Components/Footer/Footer'
import ContactBanner from './Components/ContactBanner/ContactBanner'
import { useGlobalFadeUpAnimations } from './hooks/useFadeUpAnimation'
import ScrollToTop from './Components/ScrollToTop/ScrollToTop'
import ChatBot from './Components/ChatBot/ChatBot'
import Modals from './Pages/Modals/Modals'
import ProtectedRoute from './Components/ProtectedRoute/ProtectedRoute'
import { AuthProvider } from './contexts/AuthContext'
import { CartProvider } from './contexts/CartContext'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import './App.css'
import PageLoader from './Components/PageLoader/PageLoader'
import LiveSessionDetails from './Pages/LiveSessionDetails/LiveSessionDetails'

// Lazy load page components
const Home = lazy(() => import('./Pages/Home/Home'))
const Shop = lazy(() => import('./Pages/Shop/Shop'))
const Collection = lazy(() => import('./Pages/Collection/Collection'))
const SearchResults = lazy(() => import('./Pages/SearchResults/SearchResults'))
const ProductDetails = lazy(() => import('./Pages/ProductDetails/ProductDetails'))
const Bundles = lazy(() => import('./Pages/Bundles/Bundles'))
const BundlesRecommended = lazy(() => import('./Pages/BundlesRecommended/BundlesRecommended'))
const ComingSoon = lazy(() => import('./Components/ComingSoon/ComingSoon'))
const CareHub = lazy(() => import('./Pages/Carehub/CareHub'))
const Stories = lazy(() => import('./Pages/Stories/Stories'))
const Wishlist = lazy(() => import('./Pages/Wishlist/Wishlist'))
const Cart = lazy(() => import('./Pages/Cart/Cart'))
const Events = lazy(() => import('./Pages/Events/Events'))
const EventDetails = lazy(() => import('./Pages/EventDetails/EventDetails'))
const About = lazy(() => import('./Pages/About/About'))
const Contact = lazy(() => import('./Pages/Contact/Contact'))
const FAQ = lazy(() => import('./Pages/FAQ/FAQ'))
const Blogs = lazy(() => import('./Pages/Blogs/Blogs'))
const BlogDetails = lazy(() => import('./Pages/BlogDetails/BlogDetails'))
const Enquiries = lazy(() => import('./Pages/Enquiries/Enquiries'))
const AFMarketing = lazy(() => import('./Pages/AFMarketing/AFMarketing'))
const Profile = lazy(() => import('./Pages/Profile/Profile'))
const AuthCallback = lazy(() => import('./Pages/AuthCallback/AuthCallback'))
const Donation = lazy(() => import('./Pages/Donation/Donation'))
const ReturnRefund = lazy(() => import('./Pages/ReturnRefund/ReturnRefund'))
const NotFound = lazy(() => import('./Pages/NotFound/NotFound'))
const LiveSessions = lazy(() => import('./Pages/LiveSessions/LiveSessions'))

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
        <Suspense fallback={<PageLoader />}>
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
            <Route element={<LiveSessions/>} path='/live-sessions' />
            <Route element={<LiveSessionDetails />} path='/live-sessions/:handle' />
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
        </Suspense>
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