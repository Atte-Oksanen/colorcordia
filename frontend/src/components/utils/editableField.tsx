import { ChangeEvent, useEffect, useState } from "react"
import { changePassword } from "../../services/users"
import { useNavigate } from "react-router-dom"
import { User } from "../../types/userManagementTypes"
import { Message } from "../../types/componentTypes"

interface props {
  fieldLabel: string,
  fieldValue: string,
  setNewState: React.Dispatch<React.SetStateAction<string>>
  user: User,
  setUser: React.Dispatch<React.SetStateAction<User | null>>
  setMessage: React.Dispatch<React.SetStateAction<Message | null>>
}

const EditableField = ({ fieldLabel, fieldValue, setNewState, user, setUser, setMessage }: props) => {
  const navigate = useNavigate()
  const [buttonMessage, setButtonMessage] = useState('Edit')
  const [fieldText, setText] = useState(fieldValue)
  const [newPass, setNewPass] = useState('')
  const [disabled, setDisabled] = useState(true)

  useEffect(() => {
    if (fieldValue) {
      setText(fieldValue)
    }
  }, [fieldValue])

  const changeEditState = () => {
    if (buttonMessage === 'Edit') {
      setButtonMessage('Save')
      setDisabled(!disabled)
    } else {
      setNewState(fieldText)
      setButtonMessage('Edit')
      setDisabled(!disabled)
    }
  }

  const handleTextChange = (event: ChangeEvent<HTMLInputElement>) => {
    if (buttonMessage === 'Save') {
      setText(event.target.value)
    }
  }

  const handleNewPass = (event: ChangeEvent<HTMLInputElement>) => {
    if (buttonMessage === 'Save') {
      setNewPass(event.target.value)
    }
  }

  const sendNewPass = () => {
    changePassword({ username: user.username, currentPassword: fieldText, newPassword: newPass })
    changeEditState()
    window.localStorage.removeItem('userToken')
    setUser(null)
    navigate('/login')
    setMessage({ text: "Logged out", warning: false })
  }

  return (
    <div>
      {disabled && fieldLabel}
      <br />
      {!disabled && <>Current password <br /></>}
      <input className="text-input my-1 enabled:bg-white enabled:border-gray-400" disabled={disabled} type='password' placeholder="***********" value={fieldText} onChange={handleTextChange} />
      <br />
      {disabled && <button className="pill-button" type="button" onClick={changeEditState}>{buttonMessage}</button>}
      {!disabled &&
        <>
          <br />
          New password
          <br />
          <input className="text-input my-1 enabled:bg-white enabled:border-gray-400" disabled={disabled} type='password' placeholder="***********" value={newPass} onChange={handleNewPass} />
          <br />
          <button className="pill-button mr-2" type="button" onClick={sendNewPass}>{buttonMessage}</button>
          <button className="pill-button-empty" onClick={changeEditState}>Cancel</button>
          <p className="underline mt-3">
            Note: You must log in again after changing your password
          </p>
        </>
      }
    </div>
  )
}

export default EditableField