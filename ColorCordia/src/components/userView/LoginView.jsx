/* eslint-disable react/prop-types */
/* eslint-disable react/no-unescaped-entities */
import { useState } from "react"
import { getUser, login, setUserToken } from "../../services/users"
import { setPaletteToken } from "../../services/palettes"
import { Link, useNavigate } from "react-router-dom"

const LoginView = ({ setUser, setMessage }) => {
  const navigate = useNavigate()
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const handleFormSubmit = async event => {
    event.preventDefault()
    try {
      const user = await login({ username, password })
      setUserToken(user.token)
      setUser(await getUser(user.id))
      window.localStorage.setItem('userToken', JSON.stringify(user))
      setPaletteToken(user.token)
      navigate('/')
      setMessage("Logged in")
    } catch (error) {
      setMessage("Wrong username or password")
    }
  }

  return (
    <div>
      <form onSubmit={handleFormSubmit}>
        <input type="text" placeholder="Username" value={username} onChange={event => setUsername(event.target.value)} />
        <br />
        <input type="password" placeholder="Password" value={password} onChange={event => setPassword(event.target.value)} />
        <br />
        <button type="submit">Log in</button>
      </form>
      <div>
        <p>Forgot your password? <a href="">Reset</a></p>
        <p>Don't have an account? <Link to='/signup'>Create account</Link></p>
      </div>
    </div>

  )
}

export default LoginView