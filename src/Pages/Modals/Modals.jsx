import React from 'react'
import MiniCartModal from './MiniCartModal/MiniCartModal'
import MegaMenuModal from './MegaMenuModal/MegaMenuModal'
import AuthenticationModal from './AuthenticationModal/AuthenticationModal'
import SearchModal from './SearchModal/SearchModal'

const Modals = () => {
  return (
    <>
      <SearchModal />
      <MiniCartModal />
      <MegaMenuModal />
      <AuthenticationModal/>
    </>
    
  )
}

export default Modals