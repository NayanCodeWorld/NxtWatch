import {Component} from 'react'
import {Link, Redirect} from 'react-router-dom'

import {AiFillHome} from 'react-icons/ai'
import {HiFire} from 'react-icons/hi'
import {SiYoutubegaming} from 'react-icons/si'
import {MdPlaylistAdd} from 'react-icons/md'

import PageContext from '../../context/PageContext'
import './index.css'

const pageLinks = [
  {
    id: 'HOME',
    text: 'Home',
    logo: AiFillHome,
    path: '/',
  },
  {
    id: 'TRENDING',
    text: 'Trending',
    logo: HiFire,
    path: '/trending',
  },
  {
    id: 'GAMING',
    text: 'Gaming',
    logo: SiYoutubegaming,
    path: '/gaming',
  },
  {
    id: 'SAVED-VIDEO',
    text: 'Saved videos',
    logo: MdPlaylistAdd,
    path: '/saved-videos',
  },
]

class Sidebar extends Component {
  render() {
    const {activePath} = this.props
    console.log(this.props)
    return (
      <PageContext.Consumer>
        {value => {
          const {isDarkTheme} = value
          return (
            <div
              className={
                isDarkTheme ? 'lg-home-sidebar-dark-theme' : 'lg-home-sidebar'
              }
            >
              <ul className="lg-home-sidebar-page-link">
                {pageLinks.map(each => {
                  const onChangePage = () => <Redirect to={each.path} />

                  let activeCss = null
                  if (!isDarkTheme) {
                    activeCss =
                      each.path === activePath
                        ? 'active-page'
                        : 'lg-home-sidebar-link'
                  } else {
                    activeCss =
                      each.path === activePath
                        ? 'dark-active-page'
                        : 'lg-home-sidebar-link'
                  }

                  return (
                    <Link className="route-link" to={each.path}>
                      <li
                        key={each.id}
                        onClick={onChangePage}
                        className={activeCss}
                      >
                        <each.logo />
                        <p>{each.text}</p>
                      </li>
                    </Link>
                  )
                })}
              </ul>
              <div className="contactUs-container">
                <p className="contact-us-heading">CONTACT US</p>
                <ul className="contact-us-card">
                  <li>
                    <img
                      src="https://assets.ccbp.in/frontend/react-js/nxt-watch-facebook-logo-img.png"
                      alt="facebook logo"
                    />
                  </li>
                  <li>
                    <img
                      src="https://assets.ccbp.in/frontend/react-js/nxt-watch-twitter-logo-img.png"
                      alt="twitter logo"
                    />
                  </li>
                  <li>
                    <a
                      href="http://www.linkedin.com/in/nayan-dwivedi"
                      target="_blank"
                      rel="noreferrer"
                    >
                      <img
                        src="https://assets.ccbp.in/frontend/react-js/nxt-watch-linked-in-logo-img.png"
                        alt="linked in logo"
                      />
                    </a>
                  </li>
                </ul>
                <p className="contact-us-description">
                  Enjoy! Now to see your channels and recommendations!
                </p>
              </div>
            </div>
          )
        }}
      </PageContext.Consumer>
    )
  }
}

export default Sidebar
