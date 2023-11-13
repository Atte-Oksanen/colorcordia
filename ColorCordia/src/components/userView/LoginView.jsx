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
  const [stayLogged, setStayLogged] = useState(false)

  const handleFormSubmit = async event => {
    event.preventDefault()
    try {
      const user = await login({ username, password })
      setUserToken(user.token)
      setUser(await getUser(user.id))

      if (stayLogged) {
        window.localStorage.setItem('userToken', JSON.stringify(user))
      } else {
        window.sessionStorage.setItem('userToken', JSON.stringify(user))
      }
      setPaletteToken(user.token)
      navigate('/')
      setMessage({ text: "Logged in", warning: false })
    } catch (error) {
      setMessage({ text: "Wrong username or password", warning: true })
    }
  }

  return (
    <div className="flex h-full mx-4">
      <div className="w-fit m-auto border bg-white border-black drop-shadow-md p-10 rounded-lg">
        <h2 className="text-4xl font-normal">Login</h2>
        <form className="my-4" onSubmit={handleFormSubmit}>
          <input className="text-input border-gray-600 w-full" type="text" placeholder="Username" value={username} onChange={event => setUsername(event.target.value)} />
          <br />
          <input className="text-input border-gray-600 w-full my-4" type="password" placeholder="Password" value={password} onChange={event => setPassword(event.target.value)} />
          <br />
          <input className="w-4 h-4 align-middle" id="stayLoggedCheckBox" type="checkbox" checked={stayLogged} onChange={() => setStayLogged(!stayLogged)} />
          <label className="mx-2" htmlFor="stayLoggedCheckBox">Stay logged in</label>
          <button className="pill-button my-4 w-full" type="submit">Log in</button>
        </form>
        <div>
          <p>Don't have an account? <Link className="link-text" to='/signup'>Create account</Link></p>
        </div>
      </div>
    </div>
  )
}

export default LoginView