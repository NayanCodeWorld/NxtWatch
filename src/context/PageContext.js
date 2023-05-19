import React from 'react'

const PageContext = React.createContext({
  saveVideoList: [],
  onAddVideoOnSaveList: () => {},
  onRemoveVideoOnSaveList: () => {},
  isDarkTheme: false,
  onChangeTheme: () => {},
})

export default PageContext
