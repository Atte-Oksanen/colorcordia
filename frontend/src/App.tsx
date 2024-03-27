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
import { createRandomBgColor } from './utils/colorRandomizer'
import AboutView from './components/aboutView/AboutView'
import { Message, Palette } from './types/componentTypes'
import { User } from './types/userManagementTypes'

const App = () => {
  const navigate = useNavigate()
  const [pickedColor, setColor] = useState<null | string>(null)
  const [message, setMessage] = useState<null | Message>(null)
  const [communityPalettes, setPalettes] = useState<Palette[]>([])
  const [user, setUser] = useState<User | null>(null)
  const [bgColor, setBgColor] = useState<string | null>(null)

  useEffect(() => {
    (async () => {
      const savedUser = window.localStorage.getItem('userToken') || window.sessionStorage.getItem('userToken')
      if (savedUser) {
        const parsedUser = JSON.parse(savedUser)
        try {
          setUserToken(parsedUser.token)
          const tempUser = await getUser(parsedUser.id)
          setUser(tempUser)
          setPaletteToken(parsedUser.token)
        } catch (error) {
          setMessage({ text: 'Login timed out, please log back in', warning: true })
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

  useEffect(() => {
    setBgColor(createRandomBgColor())
  }, [])


  return (
    <div className='font-extralight grid md:grid-cols-[8rem_1fr] md:grid-rows-1 grid-rows-[1fr_7rem] h-[100svh]'>
      <div className='order-last md:order-none'>
        <Header user={user} setMessage={setMessage} setUser={setUser} bgColor={pickedColor || bgColor}></Header>
      </div>
      <Notification message={message} setMessage={setMessage}></Notification>
      <div className='h-full overflow-auto'>
        <Routes>
          <Route path='/' element={<ColorWheelView setColor={setColor} setMessage={setMessage} ></ColorWheelView>}></Route>
          <Route path='/palettes/' element={<PaletteView color={pickedColor} setColor={setColor}></PaletteView>}></Route>
          <Route path='/palettes/:id' element={<FollowUpPalettes></FollowUpPalettes>}></Route>
          <Route path='/palette/:id' element={<SinglePaletteView communityPalettes={communityPalettes} setPalettes={setPalettes} setMessage={setMessage} user={user} setUser={setUser}></SinglePaletteView>}></Route>
          <Route path='/explore' element={<ExploreView palettes={communityPalettes} setPalettes={setPalettes}></ExploreView>}></Route>
          <Route path='/explore/:id' element={<SingleCommunityPaletteView palettes={communityPalettes} user={user} setUser={setUser}></SingleCommunityPaletteView>}></Route>
          <Route path='/profile' element={<UserView user={user} setUser={setUser} setMessage={setMessage}></UserView>}></Route>
          <Route path='/login' element={<LoginView setUser={setUser} setMessage={setMessage}></LoginView>}></Route>
          <Route path='/signup' element={<SignUpView setMessage={setMessage}></SignUpView>}></Route>
          <Route path='/converter' element={<ColorConverterView setMessage={setMessage}></ColorConverterView>}></Route>
          <Route path='/visualiser' element={<SchemeVisualiserView palettes={communityPalettes} setPalettes={setPalettes} user={user}></SchemeVisualiserView>}></Route>
          <Route path='/about' element={<AboutView></AboutView>}></Route>
        </Routes>
      </div>
    </div>
  )
}

export default App
