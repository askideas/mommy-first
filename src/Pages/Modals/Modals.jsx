import React from 'react'
import MiniCartModal from './MiniCartModal/MiniCartModal'
import MegaMenuModal from './MegaMenuModal/MegaMenuModal'
import AuthenticationModal from './AuthenticationModal/AuthenticationModal'
import SearchModal from './SearchModal/SearchModal'
import SessionBookingModal from './SessionBookingModal/SessionBookingModal'

const Modals = () => {
  return (
    <>
      <SearchModal />
      <MiniCartModal />
      <MegaMenuModal />
      <AuthenticationModal/>
      <SessionBookingModal />
    </>
    
  )
}

export default Modals