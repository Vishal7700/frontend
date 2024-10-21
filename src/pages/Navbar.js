import React from 'react'
import { faSignOut } from '@fortawesome/free-solid-svg-icons'
import { faUser } from '@fortawesome/free-solid-svg-icons/faUser'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Link } from 'react-router-dom'

function Navbar() {

  return (
    <div className="flex flex-col md:flex-row p-4 bg-primary text-white justify-between items-center">
      <div className='flex items-center ml-6 mb-2 md:mb-0'>
        <Link to={"/dashboard"}><p className="text-xl font-raleway">MedVisit</p></Link>
      </div>
      <ul className="flex gap-8 mr-6">
        <li className="flex items-center gap-2 cursor-pointer hover:underline">
          <FontAwesomeIcon icon={faUser} className="mr-2" />
          <p>Admin</p>
        </li>
        <li className="flex items-center cursor-pointer hover:underline">
          <Link to={"/"} ><FontAwesomeIcon icon={faSignOut} /></Link>
        </li>
      </ul>
    </div>

  )
}

export default Navbar