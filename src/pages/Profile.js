import React from 'react'
import Navbar from './Navbar'

function Profile() {

    const doctor = {
        photo: 'https://wallpapers.com/images/featured/cool-profile-picture-87h46gcobjl5e4xu.jpg',
        name: 'Dr. John Doe',
        email: 'johndoe@email.com',
        phone: '+123 456 7890',
        address: '123 Clinic Street, City',
        specialization: 'Cardiology',
        experience: '10 years',
        timeslots: {
            Monday: '9:00 AM - 12:00 PM',
            Tuesday: '1:00 PM - 4:00 PM',
            Wednesday: '9:00 AM - 12:00 PM',
            Thursday: '1:00 PM - 4:00 PM',
            Friday: '9:00 AM - 12:00 PM',
            Saturday: '9:00 AM - 12:00 PM',
            Sunday: 'Closed',
        },
    };

    return (
        <>
            <div>
                <Navbar />
            </div>
            <div className="w-11/12 mt-4 mx-auto p-8 ">
                <div className="flex items-center ">
                    <img
                        src={doctor.photo}
                        alt={doctor.name}
                        className="w-48 h-48 rounded-2xl object-cover mr-6"
                    />
                    <div className='font-raleway'>
                        <h2 className="text-2xl font-bold">{doctor.name}</h2>
                        <p className="text-gray-600">{doctor.specialization}</p>

                        <div className="mt-2">
                            <div className='flex gap-2'>
                                <h3 className="font-semibold">Email</h3>
                                <p>{doctor.email}</p>
                            </div>
                            <div className='flex gap-2'>
                                <h3 className="font-semibold">Phone</h3>
                                <p>{doctor.phone}</p>
                            </div>
                            <div className='flex gap-2'>
                                <h3 className="font-semibold">Address</h3>
                                <p>{doctor.address}</p>
                            </div>
                        </div>
                    </div>

                </div>

                {/* Timeslots */}
                <div className="mt-8 font-raleway">
                    <h3 className="text-xl font-bold text-left">Available Timeslots</h3>
                    <ul className="list-disc list-inside mt-2">
                        {Object.entries(doctor.timeslots).map(([day, timeslot]) => (
                            <li key={day} className="border-primary border-opacity-20 border-b px-2 py-2">
                                <span className="font-semibold">{day}: </span>
                                <span>{timeslot}</span>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </>
    );
}

export default Profile