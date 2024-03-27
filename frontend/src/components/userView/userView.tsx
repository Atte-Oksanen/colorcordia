import { useEffect, useRef, useState } from "react"
import EditableField from "../utils/editableField"
import { deletePalette } from "../../services/palettes"
import CommunityPalette from "../communityView/CommunityPalette"
import { deleteUser } from "../../services/users"
import { useNavigate } from "react-router-dom"
import { User } from "../../types/userManagementTypes"
import { Message, Palette } from "../../types/componentTypes"

interface props {
  setUser: React.Dispatch<React.SetStateAction<User | null>>
  setMessage: React.Dispatch<React.SetStateAction<Message | null>>
  user: User | null
}

const UserView = ({ user, setUser, setMessage }: props) => {
  const navigate = useNavigate()
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [palettes, setPalettes] = useState<Palette[]>([])
  const palDeleteModal = useRef<HTMLDialogElement>(null)
  const userDeleteModal = useRef<HTMLDialogElement>(null)
  const [paletteForDelete, setForDelete] = useState<string | null>(null)

  useEffect(() => {
    if (!user || !user.username || !user.id || !user.palettes) {
      return
    }
    setUsername(user.username);
    setPalettes(user.palettes)
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

  const openPaletteDeleteModal = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault()
    if (palDeleteModal.current) {
      palDeleteModal.current.showModal()
      setForDelete(event.currentTarget.value)
    }
  }

  const closePaletteDeleteModal = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault()
    if (palDeleteModal.current) {
      palDeleteModal.current.close()
    }
  }

  const handlePaletteDeletion = async () => {
    if (paletteForDelete && palDeleteModal.current) {
      deletePalette(paletteForDelete)
      setPalettes(palettes.filter(palette => palette.id !== paletteForDelete))
      palDeleteModal.current.close()
      setMessage({ text: 'Palette deleted', warning: false })
    }
  }

  const openUserDeleteModal = (event: React.MouseEvent<HTMLButtonElement>) => {
    if (userDeleteModal.current) {
      event.preventDefault()
      userDeleteModal.current.showModal()
    }
  }

  const closeUserDeleteModal = (event: React.MouseEvent<HTMLButtonElement>) => {
    if (userDeleteModal.current) {
      event.preventDefault()
      userDeleteModal.current.close()
    }
  }

  const handleUserDeletion = async () => {
    if (user.id && userDeleteModal.current) {
      deleteUser(user.id)
      userDeleteModal.current.close()
      setUser(null)
      try {
        window.localStorage.removeItem('userToken')
      } catch (error) { /* empty */ }
      try {
        window.sessionStorage.removeItem('userToken')
      } catch (error) { /* empty */ }
      navigate('/')
      setMessage({ text: 'Account deleted', warning: false })

    }
  }


  return (
    <div className="m-5">
      <dialog ref={palDeleteModal} className="rounded-lg">
        <div className="p-8 w-full">
          <div className="w-fit mb-4">
            Do you want to delete a palette?
            <br />
            This action cannot be undone
          </div>
          <div className="text-right w-full">
            <button className="pill-button-delete mr-2" onClick={() => handlePaletteDeletion()}>Delete</button>
            <button className="pill-button" onClick={closePaletteDeleteModal}>Cancel</button>
          </div>
        </div>
      </dialog>
      <dialog ref={userDeleteModal} className="rounded-lg">
        <div className="p-8 w-full">
          <div className="w-fit mb-4">
            Do you want to delete this account?
            <br />
            <span className="font-bold">This action cannot be undone</span>
          </div>
          <div className="text-right w-full">
            <button className="pill-button-delete mr-2" onClick={() => handleUserDeletion()}>Delete</button>
            <button className="pill-button" onClick={closeUserDeleteModal}>Cancel</button>
          </div>
        </div>
      </dialog>
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
          <button className="pill-button-delete" onClick={openUserDeleteModal}>Delete Account</button>
        </div>
      </div>
      <h3 className="mt-4 text-2xl font-normal">Your palettes</h3>
      <div className="grid md:grid-cols-3 gap-4">
        {palettes.map(palette => {
          return (
            <div key={Math.random()}>
              <CommunityPalette key={Math.random()} palette={palette}>
                <button className="pill-button-delete" value={palette.id} onClick={event => openPaletteDeleteModal(event)}>Delete</button>
              </CommunityPalette>
            </div>
          )
        })}
      </div>

    </div>
  )
}

export default UserView