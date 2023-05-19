import {withRouter} from 'react-router-dom'
import Cookies from 'js-cookie'

import {FiLogOut} from 'react-icons/fi'

import Popup from 'reactjs-popup'

import './index.css'

const PopupContainer = props => {
  const {history, detail} = props
  const onLogout = () => {
    Cookies.remove('jwt_token')
    history.replace('/login')
  }

  const btn =
    detail === 'lg' ? (
      <button type="button" className="trigger-button">
        Logout
      </button>
    ) : (
      <FiLogOut />
    )

  return (
    <>
      <Popup modal trigger={btn}>
        {close => (
          <div className="popup">
            <div>
              <p>Are you sure, you want to logout</p>
            </div>
            <div className="btn-container">
              <button
                type="button"
                className="cancel-button"
                onClick={() => close()}
              >
                Cancel
              </button>
              <button
                type="button"
                className="confirm-button"
                onClick={onLogout}
              >
                Confirm
              </button>
            </div>
          </div>
        )}
      </Popup>
    </>
  )
}

export default withRouter(PopupContainer)
