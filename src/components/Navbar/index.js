import {Link, withRouter} from 'react-router-dom'
import {useState} from 'react'

import {FaMoon} from 'react-icons/fa'
import {GiHamburgerMenu} from 'react-icons/gi'
import {FiSun} from 'react-icons/fi'

import PopupContainer from '../PopupContainer'
import PageContext from '../../context/PageContext'

import {
  WebsiteLogo,
  Nav,
  SmLinkContainer,
  SmLink,
  LgLinkContainer,
  LgLink,
  ProfileImg,
  ThemeButton,
  HomeBurgerItem,
  NavMainContainer,
  BurgerBtn,
  HomeBurgerLink,
  LinkText,
} from './styledComponents'

const Navbar = () => {
  const [showNavbar, setShowNavbar] = useState(false)

  return (
    <PageContext.Consumer>
      {value => {
        const {onChangeTheme, isDarkTheme} = value

        return (
          <Nav color={isDarkTheme ? '#424242' : '#ffffff'}>
            <NavMainContainer>
              <Link to="/">
                <WebsiteLogo
                  className="website-logo"
                  src={
                    isDarkTheme
                      ? 'https://assets.ccbp.in/frontend/react-js/nxt-watch-logo-dark-theme-img.png'
                      : 'https://assets.ccbp.in/frontend/react-js/nxt-watch-logo-light-theme-img.png'
                  }
                  alt="website logo"
                />
              </Link>
              <SmLinkContainer>
                <SmLink>
                  <ThemeButton
                    type="button"
                    onClick={onChangeTheme}
                    color={isDarkTheme ? '#ffffff' : '#00306e'}
                  >
                    {isDarkTheme ? <FiSun /> : <FaMoon />}
                  </ThemeButton>
                </SmLink>
                <SmLink>
                  <BurgerBtn
                    type="button"
                    onClick={() => setShowNavbar(!showNavbar)}
                    color={isDarkTheme ? '#ffffff' : '#00306e'}
                  >
                    <GiHamburgerMenu />
                  </BurgerBtn>
                </SmLink>
                <SmLink>
                  <PopupContainer
                    color={isDarkTheme ? '#ffffff' : '#00306e'}
                    detail="sm"
                  />
                </SmLink>
              </SmLinkContainer>

              <LgLinkContainer>
                <LgLink>
                  <ThemeButton
                    data-testid="theme"
                    type="button"
                    onClick={onChangeTheme}
                    color={isDarkTheme ? '#ffffff' : '#00306e'}
                  >
                    {isDarkTheme ? <FiSun /> : <FaMoon />}
                  </ThemeButton>
                </LgLink>
                <LgLink>
                  <ProfileImg
                    src="https://assets.ccbp.in/frontend/react-js/nxt-watch-profile-img.png"
                    alt="profile"
                    className="profile-img"
                  />
                </LgLink>
                <LgLink>
                  <PopupContainer detail="lg" />
                </LgLink>
              </LgLinkContainer>
            </NavMainContainer>
            {showNavbar && (
              <HomeBurgerItem>
                <ul>
                  <Link
                    style={{textDecoration: 'none', pinter: 'cursor'}}
                    to="/"
                  >
                    <HomeBurgerLink>
                      <LinkText>Home</LinkText>
                    </HomeBurgerLink>
                  </Link>
                  <Link
                    style={{textDecoration: 'none', pinter: 'cursor'}}
                    to="/trending"
                  >
                    <HomeBurgerLink>
                      <LinkText>Trending</LinkText>
                    </HomeBurgerLink>
                  </Link>
                  <Link
                    style={{textDecoration: 'none', pinter: 'cursor'}}
                    to="/gaming"
                  >
                    <HomeBurgerLink>
                      <LinkText>Gaming</LinkText>
                    </HomeBurgerLink>
                  </Link>
                  <Link
                    style={{textDecoration: 'none', pinter: 'cursor'}}
                    to="/saved-videos"
                  >
                    <HomeBurgerLink>
                      <LinkText>Saved videos</LinkText>
                    </HomeBurgerLink>
                  </Link>
                </ul>
              </HomeBurgerItem>
            )}
          </Nav>
        )
      }}
    </PageContext.Consumer>
  )
}

export default withRouter(Navbar)
