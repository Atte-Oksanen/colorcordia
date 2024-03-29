import { useEffect, useState } from "react"
import { randomizeColor } from "../../utils/colorRandomizer"
import XIcon from "../icons/XIcon"
import { getColorAttributeCount, getColorAttributes, sendColorAttributes } from "../../services/colorNames"

const ColorAttributeView = () => {
  const [color, setColor] = useState<string | null>(null)
  const [attributeCount, setAttributeCount] = useState(0)
  const [pickedAttributes, setPickedAttributes] = useState<string[]>([])
  const [searchterm, setSearchterm] = useState('')
  const [attributes, setAttributes] = useState<string[]>([])
  const [smallScreen, setScreenSize] = useState(false)

  useEffect(() => {
    (async () => {
      setAttributes((await getColorAttributes()).attributes.sort(() => Math.random() < 0.5 ? -1 : 1))
      setAttributeCount(await getColorAttributeCount())
    })()
    window.onresize = () => setScreenSize(window.screen.width < 768)
    setColor(randomizeColor())
  }, [])

  const pickAdjective = (event: React.MouseEvent<HTMLButtonElement>) => {
    setPickedAttributes(pickedAttributes.concat(event.currentTarget.value))
  }

  const removeAdjective = (event: React.MouseEvent<HTMLButtonElement>) => {
    setPickedAttributes(pickedAttributes.filter(element => element !== event.currentTarget.value))
  }

  const handleAdjectiveSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchterm(event.target.value)
  }

  const skipColor = () => {
    setColor(randomizeColor())
    setPickedAttributes([])
    setSearchterm('')
  }

  const submitAttributes = () => {
    sendColorAttributes({ hex: color, attributes: pickedAttributes })
    setAttributeCount(attributeCount + pickedAttributes.length)
    skipColor()
  }

  return (
    <div className="p-4 h-screen">
      <div className="mb-10">
        <h2 className="text-2xl font-normal ">
          Color attributor
        </h2>
        <div>{attributeCount} attributes given in total</div>
      </div>
      <div className="md:w-3/4 md:h-[80vh] h-[120vh] m-auto element-border rounded-lg">
        <div className="grid grid-cols-1 h-full md:grid-rows-[1fr_1fr_4rem] grid-rows-[1fr_2fr_4rem]">
          <div className="grid grid-rows-[2rem_1fr] mt-4">
            <h3 className="block md:text-xl font-normal ml-4">{color}</h3>
            <div style={{ background: color }}></div>
          </div>
          <div className="grid md:grid-cols-2 h-full overflow-hidden md:grid-rows-[1fr_6fr] grid-rows-[2fr_1fr]">
            {!smallScreen &&
              <>
                <div className="md:flex justify-between items-center m-4 md:h-10">
                  <h3 className="text-xl font-normal">
                    Attributes
                  </h3>
                  <input type="text" placeholder="Search attributes" className="text-input" value={searchterm} onChange={handleAdjectiveSearch} />
                </div>
                <div className="flex justify-between items-center m-4 h-10">
                  <h3 className="text-xl font-normal">
                    Picked attributes
                  </h3>
                </div>
              </>
            }
            <div className="overflow-y-scroll m-4 p-2 element-border md:rounded-l-lg rounded-lg">
              {attributes.filter(element => !pickedAttributes.includes(element) && element.toLowerCase().includes(searchterm.toLowerCase()))
                .map(adjective => <button className="pill-button m-1" key={adjective} value={adjective} onClick={pickAdjective}>{adjective}</button>)}
            </div>
            <div className="overflow-y-scroll m-4 p-2 element-border md:rounded-l-lg rounded-lg">
              {pickedAttributes.length === 0
                ? <div className="text-lg">
                  No attributes picked
                </div>
                : pickedAttributes
                  .map(pickedAdjective =>
                    <div key={pickedAdjective} className="inline-block m-1">
                      <button onClick={removeAdjective} value={pickedAdjective} className="flex pill-button-empty w-fit h-fit hover:pill-button-delete">
                        {pickedAdjective}
                      </button>
                    </div>
                  )}
            </div>
          </div>
          <div className="flex justify-end">
            <div className="mx-4">
              <button className="pill-button-empty mr-2 md:text-lg" onClick={skipColor}>Skip color</button>
              <button className="pill-button md:text-lg disabled:bg-blue-400" disabled={pickedAttributes.length === 0} onClick={submitAttributes}>Submit Attributes</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ColorAttributeView