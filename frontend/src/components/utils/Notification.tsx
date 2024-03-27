import { Message } from "../../types/componentTypes"
import XIcon from "../icons/XIcon"


interface props {
  message: Message | null
  setMessage: React.Dispatch<React.SetStateAction<Message | null>>
}
const Notification = ({ message, setMessage }: props) => {
  if (!message) {
    return null
  }

  setTimeout(() => {
    setMessage(null)
  }, 5000)

  return (
    <div className={`fixed drop-shadow-md z-50 inset-x-0 flex items-center mx-auto w-fit px-4 py-3 bottom-20 border-l-4 border ${message.warning ? 'border-red-400' : 'border-blue-400'} bg-gray-200 text-lg font-normal rounded-r-md`} >
      {message.text}
      <button onClick={() => setMessage(null)} className="h-fit ml-2">
        <XIcon sizeClass='h-7 w-7'></XIcon>
      </button>
    </div>
  )
}

export default Notification