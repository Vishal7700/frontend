import React from 'react'
import Navbar from './Navbar'

function AddDoctors() {
    return (
        <div>
            <div>
                <Navbar />
            </div>
            <div className='w-9/12 m-auto mt-12  flex items-center justify-center  flex-col'>
                <form className='bg-white p-6 rounded-lg-lg shadow-lg'>
                    <h2 className='text-2xl text-primary font-raleway font-bold mb-4'>Doctor's Registration</h2>
                    <div className='grid grid-rows-3 gap-6'>
                        {/* Row 1: Name and Email */}
                        <div className='grid grid-cols-2 gap-4'>
                            <div>
                                <label className='block ml-1 mb-1 text-text'>Name</label>
                                <input type='text' placeholder='name' className='block w-full p-2 border border-gray-300 rounded-lg' />
                            </div>
                            <div>
                                <label className='block ml-1 mb-1 text-text'>Email</label>
                                <input type='email' placeholder='email' className='block w-full p-2 border border-gray-300 rounded-lg' />
                            </div>
                        </div>

                        {/* Row 2: Speciality and Experience */}
                        <div className='grid grid-cols-2 gap-4'>
                            <div>
                                <label className='block ml-1 mb-1 text-text'>Speciality</label>
                                <input type='text' placeholder='speciality' className='block w-full p-2 border border-gray-300 rounded-lg' />
                            </div>
                            <div>
                                <label className='block ml-1 mb-1 text-text'>Experience</label>
                                <input type='text' placeholder='experience' className='block w-full p-2 border border-gray-300 rounded-lg' />
                            </div>
                        </div>

                        {/* Row 3: Address and Phone number */}
                        <div className='grid grid-cols-2 gap-4'>
                            <div>
                                <label className='block ml-1 mb-1 text-text'>Address</label>
                                <input type='text' placeholder='address' className='block w-full p-2 border border-gray-300 rounded-lg' />
                            </div>
                            <div>
                                <label className='block ml-1 mb-1 text-text'>Phone number</label>
                                <input type='tel' placeholder='phone number' className='block w-full p-2 border border-gray-300 rounded-lg' />
                            </div>
                        </div>

                        {/* Row 4: Profile Photo and Timeslots */}
                        <div className='grid grid-cols-2 gap-4'>
                            <div>
                                <label className='flex  ml-1 mb-1 text-text'>Timeslots</label>
                                <div className='grid grid-cols-3 gap-1'>
                                    <input type='text' placeholder='Day' className=' w-full p-2 border border-gray-300 rounded-lg' />
                                    <input type='time' className=' w-full p-2 border border-gray-300 rounded-lg' />
                                    <input type='time' className=' w-full p-2 border border-gray-300 rounded-lg' />
                                </div>
                            </div>
                            <div>
                                <label className='block ml-1 mb-1 text-text'>Profile photo</label>
                                <input type='file' accept='image/*' className='block w-full p-2 border border-gray-300 rounded-lg' />
                            </div>
                        </div>
                    </div>
                    <div className='flex justify-start '>
                    <button type='submit' className='mt-6 px-4 py-2 bg-button w-48 text-white font-raleway rounded-lg hover:bg-buttonHover'>Submit</button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default AddDoctors
