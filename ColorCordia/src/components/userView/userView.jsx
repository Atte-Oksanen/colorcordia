/* eslint-disable react/prop-types */
import { useEffect, useState } from "react"
import EditableField from "../utils/editableField"
import { deletePalette, getPalettesByCreator } from "../../services/palettes"
import CommunityPalette from "../communityView/CommunityPalette"

const UserView = ({ user }) => {
  const [username, setUsername] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('***********')
  const [palettes, setPalettes] = useState([])

  useEffect(() => {
    if (user) {
      setUsername(user.username)
      setEmail(user.email);
      (async () => {
        setPalettes(await getPalettesByCreator(user.id))
      })()
    }
  }, [user])

  if (!user) {
    return null
  }

  const countPaletteLikes = () => {
    let likes = 0
    palettes.forEach(palette => {
      likes = likes + palette.likes
    })
    return likes
  }

  const handlePaletteDelete = event => {
    if (window.confirm('Do you want to delete a palette?')) {
      deletePalette(event.target.id)
      setPalettes(palettes.filter(palette => palette.id !== event.target.id))
    }
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
          <li>Shared palettes:{palettes.length}</li>
          <li>Received likes:{countPaletteLikes()}</li>
        </ul>
      </div>
      <h3>Your palettes</h3>
      {palettes.map(palette => <CommunityPalette key={Math.random()} palette={palette}><button id={palette.id} onClick={event => handlePaletteDelete(event)}>Delete</button></CommunityPalette>)}

    </div>
  )
}

export default UserView