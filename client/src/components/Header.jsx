import React from 'react'
import { NavLink } from 'react-router-dom'

const Header = () => {
  return (
    <div>
      <nav className="navbar navbar-expand-lg bg-primary" data-bs-theme="dark">
        <div className="container">
            <NavLink className="navbar-brand" to={'/'}>Intern House</NavLink>
            <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
                <div className="navbar-nav">
                    <NavLink className={({ isActive }) =>
                    `nav-link ${isActive ? 'active-link' : ''}`} 
                    to={'/'}
                    >
                        Job Postings
                    </NavLink>
                    <NavLink className={({ isActive }) =>
                    `nav-link ${isActive ? 'active-link' : ''}`} 
                    to={'/postJob'}
                    >
                        Post a Job
                    </NavLink>                
                </div>
            </div>
        </div>
      </nav>
    </div>
  )
}

export default Header
