/* eslint-disable react/prop-types */
const Notification = ({ message, setMessage }) => {
  if (!message) {
    return null
  }

  setTimeout(() => {
    setMessage(null)
  }, 2000)

  return (
    <div>{message}</div>
  )
}

export default Notification