import React, { useState } from 'react'
import Notification from '../../components/Notification/Notification'
import loginService from '../../services/login'
import blogService from '../../services/blogs'
import Togglable from '../Togglable/Togglable'
import Input from '../../components/Input/Input'
import Button from '../../components/Button/Button'
import PropTypes from 'prop-types'

const Login = ({ setUser }) => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [errorMessage, setErrorMessage] = useState(null)

  const handleLogin = async (event) => {
    event.preventDefault()
    try {
      const user = await loginService.login({
        username,
        password,
      })
      window.localStorage.setItem('loggedBlogAppUser', JSON.stringify(user))
      blogService.setToken(user.token)
      setUser(user)
      setUsername('')
      setPassword('')
    } catch (exception) {
      setErrorMessage('Wrong username or password')
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    }
  }

  const loginForm = (
    <div>
      <form onSubmit={handleLogin}>
        <Input
          name="username:"
          type="text"
          value={username}
          onChange={({ target }) => setUsername(target.value)}
        />
        <Input
          name="password:"
          type="password"
          value={password}
          onChange={({ target }) => setPassword(target.value)}
        />
        <Button type="submit" text="Enter" />
      </form>
    </div>
  )

  return (
    <div>
      {errorMessage ? (
        <div>
          <Notification type="Error" message={errorMessage} />
        </div>
      ) : null}
      <Togglable buttonText2="Cancel" buttonText1="Login">
        {loginForm}
      </Togglable>
    </div>
  )
}

Login.propTypes = {
  setUser: PropTypes.func.isRequired,
}

export default Login
