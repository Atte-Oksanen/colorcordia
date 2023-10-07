import { useState } from 'react'
import ColorWheel from './components/ColorWheel'
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom'
import PaletteGenerator from './components/paletteGenerator'

function App() {
  const [pickedColor, setColor] = useState(null)
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<ColorWheel setColor={setColor}></ColorWheel>}></Route>
        <Route path='/palettes/' element={<PaletteGenerator color={pickedColor}></PaletteGenerator>}></Route>
      </Routes>


    </BrowserRouter>
  )
}

export default App
