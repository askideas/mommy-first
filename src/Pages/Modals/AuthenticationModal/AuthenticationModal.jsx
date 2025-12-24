import React from 'react'
import './AuthenticationModal.css'
import { X } from 'lucide-react'
import Google from '../../../assets/Google.svg'
import Facebook from '../../../assets/Facebook.svg'
import Apple from '../../../assets/Apple.svg'

const AuthenticationModal = () => {
  return (
    <div class="offcanvas offcanvas-end" tabindex="-1" id="AuthenticationModal" aria-labelledby="offcanvasRightLabel">
        <div className="mf-off-canvas-header">
            <p className="head-ing">Login</p>
            <button className="close-btn" data-bs-dismiss="offcanvas" aria-label="Close"><X /></button>
        </div>
        <div className="login-modal-body-con">

        </div>
        <div className="login-modal-footer">
          <div className="login-alternate-button-section">
            <button><img src={Google} alt="" /> Sign in with Google</button>
            <button><img src={Facebook} alt="" /> Sign in with Facebook</button>
            <button><img src={Apple} alt="" /> Sign in with Apple</button>
          </div>
        </div>
    </div>
  )
}

export default AuthenticationModal