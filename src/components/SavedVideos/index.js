import {MdPlaylistAdd} from 'react-icons/md'

import Navbar from '../Navbar'
import Sidebar from '../Sidebar'
import EventItem from '../EventItem'

import './index.css'

import PageContext from '../../context/PageContext'

const SavedVideos = props => {
  const {match} = props
  const {path} = match
  return (
    <PageContext.Consumer>
      {value => {
        const {saveVideoList, isDarkTheme} = value
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
                    <MdPlaylistAdd />
                  </div>
                  <h1>Saved videos</h1>
                </div>
                <div
                  className={
                    isDarkTheme
                      ? 'trending-main-container-dark-theme'
                      : 'trending-main-container'
                  }
                >
                  {saveVideoList.length !== 0 ? (
                    <ul className="event-video-parent-container">
                      {saveVideoList.map(each => (
                        <EventItem detail={each} />
                      ))}
                    </ul>
                  ) : (
                    <div className="no-save-video-container">
                      <img
                        src="https://assets.ccbp.in/frontend/react-js/nxt-watch-no-saved-videos-img.png"
                        alt="no saved videos"
                      />
                      <h1 id={isDarkTheme && 'dark-theme-heading'}>
                        No saved videos found
                      </h1>
                      <p>You can save your videos while watching them</p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </>
        )
      }}
    </PageContext.Consumer>
  )
}

export default SavedVideos
