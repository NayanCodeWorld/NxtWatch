import {Link} from 'react-router-dom'
import {formatDistanceToNow} from 'date-fns'

import PageContext from '../../context/PageContext'

import './index.css'

const VideoItem = props => {
  const {details} = props
  console.log(details)
  return (
    <PageContext.Consumer>
      {value => {
        const {isDarkTheme} = value
        return (
          <li className="video-item">
            <Link to={`/videos/${details.id}`} className="link">
              <img src={details.thumbnail_url} alt="video thumbnail" />
              <div className="card-description-container">
                <img
                  src={details.channel.profile_image_url}
                  alt="channel logo"
                />
                <div className="card-description">
                  <p id={isDarkTheme && 'dark-theme-home-title'}>
                    {details.title}
                  </p>
                  <ul>
                    <li>
                      <p>{details.channel.name}</p>
                    </li>
                    <li>
                      <p>{`${details.view_count} views`}</p>
                    </li>
                    <li>
                      <p>
                        {formatDistanceToNow(new Date(details.published_at))}
                      </p>
                    </li>
                  </ul>
                </div>
              </div>
            </Link>
          </li>
        )
      }}
    </PageContext.Consumer>
  )
}

export default VideoItem
