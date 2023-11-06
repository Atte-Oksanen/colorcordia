/* eslint-disable react/prop-types */
import { useEffect, useState } from "react"
import VisualiserBlog from "./VisualiserBlog"
import VisualiserCalendar from "./VisualiserCalendar"
import VisualiserDashboard from "./VisualiserDashboard"
import { getPalettes } from "../../services/palettes"
import PaletteDropDown from "../utils/PaletteDropDown"
import { createRandomHarmony, randomizeColor } from "../../utils/colorRandomizer"

const SchemeVisualiserView = ({ palettes, setPalettes, user }) => {
  const [colors, setColors] = useState([])

  useEffect(() => {
    if (palettes.length < 1) {
      (async () => {
        setPalettes(await getPalettes())
      })()
    }
  }, [])

  useEffect(() => {
    setColors(createRandomHarmony(randomizeColor()))
  }, [])

  const randomizeColors = () => {
    const randColors = createRandomHarmony(randomizeColor())
    setColors(randColors)
  }

  const handleColorInput = event => {
    event.preventDefault()
    const colors = []
    for (let index = 0; index < event.target.length - 1; index++) {
      colors.push(event.target[index].value)
    }
    setColors(colors)
  }

  if (colors.length < 1) {
    return null
  }
  return (
    <div>
      <div className="grid grid-cols-[1fr_2fr] grid-rows-1">
        <div className="p-5 h-screen overflow-y-auto border-r-2 border-gray-200">
          <h2 className="text-4xl font-normal mb-4">Color scheme visualiser</h2>
          <div className="block ">
            <div className="grid grid-cols-1 grid-rows-[5fr_1fr]">
              <div className="grid grid-cols-5 grid-rows-1 rounded-lg overflow-hidden">
                <div style={{ background: colors[0] }}></div>
                <div style={{ background: colors[1] }}></div>
                <div style={{ background: colors[2] }}></div>
                <div style={{ background: colors[3] }}></div>
                <div style={{ background: colors[4] }}></div>
              </div>
              <div className="grid grid-rows-1 grid-cols-5">
                <div >{colors[0]}</div>
                <div >{colors[1]}</div>
                <div >{colors[2]}</div>
                <div >{colors[3]}</div>
                <div >{colors[4]}</div>
              </div>
            </div>
          </div>
          <button className="pill-button mt-4" onClick={() => randomizeColors()}>Randomize palette</button>
          <div className="my-4">
            <h3 className="text-xl font-normal mb-2">
              Select from community created palettes
            </h3>
            <PaletteDropDown palettes={palettes} setColors={setColors}></PaletteDropDown>
            {user &&
              <div>
                <h3 className="text-xl font-normal mt-4 mb-2">
                  Choose from your own palettes
                </h3>
                <PaletteDropDown palettes={palettes.filter(palette => palette.user.id === user.id)} setColors={setColors}></PaletteDropDown>
              </div>
            }
          </div>
          <h3 className="text-xl font-normal mt-4 mb-2">
            Or create your own
          </h3>
          <form className="border border-black w-fit rounded-lg px-4 text-lg" onSubmit={handleColorInput}>
            <div className="bg-white  px-4  w-full my-3">
              Primary key color<input className="ml-2 cursor-pointer" type="color" />
            </div>
            <div className="bg-white  px-4  w-full my-3">
              Secondary key color<input className="ml-2 cursor-pointer" type="color" />
            </div>
            <div className="bg-white  px-4  w-full my-3">
              Tertiary key color<input className="ml-2 cursor-pointer" type="color" />
            </div>
            <div className="bg-white  px-4  w-full my-3">
              Supporting color<input className="ml-2 cursor-pointer" type="color" />
            </div>
            <div className="bg-white  px-4  w-full my-3">
              Secondary supporting color<input className="ml-2 cursor-pointer" type="color" />
            </div>
            <button className="pill-button-empty my-4 " type="submit">submit</button>
          </form>
        </div>
        <div className="h-screen overflow-y-scroll">
          <div className="grid grid-rows-2 grid-cols-1 gap-4 p-4">
            <div className="rounded-lg overflow-hidden">
              <VisualiserBlog colors={colors}></VisualiserBlog>
            </div>
            <div className="rounded-lg overflow-hidden">
              <VisualiserCalendar colors={colors}></VisualiserCalendar>
            </div>
            <div className="rounded-lg overflow-hidden">
              <VisualiserDashboard colors={colors}></VisualiserDashboard>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default SchemeVisualiserView