import styled from 'styled-components'

export const Nav = styled.nav`
  display: flex;
  flex-direction: column;
  min-height: 10vh;
  background-color: ${props => props.color};
`

export const WebsiteLogo = styled.img`
  width: 100px;
  @media (min-width: 756px) {
    width: 130px;
  }
`

export const SmLinkContainer = styled.ul`
  display: flex;
  align-items: center;
  @media (min-width: 756px) {
    display: none;
  }
`

export const SmLink = styled.li`
  list-style-type: none;
  margin-left: 20px;
  font-size: 20px;
  cursor: pointer;
`

export const LgLinkContainer = styled.ul`
  display: none;
  @media (min-width: 756px) {
    display: block;
    display: flex;
    align-items: center;
  }
`

export const LgLink = styled.li`
  list-style-type: none;
  margin-left: 30px;
  display: flex;
  align-items: center;
  cursor: pointer;
`
export const ThemeButton = styled.button`
  font-size: 22px;
  background-color: transparent;
  border: none;
  outline: none;
  cursor: pointer;
  color: ${props => props.color};
`
export const ProfileImg = styled.img`
  width: 30px;
`

export const HomeBurgerItem = styled.section`
  width: 100%;
  text-decoration: none;
  background-color: #ffffff;
  @media (min-width: 768px) {
    display: none;
  }
`

export const NavMainContainer = styled.section`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding-left: 20px;
  padding-right: 20px;
  @media (min-width: 756px) {
    padding-left: 30px;
    padding-right: 30px;
  }
`
export const BurgerBtn = styled.button`
  background-color: transparent;
  outline: none;
  margin: 0;
  border: none;
  font-size: 20px;
  color: ${props => props.color};
  cursor: pointer;
`

export const HomeBurgerLink = styled.li`
  list-style-type: none;
  cursor: pointer;
`

export const LinkText = styled.p`
  font-size: 16px;
  margin-bottom: 10px;
  font-family: Roboto;
  color: #64748b;
  font-weight: 500;
  text-decoration: none;
  outline: none;
`
