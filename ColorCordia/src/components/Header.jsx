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
const Header = ({ user, setUser, setMessage }) => {
  const navigate = useNavigate()
  const sizeClass = 'h-10 w-10'
  const logOut = () => {
    window.localStorage.removeItem('userToken')
    setUser(null)
    navigate('/')
    setMessage("Logged out")
  }
  return (
    <div className="bg-gray-200">
      <nav className="h-screen flex items-center">
        <ul className="text-center fixed m-auto">
          <li >
            <Link className="menu-item" to='/' >
              <div className="w-fit m-auto">
                <ColorPaletteIcon sizeClass={sizeClass}></ColorPaletteIcon>
              </div>
              Color wheel
            </Link>
          </li>
          <li>
            <Link className="menu-item" to='/explore' >
              <div className="w-fit m-auto">
                <ExploreIcon sizeClass={sizeClass}></ExploreIcon>
              </div>
              Explore
            </Link>
          </li>
          <li>
            <Link className="menu-item" to='/visualiser' >
              <div className="w-fit m-auto">
                <VisualiserIcon sizeClass={sizeClass}></VisualiserIcon>
              </div>
              Scheme visualiser
            </Link>
          </li>
          <li>
            <Link className="menu-item" to='/converter' >
              <div className="w-fit m-auto">
                <ColorConverterIcon sizeClass={sizeClass}></ColorConverterIcon>
              </div>
              Color converter
            </Link>
          </li>
          <li>
            <Link className="menu-item" >
              <div className="w-fit m-auto">
                <AboutIcon sizeClass={sizeClass}></AboutIcon>
              </div>
              About
            </Link>
          </li>
          <li className="border-b-2 border-gray-500 w-4/5 mx-auto my-5"></li>
          {user &&
            <li >
              <Link className="menu-item" to='/profile' >
                <div className="w-fit m-auto">
                  <ProfileIcon sizeClass={sizeClass}></ProfileIcon>
                </div>
                User Profile
              </Link>
            </li>
          }
          {!user &&
            <>
              <li>
                <Link className="menu-item text-center" to='/login' >
                  <div className="w-fit m-auto">
                    <LoginIcon sizeClass={sizeClass}></LoginIcon>
                  </div>
                  Login
                </Link>
              </li>
              <li>
                <Link className="menu-item" to='/signup' >
                  <div className="w-fit m-auto">
                    <SignUpIcon sizeClass={sizeClass}></SignUpIcon>
                  </div>
                  Sign up
                </Link>
              </li>
            </>
          }
          {user &&
            <li>
              <button className="menu-item" onClick={logOut}>
                <div className="w-fit m-auto">
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