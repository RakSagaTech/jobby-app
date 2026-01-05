import {Link, withRouter} from 'react-router-dom'
import {AiFillHome} from 'react-icons/ai'
import {BsBriefcaseFill} from 'react-icons/bs'
import {FiLogOut} from 'react-icons/fi'
import Cookies from 'js-cookie'

import './index.css'

const Header = props => {
  const onClickLogout = () => {
    Cookies.remove('jwt_token')
    const {history} = props
    history.replace('/login')
  }

  return (
    <nav className="nav-container">
      <div className="header-sm-container">
        <img
          src="https://assets.ccbp.in/frontend/react-js/logo-img.png"
          alt="website logo"
          className="header-website-logo"
        />
        <ul className="header-icons-container">
          <li className="header-icon">
            <Link to="/" className="nav-link-item">
              <AiFillHome />
            </Link>
          </li>

          <li className="header-icon">
            <Link to="/jobs" className="nav-link-item">
              <BsBriefcaseFill />
            </Link>
          </li>
          <li className="header-icon">
            <button
              type="button"
              className="logout-sm-btn"
              onClick={onClickLogout}
            >
              <FiLogOut />
            </button>
          </li>
        </ul>
      </div>
      <div className="header-lg-container">
        <img
          src="https://assets.ccbp.in/frontend/react-js/logo-img.png"
          alt="website logo"
          className="header-website-logo"
        />
        <ul className="header-list-container">
          <li className="list-item">
            <Link to="/" className="nav-link-item">
              Home
            </Link>
          </li>
          <li className="list-item">
            <Link to="/jobs" className="nav-link-item">
              Jobs
            </Link>
          </li>
        </ul>
        <button type="button" className="logout-btn" onClick={onClickLogout}>
          Logout
        </button>
      </div>
    </nav>
  )
}

export default withRouter(Header)
