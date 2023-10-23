/* eslint-disable react/prop-types */
import { useEffect, useState } from "react"
import EditableField from "./editableField"

const UserView = ({ user }) => {
  const [username, setUsername] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('***********')

  useEffect(() => {
    if (user) {
      setUsername(user.username)
      setEmail(user.email)
    }
  }, [user])

  if (!user) {
    return null
  }
  return (
    <div>
      <h2>User Info</h2>
      <form>
        <EditableField fieldLabel='Username' fieldValue={username} setNewState={setUsername}></EditableField>
        <br />
        <EditableField fieldLabel='Email' fieldValue={email} setNewState={setEmail}></EditableField>
        <br />
        <EditableField fieldLabel='Password' fieldValue={password} setNewState={setPassword}></EditableField>
      </form>
      <div>
        <ul>
          <li>Created palettes:</li>
          <li>Shared palettes:</li>
          <li>Received likes:</li>
        </ul>
      </div>
    </div>
  )
}

export default UserView