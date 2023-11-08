/* eslint-disable react/prop-types */
const ColorPaletteSkeleton = (props) => {
  return (
    <div className="w-[95%] m-auto h-fit">
      <h2 className="text-2xl font-normal my-2">
        {`${props.type} pallette from ${props.colors[2].hex}`}
      </h2>
      <div className="grid grid-rows-[10fr_1fr] h-[60vh]">
        <div className="grid grid-cols-5 rounded-md overflow-hidden border border-gray-300">
          {props.colors.map(color => <div key={Math.random()} style={{ background: color.hex }}></div>)}
        </div>
        <div className="grid grid-cols-5 h-fit">
          {props.colors.map(color => <div className="px-5 py-2 text-center" key={Math.random()}>{color.hex} - {color.name}</div>)}
        </div>
      </div>
      {props.children}
    </div>
  )
}

export default ColorPaletteSkeleton