/* eslint-disable react/prop-types */
import ColorWheel from "./ColorWheel"

const ColorWheelView = ({ setColor, setMessage, reRenderWheel }) => {
  return (
    <div className='flex md:h-screen'>
      <div className='block w-fit m-auto text-center'>
        <h1 className="md:text-5xl md:block hidden text-2xl pb-5 font-normal">ColorCordia*</h1>
        <h2 className='text-xl md:pb-5 md:m-0 my-5'>Start by choosing a color.</h2>
        <ColorWheel setColor={setColor} setMessage={setMessage} reRenderWheel={reRenderWheel}></ColorWheel>
      </div>
    </div>
  )
}

export default ColorWheelView