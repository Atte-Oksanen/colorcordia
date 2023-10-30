/* eslint-disable react/prop-types */
import { useEffect } from "react"
import { getPalettes } from "../../services/palettes"
import CommunityPalette from "./CommunityPalette"
import LoadingComponent from "../utils/LoadingComponent"
const ExploreView = ({ palettes, setPalettes }) => {
  useEffect(() => {
    (async () => {
      setPalettes(await getPalettes())
    })()
  }, [setPalettes])

  if (palettes.length < 1) {
    return (
      <LoadingComponent></LoadingComponent>
    )
  }
  return (
    <div>
      <h2>Explore the latest community created palettes</h2>
      {palettes.map(palette => <CommunityPalette key={Math.random()} palette={palette}></CommunityPalette>)}
    </div>
  )
}

export default ExploreView