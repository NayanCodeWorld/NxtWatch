import {Link} from 'react-router-dom'

import './index.css'

import PageContext from '../../context/PageContext'

const GameItem = props => {
  const {detail} = props
  return (
    <PageContext.Consumer>
      {value => {
        const {isDarkTheme} = value
        return (
          <li className="game-item-container">
            <Link style={{textDecoration: 'none'}} to={`/videos/${detail.id}`}>
              <img src={detail.thumbnail_url} alt="video thumbnail" />
              <div>
                <p id={isDarkTheme ? 'dark-theme-game-title' : 'game-title'}>
                  {detail.title}
                </p>
                <p>{`${detail.view_count} Watching Worldwide`}</p>
              </div>
            </Link>
          </li>
        )
      }}
    </PageContext.Consumer>
  )
}

export default GameItem
