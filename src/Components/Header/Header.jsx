import React from 'react'
import { Link } from 'react-router-dom'
import logo from '../../logo.png'
// import { ImSearch } from 'react-icons/im'clear
import './Header.scss'

const Header = () => {
  return (
    <nav className='header'>
      <Link to="/"><img src={logo} alt="logo" /></Link>
      <div className="links">
        {/* <Link to="/tvshows">TV Shows</Link>
        <Link to="/movies">Movies</Link>
        <Link to="/recent">Recently Added</Link>
        <Link to="/mylist">My List</Link> */}
      </div>
      {/* <ImSearch /> */}
    </nav>
  )
}

export default Header