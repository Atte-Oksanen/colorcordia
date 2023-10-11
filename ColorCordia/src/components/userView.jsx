import { useState } from "react"
import EditableField from "./editableField"

const UserView = () => {
  const [username, setUsername] = useState('template user')
  const [email, setEmail] = useState('template email')
  const [password, setPassword] = useState('***********')

  return (
    <div>
      <h2>User Info</h2>
      <form action="">
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