/* eslint-disable react/prop-types */
import { Link, useNavigate } from "react-router-dom"
import ColorPaletteIcon from "./icons/ColorPaletteIcon"
import ExploreIcon from "./icons/ExploreIcon"
import VisualiserIcon from "./icons/VisualiserIcon"
import ColorConverterIcon from "./icons/ColorConverterIcon"
import AboutIcon from "./icons/AboutIcon"
import LoginIcon from "./icons/LoginIcon"
import SignUpIcon from "./icons/SignUpIcon"
import LogOutIcon from "./icons/LogOutIcon"
import ProfileIcon from "./icons/ProfileIcon"
import { useEffect, useState } from "react"
import { getTextColor } from "../utils/colorConverters"
const Header = ({ user, setUser, setMessage, bgColor }) => {
  const navigate = useNavigate()
  const sizeClass = 'h-10 w-10'
  const [invertColor, setInvert] = useState('')

  useEffect(() => {
    if (bgColor) {
      if (getTextColor(bgColor) === '#ffffff') {
        setInvert('invert')
      } else {
        setInvert('')
      }
    }
  }, [bgColor])

  const logOut = () => {
    window.localStorage.removeItem('userToken')
    setUser(null)
    navigate('/')
    setMessage("Logged out")
  }
  if (!bgColor) {
    return null
  }

  return (
    <div style={{ background: bgColor, color: getTextColor(bgColor) }} className="border-r border-gray-200 transition duration-150 ease-in-out">
      <nav className="h-screen flex items-center">
        <ul className="text-center fixed m-auto">
          <li >
            <Link className={`menu-item ${invertColor === '' ? 'menu-item-dark-hover' : 'menu-item-light-hover'}`} to='/' >
              <div className={`w-fit m-auto ${invertColor}`}>
                <ColorPaletteIcon sizeClass={sizeClass}></ColorPaletteIcon>
              </div>
              Color wheel
            </Link>
          </li>
          <li>
            <Link className={`menu-item ${invertColor === '' ? 'menu-item-dark-hover' : 'menu-item-light-hover'}`} to='/explore' >
              <div className={`w-fit m-auto ${invertColor}`}>
                <ExploreIcon sizeClass={sizeClass}></ExploreIcon>
              </div>
              Explore
            </Link>
          </li>
          <li>
            <Link className={`menu-item ${invertColor === '' ? 'menu-item-dark-hover' : 'menu-item-light-hover'}`} to='/visualiser' >
              <div className={`w-fit m-auto ${invertColor}`}>
                <VisualiserIcon sizeClass={sizeClass}></VisualiserIcon>
              </div>
              Scheme visualiser
            </Link>
          </li>
          <li>
            <Link className={`menu-item ${invertColor === '' ? 'menu-item-dark-hover' : 'menu-item-light-hover'}`} to='/converter' >
              <div className={`w-fit m-auto ${invertColor}`}>
                <ColorConverterIcon sizeClass={sizeClass}></ColorConverterIcon>
              </div>
              Color converter
            </Link>
          </li>
          <li>
            <Link className={`menu-item ${invertColor === '' ? 'menu-item-dark-hover' : 'menu-item-light-hover'}`} to='/about' >
              <div className={`w-fit m-auto ${invertColor}`}>
                <AboutIcon sizeClass={sizeClass}></AboutIcon>
              </div>
              About
            </Link>
          </li>
          <li className={`border-b-2 border-black border-opacity-30 w-4/5 mx-auto my-5 ${invertColor}`}></li>
          {user &&
            <li >
              <Link className={`menu-item ${invertColor === '' ? 'menu-item-dark-hover' : 'menu-item-light-hover'}`} to='/profile' >
                <div className={`w-fit m-auto ${invertColor}`}>
                  <ProfileIcon sizeClass={sizeClass}></ProfileIcon>
                </div>
                User Profile
              </Link>
            </li>
          }
          {!user &&
            <>
              <li>
                <Link className={`menu-item ${invertColor === '' ? 'menu-item-dark-hover' : 'menu-item-light-hover'}`} to='/login' >
                  <div className={`w-fit m-auto ${invertColor}`}>
                    <LoginIcon sizeClass={sizeClass}></LoginIcon>
                  </div>
                  Login
                </Link>
              </li>
              <li>
                <Link className={`menu-item ${invertColor === '' ? 'menu-item-dark-hover' : 'menu-item-light-hover'}`} to='/signup' >
                  <div className={`w-fit m-auto ${invertColor}`}>
                    <SignUpIcon sizeClass={sizeClass}></SignUpIcon>
                  </div>
                  Sign up
                </Link>
              </li>
            </>
          }
          {user &&
            <li>
              <button className={`menu-item ${invertColor === '' ? 'menu-item-dark-hover' : 'menu-item-light-hover'}`} onClick={logOut}>
                <div className={`w-fit m-auto ${invertColor}`}>
                  <LogOutIcon sizeClass={sizeClass}></LogOutIcon>
                </div>
                Log out
              </button>
            </li>
          }
        </ul>
      </nav>
    </div>
  )
}

export default Header