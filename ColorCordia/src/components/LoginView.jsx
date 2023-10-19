/* eslint-disable react/prop-types */
/* eslint-disable react/no-unescaped-entities */
import { useState } from "react"
import { login } from "../services/user"
import { setPaletteToken } from "../services/palettes"

const LoginView = ({ setUser }) => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const handleFormSubmit = async event => {
    event.preventDefault()
    const user = await login({ username, password })
    console.log(user);
    setUser(user)
    window.localStorage.setItem('userToken', JSON.stringify(user))
    setPaletteToken(user.token)
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
        <p>Don't have an account? <a href="">Create account</a></p>
      </div>
    </div>

  )
}

export default LoginView