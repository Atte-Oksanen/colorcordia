import { useEffect } from "react"
import { getPalettes } from "../../services/palettes"
import CommunityPalette from "./CommunityPalette"
import LoadingComponent from "../utils/LoadingComponent"
import { Palette } from "../../types/componentTypes"

interface props {
  palettes: Palette[]
  setPalettes: React.Dispatch<React.SetStateAction<Palette[]>>
}

const ExploreView = ({ palettes, setPalettes }: props) => {
  useEffect(() => {
    (async () => {
      setPalettes(await getPalettes())
    })()
  }, [setPalettes])

  if (palettes.length < 1) {
    return (
      <div className="h-full flex">
        <LoadingComponent></LoadingComponent>
      </div>
    )
  }
  return (
    <div className="m-4">
      <h2 className="text-2xl font-normal">Explore the latest community created palettes</h2>
      <div className="grid md:grid-cols-3 grid-flow-row">
        {palettes.map(palette => <CommunityPalette key={Math.random()} palette={palette}></CommunityPalette>).reverse()}
      </div>
    </div>
  )
}

export default ExploreView