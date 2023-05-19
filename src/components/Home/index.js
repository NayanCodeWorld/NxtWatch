import {Component} from 'react'
import Cookies from 'js-cookie'
import {AiOutlineSearch} from 'react-icons/ai'

import Loader from 'react-loader-spinner'

import Navbar from '../Navbar'
import Sidebar from '../Sidebar'
import VideoItem from '../VideoItem'
import Failure from '../Failure'

import PageContext from '../../context/PageContext'

import './index.css'

const apiStatus = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  progress: 'PROGRESS',
}

class Home extends Component {
  state = {
    videoFetchStatus: apiStatus.success,
    videosList: [],
    isPrimumPosterShow: true,
    search: '',
  }

  componentDidMount() {
    this.fetchData()
  }

  // Fetching data from server
  fetchData = async () => {
    this.setState({videoFetchStatus: apiStatus.progress})
    const {search} = this.state
    const token = Cookies.get('jwt_token')

    const url = `https://apis.ccbp.in/videos/all?search=${search}`
    const options = {
      method: 'GET',
      headers: {
        Authorization: `berar ${token}`,
      },
    }
    const response = await fetch(url, options)
    const fetchedData = await response.json()
    if (response.ok === true) {
      this.setState({
        videoFetchStatus: apiStatus.success,
        videosList: [...fetchedData.videos],
      })
    } else {
      this.setState({
        videoFetchStatus: apiStatus.failure,
      })
    }
  }

  onHandlePoster = () => this.setState({isPrimumPosterShow: false})

  renderPremiumPoster = () => (
    <div data-testid="banner" className="premium-poster-container">
      <div className="premium-poster-header">
        <img
          src="https://assets.ccbp.in/frontend/react-js/nxt-watch-logo-light-theme-img.png"
          alt="nxt watch logo"
          className="premium-poster-logo"
        />
        <button
          className="premium-poster-remove-btn"
          type="button"
          onClick={this.onHandlePoster}
          data-testid="close"
        >
          x
        </button>
      </div>
      <p className="premium-poster-description">
        Buy Nxt Watch Premium prepaid plans with UPI
      </p>
      <button className="get-it-now-btn" type="button">
        GET IT NOW
      </button>
    </div>
  )

  onHandleRetry = () => this.setState({search: ''}, this.fetchData)

  onRenderNoVideos = () => (
    <div className="no-video-container">
      <img
        src="https://assets.ccbp.in/frontend/react-js/nxt-watch-no-search-results-img.png"
        alt="no videos"
      />
      <h1>No Search results found</h1>
      <p>Try different key words or remove search filter</p>

      <button type="button" onClick={this.onHandleRetry}>
        Retry
      </button>
    </div>
  )

  onVideoFetchingSuccess = () => {
    const {videosList} = this.state
    return (
      <>
        {videosList.length === 0 ? (
          this.onRenderNoVideos()
        ) : (
          <ul className="video-list">
            {videosList.map(eachVideo => (
              <VideoItem key={eachVideo.id} details={eachVideo} />
            ))}
          </ul>
        )}
      </>
    )
  }

  onVideoFetchingProgress = () => (
    <div className="loader-container" data-testid="loader">
      <Loader type="ThreeDots" color="#000000" height="100" width="100" />
    </div>
  )

  renderVideos = () => {
    const {videoFetchStatus} = this.state
    switch (videoFetchStatus) {
      case 'SUCCESS':
        return this.onVideoFetchingSuccess()
      case 'FAILURE':
        return <Failure />
      default:
        return this.onVideoFetchingProgress()
    }
  }

  onHandleSearchChange = event => this.setState({search: event.target.value})

  onHandleSearch = () => this.fetchData()

  render() {
    const {isPrimumPosterShow, search} = this.state
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
                <div
                  className={
                    isDarkTheme
                      ? 'home-main-container-dark-theme'
                      : 'home-main-container'
                  }
                  data-testid="home"
                >
                  {isPrimumPosterShow && this.renderPremiumPoster()}
                  <div className="videos-list-container">
                    <div className="home-video-search-input-container">
                      <input
                        type="search"
                        value={search}
                        onChange={this.onHandleSearchChange}
                        placeholder="Search"
                      />
                      <button
                        onClick={this.onHandleSearch}
                        type="button"
                        data-testid="searchButton"
                      >
                        <AiOutlineSearch />
                      </button>
                    </div>
                    {this.renderVideos()}
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

export default Home
