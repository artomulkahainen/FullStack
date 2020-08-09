import React, { useState, useEffect } from 'react'
import Blogs from './containers/Blogs/Blogs'
import Login from './containers/Login/Login'
import blogService from './services/blogs'
import Button from './components/Button/Button'

const App = () => {
  const [user, setUser] = useState(null)

  // CHECK IF USER HAS ALREADY LOGGED IN
  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogAppUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  const logout = () => {
    setUser(null)
    window.localStorage.removeItem('loggedBlogAppUser')
  }

  return (
    <div>
      <h1 style={{ color: 'green' }}>Blogs</h1>
      {user === null ? (
        <Login setUser={setUser} />
      ) : (
        <p>
          {user.name} logged in{' '}
          <Button text="Logout" clicked={() => logout()} />
        </p>
      )}
      <Blogs user={user} />
    </div>
  )
}

export default App
