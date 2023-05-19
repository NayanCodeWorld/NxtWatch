import {Component} from 'react'
import Loader from 'react-loader-spinner'

import Cookies from 'js-cookie'

import {HiFire} from 'react-icons/hi'

import Navbar from '../Navbar'
import Sidebar from '../Sidebar'
import EventItem from '../EventItem'
import Failure from '../Failure'
import PageContext from '../../context/PageContext'

import './index.css'

const apiStatus = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  progress: 'PROGRESS',
}

class Trending extends Component {
  state = {
    eventFetchedStatus: apiStatus.initial,
    eventList: [],
  }

  componentDidMount() {
    this.fetchEvents()
  }

  fetchEvents = async () => {
    const token = Cookies.get('jwt_token')
    const url = 'https://apis.ccbp.in/videos/trending'
    const options = {
      method: 'GET',
      headers: {
        Authorization: `berar ${token}`,
      },
    }
    const response = await fetch(url, options)
    const fetchedData = await response.json()
    // console.log(fetchedData)
    if (response.ok === true) {
      this.setState({
        eventFetchedStatus: apiStatus.success,
        eventList: [...fetchedData.videos],
      })
    } else {
      this.setState({eventFetchedStatus: apiStatus.failure})
    }
  }

  onSuccessFetchedData = () => {
    const {eventList} = this.state
    return (
      <ul className="event-video-parent-container">
        {eventList.map(eachEvent => (
          <li key={eachEvent.id}>
            <EventItem detail={eachEvent} />
          </li>
        ))}
      </ul>
    )
  }

  onFailureFetchedData = () => <Failure />

  onLoading = () => (
    <div className="loader">
      <div className="loader-container" data-testid="loader">
        <Loader type="ThreeDots" color="#000000" height="100" width="100" />
      </div>
    </div>
  )

  renderEvents = () => {
    const {eventFetchedStatus} = this.state
    switch (eventFetchedStatus) {
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
                <div className="trending-container">
                  <div
                    className={
                      isDarkTheme
                        ? 'trending-header-container-dark-theme'
                        : 'trending-header-container'
                    }
                  >
                    <div>
                      <HiFire />
                    </div>
                    <h1>Trending</h1>
                  </div>
                  <div
                    className={
                      isDarkTheme
                        ? 'trending-main-container-dark-theme'
                        : 'trending-main-container'
                    }
                  >
                    {this.renderEvents()}
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

export default Trending
