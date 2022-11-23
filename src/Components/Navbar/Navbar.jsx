import React from 'react'
import './Navbar.css'
import {Link} from 'react-router-dom'

function Nav() {
  return (
    <>
    <Link to="/"> 
    <div className="nav-icon">
     <img src="https://dphi.tech/blog/wp-content/uploads/job-manager-uploads/company_logo/2022/02/main_logo_with_darktext_dphi.png" alt="" />
    </div>
    </Link>
    </>
  )
}

export default Nav