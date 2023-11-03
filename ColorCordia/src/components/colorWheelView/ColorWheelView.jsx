/* eslint-disable react/prop-types */
import ColorWheel from "./ColorWheel"

const ColorWheelView = ({ setColor, setMessage }) => {
  return (
    <div className='flex h-screen'>
      <div className='block w-fit m-auto text-center'>
        <h1 className="text-5xl pb-5 font-normal">ColorCordia*</h1>
        <h2 className='text-xl pb-5'>Start by choosing a color.</h2>
        <ColorWheel setColor={setColor} setMessage={setMessage}></ColorWheel>
      </div>
    </div>
  )
}

export default ColorWheelView