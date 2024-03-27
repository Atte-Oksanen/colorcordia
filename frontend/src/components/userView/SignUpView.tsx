import { FormEvent, useState } from "react"
import { signUp } from "../../services/users"
import { useNavigate, Link } from "react-router-dom"
import { Message } from "../../types/componentTypes"
import { AxiosError } from "axios"


const SignUpView = ({ setMessage }: { setMessage: React.Dispatch<React.SetStateAction<Message | null>> }) => {
  const navigate = useNavigate()
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const handleFormSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    try {
      await signUp({ username, password })
      setMessage({ text: "Account succesfully created", warning: false })
      navigate('/login')
    } catch (error) {
      if (error instanceof AxiosError) {
        if (error.response && error.response.data) {
          setMessage({ text: error.response.data.message, warning: true })
        }
      } else {
        setMessage({ text: 'Unknown error occurred', warning: true })
      }
    }
  }

  return (
    <div className="flex h-full mx-4">
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
    </div>
  )
}

export default SignUpView