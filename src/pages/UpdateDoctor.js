import React, { useState, useEffect } from 'react';
import Navbar from './Navbar'
import axios from 'axios';
import { apiUrl, getAxiosConfig } from '../config';
import { useLocation } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router-dom';

function UpdateDoctor() {

    const location = useLocation();
    const id = location.pathname.split('/')[2];
    const navigate = useNavigate();

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [speciality, setSpeciality] = useState('');
    const [qualification, setQualification] = useState('');
    const [experience, setExperience] = useState('');
    const [phonenumber, setPhonenumber] = useState('');
    const [address, setAddress] = useState('');
    const [profilePhoto, setProfilePhoto] = useState(null);
    const [timeslots, setTimeslots] = useState([{ day: '', startTime: '', endTime: '' }]);

    useEffect(() => {
        const fetchDoctorData = async () => {
            try {
                const response = await axios.get(`${apiUrl}/admin/doctor/${id}`, getAxiosConfig());
                const doctorData = response.data;

                setName(doctorData.name);
                setEmail(doctorData.email);
                setSpeciality(doctorData.speciality);
                setQualification(doctorData.qualification);
                setExperience(doctorData.experience);
                setPhonenumber(doctorData.phonenumber);
                setAddress(doctorData.address);
                setTimeslots(doctorData.timeslots || [{ day: '', startTime: '', endTime: '' }]); 
            } catch (error) {
                console.error('Error fetching doctor data:', error);
            }
        };

        fetchDoctorData();
    }, [id]);

    const addTimeslot = () => {
        setTimeslots([...timeslots, { day: '', startTime: '', endTime: '' }]);
    };

    const removeTimeslot = (index) => {
        const updatedTimeslots = timeslots.filter((_, i) => i !== index);
        setTimeslots(updatedTimeslots);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const data = new FormData();
        data.append('name', name);
        data.append('email', email);
        data.append('speciality', speciality);
        data.append('qualification', qualification);
        data.append('experience', experience);
        data.append('phonenumber', phonenumber);
        data.append('address', address);

        if (profilePhoto) {
            data.append('profilePhoto', profilePhoto);
        }

        timeslots.forEach((slot) => {
            data.append('timeslots', JSON.stringify(slot)); 
        });

        try {
            await axios.put(`${apiUrl}/admin/update-doctor/${id}`, data, getAxiosConfig(), {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });
            toast.success("Updated Successfully")
            setTimeout(() => {
                navigate('/dashboard');  
            }, 2000);
           
        } catch (error) {
            console.error('Error updating doctor:', error);
        }
    };



    return (
        <div>
            <Navbar />
            <div className='w-11/12 m-auto mt-12 flex items-center justify-center flex-col'>
                <form onSubmit={handleSubmit} className='w-11/12 bg-white p-6 rounded-lg shadow-lg space-y-6'>
                    <h2 className='text-2xl text-primary font-raleway font-bold '>Update Doctor</h2>
                    <div className='grid grid-cols-3 md:grid-cols-3 gap-4'>
                        <div>
                            <label className='block mb-1 text-text'>Name</label>
                            <input
                                type='text'
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                placeholder='Enter name'
                                className='block w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary'
                            />
                        </div>
                        <div>
                            <label className='block mb-1 text-text'>Email</label>
                            <input
                                type='email'
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                placeholder='Enter email'
                                className='block w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary'
                            />
                        </div>
                        <div>
                            <label className='block mb-1 text-text'>Speciality</label>
                            <input
                                type='text'
                                value={speciality}
                                onChange={(e) => setSpeciality(e.target.value)}
                                placeholder='Enter speciality'
                                className='block w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary'
                            />
                        </div>
                        <div>
                            <label className='block mb-1 text-text'>Experience</label>
                            <input
                                type='text'
                                value={experience}
                                onChange={(e) => setExperience(e.target.value)}
                                placeholder='Enter experience'
                                className='block w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary'
                            />
                        </div>
                        <div>
                            <label className='block mb-1 text-text'>Address</label>
                            <input
                                type='text'
                                value={address}
                                onChange={(e) => setAddress(e.target.value)}
                                placeholder='Enter address'
                                className='block w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary'
                            />
                        </div>
                        <div>
                            <label className='block mb-1 text-text'>Phone Number</label>
                            <input
                                type='tel'
                                value={phonenumber}
                                onChange={(e) => setPhonenumber(e.target.value)}
                                placeholder='Enter phone number'
                                className='block w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary'
                            />
                        </div>
                        <div>
                            <label className='block mb-1 text-text'>Qualification</label>
                            <input
                                type='text'
                                value={qualification}
                                onChange={(e) => setQualification(e.target.value)}
                                placeholder='Enter qualification'
                                className='block w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary'
                            />
                        </div>
                        <div>
                            <label className='block mb-1 text-text'>Profile Photo</label>
                            <input
                                type='file'
                                accept='image/*'
                                onChange={(e) => setProfilePhoto(e.target.files[0])}
                                className='block w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary'
                            />
                        </div>
                    </div>

                    {/* Row 4: Timeslots */}
                    <div className='flex flex-col gap-4'>
                        <label className='block mb-1 text-text'>Timeslots</label>
                        {timeslots.map((slot, index) => (
                            <div key={index} className='flex items-center gap-2 mb-2'>
                                <select
                                    value={slot.day}
                                    onChange={(e) => {
                                        const updatedTimeslots = [...timeslots];
                                        updatedTimeslots[index].day = e.target.value;
                                        setTimeslots(updatedTimeslots);
                                    }}
                                    className='p-2 border w-32 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary'
                                >
                                    <option value='' disabled>Select Day</option>
                                    <option value='Monday'>Monday</option>
                                    <option value='Tuesday'>Tuesday</option>
                                    <option value='Wednesday'>Wednesday</option>
                                    <option value='Thursday'>Thursday</option>
                                    <option value='Friday'>Friday</option>
                                    <option value='Saturday'>Saturday</option>
                                    <option value='Sunday'>Sunday</option>
                                </select>
                                <input
                                    type='time'
                                    value={slot.startTime}
                                    onChange={(e) => {
                                        const updatedTimeslots = [...timeslots];
                                        updatedTimeslots[index].startTime = e.target.value;
                                        setTimeslots(updatedTimeslots);
                                    }}
                                    className='p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary'
                                />
                                <input
                                    type='time'
                                    value={slot.endTime}
                                    onChange={(e) => {
                                        const updatedTimeslots = [...timeslots];
                                        updatedTimeslots[index].endTime = e.target.value;
                                        setTimeslots(updatedTimeslots);
                                    }}
                                    className='p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary'
                                />
                                <button
                                    type='button'
                                    onClick={() => removeTimeslot(index)}
                                    disabled={timeslots.length === 1}
                                    className='w-32 text-text rounded-lg cursor-pointer hover:text-buttonHover'
                                >
                                    Remove
                                </button>
                            </div>
                        ))}
                        <button
                            type='button'
                            onClick={addTimeslot}
                            className='w-32 text-text rounded-lg cursor-pointer hover:text-buttonHover'
                        >
                            Add Timeslot
                        </button>
                    </div>

                    <button type='submit' className=' px-4 py-2 text-white bg-primary rounded-lg hover:bg-buttonHover'>
                        Update Doctor
                    </button>
                </form>
            </div>
            <ToastContainer />
        </div>
    )
}

export default UpdateDoctor