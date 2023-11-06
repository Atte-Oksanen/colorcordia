/* eslint-disable react/prop-types */
import { useEffect, useState } from "react"
import { changePassword } from "../../services/users"
import { useNavigate } from "react-router-dom"

const EditableField = ({ fieldLabel, fieldValue, setNewState, user, setUser, setMessage }) => {
  const navigate = useNavigate()
  const [buttonMessage, setButtonMessage] = useState('Edit')
  const [fieldText, setText] = useState(fieldValue)
  const [newPass, setNewPass] = useState('')
  const [isPassword, setPasswordCheck] = useState('password')
  const [disabled, setDisabled] = useState(true)

  useEffect(() => {
    if (fieldLabel === 'Password') {
      setPasswordCheck('password')
    } else {
      setPasswordCheck('text')
    }
  }, [fieldLabel])

  useEffect(() => {
    if (fieldValue) {
      setText(fieldValue)
    }
  }, [fieldValue])


  const changeEditState = () => {
    if (buttonMessage === 'Edit') {
      setButtonMessage('Save')
      setPasswordCheck('text')
      setDisabled(!disabled)
    } else {
      setNewState(fieldText)
      setButtonMessage('Edit')
      if (fieldLabel === 'Password') {
        setPasswordCheck('password')
      }
      setDisabled(!disabled)

    }
  }

  const handleTextChange = event => {
    if (buttonMessage === 'Save') {
      setText(event.target.value)
    }
  }

  const handleNewPass = event => {
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
    setMessage("Logged out")
  }

  return (
    <div>
      {disabled && fieldLabel}
      {!disabled && <>Current password </>}
      <input className="text-input enabled:bg-white enabled:border-gray-400" disabled={disabled} type={isPassword} placeholder="***********" value={fieldText} onChange={handleTextChange} />
      {disabled && <button className="pill-button" type="button" onClick={changeEditState}>{buttonMessage}</button>}
      {!disabled &&
        <>
          <br />
          New password <input className="text-input enabled:bg-white enabled:border-gray-400" disabled={disabled} type={isPassword} placeholder="***********" value={newPass} onChange={handleNewPass} />
          <button className="pill-button" type="button" onClick={sendNewPass}>{buttonMessage}</button>
          <p className="underline mt-3">
            Note: You must log in again after changing your password
          </p>
        </>
      }
    </div>
  )
}

export default EditableField