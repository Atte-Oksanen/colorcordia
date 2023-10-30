/* eslint-disable react/prop-types */
import { useEffect, useState } from "react"

const EditableField = ({ fieldLabel, fieldValue, setNewState }) => {
  const [buttonMessage, setMessage] = useState('Edit')
  const [fieldText, setText] = useState(fieldValue)
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

  if (fieldValue === '') {
    return null
  }
  const changeEditState = () => {
    if (buttonMessage === 'Edit') {
      setMessage('Save')
      setPasswordCheck('text')
      setDisabled(!disabled)
    } else {
      setNewState(fieldText)
      setMessage('Edit')
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


  return (
    <div>
      {fieldLabel} <input disabled={disabled} type={isPassword} value={fieldText} onChange={handleTextChange} /> <button type="button" onClick={changeEditState}>{buttonMessage}</button>
    </div>
  )
}

export default EditableField