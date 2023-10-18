import { useState } from 'react'
import ColorWheel from './components/ColorWheel'
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom'
import FollowUpPalettes from './components/FollowUpPalettes'
import PaletteView from './components/PaletteView'
import SinglePaletteView from './components/SinglePaletteView'
import ExploreView from './components/ExploreView'
import Notification from './components/Notification'
import UserView from './components/userView'
import SingleCommunityPaletteView from './components/singleCommunityPaletteView'
import LoginView from './components/LoginView'
import SignUpView from './components/SignUpView'

function App() {
  const [pickedColor, setColor] = useState(null)
  const [message, setMessage] = useState(null)
  const [communityPalettes, setPalettes] = useState([])
  return (
    <BrowserRouter>
      <nav>
        <h1>ColorCordia</h1>
        <Link to='/'>Color wheel</Link>
        <Link to='/explore'>Explore</Link>
        <Link>Scheme visualiser</Link>
        <Link>Color converter</Link>
        <Link>About</Link>
        <Link to='/profile'>User Profile</Link>
        <Link to='/login'>Login</Link>
        <Link to='/signup'>Sign up</Link>
      </nav>
      <Notification message={message} setMessage={setMessage}></Notification>
      <Routes>
        <Route path='/' element={<ColorWheel setColor={setColor} pickedColor={pickedColor} setMessage={setMessage}></ColorWheel>}></Route>
        <Route path='/palettes/' element={<PaletteView color={pickedColor} setColor={setColor}></PaletteView>}></Route>
        <Route path='/palettes/:id' element={<FollowUpPalettes></FollowUpPalettes>}></Route>
        <Route path='/palette/:id' element={<SinglePaletteView setMessage={setMessage}></SinglePaletteView>}></Route>
        <Route path='/explore' element={<ExploreView palettes={communityPalettes} setPalettes={setPalettes}></ExploreView>}></Route>
        <Route path='/explore/:id' element={<SingleCommunityPaletteView palettes={communityPalettes}></SingleCommunityPaletteView>}></Route>
        <Route path='/profile' element={<UserView></UserView>}></Route>
        <Route path='/login' element={<LoginView></LoginView>}></Route>
        <Route path='/signup' element={<SignUpView></SignUpView>}></Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
