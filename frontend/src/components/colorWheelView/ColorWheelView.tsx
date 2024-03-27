import { Message } from "../../types/componentTypes"
import ColorWheel from "./ColorWheel"

interface props {
  setColor: React.Dispatch<React.SetStateAction<string | null>>,
  setMessage: React.Dispatch<React.SetStateAction<Message | null>>
}

const ColorWheelView = ({ setColor, setMessage }: props) => {
  return (
    <div className='flex md:h-screen'>
      <div className='block w-fit m-auto text-center'>
        <h1 className="md:text-5xl md:block hidden text-2xl pb-5 font-normal">ColorCordia*</h1>
        <h2 className='text-xl md:pb-5 md:m-0 my-5'>Start by choosing a color.</h2>
        <ColorWheel setColor={setColor} setMessage={setMessage} ></ColorWheel>
      </div>
    </div>
  )
}

export default ColorWheelView