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
import MoreIcon from "./icons/MoreIcon"
import { User } from "../types/userManagementTypes"
import { Message } from "../types/componentTypes"

interface props {
  user: User | null
  setUser: React.Dispatch<React.SetStateAction<User | null>>
  setMessage: React.Dispatch<React.SetStateAction<Message | null>>
  bgColor: string | null
}

const Header = ({ user, setUser, setMessage, bgColor }: props) => {
  const navigate = useNavigate()
  const sizeClass = 'h-10 w-10'
  const [invertColor, setInvert] = useState('')
  const [showDropdown, setShow] = useState(false)

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
    try {
      window.localStorage.removeItem('userToken')
    } catch (error) { /* empty */ }
    try {
      window.sessionStorage.removeItem('userToken')
    } catch (error) { /* empty */ }
    setUser(null)
    navigate('/')
    setMessage({ text: "Logged out", warning: false })
  }
  if (!bgColor) {
    return null
  }

  return (
    <div style={{ background: bgColor, color: getTextColor(bgColor) }}
      className="md:relative md:md:border-r md:border-gray-200 transition duration-150 ease-in-out z-50 w-full h-full md:text-base text-sm">
      <nav className="md:h-screen md:flex md:items-center">
        <ul className="text-center md:fixed md:m-auto md:block grid grid-cols-4 p-1 md:p-0">
          <li className="md:block inline-block">
            <Link className={`menu-item ${invertColor === '' ? 'menu-item-dark-hover' : 'menu-item-light-hover'}`} to='/' >
              <div className={`w-fit m-auto ${invertColor}`}>
                <ColorPaletteIcon sizeClass={sizeClass}></ColorPaletteIcon>
              </div>
              Color wheel
            </Link>
          </li>
          <li className="md:block inline-block">
            <Link className={`menu-item ${invertColor === '' ? 'menu-item-dark-hover' : 'menu-item-light-hover'}`} to='/explore' >
              <div className={`w-fit m-auto ${invertColor}`}>
                <ExploreIcon sizeClass={sizeClass}></ExploreIcon>
              </div>
              Explore
            </Link>
          </li>
          <li className="md:block hidden">
            <Link className={`menu-item ${invertColor === '' ? 'menu-item-dark-hover' : 'menu-item-light-hover'}`} to='/visualiser' >
              <div className={`w-fit m-auto ${invertColor}`}>
                <VisualiserIcon sizeClass={sizeClass}></VisualiserIcon>
              </div>
              Scheme visualiser
            </Link>
          </li>
          <li className="md:block inline-block">
            <Link className={`menu-item ${invertColor === '' ? 'menu-item-dark-hover' : 'menu-item-light-hover'}`} to='/converter' >
              <div className={`w-fit m-auto ${invertColor}`}>
                <ColorConverterIcon sizeClass={sizeClass}></ColorConverterIcon>
              </div>
              Color converter
            </Link>
          </li>
          <li className="md:block hidden">
            <Link className={`menu-item ${invertColor === '' ? 'menu-item-dark-hover' : 'menu-item-light-hover'}`} to='/about' >
              <div className={`w-fit m-auto ${invertColor}`}>
                <AboutIcon sizeClass={sizeClass}></AboutIcon>
              </div>
              About
            </Link>
          </li>
          <li className={`border-b-2 border-black border-opacity-30 w-4/5 mx-auto my-5 ${invertColor} md:block hidden`}></li>
          {user &&
            <li className="md:block hidden">
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
              <li className="md:block hidden">
                <Link className={`menu-item ${invertColor === '' ? 'menu-item-dark-hover' : 'menu-item-light-hover'}`} to='/login' >
                  <div className={`w-fit m-auto ${invertColor}`}>
                    <LoginIcon sizeClass={sizeClass}></LoginIcon>
                  </div>
                  Login
                </Link>
              </li>
              <li className="md:block hidden">
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
            <li className="md:block hidden">
              <button className={`menu-item ${invertColor === '' ? 'menu-item-dark-hover' : 'menu-item-light-hover'}`} onClick={logOut}>
                <div className={`w-fit m-auto ${invertColor}`}>
                  <LogOutIcon sizeClass={sizeClass}></LogOutIcon>
                </div>
                Log out
              </button>
            </li>
          }
          <div className="inline-block md:hidden relative">
            <button className={`menu-item ${invertColor === '' ? 'menu-item-dark-hover' : 'menu-item-light-hover'}`} onClick={event => {
              event.stopPropagation()
              setShow(!showDropdown)
              document.addEventListener('click', () => setShow(false))
            }}>
              <div className={`w-fit m-auto ${invertColor}`}>
                <MoreIcon sizeClass={sizeClass}></MoreIcon>
              </div>
              More
            </button>
            {showDropdown &&
              <div className="absolute mt-1 bottom-full rounded-lg p-4 drop-shadow-lg border border-gray-200 z-50"
                style={{ background: bgColor }}>
                <li className="">
                  <Link className={`menu-item ${invertColor === '' ? 'menu-item-dark-hover' : 'menu-item-light-hover'}`} to='/about' >
                    <div className={`w-fit m-auto ${invertColor}`}>
                      <AboutIcon sizeClass={sizeClass}></AboutIcon>
                    </div>
                    About
                  </Link>
                </li>
                {user &&
                  <li className="">
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
                    <li className="">
                      <Link className={`menu-item ${invertColor === '' ? 'menu-item-dark-hover' : 'menu-item-light-hover'}`} to='/login' >
                        <div className={`w-fit m-auto ${invertColor}`}>
                          <LoginIcon sizeClass={sizeClass}></LoginIcon>
                        </div>
                        Login
                      </Link>
                    </li>
                    <li className="">
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
                  <li className="">
                    <button className={`menu-item ${invertColor === '' ? 'menu-item-dark-hover' : 'menu-item-light-hover'}`} onClick={logOut}>
                      <div className={`w-fit m-auto ${invertColor}`}>
                        <LogOutIcon sizeClass={sizeClass}></LogOutIcon>
                      </div>
                      Log out
                    </button>
                  </li>
                }
              </div>}
          </div>
        </ul>
      </nav>
    </div>
  )
}

export default Header