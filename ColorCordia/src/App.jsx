import { useEffect, useState } from 'react'
import { Routes, Route, useNavigate } from 'react-router-dom'
import FollowUpPalettes from './components/paletteView/FollowUpPalettes'
import PaletteView from './components/paletteView/PaletteView'
import SinglePaletteView from './components/paletteView/SinglePaletteView'
import ExploreView from './components/communityView/ExploreView'
import Notification from './components/utils/Notification'
import UserView from './components/userView/userView'
import SingleCommunityPaletteView from './components/communityView/SingleCommunityPaletteView'
import LoginView from './components/userView/LoginView'
import SignUpView from './components/userView/SignUpView'
import { setPaletteToken } from './services/palettes'
import { getUser, setUserToken } from './services/users'
import ColorConverterView from './components/ColorConverterView'
import SchemeVisualiserView from './components/visualiserView/SchemeVisualiserView'
import Header from './components/Header'
import ColorWheelView from './components/colorWheelView/ColorWheelView'

function App() {
  const navigate = useNavigate()
  const [pickedColor, setColor] = useState(null)
  const [message, setMessage] = useState(null)
  const [communityPalettes, setPalettes] = useState([])
  const [user, setUser] = useState(null)

  useEffect(() => {
    (async () => {
      const savedUser = window.localStorage.getItem('userToken')
      if (savedUser) {
        const parsedUser = JSON.parse(savedUser)
        try {
          setUserToken(parsedUser.token)
          setUser(await getUser(parsedUser.id))
          setPaletteToken(parsedUser.token)
        } catch (error) {
          setMessage('Login timed out, please log back in')
          window.localStorage.removeItem('userToken')
        }
      }
      const urlParams = new URLSearchParams(window.location.search)
      const path = urlParams.get('path')
      if (path) {
        navigate(path)
      }
    })()
  }, [])


  return (
    <div className='font-extralight grid main-grid-layout'>
      <Header user={user} setMessage={setMessage} setUser={setUser}></Header>
      <Notification message={message} setMessage={setMessage}></Notification>
      <Routes>
        <Route path='/' element={<ColorWheelView setColor={setColor} setMessage={setMessage}></ColorWheelView>}></Route>
        <Route path='/palettes/' element={<PaletteView color={pickedColor} setColor={setColor}></PaletteView>}></Route>
        <Route path='/palettes/:id' element={<FollowUpPalettes></FollowUpPalettes>}></Route>
        <Route path='/palette/:id' element={<SinglePaletteView communityPalettes={communityPalettes} setPalettes={setPalettes} setMessage={setMessage} user={user}></SinglePaletteView>}></Route>
        <Route path='/explore' element={<ExploreView palettes={communityPalettes} setPalettes={setPalettes}></ExploreView>}></Route>
        <Route path='/explore/:id' element={<SingleCommunityPaletteView palettes={communityPalettes} user={user} setUser={setUser}></SingleCommunityPaletteView>}></Route>
        <Route path='/profile' element={<UserView user={user}></UserView>}></Route>
        <Route path='/login' element={<LoginView setUser={setUser} setMessage={setMessage}></LoginView>}></Route>
        <Route path='/signup' element={<SignUpView setMessage={setMessage}></SignUpView>}></Route>
        <Route path='/converter' element={<ColorConverterView setMessage={setMessage}></ColorConverterView>}></Route>
        <Route path='/visualiser' element={<SchemeVisualiserView palettes={communityPalettes} setPalettes={setPalettes} user={user}></SchemeVisualiserView>}></Route>
      </Routes>
    </div>
  )
}

export default App
