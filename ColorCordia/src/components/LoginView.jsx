import { useState } from "react"
import { login } from "../services/user"

const LoginView = () => {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')

    const handleFormSubmit = async event => {
        event.preventDefault()
        const user = await login({ username, password })
        console.log(user);
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