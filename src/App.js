import {Component} from 'react'
import {Switch, Route, Redirect} from 'react-router-dom'

import PageContext from './context/PageContext'

import ProtectRoute from './components/ProtectRoute'
import Login from './components/Login'
import Home from './components/Home'
import Gaming from './components/Gaming'
import Trending from './components/Trending'
import SavedVideos from './components/SavedVideos'
import VideoItemDetails from './components/VideoItemDetails'
import NotFound from './components/NotFound'

import './App.css'

class App extends Component {
  state = {
    saveVideoList: [],
    isDarkTheme: false,
  }

  onAddVideoOnSaveList = video => {
    const {saveVideoList} = this.state
    const newVideo = [...saveVideoList, video]
    this.setState({
      saveVideoList: newVideo,
    })
  }

  onRemoveVideoOnSaveList = deleteVideoId => {
    const {saveVideoList} = this.state
    const filteredList = saveVideoList.filter(each => {
      if (each.id !== deleteVideoId) {
        return each
      }
      return ''
    })
    this.setState({saveVideoList: filteredList})
  }

  onChangeTheme = () =>
    this.setState(prvState => ({isDarkTheme: !prvState.isDarkTheme}))

  render() {
    const {saveVideoList, isDarkTheme} = this.state
    return (
      <PageContext.Provider
        value={{
          saveVideoList,
          isDarkTheme,
          onAddVideoOnSaveList: this.onAddVideoOnSaveList,
          onRemoveVideoOnSaveList: this.onRemoveVideoOnSaveList,
          onChangeTheme: this.onChangeTheme,
        }}
      >
        <Switch>
          <Route exact path="/login" component={Login} />
          <ProtectRoute exact path="/" component={Home} />
          <ProtectRoute exact path="/trending" component={Trending} />
          <ProtectRoute exact path="/gaming" component={Gaming} />
          <ProtectRoute exact path="/saved-videos" component={SavedVideos} />
          <ProtectRoute exact path="/videos/:id" component={VideoItemDetails} />
          <Route path="/notfound" component={NotFound} />
          <Redirect to="notfound" />
        </Switch>
      </PageContext.Provider>
    )
  }
}
export default App
