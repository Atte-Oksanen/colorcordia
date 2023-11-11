/* eslint-disable react/prop-types */
import { useState } from "react"
import { checkUsername, signUp } from "../../services/users"
import { useNavigate, Link } from "react-router-dom"

const SignUpView = ({ setMessage }) => {
  const navigate = useNavigate()
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const handleFormSubmit = async event => {
    event.preventDefault()
    const checkUserName = await checkUsername(username)
    if (checkUserName) {
      try {
        await signUp({ username, password })
        setMessage({ text: "Account succesfully created", warning: false })
        navigate('/login')
      } catch (error) {
        setMessage({ text: 'This username does not comply with our platform policies', warning: true })
      }
    } else {
      setMessage({ text: "username already taken", warning: true })
    }
  }

  return (
    <div className="w-fit m-auto border bg-white border-black drop-shadow-md p-10 rounded-lg">
      <h2 className="text-4xl font-normal">Sign up</h2>
      <form onSubmit={handleFormSubmit}>
        <input className="text-input border-gray-600 w-full" type="text" placeholder="Username" value={username} onChange={event => setUsername(event.target.value)} />
        <br />
        <p className="text-gray-600 text-sm">
          The username can only consist of alphanumerical character (a-z, 0-9).
          <br />
          Hyphens (-) and underscores (_) are also permitted.
          <br />
          Profanities or names in bad taste are not permitted.</p>
        <input className="text-input border-gray-600 w-full" type="password" placeholder="Password" value={password} onChange={event => setPassword(event.target.value)} />
        <br />
        <button className="pill-button my-4 w-full" type="submit">Sign up</button>
      </form>
      <div>
        <p>Already have an account? <Link className="link-text" to='/login'>Log in</Link></p>
      </div>
    </div>

  )
}

export default SignUpView