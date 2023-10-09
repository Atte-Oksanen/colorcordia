import { useEffect, useState } from "react"
import { getPalettes } from "../services/palettes"
import CommunityPalette from "./CommunityPalette"
const ExploreView = () => {
    const [palettes, setPalettes] = useState([])
    useEffect(() => {
        (async () => {
            setPalettes(await getPalettes())
        })()
    }, [])
    if (palettes.length < 1) {
        return null
    }
    return (
        <div>
            <h2>Explore latest community created palettes</h2>
            {palettes.map(palette => <CommunityPalette key={Math.random()} palette={palette}></CommunityPalette>)}
        </div>
    )
}

export default ExploreView