import React from 'react'
import MiniCartModal from './MiniCartModal/MiniCartModal'
import MegaMenuModal from './MegaMenuModal/MegaMenuModal'
import ShopifyAuthenticationModal from './ShopifyAuthenticationModal/ShopifyAuthenticationModal'
import SearchModal from './SearchModal/SearchModal'

const Modals = () => {
  return (
    <>
      <SearchModal />
      <MiniCartModal />
      <MegaMenuModal />
      <ShopifyAuthenticationModal />
    </>

  )
}

export default Modals