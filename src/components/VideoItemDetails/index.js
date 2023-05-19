import {Component} from 'react'

import ReactPlayer from 'react-player'
import Cookies from 'js-cookie'
import Loader from 'react-loader-spinner'

import {formatDistanceToNow} from 'date-fns'

import {BiLike, BiDislike} from 'react-icons/bi'
import {MdPlaylistAdd} from 'react-icons/md'

import PageContext from '../../context/PageContext'

import Navbar from '../Navbar'
import Sidebar from '../Sidebar'
import Failure from '../Failure'

import './index.css'

const apiStatus = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  progress: 'PROGRESS',
}

class VideoItemDetails extends Component {
  state = {
    videoDetails: {},
    status: apiStatus.initial,
  }

  componentDidMount() {
    this.fetchDetails()
  }

  fetchDetails = async () => {
    this.setState({status: apiStatus.progress})
    const {match} = this.props
    const {params} = match
    const {id} = params

    const jwtToken = Cookies.get('jwt_token')

    // console.log(id)
    const url = `https://apis.ccbp.in/videos/${id}`
    const options = {
      method: 'GET',
      headers: {
        Authorization: `berar ${jwtToken}`,
      },
    }
    const response = await fetch(url, options)
    const fetchedData = await response.json()
    console.log(fetchedData)
    if (response.ok === true) {
      this.setState({
        videoDetails: {...fetchedData.video_details},
        status: apiStatus.success,
      })
    } else {
      this.setState({status: apiStatus.failure})
    }
  }

  renderSuccessView = () => (
    <PageContext.Consumer>
      {value => {
        const {onAddVideoOnSaveList} = value
        const {videoDetails} = this.state

        const onSaveVido = () => onAddVideoOnSaveList(videoDetails)

        return (
          <div className="main-container">
            <div className="video-container">
              <ReactPlayer
                url={videoDetails.video_url}
                width="100%"
                height="100%"
              />
            </div>
            <p className="saved-title">{videoDetails.title}</p>
            <div className="like-dislike-save-container">
              <ul className="view-and-time">
                <li>
                  <p>{`${videoDetails.view_count} views`}</p>
                </li>
                <li>
                  <p>
                    {formatDistanceToNow(new Date(videoDetails.published_at))}
                  </p>
                </li>
              </ul>
              <ul className="like-dislike">
                <li>
                  <button type="button">
                    <BiLike /> <p>Like</p>
                  </button>
                </li>
                <li>
                  <button type="button">
                    <BiDislike /> <p>Dislike</p>
                  </button>
                </li>
                <li>
                  <button type="button" onClick={onSaveVido}>
                    <MdPlaylistAdd /> <p>Save</p>
                  </button>
                </li>
              </ul>
            </div>
            <hr />
            <div className="description-container">
              <img
                src={videoDetails.channel.profile_image_url}
                alt="channel logo"
              />
              <div>
                <p>{videoDetails.channel.name}</p>
                <p>{`${videoDetails.channel.subscriber_count} subscribers`}</p>
              </div>
            </div>
            <p className="description">{videoDetails.description}</p>
          </div>
        )
      }}
    </PageContext.Consumer>
  )

  renderFailureView = () => (
    <>
      <Failure />
    </>
  )

  renderProgressView = () => (
    <div className="loader">
      <div className="loader-container" data-testid="loader">
        <Loader type="ThreeDots" color="#181818" height="100" width="100" />
      </div>
    </div>
  )

  renderSpecificVideoDetail = () => {
    const {status} = this.state
    switch (status) {
      case 'SUCCESS':
        return this.renderSuccessView()
      case 'FAILURE':
        return this.renderFailureView()
      default:
        return this.renderProgressView()
    }
  }

  render() {
    return (
      <>
        <Navbar />
        <div className="home-body-container">
          <aside>
            <Sidebar />
          </aside>
          <div className="detail-container">
            {this.renderSpecificVideoDetail()}
          </div>
        </div>
      </>
    )
  }
}

export default VideoItemDetails
