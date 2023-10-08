import { useState } from 'react'
import ColorWheel from './components/ColorWheel'
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom'
import FollowUpPalettes from './components/FollowUpPalettes'
import PaletteView from './components/PaletteView'
import SinglePaletteView from './components/SinglePaletteView'

function App() {
  const [pickedColor, setColor] = useState(null)
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<ColorWheel setColor={setColor}></ColorWheel>}></Route>
        <Route path='/palettes/' element={<PaletteView color={pickedColor} setColor={setColor}></PaletteView>}></Route>
        <Route path='/palettes/:id' element={<FollowUpPalettes></FollowUpPalettes>}></Route>
        <Route path='/palette/:id' element={<SinglePaletteView></SinglePaletteView>}></Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
