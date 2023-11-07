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
    <div className="w-full grid grid-cols-1 grid-rows-[1fr_30vh] h-screen">
      <div className="grid grid-rows-1 grid-cols-3 gap-4 p-4 text-xs">
        <VisualiserBlog colors={colors}></VisualiserBlog>
        <VisualiserCalendar colors={colors}></VisualiserCalendar>
        <VisualiserDashboard colors={colors}></VisualiserDashboard>
      </div>
      <div className="p-5 grid grid-cols-[28rem_1fr] grid-rows-1  bg-gray-200">
        <div className="">
          <div>
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
          <button className="pill-button-empty w-fit block mt-2" onClick={() => randomizeColors()}>Randomize palette</button>
        </div>
        <div className="grid grid-cols-1 grid-rows-2">
          <div className="grid grid-cols-1 grid-rows-[2fr_1fr]">
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
          <div className="grid grid-cols-5 grid-rows-1 gap-x-4">
            <ColorRange color={colors[0]} setColor={returnable => setColors([returnable, colors[1], colors[2], colors[3], colors[4]])}></ColorRange>
            <ColorRange color={colors[1]} setColor={returnable => setColors([colors[0], returnable, colors[2], colors[3], colors[4]])}></ColorRange>
            <ColorRange color={colors[2]} setColor={returnable => setColors([colors[0], colors[1], returnable, colors[3], colors[4]])}></ColorRange>
            <ColorRange color={colors[3]} setColor={returnable => setColors([colors[0], colors[1], colors[2], returnable, colors[4]])}></ColorRange>
            <ColorRange color={colors[4]} setColor={returnable => setColors([colors[0], colors[1], colors[2], colors[3], returnable])}></ColorRange>
          </div>
        </div>
      </div>
    </div>
  )
}

export default SchemeVisualiserView