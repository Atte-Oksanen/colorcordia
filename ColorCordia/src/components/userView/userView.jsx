/* eslint-disable react/prop-types */
import { useEffect, useRef, useState } from "react"
import EditableField from "../utils/editableField"
import { deletePalette, getPalettesByCreator } from "../../services/palettes"
import CommunityPalette from "../communityView/CommunityPalette"


const UserView = ({ user, setUser, setMessage }) => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [palettes, setPalettes] = useState([])
  const deleteConfirm = useRef()

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
    event.preventDefault()
    if (window.confirm('Do you want to delete a palette?')) {
      deletePalette(event.target.id)
      setPalettes(palettes.filter(palette => palette.id !== event.target.id))
    }
  }
  return (
    <div className="m-5">
      <dialog ref={deleteConfirm}></dialog>
      <h2 className="text-4xl font-normal">User Info</h2>
      <div className="w-fit p-5 mt-4 border border-gray-200 rounded-lg">
        <form>
          Username
          <br />
          <input className="text-input" type="text" disabled value={username} />
          <EditableField fieldLabel='Password' fieldValue={password} setNewState={setPassword} user={user} setUser={setUser} setMessage={setMessage}></EditableField>
        </form>
        <div>
          <ul>
            <li className="py-4">Shared palettes:<span className="ml-2">{palettes.length}</span></li>
            <li className="py-4">Received likes:<span className="ml-2">{countPaletteLikes()}</span></li>
          </ul>
        </div>
      </div>
      <h3 className="mt-4 text-2xl font-normal">Your palettes</h3>
      <div className="grid md:grid-cols-3 gap-4">
        {palettes.map(palette => {
          return (
            <div key={Math.random()}>
              <CommunityPalette key={Math.random()} palette={palette}><button className="pill-button-delete" id={palette.id} onClick={event => handlePaletteDelete(event)}>Delete</button></CommunityPalette>
            </div>
          )
        })}
      </div>

    </div>
  )
}

export default UserView