/* eslint-disable react/prop-types */
const Notification = ({ message, setMessage }) => {
  if (!message) {
    return null
  }

  setTimeout(() => {
    setMessage(null)
  }, 2500)

  return (
    <div style={{ position: 'fixed', zIndex: '101', left: '50%', top: '85%', translate: '-50%', padding: '1.5rem 3rem', background: '#fcfcfc', filter: 'drop-shadow(0 0 0.2rem grey)', border: '1px solid black', borderRadius: '1rem' }}>
      {message}
    </div>
  )
}

export default Notification