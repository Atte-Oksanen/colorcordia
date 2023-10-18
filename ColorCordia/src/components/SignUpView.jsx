import { useState } from "react"
import { checkUsername, signUp } from "../services/user"

const SignUpView = () => {
    const [email, setEmail] = useState('')
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')

    const handleFormSubmit = async event => {
        event.preventDefault()
        const checkUserName = await checkUsername(username)
        console.log(checkUserName);
        if (checkUserName) {
            const user = await signUp({ email, username, password })
            console.log(user);
        } else {
            console.log("already taken");
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
                <p>Already have an account? <a href="">Log in</a></p>
            </div>
        </div>

    )
}

export default SignUpView