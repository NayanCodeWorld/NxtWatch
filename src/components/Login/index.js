import {Component} from 'react'
import {Redirect} from 'react-router-dom'
import Cookies from 'js-cookie'

import './index.css'

class Login extends Component {
  state = {
    username: '',
    password: '',
    isError: false,
    errorMessage: '',
    showPassword: false,
  }

  onHandleUsername = event => this.setState({username: event.target.value})

  onHandlePassword = event => this.setState({password: event.target.value})

  onHandleShowPassword = () =>
    this.setState(prvState => ({showPassword: !prvState.showPassword}))

  onHandleSubmitAction = async event => {
    event.preventDefault()
    const {history} = this.props
    const {username, password} = this.state
    const user = {
      username,
      password,
    }
    const loginUrl = 'https://apis.ccbp.in/login'
    const options = {
      method: 'POST',
      body: JSON.stringify(user),
    }
    const response = await fetch(loginUrl, options)
    const data = await response.json()
    console.log(response)
    console.log(data)
    if (response.ok === true) {
      Cookies.set('jwt_token', data.jwt_token, {expires: 1})
      history.replace('/')
    } else {
      this.setState({
        isError: true,
        errorMessage: data.error_msg,
      })
    }
  }

  render() {
    const {username, password, showPassword, isError, errorMessage} = this.state

    const jwtToken = Cookies.get('jwt_token')
    if (jwtToken !== undefined) {
      return <Redirect to="/" />
    }

    return (
      <div className="login-bg-container">
        <div className="login-card">
          <img
            className="login-website-logo"
            src="https://assets.ccbp.in/frontend/react-js/nxt-watch-logo-light-theme-img.png"
            alt="website logo"
          />
          <form className="login-form" onSubmit={this.onHandleSubmitAction}>
            <div className="login-input-container">
              <label className="login-input-label" htmlFor="usernameId">
                USERNAME
              </label>
              <input
                onChange={this.onHandleUsername}
                className="userInputArea"
                type="text"
                id="usernameId"
                placeholder="rahul"
                value={username}
              />
            </div>
            <div className="login-input-container">
              <label className="login-input-label" htmlFor="userPasswordId">
                PASSWORD
              </label>
              <input
                onChange={this.onHandlePassword}
                className="userInputArea"
                type={showPassword ? 'text' : 'password'}
                id="userPasswordId"
                placeholder="rahul@2021"
                value={password}
              />
            </div>
            <div className="showPassword-input-container">
              <input
                onChange={this.onHandleShowPassword}
                type="checkbox"
                id="showPasswordId"
                value={showPassword}
              />
              <label className="login-input-label" htmlFor="showPasswordId">
                Show Password
              </label>
            </div>
            <button className="login-btn" type="submit">
              Login
            </button>
            {isError && <p className="error-message">{`*${errorMessage}`}</p>}
          </form>
        </div>
      </div>
    )
  }
}

export default Login
