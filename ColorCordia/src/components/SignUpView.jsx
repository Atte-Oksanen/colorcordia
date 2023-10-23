/* eslint-disable react/prop-types */
import { useState } from "react"
import { checkUsername, signUp } from "../services/user"
import { useNavigate, Link } from "react-router-dom"

const SignUpView = ({ setMessage }) => {
  const navigate = useNavigate()
  const [email, setEmail] = useState('')
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const handleFormSubmit = async event => {
    event.preventDefault()
    const checkUserName = await checkUsername(username)
    if (checkUserName) {
      await signUp({ email, username, password })
      setMessage("Account succesfully created")
      navigate('/login')
    } else {
      setMessage("username already taken")
    }
  }

  return (
    <div>
      <form onSubmit={handleFormSubmit}>
        <input type="email" placeholder="Email" value={email} onChange={event => setEmail(event.target.value)} />
        <br />
        <input type="text" placeholder="Username" value={username} onChange={event => setUsername(event.target.value)} />
        <br />
        <input type="password" placeholder="Password" value={password} onChange={event => setPassword(event.target.value)} />
        <br />
        <button type="submit">Sign up</button>
      </form>
      <div>
        <p>Already have an account? <Link to='/login'>Log in</Link></p>
      </div>
    </div>

  )
}

export default SignUpView