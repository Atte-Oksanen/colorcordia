/* eslint-disable react/prop-types */
const ColorPaletteSkeleton = (props) => {
  return (
    <div className="flex items-center justify-center md:h-screen mx-4">
      <div className="md:w-[95%] my-4 h-fit">
        <h2 className="text-2xl font-normal my-2">
          {`${props.type} pallette from ${props.colors[2].hex}`}
        </h2>
        <div className="md:grid hidden grid-rows-[10fr_1fr] h-[60vh]">
          <div className="grid grid-cols-5 rounded-md overflow-hidden border border-gray-300">
            {props.colors.map(color => <div key={Math.random()} style={{ background: color.hex }}></div>)}
          </div>
          <div className="grid grid-cols-5 h-fit">
            {props.colors.map(color => <div className="px-5 py-2 text-center" key={Math.random()}>{color.hex} - {color.name}</div>)}
          </div>
        </div>
        <div>
          <div className="md:hidden grid grid-cols-1 grid-rows-5 rounded-md w-full">
            {props.colors.map(color => {
              return (
                <div className="grid grid-rows-[2fr_1fr] grid-cols-1" key={Math.random()}>
                  <div className="rounded-lg border border-gray-300" key={Math.random()} style={{ background: color.hex }}></div>
                  <div className="py-2 text-center" key={Math.random()}>{color.hex} - {color.name}</div>
                </div>
              )
            })}
          </div>
        </div>
        {props.children}
      </div>
    </div>
  )
}

export default ColorPaletteSkeleton