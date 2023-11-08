/* eslint-disable react/prop-types */
import { useEffect, useState } from "react"
import VisualiserBlog from "./VisualiserBlog"
import VisualiserCalendar from "./VisualiserCalendar"
import VisualiserDashboard from "./VisualiserDashboard"
import { getPalettes } from "../../services/palettes"
import PaletteDropDown from "../utils/PaletteDropDown"
import { createRandomHarmony, randomizeColor } from "../../utils/colorRandomizer"
import ColorRange from "../utils/ColorRange"

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
    const randomHarmony = createRandomHarmony(randomizeColor())
    setColors(randomHarmony)
  }, [])

  const randomizeColors = () => {
    const randomHarmony = createRandomHarmony(randomizeColor())
    setColors(randomHarmony)
  }

  if (colors.length < 1) {
    return null
  }
  return (
    <div className="w-full grid grid-cols-[1fr_2fr] grid-rows-1 pb-0">
      <div className="grid grid-cols-2 grid-rows-5 h-screen p-4 gap-4 border-r-2 border-gray-200">
        <div className="grid grid-cols-1 grid-rows-2">
          <div className="rounded-lg"
            style={{ background: colors[0] }}></div>
          <div >{colors[0]}</div>
        </div>
        <ColorRange color={colors[0]} setColor={returnable => setColors([returnable, colors[1], colors[2], colors[3], colors[4]])}></ColorRange>
        <div className="grid grid-cols-1 grid-rows-2">
          <div className="rounded-lg"
            style={{ background: colors[1] }}></div>
          <div>{colors[1]}</div>
        </div>
        <ColorRange color={colors[1]} setColor={returnable => setColors([colors[0], returnable, colors[2], colors[3], colors[4]])}></ColorRange>
        <div className="grid grid-cols-1 grid-rows-2">
          <div className="rounded-lg"
            style={{ background: colors[2] }}></div>
          <div >{colors[2]}</div>
        </div>
        <ColorRange color={colors[2]} setColor={returnable => setColors([colors[0], colors[1], returnable, colors[3], colors[4]])}></ColorRange>
        <div className="grid grid-rows-2 grid-cols-1">
          <div className="rounded-lg"
            style={{ background: colors[3] }}></div>
          <div >{colors[3]}</div>
        </div>
        <ColorRange color={colors[3]} setColor={returnable => setColors([colors[0], colors[1], colors[2], returnable, colors[4]])}></ColorRange>
        <div className="grid grid-rows-2 grid-cols-1">
          <div className="rounded-lg"
            style={{ background: colors[4] }}></div>
          <div >{colors[4]}</div>
        </div>
        <ColorRange color={colors[4]} setColor={returnable => setColors([colors[0], colors[1], colors[2], colors[3], returnable])}></ColorRange>
      </div>
      <div className="grid grid-cols-1 h-screen">
        <div className="text-sm overflow-auto p-3 bg-gray-200">
          <div className="pb-4">
            <VisualiserBlog colors={colors}></VisualiserBlog>
          </div>
          <div className="pb-4">
            <VisualiserCalendar colors={colors}></VisualiserCalendar>
          </div>
          <VisualiserDashboard colors={colors}></VisualiserDashboard>
        </div>
        <div className="grid grid-cols-[12rem_1fr_1fr] p-4 pb-8 border-t-2 border-gray-200">
          <button className="pill-button-empty w-fit h-fit block m-auto" onClick={() => randomizeColors()}>Randomize palette</button>
          <div className="mx-8">
            <h3 className="text-lg font-normal mb-2">
              Community created palettes
            </h3>
            <PaletteDropDown palettes={palettes} setColors={setColors}></PaletteDropDown>
          </div>
          {user &&
            <div className="inline-block">
              <h3 className="text-lg font-normal mb-2">
                Your palettes
              </h3>
              <PaletteDropDown palettes={palettes.filter(palette => palette.user.id === user.id)} setColors={setColors}></PaletteDropDown>
            </div>
          }
        </div>
      </div>

    </div>
  )
}

export default SchemeVisualiserView