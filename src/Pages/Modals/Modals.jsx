import React from 'react'
import MiniCartModal from './MiniCartModal/MiniCartModal'
import MegaMenuModal from './MegaMenuModal/MegaMenuModal'
import AuthenticationModal from './AuthenticationModal/AuthenticationModal'

const Modals = () => {
  return (
    <>
        <MiniCartModal />
        <MegaMenuModal />
        <AuthenticationModal/>
    </>
    
  )
}

export default Modals