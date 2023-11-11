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
      setMessage({ text: "Logged in", warning: false })
    } catch (error) {
      setMessage({ text: "Wrong username or password", warning: true })
    }
  }

  return (
    <div className="w-fit m-auto border bg-white border-black drop-shadow-md p-10 rounded-lg">
      <h2 className="text-4xl font-normal">Login</h2>
      <form onSubmit={handleFormSubmit}>
        <input className="text-input border-gray-600 w-full" type="text" placeholder="Username" value={username} onChange={event => setUsername(event.target.value)} />
        <br />
        <input className="text-input border-gray-600 w-full" type="password" placeholder="Password" value={password} onChange={event => setPassword(event.target.value)} />
        <br />
        <button className="pill-button my-4 w-full" type="submit">Log in</button>
      </form>
      <div>
        <p>Don't have an account? <Link className="link-text" to='/signup'>Create account</Link></p>
      </div>
    </div>
  )
}

export default LoginView