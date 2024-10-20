import React, { useState, useEffect } from 'react'
import Navbar from './Navbar'
import { Link } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlusCircle } from '@fortawesome/free-solid-svg-icons/faPlusCircle'
import { faPenToSquare, faTrash } from '@fortawesome/free-solid-svg-icons'
import axios from 'axios'
import { apiUrl, getAxiosConfig } from '../config.js'
import Loader from '../loaders/Loader.js'

function Dashboard() {

  const [loading, setLoading] = useState(true);
  const [doctors, setDoctors] = useState([]);


  useEffect(() => {
    const fetchDoctors = async () => {
      try {
        const response = await axios.get(`${apiUrl}/admin/doctors`, getAxiosConfig());
        if (response.status === 200) {
          setDoctors(response.data.doctors);
          setLoading(false);
        }
      } catch (error) {
        console.error(error.message);
      }
    };

    fetchDoctors();
  }, []);



  return (
    <div>
      <div>
        <Navbar />
      </div>
      <div className='w-11/12 m-auto mt-4'>
        <div className='button'>
          <Link to={"/add"}>
            <button className='bg-primary hover:bg-buttonHover text-white px-4 py-2 rounded-lg'>Add <FontAwesomeIcon className='ml-2' icon={faPlusCircle} /> </button>
          </Link>
        </div>

        {loading ? (
          <Loader />
        ) : (
          <div className="mt-4">
            <table className="w-full border shadow-lg rounded-lg">
              <thead>
                <tr className="bg-secondary border-b text-text text-l p-2 hover:bg-gray-50 font-popins rounded-lg">
                  <th className="py-3 px-12 text-left">Name</th>
                  <th className="py-3 px-12 text-left">Email</th>
                  <th className="py-3 px-6 text-left">Phone</th>
                  <th className="py-3 px-10 text-left">Actions</th>
                </tr>
              </thead>
              <tbody className="text-text text-base">
                {doctors.map((doctor, index) => (
                  <tr key={index} className="bg-secondary border-b text-text cursor-pointer hover:bg-gray-100 text-l font-popins rounded-lg">
                    <td className="py-3 px-12 text-left">{doctor.name}</td>
                    <td className="py-3 px-12 text-left">{doctor.email}</td>
                    <td className="py-3 px-6 text-left">{doctor.phonenumber}</td>
                    <td className="py-3 px-12 text-left">
                      <div className="flex gap-4">
                        <FontAwesomeIcon color="teal" title="Update" icon={faPenToSquare} />
                        <FontAwesomeIcon color="red" title="Delete" icon={faTrash} />
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  )
}

export default Dashboard