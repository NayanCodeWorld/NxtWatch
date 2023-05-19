import {Link} from 'react-router-dom'

import {formatDistanceToNow} from 'date-fns'

import PageContext from '../../context/PageContext'

import './index.css'

const EventItem = props => {
  const {detail} = props
  return (
    <PageContext.Consumer>
      {value => {
        const {isDarkTheme} = value
        return (
          <Link className="link" to={`/videos/${detail.id}`}>
            <div className="event-container">
              <img src={detail.thumbnail_url} alt="video thumbnail" />
              <div>
                <img src={detail.channel.profile_image_url} alt="profile" />
                <div>
                  <p id={isDarkTheme ? 'dark-theme-title' : 'theme-title'}>
                    {detail.title}
                  </p>
                  <ul>
                    <li>
                      <p>{detail.channel.name}</p>
                    </li>
                    <li>
                      <p>{detail.view_count}</p>
                    </li>
                    <li>
                      <p>
                        {formatDistanceToNow(new Date(detail.published_at))}
                      </p>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </Link>
        )
      }}
    </PageContext.Consumer>
  )
}

export default EventItem
