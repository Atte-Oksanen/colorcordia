/* eslint-disable react/prop-types */
import { useEffect, useState } from "react"
import EditableField from "../utils/editableField"
import { deletePalette, getPalettesByCreator } from "../../services/palettes"
import CommunityPalette from "../communityView/CommunityPalette"

const UserView = ({ user, setUser, setMessage }) => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [palettes, setPalettes] = useState([])

  useEffect(() => {
    if (user) {
      setUsername(user.username);
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
    <div className="m-5">
      <h2 className="text-4xl font-normal">User Info</h2>
      <div className="w-full p-5 bg-gray-200">
        <form>
          Username <input className="text-input" type="text" disabled value={username} />
          <br />
          <EditableField fieldLabel='Password' fieldValue={password} setNewState={setPassword} user={user} setUser={setUser} setMessage={setMessage}></EditableField>
        </form>
        <div>
          <ul>
            <li className="py-4">Shared palettes:<span className="ml-2">{palettes.length}</span></li>
            <li className="py-4">Received likes:<span className="ml-2">{countPaletteLikes()}</span></li>
          </ul>
        </div>
      </div>
      <h3 className="text-2xl font-normal">Your palettes</h3>
      {palettes.map(palette => <CommunityPalette key={Math.random()} palette={palette}><button id={palette.id} onClick={event => handlePaletteDelete(event)}>Delete</button></CommunityPalette>)}

    </div>
  )
}

export default UserView