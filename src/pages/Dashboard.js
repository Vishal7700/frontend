import React, { useState, useEffect } from 'react'
import Navbar from './Navbar'
import { Link } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlusCircle } from '@fortawesome/free-solid-svg-icons/faPlusCircle'
import { faPenToSquare, faShare, faTrash } from '@fortawesome/free-solid-svg-icons'
import axios from 'axios'
import { apiUrl, getAxiosConfig } from '../config.js'
import Loader from '../loaders/Loader.js'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function Dashboard() {

  const [loading, setLoading] = useState(true);
  const [doctors, setDoctors] = useState([]);
  const [page, setPage] = useState(1);
  const [name, setName] = useState('');




  const fetchDoctors = async (page, limit, name) => {
    setLoading(true);
    try {
      const response = await axios.get(`${apiUrl}/admin/doctors`, {
        params: { page, limit, name },
        ...getAxiosConfig(),
      });
      if (response.status === 200) {
        setDoctors(response.data.doctors || []);
      }
    } catch (error) {
      console.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDoctors(page, 10, name);
  }, [page, name]);


  const handleNextPage = () => {
    setPage((prevPage) => prevPage + 1);
  };

  const handlePreviousPage = () => {
    setPage((prevPage) => Math.max(prevPage - 1, 1));
  };

  const deleteDoctor = async (doctorId) => {
    setLoading(true);
    try {
      const response = await axios.delete(`${apiUrl}/admin/delete-doctor/${doctorId}`, getAxiosConfig());
      if (response.status === 200) {
        toast.success("Deleted Successfully")
        fetchDoctors(page, 10, name);
      }
    } catch (error) {
      console.error("Error deleting doctor:", error.message);
    } finally {
      setLoading(false);
    }
  };


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



        <div className='search m-4'>
          <input
            className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:border-primary"
            type="text"
            placeholder="Seach doctors..."
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
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
                      <div className="flex gap-2">
                        <Link to={`/update/${doctor._id}`}><FontAwesomeIcon className='text-sm' color="teal" title="Update" icon={faPenToSquare} />
                        </Link>
                        <FontAwesomeIcon onClick={() => deleteDoctor(doctor._id)} className='text-sm' color="red" title="Delete" icon={faTrash} />
                        <Link to={`/profile/${doctor._id}`} className="flex items-center">
                          <FontAwesomeIcon className='text-sm' color="green" title="Profile" icon={faShare} />
                        </Link>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            <div className='flex justify-center gap-8 mt-4'>
              <button className="w-20 bg-button text-white font-raleway rounded-lg py-2 hover:bg-buttonHover transition" onClick={handlePreviousPage}>Previous</button>
              <p className='flex items-center justify-center border-2 border-primary border-opacity-50 rounded-lg px-4'>{page}</p>
              <button className="w-20 bg-button text-white font-raleway rounded-lg py-2 hover:bg-buttonHover transition" onClick={handleNextPage}>Next</button>
            </div>

          </div>
        )}
      </div>
      <ToastContainer />
    </div>
  )
}

export default Dashboard