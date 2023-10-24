import { useEffect, useState } from 'react'
import ColorWheel from './components/ColorWheel'
import { Routes, Route, Link, useNavigate } from 'react-router-dom'
import FollowUpPalettes from './components/FollowUpPalettes'
import PaletteView from './components/PaletteView'
import SinglePaletteView from './components/SinglePaletteView'
import ExploreView from './components/ExploreView'
import Notification from './components/Notification'
import UserView from './components/userView'
import SingleCommunityPaletteView from './components/SingleCommunityPaletteView'
import LoginView from './components/LoginView'
import SignUpView from './components/SignUpView'
import { setPaletteToken } from './services/palettes'
import { getUser, setUserToken } from './services/users'
import ColorConverterView from './components/ColorConverterView'

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
        setPaletteToken(parsedUser.token)
        setUserToken(parsedUser.token)
        setUser(await getUser(parsedUser.id))
      }
    })()
  }, [])


  const logOut = () => {
    window.localStorage.removeItem('userToken')
    setUser(null)
    navigate('/')
    setMessage("Logged out")
  }
  return (
    <>
      <nav>
        <h1>ColorCordia</h1>
        <Link to='/'>Color wheel</Link>
        <Link to='/explore'>Explore</Link>
        <Link>Scheme visualiser</Link>
        <Link to='/converter'>Color converter</Link>
        <Link>About</Link>
        {user && <Link to='/profile'>User Profile</Link>}
        {!user && <Link to='/login'>Login</Link>}
        {!user && <Link to='/signup'>Sign up</Link>}
        {user && <button onClick={logOut}>Log out</button>}
      </nav>
      <Notification message={message} setMessage={setMessage}></Notification>
      <Routes>
        <Route path='/' element={<ColorWheel setColor={setColor} pickedColor={pickedColor} setMessage={setMessage}></ColorWheel>}></Route>
        <Route path='/palettes/' element={<PaletteView color={pickedColor} setColor={setColor}></PaletteView>}></Route>
        <Route path='/palettes/:id' element={<FollowUpPalettes></FollowUpPalettes>}></Route>
        <Route path='/palette/:id' element={<SinglePaletteView setMessage={setMessage}></SinglePaletteView>}></Route>
        <Route path='/explore' element={<ExploreView palettes={communityPalettes} setPalettes={setPalettes}></ExploreView>}></Route>
        <Route path='/explore/:id' element={<SingleCommunityPaletteView palettes={communityPalettes} user={user} setUser={setUser}></SingleCommunityPaletteView>}></Route>
        <Route path='/profile' element={<UserView user={user}></UserView>}></Route>
        <Route path='/login' element={<LoginView setUser={setUser} setMessage={setMessage}></LoginView>}></Route>
        <Route path='/signup' element={<SignUpView setMessage={setMessage}></SignUpView>}></Route>
        <Route path='/converter' element={<ColorConverterView></ColorConverterView>}></Route>
      </Routes>
    </>
  )
}

export default App
