import { useState } from 'react'
import ColorWheel from './components/ColorWheel'
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom'
import FollowUpPalettes from './components/FollowUpPalettes'
import PaletteView from './components/PaletteView'
import SinglePaletteView from './components/SinglePaletteView'
import ExploreView from './components/ExploreView'

function App() {
  const [pickedColor, setColor] = useState(null)
  return (
    <BrowserRouter>
      <nav>
        <h1>ColorCordia</h1>
        <Link to='/'>Color wheel</Link>
        <Link to='/explore'>Explore</Link>
        <Link>Scheme visualiser</Link>
        <Link>Color converter</Link>
        <Link>About</Link>
      </nav>
      <Routes>
        <Route path='/' element={<ColorWheel setColor={setColor}></ColorWheel>}></Route>
        <Route path='/palettes/' element={<PaletteView color={pickedColor} setColor={setColor}></PaletteView>}></Route>
        <Route path='/palettes/:id' element={<FollowUpPalettes></FollowUpPalettes>}></Route>
        <Route path='/palette/:id' element={<SinglePaletteView></SinglePaletteView>}></Route>
        <Route path='/explore' element={<ExploreView></ExploreView>}></Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
