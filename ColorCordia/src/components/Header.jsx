/* eslint-disable react/prop-types */
import { useState } from "react"
import { Link, useNavigate } from "react-router-dom"

const Header = ({ user, setUser, setMessage }) => {
  const navigate = useNavigate()
  const [showMenu, setShow] = useState(false)

  const logOut = () => {
    window.localStorage.removeItem('userToken')
    setUser(null)
    navigate('/')
    setMessage("Logged out")
    setShow(false)
  }
  return (
    <div>
      <div style={{ position: 'relative', display: 'block', zIndex: '20', top: '0', margin: '1rem', height: '3rem' }}>
        <button onClick={() => setShow(!showMenu)}>
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-10 h-10">
            <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
          </svg>
        </button>
      </div>
      {showMenu &&
        <>
          <nav className="bg-gray-200 fixed top-0 left-0 z-1 h-screen z-10 text-xl leading-10 w-96">
            <h1 className="text-4xl py-20 pl-5">ColorCordia</h1>
            <ul className="w-full">
              <li >
                <Link className="menu-item" to='/' onClick={() => setShow(false)}>Color wheel</Link>
              </li>
              <li>
                <Link className="menu-item" to='/explore' onClick={() => setShow(false)}>Explore</Link>
              </li>
              <li>
                <Link className="menu-item" to='/visualiser' onClick={() => setShow(false)}>Scheme visualiser</Link>
              </li>
              <li>
                <Link className="menu-item" to='/converter' onClick={() => setShow(false)}>Color converter</Link>
              </li>
              <li>
                <Link className="menu-item" onClick={() => setShow(false)}>About</Link>
              </li>
            </ul>
            <ul className="w-full absolute bottom-20">
              {user &&
                <li >
                  <Link className="menu-item" to='/profile' onClick={() => setShow(false)}>
                    <span className="pr-5">
                      User Profile
                    </span>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8 inline-block">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M17.982 18.725A7.488 7.488 0 0012 15.75a7.488 7.488 0 00-5.982 2.975m11.963 0a9 9 0 10-11.963 0m11.963 0A8.966 8.966 0 0112 21a8.966 8.966 0 01-5.982-2.275M15 9.75a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                  </Link>
                </li>
              }
              {!user &&
                <>
                  <li>
                    <Link className="menu-item" to='/login' onClick={() => setShow(false)}>Login</Link>
                  </li>
                  <li>
                    <Link className="menu-item" to='/signup' onClick={() => setShow(false)}>Sign up</Link>
                  </li>
                </>
              }
              {user &&
                <li>
                  <button className="menu-item text-left" onClick={logOut}>
                    <span className="pr-5">
                      Log out
                    </span>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8 inline-block">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15m3 0l3-3m0 0l-3-3m3 3H9" />
                    </svg>

                  </button>
                </li>
              }
            </ul>
          </nav>
        </>
      }
    </div>
  )
}

export default Header