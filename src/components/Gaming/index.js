import {Component} from 'react'
import Loader from 'react-loader-spinner'

import Cookies from 'js-cookie'

import {SiYoutubegaming} from 'react-icons/si'

import PageContext from '../../context/PageContext'

import Navbar from '../Navbar'
import Sidebar from '../Sidebar'
import GameItem from '../GameItem'
import Failure from '../Failure'

import './index.css'

const apiStatus = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  progress: 'PROGRESS',
}

class Gaming extends Component {
  state = {
    gameFetchedStatus: apiStatus.initial,
    gamesList: [],
  }

  componentDidMount() {
    this.fetchGames()
  }

  fetchGames = async () => {
    const token = Cookies.get('jwt_token')
    const url = 'https://apis.ccbp.in/videos/gaming'
    const options = {
      method: 'GET',
      headers: {
        Authorization: `berar ${token}`,
      },
    }
    const response = await fetch(url, options)
    const fetchedData = await response.json()
    // console.log(fetchedData.videos)
    if (response.ok === true) {
      this.setState({
        gameFetchedStatus: apiStatus.success,
        gamesList: [...fetchedData.videos],
      })
    } else {
      this.setState({gameFetchedStatus: apiStatus.failure})
    }
  }

  onSuccessFetchedData = () => {
    const {gamesList} = this.state
    return (
      <ul className="game-list-container">
        {gamesList.map(each => (
          <GameItem key={each.id} detail={each} />
        ))}
      </ul>
    )
  }

  onFailureFetchedData = () => <Failure />

  onLoading = () => (
    <div className="game-loader">
      <div className="loader-container" data-testid="loader">
        <Loader type="ThreeDots" color="#000000" height="100" width="100" />
      </div>
    </div>
  )

  renderGames = () => {
    const {gameFetchedStatus} = this.state
    switch (gameFetchedStatus) {
      case 'SUCCESS':
        return this.onSuccessFetchedData()
      case 'FAILURE':
        return this.onFailureFetchedData()
      default:
        return this.onLoading()
    }
  }

  render() {
    const {match} = this.props
    const {path} = match
    return (
      <PageContext.Consumer>
        {value => {
          const {isDarkTheme} = value
          return (
            <>
              <Navbar />
              <div className="home-body-container">
                <aside>
                  <Sidebar activePath={path} />
                </aside>
                <div className="Gaming-video-container">
                  <div
                    className={
                      isDarkTheme
                        ? 'gaming-header-container-dark-theme'
                        : 'gaming-header-container'
                    }
                  >
                    <div>
                      <SiYoutubegaming />
                    </div>
                    <h1>Gaming</h1>
                  </div>
                  <div
                    className={
                      isDarkTheme
                        ? 'gaming-main-container-dark-theme'
                        : 'gaming-main-container'
                    }
                  >
                    {this.renderGames()}
                  </div>
                </div>
              </div>
            </>
          )
        }}
      </PageContext.Consumer>
    )
  }
}

export default Gaming
